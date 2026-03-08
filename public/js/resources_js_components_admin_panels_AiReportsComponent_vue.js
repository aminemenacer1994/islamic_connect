"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_panels_AiReportsComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/AiReportsComponent.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/AiReportsComponent.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "AiReportsComponent",
  data() {
    return {
      reports: [],
      loading: false,
      error: "",
      query: "",
      reasonFilter: "all",
      statusFilter: "all",
      sortBy: "newest",
      selectedReport: null
    };
  },
  computed: {
    reasonOptions() {
      return Array.from(new Set(this.reports.map(report => String(report.reason || "").trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b));
    },
    filteredReports() {
      const query = String(this.query || "").trim().toLowerCase();
      let rows = [...this.reports];
      if (this.reasonFilter !== "all") {
        rows = rows.filter(report => String(report.reason || "").trim() === this.reasonFilter);
      }
      if (this.statusFilter !== "all") {
        rows = rows.filter(report => String(report.status || "open").trim().toLowerCase() === this.statusFilter);
      }
      if (query) {
        rows = rows.filter(report => {
          const reporter = this.displayReporter(report);
          const haystack = [report.id, report.reason, report.status, report.question_text, report.reported_text, report.details, report.entry_key, report.session_id, report.page_url, reporter].map(value => String(value || "").toLowerCase()).join(" ");
          return haystack.includes(query);
        });
      }
      rows.sort((a, b) => {
        const da = new Date(a.created_at || a.createdAt || 0).getTime();
        const db = new Date(b.created_at || b.createdAt || 0).getTime();
        return this.sortBy === "newest" ? db - da : da - db;
      });
      return rows;
    }
  },
  mounted() {
    this.fetchReports();
  },
  methods: {
    async fetchReports() {
      this.loading = true;
      this.error = "";
      try {
        const {
          data
        } = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/api/fetch-ai-reports");
        this.reports = Array.isArray(data) ? data : [];
      } catch (error) {
        this.error = "Unable to load reports right now.";
        this.reports = [];
      } finally {
        this.loading = false;
      }
    },
    viewReport(report) {
      this.selectedReport = report || null;
    },
    clip(value, maxLength = 160) {
      const text = String(value || "").trim();
      if (!text) return "";
      if (text.length <= maxLength) return text;
      return `${text.slice(0, maxLength).trim()}...`;
    },
    humanReason(reason) {
      const key = String(reason || "").trim().toLowerCase();
      const map = {
        incorrect: "Incorrect information",
        misleading: "Incorrect or misleading",
        harmful: "Harmful guidance",
        offensive: "Offensive content",
        incomplete: "Missing context"
      };
      return map[key] || this.toTitleCase(reason || "Unspecified");
    },
    humanStatus(status) {
      const key = String(status || "open").trim().toLowerCase();
      if (key === "resolved") return "Resolved";
      if (key === "reviewed") return "Reviewed";
      return "Open";
    },
    statusClass(status) {
      const key = String(status || "open").trim().toLowerCase();
      if (key === "resolved") return "status-resolved";
      if (key === "reviewed") return "status-reviewed";
      return "status-open";
    },
    displayReporter(report) {
      if (report !== null && report !== void 0 && report.user) {
        const first = String(report.user.name || "").trim();
        const last = String(report.user.lastname || "").trim();
        const fullName = [first, last].filter(Boolean).join(" ").trim();
        if (fullName) return fullName;
        const email = String(report.user.email || "").trim();
        if (email) return email;
      }
      return String((report === null || report === void 0 ? void 0 : report.reporter_ip) || "Guest").trim();
    },
    normalizedReferences(report) {
      const references = Array.isArray(report === null || report === void 0 ? void 0 : report.references) ? report.references : [];
      return references.map(entry => {
        if (typeof entry === "string") {
          return {
            label: entry,
            url: ""
          };
        }
        if (entry && typeof entry === "object") {
          const label = String(entry.label || entry.title || entry.reference || entry.url || "").trim();
          const url = String(entry.url || "").trim();
          return {
            label: label || url,
            url
          };
        }
        return null;
      }).filter(entry => entry && entry.label);
    },
    referencesCount(report) {
      return this.normalizedReferences(report).length;
    },
    toTitleCase(value) {
      return String(value || "").replace(/[_-]+/g, " ").trim().replace(/\s+/g, " ").replace(/\b\w/g, char => char.toUpperCase());
    },
    formatDate(value) {
      if (!value) return "Unknown date";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return "Unknown date";
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    },
    formatDateTime(value) {
      if (!value) return "Unknown date";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return "Unknown date";
      return date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/AiReportsComponent.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/AiReportsComponent.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_admin_panels_AiReportsComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_admin_panels_AiReportsComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/vue/admin_panels/AiReportsComponent.vue */ "./resources/components/vue/admin_panels/AiReportsComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/AiReportsComponent.vue?vue&type=template&id=31773d68&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/AiReportsComponent.vue?vue&type=template&id=31773d68&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  key: 0,
  class: "py-5 text-center text-muted"
};
const _hoisted_13 = {
  key: 1,
  class: "alert alert-warning mb-0"
};
const _hoisted_14 = {
  key: 2,
  class: "py-5 text-center text-muted"
};
const _hoisted_15 = {
  key: 3,
  class: "row"
};
const _hoisted_16 = {
  key: 0,
  class: "col-12 mb-3"
};
const _hoisted_17 = {
  class: "alert alert-warning mb-0"
};
const _hoisted_18 = {
  class: "note-card"
};
const _hoisted_19 = {
  class: "note-chip"
};
const _hoisted_20 = {
  class: "note-title"
};
const _hoisted_21 = {
  class: "note-reference"
};
const _hoisted_22 = {
  class: "note-body"
};
const _hoisted_23 = {
  class: "mb-2"
};
const _hoisted_24 = {
  class: "mb-0"
};
const _hoisted_25 = {
  class: "note-meta"
};
const _hoisted_26 = {
  class: "date"
};
const _hoisted_27 = {
  class: "date"
};
const _hoisted_28 = {
  class: "note-actions"
};
const _hoisted_29 = ["onClick"];
const _hoisted_30 = {
  id: "viewAiReport",
  class: "modal fade",
  tabindex: "-1",
  "aria-labelledby": "viewAiReportLabel",
  "aria-hidden": "true",
  "data-bs-backdrop": "true"
};
const _hoisted_31 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_32 = {
  class: "modal-content"
};
const _hoisted_33 = {
  class: "modal-header"
};
const _hoisted_34 = {
  id: "viewAiReportLabel",
  class: "modal-title text-dark"
};
const _hoisted_35 = {
  class: "modal-body"
};
const _hoisted_36 = {
  key: 0,
  class: "container"
};
const _hoisted_37 = {
  class: "report-kv-grid mb-3"
};
const _hoisted_38 = {
  class: "report-kv"
};
const _hoisted_39 = {
  class: "report-kv-value"
};
const _hoisted_40 = {
  class: "report-kv"
};
const _hoisted_41 = {
  class: "report-kv"
};
const _hoisted_42 = {
  class: "report-kv-value"
};
const _hoisted_43 = {
  class: "report-kv"
};
const _hoisted_44 = {
  class: "report-kv-value"
};
const _hoisted_45 = {
  class: "report-kv"
};
const _hoisted_46 = {
  class: "report-kv-value text-break"
};
const _hoisted_47 = {
  class: "report-kv"
};
const _hoisted_48 = {
  class: "report-kv-value text-break"
};
const _hoisted_49 = {
  class: "report-block mb-3"
};
const _hoisted_50 = {
  class: "mb-0"
};
const _hoisted_51 = {
  class: "report-block mb-3"
};
const _hoisted_52 = {
  class: "mb-0 report-prewrap"
};
const _hoisted_53 = {
  key: 0,
  class: "report-block mb-3"
};
const _hoisted_54 = {
  class: "mb-0 report-prewrap"
};
const _hoisted_55 = {
  key: 1,
  class: "report-block mb-3"
};
const _hoisted_56 = ["href"];
const _hoisted_57 = {
  key: 2,
  class: "report-block"
};
const _hoisted_58 = {
  class: "mb-0 ps-4"
};
const _hoisted_59 = ["href"];
const _hoisted_60 = {
  key: 1
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _$data$selectedReport;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.query = $event),
    class: "form-control",
    placeholder: "Search reports..."
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.query]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.reasonFilter = $event),
    class: "form-select"
  }, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "all"
  }, "All reasons", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.reasonOptions, reason => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: `reason-${reason}`,
      value: reason
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.humanReason(reason)), 9 /* TEXT, PROPS */, _hoisted_8);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.reasonFilter]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.statusFilter = $event),
    class: "form-select"
  }, [...(_cache[6] || (_cache[6] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "all"
  }, "All statuses", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "open"
  }, "Open", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "reviewed"
  }, "Reviewed", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "resolved"
  }, "Resolved", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.statusFilter]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.sortBy = $event),
    class: "form-select"
  }, [...(_cache[7] || (_cache[7] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "newest"
  }, "Newest first", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "oldest"
  }, "Oldest first", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.sortBy]])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_9, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "count-label"
  }, "AI Reports", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.filteredReports.length), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [$data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, [...(_cache[9] || (_cache[9] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "spinner-border spinner-border-sm me-2",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Loading reports... ", -1 /* CACHED */)]))])) : $data.error && !$options.filteredReports.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.error), 1 /* TEXT */)) : !$options.filteredReports.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_14, " No reports found. ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_15, [$data.error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.error), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredReports, report => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: report.id,
      class: "col-md-4 mb-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-flag-fill me-1"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Report #" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(report.id), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.humanReason(report.reason)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["status-pill", $options.statusClass(report.status)])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.humanStatus(report.status)), 3 /* TEXT, CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "• " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatDate(report.created_at)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_23, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Question:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(report.question_text ? $options.clip(report.question_text, 140) : "N/A"), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_24, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Answer:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.clip(report.reported_text, 180)), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_26, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-person me-1"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.displayReporter(report)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_27, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-link-45deg me-1"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.referencesCount(report)) + " refs ", 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn btn-icon btn-ghost",
      "data-bs-toggle": "modal",
      "data-bs-target": "#viewAiReport",
      onClick: $event => $options.viewReport(report),
      title: "View report",
      "aria-label": "View report"
    }, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-eye"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_29)])])]);
  }), 128 /* KEYED_FRAGMENT */))]))])]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "View report #" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(((_$data$selectedReport = $data.selectedReport) === null || _$data$selectedReport === void 0 ? void 0 : _$data$selectedReport.id) || ""), 1 /* TEXT */)]), _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [$data.selectedReport ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "report-kv-label"
  }, "Reason", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.humanReason($data.selectedReport.reason)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "report-kv-label"
  }, "Status", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["status-pill", $options.statusClass($data.selectedReport.status)])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.humanStatus($data.selectedReport.status)), 3 /* TEXT, CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "report-kv-label"
  }, "Created", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_42, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatDateTime($data.selectedReport.created_at)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "report-kv-label"
  }, "Reporter", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_44, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.displayReporter($data.selectedReport)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "report-kv-label"
  }, "Session ID", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_46, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedReport.session_id || "N/A"), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "report-kv-label"
  }, "Entry Key", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_48, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedReport.entry_key || "N/A"), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Question", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedReport.question_text || "N/A"), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Reported answer", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_52, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedReport.reported_text || "N/A"), 1 /* TEXT */)]), $data.selectedReport.details ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_53, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Reporter details", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_54, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedReport.details), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.selectedReport.page_url ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_55, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Page URL", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: $data.selectedReport.page_url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedReport.page_url), 9 /* TEXT, PROPS */, _hoisted_56)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $options.normalizedReferences($data.selectedReport).length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_57, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "References", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_58, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.normalizedReferences($data.selectedReport), (reference, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: `ref-${idx}`
    }, [reference.url ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
      key: 0,
      href: reference.url,
      target: "_blank",
      rel: "noopener noreferrer"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reference.label), 9 /* TEXT, PROPS */, _hoisted_59)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_60, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reference.label), 1 /* TEXT */))]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer flex-wrap gap-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary",
    "data-bs-dismiss": "modal"
  }, "Close")], -1 /* CACHED */))])])])]))]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/AiReportsComponent.vue?vue&type=style&index=0&id=31773d68&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/AiReportsComponent.vue?vue&type=style&index=0&id=31773d68&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/admin_panels/AiReportsComponent.vue":
