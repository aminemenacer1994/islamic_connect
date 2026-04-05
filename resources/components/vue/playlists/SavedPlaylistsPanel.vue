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
            <span class="saved-playlists-flow-step">
                <span class="saved-playlists-flow-icon">
                    <i class="fas fa-filter" aria-hidden="true"></i>
                </span>
                <strong>Filter</strong>
                <span>Pick a playlist</span>
            </span>
            <span class="saved-playlists-flow-step">
                <span class="saved-playlists-flow-icon">
                    <i class="fas fa-sliders-h" aria-hidden="true"></i>
                </span>
                <strong>Manage</strong>
                <span>Edit collections</span>
            </span>
            <span class="saved-playlists-flow-step">
                <span class="saved-playlists-flow-icon">
                    <i class="fas fa-play-circle" aria-hidden="true"></i>
                </span>
                <strong>Actions</strong>
                <span>Open, play, move</span>
            </span>
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
                aria-label="Saved playlists list">
                <button
                    v-for="playlist in playlists"
                    :key="`playlist-pill-${playlist.id}`"
                    type="button"
                    class="btn saved-playlists-collection-pill"
                    :class="{ 'is-active': !manageOpen && String(activePlaylistId) === String(playlist.id) }"
                    :title="playlist.name"
                    @click="handlePlaylistClick(playlist.id)">
                    <i class="fas fa-compact-disc" aria-hidden="true"></i>
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
                        Edit playlist names and notes here. Removing a playlist deletes its saved ayahs from that queue.
                    </span>
                </div>
                <span class="saved-playlists-manage-count-pill">
                    {{ playlists.length }} playlist{{ playlists.length === 1 ? "" : "s" }}
                </span>
            </div>

            <form class="saved-playlists-manage-create" @submit.prevent="onCreatePlaylist">
                <input
                    id="savedPlaylistsNewCollection"
                    v-model.trim="newPlaylistName"
                    type="text"
                    class="form-control saved-playlists-manage-input"
                    placeholder="Create a new playlist"
                    :disabled="busy"
                    aria-label="New playlist name" />
                <input
                    v-model.trim="newPlaylistDescription"
                    type="text"
                    class="form-control saved-playlists-manage-input"
                    placeholder="Optional description"
                    :disabled="busy"
                    aria-label="New playlist description" />
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
                            <i class="fas fa-music"></i>
                        </span>
                        <div class="saved-playlists-manage-row-copy">
                            <template v-if="editingPlaylistId === playlist.id">
                                <div class="saved-playlists-manage-edit-grid">
                                    <input
                                        v-model.trim="editingPlaylistName"
                                        type="text"
                                        class="form-control saved-playlists-manage-input"
                                        :disabled="busy"
                                        :aria-label="`Rename ${playlist.name}`" />
                                    <input
                                        v-model.trim="editingPlaylistDescription"
                                        type="text"
                                        class="form-control saved-playlists-manage-input"
                                        :disabled="busy"
                                        :aria-label="`Update description for ${playlist.name}`" />
                                </div>
                            </template>
                            <template v-else>
                                <strong class="saved-playlists-manage-name">{{ playlist.name }}</strong>
                                <span class="saved-playlists-manage-meta">
                                    {{ playlist.itemCount || 0 }} ayah{{ (playlist.itemCount || 0) === 1 ? "" : "s" }}
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
                <i class="fas fa-music" aria-hidden="true"></i>
                <span>Create your first playlist to start building audio queues.</span>
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
                    aria-label="Cancel delete"
                    title="Cancel delete"
                    @click="$emit('cancel-delete')">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
                <button
                    type="button"
                    class="btn saved-playlists-toolbar-btn is-danger"
                    :disabled="deleteBusy"
                    aria-label="Confirm delete"
                    :title="deleteBusy ? 'Deleting' : 'Confirm delete'"
                    @click="$emit('confirm-delete')">
                    <i
                        class="fas"
                        :class="deleteBusy ? 'fa-spinner fa-spin' : 'fa-trash-alt'"
                        aria-hidden="true"></i>
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
                    :aria-label="allSelected ? 'Unselect all' : 'Select all'"
                    :title="allSelected ? 'Unselect all' : 'Select all'"
                    @click="$emit('toggle-select-all')">
                    <i
                        class="fas"
                        :class="allSelected ? 'fa-times-circle' : 'fa-check-double'"
                        aria-hidden="true"></i>
                </button>
                <button
                    type="button"
                    class="btn saved-playlists-toolbar-btn"
                    :disabled="!selectedCount || deleteBusy"
                    aria-label="Clear selection"
                    title="Clear selection"
                    @click="$emit('clear-selection')">
                    <i class="fas fa-eraser" aria-hidden="true"></i>
                </button>
                <button
                    type="button"
                    class="btn saved-playlists-toolbar-btn is-danger"
                    :disabled="!selectedCount || deleteBusy"
                    aria-label="Delete selected verses"
                    title="Delete selected verses"
                    @click="$emit('request-bulk-delete')">
                    <i class="fas fa-trash-alt" aria-hidden="true"></i>
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
                    <div class="saved-playlists-card-row saved-playlists-card-row-main">
                        <button
                            type="button"
                            class="btn saved-playlists-card-check"
                            :class="{ 'is-selected': selectedKeySet.has(item.key) }"
                            :disabled="deleteBusy"
                            :aria-label="selectedKeySet.has(item.key)
                                ? `Unselect ${item.surahName} ayah ${item.ayahNumber}`
                                : `Select ${item.surahName} ayah ${item.ayahNumber}`"
                            @click="$emit('toggle-selection', item.key)">
                            <i
                                class="fas"
                                :class="selectedKeySet.has(item.key) ? 'fa-check' : 'fa-plus'"
                                aria-hidden="true"></i>
                        </button>
                        <button
                            type="button"
                            class="saved-playlists-card-main"
                            :disabled="deleteBusy"
                            :aria-label="`Open ${item.surahName} ayah ${item.ayahNumber}`"
                            @click="$emit('open-item', item.key)">
                            <div class="saved-playlists-card-copy">
                                <span class="saved-playlists-card-title-row">
                                    <span class="saved-playlists-card-title">
                                        {{ item.surahName }}
                                    </span>
                                    <span v-if="item.isNowPlaying" class="saved-playlists-card-live-pill">
                                        Now playing
                                    </span>
                                </span>
                                <span class="saved-playlists-card-meta-row">
                                    <span class="saved-playlists-card-meta">
                                        Ayah {{ item.ayahNumber }}
                                    </span>
                                    <span
                                        v-if="item.addedAtLabel"
                                        class="saved-playlists-card-meta-separator"
                                        aria-hidden="true"></span>
                                    <span v-if="item.addedAtLabel" class="saved-playlists-card-date">
                                        {{ item.addedAtLabel }}
                                    </span>
                                </span>
                                <span
                                    v-if="item.arabicName"
                                    class="saved-playlists-card-arabic"
                                    dir="rtl">
                                    {{ item.arabicName }}
                                </span>
                            </div>
                        </button>
                        <div class="saved-playlists-card-badges">
                            <span class="saved-playlists-card-chip">
                                <i class="fas fa-music" aria-hidden="true"></i>
                                {{ item.playlistName }}
                            </span>
                            <span class="saved-playlists-card-ref">
                                {{ item.refLabel }}
                            </span>
                        </div>
                    </div>

                    <div class="saved-playlists-card-row saved-playlists-card-row-actions">
                        <span
                            v-if="item.description"
                            class="saved-playlists-card-tag is-muted"
                            :title="item.description">
                            {{ item.description }}
                        </span>
                        <div class="saved-playlists-card-actions">
                            <label
                                v-if="getMoveOptions(item).length"
                                class="btn saved-playlists-icon-btn saved-playlists-move-icon"
                                :aria-label="`Move ${item.surahName} ayah ${item.ayahNumber} to another playlist`"
                                :title="`Move ${item.surahName} ayah ${item.ayahNumber}`">
                                <i class="fas fa-exchange-alt" aria-hidden="true"></i>
                                <select
                                    class="form-select form-select-sm saved-playlists-move-select"
                                    :disabled="deleteBusy || busy"
                                    :aria-label="`Move ${item.surahName} ayah ${item.ayahNumber} to another playlist`"
                                    @change="onMoveItem(item.key, $event)">
                                    <option value="" selected disabled>Select destination playlist</option>
                                    <option
                                        v-for="playlist in getMoveOptions(item)"
                                        :key="`move-${item.key}-${playlist.id}`"
                                        :value="playlist.id">
                                        {{ playlist.name }}
                                    </option>
                                </select>
                            </label>
                            <button
                                type="button"
                                class="btn saved-playlists-icon-btn"
                                :disabled="deleteBusy"
                                :aria-label="`Open ${item.surahName} ayah ${item.ayahNumber}`"
                                title="Open verse"
                                @click="$emit('open-item', item.key)">
                                <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
                            </button>
                            <button
                                type="button"
                                class="btn saved-playlists-play-btn"
                                :disabled="deleteBusy"
                                :aria-label="item.isNowPlaying ? 'Pause ayah audio' : 'Play ayah audio'"
                                :title="item.isNowPlaying ? 'Pause ayah audio' : 'Play ayah audio'"
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
                                title="Move up"
                                @click="$emit('move-item-up', item.key)">
                                <i class="fas fa-arrow-up" aria-hidden="true"></i>
                            </button>
                            <button
                                v-if="item.canMoveDown"
                                type="button"
                                class="btn saved-playlists-icon-btn"
                                :disabled="deleteBusy || busy"
                                aria-label="Move item down"
                                title="Move down"
                                @click="$emit('move-item-down', item.key)">
                                <i class="fas fa-arrow-down" aria-hidden="true"></i>
                            </button>
                            <button
                                type="button"
                                class="btn saved-playlists-delete-btn"
                                :disabled="deleteBusy"
                                :aria-label="`Delete ${item.surahName} ayah ${item.ayahNumber}`"
                                title="Delete verse"
                                @click="$emit('request-delete', item.key)">
                                <i class="fas fa-trash-alt" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
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
                    ? "Keep your listening queues organised and ready to play."
                    : `${this.activePlaylistName} is empty right now.`;
            }
            return this.isAllActive
                ? `${count} saved playlist item${count === 1 ? "" : "s"} ready to play.`
                : `${count} ayah${count === 1 ? "" : "s"} inside ${this.activePlaylistName}.`;
        },
        toolbarHint() {
            if (this.selectedCount > 0) {
                return "Use the actions on the right to clear or delete the current selection.";
            }
            return "Use the side icons to open, play, move, reorder, or delete a saved ayah.";
        },
        emptyStateTitle() {
            return this.isAllActive ? "No playlist items yet" : `Nothing in ${this.activePlaylistName}`;
        },
        emptyStateCopy() {
            return this.isAllActive
                ? "Save any ayah to a playlist from the reader actions and it will appear here."
                : "Open ayah actions in the reader and save verses into this playlist to build a listening queue.";
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
    border: 1px solid var(--saved-playlists-border);
    border-radius: 22px;
    background:
        radial-gradient(circle at top right, rgba(20, 184, 166, 0.12), transparent 28%),
        linear-gradient(180deg, var(--saved-playlists-surface), var(--saved-playlists-surface-alt));
    box-shadow: 0 24px 54px rgba(15, 23, 42, 0.14);
    color: var(--saved-playlists-text);
    display: grid;
    grid-template-rows: auto auto auto auto minmax(0, 1fr);
    gap: 1.18rem;
    max-height: min(820px, calc(100dvh - 2rem));
    overflow: hidden;
    padding: 1.28rem;
}

