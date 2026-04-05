<template>
    <section class="library-search-section">
        <div class="search-shell shadow-sm">
            <div class="search-row">
                <div class="search-main">
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
            </div>

            <div class="filter-row">
                <div class="filter-control">
                    <label for="filter-type" class="filter-label">Type</label>
                    <select
                        id="filter-type"
                        :value="activeType"
                        class="filter-select"
                        @change="$emit('update:activeType', $event.target.value)"
                    >
                        <option v-for="option in typeOptions" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </option>
                    </select>
                </div>
                <div class="filter-control">
                    <label for="filter-sort" class="filter-label">Sort</label>
                    <select
                        id="filter-sort"
                        :value="sortBy"
                        class="filter-select"
                        @change="$emit('update:sortBy', $event.target.value)"
                    >
                        <option value="newest">Newest to oldest</option>
                        <option value="oldest">Oldest to newest</option>
                        <option value="title">Title A to Z</option>
                    </select>
                </div>
                <div class="filter-control">
                    <label for="filter-reader" class="filter-label">Reading Mode</label>
                    <select
                        id="filter-reader"
                        :value="readerFilter"
                        class="filter-select"
                        @change="$emit('update:readerFilter', $event.target.value)"
                    >
                        <option value="all">All items</option>
                        <option value="reader">Reader ready</option>
                        <option value="detail">Detail page only</option>
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
        readerFilter: {
            type: String,
            default: "all",
        },
        typeOptions: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    emits: ["update:searchQuery", "update:activeType", "update:sortBy", "update:readerFilter"],
};
</script>

<style scoped>
.search-shell {
    padding: 0.58rem 0.66rem;
    border: 0;
    border-radius: 20px;
    background: var(--library-surface);
    box-shadow: var(--library-shadow);
}

.search-row {
    display: flex;
    gap: 0.45rem;
    align-items: center;
    margin-bottom: 0.46rem;
}

.search-main {
    position: relative;
    flex: 1 1 auto;
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
    border-radius: 20px;
    background: var(--library-soft);
    color: var(--library-text);
    min-height: 35px;
    box-shadow: inset 0 0 0 1px transparent;
    transition: box-shadow 0.2s ease, background-color 0.2s ease;
}

.search-input {
    padding: 0.48rem 0.8rem 0.48rem 2.15rem;
    font-size: 0.86rem;
}

.filter-select {
    padding: 0.42rem 0.68rem;
    appearance: none;
    font-size: 0.84rem;
}

.search-input:focus,
.filter-select:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 191, 166, 0.14);
}

.search-clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    min-height: 35px;
    padding: 0 0.66rem;
    border: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--library-accent) 12%, var(--library-soft));
    color: var(--library-accent);
    font-size: 0.7rem;
    font-weight: 700;
    box-shadow: var(--library-shadow-soft);
}

.filter-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.45rem;
}

.filter-label {
    display: block;
    margin-bottom: 0.18rem;
    font-size: 0.64rem;
    font-weight: 600;
    color: var(--library-muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

@media (max-width: 991.98px) {
    .filter-row {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .search-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
    }
}

@media (max-width: 767.98px) {
    .search-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 68px;
    }

    .filter-row {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .filter-control:last-child {
        grid-column: 1 / -1;
    }

    .search-clear {
        min-width: 80px;
    }

    .search-shell {
        padding: 0.5rem 0.52rem;
        border-radius: 16px;
    }

    .search-row {
        gap: 0.34rem;
        margin-bottom: 0.36rem;
    }

    .filter-row {
        gap: 0.34rem;
    }

    .filter-label {
        margin-bottom: 0.12rem;
        font-size: 0.57rem;
        letter-spacing: 0.07em;
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
