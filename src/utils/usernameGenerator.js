const ANIMALS = [
  "Panda",
  "Tiger",
  "Fox",
  "Wolf",
  "Otter",
  "Falcon",
  "Raven",
  "Lynx",
  "Cobra",
  "Heron",
  "Badger",
  "Mantis",
  "Owl",
  "Koala",
  "Viper",
  "Sparrow",
];

/**
 * Generates a random anonymous display name, e.g. "AnonymousPanda42".
 */
export function generateUsername() {
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  const number = Math.floor(Math.random() * 99) + 1;
  return `Anonymous${animal}${number}`;
}

/**
 * Generates a stable per-tab session id, used for presence tracking
 * so refreshing the page doesn't count as a brand-new user forever.
 */
export function generateSessionId() {
  return `s-${Math.random().toString(36).slice(2, 11)}-${Date.now()}`;
}
