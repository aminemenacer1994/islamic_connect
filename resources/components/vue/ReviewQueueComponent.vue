<template>
    <section class="review-queue-page container py-4" aria-label="My review queue">
        <header class="review-queue-header">
            <div>
                <p class="review-queue-eyebrow mb-1">Memorisation</p>
                <h1 class="review-queue-title mb-1">My Review Queue</h1>
                <p class="review-queue-subtitle mb-0">
                    Track difficult verses and jump back to focused practice.
                </p>
            </div>
            <span class="review-queue-count-badge" aria-live="polite">
                {{ queueCount }} waiting
            </span>
        </header>

        <div v-if="isLoading" class="review-queue-loading" role="status" aria-live="polite">
            Loading your review queue...
        </div>

        <div v-else-if="!queueList.length" class="review-queue-empty">
            <h2 class="mb-2">No verses marked yet</h2>
            <p class="mb-3">
                Go to the Quran reader, turn on <strong>Mark as difficult</strong>, and tap stars next to verses you want to revisit.
            </p>
            <a href="/surat" class="btn btn-success">Go to Quran Reader</a>
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
                    <a :href="practiceNowUrl(item)" class="btn btn-sm btn-success">Practice Now</a>
                    <button type="button" class="btn btn-sm btn-outline-danger" @click="removeFromQueue(item)">
                        Remove
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

export default {
    name: "ReviewQueueComponent",
    data() {
        return {
            isLoading: true,
            currentUserId: 0,
            reviewQueueMap: {},
            reviewQueueStorageHandler: null,
            reviewQueueSyncHandler: null,
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
        removeFromQueue(item) {
            const key = String(item?.key || "").trim();
            if (!key) return;
            const next = { ...this.reviewQueueMap };
            delete next[key];
            this.persistReviewQueue(next);
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
}

.review-queue-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.25rem;
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
}

.review-queue-item-main {
    min-width: 240px;
    flex: 1;
}

.review-queue-item-title {
    color: #0f172a;
    font-size: 1rem;
    font-weight: 700;
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

@media (max-width: 640px) {
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
    }
}
</style>
