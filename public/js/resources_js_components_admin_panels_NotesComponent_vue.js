"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_panels_NotesComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************************/
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
      busy: {},
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
        const response = await fetch('/api/userId');
        if (!response.ok) throw new Error('Failed to fetch user ID');
        const data = await response.json();
        if (data.userId) {
          this.userId = data.userId;
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
    truncatedHtml(html, maxLength = 150) {
      const div = document.createElement("div");
      div.innerHTML = html || '';
      const plainText = div.textContent || div.innerText || "";
      if (plainText.length > maxLength) {
        return plainText.substring(0, maxLength) + '...';
      }
      return plainText;
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
      if (!result.isConfirmed) return;
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
    }
  },
  computed: {
    filteredNotes() {
      const q = (this.query || '').toLowerCase();
      const list = this.notes.filter(n => {
        const plain = this.stripHtmlTags((n.ayah_notes || '').toString()).toLowerCase();
        return !q || plain.includes(q);
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

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=template&id=dfb236de&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=template&id=dfb236de&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "pt-4"
};
const _hoisted_2 = {
  class: "d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2"
};
const _hoisted_3 = {
  class: "input-group",
  style: {
    "max-width": "380px"
  }
};
const _hoisted_4 = {
  class: "d-flex align-items-center gap-2"
};
const _hoisted_5 = {
  class: "pb-3 text-center"
};
const _hoisted_6 = {
  style: {
    "color": "rgb(0, 191, 166)"
  }
};
const _hoisted_7 = {
  class: "row"
};
const _hoisted_8 = {
  class: "note-card"
};
const _hoisted_9 = ["innerHTML"];
const _hoisted_10 = {
  class: "note-meta"
};
const _hoisted_11 = {
  class: "date"
};
const _hoisted_12 = {
  class: "note-actions",
  role: "group",
  "aria-label": "Note actions"
};
const _hoisted_13 = ["onClick"];
const _hoisted_14 = ["onClick"];
const _hoisted_15 = ["disabled", "onClick", "title"];
const _hoisted_16 = {
  key: 0,
  class: "spinner-border spinner-border-sm"
};
const _hoisted_17 = {
  key: 1,
  class: "bi bi-trash"
};
const _hoisted_18 = {
  class: "modal fade",
  id: "createNote",
  tabindex: "-1",
  "aria-labelledby": "createNoteLabel",
  "aria-hidden": "true",
  "data-bs-backdrop": "true"
};
const _hoisted_19 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_20 = {
  class: "modal-content"
};
const _hoisted_21 = {
  class: "modal-body"
};
const _hoisted_22 = {
  class: "mb-3"
};
const _hoisted_23 = {
  class: "modal fade",
  id: "editNotes",
  tabindex: "-1",
  "aria-labelledby": "editNotesLabel",
  "aria-hidden": "true",
  "data-bs-backdrop": "true"
};
const _hoisted_24 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_25 = {
  class: "modal-content"
};
const _hoisted_26 = {
  class: "modal-body"
};
const _hoisted_27 = {
  class: "mb-3"
};
const _hoisted_28 = {
  class: "modal fade",
  id: "viewNotes",
  tabindex: "-1",
  "aria-labelledby": "viewNotesLabel",
  "aria-hidden": "true",
  "data-bs-backdrop": "true"
};
const _hoisted_29 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_30 = {
  class: "modal-content"
};
const _hoisted_31 = {
  class: "modal-body"
};
const _hoisted_32 = {
  class: "container"
};
const _hoisted_33 = {
  key: 0,
  class: "mb-3"
};
const _hoisted_34 = {
  class: "mt-2 text-dark text-left"
};
const _hoisted_35 = {
  class: "mb-3"
};
const _hoisted_36 = ["innerHTML"];
const _hoisted_37 = {
  class: "mb-3"
};
const _hoisted_38 = {
  class: "mt-2 text-dark text-left"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Editor = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Editor");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Notes Container "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.query = $event),
    class: "form-control",
    placeholder: "Search notes..."
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.query]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.sortBy = $event),
    class: "form-select"
  }, [...(_cache[7] || (_cache[7] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "newest"
  }, "Newest first", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "oldest"
  }, "Oldest first", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.sortBy]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button type=\"button\" class=\"btn btn-add outline\" @click=\"openCreateModal\"><i class=\"bi bi-plus-lg me-1\"></i>New Note</button> ")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_5, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "You have:", -1 /* CACHED */)), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)()), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.notes.length), 1 /* TEXT */), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)()), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "notes", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredNotes, note => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-md-4 mb-4",
      key: note.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "note-chip"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-journal-text me-1"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Note ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "note-body",
      innerHTML: $options.truncatedHtml(note.ayah_notes, 220)
    }, null, 8 /* PROPS */, _hoisted_9), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_11, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-calendar3 me-1"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.extractDate(note.created_at)), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-icon btn-ghost",
      onClick: $event => $options.viewModal(note),
      title: "View",
      "aria-label": "View note"
    }, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-eye"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_13), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-icon btn-success outline",
      "data-bs-toggle": "modal",
      "data-bs-target": "#editNotes",
      onClick: $event => $options.editModal(note),
      title: "Edit",
      "aria-label": "Edit note"
    }, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-pencil"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_14), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-icon btn-danger outline",
      disabled: $options.isBusy(note.id),
      onClick: $event => $options.deleteNote(note.id),
      title: $options.isBusy(note.id) ? 'Deleting…' : 'Delete',
      "aria-label": "Delete note"
    }, [$options.isBusy(note.id) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_16)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_17))], 8 /* PROPS */, _hoisted_15)])])]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Create Note Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title text-dark",
    id: "createNoteLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Create Note")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.createNote && $options.createNote(...args), ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Notes", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Editor, {
    theme: "snow",
    content: $data.newNote,
    "onUpdate:content": _cache[2] || (_cache[2] = $event => $data.newNote = $event),
    contentType: "html",
    class: "editor"
  }, null, 8 /* PROPS */, ["content"])]), _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex justify-content-end gap-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-secondary",
    "data-bs-dismiss": "modal"
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-primary"
  }, "Create")], -1 /* CACHED */))], 32 /* NEED_HYDRATION */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Edit Note Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title text-dark",
    id: "editNotesLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Edit Note")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.updateNotes && $options.updateNotes(...args), ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Edit your note:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Editor, {
    theme: "snow",
    content: $data.form.ayah_notes,
    "onUpdate:content": _cache[4] || (_cache[4] = $event => $data.form.ayah_notes = $event),
    contentType: "html",
    class: "editor"
  }, null, 8 /* PROPS */, ["content"])]), _cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-secondary",
    "data-bs-dismiss": "modal"
  }, "Close"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-success"
  }, "Update")], -1 /* CACHED */))], 32 /* NEED_HYDRATION */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" View Note Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title text-dark",
    id: "viewNotesLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "View Note")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [$data.form.surah_name ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_33, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Surah Name:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.surah_name), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Notes:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "mt-2 text-dark text-left",
    innerHTML: $data.form.ayah_notes
  }, null, 8 /* PROPS */, _hoisted_36)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Date Created:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.extractDate($data.form.created_at)), 1 /* TEXT */)])])]), _cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-secondary",
    "data-bs-dismiss": "modal"
  }, "Close")], -1 /* CACHED */))])])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=style&index=0&id=dfb236de&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=style&index=0&id=dfb236de&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.note-card[data-v-dfb236de] {\n  position: relative;\n  background: #fff;\n  border: 1px solid #e6e8eb;\n  border-radius: 16px;\n  padding: 16px;\n  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);\n  transition: transform 0.18s ease, box-shadow 0.18s ease;\n  cursor: default;\n  /* Ensure pointer events work */\n  pointer-events: auto;\n}\n.note-card[data-v-dfb236de]:before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  border-radius: 16px;\n  padding: 1px;\n  background: linear-gradient(120deg, rgba(0, 191, 166, 0.4), rgba(0, 191, 166, 0) 40%, rgba(124, 77, 255, 0.15));\n  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n  -webkit-mask-composite: xor;\n  mask-composite: exclude;\n  /* Critical: prevent pseudo-element from blocking clicks */\n  pointer-events: none;\n}\n.note-card[data-v-dfb236de]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);\n}\n.note-chip[data-v-dfb236de] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  background: #e6fcf7;\n  color: #0f766e;\n  border: 1px solid #b3efe3;\n  border-radius: 999px;\n  font-weight: 700;\n  font-size: 0.8rem;\n  padding: 4px 10px;\n  margin-bottom: 10px;\n  pointer-events: none;\n}\n.note-body[data-v-dfb236de] {\n  color: #0f172a;\n  min-height: 96px;\n  margin-bottom: 8px;\n  pointer-events: none;\n}\n.note-meta[data-v-dfb236de] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 8px;\n  color: #64748b;\n  font-size: 0.85rem;\n  pointer-events: none;\n}\n.note-actions[data-v-dfb236de] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-top: 10px;\n  /* Ensure buttons are clickable */\n  position: relative;\n  z-index: 10;\n}\n.btn-icon[data-v-dfb236de] {\n  width: 34px;\n  height: 34px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  border-radius: 10px;\n  /* Ensure buttons are clickable */\n  pointer-events: auto;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.btn-icon[data-v-dfb236de]:hover:not(:disabled) {\n  transform: scale(1.05);\n}\n.btn-icon[data-v-dfb236de]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-success.outline[data-v-dfb236de] {\n  background: #fff !important;\n  color: #198754 !important;\n  border: 2px solid #198754 !important;\n  box-shadow: none;\n}\n.btn-success.outline[data-v-dfb236de]:hover:not(:disabled) {\n  background: #198754 !important;\n  color: #fff !important;\n}\n.btn-danger.outline[data-v-dfb236de] {\n  background: #fff !important;\n  color: #b00020 !important;\n  border: 2px solid #b00020 !important;\n  box-shadow: none;\n}\n.btn-danger.outline[data-v-dfb236de]:hover:not(:disabled) {\n  background: #b00020 !important;\n  color: #fff !important;\n}\n.btn-ghost[data-v-dfb236de] {\n  background: #fff;\n  border: 1px solid #e6e8eb;\n  color: #0f172a;\n}\n.btn-ghost[data-v-dfb236de]:hover {\n  background: #f7faf9;\n}\n.btn-add[data-v-dfb236de] {\n  background: #00bfa6;\n  color: #fff;\n  border: none;\n}\n.btn-add[data-v-dfb236de]:hover {\n  background: #009688;\n}\n\n/* Ensure visually-hidden elements don't block clicks */\n.visually-hidden[data-v-dfb236de] {\n  pointer-events: none;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=style&index=1&id=dfb236de&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=style&index=1&id=dfb236de&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.editor {\n  height: 320px;\n}\n\n/* Ensure modal backdrops don't linger */\n.modal-backdrop {\n  pointer-events: auto;\n}\nbody.modal-open {\n  overflow: hidden;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=style&index=0&id=dfb236de&scoped=true&lang=css":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=style&index=0&id=dfb236de&scoped=true&lang=css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NotesComponent_vue_vue_type_style_index_0_id_dfb236de_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./NotesComponent.vue?vue&type=style&index=0&id=dfb236de&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=style&index=0&id=dfb236de&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NotesComponent_vue_vue_type_style_index_0_id_dfb236de_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NotesComponent_vue_vue_type_style_index_0_id_dfb236de_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=style&index=1&id=dfb236de&lang=css":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=style&index=1&id=dfb236de&lang=css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NotesComponent_vue_vue_type_style_index_1_id_dfb236de_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./NotesComponent.vue?vue&type=style&index=1&id=dfb236de&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=style&index=1&id=dfb236de&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NotesComponent_vue_vue_type_style_index_1_id_dfb236de_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NotesComponent_vue_vue_type_style_index_1_id_dfb236de_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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
/* harmony import */ var _NotesComponent_vue_vue_type_template_id_dfb236de_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotesComponent.vue?vue&type=template&id=dfb236de&scoped=true */ "./resources/js/components/admin_panels/NotesComponent.vue?vue&type=template&id=dfb236de&scoped=true");
/* harmony import */ var _NotesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NotesComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/NotesComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _NotesComponent_vue_vue_type_style_index_0_id_dfb236de_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NotesComponent.vue?vue&type=style&index=0&id=dfb236de&scoped=true&lang=css */ "./resources/js/components/admin_panels/NotesComponent.vue?vue&type=style&index=0&id=dfb236de&scoped=true&lang=css");
/* harmony import */ var _NotesComponent_vue_vue_type_style_index_1_id_dfb236de_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NotesComponent.vue?vue&type=style&index=1&id=dfb236de&lang=css */ "./resources/js/components/admin_panels/NotesComponent.vue?vue&type=style&index=1&id=dfb236de&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;



