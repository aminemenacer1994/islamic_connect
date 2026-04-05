<template>
    <section
        class="saved-bookmarks-panel"
        :class="{ 'is-dark': darkTheme }"
        role="region"
        aria-labelledby="savedBookmarksPanelTitle">
        <div class="saved-bookmarks-panel-head">
            <div class="saved-bookmarks-panel-heading">
                <span class="saved-bookmarks-panel-kicker">
                    <i class="bi bi-bookmarks-fill" aria-hidden="true"></i>
                    Bookmarks
                </span>
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

        <div class="saved-bookmarks-flow" aria-label="Saved bookmark steps">
            <div class="saved-bookmarks-flow-step">
                <span class="saved-bookmarks-flow-icon">
                    <i class="bi bi-funnel-fill" aria-hidden="true"></i>
                </span>
                <div>
                    <strong>1. Filter</strong>
                    <span>Choose All or one collection.</span>
                </div>
            </div>
            <div class="saved-bookmarks-flow-step">
                <span class="saved-bookmarks-flow-icon">
                    <i class="bi bi-sliders2" aria-hidden="true"></i>
                </span>
                <div>
                    <strong>2. Manage</strong>
                    <span>Create, rename, or remove collections.</span>
                </div>
            </div>
            <div class="saved-bookmarks-flow-step">
                <span class="saved-bookmarks-flow-icon">
                    <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                </span>
                <div>
                    <strong>3. Reopen</strong>
                    <span>Open an ayah or batch-manage saved items.</span>
                </div>
            </div>
        </div>

        <div class="saved-bookmarks-tabs" aria-label="Bookmark collections">
            <div
                class="saved-bookmarks-primary-pills"
                role="group"
                aria-label="Primary bookmark tabs">
                <button
                    type="button"
                    class="btn saved-bookmarks-collection-pill saved-bookmarks-collection-pill-primary"
                    :class="{ 'is-active': isAllActive && !manageOpen }"
                    @click="handleAllClick">
                    <i class="bi bi-grid-1x2-fill" aria-hidden="true"></i>
                    <span>All</span>
                </button>
                <button
                    type="button"
                    class="btn saved-bookmarks-collection-pill saved-bookmarks-collection-pill-primary saved-bookmarks-collection-manage"
                    :class="{ 'is-active': manageOpen }"
                    @click="openManage">
                    <i class="bi bi-sliders2" aria-hidden="true"></i>
                    <span>Manage</span>
                </button>
            </div>

            <div
                v-if="folders.length"
                class="saved-bookmarks-secondary-pills"
                role="group"
                aria-label="Bookmark collections list">
                <button
                    v-for="folder in folders"
                    :key="`bookmark-folder-${folder.id}`"
                    type="button"
                    class="btn saved-bookmarks-collection-pill"
                    :class="{ 'is-active': !manageOpen && String(activeFolderId) === String(folder.id) }"
                    :title="folder.name"
                    @click="handleFolderClick(folder.id)">
                    <i :class="folder.icon || 'bi bi-folder2-open'" aria-hidden="true"></i>
                    <span class="saved-bookmarks-collection-pill-title">{{ folder.name }}</span>
                    <span class="saved-bookmarks-collection-pill-count">{{ folder.ayah_count || 0 }}</span>
                </button>
            </div>
        </div>

        <div v-if="manageOpen" class="saved-bookmarks-manage">
            <div class="saved-bookmarks-manage-head">
                <div>
                    <strong>Manage collections</strong>
                    <span class="saved-bookmarks-manage-hint">
                        Deleting a collection removes the grouping only. Saved ayahs stay available in All.
                    </span>
                </div>
                <span class="saved-bookmarks-manage-count-pill">
                    {{ folders.length }} collection{{ folders.length === 1 ? "" : "s" }}
                </span>
            </div>

            <form class="saved-bookmarks-manage-create" @submit.prevent="onCreateFolder">
                <label class="visually-hidden" for="savedBookmarksNewCollection">
                    New collection name
                </label>
                <input
                    id="savedBookmarksNewCollection"
                    v-model.trim="newFolderName"
                    type="text"
                    class="form-control saved-bookmarks-manage-input"
                    placeholder="Create a new collection"
                    :disabled="busy"
                    aria-label="New collection name" />
                <button
                    type="submit"
                    class="btn saved-bookmarks-icon-btn saved-bookmarks-icon-btn-primary"
                    :disabled="busy || !newFolderName"
                    aria-label="Create collection">
                    <i class="bi bi-plus-lg" aria-hidden="true"></i>
                </button>
            </form>

            <div v-if="folders.length" class="saved-bookmarks-manage-list" role="list">
                <article
                    v-for="folder in folders"
                    :key="`manage-folder-${folder.id}`"
                    class="saved-bookmarks-manage-row"
                    :class="{ 'is-pending-delete': pendingFolderDeleteId === folder.id }"
                    role="listitem">
                    <div class="saved-bookmarks-manage-row-main">
                        <span class="saved-bookmarks-manage-row-icon" aria-hidden="true">
                            <i :class="folder.icon || 'bi bi-folder2-open'"></i>
                        </span>
                        <div class="saved-bookmarks-manage-row-copy">
                            <template v-if="editingFolderId === folder.id">
                                <input
                                    v-model.trim="editingFolderName"
                                    type="text"
                                    class="form-control saved-bookmarks-manage-input"
                                    :disabled="busy"
                                    :aria-label="`Rename ${folder.name}`" />
                            </template>
                            <template v-else>
                                <strong class="saved-bookmarks-manage-name">{{ folder.name }}</strong>
                                <span class="saved-bookmarks-manage-meta">
                                    {{ folder.ayah_count || 0 }} saved
                                </span>
                            </template>
                        </div>
                    </div>
                    <div class="saved-bookmarks-manage-row-actions">
                        <button
                            v-if="editingFolderId !== folder.id"
                            type="button"
                            class="btn saved-bookmarks-icon-btn"
                            :disabled="busy"
                            :aria-label="`Rename ${folder.name}`"
                            @click="beginEdit(folder)">
                            <i class="bi bi-pencil-square" aria-hidden="true"></i>
                        </button>
                        <button
                            v-else
                            type="button"
                            class="btn saved-bookmarks-icon-btn saved-bookmarks-icon-btn-primary"
                            :disabled="busy || !editingFolderName"
                            :aria-label="`Save ${folder.name}`"
                            @click="confirmEdit(folder)">
                            <i class="bi bi-check2" aria-hidden="true"></i>
                        </button>
                        <button
                            v-if="editingFolderId === folder.id"
                            type="button"
                            class="btn saved-bookmarks-icon-btn"
                            :disabled="busy"
                            aria-label="Cancel rename"
                            @click="cancelEdit">
                            <i class="bi bi-x-lg" aria-hidden="true"></i>
                        </button>
                        <button
                            type="button"
                            class="btn saved-bookmarks-icon-btn saved-bookmarks-icon-btn-danger"
                            :disabled="busy"
                            :aria-label="`Delete ${folder.name}`"
                            @click="requestFolderDelete(folder)">
                            <i class="bi bi-trash3" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div
                        v-if="pendingFolderDeleteId === folder.id"
                        class="saved-bookmarks-manage-confirm">
                        <span>Delete this collection?</span>
                        <div class="saved-bookmarks-manage-confirm-actions">
                            <button
                                type="button"
                                class="btn saved-bookmarks-icon-btn"
                                :disabled="busy"
                                aria-label="Cancel delete"
                                @click="cancelFolderDelete">
                                <i class="bi bi-arrow-counterclockwise" aria-hidden="true"></i>
                            </button>
                            <button
                                type="button"
                                class="btn saved-bookmarks-icon-btn saved-bookmarks-icon-btn-danger"
                                :disabled="busy"
                                :aria-label="`Confirm delete ${folder.name}`"
                                @click="confirmFolderDelete(folder)">
                                <i class="bi bi-check2" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </article>
            </div>

            <div v-else class="saved-bookmarks-manage-empty">
                <i class="bi bi-folder2-open" aria-hidden="true"></i>
                <span>Create your first collection to organise saved ayahs beyond All.</span>
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
                    class="btn saved-bookmarks-toolbar-btn"
                    :disabled="deleteBusy"
                    @click="$emit('cancel-delete')">
                    <i class="bi bi-x-lg" aria-hidden="true"></i>
                    <span>Cancel</span>
                </button>
                <button
                    type="button"
                    class="btn saved-bookmarks-toolbar-btn is-danger"
                    :disabled="deleteBusy"
                    @click="$emit('confirm-delete')">
                    <i class="bi bi-trash3" aria-hidden="true"></i>
                    <span>{{ deleteBusy ? "Deleting..." : "Delete" }}</span>
                </button>
            </div>
        </div>

        <div v-if="bookmarks.length" class="saved-bookmarks-toolbar">
            <div class="saved-bookmarks-toolbar-copy">
                <strong>{{ selectedCount }} selected</strong>
                <span>{{ toolbarHint }}</span>
            </div>
            <div class="saved-bookmarks-toolbar-actions">
                <button
                    type="button"
                    class="btn saved-bookmarks-toolbar-btn"
                    :disabled="deleteBusy"
                    @click="$emit('toggle-select-all')">
                    <i
                        class="bi"
                        :class="allSelected ? 'bi-x-square' : 'bi-check2-square'"
                        aria-hidden="true"></i>
                    <span>{{ allSelected ? "Unselect" : "Select all" }}</span>
                </button>
                <button
                    type="button"
                    class="btn saved-bookmarks-toolbar-btn"
                    :disabled="!selectedCount || deleteBusy"
                    @click="$emit('clear-selection')">
                    <i class="bi bi-eraser" aria-hidden="true"></i>
                    <span>Clear</span>
                </button>
                <button
                    type="button"
                    class="btn saved-bookmarks-toolbar-btn is-danger"
                    :disabled="!selectedCount || deleteBusy"
                    @click="$emit('request-bulk-delete')">
                    <i class="bi bi-trash3" aria-hidden="true"></i>
                    <span>Delete</span>
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
                        <button
                            type="button"
                            class="btn saved-bookmarks-card-check"
                            :class="{ 'is-selected': selectedKeySet.has(bookmark.key) }"
                            :disabled="deleteBusy"
                            :aria-label="selectedKeySet.has(bookmark.key)
                                ? `Unselect ${bookmark.surahName} ayah ${bookmark.ayahNumber}`
                                : `Select ${bookmark.surahName} ayah ${bookmark.ayahNumber}`"
                            @click="$emit('toggle-selection', bookmark.key)">
                            <i
                                class="bi"
                                :class="selectedKeySet.has(bookmark.key) ? 'bi-check-circle-fill' : 'bi-circle'"
                                aria-hidden="true"></i>
                        </button>
                        <div class="saved-bookmarks-card-top-actions">
                            <select
                                v-if="folders.length"
                                class="form-select form-select-sm saved-bookmarks-move-select"
                                :disabled="deleteBusy || busy"
                                :aria-label="`${movePlaceholder} ${bookmark.surahName} ayah ${bookmark.ayahNumber}`"
                                @change="onMoveBookmark(bookmark.key, $event)">
                                <option value="" selected disabled>{{ movePlaceholder }}</option>
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
                            <i class="bi bi-bookmark-star-fill"></i>
                        </span>
                        <span class="saved-bookmarks-card-copy">
                            <span class="saved-bookmarks-card-title">{{ bookmark.surahName }}</span>
                            <span class="saved-bookmarks-card-meta">Ayah {{ bookmark.ayahNumber }}</span>
                            <span class="saved-bookmarks-card-date">{{ bookmark.savedAtLabel }}</span>
                            <span class="saved-bookmarks-card-tags">
                                <span
                                    v-for="folderName in getFolderNames(bookmark)"
                                    :key="`${bookmark.key}-${folderName}`"
                                    class="saved-bookmarks-card-tag">
                                    {{ folderName }}
                                </span>
                                <span
                                    v-if="!getFolderNames(bookmark).length"
                                    class="saved-bookmarks-card-tag is-muted">
                                    Unsorted
                                </span>
                            </span>
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
            <h4 class="saved-bookmarks-empty-title mb-2">{{ emptyStateTitle }}</h4>
            <p class="saved-bookmarks-empty-copy mb-0">
                {{ emptyStateCopy }}
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
    data() {
        return {
            manageOpen: false,
            newFolderName: "",
            editingFolderId: null,
            editingFolderName: "",
            pendingFolderDeleteId: null,
        };
    },
    computed: {
        isAllActive() {
            return String(this.activeFolderId || "all") === "all";
        },
        selectedKeySet() {
            return new Set(Array.isArray(this.selectedKeys) ? this.selectedKeys : []);
        },
        folderMap() {
            return (Array.isArray(this.folders) ? this.folders : []).reduce((map, folder) => {
                if (folder?.id) {
                    map[String(folder.id)] = folder;
                }
                return map;
            }, {});
        },
        activeFolderName() {
            if (this.isAllActive) {
                return "All bookmarks";
            }
            return this.folderMap[String(this.activeFolderId)]?.name || "This collection";
        },
        summaryText() {
            const count = Array.isArray(this.bookmarks) ? this.bookmarks.length : 0;
            if (!count) {
                return this.isAllActive
                    ? "Keep quick access to the ayahs you want to revisit."
                    : `${this.activeFolderName} is empty right now.`;
            }
            return this.isAllActive
                ? `${count} saved bookmark${count === 1 ? "" : "s"} ready to reopen.`
                : `${count} saved bookmark${count === 1 ? "" : "s"} inside ${this.activeFolderName}.`;
        },
        toolbarHint() {
            if (this.selectedCount > 0) {
                return "Use the actions on the right to clear or delete the current selection.";
            }
            return "Tap the circle on any card to select several bookmarks at once.";
        },
        movePlaceholder() {
            return this.isAllActive ? "Add to..." : "Move to...";
        },
        emptyStateTitle() {
            return this.isAllActive ? "No saved bookmarks yet" : `Nothing in ${this.activeFolderName}`;
        },
        emptyStateCopy() {
            return this.isAllActive
                ? "Save any ayah with the bookmark button and it will appear here."
                : "Open a bookmark from All, then add it to this collection from the quick action menu.";
        },
    },
    watch: {
        activeFolderId() {
            this.manageOpen = false;
            this.cancelEdit();
            this.cancelFolderDelete();
        },
    },
    methods: {
        handleAllClick() {
            this.manageOpen = false;
            this.cancelEdit();
            this.cancelFolderDelete();
            this.$emit("select-folder", "all");
        },
        openManage() {
            this.manageOpen = true;
            this.cancelEdit();
            this.cancelFolderDelete();
            this.$nextTick(() => {
                document.getElementById("savedBookmarksNewCollection")?.focus?.();
            });
        },
        handleFolderClick(folderId) {
            this.manageOpen = false;
            this.cancelEdit();
            this.cancelFolderDelete();
            this.$emit("select-folder", folderId);
        },
        onCreateFolder() {
            const name = (this.newFolderName || "").trim();
            if (!name) return;
            this.$emit("create-folder", { name });
            this.newFolderName = "";
            this.pendingFolderDeleteId = null;
        },
        beginEdit(folder) {
            this.pendingFolderDeleteId = null;
            this.editingFolderId = folder?.id ?? null;
            this.editingFolderName = String(folder?.name || "").trim();
        },
        cancelEdit() {
            this.editingFolderId = null;
            this.editingFolderName = "";
        },
        confirmEdit(folder) {
            const id = Number(folder?.id || 0);
            const name = (this.editingFolderName || "").trim();
            if (!id || !name) return;
            this.$emit("update-folder", { id, name });
            this.cancelEdit();
        },
        requestFolderDelete(folder) {
            this.cancelEdit();
            this.pendingFolderDeleteId = folder?.id ?? null;
        },
        cancelFolderDelete() {
            this.pendingFolderDeleteId = null;
        },
        confirmFolderDelete(folder) {
            const id = Number(folder?.id || 0);
            if (!id) return;
            this.$emit("delete-folder", { id });
            this.pendingFolderDeleteId = null;
        },
        onMoveBookmark(key, event) {
            const targetFolderId = Number(event?.target?.value);
            if (!targetFolderId) return;
            this.$emit("move-bookmark", { key, targetFolderId });
            if (event?.target) {
                event.target.value = "";
            }
        },
        getFolderNames(bookmark) {
            const ids = Array.isArray(bookmark?.folderIds) ? bookmark.folderIds : [];
            return ids
                .map((id) => this.folderMap[String(id)]?.name || "")
                .filter(Boolean)
                .slice(0, 3);
        },
    },
};
</script>

