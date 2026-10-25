# Operational lessons

Read this file from disk at the start of every hunt. These notes are how the autopilot avoids a bug it already hit. They do not override the hunt files.

Add a lesson only after you have evidence (what failed, what you checked, what worked). One short block:

```
## YYYY-MM-DD — short title
- Failure:
- Evidence:
- Do this next time:
```

Do not record guesses. Do not copy a lesson into a hunt file.

## 2026-10-21 — Sheets cells are not in the accessibility tree
- Failure: gridcells are not exposed, CSV export from an unauthenticated fetch returns 403, and in-page fetch of the export URL fails CORS.
- Evidence: File > Download > CSV saved a readable file in Downloads. Name box + Enter selects a cell, and the formula bar text is that cell's value.
- Do this next time: download CSV while the built-in browser is signed into Google. To write one cell, select it from the name box, press F2, type into the cell editor, and press Enter. Do not press Tab while a smart-chip bubble is open; it does not commit the cell.

## 2026-10-21 — Lowe's Workday apply starts at Create Account
- Failure: Associate Software Engineer JR-02622621 (Bengaluru, posted 2026-10-19) cannot be submitted without an account.
- Evidence: Apply Manually opened step 1 of 6, titled Create Account/Sign In. The older requisition JR-02622622 returns "page doesn't exist".
- Do this next time: use the live requisition from the Workday search, and log Needs Login when step 1 is Create Account. Do not create the account.

## 2026-10-22 — Claude Browser pane starts signed out of Google
- Failure: opening the companies sheet in the Claude Code browser pane redirected to accounts.google.com; browser tools then returned "Policy check temporarily unavailable".
- Evidence: tabs_context showed origin https://accounts.google.com after preview_start on the sheet URL.
- Do this next time: before any hunt in a fresh agent browser, open the tracking sheet first. If it lands on sign-in, set hard_stop "Google sign-in needed in agent browser" and ask the user to sign in in the pane (Google, then LinkedIn). Once signed in, read tabs with an in-page fetch of `/spreadsheets/d/<id>/gviz/tq?tqx=out:csv&sheet=<Tab>` (same origin) before falling back to File > Download.

## 2026-10-22 — Read careers sites through their public job APIs, not page scraping
- Failure: careers pages redirect across domains mid-read (browser security check aborts), and Dell's sheet link is dead.
- Evidence: all of these returned full JDs on 22 Oct 2026 without login:
  - Eightfold (NetApp): list `/api/apply/v2/jobs?domain=netapp.com&query=..&location=India&start=0&num=10` on netapp.eightfold.ai; full JD `/api/pcsx/position_details?position_id=<id>&domain=netapp.com&hl=en` (field `data.jobDescription`). The v2 detail endpoint is 403.
  - Greenhouse (Pure Storage / Everpure): `curl https://boards-api.greenhouse.io/v1/boards/purestorage/jobs?content=true` (read as UTF-8).
  - Workday (Cadence): POST `https://cadence.wd1.myworkdayjobs.com/wday/cxs/cadence/External_Careers/jobs` with `{"appliedFacets":{},"limit":20,"offset":0,"searchText":".."}`; GET `<same base><externalPath>` for the JD. A wrong tenant/site gives 404/422.
  - Oracle HCM (Dell, moved off jobs.dell.com): `https://enterpriseplatform.dell.com/hcmRestApi/resources/latest/recruitingCEJobRequisitions?onlyData=true&expand=requisitionList&finder=findReqs;siteNumber=CX_1001,keyword="..",limit=25,offset=0`. The `location=` filter is ignored; filter on PrimaryLocationCountry=IN.
  - TalentBrew (Synopsys): `careers.synopsys.com/search-jobs/results?Keywords=..&Location=India&RecordsPerPage=100&SearchType=5` with `X-Requested-With: XMLHttpRequest`; JSON `results` is HTML. Location filter is loose; filter rows by "India".
- Do this next time: try the platform API with curl first (no browser needed for public boards); use the browser only for the private Google Sheets and for applying. Sheet gviz CSV output from Claude in Chrome is blocked when it contains URLs with query strings: strip `?...` inside JS before returning.

## 2026-10-22 — Writing to Google Sheets from the Claude Browser pane
- Failure: in the narrow Claude Browser pane, typed text did not reliably reach the grid. A literal "\t" inside a `type` action went into one cell; after `navigate ...#range=A<row>` the grid often had no keyboard focus, so keys were dropped or landed in another cell. System clipboard paste (Set-Clipboard + ctrl+v) did not paste; `navigator.clipboard.writeText` is denied.
- Evidence: an Applications row got partial junk twice; cleaned (Delete after a `#range=<cell>` navigate worked) and verified with a gviz read of A1:Z1000.
- Do this next time: find the real last row with a screenshot (gviz CSV skips blank rows and mis-reports row numbers in this sheet). Write ONE cell at a time: `navigate #range=<cell>` → wait 2s → `type` value → `key Return` → verify that cell with gviz before the next. Never put "\t" inside `type`. Claude in Chrome wrote cells reliably with name box + type + Return.

