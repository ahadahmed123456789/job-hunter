---
name: job-hunt-browser
description: Drive job applications, Google Sheets logging, and LinkedIn outreach with Antigravity (Playwright MCP) or browser tools. Use when applying to jobs, filling ATS forms, sending LinkedIn connection requests, or updating the job-hunter tracking sheet.
---

# Job-hunt browser

In Antigravity, use Playwright MCP tools (`browser_*`) connected to the signed-in browser session. Login, OTP, or CAPTCHA means Needs Login. Never type or store passwords.

## Resume

Path in `config/me.md`. If missing, use the newest PDF in that folder.

## Hunt loop

1. Read the tracking sheet and the companies list sheet. Those sheets are the DB. Do not copy the companies list into markdown.
2. Run the requested hunt file. Referral-first and Hunt 2/3 messaging rules apply. Do not edit hunt markdown unless asked.
3. Never invent salary, visa, or skills. Stop on LinkedIn limits or CAPTCHA.
