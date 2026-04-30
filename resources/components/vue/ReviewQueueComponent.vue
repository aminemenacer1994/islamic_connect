<template>
    <section class="review-queue-page container py-4" aria-label="My review queue">
        <header class="review-queue-header">
            <div>
                <p class="review-queue-eyebrow mb-1">Memorisation</p>
                <h1 class="review-queue-title mb-1">My Review Queue</h1>
                <p class="review-queue-subtitle mb-0">
                    Bismillah. Practice the ayahs that need another pass, then return to your next session.
                </p>
            </div>
            <span class="review-queue-count-badge" aria-live="polite">
                {{ queueCount }} to practise
            </span>
        </header>

        <div v-if="isLoading" class="review-queue-loading" role="status" aria-live="polite">
            Loading your review queue...
        </div>

        <div v-else-if="!queueList.length" class="review-queue-empty">
            <h2 class="mb-2">No review needed yet</h2>
            <p class="mb-3">
                Finish a short memorisation session and quiz. Any ayahs that need more work will appear here.
            </p>
            <a href="/surat" class="btn btn-success">Start learning</a>
        </div>

        <ul v-else class="review-queue-list" role="list">
            <li v-for="item in queueList" :key="item.key" class="review-queue-item" role="listitem">
                <div class="review-queue-item-main">
                    <h3 class="review-queue-item-title mb-1">
                        {{ getSurahLabel(item) }} · Ayah {{ item.ayahNumber }}
                    </h3>
                    <p class="review-queue-item-date mb-0">Date marked: {{ formatMarkedAt(item.markedAt) }}</p>
                </div>
                <div class="review-queue-item-actions">
                    <a :href="practiceNowUrl(item)" class="btn btn-success review-queue-action-primary">Practice</a>
                    <button
                        type="button"
                        class="btn btn-outline-danger review-queue-action-secondary"
                        :disabled="isRemoving(item)"
                        :aria-busy="isRemoving(item) ? 'true' : 'false'"
                        @click="removeFromQueue(item)">
                        {{ isRemoving(item) ? "Removing..." : "Remove" }}
                    </button>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
import {
    dispatchReviewQueueSync,
    getReviewQueueList,
    getReviewQueueStorageKey,
    normalizeReviewQueueMap,
    readReviewQueue,
    writeReviewQueue,
    REVIEW_QUEUE_SYNC_EVENT,
} from "../scripts/reviewQueueStorage";
import { trackEventOnce } from "../scripts/memorisationTracking";

export default {
    name: "ReviewQueueComponent",
    data() {
        return {
            isLoading: true,
            currentUserId: 0,
            reviewQueueMap: {},
            reviewQueueStorageHandler: null,
            reviewQueueSyncHandler: null,
            removingKeys: {},
        };
    },
    computed: {
        queueCount() {
            return Object.keys(this.reviewQueueMap || {}).length;
        },
        queueList() {
            return getReviewQueueList(this.reviewQueueMap);
        },
    },
    mounted() {
        this.currentUserId = Number(window?.Laravel?.userId || 0) || 0;
        this.loadReviewQueue();
        trackEventOnce(
            "review_queue_opened",
            { userId: this.currentUserId, count: this.queueCount, flowStep: "review" },
            { dedupeKey: `review_queue_opened:${this.currentUserId}` }
        );
        this.reviewQueueStorageHandler = (event) => {
            if (event?.key !== this.getStorageKey()) return;
            this.loadReviewQueue();
        };
        this.reviewQueueSyncHandler = (event) => {
            if (event?.detail?.key && event.detail.key !== this.getStorageKey()) {
                return;
            }
            this.loadReviewQueue();
        };
        window.addEventListener("storage", this.reviewQueueStorageHandler);
        window.addEventListener(REVIEW_QUEUE_SYNC_EVENT, this.reviewQueueSyncHandler);
    },
    beforeUnmount() {
        if (this.reviewQueueStorageHandler) {
            window.removeEventListener("storage", this.reviewQueueStorageHandler);
            this.reviewQueueStorageHandler = null;
        }
        if (this.reviewQueueSyncHandler) {
            window.removeEventListener(REVIEW_QUEUE_SYNC_EVENT, this.reviewQueueSyncHandler);
            this.reviewQueueSyncHandler = null;
        }
    },
    methods: {
        getScopeOptions() {
            return {
                userId: this.currentUserId,
            };
        },
        getStorageKey() {
            return getReviewQueueStorageKey(this.getScopeOptions());
        },
        loadReviewQueue() {
            const queue = readReviewQueue(this.getScopeOptions());
            this.reviewQueueMap = normalizeReviewQueueMap(queue);
            this.isLoading = false;
        },
        persistReviewQueue(nextQueue = this.reviewQueueMap) {
            const normalized = normalizeReviewQueueMap(nextQueue);
            this.reviewQueueMap = normalized;
            writeReviewQueue(normalized, this.getScopeOptions());
            dispatchReviewQueueSync({
                source: "review-queue-page",
                key: this.getStorageKey(),
                count: Object.keys(normalized).length,
            });
        },
        isRemoving(item) {
            const key = String(item?.key || "").trim();
            return !!(key && this.removingKeys[key]);
        },
        removeFromQueue(item) {
            const key = String(item?.key || "").trim();
            if (!key || this.removingKeys[key]) return;
            // Final hardening: keep queue removal idempotent under rapid taps.
            this.removingKeys = {
                ...this.removingKeys,
                [key]: true,
            };
            const next = { ...this.reviewQueueMap };
            delete next[key];
            try {
                this.persistReviewQueue(next);
            } finally {
                const pending = { ...this.removingKeys };
                delete pending[key];
                this.removingKeys = pending;
            }
        },
        getSurahLabel(item) {
            const explicitName = String(item?.surahEnglishName || "").trim();
            if (explicitName) {
                return `Surah ${item.surahNumber} (${explicitName})`;
            }
            return `Surah ${item?.surahNumber || "?"}`;
        },
        formatMarkedAt(timestamp) {
            const safeTimestamp = Number(timestamp || 0);
            if (!safeTimestamp) return "Unknown";
            try {
                return new Intl.DateTimeFormat(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                }).format(new Date(safeTimestamp));
            } catch (_) {
                return new Date(safeTimestamp).toLocaleString();
            }
        },
        practiceNowUrl(item) {
            const surahNumber = Number(item?.surahNumber || 0);
            const ayahNumber = Number(item?.ayahNumber || 0);
            if (!surahNumber || !ayahNumber) return "/surat";
            return `/surat?surah=${surahNumber}&ayah=${ayahNumber}`;
        },
    },
};
</script>

