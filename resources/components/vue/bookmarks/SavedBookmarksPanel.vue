<template>
    <section
        class="saved-bookmarks-panel"
        :class="{ 'is-dark': darkTheme }"
        role="region"
        aria-labelledby="savedBookmarksPanelTitle">
        <div class="saved-bookmarks-panel-head">
            <div class="saved-bookmarks-panel-heading">
                <span class="saved-bookmarks-panel-kicker">Bookmarks</span>
                <h3 id="savedBookmarksPanelTitle" class="saved-bookmarks-panel-title mb-1">
                    Saved ayahs
                </h3>
                <p class="saved-bookmarks-panel-subtitle mb-0">
                    {{ summaryText }}
                </p>
            </div>
            <button
                type="button"
                class="btn saved-bookmarks-close-btn"
                aria-label="Close saved bookmarks panel"
                @click="$emit('close')">
                <i class="bi bi-x-lg" aria-hidden="true"></i>
            </button>
        </div>

        <div
            v-if="folders.length"
            class="saved-bookmarks-collections"
            role="group"
            aria-label="Bookmark collections">
            <button
                type="button"
                class="btn saved-bookmarks-collection-pill"
                :class="{ 'is-active': isAllActive }"
                @click="$emit('select-folder', 'all')">
                All
            </button>
            <button
                v-for="folder in folders"
                :key="`bookmark-folder-${folder.id}`"
                type="button"
                class="btn saved-bookmarks-collection-pill"
                :class="{ 'is-active': String(activeFolderId) === String(folder.id) }"
                :title="folder.name"
                @click="$emit('select-folder', folder.id)">
                <span class="saved-bookmarks-collection-pill-title">{{ folder.name }}</span>
                <span class="saved-bookmarks-collection-pill-count">{{ folder.ayah_count || 0 }}</span>
            </button>
            <button
                type="button"
                class="btn saved-bookmarks-collection-pill saved-bookmarks-collection-manage"
                :class="{ 'is-active': manageOpen }"
                @click="manageOpen = !manageOpen">
                Manage
            </button>
        </div>

        <div v-if="manageOpen" class="saved-bookmarks-manage">
            <div class="saved-bookmarks-manage-head">
                <strong>Collections</strong>
                <span class="saved-bookmarks-manage-hint">Create, rename, or delete collections.</span>
            </div>

            <form class="saved-bookmarks-manage-create" @submit.prevent="onCreateFolder">
                <input
                    v-model.trim="newFolderName"
                    type="text"
                    class="form-control saved-bookmarks-manage-input"
                    placeholder="New collection name"
                    :disabled="busy"
                    aria-label="New collection name" />
                <button
                    type="submit"
                    class="btn btn-sm btn-outline-secondary saved-bookmarks-manage-btn"
                    :disabled="busy || !newFolderName">
                    Create
                </button>
            </form>

            <div v-if="folders.length" class="saved-bookmarks-manage-list" role="list">
                <div
                    v-for="folder in folders"
                    :key="`manage-folder-${folder.id}`"
                    class="saved-bookmarks-manage-row"
                    role="listitem">
                    <div class="saved-bookmarks-manage-row-main">
                        <template v-if="editingFolderId === folder.id">
                            <input
                                v-model.trim="editingFolderName"
                                type="text"
                                class="form-control saved-bookmarks-manage-input"
                                :disabled="busy"
                                :aria-label="`Rename ${folder.name}`" />
                        </template>
                        <template v-else>
                            <span class="saved-bookmarks-manage-name">{{ folder.name }}</span>
                            <span class="saved-bookmarks-manage-count text-muted">{{ folder.ayah_count || 0 }}</span>
                        </template>
                    </div>
                    <div class="saved-bookmarks-manage-row-actions">
                        <button
                            v-if="editingFolderId !== folder.id"
                            type="button"
                            class="btn btn-sm btn-outline-secondary saved-bookmarks-manage-btn"
                            :disabled="busy"
                            @click="beginEdit(folder)">
                            Rename
                        </button>
                        <button
                            v-else
                            type="button"
                            class="btn btn-sm btn-outline-secondary saved-bookmarks-manage-btn"
                            :disabled="busy || !editingFolderName"
                            @click="confirmEdit(folder)">
                            Save
                        </button>
                        <button
                            v-if="editingFolderId === folder.id"
                            type="button"
                            class="btn btn-sm btn-outline-secondary saved-bookmarks-manage-btn"
                            :disabled="busy"
                            @click="cancelEdit">
                            Cancel
                        </button>
                        <button
                            type="button"
                            class="btn btn-sm btn-danger saved-bookmarks-manage-btn"
                            :disabled="busy"
                            @click="onDeleteFolder(folder)">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="deleteConfirm && deleteConfirm.visible"
            class="alert alert-warning saved-bookmarks-confirm-alert"
            role="alert">
            <div class="saved-bookmarks-confirm-copy">
                <strong>Confirm delete</strong>
                <span>{{ deleteConfirm.message }}</span>
            </div>
            <div class="saved-bookmarks-confirm-actions">
                <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                    :disabled="deleteBusy"
                    @click="$emit('cancel-delete')">
                    Cancel
                </button>
                <button
                    type="button"
                    class="btn btn-sm btn-danger"
                    :disabled="deleteBusy"
                    @click="$emit('confirm-delete')">
                    {{ deleteBusy ? "Deleting..." : "Delete" }}
                </button>
            </div>
        </div>

        <div v-if="bookmarks.length" class="saved-bookmarks-toolbar">
            <div class="saved-bookmarks-toolbar-copy">
                <strong>{{ selectedCount }} selected</strong>
                <span>Select several bookmarks, then remove them together.</span>
            </div>
            <div class="saved-bookmarks-toolbar-actions">
                <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                    :disabled="deleteBusy"
                    @click="$emit('toggle-select-all')">
                    {{ allSelected ? "Unselect all" : "Select all" }}
                </button>
                <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                    :disabled="!selectedCount || deleteBusy"
                    @click="$emit('clear-selection')">
                    Clear selection
                </button>
                <button
                    type="button"
                    class="btn btn-sm btn-danger"
                    :disabled="!selectedCount || deleteBusy"
                    @click="$emit('request-bulk-delete')">
                    Delete selected
                </button>
            </div>
        </div>

        <div v-if="bookmarks.length" class="saved-bookmarks-body">
            <div class="saved-bookmarks-grid">
                <article
                    v-for="bookmark in bookmarks"
                    :key="bookmark.key"
                    class="saved-bookmarks-card"
                    :class="{ 'is-selected': selectedKeySet.has(bookmark.key) }">
                    <div class="saved-bookmarks-card-top">
                        <label class="saved-bookmarks-select">
                            <input
                                type="checkbox"
                                :checked="selectedKeySet.has(bookmark.key)"
                                :disabled="deleteBusy"
                                @change="$emit('toggle-selection', bookmark.key)" />
                            <span>Select</span>
                        </label>
                        <div class="saved-bookmarks-card-top-actions">
                            <select
                                v-if="folders.length"
                                class="form-select form-select-sm saved-bookmarks-move-select"
                                :disabled="deleteBusy || busy"
                                :aria-label="`Move ${bookmark.surahName} ayah ${bookmark.ayahNumber} to collection`"
                                @change="onMoveBookmark(bookmark.key, $event)">
                                <option value="" selected disabled>Move to…</option>
                                <option
                                    v-for="folder in folders"
                                    :key="`move-${bookmark.key}-${folder.id}`"
                                    :value="folder.id">
                                    {{ folder.name }}
                                </option>
                            </select>
                        <button
                            type="button"
                            class="btn saved-bookmarks-delete-btn"
                            :disabled="deleteBusy"
                            :aria-label="`Delete ${bookmark.surahName} ayah ${bookmark.ayahNumber}`"
                            @click="$emit('request-delete', bookmark.key)">
                            <i class="bi bi-trash3" aria-hidden="true"></i>
                        </button>
                        </div>
                    </div>

                    <button
                        type="button"
                        class="saved-bookmarks-card-link"
                        :disabled="deleteBusy"
                        :aria-label="`Open ${bookmark.surahName} ayah ${bookmark.ayahNumber}`"
                        @click="$emit('open-bookmark', bookmark.key)">
                        <span class="saved-bookmarks-card-icon" aria-hidden="true">
                            <i class="bi bi-bookmark-heart-fill"></i>
                        </span>
                        <span class="saved-bookmarks-card-copy">
                            <span class="saved-bookmarks-card-title">{{ bookmark.surahName }}</span>
                            <span class="saved-bookmarks-card-meta">Ayah {{ bookmark.ayahNumber }}</span>
                            <span class="saved-bookmarks-card-date text-muted">{{ bookmark.savedAtLabel }}</span>
                        </span>
                        <span class="saved-bookmarks-card-arrow" aria-hidden="true">
                            <i class="bi bi-arrow-up-right"></i>
                        </span>
                    </button>
                </article>
            </div>
        </div>

        <div v-else class="saved-bookmarks-empty">
            <span class="saved-bookmarks-empty-icon" aria-hidden="true">
                <i class="bi bi-bookmark-heart"></i>
            </span>
            <h4 class="saved-bookmarks-empty-title mb-2">No saved bookmarks yet</h4>
            <p class="saved-bookmarks-empty-copy mb-0">
                Save any ayah with the bookmark button and it will appear here.
            </p>
        </div>
    </section>
