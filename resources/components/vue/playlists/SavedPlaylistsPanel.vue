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
                <p class="saved-playlists-panel-subtitle mb-2">Create custom audio playlists for tailored listening. Use Collections to organize your favorite verse groupings and combinations.</p>
                <p class="saved-playlists-panel-summary mb-0"><strong>{{ summaryText }}</strong></p>
            </div>
            <button
                type="button"
                class="btn saved-playlists-close-btn"
                aria-label="Close saved playlists panel"
                @click="$emit('close')">
                <i class="bi bi-x-lg" aria-hidden="true"></i>
            </button>
        </div>

        <div class="saved-playlists-flow" aria-label="Saved playlist steps">
            <div class="saved-playlists-flow-step">
                <span class="saved-playlists-flow-icon">
                    <i class="bi bi-filter" aria-hidden="true"></i>
                </span>
                <div>
                    <strong>1. Filter</strong>
                    <span>Choose All or one playlist.</span>
                </div>
            </div>
            <div class="saved-playlists-flow-step">
                <span class="saved-playlists-flow-icon">
                    <i class="bi bi-sliders" aria-hidden="true"></i>
                </span>
                <div>
                    <strong>2. Manage</strong>
                    <span>Create, rename, or remove playlists.</span>
                </div>
            </div>
            <div class="saved-playlists-flow-step">
                <span class="saved-playlists-flow-icon">
                    <i class="bi bi-play-fill" aria-hidden="true"></i>
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
                    <i class="bi bi-grid-3x3-gap-fill" aria-hidden="true"></i>
                    <span>All</span>
                </button>
                <button
                    type="button"
                    class="btn saved-playlists-collection-pill saved-playlists-collection-pill-primary saved-playlists-collection-manage"
                    :class="{ 'is-active': manageOpen }"
                    @click="openManage">
                    <i class="bi bi-sliders" aria-hidden="true"></i>
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
                    <i class="bi bi-headphones" aria-hidden="true"></i>
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
                            <i class="bi bi-headphones"></i>
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
                            <i class="bi bi-pencil-square" aria-hidden="true"></i>
                        </button>
                        <button
                            v-else
                            type="button"
                            class="btn saved-playlists-icon-btn saved-playlists-icon-btn-primary"
                            :disabled="busy || !editingPlaylistName"
                            :aria-label="`Save ${playlist.name}`"
                            @click="confirmEdit(playlist)">
                            <i class="bi bi-check-lg" aria-hidden="true"></i>
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
                                <i class="bi bi-check-lg" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </article>
            </div>

            <div v-else class="saved-playlists-manage-empty">
                <i class="bi bi-headphones" aria-hidden="true"></i>
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
                    <i class="bi bi-x-lg" aria-hidden="true"></i>
                    <span>Cancel</span>
                </button>
                <button
                    type="button"
                    class="btn saved-playlists-toolbar-btn is-danger"
                    :disabled="deleteBusy"
                    @click="$emit('confirm-delete')">
                    <i class="bi bi-trash3" aria-hidden="true"></i>
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
                    v-if="!isAllActive && items.length"
                    type="button"
                    class="btn saved-playlists-toolbar-btn is-primary"
                    :disabled="deleteBusy"
                    @click="$emit('play-playlist', activePlaylistId)">
                    <i class="bi bi-play-circle-fill" aria-hidden="true"></i>
                    <span>Play All</span>
                </button>
                <button
                    v-if="!isAllActive && items.length"
                    type="button"
                    class="btn saved-playlists-toolbar-btn"
                    :disabled="deleteBusy"
                    @click="$emit('shuffle-playlist', activePlaylistId)">
                    <i class="bi bi-shuffle" aria-hidden="true"></i>
                    <span>Shuffle</span>
                </button>
                <button
                    type="button"
                    class="btn saved-playlists-toolbar-btn"
                    :disabled="deleteBusy"
                    @click="$emit('toggle-select-all')">
                    <i
                        class="bi"
                        :class="allSelected ? 'bi-x-square' : 'bi-check-square'"
                        aria-hidden="true"></i>
                    <span>{{ allSelected ? "Unselect" : "Select all" }}</span>
                </button>
                <button
                    type="button"
                    class="btn saved-playlists-toolbar-btn"
                    :disabled="!selectedCount || deleteBusy"
                    @click="$emit('clear-selection')">
                    <i class="bi bi-eraser-fill" aria-hidden="true"></i>
                    <span>Clear</span>
                </button>
                <button
                    type="button"
                    class="btn saved-playlists-toolbar-btn is-danger"
                    :disabled="!selectedCount || deleteBusy"
                    @click="$emit('request-bulk-delete')">
                    <i class="bi bi-trash3" aria-hidden="true"></i>
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
                                    class="bi bi-check-lg"></i>
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
                                @click="$emit('move-item-up', item.key)">
                                <i class="bi bi-arrow-up" aria-hidden="true"></i>
                            </button>
                            <button
                                v-if="item.canMoveDown"
                                type="button"
                                class="btn saved-playlists-icon-btn"
                                :disabled="deleteBusy || busy"
                                aria-label="Move item down"
                                @click="$emit('move-item-down', item.key)">
                                <i class="bi bi-arrow-down" aria-hidden="true"></i>
                            </button>
                            <button
                                type="button"
                                class="btn saved-playlists-delete-btn"
                                :disabled="deleteBusy"
                                :aria-label="`Delete ${item.surahName} ayah ${item.ayahNumber}`"
                                @click="$emit('request-delete', item.key)">
                                <i class="bi bi-trash3" aria-hidden="true"></i>
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
                            <i class="bi bi-headphones"></i>
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
        "play-playlist",
        "shuffle-playlist"
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
        totalVersesCount() {
            return (Array.isArray(this.playlists) ? this.playlists : []).reduce(
                (sum, pl) => sum + (pl.itemCount || 0),
                0
            );
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
    --saved-playlists-accent: #6366f1;
    --saved-playlists-accent-soft: rgba(99, 102, 241, 0.1);
    --saved-playlists-accent-strong: #4f46e5;
    --saved-playlists-danger: #f43f5e;
    --saved-playlists-danger-soft: rgba(244, 63, 94, 0.1);
    --saved-playlists-border: rgba(38, 41, 46, 0.08);
    --saved-playlists-surface: rgba(255, 255, 255, 0.9);
    --saved-playlists-surface-alt: rgba(248, 250, 252, 0.95);
    --saved-playlists-card-bg: rgba(255, 255, 255, 0.7);
    --saved-playlists-toolbar-bg: rgba(241, 245, 249, 0.8);
    --saved-playlists-control-bg: rgba(255, 255, 255, 0.9);
    --saved-playlists-text: #0f172a;
    --saved-playlists-muted: #64748b;
    --sp-glass-border: rgba(255, 255, 255, 0.4);
    --sp-shadow: 0 20px 50px rgba(38, 41, 46, 0.1);

    border: 1px solid var(--saved-playlists-border);
    border-radius: 32px;
    background: 
        radial-gradient(circle at -10% -10%, rgba(99, 102, 241, 0.12), transparent 40%),
        radial-gradient(circle at 110% 110%, rgba(79, 70, 229, 0.08), transparent 40%),
        linear-gradient(135deg, var(--saved-playlists-surface), var(--saved-playlists-surface-alt));
    backdrop-filter: blur(20px);
    box-shadow: var(--sp-shadow), inset 0 0 0 1px var(--sp-glass-border);
    color: var(--saved-playlists-text);
    padding: 1.25rem;
    position: relative;
    overflow: hidden;
    font-family: "Inter", system-ui, -apple-system, sans-serif !important;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}


