<template>
    <section
        class="saved-playlists-panel"
        :class="{ 'is-dark': darkTheme }"
        role="region"
        aria-labelledby="savedPlaylistsPanelTitle">
        <div class="saved-playlists-panel-head">
            <div class="saved-playlists-panel-heading">
                <span class="saved-playlists-panel-kicker">
                    <i class="fas fa-music" aria-hidden="true"></i>
                    Playlists
                </span>
                <h3 id="savedPlaylistsPanelTitle" class="saved-playlists-panel-title mb-1">
                    Saved audio playlists
                </h3>
                <p class="saved-playlists-panel-subtitle mb-0">
                    {{ summaryText }}
                </p>
            </div>
            <button
                type="button"
                class="btn saved-playlists-close-btn"
                aria-label="Close saved playlists panel"
                @click="$emit('close')">
                <i class="fas fa-times" aria-hidden="true"></i>
            </button>
        </div>

        <div class="saved-playlists-flow" aria-label="Saved playlist steps">
            <div class="saved-playlists-flow-step">
                <span class="saved-playlists-flow-icon">
                    <i class="fas fa-filter" aria-hidden="true"></i>
                </span>
                <div>
                    <strong>1. Filter</strong>
                    <span>Choose All or one playlist.</span>
                </div>
            </div>
            <div class="saved-playlists-flow-step">
                <span class="saved-playlists-flow-icon">
                    <i class="fas fa-sliders-h" aria-hidden="true"></i>
                </span>
                <div>
                    <strong>2. Manage</strong>
                    <span>Create, rename, or remove playlists.</span>
                </div>
            </div>
            <div class="saved-playlists-flow-step">
                <span class="saved-playlists-flow-icon">
                    <i class="fas fa-play" aria-hidden="true"></i>
                </span>
                <div>
                    <strong>3. Listen Or Open</strong>
                    <span>Play audio or reopen any saved verse.</span>
                </div>
            </div>
        </div>

        <div class="saved-playlists-tabs" aria-label="Playlist collections">
            <div
                class="saved-playlists-primary-pills"
                role="group"
                aria-label="Primary playlist tabs">
                <button
                    type="button"
                    class="btn saved-playlists-collection-pill saved-playlists-collection-pill-primary"
                    :class="{ 'is-active': isAllActive && !manageOpen }"
                    @click="handleAllClick">
                    <i class="fas fa-th-large" aria-hidden="true"></i>
                    <span>All</span>
                </button>
                <button
                    type="button"
                    class="btn saved-playlists-collection-pill saved-playlists-collection-pill-primary saved-playlists-collection-manage"
                    :class="{ 'is-active': manageOpen }"
                    @click="openManage">
                    <i class="fas fa-sliders-h" aria-hidden="true"></i>
                    <span>Manage</span>
                </button>
            </div>

            <div
                v-if="playlists.length"
                class="saved-playlists-secondary-pills"
                role="group"
                aria-label="Playlist list">
                <button
                    v-for="playlist in playlists"
                    :key="`playlist-pill-${playlist.id}`"
                    type="button"
                    class="btn saved-playlists-collection-pill"
                    :class="{ 'is-active': !manageOpen && String(activePlaylistId) === String(playlist.id) }"
                    :title="playlist.name"
                    @click="handlePlaylistClick(playlist.id)">
                    <i class="fas fa-headphones-alt" aria-hidden="true"></i>
                    <span class="saved-playlists-collection-pill-title">{{ playlist.name }}</span>
                    <span class="saved-playlists-collection-pill-count">{{ playlist.itemCount || 0 }}</span>
                </button>
            </div>
        </div>

        <div v-if="manageOpen" class="saved-playlists-manage">
            <div class="saved-playlists-manage-head">
                <div>
                    <strong>Manage playlists</strong>
                    <span class="saved-playlists-manage-hint">
                        Deleting a playlist removes that queue and its saved ayahs.
                    </span>
                </div>
                <span class="saved-playlists-manage-count-pill">
                    {{ playlists.length }} playlist{{ playlists.length === 1 ? "" : "s" }}
                </span>
            </div>

            <form class="saved-playlists-manage-create" @submit.prevent="onCreatePlaylist">
                <label class="visually-hidden" for="savedPlaylistsNewCollection">
                    New playlist name
                </label>
                <input
                    id="savedPlaylistsNewCollection"
                    v-model.trim="newPlaylistName"
                    type="text"
                    class="form-control saved-playlists-manage-input"
                    placeholder="Create a new playlist"
                    :disabled="busy"
                    aria-label="New playlist name" />
                <button
                    type="submit"
                    class="btn saved-playlists-icon-btn saved-playlists-icon-btn-primary"
                    :disabled="busy || !newPlaylistName"
                    aria-label="Create playlist">
                    <i class="fas fa-plus" aria-hidden="true"></i>
                </button>
            </form>

            <div v-if="playlists.length" class="saved-playlists-manage-list" role="list">
                <article
                    v-for="playlist in playlists"
                    :key="`manage-playlist-${playlist.id}`"
                    class="saved-playlists-manage-row"
                    :class="{ 'is-pending-delete': pendingPlaylistDeleteId === playlist.id }"
                    role="listitem">
                    <div class="saved-playlists-manage-row-main">
                        <span class="saved-playlists-manage-row-icon" aria-hidden="true">
                            <i class="fas fa-headphones-alt"></i>
                        </span>
                        <div class="saved-playlists-manage-row-copy">
                            <template v-if="editingPlaylistId === playlist.id">
                                <input
                                    v-model.trim="editingPlaylistName"
                                    type="text"
                                    class="form-control saved-playlists-manage-input"
                                    :disabled="busy"
                                    :aria-label="`Rename ${playlist.name}`" />
                            </template>
                            <template v-else>
                                <strong class="saved-playlists-manage-name">{{ playlist.name }}</strong>
                                <span class="saved-playlists-manage-meta">
                                    {{ playlist.itemCount || 0 }} saved
                                </span>
                                <span
                                    v-if="playlist.description"
                                    class="saved-playlists-manage-description">
                                    {{ playlist.description }}
                                </span>
                            </template>
                        </div>
                    </div>
                    <div class="saved-playlists-manage-row-actions">
                        <button
                            v-if="editingPlaylistId !== playlist.id"
                            type="button"
                            class="btn saved-playlists-icon-btn"
                            :disabled="busy"
                            :aria-label="`Rename ${playlist.name}`"
                            @click="beginEdit(playlist)">
                            <i class="fas fa-pen" aria-hidden="true"></i>
                        </button>
                        <button
                            v-else
                            type="button"
                            class="btn saved-playlists-icon-btn saved-playlists-icon-btn-primary"
                            :disabled="busy || !editingPlaylistName"
                            :aria-label="`Save ${playlist.name}`"
                            @click="confirmEdit(playlist)">
                            <i class="fas fa-check" aria-hidden="true"></i>
                        </button>
                        <button
                            v-if="editingPlaylistId === playlist.id"
                            type="button"
                            class="btn saved-playlists-icon-btn"
                            :disabled="busy"
                            aria-label="Cancel rename"
                            @click="cancelEdit">
                            <i class="fas fa-times" aria-hidden="true"></i>
                        </button>
                        <button
                            type="button"
                            class="btn saved-playlists-icon-btn saved-playlists-icon-btn-danger"
                            :disabled="busy"
                            :aria-label="`Delete ${playlist.name}`"
                            @click="requestPlaylistDelete(playlist)">
                            <i class="fas fa-trash-alt" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div
                        v-if="pendingPlaylistDeleteId === playlist.id"
                        class="saved-playlists-manage-confirm">
                        <span>Delete this playlist?</span>
                        <div class="saved-playlists-manage-confirm-actions">
                            <button
                                type="button"
                                class="btn saved-playlists-icon-btn"
                                :disabled="busy"
                                aria-label="Cancel delete"
                                @click="cancelPlaylistDelete">
                                <i class="fas fa-undo-alt" aria-hidden="true"></i>
                            </button>
                            <button
                                type="button"
                                class="btn saved-playlists-icon-btn saved-playlists-icon-btn-danger"
                                :disabled="busy"
                                :aria-label="`Confirm delete ${playlist.name}`"
                                @click="confirmPlaylistDelete(playlist)">
                                <i class="fas fa-check" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </article>
            </div>

            <div v-else class="saved-playlists-manage-empty">
                <i class="fas fa-headphones-alt" aria-hidden="true"></i>
                <span>Create your first playlist to organise saved ayahs beyond All.</span>
            </div>
        </div>

        <div
            v-if="deleteConfirm && deleteConfirm.visible"
            class="alert alert-warning saved-playlists-confirm-alert"
            role="alert">
            <div class="saved-playlists-confirm-copy">
                <strong>Confirm delete</strong>
                <span>{{ deleteConfirm.message }}</span>
            </div>
            <div class="saved-playlists-confirm-actions">
                <button
                    type="button"
                    class="btn saved-playlists-toolbar-btn"
                    :disabled="deleteBusy"
                    @click="$emit('cancel-delete')">
                    <i class="fas fa-times" aria-hidden="true"></i>
                    <span>Cancel</span>
                </button>
                <button
                    type="button"
                    class="btn saved-playlists-toolbar-btn is-danger"
                    :disabled="deleteBusy"
                    @click="$emit('confirm-delete')">
                    <i class="fas fa-trash-alt" aria-hidden="true"></i>
                    <span>{{ deleteBusy ? "Deleting..." : "Delete" }}</span>
                </button>
            </div>
        </div>

        <div v-if="items.length" class="saved-playlists-toolbar">
            <div class="saved-playlists-toolbar-copy">
                <strong>{{ selectedCount }} selected</strong>
                <span>{{ toolbarHint }}</span>
            </div>
            <div class="saved-playlists-toolbar-actions">
                <button
                    type="button"
                    class="btn saved-playlists-toolbar-btn"
                    :disabled="deleteBusy"
                    @click="$emit('toggle-select-all')">
                    <i
                        class="fas"
                        :class="allSelected ? 'fa-times-square' : 'fa-check-square'"
                        aria-hidden="true"></i>
                    <span>{{ allSelected ? "Unselect" : "Select all" }}</span>
                </button>
                <button
                    type="button"
                    class="btn saved-playlists-toolbar-btn"
                    :disabled="!selectedCount || deleteBusy"
                    @click="$emit('clear-selection')">
                    <i class="fas fa-eraser" aria-hidden="true"></i>
                    <span>Clear</span>
                </button>
                <button
                    type="button"
                    class="btn saved-playlists-toolbar-btn is-danger"
                    :disabled="!selectedCount || deleteBusy"
                    @click="$emit('request-bulk-delete')">
                    <i class="fas fa-trash-alt" aria-hidden="true"></i>
                    <span>Delete</span>
                </button>
            </div>
        </div>

        <div v-if="items.length" class="saved-playlists-body">
            <div class="saved-playlists-grid">
                <article
                    v-for="item in items"
                    :key="item.key"
                    class="saved-playlists-card"
                    :class="{
                        'is-selected': selectedKeySet.has(item.key),
                        'is-now-playing': item.isNowPlaying
                    }">
                    <div class="saved-playlists-card-top">
                        <button
                            type="button"
                            class="btn saved-playlists-card-check"
                            :class="{ 'is-selected': selectedKeySet.has(item.key) }"
                            :disabled="deleteBusy"
                            :aria-label="selectedKeySet.has(item.key)
                                ? `Unselect ${item.surahName} ayah ${item.ayahNumber}`
                                : `Select ${item.surahName} ayah ${item.ayahNumber}`"
                            @click="$emit('toggle-selection', item.key)">
                            <span class="saved-playlists-card-check-indicator" aria-hidden="true">
                                <i
                                    v-if="selectedKeySet.has(item.key)"
                                    class="fas fa-check"></i>
                            </span>
                        </button>
                        <div class="saved-playlists-card-top-actions">
                            <select
                                v-if="getMoveOptions(item).length"
                                class="form-select form-select-sm saved-playlists-move-select"
                                :disabled="deleteBusy || busy"
                                :aria-label="`${movePlaceholder} ${item.surahName} ayah ${item.ayahNumber}`"
                                @change="onMoveItem(item.key, $event)">
                                <option value="" selected disabled>{{ movePlaceholder }}</option>
                                <option
                                    v-for="playlist in getMoveOptions(item)"
                                    :key="`move-${item.key}-${playlist.id}`"
                                    :value="playlist.id">
                                    {{ playlist.name }}
                                </option>
                            </select>
                            <button
                                type="button"
                                class="btn saved-playlists-icon-btn saved-playlists-play-btn"
                                :disabled="deleteBusy"
                                :aria-label="item.isNowPlaying ? 'Pause ayah audio' : 'Play ayah audio'"
                                @click="$emit('play-item', item.key)">
                                <i
                                    class="fas"
                                    :class="item.isNowPlaying ? 'fa-pause' : 'fa-play'"
                                    aria-hidden="true"></i>
                            </button>
                            <button
                                v-if="item.canMoveUp"
                                type="button"
                                class="btn saved-playlists-icon-btn"
                                :disabled="deleteBusy || busy"
                                aria-label="Move item up"
                                @click="$emit('move-item-up', item.key)">
                                <i class="fas fa-arrow-up" aria-hidden="true"></i>
                            </button>
                            <button
                                v-if="item.canMoveDown"
                                type="button"
                                class="btn saved-playlists-icon-btn"
                                :disabled="deleteBusy || busy"
                                aria-label="Move item down"
                                @click="$emit('move-item-down', item.key)">
                                <i class="fas fa-arrow-down" aria-hidden="true"></i>
                            </button>
                            <button
                                type="button"
                                class="btn saved-playlists-delete-btn"
                                :disabled="deleteBusy"
                                :aria-label="`Delete ${item.surahName} ayah ${item.ayahNumber}`"
                                @click="$emit('request-delete', item.key)">
                                <i class="fas fa-trash-alt" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>

                    <button
                        type="button"
                        class="saved-playlists-card-link"
                        :disabled="deleteBusy"
                        :aria-label="`Open ${item.surahName} ayah ${item.ayahNumber}`"
                        @click="$emit('open-item', item.key)">
                        <span class="saved-playlists-card-icon" aria-hidden="true">
                            <i class="fas fa-headphones-alt"></i>
                        </span>
                        <span class="saved-playlists-card-copy">
                            <span class="saved-playlists-card-title">{{ item.surahName }}</span>
                            <span class="saved-playlists-card-meta">Ayah {{ item.ayahNumber }}</span>
                            <span v-if="item.addedAtLabel" class="saved-playlists-card-date">
                                {{ item.addedAtLabel }}
                            </span>
                            <span class="saved-playlists-card-tags">
                                <span
                                    v-if="isAllActive && item.playlistName"
                                    class="saved-playlists-card-tag">
                                    {{ item.playlistName }}
                                </span>
                                <span
                                    v-if="item.description"
                                    class="saved-playlists-card-tag is-muted"
                                    :title="item.description">
                                    {{ item.description }}
                                </span>
                                <span
                                    v-if="item.isNowPlaying"
                                    class="saved-playlists-card-tag">
                                    Now playing
                                </span>
                                <span
                                    v-if="!item.description && !item.isNowPlaying && !isAllActive"
                                    class="saved-playlists-card-tag is-muted">
                                    {{ item.refLabel }}
                                </span>
                            </span>
                        </span>
                        <span class="saved-playlists-card-arrow" aria-hidden="true">
                            <i class="fas fa-arrow-up-right-from-square"></i>
                        </span>
                    </button>
                </article>
            </div>
        </div>

        <div v-else class="saved-playlists-empty">
            <span class="saved-playlists-empty-icon" aria-hidden="true">
                <i class="fas fa-music"></i>
            </span>
            <h4 class="saved-playlists-empty-title mb-2">{{ emptyStateTitle }}</h4>
            <p class="saved-playlists-empty-copy mb-0">
                {{ emptyStateCopy }}
            </p>
        </div>
    </section>
