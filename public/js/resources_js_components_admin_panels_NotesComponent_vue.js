"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_panels_NotesComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vueup_vue_quill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vueup/vue-quill */ "./node_modules/@vueup/vue-quill/dist/vue-quill.esm-bundler.js");
/* harmony import */ var _vueup_vue_quill_dist_vue_quill_snow_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vueup/vue-quill/dist/vue-quill.snow.css */ "./node_modules/@vueup/vue-quill/dist/vue-quill.snow.css");
/* harmony import */ var _utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/bookmarkAuth */ "./resources/js/utils/bookmarkAuth.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Editor: _vueup_vue_quill__WEBPACK_IMPORTED_MODULE_2__.QuillEditor
  },
  data() {
    return {
      notes: [],
      userId: null,
      query: '',
      sortBy: 'newest',
      newNote: '',
      surahFilter: 'all',
      lengthFilter: 'all',
      busy: {},
      viewingNote: null,
      form: {
        id: null,
        surah_name: '',
        ayah_verse_ar: '',
        ayah_verse_en: '',
        ayah_notes: '',
        created_at: '',
        option: '',
        visibility_option: 0
      }
    };
  },
  mounted() {
    this.initializeUser();
    this.cleanupModalBackdrops();
  },
  methods: {
    cleanupModalBackdrops() {
      // Remove any stray modal backdrops on mount
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(b => b.remove());
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    },
    async initializeUser() {
      try {
        const userId = await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_4__.fetchUserIdFromApi)();
        if (userId) {
          this.userId = userId;
          await this.fetchNotes(this.userId);
        } else {
          console.error('User ID not found');
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    },
    openCreateModal() {
      this.newNote = '';
      this.cleanupModalBackdrops();
      this.$nextTick(() => {
        try {
          var _window$bootstrap;
          const el = document.getElementById('createNote');
          if (el && (_window$bootstrap = window.bootstrap) !== null && _window$bootstrap !== void 0 && _window$bootstrap.Modal) {
            const modal = window.bootstrap.Modal.getOrCreateInstance(el);
            modal.show();
          }
        } catch (e) {
          console.error('Error opening modal:', e);
        }
      });
    },
    async createNote() {
      const strippedContent = this.stripHtmlTags(this.newNote || '');
      if (!strippedContent.trim()) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: 'warning',
          title: 'Please enter a note',
          timer: 1200,
          showConfirmButton: false
        });
        return;
      }
      try {
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post('api/submit-note', {
          ayah_notes: this.newNote,
          is_speech_to_text: false
        });
        this.newNote = '';
        this.closeModal('createNote');
        await this.fetchNotes(this.userId);
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: 'success',
          title: 'Note created',
          timer: 1200,
          showConfirmButton: false
        });
      } catch (e) {
        console.error('Create error:', e);
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: 'error',
          title: 'Create failed',
          timer: 1400,
          showConfirmButton: false
        });
      }
    },
    closeModal(modalId) {
      try {
        var _window$bootstrap2;
        const el = document.getElementById(modalId);
        if (el && (_window$bootstrap2 = window.bootstrap) !== null && _window$bootstrap2 !== void 0 && _window$bootstrap2.Modal) {
          const modal = window.bootstrap.Modal.getInstance(el);
          if (modal) {
            modal.hide();
          }
        }
        // Force cleanup after modal close
        setTimeout(() => this.cleanupModalBackdrops(), 300);
      } catch (e) {
        console.error('Error closing modal:', e);
      }
    },
    stripHtmlTags(text) {
      if (!text) return '';
      const div = document.createElement('div');
      div.innerHTML = text;
      return div.textContent || div.innerText || '';
    },
    extractDate(dateTimeString) {
      if (!dateTimeString) return '';
      try {
        const d = new Date(dateTimeString);
        if (!isNaN(d.getTime())) {
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          return `${y}-${m}-${day}`;
        }
        return (dateTimeString.split('T')[0] || dateTimeString).trim();
      } catch (_) {
        return String(dateTimeString).split('T')[0];
      }
    },
    async fetchNotes(userId) {
      try {
        const response = await fetch(`/api/fetch-notes/${userId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        this.notes = await response.json();
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    },
    viewModal(note) {
      var _note$visibility_opti;
      console.log('View clicked:', note.id);
      const vis = this.normalizeVisibility((_note$visibility_opti = note.visibility_option) !== null && _note$visibility_opti !== void 0 ? _note$visibility_opti : note.option);
      this.form = {
        id: note.id,
        surah_name: note.surah_name || '',
        ayah_verse_ar: note.ayah_verse_ar || '',
        ayah_verse_en: note.ayah_verse_en || '',
        ayah_notes: note.ayah_notes || '',
        option: typeof note.option !== 'undefined' ? note.option : '',
        visibility_option: vis,
        created_at: note.created_at || ''
      };
      this.viewingNote = note;
      this.cleanupModalBackdrops();
      this.$nextTick(() => {
        try {
          var _window$bootstrap3;
          const modalEl = document.getElementById('viewNotes');
          if (modalEl && (_window$bootstrap3 = window.bootstrap) !== null && _window$bootstrap3 !== void 0 && _window$bootstrap3.Modal) {
            const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
          }
        } catch (e) {
          console.error('Error opening view modal:', e);
        }
      });
    },
    openEditNotesModal() {
      try {
        var _window$bootstrap4;
        const modalEl = document.getElementById('editNotes');
        if (modalEl && (_window$bootstrap4 = window.bootstrap) !== null && _window$bootstrap4 !== void 0 && _window$bootstrap4.Modal) {
          const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
          modal.show();
        }
      } catch (e) {
        console.error('Error opening edit modal:', e);
      }
    },
    openEditFromViewModal() {
      if (!this.viewingNote) return;
      this.editModal(this.viewingNote);
      this.closeModal('viewNotes');
      this.$nextTick(() => {
        this.openEditNotesModal();
      });
    },
    async handleDeleteFromView() {
      if (!this.viewingNote) return;
      const deleted = await this.deleteNote(this.viewingNote.id);
      if (deleted) {
        this.closeModal('viewNotes');
      }
    },
    editModal(note) {
      var _note$visibility_opti2;
      console.log('Edit clicked:', note.id);
      // hydrate reactive form with selected note
      const vis = this.normalizeVisibility((_note$visibility_opti2 = note.visibility_option) !== null && _note$visibility_opti2 !== void 0 ? _note$visibility_opti2 : note.option);
      this.form = {
        id: note.id,
        surah_name: note.surah_name || '',
        ayah_verse_ar: note.ayah_verse_ar || '',
        ayah_verse_en: note.ayah_verse_en || '',
        ayah_notes: note.ayah_notes || '',
        option: typeof note.option !== 'undefined' ? note.option : '',
        visibility_option: vis,
        created_at: note.created_at || ''
      };
      // no programmatic show; rely on data-bs-toggle for reliability
    },
    displaySurahName(name) {
      const clean = this.stripSurahPrefix(name || "");
      return clean || name || "";
    },
    stripSurahPrefix(name) {
      if (!name) return "";
      return name.replace(/^\s*\d+\s*[-–—]\s*/, "").trim();
    },
    escapeHtml(value = "") {
      return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    },
    escapeRegExp(value = "") {
      return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    },
    highlightMatches(text = "") {
      const escaped = this.escapeHtml(text);
      const query = (this.query || "").trim();
      if (!query) {
        return escaped;
      }
      const regex = new RegExp(`(${this.escapeRegExp(query)})`, "gi");
      return escaped.replace(regex, '<mark class="search-highlight">$1</mark>');
    },
    renderNoteExcerpt(note, maxLength = 220) {
      const plain = this.stripHtmlTags(note.ayah_notes || "");
      const truncated = plain.length > maxLength ? plain.slice(0, maxLength).trim() + "..." : plain;
      return this.highlightMatches(truncated);
    },
    composeNoteText(note) {
      const segments = [];
      if (note.ayah_info) {
        segments.push(note.ayah_info);
      }
      const surahName = this.displaySurahName(note.surah_name);
      if (surahName || note.ayah_num) {
        const reference = [surahName, note.ayah_num ? `Ayah ${note.ayah_num}` : ""].filter(Boolean).join(" • ");
        if (reference) {
          segments.push(reference);
        }
      }
      const body = this.stripHtmlTags(note.ayah_notes || "");
      if (body) {
        segments.push(body);
      }
      return segments.join("\n");
    },
    async copyNoteToClipboard(note) {
      const text = this.composeNoteText(note);
      if (!text) return;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: "success",
          title: "Copied to clipboard",
          timer: 1200,
          showConfirmButton: false
        });
      } catch (error) {
        console.error("Clipboard copy failed", error);
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: "error",
          title: "Unable to copy",
          timer: 1200,
          showConfirmButton: false
        });
      }
    },
    shareNoteOnWhatsApp(note) {
      const text = this.composeNoteText(note);
      if (!text) return;
      const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener");
    },
    async updateNotes() {
      const strippedContent = this.stripHtmlTags(this.form.ayah_notes || '');
      if (!strippedContent.trim()) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: 'warning',
          title: 'Note cannot be empty',
          timer: 1200,
          showConfirmButton: false
        });
        return;
      }
      const result = await sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
        title: "Are you sure you want to update?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update note!"
      });
      if (!result.isConfirmed) return false;
      try {
        const payload = _objectSpread(_objectSpread({}, this.form), {}, {
          visibility_option: this.normalizeVisibility(this.form.visibility_option)
        });
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`api/update-notes/${this.form.id}`, payload);
        this.closeModal('editNotes');
        await this.fetchNotes(this.userId);
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          position: "top-end",
          icon: "success",
          title: "Note updated successfully",
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        console.error('Update error:', error);
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: 'error',
          title: 'Update failed',
          timer: 1400,
          showConfirmButton: false
        });
      }
    },
    isBusy(id) {
      return !!this.busy[id];
    },
    normalizeVisibility(val) {
      if (val === 'private' || val === 1 || val === '1') return 1;
      if (val === 'public' || val === 0 || val === '0' || val === undefined || val === null) return 0;
      return val ? 1 : 0;
    },
    async deleteNote(id) {
      console.log('Delete clicked:', id);
      const result = await sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
        title: "Delete note?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#b00020",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Delete"
      });
      if (!result.isConfirmed) return;
      try {
        this.$set ? this.$set(this.busy, id, true) : this.busy[id] = true;
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/delete-notes/${id}`);
        await this.fetchNotes(this.userId);
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: 'success',
          title: 'Note deleted',
          timer: 1200,
          showConfirmButton: false
        });
        return true;
      } catch (e) {
        console.error('Delete error:', e);
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: 'error',
          title: 'Delete failed',
          timer: 1400,
          showConfirmButton: false
        });
      } finally {
        this.busy[id] = false;
      }
      return false;
    }
  },
  computed: {
    surahFilterOptions() {
      const set = new Set();
      this.notes.forEach(note => {
        const name = this.displaySurahName(note.surah_name);
        if (name) {
          set.add(name);
        }
      });
      return Array.from(set).sort((a, b) => a.localeCompare(b));
    },
    filteredNotes() {
      const query = (this.query || '').toLowerCase().trim();
      const list = this.notes.filter(note => {
        const noteText = [note.ayah_info, note.surah_name, note.ayah_verse_en, this.stripHtmlTags(note.ayah_notes || '')].map(val => (val || '').toString().toLowerCase()).join(" ");
        if (query && !noteText.includes(query)) {
          return false;
        }
        if (this.surahFilter !== 'all') {
          const filteredSurah = this.displaySurahName(note.surah_name).toLowerCase();
          if (!filteredSurah || filteredSurah !== this.surahFilter.toLowerCase()) {
            return false;
          }
        }
        if (this.lengthFilter !== 'all') {
          const length = this.stripHtmlTags(note.ayah_notes || '').length;
          if (this.lengthFilter === 'short' && length >= 100) return false;
          if (this.lengthFilter === 'medium' && (length < 100 || length >= 200)) return false;
          if (this.lengthFilter === 'long' && length < 200) return false;
        }
        return true;
      });
      return list.sort((a, b) => {
        const da = new Date(a.created_at || 0).getTime();
        const db = new Date(b.created_at || 0).getTime();
        return this.sortBy === 'newest' ? db - da : da - db;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_admin_panels_NotesComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_admin_panels_NotesComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/vue/admin_panels/NotesComponent.vue */ "./resources/components/vue/admin_panels/NotesComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=template&id=3d2e6242&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=template&id=3d2e6242&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "admin-page"
};
const _hoisted_2 = {
  class: "pt-4"
};
const _hoisted_3 = {
  class: "search-toolbar-panel mb-3"
};
const _hoisted_4 = {
  class: "toolbar-row"
};
const _hoisted_5 = {
  class: "admin-search-wrapper"
};
const _hoisted_6 = {
  class: "input-group admin-search"
};
const _hoisted_7 = {
  class: "filters d-flex align-items-center gap-2"
};
const _hoisted_8 = ["value"];
const _hoisted_9 = {
  class: "pb-3 text-center admin-count"
};
const _hoisted_10 = {
  class: "count-pill"
};
const _hoisted_11 = {
  class: "notes-grid-wrapper"
};
const _hoisted_12 = {
  class: "row"
};
const _hoisted_13 = {
  class: "note-card"
};
const _hoisted_14 = ["innerHTML"];
const _hoisted_15 = {
  key: 1,
  class: "note-reference"
};
const _hoisted_16 = {
  key: 0
};
const _hoisted_17 = {
  key: 1
};
const _hoisted_18 = ["innerHTML"];
const _hoisted_19 = {
  class: "note-meta"
};
const _hoisted_20 = {
  class: "date"
};
const _hoisted_21 = {
  class: "note-actions",
  role: "group",
  "aria-label": "Note actions"
};
const _hoisted_22 = ["onClick"];
const _hoisted_23 = ["onClick"];
const _hoisted_24 = ["disabled", "onClick", "title"];
const _hoisted_25 = {
  key: 0,
  class: "spinner-border spinner-border-sm"
};
const _hoisted_26 = {
  key: 1,
  class: "bi bi-trash"
};
const _hoisted_27 = ["onClick"];
const _hoisted_28 = ["onClick"];
const _hoisted_29 = {
  class: "modal fade",
  id: "createNote",
  tabindex: "-1",
  "aria-labelledby": "createNoteLabel",
  "aria-hidden": "true",
  "data-bs-backdrop": "true"
};
const _hoisted_30 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_31 = {
  class: "modal-content"
};
const _hoisted_32 = {
  class: "modal-body"
};
const _hoisted_33 = {
  class: "mb-3"
};
const _hoisted_34 = {
  class: "modal fade",
  id: "editNotes",
  tabindex: "-1",
  "aria-labelledby": "editNotesLabel",
  "aria-hidden": "true",
  "data-bs-backdrop": "true"
};
const _hoisted_35 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_36 = {
  class: "modal-content"
};
const _hoisted_37 = {
  class: "modal-body"
};
const _hoisted_38 = {
  class: "mb-3"
};
const _hoisted_39 = {
  class: "modal fade",
  id: "viewNotes",
  tabindex: "-1",
  "aria-labelledby": "viewNotesLabel",
  "aria-hidden": "true",
  "data-bs-backdrop": "true"
};
const _hoisted_40 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_41 = {
  class: "modal-content"
};
const _hoisted_42 = {
  class: "modal-body"
};
const _hoisted_43 = {
  class: "container"
};
const _hoisted_44 = {
  key: 0,
  class: "mb-3"
};
const _hoisted_45 = {
  class: "mt-2 text-dark text-left"
};
const _hoisted_46 = {
  class: "mb-3"
};
const _hoisted_47 = ["innerHTML"];
const _hoisted_48 = {
  class: "mb-3"
};
const _hoisted_49 = {
  class: "mt-2 text-dark text-left"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Editor = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Editor");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.query = $event),
    class: "form-control",
    placeholder: "Search notes..."
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.query]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.surahFilter = $event),
    class: "form-select"
  }, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "all"
  }, "All surahs", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.surahFilterOptions, (surah, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: `filter-${surah}-${idx}`,
      value: surah
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(surah), 9 /* TEXT, PROPS */, _hoisted_8);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.surahFilter]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.sortBy = $event),
    class: "form-select"
  }, [...(_cache[10] || (_cache[10] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "newest"
  }, "Newest first", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "oldest"
  }, "Oldest first", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.sortBy]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.lengthFilter = $event),
    class: "form-select"
  }, [...(_cache[11] || (_cache[11] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "all"
  }, "Any length", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "short"
  }, "Short (under 100 chars)", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "medium"
  }, "Medium (100‑199 chars)", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "long"
  }, "Long (200+ chars)", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.lengthFilter]])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_9, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "count-label"
  }, "Reflections", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.notes.length), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredNotes, note => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-md-4 mb-4",
      key: note.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "note-chip"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-journal-text me-1"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Note ")], -1 /* CACHED */)), note.ayah_info ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 0,
      class: "note-title",
      innerHTML: $options.highlightMatches(note.ayah_info)
    }, null, 8 /* PROPS */, _hoisted_14)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), note.surah_name || note.ayah_num ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_15, [note.surah_name ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.displaySurahName(note.surah_name)), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), note.ayah_num ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_17, " • Ayah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(note.ayah_num), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "note-body",
      innerHTML: $options.renderNoteExcerpt(note)
    }, null, 8 /* PROPS */, _hoisted_18), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_20, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-calendar3 me-1"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.extractDate(note.created_at)), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-icon btn-ghost",
      onClick: $event => $options.viewModal(note),
      title: "View",
      "aria-label": "View note"
    }, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-eye"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_22), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-icon btn-success outline",
      "data-bs-toggle": "modal",
      "data-bs-target": "#editNotes",
      onClick: $event => $options.editModal(note),
      title: "Edit",
      "aria-label": "Edit note"
    }, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-pencil"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_23), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-icon btn-danger outline",
      disabled: $options.isBusy(note.id),
      onClick: $event => $options.deleteNote(note.id),
      title: $options.isBusy(note.id) ? 'Deleting…' : 'Delete',
      "aria-label": "Delete note"
    }, [$options.isBusy(note.id) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_25)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_26))], 8 /* PROPS */, _hoisted_24), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-icon btn-ghost",
      onClick: $event => $options.copyNoteToClipboard(note),
      title: "Copy note",
      "aria-label": "Copy note to clipboard"
    }, [...(_cache[16] || (_cache[16] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clipboard"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_27), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-icon btn-ghost",
      onClick: $event => $options.shareNoteOnWhatsApp(note),
      title: "Share on WhatsApp",
      "aria-label": "Share note on WhatsApp"
    }, [...(_cache[17] || (_cache[17] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-whatsapp"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_28)])])]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Create Note Modal "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title text-dark",
    id: "createNoteLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Create Note")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.createNote && $options.createNote(...args), ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Notes", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Editor, {
    theme: "snow",
    content: $data.newNote,
    "onUpdate:content": _cache[4] || (_cache[4] = $event => $data.newNote = $event),
    contentType: "html",
    class: "editor"
  }, null, 8 /* PROPS */, ["content"])]), _cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex justify-content-end gap-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-secondary",
    "data-bs-dismiss": "modal"
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-primary"
  }, "Create")], -1 /* CACHED */))], 32 /* NEED_HYDRATION */)])])])])])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Edit Note Modal "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title text-dark",
    id: "editNotesLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Edit Note")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.updateNotes && $options.updateNotes(...args), ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Edit your note:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Editor, {
    theme: "snow",
    content: $data.form.ayah_notes,
    "onUpdate:content": _cache[6] || (_cache[6] = $event => $data.form.ayah_notes = $event),
    contentType: "html",
    class: "editor"
  }, null, 8 /* PROPS */, ["content"])]), _cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-secondary",
    "data-bs-dismiss": "modal"
  }, "Close"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-success"
  }, "Update")], -1 /* CACHED */))], 32 /* NEED_HYDRATION */)])])])])])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" View Note Modal "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title text-dark",
    id: "viewNotesLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "View Note")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [$data.form.surah_name ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_44, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Surah Name:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_45, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.surah_name), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Notes:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "mt-2 text-dark text-left",
    innerHTML: $data.form.ayah_notes
  }, null, 8 /* PROPS */, _hoisted_47)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Date Created:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_49, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.extractDate($data.form.created_at)), 1 /* TEXT */)])])]), _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer flex-wrap gap-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary",
    "data-bs-dismiss": "modal"
  }, "Close")], -1 /* CACHED */))])])])]))]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=style&index=0&id=3d2e6242&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=style&index=0&id=3d2e6242&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=style&index=1&id=3d2e6242&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=style&index=1&id=3d2e6242&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/admin_panels/NotesComponent.vue":
