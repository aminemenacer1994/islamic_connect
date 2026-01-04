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
      source: 'manual',
      loading: false,
      activeAyah: null
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
        var _item$ayah, _item$ayah2, _item$ayah3;
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
          ayah_number: item.ayah_number || item.ayah_num,
          ayah_verse_ar: item.ayah_verse_ar || ((_item$ayah3 = item.ayah) === null || _item$ayah3 === void 0 ? void 0 : _item$ayah3.ayah_text),
          ayah_verse_en: item.ayah_verse_en || ''
        };
      });
    }
  },
  methods: {
    async onFolderSelected(folder) {
      this.selectedFolder = folder;
      this.loading = true;
      try {
        var _ref, _ref2, _response$data$data, _response$data, _response$data2, _response$data3;
        const response = folder.isAll ? await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/ayah-bookmarks') : await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/ayah-bookmarks', {
          params: {
            folder_id: folder.id
          }
        });
        const payload = (_ref = (_ref2 = (_response$data$data = (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.data) !== null && _response$data$data !== void 0 ? _response$data$data : (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.bookmarks) !== null && _ref2 !== void 0 ? _ref2 : response.data) !== null && _ref !== void 0 ? _ref : [];
        this.items = Array.isArray(payload) ? payload : [];
        this.source = folder.isAll ? 'all' : ((_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.source) || 'manual';
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
    }
  },
  data() {
    return {
      folders: [],
      selectedFolderIds: [],
      currentBookmark: null,
      newFolder: {
        name: '',
        icon: '',
        color: 'primary'
      },
      isSaving: false,
      isCreatingFolder: false,
      feedback: '',
      feedbackVariant: 'success',
      bootstrapColors: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      folderExpanded: {},
      folderContents: {}
    };
  },
  computed: {
    feedbackClass() {
      return this.feedbackVariant === 'danger' ? 'alert-danger' : 'alert-success';
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
    this.cleanupModalState();
  },
  methods: {
    onShow() {
      this.cleanupModalState();
      this.feedback = '';
      this.selectedFolderIds = [];
      this.fetchFolders().then(() => this.fetchCurrentBookmark());
    },
    onHidden() {
      this.cleanupModalState();
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
      } catch (error) {
        this.setFeedback('Unable to load folders right now.', 'danger');
      }
    },
    async fetchCurrentBookmark() {
      if (!this.ayah || !this.ayah.surah_number || !this.ayah.ayah_number) {
        return;
      }
      try {
        var _response$data;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/ayah-bookmarks', {
          params: {
            surah_number: this.ayah.surah_number,
            ayah_number: this.ayah.ayah_number
          }
        });
        const bookmark = Array.isArray((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.data) ? response.data.data[0] : null;
        this.currentBookmark = bookmark || null;
        if (bookmark !== null && bookmark !== void 0 && bookmark.folders) {
          this.selectedFolderIds = bookmark.folders.map(folder => folder.id);
        }
      } catch (error) {
        this.currentBookmark = null;
      }
    },
    async createFolder() {
      if (!this.newFolder.name) {
        this.setFeedback('Folder name is required.', 'danger');
        return;
      }
      this.isCreatingFolder = true;
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post('/api/folders', {
          name: this.newFolder.name,
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
          this.newFolder.icon = '';
          this.setFeedback('Folder created.', 'success');
        }
      } catch (error) {
        this.setFeedback('Failed to create folder.', 'danger');
      } finally {
        this.isCreatingFolder = false;
      }
    },
    async saveBookmark() {
      if (!this.ayah) {
        this.setFeedback('Select an ayah first.', 'danger');
        return;
      }
      this.isSaving = true;
      try {
        const payload = {
          surah_number: this.ayah.surah_number,
          ayah_number: this.ayah.ayah_number,
          surah_name: this.ayah.surah_name,
          ayah_verse_ar: this.ayah.ayah_verse_ar,
          ayah_verse_en: this.ayah.ayah_verse_en,
          folder_ids: this.selectedFolderIds
        };
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post('/api/ayah-bookmarks', payload);
        this.setFeedback('Ayah saved to your bookmarks.', 'success');
        this.$emit('saved', payload);
        this.fetchCurrentBookmark();
        const modalEl = document.getElementById('bookmarkModal');
        if (modalEl) {
          const instance = bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal.getInstance(modalEl) || new bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal(modalEl);
          instance.hide();
        }
      } catch (error) {
        this.setFeedback('Failed to save the bookmark.', 'danger');
      } finally {
        this.isSaving = false;
      }
    },
    setFeedback(message, variant) {
      this.feedback = message;
      this.feedbackVariant = variant;
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
        var _response$data2;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/ayah-bookmarks', {
          params: {
            folder_id: folder.id
          }
        });
        const items = Array.isArray((_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.data) ? response.data.data : [];
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
      try {
        var _this$folderContents$2, _this$currentBookmark;
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
        if (((_this$currentBookmark = this.currentBookmark) === null || _this$currentBookmark === void 0 ? void 0 : _this$currentBookmark.id) === bookmark.id) {
          this.selectedFolderIds = this.selectedFolderIds.filter(id => id !== folder.id);
        }
      } catch (error) {
        this.setFeedback('Unable to remove this ayah.', 'danger');
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
      createMenuOpen: false,
      newFolder: {
        name: '',
        icon: '',
        color: 'primary'
      },
      createType: 'folder',
      isCreating: false,
      editingFolder: null,
      renameValue: '',
      status: '',
      statusVariant: 'success',
      bootstrapColors: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
    };
  },
  computed: {
    statusClass() {
      return this.statusVariant === 'danger' ? 'alert-danger' : 'alert-success';
    }
  },
  mounted() {
    this.fetchFolders();
    document.addEventListener('click', this.onOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.onOutsideClick);
  },
  methods: {
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
    toggleCreateMenu() {
      this.createMenuOpen = !this.createMenuOpen;
    },
    startCreate(type) {
      this.createType = type;
      this.createMenuOpen = false;
      if (!this.showCreate) {
        this.showCreate = true;
      }
    },
    onOutsideClick(event) {
      const wrap = this.$refs.createMenuWrap;
      if (!wrap || !this.createMenuOpen) return;
      if (!wrap.contains(event.target)) {
        this.createMenuOpen = false;
      }
    },
    async createFolder() {
      if (!this.newFolder.name) {
        this.setStatus('Folder name is required.', 'danger');
        return;
      }
      this.isCreating = true;
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post('/api/folders', {
          name: this.newFolder.name,
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
        this.setStatus('Could not create folder.', 'danger');
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
    async saveRename() {
      if (!this.editingFolder || !this.renameValue) {
        return;
      }
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].put(`/api/folders/${this.editingFolder.id}`, {
          name: this.renameValue
        });
        const updated = response.data.folder;
        if (updated) {
          const idx = this.folders.findIndex(f => f.id === updated.id);
          if (idx !== -1) this.folders[idx].name = updated.name;
          this.setStatus('Folder renamed.', 'success');
        }
      } catch (error) {
        this.setStatus('Rename failed.', 'danger');
      } finally {
        this.cancelRename();
      }
    },
    async deleteFolder(folder) {
      if (!confirm('Delete this folder?')) return;
      try {
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/folders/${folder.id}`);
        this.folders = this.folders.filter(item => item.id !== folder.id);
        if (this.selectedId === folder.id) {
          this.selectedId = null;
        }
        this.setStatus('Folder deleted.', 'success');
      } catch (error) {
        this.setStatus('Delete failed.', 'danger');
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
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    class: "card ayah-row mb-3",
    draggable: "true",
    onDragstart: _cache[1] || (_cache[1] = (...args) => $options.onDragStart && $options.onDragStart(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.surahLabel) + " • Ayah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.ayah.ayah_number), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ayah-arabic",
    innerHTML: $props.ayah.ayah_verse_ar
  }, null, 8 /* PROPS */, _hoisted_4), $props.ayah.ayah_verse_en ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.ayah.ayah_verse_en), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-sm btn-outline-secondary",
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
  class: "container-fluid"
};
const _hoisted_2 = {
  class: "row g-3"
};
const _hoisted_3 = {
  class: "col-12 col-lg-4"
};
const _hoisted_4 = {
  class: "col-12 col-lg-8"
};
const _hoisted_5 = {
  class: "d-flex align-items-center justify-content-between mb-3"
};
const _hoisted_6 = {
  class: "mb-0"
};
const _hoisted_7 = {
  key: 0,
  class: "badge text-bg-light"
};
const _hoisted_8 = {
  key: 0,
  class: "text-muted"
};
const _hoisted_9 = {
  key: 1,
  class: "text-muted"
};
const _hoisted_10 = {
  key: 2,
  class: "list-group ayah-list"
};
const _hoisted_11 = {
  class: "d-flex justify-content-between align-items-center"
};
const _hoisted_12 = {
  class: "ayah-list-meta"
};
const _hoisted_13 = ["onClick"];
const _hoisted_14 = ["innerHTML"];
const _hoisted_15 = {
  key: 0,
  class: "ayah-list-en"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_folder_list = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("folder-list");
  const _component_bookmark_modal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("bookmark-modal");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_folder_list, {
    onFolderSelected: $options.onFolderSelected
  }, null, 8 /* PROPS */, ["onFolderSelected"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedFolder ? $data.selectedFolder.name : 'Folder contents'), 1 /* TEXT */), $data.selectedFolder ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.sourceLabel), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_8, "Loading ayat...")) : $options.normalizedItems.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, "No ayat yet. Drag any ayah onto a folder to begin.")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_10, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.normalizedItems, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.row_key,
      class: "list-group-item ayah-list-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.surah_name) + " • Ayah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.ayah_number), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-sm btn-outline-secondary",
      "data-bs-toggle": "modal",
      "data-bs-target": "#bookmarkModal",
      onClick: $event => $options.prepareBookmark(item)
    }, [...(_cache[0] || (_cache[0] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-bookmark-plus"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_13)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "ayah-list-ar",
      innerHTML: item.ayah_verse_ar
    }, null, 8 /* PROPS */, _hoisted_14), item.ayah_verse_en ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.ayah_verse_en), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_bookmark_modal, {
    ayah: $data.activeAyah,
    onSaved: $options.onSaved
  }, null, 8 /* PROPS */, ["ayah", "onSaved"])]);
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
  class: "modal-body"
};
const _hoisted_5 = {
  class: "row g-3"
};
const _hoisted_6 = {
  class: "col-12 col-md-6"
};
const _hoisted_7 = {
  class: "section-card h-100"
};
const _hoisted_8 = {
  key: 0,
  class: "empty-state"
};
const _hoisted_9 = {
  key: 1,
  class: "folder-grid"
};
const _hoisted_10 = ["value"];
const _hoisted_11 = {
  class: "pill-icon"
};
const _hoisted_12 = {
  key: 1,
  class: "bi bi-folder2"
};
const _hoisted_13 = {
  class: "pill-meta"
};
const _hoisted_14 = {
  class: "pill-title"
};
const _hoisted_15 = {
  class: "pill-count"
};
const _hoisted_16 = {
  class: "col-12 col-md-6"
};
const _hoisted_17 = {
  class: "section-card h-100"
};
const _hoisted_18 = {
  class: "row g-2 align-items-end"
};
const _hoisted_19 = {
  class: "col-12"
};
const _hoisted_20 = {
  class: "col-12 col-md-6"
};
const _hoisted_21 = {
  class: "col-12 col-md-6"
};
const _hoisted_22 = ["value"];
const _hoisted_23 = {
  class: "col-12"
};
const _hoisted_24 = ["disabled"];
const _hoisted_25 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2"
};
const _hoisted_26 = {
  class: "section-card mt-3"
};
const _hoisted_27 = {
  key: 0,
  class: "empty-state"
};
const _hoisted_28 = {
  key: 1,
  class: "folder-contents"
};
const _hoisted_29 = ["onClick"];
const _hoisted_30 = {
  class: "folder-toggle-title"
};
const _hoisted_31 = {
  class: "folder-toggle-meta"
};
const _hoisted_32 = {
  key: 0,
  class: "folder-items"
};
const _hoisted_33 = {
  key: 0,
  class: "text-muted"
};
const _hoisted_34 = {
  key: 1,
  class: "text-muted"
};
const _hoisted_35 = {
  class: "folder-item-header"
};
const _hoisted_36 = ["onClick"];
const _hoisted_37 = ["innerHTML"];
const _hoisted_38 = {
  key: 0,
  class: "folder-item-en"
};
const _hoisted_39 = {
  class: "modal-footer"
};
const _hoisted_40 = ["disabled"];
const _hoisted_41 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title",
    id: "bookmarkModalLabel"
  }, "Save Ayah"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "modal-subtitle"
  }, "Keep your reflections organized and easy to return to.")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [$data.feedback ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["alert", $options.feedbackClass]),
    role: "alert"
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.feedback), 3 /* TEXT, CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Choose folders"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-hint"
  }, "Pick one or more")], -1 /* CACHED */)), $data.folders.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_8, "No folders yet. Create one below.")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.folders, folder => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("label", {
      key: folder.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["folder-pill", folder.color ? `pill-${folder.color}` : 'pill-neutral'])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "checkbox",
      value: folder.id,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.selectedFolderIds = $event)
    }, null, 8 /* PROPS */, _hoisted_10), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $data.selectedFolderIds]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_11, [folder.icon ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", {
      key: 0,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(folder.icon)
    }, null, 2 /* CLASS */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_12))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.ayah_count) + " ayat", 1 /* TEXT */)]), _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "pill-check"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check-lg"
    })], -1 /* CACHED */))], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Create new folder"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-hint"
  }, "Add a custom collection")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.newFolder.name = $event),
    type: "text",
    class: "form-control",
    placeholder: "Reflection gems"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.newFolder.name, void 0, {
    trim: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Icon", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.newFolder.icon = $event),
    type: "text",
    class: "form-control",
    placeholder: "bi-bookmark-heart"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.newFolder.icon, void 0, {
    trim: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Color", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.newFolder.color = $event),
    class: "form-select"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.bootstrapColors, color => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: color,
      value: color
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(color), 9 /* TEXT, PROPS */, _hoisted_22);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.newFolder.color]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-create",
    disabled: $data.isCreatingFolder,
    onClick: _cache[4] || (_cache[4] = (...args) => $options.createFolder && $options.createFolder(...args))
  }, [$data.isCreatingFolder ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_25)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Create folder ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_24)])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Folder contents"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-hint"
  }, "Review or remove saved ayat")], -1 /* CACHED */)), $data.folders.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_27, "No folders to show yet.")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_28, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.folders, folder => {
    var _$data$folderContents, _$data$folderContents2;
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: `contents-${folder.id}`,
      class: "folder-content"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "folder-toggle",
      type: "button",
      onClick: $event => $options.toggleFolderContents(folder)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.ayah_count) + " ayat", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $data.folderExpanded[folder.id] ? 'bi-chevron-up' : 'bi-chevron-down'])
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_29), $data.folderExpanded[folder.id] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_32, [(_$data$folderContents = $data.folderContents[folder.id]) !== null && _$data$folderContents !== void 0 && _$data$folderContents.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_33, "Loading...")) : !((_$data$folderContents2 = $data.folderContents[folder.id]) !== null && _$data$folderContents2 !== void 0 && (_$data$folderContents2 = _$data$folderContents2.items) !== null && _$data$folderContents2 !== void 0 && _$data$folderContents2.length) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_34, " No ayat saved in this folder. ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 2
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.folderContents[folder.id].items, item => {
      var _item$ayah;
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        class: "folder-item",
        key: item.id
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.surah_name || 'Surah') + " • Ayah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.ayah_number || item.ayah_num), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-sm btn-outline-danger",
        onClick: $event => $options.removeAyahFromFolder(item, folder)
      }, " Remove ", 8 /* PROPS */, _hoisted_36)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "folder-item-ar",
        innerHTML: item.ayah_verse_ar || ((_item$ayah = item.ayah) === null || _item$ayah === void 0 ? void 0 : _item$ayah.ayah_text)
      }, null, 8 /* PROPS */, _hoisted_37), item.ayah_verse_en ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.ayah_verse_en), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-cancel",
    "data-bs-dismiss": "modal"
  }, "Cancel", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-save",
    disabled: $data.isSaving,
    onClick: _cache[5] || (_cache[5] = (...args) => $options.saveBookmark && $options.saveBookmark(...args))
  }, [$data.isSaving ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_41)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Save bookmark ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_40)])])])])]);
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
  class: "folder-top",
  ref: "createMenuWrap"
};
const _hoisted_3 = {
  class: "folder-meta"
};
const _hoisted_4 = {
  class: "folder-count"
};
const _hoisted_5 = {
  key: 0,
  class: "create-menu"
};
const _hoisted_6 = {
  key: 0,
  class: "create-panel mb-3"
};
const _hoisted_7 = {
  class: "create-heading"
};
const _hoisted_8 = {
  class: "mb-2"
};
const _hoisted_9 = {
  class: "d-flex gap-2"
};
const _hoisted_10 = ["value"];
const _hoisted_11 = ["disabled"];
const _hoisted_12 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2"
};
const _hoisted_13 = {
  class: "list-group"
};
const _hoisted_14 = ["onClick", "onDrop"];
const _hoisted_15 = {
  class: "d-flex align-items-center gap-2"
};
const _hoisted_16 = {
  class: "badge rounded-pill bg-light text-dark"
};
const _hoisted_17 = ["onClick"];
const _hoisted_18 = ["onClick"];
const _hoisted_19 = {
  key: 2,
  class: "modal-backdrop fade show"
};
const _hoisted_20 = {
  key: 3,
  class: "rename-modal card"
};
const _hoisted_21 = {
  class: "card-body"
};
const _hoisted_22 = {
  class: "d-flex justify-content-end gap-2 mt-2"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "folder-icon-box"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-folder2-open"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "folder-title"
  }, "New Folder", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.folders.length) + " folders", 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "create-trigger",
    type: "button",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleCreateMenu && $options.toggleCreateMenu(...args))
  }, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-lg"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Create", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chevron-down"
  }, null, -1 /* CACHED */)]))]), $data.createMenuOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "create-item",
    type: "button",
    onClick: _cache[1] || (_cache[1] = $event => $options.startCreate('folder'))
  }, [...(_cache[16] || (_cache[16] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "create-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-folder2"
  })], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Folder"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, "Organize your saved ayat")], -1 /* CACHED */)]))]), _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "create-item",
    type: "button",
    disabled: ""
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "create-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-stars"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Smart folder"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, "Rule-based collection (coming soon)")])], -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */), $data.showCreate ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Create new folder", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-sm btn-link",
    type: "button",
    onClick: _cache[2] || (_cache[2] = (...args) => $options.toggleCreate && $options.toggleCreate(...args))
  }, " Close ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.newFolder.name = $event),
    class: "form-control",
    placeholder: "New folder name"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.newFolder.name, void 0, {
    trim: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.newFolder.icon = $event),
    class: "form-control",
    placeholder: "Icon class"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.newFolder.icon, void 0, {
    trim: true
  }]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.newFolder.color = $event),
    class: "form-select"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.bootstrapColors, color => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: color,
      value: color
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(color), 9 /* TEXT, PROPS */, _hoisted_10);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.newFolder.color]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-primary mt-2",
    disabled: $data.isCreating,
    onClick: _cache[6] || (_cache[6] = (...args) => $options.createFolder && $options.createFolder(...args))
  }, [$data.isCreating ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_12)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Create folder ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_11)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.status ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 1,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["alert", $options.statusClass]),
    role: "alert"
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.status), 3 /* TEXT, CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["list-group-item d-flex align-items-center justify-content-between", {
      active: $data.selectedId === 'all'
    }]),
    onClick: _cache[7] || (_cache[7] = (...args) => $options.selectAll && $options.selectAll(...args))
  }, [...(_cache[20] || (_cache[20] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center gap-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-collection"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "All bookmarks")], -1 /* CACHED */)]))], 2 /* CLASS */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.folders, folder => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: folder.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["list-group-item d-flex align-items-center justify-content-between", {
        active: $data.selectedId === folder.id
      }]),
      onClick: $event => $options.selectFolder(folder),
      onDragover: _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["prevent"])),
      onDrop: $event => $options.handleDrop($event, folder)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [folder.icon ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", {
      key: 0,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(folder.icon)
    }, null, 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.ayah_count), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "d-flex align-items-center gap-2",
      onClick: _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-sm btn-outline-secondary",
      onClick: $event => $options.startRename(folder)
    }, [...(_cache[21] || (_cache[21] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-pencil"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_17), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-sm btn-outline-danger",
      onClick: $event => $options.deleteFolder(folder)
    }, [...(_cache[22] || (_cache[22] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-trash"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_18)])], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_14);
  }), 128 /* KEYED_FRAGMENT */))]), $data.editingFolder ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_19)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.editingFolder ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "mb-2"
  }, "Rename folder", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => $data.renameValue = $event),
    class: "form-control"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.renameValue, void 0, {
    trim: true
  }]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-secondary",
    onClick: _cache[11] || (_cache[11] = (...args) => $options.cancelRename && $options.cancelRename(...args))
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-primary",
    onClick: _cache[12] || (_cache[12] = (...args) => $options.saveRename && $options.saveRename(...args))
  }, "Save")])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
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