</template>

<script>
export default {
    name: "SavedBookmarksPanel",
    props: {
        folders: {
            type: Array,
            default: () => [],
        },
        activeFolderId: {
            type: [String, Number],
            default: "all",
        },
        bookmarks: {
            type: Array,
            default: () => [],
        },
        darkTheme: {
            type: Boolean,
            default: false,
        },
        selectedKeys: {
            type: Array,
            default: () => [],
        },
        selectedCount: {
            type: Number,
            default: 0,
        },
        allSelected: {
            type: Boolean,
            default: false,
        },
        deleteConfirm: {
            type: Object,
            default: () => ({
                visible: false,
                message: "",
            }),
        },
        deleteBusy: {
            type: Boolean,
            default: false,
        },
        busy: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            manageOpen: false,
            newFolderName: "",
            editingFolderId: null,
            editingFolderName: "",
        };
    },
    computed: {
        isAllActive() {
            return String(this.activeFolderId || "all") === "all";
        },
        selectedKeySet() {
            return new Set(
                Array.isArray(this.selectedKeys) ? this.selectedKeys : []
            );
        },
        summaryText() {
            const count = Array.isArray(this.bookmarks) ? this.bookmarks.length : 0;
            if (!count) {
                return "Keep quick access to the ayahs you want to revisit.";
            }
            return `${count} saved bookmark${count === 1 ? "" : "s"} ready to reopen.`;
        },
    },
    emits: [
        "close",
        "open-bookmark",
        "select-folder",
        "create-folder",
        "update-folder",
        "delete-folder",
        "move-bookmark",
        "toggle-selection",
        "toggle-select-all",
        "clear-selection",
        "request-delete",
        "request-bulk-delete",
        "confirm-delete",
        "cancel-delete",
    ],
    methods: {
        onCreateFolder() {
            const name = (this.newFolderName || "").trim();
            if (!name) return;
            this.$emit("create-folder", { name });
            this.newFolderName = "";
        },
        beginEdit(folder) {
            this.editingFolderId = folder?.id ?? null;
            this.editingFolderName = String(folder?.name || "").trim();
        },
        cancelEdit() {
            this.editingFolderId = null;
            this.editingFolderName = "";
        },
        confirmEdit(folder) {
            const id = folder?.id;
            const name = (this.editingFolderName || "").trim();
            if (!id || !name) return;
            this.$emit("update-folder", { id, name });
            this.cancelEdit();
        },
        onDeleteFolder(folder) {
            const id = folder?.id;
            if (!id) return;
            const name = String(folder?.name || "this collection").trim();
            if (
                !confirm(
                    `Delete "${name}"? Bookmarks inside will remain saved (still visible in All).`
                )
            ) {
                return;
            }
            this.$emit("delete-folder", { id });
            if (String(this.activeFolderId) === String(id)) {
                this.$emit("select-folder", "all");
            }
        },
        onMoveBookmark(key, event) {
            const targetId = Number(event?.target?.value);
            if (!targetId) return;
            this.$emit("move-bookmark", { key, targetFolderId: targetId });
            if (event?.target) {
                event.target.value = "";
            }
        },
    },
};
</script>