.saved-playlists-panel.is-dark {
    --saved-playlists-accent: #38bdf8;
    --saved-playlists-accent-soft: rgba(125, 211, 252, 0.14);
    --saved-playlists-accent-strong: #e0f2fe;
    --saved-playlists-danger: #fca5a5;
    --saved-playlists-danger-soft: rgba(248, 113, 113, 0.14);
    --saved-playlists-border: rgba(148, 163, 184, 0.18);
    --saved-playlists-surface: rgba(8, 13, 24, 0.97);
    --saved-playlists-surface-alt: rgba(15, 23, 42, 0.99);
    --saved-playlists-card-bg: rgba(17, 24, 39, 0.88);
    --saved-playlists-toolbar-bg: rgba(20, 28, 45, 0.9);
    --saved-playlists-control-bg: rgba(30, 41, 59, 0.84);
    --saved-playlists-warning-bg: rgba(120, 53, 15, 0.34);
    --saved-playlists-warning-border: rgba(251, 191, 36, 0.28);
    --saved-playlists-text: #f8fafc;
    --saved-playlists-muted: #94a3b8;
    box-shadow: 0 26px 58px rgba(2, 6, 23, 0.56);
}

.saved-playlists-panel-head,
.saved-playlists-toolbar,
.saved-playlists-confirm-alert {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.saved-playlists-panel-head {
    gap: 1rem;
    align-items: flex-start;
    padding-bottom: 0.1rem;
}

.saved-playlists-panel-heading {
    min-width: 0;
    display: grid;
    gap: 0.2rem;
}

.saved-playlists-panel-kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.38rem;
    margin-bottom: 0.22rem;
    padding: 0;
    border-radius: 0;
    background: transparent;
    color: var(--saved-playlists-accent);
    font-size: 0.64rem;
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
    font-size: 0.82rem;
    line-height: 1.42;
    max-width: 34rem;
}

