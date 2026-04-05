<template>
    <section class="library-search-section">
        <div class="search-shell shadow-sm">
            <div class="search-layout">
                <div class="search-main search-layout-main">
                    <i class="bi bi-search search-icon" aria-hidden="true"></i>
                    <input
                        :value="searchQuery"
                        type="search"
                        class="search-input"
                        placeholder="Search titles, summaries, publishers, and topics"
                        aria-label="Search IslamHouse library"
                        @focus="openSearchPanel"
                        @blur="handleBlur"
                        @input="$emit('update:searchQuery', $event.target.value)"
                    >
                    <div v-if="showSearchPanel" class="search-panel shadow-sm">
                        <template v-if="searchQuery && suggestions.length">
                            <div class="search-panel-section">
                                <div class="search-panel-label">Suggestions</div>
                                <button
                                    v-for="suggestion in suggestions"
                                    :key="`${suggestion.kind}-${suggestion.label}`"
                                    type="button"
                                    class="search-panel-item"
                                    @mousedown.prevent="$emit('apply-search', suggestion.label)"
                                >
                                    <span class="search-panel-item-main">{{ suggestion.label }}</span>
                                    <span class="search-panel-item-meta">{{ suggestion.meta }}</span>
                                </button>
                            </div>
                        </template>

                        <div v-if="popularSearches.length" class="search-panel-section">
                            <div class="search-panel-label">Popular searches</div>
                            <div class="search-chip-row">
                                <button
                                    v-for="term in popularSearches"
                                    :key="`popular-${term}`"
                                    type="button"
                                    class="search-chip"
                                    @mousedown.prevent="$emit('apply-search', term)"
                                >
                                    {{ term }}
                                </button>
                            </div>
                        </div>

                        <div v-if="trendingTopics.length" class="search-panel-section">
                            <div class="search-panel-label">Trending topics</div>
                            <div class="search-chip-row">
                                <button
                                    v-for="term in trendingTopics"
                                    :key="`trend-${term}`"
                                    type="button"
                                    class="search-chip search-chip--trend"
                                    @mousedown.prevent="$emit('apply-search', term)"
                                >
                                    {{ term }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="search-tools">
                    <div class="filter-control">
                        <span class="filter-icon" aria-hidden="true">
                            <i class="bi bi-grid"></i>
                        </span>
                        <label for="filter-type" class="visually-hidden">Type</label>
                        <select
                            id="filter-type"
                            :value="activeType"
                            class="filter-select"
                            aria-label="Filter by type"
                            @change="$emit('update:activeType', $event.target.value)"
                        >
                            <option v-for="option in typeOptions" :key="option.value" :value="option.value">
                                {{ option.label }}
                            </option>
                        </select>
                    </div>

                    <div class="filter-control">
                        <span class="filter-icon" aria-hidden="true">
                            <i class="bi bi-sort-down"></i>
                        </span>
                        <label for="filter-sort" class="visually-hidden">Sort</label>
                        <select
                            id="filter-sort"
                            :value="sortBy"
                            class="filter-select"
                            aria-label="Sort items"
                            @change="$emit('update:sortBy', $event.target.value)"
                        >
                            <option value="newest">Newest to oldest</option>
                            <option value="oldest">Oldest to newest</option>
                            <option value="title">Title A to Z</option>
                        </select>
                    </div>

                    <div class="density-toggle" role="group" aria-label="Card density">
                        <button
                            type="button"
                            class="density-btn"
                            :class="{ 'is-active': density !== 'compact' }"
                            @click="$emit('update:density', 'comfortable')"
                            aria-label="Comfortable card view"
                        >
                            <i class="bi bi-layout-text-window-reverse" aria-hidden="true"></i>
                        </button>
                        <button
                            type="button"
                            class="density-btn"
                            :class="{ 'is-active': density === 'compact' }"
                            @click="$emit('update:density', 'compact')"
                            aria-label="Compact card view"
                        >
                            <i class="bi bi-grid-3x2-gap" aria-hidden="true"></i>
                        </button>
                    </div>

                    <button
                        v-if="searchQuery"
                        type="button"
                        class="search-clear"
                        @click="$emit('update:searchQuery', '')"
                        aria-label="Clear search"
                    >
                        <i class="bi bi-x-lg" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "LibrarySearchControls",
    props: {
        searchQuery: {
            type: String,
            default: "",
        },
        activeType: {
            type: String,
            default: "all",
        },
        sortBy: {
            type: String,
            default: "newest",
        },
        density: {
            type: String,
            default: "comfortable",
        },
        suggestions: {
            type: Array,
            default() {
                return [];
            },
        },
        popularSearches: {
            type: Array,
            default() {
                return [];
            },
        },
        trendingTopics: {
            type: Array,
            default() {
                return [];
            },
        },
        resultCount: {
            type: Number,
            default: 0,
        },
        typeOptions: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    emits: ["update:searchQuery", "update:activeType", "update:sortBy", "update:density", "apply-search"],
    data() {
        return {
            searchPanelOpen: false,
            blurTimeoutId: null,
        };
    },
    computed: {
        showSearchPanel() {
            return this.searchPanelOpen && (this.suggestions.length || this.popularSearches.length || this.trendingTopics.length);
        },
    },
    methods: {
        openSearchPanel() {
            if (this.blurTimeoutId) {
                clearTimeout(this.blurTimeoutId);
            }
            this.searchPanelOpen = true;
        },
        handleBlur() {
            this.blurTimeoutId = setTimeout(() => {
                this.searchPanelOpen = false;
            }, 120);
        },
    },
    beforeUnmount() {
        if (this.blurTimeoutId) {
            clearTimeout(this.blurTimeoutId);
        }
    },
};
</script>

<style scoped>
.search-shell {
    padding: 0.64rem 0.68rem;
    border: 0;
    border-radius: 18px;
    background: var(--library-surface);
    box-shadow: var(--library-shadow);
}

.search-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.6rem;
    align-items: center;
}

