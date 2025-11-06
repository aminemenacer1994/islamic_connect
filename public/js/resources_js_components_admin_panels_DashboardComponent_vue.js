"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_panels_DashboardComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var chart_js_auto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chart.js/auto */ "./node_modules/chart.js/auto/auto.mjs");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      counts: {},
      series: {
        users: [],
        donations: [],
        feedback: []
      },
      recent: {
        donations: [],
        feedback: [],
        mailing: []
      },
      modalType: 'feedback',
      modalTitle: '',
      modalItems: [],
      cards: [{
        key: 'users',
        label: 'Users',
        icon: 'bi bi-people-fill',
        href: '/users',
        color: 'c1'
      }, {
        key: 'bookmarks',
        label: 'Bookmarks',
        icon: 'bi bi-bookmark-star',
        href: '/bookmarks',
        color: 'c2'
      }, {
        key: 'notes',
        label: 'Notes',
        icon: 'bi bi-journal-text',
        href: '/notes',
        color: 'c3'
      }, {
        key: 'donations',
        label: 'Donations',
        icon: 'bi bi-currency-exchange',
        href: '/payments',
        color: 'c4'
      }, {
        key: 'feedback',
        label: 'Feedback',
        icon: 'bi bi-chat-left-text',
        href: '/feedback',
        color: 'c5'
      }, {
        key: 'mailing',
        label: 'Mailing List',
        icon: 'bi bi-envelope-at',
        href: '/mailing_list',
        color: 'c6'
      }]
    };
  },
  mounted() {
    this.fetchMetrics();
  },
  methods: {
    async fetchMetrics() {
      try {
        const res = await fetch('api/admin-metrics');
        const data = await res.json();
        this.counts = data.counts || {};
        this.series = data.series || {};
        this.recent = data.recent || {};
        this.renderCharts(data);
      } catch (e) {
        console.error('metrics failed', e);
      }
    },
    renderCharts(data) {
      var _data$breakdown;
      const dLabels = (this.series.users || []).map(x => x.m);
      const uValues = (this.series.users || []).map(x => x.c);
      const fValues = (this.series.feedback || []).map(x => x.c);
      const common = {
        borderWidth: 2,
        borderColor: '#00bfa6',
        backgroundColor: 'rgba(0,191,166,.12)',
        tension: .3,
        pointRadius: 0
      };
      const ctx1 = this.$refs.usersChart.getContext('2d');
      new chart_js_auto__WEBPACK_IMPORTED_MODULE_0__["default"](ctx1, {
        type: 'line',
        data: {
          labels: dLabels,
          datasets: [_objectSpread({
            label: 'Users',
            data: uValues
          }, common)]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      const ctx2 = this.$refs.feedbackChart.getContext('2d');
      new chart_js_auto__WEBPACK_IMPORTED_MODULE_0__["default"](ctx2, {
        type: 'bar',
        data: {
          labels: dLabels,
          datasets: [{
            label: 'Feedback',
            data: fValues,
            backgroundColor: 'rgba(0,191,166,.18)',
            borderColor: '#00bfa6',
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      // Pie: donations by currency
      const pie = this.$refs.donationPie.getContext('2d');
      const br = ((_data$breakdown = data.breakdown) === null || _data$breakdown === void 0 ? void 0 : _data$breakdown.donationsByCurrency) || [];
      const labels = br.map(x => x.currency || 'N/A');
      const values = br.map(x => x.c);
      const colors = ['#00bfa6', '#66d9cc', '#ffd166', '#7c4dff', '#ff8a80', '#80cbc4'];
      new chart_js_auto__WEBPACK_IMPORTED_MODULE_0__["default"](pie, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            data: values,
            backgroundColor: colors
          }]
        },
        options: {
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }
      });
    },
    async openModal(type) {
      this.modalType = type;
      this.modalTitle = type === 'feedback' ? 'All Feedback' : 'All Subscribers';
      const url = type === 'feedback' ? 'api/fetch-feedbacks' : 'api/fetch-mail';
      const res = await fetch(url);
      this.modalItems = await res.json();
      const el = document.getElementById('viewAllModal');
      bootstrap.Modal.getOrCreateInstance(el).show();
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=template&id=186a9dc4&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=template&id=186a9dc4&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "dash-wrap"
};
const _hoisted_2 = {
  class: "row g-3 mb-3 top-cards"
};
const _hoisted_3 = ["href", "aria-label"];
const _hoisted_4 = {
  class: "metric-icon"
};
const _hoisted_5 = {
  class: "metric-body"
};
const _hoisted_6 = {
  class: "metric-label"
};
const _hoisted_7 = {
  class: "metric-value"
};
const _hoisted_8 = {
  class: "row g-3 charts-row"
};
const _hoisted_9 = {
  class: "col-lg-6"
};
const _hoisted_10 = {
  class: "panel-card"
};
const _hoisted_11 = {
  ref: "usersChart",
  height: "110"
};
const _hoisted_12 = {
  class: "col-lg-6"
};
const _hoisted_13 = {
  class: "panel-card"
};
const _hoisted_14 = {
  ref: "feedbackChart",
  height: "110"
};
const _hoisted_15 = {
  class: "row g-3 mt-1 align-items-stretch"
};
const _hoisted_16 = {
  class: "col-lg-6 d-flex"
};
const _hoisted_17 = {
  class: "panel-card flex-grow-1"
};
const _hoisted_18 = {
  ref: "donationPie",
  height: "220"
};
const _hoisted_19 = {
  class: "col-lg-6 d-flex"
};
const _hoisted_20 = {
  class: "flex-grow-1"
};
const _hoisted_21 = {
  class: "panel-card mb-3"
};
const _hoisted_22 = {
  class: "panel-head d-flex justify-content-between align-items-center"
};
const _hoisted_23 = {
  class: "list clean"
};
const _hoisted_24 = {
  class: "pill"
};
const _hoisted_25 = {
  class: "muted"
};
const _hoisted_26 = {
  class: "panel-card"
};
const _hoisted_27 = {
  class: "panel-head d-flex justify-content-between align-items-center"
};
const _hoisted_28 = {
  class: "list clean"
};
const _hoisted_29 = {
  class: "muted"
};
const _hoisted_30 = {
  class: "modal fade",
  id: "viewAllModal",
  tabindex: "-1",
  "aria-hidden": "true"
};
const _hoisted_31 = {
  class: "modal-dialog modal-lg modal-dialog-centered modal-fullscreen-md-down"
};
const _hoisted_32 = {
  class: "modal-content"
};
const _hoisted_33 = {
  class: "modal-header"
};
const _hoisted_34 = {
  class: "modal-title"
};
const _hoisted_35 = {
  class: "modal-body"
};
const _hoisted_36 = {
  class: "list clean"
};
const _hoisted_37 = {
  class: "pill"
};
const _hoisted_38 = {
  class: "muted"
};
const _hoisted_39 = {
  class: "muted"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Top metric cards "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.cards, c => {
    var _$data$counts$c$key;
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-md-4",
      key: c.key
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: c.href,
      class: "card-link",
      "aria-label": c.label
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["metric-card fade-pop", c.color])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(c.icon)
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(c.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$data$counts$c$key = $data.counts[c.key]) !== null && _$data$counts$c$key !== void 0 ? _$data$counts$c$key : 0), 1 /* TEXT */)])], 2 /* CLASS */)], 8 /* PROPS */, _hoisted_3)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Charts "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "panel-head"
  }, "Users (lifetime)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("canvas", _hoisted_11, null, 512 /* NEED_PATCH */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "panel-head"
  }, "Feedback (lifetime)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("canvas", _hoisted_14, null, 512 /* NEED_PATCH */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Pie Chart Row "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "panel-head"
  }, "Donations by Currency", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("canvas", _hoisted_18, null, 512 /* NEED_PATCH */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Recent Feedback", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#",
    onClick: _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.openModal('feedback'), ["prevent"])),
    class: "viewall"
  }, "View all")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_23, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.recent.feedback, f => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: f.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.subject || 'Feedback'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.firstname) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.lastname), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Recent Subscribers", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#",
    onClick: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.openModal('mailing'), ["prevent"])),
    class: "viewall"
  }, "View all")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_28, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.recent.mailing, m => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: m.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(m.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(m.email), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" View All Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.modalTitle), 1 /* TEXT */), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_36, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.modalItems, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item.id
    }, [$data.modalType === 'feedback' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 0
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.subject || 'Feedback'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.firstname) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.lastname) + " — " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.email), 1 /* TEXT */)], 64 /* STABLE_FRAGMENT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 1
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.email), 1 /* TEXT */)], 64 /* STABLE_FRAGMENT */))]);
  }), 128 /* KEYED_FRAGMENT */))])])])])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.dash-wrap[data-v-186a9dc4]{padding:24px}\n.metric-card[data-v-186a9dc4]{display:flex; align-items:center; gap:.75rem; background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:14px 16px; box-shadow:0 8px 24px rgba(15,23,42,.06)}\n.metric-icon[data-v-186a9dc4]{width:42px;height:42px; display:flex; align-items:center; justify-content:center; border-radius:10px; color:#fff; background:var(--ref-green)}\n.metric-label[data-v-186a9dc4]{font-size:.8rem; color:#64748b}\n.metric-value[data-v-186a9dc4]{font-weight:800; font-size:1.4rem; color:#0f172a}\n.c1[data-v-186a9dc4]{background:linear-gradient(0deg,#e6fcf7,#fff)}\n.c2[data-v-186a9dc4]{background:linear-gradient(0deg,#eaf2ff,#fff)}\n.c3[data-v-186a9dc4]{background:linear-gradient(0deg,#fff7e6,#fff)}\n.c4[data-v-186a9dc4]{background:linear-gradient(0deg,#f3f8ff,#fff)}\n.c5[data-v-186a9dc4]{background:linear-gradient(0deg,#fdecef,#fff)}\n.c6[data-v-186a9dc4]{background:linear-gradient(0deg,#f6faf9,#fff)}\n.card-link[data-v-186a9dc4]{text-decoration:none}\n.panel-card[data-v-186a9dc4]{background:#fff; border:1px solid #e5e7eb; border-radius:16px; box-shadow:0 8px 24px rgba(15,23,42,.06); padding:12px}\n.panel-head[data-v-186a9dc4]{font-weight:700; color:#0f172a; margin-bottom:6px}\n.list.clean[data-v-186a9dc4]{list-style:none; padding:0; margin:0}\n.list.clean li[data-v-186a9dc4]{display:flex; align-items:center; justify-content:space-between; padding:8px 0; border-bottom:1px dashed #eef2f5}\n.list.clean li[data-v-186a9dc4]:last-child{border-bottom:0}\n.pill[data-v-186a9dc4]{background:#e6fcf7; color:#0f766e; border:1px solid #b3efe3; border-radius:999px; padding:2px 8px; font-size:.75rem; margin-right:8px}\n.muted[data-v-186a9dc4]{color:#64748b; font-size:.85rem}\n.viewall[data-v-186a9dc4]{font-size:.85rem}\n.fade-pop[data-v-186a9dc4]{animation:fadePop-186a9dc4 240ms cubic-bezier(.2,.7,.2,1) both}\n@keyframes fadePop-186a9dc4{from{opacity:0; transform:translateY(6px) scale(.98)}\nto{opacity:1; transform:translateY(0) scale(1)}}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_style_index_0_id_186a9dc4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_style_index_0_id_186a9dc4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_style_index_0_id_186a9dc4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/admin_panels/DashboardComponent.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/components/admin_panels/DashboardComponent.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DashboardComponent_vue_vue_type_template_id_186a9dc4_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DashboardComponent.vue?vue&type=template&id=186a9dc4&scoped=true */ "./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=template&id=186a9dc4&scoped=true");
/* harmony import */ var _DashboardComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DashboardComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _DashboardComponent_vue_vue_type_style_index_0_id_186a9dc4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css */ "./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_DashboardComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_DashboardComponent_vue_vue_type_template_id_186a9dc4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-186a9dc4"],['__file',"resources/js/components/admin_panels/DashboardComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DashboardComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css":
/*!*****************************************************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_style_index_0_id_186a9dc4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=template&id=186a9dc4&scoped=true":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=template&id=186a9dc4&scoped=true ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_template_id_186a9dc4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_template_id_186a9dc4_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DashboardComponent.vue?vue&type=template&id=186a9dc4&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=template&id=186a9dc4&scoped=true");


/***/ })

}]);