<style scoped>
.review-queue-page {
    max-width: 980px;
    padding-top: var(--space-5);
    padding-bottom: var(--space-5);
}

.review-queue-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-4);
    margin-bottom: var(--space-5);
}

.review-queue-eyebrow {
    color: #0f766e;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 0.74rem;
}

.review-queue-title {
    color: #0f172a;
    font-size: clamp(1.3rem, 2vw, 1.85rem);
    font-weight: 800;
}

.review-queue-subtitle {
    color: #475569;
}

.review-queue-count-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem 0.75rem;
    border-radius: 999px;
    background: rgba(15, 118, 110, 0.12);
    color: #0f766e;
    font-weight: 800;
    white-space: nowrap;
}

.review-queue-loading,
.review-queue-empty {
    border: 1px solid rgba(148, 163, 184, 0.32);
    border-radius: 14px;
    padding: 1.15rem;
    background: #ffffff;
}

.review-queue-empty h2 {
    font-size: 1.18rem;
    color: #0f172a;
}

.review-queue-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0.72rem;
}

.review-queue-item {
    border: 1px solid rgba(148, 163, 184, 0.28);
    border-radius: 12px;
    padding: 0.95rem;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.85rem;
    flex-wrap: wrap;
    transition: border-color 0.16s ease, box-shadow 0.16s ease;
}

.review-queue-item:hover {
    border-color: rgba(15, 118, 110, 0.24);
    box-shadow: 0 6px 14px rgba(15, 23, 42, 0.05);
}

.review-queue-item-main {
    min-width: 0;
    flex-basis: 240px;
    flex: 1;
}

.review-queue-item-title {
    color: #0f172a;
    font-size: 1rem;
    font-weight: 700;
    overflow-wrap: anywhere;
}

.review-queue-item-date {
    color: #64748b;
    font-size: 0.9rem;
}

.review-queue-item-actions {
    display: inline-flex;
    gap: 0.45rem;
    align-items: center;
}

.review-queue-action-primary,
.review-queue-action-secondary {
    min-height: 44px;
    border-radius: 8px;
    font-weight: 700;
    padding: 0.5rem 0.8rem;
}

:global(body.surat-page-shell-dark) .review-queue-page {
    color: #edf4f1;
}

:global(body.surat-page-shell-dark) .review-queue-title,
:global(body.surat-page-shell-dark) .review-queue-empty h2,
:global(body.surat-page-shell-dark) .review-queue-item-title {
    color: #edf4f1;
}

:global(body.surat-page-shell-dark) .review-queue-subtitle,
:global(body.surat-page-shell-dark) .review-queue-item-date {
    color: #a8bab4;
}

:global(body.surat-page-shell-dark) .review-queue-count-badge {
    background: rgba(142, 224, 212, 0.14);
    color: #8ee0d4;
}

:global(body.surat-page-shell-dark) .review-queue-loading,
:global(body.surat-page-shell-dark) .review-queue-empty,
:global(body.surat-page-shell-dark) .review-queue-item {
    background: rgba(23, 34, 31, 0.88);
    border-color: rgba(142, 224, 212, 0.12);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.16);
}

:global(body.surat-page-shell-dark) .review-queue-item:hover {
    border-color: rgba(142, 224, 212, 0.24);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.22);
}

:global(body.surat-page-shell-dark) .review-queue-action-secondary {
    background: rgba(127, 29, 29, 0.18);
    border-color: rgba(248, 113, 113, 0.24);
    color: #fecaca;
}

@media (max-width: 640px) {
    .review-queue-page {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .review-queue-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .review-queue-count-badge {
        margin-top: 0.15rem;
    }

    .review-queue-item-actions {
        width: 100%;
    }

    .review-queue-item-actions .btn {
        flex: 1;
        min-height: 44px;
    }
}
</style>