.saved-playlists-panel i[class*="fa"] {
    line-height: 1;
}

.saved-playlists-close-btn,
.saved-playlists-delete-btn,
.saved-playlists-icon-btn,
.saved-playlists-card-check,
.saved-playlists-toolbar-btn,
.saved-playlists-play-btn {
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
    width: 1.95rem;
    height: 1.95rem;
    padding: 0;
}

.saved-playlists-play-btn {
    width: 2.05rem;
    height: 2.05rem;
    padding: 0;
    border-color: rgba(15, 118, 110, 0.18);
    background: transparent;
    color: var(--saved-playlists-accent);
    box-shadow: none;
}

.saved-playlists-toolbar-btn {
    width: 1.95rem;
    height: 1.95rem;
    padding: 0;
    font-size: 0.82rem;
}

.saved-playlists-icon-btn i,
.saved-playlists-close-btn i,
.saved-playlists-delete-btn i,
.saved-playlists-card-check i,
.saved-playlists-toolbar-btn i {
    font-size: 0.82rem;
}

.saved-playlists-play-btn i {
    font-size: 0.88rem;
}

.saved-playlists-card-check {
    color: var(--saved-playlists-muted);
}

.saved-playlists-card-check i {
    font-size: 0.72rem;
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
.saved-playlists-card-main:hover,
.saved-playlists-card-main:focus-visible,
.saved-playlists-collection-pill:hover,
.saved-playlists-collection-pill:focus-visible,
.saved-playlists-play-btn:hover,
.saved-playlists-play-btn:focus-visible {
    border-color: rgba(15, 118, 110, 0.34);
    box-shadow: 0 0 0 0.18rem rgba(15, 118, 110, 0.12);
    transform: translateY(-1px);
}

.saved-playlists-icon-btn-primary,
.saved-playlists-toolbar-btn.is-danger,
.saved-playlists-icon-btn-danger {
    border-color: currentColor;
}

.saved-playlists-icon-btn-primary {
    color: var(--saved-playlists-accent);
}

.saved-playlists-icon-btn-danger,
.saved-playlists-toolbar-btn.is-danger,
.saved-playlists-delete-btn {
    background: transparent;
    color: var(--saved-playlists-danger);
    border-color: currentColor;
}

.saved-playlists-card-check.is-selected,
.saved-playlists-play-btn,
.saved-playlists-icon-btn-primary {
    color: var(--saved-playlists-accent);
}

.saved-playlists-card-check.is-selected {
    border-color: rgba(15, 118, 110, 0.24);
}

.saved-playlists-panel.is-dark .saved-playlists-delete-btn,
.saved-playlists-panel.is-dark .saved-playlists-toolbar-btn.is-danger,
.saved-playlists-panel.is-dark .saved-playlists-icon-btn-danger {
    color: #fda4af;
}

.saved-playlists-toolbar,
.saved-playlists-confirm-alert,
.saved-playlists-manage {
    margin-bottom: 0;
}

.saved-playlists-flow {
    display: flex;
    align-items: center;
    gap: 0.56rem;
    flex-wrap: wrap;
    padding-top: 0.1rem;
}

.saved-playlists-flow-step {
    display: inline-flex;
    align-items: center;
    gap: 0.38rem;
    min-width: 0;
    padding: 0.42rem 0.68rem;
    border-radius: 999px;
    border: 1px solid var(--saved-playlists-border);
    background: rgba(255, 255, 255, 0.56);
    color: var(--saved-playlists-text);
    white-space: nowrap;
}

.saved-playlists-panel.is-dark .saved-playlists-flow-step {
    background: rgba(30, 41, 59, 0.74);
    border-color: rgba(148, 163, 184, 0.14);
}

.saved-playlists-flow-step strong,
.saved-playlists-flow-step span {
    display: inline;
}

.saved-playlists-flow-step strong {
    font-size: 0.69rem;
    font-weight: 800;
    line-height: 1;
}

.saved-playlists-flow-step span {
    color: var(--saved-playlists-muted);
    font-size: 0.64rem;
    line-height: 1;
}

.saved-playlists-flow-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
    border-radius: 0;
    background: transparent;
    color: var(--saved-playlists-accent);
    flex-shrink: 0;
    font-size: 0.66rem;
}

