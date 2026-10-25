# Job hunter

AI-agent playbooks that find jobs, apply, and run referral outreach on LinkedIn, logging everything in Google Sheets. Works with Claude Code, Cursor or Codex driving your real Chrome through the Claude in Chrome extension.

`AGENTS.md` is the runbook every agent follows. The hunts live in `instructions/`:

| Hunt | File | What it does |
|------|------|--------------|
| 0 | `0find_latest_jobs_hunt.md` | Finds fitting jobs on the careers pages in your companies list, 5 companies per run |
| 1 | `1apply_find_send_connection_req_hunt.md` | Referral-first gate, applies (self-apply path), finds 2 people per job, sends connection requests |
| 2 | `2linked_in_accepted_hunt.md` | Checks accepted requests and sends the first message |
| 3 | `3reply_hunt_linkedin.md` | Logs replies, sends one follow-up after 2 days, then closes |
| 4 | `4linkedin_jobs_find_apply_hunt.md` | LinkedIn Jobs, Easy Apply and hiring-post email applies |
| 5 | `5global_platforms_find_apply_hunt.md` | Other job platforms |
| 6 | `6top_mnc_warm_apply_hunt.md` | Google / Microsoft / Meta / Amazon / Apple: get a hiring-side look before applying, auto-apply on Day 7 |

Type `hunt` in your agent and it runs the next unfinished step (see `AGENTS.md`).

## Setup (once per person)

1. **Make your two Google Sheets.**
   - **Tracking sheet** with five tabs named exactly `Applications`, `Contacts`, `Replied Came Details`, `Profile`, `Sheet1`. Import the matching file from `templates/` into each tab (File > Import > Upload > Replace current sheet). Fill in the `Profile` tab's values; hunts answer application forms only from Profile and your resume. `Sheet1` is your do-not-contact list.
   - **Companies list** from `templates/companies-list.csv`: one row per company with its official careers link, ranked in the order you want them hunted.
2. **Fill in your config.** Copy `config/me.example.md` to `config/me.md` and fill in every value: both sheet links, the Applications and Contacts tab gids (the number after `gid=` in the URL when that tab is open), resume path, your name and one-line pitch, resume highlights, existing referrals, standard answers.
3. **Resume.** Put a copy of your resume at `.job-hunter-output/resume/<file>.pdf` (the browser upload tool reads from the project folder).
4. **Autopilot state.** Copy `autopilot/state.example.json` to `autopilot/state.json`.
5. **Browser.** Install the Claude in Chrome extension and sign in to Google, LinkedIn and Gmail in that Chrome. Agents never type passwords; any login, OTP or CAPTCHA stops the run.

## What is shared vs personal

Shared through this repo: hunt rules, `AGENTS.md`, `autopilot/lessons.md` (site workarounds), agent rules and skills.

Personal and git-ignored (`.gitignore`): `config/me.md`, `autopilot/state.json`, `autopilot/failures.jsonl`, `logs/`, `.job-hunter-output/`. Agents are told never to write personal data into shared files. Before you commit, run `git diff` and check for names, emails, phone numbers, sheet IDs or salaries.

## Rules that never change

No invented salary, visa, skills, emails or applications. No messages before a connection is accepted, one follow-up at most, never answer a reply on your behalf. Respect LinkedIn limits (20 requests and 15 messages a day); a LinkedIn warning or CAPTCHA is a hard stop.