## 2026-10-22 — Reliable Google Sheets writes + LinkedIn connect flow in Claude in Chrome
- Failure: typing a whole row with Tab keys between `type` actions dropped text (company, role, URL lost). gviz CSV reads can be stale/cached and once reported a junk cell as empty.
- Evidence: an Applications row came out scrambled on the first try; per-cell writes worked for several Applications and Contacts rows, each verified.
- Do this next time:
  - Sheets: for every cell, click the name box (≈75,126 in a 1536px-wide frame) → type the cell ref → Return → type the value → Return. Find the last row with ctrl+End / ctrl+Up and a screenshot, not gviz. Verify with gviz plus `&nocache=<timestamp>`.
  - Tabs: the Applications and Contacts gids are in `config/me.md`. Older rows can be shifted or have gaps, so find the true last row before writing.
  - LinkedIn: company IDs for `currentCompany` people search — Synopsys 2457, Pure Storage 1632202, Cadence 2157; India geoUrn 102713980. 3rd-degree profiles hide Connect under "More" (the "..." next to Message); then "Send without a note". Success shows the toast "Invitation sent to <name>".

## 2026-10-22 — Job APIs for ranks 48–52
- Evidence (all returned data without login):
  - Sprinklr: Workday `sprinklr.wd1.myworkdayjobs.com`, tenant `sprinklr`, site `careers` (occasional 502; retry).
  - BrowserStack: Workday `browserstack.wd3.myworkdayjobs.com`, tenant `browserstack`, site `External`.
  - Postman: Workday `postman.wd108.myworkdayjobs.com`, tenant `postman`, site `careers` (moved off Greenhouse).
  - Freshworks: SmartRecruiters `https://api.smartrecruiters.com/v1/companies/freshworks/postings?limit=100&offset=N`; JD via each posting's `ref`.
  - Zoho Corp: Zoho Recruit page `careers.zohocorp.com/jobs/Careers` (JS-rendered; read in Chrome). Lists very few roles.
- Do this next time: to find a Workday host, grep the careers page for `myworkdayjobs.com/<site>`, then try wd1/wd3/wd5/wd108. 200 means correct; 422/404 means wrong. `$TEMP/wd.py` and `$TEMP/wdlist.py` are throwaway; the endpoint pattern is in the 2026-10-22 entry above.

