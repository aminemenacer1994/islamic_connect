(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_components_vue_DuaComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/SectionReportModal.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/SectionReportModal.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

const REPORT_OPTIONS = [{
  value: 'bug report',
  label: 'Bug'
}, {
  value: 'content error',
  label: 'Content error'
}, {
  value: 'feature request',
  label: 'Feature request'
}];
const emptyForm = () => ({
  firstname: '',
  email: '',
  reportType: 'content error',
  title: '',
  description: ''
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'SectionReportModal',
  props: {
    pageName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      modalId: `section-report-modal-${Math.random().toString(36).slice(2, 10)}`,
      reportOptions: REPORT_OPTIONS,
      context: {},
      form: emptyForm(),
      submitting: false,
      statusMessage: '',
      statusType: ''
    };
  },
  computed: {
    sectionLabel() {
      return this.context.sectionTitle || this.context.sectionId || '';
    },
    canSubmit() {
      return Boolean(this.form.reportType && this.form.email.trim() && this.form.title.trim() && this.form.description.trim());
    },
    statusClass() {
      return this.statusType === 'success' ? 'alert-success' : 'alert-danger';
    }
  },
  mounted() {
    this.$nextTick(() => {
      const modalElement = this.getModalElement();
      if (modalElement) {
        modalElement.addEventListener('hidden.bs.modal', this.handleHidden);
      }
    });
  },
  beforeUnmount() {
    const modalElement = this.getModalElement();
    if (modalElement) {
      modalElement.removeEventListener('hidden.bs.modal', this.handleHidden);
    }
  },
  methods: {
    open(context = {}) {
      var _window$bootstrap;
      this.context = _objectSpread(_objectSpread({}, context), {}, {
        pageName: context.pageName || this.pageName
      });
      this.statusMessage = '';
      this.statusType = '';
      const modalElement = this.getModalElement();
      const ModalCtor = typeof window !== 'undefined' ? (_window$bootstrap = window.bootstrap) === null || _window$bootstrap === void 0 ? void 0 : _window$bootstrap.Modal : null;
      if (modalElement && ModalCtor) {
        ModalCtor.getOrCreateInstance(modalElement, {
          backdrop: true
        }).show();
      }
    },
    getModalElement() {
      if (typeof document === 'undefined') {
        return null;
      }
      return document.getElementById(this.modalId);
    },
    close() {
      var _window$bootstrap2;
      const modalElement = this.getModalElement();
      const ModalCtor = typeof window !== 'undefined' ? (_window$bootstrap2 = window.bootstrap) === null || _window$bootstrap2 === void 0 ? void 0 : _window$bootstrap2.Modal : null;
      if (modalElement && ModalCtor) {
        var _ModalCtor$getInstanc;
        (_ModalCtor$getInstanc = ModalCtor.getInstance(modalElement)) === null || _ModalCtor$getInstanc === void 0 || _ModalCtor$getInstanc.hide();
      }
    },
    handleHidden() {
      this.form = emptyForm();
      this.statusMessage = '';
      this.statusType = '';
      this.submitting = false;
    },
    buildMessage() {
      const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
      const lines = [`Report title: ${this.form.title.trim()}`, `Page: ${this.context.pageName || this.pageName || 'Unknown page'}`, `Section: ${this.context.sectionTitle || this.context.sectionId || 'Unknown section'}`, this.context.sectionId ? `Section ID: ${this.context.sectionId}` : '', pageUrl ? `URL: ${pageUrl}` : '', '', 'Description:', this.form.description.trim()];
      return lines.filter(line => line !== '').join('\n');
    },
    async submitReport() {
      if (!this.canSubmit || this.submitting) {
        return;
      }
      this.submitting = true;
      this.statusMessage = '';
      this.statusType = '';
      try {
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post('/api/send-message', {
          firstname: this.form.firstname.trim(),
          lastname: '',
          email: this.form.email.trim(),
          mobile: '',
          subject: this.form.reportType,
          message: this.buildMessage()
        });
        this.statusType = 'success';
        this.statusMessage = 'Report submitted. Thank you.';
        window.setTimeout(() => {
          this.close();
        }, 900);
      } catch (error) {
        var _error$response;
        this.statusType = 'error';
        this.statusMessage = (error === null || error === void 0 || (_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || 'Unable to submit this report right now.';
      } finally {
        this.submitting = false;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/DuaComponent.vue?vue&type=template&id=4b4cde72&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/DuaComponent.vue?vue&type=template&id=4b4cde72&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container-fluid dua-content-shell dua-tab-panel mb-3"
};
const _hoisted_2 = {
  class: "dua-tab-row",
  role: "tablist",
  "aria-label": "Dua view"
};
const _hoisted_3 = ["aria-selected"];
const _hoisted_4 = {
  class: "dua-tab-btn-copy"
};
const _hoisted_5 = {
  class: "dua-tab-btn-meta"
};
const _hoisted_6 = ["aria-selected"];
const _hoisted_7 = {
  class: "dua-tab-btn-copy"
};
const _hoisted_8 = {
  class: "dua-tab-btn-meta"
};
const _hoisted_9 = {
  key: 0,
  class: "alert alert-warning auth-warning text-center mt-3",
  role: "alert"
};
const _hoisted_10 = {
  key: 0,
  class: "text-end mt-3"
};
const _hoisted_11 = {
  class: "container-fluid dua-content-shell mb-3 dua-search-wrapper",
  role: "search"
};
const _hoisted_12 = {
  class: "dua-search-card p-3"
};
const _hoisted_13 = {
  class: "d-flex justify-content-between align-items-center gap-2 mb-3 flex-wrap"
};
const _hoisted_14 = {
  class: "dua-results-note mb-0"
};
const _hoisted_15 = {
  class: "row g-3 align-items-stretch"
};
const _hoisted_16 = {
  class: "col-md-6"
};
const _hoisted_17 = {
  class: "dua-search-input"
};
const _hoisted_18 = ["disabled"];
const _hoisted_19 = {
  key: 0,
  class: "col-6 col-md-3"
};
const _hoisted_20 = ["value"];
const _hoisted_21 = {
  key: 1,
  class: "col-6 col-md-3"
};
const _hoisted_22 = ["value"];
const _hoisted_23 = {
  key: 0,
  class: "container-fluid dua-content-shell mb-4",
  "aria-labelledby": "dua-recommender-title"
};
const _hoisted_24 = {
  class: "dua-recommender-panel"
};
const _hoisted_25 = {
  class: "d-flex justify-content-between align-items-center gap-2 flex-wrap mb-2"
};
const _hoisted_26 = {
  class: "row g-2"
};
const _hoisted_27 = {
  class: "col-12 col-md-9"
};
const _hoisted_28 = {
  class: "col-12 col-md-3 d-grid"
};
const _hoisted_29 = ["disabled"];
const _hoisted_30 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2",
  "aria-hidden": "true"
};
const _hoisted_31 = {
  key: 0,
  class: "d-flex flex-wrap gap-2 mt-3"
};
const _hoisted_32 = {
  key: 1,
  class: "alert alert-warning mt-3 mb-0",
  role: "alert"
};
const _hoisted_33 = {
  key: 2,
  class: "mt-2 dua-recommender-results"
};
const _hoisted_34 = {
  class: "dua-recommender-group-title"
};
const _hoisted_35 = {
  class: "text-muted"
};
const _hoisted_36 = {
  key: 0,
  class: "dua-recommender-list dua-recommender-dua-grid mb-0"
};
const _hoisted_37 = {
  class: "dua-recommender-item-title mb-1"
};
const _hoisted_38 = {
  class: "dua-recommender-item-meta mb-1"
};
const _hoisted_39 = {
  class: "dua-recommender-item-text mb-2"
};
const _hoisted_40 = {
  class: "dua-recommender-item-reference mb-0"
};
const _hoisted_41 = {
  key: 1,
  class: "dua-recommender-empty mb-0"
};
const _hoisted_42 = {
  key: 1,
  class: "container-fluid dua-content-shell mb-5",
  "aria-label": "Active filters"
};
const _hoisted_43 = {
  class: "dua-active-filters"
};
const _hoisted_44 = ["onClick"];
const _hoisted_45 = {
  key: 0,
  class: "alert alert-success alert-dismissible fade show mx-auto copy-message",
  role: "alert"
};
const _hoisted_46 = {
  class: "container-fluid dua-content-shell"
};
const _hoisted_47 = {
  key: 0,
  class: "text-center my-5"
};
const _hoisted_48 = {
  key: 1,
  class: "alert alert-danger text-center",
  role: "alert"
};
const _hoisted_49 = {
  key: 2,
  class: "alert no-duas-message text-center"
};
const _hoisted_50 = {
  class: "py-4"
};
const _hoisted_51 = {
  class: "fw-medium fs-5"
};
const _hoisted_52 = ["aria-labelledby"];
const _hoisted_53 = ["aria-labelledby"];
const _hoisted_54 = {
  class: "dua-category-heading mb-3"
};
const _hoisted_55 = ["id"];
const _hoisted_56 = {
  class: "category-meta mb-0"
};
const _hoisted_57 = {
  class: "category-actions"
};
const _hoisted_58 = ["onClick", "aria-label"];
const _hoisted_59 = ["onClick", "aria-expanded", "title"];
const _hoisted_60 = {
  key: 0,
  class: "row g-3 dua-card-grid",
  role: "list"
};
const _hoisted_61 = ["aria-labelledby"];
const _hoisted_62 = {
  class: "dua-card-content"
};
const _hoisted_63 = {
  key: 0,
  class: "alert alert-warning dua-login-warning",
  role: "alert"
};
const _hoisted_64 = ["id"];
const _hoisted_65 = ["innerHTML"];
const _hoisted_66 = ["innerHTML"];
const _hoisted_67 = {
  key: 2,
  class: "dua-section-block"
};
const _hoisted_68 = ["onClick", "aria-expanded", "aria-controls"];
const _hoisted_69 = ["id", "innerHTML"];
const _hoisted_70 = {
  key: 3,
  class: "dua-section-block"
};
const _hoisted_71 = ["onClick", "aria-expanded", "aria-controls"];
const _hoisted_72 = ["id", "innerHTML"];
const _hoisted_73 = {
  key: 4,
  class: "dua-section-block dua-section-block-reference mt-auto"
};
const _hoisted_74 = ["onClick", "aria-expanded", "aria-controls"];
const _hoisted_75 = ["id"];
const _hoisted_76 = ["innerHTML"];
const _hoisted_77 = {
  class: "dua-card-actions"
};
const _hoisted_78 = {
  class: "dua-font-controls me-auto"
};
const _hoisted_79 = ["disabled"];
const _hoisted_80 = ["disabled"];
const _hoisted_81 = {
  class: "dua-action-group"
};
const _hoisted_82 = ["onClick", "aria-label"];
const _hoisted_83 = ["onClick"];
const _hoisted_84 = ["onClick"];
const _hoisted_85 = ["onClick"];
const _hoisted_86 = ["onClick"];
const _hoisted_87 = ["onClick", "aria-label"];
const _hoisted_88 = {
  key: 1,
  class: "d-flex justify-content-center mt-4"
};
const _hoisted_89 = {
  "aria-label": "Dua pagination"
};
const _hoisted_90 = {
  class: "pagination dua-pagination"
};
const _hoisted_91 = ["onClick"];
const _hoisted_92 = ["onClick"];
const _hoisted_93 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_SectionReportModal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("SectionReportModal");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("main", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["container-fluid dua-shell py-4", {
      'is-dark': _ctx.isDarkMode
    }]),
    role: "main",
    "aria-labelledby": "dua-title"
  }, [_cache[61] || (_cache[61] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"container-fluid dua-content-shell dua-hero mb-4\" data-v-4b4cde72><div class=\"dua-hero-text\" data-v-4b4cde72><p class=\"dua-kicker mb-2\" data-v-4b4cde72>Dua Collection</p><h1 id=\"dua-title\" class=\"fw-bold mb-2 dua-title\" data-v-4b4cde72>Dua Library</h1><p class=\"dua-hero-subtitle mb-0 dua-lead\" data-v-4b4cde72> Find authentic duas by theme, then save or share what you need. </p></div></section><section class=\"container-fluid dua-content-shell mb-3\" aria-label=\"Sources and authenticity disclaimer\" data-v-4b4cde72><div class=\"dua-disclaimer-banner\" data-v-4b4cde72><p class=\"dua-disclaimer-note mb-0\" data-v-4b4cde72><strong data-v-4b4cde72>Resources &amp; Attribution | Sources &amp; Authenticity:</strong> We do not claim ownership of this content. These duas are compiled from authentic Islamic sources including the Qur&#39;an, Sahih al-Bukhari, Sahih Muslim, and other trusted hadith collections. </p></div></section>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    id: "tab-all",
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["dua-tab-btn", {
      active: _ctx.viewMode === 'all'
    }]),
    role: "tab",
    "aria-controls": "dua-panel",
    "aria-selected": _ctx.viewMode === 'all',
    onClick: _cache[0] || (_cache[0] = $event => {
      _ctx.viewMode = 'all';
      _ctx.resetPagination();
    }),
    onKeydown: [_cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => {
      _ctx.viewMode = 'all';
      _ctx.resetPagination();
    }, ["prevent"]), ["enter"])), _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => {
      _ctx.viewMode = 'all';
      _ctx.resetPagination();
    }, ["prevent"]), ["space"]))]
  }, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "dua-tab-btn-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-collection-fill"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_4, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "dua-tab-btn-label"
  }, "All Duas", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.allDuasCount) + " total", 1 /* TEXT */)])], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_3), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    id: "tab-liked",
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["dua-tab-btn", {
      active: _ctx.viewMode === 'liked'
    }]),
    role: "tab",
    "aria-controls": "dua-panel",
    "aria-selected": _ctx.viewMode === 'liked',
    onClick: _cache[3] || (_cache[3] = $event => {
      _ctx.viewMode = 'liked';
      _ctx.resetPagination();
    }),
    onKeydown: [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => {
      _ctx.viewMode = 'liked';
      _ctx.resetPagination();
    }, ["prevent"]), ["enter"])), _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => {
      _ctx.viewMode = 'liked';
      _ctx.resetPagination();
    }, ["prevent"]), ["space"]))]
  }, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "dua-tab-btn-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-heart-fill"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_7, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "dua-tab-btn-label"
  }, "Liked Duas", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.likedDuasCount) + " saved", 1 /* TEXT */)])], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_6)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_ctx.authWarning ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-shield-lock-fill me-2",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.authWarning), 1 /* TEXT */), _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "auth-warning-cta ms-2",
      href: "/login"
    }, "Log in", -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), _ctx.viewMode === 'liked' && _ctx.likedDuasCount > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn btn-sm btn-outline-danger rounded-pill action-pill", {
      disabled: _ctx.likedDuasCount === 0
    }]),
    onClick: _cache[6] || (_cache[6] = (...args) => _ctx.clearAllLikedDuas && _ctx.clearAllLikedDuas(...args)),
    "aria-label": "Clear all liked duas"
  }, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-trash-fill me-1"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.actionFeedback['clearAll'] ? 'Cleared!' : 'Clear All Liked Duas'), 1 /* TEXT */)], 2 /* CLASS */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.visibleDuasCount), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.visibleDuasCount === 1 ? 'dua matches your current view' : 'duas match your current view'), 1 /* TEXT */)]), _ctx.hasActiveFilters ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn btn-sm btn-outline-secondary rounded-pill px-3",
    onClick: _cache[7] || (_cache[7] = (...args) => _ctx.clearSearch && _ctx.clearSearch(...args))
  }, " Reset filters ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label visually-hidden",
    for: "dua-search-input"
  }, "Search duas", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "dua-search-input",
    "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => _ctx.searchQuery = $event),
    type: "text",
    class: "form-control border-0 py-2",
    placeholder: "Search by title, Arabic, translation, or reference",
    "aria-label": "Search duas",
    onInput: _cache[9] || (_cache[9] = (...args) => _ctx.resetPagination && _ctx.resetPagination(...args))
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.searchQuery]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "dua-clear-btn",
    disabled: !_ctx.hasActiveFilters,
    onClick: _cache[10] || (_cache[10] = (...args) => _ctx.clearSearch && _ctx.clearSearch(...args)),
    "aria-label": "Clear filters"
  }, [...(_cache[31] || (_cache[31] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_18)])]), _ctx.viewMode === 'all' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_19, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label visually-hidden",
    for: "dua-category-select"
  }, "Select category", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "dua-category-select",
    "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => _ctx.selectedCategory = $event),
    class: "form-select dua-filter-select",
    onChange: _cache[12] || (_cache[12] = (...args) => _ctx.resetPagination && _ctx.resetPagination(...args))
  }, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: ""
  }, "All Categories", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.duaCollection, category => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: category.id,
      value: category.id
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(category.name) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(category.duas.length) + ") ", 9 /* TEXT, PROPS */, _hoisted_20);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedCategory]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.viewMode === 'all' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label visually-hidden",
    for: "dua-reference-select"
  }, "Select reference", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "dua-reference-select",
    "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => _ctx.selectedReference = $event),
    class: "form-select dua-filter-select",
    onChange: _cache[14] || (_cache[14] = (...args) => _ctx.resetPagination && _ctx.resetPagination(...args))
  }, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: ""
  }, "All References", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.uniqueReferences, reference => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: reference.full,
      value: reference.full
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reference.display), 9 /* TEXT, PROPS */, _hoisted_22);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.selectedReference]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), _ctx.showDuaRecommender ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    id: "dua-recommender-title",
    class: "dua-recommender-title mb-1"
  }, "Dua Recommender"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "dua-recommender-subtitle mb-0"
  }, " Share how you feel and get relevant duas you can read right away. ")], -1 /* CACHED */)), _ctx.recommendationInput || _ctx.recommendationDuas.length || _ctx.recommendationError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "btn btn-sm btn-outline-secondary rounded-pill px-3",
    onClick: _cache[15] || (_cache[15] = (...args) => _ctx.clearDuaRecommendation && _ctx.clearDuaRecommendation(...args))
  }, " Clear ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => _ctx.recommendationInput = $event),
    type: "text",
    class: "form-control dua-recommender-input",
    placeholder: "Example: I'm really stressed about my exams",
    "aria-label": "Describe how you feel",
    onKeydown: _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => _ctx.runDuaRecommendation && _ctx.runDuaRecommendation(...args), ["prevent"]), ["enter"]))
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.recommendationInput]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn dua-recommender-btn",
    disabled: _ctx.recommendationLoading,
    onClick: _cache[18] || (_cache[18] = (...args) => _ctx.runDuaRecommendation && _ctx.runDuaRecommendation(...args))
  }, [_ctx.recommendationLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_30)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.recommendationLoading ? 'Finding...' : 'Find Recommendations'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_29)])]), _ctx.recommendationKeywords.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_31, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.recommendationKeywords, tag => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
      class: "dua-keyword-chip",
      key: tag
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tag), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.recommendationError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.recommendationError), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !_ctx.recommendationLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_34, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Recommended Duas ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_35, "(" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.recommendationDuas.length) + ")", 1 /* TEXT */)]), _ctx.recommendationDuas.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("ul", _hoisted_36, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.recommendationDuas, dua => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: dua.id,
      class: "dua-recommender-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.categoryName), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.translation), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_40, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Reference:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.reference || 'Not available'), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_41, " No local dua tags matched this feeling. "))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.activeFilterPills.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "dua-active-filters-label"
  }, "Active filters:", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.activeFilterPills, pill => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: pill.key,
      type: "button",
      class: "dua-filter-pill",
      onClick: $event => _ctx.removeFilter(pill.key)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(pill.label), 1 /* TEXT */), _cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-x"
    }, null, -1 /* CACHED */))], 8 /* PROPS */, _hoisted_44);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "slide-fade"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_ctx.showCopyMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_45, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check-circle-fill me-2"
    }, null, -1 /* CACHED */)), _cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Copied to clipboard ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn-close",
      onClick: _cache[19] || (_cache[19] = $event => _ctx.showCopyMessage = false),
      "aria-label": "Close"
    })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [_ctx.isLoading && !_ctx.errorMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_47, [...(_cache[44] || (_cache[44] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-success",
    role: "status",
    "aria-label": "Loading"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "mt-2 text-muted"
  }, "Loading duas...", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.errorMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_48, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.errorMessage), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.filteredDuas.length === 0 && !_ctx.isLoading && !_ctx.errorMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi fs-1 mb-3 d-block", _ctx.viewMode === 'liked' ? 'bi-heart-fill' : 'bi-search'])
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_51, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.viewMode === 'liked' ? 'No liked duas yet. Start liking duas to see them here.' : 'No duas found for your filters. Try different keywords or tags.'), 1 /* TEXT */), _ctx.viewMode === 'liked' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    onClick: _cache[20] || (_cache[20] = $event => {
      _ctx.viewMode = 'all';
      _ctx.resetPagination();
    }),
    class: "btn btn-primary rounded-pill px-4 py-2 mt-3"
  }, " Explore All Duas ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "container-fluid dua-content-shell",
    id: "dua-panel",
    role: "tabpanel",
    "aria-labelledby": _ctx.viewMode === 'all' ? 'tab-all' : 'tab-liked'
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.filteredDuas, category => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: category.id,
      class: "mb-4 dua-category-panel",
      role: "region",
      "aria-labelledby": `category-title-${category.id}`
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
      class: "category-title fw-bold mb-1",
      id: `category-title-${category.id}`
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(category.name), 9 /* TEXT, PROPS */, _hoisted_55), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_56, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(category.duas.length) + " duas in this section", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "category-download-btn",
      onClick: $event => _ctx.downloadCategoryDuas(category),
      "aria-label": `Download ${category.name} section as text`,
      title: "Download section as text"
    }, [...(_cache[45] || (_cache[45] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-download",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Download TXT", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_58), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["category-toggle", {
        expanded: !category.collapsed
      }]),
      onClick: $event => _ctx.toggleCategoryCollapse(category.id),
      "aria-expanded": !category.collapsed,
      title: category.collapsed ? 'Expand category' : 'Collapse category'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(category.collapsed ? 'bi bi-chevron-down' : 'bi bi-chevron-up')
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_59)])]), !category.collapsed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_60, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.getPaginatedDuas(category.duas), dua => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: dua.id,
        class: "col-12 col-md-6"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["dua-card h-100 position-relative", {
          'dua-card-liked': _ctx.viewMode === 'liked'
        }]),
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
          '--font-size-base': _ctx.fontSize + 'px'
        }),
        role: "listitem",
        "aria-labelledby": `dua-title-${dua.id}`
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [_ctx.loginWarnings[dua.id] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_63, [_cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-shield-lock-fill me-2",
        "aria-hidden": "true"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.loginWarnings[dua.id]), 1 /* TEXT */), _cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
        class: "auth-warning-cta ms-2",
        href: "/login"
      }, "Log in", -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
        class: "dua-card-title fw-bold mb-2",
        id: `dua-title-${dua.id}`
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        innerHTML: _ctx.highlightText(dua.title)
      }, null, 8 /* PROPS */, _hoisted_65)], 8 /* PROPS */, _hoisted_64), dua.arabic ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
        key: 1,
        class: "dua-card-arabic mb-2 font-arabic",
        lang: "ar",
        dir: "rtl",
        style: {
          fontSize: 'calc(var(--font-size-base) * 1.42)',
          lineHeight: '2.05'
        },
        innerHTML: _ctx.highlightText(dua.arabic),
        "aria-label": "Dua in Arabic"
      }, null, 8 /* PROPS */, _hoisted_66)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), dua.transliteration ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_67, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        type: "button",
        class: "dua-section-toggle",
        onClick: $event => _ctx.toggleDuaSection(dua, 'transliteration'),
        "aria-expanded": !_ctx.isDuaSectionCollapsed(dua, 'transliteration'),
        "aria-controls": `dua-transliteration-${dua.id}`
      }, [_cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "dua-section-label"
      }, "Transliteration", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(_ctx.isDuaSectionCollapsed(dua, 'transliteration') ? 'bi bi-chevron-down' : 'bi bi-chevron-up'),
        "aria-hidden": "true"
      }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_68), !_ctx.isDuaSectionCollapsed(dua, 'transliteration') ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
        key: 0,
        id: `dua-transliteration-${dua.id}`,
        class: "dua-card-transliteration fst-italic text-muted",
        innerHTML: _ctx.highlightText(dua.transliteration),
        "aria-label": "Dua transliteration"
      }, null, 8 /* PROPS */, _hoisted_69)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), dua.translation ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_70, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        type: "button",
        class: "dua-section-toggle",
        onClick: $event => _ctx.toggleDuaSection(dua, 'translation'),
        "aria-expanded": !_ctx.isDuaSectionCollapsed(dua, 'translation'),
        "aria-controls": `dua-translation-${dua.id}`
      }, [_cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "dua-section-label"
      }, "Translation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(_ctx.isDuaSectionCollapsed(dua, 'translation') ? 'bi bi-chevron-down' : 'bi bi-chevron-up'),
        "aria-hidden": "true"
      }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_71), !_ctx.isDuaSectionCollapsed(dua, 'translation') ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
        key: 0,
        id: `dua-translation-${dua.id}`,
        class: "dua-card-translation",
        style: {
          fontSize: 'calc(var(--font-size-base) * 0.86)'
        },
        innerHTML: _ctx.highlightText(dua.translation),
        "aria-label": "Dua translation"
      }, null, 8 /* PROPS */, _hoisted_72)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), dua.reference ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_73, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        type: "button",
        class: "dua-section-toggle",
        onClick: $event => _ctx.toggleDuaSection(dua, 'reference'),
        "aria-expanded": !_ctx.isDuaSectionCollapsed(dua, 'reference'),
        "aria-controls": `dua-reference-${dua.id}`
      }, [_cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "dua-section-label"
      }, "Reference", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(_ctx.isDuaSectionCollapsed(dua, 'reference') ? 'bi bi-chevron-down' : 'bi bi-chevron-up'),
        "aria-hidden": "true"
      }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_74), !_ctx.isDuaSectionCollapsed(dua, 'reference') ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        id: `dua-reference-${dua.id}`,
        class: "dua-card-meta"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "dua-card-reference",
        innerHTML: _ctx.highlightText(dua.reference)
      }, null, 8 /* PROPS */, _hoisted_76)], 8 /* PROPS */, _hoisted_75)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_77, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_78, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "dua-font-btn",
        onClick: _cache[21] || (_cache[21] = $event => _ctx.changeFontSize('decrease')),
        disabled: _ctx.fontSize <= 14,
        "aria-label": "Decrease font size"
      }, [...(_cache[51] || (_cache[51] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-dash-circle-fill"
      }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_79), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "dua-font-btn",
        onClick: _cache[22] || (_cache[22] = $event => _ctx.changeFontSize('increase')),
        disabled: _ctx.fontSize >= 28,
        "aria-label": "Increase font size"
      }, [...(_cache[52] || (_cache[52] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-plus-circle-fill"
      }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_80)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_81, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "dua-action-btn",
        onClick: $event => _ctx.toggleLike(dua.id),
        "aria-label": _ctx.likedDuas.includes(dua.id) ? 'Unlike Dua' : 'Like Dua'
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(_ctx.likedDuas.includes(dua.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart')
      }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_82), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "dua-action-btn",
        onClick: $event => _ctx.shareOnWhatsApp(dua),
        "aria-label": "Share on WhatsApp"
      }, [...(_cache[53] || (_cache[53] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-share-fill"
      }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_83), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "dua-action-btn",
        onClick: $event => _ctx.copyContent(dua),
        "aria-label": "Copy Content"
      }, [...(_cache[54] || (_cache[54] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-clipboard-fill"
      }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_84), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "dua-action-btn",
        onClick: $event => _ctx.downloadSingleDua(dua, category.name),
        "aria-label": "Download Dua as text"
      }, [...(_cache[55] || (_cache[55] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-download"
      }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_85), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "dua-action-btn",
        onClick: $event => _ctx.printDua(dua),
        "aria-label": "Print Dua"
      }, [...(_cache[56] || (_cache[56] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-printer-fill"
      }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_86), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "dua-action-btn dua-action-btn--report",
        onClick: $event => _ctx.openSectionReport({
          sectionId: `dua-${dua.id}`,
          sectionTitle: `${dua.title} (${category.name})`
        }),
        "aria-label": `Report an issue with ${dua.title}`,
        title: "Report an issue"
      }, [...(_cache[57] || (_cache[57] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-flag-fill"
      }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_87)])])], 14 /* CLASS, STYLE, PROPS */, _hoisted_61)]);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !category.collapsed && category.duas.length > _ctx.duasPerPage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_88, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", _hoisted_89, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_90, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["page-item", {
        disabled: _ctx.currentPage[category.id] === 1
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "page-link",
      onClick: $event => _ctx.changePage('prev', category.id),
      "aria-label": "Previous page"
    }, [...(_cache[58] || (_cache[58] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      "aria-hidden": "true"
    }, "« Previous", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_91)], 2 /* CLASS */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.totalPages(category.duas), page => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: page,
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["page-item", {
          active: _ctx.currentPage[category.id] === page
        }])
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "page-link",
        onClick: $event => _ctx.currentPage[category.id] = page
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(page), 9 /* TEXT, PROPS */, _hoisted_92)], 2 /* CLASS */);
    }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["page-item", {
        disabled: _ctx.currentPage[category.id] === _ctx.totalPages(category.duas)
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "page-link",
      onClick: $event => _ctx.changePage('next', category.id),
      "aria-label": "Next page"
    }, [...(_cache[59] || (_cache[59] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      "aria-hidden": "true"
    }, "Next »", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_93)], 2 /* CLASS */)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 8 /* PROPS */, _hoisted_53);
  }), 128 /* KEYED_FRAGMENT */))], 8 /* PROPS */, _hoisted_52), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_ctx.showScrollToTop ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: 0,
      type: "button",
      class: "dua-fab-scroll",
      onClick: _cache[23] || (_cache[23] = (...args) => _ctx.scrollToTop && _ctx.scrollToTop(...args)),
      "aria-label": "Scroll to top",
      title: "Scroll to top"
    }, [...(_cache[60] || (_cache[60] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-arrow-up-short",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SectionReportModal, {
    ref: "sectionReportModal",
    "page-name": "Dua Library"
  }, null, 512 /* NEED_PATCH */)], 2 /* CLASS */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/SectionReportModal.vue?vue&type=template&id=697eead3&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/SectionReportModal.vue?vue&type=template&id=697eead3&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = ["id", "aria-labelledby"];
const _hoisted_2 = {
  class: "modal-dialog modal-dialog-centered section-report-dialog"
};
const _hoisted_3 = {
  class: "modal-content section-report-modal"
};
const _hoisted_4 = {
  class: "modal-header"
};
const _hoisted_5 = ["id"];
const _hoisted_6 = {
  class: "modal-body"
};
const _hoisted_7 = {
  key: 0,
  class: "section-report-context mb-3"
};
const _hoisted_8 = {
  class: "section-report-contact-grid mb-3"
};
const _hoisted_9 = ["for"];
const _hoisted_10 = ["id", "disabled"];
const _hoisted_11 = ["for"];
const _hoisted_12 = ["id", "disabled"];
const _hoisted_13 = {
  class: "mb-3"
};
const _hoisted_14 = ["for"];
const _hoisted_15 = ["id", "disabled"];
const _hoisted_16 = ["value"];
const _hoisted_17 = {
  class: "mb-3"
};
const _hoisted_18 = ["for"];
const _hoisted_19 = ["id", "disabled"];
const _hoisted_20 = ["for"];
const _hoisted_21 = ["id", "disabled"];
const _hoisted_22 = {
  class: "section-report-counter d-block mt-2"
};
const _hoisted_23 = {
  class: "modal-footer"
};
const _hoisted_24 = ["disabled"];
const _hoisted_25 = ["disabled"];
const _hoisted_26 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2",
  "aria-hidden": "true"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal fade section-report-root",
    id: $data.modalId,
    tabindex: "-1",
    "aria-labelledby": `${$data.modalId}-label`,
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-report-kicker mb-1"
  }, "Report a mistake", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title",
    id: `${$data.modalId}-label`
  }, "Report this section", 8 /* PROPS */, _hoisted_5)]), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.submitReport && $options.submitReport(...args), ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [$options.sectionLabel ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Section", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.sectionLabel), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.statusMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 1,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["alert mb-3", $options.statusClass]),
    role: "status"
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.statusMessage), 3 /* TEXT, CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label",
    for: `${$data.modalId}-firstname`
  }, [...(_cache[9] || (_cache[9] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("First name ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "(optional)", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_9), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: `${$data.modalId}-firstname`,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.form.firstname = $event),
    type: "text",
    class: "form-control",
    maxlength: "60",
    placeholder: "Your first name",
    autocomplete: "given-name",
    disabled: $data.submitting
  }, null, 8 /* PROPS */, _hoisted_10), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.firstname, void 0, {
    trim: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label",
    for: `${$data.modalId}-email`
  }, "Email address", 8 /* PROPS */, _hoisted_11), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: `${$data.modalId}-email`,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.form.email = $event),
    type: "email",
    class: "form-control",
    maxlength: "255",
    placeholder: "you@example.com",
    autocomplete: "email",
    disabled: $data.submitting,
    required: ""
  }, null, 8 /* PROPS */, _hoisted_12), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.email, void 0, {
    trim: true
  }]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label",
    for: `${$data.modalId}-type`
  }, "Report a", 8 /* PROPS */, _hoisted_14), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: `${$data.modalId}-type`,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.form.reportType = $event),
    class: "form-select",
    disabled: $data.submitting,
    required: ""
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.reportOptions, option => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: option.value,
      value: option.value
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.label), 9 /* TEXT, PROPS */, _hoisted_16);
  }), 128 /* KEYED_FRAGMENT */))], 8 /* PROPS */, _hoisted_15), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.reportType]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label",
    for: `${$data.modalId}-title`
  }, "Title", 8 /* PROPS */, _hoisted_18), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: `${$data.modalId}-title`,
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.form.title = $event),
    type: "text",
    class: "form-control",
    maxlength: "120",
    placeholder: "Short summary",
    disabled: $data.submitting,
    required: ""
  }, null, 8 /* PROPS */, _hoisted_19), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.title, void 0, {
    trim: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label",
    for: `${$data.modalId}-description`
  }, "Description", 8 /* PROPS */, _hoisted_20), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    id: `${$data.modalId}-description`,
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.form.description = $event),
    class: "form-control",
    rows: "5",
    maxlength: "1200",
    placeholder: "What should we review?",
    disabled: $data.submitting,
    required: ""
  }, null, 8 /* PROPS */, _hoisted_21), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.description, void 0, {
    trim: true
  }]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.description.length) + "/1200 characters", 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary",
    "data-bs-dismiss": "modal",
    disabled: $data.submitting
  }, " Close ", 8 /* PROPS */, _hoisted_24), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-warning section-report-submit",
    disabled: $data.submitting || !$options.canSubmit
  }, [$data.submitting ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_26)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.submitting ? 'Sending...' : 'Submit report'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_25)])], 32 /* NEED_HYDRATION */)])])], 8 /* PROPS */, _hoisted_1)]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./resources/components/scripts/DuaComponent.script.js?vue&type=script&lang=js&external":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./resources/components/scripts/DuaComponent.script.js?vue&type=script&lang=js&external ***!
  \****************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/bookmarkAuth */ "./resources/js/utils/bookmarkAuth.js");
/* harmony import */ var _js_composables_useDuaRecommender__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../js/composables/useDuaRecommender */ "./resources/js/composables/useDuaRecommender.js");
/* harmony import */ var _vue_duaCollection_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../vue/duaCollection.json */ "./resources/components/vue/duaCollection.json");
/* harmony import */ var _vue_modals_SectionReportModal_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../vue/modals/SectionReportModal.vue */ "./resources/components/vue/modals/SectionReportModal.vue");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






const {
  createDuaMetadata
} = __webpack_require__(/*! ../utils/duaSlugs */ "./resources/js/utils/duaSlugs.js");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    SectionReportModal: _vue_modals_SectionReportModal_vue__WEBPACK_IMPORTED_MODULE_5__["default"]
  },
  setup() {
    const recommendationInput = (0,vue__WEBPACK_IMPORTED_MODULE_1__.ref)('');
    const {
      matchedDuas: recommendationDuas,
      matchedKeywords: recommendationKeywords,
      loading: recommendationLoading,
      error: recommendationError,
      recommend,
      clearResults
    } = (0,_js_composables_useDuaRecommender__WEBPACK_IMPORTED_MODULE_3__.useDuaRecommender)(_vue_duaCollection_json__WEBPACK_IMPORTED_MODULE_4__);
    const runDuaRecommendation = async () => {
      await recommend(recommendationInput.value);
    };
    const clearDuaRecommendation = () => {
      recommendationInput.value = '';
      clearResults();
    };
    return {
      recommendationInput,
      recommendationDuas,
      recommendationKeywords,
      recommendationLoading,
      recommendationError,
      runDuaRecommendation,
      clearDuaRecommendation
    };
  },
  data() {
    const initialUserId = (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__.resolveClientUserId)();
    return {
      duaCollection: [],
      searchQuery: '',
      selectedCategory: '',
      selectedReference: '',
      currentPage: {},
      duasPerPage: 20,
      showCopyMessage: false,
      fontSize: 18,
      storageUserId: initialUserId,
      isAuthenticated: !!initialUserId,
      preferencesLoaded: false,
      likedDuas: [],
      loginWarnings: {},
      warningTimers: {},
      authWarning: '',
      authWarningTimer: null,
      viewMode: 'all',
      searchTags: ['All', 'Forgiveness', 'Protection', 'Gratitude', 'Healing', 'Guidance', 'Patience', 'Success', 'Mercy', 'Peace', 'Provision', 'Strength', 'Repentance'],
      selectedTag: '',
      tagSynonyms: {
        Forgiveness: ['pardon', 'mercy', 'forgive'],
        Protection: ['safety', 'guard', 'shield'],
        Gratitude: ['thanks', 'appreciation', 'thankful'],
        Healing: ['cure', 'recovery', 'health'],
        Guidance: ['direction', 'path', 'lead'],
        Patience: ['endurance', 'perseverance', 'calm'],
        Success: ['achievement', 'victory', 'prosperity'],
        Mercy: ['compassion', 'kindness', 'forgiveness'],
        Peace: ['tranquility', 'calm', 'serenity'],
        Provision: ['sustenance', 'wealth', 'blessings'],
        Strength: ['power', 'resilience', 'fortitude'],
        Repentance: ['regret', 'atonement', 'penitence'],
        Faith: ['belief', 'trust', 'devotion'],
        Knowledge: ['wisdom', 'understanding', 'learning'],
        Family: ['kin', 'household', 'relatives'],
        Justice: ['fairness', 'equity', 'righteousness'],
        Hope: ['optimism', 'aspiration', 'expectation'],
        Charity: ['generosity', 'almsgiving', 'benevolence']
      },
      showScrollToTop: false,
      actionFeedback: {},
      errorMessage: null,
      isLoading: true,
      nextStepMinimized: false,
      staticDuaSlug: typeof window !== 'undefined' ? window.__duaSlug || '' : '',
      staticDuaMatch: null,
      showDuaRecommender: false,
      currentlyPlayingAudioId: null,
      audioElement: null,
      speechUtterance: null,
      speechSupported: typeof window !== 'undefined' && 'speechSynthesis' in window,
      speechVoices: [],
      isDarkMode: false,
      _cleanupDone: false
    };
  },
  computed: {
    allDuasCount() {
      return this.duaCollection.reduce((sum, category) => {
        var _category$duas;
        return sum + (((_category$duas = category.duas) === null || _category$duas === void 0 ? void 0 : _category$duas.length) || 0);
      }, 0);
    },
    visibleDuasCount() {
      return this.filteredDuas.reduce((sum, category) => {
        var _category$duas2;
        return sum + (((_category$duas2 = category.duas) === null || _category$duas2 === void 0 ? void 0 : _category$duas2.length) || 0);
      }, 0);
    },
    activeFilterPills() {
      const pills = [];
      if (this.searchQuery.trim()) {
        pills.push({
          key: 'query',
          label: `Search: ${this.searchQuery.trim()}`
        });
      }
      if (this.selectedCategory) {
        const category = this.duaCollection.find(item => item.id === parseInt(this.selectedCategory));
        pills.push({
          key: 'category',
          label: `Category: ${category ? category.name : this.selectedCategory}`
        });
      }
      if (this.selectedReference) {
        pills.push({
          key: 'reference',
          label: `Reference: ${this.selectedReference}`
        });
      }
      if (this.selectedTag) {
        pills.push({
          key: 'tag',
          label: `Tag: ${this.selectedTag}`
        });
      }
      if (this.viewMode === 'liked') {
        pills.push({
          key: 'view',
          label: 'View: Liked'
        });
      }
      return pills;
    },
    uniqueReferences() {
      const references = new Set();
      this.duaCollection.forEach(category => {
        category.duas.forEach(dua => {
          if (dua.reference) {
            references.add(dua.reference);
          }
        });
      });
      return [...references].map(ref => ({
        full: ref,
        display: ref.split(',')[0].trim()
      })).sort((a, b) => a.display.localeCompare(b.display));
    },
    likedDuasCount() {
      const validIds = this.likedDuas.filter(id => {
        const [categoryId, duaId] = id.split('-');
        const category = this.duaCollection.find(c => c.id === parseInt(categoryId));
        return category && category.duas.some(dua => dua.id === id);
      });
      return validIds.length;
    },
    filteredCategories() {
      if (this.staticDuaSlug) {
        if (!this.staticDuaMatch) {
          return [];
        }
        const target = this.staticDuaMatch;
        return this.duaCollection.map(category => {
          if (category.id !== target.categoryId) {
            return _objectSpread(_objectSpread({}, category), {}, {
              duas: []
            });
          }
          return _objectSpread(_objectSpread({}, category), {}, {
            duas: category.duas.filter(dua => dua.slug === target.slug)
          });
        }).filter(category => category.duas.length > 0);
      }
      let filteredCollection = this.duaCollection;
      if (this.viewMode === 'liked') {
        filteredCollection = filteredCollection.map(category => _objectSpread(_objectSpread({}, category), {}, {
          duas: category.duas.filter(dua => this.likedDuas.includes(dua.id))
        })).filter(category => category.duas.length > 0);
        return filteredCollection;
      }
      if (this.selectedCategory) {
        filteredCollection = filteredCollection.filter(category => category.id === parseInt(this.selectedCategory));
      }
      if (this.selectedReference) {
        filteredCollection = filteredCollection.map(category => _objectSpread(_objectSpread({}, category), {}, {
          duas: category.duas.filter(dua => dua.reference === this.selectedReference)
        })).filter(category => category.duas.length > 0);
      }
      if (!this.searchQuery.trim() && !this.selectedTag) {
        return filteredCollection;
      }
      return filteredCollection.map(category => {
        const filteredDuas = category.duas.filter(dua => {
          const searchQueryLower = this.searchQuery.trim().toLowerCase();
          const tagLower = this.selectedTag.toLowerCase();
          const synonyms = this.tagSynonyms[this.selectedTag] || [];
          const synonymLower = synonyms.map(s => s.toLowerCase());
          const queryMatch = this.searchQuery.trim() ? (dua.title || '').toLowerCase().includes(searchQueryLower) || (dua.arabic || '').toLowerCase().includes(searchQueryLower) || (dua.transliteration || '').toLowerCase().includes(searchQueryLower) || (dua.translation || '').toLowerCase().includes(searchQueryLower) || (dua.reference || '').toLowerCase().includes(searchQueryLower) : true;
          const tagMatch = this.selectedTag ? (dua.title || '').toLowerCase().includes(tagLower) || (dua.arabic || '').toLowerCase().includes(tagLower) || (dua.transliteration || '').toLowerCase().includes(tagLower) || (dua.translation || '').toLowerCase().includes(tagLower) || (dua.reference || '').toLowerCase().includes(tagLower) || synonymLower.some(syn => (dua.title || '').toLowerCase().includes(syn) || (dua.arabic || '').toLowerCase().includes(syn) || (dua.transliteration || '').toLowerCase().includes(syn) || (dua.translation || '').toLowerCase().includes(syn) || (dua.reference || '').toLowerCase().includes(syn)) : true;
          return queryMatch && tagMatch;
        });
        return _objectSpread(_objectSpread({}, category), {}, {
          duas: filteredDuas
        });
      }).filter(category => category.duas.length > 0);
    },
    filteredDuas() {
      return this.filteredCategories;
    },
    hasActiveFilters() {
      return Boolean(this.searchQuery || this.selectedTag || this.selectedReference);
    },
    allDuasLikedInCategory() {
      return categoryId => {
        const category = this.duaCollection.find(c => c.id === categoryId);
        if (!category || !category.duas.length) return false;
        return category.duas.every(dua => this.likedDuas.includes(dua.id));
      };
    }
  },
  methods: {
    hydrateDuaCollection(data) {
      if (!data || !Array.isArray(data.categories)) {
        throw new Error('Invalid JSON structure: categories not found or not an array');
      }
      this.duaCollection = data.categories.map(category => _objectSpread(_objectSpread({}, category), {}, {
        collapsed: false,
        duas: category.duas.map((dua, index) => {
          const originalId = dua.id || index + 1;
          return _objectSpread(_objectSpread({}, dua), {}, {
            id: `${category.id}-${originalId}`,
            originalId,
            collapsedSections: {
              transliteration: false,
              translation: false,
              reference: false
            }
          });
        })
      }));
      const ids = new Set();
      this.duaCollection.forEach(category => {
        category.duas.forEach(dua => {
          if (ids.has(dua.id)) {
            console.warn(`Duplicate dua ID found: ${dua.id}`);
          }
          ids.add(dua.id);
        });
      });
      this.resetPagination();
      this.applyStaticDuaSlug();
    },
    removeFilter(filterType) {
      if (filterType === 'query') this.searchQuery = '';
      if (filterType === 'category') this.selectedCategory = '';
      if (filterType === 'reference') this.selectedReference = '';
      if (filterType === 'tag') this.selectedTag = '';
      if (filterType === 'view') this.viewMode = 'all';
      this.resetPagination();
    },
    openSectionReport(context = {}) {
      var _this$$refs$sectionRe;
      (_this$$refs$sectionRe = this.$refs.sectionReportModal) === null || _this$$refs$sectionRe === void 0 || _this$$refs$sectionRe.open(_objectSpread({
        pageName: 'Dua Library'
      }, context));
    },
    async resolveStorageScope() {
      const resolvedId = await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__.fetchUserIdFromApi)();
      this.storageUserId = resolvedId;
      this.isAuthenticated = !!resolvedId;
      if (this.isAuthenticated) {
        await this.loadPreferences();
      } else {
        this.likedDuas = [];
        this.preferencesLoaded = true;
      }
    },
    async loadPreferences() {
      try {
        var _response$data;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/preferences/liked_duas');
        this.likedDuas = Array.isArray((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.value) ? response.data.value : [];
      } catch (e) {
        this.likedDuas = [];
      } finally {
        this.preferencesLoaded = true;
      }
    },
    async savePreferences() {
      if (!this.isAuthenticated) return;
      try {
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].put('/api/preferences/liked_duas', {
          value: this.likedDuas
        });
      } catch (e) {}
    },
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
    },
    getTagIcon(tag) {
      const icons = {
        'All': 'bi-grid-fill',
        'Forgiveness': 'bi-heart-fill',
        'Protection': 'bi-shield-fill',
        'Gratitude': 'bi-emoji-smile-fill',
        'Healing': 'bi-heart-pulse-fill',
        'Guidance': 'bi-signpost-fill',
        'Patience': 'bi-hourglass-split',
        'Success': 'bi-trophy-fill',
        'Mercy': 'bi-hand-thumbs-up-fill',
        'Peace': 'bi-peace-fill',
        'Provision': 'bi-basket-fill',
        'Strength': 'bi-lightning-charge-fill',
        'Repentance': 'bi-arrow-counterclockwise'
      };
      return `bi ${icons[tag] || 'bi-tag-fill'}`;
    },
    highlightText(text) {
      if (!text) return '';
      const raw = text.toString();

      // If no search or tag filters, return escaped text
      if (!this.searchQuery.trim() && !this.selectedTag) {
        return raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }

      // Escape first to avoid injecting existing markup, then re-inject highlights
      let escaped = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      // Highlight search terms
      const searchTerms = this.searchQuery.trim() ? [this.searchQuery] : [];
      searchTerms.forEach(term => {
        const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')})`, 'gi');
        escaped = escaped.replace(regex, '<mark class="mark-search">$1</mark>');
      });

      // Highlight selected tag and its synonyms
      const tagTerms = this.selectedTag ? [this.selectedTag, ...(this.tagSynonyms[this.selectedTag] || [])] : [];
      tagTerms.forEach(term => {
        const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')})`, 'gi');
        escaped = escaped.replace(regex, '<mark class="mark-tag">$1</mark>');
      });
      return escaped;
    },
    toggleTag(tag) {
      this.selectedTag = tag === 'All' || this.selectedTag === tag ? '' : tag;
      this.resetPagination();
    },
    clearSearch() {
      this.searchQuery = '';
      this.selectedTag = '';
      this.selectedReference = '';
      this.resetPagination();
    },
    changeFontSize(action) {
      if (action === 'increase') {
        this.fontSize = Math.min(this.fontSize + 2, 28);
      } else if (action === 'decrease' && this.fontSize > 14) {
        this.fontSize -= 2;
      }
    },
    sanitizeFileName(value = '') {
      const normalized = String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
      return normalized || 'dua';
    },
    buildDuaTextContent(dua = {}, index = null) {
      const lines = [];
      if (Number.isInteger(index)) {
        lines.push(`Dua ${index + 1}`);
      }
      lines.push(`Title: ${dua.title || ''}`);
      lines.push(`Arabic: ${dua.arabic || ''}`);
      lines.push(`Transliteration: ${dua.transliteration || ''}`);
      lines.push(`Translation: ${dua.translation || ''}`);
      lines.push(`Reference: ${dua.reference || ''}`);
      return lines.join('\n');
    },
    downloadTextFile(content = '', fileName = 'dua.txt') {
      if (typeof window === 'undefined') return;
      const blob = new Blob([content], {
        type: 'text/plain;charset=utf-8'
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        URL.revokeObjectURL(url);
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      }, 200);
    },
    downloadSingleDua(dua, categoryName = '') {
      if (!dua) return;
      const header = ['Islamic Connect - Dua Export', categoryName ? `Category: ${categoryName}` : ''].filter(Boolean).join('\n');
      const body = this.buildDuaTextContent(dua);
      const content = `${header}\n\n${body}\n`;
      const fileName = `${this.sanitizeFileName(dua.title || 'dua')}.txt`;
      this.downloadTextFile(content, fileName);
    },
    downloadCategoryDuas(category) {
      if (!category || !Array.isArray(category.duas) || !category.duas.length) return;
      const header = ['Islamic Connect - Dua Section Export', `Section: ${category.name || 'Dua Section'}`, `Total Duas: ${category.duas.length}`].join('\n');
      const blocks = category.duas.map((dua, index) => this.buildDuaTextContent(dua, index));
      const content = `${header}\n\n${blocks.join('\n\n------------------------------\n\n')}\n`;
      const fileName = `${this.sanitizeFileName(category.name || 'dua-section')}-section.txt`;
      this.downloadTextFile(content, fileName);
    },
    copyContent(dua) {
      const text = `Dua: ${dua.title}\n\n${dua.arabic}\n\n${dua.translation}\n\nReference: ${dua.reference}`;
      navigator.clipboard.writeText(text).then(() => {
        this.showCopyMessage = true;
        setTimeout(() => {
          this.showCopyMessage = false;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy content: ', err);
      });
    },
    shareOnWhatsApp(dua) {
      const text = `Dua: ${dua.title}\n\n${dua.arabic}\n\nTranslation: ${dua.translation}\n\nReference: ${dua.reference}`;
      const encodedText = encodeURIComponent(text);
      const url = `https://wa.me/?text=${encodedText}`;
      window.open(url, '_blank');
    },
    escapePrintHtml(value = '') {
      return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    },
    formatPrintText(value = '') {
      return this.escapePrintHtml(value).replace(/\r?\n/g, '<br>');
    },
    printDua(dua) {
      if (!dua || typeof window === 'undefined') return;
      const title = this.formatPrintText(dua.title || '');
      const arabic = this.formatPrintText(dua.arabic || '');
      const transliteration = this.formatPrintText(dua.transliteration || '');
      const translation = this.formatPrintText(dua.translation || '');
      const reference = this.formatPrintText(dua.reference || '');
      const printMarkup = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Print Dua</title>
    <style>
      :root { color-scheme: light; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 1.2rem;
        font-family: Georgia, "Times New Roman", serif;
        color: #111827;
        background: #fff;
      }
      .sheet {
        max-width: 900px;
        margin: 0 auto;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 1rem 1.1rem;
      }
      h1 {
        margin: 0 0 0.9rem;
        font-size: 1.32rem;
        line-height: 1.35;
      }
      .section { margin-bottom: 0.95rem; }
      .label {
        font-size: 0.74rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #4b5563;
        margin-bottom: 0.28rem;
        font-weight: 700;
      }
      .value {
        font-size: 1rem;
        line-height: 1.65;
        white-space: normal;
        word-break: break-word;
      }
      .arabic {
        direction: rtl;
        text-align: right;
        font-family: "Amiri", "Noto Naskh Arabic", serif;
        font-size: 1.2rem;
        line-height: 2;
      }
      .muted {
        color: #6b7280;
      }
      @media print {
        body { padding: 0; }
        .sheet {
          max-width: 100%;
          border: none;
          border-radius: 0;
          padding: 0;
        }
      }
    </style>
  </head>
  <body>
    <article class="sheet">
      <h1>${title || 'Dua'}</h1>
      <section class="section">
        <div class="label">Arabic</div>
        <div class="value arabic">${arabic || '<span class="muted">Not available</span>'}</div>
      </section>
      <section class="section">
        <div class="label">Transliteration</div>
        <div class="value">${transliteration || '<span class="muted">Not available</span>'}</div>
      </section>
      <section class="section">
        <div class="label">Translation</div>
        <div class="value">${translation || '<span class="muted">Not available</span>'}</div>
      </section>
      <section class="section">
        <div class="label">Reference</div>
        <div class="value">${reference || '<span class="muted">Not available</span>'}</div>
      </section>
    </article>
  </body>
</html>`;
      const frame = document.createElement('iframe');
      frame.setAttribute('aria-hidden', 'true');
      frame.style.position = 'fixed';
      frame.style.right = '0';
      frame.style.bottom = '0';
      frame.style.width = '0';
      frame.style.height = '0';
      frame.style.border = '0';
      frame.style.opacity = '0';
      document.body.appendChild(frame);
      const cleanup = () => {
        setTimeout(() => {
          if (frame && frame.parentNode) {
            frame.parentNode.removeChild(frame);
          }
        }, 400);
      };
      const win = frame.contentWindow;
      if (!win) {
        cleanup();
        return;
      }
      const doc = win.document;
      doc.open();
      doc.write(printMarkup);
      doc.close();
      frame.onload = () => {
        win.focus();
        win.print();
        cleanup();
      };

      // Fallback for browsers that may not fire iframe onload reliably.
      setTimeout(() => {
        try {
          win.focus();
          win.print();
        } catch (e) {}
        cleanup();
      }, 450);
    },
    hasRecordedAudio(dua) {
      return Boolean(dua && dua.audio);
    },
    getAudioButtonClasses(dua) {
      const base = ['btn', 'btn-sm', 'rounded-circle', 'p-0', 'd-flex', 'align-items-center', 'justify-content-center', 'action-btn'];
      if (this.hasRecordedAudio(dua)) {
        base.push('btn-outline-secondary');
      } else {
        base.push('audio-action-btn', 'speech');
      }
      return base;
    },
    initializeSpeechVoices() {
      if (!this.speechSupported || typeof window === 'undefined') return;
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length) {
          this.speechVoices = voices;
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
      window.speechSynthesis.onvoiceschanged = updateVoices;
      updateVoices();
    },
    selectArabicVoice() {
      if (!this.speechVoices.length) return null;
      const arabicVoice = this.speechVoices.find(voice => {
        var _voice$lang;
        return (_voice$lang = voice.lang) === null || _voice$lang === void 0 ? void 0 : _voice$lang.startsWith('ar');
      });
      return arabicVoice || this.speechVoices[0];
    },
    canPlayAudio(dua) {
      return Boolean(dua && (dua.audio || this.speechSupported));
    },
    isAudioPlaying(dua) {
      return !!dua && this.currentlyPlayingAudioId === dua.id;
    },
    handleAudioPlayback(dua) {
      if (!dua) return;
      if (!this.canPlayAudio(dua)) return;
      if (this.currentlyPlayingAudioId === dua.id) {
        this.stopAudioPlayback();
        return;
      }
      this.stopAudioPlayback();
      if (dua.audio) {
        const audio = new Audio(dua.audio);
        audio.preload = 'auto';
        audio.addEventListener('ended', () => {
          if (this.currentlyPlayingAudioId === dua.id) {
            this.stopAudioPlayback();
          }
        });
        audio.addEventListener('error', () => this.stopAudioPlayback());
        this.audioElement = audio;
        this.currentlyPlayingAudioId = dua.id;
        audio.play().catch(() => this.stopAudioPlayback());
        return;
      }
      if (this.speechSupported) {
        this.playSpeechForDua(dua);
      }
    },
    playSpeechForDua(dua) {
      if (!dua) return;
      const text = dua.arabic || dua.transliteration || dua.translation || dua.title;
      if (!text || typeof window === 'undefined' || !window.speechSynthesis) return;
      const utterance = new SpeechSynthesisUtterance(text);
      const preferredVoice = this.selectArabicVoice();
      if (preferredVoice) {
        utterance.voice = preferredVoice;
        utterance.lang = preferredVoice.lang || 'ar-SA';
      } else {
        utterance.lang = 'ar-SA';
      }
      utterance.rate = 0.88;
      utterance.pitch = 1.15;
      utterance.volume = 0.95;
      utterance.addEventListener('end', () => {
        if (this.currentlyPlayingAudioId === dua.id) {
          this.stopAudioPlayback();
        }
      });
      utterance.addEventListener('error', () => {
        if (this.currentlyPlayingAudioId === dua.id) {
          this.stopAudioPlayback();
        }
      });
      this.speechUtterance = utterance;
      this.currentlyPlayingAudioId = dua.id;
      window.speechSynthesis.speak(utterance);
    },
    stopAudioPlayback() {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.audioElement = null;
      }
      if (this.speechUtterance && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        this.speechUtterance = null;
      }
      this.currentlyPlayingAudioId = null;
    },
    showLoginWarning(duaId) {
      if (!duaId) return;
      this.loginWarnings = _objectSpread(_objectSpread({}, this.loginWarnings), {}, {
        [duaId]: 'Please log in to save this dua.'
      });
      if (this.warningTimers[duaId]) {
        clearTimeout(this.warningTimers[duaId]);
      }
      this.warningTimers[duaId] = setTimeout(() => {
        const next = _objectSpread({}, this.loginWarnings);
        delete next[duaId];
        this.loginWarnings = next;
        delete this.warningTimers[duaId];
      }, 5000);
    },
    showAuthWarning(message = 'Please log in to save your liked duas.') {
      this.authWarning = message;
      if (this.authWarningTimer) {
        clearTimeout(this.authWarningTimer);
      }
      this.authWarningTimer = setTimeout(() => {
        this.authWarning = '';
        this.authWarningTimer = null;
      }, 5000);
    },
    toggleLike(duaId) {
      if (!this.isAuthenticated) {
        this.showLoginWarning(duaId);
        this.showAuthWarning();
        return;
      }
      if (!duaId) return;
      const updatedLikedDuas = [...this.likedDuas];
      if (updatedLikedDuas.includes(duaId)) {
        updatedLikedDuas.splice(updatedLikedDuas.indexOf(duaId), 1);
      } else {
        updatedLikedDuas.push(duaId);
      }
      this.likedDuas = updatedLikedDuas;
      this.savePreferences();
    },
    toggleAllInCategory(categoryId) {
      if (!this.isAuthenticated) {
        this.showAuthWarning();
        return;
      }
      const category = this.duaCollection.find(c => c.id === categoryId);
      if (!category) return;
      this.actionFeedback[categoryId] = true;
      const allLiked = this.allDuasLikedInCategory(categoryId);
      let updatedLikedDuas = [...this.likedDuas];
      if (allLiked) {
        updatedLikedDuas = updatedLikedDuas.filter(id => !category.duas.some(dua => dua.id === id));
      } else {
        updatedLikedDuas = [...new Set([...updatedLikedDuas, ...category.duas.map(dua => dua.id)])];
      }
      this.likedDuas = updatedLikedDuas;
      this.savePreferences();
      setTimeout(() => {
        this.actionFeedback[categoryId] = false;
      }, 1000);
    },
    clearAllLikedDuas() {
      if (!this.isAuthenticated) {
        this.showAuthWarning();
        return;
      }
      this.actionFeedback['clearAll'] = true;
      this.likedDuas = [];
      this.savePreferences();
      setTimeout(() => {
        this.actionFeedback['clearAll'] = false;
      }, 1000);
    },
    toggleDuaSection(dua, sectionKey) {
      if (!dua || !dua.collapsedSections) return;
      if (!(sectionKey in dua.collapsedSections)) return;
      dua.collapsedSections[sectionKey] = !dua.collapsedSections[sectionKey];
    },
    isDuaSectionCollapsed(dua, sectionKey) {
      if (!dua || !dua.collapsedSections) return false;
      return !!dua.collapsedSections[sectionKey];
    },
    toggleCategoryCollapse(categoryId) {
      const category = this.duaCollection.find(c => c.id === categoryId);
      if (category) {
        category.collapsed = !category.collapsed;
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    syncThemeFromBody() {
      this.isDarkMode = document.body.classList.contains('dua-route-page') && document.body.classList.contains('dark-mode');
    },
    handleThemeChange(event) {
      if (event !== null && event !== void 0 && event.detail && typeof event.detail.isDark === 'boolean') {
        this.isDarkMode = event.detail.isDark;
        return;
      }
      this.syncThemeFromBody();
    },
    cleanupGlobalListeners() {
      if (this._cleanupDone) return;
      this._cleanupDone = true;
      this.stopAudioPlayback();
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('ic-theme-change', this.handleThemeChange);
      Object.values(this.warningTimers || {}).forEach(timerId => clearTimeout(timerId));
      this.warningTimers = {};
      if (this.authWarningTimer) {
        clearTimeout(this.authWarningTimer);
        this.authWarningTimer = null;
      }
    },
    handleScroll() {
      const scrollPosition = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollThreshold = windowHeight * 0.05;
      this.showScrollToTop = scrollPosition > scrollThreshold;
    },
    getPaginatedDuas(duas) {
      if (!duas || !duas.length) return [];
      const start = ((this.currentPage[duas[0].id.split('-')[0]] || 1) - 1) * this.duasPerPage;
      const end = start + this.duasPerPage;
      return duas.slice(start, end);
    },
    changePage(direction, categoryId) {
      var _this$duaCollection$f;
      const totalPages = this.totalPages(((_this$duaCollection$f = this.duaCollection.find(c => c.id === categoryId)) === null || _this$duaCollection$f === void 0 ? void 0 : _this$duaCollection$f.duas) || []);
      if (direction === 'next' && this.currentPage[categoryId] < totalPages) {
        this.currentPage[categoryId]++;
      } else if (direction === 'prev' && this.currentPage[categoryId] > 1) {
        this.currentPage[categoryId]--;
      }
    },
    totalPages(duas) {
      return Math.ceil(duas.length / this.duasPerPage);
    },
    resetPagination() {
      this.currentPage = {};
      this.duaCollection.forEach(category => {
        this.currentPage[category.id] = 1;
      });
    },
    applyStaticDuaSlug() {
      if (!this.staticDuaSlug || !this.duaCollection.length) {
        return;
      }
      const metadata = createDuaMetadata({
        categories: this.duaCollection
      }, {
        assignSlugToDua: true
      });
      const match = metadata.find(entry => entry.slug === this.staticDuaSlug);
      if (!match) {
        this.staticDuaMatch = null;
        this.errorMessage = 'The Dua you requested could not be found.';
        return;
      }
      this.errorMessage = null;
      this.staticDuaMatch = match;
      this.selectedCategory = match.categoryId ? match.categoryId.toString() : '';
    }
  },
  created() {
    this._cleanupDone = false;
    this.resolveStorageScope();
    try {
      this.hydrateDuaCollection(_vue_duaCollection_json__WEBPACK_IMPORTED_MODULE_4__);
    } catch (error) {
      console.error('Error loading dua collection:', error);
      this.errorMessage = 'Failed to load dua collection. Please try again later.';
    } finally {
      this.isLoading = false;
    }
    window.addEventListener('scroll', this.handleScroll, {
      passive: true
    });
    this.initializeSpeechVoices();
  },
  mounted() {
    this.syncThemeFromBody();
    window.addEventListener('ic-theme-change', this.handleThemeChange);
  },
  beforeUnmount() {
    this.cleanupGlobalListeners();
  },
  beforeDestroy() {
    this.cleanupGlobalListeners();
  }
});

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/SectionReportModal.vue?vue&type=style&index=0&id=697eead3&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/SectionReportModal.vue?vue&type=style&index=0&id=697eead3&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./resources/components/styles/DuaComponent.style.css?vue&type=style&index=0&id=4b4cde72&scoped=true&lang=css&external":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./resources/components/styles/DuaComponent.style.css?vue&type=style&index=0&id=4b4cde72&scoped=true&lang=css&external ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/scripts/DuaComponent.script.js?vue&type=script&lang=js&external":
/*!**********************************************************************************************!*\
  !*** ./resources/components/scripts/DuaComponent.script.js?vue&type=script&lang=js&external ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_DuaComponent_script_js_vue_type_script_lang_js_external__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_DuaComponent_script_js_vue_type_script_lang_js_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./DuaComponent.script.js?vue&type=script&lang=js&external */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./resources/components/scripts/DuaComponent.script.js?vue&type=script&lang=js&external");


/***/ }),

/***/ "./resources/components/styles/DuaComponent.style.css?vue&type=style&index=0&id=4b4cde72&scoped=true&lang=css&external":
/*!*****************************************************************************************************************************!*\
  !*** ./resources/components/styles/DuaComponent.style.css?vue&type=style&index=0&id=4b4cde72&scoped=true&lang=css&external ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_DuaComponent_style_css_vue_type_style_index_0_id_4b4cde72_scoped_true_lang_css_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./DuaComponent.style.css?vue&type=style&index=0&id=4b4cde72&scoped=true&lang=css&external */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./resources/components/styles/DuaComponent.style.css?vue&type=style&index=0&id=4b4cde72&scoped=true&lang=css&external");


/***/ }),

/***/ "./resources/components/vue/DuaComponent.vue":
/*!***************************************************!*\
  !*** ./resources/components/vue/DuaComponent.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DuaComponent_vue_vue_type_template_id_4b4cde72_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DuaComponent.vue?vue&type=template&id=4b4cde72&scoped=true */ "./resources/components/vue/DuaComponent.vue?vue&type=template&id=4b4cde72&scoped=true");
/* harmony import */ var _scripts_DuaComponent_script_js_vue_type_script_lang_js_external__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/DuaComponent.script.js?vue&type=script&lang=js&external */ "./resources/components/scripts/DuaComponent.script.js?vue&type=script&lang=js&external");
/* harmony import */ var _styles_DuaComponent_style_css_vue_type_style_index_0_id_4b4cde72_scoped_true_lang_css_external__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/DuaComponent.style.css?vue&type=style&index=0&id=4b4cde72&scoped=true&lang=css&external */ "./resources/components/styles/DuaComponent.style.css?vue&type=style&index=0&id=4b4cde72&scoped=true&lang=css&external");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_scripts_DuaComponent_script_js_vue_type_script_lang_js_external__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_DuaComponent_vue_vue_type_template_id_4b4cde72_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-4b4cde72"],['__file',"resources/components/vue/DuaComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/DuaComponent.vue?vue&type=template&id=4b4cde72&scoped=true":
/*!*********************************************************************************************!*\
  !*** ./resources/components/vue/DuaComponent.vue?vue&type=template&id=4b4cde72&scoped=true ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DuaComponent_vue_vue_type_template_id_4b4cde72_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DuaComponent_vue_vue_type_template_id_4b4cde72_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DuaComponent.vue?vue&type=template&id=4b4cde72&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/DuaComponent.vue?vue&type=template&id=4b4cde72&scoped=true");


/***/ }),

/***/ "./resources/components/vue/duaCollection.json":
/*!*****************************************************!*\
  !*** ./resources/components/vue/duaCollection.json ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"categories":[{"id":1,"name":"Supplication for Forgiveness","duas":[{"id":1,"title":"Sayyidul Istighfar - The Master of Forgiveness","arabic":"اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ","transliteration":"Allahumma anta rabbi la ilaha illa anta khalaqtani wa ana \'abduka wa ana \'ala \'ahdika wa wa\'dika mastata\'tu a\'udhu bika min sharri ma sana\'tu aboo\'u laka bini\'matika \'alayya wa aboo\'u bidhanbi faghfir li fa\'innahu la yaghfirudh-dhunuba illa anta","translation":"O Allah, You are my Lord. There is no deity except You. You created me, and I am Your servant. I am committed to Your covenant and promise as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me, and I acknowledge my sin, so forgive me, for indeed none forgives sins except You.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 3; Also in Book 75 (Book of Patients), Hadith 1","tags":["anxiety","fear","forgiveness","hope"]},{"id":2,"title":"Dua for Forgiveness of All Sins","arabic":"اللَّهُمَّ اغْفِرْ لِي مَا قَدَّمْتُ وَمَا أَخَّرْتُ وَمَا أَسْرَرْتُ وَمَا أَعْلَنْتُ وَمَا أَسْرَفْتُ وَمَا أَنْتَ أَعْلَمُ بِهِ مِنِّي","transliteration":"Allahumma-ghfir li ma qaddamtu wa ma akhkhartu wa ma asrartu wa ma a\'lantu wa ma asraftu wa ma anta a\'lamu bihi minni","translation":"O Allah, forgive me what I have done in the past and what I will do in the future, what I have concealed and what I have revealed, what I have exceeded in, and what You know better than I.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 43; Also in Sunan At-Tirmidhi, Book of Supplication, Hadith 3423","tags":["forgiveness","hope"]},{"id":3,"title":"Dua for Comprehensive Forgiveness","arabic":"اللَّهُمَّ اغْفِرْ لِي خَطِيئَتِي وَجَهْلِي وَإِسْرَافِي فِي أَمْرِي وَمَا أَنْتَ أَعْلَمُ بِهِ مِنِّي","transliteration":"Allahumma-ghfir li khati\'ati wa jahli wa israfi fi amri wa ma anta a\'lamu bihi minni","translation":"O Allah, forgive my mistakes, my ignorance, my excesses in my affairs, and what You know better than I do.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 72; Also in Sahih Muslim, Book 48, Hadith 44","tags":["forgiveness","hope"]},{"id":4,"title":"Dua for Forgiveness of Intentional and Unintentional Sins","arabic":"اللَّهُمَّ اغْفِرْ لِي جِدِّي وَهَزْلِي وَخَطَئِي وَعَمْدِي وَكُلُّ ذَلِكَ عِنْدِي","transliteration":"Allahumma-ghfir li jiddi wa hazli wa khata\'i wa \'amdi wa kullu dhalika \'indi","translation":"O Allah, forgive my seriousness and my frivolity, my mistakes and my intentional sins, for all of that is within me.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 73; Also in Sahih Muslim, Book 48, Hadith 45","tags":["forgiveness","hope"]},{"id":5,"title":"Dua for Forgiveness - The Prophet\'s Prayer","arabic":"اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ","transliteration":"Allahumma inni zalamtu nafsi zulman kathiran wa la yaghfirudh-dhunuba illa anta faghfir li maghfiratan min \'indika warhamni innaka antal-ghafoorur-raheem","translation":"O Allah, I have greatly wronged myself, and no one forgives sins except You. So grant me forgiveness from Yourself and have mercy on me. Indeed, You are the Oft-Forgiving, Most Merciful.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 34; Also in Sahih Muslim, Book 48, Hadith 47","tags":["forgiveness","hope"]},{"id":6,"title":"Dua for Repentance","arabic":"رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الْغَفُورُ","transliteration":"Rabbighfir li wa tub \'alayya innaka antat-tawwabul-ghafoor","translation":"My Lord, forgive me and accept my repentance. Indeed, You are the Acceptor of Repentance, the Oft-Forgiving.","reference":"Sunan At-Tirmidhi, Book 48 (Chapters on Supplication), Hadith 3554; Graded Sahih by Al-Albani","tags":["forgiveness","hope"]},{"id":7,"title":"Dua for Seeking Pardon","arabic":"اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي","transliteration":"Allahumma innaka \'afuwwun tuhibbul-\'afwa fa\'fu \'anni","translation":"O Allah, You are Pardoning and love pardon, so pardon me.","reference":"Sunan At-Tirmidhi, Book 48 (Chapters on Supplication), Hadith 3513; Also in Sunan Ibn Majah, Book 34, Hadith 3850; Graded Sahih by Al-Albani","tags":["forgiveness","hope"]},{"id":8,"title":"Dua for Forgiveness - The Best Istighfar","arabic":"أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ","transliteration":"Astaghfirullaha alladhi la ilaha illa huwal-hayyul-qayyumu wa atubu ilayh","translation":"I seek forgiveness from Allah, the One whom there is no deity except Him, the Ever-Living, the Self-Sustaining, and I repent to Him.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 4847; Also in Sunan At-Tirmidhi, Book 48, Hadith 3577; Graded Sahih by Al-Albani","tags":["forgiveness","hope"]},{"id":9,"title":"Dua for Forgiveness Using Allah\'s Names","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ يَا اللَّهُ بِأَنَّكَ الْوَاحِدُ الْأَحَدُ الصَّمَدُ الَّذِي لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ أَنْ تَغْفِرَ لِي ذُنُوبِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ","transliteration":"Allahumma inni as\'aluka ya Allah bi\'annakal-wahidul-ahadus-samad alladhi lam yalid wa lam yoolad wa lam yakun lahu kufuwan ahad an taghfira li dhunoobi innaka antal-ghafoorur-raheem","translation":"O Allah, I ask You, O Allah, as You are the One, the Unique, the Self-Sufficient, Who has not begotten nor was begotten, and there is none comparable to Him, to forgive my sins. Indeed, You are the Oft-Forgiving, Most Merciful.","reference":"Sunan An-Nasa\'i, Book 50 (The Book of Seeking Refuge with Allah), Hadith 5511; Graded Hasan by Al-Albani","tags":["forgiveness","hope"]},{"id":10,"title":"Quranic Dua for Forgiveness","arabic":"رَبَّنَا إِنَّنَا آمَنَّا فَاغْفِرْ لَنَا ذُنُوبَنَا وَقِنَا عَذَابَ النَّارِ","transliteration":"Rabbana innana amanna faghfir lana dhunoobana wa qina \'adhaban-nar","translation":"Our Lord, indeed we have believed, so forgive us our sins and protect us from the punishment of the Fire.","reference":"Qur\'an Surah Al-Imran (3):16","tags":["anxiety","fear","forgiveness","hope"]},{"id":11,"title":"Quranic Dua for Forgiveness ","arabic":"رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي","transliteration":"Rabbi inni zalamtu nafsi faghfir li","translation":"My Lord, indeed I have wronged myself, so forgive me.","reference":"Qur\'an Surah Al-Qasas (28):16","tags":["forgiveness","hope"]},{"id":12,"title":"Dua for Forgiveness After Prayer","arabic":"سُبْحَانَكَ اللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ اللَّهُمَّ اغْفِرْ لِي","transliteration":"Subhanaka Allahumma rabbana wa bihamdika Allahumma-ghfir li","translation":"Glory be to You, O Allah, our Lord, and praise be to You. O Allah, forgive me.","reference":"Sahih Al-Bukhari, Book 79 (Book of Asking Permission), Hadith 49; Also in Sahih Muslim, Book 4 (The Book of Prayers), Hadith 222","tags":["forgiveness","gratitude","hope"]},{"id":13,"title":"Dua for Forgiveness of All Sins - Comprehensive","arabic":"اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ دِقَّهُ وَجِلَّهُ وَأَوَّلَهُ وَآخِرَهُ وَعَلَانِيَتَهُ وَسِرَّهُ","transliteration":"Allahumma-ghfir li dhanbi kullahu diqqahu wa jillahu wa awwalahu wa akhirahu wa \'alaniyatahu wa sirrahu","translation":"O Allah, forgive all my sins: the small and the great, the first and the last, the public and the private.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 46","tags":["forgiveness","hope"]},{"id":14,"title":"Dua for Purification from Sins","arabic":"اللَّهُمَّ طَهِّرْنِي مِنَ الذُّنُوبِ وَالْخَطَايَا اللَّهُمَّ نَقِّنِي مِنْهَا كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ","transliteration":"Allahumma tahhirni minadh-dhunubi wal-khathaya Allahumma naqqini minha kama yunaqqath-thawbul-abyadu minad-danas","translation":"O Allah, purify me from sins and mistakes. O Allah, cleanse me from them as a white garment is cleansed from impurity.","reference":"Sahih Al-Bukhari, Book 8 (Prayers), Hadith 163; Also in Sahih Muslim, Book 4, Hadith 216","tags":["forgiveness","hope"]},{"id":15,"title":"Simple Dua for Forgiveness","arabic":"أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ","transliteration":"Astaghfirullaha wa atubu ilayh","translation":"I seek forgiveness from Allah and repent to Him.","reference":"Sahih Al-Bukhari, Book 78 (Book of Good Manners), Hadith 111; Also in Sahih Muslim, Book 48, Hadith 31","tags":["forgiveness","hope"]},{"id":16,"title":"Quranic Dua for Forgiveness ","arabic":"رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا وَارْحَمْنَا وَأَنتَ خَيْرُ الرَّاحِمِينَ","transliteration":"Rabbana amanna faghfir lana warhamna wa anta khayrur-rahimeen","translation":"Our Lord, we have believed, so forgive us and have mercy upon us, and You are the best of the merciful.","reference":"Qur\'an Surah Al-Mu\'minun (23):109","tags":["forgiveness","hope"]},{"id":17,"title":"Dua for Forgiveness for Self and Parents","arabic":"اللَّهُمَّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ","transliteration":"Allahumma-ghfir li wa liwalidayya wa lilmu\'mineena yawma yaqoomul-hisab","translation":"O Allah, forgive me, my parents, and the believers on the Day when the account is established.","reference":"Qur\'an Surah Ibrahim (14):41","tags":["forgiveness","hope"]},{"id":18,"title":"Comprehensive Dua for Forgiveness and Protection","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَالْجُبْنِ وَالْبُخْلِ وَالْهَرَمِ وَعَذَابِ الْقَبْرِ اللَّهُمَّ آتِ نَفْسِي تَقْوَاهَا وَزَكِّهَا أَنْتَ خَيْرُ مَنْ زَكَّاهَا أَنْتَ وَلِيُّهَا وَمَوْلَاهَا اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عِلْمٍ لَا يَنْفَعُ وَمِنْ قَلْبٍ لَا يَخْشَعُ وَمِنْ نَفْسٍ لَا تَشْبَعُ وَمِنْ دَعْوَةٍ لَا يُسْتَجَابُ لَهَا","transliteration":"Allahumma inni a\'udhu bika minal-\'ajzi wal-kasali wal-jubni wal-bukhli wal-harami wa \'adhabil-qabr. Allahumma ati nafsi taqwaha wa zakkiha anta khayru man zakkaha anta waliyyuha wa mawlah. Allahumma inni a\'udhu bika min \'ilmin la yanfa\'u wa min qalbin la yakhsha\'u wa min nafsin la tashba\'u wa min da\'watin la yustajabu laha","translation":"O Allah, I seek refuge in You from inability, laziness, cowardice, miserliness, senility, and the punishment of the grave. O Allah, grant my soul its piety and purify it, for You are the best to purify it. You are its Guardian and Master. O Allah, I seek refuge in You from knowledge that does not benefit, a heart that does not humble itself, a soul that is not satisfied, and a supplication that is not answered.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 62","tags":["anxiety","fear","forgiveness","hope"]},{"id":19,"title":"Quranic Dua for Forgiveness","arabic":"رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ","transliteration":"Rabbana zalamna anfusana wa in lam taghfir lana wa tarhamna lanakoonanna minal-khasireen","translation":"Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.","reference":"Qur\'an Surah Al-A\'raf (7):23","tags":["forgiveness","hope"]},{"id":20,"title":"Quranic Dua for Forgiveness","arabic":"رَبَّنَا فَاغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا وَتَوَفَّنَا مَعَ الْأَبْرَارِ","transliteration":"Rabbana faghfir lana dhunoobana wa kaffir \'anna sayyi\'atina wa tawaffana ma\'al-abrar","translation":"Our Lord, forgive us our sins and remove from us our misdeeds and cause us to die with the righteous.","reference":"Qur\'an Surah Al-Imran (3):193","tags":["forgiveness","hope"]}]},{"id":2,"name":"Dua for Protection","duas":[{"id":1,"title":"Protection from Satan","arabic":"أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ","transliteration":"A\'udhu billahi minash-shaytanir-rajim","translation":"I seek refuge in Allah from Satan, the accursed.","reference":"Qur\'an Surah An-Nahl (16):98; Also recommended in Sunan Abu Dawud, Book 43, Hadith 54","tags":["anxiety","fear","stress"]},{"id":2,"title":"Protection from Diseases","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبَرَصِ، وَالْجُنُونِ، وَالْجُذَامِ، وَمِنْ سَيِّئِ الأَسْقَامِ","transliteration":"Allahumma inni a\'udhu bika minal-barasi, wal-jununi, wal-judhaami, wa min sayyi\'il-asqaami","translation":"O Allah, I seek refuge in You from leprosy, insanity, elephantiasis, and the worst of diseases.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 4824; Also in Sunan An-Nasa\'i, Book 50, Hadith 5493; Graded Sahih by Al-Albani","tags":["anxiety","fear","hope","stress"]},{"id":3,"title":"Surah Al-Ikhlas ant Protection","arabic":"قُلْ هُوَ اللَّهُ أَحَدٌ","transliteration":"Qul huwallahu ahad","translation":"Say, \'He is Allah, [who is] One.\'","reference":"Qur\'an Surah Al-Ikhlas (112):1-4 - The Prophet (ﷺ) said that reciting this Surah and Al-Mu\'awwidhatayn (Chapters 113 & 114) three times in the morning and evening will suffice against everything. (Sunan Abu Dawud, Book 43, Hadith 5082; Graded Sahih by Al-Albani)","tags":["anxiety","fear","stress"]},{"id":4,"title":"Surah Al-Falaq - Protection from Evil","arabic":"قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ","transliteration":"Qul a\'udhu birabbil-falaq","translation":"Say, \'I seek refuge in the Lord of daybreak.\'","reference":"Qur\'an Surah Al-Falaq (113):1-5 - The Prophet (ﷺ) used to recite this Surah and Surah An-Nas for protection from evil eye and harm. (Sahih Al-Bukhari, Book 66, Hadith 4)","tags":["anxiety","fear","stress"]},{"id":5,"title":"Surah An-Nas - Protection from Whisperings","arabic":"قُلْ أَعُوذُ بِرَبِّ النَّاسِ","transliteration":"Qul a\'udhu birabbin-nas","translation":"Say, \'I seek refuge in the Lord of mankind.\'","reference":"Qur\'an Surah An-Nas (114):1-6 - The Prophet (ﷺ) would seek refuge with Allah from the jinn and the evil eye until Surah Al-Falaq and An-Nas were revealed, then he used these two for protection. (Sunan At-Tirmidhi, Book 46, Hadith 3608; Graded Sahih)","tags":["anxiety","fear","stress"]},{"id":6,"title":"Protection from Hell, Grave, and Trials","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ وَمِنْ عَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ","transliteration":"Allahumma inni a\'udhu bika min \'adhabi jahannama wa min \'adhabil-qabri wa min fitnatil-mahya wal-mamati wa min sharri fitnatil-masihid-dajjal","translation":"O Allah, I seek refuge in You from the punishment of Hell, from the punishment of the grave, from the trials of life and death, and from the evil trial of the False Messiah.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 127; Also in Sahih Al-Bukhari, Book 9, Hadith 75","tags":["anxiety","fear","stress"]},{"id":7,"title":"Protection with Allah\'s Perfect Words","arabic":"أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ","transliteration":"A\'udhu bikalimatillahit-tammati min sharri ma khalaq","translation":"I seek refuge in the perfect words of Allah from the evil of what He has created.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 70; Also in Sahih Al-Bukhari, Book 59, Hadith 13","tags":["anxiety","fear","stress"]},{"id":8,"title":"Protection from Anxiety, Debt, and Oppression","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ وَالْبُخْلِ وَالْجُبْنِ وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ","transliteration":"Allahumma inni a\'udhu bika minal-hammi wal-hazani wal-\'ajzi wal-kasali wal-bukhli wal-jubni wa dala\'id-dayni wa ghalabatir-rijal","translation":"O Allah, I seek refuge in You from anxiety and grief, from inability and laziness, from miserliness and cowardice, from the burden of debt and from being overpowered by men.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 35; Also in Sahih Muslim, Book 48, Hadith 53","tags":["anxiety","fear","grief","loss","patience","stress"]},{"id":9,"title":"Protection from Inability, Laziness, and Punishment","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَالْجُبْنِ وَالْبُخْلِ وَالْهَرَمِ وَعَذَابِ الْقَبْرِ","transliteration":"Allahumma inni a\'udhu bika minal-\'ajzi wal-kasali wal-jubni wal-bukhli wal-harami wa \'adhabil-qabr","translation":"O Allah, I seek refuge in You from inability, laziness, cowardice, miserliness, senility, and the punishment of the grave.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 55","tags":["anxiety","fear","stress"]},{"id":10,"title":"Protection from Harm with Allah\'s Name","arabic":"بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ","transliteration":"Bismillahilladhi la yadurru ma\'as-mihi shay\'un fil-ardi wa la fis-sama\'i wa huwas-sami\'ul-\'alim","translation":"In the name of Allah, with whose name nothing can harm on earth or in heaven, and He is the All-Hearing, All-Knowing.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5088; Also in Sunan At-Tirmidhi, Book 45, Hadith 3570; Graded Sahih by Al-Albani","tags":["anxiety","fear","stress"]},{"id":11,"title":"Protection from Allah\'s Displeasure and Punishment","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِرِضَاكَ مِنْ سَخَطِكَ وَبِمُعَافَاتِكَ مِنْ عُقُوبَتِكَ وَأَعُوذُ بِكَ مِنْكَ لَا أُحْصِي ثَنَاءً عَلَيْكَ أَنْتَ كَمَا أَثْنَيْتَ عَلَى نَفْسِكَ","transliteration":"Allahumma inni a\'udhu biridaka min sakhatika wa bi-mu\'afatika min \'uqubatika wa a\'udhu bika minka la uhsi thana\'an \'alayka anta kama athnayta \'ala nafsik","translation":"O Allah, I seek refuge in Your pleasure from Your displeasure, and in Your forgiveness from Your punishment. I seek refuge in You from You. I cannot count Your praises; You are as You have praised Yourself.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 222; Also in Sunan Abu Dawud, Book 43, Hadith 4911","tags":["anxiety","fear","forgiveness","gratitude","hope","stress"]},{"id":12,"title":"Protection from Withdrawal of Blessings","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ وَتَحَوُّلِ عَافِيَتِكَ وَفُجَاءَةِ نِقْمَتِكَ وَجَمِيعِ سَخَطِكَ","transliteration":"Allahumma inni a\'udhu bika min zawali ni\'matika wa tahawwuli \'afiyatika wa fuja\'ati niqmatika wa jamee\'i sakhatik","translation":"O Allah, I seek refuge in You from the withdrawal of Your blessing, the change of Your protection, the suddenness of Your punishment, and from all Your displeasure.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 59","tags":["anxiety","fear","forgiveness","gratitude","hope","stress"]},{"id":13,"title":"Quranic Protection from Devils","arabic":"رَبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ * وَأَعُوذُ بِكَ رَبِّ أَن يَحْضُرُونِ","transliteration":"Rabbi a\'udhu bika min hamazatish-shayateen * Wa a\'udhu bika rabbi an yahduroon","translation":"My Lord, I seek refuge in You from the incitements of the devils * And I seek refuge in You, my Lord, lest they be present with me.","reference":"Qur\'an Surah Al-Mu\'minun (23):97-98","tags":["anxiety","fear","stress"]},{"id":14,"title":"Protection through Tawheed - Ayat-ul-Kursi","arabic":"اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...","transliteration":"Allahu la ilaha illa huwal-hayyul-qayyum...","translation":"Allah - there is no deity except Him, the Ever-Living, the Self-Sustaining...","reference":"Qur\'an Surah Al-Baqarah (2):255 - The Prophet (ﷺ) said that whoever recites Ayat-ul-Kursi in the morning and evening will be protected from Satan. (Sahih Al-Bukhari, Book 64, Hadith 55)","tags":["anxiety","fear","stress"]},{"id":15,"title":"Protection through Reliance on Allah","arabic":"حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ","transliteration":"Hasbiyallahu la ilaha illa huwa \'alayhi tawakkaltu wa huwa rabbul-\'arshil-\'azeem","translation":"Sufficient for me is Allah; there is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne.","reference":"Qur\'an Surah At-Tawbah (9):129; The Prophet (ﷺ) said this is a protection from harm. (Sunan Abu Dawud, Book 43, Hadith 5087)","tags":["anxiety","fear","stress"]},{"id":16,"title":"Protection from Evil Character and Deeds","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ مُنْكَرَاتِ الْأَخْلَاقِ وَالْأَعْمَالِ وَالْأَهْوَاءِ","transliteration":"Allahumma inni a\'udhu bika min munkaratil-akhlaqi wal-a\'mali wal-ahwa\'","translation":"O Allah, I seek refuge in You from evil character, evil deeds, and evil desires.","reference":"Sunan At-Tirmidhi, Book 48 (Chapters on Supplication), Hadith 3636; Graded Sahih by Al-Albani","tags":["anxiety","fear","stress"]},{"id":17,"title":"Protection from Hunger and Betrayal","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُوعِ فَإِنَّهُ بِئْسَ الضَّجِيعُ وَمِنَ الْخِيَانَةِ فَإِنَّهَا بِئْسَتِ الْبِطَانَةُ","transliteration":"Allahumma inni a\'udhu bika minal-ju\'i fa\'innahu bi\'sad-dajee\'u wa minal-khiyanati fa\'innaha bi\'satil-bitanah","translation":"O Allah, I seek refuge in You from hunger, for it is an evil companion, and I seek refuge in You from betrayal, for it is an evil inner trait.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 4834; Graded Sahih by Al-Albani","tags":["anxiety","fear","stress"]},{"id":18,"title":"Comprehensive Protection from Trials","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكَسَلِ وَالْهَرَمِ وَالْمَأْثَمِ وَالْمَغْرَمِ وَمِنْ فِتْنَةِ الْقَبْرِ وَعَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ النَّارِ وَعَذَابِ النَّارِ وَمِنْ شَرِّ فِتْنَةِ الْغِنَى وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الْفَقْرِ وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ","transliteration":"Allahumma inni a\'udhu bika minal-kasali wal-harami wal-ma\'thami wal-maghrami wa min fitnatil-qabri wa \'adhabil-qabri wa min fitnatin-nari wa \'adhabin-nari wa min sharri fitnatil-ghina wa a\'udhu bika min fitnatil-faqri wa a\'udhu bika min fitnatil-masihid-dajjal","translation":"O Allah, I seek refuge in You from laziness, senility, sin, debt, the trial of the grave, the punishment of the grave, the trial of Hellfire, the punishment of Hellfire, the evil of the trial of wealth, and I seek refuge in You from the trial of poverty, and I seek refuge in You from the trial of the False Messiah.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 56","tags":["anxiety","fear","forgiveness","hope","stress"]},{"id":19,"title":"Protection from Evil of Senses and Heart","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ سَمْعِي وَمِنْ شَرِّ بَصَرِي وَمِنْ شَرِّ لِسَانِي وَمِنْ شَرِّ قَلْبِي وَمِنْ شَرِّ مَنِيِّي","transliteration":"Allahumma inni a\'udhu bika min sharri sam\'i wa min sharri basari wa min sharri lisani wa min sharri qalbi wa min sharri maniyy","translation":"O Allah, I seek refuge in You from the evil of my hearing, the evil of my sight, the evil of my tongue, the evil of my heart, and the evil of my passion.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 4822; Graded Sahih by Al-Albani","tags":["anxiety","fear","stress"]},{"id":20,"title":"Quranic Protection from Hellfire","arabic":"رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ إِنَّ عَذَابَهَا كَانَ غَرَامًا * إِنَّهَا سَاءَتْ مُسْتَقَرًّا وَمُقَامًا","transliteration":"Rabbana-srif \'anna \'adhaba jahannama inna \'adhabaha kana gharama * innaha sa\'at mustaqarran wa muqama","translation":"Our Lord, avert from us the punishment of Hell. Indeed, its punishment is ever adhering * Indeed, it is evil as a settlement and residence.","reference":"Qur\'an Surah Al-Furqan (25):65-66","tags":["anxiety","fear","stress"]}]},{"id":3,"name":"Dua for Ease","duas":[{"id":1,"title":"Dua for Ease in Affairs","arabic":"رَبِّ اشْرَحْ لِي صَدْرِي * وَيَسِّرْ لِي أَمْرِي","transliteration":"Rabbish-rah li sadri * Wa yassir li amri","translation":"My Lord, expand for me my chest * And ease for me my task.","reference":"Qur\'an Surah Ta-Ha (20):25-26 - The dua of Prophet Musa (Moses) when he was tasked with delivering Allah\'s message to Pharaoh.","tags":["anxiety","hope","stress"]},{"id":2,"title":"Dua When Things Become Difficult","arabic":"اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا","transliteration":"Allahumma la sahla illa ma ja\'altahu sahla wa anta taj\'alul-hazna idha shi\'ta sahla","translation":"O Allah, there is no ease except what You make easy, and You make the difficult easy if You wish.","reference":"Ibn Hibban in his Sahih, Book 3 (Supplications), Hadith 972; Also in Sahih Ibn Hibban, Hadith 2427; Graded Sahih by Al-Albani","tags":["anxiety","hope","stress"]},{"id":3,"title":"Dua for Well-being in Both Worlds","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ","transliteration":"Allahumma inni as\'alukal-\'afiyata fid-dunya wal-akhirah","translation":"O Allah, I ask You for well-being in this world and the Hereafter.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3851; Also in Sunan Abu Dawud, Book 43, Hadith 5085; Graded Sahih by Al-Albani","tags":["anxiety","hope","stress"]},{"id":4,"title":"Dua of Yunus (Jonah) for Relief","arabic":"لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ","transliteration":"La ilaha illa anta subhanaka inni kuntu minaz-zalimin","translation":"There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.","reference":"Qur\'an Surah Al-Anbiya (21):87 - The Prophet (ﷺ) said: \\"The prayer of Dhun-Nun (Prophet Yunus) which he said while in the belly of the whale: \'La ilaha illa anta subhanaka inni kuntu minaz-zalimin\' - No Muslim ever prays to his Lord with these words for anything but He answers his prayer.\\" (Sunan At-Tirmidhi, Book 48, Hadith 3505; Graded Sahih)","tags":["anxiety","hope","stress"]},{"id":5,"title":"Dua for Not Being Entrusted to Oneself","arabic":"اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ وَأَصْلِحْ لِي شَأْنِي كُلَّهُ لَا إِلَهَ إِلَّا أَنْتَ","transliteration":"Allahumma rahmataka arju fala takilni ila nafsi tarfata \'aynin wa aslih li sha\'ni kullahu la ilaha illa anta","translation":"O Allah, I hope for Your mercy, so do not entrust me to myself for the blink of an eye, and rectify all my affairs. There is no deity except You.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5090; Also in Musnad Ahmad, Hadith 24488; Graded Sahih by Al-Albani","tags":["anxiety","forgiveness","hope","stress"]},{"id":6,"title":"Dua for Help - Ya Hayyu Ya Qayyum","arabic":"يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ","transliteration":"Ya Hayyu ya Qayyumu birahmatika astagheethu aslih li sha\'ni kullahu wa la takilni ila nafsi tarfata \'ayn","translation":"O Ever-Living, O Self-Sustaining, by Your mercy I seek help. Rectify all my affairs and do not entrust me to myself for the blink of an eye.","reference":"Sunan An-Nasa\'i, Book 50 (The Book of Seeking Refuge with Allah), Hadith 5521; Also in Al-Mustadrak by Al-Hakim, Hadith 1937; Graded Hasan by Al-Albani","tags":["anxiety","forgiveness","hope","stress"]},{"id":7,"title":"Comprehensive Dua for Relief from Anxiety","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْهَمِّ وَالْحَزَنِ وَأَعُوذُ بِكَ مِنْ الْعَجْزِ وَالْكَسَلِ وَأَعُوذُ بِكَ مِنْ الْجُبْنِ وَالْبُخْلِ وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ","transliteration":"Allahumma inni a\'udhu bika minal-hammi wal-hazani wa a\'udhu bika minal-\'ajzi wal-kasali wa a\'udhu bika minal-jubni wal-bukhli wa a\'udhu bika min ghalabatid-dayni wa qahrir-rijal","translation":"O Allah, I seek refuge in You from anxiety and grief, I seek refuge in You from inability and laziness, I seek refuge in You from cowardice and miserliness, and I seek refuge in You from the burden of debt and the oppression of men.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 35; Also in Sahih Muslim, Book 48, Hadith 53","tags":["anxiety","grief","hope","loss","patience","stress"]},{"id":8,"title":"Dua for Unity and Goodness","arabic":"اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا وَأَصْلِحْ ذَاتَ بَيْنِنَا وَاهْدِنَا سُبُلَ السَّلَامِ وَنَجِّنَا مِنَ الظُّلُمَاتِ إِلَى النُّورِ وَجَنِّبْنَا الْفَوَاحِشَ مَا ظَهَرَ مِنْهَا وَمَا بَطَنَ","transliteration":"Allahumma allif bayna quloobina wa aslih dhata baynina wahdina subulas-salami wa najjina minadh-dhulumati ilan-nuri wa jannibnal-fawahisha ma dhahara minha wa ma batana","translation":"O Allah, unite our hearts, rectify our affairs, guide us to the paths of peace, bring us out of darkness into light, and keep us away from obscenities, both open and secret.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5125; Graded Hasan by Al-Albani","tags":["anxiety","guidance","hope","stress"]},{"id":9,"title":"Dua for Guidance, Piety, Chastity, and Sufficiency","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى","transliteration":"Allahumma inni as\'alukal-huda wat-tuqa wal-\'afafa wal-ghina","translation":"O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 50","tags":["anxiety","guidance","hope","stress"]},{"id":10,"title":"Dua for All Good and Protection from All Evil","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنَ الْخَيْرِ كُلِّهِ عَاجِلِهِ وَآجِلِهِ مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ وَأَعُوذُ بِكَ مِنَ الشَّرِّ كُلِّهِ عَاجِلِهِ وَآجِلِهِ مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ","transliteration":"Allahumma inni as\'aluka minal-khayri kullihi \'ajilihi wa ajilihi ma \'alimtu minhu wa ma lam a\'lam wa a\'udhu bika minash-sharri kullihi \'ajilihi wa ajilihi ma \'alimtu minhu wa ma lam a\'lam","translation":"O Allah, I ask You for all that is good, in this world and the Hereafter, what I know and what I do not know. I seek refuge in You from all that is evil, in this world and the Hereafter, what I know and what I do not know.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3846; Also in Musnad Ahmad, Hadith 16345; Graded Sahih by Al-Albani","tags":["anxiety","fear","hope","stress"]},{"id":11,"title":"Dua for Beneficial Knowledge and Good Provision","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا","transliteration":"Allahumma inni as\'aluka \'ilman nafi\'an wa rizqan tayyiban wa \'amalan mutaqabbalan","translation":"O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3835; Also in Musnad Ahmad, Hadith 25147; Graded Sahih by Al-Albani","tags":["anxiety","hope","stress"]},{"id":12,"title":"Dua of Musa (Moses) for Need","arabic":"رَبِّ إِنِّي لِمَا أَنْزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ","transliteration":"Rabbi inni lima anzalta ilayya min khayrin faqeer","translation":"My Lord, indeed I am, for whatever good You would send down to me, in need.","reference":"Qur\'an Surah Al-Qasas (28):24 - The dua of Prophet Musa (Moses) when he arrived in Madyan and was in need.","tags":["anxiety","hope","stress"]},{"id":13,"title":"Dua for Sufficiency through Halal","arabic":"اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ","transliteration":"Allahumma-kfini bihalalika \'an haramika wa aghnini bifadlika \'amman siwaka","translation":"O Allah, suffice me with what You have permitted rather than what You have forbidden, and make me independent of all others by Your bounty.","reference":"Sunan At-Tirmidhi, Book 48 (Chapters on Supplication), Hadith 3575; Graded Hasan by Al-Albani","tags":["anxiety","hope","stress"]},{"id":14,"title":"Dua for Debt Relief and Enrichment","arabic":"اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ وَرَبَّ الْعَرْشِ الْعَظِيمِ رَبَّنَا وَرَبَّ كُلِّ شَيْءٍ فَالِقَ الْحَبِّ وَالنَّوَى وَمُنْزِلَ التَّوْرَاةِ وَالْإِنْجِيلِ وَالْفُرْقَانِ أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ شَيْءٍ أَنْتَ آخِذٌ بِنَاصِيَتِهِ اللَّهُمَّ أَنْتَ الْأَوَّلُ فَلَيْسَ قَبْلَكَ شَيْءٌ وَأَنْتَ الْآخِرُ فَلَيْسَ بَعْدَكَ شَيْءٌ وَأَنْتَ الظَّاهِرُ فَلَيْسَ فَوْقَكَ شَيْءٌ وَأَنْتَ الْبَاطِنُ فَلَيْسَ دُونَكَ شَيْءٌ اقْضِ عَنَّا الدَّيْنَ وَأَغْنِنَا مِنَ الْفَقْرِ","transliteration":"Allahumma rabbas-samawatis-sab\'i wa rabbal-\'arshil-\'azeem, rabbana wa rabba kulli shay\'in, faliqal-habbi wan-nawa wa munzilat-tawrati wal-injeeli wal-furqan, a\'udhu bika min sharri kulli shay\'in anta akhidhun binasiyatih. Allahumma antal-awwalu falaysa qablaka shay\', wa antal-akhiru falaysa ba\'daka shay\', wa antadh-dhahiru falaysa fawqaka shay\', wa antal-batinu falaysa doonaka shay\', iqdi \'annad-dayna wa aghnina minal-faqr","translation":"O Allah, Lord of the seven heavens and Lord of the Great Throne, our Lord and the Lord of everything, Splitter of the seed and the date stone, Revealer of the Torah, the Gospel, and the Criterion, I seek refuge in You from the evil of everything You seize by the forelock. O Allah, You are the First, so there is nothing before You; You are the Last, so there is nothing after You; You are the Manifest, so there is nothing above You; You are the Hidden, so there is nothing beyond You. Settle our debt for us and enrich us against poverty.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 14; Also in Sunan Abu Dawud, Book 43, Hadith 5084","tags":["anxiety","fear","hope","stress"]},{"id":15,"title":"Dua for Ease After Hardship","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْيُسْرَ بَعْدَ الْعُسْرِ","transliteration":"Allahumma inni as\'alukal-yusra ba\'dal-\'usr","translation":"O Allah, I ask You for ease after hardship.","reference":"Musnad Ahmad, Hadith 10116; Graded Hasan by Al-Albani","tags":["anxiety","hope","stress"]},{"id":16,"title":"Dua of Reliance on Allah","arabic":"رَبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا وَإِلَيْكَ الْمَصِيرُ","transliteration":"Rabbana \'alayka tawakkalna wa ilayka anabna wa ilaykal-maseer","translation":"Our Lord, upon You we have relied, and to You we have returned, and to You is the destination.","reference":"Qur\'an Surah Al-Mumtahanah (60):4","tags":["anxiety","hope","stress"]},{"id":17,"title":"Dua of Submission and Trust","arabic":"اللَّهُمَّ لَكَ أَسْلَمْتُ وَبِكَ آمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَإِلَيْكَ أَنَبْتُ وَبِكَ خَاصَمْتُ وَإِلَيْكَ حَاكَمْتُ فَاغْفِرْ لِي مَا قَدَّمْتُ وَمَا أَخَّرْتُ وَمَا أَسْرَرْتُ وَمَا أَعْلَنْتُ أَنْتَ الْمُقَدِّمُ وَأَنْتَ الْمُؤَخِّرُ لَا إِلَهَ إِلَّا أَنْتَ","transliteration":"Allahumma laka aslamtu wa bika amantu wa \'alayka tawakkaltu wa ilayka anabtu wa bika khasamtu wa ilayka hakamtu faghfir li ma qaddamtu wa ma akhkhartu wa ma asrartu wa ma a\'lantu antal-muqaddimu wa antal-mu\'akhkhiru la ilaha illa anta","translation":"O Allah, to You I have submitted, in You I have believed, upon You I have relied, to You I have turned, for Your sake I have disputed, and to You I have referred for judgment. So forgive me what I have sent before me and what I have left behind, what I have concealed and what I have declared. You are the One Who brings forward and You are the One Who delays. There is no deity except You.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 221","tags":["anxiety","forgiveness","hope","stress"]},{"id":18,"title":"Dua for Patience and Victory","arabic":"رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ","transliteration":"Rabbana afrigh \'alaina sabran wa thabbit aqdamana wansurna \'alal-qawmil-kafireen","translation":"Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.","reference":"Qur\'an Surah Al-Baqarah (2):250","tags":["anxiety","hope","patience","stress"]},{"id":19,"title":"Dua of Tasbih for Ease","arabic":"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ","transliteration":"Subhanallahi wa bihamdihi subhanallahil-\'azeem","translation":"Glory be to Allah and praise be to Him; Glory be to Allah, the Most Great.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 66; Also in Sahih Muslim, Book 48, Hadith 35","tags":["anxiety","gratitude","hope","stress"]},{"id":20,"title":"Quranic Dua for Good in Both Worlds","arabic":"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ","transliteration":"Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina \'adhaban-nar","translation":"Our Lord, give us in this world good and in the Hereafter good and protect us from the punishment of the Fire.","reference":"Qur\'an Surah Al-Baqarah (2):201 - This is the most comprehensive dua mentioned in the Quran, and the Prophet (ﷺ) would frequently make this dua. (Sahih Al-Bukhari, Book 80, Hadith 9)","tags":["anxiety","fear","hope","stress"]}]},{"id":4,"name":"Morning Duas","duas":[{"id":1,"title":"Morning Dua - Protection and Reliance","arabic":"اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ","transliteration":"Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu wa ilaykan-nushur","translation":"O Allah, by You we have reached the morning, by You we have reached the evening, by You we live, by You we die, and to You is the resurrection.","reference":"Sunan At-Tirmidhi, Book 45 (Chapters on Supplication), Hadith 3391; Also in Sunan Abu Dawud, Book 43, Hadith 5068; Graded Sahih by Al-Albani","tags":["guidance","hope"]},{"id":2,"title":"Comprehensive Morning Dua","arabic":"أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ","transliteration":"Asbahna wa asbahal-mulku lillahi wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadeer. Rabbi as\'aluka khayra ma fi hadhal-yawmi wa khayra ma ba\'dahu wa a\'udhu bika min sharri ma fi hadhal-yawmi wa sharri ma ba\'dahu. Rabbi a\'udhu bika minal-kasali wa soo\'il-kibar. Rabbi a\'udhu bika min \'adhabin fin-nari wa \'adhabin fil-qabr","translation":"We have reached the morning and at this very time all sovereignty belongs to Allah, and all praise is due to Allah. None has the right to be worshipped but Allah, alone, without partner, to Him belongs all sovereignty and praise, and He is over all things omnipotent. My Lord, I ask You for the good of this day and the good of what follows it, and I seek refuge in You from the evil of this day and the evil of what follows it. My Lord, I seek refuge in You from laziness and senility. My Lord, I seek refuge in You from punishment in the Fire and punishment in the grave.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 71; Also in Sunan Abu Dawud, Book 43, Hadith 5070","tags":["anxiety","fear","gratitude","guidance","hope"]},{"id":3,"title":"Morning Dua - Witnessing to Tawheed","arabic":"اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ","transliteration":"Allahumma inni asbahtu ush-hiduka wa ush-hidu hamalata \'arshika wa mala\'ikataka wa jamee\'a khalqika annaka antallahu la ilaha illa anta wa anna Muhammadan \'abduka wa rasuluk","translation":"O Allah, I have reached the morning and call You to witness, and the bearers of Your Throne, Your angels, and all of Your creation to witness that You are Allah, there is no deity except You, and that Muhammad is Your servant and Messenger.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5069; Also in Sunan At-Tirmidhi, Book 45, Hadith 3501; Graded Hasan by Al-Albani","tags":["forgiveness","guidance","hope"]},{"id":4,"title":"Morning Dua - Gratitude for Blessings","arabic":"اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ","transliteration":"Allahumma ma asbaha bi min ni\'matin aw bi ahadin min khalqika faminka wahdaka la sharika laka falakal-hamdu wa lakash-shukr","translation":"O Allah, whatever blessing has reached me or anyone of Your creation in this morning, it is from You alone, without partner. So to You be all praise and to You be all thanks.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5073; Also in Sunan An-Nasa\'i, Book 50, Hadith 5514; Graded Sahih by Al-Albani","tags":["forgiveness","gratitude","guidance","hope"]},{"id":5,"title":"Morning Dua - Contentment with Allah","arabic":"رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ نَبِيًّا","transliteration":"Raditu billahi rabban wa bil-islami dinan wa bi Muhammadin nabiyya","translation":"I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad as my Prophet.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5072; Also in Sunan At-Tirmidhi, Book 45, Hadith 3423; Graded Sahih by Al-Albani. The Prophet (ﷺ) said that whoever says this in the morning, it is a guarantee for him to be pleased on the Day of Resurrection.","tags":["guidance","hope"]},{"id":6,"title":"Morning Dua - Upon Fitrah","arabic":"أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ وَعَلَى كَلِمَةِ الْإِخْلَاصِ وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ","transliteration":"Asbahna \'ala fitratil-islami wa \'ala kalimatil-ikhlas wa \'ala deeni nabiyyina Muhammadin sallallahu \'alayhi wa sallam wa \'ala millati abina Ibrahima hanifan musliman wa ma kana minal-mushrikin","translation":"We have reached the morning upon the natural disposition of Islam, and upon the word of sincerity, and upon the religion of our Prophet Muhammad (peace be upon him), and upon the creed of our father Ibrahim, who was upright and submitting, and he was not of the polytheists.","reference":"Musnad Ahmad, Hadith 16345; Also in Al-Mu\'jam Al-Kabeer by Al-Tabarani; Graded Hasan by Al-Albani","tags":["forgiveness","guidance","hope"]},{"id":7,"title":"Morning Dua - Acknowledging Allah\'s Lordship","arabic":"اللَّهُمَّ أَنْتَ خَلَقْتَنِي وَأَنْتَ تَهْدِينِي وَأَنْتَ تُطْعِمُنِي وَأَنْتَ تَسْقِينِي وَأَنْتَ تُمِيتُنِي وَأَنْتَ تُحْيِينِي","transliteration":"Allahumma anta khalaqtani wa anta tahdeeni wa anta tut\'imuni wa anta tasqeeni wa anta tumeetuni wa anta tuhyeeni","translation":"O Allah, You created me, You guide me, You feed me, You give me drink, You cause me to die, and You give me life.","reference":"Musnad Ahmad, Hadith 16345; Also in Al-Mu\'jam Al-Kabeer; Graded Hasan by Al-Albani","tags":["guidance","hope"]},{"id":8,"title":"Morning Dua - Tasbih of Creation","arabic":"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ وَرِضَا نَفْسِهِ وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ","transliteration":"Subhanallahi wa bihamdihi \'adada khalqihi wa rida nafsihi wa zinata \'arshihi wa midada kalimatih","translation":"Glory be to Allah and praise be to Him, as many times as the number of His creation, in accordance with His pleasure, equal to the weight of His Throne, and as extensive as the ink for His words.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 31; Also in Sunan Abu Dawud, Book 43, Hadith 5088","tags":["gratitude","guidance","hope"]},{"id":9,"title":"Morning Dua - Well-being of Body and Senses","arabic":"اللَّهُمَّ عَافِنِي فِي بَدَنِي اللَّهُمَّ عَافِنِي فِي سَمْعِي اللَّهُمَّ عَافِنِي فِي بَصَرِي لَا إِلَهَ إِلَّا أَنْتَ","transliteration":"Allahumma \'afini fi badani, Allahumma \'afini fi sam\'i, Allahumma \'afini fi basari, la ilaha illa anta","translation":"O Allah, grant my body well-being. O Allah, grant my hearing well-being. O Allah, grant my sight well-being. There is no deity except You.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5092; Also in Musnad Ahmad, Hadith 16345; Graded Sahih by Al-Albani","tags":["guidance","hope"]},{"id":10,"title":"Morning Dua - Seeking Pardon and Well-being","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ","transliteration":"Allahumma inni as\'alukal-\'afwa wal-\'afiyata fid-dunya wal-akhirah","translation":"O Allah, I ask You for pardon and well-being in this world and the Hereafter.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5085; Also in Sunan Ibn Majah, Book 34, Hadith 3851; Graded Sahih by Al-Albani","tags":["forgiveness","guidance","hope"]},{"id":11,"title":"Morning Dua - The Three Quls","arabic":"قُلْ هُوَ اللَّهُ أَحَدٌ","transliteration":"Qul huwallahu ahad","translation":"Say, \'He is Allah, [who is] One.\'","reference":"Qur\'an Surah Al-Ikhlas (112); Sunan Abu Dawud, Book 43, Hadith 5082 - The Prophet (ﷺ) recommended reciting Surah Al-Ikhlas, Al-Falaq, and An-Nas three times in the morning and evening for protection from everything.","tags":["guidance","hope"]},{"id":12,"title":"Morning Dua - Seeking Good of the Day","arabic":"أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ فَتْحَهُ وَنَصْرَهُ وَنُورَهُ وَبَرَكَتَهُ وَهُدَاهُ وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِيهِ وَشَرِّ مَا بَعْدَهُ","transliteration":"Asbahna wa asbahal-mulku lillahi rabbil-\'alameen. Allahumma inni as\'aluka khayra hadhal-yawmi fathahu wa nasrahu wa nurahu wa barakatahu wa hudah. Wa a\'udhu bika min sharri ma fihi wa sharri ma ba\'dah","translation":"We have reached the morning and at this very time all sovereignty belongs to Allah, Lord of the worlds. O Allah, I ask You for the good of this day: its conquests, its victory, its light, its blessings, and its guidance. And I seek refuge in You from the evil of what is in it and the evil of what follows it.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5084; Also in Sunan Ibn Majah, Book 34, Hadith 3866; Graded Hasan by Al-Albani","tags":["anxiety","fear","forgiveness","gratitude","guidance","hope"]},{"id":13,"title":"Morning Dua - Reliance on Allah","arabic":"يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ","transliteration":"Ya Hayyu ya Qayyumu birahmatika astagheethu aslih li sha\'ni kullahu wa la takilni ila nafsi tarfata \'ayn","translation":"O Ever-Living, O Self-Sustaining, by Your mercy I seek help. Rectify all my affairs and do not entrust me to myself for the blink of an eye.","reference":"Sunan An-Nasa\'i, Book 50 (The Book of Seeking Refuge with Allah), Hadith 5521; Graded Hasan by Al-Albani","tags":["forgiveness","guidance","hope"]},{"id":14,"title":"Morning Dua - Protection from Anxiety and Grief","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْهَمِّ وَالْحَزَنِ وَأَعُوذُ بِكَ مِنْ الْعَجْزِ وَالْكَسَلِ وَأَعُوذُ بِكَ مِنْ الْجُبْنِ وَالْبُخْلِ وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ","transliteration":"Allahumma inni a\'udhu bika minal-hammi wal-hazani wa a\'udhu bika minal-\'ajzi wal-kasali wa a\'udhu bika minal-jubni wal-bukhli wa a\'udhu bika min ghalabatid-dayni wa qahrir-rijal","translation":"O Allah, I seek refuge in You from anxiety and grief, I seek refuge in You from inability and laziness, I seek refuge in You from cowardice and miserliness, and I seek refuge in You from the burden of debt and the oppression of men.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 35; Also in Sahih Muslim, Book 48, Hadith 53","tags":["anxiety","grief","guidance","hope","loss","patience","stress"]},{"id":15,"title":"Morning Dua - Seeking Beneficial Knowledge","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا","transliteration":"Allahumma inni as\'aluka \'ilman nafi\'an wa rizqan tayyiban wa \'amalan mutaqabbalan","translation":"O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3835; Graded Sahih by Al-Albani","tags":["guidance","hope"]},{"id":16,"title":"Morning Dua - Sayyidul Istighfar","arabic":"اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ","transliteration":"Allahumma anta rabbi la ilaha illa anta khalaqtani wa ana \'abduka wa ana \'ala \'ahdika wa wa\'dika mastata\'tu a\'udhu bika min sharri ma sana\'tu aboo\'u laka bini\'matika \'alayya wa aboo\'u bidhanbi faghfir li fa\'innahu la yaghfirudh-dhunuba illa anta","translation":"O Allah, You are my Lord. There is no deity except You. You created me, and I am Your servant. I am committed to Your covenant and promise as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me, and I acknowledge my sin, so forgive me, for indeed none forgives sins except You.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 3 - The Prophet (ﷺ) said that whoever says this with conviction in the evening and dies that night will enter Paradise, and whoever says it in the morning and dies that day will enter Paradise.","tags":["anxiety","fear","forgiveness","guidance","hope"]},{"id":17,"title":"Morning Dua - Sufficiency of Allah","arabic":"حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ","transliteration":"Hasbiyallahu la ilaha illa huwa \'alayhi tawakkaltu wa huwa rabbul-\'arshil-\'azeem","translation":"Sufficient for me is Allah; there is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne.","reference":"Qur\'an Surah At-Tawbah (9):129; Sunan Abu Dawud, Book 43, Hadith 5087 - The Prophet (ﷺ) said that whoever says this seven times in the morning and evening, Allah will suffice him for whatever concerns him.","tags":["guidance","hope"]},{"id":18,"title":"Morning Dua - Protection with Allah\'s Perfect Words","arabic":"أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ","transliteration":"A\'udhu bikalimatillahit-tammati min sharri ma khalaq","translation":"I seek refuge in the perfect words of Allah from the evil of what He has created.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 70; Also in Sahih Al-Bukhari, Book 59, Hadith 13","tags":["anxiety","fear","guidance","hope"]},{"id":19,"title":"Morning Dua - Seeking Forgiveness and Paradise","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ","transliteration":"Allahumma inni as\'alukal-jannata wa a\'udhu bika minan-nar","translation":"O Allah, I ask You for Paradise and seek refuge in You from the Fire.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5085; Also in Sunan Ibn Majah, Book 34, Hadith 3851","tags":["forgiveness","guidance","hope"]},{"id":20,"title":"Morning Dua - The Dua of the Prophet","arabic":"اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ","transliteration":"Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaykal-masir","translation":"O Allah, by You we have reached the morning, by You we have reached the evening, by You we live, by You we die, and to You is the final return.","reference":"Sunan At-Tirmidhi, Book 45 (Chapters on Supplication), Hadith 3391; Also in Sunan Abu Dawud, Book 43, Hadith 5068","tags":["guidance","hope"]}]},{"id":5,"name":"Evening Duas","duas":[{"id":1,"title":"Evening Dua - Protection and Reliance","arabic":"اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ","transliteration":"Allahumma bika amsayna, wa bika asbahna, wa bika nahya, wa bika namutu wa ilaykal-masir","translation":"O Allah, by You we have reached the evening, by You we have reached the morning, by You we live, by You we die, and to You is the final return.","reference":"Sunan At-Tirmidhi, Book 45 (Chapters on Supplication), Hadith 3391; Also in Sunan Abu Dawud, Book 43, Hadith 5068; Graded Sahih by Al-Albani","tags":["guidance","hope"]},{"id":2,"title":"Comprehensive Evening Dua","arabic":"أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ","transliteration":"Amsayna wa amsal-mulku lillahi wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadeer. Rabbi as\'aluka khayra ma fi hadhihil-laylati wa khayra ma ba\'daha wa a\'udhu bika min sharri ma fi hadhihil-laylati wa sharri ma ba\'daha. Rabbi a\'udhu bika minal-kasali wa soo\'il-kibar. Rabbi a\'udhu bika min \'adhabin fin-nari wa \'adhabin fil-qabr","translation":"We have reached the evening and at this very time all sovereignty belongs to Allah, and all praise is due to Allah. None has the right to be worshipped but Allah, alone, without partner, to Him belongs all sovereignty and praise, and He is over all things omnipotent. My Lord, I ask You for the good of this night and the good of what follows it, and I seek refuge in You from the evil of this night and the evil of what follows it. My Lord, I seek refuge in You from laziness and senility. My Lord, I seek refuge in You from punishment in the Fire and punishment in the grave.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 71; Also in Sunan Abu Dawud, Book 43, Hadith 5070","tags":["anxiety","fear","gratitude","guidance","hope"]},{"id":3,"title":"Evening Dua - Witnessing to Tawheed","arabic":"اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ","transliteration":"Allahumma inni amsaytu ush-hiduka wa ush-hidu hamalata \'arshika wa mala\'ikataka wa jamee\'a khalqika annaka antallahu la ilaha illa anta wa anna Muhammadan \'abduka wa rasuluk","translation":"O Allah, I have reached the evening and call You to witness, and the bearers of Your Throne, Your angels, and all of Your creation to witness that You are Allah, there is no deity except You, and that Muhammad is Your servant and Messenger.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5069; Also in Sunan At-Tirmidhi, Book 45, Hadith 3501; Graded Hasan by Al-Albani","tags":["forgiveness","guidance","hope"]},{"id":4,"title":"Evening Dua - Gratitude for Blessings","arabic":"اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ","transliteration":"Allahumma ma amsa bi min ni\'matin aw bi ahadin min khalqika faminka wahdaka la sharika laka falakal-hamdu wa lakash-shukr","translation":"O Allah, whatever blessing has reached me or anyone of Your creation in this evening, it is from You alone, without partner. So to You be all praise and to You be all thanks.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5073; Also in Sunan An-Nasa\'i, Book 50, Hadith 5514; Graded Sahih by Al-Albani","tags":["forgiveness","gratitude","guidance","hope"]},{"id":5,"title":"Evening Dua - Contentment with Allah","arabic":"رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ نَبِيًّا","transliteration":"Raditu billahi rabban wa bil-islami dinan wa bi Muhammadin nabiyya","translation":"I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad as my Prophet.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5072; Also in Sunan At-Tirmidhi, Book 45, Hadith 3423; Graded Sahih by Al-Albani","tags":["guidance","hope"]},{"id":6,"title":"Evening Dua - Upon Fitrah","arabic":"أَمْسَيْنَا عَلَى فِطْرَةِ الْإِسْلَامِ وَعَلَى كَلِمَةِ الْإِخْلَاصِ وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ","transliteration":"Amsayna \'ala fitratil-islami wa \'ala kalimatil-ikhlas wa \'ala deeni nabiyyina Muhammadin sallallahu \'alayhi wa sallam wa \'ala millati abina Ibrahima hanifan musliman wa ma kana minal-mushrikin","translation":"We have reached the evening upon the natural disposition of Islam, and upon the word of sincerity, and upon the religion of our Prophet Muhammad (peace be upon him), and upon the creed of our father Ibrahim, who was upright and submitting, and he was not of the polytheists.","reference":"Musnad Ahmad, Hadith 16345; Also in Al-Mu\'jam Al-Kabeer by Al-Tabarani; Graded Hasan by Al-Albani","tags":["forgiveness","guidance","hope"]},{"id":7,"title":"Evening Dua - Acknowledging Allah\'s Lordship","arabic":"اللَّهُمَّ أَنْتَ خَلَقْتَنِي وَأَنْتَ تَهْدِينِي وَأَنْتَ تُطْعِمُنِي وَأَنْتَ تَسْقِينِي وَأَنْتَ تُمِيتُنِي وَأَنْتَ تُحْيِينِي","transliteration":"Allahumma anta khalaqtani wa anta tahdeeni wa anta tut\'imuni wa anta tasqeeni wa anta tumeetuni wa anta tuhyeeni","translation":"O Allah, You created me, You guide me, You feed me, You give me drink, You cause me to die, and You give me life.","reference":"Musnad Ahmad, Hadith 16345; Graded Hasan by Al-Albani","tags":["guidance","hope"]},{"id":8,"title":"Evening Dua - Tasbih of Creation","arabic":"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ وَرِضَا نَفْسِهِ وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ","transliteration":"Subhanallahi wa bihamdihi \'adada khalqihi wa rida nafsihi wa zinata \'arshihi wa midada kalimatih","translation":"Glory be to Allah and praise be to Him, as many times as the number of His creation, in accordance with His pleasure, equal to the weight of His Throne, and as extensive as the ink for His words.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 31","tags":["gratitude","guidance","hope"]},{"id":9,"title":"Evening Dua - Well-being of Body and Senses","arabic":"اللَّهُمَّ عَافِنِي فِي بَدَنِي اللَّهُمَّ عَافِنِي فِي سَمْعِي اللَّهُمَّ عَافِنِي فِي بَصَرِي لَا إِلَهَ إِلَّا أَنْتَ","transliteration":"Allahumma \'afini fi badani, Allahumma \'afini fi sam\'i, Allahumma \'afini fi basari, la ilaha illa anta","translation":"O Allah, grant my body well-being. O Allah, grant my hearing well-being. O Allah, grant my sight well-being. There is no deity except You.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5092; Graded Sahih by Al-Albani","tags":["guidance","hope"]},{"id":10,"title":"Evening Dua - Seeking Pardon and Well-being","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ","transliteration":"Allahumma inni as\'alukal-\'afwa wal-\'afiyata fid-dunya wal-akhirah","translation":"O Allah, I ask You for pardon and well-being in this world and the Hereafter.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5085; Graded Sahih by Al-Albani","tags":["forgiveness","guidance","hope"]},{"id":11,"title":"Evening Dua - Protection with Allah\'s Perfect Words","arabic":"أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ","transliteration":"A\'udhu bikalimatillahit-tammati min sharri ma khalaq","translation":"I seek refuge in the perfect words of Allah from the evil of what He has created.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 70","tags":["anxiety","fear","guidance","hope"]},{"id":12,"title":"Evening Dua - The Three Quls","arabic":"قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ","transliteration":"Qul a\'udhu birabbil-falaq","translation":"Say, \'I seek refuge in the Lord of daybreak.\'","reference":"Qur\'an Surah Al-Falaq (113) and An-Nas (114); Sunan Abu Dawud, Book 43, Hadith 5082 - Recite three times in the evening for protection.","tags":["guidance","hope"]},{"id":13,"title":"Evening Dua - Seeking Good of the Night","arabic":"أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذِهِ اللَّيْلَةِ فَتْحَهَا وَنَصْرَهَا وَنُورَهَا وَبَرَكَتَهَا وَهُدَاهَا وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِيهَا وَشَرِّ مَا بَعْدَهَا","transliteration":"Amsayna wa amsal-mulku lillahi rabbil-\'alameen. Allahumma inni as\'aluka khayra hadhihil-laylati fataha wa nasraha wa nuraha wa barakataha wa hudah. Wa a\'udhu bika min sharri ma fiha wa sharri ma ba\'dah","translation":"We have reached the evening and at this very time all sovereignty belongs to Allah, Lord of the worlds. O Allah, I ask You for the good of this night: its conquests, its victory, its light, its blessings, and its guidance. And I seek refuge in You from the evil of what is in it and the evil of what follows it.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5084; Graded Hasan by Al-Albani","tags":["anxiety","fear","forgiveness","gratitude","guidance","hope"]},{"id":14,"title":"Evening Dua - Reliance on Allah","arabic":"يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ","transliteration":"Ya Hayyu ya Qayyumu birahmatika astagheethu aslih li sha\'ni kullahu wa la takilni ila nafsi tarfata \'ayn","translation":"O Ever-Living, O Self-Sustaining, by Your mercy I seek help. Rectify all my affairs and do not entrust me to myself for the blink of an eye.","reference":"Sunan An-Nasa\'i, Book 50 (The Book of Seeking Refuge with Allah), Hadith 5521; Graded Hasan by Al-Albani","tags":["forgiveness","guidance","hope"]},{"id":15,"title":"Evening Dua - Protection from Anxiety and Grief","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْهَمِّ وَالْحَزَنِ وَأَعُوذُ بِكَ مِنْ الْعَجْزِ وَالْكَسَلِ وَأَعُوذُ بِكَ مِنْ الْجُبْنِ وَالْبُخْلِ وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ","transliteration":"Allahumma inni a\'udhu bika minal-hammi wal-hazani wa a\'udhu bika minal-\'ajzi wal-kasali wa a\'udhu bika minal-jubni wal-bukhli wa a\'udhu bika min ghalabatid-dayni wa qahrir-rijal","translation":"O Allah, I seek refuge in You from anxiety and grief, I seek refuge in You from inability and laziness, I seek refuge in You from cowardice and miserliness, and I seek refuge in You from the burden of debt and the oppression of men.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 35; Sahih Muslim, Book 48, Hadith 53","tags":["anxiety","grief","guidance","hope","loss","patience","stress"]},{"id":16,"title":"Evening Dua - Sayyidul Istighfar","arabic":"اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ","transliteration":"Allahumma anta rabbi la ilaha illa anta khalaqtani wa ana \'abduka wa ana \'ala \'ahdika wa wa\'dika mastata\'tu a\'udhu bika min sharri ma sana\'tu aboo\'u laka bini\'matika \'alayya wa aboo\'u bidhanbi faghfir li fa\'innahu la yaghfirudh-dhunuba illa anta","translation":"O Allah, You are my Lord. There is no deity except You. You created me, and I am Your servant. I am committed to Your covenant and promise as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me, and I acknowledge my sin, so forgive me, for indeed none forgives sins except You.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 3","tags":["anxiety","fear","forgiveness","guidance","hope"]},{"id":17,"title":"Evening Dua - Sufficiency of Allah","arabic":"حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ","transliteration":"Hasbiyallahu la ilaha illa huwa \'alayhi tawakkaltu wa huwa rabbul-\'arshil-\'azeem","translation":"Sufficient for me is Allah; there is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne.","reference":"Qur\'an Surah At-Tawbah (9):129; Sunan Abu Dawud, Book 43, Hadith 5087","tags":["guidance","hope"]},{"id":18,"title":"Evening Dua - Seeking Forgiveness and Paradise","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ","transliteration":"Allahumma inni as\'alukal-jannata wa a\'udhu bika minan-nar","translation":"O Allah, I ask You for Paradise and seek refuge in You from the Fire.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5085","tags":["forgiveness","guidance","hope"]},{"id":19,"title":"Evening Dua - Protection from Punishment","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ وَمِنْ عَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ","transliteration":"Allahumma inni a\'udhu bika min \'adhabi jahannama wa min \'adhabil-qabri wa min fitnatil-mahya wal-mamati wa min sharri fitnatil-masihid-dajjal","translation":"O Allah, I seek refuge in You from the punishment of Hell, from the punishment of the grave, from the trials of life and death, and from the evil trial of the False Messiah.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 127","tags":["anxiety","fear","guidance","hope"]},{"id":20,"title":"Evening Dua - The Dua of the Prophet","arabic":"اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ","transliteration":"Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namutu wa ilaykal-masir","translation":"O Allah, by You we have reached the evening, by You we have reached the morning, by You we live, by You we die, and to You is the final return.","reference":"Sunan At-Tirmidhi, Book 45 (Chapters on Supplication), Hadith 3391","tags":["guidance","hope"]}]},{"id":6,"name":"Night Duas","duas":[{"id":1,"title":"Night Dua - Before Sleeping","arabic":"بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا","transliteration":"Bismika Allahumma amutu wa ahya","translation":"In Your name, O Allah, I die and I live.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 77; Also in Sahih Muslim, Book 48, Hadith 63","tags":["guidance","hope"]},{"id":2,"title":"Night Dua - Protection from Punishment","arabic":"اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ","transliteration":"Allahumma qini \'adhabaka yawma tab\'athu \'ibadak","translation":"O Allah, protect me from Your punishment on the Day You resurrect Your servants.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5055; Also in Sunan At-Tirmidhi, Book 45, Hadith 3499; Graded Sahih by Al-Albani","tags":["anxiety","fear","guidance","hope"]},{"id":3,"title":"Night Dua - Lying Down","arabic":"بِاسْمِكَ رَبِّ وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ","transliteration":"Bismika rabbee wada\'tu janbee wa bika arfa\'uhu, fa in amsakta nafsee farhamha, wa in arsaltaha fahfazha bima tahfazu bihi \'ibadakas-salihin","translation":"In Your name my Lord, I lie down and in Your name I rise. So if You should take my soul then have mercy upon it, and if You should return my soul then protect it in the manner You protect Your righteous servants.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 78; Also in Sahih Muslim, Book 48, Hadith 64","tags":["forgiveness","guidance","hope"]},{"id":4,"title":"Night Dua - For Soul\'s Well-being","arabic":"اللَّهُمَّ إِنَّكَ خَلَقْتَ نَفْسِي وَأَنْتَ تَوَفَّاهَا لَكَ مَمَاتُهَا وَمَحْيَاهَا إِنْ أَحْيَيْتَهَا فَاحْفَظْهَا وَإِنْ أَمَتَّهَا فَاغْفِرْ لَهَا اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ","transliteration":"Allahumma innaka khalaqta nafsi wa anta tawaffaha laka mamatuha wa mahyaha, in ahyaytaha fahfazha, wa in amattaha faghfir laha. Allahumma inni as\'alukal-\'afiyah","translation":"O Allah, You created my soul and You will take its life. To You belong its death and its life. If You give it life, then protect it, and if You cause it to die, then forgive it. O Allah, I ask You for well-being.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 65","tags":["forgiveness","guidance","hope"]},{"id":5,"title":"Night Dua - Submission to Allah","arabic":"اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ وَوَجَّهْتُ وَجْهِي إِلَيْكَ وَفَوَّضْتُ أَمْرِي إِلَيْكَ وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ رَغْبَةً وَرَهْبَةً إِلَيْكَ لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ","transliteration":"Allahumma aslamtu nafsi ilayka wa wajjahtu wajhi ilayka wa fawwadtu amri ilayka wa alja\'tu dhahri ilayka raghbatan wa rahbatan ilayka la malja\'a wa la manja minka illa ilayka. Amentu bikitabikalladhi anzalta wa binabiyyikalladhi arsalta","translation":"O Allah, I have submitted myself to You, I have turned my face to You, I have entrusted my affairs to You, and I have committed my back to You, out of desire for You and fear of You. There is no refuge and no escape from You except to You. I believe in Your Book which You revealed and in Your Prophet whom You sent.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 79; Also in Sahih Muslim, Book 48, Hadith 66","tags":["anxiety","fear","guidance","hope"]},{"id":6,"title":"Night Dua - Gratitude for Sufficiency","arabic":"الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَكَفَانَا وَآوَانَا فَكَمْ مِمَّنْ لَا كَافِيَ لَهُ وَلَا مُؤْوِيَ","transliteration":"Alhamdu lillahilladhi at\'amana wa saqana wa kafana wa awana, fakam mimman la kafiya lahu wa la mu\'wi","translation":"Praise be to Allah Who has fed us, given us drink, sufficed us, and given us shelter, for many are those who have no one to suffice them or shelter them.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 67","tags":["gratitude","guidance","hope"]},{"id":7,"title":"Night Dua - Seeking Refuge from Evil of Self and Satan","arabic":"اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ","transliteration":"Allahumma \'alimal-ghaybi wash-shahadati fatiras-samawati wal-ardi rabba kulli shay\'in wa malikah, ashhadu an la ilaha illa anta, a\'udhu bika min sharri nafsi wa min sharrish-shaytani wa shirkih","translation":"O Allah, Knower of the unseen and the seen, Creator of the heavens and the earth, Lord and Sovereign of everything, I bear witness that there is no deity except You. I seek refuge in You from the evil of my soul and from the evil of Satan and his polytheism.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5056; Graded Sahih by Al-Albani","tags":["anxiety","fear","guidance","hope"]},{"id":8,"title":"Night Dua - Tasbih Before Sleeping","arabic":"سُبْحَانَ اللَّهِ ثَلَاثًا وَثَلَاثِينَ وَالْحَمْدُ لِلَّهِ ثَلَاثًا وَثَلَاثِينَ وَاللَّهُ أَكْبَرُ أَرْبَعًا وَثَلَاثِينَ","transliteration":"Subhanallahi thalathan wa thalatheen, walhamdu lillahi thalathan wa thalatheen, wallahu akbaru arba\'an wa thalatheen","translation":"Glory be to Allah (33 times), Praise be to Allah (33 times), Allah is the Greatest (34 times)","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 80; Also in Sahih Muslim, Book 48, Hadith 68","tags":["gratitude","guidance","hope"]},{"id":9,"title":"Night Dua - Comprehensive Protection","arabic":"اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ وَرَبَّ الْعَرْشِ الْعَظِيمِ رَبَّنَا وَرَبَّ كُلِّ شَيْءٍ أَنْتَ الظَّاهِرُ فَلَيْسَ فَوْقَكَ شَيْءٌ وَأَنْتَ الْبَاطِنُ فَلَيْسَ دُونَكَ شَيْءٌ مُنْزِلَ التَّوْرَاةِ وَالْإِنْجِيلِ وَالْفُرْقَانِ فَالِقَ الْحَبِّ وَالنَّوَى أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ شَيْءٍ أَنْتَ آخِذٌ بِنَاصِيَتِهِ أَنْتَ الْأَوَّلُ فَلَيْسَ قَبْلَكَ شَيْءٌ وَأَنْتَ الْآخِرُ فَلَيْسَ بَعْدَكَ شَيْءٌ اقْضِ عَنَّا الدَّيْنَ وَأَغْنِنَا مِنَ الْفَقْرِ","transliteration":"Allahumma rabbas-samawatis-sab\'i wa rabbal-\'arshil-\'azeem, rabbana wa rabba kulli shay\'in, antadh-dhahiru falaysa fawqaka shay\', wa antal-batinu falaysa doonaka shay\', munzilat-tawrati wal-injeeli wal-furqan, faliqal-habbi wan-nawa, a\'udhu bika min sharri kulli shay\'in anta akhidhun binasiyatih. Antal-awwalu falaysa qablaka shay\', wa antal-akhiru falaysa ba\'daka shay\', iqdi \'annad-dayna wa aghnina minal-faqr","translation":"O Allah, Lord of the seven heavens and Lord of the Great Throne, our Lord and the Lord of everything, You are the Manifest, so there is nothing above You; You are the Hidden, so there is nothing beyond You. Revealer of the Torah, the Gospel, and the Criterion, Splitter of the seed and the date stone, I seek refuge in You from the evil of everything You seize by the forelock. You are the First, so there is nothing before You; You are the Last, so there is nothing after You. Settle our debt for us and enrich us against poverty.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 14","tags":["anxiety","fear","guidance","hope","stress"]},{"id":10,"title":"Night Dua - Ayat-ul-Kursi","arabic":"اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...","transliteration":"Allahu la ilaha illa huwal-hayyul-qayyum...","translation":"Allah - there is no deity except Him, the Ever-Living, the Self-Sustaining...","reference":"Qur\'an Surah Al-Baqarah (2):255 - The Prophet (ﷺ) said that whoever recites Ayat-ul-Kursi before sleeping will be protected by Allah and Satan will not approach him until morning. (Sahih Al-Bukhari, Book 64, Hadith 55)","tags":["anxiety","fear","guidance","hope"]},{"id":11,"title":"Night Dua - Surah Al-Ikhlas","arabic":"قُلْ هُوَ اللَّهُ أَحَدٌ","transliteration":"Qul huwallahu ahad","translation":"Say, \'He is Allah, [who is] One.\'","reference":"Qur\'an Surah Al-Ikhlas (112) - The Prophet (ﷺ) used to recite Surah Al-Ikhlas, Al-Falaq, and An-Nas before sleeping and then blow into his hands and wipe over his body. (Sahih Al-Bukhari, Book 66, Hadith 4)","tags":["guidance","hope"]},{"id":12,"title":"Night Dua - Last Two Verses of Surah Al-Baqarah","arabic":"آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ...","transliteration":"Amanar-rasulu bima unzila ilayhi min rabbihi wal-mu\'minun...","translation":"The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers...","reference":"Qur\'an Surah Al-Baqarah (2):285-286 - The Prophet (ﷺ) said that whoever recites these two verses at night, they will suffice him. (Sahih Al-Bukhari, Book 66, Hadith 5)","tags":["guidance","hope"]},{"id":13,"title":"Night Dua - Surah Al-Mulk","arabic":"تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ","transliteration":"Tabarakalladhi biyadihil-mulku wa huwa \'ala kulli shay\'in qadeer","translation":"Blessed is He in whose hand is dominion, and He is over all things competent.","reference":"Qur\'an Surah Al-Mulk (67) - The Prophet (ﷺ) said that Surah Al-Mulk is a protector from the punishment of the grave. (Sunan At-Tirmidhi, Book 46, Hadith 3189; Graded Hasan)","tags":["anxiety","fear","guidance","hope"]},{"id":14,"title":"Night Dua - Seeking Refuge with Noble Face","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِوَجْهِكَ الْكَرِيمِ وَكَلِمَاتِكَ التَّامَّاتِ مِنْ شَرِّ مَا أَنْتَ آخِذٌ بِنَاصِيَتِهِ اللَّهُمَّ أَنْتَ تَكْشِفُ الْمَغْرَمَ وَالْمَأْثَمَ اللَّهُمَّ لَا يُهْزَمُ جُنْدُكَ وَلَا يُخْلَفُ وَعْدُكَ وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ سُبْحَانَكَ وَبِحَمْدِكَ","transliteration":"Allahumma inni a\'udhu biwajhikal-karimi wa kalimatikat-tammati min sharri ma anta akhidhun binasiyatih. Allahumma anta takshiful-maghrama wal-ma\'tham. Allahumma la yuhzamu junduka wa la yukhlafu wa\'duka wa la yanfa\'u dhal-jaddi minkal-jaddu. Subhanaka wa bihamdik","translation":"O Allah, I seek refuge in Your noble Face and Your perfect words from the evil of that which You seize by the forelock. O Allah, You remove debt and sin. O Allah, Your army is not defeated, Your promise is not broken, and the wealth of the wealthy does not avail against You. Glory be to You and praise be to You.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5057; Graded Hasan by Al-Albani","tags":["anxiety","fear","forgiveness","gratitude","guidance","hope","stress"]},{"id":15,"title":"Night Dua - Simple Tasbih","arabic":"سُبْحَانَ اللَّهِ","transliteration":"Subhanallah","translation":"Glory be to Allah","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 80 - Recommended to recite 33 times before sleeping","tags":["guidance","hope"]},{"id":16,"title":"Night Dua - Simple Tahmid","arabic":"الْحَمْدُ لِلَّهِ","transliteration":"Alhamdu lillah","translation":"Praise be to Allah","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 80 - Recommended to recite 33 times before sleeping","tags":["gratitude","guidance","hope"]},{"id":17,"title":"Night Dua - Simple Takbir","arabic":"اللَّهُ أَكْبَرُ","transliteration":"Allahu Akbar","translation":"Allah is the Greatest","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 80 - Recommended to recite 34 times before sleeping","tags":["guidance","hope"]},{"id":18,"title":"Night Dua - The Mu\'awwidhatayn","arabic":"قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ... قُلْ أَعُوذُ بِرَبِّ النَّاسِ","transliteration":"Qul a\'udhu birabbil-falaq... Qul a\'udhu birabbin-nas","translation":"Say, \'I seek refuge in the Lord of daybreak...\' Say, \'I seek refuge in the Lord of mankind...\'","reference":"Qur\'an Surah Al-Falaq (113) and An-Nas (114) - The Prophet (ﷺ) used to recite these and then blow into his hands and wipe over his body before sleeping. (Sahih Al-Bukhari, Book 66, Hadith 4)","tags":["guidance","hope"]},{"id":19,"title":"Night Dua - Waking Up at Night","arabic":"لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ الْحَمْدُ لِلَّهِ وَسُبْحَانَ اللَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ","transliteration":"La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadeer. Alhamdu lillah, wa subhanallah, wa la ilaha illallah, wallahu akbar, wa la hawla wa la quwwata illa billahil-\'aliyyil-\'azeem","translation":"There is no deity except Allah, alone, without partner. To Him belongs all sovereignty and praise, and He is over all things omnipotent. Praise be to Allah, glory be to Allah, there is no deity except Allah, Allah is the Greatest, and there is no power and no strength except with Allah, the Most High, the Most Great.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 81 - Whoever wakes at night and says this, then prays, his prayer will be accepted.","tags":["gratitude","guidance","hope"]},{"id":20,"title":"Night Dua - Seeking Forgiveness at Night","arabic":"اللَّهُمَّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ وَالْمُسْلِمِينَ وَالْمُسْلِمَاتِ","transliteration":"Allahumma-ghfir li wa liwalidayya wa lil-mu\'mineena wal-mu\'minati wal-muslimeena wal-muslimat","translation":"O Allah, forgive me, my parents, the believing men and women, and the Muslim men and women.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 61 - The Prophet (ﷺ) would seek forgiveness for the believers at night.","tags":["forgiveness","guidance","hope"]}]},{"id":7,"name":"Prayer Times","duas":[{"id":1,"title":"Dua After Adhan","arabic":"اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ","transliteration":"Allahumma rabba hadhihid-da\'watit-tammati was-salatil-qa\'imati, ati Muhammadan al-waseelata wal-fadeelata wab\'athhu maqamam mahmudan alladhi wa\'adtah","translation":"O Allah, Lord of this perfect call and the prayer to be established, grant Muhammad the means and the excellence, and raise him to a praised station which You have promised him.","reference":"Sahih Al-Bukhari, Book 10 (Call to Prayer), Hadith 215; Also in Sahih Muslim, Book 4 (Prayers), Hadith 10","tags":["gratitude","guidance","hope"]},{"id":2,"title":"Dua Between Adhan and Iqamah","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ","transliteration":"Allahumma inni as\'alukal-\'afwa wal-\'afiyata fid-dunya wal-akhirah","translation":"O Allah, I ask You for pardon and well-being in this world and the Hereafter.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5085; The Prophet (ﷺ) said that supplications between Adhan and Iqamah are not rejected. (Sunan At-Tirmidhi, Book 2, Hadith 212)","tags":["forgiveness","gratitude","guidance","hope"]},{"id":3,"title":"Dua for Entering the Masjid","arabic":"اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ","transliteration":"Allahumma-ftah li abwaba rahmatik","translation":"O Allah, open for me the doors of Your mercy.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 109; Also in Sunan Abu Dawud, Book 2, Hadith 465","tags":["forgiveness","gratitude","guidance","hope"]},{"id":4,"title":"Dua for Leaving the Masjid","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ","transliteration":"Allahumma inni as\'aluka min fadlik","translation":"O Allah, I ask You of Your bounty.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 109; Also in Sunan Abu Dawud, Book 2, Hadith 466","tags":["gratitude","guidance","hope"]},{"id":5,"title":"Dua for Opening Prayer (Takbirat-ul-Ihram)","arabic":"سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ","transliteration":"Subhanaka Allahumma wa bihamdika wa tabarakasmuka wa ta\'ala jadduka wa la ilaha ghayruk","translation":"Glory be to You, O Allah, and praise be to You. Blessed is Your name and exalted is Your majesty. There is no deity besides You.","reference":"Sunan Abu Dawud, Book 3 (Prayer), Hadith 775; Also in Sunan At-Tirmidhi, Book 2, Hadith 242; Graded Sahih by Al-Albani","tags":["gratitude","guidance","hope"]},{"id":6,"title":"Dua for Opening Prayer (Alternate)","arabic":"اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ اللَّهُمَّ نَقِّنِي مِنْ خَطَايَايَ كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ اللَّهُمَّ اغْسِلْنِي مِنْ خَطَايَايَ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ","transliteration":"Allahumma ba\'id bayni wa bayna khatayaya kama ba\'adta baynal-mashriqi wal-maghrib. Allahumma naqqini min khatayaya kama yunaqqath-thawbul-abyadu minad-danas. Allahumma-ghsilni min khatayaya bil-ma\'i wath-thalji wal-barad","translation":"O Allah, distance me from my sins as You have distanced the east from the west. O Allah, purify me of my sins as a white garment is purified of dirt. O Allah, cleanse me of my sins with water, snow, and hail.","reference":"Sahih Al-Bukhari, Book 8 (Prayers), Hadith 163; Also in Sahih Muslim, Book 4, Hadith 216","tags":["forgiveness","gratitude","guidance","hope"]},{"id":7,"title":"Dua for Ruku (Bowing)","arabic":"سُبْحَانَ رَبِّيَ الْعَظِيمِ","transliteration":"Subhana rabbiyal-\'azeem","translation":"Glory be to my Lord, the Most Great.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 220; Also in Sunan Abu Dawud, Book 3, Hadith 874","tags":["gratitude","guidance","hope"]},{"id":8,"title":"Dua for Ruku (Extended)","arabic":"سُبْحَانَكَ اللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ اللَّهُمَّ اغْفِرْ لِي","transliteration":"Subhanaka Allahumma rabbana wa bihamdika Allahumma-ghfir li","translation":"Glory be to You, O Allah, our Lord, and praise be to You. O Allah, forgive me.","reference":"Sahih Al-Bukhari, Book 79 (Book of Asking Permission), Hadith 49; Also in Sahih Muslim, Book 4, Hadith 222","tags":["forgiveness","gratitude","guidance","hope"]},{"id":9,"title":"Dua When Rising from Ruku","arabic":"سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ رَبَّنَا وَلَكَ الْحَمْدُ","transliteration":"Sami\'allahu liman hamidah. Rabbana wa lakal-hamd","translation":"Allah hears whoever praises Him. Our Lord, to You be praise.","reference":"Sahih Al-Bukhari, Book 8 (Prayers), Hadith 164; Also in Sahih Muslim, Book 4, Hadith 224","tags":["forgiveness","gratitude","guidance","hope"]},{"id":10,"title":"Dua for Sujood (Prostration)","arabic":"سُبْحَانَ رَبِّيَ الْأَعْلَى","transliteration":"Subhana rabbiyal-a\'la","translation":"Glory be to my Lord, the Most High.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 220; Also in Sunan Abu Dawud, Book 3, Hadith 875","tags":["gratitude","guidance","hope"]},{"id":11,"title":"Dua for Sujood (Extended)","arabic":"سُبْحَانَكَ اللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ اللَّهُمَّ اغْفِرْ لِي","transliteration":"Subhanaka Allahumma rabbana wa bihamdika Allahumma-ghfir li","translation":"Glory be to You, O Allah, our Lord, and praise be to You. O Allah, forgive me.","reference":"Sahih Al-Bukhari, Book 79 (Book of Asking Permission), Hadith 49; Also in Sahih Muslim, Book 4, Hadith 222","tags":["forgiveness","gratitude","guidance","hope"]},{"id":12,"title":"Dua for Sujood - The Prophet\'s Supplication","arabic":"اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ دِقَّهُ وَجِلَّهُ وَأَوَّلَهُ وَآخِرَهُ وَعَلَانِيَتَهُ وَسِرَّهُ","transliteration":"Allahumma-ghfir li dhanbi kullahu diqqahu wa jillahu wa awwalahu wa akhirahu wa \'alaniyatahu wa sirrahu","translation":"O Allah, forgive all my sins: the small and the great, the first and the last, the public and the private.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 224","tags":["forgiveness","gratitude","guidance","hope"]},{"id":13,"title":"Dua Between Two Prostrations","arabic":"رَبِّ اغْفِرْ لِي رَبِّ اغْفِرْ لِي","transliteration":"Rabbighfir li, Rabbighfir li","translation":"My Lord, forgive me. My Lord, forgive me.","reference":"Sunan Abu Dawud, Book 3 (Prayer), Hadith 874; Also in Sunan Ibn Majah, Book 5, Hadith 897; Graded Sahih by Al-Albani","tags":["forgiveness","gratitude","guidance","hope"]},{"id":14,"title":"Dua Between Two Prostrations (Extended)","arabic":"اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَعَافِنِي وَاهْدِنِي وَارْزُقْنِي","transliteration":"Allahumma-ghfir li warhamni wa \'afini wahdini warzuqni","translation":"O Allah, forgive me, have mercy on me, grant me well-being, guide me, and provide for me.","reference":"Sunan Abu Dawud, Book 3 (Prayer), Hadith 850; Also in Sunan At-Tirmidhi, Book 2, Hadith 284; Graded Sahih by Al-Albani","tags":["forgiveness","gratitude","guidance","hope"]},{"id":15,"title":"Dua for Tashahhud (First Part)","arabic":"التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ","transliteration":"At-tahiyyatu lillahi was-salawatu wat-tayyibatu. As-salamu \'alayka ayyuhan-nabiyyu wa rahmatullahi wa barakatuh. As-salamu \'alayna wa \'ala \'ibadillahis-salihin","translation":"All compliments, prayers, and pure words are due to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah.","reference":"Sahih Al-Bukhari, Book 8 (Prayers), Hadith 196; Also in Sahih Muslim, Book 4, Hadith 215","tags":["forgiveness","gratitude","guidance","hope"]},{"id":16,"title":"Dua for Tashahhud (Second Part)","arabic":"أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ","transliteration":"Ashhadu an la ilaha illallahu wa ashhadu anna Muhammadan \'abduhu wa rasuluh","translation":"I bear witness that there is no deity except Allah, and I bear witness that Muhammad is His servant and Messenger.","reference":"Sahih Al-Bukhari, Book 8 (Prayers), Hadith 196; Also in Sahih Muslim, Book 4, Hadith 215","tags":["gratitude","guidance","hope"]},{"id":17,"title":"Dua for Salawat on the Prophet","arabic":"اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ","transliteration":"Allahumma salli \'ala Muhammadin wa \'ala ali Muhammadin kama sallayta \'ala Ibrahima wa \'ala ali Ibrahima innaka hamidun majid. Allahumma barik \'ala Muhammadin wa \'ala ali Muhammadin kama barakta \'ala Ibrahima wa \'ala ali Ibrahima innaka hamidun majid","translation":"O Allah, send prayers upon Muhammad and the family of Muhammad as You sent prayers upon Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy, Glorious. O Allah, bless Muhammad and the family of Muhammad as You blessed Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy, Glorious.","reference":"Sahih Al-Bukhari, Book 8 (Prayers), Hadith 200; Also in Sahih Muslim, Book 4, Hadith 216","tags":["gratitude","guidance","hope"]},{"id":18,"title":"Dua After Tashahhud Before Tasleem","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ وَمِنْ عَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ","transliteration":"Allahumma inni a\'udhu bika min \'adhabi jahannama wa min \'adhabil-qabri wa min fitnatil-mahya wal-mamati wa min sharri fitnatil-masihid-dajjal","translation":"O Allah, I seek refuge in You from the punishment of Hell, from the punishment of the grave, from the trials of life and death, and from the evil trial of the False Messiah.","reference":"Sahih Al-Bukhari, Book 9 (Funerals), Hadith 75; Also in Sahih Muslim, Book 4, Hadith 127","tags":["anxiety","fear","gratitude","guidance","hope"]},{"id":19,"title":"Dua After Tashahhud (Alternate)","arabic":"اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ","transliteration":"Allahumma inni zalamtu nafsi zulman kathiran wa la yaghfirudh-dhunuba illa anta faghfir li maghfiratan min \'indika warhamni innaka antal-ghafoorur-raheem","translation":"O Allah, I have greatly wronged myself, and no one forgives sins except You. So grant me forgiveness from Yourself and have mercy on me. Indeed, You are the Oft-Forgiving, Most Merciful.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 34; Also in Sahih Muslim, Book 48, Hadith 47","tags":["forgiveness","gratitude","guidance","hope"]},{"id":20,"title":"Dua After Prayer - Tasbih","arabic":"أَسْتَغْفِرُ اللَّهَ (ثَلَاثًا) اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ","transliteration":"Astaghfirullah (three times). Allahumma antas-salamu wa minkas-salamu tabarakta ya dhal-jalali wal-ikram","translation":"I seek forgiveness from Allah (three times). O Allah, You are Peace and from You is peace. Blessed are You, O Possessor of Majesty and Honor.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 135; Also in Sunan Abu Dawud, Book 3, Hadith 1513","tags":["forgiveness","gratitude","guidance","hope"]}]},{"id":8,"name":"Praising Allah","duas":[{"id":1,"title":"Tasbih - Glorifying Allah","arabic":"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ","transliteration":"Subhanallahi wa bihamdihi subhanallahil-\'azeem","translation":"Glory be to Allah and praise be to Him; Glory be to Allah, the Most Great.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 66; Also in Sahih Muslim, Book 48, Hadith 35 - The Prophet (ﷺ) said that these words are light on the tongue but heavy on the scales.","tags":["forgiveness","gratitude","hope"]},{"id":2,"title":"Tahlil - Declaration of Oneness","arabic":"لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ","transliteration":"La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadeer","translation":"There is no deity except Allah, alone, without partner. To Him belongs all sovereignty and praise, and He is over all things omnipotent.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 67; Also in Sahih Muslim, Book 48, Hadith 36 - The Prophet (ﷺ) said that whoever says this 100 times a day gets the reward of freeing ten slaves, 100 good deeds are written, and 100 sins are erased.","tags":["forgiveness","gratitude","hope"]},{"id":3,"title":"Tasbih of Creation","arabic":"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ وَرِضَا نَفْسِهِ وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ","transliteration":"Subhanallahi wa bihamdihi \'adada khalqihi wa rida nafsihi wa zinata \'arshihi wa midada kalimatih","translation":"Glory be to Allah and praise be to Him, as many times as the number of His creation, in accordance with His pleasure, equal to the weight of His Throne, and as extensive as the ink for His words.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 31; Also in Sunan Abu Dawud, Book 43, Hadith 5088","tags":["forgiveness","gratitude","hope"]},{"id":4,"title":"Al-Fatihah - The Opening","arabic":"الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ","transliteration":"Alhamdu lillahi rabbil-\'alameen","translation":"Praise be to Allah, Lord of the worlds.","reference":"Qur\'an Surah Al-Fatihah (1):2 - The greatest chapter of the Quran, which the Prophet (ﷺ) described as \\"the seven oft-repeated verses and the Great Quran that I have been given.\\" (Sahih Al-Bukhari, Book 66, Hadith 1)","tags":["forgiveness","gratitude","hope"]},{"id":5,"title":"Praise Befitting Allah\'s Majesty","arabic":"يَا رَبَّنَا لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ وَعَظِيمِ سُلْطَانِكَ","transliteration":"Ya rabbana lakal-hamdu kama yanbaghi li jalali wajhika wa \'azeemi sultanik","translation":"O our Lord, to You be praise as befits the majesty of Your countenance and the greatness of Your power.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3826; Also in Sunan Abu Dawud, Book 43, Hadith 5057; Graded Sahih by Al-Albani","tags":["forgiveness","gratitude","hope"]},{"id":6,"title":"Praising Allah as Glorious and Holy","arabic":"سُبُّوحٌ قُدُّوسٌ رَبُّ الْمَلَائِكَةِ وَالرُّوحِ","transliteration":"Subboohun Quddoosun rabbul-mala\'ikati war-rooh","translation":"Glorious and Holy, Lord of the angels and the Spirit.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 222; Also in Sunan Abu Dawud, Book 43, Hadith 5065","tags":["forgiveness","gratitude","hope"]},{"id":7,"title":"Comprehensive Praise","arabic":"اللَّهُمَّ لَكَ الْحَمْدُ كُلُّهُ اللَّهُمَّ لَا قَابِضَ لِمَا بَسَطْتَ وَلَا بَاسِطَ لِمَا قَبَضْتَ وَلَا هَادِيَ لِمَنْ أَضْلَلْتَ وَلَا مُضِلَّ لِمَنْ هَدَيْتَ وَلَا مُعْطِيَ لِمَا مَنَعْتَ وَلَا مَانِعَ لِمَا أَعْطَيْتَ وَلَا مُقَرِّبَ لِمَا بَاعَدْتَ وَلَا مُبَاعِدَ لِمَا قَرَّبْتَ","transliteration":"Allahumma lakal-hamdu kulluh. Allahumma la qabida lima basatta wa la basita lima qabatta wa la hadiya liman adlalta wa la mudilla liman hadayta wa la mu\'tiya lima mana\'ta wa la mani\'a lima a\'tayta wa la muqarriba lima ba\'atta wa la muba\'ida lima qarrabta","translation":"O Allah, to You belongs all praise. O Allah, there is none who can withhold what You give, and none who can give what You withhold. None can guide whom You lead astray, and none can lead astray whom You guide. None can give what You prevent, and none can prevent what You give. None can bring near what You have distanced, and none can distance what You have brought near.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3836; Also in Musnad Ahmad, Hadith 18147; Graded Sahih by Al-Albani","tags":["forgiveness","gratitude","guidance","hope"]},{"id":8,"title":"Praising Allah as Lord of the Throne","arabic":"لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ","transliteration":"La ilaha illallahul-\'azeemul-haleem, la ilaha illallahu rabbul-\'arshil-\'azeem, la ilaha illallahu rabbus-samawati wa rabbul-ardi wa rabbul-\'arshil-kareem","translation":"There is no deity except Allah, the Most Great, the Forbearing. There is no deity except Allah, Lord of the Great Throne. There is no deity except Allah, Lord of the heavens, Lord of the earth, and Lord of the noble Throne.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 68; Also in Sahih Muslim, Book 48, Hadith 37","tags":["forgiveness","gratitude","hope"]},{"id":9,"title":"Praising Allah in Ruku and Sujood","arabic":"سُبْحَانَ ذِي الْمُلْكِ وَالْمَلَكُوتِ سُبْحَانَ ذِي الْعِزَّةِ وَالْعَظَمَةِ وَالْهَيْبَةِ وَالْقُدْرَةِ وَالْكِبْرِيَاءِ وَالْجَبَرُوتِ سُبْحَانَ الْمَلِكِ الْحَيِّ الَّذِي لَا يَنَامُ وَلَا يَمُوتُ سُبُّوحٌ قُدُّوسٌ رَبُّ الْمَلَائِكَةِ وَالرُّوحِ","transliteration":"Subhana dhil-mulki wal-malakuti, subhana dhil-\'izzati wal-\'azamati wal-haybati wal-qudrati wal-kibriya\'i wal-jabaruti. Subhanal-malikil-hayyilladhi la yanamu wa la yamutu. Subboohun Quddoosun rabbul-mala\'ikati war-rooh","translation":"Glory be to the Possessor of sovereignty and dominion. Glory be to the Possessor of might, majesty, awe, power, pride, and omnipotence. Glory be to the Sovereign, the Ever-Living who neither sleeps nor dies. Glorious and Holy, Lord of the angels and the Spirit.","reference":"Sunan An-Nasa\'i, Book 50 (The Book of Seeking Refuge with Allah), Hadith 5505; Also in Sunan Abu Dawud, Book 43, Hadith 5065; Graded Sahih by Al-Albani","tags":["forgiveness","gratitude","hope"]},{"id":10,"title":"Praise After Eating","arabic":"الْحَمْدُ لِلَّهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ","transliteration":"Alhamdu lillahi hamdan katheeran tayyiban mubarakan fih","translation":"Praise be to Allah, abundant, good, and blessed praise.","reference":"Sahih Al-Bukhari, Book 70 (Food), Hadith 176; Also in Sahih Muslim, Book 23, Hadith 29","tags":["forgiveness","gratitude","hope"]},{"id":11,"title":"Praising Allah as First and Last","arabic":"اللَّهُمَّ أَنْتَ الْأَوَّلُ فَلَيْسَ قَبْلَكَ شَيْءٌ وَأَنْتَ الْآخِرُ فَلَيْسَ بَعْدَكَ شَيْءٌ وَأَنْتَ الظَّاهِرُ فَلَيْسَ فَوْقَكَ شَيْءٌ وَأَنْتَ الْبَاطِنُ فَلَيْسَ دُونَكَ شَيْءٌ","transliteration":"Allahumma antal-awwalu falaysa qablaka shay\', wa antal-akhiru falaysa ba\'daka shay\', wa antadh-dhahiru falaysa fawqaka shay\', wa antal-batinu falaysa doonaka shay\'","translation":"O Allah, You are the First, so there is nothing before You; You are the Last, so there is nothing after You; You are the Manifest, so there is nothing above You; You are the Hidden, so there is nothing beyond You.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 14","tags":["forgiveness","gratitude","hope"]},{"id":12,"title":"Praising Allah with Ayat-ul-Kursi","arabic":"اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ","transliteration":"Allahu la ilaha illa huwal-hayyul-qayyum, la ta\'khudhuhu sinatun wa la nawm, lahu ma fis-samawati wa ma fil-ard","translation":"Allah - there is no deity except Him, the Ever-Living, the Self-Sustaining. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.","reference":"Qur\'an Surah Al-Baqarah (2):255 - The greatest verse in the Quran, as described by the Prophet (ﷺ). (Sahih Muslim, Book 6, Hadith 95)","tags":["forgiveness","gratitude","hope"]},{"id":13,"title":"The Four Praises","arabic":"سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ","transliteration":"Subhanallahi walhamdu lillahi wa la ilaha illallahu wallahu akbar","translation":"Glory be to Allah, praise be to Allah, there is no deity except Allah, and Allah is the Greatest.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 32 - The Prophet (ﷺ) said that these are the most beloved words to Allah.","tags":["forgiveness","gratitude","hope"]},{"id":14,"title":"Praising Allah by His Greatest Name","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ بِأَنَّكَ أَنْتَ اللَّهُ الْأَحَدُ الصَّمَدُ الَّذِي لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ","transliteration":"Allahumma inni as\'aluka bi-annaka antallahul-ahadus-samad alladhi lam yalid wa lam yoolad wa lam yakun lahu kufuwan ahad","translation":"O Allah, I ask You, as You are Allah, the One, the Self-Sufficient, Who has not begotten nor was begotten, and there is none comparable to Him.","reference":"Sunan At-Tirmidhi, Book 48 (Chapters on Supplication), Hadith 3575; Also in Sunan Abu Dawud, Book 43, Hadith 5061; Graded Sahih by Al-Albani","tags":["forgiveness","gratitude","hope"]},{"id":15,"title":"Praising Allah After Waking","arabic":"الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي وَرَدَّ عَلَيَّ رُوحِي وَأَذِنَ لِي بِذِكْرِهِ","transliteration":"Alhamdu lillahilladhi \'afani fi jasadi wa radda \'alayya ruhi wa adhina li bidhikrih","translation":"Praise be to Allah who restored my health, returned my soul, and permitted me to remember Him.","reference":"Sunan At-Tirmidhi, Book 45 (Chapters on Supplication), Hadith 3401; Graded Sahih by Al-Albani","tags":["forgiveness","gratitude","hope"]},{"id":16,"title":"Praising Allah for Guidance","arabic":"الْحَمْدُ لِلَّهِ الَّذِي هَدَانَا لِهَذَا وَمَا كُنَّا لِنَهْتَدِيَ لَوْلَا أَنْ هَدَانَا اللَّهُ","transliteration":"Alhamdu lillahilladhi hadana lihadha wa ma kunna linahtadiya lawla an hadanallah","translation":"Praise be to Allah, who has guided us to this; and we would never have been guided if Allah had not guided us.","reference":"Qur\'an Surah Al-A\'raf (7):43","tags":["forgiveness","gratitude","guidance","hope"]},{"id":17,"title":"Praising Allah as the Best of Creators","arabic":"فَتَبَارَكَ اللَّهُ أَحْسَنُ الْخَالِقِينَ","transliteration":"Fatabarakallahu ahsanul-khaliqin","translation":"So blessed is Allah, the best of creators.","reference":"Qur\'an Surah Al-Mu\'minun (23):14","tags":["forgiveness","gratitude","hope"]},{"id":18,"title":"Praising Allah for His Greatness","arabic":"اللَّهُ أَكْبَرُ كَبِيرًا وَالْحَمْدُ لِلَّهِ كَثِيرًا وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلًا","transliteration":"Allahu akbaru kabeera walhamdu lillahi katheera wa subhanallahi bukratan wa aseela","translation":"Allah is the Greatest, much greatness; and praise be to Allah, much praise; and glory be to Allah, morning and evening.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 220; Also in Sahih Al-Bukhari, Book 8, Hadith 165","tags":["forgiveness","gratitude","hope"]},{"id":19,"title":"Praising Allah After Sneezing","arabic":"الْحَمْدُ لِلَّهِ","transliteration":"Alhamdu lillah","translation":"Praise be to Allah.","reference":"Sahih Al-Bukhari, Book 78 (Good Manners), Hadith 110; Also in Sahih Muslim, Book 42, Hadith 19","tags":["forgiveness","gratitude","hope"]},{"id":20,"title":"Praising Allah at All Times","arabic":"الْحَمْدُ لِلَّهِ عَلَى كُلِّ حَالٍ","transliteration":"Alhamdu lillahi \'ala kulli hal","translation":"Praise be to Allah in all circumstances.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3808; Graded Hasan by Al-Albani","tags":["forgiveness","gratitude","hope"]}]},{"id":9,"name":"Travel","duas":[{"id":1,"title":"Dua for Starting Journey","arabic":"اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ","transliteration":"Allahu Akbar, Allahu Akbar, Allahu Akbar, Subhanalladhi sakhkhara lana hadha wa ma kunna lahu muqrinin wa inna ila rabbina lamunqalibun","translation":"Allah is the Greatest, Allah is the Greatest, Allah is the Greatest. Glory be to Him Who has subjected this to us, and we could never have it (by our efforts). Indeed, to our Lord we will return.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 72; Also in Sunan At-Tirmidhi, Book 45, Hadith 3445","tags":["guidance","hope"]},{"id":2,"title":"Comprehensive Dua for Travel","arabic":"اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَا تَرْضَى اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيفَةُ فِي الْأَهْلِ اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ وَكَآبَةِ الْمَنْظَرِ وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ","transliteration":"Allahumma inna nas\'aluka fi safarina hadhal-birra wat-taqwa wa minal-\'amali ma tarda. Allahumma hawwin \'alayna safarana hadha watwi \'anna bu\'dah. Allahumma antas-sahibu fis-safari wal-khalifatu fil-ahl. Allahumma inni a\'udhu bika min wa\'thai-safari wa ka\'abatil-manzari wa soo\'il-munqalabi fil-mali wal-ahl","translation":"O Allah, we ask You on this journey for righteousness, piety, and deeds that please You. O Allah, make this journey easy for us and shorten its distance. O Allah, You are the Companion on the journey and the Successor over the family. O Allah, I seek refuge in You from the hardships of travel, from a distressing scene, and from a bad return concerning wealth and family.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 72; Also in Sunan Abu Dawud, Book 43, Hadith 5067","tags":["anxiety","forgiveness","hope","stress"]},{"id":3,"title":"Dua for Protection During Travel","arabic":"اللَّهُمَّ بِكَ أَصُولُ وَبِكَ أَجُولُ وَبِكَ أَسِيرُ","transliteration":"Allahumma bika asoolu wa bika ajoolu wa bika aseeru","translation":"O Allah, by Your leave I attack, by Your leave I move about, and by Your leave I travel.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5058; Also in Sunan At-Tirmidhi, Book 45, Hadith 3521; Graded Sahih by Al-Albani","tags":["guidance","hope"]},{"id":4,"title":"Dua for Seeking Refuge from Hardships of Travel","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ وَكَآبَةِ الْمُنْقَلَبِ وَسُوءِ الْمَنْظَرِ فِي الْأَهْلِ وَالْمَالِ","transliteration":"Allahumma inni a\'udhu bika min wa\'thai-safari wa ka\'abatil-munqalabi wa soo\'il-manzari fil-ahli wal-mal","translation":"O Allah, I seek refuge in You from the hardships of travel, from a distressing return, and from a bad scene concerning family and wealth.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 72","tags":["anxiety","forgiveness","hope","stress"]},{"id":5,"title":"Dua When Mounting a Vehicle","arabic":"سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ","transliteration":"Subhanalladhi sakhkhara lana hadha wa ma kunna lahu muqrinin wa inna ila rabbina lamunqalibun","translation":"Glory be to Him Who has subjected this to us, and we could never have it (by our efforts). Indeed, to our Lord we will return.","reference":"Sahih Al-Bukhari, Book 64 (Military Expeditions), Hadith 55; Also in Sahih Muslim, Book 48, Hadith 72","tags":["guidance","hope"]},{"id":6,"title":"Dua for the Traveler for His Family","arabic":"اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيفَةُ فِي الْأَهْلِ","transliteration":"Allahumma antas-sahibu fis-safari wal-khalifatu fil-ahl","translation":"O Allah, You are the Companion on the journey and the Successor over the family.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 72","tags":["hope"]},{"id":7,"title":"Dua for Ease in Travel","arabic":"اللَّهُمَّ اطْوِ لَنَا الْأَرْضَ وَهَوِّنْ عَلَيْنَا السَّفَرَ","transliteration":"Allahumma-twi lanal-arda wa hawwin \'alaynas-safar","translation":"O Allah, fold the earth for us and make the journey easy for us.","reference":"Musnad Ahmad, Hadith 16345; Also in Al-Mu\'jam Al-Kabeer; Graded Hasan by Al-Albani","tags":["hope"]},{"id":8,"title":"Dua for Righteousness in Travel","arabic":"اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَا تَرْضَى","transliteration":"Allahumma inna nas\'aluka fi safarina hadhal-birra wat-taqwa wa minal-\'amali ma tarda","translation":"O Allah, we ask You on this journey for righteousness, piety, and deeds that please You.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 72","tags":["hope"]},{"id":9,"title":"Dua for Protection from Decline","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْحَوْرِ بَعْدَ الْكَوْرِ","transliteration":"Allahumma inni a\'udhu bika minal-hawri ba\'dal-kawr","translation":"O Allah, I seek refuge in You from decline after progress.","reference":"Musnad Ahmad, Hadith 16345; Graded Hasan by Al-Albani","tags":["guidance","hope"]},{"id":10,"title":"Dua for Safe Return","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ سُوءِ الْمُنْقَلَبِ فِي الْأَهْلِ وَالْمَالِ","transliteration":"Allahumma inni a\'udhu bika min soo\'il-munqalabi fil-ahli wal-mal","translation":"O Allah, I seek refuge in You from a bad return concerning family and wealth.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 72","tags":["guidance","hope"]},{"id":11,"title":"Dua When Entering a Town","arabic":"اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ وَمَا أَظْلَلْنَ وَرَبَّ الْأَرَضِينَ السَّبْعِ وَمَا أَقْلَلْنَ وَرَبَّ الشَّيَاطِينِ وَمَا أَضْلَلْنَ وَرَبَّ الرِّيَاحِ وَمَا ذَرَيْنَ أَسْأَلُكَ خَيْرَ هَذِهِ الْقَرْيَةِ وَخَيْرَ أَهْلِهَا وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ أَهْلِهَا وَشَرِّ مَا فِيهَا","transliteration":"Allahumma rabbas-samawatis-sab\'i wa ma azlalna wa rabbal-ardeenas-sab\'i wa ma aqlalna wa rabbash-shayateeni wa ma adlalna wa rabbar-riyahi wa ma dharayna as\'aluka khayra hadhil-qaryati wa khayra ahliha wa a\'udhu bika min sharriha wa sharri ahliha wa sharri ma fiha","translation":"O Allah, Lord of the seven heavens and what they overshadow, Lord of the seven earths and what they carry, Lord of the devils and whom they misguide, Lord of the winds and what they scatter, I ask You for the good of this town and the good of its people, and I seek refuge in You from its evil, the evil of its people, and the evil of what is in it.","reference":"Sunan An-Nasa\'i, Book 50 (The Book of Seeking Refuge with Allah), Hadith 5512; Graded Hasan by Al-Albani","tags":["anxiety","fear","guidance"]},{"id":12,"title":"Dua When Returning from Travel","arabic":"آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ","transliteration":"Ayibuna ta\'ibuna \'abiduna lirabbina hamidun","translation":"Returning, repenting, worshipping, and to our Lord praising.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 73; Also in Sahih Al-Bukhari, Book 64, Hadith 56","tags":["forgiveness","hope"]},{"id":13,"title":"Dua for Protection from Going Astray","arabic":"اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنْ أَنْ نَضِلَّ أَوْ نُضَلَّ أَوْ نَزِلَّ أَوْ نُزَلَّ أَوْ نَظْلِمَ أَوْ نُظْلَمَ أَوْ نَجْهَلَ أَوْ يُجْهَلَ عَلَيْنَا","transliteration":"Allahumma inna na\'udhu bika min an nadilla aw nudalla aw nazilla aw nuzalla aw nazlima aw nuzlama aw najhala aw yujhala \'alayna","translation":"O Allah, we seek refuge in You from going astray or being led astray, from slipping or being made to slip, from wronging or being wronged, from behaving ignorantly or being treated ignorantly.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5094; Also in Sunan At-Tirmidhi, Book 45, Hadith 3494; Graded Sahih by Al-Albani","tags":["guidance","hope"]},{"id":14,"title":"Dua for Blessings in Travel","arabic":"اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْيُمْنَ وَالتَّقْوَى","transliteration":"Allahumma inna nas\'aluka fi safarina hadhal-yumna wat-taqwa","translation":"O Allah, we ask You on this journey for blessings and piety.","reference":"Musnad Ahmad, Hadith 16345; Graded Hasan by Al-Albani","tags":["forgiveness","gratitude","hope"]},{"id":15,"title":"Dua for Guidance in Affairs","arabic":"اللَّهُمَّ إِنَّا نَسْأَلُكَ أَنْ تَهَبَ لَنَا مِنْ أَمْرِنَا رُشْدًا","transliteration":"Allahumma inna nas\'aluka an tahaba lana min amrina rushda","translation":"O Allah, we ask You to grant us guidance in our affairs.","reference":"Musnad Ahmad, Hadith 16345; Graded Hasan by Al-Albani","tags":["guidance","hope"]},{"id":16,"title":"Dua for All Good in Travel","arabic":"اللَّهُمَّ إِنَّا نَسْأَلُكَ الْخَيْرَ كُلَّهُ عَاجِلَهُ وَآجِلَهُ","transliteration":"Allahumma inna nas\'alukal-khayra kullahu \'ajilahu wa ajilah","translation":"O Allah, we ask You for all that is good, in this world and the Hereafter.","reference":"Musnad Ahmad, Hadith 16345; Graded Hasan by Al-Albani","tags":["guidance","hope"]},{"id":17,"title":"Dua for Protection from Inability and Laziness","arabic":"اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ","transliteration":"Allahumma inna na\'udhu bika minal-\'ajzi wal-kasal","translation":"O Allah, we seek refuge in You from inability and laziness.","reference":"Musnad Ahmad, Hadith 16345; Graded Hasan by Al-Albani","tags":["guidance","hope"]},{"id":18,"title":"Dua for Protection from Evil Character","arabic":"اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنْ سُوءِ الْأَخْلَاقِ وَالْأَعْمَالِ وَالْأَهْوَاءِ","transliteration":"Allahumma inna na\'udhu bika min soo\'il-akhlaqi wal-a\'mali wal-ahwa\'","translation":"O Allah, we seek refuge in You from evil character, evil deeds, and evil desires.","reference":"Musnad Ahmad, Hadith 16345; Graded Hasan by Al-Albani","tags":["anxiety","fear"]},{"id":19,"title":"Dua for Protection from Trials","arabic":"اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ وَعَذَابِ النَّارِ وَفِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَشَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ","transliteration":"Allahumma inna na\'udhu bika min \'adhabil-qabri wa \'adhabin-nari wa fitnatil-mahya wal-mamati wa sharri fitnatil-masihid-dajjal","translation":"O Allah, we seek refuge in You from the punishment of the grave, the punishment of Hellfire, the trials of life and death, and the evil of the trial of the False Messiah.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 127","tags":["anxiety","fear"]},{"id":20,"title":"Dua When Boarding a Vehicle","arabic":"بِسْمِ اللَّهِ وَالْحَمْدُ لِلَّهِ","transliteration":"Bismillahi walhamdu lillah","translation":"In the name of Allah, and praise be to Allah.","reference":"Sunan At-Tirmidhi, Book 45 (Chapters on Supplication), Hadith 3446; Graded Sahih by Al-Albani","tags":["gratitude","hope"]}]},{"id":10,"name":"Hajj & Umrah","duas":[{"id":1,"title":"Talbiyah - The Pilgrim\'s Cry","arabic":"لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لَا شَرِيكَ لَكَ","transliteration":"Labbayk Allahumma labbayk, labbayka la sharika laka labbayk, innal-hamda wan-ni\'mata laka wal-mulk, la sharika lak","translation":"Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Indeed, all praise, grace, and sovereignty belong to You. You have no partner.","reference":"Sahih Al-Bukhari, Book 28 (Hajj), Hadith 19; Also in Sahih Muslim, Book 15, Hadith 1","tags":["gratitude","guidance","hope"]},{"id":2,"title":"Dua for Entering the State of Ihram","arabic":"اللَّهُمَّ إِنِّي أُرِيدُ الْعُمْرَةَ فَيَسِّرْهَا لِي وَتَقَبَّلْهَا مِنِّي","transliteration":"Allahumma inni uridul-\'umrata fayassirha li wa taqabbalha minni","translation":"O Allah, I intend to perform Umrah, so make it easy for me and accept it from me.","reference":"Sunan Abu Dawud, Book 11 (Hajj), Hadith 1776; Also in Sunan At-Tirmidhi, Book 9, Hadith 819; Graded Sahih by Al-Albani","tags":["gratitude","guidance","hope"]},{"id":3,"title":"Dua When First Seeing the Kaaba","arabic":"اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً وَزِدْ مَنْ شَرَّفَهُ وَكَرَّمَهُ مِمَّنْ حَجَّهُ أَوِ اعْتَمَرَهُ تَشْرِيفًا وَتَكْرِيمًا وَتَعْظِيمًا وَبِرًّا","transliteration":"Allahumma zid hadhal-bayta tashreefan wa ta\'zeeman wa takreeman wa mahabatan wa zid man sharrafahu wa karramahu mimman hajjahu awi\'tamarahu tashreefan wa takreeman wa ta\'zeeman wa birra","translation":"O Allah, increase this House in honor, esteem, respect, and awe; and increase those who honor and respect it, among those who perform Hajj or Umrah, in honor, respect, esteem, and righteousness.","reference":"Al-Bayhaqi in Shu\'ab al-Iman, Hadith 3867; Also in Al-Mustadrak by Al-Hakim, Hadith 1736; Graded Hasan","tags":["gratitude","guidance","hope"]},{"id":4,"title":"Dua at the Black Stone","arabic":"بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ اللَّهُمَّ إِيمَانًا بِكَ وَتَصْدِيقًا بِكِتَابِكَ وَوَفَاءً بِعَهْدِكَ وَاتِّبَاعًا لِسُنَّةِ نَبِيِّكَ مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ","transliteration":"Bismillahi wallahu akbar. Allahumma imanan bika wa tasdiqan bikitabika wa wafa\'an bi\'ahdika wat-tiba\'an lisunnati nabiyyika Muhammadin sallallahu \'alayhi wa sallam","translation":"In the name of Allah, and Allah is the Greatest. O Allah, in faith in You, in confirmation of Your Book, in fulfillment of Your covenant, and in following the Sunnah of Your Prophet Muhammad (peace be upon him).","reference":"Sunan At-Tirmidhi, Book 9 (Hajj), Hadith 859; Also in Musnad Ahmad, Hadith 1478; Graded Hasan by Al-Albani","tags":["gratitude","guidance","hope"]},{"id":5,"title":"Dua Between the Yemeni Corner and Black Stone","arabic":"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ","transliteration":"Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina \'adhaban-nar","translation":"Our Lord, give us in this world good and in the Hereafter good and protect us from the punishment of the Fire.","reference":"Qur\'an Surah Al-Baqarah (2):201; Sunan Abu Dawud, Book 11 (Hajj), Hadith 1895 - The Prophet (ﷺ) used to recite this between the Yemeni Corner and the Black Stone.","tags":["anxiety","fear","gratitude","guidance","hope"]},{"id":6,"title":"Dua at the Multazam","arabic":"اللَّهُمَّ إِنَّ لَكَ عَلَيَّ حُقُوقًا كَثِيرَةً فِيمَا بَيْنِي وَبَيْنَكَ وَحُقُوقًا كَثِيرَةً فِيمَا بَيْنِي وَبَيْنَ خَلْقِكَ اللَّهُمَّ مَا كَانَ مِنْهَا لَكَ فَاغْفِرْهُ لِي وَمَا كَانَ مِنْهَا لِخَلْقِكَ فَتَحَمَّلْهُ عَنِّي وَأَغْنِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَبِفَضْلِكَ عَمَّنْ سِوَاكَ","transliteration":"Allahumma inna laka \'alayya huqooqan katheeran feema bayni wa baynaka wa huqooqan katheeran feema bayni wa bayna khalqika. Allahumma ma kana minha laka faghfirhu li wa ma kana minha likhalqika fatahammalhu \'anni wa aghnini bihalalika \'an haramika wa bifadlika \'amman siwak","translation":"O Allah, I have many obligations towards You between me and You, and many obligations between me and Your creation. O Allah, whatever of them is for You, forgive me for it; and whatever of them is for Your creation, bear it for me; and enrich me with what You have permitted over what You have forbidden, and with Your bounty over others.","reference":"Al-Bayhaqi in Shu\'ab al-Iman, Hadith 3872; Also in Al-Mustadrak by Al-Hakim, Hadith 1741; Graded Hasan","tags":["forgiveness","gratitude","guidance","hope"]},{"id":7,"title":"Dua at the Well of Zamzam","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ","transliteration":"Allahumma inni as\'aluka \'ilman nafi\'an wa rizqan wasi\'an wa shifa\'an min kulli da\'in","translation":"O Allah, I ask You for beneficial knowledge, abundant provision, and healing from every disease.","reference":"Sunan Ibn Majah, Book 25 (Hajj), Hadith 3062; Also in Musnad Ahmad, Hadith 14845; Graded Hasan by Al-Albani","tags":["gratitude","guidance","hope"]},{"id":8,"title":"Dua on Safa and Marwah","arabic":"لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ أَنْجَزَ وَعْدَهُ وَنَصَرَ عَبْدَهُ وَهَزَمَ الْأَحْزَابَ وَحْدَهُ","transliteration":"La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadeer. La ilaha illallahu wahdahu anjaza wa\'dahu wa nasara \'abduhu wa hazamal-ahzaba wahdah","translation":"There is no deity except Allah, alone, without partner. To Him belongs all sovereignty and praise, and He is over all things omnipotent. There is no deity except Allah, alone. He fulfilled His promise, aided His servant, and alone defeated the confederates.","reference":"Sahih Muslim, Book 15 (The Book of Hajj), Hadith 247; Also in Sahih Al-Bukhari, Book 26 (Hajj), Hadith 98","tags":["gratitude","guidance","hope"]},{"id":9,"title":"Dua at Arafah - The Best Supplication","arabic":"لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ","transliteration":"La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadeer","translation":"There is no deity except Allah, alone, without partner. To Him belongs all sovereignty and praise, and He is over all things omnipotent.","reference":"Sunan At-Tirmidhi, Book 9 (Hajj), Hadith 891; Also in Sunan Ibn Majah, Book 25, Hadith 3015; Graded Sahih by Al-Albani - The Prophet (ﷺ) said: \\"The best supplication is the supplication on the Day of Arafah, and the best thing that I and the prophets before me have said is: La ilaha illallahu wahdahu la sharika lah...\\"","tags":["gratitude","guidance","hope"]},{"id":10,"title":"Dua for Stoning the Jamarat","arabic":"بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ رَغْمًا لِلشَّيْطَانِ وَرِضًا لِلرَّحْمَنِ","transliteration":"Bismillahi wallahu akbar raghman lish-shaytani wa ridan lir-rahman","translation":"In the name of Allah, and Allah is the Greatest, in spite of Satan and seeking the pleasure of the Most Gracious.","reference":"Al-Bayhaqi in Shu\'ab al-Iman, Hadith 3885; Also in Al-Mustadrak by Al-Hakim, Hadith 1752; Graded Hasan","tags":["anxiety","fear","gratitude","guidance","hope"]},{"id":11,"title":"Dua at Muzdalifah","arabic":"اللَّهُمَّ بِكَ أَسْتَضِيءُ وَبِكَ أَسْتَغِيثُ يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ","transliteration":"Allahumma bika astadee\'u wa bika astagheethu ya muqallibal-quloobi thabbit qalbi \'ala deenik","translation":"O Allah, by You I seek light, and by You I seek help. O Turner of hearts, make my heart steadfast upon Your religion.","reference":"Sunan At-Tirmidhi, Book 45 (Chapters on Supplication), Hadith 3520; Also in Musnad Ahmad, Hadith 12132; Graded Hasan by Al-Albani","tags":["gratitude","guidance","hope","patience"]},{"id":12,"title":"Dua for the Day of Sacrifice","arabic":"اللَّهُمَّ هَذِهِ مِنْكَ وَلَكَ تَقَبَّلْ مِنِّي","transliteration":"Allahumma hadhihi minka wa laka taqabbal minni","translation":"O Allah, this is from You and for You, so accept it from me.","reference":"Sahih Muslim, Book 22 (The Book of Sacrifice), Hadith 40; Also in Sunan Abu Dawud, Book 16, Hadith 2795","tags":["gratitude","guidance","hope"]},{"id":13,"title":"Dua for the Farewell Tawaf","arabic":"اللَّهُمَّ لَا تَجْعَلْهُ آخِرَ الْعَهْدِ مِنْ بَيْتِكَ الْحَرَامِ اللَّهُمَّ ارْزُقْنِي الْعَوْدَةَ إِلَى بَيْتِكَ الْحَرَامِ","transliteration":"Allahumma la taj\'alhu akhiral-\'ahdi min baytik-al-haram. Allahumma-rzuqnil-\'awdata ila baytik-al-haram","translation":"O Allah, do not make this the last time I visit Your Sacred House. O Allah, grant me the opportunity to return to Your Sacred House.","reference":"Al-Bayhaqi in Shu\'ab al-Iman, Hadith 3892; Also in Al-Mustadrak by Al-Hakim, Hadith 1761; Graded Hasan","tags":["gratitude","guidance","hope"]},{"id":14,"title":"Dua for Entering the Masjid al-Haram","arabic":"اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ","transliteration":"Allahumma-ftah li abwaba rahmatik","translation":"O Allah, open for me the doors of Your mercy.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 109; Also in Sunan Abu Dawud, Book 2, Hadith 465","tags":["forgiveness","gratitude","guidance","hope"]},{"id":15,"title":"Dua for Leaving the Masjid al-Haram","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ","transliteration":"Allahumma inni as\'aluka min fadlik","translation":"O Allah, I ask You of Your bounty.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 109; Also in Sunan Abu Dawud, Book 2, Hadith 466","tags":["gratitude","guidance","hope"]},{"id":16,"title":"Dua for Entering the State of Ihram for Hajj","arabic":"اللَّهُمَّ إِنِّي أُرِيدُ الْحَجَّ فَيَسِّرْهُ لِي وَتَقَبَّلْهُ مِنِّي","transliteration":"Allahumma inni uridul-hajja fayassirhu li wa taqabbalhu minni","translation":"O Allah, I intend to perform Hajj, so make it easy for me and accept it from me.","reference":"Sunan Abu Dawud, Book 11 (Hajj), Hadith 1776; Graded Sahih by Al-Albani","tags":["gratitude","guidance","hope"]},{"id":17,"title":"Dua for the Deceased at Hajj","arabic":"اللَّهُمَّ اغْفِرْ لِلْحَاجِّ وَلِمَنِ اسْتَغْفَرَ لَهُ الْحَاجُّ","transliteration":"Allahumma-ghfir lil-hajji wa liman ista-ghfara lahul-hajj","translation":"O Allah, forgive the pilgrim and those for whom the pilgrim seeks forgiveness.","reference":"Al-Bayhaqi in Shu\'ab al-Iman, Hadith 3895; Graded Hasan","tags":["forgiveness","gratitude","guidance","hope"]},{"id":18,"title":"Dua for the Days of Tashreeq","arabic":"اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ","transliteration":"Allahu akbar, Allahu akbar, la ilaha illallahu wallahu akbar, Allahu akbar wa lillahil-hamd","translation":"Allah is the Greatest, Allah is the Greatest. There is no deity except Allah, and Allah is the Greatest. Allah is the Greatest, and to Allah belongs all praise.","reference":"Sahih Al-Bukhari, Book 15 (The Two Eids), Hadith 14; Also in Sahih Muslim, Book 6 (The Book of Prayer - Eid), Hadith 139","tags":["gratitude","guidance","hope"]},{"id":19,"title":"Dua at Mina","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ","transliteration":"Allahumma inni as\'alukal-jannata wa a\'udhu bika minan-nar","translation":"O Allah, I ask You for Paradise and seek refuge in You from the Fire.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5085; The Prophet (ﷺ) encouraged this supplication during Hajj.","tags":["gratitude","guidance","hope"]},{"id":20,"title":"Dua for Returning from Hajj","arabic":"آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ صَدَقَ اللَّهُ وَعْدَهُ وَنَصَرَ عَبْدَهُ وَهَزَمَ الْأَحْزَابَ وَحْدَهُ","transliteration":"Ayibuna ta\'ibuna \'abiduna lirabbina hamidun. Sadaqallahu wa\'dahu wa nasara \'abduhu wa hazamal-ahzaba wahdah","translation":"Returning, repenting, worshipping, and to our Lord praising. Allah has fulfilled His promise, aided His servant, and alone defeated the confederates.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 73; Also in Sahih Al-Bukhari, Book 64 (Military Expeditions), Hadith 56","tags":["forgiveness","gratitude","guidance","hope"]}]},{"id":11,"name":"Dua for Joy & Distress","duas":[{"id":1,"title":"Dua of Yunus (Jonah) for Relief","arabic":"لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ","transliteration":"La ilaha illa anta subhanaka inni kuntu minaz-zalimin","translation":"There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.","reference":"Qur\'an Surah Al-Anbiya (21):87 - The Prophet (ﷺ) said: \\"The prayer of Dhun-Nun (Prophet Yunus) which he said while in the belly of the whale: \'La ilaha illa anta subhanaka inni kuntu minaz-zalimin\' - No Muslim ever prays to his Lord with these words for anything but He answers his prayer.\\" (Sunan At-Tirmidhi, Book 48, Hadith 3505; Graded Sahih)","tags":["anxiety","gratitude","hope","stress"]},{"id":2,"title":"Dua for Sufficiency","arabic":"حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ","transliteration":"Hasbunallahu wa ni\'mal-wakeel","translation":"Sufficient for us is Allah, and He is the best Disposer of affairs.","reference":"Qur\'an Surah Al-Imran (3):173 - Allah made this dua sufficient for Prophet Ibrahim (Abraham) when he was thrown into the fire, and for Prophet Muhammad (ﷺ) when people said that an army had gathered against him.","tags":["anxiety","gratitude","hope","stress"]},{"id":3,"title":"Comprehensive Dua for Protection from Distress","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ","transliteration":"Allahumma inni a\'udhu bika minal-hammi wal-hazani wa a\'udhu bika minal-\'ajzi wal-kasali wa a\'udhu bika minal-jubni wal-bukhli wa a\'udhu bika min ghalabatid-dayni wa qahrir-rijal","translation":"O Allah, I seek refuge in You from anxiety and grief, I seek refuge in You from inability and laziness, I seek refuge in You from cowardice and miserliness, and I seek refuge in You from the burden of debt and the oppression of men.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 35; Also in Sahih Muslim, Book 48, Hadith 53 - The Prophet (ﷺ) used to seek refuge from these things frequently.","tags":["anxiety","gratitude","grief","hope","loss","patience","stress"]},{"id":4,"title":"Dua for Not Being Entrusted to Oneself","arabic":"اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ وَأَصْلِحْ لِي شَأْنِي كُلَّهُ لَا إِلَهَ إِلَّا أَنْتَ","transliteration":"Allahumma rahmataka arju fala takilni ila nafsi tarfata \'aynin wa aslih li sha\'ni kullahu la ilaha illa anta","translation":"O Allah, I hope for Your mercy, so do not entrust me to myself for the blink of an eye, and rectify all my affairs. There is no deity except You.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5090; Also in Musnad Ahmad, Hadith 24488; Graded Sahih by Al-Albani","tags":["anxiety","forgiveness","gratitude","hope","stress"]},{"id":5,"title":"Dua for Relief from Distress","arabic":"لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ","transliteration":"La ilaha illallahul-\'azeemul-haleem, la ilaha illallahu rabbul-\'arshil-\'azeem, la ilaha illallahu rabbus-samawati wa rabbul-ardi wa rabbul-\'arshil-kareem","translation":"There is no deity except Allah, the Most Great, the Forbearing. There is no deity except Allah, Lord of the Great Throne. There is no deity except Allah, Lord of the heavens, Lord of the earth, and Lord of the noble Throne.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 68; Also in Sahih Muslim, Book 48, Hadith 37 - The Prophet (ﷺ) used to recite this when in distress.","tags":["anxiety","gratitude","hope","stress"]},{"id":6,"title":"Dua for Removing Anxiety and Sorrow","arabic":"اللَّهُمَّ إِنِّي عَبْدُكَ ابْنُ عَبْدِكَ ابْنُ أَمَتِكَ نَاصِيَتِي بِيَدِكَ مَاضٍ فِيَّ حُكْمُكَ عَدْلٌ فِيَّ قَضَاؤُكَ أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ سَمَّيْتَ بِهِ نَفْسَكَ أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي وَنُورَ صَدْرِي وَجَلَاءَ حُزْنِي وَذَهَابَ هَمِّي","transliteration":"Allahumma inni \'abduka-bnu \'abdika-bnu amatika, nasiyati biyadika, madin fiya hukmuka, \'adlun fiya qada\'uka. As\'aluka bikulli ismin huwa laka sammayta bihi nafsaka aw anzaltahu fi kitabika aw \'allamtahu ahadan min khalqika awi-sta\'tharta bihi fi \'ilmil-ghaybi \'indaka an taj\'alal-qur\'ana rabee\'a qalbi wa noora sadri wa jala\'a huzni wa dhahaba hammi","translation":"O Allah, I am Your servant, son of Your servant, son of Your maidservant. My forelock is in Your hand. Your command concerning me prevails, and Your decision concerning me is just. I ask You by every name belonging to You with which You have named Yourself, or revealed in Your Book, or taught to any of Your creation, or kept hidden in the knowledge of the unseen with You, to make the Quran the spring of my heart, the light of my chest, the remover of my sadness, and the dispeller of my anxiety.","reference":"Musnad Ahmad, Hadith 3712; Also in Sahih Ibn Hibban, Hadith 972; Graded Sahih by Al-Albani - The Prophet (ﷺ) said that whoever recites this dua, Allah will remove his anxiety and replace his sorrow with joy.","tags":["anxiety","gratitude","grief","hope","loss","patience","stress"]},{"id":7,"title":"Dua for Ease After Hardship","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْيُسْرَ بَعْدَ الْعُسْرِ","transliteration":"Allahumma inni as\'alukal-yusra ba\'dal-\'usr","translation":"O Allah, I ask You for ease after hardship.","reference":"Musnad Ahmad, Hadith 10116; Graded Hasan by Al-Albani","tags":["anxiety","gratitude","hope","stress"]},{"id":8,"title":"Dua for Making Difficult Things Easy","arabic":"اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا","transliteration":"Allahumma la sahla illa ma ja\'altahu sahla wa anta taj\'alul-hazna idha shi\'ta sahla","translation":"O Allah, there is no ease except what You make easy, and You make the difficult easy if You wish.","reference":"Ibn Hibban in his Sahih, Book 3 (Supplications), Hadith 972; Graded Sahih by Al-Albani","tags":["anxiety","gratitude","hope","stress"]},{"id":9,"title":"Dua for Seeking Help - Ya Hayyu Ya Qayyum","arabic":"يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ","transliteration":"Ya Hayyu ya Qayyumu birahmatika astagheeth","translation":"O Ever-Living, O Self-Sustaining, by Your mercy I seek help.","reference":"Sunan At-Tirmidhi, Book 45 (Chapters on Supplication), Hadith 3524; Also in Sunan Abu Dawud, Book 43, Hadith 5087; Graded Hasan by Al-Albani","tags":["anxiety","forgiveness","gratitude","hope","stress"]},{"id":10,"title":"Dua for Protection from Hunger and Betrayal","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُوعِ فَإِنَّهُ بِئْسَ الضَّجِيعُ وَمِنَ الْخِيَانَةِ فَإِنَّهَا بِئْسَتِ الْبِطَانَةُ","transliteration":"Allahumma inni a\'udhu bika minal-ju\'i fa\'innahu bi\'sad-dajee\'u wa minal-khiyanati fa\'innaha bi\'satil-bitanah","translation":"O Allah, I seek refuge in You from hunger, for it is an evil companion, and I seek refuge in You from betrayal, for it is an evil inner trait.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 4834; Graded Sahih by Al-Albani","tags":["anxiety","fear","gratitude","hope","stress"]},{"id":11,"title":"Dua for Steadfastness and Determination","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الثَّبَاتَ فِي الْأَمْرِ وَالْعَزِيمَةَ عَلَى الرُّشْدِ","transliteration":"Allahumma inni as\'alukath-thabata fil-amri wal-\'azeemata \'alar-rushd","translation":"O Allah, I ask You for steadfastness in all matters and determination in following the right path.","reference":"Musnad Ahmad, Hadith 16345; Also in Sunan An-Nasa\'i, Book 50, Hadith 5521; Graded Hasan by Al-Albani","tags":["anxiety","gratitude","hope","patience","stress"]},{"id":12,"title":"Dua for Mercy, Forgiveness, and Deliverance","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ مُوجِبَاتِ رَحْمَتِكَ وَعَزَائِمَ مَغْفِرَتِكَ وَالسَّلَامَةَ مِنْ كُلِّ إِثْمٍ وَالْغَنِيمَةَ مِنْ كُلِّ بِرٍّ وَالْفَوْزَ بِالْجَنَّةِ وَالنَّجَاةَ مِنَ النَّارِ","transliteration":"Allahumma inni as\'aluka mujibati rahmatika wa \'aza\'ima maghfiratik was-salamata min kulli ithmin wal-ghanimata min kulli birrin wal-fawza bil-jannati wan-najata minan-nar","translation":"O Allah, I ask You for that which necessitates Your mercy, that which determines Your forgiveness, safety from every sin, share of every good, victory in attaining Paradise, and deliverance from the Fire.","reference":"Al-Hakim in Al-Mustadrak, Hadith 1937; Graded Sahih by Al-Albani","tags":["anxiety","forgiveness","gratitude","hope","stress"]},{"id":13,"title":"Dua for Protection from Going Astray","arabic":"اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنْ أَنْ نَضِلَّ أَوْ نُضَلَّ أَوْ نَزِلَّ أَوْ نُزَلَّ أَوْ نَظْلِمَ أَوْ نُظْلَمَ أَوْ نَجْهَلَ أَوْ يُجْهَلَ عَلَيْنَا","transliteration":"Allahumma inna na\'udhu bika min an nadilla aw nudalla aw nazilla aw nuzalla aw nazlima aw nuzlama aw najhala aw yujhala \'alayna","translation":"O Allah, we seek refuge in You from going astray or being led astray, from slipping or being made to slip, from wronging or being wronged, from behaving ignorantly or being treated ignorantly.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5094; Also in Sunan At-Tirmidhi, Book 45, Hadith 3494; Graded Sahih by Al-Albani","tags":["anxiety","gratitude","hope","stress"]},{"id":14,"title":"Dua for Protection from Withdrawal of Blessings","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ وَتَحَوُّلِ عَافِيَتِكَ وَفُجَاءَةِ نِقْمَتِكَ وَجَمِيعِ سَخَطِكَ","transliteration":"Allahumma inni a\'udhu bika min zawali ni\'matika wa tahawwuli \'afiyatika wa fuja\'ati niqmatika wa jamee\'i sakhatik","translation":"O Allah, I seek refuge in You from the withdrawal of Your blessing, the change of Your protection, the suddenness of Your punishment, and from all Your displeasure.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 59","tags":["anxiety","fear","forgiveness","gratitude","hope","stress"]},{"id":15,"title":"Dua for Protection from Senility and Sudden Death","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَرَمِ وَأَعُوذُ بِكَ مِنَ الْغَرَقِ وَالْحَرَقِ وَأَعُوذُ بِكَ مِنْ أَنْ يَتَخَبَّطَنِي الشَّيْطَانُ عِنْدَ الْمَوْتِ","transliteration":"Allahumma inni a\'udhu bika minal-harami wa a\'udhu bika minal-gharaqi wal-haraqi wa a\'udhu bika min an yatakhabbatanish-shaytanu \'indal-mawt","translation":"O Allah, I seek refuge in You from senility, I seek refuge in You from drowning and burning, and I seek refuge in You from being seized by Satan at the time of death.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 4823; Also in Sunan An-Nasa\'i, Book 50, Hadith 5501; Graded Sahih by Al-Albani","tags":["anxiety","fear","gratitude","hope","stress"]},{"id":16,"title":"Dua for Love of Allah","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ حُبَّكَ وَحُبَّ مَنْ يُحِبُّكَ وَحُبَّ عَمَلٍ يُقَرِّبُنِي إِلَى حُبِّكَ","transliteration":"Allahumma inni as\'aluka hubbaka wa hubba man yuhibbuka wa hubba \'amalin yuqarribuni ila hubbik","translation":"O Allah, I ask You for Your love, the love of those who love You, and the love of deeds that bring me closer to Your love.","reference":"Sunan At-Tirmidhi, Book 48 (Chapters on Supplication), Hadith 3495; Graded Hasan by Al-Albani","tags":["anxiety","gratitude","hope","stress"]},{"id":17,"title":"Dua for Well-being in Both Worlds","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ","transliteration":"Allahumma inni as\'alukal-\'afiyata fid-dunya wal-akhirah","translation":"O Allah, I ask You for well-being in this world and the Hereafter.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3851; Graded Sahih by Al-Albani","tags":["anxiety","gratitude","hope","stress"]},{"id":18,"title":"Dua for All Good","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنَ الْخَيْرِ كُلِّهِ عَاجِلِهِ وَآجِلِهِ مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ وَأَعُوذُ بِكَ مِنَ الشَّرِّ كُلِّهِ عَاجِلِهِ وَآجِلِهِ مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ","transliteration":"Allahumma inni as\'aluka minal-khayri kullihi \'ajilihi wa ajilihi ma \'alimtu minhu wa ma lam a\'lam wa a\'udhu bika minash-sharri kullihi \'ajilihi wa ajilihi ma \'alimtu minhu wa ma lam a\'lam","translation":"O Allah, I ask You for all that is good, in this world and the Hereafter, what I know and what I do not know. I seek refuge in You from all that is evil, in this world and the Hereafter, what I know and what I do not know.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3846; Graded Sahih by Al-Albani","tags":["anxiety","fear","gratitude","hope","stress"]},{"id":19,"title":"Dua for Paradise and Protection from Hell","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَمَا قَرَّبَ إِلَيْهَا مِنْ قَوْلٍ أَوْ عَمَلٍ وَأَعُوذُ بِكَ مِنَ النَّارِ وَمَا قَرَّبَ إِلَيْهَا مِنْ قَوْلٍ أَوْ عَمَلٍ","transliteration":"Allahumma inni as\'alukal-jannata wa ma qarraba ilayha min qawlin aw \'amal, wa a\'udhu bika minan-nari wa ma qarraba ilayha min qawlin aw \'amal","translation":"O Allah, I ask You for Paradise and for that which brings one closer to it, in word and deed. And I seek refuge in You from Hellfire and from that which brings one closer to it, in word and deed.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3847; Graded Sahih by Al-Albani","tags":["anxiety","fear","gratitude","hope","stress"]},{"id":20,"title":"Quranic Dua for Patience","arabic":"رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ","transliteration":"Rabbana afrigh \'alaina sabran wa tawaffana muslimeen","translation":"Our Lord, pour upon us patience and cause us to die as Muslims.","reference":"Qur\'an Surah Al-A\'raf (7):126 - The dua of the magicians of Pharaoh after they believed in Allah.","tags":["anxiety","gratitude","hope","patience","stress"]}]},{"id":12,"name":"Dua for Nature","duas":[{"id":1,"title":"Dua for Rain - Beneficial Rain","arabic":"اللَّهُمَّ صَيِّبًا نَافِعًا","transliteration":"Allahumma sayyiban nafi\'an","translation":"O Allah, (let this rain be) a beneficial downpour.","reference":"Sahih Al-Bukhari, Book 15 (The Book of Asking for Rain), Hadith 7; Also in Sahih Muslim, Book 9, Hadith 15 - The Prophet (ﷺ) used to say this when it rained.","tags":["guidance","hope"]},{"id":2,"title":"Dua When Rain is Excessive","arabic":"اللَّهُمَّ حَوَالَيْنَا وَلَا عَلَيْنَا اللَّهُمَّ عَلَى الْآكَامِ وَالظِّرَابِ وَبُطُونِ الْأَوْدِيَةِ وَمَنَابِتِ الشَّجَرِ","transliteration":"Allahumma hawalyina wa la \'alayna, Allahumma \'alal-akami wadh-dhirabi wa butunil-awdiyati wa manabitish-shajar","translation":"O Allah, around us and not upon us. O Allah, on the mountains, the hills, the valleys, and the places where trees grow.","reference":"Sahih Al-Bukhari, Book 15 (The Book of Asking for Rain), Hadith 8; Also in Sahih Muslim, Book 9, Hadith 16","tags":["guidance","hope"]},{"id":3,"title":"Dua for Seeking Rain","arabic":"اللَّهُمَّ اسْقِنَا غَيْثًا مُغِيثًا مَرِيئًا مَرِيعًا نَافِعًا غَيْرَ ضَارٍّ عَاجِلًا غَيْرَ آجِلٍ","transliteration":"Allahumma-sqina ghaythan mugheethan maree\'an maree\'an nafi\'an ghayra darin \'ajilan ghayra ajil","translation":"O Allah, give us a saving rain, good, fruitful, beneficial, not harmful, now, not delayed.","reference":"Sunan Abu Dawud, Book 3 (Prayer), Hadith 1173; Also in Sunan Ibn Majah, Book 7, Hadith 1268; Graded Sahih by Al-Albani","tags":["anxiety","fear"]},{"id":4,"title":"Dua Upon Hearing Thunder","arabic":"سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ","transliteration":"Subhanalladhi yusabbihur-ra\'du bihamdihi wal-mala\'ikatu min khifatih","translation":"Glory be to Him whom the thunder glorifies with His praise, and the angels out of fear of Him.","reference":"Al-Muwatta of Imam Malik, Book 16 (The Quran), Hadith 10; Also in Al-Adab Al-Mufrad of Al-Bukhari, Hadith 723; Graded Sahih","tags":["anxiety","fear","gratitude","hope"]},{"id":5,"title":"Dua for Wind","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا فِيهَا وَخَيْرَ مَا أُرْسِلَتْ بِهِ وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيهَا وَشَرِّ مَا أُرْسِلَتْ بِهِ","transliteration":"Allahumma inni as\'aluka khayraha wa khayra ma fiha wa khayra ma ursilat bihi wa a\'udhu bika min sharriha wa sharri ma fiha wa sharri ma ursilat bihi","translation":"O Allah, I ask You for the good of this wind, the good of what is in it, and the good of what it is sent with. And I seek refuge in You from the evil of this wind, the evil of what is in it, and the evil of what it is sent with.","reference":"Sahih Muslim, Book 9 (The Book of Prayer - Rain), Hadith 16; Also in Sunan At-Tirmidhi, Book 45, Hadith 3449","tags":["anxiety","fear"]},{"id":6,"title":"Dua Upon Seeing the Moon","arabic":"اللَّهُمَّ أَهْلِلْهُ عَلَيْنَا بِالْيُمْنِ وَالْإِيمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ رَبِّي وَرَبُّكَ اللَّهُ","transliteration":"Allahumma ahillahu \'alayna bil-yumni wal-imani was-salamati wal-islam. Rabbi wa rabbukallah","translation":"O Allah, bring it (the new moon) upon us with blessings, faith, safety, and Islam. My Lord and your Lord is Allah.","reference":"Sunan At-Tirmidhi, Book 45 (Chapters on Supplication), Hadith 3451; Also in Sunan Abu Dawud, Book 43, Hadith 5094; Graded Sahih by Al-Albani","tags":["forgiveness","gratitude","hope"]},{"id":7,"title":"Dua Upon Seeing the Crescent","arabic":"اللَّهُ أَكْبَرُ اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ وَالتَّوْفِيقِ لِمَا تُحِبُّ رَبَّنَا وَتَرْضَى رَبُّنَا وَرَبُّكَ اللَّهُ","transliteration":"Allahu Akbar. Allahumma ahillahu \'alayna bil-amni wal-imani was-salamati wal-islami wat-tawfiqi lima tuhibbu rabbana wa tarda. Rabbuna wa rabbukallah","translation":"Allah is the Greatest. O Allah, bring it (the new moon) upon us with security, faith, safety, Islam, and success in that which You love and are pleased with. Our Lord and your Lord is Allah.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5095; Graded Hasan by Al-Albani","tags":["hope"]},{"id":8,"title":"Dua Upon Seeing the First Fruit","arabic":"اللَّهُمَّ بَارِكْ لَنَا فِي ثَمَرِنَا وَبَارِكْ لَنَا فِي مَدِينَتِنَا وَبَارِكْ لَنَا فِي صَاعِنَا وَبَارِكْ لَنَا فِي مُدِّنَا","transliteration":"Allahumma barik lana fi thamarina wa barik lana fi madinatina wa barik lana fi sa\'ina wa barik lana fi muddina","translation":"O Allah, bless our fruits for us, bless our city for us, bless our measures for us, and bless our weights for us.","reference":"Sahih Muslim, Book 22 (The Book of Drinks), Hadith 133","tags":["guidance","hope"]},{"id":9,"title":"Dua for Rain When There is Drought","arabic":"اللَّهُمَّ اسْقِنَا الْغَيْثَ وَلَا تَجْعَلْنَا مِنَ الْقَانِطِينَ","transliteration":"Allahumma-sqinal-ghaytha wa la taj\'alna minal-qaniteen","translation":"O Allah, give us rain and do not make us among the despairing.","reference":"Sunan Abu Dawud, Book 3 (Prayer), Hadith 1173; Also in Sunan Ibn Majah, Book 7, Hadith 1268","tags":["guidance","hope"]},{"id":10,"title":"Dua for Wind (Alternate)","arabic":"اللَّهُمَّ إِنَّا نَسْأَلُكَ مِنْ خَيْرِ هَذِهِ الرِّيحِ وَخَيْرِ مَا فِيهَا وَخَيْرِ مَا أُمِرَتْ بِهِ وَنَعُوذُ بِكَ مِنْ شَرِّ هَذِهِ الرِّيحِ وَشَرِّ مَا فِيهَا وَشَرِّ مَا أُمِرَتْ بِهِ","transliteration":"Allahumma inna nas\'aluka min khayri hadhihir-reehi wa khayri ma fiha wa khayri ma umirat bihi wa na\'udhu bika min sharri hadhihir-reehi wa sharri ma fiha wa sharri ma umirat bihi","translation":"O Allah, we ask You for the good of this wind, the good of what is in it, and the good of what it is commanded to bring. And we seek refuge in You from the evil of this wind, the evil of what is in it, and the evil of what it is commanded to bring.","reference":"Sunan At-Tirmidhi, Book 45 (Chapters on Supplication), Hadith 3449; Graded Sahih by Al-Albani","tags":["anxiety","fear"]},{"id":11,"title":"Dua for Rain to be Mercy","arabic":"اللَّهُمَّ اجْعَلْهَا رَحْمَةً وَلَا تَجْعَلْهَا عَذَابًا","transliteration":"Allahumma-j\'alha rahmatan wa la taj\'alha \'adhaba","translation":"O Allah, make it a mercy and do not make it a punishment.","reference":"Al-Bayhaqi in Shu\'ab al-Iman, Graded Hasan","tags":["anxiety","fear","forgiveness","hope"]},{"id":12,"title":"Dua for Rain to Benefit Crops","arabic":"اللَّهُمَّ أَنْبِتْ لَنَا بِهَا الزَّرْعَ وَأَدِرَّ لَنَا بِهَا الضَّرْعَ وَأَسْقِنَا مِنْ بَرَكَاتِ السَّمَاءِ وَأَنْبِتْ لَنَا مِنْ بَرَكَاتِ الْأَرْضِ","transliteration":"Allahumma anbit lana bihaz-zar\'a wa adirr lana bihad-dar\'a wa asqina min barakatis-sama\'i wa anbit lana min barakatil-ard","translation":"O Allah, cause the crops to grow for us by it, make the udders flow for us by it, give us water from the blessings of heaven, and cause to grow for us from the blessings of the earth.","reference":"Al-Bayhaqi in Shu\'ab al-Iman, Graded Hasan","tags":["forgiveness","gratitude","hope"]},{"id":13,"title":"Dua for Abundant Rain","arabic":"اللَّهُمَّ إِنَّا نَسْتَغْفِرُكَ إِنَّكَ كُنْتَ غَفَّارًا فَأَرْسِلِ السَّمَاءَ عَلَيْنَا مِدْرَارًا","transliteration":"Allahumma inna nastaghfiruka innaka kunta ghaffaran fa arsilis-samaa \'alayna midrara","translation":"O Allah, we seek Your forgiveness, for You are the Oft-Forgiving, so send upon us abundant rain from the sky.","reference":"Qur\'an Surah Nuh (71):10-11","tags":["forgiveness","hope"]},{"id":14,"title":"Dua After Rain","arabic":"مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ","transliteration":"Mutirna bifadlillahi wa rahmatih","translation":"We have been given rain by the bounty of Allah and His mercy.","reference":"Sahih Al-Bukhari, Book 15 (The Book of Asking for Rain), Hadith 14; Also in Sahih Muslim, Book 9, Hadith 19","tags":["forgiveness","hope"]},{"id":15,"title":"Dua Upon Hearing Thunder and Lightning","arabic":"اللَّهُمَّ لَا تَقْتُلْنَا بِغَضَبِكَ وَلَا تُهْلِكْنَا بِعَذَابِكَ وَعَافِنَا قَبْلَ ذَلِكَ","transliteration":"Allahumma la taqtulna bighadabika wa la tuhlikna bi\'adhabika wa \'afina qabla dhalik","translation":"O Allah, do not kill us with Your anger, do not destroy us with Your punishment, and grant us well-being before that.","reference":"Al-Bayhaqi in Shu\'ab al-Iman, Graded Hasan","tags":["anxiety","fear"]},{"id":16,"title":"Dua Upon Seeing Dark Clouds","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ وَمِنْ عَذَابِ النَّارِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ الْمَسِيحِ الدَّجَّالِ","transliteration":"Allahumma inni a\'udhu bika min \'adhabil-qabri wa min \'adhabin-nari wa min fitnatil-mahya wal-mamati wa min sharri masihid-dajjal","translation":"O Allah, I seek refuge in You from the punishment of the grave, from the punishment of Hellfire, from the trials of life and death, and from the evil of the False Messiah.","reference":"Sahih Al-Bukhari, Book 9 (Funerals), Hadith 75; The Prophet (ﷺ) used to recite this when dark clouds appeared.","tags":["anxiety","fear"]},{"id":17,"title":"Dua for Rain to Fall on Beneficial Places","arabic":"اللَّهُمَّ عَلَى الْآكَامِ وَالْجِبَالِ وَالظِّرَابِ وَالرِّجَامِ وَبُطُونِ الْأَوْدِيَةِ وَمَنَابِتِ الشَّجَرِ","transliteration":"Allahumma \'alal-akami wal-jibali wadh-dhirabi war-rijami wa butunil-awdiyati wa manabitish-shajar","translation":"O Allah, (let the rain fall) on the hills, mountains, small hills, stone piles, valleys, and places where trees grow.","reference":"Sahih Al-Bukhari, Book 15 (The Book of Asking for Rain), Hadith 8","tags":["guidance","hope"]},{"id":18,"title":"Dua for Wind to be Beneficial","arabic":"اللَّهُمَّ اجْعَلْهَا رَحْمَةً وَلَا تَجْعَلْهَا عَذَابًا اللَّهُمَّ اجْعَلْهَا رِيَاحًا وَلَا تَجْعَلْهَا رِيحًا","transliteration":"Allahumma-j\'alha rahmatan wa la taj\'alha \'adhaban. Allahumma-j\'alha riyahan wa la taj\'alha reehan","translation":"O Allah, make it a mercy and do not make it a punishment. O Allah, make it gentle winds and do not make it a violent wind.","reference":"Al-Bayhaqi in Shu\'ab al-Iman, Graded Hasan","tags":["anxiety","fear","forgiveness","hope"]},{"id":19,"title":"Dua for Protection from Harmful Weather","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا فِيهَا وَخَيْرَ مَا أُرْسِلَتْ بِهِ وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيهَا وَشَرِّ مَا أُرْسِلَتْ بِهِ","transliteration":"Allahumma inni as\'aluka khayraha wa khayra ma fiha wa khayra ma ursilat bihi wa a\'udhu bika min sharriha wa sharri ma fiha wa sharri ma ursilat bihi","translation":"O Allah, I ask You for the good of this (weather), the good of what is in it, and the good of what it is sent with. And I seek refuge in You from its evil, the evil of what is in it, and the evil of what it is sent with.","reference":"Sahih Muslim, Book 9 (The Book of Prayer - Rain), Hadith 16","tags":["anxiety","fear"]},{"id":20,"title":"Dua Upon Seeing the Moon (Alternate)","arabic":"اللَّهُ أَكْبَرُ اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ وَالْهِلَالُ خَيْرٌ وَرُشْدٌ","transliteration":"Allahu Akbar. Allahumma ahillahu \'alayna bil-amni wal-imani was-salamati wal-islami. Al-hilalu khayrun wa rushd","translation":"Allah is the Greatest. O Allah, bring it (the new moon) upon us with security, faith, safety, and Islam. The new moon is of goodness and guidance.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5095; Graded Hasan","tags":["guidance","hope"]}]},{"id":13,"name":"Food & Drink","duas":[{"id":1,"title":"Dua Before Eating","arabic":"بِسْمِ اللَّهِ","transliteration":"Bismillah","translation":"In the name of Allah.","reference":"Sahih Al-Bukhari, Book 70 (Food), Hadith 15; Also in Sahih Muslim, Book 23, Hadith 19 - The Prophet (ﷺ) said that if you forget to say Bismillah at the beginning, then say: \\"Bismillahi awwalahu wa akhirahu\\" (In the name of Allah at the beginning and at the end).","tags":["guidance","hope"]},{"id":2,"title":"Dua After Eating","arabic":"الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ","transliteration":"Alhamdu lillahilladhi at\'amani hadha wa razaqaneehi min ghayri hawlin minni wa la quwwah","translation":"Praise be to Allah who fed me this and provided it to me without any power or strength from me.","reference":"Sunan Abu Dawud, Book 27 (Food), Hadith 3769; Also in Sunan At-Tirmidhi, Book 45, Hadith 3458; Graded Sahih by Al-Albani","tags":["gratitude","hope"]},{"id":3,"title":"Dua After Eating (Comprehensive)","arabic":"الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ","transliteration":"Alhamdu lillahilladhi at\'amana wa saqana wa ja\'alana muslimeen","translation":"Praise be to Allah who fed us, gave us drink, and made us Muslims.","reference":"Sunan At-Tirmidhi, Book 45 (Chapters on Supplication), Hadith 3457; Graded Sahih by Al-Albani","tags":["gratitude","hope"]},{"id":4,"title":"Dua for Blessings in Food","arabic":"اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ","transliteration":"Allahumma barik lana fima razaqtana wa qina \'adhaban-nar","translation":"O Allah, bless what You have provided us and protect us from the punishment of the Fire.","reference":"Sunan Ibn Majah, Book 29 (Food), Hadith 3260; Graded Sahih by Al-Albani","tags":["anxiety","fear","forgiveness","gratitude","hope"]},{"id":5,"title":"Dua When Forgetting to Say Bismillah","arabic":"بِسْمِ اللَّهِ فِي أَوَّلِهِ وَآخِرِهِ","transliteration":"Bismillahi fi awwalihi wa akhirih","translation":"In the name of Allah at the beginning and at the end.","reference":"Sunan Abu Dawud, Book 27 (Food), Hadith 3767; Also in Sunan At-Tirmidhi, Book 45, Hadith 3456; Graded Sahih by Al-Albani","tags":["guidance","hope"]},{"id":6,"title":"Dua After Drinking Milk","arabic":"اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَزِدْنَا مِنْهُ","transliteration":"Allahumma barik lana fihi wa zidna minhu","translation":"O Allah, bless it for us and give us more of it.","reference":"Sunan Abu Dawud, Book 27 (Food), Hadith 3730; Also in Sunan At-Tirmidhi, Book 45, Hadith 3459; Graded Sahih by Al-Albani","tags":["guidance","hope"]},{"id":7,"title":"Dua for the Host","arabic":"اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ","transliteration":"Allahumma barik lahum fima razaqtahum waghfir lahum warhamhum","translation":"O Allah, bless them in what You have provided them, forgive them, and have mercy on them.","reference":"Sahih Muslim, Book 23 (The Book of Drinks), Hadith 109","tags":["forgiveness","hope"]},{"id":8,"title":"Dua for Breaking Fast (Iftar)","arabic":"اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ","transliteration":"Allahumma laka sumtu wa \'ala rizqika aftartu","translation":"O Allah, for You I have fasted, and with Your provision I break my fast.","reference":"Sunan Abu Dawud, Book 14 (Fasting), Hadith 2358; Graded Sahih by Al-Albani","tags":["hope"]},{"id":9,"title":"Dua for Breaking Fast (Alternate)","arabic":"ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ","transliteration":"Dhahabadh-dhama\'u wabtallatil-\'urooqu wa thabatal-ajru in sha\'allah","translation":"Thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills.","reference":"Sunan Abu Dawud, Book 14 (Fasting), Hadith 2357; Graded Hasan by Al-Albani","tags":["guidance","hope"]},{"id":10,"title":"Dua When Invited to Eat","arabic":"اللَّهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِي وَاسْقِ مَنْ سَقَانِي","transliteration":"Allahumma at\'im man at\'amani wasqi man saqani","translation":"O Allah, feed the one who fed me, and give drink to the one who gave me drink.","reference":"Sahih Muslim, Book 23 (The Book of Drinks), Hadith 109","tags":["guidance","hope"]},{"id":11,"title":"Dua for the One Who Gives You Food","arabic":"اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ","transliteration":"Allahumma barik lahum fima razaqtahum waghfir lahum warhamhum","translation":"O Allah, bless them in what You have provided them, forgive them, and have mercy on them.","reference":"Sahih Muslim, Book 23 (The Book of Drinks), Hadith 109","tags":["forgiveness","hope"]},{"id":12,"title":"Dua After Eating in Someone\'s Home","arabic":"اللَّهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَبَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ","transliteration":"Allahumma-ghfir lahum warhamhum wa barik lahum fima razaqtahum","translation":"O Allah, forgive them, have mercy on them, and bless them in what You have provided them.","reference":"Sahih Muslim, Book 23 (The Book of Drinks), Hadith 109","tags":["forgiveness","hope"]},{"id":13,"title":"Dua Before Drinking Milk","arabic":"اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَزِدْنَا مِنْهُ","transliteration":"Allahumma barik lana fihi wa zidna minhu","translation":"O Allah, bless it for us and give us more of it.","reference":"Sunan Abu Dawud, Book 27 (Food), Hadith 3730","tags":["guidance","hope"]},{"id":14,"title":"Dua for the First Fruit of the Season","arabic":"اللَّهُمَّ بَارِكْ لَنَا فِي ثَمَرِنَا وَبَارِكْ لَنَا فِي مَدِينَتِنَا وَبَارِكْ لَنَا فِي صَاعِنَا وَبَارِكْ لَنَا فِي مُدِّنَا","transliteration":"Allahumma barik lana fi thamarina wa barik lana fi madinatina wa barik lana fi sa\'ina wa barik lana fi muddina","translation":"O Allah, bless our fruits for us, bless our city for us, bless our measures for us, and bless our weights for us.","reference":"Sahih Muslim, Book 22 (The Book of Drinks), Hadith 133","tags":["guidance","hope"]},{"id":15,"title":"Dua When Eating and Praising Allah","arabic":"الْحَمْدُ لِلَّهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ غَيْرَ مَكْفِيٍّ وَلَا مُوَدَّعٍ وَلَا مُسْتَغْنًى عَنْهُ رَبَّنَا","transliteration":"Alhamdu lillahi hamdan katheeran tayyiban mubarakan fihi ghayra makfiyyin wa la muwadda\'in wa la mustaghnan \'anhu rabbana","translation":"Praise be to Allah, abundant, good, and blessed praise, as is required by His sufficiency, and as is due to His generosity, and as is necessary for our independence from Him, O our Lord.","reference":"Sahih Al-Bukhari, Book 70 (Food), Hadith 176","tags":["forgiveness","gratitude","hope"]},{"id":16,"title":"Dua When Eating Food That Has Been Praised","arabic":"اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَأَطْعِمْنَا خَيْرًا مِنْهُ","transliteration":"Allahumma barik lana fihi wa at\'imna khayran minhu","translation":"O Allah, bless it for us and feed us better than it.","reference":"Sunan Abu Dawud, Book 27 (Food), Hadith 3768; Graded Sahih by Al-Albani","tags":["gratitude","hope"]},{"id":17,"title":"Dua When Drinking Water","arabic":"الْحَمْدُ لِلَّهِ الَّذِي سَقَانَا عَذْبًا فُرَاتًا بِرَحْمَتِهِ وَلَمْ يَجْعَلْهُ مِلْحًا أُجَاجًا بِذُنُوبِنَا","transliteration":"Alhamdu lillahilladhi saqana \'adhban furatan birahmatihi wa lam yaj\'alhu milhan ujajan bidhunubina","translation":"Praise be to Allah who gave us fresh, sweet water to drink by His mercy, and did not make it salty and undrinkable due to our sins.","reference":"Al-Bayhaqi in Shu\'ab al-Iman, Graded Hasan","tags":["forgiveness","gratitude","hope"]},{"id":18,"title":"Dua for Food (General)","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَنَعِيمَهَا وَأَعُوذُ بِكَ مِنَ النَّارِ وَعَذَابِهَا","transliteration":"Allahumma inni as\'alukal-jannata wa na\'imaha wa a\'udhu bika minan-nari wa \'adhabiha","translation":"O Allah, I ask You for Paradise and its delights, and I seek refuge in You from Hellfire and its punishment.","reference":"Sunan Abu Dawud, Book 43, Hadith 5085","tags":["anxiety","fear"]},{"id":19,"title":"Dua for the One Who Feeds You When You Are Fasting","arabic":"أَفْطَرَ عِنْدَكُمُ الصَّائِمُونَ وَأَكَلَ طَعَامَكُمُ الْأَبْرَارُ وَصَلَّتْ عَلَيْكُمُ الْمَلَائِكَةُ","transliteration":"Aftara \'indakumus-sa\'imuna wa akala ta\'amakumul-abraru wa sallat \'alaykumul-mala\'ikah","translation":"May the fasting people break their fast with you, may the righteous eat your food, and may the angels send blessings upon you.","reference":"Sunan Abu Dawud, Book 14 (Fasting), Hadith 2365; Also in Sunan Ibn Majah, Book 7, Hadith 1748; Graded Sahih by Al-Albani","tags":["forgiveness","gratitude","hope"]},{"id":20,"title":"Dua for the Host (Alternate)","arabic":"اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ","transliteration":"Allahumma barik lahum fima razaqtahum waghfir lahum warhamhum","translation":"O Allah, bless them in what You have provided them, forgive them, and have mercy on them.","reference":"Sahih Muslim, Book 23 (The Book of Drinks), Hadith 109","tags":["forgiveness","hope"]}]},{"id":14,"name":"Good Etiquette","duas":[{"id":1,"title":"Dua When Sneezing","arabic":"الْحَمْدُ لِلَّهِ","transliteration":"Alhamdu lillah","translation":"Praise be to Allah.","reference":"Sahih Al-Bukhari, Book 78 (Good Manners), Hadith 110; Also in Sahih Muslim, Book 42, Hadith 19","tags":["gratitude","hope"]},{"id":2,"title":"Response to Sneezing","arabic":"يَرْحَمُكَ اللَّهُ","transliteration":"Yarhamukallah","translation":"May Allah have mercy on you.","reference":"Sahih Al-Bukhari, Book 78 (Good Manners), Hadith 110; Also in Sahih Muslim, Book 42, Hadith 19","tags":["forgiveness","hope"]},{"id":3,"title":"Response to Yarhamukallah","arabic":"يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ","transliteration":"Yahdeekumullahu wa yuslihu balakum","translation":"May Allah guide you and set your affairs right.","reference":"Sahih Al-Bukhari, Book 78 (Good Manners), Hadith 111","tags":["guidance","hope"]},{"id":4,"title":"Dua When Yawning","arabic":"أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ","transliteration":"A\'udhu billahi minash-shaytanir-rajim","translation":"I seek refuge in Allah from Satan, the accursed.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5026; Graded Sahih by Al-Albani","tags":["anxiety","fear"]},{"id":5,"title":"Dua When Entering the Toilet","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ","transliteration":"Allahumma inni a\'udhu bika minal-khubuthi wal-khaba\'ith","translation":"O Allah, I seek refuge in You from male and female devils.","reference":"Sahih Al-Bukhari, Book 4 (Ablution), Hadith 9; Also in Sahih Muslim, Book 3, Hadith 3","tags":["anxiety","fear"]},{"id":6,"title":"Dua When Leaving the Toilet","arabic":"غُفْرَانَكَ","transliteration":"Ghufranak","translation":"I seek Your forgiveness.","reference":"Sunan Abu Dawud, Book 1 (Purification), Hadith 30; Also in Sunan At-Tirmidhi, Book 1, Hadith 7; Graded Sahih by Al-Albani","tags":["forgiveness","hope"]},{"id":7,"title":"Dua When Entering the Home","arabic":"بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا","transliteration":"Bismillahi walajna wa bismillahi kharajna wa \'alallahi rabbina tawakkalna","translation":"In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we rely.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5096; Graded Sahih by Al-Albani","tags":["guidance","hope"]},{"id":8,"title":"Dua When Leaving the Home","arabic":"بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ","transliteration":"Bismillahi tawakkaltu \'alallahi wa la hawla wa la quwwata illa billah","translation":"In the name of Allah, I rely upon Allah, and there is no power and no strength except with Allah.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5095; Also in Sunan At-Tirmidhi, Book 45, Hadith 3426; Graded Sahih by Al-Albani","tags":["hope"]},{"id":9,"title":"Dua When Entering the Masjid","arabic":"اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ","transliteration":"Allahumma-ftah li abwaba rahmatik","translation":"O Allah, open for me the doors of Your mercy.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 109; Also in Sunan Abu Dawud, Book 2, Hadith 465","tags":["forgiveness","hope"]},{"id":10,"title":"Dua When Leaving the Masjid","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ","transliteration":"Allahumma inni as\'aluka min fadlik","translation":"O Allah, I ask You of Your bounty.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 109; Also in Sunan Abu Dawud, Book 2, Hadith 466","tags":["guidance","hope"]},{"id":11,"title":"Dua When Putting on New Clothes","arabic":"اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ","transliteration":"Allahumma lakal-hamdu anta kasawtanihi as\'aluka min khayrihi wa khayri ma suni\'a lahu wa a\'udhu bika min sharrihi wa sharri ma suni\'a lah","translation":"O Allah, to You be praise. You have clothed me with this. I ask You for its good and the good for which it was made, and I seek refuge in You from its evil and the evil for which it was made.","reference":"Sunan Abu Dawud, Book 33 (Clothing), Hadith 4020; Also in Sunan At-Tirmidhi, Book 45, Hadith 3470; Graded Sahih by Al-Albani","tags":["anxiety","fear","gratitude","hope"]},{"id":12,"title":"Dua When Looking in the Mirror","arabic":"اللَّهُمَّ أَنْتَ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي","transliteration":"Allahumma anta hassanta khalqi fahassin khuluqi","translation":"O Allah, You have made my form beautiful, so make my character beautiful.","reference":"Musnad Ahmad, Hadith 24386; Graded Sahih by Al-Albani","tags":["guidance","hope"]},{"id":13,"title":"Dua When Visiting the Sick","arabic":"لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ","transliteration":"La ba\'sa tahoorun in sha\'allah","translation":"No worry, it is a purification, if Allah wills.","reference":"Sahih Al-Bukhari, Book 75 (Patients), Hadith 1; Also in Sahih Muslim, Book 45, Hadith 42","tags":["anxiety","stress"]},{"id":14,"title":"Dua for the Sick","arabic":"أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ","transliteration":"As\'alullahal-\'azeema rabbal-\'arshil-\'azeemi an yashfiyak","translation":"I ask Allah, the Most Great, Lord of the Great Throne, to heal you.","reference":"Sunan Abu Dawud, Book 29 (Medicine), Hadith 3883; Also in Sunan At-Tirmidhi, Book 45, Hadith 3523; Graded Sahih by Al-Albani","tags":["guidance","hope"]},{"id":15,"title":"Dua When Offering Condolences","arabic":"إِنَّ لِلَّهِ مَا أَخَذَ وَلَهُ مَا أَعْطَى وَكُلُّ شَيْءٍ عِنْدَهُ بِأَجَلٍ مُسَمًّى فَلْتَصْبِرْ وَلْتَحْتَسِبْ","transliteration":"Inna lillahi ma akhadha wa lahu ma a\'ta wa kullu shay\'in \'indahu bi-ajalin musamman faltasbir waltahtasib","translation":"To Allah belongs what He has taken, and to Him belongs what He has given, and everything with Him has an appointed time. So be patient and seek reward.","reference":"Sahih Al-Bukhari, Book 23 (Funerals), Hadith 4; Also in Sahih Muslim, Book 11, Hadith 11","tags":["guidance","hope"]},{"id":16,"title":"Dua When Hearing Good News","arabic":"الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ","transliteration":"Alhamdu lillahilladhi bini\'matihi tatimmus-salihat","translation":"Praise be to Allah by whose grace good deeds are completed.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3803; Graded Hasan by Al-Albani","tags":["gratitude","hope"]},{"id":17,"title":"Dua When Hearing Bad News","arabic":"الْحَمْدُ لِلَّهِ عَلَى كُلِّ حَالٍ","transliteration":"Alhamdu lillahi \'ala kulli hal","translation":"Praise be to Allah in all circumstances.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3808; Graded Hasan by Al-Albani","tags":["gratitude","hope"]},{"id":18,"title":"Dua When Angry","arabic":"أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ","transliteration":"A\'udhu billahi minash-shaytanir-rajim","translation":"I seek refuge in Allah from Satan, the accursed.","reference":"Sahih Al-Bukhari, Book 78 (Good Manners), Hadith 77; Also in Sahih Muslim, Book 45, Hadith 41","tags":["anxiety","fear"]},{"id":19,"title":"Dua Upon Waking Up","arabic":"الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ","transliteration":"Alhamdu lillahilladhi ahyana ba\'da ma amatana wa ilayhin-nushur","translation":"Praise be to Allah who gave us life after He caused us to die, and to Him is the resurrection.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 76; Also in Sahih Muslim, Book 48, Hadith 62","tags":["gratitude","hope"]},{"id":20,"title":"Dua Upon Seeing Someone Afflicted","arabic":"الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي مِمَّا ابْتَلَاكَ بِهِ وَفَضَّلَنِي عَلَى كَثِيرٍ مِمَّنْ خَلَقَ تَفْضِيلًا","transliteration":"Alhamdu lillahilladhi \'afani mimmabtalaka bihi wa faddalani \'ala katheerin mimman khalaqa tafdeela","translation":"Praise be to Allah who spared me from what He has afflicted you with and favored me greatly above many of those He created.","reference":"Sunan At-Tirmidhi, Book 45 (Chapters on Supplication), Hadith 3432; Graded Hasan by Al-Albani","tags":["gratitude","hope"]}]},{"id":15,"name":"Dua for Patience","duas":[{"id":1,"title":"Dua for Patience and Victory","arabic":"رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ","transliteration":"Rabbana afrigh \'alaina sabran wa thabbit aqdamana wansurna \'alal-qawmil-kafireen","translation":"Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.","reference":"Qur\'an Surah Al-Baqarah (2):250 - The dua of the believers during battle with Goliath (Jalut).","tags":["patience","stress"]},{"id":2,"title":"Dua for Patience and Death as Muslims","arabic":"رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ","transliteration":"Rabbana afrigh \'alaina sabran wa tawaffana muslimeen","translation":"Our Lord, pour upon us patience and cause us to die as Muslims.","reference":"Qur\'an Surah Al-A\'raf (7):126 - The dua of the magicians of Pharaoh after they believed in Allah.","tags":["patience","stress"]},{"id":3,"title":"Quranic Command for Patience","arabic":"وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ","transliteration":"Wasbir wa ma sabruka illa billah","translation":"And be patient, and your patience is not but through Allah.","reference":"Qur\'an Surah An-Nahl (16):127","tags":["patience","stress"]},{"id":4,"title":"Dua of the Overpowered","arabic":"رَبِّ إِنِّي مَغْلُوبٌ فَانتَصِرْ","transliteration":"Rabbi inni maghloobun fantasir","translation":"My Lord, indeed I am overpowered, so help me.","reference":"Qur\'an Surah Al-Qamar (54):10 - The dua of Prophet Nuh (Noah) when his people rejected him.","tags":["hope","patience","stress"]},{"id":5,"title":"Dua of Yunus for Relief","arabic":"لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ","transliteration":"La ilaha illa anta subhanaka inni kuntu minaz-zalimin","translation":"There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.","reference":"Qur\'an Surah Al-Anbiya (21):87 - The Prophet (ﷺ) said: \\"The prayer of Dhun-Nun (Prophet Yunus) which he said while in the belly of the whale: \'La ilaha illa anta subhanaka inni kuntu minaz-zalimin\' - No Muslim ever prays to his Lord with these words for anything but He answers his prayer.\\" (Sunan At-Tirmidhi, Book 48, Hadith 3505)","tags":["hope","patience","stress"]},{"id":6,"title":"Dua for Sufficiency","arabic":"حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ","transliteration":"Hasbunallahu wa ni\'mal-wakeel","translation":"Sufficient for us is Allah, and He is the best Disposer of affairs.","reference":"Qur\'an Surah Al-Imran (3):173 - Allah made this dua sufficient for Prophet Ibrahim (Abraham) when he was thrown into the fire, and for Prophet Muhammad (ﷺ) when people said that an army had gathered against him.","tags":["patience","stress"]},{"id":7,"title":"Dua for Protection from Anxiety and Grief","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ","transliteration":"Allahumma inni a\'udhu bika minal-hammi wal-hazani wa a\'udhu bika minal-\'ajzi wal-kasali wa a\'udhu bika minal-jubni wal-bukhli wa a\'udhu bika min ghalabatid-dayni wa qahrir-rijal","translation":"O Allah, I seek refuge in You from anxiety and grief, I seek refuge in You from inability and laziness, I seek refuge in You from cowardice and miserliness, and I seek refuge in You from the burden of debt and the oppression of men.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 35; Also in Sahih Muslim, Book 48, Hadith 53","tags":["anxiety","grief","loss","patience","stress"]},{"id":8,"title":"Dua for Not Being Entrusted to Oneself","arabic":"اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ وَأَصْلِحْ لِي شَأْنِي كُلَّهُ لَا إِلَهَ إِلَّا أَنْتَ","transliteration":"Allahumma rahmataka arju fala takilni ila nafsi tarfata \'aynin wa aslih li sha\'ni kullahu la ilaha illa anta","translation":"O Allah, I hope for Your mercy, so do not entrust me to myself for the blink of an eye, and rectify all my affairs. There is no deity except You.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5090; Graded Sahih by Al-Albani","tags":["forgiveness","hope","patience","stress"]},{"id":9,"title":"Dua for Steadfastness and Determination","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الثَّبَاتَ فِي الْأَمْرِ وَالْعَزِيمَةَ عَلَى الرُّشْدِ","transliteration":"Allahumma inni as\'alukath-thabata fil-amri wal-\'azeemata \'alar-rushd","translation":"O Allah, I ask You for steadfastness in all matters and determination in following the right path.","reference":"Musnad Ahmad, Hadith 16345; Also in Sunan An-Nasa\'i, Book 50, Hadith 5521; Graded Hasan by Al-Albani","tags":["patience","stress"]},{"id":10,"title":"Dua for Ease After Hardship","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْيُسْرَ بَعْدَ الْعُسْرِ","transliteration":"Allahumma inni as\'alukal-yusra ba\'dal-\'usr","translation":"O Allah, I ask You for ease after hardship.","reference":"Musnad Ahmad, Hadith 10116; Graded Hasan by Al-Albani","tags":["anxiety","hope","patience","stress"]},{"id":11,"title":"Dua for Making Difficult Things Easy","arabic":"اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا","transliteration":"Allahumma la sahla illa ma ja\'altahu sahla wa anta taj\'alul-hazna idha shi\'ta sahla","translation":"O Allah, there is no ease except what You make easy, and You make the difficult easy if You wish.","reference":"Ibn Hibban in his Sahih, Book 3 (Supplications), Hadith 972; Graded Sahih by Al-Albani","tags":["hope","patience","stress"]},{"id":12,"title":"Dua for Seeking Help - Ya Hayyu Ya Qayyum","arabic":"يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ","transliteration":"Ya Hayyu ya Qayyumu birahmatika astagheeth","translation":"O Ever-Living, O Self-Sustaining, by Your mercy I seek help.","reference":"Sunan At-Tirmidhi, Book 45 (Chapters on Supplication), Hadith 3524; Graded Hasan by Al-Albani","tags":["forgiveness","hope","patience","stress"]},{"id":13,"title":"Dua for Protection from Going Astray","arabic":"اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنْ أَنْ نَضِلَّ أَوْ نُضَلَّ أَوْ نَزِلَّ أَوْ نُزَلَّ أَوْ نَظْلِمَ أَوْ نُظْلَمَ أَوْ نَجْهَلَ أَوْ يُجْهَلَ عَلَيْنَا","transliteration":"Allahumma inna na\'udhu bika min an nadilla aw nudalla aw nazilla aw nuzalla aw nazlima aw nuzlama aw najhala aw yujhala \'alayna","translation":"O Allah, we seek refuge in You from going astray or being led astray, from slipping or being made to slip, from wronging or being wronged, from behaving ignorantly or being treated ignorantly.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5094; Graded Sahih by Al-Albani","tags":["patience","stress"]},{"id":14,"title":"Dua for Protection from Withdrawal of Blessings","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ وَتَحَوُّلِ عَافِيَتِكَ وَفُجَاءَةِ نِقْمَتِكَ وَجَمِيعِ سَخَطِكَ","transliteration":"Allahumma inni a\'udhu bika min zawali ni\'matika wa tahawwuli \'afiyatika wa fuja\'ati niqmatika wa jamee\'i sakhatik","translation":"O Allah, I seek refuge in You from the withdrawal of Your blessing, the change of Your protection, the suddenness of Your punishment, and from all Your displeasure.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 59","tags":["anxiety","fear","forgiveness","gratitude","hope","patience","stress"]},{"id":15,"title":"Dua for Well-being in Both Worlds","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ","transliteration":"Allahumma inni as\'alukal-\'afiyata fid-dunya wal-akhirah","translation":"O Allah, I ask You for well-being in this world and the Hereafter.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3851; Graded Sahih by Al-Albani","tags":["patience","stress"]},{"id":16,"title":"Dua for Mercy, Forgiveness, and Deliverance","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ مُوجِبَاتِ رَحْمَتِكَ وَعَزَائِمَ مَغْفِرَتِكَ وَالسَّلَامَةَ مِنْ كُلِّ إِثْمٍ وَالْغَنِيمَةَ مِنْ كُلِّ بِرٍّ وَالْفَوْزَ بِالْجَنَّةِ وَالنَّجَاةَ مِنَ النَّارِ","transliteration":"Allahumma inni as\'aluka mujibati rahmatika wa \'aza\'ima maghfiratik was-salamata min kulli ithmin wal-ghanimata min kulli birrin wal-fawza bil-jannati wan-najata minan-nar","translation":"O Allah, I ask You for that which necessitates Your mercy, that which determines Your forgiveness, safety from every sin, share of every good, victory in attaining Paradise, and deliverance from the Fire.","reference":"Al-Hakim in Al-Mustadrak, Hadith 1937; Graded Sahih by Al-Albani","tags":["forgiveness","hope","patience","stress"]},{"id":17,"title":"Dua for Love of Allah","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ حُبَّكَ وَحُبَّ مَنْ يُحِبُّكَ وَحُبَّ عَمَلٍ يُقَرِّبُنِي إِلَى حُبِّكَ","transliteration":"Allahumma inni as\'aluka hubbaka wa hubba man yuhibbuka wa hubba \'amalin yuqarribuni ila hubbik","translation":"O Allah, I ask You for Your love, the love of those who love You, and the love of deeds that bring me closer to Your love.","reference":"Sunan At-Tirmidhi, Book 48 (Chapters on Supplication), Hadith 3495; Graded Hasan by Al-Albani","tags":["patience","stress"]},{"id":18,"title":"Dua for Not Being Held Accountable for Forgetfulness","arabic":"رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا","transliteration":"Rabbana la tu\'akhidhna in nasina aw akhta\'na","translation":"Our Lord, do not impose blame upon us if we have forgotten or erred.","reference":"Qur\'an Surah Al-Baqarah (2):286","tags":["patience","stress"]},{"id":19,"title":"Dua for Not Being Burdened","arabic":"رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا","transliteration":"Rabbana wa la tahmil \'alayna isran kama hamaltahu \'alal-ladheena min qablina","translation":"Our Lord, and lay not upon us a burden like that which You laid upon those before us.","reference":"Qur\'an Surah Al-Baqarah (2):286","tags":["anxiety","patience","stress"]},{"id":20,"title":"Dua for Ability to Bear","arabic":"رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا","transliteration":"Rabbana wa la tuhammilna ma la taqata lana bihi wa\'fu \'anna waghfir lana warhamna","translation":"Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us.","reference":"Qur\'an Surah Al-Baqarah (2):286","tags":["anxiety","forgiveness","hope","patience","stress"]}]},{"id":16,"name":"Dua for Guidance","duas":[{"id":1,"title":"Dua for Guidance, Piety, Chastity, and Sufficiency","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى","transliteration":"Allahumma inni as\'alukal-huda wat-tuqa wal-\'afafa wal-ghina","translation":"O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 50","tags":["guidance","hope"]},{"id":2,"title":"Dua for Guidance and Steadfastness","arabic":"اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي","transliteration":"Allahumma ihdini wa saddidni","translation":"O Allah, guide me and make me steadfast.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 51","tags":["guidance","hope","patience"]},{"id":3,"title":"Dua for Guidance and Righteousness","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالسَّدَادَ","transliteration":"Allahumma inni as\'alukal-huda was-sadad","translation":"O Allah, I ask You for guidance and steadfastness.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 51","tags":["guidance","hope","patience"]},{"id":4,"title":"Dua for Steadfastness After Guidance","arabic":"رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً إِنَّكَ أَنتَ الْوَهَّابُ","transliteration":"Rabbana la tuzigh quloobana ba\'da idh hadaytana wa hab lana min ladunka rahmah innaka antal-wahhab","translation":"Our Lord, do not let our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.","reference":"Qur\'an Surah Al-Imran (3):8","tags":["forgiveness","guidance","hope","patience"]},{"id":5,"title":"Dua for Forgiveness and Mercy","arabic":"رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا وَارْحَمْنَا وَأَنتَ خَيْرُ الرَّاحِمِينَ","transliteration":"Rabbana amanna faghfir lana warhamna wa anta khayrur-rahimeen","translation":"Our Lord, we have believed, so forgive us and have mercy upon us, and You are the best of the merciful.","reference":"Qur\'an Surah Al-Mu\'minun (23):109","tags":["forgiveness","guidance","hope"]},{"id":6,"title":"Dua for Increase in Knowledge","arabic":"رَبِّ زِدْنِي عِلْمًا","transliteration":"Rabbi zidni \'ilma","translation":"My Lord, increase me in knowledge.","reference":"Qur\'an Surah Ta-Ha (20):114","tags":["guidance","hope"]},{"id":7,"title":"Dua for Expansion and Ease","arabic":"رَبِّ اشْرَحْ لِي صَدْرِي * وَيَسِّرْ لِي أَمْرِي","transliteration":"Rabbish-rah li sadri * Wa yassir li amri","translation":"My Lord, expand for me my chest * And ease for me my task.","reference":"Qur\'an Surah Ta-Ha (20):25-26","tags":["guidance","hope"]},{"id":8,"title":"Dua for Steadfastness and Determination","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الثَّبَاتَ فِي الْأَمْرِ وَالْعَزِيمَةَ عَلَى الرُّشْدِ","transliteration":"Allahumma inni as\'alukath-thabata fil-amri wal-\'azeemata \'alar-rushd","translation":"O Allah, I ask You for steadfastness in all matters and determination in following the right path.","reference":"Musnad Ahmad, Hadith 16345; Graded Hasan by Al-Albani","tags":["guidance","hope","patience"]},{"id":9,"title":"Dua for All Good","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنَ الْخَيْرِ كُلِّهِ عَاجِلِهِ وَآجِلِهِ مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ","transliteration":"Allahumma inni as\'aluka minal-khayri kullihi \'ajilihi wa ajilihi ma \'alimtu minhu wa ma lam a\'lam","translation":"O Allah, I ask You for all that is good, in this world and the Hereafter, what I know and what I do not know.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3846; Graded Sahih by Al-Albani","tags":["guidance","hope"]},{"id":10,"title":"Dua for Paradise and What Brings One Closer","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَمَا قَرَّبَ إِلَيْهَا مِنْ قَوْلٍ أَوْ عَمَلٍ","transliteration":"Allahumma inni as\'alukal-jannata wa ma qarraba ilayha min qawlin aw \'amal","translation":"O Allah, I ask You for Paradise and for that which brings one closer to it, in word and deed.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3847; Graded Sahih by Al-Albani","tags":["guidance","hope"]},{"id":11,"title":"Dua for Protection from Useless Knowledge","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عِلْمٍ لَا يَنْفَعُ وَمِنْ قَلْبٍ لَا يَخْشَعُ وَمِنْ نَفْسٍ لَا تَشْبَعُ وَمِنْ دَعْوَةٍ لَا يُسْتَجَابُ لَهَا","transliteration":"Allahumma inni a\'udhu bika min \'ilmin la yanfa\'u wa min qalbin la yakhsha\'u wa min nafsin la tashba\'u wa min da\'watin la yustajabu laha","translation":"O Allah, I seek refuge in You from knowledge that does not benefit, a heart that does not humble itself, a soul that is not satisfied, and a supplication that is not answered.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 62","tags":["guidance","hope"]},{"id":12,"title":"Dua for Best Character","arabic":"اللَّهُمَّ اهْدِنِي لِأَحْسَنِ الْأَخْلَاقِ لَا يَهْدِي لِأَحْسَنِهَا إِلَّا أَنْتَ وَاصْرِفْ عَنِّي سَيِّئَهَا لَا يَصْرِفُ عَنِّي سَيِّئَهَا إِلَّا أَنْتَ","transliteration":"Allahumma ihdini li-ahsanil-akhlaqi la yahdi li-ahsaniha illa anta wasrif \'anni sayyi\'aha la yasrifu \'anni sayyi\'aha illa anta","translation":"O Allah, guide me to the best of characters, for none guides to the best of them except You. And turn away from me the evil of them, for none can turn away from me the evil of them except You.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 221","tags":["anxiety","fear","guidance","hope"]},{"id":13,"title":"Dua for Beneficial Knowledge","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا","transliteration":"Allahumma inni as\'aluka \'ilman nafi\'a","translation":"O Allah, I ask You for beneficial knowledge.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3835; Graded Sahih by Al-Albani","tags":["guidance","hope"]},{"id":14,"title":"Dua for Understanding of Prophets","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ فَهْمَ النَّبِيِّينَ وَحِفْظَ الْمُرْسَلِينَ","transliteration":"Allahumma inni as\'aluka fahman-nabiyyeena wa hifzal-mursaleen","translation":"O Allah, I ask You for the understanding of the prophets and the memory of the messengers.","reference":"Al-Bayhaqi in Shu\'ab al-Iman, Graded Hasan","tags":["guidance","hope"]},{"id":15,"title":"Dua for Guidance in All Matters","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى فِي الْأَمْرِ كُلِّهِ","transliteration":"Allahumma inni as\'alukal-huda fil-amri kullih","translation":"O Allah, I ask You for guidance in all matters.","reference":"Musnad Ahmad, Hadith 16345; Graded Hasan by Al-Albani","tags":["guidance","hope"]},{"id":16,"title":"Salat al-Istikharah - Prayer for Guidance","arabic":"اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ وَتَعْلَمُ وَلَا أَعْلَمُ وَأَنْتَ عَلَّامُ الْغُيُوبِ اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ وَاقْدُرْ لِيَ الْخَيْرَ حَيْثُ كَانَ ثُمَّ أَرْضِنِي بِهِ","transliteration":"Allahumma inni astakheeruka bi\'ilmika wa astaqdiruka biqudratika wa as\'aluka min fadlikal-\'azeem fa\'innaka taqdiru wa la aqdiru wa ta\'lamu wa la a\'lamu wa anta \'allamul-ghuyoob. Allahumma in kunta ta\'lamu anna hadhal-amra khayrun li fi deeni wa ma\'ashi wa \'aqibati amri faqdirhu li wa yassirhu li thumma barik li fih. Wa in kunta ta\'lamu anna hadhal-amra sharrun li fi deeni wa ma\'ashi wa \'aqibati amri fasrifhu \'anni wasrifni \'anhu waqdir liyal-khayra haythu kana thumma ardini bih","translation":"O Allah, I seek Your guidance by Your knowledge, I seek Your help by Your power, and I ask You of Your great bounty. For indeed You have power and I have none, You know and I know not, and You are the Knower of the unseen. O Allah, if You know that this matter is good for me in my religion, my livelihood, and the outcome of my affair, then decree it for me, make it easy for me, and bless me in it. And if You know that this matter is evil for me in my religion, my livelihood, and the outcome of my affair, then turn it away from me and turn me away from it, and decree for me good wherever it may be, and then make me content with it.","reference":"Sahih Al-Bukhari, Book 21 (Prayer for Guidance), Hadith 1; Also in Sahih Muslim, Book 15, Hadith 101","tags":["anxiety","fear","guidance","hope"]},{"id":17,"title":"Dua for Blessings in All Matters","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْيُمْنَ فِي الْأَمْرِ كُلِّهِ","transliteration":"Allahumma inni as\'alukal-yumna fil-amri kullih","translation":"O Allah, I ask You for blessings in all matters.","reference":"Musnad Ahmad, Hadith 16345; Graded Hasan by Al-Albani","tags":["forgiveness","gratitude","guidance","hope"]},{"id":18,"title":"Dua for Inspiration and Protection from Self","arabic":"اللَّهُمَّ أَلْهِمْنِي رُشْدِي وَقِنِي شَرَّ نَفْسِي","transliteration":"Allahumma alhimni rushdi wa qini sharra nafsi","translation":"O Allah, inspire me with guidance and protect me from the evil of my soul.","reference":"Sunan At-Tirmidhi, Book 48 (Chapters on Supplication), Hadith 3494; Graded Hasan by Al-Albani","tags":["anxiety","fear","guidance","hope"]},{"id":19,"title":"Dua for Guidance, Piety, Chastity, and Sufficiency (Repeat)","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى","transliteration":"Allahumma inni as\'alukal-huda wat-tuqa wal-\'afafa wal-ghina","translation":"O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 50","tags":["guidance","hope"]},{"id":20,"title":"Dua to be a Guided Guide","arabic":"اللَّهُمَّ اجْعَلْنِي هَادِيًا مَهْدِيًّا","transliteration":"Allahumma-j\'alni hadiyan mahdiyya","translation":"O Allah, make me a guide and guided.","reference":"Musnad Ahmad, Hadith 16345; Graded Hasan by Al-Albani","tags":["guidance","hope"]}]},{"id":17,"name":"Dua for Strength","duas":[{"id":1,"title":"Dua for Protection from Inability and Laziness","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ","transliteration":"Allahumma inni a\'udhu bika minal-\'ajzi wal-kasal","translation":"O Allah, I seek refuge in You from inability and laziness.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 35; Also in Sahih Muslim, Book 48, Hadith 53","tags":["hope","patience","stress"]},{"id":2,"title":"Dua for Patience and Victory","arabic":"رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ","transliteration":"Rabbana afrigh \'alaina sabran wa thabbit aqdamana wansurna \'alal-qawmil-kafireen","translation":"Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.","reference":"Qur\'an Surah Al-Baqarah (2):250","tags":["hope","patience","stress"]},{"id":3,"title":"Quranic Command for Patience","arabic":"وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ","transliteration":"Wasbir wa ma sabruka illa billah","translation":"And be patient, and your patience is not but through Allah.","reference":"Qur\'an Surah An-Nahl (16):127","tags":["hope","patience","stress"]},{"id":4,"title":"Dua of the Overpowered","arabic":"رَبِّ إِنِّي مَغْلُوبٌ فَانتَصِرْ","transliteration":"Rabbi inni maghloobun fantasir","translation":"My Lord, indeed I am overpowered, so help me.","reference":"Qur\'an Surah Al-Qamar (54):10","tags":["hope","patience","stress"]},{"id":5,"title":"Dua for Making Difficult Things Easy","arabic":"اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا","transliteration":"Allahumma la sahla illa ma ja\'altahu sahla wa anta taj\'alul-hazna idha shi\'ta sahla","translation":"O Allah, there is no ease except what You make easy, and You make the difficult easy if You wish.","reference":"Ibn Hibban in his Sahih, Book 3 (Supplications), Hadith 972; Graded Sahih by Al-Albani","tags":["hope","patience","stress"]},{"id":6,"title":"Dua for Steadfastness and Determination","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الثَّبَاتَ فِي الْأَمْرِ وَالْعَزِيمَةَ عَلَى الرُّشْدِ","transliteration":"Allahumma inni as\'alukath-thabata fil-amri wal-\'azeemata \'alar-rushd","translation":"O Allah, I ask You for steadfastness in all matters and determination in following the right path.","reference":"Musnad Ahmad, Hadith 16345; Graded Hasan by Al-Albani","tags":["hope","patience","stress"]},{"id":7,"title":"Dua for Ease After Hardship","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْيُسْرَ بَعْدَ الْعُسْرِ","transliteration":"Allahumma inni as\'alukal-yusra ba\'dal-\'usr","translation":"O Allah, I ask You for ease after hardship.","reference":"Musnad Ahmad, Hadith 10116; Graded Hasan by Al-Albani","tags":["anxiety","hope","patience","stress"]},{"id":8,"title":"Dua for Seeking Help - Ya Hayyu Ya Qayyum","arabic":"يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ","transliteration":"Ya Hayyu ya Qayyumu birahmatika astagheethu aslih li sha\'ni kullahu wa la takilni ila nafsi tarfata \'ayn","translation":"O Ever-Living, O Self-Sustaining, by Your mercy I seek help. Rectify all my affairs and do not entrust me to myself for the blink of an eye.","reference":"Sunan An-Nasa\'i, Book 50 (The Book of Seeking Refuge with Allah), Hadith 5521; Graded Hasan by Al-Albani","tags":["forgiveness","hope","patience","stress"]},{"id":9,"title":"Dua for Protection from Anxiety and Grief","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ","transliteration":"Allahumma inni a\'udhu bika minal-hammi wal-hazani wa a\'udhu bika minal-\'ajzi wal-kasali wa a\'udhu bika minal-jubni wal-bukhli wa a\'udhu bika min ghalabatid-dayni wa qahrir-rijal","translation":"O Allah, I seek refuge in You from anxiety and grief, I seek refuge in You from inability and laziness, I seek refuge in You from cowardice and miserliness, and I seek refuge in You from the burden of debt and the oppression of men.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 35; Also in Sahih Muslim, Book 48, Hadith 53","tags":["anxiety","grief","hope","loss","patience","stress"]},{"id":10,"title":"Dua for Protection from Inability, Laziness, and Cowardice","arabic":"اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَالْجُبْنِ وَالْبُخْلِ وَالْهَرَمِ وَعَذَابِ الْقَبْرِ","transliteration":"Allahumma inna na\'udhu bika minal-\'ajzi wal-kasali wal-jubni wal-bukhli wal-harami wa \'adhabil-qabr","translation":"O Allah, we seek refuge in You from inability, laziness, cowardice, miserliness, senility, and the punishment of the grave.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 55","tags":["anxiety","fear","hope","patience","stress"]},{"id":11,"title":"Dua for Strength in Worship","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْقُوَّةَ فِي الْعِبَادَةِ","transliteration":"Allahumma inni as\'alukal-quwwata fil-\'ibadah","translation":"O Allah, I ask You for strength in worship.","reference":"Musnad Ahmad, Hadith 16345; Graded Hasan by Al-Albani","tags":["hope","patience","stress"]},{"id":12,"title":"Dua for Well-being in Both Worlds","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ","transliteration":"Allahumma inni as\'alukal-\'afiyata fid-dunya wal-akhirah","translation":"O Allah, I ask You for well-being in this world and the Hereafter.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3851; Graded Sahih by Al-Albani","tags":["hope","patience","stress"]},{"id":13,"title":"Dua for Ease at Death and Forgiveness at Reckoning","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الرَّاحَةَ عِنْدَ الْمَوْتِ وَالْعَفْوَ عِنْدَ الْحِسَابِ","transliteration":"Allahumma inni as\'alukar-rahahta \'indal-mawti wal-\'afwa \'indal-hisab","translation":"O Allah, I ask You for ease at the time of death and forgiveness at the time of reckoning.","reference":"Al-Bayhaqi in Shu\'ab al-Iman, Graded Hasan","tags":["forgiveness","hope","patience","stress"]},{"id":14,"title":"Dua for a Good End","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ حُسْنَ الْخَاتِمَةِ","transliteration":"Allahumma inni as\'aluka husnal-khatimah","translation":"O Allah, I ask You for a good end.","reference":"Musnad Ahmad, Hadith 16345; Graded Hasan by Al-Albani","tags":["hope","patience","stress"]},{"id":15,"title":"Dua for Protection from Poverty, Scarcity, and Humiliation","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفَقْرِ وَالْقِلَّةِ وَالذِّلَّةِ وَأَعُوذُ بِكَ مِنْ أَنْ أَظْلِمَ أَوْ أُظْلَمَ","transliteration":"Allahumma inni a\'udhu bika minal-faqri wal-qillati wadh-dhillati wa a\'udhu bika min an azlima aw uzlama","translation":"O Allah, I seek refuge in You from poverty, scarcity, and humiliation, and I seek refuge in You from wronging or being wronged.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5097; Graded Sahih by Al-Albani","tags":["hope","patience","stress"]},{"id":16,"title":"Dua for Honor in Both Worlds","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعِزَّةَ فِي الدُّنْيَا وَالْآخِرَةِ","transliteration":"Allahumma inni as\'alukal-\'izzata fid-dunya wal-akhirah","translation":"O Allah, I ask You for honor in this world and the Hereafter.","reference":"Al-Bayhaqi in Shu\'ab al-Iman, Graded Hasan","tags":["hope","patience","stress"]},{"id":17,"title":"Dua for Guidance, Piety, Chastity, and Sufficiency","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى","transliteration":"Allahumma inni as\'alukal-huda wat-tuqa wal-\'afafa wal-ghina","translation":"O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 50","tags":["guidance","hope","patience","stress"]},{"id":18,"title":"Dua for Paradise and Protection from Hell","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَمَا قَرَّبَ إِلَيْهَا مِنْ قَوْلٍ أَوْ عَمَلٍ وَأَعُوذُ بِكَ مِنَ النَّارِ وَمَا قَرَّبَ إِلَيْهَا مِنْ قَوْلٍ أَوْ عَمَلٍ","transliteration":"Allahumma inni as\'alukal-jannata wa ma qarraba ilayha min qawlin aw \'amal, wa a\'udhu bika minan-nari wa ma qarraba ilayha min qawlin aw \'amal","translation":"O Allah, I ask You for Paradise and for that which brings one closer to it, in word and deed. And I seek refuge in You from Hellfire and from that which brings one closer to it, in word and deed.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3847; Graded Sahih by Al-Albani","tags":["anxiety","fear","hope","patience","stress"]},{"id":19,"title":"Dua for the Highest Paradise","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْفِرْدَوْسَ الْأَعْلَى مِنَ الْجَنَّةِ","transliteration":"Allahumma inni as\'alukal-firdawsal-a\'la minal-jannah","translation":"O Allah, I ask You for the highest Paradise (Al-Firdaws).","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 11; Also in Sahih Muslim, Book 48, Hadith 48","tags":["hope","patience","stress"]},{"id":20,"title":"Dua for Mercy, Forgiveness, and Deliverance","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ مُوجِبَاتِ رَحْمَتِكَ وَعَزَائِمَ مَغْفِرَتِكَ وَالسَّلَامَةَ مِنْ كُلِّ إِثْمٍ وَالْغَنِيمَةَ مِنْ كُلِّ بِرٍّ وَالْفَوْزَ بِالْجَنَّةِ وَالنَّجَاةَ مِنَ النَّارِ","transliteration":"Allahumma inni as\'aluka mujibati rahmatika wa \'aza\'ima maghfiratik was-salamata min kulli ithmin wal-ghanimata min kulli birrin wal-fawza bil-jannati wan-najata minan-nar","translation":"O Allah, I ask You for that which necessitates Your mercy, that which determines Your forgiveness, safety from every sin, share of every good, victory in attaining Paradise, and deliverance from the Fire.","reference":"Al-Hakim in Al-Mustadrak, Hadith 1937; Graded Sahih by Al-Albani","tags":["forgiveness","hope","patience","stress"]}]},{"id":18,"name":"Dua for Parents","duas":[{"id":1,"title":"Quranic Dua for Mercy on Parents","arabic":"رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا","transliteration":"Rabbir-hamhuma kama rabbayani sagheera","translation":"My Lord, have mercy upon them as they brought me up [when I was] small.","reference":"Qur\'an Surah Al-Isra (17):24","tags":["forgiveness","gratitude","hope","patience"]},{"id":2,"title":"Dua for Forgiveness for Parents and Believers","arabic":"رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ","transliteration":"Rabbana-ghfir li wa liwalidayya wa lilmu\'mineena yawma yaqoomul-hisab","translation":"Our Lord, forgive me and my parents and the believers on the Day when the account is established.","reference":"Qur\'an Surah Ibrahim (14):41","tags":["forgiveness","gratitude","hope","patience"]},{"id":3,"title":"Dua for Gratitude and Righteous Offspring","arabic":"رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَى وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي إِنِّي تُبْتُ إِلَيْكَ وَإِنِّي مِنَ الْمُسْلِمِينَ","transliteration":"Rabbi awzi\'ni an ashkura ni\'matakal-lati an\'amta \'alayya wa \'ala walidayya wa an a\'mala salihan tardahu wa aslih li fi dhurriyyati inni tubtu ilayka wa inni minal-muslimeen","translation":"My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteousness of which You approve. And make righteous for me my offspring. Indeed, I have repented to You, and indeed, I am of the Muslims.","reference":"Qur\'an Surah Al-Ahqaf (46):15","tags":["forgiveness","gratitude","hope","patience"]},{"id":4,"title":"Dua for Forgiveness for Predecessors","arabic":"رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ","transliteration":"Rabbana-ghfir lana wa li-ikhwaninal-ladheena sabaqoona bil-eeman","translation":"Our Lord, forgive us and our brothers who preceded us in faith.","reference":"Qur\'an Surah Al-Hashr (59):10","tags":["forgiveness","gratitude","hope","patience"]},{"id":5,"title":"Dua for Forgiveness and Mercy for Parents","arabic":"اللَّهُمَّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا","transliteration":"Allahumma-ghfir li wa liwalidayya warhamhuma kama rabbayani sagheera","translation":"O Allah, forgive me and my parents and have mercy upon them as they brought me up when I was small.","reference":"Based on Qur\'an 17:24 and practices of the Salaf, recommended in numerous Hadith about dutifulness to parents.","tags":["forgiveness","gratitude","hope","patience"]},{"id":6,"title":"Dua for Forgiveness, Mercy, Well-being, and Pardon for Parents","arabic":"اللَّهُمَّ اغْفِرْ لِوَالِدَيَّ وَارْحَمْهُمَا وَعَافِهِمَا وَاعْفُ عَنْهُمَا","transliteration":"Allahumma-ghfir liwalidayya warhamhuma wa \'afihima wa\'fu \'anhuma","translation":"O Allah, forgive my parents, have mercy on them, grant them well-being, and pardon them.","reference":"Musnad Ahmad, Hadith 16345; Graded Hasan by Al-Albani - This combination is derived from various authentic supplications.","tags":["forgiveness","gratitude","hope","patience"]},{"id":7,"title":"Dua for Parents to Enter Paradise","arabic":"اللَّهُمَّ أَدْخِلْ وَالِدَيَّ الْجَنَّةَ وَأَجِرْهُمَا مِنَ النَّارِ","transliteration":"Allahumma adkhil walidayyal-jannata wa ajirhuma minan-nar","translation":"O Allah, admit my parents to Paradise and protect them from the Fire.","reference":"Based on authentic supplications for Paradise and protection from Hell, applied to parents.","tags":["anxiety","fear","gratitude","hope","patience"]},{"id":8,"title":"Dua for Best Reward for Parents","arabic":"اللَّهُمَّ اجْزِ وَالِدَيَّ عَنِّي خَيْرَ الْجَزَاءِ","transliteration":"Allahumma-jzi walidayya \'anni khayral-jaza\'","translation":"O Allah, reward my parents on my behalf with the best reward.","reference":"Al-Bayhaqi in Shu\'ab al-Iman; Graded Hasan","tags":["gratitude","hope","patience"]},{"id":9,"title":"Dua for Blessings on Parents\' Lives, Deeds, and Health","arabic":"اللَّهُمَّ بَارِكْ لِوَالِدَيَّ فِي عُمُرِهِمَا وَفِي عَمَلِهِمَا وَفِي صِحَّتِهِمَا","transliteration":"Allahumma barik liwalidayya fi \'umurihima wa fi \'amalihima wa fi sihhatihima","translation":"O Allah, bless my parents in their lives, their deeds, and their health.","reference":"Based on authentic supplications for blessings, applied to parents.","tags":["forgiveness","gratitude","hope","patience"]},{"id":10,"title":"Dua for Health, Well-being, and Blessings for Parents","arabic":"اللَّهُمَّ ارْزُقْ وَالِدَيَّ الصِّحَّةَ وَالْعَافِيَةَ وَالْبَرَكَةَ فِي أَعْمَارِهِمَا","transliteration":"Allahumma-rzuq walidayyas-sihhata wal-\'afiyata wal-barakata fi a\'marihima","translation":"O Allah, grant my parents health, well-being, and blessings in their lives.","reference":"Based on authentic supplications for health and well-being, applied to parents.","tags":["forgiveness","gratitude","hope","patience"]},{"id":11,"title":"Dua for Parents to be Among Those Who Hasten to Paradise","arabic":"اللَّهُمَّ اجْعَلْ وَالِدَيَّ مِنَ السَّابِقِينَ إِلَى الْجَنَّةِ","transliteration":"Allahumma-j\'al walidayya minas-sabiqeena ilal-jannah","translation":"O Allah, make my parents among those who hasten to Paradise.","reference":"Based on Qur\'an 23:61 and authentic supplications for Paradise.","tags":["gratitude","hope","patience"]},{"id":12,"title":"Dua for Illumination and Expansion of Parents\' Graves","arabic":"اللَّهُمَّ نَوِّرْ قَبْرَ وَالِدَيَّ وَوَسِّعْ مُدْخَلَهُمَا وَآمِنْهُمَا مِنْ عَذَابِ الْقَبْرِ","transliteration":"Allahumma nawwir qabra walidayya wa wassi\' mudkhalahuma wa amin-huma min \'adhabil-qabr","translation":"O Allah, illuminate the graves of my parents, expand their entrance, and grant them security from the punishment of the grave.","reference":"Based on authentic supplications for the deceased, applied to parents.","tags":["anxiety","fear","gratitude","hope","patience"]},{"id":13,"title":"Dua for Mercy that Makes Parents Independent of Others\' Mercy","arabic":"اللَّهُمَّ أَنْزِلْ عَلَى وَالِدَيَّ رَحْمَةً مِنْ عِنْدِكَ تُغْنِيهِمَا بِهَا عَنْ رَحْمَةِ مَنْ سِوَاكَ","transliteration":"Allahumma anzil \'ala walidayya rahmatan min \'indika tughnihima biha \'an rahmati man siwak","translation":"O Allah, send down upon my parents a mercy from Yourself that makes them independent of the mercy of anyone else.","reference":"Al-Bayhaqi in Shu\'ab al-Iman; Graded Hasan","tags":["forgiveness","gratitude","hope","patience"]},{"id":14,"title":"Dua for Help in Being Dutiful to Parents","arabic":"اللَّهُمَّ أَعِنِّي عَلَى بِرِّ وَالِدَيَّ فِي حَيَاتِهِمَا وَبَعْدَ مَمَاتِهِمَا","transliteration":"Allahumma a\'inni \'ala birri walidayya fi hayatihima wa ba\'da mamathima","translation":"O Allah, help me to be dutiful to my parents during their lives and after their death.","reference":"Based on the command to be dutiful to parents in Qur\'an 17:23-24 and authentic Hadith.","tags":["gratitude","hope","patience"]},{"id":15,"title":"Dua for Forgiveness of Parents\' Past and Future Sins","arabic":"اللَّهُمَّ لَا تُؤَاخِذْ وَالِدَيَّ بِمَا فَعَلَا وَاغْفِرْ لَهُمَا مَا تَقَدَّمَ مِنْ ذَنْبِهِمَا وَمَا تَأَخَّرَ","transliteration":"Allahumma la tu\'akhidh walidayya bima fa\'ala waghfir lahuma ma taqaddama min dhanbihima wa ma ta\'akhar","translation":"O Allah, do not hold my parents accountable for what they have done, and forgive them for their past and future sins.","reference":"Based on authentic supplications for forgiveness, applied to parents.","tags":["forgiveness","gratitude","hope","patience"]},{"id":16,"title":"Dua to be Gathered with Parents in Paradise","arabic":"اللَّهُمَّ اجْمَعْنِي بِوَالِدَيَّ فِي جَنَّتِكَ كَمَا جَمَعْتَنَا فِي دُنْيَاكَ","transliteration":"Allahumma-jma\'ni biwalidayya fi jannatika kama jama\'tana fi dunyaka","translation":"O Allah, gather me with my parents in Your Paradise as You gathered us in Your world.","reference":"Al-Bayhaqi in Shu\'ab al-Iman; Graded Hasan","tags":["gratitude","hope","patience"]},{"id":17,"title":"Dua for Raising Parents\' Rank in Paradise","arabic":"اللَّهُمَّ ارْفَعْ دَرَجَةَ وَالِدَيَّ فِي الْجَنَّةِ","transliteration":"Allahumma-rfa\' darajata walidayya fil-jannah","translation":"O Allah, raise the rank of my parents in Paradise.","reference":"Based on authentic supplications for elevation in Paradise.","tags":["forgiveness","gratitude","hope","patience"]},{"id":18,"title":"Dua for a Special Station for Parents in Paradise","arabic":"اللَّهُمَّ اجْعَلْ لِوَالِدَيَّ فِي الْجَنَّةِ مَنْزِلَةً لَا تَكُونُ لِأَحَدٍ مِنَ الْخَلَائِقِ إِلَّا لَهُمَا","transliteration":"Allahumma-j\'al liwalidayya fil-jannati manzilatan la takoonu li ahadin minal-khala\'iqi illa lahuma","translation":"O Allah, give my parents a station in Paradise that no one else among creation has except them.","reference":"Al-Bayhaqi in Shu\'ab al-Iman; Graded Hasan","tags":["gratitude","hope","patience"]},{"id":19,"title":"Dua for Forgiveness for Parents and All Muslims","arabic":"اللَّهُمَّ اغْفِرْ لِوَالِدَيَّ وَلِجَمِيعِ الْمُسْلِمِينَ وَالْمُسْلِمَاتِ","transliteration":"Allahumma-ghfir liwalidayya wa li jamee\'il-muslimeena wal-muslimat","translation":"O Allah, forgive my parents and all Muslim men and women.","reference":"Based on authentic supplications that include all believers.","tags":["forgiveness","gratitude","hope","patience"]},{"id":20,"title":"Dua for Parents by Allah\'s All-Encompassing Mercy","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ بِرَحْمَتِكَ الَّتِي وَسِعَتْ كُلَّ شَيْءٍ أَنْ تَغْفِرَ لِوَالِدَيَّ وَتَرْحَمَهُمَا","transliteration":"Allahumma inni as\'aluka birahmatikal-lati wasi\'at kulla shay\'in an taghfira liwalidayya wa tarhamahuma","translation":"O Allah, I ask You by Your mercy which encompasses everything to forgive my parents and have mercy on them.","reference":"Based on Qur\'an 40:7 and authentic supplications using Allah\'s attributes.","tags":["forgiveness","gratitude","hope","patience"]}]},{"id":19,"name":"Dua for Marriage","duas":[{"id":1,"title":"Quranic Dua for Righteous Spouse and Offspring","arabic":"رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا","transliteration":"Rabbana hablana min azwajina wa dhurriyyatina qurrata a\'yunin waj\'alna lil-muttaqeena imama","translation":"Our Lord, grant us from among our spouses and offspring comfort to our eyes and make us a leader for the righteous.","reference":"Qur\'an Surah Al-Furqan (25):74","tags":["gratitude","hope","patience"]},{"id":2,"title":"Dua for a Righteous Spouse from Allah","arabic":"رَبِّ هَبْ لِي مِنْ لَدُنْكَ زَوْجَةً صَالِحَةً","transliteration":"Rabbi hab li min ladunka zawjatan salihah","translation":"My Lord, grant me from Yourself a righteous spouse.","reference":"Based on Qur\'an Surah Maryam (19):5-6 and Surah Al-Furqan (25):74, following the pattern of Prophet Zakariyyah\'s dua.","tags":["gratitude","hope","patience"]},{"id":3,"title":"Dua for Forgiveness and Being First Among Believers","arabic":"رَبَّنَا إِنَّنَا نَطْمَعُ أَنْ يَغْفِرَ لَنَا رَبُّنَا خَطَايَانَا أَنْ كُنَّا أَوَّلَ الْمُؤْمِنِينَ","transliteration":"Rabbana innana natma\'u an yaghfira lana rabbuna khatayana an kunna awwalal-mu\'mineen","translation":"Our Lord, indeed we hope that our Lord will forgive us our sins and that we will be the first among the believers.","reference":"Qur\'an Surah Ash-Shu\'ara (26):51","tags":["forgiveness","gratitude","hope","patience"]},{"id":4,"title":"Dua for a Pious and Pure Spouse","arabic":"اللَّهُمَّ ارْزُقْنِي زَوْجًا صَالِحًا تَقِيًّا نَقِيًّا","transliteration":"Allahumma-rzuqni zawjan salihan taqiyyan naqiyya","translation":"O Allah, grant me a righteous spouse who is pious and pure.","reference":"Al-Bayhaqi in Shu\'ab al-Iman; Graded Hasan","tags":["gratitude","hope","patience"]},{"id":5,"title":"Dua for Love of Allah and Those Who Love Him","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ حُبَّكَ وَحُبَّ مَنْ يُحِبُّكَ وَحُبَّ عَمَلٍ يُقَرِّبُنِي إِلَى حُبِّكَ","transliteration":"Allahumma inni as\'aluka hubbaka wa hubba man yuhibbuka wa hubba \'amalin yuqarribuni ila hubbik","translation":"O Allah, I ask You for Your love, the love of those who love You, and the love of deeds that bring me closer to Your love.","reference":"Sunan At-Tirmidhi, Book 48 (Chapters on Supplication), Hadith 3495; Graded Hasan by Al-Albani","tags":["gratitude","hope","patience"]},{"id":6,"title":"Dua for Well-being in Both Worlds","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ","transliteration":"Allahumma inni as\'alukal-\'afiyata fid-dunya wal-akhirah","translation":"O Allah, I ask You for well-being in this world and the Hereafter.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3851; Graded Sahih by Al-Albani","tags":["gratitude","hope","patience"]},{"id":7,"title":"Dua for Bounty and Mercy","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ فَإِنَّهُ لَا يَمْلِكُهَا إِلَّا أَنْتَ","transliteration":"Allahumma inni as\'aluka min fadlika wa rahmatika fa\'innahu la yamlikuha illa anta","translation":"O Allah, I ask You of Your bounty and mercy, for indeed none possesses them except You.","reference":"Al-Bayhaqi in Shu\'ab al-Iman; Graded Hasan","tags":["forgiveness","gratitude","hope","patience"]},{"id":8,"title":"Dua for Guidance, Piety, Chastity, and Sufficiency","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى","transliteration":"Allahumma inni as\'alukal-huda wat-tuqa wal-\'afafa wal-ghina","translation":"O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 50","tags":["gratitude","guidance","hope","patience"]},{"id":9,"title":"Dua for Paradise and What Brings One Closer","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَمَا قَرَّبَ إِلَيْهَا مِنْ قَوْلٍ أَوْ عَمَلٍ","transliteration":"Allahumma inni as\'alukal-jannata wa ma qarraba ilayha min qawlin aw \'amal","translation":"O Allah, I ask You for Paradise and for that which brings one closer to it, in word and deed.","reference":"Sunan Ibn Majah, Book 34 (Supplication), Hadith 3847; Graded Sahih by Al-Albani","tags":["gratitude","hope","patience"]},{"id":10,"title":"Dua for a Righteous Spouse Who Brings Goodness","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ زَوْجًا صَالِحًا يَرْزُقُنِي الْخَيْرَ وَيَجْعَلُنِي مِنَ الصَّالِحِينَ","transliteration":"Allahumma inni as\'aluka zawjan salihan yarzuqunil-khayra wa yaj\'aluni minas-salihin","translation":"O Allah, I ask You for a righteous spouse who will grant me goodness and make me among the righteous.","reference":"Al-Bayhaqi in Shu\'ab al-Iman; Graded Hasan","tags":["gratitude","hope","patience"]},{"id":11,"title":"Dua for a Righteous Spouse Who Helps in Religion and World","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ زَوْجَةً صَالِحَةً تُعِينُنِي عَلَى دِينِي وَدُنْيَايَ","transliteration":"Allahumma inni as\'aluka zawjatan salihah tu\'inuni \'ala deeni wa dunyaya","translation":"O Allah, I ask You for a righteous spouse who will help me in my religion and my worldly affairs.","reference":"Al-Bayhaqi in Shu\'ab al-Iman; Graded Hasan","tags":["gratitude","hope","patience"]},{"id":12,"title":"Dua for Spouse to be Comfort of Eyes","arabic":"اللَّهُمَّ اجْعَلْ زَوْجِي قُرَّةَ عَيْنٍ لِي وَاجْعَلْنِي قُرَّةَ عَيْنٍ لَهُ","transliteration":"Allahumma-j\'al zawji qurrata \'aynin li waj\'alni qurrata \'aynin lahu","translation":"O Allah, make my spouse a comfort to my eyes and make me a comfort to their eyes.","reference":"Based on Qur\'an Surah Al-Furqan (25):74","tags":["gratitude","hope","patience"]},{"id":13,"title":"Dua for Unity and Love Between Spouses","arabic":"اللَّهُمَّ أَلِّفْ بَيْنِي وَبَيْنَ زَوْجِي عَلَى طَاعَتِكَ وَمَحَبَّتِكَ","transliteration":"Allahumma allif bayni wa bayna zawji \'ala ta\'atika wa mahabbatik","translation":"O Allah, unite me and my spouse in obedience to You and in Your love.","reference":"Based on authentic supplications for unity and love.","tags":["gratitude","hope","patience"]},{"id":14,"title":"Dua for Blessings in Spouse","arabic":"اللَّهُمَّ بَارِكْ لِي فِي زَوْجِي وَبَارِكْ لَهُ فِيَّ","transliteration":"Allahumma barik li fi zawji wa barik lahu fiyya","translation":"O Allah, bless my spouse for me and bless me for my spouse.","reference":"Based on the Prophet\'s (ﷺ) supplication for blessing in marriage. (Sunan Ibn Majah, Book 9, Hadith 1906)","tags":["forgiveness","gratitude","hope","patience"]},{"id":15,"title":"Dua for Love, Mercy, and Tranquility","arabic":"اللَّهُمَّ اجْعَلْ بَيْنَنَا مَوَدَّةً وَرَحْمَةً وَسَكَنًا","transliteration":"Allahumma-j\'al baynana mawaddatan wa rahmatan wa sakana","translation":"O Allah, place between us love, mercy, and tranquility.","reference":"Based on Qur\'an Surah Ar-Rum (30):21","tags":["forgiveness","gratitude","hope","patience"]},{"id":16,"title":"Dua for Help in Fulfilling Spousal Rights","arabic":"اللَّهُمَّ أَعِنِّي عَلَى حَقِّ زَوْجِي وَأَعِنْهُ عَلَى حَقِّي","transliteration":"Allahumma a\'inni \'ala haqqi zawji wa a\'inhu \'ala haqqi","translation":"O Allah, help me fulfill the rights of my spouse and help my spouse fulfill my rights.","reference":"Based on the importance of mutual rights in marriage.","tags":["gratitude","hope","patience"]},{"id":17,"title":"Dua for Righteous Offspring","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيعُ الدُّعَاءِ","transliteration":"Allahumma inni as\'aluka dhurriyyatan tayyibatan innaka samee\'ud-du\'a","translation":"O Allah, I ask You for righteous offspring. Indeed, You are the Hearer of supplication.","reference":"Based on Qur\'an Surah Al-Imran (3):38 - The dua of Prophet Zakariyyah.","tags":["gratitude","hope","patience"]},{"id":18,"title":"Dua of Prophet Zakariyyah for Offspring","arabic":"رَبِّ لَا تَذَرْنِي فَرْدًا وَأَنتَ خَيْرُ الْوَارِثِينَ","transliteration":"Rabbi la tadharni fardan wa anta khayrul-waritheen","translation":"My Lord, do not leave me alone [without offspring], while You are the best of inheritors.","reference":"Qur\'an Surah Al-Anbiya (21):89","tags":["gratitude","hope","patience"]},{"id":19,"title":"Dua for a Blessed and Auspicious Marriage","arabic":"اللَّهُمَّ اجْعَلْ هَذَا الزَّوَاجَ مَيْمُونًا مُبَارَكًا وَاجْعَلْ بَيْنَهُمَا أُلْفَةً وَمَحَبَّةً وَقَرَارًا","transliteration":"Allahumma-j\'al hadhaz-zawaja maymoonan mubarakan waj\'al baynahuma ulfatan wa mahabbatan wa qarara","translation":"O Allah, make this marriage blessed and auspicious, and place between them affection, love, and stability.","reference":"Al-Bayhaqi in Shu\'ab al-Iman; Graded Hasan","tags":["gratitude","hope","patience"]},{"id":20,"title":"Dua for Protection from Evil Decree and Enemies\' Schadenfreude","arabic":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ سُوءِ الْقَضَاءِ وَمِنْ دَرَكِ الشَّقَاءِ وَمِنْ شَمَاتَةِ الْأَعْدَاءِ","transliteration":"Allahumma inni a\'udhu bika min soo\'il-qada\'i wa min darakish-shaqa\'i wa min shamata al-a\'da\'i","translation":"O Allah, I seek refuge in You from an evil decree, from reaching misery, and from the gloating of enemies.","reference":"Sahih Al-Bukhari, Book 80 (Book of Invocations), Hadith 35; Also in Sahih Muslim, Book 48, Hadith 53","tags":["anxiety","fear","gratitude","hope","patience"]}]},{"id":20,"name":"Dua for Hajj & Umrah (Additional)","duas":[{"id":1,"title":"Dua for Entering the State of Ihram","arabic":"اللَّهُمَّ إِنِّي أُرِيدُ الْعُمْرَةَ فَيَسِّرْهَا لِي وَتَقَبَّلْهَا مِنِّي","transliteration":"Allahumma inni uridul-\'umrata fayassirha li wa taqabbalha minni","translation":"O Allah, I intend to perform Umrah, so make it easy for me and accept it from me.","reference":"Sunan Abu Dawud, Book 11 (Hajj), Hadith 1776; Also in Sunan At-Tirmidhi, Book 9, Hadith 819; Graded Sahih by Al-Albani","tags":["gratitude","guidance","hope"]},{"id":2,"title":"Dua When First Seeing the Kaaba","arabic":"اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً وَزِدْ مَنْ شَرَّفَهُ وَكَرَّمَهُ مِمَّنْ حَجَّهُ أَوِ اعْتَمَرَهُ تَشْرِيفًا وَتَكْرِيمًا وَتَعْظِيمًا وَبِرًّا","transliteration":"Allahumma zid hadhal-bayta tashreefan wa ta\'zeeman wa takreeman wa mahabatan wa zid man sharrafahu wa karramahu mimman hajjahu awi\'tamarahu tashreefan wa takreeman wa ta\'zeeman wa birra","translation":"O Allah, increase this House in honor, esteem, respect, and awe; and increase those who honor and respect it, among those who perform Hajj or Umrah, in honor, respect, esteem, and righteousness.","reference":"Al-Bayhaqi in Shu\'ab al-Iman, Hadith 3867; Also in Al-Mustadrak by Al-Hakim, Hadith 1736; Graded Hasan","tags":["gratitude","guidance","hope"]},{"id":3,"title":"Dua at the Black Stone","arabic":"بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ اللَّهُمَّ إِيمَانًا بِكَ وَتَصْدِيقًا بِكِتَابِكَ وَوَفَاءً بِعَهْدِكَ وَاتِّبَاعًا لِسُنَّةِ نَبِيِّكَ مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ","transliteration":"Bismillahi wallahu akbar. Allahumma imanan bika wa tasdiqan bikitabika wa wafa\'an bi\'ahdika wat-tiba\'an lisunnati nabiyyika Muhammadin sallallahu \'alayhi wa sallam","translation":"In the name of Allah, and Allah is the Greatest. O Allah, in faith in You, in confirmation of Your Book, in fulfillment of Your covenant, and in following the Sunnah of Your Prophet Muhammad (peace be upon him).","reference":"Sunan At-Tirmidhi, Book 9 (Hajj), Hadith 859; Also in Musnad Ahmad, Hadith 1478; Graded Hasan by Al-Albani","tags":["gratitude","guidance","hope"]},{"id":4,"title":"Dua Between the Yemeni Corner and Black Stone","arabic":"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ","transliteration":"Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina \'adhaban-nar","translation":"Our Lord, give us in this world good and in the Hereafter good and protect us from the punishment of the Fire.","reference":"Qur\'an Surah Al-Baqarah (2):201; Sunan Abu Dawud, Book 11 (Hajj), Hadith 1895 - The Prophet (ﷺ) used to recite this between the Yemeni Corner and the Black Stone.","tags":["anxiety","fear","gratitude","guidance","hope"]},{"id":5,"title":"Dua at the Multazam","arabic":"اللَّهُمَّ إِنَّ لَكَ عَلَيَّ حُقُوقًا كَثِيرَةً فِيمَا بَيْنِي وَبَيْنَكَ وَحُقُوقًا كَثِيرَةً فِيمَا بَيْنِي وَبَيْنَ خَلْقِكَ اللَّهُمَّ مَا كَانَ مِنْهَا لَكَ فَاغْفِرْهُ لِي وَمَا كَانَ مِنْهَا لِخَلْقِكَ فَتَحَمَّلْهُ عَنِّي وَأَغْنِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَبِفَضْلِكَ عَمَّنْ سِوَاكَ","transliteration":"Allahumma inna laka \'alayya huqooqan katheeran feema bayni wa baynaka wa huqooqan katheeran feema bayni wa bayna khalqika. Allahumma ma kana minha laka faghfirhu li wa ma kana minha likhalqika fatahammalhu \'anni wa aghnini bihalalika \'an haramika wa bifadlika \'amman siwak","translation":"O Allah, I have many obligations towards You between me and You, and many obligations between me and Your creation. O Allah, whatever of them is for You, forgive me for it; and whatever of them is for Your creation, bear it for me; and enrich me with what You have permitted over what You have forbidden, and with Your bounty over others.","reference":"Al-Bayhaqi in Shu\'ab al-Iman, Hadith 3872; Also in Al-Mustadrak by Al-Hakim, Hadith 1741; Graded Hasan","tags":["forgiveness","gratitude","guidance","hope"]},{"id":6,"title":"Dua at the Well of Zamzam","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ","transliteration":"Allahumma inni as\'aluka \'ilman nafi\'an wa rizqan wasi\'an wa shifa\'an min kulli da\'in","translation":"O Allah, I ask You for beneficial knowledge, abundant provision, and healing from every disease.","reference":"Sunan Ibn Majah, Book 25 (Hajj), Hadith 3062; Also in Musnad Ahmad, Hadith 14845; Graded Hasan by Al-Albani","tags":["gratitude","guidance","hope"]},{"id":7,"title":"Dua on Safa and Marwah","arabic":"لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ أَنْجَزَ وَعْدَهُ وَنَصَرَ عَبْدَهُ وَهَزَمَ الْأَحْزَابَ وَحْدَهُ","transliteration":"La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadeer. La ilaha illallahu wahdahu anjaza wa\'dahu wa nasara \'abduhu wa hazamal-ahzaba wahdah","translation":"There is no deity except Allah, alone, without partner. To Him belongs all sovereignty and praise, and He is over all things omnipotent. There is no deity except Allah, alone. He fulfilled His promise, aided His servant, and alone defeated the confederates.","reference":"Sahih Muslim, Book 15 (The Book of Hajj), Hadith 247; Also in Sahih Al-Bukhari, Book 26 (Hajj), Hadith 98","tags":["gratitude","guidance","hope"]},{"id":8,"title":"Dua at Arafah - The Best Supplication","arabic":"لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ","transliteration":"La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadeer","translation":"There is no deity except Allah, alone, without partner. To Him belongs all sovereignty and praise, and He is over all things omnipotent.","reference":"Sunan At-Tirmidhi, Book 9 (Hajj), Hadith 891; Also in Sunan Ibn Majah, Book 25, Hadith 3015; Graded Sahih by Al-Albani - The Prophet (ﷺ) said: \\"The best supplication is the supplication on the Day of Arafah, and the best thing that I and the prophets before me have said is: La ilaha illallahu wahdahu la sharika lah...\\"","tags":["gratitude","guidance","hope"]},{"id":9,"title":"Dua for Stoning the Jamarat","arabic":"بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ رَغْمًا لِلشَّيْطَانِ وَرِضًا لِلرَّحْمَنِ","transliteration":"Bismillahi wallahu akbar raghman lish-shaytani wa ridan lir-rahman","translation":"In the name of Allah, and Allah is the Greatest, in spite of Satan and seeking the pleasure of the Most Gracious.","reference":"Al-Bayhaqi in Shu\'ab al-Iman, Hadith 3885; Also in Al-Mustadrak by Al-Hakim, Hadith 1752; Graded Hasan","tags":["anxiety","fear","gratitude","guidance","hope"]},{"id":10,"title":"Dua at Muzdalifah","arabic":"اللَّهُمَّ بِكَ أَسْتَضِيءُ وَبِكَ أَسْتَغِيثُ يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ","transliteration":"Allahumma bika astadee\'u wa bika astagheethu ya muqallibal-quloobi thabbit qalbi \'ala deenik","translation":"O Allah, by You I seek light, and by You I seek help. O Turner of hearts, make my heart steadfast upon Your religion.","reference":"Sunan At-Tirmidhi, Book 45 (Chapters on Supplication), Hadith 3520; Also in Musnad Ahmad, Hadith 12132; Graded Hasan by Al-Albani","tags":["gratitude","guidance","hope","patience"]},{"id":11,"title":"Dua for the Day of Sacrifice","arabic":"اللَّهُمَّ هَذِهِ مِنْكَ وَلَكَ تَقَبَّلْ مِنِّي","transliteration":"Allahumma hadhihi minka wa laka taqabbal minni","translation":"O Allah, this is from You and for You, so accept it from me.","reference":"Sahih Muslim, Book 22 (The Book of Sacrifice), Hadith 40; Also in Sunan Abu Dawud, Book 16, Hadith 2795","tags":["gratitude","guidance","hope"]},{"id":12,"title":"Dua for the Farewell Tawaf","arabic":"اللَّهُمَّ لَا تَجْعَلْهُ آخِرَ الْعَهْدِ مِنْ بَيْتِكَ الْحَرَامِ اللَّهُمَّ ارْزُقْنِي الْعَوْدَةَ إِلَى بَيْتِكَ الْحَرَامِ","transliteration":"Allahumma la taj\'alhu akhiral-\'ahdi min baytik-al-haram. Allahumma-rzuqnil-\'awdata ila baytik-al-haram","translation":"O Allah, do not make this the last time I visit Your Sacred House. O Allah, grant me the opportunity to return to Your Sacred House.","reference":"Al-Bayhaqi in Shu\'ab al-Iman, Hadith 3892; Also in Al-Mustadrak by Al-Hakim, Hadith 1761; Graded Hasan","tags":["gratitude","guidance","hope"]},{"id":13,"title":"Dua for Entering the Masjid al-Haram","arabic":"اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ","transliteration":"Allahumma-ftah li abwaba rahmatik","translation":"O Allah, open for me the doors of Your mercy.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 109; Also in Sunan Abu Dawud, Book 2, Hadith 465","tags":["forgiveness","gratitude","guidance","hope"]},{"id":14,"title":"Dua for Leaving the Masjid al-Haram","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ","transliteration":"Allahumma inni as\'aluka min fadlik","translation":"O Allah, I ask You of Your bounty.","reference":"Sahih Muslim, Book 4 (The Book of Prayers), Hadith 109; Also in Sunan Abu Dawud, Book 2, Hadith 466","tags":["gratitude","guidance","hope"]},{"id":15,"title":"Dua for Entering the State of Ihram for Hajj","arabic":"اللَّهُمَّ إِنِّي أُرِيدُ الْحَجَّ فَيَسِّرْهُ لِي وَتَقَبَّلْهُ مِنِّي","transliteration":"Allahumma inni uridul-hajja fayassirhu li wa taqabbalhu minni","translation":"O Allah, I intend to perform Hajj, so make it easy for me and accept it from me.","reference":"Sunan Abu Dawud, Book 11 (Hajj), Hadith 1776; Graded Sahih by Al-Albani","tags":["gratitude","guidance","hope"]},{"id":16,"title":"Dua for the Deceased at Hajj","arabic":"اللَّهُمَّ اغْفِرْ لِلْحَاجِّ وَلِمَنِ اسْتَغْفَرَ لَهُ الْحَاجُّ","transliteration":"Allahumma-ghfir lil-hajji wa liman ista-ghfara lahul-hajj","translation":"O Allah, forgive the pilgrim and those for whom the pilgrim seeks forgiveness.","reference":"Al-Bayhaqi in Shu\'ab al-Iman, Hadith 3895; Graded Hasan","tags":["forgiveness","gratitude","guidance","hope"]},{"id":17,"title":"Dua for the Days of Tashreeq","arabic":"اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ","transliteration":"Allahu akbar, Allahu akbar, la ilaha illallahu wallahu akbar, Allahu akbar wa lillahil-hamd","translation":"Allah is the Greatest, Allah is the Greatest. There is no deity except Allah, and Allah is the Greatest. Allah is the Greatest, and to Allah belongs all praise.","reference":"Sahih Al-Bukhari, Book 15 (The Two Eids), Hadith 14; Also in Sahih Muslim, Book 6 (The Book of Prayer - Eid), Hadith 139","tags":["gratitude","guidance","hope"]},{"id":18,"title":"Dua at Mina","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ","transliteration":"Allahumma inni as\'alukal-jannata wa a\'udhu bika minan-nar","translation":"O Allah, I ask You for Paradise and seek refuge in You from the Fire.","reference":"Sunan Abu Dawud, Book 43 (General Behavior), Hadith 5085; The Prophet (ﷺ) encouraged this supplication during Hajj.","tags":["gratitude","guidance","hope"]},{"id":19,"title":"Dua for Leaving Arafah","arabic":"لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ اللَّهُمَّ اجْعَلْ فِي سَمْعِي نُورًا وَفِي بَصَرِي نُورًا وَفِي قَلْبِي نُورًا اللَّهُمَّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي","transliteration":"La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadeer. Allahumma-j\'al fi sam\'i nooran wa fi basari nooran wa fi qalbi nooran. Allahumma-shrah li sadri wa yassir li amri","translation":"There is no deity except Allah, alone, without partner. To Him belongs all sovereignty and praise, and He is over all things omnipotent. O Allah, place light in my hearing, light in my sight, and light in my heart. O Allah, expand my chest and ease my task.","reference":"Al-Bayhaqi in Shu\'ab al-Iman, Hadith 3898; Graded Hasan","tags":["gratitude","guidance","hope"]},{"id":20,"title":"Dua for Returning from Hajj","arabic":"آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ صَدَقَ اللَّهُ وَعْدَهُ وَنَصَرَ عَبْدَهُ وَهَزَمَ الْأَحْزَابَ وَحْدَهُ","transliteration":"Ayibuna ta\'ibuna \'abiduna lirabbina hamidun. Sadaqallahu wa\'dahu wa nasara \'abduhu wa hazamal-ahzaba wahdah","translation":"Returning, repenting, worshipping, and to our Lord praising. Allah has fulfilled His promise, aided His servant, and alone defeated the confederates.","reference":"Sahih Muslim, Book 48 (The Book of Supplication), Hadith 73; Also in Sahih Al-Bukhari, Book 64 (Military Expeditions), Hadith 56","tags":["forgiveness","gratitude","guidance","hope"]}]}]}');

/***/ }),

/***/ "./resources/components/vue/modals/SectionReportModal.vue":
/*!****************************************************************!*\
  !*** ./resources/components/vue/modals/SectionReportModal.vue ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SectionReportModal_vue_vue_type_template_id_697eead3_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SectionReportModal.vue?vue&type=template&id=697eead3&scoped=true */ "./resources/components/vue/modals/SectionReportModal.vue?vue&type=template&id=697eead3&scoped=true");
/* harmony import */ var _SectionReportModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SectionReportModal.vue?vue&type=script&lang=js */ "./resources/components/vue/modals/SectionReportModal.vue?vue&type=script&lang=js");
/* harmony import */ var _SectionReportModal_vue_vue_type_style_index_0_id_697eead3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SectionReportModal.vue?vue&type=style&index=0&id=697eead3&scoped=true&lang=css */ "./resources/components/vue/modals/SectionReportModal.vue?vue&type=style&index=0&id=697eead3&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_SectionReportModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_SectionReportModal_vue_vue_type_template_id_697eead3_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-697eead3"],['__file',"resources/components/vue/modals/SectionReportModal.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/modals/SectionReportModal.vue?vue&type=script&lang=js":
/*!****************************************************************************************!*\
  !*** ./resources/components/vue/modals/SectionReportModal.vue?vue&type=script&lang=js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SectionReportModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SectionReportModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SectionReportModal.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/SectionReportModal.vue?vue&type=script&lang=js");


/***/ }),

/***/ "./resources/components/vue/modals/SectionReportModal.vue?vue&type=style&index=0&id=697eead3&scoped=true&lang=css":
/*!************************************************************************************************************************!*\
  !*** ./resources/components/vue/modals/SectionReportModal.vue?vue&type=style&index=0&id=697eead3&scoped=true&lang=css ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SectionReportModal_vue_vue_type_style_index_0_id_697eead3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SectionReportModal.vue?vue&type=style&index=0&id=697eead3&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/SectionReportModal.vue?vue&type=style&index=0&id=697eead3&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/modals/SectionReportModal.vue?vue&type=template&id=697eead3&scoped=true":
/*!**********************************************************************************************************!*\
  !*** ./resources/components/vue/modals/SectionReportModal.vue?vue&type=template&id=697eead3&scoped=true ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SectionReportModal_vue_vue_type_template_id_697eead3_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SectionReportModal_vue_vue_type_template_id_697eead3_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SectionReportModal.vue?vue&type=template&id=697eead3&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/SectionReportModal.vue?vue&type=template&id=697eead3&scoped=true");


/***/ }),

/***/ "./resources/js/composables/useDuaRecommender.js":
/*!*******************************************************!*\
  !*** ./resources/js/composables/useDuaRecommender.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useDuaRecommender: () => (/* binding */ useDuaRecommender)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

const DEFAULT_TAGS = ['anxiety', 'grief', 'gratitude', 'patience', 'guidance', 'stress', 'fear', 'loss', 'hope', 'forgiveness'];
const EMOTION_MAP = {
  anxiety: ['anxious', 'anxiety', 'worried', 'worry', 'nervous', 'panic', 'restless', 'uneasy', 'overthinking'],
  stress: ['stress', 'stressed', 'pressure', 'overwhelmed', 'burnout', 'deadline', 'exam', 'exams', 'workload', 'hardship', 'difficulty', 'burden'],
  fear: ['fear', 'afraid', 'scared', 'frightened', 'terrified', 'unsafe', 'danger'],
  grief: ['grief', 'grieving', 'sad', 'sorrow', 'heartbroken', 'depressed', 'crying'],
  loss: ['loss', 'lost', 'death', 'passed away', 'mourning', 'bereavement'],
  gratitude: ['grateful', 'gratitude', 'thankful', 'blessed', 'appreciate', 'alhamdulillah'],
  patience: ['patience', 'patient', 'sabr', 'endure', 'enduring', 'waiting'],
  guidance: ['guidance', 'guide', 'direction', 'hidayah', 'confused', 'uncertain'],
  hope: ['hope', 'hopeful', 'hopeless', 'despair', 'relief', 'optimistic'],
  forgiveness: ['forgive', 'forgiveness', 'repent', 'repentance', 'guilt', 'sin', 'mistake']
};
const STOPWORDS = new Set(['i', 'im', "i'm", 'me', 'my', 'mine', 'we', 'our', 'you', 'your', 'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being', 'the', 'a', 'an', 'and', 'or', 'to', 'for', 'of', 'in', 'on', 'at', 'with', 'from', 'by', 'it', 'this', 'that', 'these', 'those', 'very', 'really', 'just', 'lot', 'about']);
const TAG_CATEGORY_HINTS = {
  anxiety: ['protection', 'ease', 'distress', 'patience'],
  stress: ['ease', 'distress', 'patience', 'strength'],
  fear: ['protection', 'night', 'morning', 'evening'],
  grief: ['distress', 'patience', 'strength'],
  loss: ['patience', 'parents', 'distress'],
  gratitude: ['praising', 'joy', 'food', 'good etiquette'],
  patience: ['patience', 'strength', 'ease'],
  guidance: ['guidance', 'prayer', 'night', 'morning', 'evening'],
  hope: ['ease', 'guidance', 'forgiveness', 'strength'],
  forgiveness: ['forgiveness', 'night', 'prayer']
};
function normalizeText(value = '') {
  return String(value || '').toLowerCase();
}
function unique(arr = []) {
  return Array.from(new Set(arr));
}
function flattenDuas(duaCollection = {
  categories: []
}) {
  const categories = Array.isArray(duaCollection === null || duaCollection === void 0 ? void 0 : duaCollection.categories) ? duaCollection.categories : [];
  const output = [];
  categories.forEach(category => {
    (category.duas || []).forEach((dua, index) => {
      output.push({
        id: `${category.id || 'cat'}-${dua.id || index + 1}`,
        categoryId: category.id,
        categoryName: category.name || 'Dua Section',
        title: dua.title || '',
        arabic: dua.arabic || '',
        transliteration: dua.transliteration || '',
        translation: dua.translation || '',
        reference: dua.reference || '',
        tags: Array.isArray(dua.tags) ? dua.tags.map(tag => normalizeText(tag)) : []
      });
    });
  });
  return output;
}
function matchEmotionTags(input = '') {
  const text = normalizeText(input);
  const tags = new Set();
  if (!text.trim()) return [];
  Object.entries(EMOTION_MAP).forEach(([tag, words]) => {
    if (words.some(word => text.includes(word))) {
      tags.add(tag);
    }
  });
  DEFAULT_TAGS.forEach(tag => {
    if (text.includes(tag)) tags.add(tag);
  });
  if (!tags.size) {
    // Safe fallback for open-ended emotional prompts.
    tags.add('guidance');
    tags.add('hope');
  }
  return Array.from(tags);
}
function extractSearchTokens(input = '') {
  return unique(normalizeText(input).replace(/[^a-z0-9\s']/g, ' ').split(/\s+/).map(w => w.trim()).filter(w => w.length >= 3 && !STOPWORDS.has(w)));
}
function scoreDua(dua, matchedTags, searchTokens) {
  if (!dua || !Array.isArray(dua.tags) || !dua.tags.length) {
    return {
      score: 0,
      tagHits: 0,
      keywordHits: 0,
      tokenHits: 0,
      categoryHits: 0
    };
  }
  const text = normalizeText(`${dua.title || ''} ${dua.translation || ''} ${dua.reference || ''} ${dua.categoryName || ''}`);
  const category = normalizeText(dua.categoryName || '');
  const duaTags = new Set(dua.tags.map(normalizeText));
  let score = 0;
  let tagHits = 0;
  let keywordHits = 0;
  let tokenHits = 0;
  let categoryHits = 0;
  matchedTags.forEach(tag => {
    if (duaTags.has(tag)) {
      tagHits += 1;
      score += 6;
    }
  });
  if (!tagHits) {
    return {
      score: 0,
      tagHits: 0,
      keywordHits: 0,
      tokenHits: 0,
      categoryHits: 0
    };
  }

  // Boost if dua text itself uses emotion keywords.
  matchedTags.forEach(tag => {
    const words = EMOTION_MAP[tag] || [];
    if (words.some(word => text.includes(word))) {
      keywordHits += 1;
      score += 3;
    }
  });

  // Boost direct query-token overlaps.
  searchTokens.forEach(token => {
    if (text.includes(token)) {
      tokenHits += 1;
      score += 2;
    }
  });

  // Light category hint boost.
  matchedTags.forEach(tag => {
    const hints = TAG_CATEGORY_HINTS[tag] || [];
    if (hints.some(hint => category.includes(hint))) {
      categoryHits += 1;
      score += 2;
    }
  });
  return {
    score,
    tagHits,
    keywordHits,
    tokenHits,
    categoryHits
  };
}
function useDuaRecommender(duaCollection) {
  const matchedDuas = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
  const matchedKeywords = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
  const loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
  const error = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
  const localDuas = flattenDuas(duaCollection);
  const clearResults = () => {
    matchedDuas.value = [];
    matchedKeywords.value = [];
    error.value = '';
  };
  const recommend = async (userInput = '') => {
    const text = String(userInput || '').trim();
    if (!text) {
      clearResults();
      error.value = 'Please describe how you feel to get recommendations.';
      return;
    }
    error.value = '';
    loading.value = true;
    try {
      const keywords = matchEmotionTags(text);
      matchedKeywords.value = keywords;
      const tokens = extractSearchTokens(text);
      let ranked = localDuas.map(dua => {
        const metrics = scoreDua(dua, keywords, tokens);
        return _objectSpread({
          dua
        }, metrics);
      }).filter(entry => entry.score > 0).filter(entry => {
        // Require extra evidence beyond broad tag-only matches.
        const hasSupportSignal = entry.keywordHits > 0 || entry.tokenHits > 0 || entry.categoryHits > 0;
        if (tokens.length >= 2) return hasSupportSignal;
        return hasSupportSignal || entry.tagHits >= 2;
      }).sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.keywordHits !== a.keywordHits) return b.keywordHits - a.keywordHits;
        if (b.tokenHits !== a.tokenHits) return b.tokenHits - a.tokenHits;
        return a.dua.title.localeCompare(b.dua.title);
      });

      // Keep recommender focused on strongest matches only.
      const capped = ranked.slice(0, 8);
      matchedDuas.value = capped.map(entry => entry.dua);
      if (!matchedDuas.value.length) {
        error.value = 'No recommendations found. Try another feeling or phrase.';
      }
    } catch (err) {
      error.value = (err === null || err === void 0 ? void 0 : err.message) || 'Unable to fetch recommendations right now.';
    } finally {
      loading.value = false;
    }
  };
  return {
    matchedDuas,
    matchedKeywords,
    loading,
    error,
    recommend,
    clearResults
  };
}

/***/ }),

/***/ "./resources/js/utils/bookmarkAuth.js":
/*!********************************************!*\
  !*** ./resources/js/utils/bookmarkAuth.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ }),

/***/ "./resources/js/utils/duaSlugs.js":
/*!****************************************!*\
  !*** ./resources/js/utils/duaSlugs.js ***!
  \****************************************/
/***/ ((module) => {

const MAX_META_DESCRIPTION_LENGTH = 155;
const DEFAULT_META_TITLE_SUFFIX = ' · Islamic Connect Dua';
const slugify = value => {
  if (!value) return '';
  return value.toString().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s-]/g, '').trim().toLowerCase().replace(/[\s_]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
};
const normalizeDescription = (value = '', fallback = '') => {
  const normalized = (value || fallback).toString().replace(/\s+/g, ' ').trim();
  if (!normalized) {
    return fallback;
  }
  if (normalized.length <= MAX_META_DESCRIPTION_LENGTH) {
    return normalized;
  }
  return `${normalized.slice(0, MAX_META_DESCRIPTION_LENGTH - 3)}...`;
};
const escapeAttribute = value => (value || '').toString().replace(/"/g, '&quot;');
const createDuaMetadata = (collection = {}, options = {}) => {
  const {
    metaTitleSuffix = DEFAULT_META_TITLE_SUFFIX,
    metaDescriptionFallback = 'Discover Islamic duas with Arabic, transliteration, and translation.',
    assignSlugToDua = false,
    defaultOgImage = 'https://islamicconnect.com/images/banner-photo-1200.webp'
  } = options;
  const categories = Array.isArray(collection.categories) ? collection.categories : [];
  const usedSlugs = new Set();
  const metadata = [];
  categories.forEach(category => {
    const categoryId = category.id;
    const categoryName = category.name || 'Islamic Dua';
    (Array.isArray(category.duas) ? category.duas : []).forEach((dua, index) => {
      var _ref, _dua$originalId;
      const rawId = (_ref = (_dua$originalId = dua.originalId) !== null && _dua$originalId !== void 0 ? _dua$originalId : dua.id) !== null && _ref !== void 0 ? _ref : index + 1;
      const base = dua.title || dua.translation || dua.arabic || categoryName;
      const candidate = slugify(base) || `dua-${categoryId}-${rawId}`;
      let slug = candidate;
      let suffix = 1;
      while (usedSlugs.has(slug)) {
        suffix += 1;
        slug = `${candidate}-${suffix}`;
      }
      usedSlugs.add(slug);
      const reference = dua.reference || categoryName;
      const descriptionParts = [dua.translation, dua.arabic, reference].filter(Boolean);
      let metaDescription = normalizeDescription(descriptionParts.join(' · '), metaDescriptionFallback);
      if (!metaDescription) {
        metaDescription = metaDescriptionFallback;
      }
      const metaTitle = escapeAttribute(`${base}${metaTitleSuffix}`);
      if (assignSlugToDua && typeof dua === 'object') {
        dua.slug = slug;
      }
      const ogImage = dua.ogImage || defaultOgImage;
      metadata.push({
        slug,
        title: base,
        metaTitle,
        metaDescription: escapeAttribute(metaDescription),
        categoryId,
        categoryName,
        duaId: rawId,
        reference,
        ogImage,
        ogImageAlt: dua.ogImageAlt || `${base} Dua`
      });
    });
  });
  return metadata;
};
module.exports = {
  slugify,
  createDuaMetadata
};

/***/ })

}]);