</template>

<script>
export default {
    name: "SavedPlaylistsPanel",
    props: {
        playlists: {
            type: Array,
            default: () => [],
        },
        activePlaylistId: {
            type: [String, Number],
            default: "all",
        },
        items: {
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
        "select-playlist",
        "create-playlist",
        "update-playlist",
        "delete-playlist",
        "open-item",
        "play-item",
        "move-item",
        "move-item-up",
        "move-item-down",
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
            newPlaylistName: "",
            newPlaylistDescription: "",
            editingPlaylistId: null,
            editingPlaylistName: "",
            editingPlaylistDescription: "",
            pendingPlaylistDeleteId: null,
        };
    },
    computed: {
        isAllActive() {
            return String(this.activePlaylistId || "all") === "all";
        },
        selectedKeySet() {
            return new Set(Array.isArray(this.selectedKeys) ? this.selectedKeys : []);
        },
        playlistMap() {
            return (Array.isArray(this.playlists) ? this.playlists : []).reduce((map, playlist) => {
                if (playlist?.id) {
                    map[String(playlist.id)] = playlist;
                }
                return map;
            }, {});
        },
        activePlaylistName() {
            if (this.isAllActive) {
                return "All playlists";
            }
            return this.playlistMap[String(this.activePlaylistId)]?.name || "This playlist";
        },
        summaryText() {
            const count = Array.isArray(this.items) ? this.items.length : 0;
            if (!count) {
                return this.isAllActive
                    ? "Keep quick access to the verses you want to replay."
                    : `${this.activePlaylistName} is empty right now.`;
            }
            return this.isAllActive
                ? `${count} saved playlist item${count === 1 ? "" : "s"} ready to play.`
                : `${count} saved verse${count === 1 ? "" : "s"} inside ${this.activePlaylistName}.`;
        },
        toolbarHint() {
            if (this.selectedCount > 0) {
                return "Use the actions on the right to clear or delete the current selection.";
            }
            return "Tap the circle on any card to select several saved verses at once.";
        },
        movePlaceholder() {
            return this.isAllActive ? "Add to..." : "Move to...";
        },
        emptyStateTitle() {
            return this.isAllActive ? "No saved playlist items yet" : `Nothing in ${this.activePlaylistName}`;
        },
        emptyStateCopy() {
            return this.isAllActive
                ? "Save any ayah to a playlist from the reader and it will appear here."
                : "Open a saved verse from All, then move it into this playlist to build a listening queue.";
        },
    },
    watch: {
        activePlaylistId() {
            this.manageOpen = false;
            this.cancelEdit();
            this.cancelPlaylistDelete();
        },
    },
    methods: {
        handleAllClick() {
            this.manageOpen = false;
            this.cancelEdit();
            this.cancelPlaylistDelete();
            this.$emit("select-playlist", "all");
        },
        openManage() {
            this.manageOpen = true;
            this.cancelEdit();
            this.cancelPlaylistDelete();
            this.$nextTick(() => {
                document.getElementById("savedPlaylistsNewCollection")?.focus?.();
            });
        },
        handlePlaylistClick(playlistId) {
            this.manageOpen = false;
            this.cancelEdit();
            this.cancelPlaylistDelete();
            this.$emit("select-playlist", playlistId);
        },
        onCreatePlaylist() {
            const name = (this.newPlaylistName || "").trim();
            if (!name) return;
            this.$emit("create-playlist", {
                name,
                description: (this.newPlaylistDescription || "").trim(),
            });
            this.newPlaylistName = "";
            this.newPlaylistDescription = "";
            this.pendingPlaylistDeleteId = null;
        },
        beginEdit(playlist) {
            this.pendingPlaylistDeleteId = null;
            this.editingPlaylistId = playlist?.id ?? null;
            this.editingPlaylistName = String(playlist?.name || "").trim();
            this.editingPlaylistDescription = String(playlist?.description || "").trim();
        },
        cancelEdit() {
            this.editingPlaylistId = null;
            this.editingPlaylistName = "";
            this.editingPlaylistDescription = "";
        },
        confirmEdit(playlist) {
            const id = String(playlist?.id || "").trim();
            const name = (this.editingPlaylistName || "").trim();
            if (!id || !name) return;
            this.$emit("update-playlist", {
                id,
                name,
                description: (this.editingPlaylistDescription || "").trim(),
            });
            this.cancelEdit();
        },
        requestPlaylistDelete(playlist) {
            this.cancelEdit();
            this.pendingPlaylistDeleteId = playlist?.id ?? null;
        },
        cancelPlaylistDelete() {
            this.pendingPlaylistDeleteId = null;
        },
        confirmPlaylistDelete(playlist) {
            const id = String(playlist?.id || "").trim();
            if (!id) return;
            this.$emit("delete-playlist", { id });
            this.pendingPlaylistDeleteId = null;
        },
        onMoveItem(key, event) {
            const targetPlaylistId = String(event?.target?.value || "").trim();
            if (!targetPlaylistId) return;
            this.$emit("move-item", { key, targetPlaylistId });
            if (event?.target) {
                event.target.value = "";
            }
        },
        getMoveOptions(item) {
            const sourceId = String(item?.playlistId || "");
            return (Array.isArray(this.playlists) ? this.playlists : []).filter(
                (playlist) => String(playlist?.id || "") !== sourceId
            );
        },
    },
};
</script>

