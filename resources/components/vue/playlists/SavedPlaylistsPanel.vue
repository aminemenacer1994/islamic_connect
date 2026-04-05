<template>
    <section
        class="saved-playlists-panel"
        :class="{ 'is-dark': darkTheme }"
        role="region"
        aria-labelledby="savedPlaylistsPanelTitle">
        <div class="saved-playlists-panel-head">
            <div class="saved-playlists-panel-heading">
                <span class="saved-playlists-panel-kicker">
                    <i class="bi bi-music-note-list" aria-hidden="true"></i>
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
                <i class="bi bi-x-lg" aria-hidden="true"></i>
            </button>
        </div>

        <div class="saved-playlists-flow" aria-label="Saved playlist guidance">
            <span class="saved-playlists-flow-chip">
                <i class="bi bi-filter-circle-fill" aria-hidden="true"></i>
                <strong>Filter</strong>
                <span>Pick a playlist</span>
            </span>
            <span class="saved-playlists-flow-chip">
                <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                <strong>Open</strong>
                <span>Jump to the ayah</span>
            </span>
            <span class="saved-playlists-flow-chip">
                <i class="bi bi-play-circle-fill" aria-hidden="true"></i>
                <strong>Play</strong>
                <span>Start recitation</span>
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
                    <i class="bi bi-grid-1x2-fill" aria-hidden="true"></i>
                    <span>All</span>
                </button>
                <button
                    type="button"
                    class="btn saved-playlists-collection-pill saved-playlists-collection-pill-primary saved-playlists-collection-manage"
                    :class="{ 'is-active': manageOpen }"
                    @click="openManage">
                    <i class="bi bi-sliders2" aria-hidden="true"></i>
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
                    <i class="bi bi-disc-fill" aria-hidden="true"></i>
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
                    <i class="bi bi-plus-lg" aria-hidden="true"></i>
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
                            <i class="bi bi-music-note-beamed"></i>
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
                            <i class="bi bi-pencil-square" aria-hidden="true"></i>
                        </button>
                        <button
                            v-else
                            type="button"
                            class="btn saved-playlists-icon-btn saved-playlists-icon-btn-primary"
                            :disabled="busy || !editingPlaylistName"
                            :aria-label="`Save ${playlist.name}`"
                            @click="confirmEdit(playlist)">
                            <i class="bi bi-check2" aria-hidden="true"></i>
                        </button>
                        <button
                            v-if="editingPlaylistId === playlist.id"
                            type="button"
                            class="btn saved-playlists-icon-btn"
                            :disabled="busy"
                            aria-label="Cancel rename"
                            @click="cancelEdit">
                            <i class="bi bi-x-lg" aria-hidden="true"></i>
                        </button>
                        <button
                            type="button"
                            class="btn saved-playlists-icon-btn saved-playlists-icon-btn-danger"
                            :disabled="busy"
                            :aria-label="`Delete ${playlist.name}`"
                            @click="requestPlaylistDelete(playlist)">
                            <i class="bi bi-trash3" aria-hidden="true"></i>
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
                                <i class="bi bi-arrow-counterclockwise" aria-hidden="true"></i>
                            </button>
                            <button
                                type="button"
                                class="btn saved-playlists-icon-btn saved-playlists-icon-btn-danger"
                                :disabled="busy"
                                :aria-label="`Confirm delete ${playlist.name}`"
                                @click="confirmPlaylistDelete(playlist)">
                                <i class="bi bi-check2" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </article>
            </div>

            <div v-else class="saved-playlists-manage-empty">
                <i class="bi bi-music-note-list" aria-hidden="true"></i>
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
                    <i class="bi bi-x-lg" aria-hidden="true"></i>
                </button>
                <button
                    type="button"
                    class="btn saved-playlists-toolbar-btn is-danger"
                    :disabled="deleteBusy"
                    aria-label="Confirm delete"
                    :title="deleteBusy ? 'Deleting' : 'Confirm delete'"
                    @click="$emit('confirm-delete')">
                    <i
                        class="bi"
                        :class="deleteBusy ? 'bi-hourglass-split' : 'bi-trash3'"
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
                        class="bi"
                        :class="allSelected ? 'bi-x-square' : 'bi-check2-square'"
                        aria-hidden="true"></i>
                </button>
                <button
                    type="button"
                    class="btn saved-playlists-toolbar-btn"
                    :disabled="!selectedCount || deleteBusy"
                    aria-label="Clear selection"
                    title="Clear selection"
                    @click="$emit('clear-selection')">
                    <i class="bi bi-eraser" aria-hidden="true"></i>
                </button>
                <button
                    type="button"
                    class="btn saved-playlists-toolbar-btn is-danger"
                    :disabled="!selectedCount || deleteBusy"
                    aria-label="Delete selected verses"
                    title="Delete selected verses"
                    @click="$emit('request-bulk-delete')">
                    <i class="bi bi-trash3" aria-hidden="true"></i>
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
                                class="bi"
                                :class="selectedKeySet.has(item.key) ? 'bi-check-circle-fill' : 'bi-circle'"
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
                                <i class="bi bi-music-note-list" aria-hidden="true"></i>
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
                            class="saved-playlists-card-tag is-muted">
                            {{ item.description }}
                        </span>
                        <div class="saved-playlists-card-actions">
                            <select
                                v-if="getMoveOptions(item).length"
                                class="form-select form-select-sm saved-playlists-move-select"
                                :disabled="deleteBusy || busy"
                                :aria-label="`Move ${item.surahName} ayah ${item.ayahNumber} to another playlist`"
                                @change="onMoveItem(item.key, $event)">
                                <option value="" selected disabled>Move</option>
                                <option
                                    v-for="playlist in getMoveOptions(item)"
                                    :key="`move-${item.key}-${playlist.id}`"
                                    :value="playlist.id">
                                    {{ playlist.name }}
                                </option>
                            </select>
                            <button
                                type="button"
                                class="btn saved-playlists-icon-btn"
                                :disabled="deleteBusy"
                                :aria-label="`Open ${item.surahName} ayah ${item.ayahNumber}`"
                                title="Open verse"
                                @click="$emit('open-item', item.key)">
                                <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                            </button>
                            <button
                                type="button"
                                class="btn saved-playlists-play-btn"
                                :disabled="deleteBusy"
                                :aria-label="item.isNowPlaying ? 'Pause ayah audio' : 'Play ayah audio'"
                                :title="item.isNowPlaying ? 'Pause ayah audio' : 'Play ayah audio'"
                                @click="$emit('play-item', item.key)">
                                <i
                                    class="bi"
                                    :class="item.isNowPlaying ? 'bi-pause-fill' : 'bi-play-fill'"
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
                                <i class="bi bi-arrow-up" aria-hidden="true"></i>
                            </button>
                            <button
                                v-if="item.canMoveDown"
                                type="button"
                                class="btn saved-playlists-icon-btn"
                                :disabled="deleteBusy || busy"
                                aria-label="Move item down"
                                title="Move down"
                                @click="$emit('move-item-down', item.key)">
                                <i class="bi bi-arrow-down" aria-hidden="true"></i>
                            </button>
                            <button
                                type="button"
                                class="btn saved-playlists-delete-btn"
                                :disabled="deleteBusy"
                                :aria-label="`Delete ${item.surahName} ayah ${item.ayahNumber}`"
                                title="Delete verse"
                                @click="$emit('request-delete', item.key)">
                                <i class="bi bi-trash3" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        </div>

        <div v-else class="saved-playlists-empty">
            <span class="saved-playlists-empty-icon" aria-hidden="true">
                <i class="bi bi-music-note-list"></i>
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
            return "Open from the card or use the play icon when you want recitation immediately.";
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
    gap: 0.9rem;
    max-height: min(820px, calc(100dvh - 2rem));
    overflow: hidden;
    padding: 1rem;
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
    gap: 0.75rem;
    align-items: flex-start;
}