.saved-playlists-tabs {
    display: grid;
    gap: 1rem;
}

.saved-playlists-primary-pills {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, max-content));
    gap: 0.78rem;
}

.saved-playlists-secondary-pills {
    display: flex;
    gap: 0.78rem;
    overflow-x: auto;
    padding: 0.12rem 0 0.22rem;
    scrollbar-width: thin;
}

.saved-playlists-collection-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    min-height: 2.2rem;
    padding: 0.38rem 0.68rem;
    border-radius: 999px;
    border: 1px solid var(--saved-playlists-border);
    background: var(--saved-playlists-control-bg);
    color: var(--saved-playlists-text);
    font-size: 0.76rem;
    font-weight: 700;
    white-space: nowrap;
}

.saved-playlists-collection-pill-primary {
    min-height: 2.4rem;
    padding-inline: 0.82rem;
}

.saved-playlists-collection-pill-primary.is-active,
.saved-playlists-collection-pill.is-active {
    border-color: transparent;
    background: linear-gradient(135deg, #0f766e, #115e59);
    color: #fff;
    box-shadow: 0 14px 26px rgba(15, 118, 110, 0.18);
}

.saved-playlists-collection-pill.is-active .saved-playlists-collection-pill-count,
.saved-playlists-collection-pill-primary.is-active .saved-playlists-collection-pill-count {
    background: rgba(255, 255, 255, 0.18);
    color: #fff;
}

.saved-playlists-panel.is-dark .saved-playlists-collection-pill-primary.is-active,
.saved-playlists-panel.is-dark .saved-playlists-collection-pill.is-active {
    background: linear-gradient(135deg, #0ea5e9, #0369a1);
    box-shadow: 0 14px 26px rgba(14, 165, 233, 0.18);
}

.saved-playlists-panel.is-dark .saved-playlists-collection-pill.is-active .saved-playlists-collection-pill-count,
.saved-playlists-panel.is-dark .saved-playlists-collection-pill-primary.is-active .saved-playlists-collection-pill-count {
    background: rgba(255, 255, 255, 0.18);
    color: #fff;
}

.saved-playlists-collection-pill-title {
    overflow: hidden;
    text-overflow: ellipsis;
}

.saved-playlists-collection-pill-count,
.saved-playlists-manage-count-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.55rem;
    min-height: 1.55rem;
    padding: 0 0.4rem;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.08);
    color: var(--saved-playlists-muted);
    font-size: 0.7rem;
    font-weight: 800;
}

