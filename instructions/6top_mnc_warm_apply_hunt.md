You are my Top-MNC warm-apply agent.

Tracking sheet: see `config/me.md` (tabs: Applications, Contacts, Replied Came Details, Profile).

**Why this hunt exists:** Blind applies at the top companies (even with a referral) are often rejected without a human look. For the absolute top companies, do **not** burn the application slot until a real hiring-side person has seen the resume and given a satisfactory signal — or until a full **7-day** warm window has been used. Goal: maximize chance of a human look, not maximize form submits.

This hunt is separate from Hunt 0 / 1 / 4 / 5. Do not edit other hunt markdown files. Do not run normal Hunt 1 self-apply for these five companies while a row is in **Warm Pending**.

## Browser
In Antigravity, use the Playwright MCP browser tools (`browser_*`). In Claude Code, use Claude in Chrome (`mcp__claude-in-chrome__*`). Use the signed-in session for Google, LinkedIn, and Gmail. Login, OTP, or CAPTCHA means Needs Login. Never type passwords.

## Scope — Top 5 only (hard lock)
Work **only** these companies. No others in this hunt.

| # | Company | Official careers (prefer) |
|---|---------|---------------------------|
| 1 | Google | https://careers.google.com / https://www.google.com/about/careers/ |
| 2 | Microsoft | https://careers.microsoft.com |
| 3 | Meta | https://www.metacareers.com |
| 4 | Amazon | https://www.amazon.jobs |
| 5 | Apple | https://jobs.apple.com |

Referral status per company comes from "Existing referrals" in `config/me.md`. A company listed there with a referral: still do **not** apply until a warm signal or Day 7, and mention the referral in messages (templates A/B). Any other company: no assumed referral unless Profile/Notes say otherwise; ask for a review / hiring-manager look / whether to apply, referral welcome if they offer (templates C/D).

Skip any company not in this table. Skip Sheet1 links. Never list or apply to a Job Link already **Applied** or **Rejected** in Applications unless I explicitly reopen it.

## Setup (every run)
- Read Profile, Applications, Contacts, Replied Came Details fully.
- Resume: path in `config/me.md` (or newest reachable resume). If unreachable, stop and tell me.
- Use the LinkedIn + Google sessions already signed in in Chrome. If login, OTP, CAPTCHA, or account creation appears: leave the tab, mark Needs Login, continue. Never type or store passwords.
- One run = **one calendar day** of work across active Warm Pending roles (and optional new role discovery). Do not apply on Day 0–6 unless a **satisfactory reply** clears the gate (see Step 5).

---

## Step 1 — Find the best-fit role (do not apply)
For each Top-5 company that needs a new role (no open Warm Pending / Applied for a still-live fit):

1. Open the official careers site (table above). Search for roles that fit my resume: strictly for freshers / 0 experience candidates (University Graduate, Intern, Student, Data Science / Data Analyst / Machine Learning / Python Trainee), India or remote-India when available; otherwise note location and keep only if relocation/visa is already covered in Profile.
2. Rank candidates against the resume (real stack: "Stack to rank roles against" in `config/me.md`). Pick **the single best live posting** per company for this warm cycle (or 1 role if only one fits). Prefer open reqs with a clear team/product signal over vague “generalist” pools when both exist.
3. DROP: expired, requires 1+ years of prior full-time experience (candidate has 0 experience), senior / staff / lead, not data/software, pay under Profile floor when stated, suspicious, or duplicate of an Applications Job Link.
4. Log Applications immediately **before** any LinkedIn work:

| Field | Value |
|-------|--------|
| Date | today |
| Company / Role / Job Link / Location / Match % | from the posting |
| Apply Status | **Warm Pending** |
| Notes | `Hunt 6 \| Warm start: {YYYY-MM-DD} \| Apply after: {start+7} \| Existing referral: yes/no \| Best fit reason: {one line}` |

Do **not** submit the careers / ATS form in this step. Ever.

---

## Step 2 — Who to contact (hiring-side only, highly active only)
For each **Warm Pending** Job Link, find people who can actually influence screening for **that** role — not random employees.