.saved-playlists-panel-heading {
    min-width: 0;
}

.saved-playlists-panel-kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.38rem;
    margin-bottom: 0.22rem;
    padding: 0.14rem 0.48rem;
    border-radius: 999px;
    background: var(--saved-playlists-accent-soft);
    color: var(--saved-playlists-accent);
    font-size: 0.64rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.saved-playlists-panel-title {
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: -0.02em;
}

.saved-playlists-panel-subtitle {
    color: var(--saved-playlists-muted);
    font-size: 0.8rem;
    line-height: 1.35;
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
    background: var(--saved-playlists-control-bg);
    color: var(--saved-playlists-text);
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
}

.saved-playlists-close-btn,
.saved-playlists-delete-btn,
.saved-playlists-card-check,
.saved-playlists-icon-btn {
    width: 2.05rem;
    height: 2.05rem;
    padding: 0;
}

.saved-playlists-play-btn {
    width: 2.15rem;
    height: 2.15rem;
    padding: 0;
    border-color: transparent;
    background: linear-gradient(135deg, #0f766e, #115e59);
    color: #fff;
    box-shadow: 0 12px 24px rgba(15, 118, 110, 0.2);
}

.saved-playlists-toolbar-btn {
    width: 2.05rem;
    height: 2.05rem;
    padding: 0;
    font-size: 0.82rem;
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
    color: #fff;
    border-color: transparent;
}

.saved-playlists-icon-btn-primary {
    background: linear-gradient(135deg, #0f766e, #115e59);
}

.saved-playlists-icon-btn-danger,
.saved-playlists-toolbar-btn.is-danger,
.saved-playlists-delete-btn {
    background: linear-gradient(135deg, #dc2626, #b91c1c);
    color: #fff;
    border-color: transparent;
}

.saved-playlists-toolbar,
.saved-playlists-confirm-alert,
.saved-playlists-manage {
    margin-bottom: 0;
}

.saved-playlists-flow {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
    overflow-x: auto;
    padding-bottom: 0.08rem;
    scrollbar-width: thin;
}

.saved-playlists-flow-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.44rem;
    min-width: max-content;
    padding: 0.42rem 0.72rem;
    border-radius: 999px;
    border: 1px solid var(--saved-playlists-border);
    background: rgba(255, 255, 255, 0.55);
    color: var(--saved-playlists-text);
}

.saved-playlists-panel.is-dark .saved-playlists-flow-chip {
    background: rgba(15, 23, 42, 0.52);
}

.saved-playlists-flow-chip i {
    color: var(--saved-playlists-accent);
    font-size: 0.86rem;
}

.saved-playlists-flow-chip strong {
    font-size: 0.72rem;
}

.saved-playlists-flow-chip span:last-child {
    color: var(--saved-playlists-muted);
    font-size: 0.7rem;
    line-height: 1.2;
}

.saved-playlists-tabs {
    display: grid;
    gap: 0.78rem;
}

.saved-playlists-primary-pills {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, max-content));
    gap: 0.7rem;
}

