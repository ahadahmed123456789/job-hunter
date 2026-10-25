from pathlib import Path

root = Path(__file__).resolve().parents[2] / "instructions"
# Common UTF-8 sequences that were mis-decoded / double-encoded
fixes = {
    "\u00e2\u0086\u0092": "->",  # â
    "\u00e2\u0080\u0094": "-",  # â
    "\u00e2\u0080\u0093": "-",  # â
    "\u00e2\u0080\u00a6": "...",  # âŚ
    "\u00e2\u0080\u009c": '"',
    "\u00e2\u0080\u009d": '"',
    "\u00e2\u0080\u0098": "'",
    "\u00e2\u0080\u0099": "'",
    "\u00e2\u0080\u00a2": "-",
    "Â ": " ",
    "â": "->",
    "â": "-",
    "â": "-",
    "âŚ": "...",
    "â": '"',
    "â": '"',
    "â¢": "-",
}

for path in root.glob("*.md"):
    text = path.read_text(encoding="utf-8", errors="replace")
    new = text
    for bad, good in fixes.items():
        new = new.replace(bad, good)
    if new != text:
        path.write_text(new, encoding="utf-8")
        print("cleaned", path.name)
    else:
        print("clean", path.name)
