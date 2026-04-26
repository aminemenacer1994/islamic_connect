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
                <p class="saved-bookmarks-panel-subtitle mb-2">Bookmarks allow you to save individual ayahs for quick reference. Group your bookmarks using Collections below.</p>
                <p class="saved-bookmarks-panel-summary mb-0"><strong>{{ summaryText }}</strong></p>
            </div>
            <div class="saved-bookmarks-panel-actions">
                <div class="saved-bookmarks-search-wrap">
                    <i class="bi bi-search" aria-hidden="true"></i>
                    <input
                        v-model="searchQuery"
                        type="text"
                        class="form-control saved-bookmarks-search"
                        placeholder="Search bookmarks..."
                        aria-label="Search bookmarks" />
                </div>
                <button
                    type="button"
                    class="btn saved-bookmarks-close-btn"
                    aria-label="Close saved bookmarks panel"
                    @click="$emit('close')">
                    <i class="bi bi-x-lg" aria-hidden="true"></i>
                </button>
            </div>
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
                
                <div class="saved-bookmarks-manage-presets mt-2 mb-2">
                    <button 
                        v-for="preset in iconPresets" 
                        :key="`new-preset-${preset.icon}`"
                        type="button"
                        class="btn btn-sm saved-bookmarks-preset-btn"
                        :class="{ 'is-active': newFolderIcon === preset.icon }"
                        @click="newFolderIcon = preset.icon">
                        <i :class="preset.icon"></i>
                    </button>
                </div>

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
                                <div class="saved-bookmarks-manage-presets mt-2">
                                    <button 
                                        v-for="preset in iconPresets" 
                                        :key="`edit-preset-${folder.id}-${preset.icon}`"
                                        type="button"
                                        class="btn btn-sm saved-bookmarks-preset-btn"
                                        :class="{ 'is-active': editingFolderIcon === preset.icon }"
                                        @click="editingFolderIcon = preset.icon">
                                        <i :class="preset.icon"></i>
                                    </button>
                                </div>
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

        <div v-if="filteredBookmarks.length" class="saved-bookmarks-body">
            <div class="saved-bookmarks-grid">
                <article
                    v-for="bookmark in filteredBookmarks"
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
                <i :class="searchQuery ? 'bi bi-search' : 'bi bi-bookmark-heart'"></i>
            </span>
            <h4 class="saved-bookmarks-empty-title mb-2">
                {{ searchQuery ? `No results for "${searchQuery}"` : emptyStateTitle }}
            </h4>
            <p class="saved-bookmarks-empty-copy mb-0">
                {{ searchQuery ? "Try a different surah name or search term." : emptyStateCopy }}
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
            searchQuery: "",
            newFolderName: "",
            editingFolderId: null,
            editingFolderName: "",
            pendingFolderDeleteId: null,
            newFolderIcon: "bi-bookmark",
            editingFolderIcon: "bi-bookmark",
            iconPresets: [
                { icon: "bi-bookmark" },
                { icon: "bi-star" },
                { icon: "bi-heart" },
                { icon: "bi-book" },
                { icon: "bi-book-half" },
                { icon: "bi-leaf" },
                { icon: "bi-bank" },
                { icon: "bi-box-fill" },
                { icon: "bi-lightbulb" },
                { icon: "bi-journal-bookmark" },
            ],
        };
    },
    computed: {
        filteredBookmarks() {
            const query = (this.searchQuery || "").toLowerCase().trim();
            const list = Array.isArray(this.bookmarks) ? this.bookmarks : [];
            if (!query) return list;
            return list.filter((b) => {
                const surah = String(b?.surahName || "").toLowerCase();
                const note = String(b?.note || "").toLowerCase();
                const ref = String(b?.refLabel || "").toLowerCase();
                const translation = String(b?.translation || "").toLowerCase();
                return (
                    surah.includes(query) ||
                    note.includes(query) ||
                    ref.includes(query) ||
                    translation.includes(query)
                );
            });
        },
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
        totalBookmarksCount() {
            return Array.isArray(this.bookmarks) ? this.bookmarks.length : 0;
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
            this.$emit("create-folder", { 
                name, 
                icon: this.newFolderIcon,
                color: "primary" 
            });
            this.newFolderName = "";
            this.newFolderIcon = "bi-bookmark";
            this.pendingFolderDeleteId = null;
        },
        beginEdit(folder) {
            this.pendingFolderDeleteId = null;
            this.editingFolderId = folder?.id ?? null;
            this.editingFolderName = String(folder?.name || "").trim();
            this.editingFolderIcon = folder?.icon || "bi-bookmark";
        },
        cancelEdit() {
            this.editingFolderId = null;
            this.editingFolderName = "";
            this.editingFolderIcon = "bi-bookmark";
        },
        confirmEdit(folder) {
            const id = Number(folder?.id || 0);
            const name = (this.editingFolderName || "").trim();
            const icon = this.editingFolderIcon;
            if (!id || !name) return;
            this.$emit("update-folder", { id, name, icon });
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
    --saved-bookmarks-accent-soft: rgba(15, 118, 110, 0.1);
    --saved-bookmarks-accent-strong: #115e59;
    --saved-bookmarks-danger: #e11d48;
    --saved-bookmarks-danger-soft: rgba(225, 29, 72, 0.1);
    --saved-bookmarks-border: rgba(38, 41, 46, 0.08);
    --saved-bookmarks-surface: rgba(255, 255, 255, 0.9);
    --saved-bookmarks-surface-alt: rgba(248, 250, 252, 0.95);
    --saved-bookmarks-card-bg: rgba(255, 255, 255, 0.7);
    --saved-bookmarks-toolbar-bg: rgba(241, 245, 249, 0.8);
    --saved-bookmarks-control-bg: rgba(255, 255, 255, 0.9);
    --saved-bookmarks-text: #0f172a;
    --saved-bookmarks-muted: #64748b;
    --sb-glass-border: rgba(255, 255, 255, 0.4);
    --sb-shadow: 0 20px 50px rgba(38, 41, 46, 0.1);
    
    border: 1px solid var(--saved-bookmarks-border);
    border-radius: 32px;
    background: 
        radial-gradient(circle at -10% -10%, rgba(20, 184, 166, 0.15), transparent 40%),
        radial-gradient(circle at 110% 110%, rgba(15, 118, 110, 0.1), transparent 40%),
        linear-gradient(135deg, var(--saved-bookmarks-surface), var(--saved-bookmarks-surface-alt));
    backdrop-filter: blur(20px);
    box-shadow: var(--sb-shadow), inset 0 0 0 1px var(--sb-glass-border);
    color: var(--saved-bookmarks-text);
    padding: 1.25rem;
    position: relative;
    overflow: hidden;
    font-family: "Inter", system-ui, -apple-system, sans-serif !important;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.saved-bookmarks-panel.is-dark {
    --saved-bookmarks-accent: #38bdf8;
    --saved-bookmarks-accent-soft: rgba(56, 189, 248, 0.12);
    --saved-bookmarks-accent-strong: #7dd3fc;
    --saved-bookmarks-danger: #fb7185;
    --saved-bookmarks-danger-soft: rgba(251, 113, 133, 0.12);
    --saved-bookmarks-border: rgba(148, 163, 184, 0.1);
    --saved-bookmarks-surface: rgba(38, 41, 46, 0.95);
    --saved-bookmarks-surface-alt: rgba(30, 33, 38, 0.98);
    --saved-bookmarks-card-bg: rgba(46, 50, 56, 0.6);
    --saved-bookmarks-toolbar-bg: rgba(46, 50, 56, 0.8);
    --saved-bookmarks-control-bg: rgba(38, 41, 46, 0.8);
    --saved-bookmarks-text: #f8fafc;
    --saved-bookmarks-muted: #94a3b8;
    --sb-glass-border: rgba(255, 255, 255, 0.05);
    --sb-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
}

.saved-bookmarks-panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    gap: 1.5rem;
}

.saved-bookmarks-panel-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
    justify-content: flex-end;
}