<style scoped>
.saved-bookmarks-panel {
    --saved-bookmarks-accent: #0f766e;
    --saved-bookmarks-accent-soft: rgba(15, 118, 110, 0.1);
    --saved-bookmarks-border: rgba(15, 23, 42, 0.1);
    --saved-bookmarks-surface: rgba(255, 255, 255, 0.97);
    --saved-bookmarks-surface-alt: rgba(248, 250, 252, 0.94);
    --saved-bookmarks-card-bg: rgba(255, 255, 255, 0.82);
    --saved-bookmarks-toolbar-bg: rgba(255, 255, 255, 0.68);
    --saved-bookmarks-control-bg: rgba(255, 255, 255, 0.92);
    --saved-bookmarks-warning-bg: #fff6db;
    --saved-bookmarks-warning-border: rgba(217, 119, 6, 0.2);
    --saved-bookmarks-text: #0f172a;
    --saved-bookmarks-muted: #64748b;
    margin-top: 0.72rem;
    border: 1px solid var(--saved-bookmarks-border);
    border-radius: 20px;
    background:
        radial-gradient(circle at top right, rgba(20, 184, 166, 0.12), transparent 32%),
        linear-gradient(180deg, var(--saved-bookmarks-surface), var(--saved-bookmarks-surface-alt));
    box-shadow: 0 18px 36px rgba(15, 23, 42, 0.1);
    color: var(--saved-bookmarks-text);
    padding: 0.95rem 0.95rem 0.88rem;
}

