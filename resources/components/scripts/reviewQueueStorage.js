export const REVIEW_QUEUE_STORAGE_BASE_KEY = "ic_difficult_review_queue_v1";
export const REVIEW_QUEUE_TOOL_PREFERENCE_BASE_KEY =
    "ic_difficult_review_tool_v1";
export const REVIEW_QUEUE_SYNC_EVENT = "ic-review-queue-updated";
const REVIEW_QUEUE_ANON_ID_STORAGE_KEY = "ic_surat_pref_anon_id";

function toPositiveInt(value) {
    const normalized = Number(value);
    if (!Number.isFinite(normalized) || normalized <= 0) {
        return 0;
    }
    return Math.trunc(normalized);
}

function hasWindow() {
    return typeof window !== "undefined";
}

export function getReviewQueueScopeUserId(options = {}) {
    return toPositiveInt(options?.userId || 0);
}

export function getOrCreateReviewQueueAnonId() {
    if (!hasWindow()) return "local";
    try {
        let anonId = localStorage.getItem(REVIEW_QUEUE_ANON_ID_STORAGE_KEY);
        if (!anonId) {
            anonId = `anon-${Math.random().toString(36).slice(2, 12)}`;
            localStorage.setItem(REVIEW_QUEUE_ANON_ID_STORAGE_KEY, anonId);
        }
        return String(anonId || "local").trim() || "local";
    } catch (_) {
        return "local";
    }
}

export function buildScopedReviewQueueKey(baseKey, options = {}) {
    const cleanBase = String(baseKey || "").trim();
    if (!cleanBase) return "";
    const userId = getReviewQueueScopeUserId(options);
    if (userId) {
        return `${cleanBase}_user_${userId}`;
    }
    return `${cleanBase}_anon_${getOrCreateReviewQueueAnonId()}`;
}

export function getReviewQueueStorageKey(options = {}) {
    return buildScopedReviewQueueKey(REVIEW_QUEUE_STORAGE_BASE_KEY, options);
}

export function getReviewQueueToolPreferenceKey(options = {}) {
    return buildScopedReviewQueueKey(
        REVIEW_QUEUE_TOOL_PREFERENCE_BASE_KEY,
        options
    );
}

export function normalizeReviewQueueEntry(entry) {
    if (!entry || typeof entry !== "object") return null;
    const surahNumber = toPositiveInt(entry.surahNumber || entry.surah_number);
    const ayahNumber = toPositiveInt(entry.ayahNumber || entry.ayah_number);
    if (!surahNumber || !ayahNumber) return null;
    const key = `${surahNumber}:${ayahNumber}`;
    return {
        key,
        surahNumber,
        ayahNumber,
        surahEnglishName: String(
            entry.surahEnglishName || entry.surah_name || ""
        ).trim(),
        surahArabicName: String(entry.surahArabicName || "").trim(),
        translation: String(entry.translation || "")
            .replace(/\s+/g, " ")
            .trim(),
        text: String(entry.text || "")
            .replace(/\s+/g, " ")
            .trim(),
        markedAt:
            Number(entry.markedAt || entry.marked_at || entry.createdAt || 0) ||
            Date.now(),
    };
}

export function normalizeReviewQueueMap(raw) {
    const source =
        raw && typeof raw === "object" && !Array.isArray(raw)
            ? raw
            : Array.isArray(raw)
              ? raw.reduce((acc, item) => {
                    const normalized = normalizeReviewQueueEntry(item);
                    if (normalized?.key) {
                        acc[normalized.key] = normalized;
                    }
                    return acc;
                }, {})
              : {};

    const normalizedMap = {};
    Object.entries(source).forEach(([rawKey, value]) => {
        const normalized = normalizeReviewQueueEntry({
            ...value,
            key: rawKey,
        });
        if (!normalized?.key) return;
        normalizedMap[normalized.key] = normalized;
    });

    return normalizedMap;
}

export function readReviewQueue(options = {}) {
    if (!hasWindow()) return {};
    try {
        const key = getReviewQueueStorageKey(options);
        if (!key) return {};
        const raw = localStorage.getItem(key);
        if (!raw) return {};
        return normalizeReviewQueueMap(JSON.parse(raw));
    } catch (_) {
        return {};
    }
}

export function writeReviewQueue(queueMap, options = {}) {
    if (!hasWindow()) return false;
    try {
        const key = getReviewQueueStorageKey(options);
        if (!key) return false;
        const payload = JSON.stringify(normalizeReviewQueueMap(queueMap));
        localStorage.setItem(key, payload);
        return true;
    } catch (_) {
        return false;
    }
}

export function readReviewQueueToolPreference(options = {}) {
    if (!hasWindow()) return false;
    try {
        const key = getReviewQueueToolPreferenceKey(options);
        if (!key) return false;
        const raw = String(localStorage.getItem(key) || "")
            .trim()
            .toLowerCase();
        return raw === "1" || raw === "true" || raw === "yes";
    } catch (_) {
        return false;
    }
}

export function writeReviewQueueToolPreference(enabled, options = {}) {
    if (!hasWindow()) return false;
    try {
        const key = getReviewQueueToolPreferenceKey(options);
        if (!key) return false;
        localStorage.setItem(key, enabled ? "1" : "0");
        return true;
    } catch (_) {
        return false;
    }
}

export function dispatchReviewQueueSync(detail = {}) {
    if (!hasWindow()) return;
    try {
        window.dispatchEvent(
            new CustomEvent(REVIEW_QUEUE_SYNC_EVENT, {
                detail: {
                    ...detail,
                    timestamp: Date.now(),
                },
            })
        );
    } catch (_) {
        // ignore dispatch errors
    }
}

export function getReviewQueueList(queueMap) {
    const normalized = normalizeReviewQueueMap(queueMap);
    return Object.values(normalized).sort(
        (left, right) => Number(right.markedAt || 0) - Number(left.markedAt || 0)
    );
}
