---
name: job-hunt-browser
description: Drive job applications, Google Sheets logging, and LinkedIn outreach with Cursor's built-in browser. Use when applying to jobs, filling ATS forms, sending LinkedIn connection requests, or updating the job-hunter tracking sheet.
---

# Job-hunt browser

Use Cursor's built-in browser (`cursor-ide-browser`). Playwright is removed. Do not attach to the user's Chrome.

The built-in browser is not logged into the user's Chrome. Login, OTP, or CAPTCHA means Needs Login. Never type or store passwords.

## Resume

Path in `config/me.md`. If missing, use the newest PDF in that folder.

## Hunt loop

1. Read the tracking sheet and the companies list sheet. Those sheets are the DB. Do not copy the companies list into markdown.
2. Run the requested hunt file. Referral-first and Hunt 2/3 messaging rules apply. Do not edit hunt markdown unless asked.
3. Never invent salary, visa, or skills. Stop on LinkedIn limits or CAPTCHA.
