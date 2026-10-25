# Job hunter — agent runbook

Any AI agent (Claude Code, Cursor, Codex) runs this project the same way. The hunt files in `instructions/` are the rules. This file only says how to drive them.

## The word `hunt`
`hunt` starts the next unfinished work. Do not ask which hunt.
1. Read from disk: `autopilot/state.json`, `autopilot/lessons.md`, the tail of `autopilot/failures.jsonl`, and the hunt file for the step in `next`.
2. If `next` is empty, pick by the queue below.
3. Do the step in this turn. Update `autopilot/state.json` before the turn ends.

## Queue
- Hunt 0 kept jobs → Hunt 1 on those jobs (referral-first gate before any submit).
- Hunt 1 chunk done → LinkedIn ×2 for Referral Pending / Applied rows still missing people. No DMs.
- Accepted with Msg Count 0 → Hunt 2 first message, Next Action +2 days.
- Msg Count 1, no reply, Msg 1 Date 2+ days ago → Hunt 3 follow-up, then close.
- Warm Pending rows (Hunt 6) → Hunt 6 daily checklist.
- Nothing due → Hunt 0 next chunk of 5 companies.

## Browser
Every hunt uses **Claude in Chrome only** (`mcp__claude-in-chrome__*`): the user's real Chrome, where Google, LinkedIn and Gmail are signed in. Never use the Claude Browser pane (`mcp__Claude_Browser__*`), Cursor's browser, or Playwright. Public job-board APIs may also be read with curl (see `autopilot/lessons.md`). Login, OTP, CAPTCHA, or account creation = Needs Login: leave the tab, log it, move on. Never type passwords.

## Data
- Every personal value lives in `config/me.md`: tracking sheet (Applications, Contacts, Replied Came Details, Profile, Sheet1), companies list (Hunt 0 source), resume path, name and pitch for messages, existing referrals, standard answers. Read it at the start of every run. If it is missing, stop and ask the user to copy `config/me.example.md` to `config/me.md` and fill it in (see README.md).
- Sheets are the database. Do not copy them into markdown.

## Personal data stays out of shared files
`config/me.md`, `autopilot/state.json`, `autopilot/failures.jsonl`, `logs/` and `.job-hunter-output/` are personal and git-ignored. Everything else is shared through the repo. Never write a name, email, phone, salary, sheet ID or gid, sheet row number, resume file name, or contact name into `instructions/`, `AGENTS.md`, `autopilot/lessons.md` or `autopilot/proposed-instruction-fixes.md`. Use a placeholder like `{MyFirstName}` or "see `config/me.md`" instead.

## Self-correction
- Transient failure (timeout, missed click): retry once.
- Same failure twice: append one JSON line to `autopilot/failures.jsonl` (date, step, evidence, action).
- Verified workaround for a site or sheet: append to `autopilot/lessons.md`.
- A hunt file that is wrong, contradictory, or tool-specific: fix the hunt file directly with a small edit, and append a dated entry to `autopilot/proposed-instruction-fixes.md` saying what changed and why. Never loosen eligibility, duplicate, referral, messaging, or limit rules to make a run look finished.
- Hard stop (set `continue` false, set `hard_stop`): LinkedIn weekly limit or warning, CAPTCHA on LinkedIn, a referral reply that needs My Decision, or anything unsafe.

## Never
Invent salary, visa, skills, emails, or a successful apply. Message Sheet1 (do-not-contact) contacts. Comment on posts. Leave `continue` true with an empty `next`.

## Run log
At the end of each run, write `logs/hunt_log_YYYY-MM-DD_<hunt>.md` with the hunt's final report.