.saved-playlists-panel.is-dark .saved-playlists-collection-pill-count,
.saved-playlists-panel.is-dark .saved-playlists-manage-count-pill {
    background: rgba(148, 163, 184, 0.16);
    color: var(--saved-playlists-accent-strong);
}

.saved-playlists-manage {
    display: grid;
    gap: 0.9rem;
    padding: 0.9rem;
    border: 1px solid var(--saved-playlists-border);
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.56);
    overflow: auto;
}

.saved-playlists-panel.is-dark .saved-playlists-manage {
    background: rgba(15, 23, 42, 0.52);
}

.saved-playlists-manage-head,
.saved-playlists-manage-row,
.saved-playlists-manage-confirm {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.85rem;
}

.saved-playlists-manage-hint,
.saved-playlists-manage-meta,
.saved-playlists-manage-description {
    display: block;
    color: var(--saved-playlists-muted);
    font-size: 0.77rem;
    line-height: 1.45;
}

.saved-playlists-manage-create,
.saved-playlists-manage-edit-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
    gap: 0.55rem;
    align-items: center;
}

.saved-playlists-manage-edit-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.saved-playlists-manage-list {
    display: grid;
    gap: 0.58rem;
}

.saved-playlists-manage-row {
    border: 1px solid var(--saved-playlists-border);
    border-radius: 16px;
    padding: 0.72rem 0.74rem;
    background: var(--saved-playlists-card-bg);
}

