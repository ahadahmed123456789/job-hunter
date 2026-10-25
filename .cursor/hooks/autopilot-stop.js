const fs = require("fs");
const path = require("path");

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  raw += chunk;
});
process.stdin.on("end", () => {
  let input = {};
  try {
    input = JSON.parse(raw || "{}");
  } catch {
    input = {};
  }
  process.stdout.write(JSON.stringify(decide(input)));
});

function decide(input) {
  if (input.status && input.status !== "completed") return {};

  const statePath = path.join(process.cwd(), "autopilot", "state.json");
  let state;
  try {
    state = JSON.parse(fs.readFileSync(statePath, "utf8"));
  } catch {
    return {};
  }

  if (!state.enabled || !state.continue) return {};
  if (state.hard_stop) return {};
  const next = String(state.next || "").trim();
  if (!next) return {};

  return {
    followup_message:
      "Autopilot. Do not ask the user. Re-read the hunt file, autopilot/lessons.md, and autopilot/state.json from disk, then do this now: " +
      next +
      "\n\nObey the matching hunt file, referral-first, and Hunt 2/3 messaging (no DM until accept; follow-up only after 2 days). Use lessons.md for bugs already solved. Use Claude in Chrome only. Never type passwords. Login, OTP, CAPTCHA, or a LinkedIn limit is a hard stop: set continue to false, set hard_stop to the blocker, then stop. A verified site or sheet workaround goes in lessons.md. A wrong hunt file gets a small logged fix (see AGENTS.md). If this step finishes and more legal work is due, update next and leave continue true. If nothing else is due, set continue false and next to empty. Never invent salary, visa, skills, or a successful apply.",
  };
}