.saved-bookmarks-collections {
    display: flex;
    gap: 0.45rem;
    overflow-x: auto;
    padding: 0.15rem 0.1rem 0.65rem;
    margin-bottom: 0.65rem;
    border-bottom: 1px solid var(--saved-bookmarks-border);
    scrollbar-width: thin;
    scrollbar-color: rgba(100, 116, 139, 0.35) transparent;
}

.saved-bookmarks-collections::-webkit-scrollbar {
    height: 8px;
}

.saved-bookmarks-collections::-webkit-scrollbar-track {
    background: transparent;
}

.saved-bookmarks-collections::-webkit-scrollbar-thumb {
    background: rgba(100, 116, 139, 0.35);
    border-radius: 999px;
}

.saved-bookmarks-collection-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    flex-shrink: 0;
    padding: 0.38rem 0.7rem;
    border-radius: 999px;
    border: 1px solid var(--saved-bookmarks-border);
    background: var(--saved-bookmarks-control-bg);
    color: var(--saved-bookmarks-text);
    font-size: 0.78rem;
    font-weight: 700;
    line-height: 1.1;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.saved-bookmarks-collection-pill:hover,
.saved-bookmarks-collection-pill:focus-visible {
    border-color: rgba(15, 118, 110, 0.32);
    box-shadow: 0 0 0 0.18rem rgba(15, 118, 110, 0.12);
}

.saved-bookmarks-collection-pill.is-active {
    border-color: rgba(15, 118, 110, 0.55);
    background: var(--saved-bookmarks-accent-soft);
    color: var(--saved-bookmarks-accent);
}

.saved-bookmarks-collection-pill-title {
    max-width: 10.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.saved-bookmarks-collection-pill-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.4rem;
    height: 1.4rem;
    padding: 0 0.35rem;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.08);
    color: var(--saved-bookmarks-muted);
    font-size: 0.72rem;
    font-weight: 800;
}