<style scoped>
.saved-bookmarks-panel {
    --saved-bookmarks-accent: #0f766e;
    --saved-bookmarks-accent-soft: rgba(15, 118, 110, 0.12);
    --saved-bookmarks-accent-strong: #115e59;
    --saved-bookmarks-danger: #b91c1c;
    --saved-bookmarks-danger-soft: rgba(239, 68, 68, 0.12);
    --saved-bookmarks-border: rgba(15, 23, 42, 0.1);
    --saved-bookmarks-surface: rgba(255, 255, 255, 0.97);
    --saved-bookmarks-surface-alt: rgba(248, 250, 252, 0.95);
    --saved-bookmarks-card-bg: rgba(255, 255, 255, 0.88);
    --saved-bookmarks-toolbar-bg: rgba(247, 250, 252, 0.9);
    --saved-bookmarks-control-bg: rgba(255, 255, 255, 0.96);
    --saved-bookmarks-warning-bg: #fff7db;
    --saved-bookmarks-warning-border: rgba(217, 119, 6, 0.24);
    --saved-bookmarks-text: #0f172a;
    --saved-bookmarks-muted: #64748b;
    border: 1px solid var(--saved-bookmarks-border);
    border-radius: 24px;
    background:
        radial-gradient(circle at top right, rgba(20, 184, 166, 0.12), transparent 28%),
        linear-gradient(180deg, var(--saved-bookmarks-surface), var(--saved-bookmarks-surface-alt));
    box-shadow: 0 24px 54px rgba(15, 23, 42, 0.14);
    color: var(--saved-bookmarks-text);
    padding: 0.9rem;
}

