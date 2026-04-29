// Lightweight local tracking for memorisation flows.
// Goals:
// - No external dependencies.
// - Very small runtime cost (sync localStorage write only when an event is new).
// - Dedupe: fire only once per action (per tab + persisted key).
//
// Storage format:
//   localStorage["ic_memorisation_events_v1"] = JSON.stringify([{...event}])
//
// This is intentionally "best effort": failures never break UX.

const STORE_KEY = "ic_memorisation_events_v1";
const MAX_EVENTS = 300;
const RECENT_EVENT_WINDOW_MS = 4000;

const firedInTab = new Set();
const recentFingerprints = new Map();

function nowIso() {
  try {
    return new Date().toISOString();
  } catch (_) {
    return String(Date.now());
  }
}

function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch (_) {
    return fallback;
  }
}

function readStore() {
  if (typeof window === "undefined" || !window.localStorage) return [];
  const raw = window.localStorage.getItem(STORE_KEY);
  const parsed = safeParse(raw, []);
  return Array.isArray(parsed) ? parsed : [];
}

function writeStore(events) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(events));
  } catch (_) {}
}

function hasPersistedKey(dedupeKey) {
  if (!dedupeKey) return false;
  const events = readStore();
  return events.some((evt) => evt && evt.dedupeKey === dedupeKey);
}

function stablePayloadString(payload) {
  if (!payload || typeof payload !== "object") return "";
  const keys = Object.keys(payload).sort();
  const normalized = {};
  keys.forEach((key) => {
    normalized[key] = payload[key];
  });
  try {
    return JSON.stringify(normalized);
  } catch (_) {
    return "";
  }
}

function isRecentDuplicate(eventName, payload) {
  const now = Date.now();
  const fingerprint = `${eventName}:${stablePayloadString(payload)}`;
  const seenAt = Number(recentFingerprints.get(fingerprint) || 0);
  if (seenAt && now - seenAt < RECENT_EVENT_WINDOW_MS) {
    return true;
  }
  recentFingerprints.set(fingerprint, now);
  if (recentFingerprints.size > 800) {
    // Keep memory bounded in long-lived tabs.
    recentFingerprints.clear();
  }
  return false;
}

export function trackEventOnce(name, payload = {}, options = {}) {
  const eventName = String(name || "").trim();
  if (!eventName) return false;
  if (isRecentDuplicate(eventName, payload)) return false;

  const dedupeKey = String(options?.dedupeKey || `${eventName}:${options?.id || ""}`).trim();
  if (!dedupeKey) return false;

  if (firedInTab.has(dedupeKey)) return false;
  if (hasPersistedKey(dedupeKey)) {
    firedInTab.add(dedupeKey);
    return false;
  }

  firedInTab.add(dedupeKey);

  const event = {
    name: eventName,
    at: nowIso(),
    dedupeKey,
    payload: payload && typeof payload === "object" ? payload : { value: payload },
  };

  const next = readStore();
  next.push(event);
  if (next.length > MAX_EVENTS) {
    next.splice(0, next.length - MAX_EVENTS);
  }
  writeStore(next);

  return true;
}