<style scoped>
.saved-playlists-panel {
    --saved-playlists-accent: #0f766e;
    --saved-playlists-accent-soft: rgba(15, 118, 110, 0.12);
    --saved-playlists-accent-strong: #115e59;
    --saved-playlists-danger: #b91c1c;
    --saved-playlists-danger-soft: rgba(239, 68, 68, 0.12);
    --saved-playlists-border: rgba(15, 23, 42, 0.1);
    --saved-playlists-surface: rgba(255, 255, 255, 0.97);
    --saved-playlists-surface-alt: rgba(248, 250, 252, 0.95);
    --saved-playlists-card-bg: rgba(255, 255, 255, 0.88);
    --saved-playlists-toolbar-bg: rgba(247, 250, 252, 0.9);
    --saved-playlists-control-bg: rgba(255, 255, 255, 0.96);
    --saved-playlists-warning-bg: #fff7db;
    --saved-playlists-warning-border: rgba(217, 119, 6, 0.24);
    --saved-playlists-text: #0f172a;
    --saved-playlists-muted: #64748b;
    --saved-playlists-ghost-hover: rgba(15, 118, 110, 0.06);
    border: 1px solid var(--saved-playlists-border);
    border-radius: 24px;
    background:
        radial-gradient(circle at top right, rgba(20, 184, 166, 0.12), transparent 28%),
        linear-gradient(180deg, var(--saved-playlists-surface), var(--saved-playlists-surface-alt));
    box-shadow: 0 24px 54px rgba(15, 23, 42, 0.14);
    color: var(--saved-playlists-text);
    padding: 0.9rem;
}

