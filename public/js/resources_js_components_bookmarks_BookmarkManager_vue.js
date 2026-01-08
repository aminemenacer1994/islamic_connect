"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_bookmarks_BookmarkManager_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/AyahRow.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/AyahRow.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _AyahRow_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AyahRow.vue */ "./resources/js/components/bookmarks/AyahRow.vue");
/* harmony import */ var _FolderList_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FolderList.vue */ "./resources/js/components/bookmarks/FolderList.vue");
/* harmony import */ var _BookmarkModal_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BookmarkModal.vue */ "./resources/js/components/bookmarks/BookmarkModal.vue");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'BookmarkManager',
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
      source: 'manual',
      loading: false,
      activeAyah: null,
      movingBookmarkId: null,
      deleteBusy: {},
      removeConfirmOpen: false,
      removeCandidate: null,
      removeMode: 'folder',
      removeBusy: false,
      panelMessage: '',
      panelMessageVariant: 'success',
      panelMessageTimer: null,
      isFolderCollapsed: false,
      query: ''
    };
  },
  computed: {
    sourceLabel() {
      if (this.source === 'smart') return 'Smart';
      if (this.source === 'all') return 'All';
      return 'Manual';
    },
    normalizedItems() {
      if (!this.items.length) return [];
      return this.items.map(item => {
        var _item$ayah, _item$ayah2, _item$ayah3, _item$ayah4;
        if (this.source === 'smart') {
          var _item$surah;
          return {
            row_key: `smart-${item.id}`,
            bookmark_id: null,
            surah_number: item.surah_id,
            surah_name: ((_item$surah = item.surah) === null || _item$surah === void 0 ? void 0 : _item$surah.name_en) || `Surah ${item.surah_id}`,
            ayah_number: item.ayah_id,
            ayah_verse_ar: item.ayah_text,
            ayah_verse_en: ''
          };
        }
        return {
          row_key: `bookmark-${item.id}`,
          bookmark_id: item.id,
          surah_number: item.surah_number || ((_item$ayah = item.ayah) === null || _item$ayah === void 0 ? void 0 : _item$ayah.surah_id),
          surah_name: item.surah_name || ((_item$ayah2 = item.ayah) === null || _item$ayah2 === void 0 || (_item$ayah2 = _item$ayah2.surah) === null || _item$ayah2 === void 0 ? void 0 : _item$ayah2.name_en) || 'Surah',
          ayah_number: ((_item$ayah3 = item.ayah) === null || _item$ayah3 === void 0 ? void 0 : _item$ayah3.ayah_id) || item.ayah_number || item.ayah_num,
          ayah_verse_ar: item.ayah_verse_ar || ((_item$ayah4 = item.ayah) === null || _item$ayah4 === void 0 ? void 0 : _item$ayah4.ayah_text),
          ayah_verse_en: item.ayah_verse_en || ''
        };
      });
    },
    parsedQuery() {
      return this.parseQuery(this.query);
    },
    activeFieldKeys() {
      return ['surah', 'ayah', 'arabic', 'english'];
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
      if (!this.selectedFolder) return 'Unified library';
      if (this.selectedFolder.isAll) return 'Global collection';
      if (this.selectedFolder.is_smart) return 'Smart folder';
      return 'Curated collection';
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
      if (this.isSmartSelected) return 'Smart folders cannot be edited.';
      if ((_this$selectedFolder2 = this.selectedFolder) !== null && _this$selectedFolder2 !== void 0 && _this$selectedFolder2.isAll) return 'Delete from all folders';
      return 'Remove from this folder';
    },
    removeConfirmTitle() {
      return this.removeMode === 'all' ? 'Delete bookmark?' : 'Remove from folder?';
    },
    removeConfirmMessage() {
      if (this.removeMode === 'all') {
        return 'Delete this bookmark from all folders?';
      }
      return 'Remove this ayah from the current folder?';
    },
    moveTargets() {
      if (!this.canMoveFromSelectedFolder) return [];
      return this.folders.filter(folder => !folder.is_smart && folder.id !== this.selectedFolder.id);
    }
  },
  mounted() {
    this.fetchFolders();
  },
  beforeUnmount() {
    clearTimeout(this.panelMessageTimer);
  },
  methods: {
    clearSearch() {
      this.query = '';
    },
    stripHtmlTags(text) {
      if (!text) return '';
      const div = document.createElement('div');
      div.innerHTML = text;
      return div.textContent || div.innerText || '';
    },
    getBookmarkSurahLabel(item) {
      const name = this.stripHtmlTags((item === null || item === void 0 ? void 0 : item.surah_name) || '');
      if (name) return name;
      if (item !== null && item !== void 0 && item.surah_number) return `Surah ${item.surah_number}`;
      return 'Surah';
    },
    getBookmarkAyahNumber(item) {
      return (item === null || item === void 0 ? void 0 : item.ayah_number) || '';
    },
    buildBookmarkMessage(item) {
      if (!item) return '';
      const surahLabel = this.getBookmarkSurahLabel(item);
      const ayahNumber = this.getBookmarkAyahNumber(item);
      const header = ayahNumber ? `${surahLabel} (Ayah ${ayahNumber})` : surahLabel;
      const arabic = this.stripHtmlTags(item.ayah_verse_ar || '');
      const translation = this.stripHtmlTags(item.ayah_verse_en || '');
      const lines = [header];
      if (arabic) lines.push(`Arabic: ${arabic}`);
      if (translation) lines.push(`Translation: ${translation}`);
      return lines.join('\n\n');
    },
    async copyText(text) {
      var _navigator$clipboard;
      if (!text) return false;
      if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && (_navigator$clipboard = navigator.clipboard) !== null && _navigator$clipboard !== void 0 && _navigator$clipboard.writeText && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch (_) {
          // fall back
        }
      }
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
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
        this.setPanelMessage('Ayah copied to clipboard.', 'success');
      } else {
        this.setPanelMessage('Unable to copy ayah.', 'danger');
      }
    },
    shareBookmarkOnWhatsApp(item) {
      const message = this.buildBookmarkMessage(item);
      if (!message) return;
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://api.whatsapp.com/send?text=${encodedMessage}`;
      window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    },
    openInSurat(item) {
      const surahNumber = Number((item === null || item === void 0 ? void 0 : item.surah_number) || (item === null || item === void 0 ? void 0 : item.surah_id));
      const ayahNumber = Number((item === null || item === void 0 ? void 0 : item.ayah_number) || (item === null || item === void 0 ? void 0 : item.ayah_num) || (item === null || item === void 0 ? void 0 : item.ayah_id));
      if (!surahNumber || !ayahNumber) {
        this.setPanelMessage('Unable to open this ayah.', 'danger');
        return;
      }
      const url = `/surat?surah=${surahNumber}&ayah=${ayahNumber}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    },
    escapeHtml(text) {
      return (text || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    },
    escapeRegExp(text) {
      return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },
    parseQuery(query) {
      const tokens = [];
      if (!query) return tokens;
      const regex = /(-)?(?:(\w+):)?(?:"([^"]+)"|(\S+))/g;
      let match;
      while ((match = regex.exec(query)) !== null) {
        const exclude = !!match[1];
        const field = match[2] ? match[2].toLowerCase() : null;
        const term = (match[3] || match[4] || '').trim();
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
      const key = (field || '').toLowerCase();
      if (!key) return [];
      if (['surah', 's'].includes(key)) return ['surah'];
      if (['ayah', 'a', 'num', 'number'].includes(key)) return ['ayah'];
      if (['ar', 'arabic'].includes(key)) return ['arabic'];
      if (['en', 'english'].includes(key)) return ['english'];
      if (['text', 'verse'].includes(key)) return ['arabic', 'english'];
      return [];
    },
    getFieldValue(item, fieldKey) {
      var _item$ayah5;
      switch (fieldKey) {
        case 'surah':
          return item.surah_name || '';
        case 'ayah':
          return ((_item$ayah5 = item.ayah) === null || _item$ayah5 === void 0 ? void 0 : _item$ayah5.ayah_id) || item.ayah_number || '';
        case 'arabic':
          return item.ayah_verse_ar || '';
        case 'english':
          return item.ayah_verse_en || '';
        default:
          return '';
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
      const clean = this.stripHtmlTags(text || '');
      const safe = this.escapeHtml(clean);
      const terms = this.highlightMap[fieldKey] || [];
      if (!terms.length) return safe;
      return terms.reduce((acc, term) => {
        const regex = new RegExp(`(${this.escapeRegExp(term)})`, 'gi');
        return acc.replace(regex, '<mark class="search-hit">$1</mark>');
      }, safe);
    },
    formatMeta(item) {
      var _item$ayah6;
      const surah = this.highlightText(item.surah_name || '', 'surah');
      const ayah = this.highlightText(String(((_item$ayah6 = item.ayah) === null || _item$ayah6 === void 0 ? void 0 : _item$ayah6.ayah_id) || item.ayah_number || ''), 'ayah');
      return `${surah} • Ayah ${ayah}`;
    },
    refreshFolderSidebar() {
      var _this$$refs$folderLis, _this$$refs$folderLis2;
      return (_this$$refs$folderLis = this.$refs.folderList) === null || _this$$refs$folderLis === void 0 || (_this$$refs$folderLis2 = _this$$refs$folderLis.fetchFolders) === null || _this$$refs$folderLis2 === void 0 ? void 0 : _this$$refs$folderLis2.call(_this$$refs$folderLis);
    },
    toggleFolderPane() {
      this.isFolderCollapsed = !this.isFolderCollapsed;
    },
    async fetchFolders() {
      try {
        var _response$data;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/folders');
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
        const response = folder.isAll ? await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/ayah-bookmarks') : await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/ayah-bookmarks', {
          params: {
            folder_id: folder.id
          }
        });
        const payload = (_ref = (_ref2 = (_response$data$data = (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.data) !== null && _response$data$data !== void 0 ? _response$data$data : (_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.bookmarks) !== null && _ref2 !== void 0 ? _ref2 : response.data) !== null && _ref !== void 0 ? _ref : [];
        this.items = Array.isArray(payload) ? payload : [];
        this.source = folder.isAll ? 'all' : ((_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : _response$data4.source) || 'manual';
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
    },
    async moveBookmark(item, event) {
      var _event$target;
      const targetId = Number(event === null || event === void 0 || (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value);
      if (!targetId || !(item !== null && item !== void 0 && item.bookmark_id) || !this.canMoveFromSelectedFolder) {
        if (event !== null && event !== void 0 && event.target) event.target.value = '';
        return;
      }
      this.movingBookmarkId = item.bookmark_id;
      try {
        var _this$folders$find;
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`/api/ayah-bookmarks/${item.bookmark_id}/folders`, {
          folder_ids: [targetId]
        });
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/ayah-bookmarks/${item.bookmark_id}/folders/${this.selectedFolder.id}`);
        const targetName = ((_this$folders$find = this.folders.find(folder => folder.id === targetId)) === null || _this$folders$find === void 0 ? void 0 : _this$folders$find.name) || 'folder';
        this.adjustFolderCount(this.selectedFolder.id, -1);
        this.adjustFolderCount(targetId, 1);
        if (this.source === 'manual') {
          this.items = this.items.filter(row => row.id !== item.bookmark_id);
        }
        this.setPanelMessage(`Moved to ${targetName}.`, 'success');
      } catch (error) {
        this.setPanelMessage('Unable to move this ayah.', 'danger');
      } finally {
        this.movingBookmarkId = null;
        if (event !== null && event !== void 0 && event.target) {
          event.target.value = '';
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
        this.panelMessage = '';
      }, 3000);
    },
    isDeleteBusy(id) {
      return !!this.deleteBusy[id];
    },
    openRemoveConfirm(item) {
      if (!(item !== null && item !== void 0 && item.bookmark_id) || !this.selectedFolder) return;
      if (this.isSmartSelected) {
        this.setPanelMessage('Smart folders cannot be edited.', 'danger');
        return;
      }
      this.removeCandidate = item;
      this.removeMode = this.selectedFolder.isAll ? 'all' : 'folder';
      this.removeConfirmOpen = true;
      document.body.classList.add('modal-open');
    },
    closeRemoveConfirm() {
      this.removeConfirmOpen = false;
      this.removeCandidate = null;
      this.removeBusy = false;
      document.body.classList.remove('modal-open');
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
        if (this.removeMode === 'all') {
          await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/ayah-bookmarks/${bookmarkId}`);
          this.items = this.items.filter(row => row.id !== bookmarkId);
          this.setPanelMessage('Bookmark deleted.', 'success');
          await this.refreshFolderSidebar();
        } else {
          await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/ayah-bookmarks/${bookmarkId}/folders/${this.selectedFolder.id}`);
          this.items = this.items.filter(row => row.id !== bookmarkId);
          this.adjustFolderCount(this.selectedFolder.id, -1);
          this.setPanelMessage('Ayah removed from folder.', 'success');
        }
      } catch (error) {
        this.setPanelMessage('Unable to remove this ayah.', 'danger');
      } finally {
        this.deleteBusy = _objectSpread(_objectSpread({}, this.deleteBusy), {}, {
          [bookmarkId]: false
        });
        this.closeRemoveConfirm();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'BookmarkModal',
  props: {
    ayah: {
      type: Object,
      default: null
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
        name: '',
        icon: 'fas fa-bookmark',
        color: 'primary'
      },
      isSaving: false,
      isCreatingFolder: false,
      feedback: '',
      feedbackVariant: 'success',
      feedbackTimer: null,
      feedbackDurationMs: 4000,
      closeTimer: null,
      authRedirectTimer: null,
      bootstrapColors: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      folderExpanded: {},
      folderContents: {},
      sectionOpen: {
        folders: true,
        create: true,
        contents: false
      },
      selectedFoldersForDelete: [],
      folderSearch: '',
      pendingDelete: null,
      iconPresets: [{
        icon: 'fas fa-bookmark'
      }, {
        icon: 'fas fa-star'
      }, {
        icon: 'fas fa-heart'
      }, {
        icon: 'fas fa-book'
      }, {
        icon: 'fas fa-book-open'
      }, {
        icon: 'fas fa-leaf'
      }, {
        icon: 'fas fa-mosque'
      }, {
        icon: 'fas fa-kaaba'
      }]
    };
  },
  computed: {
    feedbackClass() {
      return this.feedbackVariant === 'danger' ? 'alert-danger' : 'alert-success';
    },
    selectedCount() {
      return this.selectedFolderIds.length;
    },
    folderCount() {
      return this.folders.length;
    },
    filteredFolders() {
      const query = this.folderSearch.trim().toLowerCase();
      if (!query) return this.folders;
      return this.folders.filter(folder => folder.name.toLowerCase().includes(query));
    },
    pendingDeleteTitle() {
      if (!this.pendingDelete) return '';
      if (this.pendingDelete.type === 'bulk') {
        return `Delete ${this.pendingDelete.count} folder(s)?`;
      }
      return `Delete the "${this.pendingDelete.name}" folder?`;
    },
    feedbackIcon() {
      return this.feedbackVariant === 'danger' ? 'fas fa-triangle-exclamation' : 'fas fa-circle-check';
    }
  },
  mounted() {
    const modalEl = document.getElementById('bookmarkModal');
    if (modalEl) {
      this.cleanupModalState();
      modalEl.addEventListener('show.bs.modal', this.onShow);
      modalEl.addEventListener('hidden.bs.modal', this.onHidden);
    }
  },
  beforeUnmount() {
    const modalEl = document.getElementById('bookmarkModal');
    if (modalEl) {
      modalEl.removeEventListener('show.bs.modal', this.onShow);
      modalEl.removeEventListener('hidden.bs.modal', this.onHidden);
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
      this.cleanupModalState();
      this.feedback = '';
      this.selectedFolderIds = [];
      this.currentBookmark = null;
      const isAuthed = await this.ensureAuthenticated();
      if (!isAuthed) return;
      Promise.all([this.fetchFolders(), this.fetchCurrentBookmark()]);
    },
    onHidden() {
      this.cleanupModalState();
      clearTimeout(this.feedbackTimer);
      clearTimeout(this.closeTimer);
      clearTimeout(this.authRedirectTimer);
    },
    async ensureAuthenticated() {
      try {
        var _response$data;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/userId');
        if ((_response$data = response.data) !== null && _response$data !== void 0 && _response$data.userId) {
          return true;
        }
      } catch (_) {
        // fall through to redirect
      }
      this.setFeedback('Please log in to save bookmarks. Redirecting…', 'danger');
      clearTimeout(this.authRedirectTimer);
      this.authRedirectTimer = setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
      return false;
    },
    cleanupModalState() {
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(backdrop => {
        var _backdrop$parentNode, _backdrop$parentNode$;
        return (_backdrop$parentNode = backdrop.parentNode) === null || _backdrop$parentNode === void 0 || (_backdrop$parentNode$ = _backdrop$parentNode.removeChild) === null || _backdrop$parentNode$ === void 0 ? void 0 : _backdrop$parentNode$.call(_backdrop$parentNode, backdrop);
      });
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
    },
    async fetchFolders() {
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/folders');
        this.folders = response.data.data || [];
        this.normalizeSelectedFolders();
      } catch (error) {
        this.setFeedback('Unable to load folders right now.', 'danger');
      }
    },
    async fetchCurrentBookmark() {
      var _this$ayah, _this$ayah2, _this$ayah3, _this$ayah4;
      const surahNumber = Number(((_this$ayah = this.ayah) === null || _this$ayah === void 0 ? void 0 : _this$ayah.surah_number) || ((_this$ayah2 = this.ayah) === null || _this$ayah2 === void 0 ? void 0 : _this$ayah2.surah_id));
      const ayahNumber = Number(((_this$ayah3 = this.ayah) === null || _this$ayah3 === void 0 ? void 0 : _this$ayah3.ayah_number) || ((_this$ayah4 = this.ayah) === null || _this$ayah4 === void 0 ? void 0 : _this$ayah4.ayah_num));
      if (!this.ayah || !surahNumber || !ayahNumber) {
        return;
      }
      try {
        var _response$data2;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/ayah-bookmarks', {
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
      } catch (error) {
        this.currentBookmark = null;
      }
    },
    normalizeSelectedFolders() {
      if (!this.folders.length) {
        return;
      }
      const allowedIds = new Set(this.folders.filter(folder => !folder.is_smart).map(folder => folder.id));
      this.selectedFolderIds = this.selectedFolderIds.filter(id => allowedIds.has(id));
    },
    isSmartFolder(folderId) {
      const folder = this.folders.find(item => item.id === folderId);
      return !!(folder !== null && folder !== void 0 && folder.is_smart);
    },
    async createFolder() {
      const isAuthed = await this.ensureAuthenticated();
      if (!isAuthed) return;
      if (!this.newFolder.name) {
        this.setFeedback('Folder name is required.', 'danger');
        return;
      }
      const name = this.newFolder.name.trim();
      const nameKey = name.toLowerCase();
      if (this.folders.some(folder => (folder.name || '').trim().toLowerCase() === nameKey)) {
        this.setFeedback('Folder name already exists. Choose another.', 'danger');
        return;
      }
      this.isCreatingFolder = true;
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
          this.selectedFolderIds.push(folder.id);
          this.folderExpanded[folder.id] = true;
          this.folderContents[folder.id] = {
            loading: false,
            items: []
          };
          this.newFolder.name = '';
          this.newFolder.icon = 'fas fa-bookmark';
          this.newFolder.color = 'primary';
          this.setFeedback('Folder created.', 'success');
        }
      } catch (error) {
        var _error$response, _error$response2;
        const apiMessage = ((_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || ((_error$response2 = error.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.errors) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.name) === null || _error$response2 === void 0 ? void 0 : _error$response2[0]);
        this.setFeedback(apiMessage || 'Failed to create folder.', 'danger');
      } finally {
        this.isCreatingFolder = false;
      }
    },
    async saveBookmark() {
      var _this$ayah5, _this$ayah6, _this$ayah7, _this$ayah8;
      const isAuthed = await this.ensureAuthenticated();
      if (!isAuthed) return;
      const surahNumber = Number(((_this$ayah5 = this.ayah) === null || _this$ayah5 === void 0 ? void 0 : _this$ayah5.surah_number) || ((_this$ayah6 = this.ayah) === null || _this$ayah6 === void 0 ? void 0 : _this$ayah6.surah_id));
      const ayahNumber = Number(((_this$ayah7 = this.ayah) === null || _this$ayah7 === void 0 ? void 0 : _this$ayah7.ayah_number) || ((_this$ayah8 = this.ayah) === null || _this$ayah8 === void 0 ? void 0 : _this$ayah8.ayah_num));
      if (!this.ayah || !surahNumber || !ayahNumber) {
        this.setFeedback('Select an ayah first.', 'danger');
        return;
      }
      this.isSaving = true;
      try {
        var _this$currentBookmark, _this$ayah$surah, _this$ayah$ayah, _response$data3, _this$currentBookmark2;
        this.normalizeSelectedFolders();
        const selectedIds = Array.from(new Set(this.selectedFolderIds));
        const existingIds = ((_this$currentBookmark = this.currentBookmark) === null || _this$currentBookmark === void 0 || (_this$currentBookmark = _this$currentBookmark.folders) === null || _this$currentBookmark === void 0 ? void 0 : _this$currentBookmark.map(folder => folder.id)) || [];
        const removeIds = existingIds.filter(id => !selectedIds.includes(id));
        const removableIds = removeIds.filter(id => !this.isSmartFolder(id));
        const addIds = selectedIds.filter(id => !existingIds.includes(id));
        const payload = {
          surah_number: surahNumber,
          ayah_number: ayahNumber,
          surah_name: this.ayah.surah_name || ((_this$ayah$surah = this.ayah.surah) === null || _this$ayah$surah === void 0 ? void 0 : _this$ayah$surah.name_en) || 'Surah',
          ayah_verse_ar: this.ayah.ayah_verse_ar || ((_this$ayah$ayah = this.ayah.ayah) === null || _this$ayah$ayah === void 0 ? void 0 : _this$ayah$ayah.ayah_text) || '',
          ayah_verse_en: this.ayah.ayah_verse_en || '',
          folder_ids: selectedIds
        };
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post('/api/ayah-bookmarks', payload);
        const bookmark = ((_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.bookmark) || null;
        if (bookmark) {
          this.currentBookmark = bookmark;
        }
        let detachFailed = false;
        if (removableIds.length && (_this$currentBookmark2 = this.currentBookmark) !== null && _this$currentBookmark2 !== void 0 && _this$currentBookmark2.id) {
          try {
            await Promise.all(removableIds.map(id => axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/ayah-bookmarks/${this.currentBookmark.id}/folders/${id}`)));
            // Decrement count for removed folders
            removableIds.forEach(id => {
              const folder = this.folders.find(f => f.id === id);
              if (folder && folder.ayah_count > 0) {
                folder.ayah_count -= 1;
              }
            });
          } catch (error) {
            detachFailed = true;
          }
        }

        // Increment count for newly added folders
        addIds.forEach(id => {
          const folder = this.folders.find(f => f.id === id);
          if (folder) {
            folder.ayah_count = (folder.ayah_count || 0) + 1;
          }
        });
        await this.fetchCurrentBookmark();
        this.setFeedback(detachFailed ? 'Bookmark saved, but some folders could not be removed.' : 'Ayah saved to your bookmarks.', detachFailed ? 'danger' : 'success', {
          autoClose: !detachFailed
        });
        this.$emit('saved', _objectSpread(_objectSpread({}, payload), {}, {
          bookmark: this.currentBookmark
        }));
      } catch (error) {
        this.setFeedback('Failed to save the bookmark.', 'danger');
      } finally {
        this.isSaving = false;
      }
    },
    setFeedback(message, variant, options = {}) {
      this.feedback = message;
      this.feedbackVariant = variant;
      clearTimeout(this.feedbackTimer);
      this.feedbackTimer = setTimeout(() => {
        this.feedback = '';
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
    toggleSection(section) {
      this.sectionOpen = _objectSpread(_objectSpread({}, this.sectionOpen), {}, {
        [section]: !this.sectionOpen[section]
      });
    },
    requestDeleteFolder(folder) {
      if (!folder || folder.is_smart) {
        this.setFeedback('Smart folders cannot be deleted.', 'danger');
        return;
      }
      this.pendingDelete = {
        type: 'single',
        ids: [folder.id],
        name: folder.name
      };
    },
    requestDeleteSelectedFolders() {
      const ids = this.selectedFoldersForDelete.filter(id => {
        const folder = this.folders.find(item => item.id === id);
        return folder && !folder.is_smart;
      });
      if (!ids.length) {
        this.setFeedback('Select folders to delete.', 'danger');
        return;
      }
      this.pendingDelete = {
        type: 'bulk',
        ids,
        count: ids.length
      };
    },
    async confirmDelete() {
      var _this$pendingDelete;
      const ids = ((_this$pendingDelete = this.pendingDelete) === null || _this$pendingDelete === void 0 ? void 0 : _this$pendingDelete.ids) || [];
      if (!ids.length) {
        this.pendingDelete = null;
        return;
      }
      try {
        await Promise.all(ids.map(id => axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/folders/${id}`)));
        this.folders = this.folders.filter(folder => !ids.includes(folder.id));
        this.selectedFolderIds = this.selectedFolderIds.filter(id => !ids.includes(id));
        this.selectedFoldersForDelete = [];
        ids.forEach(id => {
          const _this$folderExpanded = this.folderExpanded,
            {
              [id]: removedExpanded
            } = _this$folderExpanded,
            expanded = _objectWithoutProperties(_this$folderExpanded, [id].map(_toPropertyKey));
          this.folderExpanded = expanded;
          const _this$folderContents = this.folderContents,
            {
              [id]: removedContents
            } = _this$folderContents,
            contents = _objectWithoutProperties(_this$folderContents, [id].map(_toPropertyKey));
          this.folderContents = contents;
        });
        this.pendingDelete = null;
        await this.fetchCurrentBookmark();
        this.setFeedback(ids.length === 1 ? 'Folder deleted.' : 'Folders deleted.', 'success');
      } catch (error) {
        this.setFeedback('Unable to delete selected folders.', 'danger');
      }
    },
    cancelDelete() {
      this.pendingDelete = null;
    },
    hideModal() {
      this.$nextTick(() => {
        const modalEl = document.getElementById('bookmarkModal');
        if (!modalEl) return;
        const instance = bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal.getInstance(modalEl) || new bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal(modalEl);
        instance.hide();
      });
    },
    async toggleFolderContents(folder) {
      var _this$folderContents$;
      const isOpen = this.folderExpanded[folder.id];
      this.folderExpanded = _objectSpread(_objectSpread({}, this.folderExpanded), {}, {
        [folder.id]: !isOpen
      });
      if (isOpen) {
        return;
      }
      if ((_this$folderContents$ = this.folderContents[folder.id]) !== null && _this$folderContents$ !== void 0 && _this$folderContents$.items) {
        return;
      }
      this.folderContents = _objectSpread(_objectSpread({}, this.folderContents), {}, {
        [folder.id]: {
          loading: true,
          items: []
        }
      });
      try {
        var _response$data4;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/ayah-bookmarks', {
          params: {
            folder_id: folder.id
          }
        });
        const items = Array.isArray((_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : _response$data4.data) ? response.data.data : [];
        this.folderContents = _objectSpread(_objectSpread({}, this.folderContents), {}, {
          [folder.id]: {
            loading: false,
            items
          }
        });
      } catch (error) {
        this.folderContents = _objectSpread(_objectSpread({}, this.folderContents), {}, {
          [folder.id]: {
            loading: false,
            items: []
          }
        });
      }
    },
    async removeAyahFromFolder(bookmark, folder) {
      if (!(bookmark !== null && bookmark !== void 0 && bookmark.id)) return;
      if (folder !== null && folder !== void 0 && folder.is_smart) {
        this.setFeedback('Smart folders cannot be edited.', 'danger');
        return;
      }
      try {
        var _this$folderContents$2, _this$currentBookmark3;
        if (!confirm('Remove this ayah from the folder?')) {
          return;
        }
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
        if (((_this$currentBookmark3 = this.currentBookmark) === null || _this$currentBookmark3 === void 0 ? void 0 : _this$currentBookmark3.id) === bookmark.id) {
          this.selectedFolderIds = this.selectedFolderIds.filter(id => id !== folder.id);
        }
      } catch (error) {
        this.setFeedback('Unable to remove this ayah.', 'danger');
      }
    },
    moveTargetFolders(folder) {
      return this.folders.filter(target => !target.is_smart && target.id !== folder.id);
    },
    setIcon(icon) {
      this.newFolder.icon = icon;
    },
    setColor(color) {
      this.newFolder.color = color;
    },
    async moveAyahToFolder(bookmark, fromFolder, event) {
      var _event$target;
      const targetId = Number(event === null || event === void 0 || (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value);
      if (!(bookmark !== null && bookmark !== void 0 && bookmark.id) || !targetId) return;
      if (fromFolder !== null && fromFolder !== void 0 && fromFolder.is_smart) {
        this.setFeedback('Smart folders cannot be edited.', 'danger');
        return;
      }
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
          targetFolder.ayah_count = (targetFolder.ayah_count || 0) + 1;
          if (fromFolder.ayah_count > 0) fromFolder.ayah_count -= 1;
          if ((_this$folderContents$4 = this.folderContents[targetId]) !== null && _this$folderContents$4 !== void 0 && _this$folderContents$4.items) {
            this.folderContents = _objectSpread(_objectSpread({}, this.folderContents), {}, {
              [targetId]: {
                loading: false,
                items: [bookmark, ...this.folderContents[targetId].items]
              }
            });
          }
        }
        this.setFeedback('Ayah moved to another folder.', 'success');
        if (event !== null && event !== void 0 && event.target) {
          event.target.value = '';
        }
      } catch (error) {
        this.setFeedback('Unable to move this ayah.', 'danger');
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/FolderList.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/FolderList.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
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
      deleteBusy: false,
      status: '',
      statusVariant: 'success',
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
    }
  },
  mounted() {
    this.fetchFolders();
  },
  beforeUnmount() {},
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
      } catch (error) {
        this.setStatus('Failed to load folders.', 'danger');
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
      this.deleteCandidate = folder;
      this.deleteConfirmOpen = true;
      document.body.classList.add('modal-open');
    },
    closeDeleteConfirm() {
      this.deleteConfirmOpen = false;
      this.deleteCandidate = null;
      document.body.classList.remove('modal-open');
    },
    async confirmDeleteFolder() {
      if (!this.deleteCandidate) return;
      this.deleteBusy = true;
      try {
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/folders/${this.deleteCandidate.id}`);
        this.folders = this.folders.filter(item => item.id !== this.deleteCandidate.id);
        if (this.selectedId === this.deleteCandidate.id) {
          this.selectedId = null;
        }
        this.setStatus('Folder deleted.', 'success');
      } catch (error) {
        this.setStatus('Delete failed.', 'danger');
      } finally {
        this.deleteBusy = false;
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
      } catch (error) {
        this.setStatus('Unable to add ayah to folder.', 'danger');
      }
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

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/AyahRow.vue?vue&type=template&id=34bfc18e&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/AyahRow.vue?vue&type=template&id=34bfc18e&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=template&id=144e09ac&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=template&id=144e09ac&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  class: "row g-4 bookmark-layout"
};
const _hoisted_3 = ["aria-hidden"];
const _hoisted_4 = {
  class: "bookmark-panel"
};
const _hoisted_5 = {
  class: "panel-header"
};
const _hoisted_6 = {
  class: "panel-title"
};
const _hoisted_7 = {
  class: "panel-subtitle"
};
const _hoisted_8 = {
  class: "panel-actions"
};
const _hoisted_9 = ["aria-pressed", "aria-label", "title"];
const _hoisted_10 = {
  class: "panel-body"
};
const _hoisted_11 = {
  class: "panel-search"
};
const _hoisted_12 = {
  class: "input-group"
};
const _hoisted_13 = {
  key: 1,
  class: "loading-state"
};
const _hoisted_14 = {
  key: 2,
  class: "empty-state"
};
const _hoisted_15 = {
  key: 3,
  class: "list-wrapper"
};
const _hoisted_16 = {
  class: "list-group ayah-list"
};
const _hoisted_17 = {
  class: "ayah-list-head"
};
const _hoisted_18 = ["innerHTML"];
const _hoisted_19 = {
  class: "ayah-list-actions"
};
const _hoisted_20 = ["disabled", "onChange"];
const _hoisted_21 = {
  value: "",
  selected: "",
  disabled: ""
};
const _hoisted_22 = ["value"];
const _hoisted_23 = ["onClick"];
const _hoisted_24 = ["onClick"];
const _hoisted_25 = ["disabled", "title", "onClick"];
const _hoisted_26 = {
  key: 0,
  class: "spinner-border spinner-border-sm"
};
const _hoisted_27 = {
  key: 1,
  class: "bi bi-trash"
};
const _hoisted_28 = ["innerHTML"];
const _hoisted_29 = ["innerHTML"];
const _hoisted_30 = {
  key: 0,
  class: "modal-backdrop fade show"
};
const _hoisted_31 = {
  key: 1,
  class: "modal fade show remove-confirm-modal",
  tabindex: "-1",
  role: "dialog",
  "aria-modal": "true",
  style: {
    "display": "block"
  }
};
const _hoisted_32 = {
  class: "modal-dialog modal-dialog-centered"
};
const _hoisted_33 = {
  class: "modal-content"
};
const _hoisted_34 = {
  class: "modal-header"
};
const _hoisted_35 = {
  class: "modal-title"
};
const _hoisted_36 = {
  class: "modal-body"
};
const _hoisted_37 = {
  class: "mb-0"
};
const _hoisted_38 = {
  class: "modal-footer"
};
const _hoisted_39 = ["disabled"];
const _hoisted_40 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_folder_list = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("folder-list");
  const _component_bookmark_modal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("bookmark-modal");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["col-12 col-lg-4 folder-col", {
      'is-collapsed': $data.isFolderCollapsed
    }]),
    "aria-hidden": $data.isFolderCollapsed ? 'true' : 'false'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_folder_list, {
    ref: "folderList",
    onFolderSelected: $options.onFolderSelected
  }, null, 8 /* PROPS */, ["onFolderSelected"])], 10 /* CLASS, PROPS */, _hoisted_3), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["col-12 col-lg-8 panel-col", {
      'is-expanded': $data.isFolderCollapsed
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "panel-eyebrow"
  }, "Collection", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedFolder ? $data.selectedFolder.name : 'Folder contents'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.panelCountLabel) + " · " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.folderDescriptor), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "panel-toggle",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleFolderPane && $options.toggleFolderPane(...args)),
    "aria-pressed": !$data.isFolderCollapsed,
    "aria-label": $data.isFolderCollapsed ? 'Show folders' : 'Hide folders',
    title: $data.isFolderCollapsed ? 'Show folders' : 'Hide folders'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $data.isFolderCollapsed ? 'bi-layout-sidebar-inset' : 'bi-layout-sidebar-inset-reverse'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_9), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    class: "panel-cta",
    href: "/surat"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Go back to the Holy Quran "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-right ms-2"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <span v-if=\"selectedFolder\" class=\"source-pill\">{{ sourceLabel }}</span> ")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [$data.panelMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["panel-alert", $data.panelMessageVariant === 'danger' ? 'alert-danger' : 'alert-success'])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.panelMessage), 3 /* TEXT, CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.query = $event),
    class: "form-control",
    placeholder: "Search bookmarks..."
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.query]]), $data.query ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    class: "btn btn-outline-secondary",
    type: "button",
    onClick: _cache[2] || (_cache[2] = (...args) => $options.clearSearch && $options.clearSearch(...args))
  }, " Clear ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_13, "Loading ayat...")) : $options.filteredItems.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_14, [...(_cache[9] || (_cache[9] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "empty-title"
  }, "No ayat match your search", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "empty-subtitle"
  }, "Try different terms or clear the filters.", -1 /* CACHED */)]))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredItems, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.row_key,
      class: "list-group-item ayah-list-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "ayah-list-meta",
      innerHTML: $options.formatMeta(item)
    }, null, 8 /* PROPS */, _hoisted_18), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [$options.canMoveFromSelectedFolder ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("select", {
      key: 0,
      class: "form-select form-select-sm move-select",
      disabled: $data.movingBookmarkId === item.bookmark_id || $options.moveTargets.length === 0,
      onChange: $event => $options.moveBookmark(item, $event)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.moveTargets.length ? 'Move to...' : 'No other folders'), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.moveTargets, folder => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
        key: `move-${folder.id}`,
        value: folder.id
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 9 /* TEXT, PROPS */, _hoisted_22);
    }), 128 /* KEYED_FRAGMENT */))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_20)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button\n                      type=\"button\"\n                      class=\"btn btn-sm btn-outline-secondary bookmark-quick\"\n                      data-bs-toggle=\"modal\"\n                      data-bs-target=\"#bookmarkModal\"\n                      @click=\"prepareBookmark(item)\"\n                    >\n                      <i class=\"bi bi-bookmark-plus\"></i>\n                    </button> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button\n                      type=\"button\"\n                      class=\"btn btn-sm btn-outline-secondary open-quick\"\n                      @click=\"openInSurat(item)\"\n                      title=\"Open in Quran\"\n                      aria-label=\"Open ayah in Quran\"\n                    >\n                      <i class=\"bi bi-box-arrow-up-right\"></i>\n                    </button> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-sm btn-outline-secondary copy-quick",
      onClick: $event => $options.copyBookmark(item),
      title: "Copy",
      "aria-label": "Copy ayah"
    }, [...(_cache[10] || (_cache[10] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clipboard"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_23), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-sm btn-outline-secondary share-quick",
      onClick: $event => $options.shareBookmarkOnWhatsApp(item),
      title: "Share via WhatsApp",
      "aria-label": "Share ayah via WhatsApp"
    }, [...(_cache[11] || (_cache[11] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-whatsapp"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_24), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-sm btn-outline-danger remove-quick",
      disabled: $options.isDeleteBusy(item.bookmark_id) || $options.isSmartSelected,
      title: $options.deleteTooltip,
      onClick: $event => $options.openRemoveConfirm(item)
    }, [$options.isDeleteBusy(item.bookmark_id) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_26)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_27))], 8 /* PROPS */, _hoisted_25)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "ayah-list-ar",
      innerHTML: $options.highlightText(item.ayah_verse_ar, 'arabic')
    }, null, 8 /* PROPS */, _hoisted_28), item.ayah_verse_en ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 0,
      class: "ayah-list-en",
      innerHTML: $options.highlightText(item.ayah_verse_en, 'english')
    }, null, 8 /* PROPS */, _hoisted_29)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))])]))])])], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_bookmark_modal, {
    ayah: $data.activeAyah,
    onSaved: $options.onSaved
  }, null, 8 /* PROPS */, ["ayah", "onSaved"]), $data.removeConfirmOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_30)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.removeConfirmOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.removeConfirmTitle), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "aria-label": "Close",
    onClick: _cache[3] || (_cache[3] = (...args) => $options.closeRemoveConfirm && $options.closeRemoveConfirm(...args))
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.removeConfirmMessage), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary",
    onClick: _cache[4] || (_cache[4] = (...args) => $options.closeRemoveConfirm && $options.closeRemoveConfirm(...args))
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger",
    disabled: $data.removeBusy,
    onClick: _cache[5] || (_cache[5] = (...args) => $options.confirmRemoveBookmark && $options.confirmRemoveBookmark(...args))
  }, [$data.removeBusy ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_40)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delete ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_39)])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=template&id=9402092c&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=template&id=9402092c&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  class: "modal-dialog modal-dialog-centered modal-xl"
};
const _hoisted_3 = {
  class: "modal-content bookmark-modal"
};
const _hoisted_4 = {
  class: "modal-header"
};
const _hoisted_5 = {
  class: "header-title"
};
const _hoisted_6 = {
  class: "header-meta"
};
const _hoisted_7 = {
  class: "meta-item"
};
const _hoisted_8 = {
  class: "meta-value"
};
const _hoisted_9 = {
  class: "meta-item"
};
const _hoisted_10 = {
  class: "meta-value"
};
const _hoisted_11 = {
  class: "modal-body"
};
const _hoisted_12 = {
  class: "alert-icon"
};
const _hoisted_13 = {
  class: "alert-text"
};
const _hoisted_14 = {
  key: 1,
  class: "delete-confirm mb-3"
};
const _hoisted_15 = {
  class: "delete-title"
};
const _hoisted_16 = {
  class: "delete-actions"
};
const _hoisted_17 = {
  class: "row g-3"
};
const _hoisted_18 = {
  class: "col-12 col-md-6"
};
const _hoisted_19 = {
  class: "section-card h-100"
};
const _hoisted_20 = {
  class: "section-header"
};
const _hoisted_21 = {
  class: "section-actions"
};
const _hoisted_22 = {
  class: "section-hint"
};
const _hoisted_23 = ["aria-expanded"];
const _hoisted_24 = {
  key: 1,
  class: "empty-state"
};
const _hoisted_25 = {
  key: 2,
  class: "folder-grid"
};
const _hoisted_26 = ["value", "disabled"];
const _hoisted_27 = {
  class: "pill-icon"
};
const _hoisted_28 = {
  key: 1,
  class: "fas fa-folder"
};
const _hoisted_29 = {
  class: "pill-meta"
};
const _hoisted_30 = {
  class: "pill-title"
};
const _hoisted_31 = {
  class: "pill-count"
};
const _hoisted_32 = ["onClick"];
const _hoisted_33 = {
  class: "col-12 col-md-6"
};
const _hoisted_34 = {
  class: "section-card h-100"
};
const _hoisted_35 = {
  class: "section-header"
};
const _hoisted_36 = {
  class: "section-actions"
};
const _hoisted_37 = ["aria-expanded"];
const _hoisted_38 = {
  class: "row g-2 align-items-end"
};
const _hoisted_39 = {
  class: "col-12"
};
const _hoisted_40 = {
  class: "col-12"
};
const _hoisted_41 = {
  class: "icon-presets"
};
const _hoisted_42 = ["onClick"];
const _hoisted_43 = {
  class: "col-12"
};
const _hoisted_44 = {
  class: "color-swatches"
};
const _hoisted_45 = ["onClick"];
const _hoisted_46 = {
  class: "col-12"
};
const _hoisted_47 = ["disabled"];
const _hoisted_48 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2"
};
const _hoisted_49 = {
  key: 2,
  class: "section-card mt-3"
};
const _hoisted_50 = {
  class: "section-header"
};
const _hoisted_51 = {
  class: "section-actions"
};
const _hoisted_52 = ["aria-expanded"];
const _hoisted_53 = {
  key: 0,
  class: "empty-state"
};
const _hoisted_54 = {
  key: 1,
  class: "folder-contents"
};
const _hoisted_55 = {
  class: "folder-toggle"
};
const _hoisted_56 = ["onClick"];
const _hoisted_57 = {
  class: "folder-toggle-title"
};
const _hoisted_58 = {
  key: 0,
  class: "folder-badge"
};
const _hoisted_59 = {
  class: "folder-toggle-actions"
};
const _hoisted_60 = {
  class: "folder-toggle-meta"
};
const _hoisted_61 = ["disabled", "onClick"];
const _hoisted_62 = ["onClick"];
const _hoisted_63 = {
  key: 0,
  class: "folder-items"
};
const _hoisted_64 = {
  key: 0,
  class: "text-muted"
};
const _hoisted_65 = {
  key: 1,
  class: "text-muted"
};
const _hoisted_66 = {
  class: "folder-item-header"
};
const _hoisted_67 = {
  class: "folder-item-actions"
};
const _hoisted_68 = {
  class: "input-group input-group-sm move-group"
};
const _hoisted_69 = ["onChange", "disabled"];
const _hoisted_70 = ["value"];
const _hoisted_71 = ["disabled", "onClick"];
const _hoisted_72 = ["innerHTML"];
const _hoisted_73 = {
  key: 0,
  class: "folder-item-en"
};
const _hoisted_74 = {
  class: "modal-footer"
};
const _hoisted_75 = ["disabled"];
const _hoisted_76 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "header-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-bookmark"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title",
    id: "bookmarkModalLabel"
  }, "Save Ayah", -1 /* CACHED */)), _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "modal-subtitle"
  }, "Pick a folder or create a new one.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_7, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "meta-label"
  }, "Folders", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.folderCount), 1 /* TEXT */)]), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "meta-divider"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_9, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "meta-label"
  }, "Selected", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.selectedCount), 1 /* TEXT */)])])])]), _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [$data.feedback ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["alert bookmark-alert", $options.feedbackClass]),
    role: "alert"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($options.feedbackIcon)
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.feedback), 1 /* TEXT */)], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.pendingDelete ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.pendingDeleteTitle), 1 /* TEXT */), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "delete-note"
  }, "Ayat in this folder will also be deleted.", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary btn-sm",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.cancelDelete && $options.cancelDelete(...args))
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger btn-sm",
    onClick: _cache[1] || (_cache[1] = (...args) => $options.confirmDelete && $options.confirmDelete(...args))
  }, "Delete")])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-folder-open"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Choose folders"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-desc"
  }, "Select where this ayah will be saved.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.selectedCount) + " selected", 1 /* TEXT */), $options.selectedCount ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn btn-link btn-clear",
    onClick: _cache[2] || (_cache[2] = (...args) => $options.clearSelection && $options.clearSelection(...args))
  }, " Clear ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn section-toggle",
    onClick: _cache[3] || (_cache[3] = $event => $options.toggleSection('folders')),
    "aria-expanded": $data.sectionOpen.folders
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.sectionOpen.folders ? 'fa-chevron-up' : 'fa-chevron-down'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_23)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [$data.folders.length ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("input", {
    key: 0,
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.folderSearch = $event),
    type: "search",
    class: "form-control form-control-sm folder-search",
    placeholder: "Search folders"
  }, null, 512 /* NEED_PATCH */)), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.folderSearch, void 0, {
    trim: true
  }]]) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $options.filteredFolders.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_24, "No folders yet. Create one below.")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_25, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredFolders, folder => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("label", {
      key: folder.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['folder-pill', folder.color ? `pill-${folder.color}` : 'pill-neutral', {
        'is-selected': $data.selectedFolderIds.includes(folder.id),
        'is-disabled': folder.is_smart
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "checkbox",
      value: folder.id,
      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.selectedFolderIds = $event),
      disabled: folder.is_smart
    }, null, 8 /* PROPS */, _hoisted_26), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $data.selectedFolderIds]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_27, [folder.icon ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", {
      key: 0,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(folder.icon)
    }, null, 2 /* CLASS */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_28))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.ayah_count) + " ayat", 1 /* TEXT */)]), _cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "pill-check"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check"
    })], -1 /* CACHED */)), !folder.is_smart ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: 0,
      type: "button",
      class: "pill-delete",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.requestDeleteFolder(folder), ["stop", "prevent"]),
      title: "Delete folder"
    }, [...(_cache[21] || (_cache[21] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-times"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_32)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.sectionOpen.folders]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-plus-circle"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Create new folder"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-desc"
  }, "Start a fresh collection for your reflections.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-hint"
  }, "Add a custom collection", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn section-toggle",
    onClick: _cache[6] || (_cache[6] = $event => $options.toggleSection('create')),
    "aria-expanded": $data.sectionOpen.create
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.sectionOpen.create ? 'fa-chevron-up' : 'fa-chevron-down'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_37)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $data.newFolder.name = $event),
    type: "text",
    class: "form-control",
    placeholder: "Reflection gems"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.newFolder.name, void 0, {
    trim: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Icon", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.iconPresets, preset => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: preset.icon,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["icon-preset-btn", {
        active: $data.newFolder.icon === preset.icon
      }]),
      onClick: $event => $options.setIcon(preset.icon)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(preset.icon)
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_42);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Color", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.bootstrapColors, color => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: `swatch-${color}`,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["color-swatch-btn", {
        active: $data.newFolder.color === color
      }]),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        background: `var(--bs-${color})`
      }),
      onClick: $event => $options.setColor(color)
    }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_45);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-create",
    disabled: $data.isCreatingFolder,
    onClick: _cache[8] || (_cache[8] = (...args) => $options.createFolder && $options.createFolder(...args))
  }, [$data.isCreatingFolder ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_48)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Create folder ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_47)])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.sectionOpen.create]])])])]), $props.showFolderContents ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-list-check"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Folder contents"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-desc"
  }, "Preview what is inside each folder.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-hint"
  }, "Review or remove saved ayat", -1 /* CACHED */)), $data.selectedFoldersForDelete.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn btn-outline-danger btn-sm",
    onClick: _cache[9] || (_cache[9] = (...args) => $options.requestDeleteSelectedFolders && $options.requestDeleteSelectedFolders(...args))
  }, " Delete selected (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedFoldersForDelete.length) + ") ", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn section-toggle",
    onClick: _cache[10] || (_cache[10] = $event => $options.toggleSection('contents')),
    "aria-expanded": $data.sectionOpen.contents
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.sectionOpen.contents ? 'fa-chevron-up' : 'fa-chevron-down'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_52)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [$data.folders.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_53, "No folders to show yet.")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_54, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.folders, folder => {
    var _$data$folderContents, _$data$folderContents2;
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: `contents-${folder.id}`,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['folder-content', {
        open: $data.folderExpanded[folder.id]
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "folder-toggle-main",
      type: "button",
      onClick: $event => $options.toggleFolderContents(folder)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_57, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "folder-toggle-icon"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-folder"
    })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 1 /* TEXT */)]), folder.is_smart ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_58, "Smart")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 8 /* PROPS */, _hoisted_56), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_60, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.ayah_count) + " ayat", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-sm btn-outline-danger",
      disabled: folder.is_smart,
      onClick: $event => $options.requestDeleteFolder(folder)
    }, [...(_cache[32] || (_cache[32] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-trash me-1"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delete ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_61), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn folder-toggle-button",
      type: "button",
      onClick: $event => $options.toggleFolderContents(folder)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.folderExpanded[folder.id] ? 'fa-chevron-up' : 'fa-chevron-down'])
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_62)])]), $data.folderExpanded[folder.id] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_63, [(_$data$folderContents = $data.folderContents[folder.id]) !== null && _$data$folderContents !== void 0 && _$data$folderContents.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_64, "Loading...")) : !((_$data$folderContents2 = $data.folderContents[folder.id]) !== null && _$data$folderContents2 !== void 0 && (_$data$folderContents2 = _$data$folderContents2.items) !== null && _$data$folderContents2 !== void 0 && _$data$folderContents2.length) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_65, " No ayat saved in this folder. ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 2
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.folderContents[folder.id].items, item => {
      var _item$ayah, _item$ayah2;
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        class: "folder-item",
        key: item.id
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.surah_name || 'Surah') + " • Ayah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(((_item$ayah = item.ayah) === null || _item$ayah === void 0 ? void 0 : _item$ayah.ayah_id) || item.ayah_number || item.ayah_num), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
        class: "form-select",
        onChange: $event => $options.moveAyahToFolder(item, folder, $event),
        disabled: folder.is_smart
      }, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: "",
        disabled: ""
      }, "Move to...", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.moveTargetFolders(folder), target => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
          key: target.id,
          value: target.id
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(target.name), 9 /* TEXT, PROPS */, _hoisted_70);
      }), 128 /* KEYED_FRAGMENT */))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_69)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-sm btn-outline-danger",
        disabled: folder.is_smart,
        onClick: $event => $options.removeAyahFromFolder(item, folder)
      }, " Remove ", 8 /* PROPS */, _hoisted_71)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "folder-item-ar",
        innerHTML: item.ayah_verse_ar || ((_item$ayah2 = item.ayah) === null || _item$ayah2 === void 0 ? void 0 : _item$ayah2.ayah_text)
      }, null, 8 /* PROPS */, _hoisted_72), item.ayah_verse_en ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_73, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.ayah_verse_en), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.sectionOpen.contents]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_74, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/bookmarks",
    class: "btn btn-manage"
  }, "Open bookmarks", -1 /* CACHED */)), _cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-cancel",
    "data-bs-dismiss": "modal"
  }, "Cancel", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-save",
    disabled: $data.isSaving,
    onClick: _cache[11] || (_cache[11] = (...args) => $options.saveBookmark && $options.saveBookmark(...args))
  }, [$data.isSaving ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_76)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Save bookmark ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_75)])])])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/FolderList.vue?vue&type=template&id=275d2369&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/FolderList.vue?vue&type=template&id=275d2369&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  class: "folder-search mb-3"
};
const _hoisted_18 = {
  class: "input-group"
};
const _hoisted_19 = {
  class: "modal-section"
};
const _hoisted_20 = {
  key: 0,
  class: "rename-modal fade show"
};
const _hoisted_21 = {
  class: "modal-body"
};
const _hoisted_22 = {
  class: "modal-footer"
};
const _hoisted_23 = {
  key: 1,
  class: "delete-confirm-modal fade show"
};
const _hoisted_24 = {
  class: "modal-footer"
};
const _hoisted_25 = ["disabled"];
const _hoisted_26 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2"
};
const _hoisted_27 = {
  class: "folder-stack-wrap"
};
const _hoisted_28 = {
  class: "list-group folder-stack"
};
const _hoisted_29 = ["onClick", "onDrop"];
const _hoisted_30 = {
  class: "folder-main"
};
const _hoisted_31 = {
  class: "folder-icon"
};
const _hoisted_32 = ["innerHTML"];
const _hoisted_33 = {
  class: "folder-count-pill"
};
const _hoisted_34 = ["onClick"];
const _hoisted_35 = ["onClick"];
const _hoisted_36 = {
  class: "modal-dialog modal-dialog-centered"
};
const _hoisted_37 = {
  class: "rename-modal card p-3"
};
const _hoisted_38 = {
  class: "card-body"
};
const _hoisted_39 = {
  class: "d-flex justify-content-end gap-2"
};
const _hoisted_40 = {
  class: "modal-dialog modal-dialog-centered"
};
const _hoisted_41 = {
  class: "delete-confirm-modal card p-3"
};
const _hoisted_42 = {
  class: "card-body"
};
const _hoisted_43 = {
  class: "d-flex justify-content-end gap-2 mt-3"
};
const _hoisted_44 = ["disabled"];
const _hoisted_45 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "folder-icon-box"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-folder2-open"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "folder-title"
  }, "Folder Studio", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.folders.length) + " folders", 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "create-trigger",
    type: "button",
    onClick: _cache[0] || (_cache[0] = $event => $options.startCreate('folder'))
  }, [...(_cache[22] || (_cache[22] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-lg"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Create folder", -1 /* CACHED */)]))])])]), $data.showCreate ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Create new folder", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-sm btn-link",
    type: "button",
    onClick: _cache[1] || (_cache[1] = (...args) => $options.toggleCreate && $options.toggleCreate(...args))
  }, " Close ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label small text-muted"
  }, "Folder Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.newFolder.name = $event),
    class: "form-control",
    placeholder: "Inspiration"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.newFolder.name, void 0, {
    trim: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
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
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
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
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.status), 3 /* TEXT, CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
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
  }]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [$data.editingFolder ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_20, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "modal-title"
  }, "Rename folder")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.renameValue = $event),
    class: "form-control",
    placeholder: "New folder name"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.renameValue, void 0, {
    trim: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-secondary",
    onClick: _cache[6] || (_cache[6] = (...args) => $options.cancelRename && $options.cancelRename(...args))
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-primary",
    onClick: _cache[7] || (_cache[7] = (...args) => $options.saveRename && $options.saveRename(...args))
  }, "Save")])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.deleteConfirmOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "modal-title"
  }, "Delete folder?")], -1 /* CACHED */)), _cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Delete this folder and all saved ayat inside it?")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-secondary",
    onClick: _cache[8] || (_cache[8] = (...args) => $options.closeDeleteConfirm && $options.closeDeleteConfirm(...args))
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger",
    disabled: $data.deleteBusy,
    onClick: _cache[9] || (_cache[9] = (...args) => $options.confirmDeleteFolder && $options.confirmDeleteFolder(...args))
  }, [$data.deleteBusy ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_26)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delete ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_25)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["list-group-item folder-item d-flex align-items-center justify-content-between", {
      active: $data.selectedId === 'all'
    }]),
    onClick: _cache[10] || (_cache[10] = (...args) => $options.selectAll && $options.selectAll(...args))
  }, [...(_cache[32] || (_cache[32] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "folder-main"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "folder-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-collection"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "folder-name"
  }, "All bookmarks")], -1 /* CACHED */)]))], 2 /* CLASS */), $data.showCustomFolders ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 0
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <li>\n          <button type=\"button\" class=\"folder-section-toggle pt-3\" @click=\"showCustomFolders = !showCustomFolders\">\n            <span class=\"section-title\">Custom folders</span>\n            <span class=\"section-count\">{{ filteredFolders.length }}</span>\n            <i class=\"bi\" :class=\"showCustomFolders ? 'bi-chevron-up' : 'bi-chevron-down'\"></i>\n          </button>\n        </li> "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredFolders, folder => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: folder.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["list-group-item folder-item d-flex align-items-center justify-content-between", {
        active: $data.selectedId === folder.id
      }]),
      onClick: $event => $options.selectFolder(folder),
      onDragover: _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["prevent"])),
      onDrop: $event => $options.handleDrop($event, folder)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(folder.icon || 'bi bi-folder2')
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "folder-name",
      innerHTML: $options.highlightFolderName(folder.name)
    }, null, 8 /* PROPS */, _hoisted_32)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "folder-actions",
      onClick: _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_33, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.ayah_count), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "folder-action rename",
      onClick: $event => $options.startRename(folder)
    }, [...(_cache[33] || (_cache[33] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-pencil"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_34), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "folder-action delete",
      onClick: $event => $options.openDeleteConfirm(folder)
    }, [...(_cache[34] || (_cache[34] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-trash"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_35)])], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_29);
  }), 128 /* KEYED_FRAGMENT */))], 64 /* STABLE_FRAGMENT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), $data.editingFolder ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 2,
    class: "modal fade show modal-wrapper",
    tabindex: "-1",
    role: "dialog",
    "aria-modal": "true",
    onClick: _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.cancelRename && $options.cancelRename(...args), ["self"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "modal-title mb-3"
  }, "Rename folder", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => $data.renameValue = $event),
    class: "form-control mb-3",
    placeholder: "New folder name"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.renameValue, void 0, {
    trim: true
  }]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-secondary",
    onClick: _cache[14] || (_cache[14] = (...args) => $options.cancelRename && $options.cancelRename(...args))
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-primary",
    onClick: _cache[15] || (_cache[15] = (...args) => $options.saveRename && $options.saveRename(...args))
  }, "Save")])])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.deleteConfirmOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 3,
    class: "modal fade show modal-wrapper",
    tabindex: "-1",
    role: "dialog",
    "aria-modal": "true",
    onClick: _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.closeDeleteConfirm && $options.closeDeleteConfirm(...args), ["self"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "modal-title mb-3"
  }, "Delete folder?", -1 /* CACHED */)), _cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-0"
  }, "Delete this folder and all saved ayat inside it?", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-secondary",
    onClick: _cache[17] || (_cache[17] = (...args) => $options.closeDeleteConfirm && $options.closeDeleteConfirm(...args))
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger",
    disabled: $data.deleteBusy,
    onClick: _cache[18] || (_cache[18] = (...args) => $options.confirmDeleteFolder && $options.confirmDeleteFolder(...args))
  }, [$data.deleteBusy ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_45)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delete ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_44)])])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/AyahRow.vue?vue&type=style&index=0&id=34bfc18e&scoped=true&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/AyahRow.vue?vue&type=style&index=0&id=34bfc18e&scoped=true&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=style&index=0&id=144e09ac&scoped=true&lang=css":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=style&index=0&id=144e09ac&scoped=true&lang=css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=9402092c&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=9402092c&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/FolderList.vue?vue&type=style&index=0&id=275d2369&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/FolderList.vue?vue&type=style&index=0&id=275d2369&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/components/bookmarks/AyahRow.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/bookmarks/AyahRow.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AyahRow_vue_vue_type_template_id_34bfc18e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AyahRow.vue?vue&type=template&id=34bfc18e&scoped=true */ "./resources/js/components/bookmarks/AyahRow.vue?vue&type=template&id=34bfc18e&scoped=true");
/* harmony import */ var _AyahRow_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AyahRow.vue?vue&type=script&lang=js */ "./resources/js/components/bookmarks/AyahRow.vue?vue&type=script&lang=js");
/* harmony import */ var _AyahRow_vue_vue_type_style_index_0_id_34bfc18e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AyahRow.vue?vue&type=style&index=0&id=34bfc18e&scoped=true&lang=css */ "./resources/js/components/bookmarks/AyahRow.vue?vue&type=style&index=0&id=34bfc18e&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_AyahRow_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AyahRow_vue_vue_type_template_id_34bfc18e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-34bfc18e"],['__file',"resources/js/components/bookmarks/AyahRow.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/bookmarks/AyahRow.vue?vue&type=script&lang=js":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/bookmarks/AyahRow.vue?vue&type=script&lang=js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahRow_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahRow_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AyahRow.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/AyahRow.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/bookmarks/AyahRow.vue?vue&type=style&index=0&id=34bfc18e&scoped=true&lang=css":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/components/bookmarks/AyahRow.vue?vue&type=style&index=0&id=34bfc18e&scoped=true&lang=css ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahRow_vue_vue_type_style_index_0_id_34bfc18e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AyahRow.vue?vue&type=style&index=0&id=34bfc18e&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/AyahRow.vue?vue&type=style&index=0&id=34bfc18e&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/bookmarks/AyahRow.vue?vue&type=template&id=34bfc18e&scoped=true":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/bookmarks/AyahRow.vue?vue&type=template&id=34bfc18e&scoped=true ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahRow_vue_vue_type_template_id_34bfc18e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahRow_vue_vue_type_template_id_34bfc18e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AyahRow.vue?vue&type=template&id=34bfc18e&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/AyahRow.vue?vue&type=template&id=34bfc18e&scoped=true");


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
/* harmony import */ var _BookmarkManager_vue_vue_type_template_id_144e09ac_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BookmarkManager.vue?vue&type=template&id=144e09ac&scoped=true */ "./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=template&id=144e09ac&scoped=true");
/* harmony import */ var _BookmarkManager_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BookmarkManager.vue?vue&type=script&lang=js */ "./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=script&lang=js");
/* harmony import */ var _BookmarkManager_vue_vue_type_style_index_0_id_144e09ac_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BookmarkManager.vue?vue&type=style&index=0&id=144e09ac&scoped=true&lang=css */ "./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=style&index=0&id=144e09ac&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_BookmarkManager_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_BookmarkManager_vue_vue_type_template_id_144e09ac_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-144e09ac"],['__file',"resources/js/components/bookmarks/BookmarkManager.vue"]])
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

/***/ "./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=style&index=0&id=144e09ac&scoped=true&lang=css":
/*!***********************************************************************************************************************!*\
  !*** ./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=style&index=0&id=144e09ac&scoped=true&lang=css ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkManager_vue_vue_type_style_index_0_id_144e09ac_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkManager.vue?vue&type=style&index=0&id=144e09ac&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=style&index=0&id=144e09ac&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=template&id=144e09ac&scoped=true":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=template&id=144e09ac&scoped=true ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkManager_vue_vue_type_template_id_144e09ac_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkManager_vue_vue_type_template_id_144e09ac_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkManager.vue?vue&type=template&id=144e09ac&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkManager.vue?vue&type=template&id=144e09ac&scoped=true");


/***/ }),

/***/ "./resources/js/components/bookmarks/BookmarkModal.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/bookmarks/BookmarkModal.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BookmarkModal_vue_vue_type_template_id_9402092c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BookmarkModal.vue?vue&type=template&id=9402092c&scoped=true */ "./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=template&id=9402092c&scoped=true");
/* harmony import */ var _BookmarkModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BookmarkModal.vue?vue&type=script&lang=js */ "./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=script&lang=js");
/* harmony import */ var _BookmarkModal_vue_vue_type_style_index_0_id_9402092c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BookmarkModal.vue?vue&type=style&index=0&id=9402092c&scoped=true&lang=css */ "./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=9402092c&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_BookmarkModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_BookmarkModal_vue_vue_type_template_id_9402092c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-9402092c"],['__file',"resources/js/components/bookmarks/BookmarkModal.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=script&lang=js":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=script&lang=js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkModal.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=9402092c&scoped=true&lang=css":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=9402092c&scoped=true&lang=css ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkModal_vue_vue_type_style_index_0_id_9402092c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkModal.vue?vue&type=style&index=0&id=9402092c&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=9402092c&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=template&id=9402092c&scoped=true":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=template&id=9402092c&scoped=true ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkModal_vue_vue_type_template_id_9402092c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkModal_vue_vue_type_template_id_9402092c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkModal.vue?vue&type=template&id=9402092c&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/BookmarkModal.vue?vue&type=template&id=9402092c&scoped=true");


/***/ }),

/***/ "./resources/js/components/bookmarks/FolderList.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/bookmarks/FolderList.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FolderList_vue_vue_type_template_id_275d2369_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FolderList.vue?vue&type=template&id=275d2369&scoped=true */ "./resources/js/components/bookmarks/FolderList.vue?vue&type=template&id=275d2369&scoped=true");
/* harmony import */ var _FolderList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FolderList.vue?vue&type=script&lang=js */ "./resources/js/components/bookmarks/FolderList.vue?vue&type=script&lang=js");
/* harmony import */ var _FolderList_vue_vue_type_style_index_0_id_275d2369_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FolderList.vue?vue&type=style&index=0&id=275d2369&scoped=true&lang=css */ "./resources/js/components/bookmarks/FolderList.vue?vue&type=style&index=0&id=275d2369&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_FolderList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_FolderList_vue_vue_type_template_id_275d2369_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-275d2369"],['__file',"resources/js/components/bookmarks/FolderList.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/bookmarks/FolderList.vue?vue&type=script&lang=js":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/bookmarks/FolderList.vue?vue&type=script&lang=js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FolderList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FolderList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FolderList.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/FolderList.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/bookmarks/FolderList.vue?vue&type=style&index=0&id=275d2369&scoped=true&lang=css":
/*!******************************************************************************************************************!*\
  !*** ./resources/js/components/bookmarks/FolderList.vue?vue&type=style&index=0&id=275d2369&scoped=true&lang=css ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FolderList_vue_vue_type_style_index_0_id_275d2369_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FolderList.vue?vue&type=style&index=0&id=275d2369&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/FolderList.vue?vue&type=style&index=0&id=275d2369&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/bookmarks/FolderList.vue?vue&type=template&id=275d2369&scoped=true":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/bookmarks/FolderList.vue?vue&type=template&id=275d2369&scoped=true ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FolderList_vue_vue_type_template_id_275d2369_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FolderList_vue_vue_type_template_id_275d2369_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FolderList.vue?vue&type=template&id=275d2369&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/FolderList.vue?vue&type=template&id=275d2369&scoped=true");


/***/ })

}]);