.saved-bookmarks-search-wrap {
    position: relative;
    max-width: 320px;
    width: 100%;
}

.saved-bookmarks-search-wrap i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--saved-bookmarks-muted);
    font-size: 0.9rem;
    pointer-events: none;
}

.saved-bookmarks-search {
    width: 100%;
    height: 3rem;
    padding: 0 1rem 0 2.5rem;
    border-radius: 12px;
    border: 1px solid var(--saved-bookmarks-border);
    background: var(--saved-bookmarks-control-bg);
    color: var(--saved-bookmarks-text);
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.saved-bookmarks-search:focus {
    border-color: var(--saved-bookmarks-accent);
    box-shadow: 0 0 0 4px var(--saved-bookmarks-accent-soft);
    outline: none;
}

@media (max-width: 991px) {
    .saved-bookmarks-panel-head {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
    .saved-bookmarks-panel-actions {
        width: 100%;
        justify-content: space-between;
    }
    .saved-bookmarks-search-wrap {
        max-width: none;
        flex: 1;
    }
}


.saved-bookmarks-panel-kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    background: var(--saved-bookmarks-accent-soft);
    color: var(--saved-bookmarks-accent);
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
}

.saved-bookmarks-panel-title {
    font-size: 1.5rem;
    font-weight: 900;
    letter-spacing: -0.025em;
    background: linear-gradient(135deg, var(--saved-bookmarks-text), var(--saved-bookmarks-muted));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.saved-bookmarks-panel-subtitle {
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--saved-bookmarks-muted);
}

.saved-bookmarks-panel-summary {
    font-size: 0.85rem;
    color: var(--saved-bookmarks-accent);
}

.saved-bookmarks-close-btn {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 12px;
    border: 1px solid var(--saved-bookmarks-border);
    background: var(--saved-bookmarks-control-bg);
    color: var(--saved-bookmarks-text);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.saved-bookmarks-close-btn:hover {
    background: var(--saved-bookmarks-danger-soft);
    color: var(--saved-bookmarks-danger);
    transform: rotate(90deg) scale(1.1);
}

.saved-bookmarks-flow {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.saved-bookmarks-flow-step {
    padding: 1rem;
    border-radius: 20px;
    background: var(--saved-bookmarks-card-bg);
    border: 1px solid var(--saved-bookmarks-border);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: all 0.3s ease;
}

.saved-bookmarks-flow-step:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.saved-bookmarks-flow-icon {
    width: 2.25rem;
    height: 2.25rem;
    background: var(--saved-bookmarks-accent-soft);
    color: var(--saved-bookmarks-accent);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
}

.saved-bookmarks-flow-step strong {
    font-size: 0.85rem;
    font-weight: 800;
}

.saved-bookmarks-flow-step span {
    font-size: 0.75rem;
    color: var(--saved-bookmarks-muted);
}

.saved-bookmarks-tabs {
    margin-bottom: 1.5rem;
}

.saved-bookmarks-primary-pills {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.saved-bookmarks-collection-pill-primary {
    flex: 1;
    height: 3.5rem;
    border-radius: 16px;
    font-weight: 800;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    background: var(--saved-bookmarks-card-bg);
    border: 1px solid var(--saved-bookmarks-border);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.saved-bookmarks-collection-pill-primary.is-active {
    background: linear-gradient(135deg, var(--saved-bookmarks-accent), #14b8a6);
    color: white;
    border-color: transparent;
    box-shadow: 0 12px 24px rgba(20, 184, 166, 0.3);
}

.saved-bookmarks-secondary-pills {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    scrollbar-width: none;
}

.saved-bookmarks-collection-pill {
    padding: 0.5rem 1rem;
    border-radius: 999px;
    background: var(--saved-bookmarks-card-bg);
    border: 1px solid var(--saved-bookmarks-border);
    font-size: 0.8rem;
    font-weight: 700;
    transition: all 0.2s ease;
    white-space: nowrap;
}

.saved-bookmarks-collection-pill:hover {
    background: var(--saved-bookmarks-accent-soft);
    color: var(--saved-bookmarks-accent);
}

.saved-bookmarks-collection-pill.is-active {
    background: var(--saved-bookmarks-accent);
    color: white;
    border-color: transparent;
}

.saved-bookmarks-body {
    max-height: 480px;
    overflow-y: auto;
    padding-right: 4px;
    scrollbar-width: thin;
}

.saved-bookmarks-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.saved-bookmarks-card {
    border-radius: 20px;
    background: var(--saved-bookmarks-card-bg);
    border: 1px solid var(--saved-bookmarks-border);
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.saved-bookmarks-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.saved-bookmarks-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
    border-color: var(--saved-bookmarks-accent);
}

.saved-bookmarks-card:hover::before {
    opacity: 1;
}

.saved-bookmarks-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.saved-bookmarks-card-check {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 2px solid var(--saved-bookmarks-border);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.saved-bookmarks-card.is-selected {
    background: var(--saved-bookmarks-accent-soft);
    border-color: var(--saved-bookmarks-accent);
}

.saved-bookmarks-card.is-selected .saved-bookmarks-card-check {
    background: var(--saved-bookmarks-accent);
    border-color: var(--saved-bookmarks-accent);
    color: white;
}

.saved-bookmarks-card-link {
    display: flex;
    gap: 1rem;
    text-decoration: none;
    color: inherit;
    background: none;
    border: none;
    padding: 0;
    text-align: left;
}

.saved-bookmarks-card-icon {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--saved-bookmarks-accent-soft), transparent);
    color: var(--saved-bookmarks-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
}

.saved-bookmarks-card-title {
    font-size: 1.1rem;
    font-weight: 800;
    display: block;
    margin-bottom: 0.25rem;
}

.saved-bookmarks-card-meta {
    font-size: 0.8rem;
    color: var(--saved-bookmarks-muted);
    font-weight: 600;
}

.saved-bookmarks-card-date {
    font-size: 0.75rem;
    color: var(--saved-bookmarks-muted);
    margin-top: 0.5rem;
    display: block;
}

.saved-bookmarks-card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.75rem;
}

.saved-bookmarks-card-tag {
    font-size: 0.65rem;
    font-weight: 800;
    padding: 0.25rem 0.6rem;
    border-radius: 6px;
    background: var(--saved-bookmarks-accent-soft);
    color: var(--saved-bookmarks-accent);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.saved-bookmarks-toolbar {
    background: var(--saved-bookmarks-toolbar-bg);
    padding: 1rem 1.25rem;
    border-radius: 20px;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--saved-bookmarks-border);
}

.saved-bookmarks-toolbar-btn {
    padding: 0.5rem 1rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.8rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s ease;
}

.saved-bookmarks-toolbar-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.saved-bookmarks-toolbar-btn.is-danger {
    background: var(--saved-bookmarks-danger);
    color: white;
}

.saved-bookmarks-empty {
    padding: 4rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.saved-bookmarks-empty-icon {
    font-size: 4rem;
    color: var(--saved-bookmarks-accent-soft);
    margin-bottom: 1rem;
}

@media (max-width: 768px) {
    .saved-bookmarks-grid {
        grid-template-columns: 1fr;
    }
    .saved-bookmarks-flow {
        grid-template-columns: 1fr;
    }
    .saved-bookmarks-primary-pills {
        flex-direction: column;
    }
}
.saved-bookmarks-manage-presets {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
}

.saved-bookmarks-preset-btn {
    width: 2.1rem;
    height: 2.1rem;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: var(--saved-bookmarks-control-bg);
    border: 1px solid var(--saved-bookmarks-border);
    color: var(--saved-bookmarks-muted);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.saved-bookmarks-preset-btn:hover {
    border-color: var(--saved-bookmarks-accent);
    color: var(--saved-bookmarks-accent);
    transform: translateY(-2px);
}

.saved-bookmarks-preset-btn.is-active {
    background: var(--saved-bookmarks-accent);
    border-color: var(--saved-bookmarks-accent);
    color: #fff;
    box-shadow: 0 4px 12px var(--saved-bookmarks-accent-soft);
}
</style>
