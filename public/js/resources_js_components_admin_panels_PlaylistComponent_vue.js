"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_panels_PlaylistComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PlaylistComponent.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PlaylistComponent.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
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
      visibilityHandler: null
    };
  },
  computed: {
    hasAnyPlaylist() {
      return this.playlists.length > 0;
    },
    sortedCustomPlaylists() {
      return [...this.playlists].sort((a, b) => {
        const da = new Date((a === null || a === void 0 ? void 0 : a.updated_at) || 0).getTime();
        const db = new Date((b === null || b === void 0 ? void 0 : b.updated_at) || 0).getTime();
        return db - da;
      });
    },
    filteredCustomPlaylists() {
      const query = String(this.playlistSearchQuery || "").trim().toLowerCase();
      if (!query) return this.sortedCustomPlaylists;
      return this.sortedCustomPlaylists.filter(playlist => {
        const name = String((playlist === null || playlist === void 0 ? void 0 : playlist.name) || "").toLowerCase();
        const count = String(this.playlistItemCountLabel(playlist)).toLowerCase();
        return `${name} ${count}`.includes(query);
      });
    },
    activePlaylist() {
      const id = String(this.activePlaylistId || "");
      return this.playlists.find(playlist => String((playlist === null || playlist === void 0 ? void 0 : playlist.id) || "") === id) || null;
    },
    activePlaylistSubtitle() {
      var _this$activePlaylist;
      const name = String(((_this$activePlaylist = this.activePlaylist) === null || _this$activePlaylist === void 0 ? void 0 : _this$activePlaylist.name) || "").trim();
      if (!name) return "Playlist ready for ayah management.";
      return `${name.toLowerCase()} playlist`;
    },
    customPlaylistAyahItems() {
      var _this$activePlaylist2;
      return Array.isArray((_this$activePlaylist2 = this.activePlaylist) === null || _this$activePlaylist2 === void 0 ? void 0 : _this$activePlaylist2.items) ? [...this.activePlaylist.items] : [];
    },
    customPlaylistItemCount() {
      return this.customPlaylistAyahItems.length;
    },
    shouldLimitPlaylistAyahListScroll() {
      return this.customPlaylistItemCount > 4;
    },
    selectedPlaylistItemCount() {
      const ids = new Set(this.customPlaylistAyahItems.map(item => String(item.id)));
      return this.selectedPlaylistItemIds.filter(id => ids.has(String(id))).length;
    },
    hasSelectedPlaylistItems() {
      return this.selectedPlaylistItemCount > 0;
    },
    allActivePlaylistItemsSelected() {
      return this.customPlaylistAyahItems.length > 0 && this.selectedPlaylistItemCount === this.customPlaylistAyahItems.length;
    },
    playlistEditorHasChanges() {
      var _this$activePlaylist3;
      if (!this.activePlaylist) return false;
      const currentName = String(((_this$activePlaylist3 = this.activePlaylist) === null || _this$activePlaylist3 === void 0 ? void 0 : _this$activePlaylist3.name) || "").trim();
      const nextName = String(this.playlistEditorName || "").trim();
      if (!nextName) return false;
      return currentName !== nextName;
    },
    filteredOrderedCustomPlaylistAyahItems() {
      const query = String(this.playlistAyahSearchQuery || "").trim().toLowerCase();
      const mode = String(this.playlistAyahFilterMode || "all");
      const selected = new Set(this.selectedPlaylistItemIds.map(id => String(id)));
      let rows = [...this.customPlaylistAyahItems].sort((a, b) => Number(a.position || 0) - Number(b.position || 0));
      if (mode === "selected") {
        rows = rows.filter(item => selected.has(String(item.id)));
      }
      if (query) {
        rows = rows.filter(item => {
          const searchable = [item.surahName, item.surahArabicName, item.ayahNumber, item.surahNumber, item.ayahArabic, item.ayahTranslation, item.description].map(value => String(value || "").toLowerCase()).join(" ");
          return searchable.includes(query);
        });
      }
      return rows;
    }
  },
  async mounted() {
    await this.fetchPlaylists();
    this.playlistEventHandler = event => this.handlePlaylistsUpdated(event);
    this.playlistStorageHandler = event => this.handleStoragePlaylistsUpdated(event);
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
        light: "#adb5bd"
      };
      const color = String((playlist === null || playlist === void 0 ? void 0 : playlist.color) || "").toLowerCase();
      return palette[color] || "#b87f2a";
    },
    stripHtmlTags(text) {
      if (!text) return "";
      const div = document.createElement("div");
      div.innerHTML = text;
      return div.textContent || div.innerText || "";
    },
    normalizePlaylistItem(row, source, folderId, index = 0) {
      var _row$ayah, _row$ayah2, _row$ayah3, _row$ayah4, _row$ayah5;
      if (source === "smart") {
        var _row$surah, _row$surah2, _row$surah3;
        const _surahNumber = Number((row === null || row === void 0 ? void 0 : row.surah_id) || (row === null || row === void 0 || (_row$surah = row.surah) === null || _row$surah === void 0 ? void 0 : _row$surah.id) || 0);
        const _ayahNumber = Number((row === null || row === void 0 ? void 0 : row.ayah_id) || (row === null || row === void 0 ? void 0 : row.ayah_number) || 0);
        if (!_surahNumber || !_ayahNumber) return null;
        return {
          id: `smart-${folderId}-${(row === null || row === void 0 ? void 0 : row.id) || `${_surahNumber}-${_ayahNumber}-${index}`}`,
          bookmarkId: null,
          position: index,
          source: "smart",
          surahNumber: _surahNumber,
          ayahNumber: _ayahNumber,
          surahName: String((row === null || row === void 0 || (_row$surah2 = row.surah) === null || _row$surah2 === void 0 ? void 0 : _row$surah2.name_en) || `Surah ${_surahNumber}`),
          surahArabicName: String((row === null || row === void 0 || (_row$surah3 = row.surah) === null || _row$surah3 === void 0 ? void 0 : _row$surah3.name_ar) || ""),
          ayahArabic: String((row === null || row === void 0 ? void 0 : row.ayah_text) || ""),
          ayahTranslation: "",
          description: ""
        };
      }
      const surahNumber = Number((row === null || row === void 0 ? void 0 : row.surah_number) || (row === null || row === void 0 || (_row$ayah = row.ayah) === null || _row$ayah === void 0 ? void 0 : _row$ayah.surah_id) || 0);
      const ayahNumber = Number((row === null || row === void 0 ? void 0 : row.ayah_number) || (row === null || row === void 0 ? void 0 : row.ayah_num) || (row === null || row === void 0 || (_row$ayah2 = row.ayah) === null || _row$ayah2 === void 0 ? void 0 : _row$ayah2.ayah_id) || 0);
      if (!surahNumber || !ayahNumber) return null;
      return {
        id: `bookmark-${(row === null || row === void 0 ? void 0 : row.id) || `${folderId}-${surahNumber}-${ayahNumber}-${index}`}`,
        bookmarkId: (row === null || row === void 0 ? void 0 : row.id) || null,
        position: index,
        source: "manual",
        surahNumber,
        ayahNumber,
        surahName: String((row === null || row === void 0 ? void 0 : row.surah_name) || (row === null || row === void 0 || (_row$ayah3 = row.ayah) === null || _row$ayah3 === void 0 || (_row$ayah3 = _row$ayah3.surah) === null || _row$ayah3 === void 0 ? void 0 : _row$ayah3.name_en) || `Surah ${surahNumber}`),
        surahArabicName: String((row === null || row === void 0 || (_row$ayah4 = row.ayah) === null || _row$ayah4 === void 0 || (_row$ayah4 = _row$ayah4.surah) === null || _row$ayah4 === void 0 ? void 0 : _row$ayah4.name_ar) || ""),
        ayahArabic: String((row === null || row === void 0 ? void 0 : row.ayah_verse_ar) || (row === null || row === void 0 || (_row$ayah5 = row.ayah) === null || _row$ayah5 === void 0 ? void 0 : _row$ayah5.ayah_text) || ""),
        ayahTranslation: String((row === null || row === void 0 ? void 0 : row.ayah_verse_en) || ""),
        description: ""
      };
    },
    getCustomPlaylistItemMain(item) {
      if (!item) return "Ayah";
      const name = String((item === null || item === void 0 ? void 0 : item.surahName) || "").trim();
      return name || `Surah ${(item === null || item === void 0 ? void 0 : item.surahNumber) || ""}`;
    },
    getCustomPlaylistItemArabicName(item) {
      const value = String((item === null || item === void 0 ? void 0 : item.surahArabicName) || "").trim();
      if (value) return value;
      return "";
    },
    getCustomPlaylistItemMeta(item) {
      const translation = this.stripHtmlTags(String((item === null || item === void 0 ? void 0 : item.ayahTranslation) || "")).replace(/\s+/g, " ").trim();
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
      this.selectedPlaylistItemIds = this.customPlaylistAyahItems.map(item => String(item.id));
    },
    togglePlaylistAyahListCollapsed() {
      this.isPlaylistAyahListCollapsed = !this.isPlaylistAyahListCollapsed;
    },
    openPlaylistItem(item) {
      const surah = Number((item === null || item === void 0 ? void 0 : item.surahNumber) || 0);
      const ayah = Number((item === null || item === void 0 ? void 0 : item.ayahNumber) || 0);
      if (!surah || !ayah) return;
      window.open(`/surat?surah=${surah}&ayah=${ayah}`, "_blank", "noopener");
    },
    closePlaylistAndBrowse() {
      window.open("/surat", "_blank", "noopener");
    },
    async fetchPlaylists(options = {}) {
      const {
        forceActiveItems = false
      } = options;
      this.loading = true;
      this.error = "";
      try {
        const {
          data
        } = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/folders");
        const rows = Array.isArray(data === null || data === void 0 ? void 0 : data.data) ? data.data : Array.isArray(data) ? data : [];
        const previous = new Map(this.playlists.map(playlist => [String(playlist.id), playlist]));
        this.playlists = rows.map(row => {
          const id = String((row === null || row === void 0 ? void 0 : row.id) || "");
          const existing = previous.get(id);
          return {
            id,
            name: String((row === null || row === void 0 ? void 0 : row.name) || ""),
            icon: String((row === null || row === void 0 ? void 0 : row.icon) || "bi bi-music-note-list"),
            color: String((row === null || row === void 0 ? void 0 : row.color) || "success"),
            is_smart: !!(row !== null && row !== void 0 && row.is_smart),
            ayah_count: Number((row === null || row === void 0 ? void 0 : row.ayah_count) || 0),
            updated_at: (row === null || row === void 0 ? void 0 : row.updated_at) || null,
            shared_token: (row === null || row === void 0 ? void 0 : row.shared_token) || null,
            items: Array.isArray(existing === null || existing === void 0 ? void 0 : existing.items) ? existing.items : [],
            itemsLoaded: !!(existing !== null && existing !== void 0 && existing.itemsLoaded),
            source: (existing === null || existing === void 0 ? void 0 : existing.source) || (row !== null && row !== void 0 && row.is_smart ? "smart" : "manual")
          };
        });
        if (!this.playlists.length) {
          this.activePlaylistId = "";
          this.selectedPlaylistItemIds = [];
          this.isPlaylistEditorVisible = false;
          return;
        }
        const activeExists = this.playlists.some(playlist => String(playlist.id) === String(this.activePlaylistId));
        this.activePlaylistId = activeExists ? String(this.activePlaylistId) : String(this.playlists[0].id);
        await this.fetchPlaylistItems(this.activePlaylistId, {
          force: forceActiveItems
        });
      } catch (error) {
        var _error$response;
        this.error = (error === null || error === void 0 || (_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || "Could not load playlists right now.";
        this.playlists = [];
        this.activePlaylistId = "";
      } finally {
        this.loading = false;
      }
    },
    async fetchPlaylistItems(playlistId, options = {}) {
      const {
        force = false
      } = options;
      const id = String(playlistId || "");
      if (!id) return;
      const playlist = this.playlists.find(row => String(row.id) === id);
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
        const {
          data
        } = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`/api/folders/${id}/bookmarks`);
        const rows = Array.isArray(data === null || data === void 0 ? void 0 : data.data) ? data.data : [];
        const source = String((data === null || data === void 0 ? void 0 : data.source) || (playlist.is_smart ? "smart" : "manual"));
        playlist.items = rows.map((row, index) => this.normalizePlaylistItem(row, source, id, index)).filter(Boolean);
        playlist.itemsLoaded = true;
        playlist.source = source;
      } catch (error) {
        var _error$response2;
        this.itemsError = (error === null || error === void 0 || (_error$response2 = error.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.message) || "Could not load playlist ayahs.";
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
        var _this$activePlaylist4;
        this.playlistEditorName = String(((_this$activePlaylist4 = this.activePlaylist) === null || _this$activePlaylist4 === void 0 ? void 0 : _this$activePlaylist4.name) || "");
      }
    },
    async savePlaylistChanges() {
      if (!this.activePlaylist || !this.playlistEditorHasChanges) return;
      const name = String(this.playlistEditorName || "").trim();
      if (!name) return;
      this.playlistEditorSaving = true;
      try {
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].put(`/api/folders/${this.activePlaylist.id}`, {
          name
        });
        const current = this.playlists.find(playlist => String(playlist.id) === String(this.activePlaylist.id));
        if (current) {
          current.name = name;
          current.updated_at = new Date().toISOString();
        }
        this.isPlaylistEditorVisible = false;
        this.notifyPlaylistChange();
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          position: "top-end",
          icon: "success",
          title: "Playlist updated",
          timer: 1200,
          showConfirmButton: false
        });
      } catch (error) {
        var _error$response3;
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: "error",
          title: (error === null || error === void 0 || (_error$response3 = error.response) === null || _error$response3 === void 0 || (_error$response3 = _error$response3.data) === null || _error$response3 === void 0 ? void 0 : _error$response3.message) || "Unable to update playlist",
          timer: 1400,
          showConfirmButton: false
        });
      } finally {
        this.playlistEditorSaving = false;
      }
    },
    async removeActivePlaylist() {
      if (!this.activePlaylist) return;
      const result = await sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
        title: "Delete playlist?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#b00020",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Delete"
      });
      if (!result.isConfirmed) return;
      this.playlistDeleteBusy = true;
      try {
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/folders/${this.activePlaylist.id}`);
        await this.fetchPlaylists({
          forceActiveItems: true
        });
        this.notifyPlaylistChange();
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          position: "top-end",
          icon: "success",
          title: "Playlist deleted",
          timer: 1200,
          showConfirmButton: false
        });
      } catch (error) {
        var _error$response4;
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: "error",
          title: (error === null || error === void 0 || (_error$response4 = error.response) === null || _error$response4 === void 0 || (_error$response4 = _error$response4.data) === null || _error$response4 === void 0 ? void 0 : _error$response4.message) || "Unable to delete playlist",
          timer: 1400,
          showConfirmButton: false
        });
      } finally {
        this.playlistDeleteBusy = false;
      }
    },
    async removeSelectedPlaylistItems() {
      if (!this.activePlaylist || !this.hasSelectedPlaylistItems) return;
      const selectedSet = new Set(this.selectedPlaylistItemIds.map(id => String(id)));
      const removable = this.customPlaylistAyahItems.filter(item => selectedSet.has(String(item.id)) && !!item.bookmarkId);
      if (!removable.length) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: "info",
          title: "Nothing to delete",
          text: "Selected ayahs cannot be removed from this playlist.",
          timer: 1500,
          showConfirmButton: false
        });
        return;
      }
      const result = await sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
        title: "Delete selected ayahs?",
        text: `Remove ${removable.length} ayah${removable.length === 1 ? "" : "s"} from this playlist?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#b00020",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Delete selected"
      });
      if (!result.isConfirmed) return;
      this.bulkDeleteBusy = true;
      try {
        const folderId = this.activePlaylist.id;
        const tasks = removable.map(item => axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/ayah-bookmarks/${item.bookmarkId}/folders/${folderId}`));
        await Promise.allSettled(tasks);
        await this.fetchPlaylists({
          forceActiveItems: true
        });
        this.notifyPlaylistChange();
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          position: "top-end",
          icon: "success",
          title: "Selected ayahs removed",
          timer: 1200,
          showConfirmButton: false
        });
      } catch (error) {
        var _error$response5;
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: "error",
          title: (error === null || error === void 0 || (_error$response5 = error.response) === null || _error$response5 === void 0 || (_error$response5 = _error$response5.data) === null || _error$response5 === void 0 ? void 0 : _error$response5.message) || "Unable to remove selected ayahs",
          timer: 1400,
          showConfirmButton: false
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
        var _response$data;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/folders", {
          name,
          icon: "bi bi-music-note-list",
          color: "success",
          is_smart: false
        });
        const createdId = String((response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 || (_response$data = _response$data.folder) === null || _response$data === void 0 ? void 0 : _response$data.id) || "");
        this.showCreatePlaylistModal = false;
        this.newPlaylistName = "";
        await this.fetchPlaylists({
          forceActiveItems: true
        });
        if (createdId) {
          this.activePlaylistId = createdId;
          await this.fetchPlaylistItems(createdId, {
            force: true
          });
        }
        this.notifyPlaylistChange();
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          position: "top-end",
          icon: "success",
          title: "Playlist created",
          timer: 1200,
          showConfirmButton: false
        });
      } catch (error) {
        var _error$response6, _error$response7;
        const apiMessage = (error === null || error === void 0 || (_error$response6 = error.response) === null || _error$response6 === void 0 || (_error$response6 = _error$response6.data) === null || _error$response6 === void 0 ? void 0 : _error$response6.message) || (error === null || error === void 0 || (_error$response7 = error.response) === null || _error$response7 === void 0 || (_error$response7 = _error$response7.data) === null || _error$response7 === void 0 || (_error$response7 = _error$response7.errors) === null || _error$response7 === void 0 || (_error$response7 = _error$response7.name) === null || _error$response7 === void 0 ? void 0 : _error$response7[0]);
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: "error",
          title: apiMessage || "Unable to create playlist",
          timer: 1500,
          showConfirmButton: false
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
      window.dispatchEvent(new CustomEvent("bookmarks-updated", {
        detail: {
          token,
          instance: source
        }
      }));
    },
    handlePlaylistsUpdated(event) {
      var _event$detail;
      if ((event === null || event === void 0 || (_event$detail = event.detail) === null || _event$detail === void 0 ? void 0 : _event$detail.instance) === this.playlistInstanceId) return;
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
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/PlaylistComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/PlaylistComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_admin_panels_PlaylistComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_admin_panels_PlaylistComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/vue/admin_panels/PlaylistComponent.vue */ "./resources/components/vue/admin_panels/PlaylistComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PlaylistComponent.vue?vue&type=template&id=ffa77196&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PlaylistComponent.vue?vue&type=template&id=ffa77196&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "admin-page playlist-admin-shell"
};
const _hoisted_2 = {
  class: "reader-custom-playlist-panel"
};
const _hoisted_3 = {
  class: "reader-custom-playlist-header"
};
const _hoisted_4 = {
  class: "reader-custom-playlist-header-actions"
};
const _hoisted_5 = {
  class: "reader-custom-playlist-count"
};
const _hoisted_6 = {
  class: "reader-custom-playlist-layout"
};
const _hoisted_7 = {
  class: "reader-custom-playlist-nav",
  "aria-label": "Playlist list"
};
const _hoisted_8 = {
  class: "reader-custom-playlist-nav-header"
};
const _hoisted_9 = ["disabled"];
const _hoisted_10 = {
  class: "reader-custom-playlist-nav-tools"
};
const _hoisted_11 = {
  class: "reader-custom-playlist-search-wrap"
};
const _hoisted_12 = {
  class: "reader-custom-playlist-nav-list",
  role: "tablist",
  "aria-label": "Saved playlists"
};
const _hoisted_13 = {
  key: 0,
  class: "reader-custom-playlist-empty-inline"
};
const _hoisted_14 = {
  key: 1,
  class: "reader-custom-playlist-empty-inline is-error"
};
const _hoisted_15 = ["aria-selected", "onClick"];
const _hoisted_16 = {
  class: "reader-custom-playlist-nav-item-main"
};
const _hoisted_17 = {
  class: "reader-custom-playlist-nav-item-name"
};
const _hoisted_18 = {
  class: "reader-custom-playlist-nav-item-count"
};
const _hoisted_19 = {
  key: 2,
  class: "reader-custom-playlist-empty-inline"
};
const _hoisted_20 = {
  key: 0,
  class: "reader-custom-playlist-content"
};
const _hoisted_21 = {
  class: "reader-custom-playlist-content-header"
};
const _hoisted_22 = {
  class: "reader-custom-playlist-content-title-row"
};
const _hoisted_23 = {
  class: "reader-custom-playlist-content-title mb-0"
};
const _hoisted_24 = {
  class: "reader-custom-playlist-content-badge"
};
const _hoisted_25 = {
  class: "reader-custom-playlist-content-subtitle mb-0"
};
const _hoisted_26 = {
  class: "reader-custom-playlist-content-actions"
};
const _hoisted_27 = ["disabled"];
const _hoisted_28 = ["disabled"];
const _hoisted_29 = {
  key: 0,
  class: "reader-custom-playlist-editor-card"
};
const _hoisted_30 = {
  class: "reader-custom-playlist-meta"
};
const _hoisted_31 = {
  class: "reader-custom-playlist-field"
};
const _hoisted_32 = {
  class: "reader-custom-playlist-field reader-custom-playlist-field-save"
};
const _hoisted_33 = ["disabled"];
const _hoisted_34 = {
  class: "reader-custom-playlist-items-card"
};
const _hoisted_35 = {
  class: "reader-custom-playlist-bulk-bar"
};
const _hoisted_36 = {
  class: "reader-custom-playlist-bulk-meta"
};
const _hoisted_37 = {
  class: "reader-custom-playlist-bulk-selected"
};
const _hoisted_38 = {
  class: "reader-custom-playlist-bulk-actions"
};
const _hoisted_39 = {
  class: "reader-custom-playlist-bulk-actions-group",
  role: "group",
  "aria-label": "Playlist quick actions"
};
const _hoisted_40 = ["aria-label", "title"];
const _hoisted_41 = {
  class: "reader-custom-playlist-tool-label"
};
const _hoisted_42 = ["aria-label", "title"];
const _hoisted_43 = {
  class: "reader-custom-playlist-tool-label"
};
const _hoisted_44 = ["disabled"];
const _hoisted_45 = {
  key: 0,
  class: "reader-custom-playlist-empty"
};
const _hoisted_46 = {
  key: 1,
  class: "reader-custom-playlist-empty is-error"
};
const _hoisted_47 = {
  class: "mb-0"
};
const _hoisted_48 = {
  key: 2,
  class: "reader-custom-playlist-empty"
};
const _hoisted_49 = {
  key: 0,
  class: "reader-custom-playlist-guidance"
};
const _hoisted_50 = {
  class: "reader-custom-playlist-list-tools"
};
const _hoisted_51 = {
  class: "reader-custom-playlist-search-wrap reader-custom-playlist-search-wrap--items"
};
const _hoisted_52 = {
  class: "reader-custom-playlist-filter-wrap"
};
const _hoisted_53 = ["onClick"];
const _hoisted_54 = {
  class: "reader-custom-playlist-item-select"
};
const _hoisted_55 = ["checked", "aria-label", "onClick"];
const _hoisted_56 = {
  class: "reader-custom-playlist-item-text"
};
const _hoisted_57 = {
  class: "reader-custom-playlist-item-primary"
};
const _hoisted_58 = {
  class: "reader-custom-playlist-item-latin-wrap"
};
const _hoisted_59 = {
  class: "reader-custom-playlist-item-ref"
};
const _hoisted_60 = {
  class: "reader-custom-playlist-item-title"
};
const _hoisted_61 = {
  key: 0,
  class: "reader-custom-playlist-item-arabic",
  dir: "rtl"
};
const _hoisted_62 = {
  key: 0,
  class: "reader-custom-playlist-item-desc"
};
const _hoisted_63 = {
  class: "reader-custom-playlist-item-actions"
};
const _hoisted_64 = ["onClick"];
const _hoisted_65 = {
  key: 0,
  class: "reader-custom-playlist-empty reader-custom-playlist-empty-filtered"
};
const _hoisted_66 = {
  key: 2,
  class: "reader-custom-playlist-list-collapsed-note"
};
const _hoisted_67 = {
  key: 1,
  class: "reader-custom-playlist-content reader-custom-playlist-content-empty"
};
const _hoisted_68 = {
  class: "reader-custom-playlist-empty-state"
};
const _hoisted_69 = ["disabled"];
const _hoisted_70 = {
  class: "playlist-modal-header"
};
const _hoisted_71 = {
  class: "reader-custom-playlist-meta"
};
const _hoisted_72 = {
  class: "reader-custom-playlist-field"
};
const _hoisted_73 = {
  class: "playlist-modal-actions mt-3"
};
const _hoisted_74 = ["disabled"];
const _hoisted_75 = ["disabled"];
const _hoisted_76 = {
  key: 0,
  class: "spinner-border spinner-border-sm",
  "aria-hidden": "true"
};
const _hoisted_77 = {
  key: 1
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "reader-custom-playlist-header-copy"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "reader-custom-playlist-title-row"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "reader-custom-playlist-title mb-0"
  }, "Custom Playlist Library")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "reader-custom-playlist-subtitle mb-0"
  }, "Pick a playlist, then play or manage its items.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.selectedPlaylistItemCount) + " selected", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-close",
    "aria-label": "Close playlist panel",
    title: "Close playlist",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.closePanel && $options.closePanel(...args))
  }, [...(_cache[24] || (_cache[24] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("aside", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "reader-custom-playlist-field-label mb-0"
  }, "Playlists", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn is-add-surah reader-custom-playlist-nav-add",
    disabled: $data.createPlaylistSaving,
    onClick: _cache[1] || (_cache[1] = (...args) => $options.openCreatePlaylistModal && $options.openCreatePlaylistModal(...args))
  }, [...(_cache[26] || (_cache[26] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-circle",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" New playlist ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_9)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search reader-custom-playlist-search-icon",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.playlistSearchQuery = $event),
    type: "search",
    class: "form-control reader-custom-playlist-search-input",
    placeholder: "Search playlists",
    "aria-label": "Search playlists"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.playlistSearchQuery, void 0, {
    trim: true
  }]]), $data.playlistSearchQuery ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "reader-custom-playlist-search-clear",
    "aria-label": "Clear playlist search",
    onClick: _cache[3] || (_cache[3] = $event => $data.playlistSearchQuery = '')
  }, [...(_cache[28] || (_cache[28] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [$data.loading && !$data.playlists.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_13, "Loading playlists...")) : $data.error && !$data.playlists.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.error), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredCustomPlaylists, playlist => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: `playlist-pill-${playlist.id}`,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["reader-custom-playlist-nav-item", {
        'is-active': String($data.activePlaylistId) === String(playlist.id)
      }]),
      "aria-selected": String($data.activePlaylistId) === String(playlist.id) ? 'true' : 'false',
      onClick: $event => $options.selectPlaylist(playlist.id)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "reader-custom-playlist-nav-item-accent",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        backgroundColor: $options.getPlaylistAccentColor(playlist)
      }),
      "aria-hidden": "true"
    }, null, 4 /* STYLE */), _cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-music-note-list reader-custom-playlist-nav-item-icon",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(playlist.name || "Untitled Playlist"), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.playlistItemCountLabel(playlist)), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_15);
  }), 128 /* KEYED_FRAGMENT */)), !$data.loading && !$options.filteredCustomPlaylists.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.playlistSearchQuery ? "No playlists match your search." : "No playlists yet."), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), $options.activePlaylist ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.activePlaylist.name || "Untitled Playlist"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.customPlaylistItemCount) + " ayah" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.customPlaylistItemCount === 1 ? "" : "s"), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.activePlaylistSubtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn",
    disabled: $data.playlistEditorSaving,
    onClick: _cache[4] || (_cache[4] = (...args) => $options.togglePlaylistEditor && $options.togglePlaylistEditor(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $data.isPlaylistEditorVisible ? 'bi-x-circle' : 'bi-pencil-square']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.isPlaylistEditorVisible ? "Close edit" : "Edit playlist"), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_27), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn is-clear",
    disabled: $data.playlistDeleteBusy,
    onClick: _cache[5] || (_cache[5] = (...args) => $options.removeActivePlaylist && $options.removeActivePlaylist(...args))
  }, [...(_cache[31] || (_cache[31] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-trash me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delete playlist ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_28)])]), $data.isPlaylistEditorVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "reader-custom-playlist-field-label"
  }, "Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $data.playlistEditorName = $event),
    type: "text",
    class: "form-control reader-custom-playlist-input",
    placeholder: "Type playlist name"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.playlistEditorName]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "reader-custom-playlist-field-label visually-hidden"
  }, "Save", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn is-play reader-custom-playlist-save-btn",
    disabled: $data.playlistEditorSaving || !$options.playlistEditorHasChanges,
    onClick: _cache[7] || (_cache[7] = (...args) => $options.savePlaylistChanges && $options.savePlaylistChanges(...args))
  }, [...(_cache[33] || (_cache[33] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check2-circle me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Save changes ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_33)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.customPlaylistItemCount) + " ayah" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.customPlaylistItemCount === 1 ? "" : "s"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.selectedPlaylistItemCount) + " selected", 1 /* TEXT */), _cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "reader-custom-playlist-bulk-status",
    role: "status",
    "aria-label": "Auto-save reorder is on"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-left-right",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Auto-save reorder: On ")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn reader-custom-playlist-icon-btn",
    "aria-label": $options.allActivePlaylistItemsSelected ? 'Clear all selected playlist items' : 'Select all playlist items',
    title: $options.allActivePlaylistItemsSelected ? 'Clear selection' : 'Select all',
    onClick: _cache[8] || (_cache[8] = (...args) => $options.toggleAllActivePlaylistSelections && $options.toggleAllActivePlaylistSelections(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $options.allActivePlaylistItemsSelected ? 'bi-x-square' : 'bi-check2-square']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_41, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.allActivePlaylistItemsSelected ? "Clear all" : "Select all"), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_40), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn reader-custom-playlist-icon-btn",
    "aria-label": $data.isPlaylistAyahListCollapsed ? 'Expand ayah list' : 'Collapse ayah list',
    title: $data.isPlaylistAyahListCollapsed ? 'Expand list' : 'Collapse list',
    onClick: _cache[9] || (_cache[9] = (...args) => $options.togglePlaylistAyahListCollapsed && $options.togglePlaylistAyahListCollapsed(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $data.isPlaylistAyahListCollapsed ? 'bi-chevron-down' : 'bi-chevron-up']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_43, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.isPlaylistAyahListCollapsed ? "Expand list" : "Collapse list"), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_42), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn is-remove reader-custom-playlist-icon-btn",
    disabled: $data.bulkDeleteBusy || !$options.hasSelectedPlaylistItems,
    "aria-label": "Delete selected playlist items",
    title: "Delete selected",
    onClick: _cache[10] || (_cache[10] = (...args) => $options.removeSelectedPlaylistItems && $options.removeSelectedPlaylistItems(...args))
  }, [...(_cache[36] || (_cache[36] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-trash",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "reader-custom-playlist-tool-label"
  }, "Delete selected", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_44)])])]), $data.loadingItems ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_45, [...(_cache[37] || (_cache[37] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-0"
  }, "Loading playlist ayahs...", -1 /* CACHED */)]))])) : $data.itemsError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.itemsError), 1 /* TEXT */)])) : !$options.customPlaylistAyahItems.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_48, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-2"
  }, "No ayahs saved yet.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn is-add-surah",
    onClick: _cache[11] || (_cache[11] = (...args) => $options.closePlaylistAndBrowse && $options.closePlaylistAndBrowse(...args))
  }, " Browse to add ayahs ")])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 3
  }, [$options.customPlaylistAyahItems.length <= 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_49, [_cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"reader-custom-playlist-guidance-art\" aria-hidden=\"true\" data-v-ffa77196><i class=\"bi bi-compass\" data-v-ffa77196></i></div><div class=\"reader-custom-playlist-guidance-copy\" data-v-ffa77196><h5 class=\"mb-1\" data-v-ffa77196>Build your flow</h5><p class=\"mb-0\" data-v-ffa77196>Add a few more ayahs to unlock smoother playback and easier reorder patterns.</p></div>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn is-add-surah reader-custom-playlist-guidance-btn",
    onClick: _cache[12] || (_cache[12] = (...args) => $options.closePlaylistAndBrowse && $options.closePlaylistAndBrowse(...args))
  }, [...(_cache[39] || (_cache[39] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-circle me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Add more ayahs ", -1 /* CACHED */)]))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search reader-custom-playlist-search-icon",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => $data.playlistAyahSearchQuery = $event),
    type: "search",
    class: "form-control reader-custom-playlist-search-input",
    placeholder: "Search ayahs in this playlist",
    "aria-label": "Search ayahs in active playlist"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.playlistAyahSearchQuery, void 0, {
    trim: true
  }]]), $data.playlistAyahSearchQuery ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "reader-custom-playlist-search-clear",
    "aria-label": "Clear ayah search",
    onClick: _cache[14] || (_cache[14] = $event => $data.playlistAyahSearchQuery = '')
  }, [...(_cache[41] || (_cache[41] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [_cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "reader-custom-playlist-filter-label mb-0",
    for: "playlistAyahFilterMode"
  }, "Show", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "playlistAyahFilterMode",
    "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => $data.playlistAyahFilterMode = $event),
    class: "form-select reader-custom-playlist-filter-select",
    "aria-label": "Show playlist ayahs by filter"
  }, [...(_cache[43] || (_cache[43] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "all"
  }, "All ayahs", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "selected"
  }, "Selected only", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.playlistAyahFilterMode]])])]), !$data.isPlaylistAyahListCollapsed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 1,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["reader-custom-playlist-list-scroll", {
      'is-scroll-limited': $options.shouldLimitPlaylistAyahListScroll
    }])
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredOrderedCustomPlaylistAyahItems, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: item.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["reader-custom-playlist-item", {
        'is-selected': $options.isPlaylistItemSelected(item.id)
      }]),
      onClick: $event => $options.togglePlaylistItemSelection(item.id)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [_cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "reader-custom-playlist-drag-handle reader-custom-playlist-drag-handle--leading",
      "aria-hidden": "true",
      title: "Selectable item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-grip-horizontal"
    })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "checkbox",
      class: "form-check-input reader-custom-playlist-checkbox",
      checked: $options.isPlaylistItemSelected(item.id),
      "aria-label": `Select ${$options.getCustomPlaylistItemMain(item)}`,
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.togglePlaylistItemSelection(item.id), ["stop"])
    }, null, 8 /* PROPS */, _hoisted_55)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_59, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.surahNumber && item.ayahNumber ? `${item.surahNumber}:${item.ayahNumber}` : "Ayah"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_60, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getCustomPlaylistItemMain(item)), 1 /* TEXT */)]), $options.getCustomPlaylistItemArabicName(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_61, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getCustomPlaylistItemArabicName(item)), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), $options.getCustomPlaylistItemMeta(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_62, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getCustomPlaylistItemMeta(item)), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "reader-custom-playlist-btn is-play reader-custom-playlist-icon-btn",
      "aria-label": "Open ayah",
      title: "Open ayah",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.openPlaylistItem(item), ["stop"])
    }, [...(_cache[46] || (_cache[46] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-play-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_64)])], 10 /* CLASS, PROPS */, _hoisted_53);
  }), 128 /* KEYED_FRAGMENT */)), !$options.filteredOrderedCustomPlaylistAyahItems.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_65, [...(_cache[47] || (_cache[47] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-0"
  }, "No ayahs match the current search or filter.", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_66, " Ayah list is collapsed. "))], 64 /* STABLE_FRAGMENT */))])])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_67, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [_cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "mb-1"
  }, "No playlist selected", -1 /* CACHED */)), _cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-0"
  }, "Create a playlist to start saving surahs and ayahs.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn is-add-surah mt-2",
    disabled: $data.createPlaylistSaving,
    onClick: _cache[16] || (_cache[16] = (...args) => $options.openCreatePlaylistModal && $options.openCreatePlaylistModal(...args))
  }, [...(_cache[48] || (_cache[48] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-circle me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Create first playlist ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_69)])]))])]), $data.showCreatePlaylistModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: "playlist-modal-backdrop",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Create playlist",
    onClick: _cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.closeCreatePlaylistModal && $options.closeCreatePlaylistModal(...args), ["self"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "playlist-modal-card ltr-text",
    onClick: _cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, [_cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "mb-1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Create playlist")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-0 text-muted"
  }, "Enter a name for your new playlist.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-close",
    "aria-label": "Close create playlist modal",
    onClick: _cache[17] || (_cache[17] = (...args) => $options.closeCreatePlaylistModal && $options.closeCreatePlaylistModal(...args))
  }, [...(_cache[51] || (_cache[51] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [_cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "reader-custom-playlist-field-label"
  }, "Title", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => $data.newPlaylistName = $event),
    type: "text",
    class: "form-control reader-custom-playlist-input",
    placeholder: "My playlist",
    onKeyup: _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((...args) => $options.createPlaylist && $options.createPlaylist(...args), ["enter"]))
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.newPlaylistName, void 0, {
    trim: true
  }]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn",
    disabled: $data.createPlaylistSaving,
    onClick: _cache[20] || (_cache[20] = (...args) => $options.closeCreatePlaylistModal && $options.closeCreatePlaylistModal(...args))
  }, "Cancel", 8 /* PROPS */, _hoisted_74), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn is-play",
    disabled: $data.createPlaylistSaving || !$data.newPlaylistName,
    onClick: _cache[21] || (_cache[21] = (...args) => $options.createPlaylist && $options.createPlaylist(...args))
  }, [$data.createPlaylistSaving ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_76)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_77, "Create playlist"))], 8 /* PROPS */, _hoisted_75)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PlaylistComponent.vue?vue&type=style&index=0&id=ffa77196&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PlaylistComponent.vue?vue&type=style&index=0&id=ffa77196&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/admin_panels/PlaylistComponent.vue":
/*!*********************************************************************!*\
  !*** ./resources/components/vue/admin_panels/PlaylistComponent.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PlaylistComponent_vue_vue_type_template_id_ffa77196_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlaylistComponent.vue?vue&type=template&id=ffa77196&scoped=true */ "./resources/components/vue/admin_panels/PlaylistComponent.vue?vue&type=template&id=ffa77196&scoped=true");
/* harmony import */ var _PlaylistComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlaylistComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/admin_panels/PlaylistComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _PlaylistComponent_vue_vue_type_style_index_0_id_ffa77196_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PlaylistComponent.vue?vue&type=style&index=0&id=ffa77196&scoped=true&lang=css */ "./resources/components/vue/admin_panels/PlaylistComponent.vue?vue&type=style&index=0&id=ffa77196&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_PlaylistComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PlaylistComponent_vue_vue_type_template_id_ffa77196_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-ffa77196"],['__file',"resources/components/vue/admin_panels/PlaylistComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/admin_panels/PlaylistComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/PlaylistComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PlaylistComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PlaylistComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PlaylistComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PlaylistComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/admin_panels/PlaylistComponent.vue?vue&type=style&index=0&id=ffa77196&scoped=true&lang=css":
/*!*****************************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/PlaylistComponent.vue?vue&type=style&index=0&id=ffa77196&scoped=true&lang=css ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PlaylistComponent_vue_vue_type_style_index_0_id_ffa77196_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PlaylistComponent.vue?vue&type=style&index=0&id=ffa77196&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PlaylistComponent.vue?vue&type=style&index=0&id=ffa77196&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/admin_panels/PlaylistComponent.vue?vue&type=template&id=ffa77196&scoped=true":
/*!***************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/PlaylistComponent.vue?vue&type=template&id=ffa77196&scoped=true ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PlaylistComponent_vue_vue_type_template_id_ffa77196_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PlaylistComponent_vue_vue_type_template_id_ffa77196_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PlaylistComponent.vue?vue&type=template&id=ffa77196&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PlaylistComponent.vue?vue&type=template&id=ffa77196&scoped=true");


/***/ }),

/***/ "./resources/js/components/admin_panels/PlaylistComponent.vue":
/*!********************************************************************!*\
  !*** ./resources/js/components/admin_panels/PlaylistComponent.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PlaylistComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlaylistComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/PlaylistComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_PlaylistComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/admin_panels/PlaylistComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/PlaylistComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/PlaylistComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PlaylistComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PlaylistComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PlaylistComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/PlaylistComponent.vue?vue&type=script&lang=js");
 

/***/ })

}]);