.saved-playlists-panel.is-dark {
    --saved-playlists-accent: #818cf8;
    --saved-playlists-accent-soft: rgba(129, 140, 248, 0.12);
    --saved-playlists-accent-strong: #c7d2fe;
    --saved-playlists-danger: #fb7185;
    --saved-playlists-danger-soft: rgba(251, 113, 133, 0.12);
    --saved-playlists-border: rgba(148, 163, 184, 0.1);
    --saved-playlists-surface: rgba(38, 41, 46, 0.95);
    --saved-playlists-surface-alt: rgba(30, 33, 38, 0.98);
    --saved-playlists-card-bg: rgba(46, 50, 56, 0.6);
    --saved-playlists-toolbar-bg: rgba(46, 50, 56, 0.8);
    --saved-playlists-control-bg: rgba(38, 41, 46, 0.8);
    --saved-playlists-text: #f8fafc;
    --saved-playlists-muted: #94a3b8;
    --sp-glass-border: rgba(255, 255, 255, 0.05);
    --sp-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
}


.saved-playlists-panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    gap: 1rem;
}

.saved-playlists-panel-kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    background: var(--saved-playlists-accent-soft);
    color: var(--saved-playlists-accent);
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
}

.saved-playlists-panel-title {
    font-size: 1.5rem;
    font-weight: 900;
    letter-spacing: -0.025em;
    background: linear-gradient(135deg, var(--saved-playlists-text), var(--saved-playlists-muted));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.saved-playlists-close-btn {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 12px;
    border: 1px solid var(--saved-playlists-border);
    background: var(--saved-playlists-control-bg);
    color: var(--saved-playlists-text);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.saved-playlists-close-btn:hover {
    background: var(--saved-playlists-danger-soft);
    color: var(--saved-playlists-danger);
    transform: rotate(90deg) scale(1.1);
}

.saved-playlists-flow {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.saved-playlists-flow-step {
    padding: 1rem;
    border-radius: 20px;
    background: var(--saved-playlists-card-bg);
    border: 1px solid var(--saved-playlists-border);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: all 0.3s ease;
}

.saved-playlists-flow-icon {
    font-size: 1.25rem;
    color: var(--saved-playlists-accent);
    margin-bottom: 0.25rem;
}


.saved-playlists-tabs {
    margin-bottom: 1.5rem;
}

.saved-playlists-primary-pills {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.saved-playlists-collection-pill-primary {
    flex: 1;
    height: 3.5rem;
    border-radius: 16px;
    font-weight: 800;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    background: var(--saved-playlists-card-bg);
    border: 1px solid var(--saved-playlists-border);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.saved-playlists-collection-pill-primary.is-active {
    background: linear-gradient(135deg, var(--saved-playlists-accent), #818cf8);
    color: white;
    border-color: transparent;
    box-shadow: 0 12px 24px rgba(99, 102, 241, 0.3);
}

.saved-playlists-secondary-pills {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    scrollbar-width: none;
}

.saved-playlists-collection-pill {
    padding: 0.5rem 1rem;
    border-radius: 999px;
    background: var(--saved-playlists-card-bg);
    border: 1px solid var(--saved-playlists-border);
    font-size: 0.8rem;
    font-weight: 700;
    transition: all 0.2s ease;
    white-space: nowrap;
}

.saved-playlists-collection-pill:hover {
    background: var(--saved-playlists-accent-soft);
    color: var(--saved-playlists-accent);
}

.saved-playlists-collection-pill.is-active {
    background: var(--saved-playlists-accent);
    color: white;
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
    background: rgba(38, 41, 46, 0.08);
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
    max-height: 480px;
    overflow-y: auto;
    padding-right: 4px;
    scrollbar-width: thin;
}

.saved-playlists-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.saved-playlists-card {
    border-radius: 20px;
    background: var(--saved-playlists-card-bg);
    border: 1px solid var(--saved-playlists-border);
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.saved-playlists-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
    border-color: var(--saved-playlists-accent);
}

.saved-playlists-card.is-now-playing {
    border-color: var(--saved-playlists-accent);
    background: var(--saved-playlists-accent-soft);
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.1);
}


.saved-playlists-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.saved-playlists-card-check-indicator {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    border: 2px solid var(--saved-playlists-border);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.saved-playlists-card.is-selected .saved-playlists-card-check-indicator {
    background: var(--saved-playlists-accent);
    border-color: var(--saved-playlists-accent);
    color: white;
}

.saved-playlists-card-top-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.saved-playlists-play-btn {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: var(--saved-playlists-accent);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    transition: all 0.2s ease;
}

.saved-playlists-play-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.saved-playlists-card-link {
    display: flex;
    gap: 1rem;
    text-decoration: none;
    color: inherit;
    background: none;
    border: none;
    padding: 0;
    text-align: left;
}

.saved-playlists-card-icon {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--saved-playlists-accent-soft), transparent);
    color: var(--saved-playlists-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
}

.saved-playlists-card-title {
    font-size: 1.1rem;
    font-weight: 800;
    display: block;
    margin-bottom: 0.25rem;
}

.saved-playlists-card-meta {
    font-size: 0.8rem;
    color: var(--saved-playlists-muted);
}

.saved-playlists-card-tag {
    font-size: 0.65rem;
    font-weight: 800;
    padding: 0.25rem 0.6rem;
    border-radius: 6px;
    background: var(--saved-playlists-accent-soft);
    color: var(--saved-playlists-accent);
    text-transform: uppercase;
}

.saved-playlists-toolbar {
    background: var(--saved-playlists-toolbar-bg);
    padding: 1rem 1.25rem;
    border-radius: 20px;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--saved-playlists-border);
}

.saved-playlists-toolbar-btn {
    padding: 0.5rem 1rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.8rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s ease;
}

.saved-playlists-toolbar-btn.is-danger {
    background: var(--saved-playlists-danger);
    color: white;
}

.saved-playlists-empty {
    padding: 4rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.saved-playlists-empty-icon {
    font-size: 4rem;
    color: var(--saved-playlists-accent-soft);
}

@media (max-width: 768px) {
    .saved-playlists-grid {
        grid-template-columns: 1fr;
    }
    .saved-playlists-flow {
        grid-template-columns: 1fr;
    }
    .saved-playlists-primary-pills {
        flex-direction: column;
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