const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_NotesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_NotesComponent_vue_vue_type_template_id_dfb236de_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-dfb236de"],['__file',"resources/js/components/admin_panels/NotesComponent.vue"]])
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

/***/ "./resources/js/components/admin_panels/NotesComponent.vue?vue&type=style&index=0&id=dfb236de&scoped=true&lang=css":
/*!*************************************************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/NotesComponent.vue?vue&type=style&index=0&id=dfb236de&scoped=true&lang=css ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NotesComponent_vue_vue_type_style_index_0_id_dfb236de_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./NotesComponent.vue?vue&type=style&index=0&id=dfb236de&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=style&index=0&id=dfb236de&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/admin_panels/NotesComponent.vue?vue&type=style&index=1&id=dfb236de&lang=css":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/NotesComponent.vue?vue&type=style&index=1&id=dfb236de&lang=css ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NotesComponent_vue_vue_type_style_index_1_id_dfb236de_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./NotesComponent.vue?vue&type=style&index=1&id=dfb236de&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=style&index=1&id=dfb236de&lang=css");


/***/ }),

/***/ "./resources/js/components/admin_panels/NotesComponent.vue?vue&type=template&id=dfb236de&scoped=true":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/NotesComponent.vue?vue&type=template&id=dfb236de&scoped=true ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NotesComponent_vue_vue_type_template_id_dfb236de_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NotesComponent_vue_vue_type_template_id_dfb236de_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./NotesComponent.vue?vue&type=template&id=dfb236de&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/NotesComponent.vue?vue&type=template&id=dfb236de&scoped=true");


/***/ })

}]);