### Priority order (fill from the top; skip if weak)
1. **Hiring manager / Eng Manager / Tech Lead** for the team named in the JD (or closest product/org match).
2. **Recruiter / University / Tech sourcer** actively hiring for that family of roles (recent “hiring”, “open roles”, “we’re looking” posts).
3. **Senior / Staff engineer on that team** who posts about the team’s work or hiring — only if 1–2 are scarce.

### Must-pass filters (all required)
- Current employer on LinkedIn = that company (verify present role).
- **Highly active** (at least one in last ~14 days): original post, meaningful comment, job/hiring post, or clear “open to connect” hiring signal. Prefer people who posted about hiring or their team in the last 7 days.
- Prefer 2nd-degree. Skip 3rd+ cold spam if enough 2nd-degree actives exist.
- Skip anyone already on Contacts for this Job Link, anyone on Sheet1, and anyone Msg Count already closed.
- Skip inactive profiles (no posts/comments visible in months), pure sales/partner roles, and people with no tie to engineering hiring.

### Volume (this hunt is not Hunt 1’s ×2 cap)
- **Daily:** find and outreach **as many qualified actives as LinkedIn limits allow**, targeting **3–8 new people per Warm Pending role per day** when available (quality over spam).
- Cap: at most **20 connection requests/day** and **15 DMs/day** across all hunts combined. If LinkedIn warns on weekly invite limit or CAPTCHA → stop LinkedIn, log, tell me.
- Pace like a human. No bulk tools, no post comments, no engagement traps.

---

## Step 3 — Connect, then message (same run when already connected)
1. If not connected: send connection request. Prefer **with a short note** when notes remain this month; otherwise send without note and message after accept (Hunt 2-style accept check can be done in this hunt when Connection Status becomes Accepted).
2. If Already Connected or Accepted and Msg Count = 0: send **one** first message from the templates below (Step 4).
3. Log every person on **Contacts** before the next profile: Contact ID, Date Found, Company, Role Applied, Job Link, Name, Title, Type (Hiring Manager / Recruiter / Senior Dev), LinkedIn URL, Request Sent Date, Connection Status, Msg fields, Reply Status = None, Last Checked = today, Notes = `Hunt 6 \| active signal: {post/hiring/recent}`.

Do **not** comment on posts. Do not follow engagement bait.

---

## Step 4 — Message templates (resume review first; apply only after yes)
Tone: respectful, short, human. No em dashes. No emojis. No fake claims. Fill placeholders from the sheet; {MyFirstName} and {MyPitch} come from `config/me.md`. Attach or offer resume only when LinkedIn allows file send or they ask; otherwise offer to email / share link from Profile.

### A) Company with an existing referral (per `config/me.md`) — Hiring Manager / Eng Manager
"Hi {FirstName}, I'm {MyFirstName}, {MyPitch}. I found the {Role} role ({JobLink}) and it looks like a strong fit for my background. I already have an employee referral at {Company}, but blind applications often get rejected without a real look, so I am holding off on submitting until someone on the hiring side has reviewed my resume. If you are involved in hiring for this team, would you be open to a quick resume review and honest feedback on fit? If it looks promising, I will apply right away (with the referral). If not, I will not waste the req. Thank you either way."

### B) Company with an existing referral — Recruiter / Sourcer
"Hi {FirstName}, I'm {MyFirstName}, {MyPitch}. I'm targeting {Role} at {Company} ({JobLink}). I have an employee referral ready, but I want a human screen before I submit. If you own or support this requisition, could you review my resume and tell me whether I should apply now? Happy to share it immediately. Thank you for your time."

### C) No existing referral — Hiring Manager / Eng Manager
"Hi {FirstName}, I'm {MyFirstName}, {MyPitch}. I'm very interested in the {Role} role at {Company} ({JobLink}) and matched it carefully to my resume. I have not applied yet on purpose. Before I submit, could you (or someone on the hiring team) review my resume and tell me if I should apply for this req now? If the fit is weak I will not apply; if it is strong I will apply immediately. Open to a referral if that is how your team prefers it. Thank you."