.saved-bookmarks-panel.is-dark .saved-bookmarks-collection-pill-count {
    background: rgba(248, 250, 252, 0.08);
    color: var(--saved-bookmarks-muted);
}

.saved-bookmarks-panel.is-dark {
    --saved-bookmarks-accent: #7dd3fc;
    --saved-bookmarks-accent-soft: rgba(125, 211, 252, 0.14);
    --saved-bookmarks-border: rgba(148, 163, 184, 0.28);
    --saved-bookmarks-surface: rgba(2, 6, 23, 0.96);
    --saved-bookmarks-surface-alt: rgba(15, 23, 42, 0.98);
    --saved-bookmarks-card-bg: rgba(30, 41, 59, 0.9);
    --saved-bookmarks-toolbar-bg: rgba(30, 41, 59, 0.72);
    --saved-bookmarks-control-bg: rgba(30, 41, 59, 0.96);
    --saved-bookmarks-warning-bg: rgba(120, 53, 15, 0.34);
    --saved-bookmarks-warning-border: rgba(251, 191, 36, 0.28);
    --saved-bookmarks-text: #f8fafc;
    --saved-bookmarks-muted: #cbd5e1;
    box-shadow: 0 22px 46px rgba(2, 6, 23, 0.58);
}

.saved-bookmarks-panel-head,
.saved-bookmarks-toolbar,
.saved-bookmarks-card-top,
.saved-bookmarks-card-link,
.saved-bookmarks-confirm-alert,
.saved-bookmarks-confirm-actions {
    display: flex;
    align-items: center;
}

.saved-bookmarks-panel-head,
.saved-bookmarks-toolbar,
.saved-bookmarks-card-top,
.saved-bookmarks-confirm-alert {
    justify-content: space-between;
}

.saved-bookmarks-card-top-actions {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.saved-bookmarks-move-select {
    min-width: 9.5rem;
    border-radius: 999px;
    border: 1px solid var(--saved-bookmarks-border);
    background: var(--saved-bookmarks-control-bg);
    color: var(--saved-bookmarks-text);
    font-size: 0.78rem;
    padding: 0.28rem 0.6rem;
}

.saved-bookmarks-panel.is-dark .saved-bookmarks-move-select {
    background: var(--saved-bookmarks-control-bg);
    color: var(--saved-bookmarks-text);
}

.saved-bookmarks-collection-manage {
    margin-left: auto;
}

.saved-bookmarks-manage {
    border: 1px solid var(--saved-bookmarks-border);
    background: var(--saved-bookmarks-toolbar-bg);
    border-radius: 16px;
    padding: 0.75rem 0.8rem;
    margin-bottom: 0.8rem;
}

.saved-bookmarks-manage-head {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    margin-bottom: 0.65rem;
    font-size: 0.85rem;
}

.saved-bookmarks-manage-hint {
    color: var(--saved-bookmarks-muted);
    font-size: 0.78rem;
}

.saved-bookmarks-manage-create {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    margin-bottom: 0.6rem;
}

.saved-bookmarks-manage-input {
    border-radius: 999px;
    border: 1px solid var(--saved-bookmarks-border);
    background: var(--saved-bookmarks-control-bg);
    color: var(--saved-bookmarks-text);
    font-size: 0.82rem;
    padding: 0.4rem 0.7rem;
}

.saved-bookmarks-manage-btn {
    border-radius: 999px;
    font-size: 0.78rem;
    padding: 0.34rem 0.65rem;
    white-space: nowrap;
}

.saved-bookmarks-manage-list {
    display: grid;
    gap: 0.45rem;
}

.saved-bookmarks-manage-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    padding: 0.45rem 0.5rem;
    border-radius: 14px;
    border: 1px solid var(--saved-bookmarks-border);
    background: var(--saved-bookmarks-card-bg);
}

.saved-bookmarks-manage-row-main {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
    flex: 1 1 auto;
}