.saved-playlists-secondary-pills {
    display: flex;
    gap: 0.62rem;
    overflow-x: auto;
    padding-bottom: 0.18rem;
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
    gap: 0.72rem;
    padding: 0.72rem;
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
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 16px;
    background: var(--saved-playlists-accent-soft);
    color: var(--saved-playlists-accent);
    flex-shrink: 0;
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
    margin-bottom: 0.85rem;
    border: 1px solid var(--saved-playlists-border);
    border-radius: 16px;
    padding: 0.72rem 0.78rem;
    background: var(--saved-playlists-toolbar-bg);
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
    padding-right: 0.15rem;
}

.saved-playlists-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    align-content: start;
}

.saved-playlists-card,
.saved-playlists-manage-row {
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
}

.saved-playlists-card {
    display: grid;
    grid-template-rows: auto auto;
    gap: 0.56rem;
    border: 1px solid var(--saved-playlists-border);
    border-radius: 20px;
    padding: 0.78rem;
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(248, 250, 252, 0.88)),
        var(--saved-playlists-card-bg);
    min-height: 0;
    position: relative;
    overflow: hidden;
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
        linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(15, 23, 42, 0.88)),
        var(--saved-playlists-card-bg);
}

.saved-playlists-card-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.72rem;
    min-width: 0;
}