.search-main {
    position: relative;
}

.search-tools {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.22rem;
    border-radius: 16px;
    background: color-mix(in srgb, var(--library-soft) 92%, transparent);
}

.search-panel {
    position: absolute;
    top: calc(100% + 0.55rem);
    left: 0;
    right: 0;
    z-index: 15;
    padding: 0.78rem;
    border-radius: 16px;
    background: var(--library-surface);
    box-shadow: var(--library-shadow);
}

.search-panel-section + .search-panel-section {
    margin-top: 0.8rem;
}

.search-panel-label {
    margin-bottom: 0.45rem;
    color: var(--library-muted);
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.search-panel-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.6rem 0.72rem;
    border: 0;
    border-radius: 14px;
    background: transparent;
    color: var(--library-text);
    text-align: left;
}

.search-panel-item:hover,
.search-panel-item:focus-visible {
    background: var(--library-soft);
}

.search-panel-item-main {
    font-size: 0.9rem;
    font-weight: 600;
}

.search-panel-item-meta {
    color: var(--library-muted);
    font-size: 0.72rem;
    font-weight: 700;
}

.search-chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.42rem;
}

.search-chip {
    display: inline-flex;
    align-items: center;
    min-height: 30px;
    padding: 0 0.72rem;
    border: 0;
    border-radius: 999px;
    background: var(--library-soft);
    color: var(--library-text);
    font-size: 0.77rem;
    font-weight: 700;
}

.search-chip--trend {
    background: color-mix(in srgb, var(--library-accent) 12%, var(--library-soft));
    color: var(--library-accent);
}

.search-icon {
    position: absolute;
    top: 50%;
    left: 0.82rem;
    transform: translateY(-50%);
    color: var(--library-muted);
    font-size: 0.88rem;
}

.search-input,
.filter-select {
    width: 100%;
    border: 0;
    border-radius: 14px;
    background: var(--library-soft);
    color: var(--library-text);
    min-height: 42px;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--library-accent) 6%, transparent);
    transition: box-shadow 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}

.search-input {
    padding: 0.64rem 0.9rem 0.64rem 2.3rem;
    font-size: 0.9rem;
}

.filter-control {
    position: relative;
}

.filter-icon {
    position: absolute;
    top: 50%;
    left: 0.8rem;
    transform: translateY(-50%);
    color: var(--library-accent);
    font-size: 0.82rem;
    pointer-events: none;
}

.filter-select {
    min-width: 162px;
    padding: 0.64rem 0.8rem 0.64rem 2.1rem;
    appearance: none;
    font-size: 0.84rem;
    font-weight: 600;
}

.search-input:focus,
.filter-select:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 191, 166, 0.14);
    transform: translateY(-1px);
}

.search-clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 42px;
    min-height: 42px;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--library-accent) 12%, var(--library-soft));
    color: var(--library-accent);
    box-shadow: var(--library-shadow-soft);
}

.density-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.18rem;
    padding: 0.18rem;
    border-radius: 999px;
    background: transparent;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--library-accent) 8%, transparent);
}

.density-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: var(--library-muted);
    transition: background-color 0.18s ease, color 0.18s ease, transform 0.18s ease;
}

.density-btn:hover,
.density-btn:focus-visible {
    color: var(--library-accent);
    transform: translateY(-1px);
}

.density-btn.is-active {
    background: linear-gradient(135deg, var(--library-accent), var(--library-accent-strong));
    color: #ffffff;
    box-shadow: var(--library-shadow-soft);
}

@media (max-width: 991.98px) {
    .search-layout {
        grid-template-columns: minmax(0, 1fr);
    }

    .search-tools {
        justify-content: space-between;
        flex-wrap: wrap;
    }
}

@media (max-width: 767.98px) {
    .search-layout {
        grid-template-columns: minmax(0, 1fr);
        gap: 0.34rem;
        align-items: stretch;
    }

    .search-tools {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto auto;
        gap: 0.34rem;
        padding: 0;
        background: transparent;
    }

    .search-shell {
        padding: 0.48rem 0.5rem;
        border-radius: 16px;
    }

    .search-input,
    .filter-select,
    .search-clear {
        min-height: 33px;
    }

    .search-input {
        padding: 0.44rem 0.72rem 0.44rem 2rem;
        font-size: 0.82rem;
    }

    .filter-select {
        min-width: 0;
        padding: 0.38rem 0.62rem 0.38rem 2rem;
        font-size: 0.79rem;
        border-radius: 16px;
    }

    .search-clear {
        min-width: 33px;
    }

    .search-icon {
        left: 0.74rem;
        font-size: 0.82rem;
    }

    .search-panel {
        padding: 0.68rem;
        border-radius: 16px;
    }

    .filter-icon {
        left: 0.72rem;
        font-size: 0.75rem;
    }

    .density-toggle {
        justify-content: flex-end;
        padding: 0.16rem;
        background: var(--library-soft);
    }

    .density-btn {
        width: 33px;
        height: 33px;
    }
}
</style>