.saved-bookmarks-manage-name {
    font-weight: 700;
    font-size: 0.84rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.saved-bookmarks-manage-count {
    font-size: 0.78rem;
}

.saved-bookmarks-manage-row-actions {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: flex-end;
}

.saved-bookmarks-panel-head {
    gap: 0.85rem;
    margin-bottom: 0.8rem;
}

.saved-bookmarks-panel-heading {
    min-width: 0;
}

.saved-bookmarks-panel-kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    margin-bottom: 0.28rem;
    padding: 0.16rem 0.48rem;
    border-radius: 999px;
    background: var(--saved-bookmarks-accent-soft);
    color: var(--saved-bookmarks-accent);
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.saved-bookmarks-panel-title {
    font-size: 0.98rem;
    font-weight: 700;
}

.saved-bookmarks-panel-subtitle,
.saved-bookmarks-toolbar-copy span,
.saved-bookmarks-card-meta,
.saved-bookmarks-empty-copy {
    color: var(--saved-bookmarks-muted);
    font-size: 0.82rem;
}

.saved-bookmarks-close-btn,
.saved-bookmarks-delete-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.05rem;
    height: 2.05rem;
    border-radius: 999px;
    border: 1px solid var(--saved-bookmarks-border);
    background: var(--saved-bookmarks-control-bg);
    color: var(--saved-bookmarks-text);
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.saved-bookmarks-panel.is-dark .saved-bookmarks-close-btn,
.saved-bookmarks-panel.is-dark .saved-bookmarks-delete-btn {
    background: var(--saved-bookmarks-control-bg);
    color: var(--saved-bookmarks-text);
}

.saved-bookmarks-close-btn:hover,
.saved-bookmarks-close-btn:focus-visible,
.saved-bookmarks-delete-btn:hover,
.saved-bookmarks-delete-btn:focus-visible,
.saved-bookmarks-card-link:hover,
.saved-bookmarks-card-link:focus-visible {
    border-color: rgba(15, 118, 110, 0.32);
    box-shadow: 0 0 0 0.18rem rgba(15, 118, 110, 0.12);
}

.saved-bookmarks-confirm-alert {
    gap: 0.72rem;
    flex-wrap: wrap;
    margin-bottom: 0.8rem;
    padding: 0.65rem 0.8rem;
    border-radius: 14px;
    border-color: var(--saved-bookmarks-warning-border);
    background: var(--saved-bookmarks-warning-bg);
    color: var(--saved-bookmarks-text);
}

.saved-bookmarks-confirm-copy {
    display: flex;
    flex-direction: column;
    gap: 0.12rem;
    font-size: 0.82rem;
}

.saved-bookmarks-confirm-actions {
    gap: 0.45rem;
    margin-left: auto;
}

.saved-bookmarks-toolbar {
    gap: 0.72rem;
    flex-wrap: wrap;
    margin-bottom: 0.8rem;
    padding: 0.68rem 0.8rem;
    border-radius: 14px;
    background: var(--saved-bookmarks-toolbar-bg);
    border: 1px solid var(--saved-bookmarks-border);
}

.saved-bookmarks-panel.is-dark .saved-bookmarks-toolbar {
    background: var(--saved-bookmarks-toolbar-bg);
}

.saved-bookmarks-toolbar-copy {
    display: flex;
    flex-direction: column;
    gap: 0.08rem;
    font-size: 0.82rem;
}

.saved-bookmarks-toolbar-actions {
    display: flex;
    align-items: center;
    gap: 0.42rem;
    flex-wrap: wrap;
    margin-left: auto;
}

.saved-bookmarks-toolbar-actions .btn,
.saved-bookmarks-confirm-actions .btn {
    padding: 0.34rem 0.62rem;
    border-radius: 999px;
    font-size: 0.76rem;
    line-height: 1.1;
}

.saved-bookmarks-body {
    max-height: min(52vh, 28rem);
    overflow: hidden;
}

.saved-bookmarks-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.68rem;
    max-height: inherit;
    overflow-y: auto;
    padding-right: 0.1rem;
}