.saved-bookmarks-panel.is-dark {
    --saved-bookmarks-accent: #7dd3fc;
    --saved-bookmarks-accent-soft: rgba(125, 211, 252, 0.14);
    --saved-bookmarks-accent-strong: #e0f2fe;
    --saved-bookmarks-danger: #fca5a5;
    --saved-bookmarks-danger-soft: rgba(248, 113, 113, 0.14);
    --saved-bookmarks-border: rgba(148, 163, 184, 0.24);
    --saved-bookmarks-surface: rgba(2, 6, 23, 0.96);
    --saved-bookmarks-surface-alt: rgba(15, 23, 42, 0.98);
    --saved-bookmarks-card-bg: rgba(15, 23, 42, 0.88);
    --saved-bookmarks-toolbar-bg: rgba(15, 23, 42, 0.88);
    --saved-bookmarks-control-bg: rgba(30, 41, 59, 0.94);
    --saved-bookmarks-warning-bg: rgba(120, 53, 15, 0.34);
    --saved-bookmarks-warning-border: rgba(251, 191, 36, 0.28);
    --saved-bookmarks-text: #f8fafc;
    --saved-bookmarks-muted: #cbd5e1;
    box-shadow: 0 26px 58px rgba(2, 6, 23, 0.56);
}

.saved-bookmarks-panel-head,
.saved-bookmarks-toolbar,
.saved-bookmarks-confirm-alert,
.saved-bookmarks-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.saved-bookmarks-panel-head {
    gap: 0.9rem;
    margin-bottom: 0.8rem;
}

