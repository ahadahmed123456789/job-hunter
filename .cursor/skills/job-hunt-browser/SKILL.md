---
name: job-hunt-browser
description: Drive job applications, Google Sheets logging, and LinkedIn outreach with Claude in Chrome. Use when applying to jobs, filling ATS forms, sending LinkedIn connection requests, or updating the job-hunter tracking sheet.
---

# Job-hunt browser

Hunts use Claude in Chrome only (see AGENTS.md). Playwright is removed.


## Resume

Path in `config/me.md`. If missing, use the newest PDF in that folder.

## Hunt loop

1. Read the tracking sheet and the companies list sheet. Those sheets are the DB. Do not copy the companies list into markdown.
2. Run the requested hunt file. Referral-first and Hunt 2/3 messaging rules apply. Do not edit hunt markdown unless asked.
3. Never invent salary, visa, or skills. Stop on LinkedIn limits or CAPTCHA.
4. Autopilot: the word hunt starts the next unfinished step. Re-read hunt files and `autopilot/lessons.md` from disk. Do not ask between legal steps. Update `state.json` before the turn ends. Log a repeated failure in `failures.jsonl`. A verified workaround goes in `lessons.md`. Do not edit hunt markdown; put a wrong hunt rule in `proposed-instruction-fixes.md`. The stop hook submits `next` only while `continue` is true and `hard_stop` is empty. Cap is 8 auto-continues per chat.