.saved-playlists-card-row-main {
    align-items: flex-start;
}

.saved-playlists-card-row-actions {
    padding-top: 0.46rem;
    border-top: 1px solid var(--saved-playlists-border);
}

.saved-playlists-card-badges {
    display: flex;
    align-items: center;
    gap: 0.42rem;
    flex-wrap: wrap;
    justify-content: flex-end;
    min-width: 0;
    flex-shrink: 0;
}

.saved-playlists-card-chip,
.saved-playlists-card-ref {
    display: inline-flex;
    align-items: center;
    gap: 0.32rem;
    min-height: 1.5rem;
    padding: 0.14rem 0.5rem;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.05);
    color: var(--saved-playlists-muted);
    font-size: 0.64rem;
    font-weight: 700;
}

.saved-playlists-panel.is-dark .saved-playlists-card-chip,
.saved-playlists-panel.is-dark .saved-playlists-card-ref {
    background: rgba(148, 163, 184, 0.14);
    color: var(--saved-playlists-accent-strong);
}

.saved-playlists-card-main {
    display: block;
    flex: 1 1 auto;
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
    border-radius: 16px;
    background: var(--saved-playlists-accent-soft);
    color: var(--saved-playlists-accent);
    flex-shrink: 0;
}

.saved-playlists-card-icon {
    width: 2.25rem;
    height: 2.25rem;
    font-size: 0.92rem;
}

.saved-playlists-empty-icon {
    width: 2.9rem;
    height: 2.9rem;
    font-size: 1.08rem;
}

.saved-playlists-card-copy {
    display: grid;
    gap: 0.16rem;
    min-width: 0;
    flex: 1 1 auto;
}

.saved-playlists-card-title-row {
    display: flex;
    align-items: center;
    gap: 0.42rem;
    flex-wrap: wrap;
}

.saved-playlists-card-title {
    font-weight: 800;
    font-size: 0.96rem;
    line-height: 1.16;
    min-width: 0;
    letter-spacing: -0.02em;
}

.saved-playlists-card-live-pill {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    padding: 0.16rem 0.48rem;
    border-radius: 999px;
    background: rgba(14, 165, 233, 0.12);
    color: #0369a1;
    font-size: 0.64rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}

.saved-playlists-panel.is-dark .saved-playlists-card-live-pill {
    background: rgba(56, 189, 248, 0.14);
    color: #bae6fd;
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
    font-size: 0.74rem;
    color: var(--saved-playlists-muted);
}

.saved-playlists-card-arabic {
    margin-top: 0.08rem;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.24;
    color: var(--saved-playlists-text);
    font-family: "Amiri", "Noto Naskh Arabic", var(--ic-quran-arabic-font), serif;
}

.saved-playlists-card-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 0.46rem;
    width: auto;
    margin-left: auto;
}

.saved-playlists-card-tag {
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    width: max-content;
    margin-top: 0.08rem;
    padding: 0.16rem 0.48rem;
    border-radius: 999px;
    background: var(--saved-playlists-accent-soft);
    color: var(--saved-playlists-accent-strong);
    font-size: 0.66rem;
    font-weight: 700;
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
        padding: 0.9rem;
    }

    .saved-playlists-grid {
        grid-template-columns: minmax(0, 1fr);
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
        padding: 0.82rem;
        max-height: min(100dvh - 1rem, 100%);
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

    .saved-playlists-card,
    .saved-playlists-manage-row {
        padding: 0.78rem;
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
        flex-direction: column;
        align-items: flex-start;
    }

    .saved-playlists-card-badges {
        justify-content: flex-start;
    }

    .saved-playlists-card-actions {
        width: 100%;
        justify-content: flex-start;
        margin-left: 0;
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

    .saved-playlists-flow-chip {
        min-width: 13.5rem;
        justify-content: flex-start;
    }

    .saved-playlists-manage {
        padding: 0.72rem;
    }

    .saved-playlists-card-title-row {
        align-items: center;
    }

    .saved-playlists-card-arabic {
        font-size: 0.92rem;
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