.saved-bookmarks-panel-heading {
    min-width: 0;
}

.saved-bookmarks-panel-kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.38rem;
    margin-bottom: 0.3rem;
    padding: 0.18rem 0.54rem;
    border-radius: 999px;
    background: var(--saved-bookmarks-accent-soft);
    color: var(--saved-bookmarks-accent);
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.saved-bookmarks-panel-title {
    font-size: 1.08rem;
    font-weight: 800;
    letter-spacing: -0.02em;
}

.saved-bookmarks-panel-subtitle {
    color: var(--saved-bookmarks-muted);
    font-size: 0.84rem;
    line-height: 1.5;
}

.saved-bookmarks-close-btn,
.saved-bookmarks-delete-btn,
.saved-bookmarks-icon-btn,
.saved-bookmarks-card-check,
.saved-bookmarks-toolbar-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    border-radius: 999px;
    border: 1px solid var(--saved-bookmarks-border);
    background: var(--saved-bookmarks-control-bg);
    color: var(--saved-bookmarks-text);
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
}

.saved-bookmarks-close-btn,
.saved-bookmarks-delete-btn,
.saved-bookmarks-card-check,
.saved-bookmarks-icon-btn {
    width: 2.05rem;
    height: 2.05rem;
    padding: 0;
}

.saved-bookmarks-toolbar-btn {
    padding: 0.46rem 0.76rem;
    font-size: 0.78rem;
    font-weight: 700;
}