.saved-playlists-manage-row.is-pending-delete {
    border-color: rgba(220, 38, 38, 0.28);
}

.saved-playlists-manage-row-main {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    min-width: 0;
    flex: 1 1 auto;
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
    font-size: 0.95rem;
}

.saved-playlists-manage-row-copy {
    min-width: 0;
    display: grid;
    gap: 0.12rem;
}

.saved-playlists-manage-name {
    font-size: 0.88rem;
    font-weight: 800;
}

.saved-playlists-manage-row-actions,
.saved-playlists-manage-confirm-actions,
.saved-playlists-toolbar-actions,
.saved-playlists-confirm-actions {
    display: flex;
    align-items: center;
    gap: 0.45rem;
}

.saved-playlists-manage-confirm {
    margin-top: 0.2rem;
    padding-top: 0.72rem;
    border-top: 1px dashed var(--saved-playlists-border);
    color: var(--saved-playlists-muted);
    font-size: 0.78rem;
}

.saved-playlists-manage-empty,
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

.saved-playlists-manage-empty {
    padding: 1.35rem 1rem;
}

.saved-playlists-manage-input,
.saved-playlists-move-select {
    border-radius: 14px;
    border-color: var(--saved-playlists-border);
    background: var(--saved-playlists-control-bg);
    color: var(--saved-playlists-text);
    font-size: 0.84rem;
}

.saved-playlists-move-select {
    min-width: 6.8rem;
    max-width: 8.6rem;
    padding: 0.42rem 2rem 0.42rem 0.72rem;
    font-size: 0.76rem;
}

.saved-playlists-manage-input:focus,
.saved-playlists-move-select:focus {
    border-color: rgba(15, 118, 110, 0.3);
    box-shadow: 0 0 0 0.16rem rgba(15, 118, 110, 0.12);
}

.saved-playlists-confirm-alert,
.saved-playlists-toolbar {
    gap: 0.65rem;
    margin-bottom: 0.95rem;
    border: 1px solid var(--saved-playlists-border);
    border-radius: 16px;
    padding: 0.78rem 0.88rem;
    background: var(--saved-playlists-toolbar-bg);
}

.saved-playlists-panel.is-dark .saved-playlists-toolbar {
    background: rgba(20, 28, 45, 0.92);
}

.saved-playlists-confirm-alert {
    background: var(--saved-playlists-warning-bg);
    border-color: var(--saved-playlists-warning-border);
}

.saved-playlists-confirm-copy,
.saved-playlists-toolbar-copy {
    min-width: 0;
    display: grid;
    gap: 0.14rem;
}

.saved-playlists-confirm-copy span,
.saved-playlists-toolbar-copy span {
    color: var(--saved-playlists-muted);
    font-size: 0.74rem;
}

.saved-playlists-body {
    display: grid;
    min-height: 0;
    overflow: auto;
    padding-top: 0.08rem;
    padding-right: 0.18rem;
}

.saved-playlists-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    align-content: start;
    align-items: start;
}

.saved-playlists-card,
.saved-playlists-manage-row {
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
}

