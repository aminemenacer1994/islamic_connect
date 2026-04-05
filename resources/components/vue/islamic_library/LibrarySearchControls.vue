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
                        @input="$emit('update:searchQuery', $event.target.value)"
                    >
                </div>

                <button
                    v-if="searchQuery"
                    type="button"
                    class="search-clear"
                    @click="$emit('update:searchQuery', '')"
                    aria-label="Clear search"
                >
                    <i class="bi bi-x-lg" aria-hidden="true"></i>
                    <span>Clear</span>
                </button>

                <div class="filter-control">
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
    emits: ["update:searchQuery", "update:activeType", "update:sortBy"],
};
</script>

<style scoped>
.search-shell {
    padding: 0.65rem 0.72rem;
    border: 0;
    border-radius: 20px;
    background: var(--library-surface);
    box-shadow: var(--library-shadow);
}

.search-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.9fr) auto minmax(172px, 0.68fr) minmax(190px, 0.76fr);
    gap: 0.6rem;
    align-items: center;
}

.search-main {
    position: relative;
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
    border-radius: 16px;
    background: var(--library-soft);
    color: var(--library-text);
    min-height: 42px;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--library-accent) 6%, transparent);
    transition: box-shadow 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}

.search-input {
    padding: 0.68rem 0.92rem 0.68rem 2.38rem;
    font-size: 0.93rem;
}

.filter-select {
    padding: 0.68rem 0.8rem;
    appearance: none;
    font-size: 0.87rem;
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
    gap: 0.35rem;
    min-height: 42px;
    padding: 0 0.78rem;
    border: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--library-accent) 12%, var(--library-soft));
    color: var(--library-accent);
    font-size: 0.7rem;
    font-weight: 700;
    box-shadow: var(--library-shadow-soft);
}

@media (max-width: 991.98px) {
    .search-layout {
        grid-template-columns: minmax(0, 1.3fr) auto minmax(148px, 0.75fr) minmax(168px, 0.82fr);
        gap: 0.5rem;
    }
}

@media (max-width: 767.98px) {
    .search-layout {
        grid-template-columns: minmax(0, 1fr) 68px;
        gap: 0.34rem;
        align-items: stretch;
    }

    .search-layout-main,
    .filter-control {
        grid-column: 1 / -1;
    }

    .search-shell {
        padding: 0.5rem 0.52rem;
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
        padding: 0.38rem 0.62rem;
        font-size: 0.79rem;
        border-radius: 16px;
    }

    .search-clear {
        min-width: 68px;
        padding: 0 0.5rem;
        font-size: 0.66rem;
    }

    .search-icon {
        left: 0.74rem;
        font-size: 0.82rem;
    }
}
</style>