.saved-bookmarks-icon-btn:hover,
.saved-bookmarks-icon-btn:focus-visible,
.saved-bookmarks-close-btn:hover,
.saved-bookmarks-close-btn:focus-visible,
.saved-bookmarks-delete-btn:hover,
.saved-bookmarks-delete-btn:focus-visible,
.saved-bookmarks-card-check:hover,
.saved-bookmarks-card-check:focus-visible,
.saved-bookmarks-toolbar-btn:hover,
.saved-bookmarks-toolbar-btn:focus-visible,
.saved-bookmarks-card-link:hover,
.saved-bookmarks-card-link:focus-visible,
.saved-bookmarks-collection-pill:hover,
.saved-bookmarks-collection-pill:focus-visible {
    border-color: rgba(15, 118, 110, 0.34);
    box-shadow: 0 0 0 0.18rem rgba(15, 118, 110, 0.12);
    transform: translateY(-1px);
}

.saved-bookmarks-icon-btn-primary,
.saved-bookmarks-toolbar-btn.is-danger,
.saved-bookmarks-icon-btn-danger {
    color: #fff;
    border-color: transparent;
}

.saved-bookmarks-icon-btn-primary {
    background: linear-gradient(135deg, #0f766e, #115e59);
}

.saved-bookmarks-icon-btn-danger,
.saved-bookmarks-toolbar-btn.is-danger {
    background: linear-gradient(135deg, #dc2626, #b91c1c);
}

.saved-bookmarks-flow {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.55rem;
    margin-bottom: 0.8rem;
}

.saved-bookmarks-flow-step {
    display: flex;
    align-items: center;
    gap: 0.72rem;
    min-height: 5rem;
    padding: 0.7rem 0.8rem;
    border-radius: 16px;
    border: 1px solid var(--saved-bookmarks-border);
    background: var(--saved-bookmarks-card-bg);
}

.saved-bookmarks-flow-step strong,
.saved-bookmarks-flow-step span {
    display: block;
}

.saved-bookmarks-flow-step strong {
    font-size: 0.78rem;
    font-weight: 800;
    line-height: 1.2;
}

.saved-bookmarks-flow-step span {
    font-size: 0.75rem;
    color: var(--saved-bookmarks-muted);
    line-height: 1.35;
}

.saved-bookmarks-flow-icon {
    display: grid;
    place-items: center;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 999px;
    background: var(--saved-bookmarks-accent-soft);
    color: var(--saved-bookmarks-accent);
    flex-shrink: 0;
    line-height: 0;
    overflow: hidden;
}

.saved-bookmarks-flow-icon i {
    display: grid;
    place-items: center;
    width: 1rem;
    height: 1rem;
    font-size: 0.88rem;
    line-height: 1;
    margin: 0;
    padding: 0;
}

.saved-bookmarks-flow-icon i::before {
    display: block;
    line-height: 1;
    margin: 0;
}

.saved-bookmarks-tabs {
    display: grid;
    gap: 0.6rem;
    margin-bottom: 0.8rem;
}

.saved-bookmarks-primary-pills {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.6rem;
}

.saved-bookmarks-secondary-pills {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding: 0.08rem 0.08rem 0.18rem;
    scrollbar-width: thin;
    scrollbar-color: rgba(100, 116, 139, 0.35) transparent;
}

.saved-bookmarks-collection-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    flex-shrink: 0;
    padding: 0.44rem 0.74rem;
    border-radius: 999px;
    border: 1px solid var(--saved-bookmarks-border);
    background: var(--saved-bookmarks-control-bg);
    color: var(--saved-bookmarks-text);
    font-size: 0.78rem;
    font-weight: 800;
    line-height: 1.1;
    white-space: nowrap;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}

.saved-bookmarks-collection-pill-primary {
    justify-content: center;
    min-height: 3rem;
    padding: 0.68rem 0.95rem;
    font-size: 0.94rem;
    font-weight: 800;
    border-width: 1.5px;
    box-shadow: 0 12px 26px rgba(15, 23, 42, 0.08);
}

.saved-bookmarks-collection-pill-primary i {
    font-size: 1rem;
}

.saved-bookmarks-collection-pill-primary.is-active {
    border-color: rgba(15, 118, 110, 0.82);
    background: linear-gradient(135deg, rgba(15, 118, 110, 0.18), rgba(15, 118, 110, 0.08));
    color: var(--saved-bookmarks-accent-strong);
    box-shadow:
        0 18px 32px rgba(15, 118, 110, 0.2),
        0 0 0 0.18rem rgba(15, 118, 110, 0.12);
}

.saved-bookmarks-panel.is-dark .saved-bookmarks-collection-pill-primary {
    background: linear-gradient(180deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.98));
    border-color: rgba(125, 211, 252, 0.18);
    color: #f8fafc;
    box-shadow: 0 14px 30px rgba(2, 6, 23, 0.38);
}

