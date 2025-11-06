"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_FinanceComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FinanceComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FinanceComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _halalFinanceData_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./halalFinanceData.json */ "./resources/js/components/halalFinanceData.json");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      categories: [],
      tips: [],
      activeCategory: null,
      // will be set after load
      currentPage: 1,
      pageSize: 8,
      isLoading: false,
      error: null
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    // Map category id -> name for O(1) lookups
    categoryNameById() {
      const map = Object.create(null);
      for (const c of this.categories) map[c.id] = c.name;
      return map;
    },
    // Precompute counts once per tips change
    tipCountsByCategory() {
      const counts = Object.create(null);
      for (const t of this.tips) counts[t.category] = (counts[t.category] || 0) + 1;
      return counts;
    },
    activeCategoryName() {
      if (!this.activeCategory) return 'All Categories';
      return this.categoryNameById[this.activeCategory] || 'Uncategorized';
    },
    filteredTips() {
      if (!this.activeCategory) return [];
      return this.tips.filter(tip => tip.category === this.activeCategory);
    },
    paginatedTips() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredTips.slice(start, start + this.pageSize);
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredTips.length / this.pageSize) || 1);
    }
  },
  methods: {
    async loadData() {
      this.isLoading = true;
      try {
        this.categories = _halalFinanceData_json__WEBPACK_IMPORTED_MODULE_0__.categories || [];
        this.tips = _halalFinanceData_json__WEBPACK_IMPORTED_MODULE_0__.tips || [];
        // Set default activeCategory to the first category if available
        if (this.categories.length > 0) {
          this.activeCategory = this.categories[0].id;
        }
      } catch (err) {
        this.error = 'Failed to load content. Please try again later.';
        console.error('Error loading data:', err);
      } finally {
        this.isLoading = false;
      }
    },
    setActiveCategory(categoryId) {
      // Buttons pass numbers; select casts via v-model.number
      this.activeCategory = categoryId;
      this.currentPage = 1;
    },
    getCategoryColor(categoryId) {
      const shades = {
        default: '#0db691'
      };
      return shades[categoryId] || shades.default;
    },
    getCategoryIcon(categoryId) {
      const icons = ['bi-lightbulb', 'bi-gem', 'bi-graph-up', 'bi-bank', 'bi-heart', 'bi-people', 'bi-file-text', 'bi-shake-hands'];
      return icons[categoryId - 1] || 'bi-info-circle';
    }
  },
  watch: {
    activeCategory() {
      this.currentPage = 1;
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FinanceComponent.vue?vue&type=template&id=4bdbdb2e&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FinanceComponent.vue?vue&type=template&id=4bdbdb2e&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container py-4"
};
const _hoisted_2 = {
  class: "row g-4"
};
const _hoisted_3 = {
  class: "col-lg-3",
  role: "navigation",
  "aria-label": "Finance categories"
};
const _hoisted_4 = {
  class: "card shadow rounded-4"
};
const _hoisted_5 = {
  class: "card-body p-3"
};
const _hoisted_6 = {
  class: "d-md-none"
};
const _hoisted_7 = ["value"];
const _hoisted_8 = {
  class: "d-none d-md-block"
};
const _hoisted_9 = {
  class: "d-grid gap-2"
};
const _hoisted_10 = ["onClick"];
const _hoisted_11 = {
  class: "badge bg-white text-dark"
};
const _hoisted_12 = {
  class: "col-lg-9"
};
const _hoisted_13 = {
  class: "card shadow rounded-4"
};
const _hoisted_14 = {
  class: "card-header text-white rounded-top-4",
  style: {
    "background": "linear-gradient(135deg, #0db691, #0aa07e)"
  }
};
const _hoisted_15 = {
  class: "mb-0 d-flex align-items-center"
};
const _hoisted_16 = {
  class: "card-body"
};
const _hoisted_17 = {
  key: 0,
  class: "alert alert-warning text-center"
};
const _hoisted_18 = {
  key: 1,
  class: "row g-4"
};
const _hoisted_19 = ["aria-labelledby"];
const _hoisted_20 = ["id"];
const _hoisted_21 = {
  class: "card-body"
};
const _hoisted_22 = {
  class: "small text-muted"
};
const _hoisted_23 = {
  key: 0,
  class: "p-3 rounded-3 bg-light border mb-2"
};
const _hoisted_24 = {
  class: "small mb-0"
};
const _hoisted_25 = {
  key: 1,
  class: "p-3 rounded-3 bg-light border mb-2"
};
const _hoisted_26 = {
  class: "small ps-3 mb-0"
};
const _hoisted_27 = {
  key: 0,
  class: "card-footer bg-white border-top small"
};
const _hoisted_28 = {
  class: "ps-3 mb-0"
};
const _hoisted_29 = {
  key: 2,
  class: "d-flex justify-content-center align-items-center mt-3 gap-2"
};
const _hoisted_30 = ["disabled"];
const _hoisted_31 = {
  class: "small"
};
const _hoisted_32 = ["disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Title "), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "mb-2 text-center fw-bold display-5 display-md-4"
  }, "Islamic Finance", -1 /* CACHED */)), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-center text-dark mb-4",
    style: {
      "font-size": "18px"
    }
  }, " Rooted in ethical principles, Islamic finance ensures fairness and transparency in financial transactions in accordance with Shariah. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Sidebar Categories "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header text-white rounded-top-4",
    style: {
      "background": "linear-gradient(135deg, #0db691, #0aa07e)"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "mb-0"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-filter-circle me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Categories")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Dropdown for mobile screens "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "finance-category-select",
    class: "form-label visually-hidden"
  }, "Select category", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "finance-category-select",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.activeCategory = $event),
    class: "form-select rounded-pill",
    style: {
      "border-color": "#0db691"
    },
    "aria-label": "Select finance category"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.categories, category => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: category.id,
      value: category.id
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(category.name) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.tipCountsByCategory[category.id] || 0) + ") ", 9 /* TEXT, PROPS */, _hoisted_7);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.activeCategory, void 0, {
    number: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Sidebar buttons for larger screens "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.categories, category => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: category.id,
      onClick: $event => $options.setActiveCategory(category.id),
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn btn-light border rounded-pill text-start d-flex justify-content-between align-items-center", {
        'btn-gradient text-white': $data.activeCategory === category.id
      }]),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($data.activeCategory === category.id ? 'border: none;' : 'border-color: #0db691; color: #0a4f3c;')
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([$options.getCategoryIcon(category.id), "me-2"]),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(category.name), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.tipCountsByCategory[category.id] || 0), 1 /* TEXT */)], 14 /* CLASS, STYLE, PROPS */, _hoisted_10);
  }), 128 /* KEYED_FRAGMENT */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([$options.getCategoryIcon($data.activeCategory), "me-2"])
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.activeCategoryName), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [$options.filteredTips.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_17, " No content available for this category. ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_18, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.paginatedTips, tip => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-md-6",
      key: tip.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "card h-100 shadow-sm border-0 rounded-4",
      role: "article",
      "aria-labelledby": 'tip-title-' + tip.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "card-header text-white",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(`background-color: ${$options.getCategoryColor(tip.category)}`)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
      class: "mb-0",
      id: 'tip-title-' + tip.id
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip.title), 9 /* TEXT, PROPS */, _hoisted_20)], 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip.description), 1 /* TEXT */), tip.example ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
      class: "text-success"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-lightbulb me-1"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Practical Example")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip.example), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), tip.benefits ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_25, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
      class: "text-success"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check-circle me-1"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Key Benefits")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_26, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(tip.benefits, (benefit, i) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: i
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(benefit), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), tip.references ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_27, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
      class: "text-success"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-book me-1"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Islamic References")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_28, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(tip.references, (ref, i) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: i
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 8 /* PROPS */, _hoisted_19)]);
  }), 128 /* KEYED_FRAGMENT */))])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Pagination "), $options.totalPages > 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-success btn-sm",
    disabled: $data.currentPage === 1,
    onClick: _cache[1] || (_cache[1] = $event => $data.currentPage--)
  }, [...(_cache[8] || (_cache[8] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chevron-left"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_30), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_31, "Page " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.currentPage) + " of " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.totalPages), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-success btn-sm",
    disabled: $data.currentPage === $options.totalPages,
    onClick: _cache[2] || (_cache[2] = $event => $data.currentPage++)
  }, [...(_cache[9] || (_cache[9] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chevron-right"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_32)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" card-body ")])])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FinanceComponent.vue?vue&type=style&index=0&id=4bdbdb2e&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FinanceComponent.vue?vue&type=style&index=0&id=4bdbdb2e&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.lead.text-muted[data-v-4bdbdb2e] {\n  /* Improve contrast on light backgrounds (#f5f5f5 body) */\n  color: #495057 !important; /* darker than Bootstrap's #6c757d */\n}\n\n/* Force accessible text color for the mobile category select */\n#finance-category-select[data-v-4bdbdb2e] {\n  color: #0a4f3c !important; /* ≥ 4.5:1 on white */\n  border-color: #0db691 !important;\n  background-color: #ffffff;\n}\n#finance-category-select option[data-v-4bdbdb2e] {\n  color: #0a4f3c;\n}\n.text-gradient[data-v-4bdbdb2e] {\n  background: linear-gradient(to right, #0db691, #0aa07e);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}\n.btn-gradient[data-v-4bdbdb2e] {\n  background: linear-gradient(to right, #0db691, #0aa07e);\n  color: white !important;\n  font-weight: 600;\n}\n.btn-gradient[data-v-4bdbdb2e]:hover {\n  filter: brightness(1.05);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);\n}\n.card[data-v-4bdbdb2e] {\n  border-radius: 1rem;\n}\n.card-header[data-v-4bdbdb2e] {\n  border-top-left-radius: 1rem;\n  border-top-right-radius: 1rem;\n}\n.card-footer[data-v-4bdbdb2e] {\n  border-bottom-left-radius: 1rem;\n  border-bottom-right-radius: 1rem;\n}\n.form-select[data-v-4bdbdb2e] {\n  background: white;\n  font-weight: 500;\n  padding: 0.75rem 1rem;\n}\n.form-select[data-v-4bdbdb2e]:focus {\n  border-color: #0db691;\n  box-shadow: 0 0 0 0.2rem rgba(13, 182, 145, 0.25);\n}\n@media (max-width: 768px) {\n.display-5[data-v-4bdbdb2e] {\n    font-size: 2rem;\n}\n.lead[data-v-4bdbdb2e] {\n    font-size: 1rem;\n}\n.btn[data-v-4bdbdb2e] {\n    font-size: 0.95rem;\n}\n.card-body[data-v-4bdbdb2e], .card-footer[data-v-4bdbdb2e] {\n    padding: 1rem;\n}\n.form-select[data-v-4bdbdb2e] {\n    font-size: 0.95rem;\n}\n\n  /* Ensure main content takes full width on mobile */\n.col-lg-9[data-v-4bdbdb2e] {\n    margin-top: 1rem;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FinanceComponent.vue?vue&type=style&index=0&id=4bdbdb2e&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FinanceComponent.vue?vue&type=style&index=0&id=4bdbdb2e&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FinanceComponent_vue_vue_type_style_index_0_id_4bdbdb2e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FinanceComponent.vue?vue&type=style&index=0&id=4bdbdb2e&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FinanceComponent.vue?vue&type=style&index=0&id=4bdbdb2e&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FinanceComponent_vue_vue_type_style_index_0_id_4bdbdb2e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FinanceComponent_vue_vue_type_style_index_0_id_4bdbdb2e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/FinanceComponent.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/FinanceComponent.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FinanceComponent_vue_vue_type_template_id_4bdbdb2e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FinanceComponent.vue?vue&type=template&id=4bdbdb2e&scoped=true */ "./resources/js/components/FinanceComponent.vue?vue&type=template&id=4bdbdb2e&scoped=true");
/* harmony import */ var _FinanceComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FinanceComponent.vue?vue&type=script&lang=js */ "./resources/js/components/FinanceComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _FinanceComponent_vue_vue_type_style_index_0_id_4bdbdb2e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FinanceComponent.vue?vue&type=style&index=0&id=4bdbdb2e&scoped=true&lang=css */ "./resources/js/components/FinanceComponent.vue?vue&type=style&index=0&id=4bdbdb2e&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_FinanceComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_FinanceComponent_vue_vue_type_template_id_4bdbdb2e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-4bdbdb2e"],['__file',"resources/js/components/FinanceComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/FinanceComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/components/FinanceComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FinanceComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FinanceComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FinanceComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FinanceComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/FinanceComponent.vue?vue&type=style&index=0&id=4bdbdb2e&scoped=true&lang=css":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/components/FinanceComponent.vue?vue&type=style&index=0&id=4bdbdb2e&scoped=true&lang=css ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FinanceComponent_vue_vue_type_style_index_0_id_4bdbdb2e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FinanceComponent.vue?vue&type=style&index=0&id=4bdbdb2e&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FinanceComponent.vue?vue&type=style&index=0&id=4bdbdb2e&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/FinanceComponent.vue?vue&type=template&id=4bdbdb2e&scoped=true":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/FinanceComponent.vue?vue&type=template&id=4bdbdb2e&scoped=true ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FinanceComponent_vue_vue_type_template_id_4bdbdb2e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FinanceComponent_vue_vue_type_template_id_4bdbdb2e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FinanceComponent.vue?vue&type=template&id=4bdbdb2e&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/FinanceComponent.vue?vue&type=template&id=4bdbdb2e&scoped=true");


/***/ }),

/***/ "./resources/js/components/halalFinanceData.json":
/*!*******************************************************!*\
  !*** ./resources/js/components/halalFinanceData.json ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"categories":[{"id":1,"name":"General Principles"},{"id":2,"name":"Business Ethics"},{"id":3,"name":"Investment"},{"id":4,"name":"Banking"},{"id":5,"name":"Charity & Zakat"},{"id":6,"name":"Employment"},{"id":7,"name":"Contracts"},{"id":8,"name":"Partnerships"},{"id":9,"name":"E-Commerce"},{"id":10,"name":"Takaful"},{"id":11,"name":"Real Estate"},{"id":12,"name":"Agriculture"},{"id":13,"name":"Manufacturing"}],"tips":[{"id":1,"title":"Avoid Riba (Interest) in all transactions","description":"Islamic finance strictly prohibits any form of interest (riba). This includes both giving and receiving interest. Instead of conventional loans, consider profit-sharing arrangements (Mudarabah), joint ventures (Musharakah), or asset-based financing (Murabaha) where risks and rewards are shared between parties according to Islamic principles.","category":4,"importance":5,"date":"2023-05-15","example":"Instead of taking a loan with interest to buy equipment, enter into a Murabaha agreement where the bank purchases the equipment and sells it to you at a profit margin, with clear terms and payment schedule.","benefits":["Earns Allah\'s pleasure by avoiding a major sin","Promotes risk-sharing rather than guaranteed returns","Encourages productive investment in real assets"],"references":["Quran 2:275-280 - \'Those who consume interest cannot stand [on the Day of Resurrection] except as one stands who is being beaten by Satan into insanity...\'","Sahih Bukhari, Book 34, Hadith 264 - The Prophet (PBUH) cursed the one who consumes riba, the one who pays it, the one who writes the contract, and the two witnesses to it"]},{"id":2,"title":"Ensure business transactions are clear and transparent","description":"All terms and conditions of business dealings should be clearly stated, documented, and understood by all parties to avoid disputes, deception, and unethical practices.","category":2,"importance":4,"date":"2023-06-22","example":"When selling a product, clearly specify the exact model, features, warranty terms, delivery date, and price. Avoid vague descriptions that could lead to misunderstandings.","benefits":["Builds trust with customers and partners","Reduces disputes and conflicts","Fulfills Islamic requirement of clear contracts"],"references":["Quran 2:282 - \'O you who have believed, when you contract a debt for a specified term, write it down...\'","Sunan Ibn Majah, Book 12, Hadith 51 - \'The two parties to a transaction have the option (to cancel) until they part. If they are truthful and disclose (any defects), their transaction will be blessed.\'"]},{"id":3,"title":"Invest in Halal industries only","description":"Muslims must avoid investing in businesses involved in haram activities such as alcohol, gambling, pork, conventional banking/insurance, adult entertainment, weapons manufacturing, or other prohibited activities according to Islamic law.","category":3,"importance":5,"date":"2023-04-10","example":"Instead of investing in a conventional mutual fund, choose a Sharia-compliant fund that screens companies for halal business activities and avoids interest-based transactions.","benefits":["Ensures your wealth grows through halal means","Avoids supporting harmful industries","Promotes ethical economic development"],"references":["Quran 5:90 - \'O you who have believed, indeed, intoxicants, gambling, [sacrificing on] stone alters [to other than Allah], and divining arrows are but defilement from the work of Satan...\'","Quran 2:219 - \'They ask you about wine and gambling. Say, \'In them is great sin and [yet, some] benefit for people. But their sin is greater than their benefit...\'"]},{"id":4,"title":"Pay Zakat on your wealth","description":"Calculate and distribute 2.5% of your savings and investments that have been held for one lunar year to eligible recipients. Zakat is obligatory on cash, gold, silver, business inventory, and investments that meet the nisab threshold.","category":5,"importance":5,"date":"2023-03-18","example":"If you have $10,000 in savings that has been in your account for over one year (above the nisab threshold), you would calculate 2.5% ($250) and distribute it to the poor, needy, zakat collectors, those whose hearts are to be reconciled, freeing slaves, debtors, in Allah\'s cause, and travelers.","benefits":["Purifies wealth and increases barakah","Fulfills a pillar of Islam","Helps redistribute wealth in society"],"references":["Quran 9:60 - \'Zakat expenditures are only for the poor and for the needy and for those employed to collect [zakat] and for bringing hearts together and for freeing captives [or slaves] and for those in debt and for the cause of Allah and for the [stranded] traveler...\'","Sahih Bukhari, Book 24, Hadith 486 - \'The Prophet (PBUH) sent Mu\'adh to Yemen and said: \'Inform them that Allah has made zakat obligatory on their wealth...\'\'"]},{"id":5,"title":"Avoid Gharar (Excessive uncertainty)","description":"Business contracts should avoid excessive uncertainty, ambiguity, or deception about the essential elements of the transaction. This includes selling goods you don\'t own or can\'t deliver, unclear pricing terms, or vague product descriptions.","category":1,"importance":4,"date":"2023-07-05","example":"Don\'t sell fish that are still in the sea or crops not yet harvested, as there\'s uncertainty about whether you\'ll actually be able to deliver them. Similarly, avoid contracts with open-ended terms that could lead to disputes.","benefits":["Reduces disputes and litigation","Creates fair and just transactions","Follows the Sunnah of clear business dealings"],"references":["Sahih Muslim, Book 10, Hadith 3882 - The Prophet (PBUH) prohibited the sale of what is not in your possession","Sunan Ibn Majah, Book 12, Hadith 2267 - \'The Messenger of Allah (PBUH) forbade the sale of fruits until they are clearly in good condition\'"]},{"id":6,"title":"Practice fair pricing","description":"Avoid price manipulation, hoarding, and other practices that exploit customers or create artificial scarcity. While Islam allows for profit, it must be reasonable and not take advantage of people\'s needs.","category":2,"importance":4,"date":"2023-01-30","example":"During a food shortage, don\'t stockpile essential goods to sell at inflated prices. Maintain reasonable profit margins that allow you to earn a living without exploiting others.","benefits":["Earns Allah\'s pleasure through fair dealings","Builds customer loyalty and trust","Contributes to economic stability"],"references":["Sunan Abu Dawood, Book 23, Hadith 3446 - \'The Prophet (PBUH) said: \'Sellers and buyers have the option (to cancel) as long as they have not separated. If they speak the truth and make clear (the defects), their transaction will be blessed. If they conceal and lie, the blessing of their transaction will be blotted out.\'\'","Sahih Bukhari, Book 34, Hadith 315 - The Prophet (PBUH) refused to fix prices, saying \'Allah is the One Who fixes prices...\'"]},{"id":7,"title":"Use Islamic banking products","description":"Opt for Sharia-compliant financial products like Murabaha (cost-plus financing), Musharakah (partnership), or Ijara (leasing) instead of conventional loans. Islamic banks operate without interest, instead using trade-based, asset-backed, or profit-sharing models that comply with Islamic law.","category":4,"importance":4,"date":"2023-08-12","example":"Instead of a conventional mortgage, use Diminishing Musharakah where you and the bank jointly purchase a property, with you gradually buying the bank\'s share over time while paying rent for the portion you don\'t yet own.","benefits":["Keeps your finances halal","Supports the Islamic finance industry","Often includes more ethical terms"],"references":["Fatwas from major Islamic scholars on permissibility of modern Islamic banking structures","AAOIFI Sharia Standards for Islamic Financial Institutions"]},{"id":8,"title":"Honor contracts and promises","description":"Fulfill all business agreements and promises as breaking them is considered a major sin in Islam. This includes honoring payment terms, delivery commitments, quality standards, and all other contractual obligations.","category":1,"importance":5,"date":"2023-09-01","example":"If you agree to deliver goods by a certain date but encounter delays, communicate immediately with the buyer to renegotiate rather than simply failing to deliver.","benefits":["Builds strong business reputation","Fulfills Islamic ethical requirements","Reduces legal disputes"],"references":["Quran 5:1 - \'O you who have believed, fulfill [all] contracts...\'","Sahih Muslim, Book 1, Hadith 324 - \'The signs of a hypocrite are three: when he speaks he lies, when he promises he breaks it, and when he is entrusted he betrays\'"]},{"id":9,"title":"Distribute wealth fairly","description":"Ensure fair wages and profit distribution among all stakeholders in your business ventures. Employees should be paid promptly and adequately for their work. Partners should receive their fair share according to agreement.","category":6,"importance":4,"date":"2023-07-20","example":"If your business has a profitable year, consider giving employees bonuses or profit-sharing beyond their regular wages in recognition of their contribution to the success.","benefits":["Creates motivated workforce","Fulfills Islamic labor rights requirements","Promotes social justice"],"references":["Quran 4:32 - \'And do not wish for that by which Allah has made some of you exceed others...\'","Sunan Ibn Majah, Book 12, Hadith 2443 - \'Give the worker his wages before his sweat dries\'"]},{"id":10,"title":"Avoid monopoly practices","description":"Islamic economics discourages monopolies and hoarding of essential goods to manipulate prices. While specialization and market leadership are permitted, using dominant position to unfairly restrict supply or charge excessive prices is prohibited.","category":2,"importance":3,"date":"2023-10-05","example":"If you\'re the only supplier of a basic necessity in an area, maintain reasonable prices rather than exploiting your position to charge whatever the market will bear.","benefits":["Promotes fair competition","Ensures market accessibility","Follows Prophetic economic principles"],"references":["Sunan Ibn Majah, Book 12, Hadith 2156 - \'Whoever withholds food (to raise prices), Allah will afflict him with bankruptcy and disease\'","Musnad Ahmad - The Prophet (PBUH) said: \'No one hoards but the sinner\'"]},{"id":11,"title":"Use proper accounting methods","description":"Maintain accurate financial records and transparent accounting practices. This includes proper documentation of transactions, clear separation of personal and business finances, and honest reporting for zakat calculation and tax purposes.","category":1,"importance":4,"date":"2023-11-15","example":"Keep separate bank accounts for business and personal use, maintain receipts for all transactions, and record income and expenses regularly to accurately calculate zakat and taxes.","benefits":["Ensures accurate zakat calculation","Provides business clarity","Reduces disputes with partners"],"references":["Quran 2:282 - \'O you who have believed, when you contract a debt for a specified term, write it down...\'","Sunan Abu Dawood, Book 23, Hadith 3640 - \'The truthful, trustworthy merchant will be with the prophets, the truthful and the martyrs\'"]},{"id":12,"title":"Ensure halal supply chains","description":"Verify that all components of your products and services comply with Islamic requirements throughout your supply chain. This includes materials, ingredients, production processes, and transportation methods.","category":2,"importance":4,"date":"2023-09-28","example":"A restaurant should not only serve halal meat but ensure all ingredients (including oils, flavorings, etc.) are halal, and that cross-contamination with haram items doesn\'t occur during preparation.","benefits":["Maintains complete halal integrity","Builds customer trust","Avoids involvement with haram elements"],"references":["Quran 5:88 - \'And eat of what Allah has provided for you [which is] lawful and good...\'","Sahih Muslim, Book 21, Hadith 101 - \'The Prophet (PBUH) prohibited every intoxicant and everything that weakens the mind\'"]},{"id":13,"title":"Consider Takaful (Islamic Insurance)","description":"Instead of conventional insurance based on uncertainty and interest, consider Takaful which operates on principles of mutual cooperation, shared responsibility, and donations.","category":10,"importance":4,"date":"2023-12-10","example":"Rather than buying car insurance from a conventional company, join a Takaful program where members contribute to a fund that covers accidents, with professional management and Sharia supervision.","benefits":["Provides halal risk protection","Operates on cooperative principles","Avoids gharar and riba"],"references":["Fatwas from Islamic Fiqh Academy on cooperative insurance models","Quran 5:2 - \'And cooperate in righteousness and piety\'"]},{"id":14,"title":"Maintain good relationships with competitors","description":"Islam encourages healthy competition but prohibits malicious practices against competitors. Avoid slander, spreading rumors, or unethical tactics to gain advantage.","category":2,"importance":3,"date":"2024-01-15","example":"If a competitor opens nearby, focus on improving your own offerings rather than spreading negative information about them.","benefits":["Maintains ethical standards","Promotes industry improvement","Earns Allah\'s pleasure"],"references":["Quran 49:12 - \'O you who have believed, avoid much [negative] assumption... And do not spy or backbite each other...\'","Sahih Muslim, Book 32, Hadith 6264 - \'The Muslim is the one from whose tongue and hand the Muslims are safe\'"]},{"id":15,"title":"Balance business and worship","description":"While earning halal income is praiseworthy, don\'t let business pursuits interfere with obligatory worship. Schedule work around prayer times and remember the hereafter is eternal.","category":1,"importance":5,"date":"2024-02-20","example":"Close your shop during prayer times or arrange staff coverage so you can pray on time. Avoid scheduling important meetings during Friday prayers.","benefits":["Maintains spiritual balance","Sets good example for employees","Brings barakah to business"],"references":["Quran 62:9 - \'O you who have believed, when [the adhan] is called for the prayer on the day of Jumu\'ah [Friday], then proceed to the remembrance of Allah and leave trade...\'","Sahih Bukhari, Book 8, Hadith 419 - \'The covenant between us and them is prayer\'"]},{"id":16,"title":"Choose ethical business partners","description":"Select business partners who share your Islamic values and ethical standards. Partnering with those who engage in haram practices may compromise your business\'s halal integrity.","category":8,"importance":4,"date":"2024-03-05","example":"When starting a restaurant, choose partners committed to halal standards rather than those who might suggest cutting corners to increase profits.","benefits":["Maintains business integrity","Reduces conflicts over ethics","Ensures halal income"],"references":["Quran 4:29 - \'O you who have believed, do not consume one another\'s wealth unjustly but only [in lawful] business by mutual consent...\'","Sunan Abu Dawood, Book 23, Hadith 3385 - \'Muslims are bound by their conditions\'"]},{"id":17,"title":"Implement halal e-commerce practices","description":"When selling online, ensure your e-commerce practices comply with Islamic principles including transparent pricing, honest product descriptions, and halal payment methods.","category":9,"importance":4,"date":"2024-01-30","example":"Clearly state all costs upfront (no hidden fees), provide accurate product photos/descriptions, and avoid interest-based payment plans.","benefits":["Expands market to Muslim consumers","Builds trust with customers","Ensures transactions are blessed"],"references":["Quran 17:35 - \'Give full measure when you measure, and weigh with an even balance\'","Sunan Ibn Majah, Book 12, Hadith 2240 - \'The truthful merchant will be with the prophets\'"]},{"id":18,"title":"Avoid excessive debt","description":"While Islam permits debt for genuine needs, it discourages excessive borrowing that could lead to financial difficulty or inability to repay.","category":4,"importance":4,"date":"2024-02-15","example":"Instead of taking loans for luxury items, save up and pay cash. For business needs, consider profit-sharing arrangements rather than interest-bearing loans.","benefits":["Reduces financial stress","Avoids riba-based financing","Promotes financial responsibility"],"references":["Quran 2:280 - \'And if someone is in hardship, then [let there be] postponement until [a time of] ease...\'","Sunan Ibn Majah, Book 12, Hadith 2287 - \'The Prophet (PBUH) used to seek refuge from debt in his prayers\'"]},{"id":19,"title":"Document business agreements","description":"While verbal agreements are binding in Islam, written contracts are strongly recommended to prevent disputes. Contracts should clearly state terms and obligations.","category":7,"importance":4,"date":"2024-03-01","example":"When entering a business partnership, draft a written agreement specifying capital contributions, profit/loss sharing ratios, management responsibilities, and exit procedures.","benefits":["Reduces misunderstandings","Provides legal protection","Follows Quranic injunction"],"references":["Quran 2:282 - \'O you who have believed, when you contract a debt for a specified term, write it down...\'","Sunan Abu Dawood, Book 23, Hadith 3385 - \'Muslims are bound by their conditions\'"]},{"id":20,"title":"Practice ethical marketing","description":"Ensure your marketing practices are truthful and avoid exaggeration, deception, or manipulation of customers\' emotions or needs.","category":2,"importance":3,"date":"2024-03-10","example":"Don\'t use false scarcity tactics (\'Only 2 left!\') or make claims about products you can\'t substantiate. Be honest about product capabilities and limitations.","benefits":["Builds long-term customer trust","Avoids sinful business practices","Creates sustainable business growth"],"references":["Quran 83:1-3 - \'Woe to those who give less [than due]\'","Sahih Muslim, Book 1, Hadith 155 - \'The truthful and honest businessman will be in the company of Prophets\'"]},{"id":21,"title":"Consider Waqf for long-term impact","description":"Waqf (Islamic endowment) allows you to dedicate assets for ongoing charitable purposes, creating sustainable benefit for the community.","category":5,"importance":4,"date":"2024-03-15","example":"Establish a waqf by donating a property where the rental income continuously supports an Islamic school, mosque, or charity organization.","benefits":["Creates ongoing charity (sadaqah jariyah)","Preserves wealth for good causes","Benefits multiple generations"],"references":["Sahih Bukhari, Book 55, Hadith 600 - \'When a man dies, his deeds come to an end except for three things: ongoing charity, knowledge that is benefited from, and a righteous child who prays for him\'","Numerous historical examples of Islamic waqfs supporting education and social services"]},{"id":22,"title":"Implement fair employment practices","description":"Treat employees with justice and kindness, providing fair wages, good working conditions, and respecting their rights as outlined in Islam.","category":6,"importance":5,"date":"2024-03-20","example":"Pay employees before their sweat dries, provide reasonable breaks for prayers, and never delay salaries without mutual agreement.","benefits":["Fulfills Islamic labor rights","Creates loyal workforce","Earns Allah\'s pleasure"],"references":["Quran 4:58 - \'Indeed, Allah commands you to render trusts to whom they are due\'","Sunan Ibn Majah, Book 12, Hadith 2443 - \'Give the worker his wages before his sweat dries\'"]},{"id":23,"title":"Apply Islamic real estate principles","description":"Real estate transactions must avoid riba, gharar, and haram elements. Use musharaka (partnership) or ijara (leasing) models instead of conventional mortgages.","category":11,"importance":4,"date":"2024-04-05","example":"For home financing, use diminishing partnership where the bank and buyer jointly purchase the property, with the buyer gradually acquiring the bank\'s shares through monthly payments.","benefits":["Eliminates interest-based financing","Aligns with Shariah property ownership principles","Provides transparent cost structure"],"references":["Fiqh contemporary real estate fatwas from Islamic Fiqh Academy","AAOIFI Sharia Standard on Ijara"]},{"id":24,"title":"Follow halal agricultural practices","description":"Ensure farming methods comply with Islamic principles including humane treatment of animals, avoidance of harmful chemicals, and proper zakat calculation on crops.","category":12,"importance":4,"date":"2024-04-10","example":"When raising livestock, provide adequate space, natural feed, and humane slaughter methods. For crops, calculate zakat at 5% or 10% depending on irrigation method.","benefits":["Produces truly halal food products","Fulfills environmental stewardship (khalifa)","Ensures proper zakat calculation"],"references":["Quran 6:141 - \'Eat of their fruits when they bear fruit and pay its due on the day of its harvest\'","Sunan Abu Dawood, Book 16, Hadith 2829 - On humane animal treatment"]},{"id":25,"title":"Implement halal manufacturing standards","description":"Manufacturing processes must avoid haram ingredients, cross-contamination, and unethical labor practices while maintaining product purity.","category":13,"importance":4,"date":"2024-04-15","example":"A food manufacturer should have separate production lines for halal products, regular audits by Islamic certifiers, and transparent ingredient sourcing.","benefits":["Guarantees product halal status","Builds consumer confidence","Creates export opportunities to Muslim markets"],"references":["Quran 5:88 - \'Eat of what is lawful and good\'","MS1500:2019 Malaysian Halal Food Standard"]},{"id":26,"title":"Structure halal import/export deals","description":"International trade must comply with Islamic principles including proper documentation, transparent pricing, and halal payment methods.","category":2,"importance":4,"date":"2024-04-20","example":"Use letters of credit with Islamic banks that don\'t charge interest, ensure shipped goods are properly certified halal, and avoid currency speculation.","benefits":["Expands business globally while maintaining compliance","Avoids riba in international transactions","Builds trust with Muslim trade partners"],"references":["Quran 2:275 - \'Allah has permitted trade and forbidden riba\'","Islamic Fiqh Academy resolutions on international trade"]},{"id":27,"title":"Establish proper business inheritance","description":"Plan business succession according to Islamic inheritance laws (mirath) while ensuring business continuity and fair treatment of all heirs.","category":1,"importance":4,"date":"2024-04-25","example":"Create a will specifying how business assets should be distributed according to Shariah, while establishing mechanisms for smooth management transition.","benefits":["Fulfills Islamic inheritance obligations","Prevents family disputes","Ensures business sustainability"],"references":["Quran 4:11-12 - Detailed inheritance verses","Sahih Bukhari, Book 85, Hadith 82 - On the importance of wills"]},{"id":28,"title":"Apply Islamic microfinance models","description":"Support small entrepreneurs through qard hasan (benevolent loans) or profit-sharing models rather than interest-based microcredit.","category":4,"importance":3,"date":"2024-05-01","example":"Establish a community fund providing interest-free loans to small businesses, with optional voluntary repayment of extra amounts as charity.","benefits":["Empowers communities Islamically","Avoids exploiting the poor","Creates sustainable development"],"references":["Quran 2:245 - \'Who will lend Allah a good loan?\'","Numerous Islamic microfinance case studies worldwide"]},{"id":29,"title":"Develop halal tourism services","description":"Cater to Muslim travelers by providing prayer facilities, halal food, and modesty accommodations while avoiding haram activities.","category":2,"importance":3,"date":"2024-05-05","example":"A hotel can designate prayer rooms, serve certified halal meals, provide Quran copies and prayer timetables, and avoid alcohol/mini-bars.","benefits":["Taps into growing halal tourism market","Provides valuable service to Muslim travelers","Creates wholesome family environment"],"references":["Quran 5:5 - \'Today the good things are made lawful for you\'","Hadith about facilitating good for others"]},{"id":30,"title":"Implement Islamic corporate governance","description":"Establish Shariah-compliant governance structures including Shariah boards, ethical audits, and stakeholder accountability.","category":1,"importance":5,"date":"2024-05-10","example":"Form a Shariah supervisory board to review all business activities, conduct annual Shariah compliance audits, and publish transparency reports.","benefits":["Ensures ongoing Shariah compliance","Builds investor confidence","Creates ethical organizational culture"],"references":["Quran 4:58 - \'Indeed, Allah commands you to render trusts to whom they are due\'","AAOIFI Governance Standards for Islamic Financial Institutions"]},{"id":31,"title":"Structure halal retirement plans","description":"Develop retirement savings plans using Shariah-compliant investments and profit-sharing models rather than interest-based funds.","category":3,"importance":4,"date":"2024-05-15","example":"Create an employee retirement program investing solely in Islamic equities, sukuk, and halal mutual funds with transparent profit distribution.","benefits":["Provides halal retirement income","Avoids riba in pension funds","Aligns retirement planning with Islamic values"],"references":["Quran 28:77 - \'But seek, through what Allah has given you, the home of the Hereafter\'","Contemporary fatwas on Islamic pension plans"]},{"id":32,"title":"Apply Islamic crisis management","description":"Handle business crises according to Islamic principles of patience, consultation (shura), and trust in Allah while taking practical steps.","category":1,"importance":4,"date":"2024-05-20","example":"During financial difficulties, first consult knowledgeable Muslims, maintain employee rights, avoid haram solutions, and make sincere dua for relief.","benefits":["Maintains barakah in difficult times","Preserves ethical standards under pressure","Leads to halal solutions"],"references":["Quran 65:2-3 - \'Whoever fears Allah, He will make a way out for him\'","Prophetic examples of crisis management"]},{"id":33,"title":"Develop halal franchising models","description":"Expand businesses through franchising while ensuring all operations remain Shariah-compliant across locations.","category":8,"importance":3,"date":"2024-05-25","example":"Create franchise agreements requiring halal certification, Islamic financing for franchisees, and Shariah-compliant marketing practices.","benefits":["Scales halal businesses effectively","Maintains brand Shariah compliance","Creates halal entrepreneurship opportunities"],"references":["Quran 5:1 - \'Fulfill all contracts\'","Islamic business partnership principles"]},{"id":34,"title":"Establish halal certification processes","description":"Obtain proper halal certification for products/services through accredited Islamic organizations with rigorous standards.","category":1,"importance":5,"date":"2024-06-01","example":"For a food business, implement full traceability from farm to table, undergo regular audits by recognized halal certifiers, and train staff on halal requirements.","benefits":["Gives consumers confidence in halal status","Opens Muslim markets globally","Fulfills Islamic due diligence obligation"],"references":["Quran 5:88 - \'Eat of what is lawful and good\'","Various national and international halal standards"]},{"id":35,"title":"Create Islamic endowment (waqf) businesses","description":"Establish revenue-generating businesses where profits support charitable causes in perpetuity according to waqf principles.","category":5,"importance":4,"date":"2024-06-05","example":"Start a shopping center where rental income permanently funds Islamic education, or a farm whose produce continuously feeds the poor.","benefits":["Creates ongoing charity (sadaqah jariyah)","Builds sustainable social impact","Preserves wealth for good causes"],"references":["Sahih Muslim, Book 13, Hadith 4005 - On perpetual charity","Historical Islamic waqf models supporting mosques and schools"]}]}');

/***/ })

}]);