/*!******************************************************************!*\
  !*** ./resources/components/vue/admin_panels/NotesComponent.vue ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _NotesComponent_vue_vue_type_template_id_3d2e6242_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotesComponent.vue?vue&type=template&id=3d2e6242&scoped=true */ "./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=template&id=3d2e6242&scoped=true");
/* harmony import */ var _NotesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NotesComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _NotesComponent_vue_vue_type_style_index_0_id_3d2e6242_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NotesComponent.vue?vue&type=style&index=0&id=3d2e6242&scoped=true&lang=css */ "./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=style&index=0&id=3d2e6242&scoped=true&lang=css");
/* harmony import */ var _NotesComponent_vue_vue_type_style_index_1_id_3d2e6242_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NotesComponent.vue?vue&type=style&index=1&id=3d2e6242&lang=css */ "./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=style&index=1&id=3d2e6242&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;



const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_NotesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_NotesComponent_vue_vue_type_template_id_3d2e6242_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-3d2e6242"],['__file',"resources/components/vue/admin_panels/NotesComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NotesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NotesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./NotesComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=style&index=0&id=3d2e6242&scoped=true&lang=css":
/*!**************************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=style&index=0&id=3d2e6242&scoped=true&lang=css ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NotesComponent_vue_vue_type_style_index_0_id_3d2e6242_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./NotesComponent.vue?vue&type=style&index=0&id=3d2e6242&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=style&index=0&id=3d2e6242&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=style&index=1&id=3d2e6242&lang=css":
/*!**************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=style&index=1&id=3d2e6242&lang=css ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NotesComponent_vue_vue_type_style_index_1_id_3d2e6242_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./NotesComponent.vue?vue&type=style&index=1&id=3d2e6242&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=style&index=1&id=3d2e6242&lang=css");


/***/ }),

/***/ "./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=template&id=3d2e6242&scoped=true":
/*!************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=template&id=3d2e6242&scoped=true ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NotesComponent_vue_vue_type_template_id_3d2e6242_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NotesComponent_vue_vue_type_template_id_3d2e6242_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./NotesComponent.vue?vue&type=template&id=3d2e6242&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/NotesComponent.vue?vue&type=template&id=3d2e6242&scoped=true");


/***/ }),

/***/ "./resources/js/components/admin_panels/NotesComponent.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/components/admin_panels/NotesComponent.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _NotesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotesComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/NotesComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_NotesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/admin_panels/NotesComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/NotesComponent.vue?vue&type=script&lang=js":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/NotesComponent.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NotesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NotesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./NotesComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=script&lang=js");
 

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