/*!**********************************************************************!*\
  !*** ./resources/components/vue/admin_panels/AiReportsComponent.vue ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AiReportsComponent_vue_vue_type_template_id_31773d68_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AiReportsComponent.vue?vue&type=template&id=31773d68&scoped=true */ "./resources/components/vue/admin_panels/AiReportsComponent.vue?vue&type=template&id=31773d68&scoped=true");
/* harmony import */ var _AiReportsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AiReportsComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/admin_panels/AiReportsComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _AiReportsComponent_vue_vue_type_style_index_0_id_31773d68_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AiReportsComponent.vue?vue&type=style&index=0&id=31773d68&scoped=true&lang=css */ "./resources/components/vue/admin_panels/AiReportsComponent.vue?vue&type=style&index=0&id=31773d68&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_AiReportsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AiReportsComponent_vue_vue_type_template_id_31773d68_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-31773d68"],['__file',"resources/components/vue/admin_panels/AiReportsComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/admin_panels/AiReportsComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/AiReportsComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiReportsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiReportsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AiReportsComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/AiReportsComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/admin_panels/AiReportsComponent.vue?vue&type=style&index=0&id=31773d68&scoped=true&lang=css":
/*!******************************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/AiReportsComponent.vue?vue&type=style&index=0&id=31773d68&scoped=true&lang=css ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiReportsComponent_vue_vue_type_style_index_0_id_31773d68_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AiReportsComponent.vue?vue&type=style&index=0&id=31773d68&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/AiReportsComponent.vue?vue&type=style&index=0&id=31773d68&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/admin_panels/AiReportsComponent.vue?vue&type=template&id=31773d68&scoped=true":
/*!****************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/AiReportsComponent.vue?vue&type=template&id=31773d68&scoped=true ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiReportsComponent_vue_vue_type_template_id_31773d68_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiReportsComponent_vue_vue_type_template_id_31773d68_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AiReportsComponent.vue?vue&type=template&id=31773d68&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/AiReportsComponent.vue?vue&type=template&id=31773d68&scoped=true");


/***/ }),

/***/ "./resources/js/components/admin_panels/AiReportsComponent.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/components/admin_panels/AiReportsComponent.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AiReportsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AiReportsComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/AiReportsComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_AiReportsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/admin_panels/AiReportsComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/AiReportsComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/AiReportsComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiReportsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiReportsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AiReportsComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/AiReportsComponent.vue?vue&type=script&lang=js");
 

/***/ })

}]);