.saved-playlists-panel.is-dark {
    --saved-playlists-accent: #7dd3fc;
    --saved-playlists-accent-soft: rgba(125, 211, 252, 0.14);
    --saved-playlists-accent-strong: #e0f2fe;
    --saved-playlists-danger: #fca5a5;
    --saved-playlists-danger-soft: rgba(248, 113, 113, 0.14);
    --saved-playlists-border: rgba(148, 163, 184, 0.24);
    --saved-playlists-surface: rgba(2, 6, 23, 0.96);
    --saved-playlists-surface-alt: rgba(15, 23, 42, 0.98);
    --saved-playlists-card-bg: rgba(15, 23, 42, 0.88);
    --saved-playlists-toolbar-bg: rgba(15, 23, 42, 0.88);
    --saved-playlists-control-bg: rgba(30, 41, 59, 0.94);
    --saved-playlists-warning-bg: rgba(120, 53, 15, 0.34);
    --saved-playlists-warning-border: rgba(251, 191, 36, 0.28);
    --saved-playlists-text: #f8fafc;
    --saved-playlists-muted: #cbd5e1;
    --saved-playlists-ghost-hover: rgba(125, 211, 252, 0.08);
    box-shadow: 0 26px 58px rgba(2, 6, 23, 0.56);
}