.saved-bookmarks-panel.is-dark .saved-bookmarks-collection-pill-primary.is-active {
    border-color: rgba(125, 211, 252, 0.9);
    background: linear-gradient(135deg, rgba(125, 211, 252, 0.24), rgba(56, 189, 248, 0.12));
    color: #f8fafc;
    box-shadow:
        0 18px 36px rgba(56, 189, 248, 0.22),
        0 0 0 0.2rem rgba(125, 211, 252, 0.14);
}

.saved-bookmarks-collection-pill.is-active {
    border-color: rgba(15, 118, 110, 0.7);
    background: linear-gradient(135deg, rgba(15, 118, 110, 0.16), rgba(15, 118, 110, 0.08));
    color: var(--saved-bookmarks-accent-strong);
    box-shadow:
        0 10px 22px rgba(15, 118, 110, 0.14),
        inset 0 0 0 1px rgba(15, 118, 110, 0.12);
}

.saved-bookmarks-collection-pill-title {
    max-width: 8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.saved-bookmarks-collection-pill-count,
.saved-bookmarks-manage-count-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.5rem;
    height: 1.5rem;
    padding: 0 0.38rem;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.08);
    color: var(--saved-bookmarks-muted);
    font-size: 0.72rem;
    font-weight: 800;
}

.saved-bookmarks-panel.is-dark .saved-bookmarks-collection-pill-count,
.saved-bookmarks-panel.is-dark .saved-bookmarks-manage-count-pill {
    background: rgba(248, 250, 252, 0.08);
}

.saved-bookmarks-panel.is-dark .saved-bookmarks-collection-pill.is-active {
    border-color: rgba(125, 211, 252, 0.82);
    background: linear-gradient(135deg, rgba(125, 211, 252, 0.2), rgba(125, 211, 252, 0.08));
    color: #f8fafc;
    box-shadow:
        0 12px 28px rgba(56, 189, 248, 0.18),
        inset 0 0 0 1px rgba(125, 211, 252, 0.14);
}

.saved-bookmarks-manage {
    margin-bottom: 0.8rem;
    padding: 0.8rem;
    border-radius: 18px;
    border: 1px solid var(--saved-bookmarks-border);
    background: var(--saved-bookmarks-toolbar-bg);
}

.saved-bookmarks-manage-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.65rem;
}

.saved-bookmarks-manage-head strong,
.saved-bookmarks-manage-hint {
    display: block;
}

.saved-bookmarks-manage-hint {
    margin-top: 0.18rem;
    color: var(--saved-bookmarks-muted);
    font-size: 0.78rem;
    line-height: 1.45;
}

