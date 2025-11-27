"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_AboutComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AboutComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AboutComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_prayers_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/prayers.json */ "./resources/js/components/prayers.json");
// Import the JSON data

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'SalatGuide',
  data() {
    return {
      data: _components_prayers_json__WEBPACK_IMPORTED_MODULE_0__,
      currentStep: 0
    };
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.data.steps.steps.length - 1) {
        this.currentStep++;
      }
    },
    previousStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    setCurrentStep(step) {
      this.currentStep = step;
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AboutComponent.vue?vue&type=template&id=5049bb1b&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AboutComponent.vue?vue&type=template&id=5049bb1b&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "salat-guide-container"
};
const _hoisted_2 = {
  class: "container"
};
const _hoisted_3 = {
  class: "hero-section"
};
const _hoisted_4 = {
  class: "hero-glass"
};
const _hoisted_5 = {
  class: "hero-content"
};
const _hoisted_6 = {
  class: "hero-title"
};
const _hoisted_7 = {
  class: "hero-description"
};
const _hoisted_8 = {
  class: "pillar-chips"
};
const _hoisted_9 = {
  class: "prerequisites-section"
};
const _hoisted_10 = {
  class: "section-header"
};
const _hoisted_11 = {
  class: "section-title"
};
const _hoisted_12 = {
  class: "section-subtitle"
};
const _hoisted_13 = {
  class: "prerequisites-grid"
};
const _hoisted_14 = {
  class: "glass-card positive"
};
const _hoisted_15 = {
  class: "card-content"
};
const _hoisted_16 = {
  class: "check-content"
};
const _hoisted_17 = {
  class: "glass-card negative"
};
const _hoisted_18 = {
  class: "card-content"
};
const _hoisted_19 = {
  class: "check-content"
};
const _hoisted_20 = {
  class: "steps-section"
};
const _hoisted_21 = {
  class: "section-header text-center"
};
const _hoisted_22 = {
  class: "section-title"
};
const _hoisted_23 = {
  class: "section-subtitle"
};
const _hoisted_24 = {
  class: "liquid-progress"
};
const _hoisted_25 = {
  class: "progress-track"
};
const _hoisted_26 = {
  class: "step-dots"
};
const _hoisted_27 = ["onClick"];
const _hoisted_28 = {
  class: "step-number"
};
const _hoisted_29 = {
  class: "step-glass-card"
};
const _hoisted_30 = {
  class: "step-visual"
};
const _hoisted_31 = ["src", "alt"];
const _hoisted_32 = {
  class: "step-overlay"
};
const _hoisted_33 = {
  class: "step-badge"
};
const _hoisted_34 = {
  class: "current"
};
const _hoisted_35 = {
  class: "total"
};
const _hoisted_36 = {
  class: "step-content"
};
const _hoisted_37 = {
  class: "step-header"
};
const _hoisted_38 = {
  class: "step-title"
};
const _hoisted_39 = {
  class: "step-meta"
};
const _hoisted_40 = {
  class: "step-type"
};
const _hoisted_41 = {
  class: "step-rakahs"
};
const _hoisted_42 = {
  class: "step-description"
};
const _hoisted_43 = {
  class: "step-recitation"
};
const _hoisted_44 = {
  class: "arabic-glass"
};
const _hoisted_45 = {
  class: "arabic-text",
  dir: "rtl"
};
const _hoisted_46 = {
  class: "translation"
};
const _hoisted_47 = {
  class: "step-actions"
};
const _hoisted_48 = ["disabled"];
const _hoisted_49 = ["disabled"];
const _hoisted_50 = {
  class: "prayer-times-section"
};
const _hoisted_51 = {
  class: "section-header"
};
const _hoisted_52 = {
  class: "section-title"
};
const _hoisted_53 = {
  class: "section-subtitle"
};
const _hoisted_54 = {
  class: "prayer-cards"
};
const _hoisted_55 = {
  class: "prayer-icon"
};
const _hoisted_56 = {
  class: "prayer-info"
};
const _hoisted_57 = {
  class: "prayer-name"
};
const _hoisted_58 = {
  class: "prayer-time-range"
};
const _hoisted_59 = {
  class: "start"
};
const _hoisted_60 = {
  class: "end"
};
const _hoisted_61 = {
  class: "prayer-rakahs"
};
const _hoisted_62 = {
  class: "resources-section"
};
const _hoisted_63 = {
  class: "section-header"
};
const _hoisted_64 = {
  class: "section-title"
};
const _hoisted_65 = {
  class: "section-subtitle"
};
const _hoisted_66 = {
  class: "resources-grid"
};
const _hoisted_67 = {
  class: "resource-icon"
};
const _hoisted_68 = {
  class: "resource-content"
};
const _hoisted_69 = {
  class: "btn-resource"
};
const _hoisted_70 = {
  class: "liquid-footer"
};
const _hoisted_71 = {
  class: "container"
};
const _hoisted_72 = {
  class: "footer-content"
};
const _hoisted_73 = {
  class: "footer-brand"
};
const _hoisted_74 = {
  class: "copyright"
};
const _hoisted_75 = {
  class: "footer-message"
};
const _hoisted_76 = {
  class: "footer-quote"
};
const _hoisted_77 = {
  class: "quote-text"
};
const _hoisted_78 = {
  class: "quote-source"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("main", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Hero Section with Glass Morphism "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "islamic-ornament"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-star-and-crescent"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.introduction.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.introduction.content), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.data.introduction.pillars, (pillar, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
      key: index,
      class: "pillar-chip"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(pillar), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])]), _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "glass-reflection"
  }, null, -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Prerequisites Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.prerequisites.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.prerequisites.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Do's Card "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"card-glow\" data-v-5049bb1b></div><div class=\"card-header\" data-v-5049bb1b><div class=\"status-indicator positive\" data-v-5049bb1b><i class=\"fas fa-check\" data-v-5049bb1b></i></div><h3 class=\"card-title\" data-v-5049bb1b>Do&#39;s</h3></div>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.data.prerequisites.dos, (item, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: index,
      class: "checklist-item"
    }, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "check-icon"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check-circle"
    })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.description), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Don'ts Card "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"card-glow\" data-v-5049bb1b></div><div class=\"card-header\" data-v-5049bb1b><div class=\"status-indicator negative\" data-v-5049bb1b><i class=\"fas fa-times\" data-v-5049bb1b></i></div><h3 class=\"card-title\" data-v-5049bb1b>Don&#39;ts</h3></div>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.data.prerequisites.donts, (item, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: index,
      class: "checklist-item"
    }, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "check-icon"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-times-circle"
    })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.description), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Step-by-Step Guide "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.steps.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.steps.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Liquid Progress Bar "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-fill",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: `${$data.currentStep / ($data.data.steps.steps.length - 1) * 100}%`
    })
  }, null, 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.data.steps.steps, (step, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: index,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["step-dot", {
        'active': $data.currentStep === index,
        'completed': $data.currentStep > index
      }]),
      onClick: $event => $options.setCurrentStep(index)
    }, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "dot-core"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_27);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Step Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $data.data.steps.steps[$data.currentStep].image,
    alt: $data.data.steps.steps[$data.currentStep].title,
    class: "step-image"
  }, null, 8 /* PROPS */, _hoisted_31), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.currentStep + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_35, "/ " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.steps.steps.length), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.steps.steps[$data.currentStep].title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_40, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.steps.steps[$data.currentStep].type), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_41, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.steps.steps[$data.currentStep].rakahs), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "description-title"
  }, "Description", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.steps.steps[$data.currentStep].description), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "recitation-title"
  }, "Recitation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.steps.steps[$data.currentStep].arabic), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-language"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.steps.steps[$data.currentStep].translation), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn-glass prev",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.previousStep && $options.previousStep(...args)),
    disabled: $data.currentStep === 0
  }, [...(_cache[12] || (_cache[12] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-left"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Previous ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_48), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn-glass next",
    onClick: _cache[1] || (_cache[1] = (...args) => $options.nextStep && $options.nextStep(...args)),
    disabled: $data.currentStep === $data.data.steps.steps.length - 1
  }, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Next ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-right"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_49)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Prayer Times "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_52, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.prayerTimes.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_53, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.prayerTimes.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.data.prayerTimes.prayers, (prayer, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: index,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["prayer-glass-card", {
        'active': prayer.name === $data.data.header.nextPrayer
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(prayer.icon)
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_57, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prayer.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_59, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prayer.start), 1 /* TEXT */), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "separator"
    }, "-", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_60, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prayer.end), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prayer.rakahs) + " Rak'ahs ", 1 /* TEXT */)]), _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "prayer-glow"
    }, null, -1 /* CACHED */))], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Resources "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_64, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.resources.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_65, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.resources.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.data.resources.items, (resource, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: index,
      class: "resource-glass-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(resource.icon)
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(resource.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(resource.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", _hoisted_69, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(resource.buttonText) + " ", 1 /* TEXT */), _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-arrow-right"
    }, null, -1 /* CACHED */))])]), _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "resource-glow"
    }, null, -1 /* CACHED */))]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Footer "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("footer", _hoisted_70, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "brand-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-mosque"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_74, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.footer.copyright), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_75, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.footer.message), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_77, "\"" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.footer.quote) + "\"", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_78, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.data.footer.source), 1 /* TEXT */)])])])])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AboutComponent.vue?vue&type=style&index=0&id=5049bb1b&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AboutComponent.vue?vue&type=style&index=0&id=5049bb1b&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/components/AboutComponent.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/AboutComponent.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AboutComponent_vue_vue_type_template_id_5049bb1b_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AboutComponent.vue?vue&type=template&id=5049bb1b&scoped=true */ "./resources/js/components/AboutComponent.vue?vue&type=template&id=5049bb1b&scoped=true");