.saved-playlists-card {
    display: grid;
    grid-template-rows: auto auto;
    gap: 0.46rem;
    border: 1px solid var(--saved-playlists-border);
    border-radius: 16px;
    padding: 0.78rem 0.82rem;
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(248, 250, 252, 0.88)),
        var(--saved-playlists-card-bg);
    min-height: 0;
    position: relative;
    overflow: visible;
    align-self: start;
    height: auto;
}

.saved-playlists-card.is-selected {
    border-color: rgba(15, 118, 110, 0.4);
    box-shadow: 0 16px 28px rgba(15, 118, 110, 0.1);
}

.saved-playlists-card.is-now-playing {
    border-color: rgba(14, 165, 233, 0.34);
    box-shadow: 0 16px 28px rgba(14, 165, 233, 0.12);
}

.saved-playlists-panel.is-dark .saved-playlists-card {
    background:
        linear-gradient(180deg, rgba(16, 23, 38, 0.98), rgba(20, 28, 45, 0.94)),
        var(--saved-playlists-card-bg);
}

.saved-playlists-card-row {
    gap: 0.58rem;
    min-width: 0;
}

.saved-playlists-card-row-main {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: start;
}

.saved-playlists-card-row-actions {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.5rem;
    padding-top: 0.46rem;
    border-top: 1px solid var(--saved-playlists-border);
}

.saved-playlists-card-badges {
    display: flex;
    align-items: flex-start;
    gap: 0.28rem;
    flex-wrap: nowrap;
    justify-content: flex-end;
    min-width: 0;
    flex-shrink: 0;
    max-width: 8.75rem;
}

.saved-playlists-card-chip,
.saved-playlists-card-ref {
    display: inline-flex;
    align-items: center;
    gap: 0.32rem;
    min-height: 1.28rem;
    padding: 0.1rem 0.38rem;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.05);
    color: var(--saved-playlists-muted);
    font-size: 0.58rem;
    font-weight: 700;
    white-space: nowrap;
}

.saved-playlists-panel.is-dark .saved-playlists-card-chip,
.saved-playlists-panel.is-dark .saved-playlists-card-ref {
    background: rgba(51, 65, 85, 0.9);
    color: #dbeafe;
}

.saved-playlists-card-main {
    display: block;
    min-width: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    text-align: left;
}

.saved-playlists-card-main:hover .saved-playlists-card-title,
.saved-playlists-card-main:focus-visible .saved-playlists-card-title {
    color: var(--saved-playlists-accent-strong);
}

.saved-playlists-card-icon,
.saved-playlists-empty-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    background: transparent;
    color: var(--saved-playlists-accent);
    flex-shrink: 0;
}

.saved-playlists-card-icon {
    width: 2.25rem;
    height: 2.25rem;
    font-size: 0.92rem;
}

.saved-playlists-empty-icon {
    width: auto;
    height: auto;
    font-size: 1.08rem;
}

.saved-playlists-card-copy {
    display: grid;
    gap: 0.06rem;
    min-width: 0;
}

.saved-playlists-card-title-row {
    display: flex;
    align-items: center;
    gap: 0.36rem;
    flex-wrap: wrap;
}

.saved-playlists-card-title {
    font-weight: 800;
    font-size: 0.86rem;
    line-height: 1.14;
    min-width: 0;
    letter-spacing: -0.02em;
}

.saved-playlists-card-live-pill {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    padding: 0.12rem 0.42rem;
    border-radius: 999px;
    background: rgba(14, 165, 233, 0.12);
    color: #0369a1;
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.saved-playlists-panel.is-dark .saved-playlists-card-live-pill {
    background: rgba(14, 165, 233, 0.18);
    color: #e0f2fe;
}

.saved-playlists-card-meta-row {
    display: flex;
    align-items: center;
    gap: 0.32rem;
    flex-wrap: wrap;
}

.saved-playlists-card-meta-separator {
    width: 0.24rem;
    height: 0.24rem;
    border-radius: 999px;
    background: currentColor;
    opacity: 0.45;
}

.saved-playlists-card-meta,
.saved-playlists-card-date {
    font-size: 0.67rem;
    color: var(--saved-playlists-muted);
}

.saved-playlists-card-arabic {
    margin-top: 0.02rem;
    font-size: 0.84rem;
    font-weight: 700;
    line-height: 1.14;
    color: var(--saved-playlists-text);
    font-family: "Amiri", "Noto Naskh Arabic", var(--ic-quran-arabic-font), serif;
}

.saved-playlists-card-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.28rem;
    width: auto;
    margin-left: auto;
    flex-shrink: 0;
    flex-wrap: nowrap;
}

