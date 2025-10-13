// Lightweight client-side milestone tracker
// Stores counts and achieved thresholds in localStorage or sessionStorage

function getStorage(scope) {
  return scope === 'session' ? window.sessionStorage : window.localStorage;
}

function readJSON(storage, key, fallback) {
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) {
    return fallback;
  }
}

export function getCount(eventKey, scope = 'persistent') {
  const storage = getStorage(scope);
  const key = `${scope}_count_${eventKey}`;
  const raw = storage.getItem(key);
  return raw ? parseInt(raw, 10) || 0 : 0;
}

export function setCount(eventKey, value, scope = 'persistent') {
  const storage = getStorage(scope);
  const key = `${scope}_count_${eventKey}`;
  storage.setItem(key, String(value));
  return value;
}

export function increment(eventKey, by = 1, scope = 'persistent') {
  const current = getCount(eventKey, scope);
  return setCount(eventKey, current + by, scope);
}

export function getAchieved(eventKey, scope = 'persistent') {
  const storage = getStorage(scope);
  const key = `${scope}_achieved_${eventKey}`;
  return readJSON(storage, key, []);
}

export function setAchieved(eventKey, achieved, scope = 'persistent') {
  const storage = getStorage(scope);
  const key = `${scope}_achieved_${eventKey}`;
  storage.setItem(key, JSON.stringify(achieved));
}

// Increments count and returns the highest newly reached threshold, or null
export function trackAndDetect(eventKey, thresholds = [], scope = 'persistent') {
  const count = increment(eventKey, 1, scope);
  const achieved = new Set(getAchieved(eventKey, scope));
  // Determine newly hit thresholds (<= count and not yet achieved)
  const newly = thresholds
    .filter((t) => typeof t === 'number')
    .filter((t) => t <= count && !achieved.has(t))
    .sort((a, b) => a - b);
  if (newly.length === 0) return null;
  // Mark all newly reached as achieved; return the highest one for messaging
  const highest = newly[newly.length - 1];
  newly.forEach((t) => achieved.add(t));
  setAchieved(eventKey, Array.from(achieved), scope);
  return { threshold: highest, count };
}

export function hasReached(eventKey, threshold, scope = 'persistent') {
  const achieved = new Set(getAchieved(eventKey, scope));
  return achieved.has(threshold);
}