.saved-playlists-panel i[class*="fa"] {
    line-height: 1;
}

.saved-playlists-panel-head,
.saved-playlists-toolbar,
.saved-playlists-confirm-alert,
.saved-playlists-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.saved-playlists-panel-head {
    gap: 0.9rem;
    margin-bottom: 0.8rem;
}

.saved-playlists-panel-heading {
    min-width: 0;
}

.saved-playlists-panel-kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.38rem;
    margin-bottom: 0.3rem;
    padding: 0.18rem 0.54rem;
    border-radius: 999px;
    background: var(--saved-playlists-accent-soft);
    color: var(--saved-playlists-accent);
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.saved-playlists-panel-title {
    font-size: 1.08rem;
    font-weight: 800;
    letter-spacing: -0.02em;
}

.saved-playlists-panel-subtitle {
    color: var(--saved-playlists-muted);
    font-size: 0.84rem;
    line-height: 1.5;
}

.saved-playlists-close-btn,
.saved-playlists-delete-btn,
.saved-playlists-icon-btn,
.saved-playlists-card-check,
.saved-playlists-toolbar-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    border-radius: 999px;
    border: 1px solid var(--saved-playlists-border);
    background: transparent;
    color: var(--saved-playlists-text);
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
}

.saved-playlists-close-btn,
.saved-playlists-delete-btn,
.saved-playlists-card-check,
.saved-playlists-icon-btn {
    width: 1.96rem;
    height: 1.96rem;
    padding: 0;
}

.saved-playlists-toolbar-btn {
    padding: 0.44rem 0.72rem;
    font-size: 0.78rem;
    font-weight: 700;
}

.saved-playlists-close-btn i,
.saved-playlists-delete-btn i,
.saved-playlists-card-check i,
.saved-playlists-icon-btn i {
    font-size: 0.86rem;
}

.saved-playlists-toolbar-btn i {
    font-size: 0.8rem;
}

.saved-playlists-icon-btn:hover,
.saved-playlists-icon-btn:focus-visible,
.saved-playlists-close-btn:hover,
.saved-playlists-close-btn:focus-visible,
.saved-playlists-delete-btn:hover,
.saved-playlists-delete-btn:focus-visible,
.saved-playlists-card-check:hover,
.saved-playlists-card-check:focus-visible,
.saved-playlists-toolbar-btn:hover,
.saved-playlists-toolbar-btn:focus-visible,
.saved-playlists-card-link:hover,
.saved-playlists-card-link:focus-visible,
.saved-playlists-collection-pill:hover,
.saved-playlists-collection-pill:focus-visible {
    border-color: rgba(15, 118, 110, 0.34);
    background: var(--saved-playlists-ghost-hover);
    box-shadow: 0 0 0 0.18rem rgba(15, 118, 110, 0.12);
    transform: translateY(-1px);
}

.saved-playlists-icon-btn-primary,
.saved-playlists-toolbar-btn.is-danger,
.saved-playlists-icon-btn-danger {
    border-color: currentColor;
}

.saved-playlists-icon-btn-primary,
.saved-playlists-play-btn {
    background: transparent;
    color: var(--saved-playlists-accent);
}

.saved-playlists-icon-btn-danger,
.saved-playlists-toolbar-btn.is-danger,
.saved-playlists-delete-btn {
    background: transparent;
    color: var(--saved-playlists-danger);
}