### D) No existing referral — Recruiter / Sourcer
"Hi {FirstName}, I'm {MyFirstName}, {MyPitch}. I'm considering {Role} at {Company} ({JobLink}) but have not submitted the application yet. If you are hiring for this, would you review my resume and advise whether I should apply now? I only want to apply if there is a real chance of consideration. Happy to send the PDF right away. Thank you."

### Optional one-line company hook
Add one verified line about their team/product/post only if true and current. If unsure, omit.

### Follow-up (same Warm Pending person, no reply, Msg Count = 1, Msg 1 Date ≥ 2 days ago)
"Hi {FirstName}, quick follow-up in case my note got buried. Still holding my application for {Role} at {Company} until I get a hiring-side read on my resume. If you can take a look or point me to the right person, I would be grateful; if not, no worries. Thank you."

Never send a third message to the same person (align with Hunt 3 close-out). After Msg 2 with no reply: Reply Status = **Closed - no reply**. Keep finding **new** people for that role until Day 7.

---

## Step 5 — Reply handling and “satisfactory” gate
If they write anything: **do not reply yourself**. Log Replied Came Details (word for word), Reply Status = Replied, My Decision blank for me — **except** when running this hunt and the reply is clearly actionable for the apply gate below; still log the row, then apply the gate.

### Satisfactory reply (clears apply gate early) — any one is enough
- Asks for resume / reviews it and says apply / says they will look when I apply
- Offers referral or internal submit and tells me to apply (or will apply for me)
- Introduces the hiring manager / recruiter who owns the req
- Explicit “yes, apply now” / “you look like a fit for this req”

Then: set Applications Notes `Warm cleared: {Name} on {date}` and run **Step 6 Apply** for that Job Link only (unless they say the referrer will submit internally — then stay Referral Pending / Warm Pending until they confirm, same as Hunt 1 referral rules).

### Not satisfactory (do not apply yet)
- Silence
- “Not hiring” / “can’t help” / “apply on the website” with no review offer
- Generic careers bot / “please apply online” only
- Closed - no reply

Keep daily sourcing (Step 2–4) until Day 7.

---

## Step 6 — Day-7 auto-apply (only if still no satisfactory reply)
For each Applications row with Apply Status = **Warm Pending** and Notes `Apply after` date **≤ today**:

1. Confirm the job link is still live. If expired: status Skipped + reason; stop.
2. Submit the official application (Profile + resume + truthful screening). Never invent skills, years, visa, or salary. Needs Manual if Profile/resume cannot answer.
3. Company with an existing referral (per `config/me.md`): use the referral flow as the careers site requires (referral already exists — follow on-page referral fields; never invent a referrer name).
4. Update Applications: Apply Status = **Applied** (or Needs Login / Needs Manual), Notes append `Hunt 6 Day-7 auto-apply {date} \| warm window exhausted`.
5. After apply, you may continue light LinkedIn outreach as **After apply** (optional), but the warm gate is done for that Job Link.

If a satisfactory reply arrives on Day 7 before submit, prefer Step 5 clear → apply with that person’s context in Notes.

---

## Daily run checklist (short)
1. Refresh all Warm Pending rows: days elapsed, Apply-after date, live JD check.
2. Check Contacts threads for replies → log → apply gate if satisfactory.
3. For each Warm Pending role still before Day 7: find more **highly active** hiring-side people → connect/message → log Contacts.
4. For any role at Day 7+ with no satisfactory reply: Step 6 auto-apply.
5. Optionally discover one new best-fit role for a Top-5 company that has no open Warm Pending (Step 1) if capacity remains.
6. Final report (below). Stop.

## Rules
- Never apply on Day 0–6 without a satisfactory reply.
- Never expand beyond the Top 5 table.
- Never comment on LinkedIn posts or use engagement hacks.
- Append sheet rows; do not delete history. Update the row you own.
- If anything looks unsafe or LinkedIn limits hit, stop and tell me.

## Final report
Warm Pending (active): N — company, role, warm start, day #, people contacted today, cumulative contacts.
Satisfactory clears → Applied early: N (names).
Day-7 auto-applied: N.
Needs Login / Needs Manual: N.
New roles opened into Warm Pending: N.
Replies logged for me: N (names + one line each).
Anything I must do by hand.
