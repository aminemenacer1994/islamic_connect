const SNAPSHOT_VERSION = "1.0";
const APP_VERSION = "memorisation-platform-v1";

function safeJsonParse(raw, fallback = null) {
  try {
    return JSON.parse(raw);
  } catch (_) {
    return fallback;
  }
}

function safeStringify(value, fallback = "") {
  try {
    return JSON.stringify(value);
  } catch (_) {
    return fallback;
  }
}

function hasLocalStorage() {
  return typeof window !== "undefined" && !!window.localStorage;
}

function clonePlain(value) {
  return safeJsonParse(safeStringify(value), null);
}

function atomicWrite(storageKey, payload) {
  if (!hasLocalStorage()) return false;
  const next = safeStringify(payload);
  if (!next) return false;
  const backupKey = `${storageKey}__backup`;
  try {
    const previous = window.localStorage.getItem(storageKey);
    if (previous !== null) {
      window.localStorage.setItem(backupKey, previous);
    }
    window.localStorage.setItem(storageKey, next);
    window.localStorage.removeItem(backupKey);
    return true;
  } catch (_) {
    try {
      const backup = window.localStorage.getItem(backupKey);
      if (backup !== null) {
        window.localStorage.setItem(storageKey, backup);
      }
    } catch (_) {}
    return false;
  }
}

export function createMemorisationDataManager(options = {}) {
  const {
    storageKey = "",
    normalizeAyah,
    getAppVersion = () => APP_VERSION,
  } = options || {};

  function normalizeMap(source) {
    const raw = source && typeof source === "object" ? source : {};
    const normalized = {};
    Object.entries(raw).forEach(([key, value]) => {
      const record = typeof normalizeAyah === "function" ? normalizeAyah(key, value) : null;
      if (record && record.id) {
        normalized[record.id] = record;
      }
    });
    return normalized;
  }

  function getAyahs() {
    if (!storageKey || !hasLocalStorage()) return {};
    const parsed = safeJsonParse(window.localStorage.getItem(storageKey), {});
    return normalizeMap(parsed);
  }

  function saveAyahs(source = {}) {
    const normalized = normalizeMap(source);
    if (!storageKey) return { ok: false, ayahs: normalized };
    const ok = atomicWrite(storageKey, normalized);
    return { ok, ayahs: normalized };
  }

  function sanitizeForExport(record) {
    const cloned = clonePlain(record);
    if (!cloned || typeof cloned !== "object") return null;
    return cloned;
  }

  function generateSnapshot(source = {}) {
    const ayahMap = normalizeMap(source);
    const ayahs = Object.values(ayahMap)
      .map(sanitizeForExport)
      .filter(Boolean)
      .sort((a, b) => {
        const left = `${Number(a?.surah || 0)}:${Number(a?.ayahNumber || 0)}`;
        const right = `${Number(b?.surah || 0)}:${Number(b?.ayahNumber || 0)}`;
        return left.localeCompare(right, undefined, { numeric: true });
      });
    return {
      version: SNAPSHOT_VERSION,
      exportedAt: new Date().toISOString(),
      ayahs,
      meta: {
        totalAyahs: ayahs.length,
        appVersion: String(getAppVersion() || APP_VERSION),
      },
    };
  }

  function validateSnapshot(snapshot) {
    const source = snapshot && typeof snapshot === "object" ? snapshot : null;
    if (!source) return { ok: false, reason: "Snapshot is not an object." };
    if (String(source.version || "") !== SNAPSHOT_VERSION) {
      return { ok: false, reason: "Snapshot version is not supported." };
    }
    if (!Array.isArray(source.ayahs)) {
      return { ok: false, reason: "Snapshot ayahs payload is invalid." };
    }
    const normalized = {};
    for (const item of source.ayahs) {
      const key = `${item?.surah}:${item?.ayahNumber}`;
      const record = typeof normalizeAyah === "function" ? normalizeAyah(key, item) : null;
      if (!record || !record.id) {
        return { ok: false, reason: `Invalid ayah record for ${key || "unknown ayah"}.` };
      }
      normalized[record.id] = record;
    }
    return { ok: true, ayahs: normalized };
  }

  function resolveRecordUpdatedAt(record) {
    const timestamps = [
      record?.lastUpdated,
      record?.updatedAt,
      record?.mistakes?.lastMistakeDate,
      record?.nextReviewDate,
    ];
    for (const value of timestamps) {
      const date = new Date(value || 0);
      if (!Number.isNaN(date.getTime())) return date.getTime();
    }
    return 0;
  }

  function mergeAyahs(currentAyahs = {}, importedAyahs = {}) {
    const current = normalizeMap(currentAyahs);
    const incoming = normalizeMap(importedAyahs);
    const merged = { ...current };
    Object.entries(incoming).forEach(([id, record]) => {
      if (!merged[id]) {
        merged[id] = record;
        return;
      }
      const currentUpdatedAt = resolveRecordUpdatedAt(merged[id]);
      const nextUpdatedAt = resolveRecordUpdatedAt(record);
      merged[id] = nextUpdatedAt >= currentUpdatedAt ? record : merged[id];
    });
    return normalizeMap(merged);
  }

  function importSnapshot(snapshot, options = {}) {
    const mode = String(options?.mode || "merge").toLowerCase() === "replace" ? "replace" : "merge";
    const validated = validateSnapshot(snapshot);
    if (!validated.ok) {
      return { ok: false, reason: validated.reason, ayahs: null };
    }
    const nextAyahs = mode === "replace"
      ? validated.ayahs
      : mergeAyahs(getAyahs(), validated.ayahs);
    const saved = saveAyahs(nextAyahs);
    if (!saved.ok) {
      return { ok: false, reason: "Could not save imported memorisation data.", ayahs: null };
    }
    return { ok: true, ayahs: saved.ayahs, mode };
  }

  function buildSnapshotFilename(prefix = "quran-memorisation-progress") {
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    return `${prefix}-${stamp}.json`;
  }

  return {
    buildSnapshotFilename,
    generateSnapshot,
    getAyahs,
    importSnapshot,
    mergeAyahs,
    saveAyahs,
    validateSnapshot,
  };
}