/* harmony import */ var _AboutComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AboutComponent.vue?vue&type=script&lang=js */ "./resources/js/components/AboutComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _AboutComponent_vue_vue_type_style_index_0_id_5049bb1b_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AboutComponent.vue?vue&type=style&index=0&id=5049bb1b&scoped=true&lang=css */ "./resources/js/components/AboutComponent.vue?vue&type=style&index=0&id=5049bb1b&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_AboutComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AboutComponent_vue_vue_type_template_id_5049bb1b_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-5049bb1b"],['__file',"resources/js/components/AboutComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/AboutComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/AboutComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AboutComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AboutComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AboutComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AboutComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/AboutComponent.vue?vue&type=style&index=0&id=5049bb1b&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/AboutComponent.vue?vue&type=style&index=0&id=5049bb1b&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AboutComponent_vue_vue_type_style_index_0_id_5049bb1b_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AboutComponent.vue?vue&type=style&index=0&id=5049bb1b&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AboutComponent.vue?vue&type=style&index=0&id=5049bb1b&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/AboutComponent.vue?vue&type=template&id=5049bb1b&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/AboutComponent.vue?vue&type=template&id=5049bb1b&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AboutComponent_vue_vue_type_template_id_5049bb1b_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AboutComponent_vue_vue_type_template_id_5049bb1b_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AboutComponent.vue?vue&type=template&id=5049bb1b&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AboutComponent.vue?vue&type=template&id=5049bb1b&scoped=true");


