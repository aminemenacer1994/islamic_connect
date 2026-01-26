"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_bookmarks_SharedFolderView_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/SharedFolderView.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/SharedFolderView.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************************/
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
  name: "BookmarkModal",
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
        name: "",
        icon: "fas fa-bookmark",
        color: "primary"
      },
      isSaving: false,
      isCreatingFolder: false,
      feedback: "",
      feedbackVariant: "success",
      feedbackTimer: null,
      feedbackDurationMs: 4000,
      closeTimer: null,
      authRedirectTimer: null,
      bootstrapColors: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"],
      folderExpanded: {},
      folderContents: {},
      sectionOpen: {
        folders: true,
        create: false,
        contents: false
      },
      selectedFoldersForDelete: [],
      folderSearch: "",
      pendingDelete: null,
      iconPresets: [{
        icon: "fas fa-bookmark"
      }, {
        icon: "fas fa-star"
      }, {
        icon: "fas fa-heart"
      }, {
        icon: "fas fa-book"
      }, {
        icon: "fas fa-book-open"
      }, {
        icon: "fas fa-leaf"
      }, {
        icon: "fas fa-mosque"
      }, {
        icon: "fas fa-kaaba"
      }]
    };
  },
  computed: {
    feedbackClass() {
      return this.feedbackVariant === "danger" ? "alert-danger" : "alert-success";
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
      if (!this.pendingDelete) return "";
      if (this.pendingDelete.type === "bulk") {
        return `Delete ${this.pendingDelete.count} folder(s)?`;
      }
      return `Delete the "${this.pendingDelete.name}" folder?`;
    },
    feedbackIcon() {
      return this.feedbackVariant === "danger" ? "fas fa-triangle-exclamation" : "fas fa-circle-check";
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
      this.cleanupModalState();
      this.feedback = "";
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
      this.setFeedback("Please log in to save bookmarks. Redirecting…", "danger");
      clearTimeout(this.authRedirectTimer);
      this.authRedirectTimer = setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      return false;
    },
    cleanupModalState() {
      const backdrops = document.querySelectorAll(".modal-backdrop");
      backdrops.forEach(backdrop => {
        var _backdrop$parentNode, _backdrop$parentNode$;
        return (_backdrop$parentNode = backdrop.parentNode) === null || _backdrop$parentNode === void 0 || (_backdrop$parentNode$ = _backdrop$parentNode.removeChild) === null || _backdrop$parentNode$ === void 0 ? void 0 : _backdrop$parentNode$.call(_backdrop$parentNode, backdrop);
      });
      document.body.classList.remove("modal-open");
      document.body.style.removeProperty("padding-right");
    },
    async fetchFolders() {
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/folders");
        this.folders = response.data.data || [];
        this.normalizeSelectedFolders();
      } catch (error) {
        this.setFeedback("Unable to load folders right now.", "danger");
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
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/ayah-bookmarks", {
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
        this.setFeedback("Folder name is required.", "danger");
        return;
      }
      const name = this.newFolder.name.trim();

      // Refresh folders list to get latest state from backend
      await this.fetchFolders();
      const nameKey = name.toLowerCase();
      if (this.folders.some(folder => (folder.name || "").trim().toLowerCase() === nameKey)) {
        this.setFeedback("Folder name already exists. Choose another.", "danger");
        return;
      }
      this.isCreatingFolder = true;
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/folders", {
          name,
          icon: this.newFolder.icon || null,
          color: this.newFolder.color || null
        });
        const folder = response.data.folder;
        if (folder) {
          // Refresh folders list to ensure we have the latest data
          await this.fetchFolders();
          this.selectedFolderIds.push(folder.id);
          this.folderExpanded[folder.id] = true;
          this.folderContents[folder.id] = {
            loading: false,
            items: []
          };
          this.newFolder.name = "";
          this.newFolder.icon = "fas fa-bookmark";
          this.newFolder.color = "primary";
          this.setFeedback("Folder created.", "success");
        }
      } catch (error) {
        var _error$response, _error$response2;
        const apiMessage = ((_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || ((_error$response2 = error.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.errors) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.name) === null || _error$response2 === void 0 ? void 0 : _error$response2[0]);
        this.setFeedback(apiMessage || "Failed to create folder.", "danger");
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
        this.setFeedback("Select an ayah first.", "danger");
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
          surah_name: this.ayah.surah_name || ((_this$ayah$surah = this.ayah.surah) === null || _this$ayah$surah === void 0 ? void 0 : _this$ayah$surah.name_en) || "Surah",
          ayah_verse_ar: this.ayah.ayah_verse_ar || ((_this$ayah$ayah = this.ayah.ayah) === null || _this$ayah$ayah === void 0 ? void 0 : _this$ayah$ayah.ayah_text) || "",
          ayah_verse_en: this.ayah.ayah_verse_en || "",
          folder_ids: selectedIds
        };
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/ayah-bookmarks", payload);
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
        this.setFeedback(detachFailed ? "Bookmark saved, but some folders could not be removed." : "Ayah saved to your bookmarks.", detachFailed ? "danger" : "success", {
          autoClose: !detachFailed
        });
        this.$emit("saved", _objectSpread(_objectSpread({}, payload), {}, {
          bookmark: this.currentBookmark
        }));
      } catch (error) {
        this.setFeedback("Failed to save the bookmark.", "danger");
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
    toggleSection(section) {
      this.sectionOpen = _objectSpread(_objectSpread({}, this.sectionOpen), {}, {
        [section]: !this.sectionOpen[section]
      });
    },
    requestDeleteFolder(folder) {
      if (!folder || folder.is_smart) {
        this.setFeedback("Smart folders cannot be deleted.", "danger");
        return;
      }
      this.pendingDelete = {
        type: "single",
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
        this.setFeedback("Select folders to delete.", "danger");
        return;
      }
      this.pendingDelete = {
        type: "bulk",
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
      const deletingMessage = ids.length === 1 ? "Deleting folder..." : "Deleting folders...";
      this.setFeedback(deletingMessage, "success");
      try {
        // Delete each folder from backend permanently
        const deletePromises = ids.map(async id => {
          try {
            await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/folders/${id}`);
            return {
              id,
              success: true
            };
          } catch (error) {
            console.error(`Failed to delete folder ${id}:`, error);
            return {
              id,
              success: false,
              error
            };
          }
        });
        const results = await Promise.all(deletePromises);
        const successfulDeletes = results.filter(r => r.success).map(r => r.id);
        const failedDeletes = results.filter(r => !r.success);
        if (successfulDeletes.length > 0) {
          // Remove successfully deleted folders from local state
          this.folders = this.folders.filter(folder => !successfulDeletes.includes(folder.id));
          this.selectedFolderIds = this.selectedFolderIds.filter(id => !successfulDeletes.includes(id));
          this.selectedFoldersForDelete = [];

          // Clean up folder state for deleted folders
          successfulDeletes.forEach(id => {
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
        }
        this.pendingDelete = null;

        // Refresh folders list from backend to ensure everything is in sync
        await this.fetchFolders();

        // Show appropriate feedback
        if (failedDeletes.length === 0) {
          const successMessage = successfulDeletes.length === 1 ? "Folder deleted permanently from backend." : `${successfulDeletes.length} folders deleted permanently from backend.`;
          this.setFeedback(successMessage, "success");
        } else if (successfulDeletes.length === 0) {
          this.setFeedback("Failed to delete folders from backend.", "danger");
        } else {
          this.setFeedback(`${successfulDeletes.length} deleted, ${failedDeletes.length} failed.`, "danger");
        }
      } catch (error) {
        var _error$response3;
        const errorMessage = ((_error$response3 = error.response) === null || _error$response3 === void 0 || (_error$response3 = _error$response3.data) === null || _error$response3 === void 0 ? void 0 : _error$response3.message) || "Unable to delete folders from backend.";
        this.setFeedback(errorMessage, "danger");
        this.pendingDelete = null;
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
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/ayah-bookmarks", {
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
        this.setFeedback("Smart folders cannot be edited.", "danger");
        return;
      }
      try {
        var _this$folderContents$2, _this$currentBookmark3;
        if (!confirm("Remove this ayah from the folder?")) {
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
        this.setFeedback("Unable to remove this ayah.", "danger");
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
        this.setFeedback("Smart folders cannot be edited.", "danger");
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
        this.setFeedback("Ayah moved to another folder.", "success");
        if (event !== null && event !== void 0 && event.target) {
          event.target.value = "";
        }
      } catch (error) {
        this.setFeedback("Unable to move this ayah.", "danger");
      }
    },
    selectAllFolders() {
      // Select all non-smart folders
      this.selectedFoldersForDelete = this.folders.filter(folder => !folder.is_smart).map(folder => folder.id);
    },
    unselectAllFolders() {
      this.selectedFoldersForDelete = [];
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/SharedFolderView.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/SharedFolderView.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_bookmarks_SharedFolderView_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_bookmarks_SharedFolderView_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/vue/bookmarks/SharedFolderView.vue */ "./resources/components/vue/bookmarks/SharedFolderView.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/SharedFolderView.vue?vue&type=template&id=07a36e24&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/SharedFolderView.vue?vue&type=template&id=07a36e24&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  class: "row g-3"
};
const _hoisted_15 = {
  class: "col-12 col-md-6"
};
const _hoisted_16 = {
  class: "section-card h-100"
};
const _hoisted_17 = {
  class: "section-header"
};
const _hoisted_18 = {
  class: "section-actions"
};
const _hoisted_19 = {
  class: "section-hint"
};
const _hoisted_20 = ["aria-expanded"];
const _hoisted_21 = {
  key: 1,
  class: "empty-state"
};
const _hoisted_22 = {
  key: 2,
  class: "folder-grid"
};
const _hoisted_23 = ["value", "disabled"];
const _hoisted_24 = {
  class: "pill-icon"
};
const _hoisted_25 = {
  key: 1,
  class: "fas fa-folder"
};
const _hoisted_26 = {
  class: "pill-meta"
};
const _hoisted_27 = {
  class: "pill-title"
};
const _hoisted_28 = {
  class: "pill-count"
};
const _hoisted_29 = {
  class: "col-12 col-md-6"
};
const _hoisted_30 = {
  class: "section-card h-100"
};
const _hoisted_31 = {
  class: "section-header"
};
const _hoisted_32 = {
  class: "section-actions"
};
const _hoisted_33 = ["aria-expanded"];
const _hoisted_34 = {
  class: "row g-2 align-items-end"
};
const _hoisted_35 = {
  class: "col-12"
};
const _hoisted_36 = {
  class: "col-12"
};
const _hoisted_37 = {
  class: "icon-presets"
};
const _hoisted_38 = ["onClick"];
const _hoisted_39 = {
  class: "col-12"
};
const _hoisted_40 = {
  class: "color-swatches"
};
const _hoisted_41 = ["onClick"];
const _hoisted_42 = {
  class: "col-12"
};
const _hoisted_43 = ["disabled"];
const _hoisted_44 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2"
};
const _hoisted_45 = {
  key: 1,
  class: "section-card mt-3"
};
const _hoisted_46 = {
  class: "section-header"
};
const _hoisted_47 = {
  class: "section-actions"
};
const _hoisted_48 = ["aria-expanded"];
const _hoisted_49 = {
  key: 0,
  class: "delete-confirm"
};
const _hoisted_50 = {
  class: "delete-title"
};
const _hoisted_51 = {
  class: "delete-actions"
};
const _hoisted_52 = {
  key: 1,
  class: "empty-state"
};
const _hoisted_53 = {
  key: 2,
  class: "folder-contents"
};
const _hoisted_54 = {
  class: "folder-toggle"
};
const _hoisted_55 = ["onClick"];
const _hoisted_56 = {
  class: "folder-toggle-title"
};
const _hoisted_57 = {
  key: 0,
  class: "folder-badge"
};
const _hoisted_58 = {
  class: "folder-toggle-actions"
};
const _hoisted_59 = {
  class: "folder-toggle-meta"
};
const _hoisted_60 = ["disabled", "onClick"];
const _hoisted_61 = ["onClick"];
const _hoisted_62 = {
  key: 0,
  class: "folder-items"
};
const _hoisted_63 = {
  key: 0,
  class: "text-muted"
};
const _hoisted_64 = {
  key: 1,
  class: "text-muted"
};
const _hoisted_65 = {
  class: "folder-item-header"
};
const _hoisted_66 = {
  class: "folder-item-actions"
};
const _hoisted_67 = {
  class: "input-group input-group-sm move-group"
};
const _hoisted_68 = ["onChange", "disabled"];
const _hoisted_69 = ["value"];
const _hoisted_70 = ["disabled", "onClick"];
const _hoisted_71 = ["innerHTML"];
const _hoisted_72 = {
  key: 0,
  class: "folder-item-en"
};
const _hoisted_73 = {
  class: "modal-footer"
};
const _hoisted_74 = ["disabled"];
const _hoisted_75 = {
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
  }, " Save Ayah ", -1 /* CACHED */)), _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "modal-subtitle"
  }, " Pick a folder or create a new one. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_7, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
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
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.feedback), 1 /* TEXT */)], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-folder-open"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Choose folders"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-desc"
  }, " Select where this ayah will be saved. ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.selectedCount) + " selected", 1 /* TEXT */), $options.selectedCount ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn btn-link btn-clear",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.clearSelection && $options.clearSelection(...args))
  }, " Clear ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn section-toggle",
    onClick: _cache[1] || (_cache[1] = $event => $options.toggleSection('folders')),
    "aria-expanded": $data.sectionOpen.folders
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.sectionOpen.folders ? 'fa-chevron-up' : 'fa-chevron-down'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_20)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [$data.folders.length ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("input", {
    key: 0,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.folderSearch = $event),
    type: "search",
    class: "form-control form-control-sm folder-search",
    placeholder: "Search folders"
  }, null, 512 /* NEED_PATCH */)), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.folderSearch, void 0, {
    trim: true
  }]]) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $options.filteredFolders.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, " No folders yet. Create one below. ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_22, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredFolders, folder => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("label", {
      key: folder.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['folder-pill', folder.color ? `pill-${folder.color}` : 'pill-neutral', {
        'is-selected': $data.selectedFolderIds.includes(folder.id),
        'is-disabled': folder.is_smart
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "checkbox",
      value: folder.id,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.selectedFolderIds = $event),
      disabled: folder.is_smart
    }, null, 8 /* PROPS */, _hoisted_23), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $data.selectedFolderIds]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_24, [folder.icon ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", {
      key: 0,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(folder.icon)
    }, null, 2 /* CLASS */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_25))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.ayah_count) + " ayat", 1 /* TEXT */)]), _cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "pill-check"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check"
    })], -1 /* CACHED */))], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.sectionOpen.folders]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-plus-circle"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Create new folder"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-desc"
  }, " Start a fresh collection for your reflections. ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-hint"
  }, "Add a custom collection", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn section-toggle",
    onClick: _cache[4] || (_cache[4] = $event => $options.toggleSection('create')),
    "aria-expanded": $data.sectionOpen.create
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.sectionOpen.create ? 'fa-chevron-up' : 'fa-chevron-down'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_33)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.newFolder.name = $event),
    type: "text",
    class: "form-control",
    placeholder: "Reflection gems"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.newFolder.name, void 0, {
    trim: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Icon", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.iconPresets, preset => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: preset.icon,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["icon-preset-btn", {
        active: $data.newFolder.icon === preset.icon
      }]),
      onClick: $event => $options.setIcon(preset.icon)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(preset.icon)
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_38);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Color", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.bootstrapColors, color => {
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
    }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_41);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-create",
    disabled: $data.isCreatingFolder,
    onClick: _cache[6] || (_cache[6] = (...args) => $options.createFolder && $options.createFolder(...args))
  }, [$data.isCreatingFolder ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_44)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Create folder ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_43)])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.sectionOpen.create]])])])]), $props.showFolderContents ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-list-check"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Folder contents"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-desc"
  }, " Preview what is inside each folder. ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "section-hint"
  }, "Review or remove saved ayat", -1 /* CACHED */)), $data.selectedFoldersForDelete.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn btn-outline-danger btn-sm",
    onClick: _cache[7] || (_cache[7] = (...args) => $options.requestDeleteSelectedFolders && $options.requestDeleteSelectedFolders(...args))
  }, " Delete selected (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedFoldersForDelete.length) + ") ", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn section-toggle",
    onClick: _cache[8] || (_cache[8] = $event => $options.toggleSection('contents')),
    "aria-expanded": $data.sectionOpen.contents
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.sectionOpen.contents ? 'fa-chevron-up' : 'fa-chevron-down'])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_48)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [$data.pendingDelete ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.pendingDeleteTitle), 1 /* TEXT */), _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "delete-note"
  }, " Ayat in this folder will also be deleted. ", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary btn-sm",
    onClick: _cache[9] || (_cache[9] = (...args) => $options.cancelDelete && $options.cancelDelete(...args))
  }, " Cancel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger btn-sm",
    onClick: _cache[10] || (_cache[10] = (...args) => $options.confirmDelete && $options.confirmDelete(...args))
  }, " Delete ")])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.folders.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_52, " No folders to show yet. ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_53, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.folders, folder => {
    var _$data$folderContents, _$data$folderContents2;
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: `contents-${folder.id}`,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['folder-content', {
        open: $data.folderExpanded[folder.id]
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "folder-toggle-main",
      type: "button",
      onClick: $event => $options.toggleFolderContents(folder)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_56, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "folder-toggle-icon"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-folder"
    })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 1 /* TEXT */)]), folder.is_smart ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_57, "Smart")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 8 /* PROPS */, _hoisted_55), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_59, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.ayah_count) + " ayat", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-sm btn-outline-danger",
      disabled: folder.is_smart,
      onClick: $event => $options.requestDeleteFolder(folder)
    }, [...(_cache[31] || (_cache[31] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-trash me-1"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delete ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_60), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn folder-toggle-button",
      type: "button",
      onClick: $event => $options.toggleFolderContents(folder)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.folderExpanded[folder.id] ? 'fa-chevron-up' : 'fa-chevron-down'])
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_61)])]), $data.folderExpanded[folder.id] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_62, [(_$data$folderContents = $data.folderContents[folder.id]) !== null && _$data$folderContents !== void 0 && _$data$folderContents.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_63, " Loading... ")) : !((_$data$folderContents2 = $data.folderContents[folder.id]) !== null && _$data$folderContents2 !== void 0 && (_$data$folderContents2 = _$data$folderContents2.items) !== null && _$data$folderContents2 !== void 0 && _$data$folderContents2.length) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_64, " No ayat saved in this folder. ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 2
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.folderContents[folder.id].items, item => {
      var _item$ayah, _item$ayah2;
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        class: "folder-item",
        key: item.id
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_65, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.surah_name || "Surah") + " • Ayah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(((_item$ayah = item.ayah) === null || _item$ayah === void 0 ? void 0 : _item$ayah.ayah_id) || item.ayah_number || item.ayah_num), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
        class: "form-select",
        onChange: $event => $options.moveAyahToFolder(item, folder, $event),
        disabled: folder.is_smart
      }, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: "",
        disabled: ""
      }, " Move to... ", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.moveTargetFolders(folder), target => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
          key: target.id,
          value: target.id
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(target.name), 9 /* TEXT, PROPS */, _hoisted_69);
      }), 128 /* KEYED_FRAGMENT */))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_68)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-sm btn-outline-danger",
        disabled: folder.is_smart,
        onClick: $event => $options.removeAyahFromFolder(item, folder)
      }, " Remove ", 8 /* PROPS */, _hoisted_70)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "folder-item-ar",
        innerHTML: item.ayah_verse_ar || ((_item$ayah2 = item.ayah) === null || _item$ayah2 === void 0 ? void 0 : _item$ayah2.ayah_text)
      }, null, 8 /* PROPS */, _hoisted_71), item.ayah_verse_en ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_72, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.ayah_verse_en), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.sectionOpen.contents]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/bookmarks",
    class: "btn btn-manage"
  }, "Open bookmarks", -1 /* CACHED */)), _cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-cancel",
    "data-bs-dismiss": "modal"
  }, " Cancel ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-save",
    disabled: $data.isSaving,
    onClick: _cache[11] || (_cache[11] = (...args) => $options.saveBookmark && $options.saveBookmark(...args))
  }, [$data.isSaving ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_75)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Save bookmark ", -1 /* CACHED */))], 8 /* PROPS */, _hoisted_74)])])])])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/SharedFolderView.vue?vue&type=style&index=0&id=07a36e24&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/SharedFolderView.vue?vue&type=style&index=0&id=07a36e24&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/bookmarks/SharedFolderView.vue":
/*!*****************************************************************!*\
  !*** ./resources/components/vue/bookmarks/SharedFolderView.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SharedFolderView_vue_vue_type_template_id_07a36e24_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SharedFolderView.vue?vue&type=template&id=07a36e24&scoped=true */ "./resources/components/vue/bookmarks/SharedFolderView.vue?vue&type=template&id=07a36e24&scoped=true");
/* harmony import */ var _SharedFolderView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SharedFolderView.vue?vue&type=script&lang=js */ "./resources/components/vue/bookmarks/SharedFolderView.vue?vue&type=script&lang=js");
/* harmony import */ var _SharedFolderView_vue_vue_type_style_index_0_id_07a36e24_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SharedFolderView.vue?vue&type=style&index=0&id=07a36e24&scoped=true&lang=css */ "./resources/components/vue/bookmarks/SharedFolderView.vue?vue&type=style&index=0&id=07a36e24&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_SharedFolderView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_SharedFolderView_vue_vue_type_template_id_07a36e24_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-07a36e24"],['__file',"resources/components/vue/bookmarks/SharedFolderView.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/bookmarks/SharedFolderView.vue?vue&type=script&lang=js":
/*!*****************************************************************************************!*\
  !*** ./resources/components/vue/bookmarks/SharedFolderView.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SharedFolderView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SharedFolderView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SharedFolderView.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/SharedFolderView.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/bookmarks/SharedFolderView.vue?vue&type=style&index=0&id=07a36e24&scoped=true&lang=css":
/*!*************************************************************************************************************************!*\
  !*** ./resources/components/vue/bookmarks/SharedFolderView.vue?vue&type=style&index=0&id=07a36e24&scoped=true&lang=css ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SharedFolderView_vue_vue_type_style_index_0_id_07a36e24_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SharedFolderView.vue?vue&type=style&index=0&id=07a36e24&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/SharedFolderView.vue?vue&type=style&index=0&id=07a36e24&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/bookmarks/SharedFolderView.vue?vue&type=template&id=07a36e24&scoped=true":
/*!***********************************************************************************************************!*\
  !*** ./resources/components/vue/bookmarks/SharedFolderView.vue?vue&type=template&id=07a36e24&scoped=true ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SharedFolderView_vue_vue_type_template_id_07a36e24_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SharedFolderView_vue_vue_type_template_id_07a36e24_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SharedFolderView.vue?vue&type=template&id=07a36e24&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/bookmarks/SharedFolderView.vue?vue&type=template&id=07a36e24&scoped=true");


/***/ }),

/***/ "./resources/js/components/bookmarks/SharedFolderView.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/bookmarks/SharedFolderView.vue ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SharedFolderView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SharedFolderView.vue?vue&type=script&lang=js */ "./resources/js/components/bookmarks/SharedFolderView.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_SharedFolderView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/bookmarks/SharedFolderView.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/bookmarks/SharedFolderView.vue?vue&type=script&lang=js":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/bookmarks/SharedFolderView.vue?vue&type=script&lang=js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SharedFolderView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SharedFolderView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SharedFolderView.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/bookmarks/SharedFolderView.vue?vue&type=script&lang=js");
 

/***/ })

}]);