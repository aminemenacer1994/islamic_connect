<template>
  <div class="admin-page playlist-admin-shell">
    <div class="reader-custom-playlist-panel">
      <div class="reader-custom-playlist-header">
        <div class="reader-custom-playlist-header-copy">
          <div class="reader-custom-playlist-title-row">
            <h3 class="reader-custom-playlist-title mb-0">Custom Playlist Library</h3>
          </div>
          <p class="reader-custom-playlist-subtitle mb-0">Pick a playlist, then play or manage its items.</p>
        </div>
        <div class="reader-custom-playlist-header-actions">
          <span class="reader-custom-playlist-count">{{ selectedPlaylistItemCount }} selected</span>
          <button
            type="button"
            class="reader-custom-playlist-close"
            aria-label="Close playlist panel"
            title="Close playlist"
            @click="closePanel"
          >
            <i class="bi bi-x-lg" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <div class="reader-custom-playlist-layout">
        <aside class="reader-custom-playlist-nav" aria-label="Playlist list">
          <div class="reader-custom-playlist-nav-header">
            <label class="reader-custom-playlist-field-label mb-0">Playlists</label>
            <button
              type="button"
              class="reader-custom-playlist-btn is-add-surah reader-custom-playlist-nav-add"
              :disabled="createPlaylistSaving"
              @click="openCreatePlaylistModal"
            >
              <i class="bi bi-plus-circle" aria-hidden="true"></i>
              New playlist
            </button>
          </div>

          <div class="reader-custom-playlist-nav-tools">
            <div class="reader-custom-playlist-search-wrap">
              <i class="bi bi-search reader-custom-playlist-search-icon" aria-hidden="true"></i>
              <input
                v-model.trim="playlistSearchQuery"
                type="search"
                class="form-control reader-custom-playlist-search-input"
                placeholder="Search playlists"
                aria-label="Search playlists"
              >
              <button
                v-if="playlistSearchQuery"
                type="button"
                class="reader-custom-playlist-search-clear"
                aria-label="Clear playlist search"
                @click="playlistSearchQuery = ''"
              >
                <i class="bi bi-x-lg" aria-hidden="true"></i>
              </button>
            </div>
          </div>

          <div class="reader-custom-playlist-nav-list" role="tablist" aria-label="Saved playlists">
            <span v-if="loading && !playlists.length" class="reader-custom-playlist-empty-inline">Loading playlists...</span>
            <span v-else-if="error && !playlists.length" class="reader-custom-playlist-empty-inline is-error">{{ error }}</span>

            <button
              v-for="playlist in filteredCustomPlaylists"
              :key="`playlist-pill-${playlist.id}`"
              type="button"
              class="reader-custom-playlist-nav-item"
              :class="{ 'is-active': String(activePlaylistId) === String(playlist.id) }"
              :aria-selected="String(activePlaylistId) === String(playlist.id) ? 'true' : 'false'"
              @click="selectPlaylist(playlist.id)"
            >
              <span class="reader-custom-playlist-nav-item-main">
                <span
                  class="reader-custom-playlist-nav-item-accent"
                  :style="{ backgroundColor: getPlaylistAccentColor(playlist) }"
                  aria-hidden="true"
                ></span>
                <i class="bi bi-music-note-list reader-custom-playlist-nav-item-icon" aria-hidden="true"></i>
                <span class="reader-custom-playlist-nav-item-name">
                  {{ playlist.name || "Untitled Playlist" }}
                </span>
              </span>
              <span class="reader-custom-playlist-nav-item-count">
                {{ playlistItemCountLabel(playlist) }}
              </span>
            </button>

            <span v-if="!loading && !filteredCustomPlaylists.length" class="reader-custom-playlist-empty-inline">
              {{ playlistSearchQuery ? "No playlists match your search." : "No playlists yet." }}
            </span>
          </div>
        </aside>

        <section v-if="activePlaylist" class="reader-custom-playlist-content">
          <div class="reader-custom-playlist-content-header">
            <div>
              <div class="reader-custom-playlist-content-title-row">
                <h4 class="reader-custom-playlist-content-title mb-0">
                  {{ activePlaylist.name || "Untitled Playlist" }}
                </h4>
                <span class="reader-custom-playlist-content-badge">
                  {{ customPlaylistItemCount }} ayah{{ customPlaylistItemCount === 1 ? "" : "s" }}
                </span>
              </div>
              <p class="reader-custom-playlist-content-subtitle mb-0">
                {{ activePlaylistSubtitle }}
              </p>
            </div>
            <div class="reader-custom-playlist-content-actions">
              <button
                type="button"
                class="reader-custom-playlist-btn"
                :disabled="playlistEditorSaving"
                @click="togglePlaylistEditor"
              >
                <i class="bi" :class="isPlaylistEditorVisible ? 'bi-x-circle' : 'bi-pencil-square'" aria-hidden="true"></i>
                {{ isPlaylistEditorVisible ? "Close edit" : "Edit playlist" }}
              </button>
              <button
                type="button"
                class="reader-custom-playlist-btn is-clear"
                :disabled="playlistDeleteBusy"
                @click="removeActivePlaylist"
              >
                <i class="bi bi-trash me-1" aria-hidden="true"></i>
                Delete playlist
              </button>
            </div>
          </div>

          <div v-if="isPlaylistEditorVisible" class="reader-custom-playlist-editor-card">
            <div class="reader-custom-playlist-meta">
              <div class="reader-custom-playlist-field">
                <label class="reader-custom-playlist-field-label">Name</label>
                <input
                  v-model="playlistEditorName"
                  type="text"
                  class="form-control reader-custom-playlist-input"
                  placeholder="Type playlist name"
                >
              </div>
              <div class="reader-custom-playlist-field reader-custom-playlist-field-save">
                <label class="reader-custom-playlist-field-label visually-hidden">Save</label>
                <button
                  type="button"
                  class="reader-custom-playlist-btn is-play reader-custom-playlist-save-btn"
                  :disabled="playlistEditorSaving || !playlistEditorHasChanges"
                  @click="savePlaylistChanges"
                >
                  <i class="bi bi-check2-circle me-1" aria-hidden="true"></i>
                  Save changes
                </button>
              </div>
            </div>
          </div>

          <div class="reader-custom-playlist-items-card">
            <div class="reader-custom-playlist-bulk-bar">
              <div class="reader-custom-playlist-bulk-meta">
                <span>{{ customPlaylistItemCount }} ayah{{ customPlaylistItemCount === 1 ? "" : "s" }}</span>
                <span class="reader-custom-playlist-bulk-selected">{{ selectedPlaylistItemCount }} selected</span>
                <span class="reader-custom-playlist-bulk-status" role="status" aria-label="Auto-save reorder is on">
                  <i class="bi bi-arrow-left-right" aria-hidden="true"></i>
                  Auto-save reorder: On
                </span>
              </div>
              <div class="reader-custom-playlist-bulk-actions">
                <div class="reader-custom-playlist-bulk-actions-group" role="group" aria-label="Playlist quick actions">
                  <button
                    type="button"
                    class="reader-custom-playlist-btn reader-custom-playlist-icon-btn"
                    :aria-label="allActivePlaylistItemsSelected ? 'Clear all selected playlist items' : 'Select all playlist items'"
                    :title="allActivePlaylistItemsSelected ? 'Clear selection' : 'Select all'"
                    @click="toggleAllActivePlaylistSelections"
                  >
                    <i class="bi" :class="allActivePlaylistItemsSelected ? 'bi-x-square' : 'bi-check2-square'" aria-hidden="true"></i>
                    <span class="reader-custom-playlist-tool-label">{{ allActivePlaylistItemsSelected ? "Clear all" : "Select all" }}</span>
                  </button>
                  <button
                    type="button"
                    class="reader-custom-playlist-btn reader-custom-playlist-icon-btn"
                    :aria-label="isPlaylistAyahListCollapsed ? 'Expand ayah list' : 'Collapse ayah list'"
                    :title="isPlaylistAyahListCollapsed ? 'Expand list' : 'Collapse list'"
                    @click="togglePlaylistAyahListCollapsed"
                  >
                    <i class="bi" :class="isPlaylistAyahListCollapsed ? 'bi-chevron-down' : 'bi-chevron-up'" aria-hidden="true"></i>
                    <span class="reader-custom-playlist-tool-label">{{ isPlaylistAyahListCollapsed ? "Expand list" : "Collapse list" }}</span>
                  </button>
                  <button
                    type="button"
                    class="reader-custom-playlist-btn is-remove reader-custom-playlist-icon-btn"
                    :disabled="bulkDeleteBusy || !hasSelectedPlaylistItems"
                    aria-label="Delete selected playlist items"
                    title="Delete selected"
                    @click="removeSelectedPlaylistItems"
                  >
                    <i class="bi bi-trash" aria-hidden="true"></i>
                    <span class="reader-custom-playlist-tool-label">Delete selected</span>
                  </button>
                </div>
              </div>
            </div>

            <div v-if="loadingItems" class="reader-custom-playlist-empty">
              <p class="mb-0">Loading playlist ayahs...</p>
            </div>
            <div v-else-if="itemsError" class="reader-custom-playlist-empty is-error">
              <p class="mb-0">{{ itemsError }}</p>
            </div>
            <div v-else-if="!customPlaylistAyahItems.length" class="reader-custom-playlist-empty">
              <p class="mb-2">No ayahs saved yet.</p>
              <button
                type="button"
                class="reader-custom-playlist-btn is-add-surah"
                @click="closePlaylistAndBrowse"
              >
                Browse to add ayahs
              </button>
            </div>
            <template v-else>
              <div v-if="customPlaylistAyahItems.length <= 1" class="reader-custom-playlist-guidance">
                <div class="reader-custom-playlist-guidance-art" aria-hidden="true">
                  <i class="bi bi-compass"></i>
                </div>
                <div class="reader-custom-playlist-guidance-copy">
                  <h5 class="mb-1">Build your flow</h5>
                  <p class="mb-0">Add a few more ayahs to unlock smoother playback and easier reorder patterns.</p>
                </div>
                <button
                  type="button"
                  class="reader-custom-playlist-btn is-add-surah reader-custom-playlist-guidance-btn"
                  @click="closePlaylistAndBrowse"
                >
                  <i class="bi bi-plus-circle me-1" aria-hidden="true"></i>
                  Add more ayahs
                </button>
              </div>

              <div class="reader-custom-playlist-list-tools">
                <div class="reader-custom-playlist-search-wrap reader-custom-playlist-search-wrap--items">
                  <i class="bi bi-search reader-custom-playlist-search-icon" aria-hidden="true"></i>
                  <input
                    v-model.trim="playlistAyahSearchQuery"
                    type="search"
                    class="form-control reader-custom-playlist-search-input"
                    placeholder="Search ayahs in this playlist"
                    aria-label="Search ayahs in active playlist"
                  >
                  <button
                    v-if="playlistAyahSearchQuery"
                    type="button"
                    class="reader-custom-playlist-search-clear"
                    aria-label="Clear ayah search"
                    @click="playlistAyahSearchQuery = ''"
                  >
                    <i class="bi bi-x-lg" aria-hidden="true"></i>
                  </button>
                </div>
                <div class="reader-custom-playlist-filter-wrap">
                  <label class="reader-custom-playlist-filter-label mb-0" for="playlistAyahFilterMode">Show</label>
                  <select
                    id="playlistAyahFilterMode"
                    v-model="playlistAyahFilterMode"
                    class="form-select reader-custom-playlist-filter-select"
                    aria-label="Show playlist ayahs by filter"
                  >
                    <option value="all">All ayahs</option>
                    <option value="selected">Selected only</option>
                  </select>
                </div>
              </div>

              <div
                v-if="!isPlaylistAyahListCollapsed"
                class="reader-custom-playlist-list-scroll"
                :class="{ 'is-scroll-limited': shouldLimitPlaylistAyahListScroll }"
              >
                <article
                  v-for="item in filteredOrderedCustomPlaylistAyahItems"
                  :key="item.id"
                  class="reader-custom-playlist-item"
                  :class="{ 'is-selected': isPlaylistItemSelected(item.id) }"
                  @click="togglePlaylistItemSelection(item.id)"
                >
                  <div class="reader-custom-playlist-item-select">
                    <span class="reader-custom-playlist-drag-handle reader-custom-playlist-drag-handle--leading" aria-hidden="true" title="Selectable item">
                      <i class="bi bi-grip-horizontal"></i>
                    </span>
                    <input
                      type="checkbox"
                      class="form-check-input reader-custom-playlist-checkbox"
                      :checked="isPlaylistItemSelected(item.id)"
                      :aria-label="`Select ${getCustomPlaylistItemMain(item)}`"
                      @click.stop="togglePlaylistItemSelection(item.id)"
                    >
                  </div>
                  <div class="reader-custom-playlist-item-text">
                    <div class="reader-custom-playlist-item-primary">
                      <div class="reader-custom-playlist-item-latin-wrap">
                        <span class="reader-custom-playlist-item-ref">
                          {{ item.surahNumber && item.ayahNumber ? `${item.surahNumber}:${item.ayahNumber}` : "Ayah" }}
                        </span>
                        <span class="reader-custom-playlist-item-title">
                          {{ getCustomPlaylistItemMain(item) }}
                        </span>
                      </div>
                      <span
                        v-if="getCustomPlaylistItemArabicName(item)"
                        class="reader-custom-playlist-item-arabic"
                        dir="rtl"
                      >
                        {{ getCustomPlaylistItemArabicName(item) }}
                      </span>
                    </div>
                    <span v-if="getCustomPlaylistItemMeta(item)" class="reader-custom-playlist-item-desc">
                      {{ getCustomPlaylistItemMeta(item) }}
                    </span>
                  </div>
                  <div class="reader-custom-playlist-item-actions">
                    <button
                      type="button"
                      class="reader-custom-playlist-btn is-play reader-custom-playlist-icon-btn"
                      aria-label="Open ayah"
                      title="Open ayah"
                      @click.stop="openPlaylistItem(item)"
                    >
                      <i class="bi bi-play-fill" aria-hidden="true"></i>
                    </button>
                  </div>
                </article>

                <div
                  v-if="!filteredOrderedCustomPlaylistAyahItems.length"
                  class="reader-custom-playlist-empty reader-custom-playlist-empty-filtered"
                >
                  <p class="mb-0">No ayahs match the current search or filter.</p>
                </div>
              </div>
              <div v-else class="reader-custom-playlist-list-collapsed-note">
                Ayah list is collapsed.
              </div>
            </template>
          </div>
        </section>

        <section v-else class="reader-custom-playlist-content reader-custom-playlist-content-empty">
          <div class="reader-custom-playlist-empty-state">
            <h4 class="mb-1">No playlist selected</h4>
            <p class="mb-0">Create a playlist to start saving surahs and ayahs.</p>
            <button
              type="button"
              class="reader-custom-playlist-btn is-add-surah mt-2"
              :disabled="createPlaylistSaving"
              @click="openCreatePlaylistModal"
            >
              <i class="bi bi-plus-circle me-1" aria-hidden="true"></i>
              Create first playlist
            </button>
          </div>
        </section>
      </div>
    </div>

    <div
      v-if="showCreatePlaylistModal"
      class="playlist-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Create playlist"
      @click.self="closeCreatePlaylistModal"
    >
      <div class="playlist-modal-card ltr-text" @click.stop>
        <div class="playlist-modal-header">
          <div>
            <h5 class="mb-1"><strong>Create playlist</strong></h5>
            <p class="mb-0 text-muted">Enter a name for your new playlist.</p>
          </div>
          <button
            type="button"
            class="reader-custom-playlist-close"
            aria-label="Close create playlist modal"
            @click="closeCreatePlaylistModal"
          >
            <i class="bi bi-x-lg" aria-hidden="true"></i>
          </button>
        </div>

        <div class="reader-custom-playlist-meta">
          <div class="reader-custom-playlist-field">
            <label class="reader-custom-playlist-field-label">Title</label>
            <input
              v-model.trim="newPlaylistName"
              type="text"
              class="form-control reader-custom-playlist-input"
              placeholder="My playlist"
              @keyup.enter="createPlaylist"
            >
          </div>
        </div>

        <div class="playlist-modal-actions mt-3">
          <button type="button" class="reader-custom-playlist-btn" :disabled="createPlaylistSaving" @click="closeCreatePlaylistModal">Cancel</button>
          <button type="button" class="reader-custom-playlist-btn is-play" :disabled="createPlaylistSaving || !newPlaylistName" @click="createPlaylist">
            <span v-if="createPlaylistSaving" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span v-else>Create playlist</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "PlaylistComponent",
  data() {
    return {
      loading: false,
      loadingItems: false,
      playlists: [],
      activePlaylistId: "",
      playlistSearchQuery: "",
      playlistAyahSearchQuery: "",
      playlistAyahFilterMode: "all",
      selectedPlaylistItemIds: [],
      isPlaylistAyahListCollapsed: false,
      isPlaylistEditorVisible: false,
      playlistEditorName: "",
      playlistEditorSaving: false,
      playlistDeleteBusy: false,
      bulkDeleteBusy: false,
      showCreatePlaylistModal: false,
      newPlaylistName: "",
      createPlaylistSaving: false,
      error: "",
      itemsError: "",
      playlistInstanceId: `playlist-admin-${Math.random().toString(36).slice(2)}`,
      playlistEventHandler: null,
      playlistStorageHandler: null,
      visibilityHandler: null,
    };
  },
  computed: {
    hasAnyPlaylist() {
      return this.playlists.length > 0;
    },
    sortedCustomPlaylists() {
      return [...this.playlists].sort((a, b) => {
        const da = new Date(a?.updated_at || 0).getTime();
        const db = new Date(b?.updated_at || 0).getTime();
        return db - da;
      });
    },
    filteredCustomPlaylists() {
      const query = String(this.playlistSearchQuery || "").trim().toLowerCase();
      if (!query) return this.sortedCustomPlaylists;
      return this.sortedCustomPlaylists.filter((playlist) => {
        const name = String(playlist?.name || "").toLowerCase();
        const count = String(this.playlistItemCountLabel(playlist)).toLowerCase();
        return `${name} ${count}`.includes(query);
      });
    },
    activePlaylist() {
      const id = String(this.activePlaylistId || "");
      return this.playlists.find((playlist) => String(playlist?.id || "") === id) || null;
    },
    activePlaylistSubtitle() {
      const name = String(this.activePlaylist?.name || "").trim();
      if (!name) return "Playlist ready for ayah management.";
      return `${name.toLowerCase()} playlist`;
    },
    customPlaylistAyahItems() {
      return Array.isArray(this.activePlaylist?.items) ? [...this.activePlaylist.items] : [];
    },
    customPlaylistItemCount() {
      return this.customPlaylistAyahItems.length;
    },
    shouldLimitPlaylistAyahListScroll() {
      return this.customPlaylistItemCount > 4;
    },
    selectedPlaylistItemCount() {
      const ids = new Set(this.customPlaylistAyahItems.map((item) => String(item.id)));
      return this.selectedPlaylistItemIds.filter((id) => ids.has(String(id))).length;
    },
    hasSelectedPlaylistItems() {
      return this.selectedPlaylistItemCount > 0;
    },
    allActivePlaylistItemsSelected() {
      return this.customPlaylistAyahItems.length > 0 && this.selectedPlaylistItemCount === this.customPlaylistAyahItems.length;
    },
    playlistEditorHasChanges() {
      if (!this.activePlaylist) return false;
      const currentName = String(this.activePlaylist?.name || "").trim();
      const nextName = String(this.playlistEditorName || "").trim();
      if (!nextName) return false;
      return currentName !== nextName;
    },
    filteredOrderedCustomPlaylistAyahItems() {
      const query = String(this.playlistAyahSearchQuery || "").trim().toLowerCase();
      const mode = String(this.playlistAyahFilterMode || "all");
      const selected = new Set(this.selectedPlaylistItemIds.map((id) => String(id)));

      let rows = [...this.customPlaylistAyahItems].sort((a, b) => Number(a.position || 0) - Number(b.position || 0));

      if (mode === "selected") {
        rows = rows.filter((item) => selected.has(String(item.id)));
      }

      if (query) {
        rows = rows.filter((item) => {
          const searchable = [
            item.surahName,
            item.surahArabicName,
            item.ayahNumber,
            item.surahNumber,
            item.ayahArabic,
            item.ayahTranslation,
            item.description,
          ]
            .map((value) => String(value || "").toLowerCase())
            .join(" ");
          return searchable.includes(query);
        });
      }

      return rows;
    },
  },
  async mounted() {
    await this.fetchPlaylists();
    this.playlistEventHandler = (event) => this.handlePlaylistsUpdated(event);
    this.playlistStorageHandler = (event) => this.handleStoragePlaylistsUpdated(event);
    this.visibilityHandler = () => this.handleVisibilityChange();
    window.addEventListener("bookmarks-updated", this.playlistEventHandler);
    window.addEventListener("storage", this.playlistStorageHandler);
    window.addEventListener("visibilitychange", this.visibilityHandler);
  },
  beforeUnmount() {
    if (this.playlistEventHandler) {
      window.removeEventListener("bookmarks-updated", this.playlistEventHandler);
    }
    if (this.playlistStorageHandler) {
      window.removeEventListener("storage", this.playlistStorageHandler);
    }
    if (this.visibilityHandler) {
      window.removeEventListener("visibilitychange", this.visibilityHandler);
    }
  },
  methods: {
    closePanel() {
      window.location.href = "/dashboard";
    },
    playlistItemCountLabel(playlist) {
      if (!playlist) return 0;
      if (playlist.itemsLoaded) return Array.isArray(playlist.items) ? playlist.items.length : 0;
      return Number(playlist.ayah_count || 0);
    },
    getPlaylistAccentColor(playlist) {
      const palette = {
        primary: "#0d6efd",
        secondary: "#6c757d",
        success: "#198754",
        danger: "#dc3545",
        warning: "#ffc107",
        info: "#0dcaf0",
        dark: "#212529",
        light: "#adb5bd",
      };
      const color = String(playlist?.color || "").toLowerCase();
      return palette[color] || "#b87f2a";
    },
    stripHtmlTags(text) {
      if (!text) return "";
      const div = document.createElement("div");
      div.innerHTML = text;
      return div.textContent || div.innerText || "";
    },
    normalizePlaylistItem(row, source, folderId, index = 0) {
      if (source === "smart") {
        const surahNumber = Number(row?.surah_id || row?.surah?.id || 0);
        const ayahNumber = Number(row?.ayah_id || row?.ayah_number || 0);
        if (!surahNumber || !ayahNumber) return null;
        return {
          id: `smart-${folderId}-${row?.id || `${surahNumber}-${ayahNumber}-${index}`}`,
          bookmarkId: null,
          position: index,
          source: "smart",
          surahNumber,
          ayahNumber,
          surahName: String(row?.surah?.name_en || `Surah ${surahNumber}`),
          surahArabicName: String(row?.surah?.name_ar || ""),
          ayahArabic: String(row?.ayah_text || ""),
          ayahTranslation: "",
          description: "",
        };
      }

      const surahNumber = Number(row?.surah_number || row?.ayah?.surah_id || 0);
      const ayahNumber = Number(row?.ayah_number || row?.ayah_num || row?.ayah?.ayah_id || 0);
      if (!surahNumber || !ayahNumber) return null;

      return {
        id: `bookmark-${row?.id || `${folderId}-${surahNumber}-${ayahNumber}-${index}`}`,
        bookmarkId: row?.id || null,
        position: index,
        source: "manual",
        surahNumber,
        ayahNumber,
        surahName: String(row?.surah_name || row?.ayah?.surah?.name_en || `Surah ${surahNumber}`),
        surahArabicName: String(row?.ayah?.surah?.name_ar || ""),
        ayahArabic: String(row?.ayah_verse_ar || row?.ayah?.ayah_text || ""),
        ayahTranslation: String(row?.ayah_verse_en || ""),
        description: "",
      };
    },
    getCustomPlaylistItemMain(item) {
      if (!item) return "Ayah";
      const name = String(item?.surahName || "").trim();
      return name || `Surah ${item?.surahNumber || ""}`;
    },
    getCustomPlaylistItemArabicName(item) {
      const value = String(item?.surahArabicName || "").trim();
      if (value) return value;
      return "";
    },
    getCustomPlaylistItemMeta(item) {
      const translation = this.stripHtmlTags(String(item?.ayahTranslation || "")).replace(/\s+/g, " ").trim();
      if (!translation) return "";
      return translation.length > 120 ? `${translation.slice(0, 117)}...` : translation;
    },
    isPlaylistItemSelected(itemId) {
      return this.selectedPlaylistItemIds.includes(String(itemId));
    },
    togglePlaylistItemSelection(itemId) {
      const id = String(itemId);
      const index = this.selectedPlaylistItemIds.indexOf(id);
      if (index > -1) {
        this.selectedPlaylistItemIds.splice(index, 1);
      } else {
        this.selectedPlaylistItemIds.push(id);
      }
    },
    toggleAllActivePlaylistSelections() {
      if (this.allActivePlaylistItemsSelected) {
        this.selectedPlaylistItemIds = [];
        return;
      }
      this.selectedPlaylistItemIds = this.customPlaylistAyahItems.map((item) => String(item.id));
    },
    togglePlaylistAyahListCollapsed() {
      this.isPlaylistAyahListCollapsed = !this.isPlaylistAyahListCollapsed;
    },
    openPlaylistItem(item) {
      const surah = Number(item?.surahNumber || 0);
      const ayah = Number(item?.ayahNumber || 0);
      if (!surah || !ayah) return;
      window.open(`/surat?surah=${surah}&ayah=${ayah}`, "_blank", "noopener");
    },
    closePlaylistAndBrowse() {
      window.open("/surat", "_blank", "noopener");
    },
    async fetchPlaylists(options = {}) {
      const { forceActiveItems = false } = options;
      this.loading = true;
      this.error = "";

      try {
        const { data } = await axios.get("/api/folders");
        const rows = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];

        const previous = new Map(this.playlists.map((playlist) => [String(playlist.id), playlist]));

        this.playlists = rows.map((row) => {
          const id = String(row?.id || "");
          const existing = previous.get(id);
          return {
            id,
            name: String(row?.name || ""),
            icon: String(row?.icon || "bi bi-music-note-list"),
            color: String(row?.color || "success"),
            is_smart: !!row?.is_smart,
            ayah_count: Number(row?.ayah_count || 0),
            updated_at: row?.updated_at || null,
            shared_token: row?.shared_token || null,
            items: Array.isArray(existing?.items) ? existing.items : [],
            itemsLoaded: !!existing?.itemsLoaded,
            source: existing?.source || (row?.is_smart ? "smart" : "manual"),
          };
        });

        if (!this.playlists.length) {
          this.activePlaylistId = "";
          this.selectedPlaylistItemIds = [];
          this.isPlaylistEditorVisible = false;
          return;
        }

        const activeExists = this.playlists.some((playlist) => String(playlist.id) === String(this.activePlaylistId));
        this.activePlaylistId = activeExists ? String(this.activePlaylistId) : String(this.playlists[0].id);

        await this.fetchPlaylistItems(this.activePlaylistId, { force: forceActiveItems });
      } catch (error) {
        this.error = error?.response?.data?.message || "Could not load playlists right now.";
        this.playlists = [];
        this.activePlaylistId = "";
      } finally {
        this.loading = false;
      }
    },
    async fetchPlaylistItems(playlistId, options = {}) {
      const { force = false } = options;
      const id = String(playlistId || "");
      if (!id) return;

      const playlist = this.playlists.find((row) => String(row.id) === id);
      if (!playlist) return;

      if (playlist.itemsLoaded && !force) {
        this.itemsError = "";
        return;
      }

      this.loadingItems = true;
      this.itemsError = "";
      this.selectedPlaylistItemIds = [];
      this.playlistAyahSearchQuery = "";
      this.playlistAyahFilterMode = "all";

      try {
        const { data } = await axios.get(`/api/folders/${id}/bookmarks`);
        const rows = Array.isArray(data?.data) ? data.data : [];
        const source = String(data?.source || (playlist.is_smart ? "smart" : "manual"));

        playlist.items = rows
          .map((row, index) => this.normalizePlaylistItem(row, source, id, index))
          .filter(Boolean);
        playlist.itemsLoaded = true;
        playlist.source = source;
      } catch (error) {
        this.itemsError = error?.response?.data?.message || "Could not load playlist ayahs.";
        playlist.items = [];
        playlist.itemsLoaded = true;
      } finally {
        this.loadingItems = false;
      }
    },
    async selectPlaylist(playlistId) {
      this.activePlaylistId = String(playlistId || "");
      this.isPlaylistEditorVisible = false;
      this.isPlaylistAyahListCollapsed = false;
      this.playlistEditorName = "";
      await this.fetchPlaylistItems(this.activePlaylistId);
    },
    togglePlaylistEditor() {
      if (!this.activePlaylist) return;
      this.isPlaylistEditorVisible = !this.isPlaylistEditorVisible;
      if (this.isPlaylistEditorVisible) {
        this.playlistEditorName = String(this.activePlaylist?.name || "");
      }
    },
    async savePlaylistChanges() {
      if (!this.activePlaylist || !this.playlistEditorHasChanges) return;

      const name = String(this.playlistEditorName || "").trim();
      if (!name) return;

      this.playlistEditorSaving = true;
      try {
        await axios.put(`/api/folders/${this.activePlaylist.id}`, {
          name,
        });

        const current = this.playlists.find((playlist) => String(playlist.id) === String(this.activePlaylist.id));
        if (current) {
          current.name = name;
          current.updated_at = new Date().toISOString();
        }

        this.isPlaylistEditorVisible = false;
        this.notifyPlaylistChange();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Playlist updated",
          timer: 1200,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error?.response?.data?.message || "Unable to update playlist",
          timer: 1400,
          showConfirmButton: false,
        });
      } finally {
        this.playlistEditorSaving = false;
      }
    },
    async removeActivePlaylist() {
      if (!this.activePlaylist) return;

      const result = await Swal.fire({
        title: "Delete playlist?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#b00020",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Delete",
      });

      if (!result.isConfirmed) return;

      this.playlistDeleteBusy = true;
      try {
        await axios.delete(`/api/folders/${this.activePlaylist.id}`);
        await this.fetchPlaylists({ forceActiveItems: true });
        this.notifyPlaylistChange();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Playlist deleted",
          timer: 1200,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error?.response?.data?.message || "Unable to delete playlist",
          timer: 1400,
          showConfirmButton: false,
        });
      } finally {
        this.playlistDeleteBusy = false;
      }
    },
    async removeSelectedPlaylistItems() {
      if (!this.activePlaylist || !this.hasSelectedPlaylistItems) return;

      const selectedSet = new Set(this.selectedPlaylistItemIds.map((id) => String(id)));
      const removable = this.customPlaylistAyahItems.filter(
        (item) => selectedSet.has(String(item.id)) && !!item.bookmarkId
      );

      if (!removable.length) {
        Swal.fire({
          icon: "info",
          title: "Nothing to delete",
          text: "Selected ayahs cannot be removed from this playlist.",
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }

      const result = await Swal.fire({
        title: "Delete selected ayahs?",
        text: `Remove ${removable.length} ayah${removable.length === 1 ? "" : "s"} from this playlist?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#b00020",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Delete selected",
      });

      if (!result.isConfirmed) return;

      this.bulkDeleteBusy = true;
      try {
        const folderId = this.activePlaylist.id;
        const tasks = removable.map((item) =>
          axios.delete(`/api/ayah-bookmarks/${item.bookmarkId}/folders/${folderId}`)
        );

        await Promise.allSettled(tasks);
        await this.fetchPlaylists({ forceActiveItems: true });
        this.notifyPlaylistChange();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Selected ayahs removed",
          timer: 1200,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error?.response?.data?.message || "Unable to remove selected ayahs",
          timer: 1400,
          showConfirmButton: false,
        });
      } finally {
        this.bulkDeleteBusy = false;
        this.selectedPlaylistItemIds = [];
      }
    },
    openCreatePlaylistModal() {
      this.newPlaylistName = "";
      this.showCreatePlaylistModal = true;
    },
    closeCreatePlaylistModal() {
      if (this.createPlaylistSaving) return;
      this.showCreatePlaylistModal = false;
    },
    async createPlaylist() {
      const name = String(this.newPlaylistName || "").trim();
      if (!name) return;

      this.createPlaylistSaving = true;
      try {
        const response = await axios.post("/api/folders", {
          name,
          icon: "bi bi-music-note-list",
          color: "success",
          is_smart: false,
        });

        const createdId = String(response?.data?.folder?.id || "");

        this.showCreatePlaylistModal = false;
        this.newPlaylistName = "";

        await this.fetchPlaylists({ forceActiveItems: true });

        if (createdId) {
          this.activePlaylistId = createdId;
          await this.fetchPlaylistItems(createdId, { force: true });
        }

        this.notifyPlaylistChange();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Playlist created",
          timer: 1200,
          showConfirmButton: false,
        });
      } catch (error) {
        const apiMessage = error?.response?.data?.message || error?.response?.data?.errors?.name?.[0];
        Swal.fire({
          icon: "error",
          title: apiMessage || "Unable to create playlist",
          timer: 1500,
          showConfirmButton: false,
        });
      } finally {
        this.createPlaylistSaving = false;
      }
    },
    notifyPlaylistChange(source = this.playlistInstanceId) {
      const token = `${Date.now()}-${source}`;
      try {
        localStorage.setItem("bookmarkRefresh", token);
      } catch (_) {
        // ignore storage errors
      }

      window.dispatchEvent(
        new CustomEvent("bookmarks-updated", {
          detail: { token, instance: source },
        })
      );
    },
    handlePlaylistsUpdated(event) {
      if (event?.detail?.instance === this.playlistInstanceId) return;
      this.fetchPlaylists();
    },
    handleStoragePlaylistsUpdated(event) {
      if (event.key !== "bookmarkRefresh") return;
      this.fetchPlaylists();
    },
    handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        this.fetchPlaylists();
      }
    },
  },
};
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
}

.playlist-admin-shell {
  padding-top: 1rem;
}

.reader-custom-playlist-panel {
  --playlist-dominant: #0b6b59;
  --playlist-dominant-strong: #085446;
  --playlist-accent: #b78c49;
  --playlist-danger: #8f3f4d;
  --playlist-ink: #113a31;
  --playlist-muted: #4c665e;
  --playlist-border: #9fb8af;
  --playlist-surface: #f8fcfa;
  --playlist-surface-soft: #edf5f1;
  --playlist-noise: rgba(11, 61, 46, 0.05);
  margin-top: 8px;
  border: 1px solid var(--playlist-border);
  border-radius: 16px;
  background: linear-gradient(145deg, #e5efe9 0%, #dbe9e3 56%, #edf4f0 100%);
  padding: 18px;
  position: relative;
  overflow: hidden;
}

.reader-custom-playlist-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 1px 1px, var(--playlist-noise) 1px, transparent 0);
  background-size: 8px 8px;
  opacity: 0.62;
  pointer-events: none;
}

.reader-custom-playlist-panel::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(120% 86% at 100% 0%, rgba(183, 140, 73, 0.15) 0%, rgba(183, 140, 73, 0) 62%),
    repeating-conic-gradient(from 45deg at 78% 24%, rgba(11, 61, 46, 0.045) 0deg 12deg, transparent 12deg 24deg);
  opacity: 0.5;
  pointer-events: none;
}

.reader-custom-playlist-panel > * {
  position: relative;
  z-index: 1;
}

.reader-custom-playlist-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 14px;
}

.reader-custom-playlist-header-copy {
  min-width: 0;
}

.reader-custom-playlist-title-row {
  display: inline-flex;
  align-items: center;
  gap: 0;
}

.reader-custom-playlist-title {
  font-size: 1.14rem;
  color: var(--playlist-ink);
  font-family: "Fraunces", "Playfair Display", Georgia, serif;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.01em;
}

.reader-custom-playlist-subtitle {
  font-size: 0.82rem;
  color: var(--playlist-muted);
  font-family: "Manrope", "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  line-height: 1.45;
  margin-top: 3px;
}

.reader-custom-playlist-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  border-radius: 999px;
  padding: 0 11px;
  font-size: 0.79rem;
  font-weight: 700;
  color: var(--playlist-ink);
  background: #dfede8;
  border: 1px solid #b4cfc5;
  white-space: nowrap;
}

.reader-custom-playlist-header-actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.reader-custom-playlist-close {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #9fb9b0;
  background: var(--playlist-surface);
  color: #1d433a;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.16s ease, border-color 0.16s ease, color 0.16s ease;
}

.reader-custom-playlist-close:hover,
.reader-custom-playlist-close:focus-visible {
  background: #e6f2ed;
  border-color: #7ea396;
  color: #0f332b;
}

.reader-custom-playlist-layout {
  display: grid;
  grid-template-columns: minmax(220px, 260px) minmax(0, 1fr);
  gap: 14px;
}

.reader-custom-playlist-nav {
  border: 1px solid #aabfb7;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.62);
  padding: 11px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 100%;
  backdrop-filter: blur(3px);
}

.reader-custom-playlist-nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.reader-custom-playlist-nav-add {
  min-height: 36px;
  padding: 0.38rem 0.76rem;
  font-size: 0.83rem;
}

.reader-custom-playlist-nav-tools {
  display: grid;
  gap: 6px;
}

.reader-custom-playlist-search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.reader-custom-playlist-search-icon {
  position: absolute;
  left: 10px;
  color: #4a6960;
  font-size: 0.8rem;
  pointer-events: none;
}

.reader-custom-playlist-search-input {
  min-height: 38px;
  border-radius: 10px;
  border: 1px solid #b7cbc3;
  background: #ffffff;
  color: #173a31;
  font-size: 0.82rem;
  font-weight: 600;
  font-family: "Manrope", "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  padding: 0.42rem 2rem 0.42rem 1.9rem;
}

.reader-custom-playlist-search-input:focus {
  border-color: var(--playlist-dominant);
  box-shadow: 0 0 0 0.16rem rgba(11, 107, 89, 0.15);
}

.reader-custom-playlist-search-clear {
  position: absolute;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  border: 1px solid transparent;
  background: transparent;
  color: #4a6a60;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.reader-custom-playlist-search-clear:hover,
.reader-custom-playlist-search-clear:focus-visible {
  border-color: #b3c8c0;
  background: #f2f7f5;
  color: #1f4d42;
}

.reader-custom-playlist-nav-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 2px;
}

.reader-custom-playlist-nav-item {
  border: 1px solid #b5cac2;
  border-radius: 10px;
  background: #ffffff;
  color: var(--playlist-ink);
  min-height: 40px;
  padding: 0.45rem 0.6rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  transition: background-color 0.16s ease, border-color 0.16s ease, color 0.16s ease,
    box-shadow 0.16s ease, transform 0.16s ease;
}

.reader-custom-playlist-nav-item:hover,
.reader-custom-playlist-nav-item:focus-visible {
  border-color: #83a69b;
  background: #ebf4f0;
  box-shadow: 0 4px 12px rgba(13, 60, 51, 0.09);
  transform: translateY(-1px);
}

.reader-custom-playlist-nav-item.is-active {
  border-color: var(--playlist-dominant);
  background: var(--playlist-dominant);
  color: #ffffff;
  box-shadow: 0 8px 18px rgba(11, 107, 89, 0.23);
}

.reader-custom-playlist-nav-item-main {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
}

.reader-custom-playlist-nav-item-accent {
  width: 8px;
  height: 20px;
  border-radius: 999px;
  flex-shrink: 0;
}

.reader-custom-playlist-nav-item-icon {
  font-size: 0.78rem;
  opacity: 0.84;
  flex-shrink: 0;
}

.reader-custom-playlist-nav-item.is-active .reader-custom-playlist-nav-item-accent {
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.45);
}

.reader-custom-playlist-nav-item.is-active .reader-custom-playlist-nav-item-icon {
  opacity: 1;
}

.reader-custom-playlist-nav-item-name {
  font-size: 0.84rem;
  font-weight: 700;
  font-family: "Plus Jakarta Sans", "Manrope", "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.reader-custom-playlist-nav-item-count {
  min-width: 22px;
  height: 22px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #edf7f4;
  color: #15574a;
  border: 1px solid #cfe4dc;
}

.reader-custom-playlist-nav-item.is-active .reader-custom-playlist-nav-item-count {
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.34);
}

.reader-custom-playlist-content {
  border: 1px solid #a7beb5;
  border-radius: 14px;
  background: var(--playlist-surface-soft);
  padding: 14px;
  display: grid;
  gap: 12px;
}

.reader-custom-playlist-content-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

.reader-custom-playlist-content-title-row {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.reader-custom-playlist-content-actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.reader-custom-playlist-content-title {
  font-size: 1.14rem;
  font-weight: 700;
  color: var(--playlist-ink);
  font-family: "Fraunces", "Playfair Display", Georgia, serif;
  line-height: 1.2;
}

.reader-custom-playlist-content-badge {
  border-radius: 999px;
  border: 1px solid #ddc7a3;
  background: #f6ebd6;
  color: #6e5324;
  font-size: 0.74rem;
  font-weight: 700;
  padding: 0.2rem 0.56rem;
  white-space: nowrap;
}

.reader-custom-playlist-content-subtitle {
  font-size: 0.8rem;
  color: var(--playlist-muted);
  margin-top: 4px;
  line-height: 1.4;
  font-family: "Manrope", "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
}

.reader-custom-playlist-editor-card,
.reader-custom-playlist-items-card {
  border: 1px solid #b6cbc3;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.72);
  padding: 12px;
}

.reader-custom-playlist-items-card {
  display: grid;
  gap: 8px;
}

.reader-custom-playlist-content-empty {
  display: flex;
  align-items: center;
  justify-content: center;
}

.reader-custom-playlist-empty-state {
  width: 100%;
  border: 1px dashed #c6d7d1;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  color: #5a6964;
  background: #ffffff;
}

.reader-custom-playlist-empty-state h4 {
  font-size: 1rem;
  color: #1f3f36;
  font-weight: 700;
  font-family: "Fraunces", "Playfair Display", Georgia, serif;
}

.reader-custom-playlist-empty-inline {
  font-size: 0.8rem;
  color: #5d6b67;
  padding: 0.35rem 0.2rem;
}

.reader-custom-playlist-empty-inline.is-error {
  color: #8f3f4d;
}

.reader-custom-playlist-meta {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
}

.reader-custom-playlist-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.reader-custom-playlist-field-label {
  font-size: 0.79rem;
  font-weight: 700;
  color: #22453c;
  margin: 0;
  font-family: "Plus Jakarta Sans", "Manrope", "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
}

.reader-custom-playlist-field-save {
  justify-content: flex-end;
  display: inline-flex;
  align-items: flex-end;
  gap: 8px;
}

.reader-custom-playlist-save-btn {
  min-width: 120px;
}

.reader-custom-playlist-input {
  min-height: 38px;
  border-radius: 10px;
  border: 1px solid #bfcfc9;
  background: #fbfefd;
  font-weight: 600;
  font-size: 0.86rem;
  color: #173a31;
  font-family: "Manrope", "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  box-shadow: inset 0 1px 0 rgba(15, 47, 40, 0.04);
}

.reader-custom-playlist-input:focus {
  border-color: var(--playlist-dominant);
  background: #ffffff;
  box-shadow: 0 0 0 0.2rem rgba(11, 107, 89, 0.15);
}

.reader-custom-playlist-btn {
  border-radius: 10px;
  padding: 0.44rem 0.88rem;
  font-weight: 700;
  font-size: 0.84rem;
  min-height: 38px;
  border: 1px solid #cfdad5;
  background: #ffffff;
  color: #1f3f36;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  white-space: nowrap;
  font-family: "Plus Jakarta Sans", "Manrope", "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  transition: background-color 0.16s ease, border-color 0.16s ease, color 0.16s ease;
}

.reader-custom-playlist-btn:hover,
.reader-custom-playlist-btn:focus-visible {
  border-color: #b7c9c2;
  background: #f3f7f5;
}

.reader-custom-playlist-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.reader-custom-playlist-btn.is-add-surah {
  background: var(--playlist-dominant);
  border-color: var(--playlist-dominant);
  color: #ffffff;
}

.reader-custom-playlist-btn.is-add-surah:hover,
.reader-custom-playlist-btn.is-add-surah:focus-visible {
  background: var(--playlist-dominant-strong);
  border-color: var(--playlist-dominant-strong);
  color: #ffffff;
}

.reader-custom-playlist-btn.is-clear {
  background: #fff6f8;
  border-color: #e6c2ca;
  color: var(--playlist-danger);
}

.reader-custom-playlist-btn.is-clear:hover,
.reader-custom-playlist-btn.is-clear:focus-visible {
  background: #ffeef2;
  border-color: #dba7b2;
  color: #793341;
}

.reader-custom-playlist-bulk-bar {
  border: 1px solid #b7cbc4;
  border-radius: 13px;
  background: #e2efea;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 4px;
}

.reader-custom-playlist-bulk-meta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 0.76rem;
  color: #35574e;
  font-weight: 700;
  font-family: "Plus Jakarta Sans", "Manrope", "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
}

.reader-custom-playlist-bulk-selected {
  border-radius: 999px;
  padding: 0.18rem 0.52rem;
  background: #d7e8e2;
  border: 1px solid #adc7be;
  color: #20493f;
}

.reader-custom-playlist-bulk-status {
  border-radius: 999px;
  padding: 0.18rem 0.52rem;
  background: #ecf4f0;
  border: 1px solid #bcd1c8;
  color: #1f4c41;
  display: inline-flex;
  align-items: center;
  gap: 0.32rem;
}

.reader-custom-playlist-bulk-actions {
  display: inline-flex;
  align-items: center;
}

.reader-custom-playlist-bulk-actions-group {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 10px;
  border: 1px solid #cadad4;
  background: #f8fcfa;
  padding: 3px;
}

.reader-custom-playlist-bulk-actions-group .reader-custom-playlist-icon-btn {
  width: auto;
  min-width: 34px;
  padding-inline: 0.58rem;
  gap: 0.34rem;
}

.reader-custom-playlist-tool-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1;
}

.reader-custom-playlist-list-tools {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  margin-bottom: 4px;
}

.reader-custom-playlist-search-wrap--items .reader-custom-playlist-search-input {
  min-height: 54px;
}

.reader-custom-playlist-filter-wrap {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.reader-custom-playlist-filter-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #31554b;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.reader-custom-playlist-filter-select {
  min-height: 36px;
  min-width: 152px;
  border-radius: 10px;
  border: 1px solid #b8cdc5;
  background-color: #ffffff;
  color: #173a31;
  font-size: 0.81rem;
  font-weight: 600;
  font-family: "Manrope", "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
}

.reader-custom-playlist-filter-select:focus {
  border-color: var(--playlist-dominant);
  box-shadow: 0 0 0 0.16rem rgba(11, 107, 89, 0.15);
}

.reader-custom-playlist-guidance {
  border: 1px dashed #b8ccbf;
  border-radius: 13px;
  background: linear-gradient(130deg, #f9fcfa 0%, #f1f7f4 100%);
  padding: 12px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
}

.reader-custom-playlist-guidance-art {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  border: 1px solid #dac39c;
  background: #f9efd9;
  color: #88642c;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.reader-custom-playlist-guidance-copy {
  min-width: 0;
}

.reader-custom-playlist-guidance-copy h5 {
  font-size: 0.88rem;
  color: var(--playlist-ink);
  font-weight: 700;
  font-family: "Fraunces", "Playfair Display", Georgia, serif;
  line-height: 1.2;
}

.reader-custom-playlist-guidance-copy p {
  font-size: 0.76rem;
  color: var(--playlist-muted);
  line-height: 1.35;
}

.reader-custom-playlist-guidance-btn {
  min-height: 34px;
}

.reader-custom-playlist-icon-btn {
  width: 34px;
  min-width: 34px;
  height: 34px;
  padding: 0;
}

.reader-custom-playlist-icon-btn i {
  font-size: 0.94rem;
}

.reader-custom-playlist-list-scroll {
  display: grid;
  gap: 8px;
  align-content: flex-start;
  grid-auto-rows: min-content;
}

.reader-custom-playlist-list-scroll.is-scroll-limited {
  max-height: 256px;
  overflow-y: auto;
  padding-right: 2px;
}

.reader-custom-playlist-list-collapsed-note {
  border: 1px dashed #c7d6d1;
  border-radius: 10px;
  background: #f7fbf9;
  color: #4f5d58;
  font-size: 0.8rem;
  padding: 10px;
  text-align: center;
}

.reader-custom-playlist-empty {
  font-size: 0.8rem;
  color: #5a6964;
  border: 1px dashed #c8d7d2;
  border-radius: 10px;
  padding: 12px;
  background: #ffffff;
  margin: 0;
}

.reader-custom-playlist-empty.is-error {
  color: #8f3f4d;
}

.reader-custom-playlist-empty-filtered {
  margin-top: 2px;
}

.reader-custom-playlist-item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
  border: 1px solid #bfd0c9;
  border-radius: 13px;
  background: #f8fbfa;
  padding: 0.66rem 0.78rem 0.66rem 0.86rem;
  min-height: 62px;
  cursor: pointer;
  box-shadow: 0 2px 7px rgba(9, 41, 34, 0.07);
  position: relative;
  overflow: hidden;
  transition: border-color 0.16s ease, background-color 0.16s ease, box-shadow 0.16s ease,
    transform 0.16s ease;
}

.reader-custom-playlist-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: rgba(17, 58, 49, 0.18);
}

.reader-custom-playlist-item:hover {
  border-color: #93b2a8;
  background: #f1f7f4;
  box-shadow: 0 4px 14px rgba(13, 60, 51, 0.08);
  transform: translateY(-1px);
}

.reader-custom-playlist-item.is-selected {
  border-color: var(--playlist-dominant);
  background: #e6f4ee;
  box-shadow: inset 0 0 0 1px rgba(11, 107, 89, 0.18);
}

.reader-custom-playlist-item.is-selected::before {
  background: var(--playlist-dominant);
}

.reader-custom-playlist-item-select {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.44rem;
}

.reader-custom-playlist-checkbox {
  width: 0.98rem;
  height: 0.98rem;
  margin: 0;
  cursor: pointer;
}

.reader-custom-playlist-checkbox:checked {
  background-color: var(--playlist-dominant);
  border-color: var(--playlist-dominant);
}

.reader-custom-playlist-item-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 4px;
}

.reader-custom-playlist-item-primary {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
}

.reader-custom-playlist-item-latin-wrap {
  display: grid;
  gap: 1px;
  min-width: 0;
}

.reader-custom-playlist-item-ref {
  font-size: 0.69rem;
  color: #577168;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-family: "Plus Jakarta Sans", "Manrope", "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
}

.reader-custom-playlist-item-title {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.84rem;
  color: #2d5047;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  font-family: "Manrope", "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
}

.reader-custom-playlist-item-arabic {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--playlist-ink);
  font-family: "Amiri", "Noto Naskh Arabic", serif;
  font-feature-settings: "liga" 1, "calt" 1;
  line-height: 1.32;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.reader-custom-playlist-item-desc {
  font-size: 0.73rem;
  color: #4f5d58;
  line-height: 1.3;
}

.reader-custom-playlist-item-actions {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-shrink: 0;
}

.reader-custom-playlist-drag-handle {
  width: 32px;
  min-width: 32px;
  min-height: 32px;
  border-radius: 9px;
  color: #4b6d63;
  border: 1px dashed #adc3ba;
  background: #edf5f1;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.reader-custom-playlist-drag-handle--leading {
  width: 28px;
  min-width: 28px;
  min-height: 28px;
  border-style: solid;
  border-color: #c6d8d1;
  border-radius: 8px;
  background: #f3faf7;
  color: #617d73;
}

.reader-custom-playlist-item:hover .reader-custom-playlist-drag-handle {
  color: #395f54;
  background: #e2f0ea;
  border-color: #8caea2;
}

.reader-custom-playlist-item-actions .reader-custom-playlist-btn {
  min-height: 40px;
}

.reader-custom-playlist-item-actions .reader-custom-playlist-btn.is-play i {
  font-size: 1.08rem;
  line-height: 1;
}

.reader-custom-playlist-btn.is-play {
  background: linear-gradient(145deg, #0f7d68 0%, #0b6656 100%);
  color: #ffffff;
  border-color: #0a5c4c;
  border-radius: 11px;
}

.reader-custom-playlist-btn.is-play:hover,
.reader-custom-playlist-btn.is-play:focus-visible {
  background: linear-gradient(145deg, #12917a 0%, #0c705f 100%);
  border-color: #0a6252;
  color: #ffffff;
}

.reader-custom-playlist-item-actions .reader-custom-playlist-btn.is-play {
  width: 40px;
  min-width: 40px;
  height: 40px;
  border-radius: 999px;
  padding: 0;
  background: linear-gradient(145deg, #0f826d 0%, #0b6a59 56%, #085346 100%);
  border-color: #084f42;
  color: #f2fbf8;
  box-shadow: 0 8px 16px rgba(9, 78, 65, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.26);
}

.reader-custom-playlist-item-actions .reader-custom-playlist-btn.is-play:hover,
.reader-custom-playlist-item-actions .reader-custom-playlist-btn.is-play:focus-visible {
  background: linear-gradient(145deg, #15967f 0%, #0d7764 56%, #0a5f50 100%);
  border-color: #0a6454;
  color: #ffffff;
  box-shadow: 0 10px 18px rgba(9, 76, 64, 0.33), inset 0 1px 0 rgba(255, 255, 255, 0.28);
}

.reader-custom-playlist-btn.is-remove {
  background: #fff4f6;
  border-color: #e0bdc5;
  color: var(--playlist-danger);
}

.reader-custom-playlist-btn.is-remove:hover,
.reader-custom-playlist-btn.is-remove:focus-visible {
  background: #ffeef2;
  border-color: #d6a4af;
  color: #793342;
}

.playlist-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1090;
  background: rgba(11, 31, 26, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.playlist-modal-card {
  width: min(620px, 100%);
  border-radius: 14px;
  border: 1px solid #d7e3de;
  background: #ffffff;
  box-shadow: 0 18px 34px rgba(9, 28, 23, 0.24);
  padding: 16px;
}

.playlist-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.playlist-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

@media (max-width: 991.98px) {
  .reader-custom-playlist-layout {
    grid-template-columns: 1fr;
  }

  .reader-custom-playlist-nav-list {
    max-height: 180px;
  }
}

@media (max-width: 768px) {
  .reader-custom-playlist-header-actions {
    width: 100%;
    justify-content: space-between;
  }

  .reader-custom-playlist-content-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .reader-custom-playlist-content-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .reader-custom-playlist-meta {
    grid-template-columns: 1fr;
  }

  .reader-custom-playlist-field-save {
    justify-content: stretch;
    align-items: stretch;
    display: grid;
  }

  .reader-custom-playlist-save-btn {
    min-width: 0;
    width: 100%;
  }

  .reader-custom-playlist-bulk-bar {
    flex-wrap: wrap;
  }

  .reader-custom-playlist-bulk-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .reader-custom-playlist-tool-label {
    display: none;
  }

  .reader-custom-playlist-list-tools {
    grid-template-columns: 1fr;
  }

  .reader-custom-playlist-filter-wrap {
    justify-content: space-between;
  }

  .reader-custom-playlist-filter-select {
    width: 100%;
    min-width: 0;
  }

  .reader-custom-playlist-guidance {
    grid-template-columns: 1fr;
    text-align: left;
  }

  .reader-custom-playlist-guidance-art {
    width: 28px;
    height: 28px;
  }

  .reader-custom-playlist-guidance-btn {
    width: 100%;
  }

  .reader-custom-playlist-list-scroll.is-scroll-limited {
    max-height: 220px;
  }

  .reader-custom-playlist-item {
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 8px;
  }

  .reader-custom-playlist-item-primary {
    gap: 6px;
  }

  .reader-custom-playlist-item-arabic {
    font-size: 1.02rem;
  }
}

@media (max-width: 576px) {
  .reader-custom-playlist-panel {
    padding: 14px;
  }

  .reader-custom-playlist-header {
    flex-direction: column;
  }

  .reader-custom-playlist-bulk-actions-group {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
