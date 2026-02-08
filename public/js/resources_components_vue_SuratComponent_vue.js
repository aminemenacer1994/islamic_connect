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
  class: "mobile-surah-dropdown-wrapper px-3 mt-3"
};
const _hoisted_2 = {
  class: "d-flex w-100 align-items-center gap-2"
};
const _hoisted_3 = {
  key: 0,
  disabled: ""
};
const _hoisted_4 = ["value"];
const _hoisted_5 = {
  key: 1,
  class: "mobile-surah-info-wrapper px-3"
};
const _hoisted_6 = {
  class: "mobile-surah-info-card"
};
const _hoisted_7 = {
  class: "mobile-surah-info-text"
};
const _hoisted_8 = {
  class: "mobile-surah-info-title"
};
const _hoisted_9 = {
  class: "mobile-surah-info-number"
};
const _hoisted_10 = {
  class: "mobile-surah-info-name"
};
const _hoisted_11 = {
  key: 0,
  class: "mobile-surah-info-translation"
};
const _hoisted_12 = {
  key: 1,
  class: "mobile-surah-info-arabic"
};
const _hoisted_13 = {
  class: "mobile-surah-info-meta"
};
const _hoisted_14 = {
  class: "mobile-surah-info-chip"
};
const _hoisted_15 = {
  key: 0,
  class: "mobile-surah-info-chip"
};
const _hoisted_16 = {
  class: "mobile-surah-info-actions"
};
const _hoisted_17 = ["disabled"];
const _hoisted_18 = {
  class: "surah-layout"
};
const _hoisted_19 = {
  class: "sidebar-toggle mt-3 mb-2 px-3"
};
const _hoisted_20 = ["aria-expanded", "aria-label"];
const _hoisted_21 = {
  key: 0
};
const _hoisted_22 = {
  id: "surat-filters",
  class: "row g-3"
};
const _hoisted_23 = {
  class: "col-12 col-md-12 filter-item surah-list p-0"
};
const _hoisted_24 = {
  class: "sidebar-dark-content d-flex flex-column h-100"
};
const _hoisted_25 = {
  class: "sidebar-header pt-3 px-3 pb-2 sidebar-header-sticky"
};
const _hoisted_26 = {
  class: "sidebar-tabs d-flex gap-2 mb-3 align-items-center"
};
const _hoisted_27 = {
  class: "search-container"
};
const _hoisted_28 = ["placeholder"];
const _hoisted_29 = {
  key: 0,
  class: "mobile-sidebar-settings mt-2"
};
const _hoisted_30 = {
  class: "sidebar-list-container flex-grow-1 px-0 pb-5"
};
const _hoisted_31 = {
  key: 0,
  class: "list-group list-group-flush"
};
const _hoisted_32 = ["onClick"];
const _hoisted_33 = {
  class: "d-flex align-items-center w-100"
};
const _hoisted_34 = {
  class: "item-number me-3"
};
const _hoisted_35 = {
  class: "flex-grow-1 text-start"
};
const _hoisted_36 = {
  class: "item-title-en"
};
const _hoisted_37 = {
  class: "sidebar-item-meta"
};
const _hoisted_38 = {
  key: 0
};
const _hoisted_39 = {
  key: 1
};
const _hoisted_40 = {
  key: 0,
  class: "sidebar-item-extra"
};
const _hoisted_41 = {
  key: 0
};
const _hoisted_42 = {
  class: "surah-info-group ms-auto"
};
const _hoisted_43 = {
  class: "item-title-ar text-end"
};
const _hoisted_44 = ["onClick"];
const _hoisted_45 = {
  key: 1,
  class: "list-group list-group-flush"
};
const _hoisted_46 = {
  key: 0,
  class: "p-3 text-white-50 small text-center border-bottom border-white-10"
};
const _hoisted_47 = ["onClick"];
const _hoisted_48 = {
  class: "d-flex w-100 align-items-center"
};
const _hoisted_49 = {
  class: "item-number-container me-2"
};
const _hoisted_50 = {
  class: "item-number"
};
const _hoisted_51 = {
  class: "flex-grow-1 overflow-hidden d-flex align-items-center py-2"
};
const _hoisted_52 = {
  class: "items-text-preview text-start text-truncate pe-2 border-end border-white-10",
  style: {
    "color": "#ffffff",
    "font-weight": "700",
    "font-size": "0.85rem",
    "flex": "0 0 50%",
    "max-width": "50%"
  }
};
const _hoisted_53 = {
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
const _hoisted_54 = {
  key: 1,
  class: "text-center text-white-50 py-4"
};
const _hoisted_55 = {
  key: 2,
  class: "list-group list-group-flush"
};
const _hoisted_56 = ["onClick"];
const _hoisted_57 = {
  class: "d-flex w-100 align-items-center justify-content-between"
};
const _hoisted_58 = {
  class: "text-start"
};
const _hoisted_59 = {
  class: "item-title-en"
};
const _hoisted_60 = {
  class: "small text-white-50",
  style: {
    "font-size": "0.75rem"
  }
};
const _hoisted_61 = {
  class: "surah-offcanvas-trigger"
};
const _hoisted_62 = {
  class: "offcanvas offcanvas-start surah-offcanvas",
  tabindex: "-1",
  id: "surahOffcanvas",
  ref: "surahOffcanvas",
  "aria-labelledby": "surahOffcanvasLabel"
};
const _hoisted_63 = {
  class: "offcanvas-body"
};
const _hoisted_64 = {
  key: 0,
  class: "surah-offcanvas-section surah-offcanvas-search"
};
const _hoisted_65 = {
  key: 0,
  class: "surah-offcanvas-title"
};
const _hoisted_66 = {
  key: 1,
  class: "surah-offcanvas-title"
};
const _hoisted_67 = {
  key: 2,
  class: "surah-offcanvas-badge"
};
const _hoisted_68 = {
  class: "surah-offcanvas-section"
};
const _hoisted_69 = ["value"];
const _hoisted_70 = {
  class: "surah-offcanvas-section"
};
const _hoisted_71 = ["value"];
const _hoisted_72 = {
  class: "surah-offcanvas-row mt-3"
};
const _hoisted_73 = {
  class: "surah-offcanvas-field"
};
const _hoisted_74 = ["value"];
const _hoisted_75 = ["disabled"];
const _hoisted_76 = {
  key: 0,
  class: "loading-placeholder"
};
const _hoisted_77 = ["id", "onClick", "onKeydown", "onDragstart"];
const _hoisted_78 = {
  class: "ayah-surface rtl-text d-flex flex-column"
};
const _hoisted_79 = {
  class: "d-flex justify-content-between text-muted ltr-text ayah-card-header"
};
const _hoisted_80 = {
  class: "d-flex align-items-center gap-2"
};
const _hoisted_81 = {
  key: 0,
  class: "saved-pill"
};
const _hoisted_82 = {
  key: 0,
  class: "now-playing-tag"
};
const _hoisted_83 = {
  class: "d-flex align-items-center ayah-card-header-actions"
};
const _hoisted_84 = ["aria-label"];
const _hoisted_85 = {
  class: "form-check form-switch translation-toggle ayah-translation-toggle"
};
const _hoisted_86 = ["checked", "id", "aria-label", "onChange"];
const _hoisted_87 = ["for"];
const _hoisted_88 = {
  key: 0,
  class: "bi bi-check-circle-fill me-2 fs-5"
};
const _hoisted_89 = {
  key: 1,
  class: "bi bi-trash-fill me-2 fs-5"
};
const _hoisted_90 = {
  key: 2,
  class: "bi bi-exclamation-triangle-fill me-2 fs-5"
};
const _hoisted_91 = ["href"];
const _hoisted_92 = ["aria-hidden"];
const _hoisted_93 = {
  class: "col-md-11"
};
const _hoisted_94 = {
  style: {
    "padding": "4px"
  }
};
const _hoisted_95 = ["innerHTML"];
const _hoisted_96 = {
  key: 0,
  class: "translation-header pt-2 ltr-text hide-on-mobile-tablet ml-2"
};
const _hoisted_97 = {
  class: "translation-copy flex-grow-1"
};
const _hoisted_98 = {
  key: 0
};
const _hoisted_99 = ["innerHTML"];
const _hoisted_100 = {
  class: "ayah-quick-actions ltr-text",
  role: "group",
  "aria-label": "Quick actions"
};
const _hoisted_101 = ["onClick"];
const _hoisted_102 = ["onClick"];
const _hoisted_103 = {
  class: "col-md-1 text-center"
};
const _hoisted_104 = {
  class: "d-flex flex-column align-items-center"
};
const _hoisted_105 = ["onClick", "aria-label", "title"];
const _hoisted_106 = ["aria-hidden"];
const _hoisted_107 = ["innerHTML"];
const _hoisted_108 = {
  key: 0,
  class: "d-flex align-items-center fw-bold pt-2 ltr-text hide-on-mobile-tablet ml-2"
};
const _hoisted_109 = {
  key: 1
};
const _hoisted_110 = ["innerHTML"];
const _hoisted_111 = {
  class: "ayah-quick-actions ltr-text",
  role: "group",
  "aria-label": "Quick actions"
};
const _hoisted_112 = ["onClick"];
const _hoisted_113 = ["onClick"];
const _hoisted_114 = {
  class: "row card-teal mb-3 py-2",
  style: {
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "margin": "0 -5px"
  }
};
const _hoisted_115 = {
  class: "col text-center",
  style: {
    "padding": "2px"
  }
};
const _hoisted_116 = {
  class: "col text-center",
  style: {
    "padding": "2px"
  }
};
const _hoisted_117 = {
  class: "col text-center",
  style: {
    "padding": "2px"
  }
};
const _hoisted_118 = ["onClick"];
const _hoisted_119 = {
  class: "col text-center",
  style: {
    "padding": "2px"
  }
};
const _hoisted_120 = ["onClick", "aria-label", "title"];
const _hoisted_121 = {
  class: "col text-center",
  style: {
    "padding": "2px"
  }
};
const _hoisted_122 = ["onClick"];
const _hoisted_123 = {
  class: "col text-center",
  style: {
    "padding": "2px"
  }
};
const _hoisted_124 = ["onClick", "title"];
const _hoisted_125 = {
  class: "visually-hidden",
  "aria-live": "polite",
  "aria-atomic": "true"
};
const _hoisted_126 = {
  key: 1,
  class: "empty-state text-center text-muted py-4"
};
const _hoisted_127 = {
  class: "modal fade",
  id: "tajweedRulesModal",
  tabindex: "-1",
  "aria-labelledby": "tajweedRulesLabel",
  "aria-hidden": "true",
  "data-bs-backdrop": "true"
};
const _hoisted_128 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern"
};
const _hoisted_129 = {
  class: "modal-content tajweed-modal"
};
const _hoisted_130 = {
  class: "modal-body"
};
const _hoisted_131 = {
  key: 0,
  class: "tajweed-rules-grid"
};
const _hoisted_132 = {
  class: "tajweed-rule-en"
};
const _hoisted_133 = {
  class: "tajweed-rule-title"
};
const _hoisted_134 = {
  class: "tajweed-rule-code"
};
const _hoisted_135 = {
  class: "tajweed-rule-label"
};
const _hoisted_136 = {
  key: 0,
  class: "tajweed-rule-desc"
};
const _hoisted_137 = {
  class: "tajweed-rule-color"
};
const _hoisted_138 = {
  key: 0,
  class: "tajweed-rule-ar"
};
const _hoisted_139 = {
  class: "tajweed-rule-ar-title"
};
const _hoisted_140 = {
  key: 0,
  class: "tajweed-rule-ar-desc"
};
const _hoisted_141 = {
  key: 1,
  class: "text-muted small"
};
const _hoisted_142 = {
  class: "modal fade",
  id: "surahInfoModal",
  tabindex: "-1",
  "aria-labelledby": "surahInfoLabel",
  "aria-hidden": "true",
  "data-bs-backdrop": "true"
};
const _hoisted_143 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern"
};
const _hoisted_144 = {
  class: "modal-content surah-info-modal"
};
const _hoisted_145 = {
  class: "modal-header"
};
const _hoisted_146 = {
  class: "surah-info-actions"
};
const _hoisted_147 = ["disabled"];
const _hoisted_148 = ["disabled"];
const _hoisted_149 = {
  class: "modal-body"
};
const _hoisted_150 = {
  class: "surah-info-hero"
};
const _hoisted_151 = {
  key: 0,
  class: "surah-info-arabic-large"
};
const _hoisted_152 = {
  class: "surah-info-english"
};
const _hoisted_153 = {
  class: "surah-info-meta"
};
const _hoisted_154 = {
  class: "surah-info-chip"
};
const _hoisted_155 = {
  class: "surah-info-chip"
};
const _hoisted_156 = ["innerHTML"];
const _hoisted_157 = {
  key: 1,
  class: "surah-info-loading"
};
const _hoisted_158 = {
  key: 2,
  class: "surah-info-error"
};
const _hoisted_159 = ["innerHTML"];
const _hoisted_160 = {
  key: 4,
  class: "surah-info-empty"
};
const _hoisted_161 = {
  class: "surah-info-source"
};
const _hoisted_162 = ["href"];
const _hoisted_163 = {
  key: 1
};
const _hoisted_164 = {
  key: 2
};
const _hoisted_165 = {
  key: 1,
  class: "text-muted small"
};
const _hoisted_166 = {
  class: "modal fade",
  id: "surahSettingsModal",
  tabindex: "-1",
  "aria-labelledby": "surahSettingsLabel",
  "aria-hidden": "true",
  "data-bs-backdrop": "true"
};
const _hoisted_167 = {
  class: "modal-dialog modal-dialog-centered modal-md modal-modern"
};
const _hoisted_168 = {
  class: "modal-content surah-settings-modal"
};
const _hoisted_169 = {
  class: "modal-body"
};
const _hoisted_170 = {
  class: "surah-settings-group"
};
const _hoisted_171 = ["value"];
const _hoisted_172 = {
  class: "surah-settings-group"
};
const _hoisted_173 = ["value"];
const _hoisted_174 = {
  class: "surah-settings-group"
};
const _hoisted_175 = {
  class: "surah-settings-group"
};
const _hoisted_176 = ["value"];
const _hoisted_177 = {
  key: 0,
  class: "text-muted d-block mt-1"
};
const _hoisted_178 = {
  key: 1,
  class: "text-muted d-block mt-1"
};
const _hoisted_179 = {
  class: "surah-settings-group"
};
const _hoisted_180 = {
  class: "surah-settings-group"
};
const _hoisted_181 = {
  class: "modal-footer border-0"
};
const _hoisted_182 = ["id"];
const _hoisted_183 = {
  class: "offcanvas-body"
};
const _hoisted_184 = {
  class: "quran-font-panel"
};
const _hoisted_185 = {
  key: 0,
  class: "quran-font-loading"
};
const _hoisted_186 = {
  key: 1
};
const _hoisted_187 = {
  key: 0,
  class: "quran-font-error"
};
const _hoisted_188 = {
  class: "quran-font-list"
};
const _hoisted_189 = ["onClick"];
const _hoisted_190 = {
  class: "quran-font-option-header"
};
const _hoisted_191 = {
  class: "form-check"
};
const _hoisted_192 = ["id", "value"];
const _hoisted_193 = ["for"];
const _hoisted_194 = {
  key: 0,
  class: "quran-font-source"
};
const _hoisted_195 = {
  key: 0,
  class: "quran-font-preview-loading"
};
const _hoisted_196 = ["innerHTML"];
const _hoisted_197 = {
  key: 2,
  class: "alert alert-soft-success quran-font-alert",
  role: "status"
};
const _hoisted_198 = {
  class: "quran-font-actions"
};
const _hoisted_199 = ["disabled"];
const _hoisted_200 = ["id"];
const _hoisted_201 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable modal-fullscreen-sm-down"
};
const _hoisted_202 = {
  class: "modal-content quran-font-modal-content"
};
const _hoisted_203 = {
  class: "modal-body"
};
const _hoisted_204 = {
  class: "quran-font-panel"
};
const _hoisted_205 = {
  key: 0,
  class: "quran-font-loading"
};
const _hoisted_206 = {
  key: 1
};
const _hoisted_207 = {
  key: 0,
  class: "quran-font-error"
};
const _hoisted_208 = {
  class: "quran-font-list"
};
const _hoisted_209 = ["onClick"];
const _hoisted_210 = {
  class: "quran-font-option-header"
};
const _hoisted_211 = {
  class: "form-check"
};
const _hoisted_212 = ["id", "value"];
const _hoisted_213 = ["for"];
const _hoisted_214 = {
  key: 0,
  class: "quran-font-source"
};
const _hoisted_215 = {
  key: 0,
  class: "quran-font-preview-loading"
};
const _hoisted_216 = ["innerHTML"];
const _hoisted_217 = {
  key: 2,
  class: "alert alert-soft-success quran-font-alert",
  role: "status"
};
const _hoisted_218 = {
  class: "quran-font-actions"
};
const _hoisted_219 = ["disabled"];
const _hoisted_220 = {
  class: "modal fade",
  id: "ayahReflectionModal",
  tabindex: "-1",
  "aria-labelledby": "reflectionModalLabel",
  "aria-hidden": "true",
  "data-bs-backdrop": "true"
};
const _hoisted_221 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_222 = {
  class: "modal-content reflection-modal"
};
const _hoisted_223 = {
  class: "modal-header"
};
const _hoisted_224 = {
  class: "modal-body pt-0"
};
const _hoisted_225 = {
  key: 0,
  class: "reflection-success-banner reflection-success-top"
};
const _hoisted_226 = ["minlength"];
const _hoisted_227 = {
  class: "d-flex justify-content-between align-items-center mt-2"
};
const _hoisted_228 = {
  class: "text-muted"
};
const _hoisted_229 = {
  class: "text-muted small"
};
const _hoisted_230 = {
  key: 1,
  class: "alert alert-info d-flex justify-content-between align-items-center small"
};
const _hoisted_231 = {
  class: "note-suggestions-header d-flex justify-content-between align-items-center mb-3"
};
const _hoisted_232 = {
  class: "suggestion-marquee-stack"
};
const _hoisted_233 = {
  class: "suggestion-marquee"
};
const _hoisted_234 = {
  class: "suggestion-track-group",
  "aria-hidden": false
};
const _hoisted_235 = ["onClick"];
const _hoisted_236 = {
  class: "lead"
};
const _hoisted_237 = {
  key: 2,
  class: "note-suggestions-collapsed d-flex justify-content-between align-items-center"
};
const _hoisted_238 = {
  key: 3,
  class: "alert alert-danger py-2 small"
};
const _hoisted_239 = {
  key: 4,
  class: "reflection-history reflection-history-card mt-4"
};
const _hoisted_240 = {
  class: "reflection-history-header"
};
const _hoisted_241 = {
  class: "reflection-history-count"
};
const _hoisted_242 = {
  class: "reflection-history-list"
};
const _hoisted_243 = {
  class: "reflection-history-subject"
};
const _hoisted_244 = {
  class: "reflection-history-message"
};
const _hoisted_245 = {
  class: "reflection-history-entry-actions"
};
const _hoisted_246 = ["onClick"];
const _hoisted_247 = ["onClick"];
const _hoisted_248 = {
  class: "modal-footer justify-content-end border-0 p-0 mt-2 gap-2 small-actions"
};
const _hoisted_249 = ["disabled"];
const _hoisted_250 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2",
  role: "status",
  "aria-hidden": "true"
};
const _hoisted_251 = {
  key: 0,
  class: "audio-player-container"
};
const _hoisted_252 = {
  class: "custom-audio-player"
};
const _hoisted_253 = {
  class: "controls"
};
const _hoisted_254 = ["title"];
const _hoisted_255 = {
  class: "speed-indicator"
};
const _hoisted_256 = ["title", "aria-pressed"];
const _hoisted_257 = {
  key: 0,
  class: "volume-bar-container"
};
const _hoisted_258 = {
  class: "time",
  "aria-live": "polite"
};
const _hoisted_259 = ["aria-valuenow", "aria-valuetext"];
const _hoisted_260 = {
  class: "audio-visualizer",
  ref: "visualizer"
};
const _hoisted_261 = {
  key: 0,
  class: "ayah-scrollbar",
  role: "group",
  "aria-label": "Surah verse navigator"
};
const _hoisted_262 = ["max", "value", "aria-valuemax", "aria-valuenow", "aria-valuetext"];
const _hoisted_263 = {
  class: "ayah-scrollbar-count"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _ctx$surahDetails, _ctx$currentSurahInfo, _ctx$surahDetails2, _ctx$surahDetails3, _ctx$currentSurahInfo2, _ctx$currentSurahInfo3, _ctx$currentSurahInfo4, _ctx$currentSurahInfo5, _ctx$currentSurahInfo6, _ctx$surahDetails4, _ctx$currentSurahInfo7, _ctx$surahDetails5, _ctx$surahDetails14, _ctx$audioElements$_c, _ctx$audioElements$_c2;
  const _component_bookmark_modal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("bookmark-modal");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["container surat-premium", {
      'has-audio-player': _ctx.showAudioPlayer,
      'has-sidebar': true,
      'sidebar-collapsed': _ctx.sidebarCollapsed
    }]),
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(_ctx.quranFontStyle),
    role: "main",
    "aria-label": "Quran Explorer"
  }, [_cache[144] || (_cache[144] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row justify-content-center text-center mb-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-10 col-xl-10"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "display-5 fw-bold"
  }, "The Holy Quran")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-show=\"showNextStep\" class=\"next-step-wrapper\">\n            <div class=\"mx-auto mb-4 next-step-card\">\n                <button v-if=\"canMinimizeNextStep\" type=\"button\" :title=\"isNextStepMinimized ? 'Restore' : 'Minimize'\" :aria-label=\"isNextStepMinimized\n                    ? 'Restore next step'\n                    : 'Minimize next step'\n                    \" @click=\"toggleNextStepMinimized\" class=\"next-step-toggle\">\n                    <i class=\"fas\" :class=\"isNextStepMinimized\n                        ? 'fa-expand-alt'\n                        : 'fa-compress-alt'\n                        \" aria-hidden=\"true\"></i>\n                </button>\n                <div class=\"d-flex align-items-start gap-3 text-start\">\n                    <div class=\"flex-shrink-0 mt-1\">\n                        <div class=\"next-step-icon-circle\">\n                            <i class=\"fas fa-quran\"></i>\n                        </div>\n                    </div>\n                    <div class=\"flex-grow-1\">\n                        <p class=\"mb-2 fw-semibold text-uppercase next-step-eyebrow\">\n                            NEXT STEP\n                        </p>\n                        <div v-show=\"isNextStepMinimized\" class=\"mb-2 next-step-teaser\">\n                            <a href=\"/history\" class=\"fw-semibold text-decoration-none next-step-link\">\n                                Explore the Seerah timeline\n                            </a>\n                            <i class=\"fas fa-arrow-up-right-from-square ms-1 next-step-link-icon\"></i>\n                        </div>\n                        <p v-show=\"!isNextStepMinimized\" class=\"mb-3 next-step-text\">\n                            Learning how the Qur’an was preserved is a beautiful beginning. When you’re ready, gently\n                            continue with the life of the Messenger who lived its message. Walk through a simple,\n                            welcoming\n                            <a href=\"/mission\" class=\"fw-semibold text-decoration-none next-step-link\">\n                                Seerah timeline\n                            </a>\n                            to see the journey unfold.\n                        </p>\n                        <a v-show=\"!isNextStepMinimized\" href=\"/mission\"\n                            class=\"btn btn-sm fw-semibold text-white px-3 py-2 next-step-cta\">\n                            Explore Seerah\n                            <i class=\"fas fa-arrow-up-right-from-square ms-2\"></i>\n                        </a>\n                    </div>\n                    \n                </div>\n            </div>\n        </div> "), _ctx.isMobile ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_cache[65] || (_cache[65] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "visually-hidden",
    for: "mobileSurahDropdown"
  }, " Select surah ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_ctx.isMobile ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("select", {
    key: 0,
    id: "mobileSurahDropdown",
    class: "form-select mobile-surah-dropdown shadow-sm flex-grow-1",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => _ctx.selectedSurah = $event),
    onChange: _cache[1] || (_cache[1] = $event => _ctx.selectSurah(_ctx.selectedSurah)),
    "aria-label": "Select surah"
  }, [!_ctx.surahs.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", _hoisted_3, "Loading surahs...")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.surahs, surah => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: surah.number,
      value: String(surah.number)
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.number) + ". " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.englishName), 9 /* TEXT, PROPS */, _hoisted_4);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */)), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedSurah]]) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-light shadow-sm next-step-settings-btn-standalone px-3 py-2",
    "data-bs-toggle": "modal",
    "data-bs-target": "#surahSettingsModal",
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.prepareSettingsDraft && _ctx.prepareSettingsDraft(...args)),
    "aria-label": "Open display settings",
    title: "Display settings"
  }, [...(_cache[64] || (_cache[64] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-gear-fill"
  }, null, -1 /* CACHED */)]))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.isTabletOrMobile && (_ctx.surahDetails || _ctx.currentSurahInfo) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[66] || (_cache[66] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mobile-surah-info-eyebrow"
  }, "Current surah", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentSurahMeta.number || ((_ctx$surahDetails = _ctx.surahDetails) === null || _ctx$surahDetails === void 0 ? void 0 : _ctx$surahDetails.surahNumber) || ((_ctx$currentSurahInfo = _ctx.currentSurahInfo) === null || _ctx$currentSurahInfo === void 0 ? void 0 : _ctx$currentSurahInfo.number) || _ctx.selectedSurah || "—"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(((_ctx$surahDetails2 = _ctx.surahDetails) === null || _ctx$surahDetails2 === void 0 ? void 0 : _ctx$surahDetails2.englishName) || ((_ctx$surahDetails3 = _ctx.surahDetails) === null || _ctx$surahDetails3 === void 0 ? void 0 : _ctx$surahDetails3.name) || ((_ctx$currentSurahInfo2 = _ctx.currentSurahInfo) === null || _ctx$currentSurahInfo2 === void 0 ? void 0 : _ctx$currentSurahInfo2.englishName) || ((_ctx$currentSurahInfo3 = _ctx.currentSurahInfo) === null || _ctx$currentSurahInfo3 === void 0 ? void 0 : _ctx$currentSurahInfo3.name) || "Surah"), 1 /* TEXT */)]), (_ctx$currentSurahInfo4 = _ctx.currentSurahInfo) !== null && _ctx$currentSurahInfo4 !== void 0 && _ctx$currentSurahInfo4.englishNameTranslation ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentSurahInfo.englishNameTranslation), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (_ctx$currentSurahInfo5 = _ctx.currentSurahInfo) !== null && _ctx$currentSurahInfo5 !== void 0 && _ctx$currentSurahInfo5.name ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentSurahInfo.name), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentSurahMeta.ayahCount || (_ctx$currentSurahInfo6 = _ctx.currentSurahInfo) !== null && _ctx$currentSurahInfo6 !== void 0 && _ctx$currentSurahInfo6.numberOfAyahs || (_ctx$surahDetails4 = _ctx.surahDetails) !== null && _ctx$surahDetails4 !== void 0 && (_ctx$surahDetails4 = _ctx$surahDetails4.ayahs) !== null && _ctx$surahDetails4 !== void 0 && _ctx$surahDetails4.length ? `${_ctx.currentSurahMeta.ayahCount || ((_ctx$currentSurahInfo7 = _ctx.currentSurahInfo) === null || _ctx$currentSurahInfo7 === void 0 ? void 0 : _ctx$currentSurahInfo7.numberOfAyahs) || ((_ctx$surahDetails5 = _ctx.surahDetails) === null || _ctx$surahDetails5 === void 0 || (_ctx$surahDetails5 = _ctx$surahDetails5.ayahs) === null || _ctx$surahDetails5 === void 0 ? void 0 : _ctx$surahDetails5.length)} ayahs` : "Ayahs —"), 1 /* TEXT */), _ctx.currentSurahMeta.origin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_15, " Origin: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentSurahMeta.origin), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_ctx.isTablet ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn mobile-surah-info-settings-btn",
    "data-bs-toggle": "modal",
    "data-bs-target": "#surahSettingsModal",
    onClick: _cache[3] || (_cache[3] = (...args) => _ctx.prepareSettingsDraft && _ctx.prepareSettingsDraft(...args)),
    "aria-label": "Open display settings",
    title: "Display settings"
  }, [...(_cache[67] || (_cache[67] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-gear-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn mobile-surah-info-btn",
    onClick: _cache[4] || (_cache[4] = $event => _ctx.openSurahInfo(_ctx.currentSurahInfo)),
    disabled: !_ctx.currentSurahInfo,
    "aria-label": "Open surah information"
  }, [...(_cache[68] || (_cache[68] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-info-circle",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Info", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_17)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sticky-dropdown", {
      collapsed: !_ctx.isVisible
    }]),
    ref: "stickyDropdown"
  }, [_cache[73] || (_cache[73] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "filter-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "filter-actions"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-sm btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2",
    onClick: _cache[5] || (_cache[5] = (...args) => _ctx.toggleSidebar && _ctx.toggleSidebar(...args)),
    "aria-expanded": !_ctx.sidebarCollapsed,
    "aria-label": _ctx.sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.sidebarCollapsed ? 'bi-chevron-double-right' : 'bi-chevron-double-left'])
  }, null, 2 /* CLASS */), !_ctx.sidebarCollapsed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_21, "Collapse Custom Sidebar")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 8 /* PROPS */, _hoisted_20)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Dark Sidebar Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Sidebar Header: Tabs & Search "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Navigation Tabs "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["tab-btn flex-fill", {
      active: _ctx.activeSidebarTab === 'surah'
    }]),
    onClick: _cache[6] || (_cache[6] = $event => _ctx.setActiveSidebarTab('surah'))
  }, "Surah", 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button class=\"tab-btn flex-fill\" \n                                        :class=\"{ active: activeSidebarTab === 'verse' }\"\n                                        @click=\"setActiveSidebarTab('verse')\">Verse</button>\n                                    <button class=\"tab-btn flex-fill\" \n                                        :class=\"{ active: activeSidebarTab === 'juz' }\"\n                                        @click=\"setActiveSidebarTab('juz')\">Juz</button> "), !_ctx.isMobile ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "tab-btn sidebar-settings-tab ms-auto",
    "data-bs-toggle": "modal",
    "data-bs-target": "#surahSettingsModal",
    "aria-label": "Open sidebar settings",
    onClick: _cache[7] || (_cache[7] = (...args) => _ctx.prepareSettingsDraft && _ctx.prepareSettingsDraft(...args))
  }, [...(_cache[69] || (_cache[69] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-gear-fill"
  }, null, -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search Input "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "search",
    class: "form-control sidebar-search-input",
    "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => _ctx.sidebarSearchQuery = $event),
    placeholder: `Search ${_ctx.activeSidebarTab}...`,
    "aria-label": "Search content"
  }, null, 8 /* PROPS */, _hoisted_28), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.sidebarSearchQuery]])]), _ctx.isMobile ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-link text-white p-0 d-flex align-items-center gap-2",
    "data-bs-toggle": "modal",
    "data-bs-target": "#surahSettingsModal",
    onClick: _cache[9] || (_cache[9] = (...args) => _ctx.prepareSettingsDraft && _ctx.prepareSettingsDraft(...args))
  }, [...(_cache[70] || (_cache[70] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-gear-fill"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Display settings", -1 /* CACHED */)]))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Lists Container "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Surah List "), _ctx.activeSidebarTab === 'surah' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_31, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.filteredSurahs_sidebar, surah => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sidebar-item", {
        active: String(_ctx.selectedSurah) === String(surah.number)
      }]),
      key: surah.number,
      role: "button",
      onClick: $event => _ctx.selectSurah(surah.number)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.number), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.englishName), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [surah.numberOfAyahs || surah.number_ayahs ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.numberOfAyahs || surah.number_ayahs) + " ayahs ", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), surah.revelationType ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_39, " · Origin: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.revelationType), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), surah.englishNameTranslation ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.englishNameTranslation), 1 /* TEXT */), surah.numberOfAyahs || surah.number_ayahs ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_41, " · " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.numberOfAyahs || surah.number_ayahs) + " total verses ", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-link text-white p-0 opacity-50 hover-opacity-100 sidebar-info-button",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.openSurahInfo(surah), ["stop"]),
      "aria-label": "View surah information"
    }, [...(_cache[71] || (_cache[71] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-info-circle"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_44)])])], 10 /* CLASS, PROPS */, _hoisted_32);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Verse List "), _ctx.activeSidebarTab === 'verse' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_45, [_ctx.surahDetails ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_46, " Surah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahDetails.englishName), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.filteredVersesList, verse => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sidebar-item", {
        active: _ctx.activeAyahIndex === verse.number - 1
      }]),
      key: verse.key,
      onClick: $event => _ctx.selectVerseFromSidebar(verse.number)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(verse.number), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" English (Left) (50%) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(verse.translation || 'Loading...'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Arabic (Right) (50%) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(verse.text), 1 /* TEXT */)])])], 10 /* CLASS, PROPS */, _hoisted_47);
  }), 128 /* KEYED_FRAGMENT */)), _ctx.filteredVersesList.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_54, " No verses found. ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Juz List "), _ctx.activeSidebarTab === 'juz' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_55, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.filteredJuzs, juz => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sidebar-item", {
        active: _ctx.selectedJuz === juz.number
      }]),
      key: juz.number,
      onClick: $event => _ctx.selectJuz(juz.number)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_59, "Juz " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(juz.number), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_60, " Starts at: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(juz.surahName) + ":" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(juz.ayahNumber), 1 /* TEXT */)]), _cache[72] || (_cache[72] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-chevron-right text-white-50 small"
    }, null, -1 /* CACHED */))])], 10 /* CLASS, PROPS */, _hoisted_56);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"col-12 col-md-4 filter-item\"></div>\n                    <div class=\"col-12 col-md-4 filter-item\"></div> ")], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.isVisible && !_ctx.sidebarCollapsed]])], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-primary surah-offcanvas-toggle icon-only",
    "data-bs-toggle": "offcanvas",
    "data-bs-target": "#surahOffcanvas",
    "aria-controls": "surahOffcanvas",
    onClick: _cache[10] || (_cache[10] = (...args) => _ctx.prepareSettingsDraft && _ctx.prepareSettingsDraft(...args))
  }, [...(_cache[74] || (_cache[74] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-sliders",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Filters & info", -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [_cache[84] || (_cache[84] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "offcanvas-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "offcanvas-title",
    id: "surahOffcanvasLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Surah controls")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close text-reset",
    "data-bs-dismiss": "offcanvas",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [ false ? (0) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [_cache[76] || (_cache[76] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label surah-offcanvas-label"
  }, "Select surah", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select surah-offcanvas-select",
    "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => _ctx.selectedSurah = $event),
    onChange: _cache[12] || (_cache[12] = $event => _ctx.selectSurah(_ctx.selectedSurah)),
    "aria-label": "Select surah"
  }, [_cache[75] || (_cache[75] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select surah", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.filteredSurahs, surah => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: surah.number,
      value: String(surah.number)
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.number) + " · " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah.englishName), 9 /* TEXT, PROPS */, _hoisted_69);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedSurah]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, [_cache[83] || (_cache[83] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label surah-offcanvas-label"
  }, "Select reciter", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select surah-offcanvas-select",
    "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => _ctx.selectedReciter = $event),
    "aria-label": "Select reciter"
  }, [_cache[77] || (_cache[77] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select a reciter", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.recitersSorted, reciter => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: reciter.identifier,
      value: reciter.identifier
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reciter.englishName), 9 /* TEXT, PROPS */, _hoisted_71);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedReciter]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [_cache[79] || (_cache[79] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label surah-offcanvas-label"
  }, "Select translation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select surah-offcanvas-select",
    "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => _ctx.selectedTranslation = $event),
    "aria-label": "Select translation"
  }, [_cache[78] || (_cache[78] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select Translation", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.translationsSorted, translation => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: translation.identifier,
      value: translation.identifier
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(`${translation.flag} ${translation.englishName} (${translation.language})`), 9 /* TEXT, PROPS */, _hoisted_74);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedTranslation]])]), _cache[80] || (_cache[80] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "surah-offcanvas-toggle-group"
  }, null, -1 /* CACHED */))]),  false ? (0) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-primary surah-offcanvas-submit",
    onClick: _cache[16] || (_cache[16] = (...args) => _ctx.closeOffcanvas && _ctx.closeOffcanvas(...args)),
    "aria-label": "Close filters and info"
  }, [...(_cache[82] || (_cache[82] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check me-2",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Done ", -1 /* CACHED */)]))])])])], 512 /* NEED_PATCH */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"surah-header-sticky\" :class=\"{ 'is-collapsed': headerCollapsed }\">\n                <transition name=\"header-slide\">\n                    <div v-show=\"!headerCollapsed\">\n                        <div v-if=\"isMobile\" class=\"surat-mobile-header\">\n                            <div class=\"surat-mobile-header-meta\">\n                                <span class=\"mobile-page-label\">{{ mobilePageLabel }}</span>\n                                <span v-if=\"mobileJuzLabel && mobileHizbLabel\" class=\"mobile-juz-label\">\n                                    {{ mobileJuzLabel }} / {{ mobileHizbLabel }}\n                                </span>\n                                <span v-else-if=\"mobileJuzLabel\" class=\"mobile-juz-label\">\n                                    {{ mobileJuzLabel }}\n                                </span>\n                            </div>\n                            <div class=\"surat-mobile-header-main\">\n                                <select class=\"form-select mobile-surah-select\"\n                                    v-model=\"selectedSurah\"\n                                    @change=\"selectSurah(selectedSurah)\"\n                                    aria-label=\"Select surah\">\n                                    <option value=\"\" disabled>Select surah</option>\n                                    <option v-for=\"surah in filteredSurahs\" :key=\"surah.number\"\n                                        :value=\"String(surah.number)\">\n                                        {{ surah.number }}. {{ surah.englishName }}\n                                    </option>\n                                </select>\n                                <div class=\"mobile-toolbar-icons\">\n                                    -- <button type=\"button\"\n                                        class=\"icon-btn\"\n                                        data-bs-toggle=\"modal\"\n                                        data-bs-target=\"#tajweedRulesModal\"\n                                        aria-label=\"View tajweed rules\">\n                                        <i class=\"bi bi-list-columns-reverse\"></i>\n                                    </button> --\n                                    <button type=\"button\"\n                                        class=\"icon-btn\"\n                                        @click=\"openSurahInfo(currentSurahInfo)\"\n                                        :disabled=\"!currentSurahInfo\"\n                                        aria-label=\"View surah information\"\n                                        title=\"Surah info\">\n                                        <i class=\"bi bi-info-circle\"></i>\n                                    </button>\n                                    <button type=\"button\"\n                                        class=\"icon-btn\"\n                                        data-bs-toggle=\"modal\"\n                                        data-bs-target=\"#surahSettingsModal\"\n                                        @click=\"prepareSettingsDraft\"\n                                        aria-label=\"Display settings\"\n                                        title=\"Display settings\">\n                                        <i class=\"fas fa-cog\"></i>\n                                    </button>\n                                </div>\n                            </div>\n                        </div>\n                        <div v-else>\n                            <div v-if=\"surahDetails\" class=\"surah-playback-bar surah-toolbar\">\n                                <div class=\"surah-toolbar-main\">\n                                    <div class=\"surah-title-block pb-2\">\n                                        <span class=\"surah-eyebrow\">Now viewing</span>\n                                        <div class=\"surah-title-row\">\n                                            <span class=\"surah-title\">\n                                                Surah {{ surahDetails.surahNumber }} · {{ surahDetails.englishName || surahDetails.name\n                                                }}\n                                            </span>\n                                            <button type=\"button\" class=\"surah-info-inline\" @click=\"openSurahInfo(currentSurahInfo)\"\n                                                :disabled=\"!currentSurahInfo\" aria-label=\"View surah information\"\n                                                title=\"Surah info\">\n                                                <i class=\"bi bi-info-circle\" aria-hidden=\"true\"></i>\n                                            </button>\n                                            <span class=\"surah-dot\" aria-hidden=\"true\">•</span>\n                                            <span class=\"surah-badge\">\n                                                {{ surahDetails.ayahs ? surahDetails.ayahs.length : filteredAyahs.length }} verses\n                                            </span>\n                                            <div class=\"surah-title-actions d-none d-md-flex align-items-center gap-2\"\n                                                v-if=\"currentActionAyah\">\n                                                <button type=\"button\"\n                                                    class=\"icon-btn header-control-btn\"\n                                                    @click.stop=\"openBookmarkModal(currentActionAyah)\"\n                                                    aria-label=\"Save current ayah to folder\"\n                                                    title=\"Save to folder\">\n                                                    <i class=\"bi bi-folder-plus\" aria-hidden=\"true\"></i>\n                                                </button>\n                                                <button type=\"button\"\n                                                    class=\"icon-btn header-control-btn\"\n                                                    :class=\"{ 'is-saved': isAyahSaved(currentActionAyah) }\"\n                                                    @click.stop=\"toggleBookmark(currentActionAyah)\"\n                                                    :aria-label=\"isAyahSaved(currentActionAyah)\n                                                        ? 'Remove bookmark from current ayah'\n                                                        : 'Bookmark current ayah'\"\n                                                    :title=\"isAyahSaved(currentActionAyah)\n                                                        ? 'Remove bookmark'\n                                                        : 'Quick save bookmark'\n                                                        \">\n                                                    <i class=\"bi\"\n                                                        :class=\"isAyahSaved(currentActionAyah)\n                                                            ? 'bi-bookmark-check-fill'\n                                                            : 'bi-bookmark-plus-fill'\n                                                            \"\n                                                        aria-hidden=\"true\"></i>\n                                                </button>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"surah-playback-controls\">\n                                        <div class=\"surah-control-group\">\n                                            <label class=\"surah-control-label\" for=\"surahReciterSelect\">Reciter</label>\n                                            <select id=\"surahReciterSelect\" class=\"form-select shadow-sm surah-select\"\n                                                v-model=\"selectedReciter\" aria-label=\"Select reciter\">\n                                                <option value=\"\" disabled>Select a reciter</option>\n                                                <option v-for=\"reciter in recitersSorted\" :key=\"reciter.identifier\"\n                                                    :value=\"reciter.identifier\">\n                                                    {{ reciter.englishName }}\n                                                </option>\n                                            </select>\n                                        </div>\n                                        <div class=\"surah-control-group\">\n                                            <label class=\"surah-control-label\" for=\"surahTranslationSelect\">Translation</label>\n                                            <select id=\"surahTranslationSelect\" class=\"form-select shadow-sm surah-select\"\n                                                v-model=\"selectedTranslation\" aria-label=\"Select translation\">\n                                                <option value=\"\" disabled>Select Translation</option>\n                                                <option v-for=\"translation in translationsSorted\" :key=\"translation.identifier\"\n                                                    :value=\"translation.identifier\">\n                                                    {{\n                                                        `${translation.flag} ${translation.englishName} (${translation.language})`\n                                                    }}\n                                                </option>\n                                            </select>\n                                        </div>\n                                        <button type=\"button\"\n                                            class=\"icon-btn surah-font-btn d-none d-md-flex\"\n                                            @click=\"openFontPicker\"\n                                            aria-label=\"Choose Quran font\"\n                                            title=\"Quran font\">\n                                            <i class=\"fas fa-font\" aria-hidden=\"true\"></i>\n                                        </button>\n                                        <button type=\"button\"\n                                            class=\"icon-btn surah-settings-btn d-none d-md-flex\"\n                                            data-bs-toggle=\"modal\"\n                                            data-bs-target=\"#surahSettingsModal\"\n                                            @click=\"prepareSettingsDraft\"\n                                            aria-label=\"Open display settings\"\n                                            title=\"Display settings\">\n                                            <i class=\"fas fa-cog\" aria-hidden=\"true\"></i>\n                                        </button>\n                                    </div>\n                                </div>\n                            </div>\n                            \n                            <div class=\"ayah-links-bar\" v-if=\"isMobile\">\n                                <button type=\"button\" class=\"btn tajweed-rules-trigger\" data-bs-toggle=\"modal\"\n                                    data-bs-target=\"#tajweedRulesModal\" aria-label=\"View tajweed rules\">\n                                    <i class=\"bi bi-palette-fill\" aria-hidden=\"true\"></i>\n                                    <span class=\"tajweed-rules-label\">Tajweed Rules</span>\n                                </button>\n                                <button type=\"button\" class=\"btn font-picker-inline\"\n                                    @click=\"openFontPicker\"\n                                    aria-label=\"Choose Quran font\">\n                                    <i class=\"fas fa-font\" aria-hidden=\"true\"></i>\n                                    <span class=\"font-picker-label\">Fonts</span>\n                                </button>\n                                <button type=\"button\" class=\"btn surah-offcanvas-inline\" data-bs-toggle=\"offcanvas\"\n                                    data-bs-target=\"#surahOffcanvas\" aria-controls=\"surahOffcanvas\"\n                                    aria-label=\"Open filters and info\" @click=\"prepareSettingsDraft\">\n                                    <i class=\"bi bi-sliders\" aria-hidden=\"true\"></i>\n                                </button>\n                                <button type=\"button\" class=\"btn surah-info-inline surah-info-inline-mobile\"\n                                    @click=\"openSurahInfo(currentSurahInfo)\" :disabled=\"!currentSurahInfo\"\n                                    aria-label=\"View surah information\" title=\"Surah info\">\n                                    <i class=\"bi bi-info-circle\" aria-hidden=\"true\"></i>\n                                </button>\n                                <a href=\"/bookmarks\" class=\"bookmark-cta-link pr-3\" @click.prevent=\"onBookmarksLinkClick\">\n                                    <i class=\"bi bi-bookmark-heart-fill me-2\" aria-hidden=\"true\"></i>\n                                    View saved bookmarks\n                                </a>\n                                <a href=\"/notes\" class=\"bookmark-cta-link notes-cta-link\" @click.prevent=\"onNotesLinkClick\">\n                                    <i class=\"bi bi-journal-text me-2\" aria-hidden=\"true\"></i>\n                                    View notes & reflections\n                                </a>\n                            </div>\n                        </div>\n                    </div>\n                </transition>\n                \n                <div class=\"header-collapse-toggle\" @click=\"toggleHeader\">\n                    <i :class=\"headerCollapsed ? 'bi bi-chevron-down' : 'bi bi-chevron-up'\"></i>\n                </div>\n            </div> "), _ctx.isLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_76, "Loading Surah...")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-if=\"surahDetails && !isLoading\" class=\"surah-download-banner ltr-text\" role=\"region\" aria-label=\"Surah download\">\n                <button\n                    type=\"button\"\n                    class=\"surah-download-btn\"\n                    :class=\"{ 'is-downloaded': isSurahAudioDownloaded }\"\n                    @click.stop=\"downloadSurahAudio()\"\n                    :disabled=\"isSurahAudioDownloading || !canDownloadSurahAudio()\"\n                    :aria-label=\"!canDownloadSurahAudio()\n                        ? 'Full surah download unavailable for this reciter'\n                        : isSurahAudioDownloading\n                            ? 'Downloading full surah MP3'\n                            : isSurahAudioDownloaded\n                                ? 'Surah MP3 downloaded'\n                                : 'Download full surah MP3'\"\n                    :title=\"!canDownloadSurahAudio()\n                        ? 'Full surah download unavailable'\n                        : isSurahAudioDownloading\n                            ? 'Downloading...'\n                            : isSurahAudioDownloaded\n                                ? 'Downloaded'\n                                : 'Download full surah MP3'\">\n                    <i\n                        class=\"bi\"\n                        :class=\"isSurahAudioDownloading\n                            ? 'bi-arrow-repeat ic-spin'\n                            : isSurahAudioDownloaded\n                                ? 'bi-check-circle-fill'\n                                : 'bi-download'\"\n                        aria-hidden=\"true\"></i>\n                    <span class=\"surah-download-btn-title\">\n                        {{\n                            isSurahAudioDownloading\n                                ? \"Downloading full surah…\"\n                                : isSurahAudioDownloaded\n                                    ? \"Surah MP3 downloaded\"\n                                    : \"Download full surah (MP3)\"\n                        }}\n                    </span>\n                </button>\n                <button\n                    type=\"button\"\n                    class=\"btn surah-font-picker-btn\"\n                    @click.stop=\"openFontPicker\"\n                    aria-label=\"Choose Quran font\">\n                    <i class=\"fas fa-font\" aria-hidden=\"true\"></i>\n                </button>\n            </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row rtl-text",
    ref: "listContainer",
    role: "list",
    "aria-label": "Ayah cards list",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      paddingTop: _ctx.topSpacerHeight + 'px',
      paddingBottom: _ctx.bottomSpacerHeight + 'px'
    })
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.visibleWindow, item => {
    var _ctx$surahDetails6;
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      style: {
        "padding": "12px",
        "border-radius": "8px"
      },
      ref_for: true,
      ref: "audioCard",
      key: item.ayah.number,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["col-md-12 mb-2 mt-2 ayah-card-container shadow-md", {
        highlighted: _ctx.isHighlighted && _ctx.activeAyahIndex === item.index,
        'currently-playing': _ctx.isAudioPlaying[item.index]
      }]),
      role: "listitem",
      id: `ayah-card-${item.index}`,
      onClick: $event => _ctx.selectCard(item.index),
      onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.toggleAudioPlayer(item.index), ["prevent"]), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.toggleAudioPlayer(item.index), ["prevent"]), ["space"])],
      draggable: "true",
      tabindex: "0",
      onDragstart: $event => _ctx.onAyahDragStart(item.ayah, $event)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_78, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Surah and Ayah Number "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_79, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_80, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, [_cache[85] || (_cache[85] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
      src: "/images/art.png",
      width: "35px",
      alt: "Art Icon"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx$surahDetails6 = _ctx.surahDetails) === null || _ctx$surahDetails6 === void 0 ? void 0 : _ctx$surahDetails6.surahNumber) + " : " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.index + 1) + " ", 1 /* TEXT */), _ctx.isAyahSaved(item.ayah) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_81, "Saved")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _ctx.isAudioPlaying[item.index] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_82, " Now playing ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_83, [_ctx.showTajweed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: 0,
      type: "button",
      class: "action-pill tajweed-header-trigger",
      "data-bs-toggle": "modal",
      "data-bs-target": "#tajweedRulesModal",
      "aria-label": 'Open tajweed rules for ayah ' + (item.index + 1),
      title: "View tajweed rules legend",
      onClick: _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
    }, [...(_cache[86] || (_cache[86] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-palette-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Tajweed rules", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_84)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_85, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      class: "form-check-input",
      type: "checkbox",
      checked: _ctx.isTranslationVisibleFor(item),
      id: `surat-translation-toggle-${item.index}`,
      "aria-label": _ctx.isTranslationVisibleFor(item) ? 'Hide translation' : 'Show translation',
      onChange: $event => _ctx.onTranslationToggle(item, $event),
      onClick: _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_86), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "form-check-label mt-1",
      for: `surat-translation-toggle-${item.index}`,
      onClick: _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
    }, " Translation " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isTranslationVisibleFor(item) ? 'on' : 'off'), 9 /* TEXT, PROPS */, _hoisted_87)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button\n                                    type=\"button\"\n                                    class=\"icon-btn ayah-download-btn\"\n                                    :class=\"{ 'is-downloaded': isAyahAudioDownloaded(item.ayah) }\"\n                                    @click.stop=\"downloadAyahAudio(item.ayah)\"\n                                    :disabled=\"!item.ayah?.audio || isAyahAudioDownloading(item.ayah)\"\n                                    :aria-label=\"!item.ayah?.audio\n                                        ? 'Audio unavailable for this ayah'\n                                        : isAyahAudioDownloading(item.ayah)\n                                            ? 'Downloading ayah audio'\n                                            : isAyahAudioDownloaded(item.ayah)\n                                                ? 'Ayah MP3 downloaded'\n                                            : 'Download ayah audio as MP3'\"\n                                    :title=\"!item.ayah?.audio\n                                        ? 'Audio unavailable'\n                                        : isAyahAudioDownloading(item.ayah)\n                                            ? 'Downloading...'\n                                            : isAyahAudioDownloaded(item.ayah)\n                                                ? 'Downloaded'\n                                            : 'Download MP3'\">\n                                    <i\n                                        class=\"bi\"\n                                        :class=\"isAyahAudioDownloading(item.ayah)\n                                            ? 'bi-arrow-repeat ic-spin'\n                                            : isAyahAudioDownloaded(item.ayah)\n                                                ? 'bi-check-circle-fill'\n                                                : 'bi-download'\"\n                                        aria-hidden=\"true\"></i>\n                                </button>"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "feedback-fade"
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => {
        var _ctx$surahDetails7, _ctx$surahDetails8, _ctx$surahDetails9, _ctx$surahDetails0, _ctx$surahDetails1, _ctx$surahDetails10, _ctx$surahDetails11, _ctx$surahDetails12, _ctx$surahDetails13;
        return [_ctx.feedbackMessages[_ctx.buildAyahKey((_ctx$surahDetails7 = _ctx.surahDetails) === null || _ctx$surahDetails7 === void 0 ? void 0 : _ctx$surahDetails7.surahNumber, item.ayah.numberInSurah || item.ayah.number)] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
          key: 0,
          class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["me-3 badge rounded-pill shadow-lg border-0 px-4 py-2 fs-6 fw-bold feedback-badge", _ctx.feedbackMessages[_ctx.buildAyahKey((_ctx$surahDetails8 = _ctx.surahDetails) === null || _ctx$surahDetails8 === void 0 ? void 0 : _ctx$surahDetails8.surahNumber, item.ayah.numberInSurah || item.ayah.number)].class])
        }, [_ctx.feedbackMessages[_ctx.buildAyahKey((_ctx$surahDetails9 = _ctx.surahDetails) === null || _ctx$surahDetails9 === void 0 ? void 0 : _ctx$surahDetails9.surahNumber, item.ayah.numberInSurah || item.ayah.number)].icon === 'check' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_88)) : _ctx.feedbackMessages[_ctx.buildAyahKey((_ctx$surahDetails0 = _ctx.surahDetails) === null || _ctx$surahDetails0 === void 0 ? void 0 : _ctx$surahDetails0.surahNumber, item.ayah.numberInSurah || item.ayah.number)].icon === 'trash' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_89)) : _ctx.feedbackMessages[_ctx.buildAyahKey((_ctx$surahDetails1 = _ctx.surahDetails) === null || _ctx$surahDetails1 === void 0 ? void 0 : _ctx$surahDetails1.surahNumber, item.ayah.numberInSurah || item.ayah.number)].icon === 'warning' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_90)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.feedbackMessages[_ctx.buildAyahKey((_ctx$surahDetails10 = _ctx.surahDetails) === null || _ctx$surahDetails10 === void 0 ? void 0 : _ctx$surahDetails10.surahNumber, item.ayah.numberInSurah || item.ayah.number)].text) + " ", 1 /* TEXT */), _ctx.feedbackMessages[_ctx.buildAyahKey((_ctx$surahDetails11 = _ctx.surahDetails) === null || _ctx$surahDetails11 === void 0 ? void 0 : _ctx$surahDetails11.surahNumber, item.ayah.numberInSurah || item.ayah.number)].link ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
          key: 3,
          class: "auth-alert-link ms-2",
          href: _ctx.feedbackMessages[_ctx.buildAyahKey((_ctx$surahDetails12 = _ctx.surahDetails) === null || _ctx$surahDetails12 === void 0 ? void 0 : _ctx$surahDetails12.surahNumber, item.ayah.numberInSurah || item.ayah.number)].link,
          onClick: _cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.feedbackMessages[_ctx.buildAyahKey((_ctx$surahDetails13 = _ctx.surahDetails) === null || _ctx$surahDetails13 === void 0 ? void 0 : _ctx$surahDetails13.surahNumber, item.ayah.numberInSurah || item.ayah.number)].linkText || "Log in"), 9 /* TEXT, PROPS */, _hoisted_91)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
      }),
      _: 2 /* DYNAMIC */
    }, 1024 /* DYNAMIC_SLOTS */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Desktop Layout: Icons on Left "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "row d-none d-md-flex",
      role: "group",
      "aria-label": "Ayah controls (desktop)",
      "aria-hidden": _ctx.isMobile
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_93, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_94, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['arabic-text rtl-text text-end mb-3', {
        'arabic-text--active': _ctx.currentlyPlayingIndex === item.index && _ctx.isAudioPlaying[item.index]
      }]),
      innerHTML: _ctx.highlightedText(item.ayah),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: _ctx.arabicFontSize + 'px'
      })
    }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_95), _ctx.isTranslationVisibleFor(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_96, [...(_cache[87] || (_cache[87] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
      class: "mb-0"
    }, " Translation: ", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["translation-row", {
        'translation-row--collapsed': !_ctx.isTranslationVisibleFor(item)
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_97, [_ctx.isTranslationVisibleFor(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_98, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['fw-regular ltr-text flex-grow-1 translation-text', {
        'translation-text--active': _ctx.currentlyPlayingIndex === item.index && _ctx.isAudioPlaying[item.index]
      }]),
      innerHTML: _ctx.highlightText(item.ayah.translation),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: _ctx.translationFontSize + 'px'
      })
    }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_99)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 1
    }, [], 64 /* STABLE_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_100, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "action-pill",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.copyAyah(item.ayah), ["stop"]),
      "aria-label": "Copy ayah",
      title: "Copy ayah"
    }, [...(_cache[88] || (_cache[88] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clipboard",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Copy", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_101), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "action-pill",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.shareOnWhatsApp(item.ayah), ["stop"]),
      "aria-label": "Share ayah",
      title: "Share ayah"
    }, [...(_cache[89] || (_cache[89] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-send",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Share", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_102)])])], 2 /* CLASS */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_103, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_104, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn mb-3",
      onClick: $event => _ctx.toggleAudioPlayer(item.index),
      "aria-label": _ctx.isAudioPlaying[item.index] ? 'Pause ayah ' + (item.index + 1) : 'Play ayah ' + (item.index + 1),
      title: _ctx.isAudioPlaying[item.index] ? 'Pause' : 'Play'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isAudioPlaying[item.index] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_105)])])], 8 /* PROPS */, _hoisted_92), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile/Tablet Layout: Text then Icons "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
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
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: _ctx.arabicFontSize + 'px'
      })
    }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_107), _ctx.isTranslationVisibleFor(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_108, [...(_cache[90] || (_cache[90] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
      class: "mb-0"
    }, " Translation: ", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.isTranslationVisibleFor(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_109, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['fw-regular ltr-text flex-grow-1 translation-text', {
        'translation-text--active': _ctx.currentlyPlayingIndex === item.index && _ctx.isAudioPlaying[item.index]
      }]),
      innerHTML: _ctx.highlightText(item.ayah.translation),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontSize: _ctx.translationFontSize + 'px'
      })
    }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_110)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 2
    }, [], 64 /* STABLE_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_111, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "action-pill",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.copyAyah(item.ayah), ["stop"]),
      "aria-label": "Copy ayah",
      title: "Copy ayah"
    }, [...(_cache[91] || (_cache[91] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clipboard",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Copy", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_112), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "action-pill",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.shareOnWhatsApp(item.ayah), ["stop"]),
      "aria-label": "Share ayah",
      title: "Share ayah"
    }, [...(_cache[92] || (_cache[92] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-send",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Share", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_113), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button type=\"button\" class=\"action-pill reflection-pill-fill\"\n                                    :class=\"{ 'has-reflection': hasReflection(item.ayah) }\"\n                                    @click.stop=\"openReflectionModal(item.ayah)\" :aria-label=\"hasReflection(item.ayah)\n                                        ? 'Edit reflection'\n                                        : 'Add reflection'\" :title=\"hasReflection(item.ayah)\n                                            ? 'Edit reflection'\n                                            : 'Add reflection'\">\n                                    <i class=\"bi bi-journal-text\" aria-hidden=\"true\"></i>\n                                    <span>{{ hasReflection(item.ayah) ? 'Reflected' : 'Reflect' }}</span>\n                                </button> ")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_114, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_115, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: _cache[21] || (_cache[21] = (...args) => _ctx.decreaseFontSize && _ctx.decreaseFontSize(...args)),
      "aria-label": "Decrease font size",
      title: "Decrease Font Size"
    }, [...(_cache[93] || (_cache[93] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-dash-circle-fill",
      style: {
        "font-size": "1.6rem"
      },
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_116, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: _cache[22] || (_cache[22] = (...args) => _ctx.increaseFontSize && _ctx.increaseFontSize(...args)),
      "aria-label": "Increase font size",
      title: "Increase Font Size"
    }, [...(_cache[94] || (_cache[94] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-plus-circle-fill",
      style: {
        "font-size": "1.6rem"
      },
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_117, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: $event => _ctx.rewindAudio(item.index),
      "aria-label": "Rewind 15 seconds",
      title: "Rewind"
    }, [...(_cache[95] || (_cache[95] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-skip-backward-circle-fill",
      style: {
        "font-size": "1.6rem"
      },
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_118)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_119, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: $event => _ctx.toggleAudioPlayer(item.index),
      "aria-label": _ctx.isAudioPlaying[item.index] ? 'Pause ayah ' + (item.index + 1) : 'Play ayah ' + (item.index + 1),
      title: _ctx.isAudioPlaying[item.index] ? 'Pause' : 'Play'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isAudioPlaying[item.index] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill']),
      style: {
        "font-size": "1.8rem"
      },
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_120)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_121, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "icon-btn",
      onClick: $event => _ctx.fastForwardAudio(item.index),
      "aria-label": "Fast forward 20 seconds",
      title: "Fast Forward"
    }, [...(_cache[96] || (_cache[96] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-skip-forward-circle-fill",
      style: {
        "font-size": "1.6rem"
      },
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_122)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"col text-center\" style=\"padding: 2px\">\n                                <button class=\"icon-btn reflection-btn\"\n                                    :class=\"{ 'has-reflection': hasReflection(item.ayah) }\"\n                                    @click.stop=\"openReflectionModal(item.ayah)\"\n                                    :aria-label=\"hasReflection(item.ayah)\n                                        ? 'Edit reflection'\n                                        : 'Add reflection'\"\n                                    :title=\"hasReflection(item.ayah)\n                                        ? 'Edit reflection'\n                                        : 'Add reflection'\">\n                                    <i class=\"bi bi-journal-text\" style=\"font-size: 1.6rem\" aria-hidden=\"true\"></i>\n                                </button>\n                            </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_123, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["icon-btn", {
        'is-saved': _ctx.isAyahSaved(item.ayah)
      }]),
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.toggleBookmark(item.ayah), ["stop"]),
      title: _ctx.isAyahSaved(item.ayah) ? 'Remove bookmark' : 'Quick save bookmark'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.isAyahSaved(item.ayah) ? 'bi-bookmark-check-fill' : 'bi-bookmark-plus-fill']),
      style: {
        "font-size": "1.6rem"
      },
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_124)])])], 8 /* PROPS */, _hoisted_106)])], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_77);
  }), 128 /* KEYED_FRAGMENT */))], 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Screen reader live region "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_125, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.screenReaderMessage), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Empty state "), !_ctx.isLoading && _ctx.surahDetails && _ctx.filteredAyahs.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_126, " No verses match your current search or filters. ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_bookmark_modal, {
    ayah: _ctx.activeAyah,
    onSaved: _ctx.onBookmarkSaved
  }, null, 8 /* PROPS */, ["ayah", "onSaved"]), _ctx.showTajweed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    key: 2,
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_127, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_128, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_129, [_cache[97] || (_cache[97] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "modal-title",
    id: "tajweedRulesLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Tajweed rules")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_130, [_ctx.tajweedLegend.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_131, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.tajweedLegend, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.name,
      class: "tajweed-rule-row"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_132, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_133, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_134, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.code), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_135, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.label), 1 /* TEXT */)]), item.desc ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_136, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.desc), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_137, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["tajweed-swatch", `tajweed-${item.name}`]),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)]), item.ar ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_138, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_139, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.ar), 1 /* TEXT */), item.arDesc ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_140, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.arDesc), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_141, "Tajweed rules will appear once a surah loads."))])])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_142, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_143, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_144, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_145, [_cache[101] || (_cache[101] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "modal-title",
    id: "surahInfoLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Surah information")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_146, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "surah-info-font-btn",
    onClick: _cache[23] || (_cache[23] = (...args) => _ctx.decreaseSurahInfoFontSize && _ctx.decreaseSurahInfoFontSize(...args)),
    disabled: _ctx.surahInfoFontSize <= _ctx.surahInfoFontSizeMin,
    "aria-label": "Decrease surah info font size",
    title: "Decrease font size"
  }, [...(_cache[98] || (_cache[98] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-dash-lg",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_147), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "surah-info-font-btn",
    onClick: _cache[24] || (_cache[24] = (...args) => _ctx.increaseSurahInfoFontSize && _ctx.increaseSurahInfoFontSize(...args)),
    disabled: _ctx.surahInfoFontSize >= _ctx.surahInfoFontSizeMax,
    "aria-label": "Increase surah info font size",
    title: "Increase font size"
  }, [...(_cache[99] || (_cache[99] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-lg",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_148), _cache[100] || (_cache[100] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  }, null, -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_149, [_ctx.surahInfo ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      '--surah-info-font-size': _ctx.surahInfoFontSize + 'px'
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_150, [_ctx.surahInfo.name ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_151, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahInfo.name), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_152, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahInfo.englishName), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_153, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_154, " Ayahs: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahInfo.numberOfAyahs || ((_ctx$surahDetails14 = _ctx.surahDetails) === null || _ctx$surahDetails14 === void 0 || (_ctx$surahDetails14 = _ctx$surahDetails14.ayahs) === null || _ctx$surahDetails14 === void 0 ? void 0 : _ctx$surahDetails14.length) || "Unknown"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_155, " Revelation Place: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahInfo.revelationType || "Unknown"), 1 /* TEXT */)])]), _ctx.surahInfoShortText ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: "surah-info-lead",
    innerHTML: _ctx.surahInfoShortText
  }, null, 8 /* PROPS */, _hoisted_156)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.surahInfoLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_157, " Loading surah details... ")) : _ctx.surahInfoError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_158, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahInfoError), 1 /* TEXT */)) : _ctx.surahInfoText ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 3,
    class: "surah-info-content",
    innerHTML: _ctx.surahInfoText
  }, null, 8 /* PROPS */, _hoisted_159)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_160, " Detailed info is not available yet. ")), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_161, [_cache[102] || (_cache[102] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Reference: ", -1 /* CACHED */)), _ctx.surahInfoSourceUrl ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
    key: 0,
    href: _ctx.surahInfoSourceUrl,
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahInfoSourceLabel), 9 /* TEXT, PROPS */, _hoisted_162)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_163, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahInfoSourceLabel), 1 /* TEXT */)), _ctx.surahInfoSourceHost ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_164, "(" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.surahInfoSourceHost) + ")", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 4 /* STYLE */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_165, " Surah details are not available yet. Please try again in a moment. "))])])])])])), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_166, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_167, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_168, [_cache[119] || (_cache[119] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "modal-title",
    id: "surahSettingsLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Display settings")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_169, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_170, [_cache[104] || (_cache[104] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Audio reciter", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[25] || (_cache[25] = $event => _ctx.selectedReciter = $event),
    "aria-label": "Select reciter"
  }, [_cache[103] || (_cache[103] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select a reciter", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.recitersSorted, reciter => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: reciter.identifier,
      value: reciter.identifier
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reciter.englishName), 9 /* TEXT, PROPS */, _hoisted_171);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedReciter]]), _cache[105] || (_cache[105] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted d-block mt-1"
  }, " Pick the reciter voice for audio playback. ", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_172, [_cache[107] || (_cache[107] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Translation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[26] || (_cache[26] = $event => _ctx.selectedTranslation = $event),
    "aria-label": "Select translation"
  }, [_cache[106] || (_cache[106] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select translation", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.translationsSorted, translation => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: translation.identifier,
      value: translation.identifier
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(translation.flag) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(translation.englishName), 9 /* TEXT, PROPS */, _hoisted_173);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedTranslation]]), _cache[108] || (_cache[108] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted d-block mt-1"
  }, " Choose the translation shown under each ayah. ", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_174, [_cache[110] || (_cache[110] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Tajweed colors & rules", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[27] || (_cache[27] = $event => _ctx.settingsDraft.showTajweed = $event),
    "aria-label": "Enable tajweed colors and rules"
  }, [...(_cache[109] || (_cache[109] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: true
  }, "Enabled", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: false
  }, "Disabled", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.settingsDraft.showTajweed]]), _cache[111] || (_cache[111] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted d-block mt-1"
  }, " Toggle the tajweed-colored text in the Quran and access the tajweed rules legend. ", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_175, [_cache[112] || (_cache[112] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Audio playback mode", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[28] || (_cache[28] = $event => _ctx.settingsDraft.playbackMode = $event),
    "aria-label": "Select audio playback mode"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.playbackModeOptions, option => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: option.value,
      value: option.value
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.label), 9 /* TEXT, PROPS */, _hoisted_176);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.settingsDraft.playbackMode]]), _ctx.draftPlaybackModeOption && _ctx.draftPlaybackModeOption.description ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_177, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.draftPlaybackModeOption.description), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_178, " Decide whether audio plays continuously, repeats, or stays manual. "))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_179, [_cache[114] || (_cache[114] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Word-for-word highlighting", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[29] || (_cache[29] = $event => _ctx.settingsDraft.showRealtimeHighlighting = $event),
    "aria-label": "Word-for-word highlighting"
  }, [...(_cache[113] || (_cache[113] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: true
  }, "Enabled", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: false
  }, "Disabled", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.settingsDraft.showRealtimeHighlighting]]), _cache[115] || (_cache[115] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted d-block mt-1"
  }, " Highlight each word as it is recited. ", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_180, [_cache[117] || (_cache[117] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Word-for-word translation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[30] || (_cache[30] = $event => _ctx.settingsDraft.showWordTranslation = $event),
    "aria-label": "Word-for-word translation"
  }, [...(_cache[116] || (_cache[116] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: true
  }, "Enabled", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: false
  }, "Disabled", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.settingsDraft.showWordTranslation]]), _cache[118] || (_cache[118] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted d-block mt-1"
  }, " Show a brief translation beneath each Arabic word. ", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_181, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn surah-settings-submit",
    onClick: _cache[31] || (_cache[31] = (...args) => _ctx.applySettingsModal && _ctx.applySettingsModal(...args)),
    "aria-label": "Apply settings"
  }, " Submit ")])])])])])), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [!_ctx.isMobile ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: "offcanvas offcanvas-end quran-font-offcanvas",
    tabindex: "-1",
    id: _ctx.fontPickerOffcanvasId,
    ref: "fontPickerOffcanvas",
    "aria-labelledby": "quranFontOffcanvasLabel"
  }, [_cache[121] || (_cache[121] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
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
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_183, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_184, [_ctx.quranFontsLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_185, " Loading Quran fonts... ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_186, [_ctx.quranFontsError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_187, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.quranFontsError), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_188, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.quranFonts, font => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: font.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["quran-font-option", {
        selected: _ctx.quranFontDraftId === font.id
      }]),
      onClick: $event => _ctx.selectQuranFontDraft(font.id)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_190, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_191, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      class: "form-check-input",
      type: "radio",
      id: `quran-font-${font.inputId}`,
      value: font.id,
      "onUpdate:modelValue": _cache[32] || (_cache[32] = $event => _ctx.quranFontDraftId = $event),
      onClick: _cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
    }, null, 8 /* PROPS */, _hoisted_192), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, _ctx.quranFontDraftId]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "form-check-label",
      for: `quran-font-${font.inputId}`,
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontFamily: font.cssStack
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(font.label), 13 /* TEXT, STYLE, PROPS */, _hoisted_193)]), font.source ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_194, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(font.source), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "quran-font-preview",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontFamily: font.cssStack
      })
    }, [_ctx.fontPreviewLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_195, " Loading preview... ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 1,
      class: "quran-font-preview-text",
      innerHTML: _ctx.getFontPreviewHtml(font)
    }, null, 8 /* PROPS */, _hoisted_196))], 4 /* STYLE */)], 10 /* CLASS, PROPS */, _hoisted_189);
  }), 128 /* KEYED_FRAGMENT */))])])), _ctx.fontPickerAlert ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_197, [_cache[120] || (_cache[120] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check-circle-fill"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.fontPickerAlert), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_198, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary",
    onClick: _cache[34] || (_cache[34] = (...args) => _ctx.closeFontPicker && _ctx.closeFontPicker(...args))
  }, " Cancel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn surah-settings-submit",
    disabled: !_ctx.quranFontDraftId,
    onClick: _cache[35] || (_cache[35] = (...args) => _ctx.applyQuranFontSelection && _ctx.applyQuranFontSelection(...args))
  }, " Submit ", 8 /* PROPS */, _hoisted_199)])])])], 8 /* PROPS */, _hoisted_182)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [_ctx.isMobile ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: "modal fade quran-font-modal",
    id: _ctx.fontPickerModalId,
    tabindex: "-1",
    "aria-labelledby": "quranFontModalLabel",
    "aria-hidden": "true",
    "data-bs-backdrop": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_201, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_202, [_cache[124] || (_cache[124] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title",
    id: "quranFontModalLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Quran fonts")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_203, [_cache[123] || (_cache[123] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "quran-font-subtitle"
  }, " Select a Quranic script. Preview uses Al-Fatiha 1 with tajweed colors. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_204, [_ctx.quranFontsLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_205, " Loading Quran fonts... ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_206, [_ctx.quranFontsError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_207, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.quranFontsError), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_208, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.quranFonts, font => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: font.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["quran-font-option", {
        selected: _ctx.quranFontDraftId === font.id
      }]),
      onClick: $event => _ctx.selectQuranFontDraft(font.id)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_210, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_211, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      class: "form-check-input",
      type: "radio",
      id: `quran-font-mobile-${font.inputId}`,
      value: font.id,
      "onUpdate:modelValue": _cache[36] || (_cache[36] = $event => _ctx.quranFontDraftId = $event),
      onClick: _cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
    }, null, 8 /* PROPS */, _hoisted_212), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, _ctx.quranFontDraftId]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "form-check-label",
      for: `quran-font-mobile-${font.inputId}`,
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontFamily: font.cssStack
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(font.label), 13 /* TEXT, STYLE, PROPS */, _hoisted_213)]), font.source ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_214, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(font.source), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "quran-font-preview",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        fontFamily: font.cssStack
      })
    }, [_ctx.fontPreviewLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_215, " Loading preview... ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 1,
      class: "quran-font-preview-text",
      innerHTML: _ctx.getFontPreviewHtml(font)
    }, null, 8 /* PROPS */, _hoisted_216))], 4 /* STYLE */)], 10 /* CLASS, PROPS */, _hoisted_209);
  }), 128 /* KEYED_FRAGMENT */))])])), _ctx.fontPickerAlert ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_217, [_cache[122] || (_cache[122] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check-circle-fill"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.fontPickerAlert), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_218, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary",
    onClick: _cache[38] || (_cache[38] = (...args) => _ctx.closeFontPicker && _ctx.closeFontPicker(...args))
  }, " Cancel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn surah-settings-submit",
    disabled: !_ctx.quranFontDraftId,
    onClick: _cache[39] || (_cache[39] = (...args) => _ctx.applyQuranFontSelection && _ctx.applyQuranFontSelection(...args))
  }, " Submit ", 8 /* PROPS */, _hoisted_219)])])])])])], 8 /* PROPS */, _hoisted_200)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Notes & Reflections Modal "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_220, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_221, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_222, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_223, [_cache[125] || (_cache[125] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "modal-title",
    id: "reflectionModalLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Reflect and Save a Thought")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    onClick: _cache[40] || (_cache[40] = (...args) => _ctx.hideReflectionModal && _ctx.hideReflectionModal(...args)),
    "aria-label": "Close reflection modal"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_224, [_cache[137] || (_cache[137] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "reflection-intro"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "reflection-intro-title"
  }, "Why reflections matter"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "reflection-intro-copy"
  }, " Capturing what moves you about this verse keeps its guidance fresh, anchors your spiritual growth, and helps the community spot inspirations worth sharing. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    class: "d-flex flex-column gap-3 mt-3",
    onSubmit: _cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => _ctx.submitReflectionForm && _ctx.submitReflectionForm(...args), ["prevent"])),
    novalidate: ""
  }, [_ctx.reflectionSuccessMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_225, [_cache[126] || (_cache[126] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check-circle-fill"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.reflectionSuccessMessage), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[127] || (_cache[127] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label fw-bold mb-1 medium-label"
  }, "Title", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    class: "form-control form-control-lg",
    "onUpdate:modelValue": _cache[41] || (_cache[41] = $event => _ctx.reflectionForm.subject = $event),
    placeholder: "Give this reflection a guiding intention",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.reflectionForm.subject]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[128] || (_cache[128] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label fw-bold mb-1 medium-label"
  }, "Message", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    class: "form-control form-control-lg",
    "onUpdate:modelValue": _cache[42] || (_cache[42] = $event => _ctx.reflectionForm.message = $event),
    rows: "5",
    minlength: _ctx.reflectionMessageMinLength,
    placeholder: "Type how this verse moved you today...",
    required: ""
  }, null, 8 /* PROPS */, _hoisted_226), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.reflectionForm.message]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_227, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_228, "Message must be at least " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.reflectionMessageMinLength) + " characters.", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_229, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_ctx.reflectionForm.message || '').trim().length) + " characters", 1 /* TEXT */)])]), _ctx.editingReflectionId ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_230, [_cache[129] || (_cache[129] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Editing saved reflection", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-link btn-sm text-decoration-underline p-0 small",
    onClick: _cache[43] || (_cache[43] = (...args) => _ctx.cancelReflectionEdit && _ctx.cancelReflectionEdit(...args))
  }, "Cancel edit")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["note-suggestions", {
      collapsed: _ctx.carouselCollapsed
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_231, [_cache[130] || (_cache[130] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "fw-semibold text-dark me-2"
  }, "Message prompts"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted"
  }, "Tap to adapt")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-ghost p-0 small",
    onClick: _cache[44] || (_cache[44] = $event => _ctx.carouselCollapsed = !_ctx.carouselCollapsed)
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", _ctx.carouselCollapsed ? 'bi-chevron-up' : 'bi-chevron-down'])
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.carouselCollapsed ? 'show prompts' : 'collapse'), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_232, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.reflectionMessagePromptRows, (rowPrompts, rowIndex) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: `row-${rowIndex}`,
      class: "suggestion-marquee-row"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_233, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["suggestion-track", {
        'is-paused': _ctx.carouselCollapsed
      }]),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(_ctx.suggestionTrackStyle(rowIndex + 1))
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_234, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(rowPrompts, (prompt, idx) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
        type: "button",
        class: "suggestion-pill light",
        key: `msg-${rowIndex}-${idx}`,
        onClick: $event => _ctx.applyMessageSuggestion(prompt.text)
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_236, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prompt.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prompt.text), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_235);
    }), 128 /* KEYED_FRAGMENT */))])], 6 /* CLASS, STYLE */)])]);
  }), 128 /* KEYED_FRAGMENT */))])], 2 /* CLASS */), _ctx.carouselCollapsed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_237, [_cache[132] || (_cache[132] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-muted small"
  }, "Message prompts are hidden", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn note-suggestions-toggle p-0",
    onClick: _cache[45] || (_cache[45] = $event => _ctx.carouselCollapsed = false)
  }, [...(_cache[131] || (_cache[131] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chevron-down me-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Show prompts ", -1 /* CACHED */)]))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.reflectionErrorMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_238, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.reflectionErrorMessage), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.currentAyahReflections.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_239, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_240, [_cache[133] || (_cache[133] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "reflection-history-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journal-text me-1 reflection-title-icon",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Saved reflections ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_241, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentAyahReflections.length) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentAyahReflections.length === 1 ? 'reflection' : 'reflections'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_242, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.currentAyahReflections, (note, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: note.id || index,
      class: "reflection-history-entry"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_243, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(note.subject || 'Untitled reflection'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_244, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(note.message), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_245, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn reflection-action edit-action",
      onClick: $event => _ctx.startEditingReflection(note, index)
    }, [...(_cache[134] || (_cache[134] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-pencil",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Edit", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_246), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn reflection-action delete-action",
      onClick: $event => _ctx.deleteReflection(note, index)
    }, [...(_cache[135] || (_cache[135] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-trash",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Delete", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_247)])]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_248, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary btn-lg",
    onClick: _cache[46] || (_cache[46] = (...args) => _ctx.hideReflectionModal && _ctx.hideReflectionModal(...args))
  }, " Cancel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-lg btn-primary ms-2",
    disabled: !_ctx.canSubmitReflection || _ctx.isSavingReflection
  }, [_ctx.isSavingReflection ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_250)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[136] || (_cache[136] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Save reflection ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_249)])], 32 /* NEED_HYDRATION */)])])])])])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Global Custom Audio Player "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [_ctx.showAudioPlayer ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_251, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_252, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_253, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[48] || (_cache[48] = $event => _ctx.rewindAudio(_ctx.currentlyPlayingIndex)),
    class: "control-btn",
    title: "Rewind",
    "aria-label": "Rewind 15 seconds"
  }, [...(_cache[138] || (_cache[138] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-skip-backward-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[49] || (_cache[49] = $event => _ctx.toggleAudioPlayer(_ctx.currentlyPlayingIndex)),
    class: "control-btn play-pause",
    title: "Play/Pause",
    "aria-label": "Play or Pause"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(_ctx.isAudioPlaying[_ctx.currentlyPlayingIndex] ? 'bi bi-pause-fill' : 'bi bi-play-fill')
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[50] || (_cache[50] = $event => _ctx.fastForwardAudio(_ctx.currentlyPlayingIndex)),
    class: "control-btn",
    title: "Fast Forward",
    "aria-label": "Fast forward 20 seconds"
  }, [...(_cache[139] || (_cache[139] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-skip-forward-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[51] || (_cache[51] = $event => _ctx.stopAudio(_ctx.currentlyPlayingIndex)),
    class: "control-btn",
    title: "Stop",
    "aria-label": "Stop"
  }, [...(_cache[140] || (_cache[140] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-stop-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[52] || (_cache[52] = (...args) => _ctx.toggleVolume && _ctx.toggleVolume(...args)),
    class: "control-btn",
    title: "Volume",
    "aria-label": "Toggle volume slider"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", `bi-volume-${_ctx.volume > 0.5 ? 'up' : _ctx.volume > 0 ? 'down' : 'mute'}-fill`])
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[53] || (_cache[53] = (...args) => _ctx.cyclePlaybackSpeed && _ctx.cyclePlaybackSpeed(...args)),
    class: "control-btn speed-control",
    title: 'Speed: ' + _ctx.playbackSpeed + 'x'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-speedometer2",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      color: _ctx.playbackSpeed !== 1 ? '#ff6b6b' : '#ccc'
    })
  }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_255, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.playbackSpeed) + "x", 1 /* TEXT */)], 8 /* PROPS */, _hoisted_254), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[54] || (_cache[54] = (...args) => _ctx.toggleRepeat && _ctx.toggleRepeat(...args)),
    class: "control-btn repeat-control",
    title: _ctx.repeatCurrent ? 'Repeat current ayah: on' : 'Repeat current ayah: off',
    "aria-pressed": _ctx.repeatCurrent,
    "aria-label": "Toggle repeat current ayah"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-repeat",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      color: _ctx.repeatCurrent ? '#00bfa6' : '#ccc'
    })
  }, null, 4 /* STYLE */)], 8 /* PROPS */, _hoisted_256), _ctx.showVolumeBar ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_257, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "range",
    "onUpdate:modelValue": _cache[55] || (_cache[55] = $event => _ctx.volume = $event),
    min: "0",
    max: "1",
    step: "0.1",
    onInput: _cache[56] || (_cache[56] = (...args) => _ctx.updateVolume && _ctx.updateVolume(...args)),
    class: "volume-slider"
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.volume]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_258, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.formatTime(((_ctx$audioElements$_c = _ctx.audioElements[_ctx.currentlyPlayingIndex]) === null || _ctx$audioElements$_c === void 0 ? void 0 : _ctx$audioElements$_c.currentTime) || 0)) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.formatTime(((_ctx$audioElements$_c2 = _ctx.audioElements[_ctx.currentlyPlayingIndex]) === null || _ctx$audioElements$_c2 === void 0 ? void 0 : _ctx$audioElements$_c2.duration) || 0)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[57] || (_cache[57] = (...args) => _ctx.closeAudioPlayer && _ctx.closeAudioPlayer(...args)),
    class: "control-btn",
    title: "Close",
    "aria-label": "Close player",
    style: {
      "margin-left": "auto"
    }
  }, [...(_cache[141] || (_cache[141] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg mb-2"
  }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-bar",
    role: "progressbar",
    "aria-label": "Audio playback progress",
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": _ctx.progress[_ctx.currentlyPlayingIndex] || 0,
    "aria-valuetext": `Progress ${Math.round(_ctx.progress[_ctx.currentlyPlayingIndex] || 0)} percent`,
    onClick: _cache[58] || (_cache[58] = (...args) => _ctx.seekToPosition && _ctx.seekToPosition(...args)),
    onMousedown: _cache[59] || (_cache[59] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => _ctx.onProgressDown && _ctx.onProgressDown(...args), ["prevent"])),
    onTouchstartPassive: _cache[60] || (_cache[60] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => _ctx.onProgressDown && _ctx.onProgressDown(...args), ["prevent"])),
    ref: "progressBar"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: _ctx.progress[_ctx.currentlyPlayingIndex] + '%'
    })
  }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_260, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.visualizerBars, (bar, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: index,
      class: "visualizer-bar",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        height: bar + '%',
        animationDelay: index * 0.1 + 's'
      })
    }, null, 4 /* STYLE */);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */)], 40 /* PROPS, NEED_HYDRATION */, _hoisted_259),  false ? (0) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[63] || (_cache[63] = (...args) => _ctx.scrollToTop && _ctx.scrollToTop(...args)),
    class: "surah-scroll-top",
    "aria-label": "Scroll to top"
  }, [...(_cache[143] || (_cache[143] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-up"
  }, null, -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.showScrollTop]])], 6 /* CLASS, STYLE */), _cache[145] || (_cache[145] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" t", -1 /* CACHED */))], 64 /* STABLE_FRAGMENT */);
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "SuratComponent",
  components: {
    BookmarkModal: _vue_bookmarks_BookmarkModal_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  data: function () {
    return {
      // responsive a11y
      isMobile: false,
      isTabletOrMobile: false,
      isTablet: false,
      // a11y
      selectedCardIndex: 0,
      screenReaderMessage: "",
      isComponentAlive: true,
      isInitialLoad: true,
      selectedSurah: "1",
      selectedReciter: "ar.alafasy",
      selectedTranslation: "en.ahmedali",
      isAudioPlaying: [],
      isAudioLoading: [],
      isAudioDownloading: {},
      isAudioDownloaded: {},
      isSurahAudioDownloading: false,
      isSurahAudioDownloaded: false,
      surahAudioDownloadedTimer: null,
      currentlyPlaying: null,
      currentlyPlayingIndex: 0,
      isVisible: true,
      surahs: [],
      reciters: [],
      translations: [],
      surahDetails: null,
      surahInfo: null,
      surahInfoText: "",
      surahInfoShortText: "",
      surahInfoSource: "",
      surahInfoSourceUrl: "",
      surahInfoLoading: false,
      surahInfoError: "",
      surahInfoModalId: "surahInfoModal",
      surahInfoModalInstance: null,
      settingsModalId: "surahSettingsModal",
      settingsModalInstance: null,
      fontPickerOffcanvasId: "quranFontOffcanvas",
      fontPickerModalId: "quranFontModal",
      fontPickerOffcanvasInstance: null,
      fontPickerModalInstance: null,
      quranFonts: [],
      quranFontsLoading: false,
      quranFontsError: "",
      selectedQuranFontId: "",
      quranFontDraftId: "",
      quranFontPreferenceKey: "suratSelectedFont",
      quranFontStackPreferenceKey: "suratSelectedFontStack",
      storedQuranFontStack: "",
      fontPreviewText: "",
      fontPreviewTajweedText: "",
      fontPreviewFallbackText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      fontPreviewLoading: false,
      fontPreviewError: "",
      fontPickerAlert: "",
      fontPickerAlertTimer: null,
      defaultQuranFontStack: "'Scheherazade New', 'Noto Naskh Arabic', 'Amiri', serif",
      surahInfoFontSize: 16,
      surahInfoFontSizeMin: 14,
      surahInfoFontSizeMax: 22,
      searchQuery: "",
      debouncedQuery: "",
      debounceTimer: null,
      arabicFontSize: 28,
      translationFontSize: 20,
      isTranslationVisible: true,
      translationVisibility: {},
      showTajweed: false,
      showRealtimeHighlighting: false,
      showWordTranslation: false,
      realtimeHighlightPreferenceKey: "surat_realtime_highlighting",
      wordTranslationPreferenceKey: "surat_show_word_translation",
      progress: [],
      audioElements: [],
      playbackSpeed: 1.0,
      volume: 1.0,
      showVolumeBar: false,
      showAudioPlayer: false,
      isHighlighted: false,
      showScrollTop: false,
      // scrubbing state
      isScrubbing: false,
      _boundMove: null,
      _boundUp: null,
      wordTimings: [],
      isLoading: false,
      isNavigating: false,
      // Prevents scroll conflicts during jumps
      headerCollapsed: false,
      // Controls whether the toolbar/links are visible
      continuousPlayback: false,
      // Legacy flag; new playbackMode supersedes it
      visualizerBars: Array(20).fill(10),
      playbackSpeeds: [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5],
      currentSpeedIndex: 2,
      playbackMode: "continuous",
      preferredPlaybackMode: "continuous",
      playbackModeOptions: [{
        value: "continuous",
        label: "Play the entire surah continuously",
        description: "Navigate from ayah to ayah without stopping until the surah ends."
      }, {
        value: "repeat",
        label: "Repeat the current ayah",
        description: "Loop just the ayah you are on until you pause or switch it off."
      }, {
        value: "manual",
        label: "Play single ayah manually",
        description: "Listen to one ayah at a time and tap play again when you are ready."
      }],
      highlightLeadSeconds: 0.05,
      _lastSegmentIndex: -1,
      currentAudioIndex: -1,
      reciterLeadOffsets: {},
      reciterDefaultLeadOffsets: {
        "ar.abdulbasitmurattal": 0.05,
        "ar.abdurrahmaansudais": 0.05,
        "ar.hanirifai": 0.05,
        "ar.husary": 0.05,
        "ar.alafasy": 0.05,
        "ar.minshawi": 0.05,
        "ar.saoodshuraym": 0.05
      },
      reciterTimingMap: {
        "ar.abdulbasitmurattal": 2,
        "ar.abdurrahmaansudais": 3,
        "ar.hanirifai": 5,
        "ar.husary": 6,
        "ar.alafasy": 7,
        "ar.minshawi": 9,
        "ar.saoodshuraym": 10
      },
      favoriteReciters: ["ar.alafasy", "ar.abdulbasitmurattal"],
      favoriteTranslations: ["en.ahmedali", "en.sahih"],
      lastAutoScrollAt: 0,
      lastManualNavigationAt: 0,
      isManualScrolling: false,
      manualScrollTimer: null,
      autoSyncLockUntil: 0,
      ayahScrubValue: 1,
      // perf throttles
      lastProgressAt: 0,
      lastVizAt: 0,
      // track last programmatic scroll to avoid jitter
      lastAutoScrollIndex: null,
      lastProgrammaticScrollAt: 0,
      preferredPlaybackScrollFactor: 0.38,
      _scrollCorrectionTimer: null,
      _scrollCorrectionToken: 0,
      _navigationSettleTimer: null,
      _navigationSettleToken: 0,
      navigationTargetIndex: null,
      navigationTargetTolerance: 12,
      windowLockUntil: 0,
      windowLockIndex: null,
      // request control
      _surahAborter: null,
      // delayed spinner timers per index
      loadingTimers: [],
      // virtualization
      itemHeight: 280,
      windowSize: 22,
      buffer: 6,
      visibleStart: 0,
      visibleEnd: 0,
      listTop: 0,
      _heightMeasureRaf: null,
      _virtualWindowRaf: null,
      itemHeightCalibrated: false,
      // Next-step card visibility
      showNextStep: true,
      nextStepMinimized: false,
      activeAyah: null,
      savedAyahKeys: {},
      savedAyahsLoaded: false,
      savedAyahClearTimer: null,
      bookmarkStorageUserId: null,
      bookmarkAnonId: null,
      savedAyahStorageKey: "ic_saved_ayahs_session",
      feedbackMessages: {},
      // Keyed by ayahID, value: { text, class }
      bookmarkToast: "",
      bookmarkToastAction: null,
      bookmarkToastTimer: null,
      bookmarkInstanceId: `surat-${Math.random().toString(36).slice(2)}`,
      bookmarkEventHandler: null,
      bookmarkStorageHandler: null,
      visibilityHandler: null,
      authAlert: "",
      authAlertTimer: null,
      deepLinkTarget: null,
      deepLinkHandled: false,
      bookmarkAuthenticated: false,
      ayahReflections: {},
      // key -> array of reflection entries
      reflectionModalId: "ayahReflectionModal",
      reflectionModalInstance: null,
      reflectionModalHiddenHandler: null,
      selectedAyahForReflection: null,
      selectedReflectionKey: "",
      reflectionForm: {
        subject: "",
        message: ""
      },
      reflectionSubjectSuggestions: ["Gratitude for divine guidance", "How this verse comforts me", "Commitment to the lesson"],
      reflectionMessagePrompts: [{
        icon: "✨",
        text: "This reminded me to pause and thank Allah for His mercy."
      }, {
        icon: "🌿",
        text: "I can implement this by showing patience with my family today."
      }, {
        icon: "🕊️",
        text: "I feel my trust in Allah growing every time I read this."
      }, {
        icon: "🔥",
        text: "Let this verse guide the way I handle challenges."
      }, {
        icon: "💭",
        text: "I promise to keep this verse in mind during moments of doubt."
      }, {
        icon: "🌙",
        text: "It gave me strength to keep my prayers steady tonight."
      }, {
        icon: "🧭",
        text: "The advice feels like a compass when I need direction."
      }, {
        icon: "🌟",
        text: "I am taking this lesson with me into today’s actions."
      }, {
        icon: "🤲",
        text: "This verse inspires me to make dua for others."
      }],
      reflectionMessageMinLength: 10,
      reflectionErrorMessage: "",
      reflectionSuccessMessage: "",
      reflectionSuccessTimeout: null,
      ayahReflectionKeys: {},
      editingReflectionId: null,
      editingReflectionIndex: null,
      reflectionCacheKey: "",
      reflectionGeneralStorageKey: "ic_reflection_keys",
      isSavingReflection: false,
      showReflectionHighlight: true,
      carouselCollapsed: false,
      promptRowCount: 3,
      surahSearchQuery: "",
      activeSidebarTab: "surah",
      sidebarSearchQuery: "",
      selectedJuz: null,
      sidebarCollapsed: false,
      settingsDraft: {
        showTajweed: false,
        showRealtimeHighlighting: false,
        showWordTranslation: false,
        playbackMode: "continuous"
      },
      tajweedRuleMap: {
        h: {
          en: "Hamzat Wasl",
          ar: "همزة وصل",
          desc: "Pronounced only when starting the word; dropped when connected.",
          arDesc: "تُنطق في بداية الكلمة وتسقط عند الوصل."
        },
        l: {
          en: "Lam Shamsiyyah",
          ar: "لام شمسية",
          desc: "The lam is silent and the next letter is doubled.",
          arDesc: "تُسقط اللام ويُشدَّد الحرف الذي بعدها."
        },
        n: {
          en: "Madd Normal",
          ar: "مد طبيعي",
          desc: "Basic stretch of 2 counts.",
          arDesc: "مد طبيعي بمقدار حركتين."
        },
        p: {
          en: "Madd Permissible",
          ar: "مد جائز",
          desc: "Stretch 2, 4, or 6 counts when a hamzah comes in the next word.",
          arDesc: "يمد ٢ أو ٤ أو ٦ حركات عند وجود همزة في الكلمة التالية."
        },
        m: {
          en: "Madd Necessary",
          ar: "مد لازم",
          desc: "Stretch 6 counts because of a permanent sukun.",
          arDesc: "يمد ٦ حركات لوجود سكون لازم."
        },
        o: {
          en: "Madd Obligatory",
          ar: "مد واجب",
          desc: "Stretch 4 or 5 counts when a hamzah is in the same word.",
          arDesc: "يمد ٤ أو ٥ حركات لوجود همزة في نفس الكلمة."
        },
        a: {
          en: "Idgham with Ghunnah",
          ar: "إدغام بغنة",
          desc: "Merge the noon or tanwin into the next letter with a nasal sound.",
          arDesc: "إدماج النون أو التنوين مع غنة."
        },
        u: {
          en: "Idgham without Ghunnah",
          ar: "إدغام بدون غنة",
          desc: "Merge the noon or tanwin into the next letter without nasal sound.",
          arDesc: "إدماج النون أو التنوين بدون غنة."
        },
        g: {
          en: "Ghunnah",
          ar: "غنة",
          desc: "Hold a nasal sound for about 2 counts.",
          arDesc: "غنة بمقدار حركتين."
        },
        q: {
          en: "Qalqalah",
          ar: "قلقلة",
          desc: "Give a light echo on ق ط ب ج د when they are sakin.",
          arDesc: "قلقلة خفيفة لحروف قطب جد عند السكون."
        },
        f: {
          en: "Ikhfa",
          ar: "إخفاء",
          desc: "Hide the noon or tanwin with a nasal sound before certain letters.",
          arDesc: "إخفاء النون أو التنوين مع غنة قبل حروف الإخفاء."
        },
        c: {
          en: "Ikhfa Shafawi",
          ar: "إخفاء شفوي",
          desc: "Lightly hide م before ب with a nasal sound.",
          arDesc: "إخفاء الميم قبل الباء مع غنة خفيفة."
        },
        w: {
          en: "Idgham Shafawi",
          ar: "إدغام شفوي",
          desc: "Merge م into the next م with a nasal sound.",
          arDesc: "إدغام الميم في الميم مع غنة."
        },
        i: {
          en: "Iqlab",
          ar: "إقلاب",
          desc: "Change noon or tanwin to a hidden م sound before ب.",
          arDesc: "قلب النون أو التنوين إلى ميم مخفاة قبل الباء."
        },
        d: {
          en: "Idgham Mutajanisayn",
          ar: "إدغام متجانسين",
          desc: "Merge letters from the same articulation group.",
          arDesc: "إدغام حرفين من مخرج واحد."
        },
        b: {
          en: "Idgham Mutaqaribayn",
          ar: "إدغام متقاربين",
          desc: "Merge letters that are close in articulation.",
          arDesc: "إدغام حرفين متقاربين في المخرج."
        },
        s: {
          en: "Silent",
          ar: "ساكن",
          desc: "No vowel sound on the letter.",
          arDesc: "حرف بلا حركة صوتية."
        }
      }
    };
  },
  computed: {
    isAnyAudioPlaying() {
      return Array.isArray(this.isAudioPlaying) ? this.isAudioPlaying.some(Boolean) : false;
    },
    activeAyahIndex() {
      return this.isAnyAudioPlaying ? this.currentlyPlayingIndex : this.selectedCardIndex;
    },
    filteredJuzs() {
      const query = (this.sidebarSearchQuery || "").trim().toLowerCase();
      const allJuz = Array.from({
        length: 30
      }, (_, i) => i + 1);

      // Map to objects with metadata
      const juzWithMetadata = allJuz.map(j => {
        const start = _utils_quran_mappings__WEBPACK_IMPORTED_MODULE_1__.JUZ_START_MAPPING[j];
        let surahName = "";
        if (start && this.surahs.length > 0) {
          const s = this.surahs.find(s => s.number === start.surah);
          surahName = s ? s.englishName : `Surah ${start.surah}`;
        }
        return {
          number: j,
          surahNumber: start ? start.surah : 0,
          ayahNumber: start ? start.ayah : 0,
          surahName: surahName
        };
      });
      if (!query) return juzWithMetadata;
      return juzWithMetadata.filter(j => j.number.toString().includes(query) || `juz ${j.number}`.includes(query) || j.surahName.toLowerCase().includes(query));
    },
    filteredPages() {
      const query = (this.sidebarSearchQuery || "").trim().toLowerCase();
      const allPages = Array.from({
        length: 604
      }, (_, i) => i + 1);
      if (!query) return allPages;
      return allPages.filter(p => p.toString().includes(query) || `page ${p}`.includes(query));
    },
    filteredVersesList() {
      if (!this.surahDetails || !this.surahDetails.ayahs) return [];
      const query = (this.sidebarSearchQuery || "").trim().toLowerCase();
      if (!query) {
        return this.surahDetails.ayahs.map(a => ({
          number: a.numberInSurah,
          text: a.text,
          translation: a.translation,
          key: a.numberInSurah
        }));
      }
      return this.surahDetails.ayahs.filter(a => String(a.numberInSurah).includes(query) || a.lowerText && a.lowerText.includes(query) || a.lowerTranslation && a.lowerTranslation.includes(query)).map(a => ({
        number: a.numberInSurah,
        text: a.text,
        translation: a.translation,
        key: a.numberInSurah
      }));
    },
    filteredSurahs_sidebar() {
      if (!Array.isArray(this.surahs)) return [];
      const raw = (this.sidebarSearchQuery || "").trim().toLowerCase();
      if (!raw) return this.surahs;
      return this.surahs.filter(surah => {
        const english = (surah.englishName || "").toLowerCase();
        const arabic = (surah.name || "").toLowerCase();
        const number = String(surah.number || "");
        return english.includes(raw) || arabic.includes(raw) || number.includes(raw);
      });
    },
    isRepeatMode() {
      return this.playbackMode === "repeat";
    },
    currentPlaybackModeOption() {
      return this.playbackModeOptions.find(option => option.value === this.playbackMode) || this.playbackModeOptions[0];
    },
    draftPlaybackModeOption() {
      var _this$settingsDraft;
      const selected = (_this$settingsDraft = this.settingsDraft) === null || _this$settingsDraft === void 0 ? void 0 : _this$settingsDraft.playbackMode;
      return this.playbackModeOptions.find(option => option.value === selected) || this.currentPlaybackModeOption;
    },
    activeQuranFont() {
      if (!Array.isArray(this.quranFonts) || !this.quranFonts.length) return null;
      return this.quranFonts.find(font => font.id === this.selectedQuranFontId) || this.quranFonts[0] || null;
    },
    quranFontStyle() {
      var _this$activeQuranFont;
      const stack = this.storedQuranFontStack || ((_this$activeQuranFont = this.activeQuranFont) === null || _this$activeQuranFont === void 0 ? void 0 : _this$activeQuranFont.cssStack) || this.defaultQuranFontStack;
      return {
        "--ic-quran-arabic-font": stack
      };
    },
    tajweedLegend() {
      return Object.keys(this.tajweedRuleMap).sort().map(name => {
        var _this$tajweedRuleMap$, _this$tajweedRuleMap$2, _this$tajweedRuleMap$3, _this$tajweedRuleMap$4;
        return {
          name,
          code: name,
          label: ((_this$tajweedRuleMap$ = this.tajweedRuleMap[name]) === null || _this$tajweedRuleMap$ === void 0 ? void 0 : _this$tajweedRuleMap$.en) || name,
          ar: ((_this$tajweedRuleMap$2 = this.tajweedRuleMap[name]) === null || _this$tajweedRuleMap$2 === void 0 ? void 0 : _this$tajweedRuleMap$2.ar) || "",
          desc: ((_this$tajweedRuleMap$3 = this.tajweedRuleMap[name]) === null || _this$tajweedRuleMap$3 === void 0 ? void 0 : _this$tajweedRuleMap$3.desc) || "",
          arDesc: ((_this$tajweedRuleMap$4 = this.tajweedRuleMap[name]) === null || _this$tajweedRuleMap$4 === void 0 ? void 0 : _this$tajweedRuleMap$4.arDesc) || ""
        };
      });
    },
    surahInfoSourceLabel() {
      return this.surahInfoSource || "Quran.com";
    },
    surahInfoSourceHost() {
      const rawUrl = this.surahInfoSourceUrl || "https://quran.com";
      try {
        return new URL(rawUrl).hostname.replace(/^www\./, "");
      } catch (_) {
        return "";
      }
    },
    reflectionMessagePromptRows() {
      const prompts = this.reflectionMessagePrompts || [];
      const perRow = 5;
      const rows = [];
      if (!prompts.length) return rows;
      for (let rowIndex = 0; rowIndex < this.promptRowCount; rowIndex++) {
        const start = rowIndex * perRow % prompts.length;
        const rowPrompts = [];
        for (let offset = 0; offset < perRow; offset++) {
          const prompt = prompts[(start + offset) % prompts.length];
          if (!rowPrompts.some(p => p.text === prompt.text)) {
            rowPrompts.push(prompt);
          }
          if (rowPrompts.length >= perRow) break;
        }
        rows.push(rowPrompts);
      }
      return rows;
    },
    filteredAyahs: function () {
      if (!this.surahDetails) return [];
      if (!this.debouncedQuery) return this.surahDetails.ayahs;
      const query = this.debouncedQuery.toLowerCase();
      return this.surahDetails.ayahs.filter(ayah => ayah.lowerText && ayah.lowerText.includes(query) || ayah.lowerTranslation && ayah.lowerTranslation.includes(query));
    },
    filteredSurahs() {
      if (!Array.isArray(this.surahs)) return [];
      const raw = (this.surahSearchQuery || "").trim().toLowerCase();
      if (!raw) return this.surahs;
      return this.surahs.filter(surah => {
        const english = (surah.englishName || "").toLowerCase();
        const arabic = (surah.name || "").toLowerCase();
        const number = String(surah.number || "");
        return english.includes(raw) || arabic.includes(raw) || number.includes(raw);
      });
    },
    currentSurahInfo() {
      var _this$surahDetails;
      const target = Number(((_this$surahDetails = this.surahDetails) === null || _this$surahDetails === void 0 ? void 0 : _this$surahDetails.surahNumber) || this.selectedSurah);
      if (!target || !Array.isArray(this.surahs)) return null;
      return this.surahs.find(surah => Number(surah.number) === target) || null;
    },
    currentSurahMeta() {
      var _this$surahDetails2, _this$surahDetails3, _this$currentSurahInf, _this$currentSurahInf2, _this$currentSurahInf3, _this$currentSurahInf4;
      if (!this.surahDetails && !this.surahInfo) return {};
      const inSurah = ((_this$surahDetails2 = this.surahDetails) === null || _this$surahDetails2 === void 0 || (_this$surahDetails2 = _this$surahDetails2.ayahs) === null || _this$surahDetails2 === void 0 ? void 0 : _this$surahDetails2.length) || 0;
      const cached = this.surahInfo;
      const surahNumber = Number(((_this$surahDetails3 = this.surahDetails) === null || _this$surahDetails3 === void 0 ? void 0 : _this$surahDetails3.surahNumber) || this.selectedSurah);
      return {
        ayahCount: (cached === null || cached === void 0 ? void 0 : cached.numberOfAyahs) || inSurah || ((_this$currentSurahInf = this.currentSurahInfo) === null || _this$currentSurahInf === void 0 ? void 0 : _this$currentSurahInf.numberOfAyahs) || ((_this$currentSurahInf2 = this.currentSurahInfo) === null || _this$currentSurahInf2 === void 0 || (_this$currentSurahInf2 = _this$currentSurahInf2.ayahs) === null || _this$currentSurahInf2 === void 0 ? void 0 : _this$currentSurahInf2.length) || 0,
        origin: (cached === null || cached === void 0 ? void 0 : cached.revelationType) || ((_this$currentSurahInf3 = this.currentSurahInfo) === null || _this$currentSurahInf3 === void 0 ? void 0 : _this$currentSurahInf3.revelationType),
        number: surahNumber || ((_this$currentSurahInf4 = this.currentSurahInfo) === null || _this$currentSurahInf4 === void 0 ? void 0 : _this$currentSurahInf4.number)
      };
    },
    currentMobileAyah() {
      const ayahs = Array.isArray(this.filteredAyahs) ? this.filteredAyahs : [];
      if (!ayahs.length) return null;
      const index = Math.min(Math.max(0, Number(this.currentlyPlayingIndex) || 0), ayahs.length - 1);
      return ayahs[index] || ayahs[0];
    },
    mobilePageLabel() {
      var _this$currentMobileAy;
      const page = (_this$currentMobileAy = this.currentMobileAyah) === null || _this$currentMobileAy === void 0 ? void 0 : _this$currentMobileAy.page;
      if (page) return `Page ${page}`;
      return "Page —";
    },
    mobileJuzLabel() {
      var _this$currentMobileAy2;
      const juz = (_this$currentMobileAy2 = this.currentMobileAyah) === null || _this$currentMobileAy2 === void 0 ? void 0 : _this$currentMobileAy2.juz;
      return juz ? `Juz ${juz}` : "";
    },
    mobileHizbLabel() {
      var _this$currentMobileAy3, _this$currentMobileAy4;
      const hizb = ((_this$currentMobileAy3 = this.currentMobileAyah) === null || _this$currentMobileAy3 === void 0 ? void 0 : _this$currentMobileAy3.hizb) || (typeof ((_this$currentMobileAy4 = this.currentMobileAyah) === null || _this$currentMobileAy4 === void 0 ? void 0 : _this$currentMobileAy4.hizbQuarter) === "number" ? Math.ceil(this.currentMobileAyah.hizbQuarter / 4) : null);
      return hizb ? `Hizb ${hizb}` : "";
    },
    mobileSurahLabel() {
      var _this$surahDetails4, _this$surahDetails5, _this$surahDetails6, _this$currentSurahInf5, _this$currentSurahInf6;
      const surahNumber = ((_this$surahDetails4 = this.surahDetails) === null || _this$surahDetails4 === void 0 ? void 0 : _this$surahDetails4.surahNumber) || this.selectedSurah;
      const surahName = ((_this$surahDetails5 = this.surahDetails) === null || _this$surahDetails5 === void 0 ? void 0 : _this$surahDetails5.englishName) || ((_this$surahDetails6 = this.surahDetails) === null || _this$surahDetails6 === void 0 ? void 0 : _this$surahDetails6.name) || ((_this$currentSurahInf5 = this.currentSurahInfo) === null || _this$currentSurahInf5 === void 0 ? void 0 : _this$currentSurahInf5.englishName) || ((_this$currentSurahInf6 = this.currentSurahInfo) === null || _this$currentSurahInf6 === void 0 ? void 0 : _this$currentSurahInf6.name) || "Surah";
      if (surahNumber && surahName) {
        return `${surahNumber}. ${surahName}`;
      }
      return surahName;
    },
    mainReciterIds() {
      const primary = this.reciterTimingMap ? Object.keys(this.reciterTimingMap) : [];
      if (primary.length) return new Set(primary);
      return new Set(this.favoriteReciters || []);
    },
    recitersSorted() {
      if (!Array.isArray(this.reciters)) return [];
      const mainIds = this.mainReciterIds;
      const reciters = mainIds.size ? this.reciters.filter(reciter => mainIds.has(reciter.identifier)) : this.reciters;
      const fav = new Set(this.favoriteReciters);
      const synced = new Set(this.reciterTimingMap ? Object.keys(this.reciterTimingMap) : []);
      return [...reciters].sort((a, b) => {
        const as = synced.has(a.identifier) ? 0 : 1;
        const bs = synced.has(b.identifier) ? 0 : 1;
        if (as !== bs) return as - bs;
        const ap = fav.has(a.identifier) ? 0 : 1;
        const bp = fav.has(b.identifier) ? 0 : 1;
        if (ap !== bp) return ap - bp;
        return (a.englishName || "").localeCompare(b.englishName || "");
      });
    },
    translationsSorted() {
      if (!Array.isArray(this.translations)) return [];
      const fav = new Set(this.favoriteTranslations);
      return [...this.translations].sort((a, b) => {
        const ap = fav.has(a.identifier) ? 0 : 1;
        const bp = fav.has(b.identifier) ? 0 : 1;
        if (ap !== bp) return ap - bp;
        if ((a.flag || "") !== (b.flag || "")) return (a.flag || "").localeCompare(b.flag || "");
        return (a.englishName || "").localeCompare(b.englishName || "");
      });
    },
    currentTranslationName() {
      if (!Array.isArray(this.translations)) return "Translation";
      const match = this.translations.find(t => t.identifier === this.selectedTranslation);
      return (match === null || match === void 0 ? void 0 : match.englishName) || "Translation";
    },
    currentActionAyah() {
      if (!Array.isArray(this.filteredAyahs) || this.filteredAyahs.length === 0) return null;
      const index = Math.min(Math.max(this.selectedCardIndex, 0), this.filteredAyahs.length - 1);
      return this.filteredAyahs[index] || this.filteredAyahs[0] || null;
    },
    totalItems() {
      return Array.isArray(this.filteredAyahs) ? this.filteredAyahs.length : 0;
    },
    canMinimizeNextStep() {
      return this.isMobile || this.isTablet;
    },
    isNextStepMinimized() {
      return this.canMinimizeNextStep && this.nextStepMinimized;
    },
    currentHeaderOffset() {
      // Measure sticky header height when possible for accurate scroll offsets
      try {
        const sticky = this.$refs && this.$refs.stickyDropdown;
        if (sticky && sticky.getBoundingClientRect) {
          const rect = sticky.getBoundingClientRect();
          if (rect && rect.height) {
            return rect.height;
          }
        }
      } catch (_) {}
      // Fallback if measurement isn't available yet
      return this.headerCollapsed ? 40 : 180;
    },
    visibleWindow() {
      const start = Math.max(0, Math.min(this.visibleStart, this.totalItems));
      const end = Math.max(start, Math.min(this.visibleEnd, this.totalItems));
      const out = [];
      if (!this.surahDetails || !Array.isArray(this.filteredAyahs)) return out;
      for (let i = start; i < end; i++) out.push({
        index: i,
        ayah: this.filteredAyahs[i]
      });
      return out;
    },
    topSpacerHeight() {
      return Math.max(0, this.visibleStart * this.itemHeight);
    },
    bottomSpacerHeight() {
      const end = Math.max(this.visibleEnd, this.visibleStart);
      const remaining = Math.max(0, this.totalItems - end);
      return remaining * this.itemHeight;
    },
    currentAyahReflections() {
      if (!this.selectedReflectionKey) return [];
      const reflections = this.ayahReflections[this.selectedReflectionKey];
      return Array.isArray(reflections) ? reflections : [];
    },
    canPlaySurah() {
      return !this.isLoading && Array.isArray(this.filteredAyahs) && this.filteredAyahs.length > 0;
    },
    canSubmitReflection() {
      const subject = (this.reflectionForm.subject || "").trim();
      const message = (this.reflectionForm.message || "").trim();
      return subject.length > 0 && message.length >= this.reflectionMessageMinLength;
    }
  },
  watch: {
    savedAyahKeys: {
      deep: true,
      handler(next) {
        this.persistSavedAyahs(next);
      }
    },
    searchQuery: function (val) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.debouncedQuery = val;
      }, 300);
    },
    selectedQuranFontId(newVal) {
      if (!newVal) return;
      this.persistLocalSetting(this.quranFontPreferenceKey, newVal);
      this.syncQuranFontStack(newVal);
    },
    selectedReciter: function (newVal) {
      if (newVal && !this.isLoading) {
        this.isSurahAudioDownloading = false;
        this.isSurahAudioDownloaded = false;
        clearTimeout(this.surahAudioDownloadedTimer);
        this.surahAudioDownloadedTimer = null;
        this.persistLocalSetting("suratSelectedReciter", newVal);
        this.isLoading = true;
        this.savePreference("selectedReciter", newVal);
        this.highlightLeadSeconds = this.getReciterLeadOffset(newVal);
        this.currentlyPlayingIndex = 0;
        this.isHighlighted = false;
        this.fetchSurahDetails().then(() => {
          this.resetAllAudioPlayers();
          this.isLoading = false;
          this.syncVirtualWindowAfterSelection();
        }).catch(() => {
          this.isLoading = false;
        });
      }
    },
    selectedTranslation: function (newVal) {
      if (newVal && !this.isLoading) {
        this.persistLocalSetting("suratSelectedTranslation", newVal);
        this.isLoading = true;
        this.savePreference("selectedTranslation", newVal);
        this.currentlyPlayingIndex = 0;
        this.isHighlighted = false;
        this.fetchSurahDetails().then(() => {
          this.isLoading = false;
          this.resetAllAudioPlayers();
          this.syncVirtualWindowAfterSelection();
        }).catch(() => {
          this.isLoading = false;
        });
      }
    },
    selectedSurah: function (newVal) {
      if (newVal && !this.isLoading) {
        this.isSurahAudioDownloading = false;
        this.isSurahAudioDownloaded = false;
        clearTimeout(this.surahAudioDownloadedTimer);
        this.surahAudioDownloadedTimer = null;
        this.persistLocalSetting("suratSelectedSurah", newVal);
        this.isLoading = true;
        this.translationVisibility = {};
        this.savePreference("selectedSurah", newVal);
        this.currentlyPlayingIndex = 0;
        this.isHighlighted = false;
        this.fetchSurahDetails().then(() => {
          this.resetAllAudioPlayers();
          this.isLoading = false;
          this.syncVirtualWindowAfterSelection();
        }).catch(() => {
          this.isLoading = false;
        });
      }
    },
    filteredAyahs: function (newAyahs) {
      const n = newAyahs.length;
      // Reuse arrays to reduce reactive churn
      this.isAudioPlaying.length = n;
      this.isAudioPlaying.fill(false);
      this.isAudioLoading.length = n;
      this.isAudioLoading.fill(false);
      this.progress.length = n;
      this.progress.fill(0);
      this.audioElements.length = n;
      for (let i = 0; i < n; i++) if (this.audioElements[i] === undefined) this.audioElements[i] = null;
      // Do not pre-create audio elements; create on-demand for faster starts
      // Reset virtualization window to top ONLY if not navigating
      if (!this.isNavigating) {
        this.visibleStart = 0;
        this.visibleEnd = Math.min(this.windowSize + this.buffer * 2, n);
      }
      this.ayahScrubValue = Math.min(Math.max(1, this.ayahScrubValue), Math.max(n, 1));
      this.$nextTick(this.updateVirtualWindow);
    },
    currentlyPlayingIndex(next) {
      if (typeof next !== "number" || next < 0) return;
      this.ayahScrubValue = next + 1;
      this.syncPlaybackScroll(next);
    },
    showTajweed(next) {
      try {
        localStorage.setItem("suratShowTajweed", next ? "1" : "0");
      } catch (_) {}
      const index = this.currentlyPlayingIndex;
      const audio = this.audioElements[index];
      const ayah = this.filteredAyahs[index];
      if (audio && ayah && audio.duration) {
        this.updateWordTimings(ayah, audio.duration);
      }
      this._lastHighlightIndex = -1;
      this.clearActiveWordHighlight();
    },
    showRealtimeHighlighting(next) {
      try {
        localStorage.setItem("suratShowRealtimeHighlighting", next ? "1" : "0");
      } catch (_) {}
      if (this.bookmarkAuthenticated) {
        this.savePreference(this.realtimeHighlightPreferenceKey, {
          enabled: !!next
        });
      }
      if (!next) {
        this.stopHighlightLoop();
        return;
      }
      this._lastHighlightIndex = -1;
      if (typeof this.currentAudioIndex !== "number" || this.currentAudioIndex < 0) {
        const playingIndex = Array.isArray(this.isAudioPlaying) ? this.isAudioPlaying.findIndex(Boolean) : -1;
        if (playingIndex >= 0) {
          this.currentAudioIndex = playingIndex;
        }
      }
      const idx = typeof this.currentAudioIndex === "number" && this.currentAudioIndex >= 0 ? this.currentAudioIndex : this.currentlyPlayingIndex;
      if (this.isAudioPlaying[idx]) {
        this.startHighlightLoop();
      }
    },
    showWordTranslation(next) {
      try {
        localStorage.setItem("suratShowWordTranslation", next ? "1" : "0");
      } catch (_) {}
    }
  },
  created() {
    // postpone loading until we know the authentication status
  },
  async mounted() {
    var _JSON$parse, _JSON$parse2;
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      this.isNavigating = true;
      window.scrollTo({
        top: 0,
        behavior: "auto"
      });
    }
    window.addEventListener("keydown", this.onKeydown);
    this._keydownHandler = e => {
      if (!this.showAudioPlayer) return;
      if (["INPUT", "TEXTAREA"].includes((e.target || {}).tagName)) return;
      switch (e.key) {
        case " ":
          e.preventDefault();
          this.toggleAudioPlayer(this.currentlyPlayingIndex);
          break;
        case "ArrowRight":
          this.fastForwardAudio(this.currentlyPlayingIndex);
          break;
        case "ArrowLeft":
          this.rewindAudio(this.currentlyPlayingIndex);
          break;
        case "ArrowDown":
          this.playNextAyah(this.currentlyPlayingIndex);
          break;
        case "ArrowUp":
          this.playPrevAyah(this.currentlyPlayingIndex);
          break;
      }
    };
    window.addEventListener("keydown", this._keydownHandler);
    this.updateIsMobile();
    window.addEventListener("resize", this.updateIsMobile);
    // Restore dismissal state for next-step card
    try {
      if (localStorage.getItem("suratNextStepDismissed") === "1") this.showNextStep = false;
    } catch (_) {}
    await this.initializeBookmarkAuth();
    this.bookmarkEventHandler = event => this.handleBookmarksUpdated(event);
    this.bookmarkStorageHandler = event => this.handleStorageBookmarksUpdated(event);
    this.visibilityHandler = () => this.handleVisibilityChange();
    window.addEventListener("bookmarks-updated", this.bookmarkEventHandler);
    window.addEventListener("storage", this.bookmarkStorageHandler);
    window.addEventListener("visibilitychange", this.visibilityHandler);
    // Virtualization hooks
    this.$nextTick(() => {
      this.computeListTop();
      this.updateVirtualWindow();
      this.$nextTick(this.calibrateItemHeight);
      window.addEventListener("scroll", this.onScrollVirtual, {
        passive: true
      });
      window.addEventListener("resize", this.computeListTop, {
        passive: true
      });
      window.addEventListener("resize", this.calibrateItemHeight, {
        passive: true
      });
    });
    // Restore next-step minimized state
    try {
      this.nextStepMinimized = localStorage.getItem("suratNextStepMinimized") === "1";
    } catch (_) {}
    let storedSurah = null;
    let storedReciter = null;
    let storedTranslation = null;
    let storedFont = null;
    let storedFontStack = null;
    try {
      storedSurah = localStorage.getItem("suratSelectedSurah");
    } catch (_) {}
    try {
      storedReciter = localStorage.getItem("suratSelectedReciter");
    } catch (_) {}
    try {
      storedTranslation = localStorage.getItem("suratSelectedTranslation");
    } catch (_) {}
    try {
      storedFont = localStorage.getItem(this.quranFontPreferenceKey);
    } catch (_) {}
    try {
      storedFontStack = localStorage.getItem(this.quranFontStackPreferenceKey);
    } catch (_) {}
    this.selectedSurah = storedSurah || "1";
    this.selectedReciter = storedReciter || "ar.alafasy";
    this.selectedTranslation = storedTranslation || "en.ahmedali";
    this.selectedQuranFontId = this.coerceLegacyFontId(storedFont) || "";
    this.quranFontDraftId = this.selectedQuranFontId;
    this.storedQuranFontStack = storedFontStack || "";
    this.quranFonts = this.getQuranComFonts();
    this.ensureSelectedQuranFont();
    this.currentlyPlayingIndex = 0;
    this.isHighlighted = false;
    this.continuousPlayback = (_JSON$parse = JSON.parse(localStorage.getItem("continuousPlayback"))) !== null && _JSON$parse !== void 0 ? _JSON$parse : false;
    this.playbackSpeed = (_JSON$parse2 = JSON.parse(localStorage.getItem("playbackSpeed"))) !== null && _JSON$parse2 !== void 0 ? _JSON$parse2 : 1;
    let storedPreferredPlaybackMode = null;
    let storedPlaybackMode = null;
    try {
      storedPreferredPlaybackMode = localStorage.getItem("lastNonRepeatPlaybackMode");
    } catch (_) {}
    try {
      storedPlaybackMode = localStorage.getItem("playbackMode");
    } catch (_) {}
    this.preferredPlaybackMode = storedPreferredPlaybackMode || this.preferredPlaybackMode;
    this.setPlaybackMode(storedPlaybackMode || this.preferredPlaybackMode);
    try {
      const storedTajweed = localStorage.getItem("suratShowTajweed");
      if (storedTajweed !== null) this.showTajweed = storedTajweed === "1";
    } catch (_) {}
    try {
      const storedWordTranslation = localStorage.getItem("suratShowWordTranslation");
      if (storedWordTranslation !== null) this.showWordTranslation = storedWordTranslation === "1";
    } catch (_) {}
    try {
      const storedRealtimeHighlighting = localStorage.getItem("suratShowRealtimeHighlighting");
      if (storedRealtimeHighlighting !== null) this.showRealtimeHighlighting = storedRealtimeHighlighting === "1";
    } catch (_) {}
    Promise.all([this.fetchReciters(), this.fetchSurahs(), this.fetchTranslations(), this.fetchSurahDetails(), this.fetchQuranFonts(), this.fetchFontPreviewAyah()]).then(() => {
      this.isInitialLoad = false;
    }).finally(() => {
      if (typeof window !== "undefined") {
        window.scrollTo({
          top: 0,
          behavior: "auto"
        });
      }
      this.isNavigating = false;
    });
    this.loadReciterLeadOffsets();
    this.highlightLeadSeconds = this.getReciterLeadOffset(this.selectedReciter);
    this.prepareSettingsDraft();
  },
  beforeUnmount() {
    this.isComponentAlive = false;
    this.stopHighlightLoop();
    window.removeEventListener("keydown", this.onKeydown);
    if (this._keydownHandler) window.removeEventListener("keydown", this._keydownHandler);
    window.removeEventListener("resize", this.updateIsMobile);
    window.removeEventListener("scroll", this.onScrollVirtual);
    window.removeEventListener("resize", this.computeListTop);
    window.removeEventListener("resize", this.calibrateItemHeight);
    if (this._boundMove) {
      window.removeEventListener("mousemove", this._boundMove);
      window.removeEventListener("touchmove", this._boundMove);
    }
    if (this._boundUp) {
      window.removeEventListener("mouseup", this._boundUp);
      window.removeEventListener("touchend", this._boundUp);
    }
    if (this.bookmarkEventHandler) window.removeEventListener("bookmarks-updated", this.bookmarkEventHandler);
    if (this.bookmarkStorageHandler) window.removeEventListener("storage", this.bookmarkStorageHandler);
    if (this.visibilityHandler) window.removeEventListener("visibilitychange", this.visibilityHandler);
    if (this.audioElements && this.audioElements.forEach) {
      this.audioElements.forEach(audio => {
        if (audio && audio.pause) audio.pause();
        if (audio && audio.remove) audio.remove();
      });
    }
    clearTimeout(this.savedAyahClearTimer);
    clearTimeout(this.surahAudioDownloadedTimer);
    this.surahAudioDownloadedTimer = null;
    clearTimeout(this.bookmarkToastTimer);
    this.bookmarkToastAction = null;
    clearTimeout(this.fontPickerAlertTimer);
    this.fontPickerAlertTimer = null;
    clearTimeout(this.authAlertTimer);
    clearTimeout(this._scrollCorrectionTimer);
    this._scrollCorrectionTimer = null;
    clearTimeout(this._navigationSettleTimer);
    this._navigationSettleTimer = null;
    if (this._heightMeasureRaf && typeof window !== "undefined") {
      window.cancelAnimationFrame(this._heightMeasureRaf);
      this._heightMeasureRaf = null;
    }
  },
  beforeDestroy() {
    this.stopHighlightLoop();
    window.removeEventListener("keydown", this.onKeydown);
    if (this._keydownHandler) window.removeEventListener("keydown", this._keydownHandler);
    window.removeEventListener("resize", this.updateIsMobile);
    window.removeEventListener("scroll", this.onScrollVirtual);
    window.removeEventListener("resize", this.computeListTop);
    window.removeEventListener("resize", this.calibrateItemHeight);
    clearTimeout(this.savedAyahClearTimer);
    clearTimeout(this.surahAudioDownloadedTimer);
    this.surahAudioDownloadedTimer = null;
    clearTimeout(this.bookmarkToastTimer);
    this.bookmarkToastAction = null;
    clearTimeout(this.fontPickerAlertTimer);
    this.fontPickerAlertTimer = null;
    clearTimeout(this.authAlertTimer);
    clearTimeout(this._scrollCorrectionTimer);
    this._scrollCorrectionTimer = null;
    clearTimeout(this._navigationSettleTimer);
    this._navigationSettleTimer = null;
    if (this.reflectionModalHiddenHandler) {
      const modalEl = document.getElementById(this.reflectionModalId);
      if (modalEl) {
        modalEl.removeEventListener("hidden.bs.modal", this.reflectionModalHiddenHandler);
      }
      this.reflectionModalHiddenHandler = null;
    }
    if (this._heightMeasureRaf && typeof window !== "undefined") {
      window.cancelAnimationFrame(this._heightMeasureRaf);
      this._heightMeasureRaf = null;
    }
    if (this._virtualWindowRaf && typeof window !== "undefined") {
      window.cancelAnimationFrame(this._virtualWindowRaf);
      this._virtualWindowRaf = null;
    }
  },
  methods: {
    showToast(message, timeout = 3500, action = null) {
      this.bookmarkToast = message;
      this.bookmarkToastAction = action;
      clearTimeout(this.bookmarkToastTimer);
      this.bookmarkToastTimer = setTimeout(() => {
        this.bookmarkToast = "";
        this.bookmarkToastAction = null;
      }, timeout);
    },
    prepareSettingsDraft() {
      if (!this.settingsDraft) return;
      this.settingsDraft.showTajweed = !!this.showTajweed;
      this.settingsDraft.showRealtimeHighlighting = !!this.showRealtimeHighlighting;
      this.settingsDraft.showWordTranslation = !!this.showWordTranslation;
      this.settingsDraft.playbackMode = this.playbackMode;
    },
    applySettingsDraft() {
      if (!this.settingsDraft) return;
      this.showTajweed = !!this.settingsDraft.showTajweed;
      this.showRealtimeHighlighting = !!this.settingsDraft.showRealtimeHighlighting;
      this.showWordTranslation = !!this.settingsDraft.showWordTranslation;
      if (this.settingsDraft.playbackMode) {
        this.setPlaybackMode(this.settingsDraft.playbackMode);
      }
    },
    applySettingsModal() {
      this.applySettingsDraft();
      const modalEl = document.getElementById(this.settingsModalId);
      if (!modalEl) return;
      this.settingsModalInstance = this.settingsModalInstance || bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl) || new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(modalEl);
      this.settingsModalInstance.hide();
    },
    prepareFontPicker() {
      this.fontPickerAlert = "";
      this.clearFontPickerTimer();
      if (!this.quranFontDraftId && Array.isArray(this.quranFonts) && this.quranFonts.length) {
        this.quranFontDraftId = this.selectedQuranFontId || this.quranFonts[0].id;
      } else if (!this.quranFontDraftId) {
        this.quranFontDraftId = this.selectedQuranFontId || "";
      } else if (!this.selectedQuranFontId) {
        this.selectedQuranFontId = this.quranFontDraftId;
      }
      if (!this.quranFonts.length && !this.quranFontsLoading) {
        this.fetchQuranFonts();
      }
      if (!this.fontPreviewTajweedText && !this.fontPreviewLoading) {
        this.fetchFontPreviewAyah();
      }
    },
    openFontPicker() {
      this.prepareFontPicker();
      if (this.isMobile) {
        const modalEl = document.getElementById(this.fontPickerModalId);
        if (!modalEl) return;
        this.fontPickerModalInstance = this.fontPickerModalInstance || bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl) || new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(modalEl);
        this.fontPickerModalInstance.show();
        return;
      }
      const offcanvasEl = this.$refs.fontPickerOffcanvas;
      if (!offcanvasEl || !(window && window.bootstrap && window.bootstrap.Offcanvas)) return;
      this.fontPickerOffcanvasInstance = window.bootstrap.Offcanvas.getInstance(offcanvasEl) || window.bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
      this.fontPickerOffcanvasInstance.show();
    },
    closeFontPicker() {
      const modalEl = document.getElementById(this.fontPickerModalId);
      if (modalEl) {
        const modal = bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl) || this.fontPickerModalInstance;
        if (modal) modal.hide();
      }
      const offcanvasEl = this.$refs.fontPickerOffcanvas;
      if (offcanvasEl && window && window.bootstrap && window.bootstrap.Offcanvas) {
        const instance = window.bootstrap.Offcanvas.getInstance(offcanvasEl) || this.fontPickerOffcanvasInstance;
        if (instance) instance.hide();
      }
      this.clearFontPickerTimer();
    },
    selectQuranFontDraft(id) {
      this.quranFontDraftId = id;
    },
    applyQuranFontSelection() {
      if (!this.quranFontDraftId) return;
      this.selectedQuranFontId = this.quranFontDraftId;
      this.persistLocalSetting(this.quranFontPreferenceKey, this.selectedQuranFontId);
      this.syncQuranFontStack();
      const selected = this.quranFonts.find(font => font.id === this.selectedQuranFontId) || this.activeQuranFont;
      const fontSupportsTajweed = !!(selected !== null && selected !== void 0 && selected.isTajweed);
      const wasTajweedEnabled = !!this.showTajweed;
      if (fontSupportsTajweed && !wasTajweedEnabled) {
        this.showTajweed = true;
        if (this.settingsDraft) this.settingsDraft.showTajweed = true;
      }
      const label = (selected === null || selected === void 0 ? void 0 : selected.label) || "Quran font";
      const tajweedNotice = fontSupportsTajweed && !wasTajweedEnabled ? " Tajweed colors enabled." : "";
      this.fontPickerAlert = `Font applied: ${label}.${tajweedNotice}`;
      this.clearFontPickerTimer();
      this.fontPickerAlertTimer = setTimeout(() => {
        this.fontPickerAlert = "";
        this.closeFontPicker();
      }, 5000);
    },
    clearFontPickerTimer() {
      if (this.fontPickerAlertTimer) {
        clearTimeout(this.fontPickerAlertTimer);
        this.fontPickerAlertTimer = null;
      }
    },
    ensureSelectedQuranFont() {
      if (!Array.isArray(this.quranFonts) || !this.quranFonts.length) {
        return;
      }
      const normalized = this.coerceLegacyFontId(this.selectedQuranFontId);
      if (normalized && normalized !== this.selectedQuranFontId) {
        this.selectedQuranFontId = normalized;
      }
      const exists = this.quranFonts.some(font => font.id === this.selectedQuranFontId);
      if (!exists) {
        this.selectedQuranFontId = this.quranFonts[0].id;
      }
      const draftExists = this.quranFonts.some(font => font.id === this.quranFontDraftId);
      if (!draftExists) {
        this.quranFontDraftId = this.selectedQuranFontId;
      }
      this.persistLocalSetting(this.quranFontPreferenceKey, this.selectedQuranFontId);
      this.syncQuranFontStack();
    },
    syncQuranFontStack(fontId = "") {
      const targetId = fontId || this.selectedQuranFontId;
      const selected = this.quranFonts.find(font => font.id === targetId) || this.activeQuranFont;
      const stack = (selected === null || selected === void 0 ? void 0 : selected.cssStack) || this.storedQuranFontStack || this.defaultQuranFontStack;
      if (!stack) return;
      this.storedQuranFontStack = stack;
      this.persistLocalSetting(this.quranFontStackPreferenceKey, stack);
      if (typeof document !== "undefined") {
        document.documentElement.style.setProperty("--ic-quran-arabic-font", stack);
      }
    },
    coerceLegacyFontId(value) {
      var _this$quranFonts;
      if (!value) return "";
      const raw = String(value).toLowerCase();
      if ((_this$quranFonts = this.quranFonts) !== null && _this$quranFonts !== void 0 && _this$quranFonts.some(font => font.id === raw)) return raw;
      if (raw.includes("tajweed")) return "tajweed-mushaf";
      if (raw.includes("indopak") || raw.includes("indo") || raw.includes("nastaliq")) return "indopak";
      if (raw.includes("uthmani") || raw.includes("uthmanic")) return "uthmani";
      if (raw.includes("qpc") || raw.includes("hafs") || raw.includes("simple")) return "qpc-hafs";
      return raw;
    },
    getQuranComFonts() {
      return [{
        id: "qpc-hafs",
        label: "QPC Hafs",
        cssStack: "'UthmanicHafs', 'Noto Naskh Arabic', 'Amiri', serif",
        source: "Quran.com",
        inputId: "qpc-hafs",
        isTajweed: false
      }, {
        id: "uthmani",
        label: "Uthmani",
        cssStack: "'UthmanicHafs', 'Scheherazade New', 'Amiri', serif",
        source: "Quran.com",
        inputId: "uthmani",
        isTajweed: false
      }, {
        id: "indopak",
        label: "IndoPak",
        cssStack: "'IndoPak', 'Noto Nastaliq Urdu', 'Lateef', 'Amiri', serif",
        source: "Quran.com",
        inputId: "indopak",
        isTajweed: false
      }, {
        id: "tajweed-mushaf",
        label: "Tajweed Mushaf (QCF V4)",
        cssStack: "'UthmanicHafs', 'Scheherazade New', 'Amiri', serif",
        source: "Quran.com",
        inputId: "tajweed-mushaf",
        isTajweed: true
      }];
    },
    getFallbackQuranFonts() {
      return [{
        id: "scheherazade-new",
        label: "Scheherazade New",
        cssStack: "'Scheherazade New', 'Noto Naskh Arabic', 'Amiri', serif",
        source: "Local",
        inputId: "scheherazade-new",
        isTajweed: false
      }, {
        id: "uthmanic-hafs",
        label: "Uthmanic Hafs",
        cssStack: "'UthmanicHafs', 'Scheherazade New', 'Amiri', serif",
        source: "Local",
        inputId: "uthmanic-hafs",
        isTajweed: true
      }, {
        id: "noto-naskh-arabic",
        label: "Noto Naskh Arabic",
        cssStack: "'Noto Naskh Arabic', 'Scheherazade New', 'Amiri', serif",
        source: "Google Fonts",
        inputId: "noto-naskh-arabic",
        isTajweed: false
      }, {
        id: "noto-nastaliq-urdu",
        label: "Noto Nastaliq Urdu",
        cssStack: "'Noto Nastaliq Urdu', 'Lateef', 'Amiri', serif",
        source: "Google Fonts",
        inputId: "noto-nastaliq-urdu",
        isTajweed: false
      }, {
        id: "reem-kufi",
        label: "Reem Kufi",
        cssStack: "'Reem Kufi', 'Cairo', 'Amiri', serif",
        source: "Google Fonts",
        inputId: "reem-kufi",
        isTajweed: false
      }, {
        id: "amiri",
        label: "Amiri",
        cssStack: "'Amiri', 'Scheherazade New', serif",
        source: "Local",
        inputId: "amiri",
        isTajweed: false
      }];
    },
    getFontStackFallback(identifier = "", label = "") {
      const options = ["'Scheherazade New', 'Noto Naskh Arabic', 'Amiri', serif", "'Noto Naskh Arabic', 'Scheherazade New', 'Amiri', serif", "'IndoPak', 'Noto Nastaliq Urdu', 'Lateef', 'Amiri', serif", "'Reem Kufi', 'Cairo', 'Amiri', serif", "'Aref Ruqaa', 'Amiri', serif", "'Lateef', 'Amiri', serif", "'Cairo', 'Amiri', serif", "'Amiri', 'Scheherazade New', serif"];
      const key = `${identifier} ${label}`.trim().toLowerCase();
      if (!key) return this.defaultQuranFontStack;
      let hash = 0;
      for (let i = 0; i < key.length; i += 1) {
        hash = hash * 31 + key.charCodeAt(i) | 0;
      }
      const index = Math.abs(hash) % options.length;
      return options[index] || this.defaultQuranFontStack;
    },
    getFontStackForEdition(identifier = "", label = "") {
      const id = `${identifier}`.toLowerCase();
      const name = `${label}`.toLowerCase();
      const token = `${id} ${name}`;
      if (token.includes("uthmani") || token.includes("uthmanic")) {
        return "'UthmanicHafs', 'Scheherazade New', 'Amiri', serif";
      }
      if (token.includes("tajweed")) {
        return "'UthmanicHafs', 'Scheherazade New', 'Amiri', serif";
      }
      if (token.includes("warsh")) {
        return "'Amiri', 'Noto Naskh Arabic', 'Scheherazade New', serif";
      }
      if (token.includes("nastaliq") || token.includes("indopak") || token.includes("indo")) {
        return "'IndoPak', 'Noto Nastaliq Urdu', 'Lateef', 'Amiri', serif";
      }
      if (token.includes("ruqaa") || token.includes("ruqa")) {
        return "'Aref Ruqaa', 'Amiri', serif";
      }
      if (token.includes("kufi") || token.includes("kufic")) {
        return "'Reem Kufi', 'Cairo', 'Amiri', serif";
      }
      if (token.includes("cairo")) {
        return "'Cairo', 'Amiri', serif";
      }
      if (token.includes("lateef")) {
        return "'Lateef', 'Amiri', serif";
      }
      if (token.includes("naskh")) {
        return "'Noto Naskh Arabic', 'Scheherazade New', 'Amiri', serif";
      }
      if (token.includes("imlaei") || token.includes("imla")) {
        return "'Noto Naskh Arabic', 'Scheherazade New', 'Amiri', serif";
      }
      if (token.includes("amiri")) {
        return "'Amiri', 'Scheherazade New', serif";
      }
      if (token.includes("khaled")) {
        return "'Amiri', 'Scheherazade New', serif";
      }
      if (token.includes("scheherazade")) {
        return "'Scheherazade New', 'Amiri', serif";
      }
      if (token.includes("simple")) {
        return "'Noto Naskh Arabic', 'Scheherazade New', 'Amiri', serif";
      }
      return this.getFontStackFallback(identifier, label);
    },
    isTajweedEdition(identifier = "", label = "") {
      const token = `${identifier} ${label}`.toLowerCase();
      return token.includes("tajweed");
    },
    getFontPreviewHtml(font) {
      const raw = this.fontPreviewTajweedText || this.fontPreviewText || this.fontPreviewFallbackText;
      if (!raw) return "";
      if (font !== null && font !== void 0 && font.isTajweed) {
        return this.formatTajweedText(raw);
      }
      const plain = this.fontPreviewText || this.fontPreviewFallbackText;
      return this.escapeHtml(plain);
    },
    normalizeQuranFonts(editions) {
      const out = [];
      const seen = new Set();
      (editions || []).forEach(edition => {
        const identifier = (edition === null || edition === void 0 ? void 0 : edition.identifier) || (edition === null || edition === void 0 ? void 0 : edition.name) || "";
        if (!identifier || seen.has(identifier)) return;
        const label = (edition === null || edition === void 0 ? void 0 : edition.englishName) || (edition === null || edition === void 0 ? void 0 : edition.name) || (edition === null || edition === void 0 ? void 0 : edition.identifier) || "Quran font";
        const cssStack = this.getFontStackForEdition((edition === null || edition === void 0 ? void 0 : edition.identifier) || "", label);
        const isTajweed = this.isTajweedEdition((edition === null || edition === void 0 ? void 0 : edition.identifier) || "", label);
        const inputId = identifier.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-+|-+$)/g, "");
        const sourceLabel = (edition === null || edition === void 0 ? void 0 : edition.type) || (edition === null || edition === void 0 ? void 0 : edition.format) || (edition === null || edition === void 0 ? void 0 : edition.language) || "API";
        out.push({
          id: identifier,
          label,
          cssStack,
          isTajweed,
          source: sourceLabel,
          inputId: inputId || identifier
        });
        seen.add(identifier);
      });
      out.sort((a, b) => a.label.localeCompare(b.label));
      return out;
    },
    async fetchQuranFonts() {
      this.quranFontsLoading = true;
      this.quranFontsError = "";
      try {
        this.quranFonts = this.getQuranComFonts();
        this.ensureSelectedQuranFont();
      } catch (error) {
        console.error("Error fetching Quran fonts:", error);
        this.quranFontsError = "Unable to load fonts right now. Showing available defaults.";
        this.quranFonts = this.getQuranComFonts();
        this.ensureSelectedQuranFont();
      } finally {
        this.quranFontsLoading = false;
      }
    },
    async fetchFontPreviewAyah() {
      this.fontPreviewLoading = true;
      this.fontPreviewError = "";
      try {
        var _data$data;
        const {
          data
        } = await this.cachedFetchJSON("https://api.alquran.cloud/v1/ayah/1/quran-tajweed", "cache:quran-font-preview", 30 * 24 * 60 * 60 * 1000);
        const previewText = (data === null || data === void 0 || (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.text) || "";
        if (previewText) {
          this.fontPreviewTajweedText = previewText;
          this.fontPreviewText = this.stripTajweedMarkers(previewText);
        } else {
          this.fontPreviewText = this.fontPreviewFallbackText;
        }
      } catch (error) {
        console.error("Error fetching font preview ayah:", error);
        this.fontPreviewError = "Preview unavailable. Using default ayah.";
        this.fontPreviewText = this.fontPreviewFallbackText;
      } finally {
        this.fontPreviewLoading = false;
      }
    },
    async fetchPreference(key) {
      var _response$data$value, _response$data;
      if (!this.bookmarkAuthenticated) return null;
      const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`/api/preferences/${key}`);
      return (_response$data$value = (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.value) !== null && _response$data$value !== void 0 ? _response$data$value : null;
    },
    async savePreference(key, value) {
      if (!this.bookmarkAuthenticated) return;
      try {
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].put(`/api/preferences/${key}`, {
          value
        });
      } catch (_) {}
    },
    persistLocalSetting(key, value) {
      if (typeof window === "undefined") return;
      try {
        localStorage.setItem(key, value);
      } catch (_) {}
    },
    loadReciterLeadOffsets() {
      try {
        const stored = localStorage.getItem("reciterLeadOffsets");
        this.reciterLeadOffsets = stored ? JSON.parse(stored) : {};
      } catch (_) {
        this.reciterLeadOffsets = {};
      }
    },
    getReciterLeadOffset(reciterId) {
      if (!reciterId) return this.highlightLeadSeconds;
      const raw = this.reciterLeadOffsets[reciterId];
      const parsed = Number(raw);
      if (Number.isFinite(parsed)) return parsed;
      const fallback = this.reciterDefaultLeadOffsets ? this.reciterDefaultLeadOffsets[reciterId] : null;
      if (Number.isFinite(Number(fallback))) return Number(fallback);
      return this.highlightLeadSeconds;
    },
    announce(message, timeout = 5000) {
      this.screenReaderMessage = message;
      clearTimeout(this.savedAyahClearTimer);
      this.savedAyahClearTimer = setTimeout(() => {
        this.screenReaderMessage = "";
      }, timeout);
    },
    async loadSavedAyahs() {
      if (this.savedAyahsLoaded) return;
      if (!this.bookmarkAuthenticated) {
        this.savedAyahKeys = {};
        this.savedAyahsLoaded = true;
        return;
      }
      await this.initializeSavedAyahStorageKey();
      try {
        const stored = sessionStorage.getItem(this.savedAyahStorageKey) || localStorage.getItem(this.savedAyahStorageKey);
        if (stored) {
          this.savedAyahKeys = JSON.parse(stored) || {};
        } else {
          const legacySession = sessionStorage.getItem("ic_saved_ayahs_session");
          const legacyGlobal = localStorage.getItem("ic_saved_ayahs");
          const fallback = legacySession || legacyGlobal;
          this.savedAyahKeys = fallback ? JSON.parse(fallback) : {};
          if (fallback) {
            sessionStorage.setItem(this.savedAyahStorageKey, fallback);
            localStorage.setItem(this.savedAyahStorageKey, fallback);
          }
        }
      } catch (_) {
        this.savedAyahKeys = {};
      }
      this.savedAyahsLoaded = true;
    },
    buildAyahMessage(ayah, options = {}) {
      var _this$surahDetails7, _this$surahDetails8, _this$surahDetails9;
      if (!ayah) return "";
      const includeAudio = options.includeAudio !== false;
      const surahNumber = (_this$surahDetails7 = this.surahDetails) === null || _this$surahDetails7 === void 0 ? void 0 : _this$surahDetails7.surahNumber;
      const surahName = ((_this$surahDetails8 = this.surahDetails) === null || _this$surahDetails8 === void 0 ? void 0 : _this$surahDetails8.englishName) || ((_this$surahDetails9 = this.surahDetails) === null || _this$surahDetails9 === void 0 ? void 0 : _this$surahDetails9.name);
      const ayahNumber = ayah.numberInSurah || ayah.number;
      let header = "Surah";
      if (surahNumber) header += ` ${surahNumber}`;
      if (surahName) header += ` - ${surahName}`;
      if (ayahNumber) header += ` (Ayah ${ayahNumber})`;
      const lines = [header];
      if (ayah.text) lines.push(`Arabic: ${ayah.text}`);
      if (ayah.translation) lines.push(`Translation: ${ayah.translation}`);
      if (includeAudio && ayah.audio) lines.push(`Listen here: ${ayah.audio}`);
      return lines.filter(Boolean).join("\n\n");
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
    async copyAyah(ayah) {
      const message = this.buildAyahMessage(ayah, {
        includeAudio: true
      });
      if (!message) return;
      const ok = await this.copyText(message);
      if (ok) {
        this.showToast("Ayah copied to clipboard.");
        this.announce("Ayah copied to clipboard.");
      } else {
        var _this$$toast;
        (_this$$toast = this.$toast) === null || _this$$toast === void 0 || _this$$toast.error("Unable to copy ayah.");
        this.announce("Unable to copy ayah.");
      }
    },
    getAyahKeyForAyah(ayah) {
      if (!this.surahDetails || !ayah) return "";
      const surahNumber = Number(this.surahDetails.surahNumber);
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      if (!surahNumber || !ayahNumber) return "";
      return this.buildAyahKey(surahNumber, ayahNumber);
    },
    isAyahAudioDownloading(ayah) {
      const key = this.getAyahKeyForAyah(ayah);
      if (!key) return false;
      return !!this.isAudioDownloading[key];
    },
    isAyahAudioDownloaded(ayah) {
      const key = this.getAyahKeyForAyah(ayah);
      if (!key) return false;
      return !!this.isAudioDownloaded[key];
    },
    markAyahAudioDownloaded(key, duration = 5000) {
      if (!key) return;
      if (typeof this.$set === "function") {
        this.$set(this.isAudioDownloaded, key, true);
      } else {
        this.isAudioDownloaded[key] = true;
      }
      setTimeout(() => {
        if (typeof this.$set === "function") {
          this.$set(this.isAudioDownloaded, key, false);
        } else {
          this.isAudioDownloaded[key] = false;
        }
      }, duration);
    },
    sanitizeFilenamePart(value) {
      return String(value || "").trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "_").replace(/_+/g, "_").replace(/-+/g, "-");
    },
    buildAyahAudioFilename(ayah) {
      var _this$surahDetails0;
      const surahNumber = Number(((_this$surahDetails0 = this.surahDetails) === null || _this$surahDetails0 === void 0 ? void 0 : _this$surahDetails0.surahNumber) || this.selectedSurah);
      const ayahNumber = Number((ayah === null || ayah === void 0 ? void 0 : ayah.numberInSurah) || (ayah === null || ayah === void 0 ? void 0 : ayah.number));
      const reciter = this.sanitizeFilenamePart(this.selectedReciter || "reciter");
      const parts = ["surah", surahNumber || "unknown", "ayah", ayahNumber || "unknown", reciter];
      return `${parts.join("-")}.mp3`;
    },
    buildSurahAudioFilename() {
      var _this$surahDetails1;
      const surahNumber = Number(((_this$surahDetails1 = this.surahDetails) === null || _this$surahDetails1 === void 0 ? void 0 : _this$surahDetails1.surahNumber) || this.selectedSurah);
      const reciter = this.sanitizeFilenamePart(this.selectedReciter || "reciter");
      const parts = ["surah", surahNumber || "unknown", reciter];
      return `${parts.join("-")}.mp3`;
    },
    canDownloadSurahAudio() {
      return !!this.getQuranRecitationId(this.selectedReciter);
    },
    markSurahAudioDownloaded(duration = 6000) {
      this.isSurahAudioDownloaded = true;
      clearTimeout(this.surahAudioDownloadedTimer);
      this.surahAudioDownloadedTimer = setTimeout(() => {
        this.isSurahAudioDownloaded = false;
        this.surahAudioDownloadedTimer = null;
      }, duration);
    },
    extractChapterRecitationAudioUrl(payload, baseUrl) {
      if (!payload) return "";
      const audioFile = payload.audio_file || payload.audioFile || payload.chapter_recitation || payload.chapterRecitation || null;
      const raw = (audioFile === null || audioFile === void 0 ? void 0 : audioFile.audio_url) || (audioFile === null || audioFile === void 0 ? void 0 : audioFile.audioUrl) || (audioFile === null || audioFile === void 0 ? void 0 : audioFile.url) || (audioFile === null || audioFile === void 0 ? void 0 : audioFile.file_url) || "";
      if (!raw || typeof raw !== "string") return "";
      if (raw.startsWith("//")) return `https:${raw}`;
      if (raw.startsWith("/")) return `${baseUrl}${raw}`;
      return raw;
    },
    async downloadSurahAudio() {
      var _this$surahDetails10;
      const surahNumber = Number(((_this$surahDetails10 = this.surahDetails) === null || _this$surahDetails10 === void 0 ? void 0 : _this$surahDetails10.surahNumber) || this.selectedSurah);
      if (!surahNumber) return;
      const firstAyahKey = this.buildAyahKey(surahNumber, 1);
      if (this.isSurahAudioDownloading) return;
      const recitationId = this.getQuranRecitationId(this.selectedReciter);
      if (!recitationId) {
        this.triggerAyahFeedback(firstAyahKey, "Full surah download isn't available for this reciter.", "feedback-warning", "warning");
        this.announce("Full surah download isn't available for this reciter.");
        return;
      }
      this.isSurahAudioDownloading = true;
      this.isSurahAudioDownloaded = false;
      clearTimeout(this.surahAudioDownloadedTimer);
      this.surahAudioDownloadedTimer = null;
      this.announce("Downloading full surah audio.");
      const endpoint = `https://api.quran.com/api/v4/chapter_recitations/${recitationId}/${surahNumber}`;
      let audioUrl = "";
      try {
        const response = await fetch(endpoint, {
          mode: "cors"
        });
        if (!response.ok) {
          throw new Error(`Surah audio lookup failed: ${response.status}`);
        }
        const payload = await response.json();
        audioUrl = this.extractChapterRecitationAudioUrl(payload, "https://api.quran.com");
      } catch (error) {
        console.warn("Unable to resolve full surah audio URL:", error);
      }
      if (!audioUrl) {
        this.triggerAyahFeedback(firstAyahKey, "Unable to fetch a full-surah MP3 for this reciter. You can still download individual ayahs.", "feedback-warning", "warning");
        this.announce("Unable to fetch a full surah MP3. You can download individual ayahs.");
        this.isSurahAudioDownloading = false;
        return;
      }
      const filename = this.buildSurahAudioFilename();
      try {
        const response = await fetch(audioUrl, {
          mode: "cors"
        });
        if (!response.ok) {
          throw new Error(`Surah audio download failed: ${response.status}`);
        }
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename;
        a.rel = "noopener";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => {
          try {
            window.URL.revokeObjectURL(blobUrl);
          } catch (_) {}
        }, 2000);
        this.markSurahAudioDownloaded();
        this.triggerAyahFeedback(firstAyahKey, "Surah MP3 downloaded.", "bg-dark text-white", "check");
        this.announce("Surah MP3 downloaded.");
      } catch (error) {
        console.warn("Unable to download full surah audio as a blob:", error);
        this.triggerAyahFeedback(firstAyahKey, "Unable to download directly. Open the surah audio and use your browser to save it.", "feedback-warning", "warning", audioUrl, "Open audio", 15000);
        this.announce("Unable to download directly. Open the surah audio to save it.");
      } finally {
        this.isSurahAudioDownloading = false;
      }
    },
    async downloadAyahAudio(ayah) {
      if (!ayah) return;
      const key = this.getAyahKeyForAyah(ayah);
      if (!key) return;
      if (this.isAudioDownloading[key]) return;
      const audioUrl = ayah.audio || "";
      if (!audioUrl) {
        this.triggerAyahFeedback(key, "Audio unavailable for this ayah.", "feedback-warning", "warning");
        this.announce("Audio unavailable for this ayah.");
        return;
      }
      const setDownloading = value => {
        if (typeof this.$set === "function") {
          this.$set(this.isAudioDownloading, key, !!value);
        } else {
          this.isAudioDownloading[key] = !!value;
        }
      };
      setDownloading(true);
      this.announce("Downloading ayah audio.");
      const filename = this.buildAyahAudioFilename(ayah);
      try {
        const response = await fetch(audioUrl, {
          mode: "cors"
        });
        if (!response.ok) {
          throw new Error(`Audio download failed: ${response.status}`);
        }
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename;
        a.rel = "noopener";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => {
          try {
            window.URL.revokeObjectURL(blobUrl);
          } catch (_) {}
        }, 2000);
        this.markAyahAudioDownloaded(key);
        this.triggerAyahFeedback(key, "MP3 downloaded.", "bg-dark text-white", "check");
        this.announce("MP3 downloaded.");
      } catch (error) {
        console.warn("Unable to download audio as a blob:", error);
        this.triggerAyahFeedback(key, "Unable to download directly. Open the audio and use your browser to save it.", "feedback-warning", "warning", audioUrl, "Open audio", 15000);
        this.announce("Unable to download directly. Open the audio link to save it.");
      } finally {
        setDownloading(false);
      }
    },
    async syncSavedAyahsFromApi() {
      if (!this.bookmarkAuthenticated) return;
      try {
        var _response$data2;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/ayah-bookmarks");
        const bookmarks = ((_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.data) || [];
        if (!Array.isArray(bookmarks)) return;
        const next = {};
        bookmarks.forEach(bookmark => {
          var _bookmark$ayah, _bookmark$ayah2;
          const surahNumber = Number(bookmark.surah_number || ((_bookmark$ayah = bookmark.ayah) === null || _bookmark$ayah === void 0 ? void 0 : _bookmark$ayah.surah_id));
          const ayahNumber = Number(bookmark.ayah_number || bookmark.ayah_num);
          const ayahInSurah = Number((_bookmark$ayah2 = bookmark.ayah) === null || _bookmark$ayah2 === void 0 ? void 0 : _bookmark$ayah2.ayah_id);
          if (surahNumber && ayahNumber) {
            next[this.buildAyahKey(surahNumber, ayahNumber)] = bookmark.id || true;
          }
          if (surahNumber && ayahInSurah) {
            next[this.buildAyahKey(surahNumber, ayahInSurah)] = bookmark.id || true;
          }
        });
        this.savedAyahKeys = next;
      } catch (_) {
        // Ignore sync failures; local state still works.
      }
    },
    notifyBookmarkChange(source = this.bookmarkInstanceId) {
      if (typeof window === "undefined") return;
      const token = `${Date.now()}-${source}`;
      try {
        localStorage.setItem("bookmarkRefresh", token);
      } catch (_) {
        // ignore private mode errors
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
      this.syncSavedAyahsFromApi();
    },
    handleStorageBookmarksUpdated(event) {
      if (event.key !== "bookmarkRefresh") return;
      this.syncSavedAyahsFromApi();
    },
    handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        this.syncSavedAyahsFromApi();
      }
    },
    async initializeBookmarkAuth() {
      await this.evaluateBookmarkAuth();
      if (!this.bookmarkAuthenticated) {
        this.savedAyahKeys = {};
        this.savedAyahsLoaded = true;
        return;
      }
      await this.loadSavedAyahs();
      await this.initializeReflectionCacheKey();
      await this.syncSavedAyahsFromApi();
      if (this.bookmarkAuthenticated) {
        await this.loadAyahReflections();
      }
    },
    async evaluateBookmarkAuth() {
      const userId = await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_4__.fetchUserIdFromApi)();
      this.bookmarkAuthenticated = !!userId;
      return this.bookmarkAuthenticated;
    },
    clearSavedBookmarks() {
      this.savedAyahKeys = {};
      try {
        const key = this.savedAyahStorageKey || "ic_saved_ayahs_session";
        sessionStorage.removeItem(key);
        localStorage.removeItem(key);
      } catch (_) {
        // ignore
      }
    },
    buildAyahKey(surahNumber, ayahNumber) {
      return `${surahNumber}:${ayahNumber}`;
    },
    isAyahSaved(ayah) {
      if (!ayah || !this.surahDetails) return false;
      const surahNumber = Number(this.surahDetails.surahNumber);
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      return !!this.savedAyahKeys[this.buildAyahKey(surahNumber, ayahNumber)];
    },
    getBookmarkId(ayah) {
      if (!ayah || !this.surahDetails) return null;
      const surahNumber = Number(this.surahDetails.surahNumber);
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      const val = this.savedAyahKeys[this.buildAyahKey(surahNumber, ayahNumber)];
      return val === true ? null : val; // handle historic boolean values
    },
    async toggleBookmark(ayah) {
      if (!this.bookmarkAuthenticated) {
        const isAuthed = await this.ensureAuthenticated("Please log in to manage bookmarks.", {
          ayah
        });
        if (!isAuthed) return;
      }
      if (this.isAyahSaved(ayah)) {
        this.removeBookmark(ayah);
      } else {
        this.quickSaveBookmark(ayah);
      }
    },
    triggerAyahFeedback(key, text, cssClass, icon, link = "", linkText = "", timeout = 6000) {
      // Use reactive assignment
      this.feedbackMessages = _objectSpread(_objectSpread({}, this.feedbackMessages), {}, {
        [key]: {
          text,
          class: cssClass,
          icon,
          link,
          linkText
        }
      });
      setTimeout(() => {
        const next = _objectSpread({}, this.feedbackMessages);
        delete next[key];
        this.feedbackMessages = next;
      }, timeout);
    },
    async quickSaveBookmark(ayah) {
      if (!this.surahDetails || !ayah) return;
      const surahNumber = Number(this.surahDetails.surahNumber);
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      const key = this.buildAyahKey(surahNumber, ayahNumber);

      // Optimistic update
      const prevKeys = _objectSpread({}, this.savedAyahKeys);
      this.savedAyahKeys = _objectSpread(_objectSpread({}, this.savedAyahKeys), {}, {
        [key]: true
      });

      // Local feedback
      this.triggerAyahFeedback(key, "Bookmark saved successfully", "bg-dark text-white", "check");
      try {
        var _response$data3;
        const payload = {
          surah_number: surahNumber,
          ayah_number: ayahNumber,
          surah_name: this.surahDetails.englishName || this.surahDetails.name || "Surah",
          ayah_verse_ar: ayah.text || "",
          ayah_verse_en: ayah.translation || "",
          folder_ids: []
        };
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/ayah-bookmarks", payload);
        const bookmark = (_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.bookmark;
        if (bookmark && bookmark.id) {
          this.savedAyahKeys = _objectSpread(_objectSpread({}, this.savedAyahKeys), {}, {
            [key]: bookmark.id
          });
          this.showToast("Bookmark saved.", 4000, {
            text: "Edit",
            handler: () => {
              this.openBookmarkModal(ayah);
              const modalEl = document.getElementById("bookmarkModal");
              if (modalEl) {
                const modal = bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl) || new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(modalEl);
                modal.show();
              }
            }
          });
          this.announce("Ayah saved to bookmarks.");
          this.notifyBookmarkChange();
        }
      } catch (error) {
        // Revert
        this.savedAyahKeys = prevKeys;
        this.triggerAyahFeedback(key, "Error saving", "bg-danger text-white", "trash");
        this.showToast("Failed to save bookmark.", 3000);
      }
    },
    async removeBookmark(ayah) {
      if (!this.surahDetails || !ayah) return;
      const surahNumber = Number(this.surahDetails.surahNumber);
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      const key = this.buildAyahKey(surahNumber, ayahNumber);
      const bookmarkId = this.getBookmarkId(ayah);
      if (!bookmarkId) {
        // fallback handling
        const _next = _objectSpread({}, this.savedAyahKeys);
        delete _next[key];
        this.savedAyahKeys = _next;
        this.triggerAyahFeedback(key, "Bookmark removed", "bg-dark text-white", "trash");
        return;
      }

      // Optimistic update
      const prevKeys = _objectSpread({}, this.savedAyahKeys);
      const next = _objectSpread({}, this.savedAyahKeys);
      delete next[key];
      this.savedAyahKeys = next;

      // Local feedback
      this.triggerAyahFeedback(key, "Bookmark removed", "bg-dark text-white", "trash");
      try {
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/ayah-bookmarks/${bookmarkId}`);
        this.showToast("Bookmark removed.", 2000);
        this.announce("Bookmark removed.");
        this.notifyBookmarkChange();
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Already deleted on server, so this is a success state for us.
          this.showToast("Bookmark removed.", 2000);
          this.announce("Bookmark removed.");
          this.notifyBookmarkChange();
        } else {
          // Revert
          this.savedAyahKeys = prevKeys;
          this.triggerAyahFeedback(key, "Error removing", "bg-danger text-white", "trash");
          this.showToast("Failed to remove bookmark.", 3000);
        }
      }
    },
    async openBookmarkModal(ayah) {
      if (!this.surahDetails || !ayah) return;
      if (!this.bookmarkAuthenticated) {
        const isAuthed = await this.ensureAuthenticated("Please log in to manage bookmarks.", {
          ayah
        });
        if (!isAuthed) return;
      }
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      this.activeAyah = {
        surah_number: Number(this.surahDetails.surahNumber),
        surah_name: this.surahDetails.englishName || this.surahDetails.name || "Surah",
        ayah_number: ayahNumber,
        ayah_verse_ar: ayah.text || "",
        ayah_verse_en: ayah.translation || ""
      };
      this.$nextTick(() => {
        const modalEl = document.getElementById("bookmarkModal");
        if (modalEl) {
          const modal = bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl) || new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(modalEl);
          modal.show();
        }
      });
    },
    openSurahInfo(surah) {
      if (!surah) return;
      this.surahInfo = _objectSpread({}, surah);
      this.surahInfoText = "";
      this.surahInfoShortText = "";
      this.surahInfoSource = "";
      this.surahInfoSourceUrl = "";
      this.surahInfoError = "";
      this.surahInfoLoading = true;
      this.surahInfoFontSize = Number(this.surahInfoFontSize) || 16;
      this.$nextTick(() => {
        const modalEl = document.getElementById(this.surahInfoModalId);
        if (!modalEl) return;
        this.surahInfoModalInstance = bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl) || new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(modalEl);
        this.surahInfoModalInstance.show();
      });
      this.fetchSurahInfoDetails(Number(surah.number));
    },
    increaseSurahInfoFontSize() {
      const next = Math.min(this.surahInfoFontSize + 1, this.surahInfoFontSizeMax);
      this.surahInfoFontSize = next;
    },
    decreaseSurahInfoFontSize() {
      const next = Math.max(this.surahInfoFontSize - 1, this.surahInfoFontSizeMin);
      this.surahInfoFontSize = next;
    },
    async fetchSurahInfoDetails(surahNumber) {
      if (!surahNumber) return;
      try {
        const {
          data
        } = await this.cachedFetchJSON(`https://api.quran.com/api/v4/chapters/${surahNumber}/info?language=en`, `cache:surah-info:${surahNumber}`, 7 * 24 * 60 * 60 * 1000);
        const info = (data === null || data === void 0 ? void 0 : data.chapter_info) || {};
        this.surahInfoText = this.normalizeSurahInfoHtml(info.text);
        this.surahInfoShortText = this.normalizeSurahInfoHtml(info.short_text);
        this.surahInfoSource = info.source || "";
        this.surahInfoSourceUrl = info.source_url || "";
        if (!this.surahInfoSource) {
          this.surahInfoSource = "Quran.com";
          this.surahInfoSourceUrl = "https://quran.com";
        }
        this.surahInfoLoading = false;
      } catch (error) {
        this.surahInfoLoading = false;
        this.surahInfoError = "Unable to load detailed surah info right now.";
        console.error("Error fetching surah info:", error);
      }
    },
    normalizeSurahInfoHtml(html) {
      if (!html) return "";
      if (typeof window === "undefined" || !window.DOMParser) return html;
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        doc.querySelectorAll("a[href]").forEach(link => {
          const text = (link.textContent || "").toLowerCase();
          const href = link.getAttribute("href") || "";
          let targetHref = href;
          let hostOverride = "";
          if (href.startsWith("http")) {
            try {
              const url = new URL(href);
              if (url.hostname.includes("quran.com") || url.hostname.includes("api.quran.com")) {
                hostOverride = "quran.com";
              } else if (url.hostname.includes("sunnah.com")) {
                hostOverride = "sunnah.com";
              }
              if (hostOverride) {
                url.hostname = hostOverride;
                url.protocol = "https:";
                targetHref = url.toString();
              }
            } catch (_) {}
          } else {
            const isHadith = text.includes("hadith") || text.includes("sunnah") || href.includes("sunnah") || href.includes("hadith");
            const base = isHadith ? "https://sunnah.com" : "https://quran.com";
            targetHref = `${base}${href.startsWith("/") ? "" : "/"}${href}`;
          }
          link.setAttribute("href", targetHref);
          link.setAttribute("target", "_blank");
          link.setAttribute("rel", "noopener noreferrer");
        });
        return doc.body.innerHTML;
      } catch (_) {
        return html;
      }
    },
    onBookmarkSaved(payload) {
      if (!payload) return;
      const source = payload.bookmark || payload;
      const surahNumber = Number(source.surah_number);
      const ayahNumber = Number(source.ayah_number || source.ayah_num);
      if (!surahNumber || !ayahNumber) return;
      this.announce("Ayah saved to bookmarks.");
      this.showToast("Bookmark saved successfully.", 4000);
      const next = _objectSpread({}, this.savedAyahKeys);
      next[this.buildAyahKey(surahNumber, ayahNumber)] = source.id || true;
      this.savedAyahKeys = next;
    },
    async onBookmarksLinkClick() {
      const isAuthed = await this.ensureAuthenticated();
      if (isAuthed) {
        window.open("/bookmarks", "_blank");
      }
    },
    async onNotesLinkClick() {
      const isAuthed = await this.ensureAuthenticated("Please log in to save and view reflections.");
      if (isAuthed) {
        window.open("/notes", "_blank");
      }
    },
    hasReflection(ayah) {
      var _this$surahDetails11;
      if (!ayah) return false;
      const surahNumber = Number(((_this$surahDetails11 = this.surahDetails) === null || _this$surahDetails11 === void 0 ? void 0 : _this$surahDetails11.surahNumber) || this.selectedSurah);
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      if (!surahNumber || !ayahNumber) return false;
      const key = this.buildAyahKey(surahNumber, ayahNumber);
      const stored = this.ayahReflections[key];
      if (Array.isArray(stored)) {
        return stored.length > 0;
      }
      if (stored && typeof stored === "object" && Object.keys(stored).length) {
        return true;
      }
      return false;
    },
    async openReflectionModal(ayah) {
      var _this$surahDetails12, _this$surahDetails13, _this$surahDetails14;
      if (!ayah) return;
      const surahNumber = Number(((_this$surahDetails12 = this.surahDetails) === null || _this$surahDetails12 === void 0 ? void 0 : _this$surahDetails12.surahNumber) || this.selectedSurah);
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      if (!surahNumber || !ayahNumber) return;
      const isAuthed = await this.ensureAuthenticated("Please log in to save reflections.", {
        ayah
      });
      if (!isAuthed) return;
      if (this.bookmarkAuthenticated && !Object.keys(this.ayahReflections).length) {
        await this.loadAyahReflections();
      }
      const surahLabel = ((_this$surahDetails13 = this.surahDetails) === null || _this$surahDetails13 === void 0 ? void 0 : _this$surahDetails13.englishName) || ((_this$surahDetails14 = this.surahDetails) === null || _this$surahDetails14 === void 0 ? void 0 : _this$surahDetails14.name) || "Surah";
      const surahName = `${surahNumber} - ${surahLabel}`;
      this.selectedAyahForReflection = {
        surahNumber,
        ayahNumber,
        surahName,
        ayahArabic: ayah.text || "",
        ayahTranslation: ayah.translation || ""
      };
      const key = this.buildAyahKey(surahNumber, ayahNumber);
      this.selectedReflectionKey = key;
      this.clearReflectionForm();
      this.reflectionErrorMessage = "";
      this.isSavingReflection = false;
      this.$nextTick(() => {
        const modalEl = document.getElementById(this.reflectionModalId);
        if (!modalEl) return;
        this.reflectionModalInstance = bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl) || new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(modalEl);
        if (this.reflectionModalHiddenHandler) {
          modalEl.removeEventListener("hidden.bs.modal", this.reflectionModalHiddenHandler);
        }
        const handler = () => this.onReflectionModalHidden();
        modalEl.addEventListener("hidden.bs.modal", handler);
        this.reflectionModalHiddenHandler = handler;
        this.reflectionModalInstance.show();
      });
    },
    hideReflectionModal() {
      const modalEl = document.getElementById(this.reflectionModalId);
      const modal = this.reflectionModalInstance || (modalEl ? bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.getInstance(modalEl) : null);
      if (modal) {
        modal.hide();
      }
      this.cancelReflectionEdit();
    },
    onReflectionModalHidden() {
      const modalEl = document.getElementById(this.reflectionModalId);
      if (modalEl && this.reflectionModalHiddenHandler) {
        modalEl.removeEventListener("hidden.bs.modal", this.reflectionModalHiddenHandler);
      }
      this.reflectionModalHiddenHandler = null;
      this.reflectionModalInstance = null;
      this.selectedAyahForReflection = null;
      this.selectedReflectionKey = "";
      this.clearReflectionForm();
      this.reflectionErrorMessage = "";
      this.reflectionSuccessMessage = "";
      if (this.reflectionSuccessTimeout) {
        clearTimeout(this.reflectionSuccessTimeout);
        this.reflectionSuccessTimeout = null;
      }
    },
    clearReflectionForm() {
      this.reflectionForm.subject = "";
      this.reflectionForm.message = "";
    },
    applySubjectSuggestion(text) {
      this.reflectionForm.subject = text;
    },
    applyMessageSuggestion(text) {
      this.reflectionForm.message = text;
    },
    startEditingReflection(note, index) {
      if (!note) return;
      this.editingReflectionId = note.id || null;
      this.editingReflectionIndex = typeof index === "number" ? index : null;
      this.reflectionForm.subject = note.subject || "";
      this.reflectionForm.message = note.message || "";
      this.reflectionErrorMessage = "";
      this.reflectionSuccessMessage = "";
    },
    cancelReflectionEdit() {
      this.editingReflectionId = null;
      this.editingReflectionIndex = null;
      this.clearReflectionForm();
    },
    async deleteReflection(note, index) {
      if (!note) return;
      const proceed = confirm("Delete this reflection?");
      if (!proceed) return;
      if (note.id) {
        try {
          await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/delete-notes/${note.id}`);
        } catch (error) {
          console.error("Delete reflection failed", error);
          this.showToast("Unable to delete reflection.", 3000);
          return;
        }
      }
      const key = this.selectedReflectionKey;
      if (!key) return;
      const current = Array.isArray(this.ayahReflections[key]) ? [...this.ayahReflections[key]] : [];
      current.splice(index, 1);
      this.ayahReflections = _objectSpread(_objectSpread({}, this.ayahReflections), {}, {
        [key]: current
      });
      if (this.editingReflectionIndex === index) {
        this.cancelReflectionEdit();
      }
      this.showToast("Reflection deleted.", 2000);
    },
    toggleReflectionHelp() {
      this.showReflectionHighlight = false;
    },
    suggestionTrackStyle(rowIndex) {
      const base = 32 + (rowIndex - 1) * 5;
      return {
        animationDuration: `${base}s`,
        animationDirection: rowIndex % 2 === 0 ? "reverse" : "normal"
      };
    },
    async submitReflectionForm() {
      const subject = (this.reflectionForm.subject || "").trim();
      const message = (this.reflectionForm.message || "").trim();
      if (!subject) {
        this.reflectionErrorMessage = "Please enter a subject for your reflection.";
        return;
      }
      if (!message) {
        this.reflectionErrorMessage = "Add a reflection message to continue.";
        return;
      }
      if (message.length < this.reflectionMessageMinLength) {
        this.reflectionErrorMessage = `Reflection must be at least ${this.reflectionMessageMinLength} characters.`;
        return;
      }
      if (!this.selectedAyahForReflection) return;
      this.reflectionErrorMessage = "";
      this.isSavingReflection = true;
      const {
        surahNumber,
        ayahNumber,
        surahName,
        ayahArabic,
        ayahTranslation
      } = this.selectedAyahForReflection;
      const payload = {
        surah_name: surahName,
        ayah_num: String(ayahNumber),
        ayah_verse_ar: ayahArabic,
        ayah_verse_en: ayahTranslation,
        ayah_info: subject,
        ayah_notes: message,
        is_speech_to_text: false
      };
      const isEditing = !!this.editingReflectionId;
      try {
        var _response$data4;
        const response = isEditing ? await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`/api/update-notes/${this.editingReflectionId}`, payload) : await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/submit-note", payload);
        const note = ((_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : _response$data4.note) || null;
        const key = this.buildAyahKey(surahNumber, ayahNumber);
        const entryPayload = {
          id: (note === null || note === void 0 ? void 0 : note.id) || this.editingReflectionId || null,
          subject,
          message,
          surah_name: payload.surah_name,
          ayah_verse_ar: ayahArabic,
          ayah_verse_en: ayahTranslation
        };
        const existing = Array.isArray(this.ayahReflections[key]) ? [...this.ayahReflections[key]] : [];
        if (!isEditing) {
          this.ayahReflections = _objectSpread(_objectSpread({}, this.ayahReflections), {}, {
            [key]: [...existing, entryPayload]
          });
        } else {
          const targetIndex = typeof this.editingReflectionIndex === "number" ? this.editingReflectionIndex : existing.findIndex(item => item.id === this.editingReflectionId);
          if (targetIndex >= 0) {
            existing[targetIndex] = _objectSpread(_objectSpread({}, existing[targetIndex]), entryPayload);
          }
          this.ayahReflections = _objectSpread(_objectSpread({}, this.ayahReflections), {}, {
            [key]: existing
          });
          this.cancelReflectionEdit();
          this.reflectionSuccessMessage = "Reflection updated.";
        }
        if (!isEditing) {
          this.flagReflectionKey(key);
          this.showToast("Reflection saved.", 4000);
          this.announce("Reflection saved.");
          this.reflectionSuccessMessage = "Your reflection has been saved.";
          if (this.reflectionSuccessTimeout) {
            clearTimeout(this.reflectionSuccessTimeout);
          }
          this.reflectionSuccessTimeout = setTimeout(() => {
            this.hideReflectionModal();
            this.reflectionSuccessTimeout = null;
          }, 1200);
        }
      } catch (error) {
        var _error$response;
        console.error("Error saving reflection", error);
        this.reflectionErrorMessage = (error === null || error === void 0 || (_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || "Unable to save reflection right now.";
        this.showToast("Unable to save reflection. Please try again.", 3000);
      } finally {
        this.isSavingReflection = false;
      }
    },
    async loadAyahReflections() {
      if (!this.bookmarkAuthenticated) return;
      try {
        var _response$data5;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/fetch-notes");
        const notes = Array.isArray(response.data) ? response.data : ((_response$data5 = response.data) === null || _response$data5 === void 0 ? void 0 : _response$data5.notes) || [];
        const next = {};
        notes.forEach(note => {
          const surahNumber = this.extractSurahNumberFromNoteName(note.surah_name);
          const ayahNumber = Number(note.ayah_num);
          if (!surahNumber || !ayahNumber) return;
          const key = this.buildAyahKey(surahNumber, ayahNumber);
          const entry = {
            id: note.id,
            subject: (note.ayah_info || "").trim(),
            message: this.stripHtmlTags(note.ayah_notes),
            surah_name: note.surah_name,
            ayah_verse_ar: note.ayah_verse_ar,
            ayah_verse_en: note.ayah_verse_en
          };
          const existingEntries = next[key];
          next[key] = Array.isArray(existingEntries) ? [...existingEntries, entry] : [entry];
        });
        const cachedKeys = {};
        Object.keys(next).forEach(key => {
          cachedKeys[key] = true;
        });
        this.ayahReflectionKeys = _objectSpread(_objectSpread({}, this.ayahReflectionKeys || {}), cachedKeys);
        this.persistReflectionKeys(this.ayahReflectionKeys);
        this.persistGeneralReflectionKeys(this.ayahReflectionKeys);
        this.ayahReflections = next;
      } catch (error) {
        console.error("Error loading reflections", error);
      }
    },
    extractSurahNumberFromNoteName(name) {
      if (!name) return null;
      const trimmed = name.trim();
      const match = /^(\d+)/.exec(trimmed);
      if (match) {
        return Number(match[1]);
      }
      const fallback = trimmed.split(/\D+/);
      for (const part of fallback) {
        const num = Number(part);
        if (!Number.isNaN(num)) return num;
      }
      return null;
    },
    stripHtmlTags(value) {
      if (!value) return "";
      const div = document.createElement("div");
      div.innerHTML = value;
      return (div.textContent || div.innerText || "").trim();
    },
    async ensureAuthenticated(message = "Please log in to access bookmarks & reflections.", options = {}) {
      const userId = await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_4__.fetchUserIdFromApi)();
      const isAuthed = !!userId;
      if (isAuthed) {
        this.bookmarkAuthenticated = true;
        this.bookmarkStorageUserId = userId;
        await this.initializeReflectionCacheKey();
        return true;
      }
      this.bookmarkAuthenticated = false;
      if (options.ayah) {
        this.showAyahAuthWarning(options.ayah, message);
      } else {
        this.showAuthAlert(message);
      }
      return false;
    },
    showAyahAuthWarning(ayah, message) {
      var _this$surahDetails15;
      if (!ayah) return;
      const surahNumber = Number(((_this$surahDetails15 = this.surahDetails) === null || _this$surahDetails15 === void 0 ? void 0 : _this$surahDetails15.surahNumber) || this.selectedSurah);
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      if (!surahNumber || !ayahNumber) return;
      const key = this.buildAyahKey(surahNumber, ayahNumber);
      this.triggerAyahFeedback(key, message, "feedback-warning", "warning", "/login", "Log in");
    },
    showAuthAlert(message = "Please log in to access bookmarks & reflections.") {
      var _this$filteredAyahs, _this$filteredAyahs2, _this$filteredAyahs3;
      const fallbackAyah = ((_this$filteredAyahs = this.filteredAyahs) === null || _this$filteredAyahs === void 0 ? void 0 : _this$filteredAyahs[this.selectedCardIndex]) || ((_this$filteredAyahs2 = this.filteredAyahs) === null || _this$filteredAyahs2 === void 0 ? void 0 : _this$filteredAyahs2[this.currentlyPlayingIndex]) || ((_this$filteredAyahs3 = this.filteredAyahs) === null || _this$filteredAyahs3 === void 0 ? void 0 : _this$filteredAyahs3[0]);
      if (fallbackAyah) {
        this.showAyahAuthWarning(fallbackAyah, message);
        return;
      }
      this.showToast(message, 6000);
    },
    async persistSavedAyahs(next) {
      if (!this.bookmarkAuthenticated) return;
      try {
        await this.initializeSavedAyahStorageKey();
        const key = this.savedAyahStorageKey || "ic_saved_ayahs_session";
        const payload = JSON.stringify(next);
        sessionStorage.setItem(key, payload);
        localStorage.setItem(key, payload);
      } catch (_) {
        // no-op
      }
    },
    async initializeSavedAyahStorageKey() {
      if (this.savedAyahStorageKey && this.savedAyahStorageKey.startsWith("ic_saved_ayahs_user_") && this.bookmarkStorageUserId) {
        return;
      }
      await this.fetchBookmarkStorageUserId();
      this.savedAyahStorageKey = this.buildSavedAyahStorageKey();
    },
    buildReflectionCacheKey() {
      if (this.bookmarkStorageUserId) {
        return `ic_reflection_keys_user_${this.bookmarkStorageUserId}`;
      }
      if (!this.bookmarkAnonId) {
        return "";
      }
      return `ic_reflection_keys_anon_${this.bookmarkAnonId}`;
    },
    async initializeReflectionCacheKey() {
      await this.fetchBookmarkStorageUserId();
      const nextKey = this.buildReflectionCacheKey();
      if (nextKey && this.reflectionCacheKey === nextKey) {
        this.loadReflectionKeyCache();
        return;
      }
      this.reflectionCacheKey = nextKey;
      this.loadReflectionKeyCache();
    },
    loadReflectionKeyCache() {
      const generalKeys = this.loadGeneralReflectionKeyCache();
      let combined = _objectSpread({}, generalKeys || {});
      if (this.reflectionCacheKey) {
        try {
          const stored = localStorage.getItem(this.reflectionCacheKey);
          if (stored) {
            const parsed = JSON.parse(stored || "{}");
            combined = _objectSpread(_objectSpread({}, combined), parsed);
          }
        } catch (_) {
          // ignore JSON errors
        }
      }
      this.ayahReflectionKeys = combined;
    },
    loadGeneralReflectionKeyCache() {
      if (!this.reflectionGeneralStorageKey) return {};
      try {
        const stored = localStorage.getItem(this.reflectionGeneralStorageKey);
        return stored ? JSON.parse(stored) : {};
      } catch (_) {
        return {};
      }
    },
    persistReflectionKeys(keys = this.ayahReflectionKeys) {
      if (!this.reflectionCacheKey) return;
      try {
        const payload = JSON.stringify(keys || {});
        localStorage.setItem(this.reflectionCacheKey, payload);
      } catch (_) {
        // no-op
      }
    },
    persistGeneralReflectionKeys(keys = this.ayahReflectionKeys) {
      if (!this.reflectionGeneralStorageKey) return;
      try {
        const payload = JSON.stringify(keys || {});
        localStorage.setItem(this.reflectionGeneralStorageKey, payload);
      } catch (_) {
        // no-op
      }
    },
    flagReflectionKey(key) {
      if (!key) return;
      const next = _objectSpread(_objectSpread({}, this.ayahReflectionKeys || {}), {}, {
        [key]: true
      });
      this.ayahReflectionKeys = next;
      this.persistReflectionKeys(next);
      this.persistGeneralReflectionKeys(next);
    },
    buildSavedAyahStorageKey() {
      const base = "ic_saved_ayahs";
      if (this.bookmarkStorageUserId) {
        return `${base}_user_${this.bookmarkStorageUserId}`;
      }
      if (!this.bookmarkAnonId) {
        let anon = sessionStorage.getItem("ic_saved_ayahs_anon_id");
        if (!anon) {
          anon = `anon-${Math.random().toString(36).slice(2)}`;
          sessionStorage.setItem("ic_saved_ayahs_anon_id", anon);
        }
        this.bookmarkAnonId = anon;
      }
      return `${base}_anon_${this.bookmarkAnonId}`;
    },
    async fetchBookmarkStorageUserId() {
      if (this.bookmarkStorageUserId) {
        return this.bookmarkStorageUserId;
      }
      const userId = await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_4__.fetchUserIdFromApi)();
      if (userId) {
        this.bookmarkStorageUserId = userId;
      }
      return this.bookmarkStorageUserId;
    },
    onAyahDragStart(ayah, event) {
      if (!event || !this.surahDetails || !ayah) return;
      const ayahNumber = Number(ayah.numberInSurah || ayah.number);
      const payload = {
        surah_number: Number(this.surahDetails.surahNumber),
        surah_name: this.surahDetails.englishName || this.surahDetails.name || "Surah",
        ayah_number: ayahNumber,
        ayah_verse_ar: ayah.text || "",
        ayah_verse_en: ayah.translation || ""
      };
      event.dataTransfer.setData("text/plain", JSON.stringify(payload));
      event.dataTransfer.effectAllowed = "copyMove";
    },
    toggleNextStepMinimized() {
      if (!this.canMinimizeNextStep) return;
      this.nextStepMinimized = !this.nextStepMinimized;
      try {
        localStorage.setItem("suratNextStepMinimized", this.nextStepMinimized ? "1" : "0");
      } catch (_) {}
    },
    dismissNextStep() {
      this.showNextStep = false;
      try {
        localStorage.setItem("suratNextStepDismissed", "1");
      } catch (_) {}
    },
    calibrateItemHeight(force = false) {
      try {
        const nodes = this.$refs.audioCard;
        if (!nodes) return;
        const refs = Array.isArray(nodes) ? nodes : [nodes];
        const maxHeight = refs.reduce((max, node) => {
          if (!node) return max;
          const rect = node.getBoundingClientRect();
          return rect.height > max ? rect.height : max;
        }, 0);
        if (!maxHeight) return;
        const candidate = Math.round(maxHeight + 24);
        if (!force && Math.abs(this.itemHeight - candidate) < 2) return;
        this.itemHeight = candidate;
        this.updateVirtualWindow();
      } catch (_) {}
    },
    scheduleHeightCalibration(force = false) {
      if (typeof window === "undefined" || !window.requestAnimationFrame) return;
      if (this._heightMeasureRaf) {
        window.cancelAnimationFrame(this._heightMeasureRaf);
        this._heightMeasureRaf = null;
      }
      this._heightMeasureRaf = window.requestAnimationFrame(() => {
        this._heightMeasureRaf = null;
        this.calibrateItemHeight(force);
        if (!this.itemHeightCalibrated) {
          this.itemHeightCalibrated = true;
        }
      });
    },
    computeListTop() {
      try {
        const el = this.$refs.listContainer;
        if (!el) {
          this.listTop = 0;
          return;
        }
        const rect = el.getBoundingClientRect();
        this.listTop = rect.top + window.scrollY;
      } catch (_) {
        this.listTop = 0;
      }
    },
    onScrollVirtual() {
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      const listTop = Number(this.listTop) || 0;
      const threshold = listTop + Math.max(320, window.innerHeight * 0.4);
      let show = scrollY > threshold;
      const firstCard = document.getElementById("ayah-card-0");
      if (firstCard) {
        const rect = firstCard.getBoundingClientRect();
        if (rect.bottom < window.innerHeight - 24) show = true;
      }
      if (this.showScrollTop !== show) this.showScrollTop = show;
      this.isManualScrolling = true;
      clearTimeout(this.manualScrollTimer);
      this.manualScrollTimer = setTimeout(() => {
        this.isManualScrolling = false;
      }, 1000);
      if (typeof window !== "undefined") {
        if (this._virtualWindowRaf) {
          window.cancelAnimationFrame(this._virtualWindowRaf);
        }
        this._virtualWindowRaf = window.requestAnimationFrame(() => {
          this._virtualWindowRaf = null;
          this.updateVirtualWindow();
          if (this.isNavigating) {
            this.checkNavigationSettled();
          }
        });
      } else {
        this.updateVirtualWindow();
      }
    },
    updateVirtualWindow() {
      const n = this.filteredAyahs ? this.filteredAyahs.length : 0;
      if (n === 0) {
        this.visibleStart = 0;
        this.visibleEnd = 0;
        return;
      }
      const now = Date.now();
      if (this.isNavigating && this.windowLockUntil && now < this.windowLockUntil && typeof this.windowLockIndex === "number") {
        const _start = Math.max(0, this.windowLockIndex - this.buffer);
        const _end = Math.min(n, _start + this.windowSize + this.buffer * 2);
        if (_start !== this.visibleStart || _end !== this.visibleEnd) {
          this.visibleStart = _start;
          this.visibleEnd = _end;
          if (!this.itemHeightCalibrated) {
            this.scheduleHeightCalibration(true);
          }
        }
        return;
      }
      // Account for the dynamic sticky header offset when determining which card is "active" at the top
      const offset = this.currentHeaderOffset;
      const y = window.scrollY - this.listTop + offset;

      // If we are at or above the list top, pin to start
      if (window.scrollY <= this.listTop + 5) {
        const _start2 = 0;
        const _end2 = Math.min(n, this.windowSize + this.buffer * 2);
        if (_start2 !== this.visibleStart || _end2 !== this.visibleEnd) {
          this.visibleStart = _start2;
          this.visibleEnd = _end2;
          if (!this.itemHeightCalibrated) {
            this.scheduleHeightCalibration(true);
          }
        }
        return;
      }
      const approxIndex = Math.max(0, Math.floor(y / Math.max(1, this.itemHeight)));
      const start = Math.max(0, approxIndex - this.buffer);
      const end = Math.min(n, start + this.windowSize + this.buffer * 2);
      if (start !== this.visibleStart || end !== this.visibleEnd) {
        var _this$filteredAyahs4;
        this.visibleStart = start;
        this.visibleEnd = end;

        // UX Improvement: Sync sidebar highlights on scroll (if not playing)
        const isPlayingAny = Object.values(this.isAudioPlaying).some(v => v);
        if (!this.isNavigating && !this.isAutoSyncLocked() && this.isManualScrolling && !isPlayingAny && (_this$filteredAyahs4 = this.filteredAyahs) !== null && _this$filteredAyahs4 !== void 0 && _this$filteredAyahs4[approxIndex]) {
          // Critical: Use a silent update or check isManualScrolling 
          // to prevent syncPlaybackScroll from snap-jumping during user scroll.
          this.currentlyPlayingIndex = approxIndex;
          this.isHighlighted = true;
          this.selectedJuz = this.filteredAyahs[approxIndex].juz;
        }
        if (!this.itemHeightCalibrated) {
          this.scheduleHeightCalibration(true);
        }
      }
    },
    syncVirtualWindowAfterSelection() {
      const total = this.filteredAyahs ? this.filteredAyahs.length : 0;
      this.visibleStart = 0;
      this.visibleEnd = Math.min(total, this.windowSize + this.buffer * 2);
      this.$nextTick(() => {
        this.computeListTop();
        this.updateVirtualWindow();
      });
    },
    readDeepLinkTarget() {
      if (typeof window === "undefined") return null;
      const params = new URLSearchParams(window.location.search || "");
      const surah = Number(params.get("surah"));
      const ayah = Number(params.get("ayah"));
      if (!surah) return null;
      return {
        surah,
        ayah: ayah || null
      };
    },
    maybeScrollToDeepLink() {
      if (this.deepLinkHandled || !this.deepLinkTarget || !this.surahDetails) return;
      const surahNumber = Number(this.deepLinkTarget.surah);
      if (!surahNumber || Number(this.surahDetails.surahNumber) !== surahNumber) return;
      const ayahNumber = Number(this.deepLinkTarget.ayah);
      if (!ayahNumber) {
        this.deepLinkHandled = true;
        return;
      }
      const index = ayahNumber - 1;
      if (!Array.isArray(this.surahDetails.ayahs) || index < 0 || index >= this.surahDetails.ayahs.length) {
        this.deepLinkHandled = true;
        return;
      }
      this.deepLinkHandled = true;
      this.scrollToAyahIndex(index);
    },
    isAutoSyncLocked() {
      return Date.now() < (this.autoSyncLockUntil || 0);
    },
    lockAutoSync(durationMs) {
      const nextUntil = Date.now() + Math.max(0, durationMs || 0);
      if (!this.autoSyncLockUntil || nextUntil > this.autoSyncLockUntil) {
        this.autoSyncLockUntil = nextUntil;
      }
    },
    getScrollBehavior(preferred = "smooth") {
      if (preferred === "auto") return "auto";
      try {
        if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          return "auto";
        }
      } catch (_) {}
      return preferred;
    },
    beginManualNavigation(index, options = {}) {
      const {
        duration = 2200,
        tolerance = 12
      } = options || {};
      this.isNavigating = true;
      this.navigationTargetIndex = index;
      this.navigationTargetTolerance = tolerance;
      this.windowLockIndex = index;
      this.windowLockUntil = Date.now() + duration;
      this.lockAutoSync(duration + 400);
      if (this._navigationSettleTimer) {
        clearTimeout(this._navigationSettleTimer);
        this._navigationSettleTimer = null;
      }
      const token = (this._navigationSettleToken || 0) + 1;
      this._navigationSettleToken = token;
      this._navigationSettleTimer = setTimeout(() => {
        if (token !== this._navigationSettleToken) return;
        this.finishManualNavigation();
      }, duration);
    },
    finishManualNavigation() {
      const index = this.navigationTargetIndex;
      this.navigationTargetIndex = null;
      this.windowLockIndex = null;
      this.windowLockUntil = 0;
      this.isNavigating = false;
      const now = Date.now();
      const minUnlockAt = now + 250;
      if (!this.autoSyncLockUntil || this.autoSyncLockUntil < minUnlockAt) {
        this.autoSyncLockUntil = minUnlockAt;
      }
      if (typeof index === "number" && index >= 0) {
        this.selectCard(index);
      }
    },
    checkNavigationSettled() {
      if (this.navigationTargetIndex == null) return;
      const index = this.navigationTargetIndex;
      const cardEl = document.getElementById(`ayah-card-${index}`);
      if (!cardEl || !cardEl.getBoundingClientRect) return;
      const rect = cardEl.getBoundingClientRect();
      const offset = this.currentHeaderOffset;
      const viewportHeight = window.innerHeight;
      const audioHeight = this.getAudioPlayerHeight();
      const availableHeight = Math.max(viewportHeight - offset - audioHeight, 0);
      const centerFactor = typeof this.preferredPlaybackScrollFactor === "number" ? this.preferredPlaybackScrollFactor : 0.5;
      const desiredCenter = offset + availableHeight * centerFactor;
      const delta = rect.top + rect.height / 2 - desiredCenter;
      if (Math.abs(delta) <= (this.navigationTargetTolerance || 12)) {
        this.finishManualNavigation();
      }
    },
    scrollToAyahIndex(index, options = {}) {
      const {
        behavior = "smooth",
        settle = false,
        settleDelay = null,
        force = false,
        lock = false
      } = options || {};
      const resolvedBehavior = this.getScrollBehavior(behavior);
      const total = Array.isArray(this.filteredAyahs) ? this.filteredAyahs.length : 0;
      if (!total || index < 0 || index >= total) {
        this.isNavigating = false;
        return;
      }

      // Ensure target is in visible start/end for virtual scroll
      const start = Math.max(0, index - this.buffer);
      const end = Math.min(total, start + this.windowSize + this.buffer * 2);
      if (index < this.visibleStart || index >= this.visibleEnd) {
        this.visibleStart = start;
        this.visibleEnd = end;
      }

      // Reduced nested ticks for an "instant" jump feel
      this.$nextTick(() => {
        const runScroll = () => {
          this.computeListTop();
          this.calibrateItemHeight();
          const offset = this.currentHeaderOffset;
          const viewportHeight = window.innerHeight;
          const audioHeight = this.getAudioPlayerHeight();
          const availableHeight = Math.max(viewportHeight - offset - audioHeight, 0);
          if (!force && this.lastAutoScrollIndex === index && Date.now() - this.lastProgrammaticScrollAt < 650) {
            this.lastProgrammaticScrollAt = Date.now();
            this.lastAutoScrollIndex = index;
            this.selectCard(index);
            this.isNavigating = false;
            return;
          }
          const cardEl = document.getElementById(`ayah-card-${index}`);
          const hadCardEl = !!cardEl;
          let targetTop;
          if (cardEl && cardEl.getBoundingClientRect) {
            const rect = cardEl.getBoundingClientRect();
            const cardCenter = window.scrollY + rect.top + rect.height / 2;
            const centerFactor = typeof this.preferredPlaybackScrollFactor === "number" ? this.preferredPlaybackScrollFactor : 0.5;
            const centerOffset = offset + availableHeight * centerFactor;
            targetTop = cardCenter - centerOffset;
          } else {
            targetTop = this.listTop + index * this.itemHeight - offset;
          }
          const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
          const safeTarget = Math.min(Math.max(0, targetTop), maxScroll);
          const scrollableHeight = maxScroll;
          const minimalScrollableHeight = Math.max(32, availableHeight * 0.35);
          if (scrollableHeight <= minimalScrollableHeight) {
            this.lastProgrammaticScrollAt = Date.now();
            this.lastAutoScrollIndex = index;
            this.selectCard(index);
            this.isNavigating = false;
            return;
          }
          let finalTarget = safeTarget;
          if (targetTop > maxScroll && index < total - 1) {
            const topAligned = this.listTop + index * this.itemHeight - offset;
            finalTarget = Math.min(Math.max(0, topAligned), maxScroll);
          }
          this.lastProgrammaticScrollAt = Date.now();
          this.lastAutoScrollIndex = index;
          const distance = Math.abs(finalTarget - window.scrollY);
          const correctionDelay = settleDelay != null ? settleDelay : Math.min(900, Math.max(320, distance * 0.35));
          if (lock) {
            const lockDuration = Math.max(1400, correctionDelay + 900);
            this.beginManualNavigation(index, {
              duration: lockDuration,
              tolerance: 12
            });
          }
          const shouldPrime = lock && !hadCardEl;
          window.scrollTo({
            top: finalTarget,
            behavior: shouldPrime ? "auto" : resolvedBehavior
          });
          this.selectCard(index);
          if (lock) {
            this.$nextTick(() => {
              this.checkNavigationSettled();
            });
          }
          if (shouldPrime) {
            this.$nextTick(() => {
              if (typeof window !== "undefined" && window.requestAnimationFrame) {
                window.requestAnimationFrame(() => {
                  const nextEl = document.getElementById(`ayah-card-${index}`);
                  if (!nextEl || !nextEl.getBoundingClientRect) return;
                  const rect = nextEl.getBoundingClientRect();
                  const nextOffset = this.currentHeaderOffset;
                  const nextViewport = window.innerHeight;
                  const nextAudio = this.getAudioPlayerHeight();
                  const nextAvailable = Math.max(nextViewport - nextOffset - nextAudio, 0);
                  const centerFactor = typeof this.preferredPlaybackScrollFactor === "number" ? this.preferredPlaybackScrollFactor : 0.5;
                  const nextCenterOffset = nextOffset + nextAvailable * centerFactor;
                  const nextTarget = window.scrollY + rect.top + rect.height / 2 - nextCenterOffset;
                  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
                  const safeNextTarget = Math.min(Math.max(0, nextTarget), maxScroll);
                  window.scrollTo({
                    top: safeNextTarget,
                    behavior: resolvedBehavior
                  });
                });
              }
            });
          }
          if (settle) {
            this.scheduleScrollCorrection(index, {
              delay: correctionDelay,
              behavior: resolvedBehavior,
              passes: 2
            });
          }
          if (!lock) {
            // Delay resetting the navigation flag to let scrolls settle fully.
            // 1000ms ensures smooth scroll completes before auto-locking resumes.
            setTimeout(() => {
              this.isNavigating = false;
            }, settle ? Math.max(1000, correctionDelay + 200) : 1000);
          }
        };
        if (typeof window !== "undefined" && window.requestAnimationFrame) {
          window.requestAnimationFrame(runScroll);
        } else {
          runScroll();
        }
      });
    },
    scheduleScrollCorrection(index, options = {}) {
      const {
        delay = 420,
        tolerance = 8,
        behavior = "smooth",
        passes = 1
      } = options || {};
      if (this._scrollCorrectionTimer) {
        clearTimeout(this._scrollCorrectionTimer);
        this._scrollCorrectionTimer = null;
      }
      const token = (this._scrollCorrectionToken || 0) + 1;
      this._scrollCorrectionToken = token;
      const runCorrection = attempt => {
        if (token !== this._scrollCorrectionToken) return;
        this.$nextTick(() => {
          if (token !== this._scrollCorrectionToken) return;
          const cardEl = document.getElementById(`ayah-card-${index}`);
          if (!cardEl || !cardEl.getBoundingClientRect) return;
          const rect = cardEl.getBoundingClientRect();
          const offset = this.currentHeaderOffset;
          const viewportHeight = window.innerHeight;
          const audioHeight = this.getAudioPlayerHeight();
          const availableHeight = Math.max(viewportHeight - offset - audioHeight, 0);
          const centerFactor = typeof this.preferredPlaybackScrollFactor === "number" ? this.preferredPlaybackScrollFactor : 0.5;
          const desiredCenter = offset + availableHeight * centerFactor;
          const delta = rect.top + rect.height / 2 - desiredCenter;
          if (Math.abs(delta) <= tolerance) return;
          const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
          const target = Math.min(Math.max(0, window.scrollY + delta), maxScroll);
          window.scrollTo({
            top: target,
            behavior
          });
          if (attempt < passes) {
            this._scrollCorrectionTimer = setTimeout(() => {
              runCorrection(attempt + 1);
            }, 180);
          }
        });
      };
      this._scrollCorrectionTimer = setTimeout(() => {
        runCorrection(1);
      }, delay);
    },
    getAudioPlayerHeight() {
      if (!this.showAudioPlayer) return 0;
      if (typeof document !== "undefined") {
        const container = document.querySelector(".audio-player-container");
        if (container) {
          const rect = container.getBoundingClientRect();
          if (rect && rect.height) {
            return rect.height;
          }
        }
      }
      // Match the fixed audio player height plus safe area allowance.
      return 220;
    },
    // simple localStorage cache with TTL and SWR
    async cachedFetchJSON(url, cacheKey, ttlMs = 24 * 60 * 60 * 1000) {
      try {
        const raw = localStorage.getItem(cacheKey);
        if (raw) {
          const {
            ts,
            data
          } = JSON.parse(raw);
          if (Date.now() - ts < ttlMs) {
            // return cached immediately
            return {
              data,
              fromCache: true
            };
          }
        }
      } catch (_) {}
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status}`);
      const json = await res.json();
      try {
        localStorage.setItem(cacheKey, JSON.stringify({
          ts: Date.now(),
          data: json
        }));
      } catch (_) {}
      return {
        data: json,
        fromCache: false
      };
    },
    onKeydown(e) {
      var _e$target;
      const tag = (e.target && e.target.tagName || "").toLowerCase();
      if ((_e$target = e.target) !== null && _e$target !== void 0 && _e$target.isContentEditable || ["input", "textarea", "select"].includes(tag)) return;
      if (!Array.isArray(this.filteredAyahs) || this.filteredAyahs.length === 0) return;
      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          this.goToNextCard();
          break;
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          this.goToPreviousCard();
          break;
        case "Home":
          e.preventDefault();
          this.goToFirstCard();
          break;
        case "End":
          e.preventDefault();
          this.goToLastCard();
          break;
      }
    },
    selectCard(index) {
      this.selectedCardIndex = index;
      this.currentlyPlayingIndex = index;
      this.isHighlighted = true;
      // ensure card is visible
      // removed programmatic scrolling
      const verseNum = index + 1;
      this.screenReaderMessage = `Selected verse ${verseNum}.`;
    },
    goToNextCard() {
      const next = (this.selectedCardIndex + 1) % this.filteredAyahs.length;
      this.selectCard(next);
    },
    goToPreviousCard() {
      const prev = (this.selectedCardIndex - 1 + this.filteredAyahs.length) % this.filteredAyahs.length;
      this.selectCard(prev);
    },
    goToFirstCard() {
      this.selectCard(0);
    },
    goToLastCard() {
      this.selectCard(this.filteredAyahs.length - 1);
    },
    updateIsMobile() {
      try {
        this.isMobile = window.matchMedia("(max-width: 767px)").matches;
        this.isTabletOrMobile = window.matchMedia("(max-width: 991px)").matches;
        this.isTablet = window.matchMedia("(min-width: 768px) and (max-width: 991px)").matches;
      } catch (e) {
        const width = window.innerWidth;
        this.isMobile = width <= 767;
        this.isTabletOrMobile = width <= 991;
        this.isTablet = width >= 768 && width <= 991;
      }
    },
    // removed ensureCardPositionsCached and fallbackCardPositions (scrollbar-related)

    isElementVisible: function (element) {
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      // Check if element has valid dimensions
      if (rect.height <= 0 || rect.width <= 0) return false;

      // Check if element is within viewport bounds
      const isInViewport = rect.top < windowHeight && rect.bottom > 0 && rect.left < windowWidth && rect.right > 0;
      return isInViewport;
    },
    isElementValid: function (element) {
      if (!element) return false;
      const rect = element.getBoundingClientRect();

      // Check if element has valid dimensions
      if (rect.height <= 0 || rect.width <= 0) return false;

      // Check if element exists in the DOM (basic check)
      if (!element.offsetParent && element !== document.body) return false;
      return true;
    },
    getElementPosition: function (element) {
      if (!element || !this.isElementValid(element)) {
        return null;
      }
      try {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;

        // Basic sanity check
        if (isNaN(elementTop) || elementTop < 0) {
          return null;
        }

        // Additional check for unreasonably high positions (might indicate loading issue)
        const documentHeight = document.documentElement.scrollHeight;
        if (elementTop > documentHeight * 0.9) {
          console.warn(`Element position seems too high: ${elementTop}, document height: ${documentHeight}`);
          return null;
        }
        return elementTop;
      } catch (error) {
        console.error("Error getting element position:", error);
        return null;
      }
    },
    // removed scrollToElement and smoothScrollToAyah
    highlightedText: function (ayah) {
      if (!ayah || !ayah.text && !ayah.words && !ayah.tajweedText) return "";
      const words = this.getAyahDisplayWords(ayah);
      const wordTranslations = this.mapWordTranslations(words, this.getAyahWordTranslations(ayah));
      const useTajweed = this.shouldUseTajweedWords(ayah, words.length);
      return words.map((word, index) => {
        const content = useTajweed ? this.formatTajweedText(word) : this.escapeHtml(word);
        const translation = this.showWordTranslation && wordTranslations.length ? this.escapeHtml(this.cleanWordTranslation(wordTranslations[index] || "")) : "";
        return `<span class="ayah-word" data-word-index="${index}"><span class="ayah-word-ar">${content}</span>${translation ? `<span class="ayah-word-translation text-muted">${translation}</span>` : ""}</span>`;
      }).join(" ");
    },
    getAyahBaseWords(ayah) {
      if (!ayah) return [];
      if (Array.isArray(ayah.words) && ayah.words.length) return this.normalizeAyahWords(ayah.words);
      if (ayah.text) return this.normalizeAyahWords(ayah.text.split(" "));
      return [];
    },
    getAyahIntroWordCount(ayah, baseWords) {
      const words = Array.isArray(baseWords) ? baseWords : this.getAyahBaseWords(ayah);
      if (words.length < 4) return 0;
      const normalized = words.slice(0, 4).map(word => this.normalizeArabicToken(word));
      const expected = ["بسم", "الله", "الرحمن", "الرحيم"];
      for (let i = 0; i < expected.length; i++) {
        if (normalized[i] !== expected[i]) return 0;
      }
      return 4;
    },
    normalizeArabicToken(token) {
      return this.cleanAyahToken(token).replace(/[\u0622\u0623\u0625\u0671]/g, "\u0627").replace(/[\u064B-\u0652\u0653-\u0655\u0670]/g, "").replace(/\u0640/g, "").trim();
    },
    normalizeAyahWords(tokens) {
      if (!Array.isArray(tokens)) return [];
      const out = [];
      const letterRegex = /[\u0621-\u064A\u066E-\u066F\u0671-\u06D3\u06FA-\u06FC]/;
      tokens.forEach(token => {
        if (!token) return;
        const cleaned = this.cleanAyahToken(token);
        if (!cleaned) return;
        const hasLetter = letterRegex.test(cleaned);
        if (!hasLetter) return;
        out.push(cleaned);
      });
      return out;
    },
    cleanAyahToken(token) {
      return String(token).replace(/[\u0615-\u061A\u06D6-\u06ED\u06DD]/g, "").trim();
    },
    normalizeTajweedWords(tokens) {
      if (!Array.isArray(tokens)) return [];
      const out = [];
      const letterRegex = /[\u0621-\u064A\u066E-\u066F\u0671-\u06D3\u06FA-\u06FC]/;
      tokens.forEach(token => {
        if (!token) return;
        const plain = this.cleanAyahToken(this.stripTajweedMarkers(token));
        if (!plain) return;
        const hasLetter = letterRegex.test(plain);
        if (!hasLetter) return;
        out.push(token);
      });
      return out;
    },
    stripTajweedMarkers(value) {
      return String(value).replace(/\[[a-z]+(?::\d+)?\[/g, "").replace(/]/g, "");
    },
    shouldUseTajweedWords(ayah, fallbackLength = 0) {
      if (!this.showTajweed || !ayah) return false;
      if (!Array.isArray(ayah.tajweedWords) || !ayah.tajweedWords.length) return false;
      const normalized = this.normalizeTajweedWords(ayah.tajweedWords);
      const baseWords = this.getAyahBaseWords(ayah);
      const introCount = this.getAyahIntroWordCount(ayah, baseWords);
      const matchesFull = fallbackLength && normalized.length === fallbackLength;
      const matchesIntro = fallbackLength && introCount && normalized.length === fallbackLength - introCount;
      if (!matchesFull && !matchesIntro) return false;
      return true;
    },
    getAyahDisplayWords(ayah) {
      var _ayah$tajweedWords;
      if (!ayah) return [];
      const baseWords = this.getAyahBaseWords(ayah);
      if (!this.showTajweed || !((_ayah$tajweedWords = ayah.tajweedWords) !== null && _ayah$tajweedWords !== void 0 && _ayah$tajweedWords.length)) return baseWords;
      const tajweedWords = this.normalizeTajweedWords(ayah.tajweedWords);
      const introCount = this.getAyahIntroWordCount(ayah, baseWords);
      if (introCount && tajweedWords.length === baseWords.length - introCount) {
        return [...baseWords.slice(0, introCount), ...tajweedWords];
      }
      if (this.shouldUseTajweedWords(ayah, baseWords.length)) return tajweedWords;
      return baseWords;
    },
    getAyahWordTranslations(ayah) {
      if (!ayah || !Array.isArray(ayah.wordTranslations)) return [];
      return ayah.wordTranslations;
    },
    cleanWordTranslation(text) {
      return String(text).replace(/[\[\]\(\)]/g, "").replace(/\s{2,}/g, " ").trim();
    },
    mapWordTranslations(words, translations) {
      if (!Array.isArray(words)) return [];
      if (!Array.isArray(translations) || !translations.length) return [];
      const introCount = this.getAyahIntroWordCount(null, words);
      if (introCount && translations.length === words.length - introCount) {
        return ["In (the) name", "Allah", "the Most Gracious", "the Most Merciful", ...translations];
      }
      const letterRegex = /[\u0621-\u064A\u066E-\u066F\u0671-\u06D3\u06FA-\u06FC]/;
      const mapped = [];
      let tIndex = 0;
      words.forEach(word => {
        const hasLetter = letterRegex.test(this.stripTajweedMarkers(word));
        if (hasLetter && tIndex < translations.length) {
          mapped.push(translations[tIndex]);
          tIndex += 1;
        } else {
          mapped.push("");
        }
      });
      return mapped;
    },
    getAyahWordList(ayah) {
      if (!ayah) return [];
      const baseWords = this.getAyahBaseWords(ayah);
      if (baseWords.length) return baseWords;
      if (this.showTajweed && Array.isArray(ayah.tajweedWords)) return this.normalizeTajweedWords(ayah.tajweedWords);
      return [];
    },
    getAyahAudioWordCount(ayah) {
      if (!ayah) return 0;
      if (Array.isArray(ayah.audioSegments) && ayah.audioSegments.length) {
        const maxIndex = ayah.audioSegments.reduce((acc, seg) => typeof (seg === null || seg === void 0 ? void 0 : seg.wordIndex) === "number" && seg.wordIndex > acc ? seg.wordIndex : acc, -1);
        return Math.max(0, maxIndex + 1);
      }
      if (Array.isArray(ayah.wordTranslations) && ayah.wordTranslations.length) return ayah.wordTranslations.length;
      return this.getAyahBaseWords(ayah).length;
    },
    getAyahHighlightOffset(ayah, audioWordCount) {
      const baseWords = this.getAyahBaseWords(ayah);
      const introCount = this.getAyahIntroWordCount(ayah, baseWords);
      if (!introCount) return 0;
      const displayCount = this.getAyahDisplayWords(ayah).length;
      if (displayCount === audioWordCount + introCount) return introCount;
      return 0;
    },
    getHighlightDisplayIndex(ayah, audioIndex, audioWordCount) {
      const baseWords = this.getAyahBaseWords(ayah);
      const introCount = this.getAyahIntroWordCount(ayah, baseWords);
      const displayCount = this.getAyahDisplayWords(ayah).length;
      if (!introCount) return audioIndex;
      if (displayCount === audioWordCount) {
        if (audioIndex < introCount) return null;
        return audioIndex;
      }
      if (displayCount === audioWordCount + introCount) return audioIndex + introCount;
      return audioIndex;
    },
    updateWordTimings(ayah, duration) {
      const wordCount = this.getAyahAudioWordCount(ayah);
      if (wordCount > 0 && duration > 0) {
        const step = duration / wordCount;
        this.wordTimings = Array.from({
          length: wordCount
        }, (_, i) => i * step);
      } else {
        this.wordTimings = [];
      }
    },
    getQuranRecitationId(reciterId) {
      if (!reciterId) return null;
      return this.reciterTimingMap ? this.reciterTimingMap[reciterId] : null;
    },
    async enrichSurahWithQuranSegments() {
      var _this$surahDetails16;
      if (!((_this$surahDetails16 = this.surahDetails) !== null && _this$surahDetails16 !== void 0 && (_this$surahDetails16 = _this$surahDetails16.ayahs) !== null && _this$surahDetails16 !== void 0 && _this$surahDetails16.length)) return;
      const recitationId = this.getQuranRecitationId(this.selectedReciter);
      const audioParam = recitationId ? `audio=${recitationId}&` : "";
      try {
        const {
          data
        } = await this.cachedFetchJSON(`https://api.quran.com/api/v4/verses/by_chapter/${this.selectedSurah}?${audioParam}words=true&per_page=300`, `cache:quran-timing:${this.selectedSurah}:${recitationId || "noaudio"}`, 7 * 24 * 60 * 60 * 1000);
        const verses = Array.isArray(data === null || data === void 0 ? void 0 : data.verses) ? data.verses : [];
        const byKey = new Map();
        verses.forEach(verse => {
          if (verse !== null && verse !== void 0 && verse.verse_key) byKey.set(verse.verse_key, verse);
        });
        this.surahDetails.ayahs = this.surahDetails.ayahs.map((ayah, index) => {
          var _match$audio, _match$audio2;
          const key = `${this.selectedSurah}:${ayah.numberInSurah || index + 1}`;
          const match = byKey.get(key);
          const verseWords = Array.isArray(match === null || match === void 0 ? void 0 : match.words) ? match.words.filter(word => (word === null || word === void 0 ? void 0 : word.char_type_name) === "word") : [];
          const quranWords = verseWords.map(word => (word === null || word === void 0 ? void 0 : word.text) || (word === null || word === void 0 ? void 0 : word.code_v1) || "");
          const wordTranslations = verseWords.map(word => {
            var _word$translation;
            return (word === null || word === void 0 || (_word$translation = word.translation) === null || _word$translation === void 0 ? void 0 : _word$translation.text) || "";
          });
          const audioUrl = match !== null && match !== void 0 && (_match$audio = match.audio) !== null && _match$audio !== void 0 && _match$audio.url ? `https://audio.qurancdn.com/${match.audio.url}` : ayah.audio;
          const segments = Array.isArray(match === null || match === void 0 || (_match$audio2 = match.audio) === null || _match$audio2 === void 0 ? void 0 : _match$audio2.segments) ? match.audio.segments.filter(seg => Array.isArray(seg) && seg.length >= 4).map(seg => ({
            wordIndex: seg[0],
            start: seg[2] / 1000,
            end: seg[3] / 1000
          })) : null;
          return _objectSpread(_objectSpread({}, ayah), {}, {
            audio: audioUrl,
            audioSegments: segments,
            quranWords,
            wordTranslations
          });
        });
      } catch (error) {
        console.warn("Unable to load Quran.com timing data:", error);
      }
    },
    startHighlightLoop() {
      if (!this.showRealtimeHighlighting) return;
      if (this._highlightRafId) return;
      const step = () => {
        if (typeof this.currentAudioIndex !== "number" || this.currentAudioIndex < 0) {
          const playingIndex = Array.isArray(this.isAudioPlaying) ? this.isAudioPlaying.findIndex(Boolean) : -1;
          if (playingIndex >= 0) {
            this.currentAudioIndex = playingIndex;
          }
        }
        const idx = typeof this.currentAudioIndex === "number" && this.currentAudioIndex >= 0 ? this.currentAudioIndex : this.currentlyPlayingIndex;
        if (!this.isAudioPlaying[idx]) {
          this.stopHighlightLoop();
          return;
        }
        this.updateHighlightFrame();
        this._highlightRafId = requestAnimationFrame(step);
      };
      this._highlightRafId = requestAnimationFrame(step);
    },
    stopHighlightLoop() {
      if (this._highlightRafId) {
        cancelAnimationFrame(this._highlightRafId);
        this._highlightRafId = null;
      }
      this._lastHighlightIndex = -1;
      this.clearActiveWordHighlight();
    },
    updateHighlightFrame() {
      const audio = this.currentlyPlaying;
      if (!audio) return;
      const duration = audio.duration || 0;
      if (!duration || !isFinite(duration)) return;
      if (typeof this.currentAudioIndex !== "number" || this.currentAudioIndex < 0) {
        const playingIndex = Array.isArray(this.isAudioPlaying) ? this.isAudioPlaying.findIndex(Boolean) : -1;
        if (playingIndex >= 0) {
          this.currentAudioIndex = playingIndex;
        }
      }
      const idx = typeof this.currentAudioIndex === "number" && this.currentAudioIndex >= 0 ? this.currentAudioIndex : this.currentlyPlayingIndex;
      const ayah = this.filteredAyahs[idx];
      const wordCount = this.getAyahAudioWordCount(ayah);
      if (!wordCount) return;
      const currentTime = audio.currentTime;
      const lead = this.highlightLeadSeconds || 0;
      const adjustedTime = Math.min(duration, Math.max(0, currentTime + lead));
      let index = -1;
      if (Array.isArray(ayah === null || ayah === void 0 ? void 0 : ayah.audioSegments) && ayah.audioSegments.length) {
        const segments = ayah.audioSegments;
        let segIndex = this._lastSegmentIndex;
        if (segIndex >= 0 && segIndex < segments.length) {
          const seg = segments[segIndex];
          if (seg && adjustedTime >= seg.start && adjustedTime < seg.end) {
            index = seg.wordIndex;
          }
        }
        if (index === -1) {
          if (segIndex < 0) segIndex = 0;
          if (segments[segIndex] && adjustedTime >= segments[segIndex].end) {
            while (segIndex < segments.length - 1 && adjustedTime >= segments[segIndex].end) {
              segIndex += 1;
            }
          } else if (segments[segIndex] && adjustedTime < segments[segIndex].start) {
            while (segIndex > 0 && adjustedTime < segments[segIndex].start) {
              segIndex -= 1;
            }
          }
          const seg = segments[segIndex] || segments[segments.length - 1];
          if (seg) {
            index = seg.wordIndex;
            this._lastSegmentIndex = segIndex;
          }
        }
      } else if (this.wordTimings.length === wordCount) {
        index = this.wordTimings.findIndex((t, i, arr) => {
          return adjustedTime >= t && (i === arr.length - 1 || adjustedTime < arr[i + 1]);
        });
      } else {
        index = Math.min(wordCount - 1, Math.floor(adjustedTime / duration * wordCount));
      }
      if (index === this._lastHighlightIndex) return;
      this._lastHighlightIndex = index;
      const targetIndex = this.getHighlightDisplayIndex(ayah, index, wordCount);
      if (targetIndex == null) {
        this.clearActiveWordHighlight();
        return;
      }
      const displayCount = this.getAyahDisplayWords(ayah).length;
      const clamped = Math.min(displayCount - 1, Math.max(0, targetIndex));
      this.applyWordHighlight(clamped);
    },
    clearActiveWordHighlight() {
      if (Array.isArray(this._lastHighlightEls)) {
        this._lastHighlightEls.forEach(el => el.classList.remove("highlighted-word"));
      }
      this._lastHighlightEls = [];
    },
    applyWordHighlight(wordIndex) {
      const idx = typeof this.currentAudioIndex === "number" && this.currentAudioIndex >= 0 ? this.currentAudioIndex : this.currentlyPlayingIndex;
      const card = document.getElementById(`ayah-card-${idx}`);
      if (!card) return;
      this.clearActiveWordHighlight();
      const matches = Array.from(card.querySelectorAll(`.arabic-text [data-word-index="${wordIndex}"]`));
      if (!matches.length) return;
      matches.forEach(el => el.classList.add("highlighted-word"));
      this._lastHighlightEls = matches;
    },
    escapeHtml(value) {
      return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },
    formatTajweedText(value) {
      if (!value) return "";
      let output = "";
      let i = 0;
      const stack = [];
      while (i < value.length) {
        if (value[i] === "[") {
          const marker = value.slice(i).match(/^\[([a-z]+)(?::\d+)?\[/);
          if (marker) {
            output += `<span class="tajweed tajweed-${marker[1]}">`;
            stack.push(marker[1]);
            i += marker[0].length;
            continue;
          }
          const closeIndex = value.indexOf("]", i + 1);
          if (closeIndex !== -1) {
            const inner = value.slice(i + 1, closeIndex);
            output += this.escapeHtml(inner);
            i = closeIndex + 1;
            continue;
          }
        }
        if (value[i] === "]") {
          if (stack.length) {
            output += "</span>";
            stack.pop();
          }
          i += 1;
          continue;
        }
        output += this.escapeHtml(value[i]);
        i += 1;
      }
      while (stack.length) {
        output += "</span>";
        stack.pop();
      }
      return output;
    },
    // removed bulk initialization and preloading for performance
    playAudio: function (index) {
      console.log("Attempting to play audio for index:", index);
      if (index < 0 || index >= this.filteredAyahs.length) return;
      this._lastHighlightIndex = -1;
      this._lastSegmentIndex = -1;
      this.clearActiveWordHighlight();

      // Defer showing loading spinner to avoid flicker; only show if slow (>200ms)
      clearTimeout(this.loadingTimers[index]);
      this.loadingTimers[index] = setTimeout(() => {
        this.$set ? this.$set(this.isAudioLoading, index, true) : this.isAudioLoading[index] = true;
      }, 200);

      // Stop any currently playing audio and ensure exclusivity
      if (this.currentlyPlaying && this.currentlyPlaying !== this.audioElements[index]) {
        console.log("Pausing currently playing audio");
        try {
          this.currentlyPlaying.pause();
        } catch (_) {}
        try {
          this.currentlyPlaying.currentTime = 0;
        } catch (_) {}
      }
      // Pause any stray audios just in case
      if (Array.isArray(this.audioElements)) {
        this.audioElements.forEach((a, i) => {
          if (a && i !== index) {
            try {
              a.pause();
            } catch (_) {}
          }
        });
      }

      // Build or update audio element on-demand
      const ayah = this.filteredAyahs[index];
      let audio = this.audioElements[index];
      if (!audio) {
        audio = new Audio();
        audio.preload = "auto";
        this.audioElements[index] = audio;
      }
      audio.onended = () => this.handleAyahEnd(index);
      audio.onerror = e => {
        var _this$$toast2;
        console.error(`Audio error for ayah ${index + 1}:`, e);
        clearTimeout(this.loadingTimers[index]);
        this.isAudioLoading[index] = false;
        this.isAudioPlaying[index] = false;
        (_this$$toast2 = this.$toast) === null || _this$$toast2 === void 0 || _this$$toast2.error(`Failed to load audio for ayah ${index + 1}`);
      };
      if (audio.src !== ayah.audio) {
        try {
          audio.pause();
        } catch (_) {}
        audio.src = ayah.audio || "";
      }
      audio.playbackRate = this.playbackSpeed;
      audio.volume = this.volume;

      // Update playing states
      this.isAudioPlaying = this.isAudioPlaying.map((_, i) => i === index);
      this.currentlyPlaying = audio;
      this.currentlyPlayingIndex = index;
      this.currentAudioIndex = index;
      this.isHighlighted = true;

      // Setup metadata and word timing
      audio.onloadedmetadata = () => {
        console.log(`Metadata loaded for ayah ${index + 1}, duration: ${this.currentlyPlaying.duration}`);
        this.updateWordTimings(ayah, this.currentlyPlaying.duration);
      };
      audio.ontimeupdate = () => {
        const now = window.performance ? performance.now() : Date.now();
        if (now - this.lastProgressAt > 100) {
          // ~10fps progress updates
          this.lastProgressAt = now;
          this.updateProgress(index);
        }
        // Removed continuous auto-scroll here to prevent jumpiness.
      };

      // Optimistic immediate play, fallback to 'canplay' (faster than 'canplaythrough')
      const markPlaying = () => {
        clearTimeout(this.loadingTimers[index]);
        this.isAudioPlaying[index] = true;
        this.isAudioLoading[index] = false;
        this.isHighlighted = true;
        this.showAudioPlayer = true;
        if (this.showRealtimeHighlighting) {
          this.startHighlightLoop();
        } else {
          this.stopHighlightLoop();
        }
        this.animateVisualizer();
        // Opportunistically warm next ayah
        this.prepareNextAudio(index + 1);
      };
      const tryPlay = () => {
        const p = audio.play();
        if (p && typeof p.then === "function") {
          p.then(() => {
            markPlaying();
          }).catch(err => {
            // If playback fails (e.g., not enough data), wait for 'canplay' and retry once
            const onCanPlay = () => {
              audio.removeEventListener("canplay", onCanPlay);
              const p2 = audio.play();
              if (p2 && typeof p2.then === "function") {
                p2.then(() => markPlaying()).catch(() => {});
              } else {
                markPlaying();
              }
            };
            audio.addEventListener("canplay", onCanPlay, {
              once: true
            });
          });
        } else {
          markPlaying();
        }
      };
      tryPlay();
    },
    pauseAudio: function (index) {
      if (this.audioElements[index]) {
        console.log(`Pausing audio for ayah ${index + 1}`);
        this.audioElements[index].pause();
        clearTimeout(this.loadingTimers[index]);
        this.isAudioPlaying[index] = false;
        this.isAudioLoading[index] = false;
        this.stopHighlightLoop();
      }
    },
    toggleAudioPlayer: function (index) {
      console.log("Toggling audio player for index:", index);
      if (!this.isAudioPlaying[index]) {
        this.playAudio(index);
      } else {
        this.pauseAudio(index);
      }
    },
    stopAudio: function (index) {
      if (this.audioElements[index]) {
        console.log(`Stopping audio for ayah ${index + 1}`);
        this.audioElements[index].pause();
        this.audioElements[index].currentTime = 0;
        clearTimeout(this.loadingTimers[index]);
        this.isAudioPlaying[index] = false;
        this.isAudioLoading[index] = false;
        this.progress[index] = 0;
        this.isHighlighted = false;
        this.currentAudioIndex = -1;
        this.stopHighlightLoop();
      }
    },
    rewindAudio: function (index) {
      if (this.audioElements[index]) {
        console.log(`Rewinding audio for ayah ${index + 1}`);
        this.audioElements[index].currentTime = Math.max(0, this.audioElements[index].currentTime - 15);
        // removed auto-scroll on rewind
      }
    },
    fastForwardAudio: function (index) {
      if (this.audioElements[index]) {
        console.log(`Fast forwarding audio for ayah ${index + 1}`);
        this.audioElements[index].currentTime = Math.min(this.audioElements[index].duration, this.audioElements[index].currentTime + 20);
        // removed auto-scroll on fast-forward
      }
    },
    // Prepare next audio element to reduce start latency on next ayah
    prepareNextAudio(nextIndex) {
      if (nextIndex == null || nextIndex >= this.filteredAyahs.length) return;
      const nextAyah = this.filteredAyahs[nextIndex];
      if (!nextAyah || !nextAyah.audio) return;
      let a = this.audioElements[nextIndex];
      if (!a) {
        a = new Audio();
        a.preload = "metadata";
        this.audioElements[nextIndex] = a;
      }
      if (a.src !== nextAyah.audio) {
        try {
          a.pause();
        } catch (_) {}
        a.src = nextAyah.audio;
        try {
          a.load();
        } catch (_) {}
      }
      a.volume = this.volume;
      a.playbackRate = this.playbackSpeed;
    },
    updateProgress: function (index) {
      if (this.audioElements[index] && this.audioElements[index].duration) {
        const progress = this.audioElements[index].currentTime / this.audioElements[index].duration * 100;
        this.progress[index] = Math.min(100, progress);
      }
    },
    formatTime: function (seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return (minutes < 10 ? "0" : "") + minutes + ":" + (secs < 10 ? "0" : "") + secs;
    },
    highlightText(text) {
      if (!this.debouncedQuery.trim()) return text;
      let highlightedText = text;
      const escapeRegExp = string => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      };
      const searchTerms = this.debouncedQuery.trim() ? this.debouncedQuery.trim().split(/\s+/) : [];
      searchTerms.forEach(term => {
        const regex = new RegExp(`(${escapeRegExp(term)})`, "gi");
        highlightedText = highlightedText.replace(regex, '<span class="highlight-search">$1</span>');
      });
      return highlightedText;
    },
    toggleVisibility: function () {
      this.isVisible = !this.isVisible;
    },
    increaseFontSize: function () {
      if (this.arabicFontSize < 40) this.arabicFontSize += 2;
      if (this.translationFontSize < 30) this.translationFontSize += 2;
    },
    decreaseFontSize: function () {
      if (this.arabicFontSize > 16) this.arabicFontSize -= 2;
      if (this.translationFontSize > 12) this.translationFontSize -= 2;
    },
    getTranslationVisibilityKey(item) {
      var _this$surahDetails17;
      if (!item || !item.ayah) return "";
      return this.buildAyahKey((_this$surahDetails17 = this.surahDetails) === null || _this$surahDetails17 === void 0 ? void 0 : _this$surahDetails17.surahNumber, item.ayah.numberInSurah || item.ayah.number);
    },
    isTranslationVisibleFor(item) {
      const key = this.getTranslationVisibilityKey(item);
      if (!key) return true;
      const value = this.translationVisibility[key];
      if (value === undefined) return this.isTranslationVisible;
      return !!value;
    },
    setTranslationVisibleFor(item, value) {
      const key = this.getTranslationVisibilityKey(item);
      if (!key) return;
      if (typeof this.$set === "function") {
        this.$set(this.translationVisibility, key, !!value);
      } else {
        this.translationVisibility[key] = !!value;
      }
      this.itemHeightCalibrated = false;
      this.$nextTick(() => this.scheduleHeightCalibration(true));
    },
    onTranslationToggle(item, event) {
      const checked = !!event.target.checked;
      this.setTranslationVisibleFor(item, checked);
    },
    shareOnWhatsApp: function (ayah) {
      const message = this.buildAyahMessage(ayah, {
        includeAudio: true
      });
      if (!message) return;
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = "https://api.whatsapp.com/send?text=" + encodedMessage;
      window.open(whatsappLink, "_blank", "noopener,noreferrer");
    },
    getFlagFromLanguage: function (lang) {
      const languageFlags = {
        en: "🇬🇧",
        ar: "🇸🇦",
        fr: "🇫🇷",
        es: "🇪🇸",
        ur: "🇵🇰",
        tr: "🇹🇷",
        id: "🇮🇩",
        bn: "🇧🇩",
        fa: "🇮🇷",
        ru: "🇷🇺",
        de: "🇩🇪",
        it: "🇮🇹",
        sw: "🇹🇿",
        zh: "🇨🇳",
        hi: "🇮🇳"
      };
      return languageFlags[lang.toLowerCase()] || "🌐";
    },
    fetchSurahs: async function () {
      this.isLoading = true;
      try {
        const {
          data,
          fromCache
        } = await this.cachedFetchJSON("https://api.alquran.cloud/v1/surah", "cache:surahs");
        if (!this._isDestroyed) this.surahs = data.data || [];
        this.isLoading = false;
        // Revalidate in background if served from cache
        if (fromCache) setTimeout(() => this.cachedFetchJSON("https://api.alquran.cloud/v1/surah", "cache:surahs").then(({
          data
        }) => {
          if (!this._isDestroyed) this.surahs = data.data || [];
        }), 0);
      } catch (error) {
        console.error("Error fetching Surahs:", error);
        this.isLoading = false;
      }
    },
    async fetchReciters() {
      this.isLoading = true;
      try {
        const {
          data,
          fromCache
        } = await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/format/audio", "cache:reciters");
        if (!this._isDestroyed) {
          this.reciters = data.data.filter(reciter => reciter.identifier && reciter.englishName).map(reciter => ({
            identifier: reciter.identifier,
            englishName: reciter.englishName || "Unknown Reciter"
          })).filter(reciter => !["elmir kuliev 2 by 1muslimapp", "elmir kuliev by 1muslimapp", "elmir kuliev elevatemuslim", "elmir kuliev 1muslim", "elmir kuliev 2muslim", "chinese", "ibrahim walk", "fooladvand - hedayatfar", "shamshad ali khan", "youssouf leclerc"].includes(reciter.englishName.toLowerCase()));
        }
        this.isLoading = false;
        if (fromCache) setTimeout(async () => {
          try {
            const fresh = await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/format/audio", "cache:reciters");
            if (!this._isDestroyed) this.reciters = fresh.data.data.filter(r => r.identifier && r.englishName).map(r => ({
              identifier: r.identifier,
              englishName: r.englishName || "Unknown Reciter"
            })).filter(r => !["elmir kuliev 2 by 1muslimapp", "elmir kuliev by 1muslimapp", "elmir kuliev elevatemuslim", "elmir kuliev 1muslim", "elmir kuliev 2muslim", "chinese", "ibrahim walk", "fooladvand - hedayatfar", "shamshad ali khan", "youssouf leclerc"].includes(r.englishName.toLowerCase()));
          } catch (_) {}
        }, 0);
      } catch (error) {
        console.error("Error fetching Reciters:", error);
        this.isLoading = false;
      }
    },
    async fetchTranslations() {
      this.isLoading = true;
      try {
        const {
          data,
          fromCache
        } = await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/type/translation", "cache:translations");
        if (this._isDestroyed) return;
        if (!data.data) {
          console.error("No translation data received from API");
          this.translations = [];
          this.isLoading = false;
          return;
        }
        const translations = data.data.map(translation => ({
          identifier: translation.identifier,
          englishName: translation.englishName || "Unknown Translation",
          language: translation.language || "Unknown",
          flag: this.getFlagFromLanguage(translation.language || "Unknown")
        })).filter(translation => translation.flag !== "🌐");
        translations.sort((a, b) => {
          if (a.flag < b.flag) return -1;
          if (a.flag > b.flag) return 1;
          if (a.englishName < b.englishName) return -1;
          if (a.englishName > b.englishName) return 1;
          return 0;
        });
        this.translations = translations;
        console.log("Translations fetched:", translations);
        this.isLoading = false;
        if (fromCache) setTimeout(async () => {
          try {
            const fresh = await this.cachedFetchJSON("https://api.alquran.cloud/v1/edition/type/translation", "cache:translations");
            if (this._isDestroyed) return;
            const trs = fresh.data.data.map(t => ({
              identifier: t.identifier,
              englishName: t.englishName || "Unknown Translation",
              language: t.language || "Unknown",
              flag: this.getFlagFromLanguage(t.language || "Unknown")
            })).filter(t => t.flag !== "🌐");
            trs.sort((a, b) => a.flag < b.flag ? -1 : a.flag > b.flag ? 1 : a.englishName < b.englishName ? -1 : a.englishName > b.englishName ? 1 : 0);
            this.translations = trs;
          } catch (_) {}
        }, 0);
      } catch (error) {
        var _this$$toast3;
        console.error("Error fetching Translations:", error);
        this.translations = [];
        (_this$$toast3 = this.$toast) === null || _this$$toast3 === void 0 || _this$$toast3.error("Failed to load translations");
        this.isLoading = false;
      }
    },
    fetchSurahDetails: function () {
      if (!this.selectedSurah || !this.selectedReciter || !this.selectedTranslation) return Promise.resolve();
      this.isLoading = true;
      const cacheKey = `cache:surah:${this.selectedSurah}:${this.selectedReciter}:${this.selectedTranslation}:tajweed`;

      // Serve from cache immediately if available
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const obj = JSON.parse(cached);
          if (obj && obj.ts) {
            const data = obj.data;
            const editions = Array.isArray(data === null || data === void 0 ? void 0 : data.data) ? data.data : [];
            const arabicText = editions.find(item => {
              var _item$edition;
              return (item === null || item === void 0 || (_item$edition = item.edition) === null || _item$edition === void 0 ? void 0 : _item$edition.identifier) === this.selectedReciter;
            }) || editions[0];
            const translation = editions.find(item => {
              var _item$edition2;
              return (item === null || item === void 0 || (_item$edition2 = item.edition) === null || _item$edition2 === void 0 ? void 0 : _item$edition2.identifier) === this.selectedTranslation;
            }) || editions[1];
            const tajweed = editions.find(item => {
              var _item$edition3;
              return (item === null || item === void 0 || (_item$edition3 = item.edition) === null || _item$edition3 === void 0 ? void 0 : _item$edition3.identifier) === "quran-tajweed";
            });
            this.surahDetails = {
              surahNumber: this.selectedSurah,
              englishName: arabicText === null || arabicText === void 0 ? void 0 : arabicText.englishName,
              name: arabicText === null || arabicText === void 0 ? void 0 : arabicText.name,
              ayahs: ((arabicText === null || arabicText === void 0 ? void 0 : arabicText.ayahs) || []).map((ayah, index) => {
                var _tajweed$ayahs, _translation$ayahs;
                const tajweedText = (tajweed === null || tajweed === void 0 || (_tajweed$ayahs = tajweed.ayahs) === null || _tajweed$ayahs === void 0 || (_tajweed$ayahs = _tajweed$ayahs[index]) === null || _tajweed$ayahs === void 0 ? void 0 : _tajweed$ayahs.text) || "";
                const text = ayah.text || "";
                const transText = translation !== null && translation !== void 0 && (_translation$ayahs = translation.ayahs) !== null && _translation$ayahs !== void 0 && (_translation$ayahs = _translation$ayahs[index]) !== null && _translation$ayahs !== void 0 && _translation$ayahs.text ? translation.ayahs[index].text : "Translation not available";
                const words = text ? text.split(" ") : [];
                const tajweedWords = tajweedText ? tajweedText.split(" ") : [];
                return {
                  number: ayah.numberInSurah || ayah.number,
                  numberInSurah: ayah.numberInSurah,
                  globalNumber: ayah.number,
                  text,
                  lowerText: text.toLowerCase(),
                  translation: transText,
                  lowerTranslation: transText.toLowerCase(),
                  juz: ayah.juz,
                  hizb: ayah.hizb,
                  hizbQuarter: ayah.hizbQuarter,
                  page: ayah.page,
                  audio: ayah.audio || "",
                  words,
                  tajweedText,
                  tajweedWords,
                  quranWords: [],
                  wordTranslations: []
                };
              })
            };
            this.isLoading = false;
            this.enrichSurahWithQuranSegments().finally(() => {
              // Pre-warm current and next from cache path as well
              this.$nextTick(() => {
                this.prepareNextAudio(0);
                this.prepareNextAudio(1);
              });
            });
          }
        }
      } catch (_) {}

      // Abort any in-flight request
      try {
        if (this._surahAborter) this._surahAborter.abort();
      } catch (_) {}
      this._surahAborter = new AbortController();
      const {
        signal
      } = this._surahAborter;
      return fetch(`https://api.alquran.cloud/v1/surah/${this.selectedSurah}/editions/${this.selectedReciter},${this.selectedTranslation},quran-tajweed`, {
        signal
      }).then(response => {
        if (!response.ok) throw new Error(`Failed to fetch Surah details: ${response.status}`);
        return response.json();
      }).then(data => {
        if (this._isDestroyed) return;
        // persist cache
        try {
          localStorage.setItem(cacheKey, JSON.stringify({
            ts: Date.now(),
            data
          }));
        } catch (_) {}
        const editions = Array.isArray(data === null || data === void 0 ? void 0 : data.data) ? data.data : [];
        const arabicText = editions.find(item => {
          var _item$edition4;
          return (item === null || item === void 0 || (_item$edition4 = item.edition) === null || _item$edition4 === void 0 ? void 0 : _item$edition4.identifier) === this.selectedReciter;
        }) || editions[0];
        const translation = editions.find(item => {
          var _item$edition5;
          return (item === null || item === void 0 || (_item$edition5 = item.edition) === null || _item$edition5 === void 0 ? void 0 : _item$edition5.identifier) === this.selectedTranslation;
        }) || editions[1];
        const tajweed = editions.find(item => {
          var _item$edition6;
          return (item === null || item === void 0 || (_item$edition6 = item.edition) === null || _item$edition6 === void 0 ? void 0 : _item$edition6.identifier) === "quran-tajweed";
        });
        this.surahDetails = {
          surahNumber: this.selectedSurah,
          englishName: arabicText === null || arabicText === void 0 ? void 0 : arabicText.englishName,
          name: arabicText === null || arabicText === void 0 ? void 0 : arabicText.name,
          ayahs: ((arabicText === null || arabicText === void 0 ? void 0 : arabicText.ayahs) || []).map((ayah, index) => {
            var _tajweed$ayahs2, _translation$ayahs2;
            const tajweedText = (tajweed === null || tajweed === void 0 || (_tajweed$ayahs2 = tajweed.ayahs) === null || _tajweed$ayahs2 === void 0 || (_tajweed$ayahs2 = _tajweed$ayahs2[index]) === null || _tajweed$ayahs2 === void 0 ? void 0 : _tajweed$ayahs2.text) || "";
            const text = ayah.text || "";
            const transText = translation !== null && translation !== void 0 && (_translation$ayahs2 = translation.ayahs) !== null && _translation$ayahs2 !== void 0 && (_translation$ayahs2 = _translation$ayahs2[index]) !== null && _translation$ayahs2 !== void 0 && _translation$ayahs2.text ? translation.ayahs[index].text : "Translation not available";
            const words = text ? text.split(" ") : [];
            const tajweedWords = tajweedText ? tajweedText.split(" ") : [];
            return {
              number: ayah.numberInSurah || ayah.number,
              numberInSurah: ayah.numberInSurah,
              globalNumber: ayah.number,
              text,
              lowerText: text.toLowerCase(),
              translation: transText,
              lowerTranslation: transText.toLowerCase(),
              juz: ayah.juz,
              hizb: ayah.hizb,
              hizbQuarter: ayah.hizbQuarter,
              page: ayah.page,
              audio: ayah.audio || "",
              words,
              tajweedText,
              tajweedWords,
              quranWords: [],
              wordTranslations: []
            };
          })
        };
        console.log("Surah details fetched:", this.surahDetails);
        this.isLoading = false;
        this.enrichSurahWithQuranSegments().finally(() => {
          // Pre-warm the first and next ayah for instant playback
          this.$nextTick(() => {
            this.prepareNextAudio(0);
            this.prepareNextAudio(1);
          });
        });
      }).catch(error => {
        if ((error === null || error === void 0 ? void 0 : error.name) === "AbortError") return; // expected on change
        console.error("Error fetching Surah details:", error);
        this.isLoading = false;
      });
    },
    resetAllAudioPlayers: function () {
      this.$nextTick(() => {
        if (this.currentlyPlaying) {
          this.currentlyPlaying.pause();
          this.currentlyPlaying = null;
          this.currentlyPlayingIndex = 0;
          this.currentAudioIndex = -1;
        }
        // Clear references; recreate on-demand for speed
        if (this.audioElements && this.audioElements.forEach) {
          this.audioElements.forEach(audio => {
            try {
              if (audio && audio.pause) audio.pause();
            } catch (_) {}
          });
        }
        this.audioElements = new Array(this.filteredAyahs.length).fill(null);
        this.isAudioPlaying = new Array(this.filteredAyahs.length).fill(false);
        this.isAudioLoading = new Array(this.filteredAyahs.length).fill(false);
        this.progress = new Array(this.filteredAyahs.length).fill(0);
      });
    },
    savePreference: function (key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    handleAyahEnd: function (index) {
      this.stopAudio(index);
      if (this.playbackMode === "repeat") {
        this.playAudio(index);
        return;
      }
      if (this.playbackMode === "continuous") {
        const nextIndex = index + 1;
        if (nextIndex < this.filteredAyahs.length) {
          setTimeout(() => this.playAudio(nextIndex), 50);
          return;
        }
      }
      this.showAudioPlayer = false;
      this.currentlyPlayingIndex = -1;
    },
    // playNextAyah: function () {
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
    playNextAyah(currentIndex) {
      if (currentIndex + 1 < this.filteredAyahs.length) {
        this.stopAudio(currentIndex);
        this.toggleAudioPlayer(currentIndex + 1); // Play next ayah
      } else {
        // End of surah: do not auto-stop if continuousPlaybackLoop is desired.
        // Default: stop at the end of the surah.
        this.stopAudio(currentIndex);
        this.showAudioPlayer = false;
        this.currentlyPlayingIndex = -1;
      }
    },
    playPrevAyah(currentIndex) {
      const prev = Math.max(0, currentIndex - 1);
      if (this.filteredAyahs.length > 0 && this.audioElements[prev]) {
        if (currentIndex !== prev) this.stopAudio(currentIndex);
        this.toggleAudioPlayer(prev);
      }
    },
    playSurahContinuously() {
      if (!this.canPlaySurah) return;
      this.setPlaybackMode("continuous");
      this.continuousPlayback = true;
      this.savePreference("continuousPlayback", true);
      const startIndex = 0;
      if (typeof this.currentlyPlayingIndex === "number" && this.currentlyPlayingIndex >= 0 && this.currentlyPlayingIndex < this.filteredAyahs.length) {
        this.stopAudio(this.currentlyPlayingIndex);
      }
      this.currentlyPlayingIndex = startIndex;
      this.selectCard(startIndex);
      this.playAudio(startIndex);
    },
    setActiveSidebarTab(tab) {
      this.activeSidebarTab = tab;
      this.sidebarSearchQuery = "";
    },
    async selectJuz(juzNumber) {
      this.isNavigating = true;
      this.lastManualNavigationAt = Date.now();
      this.selectedJuz = juzNumber;
      const start = (0,_utils_quran_mappings__WEBPACK_IMPORTED_MODULE_1__.getJuzStart)(juzNumber);
      if (start) {
        // Ensure surah is loaded first (selectSurah returns a promise)
        await this.selectSurah(start.surah, {
          skipScroll: true
        });
        // No search clearing needed here as we are jumping to a specific Juz start
        this.selectCard(start.ayah - 1);
        this.scrollToAyahIndex(start.ayah - 1, {
          settle: true,
          force: true,
          behavior: "smooth",
          lock: true
        });
      }
    },
    async selectPage(pageNumber) {
      this.isNavigating = true;
      this.lastManualNavigationAt = Date.now();
      const start = (0,_utils_quran_mappings__WEBPACK_IMPORTED_MODULE_1__.getPageStart)(pageNumber);
      if (start) {
        // Ensure surah is loaded first (selectSurah returns a promise)
        await this.selectSurah(start.surah, {
          skipScroll: true
        });
        this.selectCard(start.ayah - 1);
        this.scrollToAyahIndex(start.ayah - 1, {
          settle: true,
          force: true,
          behavior: "smooth",
          lock: true
        });
      } else {
        console.log("Page navigation mapping incomplete");
        this.isNavigating = false;
      }
    },
    selectVerseFromSidebar(verseIndex) {
      this.isNavigating = true;
      this.lastManualNavigationAt = Date.now();
      // Clear main view search to ensure verse is visible
      this.searchQuery = "";
      this.debouncedQuery = "";
      this.selectCard(verseIndex - 1);
      const runScroll = () => {
        this.$nextTick(() => {
          this.scrollToAyahIndex(verseIndex - 1, {
            settle: true,
            force: true,
            behavior: "smooth",
            lock: true
          });
        });
      };
      if (this.isMobile && !this.sidebarCollapsed) {
        this.toggleSidebar();
        this.$nextTick(runScroll);
      } else {
        runScroll();
      }
    },
    scrollToAyah(index) {
      this.scrollToAyahIndex(index);
    },
    scrollToSection(id) {
      this.$nextTick(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-offset")) || 72;
        const targetTop = Math.max(el.getBoundingClientRect().top + window.scrollY - navHeight - 12, 0);
        window.scrollTo({
          top: targetTop,
          behavior: "smooth"
        });
      });
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    selectSurah(number, options = {}) {
      return new Promise((resolve, reject) => {
        const {
          skipScroll = false
        } = options;
        if (String(this.selectedSurah) === String(number) && !this.isLoading) {
          resolve();
          return;
        }

        // Set loading true to bypass watcher
        this.isLoading = true;
        this.selectedSurah = String(number);
        this.savePreference("selectedSurah", this.selectedSurah);

        // Reset state
        this.currentlyPlayingIndex = 0;
        this.isHighlighted = false;
        if (!skipScroll) {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
        this.fetchSurahDetails().then(() => {
          this.resetAllAudioPlayers();
          this.isLoading = false;
          this.syncVirtualWindowAfterSelection();
          resolve();
        }).catch(error => {
          this.isLoading = false;
          reject(error);
        });
      });
    },
    selectReciter(identifier) {
      this.selectedReciter = identifier;
    },
    selectTranslation(identifier) {
      this.selectedTranslation = identifier;
    },
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
    toggleHeader() {
      this.headerCollapsed = !this.headerCollapsed;
      // Recalculate list top after header height change
      this.$nextTick(() => {
        this.computeListTop();
      });
    },
    syncPlaybackScroll(index) {
      // If user is manually scrolling or we are in the middle of a nav jump, 
      // don't force a "snap-back" scroll.
      if (this.isManualScrolling || this.isNavigating) return;
      if (this.isAutoSyncLocked()) return;
      const manualNavCooldown = 800;
      if (Date.now() - this.lastManualNavigationAt < manualNavCooldown) return;
      const now = window.performance ? performance.now() : Date.now();
      if (now - this.lastAutoScrollAt < 400) return;
      this.lastAutoScrollAt = now;
      this.scrollToAyahIndex(index);
    },
    onAyahScrubInput(event) {
      var _event$target;
      const raw = Number(((_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value) || 1);
      this.ayahScrubValue = Math.min(Math.max(1, raw), Math.max(this.totalItems, 1));
    },
    onAyahScrubChange(event) {
      var _event$target2;
      this.isNavigating = true;
      this.lastManualNavigationAt = Date.now();
      const raw = Number(((_event$target2 = event.target) === null || _event$target2 === void 0 ? void 0 : _event$target2.value) || 1);
      const targetIndex = Math.min(Math.max(0, raw - 1), Math.max(this.totalItems - 1, 0));

      // Clear search filter so the jumped ayah is actually in the DOM
      this.searchQuery = "";
      this.debouncedQuery = "";
      this.$nextTick(() => {
        this.ayahScrubValue = targetIndex + 1;
        this.selectCard(targetIndex);
        this.scrollToAyahIndex(targetIndex, {
          settle: true,
          force: true,
          behavior: "smooth",
          lock: true
        });
        this.playAudio(targetIndex);
      });
    },
    toggleVolume: function () {
      this.showVolumeBar = !this.showVolumeBar;
    },
    updateVolume: function () {
      if (this.currentlyPlaying) {
        this.currentlyPlaying.volume = this.volume;
      }
      if (this.audioElements && this.audioElements.forEach) {
        this.audioElements.forEach(audio => {
          if (audio) audio.volume = this.volume;
        });
      }
    },
    closeAudioPlayer: function () {
      if (this.currentlyPlayingIndex !== null) {
        this.stopAudio(this.currentlyPlayingIndex);
      }
      this.showAudioPlayer = false;
      this.currentlyPlayingIndex = 0;
      this.currentlyPlaying = null;
      this.currentAudioIndex = -1;
      this.isHighlighted = false;
    },
    seekToPosition: function (event) {
      const audio = this.audioElements[this.currentlyPlayingIndex];
      if (!audio || !audio.duration) return;
      const progressBar = this.$refs.progressBar;
      if (!progressBar) return;
      const rect = progressBar.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = percentage * audio.duration;
      audio.currentTime = Math.max(0, Math.min(newTime, audio.duration));

      // Update progress immediately
      this.updateProgress(this.currentlyPlayingIndex);
      console.log(`Seeking to ${newTime.toFixed(2)}s (${(percentage * 100).toFixed(1)}%)`);
    },
    onProgressDown(e) {
      var _e$touches$;
      if (!this.$refs.progressBar) return;
      const isTouch = e.type === "touchstart";
      const clientX = isTouch ? e.touches && ((_e$touches$ = e.touches[0]) === null || _e$touches$ === void 0 ? void 0 : _e$touches$.clientX) : e.clientX;
      this.isScrubbing = true;
      // bind listeners once
      this._boundMove = this.onProgressMove;
      this._boundUp = this.onProgressUp;
      window.addEventListener("mousemove", this._boundMove, {
        passive: false
      });
      window.addEventListener("touchmove", this._boundMove, {
        passive: false
      });
      window.addEventListener("mouseup", this._boundUp, {
        passive: true
      });
      window.addEventListener("touchend", this._boundUp, {
        passive: true
      });
      this._updateScrubAt(clientX);
    },
    onProgressMove(e) {
      var _e$touches$2, _e$preventDefault;
      if (!this.isScrubbing) return;
      const isTouch = e.type === "touchmove";
      const clientX = isTouch ? e.touches && ((_e$touches$2 = e.touches[0]) === null || _e$touches$2 === void 0 ? void 0 : _e$touches$2.clientX) : e.clientX;
      if (clientX == null) return;
      (_e$preventDefault = e.preventDefault) === null || _e$preventDefault === void 0 || _e$preventDefault.call(e);
      this._updateScrubAt(clientX);
    },
    onProgressUp() {
      this.isScrubbing = false;
      window.removeEventListener("mousemove", this._boundMove);
      window.removeEventListener("touchmove", this._boundMove);
      window.removeEventListener("mouseup", this._boundUp);
      window.removeEventListener("touchend", this._boundUp);
      this._boundMove = null;
      this._boundUp = null;
    },
    _updateScrubAt(clientX) {
      const audio = this.audioElements[this.currentlyPlayingIndex];
      if (!audio || !audio.duration) return;
      const bar = this.$refs.progressBar;
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const pct = rect.width > 0 ? x / rect.width : 0;
      const newTime = pct * audio.duration;
      audio.currentTime = Math.max(0, Math.min(newTime, audio.duration));
      this.updateProgress(this.currentlyPlayingIndex);
    },
    cyclePlaybackSpeed: function () {
      this.currentSpeedIndex = (this.currentSpeedIndex + 1) % this.playbackSpeeds.length;
      this.playbackSpeed = this.playbackSpeeds[this.currentSpeedIndex];

      // Update all audio elements
      if (this.audioElements && this.audioElements.forEach) {
        this.audioElements.forEach(audio => {
          if (audio) audio.playbackRate = this.playbackSpeed;
        });
      }
      this.savePreference("playbackSpeed", this.playbackSpeed);
      console.log(`Playback speed set to ${this.playbackSpeed}x`);
    },
    animateVisualizer: function () {
      if (!this.isAudioPlaying[this.currentlyPlayingIndex]) return;
      const now = window.performance ? performance.now() : Date.now();
      if (now - this.lastVizAt < 33) {
        // ~30fps cap
        return requestAnimationFrame(() => this.animateVisualizer());
      }
      this.lastVizAt = now;

      // Create animated bars based on audio volume (simulated)
      const audio = this.audioElements[this.currentlyPlayingIndex];
      const volume = audio ? Math.min(audio.volume * 2, 1) : 0.3;
      this.visualizerBars = this.visualizerBars.map(() => Math.random() * 80 * volume + 10);
      requestAnimationFrame(() => this.animateVisualizer());
    },
    setPlaybackMode(mode) {
      const validModes = ["continuous", "repeat", "manual"];
      const normalized = validModes.includes(mode) ? mode : "continuous";
      this.playbackMode = normalized;
      try {
        localStorage.setItem("playbackMode", normalized);
      } catch (_) {}
      if (normalized !== "repeat") {
        this.preferredPlaybackMode = normalized;
        try {
          localStorage.setItem("lastNonRepeatPlaybackMode", normalized);
        } catch (_) {}
      }
    },
    toggleRepeat() {
      if (this.isRepeatMode) {
        this.setPlaybackMode(this.preferredPlaybackMode || "continuous");
      } else {
        this.setPlaybackMode("repeat");
      }
    },
    closeOffcanvas() {
      this.prepareSettingsDraft();
      const el = this.$refs.surahOffcanvas;
      if (!el || !(window && window.bootstrap && window.bootstrap.Offcanvas)) return;
      const instance = window.bootstrap.Offcanvas.getInstance(el) || window.bootstrap.Offcanvas.getOrCreateInstance(el);
      instance.hide();
    }
  }
});

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