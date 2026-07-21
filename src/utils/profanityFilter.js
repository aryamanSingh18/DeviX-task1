// A small, easily-extendable list of blocked words. Keep this list
// case-insensitive and whole-word matched so it doesn't clobber
// substrings inside unrelated words.
const BLOCKED_WORDS = [
  "badword",
  "damn",
  "hell",
  "idiot",
  "stupid",
  "shut up",
];

const pattern = new RegExp(
  `\\b(${BLOCKED_WORDS.map((w) => w.replace(/\s+/g, "\\s+")).join("|")})\\b`,
  "gi"
);

/**
 * Returns true if the text contains a blocked word.
 */
export function containsProfanity(text) {
  pattern.lastIndex = 0;
  return pattern.test(text);
}

/**
 * Replaces every blocked word with asterisks matching its length,
 * e.g. "badword" -> "*******".
 */
export function censor(text) {
  pattern.lastIndex = 0;
  return text.replace(pattern, (match) => "*".repeat(match.length));
}