.saved-bookmarks-card {
    display: flex;
    flex-direction: column;
    gap: 0.62rem;
    min-width: 0;
    padding: 0.75rem;
    border-radius: 16px;
    border: 1px solid var(--saved-bookmarks-border);
    background: var(--saved-bookmarks-card-bg);
    transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.saved-bookmarks-panel.is-dark .saved-bookmarks-card {
    background: var(--saved-bookmarks-card-bg);
}

.saved-bookmarks-card.is-selected {
    border-color: rgba(14, 165, 233, 0.5);
    box-shadow: 0 12px 24px rgba(14, 165, 233, 0.12);
}

.saved-bookmarks-card-link {
    gap: 0.72rem;
    width: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    text-align: left;
}

.saved-bookmarks-card-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.3rem;
    height: 2.3rem;
    flex-shrink: 0;
    border-radius: 13px;
    background: var(--saved-bookmarks-accent-soft);
    color: var(--saved-bookmarks-accent);
    font-size: 0.96rem;
}

.saved-bookmarks-card-copy {
    display: flex;
    flex-direction: column;
    gap: 0.14rem;
    min-width: 0;
    flex: 1 1 auto;
}

.saved-bookmarks-card-title {
    font-weight: 700;
    font-size: 0.9rem;
    line-height: 1.3;
}

.saved-bookmarks-card-meta,
.saved-bookmarks-card-date {
    font-size: 0.79rem;
}

.saved-bookmarks-card-date {
    color: var(--saved-bookmarks-muted) !important;
}

.saved-bookmarks-card-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.65rem;
    height: 1.65rem;
    color: var(--saved-bookmarks-muted);
    font-size: 0.85rem;
}

.saved-bookmarks-select {
    display: inline-flex;
    align-items: center;
    gap: 0.38rem;
    font-size: 0.76rem;
    font-weight: 600;
    color: var(--saved-bookmarks-muted);
}

.saved-bookmarks-select input {
    width: 0.92rem;
    height: 0.92rem;
    accent-color: var(--saved-bookmarks-accent);
}

.saved-bookmarks-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 1.9rem 0.9rem;
    text-align: center;
    border: 1px dashed var(--saved-bookmarks-border);
    border-radius: 16px;
}

.saved-bookmarks-empty-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.7rem;
    height: 2.7rem;
    border-radius: 50%;
    background: var(--saved-bookmarks-accent-soft);
    color: var(--saved-bookmarks-accent);
    font-size: 1.05rem;
}

.saved-bookmarks-empty-title {
    font-size: 0.92rem;
    font-weight: 700;
}

@media (max-width: 991.98px) {
    .saved-bookmarks-panel {
        margin-top: 1rem;
        border-radius: 18px;
        padding: 1.18rem 0.92rem 0.88rem;
    }

    .saved-bookmarks-body {
        max-height: none;
    }
}

@media (max-width: 767.98px) {
    .saved-bookmarks-panel-head,
    .saved-bookmarks-toolbar,
    .saved-bookmarks-confirm-alert {
        align-items: flex-start;
    }

    .saved-bookmarks-panel {
        margin-top: 1.08rem;
        padding-top: 1.22rem;
    }

    .saved-bookmarks-grid {
        grid-template-columns: minmax(0, 1fr);
        max-height: none;
        overflow: visible;
    }

    .saved-bookmarks-card {
        padding: 0.72rem;
    }

    .saved-bookmarks-card-top-actions {
        width: 100%;
        justify-content: flex-end;
    }

    .saved-bookmarks-move-select {
        min-width: 0;
        flex: 1 1 auto;
    }

    .saved-bookmarks-toolbar-actions,
    .saved-bookmarks-confirm-actions {
        width: 100%;
        margin-left: 0;
    }

    .saved-bookmarks-toolbar-actions .btn,
    .saved-bookmarks-confirm-actions .btn {
        flex: 1 1 auto;
    }
}
</style>
