# Proposed hunt-file fixes

Hunt files stay as written until the user accepts a change. If a hunt file itself is wrong, append the evidence here and keep hunting around it. Do not edit the hunt file.

```
## YYYY-MM-DD — file — one line
- Evidence:
- Proposed change:
- Why this is not a silent edit:
```

## 2026-10-22 — all hunt files — browser was Cursor/Chrome-specific (applied)
- Evidence: every hunt said "Use Cursor's built-in browser"; Hunts 4, 5, 6 also said to use sessions "signed in in my Chrome", contradicting "do not use my Chrome".
- Change: one agent-neutral Browser line (Claude Browser pane / Cursor browser); Chrome mentions now say "signed in inside the agent browser". Hunt 1 was indented 4 spaces and rendered as a code block; dedented.
- Also: autopilot state moved from `.cursor/autopilot/` to shared `autopilot/`; AGENTS.md + CLAUDE.md added; Cursor hook and rules repointed.

## 2026-10-22 — all hunt files + AGENTS.md — browser is Claude in Chrome only (applied, user instruction)
- Evidence: user said "every hunt must use claude in chrome only". The Claude Browser pane lost the LinkedIn session and dropped keystrokes in Sheets; Chrome worked.
- Change: Browser line in every hunt file and AGENTS.md now says Claude in Chrome only; Claude Browser pane, Cursor browser and Playwright are banned.

## 2026-10-22 — Hunt 0 vs Hunt 1 vs Profile — unstated pay (APPLIED 2026-10-22, user chose option 1)
- Evidence: Hunt 0 says "If pay is not on the official page, still KEEP". Hunt 1 Step 1 says skip if stated pay "is under 12 LPA or cannot be verified", and the Profile tab says "Minimum pay to apply: 12 LPA, verified from the posting". Almost no India posting states pay, so a strict Hunt 1 would skip nearly every Hunt 0 keep. On 2026-10-09 Postman Native Git was Skipped for "Pay cannot be verified". On 2026-10-22 the Synopsys, Pure Storage and Cadence keeps went through as Referral Pending with "pay not stated".
- Proposed change: Hunt 1: "Skip if stated pay is under 12 LPA. If pay is not stated, continue and note 'pay not stated'; the recruiter conversation verifies it." The Profile wording would match.
- Why this is not a silent edit: it loosens an eligibility rule, so per AGENTS.md the user must decide.

- Applied: Hunt 1 Step 1 now skips only when stated pay is under 12 LPA; unstated pay continues with note "pay not stated". Profile tab 'Minimum pay to apply' updated to match.


## 2026-10-25 — all hunt files & templates — Fresher Data Science / ML / Analyst customization (applied, user request)
- Evidence: User is a fresher targeting Data Science, Data Analytics, Machine Learning, and Python roles. Previous hunt instructions were hardcoded for 2+ years Full Stack / SDE roles and 12 LPA minimum floor, which would drop legitimate entry-level and fresher data roles.
- Change:
  - Hunt 0/1/4/5/6: Role gates updated to Data Science / Data Analyst / Machine Learning / AI / Python Developer / Entry-level SWE (0-2 years, fresher/intern/graduate). Drop 3+ years / senior / lead.
  - Search queries and keywords updated in Hunts 4 & 5 to target Data Science, Machine Learning, Data Analytics, Python, and SQL roles.
  - Pay threshold adjusted to 3 LPA floor when stated (keep when unstated), and aligned Profile template 'Minimum pay to apply'.
  - Second LinkedIn connection target updated to include senior data scientists, ML engineers, and data leads.
- Applied: Hunt files updated accordingly.