.saved-bookmarks-manage-create {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.65rem;
}

.saved-bookmarks-manage-input,
.saved-bookmarks-move-select {
    border-radius: 999px;
    border: 1px solid var(--saved-bookmarks-border);
    background: var(--saved-bookmarks-control-bg);
    color: var(--saved-bookmarks-text);
}

.saved-bookmarks-manage-input {
    font-size: 0.84rem;
    padding: 0.52rem 0.8rem;
}

.saved-bookmarks-manage-list {
    display: grid;
    gap: 0.5rem;
    max-height: min(34vh, 21rem);
    overflow-y: auto;
    padding-right: 0.12rem;
}

.saved-bookmarks-manage-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.75rem;
    padding: 0.64rem 0.7rem;
    border-radius: 15px;
    border: 1px solid var(--saved-bookmarks-border);
    background: var(--saved-bookmarks-card-bg);
}

.saved-bookmarks-manage-row.is-pending-delete {
    border-color: rgba(239, 68, 68, 0.26);
    background: var(--saved-bookmarks-danger-soft);
}

.saved-bookmarks-manage-row-main {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    min-width: 0;
}

.saved-bookmarks-manage-row-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.95rem;
    height: 1.95rem;
    border-radius: 999px;
    background: var(--saved-bookmarks-accent-soft);
    color: var(--saved-bookmarks-accent);
    flex-shrink: 0;
}

.saved-bookmarks-manage-row-copy {
    min-width: 0;
}

.saved-bookmarks-manage-name,
.saved-bookmarks-manage-meta {
    display: block;
}

.saved-bookmarks-manage-name {
    font-size: 0.84rem;
    font-weight: 800;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.saved-bookmarks-manage-meta {
    margin-top: 0.12rem;
    color: var(--saved-bookmarks-muted);
    font-size: 0.74rem;
}

.saved-bookmarks-manage-row-actions,
.saved-bookmarks-manage-confirm-actions,
.saved-bookmarks-toolbar-actions,
.saved-bookmarks-confirm-actions,
.saved-bookmarks-card-top-actions {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
}

.saved-bookmarks-manage-confirm {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding-top: 0.1rem;
    color: var(--saved-bookmarks-muted);
    font-size: 0.78rem;
}

.saved-bookmarks-manage-empty {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.9rem;
    border-radius: 16px;
    border: 1px dashed var(--saved-bookmarks-border);
    color: var(--saved-bookmarks-muted);
    background: var(--saved-bookmarks-card-bg);
}

.saved-bookmarks-confirm-alert,
.saved-bookmarks-toolbar {
    gap: 0.8rem;
    flex-wrap: wrap;
    margin-bottom: 0.85rem;
    padding: 0.78rem 0.88rem;
    border-radius: 16px;
    border: 1px solid var(--saved-bookmarks-border);
}

.saved-bookmarks-confirm-alert {
    background: var(--saved-bookmarks-warning-bg);
    border-color: var(--saved-bookmarks-warning-border);
    color: var(--saved-bookmarks-text);
}

.saved-bookmarks-toolbar {
    background: var(--saved-bookmarks-toolbar-bg);
}

.saved-bookmarks-confirm-copy,
.saved-bookmarks-toolbar-copy {
    display: flex;
    flex-direction: column;
    gap: 0.12rem;
    font-size: 0.82rem;
}

.saved-bookmarks-confirm-copy span,
.saved-bookmarks-toolbar-copy span {
    color: var(--saved-bookmarks-muted);
    line-height: 1.45;
}

.saved-bookmarks-body {
    max-height: min(42vh, 26rem);
    overflow: hidden;
}

.saved-bookmarks-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.7rem;
    max-height: inherit;
    overflow-y: auto;
    padding-right: 0.1rem;
}

.saved-bookmarks-card {
    display: flex;
    flex-direction: column;
    gap: 0.64rem;
    padding: 0.74rem;
    border-radius: 16px;
    border: 1px solid var(--saved-bookmarks-border);
    background: var(--saved-bookmarks-card-bg);
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.saved-bookmarks-card.is-selected {
    border-color: rgba(14, 165, 233, 0.48);
    box-shadow: 0 14px 28px rgba(14, 165, 233, 0.12);
}

.saved-bookmarks-card-check.is-selected {
    color: var(--saved-bookmarks-accent);
    border-color: rgba(15, 118, 110, 0.44);
    background: var(--saved-bookmarks-accent-soft);
}

.saved-bookmarks-move-select {
    min-width: 8.2rem;
    font-size: 0.76rem;
    padding: 0.38rem 0.68rem;
}

.saved-bookmarks-card-link {
    display: flex;
    align-items: flex-start;
    gap: 0.68rem;
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
    width: 2.35rem;
    height: 2.35rem;
    flex-shrink: 0;
    border-radius: 14px;
    background: var(--saved-bookmarks-accent-soft);
    color: var(--saved-bookmarks-accent);
    font-size: 0.94rem;
}

.saved-bookmarks-card-copy {
    display: flex;
    flex-direction: column;
    gap: 0.14rem;
    min-width: 0;
    flex: 1 1 auto;
}

.saved-bookmarks-card-title {
    font-weight: 800;
    font-size: 0.9rem;
    line-height: 1.3;
}

.saved-bookmarks-card-meta,
.saved-bookmarks-card-date {
    font-size: 0.77rem;
    color: var(--saved-bookmarks-muted);
}

.saved-bookmarks-card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: 0.28rem;
}

