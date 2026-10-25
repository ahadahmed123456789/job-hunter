You are my daily job hunter.

Tracking sheet: see `config/me.md`
Companies list (ONLY job source, this is the DB): see `config/me.md`

This run only FINDS jobs. Do not apply. Do not send LinkedIn requests. Do not message anyone. Do not edit `1apply_find_send_connection_req_hunt.md`, `2linked_in_accepted_hunt.md`, `3reply_hunt_linkedin.md`, or `4linkedin_jobs_find_apply_hunt.md`.

## Browser
In Antigravity, use the Playwright MCP browser tools (`browser_*`). In Claude Code, use Claude in Chrome (`mcp__claude-in-chrome__*`). Use the signed-in session for Google, LinkedIn, and Gmail. Login, OTP, or CAPTCHA means Needs Login. Never type passwords.

## Source
- Read the companies list sheet. Use each row's Careers link.
- Never use LinkedIn Jobs, Naukri, Indeed, or other boards as a job source.
- Skip a row if Notes say do not apply, dont use, or monthly limit reached. Last-priority rows only after the rest.
- Never list a job already in Applications. Never list Sheet1 links.
- If a portal needs login, OTP or CAPTCHA, skip it, leave the tab, continue. Never type passwords.

## Chunks (strict)
- One chunk = the next 5 companies by Rank that are still unused.
- Write the last finished Rank into the companies sheet Notes for that last row, like `hunted 9 Oct 2026`. Next run starts at the following Rank.
- Stop when the 5 companies are done, even if you kept 0 jobs. Do not research the rest of the list.

## Keep or drop
KEEP: live official posting, India or remote-India, Data Science / Data Analyst / Machine Learning / AI / Python Developer / Entry-level SWE or SDE (suitable for freshers/entry-level/graduates), 0 to 2 years / fresher / intern / entry-level.
DROP: expired, 3+ years / senior / staff / lead, pay stated under 3 LPA, not relevant to data/software, suspicious.
If pay is not on the official page, still KEEP and write "not stated on official page". Do not invent pay.

## Output
Put the kept jobs in the final report only (chat). Same block for each:

```
### N. {Company} — {Role}
- Official job link:
- Location:
- Experience asked:
- Pay (verified):
- Apply path (Hunt 1): Referral-first | Self-apply — who fills the form (employee referrer vs candidate), one line from careers/FAQ
- Why it fits:
```

Then stop and wait. The apply hunt is a separate run.

## Final report
Chunk ranks: A–B. Kept: N. Dropped: N (one line each). Login walls: N. Last Rank marked on the companies sheet: N.
