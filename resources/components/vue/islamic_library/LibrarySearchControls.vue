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
                        placeholder="Search titles and summaries"
                        aria-label="Search IslamHouse library"
                        @input="$emit('update:searchQuery', $event.target.value)"
                    >
                </div>

                <button
                    v-if="searchQuery"
                    type="button"
                    class="search-clear"
                    @click="$emit('update:searchQuery', '')"
                >
                    Clear
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
    padding: 1.1rem;
    border: 0;
    border-radius: 20px;
    background: var(--library-surface);
    box-shadow: var(--library-shadow);
}

.search-row {
    display: flex;
    gap: 0.8rem;
    align-items: center;
    margin-bottom: 0.85rem;
}

.search-main {
    position: relative;
    flex: 1 1 auto;
}

.search-icon {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    color: var(--library-muted);
}

.search-input,
.filter-select {
    width: 100%;
    border: 0;
    border-radius: 20px;
    background: var(--library-soft);
    color: var(--library-text);
    min-height: 46px;
    box-shadow: inset 0 0 0 1px transparent;
    transition: box-shadow 0.2s ease, background-color 0.2s ease;
}

.search-input {
    padding: 0.8rem 1rem 0.8rem 2.8rem;
}

.filter-select {
    padding: 0.7rem 0.95rem;
    appearance: none;
}

.search-input:focus,
.filter-select:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.16);
}

.search-clear {
    min-height: 46px;
    padding: 0 1rem;
    border: 0;
    border-radius: 20px;
    background: var(--library-soft);
    color: var(--library-text);
    box-shadow: var(--library-shadow-soft);
}

.filter-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.8rem;
}

.filter-label {
    display: block;
    margin-bottom: 0.38rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--library-muted);
}

@media (max-width: 991.98px) {
    .filter-row {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 767.98px) {
    .search-row {
        flex-direction: column;
        align-items: stretch;
    }
}
</style>