.saved-bookmarks-card-tag {
    display: inline-flex;
    align-items: center;
    padding: 0.18rem 0.52rem;
    border-radius: 999px;
    background: var(--saved-bookmarks-accent-soft);
    color: var(--saved-bookmarks-accent-strong);
    font-size: 0.68rem;
    font-weight: 700;
}

.saved-bookmarks-card-tag.is-muted {
    background: rgba(148, 163, 184, 0.14);
    color: var(--saved-bookmarks-muted);
}

.saved-bookmarks-card-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.8rem;
    height: 1.8rem;
    color: var(--saved-bookmarks-muted);
    font-size: 0.9rem;
}

.saved-bookmarks-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 2rem 1rem;
    text-align: center;
    border: 1px dashed var(--saved-bookmarks-border);
    border-radius: 18px;
}

.saved-bookmarks-empty-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.9rem;
    height: 2.9rem;
    border-radius: 18px;
    background: var(--saved-bookmarks-accent-soft);
    color: var(--saved-bookmarks-accent);
    font-size: 1.08rem;
}

.saved-bookmarks-empty-title {
    font-size: 0.96rem;
    font-weight: 800;
}

.saved-bookmarks-empty-copy {
    color: var(--saved-bookmarks-muted);
    font-size: 0.84rem;
    line-height: 1.5;
    max-width: 34rem;
}

@media (max-width: 991.98px) {
    .saved-bookmarks-panel {
        padding: 0.84rem;
    }

    .saved-bookmarks-flow {
        grid-template-columns: 1fr;
    }

    .saved-bookmarks-manage-list,
    .saved-bookmarks-body {
        max-height: none;
    }
}

@media (max-width: 767.98px) {
    .saved-bookmarks-panel-head,
    .saved-bookmarks-toolbar,
    .saved-bookmarks-confirm-alert,
    .saved-bookmarks-manage-head,
    .saved-bookmarks-manage-confirm,
    .saved-bookmarks-card-top {
        align-items: flex-start;
    }

    .saved-bookmarks-panel {
        border-radius: 20px;
        padding: 0.8rem;
    }

    .saved-bookmarks-tabs {
        gap: 0.62rem;
    }

    .saved-bookmarks-primary-pills {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .saved-bookmarks-secondary-pills {
        margin-inline: -0.08rem;
        padding-inline: 0.08rem;
    }

    .saved-bookmarks-grid {
        grid-template-columns: minmax(0, 1fr);
        max-height: none;
        overflow: visible;
    }

    .saved-bookmarks-card,
    .saved-bookmarks-manage-row {
        padding: 0.74rem;
    }

    .saved-bookmarks-card-top,
    .saved-bookmarks-manage-row {
        grid-template-columns: 1fr;
    }

    .saved-bookmarks-card-top-actions,
    .saved-bookmarks-toolbar-actions,
    .saved-bookmarks-confirm-actions,
    .saved-bookmarks-manage-row-actions,
    .saved-bookmarks-manage-confirm-actions {
        width: 100%;
        flex-wrap: wrap;
    }

    .saved-bookmarks-toolbar-btn,
    .saved-bookmarks-move-select {
        flex: 1 1 auto;
    }

    .saved-bookmarks-manage-create {
        flex-wrap: wrap;
    }

    .saved-bookmarks-manage-create .saved-bookmarks-manage-input {
        width: 100%;
    }

    .saved-bookmarks-collection-pill {
        min-height: 2.7rem;
    }

    .saved-bookmarks-collection-pill-primary {
        min-height: 2.9rem;
        font-size: 0.88rem;
    }

    .saved-bookmarks-flow-step {
        min-height: auto;
        padding: 0.64rem 0.72rem;
    }

    .saved-bookmarks-manage {
        padding: 0.72rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    .saved-bookmarks-close-btn,
    .saved-bookmarks-delete-btn,
    .saved-bookmarks-icon-btn,
    .saved-bookmarks-card-check,
    .saved-bookmarks-toolbar-btn,
    .saved-bookmarks-card,
    .saved-bookmarks-card-link,
    .saved-bookmarks-collection-pill {
        transition: none;
    }
}
</style>