.saved-playlists-card-actions > * {
    flex-shrink: 0;
}

.saved-playlists-move-icon {
    position: relative;
    overflow: hidden;
}

.saved-playlists-move-icon .saved-playlists-move-select {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    min-width: 0;
    max-width: none;
    padding: 0;
    border: 0;
    opacity: 0;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
}

.saved-playlists-card-tag {
    display: inline-flex;
    align-items: center;
    max-width: min(100%, 10rem);
    width: max-content;
    min-width: 0;
    padding: 0.1rem 0.4rem;
    border-radius: 999px;
    background: var(--saved-playlists-accent-soft);
    color: var(--saved-playlists-accent-strong);
    font-size: 0.58rem;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.saved-playlists-card-tag.is-muted {
    background: rgba(148, 163, 184, 0.14);
    color: var(--saved-playlists-muted);
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
        padding: 1.05rem;
    }
}

@media (max-width: 767.98px) {
    .saved-playlists-panel-head,
    .saved-playlists-toolbar,
    .saved-playlists-confirm-alert,
    .saved-playlists-manage-head,
    .saved-playlists-manage-confirm {
        align-items: flex-start;
    }

    .saved-playlists-panel {
        border-radius: 20px;
        padding: 0.92rem;
        max-height: min(100dvh - 1rem, 100%);
    }

    .saved-playlists-tabs {
        gap: 0.74rem;
    }

    .saved-playlists-primary-pills {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .saved-playlists-secondary-pills {
        margin-inline: -0.08rem;
        padding-inline: 0.08rem;
    }

    .saved-playlists-flow {
        gap: 0.5rem;
    }

    .saved-playlists-card,
    .saved-playlists-manage-row {
        padding: 0.8rem;
    }

    .saved-playlists-grid {
        grid-template-columns: minmax(0, 1fr);
    }

    .saved-playlists-manage-row {
        flex-direction: column;
    }

    .saved-playlists-toolbar-actions,
    .saved-playlists-confirm-actions,
    .saved-playlists-manage-row-actions,
    .saved-playlists-manage-confirm-actions {
        width: 100%;
        flex-wrap: wrap;
    }

    .saved-playlists-toolbar-actions {
        justify-content: flex-start;
    }

    .saved-playlists-card-row-main,
    .saved-playlists-card-row-actions {
        grid-template-columns: minmax(0, 1fr);
    }

    .saved-playlists-card-badges {
        justify-content: flex-start;
        flex-wrap: wrap;
        max-width: none;
    }

    .saved-playlists-card-actions {
        width: 100%;
        justify-content: flex-start;
        margin-left: 0;
        grid-template-columns: repeat(auto-fit, minmax(2.05rem, auto));
    }

    .saved-playlists-move-select {
        min-width: 0;
        max-width: none;
    }

    .saved-playlists-manage-create {
        grid-template-columns: 1fr;
    }

    .saved-playlists-manage-create .saved-playlists-icon-btn-primary {
        width: 100%;
    }

    .saved-playlists-manage-input {
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
        padding: 0.44rem 0.68rem;
    }

    .saved-playlists-manage {
        padding: 0.8rem;
    }

    .saved-playlists-card-title-row {
        align-items: center;
    }

    .saved-playlists-card-arabic {
        font-size: 0.84rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    .saved-playlists-close-btn,
    .saved-playlists-delete-btn,
    .saved-playlists-icon-btn,
    .saved-playlists-card-check,
    .saved-playlists-toolbar-btn,
    .saved-playlists-card,
    .saved-playlists-card-main,
    .saved-playlists-collection-pill,
    .saved-playlists-play-btn {
        transition: none;
    }
}
</style>
