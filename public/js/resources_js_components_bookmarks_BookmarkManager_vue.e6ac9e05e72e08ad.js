"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_bookmarks_BookmarkManager_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/AyahRow.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/AyahRow.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'AyahRow',
  props: {
    ayah: {
      type: Object,
      required: true
    },
    surahName: {
      type: String,
      default: ''
    },
    surahNumber: {
      type: [String, Number],
      default: ''
    },
    bookmarkId: {
      type: Number,
      default: null
    }
  },
  computed: {
    surahLabel() {
      return this.surahName || `Surah ${this.surahNumber}`;
    }
  },
  methods: {
    emitBookmark() {
      this.$emit('bookmark', this.payload());
    },
    payload() {
      return {
        bookmark_id: this.bookmarkId,
        surah_number: this.ayah.surah_number || this.surahNumber,
        surah_name: this.ayah.surah_name || this.surahName,
        ayah_number: this.ayah.ayah_number,
        ayah_verse_ar: this.ayah.ayah_verse_ar,
        ayah_verse_en: this.ayah.ayah_verse_en
      };
    },
    onDragStart(event) {
      event.dataTransfer.setData('text/plain', JSON.stringify(this.payload()));
      event.dataTransfer.effectAllowed = 'copyMove';
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkManager.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkManager.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _AyahRow_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AyahRow.vue */ "./resources/components/vue/bookmarks/AyahRow.vue");
/* harmony import */ var _FolderList_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FolderList.vue */ "./resources/components/vue/bookmarks/FolderList.vue");
/* harmony import */ var _BookmarkModal_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BookmarkModal.vue */ "./resources/components/vue/bookmarks/BookmarkModal.vue");
/* harmony import */ var _utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/bookmarkAuth */ "./resources/js/utils/bookmarkAuth.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var docx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! docx */ "./node_modules/docx/dist/index.mjs");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! html2canvas */ "./node_modules/html2canvas/dist/html2canvas.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(html2canvas__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.es.min.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "BookmarkManager",
  components: {
    AyahRow: _AyahRow_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    FolderList: _FolderList_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    BookmarkModal: _BookmarkModal_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  data() {
    return {
      selectedFolder: null,
      items: [],
      folders: [],
      source: "manual",
      loading: false,
      activeAyah: null,
      movingBookmarkId: null,
      deleteBusy: {},
      removeConfirmOpen: false,
      removeCandidate: null,
      removeMode: "folder",
      removeBusy: false,
      panelMessage: "",
      panelMessageVariant: "success",
      panelMessageTimer: null,
      isFolderCollapsed: false,
      query: "",
      isAuthenticated: false,
      authResolved: false,
      bookmarkInstanceId: `bm-${Math.random().toString(36).slice(2)}`,
      bookmarkEventHandler: null,
      bookmarkStorageHandler: null,
      visibilityHandler: null,
      showGuestNudge: true,
      selectedBookmarkIds: [],
      bulkDeleteBusy: false
    };
  },
  computed: {
    sourceLabel() {
      if (this.source === "smart") return "Smart";
      if (this.source === "all") return "All";
      return "Manual";
    },
    normalizedItems() {
      if (!this.items.length) return [];
      return this.items.map(item => {
        var _item$ayah, _item$ayah2, _item$ayah3, _item$ayah4;
        if (this.source === "smart") {
          var _item$surah;
          return {
            row_key: `smart-${item.id}`,
            bookmark_id: null,
            surah_number: item.surah_id,
            surah_name: ((_item$surah = item.surah) === null || _item$surah === void 0 ? void 0 : _item$surah.name_en) || `Surah ${item.surah_id}`,
            ayah_number: item.ayah_id,
            ayah_verse_ar: item.ayah_text,
            ayah_verse_en: ""
          };
        }
        return {
          row_key: `bookmark-${item.id}`,
          bookmark_id: item.id,
          surah_number: item.surah_number || ((_item$ayah = item.ayah) === null || _item$ayah === void 0 ? void 0 : _item$ayah.surah_id),
          surah_name: item.surah_name || ((_item$ayah2 = item.ayah) === null || _item$ayah2 === void 0 || (_item$ayah2 = _item$ayah2.surah) === null || _item$ayah2 === void 0 ? void 0 : _item$ayah2.name_en) || "Surah",
          ayah_number: ((_item$ayah3 = item.ayah) === null || _item$ayah3 === void 0 ? void 0 : _item$ayah3.ayah_id) || item.ayah_number || item.ayah_num,
          ayah_verse_ar: item.ayah_verse_ar || ((_item$ayah4 = item.ayah) === null || _item$ayah4 === void 0 ? void 0 : _item$ayah4.ayah_text),
          ayah_verse_en: item.ayah_verse_en || ""
        };
      });
    },
    parsedQuery() {
      return this.parseQuery(this.query);
    },
    activeFieldKeys() {
      return ["surah", "ayah", "arabic", "english"];
    },
    highlightMap() {
      const map = {
        surah: [],
        ayah: [],
        arabic: [],
        english: []
      };
      const tokens = this.parsedQuery.filter(token => !token.exclude);
      tokens.forEach(token => {
        let targets = token.field ? this.mapFieldAlias(token.field) : this.activeFieldKeys;
        if (!targets.length) {
          targets = this.activeFieldKeys;
        }
        targets.forEach(fieldKey => {
          if (!map[fieldKey]) return;
          map[fieldKey].push(token.term);
        });
      });
      Object.keys(map).forEach(key => {
        const unique = Array.from(new Set(map[key].filter(Boolean)));
        map[key] = unique.sort((a, b) => b.length - a.length);
      });
      return map;
    },
    filteredItems() {
      const tokens = this.parsedQuery;
      const fieldKeys = this.activeFieldKeys;
      return this.normalizedItems.filter(item => this.matchesItem(item, tokens, fieldKeys));
    },
    panelCountLabel() {
      if (!this.query) {
        return `${this.normalizedItems.length} ayat`;
      }
      return `${this.filteredItems.length} of ${this.normalizedItems.length} ayat`;
    },
    folderDescriptor() {
      if (!this.selectedFolder) return "Unified library";
      if (this.selectedFolder.isAll) return "Global collection";
      if (this.selectedFolder.is_smart) return "Smart folder";
      return "Curated collection";
    },
    canMoveFromSelectedFolder() {
      return !!this.selectedFolder && !this.selectedFolder.isAll && !this.selectedFolder.is_smart;
    },
    isSmartSelected() {
      var _this$selectedFolder;
      return !!((_this$selectedFolder = this.selectedFolder) !== null && _this$selectedFolder !== void 0 && _this$selectedFolder.is_smart);
    },
    deleteTooltip() {
      var _this$selectedFolder2;
      if (this.isSmartSelected) return "Smart folders cannot be edited.";
      if ((_this$selectedFolder2 = this.selectedFolder) !== null && _this$selectedFolder2 !== void 0 && _this$selectedFolder2.isAll) return "Delete from all folders";
      return "Remove from this folder";
    },
    removeConfirmTitle() {
      if (this.removeMode === "bulk") {
        return `Delete ${this.selectedBookmarkCount} bookmark(s)?`;
      }
      return this.removeMode === "all" ? "Delete bookmark?" : "Remove from folder?";
    },
    removeConfirmMessage() {
      if (this.removeMode === "bulk") {
        return `Are you sure you want to delete ${this.selectedBookmarkCount} selected bookmark(s)? This action cannot be undone.`;
      }
      if (this.removeMode === "all") {
        return "Delete this bookmark from all folders?";
      }
      return "Remove this ayah from the current folder?";
    },
    moveTargets() {
      if (!this.canMoveFromSelectedFolder) return [];
      return this.folders.filter(folder => !folder.is_smart && folder.id !== this.selectedFolder.id);
    },
    selectedBookmarkCount() {
      return this.selectedBookmarkIds.length;
    },
    allBookmarksSelected() {
      if (this.filteredItems.length === 0) return false;
      const selectableIds = this.filteredItems.filter(item => item.bookmark_id).map(item => item.bookmark_id);
      return selectableIds.length > 0 && selectableIds.every(id => this.selectedBookmarkIds.includes(id));
    },
    someBookmarksSelected() {
      return this.selectedBookmarkIds.length > 0 && !this.allBookmarksSelected;
    },
    canExportFolder() {
      return !!this.selectedFolder && this.normalizedItems.length > 0;
    }
  },
  async mounted() {
    await this.initializeAuthentication();
    this.fetchFolders();
    this.bookmarkEventHandler = event => this.handleBookmarksUpdated(event);
    this.bookmarkStorageHandler = event => this.handleStorageBookmarksUpdated(event);
    this.visibilityHandler = () => this.handleVisibilityChange();
    window.addEventListener("bookmarks-updated", this.bookmarkEventHandler);
    window.addEventListener("storage", this.bookmarkStorageHandler);
    window.addEventListener("visibilitychange", this.visibilityHandler);
  },
  beforeUnmount() {
    clearTimeout(this.panelMessageTimer);
    if (this.bookmarkEventHandler) window.removeEventListener("bookmarks-updated", this.bookmarkEventHandler);
    if (this.bookmarkStorageHandler) window.removeEventListener("storage", this.bookmarkStorageHandler);
    if (this.visibilityHandler) window.removeEventListener("visibilitychange", this.visibilityHandler);
  },
  methods: {
    hideGuestNudge() {
      this.showGuestNudge = false;
    },
    clearSearch() {
      this.query = "";
    },
    stripHtmlTags(text) {
      if (!text) return "";
      const div = document.createElement("div");
      div.innerHTML = text;
      return div.textContent || div.innerText || "";
    },
    getBookmarkSurahLabel(item) {
      const name = this.stripHtmlTags((item === null || item === void 0 ? void 0 : item.surah_name) || "");
      if (name) return name;
      if (item !== null && item !== void 0 && item.surah_number) return `Surah ${item.surah_number}`;
      return "Surah";
    },
    getBookmarkAyahNumber(item) {
      return (item === null || item === void 0 ? void 0 : item.ayah_number) || "";
    },
    buildBookmarkMessage(item) {
      if (!item) return "";
      const surahLabel = this.getBookmarkSurahLabel(item);
      const ayahNumber = this.getBookmarkAyahNumber(item);
      const header = ayahNumber ? `${surahLabel} (Ayah ${ayahNumber})` : surahLabel;
      const arabic = this.stripHtmlTags(item.ayah_verse_ar || "");
      const translation = this.stripHtmlTags(item.ayah_verse_en || "");
      const lines = [header];
      if (arabic) lines.push(`Arabic: ${arabic}`);
      if (translation) lines.push(`Translation: ${translation}`);
      return lines.join("\n\n");
    },
    async copyText(text) {
      var _navigator$clipboard;
      if (!text) return false;
      if (typeof window !== "undefined" && typeof navigator !== "undefined" && (_navigator$clipboard = navigator.clipboard) !== null && _navigator$clipboard !== void 0 && _navigator$clipboard.writeText && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch (_) {
          // fall back
        }
      }
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand("copy");
        document.body.removeChild(textarea);
        return success;
      } catch (_) {
        return false;
      }
    },
    async copyBookmark(item) {
      const message = this.buildBookmarkMessage(item);
      if (!message) return;
      const ok = await this.copyText(message);
      if (ok) {
        this.setPanelMessage("Ayah copied to clipboard.", "success");
      } else {
        this.setPanelMessage("Unable to copy ayah.", "danger");
      }
    },
    shareBookmarkOnWhatsApp(item) {
      const message = this.buildBookmarkMessage(item);
      if (!message) return;
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://api.whatsapp.com/send?text=${encodedMessage}`;
      window.open(whatsappLink, "_blank", "noopener,noreferrer");
    },
    openInSurat(item) {
      const surahNumber = Number((item === null || item === void 0 ? void 0 : item.surah_number) || (item === null || item === void 0 ? void 0 : item.surah_id));
      const ayahNumber = Number((item === null || item === void 0 ? void 0 : item.ayah_number) || (item === null || item === void 0 ? void 0 : item.ayah_num) || (item === null || item === void 0 ? void 0 : item.ayah_id));
      if (!surahNumber || !ayahNumber) {
        this.setPanelMessage("Unable to open this ayah.", "danger");
        return;
      }
      const url = `/surat?surah=${surahNumber}&ayah=${ayahNumber}`;
      window.open(url, "_blank", "noopener,noreferrer");
    },
    escapeHtml(text) {
      return (text || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    },
    escapeRegExp(text) {
      return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    },
    parseQuery(query) {
      const tokens = [];
      if (!query) return tokens;
      const regex = /(-)?(?:(\w+):)?(?:"([^"]+)"|(\S+))/g;
      let match;
      while ((match = regex.exec(query)) !== null) {
        const exclude = !!match[1];
        const field = match[2] ? match[2].toLowerCase() : null;
        const term = (match[3] || match[4] || "").trim();
        if (!term) continue;
        tokens.push({
          exclude,
          field,
          term
        });
      }
      return tokens;
    },
    mapFieldAlias(field) {
      const key = (field || "").toLowerCase();
      if (!key) return [];
      if (["surah", "s"].includes(key)) return ["surah"];
      if (["ayah", "a", "num", "number"].includes(key)) return ["ayah"];
      if (["ar", "arabic"].includes(key)) return ["arabic"];
      if (["en", "english"].includes(key)) return ["english"];
      if (["text", "verse"].includes(key)) return ["arabic", "english"];
      return [];
    },
    getFieldValue(item, fieldKey) {
      var _item$ayah5;
      switch (fieldKey) {
        case "surah":
          return item.surah_name || "";
        case "ayah":
          return ((_item$ayah5 = item.ayah) === null || _item$ayah5 === void 0 ? void 0 : _item$ayah5.ayah_id) || item.ayah_number || "";
        case "arabic":
          return item.ayah_verse_ar || "";
        case "english":
          return item.ayah_verse_en || "";
        default:
          return "";
      }
    },
    tokenMatchesItem(item, token, fieldKeys) {
      const term = token.term.toLowerCase();
      let fields = token.field ? this.mapFieldAlias(token.field) : fieldKeys;
      if (!fields.length) {
        fields = fieldKeys;
      }
      if (!fields.length) return false;
      return fields.some(fieldKey => {
        const value = this.stripHtmlTags(this.getFieldValue(item, fieldKey)).toLowerCase();
        return value.includes(term);
      });
    },
    matchesItem(item, tokens, fieldKeys) {
      if (!tokens.length) return true;
      for (const token of tokens) {
        const matched = this.tokenMatchesItem(item, token, fieldKeys);
        if (token.exclude) {
          if (matched) return false;
        } else {
          if (!matched) return false;
        }
      }
      return true;
    },
    highlightText(text, fieldKey) {
      const clean = this.stripHtmlTags(text || "");
      const safe = this.escapeHtml(clean);
      const terms = this.highlightMap[fieldKey] || [];
      if (!terms.length) return safe;
      return terms.reduce((acc, term) => {
        const regex = new RegExp(`(${this.escapeRegExp(term)})`, "gi");
        return acc.replace(regex, '<mark class="search-hit">$1</mark>');
      }, safe);
    },
    formatMeta(item) {
      var _item$ayah6;
      const surah = this.highlightText(item.surah_name || "", "surah");
      const ayah = this.highlightText(String(((_item$ayah6 = item.ayah) === null || _item$ayah6 === void 0 ? void 0 : _item$ayah6.ayah_id) || item.ayah_number || ""), "ayah");
      return `${surah} • Ayah ${ayah}`;
    },
    refreshFolderSidebar() {
      var _this$$refs$folderLis, _this$$refs$folderLis2;
      return (_this$$refs$folderLis = this.$refs.folderList) === null || _this$$refs$folderLis === void 0 || (_this$$refs$folderLis2 = _this$$refs$folderLis.fetchFolders) === null || _this$$refs$folderLis2 === void 0 ? void 0 : _this$$refs$folderLis2.call(_this$$refs$folderLis);
    },
    async initializeAuthentication() {
      this.isAuthenticated = !!(await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_4__.fetchUserIdFromApi)());
      this.authResolved = true;
    },
    notifyBookmarkChange(source = this.bookmarkInstanceId) {
      const token = `${Date.now()}-${source}`;
      try {
        localStorage.setItem("bookmarkRefresh", token);
      } catch (_) {
        // ignore storage errors (e.g., privacy mode)
      }
      window.dispatchEvent(new CustomEvent("bookmarks-updated", {
        detail: {
          token,
          instance: source
        }
      }));
    },
    handleBookmarksUpdated(event) {
      var _event$detail;
      if ((event === null || event === void 0 || (_event$detail = event.detail) === null || _event$detail === void 0 ? void 0 : _event$detail.instance) === this.bookmarkInstanceId) return;
      this.refreshAfterExternalUpdate();
    },
    handleStorageBookmarksUpdated(event) {
      if (event.key !== "bookmarkRefresh") return;
      this.refreshAfterExternalUpdate();
    },
    handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        this.refreshAfterExternalUpdate();
      }
    },
    refreshAfterExternalUpdate() {
      if (this.loading) return;
      const folder = this.selectedFolder || {
        id: "all",
        name: "All bookmarks",
        isAll: true
      };
      this.onFolderSelected(folder);
      this.refreshFolderSidebar();
    },
    toggleFolderPane() {
      this.isFolderCollapsed = !this.isFolderCollapsed;
    },
    async fetchFolders() {
      try {
        var _response$data;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/folders");
        this.folders = ((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.data) || [];
      } catch (_) {
        this.folders = [];
      }
    },
    async onFolderSelected(folder) {
      this.selectedFolder = folder;
      this.loading = true;
      try {
        var _ref, _ref2, _response$data$data, _response$data2, _response$data3, _response$data4;
        const response = folder.isAll ? await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/ayah-bookmarks") : await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/ayah-bookmarks", {
          params: {
            folder_id: folder.id
          }
        });
        const payload = (_ref = (_ref2 = (_response$data$data = (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.data) !== null && _response$data$data !== void 0 ? _response$data$data : (_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.bookmarks) !== null && _ref2 !== void 0 ? _ref2 : response.data) !== null && _ref !== void 0 ? _ref : [];
        this.items = Array.isArray(payload) ? payload : [];
        this.source = folder.isAll ? "all" : ((_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : _response$data4.source) || "manual";
        this.fetchFolders();
      } catch (error) {
        this.items = [];
      } finally {
        this.loading = false;
      }
    },
    prepareBookmark(payload) {
      this.activeAyah = {
        surah_number: payload.surah_number,
        surah_name: payload.surah_name,
        ayah_number: payload.ayah_number,
        ayah_verse_ar: payload.ayah_verse_ar,
        ayah_verse_en: payload.ayah_verse_en
      };
    },
    onSaved() {
      if (this.selectedFolder) {
        this.onFolderSelected(this.selectedFolder);
      }
      this.refreshFolderSidebar();
      this.notifyBookmarkChange();
    },
    async moveBookmark(item, event) {
      var _event$target;
      const targetId = Number(event === null || event === void 0 || (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value);
      if (!targetId || !(item !== null && item !== void 0 && item.bookmark_id) || !this.canMoveFromSelectedFolder) {
        if (event !== null && event !== void 0 && event.target) event.target.value = "";
        return;
      }
      this.movingBookmarkId = item.bookmark_id;
      try {
        var _this$folders$find;
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`/api/ayah-bookmarks/${item.bookmark_id}/folders`, {
          folder_ids: [targetId]
        });
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/ayah-bookmarks/${item.bookmark_id}/folders/${this.selectedFolder.id}`);
        const targetName = ((_this$folders$find = this.folders.find(folder => folder.id === targetId)) === null || _this$folders$find === void 0 ? void 0 : _this$folders$find.name) || "folder";
        this.adjustFolderCount(this.selectedFolder.id, -1);
        this.adjustFolderCount(targetId, 1);
        if (this.source === "manual") {
          this.items = this.items.filter(row => row.id !== item.bookmark_id);
        }
        this.setPanelMessage(`Moved to ${targetName}.`, "success");
      } catch (error) {
        this.setPanelMessage("Unable to move this ayah.", "danger");
      } finally {
        this.movingBookmarkId = null;
        if (event !== null && event !== void 0 && event.target) {
          event.target.value = "";
        }
      }
    },
    adjustFolderCount(folderId, delta) {
      var _this$$refs$folderLis3, _this$$refs$folderLis4;
      const folder = this.folders.find(item => item.id === folderId);
      if (folder) {
        const nextCount = Math.max(0, (folder.ayah_count || 0) + delta);
        folder.ayah_count = nextCount;
      }
      (_this$$refs$folderLis3 = this.$refs.folderList) === null || _this$$refs$folderLis3 === void 0 || (_this$$refs$folderLis4 = _this$$refs$folderLis3.adjustFolderCount) === null || _this$$refs$folderLis4 === void 0 || _this$$refs$folderLis4.call(_this$$refs$folderLis3, folderId, delta);
    },
    setPanelMessage(message, variant) {
      this.panelMessage = message;
      this.panelMessageVariant = variant;
      clearTimeout(this.panelMessageTimer);
      this.panelMessageTimer = setTimeout(() => {
        this.panelMessage = "";
      }, 3000);
    },
    async exportFolder(format) {
      if (!this.canExportFolder) {
        this.setPanelMessage("Select a folder with bookmarks before exporting.", "danger");
        return;
      }
      const rows = this.buildExportRows();
      try {
        if (format === "pdf") {
          await this.exportFolderPdf(rows);
        } else if (format === "word") {
          await this.exportFolderDocx(rows);
        }
      } catch (error) {
        console.error("Folder export failed:", error);
        this.setPanelMessage("Unable to export folder.", "danger");
      }
    },
    buildExportRows() {
      return this.normalizedItems.map(item => {
        const surahLabel = item.surah_name || (item.surah_number ? `Surah ${item.surah_number}` : "Surah");
        return {
          surah: this.stripHtmlTags(surahLabel).trim(),
          ayah: item.ayah_number ? String(item.ayah_number) : "",
          arabic: this.stripHtmlTags(item.ayah_verse_ar || "").trim(),
          translation: this.stripHtmlTags(item.ayah_verse_en || "").trim()
        };
      });
    },
    slugifyForFilename(value) {
      if (!value) return "";
      return value.toString().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x00-\x7F]/g, "").replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "").toLowerCase();
    },
    generateExportFileName(extension) {
      var _this$selectedFolder3;
      const folderName = ((_this$selectedFolder3 = this.selectedFolder) === null || _this$selectedFolder3 === void 0 ? void 0 : _this$selectedFolder3.name) || "bookmarks";
      const dateStamp = new Date().toISOString().split("T")[0];
      const slug = this.slugifyForFilename(`${folderName}_${dateStamp}`);
      const safeName = slug || "bookmarks";
      return `${safeName}.${extension}`;
    },
    createExportPreview(rows) {
      var _this$selectedFolder4;
      const folderName = ((_this$selectedFolder4 = this.selectedFolder) === null || _this$selectedFolder4 === void 0 ? void 0 : _this$selectedFolder4.name) || "Bookmarks";
      const wrapper = document.createElement("div");
      wrapper.className = "bookmark-export-preview";
      const rowsHtml = rows.map(row => `
<tr>
  <td>${this.escapeHtml(row.surah)}</td>
  <td>${this.escapeHtml(row.ayah)}</td>
  <td class="arabic-col" dir="rtl">${this.escapeHtml(row.arabic)}</td>
  <td>${this.escapeHtml(row.translation)}</td>
</tr>`).join("");
      wrapper.innerHTML = `
<div class="bookmark-export-sheet">
  <div class="export-header">
    <h1>Daily Reflections</h1>
    <p class="export-subtitle">${this.escapeHtml(folderName)} · ${rows.length} ayah(s)</p>
  </div>
  <table>
    <colgroup>
      <col class="col-surah" />
      <col class="col-ayah" />
      <col class="col-arabic" />
      <col class="col-translation" />
    </colgroup>
    <thead>
      <tr>
        <th>Surah</th>
        <th>Ayah</th>
        <th>Arabic</th>
        <th>Translation</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>
</div>`;
      return wrapper;
    },
    async exportFolderPdf(rows) {
      const preview = this.createExportPreview(rows);
      document.body.appendChild(preview);
      try {
        const canvas = await html2canvas__WEBPACK_IMPORTED_MODULE_7___default()(preview, {
          scale: Math.min(window.devicePixelRatio || 1, 2),
          backgroundColor: "#ffffff",
          useCORS: true
        });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jspdf__WEBPACK_IMPORTED_MODULE_8__["default"]({
          orientation: "portrait",
          unit: "pt",
          format: "a4"
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = canvas.height * pdfWidth / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(this.generateExportFileName("pdf"));
        this.setPanelMessage("Folder exported as PDF.", "success");
      } finally {
        if (preview.parentNode) {
          preview.parentNode.removeChild(preview);
        }
      }
    },
    async exportFolderDocx(rows) {
      const sections = [new docx__WEBPACK_IMPORTED_MODULE_6__.Paragraph({
        text: "Daily Reflections",
        heading: "Heading1",
        alignment: docx__WEBPACK_IMPORTED_MODULE_6__.AlignmentType.CENTER,
        spacing: {
          after: 300
        }
      })];
      rows.forEach(row => {
        const surahText = [row.surah || "Surah", row.ayah ? `• Ayah ${row.ayah}` : ""].filter(Boolean).join(" ");
        sections.push(new docx__WEBPACK_IMPORTED_MODULE_6__.Paragraph({
          text: surahText,
          bold: true,
          size: 26,
          spacing: {
            after: 120
          }
        }));
        if (row.arabic) {
          sections.push(new docx__WEBPACK_IMPORTED_MODULE_6__.Paragraph({
            text: row.arabic,
            size: 28,
            alignment: docx__WEBPACK_IMPORTED_MODULE_6__.AlignmentType.RIGHT,
            bidi: true,
            spacing: {
              after: 60
            }
          }));
        }
        if (row.translation) {
          sections.push(new docx__WEBPACK_IMPORTED_MODULE_6__.Paragraph({
            text: row.translation,
            size: 24,
            spacing: {
              after: 120
            }
          }));
        }
      });
      const doc = new docx__WEBPACK_IMPORTED_MODULE_6__.Document({
        sections: [{
          properties: {},
          children: sections
        }]
      });
      const blob = await docx__WEBPACK_IMPORTED_MODULE_6__.Packer.toBlob(doc);
      (0,file_saver__WEBPACK_IMPORTED_MODULE_5__.saveAs)(blob, this.generateExportFileName("docx"));
      this.setPanelMessage("Folder exported as Word document.", "success");
    },
    isDeleteBusy(id) {
      return !!this.deleteBusy[id];
    },
    openRemoveConfirm(item) {
      if (!(item !== null && item !== void 0 && item.bookmark_id) || !this.selectedFolder) return;
      if (this.isSmartSelected) {
        this.setPanelMessage("Smart folders cannot be edited.", "danger");
        return;
      }
      this.removeCandidate = item;
      this.removeMode = this.selectedFolder.isAll ? "all" : "folder";
      this.removeConfirmOpen = true;
      document.body.classList.add("modal-open");
    },
    closeRemoveConfirm() {
      this.removeConfirmOpen = false;
      this.removeCandidate = null;
      this.removeBusy = false;
      document.body.classList.remove("modal-open");
    },
    async confirmRemoveBookmark() {
      var _this$removeCandidate;
      if (!((_this$removeCandidate = this.removeCandidate) !== null && _this$removeCandidate !== void 0 && _this$removeCandidate.bookmark_id) || !this.selectedFolder) return;
      this.removeBusy = true;
      const bookmarkId = this.removeCandidate.bookmark_id;
      this.deleteBusy = _objectSpread(_objectSpread({}, this.deleteBusy), {}, {
        [bookmarkId]: true
      });
      try {
        if (this.removeMode === "all") {
          await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/ayah-bookmarks/${bookmarkId}`);
          this.items = this.items.filter(row => row.id !== bookmarkId);
          this.setPanelMessage("Bookmark deleted.", "success");
          await this.refreshFolderSidebar();
        } else {
          await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/ayah-bookmarks/${bookmarkId}/folders/${this.selectedFolder.id}`);
          this.items = this.items.filter(row => row.id !== bookmarkId);
          this.adjustFolderCount(this.selectedFolder.id, -1);
          this.setPanelMessage("Ayah removed from folder.", "success");
        }
      } catch (error) {
        this.setPanelMessage("Unable to remove this ayah.", "danger");
      } finally {
        this.deleteBusy = _objectSpread(_objectSpread({}, this.deleteBusy), {}, {
          [bookmarkId]: false
        });
        this.closeRemoveConfirm();
      }
    },
    toggleBookmarkSelection(bookmarkId) {
      if (!bookmarkId) return;
      const index = this.selectedBookmarkIds.indexOf(bookmarkId);
      if (index > -1) {
        this.selectedBookmarkIds.splice(index, 1);
      } else {
        this.selectedBookmarkIds.push(bookmarkId);
      }
    },
    selectAllBookmarks() {
      const selectableIds = this.filteredItems.filter(item => item.bookmark_id).map(item => item.bookmark_id);
      this.selectedBookmarkIds = [...selectableIds];
    },
    unselectAllBookmarks() {
      this.selectedBookmarkIds = [];
    },
    openBulkDeleteConfirm() {
      var _this$selectedFolder5;
      if (this.selectedBookmarkIds.length === 0) {
        this.setPanelMessage("No bookmarks selected.", "danger");
        return;
      }
      if (this.isSmartSelected) {
        this.setPanelMessage("Smart folders cannot be edited.", "danger");
        return;
      }
      this.removeMode = (_this$selectedFolder5 = this.selectedFolder) !== null && _this$selectedFolder5 !== void 0 && _this$selectedFolder5.isAll ? "all" : "bulk";
      this.removeConfirmOpen = true;
      document.body.classList.add("modal-open");
    },
    async confirmBulkDeleteBookmarks() {
      if (this.selectedBookmarkIds.length === 0) return;
      this.bulkDeleteBusy = true;
      this.removeBusy = true;
      try {
        var _response$data5;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete("/api/ayah-bookmarks/bulk", {
          data: {
            bookmark_ids: this.selectedBookmarkIds
          }
        });
        const deletedCount = ((_response$data5 = response.data) === null || _response$data5 === void 0 ? void 0 : _response$data5.deleted_count) || 0;

        // Remove deleted bookmarks from the list
        this.items = this.items.filter(item => !this.selectedBookmarkIds.includes(item.id));

        // Clear selection
        this.selectedBookmarkIds = [];
        this.setPanelMessage(`Successfully deleted ${deletedCount} bookmark(s).`, "success");
        await this.refreshFolderSidebar();
      } catch (error) {
        var _error$response;
        const errorMsg = ((_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || "Failed to delete bookmarks.";
        this.setPanelMessage(errorMsg, "danger");
      } finally {
        this.bulkDeleteBusy = false;
        this.closeRemoveConfirm();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/bookmarkAuth */ "./resources/js/utils/bookmarkAuth.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "BookmarkModal",
  emits: ["saved"],
  props: {
    ayah: {
      type: Object,
      default: null
    },
    darkTheme: {
      type: Boolean,
      default: false
    },
    showFolderContents: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      folders: [],
      selectedFolderIds: [],
      currentBookmark: null,
      newFolder: {
        name: "",
        icon: "bi-bookmark",
        color: "primary"
      },
      isSaving: false,
      isCreatingFolder: false,
      feedback: "",
      feedbackVariant: "success",
      feedbackTimer: null,
      feedbackDurationMs: 3800,
      closeTimer: null,
      authRedirectTimer: null,
      bootstrapColors: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"],
      folderExpanded: {},
      folderContents: {},
      sectionOpen: {
        create: false
      },
      folderSearch: "",
      pendingDelete: null,
      iconPresets: [{
        icon: "bi-bookmark"
      }, {
        icon: "bi-star"
      }, {
        icon: "bi-heart"
      }, {
        icon: "bi-book"
      }, {
        icon: "bi-book-half"
      }, {
        icon: "bi-leaf"
      }, {
        icon: "bi-bank"
      }, {
        icon: "bi-box-fill"
      }]
    };
  },
  computed: {
    feedbackClass() {
      return this.feedbackVariant === "danger" ? "alert-danger" : "alert-success";
    },
    feedbackIcon() {
      return this.feedbackVariant === "danger" ? "bi bi-exclamation-triangle-fill" : "bi bi-check-circle-fill";
    },
    selectedCount() {
      return this.selectedFolderIds.length;
    },
    folderCount() {
      return this.folders.length;
    },
    filteredFolders() {
      const query = this.folderSearch.trim().toLowerCase();
      const source = query ? this.folders.filter(folder => String((folder === null || folder === void 0 ? void 0 : folder.name) || "").toLowerCase().includes(query)) : [...this.folders];
      return source.sort((a, b) => {
        const aSelected = this.selectedFolderIds.includes(a.id) ? 1 : 0;
        const bSelected = this.selectedFolderIds.includes(b.id) ? 1 : 0;
        if (aSelected !== bSelected) {
          return bSelected - aSelected;
        }
        const aCount = Number((a === null || a === void 0 ? void 0 : a.ayah_count) || 0);
        const bCount = Number((b === null || b === void 0 ? void 0 : b.ayah_count) || 0);
        if (aCount !== bCount) {
          return bCount - aCount;
        }
        return String((a === null || a === void 0 ? void 0 : a.name) || "").localeCompare(String((b === null || b === void 0 ? void 0 : b.name) || ""));
      });
    },
    selectedFoldersPreview() {
      return this.selectedFolderIds.map(id => this.folders.find(folder => folder.id === id)).filter(Boolean);
    },
    hasExistingBookmark() {
      var _this$currentBookmark;
      return !!((_this$currentBookmark = this.currentBookmark) !== null && _this$currentBookmark !== void 0 && _this$currentBookmark.id);
    },
    ayahSurahLabel() {
      var _this$ayah, _this$ayah2, _this$currentBookmark2;
      return String(((_this$ayah = this.ayah) === null || _this$ayah === void 0 ? void 0 : _this$ayah.surah_name) || ((_this$ayah2 = this.ayah) === null || _this$ayah2 === void 0 || (_this$ayah2 = _this$ayah2.surah) === null || _this$ayah2 === void 0 ? void 0 : _this$ayah2.name_en) || ((_this$currentBookmark2 = this.currentBookmark) === null || _this$currentBookmark2 === void 0 ? void 0 : _this$currentBookmark2.surah_name) || "Selected ayah").trim();
    },
    ayahNumberLabel() {
      var _this$ayah3, _this$ayah4, _this$currentBookmark3, _this$currentBookmark4;
      const ayahNumber = Number(((_this$ayah3 = this.ayah) === null || _this$ayah3 === void 0 ? void 0 : _this$ayah3.ayah_number) || ((_this$ayah4 = this.ayah) === null || _this$ayah4 === void 0 ? void 0 : _this$ayah4.ayah_num) || ((_this$currentBookmark3 = this.currentBookmark) === null || _this$currentBookmark3 === void 0 ? void 0 : _this$currentBookmark3.ayah_number) || ((_this$currentBookmark4 = this.currentBookmark) === null || _this$currentBookmark4 === void 0 ? void 0 : _this$currentBookmark4.ayah_num) || 0);
      return ayahNumber ? `Ayah ${ayahNumber}` : "Ayah";
    },
    ayahPreviewArabic() {
      var _this$ayah5, _this$ayah6, _this$currentBookmark5;
      return ((_this$ayah5 = this.ayah) === null || _this$ayah5 === void 0 ? void 0 : _this$ayah5.ayah_verse_ar) || ((_this$ayah6 = this.ayah) === null || _this$ayah6 === void 0 || (_this$ayah6 = _this$ayah6.ayah) === null || _this$ayah6 === void 0 ? void 0 : _this$ayah6.ayah_text) || ((_this$currentBookmark5 = this.currentBookmark) === null || _this$currentBookmark5 === void 0 ? void 0 : _this$currentBookmark5.ayah_verse_ar) || "Arabic text will appear here.";
    },
    ayahPreviewTranslation() {
      var _this$ayah7, _this$ayah8, _this$currentBookmark6;
      return String(((_this$ayah7 = this.ayah) === null || _this$ayah7 === void 0 ? void 0 : _this$ayah7.ayah_verse_en) || ((_this$ayah8 = this.ayah) === null || _this$ayah8 === void 0 ? void 0 : _this$ayah8.translation) || ((_this$currentBookmark6 = this.currentBookmark) === null || _this$currentBookmark6 === void 0 ? void 0 : _this$currentBookmark6.ayah_verse_en) || "").trim();
    },
    pendingDeleteTitle() {
      var _this$pendingDelete;
      return (_this$pendingDelete = this.pendingDelete) !== null && _this$pendingDelete !== void 0 && _this$pendingDelete.name ? `Delete “${this.pendingDelete.name}”?` : "Delete this collection?";
    },
    emptyCollectionsText() {
      if (this.folders.length) {
        return "No collections match your search. Try another name or create a new one.";
      }
      return "No collections yet. Create one above, or save now and organise it later from All.";
    },
    footerPrimaryText() {
      if (this.selectedCount > 0) {
        return this.hasExistingBookmark ? "Update this bookmark's collection placement." : "Save this ayah into the selected collections.";
      }
      return this.hasExistingBookmark ? "Keep this bookmark saved without any collection." : "Save this ayah directly into All.";
    },
    footerSecondaryText() {
      if (this.selectedCount > 0) {
        return `${this.selectedCount} collection${this.selectedCount === 1 ? "" : "s"} selected.`;
      }
      return "You can sort it into collections later without losing the bookmark.";
    },
    saveButtonText() {
      if (this.isSaving) {
        return "Saving...";
      }
      if (!this.selectedCount) {
        return this.hasExistingBookmark ? "Update bookmark" : "Save to All";
      }
      if (this.selectedCount === 1) {
        var _this$selectedFolders;
        return `Save to ${((_this$selectedFolders = this.selectedFoldersPreview[0]) === null || _this$selectedFolders === void 0 ? void 0 : _this$selectedFolders.name) || "collection"}`;
      }
      return `Save to ${this.selectedCount} collections`;
    }
  },
  mounted() {
    const modalEl = document.getElementById("bookmarkModal");
    if (modalEl) {
      this.cleanupModalState();
      modalEl.addEventListener("show.bs.modal", this.onShow);
      modalEl.addEventListener("hidden.bs.modal", this.onHidden);
    }
  },
  beforeUnmount() {
    const modalEl = document.getElementById("bookmarkModal");
    if (modalEl) {
      modalEl.removeEventListener("show.bs.modal", this.onShow);
      modalEl.removeEventListener("hidden.bs.modal", this.onHidden);
      const instance = bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal.getInstance(modalEl);
      if (instance) instance.dispose();
    }
    clearTimeout(this.feedbackTimer);
    clearTimeout(this.closeTimer);
    clearTimeout(this.authRedirectTimer);
    this.cleanupModalState();
  },
  methods: {
    async onShow() {
      this.feedback = "";
      this.pendingDelete = null;
      this.folderSearch = "";
      this.selectedFolderIds = [];
      this.currentBookmark = null;
      this.sectionOpen.create = false;
      this.resetCreateForm();
      const isAuthed = await this.ensureAuthenticated();
      if (!isAuthed) return;
      await this.fetchFolders();
      await this.fetchCurrentBookmark();
      if (!this.folders.length) {
        this.toggleCreateSection(true);
      }
    },
    onHidden() {
      clearTimeout(this.feedbackTimer);
      clearTimeout(this.closeTimer);
      clearTimeout(this.authRedirectTimer);
      this.cleanupModalState();
    },
    async ensureAuthenticated() {
      const userId = await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__.fetchUserIdFromApi)();
      if (userId) {
        return true;
      }
      this.setFeedback("Please log in to save bookmarks. Redirecting...", "danger");
      clearTimeout(this.authRedirectTimer);
      this.authRedirectTimer = setTimeout(() => {
        const redirect = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        window.location.href = `/login?redirect=${encodeURIComponent(redirect)}`;
      }, 1500);
      return false;
    },
    cleanupModalState() {
      const backdrops = Array.from(document.querySelectorAll(".modal-backdrop"));
      if (backdrops.length > 1) {
        backdrops.slice(0, -1).forEach(backdrop => {
          var _backdrop$parentNode, _backdrop$parentNode$;
          return (_backdrop$parentNode = backdrop.parentNode) === null || _backdrop$parentNode === void 0 || (_backdrop$parentNode$ = _backdrop$parentNode.removeChild) === null || _backdrop$parentNode$ === void 0 ? void 0 : _backdrop$parentNode$.call(_backdrop$parentNode, backdrop);
        });
      }
      if (!document.querySelector(".modal.show")) {
        document.body.classList.remove("modal-open");
        document.body.style.removeProperty("padding-right");
      }
    },
    async fetchFolders() {
      try {
        var _response$data;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/folders");
        this.folders = Array.isArray((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.data) ? response.data.data : [];
        this.normalizeSelectedFolders();
      } catch (_) {
        this.setFeedback("Unable to load collections right now.", "danger");
      }
    },
    async fetchCurrentBookmark() {
      var _this$ayah9, _this$ayah0, _this$ayah1, _this$ayah10;
      const surahNumber = Number(((_this$ayah9 = this.ayah) === null || _this$ayah9 === void 0 ? void 0 : _this$ayah9.surah_number) || ((_this$ayah0 = this.ayah) === null || _this$ayah0 === void 0 ? void 0 : _this$ayah0.surah_id));
      const ayahNumber = Number(((_this$ayah1 = this.ayah) === null || _this$ayah1 === void 0 ? void 0 : _this$ayah1.ayah_number) || ((_this$ayah10 = this.ayah) === null || _this$ayah10 === void 0 ? void 0 : _this$ayah10.ayah_num));
      if (!this.ayah || !surahNumber || !ayahNumber) {
        return;
      }
      try {
        var _response$data2;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/ayah-bookmarks", {
          params: {
            surah_number: surahNumber,
            ayah_number: ayahNumber
          }
        });
        const bookmark = Array.isArray((_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.data) ? response.data.data[0] : null;
        this.currentBookmark = bookmark || null;
        if (bookmark !== null && bookmark !== void 0 && bookmark.folders) {
          this.selectedFolderIds = bookmark.folders.map(folder => folder.id);
        }
        this.normalizeSelectedFolders();
      } catch (_) {
        this.currentBookmark = null;
      }
    },
    normalizeSelectedFolders() {
      if (!this.folders.length) return;
      const allowedIds = new Set(this.folders.filter(folder => !folder.is_smart).map(folder => folder.id));
      this.selectedFolderIds = this.selectedFolderIds.filter(id => allowedIds.has(id));
    },
    resetCreateForm() {
      this.newFolder = {
        name: "",
        icon: "bi-bookmark",
        color: "primary"
      };
    },
    toggleCreateSection(forceState = null) {
      this.sectionOpen.create = typeof forceState === "boolean" ? forceState : !this.sectionOpen.create;
      if (!this.sectionOpen.create) {
        this.resetCreateForm();
        return;
      }
      this.$nextTick(() => {
        var _this$$refs$newCollec, _this$$refs$newCollec2;
        (_this$$refs$newCollec = this.$refs.newCollectionInput) === null || _this$$refs$newCollec === void 0 || (_this$$refs$newCollec2 = _this$$refs$newCollec.focus) === null || _this$$refs$newCollec2 === void 0 || _this$$refs$newCollec2.call(_this$$refs$newCollec);
      });
    },
    toggleFolderSelection(folder) {
      if (!folder || folder.is_smart) {
        this.setFeedback("Smart folders cannot be edited manually.", "danger");
        return;
      }
      if (this.selectedFolderIds.includes(folder.id)) {
        this.selectedFolderIds = this.selectedFolderIds.filter(id => id !== folder.id);
        return;
      }
      this.selectedFolderIds = [...this.selectedFolderIds, folder.id];
    },
    async createFolder() {
      const isAuthed = await this.ensureAuthenticated();
      if (!isAuthed) return;
      const name = String(this.newFolder.name || "").trim();
      if (!name) {
        this.setFeedback("Collection name is required.", "danger");
        return;
      }
      const duplicate = this.folders.some(folder => String((folder === null || folder === void 0 ? void 0 : folder.name) || "").trim().toLowerCase() === name.toLowerCase());
      if (duplicate) {
        this.setFeedback("That collection already exists. Choose another name.", "danger");
        return;
      }
      this.isCreatingFolder = true;
      try {
        var _response$data3;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/folders", {
          name,
          icon: this.newFolder.icon || null,
          color: this.newFolder.color || null
        });
        const folder = (_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.folder;
        if (folder) {
          this.folders = [_objectSpread(_objectSpread({}, folder), {}, {
            ayah_count: 0
          }), ...this.folders];
          if (!this.selectedFolderIds.includes(folder.id)) {
            this.selectedFolderIds = [...this.selectedFolderIds, folder.id];
          }
          this.folderExpanded = _objectSpread(_objectSpread({}, this.folderExpanded), {}, {
            [folder.id]: true
          });
          this.folderContents = _objectSpread(_objectSpread({}, this.folderContents), {}, {
            [folder.id]: {
              loading: false,
              items: []
            }
          });
          this.toggleCreateSection(false);
          this.setFeedback("Collection created and selected.", "success");
        }
      } catch (error) {
        var _error$response, _error$response2;
        const apiMessage = ((_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || ((_error$response2 = error.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.errors) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.name) === null || _error$response2 === void 0 ? void 0 : _error$response2[0]);
        this.setFeedback(apiMessage || "Failed to create collection.", "danger");
      } finally {
        this.isCreatingFolder = false;
      }
    },
    async saveBookmark() {
      var _this$ayah11, _this$ayah12, _this$ayah13, _this$ayah14;
      const isAuthed = await this.ensureAuthenticated();
      if (!isAuthed) return;
      const surahNumber = Number(((_this$ayah11 = this.ayah) === null || _this$ayah11 === void 0 ? void 0 : _this$ayah11.surah_number) || ((_this$ayah12 = this.ayah) === null || _this$ayah12 === void 0 ? void 0 : _this$ayah12.surah_id));
      const ayahNumber = Number(((_this$ayah13 = this.ayah) === null || _this$ayah13 === void 0 ? void 0 : _this$ayah13.ayah_number) || ((_this$ayah14 = this.ayah) === null || _this$ayah14 === void 0 ? void 0 : _this$ayah14.ayah_num));
      if (!this.ayah || !surahNumber || !ayahNumber) {
        this.setFeedback("Select an ayah first.", "danger");
        return;
      }
      this.isSaving = true;
      try {
        var _this$currentBookmark7, _this$ayah$surah, _this$ayah$ayah, _response$data4, _this$currentBookmark8;
        this.normalizeSelectedFolders();
        const selectedIds = Array.from(new Set(this.selectedFolderIds));
        const existingIds = ((_this$currentBookmark7 = this.currentBookmark) === null || _this$currentBookmark7 === void 0 || (_this$currentBookmark7 = _this$currentBookmark7.folders) === null || _this$currentBookmark7 === void 0 ? void 0 : _this$currentBookmark7.map(folder => folder.id)) || [];
        const removableIds = existingIds.filter(id => !selectedIds.includes(id));
        const addIds = selectedIds.filter(id => !existingIds.includes(id));
        const payload = {
          surah_number: surahNumber,
          ayah_number: ayahNumber,
          surah_name: this.ayah.surah_name || ((_this$ayah$surah = this.ayah.surah) === null || _this$ayah$surah === void 0 ? void 0 : _this$ayah$surah.name_en) || "Surah",
          ayah_verse_ar: this.ayah.ayah_verse_ar || ((_this$ayah$ayah = this.ayah.ayah) === null || _this$ayah$ayah === void 0 ? void 0 : _this$ayah$ayah.ayah_text) || "",
          ayah_verse_en: this.ayah.ayah_verse_en || this.ayah.translation || "",
          folder_ids: selectedIds
        };
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/ayah-bookmarks", payload);
        const bookmark = ((_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : _response$data4.bookmark) || null;
        if (bookmark) {
          this.currentBookmark = bookmark;
        }
        let detachFailed = false;
        if (removableIds.length && (_this$currentBookmark8 = this.currentBookmark) !== null && _this$currentBookmark8 !== void 0 && _this$currentBookmark8.id) {
          try {
            await Promise.all(removableIds.map(id => axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/ayah-bookmarks/${this.currentBookmark.id}/folders/${id}`)));
            removableIds.forEach(id => {
              const folder = this.folders.find(item => item.id === id);
              if (folder && folder.ayah_count > 0) {
                folder.ayah_count -= 1;
              }
            });
          } catch (_) {
            detachFailed = true;
          }
        }
        addIds.forEach(id => {
          const folder = this.folders.find(item => item.id === id);
          if (folder) {
            folder.ayah_count = Number(folder.ayah_count || 0) + 1;
          }
        });
        await this.fetchCurrentBookmark();
        const successMessage = selectedIds.length ? "Ayah saved to your selected collections." : "Ayah saved. It is available in All.";
        this.setFeedback(detachFailed ? "Bookmark updated, but some collection removals failed." : successMessage, "success", {
          autoClose: true
        });
        this.$emit("saved", _objectSpread(_objectSpread({}, payload), {}, {
          bookmark: this.currentBookmark
        }));
      } catch (error) {
        var _error$response3;
        const fallback = "Failed to save the bookmark.";
        const msg = ((_error$response3 = error.response) === null || _error$response3 === void 0 || (_error$response3 = _error$response3.data) === null || _error$response3 === void 0 ? void 0 : _error$response3.message) || fallback;
        this.setFeedback(msg, "danger");
      } finally {
        this.isSaving = false;
      }
    },
    setFeedback(message, variant, options = {}) {
      this.feedback = message;
      this.feedbackVariant = variant;
      clearTimeout(this.feedbackTimer);
      this.feedbackTimer = setTimeout(() => {
        this.feedback = "";
      }, this.feedbackDurationMs);
      if (options.autoClose) {
        clearTimeout(this.closeTimer);
        this.closeTimer = setTimeout(() => {
          this.hideModal();
        }, this.feedbackDurationMs);
      }
    },
    clearSelection() {
      this.selectedFolderIds = [];
    },
    requestDeleteFolder(folder) {
      if (!folder || folder.is_smart) {
        this.setFeedback("Smart folders cannot be deleted.", "danger");
        return;
      }
      this.pendingDelete = {
        ids: [folder.id],
        name: folder.name
      };
    },
    async confirmDelete() {
      var _this$pendingDelete2;
      const ids = ((_this$pendingDelete2 = this.pendingDelete) === null || _this$pendingDelete2 === void 0 ? void 0 : _this$pendingDelete2.ids) || [];
      if (!ids.length) {
        this.pendingDelete = null;
        return;
      }
      try {
        await Promise.all(ids.map(id => axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/folders/${id}`)));
        this.folders = this.folders.filter(folder => !ids.includes(folder.id));
        this.selectedFolderIds = this.selectedFolderIds.filter(id => !ids.includes(id));
        ids.forEach(id => {
          const expanded = _objectSpread({}, this.folderExpanded);
          delete expanded[id];
          this.folderExpanded = expanded;
          const contents = _objectSpread({}, this.folderContents);
          delete contents[id];
          this.folderContents = contents;
        });
        this.pendingDelete = null;
        await this.fetchCurrentBookmark();
        this.setFeedback("Collection deleted. Saved ayahs stayed available in All.", "success");
      } catch (_) {
        this.setFeedback("Unable to delete this collection right now.", "danger");
      }
    },
    cancelDelete() {
      this.pendingDelete = null;
    },
    hideModal() {
      this.$nextTick(() => {
        const modalEl = document.getElementById("bookmarkModal");
        if (!modalEl) return;
        const instance = bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal.getInstance(modalEl) || new bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal(modalEl);
        instance.hide();
      });
    },
    async toggleFolderContents(folder) {
      var _this$folderContents$;
      const isOpen = !!this.folderExpanded[folder.id];
      this.folderExpanded = _objectSpread(_objectSpread({}, this.folderExpanded), {}, {
        [folder.id]: !isOpen
      });
      if (isOpen || (_this$folderContents$ = this.folderContents[folder.id]) !== null && _this$folderContents$ !== void 0 && _this$folderContents$.items) {
        return;
      }
      this.folderContents = _objectSpread(_objectSpread({}, this.folderContents), {}, {
        [folder.id]: {
          loading: true,
          items: []
        }
      });
      try {
        var _response$data5;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/ayah-bookmarks", {
          params: {
            folder_id: folder.id
          }
        });
        this.folderContents = _objectSpread(_objectSpread({}, this.folderContents), {}, {
          [folder.id]: {
            loading: false,
            items: Array.isArray((_response$data5 = response.data) === null || _response$data5 === void 0 ? void 0 : _response$data5.data) ? response.data.data : []
          }
        });
      } catch (_) {
        this.folderContents = _objectSpread(_objectSpread({}, this.folderContents), {}, {
          [folder.id]: {
            loading: false,
            items: []
          }
        });
      }
    },
    async removeAyahFromFolder(bookmark, folder) {
      if (!(bookmark !== null && bookmark !== void 0 && bookmark.id) || folder !== null && folder !== void 0 && folder.is_smart) return;
      try {
        var _this$folderContents$2, _this$currentBookmark9;
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/ayah-bookmarks/${bookmark.id}/folders/${folder.id}`);
        const items = ((_this$folderContents$2 = this.folderContents[folder.id]) === null || _this$folderContents$2 === void 0 ? void 0 : _this$folderContents$2.items) || [];
        this.folderContents = _objectSpread(_objectSpread({}, this.folderContents), {}, {
          [folder.id]: {
            loading: false,
            items: items.filter(item => item.id !== bookmark.id)
          }
        });
        if (folder.ayah_count > 0) {
          folder.ayah_count -= 1;
        }
        if (((_this$currentBookmark9 = this.currentBookmark) === null || _this$currentBookmark9 === void 0 ? void 0 : _this$currentBookmark9.id) === bookmark.id) {
          this.selectedFolderIds = this.selectedFolderIds.filter(id => id !== folder.id);
        }
        this.setFeedback("Ayah removed from the collection.", "success");
      } catch (_) {
        this.setFeedback("Unable to remove this ayah.", "danger");
      }
    },
    moveTargetFolders(folder) {
      return this.folders.filter(target => !target.is_smart && target.id !== folder.id);
    },
    async moveAyahToFolder(bookmark, fromFolder, event) {
      var _event$target;
      const targetId = Number(event === null || event === void 0 || (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value);
      if (!(bookmark !== null && bookmark !== void 0 && bookmark.id) || !targetId || fromFolder !== null && fromFolder !== void 0 && fromFolder.is_smart) return;
      try {
        var _this$folderContents$3;
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`/api/ayah-bookmarks/${bookmark.id}/folders`, {
          folder_ids: [targetId]
        });
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/ayah-bookmarks/${bookmark.id}/folders/${fromFolder.id}`);
        const fromItems = ((_this$folderContents$3 = this.folderContents[fromFolder.id]) === null || _this$folderContents$3 === void 0 ? void 0 : _this$folderContents$3.items) || [];
        this.folderContents = _objectSpread(_objectSpread({}, this.folderContents), {}, {
          [fromFolder.id]: {
            loading: false,
            items: fromItems.filter(item => item.id !== bookmark.id)
          }
        });
        const targetFolder = this.folders.find(folder => folder.id === targetId);
        if (targetFolder) {
          var _this$folderContents$4;
          targetFolder.ayah_count = Number(targetFolder.ayah_count || 0) + 1;
          if (fromFolder.ayah_count > 0) {
            fromFolder.ayah_count -= 1;
          }
          if ((_this$folderContents$4 = this.folderContents[targetId]) !== null && _this$folderContents$4 !== void 0 && _this$folderContents$4.items) {
            this.folderContents = _objectSpread(_objectSpread({}, this.folderContents), {}, {
              [targetId]: {
                loading: false,
                items: [bookmark, ...this.folderContents[targetId].items]
              }
            });
          }
        }
        if (event !== null && event !== void 0 && event.target) {
          event.target.value = "";
        }
        this.setFeedback("Ayah moved to another collection.", "success");
      } catch (_) {
        this.setFeedback("Unable to move this ayah.", "danger");
      }
    },
    setIcon(icon) {
      this.newFolder.icon = icon;
    },
    setColor(color) {
      this.newFolder.color = color;
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/FolderList.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/FolderList.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var sortablejs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sortablejs */ "./node_modules/sortablejs/modular/sortable.esm.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'FolderList',
  data() {
    return {
      folders: [],
      selectedId: null,
      showCreate: false,
      showCustomFolders: true,
      searchQuery: '',
      newFolder: {
        name: '',
        icon: '',
        color: 'primary'
      },
      createType: 'folder',
      isCreating: false,
      editingFolder: null,
      renameValue: '',
      deleteConfirmOpen: false,
      deleteCandidate: null,
      deleteMode: 'single',
      deleteBusy: false,
      selectedFolders: [],
      bulkDeleteBusy: false,
      bulkDeleteCandidates: [],
      status: '',
      statusVariant: 'success',
      folderSorter: null,
      iconPresets: [{
        icon: 'bi bi-folder2'
      }, {
        icon: 'bi bi-heart'
      }, {
        icon: 'bi bi-star'
      }, {
        icon: 'bi bi-bookmark'
      }, {
        icon: 'bi bi-book'
      }, {
        icon: 'bi bi-journal-text'
      }, {
        icon: 'bi bi-lightbulb'
      }, {
        icon: 'bi bi-tags'
      }, {
        icon: 'bi bi-mosque'
      }, {
        icon: 'bi bi-moon-stars'
      }, {
        icon: 'bi bi-sun'
      }, {
        icon: 'bi bi-cloud-sun'
      }, {
        icon: 'bi bi-lightning-charge'
      }, {
        icon: 'bi bi-flower1'
      }, {
        icon: 'bi bi-leaf'
      }, {
        icon: 'bi bi-tree'
      }, {
        icon: 'bi bi-water'
      }, {
        icon: 'bi bi-gem'
      }, {
        icon: 'bi bi-gift'
      }, {
        icon: 'bi bi-emoji-smile'
      }, {
        icon: 'bi bi-mortarboard'
      }, {
        icon: 'bi bi-layers'
      }, {
        icon: 'bi bi-columns-gap'
      }, {
        icon: 'bi bi-compass'
      }, {
        icon: 'bi bi-flag'
      }, {
        icon: 'bi bi-shield-check'
      }, {
        icon: 'bi bi-cup-hot'
      }, {
        icon: 'bi bi-pencil-square'
      }, {
        icon: 'bi bi-chat-dots'
      }, {
        icon: 'bi bi-person-check'
      }],
      bootstrapColors: ['primary', 'success', 'warning', 'danger', 'info', 'secondary', 'dark']
    };
  },
  computed: {
    statusClass() {
      return this.statusVariant === 'danger' ? 'alert-danger' : 'alert-success';
    },
    highlightTerms() {
      const query = (this.searchQuery || '').trim();
      if (!query) return [];
      const parts = query.split(/\s+/).filter(Boolean);
      return Array.from(new Set(parts)).sort((a, b) => b.length - a.length);
    },
    filteredFolders() {
      if (!this.searchQuery) return this.folders;
      const query = this.searchQuery.toLowerCase();
      return this.folders.filter(folder => (folder.name || '').toLowerCase().includes(query));
    },
    filteredSelectableFolders() {
      return this.filteredFolders.filter(folder => !folder.is_smart);
    },
    deleteModalTitle() {
      if (this.deleteMode === 'bulk' && this.bulkDeleteCandidates.length) {
        const count = this.bulkDeleteCandidates.length;
        return `Delete ${count} folder${count === 1 ? '' : 's'}?`;
      }
      return 'Delete folder?';
    },
    deleteModalMessage() {
      if (this.deleteMode === 'bulk' && this.bulkDeleteCandidates.length) {
        return 'Delete the selected folders and all saved ayat inside them?';
      }
      return 'Delete this folder and all saved ayat inside it?';
    },
    currentDeleteBusy() {
      return this.deleteMode === 'bulk' ? this.bulkDeleteBusy : this.deleteBusy;
    },
    canReorderFolders() {
      return this.showCustomFolders && !this.searchQuery && this.filteredFolders.length > 1;
    }
  },
  watch: {
    canReorderFolders() {
      this.updateFolderSorterState();
    }
  },
  mounted() {
    this.fetchFolders();
    this.$nextTick(() => this.initializeFolderSorter());
  },
  beforeUnmount() {
    if (this.folderSorter) {
      this.folderSorter.destroy();
      this.folderSorter = null;
    }
  },
  methods: {
    highlightFolderName(name) {
      const clean = this.escapeHtml(String(name || ''));
      const terms = this.highlightTerms;
      if (!terms.length) return clean;
      return terms.reduce((acc, term) => {
        const regex = new RegExp(`(${this.escapeRegExp(term)})`, 'gi');
        return acc.replace(regex, '<mark class="search-hit">$1</mark>');
      }, clean);
    },
    escapeHtml(text) {
      return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    },
    escapeRegExp(text) {
      return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },
    adjustFolderCount(folderId, delta) {
      const folder = this.folders.find(item => item.id === folderId);
      if (!folder) return;
      const nextCount = Math.max(0, (folder.ayah_count || 0) + delta);
      folder.ayah_count = nextCount;
    },
    async fetchFolders() {
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/folders');
        this.folders = response.data.data || [];
        if (!this.selectedId) {
          this.selectAll();
        }
        this.$nextTick(() => this.updateFolderSorterState());
      } catch (error) {
        this.setStatus('Failed to load folders.', 'danger');
      }
    },
    initializeFolderSorter() {
      const list = this.$refs.folderStack;
      if (!list || this.folderSorter) {
        this.updateFolderSorterState();
        return;
      }
      this.folderSorter = sortablejs__WEBPACK_IMPORTED_MODULE_1__["default"].create(list, {
        animation: 180,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        ghostClass: 'folder-drag-ghost',
        dragClass: 'folder-dragging',
        draggable: '.folder-item--draggable',
        handle: '.folder-handle',
        delay: 100,
        delayOnTouchOnly: true,
        touchStartThreshold: 5,
        onEnd: event => this.handleFolderSortEnd(event)
      });
      this.updateFolderSorterState();
    },
    updateFolderSorterState() {
      if (!this.folderSorter) return;
      this.folderSorter.option('disabled', !this.canReorderFolders);
    },
    handleFolderSortEnd() {
      var _this$$refs$folderSta;
      if (!this.canReorderFolders) return;
      const items = Array.from(((_this$$refs$folderSta = this.$refs.folderStack) === null || _this$$refs$folderSta === void 0 ? void 0 : _this$$refs$folderSta.querySelectorAll('.folder-item--draggable')) || []).map(el => Number(el.dataset.folderId));
      if (!items.length) return;
      const previousFolders = [...this.folders];
      const orderedFolders = items.map(id => this.folders.find(folder => folder.id === id)).filter(Boolean);
      if (orderedFolders.length !== this.folders.length) {
        return;
      }
      this.folders = orderedFolders;
      this.persistFolderOrder(items, previousFolders);
    },
    async persistFolderOrder(folderIds, previousFolders) {
      try {
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post('/api/folders/order', {
          folder_ids: folderIds
        });
        this.setStatus('Folder order saved.', 'success');
      } catch (error) {
        this.folders = previousFolders;
        this.setStatus('Unable to save folder order.', 'danger');
      }
    },
    selectAll() {
      const allFolder = {
        id: 'all',
        name: 'All bookmarks',
        isAll: true
      };
      this.selectedId = 'all';
      this.$emit('folder-selected', allFolder);
    },
    selectFolder(folder) {
      this.selectedId = folder.id;
      this.$emit('folder-selected', folder);
    },
    toggleCreate() {
      this.showCreate = !this.showCreate;
    },
    startCreate(type) {
      this.createType = type;
      this.showCreate = true;
    },
    async createFolder() {
      if (!this.newFolder.name) {
        this.setStatus('Folder name is required.', 'danger');
        return;
      }
      const name = this.newFolder.name.trim();
      const nameKey = name.toLowerCase();
      if (this.folders.some(folder => (folder.name || '').trim().toLowerCase() === nameKey)) {
        this.setStatus('Folder name already exists. Choose another.', 'danger');
        return;
      }
      this.isCreating = true;
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post('/api/folders', {
          name,
          icon: this.newFolder.icon || null,
          color: this.newFolder.color || null
        });
        const folder = response.data.folder;
        if (folder) {
          this.folders.unshift(_objectSpread(_objectSpread({}, folder), {}, {
            ayah_count: 0
          }));
          this.newFolder.name = '';
          this.newFolder.icon = '';
          this.setStatus('Folder created.', 'success');
        }
      } catch (error) {
        var _error$response, _error$response2;
        const apiMessage = ((_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || ((_error$response2 = error.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.errors) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.name) === null || _error$response2 === void 0 ? void 0 : _error$response2[0]);
        this.setStatus(apiMessage || 'Could not create folder.', 'danger');
      } finally {
        this.isCreating = false;
      }
    },
    startRename(folder) {
      this.editingFolder = folder;
      this.renameValue = folder.name;
    },
    cancelRename() {
      this.editingFolder = null;
      this.renameValue = '';
    },
    openDeleteConfirm(folder) {
      if (!folder) return;
      if (folder.is_smart) {
        this.setStatus('Smart folders cannot be deleted.', 'danger');
        return;
      }
      this.deleteMode = 'single';
      this.deleteCandidate = folder;
      this.deleteConfirmOpen = true;
      document.body.classList.add('modal-open');
    },
    closeDeleteConfirm() {
      this.deleteConfirmOpen = false;
      this.deleteCandidate = null;
      this.bulkDeleteCandidates = [];
      this.deleteMode = 'single';
      document.body.classList.remove('modal-open');
    },
    selectAllCollection() {
      const allFolder = {
        id: 'all',
        name: 'All bookmarks',
        isAll: true
      };
      this.selectedId = 'all';
      this.selectedFolders = [];
      this.$emit('folder-selected', allFolder);
    },
    async confirmDeleteFolder() {
      if (!this.deleteCandidate) return;
      this.deleteBusy = true;
      try {
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/folders/${this.deleteCandidate.id}`);
        this.folders = this.folders.filter(item => item.id !== this.deleteCandidate.id);
        if (this.selectedId === this.deleteCandidate.id) {
          this.selectAllCollection();
        }
        this.selectedFolders = this.selectedFolders.filter(id => {
          var _this$deleteCandidate;
          return id !== ((_this$deleteCandidate = this.deleteCandidate) === null || _this$deleteCandidate === void 0 ? void 0 : _this$deleteCandidate.id);
        });
        this.setStatus('Folder deleted.', 'success');
        this.emitBookmarkChange();
      } catch (error) {
        this.setStatus('Delete failed.', 'danger');
      } finally {
        this.deleteBusy = false;
        this.closeDeleteConfirm();
      }
    },
    isFolderSelected(folderId) {
      return this.selectedFolders.includes(folderId);
    },
    toggleFolderSelection(folderId) {
      const folder = this.folders.find(item => item.id === folderId);
      if (!folder || folder.is_smart) return;
      const index = this.selectedFolders.indexOf(folderId);
      if (index > -1) {
        this.selectedFolders.splice(index, 1);
      } else {
        this.selectedFolders.push(folderId);
      }
    },
    selectAllVisibleFolders() {
      const ids = this.filteredSelectableFolders.map(folder => folder.id);
      this.selectedFolders = [...ids];
    },
    unselectAllFolders() {
      this.selectedFolders = [];
    },
    openBulkDeleteConfirm() {
      const ids = this.selectedFolders.filter(id => {
        const folder = this.folders.find(item => item.id === id);
        return folder && !folder.is_smart;
      });
      if (!ids.length) {
        this.setStatus('Select folders to delete.', 'danger');
        return;
      }
      this.bulkDeleteCandidates = [...ids];
      this.deleteMode = 'bulk';
      this.deleteConfirmOpen = true;
      document.body.classList.add('modal-open');
    },
    async confirmBulkDeleteFolders() {
      if (!this.bulkDeleteCandidates.length) return;
      this.bulkDeleteBusy = true;
      try {
        await Promise.all(this.bulkDeleteCandidates.map(id => axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/folders/${id}`)));
        const removedIds = new Set(this.bulkDeleteCandidates);
        this.folders = this.folders.filter(folder => !removedIds.has(folder.id));
        this.selectedFolders = this.selectedFolders.filter(id => !removedIds.has(id));
        if (removedIds.has(this.selectedId)) {
          this.selectAllCollection();
        }
        const count = this.bulkDeleteCandidates.length;
        this.setStatus(`${count} folder${count === 1 ? '' : 's'} deleted.`, 'success');
        this.emitBookmarkChange();
      } catch (error) {
        this.setStatus('Failed to delete selected folders.', 'danger');
      } finally {
        this.bulkDeleteBusy = false;
        this.closeDeleteConfirm();
      }
    },
    async saveRename() {
      if (!this.editingFolder || !this.renameValue) {
        return;
      }
      const name = this.renameValue.trim();
      const nameKey = name.toLowerCase();
      if (this.folders.some(folder => folder.id !== this.editingFolder.id && (folder.name || '').trim().toLowerCase() === nameKey)) {
        this.setStatus('Folder name already exists. Choose another.', 'danger');
        return;
      }
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].put(`/api/folders/${this.editingFolder.id}`, {
          name
        });
        const updated = response.data.folder;
        if (updated) {
          const idx = this.folders.findIndex(f => f.id === updated.id);
          if (idx !== -1) this.folders[idx].name = updated.name;
          this.setStatus('Folder renamed.', 'success');
        }
      } catch (error) {
        var _error$response3, _error$response4;
        const apiMessage = ((_error$response3 = error.response) === null || _error$response3 === void 0 || (_error$response3 = _error$response3.data) === null || _error$response3 === void 0 ? void 0 : _error$response3.message) || ((_error$response4 = error.response) === null || _error$response4 === void 0 || (_error$response4 = _error$response4.data) === null || _error$response4 === void 0 || (_error$response4 = _error$response4.errors) === null || _error$response4 === void 0 || (_error$response4 = _error$response4.name) === null || _error$response4 === void 0 ? void 0 : _error$response4[0]);
        this.setStatus(apiMessage || 'Rename failed.', 'danger');
      } finally {
        this.cancelRename();
      }
    },
    async handleDrop(event, folder) {
      if (folder.is_smart) {
        this.setStatus('Smart folders cannot be edited.', 'danger');
        return;
      }
      const raw = event.dataTransfer.getData('text/plain');
      if (!raw) return;
      let payload;
      try {
        payload = JSON.parse(raw);
      } catch (error) {
        return;
      }
      try {
        if (payload.bookmark_id) {
          await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`/api/ayah-bookmarks/${payload.bookmark_id}/folders`, {
            folder_ids: [folder.id]
          });
        } else {
          await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post('/api/ayah-bookmarks', {
            surah_number: payload.surah_number,
            ayah_number: payload.ayah_number,
            surah_name: payload.surah_name,
            ayah_verse_ar: payload.ayah_verse_ar,
            ayah_verse_en: payload.ayah_verse_en,
            folder_ids: [folder.id]
          });
        }
        this.setStatus('Ayah added to folder.', 'success');
        this.fetchFolders();
        this.emitBookmarkChange();
      } catch (error) {
        this.setStatus('Unable to add ayah to folder.', 'danger');
      }
    },
    emitBookmarkChange() {
      const token = `folder-${Date.now()}`;
      try {
        localStorage.setItem('bookmarkRefresh', token);
      } catch (_) {
        // ignore
      }
      window.dispatchEvent(new CustomEvent('bookmarks-updated', {
        detail: {
          token,
          instance: 'folder-list'
        }
      }));
    },
    setStatus(message, variant) {
      this.status = message;
      this.statusVariant = variant;
      setTimeout(() => {
        this.status = '';
      }, 2500);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_bookmarks_BookmarkManager_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_bookmarks_BookmarkManager_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/vue/bookmarks/BookmarkManager.vue */ "./resources/components/vue/bookmarks/BookmarkManager.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/AyahRow.vue?vue&type=template&id=16e6787f&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/AyahRow.vue?vue&type=template&id=16e6787f&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "card-body"
};
const _hoisted_2 = {
  class: "d-flex justify-content-between align-items-start gap-2"
};
const _hoisted_3 = {
  class: "text-muted small"
};
const _hoisted_4 = ["innerHTML"];
const _hoisted_5 = {
  key: 0,
  class: "ayah-translation"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _$props$ayah$ayah;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    class: "card ayah-row mb-3",
    draggable: "true",
    onDragstart: _cache[1] || (_cache[1] = (...args) => $options.onDragStart && $options.onDragStart(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.surahLabel) + " • Ayah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(((_$props$ayah$ayah = $props.ayah.ayah) === null || _$props$ayah$ayah === void 0 ? void 0 : _$props$ayah$ayah.ayah_id) || $props.ayah.ayah_number), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ayah-arabic",
    innerHTML: $props.ayah.ayah_verse_ar
  }, null, 8 /* PROPS */, _hoisted_4), $props.ayah.ayah_verse_en ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.ayah.ayah_verse_en), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-sm btn-outline-secondary bookmark-quick",
    "data-bs-toggle": "modal",
    "data-bs-target": "#bookmarkModal",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.emitBookmark && $options.emitBookmark(...args))
  }, [...(_cache[2] || (_cache[2] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bookmark-plus"
  }, null, -1 /* CACHED */)]))])])])], 32 /* NEED_HYDRATION */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkManager.vue?vue&type=template&id=e5539dca&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkManager.vue?vue&type=template&id=e5539dca&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container-fluid bookmark-manager shadow-md"
};
const _hoisted_2 = {
  key: 0
};
const _hoisted_3 = {
  key: 0,
  class: "guest-nudge-banner"
};
const _hoisted_4 = {
  class: "container-fluid d-flex align-items-center justify-content-between"
};
const _hoisted_5 = {
  class: "row g-4 bookmark-layout align-items-start"
};
const _hoisted_6 = ["aria-hidden"];
const _hoisted_7 = {
  class: "bookmark-panel",
  style: {
    "border-radius": "22px"
  }
};
const _hoisted_8 = {
  class: "panel-header"
};
const _hoisted_9 = {
  class: "panel-title"
};
const _hoisted_10 = {
  class: "panel-subtitle"
};
const _hoisted_11 = {
  class: "panel-actions"
};
const _hoisted_12 = {
  class: "dropdown export-dropdown ms-2"
};
const _hoisted_13 = ["disabled"];
const _hoisted_14 = {
  class: "dropdown-menu dropdown-menu-end export-menu",
  "aria-labelledby": "bookmarkExportDropdown"
};
const _hoisted_15 = ["disabled"];
const _hoisted_16 = ["disabled"];
const _hoisted_17 = ["aria-pressed", "aria-label", "title"];
const _hoisted_18 = {
  class: "panel-body",
  style: {
    "border-radius": "22px"
  }
};
const _hoisted_19 = {
  class: "panel-search"
};
const _hoisted_20 = {
  class: "input-group"
};
const _hoisted_21 = {
  key: 1,
  class: "loading-state"
};
const _hoisted_22 = {
  key: 2,
  class: "empty-state"
};
const _hoisted_23 = {
  key: 3,
  class: "selection-toolbar"
};
const _hoisted_24 = {
  class: "toolbar-left"
};
const _hoisted_25 = ["disabled"];
const _hoisted_26 = {
  key: 1,
  class: "selection-count"
};
const _hoisted_27 = {
  class: "toolbar-right"
};
const _hoisted_28 = ["disabled"];
const _hoisted_29 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-1"
};
const _hoisted_30 = {
  key: 1,
  class: "bi bi-trash me-1"
};
const _hoisted_31 = {
  key: 4,
  class: "list-wrapper"
};
const _hoisted_32 = {
  class: "list-group ayah-list",
  ref: "ayahList"
};
const _hoisted_33 = {
  class: "ayah-list-head"
};
const _hoisted_34 = {
  key: 0,
  class: "ayah-checkbox"
};
const _hoisted_35 = ["checked", "onChange"];
const _hoisted_36 = ["innerHTML"];
const _hoisted_37 = {
  class: "ayah-list-actions"
};
const _hoisted_38 = ["disabled", "onChange"];
const _hoisted_39 = {
  value: "",
  selected: "",
  disabled: ""
};
const _hoisted_40 = ["value"];
const _hoisted_41 = ["onClick"];
const _hoisted_42 = ["onClick"];
const _hoisted_43 = ["disabled", "title", "onClick"];
const _hoisted_44 = {
  key: 0,
  class: "spinner-border spinner-border-sm"
};
const _hoisted_45 = {
  key: 1,
  class: "bi bi-trash"
};
const _hoisted_46 = ["innerHTML"];
const _hoisted_47 = ["innerHTML"];
const _hoisted_48 = {
  key: 0,
  class: "modal-backdrop fade show"
};
const _hoisted_49 = {
  key: 1,
  class: "modal fade show remove-confirm-modal",
  tabindex: "-1",
  role: "dialog",
  "aria-modal": "true",
  style: {
    "display": "block"
  }
};
const _hoisted_50 = {
  class: "modal-dialog modal-dialog-centered"
};
const _hoisted_51 = {
  class: "modal-content"
};
const _hoisted_52 = {
  class: "modal-header"
};
const _hoisted_53 = {
  class: "modal-title"
};
const _hoisted_54 = {
  class: "modal-body"
};
const _hoisted_55 = {
  class: "mb-0"
};
const _hoisted_56 = {
  class: "modal-footer"
};
const _hoisted_57 = ["disabled"];
const _hoisted_58 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_folder_list = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("folder-list");
  const _component_bookmark_modal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("bookmark-modal");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [$data.authResolved ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [!$data.isAuthenticated ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "nudge-text"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-info-circle-fill me-2"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("You're browsing as a guest. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: "/login",
      class: "fw-bold text-teal"
    }, "Log in"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" to sync bookmarks across devices.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn-close btn-close-white",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.hideGuestNudge && $options.hideGuestNudge(...args))
    })])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["col-12 col-lg-4 folder-col px-lg-0", {
      'is-collapsed': $data.isFolderCollapsed
    }]),
    "aria-hidden": $data.isFolderCollapsed ? 'true' : 'false'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_folder_list, {
    ref: "folderList",
    onFolderSelected: $options.onFolderSelected
  }, null, 8 /* PROPS */, ["onFolderSelected"])], 10 /* CLASS, PROPS */, _hoisted_6), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["col-12 col-lg-8 panel-col ps-lg-3", {
      'is-expanded': $data.isFolderCollapsed
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "panel-eyebrow"
  }, "Collection", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedFolder ? $data.selectedFolder.name : "Folder contents"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.panelCountLabel) + " · " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.folderDescriptor), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-sm btn-forest dropdown-toggle",
    type: "button",
    id: "bookmarkExportDropdown",
    "data-bs-toggle": "dropdown",
    "aria-expanded": "false",
    disabled: !$options.canExportFolder
  }, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-file-earmark-arrow-down-fill me-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Export folder ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_13), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "dropdown-item export-item",
    type: "button",
    onClick: _cache[1] || (_cache[1] = $event => $options.exportFolder('pdf')),
    disabled: !$options.canExportFolder
  }, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-filetype-pdf icon"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" PDF Document ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_15)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "dropdown-item export-item",
    type: "button",
    onClick: _cache[2] || (_cache[2] = $event => $options.exportFolder('word')),
    disabled: !$options.canExportFolder
  }, [...(_cache[16] || (_cache[16] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-filetype-doc icon"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Word Document ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_16)])])]), _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    class: "panel-cta",
    href: "/surat"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Go back to the Holy Quran "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-right ms-2"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "panel-toggle",
    onClick: _cache[3] || (_cache[3] = (...args) => $options.toggleFolderPane && $options.toggleFolderPane(...args)),
    "aria-pressed": !$data.isFolderCollapsed,
    "aria-label": $data.isFolderCollapsed ? 'Show folders' : 'Hide folders',
    title: $data.isFolderCollapsed ? 'Show folders' : 'Hide folders'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $data.isFolderCollapsed ? 'bi-layout-sidebar-inset' : 'bi-layout-sidebar-inset-reverse'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_17)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [$data.panelMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["panel-alert", $data.panelMessageVariant === 'danger' ? 'alert-danger' : 'alert-success'])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.panelMessage), 3 /* TEXT, CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.query = $event),
    class: "form-control",
    placeholder: "Search bookmarks..."
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.query]]), $data.query ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    class: "btn btn-outline-secondary",
    type: "button",
    onClick: _cache[5] || (_cache[5] = (...args) => $options.clearSearch && $options.clearSearch(...args))
  }, " Clear ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, " Loading ayat... ")) : $options.filteredItems.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_22, [...(_cache[19] || (_cache[19] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "empty-title"
  }, " No ayat match your search ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "empty-subtitle"
  }, " Try different terms or clear the filters. ", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Selection Toolbar "), !$data.loading && $options.filteredItems.length > 0 && !$options.isSmartSelected ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-sm btn-outline-success",
    onClick: _cache[6] || (_cache[6] = (...args) => $options.selectAllBookmarks && $options.selectAllBookmarks(...args)),
    disabled: $options.allBookmarksSelected
  }, [...(_cache[20] || (_cache[20] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check-all me-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Select All ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_25), $options.selectedBookmarkCount > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn btn-sm btn-outline-secondary",
    onClick: _cache[7] || (_cache[7] = (...args) => $options.unselectAllBookmarks && $options.unselectAllBookmarks(...args))
  }, [...(_cache[21] || (_cache[21] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-circle me-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Unselect All ", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $options.selectedBookmarkCount > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.selectedBookmarkCount) + " selected ", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [$options.selectedBookmarkCount > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn btn-sm btn-outline-danger",
    onClick: _cache[8] || (_cache[8] = (...args) => $options.openBulkDeleteConfirm && $options.openBulkDeleteConfirm(...args)),
    disabled: $data.bulkDeleteBusy
  }, [$data.bulkDeleteBusy ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_29)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_30)), _cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delete Selected ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_28)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !$data.loading && $options.filteredItems.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredItems, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.row_key,
      class: "list-group-item ayah-list-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [item.bookmark_id && !$options.isSmartSelected ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "checkbox",
      style: {
        "width": "20px"
      },
      checked: $data.selectedBookmarkIds.includes(item.bookmark_id),
      onChange: $event => $options.toggleBookmarkSelection(item.bookmark_id)
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_35)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "ayah-list-meta",
      innerHTML: $options.formatMeta(item)
    }, null, 8 /* PROPS */, _hoisted_36), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [$options.canMoveFromSelectedFolder ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("select", {
      key: 0,
      class: "form-select form-select-sm move-select",
      disabled: $data.movingBookmarkId === item.bookmark_id || $options.moveTargets.length === 0,
      onChange: $event => $options.moveBookmark(item, $event)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.moveTargets.length ? "Move to..." : "No other folders"), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.moveTargets, folder => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
        key: `move-${folder.id}`,
        value: folder.id
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 9 /* TEXT, PROPS */, _hoisted_40);
    }), 128 /* KEYED_FRAGMENT */))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_38)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button\n                      type=\"button\"\n                      class=\"btn btn-sm btn-outline-secondary bookmark-quick\"\n                      data-bs-toggle=\"modal\"\n                      data-bs-target=\"#bookmarkModal\"\n                      @click=\"prepareBookmark(item)\"\n                    >\n                      <i class=\"bi bi-bookmark-plus\"></i>\n                    </button> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button\n                      type=\"button\"\n                      class=\"btn btn-sm btn-outline-secondary open-quick\"\n                      @click=\"openInSurat(item)\"\n                      title=\"Open in Quran\"\n                      aria-label=\"Open ayah in Quran\"\n                    >\n                      <i class=\"bi bi-box-arrow-up-right\"></i>\n                    </button> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-sm btn-outline-secondary copy-quick",
      onClick: $event => $options.copyBookmark(item),
      title: "Copy",
      "aria-label": "Copy ayah"
    }, [...(_cache[23] || (_cache[23] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clipboard"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_41), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-sm btn-outline-secondary share-quick",
      onClick: $event => $options.shareBookmarkOnWhatsApp(item),
      title: "Share via WhatsApp",
      "aria-label": "Share ayah via WhatsApp"
    }, [...(_cache[24] || (_cache[24] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-whatsapp"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_42), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-sm btn-outline-danger remove-quick",
      disabled: $options.isDeleteBusy(item.bookmark_id) || $options.isSmartSelected,
      title: $options.deleteTooltip,
      onClick: $event => $options.openRemoveConfirm(item)
    }, [$options.isDeleteBusy(item.bookmark_id) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_44)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_45))], 8 /* PROPS */, _hoisted_43)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "ayah-list-ar",
      innerHTML: $options.highlightText(item.ayah_verse_ar, 'arabic')
    }, null, 8 /* PROPS */, _hoisted_46), item.ayah_verse_en ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 0,
      class: "ayah-list-en",
      innerHTML: $options.highlightText(item.ayah_verse_en, 'english')
    }, null, 8 /* PROPS */, _hoisted_47)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_bookmark_modal, {
    ayah: $data.activeAyah,
    onSaved: $options.onSaved
  }, null, 8 /* PROPS */, ["ayah", "onSaved"]), $data.removeConfirmOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_48)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.removeConfirmOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_53, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.removeConfirmTitle), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "aria-label": "Close",
    onClick: _cache[9] || (_cache[9] = (...args) => $options.closeRemoveConfirm && $options.closeRemoveConfirm(...args))
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_55, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.removeConfirmMessage), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary",
    onClick: _cache[10] || (_cache[10] = (...args) => $options.closeRemoveConfirm && $options.closeRemoveConfirm(...args))
  }, " Cancel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger",
    disabled: $data.removeBusy,
    onClick: _cache[11] || (_cache[11] = $event => $data.removeMode === 'bulk' ? $options.confirmBulkDeleteBookmarks() : $options.confirmRemoveBookmark())
  }, [$data.removeBusy ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_58)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delete ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_57)])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=template&id=5e82f99b&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=template&id=5e82f99b&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "modal fade",
  id: "bookmarkModal",
  tabindex: "-1",
  "aria-labelledby": "bookmarkModalLabel",
  "aria-hidden": "true"
};
const _hoisted_2 = {
  class: "modal-dialog modal-dialog-centered modal-dialog-scrollable bookmark-modal-dialog"
};
const _hoisted_3 = {
  class: "modal-header"
};
const _hoisted_4 = {
  class: "bookmark-header-main"
};
const _hoisted_5 = {
  class: "bookmark-header-copy"
};
const _hoisted_6 = {
  class: "bookmark-header-meta"
};
const _hoisted_7 = {
  class: "bookmark-meta-chip"
};
const _hoisted_8 = {
  class: "bookmark-meta-chip"
};
const _hoisted_9 = {
  class: "bookmark-meta-chip is-accent"
};
const _hoisted_10 = {
  class: "modal-body"
};
const _hoisted_11 = {
  class: "bookmark-alert-icon",
  "aria-hidden": "true"
};
const _hoisted_12 = {
  key: 1,
  class: "bookmark-delete-confirm"
};
const _hoisted_13 = {
  class: "bookmark-delete-copy"
};
const _hoisted_14 = {
  class: "bookmark-delete-actions"
};
const _hoisted_15 = {
  class: "bookmark-layout"
};
const _hoisted_16 = {
  class: "section-card bookmark-section-main"
};
const _hoisted_17 = {
  class: "section-head"
};
const _hoisted_18 = {
  class: "section-actions"
};
const _hoisted_19 = {
  class: "bookmark-search-row"
};
const _hoisted_20 = {
  key: 0,
  class: "bookmark-search-shell"
};
const _hoisted_21 = {
  key: 0,
  class: "bookmark-create-panel"
};
const _hoisted_22 = {
  class: "bookmark-create-grid"
};
const _hoisted_23 = {
  class: "bookmark-create-field bookmark-create-field-name"
};
const _hoisted_24 = {
  class: "bookmark-create-field"
};
const _hoisted_25 = {
  class: "icon-presets"
};
const _hoisted_26 = ["onClick"];
const _hoisted_27 = {
  class: "bookmark-create-field"
};
const _hoisted_28 = {
  class: "color-swatches"
};
const _hoisted_29 = ["onClick"];
const _hoisted_30 = {
  class: "visually-hidden"
};
const _hoisted_31 = {
  class: "bookmark-create-actions"
};
const _hoisted_32 = ["disabled"];
const _hoisted_33 = {
  key: 0,
  class: "spinner-border spinner-border-sm",
  "aria-hidden": "true"
};
const _hoisted_34 = {
  key: 1,
  class: "bi bi-plus-circle",
  "aria-hidden": "true"
};
const _hoisted_35 = {
  key: 1,
  class: "folder-grid"
};
const _hoisted_36 = ["aria-pressed", "disabled", "onClick"];
const _hoisted_37 = {
  class: "pill-icon",
  "aria-hidden": "true"
};
const _hoisted_38 = {
  key: 1,
  class: "bi bi-folder2-open"
};
const _hoisted_39 = {
  class: "pill-copy"
};
const _hoisted_40 = {
  class: "pill-title"
};
const _hoisted_41 = {
  class: "pill-count"
};
const _hoisted_42 = ["onClick", "aria-label"];
const _hoisted_43 = {
  key: 2,
  class: "empty-state"
};
const _hoisted_44 = {
  class: "section-card bookmark-section-summary"
};
const _hoisted_45 = {
  class: "section-head section-head-summary"
};
const _hoisted_46 = {
  class: "bookmark-ayah-preview"
};
const _hoisted_47 = {
  class: "bookmark-ayah-preview-head"
};
const _hoisted_48 = {
  class: "bookmark-ayah-kicker"
};
const _hoisted_49 = ["innerHTML"];
const _hoisted_50 = {
  key: 0,
  class: "bookmark-ayah-preview-en"
};
const _hoisted_51 = {
  class: "bookmark-summary-block"
};
const _hoisted_52 = {
  key: 0,
  class: "bookmark-summary-chips"
};
const _hoisted_53 = {
  key: 1,
  class: "bookmark-summary-note"
};
const _hoisted_54 = {
  class: "bookmark-summary-block"
};
const _hoisted_55 = {
  class: "bookmark-summary-list"
};
const _hoisted_56 = {
  key: 0
};
const _hoisted_57 = {
  key: 1
};
const _hoisted_58 = {
  key: 2,
  class: "section-card bookmark-section-contents"
};
const _hoisted_59 = {
  key: 0,
  class: "empty-state"
};
const _hoisted_60 = {
  key: 1,
  class: "folder-contents"
};
const _hoisted_61 = {
  class: "folder-toggle"
};
const _hoisted_62 = ["onClick"];
const _hoisted_63 = {
  class: "folder-toggle-title"
};
const _hoisted_64 = {
  class: "folder-toggle-icon",
  "aria-hidden": "true"
};
const _hoisted_65 = {
  class: "folder-toggle-actions"
};
const _hoisted_66 = ["disabled", "onClick"];
const _hoisted_67 = ["onClick"];
const _hoisted_68 = {
  key: 0,
  class: "folder-items"
};
const _hoisted_69 = {
  key: 0,
  class: "folder-items-empty"
};
const _hoisted_70 = {
  key: 1,
  class: "folder-items-empty"
};
const _hoisted_71 = {
  class: "folder-item-header"
};
const _hoisted_72 = {
  class: "folder-item-actions"
};
const _hoisted_73 = ["onChange", "disabled"];
const _hoisted_74 = ["value"];
const _hoisted_75 = ["disabled", "onClick"];
const _hoisted_76 = ["innerHTML"];
const _hoisted_77 = {
  key: 0,
  class: "folder-item-en mb-0"
};
const _hoisted_78 = {
  class: "modal-footer"
};
const _hoisted_79 = {
  class: "bookmark-footer-copy"
};
const _hoisted_80 = {
  class: "bookmark-footer-actions"
};
const _hoisted_81 = ["disabled"];
const _hoisted_82 = {
  key: 0,
  class: "spinner-border spinner-border-sm",
  "aria-hidden": "true"
};
const _hoisted_83 = {
  key: 1,
  class: "bi bi-bookmark-check",
  "aria-hidden": "true"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["modal-content bookmark-modal", {
      'surat-dark-modal': $props.darkTheme
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "bookmark-header-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bookmark-star-fill"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "bookmark-header-kicker"
  }, "Bookmark flow", -1 /* CACHED */)), _cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title",
    id: "bookmarkModalLabel"
  }, "Save this ayah", -1 /* CACHED */)), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "modal-subtitle"
  }, " Choose a collection, create one if you need it, then confirm once. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_7, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-folder2-open",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.folderCount) + " collection" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.folderCount === 1 ? "" : "s"), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_8, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journal-text",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.ayahSurahLabel), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_9, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check2-circle",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.selectedCount) + " selected ", 1 /* TEXT */)])])])]), _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [$data.feedback ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["alert bookmark-alert", $options.feedbackClass]),
    role: "alert"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($options.feedbackIcon)
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.feedback), 1 /* TEXT */)], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.pendingDelete ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.pendingDeleteTitle), 1 /* TEXT */), _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Deleting a collection keeps the ayahs saved in All for later organisation.", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-cancel",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.cancelDelete && $options.cancelDelete(...args))
  }, [...(_cache[18] || (_cache[18] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Cancel", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger btn-delete-confirm",
    onClick: _cache[1] || (_cache[1] = (...args) => $options.confirmDelete && $options.confirmDelete(...args))
  }, [...(_cache[19] || (_cache[19] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-trash3",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Delete", -1 /* CACHED */)]))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-step"
  }, "Step 1"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Choose a collection"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-description"
  }, " Pick one or more collections. Leave them empty if you only want this ayah saved in All. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [$options.selectedCount ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn btn-link btn-clear",
    onClick: _cache[2] || (_cache[2] = (...args) => $options.clearSelection && $options.clearSelection(...args))
  }, " Clear ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn btn-create-toggle", {
      'is-active': $data.sectionOpen.create
    }]),
    onClick: _cache[3] || (_cache[3] = $event => $options.toggleCreateSection())
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $data.sectionOpen.create ? 'bi-dash-lg' : 'bi-plus-lg']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.sectionOpen.create ? "Close" : "New collection"), 1 /* TEXT */)], 2 /* CLASS */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [$data.folders.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("label", _hoisted_20, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Search collections", -1 /* CACHED */)), _cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.folderSearch = $event),
    type: "search",
    class: "form-control bookmark-search-input",
    placeholder: "Search collections"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.folderSearch, void 0, {
    trim: true
  }]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), $data.sectionOpen.create ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "bookmark-field-label"
  }, "Collection name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    ref: "newCollectionInput",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.newFolder.name = $event),
    type: "text",
    class: "form-control",
    placeholder: "Reflection gems"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.newFolder.name, void 0, {
    trim: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "bookmark-field-label"
  }, "Icon", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.iconPresets, preset => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: preset.icon,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["icon-preset-btn", {
        'is-active': $data.newFolder.icon === preset.icon
      }]),
      onClick: $event => $options.setIcon(preset.icon)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(preset.icon)
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_26);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "bookmark-field-label"
  }, "Color", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.bootstrapColors, color => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: `swatch-${color}`,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["color-swatch-btn", {
        'is-active': $data.newFolder.color === color
      }]),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        background: `var(--bs-${color})`
      }),
      onClick: $event => $options.setColor(color)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(color), 1 /* TEXT */)], 14 /* CLASS, STYLE, PROPS */, _hoisted_29);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-create",
    disabled: $data.isCreatingFolder,
    onClick: _cache[6] || (_cache[6] = (...args) => $options.createFolder && $options.createFolder(...args))
  }, [$data.isCreatingFolder ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_33)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_34)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.isCreatingFolder ? "Creating..." : "Create collection"), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_32), $data.folders.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn btn-cancel",
    onClick: _cache[7] || (_cache[7] = $event => $options.toggleCreateSection(false))
  }, [...(_cache[26] || (_cache[26] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-counterclockwise",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Use existing", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $options.filteredFolders.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_35, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredFolders, folder => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: folder.id,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["folder-pill", [folder.color ? `pill-${folder.color}` : 'pill-neutral', {
        'is-selected': $data.selectedFolderIds.includes(folder.id),
        'is-disabled': folder.is_smart
      }]]),
      "aria-pressed": $data.selectedFolderIds.includes(folder.id) ? 'true' : 'false',
      disabled: folder.is_smart,
      onClick: $event => $options.toggleFolderSelection(folder)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_37, [folder.icon ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", {
      key: 0,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(folder.icon)
    }, null, 2 /* CLASS */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_38))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_40, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_41, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.ayah_count || 0) + " saved", 1 /* TEXT */)]), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "pill-check",
      "aria-hidden": "true"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check-lg"
    })], -1 /* CACHED */)), !folder.is_smart ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: 0,
      type: "button",
      class: "pill-delete",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.requestDeleteFolder(folder), ["stop", "prevent"]),
      "aria-label": `Delete ${folder.name}`
    }, [...(_cache[27] || (_cache[27] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-trash3",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_42)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 10 /* CLASS, PROPS */, _hoisted_36);
  }), 128 /* KEYED_FRAGMENT */))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_43, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-folder2-open",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.emptyCollectionsText), 1 /* TEXT */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("aside", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-step"
  }, "Step 2"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Review and save"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-description"
  }, " One tap keeps this ayah ready to reopen from the reader toolbar. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bookmark-status-pill", {
      'is-saved': $options.hasExistingBookmark
    }])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.hasExistingBookmark ? "Already saved" : "New bookmark"), 3 /* TEXT, CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_48, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.ayahSurahLabel), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.ayahNumberLabel), 1 /* TEXT */)]), _cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "bookmark-ayah-preview-badge"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-stars",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Ready ")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "bookmark-ayah-preview-ar",
    innerHTML: $options.ayahPreviewArabic
  }, null, 8 /* PROPS */, _hoisted_49), $options.ayahPreviewTranslation ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.ayahPreviewTranslation), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", {
    class: "bookmark-summary-title"
  }, "Selected collections", -1 /* CACHED */)), $options.selectedFoldersPreview.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_52, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.selectedFoldersPreview, folder => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
      key: `selected-folder-${folder.id}`,
      class: "bookmark-summary-chip"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(folder.icon || 'bi bi-folder2-open'),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_53, " No collection selected. This ayah will still be saved and stay visible in All. "))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", {
    class: "bookmark-summary-title"
  }, "What happens next", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ol", _hoisted_55, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "We save this ayah to your bookmark list.", -1 /* CACHED */)), $options.selectedFoldersPreview.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", _hoisted_56, " The selected collections stay attached for quick filtering. ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", _hoisted_57, " You can organise it later without losing the saved ayah. ")), _cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Use Open bookmarks if you want a larger management view.", -1 /* CACHED */))])])])]), $props.showFolderContents ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_58, [_cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-head"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-step"
  }, "Advanced"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Collection contents"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-description"
  }, " Review saved ayahs inside each collection and move them if needed. ")])], -1 /* CACHED */)), $data.folders.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_59, [...(_cache[36] || (_cache[36] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-inboxes",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "No collections to preview yet.", -1 /* CACHED */)]))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_60, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.folders, folder => {
    var _$data$folderContents, _$data$folderContents2;
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: `contents-${folder.id}`,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["folder-content", {
        'is-open': $data.folderExpanded[folder.id]
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "folder-toggle-main",
      type: "button",
      onClick: $event => $options.toggleFolderContents(folder)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_64, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(folder.icon || 'bi bi-folder2-open')
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.ayah_count || 0) + " saved", 1 /* TEXT */)])])], 8 /* PROPS */, _hoisted_62), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_65, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-cancel btn-folder-action",
      disabled: folder.is_smart,
      onClick: $event => $options.requestDeleteFolder(folder)
    }, [...(_cache[37] || (_cache[37] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-trash3",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Delete", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_66), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-folder-toggle",
      type: "button",
      onClick: $event => $options.toggleFolderContents(folder)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $data.folderExpanded[folder.id] ? 'bi-chevron-up' : 'bi-chevron-down']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_67)])]), $data.folderExpanded[folder.id] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_68, [(_$data$folderContents = $data.folderContents[folder.id]) !== null && _$data$folderContents !== void 0 && _$data$folderContents.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_69, " Loading saved ayahs... ")) : !((_$data$folderContents2 = $data.folderContents[folder.id]) !== null && _$data$folderContents2 !== void 0 && (_$data$folderContents2 = _$data$folderContents2.items) !== null && _$data$folderContents2 !== void 0 && _$data$folderContents2.length) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_70, " No ayahs saved in this collection yet. ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 2
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.folderContents[folder.id].items, item => {
      var _item$ayah, _item$ayah2;
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
        key: item.id,
        class: "folder-item"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.surah_name || "Surah") + " · Ayah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(((_item$ayah = item.ayah) === null || _item$ayah === void 0 ? void 0 : _item$ayah.ayah_id) || item.ayah_number || item.ayah_num), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
        class: "form-select form-select-sm",
        onChange: $event => $options.moveAyahToFolder(item, folder, $event),
        disabled: folder.is_smart
      }, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: "",
        disabled: "",
        selected: ""
      }, "Move to...", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.moveTargetFolders(folder), target => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
          key: target.id,
          value: target.id
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(target.name), 9 /* TEXT, PROPS */, _hoisted_74);
      }), 128 /* KEYED_FRAGMENT */))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_73), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        type: "button",
        class: "btn btn-cancel btn-folder-action",
        disabled: folder.is_smart,
        onClick: $event => $options.removeAyahFromFolder(item, folder)
      }, [...(_cache[39] || (_cache[39] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-dash-circle",
        "aria-hidden": "true"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Remove", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_75)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "folder-item-ar",
        innerHTML: item.ayah_verse_ar || ((_item$ayah2 = item.ayah) === null || _item$ayah2 === void 0 ? void 0 : _item$ayah2.ayah_text)
      }, null, 8 /* PROPS */, _hoisted_76), item.ayah_verse_en ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_77, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.ayah_verse_en), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_78, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_79, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.footerPrimaryText), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.footerSecondaryText), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_80, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/bookmarks",
    class: "btn btn-manage"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-layout-text-sidebar-reverse",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Open bookmarks")], -1 /* CACHED */)), _cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-cancel",
    "data-bs-dismiss": "modal"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Cancel")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-save",
    disabled: $data.isSaving,
    onClick: _cache[8] || (_cache[8] = (...args) => $options.saveBookmark && $options.saveBookmark(...args))
  }, [$data.isSaving ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_82)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_83)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.saveButtonText), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_81)])])], 2 /* CLASS */)])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/FolderList.vue?vue&type=template&id=c2bf8a50&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/FolderList.vue?vue&type=template&id=c2bf8a50&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "folder-list"
};
const _hoisted_2 = {
  class: "folder-top"
};
const _hoisted_3 = {
  class: "folder-meta"
};
const _hoisted_4 = {
  class: "folder-count"
};
const _hoisted_5 = {
  class: "folder-top-actions"
};
const _hoisted_6 = {
  key: 0,
  class: "create-panel mb-3 animate__animated animate__fadeIn"
};
const _hoisted_7 = {
  class: "create-heading"
};
const _hoisted_8 = {
  class: "mb-3"
};
const _hoisted_9 = {
  class: "mb-3"
};
const _hoisted_10 = {
  class: "icon-picker-grid"
};
const _hoisted_11 = ["onClick", "title"];
const _hoisted_12 = {
  class: "mb-3"
};
const _hoisted_13 = {
  class: "color-picker-grid"
};
const _hoisted_14 = ["onClick"];
const _hoisted_15 = ["disabled"];
const _hoisted_16 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2"
};
const _hoisted_17 = {
  class: "folder-scroll-area"
};
const _hoisted_18 = {
  class: "folder-panel"
};
const _hoisted_19 = {
  class: "folder-panel__controls"
};
const _hoisted_20 = {
  class: "folder-search mb-3"
};
const _hoisted_21 = {
  class: "input-group"
};
const _hoisted_22 = {
  key: 0,
  class: "selection-toolbar folder-selection-toolbar mb-3"
};
const _hoisted_23 = {
  class: "selection-status"
};
const _hoisted_24 = {
  class: "selection-status__count"
};
const _hoisted_25 = {
  class: "toolbar-actions"
};
const _hoisted_26 = ["disabled"];
const _hoisted_27 = {
  class: "toolbar-right"
};
const _hoisted_28 = ["disabled"];
const _hoisted_29 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-1"
};
const _hoisted_30 = {
  key: 1,
  class: "bi bi-trash me-1"
};
const _hoisted_31 = {
  class: "modal-section"
};
const _hoisted_32 = {
  key: 0,
  class: "rename-modal fade show"
};
const _hoisted_33 = {
  class: "modal-body"
};
const _hoisted_34 = {
  class: "modal-footer"
};
const _hoisted_35 = {
  key: 1,
  class: "delete-confirm-modal fade show"
};
const _hoisted_36 = {
  class: "modal-header"
};
const _hoisted_37 = {
  class: "modal-title"
};
const _hoisted_38 = {
  class: "modal-body"
};
const _hoisted_39 = {
  class: "modal-footer"
};
const _hoisted_40 = ["disabled"];
const _hoisted_41 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2"
};
const _hoisted_42 = {
  class: "folder-stack-wrap"
};
const _hoisted_43 = {
  class: "list-group folder-stack",
  ref: "folderStack"
};
const _hoisted_44 = ["data-folder-id", "onClick", "onDrop"];
const _hoisted_45 = {
  class: "folder-main-wrapper d-flex align-items-center flex-grow-1"
};
const _hoisted_46 = {
  key: 0,
  class: "folder-handle",
  "aria-hidden": "true"
};
const _hoisted_47 = {
  class: "folder-main"
};
const _hoisted_48 = ["id", "checked", "disabled", "title", "onChange"];
const _hoisted_49 = {
  class: "folder-icon"
};
const _hoisted_50 = ["innerHTML"];
const _hoisted_51 = {
  class: "folder-count-pill"
};
const _hoisted_52 = ["onClick"];
const _hoisted_53 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "folder-icon-box"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-folder2-open"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "folder-title"
  }, "Bookmark Folders", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.folders.length) + " folders", 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "create-trigger",
    type: "button",
    onClick: _cache[0] || (_cache[0] = $event => $options.startCreate('folder'))
  }, [...(_cache[19] || (_cache[19] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-lg"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Create folder", -1 /* CACHED */)]))])])]), $data.showCreate ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Create new folder", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-sm btn-link",
    type: "button",
    onClick: _cache[1] || (_cache[1] = (...args) => $options.toggleCreate && $options.toggleCreate(...args))
  }, " Close ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label small text-muted"
  }, "Folder Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.newFolder.name = $event),
    class: "form-control",
    placeholder: "Inspiration"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.newFolder.name, void 0, {
    trim: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label small text-muted"
  }, "Choose Icon", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.iconPresets, preset => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: preset.icon,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["icon-choice", {
        active: $data.newFolder.icon === preset.icon
      }]),
      onClick: $event => $data.newFolder.icon = preset.icon,
      title: preset.icon
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(preset.icon)
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_11);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label small text-muted"
  }, "Theme Color", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.bootstrapColors, color => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: color,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["color-choice", ['bg-' + color, {
        active: $data.newFolder.color === color
      }]]),
      onClick: $event => $data.newFolder.color = color
    }, null, 10 /* CLASS, PROPS */, _hoisted_14);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-premium-save w-100",
    disabled: $data.isCreating || !$data.newFolder.name,
    onClick: _cache[3] || (_cache[3] = (...args) => $options.createFolder && $options.createFolder(...args))
  }, [$data.isCreating ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_16)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.isCreating ? 'Creating...' : 'Create folder'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_15)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.status ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 1,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["alert", $options.statusClass]),
    role: "alert"
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.status), 3 /* TEXT, CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.searchQuery = $event),
    type: "text",
    class: "form-control",
    placeholder: "Search folders..."
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchQuery, void 0, {
    trim: true
  }]])])]), $options.filteredFolders.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedFolders.length || 0), 1 /* TEXT */), _cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, "folders held", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "selection-pill selection-pill--primary",
    onClick: _cache[5] || (_cache[5] = (...args) => $options.selectAllVisibleFolders && $options.selectAllVisibleFolders(...args)),
    disabled: $options.filteredSelectableFolders.length === 0
  }, [...(_cache[26] || (_cache[26] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check-all"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Select All ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_26), $data.selectedFolders.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "selection-pill selection-pill--muted",
    onClick: _cache[6] || (_cache[6] = (...args) => $options.unselectAllFolders && $options.unselectAllFolders(...args))
  }, [...(_cache[27] || (_cache[27] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-circle"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Clear Selection ", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [$data.selectedFolders.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn delete-selected",
    onClick: _cache[7] || (_cache[7] = (...args) => $options.openBulkDeleteConfirm && $options.openBulkDeleteConfirm(...args)),
    disabled: $data.bulkDeleteBusy
  }, [$data.bulkDeleteBusy ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_29)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_30)), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delete Selected ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_28)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [$data.editingFolder ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_32, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "modal-title"
  }, "Rename folder")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => $data.renameValue = $event),
    class: "form-control",
    placeholder: "New folder name"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.renameValue, void 0, {
    trim: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-secondary",
    onClick: _cache[9] || (_cache[9] = (...args) => $options.cancelRename && $options.cancelRename(...args))
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-primary",
    onClick: _cache[10] || (_cache[10] = (...args) => $options.saveRename && $options.saveRename(...args))
  }, "Save")])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.deleteConfirmOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.deleteModalTitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.deleteModalMessage), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-secondary",
    onClick: _cache[11] || (_cache[11] = (...args) => $options.closeDeleteConfirm && $options.closeDeleteConfirm(...args))
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger",
    disabled: $options.currentDeleteBusy,
    onClick: _cache[12] || (_cache[12] = $event => $data.deleteMode === 'bulk' ? $options.confirmBulkDeleteFolders() : $options.confirmDeleteFolder())
  }, [$options.currentDeleteBusy ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_41)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delete ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_40)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["list-group-item folder-item d-flex align-items-center justify-content-between", {
      active: $data.selectedId === 'all'
    }]),
    onClick: _cache[13] || (_cache[13] = (...args) => $options.selectAll && $options.selectAll(...args))
  }, [...(_cache[31] || (_cache[31] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "folder-main"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "folder-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-collection"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "folder-name"
  }, "All bookmarks")], -1 /* CACHED */)]))], 2 /* CLASS */), $data.showCustomFolders ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 0
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredFolders, folder => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: folder.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["list-group-item folder-item folder-item--draggable d-flex align-items-center justify-content-between gap-2", {
        active: $data.selectedId === folder.id,
        'folder-item-selected': $options.isFolderSelected(folder.id)
      }]),
      "data-folder-id": folder.id,
      onClick: $event => $options.selectFolder(folder),
      onDragover: _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["prevent"])),
      onDrop: $event => $options.handleDrop($event, folder)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [$options.canReorderFolders ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_46, [...(_cache[32] || (_cache[32] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-grip-vertical"
    }, null, -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      onClick: _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"])),
      type: "checkbox",
      class: "form-check-input",
      id: `folder-select-${folder.id}`,
      checked: $options.isFolderSelected(folder.id),
      disabled: folder.is_smart,
      title: folder.is_smart ? 'Smart folders cannot be deleted' : '',
      onChange: $event => $options.toggleFolderSelection(folder.id)
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_48), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(folder.icon || 'bi bi-folder2')
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "folder-name",
      innerHTML: $options.highlightFolderName(folder.name)
    }, null, 8 /* PROPS */, _hoisted_50)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "folder-actions",
      onClick: _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_51, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.ayah_count), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "folder-action rename",
      onClick: $event => $options.startRename(folder)
    }, [...(_cache[33] || (_cache[33] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-pencil"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_52), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "folder-action delete",
      onClick: $event => $options.openDeleteConfirm(folder)
    }, [...(_cache[34] || (_cache[34] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-trash"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_53)])], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_44);
  }), 128 /* KEYED_FRAGMENT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */)])])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/AyahRow.vue?vue&type=style&index=0&id=16e6787f&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/AyahRow.vue?vue&type=style&index=0&id=16e6787f&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkManager.vue?vue&type=style&index=0&id=e5539dca&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkManager.vue?vue&type=style&index=0&id=e5539dca&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=5e82f99b&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=5e82f99b&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/FolderList.vue?vue&type=style&index=0&id=c2bf8a50&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/FolderList.vue?vue&type=style&index=0&id=c2bf8a50&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/bookmarks/AyahRow.vue":
/*!********************************************************!*\
  !*** ./resources/components/vue/bookmarks/AyahRow.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AyahRow_vue_vue_type_template_id_16e6787f_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AyahRow.vue?vue&type=template&id=16e6787f&scoped=true */ "./resources/components/vue/bookmarks/AyahRow.vue?vue&type=template&id=16e6787f&scoped=true");
/* harmony import */ var _AyahRow_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AyahRow.vue?vue&type=script&lang=js */ "./resources/components/vue/bookmarks/AyahRow.vue?vue&type=script&lang=js");
/* harmony import */ var _AyahRow_vue_vue_type_style_index_0_id_16e6787f_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AyahRow.vue?vue&type=style&index=0&id=16e6787f&scoped=true&lang=css */ "./resources/components/vue/bookmarks/AyahRow.vue?vue&type=style&index=0&id=16e6787f&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_AyahRow_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AyahRow_vue_vue_type_template_id_16e6787f_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-16e6787f"],['__file',"resources/components/vue/bookmarks/AyahRow.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/bookmarks/AyahRow.vue?vue&type=script&lang=js":
/*!********************************************************************************!*\
  !*** ./resources/components/vue/bookmarks/AyahRow.vue?vue&type=script&lang=js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahRow_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahRow_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AyahRow.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/AyahRow.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/bookmarks/AyahRow.vue?vue&type=style&index=0&id=16e6787f&scoped=true&lang=css":
/*!****************************************************************************************************************!*\
  !*** ./resources/components/vue/bookmarks/AyahRow.vue?vue&type=style&index=0&id=16e6787f&scoped=true&lang=css ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahRow_vue_vue_type_style_index_0_id_16e6787f_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AyahRow.vue?vue&type=style&index=0&id=16e6787f&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/AyahRow.vue?vue&type=style&index=0&id=16e6787f&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/bookmarks/AyahRow.vue?vue&type=template&id=16e6787f&scoped=true":
/*!**************************************************************************************************!*\
  !*** ./resources/components/vue/bookmarks/AyahRow.vue?vue&type=template&id=16e6787f&scoped=true ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahRow_vue_vue_type_template_id_16e6787f_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahRow_vue_vue_type_template_id_16e6787f_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AyahRow.vue?vue&type=template&id=16e6787f&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/AyahRow.vue?vue&type=template&id=16e6787f&scoped=true");


/***/ }),

/***/ "./resources/components/vue/bookmarks/BookmarkManager.vue":
/*!****************************************************************!*\
  !*** ./resources/components/vue/bookmarks/BookmarkManager.vue ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BookmarkManager_vue_vue_type_template_id_e5539dca_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BookmarkManager.vue?vue&type=template&id=e5539dca&scoped=true */ "./resources/components/vue/bookmarks/BookmarkManager.vue?vue&type=template&id=e5539dca&scoped=true");
/* harmony import */ var _BookmarkManager_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BookmarkManager.vue?vue&type=script&lang=js */ "./resources/components/vue/bookmarks/BookmarkManager.vue?vue&type=script&lang=js");
/* harmony import */ var _BookmarkManager_vue_vue_type_style_index_0_id_e5539dca_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BookmarkManager.vue?vue&type=style&index=0&id=e5539dca&scoped=true&lang=css */ "./resources/components/vue/bookmarks/BookmarkManager.vue?vue&type=style&index=0&id=e5539dca&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_BookmarkManager_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_BookmarkManager_vue_vue_type_template_id_e5539dca_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-e5539dca"],['__file',"resources/components/vue/bookmarks/BookmarkManager.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/bookmarks/BookmarkManager.vue?vue&type=script&lang=js":
/*!****************************************************************************************!*\
  !*** ./resources/components/vue/bookmarks/BookmarkManager.vue?vue&type=script&lang=js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkManager_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkManager_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkManager.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkManager.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/bookmarks/BookmarkManager.vue?vue&type=style&index=0&id=e5539dca&scoped=true&lang=css":
/*!************************************************************************************************************************!*\
  !*** ./resources/components/vue/bookmarks/BookmarkManager.vue?vue&type=style&index=0&id=e5539dca&scoped=true&lang=css ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkManager_vue_vue_type_style_index_0_id_e5539dca_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkManager.vue?vue&type=style&index=0&id=e5539dca&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkManager.vue?vue&type=style&index=0&id=e5539dca&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/bookmarks/BookmarkManager.vue?vue&type=template&id=e5539dca&scoped=true":
/*!**********************************************************************************************************!*\
  !*** ./resources/components/vue/bookmarks/BookmarkManager.vue?vue&type=template&id=e5539dca&scoped=true ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkManager_vue_vue_type_template_id_e5539dca_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkManager_vue_vue_type_template_id_e5539dca_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkManager.vue?vue&type=template&id=e5539dca&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkManager.vue?vue&type=template&id=e5539dca&scoped=true");


/***/ }),

/***/ "./resources/components/vue/bookmarks/BookmarkModal.vue":
/*!**************************************************************!*\
  !*** ./resources/components/vue/bookmarks/BookmarkModal.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BookmarkModal_vue_vue_type_template_id_5e82f99b_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BookmarkModal.vue?vue&type=template&id=5e82f99b&scoped=true */ "./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=template&id=5e82f99b&scoped=true");
/* harmony import */ var _BookmarkModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BookmarkModal.vue?vue&type=script&lang=js */ "./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=script&lang=js");
/* harmony import */ var _BookmarkModal_vue_vue_type_style_index_0_id_5e82f99b_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BookmarkModal.vue?vue&type=style&index=0&id=5e82f99b&scoped=true&lang=css */ "./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=5e82f99b&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_BookmarkModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_BookmarkModal_vue_vue_type_template_id_5e82f99b_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-5e82f99b"],['__file',"resources/components/vue/bookmarks/BookmarkModal.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=script&lang=js":
/*!**************************************************************************************!*\
  !*** ./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=script&lang=js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkModal.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=5e82f99b&scoped=true&lang=css":
/*!**********************************************************************************************************************!*\
  !*** ./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=5e82f99b&scoped=true&lang=css ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkModal_vue_vue_type_style_index_0_id_5e82f99b_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkModal.vue?vue&type=style&index=0&id=5e82f99b&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=5e82f99b&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=template&id=5e82f99b&scoped=true":
/*!********************************************************************************************************!*\
  !*** ./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=template&id=5e82f99b&scoped=true ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkModal_vue_vue_type_template_id_5e82f99b_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkModal_vue_vue_type_template_id_5e82f99b_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkModal.vue?vue&type=template&id=5e82f99b&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=template&id=5e82f99b&scoped=true");


/***/ }),

/***/ "./resources/components/vue/bookmarks/FolderList.vue":
/*!***********************************************************!*\
  !*** ./resources/components/vue/bookmarks/FolderList.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FolderList_vue_vue_type_template_id_c2bf8a50_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FolderList.vue?vue&type=template&id=c2bf8a50&scoped=true */ "./resources/components/vue/bookmarks/FolderList.vue?vue&type=template&id=c2bf8a50&scoped=true");
/* harmony import */ var _FolderList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FolderList.vue?vue&type=script&lang=js */ "./resources/components/vue/bookmarks/FolderList.vue?vue&type=script&lang=js");
/* harmony import */ var _FolderList_vue_vue_type_style_index_0_id_c2bf8a50_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FolderList.vue?vue&type=style&index=0&id=c2bf8a50&scoped=true&lang=css */ "./resources/components/vue/bookmarks/FolderList.vue?vue&type=style&index=0&id=c2bf8a50&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_FolderList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_FolderList_vue_vue_type_template_id_c2bf8a50_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-c2bf8a50"],['__file',"resources/components/vue/bookmarks/FolderList.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/bookmarks/FolderList.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/components/vue/bookmarks/FolderList.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FolderList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FolderList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FolderList.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/FolderList.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/bookmarks/FolderList.vue?vue&type=style&index=0&id=c2bf8a50&scoped=true&lang=css":
/*!*******************************************************************************************************************!*\
  !*** ./resources/components/vue/bookmarks/FolderList.vue?vue&type=style&index=0&id=c2bf8a50&scoped=true&lang=css ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FolderList_vue_vue_type_style_index_0_id_c2bf8a50_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FolderList.vue?vue&type=style&index=0&id=c2bf8a50&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/FolderList.vue?vue&type=style&index=0&id=c2bf8a50&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/bookmarks/FolderList.vue?vue&type=template&id=c2bf8a50&scoped=true":
/*!*****************************************************************************************************!*\
  !*** ./resources/components/vue/bookmarks/FolderList.vue?vue&type=template&id=c2bf8a50&scoped=true ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FolderList_vue_vue_type_template_id_c2bf8a50_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FolderList_vue_vue_type_template_id_c2bf8a50_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FolderList.vue?vue&type=template&id=c2bf8a50&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/FolderList.vue?vue&type=template&id=c2bf8a50&scoped=true");


/***/ }),

/***/ "./resources/js/components/bookmarks/BookmarkManager.vue":
/*!***************************************************************!*\
  !*** ./resources/js/components/bookmarks/BookmarkManager.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BookmarkManager_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BookmarkManager.vue?vue&type=script&lang=js */ "./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_BookmarkManager_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/bookmarks/BookmarkManager.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=script&lang=js":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=script&lang=js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkManager_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkManager_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkManager.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/utils/bookmarkAuth.js":
/*!********************************************!*\
  !*** ./resources/js/utils/bookmarkAuth.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchUserIdFromApi: () => (/* binding */ fetchUserIdFromApi),
/* harmony export */   resolveClientUserId: () => (/* binding */ resolveClientUserId)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");

const USER_META_SELECTOR = 'meta[name="user"]';
function parseId(value) {
  if (value === undefined || value === null) return null;
  const normalized = String(value).trim();
  if (!normalized) return null;
  const asNumber = Number(normalized);
  return Number.isFinite(asNumber) && asNumber > 0 ? asNumber : normalized;
}
function resolveClientUserId() {
  var _window, _document$body, _document$body2;
  if (typeof window === 'undefined') {
    return null;
  }
  if ((_window = window) !== null && _window !== void 0 && (_window = _window.Laravel) !== null && _window !== void 0 && _window.userId) {
    return parseId(window.Laravel.userId);
  }
  const meta = document.querySelector(USER_META_SELECTOR);
  const metaValue = parseId(meta === null || meta === void 0 ? void 0 : meta.getAttribute('content'));
  if (metaValue) {
    return metaValue;
  }
  const datasetValue = parseId(((_document$body = document.body) === null || _document$body === void 0 || (_document$body = _document$body.dataset) === null || _document$body === void 0 ? void 0 : _document$body.userId) || ((_document$body2 = document.body) === null || _document$body2 === void 0 || (_document$body2 = _document$body2.dataset) === null || _document$body2 === void 0 ? void 0 : _document$body2.user));
  if (datasetValue) {
    return datasetValue;
  }
  return null;
}
async function fetchUserIdFromApi() {
  const localId = resolveClientUserId();
  if (localId) {
    return localId;
  }
  try {
    var _response$data;
    const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/userId');
    const apiValue = parseId((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.userId);
    if (apiValue) {
      return apiValue;
    }
  } catch (error) {
    // swallow; helper should not break callers
  }
  return null;
}

/***/ })

}]);