.saved-playlists-panel.is-dark .saved-playlists-delete-btn,
.saved-playlists-panel.is-dark .saved-playlists-toolbar-btn.is-danger,
.saved-playlists-panel.is-dark .saved-playlists-icon-btn-danger {
    color: #fda4af;
}

.saved-playlists-flow {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.55rem;
    margin-bottom: 0.8rem;
}

.saved-playlists-flow-step {
    display: flex;
    align-items: center;
    gap: 0.72rem;
    min-height: 5rem;
    padding: 0.7rem 0.8rem;
    border-radius: 16px;
    border: 1px solid var(--saved-playlists-border);
    background: var(--saved-playlists-card-bg);
}

.saved-playlists-flow-step strong,
.saved-playlists-flow-step span {
    display: block;
}

.saved-playlists-flow-step strong {
    font-size: 0.78rem;
    font-weight: 800;
    line-height: 1.2;
}

.saved-playlists-flow-step span {
    font-size: 0.75rem;
    color: var(--saved-playlists-muted);
    line-height: 1.35;
}

.saved-playlists-flow-icon {
    display: grid;
    place-items: center;
    width: auto;
    height: auto;
    border-radius: 0;
    background: transparent;
    color: var(--saved-playlists-accent);
    flex-shrink: 0;
}

.saved-playlists-tabs {
    display: grid;
    gap: 0.6rem;
    margin-bottom: 0.8rem;
}

.saved-playlists-primary-pills {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.6rem;
}

.saved-playlists-secondary-pills {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding: 0.08rem 0.08rem 0.18rem;
    scrollbar-width: thin;
    scrollbar-color: rgba(100, 116, 139, 0.35) transparent;
}

.saved-playlists-collection-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    flex-shrink: 0;
    padding: 0.44rem 0.74rem;
    border-radius: 999px;
    border: 1px solid var(--saved-playlists-border);
    background: var(--saved-playlists-control-bg);
    color: var(--saved-playlists-text);
    font-size: 0.78rem;
    font-weight: 800;
    line-height: 1.1;
    white-space: nowrap;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}

.saved-playlists-collection-pill-primary {
    justify-content: center;
    min-height: 3rem;
    padding: 0.68rem 0.95rem;
    font-size: 0.94rem;
    font-weight: 800;
    border-width: 1.5px;
    box-shadow: 0 12px 26px rgba(15, 23, 42, 0.08);
}

.saved-playlists-collection-pill-primary i {
    font-size: 1rem;
}

.saved-playlists-collection-pill-primary.is-active {
    border-color: rgba(15, 118, 110, 0.82);
    background: linear-gradient(135deg, rgba(15, 118, 110, 0.18), rgba(15, 118, 110, 0.08));
    color: var(--saved-playlists-accent-strong);
    box-shadow:
        0 18px 32px rgba(15, 118, 110, 0.2),
        0 0 0 0.18rem rgba(15, 118, 110, 0.12);
}

.saved-playlists-panel.is-dark .saved-playlists-collection-pill-primary {
    background: linear-gradient(180deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.98));
    border-color: rgba(125, 211, 252, 0.18);
    color: #f8fafc;
    box-shadow: 0 14px 30px rgba(2, 6, 23, 0.38);
}

.saved-playlists-panel.is-dark .saved-playlists-collection-pill-primary.is-active {
    border-color: rgba(125, 211, 252, 0.9);
    background: linear-gradient(135deg, rgba(125, 211, 252, 0.24), rgba(56, 189, 248, 0.12));
    color: #f8fafc;
    box-shadow:
        0 18px 36px rgba(56, 189, 248, 0.22),
        0 0 0 0.2rem rgba(125, 211, 252, 0.14);
}

.saved-playlists-collection-pill.is-active {
    border-color: rgba(15, 118, 110, 0.7);
    background: linear-gradient(135deg, rgba(15, 118, 110, 0.16), rgba(15, 118, 110, 0.08));
    color: var(--saved-playlists-accent-strong);
    box-shadow:
        0 10px 22px rgba(15, 118, 110, 0.14),
        inset 0 0 0 1px rgba(15, 118, 110, 0.12);
}

.saved-playlists-panel.is-dark .saved-playlists-collection-pill.is-active {
    border-color: rgba(125, 211, 252, 0.82);
    background: linear-gradient(135deg, rgba(125, 211, 252, 0.2), rgba(125, 211, 252, 0.08));
    color: #f8fafc;
    box-shadow:
        0 12px 28px rgba(56, 189, 248, 0.18),
        inset 0 0 0 1px rgba(125, 211, 252, 0.14);
}

.saved-playlists-collection-pill-title {
    max-width: 8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.saved-playlists-collection-pill-count,
.saved-playlists-manage-count-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.5rem;
    height: 1.5rem;
    padding: 0 0.38rem;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.08);
    color: var(--saved-playlists-muted);
    font-size: 0.72rem;
    font-weight: 800;
}

.saved-playlists-panel.is-dark .saved-playlists-collection-pill-count,
.saved-playlists-panel.is-dark .saved-playlists-manage-count-pill {
    background: rgba(248, 250, 252, 0.08);
}

.saved-playlists-manage {
    margin-bottom: 0.8rem;
    padding: 0.8rem;
    border-radius: 18px;
    border: 1px solid var(--saved-playlists-border);
    background: var(--saved-playlists-toolbar-bg);
}

.saved-playlists-manage-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.65rem;
}

.saved-playlists-manage-head strong,
.saved-playlists-manage-hint,
.saved-playlists-manage-description {
    display: block;
}