/***/ }),

/***/ "./resources/js/components/prayers.json":
/*!**********************************************!*\
  !*** ./resources/js/components/prayers.json ***!
  \**********************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"app":{"title":"Islamic Prayer Guide","subtitle":"Step-by-Step Guide to Performing Salat","description":"Learn how to perform Salat (Islamic prayer) with detailed step-by-step instructions, images, and important guidelines."},"header":{"nextPrayer":"Dhuhr","prayerTime":"12:30 PM"},"introduction":{"title":"The Importance of Salat","content":"Salat (prayer) is one of the Five Pillars of Islam and is obligatory for all Muslims. It is a direct link between the worshipper and Allah, performed five times a day as a means of spiritual purification and connection with the Creator.","pillars":["First Pillar","Daily Practice","Spiritual Connection"]},"prerequisites":{"title":"Prerequisites for Salat","subtitle":"Essential requirements before beginning your prayer","dos":[{"title":"Perform Wudu (ablution)","description":"Purify yourself with proper washing before prayer"},{"title":"Wear clean clothing","description":"Ensure clothes cover your Awrah properly"},{"title":"Face the Qibla","description":"Direction of Kaaba in Mecca"},{"title":"Pray at prescribed times","description":"Follow the five daily prayer schedules"},{"title":"Sincere intention (Niyyah)","description":"Have pure intention in your heart"}],"donts":[{"title":"Pray without Wudu","description":"Ablution is mandatory for valid prayer"},{"title":"Dirty prayer area","description":"Ensure cleanliness of prayer space"},{"title":"Talk during prayer","description":"Maintain focus and concentration"},{"title":"Unnecessary movement","description":"Minimize distractions and maintain stillness"},{"title":"Rushing through prayers","description":"Perform each movement with mindfulness"}]},"steps":{"title":"Step-by-Step Salat Guide","subtitle":"Learn how to perform prayer correctly with visual guidance","steps":[{"title":"Make Intention (Niyyah)","description":"Begin by making your intention to perform the prayer in your heart. The intention should be for the specific prayer you are about to perform (Fajr, Dhuhr, Asr, Maghrib, or Isha). Focus your mind and heart on worshiping Allah alone.","arabic":"نَوَيْتُ أَنْ أُصَلِّيَ","translation":"I intend to pray","image":"https://images.unsplash.com/photo-1560421683-2b17c0c13d3d?w=500&h=500&fit=crop&crop=center","type":"Intention","rakahs":"All Prayers"},{"title":"Stand Facing Qibla (Takbir)","description":"Stand upright facing the direction of the Kaaba (Qibla). Raise your hands to your ears with palms facing forward and say \'Allahu Akbar\' (God is the Greatest). This marks the beginning of your formal prayer.","arabic":"اللهُ أَكْبَرُ","translation":"Allah is the Greatest","image":"https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop&crop=center","type":"Standing","rakahs":"First Movement"},{"title":"Recite Opening Supplication","description":"Place your right hand over your left on your chest. Recite the opening supplication (Thana), then Surah Al-Fatihah followed by another Surah from the Quran. Maintain focus and reverence throughout the recitation.","arabic":"سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ","translation":"Glory and praise be to You, O Allah","image":"https://images.unsplash.com/photo-1560421683-6857d04b14d9?w=500&h=500&fit=crop&crop=center","type":"Recitation","rakahs":"First Rak\'ah"},{"title":"Bow Down (Ruku)","description":"Bow down with your back straight, placing your hands on your knees. Keep your head in line with your back and say \'Subhana Rabbiyal Adheem\' (Glory to my Lord the Almighty) three times. Feel humility in this position.","arabic":"سُبْحَانَ رَبِّيَ الْعَظِيمِ","translation":"Glory to my Lord, the Almighty","image":"https://images.unsplash.com/photo-1560421683-2b17c0c13d3d?w=500&h=500&fit=crop&crop=center","type":"Bowing","rakahs":"All Rak\'ahs"},{"title":"Stand Up from Bowing","description":"Raise yourself from the bowing position while saying \'Sami Allahu liman hamidah\' (Allah hears those who praise Him). Then say \'Rabbana wa lakal hamd\' (Our Lord, to You is all praise) while standing upright.","arabic":"سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ","translation":"Allah hears the one who praises Him","image":"https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop&crop=center","type":"Standing","rakahs":"All Rak\'ahs"},{"title":"Prostrate (Sujood)","description":"Go down into prostration with your forehead, nose, palms, knees, and toes touching the ground. Keep your elbows raised and say \'Subhana Rabbiyal A\'la\' (Glory to my Lord, the Most High) three times. This is the position of utmost humility.","arabic":"سُبْحَانَ رَبِّيَ الْأَعْلَى","translation":"Glory to my Lord, the Most High","image":"https://images.unsplash.com/photo-1560421683-6857d04b14d9?w=500&h=500&fit=crop&crop=center","type":"Prostration","rakahs":"All Rak\'ahs"},{"title":"Sit Between Prostrations","description":"Sit up from the prostration while saying \'Allahu Akbar\'. Sit briefly in a resting position with your left foot flat and right foot upright. Say \'Rabbi ighfir li\' (My Lord, forgive me) before performing the second prostration.","arabic":"رَبِّ اغْفِرْ لِي","translation":"My Lord, forgive me","image":"https://images.unsplash.com/photo-1560421683-2b17c0c13d3d?w=500&h=500&fit=crop&crop=center","type":"Sitting","rakahs":"Between Prostrations"},{"title":"Second Prostration","description":"Perform the second prostration exactly like the first one, again saying \'Subhana Rabbiyal A\'la\' three times. Maintain the same posture and mindfulness as in the first prostration.","arabic":"سُبْحَانَ رَبِّيَ الْأَعْلَى","translation":"Glory to my Lord, the Most High","image":"https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop&crop=center","type":"Prostration","rakahs":"All Rak\'ahs"},{"title":"Final Tashahhud and Salam","description":"In the final sitting position, recite the Tashahhud (testimony of faith) and send blessings upon the Prophet Muhammad (peace be upon him). End the prayer by turning your head to the right and then to the left, saying \'Assalamu alaikum wa rahmatullah\' (Peace and mercy of Allah be upon you).","arabic":"التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ","translation":"All greetings, prayers and good things are for Allah","image":"https://images.unsplash.com/photo-1560421683-6857d04b14d9?w=500&h=500&fit=crop&crop=center","type":"Conclusion","rakahs":"Final Sitting"}]},"prayerTimes":{"title":"Daily Prayer Times","subtitle":"Timings for the five obligatory prayers","prayers":[{"name":"Fajr","start":"Dawn","end":"Sunrise","rakahs":"2","icon":"fas fa-sun"},{"name":"Dhuhr","start":"After noon","end":"Asr","rakahs":"4","icon":"fas fa-sun"},{"name":"Asr","start":"Late afternoon","end":"Sunset","rakahs":"4","icon":"fas fa-sun"},{"name":"Maghrib","start":"After sunset","end":"Dusk","rakahs":"3","icon":"fas fa-moon"},{"name":"Isha","start":"Dusk","end":"Dawn","rakahs":"4","icon":"fas fa-moon"}]},"resources":{"title":"Additional Resources","subtitle":"Tools to enhance your prayer experience","items":[{"title":"Qibla Direction","description":"Find the accurate direction to face during prayer","icon":"fas fa-compass","buttonText":"Find Qibla"},{"title":"Prayer Times","description":"Get precise prayer schedules for your location","icon":"fas fa-clock","buttonText":"Set Location"},{"title":"Wudu Guide","description":"Learn the proper method of ablution","icon":"fas fa-water","buttonText":"Learn Wudu"}]},"footer":{"copyright":"© 2023 Islamic Prayer Guide","message":"May Allah accept our prayers","quote":"Indeed, prayer has been decreed upon the believers a decree of specified times.","source":"Quran 4:103"}}');

/***/ })

}]);