## 2026-10-22 — Paste rows into Google Sheets from Claude in Chrome
- Evidence: PowerShell `Set-Clipboard` with tab-separated rows, then name box → A<row> → Return → ctrl+v in real Chrome pasted full rows correctly (Contacts and Applications rows, all verified by gviz). This does NOT work in the Claude Browser pane.
- Do this next time: build the TSV in PowerShell (`$t="`t"`), Set-Clipboard, paste at the first empty row, verify with gviz `&nocache=`.
- LinkedIn company IDs: Postman 3795851, Barclays 1426, Standard Chartered 2235. Workday: Citi `citi.wd5` site `2`; Barclays `barclays.wd3` site `External_Career_Site_Barclays`; Deutsche Bank `db.wd3` site `DBWebSite`; Bank of America `ghr.wd1` sites `Lateral-US` / `Lateral-APAC` (no India roles found). Standard Chartered uses SuccessFactors at jobs.standardchartered.com (JS search; read in Chrome). Barclays grades: "Analyst Expectations" in a JD = junior; AVP/VP = senior.

## 2026-10-22 — Email apply and LinkedIn Easy Apply in Claude in Chrome
- Gmail: open `mail.google.com/mail/u/0/?view=cm&fs=1&to=<address>` in a SEPARATE tab (tabs_create_mcp), because Gmail closes that tab after Send and the Claude tab group can break. Put only the recipient in the URL (no phone/email in URLs). Click Subject by ref, click the body area by coordinate (~750,250) before typing (a ref click on the body did not focus it), attach via the hidden `input[type=file]` (find "file input") with file_upload. "Message sent" toast = done.
- Resume upload: file_upload may not read other drives. Use the byte-identical copy in `.job-hunter-output/resume/` (path in `config/me.md`; check the md5 matches the original).
- LinkedIn's saved resume can be an older file with a newer-looking name. Compare hashes before trusting it; upload the latest resume and make it the default.
- Easy Apply "Upload resume" creates the file input only on click. Patch `HTMLInputElement.prototype.click` in JS to capture the input instead of opening the picker, label it, `find` it, then file_upload.
- Easy Apply numeric fields reject text: years, notice days and CTC in rupees must be plain numbers from the Profile tab. Untick "Follow <company>" before submit. Truthful answers only (a skill not on the resume = 0 years).
- If an Easy Apply asks something not in Profile (travel abroad, compensation-structure comfort, salary negotiable, background-check consent), close → Save draft → log Needs Manual with the exact questions.
- LinkedIn hiring posts: most "hiring + email" posts are agencies, senior, US W2 or non-tech. After 15+ posts with no KEEP, Hunt 4 1A (Jobs, f_AL=true, f_E=2,3, f_TPR=r604800) is allowed.

## 2026-10-23 — A paste landed at A1 (caught and undone)
- Failure: the Chrome window resized (frame 1568x698, toolbar shifted), so the name-box click missed; ctrl+v pasted 4 rows over Contacts A1:S4. Ctrl+Z restored it (verified with gviz).
- Do this next time: never trust fixed name-box coordinates. Navigate `#gid=<gid>&range=A<row>`, wait 4s, click the selected cell itself, zoom the name box to confirm it reads A<row>, THEN ctrl+v. Verify rows 1–3 and the pasted rows afterwards. Never use ctrl+a in the name box (it selected A:S).

## 2026-10-25 — Parallel runs overwrite each other's sheet rows
- Failure: rows pasted into Applications and Contacts were replaced by rows from another chat running at the same time. State.json was also rewritten and an item dropped.
- Evidence: gviz on 2026-10-25 showed no HCL text in any tab; LinkedIn Sent invitations still listed all four people.
- Do this next time: re-read the target rows with gviz immediately before pasting and again right after; re-read state.json just before editing it and merge, never replace.

## 2026-10-25 — Microsoft careers referral apply
- Evidence: after a referral, Applications > Referrals tab lists the job with "Referred by <name>" and a "Complete application" link (URL carries referral_token). The form's Email field is locked to the account's original login email (outlook) even when the profile email is Gmail; the referral still showed on the form ("Referred by ...") and the submit reached /careers/apply/success.
- Do this next time: apply from the Referrals tab link, not the public job page. Resume upload on the profile modal: patch HTMLInputElement.prototype.click to capture the file input, then file_upload; delete the patch after.

## 2026-10-23 — LinkedIn when Chrome screenshots time out
- Symptom: `computer screenshot` times out ("renderer may be frozen") while JS, find, read_page, form_input and ref clicks still work. Cause: the Chrome window is covered/minimized. Do not stop; drive the page through the DOM and verify every write with gviz.
- LinkedIn dialogs (Easy Apply, connect invite) render inside the `#interop-outlet` shadow root. `find` sees Easy Apply fields; use `form_input` on the refs (resume radio = true, "Follow <company>" checkbox = false), click the Submit ref, then confirm "Application submitted" in `main` text.
- Connect without the More menu (works for 2nd and 3rd degree): navigate to `https://www.linkedin.com/preload/custom-invite/?vanityName=<slug>`, wait 4s, find the `[role=dialog]` (search shadow roots) whose text names the person, click its "Send without a note" button, then confirm on /mynetwork/invitation-manager/sent/ ("Sent today").
- Hiring-post apply links via lnkd.in can be WhatsApp channels (JLL "Software Engineer I" post, Hirenza). Open the lnkd.in link first; a whatsapp.com target = DROP.
- Dover apply forms (app.dover.com): form_input works for text inputs and textareas, but React checkboxes and radios only register with real ref clicks. Before submitting, check `input[type=checkbox]` .checked. A missed checkbox shows "Required" and the Apply button stays. Success = "Thanks for applying!" and the submit button disappears.
- Sheets with a hidden Chrome window: clicking the name box at (40,103) is unreliable. Once it put stray text into Applications A1 (cleared and verified). Instead, navigate to `#gid=<gid>&range=<cell>`, wait 5s, and confirm `document.querySelector('#t-name-box').value` before typing or pasting. To find a sheet row number, gviz-fetch single rows with `&headers=0&range=B<n>:G<n>`, because a full gviz CSV drops empty rows and shifts the indexes.
- Microsoft careers moved to Eightfold at apply.careers.microsoft.com. Old `jobs.careers.microsoft.com/.../share/<id>` links now redirect to the search page, so treat that as expired. API: `/api/pcsx/search?domain=microsoft.com&query=..&location=India&start=N` (rate-limited, retry) and `/api/pcsx/position_details?position_id=<id>&domain=microsoft.com&hl=en`. Microsoft company ID 1035, Apple 162479.
- Workday tenants: Wells Fargo `wf.wd1/WellsFargoJobs`, Fidelity `fmr.wd1/FidelityCareers`, BlackRock `blackrock.wd1/BlackRock_Professional`, S&P Global `spgi.wd5/SPGI_Careers`, Thomson Reuters `thomsonreuters.wd5/External_Career_Site`, Global Payments `tsys.wd1/TSYS`, Fiserv `fiserv.wd5/EXT`. Run wdlist.py with `PYTHONIOENCODING=utf-8` (cp1252 crash otherwise). EPAM careers sit behind a Cloudflare bot check (= Needs Login). Thoughtworks Greenhouse has no India roles.

## 2026-10-24
- LinkedIn Easy Apply discovery without the UI: the public guest API `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=..&geoId=102713980&f_AL=true&f_E=2%2C3&f_TPR=r86400&start=0` (curl, 25 per page) lists job IDs, titles, companies and locations. Full JD: `/jobs-guest/jobs/api/jobPosting/<id>` (`show-more-less-html__markup`). Read years, stack and stated pay before opening Easy Apply.
- Easy Apply multi-page forms: numeric fields reject text ("<n> LPA" is invalid), so use plain rupees / days from the Profile tab. A CTC field "in ₹ lakh" takes the lakh number. Read prefilled answers before Review, because LinkedIn reuses old answers (Pine Labs prefilled "Engineering experience 1"). If a form states fixed pay under 12 LPA (Babaclick 8.5 LPA), close the form, Discard, and log it as Skipped.
- LinkedIn messaging bubbles live in `#interop-outlet` shadow DOM. Focus `[contenteditable=true]` inside the bubble via JS, type with computer.type, verify the editor text, click the bubble's "Send" button via JS, then confirm the editor is empty and the text appears in the thread.
- Accept checks: /mynetwork/invite-connect/connections/ lists recent connections with "Connected on <date>". Compare against Contacts rows with Status = Sent.
- Job posters: on a LinkedIn job page, the "Meet the hiring team" section has the poster's /in/ link (best recruiter pick). Company People tab: /company/<slug>/people/?keywords=engineer. Get the slug from the guest jobPosting HTML (`linkedin.com/company/<slug>`).
- Sheets: if typed or pasted values don't land (gviz shows the old value) while the name box shows the right cell, the tab is stale or backgrounded. Open the sheet in a NEW tab (tabs_create_mcp) and paste there; this fixed the companies-sheet notes. Also check the user's clipboard right before ctrl+v: the user copied a link once and it pasted into a cell (cleared).
- Hunt 6 Day-7: Google careers says when a job was already submitted ("You must wait 90 days before re-applying"). Check this before treating Warm Pending as unapplied. amazon.jobs Apply needs passport login (Needs Login).
- careers.epam.com loads in Chrome (earlier Cloudflare check passed). API: `/api/jobs/v2/search/careers-i18n?facets=country%3D4060741400035606931&q=..&size=60`. Deloitte (southasiacareers.deloitte.com) and EY (careers.ey.com) are SuccessFactors search pages; PwC India = Workday `pwc.wd3/Global_Experienced_Careers`; KPMG India = kpmgindia.talentrecruit.com (JS app, use the search box).

## 2026-10-25
- LinkedIn people search can hit the monthly "profile searches" limit (only the top 3 results show). Use the company People page instead, e.g. `https://www.linkedin.com/company/infosys/people/?keywords=react%20trivandrum`, and read `.org-people-profile-card` cards (vanity is in the `a[href*="/in/"]` link).
- LinkedIn message attachments: `input[type=file]` with the wide accept list (pdf/doc) inside `.msg-form`. Use `find` to get its ref, then `file_upload`; the composer shows "Attached" before you type and Send.
- Easy Apply forms (Ceipal/PyjamaHR) may pull undated high-school entries from the profile and block Review. "Delete education" inside the form says "This will not affect your LinkedIn profile", so it's safe to remove undated entries and keep the B.Tech.
- Easy Apply dialog shrinks on short pages: clicking at the old Review coordinate lands outside it and opens "Save this application?". Close with X and use the button ref instead.
- Accenture India jobs are under company "Accenture in India" (the f_C=1033 filter returns nothing). Search by keyword "accenture full stack" and filter subtitle. Each JD has "Must have skills" and "Minimum N Year(s)" lines, easy to grep.
- The clipboard is shared with whatever else runs on this PC. Re-check it right before each ctrl+v paste into the sheet: once, between two pastes, it held "200060730".