.saved-playlists-manage-hint,
.saved-playlists-manage-description {
    margin-top: 0.18rem;
    color: var(--saved-playlists-muted);
    font-size: 0.78rem;
    line-height: 1.45;
}

.saved-playlists-manage-create {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.65rem;
}

.saved-playlists-manage-input,
.saved-playlists-move-select {
    border-radius: 999px;
    border: 1px solid var(--saved-playlists-border);
    background: var(--saved-playlists-control-bg);
    color: var(--saved-playlists-text);
}

.saved-playlists-manage-input {
    font-size: 0.84rem;
    padding: 0.52rem 0.8rem;
}

.saved-playlists-manage-list {
    display: grid;
    gap: 0.5rem;
    max-height: min(34vh, 21rem);
    overflow-y: auto;
    padding-right: 0.12rem;
}

.saved-playlists-manage-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.75rem;
    padding: 0.64rem 0.7rem;
    border-radius: 15px;
    border: 1px solid var(--saved-playlists-border);
    background: var(--saved-playlists-card-bg);
}

.saved-playlists-manage-row.is-pending-delete {
    border-color: rgba(239, 68, 68, 0.26);
    background: var(--saved-playlists-danger-soft);
}

.saved-playlists-manage-row-main {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    min-width: 0;
}

.saved-playlists-manage-row-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
    border-radius: 0;
    background: transparent;
    color: var(--saved-playlists-accent);
    flex-shrink: 0;
}

.saved-playlists-manage-row-copy {
    min-width: 0;
}

.saved-playlists-manage-name,
.saved-playlists-manage-meta {
    display: block;
}

.saved-playlists-manage-name {
    font-size: 0.84rem;
    font-weight: 800;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.saved-playlists-manage-meta {
    margin-top: 0.12rem;
    color: var(--saved-playlists-muted);
    font-size: 0.74rem;
}

.saved-playlists-manage-row-actions,
.saved-playlists-manage-confirm-actions,
.saved-playlists-toolbar-actions,
.saved-playlists-confirm-actions,
.saved-playlists-card-top-actions {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
}

.saved-playlists-manage-confirm {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding-top: 0.1rem;
    color: var(--saved-playlists-muted);
    font-size: 0.78rem;
}

.saved-playlists-manage-empty {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.9rem;
    border-radius: 16px;
    border: 1px dashed var(--saved-playlists-border);
    color: var(--saved-playlists-muted);
    background: var(--saved-playlists-card-bg);
}

.saved-playlists-confirm-alert,
.saved-playlists-toolbar {
    gap: 0.8rem;
    flex-wrap: wrap;
    margin-bottom: 0.85rem;
    padding: 0.78rem 0.88rem;
    border-radius: 16px;
    border: 1px solid var(--saved-playlists-border);
}

.saved-playlists-confirm-alert {
    background: var(--saved-playlists-warning-bg);
    border-color: var(--saved-playlists-warning-border);
    color: var(--saved-playlists-text);
}

.saved-playlists-toolbar {
    background: var(--saved-playlists-toolbar-bg);
}

.saved-playlists-confirm-copy,
.saved-playlists-toolbar-copy {
    display: flex;
    flex-direction: column;
    gap: 0.12rem;
    font-size: 0.82rem;
}

.saved-playlists-confirm-copy span,
.saved-playlists-toolbar-copy span {
    color: var(--saved-playlists-muted);
    line-height: 1.45;
}

.saved-playlists-body {
    max-height: min(42vh, 26rem);
    overflow: hidden;
}

.saved-playlists-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.7rem;
    max-height: inherit;
    overflow-y: auto;
    padding-right: 0.1rem;
}

.saved-playlists-card {
    display: flex;
    flex-direction: column;
    gap: 0.64rem;
    padding: 0.74rem;
    border-radius: 16px;
    border: 1px solid var(--saved-playlists-border);
    background: var(--saved-playlists-card-bg);
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.saved-playlists-card:hover {
    border-color: rgba(15, 118, 110, 0.18);
    box-shadow: 0 18px 34px rgba(15, 23, 42, 0.08);
}

.saved-playlists-card.is-selected {
    border-color: rgba(14, 165, 233, 0.48);
    box-shadow: 0 14px 28px rgba(14, 165, 233, 0.12);
}

.saved-playlists-card.is-now-playing {
    border-color: rgba(15, 118, 110, 0.42);
    box-shadow: 0 14px 28px rgba(15, 118, 110, 0.12);
}

.saved-playlists-card-check {
    padding: 0;
}

.saved-playlists-card-check-indicator {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.05rem;
    height: 1.05rem;
    border-radius: 999px;
    border: 2px solid currentColor;
    color: var(--saved-playlists-muted);
}

.saved-playlists-card-check.is-selected {
    color: var(--saved-playlists-accent);
    border-color: rgba(15, 118, 110, 0.44);
    background: rgba(15, 118, 110, 0.08);
}

.saved-playlists-card-check.is-selected .saved-playlists-card-check-indicator {
    background: currentColor;
    border-color: currentColor;
    color: #fff;
}

.saved-playlists-card-check.is-selected .saved-playlists-card-check-indicator i {
    font-size: 0.56rem;
}

.saved-playlists-move-select {
    min-width: 7.75rem;
    font-size: 0.76rem;
    padding: 0.36rem 0.68rem;
    box-shadow: none;
}

.saved-playlists-card-top {
    gap: 0.7rem;
    align-items: center;
}

.saved-playlists-card-top-actions {
    display: grid;
    grid-template-columns: minmax(0, 1fr) repeat(4, auto);
    align-items: center;
    gap: 0.42rem;
    margin-left: auto;
    min-width: 0;
}

.saved-playlists-card-top-actions .saved-playlists-delete-btn {
    justify-self: end;
}

.saved-playlists-card-top-actions .saved-playlists-move-select {
    min-width: 0;
    width: 100%;
}

.saved-playlists-play-btn {
    color: var(--saved-playlists-accent);
}

.saved-playlists-card-link {
    display: flex;
    align-items: flex-start;
    gap: 0.62rem;
    width: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    text-align: left;
}

.saved-playlists-card-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
    flex-shrink: 0;
    border-radius: 0;
    background: transparent;
    color: var(--saved-playlists-accent);
    font-size: 0.94rem;
}

