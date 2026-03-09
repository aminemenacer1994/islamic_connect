"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_components_vue_SuratComponent_vue"],{

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
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'BookmarkModal',
  emits: ['saved'],
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
      const userId = await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__.fetchUserIdFromApi)();
      if (userId) {
        return true;
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
        var _response$data;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/ayah-bookmarks', {
          params: {
            surah_number: surahNumber,
            ayah_number: ayahNumber
          }
        });
        const bookmark = Array.isArray((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.data) ? response.data.data[0] : null;
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
        var _this$currentBookmark, _this$ayah$surah, _this$ayah$ayah, _response$data2, _this$currentBookmark2;
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
        const bookmark = ((_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.bookmark) || null;
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
        var _response$data3;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/ayah-bookmarks', {
          params: {
            folder_id: folder.id
          }
        });
        const items = Array.isArray((_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.data) ? response.data.data : [];
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

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SuratComponent.vue?vue&type=template&id=637d02d8&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SuratComponent.vue?vue&type=template&id=637d02d8&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  key: 0,
  class: "continue-surah-container mb-3"
};
const _hoisted_2 = {
  class: "row g-3 align-items-stretch continue-surah-row"
};
const _hoisted_3 = {
  class: "col-12 col-md-6"
};
const _hoisted_4 = {
  key: 0,
  class: "continue-progress-banner ltr-text h-100",
  role: "status",
  "aria-live": "polite",
  "aria-atomic": "true"
};
const _hoisted_5 = {
  class: "continue-progress-banner-icon",
  "aria-hidden": "true"
};
const _hoisted_6 = {
  class: "continue-progress-banner-main"
};
const _hoisted_7 = {
  class: "continue-progress-banner-topline"
};
const _hoisted_8 = {
  class: "continue-progress-banner-mode"
};
const _hoisted_9 = {
  class: "continue-progress-banner-title"
};
const _hoisted_10 = {
  class: "continue-progress-banner-actions"
};
const _hoisted_11 = {
  key: 1,
  class: "continue-progress-restore-wrap ltr-text"
};
const _hoisted_12 = {
  class: "col-12 col-md-6"
};
const _hoisted_13 = {
  key: 0,
  class: "quran-toolbar-surah-identity quran-toolbar-surah-identity-mobile ltr-text pb-0",
  role: "status",
  "aria-live": "polite",
  "aria-atomic": "true"
};
const _hoisted_14 = {
  class: "quran-toolbar-surah-identity-inner d-flex align-items-center flex-nowrap"
};
const _hoisted_15 = {
  key: 0,
  class: "quran-toolbar-surah-identity-ar text-end",
  dir: "rtl"
};
const _hoisted_16 = {
  class: "quran-toolbar-surah-identity-en d-flex flex-column text-start flex-grow-1"
};
const _hoisted_17 = {
  class: "quran-toolbar-surah-identity-en-main d-inline-flex align-items-center"
};
const _hoisted_18 = {
  key: 0,
  class: "quran-toolbar-surah-identity-number"
};
const _hoisted_19 = {
  class: "quran-toolbar-surah-identity-title"
};
const _hoisted_20 = {
  key: 0,
  class: "quran-toolbar-surah-identity-en-sub"
};
const _hoisted_21 = {
  key: 0,
  class: "alert mode-toggle-toast bookmark-toast shadow-lg d-flex align-items-center justify-content-between",
  role: "status",
  "aria-live": "polite",
  "aria-atomic": "true"
};
const _hoisted_22 = {
  class: "d-inline-flex align-items-center gap-2"
};
const _hoisted_23 = {
  id: "advancedQuranSearchSection",
  class: "row justify-content-center mb-4"
};
const _hoisted_24 = {
  class: "col-12"
};
const _hoisted_25 = {
  key: 0,
  class: "advanced-quran-search-top"
};
const _hoisted_26 = {
  class: "advanced-quran-search-top-actions"
};
const _hoisted_27 = {
  class: "advanced-quran-search-top-pills"
};
const _hoisted_28 = ["aria-expanded"];
const _hoisted_29 = {
  key: 1,
  class: "advanced-quran-search-input-wrap"
};
const _hoisted_30 = {
  class: "advanced-quran-search-actions"
};
const _hoisted_31 = ["aria-label"];
const _hoisted_32 = {
  key: 2,
  class: "advanced-quran-mobile-deep-focus-bar",
  role: "group",
  "aria-label": "Deep focus mode controls"
};
const _hoisted_33 = ["aria-label", "title"];
const _hoisted_34 = {
  class: "advanced-quran-mobile-action-btn-state"
};
const _hoisted_35 = {
  key: 0,
  disabled: ""
};
const _hoisted_36 = ["value"];
const _hoisted_37 = ["aria-expanded", "aria-label", "title"];
const _hoisted_38 = {
  key: 0,
  id: "advancedQuranMobileExpandedControls",
  "aria-label": "Extended surah controls"
};
const _hoisted_39 = {
  class: "advanced-quran-mobile-select-grid"
};
const _hoisted_40 = {
  class: "advanced-quran-mobile-select-field"
};
const _hoisted_41 = ["value"];
const _hoisted_42 = {
  class: "advanced-quran-mobile-toggle-row",
  role: "group",
  "aria-label": "Global translation controls"
};
const _hoisted_43 = ["title", "aria-label"];
const _hoisted_44 = {
  class: "advanced-quran-mobile-action-btn-state"
};
const _hoisted_45 = ["title", "aria-label"];
const _hoisted_46 = {
  class: "advanced-quran-mobile-action-btn-state"
};
const _hoisted_47 = ["disabled", "title", "aria-label"];
const _hoisted_48 = {
  class: "advanced-quran-mobile-action-btn-state"
};
const _hoisted_49 = ["data-bs-target"];
const _hoisted_50 = {
  class: "advanced-quran-mobile-action-grid"
};
const _hoisted_51 = {
  class: "advanced-quran-mobile-action-label"
};
const _hoisted_52 = ["aria-expanded", "aria-label", "title"];
const _hoisted_53 = {
  class: "advanced-quran-mobile-action-label"
};
const _hoisted_54 = ["disabled"];
const _hoisted_55 = {
  key: 0,
  type: "button",
  class: "btn advanced-quran-mobile-action-btn",
  "data-bs-toggle": "modal",
  "data-bs-target": "#tajweedRulesModal",
  "aria-label": "View tajweed rules",
  title: "Open the tajweed color guide to understand pronunciation and reading rules."
};
const _hoisted_56 = {
  class: "advanced-quran-mobile-action-btn-state"
};
const _hoisted_57 = ["disabled", "aria-label", "title"];
const _hoisted_58 = {
  key: 4,
  id: "advancedQuranSearchPanel",
  class: "advanced-quran-search-panel"
};
const _hoisted_59 = {
  class: "advanced-quran-search-meta",
  "aria-live": "polite"
};
const _hoisted_60 = {
  key: 0
};
const _hoisted_61 = {
  key: 1,
  class: "text-danger"
};
const _hoisted_62 = {
  key: 2
};
const _hoisted_63 = {
  key: 0
};
const _hoisted_64 = {
  key: 3
};
const _hoisted_65 = {
  key: 0,
  class: "advanced-quran-search-speech-error",
  "aria-live": "polite"
};
const _hoisted_66 = {
  key: 1,
  class: "advanced-quran-search-results",
  role: "list",
  "aria-label": "Advanced Quran search results by surah"
};
const _hoisted_67 = {
  class: "advanced-quran-search-surah-head"
};
const _hoisted_68 = {
  class: "advanced-quran-search-surah-ref"
};
const _hoisted_69 = {
  class: "advanced-quran-search-result-chip"
};
const _hoisted_70 = {
  class: "advanced-quran-search-result-surah"
};
const _hoisted_71 = {
  key: 0,
  class: "advanced-quran-search-result-arabic-name"
};
const _hoisted_72 = {
  class: "advanced-quran-search-result-meta"
};
const _hoisted_73 = ["onClick", "aria-expanded"];
const _hoisted_74 = {
  class: "advanced-quran-search-result-head"
};
const _hoisted_75 = {
  class: "advanced-quran-search-result-ref"
};
const _hoisted_76 = {
  class: "advanced-quran-search-result-chip"
};
const _hoisted_77 = {
  key: 0,
  class: "advanced-quran-search-result-meta"
};
const _hoisted_78 = {
  key: 1,
  class: "advanced-quran-search-result-meta"
};
const _hoisted_79 = ["onClick", "aria-label"];
const _hoisted_80 = ["innerHTML"];
const _hoisted_81 = {
  class: "advanced-quran-search-detail-grid"
};
const _hoisted_82 = {
  class: "advanced-quran-search-detail"
};
const _hoisted_83 = ["innerHTML"];
const _hoisted_84 = {
  key: 0,
  class: "quran-toolbar border-shadow-xl"
};
const _hoisted_85 = {
  class: "quran-toolbar-btn-text"
};
const _hoisted_86 = {
  class: "quran-toolbar-reciter"
};
const _hoisted_87 = ["value"];
const _hoisted_88 = {
  key: 0,
  type: "button",
  class: "quran-toolbar-btn",
  "data-bs-toggle": "modal",
  "data-bs-target": "#tajweedRulesModal",
  "aria-label": "View tajweed rules",
  title: "Open the tajweed color guide to understand pronunciation and reading rules."
};
const _hoisted_89 = ["title", "aria-label"];
const _hoisted_90 = {
  class: "quran-toolbar-btn-state"
};
const _hoisted_91 = ["title", "aria-label"];
const _hoisted_92 = {
  class: "quran-toolbar-btn-state"
};
const _hoisted_93 = ["disabled", "title", "aria-label"];
const _hoisted_94 = {
  class: "quran-toolbar-btn-state"
};
const _hoisted_95 = ["data-bs-target"];
const _hoisted_96 = ["aria-label", "title"];
const _hoisted_97 = {
  class: "quran-toolbar-btn-state"
};
const _hoisted_98 = ["aria-expanded"];
const _hoisted_99 = ["aria-label", "title"];
const _hoisted_100 = ["disabled"];
const _hoisted_101 = ["disabled", "aria-label", "title"];
const _hoisted_102 = {
  key: 1,
  class: "reader-custom-playlist-panel"
};
const _hoisted_103 = {
  class: "reader-custom-playlist-header"
};
const _hoisted_104 = {
  class: "reader-custom-playlist-header-actions"
};
const _hoisted_105 = {
  class: "reader-custom-playlist-count"
};
const _hoisted_106 = {
  class: "reader-custom-playlist-layout"
};
const _hoisted_107 = {
  class: "reader-custom-playlist-nav",
  "aria-label": "Playlist list"
};
const _hoisted_108 = {
  class: "reader-custom-playlist-nav-header"
};
const _hoisted_109 = {
  class: "reader-custom-playlist-nav-tools"
};
const _hoisted_110 = {
  class: "reader-custom-playlist-search-wrap"
};
const _hoisted_111 = {
  class: "reader-custom-playlist-nav-list",
  role: "tablist",
  "aria-label": "Saved playlists"
};
const _hoisted_112 = ["aria-selected", "onClick"];
const _hoisted_113 = {
  class: "reader-custom-playlist-nav-item-main"
};
const _hoisted_114 = {
  class: "reader-custom-playlist-nav-item-name"
};
const _hoisted_115 = {
  class: "reader-custom-playlist-nav-item-count"
};
const _hoisted_116 = {
  key: 0,
  class: "reader-custom-playlist-empty-inline"
};
const _hoisted_117 = {
  key: 0,
  class: "reader-custom-playlist-content"
};
const _hoisted_118 = {
  class: "reader-custom-playlist-content-header"
};
const _hoisted_119 = {
  class: "reader-custom-playlist-content-title-row"
};
const _hoisted_120 = {
  class: "reader-custom-playlist-content-title mb-0"
};
const _hoisted_121 = {
  class: "reader-custom-playlist-content-badge"
};
const _hoisted_122 = {
  class: "reader-custom-playlist-content-subtitle mb-0"
};
const _hoisted_123 = {
  class: "reader-custom-playlist-content-actions"
};
const _hoisted_124 = ["disabled"];
const _hoisted_125 = ["disabled"];
const _hoisted_126 = {
  key: 0,
  class: "reader-custom-playlist-editor-card"
};
const _hoisted_127 = {
  class: "reader-custom-playlist-meta"
};
const _hoisted_128 = {
  class: "reader-custom-playlist-field"
};
const _hoisted_129 = {
  class: "reader-custom-playlist-field"
};
const _hoisted_130 = {
  class: "reader-custom-playlist-field reader-custom-playlist-field-save"
};
const _hoisted_131 = ["disabled"];
const _hoisted_132 = {
  class: "reader-custom-playlist-items-card"
};
const _hoisted_133 = {
  class: "reader-custom-playlist-bulk-bar"
};
const _hoisted_134 = {
  class: "reader-custom-playlist-bulk-meta"
};
const _hoisted_135 = {
  class: "reader-custom-playlist-bulk-selected"
};
const _hoisted_136 = {
  class: "reader-custom-playlist-bulk-actions"
};
const _hoisted_137 = {
  class: "reader-custom-playlist-bulk-actions-group",
  role: "group",
  "aria-label": "Playlist quick actions"
};
const _hoisted_138 = ["aria-label", "title"];
const _hoisted_139 = {
  class: "reader-custom-playlist-tool-label"
};
const _hoisted_140 = ["aria-label", "title"];
const _hoisted_141 = {
  class: "reader-custom-playlist-tool-label"
};
const _hoisted_142 = ["disabled"];
const _hoisted_143 = {
  key: 0,
  class: "reader-custom-playlist-empty"
};
const _hoisted_144 = {
  key: 0,
  class: "reader-custom-playlist-guidance"
};
const _hoisted_145 = {
  class: "reader-custom-playlist-list-tools"
};
const _hoisted_146 = {
  class: "reader-custom-playlist-search-wrap reader-custom-playlist-search-wrap--items"
};
const _hoisted_147 = {
  class: "reader-custom-playlist-filter-wrap"
};
const _hoisted_148 = ["onClick", "onDragstart", "onDragover", "onDragleave", "onDrop"];
const _hoisted_149 = {
  class: "reader-custom-playlist-item-select"
};
const _hoisted_150 = ["checked", "aria-label", "onClick"];
const _hoisted_151 = {
  class: "reader-custom-playlist-item-text"
};
const _hoisted_152 = {
  class: "reader-custom-playlist-item-primary"
};
const _hoisted_153 = {
  class: "reader-custom-playlist-item-latin-wrap"
};
const _hoisted_154 = {
  class: "reader-custom-playlist-item-ref"
};
const _hoisted_155 = {
  class: "reader-custom-playlist-item-title"
};
const _hoisted_156 = {
  key: 0,
  class: "bi bi-volume-up-fill reader-custom-playlist-now-playing-icon",
  "aria-hidden": "true"
};
const _hoisted_157 = {
  key: 0,
  class: "reader-custom-playlist-item-arabic",
  dir: "rtl"
};
const _hoisted_158 = {
  key: 0,
  class: "reader-custom-playlist-item-desc"
};
const _hoisted_159 = {
  class: "reader-custom-playlist-item-actions"
};
const _hoisted_160 = ["onClick"];
const _hoisted_161 = {
  key: 0,
  class: "reader-custom-playlist-empty reader-custom-playlist-empty-filtered"
};
const _hoisted_162 = {
  key: 2,
  class: "reader-custom-playlist-list-collapsed-note"
};
const _hoisted_163 = {
  key: 1,
  class: "reader-custom-playlist-content reader-custom-playlist-content-empty"
};
const _hoisted_164 = {
  class: "reader-custom-playlist-empty-state"
};
const _hoisted_165 = {
  class: "quran-toolbar memorisation-toolbar-purple memorisation-toolbar-two-rows"
};
const _hoisted_166 = {
  class: "memorisation-toolbar-row memorisation-toolbar-row-1 memorisation-row-clean-header"
};
const _hoisted_167 = {
  class: "memorisation-toolbar-group memorisation-toolbar-group--header"
};
const _hoisted_168 = {
  key: 0,
  class: "memorisation-header-context",
  "aria-live": "polite"
};
const _hoisted_169 = {
  class: "memorisation-context-pill"
};
const _hoisted_170 = {
  class: "memorisation-context-pill memorisation-context-pill--ayah"
};
const _hoisted_171 = ["aria-valuenow", "aria-valuetext"];
const _hoisted_172 = {
  class: "memorisation-toolbar-row memorisation-toolbar-row-2 memorisation-row-clean-core"
};
const _hoisted_173 = {
  class: "memorisation-core-slot memorisation-core-slot--primary memorisation-core-slot--play"
};
const _hoisted_174 = ["title", "aria-label"];
const _hoisted_175 = {
  class: "memorisation-core-slot-note mb-0"
};
const _hoisted_176 = {
  key: 0,
  class: "memorisation-step-help mb-0"
};
const _hoisted_177 = {
  class: "memorisation-mobile-sections memorisation-mobile-sections--secondary memorisation-desktop-section-toggles"
};
const _hoisted_178 = ["aria-expanded"];
const _hoisted_179 = ["aria-expanded"];
const _hoisted_180 = {
  key: 1,
  class: "memorisation-row-section-heading memorisation-row-section-heading--setup"
};
const _hoisted_181 = {
  key: 2,
  id: "memorisationMobileSessionPanel",
  class: "memorisation-row2-secondary"
};
const _hoisted_182 = {
  class: "memorisation-feature-row memorisation-feature-row--setup memorisation-session-card memorisation-session-card--mode",
  role: "group",
  "aria-label": "Focus and playback setup"
};
const _hoisted_183 = ["title"];
const _hoisted_184 = ["checked", "aria-label"];
const _hoisted_185 = {
  class: "memorisation-inline-field mb-0",
  title: "Set playback flow after each ayah"
};
const _hoisted_186 = ["value"];
const _hoisted_187 = {
  class: "memorisation-toolbar-group memorisation-toolbar-group--range memorisation-session-card memorisation-session-card--range"
};
const _hoisted_188 = {
  class: "d-flex align-items-center gap-2 memorisation-range-main"
};
const _hoisted_189 = {
  class: "d-flex align-items-center gap-1 memorisation-range-inputs"
};
const _hoisted_190 = ["max"];
const _hoisted_191 = ["max", "placeholder"];
const _hoisted_192 = {
  class: "memorisation-feature-row memorisation-feature-row--setup memorisation-session-card memorisation-session-card--audio",
  role: "group",
  "aria-label": "Audio setup"
};
const _hoisted_193 = {
  class: "memorisation-inline-field mb-0",
  title: "Select reciter for memorisation audio"
};
const _hoisted_194 = ["value"];
const _hoisted_195 = {
  class: "memorisation-inline-field mb-0",
  title: "Select playback speed for memorisation audio"
};
const _hoisted_196 = ["value"];
const _hoisted_197 = {
  class: "memorisation-feature-row memorisation-feature-row--controls memorisation-session-card memorisation-session-card--pacing",
  role: "group",
  "aria-label": "Pacing controls"
};
const _hoisted_198 = {
  class: "memorisation-inline-field mb-0",
  title: "Delay before next ayah"
};
const _hoisted_199 = {
  class: "memorisation-inline-field mb-0",
  title: "Repetitions per ayah"
};
const _hoisted_200 = {
  key: 1,
  class: "memorisation-mobile-pacing"
};
const _hoisted_201 = {
  class: "memorisation-mobile-pacing-fields"
};
const _hoisted_202 = {
  class: "memorisation-inline-field mb-0",
  title: "Delay before next ayah"
};
const _hoisted_203 = {
  class: "memorisation-inline-field mb-0",
  title: "Repetitions per ayah"
};
const _hoisted_204 = {
  key: 2,
  class: "quran-toolbar-label memorisation-repetition-inline",
  "aria-live": "polite"
};
const _hoisted_205 = {
  key: 0,
  id: "memorisationMobileAidsPanel",
  class: "memorisation-toolbar-row memorisation-toolbar-row-3 memorisation-row-clean-settings"
};
const _hoisted_206 = {
  id: "memorisationAdvancedSettings",
  class: "memorisation-toolbar-row memorisation-toolbar-row-advanced",
  role: "group",
  "aria-label": "Session setup and pacing settings"
};
const _hoisted_207 = {
  class: "memorisation-advanced-reading"
};
const _hoisted_208 = {
  class: "memorisation-aids-section",
  "aria-label": "Display options"
};
const _hoisted_209 = {
  class: "memorisation-feature-row memorisation-feature-row--feature-panel",
  role: "group",
  "aria-label": "Display options"
};
const _hoisted_210 = ["aria-pressed"];
const _hoisted_211 = {
  class: "memorisation-icon-text-state"
};
const _hoisted_212 = ["aria-pressed"];
const _hoisted_213 = {
  class: "memorisation-icon-text-state"
};
const _hoisted_214 = ["aria-pressed"];
const _hoisted_215 = {
  class: "memorisation-icon-text-state"
};
const _hoisted_216 = ["aria-pressed"];
const _hoisted_217 = {
  class: "memorisation-icon-text-state"
};
const _hoisted_218 = {
  class: "memorisation-aids-section",
  "aria-label": "Audio options"
};
const _hoisted_219 = {
  class: "memorisation-feature-row memorisation-feature-row--feature-panel",
  role: "group",
  "aria-label": "Audio options"
};
const _hoisted_220 = ["aria-pressed"];
const _hoisted_221 = {
  class: "memorisation-icon-text-state"
};
const _hoisted_222 = ["aria-pressed"];
const _hoisted_223 = {
  class: "memorisation-icon-text-state"
};
const _hoisted_224 = {
  class: "modal fade hifdh-plan-modal",
  id: "hifdhPlanModal",
  tabindex: "-1",
  "aria-labelledby": "hifdhPlanModalLabel",
  "aria-hidden": "true"
};
const _hoisted_225 = {
  class: "modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered"
};
const _hoisted_226 = {
  class: "modal-content"
};
const _hoisted_227 = {
  class: "modal-header"
};
const _hoisted_228 = {
  key: 0,
  class: "memorisation-demo-badge"
};
const _hoisted_229 = {
  class: "modal-body"
};
const _hoisted_230 = {
  class: "hifdh-modal-summary"
};
const _hoisted_231 = {
  class: "hifdh-summary-pill"
};
const _hoisted_232 = {
  class: "hifdh-streak-micro mb-0"
};
const _hoisted_233 = {
  key: 0
};
const _hoisted_234 = {
  key: 1
};
const _hoisted_235 = {
  class: "hifdh-next-step-inline mb-0"
};
const _hoisted_236 = {
  class: "hifdh-history-strip",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_237 = {
  class: "hifdh-history-title"
};
const _hoisted_238 = {
  class: "hifdh-history-chip"
};
const _hoisted_239 = {
  class: "hifdh-history-chip"
};
const _hoisted_240 = {
  class: "hifdh-history-chip"
};
const _hoisted_241 = {
  class: "hifdh-history-chip"
};
const _hoisted_242 = {
  class: "hifdh-history-chip"
};
const _hoisted_243 = {
  class: "hifdh-analytics-panel",
  "aria-label": "Hifdh analytics and progress trackers"
};
const _hoisted_244 = {
  class: "hifdh-analytics-card"
};
const _hoisted_245 = {
  class: "hifdh-analytics-head"
};
const _hoisted_246 = ["aria-label"];
const _hoisted_247 = {
  class: "hifdh-analytics-meta"
};
const _hoisted_248 = {
  class: "hifdh-analytics-card"
};
const _hoisted_249 = {
  class: "hifdh-analytics-head"
};
const _hoisted_250 = ["aria-label"];
const _hoisted_251 = {
  class: "hifdh-analytics-meta"
};
const _hoisted_252 = {
  class: "hifdh-performance-dashboard",
  "aria-label": "Performance dashboard"
};
const _hoisted_253 = {
  class: "hifdh-performance-card hifdh-performance-card--tracker"
};
const _hoisted_254 = {
  class: "hifdh-performance-card-head"
};
const _hoisted_255 = {
  class: "hifdh-tracker-grid",
  role: "list",
  "aria-label": "7 day hifdh progress tracker"
};
const _hoisted_256 = {
  class: "hifdh-tracker-day-head"
};
const _hoisted_257 = {
  class: "hifdh-tracker-day-label"
};
const _hoisted_258 = {
  class: "hifdh-tracker-day-date"
};
const _hoisted_259 = ["aria-label"];
const _hoisted_260 = {
  class: "hifdh-tracker-day-meta"
};
const _hoisted_261 = {
  class: "hifdh-performance-card"
};
const _hoisted_262 = {
  key: 0,
  class: "hifdh-weak-list"
};
const _hoisted_263 = {
  class: "hifdh-weak-item-main"
};
const _hoisted_264 = {
  class: "hifdh-weak-item-meta"
};
const _hoisted_265 = {
  key: 1,
  class: "hifdh-weak-empty mb-0"
};
const _hoisted_266 = {
  class: "hifdh-performance-card"
};
const _hoisted_267 = {
  class: "hifdh-streak-grid"
};
const _hoisted_268 = {
  class: "hifdh-streak-stat"
};
const _hoisted_269 = {
  class: "hifdh-streak-stat"
};
const _hoisted_270 = {
  class: "hifdh-streak-stat"
};
const _hoisted_271 = {
  class: "hifdh-onboarding-invite",
  "aria-label": "Hifdh onboarding invitation"
};
const _hoisted_272 = {
  class: "hifdh-onboarding-ring-wrap"
};
const _hoisted_273 = ["aria-label"];
const _hoisted_274 = {
  class: "hifdh-onboarding-invite-content"
};
const _hoisted_275 = {
  class: "hifdh-onboarding-suggestions"
};
const _hoisted_276 = {
  class: "memorisation-simple-controls hifdh-control-panel"
};
const _hoisted_277 = {
  class: "memorisation-review-add-controls hifdh-control-primary"
};
const _hoisted_278 = ["max"];
const _hoisted_279 = ["max"];
const _hoisted_280 = {
  class: "hifdh-onboarding-disclosure hifdh-secondary-disclosure"
};
const _hoisted_281 = {
  class: "hifdh-onboarding-panel hifdh-secondary-panel"
};
const _hoisted_282 = {
  class: "memorisation-review-add-controls hifdh-control-secondary"
};
const _hoisted_283 = ["disabled"];
const _hoisted_284 = {
  key: 0,
  class: "hifdh-reset-confirm mb-0",
  role: "alert"
};
const _hoisted_285 = {
  class: "d-flex gap-2 flex-wrap"
};
const _hoisted_286 = {
  class: "memorisation-simple-list"
};
const _hoisted_287 = {
  class: "hifdh-list-title mb-0"
};
const _hoisted_288 = {
  key: 0,
  class: "hifdh-empty-state"
};
const _hoisted_289 = {
  class: "hifdh-empty-state-content"
};
const _hoisted_290 = ["onClick"];
const _hoisted_291 = {
  class: "hifdh-item-main"
};
const _hoisted_292 = {
  class: "memorisation-plan-item-title"
};
const _hoisted_293 = {
  class: "memorisation-plan-item-meta"
};
const _hoisted_294 = {
  key: 0,
  class: "memorisation-session-card",
  role: "group",
  "aria-label": "Current hifdh review segment"
};
const _hoisted_295 = {
  class: "memorisation-session-heading mb-1"
};
const _hoisted_296 = {
  class: "memorisation-session-meta mb-2"
};
const _hoisted_297 = {
  class: "memorisation-session-actions"
};
const _hoisted_298 = ["onClick"];
const _hoisted_299 = {
  key: 1,
  class: "memorisation-session-done mb-0"
};
const _hoisted_300 = {
  key: 2,
  class: "pinned-ayahs-restore ltr-text reading-fullscreen-chrome"
};
const _hoisted_301 = {
  class: "pinned-ayahs-header"
};
const _hoisted_302 = {
  class: "pinned-ayahs-header-actions"
};
const _hoisted_303 = ["aria-label", "title"];
const _hoisted_304 = {
  class: "pinned-ayahs-scroll",
  role: "region",
  "aria-label": "Pinned ayat horizontal list"
};
const _hoisted_305 = {
  class: "pinned-ayahs-list",
  role: "list"
};
const _hoisted_306 = ["onClick", "aria-label"];
const _hoisted_307 = {
  class: "pinned-ayah-ref"
};
const _hoisted_308 = {
  class: "pinned-ayah-name"
};
const _hoisted_309 = {
  class: "pinned-ayah-preview mb-0"
};
const _hoisted_310 = ["onClick"];
const _hoisted_311 = {
  class: "playlist-modal-header"
};
const _hoisted_312 = {
  class: "reader-custom-playlist-meta"
};
const _hoisted_313 = {
  class: "reader-custom-playlist-field"
};
const _hoisted_314 = {
  class: "reader-custom-playlist-field"
};
const _hoisted_315 = {
  class: "reader-custom-playlist-field reader-custom-playlist-field-save"
};
const _hoisted_316 = {
  class: "surah-layout"
};
const _hoisted_317 = {
  class: "sidebar-toggle mt-3 mb-2 px-3"
};
const _hoisted_318 = ["aria-expanded", "aria-label"];
const _hoisted_319 = {
  key: 0
};
const _hoisted_320 = {
  id: "surat-filters",
  class: "row g-3"
};
const _hoisted_321 = {
  class: "col-12 col-md-12 filter-item surah-list p-0"
};
const _hoisted_322 = {
  class: "sidebar-dark-content d-flex flex-column h-100"
};
const _hoisted_323 = {
  class: "sidebar-header pt-3 px-3 pb-2 sidebar-header-sticky"
};
const _hoisted_324 = {
  class: "sidebar-tabs d-flex gap-2 mb-3 align-items-center"
};
const _hoisted_325 = {
  class: "search-container"
};
const _hoisted_326 = ["placeholder"];
const _hoisted_327 = {
  key: 0,
  class: "list-group list-group-flush"
};
const _hoisted_328 = ["onClick"];
const _hoisted_329 = {
  class: "d-flex align-items-center w-100"
};
const _hoisted_330 = {
  class: "item-number me-3"
};
const _hoisted_331 = {
  class: "flex-grow-1 text-start"
};
const _hoisted_332 = {
  class: "sidebar-surah-title-row"
};
const _hoisted_333 = ["aria-label", "title"];
const _hoisted_334 = {
  class: "item-title-en"
};
const _hoisted_335 = {
  class: "sidebar-item-meta"
};
const _hoisted_336 = {
  key: 0
};
const _hoisted_337 = {
  key: 1
};
const _hoisted_338 = {
  key: 0,
  class: "sidebar-item-extra"
};
const _hoisted_339 = {
  key: 0
};
const _hoisted_340 = {
  class: "surah-info-group ms-auto"
};
const _hoisted_341 = {
  class: "item-title-ar text-end"
};
const _hoisted_342 = ["onClick"];
const _hoisted_343 = {
  key: 1,
  class: "list-group list-group-flush"
};
const _hoisted_344 = {
  key: 0,
  class: "p-3 text-white-50 small text-center border-bottom border-white-10"
};
const _hoisted_345 = ["onClick"];
const _hoisted_346 = {
  class: "d-flex w-100 align-items-center"
};
const _hoisted_347 = {
  class: "item-number-container me-2"
};
const _hoisted_348 = {
  class: "item-number"
};
const _hoisted_349 = {
  class: "flex-grow-1 overflow-hidden d-flex align-items-center py-2"
};
const _hoisted_350 = {
  class: "items-text-preview text-start text-truncate pe-2 border-end border-white-10",
  style: {
    "color": "#ffffff",
    "font-weight": "700",
    "font-size": "0.85rem",
    "flex": "0 0 50%",
    "max-width": "50%"
  }
};
const _hoisted_351 = {
  class: "item-title-ar text-end text-truncate ps-2",
  style: {
    "font-size": "1.2rem",
    "color": "#ffffff",
    "font-weight": "normal",
    "flex": "0 0 50%",
    "max-width": "50%",
    "font-family": "var(--ic-quran-arabic-font) !important"
  }
};
const _hoisted_352 = {
  key: 1,
  class: "text-center text-white-50 py-4"
};
const _hoisted_353 = {
  key: 2,
  class: "list-group list-group-flush"
};
const _hoisted_354 = ["onClick"];
const _hoisted_355 = {
  class: "d-flex w-100 align-items-center justify-content-between"
};
const _hoisted_356 = {
  class: "text-start"
};
const _hoisted_357 = {
  class: "item-title-en"
};
const _hoisted_358 = {
  class: "small text-white-50",
  style: {
    "font-size": "0.75rem"
  }
};
const _hoisted_359 = {
  class: "surah-offcanvas-trigger"
};
const _hoisted_360 = {
  class: "offcanvas offcanvas-start surah-offcanvas",
  tabindex: "-1",
  id: "surahOffcanvas",
  ref: "surahOffcanvas",
  "aria-labelledby": "surahOffcanvasLabel"
};
const _hoisted_361 = {
  class: "offcanvas-body"
};
const _hoisted_362 = {
  key: 0,
  class: "surah-offcanvas-section surah-offcanvas-search"
};
const _hoisted_363 = {
  key: 0,
  class: "surah-offcanvas-title"
};
const _hoisted_364 = {
  key: 1,
  class: "surah-offcanvas-title"
};
const _hoisted_365 = {
  key: 2,
  class: "surah-offcanvas-badge"
};
const _hoisted_366 = {
  class: "surah-offcanvas-section"
};
const _hoisted_367 = ["value"];
const _hoisted_368 = {
  class: "surah-offcanvas-section"
};
const _hoisted_369 = ["value"];
const _hoisted_370 = {
  class: "surah-offcanvas-row mt-3"
};
const _hoisted_371 = {
  class: "surah-offcanvas-field"
};
const _hoisted_372 = ["value"];
const _hoisted_373 = ["disabled"];
const _hoisted_374 = {
  key: 0,
  class: "loading-placeholder"
};
const _hoisted_375 = ["id", "data-ayah-number", "onClick", "onTouchstartPassive", "onPointerdown", "onKeydown", "draggable", "onDragstart"];
const _hoisted_376 = {
  class: "ayah-surface rtl-text d-flex flex-column"
};
const _hoisted_377 = {
  class: "d-flex justify-content-between text-muted ltr-text ayah-card-header"
};
const _hoisted_378 = {
  class: "d-flex align-items-center gap-2"
};
const _hoisted_379 = {
  key: 0,
  class: "saved-pill"
};
const _hoisted_380 = {
  key: 0,
  class: "now-playing-tag"
};
const _hoisted_381 = {
  class: "ayah-card-header-actions"
};
const _hoisted_382 = {
  class: "form-check form-switch translation-toggle ayah-translation-toggle"
};
const _hoisted_383 = ["checked", "id", "aria-label", "onChange"];
const _hoisted_384 = ["for"];
const _hoisted_385 = {
  class: "form-check form-switch translation-toggle ayah-transliteration-toggle"
};
const _hoisted_386 = ["checked", "id", "aria-label", "onChange"];
const _hoisted_387 = ["for"];
const _hoisted_388 = {
  class: "ayah-pin-feedback-group"
};
const _hoisted_389 = ["onClick", "aria-label", "title"];
const _hoisted_390 = ["onClick", "aria-label", "title"];
const _hoisted_391 = ["onClick", "disabled", "aria-label", "title"];
const _hoisted_392 = ["onClick"];
const _hoisted_393 = {
  key: 0,
  class: "ayah-playlist-menu-row"
};
const _hoisted_394 = ["onClick"];
const _hoisted_395 = ["onClick"];
const _hoisted_396 = {
  key: 0,
  class: "ayah-playlist-menu-row"
};
const _hoisted_397 = ["onClick"];
const _hoisted_398 = ["disabled", "onClick"];
const _hoisted_399 = ["onClick"];
const _hoisted_400 = {
  key: 0,
  class: "bi bi-check-circle-fill feedback-badge-icon"
};
const _hoisted_401 = {
  key: 1,
  class: "bi bi-trash-fill feedback-badge-icon"
};
const _hoisted_402 = {
  key: 2,
  class: "bi bi-exclamation-triangle-fill feedback-badge-icon"
};
const _hoisted_403 = ["href"];
const _hoisted_404 = ["aria-hidden"];
const _hoisted_405 = {
  class: "col-md-11"
};
const _hoisted_406 = {
  style: {
    "padding": "4px"
  }
};
const _hoisted_407 = ["innerHTML", "onClick"];
const _hoisted_408 = {
  key: 0,
  class: "translation-header pt-2 ltr-text hide-on-mobile-tablet ml-2"
};
const _hoisted_409 = {
  class: "translation-copy flex-grow-1"
};
const _hoisted_410 = {
  key: 0
};
const _hoisted_411 = ["innerHTML"];
const _hoisted_412 = {
  key: 2,
  class: "transliteration-header pt-2 ltr-text hide-on-mobile-tablet ml-2"
};
const _hoisted_413 = ["innerHTML"];
const _hoisted_414 = {
  class: "ayah-quick-actions ltr-text",
  role: "group",
  "aria-label": "Quick actions"
};
const _hoisted_415 = ["onClick"];
const _hoisted_416 = ["onClick"];
const _hoisted_417 = ["onClick"];
const _hoisted_418 = {
  class: "col-md-1 text-center"
};
const _hoisted_419 = {
  class: "d-flex flex-column align-items-center"
};
const _hoisted_420 = ["onClick", "aria-label", "title"];
const _hoisted_421 = ["aria-hidden"];
const _hoisted_422 = ["innerHTML", "onClick"];
const _hoisted_423 = {
  key: 0,
  class: "d-flex align-items-center fw-bold pt-2 ltr-text ml-2"
};
const _hoisted_424 = {
  key: 1
};
const _hoisted_425 = ["innerHTML"];
const _hoisted_426 = {
  key: 3,
  class: "d-flex align-items-center fw-bold pt-2 ltr-text ml-2 transliteration-header"
};
const _hoisted_427 = ["innerHTML"];
const _hoisted_428 = {
  class: "ayah-quick-actions ltr-text",
  role: "group",
  "aria-label": "Quick actions"
};
const _hoisted_429 = ["onClick"];
const _hoisted_430 = ["onClick"];
const _hoisted_431 = ["onClick"];
const _hoisted_432 = ["onClick", "aria-label", "title"];
const _hoisted_433 = {
  class: "row card-teal mb-3 py-2 ayah-inline-controls ayah-inline-controls--compact"
};
const _hoisted_434 = {
  class: "col text-center ayah-inline-control-item ayah-inline-control-item--font-down"
};
const _hoisted_435 = {
  class: "col text-center ayah-inline-control-item ayah-inline-control-item--font-up"
};
const _hoisted_436 = {
  class: "col text-center ayah-inline-control-item ayah-inline-control-item--rewind"
};
const _hoisted_437 = ["onClick"];
const _hoisted_438 = {
  class: "col text-center ayah-inline-control-item ayah-inline-control-item--play"
};
const _hoisted_439 = ["onClick", "aria-label", "title"];
const _hoisted_440 = {
  class: "ayah-inline-control-label"
};
const _hoisted_441 = {
  class: "col text-center ayah-inline-control-item ayah-inline-control-item--forward"
};
const _hoisted_442 = ["onClick"];
const _hoisted_443 = {
  class: "col text-center ayah-inline-control-item ayah-inline-control-item--bookmark"
};
const _hoisted_444 = ["onClick", "title", "aria-label"];
const _hoisted_445 = {
  class: "ayah-inline-control-label"
};
const _hoisted_446 = {
  class: "visually-hidden",
  "aria-live": "polite",
  "aria-atomic": "true"
};
const _hoisted_447 = {
  key: 1,
  class: "empty-state text-center text-muted py-4"
};
const _hoisted_448 = ["id"];
const _hoisted_449 = {
  class: "modal-dialog modal-dialog-centered modal-dialog-scrollable modal-2xl"
};
const _hoisted_450 = {
  class: "modal-content surat-onboarding-modal"
};
const _hoisted_451 = {
  class: "modal-header"
};
const _hoisted_452 = {
  class: "surat-onboarding-header-actions"
};
const _hoisted_453 = ["disabled"];
const _hoisted_454 = ["disabled"];
const _hoisted_455 = {
  class: "surat-onboarding-search-wrap"
};
const _hoisted_456 = {
  class: "surat-onboarding-meta mb-3"
};
const _hoisted_457 = {
  key: 0,
  class: "surat-onboarding-grid"
};
const _hoisted_458 = {
  class: "surat-onboarding-card-top"
};
const _hoisted_459 = {
  class: "surat-onboarding-card-meta"
};
const _hoisted_460 = {
  class: "surat-onboarding-icon",
  "aria-hidden": "true"
};
const _hoisted_461 = {
  class: "surat-onboarding-area"
};
const _hoisted_462 = {
  class: "surat-onboarding-rank"
};
const _hoisted_463 = ["innerHTML"];
const _hoisted_464 = ["innerHTML"];
const _hoisted_465 = {
  class: "surat-onboarding-how mb-0"
};
const _hoisted_466 = ["innerHTML"];
const _hoisted_467 = {
  key: 1,
  class: "surat-onboarding-empty"
};
const _hoisted_468 = ["id"];
const _hoisted_469 = {
  class: "modal-dialog modal-dialog-centered modal-xxl"
};
const _hoisted_470 = {
  class: "modal-content translation-compare-modal"
};
const _hoisted_471 = {
  class: "translation-compare-controls"
};
const _hoisted_472 = {
  class: "translation-compare-controls-head"
};
const _hoisted_473 = {
  class: "translation-compare-controls-meta",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_474 = ["aria-expanded", "aria-label"];
const _hoisted_475 = {
  class: "translation-compare-compact-grid"
};
const _hoisted_476 = {
  class: "translation-compare-field"
};
const _hoisted_477 = ["value"];
const _hoisted_478 = {
  class: "translation-compare-field"
};
const _hoisted_479 = {
  class: "translation-compare-field-row"
};
const _hoisted_480 = ["disabled"];
const _hoisted_481 = ["value", "max"];
const _hoisted_482 = ["disabled"];
const _hoisted_483 = {
  class: "translation-compare-field"
};
const _hoisted_484 = ["value", "disabled"];
const _hoisted_485 = {
  class: "translation-compare-field"
};
const _hoisted_486 = ["value", "disabled"];
const _hoisted_487 = {
  id: "translationCompareInlineTools",
  class: "translation-compare-inline-row"
};
const _hoisted_488 = {
  class: "translation-compare-highlight-row"
};
const _hoisted_489 = {
  class: "translation-compare-field translation-compare-highlight-field"
};
const _hoisted_490 = {
  class: "translation-compare-field-head"
};
const _hoisted_491 = {
  key: 0,
  class: "translation-compare-highlight-feedback"
};
const _hoisted_492 = {
  class: "translation-compare-highlight-input-wrap"
};
const _hoisted_493 = {
  class: "translation-compare-tools-row",
  role: "group",
  "aria-label": "Reader tools"
};
const _hoisted_494 = {
  key: 0,
  class: "alert alert-warning translation-compare-alert",
  role: "status"
};
const _hoisted_495 = {
  key: 1,
  class: "translation-compare-content"
};
const _hoisted_496 = {
  class: "translation-compare-arabic-panel"
};
const _hoisted_497 = {
  class: "translation-compare-meta"
};
const _hoisted_498 = ["innerHTML"];
const _hoisted_499 = {
  key: 0,
  class: "translation-compare-interlinear-note mb-0"
};
const _hoisted_500 = {
  class: "translation-compare-card-head"
};
const _hoisted_501 = {
  class: "translation-compare-card-head-copy"
};
const _hoisted_502 = {
  class: "mb-0"
};
const _hoisted_503 = {
  class: "translation-compare-card-subtitle mb-0"
};
const _hoisted_504 = {
  key: 0,
  class: "translation-compare-match-count mb-2"
};
const _hoisted_505 = ["innerHTML"];
const _hoisted_506 = {
  class: "translation-compare-pagination-wrap",
  role: "group",
  "aria-label": "Ayah pagination"
};
const _hoisted_507 = {
  class: "translation-compare-simple-pagination"
};
const _hoisted_508 = ["disabled"];
const _hoisted_509 = {
  class: "translation-compare-pagination-counter",
  "aria-live": "polite"
};
const _hoisted_510 = ["disabled"];
const _hoisted_511 = {
  key: 2,
  class: "translation-compare-loading text-muted"
};
const _hoisted_512 = {
  class: "modal fade",
  id: "tajweedRulesModal",
  tabindex: "-1",
  "aria-labelledby": "tajweedRulesLabel",
  "aria-hidden": "true",
  "data-bs-backdrop": "true"
};
const _hoisted_513 = {
  class: "modal-dialog modal-dialog-centered modal-xl modal-modern tajweed-rules-modal-dialog"
};
const _hoisted_514 = {
  class: "modal-content tajweed-modal"
};
const _hoisted_515 = {
  class: "modal-body"
};
const _hoisted_516 = {
  key: 0,
  class: "tajweed-rules-grid"
};
const _hoisted_517 = {
  class: "tajweed-rule-card-header"
};
const _hoisted_518 = {
  class: "tajweed-rule-card-title mb-0"
};
const _hoisted_519 = {
  class: "tajweed-rule-card-ref"
};
const _hoisted_520 = ["innerHTML"];
const _hoisted_521 = {
  key: 1,
  class: "text-muted small"
};
const _hoisted_522 = {
  class: "modal fade",
  id: "surahInfoModal",
  tabindex: "-1",
  "aria-labelledby": "surahInfoLabel",
  "aria-hidden": "true",
  "data-bs-backdrop": "true"
};
const _hoisted_523 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern"
};
const _hoisted_524 = {
  class: "modal-content surah-info-modal"
};
const _hoisted_525 = {
  class: "modal-header"
};
const _hoisted_526 = {
  class: "surah-info-actions"
};
const _hoisted_527 = ["disabled"];
const _hoisted_528 = ["disabled"];
const _hoisted_529 = {
  class: "modal-body"
};
const _hoisted_530 = {
  class: "surah-info-hero"
};
const _hoisted_531 = {
  key: 0,
  class: "surah-info-arabic-large"
};
const _hoisted_532 = {
  class: "surah-info-english"
};
const _hoisted_533 = {
  class: "surah-info-meta"
};
const _hoisted_534 = {
  class: "surah-info-chip"
};
const _hoisted_535 = {
  class: "surah-info-chip"
};
const _hoisted_536 = ["innerHTML"];
const _hoisted_537 = {
  key: 1,
  class: "surah-info-loading"
};
const _hoisted_538 = {
  key: 2,
  class: "surah-info-error"
};
const _hoisted_539 = ["innerHTML"];
const _hoisted_540 = {
  key: 4,
  class: "surah-info-empty"
};
const _hoisted_541 = {
  class: "surah-info-source"
};
const _hoisted_542 = ["href"];
const _hoisted_543 = {
  key: 1
};
const _hoisted_544 = {
  key: 2
};
const _hoisted_545 = {
  key: 1,
  class: "text-muted small"
};
const _hoisted_546 = {
  class: "modal fade",
  id: "surahSettingsModal",
  tabindex: "-1",
  "aria-labelledby": "surahSettingsLabel",
  "aria-hidden": "true",
  "data-bs-backdrop": "true"
};
const _hoisted_547 = {
  class: "modal-dialog modal-dialog-centered modal-xl modal-modern surah-settings-dialog"
};
const _hoisted_548 = {
  class: "modal-content surah-settings-modal"
};
const _hoisted_549 = {
  class: "modal-body"
};
const _hoisted_550 = {
  class: "row g-3 surah-settings-grid"
};
const _hoisted_551 = {
  class: "col-12 col-md-6"
};
const _hoisted_552 = {
  class: "surah-settings-group h-100"
};
const _hoisted_553 = ["value"];
const _hoisted_554 = {
  class: "col-12 col-md-6"
};
const _hoisted_555 = {
  class: "surah-settings-group h-100"
};
const _hoisted_556 = ["value"];
const _hoisted_557 = {
  class: "col-12 col-md-6"
};
const _hoisted_558 = {
  class: "surah-settings-group h-100"
};
const _hoisted_559 = {
  class: "col-12 col-md-6"
};
const _hoisted_560 = {
  class: "surah-settings-group h-100"
};
const _hoisted_561 = ["value"];
const _hoisted_562 = {
  key: 0,
  class: "text-muted d-block mt-1"
};
const _hoisted_563 = {
  key: 1,
  class: "text-muted d-block mt-1"
};
const _hoisted_564 = {
  class: "col-12 col-md-6"
};
const _hoisted_565 = {
  class: "surah-settings-group h-100"
};
const _hoisted_566 = {
  class: "col-12 col-md-6"
};
const _hoisted_567 = {
  class: "surah-settings-group h-100"
};
const _hoisted_568 = {
  class: "col-12 col-md-6"
};
const _hoisted_569 = {
  class: "surah-settings-group h-100"
};
const _hoisted_570 = {
  class: "col-12 col-md-6"
};
const _hoisted_571 = {
  class: "surah-settings-group h-100"
};
const _hoisted_572 = {
  class: "modal-footer border-0"
};
const _hoisted_573 = ["id"];
const _hoisted_574 = ["id"];
const _hoisted_575 = {
  class: "offcanvas-body"
};
const _hoisted_576 = {
  class: "quran-font-panel"
};
const _hoisted_577 = {
  key: 0,
  class: "quran-font-loading"
};
const _hoisted_578 = {
  key: 1
};
const _hoisted_579 = {
  key: 0,
  class: "quran-font-error"
};
const _hoisted_580 = {
  class: "quran-font-list"
};
const _hoisted_581 = ["onClick"];
const _hoisted_582 = {
  class: "quran-font-option-header"
};
const _hoisted_583 = {
  class: "form-check"
};
const _hoisted_584 = ["id", "value"];
const _hoisted_585 = ["for"];
const _hoisted_586 = {
  key: 0,
  class: "quran-font-source"
};
const _hoisted_587 = {
  key: 0,
  class: "quran-font-preview-loading"
};
const _hoisted_588 = ["innerHTML"];
const _hoisted_589 = {
  key: 2,
  class: "alert alert-soft-success quran-font-alert",
  role: "status"
};
const _hoisted_590 = {
  class: "quran-font-actions"
};
const _hoisted_591 = ["disabled"];
const _hoisted_592 = ["id"];
const _hoisted_593 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable modal-fullscreen-sm-down"
};
const _hoisted_594 = {
  class: "modal-content quran-font-modal-content"
};
const _hoisted_595 = {
  class: "modal-body"
};
const _hoisted_596 = {
  class: "quran-font-panel"
};
const _hoisted_597 = {
  key: 0,
  class: "quran-font-loading"
};
const _hoisted_598 = {
  key: 1
};
const _hoisted_599 = {
  key: 0,
  class: "quran-font-error"
};
const _hoisted_600 = {
  class: "quran-font-list"
};
const _hoisted_601 = ["onClick"];
const _hoisted_602 = {
  class: "quran-font-option-header"
};
const _hoisted_603 = {
  class: "form-check"
};
const _hoisted_604 = ["id", "value"];
const _hoisted_605 = ["for"];
const _hoisted_606 = {
  key: 0,
  class: "quran-font-source"
};
const _hoisted_607 = {
  key: 0,
  class: "quran-font-preview-loading"
};
const _hoisted_608 = ["innerHTML"];
const _hoisted_609 = {
  key: 2,
  class: "alert alert-soft-success quran-font-alert",
  role: "status"
};
const _hoisted_610 = {
  class: "quran-font-actions"
};
const _hoisted_611 = ["disabled"];
const _hoisted_612 = ["id"];
const _hoisted_613 = {
  class: "modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable modal-modern modal-fullscreen-md-down"
};
const _hoisted_614 = {
  class: "modal-content ayah-tafsir-modal-content"
};
const _hoisted_615 = {
  class: "modal-header"
};
const _hoisted_616 = {
  class: "modal-title ayah-tafsir-modal-title",
  id: "ayahTafsirModalLabel"
};
const _hoisted_617 = {
  key: 0,
  class: "ayah-tafsir-modal-reference"
};
const _hoisted_618 = {
  class: "modal-body pt-0"
};
const _hoisted_619 = {
  class: "ayah-tafsir-panel ltr-text ayah-tafsir-modal-panel",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_620 = {
  class: "ayah-tafsir-meta"
};
const _hoisted_621 = {
  class: "ayah-tafsir-meta-item"
};
const _hoisted_622 = {
  class: "ayah-tafsir-meta-value"
};
const _hoisted_623 = {
  class: "ayah-tafsir-meta-item"
};
const _hoisted_624 = {
  class: "ayah-tafsir-meta-value"
};
const _hoisted_625 = {
  class: "ayah-tafsir-meta-item"
};
const _hoisted_626 = {
  class: "ayah-tafsir-meta-value"
};
const _hoisted_627 = {
  key: 0,
  class: "ayah-tafsir-loading mb-0"
};
const _hoisted_628 = {
  key: 1,
  class: "ayah-tafsir-error mb-0"
};
const _hoisted_629 = {
  key: 2,
  class: "ayah-tafsir-text mb-0"
};
const _hoisted_630 = {
  class: "modal-footer border-0 pt-0"
};
const _hoisted_631 = {
  class: "modal fade",
  id: "ayahReflectionModal",
  tabindex: "-1",
  "aria-labelledby": "reflectionModalLabel",
  "aria-hidden": "true",
  "data-bs-backdrop": "true"
};
const _hoisted_632 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_633 = {
  class: "modal-content reflection-modal"
};
const _hoisted_634 = {
  class: "modal-header"
};
const _hoisted_635 = {
  class: "modal-body pt-0"
};
const _hoisted_636 = {
  key: 0,
  class: "reflection-success-banner reflection-success-top"
};
const _hoisted_637 = ["minlength"];
const _hoisted_638 = {
  class: "d-flex justify-content-between align-items-center mt-2"
};
const _hoisted_639 = {
  class: "text-muted"
};
const _hoisted_640 = {
  class: "text-muted small"
};
const _hoisted_641 = {
  key: 1,
  class: "alert alert-info d-flex justify-content-between align-items-center small"
};
const _hoisted_642 = {
  class: "note-suggestions-header d-flex justify-content-between align-items-center mb-3"
};
const _hoisted_643 = {
  class: "suggestion-marquee-stack"
};
const _hoisted_644 = {
  class: "suggestion-marquee"
};
const _hoisted_645 = {
  class: "suggestion-track-group",
  "aria-hidden": false
};
const _hoisted_646 = ["onClick"];
const _hoisted_647 = {
  class: "lead"
};
const _hoisted_648 = {
  key: 2,
  class: "note-suggestions-collapsed d-flex justify-content-between align-items-center"
};
const _hoisted_649 = {
  key: 3,
  class: "alert alert-danger py-2 small"
};
const _hoisted_650 = {
  key: 4,
  class: "reflection-history reflection-history-card mt-4"
};
const _hoisted_651 = {
  class: "reflection-history-header"
};
const _hoisted_652 = {
  class: "reflection-history-count"
};
const _hoisted_653 = {
  class: "reflection-history-list"
};
const _hoisted_654 = {
  class: "reflection-history-subject"
};
const _hoisted_655 = {
  class: "reflection-history-message"
};
const _hoisted_656 = {
  class: "reflection-history-entry-actions"
};
const _hoisted_657 = ["onClick"];
const _hoisted_658 = ["onClick"];
const _hoisted_659 = {
  class: "modal-footer justify-content-end border-0 p-0 mt-2 gap-2 small-actions"
};
const _hoisted_660 = ["disabled"];
const _hoisted_661 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2",
  role: "status",
  "aria-hidden": "true"
};
const _hoisted_662 = ["id", "aria-labelledby"];
const _hoisted_663 = {
  class: "modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable voice-command-guide-dialog"
};
const _hoisted_664 = {
  class: "modal-content voice-command-guide-modal"
};
const _hoisted_665 = {
  class: "modal-header"
};
const _hoisted_666 = ["id"];
const _hoisted_667 = {
  class: "voice-command-guide-intro mb-0"
};
const _hoisted_668 = {
  class: "modal-body"
};
const _hoisted_669 = {
  class: "voice-command-availability-grid"
};
const _hoisted_670 = {
  class: "voice-command-guide-tips-section"
};
const _hoisted_671 = {
  class: "voice-command-guide-tip-list"
};
const _hoisted_672 = {
  class: "voice-command-guide-group-header"
};
const _hoisted_673 = {
  class: "voice-command-guide-command-grid"
};
const _hoisted_674 = {
  class: "voice-command-guide-chip-row"
};
const _hoisted_675 = {
  class: "voice-command-guide-example mb-0"
};
const _hoisted_676 = {
  key: 0,
  class: "audio-player-container"
};
const _hoisted_677 = {
  class: "custom-audio-player"
};
const _hoisted_678 = {
  class: "controls"
};
const _hoisted_679 = ["title"];
const _hoisted_680 = {
  class: "speed-indicator"
};
const _hoisted_681 = ["title", "aria-pressed"];
const _hoisted_682 = ["disabled", "title", "aria-label"];
const _hoisted_683 = ["title", "aria-expanded"];
const _hoisted_684 = {
  key: 0,
  class: "speed-indicator"
};
const _hoisted_685 = {
  key: 0,
  class: "volume-bar-container"
};
const _hoisted_686 = {
  class: "time",
  "aria-live": "polite"
};
const _hoisted_687 = {
  key: 0,
  class: "audio-player-queue-panel"
};
const _hoisted_688 = {
  class: "audio-player-queue-header"
};
const _hoisted_689 = ["title", "aria-expanded"];
const _hoisted_690 = {
  key: 0,
  class: "audio-player-queue-empty"
};
const _hoisted_691 = {
  class: "audio-player-queue-item-actions"
};
const _hoisted_692 = ["onClick"];
const _hoisted_693 = ["onClick"];
const _hoisted_694 = {
  key: 1,
  class: "audio-player-queue-item-actions"
};
const _hoisted_695 = ["aria-valuenow", "aria-valuetext"];
const _hoisted_696 = {
  class: "audio-visualizer",
  ref: "visualizer"
};
const _hoisted_697 = {
  key: 1,
  class: "ayah-scrollbar",
  role: "group",
  "aria-label": "Surah verse navigator"
};
const _hoisted_698 = ["max", "value", "aria-valuemax", "aria-valuenow", "aria-valuetext"];
const _hoisted_699 = {
  class: "ayah-scrollbar-count"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _ctx$continueProgress, _ctx$continueProgress2, _ctx$continueProgress3, _ctx$continueProgress4, _ctx$surahDetails16, _ctx$audioElements$_c, _ctx$audioElements$_c2;
  const _component_bookmark_modal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("bookmark-modal");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["container surat-premium", {
      'has-audio-player': _ctx.bottomAudioPlayerEnabled && _ctx.showAudioPlayer && !_ctx.isSingleWordPreviewActive,
      'has-sidebar': true,
      'sidebar-collapsed': _ctx.sidebarCollapsed,
      'mobile-toolbar-pinned': _ctx.isTabletOrMobile && _ctx.isToolbarPinned,
      'mobile-toolbar-expanded': _ctx.isTabletOrMobile && _ctx.isToolbarPinned && _ctx.isMobileToolbarExpanded,
      'mobile-compact-layout': _ctx.isTabletOrMobile,
      'reading-fullscreen': _ctx.isReadingFullscreen,
      'deep-focus-mode': _ctx.isDeepFocusMode,
      'blur-next-ayah-enabled': _ctx.isBlurNextAyahEnabled,
      'memorisation-mode': _ctx.isMemorisationMode
    }]),
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(_ctx.quranFontStyle),
    role: "main",
    "aria-label": "Quran Explorer"
  }, [_cache[516] || (_cache[516] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row justify-content-center text-center mb-3 reading-fullscreen-chrome quran-reader-hero"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-10 col-xl-10"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "display-5 fw-bold"
  }, "The Holy Quran"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "holy-book-description mb-0"
  }, "Explore the Holy Quran with clear recitations, trusted translations, and practical tools that help you read with focus, listen with understanding, and reflect on each ayah in your daily life.")])], -1 /* CACHED */)), _ctx.continueProgress || _ctx.desktopSurahContext.englishName || _ctx.desktopSurahContext.arabicName ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_ctx.continueProgress && !_ctx.continueProgressHidden ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", ((_ctx$continueProgress = _ctx.continueProgress) === null || _ctx$continueProgress === void 0 ? void 0 : _ctx$continueProgress.mode) === 'listening' ? 'bi-headphones' : 'bi-book-half'])
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[219] || (_cache[219] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "continue-progress-banner-eyebrow"
  }, "Continue", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(((_ctx$continueProgress2 = _ctx.continueProgress) === null || _ctx$continueProgress2 === void 0 ? void 0 : _ctx$continueProgress2.mode) === "listening" ? "Listening" : "Reading"), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, " Surah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$continueProgress3 = _ctx.continueProgress) === null || _ctx$continueProgress3 === void 0 ? void 0 : _ctx$continueProgress3.surahNumber) + " · " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.getContinueProgressSurahName()) + " · Ayah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$continueProgress4 = _ctx.continueProgress) === null || _ctx$continueProgress4 === void 0 ? void 0 : _ctx$continueProgress4.ayahNumber), 1 /* TEXT */), _cache[220] || (_cache[220] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "continue-progress-banner-subtitle"
  }, " Jump back exactly where you paused. ", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn continue-progress-banner-btn",
    onClick: _cache[0] || (_cache[0] = $event => {
      var _ctx$continueProgress5;
      return _ctx.resumeContinueProgress({
        autoplay: ((_ctx$continueProgress5 = _ctx.continueProgress) === null || _ctx$continueProgress5 === void 0 ? void 0 : _ctx$continueProgress5.mode) === 'listening'
      });
    })
  }, " Resume now "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn continue-progress-banner-btn-secondary",
    onClick: _cache[1] || (_cache[1] = $event => _ctx.hideContinueProgressBanner())
  }, " Hide ")])])) : _ctx.continueProgress && _ctx.continueProgressHidden ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn continue-progress-restore-btn",
    onClick: _cache[2] || (_cache[2] = $event => _ctx.showContinueProgressBanner())
  }, " Show continue card ")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_ctx.desktopSurahContext.englishName || _ctx.desktopSurahContext.arabicName ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_ctx.desktopSurahContext.arabicName ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.desktopSurahContext.arabicName), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_17, [_ctx.desktopSurahContext.number ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.desktopSurahContext.number) + ". ", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.desktopSurahContext.englishName), 1 /* TEXT */)]), _ctx.desktopSurahContext.translationName ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.desktopSurahContext.translationName), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_ctx.bookmarkToast ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [_cache[221] || (_cache[221] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check-circle-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.bookmarkToast), 1 /* TEXT */)]), _ctx.bookmarkToastAction && _ctx.bookmarkToastAction.text ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: 0,
      type: "button",
      class: "btn btn-sm btn-light mode-toggle-toast-action",
      onClick: _cache[3] || (_cache[3] = (...args) => _ctx.handleBookmarkToastAction && _ctx.handleBookmarkToastAction(...args))
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.bookmarkToastAction.text), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["advanced-quran-search ltr-text", {
      'is-panel-hidden': !_ctx.isAdvancedSearchPanelVisible,
      'is-search-hidden': !_ctx.isAdvancedSearchVisible
    }]),
    role: "search",
    "aria-label": "Advanced Quran search"
  }, [_ctx.isAdvancedSearchVisible && !(_ctx.isDeepFocusMode && _ctx.isTabletOrMobile) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_25, [_cache[223] || (_cache[223] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "advanced-quran-search-head"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "advanced-quran-search-title mb-0"
  }, "Search Quran"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "advanced-quran-search-subtitle mb-0"
  }, " Ayah matches with translation. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-link advanced-quran-search-visibility-btn advanced-quran-search-top-pill",
    "aria-expanded": _ctx.isAdvancedSearchVisible ? 'true' : 'false',
    "aria-controls": "advancedQuranSearchSection",
    onClick: _cache[4] || (_cache[4] = (...args) => _ctx.toggleAdvancedSearchVisibility && _ctx.toggleAdvancedSearchVisibility(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isAdvancedSearchVisible ? 'bi-eye-slash' : 'bi-eye']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isAdvancedSearchVisible ? "Hide search" : "Show search"), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_28)]), _ctx.isAdvancedSearchVisible && _ctx.isAdvancedSearchPanelVisible && _ctx.hasAdvancedSearchPanelContent ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn btn-link advanced-quran-search-close-panel",
    onClick: _cache[5] || (_cache[5] = (...args) => _ctx.closeAdvancedSearchPanel && _ctx.closeAdvancedSearchPanel(...args)),
    "aria-label": "Close and clear search results panel"
  }, [...(_cache[222] || (_cache[222] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !(_ctx.isDeepFocusMode && _ctx.isTabletOrMobile) && _ctx.isAdvancedSearchVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_29, [_cache[225] || (_cache[225] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search advanced-quran-search-icon",
    "aria-hidden": "true",
    style: {
      "display": "none"
    }
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "search",
    class: "form-control advanced-quran-search-input",
    ref: "advancedSearchInput",
    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => _ctx.advancedSearchQuery = $event),
    placeholder: "Search across all ayahs...",
    "aria-label": "Search across all Quran verses",
    onKeydown: [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.runAdvancedSearch({
      force: true
    }), ["prevent"]), ["enter"])), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.clearAdvancedSearch(), ["prevent"]), ["esc"]))]
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.advancedSearchQuery]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [_ctx.speechRecognitionSupported ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn btn-link advanced-quran-search-voice", {
      'is-listening': _ctx.speechRecognitionListening
    }]),
    onClick: _cache[9] || (_cache[9] = (...args) => _ctx.toggleVoiceSearch && _ctx.toggleVoiceSearch(...args)),
    "aria-label": _ctx.speechRecognitionListening ? 'Stop voice search' : 'Start voice search'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.speechRecognitionListening ? 'bi-mic-fill' : 'bi-mic']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_31)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.advancedSearchQuery ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 1,
    type: "button",
    class: "btn btn-link advanced-quran-search-clear",
    onClick: _cache[10] || (_cache[10] = $event => _ctx.clearAdvancedSearch()),
    "aria-label": "Clear advanced search"
  }, [...(_cache[224] || (_cache[224] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-circle",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "advanced-quran-search-clear-text"
  }, "Clear", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.isTabletOrMobile && _ctx.isDeepFocusMode ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn advanced-quran-mobile-action-btn advanced-quran-mobile-action-btn-deep-focus", {
      'is-enabled': _ctx.isDeepFocusMode
    }]),
    onClick: _cache[11] || (_cache[11] = (...args) => _ctx.toggleDeepFocusMode && _ctx.toggleDeepFocusMode(...args)),
    "aria-label": _ctx.isDeepFocusMode ? 'Turn deep focus mode off' : 'Turn deep focus mode on',
    title: _ctx.isDeepFocusMode ? 'Turn deep focus mode off' : 'Turn deep focus mode on'
  }, [_cache[226] || (_cache[226] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bullseye",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), _cache[227] || (_cache[227] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "advanced-quran-mobile-action-label"
  }, "Deep focus mode", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isDeepFocusMode ? "On" : "Off"), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_33)])) : _ctx.isTabletOrMobile ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 3,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["advanced-quran-mobile-controls border-shadow-xl", {
      'is-pinned': _ctx.isToolbarPinned,
      'is-expanded': _ctx.isMobileToolbarExpanded
    }]),
    role: "group",
    "aria-label": "Surah quick controls"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["advanced-quran-mobile-main-row", {
      'has-search-toggle': !_ctx.isAdvancedSearchVisible
    }])
  }, [_cache[230] || (_cache[230] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "visually-hidden",
    for: "searchSurahDropdown"
  }, " Select surah ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "searchSurahDropdown",
    class: "form-select advanced-quran-mobile-surah-select",
    "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => _ctx.selectedSurah = $event),
    onChange: _cache[13] || (_cache[13] = $event => _ctx.selectSurah(_ctx.selectedSurah)),
    "aria-label": "Select surah"
  }, [!_ctx.surahs.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", _hoisted_35, "Loading surahs...")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.surahs, surah => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: surah.number,
      value: String(surah.number)
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.number) + ". " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.englishName), 9 /* TEXT, PROPS */, _hoisted_36);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedSurah]]),  false ? (0) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn advanced-quran-mobile-icon-btn",
    "data-bs-toggle": "modal",
    "data-bs-target": "#surahSettingsModal",
    onClick: _cache[15] || (_cache[15] = (...args) => _ctx.prepareSettingsDraft && _ctx.prepareSettingsDraft(...args)),
    "aria-label": "Open display settings",
    title: "Display settings"
  }, [...(_cache[229] || (_cache[229] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-gear",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn advanced-quran-mobile-icon-btn advanced-quran-mobile-expand-btn",
    "aria-expanded": _ctx.isMobileToolbarExpanded ? 'true' : 'false',
    "aria-controls": "advancedQuranMobileExpandedControls",
    "aria-label": _ctx.isMobileToolbarExpanded ? 'Collapse more toolbar controls' : 'Expand more toolbar controls',
    title: _ctx.isMobileToolbarExpanded ? 'Collapse controls' : 'More controls',
    onClick: _cache[16] || (_cache[16] = (...args) => _ctx.toggleMobileToolbarExpanded && _ctx.toggleMobileToolbarExpanded(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isMobileToolbarExpanded ? 'bi-chevron-up' : 'bi-chevron-down']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_37)], 2 /* CLASS */), _ctx.isMobileToolbarExpanded ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_38, [_cache[251] || (_cache[251] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "advanced-quran-mobile-label-row d-flex align-items-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "quran-toolbar-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Reader Controls")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "quran-toolbar-separator"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [_cache[232] || (_cache[232] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "visually-hidden",
    for: "mobileToolbarReciterSelect"
  }, " Select audio reciter ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "mobileToolbarReciterSelect",
    class: "form-select advanced-quran-mobile-select",
    "onUpdate:modelValue": _cache[17] || (_cache[17] = $event => _ctx.selectedReciter = $event),
    "aria-label": "Select audio reciter"
  }, [_cache[231] || (_cache[231] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select reciter", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.recitersSorted, reciter => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: reciter.identifier,
      value: reciter.identifier
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reciter.englishName), 9 /* TEXT, PROPS */, _hoisted_41);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedReciter]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn advanced-quran-mobile-action-btn advanced-quran-mobile-action-btn-toggle", {
      'is-enabled': _ctx.isTranslationAllEnabled
    }]),
    onClick: _cache[18] || (_cache[18] = (...args) => _ctx.toggleToolbarTranslation && _ctx.toggleToolbarTranslation(...args)),
    title: _ctx.isTranslationAllEnabled ? 'Turn translation off for all visible ayahs.' : 'Turn translation on for all visible ayahs.',
    "aria-label": _ctx.isTranslationAllEnabled ? 'Turn translation off for all ayahs' : 'Turn translation on for all ayahs'
  }, [_cache[233] || (_cache[233] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-translate",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), _cache[234] || (_cache[234] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "advanced-quran-mobile-action-label"
  }, "Translation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_44, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isTranslationAllEnabled ? "On" : "Off"), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_43), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn advanced-quran-mobile-action-btn advanced-quran-mobile-action-btn-toggle", {
      'is-enabled': _ctx.isTransliterationAllEnabled
    }]),
    onClick: _cache[19] || (_cache[19] = (...args) => _ctx.toggleToolbarTransliteration && _ctx.toggleToolbarTransliteration(...args)),
    title: _ctx.isTransliterationAllEnabled ? 'Turn transliteration off for all visible ayahs.' : 'Turn transliteration on for all visible ayahs.',
    "aria-label": _ctx.isTransliterationAllEnabled ? 'Turn transliteration off for all ayahs' : 'Turn transliteration on for all ayahs'
  }, [_cache[235] || (_cache[235] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-input-cursor-text",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), _cache[236] || (_cache[236] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "advanced-quran-mobile-action-label"
  }, "Transliteration", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_46, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isTransliterationAllEnabled ? "On" : "Off"), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_45), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn advanced-quran-mobile-action-btn advanced-quran-mobile-action-btn-toggle", {
      'is-enabled': _ctx.voiceCommandsEnabled
    }]),
    onClick: _cache[20] || (_cache[20] = (...args) => _ctx.toggleVoiceCommands && _ctx.toggleVoiceCommands(...args)),
    disabled: !_ctx.speechRecognitionSupported,
    title: !_ctx.speechRecognitionSupported ? 'Voice commands are not supported in this browser.' : _ctx.voiceCommandsEnabled ? 'Voice commands are on. Try saying: play verse 5.' : 'Turn on voice commands. Example: play verse 5.',
    "aria-label": _ctx.voiceCommandsEnabled ? 'Turn voice commands off' : 'Turn voice commands on'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.voiceCommandsEnabled ? _ctx.voiceCommandListening ? 'bi-mic-fill' : 'bi-mic' : 'bi-mic-mute-fill']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */), _cache[237] || (_cache[237] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "advanced-quran-mobile-action-label"
  }, "Voice commands", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_48, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.voiceCommandsEnabled ? "On" : "Off"), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_47), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn advanced-quran-mobile-action-btn voice-command-guide-control-btn",
    "data-bs-toggle": "modal",
    "data-bs-target": `#${_ctx.voiceCommandGuideModalId}`,
    "aria-label": "Open voice command guide",
    title: "Open voice command guide"
  }, [...(_cache[238] || (_cache[238] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-question-circle",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "advanced-quran-mobile-action-label"
  }, "Voice guide", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_49)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn advanced-quran-mobile-action-btn advanced-quran-mobile-action-btn-memorisation", {
      'is-active': _ctx.isMemorisationToolbarVisible
    }]),
    onClick: _cache[21] || (_cache[21] = (...args) => _ctx.toggleMemorisationToolbar && _ctx.toggleMemorisationToolbar(...args)),
    "aria-label": "Open memorisation tools",
    title: "Open memorisation tools to support repetition, focus, and revision."
  }, [_cache[239] || (_cache[239] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journal-bookmark-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_51, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isMemorisationToolbarVisible ? 'Close Memorisation Tools' : 'Memorisation Tools'), 1 /* TEXT */)], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn advanced-quran-mobile-action-btn",
    onClick: _cache[22] || (_cache[22] = (...args) => _ctx.toggleCustomPlaylistPanel && _ctx.toggleCustomPlaylistPanel(...args)),
    "aria-expanded": _ctx.showCustomPlaylistPanel ? 'true' : 'false',
    "aria-label": _ctx.showCustomPlaylistPanel ? 'Close custom playlist library' : 'Open custom playlist library',
    title: _ctx.showCustomPlaylistPanel ? 'Close playlist library' : 'Open playlist library'
  }, [_cache[240] || (_cache[240] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-music-note-list",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_53, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.showCustomPlaylistPanel ? 'Close playlist' : 'Playlist'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_52), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn advanced-quran-mobile-action-btn",
    onClick: _cache[23] || (_cache[23] = $event => _ctx.openSurahInfo(_ctx.currentSurahInfo)),
    disabled: !_ctx.currentSurahInfo,
    "aria-label": "Open surah information",
    title: "Open surah information"
  }, [...(_cache[241] || (_cache[241] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-info-circle-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "advanced-quran-mobile-action-label"
  }, "Surah info", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_54), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn advanced-quran-mobile-action-btn",
    onClick: _cache[24] || (_cache[24] = (...args) => _ctx.openTranslationCompareModal && _ctx.openTranslationCompareModal(...args)),
    "aria-label": "Compare English translations side by side",
    title: "Compare multiple English translations side by side in one view."
  }, [...(_cache[242] || (_cache[242] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-columns-gap",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "advanced-quran-mobile-action-label"
  }, "Compare translations", -1 /* CACHED */)]))]), _ctx.showTajweed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", _hoisted_55, [...(_cache[243] || (_cache[243] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-palette-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "advanced-quran-mobile-action-label"
  }, "Tajweed rules", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn advanced-quran-mobile-action-btn",
    onClick: _cache[25] || (_cache[25] = (...args) => _ctx.toggleDeepFocusMode && _ctx.toggleDeepFocusMode(...args)),
    "aria-label": "Toggle deep focus mode",
    title: "Toggle deep focus mode"
  }, [_cache[244] || (_cache[244] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bullseye",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), _cache[245] || (_cache[245] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "advanced-quran-mobile-action-label"
  }, "Deep focus mode", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_56, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isDeepFocusMode ? "On" : "Off"), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn advanced-quran-mobile-action-btn",
    onClick: _cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => _ctx.openFontPicker && _ctx.openFontPicker(...args), ["stop"])),
    "aria-label": "Choose Quranic fonts",
    title: "Open Quran font options to change how Arabic text is displayed."
  }, [...(_cache[246] || (_cache[246] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-font",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "advanced-quran-mobile-action-label"
  }, "Font", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn advanced-quran-mobile-action-btn",
    onClick: _cache[27] || (_cache[27] = (...args) => _ctx.openGestureGuideModal && _ctx.openGestureGuideModal(...args)),
    "aria-label": "Open swipe and tap gestures guide",
    title: "Open swipe and tap gestures guide"
  }, [...(_cache[247] || (_cache[247] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-hand-index-thumb-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "advanced-quran-mobile-action-label"
  }, "Gestures", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn advanced-quran-mobile-action-btn",
    onClick: _cache[28] || (_cache[28] = (...args) => _ctx.openSuratOnboarding && _ctx.openSuratOnboarding(...args)),
    "aria-label": "Open surat onboarding guide",
    title: "Open onboarding guide"
  }, [...(_cache[248] || (_cache[248] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-compass",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "advanced-quran-mobile-action-label"
  }, "Guide", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn advanced-quran-mobile-action-btn advanced-quran-mobile-action-btn-download", {
      'is-downloaded': _ctx.isSurahAudioDownloaded
    }]),
    onClick: _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.downloadSurahAudio(), ["stop"])),
    disabled: _ctx.isSurahAudioDownloading || !_ctx.canDownloadSurahAudio(),
    "aria-label": !_ctx.canDownloadSurahAudio() ? 'Full surah download unavailable for this reciter' : _ctx.isSurahAudioDownloading ? 'Downloading full surah MP3' : _ctx.isSurahAudioDownloaded ? 'Surah MP3 downloaded' : _ctx.surahDownloadReadyAriaLabel,
    title: !_ctx.canDownloadSurahAudio() ? 'This reciter does not provide a full-surah MP3 file for download.' : _ctx.isSurahAudioDownloading ? 'Downloading the full surah MP3 to your device for offline listening.' : _ctx.isSurahAudioDownloaded ? 'The full surah MP3 is already downloaded. Click to download it again.' : _ctx.surahDownloadReadyLabel
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi advanced-quran-mobile-download-icon", _ctx.isSurahAudioDownloading ? 'bi-arrow-repeat ic-spin' : _ctx.isSurahAudioDownloaded ? 'bi-check-circle-fill' : 'bi-cloud-arrow-down-fill']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */), _cache[249] || (_cache[249] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "advanced-quran-mobile-action-label"
  }, "Download", -1 /* CACHED */))], 10 /* CLASS, PROPS */, _hoisted_57), _ctx.hasPinnedAyahs && _ctx.isPinnedSectionHidden ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 1,
    type: "button",
    class: "btn advanced-quran-mobile-action-btn",
    onClick: _cache[30] || (_cache[30] = (...args) => _ctx.showPinnedSection && _ctx.showPinnedSection(...args)),
    "aria-label": "Show pinned favourite ayat",
    title: "Show pinned favourite ayat"
  }, [...(_cache[250] || (_cache[250] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-pin-angle-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "advanced-quran-mobile-action-label"
  }, "Pins", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.isAdvancedSearchVisible && _ctx.isAdvancedSearchPanelVisible && !(_ctx.isDeepFocusMode && _ctx.isTabletOrMobile) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_58, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [_ctx.advancedSearchLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_60, " Searching ayahs... ")) : _ctx.advancedSearchError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_61, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.advancedSearchError), 1 /* TEXT */)) : _ctx.hasAdvancedSearchQuery && _ctx.hasAdvancedSearchResults ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Showing " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.advancedSearchResults.length) + " of " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.advancedSearchTotalMatches) + " matches across " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.advancedSearchMatchedSurahCount) + " surahs. ", 1 /* TEXT */), _ctx.isAdvancedSearchResultCapReached ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_63, " Refine your query to view fewer matches. ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : _ctx.hasAdvancedSearchQuery && !_ctx.advancedSearchLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_64, " No matches found for \"" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.advancedSearchTrimmedQuery) + "\". ", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _ctx.speechRecognitionError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_65, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.speechRecognitionError), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.hasAdvancedSearchResults ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_66, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.advancedSearchGroupedResults, group => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", {
      key: `advanced-surah-${group.surahNumber}`,
      class: "advanced-quran-search-surah-group",
      role: "listitem"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_69, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(group.surahNumber), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_70, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(group.surahEnglishName), 1 /* TEXT */), group.surahArabicName ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_71, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(group.surahArabicName), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_72, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(group.results.length) + " match" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(group.results.length === 1 ? "" : "es"), 1 /* TEXT */)]), group.results.length > _ctx.advancedSearchSurahPreviewLimit ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: 0,
      type: "button",
      class: "btn btn-sm advanced-quran-search-expand-surah",
      onClick: $event => _ctx.toggleAdvancedSearchSurahExpansion(group.surahNumber),
      "aria-expanded": _ctx.isAdvancedSearchSurahExpanded(group.surahNumber) ? 'true' : 'false'
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isAdvancedSearchSurahExpanded(group.surahNumber) ? "Collapse" : "Expand (" + group.results.length + ")"), 9 /* TEXT, PROPS */, _hoisted_73)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.getVisibleAdvancedSearchMatchesForSurah(group), result => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
        key: result.key,
        class: "advanced-quran-search-result"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_74, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_75, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_76, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(result.surahNumber) + ":" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(result.ayahNumber), 1 /* TEXT */), result.page ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_77, " Page " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(result.page), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), result.juz ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_78, " Juz " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(result.juz), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        type: "button",
        class: "btn btn-sm advanced-quran-search-open",
        onClick: $event => _ctx.openAdvancedSearchResult(result),
        "aria-label": `Open Surah ${result.surahNumber}, Ayah ${result.ayahNumber}`
      }, [...(_cache[252] || (_cache[252] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-box-arrow-up-right me-1",
        "aria-hidden": "true"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Open ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_79)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
        class: "advanced-quran-search-arabic mb-2",
        innerHTML: _ctx.highlightAdvancedSearchText(result.text)
      }, null, 8 /* PROPS */, _hoisted_80), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_81, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_82, [_cache[253] || (_cache[253] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "advanced-quran-search-detail-label"
      }, "Translation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
        class: "advanced-quran-search-translation mb-0",
        innerHTML: _ctx.highlightAdvancedSearchText(result.translation)
      }, null, 8 /* PROPS */, _hoisted_83)])])]);
    }), 128 /* KEYED_FRAGMENT */))]);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */)])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isAdvancedSearchVisible || _ctx.isTabletOrMobile]]), (_ctx.surahDetails || _ctx.currentSurahInfo) && (!_ctx.isTabletOrMobile && (_ctx.showDesktopToolbar || _ctx.showDesktopSurahContext) || _ctx.isTabletOrMobile && _ctx.showCustomPlaylistPanel) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 1,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["quran-toolbar-sticky ltr-text", {
      'quran-toolbar-fixed-shell': _ctx.showDesktopToolbar && !_ctx.isTabletOrMobile,
      'is-pinned': _ctx.showDesktopToolbar && _ctx.isToolbarPinned && !_ctx.isTabletOrMobile,
      'is-mobile-playlist-shell': _ctx.isTabletOrMobile && _ctx.showCustomPlaylistPanel
    }]),
    role: "region",
    "aria-label": "Quran quick controls"
  }, [_ctx.showDesktopToolbar && !_ctx.isTabletOrMobile ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_84, [_cache[274] || (_cache[274] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "quran-toolbar-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Reader Controls")], -1 /* CACHED */)), _cache[275] || (_cache[275] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "quran-toolbar-separator"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["quran-toolbar-btn quran-toolbar-btn-memorisation", {
      'is-active': _ctx.isMemorisationToolbarVisible,
      'is-attention': !_ctx.isMemorisationToolbarVisible
    }]),
    onClick: _cache[31] || (_cache[31] = (...args) => _ctx.toggleMemorisationToolbar && _ctx.toggleMemorisationToolbar(...args)),
    "aria-label": "Open memorisation tools",
    title: "Open memorisation tools to support repetition, focus, and revision."
  }, [_cache[254] || (_cache[254] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journal-bookmark-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_85, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isMemorisationToolbarVisible ? 'Close Memorisation Tools' : 'Memorisation Tools'), 1 /* TEXT */)], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_86, [_cache[256] || (_cache[256] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "visually-hidden",
    for: "toolbarReciterSelect"
  }, " Select audio reciter ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "toolbarReciterSelect",
    class: "form-select quran-toolbar-select",
    "onUpdate:modelValue": _cache[32] || (_cache[32] = $event => _ctx.selectedReciter = $event),
    title: "Choose which reciter's voice will be used for the surah audio.",
    "aria-label": "Select audio reciter"
  }, [_cache[255] || (_cache[255] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select reciter", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.recitersSorted, reciter => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: reciter.identifier,
      value: reciter.identifier
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reciter.englishName), 9 /* TEXT, PROPS */, _hoisted_87);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedReciter]])]), _ctx.showTajweed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", _hoisted_88, [...(_cache[257] || (_cache[257] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-palette-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "quran-toolbar-btn-text"
  }, "Tajweed rules", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["quran-toolbar-btn quran-toolbar-btn-toggle", {
      'is-enabled': _ctx.isTranslationAllEnabled
    }]),
    onClick: _cache[33] || (_cache[33] = (...args) => _ctx.toggleToolbarTranslation && _ctx.toggleToolbarTranslation(...args)),
    title: _ctx.isTranslationAllEnabled ? 'Turn translation off for all visible ayahs.' : 'Turn translation on for all visible ayahs.',
    "aria-label": _ctx.isTranslationAllEnabled ? 'Turn translation off for all ayahs' : 'Turn translation on for all ayahs'
  }, [_cache[258] || (_cache[258] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-translate",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), _cache[259] || (_cache[259] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "quran-toolbar-btn-text"
  }, "Translation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_90, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isTranslationAllEnabled ? "On" : "Off"), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_89), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["quran-toolbar-btn quran-toolbar-btn-toggle", {
      'is-enabled': _ctx.isTransliterationAllEnabled
    }]),
    onClick: _cache[34] || (_cache[34] = (...args) => _ctx.toggleToolbarTransliteration && _ctx.toggleToolbarTransliteration(...args)),
    title: _ctx.isTransliterationAllEnabled ? 'Turn transliteration off for all visible ayahs.' : 'Turn transliteration on for all visible ayahs.',
    "aria-label": _ctx.isTransliterationAllEnabled ? 'Turn transliteration off for all ayahs' : 'Turn transliteration on for all ayahs'
  }, [_cache[260] || (_cache[260] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-input-cursor-text",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), _cache[261] || (_cache[261] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "quran-toolbar-btn-text"
  }, "Transliteration", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_92, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isTransliterationAllEnabled ? "On" : "Off"), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_91), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["quran-toolbar-btn quran-toolbar-btn-toggle", {
      'is-enabled': _ctx.voiceCommandsEnabled
    }]),
    onClick: _cache[35] || (_cache[35] = (...args) => _ctx.toggleVoiceCommands && _ctx.toggleVoiceCommands(...args)),
    disabled: !_ctx.speechRecognitionSupported,
    title: !_ctx.speechRecognitionSupported ? 'Voice commands are not supported in this browser.' : _ctx.voiceCommandsEnabled ? 'Voice commands are on. Try saying: play verse 5.' : 'Turn on voice commands. Example: play verse 5.',
    "aria-label": _ctx.voiceCommandsEnabled ? 'Turn voice commands off' : 'Turn voice commands on'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.voiceCommandsEnabled ? _ctx.voiceCommandListening ? 'bi-mic-fill' : 'bi-mic' : 'bi-mic-mute-fill']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */), _cache[262] || (_cache[262] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "quran-toolbar-btn-text"
  }, "Voice commands", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_94, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.voiceCommandsEnabled ? "On" : "Off"), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_93), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "quran-toolbar-btn voice-command-guide-control-btn",
    "data-bs-toggle": "modal",
    "data-bs-target": `#${_ctx.voiceCommandGuideModalId}`,
    "aria-label": "Open voice command guide",
    title: "Open voice command guide with all supported phrases."
  }, [...(_cache[263] || (_cache[263] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-question-circle",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "quran-toolbar-btn-text"
  }, "Voice guide", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_95), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "quran-toolbar-btn",
    onClick: _cache[36] || (_cache[36] = (...args) => _ctx.openTranslationCompareModal && _ctx.openTranslationCompareModal(...args)),
    "aria-label": "Compare English translations side by side",
    title: "Compare multiple English translations side by side in one view."
  }, [...(_cache[264] || (_cache[264] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-columns-gap",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "quran-toolbar-btn-text"
  }, "Compare translations", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["quran-toolbar-btn quran-toolbar-btn-deep-focus", {
      'is-active': _ctx.isDeepFocusMode
    }]),
    onClick: _cache[37] || (_cache[37] = (...args) => _ctx.toggleDeepFocusMode && _ctx.toggleDeepFocusMode(...args)),
    "aria-label": _ctx.isDeepFocusMode ? 'Exit deep focus mode' : 'Enter deep focus mode',
    title: _ctx.isDeepFocusMode ? 'Exit deep focus mode and restore tools' : 'Enter deep focus mode for distraction-free reading'
  }, [_cache[265] || (_cache[265] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bullseye",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), _cache[266] || (_cache[266] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "quran-toolbar-btn-text"
  }, "Deep focus mode", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_97, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isDeepFocusMode ? "On" : "Off"), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_96), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "quran-toolbar-btn",
    onClick: _cache[38] || (_cache[38] = (...args) => _ctx.toggleCustomPlaylistPanel && _ctx.toggleCustomPlaylistPanel(...args)),
    "aria-expanded": _ctx.showCustomPlaylistPanel ? 'true' : 'false',
    "aria-label": "Open custom playlist library",
    title: "Open custom playlist library"
  }, [...(_cache[267] || (_cache[267] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-music-note-list",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "quran-toolbar-btn-text"
  }, "Playlist", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_98), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button\n                    v-if=\"!isAdvancedSearchVisible && !isTabletOrMobile\"\n                    type=\"button\"\n                    class=\"quran-toolbar-btn quran-toolbar-btn-search-toggle quran-toolbar-btn-icon\"\n                    @click=\"toggleAdvancedSearchVisibility\"\n                    aria-label=\"Show search\"\n                    title=\"Show search\">\n                    <i class=\"fas fa-magnifying-glass quran-toolbar-search-icon\" aria-hidden=\"true\"></i>\n                </button> "), !_ctx.isTabletOrMobile ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 1,
    ref: "readingFullscreenToggleButton",
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["quran-toolbar-btn quran-toolbar-btn-fullscreen quran-toolbar-btn-icon", {
      'is-active': _ctx.isReadingFullscreen
    }]),
    onClick: _cache[39] || (_cache[39] = (...args) => _ctx.toggleReadingFullscreen && _ctx.toggleReadingFullscreen(...args)),
    "aria-label": _ctx.isReadingFullscreen ? 'Minimize / Exit Full Screen' : 'Enter full screen Quran reading mode',
    title: _ctx.isReadingFullscreen ? 'Minimize / Exit Full Screen' : 'Enter full screen Quran reading mode'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isReadingFullscreen ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_99)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "quran-toolbar-btn quran-toolbar-btn-icon quran-toolbar-btn-font",
    onClick: _cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => _ctx.openFontPicker && _ctx.openFontPicker(...args), ["stop"])),
    "aria-label": "Choose Quranic fonts",
    title: "Open Quran font options to change how Arabic text is displayed."
  }, [...(_cache[268] || (_cache[268] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-font",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))]), _ctx.hasPinnedAyahs && _ctx.isPinnedSectionHidden ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 2,
    type: "button",
    class: "quran-toolbar-btn quran-toolbar-btn-icon quran-toolbar-btn-pinned-restore",
    onClick: _cache[41] || (_cache[41] = (...args) => _ctx.showPinnedSection && _ctx.showPinnedSection(...args)),
    "aria-label": "Show pinned favourite ayat",
    title: "Show pinned favourite ayat"
  }, [...(_cache[269] || (_cache[269] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-pin-angle-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "quran-toolbar-btn quran-toolbar-btn-info quran-toolbar-btn-icon",
    onClick: _cache[42] || (_cache[42] = $event => _ctx.openSurahInfo(_ctx.currentSurahInfo)),
    disabled: !_ctx.currentSurahInfo,
    "aria-label": "Open surah information",
    title: "View this surah's details, including its name, origin, and total ayah count."
  }, [...(_cache[270] || (_cache[270] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-info-circle-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_100), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["quran-toolbar-btn quran-toolbar-btn-sm quran-toolbar-btn-download quran-toolbar-btn-download-size-only", {
      'is-downloaded': _ctx.isSurahAudioDownloaded
    }]),
    onClick: _cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.downloadSurahAudio(), ["stop"])),
    disabled: _ctx.isSurahAudioDownloading || !_ctx.canDownloadSurahAudio(),
    "aria-label": !_ctx.canDownloadSurahAudio() ? 'Full surah download unavailable for this reciter' : _ctx.isSurahAudioDownloading ? 'Downloading full surah MP3' : _ctx.isSurahAudioDownloaded ? 'Surah MP3 downloaded' : _ctx.surahDownloadReadyAriaLabel,
    title: !_ctx.canDownloadSurahAudio() ? 'This reciter does not provide a full-surah MP3 file for download.' : _ctx.isSurahAudioDownloading ? 'Downloading the full surah MP3 to your device for offline listening.' : _ctx.isSurahAudioDownloaded ? 'The full surah MP3 is already downloaded. Click to download it again.' : _ctx.surahDownloadReadyLabel
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi quran-toolbar-download-icon", _ctx.isSurahAudioDownloading ? 'bi-arrow-repeat ic-spin' : _ctx.isSurahAudioDownloaded ? 'bi-check-circle-fill' : 'bi-cloud-arrow-down-fill']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_101), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "quran-toolbar-btn quran-toolbar-btn-icon quran-toolbar-btn-onboarding",
    onClick: _cache[44] || (_cache[44] = (...args) => _ctx.openSuratOnboarding && _ctx.openSuratOnboarding(...args)),
    "aria-label": "Open surat onboarding guide",
    title: "Open onboarding guide"
  }, [...(_cache[271] || (_cache[271] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-compass",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "quran-toolbar-btn quran-toolbar-btn-icon",
    onClick: _cache[45] || (_cache[45] = (...args) => _ctx.openGestureGuideModal && _ctx.openGestureGuideModal(...args)),
    "aria-label": "Open swipe and tap gestures guide",
    title: "Open swipe and tap gestures guide"
  }, [...(_cache[272] || (_cache[272] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-hand-index-thumb-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "quran-toolbar-btn quran-toolbar-btn-icon quran-toolbar-btn-settings",
    "data-bs-toggle": "modal",
    "data-bs-target": "#surahSettingsModal",
    onClick: _cache[46] || (_cache[46] = (...args) => _ctx.prepareSettingsDraft && _ctx.prepareSettingsDraft(...args)),
    "aria-label": "Open display settings",
    title: "Open reading and display settings such as layout, card style, and typography."
  }, [...(_cache[273] || (_cache[273] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-gear-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.showCustomPlaylistPanel ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_102, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_103, [_cache[277] || (_cache[277] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "reader-custom-playlist-header-copy"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "reader-custom-playlist-title-row"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "reader-custom-playlist-title mb-0"
  }, "Custom Playlist Library")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "reader-custom-playlist-subtitle mb-0"
  }, "Pick a playlist, then play or manage its items.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_104, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_105, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.selectedPlaylistItemCount) + " selected ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-close",
    onClick: _cache[47] || (_cache[47] = (...args) => _ctx.toggleCustomPlaylistPanel && _ctx.toggleCustomPlaylistPanel(...args)),
    "aria-label": "Close custom playlist panel",
    title: "Close playlist"
  }, [...(_cache[276] || (_cache[276] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_106, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("aside", _hoisted_107, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_108, [_cache[279] || (_cache[279] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "reader-custom-playlist-field-label mb-0"
  }, "Playlists", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn is-add-surah reader-custom-playlist-nav-add",
    onClick: _cache[48] || (_cache[48] = $event => _ctx.openCreatePlaylistModal())
  }, [...(_cache[278] || (_cache[278] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-circle",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" New playlist ", -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_109, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_110, [_cache[281] || (_cache[281] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search reader-custom-playlist-search-icon",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[49] || (_cache[49] = $event => _ctx.playlistSearchQuery = $event),
    type: "search",
    class: "form-control reader-custom-playlist-search-input",
    placeholder: "Search playlists",
    "aria-label": "Search playlists"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.playlistSearchQuery, void 0, {
    trim: true
  }]]), _ctx.playlistSearchQuery ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "reader-custom-playlist-search-clear",
    onClick: _cache[50] || (_cache[50] = $event => _ctx.playlistSearchQuery = ''),
    "aria-label": "Clear playlist search"
  }, [...(_cache[280] || (_cache[280] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_111, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.filteredCustomPlaylists, playlist => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: `playlist-pill-${playlist.id}`,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["reader-custom-playlist-nav-item", {
        'is-active': String(_ctx.activePlaylistId) === String(playlist.id)
      }]),
      "aria-selected": String(_ctx.activePlaylistId) === String(playlist.id) ? 'true' : 'false',
      onClick: $event => _ctx.selectPlaylist(playlist.id)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_113, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "reader-custom-playlist-nav-item-accent",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        backgroundColor: _ctx.getPlaylistAccentColor(playlist)
      }),
      "aria-hidden": "true"
    }, null, 4 /* STYLE */), _cache[282] || (_cache[282] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-music-note-list reader-custom-playlist-nav-item-icon",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_114, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(playlist.name || "Untitled Playlist"), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_115, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Array.isArray(playlist.items) ? playlist.items.length : 0), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_112);
  }), 128 /* KEYED_FRAGMENT */)), !_ctx.filteredCustomPlaylists.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_116, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.playlistSearchQuery ? "No playlists match your search." : "No playlists yet."), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), _ctx.activePlaylist ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_117, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_118, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_119, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_120, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.activePlaylist.name || "Untitled Playlist"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_121, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.customPlaylistItemCount) + " ayah" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.customPlaylistItemCount === 1 ? "" : "s"), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_122, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.activePlaylistSubtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_123, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn",
    disabled: !_ctx.activePlaylist,
    onClick: _cache[51] || (_cache[51] = (...args) => _ctx.togglePlaylistEditor && _ctx.togglePlaylistEditor(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isPlaylistEditorVisible ? 'bi-x-circle' : 'bi-pencil-square']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isPlaylistEditorVisible ? "Close edit" : "Edit playlist"), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_124), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn is-clear",
    disabled: !_ctx.hasAnyPlaylist,
    onClick: _cache[52] || (_cache[52] = (...args) => _ctx.removeActivePlaylist && _ctx.removeActivePlaylist(...args))
  }, [...(_cache[283] || (_cache[283] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-trash me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delete playlist ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_125)])]), _ctx.isPlaylistEditorVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_126, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_127, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_128, [_cache[284] || (_cache[284] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "reader-custom-playlist-field-label"
  }, "Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[53] || (_cache[53] = $event => _ctx.playlistEditorName = $event),
    type: "text",
    class: "form-control reader-custom-playlist-input",
    placeholder: "Type playlist name"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.playlistEditorName]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_129, [_cache[285] || (_cache[285] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "reader-custom-playlist-field-label"
  }, "Description", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[54] || (_cache[54] = $event => _ctx.playlistEditorDescription = $event),
    type: "text",
    class: "form-control reader-custom-playlist-input",
    placeholder: "Type short description"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.playlistEditorDescription]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_130, [_cache[288] || (_cache[288] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "reader-custom-playlist-field-label visually-hidden"
  }, "Save", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn is-play reader-custom-playlist-save-btn",
    disabled: !_ctx.activePlaylist || !_ctx.playlistEditorHasChanges,
    onClick: _cache[55] || (_cache[55] = (...args) => _ctx.saveAllPlaylistChanges && _ctx.saveAllPlaylistChanges(...args))
  }, [...(_cache[286] || (_cache[286] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check2-circle me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Save changes ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_131), _ctx.showPlaylistEditorConfirmAction ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "reader-custom-playlist-btn reader-custom-playlist-confirm-btn",
    onClick: _cache[56] || (_cache[56] = (...args) => _ctx.confirmPlaylistEditorChanges && _ctx.confirmPlaylistEditorChanges(...args))
  }, [...(_cache[287] || (_cache[287] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-patch-check me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Confirm ", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_132, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_133, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_134, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.customPlaylistItemCount) + " ayah" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.customPlaylistItemCount === 1 ? "" : "s"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_135, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.selectedPlaylistItemCount) + " selected", 1 /* TEXT */), _cache[289] || (_cache[289] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "reader-custom-playlist-bulk-status",
    role: "status",
    "aria-label": "Auto-save reorder is on"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-left-right",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Auto-save reorder: On ")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_136, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_137, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn reader-custom-playlist-icon-btn",
    onClick: _cache[57] || (_cache[57] = (...args) => _ctx.toggleAllActivePlaylistSelections && _ctx.toggleAllActivePlaylistSelections(...args)),
    "aria-label": _ctx.allActivePlaylistItemsSelected ? 'Clear all selected playlist items' : 'Select all playlist items',
    title: _ctx.allActivePlaylistItemsSelected ? 'Clear selection' : 'Select all'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.allActivePlaylistItemsSelected ? 'bi-x-square' : 'bi-check2-square']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_139, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.allActivePlaylistItemsSelected ? "Clear all" : "Select all"), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_138), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn reader-custom-playlist-icon-btn",
    onClick: _cache[58] || (_cache[58] = (...args) => _ctx.togglePlaylistAyahListCollapsed && _ctx.togglePlaylistAyahListCollapsed(...args)),
    "aria-label": _ctx.isPlaylistAyahListCollapsed ? 'Expand ayah list' : 'Collapse ayah list',
    title: _ctx.isPlaylistAyahListCollapsed ? 'Expand list' : 'Collapse list'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isPlaylistAyahListCollapsed ? 'bi-chevron-down' : 'bi-chevron-up']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_141, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isPlaylistAyahListCollapsed ? "Expand list" : "Collapse list"), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_140), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn is-remove reader-custom-playlist-icon-btn",
    disabled: !_ctx.hasSelectedPlaylistItems,
    onClick: _cache[59] || (_cache[59] = (...args) => _ctx.removeSelectedPlaylistItems && _ctx.removeSelectedPlaylistItems(...args)),
    "aria-label": "Delete selected playlist items",
    title: "Delete selected"
  }, [...(_cache[290] || (_cache[290] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-trash",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "reader-custom-playlist-tool-label"
  }, "Delete selected", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_142)])])]), !_ctx.customPlaylistAyahItems.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_143, [_cache[291] || (_cache[291] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-2"
  }, "No ayahs saved yet.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn is-add-surah",
    onClick: _cache[60] || (_cache[60] = (...args) => _ctx.closePlaylistAndBrowse && _ctx.closePlaylistAndBrowse(...args))
  }, " Browse to add ayahs ")])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 1
  }, [_ctx.customPlaylistAyahItems.length === 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_144, [_cache[293] || (_cache[293] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"reader-custom-playlist-guidance-art\" aria-hidden=\"true\" data-v-637d02d8><i class=\"bi bi-compass\" data-v-637d02d8></i></div><div class=\"reader-custom-playlist-guidance-copy\" data-v-637d02d8><h5 class=\"mb-1\" data-v-637d02d8>Build your flow</h5><p class=\"mb-0\" data-v-637d02d8>Add a few more ayahs to unlock smoother playback and easier reorder patterns.</p></div>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn is-add-surah reader-custom-playlist-guidance-btn",
    onClick: _cache[61] || (_cache[61] = (...args) => _ctx.closePlaylistAndBrowse && _ctx.closePlaylistAndBrowse(...args))
  }, [...(_cache[292] || (_cache[292] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-circle me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Add more ayahs ", -1 /* CACHED */)]))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_145, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_146, [_cache[295] || (_cache[295] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search reader-custom-playlist-search-icon",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[62] || (_cache[62] = $event => _ctx.playlistAyahSearchQuery = $event),
    type: "search",
    class: "form-control reader-custom-playlist-search-input",
    placeholder: "Search ayahs in this playlist",
    "aria-label": "Search ayahs in active playlist"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.playlistAyahSearchQuery, void 0, {
    trim: true
  }]]), _ctx.playlistAyahSearchQuery ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "reader-custom-playlist-search-clear",
    onClick: _cache[63] || (_cache[63] = $event => _ctx.playlistAyahSearchQuery = ''),
    "aria-label": "Clear ayah search"
  }, [...(_cache[294] || (_cache[294] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_147, [_cache[297] || (_cache[297] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "reader-custom-playlist-filter-label mb-0",
    for: "playlistAyahFilterMode"
  }, "Show", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "playlistAyahFilterMode",
    "onUpdate:modelValue": _cache[64] || (_cache[64] = $event => _ctx.playlistAyahFilterMode = $event),
    class: "form-select reader-custom-playlist-filter-select",
    "aria-label": "Show playlist ayahs by filter"
  }, [...(_cache[296] || (_cache[296] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "all"
  }, "All ayahs", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "selected"
  }, "Selected only", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "now-playing"
  }, "Now playing only", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.playlistAyahFilterMode]])])]), !_ctx.isPlaylistAyahListCollapsed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 1,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["reader-custom-playlist-list-scroll", {
      'is-scroll-limited': _ctx.shouldLimitPlaylistAyahListScroll
    }])
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.filteredOrderedCustomPlaylistAyahItems, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: item.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["reader-custom-playlist-item", {
        'is-selected': _ctx.isPlaylistItemSelected(item.id),
        'is-now-playing': _ctx.isCustomPlaylistItemNowPlaying(item),
        'is-dragging': _ctx.playlistDragItemId === String(item.id),
        'is-drag-over': _ctx.playlistDragOverItemId === String(item.id)
      }]),
      draggable: "true",
      onClick: $event => _ctx.togglePlaylistItemSelection(item.id),
      onDragstart: $event => _ctx.onPlaylistItemDragStart(item, $event),
      onDragover: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.onPlaylistItemDragOver(item, $event), ["prevent"]),
      onDragleave: $event => _ctx.onPlaylistItemDragLeave(item, $event),
      onDrop: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.onPlaylistItemDrop(item, $event), ["prevent"]),
      onDragend: _cache[65] || (_cache[65] = (...args) => _ctx.onPlaylistItemDragEnd && _ctx.onPlaylistItemDragEnd(...args))
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_149, [_cache[298] || (_cache[298] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "reader-custom-playlist-drag-handle reader-custom-playlist-drag-handle--leading",
      "aria-hidden": "true",
      title: "Reorder by dragging"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-grip-horizontal"
    })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "checkbox",
      class: "form-check-input reader-custom-playlist-checkbox",
      checked: _ctx.isPlaylistItemSelected(item.id),
      "aria-label": `Select ${_ctx.getCustomPlaylistItemMain(item)}`,
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.togglePlaylistItemSelection(item.id), ["stop"])
    }, null, 8 /* PROPS */, _hoisted_150)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_151, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_152, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_153, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_154, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.surahNumber && item.ayahNumber ? `${item.surahNumber}:${item.ayahNumber}` : "Ayah"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_155, [_ctx.isCustomPlaylistItemNowPlaying(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_156)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(String(item.description || "").trim() || _ctx.getCustomPlaylistItemMain(item)), 1 /* TEXT */)])]), _ctx.getCustomPlaylistItemArabicName(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_157, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.getCustomPlaylistItemArabicName(item)), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _ctx.getCustomPlaylistItemMeta(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_158, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.getCustomPlaylistItemMeta(item)), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_159, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "reader-custom-playlist-btn is-play reader-custom-playlist-icon-btn",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.playCustomPlaylistItem(item), ["stop"]),
      "aria-label": "Play ayah audio",
      title: "Play ayah"
    }, [...(_cache[299] || (_cache[299] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-play-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_160)])], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_148);
  }), 128 /* KEYED_FRAGMENT */)), !_ctx.filteredOrderedCustomPlaylistAyahItems.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_161, [...(_cache[300] || (_cache[300] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-0"
  }, "No ayahs match the current search or filter.", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_162, " Ayah list is collapsed. "))], 64 /* STABLE_FRAGMENT */))])])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_163, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_164, [_cache[302] || (_cache[302] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "mb-1"
  }, "No playlist selected", -1 /* CACHED */)), _cache[303] || (_cache[303] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-0"
  }, "Create a playlist to start saving surahs and ayahs.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn is-add-surah mt-2",
    onClick: _cache[66] || (_cache[66] = $event => _ctx.openCreatePlaylistModal())
  }, [...(_cache[301] || (_cache[301] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-circle me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Create first playlist ", -1 /* CACHED */)]))])])]))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Memorisation Toolbar "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "mem-toolbar-slide"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_ctx.isMemorisationToolbarVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 0,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["quran-toolbar-sticky memorisation-toolbar-sticky memorisation-toolbar-active ltr-text mb-4", {
        'is-pinned': _ctx.isToolbarPinned
      }]),
      role: "group",
      "aria-label": "Memorisation tools expanded"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_165, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_166, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_167, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "quran-toolbar-btn memorisation-close-action quran-toolbar-close-btn-purple",
      onClick: _cache[67] || (_cache[67] = (...args) => _ctx.toggleMemorisationToolbar && _ctx.toggleMemorisationToolbar(...args)),
      title: "Exit memorisation focus"
    }, [...(_cache[304] || (_cache[304] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-box-arrow-right",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))]), _cache[305] || (_cache[305] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "memorisation-clean-title-wrap"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "quran-toolbar-label quran-toolbar-label-purple"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Memorisation Focus")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
      class: "memorisation-clean-subtitle"
    }, "Focus on one ayah, then advance with calm repetition.")], -1 /* CACHED */))]), _ctx.desktopSurahContext.englishName ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_168, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_169, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.desktopSurahContext.number) + ". " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.desktopSurahContext.englishName), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_170, " Ayah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.memorisationCurrentAyahNumber) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.totalAyahs || "—"), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "memorisation-header-progress",
      role: "progressbar",
      "aria-label": "Memorisation progress in selected range",
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": _ctx.memorisationProgressPercent,
      "aria-valuetext": _ctx.memorisationProgressLabel
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "memorisation-header-progress-fill",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        width: `${_ctx.memorisationProgressPercent}%`
      })
    }, null, 4 /* STYLE */)], 8 /* PROPS */, _hoisted_171)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_172, [_cache[322] || (_cache[322] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "memorisation-row-section-heading memorisation-row-section-heading--core"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "memorisation-row-section-title"
    }, "Live Session Controls"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "memorisation-row-section-subtitle mb-0"
    }, "These controls affect playback immediately while you recite.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_173, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn btn-link memorisation-inline-action memorisation-inline-action--play", {
        'is-playing': _ctx.isAnyAudioPlaying,
        'is-attention': !_ctx.isAnyAudioPlaying
      }]),
      onClick: _cache[68] || (_cache[68] = $event => _ctx.toggleAudioPlayer(_ctx.memorisationPlayIndex)),
      title: _ctx.isAnyAudioPlaying ? 'Pause focused ayah audio' : 'Play focused ayah audio',
      "aria-label": _ctx.isAnyAudioPlaying ? 'Pause focused ayah audio' : `Play focused ayah audio, ayah ${_ctx.memorisationPlayIndex + 1}`
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isAnyAudioPlaying ? 'bi-pause-circle-fill' : 'bi-play-circle-fill']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isAnyAudioPlaying ? "Pause Current Ayah" : "Play Current Ayah"), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_174), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_175, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isAnyAudioPlaying ? "Pause to review quietly, then resume when ready." : "Play the currently selected ayah with your active settings."), 1 /* TEXT */)]), _ctx.isTabletOrMobile ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_176, " Start with these live controls, then open Session Setup for focus, playback mode, range, and pacing. ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_177, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["memorisation-mobile-section-toggle", {
        'is-open': _ctx.isMemorisationAdvancedOpen
      }]),
      onClick: _cache[69] || (_cache[69] = (...args) => _ctx.toggleMemorisationAdvanced && _ctx.toggleMemorisationAdvanced(...args)),
      "aria-expanded": _ctx.isMemorisationAdvancedOpen ? 'true' : 'false',
      "aria-controls": "memorisationMobileSessionPanel"
    }, [_cache[306] || (_cache[306] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "memorisation-mobile-section-toggle-copy"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "memorisation-mobile-section-toggle-label"
    }, "Session Setup"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "memorisation-mobile-section-toggle-desc"
    }, "Range, reciter, speed, and pacing")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isMemorisationAdvancedOpen ? 'bi-chevron-up' : 'bi-chevron-down']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_178), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["memorisation-mobile-section-toggle", {
        'is-open': _ctx.isMemorisationReadingAidsOpen
      }]),
      onClick: _cache[70] || (_cache[70] = (...args) => _ctx.toggleMemorisationReadingAidsDropdown && _ctx.toggleMemorisationReadingAidsDropdown(...args)),
      "aria-expanded": _ctx.isMemorisationReadingAidsOpen ? 'true' : 'false',
      "aria-controls": "memorisationMobileAidsPanel"
    }, [_cache[307] || (_cache[307] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "memorisation-mobile-section-toggle-copy"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "memorisation-mobile-section-toggle-label"
    }, "Progress Tools"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "memorisation-mobile-section-toggle-desc"
    }, "Display helpers, audio aids, and tools")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isMemorisationReadingAidsOpen ? 'bi-chevron-up' : 'bi-chevron-down']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_179)]), _ctx.isMemorisationAdvancedOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_180, [...(_cache[308] || (_cache[308] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "memorisation-row-section-title"
    }, "Session Setup", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "memorisation-row-section-subtitle mb-0"
    }, "Set focus mode, playback flow, range, reciter, speed, and pacing before your memorisation run starts.", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.isMemorisationAdvancedOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_181, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_182, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "memorisation-switch-control mb-0",
      title: _ctx.isMemorisationMode ? 'Turn off single-ayah focus' : 'Turn on single-ayah focus'
    }, [_cache[309] || (_cache[309] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "memorisation-switch-label"
    }, "Single ayah focus", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "checkbox",
      class: "memorisation-switch-input",
      checked: _ctx.isMemorisationMode,
      onChange: _cache[71] || (_cache[71] = (...args) => _ctx.toggleMemorisationMode && _ctx.toggleMemorisationMode(...args)),
      "aria-label": _ctx.isMemorisationMode ? 'Turn off single ayah focus' : 'Turn on single ayah focus'
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_184), _cache[310] || (_cache[310] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "memorisation-switch-ui",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */))], 8 /* PROPS */, _hoisted_183), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_185, [_cache[311] || (_cache[311] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Playback mode", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      id: "memorisationPlaybackModeSelectInline",
      class: "form-select quran-toolbar-select",
      "onUpdate:modelValue": _cache[72] || (_cache[72] = $event => _ctx.playbackMode = $event),
      "aria-label": "Playback flow mode",
      title: "Auto-advance moves to the next ayah, Repeat loops one ayah, and Manual waits for your next tap."
    }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.playbackModeOptions, option => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
        key: option.value,
        value: option.value
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.value === "continuous" ? "Auto-advance" : option.value === "repeat" ? "Repeat ayah" : "Manual tap"), 9 /* TEXT, PROPS */, _hoisted_186);
    }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.playbackMode]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_187, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_188, [_cache[313] || (_cache[313] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "quran-toolbar-label d-none d-sm-inline-block",
      style: {
        "color": "#064e3b",
        "margin-right": "0"
      }
    }, "Range", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_189, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "number",
      "onUpdate:modelValue": _cache[73] || (_cache[73] = $event => _ctx.memorisationRangeStart = $event),
      class: "quran-toolbar-select text-center",
      style: {
        "width": "55px",
        "padding": "0",
        "background-image": "none !important",
        "border-color": "rgba(6, 78, 59, 0.2)"
      },
      min: "1",
      max: _ctx.totalAyahs || 1,
      onChange: _cache[74] || (_cache[74] = (...args) => _ctx.applyMemorisationRange && _ctx.applyMemorisationRange(...args)),
      onKeyup: _cache[75] || (_cache[75] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((...args) => _ctx.applyMemorisationRange && _ctx.applyMemorisationRange(...args), ["enter"])),
      "aria-label": "Start ayah number for memorisation range",
      title: "Start ayah number"
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_190), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.memorisationRangeStart, void 0, {
      number: true
    }]]), _cache[312] || (_cache[312] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "opacity-50",
      style: {
        "color": "#064e3b",
        "font-weight": "900"
      }
    }, "-", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "number",
      "onUpdate:modelValue": _cache[76] || (_cache[76] = $event => _ctx.memorisationRangeEnd = $event),
      class: "quran-toolbar-select text-center",
      style: {
        "width": "55px",
        "padding": "0",
        "background-image": "none !important",
        "border-color": "rgba(6, 78, 59, 0.2)"
      },
      min: "1",
      max: _ctx.totalAyahs || 1,
      onChange: _cache[77] || (_cache[77] = (...args) => _ctx.applyMemorisationRange && _ctx.applyMemorisationRange(...args)),
      onKeyup: _cache[78] || (_cache[78] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((...args) => _ctx.applyMemorisationRange && _ctx.applyMemorisationRange(...args), ["enter"])),
      placeholder: _ctx.totalAyahs,
      "aria-label": "End ayah number for memorisation range",
      title: "End ayah number"
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_191), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.memorisationRangeEnd, void 0, {
      number: true
    }]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-link memorisation-range-reset-link",
      onClick: _cache[79] || (_cache[79] = (...args) => _ctx.resetMemorisationRange && _ctx.resetMemorisationRange(...args)),
      title: "Use the full surah range"
    }, [...(_cache[314] || (_cache[314] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-book-half me-1",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Full surah ", -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_192, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_193, [_cache[315] || (_cache[315] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Reciter", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      class: "quran-toolbar-select text-start",
      "onUpdate:modelValue": _cache[80] || (_cache[80] = $event => _ctx.selectedReciter = $event),
      "aria-label": "Select reciter for memorisation mode"
    }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.recitersSorted, reciter => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
        key: `memorisation-reciter-${reciter.identifier}`,
        value: reciter.identifier
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reciter.englishName), 9 /* TEXT, PROPS */, _hoisted_194);
    }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedReciter]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_195, [_cache[316] || (_cache[316] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Speed", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      class: "quran-toolbar-select text-center",
      "onUpdate:modelValue": _cache[81] || (_cache[81] = $event => _ctx.playbackSpeed = $event),
      onChange: _cache[82] || (_cache[82] = $event => _ctx.setPlaybackSpeed(_ctx.playbackSpeed)),
      "aria-label": "Playback speed in memorisation mode"
    }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.playbackSpeeds, speed => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
        key: `memorisation-speed-${speed}`,
        value: speed
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(speed) + "x ", 9 /* TEXT, PROPS */, _hoisted_196);
    }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.playbackSpeed, void 0, {
      number: true
    }]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_197, [!_ctx.isTabletOrMobile ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 0
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_198, [_cache[317] || (_cache[317] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Delay (sec)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "number",
      "onUpdate:modelValue": _cache[83] || (_cache[83] = $event => _ctx.memorisationVerseDelay = $event),
      class: "quran-toolbar-select text-center",
      min: "0",
      max: "60",
      onChange: _cache[84] || (_cache[84] = (...args) => _ctx.notifyAyahDelayChange && _ctx.notifyAyahDelayChange(...args)),
      "aria-label": "Ayah delay in seconds"
    }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.memorisationVerseDelay, void 0, {
      number: true
    }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_199, [_cache[318] || (_cache[318] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Reps", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "number",
      "onUpdate:modelValue": _cache[85] || (_cache[85] = $event => _ctx.memorisationRepetitionCount = $event),
      class: "quran-toolbar-select text-center",
      min: "1",
      max: "99",
      "aria-label": "Repetitions per ayah"
    }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.memorisationRepetitionCount, void 0, {
      number: true
    }]])])], 64 /* STABLE_FRAGMENT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("details", _hoisted_200, [_cache[321] || (_cache[321] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("summary", null, "Pacing", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_201, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_202, [_cache[319] || (_cache[319] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Delay (sec)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "number",
      "onUpdate:modelValue": _cache[86] || (_cache[86] = $event => _ctx.memorisationVerseDelay = $event),
      class: "quran-toolbar-select text-center",
      min: "0",
      max: "60",
      onChange: _cache[87] || (_cache[87] = (...args) => _ctx.notifyAyahDelayChange && _ctx.notifyAyahDelayChange(...args)),
      "aria-label": "Ayah delay in seconds"
    }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.memorisationVerseDelay, void 0, {
      number: true
    }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_203, [_cache[320] || (_cache[320] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Reps", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "number",
      "onUpdate:modelValue": _cache[88] || (_cache[88] = $event => _ctx.memorisationRepetitionCount = $event),
      class: "quran-toolbar-select text-center",
      min: "1",
      max: "99",
      "aria-label": "Repetitions per ayah"
    }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.memorisationRepetitionCount, void 0, {
      number: true
    }]])])])])), _ctx.isMemorisationRepetitionActive ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_204, " Repetition " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.memorisationRepetitionCurrent) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.memorisationRepetitionCount), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _ctx.isMemorisationReadingAidsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_205, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_206, [_cache[337] || (_cache[337] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "memorisation-row-title"
    }, "Progress Tools", -1 /* CACHED */)), _cache[338] || (_cache[338] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "memorisation-row-subtitle mb-0"
    }, "Choose what appears while reciting, adjust supporting audio, and manage your memorisation checkpoint.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_207, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_208, [_cache[331] || (_cache[331] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "memorisation-aids-section-subtitle mb-0"
    }, "Show only the visual helpers that improve your focus.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_209, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["memorisation-icon-text-action", {
        'is-enabled': _ctx.isTranslationVisible
      }]),
      onClick: _cache[89] || (_cache[89] = $event => _ctx.isTranslationVisible = !_ctx.isTranslationVisible),
      "aria-pressed": _ctx.isTranslationVisible ? 'true' : 'false',
      title: "Toggle translation"
    }, [_cache[323] || (_cache[323] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-chat-quote-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), _cache[324] || (_cache[324] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "memorisation-icon-text-label"
    }, "Translation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_211, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isTranslationVisible ? "On" : "Off"), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_210), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["memorisation-icon-text-action", {
        'is-enabled': _ctx.showTajweed
      }]),
      onClick: _cache[90] || (_cache[90] = $event => _ctx.showTajweed = !_ctx.showTajweed),
      "aria-pressed": _ctx.showTajweed ? 'true' : 'false',
      title: "Toggle tajweed guidance"
    }, [_cache[325] || (_cache[325] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-palette-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), _cache[326] || (_cache[326] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "memorisation-icon-text-label"
    }, "Tajweed", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_213, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.showTajweed ? "On" : "Off"), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_212), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["memorisation-icon-text-action", {
        'is-enabled': _ctx.showRealtimeHighlighting
      }]),
      onClick: _cache[91] || (_cache[91] = $event => _ctx.showRealtimeHighlighting = !_ctx.showRealtimeHighlighting),
      "aria-pressed": _ctx.showRealtimeHighlighting ? 'true' : 'false',
      title: "Toggle word highlight"
    }, [_cache[327] || (_cache[327] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-highlighter",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), _cache[328] || (_cache[328] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "memorisation-icon-text-label"
    }, "Word Highlight", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_215, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.showRealtimeHighlighting ? "On" : "Off"), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_214), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["memorisation-icon-text-action", {
        'is-enabled': _ctx.showWordTranslation
      }]),
      onClick: _cache[92] || (_cache[92] = $event => _ctx.showWordTranslation = !_ctx.showWordTranslation),
      "aria-pressed": _ctx.showWordTranslation ? 'true' : 'false',
      title: "Toggle word meanings"
    }, [_cache[329] || (_cache[329] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-translate",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), _cache[330] || (_cache[330] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "memorisation-icon-text-label"
    }, "Word Meanings", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_217, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.showWordTranslation ? "On" : "Off"), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_216)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_218, [_cache[336] || (_cache[336] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "memorisation-aids-section-subtitle mb-0"
    }, "Fine-tune supporting audio features for memorisation.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_219, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["memorisation-icon-text-action", {
        'is-enabled': _ctx.showWordTranslationTooltip
      }]),
      onClick: _cache[93] || (_cache[93] = (...args) => _ctx.toggleWordAudioMode && _ctx.toggleWordAudioMode(...args)),
      "aria-pressed": _ctx.showWordTranslationTooltip ? 'true' : 'false',
      title: "Toggle word tap audio"
    }, [_cache[332] || (_cache[332] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-volume-up-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), _cache[333] || (_cache[333] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "memorisation-icon-text-label"
    }, "Word Tap Audio", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_221, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.showWordTranslationTooltip ? "On" : "Off"), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_220), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["memorisation-icon-text-action", {
        'is-enabled': _ctx.isAudioPlayerVisible
      }]),
      onClick: _cache[94] || (_cache[94] = (...args) => _ctx.toggleAudioPlayerVisibility && _ctx.toggleAudioPlayerVisibility(...args)),
      "aria-pressed": _ctx.isAudioPlayerVisible ? 'true' : 'false',
      title: "Turn bottom audio player on or off"
    }, [_cache[334] || (_cache[334] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-music-player-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), _cache[335] || (_cache[335] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "memorisation-icon-text-label"
    }, "Audio Player", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_223, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isAudioPlayerVisible ? "On" : "Off"), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_222)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <section class=\"memorisation-aids-section memorisation-aids-section--session\" aria-label=\"Session tools\">\n                                    <p class=\"memorisation-aids-section-subtitle mb-0\">Track your plan and save your exact ayah checkpoint.</p>\n                                    <div class=\"memorisation-feature-row memorisation-feature-row--feature-panel\" role=\"group\" aria-label=\"Session tools\">\n                                        <button type=\"button\" class=\"memorisation-icon-text-action memorisation-icon-text-action--hifdhplan is-enabled\" @click=\"openHifdhPlanModalGuarded\" title=\"Open Hifdh review plan\">\n                                            <i class=\"bi bi-journal-bookmark-fill\" aria-hidden=\"true\"></i>\n                                            <span class=\"memorisation-icon-text-label\">Hifdh Plan</span>\n                                            <span class=\"memorisation-icon-text-state\">{{ todayHifdhPlanItemsOrdered.length }} due</span>\n                                        </button>\n                                        <button\n                                            type=\"button\"\n                                            class=\"memorisation-icon-text-action\"\n                                            :class=\"{ 'is-enabled': isMemorisationCurrentAyahSaved }\"\n                                            :disabled=\"!memorisationCurrentAyah\"\n                                            @click=\"toggleCurrentMemorisationBookmark\"\n                                            :title=\"isMemorisationCurrentAyahSaved ? 'Remove bookmark from current ayah' : 'Save current ayah as a bookmark'\">\n                                            <i class=\"bi\" :class=\"isMemorisationCurrentAyahSaved ? 'bi-bookmark-fill' : 'bi-bookmark'\" aria-hidden=\"true\"></i>\n                                            <span class=\"memorisation-icon-text-label\">Bookmark Ayah</span>\n                                            <span class=\"memorisation-icon-text-state\">{{ isMemorisationCurrentAyahSaved ? \"Bookmarked\" : \"Save\" }}</span>\n                                        </button>\n                                    </div>\n                                </section> ")])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_224, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_225, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_226, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_227, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[339] || (_cache[339] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title",
    id: "hifdhPlanModalLabel"
  }, "Today's Hifdh Plan", -1 /* CACHED */)), _cache[340] || (_cache[340] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "hifdh-plan-modal-subtitle mb-0"
  }, "A gentle daily ritual to preserve what you memorise and return with consistency.", -1 /* CACHED */)), _ctx.isHifdhDemoModeActive ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_228, "Demo ON (dates overridden)")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _cache[341] || (_cache[341] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_229, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_230, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_231, "Due Today: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.todayHifdhPlanItemsOrdered.length), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_232, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.hifdhConsistencyStreakDays > 0 ? 'bi-fire' : 'bi-heart']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */), _ctx.hifdhConsistencyStreakDays > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_233, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhConsistencyStreakDays) + " days consistent — mashaAllah!", 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_234, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhConsistencyNudge), 1 /* TEXT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_235, [_cache[342] || (_cache[342] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-right-circle",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.nextHifdhDueSummary), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_236, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_237, "Last " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhRecentPerformance.windowDays) + " days", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_238, [_cache[343] || (_cache[343] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check2-circle",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhRecentPerformance.completedCount) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhRecentPerformance.dueCount) + " done ", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_239, [_cache[344] || (_cache[344] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-graph-up-arrow",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhRecentPerformance.completionRate) + "% completion ", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_240, " Strong " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhRecentPerformance.feedbackCounts.strong), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_241, " Minor " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhRecentPerformance.feedbackCounts.minor), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_242, " Weak " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhRecentPerformance.feedbackCounts.weak), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_243, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_244, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_245, [_cache[345] || (_cache[345] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "hifdh-performance-title mb-0"
  }, "Current surah progress", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhCoverageStats.surahReviewedCount) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhCoverageStats.surahTotalAyahs || _ctx.hifdhCoverageStats.surahPlannedCount) + " reviewed", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hifdh-analytics-track",
    role: "img",
    "aria-label": `${_ctx.hifdhCoverageStats.surahPercent}% completed in current surah`
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "hifdh-analytics-track-fill",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: `${_ctx.hifdhCoverageStats.surahPercent}%`
    })
  }, null, 4 /* STYLE */)], 8 /* PROPS */, _hoisted_246), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_247, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhCoverageStats.surahRemainingCount) + " ayahs remain in this surah", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhCoverageStats.surahPercent) + "%", 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_248, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_249, [_cache[346] || (_cache[346] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "hifdh-performance-title mb-0"
  }, "Overall Quran progress", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhCoverageStats.overallReviewedCount) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhCoverageStats.quranTotalAyahs) + " reviewed", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hifdh-analytics-track",
    role: "img",
    "aria-label": `${_ctx.hifdhCoverageStats.overallPercent}% completed in overall Quran tracker`
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "hifdh-analytics-track-fill hifdh-analytics-track-fill-overall",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: `${_ctx.hifdhCoverageStats.overallPercent}%`
    })
  }, null, 4 /* STYLE */)], 8 /* PROPS */, _hoisted_250), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_251, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhCoverageStats.overallRemainingCount) + " ayahs remain overall", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhCoverageStats.overallPercent) + "%", 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_252, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_253, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_254, [_cache[347] || (_cache[347] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "hifdh-performance-title mb-0"
  }, "7-day tracker", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhRecentPerformance.completedCount) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhRecentPerformance.dueCount) + " done", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_255, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.hifdhTrackerCards, day => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: day.key,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["hifdh-tracker-day-card", {
        'is-today': day.isToday,
        'is-complete': day.isComplete,
        'is-empty': day.isEmpty
      }]),
      role: "listitem"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_256, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_257, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_258, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.shortDate), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "hifdh-tracker-day-progress",
      role: "img",
      "aria-label": `${day.label}: ${day.completedCount}/${day.dueCount} completed`
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "hifdh-tracker-day-progress-fill",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        width: `${day.progressPercent}%`
      })
    }, null, 4 /* STYLE */)], 8 /* PROPS */, _hoisted_259), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_260, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.completedCount) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.dueCount), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.statusLabel), 1 /* TEXT */)])], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))]), _cache[348] || (_cache[348] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "hifdh-performance-chart-help mb-0"
  }, "Live over the last 7 days. Aim for one completed segment daily to keep retention strong.", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_261, [_cache[349] || (_cache[349] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hifdh-performance-card-head"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "hifdh-performance-title mb-0"
  }, "Weak spots"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, "Needs extra review")], -1 /* CACHED */)), _ctx.hifdhWeakSpots.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_262, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.hifdhWeakSpots, spot => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: spot.label,
      class: "hifdh-weak-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_263, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(spot.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_264, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(spot.weakCount) + " weak · " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(spot.lastSeenLabel), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_265, "No weak segments logged yet. Keep going."))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_266, [_cache[353] || (_cache[353] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hifdh-performance-card-head"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "hifdh-performance-title mb-0"
  }, "Streak tracking"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, "Consistency matters")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_267, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_268, [_cache[350] || (_cache[350] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Current", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhStreakTracking.currentStreak) + "d", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_269, [_cache[351] || (_cache[351] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Best", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhStreakTracking.bestStreak) + "d", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_270, [_cache[352] || (_cache[352] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Active", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhStreakTracking.activeDays) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhStreakTracking.windowDays), 1 /* TEXT */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_271, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_272, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hifdh-onboarding-ring",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      '--hifdh-progress': `${_ctx.hifdhCompletionPercent}%`
    }),
    role: "img",
    "aria-label": `${_ctx.hifdhCompletionPercent}% completed`
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhCompletionPercent) + "%", 1 /* TEXT */)], 12 /* STYLE, PROPS */, _hoisted_273)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_274, [_cache[356] || (_cache[356] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "hifdh-onboarding-invite-title mb-1"
  }, "What will you memorise today?", -1 /* CACHED */)), _cache[357] || (_cache[357] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "hifdh-onboarding-invite-copy mb-2"
  }, "Start with one short range, then keep your rhythm by reviewing what is due.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_275, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "quran-toolbar-btn quran-toolbar-btn-sm",
    onClick: _cache[95] || (_cache[95] = (...args) => _ctx.quickStartAlFatihaToday && _ctx.quickStartAlFatihaToday(...args)),
    title: "Start with Surah Al-Fatiha",
    "data-hifdh-tooltip": "true"
  }, [...(_cache[354] || (_cache[354] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bookmark-heart",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "quran-toolbar-btn-text"
  }, "Start with Al-Fatiha", -1 /* CACHED */)]))]), _ctx.continueProgress ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "quran-toolbar-btn quran-toolbar-btn-sm",
    onClick: _cache[96] || (_cache[96] = $event => {
      var _ctx$continueProgress6;
      return _ctx.resumeContinueProgress({
        autoplay: ((_ctx$continueProgress6 = _ctx.continueProgress) === null || _ctx$continueProgress6 === void 0 ? void 0 : _ctx$continueProgress6.mode) === 'listening'
      });
    }),
    title: "Continue from your last read position",
    "data-hifdh-tooltip": "true"
  }, [...(_cache[355] || (_cache[355] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-repeat",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "quran-toolbar-btn-text"
  }, "Continue where I left off", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_276, [_cache[366] || (_cache[366] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hifdh-control-panel-title"
  }, "Begin Today's Ritual", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_277, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: "quran-toolbar-select text-center",
    "onUpdate:modelValue": _cache[97] || (_cache[97] = $event => _ctx.hifdhNewRangeStart = $event),
    min: "1",
    max: _ctx.totalAyahs || 1,
    "aria-label": "Start ayah",
    title: "Start ayah number for the memorisation range",
    "data-hifdh-tooltip": "true"
  }, null, 8 /* PROPS */, _hoisted_278), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.hifdhNewRangeStart, void 0, {
    number: true
  }]]), _cache[360] || (_cache[360] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "opacity-50"
  }, "-", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: "quran-toolbar-select text-center",
    "onUpdate:modelValue": _cache[98] || (_cache[98] = $event => _ctx.hifdhNewRangeEnd = $event),
    min: "1",
    max: _ctx.totalAyahs || 1,
    "aria-label": "End ayah",
    title: "End ayah number for the memorisation range",
    "data-hifdh-tooltip": "true"
  }, null, 8 /* PROPS */, _hoisted_279), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.hifdhNewRangeEnd, void 0, {
    number: true
  }]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "quran-toolbar-btn quran-toolbar-btn-sm hifdh-add-start-btn",
    onClick: _cache[99] || (_cache[99] = (...args) => _ctx.addRangeAndStartHifdhSession && _ctx.addRangeAndStartHifdhSession(...args)),
    title: "Add this range and immediately start today's guided session",
    "data-hifdh-tooltip": "true"
  }, [...(_cache[358] || (_cache[358] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-play-circle-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "quran-toolbar-btn-text"
  }, "Add & Start", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "quran-toolbar-btn quran-toolbar-btn-sm",
    onClick: _cache[100] || (_cache[100] = (...args) => _ctx.quickStartSurahTwoDemoRange && _ctx.quickStartSurahTwoDemoRange(...args)),
    title: "Load Surah 2 and queue a demo range instantly",
    "data-hifdh-tooltip": "true"
  }, [...(_cache[359] || (_cache[359] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-stars",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "quran-toolbar-btn-text"
  }, "Quick Demo", -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("details", _hoisted_280, [_cache[365] || (_cache[365] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("summary", {
    class: "hifdh-onboarding-summary",
    title: "Optional demo and reset tools",
    "data-hifdh-tooltip": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "hifdh-onboarding-summary-main"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-sliders",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "hifdh-onboarding-title"
  }, "Advanced actions")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "hifdh-onboarding-summary-meta"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "hifdh-onboarding-meta-closed"
  }, "Show optional tools"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "hifdh-onboarding-meta-open"
  }, "Hide optional tools"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chevron-down hifdh-onboarding-summary-caret",
    "aria-hidden": "true"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_281, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_282, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "quran-toolbar-btn quran-toolbar-btn-sm",
    disabled: !_ctx.canRunHifdhDemo,
    onClick: _cache[101] || (_cache[101] = (...args) => _ctx.markAllPendingHifdhDueToday && _ctx.markAllPendingHifdhDueToday(...args)),
    title: "Bring future pending items into today for demo testing",
    "data-hifdh-tooltip": "true"
  }, [...(_cache[361] || (_cache[361] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-lightning-charge-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "quran-toolbar-btn-text"
  }, "Due Now", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_283), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "quran-toolbar-btn quran-toolbar-btn-sm",
    onClick: _cache[102] || (_cache[102] = $event => _ctx.isHifdhResetConfirmVisible = !_ctx.isHifdhResetConfirmVisible),
    title: "Clear all queued ranges and restart from scratch",
    "data-hifdh-tooltip": "true"
  }, [...(_cache[362] || (_cache[362] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-trash3",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "quran-toolbar-btn-text"
  }, "Reset Plan", -1 /* CACHED */)]))])]), _ctx.isHifdhResetConfirmVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_284, [_cache[363] || (_cache[363] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-2"
  }, "Reset Hifdh plan? This removes all queued ranges and review progress.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_285, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-sm btn-outline-secondary",
    onClick: _cache[103] || (_cache[103] = $event => _ctx.isHifdhResetConfirmVisible = false)
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-sm btn-danger",
    onClick: _cache[104] || (_cache[104] = (...args) => _ctx.confirmResetHifdhPlan && _ctx.confirmResetHifdhPlan(...args))
  }, "Reset plan")])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[364] || (_cache[364] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "memorisation-simple-help mb-0"
  }, " Optional testing shortcuts for demo runs and fast plan cleanup. ", -1 /* CACHED */))])]), _cache[367] || (_cache[367] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "memorisation-simple-help"
  }, " Start with one range and continue calmly. Keep advanced tools for occasional adjustments. ", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_286, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_287, "Due Segments (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.todayHifdhPlanItemsOrdered.length) + ")", 1 /* TEXT */), _cache[373] || (_cache[373] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "memorisation-simple-help"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Tap "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Open"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" to jump to the segment and close this modal.")], -1 /* CACHED */)), !_ctx.hasTodayHifdhPlan ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_288, [_cache[371] || (_cache[371] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-calendar2-check",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_289, [_cache[369] || (_cache[369] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "memorisation-plan-empty mb-1"
  }, "No segments due right now.", -1 /* CACHED */)), _cache[370] || (_cache[370] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "memorisation-plan-empty-note mb-0"
  }, "Try a guided first step to start momentum.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "quran-toolbar-btn quran-toolbar-btn-sm hifdh-empty-state-cta",
    onClick: _cache[105] || (_cache[105] = (...args) => _ctx.quickStartAlFatihaToday && _ctx.quickStartAlFatihaToday(...args)),
    title: "Jump to Surah Al-Fatiha and start memorising today",
    "data-hifdh-tooltip": "true"
  }, [...(_cache[368] || (_cache[368] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-lightning-charge-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "quran-toolbar-btn-text"
  }, "Try memorising Al-Fatiha today", -1 /* CACHED */)]))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.todayHifdhPlanItemsOrdered, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: item.id,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["memorisation-plan-item", {
        'is-active': _ctx.hifdhActiveItemId === item.id
      }]),
      onClick: $event => _ctx.openHifdhPlanItemAndCloseModal(item)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_291, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_292, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhEntrySummary(item)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_293, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhCategoryTitle(_ctx.classifyHifdhEntry(item))) + " • " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhCheckpointLabel(item)) + " • " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.formatDateKey(item.scheduledDate)), 1 /* TEXT */)]), _cache[372] || (_cache[372] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "hifdh-item-open"
    }, "Open", -1 /* CACHED */))], 10 /* CLASS, PROPS */, _hoisted_290);
  }), 128 /* KEYED_FRAGMENT */))]), _ctx.hifdhSessionStarted && _ctx.activeHifdhSessionItem ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_294, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_295, " Current recitation: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhEntrySummary(_ctx.activeHifdhSessionItem)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_296, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhCheckpointLabel(_ctx.activeHifdhSessionItem)) + " · Due " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.formatDateKey(_ctx.activeHifdhSessionItem.scheduledDate)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_297, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "quran-toolbar-btn quran-toolbar-btn-sm",
    onClick: _cache[106] || (_cache[106] = $event => _ctx.openHifdhPlanItemAndCloseModal(_ctx.activeHifdhSessionItem))
  }, [...(_cache[374] || (_cache[374] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-eye-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "quran-toolbar-btn-text"
  }, "Open Segment", -1 /* CACHED */)]))]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.hifdhFeedbackChoices, choice => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: choice.value,
      type: "button",
      class: "quran-toolbar-btn quran-toolbar-btn-sm",
      onClick: $event => _ctx.completeActiveHifdhItem(choice.value)
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(choice.label), 9 /* TEXT, PROPS */, _hoisted_298);
  }), 128 /* KEYED_FRAGMENT */))])])) : _ctx.hifdhSessionStarted && !_ctx.activeHifdhSessionItem ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_299, " Ritual complete for today. " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.nextHifdhDueSummary), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _cache[375] || (_cache[375] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary",
    "data-bs-dismiss": "modal"
  }, "Close")], -1 /* CACHED */))])])])])), _ctx.hasPinnedAyahs && _ctx.isPinnedSectionHidden && !_ctx.isMobile && (_ctx.isTabletOrMobile || !_ctx.showDesktopToolbar) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_300, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "pinned-ayahs-icon-btn",
    onClick: _cache[107] || (_cache[107] = (...args) => _ctx.showPinnedSection && _ctx.showPinnedSection(...args)),
    "aria-label": "Show pinned favourite ayat",
    title: "Show pinned favourite ayat"
  }, [...(_cache[376] || (_cache[376] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-pin-angle-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.hasPinnedAyahs && !_ctx.isPinnedSectionHidden ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", {
    key: 3,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["pinned-ayahs-section ltr-text", {
      'is-collapsed': _ctx.isPinnedSectionCollapsed
    }]),
    role: "region",
    "aria-label": "Pinned favourite ayahs"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_301, [_cache[378] || (_cache[378] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "pinned-ayahs-title mb-1"
  }, "Pinned favourite ayat"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "pinned-ayahs-description mb-0"
  }, " Quick access to the verses you marked for reflection. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_302, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "pinned-ayahs-icon-btn",
    onClick: _cache[108] || (_cache[108] = (...args) => _ctx.togglePinnedSectionCollapsed && _ctx.togglePinnedSectionCollapsed(...args)),
    "aria-label": _ctx.isPinnedSectionCollapsed ? 'Expand pinned section' : 'Collapse pinned section',
    title: _ctx.isPinnedSectionCollapsed ? 'Expand pinned section' : 'Collapse pinned section'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isPinnedSectionCollapsed ? 'bi-chevron-down' : 'bi-chevron-up']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_303), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "pinned-ayahs-icon-btn pinned-ayahs-icon-btn-close",
    onClick: _cache[109] || (_cache[109] = (...args) => _ctx.hidePinnedSection && _ctx.hidePinnedSection(...args)),
    "aria-label": "Hide pinned section",
    title: "Hide pinned section"
  }, [...(_cache[377] || (_cache[377] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_304, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_305, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.pinnedAyahsList, pinned => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: pinned.key,
      class: "pinned-ayah-item",
      role: "listitem"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "pinned-ayah-open",
      onClick: $event => _ctx.openPinnedAyah(pinned),
      "aria-label": `Open pinned ayah ${pinned.surahNumber}:${pinned.ayahNumber}`
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_307, [_cache[379] || (_cache[379] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-pin-angle-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(pinned.surahNumber) + ":" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(pinned.ayahNumber) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_308, "· " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.getPinnedSurahName(pinned)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_309, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.getPinnedAyahPreview(pinned)), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_306), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "pinned-ayah-remove",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.removePinnedAyahByKey(pinned.key), ["stop"]),
      "aria-label": "Remove pinned ayah",
      title: "Remove pin"
    }, [...(_cache[380] || (_cache[380] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-x-lg",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_310)]);
  }), 128 /* KEYED_FRAGMENT */))])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !_ctx.isPinnedSectionCollapsed]])], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.showCreatePlaylistModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 4,
    class: "playlist-modal-backdrop",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Create playlist",
    onClick: _cache[115] || (_cache[115] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => _ctx.closeCreatePlaylistModal && _ctx.closeCreatePlaylistModal(...args), ["self"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "playlist-modal-card ltr-text",
    onClick: _cache[114] || (_cache[114] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_311, [_cache[382] || (_cache[382] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "mb-1"
  }, "Create Playlist"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-0 text-muted"
  }, "Title and description can be updated later.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-close",
    onClick: _cache[110] || (_cache[110] = (...args) => _ctx.closeCreatePlaylistModal && _ctx.closeCreatePlaylistModal(...args)),
    "aria-label": "Close create playlist modal"
  }, [...(_cache[381] || (_cache[381] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_312, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_313, [_cache[383] || (_cache[383] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "reader-custom-playlist-field-label"
  }, "Title", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[111] || (_cache[111] = $event => _ctx.createPlaylistName = $event),
    type: "text",
    class: "form-control reader-custom-playlist-input",
    placeholder: "Playlist title"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.createPlaylistName]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_314, [_cache[384] || (_cache[384] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "reader-custom-playlist-field-label"
  }, "Description", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[112] || (_cache[112] = $event => _ctx.createPlaylistDescription = $event),
    type: "text",
    class: "form-control reader-custom-playlist-input",
    placeholder: "Playlist description"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.createPlaylistDescription]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_315, [_cache[386] || (_cache[386] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "reader-custom-playlist-field-label visually-hidden"
  }, "Create", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-custom-playlist-btn is-play reader-custom-playlist-save-btn",
    onClick: _cache[113] || (_cache[113] = (...args) => _ctx.createPlaylistFromModal && _ctx.createPlaylistFromModal(...args))
  }, [...(_cache[385] || (_cache[385] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-circle me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Create playlist", -1 /* CACHED */)]))])])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-show=\"showNextStep\" class=\"next-step-wrapper\">\n            <div class=\"mx-auto mb-4 next-step-card\">\n                <button v-if=\"canMinimizeNextStep\" type=\"button\" :title=\"isNextStepMinimized ? 'Restore' : 'Minimize'\" :aria-label=\"isNextStepMinimized\n                    ? 'Restore next step'\n                    : 'Minimize next step'\n                    \" @click=\"toggleNextStepMinimized\" class=\"next-step-toggle\">\n                    <i class=\"fas\" :class=\"isNextStepMinimized\n                        ? 'fa-expand-alt'\n                        : 'fa-compress-alt'\n                        \" aria-hidden=\"true\"></i>\n                </button>\n                <div class=\"d-flex align-items-start gap-3 text-start\">\n                    <div class=\"flex-shrink-0 mt-1\">\n                        <div class=\"next-step-icon-circle\">\n                            <i class=\"fas fa-quran\"></i>\n                        </div>\n                    </div>\n                    <div class=\"flex-grow-1\">\n                        <p class=\"mb-2 fw-semibold text-uppercase next-step-eyebrow\">\n                            NEXT STEP\n                        </p>\n                        <div v-show=\"isNextStepMinimized\" class=\"mb-2 next-step-teaser\">\n                            <a href=\"/history\" class=\"fw-semibold text-decoration-none next-step-link\">\n                                Explore the Seerah timeline\n                            </a>\n                            <i class=\"fas fa-arrow-up-right-from-square ms-1 next-step-link-icon\"></i>\n                        </div>\n                        <p v-show=\"!isNextStepMinimized\" class=\"mb-3 next-step-text\">\n                            Learning how the Qur’an was preserved is a beautiful beginning. When you’re ready, gently\n                            continue with the life of the Messenger who lived its message. Walk through a simple,\n                            welcoming\n                            <a href=\"/mission\" class=\"fw-semibold text-decoration-none next-step-link\">\n                                Seerah timeline\n                            </a>\n                            to see the journey unfold.\n                        </p>\n                        <a v-show=\"!isNextStepMinimized\" href=\"/mission\"\n                            class=\"btn btn-sm fw-semibold text-white px-3 py-2 next-step-cta\">\n                            Explore Seerah\n                            <i class=\"fas fa-arrow-up-right-from-square ms-2\"></i>\n                        </a>\n                    </div>\n                    \n                </div>\n            </div>\n        </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_316, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sticky-dropdown", {
      collapsed: !_ctx.isVisible
    }]),
    ref: "stickyDropdown"
  }, [_cache[390] || (_cache[390] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "filter-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "filter-actions"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_317, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-sm btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2",
    onClick: _cache[116] || (_cache[116] = (...args) => _ctx.toggleSidebar && _ctx.toggleSidebar(...args)),
    "aria-expanded": !_ctx.sidebarCollapsed,
    "aria-label": _ctx.sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.sidebarCollapsed ? 'bi-chevron-double-right' : 'bi-chevron-double-left'])
  }, null, 2 /* CLASS */), !_ctx.sidebarCollapsed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_319, "Collapse Custom Sidebar")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 8 /* PROPS */, _hoisted_318)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_320, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_321, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Dark Sidebar Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_322, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Sidebar Header: Tabs & Search "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_323, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Navigation Tabs "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_324, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["tab-btn flex-fill", {
      active: _ctx.activeSidebarTab === 'surah'
    }]),
    onClick: _cache[117] || (_cache[117] = $event => _ctx.setActiveSidebarTab('surah'))
  }, "Surah", 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button class=\"tab-btn flex-fill\" \n                                        :class=\"{ active: activeSidebarTab === 'verse' }\"\n                                        @click=\"setActiveSidebarTab('verse')\">Verse</button>\n                                    <button class=\"tab-btn flex-fill\" \n                                        :class=\"{ active: activeSidebarTab === 'juz' }\"\n                                        @click=\"setActiveSidebarTab('juz')\">Juz</button> ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search Input "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_325, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "search",
    class: "form-control sidebar-search-input",
    "onUpdate:modelValue": _cache[118] || (_cache[118] = $event => _ctx.sidebarSearchQuery = $event),
    placeholder: `Search ${_ctx.activeSidebarTab}...`,
    "aria-label": "Search content"
  }, null, 8 /* PROPS */, _hoisted_326), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.sidebarSearchQuery]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Lists Container "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "sidebar-list-container flex-grow-1 px-0 pb-5",
    onScrollPassive: _cache[121] || (_cache[121] = (...args) => _ctx.handleSidebarListScroll && _ctx.handleSidebarListScroll(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Surah List "), _ctx.activeSidebarTab === 'surah' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_327, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.filteredSurahs_sidebar, surah => {
    var _ctx$continueProgress7, _ctx$continueProgress8, _ctx$continueProgress9, _ctx$continueProgress0, _ctx$continueProgress1, _ctx$continueProgress10;
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sidebar-item", {
        active: String(_ctx.selectedSurah) === String(surah.number)
      }]),
      key: surah.number,
      role: "button",
      onClick: $event => _ctx.selectSurahFromSidebar(surah.number)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_329, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_330, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.number), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_331, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_332, [_ctx.shouldShowContinueCardForSurah(surah) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: 0,
      type: "button",
      class: "continue-progress-chip",
      onClick: _cache[119] || (_cache[119] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.resumeContinueProgress(), ["stop"])),
      "aria-label": `Continue reading or listening from Surah ${(_ctx$continueProgress7 = _ctx.continueProgress) === null || _ctx$continueProgress7 === void 0 ? void 0 : _ctx$continueProgress7.surahNumber}, Ayah ${(_ctx$continueProgress8 = _ctx.continueProgress) === null || _ctx$continueProgress8 === void 0 ? void 0 : _ctx$continueProgress8.ayahNumber}`,
      title: `Continue reading/listening from Surah ${(_ctx$continueProgress9 = _ctx.continueProgress) === null || _ctx$continueProgress9 === void 0 ? void 0 : _ctx$continueProgress9.surahNumber}, Ayah ${(_ctx$continueProgress0 = _ctx.continueProgress) === null || _ctx$continueProgress0 === void 0 ? void 0 : _ctx$continueProgress0.ayahNumber}`
    }, [_cache[387] || (_cache[387] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-play-circle-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, " Continue " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(((_ctx$continueProgress1 = _ctx.continueProgress) === null || _ctx$continueProgress1 === void 0 ? void 0 : _ctx$continueProgress1.mode) === "listening" ? "listening" : "reading") + " · Ayah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$continueProgress10 = _ctx.continueProgress) === null || _ctx$continueProgress10 === void 0 ? void 0 : _ctx$continueProgress10.ayahNumber), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_333)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_334, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.englishName), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_335, [surah.numberOfAyahs || surah.number_ayahs ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_336, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.numberOfAyahs || surah.number_ayahs) + " ayahs ", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), surah.revelationType ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_337, " · Origin: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.revelationType), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), surah.englishNameTranslation ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_338, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.englishNameTranslation), 1 /* TEXT */), surah.numberOfAyahs || surah.number_ayahs ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_339, " · " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.numberOfAyahs || surah.number_ayahs) + " total verses ", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_340, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_341, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-link text-white p-0 opacity-50 hover-opacity-100 sidebar-info-button",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.openSurahInfo(surah), ["stop"]),
      "aria-label": "View surah information"
    }, [...(_cache[388] || (_cache[388] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-info-circle-fill"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_342)])])], 10 /* CLASS, PROPS */, _hoisted_328);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Verse List "), _ctx.activeSidebarTab === 'verse' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_343, [_ctx.surahDetails ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_344, " Surah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahDetails.englishName), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.visibleFilteredVersesList, verse => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sidebar-item", {
        active: _ctx.activeAyahIndex === verse.number - 1
      }]),
      key: verse.key,
      onClick: $event => _ctx.selectVerseFromSidebar(verse.number)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_346, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_347, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_348, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(verse.number), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_349, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" English (Left) (50%) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_350, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(verse.translation || 'Loading...'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Arabic (Right) (50%) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_351, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(verse.text), 1 /* TEXT */)])])], 10 /* CLASS, PROPS */, _hoisted_345);
  }), 128 /* KEYED_FRAGMENT */)), _ctx.filteredVersesList.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_352, " No verses found. ")) : _ctx.hasMoreFilteredVerses ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 2,
    type: "button",
    class: "btn sidebar-load-more-btn",
    onClick: _cache[120] || (_cache[120] = (...args) => _ctx.loadMoreSidebarVerses && _ctx.loadMoreSidebarVerses(...args))
  }, " Load more verses (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.visibleFilteredVersesList.length) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.filteredVersesList.length) + ") ", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Juz List "), _ctx.activeSidebarTab === 'juz' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_353, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.filteredJuzs, juz => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sidebar-item", {
        active: _ctx.selectedJuz === juz.number
      }]),
      key: juz.number,
      onClick: $event => _ctx.selectJuz(juz.number)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_355, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_356, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_357, "Juz " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(juz.number), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_358, " Starts at: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(juz.surahName) + ":" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(juz.ayahNumber), 1 /* TEXT */)]), _cache[389] || (_cache[389] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-chevron-right text-white-50 small"
    }, null, -1 /* CACHED */))])], 10 /* CLASS, PROPS */, _hoisted_354);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 32 /* NEED_HYDRATION */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"col-12 col-md-4 filter-item\"></div>\n                    <div class=\"col-12 col-md-4 filter-item\"></div> ")], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isVisible && !_ctx.sidebarCollapsed]])], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_359, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-primary surah-offcanvas-toggle icon-only",
    "data-bs-toggle": "offcanvas",
    "data-bs-target": "#surahOffcanvas",
    "aria-controls": "surahOffcanvas",
    onClick: _cache[122] || (_cache[122] = (...args) => _ctx.prepareSettingsDraft && _ctx.prepareSettingsDraft(...args))
  }, [...(_cache[391] || (_cache[391] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-sliders",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Filters & info", -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_360, [_cache[401] || (_cache[401] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "offcanvas-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "offcanvas-title",
    id: "surahOffcanvasLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Surah controls")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close text-reset",
    "data-bs-dismiss": "offcanvas",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_361, [ false ? (0) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_366, [_cache[393] || (_cache[393] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label surah-offcanvas-label"
  }, "Select surah", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select surah-offcanvas-select",
    "onUpdate:modelValue": _cache[123] || (_cache[123] = $event => _ctx.selectedSurah = $event),
    onChange: _cache[124] || (_cache[124] = $event => _ctx.selectSurah(_ctx.selectedSurah)),
    "aria-label": "Select surah"
  }, [_cache[392] || (_cache[392] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select surah", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.filteredSurahs, surah => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: surah.number,
      value: String(surah.number)
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.number) + " · " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.englishName), 9 /* TEXT, PROPS */, _hoisted_367);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedSurah]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_368, [_cache[400] || (_cache[400] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label surah-offcanvas-label"
  }, "Select reciter", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select surah-offcanvas-select",
    "onUpdate:modelValue": _cache[125] || (_cache[125] = $event => _ctx.selectedReciter = $event),
    "aria-label": "Select reciter"
  }, [_cache[394] || (_cache[394] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select a reciter", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.recitersSorted, reciter => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: reciter.identifier,
      value: reciter.identifier
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reciter.englishName), 9 /* TEXT, PROPS */, _hoisted_369);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedReciter]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_370, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_371, [_cache[396] || (_cache[396] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label surah-offcanvas-label"
  }, "Select translation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select surah-offcanvas-select",
    "onUpdate:modelValue": _cache[126] || (_cache[126] = $event => _ctx.selectedTranslation = $event),
    "aria-label": "Select translation"
  }, [_cache[395] || (_cache[395] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select Translation", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.translationsSorted, translation => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: translation.identifier,
      value: translation.identifier
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(`${translation.flag} ${translation.englishName} (${translation.language})`), 9 /* TEXT, PROPS */, _hoisted_372);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedTranslation]])]), _cache[397] || (_cache[397] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "surah-offcanvas-toggle-group"
  }, null, -1 /* CACHED */))]),  false ? (0) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-primary surah-offcanvas-submit",
    onClick: _cache[128] || (_cache[128] = (...args) => _ctx.closeOffcanvas && _ctx.closeOffcanvas(...args)),
    "aria-label": "Close filters and info"
  }, [...(_cache[399] || (_cache[399] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check me-2",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Done ", -1 /* CACHED */)]))])])])], 512 /* NEED_PATCH */), _ctx.isLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_374, "Loading Surah...")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row rtl-text",
    ref: "listContainer",
    role: "list",
    "aria-label": "Ayah cards list",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(!_ctx.isMemorisationMode ? {
      paddingTop: _ctx.topSpacerHeight + 'px',
      paddingBottom: _ctx.bottomSpacerHeight + 'px'
    } : null)
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.visibleWindow, item => {
    var _ctx$surahDetails, _item$ayah, _item$ayah2, _item$ayah3, _ctx$surahDetails2, _ctx$surahDetails3, _ctx$surahDetails4, _ctx$surahDetails6, _ctx$surahDetails7;
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      style: {
        "padding": "12px",
        "border-radius": "8px"
      },
      ref_for: true,
      ref: "audioCard",
      key: item.ayah.number,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["col-md-12 mb-2 mt-2 ayah-card ayah-card-container ayah-card-shell shadow-md", {
        highlighted: _ctx.isHighlighted && _ctx.activeAyahIndex === item.index,
        'currently-playing': _ctx.isAudioPlaying[item.index],
        'memorisation-repetition-active': _ctx.isMemorisationRepetitionActive && item.index === _ctx.currentlyPlayingIndex,
        'swipe-transition': _ctx.swipeTransitionIndex === item.index,
        'swipe-transition-next': _ctx.swipeTransitionIndex === item.index && _ctx.swipeTransitionDirection > 0,
        'swipe-transition-prev': _ctx.swipeTransitionIndex === item.index && _ctx.swipeTransitionDirection < 0,
        'is-pinned': _ctx.isAyahPinned(item.ayah),
        'memorisation-past': _ctx.isMemorisationMode && item.role === 'past',
        'memorisation-current': _ctx.isMemorisationMode && item.role === 'current',
        'memorisation-next': _ctx.isMemorisationMode && item.role === 'next'
      }]),
      role: "listitem",
      id: `ayah-card-${item.index}`,
      "data-ayah-number": item.ayah.numberInSurah,
      onClick: $event => _ctx.handleAyahCardClick(item.index, $event),
      onTouchstartPassive: $event => _ctx.onAyahCardTouchStart(item.index, $event),
      onTouchmove: _cache[139] || (_cache[139] = $event => _ctx.onAyahCardTouchMove($event)),
      onTouchend: _cache[140] || (_cache[140] = $event => _ctx.onAyahCardTouchEnd($event)),
      onTouchcancel: _cache[141] || (_cache[141] = $event => _ctx.resetAyahCardSwipeGesture()),
      onPointerdown: $event => _ctx.onAyahCardPointerDown(item.index, $event),
      onPointermove: _cache[142] || (_cache[142] = $event => _ctx.onAyahCardPointerMove($event)),
      onPointerup: _cache[143] || (_cache[143] = $event => _ctx.onAyahCardPointerUp($event)),
      onPointercancel: _cache[144] || (_cache[144] = $event => _ctx.resetAyahCardPointerGesture()),
      onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.toggleAudioPlayer(item.index), ["prevent"]), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.toggleAudioPlayer(item.index), ["prevent"]), ["space"])],
      draggable: _ctx.isPlaylistEditorVisible && !_ctx.isTabletOrMobile,
      tabindex: "0",
      onDragstart: $event => _ctx.onAyahDragStart(item.ayah, $event)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_376, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Surah and Ayah Number "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_377, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_378, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, [_cache[402] || (_cache[402] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
      src: "/images/art.png",
      width: "35px",
      alt: "Art Icon"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$surahDetails = _ctx.surahDetails) === null || _ctx$surahDetails === void 0 ? void 0 : _ctx$surahDetails.surahNumber) + " : " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.index + 1) + " ", 1 /* TEXT */), _ctx.isAyahSaved(item.ayah) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_379, "Saved")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _ctx.isAudioPlaying[item.index] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_380, " Now playing ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_381, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_382, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      class: "form-check-input",
      type: "checkbox",
      checked: _ctx.isTranslationVisibleFor(item),
      id: `surat-translation-toggle-${item.index}`,
      "aria-label": _ctx.isTranslationVisibleFor(item) ? 'Hide translation' : 'Show translation',
      onChange: $event => _ctx.onTranslationToggle(item, $event),
      onClick: _cache[129] || (_cache[129] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_383), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "form-check-label",
      for: `surat-translation-toggle-${item.index}`,
      onClick: _cache[130] || (_cache[130] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
    }, " Translation ", 8 /* PROPS */, _hoisted_384)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_385, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      class: "form-check-input",
      type: "checkbox",
      checked: _ctx.isTransliterationVisibleFor(item),
      id: `surat-transliteration-toggle-${item.index}`,
      "aria-label": _ctx.isTransliterationVisibleFor(item) ? 'Hide transliteration' : 'Show transliteration',
      onChange: $event => _ctx.onTransliterationToggle(item, $event),
      onClick: _cache[131] || (_cache[131] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_386), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "form-check-label",
      for: `surat-transliteration-toggle-${item.index}`,
      onClick: _cache[132] || (_cache[132] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
    }, " Transliteration ", 8 /* PROPS */, _hoisted_387)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_388, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["icon-btn ayah-playlist-btn", {
        'is-in-playlist': _ctx.isAyahInAnyCustomPlaylist(item.ayah),
        'is-in-active-playlist': _ctx.isAyahInCustomPlaylist(item.ayah)
      }]),
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.onAyahPlaylistPrimaryAction(item.ayah), ["stop"]),
      "aria-label": _ctx.isAyahInCustomPlaylist(item.ayah) ? 'Remove ayah from active playlist' : _ctx.isAyahInAnyCustomPlaylist(item.ayah) ? 'Saved in another playlist, open playlist options' : 'Open playlist options',
      title: _ctx.isAyahInCustomPlaylist(item.ayah) ? 'Remove from active playlist' : _ctx.isAyahInAnyCustomPlaylist(item.ayah) ? 'Saved in another playlist' : 'Save to playlist'
    }, [...(_cache[403] || (_cache[403] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-music-note-list",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 10 /* CLASS, PROPS */, _hoisted_389), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["icon-btn ayah-pin-btn", {
        'is-pinned': _ctx.isAyahPinned(item.ayah)
      }]),
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.togglePinnedAyah(item.ayah), ["stop"]),
      "aria-label": _ctx.isAyahPinned(item.ayah) ? 'Unpin favourite ayah' : 'Pin ayah as favourite',
      title: _ctx.isAyahPinned(item.ayah) ? 'Unpin favourite ayah' : 'Pin ayah as favourite'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isAyahPinned(item.ayah) ? 'bi-pin-angle-fill' : 'bi-pin-angle']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_390), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["icon-btn ayah-download-btn", {
        'is-downloaded': _ctx.isAyahAudioDownloaded(item.ayah)
      }]),
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.downloadAyahAudio(item.ayah), ["stop"]),
      disabled: !((_item$ayah = item.ayah) !== null && _item$ayah !== void 0 && _item$ayah.audio) || _ctx.isAyahAudioDownloading(item.ayah),
      "aria-label": !((_item$ayah2 = item.ayah) !== null && _item$ayah2 !== void 0 && _item$ayah2.audio) ? 'Audio unavailable for this ayah' : _ctx.isAyahAudioDownloading(item.ayah) ? 'Downloading ayah audio' : _ctx.isAyahAudioDownloaded(item.ayah) ? 'Ayah MP3 downloaded' : 'Download ayah audio as MP3',
      title: !((_item$ayah3 = item.ayah) !== null && _item$ayah3 !== void 0 && _item$ayah3.audio) ? 'Audio unavailable' : _ctx.isAyahAudioDownloading(item.ayah) ? 'Downloading...' : _ctx.isAyahAudioDownloaded(item.ayah) ? 'Downloaded' : 'Download MP3'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isAyahAudioDownloading(item.ayah) ? 'bi-arrow-repeat ic-spin' : _ctx.isAyahAudioDownloaded(item.ayah) ? 'bi-check-circle-fill' : 'bi-cloud-arrow-down-fill']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_391), _ctx.openAyahPlaylistMenuKey === _ctx.buildAyahKey((_ctx$surahDetails2 = _ctx.surahDetails) === null || _ctx$surahDetails2 === void 0 ? void 0 : _ctx$surahDetails2.surahNumber, item.ayah.numberInSurah || item.ayah.number) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 0,
      class: "ayah-playlist-menu",
      onClick: _cache[135] || (_cache[135] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
    }, [_ctx.isAyahInAnyCustomPlaylist(item.ayah) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 0
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "ayah-playlist-menu-item is-danger",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.removeAyahFromAllCustomPlaylists(item.ayah), ["stop"])
    }, [...(_cache[404] || (_cache[404] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Remove from all playlists", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-trash",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_392), _ctx.getAyahPlaylistsContainingAyah(item.ayah).length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_393, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["ayah-playlist-menu-item ayah-playlist-menu-item-submenu is-danger", {
        'is-open': _ctx.openAyahPlaylistExistingSubmenuKey === _ctx.buildAyahKey((_ctx$surahDetails3 = _ctx.surahDetails) === null || _ctx$surahDetails3 === void 0 ? void 0 : _ctx$surahDetails3.surahNumber, item.ayah.numberInSurah || item.ayah.number)
      }]),
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.toggleAyahExistingPlaylistSubmenu(item.ayah), ["stop"])
    }, [...(_cache[405] || (_cache[405] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Remove from selected playlist", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-chevron-left",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 10 /* CLASS, PROPS */, _hoisted_394), _ctx.openAyahPlaylistExistingSubmenuKey === _ctx.buildAyahKey((_ctx$surahDetails4 = _ctx.surahDetails) === null || _ctx$surahDetails4 === void 0 ? void 0 : _ctx$surahDetails4.surahNumber, item.ayah.numberInSurah || item.ayah.number) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 0,
      class: "ayah-playlist-submenu",
      onClick: _cache[133] || (_cache[133] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
    }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.getAyahPlaylistsContainingAyah(item.ayah), playlist => {
      var _ctx$surahDetails5;
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
        key: `ayah-remove-${playlist.id}-${_ctx.buildAyahKey((_ctx$surahDetails5 = _ctx.surahDetails) === null || _ctx$surahDetails5 === void 0 ? void 0 : _ctx$surahDetails5.surahNumber, item.ayah.numberInSurah || item.ayah.number)}`,
        type: "button",
        class: "ayah-playlist-menu-item ayah-playlist-menu-item-playlist is-danger",
        onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.removeAyahFromCustomPlaylist(item.ayah, playlist.id), ["stop"])
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(playlist.name || "Untitled Playlist"), 1 /* TEXT */), _cache[406] || (_cache[406] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-dash-circle",
        "aria-hidden": "true"
      }, null, -1 /* CACHED */))], 8 /* PROPS */, _hoisted_395);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64 /* STABLE_FRAGMENT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 1
    }, [_ctx.sortedCustomPlaylists.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_396, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["ayah-playlist-menu-item ayah-playlist-menu-item-submenu", {
        'is-open': _ctx.openAyahPlaylistExistingSubmenuKey === _ctx.buildAyahKey((_ctx$surahDetails6 = _ctx.surahDetails) === null || _ctx$surahDetails6 === void 0 ? void 0 : _ctx$surahDetails6.surahNumber, item.ayah.numberInSurah || item.ayah.number)
      }]),
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.toggleAyahExistingPlaylistSubmenu(item.ayah), ["stop"])
    }, [...(_cache[407] || (_cache[407] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Save to existing playlist", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-chevron-left",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 10 /* CLASS, PROPS */, _hoisted_397), _ctx.openAyahPlaylistExistingSubmenuKey === _ctx.buildAyahKey((_ctx$surahDetails7 = _ctx.surahDetails) === null || _ctx$surahDetails7 === void 0 ? void 0 : _ctx$surahDetails7.surahNumber, item.ayah.numberInSurah || item.ayah.number) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 0,
      class: "ayah-playlist-submenu",
      onClick: _cache[134] || (_cache[134] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
    }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.sortedCustomPlaylists, playlist => {
      var _ctx$surahDetails8;
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
        key: `ayah-${playlist.id}-${_ctx.buildAyahKey((_ctx$surahDetails8 = _ctx.surahDetails) === null || _ctx$surahDetails8 === void 0 ? void 0 : _ctx$surahDetails8.surahNumber, item.ayah.numberInSurah || item.ayah.number)}`,
        type: "button",
        class: "ayah-playlist-menu-item ayah-playlist-menu-item-playlist",
        disabled: _ctx.isAyahInCustomPlaylist(item.ayah, playlist.id),
        onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.saveAyahToCustomPlaylist(item.ayah, playlist.id), ["stop"])
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(playlist.name || "Untitled Playlist"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isAyahInCustomPlaylist(item.ayah, playlist.id) ? 'bi-check-circle-fill' : 'bi-plus-circle']),
        "aria-hidden": "true"
      }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_398);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "ayah-playlist-menu-item",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.openCreatePlaylistModal(item.ayah), ["stop"])
    }, " Save to new playlist ", 8 /* PROPS */, _hoisted_399)], 64 /* STABLE_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "feedback-fade"
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => {
        var _ctx$surahDetails9, _ctx$surahDetails0, _ctx$surahDetails1, _ctx$surahDetails10, _ctx$surahDetails11, _ctx$surahDetails12, _ctx$surahDetails13, _ctx$surahDetails14, _ctx$surahDetails15;
        return [_ctx.feedbackMessages[_ctx.buildAyahKey((_ctx$surahDetails9 = _ctx.surahDetails) === null || _ctx$surahDetails9 === void 0 ? void 0 : _ctx$surahDetails9.surahNumber, item.ayah.numberInSurah || item.ayah.number)] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
          key: 0,
          class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["badge rounded-pill feedback-badge ayah-feedback-message", _ctx.feedbackMessages[_ctx.buildAyahKey((_ctx$surahDetails0 = _ctx.surahDetails) === null || _ctx$surahDetails0 === void 0 ? void 0 : _ctx$surahDetails0.surahNumber, item.ayah.numberInSurah || item.ayah.number)].class])
        }, [_ctx.feedbackMessages[_ctx.buildAyahKey((_ctx$surahDetails1 = _ctx.surahDetails) === null || _ctx$surahDetails1 === void 0 ? void 0 : _ctx$surahDetails1.surahNumber, item.ayah.numberInSurah || item.ayah.number)].icon === 'check' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_400)) : _ctx.feedbackMessages[_ctx.buildAyahKey((_ctx$surahDetails10 = _ctx.surahDetails) === null || _ctx$surahDetails10 === void 0 ? void 0 : _ctx$surahDetails10.surahNumber, item.ayah.numberInSurah || item.ayah.number)].icon === 'trash' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_401)) : _ctx.feedbackMessages[_ctx.buildAyahKey((_ctx$surahDetails11 = _ctx.surahDetails) === null || _ctx$surahDetails11 === void 0 ? void 0 : _ctx$surahDetails11.surahNumber, item.ayah.numberInSurah || item.ayah.number)].icon === 'warning' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_402)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.feedbackMessages[_ctx.buildAyahKey((_ctx$surahDetails12 = _ctx.surahDetails) === null || _ctx$surahDetails12 === void 0 ? void 0 : _ctx$surahDetails12.surahNumber, item.ayah.numberInSurah || item.ayah.number)].text) + " ", 1 /* TEXT */), _ctx.feedbackMessages[_ctx.buildAyahKey((_ctx$surahDetails13 = _ctx.surahDetails) === null || _ctx$surahDetails13 === void 0 ? void 0 : _ctx$surahDetails13.surahNumber, item.ayah.numberInSurah || item.ayah.number)].link ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
          key: 3,
          class: "auth-alert-link ms-1",
          href: _ctx.feedbackMessages[_ctx.buildAyahKey((_ctx$surahDetails14 = _ctx.surahDetails) === null || _ctx$surahDetails14 === void 0 ? void 0 : _ctx$surahDetails14.surahNumber, item.ayah.numberInSurah || item.ayah.number)].link,
          onClick: _cache[136] || (_cache[136] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.feedbackMessages[_ctx.buildAyahKey((_ctx$surahDetails15 = _ctx.surahDetails) === null || _ctx$surahDetails15 === void 0 ? void 0 : _ctx$surahDetails15.surahNumber, item.ayah.numberInSurah || item.ayah.number)].linkText || "Log in"), 9 /* TEXT, PROPS */, _hoisted_403)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
      }),
      _: 2 /* DYNAMIC */
    }, 1024 /* DYNAMIC_SLOTS */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Desktop Layout: Icons on Left "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "row d-none d-md-flex",
      role: "group",
      "aria-label": "Ayah controls (desktop)",
      "aria-hidden": _ctx.isMobile
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_405, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_406, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['arabic-text rtl-text text-end mb-3', {
        'arabic-text--active': _ctx.currentlyPlayingIndex === item.index && _ctx.isAudioPlaying[item.index]
      }]),
      innerHTML: _ctx.highlightedText(item.ayah),
      onClick: $event => _ctx.onAyahWordClick(item, $event),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(`font-size: ${_ctx.effectiveArabicFontSize}px !important;`)
    }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_407), _ctx.isTranslationVisibleFor(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_408, [...(_cache[408] || (_cache[408] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
      class: "mb-0"
    }, " Translation: ", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["translation-row", {
        'translation-row--collapsed': !_ctx.isTranslationVisibleFor(item)
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_409, [_ctx.isTranslationVisibleFor(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_410, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['fw-regular ltr-text flex-grow-1 translation-text', {
        'translation-text--active': _ctx.currentlyPlayingIndex === item.index && _ctx.isAudioPlaying[item.index],
        'translation-text--placeholder': !item.ayah.translation
      }]),
      innerHTML: _ctx.highlightText(_ctx.getTranslationText(item)),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(`font-size: ${_ctx.effectiveAyahBodyFontSize}px !important;`)
    }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_411)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 1
    }, [], 64 /* STABLE_FRAGMENT */)), _ctx.isTransliterationVisibleFor(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_412, [...(_cache[409] || (_cache[409] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
      class: "mb-0"
    }, " Transliteration: ", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.isTransliterationVisibleFor(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
      key: 3,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['fw-regular ltr-text flex-grow-1 transliteration-text', {
        'transliteration-text--active': _ctx.currentlyPlayingIndex === item.index && _ctx.isAudioPlaying[item.index]
      }]),
      innerHTML: _ctx.highlightText(item.ayah.transliteration || _ctx.transliterationFallbackText),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(`font-size: ${_ctx.effectiveAyahBodyFontSize}px !important;`)
    }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_413)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_414, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "action-pill",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.copyAyah(item.ayah), ["stop"]),
      "aria-label": "Copy ayah",
      title: "Copy ayah"
    }, [...(_cache[410] || (_cache[410] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clipboard",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Copy", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_415), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "action-pill",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.shareOnWhatsApp(item.ayah), ["stop"]),
      "aria-label": "Share ayah",
      title: "Share ayah"
    }, [...(_cache[411] || (_cache[411] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-send",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Share", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_416), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["action-pill", {
        'is-active': _ctx.isTafsirModalOpenFor(item)
      }]),
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.toggleAyahTafsir(item), ["stop"]),
      "aria-label": "Open tafsir",
      title: "Open tafsir"
    }, [...(_cache[412] || (_cache[412] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-journal-richtext",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Tafsir", -1 /* CACHED */)]))], 10 /* CLASS, PROPS */, _hoisted_417)])])], 2 /* CLASS */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_418, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_419, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn mb-3",
      onClick: $event => _ctx.toggleAudioPlayer(item.index),
      "aria-label": _ctx.isAudioPlaying[item.index] ? 'Pause ayah ' + (item.index + 1) : 'Play ayah ' + (item.index + 1),
      title: _ctx.isAudioPlaying[item.index] ? 'Pause' : 'Play'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isAudioPlaying[item.index] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_420)])])], 8 /* PROPS */, _hoisted_404), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile/Tablet Layout: Text then Icons "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      style: {},
      class: "d-block d-md-none",
      role: "group",
      "aria-label": "Ayah controls (mobile)",
      "aria-hidden": !_ctx.isMobile
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['arabic-text rtl-text text-end mb-3', {
        'arabic-text--active': _ctx.currentlyPlayingIndex === item.index && _ctx.isAudioPlaying[item.index]
      }]),
      innerHTML: _ctx.highlightedText(item.ayah),
      onClick: $event => _ctx.onAyahWordClick(item, $event),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(`font-size: ${_ctx.effectiveArabicFontSize}px !important;`)
    }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_422), _ctx.isTranslationVisibleFor(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_423, [...(_cache[413] || (_cache[413] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
      class: "mb-0"
    }, " Translation: ", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.isTranslationVisibleFor(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_424, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['fw-regular ltr-text flex-grow-1 translation-text', {
        'translation-text--active': _ctx.currentlyPlayingIndex === item.index && _ctx.isAudioPlaying[item.index],
        'translation-text--placeholder': !item.ayah.translation
      }]),
      innerHTML: _ctx.highlightText(_ctx.getTranslationText(item)),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(`font-size: ${_ctx.effectiveAyahBodyFontSize}px !important;`)
    }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_425)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 2
    }, [], 64 /* STABLE_FRAGMENT */)), _ctx.isTransliterationVisibleFor(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_426, [...(_cache[414] || (_cache[414] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
      class: "mb-0"
    }, " Transliteration: ", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.isTransliterationVisibleFor(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
      key: 4,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['fw-regular ltr-text flex-grow-1 transliteration-text', {
        'transliteration-text--active': _ctx.currentlyPlayingIndex === item.index && _ctx.isAudioPlaying[item.index]
      }]),
      innerHTML: _ctx.highlightText(item.ayah.transliteration || _ctx.transliterationFallbackText),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(`font-size: ${_ctx.effectiveAyahBodyFontSize}px !important;`)
    }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_427)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_428, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "action-pill",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.copyAyah(item.ayah), ["stop"]),
      "aria-label": "Copy ayah",
      title: "Copy ayah"
    }, [...(_cache[415] || (_cache[415] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clipboard",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Copy", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_429), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "action-pill",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.shareOnWhatsApp(item.ayah), ["stop"]),
      "aria-label": "Share ayah",
      title: "Share ayah"
    }, [...(_cache[416] || (_cache[416] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-send",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Share", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_430), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["action-pill", {
        'is-active': _ctx.isTafsirModalOpenFor(item)
      }]),
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.toggleAyahTafsir(item), ["stop"]),
      "aria-label": "Open tafsir",
      title: "Open tafsir"
    }, [...(_cache[417] || (_cache[417] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-journal-richtext",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Tafsir", -1 /* CACHED */)]))], 10 /* CLASS, PROPS */, _hoisted_431), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["action-pill reflection-pill-fill", {
        'has-reflection': _ctx.hasReflection(item.ayah)
      }]),
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.openReflectionModal(item.ayah), ["stop"]),
      "aria-label": _ctx.hasReflection(item.ayah) ? 'Edit reflection' : 'Add reflection',
      title: _ctx.hasReflection(item.ayah) ? 'Edit reflection' : 'Add reflection'
    }, [_cache[418] || (_cache[418] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-journal-text",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hasReflection(item.ayah) ? 'Reflected' : 'Reflect'), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_432)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_433, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_434, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn ayah-inline-btn ayah-inline-btn--font-down",
      onClick: _cache[137] || (_cache[137] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => _ctx.decreaseFontSize && _ctx.decreaseFontSize(...args), ["stop", "prevent"])),
      "aria-label": "Decrease font size",
      title: "Decrease Font Size"
    }, [...(_cache[419] || (_cache[419] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-dash-circle-fill ayah-inline-icon",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "ayah-inline-control-label"
    }, "Text size -", -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_435, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn ayah-inline-btn ayah-inline-btn--font-up",
      onClick: _cache[138] || (_cache[138] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => _ctx.increaseFontSize && _ctx.increaseFontSize(...args), ["stop", "prevent"])),
      "aria-label": "Increase font size",
      title: "Increase Font Size"
    }, [...(_cache[420] || (_cache[420] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-plus-circle-fill ayah-inline-icon",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "ayah-inline-control-label"
    }, "Text size +", -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_436, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn ayah-inline-btn ayah-inline-btn--rewind",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.rewindAudio(item.index), ["stop", "prevent"]),
      "aria-label": "Rewind 15 seconds",
      title: "Rewind"
    }, [...(_cache[421] || (_cache[421] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-skip-backward-circle-fill ayah-inline-icon",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "ayah-inline-control-label"
    }, "Rewind 15s", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_437)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_438, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["icon-btn ayah-inline-btn ayah-inline-btn--play", {
        'is-active': _ctx.isAudioPlaying[item.index]
      }]),
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.toggleAudioPlayer(item.index), ["stop", "prevent"]),
      "aria-label": _ctx.isAudioPlaying[item.index] ? 'Pause ayah ' + (item.index + 1) : 'Play ayah ' + (item.index + 1),
      title: _ctx.isAudioPlaying[item.index] ? 'Pause' : 'Play'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi ayah-inline-icon ayah-inline-icon--play", _ctx.isAudioPlaying[item.index] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_440, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isAudioPlaying[item.index] ? "Pause verse" : "Play verse"), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_439)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_441, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn ayah-inline-btn ayah-inline-btn--forward",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.fastForwardAudio(item.index), ["stop", "prevent"]),
      "aria-label": "Fast forward 20 seconds",
      title: "Fast Forward"
    }, [...(_cache[422] || (_cache[422] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-skip-forward-circle-fill ayah-inline-icon",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "ayah-inline-control-label"
    }, "Forward 20s", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_442)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"col text-center\" style=\"padding: 2px\">\n                                    <button class=\"icon-btn reflection-btn\"\n                                        :class=\"{ 'has-reflection': hasReflection(item.ayah) }\"\n                                        @click.stop=\"openReflectionModal(item.ayah)\"\n                                        :aria-label=\"hasReflection(item.ayah)\n                                            ? 'Edit reflection'\n                                            : 'Add reflection'\"\n                                        :title=\"hasReflection(item.ayah)\n                                            ? 'Edit reflection'\n                                            : 'Add reflection'\">\n                                        <i class=\"bi bi-journal-text\" style=\"font-size: 1.6rem\" aria-hidden=\"true\"></i>\n                                    </button>\n                                </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_443, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["icon-btn ayah-inline-btn ayah-inline-btn--bookmark", {
        'is-saved': _ctx.isAyahSaved(item.ayah)
      }]),
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.toggleBookmark(item.ayah), ["stop"]),
      title: _ctx.isAyahSaved(item.ayah) ? 'Remove bookmark' : 'Quick save bookmark',
      "aria-label": _ctx.isAyahSaved(item.ayah) ? 'Remove verse bookmark' : 'Save verse bookmark'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi ayah-inline-icon", _ctx.isAyahSaved(item.ayah) ? 'bi-bookmark-check-fill' : 'bi-bookmark-plus-fill']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_445, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isAyahSaved(item.ayah) ? "Remove bookmark" : "Save bookmark"), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_444)])])], 8 /* PROPS */, _hoisted_421)])], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_375);
  }), 128 /* KEYED_FRAGMENT */))], 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Screen reader live region "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_446, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.screenReaderMessage), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Empty state "), !_ctx.isLoading && _ctx.surahDetails && _ctx.filteredAyahs.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_447, " No verses match your current search or filters. ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_bookmark_modal, {
    ayah: _ctx.activeAyah,
    onSaved: _ctx.onBookmarkSaved
  }, null, 8 /* PROPS */, ["ayah", "onSaved"]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal fade surat-onboarding-shell",
    id: _ctx.suratOnboardingModalId,
    tabindex: "-1",
    "aria-labelledby": "suratOnboardingLabel",
    "aria-hidden": "true",
    "data-bs-backdrop": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_449, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_450, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_451, [_cache[426] || (_cache[426] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "modal-title",
    id: "suratOnboardingLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-map-marked-alt me-2",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Surat onboarding guide")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "surat-onboarding-subtitle mb-0"
  }, " Most important features first, with simple explanations. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_452, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "surat-onboarding-font-btn",
    onClick: _cache[145] || (_cache[145] = (...args) => _ctx.decreaseSuratOnboardingFontSize && _ctx.decreaseSuratOnboardingFontSize(...args)),
    disabled: _ctx.suratOnboardingFontSize <= _ctx.suratOnboardingFontSizeMin,
    "aria-label": "Decrease onboarding font size",
    title: "Decrease font size"
  }, [...(_cache[423] || (_cache[423] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-minus",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_453), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "surat-onboarding-font-btn",
    onClick: _cache[146] || (_cache[146] = (...args) => _ctx.increaseSuratOnboardingFontSize && _ctx.increaseSuratOnboardingFontSize(...args)),
    disabled: _ctx.suratOnboardingFontSize >= _ctx.suratOnboardingFontSizeMax,
    "aria-label": "Increase onboarding font size",
    title: "Increase font size"
  }, [...(_cache[424] || (_cache[424] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-plus",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_454), _cache[425] || (_cache[425] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close onboarding modal"
  }, null, -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-body",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      '--surat-onboarding-font-size': _ctx.suratOnboardingFontSize + 'px'
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_455, [_cache[428] || (_cache[428] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-search surat-onboarding-search-icon",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "search",
    class: "form-control surat-onboarding-search-input",
    "onUpdate:modelValue": _cache[147] || (_cache[147] = $event => _ctx.suratOnboardingSearchQuery = $event),
    placeholder: "Search onboarding features...",
    "aria-label": "Search surat onboarding features"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.suratOnboardingSearchQuery]]), _ctx.suratOnboardingSearchQuery ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn btn-link surat-onboarding-search-clear",
    onClick: _cache[148] || (_cache[148] = (...args) => _ctx.clearSuratOnboardingSearch && _ctx.clearSuratOnboardingSearch(...args)),
    "aria-label": "Clear onboarding search"
  }, [...(_cache[427] || (_cache[427] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-times",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Clear ", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_456, " Showing " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.filteredSuratOnboardingFeatures.length) + " of " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.suratOnboardingFeatures.length) + " features ", 1 /* TEXT */), _ctx.filteredSuratOnboardingFeatures.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_457, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.filteredSuratOnboardingFeatures, feature => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: feature.id,
      class: "surat-onboarding-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_458, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_459, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_460, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", feature.iconClass || 'fa-info-circle'])
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_461, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(feature.area), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_462, "#" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(feature.priority), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
      class: "surat-onboarding-title",
      innerHTML: _ctx.highlightSuratOnboardingText(feature.title)
    }, null, 8 /* PROPS */, _hoisted_463), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "surat-onboarding-summary mb-2",
      innerHTML: _ctx.highlightSuratOnboardingText(feature.summary)
    }, null, 8 /* PROPS */, _hoisted_464), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_465, [_cache[429] || (_cache[429] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "surat-onboarding-how-label"
    }, "How to use:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      innerHTML: _ctx.highlightSuratOnboardingText(feature.howTo)
    }, null, 8 /* PROPS */, _hoisted_466)])]);
  }), 128 /* KEYED_FRAGMENT */))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_467, " No features matched \"" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.suratOnboardingSearchQuery) + "\". ", 1 /* TEXT */))], 4 /* STYLE */)])])], 8 /* PROPS */, _hoisted_448)])), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal fade translation-compare-shell",
    id: _ctx.translationCompareModalId,
    tabindex: "-1",
    "aria-labelledby": "translationCompareLabel",
    "aria-hidden": "true",
    "data-bs-backdrop": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_469, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_470, [_cache[443] || (_cache[443] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "translation-compare-header-copy"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "modal-title mb-1",
    id: "translationCompareLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Compare English translations")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "translation-compare-subtitle mb-0"
  }, " Keep tajweed and word tools active while comparing side by side. ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "translation-compare-header-actions"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close compare translations modal"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-body",
    tabindex: "0",
    onKeydown: [_cache[167] || (_cache[167] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.stepTranslationCompareAyah(-1), ["prevent"]), ["left"])), _cache[168] || (_cache[168] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.stepTranslationCompareAyah(1), ["prevent"]), ["right"]))]
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_471, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_472, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_473, " Surah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.translationCompareSurahNumber) + " · Ayah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.translationCompareAyahNumber) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Math.max(_ctx.translationCompareTotalAyahs, 1)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn translation-compare-collapse-btn",
    "aria-expanded": _ctx.translationCompareInlineCollapsed ? 'false' : 'true',
    "aria-label": _ctx.translationCompareInlineCollapsed ? 'Show highlight and tools' : 'Hide highlight and tools',
    "aria-controls": "translationCompareInlineTools",
    onClick: _cache[149] || (_cache[149] = (...args) => _ctx.toggleTranslationCompareInlineCollapsed && _ctx.toggleTranslationCompareInlineCollapsed(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.translationCompareInlineCollapsed ? 'bi-chevron-down' : 'bi-chevron-up']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_474)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_475, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_476, [_cache[430] || (_cache[430] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Surah", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select translation-compare-select",
    "onUpdate:modelValue": _cache[150] || (_cache[150] = $event => _ctx.translationCompareSurahNumber = $event),
    onChange: _cache[151] || (_cache[151] = (...args) => _ctx.applyTranslationCompareSurahSelection && _ctx.applyTranslationCompareSurahSelection(...args)),
    "aria-label": "Select surah for translation comparison"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.surahs, surah => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: `compare-surah-${surah.number}`,
      value: Number(surah.number)
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.number) + ". " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.englishName), 9 /* TEXT, PROPS */, _hoisted_477);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.translationCompareSurahNumber, void 0, {
    number: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_478, [_cache[433] || (_cache[433] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Ayah", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_479, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn translation-compare-nav-btn",
    onClick: _cache[152] || (_cache[152] = $event => _ctx.stepTranslationCompareAyah(-1)),
    disabled: _ctx.translationCompareAyahNumber <= 1,
    "aria-label": "Go to previous ayah"
  }, [...(_cache[431] || (_cache[431] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chevron-left",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_480), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: "form-control translation-compare-ayah-input",
    value: _ctx.translationCompareAyahNumber,
    min: 1,
    max: Math.max(_ctx.translationCompareTotalAyahs, 1),
    onChange: _cache[153] || (_cache[153] = (...args) => _ctx.onTranslationCompareAyahInputChange && _ctx.onTranslationCompareAyahInputChange(...args)),
    "aria-label": "Ayah number for comparison"
  }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_481), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn translation-compare-nav-btn",
    onClick: _cache[154] || (_cache[154] = $event => _ctx.stepTranslationCompareAyah(1)),
    disabled: _ctx.translationCompareAyahNumber >= _ctx.translationCompareTotalAyahs,
    "aria-label": "Go to next ayah"
  }, [...(_cache[432] || (_cache[432] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chevron-right",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_482)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_483, [_cache[434] || (_cache[434] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Translation A", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select translation-compare-select",
    "onUpdate:modelValue": _cache[155] || (_cache[155] = $event => _ctx.translationComparePrimaryTranslation = $event),
    onChange: _cache[156] || (_cache[156] = (...args) => _ctx.onTranslationComparePrimaryChange && _ctx.onTranslationComparePrimaryChange(...args)),
    "aria-label": "Select first translation"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.englishTranslationsSorted, translation => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: `compare-primary-${translation.identifier}`,
      value: translation.identifier,
      disabled: translation.identifier === _ctx.translationCompareSecondaryTranslation && translation.identifier !== _ctx.translationComparePrimaryTranslation
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(translation.englishName), 9 /* TEXT, PROPS */, _hoisted_484);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.translationComparePrimaryTranslation]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_485, [_cache[435] || (_cache[435] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Translation B", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select translation-compare-select",
    "onUpdate:modelValue": _cache[157] || (_cache[157] = $event => _ctx.translationCompareSecondaryTranslation = $event),
    onChange: _cache[158] || (_cache[158] = (...args) => _ctx.onTranslationCompareSecondaryChange && _ctx.onTranslationCompareSecondaryChange(...args)),
    "aria-label": "Select second translation"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.englishTranslationsSorted, translation => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: `compare-secondary-${translation.identifier}`,
      value: translation.identifier,
      disabled: translation.identifier === _ctx.translationComparePrimaryTranslation && translation.identifier !== _ctx.translationCompareSecondaryTranslation
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(translation.englishName), 9 /* TEXT, PROPS */, _hoisted_486);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.translationCompareSecondaryTranslation]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_487, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_488, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_489, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_490, [_cache[436] || (_cache[436] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Highlight in translations", -1 /* CACHED */)), _ctx.translationCompareHighlightFeedbackLabel ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_491, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.translationCompareHighlightFeedbackLabel), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_492, [_cache[437] || (_cache[437] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    class: "form-control translation-compare-highlight-input",
    "onUpdate:modelValue": _cache[159] || (_cache[159] = $event => _ctx.translationCompareHighlightQuery = $event),
    placeholder: "Type a word or phrase to highlight in both translations",
    "aria-label": "Highlight words in translation columns only"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.translationCompareHighlightQuery]]), _ctx.translationCompareHighlightQuery ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn translation-compare-highlight-clear",
    onClick: _cache[160] || (_cache[160] = $event => _ctx.translationCompareHighlightQuery = ''),
    "aria-label": "Clear translation highlight search"
  }, " Clear ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_493, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn translation-compare-tool-btn", {
      'is-enabled': _ctx.showTajweed
    }]),
    onClick: _cache[161] || (_cache[161] = $event => _ctx.showTajweed = !_ctx.showTajweed)
  }, [...(_cache[438] || (_cache[438] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-palette-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Tajweed", -1 /* CACHED */)]))], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn translation-compare-tool-btn", {
      'is-enabled': _ctx.showWordTranslation
    }]),
    onClick: _cache[162] || (_cache[162] = $event => _ctx.showWordTranslation = !_ctx.showWordTranslation)
  }, [...(_cache[439] || (_cache[439] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-translate",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Word meanings", -1 /* CACHED */)]))], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn translation-compare-tool-btn", {
      'is-enabled': _ctx.showWordTranslationTooltip
    }]),
    onClick: _cache[163] || (_cache[163] = (...args) => _ctx.toggleWordAudioMode && _ctx.toggleWordAudioMode(...args))
  }, [...(_cache[440] || (_cache[440] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-volume-up-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Word tap audio", -1 /* CACHED */)]))], 2 /* CLASS */)])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !_ctx.translationCompareInlineCollapsed]])]), _ctx.translationCompareError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_494, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.translationCompareError), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.translationCompareCurrentAyah ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_495, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_496, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_497, " Surah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.translationCompareSurahNumber) + " · Ayah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.translationCompareAyahNumber), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "translation-compare-arabic-text arabic-text text-end mb-3",
    dir: "rtl",
    innerHTML: _ctx.highlightedText(_ctx.translationCompareCurrentAyah),
    onClick: _cache[164] || (_cache[164] = (...args) => _ctx.onTranslationCompareWordClick && _ctx.onTranslationCompareWordClick(...args)),
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(`font-size: ${_ctx.effectiveArabicFontSize}px !important;`)
  }, null, 12 /* STYLE, PROPS */, _hoisted_498), _ctx.showWordTranslation ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_499, " Interlinear gloss follows the Arabic right-to-left reading flow. ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["translation-compare-grid", {
      'has-two-columns': _ctx.translationCompareDisplayColumns.length === 2
    }]),
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(_ctx.translationCompareGridStyle)
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.translationCompareDisplayColumns, column => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: `translation-col-${column.translation.identifier}`,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["translation-compare-card", `is-${column.variant}`])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_500, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_501, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_502, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(column.translation.englishName), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_503, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(column.translation.identifier), 1 /* TEXT */)])]), _ctx.translationCompareHighlightQuery.trim() ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_504, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.formatTranslationCompareMatchCount(column.matchCount)), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "translation-compare-text mb-0",
      innerHTML: column.html,
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(`font-size: ${_ctx.effectiveAyahBodyFontSize}px !important;`)
    }, null, 12 /* STYLE, PROPS */, _hoisted_505)], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))], 6 /* CLASS, STYLE */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_506, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_507, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn translation-compare-pagination-btn",
    disabled: _ctx.translationCompareAyahNumber <= 1,
    onClick: _cache[165] || (_cache[165] = $event => _ctx.stepTranslationCompareAyah(-1))
  }, [...(_cache[441] || (_cache[441] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chevron-left",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Prev", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_508), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_509, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.translationCompareAyahNumber) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(Math.max(_ctx.translationCompareTotalAyahs, 1)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn translation-compare-pagination-btn",
    disabled: _ctx.translationCompareAyahNumber >= _ctx.translationCompareTotalAyahs,
    onClick: _cache[166] || (_cache[166] = $event => _ctx.stepTranslationCompareAyah(1))
  }, [...(_cache[442] || (_cache[442] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Next", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chevron-right",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_510)])]), _ctx.translationCompareLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_511, " Loading selected translations... ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 32 /* NEED_HYDRATION */)])])], 8 /* PROPS */, _hoisted_468)])), _ctx.showTajweed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    key: 5,
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_512, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_513, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_514, [_cache[444] || (_cache[444] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "modal-title",
    id: "tajweedRulesLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Tajweed rules")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_515, [_ctx.tajweedRulesWithExamples.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_516, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.tajweedRulesWithExamples, rule => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: rule.id,
      class: "tajweed-rule-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_517, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_518, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(rule.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_519, "Ayah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(rule.exampleRef), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "tajweed-rule-example-text",
      dir: "rtl",
      innerHTML: _ctx.formatTajweedText(rule.exampleTajweedText || rule.exampleText)
    }, null, 8 /* PROPS */, _hoisted_520)]);
  }), 128 /* KEYED_FRAGMENT */))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_521, "Tajweed rules are currently unavailable."))])])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_522, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_523, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_524, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_525, [_cache[448] || (_cache[448] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "modal-title",
    id: "surahInfoLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Surah information")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_526, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "surah-info-font-btn",
    onClick: _cache[169] || (_cache[169] = (...args) => _ctx.decreaseSurahInfoFontSize && _ctx.decreaseSurahInfoFontSize(...args)),
    disabled: _ctx.surahInfoFontSize <= _ctx.surahInfoFontSizeMin,
    "aria-label": "Decrease surah info font size",
    title: "Decrease font size"
  }, [...(_cache[445] || (_cache[445] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-dash-lg",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_527), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "surah-info-font-btn",
    onClick: _cache[170] || (_cache[170] = (...args) => _ctx.increaseSurahInfoFontSize && _ctx.increaseSurahInfoFontSize(...args)),
    disabled: _ctx.surahInfoFontSize >= _ctx.surahInfoFontSizeMax,
    "aria-label": "Increase surah info font size",
    title: "Increase font size"
  }, [...(_cache[446] || (_cache[446] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-lg",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_528), _cache[447] || (_cache[447] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  }, null, -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_529, [_ctx.surahInfo ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      '--surah-info-font-size': _ctx.surahInfoFontSize + 'px'
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_530, [_ctx.surahInfo.name ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_531, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahInfo.name), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_532, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahInfo.englishName), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_533, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_534, " Ayahs: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahInfo.numberOfAyahs || ((_ctx$surahDetails16 = _ctx.surahDetails) === null || _ctx$surahDetails16 === void 0 || (_ctx$surahDetails16 = _ctx$surahDetails16.ayahs) === null || _ctx$surahDetails16 === void 0 ? void 0 : _ctx$surahDetails16.length) || "Unknown"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_535, " Revelation Place: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahInfo.revelationType || "Unknown"), 1 /* TEXT */)])]), _ctx.surahInfoShortText ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: "surah-info-lead",
    innerHTML: _ctx.surahInfoShortText
  }, null, 8 /* PROPS */, _hoisted_536)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.surahInfoLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_537, " Loading surah details... ")) : _ctx.surahInfoError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_538, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahInfoError), 1 /* TEXT */)) : _ctx.surahInfoText ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 3,
    class: "surah-info-content",
    innerHTML: _ctx.surahInfoText
  }, null, 8 /* PROPS */, _hoisted_539)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_540, " Detailed info is not available yet. ")), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_541, [_cache[449] || (_cache[449] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Reference: ", -1 /* CACHED */)), _ctx.surahInfoSourceUrl ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
    key: 0,
    href: _ctx.surahInfoSourceUrl,
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahInfoSourceLabel), 9 /* TEXT, PROPS */, _hoisted_542)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_543, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahInfoSourceLabel), 1 /* TEXT */)), _ctx.surahInfoSourceHost ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_544, "(" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahInfoSourceHost) + ")", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 4 /* STYLE */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_545, " Surah details are not available yet. Please try again in a moment. "))])])])])])), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_546, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_547, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_548, [_cache[473] || (_cache[473] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "modal-title",
    id: "surahSettingsLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Display settings")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_549, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_550, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_551, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_552, [_cache[451] || (_cache[451] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Audio reciter", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[171] || (_cache[171] = $event => _ctx.selectedReciter = $event),
    "aria-label": "Select reciter"
  }, [_cache[450] || (_cache[450] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select a reciter", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.recitersSorted, reciter => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: reciter.identifier,
      value: reciter.identifier
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reciter.englishName), 9 /* TEXT, PROPS */, _hoisted_553);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedReciter]]), _cache[452] || (_cache[452] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted d-block mt-1"
  }, " Pick the reciter voice for audio playback. ", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_554, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_555, [_cache[454] || (_cache[454] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Translation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[172] || (_cache[172] = $event => _ctx.selectedTranslation = $event),
    "aria-label": "Select translation"
  }, [_cache[453] || (_cache[453] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select translation", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.translationsSorted, translation => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: translation.identifier,
      value: translation.identifier
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(translation.flag) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(translation.englishName), 9 /* TEXT, PROPS */, _hoisted_556);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedTranslation]]), _cache[455] || (_cache[455] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted d-block mt-1"
  }, " Choose the translation shown under each ayah. ", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_557, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_558, [_cache[457] || (_cache[457] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Tajweed colors & rules", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[173] || (_cache[173] = $event => _ctx.settingsDraft.showTajweed = $event),
    "aria-label": "Enable tajweed colors and rules"
  }, [...(_cache[456] || (_cache[456] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: true
  }, "Enabled", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: false
  }, "Disabled", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.settingsDraft.showTajweed]]), _cache[458] || (_cache[458] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted d-block mt-1"
  }, " Toggle the tajweed-colored text in the Quran and access the tajweed rules legend. ", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_559, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_560, [_cache[459] || (_cache[459] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Audio playback mode", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[174] || (_cache[174] = $event => _ctx.settingsDraft.playbackMode = $event),
    "aria-label": "Select audio playback mode"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.playbackModeOptions, option => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: option.value,
      value: option.value
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.label), 9 /* TEXT, PROPS */, _hoisted_561);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.settingsDraft.playbackMode]]), _ctx.draftPlaybackModeOption && _ctx.draftPlaybackModeOption.description ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_562, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.draftPlaybackModeOption.description), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_563, " Decide whether audio plays continuously, repeats, or stays manual. "))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_564, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_565, [_cache[461] || (_cache[461] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Word-for-word highlighting", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[175] || (_cache[175] = $event => _ctx.settingsDraft.showRealtimeHighlighting = $event),
    "aria-label": "Word-for-word highlighting"
  }, [...(_cache[460] || (_cache[460] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: true
  }, "Enabled", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: false
  }, "Disabled", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.settingsDraft.showRealtimeHighlighting]]), _cache[462] || (_cache[462] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted d-block mt-1"
  }, " Highlight each word as it is recited. ", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_566, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_567, [_cache[464] || (_cache[464] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Word-for-word translation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[176] || (_cache[176] = $event => _ctx.settingsDraft.showWordTranslation = $event),
    "aria-label": "Word-for-word translation"
  }, [...(_cache[463] || (_cache[463] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: true
  }, "Enabled", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: false
  }, "Disabled", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.settingsDraft.showWordTranslation]]), _cache[465] || (_cache[465] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted d-block mt-1"
  }, " Show a brief translation beneath each Arabic word. ", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_568, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_569, [_cache[467] || (_cache[467] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Word tooltip + tap audio", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[177] || (_cache[177] = $event => _ctx.settingsDraft.showWordTranslationTooltip = $event),
    "aria-label": "Word tooltip and tap audio"
  }, [...(_cache[466] || (_cache[466] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: true
  }, "Enabled", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: false
  }, "Disabled", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.settingsDraft.showWordTranslationTooltip]]), _cache[468] || (_cache[468] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted d-block mt-1"
  }, " When enabled, hovering shows word translation and tapping a word plays only that word. ", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_570, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_571, [_cache[471] || (_cache[471] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Gesture navigation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[178] || (_cache[178] = $event => _ctx.settingsDraft.gestureNavigationEnabled = $event),
    "aria-label": "Gesture navigation"
  }, [...(_cache[469] || (_cache[469] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: true
  }, "Enabled", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: false
  }, "Disabled", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.settingsDraft.gestureNavigationEnabled]]), _cache[472] || (_cache[472] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted d-block mt-1"
  }, " Swipe left or right on ayah cards to move between verses. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-link surah-gesture-guide-link p-0 mt-2",
    onClick: _cache[179] || (_cache[179] = (...args) => _ctx.openGestureGuideModal && _ctx.openGestureGuideModal(...args)),
    "aria-label": "Open swipe and tap gestures guide modal"
  }, [...(_cache[470] || (_cache[470] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-info-circle me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Open swipe/tap guide ", -1 /* CACHED */)]))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_572, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn surah-settings-submit",
    onClick: _cache[180] || (_cache[180] = (...args) => _ctx.applySettingsModal && _ctx.applySettingsModal(...args)),
    "aria-label": "Apply settings"
  }, " Submit ")])])])])])), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal fade surat-gesture-guide-shell",
    id: _ctx.gestureGuideModalId,
    tabindex: "-1",
    "aria-labelledby": "suratGestureGuideLabel",
    "aria-hidden": "true"
  }, [...(_cache[474] || (_cache[474] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable surat-gesture-modal-dialog"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-content surat-gesture-modal"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "modal-title",
    id: "suratGestureGuideLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Swipe & Tap Gestures Guide")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "surat-gesture-intro mb-0"
  }, " Use these gestures on ayah cards to navigate faster and control playback. ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "surat-gesture-grid"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
    class: "surat-gesture-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "surat-gesture-card-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-left-right",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Swipe Gestures ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", {
    class: "surat-gesture-list mb-0"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Swipe right:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" move to the next ayah and start its audio. ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Swipe left:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" move to the previous ayah and start its audio. ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "At first/last ayah:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" swipe does not wrap around. ")])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
    class: "surat-gesture-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "surat-gesture-card-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-hand-index-thumb",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Tap & Hold Gestures ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", {
    class: "surat-gesture-list mb-0"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Single tap ayah card:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" select the ayah (or pause if it is currently playing). ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Double tap same paused ayah:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" resume playback from that ayah. ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Long press ayah card:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" open the ayah tafsir modal. ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Tap a word:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" when Word tooltip + tap audio is enabled, the tapped word can play with tooltip support. ")])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "surat-gesture-tip mb-0"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Tip: You can enable or disable swipe behavior from Display settings using "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Gesture navigation"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(". ")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary",
    "data-bs-dismiss": "modal"
  }, " Close ")])])], -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_573)])), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [!_ctx.isMobile ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: "offcanvas offcanvas-end quran-font-offcanvas",
    tabindex: "-1",
    id: _ctx.fontPickerOffcanvasId,
    ref: "fontPickerOffcanvas",
    "aria-labelledby": "quranFontOffcanvasLabel"
  }, [_cache[476] || (_cache[476] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "offcanvas-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "offcanvas-title",
    id: "quranFontOffcanvasLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Quran fonts")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "quran-font-subtitle mb-0"
  }, " Select a Quranic script. Preview uses Al-Fatiha 1 with tajweed colors. ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close text-reset",
    "data-bs-dismiss": "offcanvas",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_575, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_576, [_ctx.quranFontsLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_577, " Loading Quran fonts... ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_578, [_ctx.quranFontsError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_579, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.quranFontsError), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_580, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.quranFonts, font => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: font.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["quran-font-option", {
        selected: _ctx.quranFontDraftId === font.id
      }]),
      onClick: $event => _ctx.selectQuranFontDraft(font.id)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_582, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_583, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      class: "form-check-input",
      type: "radio",
      id: `quran-font-${font.inputId}`,
      value: font.id,
      "onUpdate:modelValue": _cache[181] || (_cache[181] = $event => _ctx.quranFontDraftId = $event),
      onClick: _cache[182] || (_cache[182] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
    }, null, 8 /* PROPS */, _hoisted_584), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, _ctx.quranFontDraftId]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "form-check-label",
      for: `quran-font-${font.inputId}`,
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontFamily: font.cssStack
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(font.label), 13 /* TEXT, STYLE, PROPS */, _hoisted_585)]), font.source ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_586, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(font.source), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "quran-font-preview",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontFamily: font.cssStack
      })
    }, [_ctx.fontPreviewLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_587, " Loading preview... ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 1,
      class: "quran-font-preview-text",
      innerHTML: _ctx.getFontPreviewHtml(font)
    }, null, 8 /* PROPS */, _hoisted_588))], 4 /* STYLE */)], 10 /* CLASS, PROPS */, _hoisted_581);
  }), 128 /* KEYED_FRAGMENT */))])])), _ctx.fontPickerAlert ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_589, [_cache[475] || (_cache[475] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check-circle-fill"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.fontPickerAlert), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_590, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary",
    onClick: _cache[183] || (_cache[183] = (...args) => _ctx.closeFontPicker && _ctx.closeFontPicker(...args))
  }, " Cancel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn surah-settings-submit",
    disabled: !_ctx.quranFontDraftId,
    onClick: _cache[184] || (_cache[184] = (...args) => _ctx.applyQuranFontSelection && _ctx.applyQuranFontSelection(...args))
  }, " Submit ", 8 /* PROPS */, _hoisted_591)])])])], 8 /* PROPS */, _hoisted_574)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [_ctx.isMobile ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: "modal fade quran-font-modal",
    id: _ctx.fontPickerModalId,
    tabindex: "-1",
    "aria-labelledby": "quranFontModalLabel",
    "aria-hidden": "true",
    "data-bs-backdrop": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_593, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_594, [_cache[479] || (_cache[479] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title",
    id: "quranFontModalLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Quran fonts")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_595, [_cache[478] || (_cache[478] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "quran-font-subtitle"
  }, " Select a Quranic script. Preview uses Al-Fatiha 1 with tajweed colors. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_596, [_ctx.quranFontsLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_597, " Loading Quran fonts... ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_598, [_ctx.quranFontsError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_599, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.quranFontsError), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_600, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.quranFonts, font => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: font.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["quran-font-option", {
        selected: _ctx.quranFontDraftId === font.id
      }]),
      onClick: $event => _ctx.selectQuranFontDraft(font.id)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_602, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_603, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      class: "form-check-input",
      type: "radio",
      id: `quran-font-mobile-${font.inputId}`,
      value: font.id,
      "onUpdate:modelValue": _cache[185] || (_cache[185] = $event => _ctx.quranFontDraftId = $event),
      onClick: _cache[186] || (_cache[186] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
    }, null, 8 /* PROPS */, _hoisted_604), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, _ctx.quranFontDraftId]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "form-check-label",
      for: `quran-font-mobile-${font.inputId}`,
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontFamily: font.cssStack
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(font.label), 13 /* TEXT, STYLE, PROPS */, _hoisted_605)]), font.source ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_606, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(font.source), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "quran-font-preview",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontFamily: font.cssStack
      })
    }, [_ctx.fontPreviewLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_607, " Loading preview... ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 1,
      class: "quran-font-preview-text",
      innerHTML: _ctx.getFontPreviewHtml(font)
    }, null, 8 /* PROPS */, _hoisted_608))], 4 /* STYLE */)], 10 /* CLASS, PROPS */, _hoisted_601);
  }), 128 /* KEYED_FRAGMENT */))])])), _ctx.fontPickerAlert ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_609, [_cache[477] || (_cache[477] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check-circle-fill"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.fontPickerAlert), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_610, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary",
    onClick: _cache[187] || (_cache[187] = (...args) => _ctx.closeFontPicker && _ctx.closeFontPicker(...args))
  }, " Cancel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn surah-settings-submit",
    disabled: !_ctx.quranFontDraftId,
    onClick: _cache[188] || (_cache[188] = (...args) => _ctx.applyQuranFontSelection && _ctx.applyQuranFontSelection(...args))
  }, " Submit ", 8 /* PROPS */, _hoisted_611)])])])])])], 8 /* PROPS */, _hoisted_592)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Ayah Tafsir Modal "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal fade",
    id: _ctx.tafsirModalId,
    tabindex: "-1",
    "aria-labelledby": "ayahTafsirModalLabel",
    "aria-hidden": "true",
    "data-bs-backdrop": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_613, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_614, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_615, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_616, [_cache[480] || (_cache[480] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Tafsir", -1 /* CACHED */)), _ctx.tafsirModalReference ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_617, " • " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.tafsirModalReference), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    onClick: _cache[189] || (_cache[189] = (...args) => _ctx.hideAyahTafsirModal && _ctx.hideAyahTafsirModal(...args)),
    "aria-label": "Close tafsir modal"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_618, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_619, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_620, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_621, [_cache[481] || (_cache[481] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "ayah-tafsir-meta-label"
  }, "Source", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_622, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.getActiveTafsirSourceLabel()), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_623, [_cache[482] || (_cache[482] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "ayah-tafsir-meta-label"
  }, "Proof", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_624, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.getActiveTafsirProofLabel()), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_625, [_cache[483] || (_cache[483] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "ayah-tafsir-meta-label"
  }, "Reference", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_626, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.getActiveTafsirReferenceLabel()), 1 /* TEXT */)])]), _cache[484] || (_cache[484] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "ayah-tafsir-label mb-1"
  }, "Tafsir", -1 /* CACHED */)), _ctx.isActiveTafsirLoading() ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_627, " Loading tafsir... ")) : _ctx.getActiveTafsirError() ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_628, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.getActiveTafsirError()), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_629, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.getActiveTafsirText() || "No tafsir content available."), 1 /* TEXT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_630, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary",
    onClick: _cache[190] || (_cache[190] = (...args) => _ctx.hideAyahTafsirModal && _ctx.hideAyahTafsirModal(...args))
  }, " Close ")])])])], 8 /* PROPS */, _hoisted_612)])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Notes & Reflections Modal "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_631, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_632, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_633, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_634, [_cache[485] || (_cache[485] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "modal-title",
    id: "reflectionModalLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Sacred Reflection")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    onClick: _cache[191] || (_cache[191] = (...args) => _ctx.hideReflectionModal && _ctx.hideReflectionModal(...args)),
    "aria-label": "Close reflection modal"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_635, [_cache[497] || (_cache[497] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "reflection-intro"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "reflection-intro-title"
  }, "Why reflection matters"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "reflection-intro-copy"
  }, " Capture what the ayah stirs in your heart. Returning to these notes keeps guidance close, deepens remembrance, and turns reading into lived practice. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    class: "d-flex flex-column gap-3 mt-3",
    onSubmit: _cache[198] || (_cache[198] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => _ctx.submitReflectionForm && _ctx.submitReflectionForm(...args), ["prevent"])),
    novalidate: ""
  }, [_ctx.reflectionSuccessMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_636, [_cache[486] || (_cache[486] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check-circle-fill"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.reflectionSuccessMessage), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[487] || (_cache[487] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label fw-bold mb-1 medium-label"
  }, "Title", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    class: "form-control form-control-lg",
    "onUpdate:modelValue": _cache[192] || (_cache[192] = $event => _ctx.reflectionForm.subject = $event),
    placeholder: "Give this reflection a guiding intention",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.reflectionForm.subject]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[488] || (_cache[488] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label fw-bold mb-1 medium-label"
  }, "Message", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    class: "form-control form-control-lg",
    "onUpdate:modelValue": _cache[193] || (_cache[193] = $event => _ctx.reflectionForm.message = $event),
    rows: "5",
    minlength: _ctx.reflectionMessageMinLength,
    placeholder: "Type how this verse moved you today...",
    required: ""
  }, null, 8 /* PROPS */, _hoisted_637), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.reflectionForm.message]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_638, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_639, "Message must be at least " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.reflectionMessageMinLength) + " characters.", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_640, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx.reflectionForm.message || '').trim().length) + " characters", 1 /* TEXT */)])]), _ctx.editingReflectionId ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_641, [_cache[489] || (_cache[489] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Editing saved reflection", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-link btn-sm text-decoration-underline p-0 small",
    onClick: _cache[194] || (_cache[194] = (...args) => _ctx.cancelReflectionEdit && _ctx.cancelReflectionEdit(...args))
  }, "Cancel edit")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["note-suggestions", {
      collapsed: _ctx.carouselCollapsed
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_642, [_cache[490] || (_cache[490] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "fw-semibold text-dark me-2"
  }, "Message prompts"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted"
  }, "Tap to adapt")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-ghost p-0 small",
    onClick: _cache[195] || (_cache[195] = $event => _ctx.carouselCollapsed = !_ctx.carouselCollapsed)
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.carouselCollapsed ? 'bi-chevron-up' : 'bi-chevron-down'])
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.carouselCollapsed ? 'show prompts' : 'collapse'), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_643, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.reflectionMessagePromptRows, (rowPrompts, rowIndex) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: `row-${rowIndex}`,
      class: "suggestion-marquee-row"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_644, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["suggestion-track", {
        'is-paused': _ctx.carouselCollapsed
      }]),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(_ctx.suggestionTrackStyle(rowIndex + 1))
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_645, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(rowPrompts, (prompt, idx) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
        type: "button",
        class: "suggestion-pill light",
        key: `msg-${rowIndex}-${idx}`,
        onClick: $event => _ctx.applyMessageSuggestion(prompt.text)
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_647, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prompt.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prompt.text), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_646);
    }), 128 /* KEYED_FRAGMENT */))])], 6 /* CLASS, STYLE */)])]);
  }), 128 /* KEYED_FRAGMENT */))])], 2 /* CLASS */), _ctx.carouselCollapsed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_648, [_cache[492] || (_cache[492] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-muted small"
  }, "Message prompts are hidden", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn note-suggestions-toggle p-0",
    onClick: _cache[196] || (_cache[196] = $event => _ctx.carouselCollapsed = false)
  }, [...(_cache[491] || (_cache[491] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chevron-down me-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Show prompts ", -1 /* CACHED */)]))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.reflectionErrorMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_649, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.reflectionErrorMessage), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.currentAyahReflections.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_650, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_651, [_cache[493] || (_cache[493] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "reflection-history-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journal-text me-1 reflection-title-icon",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Saved reflections ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_652, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentAyahReflections.length) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentAyahReflections.length === 1 ? 'reflection' : 'reflections'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_653, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentAyahReflections, (note, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: note.id || index,
      class: "reflection-history-entry"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_654, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(note.subject || 'Untitled reflection'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_655, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(note.message), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_656, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn reflection-action edit-action",
      onClick: $event => _ctx.startEditingReflection(note, index)
    }, [...(_cache[494] || (_cache[494] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-pencil",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Edit", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_657), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn reflection-action delete-action",
      onClick: $event => _ctx.deleteReflection(note, index)
    }, [...(_cache[495] || (_cache[495] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-trash",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Delete", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_658)])]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_659, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary btn-lg",
    onClick: _cache[197] || (_cache[197] = (...args) => _ctx.hideReflectionModal && _ctx.hideReflectionModal(...args))
  }, " Cancel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-lg btn-primary ms-2",
    disabled: !_ctx.canSubmitReflection || _ctx.isSavingReflection
  }, [_ctx.isSavingReflection ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_661)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[496] || (_cache[496] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Save reflection ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_660)])], 32 /* NEED_HYDRATION */)])])])])])), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal fade voice-command-guide-shell",
    id: _ctx.voiceCommandGuideModalId,
    tabindex: "-1",
    "aria-labelledby": `${_ctx.voiceCommandGuideModalId}Label`,
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_663, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_664, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_665, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "modal-title mb-1",
    id: `${_ctx.voiceCommandGuideModalId}Label`
  }, [...(_cache[498] || (_cache[498] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-mic me-2",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Voice Command Guide ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_666), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_667, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.voiceCommandGuide.intro), 1 /* TEXT */)]), _cache[499] || (_cache[499] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close voice command guide"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_668, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_669, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["voice-command-availability-card", _ctx.speechRecognitionSupported ? 'is-ready' : 'is-missing'])
  }, [_cache[500] || (_cache[500] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Browser support", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.speechRecognitionSupported ? "Available" : "Unavailable"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.speechRecognitionSupported ? "Speech recognition API is detected." : "Speech recognition API is not available in this browser."), 1 /* TEXT */)], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["voice-command-availability-card", _ctx.isSpeechRecognitionSecureContext() ? 'is-ready' : 'is-missing'])
  }, [_cache[501] || (_cache[501] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Secure context", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isSpeechRecognitionSecureContext() ? "Ready" : "Needs HTTPS"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isSpeechRecognitionSecureContext() ? "HTTPS or localhost is active." : "Voice recognition needs HTTPS or localhost."), 1 /* TEXT */)], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["voice-command-availability-card", _ctx.voiceCommandsEnabled ? 'is-ready' : 'is-neutral'])
  }, [_cache[502] || (_cache[502] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Current status", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.voiceCommandsEnabled ? _ctx.voiceCommandListening ? "Listening" : "Enabled" : "Off"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, " Processing delay: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.voiceCommandCommitDelayMs) + "ms after speech pause. ", 1 /* TEXT */)], 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_670, [_cache[503] || (_cache[503] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, "Guidance", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_671, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.voiceCommandGuide.tips, tip => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: tip
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.voiceCommandGuide.groups, group => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", {
      key: group.id,
      class: "voice-command-guide-group"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_672, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi me-2", group.iconClass]),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(group.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(group.summary), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_673, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(group.commands, command => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
        key: command.id,
        class: "voice-command-guide-command-card"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(command.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_674, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(command.keywords, keyword => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
          key: `${command.id}-${keyword}`,
          class: "voice-command-guide-chip"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(keyword), 1 /* TEXT */);
      }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_675, " Example: \"" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(command.example) + "\" ", 1 /* TEXT */)]);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))]), _cache[504] || (_cache[504] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary",
    "data-bs-dismiss": "modal"
  }, " Close ")], -1 /* CACHED */))])])], 8 /* PROPS */, _hoisted_662)])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Global Custom Audio Player "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [_ctx.bottomAudioPlayerEnabled && _ctx.showAudioPlayer && !_ctx.isSingleWordPreviewActive ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_676, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_677, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_678, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[199] || (_cache[199] = $event => _ctx.rewindAudio(_ctx.currentlyPlayingIndex)),
    class: "control-btn",
    title: "Rewind",
    "aria-label": "Rewind 15 seconds"
  }, [...(_cache[505] || (_cache[505] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-skip-backward-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[200] || (_cache[200] = $event => _ctx.toggleAudioPlayer(_ctx.currentlyPlayingIndex)),
    class: "control-btn play-pause",
    title: "Play/Pause",
    "aria-label": "Play or Pause"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(_ctx.isAudioPlaying[_ctx.currentlyPlayingIndex] ? 'bi bi-pause-fill' : 'bi bi-play-fill')
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[201] || (_cache[201] = $event => _ctx.fastForwardAudio(_ctx.currentlyPlayingIndex)),
    class: "control-btn",
    title: "Fast Forward",
    "aria-label": "Fast forward 20 seconds"
  }, [...(_cache[506] || (_cache[506] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-skip-forward-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[202] || (_cache[202] = $event => _ctx.stopAudio(_ctx.currentlyPlayingIndex)),
    class: "control-btn",
    title: "Stop",
    "aria-label": "Stop"
  }, [...(_cache[507] || (_cache[507] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-stop-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[203] || (_cache[203] = (...args) => _ctx.toggleVolume && _ctx.toggleVolume(...args)),
    class: "control-btn",
    title: "Volume",
    "aria-label": "Toggle volume slider"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", `bi-volume-${_ctx.volume > 0.5 ? 'up' : _ctx.volume > 0 ? 'down' : 'mute'}-fill`])
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[204] || (_cache[204] = (...args) => _ctx.cyclePlaybackSpeed && _ctx.cyclePlaybackSpeed(...args)),
    class: "control-btn speed-control",
    title: 'Speed: ' + _ctx.playbackSpeed + 'x'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-speedometer2",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      color: _ctx.playbackSpeed !== 1 ? '#ff6b6b' : '#ccc'
    })
  }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_680, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.playbackSpeed) + "x", 1 /* TEXT */)], 8 /* PROPS */, _hoisted_679), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[205] || (_cache[205] = (...args) => _ctx.toggleRepeat && _ctx.toggleRepeat(...args)),
    class: "control-btn repeat-control",
    title: _ctx.repeatCurrent ? 'Repeat current ayah: on' : 'Repeat current ayah: off',
    "aria-pressed": _ctx.repeatCurrent,
    "aria-label": "Toggle repeat current ayah"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-repeat",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      color: _ctx.repeatCurrent ? '#00bfa6' : '#ccc'
    })
  }, null, 4 /* STYLE */)], 8 /* PROPS */, _hoisted_681), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[206] || (_cache[206] = (...args) => _ctx.toggleVoiceCommands && _ctx.toggleVoiceCommands(...args)),
    class: "control-btn",
    disabled: !_ctx.speechRecognitionSupported,
    title: !_ctx.speechRecognitionSupported ? 'Voice commands are not supported in this browser.' : _ctx.voiceCommandsEnabled ? 'Voice commands: on' : 'Voice commands: off',
    "aria-label": _ctx.voiceCommandsEnabled ? 'Turn voice commands off' : 'Turn voice commands on'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.voiceCommandsEnabled ? 'bi-mic-fill' : 'bi-mic-mute-fill']),
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      color: _ctx.voiceCommandsEnabled ? '#00bfa6' : '#ccc'
    })
  }, null, 6 /* CLASS, STYLE */)], 8 /* PROPS */, _hoisted_682), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[207] || (_cache[207] = (...args) => _ctx.toggleAudioPlayerQueuePanel && _ctx.toggleAudioPlayerQueuePanel(...args)),
    class: "control-btn",
    title: _ctx.showAudioPlayerQueuePanel ? 'Hide queue' : 'Show queue',
    "aria-expanded": _ctx.showAudioPlayerQueuePanel ? 'true' : 'false',
    "aria-label": "Toggle audio queue panel"
  }, [_cache[508] || (_cache[508] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-music-note-list"
  }, null, -1 /* CACHED */)), _ctx.audioPlayerQueueCount ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_684, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.audioPlayerQueueCount), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 8 /* PROPS */, _hoisted_683), _ctx.showVolumeBar ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_685, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "range",
    "onUpdate:modelValue": _cache[208] || (_cache[208] = $event => _ctx.volume = $event),
    min: "0",
    max: "1",
    step: "0.1",
    onInput: _cache[209] || (_cache[209] = (...args) => _ctx.updateVolume && _ctx.updateVolume(...args)),
    class: "volume-slider"
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.volume]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_686, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.formatTime(((_ctx$audioElements$_c = _ctx.audioElements[_ctx.currentlyPlayingIndex]) === null || _ctx$audioElements$_c === void 0 ? void 0 : _ctx$audioElements$_c.currentTime) || 0)) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.formatTime(((_ctx$audioElements$_c2 = _ctx.audioElements[_ctx.currentlyPlayingIndex]) === null || _ctx$audioElements$_c2 === void 0 ? void 0 : _ctx$audioElements$_c2.duration) || 0)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[210] || (_cache[210] = (...args) => _ctx.closeAudioPlayer && _ctx.closeAudioPlayer(...args)),
    class: "control-btn",
    title: "Close",
    "aria-label": "Close player",
    style: {
      "margin-left": "auto"
    }
  }, [...(_cache[509] || (_cache[509] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg mb-2"
  }, null, -1 /* CACHED */)]))])]), _ctx.showAudioPlayerQueuePanel ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_687, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_688, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[510] || (_cache[510] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Queue", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.audioPlayerQueueCount) + " item" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.audioPlayerQueueCount === 1 ? '' : 's'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "control-btn",
    onClick: _cache[211] || (_cache[211] = (...args) => _ctx.toggleAudioQueueMinimized && _ctx.toggleAudioQueueMinimized(...args)),
    title: _ctx.audioQueueMinimized ? 'Expand queue' : 'Minimize queue',
    "aria-expanded": _ctx.audioQueueMinimized ? 'false' : 'true',
    "aria-label": "Minimize or expand queue"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.audioQueueMinimized ? 'bi-chevron-down' : 'bi-chevron-up'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_689)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [!_ctx.audioPlayerQueueCount ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_690, " No queued ayahs yet. ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.audioPlayerQueueItems, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.id,
      class: "audio-player-queue-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.description), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_691, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "control-btn",
      onClick: $event => _ctx.playAudioQueueItem(item.id),
      title: "Play queued item",
      "aria-label": "Play queued item"
    }, [...(_cache[511] || (_cache[511] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-play-fill"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_692), item.source === 'manual' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: 0,
      type: "button",
      class: "control-btn",
      onClick: $event => _ctx.removeAudioQueueItem(item.id),
      title: "Remove queued item",
      "aria-label": "Remove queued item"
    }, [...(_cache[512] || (_cache[512] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-x-lg"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_693)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]);
  }), 128 /* KEYED_FRAGMENT */)), _ctx.audioPlayerQueue.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_694, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "control-btn",
    onClick: _cache[212] || (_cache[212] = (...args) => _ctx.clearAudioPlayerQueue && _ctx.clearAudioPlayerQueue(...args)),
    title: "Clear queue",
    "aria-label": "Clear queue"
  }, [...(_cache[513] || (_cache[513] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-trash3"
  }, null, -1 /* CACHED */)]))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !_ctx.audioQueueMinimized]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-bar",
    role: "progressbar",
    "aria-label": "Audio playback progress",
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": _ctx.progress[_ctx.currentlyPlayingIndex] || 0,
    "aria-valuetext": `Progress ${Math.round(_ctx.progress[_ctx.currentlyPlayingIndex] || 0)} percent`,
    onClick: _cache[213] || (_cache[213] = (...args) => _ctx.seekToPosition && _ctx.seekToPosition(...args)),
    onMousedown: _cache[214] || (_cache[214] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => _ctx.onProgressDown && _ctx.onProgressDown(...args), ["prevent"])),
    onTouchstartPassive: _cache[215] || (_cache[215] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => _ctx.onProgressDown && _ctx.onProgressDown(...args), ["prevent"])),
    ref: "progressBar"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: _ctx.progress[_ctx.currentlyPlayingIndex] + '%'
    })
  }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_696, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.visualizerBars, (bar, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: index,
      class: "visualizer-bar",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        height: bar + '%',
        animationDelay: index * 0.1 + 's'
      })
    }, null, 4 /* STYLE */);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */)], 40 /* PROPS, NEED_HYDRATION */, _hoisted_695),  false ? (0) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[218] || (_cache[218] = (...args) => _ctx.scrollToTop && _ctx.scrollToTop(...args)),
    class: "surah-scroll-top",
    "aria-label": "Scroll to top"
  }, [...(_cache[515] || (_cache[515] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-up"
  }, null, -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.showScrollTop]])], 6 /* CLASS, STYLE */);
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

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./resources/components/scripts/SuratComponent.script.js?vue&type=script&lang=js&external":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./resources/components/scripts/SuratComponent.script.js?vue&type=script&lang=js&external ***!
  \******************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _utils_quran_mappings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/quran-mappings */ "./resources/js/utils/quran-mappings.js");
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _vue_bookmarks_BookmarkModal_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../vue/bookmarks/BookmarkModal.vue */ "./resources/components/vue/bookmarks/BookmarkModal.vue");
/* harmony import */ var _utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/bookmarkAuth */ "./resources/js/utils/bookmarkAuth.js");
/* harmony import */ var _surat_voice_commands__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./surat.voice-commands */ "./resources/components/scripts/surat.voice-commands.js");
function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable;})),t.push.apply(t,o);}return t;}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach(function(r){_defineProperty(e,r,t[r]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));});}return e;}function _defineProperty(e,r,t){return(r=_toPropertyKey(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e;}function _toPropertyKey(t){var i=_toPrimitive(t,"string");return"symbol"==typeof i?i:i+"";}function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.");}return("string"===r?String:Number)(t);}/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({name:"SuratComponent",components:{BookmarkModal: _vue_bookmarks_BookmarkModal_vue__WEBPACK_IMPORTED_MODULE_3__["default"]},data:function(){return _objectSpread(_objectSpread({// responsive a11y
isMobile:false,isTabletOrMobile:false,isTablet:false,isDesktopWide:false,isReadingFullscreen:false,isDeepFocusMode:false,readingFullscreenBodyClass:"quran-reading-fullscreen-active",readingFullscreenPreferenceBaseKey:"surat_reading_fullscreen_mode",readingFullscreenLastFocusedEl:null,fullscreenChangeHandler:null,userId:null,// a11y
selectedCardIndex:0,ayahCardSwipeState:{active:false,cardIndex:null,startX:0,startY:0,startedAt:0,ignore:false,horizontalLocked:false,wordTooltipTarget:false,longPressTimer:null,longPressTriggered:false},ayahCardPointerState:{active:false,pointerId:null,cardIndex:null,startX:0,startY:0,startedAt:0,ignore:false,horizontalLocked:false,wordTooltipTarget:false,longPressTimer:null,longPressTriggered:false},ayahCardSwipeMinDistance:36,ayahCardSwipeMaxVerticalOffset:68,ayahCardSwipeMaxDurationMs:900,ayahCardSwipeClickSuppressDurationMs:700,ayahCardTapMaxMovementPx:14,ayahCardTapMaxDurationMs:320,ayahCardLongPressDurationMs:560,ayahCardSwipeSuppressClickUntil:0,ayahCardDoubleTapWindowMs:520,ayahCardLastTapAt:0,ayahCardLastTapIndex:null,ayahCardPausedIndex:null,swipeTransitionIndex:null,swipeTransitionDirection:0,swipeTransitionTimer:null,swipeTransitionDurationMs:400,screenReaderMessage:"",isComponentAlive:true,isInitialLoad:true,selectedSurah:"2",selectedReciter:"ar.alafasy",selectedTranslation:"en.ahmedali",transliterationEditionIdentifier:"en.transliteration",isAudioPlaying:[],isAudioLoading:[],isAudioDownloading:{},isAudioDownloaded:{},isSurahAudioDownloading:false,isSurahAudioDownloaded:false,surahAudioMetaByKey:{},surahAudioMetaLoadingByKey:{},surahAudioDownloadedTimer:null,currentlyPlaying:null,currentlyPlayingIndex:0,isVisible:true,surahs:[],reciters:[],translations:[],surahDetails:null,surahInfo:null,surahInfoText:"",surahInfoShortText:"",surahInfoSource:"",surahInfoSourceUrl:"",surahInfoLoading:false,surahInfoError:"",surahInfoModalId:"surahInfoModal",surahInfoModalInstance:null,settingsModalId:"surahSettingsModal",settingsModalInstance:null,gestureGuideModalId:"suratGesturesGuideModal",gestureGuideModalInstance:null,translationCompareModalId:"translationCompareModal",translationCompareModalInstance:null,translationCompareModalShownHandler:null,translationCompareModalHiddenHandler:null,isTranslationCompareModalOpen:false,fontPickerOffcanvasId:"quranFontOffcanvas",fontPickerModalId:"quranFontModal",fontPickerOffcanvasInstance:null,fontPickerModalInstance:null,quranFonts:[],quranFontsLoading:false,quranFontsError:"",selectedQuranFontId:"",quranFontDraftId:"",quranFontPreferenceKey:"suratSelectedFont",quranFontStackPreferenceKey:"suratSelectedFontStack",storedQuranFontStack:"",fontPreviewText:"",fontPreviewTajweedText:"",fontPreviewFallbackText:"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",fontPreviewLoading:false,fontPreviewError:"",fontPickerAlert:"",fontPickerAlertTimer:null,defaultQuranFontStack:"'Scheherazade New', 'Noto Naskh Arabic', 'Amiri', serif",surahInfoFontSize:16,surahInfoFontSizeMin:14,surahInfoFontSizeMax:22,surahInfoFontSizePreferenceBaseKey:"surat_surah_info_font_size",deepFocusModePreferenceBaseKey:"surat_deep_focus_mode",advancedSearchQuery:"",advancedSearchDebounceTimer:null,advancedSearchAbortController:null,advancedSearchResults:[],advancedSearchLoading:false,advancedSearchError:"",advancedSearchTotalMatches:0,advancedSearchMaxResults:Number.MAX_SAFE_INTEGER,advancedSearchHydrationSurahLimit:10,advancedSearchSurahPreviewLimit:Number.MAX_SAFE_INTEGER,advancedSearchExpandedSurahs:{},advancedSearchMinLength:2,isAdvancedSearchVisible:false,isAdvancedSearchPanelVisible:true,speechRecognitionSupported:false,speechRecognitionListening:false,speechRecognitionError:"",speechRecognitionInstance:null,speechRecognitionLocale:"en-US"},_surat_voice_commands__WEBPACK_IMPORTED_MODULE_5__.VOICE_COMMAND_DATA),{},{voiceCommandGuideModalId:"voiceCommandGuideModal",voiceCommandGuide:_surat_voice_commands__WEBPACK_IMPORTED_MODULE_5__.VOICE_COMMAND_GUIDE,suratOnboardingModalId:"suratOnboardingModal",suratOnboardingModalInstance:null,suratOnboardingSearchQuery:"",suratOnboardingFontSize:17,suratOnboardingFontSizeMin:15,suratOnboardingFontSizeMax:22,suratOnboardingFontSizePreferenceBaseKey:"surat_onboarding_font_size",suratReaderFontSizePreferenceBaseKey:"surat_reader_font_sizes",suratPreferenceAnonStorageKey:"ic_surat_pref_anon_id",suratPreferenceAnonId:"",continueProgressStorageKeyBase:"ic_continue_reading_progress",continueProgressStorageMapKey:"ic_continue_reading_progress_map_v1",continueProgressHiddenStorageKeyBase:"ic_continue_reading_hidden",continueProgress:null,continueProgressHidden:false,continueProgressLastSignature:"",continueProgressPersistedAt:0,suratOnboardingFeatures:[{id:"feature-read-flow",priority:1,area:"Reading",iconClass:"fa-book-open",title:"Read ayahs with Arabic, translation, and transliteration",summary:"Each ayah card is built for focused reading, with Arabic text first and optional translation/transliteration beneath it.",howTo:"Select any surah from the sidebar or mobile dropdown, then scroll the ayah cards and toggle translation/transliteration per ayah.",keywords:["read","arabic","translation","transliteration","ayah","surah"]},{id:"feature-audio-playback",priority:2,area:"Audio",iconClass:"fa-headphones",title:"Play ayah audio with full playback controls",summary:"You can play a single ayah or continue through the surah with controls for pause, rewind, forward, speed, volume, and stop.",howTo:"Use the play button on any ayah card. The bottom audio player gives timeline scrubbing and advanced playback controls.",keywords:["audio","play","pause","rewind","speed","volume"]},{id:"feature-advanced-search",priority:3,area:"Search",iconClass:"fa-search",title:"Search across the full Quran instantly",summary:"The advanced search bar scans ayahs and translation content across surahs and shows matched references in a result panel.",howTo:"Use the Search Quran box at the top, type at least 2 characters, then open any result to jump directly to that ayah.",keywords:["search","all","quran","result","jump"]},{id:"feature-voice-search",priority:4,area:"Search",iconClass:"fa-microphone",title:"Use voice search for hands-free discovery",summary:"If your browser supports speech recognition, you can speak your query and run advanced Quran search without typing.",howTo:"Tap the microphone icon inside the advanced search input, speak clearly, then review highlighted matches.",keywords:["voice","microphone","speech","search"]},{id:"feature-reciter-selection",priority:5,area:"Audio",iconClass:"fa-user",title:"Switch reciters to match your listening preference",summary:"You can choose a reciter voice and the audio stream updates to that reciter for surah playback and ayah playback.",howTo:"Change reciter from the sticky toolbar, settings modal, or offcanvas controls.",keywords:["reciter","voice","audio","selection"]},{id:"feature-translation-selection",priority:6,area:"Understanding",iconClass:"fa-language",title:"Choose translation language/version",summary:"Translations can be switched at any time so you read the tafsir-friendly wording that suits your study style.",howTo:"Pick a translation from toolbar settings or offcanvas controls, then ayah cards refresh with the new translation.",keywords:["translation","language","meaning","study"]},{id:"feature-translation-toggle",priority:7,area:"Reading",iconClass:"fa-toggle-on",title:"Toggle translation and transliteration visibility",summary:"You can hide or show translation/transliteration for each ayah and also use global toggles for all visible ayahs.",howTo:"Use the Translation and Transliteration switches in ayah headers, or the toolbar global switch for all cards.",keywords:["toggle","translation","transliteration","show","hide"]},{id:"feature-font-size",priority:8,area:"Accessibility",iconClass:"fa-text-height",title:"Adjust reading font size with + and - controls",summary:"Arabic and supporting text can be scaled up or down, helping you read comfortably on desktop and mobile.",howTo:"Use the +/- icon controls on ayah cards (mobile) to increase or decrease Arabic and translation font sizes.",keywords:["font","size","increase","decrease","plus","minus"]},{id:"feature-quran-font-picker",priority:9,area:"Accessibility",iconClass:"fa-font",title:"Apply Quranic font styles with live preview",summary:"The Quran font picker lets you select a script style and preview it before applying it across the page.",howTo:"Open Quranic fonts from the toolbar, choose a style in the preview list, then submit to apply.",keywords:["font","quranic","script","preview"]},{id:"feature-tajweed",priority:10,area:"Learning",iconClass:"fa-palette",title:"Enable tajweed colors and view tajweed rules",summary:"Tajweed coloring can be turned on for recitation guidance, with a dedicated modal explaining each rule color.",howTo:"Enable tajweed in settings, then open Tajweed rules from the toolbar to learn each highlighted rule.",keywords:["tajweed","rules","color","recitation"]},{id:"feature-word-highlight",priority:11,area:"Learning",iconClass:"fa-highlighter",title:"Turn on word-for-word highlighting during playback",summary:"As audio plays, each spoken word can highlight in sync, helping you track pronunciation and pacing.",howTo:"Enable Word-for-word highlighting in display settings, then play an ayah to follow active word highlights.",keywords:["word","highlight","word-for-word","realtime"]},{id:"feature-word-translation",priority:12,area:"Learning",iconClass:"fa-spell-check",title:"Enable word-for-word translation support",summary:"Word-level translation can be shown so each Arabic segment is easier to connect with meaning while reading.",howTo:"Turn on Word-for-word translation in display settings to render extra guidance beneath Arabic words.",keywords:["word","translation","meaning","learning"]},{id:"feature-bookmarks",priority:13,area:"Study",iconClass:"fa-bookmark",title:"Save ayahs with quick bookmarks",summary:"Any ayah can be bookmarked for later review, creating a fast way to return to verses you are reflecting on.",howTo:"Tap the bookmark icon on an ayah card to save or remove it quickly.",keywords:["bookmark","save","favorite","ayah"]},{id:"feature-share-copy",priority:14,area:"Sharing",iconClass:"fa-share-alt",title:"Copy or share ayahs in one tap",summary:"Built-in quick actions let you copy an ayah text or share it directly to WhatsApp without leaving the page.",howTo:"Use the Copy and Share action pills under each ayah block.",keywords:["copy","share","whatsapp","text"]},{id:"feature-download",priority:15,area:"Offline",iconClass:"fa-download",title:"Download ayah audio and full surah audio",summary:"You can download individual ayah MP3 files or full surah MP3 files for offline listening.",howTo:"Use the download icon on an ayah card, or the toolbar download button for full-surah audio.",keywords:["download","offline","mp3","surah","ayah"]},{id:"feature-surah-info",priority:16,area:"Context",iconClass:"fa-info-circle",title:"Open surah information and metadata",summary:"Surah info gives context such as name, revelation place, ayah count, and additional explanatory content.",howTo:"Press the Info button from toolbar/sidebar/mobile card to open the surah information modal.",keywords:["surah","information","metadata","context"]},{id:"feature-navigation",priority:17,area:"Navigation",iconClass:"fa-compass",title:"Navigate quickly with sidebar and mobile controls",summary:"Desktop sidebar and mobile offcanvas controls help you jump between surahs and keep navigation simple.",howTo:"Use the left sidebar on desktop, or open the sliders icon on mobile/tablet for offcanvas controls.",keywords:["sidebar","navigation","mobile","offcanvas","surah"]},{id:"feature-ui-utilities",priority:18,area:"Utility",iconClass:"fa-sliders-h",title:"Use quick utility controls for focus",summary:"You can hide/show the search panel, collapse/restore sticky tools, and jump back to top with one click.",howTo:"Use top pills and restore buttons around the toolbar area, plus the floating scroll-to-top button.",keywords:["hide","show","toolbar","scroll","top"]}],searchQuery:"",debouncedQuery:"",debounceTimer:null,arabicFontSize:28,translationFontSize:18,transliterationFallbackText:"Transliteration not available",isTranslationVisible:false,translationVisibility:{},isTransliterationVisible:true,transliterationVisibility:{},translationLoadingText:"Loading translation...",translationUnavailableText:"Translation unavailable right now.",translationLazyState:{surahNumber:"",translationId:"",loaded:false,loading:false,error:""},translationLazyCache:{},translationLazyRequestToken:0,// ayah-level tafsir lazy loading
tafsirVisibility:{},tafsirContent:{},tafsirMeta:{},tafsirLoading:{},tafsirError:{},tafsirModalId:"ayahTafsirModal",tafsirModalInstance:null,tafsirModalAyahKey:"",tafsirModalReference:"",tafsirModalHiddenHandler:null,isTafsirModalOpen:false,showTajweed:false,showRealtimeHighlighting:false,showWordTranslation:false,showWordTranslationTooltip:false,gestureNavigationEnabled:true,realtimeHighlightPreferenceKey:"surat_realtime_highlighting",wordTranslationPreferenceKey:"surat_show_word_translation",wordTranslationTooltipPreferenceKey:"surat_show_word_translation_tooltip",gestureNavigationPreferenceKey:"suratGestureNavigationEnabled",progress:[],audioElements:[],playbackSpeed:1.0,volume:1.0,showVolumeBar:false,showAudioPlayer:false,bottomAudioPlayerEnabled:true,isAudioPlayerVisible:true,showAudioPlayerQueuePanel:false,audioQueueMinimized:false,audioPlayerQueue:[],showCustomPlaylistPanel:false,customPlaylistStorageKeyBase:"ic_surat_custom_playlist_v1",playlists:[],activePlaylistId:"",selectedPlaylistItemIds:[],playlistSearchQuery:"",playlistAyahSearchQuery:"",playlistAyahFilterMode:"all",isPlaylistAyahListCollapsed:false,playlistDragItemId:"",playlistDragOverItemId:"",playlistLastDragAt:0,isPlaylistEditorVisible:false,playlistEditorName:"",playlistEditorDescription:"",showPlaylistEditorConfirmAction:false,showCreatePlaylistModal:false,createPlaylistName:"",createPlaylistDescription:"",pendingAyahForNewPlaylist:null,openAyahPlaylistMenuKey:"",openAyahPlaylistExistingSubmenuKey:"",suppressPlaybackScrollSync:false,suppressPlaybackScrollOnce:false,playlistSinglePlayMode:false,isSingleWordPreviewActive:false,isHighlighted:false,showScrollTop:false,// scrubbing state
isScrubbing:false,_boundMove:null,_boundUp:null,wordTimings:[],isLoading:false,isNavigating:false,// Prevents scroll conflicts during jumps
headerCollapsed:false,// Controls whether the toolbar/links are visible
isToolbarPinned:false,isMobileToolbarExpanded:false,firstAyahTop:0,showDesktopToolbar:true,showDesktopSurahContext:true,showMobileSurahInfoCard:true,mobileSurahInfoCardStorageKey:"suratMobileSurahInfoCardHidden",continuousPlayback:false,// Legacy flag; new playbackMode supersedes it
visualizerBars:Array(20).fill(10),playbackSpeeds:[0.5,0.75,1,1.25,1.5],currentSpeedIndex:0,playbackMode:"continuous",preferredPlaybackMode:"continuous",playbackModeOptions:[{value:"continuous",label:"Play the entire surah continuously",description:"Navigate from ayah to ayah without stopping until the surah ends."},{value:"repeat",label:"Repeat the current ayah",description:"Loop just the ayah you are on until you pause or switch it off."},{value:"manual",label:"Play single ayah manually",description:"Listen to one ayah at a time and tap play again when you are ready."}],highlightLeadSeconds:0.05,_lastSegmentIndex:-1,currentAudioIndex:-1,reciterLeadOffsets:{},reciterDefaultLeadOffsets:{"ar.abdulbasitmurattal":0.05,"ar.abdurrahmaansudais":0.05,"ar.hanirifai":0.05,"ar.husary":0.05,"ar.alafasy":0.05,"ar.minshawi":0.05,"ar.saoodshuraym":0.05},reciterTimingMap:{"ar.abdulbasitmurattal":2,"ar.abdurrahmaansudais":3,"ar.hanirifai":5,"ar.husary":6,"ar.alafasy":7,"ar.minshawi":9,"ar.saoodshuraym":10},favoriteReciters:["ar.alafasy","ar.abdulbasitmurattal"],favoriteTranslations:["en.ahmedali","en.sahih"],translationCompareSurahNumber:2,translationCompareAyahNumber:1,translationComparePrimaryTranslation:"",translationCompareSecondaryTranslation:"",translationCompareHighlightQuery:"",translationCompareMaxSelections:2,translationCompareInlineCollapsed:true,translationCompareLoading:false,translationCompareError:"",translationCompareEditionCache:{},translationCompareRequestToken:0,lastAutoScrollAt:0,lastManualNavigationAt:0,isManualScrolling:false,manualScrollTimer:null,autoSyncLockUntil:0,ayahScrubValue:1,// perf throttles
lastProgressAt:0,lastVizAt:0,// track last programmatic scroll to avoid jitter
lastAutoScrollIndex:null,lastProgrammaticScrollAt:0,preferredPlaybackScrollFactor:0.38,_scrollCorrectionTimer:null,_scrollCorrectionToken:0,_navigationSettleTimer:null,_navigationSettleToken:0,navigationTargetIndex:null,navigationTargetTolerance:12,windowLockUntil:0,windowLockIndex:null,// request control
_surahAborter:null,// delayed spinner timers per index
loadingTimers:[],wordPreviewStopTimer:null,// virtualization
itemHeight:280,windowSize:22,buffer:6,longSurahVirtualThreshold:140,longSurahWindowSize:14,longSurahBuffer:4,visibleStart:0,visibleEnd:0,listTop:0,_heightMeasureRaf:null,_virtualWindowRaf:null,itemHeightCalibrated:false,// Next-step card visibility
showNextStep:true,nextStepMinimized:false,activeAyah:null,savedAyahKeys:{},savedAyahsLoaded:false,savedAyahClearTimer:null,pinnedAyahs:{},pinnedAyahStorageKeyBase:"ic_surat_pinned_ayahs",pinnedAyahStorageKey:"",pinnedSectionUiStateStorageKeyBase:"ic_surat_pinned_ayahs_ui",pinnedSectionUiStateStorageKey:"",isPinnedSectionCollapsed:false,isPinnedSectionHidden:false,bookmarkStorageUserId:null,bookmarkAnonId:null,savedAyahStorageKey:"ic_saved_ayahs_session",feedbackMessages:{},// Keyed by ayahID, value: { text, class }
bookmarkToast:"",bookmarkToastAction:null,bookmarkToastTimer:null,bookmarkInstanceId:`surat-${Math.random().toString(36).slice(2)}`,bookmarkEventHandler:null,bookmarkStorageHandler:null,visibilityHandler:null,authAlert:"",authAlertTimer:null,deepLinkTarget:null,deepLinkHandled:false,bookmarkAuthenticated:false,ayahReflections:{},// key -> array of reflection entries
reflectionModalId:"ayahReflectionModal",reflectionModalInstance:null,reflectionModalHiddenHandler:null,selectedAyahForReflection:null,selectedReflectionKey:"",reflectionForm:{subject:"",message:""},reflectionSubjectSuggestions:["Gratitude for divine guidance","How this verse comforts me","Commitment to the lesson"],reflectionMessagePrompts:[{icon:"✨",text:"This reminded me to pause and thank Allah for His mercy."},{icon:"🌿",text:"I can implement this by showing patience with my family today."},{icon:"🕊️",text:"I feel my trust in Allah growing every time I read this."},{icon:"🔥",text:"Let this verse guide the way I handle challenges."},{icon:"💭",text:"I promise to keep this verse in mind during moments of doubt."},{icon:"🌙",text:"It gave me strength to keep my prayers steady tonight."},{icon:"🧭",text:"The advice feels like a compass when I need direction."},{icon:"🌟",text:"I am taking this lesson with me into today’s actions."},{icon:"🤲",text:"This verse inspires me to make dua for others."}],reflectionMessageMinLength:10,reflectionErrorMessage:"",reflectionSuccessMessage:"",reflectionSuccessTimeout:null,ayahReflectionKeys:{},editingReflectionId:null,editingReflectionIndex:null,reflectionCacheKey:"",reflectionGeneralStorageKey:"ic_reflection_keys",isSavingReflection:false,showReflectionHighlight:true,carouselCollapsed:false,promptRowCount:3,surahSearchQuery:"",activeSidebarTab:"surah",sidebarSearchQuery:"",sidebarDebouncedQuery:"",sidebarSearchDebounceTimer:null,sidebarVerseRenderInitial:100,sidebarVerseRenderStep:100,sidebarVerseRenderCount:100,sidebarListScrollRaf:null,selectedJuz:null,sidebarCollapsed:false,isMemorisationToolbarVisible:false,isMemorisationAdvancedOpen:false,isMemorisationReadingAidsOpen:false,isMemorisationMode:false,memorisationFocusIndex:0,memorisationRangeStart:1,memorisationRangeEnd:null,memorisationVerseDelay:0,memorisationRepetitionCount:3,memorisationRepetitionPause:0,memorisationRepetitionCurrent:1,memorisationRepetitionPauseTimeout:null,countdownSeconds:0,isCountdownActive:false,countdownInterval:null,autoNextAnimatedIndex:null,autoNextAnimationTimer:null,isBlurNextAyahEnabled:false,hifdhAuthStorageKey:"ic_hifdh_auth_user_v1",hifdhSchedulerStorageKey:"ic_hifdh_scheduler_v1",hifdhCheckpointDays:[1,3,7,14,30],hifdhPlanSets:[],hifdhReviewQueue:[],hifdhNewRangeStart:null,hifdhNewRangeEnd:null,hifdhSessionStarted:false,hifdhActiveItemId:null,hifdhPlanUiStorageKeyBase:"ic_hifdh_plan_ui_v1",isHifdhPlanCollapsed:false,isHifdhPlanHidden:false,isHifdhDemoModeActive:false,hifdhTooltipInstances:[],hifdhPlanModalShownHandler:null,hifdhConfettiTimeouts:[],isHifdhResetConfirmVisible:false,hifdhFeedbackChoices:[{value:"strong",label:"Strong"},{value:"minor",label:"Minor Mistakes"},{value:"weak",label:"Weak"}],settingsDraft:{showTajweed:false,showRealtimeHighlighting:false,showWordTranslation:false,showWordTranslationTooltip:false,gestureNavigationEnabled:true,playbackMode:"continuous"},tajweedRuleMap:{h:{en:"Hamzat Wasl",ar:"همزة وصل",desc:"Pronounced only when starting the word; dropped when connected.",arDesc:"تُنطق في بداية الكلمة وتسقط عند الوصل."},l:{en:"Lam Shamsiyyah",ar:"لام شمسية",desc:"The lam is silent and the next letter is doubled.",arDesc:"تُسقط اللام ويُشدَّد الحرف الذي بعدها."},n:{en:"Madd Normal",ar:"مد طبيعي",desc:"Basic stretch of 2 counts.",arDesc:"مد طبيعي بمقدار حركتين."},p:{en:"Madd Permissible",ar:"مد جائز",desc:"Stretch 2, 4, or 6 counts when a hamzah comes in the next word.",arDesc:"يمد ٢ أو ٤ أو ٦ حركات عند وجود همزة في الكلمة التالية."},m:{en:"Madd Necessary",ar:"مد لازم",desc:"Stretch 6 counts because of a permanent sukun.",arDesc:"يمد ٦ حركات لوجود سكون لازم."},o:{en:"Madd Obligatory",ar:"مد واجب",desc:"Stretch 4 or 5 counts when a hamzah is in the same word.",arDesc:"يمد ٤ أو ٥ حركات لوجود همزة في نفس الكلمة."},a:{en:"Idgham with Ghunnah",ar:"إدغام بغنة",desc:"Merge the noon or tanwin into the next letter with a nasal sound.",arDesc:"إدماج النون أو التنوين مع غنة."},u:{en:"Idgham without Ghunnah",ar:"إدغام بدون غنة",desc:"Merge the noon or tanwin into the next letter without nasal sound.",arDesc:"إدماج النون أو التنوين بدون غنة."},g:{en:"Ghunnah",ar:"غنة",desc:"Hold a nasal sound for about 2 counts.",arDesc:"غنة بمقدار حركتين."},q:{en:"Qalqalah",ar:"قلقلة",desc:"Give a light echo on ق ط ب ج د when they are sakin.",arDesc:"قلقلة خفيفة لحروف قطب جد عند السكون."},f:{en:"Ikhfa",ar:"إخفاء",desc:"Hide the noon or tanwin with a nasal sound before certain letters.",arDesc:"إخفاء النون أو التنوين مع غنة قبل حروف الإخفاء."},c:{en:"Ikhfa Shafawi",ar:"إخفاء شفوي",desc:"Lightly hide م before ب with a nasal sound.",arDesc:"إخفاء الميم قبل الباء مع غنة خفيفة."},w:{en:"Idgham Shafawi",ar:"إدغام شفوي",desc:"Merge م into the next م with a nasal sound.",arDesc:"إدغام الميم في الميم مع غنة."},i:{en:"Iqlab",ar:"إقلاب",desc:"Change noon or tanwin to a hidden م sound before ب.",arDesc:"قلب النون أو التنوين إلى ميم مخفاة قبل الباء."},d:{en:"Idgham Mutajanisayn",ar:"إدغام متجانسين",desc:"Merge letters from the same articulation group.",arDesc:"إدغام حرفين من مخرج واحد."},b:{en:"Idgham Mutaqaribayn",ar:"إدغام متقاربين",desc:"Merge letters that are close in articulation.",arDesc:"إدغام حرفين متقاربين في المخرج."},s:{en:"Silent",ar:"ساكن",desc:"No vowel sound on the letter.",arDesc:"حرف بلا حركة صوتية."}},tajweedMainRules:[{id:"ikhfa",name:"Ikhfa",exampleRef:"113:4",exampleSnippetText:"مِن شَرِّ",exampleSnippetTajweedText:"مِ[f[ن ش]َ]رِّ"},{id:"idgham-ghunnah",name:"Idgham with Ghunnah",exampleRef:"99:7",exampleSnippetText:"فَمَن يَعْمَلْ",exampleSnippetTajweedText:"فَمَ[a[ن ي]َ]عْمَلْ"},{id:"idgham-without-ghunnah",name:"Idgham without Ghunnah",exampleRef:"2:5",exampleSnippetText:"مِن رَّبِّهِمْ",exampleSnippetTajweedText:"مِ[u[ن ر]َّ]بِّهِمْ"},{id:"iqlab",name:"Iqlab",exampleRef:"4:58",exampleSnippetText:"سَمِيعًا بَصِيرًا",exampleSnippetTajweedText:"سَمِيعًا [i[بَ]]صِيرًا"},{id:"qalqalah",name:"Qalqalah",exampleRef:"111:1",exampleSnippetText:"تَبَّتْ",exampleSnippetTajweedText:"تَ[q[بَّ]]تْ"},{id:"madd",name:"Madd",exampleRef:"108:1",exampleSnippetText:"إِنَّا",exampleSnippetTajweedText:"إِنَّ[n[ا]]"}],tajweedRuleExampleAudio:null,tajweedRuleAudioCache:{},tajweedRuleAudioMetaCache:{},tajweedRuleVerseCache:{},tajweedRuleVerseLoading:{},tajweedRuleStopTimer:null,tajweedRuleTimeUpdateHandler:null,tajweedPlayingRuleId:"",tajweedLoadingRuleId:""});},computed:{isAnyAudioPlaying(){return Array.isArray(this.isAudioPlaying)?this.isAudioPlaying.some(Boolean):false;},isMemorisationRepetitionActive(){return this.isMemorisationToolbarVisible&&this.memorisationRepetitionCount>1&&this.isAnyAudioPlaying;},memorisationFocusIndexSafe(){const len=Array.isArray(this.filteredAyahs)?this.filteredAyahs.length:0;if(!len)return 0;return Math.min(Math.max(0,this.memorisationFocusIndex),len-1);},memorisationPlayIndex(){if(this.isMemorisationMode){return this.memorisationFocusIndexSafe;}if(this.isMemorisationToolbarVisible&&this.memorisationRepetitionCount>1&&!this.isAnyAudioPlaying){return 0;}var idx=this.currentlyPlayingIndex;var len=this.filteredAyahs?this.filteredAyahs.length:0;if(idx<0||idx>=len)return 0;return idx;},memorisationCurrentAyah(){const ayahs=Array.isArray(this.filteredAyahs)?this.filteredAyahs:[];if(!ayahs.length)return null;const index=Math.min(Math.max(0,Number(this.memorisationPlayIndex)||0),ayahs.length-1);return ayahs[index]||null;},memorisationCurrentAyahNumber(){const ayah=this.memorisationCurrentAyah;if(!ayah)return 1;const fallback=this.memorisationPlayIndex+1;return Number(ayah.numberInSurah||ayah.number||fallback);},memorisationProgressPercent(){const total=Number(this.totalAyahs||0);if(!total)return 0;const rawStart=Number(this.memorisationRangeStart||1);const rawEnd=Number(this.memorisationRangeEnd||total);const start=Math.min(total,Math.max(1,Math.min(rawStart,rawEnd)));const end=Math.min(total,Math.max(start,Math.max(rawStart,rawEnd)));const current=Math.min(end,Math.max(start,Number(this.memorisationCurrentAyahNumber||start)));const span=Math.max(1,end-start+1);const completed=current-start+1;return Math.max(0,Math.min(100,Math.round(completed/span*100)));},memorisationProgressLabel(){const total=Number(this.totalAyahs||0);if(!total)return"No ayahs loaded";const rawStart=Number(this.memorisationRangeStart||1);const rawEnd=Number(this.memorisationRangeEnd||total);const start=Math.min(total,Math.max(1,Math.min(rawStart,rawEnd)));const end=Math.min(total,Math.max(start,Math.max(rawStart,rawEnd)));return`Range ${start} to ${end}, ${this.memorisationProgressPercent}% completed`;},isMemorisationCurrentAyahSaved(){return this.isAyahSaved(this.memorisationCurrentAyah);},totalAyahs(){var _this$surahDetails;return((_this$surahDetails=this.surahDetails)===null||_this$surahDetails===void 0||(_this$surahDetails=_this$surahDetails.ayahs)===null||_this$surahDetails===void 0?void 0:_this$surahDetails.length)||0;},activeAyahIndex(){return this.isAnyAudioPlaying?this.currentlyPlayingIndex:this.selectedCardIndex;},todayHifdhPlan(){const grouped={newMemorisation:[],recentReinforcement:[],strengtheningMemory:[],longTermProtection:[]};const todayKey=this.toDateKey(new Date());const dueItems=(this.hifdhReviewQueue||[]).filter(item=>item&&item.status!=="completed"&&String(item.scheduledDate||"")<=todayKey).sort((a,b)=>{const left=String((a===null||a===void 0?void 0:a.scheduledDate)||"");const right=String((b===null||b===void 0?void 0:b.scheduledDate)||"");if(left!==right)return left.localeCompare(right);return Number((a===null||a===void 0?void 0:a.checkpointDay)||0)-Number((b===null||b===void 0?void 0:b.checkpointDay)||0);});dueItems.forEach(item=>{const bucket=this.classifyHifdhEntry(item);if(bucket==="new")grouped.newMemorisation.push(item);else if(bucket==="recent")grouped.recentReinforcement.push(item);else if(bucket==="strengthening")grouped.strengtheningMemory.push(item);else grouped.longTermProtection.push(item);});return grouped;},todayHifdhPlanItemsOrdered(){const plan=this.todayHifdhPlan;return[].concat(plan.newMemorisation).concat(plan.recentReinforcement).concat(plan.strengtheningMemory).concat(plan.longTermProtection);},hasTodayHifdhPlan(){return this.todayHifdhPlanItemsOrdered.length>0;},isHifdhPlanCompactControlsEnabled(){return!!this.isTabletOrMobile;},effectiveIsHifdhPlanHidden(){if(!this.isHifdhPlanCompactControlsEnabled)return false;return!!this.isHifdhPlanHidden;},effectiveIsHifdhPlanCollapsed(){return!!this.isHifdhPlanCollapsed;},hifdhPendingCount(){return(this.hifdhReviewQueue||[]).filter(item=>item&&item.status!=="completed").length;},canRunHifdhDemo(){return this.hifdhPendingCount>0;},hifdhCompletionSummary(){const total=(this.hifdhReviewQueue||[]).length;const completed=Math.max(total-this.hifdhPendingCount,0);return`${completed}/${total} completed`;},hifdhCompletedCount(){const total=(this.hifdhReviewQueue||[]).length;return Math.max(total-this.hifdhPendingCount,0);},hifdhCompletionPercent(){const total=(this.hifdhReviewQueue||[]).length;if(!total)return 0;return Math.round(this.hifdhCompletedCount/total*100);},hifdhCoverageStats(){const entries=Array.isArray(this.hifdhReviewQueue)?this.hifdhReviewQueue:[];const quranTotalAyahs=6236;const currentSurahNumber=Number(this.selectedSurah||0);const currentSurahTotal=Math.max(Number(this.totalAyahs||0),0);const overallPlanned=new Set();const overallReviewed=new Set();const surahPlanned=new Set();const surahReviewed=new Set();entries.forEach(entry=>{const surah=Number((entry===null||entry===void 0?void 0:entry.surahNumber)||0);const start=Number((entry===null||entry===void 0?void 0:entry.startAyah)||0);const end=Number((entry===null||entry===void 0?void 0:entry.endAyah)||0);if(!surah||!start||!end)return;const from=Math.min(start,end);const to=Math.max(start,end);for(let ayah=from;ayah<=to;ayah+=1){const key=`${surah}:${ayah}`;overallPlanned.add(key);if(surah===currentSurahNumber)surahPlanned.add(ayah);if(String((entry===null||entry===void 0?void 0:entry.status)||"")==="completed"){overallReviewed.add(key);if(surah===currentSurahNumber)surahReviewed.add(ayah);}}});const surahPlannedCount=surahPlanned.size;const surahReviewedCount=surahReviewed.size;const surahRemainingCount=Math.max((currentSurahTotal||surahPlannedCount)-surahReviewedCount,0);const surahPctBase=Math.max(currentSurahTotal||surahPlannedCount,0);const surahPercent=surahPctBase?Math.round(surahReviewedCount/surahPctBase*100):0;const overallReviewedCount=overallReviewed.size;const overallRemainingCount=Math.max(quranTotalAyahs-overallReviewedCount,0);const overallPercent=Math.round(overallReviewedCount/quranTotalAyahs*100);return{quranTotalAyahs,surahTotalAyahs:currentSurahTotal,surahPlannedCount,surahReviewedCount,surahRemainingCount,surahPercent,overallPlannedCount:overallPlanned.size,overallReviewedCount,overallRemainingCount,overallPercent};},hifdhRecentPerformance(){const windowDays=7;const today=new Date();const todayKey=this.toDateKey(today);const startDate=new Date(today);startDate.setDate(startDate.getDate()-(windowDays-1));const startKey=this.toDateKey(startDate);const entries=Array.isArray(this.hifdhReviewQueue)?this.hifdhReviewQueue:[];const dueInWindow=entries.filter(item=>{const scheduled=String((item===null||item===void 0?void 0:item.scheduledDate)||"");return item&&/^\d{4}-\d{2}-\d{2}$/.test(scheduled)&&scheduled>=startKey&&scheduled<=todayKey;});const completedInWindow=entries.filter(item=>{const completedOn=String((item===null||item===void 0?void 0:item.completedOn)||"");return item&&item.status==="completed"&&/^\d{4}-\d{2}-\d{2}$/.test(completedOn)&&completedOn>=startKey&&completedOn<=todayKey;});const feedbackCounts={strong:0,minor:0,weak:0};completedInWindow.forEach(item=>{const key=String((item===null||item===void 0?void 0:item.feedback)||"").toLowerCase();if(key in feedbackCounts)feedbackCounts[key]+=1;});const dueCount=dueInWindow.length;const completedCount=completedInWindow.length;const completionRate=dueCount?Math.round(completedCount/dueCount*100):0;return{windowDays,dueCount,completedCount,completionRate,feedbackCounts};},hifdhPerformanceTimeline(){const windowDays=this.hifdhRecentPerformance.windowDays||7;const today=new Date();const startDate=new Date(today);startDate.setDate(startDate.getDate()-(windowDays-1));const entries=Array.isArray(this.hifdhReviewQueue)?this.hifdhReviewQueue:[];return Array.from({length:windowDays},(_,index)=>{const dayDate=new Date(startDate);dayDate.setDate(startDate.getDate()+index);const dayKey=this.toDateKey(dayDate);const dueCount=entries.filter(item=>{const scheduled=String((item===null||item===void 0?void 0:item.scheduledDate)||"");return item&&scheduled===dayKey;}).length;const completedCount=entries.filter(item=>{const completedOn=String((item===null||item===void 0?void 0:item.completedOn)||"");return item&&item.status==="completed"&&completedOn===dayKey;}).length;const completionRate=dueCount?Math.round(completedCount/dueCount*100):completedCount>0?100:0;return{key:dayKey,label:dayDate.toLocaleDateString("en-US",{weekday:"short"}),shortDate:dayDate.toLocaleDateString("en-US",{month:"short",day:"numeric"}),dueCount,completedCount,completionRate,barHeight:Math.max(12,Math.min(100,completionRate)),isToday:dayKey===this.toDateKey(today)};});},hifdhTrackerCards(){return(this.hifdhPerformanceTimeline||[]).map(day=>{const dueCount=Number((day===null||day===void 0?void 0:day.dueCount)||0);const completedCount=Number((day===null||day===void 0?void 0:day.completedCount)||0);const completionRate=Number((day===null||day===void 0?void 0:day.completionRate)||0);const progressPercent=dueCount>0?Math.max(8,Math.min(100,completionRate)):completedCount>0?100:8;let statusLabel="No due";if(dueCount>0&&completionRate>=100){statusLabel="Complete";}else if(dueCount>0&&completionRate>0){statusLabel="In progress";}else if(dueCount>0){statusLabel="Pending";}else if(completedCount>0){statusLabel="Extra";}return _objectSpread(_objectSpread({},day),{},{progressPercent,statusLabel,isComplete:dueCount>0&&completionRate>=100,isEmpty:dueCount===0&&completedCount===0});});},hifdhWeakSpots(){const weakEntries=(this.hifdhReviewQueue||[]).filter(item=>{return item&&item.status==="completed"&&String(item.feedback||"").toLowerCase()==="weak";});const grouped=weakEntries.reduce((acc,item)=>{const key=this.hifdhEntrySummary(item);if(!acc[key]){acc[key]={label:key,weakCount:0,lastSeenOn:""};}acc[key].weakCount+=1;const completedOn=String(item.completedOn||"");if(completedOn&&completedOn>acc[key].lastSeenOn){acc[key].lastSeenOn=completedOn;}return acc;},{});return Object.values(grouped).sort((a,b)=>{if(b.weakCount!==a.weakCount)return b.weakCount-a.weakCount;return String(b.lastSeenOn||"").localeCompare(String(a.lastSeenOn||""));}).slice(0,4).map(item=>_objectSpread(_objectSpread({},item),{},{lastSeenLabel:item.lastSeenOn?this.formatDateKey(item.lastSeenOn):""}));},hifdhStreakTracking(){const completionKeys=this.hifdhCompletionDateKeys.slice().sort((a,b)=>a.localeCompare(b));let bestStreak=0;let currentRun=0;let previousDate=null;completionKeys.forEach(key=>{const currentDate=new Date(`${key}T00:00:00`);if(!previousDate){currentRun=1;}else{const dayDiff=Math.round((currentDate.getTime()-previousDate.getTime())/(1000*60*60*24));currentRun=dayDiff===1?currentRun+1:1;}bestStreak=Math.max(bestStreak,currentRun);previousDate=currentDate;});const activeDays=this.hifdhPerformanceTimeline.filter(day=>day.completedCount>0).length;const consistencyRate=Math.round(activeDays/this.hifdhPerformanceTimeline.length*100);return{currentStreak:this.hifdhConsistencyStreakDays,bestStreak,activeDays,windowDays:this.hifdhPerformanceTimeline.length,consistencyRate};},hifdhCompletionDateKeys(){return Array.from(new Set((this.hifdhReviewQueue||[]).map(item=>String((item===null||item===void 0?void 0:item.completedOn)||"")).filter(dateKey=>/^\d{4}-\d{2}-\d{2}$/.test(dateKey))));},hifdhConsistencyStreakDays(){if(!this.hifdhCompletionDateKeys.length)return 0;const completedDates=new Set(this.hifdhCompletionDateKeys);const cursor=new Date();let streak=0;while(true){const key=this.toDateKey(cursor);if(!completedDates.has(key))break;streak++;cursor.setDate(cursor.getDate()-1);}return streak;},hifdhRecentStreakDays(){if(this.hifdhConsistencyStreakDays>0)return 0;if(!this.hifdhCompletionDateKeys.length)return 0;const completedDates=new Set(this.hifdhCompletionDateKeys);const cursor=new Date();cursor.setDate(cursor.getDate()-1);let streak=0;while(true){const key=this.toDateKey(cursor);if(!completedDates.has(key))break;streak++;cursor.setDate(cursor.getDate()-1);}return streak;},hifdhConsistencyPillLabel(){if(this.hifdhConsistencyStreakDays>0){return`${this.hifdhConsistencyStreakDays}-day streak`;}if(this.hifdhRecentStreakDays>0){return`Keep ${this.hifdhRecentStreakDays}-day flow`;}return"Start your streak";},hifdhConsistencyNudge(){const streak=this.hifdhConsistencyStreakDays;if(streak>=3){return`${streak} days consistent - mashaAllah!`;}if(streak===2){return"2 days consistent. One more today makes it 3.";}if(streak===1){return"Day 1 complete. A short review tomorrow keeps the rhythm.";}if(this.hifdhRecentStreakDays>=3){return`You had ${this.hifdhRecentStreakDays} consistent days. One segment today brings it back.`;}if(this.hifdhRecentStreakDays>0){return"A small session today keeps your memorisation momentum alive.";}return"Complete one due segment today to begin your consistency streak.";},hifdhConsistencyTooltip(){if(this.hifdhConsistencyStreakDays>0){return this.hifdhConsistencyNudge;}return"Consistency improves retention. Even one segment counts.";},activeHifdhSessionItem(){if(!this.hifdhActiveItemId)return null;return this.todayHifdhPlanItemsOrdered.find(item=>item.id===this.hifdhActiveItemId)||null;},hifdhSessionCompletedCount(){return(this.hifdhReviewQueue||[]).filter(item=>item&&item.status==="completed"&&item.completedOn===this.toDateKey(new Date())).length;},nextHifdhDueItem(){const pending=(this.hifdhReviewQueue||[]).filter(item=>item&&item.status!=="completed").sort((a,b)=>{const left=String((a===null||a===void 0?void 0:a.scheduledDate)||"");const right=String((b===null||b===void 0?void 0:b.scheduledDate)||"");if(left!==right)return left.localeCompare(right);return Number((a===null||a===void 0?void 0:a.checkpointDay)||0)-Number((b===null||b===void 0?void 0:b.checkpointDay)||0);});return pending[0]||null;},nextHifdhDueSummary(){const next=this.nextHifdhDueItem;if(!next)return"No upcoming scheduled reviews.";const label=this.hifdhCheckpointLabel(next);const when=this.formatDateKey(next.scheduledDate);return`Next review: ${this.hifdhEntrySummary(next)} (${label}) on ${when}.`;},sidebarNormalizedQuery(){return(this.sidebarDebouncedQuery||"").trim().toLowerCase();},surahNameByNumber(){const lookup={};if(!Array.isArray(this.surahs))return lookup;this.surahs.forEach(surah=>{const number=Number(surah===null||surah===void 0?void 0:surah.number);if(!number)return;lookup[number]=(surah===null||surah===void 0?void 0:surah.englishName)||`Surah ${number}`;});return lookup;},juzMetadata(){const surahLookup=this.surahNameByNumber;return Array.from({length:30},(_,i)=>i+1).map(number=>{const start=_utils_quran_mappings__WEBPACK_IMPORTED_MODULE_1__.JUZ_START_MAPPING[number];const surahNumber=Number((start===null||start===void 0?void 0:start.surah)||0);const ayahNumber=Number((start===null||start===void 0?void 0:start.ayah)||0);return{number,surahNumber,ayahNumber,surahName:surahLookup[surahNumber]||`Surah ${surahNumber}`};});},sidebarVerseRows(){var _this$surahDetails2;const ayahs=(_this$surahDetails2=this.surahDetails)===null||_this$surahDetails2===void 0?void 0:_this$surahDetails2.ayahs;if(!Array.isArray(ayahs))return[];return ayahs.map(ayah=>{const number=Number(ayah.numberInSurah||ayah.number||0);return{number,text:ayah.text,translation:ayah.translation,key:number,searchIndex:[String(number),ayah.lowerText||String(ayah.text||"").toLowerCase(),ayah.lowerTranslation||String(ayah.translation||"").toLowerCase(),ayah.lowerTransliteration||String(ayah.transliteration||"").toLowerCase()].join(" ").trim()};});},filteredJuzs(){const query=this.sidebarNormalizedQuery;if(!query)return this.juzMetadata;return this.juzMetadata.filter(juz=>{const ref=`${juz.surahNumber}:${juz.ayahNumber}`;return String(juz.number).includes(query)||`juz ${juz.number}`.includes(query)||ref.includes(query)||String(juz.surahNumber).includes(query)||String(juz.surahName||"").toLowerCase().includes(query);});},filteredPages(){const query=this.sidebarNormalizedQuery;const allPages=Array.from({length:604},(_,i)=>i+1);if(!query)return allPages;return allPages.filter(pageNumber=>String(pageNumber).includes(query)||`page ${pageNumber}`.includes(query));},filteredVersesList(){const rows=this.sidebarVerseRows;const query=this.sidebarNormalizedQuery;if(!query)return rows;return rows.filter(row=>row.searchIndex.includes(query));},visibleFilteredVersesList(){return this.filteredVersesList.slice(0,this.sidebarVerseRenderCount);},hasMoreFilteredVerses(){return this.visibleFilteredVersesList.length<this.filteredVersesList.length;},filteredSurahs_sidebar(){if(!Array.isArray(this.surahs))return[];const raw=this.sidebarNormalizedQuery;if(!raw)return this.surahs;return this.surahs.filter(surah=>{const english=(surah.englishName||"").toLowerCase();const arabic=(surah.name||"").toLowerCase();const number=String(surah.number||"");return english.includes(raw)||arabic.includes(raw)||number.includes(raw);});},isRepeatMode(){return this.playbackMode==="repeat";},currentPlaybackModeOption(){return this.playbackModeOptions.find(option=>option.value===this.playbackMode)||this.playbackModeOptions[0];},draftPlaybackModeOption(){var _this$settingsDraft;const selected=(_this$settingsDraft=this.settingsDraft)===null||_this$settingsDraft===void 0?void 0:_this$settingsDraft.playbackMode;return this.playbackModeOptions.find(option=>option.value===selected)||this.currentPlaybackModeOption;},activeQuranFont(){if(!Array.isArray(this.quranFonts)||!this.quranFonts.length)return null;return this.quranFonts.find(font=>font.id===this.selectedQuranFontId)||this.quranFonts[0]||null;},quranFontStyle(){var _this$activeQuranFont;const stack=this.storedQuranFontStack||((_this$activeQuranFont=this.activeQuranFont)===null||_this$activeQuranFont===void 0?void 0:_this$activeQuranFont.cssStack)||this.defaultQuranFontStack;return{"--ic-quran-arabic-font":stack};},tajweedLegend(){return Object.keys(this.tajweedRuleMap).sort().map(name=>{var _this$tajweedRuleMap$,_this$tajweedRuleMap$2,_this$tajweedRuleMap$3,_this$tajweedRuleMap$4;return{name,code:name,label:((_this$tajweedRuleMap$=this.tajweedRuleMap[name])===null||_this$tajweedRuleMap$===void 0?void 0:_this$tajweedRuleMap$.en)||name,ar:((_this$tajweedRuleMap$2=this.tajweedRuleMap[name])===null||_this$tajweedRuleMap$2===void 0?void 0:_this$tajweedRuleMap$2.ar)||"",desc:((_this$tajweedRuleMap$3=this.tajweedRuleMap[name])===null||_this$tajweedRuleMap$3===void 0?void 0:_this$tajweedRuleMap$3.desc)||"",arDesc:((_this$tajweedRuleMap$4=this.tajweedRuleMap[name])===null||_this$tajweedRuleMap$4===void 0?void 0:_this$tajweedRuleMap$4.arDesc)||""};});},tajweedRulesWithExamples(){if(!Array.isArray(this.tajweedMainRules))return[];return this.tajweedMainRules.slice(0,6).map(rule=>{var _this$tajweedRuleVers;const cachedVerse=((_this$tajweedRuleVers=this.tajweedRuleVerseCache)===null||_this$tajweedRuleVers===void 0?void 0:_this$tajweedRuleVers[rule.exampleRef])||null;return _objectSpread(_objectSpread({},rule),{},{exampleText:rule.exampleSnippetText||(cachedVerse===null||cachedVerse===void 0?void 0:cachedVerse.text_uthmani)||(cachedVerse===null||cachedVerse===void 0?void 0:cachedVerse.text_uthmani_simple)||rule.exampleText||"",exampleTajweedText:rule.exampleSnippetTajweedText||(cachedVerse===null||cachedVerse===void 0?void 0:cachedVerse.text_uthmani_tajweed)||rule.exampleTajweedText||rule.exampleText||""});});},surahInfoSourceLabel(){return this.surahInfoSource||"Quran.com";},surahInfoSourceHost(){const rawUrl=this.surahInfoSourceUrl||"https://quran.com";try{return new URL(rawUrl).hostname.replace(/^www\./,"");}catch(_){return"";}},reflectionMessagePromptRows(){const prompts=this.reflectionMessagePrompts||[];const perRow=5;const rows=[];if(!prompts.length)return rows;for(let rowIndex=0;rowIndex<this.promptRowCount;rowIndex++){const start=rowIndex*perRow%prompts.length;const rowPrompts=[];for(let offset=0;offset<perRow;offset++){const prompt=prompts[(start+offset)%prompts.length];if(!rowPrompts.some(p=>p.text===prompt.text)){rowPrompts.push(prompt);}if(rowPrompts.length>=perRow)break;}rows.push(rowPrompts);}return rows;},filteredAyahs:function(){if(!this.surahDetails)return[];let ayahs=this.surahDetails.ayahs||[];// Apply memorisation range if visible
if(this.isMemorisationToolbarVisible){const start=this.memorisationRangeStart||1;const end=this.memorisationRangeEnd||ayahs.length;ayahs=ayahs.filter(a=>a.numberInSurah>=start&&a.numberInSurah<=end);}if(!this.debouncedQuery)return ayahs;const query=this.debouncedQuery.toLowerCase();return ayahs.filter(ayah=>ayah.lowerText&&ayah.lowerText.includes(query)||ayah.lowerTranslation&&ayah.lowerTranslation.includes(query)||ayah.lowerTransliteration&&ayah.lowerTransliteration.includes(query));},advancedSearchTrimmedQuery(){return(this.advancedSearchQuery||"").trim();},hasAdvancedSearchQuery(){return this.advancedSearchTrimmedQuery.length>=this.advancedSearchMinLength;},hasAdvancedSearchResults(){return Array.isArray(this.advancedSearchResults)&&this.advancedSearchResults.length>0;},advancedSearchGroupedResults(){if(!this.hasAdvancedSearchResults)return[];const grouped=new Map();this.advancedSearchResults.forEach(result=>{const surahNumber=Number((result===null||result===void 0?void 0:result.surahNumber)||0);const key=surahNumber||0;if(!grouped.has(key)){grouped.set(key,{surahNumber,surahEnglishName:(result===null||result===void 0?void 0:result.surahEnglishName)||(surahNumber?`Surah ${surahNumber}`:"Surah"),surahArabicName:(result===null||result===void 0?void 0:result.surahArabicName)||"",surahTranslationName:(result===null||result===void 0?void 0:result.surahTranslationName)||"",results:[]});}grouped.get(key).results.push(result);});return Array.from(grouped.values()).sort((a,b)=>{const left=Number((a===null||a===void 0?void 0:a.surahNumber)||0);const right=Number((b===null||b===void 0?void 0:b.surahNumber)||0);if(!left&&!right)return 0;if(!left)return 1;if(!right)return-1;return left-right;});},advancedSearchMatchedSurahCount(){return this.advancedSearchGroupedResults.length;},isAdvancedSearchResultCapReached(){return Number(this.advancedSearchTotalMatches||0)>Number(this.advancedSearchResults.length||0);},hasAdvancedSearchPanelContent(){return this.advancedSearchLoading||this.hasAdvancedSearchResults||this.hasAdvancedSearchQuery||!!this.advancedSearchError||!!this.speechRecognitionError;},suratOnboardingSearchTerms(){const raw=(this.suratOnboardingSearchQuery||"").trim().toLowerCase();if(!raw)return[];return raw.split(/\s+/).map(term=>term.trim()).filter(Boolean);},filteredSuratOnboardingFeatures(){const features=Array.isArray(this.suratOnboardingFeatures)?this.suratOnboardingFeatures:[];const terms=this.suratOnboardingSearchTerms;if(!terms.length)return features;return features.filter(feature=>{const haystack=[feature.title,feature.summary,feature.howTo,feature.area,...(Array.isArray(feature.keywords)?feature.keywords:[])].join(" ").toLowerCase();return terms.every(term=>haystack.includes(term));});},ayahBodyFontSize(){const baseSize=Number(this.translationFontSize);if(!Number.isFinite(baseSize))return 15;return Math.max(10,Math.min(baseSize-2,17));},effectiveArabicFontSize(){const baseSize=Number(this.arabicFontSize);const safeBase=Number.isFinite(baseSize)?baseSize:28;if(!this.isDeepFocusMode)return safeBase;return Math.round(safeBase*1.08*10)/10;},effectiveAyahBodyFontSize(){const baseSize=Number(this.ayahBodyFontSize);const safeBase=Number.isFinite(baseSize)?baseSize:15;if(!this.isDeepFocusMode)return safeBase;return Math.round(safeBase*1.06*10)/10;},filteredSurahs(){if(!Array.isArray(this.surahs))return[];const raw=(this.surahSearchQuery||"").trim().toLowerCase();if(!raw)return this.surahs;return this.surahs.filter(surah=>{const english=(surah.englishName||"").toLowerCase();const arabic=(surah.name||"").toLowerCase();const number=String(surah.number||"");return english.includes(raw)||arabic.includes(raw)||number.includes(raw);});},continueProgressSurahNumber(){var _this$continueProgres;const value=Number((_this$continueProgres=this.continueProgress)===null||_this$continueProgres===void 0?void 0:_this$continueProgres.surahNumber);return Number.isFinite(value)&&value>0?value:null;},currentSurahInfo(){var _this$surahDetails3;const target=Number(((_this$surahDetails3=this.surahDetails)===null||_this$surahDetails3===void 0?void 0:_this$surahDetails3.surahNumber)||this.selectedSurah);if(!target||!Array.isArray(this.surahs))return null;return this.surahs.find(surah=>Number(surah.number)===target)||null;},currentSurahMeta(){var _this$surahDetails4,_this$surahDetails5,_this$currentSurahInf,_this$currentSurahInf2,_this$currentSurahInf3,_this$currentSurahInf4;if(!this.surahDetails&&!this.surahInfo)return{};const inSurah=((_this$surahDetails4=this.surahDetails)===null||_this$surahDetails4===void 0||(_this$surahDetails4=_this$surahDetails4.ayahs)===null||_this$surahDetails4===void 0?void 0:_this$surahDetails4.length)||0;const cached=this.surahInfo;const surahNumber=Number(((_this$surahDetails5=this.surahDetails)===null||_this$surahDetails5===void 0?void 0:_this$surahDetails5.surahNumber)||this.selectedSurah);return{ayahCount:(cached===null||cached===void 0?void 0:cached.numberOfAyahs)||inSurah||((_this$currentSurahInf=this.currentSurahInfo)===null||_this$currentSurahInf===void 0?void 0:_this$currentSurahInf.numberOfAyahs)||((_this$currentSurahInf2=this.currentSurahInfo)===null||_this$currentSurahInf2===void 0||(_this$currentSurahInf2=_this$currentSurahInf2.ayahs)===null||_this$currentSurahInf2===void 0?void 0:_this$currentSurahInf2.length)||0,origin:(cached===null||cached===void 0?void 0:cached.revelationType)||((_this$currentSurahInf3=this.currentSurahInfo)===null||_this$currentSurahInf3===void 0?void 0:_this$currentSurahInf3.revelationType),number:surahNumber||((_this$currentSurahInf4=this.currentSurahInfo)===null||_this$currentSurahInf4===void 0?void 0:_this$currentSurahInf4.number)};},desktopSurahContext(){var _this$currentSurahMet,_this$surahDetails6,_this$currentSurahInf5,_this$surahDetails7,_this$currentSurahInf6,_this$surahDetails8,_this$currentSurahInf7,_this$currentSurahInf8,_this$surahDetails9,_this$currentSurahInf9,_this$currentSurahMet2,_this$currentSurahInf0,_this$surahDetails0,_this$currentSurahMet3,_this$currentSurahInf1;return{number:((_this$currentSurahMet=this.currentSurahMeta)===null||_this$currentSurahMet===void 0?void 0:_this$currentSurahMet.number)||((_this$surahDetails6=this.surahDetails)===null||_this$surahDetails6===void 0?void 0:_this$surahDetails6.surahNumber)||((_this$currentSurahInf5=this.currentSurahInfo)===null||_this$currentSurahInf5===void 0?void 0:_this$currentSurahInf5.number)||this.selectedSurah||"",englishName:((_this$surahDetails7=this.surahDetails)===null||_this$surahDetails7===void 0?void 0:_this$surahDetails7.englishName)||((_this$currentSurahInf6=this.currentSurahInfo)===null||_this$currentSurahInf6===void 0?void 0:_this$currentSurahInf6.englishName)||((_this$surahDetails8=this.surahDetails)===null||_this$surahDetails8===void 0?void 0:_this$surahDetails8.name)||((_this$currentSurahInf7=this.currentSurahInfo)===null||_this$currentSurahInf7===void 0?void 0:_this$currentSurahInf7.name)||"Surah",arabicName:((_this$currentSurahInf8=this.currentSurahInfo)===null||_this$currentSurahInf8===void 0?void 0:_this$currentSurahInf8.name)||((_this$surahDetails9=this.surahDetails)===null||_this$surahDetails9===void 0?void 0:_this$surahDetails9.name)||"",translationName:((_this$currentSurahInf9=this.currentSurahInfo)===null||_this$currentSurahInf9===void 0?void 0:_this$currentSurahInf9.englishNameTranslation)||"",ayahCount:((_this$currentSurahMet2=this.currentSurahMeta)===null||_this$currentSurahMet2===void 0?void 0:_this$currentSurahMet2.ayahCount)||((_this$currentSurahInf0=this.currentSurahInfo)===null||_this$currentSurahInf0===void 0?void 0:_this$currentSurahInf0.numberOfAyahs)||((_this$surahDetails0=this.surahDetails)===null||_this$surahDetails0===void 0||(_this$surahDetails0=_this$surahDetails0.ayahs)===null||_this$surahDetails0===void 0?void 0:_this$surahDetails0.length)||null,origin:((_this$currentSurahMet3=this.currentSurahMeta)===null||_this$currentSurahMet3===void 0?void 0:_this$currentSurahMet3.origin)||((_this$currentSurahInf1=this.currentSurahInfo)===null||_this$currentSurahInf1===void 0?void 0:_this$currentSurahInf1.revelationType)||""};},desktopSurahContextKey(){const ctx=this.desktopSurahContext||{};return`${ctx.number||"surah"}-${ctx.englishName||"name"}-${ctx.arabicName||"ar"}`;},currentSurahAudioMetaKey(){var _this$surahDetails1;const surahNumber=Number(this.selectedSurah||((_this$surahDetails1=this.surahDetails)===null||_this$surahDetails1===void 0?void 0:_this$surahDetails1.surahNumber));return this.getSurahAudioMetaKey(surahNumber,this.selectedReciter);},currentSurahAudioMeta(){const key=this.currentSurahAudioMetaKey;if(!key)return null;return this.surahAudioMetaByKey[key]||null;},isCurrentSurahAudioMetaLoading(){const key=this.currentSurahAudioMetaKey;if(!key)return false;return!!this.surahAudioMetaLoadingByKey[key];},currentSurahAudioSizeLabel(){var _this$currentSurahAud;const sizeBytes=(_this$currentSurahAud=this.currentSurahAudioMeta)===null||_this$currentSurahAud===void 0?void 0:_this$currentSurahAud.sizeBytes;if(!sizeBytes)return"";return this.formatBytesToMegabytes(sizeBytes);},surahDownloadReadyLabel(){if(this.currentSurahAudioSizeLabel){return`Download the full surah MP3 for offline listening (${this.currentSurahAudioSizeLabel}).`;}if(this.isCurrentSurahAudioMetaLoading){return"Download the full surah MP3 for offline listening (estimating file size...).";}return"Download the full surah MP3 for offline listening.";},surahDownloadReadyAriaLabel(){if(this.currentSurahAudioSizeLabel){return`Download full surah MP3 for offline listening (${this.currentSurahAudioSizeLabel})`;}return"Download full surah MP3 for offline listening";},isTranslationAllEnabled(){if(!Array.isArray(this.filteredAyahs)||!this.filteredAyahs.length){return!!this.isTranslationVisible;}return this.filteredAyahs.every(ayah=>this.isTranslationVisibleFor({ayah}));},isTransliterationAllEnabled(){if(!Array.isArray(this.filteredAyahs)||!this.filteredAyahs.length){return!!this.isTransliterationVisible;}return this.filteredAyahs.every(ayah=>this.isTransliterationVisibleFor({ayah}));},currentMobileAyah(){const ayahs=Array.isArray(this.filteredAyahs)?this.filteredAyahs:[];if(!ayahs.length)return null;const index=Math.min(Math.max(0,Number(this.currentlyPlayingIndex)||0),ayahs.length-1);return ayahs[index]||ayahs[0];},mobilePageLabel(){var _this$currentMobileAy;const page=(_this$currentMobileAy=this.currentMobileAyah)===null||_this$currentMobileAy===void 0?void 0:_this$currentMobileAy.page;if(page)return`Page ${page}`;return"Page —";},mobileJuzLabel(){var _this$currentMobileAy2;const juz=(_this$currentMobileAy2=this.currentMobileAyah)===null||_this$currentMobileAy2===void 0?void 0:_this$currentMobileAy2.juz;return juz?`Juz ${juz}`:"";},mobileHizbLabel(){var _this$currentMobileAy3,_this$currentMobileAy4;const hizb=((_this$currentMobileAy3=this.currentMobileAyah)===null||_this$currentMobileAy3===void 0?void 0:_this$currentMobileAy3.hizb)||(typeof((_this$currentMobileAy4=this.currentMobileAyah)===null||_this$currentMobileAy4===void 0?void 0:_this$currentMobileAy4.hizbQuarter)==="number"?Math.ceil(this.currentMobileAyah.hizbQuarter/4):null);return hizb?`Hizb ${hizb}`:"";},mobileSurahLabel(){var _this$surahDetails10,_this$surahDetails11,_this$surahDetails12,_this$currentSurahInf10,_this$currentSurahInf11;const surahNumber=((_this$surahDetails10=this.surahDetails)===null||_this$surahDetails10===void 0?void 0:_this$surahDetails10.surahNumber)||this.selectedSurah;const surahName=((_this$surahDetails11=this.surahDetails)===null||_this$surahDetails11===void 0?void 0:_this$surahDetails11.englishName)||((_this$surahDetails12=this.surahDetails)===null||_this$surahDetails12===void 0?void 0:_this$surahDetails12.name)||((_this$currentSurahInf10=this.currentSurahInfo)===null||_this$currentSurahInf10===void 0?void 0:_this$currentSurahInf10.englishName)||((_this$currentSurahInf11=this.currentSurahInfo)===null||_this$currentSurahInf11===void 0?void 0:_this$currentSurahInf11.name)||"Surah";if(surahNumber&&surahName){return`${surahNumber}. ${surahName}`;}return surahName;},mainReciterIds(){const primary=this.reciterTimingMap?Object.keys(this.reciterTimingMap):[];if(primary.length)return new Set(primary);return new Set(this.favoriteReciters||[]);},recitersSorted(){if(!Array.isArray(this.reciters))return[];const mainIds=this.mainReciterIds;const reciters=mainIds.size?this.reciters.filter(reciter=>mainIds.has(reciter.identifier)):this.reciters;const fav=new Set(this.favoriteReciters);const synced=new Set(this.reciterTimingMap?Object.keys(this.reciterTimingMap):[]);return[...reciters].sort((a,b)=>{const as=synced.has(a.identifier)?0:1;const bs=synced.has(b.identifier)?0:1;if(as!==bs)return as-bs;const ap=fav.has(a.identifier)?0:1;const bp=fav.has(b.identifier)?0:1;if(ap!==bp)return ap-bp;return(a.englishName||"").localeCompare(b.englishName||"");});},translationsSorted(){if(!Array.isArray(this.translations))return[];const fav=new Set(this.favoriteTranslations);return[...this.translations].sort((a,b)=>{const ap=fav.has(a.identifier)?0:1;const bp=fav.has(b.identifier)?0:1;if(ap!==bp)return ap-bp;if((a.flag||"")!==(b.flag||""))return(a.flag||"").localeCompare(b.flag||"");return(a.englishName||"").localeCompare(b.englishName||"");});},currentTranslationName(){if(!Array.isArray(this.translations))return"Translation";const match=this.translations.find(t=>t.identifier===this.selectedTranslation);return(match===null||match===void 0?void 0:match.englishName)||"Translation";},englishTranslationsSorted(){const source=Array.isArray(this.translationsSorted)?this.translationsSorted:[];const english=source.filter(translation=>{const language=String((translation===null||translation===void 0?void 0:translation.language)||"").toLowerCase();const identifier=String((translation===null||translation===void 0?void 0:translation.identifier)||"").toLowerCase();return language.startsWith("en")||identifier.startsWith("en.");});return english.length?english:source;},translationCompareSelectedTranslationObjects(){const options=this.englishTranslationsSorted;if(!Array.isArray(options)||!options.length)return[];const byId=new Map(options.map(translation=>[String(translation.identifier||""),translation]));const selected=[];const ids=this.translationCompareSelectedTranslationIds;ids.forEach(identifier=>{const key=String(identifier||"");if(!key||selected.some(item=>item.identifier===key))return;const match=byId.get(key);if(match)selected.push(match);});if(!selected.length&&options.length){selected.push(options[0]);}const max=Math.max(1,Number(this.translationCompareMaxSelections)||4);return selected.slice(0,max);},translationCompareSelectedTranslationIds(){const available=Array.isArray(this.englishTranslationsSorted)?this.englishTranslationsSorted.map(item=>String((item===null||item===void 0?void 0:item.identifier)||"")):[];const availableSet=new Set(available);const primary=String(this.translationComparePrimaryTranslation||"");const secondary=String(this.translationCompareSecondaryTranslation||"");const selected=[];if(primary&&availableSet.has(primary)){selected.push(primary);}if(secondary&&availableSet.has(secondary)&&secondary!==primary){selected.push(secondary);}if(selected.length<2){available.forEach(identifier=>{if(!identifier||selected.includes(identifier))return;selected.push(identifier);});}return selected.slice(0,2);},translationCompareSurahAyahs(){var _this$surahDetails13,_this$surahDetails14;const target=Number(this.translationCompareSurahNumber||this.selectedSurah||0);const active=Number(((_this$surahDetails13=this.surahDetails)===null||_this$surahDetails13===void 0?void 0:_this$surahDetails13.surahNumber)||0);if(!target||target!==active)return[];const ayahs=(_this$surahDetails14=this.surahDetails)===null||_this$surahDetails14===void 0?void 0:_this$surahDetails14.ayahs;return Array.isArray(ayahs)?ayahs:[];},translationCompareTotalAyahs(){return this.translationCompareSurahAyahs.length;},translationCompareCurrentAyah(){const ayahs=this.translationCompareSurahAyahs;if(!ayahs.length)return null;const index=Math.min(Math.max(0,Number(this.translationCompareAyahNumber||1)-1),ayahs.length-1);return ayahs[index]||null;},translationCompareDisplayColumns(){const selected=Array.isArray(this.translationCompareSelectedTranslationObjects)?this.translationCompareSelectedTranslationObjects:[];if(!selected.length)return[];const visible=selected.slice(0,2);const ayahNumber=Number(this.translationCompareAyahNumber||1);const textById=new Map();visible.forEach(translation=>{const id=String((translation===null||translation===void 0?void 0:translation.identifier)||"");if(!id)return;textById.set(id,this.getTranslationCompareText(id,ayahNumber));});return visible.map((translation,index)=>{const id=String((translation===null||translation===void 0?void 0:translation.identifier)||"");const variant=index===0?"a":"b";const text=String(textById.get(id)||"");return{translation,variant,matchCount:this.getTranslationCompareMatchCount(text),html:this.renderTranslationCompareText(text,variant)};});},translationCompareHighlightFeedbackLabel(){const query=String(this.translationCompareHighlightQuery||"").trim();if(!query)return"";const total=this.translationCompareDisplayColumns.reduce((sum,column)=>sum+Number((column===null||column===void 0?void 0:column.matchCount)||0),0);if(!total)return"No matches";return`${total} ${total===1?"match":"matches"} found`;},translationCompareGridStyle(){const count=Math.max(1,Math.min(Number(this.translationCompareDisplayColumns.length||1),Number(this.translationCompareMaxSelections)||4));return{"--translation-compare-cols":String(count)};},currentActionAyah(){if(!Array.isArray(this.filteredAyahs)||this.filteredAyahs.length===0)return null;const index=Math.min(Math.max(this.selectedCardIndex,0),this.filteredAyahs.length-1);return this.filteredAyahs[index]||this.filteredAyahs[0]||null;},totalItems(){return Array.isArray(this.filteredAyahs)?this.filteredAyahs.length:0;},isLongSurahVirtualMode(){return!this.isMemorisationMode&&Number(this.totalItems||0)>=Number(this.longSurahVirtualThreshold||140);},effectiveVirtualWindowSize(){if(this.isLongSurahVirtualMode){return Math.max(10,Number(this.longSurahWindowSize||14));}return Math.max(10,Number(this.windowSize||22));},effectiveVirtualBuffer(){if(this.isLongSurahVirtualMode){return Math.max(2,Number(this.longSurahBuffer||4));}return Math.max(2,Number(this.buffer||6));},canMinimizeNextStep(){return this.isMobile||this.isTablet;},isNextStepMinimized(){return this.canMinimizeNextStep&&this.nextStepMinimized;},currentHeaderOffset(){return this.getScrollTopOffset();},visibleWindow(){var _this$filteredAyahs;if(this.isMemorisationMode&&(_this$filteredAyahs=this.filteredAyahs)!==null&&_this$filteredAyahs!==void 0&&_this$filteredAyahs.length){const focus=this.memorisationFocusIndexSafe;const _out=[];if(focus>0)_out.push({index:focus-1,ayah:this.filteredAyahs[focus-1],role:"past"});_out.push({index:focus,ayah:this.filteredAyahs[focus],role:"current"});if(focus+1<this.filteredAyahs.length)_out.push({index:focus+1,ayah:this.filteredAyahs[focus+1],role:"next"});return _out;}const start=Math.max(0,Math.min(this.visibleStart,this.totalItems));const end=Math.max(start,Math.min(this.visibleEnd,this.totalItems));const out=[];if(!this.surahDetails||!Array.isArray(this.filteredAyahs))return out;for(let i=start;i<end;i++)out.push({index:i,ayah:this.filteredAyahs[i]});return out;},topSpacerHeight(){if(this.isMemorisationMode)return 0;return Math.max(0,this.visibleStart*this.itemHeight);},bottomSpacerHeight(){if(this.isMemorisationMode)return 0;const end=Math.max(this.visibleEnd,this.visibleStart);const remaining=Math.max(0,this.totalItems-end);return remaining*this.itemHeight;},currentAyahReflections(){if(!this.selectedReflectionKey)return[];const reflections=this.ayahReflections[this.selectedReflectionKey];return Array.isArray(reflections)?reflections:[];},pinnedAyahsList(){if(!this.pinnedAyahs||typeof this.pinnedAyahs!=="object"){return[];}return Object.entries(this.pinnedAyahs).map(([key,value])=>{if(!value||typeof value!=="object")return null;const surahNumber=Number(value.surahNumber);const ayahNumber=Number(value.ayahNumber);if(!surahNumber||!ayahNumber)return null;return _objectSpread(_objectSpread({},value),{},{key:key||this.buildAyahKey(surahNumber,ayahNumber),surahNumber,ayahNumber,pinnedAt:Number(value.pinnedAt)||0});}).filter(Boolean).sort((a,b)=>b.pinnedAt-a.pinnedAt);},hasPinnedAyahs(){return this.bookmarkAuthenticated&&this.pinnedAyahsList.length>0;},canPlaySurah(){return!this.isLoading&&Array.isArray(this.filteredAyahs)&&this.filteredAyahs.length>0;},canSubmitReflection(){const subject=(this.reflectionForm.subject||"").trim();const message=(this.reflectionForm.message||"").trim();return subject.length>0&&message.length>=this.reflectionMessageMinLength;},activePlaylist(){const id=String(this.activePlaylistId||"");return(this.playlists||[]).find(playlist=>String((playlist===null||playlist===void 0?void 0:playlist.id)||"")===id)||null;},customPlaylistAyahItems(){var _this$activePlaylist;return(((_this$activePlaylist=this.activePlaylist)===null||_this$activePlaylist===void 0?void 0:_this$activePlaylist.items)||[]).filter(item=>item&&item.type==="ayah");},customPlaylistItemCount(){return this.customPlaylistAyahItems.length;},shouldLimitPlaylistAyahListScroll(){return this.customPlaylistItemCount>4;},customPlaylistContext(){var _this$surahDetails15,_this$surahDetails16,_this$currentSurahInf12,_this$surahDetails17,_this$recitersSorted$;const surahNumber=Number(((_this$surahDetails15=this.surahDetails)===null||_this$surahDetails15===void 0?void 0:_this$surahDetails15.surahNumber)||this.selectedSurah||0);const surahName=((_this$surahDetails16=this.surahDetails)===null||_this$surahDetails16===void 0?void 0:_this$surahDetails16.englishName)||((_this$currentSurahInf12=this.currentSurahInfo)===null||_this$currentSurahInf12===void 0?void 0:_this$currentSurahInf12.englishName)||((_this$surahDetails17=this.surahDetails)===null||_this$surahDetails17===void 0?void 0:_this$surahDetails17.name)||(surahNumber?`Surah ${surahNumber}`:"Surah");const reciterName=((_this$recitersSorted$=this.recitersSorted.find(item=>item.identifier===this.selectedReciter))===null||_this$recitersSorted$===void 0?void 0:_this$recitersSorted$.englishName)||"Reciter";return{surah:surahNumber?`Current: ${surahNumber}. ${surahName}`:`Current: ${surahName}`,reciter:`Reciter: ${reciterName}`};},hasAnyPlaylist(){return Array.isArray(this.playlists)&&this.playlists.length>0;},sortedCustomPlaylists(){return[...(this.playlists||[])].sort((a,b)=>{const first=String((a===null||a===void 0?void 0:a.name)||"").trim().toLowerCase();const second=String((b===null||b===void 0?void 0:b.name)||"").trim().toLowerCase();if(first&&second&&first!==second){return first.localeCompare(second);}if(first&&!second)return-1;if(!first&&second)return 1;return String((a===null||a===void 0?void 0:a.id)||"").localeCompare(String((b===null||b===void 0?void 0:b.id)||""));});},filteredCustomPlaylists(){const query=String(this.playlistSearchQuery||"").trim().toLowerCase();const playlists=this.sortedCustomPlaylists||[];if(!query)return playlists;return playlists.filter(playlist=>{const name=String((playlist===null||playlist===void 0?void 0:playlist.name)||"").toLowerCase();const description=String((playlist===null||playlist===void 0?void 0:playlist.description)||"").toLowerCase();const itemCount=String(Array.isArray(playlist===null||playlist===void 0?void 0:playlist.items)?playlist.items.length:0);return`${name} ${description} ${itemCount}`.includes(query);});},activePlaylistSubtitle(){var _this$activePlaylist2;const description=String(((_this$activePlaylist2=this.activePlaylist)===null||_this$activePlaylist2===void 0?void 0:_this$activePlaylist2.description)||"").trim();if(description)return description;return"Add a description or cover style from Edit playlist.";},activePlaylistItems(){return[...(this.customPlaylistAyahItems||[])];},playlistEditorHasChanges(){var _this$activePlaylist3,_this$activePlaylist4;if(!this.activePlaylist)return false;const currentName=String(((_this$activePlaylist3=this.activePlaylist)===null||_this$activePlaylist3===void 0?void 0:_this$activePlaylist3.name)||"").trim()||"Untitled Playlist";const currentDescription=String(((_this$activePlaylist4=this.activePlaylist)===null||_this$activePlaylist4===void 0?void 0:_this$activePlaylist4.description)||"").trim();const nextName=String(this.playlistEditorName||"").trim()||"Untitled Playlist";const nextDescription=String(this.playlistEditorDescription||"").trim();return nextName!==currentName||nextDescription!==currentDescription;},orderedCustomPlaylistAyahItems(){return[...(this.customPlaylistAyahItems||[])];},filteredOrderedCustomPlaylistAyahItems(){let items=[...(this.orderedCustomPlaylistAyahItems||[])];const query=String(this.playlistAyahSearchQuery||"").trim().toLowerCase();if(query){items=items.filter(item=>{const surahNumber=Number((item===null||item===void 0?void 0:item.surahNumber)||0);const ayahNumber=Number((item===null||item===void 0?void 0:item.ayahNumber)||0);const ref=surahNumber&&ayahNumber?`${surahNumber}:${ayahNumber}`:"";const main=String(this.getCustomPlaylistItemMain(item)||"").toLowerCase();const arabic=String(this.getCustomPlaylistItemArabicName(item)||"").toLowerCase();const meta=String(this.getCustomPlaylistItemMeta(item)||"").toLowerCase();return`${ref} ${main} ${arabic} ${meta}`.includes(query);});}const mode=String(this.playlistAyahFilterMode||"all");if(mode==="selected"){items=items.filter(item=>this.isPlaylistItemSelected(item===null||item===void 0?void 0:item.id));}else if(mode==="now-playing"){items=items.filter(item=>this.isCustomPlaylistItemNowPlaying(item));}return items;},selectedPlaylistItemCount(){return Array.isArray(this.selectedPlaylistItemIds)?this.selectedPlaylistItemIds.length:0;},hasSelectedPlaylistItems(){return this.selectedPlaylistItemCount>0;},allActivePlaylistItemsSelected(){const total=this.activePlaylistItems.length;return total>0&&this.selectedPlaylistItemCount===total;},audioPlayerAutoQueueItems(){var _this$surahDetails18;const items=[];const ayahs=Array.isArray(this.filteredAyahs)?this.filteredAyahs:[];const current=Number(this.currentlyPlayingIndex);if(!ayahs.length||!Number.isInteger(current)||current<0)return items;const surahNumber=Number(((_this$surahDetails18=this.surahDetails)===null||_this$surahDetails18===void 0?void 0:_this$surahDetails18.surahNumber)||this.selectedSurah||0);if(!surahNumber)return items;const maxItems=8;for(let idx=current+1;idx<ayahs.length&&items.length<maxItems;idx++){var _this$surahDetails19,_this$currentSurahInf13;const ayah=ayahs[idx];const ayahNumber=Number((ayah===null||ayah===void 0?void 0:ayah.numberInSurah)||(ayah===null||ayah===void 0?void 0:ayah.number)||0);if(!ayahNumber)continue;items.push({id:`auto-${surahNumber}-${ayahNumber}`,source:"auto",surahNumber,ayahNumber,title:`Surah ${surahNumber}:${ayahNumber}`,description:((_this$surahDetails19=this.surahDetails)===null||_this$surahDetails19===void 0?void 0:_this$surahDetails19.englishName)||((_this$currentSurahInf13=this.currentSurahInfo)===null||_this$currentSurahInf13===void 0?void 0:_this$currentSurahInf13.englishName)||`Surah ${surahNumber}`,index:idx});}return items;},audioPlayerQueueItems(){const manual=(this.audioPlayerQueue||[]).map(item=>_objectSpread(_objectSpread({},item),{},{source:"manual"}));const seen=new Set(manual.map(item=>`${item.surahNumber}:${item.ayahNumber}`));const auto=(this.audioPlayerAutoQueueItems||[]).filter(item=>{const key=`${item.surahNumber}:${item.ayahNumber}`;if(seen.has(key))return false;seen.add(key);return true;});return[...manual,...auto];},audioPlayerQueueCount(){return(this.audioPlayerQueueItems||[]).length;}},watch:{savedAyahKeys:{deep:true,handler(next){this.persistSavedAyahs(next);}},pinnedAyahs:{deep:true,handler(next){this.persistPinnedAyahs(next);}},activePlaylistId(){this.selectedPlaylistItemIds=[];this.syncSelectedPlaylistItems();this.isPlaylistEditorVisible=false;this.showPlaylistEditorConfirmAction=false;this.playlistAyahSearchQuery="";this.playlistAyahFilterMode="all";this.playlistDragItemId="";this.playlistDragOverItemId="";this.openAyahPlaylistMenuKey="";this.openAyahPlaylistExistingSubmenuKey="";},bookmarkStorageUserId(next,prev){if(String(next||"")===String(prev||""))return;this.loadCustomPlaylist();},userId(next,prev){if(this.bookmarkStorageUserId)return;if(String(next||"")===String(prev||""))return;this.loadCustomPlaylist();},playlistEditorName(){this.showPlaylistEditorConfirmAction=false;},playlistEditorDescription(){this.showPlaylistEditorConfirmAction=false;},playlists:{deep:true,handler(){this.syncSelectedPlaylistItems();}},sidebarSearchQuery(value){clearTimeout(this.sidebarSearchDebounceTimer);this.sidebarSearchDebounceTimer=setTimeout(()=>{this.sidebarDebouncedQuery=value||"";},140);},sidebarDebouncedQuery(){this.resetSidebarVerseRenderCount();},activeSidebarTab(){this.resetSidebarVerseRenderCount();},searchQuery:function(val){clearTimeout(this.debounceTimer);this.debounceTimer=setTimeout(()=>{this.debouncedQuery=val;},300);},debouncedQuery(value){if(String(value||"").trim()){this.maybeLoadTranslationForVisibleContent({force:true});}},advancedSearchQuery:function(val){clearTimeout(this.advancedSearchDebounceTimer);if(!(val||"").trim()){this.clearAdvancedSearch(false);return;}if(!this.isAdvancedSearchPanelVisible){this.isAdvancedSearchPanelVisible=true;}this.advancedSearchDebounceTimer=setTimeout(()=>{this.runAdvancedSearch();},420);},selectedQuranFontId(newVal){if(!newVal)return;this.persistLocalSetting(this.quranFontPreferenceKey,newVal);this.syncQuranFontStack(newVal);},selectedReciter:function(newVal){if(newVal&&!this.isLoading){this.isSurahAudioDownloading=false;this.isSurahAudioDownloaded=false;clearTimeout(this.surahAudioDownloadedTimer);this.surahAudioDownloadedTimer=null;this.persistLocalSetting("suratSelectedReciter",newVal);this.isLoading=true;this.savePreference("selectedReciter",newVal);this.highlightLeadSeconds=this.getReciterLeadOffset(newVal);this.currentlyPlayingIndex=0;this.isHighlighted=false;this.translationLazyRequestToken=Number(this.translationLazyRequestToken||0)+1;this.setTranslationLazyState({surahNumber:String(this.selectedSurah||""),translationId:String(this.selectedTranslation||""),loaded:false,loading:false,error:""});this.fetchSurahDetails().then(()=>{this.resetAllAudioPlayers();this.isLoading=false;this.syncVirtualWindowAfterSelection();}).catch(()=>{this.isLoading=false;});}},selectedTranslation:function(newVal){if(newVal&&!this.isLoading){var _this$surahDetails20;this.persistLocalSetting("suratSelectedTranslation",newVal);this.savePreference("selectedTranslation",newVal);this.currentlyPlayingIndex=0;this.isHighlighted=false;this.translationLazyRequestToken=Number(this.translationLazyRequestToken||0)+1;this.setTranslationLazyState({surahNumber:String(((_this$surahDetails20=this.surahDetails)===null||_this$surahDetails20===void 0?void 0:_this$surahDetails20.surahNumber)||this.selectedSurah||""),translationId:String(newVal||""),loaded:false,loading:false,error:""});this.resetAyahTranslationsForLazyLoad();this.maybeLoadTranslationForVisibleContent();if(this.hasAdvancedSearchQuery&&this.isAdvancedSearchPanelVisible){this.runAdvancedSearch({force:true});}if(this.isTranslationCompareModalOpen){this.ensureTranslationCompareSelection({includeSelectedTranslation:true});this.refreshTranslationCompareEditions();}this.itemHeightCalibrated=false;this.$nextTick(()=>this.scheduleHeightCalibration(true));}},selectedSurah:function(newVal){if(newVal&&!this.isLoading){this.isSurahAudioDownloading=false;this.isSurahAudioDownloaded=false;clearTimeout(this.surahAudioDownloadedTimer);this.surahAudioDownloadedTimer=null;this.persistLocalSetting("suratSelectedSurah",newVal);this.isLoading=true;this.hideAyahTafsirModal({reset:true});this.translationVisibility={};this.transliterationVisibility={};this.tafsirVisibility={};this.tafsirContent={};this.tafsirMeta={};this.tafsirLoading={};this.tafsirError={};this.translationLazyRequestToken=Number(this.translationLazyRequestToken||0)+1;this.setTranslationLazyState({surahNumber:String(newVal||""),translationId:String(this.selectedTranslation||""),loaded:false,loading:false,error:""});this.savePreference("selectedSurah",newVal);this.currentlyPlayingIndex=0;this.isHighlighted=false;this.fetchSurahDetails().then(()=>{this.resetAllAudioPlayers();this.isLoading=false;this.syncVirtualWindowAfterSelection();if(this.isTranslationCompareModalOpen){this.translationCompareSurahNumber=Number(newVal||this.selectedSurah||1);this.setTranslationCompareAyahNumber(1,{announce:false});this.refreshTranslationCompareEditions();}}).catch(()=>{this.isLoading=false;});}},translationCompareAyahNumber(){this.$nextTick(()=>{this.resetTranslationCompareScrollPositions();});},translationCompareSurahNumber(){this.$nextTick(()=>{this.resetTranslationCompareScrollPositions();});},translationCompareSelectedTranslationIds:{deep:true,handler(){this.$nextTick(()=>{this.resetTranslationCompareScrollPositions();});}},filteredAyahs:function(newAyahs){const n=newAyahs.length;// Reuse arrays to reduce reactive churn
this.isAudioPlaying.length=n;this.isAudioPlaying.fill(false);this.isAudioLoading.length=n;this.isAudioLoading.fill(false);this.progress.length=n;this.progress.fill(0);this.audioElements.length=n;for(let i=0;i<n;i++)if(this.audioElements[i]===undefined)this.audioElements[i]=null;// Do not pre-create audio elements; create on-demand for faster starts
// Reset virtualization window to top ONLY if not navigating
if(!this.isNavigating){const size=this.effectiveVirtualWindowSize;const buffer=this.effectiveVirtualBuffer;this.visibleStart=0;this.visibleEnd=Math.min(size+buffer*2,n);}if(n===0){this.selectedCardIndex=0;this.currentlyPlayingIndex=0;this.memorisationFocusIndex=0;}else{const lastIndex=n-1;this.selectedCardIndex=Math.min(Math.max(this.selectedCardIndex,0),lastIndex);this.currentlyPlayingIndex=Math.min(Math.max(this.currentlyPlayingIndex,0),lastIndex);this.memorisationFocusIndex=Math.min(Math.max(this.memorisationFocusIndex,0),lastIndex);}this.ayahScrubValue=Math.min(Math.max(1,this.ayahScrubValue),Math.max(n,1));this.$nextTick(this.updateVirtualWindow);},currentlyPlayingIndex(next){if(typeof next!=="number"||next<0)return;this.ayahScrubValue=next+1;if(this.suppressPlaybackScrollSync||this.suppressPlaybackScrollOnce){this.suppressPlaybackScrollOnce=false;return;}this.syncPlaybackScroll(next);},memorisationRangeStart(newVal){if(newVal===null||newVal===undefined||newVal==="")return;const total=Math.max(Number(this.totalAyahs||1),1);const safeStart=Math.min(Math.max(1,Number(newVal)||1),total);if(safeStart!==newVal){this.memorisationRangeStart=safeStart;return;}if(this.memorisationRangeEnd&&safeStart>this.memorisationRangeEnd){this.memorisationRangeEnd=safeStart;}},memorisationRangeEnd(newVal){if(newVal===null||newVal===undefined||newVal==="")return;const total=Math.max(Number(this.totalAyahs||1),1);const safeEnd=Math.min(Math.max(1,Number(newVal)||1),total);if(safeEnd!==newVal){this.memorisationRangeEnd=safeEnd;return;}if(safeEnd<this.memorisationRangeStart){this.memorisationRangeStart=safeEnd;}},showTajweed(next){try{localStorage.setItem("suratShowTajweed",next?"1":"0");}catch(_){}const index=this.currentlyPlayingIndex;const audio=this.audioElements[index];const ayah=this.filteredAyahs[index];if(audio&&ayah&&audio.duration){this.updateWordTimings(ayah,audio.duration);}this._lastHighlightIndex=-1;this.clearActiveWordHighlight();},showRealtimeHighlighting(next){try{localStorage.setItem("suratShowRealtimeHighlighting",next?"1":"0");}catch(_){}if(this.bookmarkAuthenticated){this.savePreference(this.realtimeHighlightPreferenceKey,{enabled:!!next});}if(!next){this.stopHighlightLoop();return;}this._lastHighlightIndex=-1;if(typeof this.currentAudioIndex!=="number"||this.currentAudioIndex<0){const playingIndex=Array.isArray(this.isAudioPlaying)?this.isAudioPlaying.findIndex(Boolean):-1;if(playingIndex>=0){this.currentAudioIndex=playingIndex;}}const idx=typeof this.currentAudioIndex==="number"&&this.currentAudioIndex>=0?this.currentAudioIndex:this.currentlyPlayingIndex;if(this.isAudioPlaying[idx]){this.startHighlightLoop();}},showWordTranslation(next){try{localStorage.setItem("suratShowWordTranslation",next?"1":"0");}catch(_){}},showWordTranslationTooltip(next){try{localStorage.setItem("suratShowWordTranslationTooltip",next?"1":"0");}catch(_){}if(this.bookmarkAuthenticated){this.savePreference(this.wordTranslationTooltipPreferenceKey,{enabled:!!next});}},gestureNavigationEnabled(next){this.persistLocalSetting(this.gestureNavigationPreferenceKey,next?"1":"0");if(next)return;this.resetAyahCardSwipeGesture();this.resetAyahCardPointerGesture();},isMemorisationToolbarVisible(newVal){this.persistLocalSetting("suratIsMemorisationToolbarVisible",newVal?"1":"0");// Mutual exclusion: Hide main toolbar when memorisation is active
if(newVal){this.showDesktopToolbar=false;this.isMobileToolbarExpanded=false;this.memorisationFocusIndex=this.activeAyahIndex;this.isMemorisationAdvancedOpen=false;this.isMemorisationReadingAidsOpen=false;}else{this.showDesktopToolbar=true;this.isMemorisationMode=false;this.isMemorisationAdvancedOpen=false;this.isMemorisationReadingAidsOpen=false;this.clearMemorisationAutomationState();}},isBlurNextAyahEnabled(newVal){this.persistLocalSetting("suratIsBlurNextAyahEnabled",newVal?"1":"0");},isMemorisationMode(newVal){this.persistMemorisationModeSetting();},isTranslationVisible(newVal){this.persistLocalSetting("suratIsTranslationVisible",newVal?"1":"0");},playbackSpeed(newVal){const speed=Number(newVal);const allowed=Array.isArray(this.playbackSpeeds)&&this.playbackSpeeds.length?this.playbackSpeeds:[1];const safeSpeed=allowed.includes(speed)?speed:1;if(safeSpeed!==speed){this.playbackSpeed=safeSpeed;return;}this.currentSpeedIndex=Math.max(0,allowed.indexOf(safeSpeed));if(Array.isArray(this.audioElements)){this.audioElements.forEach(audio=>{if(audio)audio.playbackRate=safeSpeed;});}this.persistLocalSetting("playbackSpeed",String(safeSpeed));}},created(){// postpone loading until we know the authentication status
},async mounted(){var _JSON$parse;if(typeof window!=="undefined"){if("scrollRestoration"in window.history){window.history.scrollRestoration="manual";}this.isNavigating=true;window.scrollTo({top:0,behavior:"auto"});}window.addEventListener("keydown",this.onKeydown);this._keydownHandler=e=>{if(!this.bottomAudioPlayerEnabled||!this.showAudioPlayer)return;if(["INPUT","TEXTAREA"].includes((e.target||{}).tagName))return;switch(e.key){case" ":e.preventDefault();this.toggleAudioPlayer(this.currentlyPlayingIndex);break;case"ArrowRight":this.fastForwardAudio(this.currentlyPlayingIndex);break;case"ArrowLeft":this.rewindAudio(this.currentlyPlayingIndex);break;case"ArrowDown":this.playNextAyah(this.currentlyPlayingIndex);break;case"ArrowUp":this.playPrevAyah(this.currentlyPlayingIndex);break;}};window.addEventListener("keydown",this._keydownHandler);this.fullscreenChangeHandler=()=>this.handleNativeFullscreenChange();if(typeof document!=="undefined"){document.addEventListener("fullscreenchange",this.fullscreenChangeHandler);document.addEventListener("webkitfullscreenchange",this.fullscreenChangeHandler);}this.syncReadingFullscreenBodyClass(false);this.updateIsMobile();window.addEventListener("resize",this.updateIsMobile);this.detectSpeechRecognitionSupport();// Restore dismissal state for next-step card
try{if(localStorage.getItem("suratNextStepDismissed")==="1")this.showNextStep=false;}catch(_){}await this.initializeBookmarkAuth();this.syncHifdhAuthStorage();this.loadContinueProgress();this.loadContinueProgressHiddenState();await this.initializeFontSizePreferences();await this.initializeDeepFocusModePreference();await this.initializeReadingFullscreenPreference();await this.initializeVoiceCommandPreference();this.fetchUserId();// Initialize user ID for reading progress
this.bookmarkEventHandler=event=>this.handleBookmarksUpdated(event);this.bookmarkStorageHandler=event=>this.handleStorageBookmarksUpdated(event);this.visibilityHandler=()=>this.handleVisibilityChange();window.addEventListener("bookmarks-updated",this.bookmarkEventHandler);window.addEventListener("storage",this.bookmarkStorageHandler);window.addEventListener("visibilitychange",this.visibilityHandler);// Virtualization hooks
this.$nextTick(()=>{this.computeListTop();this.updateVirtualWindow();this.$nextTick(this.calibrateItemHeight);window.addEventListener("scroll",this.onScrollVirtual,{passive:true});window.addEventListener("resize",this.computeListTop,{passive:true});window.addEventListener("resize",this.calibrateItemHeight,{passive:true});});// Restore next-step minimized state
try{this.nextStepMinimized=localStorage.getItem("suratNextStepMinimized")==="1";}catch(_){}try{this.showMobileSurahInfoCard=localStorage.getItem(this.mobileSurahInfoCardStorageKey)!=="1";}catch(_){}await this.loadPinnedAyahs();await this.loadPinnedSectionUiPreference();let storedSurah=null;let storedReciter=null;let storedTranslation=null;let storedFont=null;let storedFontStack=null;try{storedSurah=localStorage.getItem("suratSelectedSurah");}catch(_){}try{storedReciter=localStorage.getItem("suratSelectedReciter");}catch(_){}try{storedTranslation=localStorage.getItem("suratSelectedTranslation");}catch(_){}try{storedFont=localStorage.getItem(this.quranFontPreferenceKey);}catch(_){}try{storedFontStack=localStorage.getItem(this.quranFontStackPreferenceKey);}catch(_){}this.selectedSurah=storedSurah||"2";this.selectedReciter=storedReciter||"ar.alafasy";this.selectedTranslation=storedTranslation||"en.ahmedali";this.translationCompareSurahNumber=Number(this.selectedSurah||2);this.translationCompareAyahNumber=1;this.selectedQuranFontId=this.coerceLegacyFontId(storedFont)||"";this.quranFontDraftId=this.selectedQuranFontId;this.storedQuranFontStack=storedFontStack||"";this.preloadTajweedRuleVerses();this.quranFonts=this.getQuranComFonts();this.ensureSelectedQuranFont();this.currentlyPlayingIndex=0;this.isHighlighted=false;this.continuousPlayback=(_JSON$parse=JSON.parse(localStorage.getItem("continuousPlayback")))!==null&&_JSON$parse!==void 0?_JSON$parse:false;let storedPlaybackSpeed=null;try{storedPlaybackSpeed=Number(localStorage.getItem("playbackSpeed"));}catch(_){}const defaultSpeed=1;this.playbackSpeed=this.playbackSpeeds.includes(storedPlaybackSpeed)?storedPlaybackSpeed:defaultSpeed;this.currentSpeedIndex=Math.max(0,this.playbackSpeeds.indexOf(this.playbackSpeed));let storedPreferredPlaybackMode=null;let storedPlaybackMode=null;try{storedPreferredPlaybackMode=localStorage.getItem("lastNonRepeatPlaybackMode");}catch(_){}try{storedPlaybackMode=localStorage.getItem("playbackMode");}catch(_){}this.preferredPlaybackMode=storedPreferredPlaybackMode||this.preferredPlaybackMode;this.setPlaybackMode(storedPlaybackMode||this.preferredPlaybackMode);try{const storedTajweed=localStorage.getItem("suratShowTajweed");if(storedTajweed!==null)this.showTajweed=storedTajweed==="1";}catch(_){}try{const storedWordTranslation=localStorage.getItem("suratShowWordTranslation");if(storedWordTranslation!==null)this.showWordTranslation=storedWordTranslation==="1";}catch(_){}try{const storedWordTranslationTooltip=localStorage.getItem("suratShowWordTranslationTooltip");if(storedWordTranslationTooltip!==null){this.showWordTranslationTooltip=storedWordTranslationTooltip==="1";}}catch(_){}try{const storedRealtimeHighlighting=localStorage.getItem("suratShowRealtimeHighlighting");if(storedRealtimeHighlighting!==null)this.showRealtimeHighlighting=storedRealtimeHighlighting==="1";}catch(_){}try{const storedGestureNavigation=localStorage.getItem(this.gestureNavigationPreferenceKey);if(storedGestureNavigation!==null){this.gestureNavigationEnabled=storedGestureNavigation==="1";}}catch(_){}try{const storedMemToolbarVisible=localStorage.getItem("suratIsMemorisationToolbarVisible");if(storedMemToolbarVisible!==null){const isMemVisible=storedMemToolbarVisible==="1";this.isMemorisationToolbarVisible=isMemVisible;if(isMemVisible){this.showDesktopToolbar=false;}}}catch(_){}try{const storedBlurNextAyah=localStorage.getItem("suratIsBlurNextAyahEnabled");if(storedBlurNextAyah!==null)this.isBlurNextAyahEnabled=storedBlurNextAyah==="1";}catch(_){}this.loadMemorisationModePreference();try{const storedTranslationVisible=localStorage.getItem("suratIsTranslationVisible");if(storedTranslationVisible!==null)this.isTranslationVisible=storedTranslationVisible==="1";}catch(_){}this.loadCustomPlaylist();Promise.all([this.fetchReciters(),this.fetchSurahs(),this.fetchTranslations(),this.fetchSurahDetails(),this.fetchQuranFonts(),this.fetchFontPreviewAyah()]).then(()=>{this.isInitialLoad=false;}).finally(()=>{if(typeof window!=="undefined"){window.scrollTo({top:0,behavior:"auto"});}this.isNavigating=false;});this.loadReciterLeadOffsets();this.highlightLeadSeconds=this.getReciterLeadOffset(this.selectedReciter);this.ensureTranslationCompareSelection({includeSelectedTranslation:true});this.prepareSettingsDraft();this.initializeHifdhScheduler();this.registerTranslationCompareModalEvents();this.$nextTick(()=>{const modalEl=document.getElementById(this.tafsirModalId);if(!modalEl)return;this.tafsirModalHiddenHandler=()=>{this.isTafsirModalOpen=false;};modalEl.addEventListener("hidden.bs.modal",this.tafsirModalHiddenHandler);});this.$nextTick(()=>{const modalEl=document.getElementById("hifdhPlanModal");if(!modalEl)return;this.hifdhPlanModalShownHandler=()=>{this.initializeHifdhTooltips();};modalEl.addEventListener("shown.bs.modal",this.hifdhPlanModalShownHandler);});if(this.shouldAutoOpenHifdhPlanFromQuery()){this.$nextTick(async()=>{await this.openHifdhPlanModalGuarded();this.clearHifdhPlanAutoOpenQuery();});}},beforeUnmount(){this.isComponentAlive=false;this.stopHighlightLoop();this.clearWordPreviewStopTimer();this.syncReadingFullscreenBodyClass(false);this.exitReadingFullscreen({restoreFocus:false,skipNativeExit:false,persistPreference:false});window.removeEventListener("keydown",this.onKeydown);if(this._keydownHandler)window.removeEventListener("keydown",this._keydownHandler);if(typeof document!=="undefined"&&this.fullscreenChangeHandler){document.removeEventListener("fullscreenchange",this.fullscreenChangeHandler);document.removeEventListener("webkitfullscreenchange",this.fullscreenChangeHandler);this.fullscreenChangeHandler=null;}window.removeEventListener("resize",this.updateIsMobile);window.removeEventListener("scroll",this.onScrollVirtual);window.removeEventListener("resize",this.computeListTop);window.removeEventListener("resize",this.calibrateItemHeight);if(this._boundMove){window.removeEventListener("mousemove",this._boundMove);window.removeEventListener("touchmove",this._boundMove);}if(this._boundUp){window.removeEventListener("mouseup",this._boundUp);window.removeEventListener("touchend",this._boundUp);}if(this.bookmarkEventHandler)window.removeEventListener("bookmarks-updated",this.bookmarkEventHandler);if(this.bookmarkStorageHandler)window.removeEventListener("storage",this.bookmarkStorageHandler);if(this.visibilityHandler)window.removeEventListener("visibilitychange",this.visibilityHandler);if(this.audioElements&&this.audioElements.forEach){this.audioElements.forEach(audio=>{if(audio&&audio.pause)audio.pause();if(audio&&audio.remove)audio.remove();});}this.stopTajweedRuleAudio();this.tajweedRuleExampleAudio=null;this.teardownSpeechRecognition();this.teardownVoiceCommandRecognition();clearTimeout(this.advancedSearchDebounceTimer);clearTimeout(this.sidebarSearchDebounceTimer);this.abortAdvancedSearchRequest();clearTimeout(this.savedAyahClearTimer);clearTimeout(this.surahAudioDownloadedTimer);this.surahAudioDownloadedTimer=null;clearTimeout(this.bookmarkToastTimer);this.bookmarkToastAction=null;clearTimeout(this.fontPickerAlertTimer);this.fontPickerAlertTimer=null;clearTimeout(this.authAlertTimer);clearTimeout(this.autoNextAnimationTimer);this.autoNextAnimationTimer=null;clearTimeout(this.swipeTransitionTimer);this.swipeTransitionTimer=null;clearTimeout(this.voiceCommandRestartTimer);this.voiceCommandRestartTimer=null;this.resetAyahCardPointerGesture();clearTimeout(this._scrollCorrectionTimer);this._scrollCorrectionTimer=null;clearTimeout(this._navigationSettleTimer);this._navigationSettleTimer=null;if(this.reflectionModalHiddenHandler){const modalEl=document.getElementById(this.reflectionModalId);if(modalEl){modalEl.removeEventListener("hidden.bs.modal",this.reflectionModalHiddenHandler);}this.reflectionModalHiddenHandler=null;}if(this.tafsirModalHiddenHandler){const modalEl=document.getElementById(this.tafsirModalId);if(modalEl){modalEl.removeEventListener("hidden.bs.modal",this.tafsirModalHiddenHandler);}this.tafsirModalHiddenHandler=null;}if(this.tafsirModalInstance){try{this.tafsirModalInstance.hide();}catch(_){}this.tafsirModalInstance=null;}this.isTafsirModalOpen=false;if(this.suratOnboardingModalInstance){try{this.suratOnboardingModalInstance.hide();}catch(_){// ignore modal teardown errors
}this.suratOnboardingModalInstance=null;}if(this.gestureGuideModalInstance){try{this.gestureGuideModalInstance.hide();}catch(_){// ignore modal teardown errors
}this.gestureGuideModalInstance=null;}const translationCompareModalEl=document.getElementById(this.translationCompareModalId);if(translationCompareModalEl&&this.translationCompareModalShownHandler){translationCompareModalEl.removeEventListener("shown.bs.modal",this.translationCompareModalShownHandler);this.translationCompareModalShownHandler=null;}if(translationCompareModalEl&&this.translationCompareModalHiddenHandler){translationCompareModalEl.removeEventListener("hidden.bs.modal",this.translationCompareModalHiddenHandler);this.translationCompareModalHiddenHandler=null;}if(this.translationCompareModalInstance){try{this.translationCompareModalInstance.hide();}catch(_){}this.translationCompareModalInstance=null;}if(this._heightMeasureRaf&&typeof window!=="undefined"){window.cancelAnimationFrame(this._heightMeasureRaf);this._heightMeasureRaf=null;}if(this.sidebarListScrollRaf&&typeof window!=="undefined"){window.cancelAnimationFrame(this.sidebarListScrollRaf);this.sidebarListScrollRaf=null;}const hifdhModalEl=document.getElementById("hifdhPlanModal");if(hifdhModalEl&&this.hifdhPlanModalShownHandler){hifdhModalEl.removeEventListener("shown.bs.modal",this.hifdhPlanModalShownHandler);this.hifdhPlanModalShownHandler=null;}this.disposeHifdhTooltips();this.clearHifdhConfettiLayers();},beforeDestroy(){this.stopHighlightLoop();this.syncReadingFullscreenBodyClass(false);this.exitReadingFullscreen({restoreFocus:false,skipNativeExit:false,persistPreference:false});window.removeEventListener("keydown",this.onKeydown);if(this._keydownHandler)window.removeEventListener("keydown",this._keydownHandler);if(typeof document!=="undefined"&&this.fullscreenChangeHandler){document.removeEventListener("fullscreenchange",this.fullscreenChangeHandler);document.removeEventListener("webkitfullscreenchange",this.fullscreenChangeHandler);this.fullscreenChangeHandler=null;}window.removeEventListener("resize",this.updateIsMobile);window.removeEventListener("scroll",this.onScrollVirtual);window.removeEventListener("resize",this.computeListTop);window.removeEventListener("resize",this.calibrateItemHeight);clearTimeout(this.autoNextAnimationTimer);this.autoNextAnimationTimer=null;this.teardownSpeechRecognition();this.teardownVoiceCommandRecognition();clearTimeout(this.advancedSearchDebounceTimer);clearTimeout(this.sidebarSearchDebounceTimer);this.abortAdvancedSearchRequest();clearTimeout(this.savedAyahClearTimer);clearTimeout(this.surahAudioDownloadedTimer);this.surahAudioDownloadedTimer=null;clearTimeout(this.bookmarkToastTimer);this.bookmarkToastAction=null;clearTimeout(this.fontPickerAlertTimer);this.fontPickerAlertTimer=null;clearTimeout(this.authAlertTimer);clearTimeout(this.voiceCommandRestartTimer);this.voiceCommandRestartTimer=null;clearTimeout(this._scrollCorrectionTimer);this._scrollCorrectionTimer=null;clearTimeout(this._navigationSettleTimer);this._navigationSettleTimer=null;if(this.reflectionModalHiddenHandler){const modalEl=document.getElementById(this.reflectionModalId);if(modalEl){modalEl.removeEventListener("hidden.bs.modal",this.reflectionModalHiddenHandler);}this.reflectionModalHiddenHandler=null;}if(this.tafsirModalHiddenHandler){const modalEl=document.getElementById(this.tafsirModalId);if(modalEl){modalEl.removeEventListener("hidden.bs.modal",this.tafsirModalHiddenHandler);}this.tafsirModalHiddenHandler=null;}if(this.tafsirModalInstance){try{this.tafsirModalInstance.hide();}catch(_){}this.tafsirModalInstance=null;}this.isTafsirModalOpen=false;if(this.suratOnboardingModalInstance){try{this.suratOnboardingModalInstance.hide();}catch(_){// ignore modal teardown errors
}this.suratOnboardingModalInstance=null;}if(this.gestureGuideModalInstance){try{this.gestureGuideModalInstance.hide();}catch(_){// ignore modal teardown errors
}this.gestureGuideModalInstance=null;}const translationCompareModalEl=document.getElementById(this.translationCompareModalId);if(translationCompareModalEl&&this.translationCompareModalShownHandler){translationCompareModalEl.removeEventListener("shown.bs.modal",this.translationCompareModalShownHandler);this.translationCompareModalShownHandler=null;}if(translationCompareModalEl&&this.translationCompareModalHiddenHandler){translationCompareModalEl.removeEventListener("hidden.bs.modal",this.translationCompareModalHiddenHandler);this.translationCompareModalHiddenHandler=null;}if(this.translationCompareModalInstance){try{this.translationCompareModalInstance.hide();}catch(_){}this.translationCompareModalInstance=null;}if(this._heightMeasureRaf&&typeof window!=="undefined"){window.cancelAnimationFrame(this._heightMeasureRaf);this._heightMeasureRaf=null;}if(this.sidebarListScrollRaf&&typeof window!=="undefined"){window.cancelAnimationFrame(this.sidebarListScrollRaf);this.sidebarListScrollRaf=null;}if(this._virtualWindowRaf&&typeof window!=="undefined"){window.cancelAnimationFrame(this._virtualWindowRaf);this._virtualWindowRaf=null;}this.clearHifdhConfettiLayers();},methods:_objectSpread(_objectSpread({},_surat_voice_commands__WEBPACK_IMPORTED_MODULE_5__.voiceCommandMethods),{},{async fetchUserId(){try{if(window.Laravel&&window.Laravel.userId){this.userId=window.Laravel.userId;}}catch(e){console.error("Failed to fetch user ID",e);}},syncReadingFullscreenBodyClass(enabled=this.isReadingFullscreen){if(typeof document==="undefined")return;const body=document.body;if(!body||!body.classList)return;body.classList.toggle(this.readingFullscreenBodyClass,!!enabled);},getNativeFullscreenElement(){if(typeof document==="undefined")return null;return document.fullscreenElement||document.webkitFullscreenElement||null;},supportsNativeFullscreen(){if(typeof document==="undefined")return false;const root=document.documentElement;return!!(root&&(typeof root.requestFullscreen==="function"||typeof root.webkitRequestFullscreen==="function"));},async requestNativeFullscreen(){if(!this.supportsNativeFullscreen())return false;const root=document.documentElement;const request=root.requestFullscreen||root.webkitRequestFullscreen;if(typeof request!=="function")return false;try{await request.call(root);return true;}catch(_){return false;}},async exitNativeFullscreen(){if(typeof document==="undefined")return false;const exit=document.exitFullscreen||document.webkitExitFullscreen;if(typeof exit!=="function")return false;try{await exit.call(document);return true;}catch(_){return false;}},handleNativeFullscreenChange(){const isNativeFullscreen=!!this.getNativeFullscreenElement();if(!isNativeFullscreen&&this.isReadingFullscreen){this.exitReadingFullscreen({skipNativeExit:true});}},focusReadingFullscreenToggleButton(){this.$nextTick(()=>{const toggleButton=this.$refs.readingFullscreenToggleButton;if(toggleButton&&typeof toggleButton.focus==="function"){toggleButton.focus();}});},async enterReadingFullscreen(){if(this.isReadingFullscreen||!this.isDesktopWide)return;if(typeof document!=="undefined"){const active=document.activeElement;this.readingFullscreenLastFocusedEl=active&&typeof active.focus==="function"?active:null;}else{this.readingFullscreenLastFocusedEl=null;}this.isReadingFullscreen=true;this.syncReadingFullscreenBodyClass(true);this.writeScopedBooleanPreference(this.readingFullscreenPreferenceBaseKey,true);this.focusReadingFullscreenToggleButton();await this.requestNativeFullscreen();},async exitReadingFullscreen(options={}){const{restoreFocus=true,skipNativeExit=false,persistPreference=true}=options||{};if(!this.isReadingFullscreen&&!this.getNativeFullscreenElement()){return;}this.isReadingFullscreen=false;this.syncReadingFullscreenBodyClass(false);if(persistPreference){this.writeScopedBooleanPreference(this.readingFullscreenPreferenceBaseKey,false);}if(!skipNativeExit&&this.getNativeFullscreenElement()){await this.exitNativeFullscreen();}if(!restoreFocus){this.readingFullscreenLastFocusedEl=null;return;}this.$nextTick(()=>{const previous=this.readingFullscreenLastFocusedEl;const fallback=this.$refs.readingFullscreenToggleButton;const canFocusPrevious=previous&&typeof previous.focus==="function"&&(typeof previous.isConnected!=="boolean"||previous.isConnected);if(canFocusPrevious){previous.focus();}else if(fallback&&typeof fallback.focus==="function"){fallback.focus();}this.readingFullscreenLastFocusedEl=null;});},async toggleReadingFullscreen(){if(this.isReadingFullscreen){await this.exitReadingFullscreen();return;}await this.enterReadingFullscreen();},clearMemorisationAutomationState(){if(this.countdownInterval){clearInterval(this.countdownInterval);this.countdownInterval=null;}if(this.memorisationRepetitionPauseTimeout){clearTimeout(this.memorisationRepetitionPauseTimeout);this.memorisationRepetitionPauseTimeout=null;}this.isCountdownActive=false;this.countdownSeconds=0;this.memorisationRepetitionCurrent=1;},toggleMemorisationToolbar(){this.scrollToTop();this.isMemorisationToolbarVisible=!this.isMemorisationToolbarVisible;if(this.isMemorisationToolbarVisible){this.showDesktopToolbar=false;this.isMobileToolbarExpanded=false;this.isMemorisationAdvancedOpen=false;this.isMemorisationReadingAidsOpen=false;}else{this.showDesktopToolbar=true;this.isMemorisationAdvancedOpen=false;this.isMemorisationReadingAidsOpen=false;this.clearMemorisationAutomationState();}this.showModeToggleToast("Memorisation tools",this.isMemorisationToolbarVisible);},toggleMemorisationAdvanced(){this.isMemorisationAdvancedOpen=!this.isMemorisationAdvancedOpen;if(this.isMemorisationAdvancedOpen){this.isMemorisationReadingAidsOpen=false;}},toggleMemorisationReadingAidsDropdown(){this.isMemorisationReadingAidsOpen=!this.isMemorisationReadingAidsOpen;if(this.isMemorisationReadingAidsOpen){this.isMemorisationAdvancedOpen=false;}},toggleBlurNextAyah(){this.isBlurNextAyahEnabled=!this.isBlurNextAyahEnabled;this.showModeToggleToast("Blur next ayah",this.isBlurNextAyahEnabled);},showToast(message,timeout=3500,action=null){this.bookmarkToast=message;this.bookmarkToastAction=action;clearTimeout(this.bookmarkToastTimer);this.bookmarkToastTimer=setTimeout(()=>{this.bookmarkToast="";this.bookmarkToastAction=null;},timeout);},handleBookmarkToastAction(){const action=this.bookmarkToastAction;if(!action||typeof action.handler!=="function")return;try{action.handler();}finally{this.bookmarkToast="";this.bookmarkToastAction=null;}},showModeToggleToast(label,enabled){this.showToast(`${label}: ${enabled?"On":"Off"}`,3200);},notifyAyahDelayChange(){let value=Number(this.memorisationVerseDelay);if(!Number.isFinite(value))value=0;value=Math.max(0,Math.min(60,Math.round(value)));this.memorisationVerseDelay=value;this.showToast(`Ayah delay: ${value}s`,3200);this.announce(`Ayah delay set to ${value} seconds.`);},abortAdvancedSearchRequest(){if(!this.advancedSearchAbortController)return;try{this.advancedSearchAbortController.abort();}catch(_){// ignore aborted controller issues
}this.advancedSearchAbortController=null;},clearAdvancedSearch(resetInput=true){clearTimeout(this.advancedSearchDebounceTimer);this.abortAdvancedSearchRequest();if(resetInput){this.advancedSearchQuery="";}this.advancedSearchResults=[];this.advancedSearchLoading=false;this.advancedSearchError="";this.advancedSearchTotalMatches=0;this.advancedSearchExpandedSurahs={};},toggleAdvancedSearchVisibility(){const nextState=!this.isAdvancedSearchVisible;this.isAdvancedSearchVisible=nextState;if(!nextState){this.stopVoiceSearch();this.abortAdvancedSearchRequest();this.speechRecognitionError="";return;}if(this.hasAdvancedSearchQuery&&this.isAdvancedSearchPanelVisible){this.runAdvancedSearch({force:true});}},closeAdvancedSearchPanel(){this.stopVoiceSearch();this.speechRecognitionError="";this.clearAdvancedSearch(false);this.isAdvancedSearchPanelVisible=false;},getDefaultTranslationCompareSelection(){const options=Array.isArray(this.englishTranslationsSorted)?this.englishTranslationsSorted:[];const optionIds=new Set(options.map(translation=>String(translation.identifier||"")));const preferred=[this.selectedTranslation,...(Array.isArray(this.favoriteTranslations)?this.favoriteTranslations:[]),"en.sahih","en.pickthall","en.yusufali","en.ahmedali"];const out=[];preferred.forEach(identifier=>{const key=String(identifier||"");if(!key||out.includes(key)||!optionIds.has(key))return;out.push(key);});if(out.length<2&&options.length){options.forEach(translation=>{const key=String((translation===null||translation===void 0?void 0:translation.identifier)||"");if(!key||out.includes(key)||!optionIds.has(key))return;out.push(key);});}return out.slice(0,2);},ensureTranslationCompareSelection(_options={}){const options=Array.isArray(this.englishTranslationsSorted)?this.englishTranslationsSorted:[];const allowed=new Set(options.map(translation=>String(translation.identifier||"")));const defaults=this.getDefaultTranslationCompareSelection();let primary=String(this.translationComparePrimaryTranslation||"");let secondary=String(this.translationCompareSecondaryTranslation||"");if(!primary||!allowed.has(primary)){primary=String(defaults[0]||"");}if(!secondary||!allowed.has(secondary)){secondary=String(defaults[1]||"");}if(!secondary||secondary===primary){const nextAlternative=options.find(translation=>{const key=String((translation===null||translation===void 0?void 0:translation.identifier)||"");return key&&key!==primary;});secondary=String((nextAlternative===null||nextAlternative===void 0?void 0:nextAlternative.identifier)||"");}if(!primary&&secondary){primary=secondary;}this.translationComparePrimaryTranslation=primary;this.translationCompareSecondaryTranslation=secondary;return[primary,secondary].filter(Boolean).slice(0,2);},onTranslationComparePrimaryChange(){const previousSecondary=String(this.translationCompareSecondaryTranslation||"");this.ensureTranslationCompareSelection();if(previousSecondary&&previousSecondary===String(this.translationComparePrimaryTranslation||"")){this.showToast("Second translation auto-switched to keep both different.",2800);}this.refreshTranslationCompareEditions();},onTranslationCompareSecondaryChange(){const selectedPrimary=String(this.translationComparePrimaryTranslation||"");const selectedSecondary=String(this.translationCompareSecondaryTranslation||"");if(selectedPrimary&&selectedSecondary&&selectedPrimary===selectedSecondary){this.ensureTranslationCompareSelection();this.showToast("Choose two different translations for side-by-side comparison.",2800);}else{this.ensureTranslationCompareSelection();}this.refreshTranslationCompareEditions();},async refreshTranslationCompareEditions(){const surahNumber=Number(this.translationCompareSurahNumber||this.selectedSurah||0);const translationIds=Array.isArray(this.translationCompareSelectedTranslationIds)?this.translationCompareSelectedTranslationIds:[];if(!surahNumber||!translationIds.length)return;const requestToken=Number(this.translationCompareRequestToken||0)+1;this.translationCompareRequestToken=requestToken;this.translationCompareLoading=true;this.translationCompareError="";const failed=[];await Promise.all(translationIds.map(async translationId=>{var _this$surahDetails21,_this$surahDetails22;const identifier=String(translationId||"");if(!identifier)return;const activeSurahNumber=Number(((_this$surahDetails21=this.surahDetails)===null||_this$surahDetails21===void 0?void 0:_this$surahDetails21.surahNumber)||0);const canReuseActiveTranslation=identifier===String(this.selectedTranslation||"")&&activeSurahNumber===surahNumber&&Array.isArray((_this$surahDetails22=this.surahDetails)===null||_this$surahDetails22===void 0?void 0:_this$surahDetails22.ayahs)&&this.surahDetails.ayahs.length>0;if(canReuseActiveTranslation)return;const cacheSlotKey=`${surahNumber}:${identifier}`;const cached=this.translationCompareEditionCache[cacheSlotKey];if(Array.isArray(cached)&&cached.length)return;try{var _data$data;const endpoint=`https://api.alquran.cloud/v1/surah/${encodeURIComponent(surahNumber)}/${encodeURIComponent(identifier)}`;const cacheKey=`cache:surah-compare:${surahNumber}:${identifier}`;const{data}=await this.cachedFetchJSON(endpoint,cacheKey,14*24*60*60*1000);if(requestToken!==this.translationCompareRequestToken)return;const ayahs=Array.isArray(data===null||data===void 0||(_data$data=data.data)===null||_data$data===void 0?void 0:_data$data.ayahs)?data.data.ayahs.map(ayah=>String((ayah===null||ayah===void 0?void 0:ayah.text)||"")):[];this.translationCompareEditionCache=_objectSpread(_objectSpread({},this.translationCompareEditionCache),{},{[cacheSlotKey]:ayahs});}catch(_){failed.push(identifier);}}));if(requestToken!==this.translationCompareRequestToken)return;this.translationCompareLoading=false;if(failed.length){this.translationCompareError="Some selected translations are temporarily unavailable.";}},toggleTranslationCompareInlineCollapsed(){this.translationCompareInlineCollapsed=!this.translationCompareInlineCollapsed;},getTranslationCompareText(translationId,ayahNumber){var _this$surahDetails23;const identifier=String(translationId||"");const surahNumber=Number(this.translationCompareSurahNumber||this.selectedSurah||0);const index=Math.max(0,Number(ayahNumber||1)-1);const activeSurahNumber=Number(((_this$surahDetails23=this.surahDetails)===null||_this$surahDetails23===void 0?void 0:_this$surahDetails23.surahNumber)||0);if(identifier&&identifier===String(this.selectedTranslation||"")&&surahNumber===activeSurahNumber){var _this$surahDetails24,_this$translationLazy;const fromCurrentSurah=((_this$surahDetails24=this.surahDetails)===null||_this$surahDetails24===void 0||(_this$surahDetails24=_this$surahDetails24.ayahs)===null||_this$surahDetails24===void 0||(_this$surahDetails24=_this$surahDetails24[index])===null||_this$surahDetails24===void 0?void 0:_this$surahDetails24.translation)||"";if(fromCurrentSurah)return fromCurrentSurah;const selectedCacheSlotKey=`${surahNumber}:${identifier}`;const selectedCachedAyahs=this.translationCompareEditionCache[selectedCacheSlotKey];const selectedCachedText=Array.isArray(selectedCachedAyahs)?selectedCachedAyahs[index]:"";if(selectedCachedText)return selectedCachedText;if((_this$translationLazy=this.translationLazyState)!==null&&_this$translationLazy!==void 0&&_this$translationLazy.loading)return"Loading...";return"Translation not available";}const cacheSlotKey=`${surahNumber}:${identifier}`;const cachedAyahs=this.translationCompareEditionCache[cacheSlotKey];const text=Array.isArray(cachedAyahs)?cachedAyahs[index]:"";if(text)return text;if(this.translationCompareLoading)return"Loading...";return"Translation not available";},getTranslationCompareHighlightTerms(){return String(this.translationCompareHighlightQuery||"").trim().split(/\s+/).map(term=>term.trim()).filter(Boolean).slice(0,12);},getTranslationCompareHighlightRegex(){const terms=this.getTranslationCompareHighlightTerms();if(!terms.length)return null;const pattern=terms.map(term=>this.escapeRegExp(term)).join("|");if(!pattern)return null;return new RegExp(`(${pattern})`,"gi");},getTranslationCompareMatchCount(text){const source=String(text||"");if(!source)return 0;const terms=this.getTranslationCompareHighlightTerms();if(!terms.length)return 0;return terms.reduce((total,term)=>{const regex=new RegExp(this.escapeRegExp(term),"gi");const matches=source.match(regex);return total+(Array.isArray(matches)?matches.length:0);},0);},formatTranslationCompareMatchCount(count){const safe=Math.max(0,Number(count||0));if(!safe)return"No matches";return`${safe} ${safe===1?"match":"matches"} in this translation`;},renderTranslationCompareHighlightedText(text,variant="a"){const source=String(text||"");if(!source)return"";const regex=this.getTranslationCompareHighlightRegex();if(!regex)return this.escapeHtml(source);let output="";let cursor=0;let match;while((match=regex.exec(source))!==null){const full=String(match[0]||"");const start=Number(match.index||0);output+=this.escapeHtml(source.slice(cursor,start));output+=`<mark class="translation-compare-highlight translation-compare-highlight-${this.escapeHtmlAttribute(variant)}">${this.escapeHtml(full)}</mark>`;cursor=start+full.length;if(regex.lastIndex===match.index){regex.lastIndex+=1;}}output+=this.escapeHtml(source.slice(cursor));return output;},renderTranslationCompareText(text,variant="a"){return this.renderTranslationCompareHighlightedText(text,variant);},resetTranslationCompareScrollPositions(){const modalEl=document.getElementById(this.translationCompareModalId);if(!modalEl)return;const panels=modalEl.querySelectorAll("[data-compare-scroll]");panels.forEach(panel=>{if(!panel||typeof panel.scrollTop!=="number")return;panel.scrollTop=0;});},setTranslationCompareAyahNumber(value,options={}){const{announce=false}=options;const total=Math.max(Number(this.translationCompareTotalAyahs||1),1);const parsed=Number(value);const safe=Math.min(total,Math.max(1,Math.round(parsed||1)));this.translationCompareAyahNumber=safe;if(announce){this.announce(`Ayah ${safe}.`);}},onTranslationCompareAyahInputChange(event){var _event$target;const value=Number((event===null||event===void 0||(_event$target=event.target)===null||_event$target===void 0?void 0:_event$target.value)||this.translationCompareAyahNumber);this.setTranslationCompareAyahNumber(value,{announce:false});},stepTranslationCompareAyah(delta=1){const step=Number(delta||0);if(!step)return;this.setTranslationCompareAyahNumber(Number(this.translationCompareAyahNumber||1)+step,{announce:false});},async applyTranslationCompareSurahSelection(){const target=Math.min(114,Math.max(1,Number(this.translationCompareSurahNumber||1)));this.translationCompareSurahNumber=target;this.translationCompareError="";if(String(this.selectedSurah)!==String(target)){try{await this.selectSurah(String(target),{skipScroll:true});}catch(_){this.translationCompareError="Unable to switch surah right now. Please try again.";return;}}this.setTranslationCompareAyahNumber(1,{announce:false});this.refreshTranslationCompareEditions();},async stepTranslationCompareSurah(delta=1){const target=Math.min(114,Math.max(1,Number(this.translationCompareSurahNumber||this.selectedSurah||1)+Number(delta||0)));if(target===Number(this.translationCompareSurahNumber||this.selectedSurah||1)){return;}this.translationCompareSurahNumber=target;await this.applyTranslationCompareSurahSelection();},getReaderContextAyahNumber(){var _this$filteredAyahs2;const preferredIndex=this.isAnyAudioPlaying&&Number.isInteger(this.currentlyPlayingIndex)&&this.currentlyPlayingIndex>=0?this.currentlyPlayingIndex:Number.isInteger(this.selectedCardIndex)&&this.selectedCardIndex>=0?this.selectedCardIndex:0;const contextAyah=((_this$filteredAyahs2=this.filteredAyahs)===null||_this$filteredAyahs2===void 0?void 0:_this$filteredAyahs2[preferredIndex])||this.currentActionAyah||this.translationCompareCurrentAyah||null;return Number((contextAyah===null||contextAyah===void 0?void 0:contextAyah.numberInSurah)||(contextAyah===null||contextAyah===void 0?void 0:contextAyah.number)||1);},async prepareTranslationCompareModal(options={}){const{useReaderContext=false}=options;this.ensureTranslationCompareSelection();this.translationCompareSurahNumber=Number(this.selectedSurah||this.translationCompareSurahNumber||1);const nextAyah=useReaderContext?this.getReaderContextAyahNumber():this.translationCompareAyahNumber;this.setTranslationCompareAyahNumber(nextAyah,{announce:false});await this.refreshTranslationCompareEditions();this.$nextTick(()=>{this.resetTranslationCompareScrollPositions();});},registerTranslationCompareModalEvents(){this.$nextTick(()=>{const modalEl=document.getElementById(this.translationCompareModalId);if(!modalEl)return;if(this.translationCompareModalShownHandler){modalEl.removeEventListener("shown.bs.modal",this.translationCompareModalShownHandler);}if(this.translationCompareModalHiddenHandler){modalEl.removeEventListener("hidden.bs.modal",this.translationCompareModalHiddenHandler);}this.translationCompareModalShownHandler=()=>{this.isTranslationCompareModalOpen=true;this.prepareTranslationCompareModal({useReaderContext:true});};this.translationCompareModalHiddenHandler=()=>{this.isTranslationCompareModalOpen=false;this.translationCompareError="";this.translationCompareLoading=false;this.translationCompareRequestToken=Number(this.translationCompareRequestToken||0)+1;};modalEl.addEventListener("shown.bs.modal",this.translationCompareModalShownHandler);modalEl.addEventListener("hidden.bs.modal",this.translationCompareModalHiddenHandler);});},async openTranslationCompareModal(){const modalEl=document.getElementById(this.translationCompareModalId);if(!modalEl)return;this.translationCompareModalInstance=this.translationCompareModalInstance||bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl)||new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(modalEl);this.translationCompareModalInstance.show();this.prepareTranslationCompareModal({useReaderContext:true});},async onTranslationCompareWordClick(event){var _event$target2,_event$target2$closes,_this$filteredAyahs3;const wordEl=event===null||event===void 0||(_event$target2=event.target)===null||_event$target2===void 0||(_event$target2$closes=_event$target2.closest)===null||_event$target2$closes===void 0?void 0:_event$target2$closes.call(_event$target2,"[data-word-index]");if(!wordEl||!this.showWordTranslationTooltip)return;const displayWordIndex=Number(wordEl.getAttribute("data-word-index"));if(!Number.isFinite(displayWordIndex)||displayWordIndex<0)return;const ayahNumber=Number(this.translationCompareAyahNumber||1);let index=this.resolveAyahIndexByNumber(ayahNumber);if(index<0){this.clearMainAyahSearchFilter();await this.$nextTick();index=this.resolveAyahIndexByNumber(ayahNumber);}if(index<0)return;const ayah=((_this$filteredAyahs3=this.filteredAyahs)===null||_this$filteredAyahs3===void 0?void 0:_this$filteredAyahs3[index])||null;if(!ayah)return;event.stopPropagation();await this.seekToAyahWord(index,ayah,displayWordIndex);},openSuratOnboarding(){const modalEl=document.getElementById(this.suratOnboardingModalId);if(!modalEl)return;this.suratOnboardingModalInstance=this.suratOnboardingModalInstance||bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl)||new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(modalEl);this.suratOnboardingModalInstance.show();},openGestureGuideModal(){var _settingsEl$classList;const openGuide=()=>{const modalEl=document.getElementById(this.gestureGuideModalId);if(!modalEl)return;this.gestureGuideModalInstance=this.gestureGuideModalInstance||bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl)||new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(modalEl);this.gestureGuideModalInstance.show();};const settingsEl=document.getElementById(this.settingsModalId);const settingsModal=settingsEl&&(bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(settingsEl)||this.settingsModalInstance)||this.settingsModalInstance;const isSettingsOpen=!!(settingsEl!==null&&settingsEl!==void 0&&(_settingsEl$classList=settingsEl.classList)!==null&&_settingsEl$classList!==void 0&&_settingsEl$classList.contains("show"));if(isSettingsOpen&&settingsModal){try{settingsModal.hide();}catch(_){}setTimeout(openGuide,180);return;}openGuide();},clearSuratOnboardingSearch(){this.suratOnboardingSearchQuery="";},increaseSuratOnboardingFontSize(){if(this.suratOnboardingFontSize<this.suratOnboardingFontSizeMax){this.suratOnboardingFontSize+=1;}},decreaseSuratOnboardingFontSize(){if(this.suratOnboardingFontSize>this.suratOnboardingFontSizeMin){this.suratOnboardingFontSize-=1;}},highlightSuratOnboardingText(value){const safeValue=this.escapeHtml(value||"");const terms=this.suratOnboardingSearchTerms;if(!terms.length)return safeValue;let highlighted=safeValue;terms.forEach(term=>{const regex=new RegExp(`(${this.escapeRegExp(term)})`,"gi");highlighted=highlighted.replace(regex,'<span class="surat-onboarding-highlight">$1</span>');});return highlighted;},getSpeechRecognitionErrorMessage(code=""){const normalized=String(code||"").toLowerCase();if(normalized==="not-supported")return"Speech recognition is not supported in this browser.";if(normalized==="insecure-context")return"Speech recognition requires HTTPS (or localhost).";if(normalized==="no-speech")return"No speech detected. Try speaking again.";if(normalized==="audio-capture")return"Microphone unavailable. Check microphone access.";if(normalized==="not-allowed"||normalized==="service-not-allowed")return"Microphone permission denied by browser settings.";if(normalized==="network")return"Speech recognition network issue. Please retry.";if(normalized==="language-not-supported")return"Speech language is not supported in this browser.";return"Speech recognition failed. Please try again.";},getSpeechRecognitionConstructor(){if(typeof window==="undefined")return null;return window.SpeechRecognition||window.webkitSpeechRecognition||null;},detectSpeechRecognitionSupport(){this.speechRecognitionSupported=!!this.getSpeechRecognitionConstructor();},isSpeechRecognitionSecureContext(){var _window$location;if(typeof window==="undefined")return false;if(window.isSecureContext)return true;const host=String(((_window$location=window.location)===null||_window$location===void 0?void 0:_window$location.hostname)||"").toLowerCase();return host==="localhost"||host==="127.0.0.1"||host==="[::1]";},initializeSpeechRecognition(){if(typeof window==="undefined")return;if(this.speechRecognitionInstance)return;const SpeechRecognition=this.getSpeechRecognitionConstructor();if(!SpeechRecognition){this.speechRecognitionSupported=false;return;}let recognition=null;try{recognition=new SpeechRecognition();}catch(_){this.speechRecognitionSupported=false;this.speechRecognitionError=this.getSpeechRecognitionErrorMessage("not-supported");return;}recognition.interimResults=true;recognition.maxAlternatives=1;recognition.continuous=false;recognition.lang=typeof navigator!=="undefined"&&navigator.language||"en-US";recognition.onstart=()=>{this.speechRecognitionListening=true;this.speechRecognitionError="";};recognition.onresult=event=>{if(!(event!==null&&event!==void 0&&event.results))return;let transcript="";for(let i=event.resultIndex;i<event.results.length;i++){var _event$results$i;const text=((_event$results$i=event.results[i])===null||_event$results$i===void 0||(_event$results$i=_event$results$i[0])===null||_event$results$i===void 0?void 0:_event$results$i.transcript)||"";if(!text)continue;transcript+=`${text} `;}const normalizedTranscript=transcript.trim();if(!normalizedTranscript)return;this.advancedSearchQuery=normalizedTranscript;let hasFinalResult=false;for(let i=event.resultIndex;i<event.results.length;i++){var _event$results$i2;if((_event$results$i2=event.results[i])!==null&&_event$results$i2!==void 0&&_event$results$i2.isFinal){hasFinalResult=true;break;}}if(hasFinalResult){this.runAdvancedSearch({force:true});}};recognition.onerror=event=>{const code=(event===null||event===void 0?void 0:event.error)||"";this.speechRecognitionListening=false;if(code==="aborted")return;this.speechRecognitionError=this.getSpeechRecognitionErrorMessage(code);};recognition.onend=()=>{this.speechRecognitionListening=false;if(this.voiceCommandsEnabled&&!this.voiceCommandListening){this.startVoiceCommandListening({silentError:true});}};this.speechRecognitionInstance=recognition;this.speechRecognitionSupported=true;this.speechRecognitionLocale=recognition.lang||"en-US";},startVoiceSearch(){if(!this.speechRecognitionSupported){this.detectSpeechRecognitionSupport();}if(!this.speechRecognitionSupported){this.speechRecognitionError=this.getSpeechRecognitionErrorMessage("not-supported");return;}if(!this.isSpeechRecognitionSecureContext()){this.speechRecognitionError=this.getSpeechRecognitionErrorMessage("insecure-context");return;}if(!this.speechRecognitionInstance){this.initializeSpeechRecognition();}if(!this.speechRecognitionInstance){this.speechRecognitionError=this.getSpeechRecognitionErrorMessage("not-supported");return;}if(this.voiceCommandsEnabled){this.stopVoiceCommandListening({keepEnabled:true});}this.speechRecognitionError="";try{this.speechRecognitionInstance.lang=typeof navigator!=="undefined"&&navigator.language||this.speechRecognitionLocale||"en-US";this.speechRecognitionLocale=this.speechRecognitionInstance.lang;this.speechRecognitionInstance.start();}catch(error){const name=String((error===null||error===void 0?void 0:error.name)||"").toLowerCase();if(name==="invalidstateerror")return;if(name==="notallowederror"||name==="securityerror"){this.speechRecognitionError=this.getSpeechRecognitionErrorMessage("not-allowed");return;}this.speechRecognitionError=this.getSpeechRecognitionErrorMessage();}},stopVoiceSearch(){if(!this.speechRecognitionInstance)return;try{this.speechRecognitionInstance.stop();}catch(_){// ignore stop race conditions
}this.speechRecognitionListening=false;},toggleVoiceSearch(){if(this.speechRecognitionListening){this.stopVoiceSearch();return;}this.startVoiceSearch();},teardownSpeechRecognition(){if(!this.speechRecognitionInstance)return;try{this.speechRecognitionInstance.onstart=null;this.speechRecognitionInstance.onresult=null;this.speechRecognitionInstance.onerror=null;this.speechRecognitionInstance.onend=null;this.speechRecognitionInstance.stop();}catch(_){// ignore teardown failures
}this.speechRecognitionInstance=null;this.speechRecognitionListening=false;},getScrollTopOffset(){if(typeof window==="undefined"||typeof document==="undefined"){return this.headerCollapsed?56:92;}let offset=72;try{const rootStyle=window.getComputedStyle(document.documentElement);const cssOffset=parseFloat(rootStyle.getPropertyValue("--nav-offset"));if(Number.isFinite(cssOffset)&&cssOffset>0){offset=cssOffset;}}catch(_){// fall back to default nav offset
}let total=offset+10;const addToolbarOffsetIfVisible=(selector,overlapBuffer=28)=>{const el=document.querySelector(selector);if(!el||!el.getBoundingClientRect)return;const style=window.getComputedStyle(el);if(style.display==="none"||style.visibility==="hidden"||Number(style.opacity)===0){return;}const rect=el.getBoundingClientRect();const overlapsTopBand=rect.height>0&&rect.bottom>offset&&rect.top<=offset+overlapBuffer;if(overlapsTopBand){total+=rect.height+10;}};// Desktop sticky toolbar.
addToolbarOffsetIfVisible(".quran-toolbar-sticky",28);// Mobile/tablet fixed toolbar (when pinned).
addToolbarOffsetIfVisible(".advanced-quran-mobile-controls.is-pinned",36);return Math.min(Math.max(total,56),340);},getAdvancedSearchEditions(query){const hasArabic=/[\u0600-\u06FF]/.test(query||"");const translationId=this.selectedTranslation||"en.ahmedali";const ordered=hasArabic?["quran-uthmani",translationId]:[translationId];return Array.from(new Set(ordered.filter(edition=>typeof edition==="string"&&edition.trim())));},escapeRegExp(value){return String(value||"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&");},getAdvancedSearchTerms(){const query=(this.advancedSearchQuery||"").trim();if(!query)return[];return query.split(/\s+/).map(term=>term.trim()).filter(Boolean);},highlightAdvancedSearchText(text){const safeText=this.escapeHtml(text||"");const terms=this.getAdvancedSearchTerms();if(!terms.length)return safeText;let highlighted=safeText;terms.forEach(term=>{const regex=new RegExp(`(${this.escapeRegExp(term)})`,"gi");highlighted=highlighted.replace(regex,'<span class="advanced-search-highlight">$1</span>');});return highlighted;},readAdvancedSearchCache(cacheKey,ttlMs){if(typeof window==="undefined")return null;try{const raw=localStorage.getItem(cacheKey);if(!raw)return null;const parsed=JSON.parse(raw);if(!parsed||!parsed.ts||typeof parsed.data==="undefined")return null;if(Date.now()-parsed.ts>ttlMs)return null;return parsed.data;}catch(_){return null;}},writeAdvancedSearchCache(cacheKey,data){if(typeof window==="undefined")return;try{localStorage.setItem(cacheKey,JSON.stringify({ts:Date.now(),data}));}catch(_){// ignore storage limits
}},async fetchAdvancedSearchJSON(url,cacheKey,ttlMs,signal){const cached=this.readAdvancedSearchCache(cacheKey,ttlMs);if(cached)return cached;const response=await fetch(url,{signal});if(!response.ok){const error=new Error(`HTTP_${response.status}`);error.status=response.status;throw error;}const json=await response.json();this.writeAdvancedSearchCache(cacheKey,json);return json;},getHttpStatusFromError(error){var _error$response;const explicitStatus=Number((error===null||error===void 0||(_error$response=error.response)===null||_error$response===void 0?void 0:_error$response.status)||(error===null||error===void 0?void 0:error.status)||0);if(explicitStatus>0)return explicitStatus;const message=String((error===null||error===void 0?void 0:error.message)||error||"");const statusMatch=message.match(/\b(\d{3})\b/);return statusMatch?Number(statusMatch[1]):0;},parseAdvancedSearchMatches(payload,fallbackEdition=""){var _payload$data,_payload$data2;const rawMatches=Array.isArray(payload===null||payload===void 0||(_payload$data=payload.data)===null||_payload$data===void 0?void 0:_payload$data.matches)?payload.data.matches:[];const editionFromPayload=(payload===null||payload===void 0||(_payload$data2=payload.data)===null||_payload$data2===void 0||(_payload$data2=_payload$data2.edition)===null||_payload$data2===void 0?void 0:_payload$data2.identifier)||fallbackEdition||"";return rawMatches.map(raw=>{var _raw$surah,_raw$edition,_raw$surah2,_raw$surah3,_raw$surah4;const surahNumber=Number((raw===null||raw===void 0||(_raw$surah=raw.surah)===null||_raw$surah===void 0?void 0:_raw$surah.number)||(raw===null||raw===void 0?void 0:raw.surahNumber)||0);const ayahNumber=Number((raw===null||raw===void 0?void 0:raw.numberInSurah)||(raw===null||raw===void 0?void 0:raw.ayahNumber)||0);if(!surahNumber||!ayahNumber)return null;const editionIdentifier=(raw===null||raw===void 0||(_raw$edition=raw.edition)===null||_raw$edition===void 0?void 0:_raw$edition.identifier)||editionFromPayload;const snippet=String((raw===null||raw===void 0?void 0:raw.text)||"");const isArabicEdition=editionIdentifier==="quran-uthmani"||editionIdentifier.startsWith("ar.");const isTransliterationEdition=editionIdentifier===this.transliterationEditionIdentifier||/translit/i.test(editionIdentifier);return{key:this.buildAyahKey(surahNumber,ayahNumber),surahNumber,ayahNumber,surahEnglishName:(raw===null||raw===void 0||(_raw$surah2=raw.surah)===null||_raw$surah2===void 0?void 0:_raw$surah2.englishName)||`Surah ${surahNumber}`,surahArabicName:(raw===null||raw===void 0||(_raw$surah3=raw.surah)===null||_raw$surah3===void 0?void 0:_raw$surah3.name)||"",surahTranslationName:(raw===null||raw===void 0||(_raw$surah4=raw.surah)===null||_raw$surah4===void 0?void 0:_raw$surah4.englishNameTranslation)||"",arabicSnippet:isArabicEdition?snippet:"",translationSnippet:!isArabicEdition&&!isTransliterationEdition?snippet:"",transliterationSnippet:isTransliterationEdition?snippet:"",page:Number((raw===null||raw===void 0?void 0:raw.page)||(raw===null||raw===void 0?void 0:raw.pageNumber)||0)||null,juz:Number((raw===null||raw===void 0?void 0:raw.juz)||(raw===null||raw===void 0?void 0:raw.juzNumber)||0)||null};}).filter(Boolean);},mergeAdvancedSearchMatches(...collections){const merged=new Map();collections.forEach(collection=>{if(!Array.isArray(collection))return;collection.forEach(match=>{if(!(match!==null&&match!==void 0&&match.key))return;if(!merged.has(match.key)){merged.set(match.key,_objectSpread({},match));return;}const existing=merged.get(match.key);merged.set(match.key,_objectSpread(_objectSpread({},existing),{},{surahEnglishName:existing.surahEnglishName||match.surahEnglishName,surahArabicName:existing.surahArabicName||match.surahArabicName,surahTranslationName:existing.surahTranslationName||match.surahTranslationName,arabicSnippet:existing.arabicSnippet||match.arabicSnippet,translationSnippet:existing.translationSnippet||match.translationSnippet,transliterationSnippet:existing.transliterationSnippet||match.transliterationSnippet,page:existing.page||match.page||null,juz:existing.juz||match.juz||null}));});});return Array.from(merged.values()).sort((a,b)=>{if(a.surahNumber!==b.surahNumber)return a.surahNumber-b.surahNumber;return a.ayahNumber-b.ayahNumber;});},selectAdvancedSearchMatchesAcrossSurahs(matches,limit){if(!Array.isArray(matches)||!matches.length)return[];const safeLimit=Math.max(1,Number(limit)||Number(matches.length)||1);if(matches.length<=safeLimit){return matches.slice();}const grouped=new Map();matches.forEach(match=>{const surahNumber=Number((match===null||match===void 0?void 0:match.surahNumber)||0)||0;if(!grouped.has(surahNumber)){grouped.set(surahNumber,[]);}grouped.get(surahNumber).push(match);});const buckets=Array.from(grouped.values());const selected=[];let round=0;while(selected.length<safeLimit){let addedInRound=false;for(let idx=0;idx<buckets.length;idx++){const bucket=buckets[idx];if(round<bucket.length){selected.push(bucket[round]);addedInRound=true;if(selected.length>=safeLimit)break;}}if(!addedInRound)break;round+=1;}return selected;},buildAdvancedSearchResult(match,surahPayload,translationId){var _surahPayload$data,_arabicEdition$ayahs,_translationEdition$a,_transliterationEditi;const editions=Array.isArray(surahPayload===null||surahPayload===void 0||(_surahPayload$data=surahPayload.data)===null||_surahPayload$data===void 0?void 0:_surahPayload$data.data)?surahPayload.data.data:[];const arabicEdition=editions.find(item=>{var _item$edition;return(item===null||item===void 0||(_item$edition=item.edition)===null||_item$edition===void 0?void 0:_item$edition.identifier)==="quran-uthmani";})||editions[0];const translationEdition=editions.find(item=>{var _item$edition2;return(item===null||item===void 0||(_item$edition2=item.edition)===null||_item$edition2===void 0?void 0:_item$edition2.identifier)===translationId;})||editions[1];const transliterationEdition=editions.find(item=>{var _item$edition3,_item$edition4;return(item===null||item===void 0||(_item$edition3=item.edition)===null||_item$edition3===void 0?void 0:_item$edition3.identifier)===this.transliterationEditionIdentifier||(item===null||item===void 0||(_item$edition4=item.edition)===null||_item$edition4===void 0?void 0:_item$edition4.type)==="transliteration";})||null;const index=Math.max(0,Number(match.ayahNumber)-1);const arabicAyah=arabicEdition===null||arabicEdition===void 0||(_arabicEdition$ayahs=arabicEdition.ayahs)===null||_arabicEdition$ayahs===void 0?void 0:_arabicEdition$ayahs[index];const translationAyah=translationEdition===null||translationEdition===void 0||(_translationEdition$a=translationEdition.ayahs)===null||_translationEdition$a===void 0?void 0:_translationEdition$a[index];const transliterationAyah=transliterationEdition===null||transliterationEdition===void 0||(_transliterationEditi=transliterationEdition.ayahs)===null||_transliterationEditi===void 0?void 0:_transliterationEditi[index];const arabicText=(arabicAyah===null||arabicAyah===void 0?void 0:arabicAyah.text)||match.arabicSnippet||"";const translationText=(translationAyah===null||translationAyah===void 0?void 0:translationAyah.text)||match.translationSnippet||"Translation not available";const transliterationText=(transliterationAyah===null||transliterationAyah===void 0?void 0:transliterationAyah.text)||match.transliterationSnippet||this.transliterationFallbackText;const surahEnglishName=(arabicEdition===null||arabicEdition===void 0?void 0:arabicEdition.englishName)||match.surahEnglishName||`Surah ${match.surahNumber}`;const surahArabicName=(arabicEdition===null||arabicEdition===void 0?void 0:arabicEdition.name)||match.surahArabicName||"";const surahTranslationName=(arabicEdition===null||arabicEdition===void 0?void 0:arabicEdition.englishNameTranslation)||match.surahTranslationName||"";return{key:this.buildAyahKey(match.surahNumber,match.ayahNumber),surahNumber:match.surahNumber,ayahNumber:match.ayahNumber,surahEnglishName,surahArabicName,surahTranslationName,text:arabicText,translation:translationText,transliteration:transliterationText,page:Number((arabicAyah===null||arabicAyah===void 0?void 0:arabicAyah.page)||(match===null||match===void 0?void 0:match.page)||0)||null,juz:Number((arabicAyah===null||arabicAyah===void 0?void 0:arabicAyah.juz)||(match===null||match===void 0?void 0:match.juz)||0)||null};},async hydrateAdvancedSearchMatches(matches,translationId,transliterationId,signal){const bySurah=new Map();matches.forEach(match=>{if(!bySurah.has(match.surahNumber)){bySurah.set(match.surahNumber,true);}});const surahNumbers=Array.from(bySurah.keys()).slice(0,Math.max(1,Number(this.advancedSearchHydrationSurahLimit)||1));const payloadBySurah=new Map();for(const surahNumber of surahNumbers){if(signal!==null&&signal!==void 0&&signal.aborted)break;const endpoint=`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/`+`quran-uthmani,${translationId},${transliterationId}`;const cacheKey=`cache:advanced-search:surah:${surahNumber}:`+`${translationId}:${transliterationId}`;try{const payload=await this.fetchAdvancedSearchJSON(endpoint,cacheKey,12*60*60*1000,signal);payloadBySurah.set(surahNumber,payload);}catch(error){const status=this.getHttpStatusFromError(error);if(status===429){break;}}}return matches.map(match=>{const payload=payloadBySurah.get(match.surahNumber);return this.buildAdvancedSearchResult(match,payload,translationId);});},async runAdvancedSearch(options={}){const{force=false}=options;const query=(this.advancedSearchQuery||"").trim();if(query.length<this.advancedSearchMinLength){this.clearAdvancedSearch(false);return;}if(!this.isAdvancedSearchPanelVisible){this.isAdvancedSearchPanelVisible=true;}const normalizedQuery=query.toLowerCase();const translationId=this.selectedTranslation||"en.ahmedali";if(!force&&this.advancedSearchLoading){this.abortAdvancedSearchRequest();}this.abortAdvancedSearchRequest();const controller=new AbortController();const{signal}=controller;this.advancedSearchAbortController=controller;this.advancedSearchLoading=true;this.advancedSearchError="";this.advancedSearchResults=[];this.advancedSearchTotalMatches=0;this.advancedSearchExpandedSurahs={};try{// Use local database search instead of external API
const response=await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/search-translations',{params:{query},signal});if(signal.aborted)return;const results=response.data.results||[];this.advancedSearchTotalMatches=results.length;if(!results.length){this.advancedSearchResults=[];return;}// Transform local API results to match the expected format
const transformedResults=results.map(item=>{const ayah=item.ayah||{};const surah=ayah.surah||{};return{key:`${ayah.surah_id}-${ayah.ayah_id}`,surahNumber:Number(ayah.surah_id)||0,ayahNumber:Number(ayah.ayah_id)||0,text:ayah.ayah_text||'',translation:item.translation||'',transliteration:item.transliteration||'',surahEnglishName:surah.name_en||`Surah ${ayah.surah_id}`,surahArabicName:surah.name_ar||'',surahTranslationName:surah.name_en||'',arabicSnippet:ayah.ayah_text||'',translationSnippet:item.translation||'',transliterationSnippet:item.transliteration||'',page:null,// Not available in current database
juz:null// Not available in current database
};});// Apply the max results limit if needed
const limitedResults=transformedResults.slice(0,this.advancedSearchMaxResults);if(signal.aborted)return;this.advancedSearchResults=limitedResults;// Auto-expand all Surahs to show all search results by default
const expandedSurahs={};limitedResults.forEach(result=>{const surahNumber=String((result===null||result===void 0?void 0:result.surahNumber)||'');if(surahNumber){expandedSurahs[surahNumber]=true;}});this.advancedSearchExpandedSurahs=expandedSurahs;}catch(error){if((error===null||error===void 0?void 0:error.name)==="AbortError")return;console.error("Advanced search failed:",error);this.advancedSearchResults=[];this.advancedSearchTotalMatches=0;const status=this.getHttpStatusFromError(error);const message=String((error===null||error===void 0?void 0:error.message)||"").toUpperCase();if(status===429||message.includes("RATE_LIMIT")){this.advancedSearchError="Quran search is temporarily rate-limited. Please wait a moment and try again.";return;}if(message.includes("FAILED TO FETCH")){this.advancedSearchError="Unable to reach Quran search right now. Please retry in a moment.";return;}this.advancedSearchError="Unable to search verses right now. Please try again.";}finally{if(this.advancedSearchAbortController===controller){this.advancedSearchAbortController=null;this.advancedSearchLoading=false;}}},isAdvancedSearchSurahExpanded(surahNumber){return!!this.advancedSearchExpandedSurahs[String(surahNumber)];},toggleAdvancedSearchSurahExpansion(surahNumber){const key=String(surahNumber||"");if(!key)return;const nextState=!this.isAdvancedSearchSurahExpanded(surahNumber);this.advancedSearchExpandedSurahs=_objectSpread(_objectSpread({},this.advancedSearchExpandedSurahs),{},{[key]:nextState});},getVisibleAdvancedSearchMatchesForSurah(group){const results=Array.isArray(group===null||group===void 0?void 0:group.results)?group.results:[];if(!results.length)return[];if(this.isAdvancedSearchSurahExpanded(group===null||group===void 0?void 0:group.surahNumber)){return results;}const previewLimit=Math.max(1,Number(this.advancedSearchSurahPreviewLimit)||1);return results.slice(0,previewLimit);},alignAyahCardAfterSearch(index,behavior="auto"){if(typeof index!=="number"||index<0||typeof window==="undefined"){return;}this.$nextTick(()=>{const align=()=>{const cardEl=document.getElementById(`ayah-card-${index}`);if(!cardEl||!cardEl.getBoundingClientRect)return;const rect=cardEl.getBoundingClientRect();const offset=this.currentHeaderOffset;const viewportHeight=window.innerHeight;const audioHeight=this.getAudioPlayerHeight();const availableHeight=Math.max(viewportHeight-offset-audioHeight,0);const centerFactor=typeof this.preferredPlaybackScrollFactor==="number"?this.preferredPlaybackScrollFactor:0.38;const desiredCenter=offset+availableHeight*centerFactor;const delta=rect.top+rect.height/2-desiredCenter;if(Math.abs(delta)<=8)return;const maxScroll=Math.max(document.documentElement.scrollHeight-window.innerHeight,0);const target=Math.min(Math.max(0,window.scrollY+delta),maxScroll);window.scrollTo({top:target,behavior});};if(window.requestAnimationFrame){window.requestAnimationFrame(align);}else{align();}});},async openAdvancedSearchResult(result){if(!result)return;const surahNumber=Number(result.surahNumber);const ayahNumber=Number(result.ayahNumber);if(!surahNumber||!ayahNumber)return;this.isNavigating=true;this.lastManualNavigationAt=Date.now();try{if(String(this.selectedSurah)!==String(surahNumber)){await this.selectSurah(surahNumber,{skipScroll:true});}const targetIndex=Math.max(0,ayahNumber-1);this.searchQuery="";this.debouncedQuery="";const total=Array.isArray(this.filteredAyahs)?this.filteredAyahs.length:0;const safeIndex=Math.min(targetIndex,Math.max(total-1,0));const buffer=this.effectiveVirtualBuffer;const size=this.effectiveVirtualWindowSize;const start=Math.max(0,safeIndex-buffer);this.visibleStart=start;this.visibleEnd=Math.min(total,start+size+buffer*2);await this.$nextTick();this.scrollToAyahIndex(safeIndex,{settle:true,settleDelay:260,force:true,behavior:"auto",lock:true});this.alignAyahCardAfterSearch(safeIndex,"smooth");setTimeout(()=>{this.alignAyahCardAfterSearch(safeIndex,"auto");},520);this.announce(`Opened Surah ${surahNumber}, Ayah ${ayahNumber}.`);}catch(error){console.error("Unable to open advanced search result:",error);this.announce("Unable to open this ayah right now.");}},prepareSettingsDraft(){if(!this.settingsDraft)return;this.settingsDraft.showTajweed=!!this.showTajweed;this.settingsDraft.showRealtimeHighlighting=!!this.showRealtimeHighlighting;this.settingsDraft.showWordTranslation=!!this.showWordTranslation;this.settingsDraft.showWordTranslationTooltip=!!this.showWordTranslationTooltip;this.settingsDraft.gestureNavigationEnabled=!!this.gestureNavigationEnabled;this.settingsDraft.playbackMode=this.playbackMode;},applyMemorisationRange(){const totalAyahs=Math.max(Number(this.totalAyahs||1),1);const startRaw=Number(this.memorisationRangeStart||1);const endRaw=Number(this.memorisationRangeEnd||totalAyahs);const start=Math.min(Math.max(1,startRaw||1),totalAyahs);const end=Math.min(Math.max(start,endRaw||start),totalAyahs);this.memorisationRangeStart=start;this.memorisationRangeEnd=end;// Scroll to the first ayah of the range
this.$nextTick(()=>{const startIdx=this.filteredAyahs.findIndex(a=>a.numberInSurah===this.memorisationRangeStart);if(startIdx!==-1){this.scrollToAyahIndex(startIdx);}});this.announce(`Range applied: Verses ${this.memorisationRangeStart} to ${this.memorisationRangeEnd}`);},initializeHifdhScheduler(){this.loadHifdhSchedulerState();this.loadHifdhPlanUiState();if(!this.hifdhNewRangeStart){this.hifdhNewRangeStart=this.memorisationRangeStart||1;}if(!this.hifdhNewRangeEnd){this.hifdhNewRangeEnd=this.memorisationRangeEnd||this.memorisationRangeStart||1;}},loadHifdhSchedulerState(){try{const raw=localStorage.getItem(this.hifdhSchedulerStorageKey);if(!raw)return;const parsed=JSON.parse(raw);this.hifdhPlanSets=Array.isArray(parsed===null||parsed===void 0?void 0:parsed.sets)?parsed.sets:[];this.hifdhReviewQueue=Array.isArray(parsed===null||parsed===void 0?void 0:parsed.entries)?parsed.entries:[];}catch(_){this.hifdhPlanSets=[];this.hifdhReviewQueue=[];}},persistHifdhSchedulerState(){try{localStorage.setItem(this.hifdhSchedulerStorageKey,JSON.stringify({sets:this.hifdhPlanSets,entries:this.hifdhReviewQueue}));}catch(_){}},loadHifdhPlanUiState(){try{const raw=localStorage.getItem(this.hifdhPlanUiStorageKeyBase);if(!raw)return;const parsed=JSON.parse(raw);this.isHifdhPlanCollapsed=!!(parsed!==null&&parsed!==void 0&&parsed.collapsed);this.isHifdhPlanHidden=!!(parsed!==null&&parsed!==void 0&&parsed.hidden);this.isHifdhDemoModeActive=!!(parsed!==null&&parsed!==void 0&&parsed.demoMode);}catch(_){this.isHifdhPlanCollapsed=false;this.isHifdhPlanHidden=false;this.isHifdhDemoModeActive=false;}},persistHifdhPlanUiState(){try{localStorage.setItem(this.hifdhPlanUiStorageKeyBase,JSON.stringify({collapsed:!!this.isHifdhPlanCollapsed,hidden:!!this.isHifdhPlanHidden,demoMode:!!this.isHifdhDemoModeActive}));}catch(_){}},toggleHifdhPlanCollapsed(){this.isHifdhPlanCollapsed=!this.isHifdhPlanCollapsed;this.persistHifdhPlanUiState();},hideHifdhPlan(){if(!this.isHifdhPlanCompactControlsEnabled){this.isHifdhPlanHidden=false;return;}this.isHifdhPlanHidden=true;this.persistHifdhPlanUiState();},showHifdhPlan(){this.isHifdhPlanHidden=false;this.persistHifdhPlanUiState();},toDateKey(input){const date=input instanceof Date?input:new Date(input);if(Number.isNaN(date.getTime()))return"";const year=date.getFullYear();const month=String(date.getMonth()+1).padStart(2,"0");const day=String(date.getDate()).padStart(2,"0");return`${year}-${month}-${day}`;},addDaysToDateKey(dateKey,daysToAdd){if(!dateKey)return"";const base=new Date(`${dateKey}T12:00:00`);if(Number.isNaN(base.getTime()))return"";base.setDate(base.getDate()+Number(daysToAdd||0));return this.toDateKey(base);},formatDateKey(dateKey){if(!dateKey)return"";const date=new Date(`${dateKey}T12:00:00`);if(Number.isNaN(date.getTime()))return dateKey;return date.toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"});},getSurahNameByNumber(surahNumber){var _this$surahDetails25;const match=Array.isArray(this.surahs)?this.surahs.find(surah=>Number(surah.number)===Number(surahNumber)):null;return(match===null||match===void 0?void 0:match.englishName)||((_this$surahDetails25=this.surahDetails)===null||_this$surahDetails25===void 0?void 0:_this$surahDetails25.englishName)||`Surah ${surahNumber}`;},getSurahArabicNameByNumber(surahNumber){var _this$surahDetails26;const match=Array.isArray(this.surahs)?this.surahs.find(surah=>Number(surah.number)===Number(surahNumber)):null;return(match===null||match===void 0?void 0:match.name)||((_this$surahDetails26=this.surahDetails)===null||_this$surahDetails26===void 0?void 0:_this$surahDetails26.name)||"";},createHifdhQueueEntry({setId,kind="review",checkpointDay=0,scheduledDate,surahNumber,startAyah,endAyah,recurring=false}){return{id:`hifdh_${Date.now()}_${Math.random().toString(36).slice(2,9)}`,setId,kind,checkpointDay,scheduledDate,surahNumber:Number(surahNumber||this.selectedSurah||1),surahName:this.getSurahNameByNumber(surahNumber||this.selectedSurah),startAyah:Number(startAyah||1),endAyah:Number(endAyah||startAyah||1),recurring:!!recurring,status:"pending",completedOn:null,feedback:""};},addCurrentRangeToHifdhPlan(){const startRaw=Number(this.hifdhNewRangeStart||this.memorisationRangeStart||1);const endRaw=Number(this.hifdhNewRangeEnd||this.memorisationRangeEnd||this.hifdhNewRangeStart||this.memorisationRangeStart||1);const total=Number(this.totalAyahs||endRaw||startRaw||1);const startAyah=Math.min(Math.max(1,startRaw),Math.max(total,1));const endAyah=Math.min(Math.max(startAyah,endRaw||startAyah),Math.max(total,startAyah));const surahNumber=Number(this.selectedSurah||1);const memorisedOn=this.toDateKey(new Date());const hasMatchingSetToday=(this.hifdhPlanSets||[]).some(set=>Number(set===null||set===void 0?void 0:set.surahNumber)===surahNumber&&Number(set===null||set===void 0?void 0:set.startAyah)===startAyah&&Number(set===null||set===void 0?void 0:set.endAyah)===endAyah&&String((set===null||set===void 0?void 0:set.memorisedOn)||"")===memorisedOn);if(hasMatchingSetToday){this.announce(`This range is already queued today: Surah ${surahNumber}, Ayah ${startAyah}-${endAyah}.`);return;}const setId=`hset_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;this.hifdhPlanSets.push({id:setId,memorisedOn,surahNumber,surahName:this.getSurahNameByNumber(surahNumber),startAyah,endAyah,status:"active"});const entries=[this.createHifdhQueueEntry({setId,kind:"new",checkpointDay:0,scheduledDate:memorisedOn,surahNumber,startAyah,endAyah}),...this.hifdhCheckpointDays.map(day=>this.createHifdhQueueEntry({setId,kind:"review",checkpointDay:day,scheduledDate:this.addDaysToDateKey(memorisedOn,day),surahNumber,startAyah,endAyah}))];this.hifdhReviewQueue.push(...entries);this.persistHifdhSchedulerState();this.announce(`Daily review plan created for Surah ${surahNumber}, Ayah ${startAyah}-${endAyah}.`);},async addRangeAndStartHifdhSession(){this.addCurrentRangeToHifdhPlan();await this.$nextTick();if(this.hasTodayHifdhPlan){await this.startTodayHifdhSessionAndCloseModal();this.triggerHifdhConfetti({burst:"soft"});}},markAllPendingHifdhDueToday(){const todayKey=this.toDateKey(new Date());let updatedCount=0;(this.hifdhReviewQueue||[]).forEach(item=>{if(!item||item.status==="completed")return;if(String(item.scheduledDate||"")>todayKey){item.scheduledDate=todayKey;updatedCount++;}});this.persistHifdhSchedulerState();this.isHifdhDemoModeActive=true;this.persistHifdhPlanUiState();if(updatedCount>0){this.announce(`${updatedCount} review segments moved to today for demo.`);}else{this.announce("All pending review segments are already due today.");}},resetPendingHifdhToDemoTimeline(){const todayKey=this.toDateKey(new Date());let updatedCount=0;(this.hifdhReviewQueue||[]).forEach(item=>{if(!item||item.status==="completed")return;const checkpoint=Number(item.checkpointDay||0);const offset=Math.max(0,checkpoint);item.scheduledDate=this.addDaysToDateKey(todayKey,offset);updatedCount++;});this.persistHifdhSchedulerState();this.isHifdhDemoModeActive=false;this.persistHifdhPlanUiState();if(updatedCount>0){this.announce("Demo timeline reset. Reviews now follow spaced days from today.");}else{this.announce("No pending segments to reset.");}},confirmResetHifdhPlan(){this.hifdhPlanSets=[];this.hifdhReviewQueue=[];this.hifdhSessionStarted=false;this.hifdhActiveItemId=null;this.isHifdhDemoModeActive=false;this.isHifdhResetConfirmVisible=false;this.persistHifdhSchedulerState();this.persistHifdhPlanUiState();this.announce("Hifdh plan reset.");},initializeHifdhTooltips(){this.disposeHifdhTooltips();if(typeof document==="undefined")return;const modalEl=document.getElementById("hifdhPlanModal");if(!modalEl)return;const nodes=modalEl.querySelectorAll("[data-hifdh-tooltip]");this.hifdhTooltipInstances=Array.from(nodes).map(node=>{try{return new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Tooltip(node,{trigger:"hover focus",container:"body"});}catch(_){return null;}}).filter(Boolean);},disposeHifdhTooltips(){if(!Array.isArray(this.hifdhTooltipInstances)){this.hifdhTooltipInstances=[];return;}this.hifdhTooltipInstances.forEach(instance=>{try{instance.dispose();}catch(_){}});this.hifdhTooltipInstances=[];},triggerHifdhConfetti({burst="soft"}={}){if(typeof document==="undefined")return;if(typeof window!=="undefined"&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches){return;}const host=document.querySelector("#hifdhPlanModal.show .modal-content")||document.querySelector("#hifdhPlanModal .modal-content");if(!host)return;const layer=document.createElement("div");layer.className="hifdh-confetti-layer";layer.setAttribute("aria-hidden","true");const palette=["#10b981","#14b8a6","#22c55e","#f59e0b","#60a5fa"];const isFullBurst=burst==="full";const particleCount=isFullBurst?48:26;const spread=isFullBurst?380:240;for(let i=0;i<particleCount;i+=1){const piece=document.createElement("span");piece.className="hifdh-confetti-piece";piece.style.setProperty("--hifdh-confetti-x",`${Math.round((Math.random()-0.5)*spread)}px`);piece.style.setProperty("--hifdh-confetti-delay",`${(Math.random()*0.22).toFixed(2)}s`);piece.style.setProperty("--hifdh-confetti-duration",`${(0.9+Math.random()*1.05).toFixed(2)}s`);piece.style.setProperty("--hifdh-confetti-rotation",`${Math.round(Math.random()*420)}deg`);piece.style.setProperty("--hifdh-confetti-color",palette[Math.floor(Math.random()*palette.length)]);layer.appendChild(piece);}host.appendChild(layer);const timeoutId=setTimeout(()=>{if(layer&&layer.parentNode){layer.parentNode.removeChild(layer);}},2300);this.hifdhConfettiTimeouts.push(timeoutId);},clearHifdhConfettiLayers(){if(typeof document!=="undefined"){document.querySelectorAll(".hifdh-confetti-layer").forEach(node=>{if(node&&node.parentNode){node.parentNode.removeChild(node);}});}if(Array.isArray(this.hifdhConfettiTimeouts)){this.hifdhConfettiTimeouts.forEach(timeoutId=>{clearTimeout(timeoutId);});}this.hifdhConfettiTimeouts=[];},async quickStartSurahTwoDemoRange(){const surahNumber=2;const rangeStart=1;const rangeEnd=10;const todayKey=this.toDateKey(new Date());try{await this.selectSurah(surahNumber,{skipScroll:true});const existingSet=(this.hifdhPlanSets||[]).some(set=>Number(set===null||set===void 0?void 0:set.surahNumber)===surahNumber&&Number(set===null||set===void 0?void 0:set.startAyah)===rangeStart&&Number(set===null||set===void 0?void 0:set.endAyah)===rangeEnd&&String((set===null||set===void 0?void 0:set.memorisedOn)||"")===todayKey);if(existingSet){this.announce("Surah 2 demo range (Ayah 1-10) is already queued for today.");return;}this.hifdhNewRangeStart=rangeStart;this.hifdhNewRangeEnd=Math.min(rangeEnd,Number(this.totalAyahs||rangeEnd));this.addCurrentRangeToHifdhPlan();this.announce("Demo ready: jumped to Surah 2 and queued Ayah 1-10.");}catch(_){this.announce("Unable to prepare Surah 2 demo right now.");}},async quickStartAlFatihaToday(){const surahNumber=1;const rangeStart=1;const rangeEnd=7;const todayKey=this.toDateKey(new Date());try{await this.selectSurah(surahNumber,{skipScroll:true});const existingSet=(this.hifdhPlanSets||[]).some(set=>Number(set===null||set===void 0?void 0:set.surahNumber)===surahNumber&&Number(set===null||set===void 0?void 0:set.startAyah)===rangeStart&&Number(set===null||set===void 0?void 0:set.endAyah)===rangeEnd&&String((set===null||set===void 0?void 0:set.memorisedOn)||"")===todayKey);if(existingSet){this.announce("Al-Fatiha is already queued for today. Opening your due segment.");await this.$nextTick();if(this.hasTodayHifdhPlan){await this.startTodayHifdhSessionAndCloseModal();}return;}this.hifdhNewRangeStart=rangeStart;this.hifdhNewRangeEnd=Math.min(rangeEnd,Number(this.totalAyahs||rangeEnd));await this.addRangeAndStartHifdhSession();this.announce("Quick start ready: Al-Fatiha queued and session started.");}catch(_){this.announce("Unable to start Al-Fatiha quick start right now.");}},classifyHifdhEntry(item){if(!item)return"longterm";if(item.kind==="new")return"new";const checkpoint=Number(item.checkpointDay||0);if(checkpoint<=1)return"recent";if(checkpoint<=7)return"strengthening";return"longterm";},hifdhCategoryTitle(key){if(key==="new")return"New Memorisation";if(key==="recent")return"Recent Reinforcement";if(key==="strengthening")return"Strengthening Memory";return"Long-Term Protection";},hifdhCheckpointLabel(item){if(!item)return"";if(item.kind==="new")return"Today";if(item.kind==="adaptive")return"Adaptive Catch-up";const checkpoint=Number(item.checkpointDay||0);if(checkpoint>=30&&item.recurring)return"Monthly review";return`Day ${checkpoint}`;},hifdhEntrySummary(item){if(!item)return"";return`${item.surahName||this.getSurahNameByNumber(item.surahNumber)} · ${item.startAyah}-${item.endAyah}`;},getPreferredHifdhStartItem(){const dueItems=this.todayHifdhPlanItemsOrdered||[];if(!dueItems.length)return null;const active=this.hifdhActiveItemId?dueItems.find(item=>item.id===this.hifdhActiveItemId):null;if(active)return active;const currentSurahMatch=dueItems.find(item=>String((item===null||item===void 0?void 0:item.surahNumber)||"")===String(this.selectedSurah||""));if(currentSurahMatch)return currentSurahMatch;return dueItems[0];},async startTodayHifdhSession(){if(!this.hasTodayHifdhPlan){this.announce("No review segments are due today.");return;}this.isHifdhPlanHidden=false;this.hifdhSessionStarted=true;const startItem=this.getPreferredHifdhStartItem();this.hifdhActiveItemId=(startItem===null||startItem===void 0?void 0:startItem.id)||null;if(startItem){await this.openHifdhPlanItem(startItem);}this.persistHifdhPlanUiState();},async startTodayHifdhSessionAndCloseModal(){if(!this.hasTodayHifdhPlan){await this.startTodayHifdhSession();return;}await this.startTodayHifdhSession();this.$nextTick(()=>{const modalEl=document.getElementById("hifdhPlanModal");if(!modalEl)return;const instance=bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl)||new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(modalEl);instance.hide();});},async openHifdhPlanItem(item){if(!item)return;try{if(String(this.selectedSurah)!==String(item.surahNumber)){await this.selectSurah(item.surahNumber,{skipScroll:true});}this.isMemorisationToolbarVisible=true;this.hifdhActiveItemId=item.id;this.memorisationRangeStart=Number(item.startAyah||1);this.memorisationRangeEnd=Number(item.endAyah||item.startAyah||1);this.applyMemorisationRange();}catch(_){}},async openHifdhPlanItemAndCloseModal(item){if(!item)return;await this.openHifdhPlanItem(item);this.$nextTick(()=>{const modalEl=document.getElementById("hifdhPlanModal");if(!modalEl)return;const instance=bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl)||new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(modalEl);instance.hide();});},applyHifdhFeedbackAdjustments(entry,feedback){if(!entry)return;const todayKey=this.toDateKey(new Date());const pendingSameSet=(this.hifdhReviewQueue||[]).filter(item=>item&&item.status!=="completed"&&item.setId===entry.setId&&item.id!==entry.id).sort((a,b)=>String((a===null||a===void 0?void 0:a.scheduledDate)||"").localeCompare(String((b===null||b===void 0?void 0:b.scheduledDate)||"")));const nextPending=pendingSameSet[0]||null;if(feedback==="strong"&&nextPending){nextPending.scheduledDate=this.addDaysToDateKey(nextPending.scheduledDate,1);}else if(feedback==="minor"&&nextPending){const tomorrow=this.addDaysToDateKey(todayKey,1);if(String(nextPending.scheduledDate)>tomorrow){nextPending.scheduledDate=tomorrow;}}else if(feedback==="weak"){const tomorrow=this.addDaysToDateKey(todayKey,1);const alreadyHasCatchup=pendingSameSet.some(item=>item.kind==="adaptive"&&String(item.scheduledDate)<=tomorrow);if(!alreadyHasCatchup){this.hifdhReviewQueue.push(this.createHifdhQueueEntry({setId:entry.setId,kind:"adaptive",checkpointDay:2,scheduledDate:tomorrow,surahNumber:entry.surahNumber,startAyah:entry.startAyah,endAyah:entry.endAyah}));}if(nextPending){const soonDate=this.addDaysToDateKey(todayKey,2);if(String(nextPending.scheduledDate)>soonDate){nextPending.scheduledDate=soonDate;}}}},ensureMonthlyReviewContinuation(entry){if(!entry)return;if(Number(entry.checkpointDay||0)<30)return;const hasFutureMonthly=(this.hifdhReviewQueue||[]).some(item=>item&&item.status!=="completed"&&item.setId===entry.setId&&Number(item.checkpointDay||0)>Number(entry.checkpointDay||0));if(hasFutureMonthly)return;const nextCheckpoint=Number(entry.checkpointDay||30)+30;const nextDate=this.addDaysToDateKey(this.toDateKey(new Date()),30);this.hifdhReviewQueue.push(this.createHifdhQueueEntry({setId:entry.setId,kind:"review",checkpointDay:nextCheckpoint,scheduledDate:nextDate,surahNumber:entry.surahNumber,startAyah:entry.startAyah,endAyah:entry.endAyah,recurring:true}));},completeActiveHifdhItem(feedback){const item=this.activeHifdhSessionItem;if(!item)return;const queueItem=this.hifdhReviewQueue.find(entry=>entry.id===item.id);if(!queueItem)return;queueItem.status="completed";queueItem.feedback=feedback||"";queueItem.completedOn=this.toDateKey(new Date());this.applyHifdhFeedbackAdjustments(queueItem,feedback);this.ensureMonthlyReviewContinuation(queueItem);this.persistHifdhSchedulerState();const next=this.todayHifdhPlanItemsOrdered.find(entry=>entry.id!==item.id);this.hifdhActiveItemId=(next===null||next===void 0?void 0:next.id)||null;if(next){this.openHifdhPlanItem(next);if(String(feedback||"").toLowerCase()==="strong"){this.triggerHifdhConfetti({burst:"soft"});}}else{this.triggerHifdhConfetti({burst:"full"});this.announce("Today’s Hifdh session is complete.");}this.persistHifdhPlanUiState();},resetMemorisationRange(){this.memorisationRangeStart=1;this.memorisationRangeEnd=null;this.clearMemorisationAutomationState();this.applyMemorisationRange();this.announce("Memorisation range reset.");},toggleMemorisationMode(){this.isMemorisationMode=!this.isMemorisationMode;if(this.isMemorisationMode){this.memorisationFocusIndex=this.activeAyahIndex;this.selectCard(this.memorisationFocusIndexSafe);this.scrollToAyahIndex(this.memorisationFocusIndexSafe);this.announce(`Verse mode enabled. Focused on verse ${this.memorisationFocusIndexSafe+1}.`);}else{this.announce("Verse mode disabled.");}this.showModeToggleToast("Verse focus",this.isMemorisationMode);this.persistMemorisationModeSetting();},toggleWordAudioMode(){this.showWordTranslationTooltip=!this.showWordTranslationTooltip;this.showModeToggleToast("Word audio",this.showWordTranslationTooltip);},async toggleCurrentMemorisationBookmark(){const ayah=this.memorisationCurrentAyah;if(!ayah){this.showToast("No ayah selected to bookmark.",2500);return;}await this.toggleBookmark(ayah);},setPlaybackSpeed(speed){const numeric=Number(speed);if(!Number.isFinite(numeric))return;const allowed=Array.isArray(this.playbackSpeeds)&&this.playbackSpeeds.length?this.playbackSpeeds:[1];const resolved=allowed.includes(numeric)?numeric:1;this.playbackSpeed=resolved;this.currentSpeedIndex=Math.max(0,allowed.indexOf(resolved));this.showToast(`Playback speed: ${resolved}x`,2200);},toggleAudioPlayerVisibility(){this.isAudioPlayerVisible=!this.isAudioPlayerVisible;if(!this.isAudioPlayerVisible){this.showAudioPlayer=false;this.showAudioPlayerQueuePanel=false;}else if(this.bottomAudioPlayerEnabled&&this.currentlyPlaying&&!this.isSingleWordPreviewActive){this.showAudioPlayer=true;}this.showModeToggleToast("Audio player",this.isAudioPlayerVisible);},persistMemorisationModeSetting(){const key=this.getMemorisationModeStorageKey();if(key)this.persistLocalSetting(key,this.isMemorisationMode?"1":"0");},loadMemorisationModePreference(){try{const key=this.getMemorisationModeStorageKey();if(key){const stored=localStorage.getItem(key);if(stored!==null)this.isMemorisationMode=stored==="1";}}catch(_){}},advanceMemorisationFocus(){const current=this.memorisationFocusIndexSafe;if(current+1>=this.filteredAyahs.length){this.announce("You are already at the last verse in this range.");return;}const next=current+1;this.memorisationFocusIndex=next;this.selectCard(next);this.scrollToAyahIndex(next);this.announce(`Advanced to verse ${next+1}.`);},triggerAutoNextAyahAnimation(index){if(typeof index!=="number"||index<0)return;clearTimeout(this.autoNextAnimationTimer);this.autoNextAnimatedIndex=index;this.autoNextAnimationTimer=setTimeout(()=>{this.autoNextAnimatedIndex=null;this.autoNextAnimationTimer=null;},520);},applySettingsDraft(){if(!this.settingsDraft)return;this.showTajweed=!!this.settingsDraft.showTajweed;this.showRealtimeHighlighting=!!this.settingsDraft.showRealtimeHighlighting;this.showWordTranslation=!!this.settingsDraft.showWordTranslation;this.showWordTranslationTooltip=!!this.settingsDraft.showWordTranslationTooltip;this.gestureNavigationEnabled=!!this.settingsDraft.gestureNavigationEnabled;if(this.settingsDraft.playbackMode){this.setPlaybackMode(this.settingsDraft.playbackMode);}},applySettingsModal(){this.applySettingsDraft();const modalEl=document.getElementById(this.settingsModalId);if(!modalEl)return;this.settingsModalInstance=this.settingsModalInstance||bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl)||new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(modalEl);this.settingsModalInstance.hide();},prepareFontPicker(){this.fontPickerAlert="";this.clearFontPickerTimer();if(!this.quranFontDraftId&&Array.isArray(this.quranFonts)&&this.quranFonts.length){this.quranFontDraftId=this.selectedQuranFontId||this.quranFonts[0].id;}else if(!this.quranFontDraftId){this.quranFontDraftId=this.selectedQuranFontId||"";}else if(!this.selectedQuranFontId){this.selectedQuranFontId=this.quranFontDraftId;}if(!this.quranFonts.length&&!this.quranFontsLoading){this.fetchQuranFonts();}if(!this.fontPreviewTajweedText&&!this.fontPreviewLoading){this.fetchFontPreviewAyah();}},openFontPicker(){this.prepareFontPicker();if(this.isMobile){const modalEl=document.getElementById(this.fontPickerModalId);if(!modalEl)return;this.fontPickerModalInstance=this.fontPickerModalInstance||bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl)||new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(modalEl);this.fontPickerModalInstance.show();return;}const offcanvasEl=this.$refs.fontPickerOffcanvas;if(!offcanvasEl||!(window&&window.bootstrap&&window.bootstrap.Offcanvas))return;this.fontPickerOffcanvasInstance=window.bootstrap.Offcanvas.getInstance(offcanvasEl)||window.bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);this.fontPickerOffcanvasInstance.show();},closeFontPicker(){const modalEl=document.getElementById(this.fontPickerModalId);if(modalEl){const modal=bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl)||this.fontPickerModalInstance;if(modal)modal.hide();}const offcanvasEl=this.$refs.fontPickerOffcanvas;if(offcanvasEl&&window&&window.bootstrap&&window.bootstrap.Offcanvas){const instance=window.bootstrap.Offcanvas.getInstance(offcanvasEl)||this.fontPickerOffcanvasInstance;if(instance)instance.hide();}this.clearFontPickerTimer();},selectQuranFontDraft(id){this.quranFontDraftId=id;},applyQuranFontSelection(){if(!this.quranFontDraftId)return;this.selectedQuranFontId=this.quranFontDraftId;this.persistLocalSetting(this.quranFontPreferenceKey,this.selectedQuranFontId);this.syncQuranFontStack();const selected=this.quranFonts.find(font=>font.id===this.selectedQuranFontId)||this.activeQuranFont;const fontSupportsTajweed=!!(selected!==null&&selected!==void 0&&selected.isTajweed);const wasTajweedEnabled=!!this.showTajweed;if(fontSupportsTajweed&&!wasTajweedEnabled){this.showTajweed=true;if(this.settingsDraft)this.settingsDraft.showTajweed=true;}const label=(selected===null||selected===void 0?void 0:selected.label)||"Quran font";const tajweedNotice=fontSupportsTajweed&&!wasTajweedEnabled?" Tajweed colors enabled.":"";this.fontPickerAlert=`Font applied: ${label}.${tajweedNotice}`;this.clearFontPickerTimer();this.fontPickerAlertTimer=setTimeout(()=>{this.fontPickerAlert="";this.closeFontPicker();},3000);},clearFontPickerTimer(){if(this.fontPickerAlertTimer){clearTimeout(this.fontPickerAlertTimer);this.fontPickerAlertTimer=null;}},ensureSelectedQuranFont(){if(!Array.isArray(this.quranFonts)||!this.quranFonts.length){return;}const normalized=this.coerceLegacyFontId(this.selectedQuranFontId);if(normalized&&normalized!==this.selectedQuranFontId){this.selectedQuranFontId=normalized;}const exists=this.quranFonts.some(font=>font.id===this.selectedQuranFontId);if(!exists){this.selectedQuranFontId=this.quranFonts[0].id;}const draftExists=this.quranFonts.some(font=>font.id===this.quranFontDraftId);if(!draftExists){this.quranFontDraftId=this.selectedQuranFontId;}this.persistLocalSetting(this.quranFontPreferenceKey,this.selectedQuranFontId);this.syncQuranFontStack();},syncQuranFontStack(fontId=""){const targetId=fontId||this.selectedQuranFontId;const selected=this.quranFonts.find(font=>font.id===targetId)||this.activeQuranFont;const stack=(selected===null||selected===void 0?void 0:selected.cssStack)||this.storedQuranFontStack||this.defaultQuranFontStack;if(!stack)return;this.storedQuranFontStack=stack;this.persistLocalSetting(this.quranFontStackPreferenceKey,stack);if(typeof document!=="undefined"){document.documentElement.style.setProperty("--ic-quran-arabic-font",stack);}},coerceLegacyFontId(value){var _this$quranFonts;if(!value)return"";const raw=String(value).toLowerCase();if((_this$quranFonts=this.quranFonts)!==null&&_this$quranFonts!==void 0&&_this$quranFonts.some(font=>font.id===raw))return raw;if(raw.includes("tajweed"))return"tajweed-mushaf";if(raw.includes("indopak")||raw.includes("indo")||raw.includes("nastaliq"))return"indopak";if(raw.includes("uthmani")||raw.includes("uthmanic"))return"uthmani";if(raw.includes("qpc")||raw.includes("hafs")||raw.includes("simple"))return"qpc-hafs";return raw;},getQuranComFonts(){return[{id:"qpc-hafs",label:"QPC Hafs",cssStack:"'UthmanicHafs', 'Noto Naskh Arabic', 'Amiri', serif",source:"Quran.com",inputId:"qpc-hafs",isTajweed:false},{id:"uthmani",label:"Uthmani",cssStack:"'UthmanicHafs', 'Scheherazade New', 'Amiri', serif",source:"Quran.com",inputId:"uthmani",isTajweed:false},{id:"indopak",label:"IndoPak",cssStack:"'IndoPak', 'Noto Nastaliq Urdu', 'Lateef', 'Amiri', serif",source:"Quran.com",inputId:"indopak",isTajweed:false},{id:"tajweed-mushaf",label:"Tajweed Mushaf (QCF V4)",cssStack:"'UthmanicHafs', 'Scheherazade New', 'Amiri', serif",source:"Quran.com",inputId:"tajweed-mushaf",isTajweed:true}];},getFallbackQuranFonts(){return[{id:"scheherazade-new",label:"Scheherazade New",cssStack:"'Scheherazade New', 'Noto Naskh Arabic', 'Amiri', serif",source:"Local",inputId:"scheherazade-new",isTajweed:false},{id:"uthmanic-hafs",label:"Uthmanic Hafs",cssStack:"'UthmanicHafs', 'Scheherazade New', 'Amiri', serif",source:"Local",inputId:"uthmanic-hafs",isTajweed:true},{id:"noto-naskh-arabic",label:"Noto Naskh Arabic",cssStack:"'Noto Naskh Arabic', 'Scheherazade New', 'Amiri', serif",source:"Google Fonts",inputId:"noto-naskh-arabic",isTajweed:false},{id:"noto-nastaliq-urdu",label:"Noto Nastaliq Urdu",cssStack:"'Noto Nastaliq Urdu', 'Lateef', 'Amiri', serif",source:"Google Fonts",inputId:"noto-nastaliq-urdu",isTajweed:false},{id:"reem-kufi",label:"Reem Kufi",cssStack:"'Reem Kufi', 'Cairo', 'Amiri', serif",source:"Google Fonts",inputId:"reem-kufi",isTajweed:false},{id:"amiri",label:"Amiri",cssStack:"'Amiri', 'Scheherazade New', serif",source:"Local",inputId:"amiri",isTajweed:false}];},getFontStackFallback(identifier="",label=""){const options=["'Scheherazade New', 'Noto Naskh Arabic', 'Amiri', serif","'Noto Naskh Arabic', 'Scheherazade New', 'Amiri', serif","'IndoPak', 'Noto Nastaliq Urdu', 'Lateef', 'Amiri', serif","'Reem Kufi', 'Cairo', 'Amiri', serif","'Aref Ruqaa', 'Amiri', serif","'Lateef', 'Amiri', serif","'Cairo', 'Amiri', serif","'Amiri', 'Scheherazade New', serif"];const key=`${identifier} ${label}`.trim().toLowerCase();if(!key)return this.defaultQuranFontStack;let hash=0;for(let i=0;i<key.length;i+=1){hash=hash*31+key.charCodeAt(i)|0;}const index=Math.abs(hash)%options.length;return options[index]||this.defaultQuranFontStack;},getFontStackForEdition(identifier="",label=""){const id=`${identifier}`.toLowerCase();const name=`${label}`.toLowerCase();const token=`${id} ${name}`;if(token.includes("uthmani")||token.includes("uthmanic")){return"'UthmanicHafs', 'Scheherazade New', 'Amiri', serif";}if(token.includes("tajweed")){return"'UthmanicHafs', 'Scheherazade New', 'Amiri', serif";}if(token.includes("warsh")){return"'Amiri', 'Noto Naskh Arabic', 'Scheherazade New', serif";}if(token.includes("nastaliq")||token.includes("indopak")||token.includes("indo")){return"'IndoPak', 'Noto Nastaliq Urdu', 'Lateef', 'Amiri', serif";}if(token.includes("ruqaa")||token.includes("ruqa")){return"'Aref Ruqaa', 'Amiri', serif";}if(token.includes("kufi")||token.includes("kufic")){return"'Reem Kufi', 'Cairo', 'Amiri', serif";}if(token.includes("cairo")){return"'Cairo', 'Amiri', serif";}if(token.includes("lateef")){return"'Lateef', 'Amiri', serif";}if(token.includes("naskh")){return"'Noto Naskh Arabic', 'Scheherazade New', 'Amiri', serif";}if(token.includes("imlaei")||token.includes("imla")){return"'Noto Naskh Arabic', 'Scheherazade New', 'Amiri', serif";}if(token.includes("amiri")){return"'Amiri', 'Scheherazade New', serif";}if(token.includes("khaled")){return"'Amiri', 'Scheherazade New', serif";}if(token.includes("scheherazade")){return"'Scheherazade New', 'Amiri', serif";}if(token.includes("simple")){return"'Noto Naskh Arabic', 'Scheherazade New', 'Amiri', serif";}return this.getFontStackFallback(identifier,label);},isTajweedEdition(identifier="",label=""){const token=`${identifier} ${label}`.toLowerCase();return token.includes("tajweed");},getFontPreviewHtml(font){const raw=this.fontPreviewTajweedText||this.fontPreviewText||this.fontPreviewFallbackText;if(!raw)return"";if(font!==null&&font!==void 0&&font.isTajweed){return this.formatTajweedText(raw);}const plain=this.fontPreviewText||this.fontPreviewFallbackText;return this.escapeHtml(plain);},normalizeQuranFonts(editions){const out=[];const seen=new Set();(editions||[]).forEach(edition=>{const identifier=(edition===null||edition===void 0?void 0:edition.identifier)||(edition===null||edition===void 0?void 0:edition.name)||"";if(!identifier||seen.has(identifier))return;const label=(edition===null||edition===void 0?void 0:edition.englishName)||(edition===null||edition===void 0?void 0:edition.name)||(edition===null||edition===void 0?void 0:edition.identifier)||"Quran font";const cssStack=this.getFontStackForEdition((edition===null||edition===void 0?void 0:edition.identifier)||"",label);const isTajweed=this.isTajweedEdition((edition===null||edition===void 0?void 0:edition.identifier)||"",label);const inputId=identifier.toString().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-+|-+$)/g,"");const sourceLabel=(edition===null||edition===void 0?void 0:edition.type)||(edition===null||edition===void 0?void 0:edition.format)||(edition===null||edition===void 0?void 0:edition.language)||"API";out.push({id:identifier,label,cssStack,isTajweed,source:sourceLabel,inputId:inputId||identifier});seen.add(identifier);});out.sort((a,b)=>a.label.localeCompare(b.label));return out;},async fetchQuranFonts(){this.quranFontsLoading=true;this.quranFontsError="";try{this.quranFonts=this.getQuranComFonts();this.ensureSelectedQuranFont();}catch(error){console.error("Error fetching Quran fonts:",error);this.quranFontsError="Unable to load fonts right now. Showing available defaults.";this.quranFonts=this.getQuranComFonts();this.ensureSelectedQuranFont();}finally{this.quranFontsLoading=false;}},async fetchFontPreviewAyah(){this.fontPreviewLoading=true;this.fontPreviewError="";try{var _data$data2;const{data}=await this.cachedFetchJSON("https://api.alquran.cloud/v1/ayah/1/quran-tajweed","cache:quran-font-preview",30*24*60*60*1000);const previewText=(data===null||data===void 0||(_data$data2=data.data)===null||_data$data2===void 0?void 0:_data$data2.text)||"";if(previewText){this.fontPreviewTajweedText=previewText;this.fontPreviewText=this.stripTajweedMarkers(previewText);}else{this.fontPreviewText=this.fontPreviewFallbackText;}}catch(error){console.error("Error fetching font preview ayah:",error);this.fontPreviewError="Preview unavailable. Using default ayah.";this.fontPreviewText=this.fontPreviewFallbackText;}finally{this.fontPreviewLoading=false;}},async fetchPreference(key){var _response$data$value,_response$data;if(!this.bookmarkAuthenticated)return null;const response=await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`/api/preferences/${key}`);return(_response$data$value=(_response$data=response.data)===null||_response$data===void 0?void 0:_response$data.value)!==null&&_response$data$value!==void 0?_response$data$value:null;},async savePreference(key,value){if(!this.bookmarkAuthenticated)return;try{await axios__WEBPACK_IMPORTED_MODULE_0__["default"].put(`/api/preferences/${key}`,{value});}catch(_){}},persistLocalSetting(key,value){if(typeof window==="undefined")return;try{localStorage.setItem(key,value);}catch(_){}},getOrCreateSuratPreferenceAnonId(){if(this.suratPreferenceAnonId){return this.suratPreferenceAnonId;}if(typeof window==="undefined")return"";try{const key=this.suratPreferenceAnonStorageKey;let anonId=localStorage.getItem(key);if(!anonId){anonId=`anon-${Math.random().toString(36).slice(2,12)}`;localStorage.setItem(key,anonId);}this.suratPreferenceAnonId=anonId;return anonId;}catch(_){return"";}},buildScopedFontPreferenceKey(baseKey){if(this.bookmarkStorageUserId){return`${baseKey}_user_${this.bookmarkStorageUserId}`;}const anonId=this.getOrCreateSuratPreferenceAnonId();return`${baseKey}_anon_${anonId||"local"}`;},getContinueProgressStorageKey(){return this.buildScopedFontPreferenceKey(this.continueProgressStorageKeyBase);},getContinueProgressHiddenStorageKey(){return this.buildScopedFontPreferenceKey(this.continueProgressHiddenStorageKeyBase);},loadContinueProgressHiddenState(){if(typeof window==="undefined"){this.continueProgressHidden=false;return false;}try{const raw=localStorage.getItem(this.getContinueProgressHiddenStorageKey());this.continueProgressHidden=raw==="1";}catch(_){this.continueProgressHidden=false;}return this.continueProgressHidden;},persistContinueProgressHiddenState(hidden){if(typeof window==="undefined")return;try{localStorage.setItem(this.getContinueProgressHiddenStorageKey(),hidden?"1":"0");}catch(_){// ignore storage errors
}},hideContinueProgressBanner(){this.continueProgressHidden=true;this.persistContinueProgressHiddenState(true);},showContinueProgressBanner(){this.continueProgressHidden=false;this.persistContinueProgressHiddenState(false);},getContinueProgressScopeId(){if(this.bookmarkStorageUserId){return`user_${this.bookmarkStorageUserId}`;}const anonId=this.getOrCreateSuratPreferenceAnonId();return`anon_${anonId||"local"}`;},normalizeContinueProgressPayload(payload){if(!payload||typeof payload!=="object")return null;const surahNumber=Number(payload.surahNumber||payload.surahId);const ayahNumber=Number(payload.ayahNumber||payload.ayahId);if(!surahNumber||!ayahNumber)return null;const mode=payload.mode==="listening"?"listening":"reading";return{surahNumber,ayahNumber,surahEnglishName:String(payload.surahEnglishName||payload.surahNameEn||"").trim(),surahArabicName:String(payload.surahArabicName||payload.surahNameAr||"").trim(),mode,timestamp:Number(payload.timestamp||payload.updatedAt||Date.now())||Date.now()};},loadContinueProgress(){if(typeof window==="undefined"){this.continueProgress=null;return null;}try{const scopedKey=this.getContinueProgressStorageKey();const scopeId=this.getContinueProgressScopeId();let raw=localStorage.getItem(scopedKey)||"";if(!raw){const legacyRaw=this.bookmarkStorageUserId?localStorage.getItem(`continue_reading_user_${this.bookmarkStorageUserId}`)||"":localStorage.getItem("continue_reading_guest")||"";raw=legacyRaw;}if(!raw){const mapRaw=localStorage.getItem(this.continueProgressStorageMapKey);const parsedMap=mapRaw?JSON.parse(mapRaw):null;const scopedFromMap=parsedMap&&typeof parsedMap==="object"&&parsedMap[scopeId]?JSON.stringify(parsedMap[scopeId]):"";if(scopedFromMap){raw=scopedFromMap;}else if(parsedMap&&typeof parsedMap==="object"){const candidates=Object.values(parsedMap).map(item=>this.normalizeContinueProgressPayload(item)).filter(Boolean).sort((a,b)=>Number((b===null||b===void 0?void 0:b.timestamp)||0)-Number((a===null||a===void 0?void 0:a.timestamp)||0));if(candidates.length){raw=JSON.stringify(candidates[0]);}}}if(!raw||!String(raw).trim()){this.continueProgress=null;return null;}const parsed=JSON.parse(raw);const normalized=this.normalizeContinueProgressPayload(parsed);if(normalized){try{localStorage.setItem(scopedKey,JSON.stringify(normalized));}catch(_){// ignore migration write failures
}}this.continueProgress=normalized;return normalized;}catch(_){this.continueProgress=null;return null;}},persistContinueProgress({surahNumber,ayahNumber,mode="reading"}={}){if(typeof window==="undefined")return;const normalizedSurah=Number(surahNumber);const normalizedAyah=Number(ayahNumber);if(!normalizedSurah||!normalizedAyah)return;const normalizedMode=mode==="listening"?"listening":"reading";const signature=`${normalizedSurah}:${normalizedAyah}:${normalizedMode}`;const now=Date.now();if(signature===this.continueProgressLastSignature&&now-Number(this.continueProgressPersistedAt||0)<1200){return;}const payload={surahNumber:normalizedSurah,ayahNumber:normalizedAyah,surahEnglishName:this.getSurahNameByNumber(normalizedSurah),surahArabicName:this.getSurahArabicNameByNumber(normalizedSurah),mode:normalizedMode,timestamp:now};try{const scopedKey=this.getContinueProgressStorageKey();localStorage.setItem(scopedKey,JSON.stringify(payload));if(this.bookmarkStorageUserId){localStorage.setItem(`continue_reading_user_${this.bookmarkStorageUserId}`,JSON.stringify(payload));}else{localStorage.setItem("continue_reading_guest",JSON.stringify(payload));}const mapRaw=localStorage.getItem(this.continueProgressStorageMapKey);const parsedMap=mapRaw&&typeof mapRaw==="string"?JSON.parse(mapRaw):{};const nextMap=parsedMap&&typeof parsedMap==="object"?_objectSpread({},parsedMap):{};nextMap[this.getContinueProgressScopeId()]=payload;localStorage.setItem(this.continueProgressStorageMapKey,JSON.stringify(nextMap));}catch(_){return;}this.continueProgress=payload;this.continueProgressHidden=false;this.persistContinueProgressHiddenState(false);this.continueProgressLastSignature=signature;this.continueProgressPersistedAt=now;},shouldShowContinueCardForSurah(surah){if(!surah||!this.continueProgressSurahNumber)return false;return Number(surah.number)===Number(this.continueProgressSurahNumber);},async resumeContinueProgress(options={}){const progress=this.continueProgress;if(!progress)return;const surahNumber=Number(progress.surahNumber);const ayahNumber=Number(progress.ayahNumber);if(!surahNumber||!ayahNumber)return;const targetIndex=Math.max(0,ayahNumber-1);try{if(String(this.selectedSurah)!==String(surahNumber)){await this.selectSurah(surahNumber,{skipScroll:true});}this.selectCard(targetIndex);this.scrollToAyahIndex(targetIndex,{settle:true,force:true,behavior:"smooth",lock:true});if(options.autoplay){this.playAudio(targetIndex);}}catch(_){// keep sidebar interaction resilient
}},getContinueProgressSurahName(){const progress=this.continueProgress;const surahNumber=Number(progress===null||progress===void 0?void 0:progress.surahNumber);return(progress===null||progress===void 0?void 0:progress.surahEnglishName)||this.getSurahNameByNumber(surahNumber||this.selectedSurah||1);},getMemorisationModeStorageKey(){return this.buildScopedFontPreferenceKey("suratIsMemorisationMode");},readScopedFontPreference(baseKey,options={}){const{json=false}=options;if(typeof window==="undefined")return null;try{const key=this.buildScopedFontPreferenceKey(baseKey);const raw=localStorage.getItem(key);if(raw===null||raw===undefined||raw==="")return null;if(!json)return raw;return JSON.parse(raw);}catch(_){return null;}},writeScopedFontPreference(baseKey,value,options={}){const{json=false}=options;if(typeof window==="undefined")return;try{const key=this.buildScopedFontPreferenceKey(baseKey);const payload=json?JSON.stringify(value):String(value);localStorage.setItem(key,payload);}catch(_){// ignore storage errors
}},readScopedBooleanPreference(baseKey,fallback=false){const raw=this.readScopedFontPreference(baseKey);if(raw===null||raw===undefined||raw===""){return!!fallback;}const normalized=String(raw).trim().toLowerCase();if(["1","true","on","yes"].includes(normalized))return true;if(["0","false","off","no"].includes(normalized))return false;return!!fallback;},writeScopedBooleanPreference(baseKey,value){this.writeScopedFontPreference(baseKey,value?"1":"0");},async initializeDeepFocusModePreference(){if(this.bookmarkAuthenticated&&!this.bookmarkStorageUserId){try{await this.fetchBookmarkStorageUserId();}catch(_){// ignore preference scope lookup errors
}}const currentValue=!!this.isDeepFocusMode;const hasScopedValue=this.readScopedFontPreference(this.deepFocusModePreferenceBaseKey)!==null;this.isDeepFocusMode=this.readScopedBooleanPreference(this.deepFocusModePreferenceBaseKey,currentValue);if(!hasScopedValue){// Preserve the current runtime mode when scope changes (anon<->user).
this.isDeepFocusMode=currentValue;}this.writeScopedBooleanPreference(this.deepFocusModePreferenceBaseKey,this.isDeepFocusMode);},async initializeReadingFullscreenPreference(){if(this.bookmarkAuthenticated&&!this.bookmarkStorageUserId){try{await this.fetchBookmarkStorageUserId();}catch(_){// ignore preference scope lookup errors
}}const currentValue=!!this.isReadingFullscreen;const hasScopedValue=this.readScopedFontPreference(this.readingFullscreenPreferenceBaseKey)!==null;const scopedValue=this.readScopedBooleanPreference(this.readingFullscreenPreferenceBaseKey,currentValue);const preferredValue=hasScopedValue?scopedValue:currentValue;// Keep mobile behavior untouched while still retaining the desktop preference.
this.isReadingFullscreen=!!preferredValue&&!!this.isDesktopWide;this.syncReadingFullscreenBodyClass(this.isReadingFullscreen);this.writeScopedBooleanPreference(this.readingFullscreenPreferenceBaseKey,!!preferredValue);},clampFontSizeValue(value,min,max,fallback){const parsed=Number(value);if(!Number.isFinite(parsed))return fallback;return Math.min(max,Math.max(min,parsed));},persistReaderFontSizePreferences(){this.writeScopedFontPreference(this.suratReaderFontSizePreferenceBaseKey,{arabicFontSize:this.clampFontSizeValue(this.arabicFontSize,16,40,28),translationFontSize:this.clampFontSizeValue(this.translationFontSize,12,30,18)},{json:true});},persistSurahInfoFontSizePreference(){this.writeScopedFontPreference(this.surahInfoFontSizePreferenceBaseKey,this.clampFontSizeValue(this.surahInfoFontSize,this.surahInfoFontSizeMin,this.surahInfoFontSizeMax,16));},persistOnboardingFontSizePreference(){this.writeScopedFontPreference(this.suratOnboardingFontSizePreferenceBaseKey,this.clampFontSizeValue(this.suratOnboardingFontSize,this.suratOnboardingFontSizeMin,this.suratOnboardingFontSizeMax,15));},async initializeFontSizePreferences(){if(this.bookmarkAuthenticated&&!this.bookmarkStorageUserId){try{await this.fetchBookmarkStorageUserId();}catch(_){// ignore preference scope lookup errors
}}const storedReaderSizes=this.readScopedFontPreference(this.suratReaderFontSizePreferenceBaseKey,{json:true});if(storedReaderSizes&&typeof storedReaderSizes==="object"){this.arabicFontSize=this.clampFontSizeValue(storedReaderSizes.arabicFontSize,16,40,this.arabicFontSize);this.translationFontSize=this.clampFontSizeValue(storedReaderSizes.translationFontSize,12,30,this.translationFontSize);}const storedSurahInfoFontSize=this.readScopedFontPreference(this.surahInfoFontSizePreferenceBaseKey);if(storedSurahInfoFontSize!==null){this.surahInfoFontSize=this.clampFontSizeValue(storedSurahInfoFontSize,this.surahInfoFontSizeMin,this.surahInfoFontSizeMax,this.surahInfoFontSize);}const storedOnboardingFontSize=this.readScopedFontPreference(this.suratOnboardingFontSizePreferenceBaseKey);if(storedOnboardingFontSize!==null){this.suratOnboardingFontSize=this.clampFontSizeValue(storedOnboardingFontSize,this.suratOnboardingFontSizeMin,this.suratOnboardingFontSizeMax,this.suratOnboardingFontSize);}this.persistReaderFontSizePreferences();this.persistSurahInfoFontSizePreference();this.persistOnboardingFontSizePreference();},loadReciterLeadOffsets(){try{const stored=localStorage.getItem("reciterLeadOffsets");this.reciterLeadOffsets=stored?JSON.parse(stored):{};}catch(_){this.reciterLeadOffsets={};}},getReciterLeadOffset(reciterId){if(!reciterId)return this.highlightLeadSeconds;const raw=this.reciterLeadOffsets[reciterId];const parsed=Number(raw);if(Number.isFinite(parsed))return parsed;const fallback=this.reciterDefaultLeadOffsets?this.reciterDefaultLeadOffsets[reciterId]:null;if(Number.isFinite(Number(fallback)))return Number(fallback);return this.highlightLeadSeconds;},announce(message,timeout=5000){this.screenReaderMessage=message;clearTimeout(this.savedAyahClearTimer);this.savedAyahClearTimer=setTimeout(()=>{this.screenReaderMessage="";},timeout);},buildPinnedSectionUiStorageKey(){if(!this.bookmarkStorageUserId){return"";}return`${this.pinnedSectionUiStateStorageKeyBase}_user_${this.bookmarkStorageUserId}`;},async initializePinnedSectionUiStorageKey(){if(!this.bookmarkAuthenticated){this.pinnedSectionUiStateStorageKey="";return"";}if(this.pinnedSectionUiStateStorageKey&&this.pinnedSectionUiStateStorageKey.startsWith(`${this.pinnedSectionUiStateStorageKeyBase}_user_`)&&this.bookmarkStorageUserId){return this.pinnedSectionUiStateStorageKey;}await this.fetchBookmarkStorageUserId();this.pinnedSectionUiStateStorageKey=this.buildPinnedSectionUiStorageKey();return this.pinnedSectionUiStateStorageKey;},async loadPinnedSectionUiPreference(){if(!this.bookmarkAuthenticated){this.pinnedSectionUiStateStorageKey="";this.isPinnedSectionCollapsed=false;this.isPinnedSectionHidden=false;return;}const key=await this.initializePinnedSectionUiStorageKey();if(!key){this.isPinnedSectionCollapsed=false;this.isPinnedSectionHidden=false;return;}try{const raw=localStorage.getItem(key);if(!raw){this.isPinnedSectionCollapsed=false;this.isPinnedSectionHidden=false;return;}const parsed=JSON.parse(raw);this.isPinnedSectionCollapsed=!!(parsed!==null&&parsed!==void 0&&parsed.collapsed);this.isPinnedSectionHidden=!!(parsed!==null&&parsed!==void 0&&parsed.hidden);}catch(_){this.isPinnedSectionCollapsed=false;this.isPinnedSectionHidden=false;}},persistPinnedSectionUiPreference(){if(!this.bookmarkAuthenticated)return;const key=this.pinnedSectionUiStateStorageKey;if(!key)return;try{localStorage.setItem(key,JSON.stringify({collapsed:!!this.isPinnedSectionCollapsed,hidden:!!this.isPinnedSectionHidden}));}catch(_){// ignore storage quota errors
}},togglePinnedSectionCollapsed(){this.isPinnedSectionCollapsed=!this.isPinnedSectionCollapsed;this.persistPinnedSectionUiPreference();},hidePinnedSection(){this.isPinnedSectionHidden=true;this.persistPinnedSectionUiPreference();},showPinnedSection(){this.isPinnedSectionHidden=false;this.persistPinnedSectionUiPreference();},buildPinnedAyahStorageKey(){if(!this.bookmarkStorageUserId){return"";}return`${this.pinnedAyahStorageKeyBase}_user_${this.bookmarkStorageUserId}`;},async initializePinnedAyahStorageKey(){if(!this.bookmarkAuthenticated){this.pinnedAyahStorageKey="";return"";}if(this.pinnedAyahStorageKey&&this.pinnedAyahStorageKey.startsWith(`${this.pinnedAyahStorageKeyBase}_user_`)&&this.bookmarkStorageUserId){return this.pinnedAyahStorageKey;}await this.fetchBookmarkStorageUserId();this.pinnedAyahStorageKey=this.buildPinnedAyahStorageKey();return this.pinnedAyahStorageKey;},async loadPinnedAyahs(){const emptyState={};if(!this.bookmarkAuthenticated){this.pinnedAyahStorageKey="";this.pinnedAyahs=emptyState;return;}const scopedStorageKey=await this.initializePinnedAyahStorageKey();if(!scopedStorageKey){this.pinnedAyahs=emptyState;return;}try{const raw=localStorage.getItem(scopedStorageKey);if(!raw){this.pinnedAyahs=emptyState;return;}const parsed=JSON.parse(raw);if(!parsed||typeof parsed!=="object"){this.pinnedAyahs=emptyState;return;}const source=Array.isArray(parsed)?parsed.reduce((acc,item)=>{if(!item||typeof item!=="object")return acc;const surahNumber=Number(item.surahNumber);const ayahNumber=Number(item.ayahNumber);if(!surahNumber||!ayahNumber)return acc;const key=this.buildAyahKey(surahNumber,ayahNumber);acc[key]=item;return acc;},{}):parsed;const normalized={};Object.entries(source).forEach(([rawKey,value])=>{if(!value||typeof value!=="object")return;const keyParts=String(rawKey||"").split(":");const surahNumber=Number(value.surahNumber||keyParts[0]);const ayahNumber=Number(value.ayahNumber||keyParts[1]);if(!surahNumber||!ayahNumber)return;const key=this.buildAyahKey(surahNumber,ayahNumber);const translation=String(value.translation||"").replace(/\s+/g," ").trim();const text=String(value.text||"").replace(/\s+/g," ").trim();const previewSource=String(value.preview||translation||text||"").replace(/\s+/g," ").trim();normalized[key]={key,surahNumber,ayahNumber,surahEnglishName:String(value.surahEnglishName||value.surahName||"").trim(),surahArabicName:String(value.surahArabicName||"").trim(),translation,text,preview:previewSource||`Surah ${surahNumber}, Ayah ${ayahNumber}`,pinnedAt:Number(value.pinnedAt)||Number(value.createdAt)||0};});this.pinnedAyahs=normalized;}catch(_){this.pinnedAyahs=emptyState;}},persistPinnedAyahs(next=this.pinnedAyahs){if(!this.bookmarkAuthenticated)return;const scopedStorageKey=this.pinnedAyahStorageKey;if(!scopedStorageKey)return;try{localStorage.setItem(scopedStorageKey,JSON.stringify(next||{}));}catch(_){// ignore storage quota errors
}},buildPinnedAyahEntry(ayah,options={}){var _this$surahDetails27,_this$surahDetails28,_this$surahDetails29;const surahNumber=Number(options.surahNumber||((_this$surahDetails27=this.surahDetails)===null||_this$surahDetails27===void 0?void 0:_this$surahDetails27.surahNumber)||this.selectedSurah);const ayahNumber=Number(options.ayahNumber||(ayah===null||ayah===void 0?void 0:ayah.numberInSurah)||(ayah===null||ayah===void 0?void 0:ayah.number));if(!surahNumber||!ayahNumber)return null;const key=this.buildAyahKey(surahNumber,ayahNumber);const surahLookup=Array.isArray(this.surahs)?this.surahs.find(surah=>Number(surah.number)===surahNumber):null;const translation=String(options.translation||(ayah===null||ayah===void 0?void 0:ayah.translation)||"").replace(/\s+/g," ").trim();const text=String(options.text||(ayah===null||ayah===void 0?void 0:ayah.text)||"").replace(/\s+/g," ").trim();const previewSource=translation||text||"";const preview=previewSource.length>170?`${previewSource.slice(0,167).trimEnd()}...`:previewSource;return{key,surahNumber,ayahNumber,surahEnglishName:String(options.surahEnglishName||((_this$surahDetails28=this.surahDetails)===null||_this$surahDetails28===void 0?void 0:_this$surahDetails28.englishName)||(surahLookup===null||surahLookup===void 0?void 0:surahLookup.englishName)||"").trim(),surahArabicName:String(options.surahArabicName||((_this$surahDetails29=this.surahDetails)===null||_this$surahDetails29===void 0?void 0:_this$surahDetails29.name)||(surahLookup===null||surahLookup===void 0?void 0:surahLookup.name)||"").trim(),translation,text,preview:preview||`Surah ${surahNumber}, Ayah ${ayahNumber}`,pinnedAt:Number(options.pinnedAt)||Date.now()};},syncPinnedAyahsForCurrentSurah(){if(!this.surahDetails||!Array.isArray(this.surahDetails.ayahs)||!this.surahDetails.ayahs.length||!this.pinnedAyahs||typeof this.pinnedAyahs!=="object"){return;}const surahNumber=Number(this.surahDetails.surahNumber);if(!surahNumber)return;let changed=false;const next=_objectSpread({},this.pinnedAyahs);this.surahDetails.ayahs.forEach(ayah=>{var _this$surahDetails30,_this$surahDetails31;const ayahNumber=Number((ayah===null||ayah===void 0?void 0:ayah.numberInSurah)||(ayah===null||ayah===void 0?void 0:ayah.number));if(!ayahNumber)return;const key=this.buildAyahKey(surahNumber,ayahNumber);const existing=next[key];if(!existing)return;const refreshed=this.buildPinnedAyahEntry(ayah,{pinnedAt:existing.pinnedAt||existing.createdAt||0,surahEnglishName:existing.surahEnglishName||((_this$surahDetails30=this.surahDetails)===null||_this$surahDetails30===void 0?void 0:_this$surahDetails30.englishName)||"",surahArabicName:existing.surahArabicName||((_this$surahDetails31=this.surahDetails)===null||_this$surahDetails31===void 0?void 0:_this$surahDetails31.name)||""});if(!refreshed)return;if(existing.translation!==refreshed.translation||existing.text!==refreshed.text||existing.preview!==refreshed.preview||existing.surahEnglishName!==refreshed.surahEnglishName||existing.surahArabicName!==refreshed.surahArabicName){next[key]=_objectSpread(_objectSpread(_objectSpread({},existing),refreshed),{},{pinnedAt:existing.pinnedAt||refreshed.pinnedAt});changed=true;}});if(changed){this.pinnedAyahs=next;}},isAyahPinned(ayah){const key=this.getAyahKeyForAyah(ayah);return!!(key&&this.pinnedAyahs[key]);},async togglePinnedAyah(ayah){if(!this.bookmarkAuthenticated){const isAuthed=await this.ensureAuthenticated("Please log in to manage pinned ayat.",{ayah});if(!isAuthed)return;}await this.initializePinnedAyahStorageKey();if(!this.pinnedAyahStorageKey)return;const entry=this.buildPinnedAyahEntry(ayah);if(!entry)return;if(this.pinnedAyahs[entry.key]){this.removePinnedAyahByKey(entry.key,{announceRemoval:true});return;}this.pinnedAyahs=_objectSpread(_objectSpread({},this.pinnedAyahs),{},{[entry.key]:entry});this.triggerAyahFeedback(entry.key,"Pin saved","feedback-pin-saved","check","","",3000);this.announce(`Pinned Surah ${entry.surahNumber}, Ayah ${entry.ayahNumber}.`);},removePinnedAyahByKey(key,options={}){const{announceRemoval=true}=options;if(!key||!this.pinnedAyahs[key])return;const removed=this.pinnedAyahs[key];const next=_objectSpread({},this.pinnedAyahs);delete next[key];this.pinnedAyahs=next;this.triggerAyahFeedback(key,"Pin removed","feedback-pin-removed","trash","","",3000);if(announceRemoval){const ref=removed!==null&&removed!==void 0&&removed.surahNumber&&removed!==null&&removed!==void 0&&removed.ayahNumber?`Surah ${removed.surahNumber}, Ayah ${removed.ayahNumber}`:"selected ayah";this.announce(`Removed ${ref} from pinned ayahs.`);}},getPinnedSurahName(pinnedAyah){const explicit=String((pinnedAyah===null||pinnedAyah===void 0?void 0:pinnedAyah.surahEnglishName)||"").trim();if(explicit)return explicit;const surahNumber=Number(pinnedAyah===null||pinnedAyah===void 0?void 0:pinnedAyah.surahNumber);if(!surahNumber)return"Surah";const match=Array.isArray(this.surahs)?this.surahs.find(surah=>Number(surah.number)===surahNumber):null;return(match===null||match===void 0?void 0:match.englishName)||`Surah ${surahNumber}`;},getPinnedAyahPreview(pinnedAyah){const preview=String((pinnedAyah===null||pinnedAyah===void 0?void 0:pinnedAyah.preview)||(pinnedAyah===null||pinnedAyah===void 0?void 0:pinnedAyah.translation)||(pinnedAyah===null||pinnedAyah===void 0?void 0:pinnedAyah.text)||"").replace(/\s+/g," ").trim();return preview||"Pinned for quick access.";},async openPinnedAyah(pinnedAyah){const surahNumber=Number(pinnedAyah===null||pinnedAyah===void 0?void 0:pinnedAyah.surahNumber);const ayahNumber=Number(pinnedAyah===null||pinnedAyah===void 0?void 0:pinnedAyah.ayahNumber);if(!surahNumber||!ayahNumber)return;try{if(String(this.selectedSurah)!==String(surahNumber)){await this.selectSurah(surahNumber,{skipScroll:true});}this.searchQuery="";this.debouncedQuery="";const targetIndex=Math.max(0,ayahNumber-1);this.selectCard(targetIndex);this.$nextTick(()=>{this.scrollToAyahIndex(targetIndex,{settle:true,force:true,behavior:"smooth",lock:true});});this.announce(`Opened Surah ${surahNumber}, Ayah ${ayahNumber}.`);}catch(_){// ignore navigation errors
}},async loadSavedAyahs(){if(this.savedAyahsLoaded)return;if(!this.bookmarkAuthenticated){this.savedAyahKeys={};this.savedAyahsLoaded=true;return;}await this.initializeSavedAyahStorageKey();try{const stored=sessionStorage.getItem(this.savedAyahStorageKey)||localStorage.getItem(this.savedAyahStorageKey);if(stored){this.savedAyahKeys=JSON.parse(stored)||{};}else{const legacySession=sessionStorage.getItem("ic_saved_ayahs_session");const legacyGlobal=localStorage.getItem("ic_saved_ayahs");const fallback=legacySession||legacyGlobal;this.savedAyahKeys=fallback?JSON.parse(fallback):{};if(fallback){sessionStorage.setItem(this.savedAyahStorageKey,fallback);localStorage.setItem(this.savedAyahStorageKey,fallback);}}}catch(_){this.savedAyahKeys={};}this.savedAyahsLoaded=true;},buildAyahMessage(ayah,options={}){var _this$surahDetails32,_this$surahDetails33,_this$surahDetails34;if(!ayah)return"";const includeAudio=options.includeAudio!==false;const surahNumber=(_this$surahDetails32=this.surahDetails)===null||_this$surahDetails32===void 0?void 0:_this$surahDetails32.surahNumber;const surahName=((_this$surahDetails33=this.surahDetails)===null||_this$surahDetails33===void 0?void 0:_this$surahDetails33.englishName)||((_this$surahDetails34=this.surahDetails)===null||_this$surahDetails34===void 0?void 0:_this$surahDetails34.name);const ayahNumber=ayah.numberInSurah||ayah.number;let header="Surah";if(surahNumber)header+=` ${surahNumber}`;if(surahName)header+=` - ${surahName}`;if(ayahNumber)header+=` (Ayah ${ayahNumber})`;const lines=[header];if(ayah.text)lines.push(`Arabic: ${ayah.text}`);if(ayah.transliteration)lines.push(`Transliteration: ${ayah.transliteration}`);if(ayah.translation)lines.push(`Translation: ${ayah.translation}`);if(includeAudio&&ayah.audio)lines.push(`Listen here: ${ayah.audio}`);return lines.filter(Boolean).join("\n\n");},async copyText(text){var _navigator$clipboard;if(!text)return false;if(typeof window!=="undefined"&&typeof navigator!=="undefined"&&(_navigator$clipboard=navigator.clipboard)!==null&&_navigator$clipboard!==void 0&&_navigator$clipboard.writeText&&window.isSecureContext){try{await navigator.clipboard.writeText(text);return true;}catch(_){// fall back
}}try{const textarea=document.createElement("textarea");textarea.value=text;textarea.setAttribute("readonly","");textarea.style.position="fixed";textarea.style.top="-9999px";document.body.appendChild(textarea);textarea.select();const success=document.execCommand("copy");document.body.removeChild(textarea);return success;}catch(_){return false;}},async copyAyah(ayah){const message=this.buildAyahMessage(ayah,{includeAudio:true});if(!message)return;const ok=await this.copyText(message);if(ok){this.showToast("Ayah copied to clipboard.");this.announce("Ayah copied to clipboard.");}else{var _this$$toast;(_this$$toast=this.$toast)===null||_this$$toast===void 0||_this$$toast.error("Unable to copy ayah.");this.announce("Unable to copy ayah.");}},getAyahKeyForAyah(ayah){if(!this.surahDetails||!ayah)return"";const surahNumber=Number(this.surahDetails.surahNumber);const ayahNumber=Number(ayah.numberInSurah||ayah.number);if(!surahNumber||!ayahNumber)return"";return this.buildAyahKey(surahNumber,ayahNumber);},isAyahAudioDownloading(ayah){const key=this.getAyahKeyForAyah(ayah);if(!key)return false;return!!this.isAudioDownloading[key];},isAyahAudioDownloaded(ayah){const key=this.getAyahKeyForAyah(ayah);if(!key)return false;return!!this.isAudioDownloaded[key];},markAyahAudioDownloaded(key,duration=5000){if(!key)return;if(typeof this.$set==="function"){this.$set(this.isAudioDownloaded,key,true);}else{this.isAudioDownloaded[key]=true;}setTimeout(()=>{if(typeof this.$set==="function"){this.$set(this.isAudioDownloaded,key,false);}else{this.isAudioDownloaded[key]=false;}},duration);},sanitizeFilenamePart(value){return String(value||"").trim().replace(/\s+/g,"-").replace(/[^a-zA-Z0-9._-]/g,"_").replace(/_+/g,"_").replace(/-+/g,"-");},buildAyahAudioFilename(ayah){var _this$surahDetails35;const surahNumber=Number(((_this$surahDetails35=this.surahDetails)===null||_this$surahDetails35===void 0?void 0:_this$surahDetails35.surahNumber)||this.selectedSurah);const ayahNumber=Number((ayah===null||ayah===void 0?void 0:ayah.numberInSurah)||(ayah===null||ayah===void 0?void 0:ayah.number));const reciter=this.sanitizeFilenamePart(this.selectedReciter||"reciter");const parts=["surah",surahNumber||"unknown","ayah",ayahNumber||"unknown",reciter];return`${parts.join("-")}.mp3`;},buildSurahAudioFilename(){var _this$surahDetails36;const surahNumber=Number(((_this$surahDetails36=this.surahDetails)===null||_this$surahDetails36===void 0?void 0:_this$surahDetails36.surahNumber)||this.selectedSurah);const reciter=this.sanitizeFilenamePart(this.selectedReciter||"reciter");const parts=["surah",surahNumber||"unknown",reciter];return`${parts.join("-")}.mp3`;},getSurahAudioMetaKey(surahNumber=this.selectedSurah,reciterId=this.selectedReciter){const normalizedSurah=Number(surahNumber);if(!normalizedSurah||!reciterId)return"";return`${reciterId}:${normalizedSurah}`;},setSurahAudioMetaCache(key,value){if(!key)return;if(typeof this.$set==="function"){this.$set(this.surahAudioMetaByKey,key,value);}else{this.surahAudioMetaByKey[key]=value;}},setSurahAudioMetaLoading(key,value){if(!key)return;if(typeof this.$set==="function"){this.$set(this.surahAudioMetaLoadingByKey,key,!!value);}else{this.surahAudioMetaLoadingByKey[key]=!!value;}},normalizeFileSizeBytes(value){if(typeof value==="number"&&Number.isFinite(value)&&value>0){return Math.round(value);}if(typeof value!=="string")return null;const normalized=value.trim().toLowerCase().replace(/,/g,"");if(!normalized)return null;const match=normalized.match(/(\d+(\.\d+)?)/);if(!match)return null;const numeric=Number(match[1]);if(!Number.isFinite(numeric)||numeric<=0)return null;if(normalized.includes("gb"))return Math.round(numeric*1024*1024*1024);if(normalized.includes("mb"))return Math.round(numeric*1024*1024);if(normalized.includes("kb"))return Math.round(numeric*1024);return Math.round(numeric);},formatBytesToMegabytes(bytes,decimals=1){const size=Number(bytes);if(!Number.isFinite(size)||size<=0)return"";return`${(size/(1024*1024)).toFixed(decimals)} MB`;},canDownloadSurahAudio(){return!!this.getQuranRecitationId(this.selectedReciter);},markSurahAudioDownloaded(duration=6000){this.isSurahAudioDownloaded=true;clearTimeout(this.surahAudioDownloadedTimer);this.surahAudioDownloadedTimer=setTimeout(()=>{this.isSurahAudioDownloaded=false;this.surahAudioDownloadedTimer=null;},duration);},extractChapterRecitationAudioFile(payload){if(!payload||typeof payload!=="object")return null;return payload.audio_file||payload.audioFile||payload.chapter_recitation||payload.chapterRecitation||null;},extractChapterRecitationAudioUrl(payload,baseUrl){if(!payload)return"";const audioFile=this.extractChapterRecitationAudioFile(payload);const raw=(audioFile===null||audioFile===void 0?void 0:audioFile.audio_url)||(audioFile===null||audioFile===void 0?void 0:audioFile.audioUrl)||(audioFile===null||audioFile===void 0?void 0:audioFile.url)||(audioFile===null||audioFile===void 0?void 0:audioFile.file_url)||"";if(!raw||typeof raw!=="string")return"";if(raw.startsWith("//"))return`https:${raw}`;if(raw.startsWith("/"))return`${baseUrl}${raw}`;return raw;},extractChapterRecitationFileSizeBytes(payload){if(!payload)return null;const audioFile=this.extractChapterRecitationAudioFile(payload);const candidates=[audioFile===null||audioFile===void 0?void 0:audioFile.file_size,audioFile===null||audioFile===void 0?void 0:audioFile.fileSize,audioFile===null||audioFile===void 0?void 0:audioFile.filesize,audioFile===null||audioFile===void 0?void 0:audioFile.size,payload===null||payload===void 0?void 0:payload.file_size,payload===null||payload===void 0?void 0:payload.fileSize,payload===null||payload===void 0?void 0:payload.filesize,payload===null||payload===void 0?void 0:payload.size];for(const candidate of candidates){const bytes=this.normalizeFileSizeBytes(candidate);if(bytes)return bytes;}return null;},async fetchAudioContentLength(audioUrl){if(!audioUrl)return null;try{const response=await fetch(audioUrl,{method:"HEAD",mode:"cors"});if(!response.ok)return null;return this.normalizeFileSizeBytes(response.headers.get("content-length"));}catch(_){return null;}},async resolveChapterRecitationMeta(surahNumber=this.selectedSurah,reciterId=this.selectedReciter,options={}){const{force=false}=options;const normalizedSurah=Number(surahNumber);const recitationId=this.getQuranRecitationId(reciterId);if(!normalizedSurah||!recitationId){return{audioUrl:"",sizeBytes:null};}const key=this.getSurahAudioMetaKey(normalizedSurah,reciterId);const cachedMeta=key?this.surahAudioMetaByKey[key]:null;if(!force&&cachedMeta!==null&&cachedMeta!==void 0&&cachedMeta.audioUrl){return cachedMeta;}if(key)this.setSurahAudioMetaLoading(key,true);try{const endpoint=`https://api.quran.com/api/v4/chapter_recitations/${recitationId}/${normalizedSurah}`;const response=await fetch(endpoint,{mode:"cors"});if(!response.ok){throw new Error(`Surah audio lookup failed: ${response.status}`);}const payload=await response.json();const audioUrl=this.extractChapterRecitationAudioUrl(payload,"https://api.quran.com");let sizeBytes=this.extractChapterRecitationFileSizeBytes(payload);if(!sizeBytes&&audioUrl){sizeBytes=await this.fetchAudioContentLength(audioUrl);}const meta={audioUrl:audioUrl||"",sizeBytes:sizeBytes||null,updatedAt:Date.now()};if(key&&meta.audioUrl){this.setSurahAudioMetaCache(key,meta);}return meta;}finally{if(key)this.setSurahAudioMetaLoading(key,false);}},prefetchCurrentSurahAudioMeta(){var _this$surahDetails37;const surahNumber=Number(this.selectedSurah||((_this$surahDetails37=this.surahDetails)===null||_this$surahDetails37===void 0?void 0:_this$surahDetails37.surahNumber));if(!surahNumber||!this.canDownloadSurahAudio())return;this.resolveChapterRecitationMeta(surahNumber,this.selectedReciter).catch(error=>{console.warn("Unable to prefetch surah audio metadata:",error);});},async downloadSurahAudio(){var _this$surahDetails38;const surahNumber=Number(((_this$surahDetails38=this.surahDetails)===null||_this$surahDetails38===void 0?void 0:_this$surahDetails38.surahNumber)||this.selectedSurah);if(!surahNumber)return;const firstAyahKey=this.buildAyahKey(surahNumber,1);if(this.isSurahAudioDownloading)return;const recitationId=this.getQuranRecitationId(this.selectedReciter);if(!recitationId){this.triggerAyahFeedback(firstAyahKey,"Full surah download isn't available for this reciter.","feedback-warning","warning");this.announce("Full surah download isn't available for this reciter.");return;}this.isSurahAudioDownloading=true;this.isSurahAudioDownloaded=false;clearTimeout(this.surahAudioDownloadedTimer);this.surahAudioDownloadedTimer=null;this.announce("Downloading full surah audio.");let audioUrl="";try{var _meta;let meta=await this.resolveChapterRecitationMeta(surahNumber,this.selectedReciter);audioUrl=((_meta=meta)===null||_meta===void 0?void 0:_meta.audioUrl)||"";if(!audioUrl){var _meta2;meta=await this.resolveChapterRecitationMeta(surahNumber,this.selectedReciter,{force:true});audioUrl=((_meta2=meta)===null||_meta2===void 0?void 0:_meta2.audioUrl)||"";}}catch(error){console.warn("Unable to resolve full surah audio URL:",error);}if(!audioUrl){this.triggerAyahFeedback(firstAyahKey,"Unable to fetch a full-surah MP3 for this reciter. You can still download individual ayahs.","feedback-warning","warning");this.announce("Unable to fetch a full surah MP3. You can download individual ayahs.");this.isSurahAudioDownloading=false;return;}const filename=this.buildSurahAudioFilename();try{const response=await fetch(audioUrl,{mode:"cors"});if(!response.ok){throw new Error(`Surah audio download failed: ${response.status}`);}const blob=await response.blob();const blobUrl=window.URL.createObjectURL(blob);const a=document.createElement("a");a.href=blobUrl;a.download=filename;a.rel="noopener";a.style.display="none";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>{try{window.URL.revokeObjectURL(blobUrl);}catch(_){}},2000);this.markSurahAudioDownloaded();this.triggerAyahFeedback(firstAyahKey,"Surah MP3 downloaded.","bg-dark text-white","check");this.announce("Surah MP3 downloaded.");}catch(error){console.warn("Unable to download full surah audio as a blob:",error);this.triggerAyahFeedback(firstAyahKey,"Unable to download directly. Open the surah audio and use your browser to save it.","feedback-warning","warning",audioUrl,"Open audio",15000);this.announce("Unable to download directly. Open the surah audio to save it.");}finally{this.isSurahAudioDownloading=false;}},async downloadAyahAudio(ayah){if(!ayah)return;const key=this.getAyahKeyForAyah(ayah);if(!key)return;if(this.isAudioDownloading[key])return;const audioUrl=ayah.audio||"";if(!audioUrl){this.triggerAyahFeedback(key,"Audio unavailable for this ayah.","feedback-warning","warning");this.announce("Audio unavailable for this ayah.");return;}const setDownloading=value=>{if(typeof this.$set==="function"){this.$set(this.isAudioDownloading,key,!!value);}else{this.isAudioDownloading[key]=!!value;}};setDownloading(true);this.announce("Downloading ayah audio.");const filename=this.buildAyahAudioFilename(ayah);try{const response=await fetch(audioUrl,{mode:"cors"});if(!response.ok){throw new Error(`Audio download failed: ${response.status}`);}const blob=await response.blob();const blobUrl=window.URL.createObjectURL(blob);const a=document.createElement("a");a.href=blobUrl;a.download=filename;a.rel="noopener";a.style.display="none";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>{try{window.URL.revokeObjectURL(blobUrl);}catch(_){}},2000);this.markAyahAudioDownloaded(key);this.triggerAyahFeedback(key,"MP3 downloaded.","bg-dark text-white","check");this.announce("MP3 downloaded.");}catch(error){console.warn("Unable to download audio as a blob:",error);this.triggerAyahFeedback(key,"Unable to download directly. Open the audio and use your browser to save it.","feedback-warning","warning",audioUrl,"Open audio",15000);this.announce("Unable to download directly. Open the audio link to save it.");}finally{setDownloading(false);}},async syncSavedAyahsFromApi(){if(!this.bookmarkAuthenticated)return;try{var _response$data2;const response=await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/ayah-bookmarks");const bookmarks=((_response$data2=response.data)===null||_response$data2===void 0?void 0:_response$data2.data)||[];if(!Array.isArray(bookmarks))return;const next={};bookmarks.forEach(bookmark=>{var _bookmark$ayah,_bookmark$ayah2;const surahNumber=Number(bookmark.surah_number||((_bookmark$ayah=bookmark.ayah)===null||_bookmark$ayah===void 0?void 0:_bookmark$ayah.surah_id));const ayahNumber=Number(bookmark.ayah_number||bookmark.ayah_num);const ayahInSurah=Number((_bookmark$ayah2=bookmark.ayah)===null||_bookmark$ayah2===void 0?void 0:_bookmark$ayah2.ayah_id);if(surahNumber&&ayahNumber){next[this.buildAyahKey(surahNumber,ayahNumber)]=bookmark.id||true;}if(surahNumber&&ayahInSurah){next[this.buildAyahKey(surahNumber,ayahInSurah)]=bookmark.id||true;}});this.savedAyahKeys=next;}catch(_){// Ignore sync failures; local state still works.
}},notifyBookmarkChange(source=this.bookmarkInstanceId){if(typeof window==="undefined")return;const token=`${Date.now()}-${source}`;try{localStorage.setItem("bookmarkRefresh",token);}catch(_){// ignore private mode errors
}window.dispatchEvent(new CustomEvent("bookmarks-updated",{detail:{token,instance:source}}));},handleBookmarksUpdated(event){var _event$detail;if((event===null||event===void 0||(_event$detail=event.detail)===null||_event$detail===void 0?void 0:_event$detail.instance)===this.bookmarkInstanceId)return;this.syncSavedAyahsFromApi();},handleStorageBookmarksUpdated(event){if(event.key==="bookmarkRefresh"){this.syncSavedAyahsFromApi();return;}if(event.key===this.getContinueProgressStorageKey()){this.loadContinueProgress();return;}if(event.key===this.getContinueProgressHiddenStorageKey()){this.loadContinueProgressHiddenState();}},handleVisibilityChange(){if(document.visibilityState==="visible"){this.syncSavedAyahsFromApi();if(this.voiceCommandsEnabled&&!this.voiceCommandListening){this.startVoiceCommandListening({silentError:true});}return;}if(this.voiceCommandsEnabled){this.stopVoiceCommandListening({keepEnabled:true});}},async initializeBookmarkAuth(){await this.evaluateBookmarkAuth();if(!this.bookmarkAuthenticated){this.savedAyahKeys={};this.savedAyahsLoaded=true;this.pinnedAyahs={};this.pinnedAyahStorageKey="";this.pinnedSectionUiStateStorageKey="";this.isPinnedSectionCollapsed=false;this.isPinnedSectionHidden=false;return;}await this.loadSavedAyahs();await this.loadPinnedAyahs();await this.loadPinnedSectionUiPreference();await this.initializeReflectionCacheKey();await this.syncSavedAyahsFromApi();if(this.bookmarkAuthenticated){await this.loadAyahReflections();}},async evaluateBookmarkAuth(){const userId=await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_4__.fetchUserIdFromApi)();this.bookmarkStorageUserId=userId||null;this.bookmarkAuthenticated=!!userId;this.syncHifdhAuthStorage();return this.bookmarkAuthenticated;},syncHifdhAuthStorage(){if(typeof window==="undefined")return;try{if(this.bookmarkAuthenticated&&this.bookmarkStorageUserId){localStorage.setItem(this.hifdhAuthStorageKey,String(this.bookmarkStorageUserId));}else{localStorage.removeItem(this.hifdhAuthStorageKey);}}catch(_){}},canAccessHifdhPlanByStorage(){if(!this.bookmarkAuthenticated||!this.bookmarkStorageUserId){return false;}if(typeof window==="undefined")return false;try{const stored=localStorage.getItem(this.hifdhAuthStorageKey);return String(stored||"")===String(this.bookmarkStorageUserId);}catch(_){return false;}},async ensureHifdhPlanAccess(){if(this.canAccessHifdhPlanByStorage())return true;const isAuthed=await this.ensureAuthenticated("Please log in to use Hifdh Plan.");if(!isAuthed)return false;this.syncHifdhAuthStorage();return this.canAccessHifdhPlanByStorage();},async openHifdhPlanModalGuarded(event){if(event&&typeof event.preventDefault==="function"){event.preventDefault();}const allowed=await this.ensureHifdhPlanAccess();if(!allowed)return;this.$nextTick(()=>{const modalEl=document.getElementById("hifdhPlanModal");if(!modalEl)return;const modal=bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl)||new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(modalEl);modal.show();});},clearSavedBookmarks(){this.savedAyahKeys={};try{const key=this.savedAyahStorageKey||"ic_saved_ayahs_session";sessionStorage.removeItem(key);localStorage.removeItem(key);}catch(_){// ignore
}},buildAyahKey(surahNumber,ayahNumber){return`${surahNumber}:${ayahNumber}`;},isAyahSaved(ayah){if(!ayah||!this.surahDetails)return false;const surahNumber=Number(this.surahDetails.surahNumber);const ayahNumber=Number(ayah.numberInSurah||ayah.number);return!!this.savedAyahKeys[this.buildAyahKey(surahNumber,ayahNumber)];},getBookmarkId(ayah){if(!ayah||!this.surahDetails)return null;const surahNumber=Number(this.surahDetails.surahNumber);const ayahNumber=Number(ayah.numberInSurah||ayah.number);const val=this.savedAyahKeys[this.buildAyahKey(surahNumber,ayahNumber)];return val===true?null:val;// handle historic boolean values
},async toggleBookmark(ayah){if(!this.bookmarkAuthenticated){const isAuthed=await this.ensureAuthenticated("Please log in to manage bookmarks.",{ayah});if(!isAuthed)return;}if(this.isAyahSaved(ayah)){this.removeBookmark(ayah);}else{this.quickSaveBookmark(ayah);}},triggerAyahFeedback(key,text,cssClass,icon,link="",linkText="",timeout=6000){// Use reactive assignment
this.feedbackMessages=_objectSpread(_objectSpread({},this.feedbackMessages),{},{[key]:{text,class:cssClass,icon,link,linkText}});setTimeout(()=>{const next=_objectSpread({},this.feedbackMessages);delete next[key];this.feedbackMessages=next;},timeout);},async quickSaveBookmark(ayah){if(!this.surahDetails||!ayah)return;const surahNumber=Number(this.surahDetails.surahNumber);const ayahNumber=Number(ayah.numberInSurah||ayah.number);const key=this.buildAyahKey(surahNumber,ayahNumber);// Optimistic update
const prevKeys=_objectSpread({},this.savedAyahKeys);this.savedAyahKeys=_objectSpread(_objectSpread({},this.savedAyahKeys),{},{[key]:true});// Local feedback
this.triggerAyahFeedback(key,"Bookmark saved successfully","bg-dark text-white","check");try{var _response$data3;const payload={surah_number:surahNumber,ayah_number:ayahNumber,surah_name:this.surahDetails.englishName||this.surahDetails.name||"Surah",ayah_verse_ar:ayah.text||"",ayah_verse_en:ayah.translation||"",folder_ids:[]};const response=await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/ayah-bookmarks",payload);const bookmark=(_response$data3=response.data)===null||_response$data3===void 0?void 0:_response$data3.bookmark;if(bookmark&&bookmark.id){this.savedAyahKeys=_objectSpread(_objectSpread({},this.savedAyahKeys),{},{[key]:bookmark.id});this.showToast("Bookmark saved.",4000,{text:"Edit",handler:()=>{this.openBookmarkModal(ayah);const modalEl=document.getElementById("bookmarkModal");if(modalEl){const modal=bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl)||new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(modalEl);modal.show();}}});this.announce("Ayah saved to bookmarks.");this.notifyBookmarkChange();}}catch(error){// Revert
this.savedAyahKeys=prevKeys;this.triggerAyahFeedback(key,"Error saving","bg-danger text-white","trash");this.showToast("Failed to save bookmark.",3000);}},async removeBookmark(ayah){if(!this.surahDetails||!ayah)return;const surahNumber=Number(this.surahDetails.surahNumber);const ayahNumber=Number(ayah.numberInSurah||ayah.number);const key=this.buildAyahKey(surahNumber,ayahNumber);const bookmarkId=this.getBookmarkId(ayah);if(!bookmarkId){// fallback handling
const _next=_objectSpread({},this.savedAyahKeys);delete _next[key];this.savedAyahKeys=_next;this.triggerAyahFeedback(key,"Bookmark removed","bg-dark text-white","trash");return;}// Optimistic update
const prevKeys=_objectSpread({},this.savedAyahKeys);const next=_objectSpread({},this.savedAyahKeys);delete next[key];this.savedAyahKeys=next;// Local feedback
this.triggerAyahFeedback(key,"Bookmark removed","bg-dark text-white","trash");try{await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/ayah-bookmarks/${bookmarkId}`);this.showToast("Bookmark removed.",2000);this.announce("Bookmark removed.");this.notifyBookmarkChange();}catch(error){if(error.response&&error.response.status===404){// Already deleted on server, so this is a success state for us.
this.showToast("Bookmark removed.",2000);this.announce("Bookmark removed.");this.notifyBookmarkChange();}else{// Revert
this.savedAyahKeys=prevKeys;this.triggerAyahFeedback(key,"Error removing","bg-danger text-white","trash");this.showToast("Failed to remove bookmark.",3000);}}},async openBookmarkModal(ayah){if(!this.surahDetails||!ayah)return;if(!this.bookmarkAuthenticated){const isAuthed=await this.ensureAuthenticated("Please log in to manage bookmarks.",{ayah});if(!isAuthed)return;}const ayahNumber=Number(ayah.numberInSurah||ayah.number);this.activeAyah={surah_number:Number(this.surahDetails.surahNumber),surah_name:this.surahDetails.englishName||this.surahDetails.name||"Surah",ayah_number:ayahNumber,ayah_verse_ar:ayah.text||"",ayah_verse_en:ayah.translation||""};this.$nextTick(()=>{const modalEl=document.getElementById("bookmarkModal");if(modalEl){const modal=bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl)||new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(modalEl);modal.show();}});},openSurahInfo(surah){if(!surah)return;this.surahInfo=_objectSpread({},surah);this.surahInfoText="";this.surahInfoShortText="";this.surahInfoSource="";this.surahInfoSourceUrl="";this.surahInfoError="";this.surahInfoLoading=true;this.surahInfoFontSize=Number(this.surahInfoFontSize)||16;this.$nextTick(()=>{const modalEl=document.getElementById(this.surahInfoModalId);if(!modalEl)return;this.surahInfoModalInstance=bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl)||new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(modalEl);this.surahInfoModalInstance.show();});this.fetchSurahInfoDetails(Number(surah.number));},increaseSurahInfoFontSize(){const next=Math.min(this.surahInfoFontSize+1,this.surahInfoFontSizeMax);this.surahInfoFontSize=next;},decreaseSurahInfoFontSize(){const next=Math.max(this.surahInfoFontSize-1,this.surahInfoFontSizeMin);this.surahInfoFontSize=next;},async fetchSurahInfoDetails(surahNumber){if(!surahNumber)return;try{const{data}=await this.cachedFetchJSON(`https://api.quran.com/api/v4/chapters/${surahNumber}/info?language=en`,`cache:surah-info:${surahNumber}`,7*24*60*60*1000);const info=(data===null||data===void 0?void 0:data.chapter_info)||{};this.surahInfoText=this.normalizeSurahInfoHtml(info.text);this.surahInfoShortText=this.normalizeSurahInfoHtml(info.short_text);this.surahInfoSource=info.source||"";this.surahInfoSourceUrl=info.source_url||"";if(!this.surahInfoSource){this.surahInfoSource="Quran.com";this.surahInfoSourceUrl="https://quran.com";}this.surahInfoLoading=false;}catch(error){this.surahInfoLoading=false;this.surahInfoError="Unable to load detailed surah info right now.";console.error("Error fetching surah info:",error);}},normalizeSurahInfoHtml(html){if(!html)return"";if(typeof window==="undefined"||!window.DOMParser)return html;try{const parser=new DOMParser();const doc=parser.parseFromString(html,"text/html");doc.querySelectorAll("a[href]").forEach(link=>{const text=(link.textContent||"").toLowerCase();const href=link.getAttribute("href")||"";let targetHref=href;let hostOverride="";if(href.startsWith("http")){try{const url=new URL(href);if(url.hostname.includes("quran.com")||url.hostname.includes("api.quran.com")){hostOverride="quran.com";}else if(url.hostname.includes("sunnah.com")){hostOverride="sunnah.com";}if(hostOverride){url.hostname=hostOverride;url.protocol="https:";targetHref=url.toString();}}catch(_){}}else{const isHadith=text.includes("hadith")||text.includes("sunnah")||href.includes("sunnah")||href.includes("hadith");const base=isHadith?"https://sunnah.com":"https://quran.com";targetHref=`${base}${href.startsWith("/")?"":"/"}${href}`;}link.setAttribute("href",targetHref);link.setAttribute("target","_blank");link.setAttribute("rel","noopener noreferrer");});return doc.body.innerHTML;}catch(_){return html;}},onBookmarkSaved(payload){if(!payload)return;const source=payload.bookmark||payload;const surahNumber=Number(source.surah_number);const ayahNumber=Number(source.ayah_number||source.ayah_num);if(!surahNumber||!ayahNumber)return;this.announce("Ayah saved to bookmarks.");this.showToast("Bookmark saved successfully.",4000);const next=_objectSpread({},this.savedAyahKeys);next[this.buildAyahKey(surahNumber,ayahNumber)]=source.id||true;this.savedAyahKeys=next;},async onBookmarksLinkClick(){const isAuthed=await this.ensureAuthenticated();if(isAuthed){window.open("/bookmarks","_blank");}},async onNotesLinkClick(){const isAuthed=await this.ensureAuthenticated("Please log in to save and view reflections.");if(isAuthed){window.open("/notes","_blank");}},hasReflection(ayah){var _this$surahDetails39;if(!ayah)return false;const surahNumber=Number(((_this$surahDetails39=this.surahDetails)===null||_this$surahDetails39===void 0?void 0:_this$surahDetails39.surahNumber)||this.selectedSurah);const ayahNumber=Number(ayah.numberInSurah||ayah.number);if(!surahNumber||!ayahNumber)return false;const key=this.buildAyahKey(surahNumber,ayahNumber);const stored=this.ayahReflections[key];if(Array.isArray(stored)){return stored.length>0;}if(stored&&typeof stored==="object"&&Object.keys(stored).length){return true;}return false;},async openReflectionModal(ayah){var _this$surahDetails40,_this$surahDetails41,_this$surahDetails42;if(!ayah)return;const surahNumber=Number(((_this$surahDetails40=this.surahDetails)===null||_this$surahDetails40===void 0?void 0:_this$surahDetails40.surahNumber)||this.selectedSurah);const ayahNumber=Number(ayah.numberInSurah||ayah.number);if(!surahNumber||!ayahNumber)return;const isAuthed=await this.ensureAuthenticated("Please log in to save reflections.",{ayah});if(!isAuthed)return;if(this.bookmarkAuthenticated&&!Object.keys(this.ayahReflections).length){await this.loadAyahReflections();}const surahLabel=((_this$surahDetails41=this.surahDetails)===null||_this$surahDetails41===void 0?void 0:_this$surahDetails41.englishName)||((_this$surahDetails42=this.surahDetails)===null||_this$surahDetails42===void 0?void 0:_this$surahDetails42.name)||"Surah";const surahName=`${surahNumber} - ${surahLabel}`;this.selectedAyahForReflection={surahNumber,ayahNumber,surahName,ayahArabic:ayah.text||"",ayahTranslation:ayah.translation||""};const key=this.buildAyahKey(surahNumber,ayahNumber);this.selectedReflectionKey=key;this.clearReflectionForm();this.reflectionErrorMessage="";this.isSavingReflection=false;this.$nextTick(()=>{const modalEl=document.getElementById(this.reflectionModalId);if(!modalEl)return;this.reflectionModalInstance=bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl)||new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(modalEl);if(this.reflectionModalHiddenHandler){modalEl.removeEventListener("hidden.bs.modal",this.reflectionModalHiddenHandler);}const handler=()=>this.onReflectionModalHidden();modalEl.addEventListener("hidden.bs.modal",handler);this.reflectionModalHiddenHandler=handler;this.reflectionModalInstance.show();});},hideReflectionModal(){const modalEl=document.getElementById(this.reflectionModalId);const modal=this.reflectionModalInstance||(modalEl?bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl):null);if(modal){modal.hide();}this.cancelReflectionEdit();},onReflectionModalHidden(){const modalEl=document.getElementById(this.reflectionModalId);if(modalEl&&this.reflectionModalHiddenHandler){modalEl.removeEventListener("hidden.bs.modal",this.reflectionModalHiddenHandler);}this.reflectionModalHiddenHandler=null;this.reflectionModalInstance=null;this.selectedAyahForReflection=null;this.selectedReflectionKey="";this.clearReflectionForm();this.reflectionErrorMessage="";this.reflectionSuccessMessage="";if(this.reflectionSuccessTimeout){clearTimeout(this.reflectionSuccessTimeout);this.reflectionSuccessTimeout=null;}},clearReflectionForm(){this.reflectionForm.subject="";this.reflectionForm.message="";},applySubjectSuggestion(text){this.reflectionForm.subject=text;},applyMessageSuggestion(text){this.reflectionForm.message=text;},startEditingReflection(note,index){if(!note)return;this.editingReflectionId=note.id||null;this.editingReflectionIndex=typeof index==="number"?index:null;this.reflectionForm.subject=note.subject||"";this.reflectionForm.message=note.message||"";this.reflectionErrorMessage="";this.reflectionSuccessMessage="";},cancelReflectionEdit(){this.editingReflectionId=null;this.editingReflectionIndex=null;this.clearReflectionForm();},async deleteReflection(note,index){if(!note)return;const proceed=confirm("Delete this reflection?");if(!proceed)return;if(note.id){try{await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/delete-notes/${note.id}`);}catch(error){console.error("Delete reflection failed",error);this.showToast("Unable to delete reflection.",3000);return;}}const key=this.selectedReflectionKey;if(!key)return;const current=Array.isArray(this.ayahReflections[key])?[...this.ayahReflections[key]]:[];current.splice(index,1);this.ayahReflections=_objectSpread(_objectSpread({},this.ayahReflections),{},{[key]:current});if(this.editingReflectionIndex===index){this.cancelReflectionEdit();}this.showToast("Reflection deleted.",2000);},toggleReflectionHelp(){this.showReflectionHighlight=false;},suggestionTrackStyle(rowIndex){const base=32+(rowIndex-1)*5;return{animationDuration:`${base}s`,animationDirection:rowIndex%2===0?"reverse":"normal"};},async submitReflectionForm(){const subject=(this.reflectionForm.subject||"").trim();const message=(this.reflectionForm.message||"").trim();if(!subject){this.reflectionErrorMessage="Please enter a subject for your reflection.";return;}if(!message){this.reflectionErrorMessage="Add a reflection message to continue.";return;}if(message.length<this.reflectionMessageMinLength){this.reflectionErrorMessage=`Reflection must be at least ${this.reflectionMessageMinLength} characters.`;return;}if(!this.selectedAyahForReflection)return;this.reflectionErrorMessage="";this.isSavingReflection=true;const{surahNumber,ayahNumber,surahName,ayahArabic,ayahTranslation}=this.selectedAyahForReflection;const payload={surah_name:surahName,ayah_num:String(ayahNumber),ayah_verse_ar:ayahArabic,ayah_verse_en:ayahTranslation,ayah_info:subject,ayah_notes:message,is_speech_to_text:false};const isEditing=!!this.editingReflectionId;try{var _response$data4;const response=isEditing?await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`/api/update-notes/${this.editingReflectionId}`,payload):await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/submit-note",payload);const note=((_response$data4=response.data)===null||_response$data4===void 0?void 0:_response$data4.note)||null;const key=this.buildAyahKey(surahNumber,ayahNumber);const entryPayload={id:(note===null||note===void 0?void 0:note.id)||this.editingReflectionId||null,subject,message,surah_name:payload.surah_name,ayah_verse_ar:ayahArabic,ayah_verse_en:ayahTranslation};const existing=Array.isArray(this.ayahReflections[key])?[...this.ayahReflections[key]]:[];if(!isEditing){this.ayahReflections=_objectSpread(_objectSpread({},this.ayahReflections),{},{[key]:[...existing,entryPayload]});}else{const targetIndex=typeof this.editingReflectionIndex==="number"?this.editingReflectionIndex:existing.findIndex(item=>item.id===this.editingReflectionId);if(targetIndex>=0){existing[targetIndex]=_objectSpread(_objectSpread({},existing[targetIndex]),entryPayload);}this.ayahReflections=_objectSpread(_objectSpread({},this.ayahReflections),{},{[key]:existing});this.cancelReflectionEdit();this.reflectionSuccessMessage="Reflection updated.";}if(!isEditing){this.flagReflectionKey(key);this.showToast("Reflection saved.",4000);this.announce("Reflection saved.");this.reflectionSuccessMessage="Your reflection has been saved.";if(this.reflectionSuccessTimeout){clearTimeout(this.reflectionSuccessTimeout);}this.reflectionSuccessTimeout=setTimeout(()=>{this.hideReflectionModal();this.reflectionSuccessTimeout=null;},1200);}}catch(error){var _error$response2;console.error("Error saving reflection",error);this.reflectionErrorMessage=(error===null||error===void 0||(_error$response2=error.response)===null||_error$response2===void 0||(_error$response2=_error$response2.data)===null||_error$response2===void 0?void 0:_error$response2.message)||"Unable to save reflection right now.";this.showToast("Unable to save reflection. Please try again.",3000);}finally{this.isSavingReflection=false;}},async loadAyahReflections(){if(!this.bookmarkAuthenticated)return;try{var _response$data5;const response=await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/fetch-notes");const notes=Array.isArray(response.data)?response.data:((_response$data5=response.data)===null||_response$data5===void 0?void 0:_response$data5.notes)||[];const next={};notes.forEach(note=>{const surahNumber=this.extractSurahNumberFromNoteName(note.surah_name);const ayahNumber=Number(note.ayah_num);if(!surahNumber||!ayahNumber)return;const key=this.buildAyahKey(surahNumber,ayahNumber);const entry={id:note.id,subject:(note.ayah_info||"").trim(),message:this.stripHtmlTags(note.ayah_notes),surah_name:note.surah_name,ayah_verse_ar:note.ayah_verse_ar,ayah_verse_en:note.ayah_verse_en};const existingEntries=next[key];next[key]=Array.isArray(existingEntries)?[...existingEntries,entry]:[entry];});const cachedKeys={};Object.keys(next).forEach(key=>{cachedKeys[key]=true;});this.ayahReflectionKeys=_objectSpread(_objectSpread({},this.ayahReflectionKeys||{}),cachedKeys);this.persistReflectionKeys(this.ayahReflectionKeys);this.persistGeneralReflectionKeys(this.ayahReflectionKeys);this.ayahReflections=next;}catch(error){console.error("Error loading reflections",error);}},extractSurahNumberFromNoteName(name){if(!name)return null;const trimmed=name.trim();const match=/^(\d+)/.exec(trimmed);if(match){return Number(match[1]);}const fallback=trimmed.split(/\D+/);for(const part of fallback){const num=Number(part);if(!Number.isNaN(num))return num;}return null;},stripHtmlTags(value){if(!value)return"";if(typeof document==="undefined"){return String(value).replace(/<[^>]+>/g," ").trim();}const div=document.createElement("div");div.innerHTML=value;return(div.textContent||div.innerText||"").trim();},async ensureAuthenticated(message="Please log in to access bookmarks & reflections.",options={}){const userId=await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_4__.fetchUserIdFromApi)();const isAuthed=!!userId;if(isAuthed){this.bookmarkAuthenticated=true;this.bookmarkStorageUserId=userId;this.loadContinueProgress();this.loadContinueProgressHiddenState();await this.initializeDeepFocusModePreference();await this.initializeReadingFullscreenPreference();this.loadMemorisationModePreference();await this.initializePinnedAyahStorageKey();await this.loadPinnedAyahs();await this.initializePinnedSectionUiStorageKey();await this.loadPinnedSectionUiPreference();await this.initializeReflectionCacheKey();this.syncHifdhAuthStorage();return true;}this.bookmarkAuthenticated=false;this.bookmarkStorageUserId=null;this.syncHifdhAuthStorage();this.loadContinueProgress();this.loadContinueProgressHiddenState();await this.initializeDeepFocusModePreference();await this.initializeReadingFullscreenPreference();this.loadMemorisationModePreference();this.pinnedAyahs={};this.pinnedAyahStorageKey="";this.pinnedSectionUiStateStorageKey="";this.isPinnedSectionCollapsed=false;this.isPinnedSectionHidden=false;if(options.ayah){this.showAyahAuthWarning(options.ayah,message);}else{this.showAuthAlert(message);}return false;},showAyahAuthWarning(ayah,message){var _this$surahDetails43;if(!ayah)return;const surahNumber=Number(((_this$surahDetails43=this.surahDetails)===null||_this$surahDetails43===void 0?void 0:_this$surahDetails43.surahNumber)||this.selectedSurah);const ayahNumber=Number(ayah.numberInSurah||ayah.number);if(!surahNumber||!ayahNumber)return;const key=this.buildAyahKey(surahNumber,ayahNumber);this.triggerAyahFeedback(key,message,"feedback-warning","warning","/login","Log in");},showAuthAlert(message="Please log in to access bookmarks & reflections."){var _this$filteredAyahs4,_this$filteredAyahs5,_this$filteredAyahs6;const fallbackAyah=((_this$filteredAyahs4=this.filteredAyahs)===null||_this$filteredAyahs4===void 0?void 0:_this$filteredAyahs4[this.selectedCardIndex])||((_this$filteredAyahs5=this.filteredAyahs)===null||_this$filteredAyahs5===void 0?void 0:_this$filteredAyahs5[this.currentlyPlayingIndex])||((_this$filteredAyahs6=this.filteredAyahs)===null||_this$filteredAyahs6===void 0?void 0:_this$filteredAyahs6[0]);if(fallbackAyah){this.showAyahAuthWarning(fallbackAyah,message);return;}this.showToast(message,6000);},async persistSavedAyahs(next){if(!this.bookmarkAuthenticated)return;try{await this.initializeSavedAyahStorageKey();const key=this.savedAyahStorageKey||"ic_saved_ayahs_session";const payload=JSON.stringify(next);sessionStorage.setItem(key,payload);localStorage.setItem(key,payload);}catch(_){// no-op
}},async initializeSavedAyahStorageKey(){if(this.savedAyahStorageKey&&this.savedAyahStorageKey.startsWith("ic_saved_ayahs_user_")&&this.bookmarkStorageUserId){return;}await this.fetchBookmarkStorageUserId();this.savedAyahStorageKey=this.buildSavedAyahStorageKey();},buildReflectionCacheKey(){if(this.bookmarkStorageUserId){return`ic_reflection_keys_user_${this.bookmarkStorageUserId}`;}if(!this.bookmarkAnonId){return"";}return`ic_reflection_keys_anon_${this.bookmarkAnonId}`;},async initializeReflectionCacheKey(){await this.fetchBookmarkStorageUserId();const nextKey=this.buildReflectionCacheKey();if(nextKey&&this.reflectionCacheKey===nextKey){this.loadReflectionKeyCache();return;}this.reflectionCacheKey=nextKey;this.loadReflectionKeyCache();},loadReflectionKeyCache(){const generalKeys=this.loadGeneralReflectionKeyCache();let combined=_objectSpread({},generalKeys||{});if(this.reflectionCacheKey){try{const stored=localStorage.getItem(this.reflectionCacheKey);if(stored){const parsed=JSON.parse(stored||"{}");combined=_objectSpread(_objectSpread({},combined),parsed);}}catch(_){// ignore JSON errors
}}this.ayahReflectionKeys=combined;},loadGeneralReflectionKeyCache(){if(!this.reflectionGeneralStorageKey)return{};try{const stored=localStorage.getItem(this.reflectionGeneralStorageKey);return stored?JSON.parse(stored):{};}catch(_){return{};}},persistReflectionKeys(keys=this.ayahReflectionKeys){if(!this.reflectionCacheKey)return;try{const payload=JSON.stringify(keys||{});localStorage.setItem(this.reflectionCacheKey,payload);}catch(_){// no-op
}},persistGeneralReflectionKeys(keys=this.ayahReflectionKeys){if(!this.reflectionGeneralStorageKey)return;try{const payload=JSON.stringify(keys||{});localStorage.setItem(this.reflectionGeneralStorageKey,payload);}catch(_){// no-op
}},flagReflectionKey(key){if(!key)return;const next=_objectSpread(_objectSpread({},this.ayahReflectionKeys||{}),{},{[key]:true});this.ayahReflectionKeys=next;this.persistReflectionKeys(next);this.persistGeneralReflectionKeys(next);},buildSavedAyahStorageKey(){const base="ic_saved_ayahs";if(this.bookmarkStorageUserId){return`${base}_user_${this.bookmarkStorageUserId}`;}if(!this.bookmarkAnonId){let anon=sessionStorage.getItem("ic_saved_ayahs_anon_id");if(!anon){anon=`anon-${Math.random().toString(36).slice(2)}`;sessionStorage.setItem("ic_saved_ayahs_anon_id",anon);}this.bookmarkAnonId=anon;}return`${base}_anon_${this.bookmarkAnonId}`;},async fetchBookmarkStorageUserId(){if(this.bookmarkStorageUserId){return this.bookmarkStorageUserId;}const userId=await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_4__.fetchUserIdFromApi)();if(userId){this.bookmarkStorageUserId=userId;}return this.bookmarkStorageUserId;},onAyahDragStart(ayah,event){if(!event||!this.surahDetails||!ayah)return;const ayahNumber=Number(ayah.numberInSurah||ayah.number);const payload={surah_number:Number(this.surahDetails.surahNumber),surah_name:this.surahDetails.englishName||this.surahDetails.name||"Surah",ayah_number:ayahNumber,ayah_verse_ar:ayah.text||"",ayah_verse_en:ayah.translation||""};event.dataTransfer.setData("text/plain",JSON.stringify(payload));event.dataTransfer.effectAllowed="copyMove";},toggleNextStepMinimized(){if(!this.canMinimizeNextStep)return;this.nextStepMinimized=!this.nextStepMinimized;try{localStorage.setItem("suratNextStepMinimized",this.nextStepMinimized?"1":"0");}catch(_){}},closeMobileSurahInfoCard(){this.showMobileSurahInfoCard=false;try{localStorage.setItem(this.mobileSurahInfoCardStorageKey,"1");}catch(_){}},showMobileSurahInfoCardAgain(){this.showMobileSurahInfoCard=true;try{localStorage.removeItem(this.mobileSurahInfoCardStorageKey);}catch(_){}},dismissNextStep(){this.showNextStep=false;try{localStorage.setItem("suratNextStepDismissed","1");}catch(_){}},calibrateItemHeight(force=false){try{const nodes=this.$refs.audioCard;if(!nodes)return;const refs=Array.isArray(nodes)?nodes:[nodes];const maxHeight=refs.reduce((max,node)=>{if(!node)return max;const rect=node.getBoundingClientRect();return rect.height>max?rect.height:max;},0);if(!maxHeight)return;const candidate=Math.round(maxHeight+24);if(!force&&Math.abs(this.itemHeight-candidate)<2)return;this.itemHeight=candidate;this.updateVirtualWindow();}catch(_){}},scheduleHeightCalibration(force=false){if(typeof window==="undefined"||!window.requestAnimationFrame)return;if(this._heightMeasureRaf){window.cancelAnimationFrame(this._heightMeasureRaf);this._heightMeasureRaf=null;}this._heightMeasureRaf=window.requestAnimationFrame(()=>{this._heightMeasureRaf=null;this.calibrateItemHeight(force);if(!this.itemHeightCalibrated){this.itemHeightCalibrated=true;}});},computeListTop(){try{const el=this.$refs.listContainer;if(!el){this.listTop=0;this.updateToolbarPinState();return;}const rect=el.getBoundingClientRect();this.listTop=rect.top+window.scrollY;}catch(_){this.listTop=0;}this.updateToolbarPinState();},getToolbarPinTriggerOffset(){if(typeof window==="undefined"||typeof document==="undefined"){return 82;}let navOffset=72;try{const rootStyle=window.getComputedStyle(document.documentElement);const navOffsetCss=parseFloat(rootStyle.getPropertyValue("--nav-offset"));const navbarHeightCss=parseFloat(rootStyle.getPropertyValue("--navbar-h"));if(Number.isFinite(navOffsetCss)&&navOffsetCss>0){navOffset=navOffsetCss;}else if(Number.isFinite(navbarHeightCss)&&navbarHeightCss>0){navOffset=navbarHeightCss;}}catch(_){// fall back to default offset
}return navOffset+8;},updateToolbarPinState(){if(typeof window==="undefined")return;// Disable pinning on mobile screen sizes as requested
if(this.isTabletOrMobile){if(this.isToolbarPinned)this.isToolbarPinned=false;return;}const firstCard=document.getElementById("ayah-card-0");if(firstCard&&firstCard.getBoundingClientRect){const rect=firstCard.getBoundingClientRect();this.firstAyahTop=rect.top+window.scrollY;}else if(!this.firstAyahTop){this.firstAyahTop=Number(this.listTop)||0;}const triggerTop=Number(this.firstAyahTop)||0;if(!triggerTop){if(this.isToolbarPinned)this.isToolbarPinned=false;return;}const triggerOffset=this.getToolbarPinTriggerOffset();const shouldPin=window.scrollY>=Math.max(0,triggerTop-triggerOffset);if(this.isToolbarPinned!==shouldPin){this.isToolbarPinned=shouldPin;}},onScrollVirtual(){this.updateToolbarPinState();const scrollY=typeof window!=="undefined"?window.scrollY:0;const listTop=Number(this.listTop)||0;const threshold=listTop+Math.max(320,window.innerHeight*0.4);let show=scrollY>threshold;const firstCard=document.getElementById("ayah-card-0");if(firstCard){const rect=firstCard.getBoundingClientRect();if(rect.bottom<window.innerHeight-24)show=true;}if(this.showScrollTop!==show)this.showScrollTop=show;this.isManualScrolling=true;clearTimeout(this.manualScrollTimer);this.manualScrollTimer=setTimeout(()=>{this.isManualScrolling=false;},1000);if(typeof window!=="undefined"){if(this._virtualWindowRaf){window.cancelAnimationFrame(this._virtualWindowRaf);}this._virtualWindowRaf=window.requestAnimationFrame(()=>{this._virtualWindowRaf=null;this.updateVirtualWindow();if(this.isNavigating){this.checkNavigationSettled();}});}else{this.updateVirtualWindow();}},updateVirtualWindow(){const n=this.filteredAyahs?this.filteredAyahs.length:0;const size=this.effectiveVirtualWindowSize;const buffer=this.effectiveVirtualBuffer;if(n===0){this.visibleStart=0;this.visibleEnd=0;return;}const now=Date.now();if(this.isNavigating&&this.windowLockUntil&&now<this.windowLockUntil&&typeof this.windowLockIndex==="number"){const _start=Math.max(0,this.windowLockIndex-buffer);const _end=Math.min(n,_start+size+buffer*2);if(_start!==this.visibleStart||_end!==this.visibleEnd){this.visibleStart=_start;this.visibleEnd=_end;if(!this.itemHeightCalibrated){this.scheduleHeightCalibration(true);}}return;}// Account for the dynamic sticky header offset when determining which card is "active" at the top
const offset=this.currentHeaderOffset;const y=window.scrollY-this.listTop+offset;// If we are at or above the list top, pin to start
if(window.scrollY<=this.listTop+5){const _start2=0;const _end2=Math.min(n,size+buffer*2);if(_start2!==this.visibleStart||_end2!==this.visibleEnd){this.visibleStart=_start2;this.visibleEnd=_end2;if(!this.itemHeightCalibrated){this.scheduleHeightCalibration(true);}}return;}const approxIndex=Math.max(0,Math.floor(y/Math.max(1,this.itemHeight)));const start=Math.max(0,approxIndex-buffer);const end=Math.min(n,start+size+buffer*2);if(start!==this.visibleStart||end!==this.visibleEnd){this.visibleStart=start;this.visibleEnd=end;if(!this.itemHeightCalibrated){this.scheduleHeightCalibration(true);}}},syncVirtualWindowAfterSelection(){const total=this.filteredAyahs?this.filteredAyahs.length:0;const size=this.effectiveVirtualWindowSize;const buffer=this.effectiveVirtualBuffer;this.firstAyahTop=0;this.isToolbarPinned=false;this.visibleStart=0;this.visibleEnd=Math.min(total,size+buffer*2);this.$nextTick(()=>{this.computeListTop();this.updateVirtualWindow();});},readDeepLinkTarget(){if(typeof window==="undefined")return null;const params=new URLSearchParams(window.location.search||"");const surah=Number(params.get("surah"));const ayah=Number(params.get("ayah"));if(!surah)return null;return{surah,ayah:ayah||null};},shouldAutoOpenHifdhPlanFromQuery(){if(typeof window==="undefined")return false;const params=new URLSearchParams(window.location.search||"");const openParam=String(params.get("open")||"").toLowerCase();return openParam==="hifdh-plan";},clearHifdhPlanAutoOpenQuery(){if(typeof window==="undefined")return;try{const url=new URL(window.location.href);if(url.searchParams.get("open")!=="hifdh-plan")return;url.searchParams.delete("open");const nextUrl=`${url.pathname}${url.search}${url.hash}`;window.history.replaceState({},"",nextUrl);}catch(_){// ignore malformed URL states
}},maybeScrollToDeepLink(){if(this.deepLinkHandled||!this.deepLinkTarget||!this.surahDetails)return;const surahNumber=Number(this.deepLinkTarget.surah);if(!surahNumber||Number(this.surahDetails.surahNumber)!==surahNumber)return;const ayahNumber=Number(this.deepLinkTarget.ayah);if(!ayahNumber){this.deepLinkHandled=true;return;}const index=ayahNumber-1;if(!Array.isArray(this.surahDetails.ayahs)||index<0||index>=this.surahDetails.ayahs.length){this.deepLinkHandled=true;return;}this.deepLinkHandled=true;this.scrollToAyahIndex(index);},isAutoSyncLocked(){return Date.now()<(this.autoSyncLockUntil||0);},lockAutoSync(durationMs){const nextUntil=Date.now()+Math.max(0,durationMs||0);if(!this.autoSyncLockUntil||nextUntil>this.autoSyncLockUntil){this.autoSyncLockUntil=nextUntil;}},getScrollBehavior(preferred="smooth"){if(preferred==="auto")return"auto";try{if(typeof window!=="undefined"&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches){return"auto";}}catch(_){}return preferred;},beginManualNavigation(index,options={}){const{duration=2200,tolerance=12}=options||{};this.isNavigating=true;this.navigationTargetIndex=index;this.navigationTargetTolerance=tolerance;this.windowLockIndex=index;this.windowLockUntil=Date.now()+duration;this.lockAutoSync(duration+400);if(this._navigationSettleTimer){clearTimeout(this._navigationSettleTimer);this._navigationSettleTimer=null;}const token=(this._navigationSettleToken||0)+1;this._navigationSettleToken=token;this._navigationSettleTimer=setTimeout(()=>{if(token!==this._navigationSettleToken)return;this.finishManualNavigation();},duration);},finishManualNavigation(){const index=this.navigationTargetIndex;this.navigationTargetIndex=null;this.windowLockIndex=null;this.windowLockUntil=0;this.isNavigating=false;const now=Date.now();const minUnlockAt=now+250;if(!this.autoSyncLockUntil||this.autoSyncLockUntil<minUnlockAt){this.autoSyncLockUntil=minUnlockAt;}if(typeof index==="number"&&index>=0){this.selectCard(index);}},checkNavigationSettled(){if(this.navigationTargetIndex==null)return;const index=this.navigationTargetIndex;const cardEl=document.getElementById(`ayah-card-${index}`);if(!cardEl||!cardEl.getBoundingClientRect)return;const rect=cardEl.getBoundingClientRect();const offset=this.currentHeaderOffset;const viewportHeight=window.innerHeight;const audioHeight=this.getAudioPlayerHeight();const availableHeight=Math.max(viewportHeight-offset-audioHeight,0);const centerFactor=typeof this.preferredPlaybackScrollFactor==="number"?this.preferredPlaybackScrollFactor:0.5;const desiredCenter=offset+availableHeight*centerFactor;const delta=rect.top+rect.height/2-desiredCenter;if(Math.abs(delta)<=(this.navigationTargetTolerance||12)){this.finishManualNavigation();}},scrollToAyahIndex(index,options={}){const{behavior="smooth",settle=false,settleDelay=null,force=false,lock=false}=options||{};const resolvedBehavior=this.getScrollBehavior(behavior);const total=Array.isArray(this.filteredAyahs)?this.filteredAyahs.length:0;if(!total||index<0||index>=total){this.isNavigating=false;return;}// Ensure target is in visible start/end for virtual scroll
const buffer=this.effectiveVirtualBuffer;const size=this.effectiveVirtualWindowSize;const start=Math.max(0,index-buffer);const end=Math.min(total,start+size+buffer*2);if(index<this.visibleStart||index>=this.visibleEnd){this.visibleStart=start;this.visibleEnd=end;}// Reduced nested ticks for an "instant" jump feel
this.$nextTick(()=>{const runScroll=()=>{this.computeListTop();this.calibrateItemHeight();const offset=this.currentHeaderOffset;const viewportHeight=window.innerHeight;const audioHeight=this.getAudioPlayerHeight();const availableHeight=Math.max(viewportHeight-offset-audioHeight,0);if(!force&&this.lastAutoScrollIndex===index&&Date.now()-this.lastProgrammaticScrollAt<650){this.lastProgrammaticScrollAt=Date.now();this.lastAutoScrollIndex=index;this.selectCard(index);this.isNavigating=false;return;}const cardEl=document.getElementById(`ayah-card-${index}`);const hadCardEl=!!cardEl;let targetTop;if(cardEl&&cardEl.getBoundingClientRect){const rect=cardEl.getBoundingClientRect();const cardCenter=window.scrollY+rect.top+rect.height/2;const centerFactor=typeof this.preferredPlaybackScrollFactor==="number"?this.preferredPlaybackScrollFactor:0.5;const centerOffset=offset+availableHeight*centerFactor;targetTop=cardCenter-centerOffset;}else{targetTop=this.listTop+index*this.itemHeight-offset;}const maxScroll=Math.max(document.documentElement.scrollHeight-window.innerHeight,0);const safeTarget=Math.min(Math.max(0,targetTop),maxScroll);const scrollableHeight=maxScroll;const minimalScrollableHeight=Math.max(32,availableHeight*0.35);if(scrollableHeight<=minimalScrollableHeight){this.lastProgrammaticScrollAt=Date.now();this.lastAutoScrollIndex=index;this.selectCard(index);this.isNavigating=false;return;}let finalTarget=safeTarget;if(targetTop>maxScroll&&index<total-1){const topAligned=this.listTop+index*this.itemHeight-offset;finalTarget=Math.min(Math.max(0,topAligned),maxScroll);}this.lastProgrammaticScrollAt=Date.now();this.lastAutoScrollIndex=index;const distance=Math.abs(finalTarget-window.scrollY);const correctionDelay=settleDelay!=null?settleDelay:Math.min(900,Math.max(320,distance*0.35));if(lock){const lockDuration=Math.max(1400,correctionDelay+900);this.beginManualNavigation(index,{duration:lockDuration,tolerance:12});}const shouldPrime=lock&&!hadCardEl;window.scrollTo({top:finalTarget,behavior:shouldPrime?"auto":resolvedBehavior});this.selectCard(index);if(lock){this.$nextTick(()=>{this.checkNavigationSettled();});}if(shouldPrime){this.$nextTick(()=>{if(typeof window!=="undefined"&&window.requestAnimationFrame){window.requestAnimationFrame(()=>{const nextEl=document.getElementById(`ayah-card-${index}`);if(!nextEl||!nextEl.getBoundingClientRect)return;const rect=nextEl.getBoundingClientRect();const nextOffset=this.currentHeaderOffset;const nextViewport=window.innerHeight;const nextAudio=this.getAudioPlayerHeight();const nextAvailable=Math.max(nextViewport-nextOffset-nextAudio,0);const centerFactor=typeof this.preferredPlaybackScrollFactor==="number"?this.preferredPlaybackScrollFactor:0.5;const nextCenterOffset=nextOffset+nextAvailable*centerFactor;const nextTarget=window.scrollY+rect.top+rect.height/2-nextCenterOffset;const maxScroll=Math.max(document.documentElement.scrollHeight-window.innerHeight,0);const safeNextTarget=Math.min(Math.max(0,nextTarget),maxScroll);window.scrollTo({top:safeNextTarget,behavior:resolvedBehavior});});}});}if(settle){this.scheduleScrollCorrection(index,{delay:correctionDelay,behavior:resolvedBehavior,passes:2});}if(!lock){// Delay resetting the navigation flag to let scrolls settle fully.
// 1000ms ensures smooth scroll completes before auto-locking resumes.
setTimeout(()=>{this.isNavigating=false;},settle?Math.max(1000,correctionDelay+200):1000);}};if(typeof window!=="undefined"&&window.requestAnimationFrame){window.requestAnimationFrame(runScroll);}else{runScroll();}});},scheduleScrollCorrection(index,options={}){const{delay=420,tolerance=8,behavior="smooth",passes=1}=options||{};if(this._scrollCorrectionTimer){clearTimeout(this._scrollCorrectionTimer);this._scrollCorrectionTimer=null;}const token=(this._scrollCorrectionToken||0)+1;this._scrollCorrectionToken=token;const runCorrection=attempt=>{if(token!==this._scrollCorrectionToken)return;this.$nextTick(()=>{if(token!==this._scrollCorrectionToken)return;const cardEl=document.getElementById(`ayah-card-${index}`);if(!cardEl||!cardEl.getBoundingClientRect)return;const rect=cardEl.getBoundingClientRect();const offset=this.currentHeaderOffset;const viewportHeight=window.innerHeight;const audioHeight=this.getAudioPlayerHeight();const availableHeight=Math.max(viewportHeight-offset-audioHeight,0);const centerFactor=typeof this.preferredPlaybackScrollFactor==="number"?this.preferredPlaybackScrollFactor:0.5;const desiredCenter=offset+availableHeight*centerFactor;const delta=rect.top+rect.height/2-desiredCenter;if(Math.abs(delta)<=tolerance)return;const maxScroll=Math.max(document.documentElement.scrollHeight-window.innerHeight,0);const target=Math.min(Math.max(0,window.scrollY+delta),maxScroll);window.scrollTo({top:target,behavior});if(attempt<passes){this._scrollCorrectionTimer=setTimeout(()=>{runCorrection(attempt+1);},180);}});};this._scrollCorrectionTimer=setTimeout(()=>{runCorrection(1);},delay);},getAudioPlayerHeight(){if(!this.bottomAudioPlayerEnabled||!this.showAudioPlayer)return 0;if(typeof document!=="undefined"){const container=document.querySelector(".audio-player-container");if(container){const rect=container.getBoundingClientRect();if(rect&&rect.height){return rect.height;}}}// Match the fixed audio player height plus safe area allowance.
return 220;},// simple localStorage cache with TTL and SWR
async cachedFetchJSON(url,cacheKey,ttlMs=24*60*60*1000){try{const raw=localStorage.getItem(cacheKey);if(raw){const{ts,data}=JSON.parse(raw);if(Date.now()-ts<ttlMs){// return cached immediately
return{data,fromCache:true};}}}catch(_){}const res=await fetch(url);if(!res.ok)throw new Error(`${res.status}`);const json=await res.json();try{localStorage.setItem(cacheKey,JSON.stringify({ts:Date.now(),data:json}));}catch(_){}return{data:json,fromCache:false};},onKeydown(e){var _e$target;const key=e&&e.key||"";const normalizedKey=key.toLowerCase();const isFullscreenShortcut=normalizedKey==="f"&&e.ctrlKey&&e.shiftKey&&!e.metaKey&&!e.altKey;if(isFullscreenShortcut&&this.isDesktopWide){e.preventDefault();this.toggleReadingFullscreen();return;}if(key==="Escape"&&this.isReadingFullscreen){e.preventDefault();this.exitReadingFullscreen();return;}const tag=(e.target&&e.target.tagName||"").toLowerCase();const isTypingContext=((_e$target=e.target)===null||_e$target===void 0?void 0:_e$target.isContentEditable)||["input","textarea","select"].includes(tag);if(isTypingContext){return;}if(key==="/"&&!e.metaKey&&!e.ctrlKey&&!e.altKey&&this.isAdvancedSearchVisible){e.preventDefault();const input=this.$refs.advancedSearchInput;if(input&&typeof input.focus==="function"){input.focus();if(typeof input.select==="function"){input.select();}}if(!this.isAdvancedSearchPanelVisible){this.isAdvancedSearchPanelVisible=true;}return;}if(key==="Escape"&&this.hasAdvancedSearchQuery){this.clearAdvancedSearch();return;}if(!Array.isArray(this.filteredAyahs)||this.filteredAyahs.length===0)return;switch(e.key){case"ArrowDown":case"ArrowRight":e.preventDefault();this.goToNextCard();break;case"ArrowUp":case"ArrowLeft":e.preventDefault();this.goToPreviousCard();break;case"Home":e.preventDefault();this.goToFirstCard();break;case"End":e.preventDefault();this.goToLastCard();break;}},handleAyahCardTap(index){var _this$isAudioPlaying,_this$audioElements;const safeIndex=Number(index);const now=Date.now();const isSameTapTarget=Number.isInteger(safeIndex)&&this.ayahCardLastTapIndex===safeIndex;const isDoubleTap=isSameTapTarget&&now-(this.ayahCardLastTapAt||0)<=Math.max(240,Number(this.ayahCardDoubleTapWindowMs)||520);if(Number.isInteger(safeIndex)&&(_this$isAudioPlaying=this.isAudioPlaying)!==null&&_this$isAudioPlaying!==void 0&&_this$isAudioPlaying[safeIndex]){this.pauseAudio(safeIndex);this.showAudioPlayer=false;this.showAudioPlayerQueuePanel=false;this.ayahCardPausedIndex=safeIndex;this.ayahCardLastTapAt=now;this.ayahCardLastTapIndex=safeIndex;return;}if(isDoubleTap&&Number.isInteger(safeIndex)&&this.ayahCardPausedIndex===safeIndex&&this.currentlyPlayingIndex===safeIndex&&(_this$audioElements=this.audioElements)!==null&&_this$audioElements!==void 0&&_this$audioElements[safeIndex]&&this.audioElements[safeIndex].paused){this.playAudio(safeIndex,{hideAudioPlayer:true});this.ayahCardPausedIndex=null;this.ayahCardLastTapAt=0;this.ayahCardLastTapIndex=null;return;}this.ayahCardLastTapAt=now;this.ayahCardLastTapIndex=Number.isInteger(safeIndex)?safeIndex:null;this.selectCard(index);},handleAyahCardClick(index,event){if(Date.now()<(this.ayahCardSwipeSuppressClickUntil||0)){var _event$preventDefault,_event$stopPropagatio;event===null||event===void 0||(_event$preventDefault=event.preventDefault)===null||_event$preventDefault===void 0||_event$preventDefault.call(event);event===null||event===void 0||(_event$stopPropagatio=event.stopPropagation)===null||_event$stopPropagatio===void 0||_event$stopPropagatio.call(event);return;}this.handleAyahCardTap(index);},getAyahGestureItemByIndex(index){var _this$filteredAyahs7;const safeIndex=Number(index);if(!Number.isInteger(safeIndex)||safeIndex<0)return null;const ayah=(_this$filteredAyahs7=this.filteredAyahs)===null||_this$filteredAyahs7===void 0?void 0:_this$filteredAyahs7[safeIndex];if(!ayah)return null;return{index:safeIndex,ayah};},clearAyahCardLongPressTimer(state){if(!state)return;if(state.longPressTimer){clearTimeout(state.longPressTimer);state.longPressTimer=null;}},scheduleAyahCardLongPress(state,cardIndex){if(!state||state.ignore)return;const safeIndex=Number(cardIndex);if(!Number.isInteger(safeIndex)||safeIndex<0)return;this.clearAyahCardLongPressTimer(state);state.longPressTriggered=false;const holdDelay=Math.max(380,Number(this.ayahCardLongPressDurationMs)||560);state.longPressTimer=setTimeout(()=>{state.longPressTimer=null;if(!state.active||state.ignore||state.horizontalLocked)return;if(Number(state.cardIndex)!==safeIndex)return;const targetItem=this.getAyahGestureItemByIndex(safeIndex);if(!targetItem)return;state.longPressTriggered=true;this.openAyahTafsirModal(targetItem);this.ayahCardSwipeSuppressClickUntil=Date.now()+Math.max(420,Number(this.ayahCardSwipeClickSuppressDurationMs)||700);},holdDelay);},shouldIgnoreAyahCardSwipeTarget(target){if(!target||typeof target.closest!=="function")return false;return!!target.closest(["button","a","input","select","textarea","label","[role='button']",".icon-btn",".action-pill",".form-check",".form-check-input",".form-check-label",".ayah-inline-btn","[data-no-ayah-swipe]"].join(","));},onAyahCardTouchStart(cardIndex,event){var _event$touches,_event$touches2,_event$changedTouches,_event$target3,_event$target3$closes;if((event===null||event===void 0||(_event$touches=event.touches)===null||_event$touches===void 0?void 0:_event$touches.length)>1){this.resetAyahCardSwipeGesture();return;}const touch=(event===null||event===void 0||(_event$touches2=event.touches)===null||_event$touches2===void 0?void 0:_event$touches2[0])||(event===null||event===void 0||(_event$changedTouches=event.changedTouches)===null||_event$changedTouches===void 0?void 0:_event$changedTouches[0]);const state=this.ayahCardSwipeState;if(!state||!touch)return;state.active=true;state.cardIndex=Number(cardIndex);state.startX=touch.clientX;state.startY=touch.clientY;state.startedAt=Date.now();const isWordTooltipTap=this.showWordTranslationTooltip&&!!(event!==null&&event!==void 0&&(_event$target3=event.target)!==null&&_event$target3!==void 0&&(_event$target3$closes=_event$target3.closest)!==null&&_event$target3$closes!==void 0&&_event$target3$closes.call(_event$target3,".ayah-word.has-tooltip"));state.ignore=this.shouldIgnoreAyahCardSwipeTarget(event===null||event===void 0?void 0:event.target);state.horizontalLocked=false;state.wordTooltipTarget=isWordTooltipTap;state.longPressTriggered=false;this.scheduleAyahCardLongPress(state,state.cardIndex);},onAyahCardPointerDown(cardIndex,event){var _event$target4,_event$target4$closes;if(!event||event.pointerType!=="mouse")return;if(event.button!==0)return;const state=this.ayahCardPointerState;if(!state)return;state.active=true;state.pointerId=event.pointerId;state.cardIndex=Number(cardIndex);state.startX=event.clientX;state.startY=event.clientY;state.startedAt=Date.now();const isWordTooltipTap=this.showWordTranslationTooltip&&!!(event!==null&&event!==void 0&&(_event$target4=event.target)!==null&&_event$target4!==void 0&&(_event$target4$closes=_event$target4.closest)!==null&&_event$target4$closes!==void 0&&_event$target4$closes.call(_event$target4,".ayah-word.has-tooltip"));state.ignore=this.shouldIgnoreAyahCardSwipeTarget(event===null||event===void 0?void 0:event.target);state.horizontalLocked=false;state.wordTooltipTarget=isWordTooltipTap;state.longPressTriggered=false;this.scheduleAyahCardLongPress(state,state.cardIndex);},onAyahCardPointerMove(event){const state=this.ayahCardPointerState;if(!(state!==null&&state!==void 0&&state.active))return;if(state.pointerId!==event.pointerId)return;if(state.ignore)return;const deltaX=event.clientX-state.startX;const deltaY=event.clientY-state.startY;if(Math.abs(deltaY)>this.ayahCardSwipeMaxVerticalOffset&&Math.abs(deltaY)>Math.abs(deltaX)){this.clearAyahCardLongPressTimer(state);state.ignore=true;state.horizontalLocked=false;return;}if(this.gestureNavigationEnabled&&Math.abs(deltaX)>=8&&Math.abs(deltaX)>Math.abs(deltaY)*1.05){this.clearAyahCardLongPressTimer(state);state.horizontalLocked=true;if(event!==null&&event!==void 0&&event.cancelable){var _event$preventDefault2;(_event$preventDefault2=event.preventDefault)===null||_event$preventDefault2===void 0||_event$preventDefault2.call(event);}return;}const cancelThreshold=Math.max(6,Number(this.ayahCardTapMaxMovementPx)||14);if(Math.abs(deltaX)>cancelThreshold||Math.abs(deltaY)>cancelThreshold){this.clearAyahCardLongPressTimer(state);}},onAyahCardPointerUp(event){const state=this.ayahCardPointerState;if(!(state!==null&&state!==void 0&&state.active))return;if(state.pointerId!==event.pointerId)return;const longPressTriggered=!!state.longPressTriggered;this.clearAyahCardLongPressTimer(state);if(longPressTriggered){this.resetAyahCardPointerGesture();return;}if(state.ignore){this.resetAyahCardPointerGesture();return;}const deltaX=event.clientX-state.startX;const deltaY=event.clientY-state.startY;const elapsed=Date.now()-(state.startedAt||0);const absX=Math.abs(deltaX);const absY=Math.abs(deltaY);const isHorizontalSwipe=this.gestureNavigationEnabled&&absX>=this.ayahCardSwipeMinDistance&&absY<=this.ayahCardSwipeMaxVerticalOffset&&absX>absY*1.2&&elapsed<=this.ayahCardSwipeMaxDurationMs;if(!isHorizontalSwipe){this.resetAyahCardPointerGesture();return;}this.ayahCardSwipeSuppressClickUntil=Date.now()+Math.max(420,Number(this.ayahCardSwipeClickSuppressDurationMs)||700);this.navigateAyahBySwipe(state.cardIndex,deltaX>0?1:-1);this.resetAyahCardPointerGesture();},onAyahCardTouchMove(event){var _event$touches3,_event$changedTouches2;const state=this.ayahCardSwipeState;if(!(state!==null&&state!==void 0&&state.active)||state.ignore)return;const touch=(event===null||event===void 0||(_event$touches3=event.touches)===null||_event$touches3===void 0?void 0:_event$touches3[0])||(event===null||event===void 0||(_event$changedTouches2=event.changedTouches)===null||_event$changedTouches2===void 0?void 0:_event$changedTouches2[0]);if(!touch)return;const deltaX=touch.clientX-state.startX;const deltaY=touch.clientY-state.startY;if(Math.abs(deltaY)>this.ayahCardSwipeMaxVerticalOffset&&Math.abs(deltaY)>Math.abs(deltaX)){this.clearAyahCardLongPressTimer(state);state.ignore=true;state.horizontalLocked=false;return;}if(this.gestureNavigationEnabled&&Math.abs(deltaX)>=12&&Math.abs(deltaX)>Math.abs(deltaY)*1.1){this.clearAyahCardLongPressTimer(state);state.horizontalLocked=true;if(event!==null&&event!==void 0&&event.cancelable){var _event$preventDefault3;(_event$preventDefault3=event.preventDefault)===null||_event$preventDefault3===void 0||_event$preventDefault3.call(event);}return;}const cancelThreshold=Math.max(6,Number(this.ayahCardTapMaxMovementPx)||14);if(Math.abs(deltaX)>cancelThreshold||Math.abs(deltaY)>cancelThreshold){this.clearAyahCardLongPressTimer(state);}},onAyahCardTouchEnd(event){var _event$changedTouches3;const state=this.ayahCardSwipeState;if(!(state!==null&&state!==void 0&&state.active))return;const longPressTriggered=!!state.longPressTriggered;this.clearAyahCardLongPressTimer(state);if(longPressTriggered){if(event!==null&&event!==void 0&&event.cancelable){var _event$preventDefault4;(_event$preventDefault4=event.preventDefault)===null||_event$preventDefault4===void 0||_event$preventDefault4.call(event);}this.resetAyahCardSwipeGesture();return;}const touch=event===null||event===void 0||(_event$changedTouches3=event.changedTouches)===null||_event$changedTouches3===void 0?void 0:_event$changedTouches3[0];if(!touch){this.resetAyahCardSwipeGesture();return;}if(state.ignore){this.resetAyahCardSwipeGesture();return;}const deltaX=touch.clientX-state.startX;const deltaY=touch.clientY-state.startY;const elapsed=Date.now()-(state.startedAt||0);const absX=Math.abs(deltaX);const absY=Math.abs(deltaY);const isHorizontalSwipe=this.gestureNavigationEnabled&&absX>=this.ayahCardSwipeMinDistance&&absY<=this.ayahCardSwipeMaxVerticalOffset&&absX>absY*1.2&&elapsed<=this.ayahCardSwipeMaxDurationMs;if(!isHorizontalSwipe){const tapMoveThreshold=Math.max(6,Number(this.ayahCardTapMaxMovementPx)||14);const tapDurationThreshold=Math.max(120,Number(this.ayahCardTapMaxDurationMs)||320);const isTap=absX<=tapMoveThreshold&&absY<=tapMoveThreshold&&elapsed<=tapDurationThreshold;if(isTap){var _this$audioElements2,_this$isAudioPlaying2;const cardIndex=Number(state.cardIndex);const audioElement=Number.isInteger(cardIndex)?(_this$audioElements2=this.audioElements)===null||_this$audioElements2===void 0?void 0:_this$audioElements2[cardIndex]:null;const shouldTreatAsWordInteraction=state.wordTooltipTarget&&!((_this$isAudioPlaying2=this.isAudioPlaying)!==null&&_this$isAudioPlaying2!==void 0&&_this$isAudioPlaying2[cardIndex])&&!(this.ayahCardPausedIndex===cardIndex&&audioElement&&audioElement.paused);if(!shouldTreatAsWordInteraction){this.handleAyahCardTap(state.cardIndex);if(event!==null&&event!==void 0&&event.cancelable){var _event$preventDefault5;(_event$preventDefault5=event.preventDefault)===null||_event$preventDefault5===void 0||_event$preventDefault5.call(event);}this.ayahCardSwipeSuppressClickUntil=Date.now()+Math.max(420,Number(this.ayahCardSwipeClickSuppressDurationMs)||700);}}this.resetAyahCardSwipeGesture();return;}if(event!==null&&event!==void 0&&event.cancelable){var _event$preventDefault6;(_event$preventDefault6=event.preventDefault)===null||_event$preventDefault6===void 0||_event$preventDefault6.call(event);}this.ayahCardSwipeSuppressClickUntil=Date.now()+Math.max(420,Number(this.ayahCardSwipeClickSuppressDurationMs)||700);this.navigateAyahBySwipe(state.cardIndex,deltaX>0?1:-1);this.resetAyahCardSwipeGesture();},resetAyahCardSwipeGesture(){const state=this.ayahCardSwipeState;if(!state)return;this.clearAyahCardLongPressTimer(state);state.active=false;state.cardIndex=null;state.startX=0;state.startY=0;state.startedAt=0;state.ignore=false;state.horizontalLocked=false;state.wordTooltipTarget=false;state.longPressTriggered=false;},resetAyahCardPointerGesture(){const state=this.ayahCardPointerState;if(!state)return;this.clearAyahCardLongPressTimer(state);state.active=false;state.pointerId=null;state.cardIndex=null;state.startX=0;state.startY=0;state.startedAt=0;state.ignore=false;state.horizontalLocked=false;state.wordTooltipTarget=false;state.longPressTriggered=false;},triggerSwipeAyahTransition(index,direction){const safeIndex=Number(index);if(!Number.isInteger(safeIndex)||safeIndex<0)return;clearTimeout(this.swipeTransitionTimer);this.swipeTransitionIndex=safeIndex;this.swipeTransitionDirection=direction>0?1:-1;this.swipeTransitionTimer=setTimeout(()=>{this.swipeTransitionIndex=null;this.swipeTransitionDirection=0;this.swipeTransitionTimer=null;},this.swipeTransitionDurationMs);},navigateAyahBySwipe(currentIndex,direction){const total=Array.isArray(this.filteredAyahs)?this.filteredAyahs.length:0;if(!total)return;const numericCurrent=Number(currentIndex);const hasCurrentIndex=currentIndex!==null&&currentIndex!==undefined&&Number.isFinite(numericCurrent);const safeCurrent=hasCurrentIndex?Math.min(Math.max(0,numericCurrent),total-1):Math.min(Math.max(0,Number(this.selectedCardIndex)||0),total-1);const targetIndex=direction>0?safeCurrent+1:safeCurrent-1;if(targetIndex<0||targetIndex>=total)return;this.lastManualNavigationAt=Date.now();this.triggerSwipeAyahTransition(targetIndex,direction);this.scrollToAyahIndex(targetIndex,{behavior:"smooth",force:true,lock:true});this.playAudio(targetIndex,{hideAudioPlayer:true});},selectCard(index){var _this$filteredAyahs8;this.selectedCardIndex=index;this.currentlyPlayingIndex=index;if(this.isMemorisationMode)this.memorisationFocusIndex=index;this.isHighlighted=true;const selectedAyah=(_this$filteredAyahs8=this.filteredAyahs)===null||_this$filteredAyahs8===void 0?void 0:_this$filteredAyahs8[index];const selectedAyahJuz=Number((selectedAyah===null||selectedAyah===void 0?void 0:selectedAyah.juz)||0);if(selectedAyahJuz){this.selectedJuz=selectedAyahJuz;}const selectedAyahNumber=Number((selectedAyah===null||selectedAyah===void 0?void 0:selectedAyah.numberInSurah)||(selectedAyah===null||selectedAyah===void 0?void 0:selectedAyah.number));if(selectedAyahNumber){var _this$surahDetails44;this.persistContinueProgress({surahNumber:Number(((_this$surahDetails44=this.surahDetails)===null||_this$surahDetails44===void 0?void 0:_this$surahDetails44.surahNumber)||this.selectedSurah),ayahNumber:selectedAyahNumber,mode:"reading"});}// ensure card is visible
// removed programmatic scrolling
const verseNum=index+1;this.screenReaderMessage=`Selected verse ${verseNum}.`;},goToNextCard(){const next=(this.selectedCardIndex+1)%this.filteredAyahs.length;this.selectCard(next);},goToPreviousCard(){const prev=(this.selectedCardIndex-1+this.filteredAyahs.length)%this.filteredAyahs.length;this.selectCard(prev);},goToFirstCard(){this.selectCard(0);},goToLastCard(){this.selectCard(this.filteredAyahs.length-1);},updateIsMobile(){try{this.isMobile=window.matchMedia("(max-width: 767px)").matches;this.isTabletOrMobile=window.matchMedia("(max-width: 991px)").matches;this.isTablet=window.matchMedia("(min-width: 768px) and (max-width: 991px)").matches;this.isDesktopWide=window.matchMedia("(min-width: 1024px)").matches;}catch(e){const width=window.innerWidth;this.isMobile=width<=767;this.isTabletOrMobile=width<=991;this.isTablet=width>=768&&width<=991;this.isDesktopWide=width>=1024;}if(!this.isTabletOrMobile&&this.isMobileToolbarExpanded){this.isMobileToolbarExpanded=false;}if(!this.isDesktopWide&&this.isReadingFullscreen){this.exitReadingFullscreen({restoreFocus:false,persistPreference:false});}},// removed ensureCardPositionsCached and fallbackCardPositions (scrollbar-related)
isElementVisible:function(element){if(!element)return false;const rect=element.getBoundingClientRect();const windowHeight=window.innerHeight;const windowWidth=window.innerWidth;// Check if element has valid dimensions
if(rect.height<=0||rect.width<=0)return false;// Check if element is within viewport bounds
const isInViewport=rect.top<windowHeight&&rect.bottom>0&&rect.left<windowWidth&&rect.right>0;return isInViewport;},isElementValid:function(element){if(!element)return false;const rect=element.getBoundingClientRect();// Check if element has valid dimensions
if(rect.height<=0||rect.width<=0)return false;// Check if element exists in the DOM (basic check)
if(!element.offsetParent&&element!==document.body)return false;return true;},getElementPosition:function(element){if(!element||!this.isElementValid(element)){return null;}try{const rect=element.getBoundingClientRect();const elementTop=rect.top+window.scrollY;// Basic sanity check
if(isNaN(elementTop)||elementTop<0){return null;}// Additional check for unreasonably high positions (might indicate loading issue)
const documentHeight=document.documentElement.scrollHeight;if(elementTop>documentHeight*0.9){console.warn(`Element position seems too high: ${elementTop}, document height: ${documentHeight}`);return null;}return elementTop;}catch(error){console.error("Error getting element position:",error);return null;}},// removed scrollToElement and smoothScrollToAyah
highlightedText:function(ayah){if(!ayah||!ayah.text&&!ayah.words&&!ayah.tajweedText)return"";const words=this.getAyahDisplayWords(ayah);const wordTranslations=this.mapWordTranslations(words,this.getAyahWordTranslations(ayah));const useTajweed=this.shouldUseTajweedWords(ayah,words.length);return words.map((word,index)=>{const content=useTajweed?this.formatTajweedText(word):this.escapeHtml(word);const tooltipText=wordTranslations.length?this.cleanWordTranslation(wordTranslations[index]||""):"";const hasTooltip=this.showWordTranslationTooltip&&!!tooltipText;const tooltipAttr=hasTooltip?` data-tooltip="${this.escapeHtmlAttribute(tooltipText)}" aria-label="${this.escapeHtmlAttribute(tooltipText)}"`:"";const tooltipClass=hasTooltip?" has-tooltip":"";const translation=this.showWordTranslation&&wordTranslations.length?this.escapeHtml(this.cleanWordTranslation(wordTranslations[index]||"")):"";return`<span class="ayah-word${tooltipClass}" data-word-index="${index}"${tooltipAttr}><span class="ayah-word-ar">${content}</span>${translation?`<span class="ayah-word-translation text-muted">${translation}</span>`:""}</span>`;}).join(" ");},getAyahBaseWords(ayah){if(!ayah)return[];if(Array.isArray(ayah.words)&&ayah.words.length)return this.normalizeAyahWords(ayah.words);if(ayah.text)return this.normalizeAyahWords(ayah.text.split(" "));return[];},getAyahIntroWordCount(ayah,baseWords){const words=Array.isArray(baseWords)?baseWords:this.getAyahBaseWords(ayah);if(words.length<4)return 0;const normalized=words.slice(0,4).map(word=>this.normalizeArabicToken(word));const expected=["بسم","الله","الرحمن","الرحيم"];for(let i=0;i<expected.length;i++){if(normalized[i]!==expected[i])return 0;}return 4;},normalizeArabicToken(token){return this.cleanAyahToken(token).replace(/[\u0622\u0623\u0625\u0671]/g,"\u0627").replace(/[\u064B-\u0652\u0653-\u0655\u0670]/g,"").replace(/\u0640/g,"").trim();},normalizeAyahWords(tokens){if(!Array.isArray(tokens))return[];const out=[];const letterRegex=/[\u0621-\u064A\u066E-\u066F\u0671-\u06D3\u06FA-\u06FC]/;tokens.forEach(token=>{if(!token)return;const cleaned=this.cleanAyahToken(token);if(!cleaned)return;const hasLetter=letterRegex.test(cleaned);if(!hasLetter)return;out.push(cleaned);});return out;},cleanAyahToken(token){return String(token).replace(/[\u0615-\u061A\u06D6-\u06ED\u06DD]/g,"").trim();},normalizeTajweedWords(tokens){if(!Array.isArray(tokens))return[];const out=[];const letterRegex=/[\u0621-\u064A\u066E-\u066F\u0671-\u06D3\u06FA-\u06FC]/;tokens.forEach(token=>{if(!token)return;const plain=this.cleanAyahToken(this.stripTajweedMarkers(token));if(!plain)return;const hasLetter=letterRegex.test(plain);if(!hasLetter)return;out.push(token);});return out;},stripTajweedMarkers(value){return String(value).replace(/\[[a-z]+(?::\d+)?\[/g,"").replace(/]/g,"");},shouldUseTajweedWords(ayah,fallbackLength=0){if(!this.showTajweed||!ayah)return false;if(!Array.isArray(ayah.tajweedWords)||!ayah.tajweedWords.length)return false;const normalized=this.normalizeTajweedWords(ayah.tajweedWords);const baseWords=this.getAyahBaseWords(ayah);const introCount=this.getAyahIntroWordCount(ayah,baseWords);const matchesFull=fallbackLength&&normalized.length===fallbackLength;const matchesIntro=fallbackLength&&introCount&&normalized.length===fallbackLength-introCount;if(!matchesFull&&!matchesIntro)return false;return true;},getAyahDisplayWords(ayah){var _ayah$tajweedWords;if(!ayah)return[];const baseWords=this.getAyahBaseWords(ayah);if(!this.showTajweed||!((_ayah$tajweedWords=ayah.tajweedWords)!==null&&_ayah$tajweedWords!==void 0&&_ayah$tajweedWords.length))return baseWords;const tajweedWords=this.normalizeTajweedWords(ayah.tajweedWords);const introCount=this.getAyahIntroWordCount(ayah,baseWords);if(introCount&&tajweedWords.length===baseWords.length-introCount){return[...baseWords.slice(0,introCount),...tajweedWords];}if(this.shouldUseTajweedWords(ayah,baseWords.length))return tajweedWords;return baseWords;},getAyahWordTranslations(ayah){if(!ayah||!Array.isArray(ayah.wordTranslations))return[];return ayah.wordTranslations;},cleanWordTranslation(text){return String(text).replace(/[\[\]\(\)]/g,"").replace(/\s{2,}/g," ").trim();},mapWordTranslations(words,translations){if(!Array.isArray(words))return[];if(!Array.isArray(translations)||!translations.length)return[];const introCount=this.getAyahIntroWordCount(null,words);if(introCount&&translations.length===words.length-introCount){return["In (the) name","Allah","the Most Gracious","the Most Merciful",...translations];}const letterRegex=/[\u0621-\u064A\u066E-\u066F\u0671-\u06D3\u06FA-\u06FC]/;const mapped=[];let tIndex=0;words.forEach(word=>{const hasLetter=letterRegex.test(this.stripTajweedMarkers(word));if(hasLetter&&tIndex<translations.length){mapped.push(translations[tIndex]);tIndex+=1;}else{mapped.push("");}});return mapped;},getAyahWordList(ayah){if(!ayah)return[];const baseWords=this.getAyahBaseWords(ayah);if(baseWords.length)return baseWords;if(this.showTajweed&&Array.isArray(ayah.tajweedWords))return this.normalizeTajweedWords(ayah.tajweedWords);return[];},getAyahAudioWordCount(ayah){if(!ayah)return 0;if(Array.isArray(ayah.audioSegments)&&ayah.audioSegments.length){const maxIndex=ayah.audioSegments.reduce((acc,seg)=>typeof(seg===null||seg===void 0?void 0:seg.wordIndex)==="number"&&seg.wordIndex>acc?seg.wordIndex:acc,-1);return Math.max(0,maxIndex+1);}if(Array.isArray(ayah.wordTranslations)&&ayah.wordTranslations.length)return ayah.wordTranslations.length;return this.getAyahBaseWords(ayah).length;},getAyahHighlightOffset(ayah,audioWordCount){const baseWords=this.getAyahBaseWords(ayah);const introCount=this.getAyahIntroWordCount(ayah,baseWords);if(!introCount)return 0;const displayCount=this.getAyahDisplayWords(ayah).length;if(displayCount===audioWordCount+introCount)return introCount;return 0;},getHighlightDisplayIndex(ayah,audioIndex,audioWordCount){const baseWords=this.getAyahBaseWords(ayah);const introCount=this.getAyahIntroWordCount(ayah,baseWords);const displayCount=this.getAyahDisplayWords(ayah).length;if(!introCount)return audioIndex;if(displayCount===audioWordCount){if(audioIndex<introCount)return null;return audioIndex;}if(displayCount===audioWordCount+introCount)return audioIndex+introCount;return audioIndex;},updateWordTimings(ayah,duration){const wordCount=this.getAyahAudioWordCount(ayah);if(wordCount>0&&duration>0){const step=duration/wordCount;this.wordTimings=Array.from({length:wordCount},(_,i)=>i*step);}else{this.wordTimings=[];}},getQuranRecitationId(reciterId){if(!reciterId)return null;return this.reciterTimingMap?this.reciterTimingMap[reciterId]:null;},async enrichSurahWithQuranSegments(){var _this$surahDetails45;if(!((_this$surahDetails45=this.surahDetails)!==null&&_this$surahDetails45!==void 0&&(_this$surahDetails45=_this$surahDetails45.ayahs)!==null&&_this$surahDetails45!==void 0&&_this$surahDetails45.length))return;const recitationId=this.getQuranRecitationId(this.selectedReciter);const audioParam=recitationId?`audio=${recitationId}&`:"";try{const{data}=await this.cachedFetchJSON(`https://api.quran.com/api/v4/verses/by_chapter/${this.selectedSurah}?${audioParam}words=true&per_page=300`,`cache:quran-timing:${this.selectedSurah}:${recitationId||"noaudio"}`,7*24*60*60*1000);const verses=Array.isArray(data===null||data===void 0?void 0:data.verses)?data.verses:[];const byKey=new Map();verses.forEach(verse=>{if(verse!==null&&verse!==void 0&&verse.verse_key)byKey.set(verse.verse_key,verse);});this.surahDetails.ayahs=this.surahDetails.ayahs.map((ayah,index)=>{var _match$audio,_match$audio2;const key=`${this.selectedSurah}:${ayah.numberInSurah||index+1}`;const match=byKey.get(key);const verseWords=Array.isArray(match===null||match===void 0?void 0:match.words)?match.words.filter(word=>(word===null||word===void 0?void 0:word.char_type_name)==="word"):[];const quranWords=verseWords.map(word=>(word===null||word===void 0?void 0:word.text)||(word===null||word===void 0?void 0:word.code_v1)||"");const wordTranslations=verseWords.map(word=>{var _word$translation;return(word===null||word===void 0||(_word$translation=word.translation)===null||_word$translation===void 0?void 0:_word$translation.text)||"";});const audioUrl=match!==null&&match!==void 0&&(_match$audio=match.audio)!==null&&_match$audio!==void 0&&_match$audio.url?`https://audio.qurancdn.com/${match.audio.url}`:ayah.audio;const segments=Array.isArray(match===null||match===void 0||(_match$audio2=match.audio)===null||_match$audio2===void 0?void 0:_match$audio2.segments)?match.audio.segments.filter(seg=>Array.isArray(seg)&&seg.length>=4).map(seg=>({wordIndex:seg[0],start:seg[2]/1000,end:seg[3]/1000})):null;return _objectSpread(_objectSpread({},ayah),{},{audio:audioUrl,audioSegments:segments,quranWords,wordTranslations});});}catch(error){console.warn("Unable to load Quran.com timing data:",error);}},startHighlightLoop(){if(!this.showRealtimeHighlighting)return;if(this._highlightRafId)return;const step=()=>{if(typeof this.currentAudioIndex!=="number"||this.currentAudioIndex<0){const playingIndex=Array.isArray(this.isAudioPlaying)?this.isAudioPlaying.findIndex(Boolean):-1;if(playingIndex>=0){this.currentAudioIndex=playingIndex;}}const idx=typeof this.currentAudioIndex==="number"&&this.currentAudioIndex>=0?this.currentAudioIndex:this.currentlyPlayingIndex;if(!this.isAudioPlaying[idx]){this.stopHighlightLoop();return;}this.updateHighlightFrame();this._highlightRafId=requestAnimationFrame(step);};this._highlightRafId=requestAnimationFrame(step);},stopHighlightLoop(){if(this._highlightRafId){cancelAnimationFrame(this._highlightRafId);this._highlightRafId=null;}this._lastHighlightIndex=-1;this.clearActiveWordHighlight();},updateHighlightFrame(){const audio=this.currentlyPlaying;if(!audio)return;const duration=audio.duration||0;if(!duration||!isFinite(duration))return;if(typeof this.currentAudioIndex!=="number"||this.currentAudioIndex<0){const playingIndex=Array.isArray(this.isAudioPlaying)?this.isAudioPlaying.findIndex(Boolean):-1;if(playingIndex>=0){this.currentAudioIndex=playingIndex;}}const idx=typeof this.currentAudioIndex==="number"&&this.currentAudioIndex>=0?this.currentAudioIndex:this.currentlyPlayingIndex;const ayah=this.filteredAyahs[idx];const wordCount=this.getAyahAudioWordCount(ayah);if(!wordCount)return;const currentTime=audio.currentTime;const lead=this.highlightLeadSeconds||0;const adjustedTime=Math.min(duration,Math.max(0,currentTime+lead));let index=-1;if(Array.isArray(ayah===null||ayah===void 0?void 0:ayah.audioSegments)&&ayah.audioSegments.length){const segments=ayah.audioSegments;let segIndex=this._lastSegmentIndex;if(segIndex>=0&&segIndex<segments.length){const seg=segments[segIndex];if(seg&&adjustedTime>=seg.start&&adjustedTime<seg.end){index=seg.wordIndex;}}if(index===-1){if(segIndex<0)segIndex=0;if(segments[segIndex]&&adjustedTime>=segments[segIndex].end){while(segIndex<segments.length-1&&adjustedTime>=segments[segIndex].end){segIndex+=1;}}else if(segments[segIndex]&&adjustedTime<segments[segIndex].start){while(segIndex>0&&adjustedTime<segments[segIndex].start){segIndex-=1;}}const seg=segments[segIndex]||segments[segments.length-1];if(seg){index=seg.wordIndex;this._lastSegmentIndex=segIndex;}}}else if(this.wordTimings.length===wordCount){index=this.wordTimings.findIndex((t,i,arr)=>{return adjustedTime>=t&&(i===arr.length-1||adjustedTime<arr[i+1]);});}else{index=Math.min(wordCount-1,Math.floor(adjustedTime/duration*wordCount));}if(index===this._lastHighlightIndex)return;this._lastHighlightIndex=index;const targetIndex=this.getHighlightDisplayIndex(ayah,index,wordCount);if(targetIndex==null){this.clearActiveWordHighlight();return;}const displayCount=this.getAyahDisplayWords(ayah).length;const clamped=Math.min(displayCount-1,Math.max(0,targetIndex));this.applyWordHighlight(clamped);},clearActiveWordHighlight(){if(Array.isArray(this._lastHighlightEls)){this._lastHighlightEls.forEach(el=>el.classList.remove("highlighted-word"));}this._lastHighlightEls=[];},applyWordHighlight(wordIndex){const idx=typeof this.currentAudioIndex==="number"&&this.currentAudioIndex>=0?this.currentAudioIndex:this.currentlyPlayingIndex;const card=document.getElementById(`ayah-card-${idx}`);if(!card)return;this.clearActiveWordHighlight();const matches=Array.from(card.querySelectorAll(`.arabic-text [data-word-index="${wordIndex}"]`));if(!matches.length)return;matches.forEach(el=>el.classList.add("highlighted-word"));this._lastHighlightEls=matches;},async onAyahWordClick(item,event){var _event$target5,_event$target5$closes;if(Date.now()<(this.ayahCardSwipeSuppressClickUntil||0)){var _event$preventDefault7,_event$stopPropagatio2;event===null||event===void 0||(_event$preventDefault7=event.preventDefault)===null||_event$preventDefault7===void 0||_event$preventDefault7.call(event);event===null||event===void 0||(_event$stopPropagatio2=event.stopPropagation)===null||_event$stopPropagatio2===void 0||_event$stopPropagatio2.call(event);return;}const wordEl=event===null||event===void 0||(_event$target5=event.target)===null||_event$target5===void 0||(_event$target5$closes=_event$target5.closest)===null||_event$target5$closes===void 0?void 0:_event$target5$closes.call(_event$target5,"[data-word-index]");if(!wordEl)return;if(!this.showWordTranslationTooltip)return;const displayWordIndex=Number(wordEl.getAttribute("data-word-index"));if(!Number.isFinite(displayWordIndex)||displayWordIndex<0)return;event.stopPropagation();await this.seekToAyahWord(item===null||item===void 0?void 0:item.index,item===null||item===void 0?void 0:item.ayah,displayWordIndex);},getAudioWordIndexFromDisplayIndex(ayah,displayWordIndex,audioWordCount){const baseWords=this.getAyahBaseWords(ayah);const introCount=this.getAyahIntroWordCount(ayah,baseWords);const displayCount=this.getAyahDisplayWords(ayah).length;if(displayWordIndex<0||displayWordIndex>=displayCount)return null;if(!introCount)return displayWordIndex;if(displayCount===audioWordCount+introCount){const mapped=displayWordIndex-introCount;return mapped>=0?mapped:null;}return displayWordIndex;},async waitForAyahAudioMetadata(index,timeoutMs=5000){var _this$audioElements3;const audio=(_this$audioElements3=this.audioElements)===null||_this$audioElements3===void 0?void 0:_this$audioElements3[index];if(!audio)return null;if(Number.isFinite(audio.duration)&&audio.duration>0){return audio;}return new Promise(resolve=>{let done=false;const finish=value=>{if(done)return;done=true;cleanup();resolve(value);};const onLoaded=()=>finish(audio);const onError=()=>finish(null);const timer=setTimeout(()=>finish(null),timeoutMs);const cleanup=()=>{clearTimeout(timer);audio.removeEventListener("loadedmetadata",onLoaded);audio.removeEventListener("error",onError);};audio.addEventListener("loadedmetadata",onLoaded,{once:true});audio.addEventListener("error",onError,{once:true});});},getWordSeekTimeFromSegments(segments,audioWordIndex){if(!Array.isArray(segments)||!segments.length)return null;let selected=null;for(let i=0;i<segments.length;i+=1){const seg=segments[i];if(typeof(seg===null||seg===void 0?void 0:seg.wordIndex)!=="number")continue;if(seg.wordIndex<audioWordIndex)continue;if(!selected||seg.wordIndex<selected.wordIndex){selected=seg;}if(seg.wordIndex===audioWordIndex)break;}if(!selected||typeof selected.start!=="number")return null;return Math.max(0,selected.start);},getWordEndTimeFromSegments(segments,audioWordIndex){if(!Array.isArray(segments)||!segments.length)return null;let selected=null;for(let i=0;i<segments.length;i+=1){const seg=segments[i];if(typeof(seg===null||seg===void 0?void 0:seg.wordIndex)!=="number")continue;if(seg.wordIndex<audioWordIndex)continue;if(!selected||seg.wordIndex<selected.wordIndex){selected=seg;}if(seg.wordIndex===audioWordIndex)break;}if(!selected||typeof selected.end!=="number")return null;return Math.max(0,selected.end);},clearWordPreviewStopTimer(){if(this.wordPreviewStopTimer){clearTimeout(this.wordPreviewStopTimer);this.wordPreviewStopTimer=null;}},scheduleWordPreviewStop(index,startTime,endTime,fallbackStep=0.45){var _this$audioElements4;const audio=(_this$audioElements4=this.audioElements)===null||_this$audioElements4===void 0?void 0:_this$audioElements4[index];if(!audio)return;this.clearWordPreviewStopTimer();const safeStart=Number.isFinite(startTime)?startTime:0;const safeEnd=Number.isFinite(endTime)?endTime:safeStart+fallbackStep;const delta=Math.max(0.08,safeEnd-safeStart+0.03);this.wordPreviewStopTimer=setTimeout(()=>{var _this$audioElements5;const active=(_this$audioElements5=this.audioElements)===null||_this$audioElements5===void 0?void 0:_this$audioElements5[index];if(!active)return;active.pause();this.isAudioPlaying[index]=false;this.isAudioLoading[index]=false;this.stopHighlightLoop();this.isSingleWordPreviewActive=false;this.wordPreviewStopTimer=null;},Math.max(80,Math.round(delta/1*1000)));},async seekToAyahWord(index,ayah,displayWordIndex){var _this$filteredAyahs9;if(!Number.isInteger(index)||index<0)return;const targetAyah=ayah||((_this$filteredAyahs9=this.filteredAyahs)===null||_this$filteredAyahs9===void 0?void 0:_this$filteredAyahs9[index]);if(!targetAyah||!targetAyah.audio)return;this.isSingleWordPreviewActive=true;this.showAudioPlayer=false;const audioWordCount=this.getAyahAudioWordCount(targetAyah);if(!audioWordCount)return;const audioWordIndex=this.getAudioWordIndexFromDisplayIndex(targetAyah,displayWordIndex,audioWordCount);if(audioWordIndex==null||audioWordIndex>=audioWordCount)return;if(!this.isAudioPlaying[index]||this.currentlyPlayingIndex!==index){this.playAudio(index,{singleWordPreview:true});}const audio=await this.waitForAyahAudioMetadata(index);if(!audio)return;const duration=Number(audio.duration)||0;if(!duration)return;const segmentStart=this.getWordSeekTimeFromSegments(targetAyah.audioSegments,audioWordIndex);const segmentEnd=this.getWordEndTimeFromSegments(targetAyah.audioSegments,audioWordIndex);let seekTo=segmentStart;if(!Number.isFinite(seekTo)){seekTo=audioWordIndex/audioWordCount*duration;}const maxTime=Math.max(0,duration-0.05);const clampedStart=Math.min(maxTime,Math.max(0,seekTo));audio.currentTime=clampedStart;this.currentAudioIndex=index;this._lastHighlightIndex=-1;this.applyWordHighlight(displayWordIndex);const fallbackStep=duration/Math.max(1,audioWordCount);this.scheduleWordPreviewStop(index,clampedStart,Number.isFinite(segmentEnd)?segmentEnd:null,fallbackStep);},escapeHtml(value){return String(value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");},escapeHtmlAttribute(value){return this.escapeHtml(value).replace(/"/g,"&quot;").replace(/'/g,"&#39;");},mapQuranComTajweedClass(className){const token=String(className||"").trim().toLowerCase();const map={ham_wasl:"h",slnt:"s",ghunnah:"g",idgham_ghunnah:"a",idgham_wo_ghunnah:"u",ikhafa:"f",iqlab:"i",qalqalah:"q",madda_normal:"n",madda_permissible:"p",madda_necessary:"m",madda_obligatory:"o"};return map[token]||"n";},formatTajweedText(value){if(!value)return"";if(/<\s*\/?\s*(tajweed|span)\b/i.test(value)){let _output="";let lastIndex=0;const _stack=[];const tagRegex=/<\/?\s*(tajweed|span)\b[^>]*>/gi;let match;while((match=tagRegex.exec(value))!==null){const between=value.slice(lastIndex,match.index);const _top=_stack.length?_stack[_stack.length-1]:null;if(!_top||_top.type!=="suppress"){_output+=this.escapeHtml(between);}const tag=match[0]||"";if(/^<\s*\/\s*(tajweed|span)/i.test(tag)){if(_stack.length){const last=_stack.pop();if((last===null||last===void 0?void 0:last.type)==="color")_output+="</span>";}}else{const classMatch=tag.match(/class\s*=\s*["']?([a-z0-9_\-\s]+)["']?/i);const rawClass=classMatch!==null&&classMatch!==void 0&&classMatch[1]?classMatch[1].split(/\s+/)[0]:"";const normalized=String(rawClass||"").toLowerCase();if(normalized==="end"){_stack.push({type:"suppress"});}else{const shortClass=this.mapQuranComTajweedClass(rawClass);_output+=`<span class="tajweed tajweed-${this.escapeHtmlAttribute(shortClass)}">`;_stack.push({type:"color",code:shortClass});}}lastIndex=tagRegex.lastIndex;}const remaining=value.slice(lastIndex);const top=_stack.length?_stack[_stack.length-1]:null;if(!top||top.type!=="suppress"){_output+=this.escapeHtml(remaining);}while(_stack.length){const last=_stack.pop();if((last===null||last===void 0?void 0:last.type)==="color")_output+="</span>";}return _output;}let output="";let i=0;const stack=[];while(i<value.length){if(value[i]==="["){const marker=value.slice(i).match(/^\[([a-z]+)(?::\d+)?\[/);if(marker){output+=`<span class="tajweed tajweed-${marker[1]}">`;stack.push(marker[1]);i+=marker[0].length;continue;}const closeIndex=value.indexOf("]",i+1);if(closeIndex!==-1){const inner=value.slice(i+1,closeIndex);output+=this.escapeHtml(inner);i=closeIndex+1;continue;}}if(value[i]==="]"){if(stack.length){output+="</span>";stack.pop();}i+=1;continue;}output+=this.escapeHtml(value[i]);i+=1;}while(stack.length){output+="</span>";stack.pop();}return output;},stopTajweedRuleAudio(){if(this.tajweedRuleStopTimer){clearTimeout(this.tajweedRuleStopTimer);this.tajweedRuleStopTimer=null;}if(this.tajweedRuleExampleAudio){try{if(this.tajweedRuleTimeUpdateHandler){this.tajweedRuleExampleAudio.removeEventListener("timeupdate",this.tajweedRuleTimeUpdateHandler);this.tajweedRuleTimeUpdateHandler=null;}this.tajweedRuleExampleAudio.pause();this.tajweedRuleExampleAudio.currentTime=0;}catch(_){}}this.tajweedPlayingRuleId="";},normalizeArabicForMatch(text=""){return String(text||"").replace(/<[^>]*>/g," ").replace(/\[[a-z]+(?::\d+)?\[/gi,"").replace(/\]/g,"").replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,"").replace(/ـ/g,"").replace(/[إأآٱ]/g,"ا").replace(/ى/g,"ي").replace(/ؤ/g,"و").replace(/ئ/g,"ي").replace(/[^\u0621-\u064A0-9\s]/g," ").replace(/\s+/g," ").trim();},tokenizeArabicForMatch(text=""){const normalized=this.normalizeArabicForMatch(text);return normalized?normalized.split(" "):[];},findTokenSequenceIndex(haystack=[],needle=[]){if(!needle.length||haystack.length<needle.length)return-1;for(let i=0;i<=haystack.length-needle.length;i+=1){let ok=true;for(let j=0;j<needle.length;j+=1){if(haystack[i+j]!==needle[j]){ok=false;break;}}if(ok)return i;}return-1;},getSnippetWordRange(rule,words=[]){const snippet=(rule===null||rule===void 0?void 0:rule.exampleSnippetText)||(rule===null||rule===void 0?void 0:rule.exampleText)||"";const snippetTokens=this.tokenizeArabicForMatch(snippet);if(!snippetTokens.length||!Array.isArray(words)||!words.length)return null;const verseTokens=words.map(word=>this.normalizeArabicForMatch((word===null||word===void 0?void 0:word.text_uthmani)||(word===null||word===void 0?void 0:word.text)||""));const start=this.findTokenSequenceIndex(verseTokens,snippetTokens);if(start<0)return null;const startWord=words[start];const endWord=words[start+snippetTokens.length-1];const startSegIndex=Number.isFinite(startWord===null||startWord===void 0?void 0:startWord.segIndex)?startWord.segIndex:start;const endSegIndex=Number.isFinite(endWord===null||endWord===void 0?void 0:endWord.segIndex)?endWord.segIndex:start+snippetTokens.length-1;return{start:startSegIndex,end:endSegIndex};},getClipTimesFromSegments(segments=[],range=null){if(!range||!Array.isArray(segments)||!segments.length)return null;const relevant=segments.filter(seg=>typeof(seg===null||seg===void 0?void 0:seg.wordIndex)==="number"&&seg.wordIndex>=range.start&&seg.wordIndex<=range.end);if(!relevant.length)return null;const start=Math.max(0,Math.min(...relevant.map(seg=>Number(seg.start)||0)));const end=Math.max(...relevant.map(seg=>Number(seg.end)||0));if(!Number.isFinite(start)||!Number.isFinite(end)||end<=start)return null;return{start,end};},async getTajweedRuleAudioMeta(rule){var _verse$audio,_verse$audio2;const reference=rule===null||rule===void 0?void 0:rule.exampleRef;if(!reference)return null;const reciterId=this.getQuranRecitationId(this.selectedReciter);if(!reciterId)return null;const cacheKey=`${reciterId}:${reference}`;if(this.tajweedRuleAudioMetaCache[cacheKey]){return this.tajweedRuleAudioMetaCache[cacheKey];}const{data}=await this.cachedFetchJSON(`https://api.quran.com/api/v4/verses/by_key/${encodeURIComponent(reference)}?audio=${encodeURIComponent(reciterId)}&words=true`,`cache:tajweed-rule-audio-meta:${cacheKey}`,24*60*60*1000);const verse=(data===null||data===void 0?void 0:data.verse)||null;const relativeUrl=(verse===null||verse===void 0||(_verse$audio=verse.audio)===null||_verse$audio===void 0?void 0:_verse$audio.url)||"";const audioUrl=relativeUrl?`https://audio.qurancdn.com/${relativeUrl}`:"";const segments=Array.isArray(verse===null||verse===void 0||(_verse$audio2=verse.audio)===null||_verse$audio2===void 0?void 0:_verse$audio2.segments)?verse.audio.segments.filter(seg=>Array.isArray(seg)&&seg.length>=4).map((seg,index)=>({// Use relative word order for snippet clipping; absolute segment ids vary by edition.
wordIndex:index,start:seg[2]/1000,end:seg[3]/1000})):[];const words=Array.isArray(verse===null||verse===void 0?void 0:verse.words)?verse.words.map((word,index)=>({word,index})).filter(entry=>{var _entry$word;return((_entry$word=entry.word)===null||_entry$word===void 0?void 0:_entry$word.char_type_name)==="word";}).map((entry,filteredIndex)=>_objectSpread(_objectSpread({},entry.word),{},{segIndex:filteredIndex})):[];const meta={audioUrl,segments,words};this.tajweedRuleAudioMetaCache[cacheKey]=meta;return meta;},async loadTajweedRuleVerse(rule){const reference=rule===null||rule===void 0?void 0:rule.exampleRef;if(!reference)return null;if(this.tajweedRuleVerseCache[reference]){return this.tajweedRuleVerseCache[reference];}this.tajweedRuleVerseLoading=_objectSpread(_objectSpread({},this.tajweedRuleVerseLoading),{},{[reference]:true});try{const{data}=await this.cachedFetchJSON(`https://api.quran.com/api/v4/verses/by_key/${encodeURIComponent(reference)}?fields=text_uthmani,text_uthmani_tajweed`,`cache:tajweed-rule-verse:${reference}`,7*24*60*60*1000);const verse=(data===null||data===void 0?void 0:data.verse)||null;if(verse){this.tajweedRuleVerseCache=_objectSpread(_objectSpread({},this.tajweedRuleVerseCache),{},{[reference]:verse});}return verse;}catch(_){return null;}finally{const nextLoading=_objectSpread({},this.tajweedRuleVerseLoading);delete nextLoading[reference];this.tajweedRuleVerseLoading=nextLoading;}},async preloadTajweedRuleVerses(){const rules=Array.isArray(this.tajweedMainRules)?this.tajweedMainRules.slice(0,6):[];await Promise.allSettled(rules.map(rule=>this.loadTajweedRuleVerse(rule)));},async getTajweedRuleAudioUrl(rule){const meta=await this.getTajweedRuleAudioMeta(rule);return(meta===null||meta===void 0?void 0:meta.audioUrl)||"";},async toggleTajweedRuleAudio(rule){if(!(rule!==null&&rule!==void 0&&rule.id))return;if(this.tajweedPlayingRuleId===rule.id&&this.tajweedRuleExampleAudio){this.stopTajweedRuleAudio();return;}this.stopTajweedRuleAudio();if(this.currentlyPlaying&&this.currentlyPlaying.pause){try{this.currentlyPlaying.pause();}catch(_){}}this.tajweedLoadingRuleId=rule.id;try{const meta=await this.getTajweedRuleAudioMeta(rule);const audioUrl=(meta===null||meta===void 0?void 0:meta.audioUrl)||"";if(!audioUrl)return;if(!this.tajweedRuleExampleAudio){this.tajweedRuleExampleAudio=new Audio();}const audio=this.tajweedRuleExampleAudio;audio.src=audioUrl;audio.currentTime=0;audio.playbackRate=0.9;audio.onended=()=>{this.tajweedPlayingRuleId="";};await audio.play();const range=this.getSnippetWordRange(rule,(meta===null||meta===void 0?void 0:meta.words)||[]);const clip=this.getClipTimesFromSegments((meta===null||meta===void 0?void 0:meta.segments)||[],range);if(clip){audio.currentTime=clip.start;this.tajweedRuleTimeUpdateHandler=()=>{if(audio.currentTime>=clip.end){this.stopTajweedRuleAudio();}};audio.addEventListener("timeupdate",this.tajweedRuleTimeUpdateHandler);const durationMs=Math.max(120,(clip.end-clip.start+0.05)/audio.playbackRate*1000);this.tajweedRuleStopTimer=setTimeout(()=>{this.stopTajweedRuleAudio();},durationMs);}this.tajweedPlayingRuleId=rule.id;}catch(_){this.tajweedPlayingRuleId="";}finally{this.tajweedLoadingRuleId="";}},// removed bulk initialization and preloading for performance
playAudio:function(index,options={}){var _this$surahDetails46;const isSingleWordPreview=!!options.singleWordPreview;const isPlaylistSinglePlay=!!options.playlistSinglePlay;const hideAudioPlayer=!!options.hideAudioPlayer;console.log("Attempting to play audio for index:",index);if(index<0||index>=this.filteredAyahs.length)return;this.stopTajweedRuleAudio();this.ayahCardPausedIndex=null;if(!isSingleWordPreview){this.isSingleWordPreviewActive=false;}if(hideAudioPlayer){this.showAudioPlayer=false;this.showAudioPlayerQueuePanel=false;}this.playlistSinglePlayMode=isPlaylistSinglePlay;this.clearWordPreviewStopTimer();this._lastHighlightIndex=-1;this._lastSegmentIndex=-1;this.clearActiveWordHighlight();// Defer showing loading spinner to avoid flicker; only show if slow (>200ms)
clearTimeout(this.loadingTimers[index]);this.loadingTimers[index]=setTimeout(()=>{this.$set?this.$set(this.isAudioLoading,index,true):this.isAudioLoading[index]=true;},200);// Stop any currently playing audio and ensure exclusivity
if(this.currentlyPlaying&&this.currentlyPlaying!==this.audioElements[index]){console.log("Pausing currently playing audio");try{this.currentlyPlaying.pause();}catch(_){}try{this.currentlyPlaying.currentTime=0;}catch(_){}}// Pause any stray audios just in case
if(Array.isArray(this.audioElements)){this.audioElements.forEach((a,i)=>{if(a&&i!==index){try{a.pause();}catch(_){}}});}// Build or update audio element on-demand
const ayah=this.filteredAyahs[index];let audio=this.audioElements[index];if(!audio){audio=new Audio();audio.preload="auto";this.audioElements[index]=audio;}audio.onended=()=>this.handleAyahEnd(index);audio.onerror=e=>{var _this$$toast2;console.error(`Audio error for ayah ${index+1}:`,e);clearTimeout(this.loadingTimers[index]);this.isAudioLoading[index]=false;this.isAudioPlaying[index]=false;(_this$$toast2=this.$toast)===null||_this$$toast2===void 0||_this$$toast2.error(`Failed to load audio for ayah ${index+1}`);};if(audio.src!==ayah.audio){try{audio.pause();}catch(_){}audio.src=ayah.audio||"";}audio.playbackRate=Number(this.playbackSpeed)||1;audio.volume=this.volume;// Update playing states
this.isAudioPlaying=this.isAudioPlaying.map((_,i)=>i===index);this.currentlyPlaying=audio;this.currentlyPlayingIndex=index;this.currentAudioIndex=index;this.isHighlighted=true;this.persistContinueProgress({surahNumber:Number(((_this$surahDetails46=this.surahDetails)===null||_this$surahDetails46===void 0?void 0:_this$surahDetails46.surahNumber)||this.selectedSurah),ayahNumber:Number((ayah===null||ayah===void 0?void 0:ayah.numberInSurah)||(ayah===null||ayah===void 0?void 0:ayah.number)||index+1),mode:"listening"});// Setup metadata and word timing
audio.onloadedmetadata=()=>{console.log(`Metadata loaded for ayah ${index+1}, duration: ${this.currentlyPlaying.duration}`);this.updateWordTimings(ayah,this.currentlyPlaying.duration);};audio.ontimeupdate=()=>{const now=window.performance?performance.now():Date.now();if(now-this.lastProgressAt>100){// ~10fps progress updates
this.lastProgressAt=now;this.updateProgress(index);}// Removed continuous auto-scroll here to prevent jumpiness.
};// Optimistic immediate play, fallback to 'canplay' (faster than 'canplaythrough')
const markPlaying=()=>{clearTimeout(this.loadingTimers[index]);this.isAudioPlaying[index]=true;this.isAudioLoading[index]=false;this.isHighlighted=true;this.showAudioPlayer=this.bottomAudioPlayerEnabled&&this.isAudioPlayerVisible&&!isSingleWordPreview&&!hideAudioPlayer;if(this.showRealtimeHighlighting){this.startHighlightLoop();}else{this.stopHighlightLoop();}this.animateVisualizer();// Opportunistically warm next ayah
this.prepareNextAudio(index+1);};const tryPlay=()=>{const p=audio.play();if(p&&typeof p.then==="function"){p.then(()=>{markPlaying();}).catch(err=>{// If playback fails (e.g., not enough data), wait for 'canplay' and retry once
const onCanPlay=()=>{audio.removeEventListener("canplay",onCanPlay);const p2=audio.play();if(p2&&typeof p2.then==="function"){p2.then(()=>markPlaying()).catch(()=>{});}else{markPlaying();}};audio.addEventListener("canplay",onCanPlay,{once:true});});}else{markPlaying();}};tryPlay();},pauseAudio:function(index){if(this.audioElements[index]){console.log(`Pausing audio for ayah ${index+1}`);this.clearWordPreviewStopTimer();this.isSingleWordPreviewActive=false;this.audioElements[index].pause();clearTimeout(this.loadingTimers[index]);this.isAudioPlaying[index]=false;this.isAudioLoading[index]=false;this.stopHighlightLoop();}},toggleAudioPlayer:function(index){console.log("Toggling audio player for index:",index);if(!this.isAudioPlaying[index]){if(this.isMemorisationToolbarVisible&&this.memorisationRepetitionCount>1&&!this.isAnyAudioPlaying){this.memorisationRepetitionCurrent=1;}this.playAudio(index);}else{this.pauseAudio(index);}},stopAudio:function(index){this.clearWordPreviewStopTimer();this.isSingleWordPreviewActive=false;if(this.countdownInterval){clearInterval(this.countdownInterval);this.countdownInterval=null;this.isCountdownActive=false;this.countdownSeconds=0;}if(this.memorisationRepetitionPauseTimeout){clearTimeout(this.memorisationRepetitionPauseTimeout);this.memorisationRepetitionPauseTimeout=null;}if(this.audioElements[index]){console.log(`Stopping audio for ayah ${index+1}`);this.audioElements[index].pause();this.audioElements[index].currentTime=0;clearTimeout(this.loadingTimers[index]);this.isAudioPlaying[index]=false;this.isAudioLoading[index]=false;this.progress[index]=0;this.isHighlighted=false;this.currentAudioIndex=-1;this.stopHighlightLoop();}},rewindAudio:function(index){const targetIndex=this.resolveSeekAudioIndex(index);if(targetIndex<0||!this.audioElements[targetIndex])return;console.log(`Rewinding audio for ayah ${targetIndex+1}`);this.audioElements[targetIndex].currentTime=Math.max(0,this.audioElements[targetIndex].currentTime-15);this.updateProgress(targetIndex);// removed auto-scroll on rewind
},fastForwardAudio:function(index){const targetIndex=this.resolveSeekAudioIndex(index);if(targetIndex<0||!this.audioElements[targetIndex])return;console.log(`Fast forwarding audio for ayah ${targetIndex+1}`);const duration=Number(this.audioElements[targetIndex].duration)||0;this.audioElements[targetIndex].currentTime=Math.min(duration>0?duration:this.audioElements[targetIndex].currentTime+20,this.audioElements[targetIndex].currentTime+20);this.updateProgress(targetIndex);// removed auto-scroll on fast-forward
},resolveSeekAudioIndex(index){const requestedIndex=Number(index);if(Number.isInteger(requestedIndex)&&requestedIndex>=0&&this.audioElements[requestedIndex]){return requestedIndex;}const activeIndex=Number(this.currentAudioIndex);if(Number.isInteger(activeIndex)&&activeIndex>=0&&this.audioElements[activeIndex]){return activeIndex;}const playingIndex=Number(this.currentlyPlayingIndex);if(Number.isInteger(playingIndex)&&playingIndex>=0&&this.audioElements[playingIndex]){return playingIndex;}return-1;},// Prepare next audio element to reduce start latency on next ayah
prepareNextAudio(nextIndex){if(nextIndex==null||nextIndex>=this.filteredAyahs.length)return;const nextAyah=this.filteredAyahs[nextIndex];if(!nextAyah||!nextAyah.audio)return;let a=this.audioElements[nextIndex];if(!a){a=new Audio();a.preload="metadata";this.audioElements[nextIndex]=a;}if(a.src!==nextAyah.audio){try{a.pause();}catch(_){}a.src=nextAyah.audio;try{a.load();}catch(_){}}a.volume=this.volume;a.playbackRate=Number(this.playbackSpeed)||1;},updateProgress:function(index){if(this.audioElements[index]&&this.audioElements[index].duration){const progress=this.audioElements[index].currentTime/this.audioElements[index].duration*100;this.progress[index]=Math.min(100,progress);}},formatTime:function(seconds){const minutes=Math.floor(seconds/60);const secs=Math.floor(seconds%60);return(minutes<10?"0":"")+minutes+":"+(secs<10?"0":"")+secs;},highlightText(text){if(!this.debouncedQuery.trim())return text;let highlightedText=text;const escapeRegExp=string=>{return string.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");};const searchTerms=this.debouncedQuery.trim()?this.debouncedQuery.trim().split(/\s+/):[];searchTerms.forEach(term=>{const regex=new RegExp(`(${escapeRegExp(term)})`,"gi");highlightedText=highlightedText.replace(regex,'<span class="highlight-search">$1</span>');});return highlightedText;},toggleVisibility:function(){this.isVisible=!this.isVisible;},increaseFontSize:function(){if(this.arabicFontSize<40)this.arabicFontSize+=2;if(this.translationFontSize<30)this.translationFontSize+=2;},decreaseFontSize:function(){if(this.arabicFontSize>16)this.arabicFontSize-=2;if(this.translationFontSize>12)this.translationFontSize-=2;},buildTranslationLazyCacheKey(surahNumber=this.selectedSurah,translationId=this.selectedTranslation){const surah=String(surahNumber||"").trim();const translation=String(translationId||"").trim();if(!surah||!translation)return"";return`${surah}:${translation}`;},setTranslationLazyState(patch={}){const current=this.translationLazyState&&typeof this.translationLazyState==="object"?this.translationLazyState:{};this.translationLazyState=_objectSpread({surahNumber:String(current.surahNumber||""),translationId:String(current.translationId||""),loaded:!!current.loaded,loading:!!current.loading,error:String(current.error||"")},patch);},resetAyahTranslationsForLazyLoad(){if(!this.surahDetails||!Array.isArray(this.surahDetails.ayahs)||!this.surahDetails.ayahs.length){return;}this.surahDetails.ayahs.forEach(ayah=>{if(!ayah||typeof ayah!=="object")return;ayah.translation="";ayah.lowerTranslation="";});},extractTranslationAyahsFromPayload(payload,translationId=""){var _payload$data3;if(Array.isArray(payload===null||payload===void 0?void 0:payload.data)){const editions=payload.data;const byIdentifier=editions.find(entry=>{var _entry$edition;return String((entry===null||entry===void 0||(_entry$edition=entry.edition)===null||_entry$edition===void 0?void 0:_entry$edition.identifier)||"")===String(translationId||"");});const fallback=editions.find(entry=>Array.isArray(entry===null||entry===void 0?void 0:entry.ayahs));return Array.isArray(byIdentifier===null||byIdentifier===void 0?void 0:byIdentifier.ayahs)?byIdentifier.ayahs:Array.isArray(fallback===null||fallback===void 0?void 0:fallback.ayahs)?fallback.ayahs:[];}if(Array.isArray(payload===null||payload===void 0||(_payload$data3=payload.data)===null||_payload$data3===void 0?void 0:_payload$data3.ayahs)){return payload.data.ayahs;}return[];},applyLazyTranslationToCurrentSurah(translationAyahs=[],{surahNumber=this.selectedSurah,translationId=this.selectedTranslation}={}){var _this$surahDetails47;if(!Array.isArray(translationAyahs)||!this.surahDetails||!Array.isArray(this.surahDetails.ayahs)){return;}const activeSurah=String(((_this$surahDetails47=this.surahDetails)===null||_this$surahDetails47===void 0?void 0:_this$surahDetails47.surahNumber)||this.selectedSurah||"");if(activeSurah!==String(surahNumber||"")){return;}this.surahDetails.ayahs.forEach((ayah,index)=>{var _translationAyahs$ind;if(!ayah||typeof ayah!=="object")return;const translated=translationAyahs===null||translationAyahs===void 0||(_translationAyahs$ind=translationAyahs[index])===null||_translationAyahs$ind===void 0?void 0:_translationAyahs$ind.text;if(typeof translated!=="string"||!translated.trim()){ayah.translation=ayah.translation||"";ayah.lowerTranslation=String(ayah.translation||"").toLowerCase();return;}ayah.translation=translated;ayah.lowerTranslation=translated.toLowerCase();});this.setTranslationLazyState({surahNumber:String(surahNumber||""),translationId:String(translationId||""),loaded:true,loading:false,error:""});this.itemHeightCalibrated=false;this.$nextTick(()=>this.scheduleHeightCalibration(true));},shouldLoadTranslationLazily(){if(this.isTranslationVisible)return true;const hasLocalVisibilityOverride=Object.values(this.translationVisibility||{}).some(Boolean);if(hasLocalVisibilityOverride)return true;return!!String(this.debouncedQuery||"").trim();},async fetchSurahTranslationLazy({surahNumber=this.selectedSurah,translationId=this.selectedTranslation,force=false}={}){var _this$surahDetails48;const targetSurah=String(surahNumber||"").trim();const targetTranslation=String(translationId||"").trim();if(!targetSurah||!targetTranslation||this._isDestroyed){return null;}const activeSurah=String(((_this$surahDetails48=this.surahDetails)===null||_this$surahDetails48===void 0?void 0:_this$surahDetails48.surahNumber)||this.selectedSurah||"");if(!activeSurah||activeSurah!==targetSurah)return null;const state=this.translationLazyState||{};if(!force&&state.loaded&&!state.loading&&String(state.surahNumber||"")===targetSurah&&String(state.translationId||"")===targetTranslation){var _this$surahDetails49;return((_this$surahDetails49=this.surahDetails)===null||_this$surahDetails49===void 0?void 0:_this$surahDetails49.ayahs)||null;}if(!force&&!state.loading&&String(state.surahNumber||"")===targetSurah&&String(state.translationId||"")===targetTranslation&&String(state.error||"").trim()){return null;}const cacheKey=this.buildTranslationLazyCacheKey(targetSurah,targetTranslation);const cached=cacheKey?this.translationLazyCache[cacheKey]:null;if(!force&&Array.isArray(cached===null||cached===void 0?void 0:cached.ayahs)&&cached.ayahs.length){this.applyLazyTranslationToCurrentSurah(cached.ayahs,{surahNumber:targetSurah,translationId:targetTranslation});return cached.ayahs;}const requestToken=Number(this.translationLazyRequestToken||0)+1;this.translationLazyRequestToken=requestToken;this.setTranslationLazyState({surahNumber:targetSurah,translationId:targetTranslation,loaded:false,loading:true,error:""});const fallbackEndpoints=[{url:`https://api.alquran.cloud/v1/surah/${targetSurah}/${targetTranslation}`,cacheKey:`cache:surah-translation:${targetSurah}:${targetTranslation}`},{url:`https://api.alquran.cloud/v1/surah/${targetSurah}/editions/${targetTranslation}`,cacheKey:`cache:surah-translation-editions:${targetSurah}:${targetTranslation}`}];let translationAyahs=[];let lastError=null;for(const endpoint of fallbackEndpoints){try{const{data}=await this.cachedFetchJSON(endpoint.url,endpoint.cacheKey,7*24*60*60*1000);translationAyahs=this.extractTranslationAyahsFromPayload(data,targetTranslation);if(translationAyahs.length)break;}catch(error){lastError=error;}}if(requestToken!==this.translationLazyRequestToken)return null;if(translationAyahs.length){if(cacheKey){this.translationLazyCache[cacheKey]={cachedAt:Date.now(),ayahs:translationAyahs};}this.applyLazyTranslationToCurrentSurah(translationAyahs,{surahNumber:targetSurah,translationId:targetTranslation});return translationAyahs;}this.setTranslationLazyState({surahNumber:targetSurah,translationId:targetTranslation,loaded:false,loading:false,error:this.translationUnavailableText});if(lastError){console.warn("Unable to lazy load translation:",lastError);}return null;},maybeLoadTranslationForVisibleContent(options={}){const{force=false}=options;if(!force&&!this.shouldLoadTranslationLazily()){return Promise.resolve(null);}return this.fetchSurahTranslationLazy({force});},getTranslationText(item){var _item$ayah,_this$translationLazy2,_this$translationLazy3;const text=String((item===null||item===void 0||(_item$ayah=item.ayah)===null||_item$ayah===void 0?void 0:_item$ayah.translation)||"").trim();if(text)return text;if((_this$translationLazy2=this.translationLazyState)!==null&&_this$translationLazy2!==void 0&&_this$translationLazy2.loading){return this.translationLoadingText;}if((_this$translationLazy3=this.translationLazyState)!==null&&_this$translationLazy3!==void 0&&_this$translationLazy3.error){return this.translationLazyState.error;}return this.translationUnavailableText;},getTafsirVisibilityKey(item){var _this$surahDetails50;if(!item||!item.ayah)return"";return this.buildAyahKey((_this$surahDetails50=this.surahDetails)===null||_this$surahDetails50===void 0?void 0:_this$surahDetails50.surahNumber,item.ayah.numberInSurah||item.ayah.number);},isTafsirVisibleFor(item){const key=this.getTafsirVisibilityKey(item);if(!key)return false;return!!this.tafsirVisibility[key];},isTafsirLoadingFor(item){const key=this.getTafsirVisibilityKey(item);if(!key)return false;return!!this.tafsirLoading[key];},getTafsirErrorFor(item){const key=this.getTafsirVisibilityKey(item);if(!key)return"";return String(this.tafsirError[key]||"");},getTafsirTextFor(item){const key=this.getTafsirVisibilityKey(item);if(!key)return"";return String(this.tafsirContent[key]||"");},isTafsirModalOpenFor(item){if(!this.isTafsirModalOpen)return false;const key=this.getTafsirVisibilityKey(item);return!!key&&key===this.tafsirModalAyahKey;},getTafsirReferenceForItem(item){var _this$surahDetails51,_item$ayah2,_item$ayah3;const surahNumber=Number(((_this$surahDetails51=this.surahDetails)===null||_this$surahDetails51===void 0?void 0:_this$surahDetails51.surahNumber)||this.selectedSurah||0);const ayahNumber=Number((item===null||item===void 0||(_item$ayah2=item.ayah)===null||_item$ayah2===void 0?void 0:_item$ayah2.numberInSurah)||(item===null||item===void 0||(_item$ayah3=item.ayah)===null||_item$ayah3===void 0?void 0:_item$ayah3.number)||0);if(!surahNumber||!ayahNumber)return"";return`Surah ${surahNumber}, Ayah ${ayahNumber}`;},getActiveTafsirKey(){return String(this.tafsirModalAyahKey||"");},isActiveTafsirLoading(){const key=this.getActiveTafsirKey();if(!key)return false;return!!this.tafsirLoading[key];},getActiveTafsirError(){const key=this.getActiveTafsirKey();if(!key)return"";return String(this.tafsirError[key]||"");},getActiveTafsirText(){const key=this.getActiveTafsirKey();if(!key)return"";return String(this.tafsirContent[key]||"");},getActiveTafsirMeta(){const key=this.getActiveTafsirKey();if(!key)return null;const value=this.tafsirMeta[key];return value&&typeof value==="object"?value:null;},getActiveTafsirSourceLabel(){var _this$getActiveTafsir;return((_this$getActiveTafsir=this.getActiveTafsirMeta())===null||_this$getActiveTafsir===void 0?void 0:_this$getActiveTafsir.source)||"Scholarly tafsir source";},getActiveTafsirProofLabel(){var _this$getActiveTafsir2;const key=this.getActiveTafsirKey();return((_this$getActiveTafsir2=this.getActiveTafsirMeta())===null||_this$getActiveTafsir2===void 0?void 0:_this$getActiveTafsir2.proof)||(key?`Matched to ayah key ${key}`:"Ayah mapping unavailable");},getActiveTafsirReferenceLabel(){var _this$getActiveTafsir3;return((_this$getActiveTafsir3=this.getActiveTafsirMeta())===null||_this$getActiveTafsir3===void 0?void 0:_this$getActiveTafsir3.reference)||this.tafsirModalReference||this.getActiveTafsirKey()||"N/A";},openAyahTafsirModal(item){const key=this.getTafsirVisibilityKey(item);if(!key)return;this.tafsirModalAyahKey=key;this.tafsirModalReference=this.getTafsirReferenceForItem(item);this.isTafsirModalOpen=true;if(typeof this.$set==="function"){this.$set(this.tafsirVisibility,key,true);}else{this.tafsirVisibility[key]=true;}this.loadTafsirForItem(item);this.$nextTick(()=>{const modalEl=document.getElementById(this.tafsirModalId);if(!modalEl)return;this.tafsirModalInstance=bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl)||new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(modalEl);this.tafsirModalInstance.show();});},hideAyahTafsirModal(options={}){const{reset=false}=options;if(this.tafsirModalInstance){try{this.tafsirModalInstance.hide();}catch(_){// ignore modal hide errors
}}if(reset){this.isTafsirModalOpen=false;this.tafsirModalAyahKey="";this.tafsirModalReference="";}},resolveTafsirAyahId(ayah){const direct=Number((ayah===null||ayah===void 0?void 0:ayah.globalNumber)||(ayah===null||ayah===void 0?void 0:ayah.ayahId)||0);if(direct>0)return direct;const fallback=Number((ayah===null||ayah===void 0?void 0:ayah.number)||0);return fallback>0?fallback:null;},normalizeTafsirPayload(value,item=null){let text="";let source="";let proof="";let reference="";if(typeof value==="string"){text=value;}else if(value&&typeof value==="object"){var _value$data,_value$data2,_value$data3,_value$data4,_value$data5,_value$data6,_value$data7,_value$data8,_value$data9;const textCandidates=[value.tafseer,value.tafsir,value.text,(_value$data=value.data)===null||_value$data===void 0?void 0:_value$data.tafseer,(_value$data2=value.data)===null||_value$data2===void 0?void 0:_value$data2.tafsir,(_value$data3=value.data)===null||_value$data3===void 0?void 0:_value$data3.text];for(const candidate of textCandidates){if(typeof candidate==="string"&&candidate.trim()){text=candidate;break;}}const sourceCandidates=[value.source,value.source_label,value.tafsir_source,(_value$data4=value.data)===null||_value$data4===void 0?void 0:_value$data4.source,(_value$data5=value.data)===null||_value$data5===void 0?void 0:_value$data5.source_label];for(const candidate of sourceCandidates){if(typeof candidate==="string"&&candidate.trim()){source=candidate.trim();break;}}const proofCandidates=[value.proof,value.provenance,(_value$data6=value.data)===null||_value$data6===void 0?void 0:_value$data6.proof,(_value$data7=value.data)===null||_value$data7===void 0?void 0:_value$data7.provenance];for(const candidate of proofCandidates){if(typeof candidate==="string"&&candidate.trim()){proof=candidate.trim();break;}}const referenceCandidates=[value.reference,value.verse_reference,value.verse_key,(_value$data8=value.data)===null||_value$data8===void 0?void 0:_value$data8.reference,(_value$data9=value.data)===null||_value$data9===void 0?void 0:_value$data9.verse_reference];for(const candidate of referenceCandidates){if(typeof candidate==="string"&&candidate.trim()){reference=candidate.trim();break;}}}const fallbackReference=this.getTafsirReferenceForItem(item)||this.tafsirModalReference||this.getActiveTafsirKey();const normalizedText=this.formatTafsirText(text);const resolvedReference=reference||fallbackReference||"";const resolvedSource=source||"Scholarly tafsir source";const resolvedProof=proof||(resolvedReference?`Matched to ${resolvedReference}`:"Matched to ayah key");return{text:normalizedText,meta:{source:resolvedSource,proof:resolvedProof,reference:resolvedReference}};},formatTafsirText(rawText){let text=String(rawText||"");if(!text.trim())return"";// Keep line breaks from HTML payloads while stripping tags.
text=text.replace(/<br\s*\/?>/gi,"\n").replace(/<\/p>/gi,"\n\n").replace(/<[^>]+>/g," ").replace(/&nbsp;/gi," ").replace(/&amp;/gi,"&").replace(/\r\n?/g,"\n").replace(/[ \t]+/g," ").replace(/\s*\n\s*/g,"\n").replace(/\n{3,}/g,"\n\n").trim();// Improve readability for terse/classical run-on tafsir records.
text=text.replace(/\s+(in other words)\b/gi,". $1").replace(/\s+(that is to say)\b/gi,". $1").replace(/\s+(for example)\b/gi,". $1").replace(/\s+(for instance)\b/gi,". $1").replace(/\b(noon|night|day)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+(q(?:(?![\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uD800-\uDFFF\uFEFF])[^]|[\uD800-\uDBFF][\uDC00-\uDFFF])+)/gi,"$1. $2").replace(/([.!?])\s+(?=[A-Z“"‘'])/g,"$1\n\n").replace(/([!\.\?][\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+)q([a-z\u0101\u017F\u212A])/gi,"$1Q$2").replace(/\bthat is\s+/gi,"that is, ").replace(/\bnamely\s+/gi,"namely, ").replace(/\bmeaning\s+/gi,"meaning ");// Add soft line breaks for very long unbroken statements.
const paragraphs=text.split(/\n{2,}/).map(paragraph=>this.wrapLongTafsirParagraph(paragraph)).filter(Boolean);return paragraphs.join("\n\n").replace(/(^|\n)in other words\b/gm,"$1In other words").replace(/\bIn other words\b/g,"In other words,");},wrapLongTafsirParagraph(paragraph){const cleaned=String(paragraph||"").trim();if(!cleaned)return"";const words=cleaned.split(/\s+/);if(words.length<=70)return cleaned;const chunks=[];let bucket=[];for(let index=0;index<words.length;index+=1){const word=words[index];const nextWord=words[index+1]||"";bucket.push(word);const punctuationBreak=/[.!?;:]$/.test(word)&&bucket.length>=28;const connectorBreak=bucket.length>=62&&/^(and|or|but|while|however|therefore|thus|so|then|whereas)$/i.test(nextWord);const hardBreak=bucket.length>=78;if(punctuationBreak||connectorBreak||hardBreak){chunks.push(bucket.join(" ").trim());bucket=[];}}if(bucket.length){chunks.push(bucket.join(" ").trim());}return chunks.filter(Boolean).join("\n");},async loadTafsirForItem(item){const key=this.getTafsirVisibilityKey(item);if(!key||!(item!==null&&item!==void 0&&item.ayah))return;if(this.tafsirContent[key])return;const ayahId=this.resolveTafsirAyahId(item.ayah);if(!ayahId){this.tafsirError[key]="Tafsir is unavailable for this ayah.";return;}if(typeof this.$set==="function"){this.$set(this.tafsirLoading,key,true);this.$set(this.tafsirError,key,"");}else{this.tafsirLoading[key]=true;this.tafsirError[key]="";}try{const response=await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`/tafseer/${ayahId}/fetch`,{params:{detailed:1}});const normalized=this.normalizeTafsirPayload(response===null||response===void 0?void 0:response.data,item);if(!(normalized!==null&&normalized!==void 0&&normalized.text)){throw new Error("Empty tafsir payload");}if(typeof this.$set==="function"){this.$set(this.tafsirContent,key,normalized.text);this.$set(this.tafsirMeta,key,normalized.meta||{});}else{this.tafsirContent[key]=normalized.text;this.tafsirMeta[key]=normalized.meta||{};}}catch(error){if(typeof this.$set==="function"){this.$set(this.tafsirError,key,"Tafsir is temporarily unavailable.");}else{this.tafsirError[key]="Tafsir is temporarily unavailable.";}}finally{if(typeof this.$set==="function"){this.$set(this.tafsirLoading,key,false);}else{this.tafsirLoading[key]=false;}this.itemHeightCalibrated=false;this.$nextTick(()=>this.scheduleHeightCalibration(true));}},toggleAyahTafsir(item){this.openAyahTafsirModal(item);},getTranslationVisibilityKey(item){var _this$surahDetails52;if(!item||!item.ayah)return"";return this.buildAyahKey((_this$surahDetails52=this.surahDetails)===null||_this$surahDetails52===void 0?void 0:_this$surahDetails52.surahNumber,item.ayah.numberInSurah||item.ayah.number);},isTranslationVisibleFor(item){const key=this.getTranslationVisibilityKey(item);if(!key)return true;const value=this.translationVisibility[key];if(value===undefined)return this.isTranslationVisible;return!!value;},setTranslationVisibleFor(item,value){const key=this.getTranslationVisibilityKey(item);if(!key)return;if(typeof this.$set==="function"){this.$set(this.translationVisibility,key,!!value);}else{this.translationVisibility[key]=!!value;}this.itemHeightCalibrated=false;this.$nextTick(()=>this.scheduleHeightCalibration(true));},onTranslationToggle(item,event){const checked=!!event.target.checked;this.setTranslationVisibleFor(item,checked);if(checked){this.maybeLoadTranslationForVisibleContent({force:true});}},applyGlobalTextVisibility({translation=this.isTranslationVisible,transliteration=this.isTransliterationVisible}={}){this.isTranslationVisible=!!translation;this.isTransliterationVisible=!!transliteration;this.translationVisibility={};this.transliterationVisibility={};if(this.isTranslationVisible){this.maybeLoadTranslationForVisibleContent({force:true});}this.itemHeightCalibrated=false;this.$nextTick(()=>this.scheduleHeightCalibration(true));},getTransliterationVisibilityKey(item){var _this$surahDetails53;if(!item||!item.ayah)return"";return this.buildAyahKey((_this$surahDetails53=this.surahDetails)===null||_this$surahDetails53===void 0?void 0:_this$surahDetails53.surahNumber,item.ayah.numberInSurah||item.ayah.number);},isTransliterationVisibleFor(item){const key=this.getTransliterationVisibilityKey(item);if(!key)return true;const value=this.transliterationVisibility[key];if(value===undefined)return this.isTransliterationVisible;return!!value;},setTransliterationVisibleFor(item,value){const key=this.getTransliterationVisibilityKey(item);if(!key)return;if(typeof this.$set==="function"){this.$set(this.transliterationVisibility,key,!!value);}else{this.transliterationVisibility[key]=!!value;}this.itemHeightCalibrated=false;this.$nextTick(()=>this.scheduleHeightCalibration(true));},onTransliterationToggle(item,event){const checked=!!event.target.checked;this.setTransliterationVisibleFor(item,checked);},toggleMobileToolbarExpanded(){this.isMobileToolbarExpanded=!this.isMobileToolbarExpanded;this.announce(this.isMobileToolbarExpanded?"Expanded mobile toolbar controls.":"Collapsed mobile toolbar controls.");},toggleToolbarTranslation(){const checked=!this.isTranslationAllEnabled;this.applyGlobalTextVisibility({translation:checked,transliteration:this.isTransliterationAllEnabled});if(checked){this.maybeLoadTranslationForVisibleContent({force:true});}this.announce(checked?"Translation enabled for all ayahs.":"Translation disabled for all ayahs.");this.showModeToggleToast("Translation",checked);},toggleToolbarTransliteration(){const checked=!this.isTransliterationAllEnabled;this.applyGlobalTextVisibility({translation:this.isTranslationAllEnabled,transliteration:checked});this.announce(checked?"Transliteration enabled for all ayahs.":"Transliteration disabled for all ayahs.");this.showModeToggleToast("Transliteration",checked);},setDeepFocusMode(enabled,options={}){const{announce=true}=options;const nextState=!!enabled;if(this.isDeepFocusMode===nextState)return;this.isDeepFocusMode=nextState;this.writeScopedBooleanPreference(this.deepFocusModePreferenceBaseKey,this.isDeepFocusMode);this.itemHeightCalibrated=false;this.$nextTick(()=>this.scheduleHeightCalibration(true));if(announce){this.announce(nextState?"Deep focus mode enabled.":"Deep focus mode disabled.");}this.showModeToggleToast("Deep focus",nextState);},toggleDeepFocusMode(){this.setDeepFocusMode(!this.isDeepFocusMode);},shareOnWhatsApp:function(ayah){const message=this.buildAyahMessage(ayah,{includeAudio:true});if(!message)return;const encodedMessage=encodeURIComponent(message);const whatsappLink="https://api.whatsapp.com/send?text="+encodedMessage;window.open(whatsappLink,"_blank","noopener,noreferrer");},getFlagFromLanguage:function(lang){const languageFlags={en:"🇬🇧",ar:"🇸🇦",fr:"🇫🇷",es:"🇪🇸",ur:"🇵🇰",tr:"🇹🇷",id:"🇮🇩",bn:"🇧🇩",fa:"🇮🇷",ru:"🇷🇺",de:"🇩🇪",it:"🇮🇹",sw:"🇹🇿",zh:"🇨🇳",hi:"🇮🇳"};return languageFlags[lang.toLowerCase()]||"🌐";},fetchSurahs:async function(){this.isLoading=true;try{const{data,fromCache}=await this.cachedFetchJSON("https://api.alquran.cloud/v1/surah","cache:surahs");if(!this._isDestroyed)this.surahs=data.data||[];this.isLoading=false;// Revalidate in background if served from cache
if(fromCache)setTimeout(()=>this.cachedFetchJSON("https://api.alquran.cloud/v1/surah","cache:surahs").then(({data})=>{if(!this._isDestroyed)this.surahs=data.data||[];}),0);}catch(error){console.error("Error fetching Surahs:",error);this.isLoading=false;}},async fetchReciters(){this.isLoading=true;try{const{data,fromCache}=await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/format/audio","cache:reciters");if(!this._isDestroyed){this.reciters=data.data.filter(reciter=>reciter.identifier&&reciter.englishName).map(reciter=>({identifier:reciter.identifier,englishName:reciter.englishName||"Unknown Reciter"})).filter(reciter=>!["elmir kuliev 2 by 1muslimapp","elmir kuliev by 1muslimapp","elmir kuliev elevatemuslim","elmir kuliev 1muslim","elmir kuliev 2muslim","chinese","ibrahim walk","fooladvand - hedayatfar","shamshad ali khan","youssouf leclerc"].includes(reciter.englishName.toLowerCase()));}this.isLoading=false;if(fromCache)setTimeout(async()=>{try{const fresh=await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/format/audio","cache:reciters");if(!this._isDestroyed)this.reciters=fresh.data.data.filter(r=>r.identifier&&r.englishName).map(r=>({identifier:r.identifier,englishName:r.englishName||"Unknown Reciter"})).filter(r=>!["elmir kuliev 2 by 1muslimapp","elmir kuliev by 1muslimapp","elmir kuliev elevatemuslim","elmir kuliev 1muslim","elmir kuliev 2muslim","chinese","ibrahim walk","fooladvand - hedayatfar","shamshad ali khan","youssouf leclerc"].includes(r.englishName.toLowerCase()));}catch(_){}},0);}catch(error){console.error("Error fetching Reciters:",error);this.isLoading=false;}},async fetchTranslations(){this.isLoading=true;try{const{data,fromCache}=await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/type/translation","cache:translations");if(this._isDestroyed)return;if(!data.data){console.error("No translation data received from API");this.translations=[];this.isLoading=false;return;}const translations=data.data.map(translation=>({identifier:translation.identifier,englishName:translation.englishName||"Unknown Translation",language:translation.language||"Unknown",flag:this.getFlagFromLanguage(translation.language||"Unknown")})).filter(translation=>translation.flag!=="🌐");translations.sort((a,b)=>{if(a.flag<b.flag)return-1;if(a.flag>b.flag)return 1;if(a.englishName<b.englishName)return-1;if(a.englishName>b.englishName)return 1;return 0;});this.translations=translations;this.ensureTranslationCompareSelection({includeSelectedTranslation:true});console.log("Translations fetched:",translations);this.isLoading=false;if(fromCache)setTimeout(async()=>{try{const fresh=await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/type/translation","cache:translations");if(this._isDestroyed)return;const trs=fresh.data.data.map(t=>({identifier:t.identifier,englishName:t.englishName||"Unknown Translation",language:t.language||"Unknown",flag:this.getFlagFromLanguage(t.language||"Unknown")})).filter(t=>t.flag!=="🌐");trs.sort((a,b)=>a.flag<b.flag?-1:a.flag>b.flag?1:a.englishName<b.englishName?-1:a.englishName>b.englishName?1:0);this.translations=trs;this.ensureTranslationCompareSelection({includeSelectedTranslation:true});}catch(_){}},0);}catch(error){var _this$$toast3;console.error("Error fetching Translations:",error);this.translations=[];(_this$$toast3=this.$toast)===null||_this$$toast3===void 0||_this$$toast3.error("Failed to load translations");this.isLoading=false;}},async fetchSurahTransliteration(surahNumber=this.selectedSurah){const requestedSurah=String(surahNumber||"");if(!requestedSurah)return;const transliterationIdentifier=this.transliterationEditionIdentifier||"en.transliteration";const transliterationCacheKey=`cache:surah-transliteration:${requestedSurah}:${transliterationIdentifier}`;try{var _this$surahDetails54,_data$data3,_this$surahDetails55;const{data}=await this.cachedFetchJSON(`https://api.alquran.cloud/v1/surah/${requestedSurah}/${transliterationIdentifier}`,transliterationCacheKey,14*24*60*60*1000);if(this._isDestroyed)return;const activeSurah=String(((_this$surahDetails54=this.surahDetails)===null||_this$surahDetails54===void 0?void 0:_this$surahDetails54.surahNumber)||this.selectedSurah||"");if(activeSurah!==requestedSurah)return;const transliterationAyahs=Array.isArray(data===null||data===void 0||(_data$data3=data.data)===null||_data$data3===void 0?void 0:_data$data3.ayahs)?data.data.ayahs:[];if(!transliterationAyahs.length||!Array.isArray((_this$surahDetails55=this.surahDetails)===null||_this$surahDetails55===void 0?void 0:_this$surahDetails55.ayahs))return;this.surahDetails.ayahs=this.surahDetails.ayahs.map((ayah,index)=>{var _transliterationAyahs;const fetchedText=transliterationAyahs===null||transliterationAyahs===void 0||(_transliterationAyahs=transliterationAyahs[index])===null||_transliterationAyahs===void 0?void 0:_transliterationAyahs.text;const normalizedFetchedText=typeof fetchedText==="string"?fetchedText:"";if(!normalizedFetchedText)return ayah;return _objectSpread(_objectSpread({},ayah),{},{transliteration:normalizedFetchedText,lowerTransliteration:normalizedFetchedText.toLowerCase()});});this.itemHeightCalibrated=false;this.$nextTick(()=>this.scheduleHeightCalibration(true));}catch(error){const status=String((error===null||error===void 0?void 0:error.message)||"");if(status==="404"||status==="400")return;console.warn("Unable to load transliteration:",error);}},fetchSurahDetails:function(){if(!this.selectedSurah||!this.selectedReciter)return Promise.resolve();this.isLoading=true;this.hideAyahTafsirModal({reset:true});this.tafsirVisibility={};this.tafsirContent={};this.tafsirMeta={};this.tafsirLoading={};this.tafsirError={};this.prefetchCurrentSurahAudioMeta();const cacheKey=`cache:surah:${this.selectedSurah}:${this.selectedReciter}:tajweed`;// Serve from cache immediately if available
try{const cached=localStorage.getItem(cacheKey);if(cached){const obj=JSON.parse(cached);if(obj&&obj.ts){const data=obj.data;const editions=Array.isArray(data===null||data===void 0?void 0:data.data)?data.data:[];const arabicText=editions.find(item=>{var _item$edition5;return(item===null||item===void 0||(_item$edition5=item.edition)===null||_item$edition5===void 0?void 0:_item$edition5.identifier)===this.selectedReciter;})||editions[0];const tajweed=editions.find(item=>{var _item$edition6;return(item===null||item===void 0||(_item$edition6=item.edition)===null||_item$edition6===void 0?void 0:_item$edition6.identifier)==="quran-tajweed";});const transliteration=editions.find(item=>{var _item$edition7,_item$edition8;return(item===null||item===void 0||(_item$edition7=item.edition)===null||_item$edition7===void 0?void 0:_item$edition7.identifier)===this.transliterationEditionIdentifier||(item===null||item===void 0||(_item$edition8=item.edition)===null||_item$edition8===void 0?void 0:_item$edition8.type)==="transliteration";});this.surahDetails={surahNumber:this.selectedSurah,englishName:arabicText===null||arabicText===void 0?void 0:arabicText.englishName,name:(tajweed===null||tajweed===void 0?void 0:tajweed.name)||(arabicText===null||arabicText===void 0?void 0:arabicText.name),ayahs:((arabicText===null||arabicText===void 0?void 0:arabicText.ayahs)||[]).map((ayah,index)=>{var _tajweed$ayahs,_transliteration$ayah;const tajweedText=(tajweed===null||tajweed===void 0||(_tajweed$ayahs=tajweed.ayahs)===null||_tajweed$ayahs===void 0||(_tajweed$ayahs=_tajweed$ayahs[index])===null||_tajweed$ayahs===void 0?void 0:_tajweed$ayahs.text)||"";const text=ayah.text||"";const transliterationTextRaw=(transliteration===null||transliteration===void 0||(_transliteration$ayah=transliteration.ayahs)===null||_transliteration$ayah===void 0||(_transliteration$ayah=_transliteration$ayah[index])===null||_transliteration$ayah===void 0?void 0:_transliteration$ayah.text)||"";const transliterationText=typeof transliterationTextRaw==="string"?transliterationTextRaw:"";const words=text?text.split(" "):[];const tajweedWords=tajweedText?tajweedText.split(" "):[];return{number:ayah.numberInSurah||ayah.number,numberInSurah:ayah.numberInSurah,globalNumber:ayah.number,text,lowerText:text.toLowerCase(),translation:"",lowerTranslation:"",transliteration:transliterationText,lowerTransliteration:transliterationText.toLowerCase(),juz:ayah.juz,hizb:ayah.hizb,hizbQuarter:ayah.hizbQuarter,page:ayah.page,audio:ayah.audio||"",words,tajweedText,tajweedWords,quranWords:[],wordTranslations:[]};})};this.setTranslationLazyState({surahNumber:String(this.selectedSurah||""),translationId:String(this.selectedTranslation||""),loaded:false,loading:false,error:""});this.syncPinnedAyahsForCurrentSurah();this.isLoading=false;this.fetchSurahTransliteration(this.selectedSurah);this.maybeLoadTranslationForVisibleContent();this.enrichSurahWithQuranSegments().finally(()=>{// Pre-warm current and next from cache path as well
this.$nextTick(()=>{this.prepareNextAudio(0);this.prepareNextAudio(1);});});}}}catch(_){}// Abort any in-flight request
try{if(this._surahAborter)this._surahAborter.abort();}catch(_){}this._surahAborter=new AbortController();const{signal}=this._surahAborter;return fetch(`https://api.alquran.cloud/v1/surah/${this.selectedSurah}/editions/${this.selectedReciter},quran-tajweed`,{signal}).then(response=>{if(!response.ok)throw new Error(`Failed to fetch Surah details: ${response.status}`);return response.json();}).then(data=>{if(this._isDestroyed)return;// persist cache
try{localStorage.setItem(cacheKey,JSON.stringify({ts:Date.now(),data}));}catch(_){}const editions=Array.isArray(data===null||data===void 0?void 0:data.data)?data.data:[];const arabicText=editions.find(item=>{var _item$edition9;return(item===null||item===void 0||(_item$edition9=item.edition)===null||_item$edition9===void 0?void 0:_item$edition9.identifier)===this.selectedReciter;})||editions[0];const tajweed=editions.find(item=>{var _item$edition0;return(item===null||item===void 0||(_item$edition0=item.edition)===null||_item$edition0===void 0?void 0:_item$edition0.identifier)==="quran-tajweed";});const transliteration=editions.find(item=>{var _item$edition1,_item$edition10;return(item===null||item===void 0||(_item$edition1=item.edition)===null||_item$edition1===void 0?void 0:_item$edition1.identifier)===this.transliterationEditionIdentifier||(item===null||item===void 0||(_item$edition10=item.edition)===null||_item$edition10===void 0?void 0:_item$edition10.type)==="transliteration";});this.surahDetails={surahNumber:this.selectedSurah,englishName:arabicText===null||arabicText===void 0?void 0:arabicText.englishName,name:(tajweed===null||tajweed===void 0?void 0:tajweed.name)||(arabicText===null||arabicText===void 0?void 0:arabicText.name),ayahs:((arabicText===null||arabicText===void 0?void 0:arabicText.ayahs)||[]).map((ayah,index)=>{var _tajweed$ayahs2,_transliteration$ayah2;const tajweedText=(tajweed===null||tajweed===void 0||(_tajweed$ayahs2=tajweed.ayahs)===null||_tajweed$ayahs2===void 0||(_tajweed$ayahs2=_tajweed$ayahs2[index])===null||_tajweed$ayahs2===void 0?void 0:_tajweed$ayahs2.text)||"";const text=ayah.text||"";const transliterationTextRaw=(transliteration===null||transliteration===void 0||(_transliteration$ayah2=transliteration.ayahs)===null||_transliteration$ayah2===void 0||(_transliteration$ayah2=_transliteration$ayah2[index])===null||_transliteration$ayah2===void 0?void 0:_transliteration$ayah2.text)||"";const transliterationText=typeof transliterationTextRaw==="string"?transliterationTextRaw:"";const words=text?text.split(" "):[];const tajweedWords=tajweedText?tajweedText.split(" "):[];return{number:ayah.numberInSurah||ayah.number,numberInSurah:ayah.numberInSurah,globalNumber:ayah.number,text,lowerText:text.toLowerCase(),translation:"",lowerTranslation:"",transliteration:transliterationText,lowerTransliteration:transliterationText.toLowerCase(),juz:ayah.juz,hizb:ayah.hizb,hizbQuarter:ayah.hizbQuarter,page:ayah.page,audio:ayah.audio||"",words,tajweedText,tajweedWords,quranWords:[],wordTranslations:[]};})};this.setTranslationLazyState({surahNumber:String(this.selectedSurah||""),translationId:String(this.selectedTranslation||""),loaded:false,loading:false,error:""});this.syncPinnedAyahsForCurrentSurah();console.log("Surah details fetched:",this.surahDetails);this.isLoading=false;this.fetchSurahTransliteration(this.selectedSurah);this.maybeLoadTranslationForVisibleContent();this.enrichSurahWithQuranSegments().finally(()=>{// Pre-warm the first and next ayah for instant playback
this.$nextTick(()=>{this.prepareNextAudio(0);this.prepareNextAudio(1);});});}).catch(error=>{if((error===null||error===void 0?void 0:error.name)==="AbortError")return;// expected on change
console.error("Error fetching Surah details:",error);this.isLoading=false;});},resetAllAudioPlayers:function(){this.$nextTick(()=>{if(this.currentlyPlaying){this.currentlyPlaying.pause();this.currentlyPlaying=null;this.currentlyPlayingIndex=0;this.currentAudioIndex=-1;}// Clear references; recreate on-demand for speed
if(this.audioElements&&this.audioElements.forEach){this.audioElements.forEach(audio=>{try{if(audio&&audio.pause)audio.pause();}catch(_){}});}this.audioElements=new Array(this.filteredAyahs.length).fill(null);this.isAudioPlaying=new Array(this.filteredAyahs.length).fill(false);this.isAudioLoading=new Array(this.filteredAyahs.length).fill(false);this.progress=new Array(this.filteredAyahs.length).fill(0);});},savePreference:function(key,value){localStorage.setItem(key,JSON.stringify(value));},handleAyahEnd:function(index){var self=this;var inRepetitionMode=self.isMemorisationToolbarVisible&&self.memorisationRepetitionCount>1&&Array.isArray(self.filteredAyahs)&&self.filteredAyahs.length>0&&!self.playlistSinglePlayMode;if(inRepetitionMode){if(self.memorisationRepetitionCurrent<self.memorisationRepetitionCount){self.memorisationRepetitionCurrent++;self.stopAudio(index);if(self.memorisationRepetitionPause>0){self.isCountdownActive=true;self.countdownSeconds=self.memorisationRepetitionPause;if(self.countdownInterval)clearInterval(self.countdownInterval);self.countdownInterval=setInterval(function(){self.countdownSeconds--;if(self.countdownSeconds<=0){clearInterval(self.countdownInterval);self.countdownInterval=null;self.isCountdownActive=false;self.playAudio(index);if(self.isMemorisationMode){self.memorisationFocusIndex=index;self.selectCard(index);}self.scrollToAyahIndex(index);}},1000);}else{setTimeout(function(){self.playAudio(index);if(self.isMemorisationMode){self.memorisationFocusIndex=index;self.selectCard(index);}self.scrollToAyahIndex(index);},50);}return;}var nextIndex=index+1;if(nextIndex<self.filteredAyahs.length){self.memorisationRepetitionCurrent=1;self.stopAudio(index);if(self.memorisationVerseDelay>0){self.isCountdownActive=true;self.countdownSeconds=self.memorisationVerseDelay;if(self.countdownInterval)clearInterval(self.countdownInterval);self.countdownInterval=setInterval(function(){self.countdownSeconds--;if(self.countdownSeconds<=0){clearInterval(self.countdownInterval);self.countdownInterval=null;self.isCountdownActive=false;self.triggerAutoNextAyahAnimation(nextIndex);self.playAudio(nextIndex);if(self.isMemorisationMode){self.memorisationFocusIndex=nextIndex;self.selectCard(nextIndex);}self.scrollToAyahIndex(nextIndex);}},1000);}else{self.stopAudio(index);setTimeout(function(){self.triggerAutoNextAyahAnimation(nextIndex);self.playAudio(nextIndex);if(self.isMemorisationMode){self.memorisationFocusIndex=nextIndex;self.selectCard(nextIndex);}self.scrollToAyahIndex(nextIndex);},50);}return;}self.stopAudio(index);self.memorisationRepetitionCurrent=1;self.showAudioPlayer=false;self.currentlyPlayingIndex=-1;return;}this.stopAudio(index);if(this.playlistSinglePlayMode){this.playlistSinglePlayMode=false;this.showAudioPlayer=this.bottomAudioPlayerEnabled&&this.isAudioPlayerVisible;this.currentlyPlayingIndex=Math.max(0,Number(index)||0);return;}if(this.playbackMode==="repeat"){this.playAudio(index);return;}if((this.audioPlayerQueue||[]).length){this.playNextFromQueue();return;}if(this.playbackMode==="continuous"){var nextIndex=index+1;if(nextIndex<this.filteredAyahs.length){if(this.isMemorisationMode){this.memorisationFocusIndex=nextIndex;this.selectCard(nextIndex);}if(this.memorisationVerseDelay>0){this.isCountdownActive=true;this.countdownSeconds=this.memorisationVerseDelay;if(this.countdownInterval)clearInterval(this.countdownInterval);this.countdownInterval=setInterval(function(){this.countdownSeconds--;if(this.countdownSeconds<=0){clearInterval(this.countdownInterval);this.isCountdownActive=false;this.triggerAutoNextAyahAnimation(nextIndex);this.playAudio(nextIndex);}}.bind(this),1000);}else{setTimeout(function(){this.triggerAutoNextAyahAnimation(nextIndex);this.playAudio(nextIndex);}.bind(this),50);}return;}}this.showAudioPlayer=false;this.currentlyPlayingIndex=-1;},// playNextAyah: function () {
//   if (this.filteredAyahs.length > 0) {
//     const nextIndex = (this.currentlyPlayingIndex + 1) % this.filteredAyahs.length;
//     if (nextIndex < this.filteredAyahs.length && this.audioElements[nextIndex]) {
//       console.log(`Playing next ayah: ${nextIndex + 1}`);
//       // Stop current auto-scroll before starting new one
//       this.stopAutoScroll();
//       // Small delay to ensure smooth transition
//       setTimeout(() => {
//         this.playAudio(nextIndex);
//       }, 100);
//     } else {
//       console.warn(`Cannot play next ayah: index ${nextIndex} invalid or no audio element`);
//     }
//   }
// },
playNextAyah(currentIndex){if(currentIndex+1<this.filteredAyahs.length){this.stopAudio(currentIndex);this.toggleAudioPlayer(currentIndex+1);// Play next ayah
}else{// End of surah: do not auto-stop if continuousPlaybackLoop is desired.
// Default: stop at the end of the surah.
this.stopAudio(currentIndex);this.showAudioPlayer=false;this.currentlyPlayingIndex=-1;}},playPrevAyah(currentIndex){const prev=Math.max(0,currentIndex-1);if(this.filteredAyahs.length>0&&this.audioElements[prev]){if(currentIndex!==prev)this.stopAudio(currentIndex);this.toggleAudioPlayer(prev);}},playSurahContinuously(){if(!this.canPlaySurah)return;this.setPlaybackMode("continuous");this.continuousPlayback=true;this.savePreference("continuousPlayback",true);const startIndex=0;if(typeof this.currentlyPlayingIndex==="number"&&this.currentlyPlayingIndex>=0&&this.currentlyPlayingIndex<this.filteredAyahs.length){this.stopAudio(this.currentlyPlayingIndex);}this.currentlyPlayingIndex=startIndex;this.selectCard(startIndex);this.playAudio(startIndex);},resetSidebarVerseRenderCount(){this.sidebarVerseRenderCount=Math.max(40,Number(this.sidebarVerseRenderInitial)||100);},loadMoreSidebarVerses(){if(!this.hasMoreFilteredVerses)return;this.sidebarVerseRenderCount=Math.min(this.filteredVersesList.length,this.sidebarVerseRenderCount+Math.max(40,Number(this.sidebarVerseRenderStep)||100));},handleSidebarListScroll(event){if(this.activeSidebarTab!=="verse"||!this.hasMoreFilteredVerses){return;}if(typeof window==="undefined"||this.sidebarListScrollRaf)return;const host=event===null||event===void 0?void 0:event.target;if(!host)return;this.sidebarListScrollRaf=window.requestAnimationFrame(()=>{this.sidebarListScrollRaf=null;const remaining=host.scrollHeight-host.scrollTop-host.clientHeight;if(remaining<=220){this.loadMoreSidebarVerses();}});},clearMainAyahSearchFilter(){clearTimeout(this.debounceTimer);this.searchQuery="";this.debouncedQuery="";},resolveAyahIndexByNumber(ayahNumber){const target=Number(ayahNumber);if(!target||!Array.isArray(this.filteredAyahs))return-1;return this.filteredAyahs.findIndex(ayah=>Number((ayah===null||ayah===void 0?void 0:ayah.numberInSurah)||(ayah===null||ayah===void 0?void 0:ayah.number))===target);},navigateToAyahNumber(ayahNumber,options={}){const{clearMainFilter=false,precise=false}=options;const targetAyah=Number(ayahNumber);if(!targetAyah){this.isNavigating=false;return false;}if(clearMainFilter){this.clearMainAyahSearchFilter();}const total=Array.isArray(this.filteredAyahs)?this.filteredAyahs.length:0;if(!total){this.isNavigating=false;return false;}let targetIndex=this.resolveAyahIndexByNumber(targetAyah);if(targetIndex<0&&targetAyah<=total){targetIndex=Math.max(0,targetAyah-1);}if(targetIndex<0||targetIndex>=total){this.isNavigating=false;return false;}const buffer=this.effectiveVirtualBuffer;const size=this.effectiveVirtualWindowSize;const start=Math.max(0,targetIndex-buffer);this.visibleStart=start;this.visibleEnd=Math.min(total,start+size+buffer*2);this.$nextTick(()=>{this.scrollToAyahIndex(targetIndex,{settle:!!precise,settleDelay:precise?260:null,force:true,behavior:"auto",lock:!!precise});if(precise){this.alignAyahCardAfterSearch(targetIndex,"auto");}});return true;},selectSurahFromSidebar(number){this.clearMainAyahSearchFilter();return this.selectSurah(number,{skipScroll:true}).then(()=>{if(typeof window!=="undefined"){window.scrollTo({top:0,behavior:"auto"});}});},setActiveSidebarTab(tab){clearTimeout(this.sidebarSearchDebounceTimer);this.activeSidebarTab=tab;this.sidebarSearchQuery="";this.sidebarDebouncedQuery="";},async selectJuz(juzNumber){this.isNavigating=true;this.lastManualNavigationAt=Date.now();const normalizedJuz=Number(juzNumber)||null;this.selectedJuz=normalizedJuz;const start=(0,_utils_quran_mappings__WEBPACK_IMPORTED_MODULE_1__.getJuzStart)(normalizedJuz);if(start){// Ensure surah is loaded first (selectSurah returns a promise)
await this.selectSurah(start.surah,{skipScroll:true});this.navigateToAyahNumber(start.ayah,{clearMainFilter:true,precise:true});return;}this.isNavigating=false;},async selectPage(pageNumber){this.isNavigating=true;this.lastManualNavigationAt=Date.now();const normalizedPage=Number(pageNumber)||null;const start=(0,_utils_quran_mappings__WEBPACK_IMPORTED_MODULE_1__.getPageStart)(normalizedPage);if(start){// Ensure surah is loaded first (selectSurah returns a promise)
await this.selectSurah(start.surah,{skipScroll:true});this.navigateToAyahNumber(start.ayah,{clearMainFilter:true,precise:true});return;}else{console.log("Page navigation mapping incomplete");this.isNavigating=false;}},selectVerseFromSidebar(verseIndex){this.isNavigating=true;this.lastManualNavigationAt=Date.now();this.clearMainAyahSearchFilter();const runScroll=()=>{this.$nextTick(()=>{this.navigateToAyahNumber(verseIndex,{clearMainFilter:false,precise:true});});};if(this.isMobile&&!this.sidebarCollapsed){this.toggleSidebar();this.$nextTick(runScroll);}else{runScroll();}},scrollToAyah(index){this.scrollToAyahIndex(index);},scrollToSection(id){this.$nextTick(()=>{const el=document.getElementById(id);if(!el)return;const navHeight=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-offset"))||72;const targetTop=Math.max(el.getBoundingClientRect().top+window.scrollY-navHeight-12,0);window.scrollTo({top:targetTop,behavior:"smooth"});});},scrollToTop(){window.scrollTo({top:0,behavior:"smooth"});},selectSurah(number,options={}){return new Promise((resolve,reject)=>{const{skipScroll=false}=options;if(String(this.selectedSurah)===String(number)&&!this.isLoading){resolve();return;}// Set loading true to bypass watcher
this.isLoading=true;this.selectedSurah=String(number);this.savePreference("selectedSurah",this.selectedSurah);// Reset state
this.currentlyPlayingIndex=0;this.isHighlighted=false;this.memorisationRangeStart=1;this.memorisationRangeEnd=null;if(!skipScroll){window.scrollTo({top:0,behavior:"smooth"});}this.fetchSurahDetails().then(()=>{this.resetAllAudioPlayers();this.isLoading=false;this.syncVirtualWindowAfterSelection();resolve();}).catch(error=>{this.isLoading=false;reject(error);});});},selectReciter(identifier){this.selectedReciter=identifier;},selectTranslation(identifier){this.selectedTranslation=identifier;},toggleSidebar(){this.sidebarCollapsed=!this.sidebarCollapsed;},toggleHeader(){this.headerCollapsed=!this.headerCollapsed;// Recalculate list top after header height change
this.$nextTick(()=>{this.computeListTop();});},syncPlaybackScroll(index){// If user is manually scrolling or we are in the middle of a nav jump, 
// don't force a "snap-back" scroll.
if(this.isManualScrolling||this.isNavigating)return;if(this.isAutoSyncLocked())return;const manualNavCooldown=800;if(Date.now()-this.lastManualNavigationAt<manualNavCooldown)return;const now=window.performance?performance.now():Date.now();if(now-this.lastAutoScrollAt<400)return;this.lastAutoScrollAt=now;this.scrollToAyahIndex(index);},onAyahScrubInput(event){var _event$target6;const raw=Number(((_event$target6=event.target)===null||_event$target6===void 0?void 0:_event$target6.value)||1);this.ayahScrubValue=Math.min(Math.max(1,raw),Math.max(this.totalItems,1));},onAyahScrubChange(event){var _event$target7;this.isNavigating=true;this.lastManualNavigationAt=Date.now();const raw=Number(((_event$target7=event.target)===null||_event$target7===void 0?void 0:_event$target7.value)||1);const targetIndex=Math.min(Math.max(0,raw-1),Math.max(this.totalItems-1,0));// Clear search filter so the jumped ayah is actually in the DOM
this.searchQuery="";this.debouncedQuery="";this.$nextTick(()=>{this.ayahScrubValue=targetIndex+1;this.selectCard(targetIndex);this.scrollToAyahIndex(targetIndex,{settle:true,force:true,behavior:"smooth",lock:true});this.playAudio(targetIndex);});},toggleVolume:function(){this.showVolumeBar=!this.showVolumeBar;},updateVolume:function(){if(this.currentlyPlaying){this.currentlyPlaying.volume=this.volume;}if(this.audioElements&&this.audioElements.forEach){this.audioElements.forEach(audio=>{if(audio)audio.volume=this.volume;});}},closeAudioPlayer:function(){if(this.currentlyPlayingIndex!==null){this.stopAudio(this.currentlyPlayingIndex);}this.clearWordPreviewStopTimer();this.showAudioPlayer=false;this.showAudioPlayerQueuePanel=false;this.audioQueueMinimized=false;this.currentlyPlayingIndex=0;this.currentlyPlaying=null;this.currentAudioIndex=-1;this.isHighlighted=false;},toggleAudioPlayerQueuePanel(){this.showAudioPlayerQueuePanel=!this.showAudioPlayerQueuePanel;if(this.showAudioPlayerQueuePanel){this.audioQueueMinimized=false;}},toggleAudioQueueMinimized(){this.audioQueueMinimized=!this.audioQueueMinimized;},buildAudioQueueItem(index){var _this$filteredAyahs0,_this$surahDetails56,_this$surahDetails57,_this$currentSurahInf14;const safeIndex=Number(index);if(!Number.isInteger(safeIndex)||safeIndex<0)return null;const ayah=(_this$filteredAyahs0=this.filteredAyahs)===null||_this$filteredAyahs0===void 0?void 0:_this$filteredAyahs0[safeIndex];const surahNumber=Number(((_this$surahDetails56=this.surahDetails)===null||_this$surahDetails56===void 0?void 0:_this$surahDetails56.surahNumber)||this.selectedSurah||0);const ayahNumber=Number((ayah===null||ayah===void 0?void 0:ayah.numberInSurah)||(ayah===null||ayah===void 0?void 0:ayah.number)||0);if(!ayah||!surahNumber||!ayahNumber)return null;const surahName=((_this$surahDetails57=this.surahDetails)===null||_this$surahDetails57===void 0?void 0:_this$surahDetails57.englishName)||((_this$currentSurahInf14=this.currentSurahInfo)===null||_this$currentSurahInf14===void 0?void 0:_this$currentSurahInf14.englishName)||`Surah ${surahNumber}`;return{id:`aq-${surahNumber}-${ayahNumber}`,surahNumber,ayahNumber,title:`Surah ${surahNumber}:${ayahNumber}`,description:surahName,index:safeIndex};},enqueueCurrentAyah(){const item=this.buildAudioQueueItem(this.currentlyPlayingIndex);if(!item)return;const exists=(this.audioPlayerQueue||[]).some(entry=>Number(entry===null||entry===void 0?void 0:entry.surahNumber)===item.surahNumber&&Number(entry===null||entry===void 0?void 0:entry.ayahNumber)===item.ayahNumber);if(exists)return;this.audioPlayerQueue=[...(this.audioPlayerQueue||[]),item];this.showAudioPlayerQueuePanel=true;},removeAudioQueueItem(itemId){this.audioPlayerQueue=(this.audioPlayerQueue||[]).filter(item=>String((item===null||item===void 0?void 0:item.id)||"")!==String(itemId||""));},clearAudioPlayerQueue(){this.audioPlayerQueue=[];},async playAudioQueueItem(itemId){const entry=(this.audioPlayerQueueItems||[]).find(item=>String((item===null||item===void 0?void 0:item.id)||"")===String(itemId||""));if(!entry)return;await this.playQueueEntry(entry,{removeFromQueue:false});},async playNextFromQueue(){const[first]=this.audioPlayerQueue||[];if(!first)return false;await this.playQueueEntry(first,{removeFromQueue:true});return true;},async playQueueEntry(entry,options={}){var _this$surahDetails58;const{removeFromQueue=false}=options;const surahNumber=Number((entry===null||entry===void 0?void 0:entry.surahNumber)||0);const ayahNumber=Number((entry===null||entry===void 0?void 0:entry.ayahNumber)||0);if(!surahNumber||!ayahNumber)return;if(removeFromQueue){this.audioPlayerQueue=(this.audioPlayerQueue||[]).filter(item=>!(Number(item===null||item===void 0?void 0:item.surahNumber)===surahNumber&&Number(item===null||item===void 0?void 0:item.ayahNumber)===ayahNumber));}const currentSurah=Number(((_this$surahDetails58=this.surahDetails)===null||_this$surahDetails58===void 0?void 0:_this$surahDetails58.surahNumber)||this.selectedSurah||0);if(currentSurah!==surahNumber){await this.selectSurah(String(surahNumber),{skipScroll:true});}let targetIndex=this.resolveAyahIndexByNumber(ayahNumber);if(targetIndex<0)targetIndex=Math.max(0,ayahNumber-1);this.selectCard(targetIndex);this.scrollToAyahIndex(targetIndex,{settle:true,force:true,behavior:"smooth"});this.playAudio(targetIndex);},toggleCustomPlaylistPanel(){if(!this.showCustomPlaylistPanel&&!this.ensurePlaylistAuth("Please log in to access playlists.")){return;}this.showCustomPlaylistPanel=!this.showCustomPlaylistPanel;if(this.showCustomPlaylistPanel&&this.isTabletOrMobile){this.isMobileToolbarExpanded=false;}if(!this.showCustomPlaylistPanel){this.isPlaylistEditorVisible=false;this.showPlaylistEditorConfirmAction=false;this.playlistAyahSearchQuery="";this.playlistAyahFilterMode="all";this.playlistDragItemId="";this.playlistDragOverItemId="";this.closeAyahPlaylistMenu();}},ensurePlaylistAuth(message="Please log in to create, edit, or add playlists.",ayah=null){if(this.bookmarkAuthenticated)return true;if(ayah){this.showAyahAuthWarning(ayah,message);return false;}this.showAuthAlert(message);return false;},getPlaylistAccentColor(playlist){const palette=["#0f7662","#0b6b59","#1d4ed8","#7c3aed","#be123c","#b45309","#0369a1","#166534"];const token=String((playlist===null||playlist===void 0?void 0:playlist.id)||(playlist===null||playlist===void 0?void 0:playlist.name)||"playlist");let hash=0;for(let idx=0;idx<token.length;idx++){hash=hash*31+token.charCodeAt(idx)>>>0;}return palette[hash%palette.length];},getCustomPlaylistStorageKey(){const base=this.customPlaylistStorageKeyBase||"ic_surat_custom_playlist_v1";if(this.bookmarkStorageUserId){return`${base}_user_${this.bookmarkStorageUserId}`;}if(this.userId){return`${base}_user_${this.userId}`;}const anonId=this.getOrCreateSuratPreferenceAnonId();return`${base}_anon_${anonId||"local"}`;},createDefaultPlaylist(options={}){const{name="Untitled Playlist",description=""}=options;return{id:`playlist-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,name,description,items:[]};},syncPlaylistEditorFromActive(){var _this$activePlaylist5,_this$activePlaylist6;this.playlistEditorName=((_this$activePlaylist5=this.activePlaylist)===null||_this$activePlaylist5===void 0?void 0:_this$activePlaylist5.name)||"";this.playlistEditorDescription=((_this$activePlaylist6=this.activePlaylist)===null||_this$activePlaylist6===void 0?void 0:_this$activePlaylist6.description)||"";},togglePlaylistEditor(forceValue=null){if(!this.activePlaylist)return;const nextState=typeof forceValue==="boolean"?forceValue:!this.isPlaylistEditorVisible;if(nextState&&!this.ensurePlaylistAuth("Please log in to edit playlists.")){return;}if(nextState){this.syncPlaylistEditorFromActive();}else{this.syncPlaylistEditorFromActive();this.showPlaylistEditorConfirmAction=false;}this.isPlaylistEditorVisible=nextState;},confirmPlaylistEditorChanges(){this.showPlaylistEditorConfirmAction=false;this.isPlaylistEditorVisible=false;this.syncPlaylistEditorFromActive();this.announce("Playlist details confirmed.");},syncSelectedPlaylistItems(){const validIds=new Set((this.activePlaylistItems||[]).map(item=>String((item===null||item===void 0?void 0:item.id)||"")).filter(Boolean));this.selectedPlaylistItemIds=(this.selectedPlaylistItemIds||[]).map(id=>String(id||"")).filter(id=>validIds.has(id));},isPlaylistItemSelected(itemId){const id=String(itemId||"");if(!id)return false;return(this.selectedPlaylistItemIds||[]).includes(id);},togglePlaylistItemSelection(itemId){if(Date.now()-Number(this.playlistLastDragAt||0)<180)return;const id=String(itemId||"");if(!id)return;if(this.isPlaylistItemSelected(id)){this.selectedPlaylistItemIds=(this.selectedPlaylistItemIds||[]).filter(selectedId=>selectedId!==id);return;}this.selectedPlaylistItemIds=[...(this.selectedPlaylistItemIds||[]),id];},toggleAllActivePlaylistSelections(){if(!this.activePlaylistItems.length){this.selectedPlaylistItemIds=[];return;}if(this.allActivePlaylistItemsSelected){this.selectedPlaylistItemIds=[];return;}this.selectedPlaylistItemIds=this.activePlaylistItems.map(item=>String((item===null||item===void 0?void 0:item.id)||"")).filter(Boolean);},togglePlaylistAyahListCollapsed(){this.isPlaylistAyahListCollapsed=!this.isPlaylistAyahListCollapsed;},onPlaylistItemDragStart(item,event){const itemId=String((item===null||item===void 0?void 0:item.id)||"");if(!itemId||!this.activePlaylist)return;this.playlistDragItemId=itemId;this.playlistDragOverItemId=itemId;this.playlistLastDragAt=Date.now();if(event!==null&&event!==void 0&&event.dataTransfer){event.dataTransfer.effectAllowed="move";event.dataTransfer.setData("text/plain",itemId);}},onPlaylistItemDragOver(item,event){const itemId=String((item===null||item===void 0?void 0:item.id)||"");if(!itemId||!this.playlistDragItemId)return;if(itemId===this.playlistDragItemId)return;if(event!==null&&event!==void 0&&event.dataTransfer){event.dataTransfer.dropEffect="move";}this.playlistDragOverItemId=itemId;},onPlaylistItemDragLeave(item,event){var _event$currentTarget,_event$currentTarget$;const itemId=String((item===null||item===void 0?void 0:item.id)||"");if(!itemId)return;const related=event===null||event===void 0?void 0:event.relatedTarget;if(related&&event!==null&&event!==void 0&&(_event$currentTarget=event.currentTarget)!==null&&_event$currentTarget!==void 0&&(_event$currentTarget$=_event$currentTarget.contains)!==null&&_event$currentTarget$!==void 0&&_event$currentTarget$.call(_event$currentTarget,related))return;if(this.playlistDragOverItemId===itemId){this.playlistDragOverItemId="";}},onPlaylistItemDrop(targetItem,event){var _event$dataTransfer;if(!this.activePlaylist){this.onPlaylistItemDragEnd();return;}if(!this.ensurePlaylistAuth("Please log in to edit playlists.")){this.onPlaylistItemDragEnd();return;}const sourceId=String(this.playlistDragItemId||"")||String((event===null||event===void 0||(_event$dataTransfer=event.dataTransfer)===null||_event$dataTransfer===void 0?void 0:_event$dataTransfer.getData("text/plain"))||"");const targetId=String((targetItem===null||targetItem===void 0?void 0:targetItem.id)||"");if(!sourceId||!targetId||sourceId===targetId){this.onPlaylistItemDragEnd();return;}const items=[...(this.activePlaylist.items||[])];const sourceIndex=items.findIndex(item=>String((item===null||item===void 0?void 0:item.id)||"")===sourceId);const targetIndex=items.findIndex(item=>String((item===null||item===void 0?void 0:item.id)||"")===targetId);if(sourceIndex<0||targetIndex<0){this.onPlaylistItemDragEnd();return;}const[moved]=items.splice(sourceIndex,1);const insertIndex=Math.max(0,targetIndex);items.splice(insertIndex,0,moved);this.activePlaylist.items=items;this.persistCustomPlaylist();this.onPlaylistItemDragEnd();this.announce("Playlist order updated.");},onPlaylistItemDragEnd(){this.playlistDragItemId="";this.playlistDragOverItemId="";this.playlistLastDragAt=Date.now();},removeSelectedPlaylistItems(){if(!this.activePlaylist||!this.hasSelectedPlaylistItems)return;if(!this.ensurePlaylistAuth("Please log in to edit playlists.")){return;}const selectedIds=new Set((this.selectedPlaylistItemIds||[]).map(id=>String(id||"")));const before=(this.activePlaylist.items||[]).length;this.activePlaylist.items=(this.activePlaylist.items||[]).filter(item=>!selectedIds.has(String((item===null||item===void 0?void 0:item.id)||"")));const removed=Math.max(0,before-this.activePlaylist.items.length);this.selectedPlaylistItemIds=[];this.playlistDragItemId="";this.playlistDragOverItemId="";this.persistCustomPlaylist();if(removed){this.announce(`${removed} playlist item${removed===1?"":"s"} removed.`);}},getCustomPlaylistItemMain(item){if(!item||typeof item!=="object")return"Playlist item";const type=String(item.type||"");const surahNumber=Number(item.surahNumber||0);const ayahNumber=Number(item.ayahNumber||0);if(type==="ayah"){const ref=surahNumber&&ayahNumber?`${surahNumber}:${ayahNumber}`:String(item.title||"").replace(/^Surah\s*/i,"").trim();const surahName=String(item.description||"").trim();return surahName?`${ref} · ${surahName}`:ref||"Ayah";}const rawTitle=String(item.title||"").trim();if(rawTitle){return rawTitle.replace(/\s*-\s*/g," · ");}return surahNumber?`Surah ${surahNumber}`:"Surah";},getCustomPlaylistItemMeta(item){if(!item||typeof item!=="object")return"";return"";},getCustomPlaylistItemArabicName(item){var _this$surahDetails59,_this$surahDetails60;if(!item||String((item===null||item===void 0?void 0:item.type)||"")!=="ayah")return"";const surahNumber=Number((item===null||item===void 0?void 0:item.surahNumber)||0);if(!surahNumber)return"";const currentSurahNumber=Number(((_this$surahDetails59=this.surahDetails)===null||_this$surahDetails59===void 0?void 0:_this$surahDetails59.surahNumber)||this.selectedSurah||0);if(currentSurahNumber===surahNumber&&String(((_this$surahDetails60=this.surahDetails)===null||_this$surahDetails60===void 0?void 0:_this$surahDetails60.name)||"").trim()){return String(this.surahDetails.name).trim();}const surah=(this.surahs||[]).find(entry=>Number((entry===null||entry===void 0?void 0:entry.number)||0)===surahNumber);return String((surah===null||surah===void 0?void 0:surah.name)||"").trim();},isCustomPlaylistItemNowPlaying(item){var _this$surahDetails61,_this$filteredAyahs1;if(!item||!this.isAnyAudioPlaying)return false;if(String((item===null||item===void 0?void 0:item.type)||"")!=="ayah")return false;const itemSurahNumber=Number((item===null||item===void 0?void 0:item.surahNumber)||0);const currentSurahNumber=Number(((_this$surahDetails61=this.surahDetails)===null||_this$surahDetails61===void 0?void 0:_this$surahDetails61.surahNumber)||this.selectedSurah||0);if(!itemSurahNumber||itemSurahNumber!==currentSurahNumber){return false;}const currentAyah=((_this$filteredAyahs1=this.filteredAyahs)===null||_this$filteredAyahs1===void 0?void 0:_this$filteredAyahs1[this.currentlyPlayingIndex])||null;const currentAyahNumber=Number((currentAyah===null||currentAyah===void 0?void 0:currentAyah.numberInSurah)||(currentAyah===null||currentAyah===void 0?void 0:currentAyah.number)||0);return String((item===null||item===void 0?void 0:item.type)||"")==="ayah"&&Number((item===null||item===void 0?void 0:item.ayahNumber)||0)===currentAyahNumber;},closePlaylistAndBrowse(){this.showCustomPlaylistPanel=false;this.selectedPlaylistItemIds=[];this.announce("Browse the reader to add surahs or ayahs to your playlist.");},selectPlaylist(playlistId){const nextId=String(playlistId||"");if(!nextId)return;this.activePlaylistId=nextId;this.syncPlaylistEditorFromActive();this.isPlaylistAyahListCollapsed=false;this.playlistAyahSearchQuery="";this.playlistAyahFilterMode="all";this.playlistDragItemId="";this.playlistDragOverItemId="";this.isPlaylistEditorVisible=false;this.showPlaylistEditorConfirmAction=false;this.persistCustomPlaylist();},removeActivePlaylist(){const id=String(this.activePlaylistId||"");if(!id)return;if(!this.ensurePlaylistAuth("Please log in to edit playlists.")){return;}this.playlists=(this.playlists||[]).filter(playlist=>String((playlist===null||playlist===void 0?void 0:playlist.id)||"")!==id);if(!this.playlists.length){this.activePlaylistId="";this.playlistEditorName="";this.playlistEditorDescription="";this.isPlaylistEditorVisible=false;this.showPlaylistEditorConfirmAction=false;this.persistCustomPlaylist();return;}this.selectPlaylist(this.playlists[0].id);this.persistCustomPlaylist();},saveAllPlaylistChanges(){if(!this.activePlaylist||!this.playlistEditorHasChanges)return;if(!this.ensurePlaylistAuth("Please log in to edit playlists.")){return;}this.activePlaylist.name=String(this.playlistEditorName||"").trim()||"Untitled Playlist";this.activePlaylist.description=String(this.playlistEditorDescription||"").trim();this.persistCustomPlaylist();this.showPlaylistEditorConfirmAction=true;this.announce("Playlist changes saved. Confirm to finish editing.");},buildCustomPlaylistItemId(type,surahNumber,ayahNumber=null){const ts=Date.now();return`${type}-${surahNumber}-${ayahNumber||"all"}-${ts}-${Math.random().toString(36).slice(2,7)}`;},addCurrentSurahToCustomPlaylist(){this.announce("Only ayah items are supported in playlists.");this.addSelectedAyahToCustomPlaylist();},addSelectedAyahToCustomPlaylist(){var _this$filteredAyahs10,_this$filteredAyahs11;const ayah=((_this$filteredAyahs10=this.filteredAyahs)===null||_this$filteredAyahs10===void 0?void 0:_this$filteredAyahs10[this.selectedCardIndex])||((_this$filteredAyahs11=this.filteredAyahs)===null||_this$filteredAyahs11===void 0?void 0:_this$filteredAyahs11[this.currentlyPlayingIndex]);this.addAyahToCustomPlaylist(ayah,{announceAction:true});},getCustomPlaylistById(playlistId=null){const targetId=String(playlistId==null?this.activePlaylistId:playlistId);if(!targetId)return null;return(this.playlists||[]).find(playlist=>String((playlist===null||playlist===void 0?void 0:playlist.id)||"")===targetId)||null;},addAyahToCustomPlaylist(ayah,options={}){var _this$surahDetails62,_this$surahDetails63,_this$currentSurahInf15;const{announceAction=false,playlistId=null}=options;if(!ayah)return false;if(!this.ensurePlaylistAuth("Please log in to add ayahs to playlists.",ayah)){return false;}const surahNumber=Number(((_this$surahDetails62=this.surahDetails)===null||_this$surahDetails62===void 0?void 0:_this$surahDetails62.surahNumber)||this.selectedSurah||0);const ayahNumber=Number((ayah===null||ayah===void 0?void 0:ayah.numberInSurah)||(ayah===null||ayah===void 0?void 0:ayah.number)||0);if(!surahNumber||!ayahNumber)return false;const targetPlaylist=this.getCustomPlaylistById(playlistId);if(!targetPlaylist)return false;const duplicate=((targetPlaylist===null||targetPlaylist===void 0?void 0:targetPlaylist.items)||[]).some(item=>item&&item.type==="ayah"&&Number(item.surahNumber)===surahNumber&&Number(item.ayahNumber)===ayahNumber);if(duplicate){if(announceAction){this.announce(`Surah ${surahNumber}, Ayah ${ayahNumber} is already in your playlist.`);}return false;}const surahName=((_this$surahDetails63=this.surahDetails)===null||_this$surahDetails63===void 0?void 0:_this$surahDetails63.englishName)||((_this$currentSurahInf15=this.currentSurahInfo)===null||_this$currentSurahInf15===void 0?void 0:_this$currentSurahInf15.englishName)||`Surah ${surahNumber}`;const ayahKey=this.buildAyahKey(surahNumber,ayahNumber);targetPlaylist.items.push({id:this.buildCustomPlaylistItemId("ayah",surahNumber,ayahNumber),type:"ayah",surahNumber,ayahNumber,title:`Surah ${surahNumber}:${ayahNumber}`,description:surahName,createdAt:Date.now()});this.persistCustomPlaylist();this.triggerAyahFeedback(ayahKey,"Added to playlist","feedback-pin-saved","check","","",2200);if(announceAction){const playlistName=String((targetPlaylist===null||targetPlaylist===void 0?void 0:targetPlaylist.name)||"").trim()||"playlist";this.announce(`Added Surah ${surahNumber}, Ayah ${ayahNumber} to ${playlistName}.`);}return true;},isAyahInCustomPlaylist(ayah,playlistId=null){var _this$surahDetails64;const targetPlaylist=this.getCustomPlaylistById(playlistId);if(!targetPlaylist)return false;const surahNumber=Number(((_this$surahDetails64=this.surahDetails)===null||_this$surahDetails64===void 0?void 0:_this$surahDetails64.surahNumber)||this.selectedSurah||0);const ayahNumber=Number((ayah===null||ayah===void 0?void 0:ayah.numberInSurah)||(ayah===null||ayah===void 0?void 0:ayah.number)||0);if(!surahNumber||!ayahNumber)return false;return((targetPlaylist===null||targetPlaylist===void 0?void 0:targetPlaylist.items)||[]).some(item=>item&&item.type==="ayah"&&Number(item.surahNumber)===surahNumber&&Number(item.ayahNumber)===ayahNumber);},isAyahInAnyCustomPlaylist(ayah){var _this$surahDetails65;const surahNumber=Number(((_this$surahDetails65=this.surahDetails)===null||_this$surahDetails65===void 0?void 0:_this$surahDetails65.surahNumber)||this.selectedSurah||0);const ayahNumber=Number((ayah===null||ayah===void 0?void 0:ayah.numberInSurah)||(ayah===null||ayah===void 0?void 0:ayah.number)||0);if(!surahNumber||!ayahNumber)return false;return(this.playlists||[]).some(playlist=>((playlist===null||playlist===void 0?void 0:playlist.items)||[]).some(item=>item&&item.type==="ayah"&&Number(item.surahNumber)===surahNumber&&Number(item.ayahNumber)===ayahNumber));},getAyahPlaylistsContainingAyah(ayah){var _this$surahDetails66;const surahNumber=Number(((_this$surahDetails66=this.surahDetails)===null||_this$surahDetails66===void 0?void 0:_this$surahDetails66.surahNumber)||this.selectedSurah||0);const ayahNumber=Number((ayah===null||ayah===void 0?void 0:ayah.numberInSurah)||(ayah===null||ayah===void 0?void 0:ayah.number)||0);if(!surahNumber||!ayahNumber)return[];return(this.sortedCustomPlaylists||[]).filter(playlist=>((playlist===null||playlist===void 0?void 0:playlist.items)||[]).some(item=>item&&item.type==="ayah"&&Number(item.surahNumber)===surahNumber&&Number(item.ayahNumber)===ayahNumber));},removeAyahFromCustomPlaylist(ayah,playlistId,options={}){var _this$surahDetails67;const{closeMenu=true,persist=true,announceAction=true}=options;if(!this.ensurePlaylistAuth("Please log in to edit playlists.",ayah||null)){if(closeMenu)this.closeAyahPlaylistMenu();return false;}const surahNumber=Number(((_this$surahDetails67=this.surahDetails)===null||_this$surahDetails67===void 0?void 0:_this$surahDetails67.surahNumber)||this.selectedSurah||0);const ayahNumber=Number((ayah===null||ayah===void 0?void 0:ayah.numberInSurah)||(ayah===null||ayah===void 0?void 0:ayah.number)||0);if(!surahNumber||!ayahNumber)return false;const targetPlaylist=this.getCustomPlaylistById(playlistId);if(!targetPlaylist)return false;const before=(targetPlaylist.items||[]).length;targetPlaylist.items=(targetPlaylist.items||[]).filter(item=>!(item&&item.type==="ayah"&&Number(item.surahNumber)===surahNumber&&Number(item.ayahNumber)===ayahNumber));const removed=(targetPlaylist.items||[]).length<before;if(!removed){if(closeMenu)this.closeAyahPlaylistMenu();return false;}this.syncSelectedPlaylistItems();if(persist)this.persistCustomPlaylist();if(announceAction){const playlistName=String((targetPlaylist===null||targetPlaylist===void 0?void 0:targetPlaylist.name)||"").trim()||"playlist";this.announce(`Removed Surah ${surahNumber}, Ayah ${ayahNumber} from ${playlistName}.`);}if(closeMenu)this.closeAyahPlaylistMenu();return true;},removeAyahFromAllCustomPlaylists(ayah){var _this$surahDetails68;if(!this.ensurePlaylistAuth("Please log in to edit playlists.",ayah||null)){this.closeAyahPlaylistMenu();return;}const surahNumber=Number(((_this$surahDetails68=this.surahDetails)===null||_this$surahDetails68===void 0?void 0:_this$surahDetails68.surahNumber)||this.selectedSurah||0);const ayahNumber=Number((ayah===null||ayah===void 0?void 0:ayah.numberInSurah)||(ayah===null||ayah===void 0?void 0:ayah.number)||0);if(!surahNumber||!ayahNumber)return;const targetPlaylists=this.getAyahPlaylistsContainingAyah(ayah);if(!targetPlaylists.length){this.closeAyahPlaylistMenu();return;}let removedFrom=0;targetPlaylists.forEach(playlist=>{const before=(playlist.items||[]).length;playlist.items=(playlist.items||[]).filter(item=>!(item&&item.type==="ayah"&&Number(item.surahNumber)===surahNumber&&Number(item.ayahNumber)===ayahNumber));if((playlist.items||[]).length<before){removedFrom+=1;}});if(!removedFrom){this.closeAyahPlaylistMenu();return;}this.syncSelectedPlaylistItems();this.persistCustomPlaylist();this.closeAyahPlaylistMenu();this.announce(`Removed Surah ${surahNumber}, Ayah ${ayahNumber} from ${removedFrom} playlist${removedFrom===1?"":"s"}.`);},toggleAyahInCustomPlaylist(ayah){var _this$surahDetails69,_this$activePlaylist7;if(!this.ensurePlaylistAuth("Please log in to edit playlists.",ayah||null)){return;}const surahNumber=Number(((_this$surahDetails69=this.surahDetails)===null||_this$surahDetails69===void 0?void 0:_this$surahDetails69.surahNumber)||this.selectedSurah||0);const ayahNumber=Number((ayah===null||ayah===void 0?void 0:ayah.numberInSurah)||(ayah===null||ayah===void 0?void 0:ayah.number)||0);if(!surahNumber||!ayahNumber)return;const match=(((_this$activePlaylist7=this.activePlaylist)===null||_this$activePlaylist7===void 0?void 0:_this$activePlaylist7.items)||[]).find(item=>item&&item.type==="ayah"&&Number(item.surahNumber)===surahNumber&&Number(item.ayahNumber)===ayahNumber);const ayahKey=this.buildAyahKey(surahNumber,ayahNumber);if(match){this.removeCustomPlaylistItem(match.id);this.triggerAyahFeedback(ayahKey,"Removed from playlist","feedback-pin-removed","trash","","",2200);return;}this.addAyahToCustomPlaylist(ayah);},removeCustomPlaylistItem(itemId){if(!this.activePlaylist)return;if(!this.ensurePlaylistAuth("Please log in to edit playlists.")){return;}this.activePlaylist.items=(this.activePlaylist.items||[]).filter(item=>item.id!==itemId);this.selectedPlaylistItemIds=(this.selectedPlaylistItemIds||[]).filter(id=>id!==String(itemId||""));this.persistCustomPlaylist();},clearCustomPlaylist(){if(!this.activePlaylist)return;if(!this.ensurePlaylistAuth("Please log in to edit playlists.")){return;}this.activePlaylist.items=[];this.selectedPlaylistItemIds=[];this.persistCustomPlaylist();},persistCustomPlaylist(){try{localStorage.setItem(this.getCustomPlaylistStorageKey(),JSON.stringify({playlists:this.playlists||[],activePlaylistId:this.activePlaylistId||""}));}catch(_){}},loadCustomPlaylist(){try{const raw=localStorage.getItem(this.getCustomPlaylistStorageKey());if(!raw){this.playlists=[];this.activePlaylistId="";this.playlistEditorName="";this.playlistEditorDescription="";this.isPlaylistEditorVisible=false;this.showPlaylistEditorConfirmAction=false;return;}const parsed=JSON.parse(raw);if(Array.isArray(parsed===null||parsed===void 0?void 0:parsed.playlists)&&parsed.playlists.length){this.playlists=parsed.playlists.map(playlist=>({id:String((playlist===null||playlist===void 0?void 0:playlist.id)||"").trim()||this.createDefaultPlaylist().id,name:(()=>{const rawName=String((playlist===null||playlist===void 0?void 0:playlist.name)||"").trim();if(!rawName)return"Untitled Playlist";return rawName.toLowerCase()==="my playlist"?"Untitled Playlist":rawName;})(),description:String((playlist===null||playlist===void 0?void 0:playlist.description)||""),items:Array.isArray(playlist===null||playlist===void 0?void 0:playlist.items)?playlist.items.filter(item=>String((item===null||item===void 0?void 0:item.type)||"")==="ayah").map(item=>{const surahNumber=Number((item===null||item===void 0?void 0:item.surahNumber)||0);const ayahNumber=Number((item===null||item===void 0?void 0:item.ayahNumber)||0);return _objectSpread(_objectSpread({},item),{},{id:String((item===null||item===void 0?void 0:item.id)||"").trim()||this.buildCustomPlaylistItemId("ayah",surahNumber||"x",ayahNumber||"x"),type:"ayah",surahNumber,ayahNumber,createdAt:Number(item===null||item===void 0?void 0:item.createdAt)||Date.now()});}):[]}));this.activePlaylistId=String((parsed===null||parsed===void 0?void 0:parsed.activePlaylistId)||"")||String(this.playlists[0].id);if(!this.playlists.some(playlist=>String(playlist.id)===String(this.activePlaylistId))){this.activePlaylistId=String(this.playlists[0].id);}this.syncPlaylistEditorFromActive();return;}this.playlists=[];this.activePlaylistId="";this.playlistEditorName="";this.playlistEditorDescription="";this.isPlaylistEditorVisible=false;this.showPlaylistEditorConfirmAction=false;}catch(_){}},openCreatePlaylistModal(ayah=null){if(!this.ensurePlaylistAuth("Please log in to create playlists.",ayah||null)){return;}this.createPlaylistName="";this.createPlaylistDescription="";this.pendingAyahForNewPlaylist=ayah||null;this.closeAyahPlaylistMenu();this.showCreatePlaylistModal=true;},closeCreatePlaylistModal(){this.showCreatePlaylistModal=false;this.pendingAyahForNewPlaylist=null;},createPlaylistFromModal(){if(!this.ensurePlaylistAuth("Please log in to create playlists.",this.pendingAyahForNewPlaylist||null)){return;}const next=this.createDefaultPlaylist();next.name=String(this.createPlaylistName||"").trim()||"Untitled Playlist";next.description=String(this.createPlaylistDescription||"");this.playlists=[...(this.playlists||[]),next];this.selectPlaylist(next.id);if(this.pendingAyahForNewPlaylist){this.addAyahToCustomPlaylist(this.pendingAyahForNewPlaylist,{announceAction:true});}this.showCreatePlaylistModal=false;this.pendingAyahForNewPlaylist=null;this.persistCustomPlaylist();},getAyahPlaylistMenuKey(ayah){var _this$surahDetails70;const surahNumber=Number(((_this$surahDetails70=this.surahDetails)===null||_this$surahDetails70===void 0?void 0:_this$surahDetails70.surahNumber)||this.selectedSurah||0);const ayahNumber=Number((ayah===null||ayah===void 0?void 0:ayah.numberInSurah)||(ayah===null||ayah===void 0?void 0:ayah.number)||0);if(!surahNumber||!ayahNumber)return"";return this.buildAyahKey(surahNumber,ayahNumber);},onAyahPlaylistPrimaryAction(ayah){if(!ayah)return;if(!this.ensurePlaylistAuth("Please log in to add ayahs to playlists.",ayah)){return;}this.toggleAyahPlaylistMenu(ayah);},toggleAyahPlaylistMenu(ayah){const key=this.getAyahPlaylistMenuKey(ayah);if(!key)return;this.openAyahPlaylistMenuKey=this.openAyahPlaylistMenuKey===key?"":key;this.openAyahPlaylistExistingSubmenuKey="";},toggleAyahExistingPlaylistSubmenu(ayah){const key=this.getAyahPlaylistMenuKey(ayah);if(!key)return;if(this.openAyahPlaylistMenuKey!==key){this.openAyahPlaylistMenuKey=key;}this.openAyahPlaylistExistingSubmenuKey=this.openAyahPlaylistExistingSubmenuKey===key?"":key;},closeAyahPlaylistMenu(){this.openAyahPlaylistMenuKey="";this.openAyahPlaylistExistingSubmenuKey="";},saveAyahToActivePlaylist(ayah){if(!this.ensurePlaylistAuth("Please log in to add ayahs to playlists.",ayah||null)){this.closeAyahPlaylistMenu();return;}if(!this.activePlaylist){const next=this.createDefaultPlaylist({name:"",description:""});this.playlists=[...(this.playlists||[]),next];this.selectPlaylist(next.id);}this.addAyahToCustomPlaylist(ayah,{announceAction:true});this.closeAyahPlaylistMenu();},saveAyahToCustomPlaylist(ayah,playlistId){if(!this.ensurePlaylistAuth("Please log in to add ayahs to playlists.",ayah||null)){this.closeAyahPlaylistMenu();return;}this.addAyahToCustomPlaylist(ayah,{announceAction:true,playlistId});this.closeAyahPlaylistMenu();},removeAyahFromActivePlaylist(ayah){if(!this.activePlaylist)return;this.removeAyahFromCustomPlaylist(ayah,this.activePlaylist.id,{closeMenu:true,persist:true,announceAction:true});},async playCustomPlaylistItem(item){if(!item)return;if(String(item.type||"")!=="ayah")return;const surahNumber=Number(item.surahNumber||0);const targetAyah=Number(item.ayahNumber||0);if(!surahNumber||!targetAyah)return;this.suppressPlaybackScrollSync=true;try{if(String(this.selectedSurah)!==String(surahNumber)){await this.selectSurah(String(surahNumber),{skipScroll:true});}const index=this.resolveAyahIndexByNumber(targetAyah);const safeIndex=index>=0?index:Math.max(0,targetAyah-1);this.suppressPlaybackScrollOnce=true;this.playAudio(safeIndex,{playlistSinglePlay:true});}finally{setTimeout(()=>{this.suppressPlaybackScrollSync=false;},0);}},seekToPosition:function(event){const audio=this.audioElements[this.currentlyPlayingIndex];if(!audio||!audio.duration)return;const progressBar=this.$refs.progressBar;if(!progressBar)return;const rect=progressBar.getBoundingClientRect();const clickX=event.clientX-rect.left;const percentage=clickX/rect.width;const newTime=percentage*audio.duration;audio.currentTime=Math.max(0,Math.min(newTime,audio.duration));// Update progress immediately
this.updateProgress(this.currentlyPlayingIndex);console.log(`Seeking to ${newTime.toFixed(2)}s (${(percentage*100).toFixed(1)}%)`);},onProgressDown(e){var _e$touches$;if(!this.$refs.progressBar)return;const isTouch=e.type==="touchstart";const clientX=isTouch?e.touches&&((_e$touches$=e.touches[0])===null||_e$touches$===void 0?void 0:_e$touches$.clientX):e.clientX;this.isScrubbing=true;// bind listeners once
this._boundMove=this.onProgressMove;this._boundUp=this.onProgressUp;window.addEventListener("mousemove",this._boundMove,{passive:false});window.addEventListener("touchmove",this._boundMove,{passive:false});window.addEventListener("mouseup",this._boundUp,{passive:true});window.addEventListener("touchend",this._boundUp,{passive:true});this._updateScrubAt(clientX);},onProgressMove(e){var _e$touches$2,_e$preventDefault;if(!this.isScrubbing)return;const isTouch=e.type==="touchmove";const clientX=isTouch?e.touches&&((_e$touches$2=e.touches[0])===null||_e$touches$2===void 0?void 0:_e$touches$2.clientX):e.clientX;if(clientX==null)return;(_e$preventDefault=e.preventDefault)===null||_e$preventDefault===void 0||_e$preventDefault.call(e);this._updateScrubAt(clientX);},onProgressUp(){this.isScrubbing=false;window.removeEventListener("mousemove",this._boundMove);window.removeEventListener("touchmove",this._boundMove);window.removeEventListener("mouseup",this._boundUp);window.removeEventListener("touchend",this._boundUp);this._boundMove=null;this._boundUp=null;},_updateScrubAt(clientX){const audio=this.audioElements[this.currentlyPlayingIndex];if(!audio||!audio.duration)return;const bar=this.$refs.progressBar;if(!bar)return;const rect=bar.getBoundingClientRect();const x=Math.max(0,Math.min(clientX-rect.left,rect.width));const pct=rect.width>0?x/rect.width:0;const newTime=pct*audio.duration;audio.currentTime=Math.max(0,Math.min(newTime,audio.duration));this.updateProgress(this.currentlyPlayingIndex);},cyclePlaybackSpeed:function(){const speeds=Array.isArray(this.playbackSpeeds)&&this.playbackSpeeds.length?this.playbackSpeeds:[1];const currentIndex=Math.max(0,speeds.indexOf(Number(this.playbackSpeed)||1));const nextIndex=(currentIndex+1)%speeds.length;const nextSpeed=speeds[nextIndex];this.currentSpeedIndex=nextIndex;this.playbackSpeed=nextSpeed;this.showToast(`Playback speed: ${nextSpeed}x`,2200);},animateVisualizer:function(){if(!this.isAudioPlaying[this.currentlyPlayingIndex])return;const now=window.performance?performance.now():Date.now();if(now-this.lastVizAt<33){// ~30fps cap
return requestAnimationFrame(()=>this.animateVisualizer());}this.lastVizAt=now;// Create animated bars based on audio volume (simulated)
const audio=this.audioElements[this.currentlyPlayingIndex];const volume=audio?Math.min(audio.volume*2,1):0.3;this.visualizerBars=this.visualizerBars.map(()=>Math.random()*80*volume+10);requestAnimationFrame(()=>this.animateVisualizer());},setPlaybackMode(mode){const validModes=["continuous","repeat","manual"];const normalized=validModes.includes(mode)?mode:"continuous";this.playbackMode=normalized;try{localStorage.setItem("playbackMode",normalized);}catch(_){}if(normalized!=="repeat"){this.preferredPlaybackMode=normalized;try{localStorage.setItem("lastNonRepeatPlaybackMode",normalized);}catch(_){}}},toggleRepeat(){if(this.isRepeatMode){this.setPlaybackMode(this.preferredPlaybackMode||"continuous");}else{this.setPlaybackMode("repeat");}},closeOffcanvas(){this.prepareSettingsDraft();const el=this.$refs.surahOffcanvas;if(!el||!(window&&window.bootstrap&&window.bootstrap.Offcanvas))return;const instance=window.bootstrap.Offcanvas.getInstance(el)||window.bootstrap.Offcanvas.getOrCreateInstance(el);instance.hide();}})});

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=5e82f99b&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=5e82f99b&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./resources/components/styles/SuratComponent.style.css?vue&type=style&index=0&id=637d02d8&scoped=true&lang=css&external":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./resources/components/styles/SuratComponent.style.css?vue&type=style&index=0&id=637d02d8&scoped=true&lang=css&external ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/scripts/SuratComponent.script.js?vue&type=script&lang=js&external":
/*!************************************************************************************************!*\
  !*** ./resources/components/scripts/SuratComponent.script.js?vue&type=script&lang=js&external ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_SuratComponent_script_js_vue_type_script_lang_js_external__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_SuratComponent_script_js_vue_type_script_lang_js_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./SuratComponent.script.js?vue&type=script&lang=js&external */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./resources/components/scripts/SuratComponent.script.js?vue&type=script&lang=js&external");
 

/***/ }),

/***/ "./resources/components/scripts/surat.voice-commands.js":
/*!**************************************************************!*\
  !*** ./resources/components/scripts/surat.voice-commands.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VOICE_COMMAND_DATA: () => (/* binding */ VOICE_COMMAND_DATA),
/* harmony export */   VOICE_COMMAND_GUIDE: () => (/* binding */ VOICE_COMMAND_GUIDE),
/* harmony export */   voiceCommandMethods: () => (/* binding */ voiceCommandMethods)
/* harmony export */ });
const VOICE_COMMAND_DATA = {
  voiceCommandsPreferenceBaseKey: "surat_voice_commands_enabled",
  voiceCommandsEnabled: false,
  voiceCommandListening: false,
  voiceCommandError: "",
  voiceCommandLastTranscript: "",
  voiceCommandPendingTranscript: "",
  voiceCommandProcessTimer: null,
  voiceCommandCommitDelayMs: 1400,
  voiceCommandRecognitionInstance: null,
  voiceCommandRestartTimer: null,
  voiceCommandLocale: "en-US"
};
const VOICE_COMMAND_GUIDE = {
  intro: "Speak naturally. The parser listens for keywords, so extra words before or after still work.",
  tips: ["Turn voice commands on from the microphone button, then wait for the mic indicator.", "Say the full command, then pause briefly. Commands are processed after a short silence.", "Use clear number phrases like 2, 21, twenty one, or 21st."],
  groups: [{
    id: "playback",
    title: "Playback controls",
    iconClass: "bi-play-circle",
    summary: "Control the current ayah audio without touching playback buttons.",
    commands: [{
      id: "play",
      label: "Play or resume",
      keywords: ["play", "resume", "start", "continue"],
      example: "please continue the recitation"
    }, {
      id: "pause",
      label: "Pause playback",
      keywords: ["pause", "hold"],
      example: "pause for a moment"
    }, {
      id: "stop",
      label: "Stop playback",
      keywords: ["stop", "halt"],
      example: "stop now"
    }]
  }, {
    id: "ayah-navigation",
    title: "Ayah navigation",
    iconClass: "bi-signpost-2",
    summary: "Move around ayahs inside the current surah or jump directly to an ayah number.",
    commands: [{
      id: "next-ayah",
      label: "Next ayah",
      keywords: ["next", "forward", "skip", "next ayah", "next verse"],
      example: "go to the next ayah"
    }, {
      id: "previous-ayah",
      label: "Previous ayah",
      keywords: ["previous", "prev", "back", "previous ayah", "previous verse"],
      example: "move me to the previous verse"
    }, {
      id: "ayah-number",
      label: "Open ayah by number",
      keywords: ["ayah X", "verse X", "ayah number X"],
      example: "play verse twenty one"
    }]
  }, {
    id: "surah-navigation",
    title: "Surah navigation",
    iconClass: "bi-compass",
    summary: "Switch surahs relatively or jump directly to an exact surah and ayah.",
    commands: [{
      id: "next-surah",
      label: "Next surah",
      keywords: ["next surah", "next chapter", "surah next"],
      example: "take me to the next surah"
    }, {
      id: "previous-surah",
      label: "Previous surah",
      keywords: ["previous surah", "previous chapter", "surah previous"],
      example: "go to previous chapter"
    }, {
      id: "surah-number",
      label: "Open surah by number",
      keywords: ["surah X", "chapter X", "surah number X"],
      example: "open surah thirty six"
    }, {
      id: "surah-ayah",
      label: "Open exact location",
      keywords: ["surah X ayah Y", "chapter X verse Y"],
      example: "take me to surah 2 ayah 255"
    }]
  }]
};
const voiceCommandMethods = {
  normalizeVoiceCommandTranscript(value = "") {
    return String(value || "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
  },
  parseSpokenNumber(value = "") {
    const normalized = this.normalizeVoiceCommandTranscript(value);
    if (!normalized) return null;
    const digitMatch = normalized.match(/\b(\d{1,3})(?:st|nd|rd|th)?\b/);
    if (digitMatch !== null && digitMatch !== void 0 && digitMatch[1]) {
      const parsedDigits = Number(digitMatch[1]);
      return Number.isFinite(parsedDigits) ? parsedDigits : null;
    }
    const ones = {
      zero: 0,
      one: 1,
      first: 1,
      two: 2,
      second: 2,
      three: 3,
      third: 3,
      four: 4,
      fourth: 4,
      five: 5,
      fifth: 5,
      six: 6,
      sixth: 6,
      seven: 7,
      seventh: 7,
      eight: 8,
      eighth: 8,
      nine: 9,
      ninth: 9,
      ten: 10,
      tenth: 10,
      eleven: 11,
      eleventh: 11,
      twelve: 12,
      twelfth: 12,
      thirteen: 13,
      thirteenth: 13,
      fourteen: 14,
      fourteenth: 14,
      fifteen: 15,
      fifteenth: 15,
      sixteen: 16,
      sixteenth: 16,
      seventeen: 17,
      seventeenth: 17,
      eighteen: 18,
      eighteenth: 18,
      nineteen: 19,
      nineteenth: 19
    };
    const tens = {
      twenty: 20,
      twentieth: 20,
      thirty: 30,
      thirtieth: 30,
      forty: 40,
      fortieth: 40,
      fifty: 50,
      fiftieth: 50,
      sixty: 60,
      sixtieth: 60,
      seventy: 70,
      seventieth: 70,
      eighty: 80,
      eightieth: 80,
      ninety: 90,
      ninetieth: 90
    };
    const tokens = normalized.replace(/-/g, " ").split(/\s+/).filter(Boolean);
    if (!tokens.length) return null;
    let total = 0;
    let current = 0;
    let found = false;
    for (const token of tokens) {
      if (token === "and") continue;
      if (Object.prototype.hasOwnProperty.call(ones, token)) {
        current += ones[token];
        found = true;
        continue;
      }
      if (Object.prototype.hasOwnProperty.call(tens, token)) {
        current += tens[token];
        found = true;
        continue;
      }
      if (token === "hundred") {
        current = (current || 1) * 100;
        found = true;
        continue;
      }
      if (token === "thousand") {
        total += (current || 1) * 1000;
        current = 0;
        found = true;
        continue;
      }
      if (found) break;
    }
    if (!found) return null;
    const parsed = total + current;
    return Number.isFinite(parsed) ? parsed : null;
  },
  extractVoiceCommandAyahNumber(transcript = "") {
    const normalized = this.normalizeVoiceCommandTranscript(transcript);
    if (!normalized) return null;
    const digitMatch = normalized.match(/\b(?:verse|verses|ayah|ayahs|aya|ayas)\s*(?:number\s*)?(\d{1,3})(?:st|nd|rd|th)?\b/);
    if (digitMatch !== null && digitMatch !== void 0 && digitMatch[1]) {
      const parsedDigits = Number(digitMatch[1]);
      return Number.isFinite(parsedDigits) ? parsedDigits : null;
    }
    const phraseMatch = normalized.match(/\b(?:verse|verses|ayah|ayahs|aya|ayas)\s*(?:number\s*)?([a-z0-9\s-]+)/i);
    if (!(phraseMatch !== null && phraseMatch !== void 0 && phraseMatch[1])) return null;
    const candidate = String(phraseMatch[1] || "").split(/\b(?:play|pause|stop|next|forward|skip|previous|prev|back|surah|surahs|sura|suras|chapter|chapters|resume|start|continue|please|thanks|go|move|take|jump|open|navigate)\b/i)[0].trim();
    return this.parseSpokenNumber(candidate);
  },
  extractVoiceCommandSurahNumber(transcript = "") {
    const normalized = this.normalizeVoiceCommandTranscript(transcript);
    if (!normalized) return null;
    const digitMatch = normalized.match(/\b(?:surah|surahs|sura|suras|chapter|chapters)\s*(?:number\s*)?(\d{1,3})(?:st|nd|rd|th)?\b/);
    if (digitMatch !== null && digitMatch !== void 0 && digitMatch[1]) {
      const parsedDigits = Number(digitMatch[1]);
      return Number.isFinite(parsedDigits) ? parsedDigits : null;
    }
    const phraseMatch = normalized.match(/\b(?:surah|surahs|sura|suras|chapter|chapters)\s*(?:number\s*)?([a-z0-9\s-]+)/i);
    if (!(phraseMatch !== null && phraseMatch !== void 0 && phraseMatch[1])) return null;
    const candidate = String(phraseMatch[1] || "").split(/\b(?:ayah|ayahs|aya|ayas|verse|verses|play|pause|stop|next|forward|skip|previous|prev|back|resume|start|continue|please|thanks|go|move|take|jump|open|navigate)\b/i)[0].trim();
    return this.parseSpokenNumber(candidate);
  },
  hasVoiceCommandPattern(transcript = "", patterns = []) {
    if (!transcript || !Array.isArray(patterns) || !patterns.length) {
      return false;
    }
    return patterns.some(pattern => pattern.test(transcript));
  },
  getVoiceCommandCurrentIndex() {
    const total = Array.isArray(this.filteredAyahs) ? this.filteredAyahs.length : 0;
    if (!total) return -1;
    const playingIndex = Number(this.currentlyPlayingIndex);
    if (this.isAnyAudioPlaying && Number.isInteger(playingIndex) && playingIndex >= 0 && playingIndex < total) {
      return playingIndex;
    }
    const selectedIndex = Number(this.selectedCardIndex);
    if (Number.isInteger(selectedIndex) && selectedIndex >= 0 && selectedIndex < total) {
      return selectedIndex;
    }
    return 0;
  },
  getAyahNumberByIndex(index) {
    var _this$filteredAyahs;
    const safeIndex = Number(index);
    const ayah = (_this$filteredAyahs = this.filteredAyahs) === null || _this$filteredAyahs === void 0 ? void 0 : _this$filteredAyahs[safeIndex];
    return Number((ayah === null || ayah === void 0 ? void 0 : ayah.numberInSurah) || (ayah === null || ayah === void 0 ? void 0 : ayah.number) || safeIndex + 1);
  },
  playVoiceCommandRelativeAyah(step = 1) {
    const total = Array.isArray(this.filteredAyahs) ? this.filteredAyahs.length : 0;
    if (!total) return false;
    const currentIndex = this.getVoiceCommandCurrentIndex();
    if (currentIndex < 0) return false;
    const direction = step >= 0 ? 1 : -1;
    const targetIndex = Math.max(0, Math.min(total - 1, currentIndex + direction));
    if (targetIndex === currentIndex) {
      this.showToast(direction > 0 ? "You are already on the last ayah." : "You are already on the first ayah.", 2200);
      return false;
    }
    if (this.isAnyAudioPlaying && currentIndex >= 0) {
      this.stopAudio(currentIndex);
    }
    this.selectCard(targetIndex);
    this.scrollToAyahIndex(targetIndex, {
      settle: true,
      force: true,
      behavior: "smooth"
    });
    this.playAudio(targetIndex);
    const ayahNumber = this.getAyahNumberByIndex(targetIndex);
    this.showToast(`Voice command: ayah ${ayahNumber}.`, 2200);
    this.announce(`Playing ayah ${ayahNumber}.`);
    return true;
  },
  async playVoiceCommandAyahNumber(ayahNumber, options = {}) {
    const {
      autoplay = true
    } = options;
    const targetAyah = Number(ayahNumber);
    const totalAyahs = Number(this.totalAyahs || (Array.isArray(this.filteredAyahs) ? this.filteredAyahs.length : 0));
    if (!targetAyah || !totalAyahs) return false;
    if (targetAyah < 1 || targetAyah > totalAyahs) {
      this.showToast(`Ayah ${targetAyah} is not in this surah.`, 2400);
      return false;
    }
    const hasSearchFilter = !!String(this.searchQuery || this.debouncedQuery || "").trim();
    if (hasSearchFilter) {
      this.clearMainAyahSearchFilter();
      await this.$nextTick();
    }
    let targetIndex = this.resolveAyahIndexByNumber(targetAyah);
    if (targetIndex < 0) {
      targetIndex = Math.max(0, targetAyah - 1);
    }
    this.selectCard(targetIndex);
    this.navigateToAyahNumber(targetAyah, {
      clearMainFilter: false,
      precise: true
    });
    if (autoplay) {
      this.playAudio(targetIndex);
      this.showToast(`Voice command: play ayah ${targetAyah}.`, 2400);
      this.announce(`Playing ayah ${targetAyah}.`);
    } else {
      this.showToast(`Voice command: ayah ${targetAyah}.`, 2200);
      this.announce(`Opened ayah ${targetAyah}.`);
    }
    return true;
  },
  async playVoiceCommandRelativeSurah(step = 1) {
    var _this$surahDetails;
    const currentSurah = Number(((_this$surahDetails = this.surahDetails) === null || _this$surahDetails === void 0 ? void 0 : _this$surahDetails.surahNumber) || this.selectedSurah || 1);
    const direction = step >= 0 ? 1 : -1;
    const targetSurah = Math.max(1, Math.min(114, currentSurah + direction));
    if (targetSurah === currentSurah) {
      this.showToast(direction > 0 ? "You are already on the last surah." : "You are already on the first surah.", 2200);
      return false;
    }
    await this.selectSurah(String(targetSurah), {
      skipScroll: true
    });
    this.selectCard(0);
    this.playAudio(0);
    this.showToast(`Voice command: Surah ${targetSurah}.`, 2400);
    this.announce(`Opened Surah ${targetSurah}.`);
    return true;
  },
  async goToVoiceCommandSurah(surahNumber, options = {}) {
    const {
      ayahNumber = 1,
      autoplay = true
    } = options;
    const targetSurah = Number(surahNumber);
    const targetAyah = Number(ayahNumber || 1);
    if (!targetSurah || targetSurah < 1 || targetSurah > 114) {
      this.showToast(`Surah ${surahNumber} is invalid. Use 1 to 114.`, 2600);
      return false;
    }
    if (!targetAyah || targetAyah < 1) {
      this.showToast(`Ayah ${ayahNumber} is invalid.`, 2200);
      return false;
    }
    await this.selectSurah(String(targetSurah), {
      skipScroll: true
    });
    const totalAyahs = Number(this.totalAyahs || (Array.isArray(this.filteredAyahs) ? this.filteredAyahs.length : 0));
    if (!totalAyahs || targetAyah > totalAyahs) {
      this.showToast(`Surah ${targetSurah} does not have ayah ${targetAyah}.`, 2600);
      return false;
    }
    let targetIndex = this.resolveAyahIndexByNumber(targetAyah);
    if (targetIndex < 0) {
      targetIndex = Math.max(0, targetAyah - 1);
    }
    this.selectCard(targetIndex);
    this.navigateToAyahNumber(targetAyah, {
      clearMainFilter: true,
      precise: true
    });
    if (autoplay) {
      this.playAudio(targetIndex);
    }
    this.showToast(`Voice command: Surah ${targetSurah}, ayah ${targetAyah}.`, 2600);
    this.announce(`Opened Surah ${targetSurah}, ayah ${targetAyah}.`);
    return true;
  },
  handleVoiceCommandPlay() {
    const targetIndex = this.getVoiceCommandCurrentIndex();
    if (targetIndex < 0) return false;
    const ayahNumber = this.getAyahNumberByIndex(targetIndex);
    this.selectCard(targetIndex);
    this.playAudio(targetIndex);
    this.showToast(`Voice command: play ayah ${ayahNumber}.`, 2200);
    this.announce(`Playing ayah ${ayahNumber}.`);
    return true;
  },
  handleVoiceCommandPause() {
    const targetIndex = this.getVoiceCommandCurrentIndex();
    if (targetIndex < 0 || !this.isAnyAudioPlaying) return false;
    this.pauseAudio(targetIndex);
    this.showToast("Voice command: pause.", 1800);
    this.announce("Audio paused.");
    return true;
  },
  handleVoiceCommandStop() {
    const targetIndex = this.getVoiceCommandCurrentIndex();
    if (targetIndex < 0) return false;
    this.stopAudio(targetIndex);
    this.showToast("Voice command: stop.", 1800);
    this.announce("Audio stopped.");
    return true;
  },
  async executeVoiceCommandTranscript(transcript = "") {
    const normalized = this.normalizeVoiceCommandTranscript(transcript);
    if (!normalized) return false;
    this.voiceCommandLastTranscript = normalized;
    const hasStop = /\b(stop|halt)\b/.test(normalized);
    const hasPause = /\b(pause|hold)\b/.test(normalized);
    const hasPlay = /\b(play|resume|start|continue)\b/.test(normalized);
    const hasNext = /\b(next|forward|skip)\b/.test(normalized);
    const hasPrevious = /\b(previous|prev|back)\b/.test(normalized);
    const hasNextSurahCommand = this.hasVoiceCommandPattern(normalized, [/\b(?:next|forward|skip)\s+(?:surah|surahs|sura|suras|chapter|chapters)\b/, /\b(?:surah|surahs|sura|suras|chapter|chapters)\s+(?:next|forward|skip)\b/, /\b(?:go|move|jump|open|take|navigate)\s+(?:me\s+)?(?:to\s+)?(?:the\s+)?(?:next|forward|skip)\s+(?:surah|surahs|sura|suras|chapter|chapters)\b/]);
    const hasPreviousSurahCommand = this.hasVoiceCommandPattern(normalized, [/\b(?:previous|prev|back)\s+(?:surah|surahs|sura|suras|chapter|chapters)\b/, /\b(?:surah|surahs|sura|suras|chapter|chapters)\s+(?:previous|prev|back)\b/, /\b(?:go|move|jump|open|take|navigate)\s+(?:me\s+)?(?:to\s+)?(?:the\s+)?(?:previous|prev|back)\s+(?:surah|surahs|sura|suras|chapter|chapters)\b/]);
    const hasNextAyahCommand = this.hasVoiceCommandPattern(normalized, [/\b(?:next|forward|skip)\s+(?:ayah|ayahs|aya|ayas|verse|verses)\b/, /\b(?:ayah|ayahs|aya|ayas|verse|verses)\s+(?:next|forward|skip)\b/, /\b(?:go|move|jump|open|take|navigate)\s+(?:me\s+)?(?:to\s+)?(?:the\s+)?(?:next|forward|skip)\s+(?:ayah|ayahs|aya|ayas|verse|verses)\b/]);
    const hasPreviousAyahCommand = this.hasVoiceCommandPattern(normalized, [/\b(?:previous|prev|back)\s+(?:ayah|ayahs|aya|ayas|verse|verses)\b/, /\b(?:ayah|ayahs|aya|ayas|verse|verses)\s+(?:previous|prev|back)\b/, /\b(?:go|move|jump|open|take|navigate)\s+(?:me\s+)?(?:to\s+)?(?:the\s+)?(?:previous|prev|back)\s+(?:ayah|ayahs|aya|ayas|verse|verses)\b/]);
    const surahNumber = this.extractVoiceCommandSurahNumber(normalized);
    const ayahNumber = this.extractVoiceCommandAyahNumber(normalized);
    if (hasStop) {
      return this.handleVoiceCommandStop();
    }
    if (hasPause) {
      return this.handleVoiceCommandPause();
    }
    if (hasNextSurahCommand) {
      return this.playVoiceCommandRelativeSurah(1);
    }
    if (hasPreviousSurahCommand) {
      return this.playVoiceCommandRelativeSurah(-1);
    }
    if (Number.isFinite(Number(surahNumber)) && Number(surahNumber) > 0) {
      return this.goToVoiceCommandSurah(surahNumber, {
        ayahNumber: Number.isFinite(Number(ayahNumber)) && Number(ayahNumber) > 0 ? ayahNumber : 1,
        autoplay: true
      });
    }
    if (Number.isFinite(Number(ayahNumber)) && Number(ayahNumber) > 0) {
      return this.playVoiceCommandAyahNumber(ayahNumber, {
        autoplay: true
      });
    }
    if (hasNextAyahCommand) {
      return this.playVoiceCommandRelativeAyah(1);
    }
    if (hasPreviousAyahCommand) {
      return this.playVoiceCommandRelativeAyah(-1);
    }
    if (hasNext) {
      return this.playVoiceCommandRelativeAyah(1);
    }
    if (hasPrevious) {
      return this.playVoiceCommandRelativeAyah(-1);
    }
    if (hasPlay) {
      return this.handleVoiceCommandPlay();
    }
    this.showToast(`Voice command not recognized: "${normalized}". Try "next surah", "play verse 5", or "surah 2 ayah 255".`, 2600);
    return false;
  },
  queueVoiceCommandTranscript(transcript = "") {
    const text = String(transcript || "").trim();
    if (!text) return;
    this.voiceCommandPendingTranscript = String(`${this.voiceCommandPendingTranscript || ""} ${text}`).trim().slice(0, 520);
    clearTimeout(this.voiceCommandProcessTimer);
    this.voiceCommandProcessTimer = setTimeout(() => {
      void this.flushVoiceCommandTranscriptQueue();
    }, Number(this.voiceCommandCommitDelayMs) || 1400);
  },
  async flushVoiceCommandTranscriptQueue(options = {}) {
    const {
      force = false
    } = options;
    if (!force && !this.voiceCommandsEnabled) return false;
    const transcript = String(this.voiceCommandPendingTranscript || "").trim();
    clearTimeout(this.voiceCommandProcessTimer);
    this.voiceCommandProcessTimer = null;
    this.voiceCommandPendingTranscript = "";
    if (!transcript) return false;
    return this.executeVoiceCommandTranscript(transcript);
  },
  clearVoiceCommandTranscriptQueue() {
    clearTimeout(this.voiceCommandProcessTimer);
    this.voiceCommandProcessTimer = null;
    this.voiceCommandPendingTranscript = "";
  },
  initializeVoiceCommandRecognition() {
    if (typeof window === "undefined") return false;
    if (this.voiceCommandRecognitionInstance) return true;
    const SpeechRecognition = this.getSpeechRecognitionConstructor();
    if (!SpeechRecognition) {
      this.speechRecognitionSupported = false;
      this.voiceCommandError = this.getSpeechRecognitionErrorMessage("not-supported");
      return false;
    }
    let recognition = null;
    try {
      recognition = new SpeechRecognition();
    } catch (_) {
      this.voiceCommandError = this.getSpeechRecognitionErrorMessage("not-supported");
      return false;
    }
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = true;
    recognition.lang = typeof navigator !== "undefined" && navigator.language || this.voiceCommandLocale || "en-US";
    recognition.onstart = () => {
      this.voiceCommandListening = true;
      this.voiceCommandError = "";
    };
    recognition.onresult = event => {
      if (!this.voiceCommandsEnabled || !(event !== null && event !== void 0 && event.results)) return;
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        var _result$;
        const result = event.results[i];
        const text = (result === null || result === void 0 || (_result$ = result[0]) === null || _result$ === void 0 ? void 0 : _result$.transcript) || "";
        if (!text || !(result !== null && result !== void 0 && result.isFinal)) continue;
        finalTranscript += `${text} `;
      }
      const transcript = finalTranscript.trim();
      if (!transcript) return;
      this.queueVoiceCommandTranscript(transcript);
    };
    recognition.onerror = event => {
      const code = String((event === null || event === void 0 ? void 0 : event.error) || "").toLowerCase();
      this.voiceCommandListening = false;
      if (code === "aborted") return;
      this.voiceCommandError = this.getSpeechRecognitionErrorMessage(code);
      if (code === "not-allowed" || code === "service-not-allowed") {
        this.disableVoiceCommands({
          announce: false
        });
        return;
      }
      if (this.voiceCommandsEnabled) {
        clearTimeout(this.voiceCommandRestartTimer);
        this.voiceCommandRestartTimer = setTimeout(() => {
          this.startVoiceCommandListening({
            silentError: true
          });
        }, 650);
      }
    };
    recognition.onend = () => {
      this.voiceCommandListening = false;
      void this.flushVoiceCommandTranscriptQueue({
        force: true
      });
      if (!this.voiceCommandsEnabled || !this.isComponentAlive) return;
      if (typeof document !== "undefined" && document.visibilityState !== "visible") {
        return;
      }
      clearTimeout(this.voiceCommandRestartTimer);
      this.voiceCommandRestartTimer = setTimeout(() => {
        this.startVoiceCommandListening({
          silentError: true
        });
      }, 220);
    };
    this.voiceCommandRecognitionInstance = recognition;
    this.voiceCommandLocale = recognition.lang || "en-US";
    this.speechRecognitionSupported = true;
    return true;
  },
  startVoiceCommandListening(options = {}) {
    const {
      silentError = false
    } = options;
    if (!this.speechRecognitionSupported) {
      this.detectSpeechRecognitionSupport();
    }
    if (!this.speechRecognitionSupported) {
      this.voiceCommandError = this.getSpeechRecognitionErrorMessage("not-supported");
      if (!silentError) this.showToast(this.voiceCommandError, 2800);
      return false;
    }
    if (!this.isSpeechRecognitionSecureContext()) {
      this.voiceCommandError = this.getSpeechRecognitionErrorMessage("insecure-context");
      if (!silentError) this.showToast(this.voiceCommandError, 2800);
      return false;
    }
    if (!this.voiceCommandRecognitionInstance) {
      const initialized = this.initializeVoiceCommandRecognition();
      if (!initialized) {
        if (!silentError && this.voiceCommandError) {
          this.showToast(this.voiceCommandError, 2800);
        }
        return false;
      }
    }
    if (!this.voiceCommandRecognitionInstance) return false;
    if (this.speechRecognitionListening) {
      this.stopVoiceSearch();
    }
    if (this.voiceCommandListening) return true;
    this.clearVoiceCommandTranscriptQueue();
    this.voiceCommandError = "";
    try {
      this.voiceCommandRecognitionInstance.lang = typeof navigator !== "undefined" && navigator.language || this.voiceCommandLocale || "en-US";
      this.voiceCommandLocale = this.voiceCommandRecognitionInstance.lang;
      this.voiceCommandRecognitionInstance.start();
      this.voiceCommandListening = true;
      return true;
    } catch (error) {
      const name = String((error === null || error === void 0 ? void 0 : error.name) || "").toLowerCase();
      if (name === "invalidstateerror") {
        this.voiceCommandListening = true;
        return true;
      }
      if (name === "notallowederror" || name === "securityerror") {
        this.voiceCommandError = this.getSpeechRecognitionErrorMessage("not-allowed");
      } else {
        this.voiceCommandError = this.getSpeechRecognitionErrorMessage();
      }
      if (!silentError) this.showToast(this.voiceCommandError, 2800);
      return false;
    }
  },
  stopVoiceCommandListening(options = {}) {
    const {
      keepEnabled = false
    } = options;
    if (!keepEnabled) {
      this.voiceCommandsEnabled = false;
    }
    this.clearVoiceCommandTranscriptQueue();
    clearTimeout(this.voiceCommandRestartTimer);
    this.voiceCommandRestartTimer = null;
    if (!this.voiceCommandRecognitionInstance) {
      this.voiceCommandListening = false;
      return;
    }
    try {
      this.voiceCommandRecognitionInstance.stop();
    } catch (_) {
      // ignore stop race conditions
    }
    this.voiceCommandListening = false;
  },
  enableVoiceCommands(options = {}) {
    const {
      announce = true
    } = options;
    const started = this.startVoiceCommandListening({
      silentError: !announce
    });
    if (!started) {
      this.voiceCommandsEnabled = false;
      this.writeScopedBooleanPreference(this.voiceCommandsPreferenceBaseKey, false);
      return false;
    }
    this.voiceCommandsEnabled = true;
    this.writeScopedBooleanPreference(this.voiceCommandsPreferenceBaseKey, true);
    if (announce) {
      this.showToast("Voice commands: On. Try saying: play verse 5, next surah, or surah 2 ayah 255.", 3600);
      this.announce("Voice commands enabled.");
    }
    return true;
  },
  disableVoiceCommands(options = {}) {
    const {
      announce = true,
      persist = true
    } = options;
    this.stopVoiceCommandListening({
      keepEnabled: false
    });
    if (persist) {
      this.writeScopedBooleanPreference(this.voiceCommandsPreferenceBaseKey, false);
    }
    if (announce) {
      this.showToast("Voice commands: Off.", 2200);
      this.announce("Voice commands disabled.");
    }
  },
  toggleVoiceCommands() {
    if (this.voiceCommandsEnabled) {
      this.disableVoiceCommands();
      return;
    }
    this.enableVoiceCommands();
  },
  teardownVoiceCommandRecognition() {
    this.clearVoiceCommandTranscriptQueue();
    clearTimeout(this.voiceCommandRestartTimer);
    this.voiceCommandRestartTimer = null;
    if (!this.voiceCommandRecognitionInstance) return;
    try {
      this.voiceCommandRecognitionInstance.onstart = null;
      this.voiceCommandRecognitionInstance.onresult = null;
      this.voiceCommandRecognitionInstance.onerror = null;
      this.voiceCommandRecognitionInstance.onend = null;
      this.voiceCommandRecognitionInstance.stop();
    } catch (_) {
      // ignore teardown failures
    }
    this.voiceCommandRecognitionInstance = null;
    this.voiceCommandListening = false;
  },
  async initializeVoiceCommandPreference() {
    if (this.bookmarkAuthenticated && !this.bookmarkStorageUserId) {
      try {
        await this.fetchBookmarkStorageUserId();
      } catch (_) {
        // ignore preference scope lookup errors
      }
    }
    const enabled = this.readScopedBooleanPreference(this.voiceCommandsPreferenceBaseKey, false);
    this.voiceCommandsEnabled = !!enabled;
    if (!this.voiceCommandsEnabled) {
      this.voiceCommandError = "";
      return;
    }
    const started = this.startVoiceCommandListening({
      silentError: true
    });
    if (!started) {
      this.voiceCommandsEnabled = false;
      this.writeScopedBooleanPreference(this.voiceCommandsPreferenceBaseKey, false);
    }
  }
};

/***/ }),

/***/ "./resources/components/styles/SuratComponent.style.css?vue&type=style&index=0&id=637d02d8&scoped=true&lang=css&external":
/*!*******************************************************************************************************************************!*\
  !*** ./resources/components/styles/SuratComponent.style.css?vue&type=style&index=0&id=637d02d8&scoped=true&lang=css&external ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_SuratComponent_style_css_vue_type_style_index_0_id_637d02d8_scoped_true_lang_css_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./SuratComponent.style.css?vue&type=style&index=0&id=637d02d8&scoped=true&lang=css&external */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./resources/components/styles/SuratComponent.style.css?vue&type=style&index=0&id=637d02d8&scoped=true&lang=css&external");


/***/ }),

/***/ "./resources/components/vue/SuratComponent.vue":
/*!*****************************************************!*\
  !*** ./resources/components/vue/SuratComponent.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SuratComponent_vue_vue_type_template_id_637d02d8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SuratComponent.vue?vue&type=template&id=637d02d8&scoped=true */ "./resources/components/vue/SuratComponent.vue?vue&type=template&id=637d02d8&scoped=true");
/* harmony import */ var _scripts_SuratComponent_script_js_vue_type_script_lang_js_external__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/SuratComponent.script.js?vue&type=script&lang=js&external */ "./resources/components/scripts/SuratComponent.script.js?vue&type=script&lang=js&external");
/* harmony import */ var _styles_SuratComponent_style_css_vue_type_style_index_0_id_637d02d8_scoped_true_lang_css_external__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/SuratComponent.style.css?vue&type=style&index=0&id=637d02d8&scoped=true&lang=css&external */ "./resources/components/styles/SuratComponent.style.css?vue&type=style&index=0&id=637d02d8&scoped=true&lang=css&external");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_scripts_SuratComponent_script_js_vue_type_script_lang_js_external__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_SuratComponent_vue_vue_type_template_id_637d02d8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-637d02d8"],['__file',"resources/components/vue/SuratComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/SuratComponent.vue?vue&type=template&id=637d02d8&scoped=true":
/*!***********************************************************************************************!*\
  !*** ./resources/components/vue/SuratComponent.vue?vue&type=template&id=637d02d8&scoped=true ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SuratComponent_vue_vue_type_template_id_637d02d8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SuratComponent_vue_vue_type_template_id_637d02d8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SuratComponent.vue?vue&type=template&id=637d02d8&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SuratComponent.vue?vue&type=template&id=637d02d8&scoped=true");


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
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookmarkModal_vue_vue_type_style_index_0_id_5e82f99b_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookmarkModal.vue?vue&type=style&index=0&id=5e82f99b&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/BookmarkModal.vue?vue&type=style&index=0&id=5e82f99b&scoped=true&lang=css");


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

/***/ "./resources/js/utils/quran-mappings.js":
/*!**********************************************!*\
  !*** ./resources/js/utils/quran-mappings.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JUZ_START_MAPPING: () => (/* binding */ JUZ_START_MAPPING),
/* harmony export */   PAGE_START_MAPPING: () => (/* binding */ PAGE_START_MAPPING),
/* harmony export */   getJuzStart: () => (/* binding */ getJuzStart),
/* harmony export */   getPageStart: () => (/* binding */ getPageStart)
/* harmony export */ });
const JUZ_START_MAPPING = {
  1: {
    surah: 1,
    ayah: 1
  },
  2: {
    surah: 2,
    ayah: 142
  },
  3: {
    surah: 2,
    ayah: 253
  },
  4: {
    surah: 3,
    ayah: 93
  },
  5: {
    surah: 4,
    ayah: 24
  },
  6: {
    surah: 4,
    ayah: 148
  },
  7: {
    surah: 5,
    ayah: 82
  },
  8: {
    surah: 6,
    ayah: 111
  },
  9: {
    surah: 7,
    ayah: 88
  },
  10: {
    surah: 8,
    ayah: 41
  },
  11: {
    surah: 9,
    ayah: 93
  },
  12: {
    surah: 11,
    ayah: 6
  },
  13: {
    surah: 12,
    ayah: 53
  },
  14: {
    surah: 15,
    ayah: 1
  },
  15: {
    surah: 17,
    ayah: 1
  },
  16: {
    surah: 18,
    ayah: 75
  },
  17: {
    surah: 21,
    ayah: 1
  },
  18: {
    surah: 23,
    ayah: 1
  },
  19: {
    surah: 25,
    ayah: 21
  },
  20: {
    surah: 27,
    ayah: 56
  },
  21: {
    surah: 29,
    ayah: 46
  },
  22: {
    surah: 33,
    ayah: 31
  },
  23: {
    surah: 36,
    ayah: 28
  },
  24: {
    surah: 39,
    ayah: 32
  },
  25: {
    surah: 41,
    ayah: 47
  },
  26: {
    surah: 46,
    ayah: 1
  },
  27: {
    surah: 51,
    ayah: 31
  },
  28: {
    surah: 58,
    ayah: 1
  },
  29: {
    surah: 67,
    ayah: 1
  },
  30: {
    surah: 78,
    ayah: 1
  }
};
const PAGE_START_MAPPING = {
  1: {
    surah: 1,
    ayah: 1
  },
  2: {
    surah: 2,
    ayah: 1
  },
  3: {
    surah: 2,
    ayah: 6
  },
  4: {
    surah: 2,
    ayah: 17
  },
  5: {
    surah: 2,
    ayah: 25
  },
  6: {
    surah: 2,
    ayah: 30
  },
  7: {
    surah: 2,
    ayah: 38
  },
  8: {
    surah: 2,
    ayah: 49
  },
  9: {
    surah: 2,
    ayah: 58
  },
  10: {
    surah: 2,
    ayah: 62
  },
  11: {
    surah: 2,
    ayah: 70
  },
  12: {
    surah: 2,
    ayah: 77
  },
  13: {
    surah: 2,
    ayah: 84
  },
  14: {
    surah: 2,
    ayah: 89
  },
  15: {
    surah: 2,
    ayah: 94
  },
  16: {
    surah: 2,
    ayah: 102
  },
  17: {
    surah: 2,
    ayah: 106
  },
  18: {
    surah: 2,
    ayah: 113
  },
  19: {
    surah: 2,
    ayah: 120
  },
  20: {
    surah: 2,
    ayah: 127
  },
  21: {
    surah: 2,
    ayah: 135
  },
  22: {
    surah: 2,
    ayah: 142
  },
  23: {
    surah: 2,
    ayah: 146
  },
  24: {
    surah: 2,
    ayah: 154
  },
  25: {
    surah: 2,
    ayah: 164
  },
  26: {
    surah: 2,
    ayah: 170
  },
  27: {
    surah: 2,
    ayah: 177
  },
  28: {
    surah: 2,
    ayah: 182
  },
  29: {
    surah: 2,
    ayah: 187
  },
  30: {
    surah: 2,
    ayah: 191
  },
  31: {
    surah: 2,
    ayah: 197
  },
  32: {
    surah: 2,
    ayah: 203
  },
  33: {
    surah: 2,
    ayah: 211
  },
  34: {
    surah: 2,
    ayah: 216
  },
  35: {
    surah: 2,
    ayah: 220
  },
  36: {
    surah: 2,
    ayah: 225
  },
  37: {
    surah: 2,
    ayah: 231
  },
  38: {
    surah: 2,
    ayah: 234
  },
  39: {
    surah: 2,
    ayah: 238
  },
  40: {
    surah: 2,
    ayah: 246
  },
  41: {
    surah: 2,
    ayah: 249
  },
  42: {
    surah: 2,
    ayah: 253
  },
  43: {
    surah: 2,
    ayah: 257
  },
  44: {
    surah: 2,
    ayah: 260
  },
  45: {
    surah: 2,
    ayah: 265
  },
  46: {
    surah: 2,
    ayah: 270
  },
  47: {
    surah: 2,
    ayah: 275
  },
  48: {
    surah: 2,
    ayah: 282
  },
  49: {
    surah: 2,
    ayah: 283
  },
  50: {
    surah: 3,
    ayah: 1
  },
  51: {
    surah: 3,
    ayah: 10
  },
  52: {
    surah: 3,
    ayah: 16
  },
  53: {
    surah: 3,
    ayah: 23
  },
  54: {
    surah: 3,
    ayah: 30
  },
  55: {
    surah: 3,
    ayah: 38
  },
  56: {
    surah: 3,
    ayah: 46
  },
  57: {
    surah: 3,
    ayah: 53
  },
  58: {
    surah: 3,
    ayah: 62
  },
  59: {
    surah: 3,
    ayah: 71
  },
  60: {
    surah: 3,
    ayah: 78
  },
  61: {
    surah: 3,
    ayah: 84
  },
  62: {
    surah: 3,
    ayah: 92
  },
  63: {
    surah: 3,
    ayah: 101
  },
  64: {
    surah: 3,
    ayah: 109
  },
  65: {
    surah: 3,
    ayah: 116
  },
  66: {
    surah: 3,
    ayah: 122
  },
  67: {
    surah: 3,
    ayah: 133
  },
  68: {
    surah: 3,
    ayah: 141
  },
  69: {
    surah: 3,
    ayah: 149
  },
  70: {
    surah: 3,
    ayah: 154
  },
  71: {
    surah: 3,
    ayah: 158
  },
  72: {
    surah: 3,
    ayah: 166
  },
  73: {
    surah: 3,
    ayah: 174
  },
  74: {
    surah: 3,
    ayah: 181
  },
  75: {
    surah: 3,
    ayah: 187
  },
  76: {
    surah: 3,
    ayah: 195
  },
  77: {
    surah: 4,
    ayah: 1
  },
  78: {
    surah: 4,
    ayah: 7
  },
  79: {
    surah: 4,
    ayah: 12
  },
  80: {
    surah: 4,
    ayah: 15
  },
  81: {
    surah: 4,
    ayah: 20
  },
  82: {
    surah: 4,
    ayah: 24
  },
  83: {
    surah: 4,
    ayah: 27
  },
  84: {
    surah: 4,
    ayah: 34
  },
  85: {
    surah: 4,
    ayah: 38
  },
  86: {
    surah: 4,
    ayah: 45
  },
  87: {
    surah: 4,
    ayah: 52
  },
  88: {
    surah: 4,
    ayah: 60
  },
  89: {
    surah: 4,
    ayah: 66
  },
  90: {
    surah: 4,
    ayah: 75
  },
  91: {
    surah: 4,
    ayah: 80
  },
  92: {
    surah: 4,
    ayah: 87
  },
  93: {
    surah: 4,
    ayah: 92
  },
  94: {
    surah: 4,
    ayah: 95
  },
  95: {
    surah: 4,
    ayah: 102
  },
  96: {
    surah: 4,
    ayah: 106
  },
  97: {
    surah: 4,
    ayah: 114
  },
  98: {
    surah: 4,
    ayah: 122
  },
  99: {
    surah: 4,
    ayah: 128
  },
  100: {
    surah: 4,
    ayah: 135
  },
  101: {
    surah: 4,
    ayah: 141
  },
  102: {
    surah: 4,
    ayah: 148
  },
  103: {
    surah: 4,
    ayah: 155
  },
  104: {
    surah: 4,
    ayah: 163
  },
  105: {
    surah: 4,
    ayah: 171
  },
  106: {
    surah: 4,
    ayah: 176
  },
  107: {
    surah: 5,
    ayah: 3
  },
  108: {
    surah: 5,
    ayah: 6
  },
  109: {
    surah: 5,
    ayah: 10
  },
  110: {
    surah: 5,
    ayah: 14
  },
  111: {
    surah: 5,
    ayah: 18
  },
  112: {
    surah: 5,
    ayah: 24
  },
  113: {
    surah: 5,
    ayah: 32
  },
  114: {
    surah: 5,
    ayah: 37
  },
  115: {
    surah: 5,
    ayah: 42
  },
  116: {
    surah: 5,
    ayah: 46
  },
  117: {
    surah: 5,
    ayah: 51
  },
  118: {
    surah: 5,
    ayah: 58
  },
  119: {
    surah: 5,
    ayah: 65
  },
  120: {
    surah: 5,
    ayah: 71
  },
  121: {
    surah: 5,
    ayah: 77
  },
  122: {
    surah: 5,
    ayah: 83
  },
  123: {
    surah: 5,
    ayah: 90
  },
  124: {
    surah: 5,
    ayah: 96
  },
  125: {
    surah: 5,
    ayah: 104
  },
  126: {
    surah: 5,
    ayah: 109
  },
  127: {
    surah: 5,
    ayah: 114
  },
  128: {
    surah: 6,
    ayah: 1
  },
  129: {
    surah: 6,
    ayah: 9
  },
  130: {
    surah: 6,
    ayah: 19
  },
  131: {
    surah: 6,
    ayah: 28
  },
  132: {
    surah: 6,
    ayah: 36
  },
  133: {
    surah: 6,
    ayah: 45
  },
  134: {
    surah: 6,
    ayah: 53
  },
  135: {
    surah: 6,
    ayah: 60
  },
  136: {
    surah: 6,
    ayah: 69
  },
  137: {
    surah: 6,
    ayah: 74
  },
  138: {
    surah: 6,
    ayah: 82
  },
  139: {
    surah: 6,
    ayah: 91
  },
  140: {
    surah: 6,
    ayah: 95
  },
  141: {
    surah: 6,
    ayah: 102
  },
  142: {
    surah: 6,
    ayah: 111
  },
  143: {
    surah: 6,
    ayah: 119
  },
  144: {
    surah: 6,
    ayah: 125
  },
  145: {
    surah: 6,
    ayah: 132
  },
  146: {
    surah: 6,
    ayah: 138
  },
  147: {
    surah: 6,
    ayah: 143
  },
  148: {
    surah: 6,
    ayah: 147
  },
  149: {
    surah: 6,
    ayah: 152
  },
  150: {
    surah: 6,
    ayah: 158
  },
  151: {
    surah: 7,
    ayah: 1
  },
  152: {
    surah: 7,
    ayah: 12
  },
  153: {
    surah: 7,
    ayah: 23
  },
  154: {
    surah: 7,
    ayah: 31
  },
  155: {
    surah: 7,
    ayah: 38
  },
  156: {
    surah: 7,
    ayah: 44
  },
  157: {
    surah: 7,
    ayah: 52
  },
  158: {
    surah: 7,
    ayah: 58
  },
  159: {
    surah: 7,
    ayah: 68
  },
  160: {
    surah: 7,
    ayah: 74
  },
  161: {
    surah: 7,
    ayah: 82
  },
  162: {
    surah: 7,
    ayah: 88
  },
  163: {
    surah: 7,
    ayah: 96
  },
  164: {
    surah: 7,
    ayah: 105
  },
  165: {
    surah: 7,
    ayah: 121
  },
  166: {
    surah: 7,
    ayah: 131
  },
  167: {
    surah: 7,
    ayah: 138
  },
  168: {
    surah: 7,
    ayah: 144
  },
  169: {
    surah: 7,
    ayah: 150
  },
  170: {
    surah: 7,
    ayah: 156
  },
  171: {
    surah: 7,
    ayah: 160
  },
  172: {
    surah: 7,
    ayah: 164
  },
  173: {
    surah: 7,
    ayah: 171
  },
  174: {
    surah: 7,
    ayah: 179
  },
  175: {
    surah: 7,
    ayah: 188
  },
  176: {
    surah: 7,
    ayah: 196
  },
  177: {
    surah: 8,
    ayah: 1
  },
  178: {
    surah: 8,
    ayah: 9
  },
  179: {
    surah: 8,
    ayah: 17
  },
  180: {
    surah: 8,
    ayah: 26
  },
  181: {
    surah: 8,
    ayah: 34
  },
  182: {
    surah: 8,
    ayah: 41
  },
  183: {
    surah: 8,
    ayah: 46
  },
  184: {
    surah: 8,
    ayah: 53
  },
  185: {
    surah: 8,
    ayah: 62
  },
  186: {
    surah: 8,
    ayah: 70
  },
  187: {
    surah: 9,
    ayah: 1
  },
  188: {
    surah: 9,
    ayah: 7
  },
  189: {
    surah: 9,
    ayah: 14
  },
  190: {
    surah: 9,
    ayah: 21
  },
  191: {
    surah: 9,
    ayah: 27
  },
  192: {
    surah: 9,
    ayah: 32
  },
  193: {
    surah: 9,
    ayah: 37
  },
  194: {
    surah: 9,
    ayah: 41
  },
  195: {
    surah: 9,
    ayah: 48
  },
  196: {
    surah: 9,
    ayah: 55
  },
  197: {
    surah: 9,
    ayah: 62
  },
  198: {
    surah: 9,
    ayah: 69
  },
  199: {
    surah: 9,
    ayah: 73
  },
  200: {
    surah: 9,
    ayah: 80
  },
  201: {
    surah: 9,
    ayah: 87
  },
  202: {
    surah: 9,
    ayah: 94
  },
  203: {
    surah: 9,
    ayah: 100
  },
  204: {
    surah: 9,
    ayah: 107
  },
  205: {
    surah: 9,
    ayah: 112
  },
  206: {
    surah: 9,
    ayah: 118
  },
  207: {
    surah: 9,
    ayah: 123
  },
  208: {
    surah: 10,
    ayah: 1
  },
  209: {
    surah: 10,
    ayah: 7
  },
  210: {
    surah: 10,
    ayah: 15
  },
  211: {
    surah: 10,
    ayah: 21
  },
  212: {
    surah: 10,
    ayah: 26
  },
  213: {
    surah: 10,
    ayah: 34
  },
  214: {
    surah: 10,
    ayah: 43
  },
  215: {
    surah: 10,
    ayah: 54
  },
  216: {
    surah: 10,
    ayah: 62
  },
  217: {
    surah: 10,
    ayah: 71
  },
  218: {
    surah: 10,
    ayah: 79
  },
  219: {
    surah: 10,
    ayah: 89
  },
  220: {
    surah: 10,
    ayah: 98
  },
  221: {
    surah: 10,
    ayah: 107
  },
  222: {
    surah: 11,
    ayah: 6
  },
  223: {
    surah: 11,
    ayah: 13
  },
  224: {
    surah: 11,
    ayah: 20
  },
  225: {
    surah: 11,
    ayah: 29
  },
  226: {
    surah: 11,
    ayah: 38
  },
  227: {
    surah: 11,
    ayah: 46
  },
  228: {
    surah: 11,
    ayah: 54
  },
  229: {
    surah: 11,
    ayah: 63
  },
  230: {
    surah: 11,
    ayah: 72
  },
  231: {
    surah: 11,
    ayah: 82
  },
  232: {
    surah: 11,
    ayah: 89
  },
  233: {
    surah: 11,
    ayah: 98
  },
  234: {
    surah: 11,
    ayah: 109
  },
  235: {
    surah: 11,
    ayah: 118
  },
  236: {
    surah: 12,
    ayah: 5
  },
  237: {
    surah: 12,
    ayah: 15
  },
  238: {
    surah: 12,
    ayah: 23
  },
  239: {
    surah: 12,
    ayah: 31
  },
  240: {
    surah: 12,
    ayah: 38
  },
  241: {
    surah: 12,
    ayah: 44
  },
  242: {
    surah: 12,
    ayah: 53
  },
  243: {
    surah: 12,
    ayah: 64
  },
  244: {
    surah: 12,
    ayah: 70
  },
  245: {
    surah: 12,
    ayah: 79
  },
  246: {
    surah: 12,
    ayah: 87
  },
  247: {
    surah: 12,
    ayah: 96
  },
  248: {
    surah: 12,
    ayah: 104
  },
  249: {
    surah: 13,
    ayah: 1
  },
  250: {
    surah: 13,
    ayah: 6
  },
  251: {
    surah: 13,
    ayah: 14
  },
  252: {
    surah: 13,
    ayah: 19
  },
  253: {
    surah: 13,
    ayah: 29
  },
  254: {
    surah: 13,
    ayah: 35
  },
  255: {
    surah: 13,
    ayah: 43
  },
  256: {
    surah: 14,
    ayah: 6
  },
  257: {
    surah: 14,
    ayah: 11
  },
  258: {
    surah: 14,
    ayah: 19
  },
  259: {
    surah: 14,
    ayah: 25
  },
  260: {
    surah: 14,
    ayah: 34
  },
  261: {
    surah: 14,
    ayah: 43
  },
  262: {
    surah: 15,
    ayah: 1
  },
  263: {
    surah: 15,
    ayah: 16
  },
  264: {
    surah: 15,
    ayah: 32
  },
  265: {
    surah: 15,
    ayah: 52
  },
  266: {
    surah: 15,
    ayah: 71
  },
  267: {
    surah: 15,
    ayah: 91
  },
  268: {
    surah: 16,
    ayah: 7
  },
  269: {
    surah: 16,
    ayah: 15
  },
  270: {
    surah: 16,
    ayah: 27
  },
  271: {
    surah: 16,
    ayah: 35
  },
  272: {
    surah: 16,
    ayah: 43
  },
  273: {
    surah: 16,
    ayah: 55
  },
  274: {
    surah: 16,
    ayah: 65
  },
  275: {
    surah: 16,
    ayah: 73
  },
  276: {
    surah: 16,
    ayah: 80
  },
  277: {
    surah: 16,
    ayah: 88
  },
  278: {
    surah: 16,
    ayah: 94
  },
  279: {
    surah: 16,
    ayah: 103
  },
  280: {
    surah: 16,
    ayah: 111
  },
  281: {
    surah: 16,
    ayah: 119
  },
  282: {
    surah: 17,
    ayah: 1
  },
  283: {
    surah: 17,
    ayah: 8
  },
  284: {
    surah: 17,
    ayah: 18
  },
  285: {
    surah: 17,
    ayah: 28
  },
  286: {
    surah: 17,
    ayah: 39
  },
  287: {
    surah: 17,
    ayah: 50
  },
  288: {
    surah: 17,
    ayah: 59
  },
  289: {
    surah: 17,
    ayah: 67
  },
  290: {
    surah: 17,
    ayah: 76
  },
  291: {
    surah: 17,
    ayah: 87
  },
  292: {
    surah: 17,
    ayah: 97
  },
  293: {
    surah: 17,
    ayah: 105
  },
  294: {
    surah: 18,
    ayah: 5
  },
  295: {
    surah: 18,
    ayah: 16
  },
  296: {
    surah: 18,
    ayah: 21
  },
  297: {
    surah: 18,
    ayah: 28
  },
  298: {
    surah: 18,
    ayah: 35
  },
  299: {
    surah: 18,
    ayah: 46
  },
  300: {
    surah: 18,
    ayah: 54
  },
  301: {
    surah: 18,
    ayah: 62
  },
  302: {
    surah: 18,
    ayah: 75
  },
  303: {
    surah: 18,
    ayah: 84
  },
  304: {
    surah: 18,
    ayah: 98
  },
  305: {
    surah: 19,
    ayah: 1
  },
  306: {
    surah: 19,
    ayah: 12
  },
  307: {
    surah: 19,
    ayah: 26
  },
  308: {
    surah: 19,
    ayah: 39
  },
  309: {
    surah: 19,
    ayah: 52
  },
  310: {
    surah: 19,
    ayah: 65
  },
  311: {
    surah: 19,
    ayah: 77
  },
  312: {
    surah: 19,
    ayah: 96
  },
  313: {
    surah: 20,
    ayah: 13
  },
  314: {
    surah: 20,
    ayah: 38
  },
  315: {
    surah: 20,
    ayah: 52
  },
  316: {
    surah: 20,
    ayah: 65
  },
  317: {
    surah: 20,
    ayah: 77
  },
  318: {
    surah: 20,
    ayah: 88
  },
  319: {
    surah: 20,
    ayah: 99
  },
  320: {
    surah: 20,
    ayah: 114
  },
  321: {
    surah: 20,
    ayah: 126
  },
  322: {
    surah: 21,
    ayah: 1
  },
  323: {
    surah: 21,
    ayah: 11
  },
  324: {
    surah: 21,
    ayah: 25
  },
  325: {
    surah: 21,
    ayah: 36
  },
  326: {
    surah: 21,
    ayah: 45
  },
  327: {
    surah: 21,
    ayah: 58
  },
  328: {
    surah: 21,
    ayah: 73
  },
  329: {
    surah: 21,
    ayah: 82
  },
  330: {
    surah: 21,
    ayah: 91
  },
  331: {
    surah: 21,
    ayah: 102
  },
  332: {
    surah: 22,
    ayah: 1
  },
  333: {
    surah: 22,
    ayah: 6
  },
  334: {
    surah: 22,
    ayah: 16
  },
  335: {
    surah: 22,
    ayah: 24
  },
  336: {
    surah: 22,
    ayah: 31
  },
  337: {
    surah: 22,
    ayah: 39
  },
  338: {
    surah: 22,
    ayah: 47
  },
  339: {
    surah: 22,
    ayah: 56
  },
  340: {
    surah: 22,
    ayah: 65
  },
  341: {
    surah: 22,
    ayah: 73
  },
  342: {
    surah: 23,
    ayah: 1
  },
  343: {
    surah: 23,
    ayah: 18
  },
  344: {
    surah: 23,
    ayah: 28
  },
  345: {
    surah: 23,
    ayah: 43
  },
  346: {
    surah: 23,
    ayah: 60
  },
  347: {
    surah: 23,
    ayah: 75
  },
  348: {
    surah: 23,
    ayah: 90
  },
  349: {
    surah: 23,
    ayah: 105
  },
  350: {
    surah: 24,
    ayah: 1
  },
  351: {
    surah: 24,
    ayah: 11
  },
  352: {
    surah: 24,
    ayah: 21
  },
  353: {
    surah: 24,
    ayah: 28
  },
  354: {
    surah: 24,
    ayah: 32
  },
  355: {
    surah: 24,
    ayah: 37
  },
  356: {
    surah: 24,
    ayah: 44
  },
  357: {
    surah: 24,
    ayah: 54
  },
  358: {
    surah: 24,
    ayah: 59
  },
  359: {
    surah: 24,
    ayah: 62
  },
  360: {
    surah: 25,
    ayah: 3
  },
  361: {
    surah: 25,
    ayah: 12
  },
  362: {
    surah: 25,
    ayah: 21
  },
  363: {
    surah: 25,
    ayah: 33
  },
  364: {
    surah: 25,
    ayah: 44
  },
  365: {
    surah: 25,
    ayah: 56
  },
  366: {
    surah: 25,
    ayah: 68
  },
  367: {
    surah: 26,
    ayah: 1
  },
  368: {
    surah: 26,
    ayah: 20
  },
  369: {
    surah: 26,
    ayah: 40
  },
  370: {
    surah: 26,
    ayah: 61
  },
  371: {
    surah: 26,
    ayah: 84
  },
  372: {
    surah: 26,
    ayah: 112
  },
  373: {
    surah: 26,
    ayah: 137
  },
  374: {
    surah: 26,
    ayah: 160
  },
  375: {
    surah: 26,
    ayah: 184
  },
  376: {
    surah: 26,
    ayah: 207
  },
  377: {
    surah: 27,
    ayah: 1
  },
  378: {
    surah: 27,
    ayah: 14
  },
  379: {
    surah: 27,
    ayah: 23
  },
  380: {
    surah: 27,
    ayah: 36
  },
  381: {
    surah: 27,
    ayah: 45
  },
  382: {
    surah: 27,
    ayah: 56
  },
  383: {
    surah: 27,
    ayah: 64
  },
  384: {
    surah: 27,
    ayah: 77
  },
  385: {
    surah: 27,
    ayah: 89
  },
  386: {
    surah: 28,
    ayah: 6
  },
  387: {
    surah: 28,
    ayah: 14
  },
  388: {
    surah: 28,
    ayah: 22
  },
  389: {
    surah: 28,
    ayah: 29
  },
  390: {
    surah: 28,
    ayah: 36
  },
  391: {
    surah: 28,
    ayah: 44
  },
  392: {
    surah: 28,
    ayah: 51
  },
  393: {
    surah: 28,
    ayah: 60
  },
  394: {
    surah: 28,
    ayah: 71
  },
  395: {
    surah: 28,
    ayah: 78
  },
  396: {
    surah: 28,
    ayah: 85
  },
  397: {
    surah: 29,
    ayah: 7
  },
  398: {
    surah: 29,
    ayah: 15
  },
  399: {
    surah: 29,
    ayah: 24
  },
  400: {
    surah: 29,
    ayah: 31
  },
  401: {
    surah: 29,
    ayah: 39
  },
  402: {
    surah: 29,
    ayah: 46
  },
  403: {
    surah: 29,
    ayah: 53
  },
  404: {
    surah: 29,
    ayah: 64
  },
  405: {
    surah: 30,
    ayah: 6
  },
  406: {
    surah: 30,
    ayah: 16
  },
  407: {
    surah: 30,
    ayah: 25
  },
  408: {
    surah: 30,
    ayah: 33
  },
  409: {
    surah: 30,
    ayah: 42
  },
  410: {
    surah: 30,
    ayah: 51
  },
  411: {
    surah: 31,
    ayah: 1
  },
  412: {
    surah: 31,
    ayah: 12
  },
  413: {
    surah: 31,
    ayah: 20
  },
  414: {
    surah: 31,
    ayah: 29
  },
  415: {
    surah: 32,
    ayah: 1
  },
  416: {
    surah: 32,
    ayah: 12
  },
  417: {
    surah: 32,
    ayah: 21
  },
  418: {
    surah: 33,
    ayah: 1
  },
  419: {
    surah: 33,
    ayah: 7
  },
  420: {
    surah: 33,
    ayah: 16
  },
  421: {
    surah: 33,
    ayah: 23
  },
  422: {
    surah: 33,
    ayah: 31
  },
  423: {
    surah: 33,
    ayah: 36
  },
  424: {
    surah: 33,
    ayah: 44
  },
  425: {
    surah: 33,
    ayah: 51
  },
  426: {
    surah: 33,
    ayah: 55
  },
  427: {
    surah: 33,
    ayah: 63
  },
  428: {
    surah: 34,
    ayah: 1
  },
  429: {
    surah: 34,
    ayah: 8
  },
  430: {
    surah: 34,
    ayah: 15
  },
  431: {
    surah: 34,
    ayah: 23
  },
  432: {
    surah: 34,
    ayah: 32
  },
  433: {
    surah: 34,
    ayah: 40
  },
  434: {
    surah: 34,
    ayah: 49
  },
  435: {
    surah: 35,
    ayah: 4
  },
  436: {
    surah: 35,
    ayah: 12
  },
  437: {
    surah: 35,
    ayah: 19
  },
  438: {
    surah: 35,
    ayah: 31
  },
  439: {
    surah: 35,
    ayah: 39
  },
  440: {
    surah: 35,
    ayah: 45
  },
  441: {
    surah: 36,
    ayah: 13
  },
  442: {
    surah: 36,
    ayah: 28
  },
  443: {
    surah: 36,
    ayah: 41
  },
  444: {
    surah: 36,
    ayah: 55
  },
  445: {
    surah: 36,
    ayah: 71
  },
  446: {
    surah: 37,
    ayah: 1
  },
  447: {
    surah: 37,
    ayah: 25
  },
  448: {
    surah: 37,
    ayah: 52
  },
  449: {
    surah: 37,
    ayah: 77
  },
  450: {
    surah: 37,
    ayah: 103
  },
  451: {
    surah: 37,
    ayah: 127
  },
  452: {
    surah: 37,
    ayah: 154
  },
  453: {
    surah: 38,
    ayah: 1
  },
  454: {
    surah: 38,
    ayah: 17
  },
  455: {
    surah: 38,
    ayah: 27
  },
  456: {
    surah: 38,
    ayah: 43
  },
  457: {
    surah: 38,
    ayah: 62
  },
  458: {
    surah: 38,
    ayah: 84
  },
  459: {
    surah: 39,
    ayah: 6
  },
  460: {
    surah: 39,
    ayah: 11
  },
  461: {
    surah: 39,
    ayah: 22
  },
  462: {
    surah: 39,
    ayah: 32
  },
  463: {
    surah: 39,
    ayah: 41
  },
  464: {
    surah: 39,
    ayah: 48
  },
  465: {
    surah: 39,
    ayah: 57
  },
  466: {
    surah: 39,
    ayah: 68
  },
  467: {
    surah: 39,
    ayah: 75
  },
  468: {
    surah: 40,
    ayah: 8
  },
  469: {
    surah: 40,
    ayah: 17
  },
  470: {
    surah: 40,
    ayah: 26
  },
  471: {
    surah: 40,
    ayah: 34
  },
  472: {
    surah: 40,
    ayah: 41
  },
  473: {
    surah: 40,
    ayah: 50
  },
  474: {
    surah: 40,
    ayah: 59
  },
  475: {
    surah: 40,
    ayah: 67
  },
  476: {
    surah: 40,
    ayah: 78
  },
  477: {
    surah: 41,
    ayah: 1
  },
  478: {
    surah: 41,
    ayah: 12
  },
  479: {
    surah: 41,
    ayah: 21
  },
  480: {
    surah: 41,
    ayah: 30
  },
  481: {
    surah: 41,
    ayah: 39
  },
  482: {
    surah: 41,
    ayah: 47
  },
  483: {
    surah: 42,
    ayah: 1
  },
  484: {
    surah: 42,
    ayah: 11
  },
  485: {
    surah: 42,
    ayah: 16
  },
  486: {
    surah: 42,
    ayah: 23
  },
  487: {
    surah: 42,
    ayah: 32
  },
  488: {
    surah: 42,
    ayah: 45
  },
  489: {
    surah: 42,
    ayah: 52
  },
  490: {
    surah: 43,
    ayah: 11
  },
  491: {
    surah: 43,
    ayah: 23
  },
  492: {
    surah: 43,
    ayah: 34
  },
  493: {
    surah: 43,
    ayah: 48
  },
  494: {
    surah: 43,
    ayah: 61
  },
  495: {
    surah: 43,
    ayah: 74
  },
  496: {
    surah: 44,
    ayah: 1
  },
  497: {
    surah: 44,
    ayah: 19
  },
  498: {
    surah: 44,
    ayah: 40
  },
  499: {
    surah: 45,
    ayah: 1
  },
  500: {
    surah: 45,
    ayah: 14
  },
  501: {
    surah: 45,
    ayah: 23
  },
  502: {
    surah: 45,
    ayah: 33
  },
  503: {
    surah: 46,
    ayah: 6
  },
  504: {
    surah: 46,
    ayah: 15
  },
  505: {
    surah: 46,
    ayah: 21
  },
  506: {
    surah: 46,
    ayah: 29
  },
  507: {
    surah: 47,
    ayah: 1
  },
  508: {
    surah: 47,
    ayah: 12
  },
  509: {
    surah: 47,
    ayah: 20
  },
  510: {
    surah: 47,
    ayah: 30
  },
  511: {
    surah: 48,
    ayah: 1
  },
  512: {
    surah: 48,
    ayah: 10
  },
  513: {
    surah: 48,
    ayah: 16
  },
  514: {
    surah: 48,
    ayah: 24
  },
  515: {
    surah: 48,
    ayah: 29
  },
  516: {
    surah: 49,
    ayah: 5
  },
  517: {
    surah: 49,
    ayah: 12
  },
  518: {
    surah: 50,
    ayah: 1
  },
  519: {
    surah: 50,
    ayah: 16
  },
  520: {
    surah: 50,
    ayah: 36
  },
  521: {
    surah: 51,
    ayah: 7
  },
  522: {
    surah: 51,
    ayah: 31
  },
  523: {
    surah: 51,
    ayah: 52
  },
  524: {
    surah: 52,
    ayah: 15
  },
  525: {
    surah: 52,
    ayah: 32
  },
  526: {
    surah: 53,
    ayah: 1
  },
  527: {
    surah: 53,
    ayah: 27
  },
  528: {
    surah: 53,
    ayah: 45
  },
  529: {
    surah: 54,
    ayah: 7
  },
  530: {
    surah: 54,
    ayah: 28
  },
  531: {
    surah: 54,
    ayah: 50
  },
  532: {
    surah: 55,
    ayah: 17
  },
  533: {
    surah: 55,
    ayah: 41
  },
  534: {
    surah: 55,
    ayah: 68
  },
  535: {
    surah: 56,
    ayah: 17
  },
  536: {
    surah: 56,
    ayah: 51
  },
  537: {
    surah: 56,
    ayah: 77
  },
  538: {
    surah: 57,
    ayah: 4
  },
  539: {
    surah: 57,
    ayah: 12
  },
  540: {
    surah: 57,
    ayah: 19
  },
  541: {
    surah: 57,
    ayah: 25
  },
  542: {
    surah: 58,
    ayah: 1
  },
  543: {
    surah: 58,
    ayah: 7
  },
  544: {
    surah: 58,
    ayah: 12
  },
  545: {
    surah: 58,
    ayah: 22
  },
  546: {
    surah: 59,
    ayah: 4
  },
  547: {
    surah: 59,
    ayah: 10
  },
  548: {
    surah: 59,
    ayah: 17
  },
  549: {
    surah: 60,
    ayah: 1
  },
  550: {
    surah: 60,
    ayah: 6
  },
  551: {
    surah: 60,
    ayah: 12
  },
  552: {
    surah: 61,
    ayah: 6
  },
  553: {
    surah: 62,
    ayah: 1
  },
  554: {
    surah: 62,
    ayah: 9
  },
  555: {
    surah: 63,
    ayah: 5
  },
  556: {
    surah: 64,
    ayah: 1
  },
  557: {
    surah: 64,
    ayah: 10
  },
  558: {
    surah: 65,
    ayah: 1
  },
  559: {
    surah: 65,
    ayah: 6
  },
  560: {
    surah: 66,
    ayah: 1
  },
  561: {
    surah: 66,
    ayah: 8
  },
  562: {
    surah: 67,
    ayah: 1
  },
  563: {
    surah: 67,
    ayah: 13
  },
  564: {
    surah: 67,
    ayah: 27
  },
  565: {
    surah: 68,
    ayah: 16
  },
  566: {
    surah: 68,
    ayah: 43
  },
  567: {
    surah: 69,
    ayah: 9
  },
  568: {
    surah: 69,
    ayah: 35
  },
  569: {
    surah: 70,
    ayah: 11
  },
  570: {
    surah: 70,
    ayah: 40
  },
  571: {
    surah: 71,
    ayah: 11
  },
  572: {
    surah: 72,
    ayah: 1
  },
  573: {
    surah: 72,
    ayah: 14
  },
  574: {
    surah: 73,
    ayah: 1
  },
  575: {
    surah: 73,
    ayah: 20
  },
  576: {
    surah: 74,
    ayah: 18
  },
  577: {
    surah: 74,
    ayah: 48
  },
  578: {
    surah: 75,
    ayah: 20
  },
  579: {
    surah: 76,
    ayah: 6
  },
  580: {
    surah: 76,
    ayah: 26
  },
  581: {
    surah: 77,
    ayah: 20
  },
  582: {
    surah: 78,
    ayah: 1
  },
  583: {
    surah: 78,
    ayah: 31
  },
  584: {
    surah: 79,
    ayah: 16
  },
  585: {
    surah: 80,
    ayah: 1
  },
  586: {
    surah: 81,
    ayah: 1
  },
  587: {
    surah: 82,
    ayah: 1
  },
  588: {
    surah: 83,
    ayah: 7
  },
  589: {
    surah: 83,
    ayah: 35
  },
  590: {
    surah: 85,
    ayah: 1
  },
  591: {
    surah: 86,
    ayah: 1
  },
  592: {
    surah: 87,
    ayah: 16
  },
  593: {
    surah: 89,
    ayah: 1
  },
  594: {
    surah: 89,
    ayah: 24
  },
  595: {
    surah: 91,
    ayah: 1
  },
  596: {
    surah: 92,
    ayah: 15
  },
  597: {
    surah: 95,
    ayah: 1
  },
  598: {
    surah: 97,
    ayah: 1
  },
  599: {
    surah: 98,
    ayah: 8
  },
  600: {
    surah: 100,
    ayah: 10
  },
  601: {
    surah: 103,
    ayah: 1
  },
  602: {
    surah: 106,
    ayah: 1
  },
  603: {
    surah: 109,
    ayah: 1
  },
  604: {
    surah: 112,
    ayah: 1
  }
};
function getJuzStart(juz) {
  return JUZ_START_MAPPING[juz];
}
function getPageStart(page) {
  return PAGE_START_MAPPING[page];
}

/***/ })

}]);