.saved-playlists-card-copy {
    display: flex;
    flex-direction: column;
    gap: 0.14rem;
    min-width: 0;
    flex: 1 1 auto;
}

.saved-playlists-card-title {
    font-weight: 800;
    font-size: 0.92rem;
    line-height: 1.3;
}

.saved-playlists-card-meta,
.saved-playlists-card-date {
    font-size: 0.75rem;
    color: var(--saved-playlists-muted);
}

.saved-playlists-card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: 0.28rem;
}

.saved-playlists-card-tag {
    display: inline-flex;
    align-items: center;
    padding: 0.18rem 0.52rem;
    border-radius: 999px;
    background: var(--saved-playlists-accent-soft);
    color: var(--saved-playlists-accent-strong);
    font-size: 0.68rem;
    font-weight: 700;
}

.saved-playlists-card-tag.is-muted {
    background: rgba(148, 163, 184, 0.14);
    color: var(--saved-playlists-muted);
}

.saved-playlists-card-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    color: var(--saved-playlists-muted);
    font-size: 0.82rem;
}

.saved-playlists-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 2rem 1rem;
    text-align: center;
    border: 1px dashed var(--saved-playlists-border);
    border-radius: 18px;
}

.saved-playlists-empty-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
    border-radius: 0;
    background: transparent;
    color: var(--saved-playlists-accent);
    font-size: 1.08rem;
}

.saved-playlists-empty-title {
    font-size: 0.96rem;
    font-weight: 800;
}

.saved-playlists-empty-copy {
    color: var(--saved-playlists-muted);
    font-size: 0.84rem;
    line-height: 1.5;
    max-width: 34rem;
}

@media (max-width: 991.98px) {
    .saved-playlists-panel {
        padding: 0.84rem;
    }

    .saved-playlists-flow {
        grid-template-columns: 1fr;
    }

    .saved-playlists-manage-list,
    .saved-playlists-body {
        max-height: none;
    }
}

@media (max-width: 767.98px) {
    .saved-playlists-panel-head,
    .saved-playlists-toolbar,
    .saved-playlists-confirm-alert,
    .saved-playlists-manage-head,
    .saved-playlists-manage-confirm,
    .saved-playlists-card-top {
        align-items: flex-start;
    }

    .saved-playlists-panel {
        border-radius: 20px;
        padding: 0.8rem;
    }

    .saved-playlists-tabs {
        gap: 0.62rem;
    }

    .saved-playlists-primary-pills {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .saved-playlists-secondary-pills {
        margin-inline: -0.08rem;
        padding-inline: 0.08rem;
    }

    .saved-playlists-grid {
        grid-template-columns: minmax(0, 1fr);
        max-height: none;
        overflow: visible;
    }

    .saved-playlists-card,
    .saved-playlists-manage-row {
        padding: 0.74rem;
    }

    .saved-playlists-close-btn,
    .saved-playlists-delete-btn,
    .saved-playlists-card-check,
    .saved-playlists-icon-btn {
        width: 1.82rem;
        height: 1.82rem;
    }

    .saved-playlists-toolbar-btn {
        padding: 0.4rem 0.62rem;
    }

    .saved-playlists-card-top,
    .saved-playlists-manage-row {
        grid-template-columns: 1fr;
    }

    .saved-playlists-card-top-actions,
    .saved-playlists-toolbar-actions,
    .saved-playlists-confirm-actions,
    .saved-playlists-manage-row-actions,
    .saved-playlists-manage-confirm-actions {
        width: 100%;
        flex-wrap: wrap;
    }

    .saved-playlists-card-top-actions {
        display: grid;
        grid-template-columns: repeat(4, auto);
        justify-content: start;
        margin-left: 0;
    }

    .saved-playlists-card-top-actions .saved-playlists-move-select {
        grid-column: 1 / -1;
    }

    .saved-playlists-toolbar-btn,
    .saved-playlists-move-select {
        flex: 1 1 auto;
    }

    .saved-playlists-manage-create {
        flex-wrap: wrap;
    }

    .saved-playlists-manage-create .saved-playlists-manage-input {
        width: 100%;
    }

    .saved-playlists-collection-pill {
        min-height: 2.7rem;
    }

    .saved-playlists-collection-pill-primary {
        min-height: 2.9rem;
        font-size: 0.88rem;
    }

    .saved-playlists-flow-step {
        min-height: auto;
        padding: 0.64rem 0.72rem;
    }

    .saved-playlists-manage {
        padding: 0.72rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    .saved-playlists-close-btn,
    .saved-playlists-delete-btn,
    .saved-playlists-icon-btn,
    .saved-playlists-card-check,
    .saved-playlists-toolbar-btn,
    .saved-playlists-card,
    .saved-playlists-card-link,
    .saved-playlists-collection-pill {
        transition: none;
    }
}
</style>
