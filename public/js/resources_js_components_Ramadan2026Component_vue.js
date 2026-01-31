"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Ramadan2026Component_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Ramadan2026Component.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Ramadan2026Component.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_ramadan_2026_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/ramadan_2026.json */ "./resources/components/vue/data/ramadan_2026.json");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Ramadan2026Component",
  data() {
    return {
      ramadan: _data_ramadan_2026_json__WEBPACK_IMPORTED_MODULE_0__,
      heroImageOverride: null,
      heroImageFallback: "/images/banner-photo-800.webp"
    };
  },
  computed: {
    heroImage() {
      return this.heroImageOverride || this.ramadan.header.banner_image || this.heroImageFallback;
    }
  },
  methods: {
    formatISODate(value) {
      if (!value) return "";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        return value;
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    },
    handleHeroImageError() {
      if (this.heroImageOverride !== this.heroImageFallback) {
        this.heroImageOverride = this.heroImageFallback;
      }
    },
    storyStyle(thumbnail) {
      if (!thumbnail) {
        return {
          "--story-bg": "linear-gradient(135deg, rgba(27, 117, 103, 0.2), rgba(209, 160, 70, 0.2))"
        };
      }
      return {
        "--story-bg": `url(${thumbnail})`
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Ramadan2026Component.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Ramadan2026Component.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_Ramadan2026Component_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_Ramadan2026Component_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/vue/Ramadan2026Component.vue */ "./resources/components/vue/Ramadan2026Component.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Ramadan2026Component.vue?vue&type=template&id=05456a07&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Ramadan2026Component.vue?vue&type=template&id=05456a07&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "ramadan-2026"
};
const _hoisted_2 = {
  class: "r-hero",
  id: "top"
};
const _hoisted_3 = {
  class: "container"
};
const _hoisted_4 = {
  class: "r-hero__grid"
};
const _hoisted_5 = {
  class: "r-hero__content"
};
const _hoisted_6 = {
  class: "r-hero__eyebrow r-animate",
  style: {
    "--delay": "0.05s"
  }
};
const _hoisted_7 = {
  class: "r-hero__title r-animate",
  style: {
    "--delay": "0.12s"
  }
};
const _hoisted_8 = {
  class: "r-hero__subtitle r-animate",
  style: {
    "--delay": "0.18s"
  }
};
const _hoisted_9 = {
  class: "r-hero__lead r-animate",
  style: {
    "--delay": "0.24s"
  }
};
const _hoisted_10 = {
  class: "r-hero__stats r-animate",
  style: {
    "--delay": "0.3s"
  }
};
const _hoisted_11 = {
  class: "r-hero__card"
};
const _hoisted_12 = {
  class: "r-hero__label"
};
const _hoisted_13 = {
  class: "r-hero__card"
};
const _hoisted_14 = {
  class: "r-hero__label"
};
const _hoisted_15 = {
  class: "r-hero__sources"
};
const _hoisted_16 = ["href"];
const _hoisted_17 = {
  class: "r-hero__nav r-animate",
  style: {
    "--delay": "0.36s"
  }
};
const _hoisted_18 = ["href"];
const _hoisted_19 = {
  class: "r-hero__media r-animate",
  style: {
    "--delay": "0.22s"
  }
};
const _hoisted_20 = {
  class: "r-hero__frame"
};
const _hoisted_21 = ["src", "alt"];
const _hoisted_22 = {
  class: "r-hero__note"
};
const _hoisted_23 = {
  id: "overview",
  class: "r-section"
};
const _hoisted_24 = {
  class: "container"
};
const _hoisted_25 = {
  class: "r-section__head r-overview__head"
};
const _hoisted_26 = {
  class: "r-section__title"
};
const _hoisted_27 = {
  class: "r-overview__lead"
};
const _hoisted_28 = {
  class: "r-section__subtitle"
};
const _hoisted_29 = {
  class: "r-overview__list"
};
const _hoisted_30 = {
  key: 0,
  class: "r-references"
};
const _hoisted_31 = ["href"];
const _hoisted_32 = ["href"];
const _hoisted_33 = {
  id: "history",
  class: "r-section r-section--alt"
};
const _hoisted_34 = {
  class: "container"
};
const _hoisted_35 = {
  class: "r-section__head"
};
const _hoisted_36 = {
  class: "r-section__title"
};
const _hoisted_37 = {
  class: "r-section__subtitle"
};
const _hoisted_38 = {
  class: "r-grid r-grid--double"
};
const _hoisted_39 = {
  class: "r-card__title"
};
const _hoisted_40 = {
  class: "r-card__desc"
};
const _hoisted_41 = {
  key: 0,
  class: "r-grid r-grid--double r-spacing-top"
};
const _hoisted_42 = {
  key: 0,
  class: "r-card"
};
const _hoisted_43 = {
  class: "r-card__title"
};
const _hoisted_44 = {
  class: "r-list"
};
const _hoisted_45 = {
  key: 1,
  class: "r-card"
};
const _hoisted_46 = {
  class: "r-card__title"
};
const _hoisted_47 = {
  class: "r-list"
};
const _hoisted_48 = {
  key: 1,
  class: "r-references"
};
const _hoisted_49 = ["href"];
const _hoisted_50 = ["href"];
const _hoisted_51 = {
  id: "key-dates",
  class: "r-section"
};
const _hoisted_52 = {
  class: "container"
};
const _hoisted_53 = {
  class: "r-section__head"
};
const _hoisted_54 = {
  class: "r-section__title"
};
const _hoisted_55 = {
  class: "r-section__subtitle"
};
const _hoisted_56 = {
  class: "r-grid r-grid--dates"
};
const _hoisted_57 = {
  class: "r-card__title"
};
const _hoisted_58 = {
  class: "r-card__meta"
};
const _hoisted_59 = {
  class: "r-card__desc"
};
const _hoisted_60 = {
  id: "how-to-fast",
  class: "r-section r-section--alt"
};
const _hoisted_61 = {
  class: "container"
};
const _hoisted_62 = {
  class: "r-section__head"
};
const _hoisted_63 = {
  class: "r-section__title"
};
const _hoisted_64 = {
  class: "r-section__subtitle"
};
const _hoisted_65 = {
  class: "r-grid r-grid--triple"
};
const _hoisted_66 = {
  class: "r-card__title"
};
const _hoisted_67 = {
  class: "r-list"
};
const _hoisted_68 = {
  key: 0,
  class: "r-references"
};
const _hoisted_69 = ["href"];
const _hoisted_70 = ["href"];
const _hoisted_71 = {
  id: "quran-plans",
  class: "r-section r-section--alt"
};
const _hoisted_72 = {
  class: "container"
};
const _hoisted_73 = {
  class: "r-section__head"
};
const _hoisted_74 = {
  class: "r-section__title"
};
const _hoisted_75 = {
  class: "r-section__subtitle"
};
const _hoisted_76 = {
  class: "r-grid r-grid--triple"
};
const _hoisted_77 = {
  class: "r-card__title"
};
const _hoisted_78 = {
  class: "r-card__desc"
};
const _hoisted_79 = {
  class: "r-list"
};
const _hoisted_80 = {
  class: "r-list r-spacing-top"
};
const _hoisted_81 = {
  key: 0,
  class: "r-references"
};
const _hoisted_82 = ["href"];
const _hoisted_83 = ["href"];
const _hoisted_84 = {
  id: "personal-plans",
  class: "r-section"
};
const _hoisted_85 = {
  class: "container"
};
const _hoisted_86 = {
  class: "r-section__head"
};
const _hoisted_87 = {
  class: "r-section__title"
};
const _hoisted_88 = {
  class: "r-section__subtitle"
};
const _hoisted_89 = {
  class: "r-grid r-grid--double"
};
const _hoisted_90 = {
  class: "r-card__title"
};
const _hoisted_91 = {
  class: "r-card__desc"
};
const _hoisted_92 = {
  class: "r-card__desc"
};
const _hoisted_93 = {
  class: "r-card__desc"
};
const _hoisted_94 = {
  class: "r-list-block"
};
const _hoisted_95 = {
  class: "r-list-block"
};
const _hoisted_96 = {
  class: "r-card__desc"
};
const _hoisted_97 = {
  id: "charity",
  class: "r-section r-section--alt"
};
const _hoisted_98 = {
  class: "container"
};
const _hoisted_99 = {
  class: "r-section__head"
};
const _hoisted_100 = {
  class: "r-section__title"
};
const _hoisted_101 = {
  class: "r-section__subtitle"
};
const _hoisted_102 = {
  class: "r-grid r-grid--double"
};
const _hoisted_103 = {
  class: "r-card"
};
const _hoisted_104 = {
  class: "r-charity-body"
};
const _hoisted_105 = {
  class: "r-card__title"
};
const _hoisted_106 = {
  class: "r-list"
};
const _hoisted_107 = {
  class: "r-card"
};
const _hoisted_108 = {
  class: "r-card__title"
};
const _hoisted_109 = {
  class: "r-list"
};
const _hoisted_110 = {
  class: "r-card__title r-card__title--small"
};
const _hoisted_111 = {
  class: "r-list"
};
const _hoisted_112 = {
  key: 0,
  class: "r-references"
};
const _hoisted_113 = ["href"];
const _hoisted_114 = ["href"];
const _hoisted_115 = {
  id: "health",
  class: "r-section"
};
const _hoisted_116 = {
  class: "container"
};
const _hoisted_117 = {
  class: "r-section__head"
};
const _hoisted_118 = {
  class: "r-section__title"
};
const _hoisted_119 = {
  class: "r-section__subtitle"
};
const _hoisted_120 = {
  class: "r-grid r-grid--triple"
};
const _hoisted_121 = {
  class: "r-card__title"
};
const _hoisted_122 = {
  class: "r-list"
};
const _hoisted_123 = {
  class: "r-grid r-grid--double r-spacing-top"
};
const _hoisted_124 = {
  class: "r-card__title"
};
const _hoisted_125 = {
  class: "r-list"
};
const _hoisted_126 = {
  class: "r-micro-tips"
};
const _hoisted_127 = {
  id: "duas",
  class: "r-section r-section--alt"
};
const _hoisted_128 = {
  class: "container"
};
const _hoisted_129 = {
  class: "r-section__head"
};
const _hoisted_130 = {
  class: "r-section__title"
};
const _hoisted_131 = {
  class: "r-section__subtitle"
};
const _hoisted_132 = {
  class: "r-story-grid"
};
const _hoisted_133 = {
  class: "r-story-content"
};
const _hoisted_134 = {
  class: "r-story-tag"
};
const _hoisted_135 = {
  class: "r-story-title"
};
const _hoisted_136 = {
  class: "r-arabic",
  dir: "rtl"
};
const _hoisted_137 = {
  class: "r-translit"
};
const _hoisted_138 = {
  class: "r-story-desc"
};
const _hoisted_139 = ["href"];
const _hoisted_140 = {
  class: "r-link r-link--button",
  type: "button",
  "data-bs-toggle": "modal",
  "data-bs-target": "#moreDuasModal"
};
const _hoisted_141 = {
  id: "shorts",
  class: "r-section"
};
const _hoisted_142 = {
  class: "container"
};
const _hoisted_143 = {
  class: "r-section__head"
};
const _hoisted_144 = {
  class: "r-section__title"
};
const _hoisted_145 = {
  class: "r-section__subtitle"
};
const _hoisted_146 = {
  class: "r-short-block"
};
const _hoisted_147 = {
  class: "r-section__subtitle"
};
const _hoisted_148 = {
  class: "r-story-grid"
};
const _hoisted_149 = {
  class: "r-story-content"
};
const _hoisted_150 = {
  class: "r-story-tag"
};
const _hoisted_151 = {
  class: "r-story-title"
};
const _hoisted_152 = {
  class: "r-story-desc"
};
const _hoisted_153 = {
  class: "r-story-duration"
};
const _hoisted_154 = ["href"];
const _hoisted_155 = {
  class: "r-short-block"
};
const _hoisted_156 = {
  class: "r-section__subtitle"
};
const _hoisted_157 = {
  class: "r-short-groups"
};
const _hoisted_158 = {
  class: "r-short-group__title"
};
const _hoisted_159 = {
  class: "r-story-grid"
};
const _hoisted_160 = {
  class: "r-story-content"
};
const _hoisted_161 = {
  class: "r-story-tag"
};
const _hoisted_162 = {
  class: "r-story-title"
};
const _hoisted_163 = {
  class: "r-story-desc"
};
const _hoisted_164 = {
  class: "r-story-duration"
};
const _hoisted_165 = ["href"];
const _hoisted_166 = {
  id: "tools",
  class: "r-section r-section--alt"
};
const _hoisted_167 = {
  class: "container"
};
const _hoisted_168 = {
  class: "r-section__head"
};
const _hoisted_169 = {
  class: "r-section__title"
};
const _hoisted_170 = {
  class: "r-section__subtitle"
};
const _hoisted_171 = {
  class: "r-grid r-grid--triple"
};
const _hoisted_172 = ["href", "aria-label", "title"];
const _hoisted_173 = {
  class: "r-card__title"
};
const _hoisted_174 = {
  class: "r-card__desc"
};
const _hoisted_175 = ["href"];
const _hoisted_176 = {
  id: "platforms",
  class: "r-section"
};
const _hoisted_177 = {
  class: "container"
};
const _hoisted_178 = {
  class: "r-section__head"
};
const _hoisted_179 = {
  class: "r-section__title"
};
const _hoisted_180 = {
  class: "r-section__subtitle"
};
const _hoisted_181 = {
  class: "r-grid r-grid--triple"
};
const _hoisted_182 = {
  class: "r-card__title"
};
const _hoisted_183 = {
  class: "r-list"
};
const _hoisted_184 = ["href"];
const _hoisted_185 = {
  class: "modal fade",
  id: "moreDuasModal",
  tabindex: "-1",
  "aria-labelledby": "moreDuasModalLabel",
  "aria-hidden": "true"
};
const _hoisted_186 = {
  class: "modal-dialog modal-xl modal-dialog-centered"
};
const _hoisted_187 = {
  class: "modal-content"
};
const _hoisted_188 = {
  class: "modal-header"
};
const _hoisted_189 = {
  class: "modal-title",
  id: "moreDuasModalLabel"
};
const _hoisted_190 = {
  class: "modal-body"
};
const _hoisted_191 = {
  class: "r-modal-grid"
};
const _hoisted_192 = {
  class: "r-story-grid r-story-grid--modal"
};
const _hoisted_193 = {
  class: "r-story-content"
};
const _hoisted_194 = {
  class: "r-story-tag"
};
const _hoisted_195 = {
  class: "r-story-title"
};
const _hoisted_196 = {
  class: "r-arabic",
  dir: "rtl"
};
const _hoisted_197 = {
  class: "r-translit"
};
const _hoisted_198 = {
  class: "r-story-desc"
};
const _hoisted_199 = {
  class: "r-story-meta"
};
const _hoisted_200 = ["href"];
const _hoisted_201 = ["href"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_2, [_cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "r-hero__backdrop"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.page_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.header.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.header.subtitle), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.meta_description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.header.stats.last_updated_label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatISODate($data.ramadan.last_updated)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.header.stats.data_sources_label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.data_sources, source => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
      key: source.label,
      class: "r-hero__source",
      href: source.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(source.label), 9 /* TEXT, PROPS */, _hoisted_16);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", _hoisted_17, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.nav_links, link => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
      key: link.href,
      class: "r-hero__pill",
      href: link.href
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(link.label), 9 /* TEXT, PROPS */, _hoisted_18);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [$options.heroImage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("img", {
    key: 0,
    src: $options.heroImage,
    alt: $data.ramadan.header.alt_text,
    class: "r-hero__image",
    loading: "lazy",
    onError: _cache[0] || (_cache[0] = (...args) => $options.handleHeroImageError && $options.handleHeroImageError(...args))
  }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_21)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "r-hero__glow"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.important_dates.note), 1 /* TEXT */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.overview.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.overview.subtitle), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.overview.body, (para, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
      key: index,
      class: "r-overview__body"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(para), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.overview.key_points_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_29, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.overview.key_points, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))]), $data.ramadan.overview.references ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.references), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.overview.references, ref => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: ref.citation
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-reference-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.source) + " — " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.citation), 9 /* TEXT, PROPS */, _hoisted_31), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.view_source), 9 /* TEXT, PROPS */, _hoisted_32)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.history.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.history.subtitle), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.history.body, (para, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
      key: index,
      class: "r-section__subtitle"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(para), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.history.timeline, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: item.period,
      class: "r-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.period), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_40, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.detail), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))]), $data.ramadan.history.notable_figures || $data.ramadan.history.regional_practices ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_41, [$data.ramadan.history.notable_figures ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_43, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.history.notable_figures.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_44, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.history.notable_figures.items, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item.name
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name) + ":", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.note), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.ramadan.history.regional_practices ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_46, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.history.regional_practices.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_47, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.history.regional_practices.items, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item.region
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.region) + ":", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.detail), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.ramadan.history.references ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.references), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.history.references, ref => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: ref.citation
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-reference-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.source) + " — " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.citation), 9 /* TEXT, PROPS */, _hoisted_49), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.view_source), 9 /* TEXT, PROPS */, _hoisted_50)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_54, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.important_dates.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_55, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.important_dates.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.important_dates.dates, date => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: date.event,
      class: "r-card r-card--date"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["r-card__tag", `r-card__tag--${date.type}`])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(date.event), 3 /* TEXT, CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_57, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(date.gregorian_date), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_58, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(date.hijri_date), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_59, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(date.description), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_60, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_63, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.how_to_fast.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_64, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.how_to_fast.intro), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_65, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.how_to_fast.cards, card => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: card.title,
      class: "r-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_66, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_67, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(card.items, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: item
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))]), $data.ramadan.how_to_fast.references ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_68, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.references), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.how_to_fast.references, ref => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: ref.citation
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-reference-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.source) + " — " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.citation), 9 /* TEXT, PROPS */, _hoisted_69), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.view_source), 9 /* TEXT, PROPS */, _hoisted_70)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_71, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_74, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.quran_reading_plans.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_75, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.quran_reading_plans.intro), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.quran_reading_plans.plans, plan => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: plan.level,
      class: "r-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_77, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.level), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_78, "Daily target: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.daily_target), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_79, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Time needed: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.time_needed), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Structure: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.structure), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Goal: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.goal), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Split: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.split), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_80, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(plan.tips, tip => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: tip
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))]), $data.ramadan.quran_reading_plans.references ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_81, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.references), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.quran_reading_plans.references, ref => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: ref.citation
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-reference-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.source) + " — " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.citation), 9 /* TEXT, PROPS */, _hoisted_82), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.view_source), 9 /* TEXT, PROPS */, _hoisted_83)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_84, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_85, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_86, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_87, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.personal_plans.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_88, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.personal_plans.intro), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_89, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.personal_plans.plans, plan => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: plan.title,
      class: "r-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_90, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_91, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.who_for), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_92, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.overview), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_93, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.focus), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_94, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.personal_plans.daily_flow_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(plan.daily_flow, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: item
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_95, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.personal_plans.weekly_focus_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(plan.weekly_focus, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: item
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_96, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.accountability), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_97, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_98, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_99, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_100, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.charity_guide.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_101, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.charity_guide.intro), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_102, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_103, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_104, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.charity_guide.overview, (para, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
      key: index,
      class: "r-card__desc"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(para), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_105, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.charity_guide.zakat_al_fitr.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_106, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.charity_guide.zakat_al_fitr.points, point => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: point
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(point), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_107, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_108, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.charity_guide.sadaqah_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_109, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.charity_guide.sadaqah_ideas, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_110, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.charity_guide.giving_checklist_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_111, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.charity_guide.giving_checklist, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.charity_guide.impact_notes, note => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "r-note",
      key: note
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(note), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])]), $data.ramadan.charity_guide.references ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_112, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.references), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.charity_guide.references, ref => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: ref.citation
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-reference-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.source) + " — " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.citation), 9 /* TEXT, PROPS */, _hoisted_113), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.view_source), 9 /* TEXT, PROPS */, _hoisted_114)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_115, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_116, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_117, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_118, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.health_food_tips.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_119, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.health_food_tips.intro), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_120, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.health_food_tips.primary_sections, section => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: section.title,
      class: "r-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_121, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_122, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(section.items, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: item
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_123, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.health_food_tips.secondary_sections, section => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: section.title,
      class: "r-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_124, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_125, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(section.items, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: item
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_126, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.health_food_tips.micro_tips, tip => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
      key: tip,
      class: "r-chip"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_127, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_128, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_129, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_130, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.duas_prayers.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_131, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.duas_prayers.intro), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_132, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.duas_prayers.daily_duas, dua => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: dua.occasion,
      class: "r-story-card r-story-card--dua",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.storyStyle())
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_133, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_134, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.duas_prayers.tag_label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_135, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.occasion), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_136, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.arabic), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_137, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.transliteration), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_138, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.translation), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-story-duration",
      href: dua.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.reference), 9 /* TEXT, PROPS */, _hoisted_139)])], 4 /* STYLE */);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", _hoisted_140, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.duas_prayers.view_more_label), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_141, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_142, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_143, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_144, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.shorts.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_145, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.shorts.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_146, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_147, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.shorts.highlights_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_148, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.shorts.highlights, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: item.link,
      class: "r-story-card",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.storyStyle(item.thumbnail))
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_149, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_150, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.tag), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_151, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_152, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_153, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.duration_prefix) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.duration), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-story-link",
      href: item.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.watch_short), 9 /* TEXT, PROPS */, _hoisted_154)])], 4 /* STYLE */);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_155, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_156, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.explore_by_theme), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_157, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.shorts.groups, group => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: group.title,
      class: "r-short-group"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_158, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(group.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_159, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(group.items, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
        key: item.link,
        class: "r-story-card",
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.storyStyle(item.thumbnail))
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_160, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_161, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.tag), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_162, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_163, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_164, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.duration_prefix) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.duration), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
        class: "r-story-link",
        href: item.link,
        target: "_blank",
        rel: "noopener"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.watch_short), 9 /* TEXT, PROPS */, _hoisted_165)])], 4 /* STYLE */);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_166, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_167, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_168, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_169, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.tools_calculators.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_170, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.tools_calculators.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_171, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.tools_calculators.tools, tool => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: tool.title,
      class: "r-card r-card--tool"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-expand",
      href: tool.link,
      target: "_blank",
      rel: "noopener",
      "aria-label": $data.ramadan.labels.open_tool_aria,
      title: $data.ramadan.labels.open_tool_title
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['fas', tool.icon]),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_172), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_173, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tool.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_174, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tool.description), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: tool.link,
      class: "r-link",
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.open_tool), 9 /* TEXT, PROPS */, _hoisted_175)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_176, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_177, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_178, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_179, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.platform_resources.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_180, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.platform_resources.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_181, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.platform_resources.cards, card => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: card.title,
      class: "r-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_182, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_183, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(card.items, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: item.label
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
        class: "r-resource-link",
        href: item.link,
        target: "_blank",
        rel: "noopener"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.label), 9 /* TEXT, PROPS */, _hoisted_184)]);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_185, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_186, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_187, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_188, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_189, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.duas_prayers.modal_title), 1 /* TEXT */), _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_190, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_191, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.duas_prayers.modal_sections, section => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: section.title,
      class: "r-modal-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_192, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(section.items, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
        key: item.name,
        class: "r-story-card r-story-card--dua"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_193, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_194, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.duas_prayers.tag_label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_195, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_196, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.arabic), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_197, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.transliteration), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_198, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.translation), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_199, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
        class: "r-story-duration",
        href: item.resource,
        target: "_blank",
        rel: "noopener"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.reference), 9 /* TEXT, PROPS */, _hoisted_200), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
        class: "r-story-link",
        href: item.resource,
        target: "_blank",
        rel: "noopener"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.resource_label), 9 /* TEXT, PROPS */, _hoisted_201)])])]);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))])])])])])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Ramadan2026Component.vue?vue&type=style&index=0&id=05456a07&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Ramadan2026Component.vue?vue&type=style&index=0&id=05456a07&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/Ramadan2026Component.vue":
/*!***********************************************************!*\
  !*** ./resources/components/vue/Ramadan2026Component.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Ramadan2026Component_vue_vue_type_template_id_05456a07_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ramadan2026Component.vue?vue&type=template&id=05456a07&scoped=true */ "./resources/components/vue/Ramadan2026Component.vue?vue&type=template&id=05456a07&scoped=true");
/* harmony import */ var _Ramadan2026Component_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ramadan2026Component.vue?vue&type=script&lang=js */ "./resources/components/vue/Ramadan2026Component.vue?vue&type=script&lang=js");
/* harmony import */ var _Ramadan2026Component_vue_vue_type_style_index_0_id_05456a07_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ramadan2026Component.vue?vue&type=style&index=0&id=05456a07&scoped=true&lang=css */ "./resources/components/vue/Ramadan2026Component.vue?vue&type=style&index=0&id=05456a07&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_Ramadan2026Component_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Ramadan2026Component_vue_vue_type_template_id_05456a07_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-05456a07"],['__file',"resources/components/vue/Ramadan2026Component.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/Ramadan2026Component.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/components/vue/Ramadan2026Component.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Ramadan2026Component_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Ramadan2026Component_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Ramadan2026Component.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Ramadan2026Component.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/Ramadan2026Component.vue?vue&type=style&index=0&id=05456a07&scoped=true&lang=css":
/*!*******************************************************************************************************************!*\
  !*** ./resources/components/vue/Ramadan2026Component.vue?vue&type=style&index=0&id=05456a07&scoped=true&lang=css ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Ramadan2026Component_vue_vue_type_style_index_0_id_05456a07_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Ramadan2026Component.vue?vue&type=style&index=0&id=05456a07&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Ramadan2026Component.vue?vue&type=style&index=0&id=05456a07&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/Ramadan2026Component.vue?vue&type=template&id=05456a07&scoped=true":
/*!*****************************************************************************************************!*\
  !*** ./resources/components/vue/Ramadan2026Component.vue?vue&type=template&id=05456a07&scoped=true ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Ramadan2026Component_vue_vue_type_template_id_05456a07_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Ramadan2026Component_vue_vue_type_template_id_05456a07_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Ramadan2026Component.vue?vue&type=template&id=05456a07&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Ramadan2026Component.vue?vue&type=template&id=05456a07&scoped=true");


/***/ }),

/***/ "./resources/components/vue/data/ramadan_2026.json":
/*!*********************************************************!*\
  !*** ./resources/components/vue/data/ramadan_2026.json ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"page_title":"Ramadan 2026 | Complete Guide & Resources","meta_description":"Complete guide for Ramadan 1447 AH (2026 CE): key dates, how to fast, prayers made easy, Quran plans, charity guidance, health tips, duas, tools, and verified resources.","last_updated":"2025-03-01","data_sources":[{"label":"Umm al-Qura Calendar (Saudi Arabia)","link":"https://www.ummulqura.org.sa/"},{"label":"Islamic Society of North America (ISNA)","link":"https://www.isna.net/"},{"label":"Muslim World League","link":"https://www.themwl.org/"}],"labels":{"references":"References","open_video":"Open video","open_tool":"Open tool","open_tool_title":"Open tool","open_tool_aria":"Open tool in a new tab","download":"Download","watch_short":"Watch short","highlights":"Highlights","explore_by_theme":"Explore by theme","view_source":"View","duration_prefix":"Duration","resource_label":"Resource"},"header":{"title":"Ramadan 2026 (1447 AH)","subtitle":"The Month of Quran, Fasting, and Spiritual Renewal","banner_image":"/images/ramadan-hero-pexels.jpg","alt_text":"Grand mosque exterior under a twilight sky","stats":{"last_updated_label":"Last updated","data_sources_label":"Data sources"}},"nav_links":[{"label":"What is Ramadan","href":"#overview"},{"label":"History","href":"#history"},{"label":"Key dates","href":"#key-dates"},{"label":"How to fast","href":"#how-to-fast"},{"label":"Quran plans","href":"#quran-plans"},{"label":"Personal plans","href":"#personal-plans"},{"label":"Charity","href":"#charity"},{"label":"Health tips","href":"#health"},{"label":"Duas","href":"#duas"},{"label":"Short clips","href":"#shorts"},{"label":"Tools","href":"#tools"}],"overview":{"section_title":"What Is Ramadan?","subtitle":"Ramadan is the ninth month of the Islamic lunar calendar. It is a month of fasting from dawn to sunset, focused worship, Quran recitation, community care, and spiritual renewal.","body":["The Quran describes Ramadan as the month in which the Quran was revealed as guidance for humanity. Muslims fast to develop taqwa (God-consciousness), discipline their desires, and increase empathy for those in need.","Beyond fasting, Ramadan is a time to elevate worship through prayer, charity, and reflection. Families gather, communities host iftars, and masajid become centers of learning and service.","Every day in Ramadan is an invitation to reset habits, strengthen spiritual focus, and renew intentions with sincerity."],"key_points_title":"Key ideas to remember","key_points":["Fasting is an act of worship and self-discipline.","Ramadan is the month in which the Quran was revealed.","The last ten nights are especially blessed, including Laylat al-Qadr.","Charity and community care are central to the month.","Every day is an opportunity to improve character and habits."],"references":[{"source":"Qur\'an","citation":"Al-Baqarah 2:183-185","link":"https://quran.com/2/183"},{"source":"Qur\'an","citation":"Al-Qadr 97:1-5","link":"https://quran.com/97"}]},"history":{"section_title":"History & Significance","subtitle":"Ramadan is linked to the Quranic revelation and the obligation of fasting. Its devotional rhythm has shaped Muslim worship, ethics, and communal life for centuries.","body":["The Quran frames fasting in Ramadan as a prescribed act for believers and ties the month to revelation and guidance.","Prophetic practice established suhoor, iftar at sunset, and intensified night worship, while the last ten nights emphasize Laylat al-Qadr and spiritual retreat (i\'tikaf).","Across centuries, Ramadan shaped daily routines, public worship, and charitable life, anchored by mosques, learning circles, and family gatherings.","Modern Ramadan carries these traditions worldwide through organized charity, community programming, and digital learning."],"timeline":[{"period":"c. 610 CE (13 BH)","detail":"First Quranic revelation occurs in Ramadan, traditionally associated with Laylat al-Qadr."},{"period":"624 CE (2 AH)","detail":"Fasting in Ramadan is prescribed for believers (Qur\'an 2:183-185)."},{"period":"632-661 CE (Rashidun era)","detail":"Ramadan practices consolidate within the early Muslim community, emphasizing communal prayer and charity."},{"period":"7th-8th centuries CE","detail":"Ramadan observance spreads across expanding Muslim communities in the Middle East, North Africa, and Asia."},{"period":"9th-12th centuries CE","detail":"Legal and devotional scholarship elaborates fasting practice, moon sighting, and community observance."},{"period":"13th-15th centuries CE","detail":"Regional traditions develop in Andalusia, the Maghreb, Egypt, and the Levant alongside urban mosque life."},{"period":"15th-19th centuries CE","detail":"Ottoman, Safavid, and Mughal societies expand public iftars, endowments, and Quran education."},{"period":"20th-21st centuries CE","detail":"Global Ramadan programming, large-scale iftars, and coordinated charity expand community impact."},{"period":"Today","detail":"Ramadan continues to unite communities worldwide through worship, service, and family ties."}],"notable_figures":{"title":"Scholars & Voices","items":[{"name":"Ibn Abbas (d. 687 CE)","note":"Early Qur\'anic exegete whose explanations shaped how Muslims understand verses about fasting."},{"name":"Imam Malik (d. 795 CE)","note":"Documented Madinan practice, including Ramadan customs and community observance."},{"name":"Imam al-Shafi\'i (d. 820 CE)","note":"Systematized legal principles that influenced fasting rulings across regions."},{"name":"Imam al-Nawawi (d. 1277 CE)","note":"Compiled hadith and devotional guidance that shaped Ramadan practice."}]},"regional_practices":{"title":"Regional Traditions","items":[{"region":"Egypt (Cairo)","detail":"Lantern processions and communal iftars became distinctive Ramadan features."},{"region":"Ottoman cities (Istanbul)","detail":"Public iftar tents and endowments supported travelers and the poor."},{"region":"West Africa (Sahel)","detail":"Quran recitation circles and night study gatherings remain a hallmark."},{"region":"South & Southeast Asia","detail":"Large taraweeh congregations and neighborhood iftars reinforce community bonds."},{"region":"Diaspora communities","detail":"Mosques and Islamic centers host open iftars and service drives to build cohesion."}]},"references":[{"source":"Qur\'an","citation":"Al-Baqarah 2:183-187","link":"https://quran.com/2/183"},{"source":"Qur\'an","citation":"Al-Baqarah 2:185","link":"https://quran.com/2/185"},{"source":"Qur\'an","citation":"Al-Qadr 97:1-5","link":"https://quran.com/97"},{"source":"Qur\'an","citation":"Al-Baqarah 2:187","link":"https://quran.com/2/187"}]},"important_dates":{"section_title":"Ramadan 2026 Key Dates","subtitle":"Plan ahead with the most likely timeline for Ramadan 1447 AH.","note":"Dates are approximate and subject to moon sighting. Local moon sighting announcements take precedence.","dates":[{"event":"First Taraweeh Night","gregorian_date":"February 16, 2026 (after Maghrib)","hijri_date":"30 Sha\'ban 1447 AH","description":"First Taraweeh prayer is usually held the night before the first fast.","type":"start"},{"event":"First Day of Ramadan","gregorian_date":"February 17, 2026","hijri_date":"1 Ramadan 1447 AH","description":"Expected first day of fasting based on astronomical calculations.","type":"start"},{"event":"Mid-Ramadan Check-In","gregorian_date":"Approx. March 3, 2026","hijri_date":"15 Ramadan 1447 AH","description":"A good moment to renew goals and review Quran progress.","type":"special"},{"event":"Last 10 Nights Begin","gregorian_date":"Approx. March 8, 2026 (night)","hijri_date":"20 Ramadan 1447 AH","description":"Focus intensifies for night worship, duas, and seeking Laylat al-Qadr.","type":"special"},{"event":"Laylat al-Qadr (Night of Decree)","gregorian_date":"Approx. March 15-16, 2026","hijri_date":"27 Ramadan 1447 AH","description":"The most blessed night - better than 1000 months. Seek it in the last 10 odd nights.","type":"special"},{"event":"Zakat al-Fitr Deadline","gregorian_date":"Before Eid prayer (March 19, 2026)","hijri_date":"End of Ramadan","description":"Zakat al-Fitr should be paid before Eid prayer to reach those in need.","type":"special"},{"event":"Eid al-Fitr","gregorian_date":"March 19, 2026","hijri_date":"1 Shawwal 1447 AH","description":"Festival of Breaking the Fast. Subject to moon sighting.","type":"eid"}]},"how_to_fast":{"section_title":"How To Fast (Do\'s & Don\'ts)","intro":"Fasting is from dawn to sunset with the intention (niyyah). The goal is worship, discipline, and avoiding what breaks the fast.","cards":[{"title":"Do\'s","items":["Make intention before Fajr.","Eat a balanced Suhoor and hydrate well.","Pray on time and read Quran daily.","Break fast promptly at sunset with dates and water if possible.","Be mindful of behavior, speech, and time.","Make dua before Iftar - it is a special time for acceptance."]},{"title":"Don\'ts","items":["Do not eat or drink between Fajr and Maghrib.","Avoid backbiting, arguments, and harmful speech.","Avoid overeating at Iftar.","Do not neglect prayers or Quran.","Avoid wasting time in unhelpful activities."]},{"title":"Exemptions","items":["Children before puberty","The ill","Travelers","Pregnant or nursing women","Menstruating women"]}],"references":[{"source":"Qur\'an","citation":"Al-Baqarah 2:183-187","link":"https://quran.com/2/183"}]},"quran_reading_plans":{"section_title":"Quran Reading Plans (3 Levels)","intro":"Choose a plan that fits your schedule and energy. Consistency matters most.","plans":[{"level":"Beginner","daily_target":"4-6 pages","time_needed":"15-25 minutes","structure":"After Fajr + before sleep","goal":"Finish a meaningful portion and build a daily habit.","split":"2 short sessions","tips":["Read after Fajr when focus is strongest.","Listen to audio while commuting or walking.","Track progress on a simple checklist."]},{"level":"Intermediate","daily_target":"1 Juz","time_needed":"45-60 minutes","structure":"Split across 5 prayers","goal":"Complete the Quran once by Eid.","split":"5 short segments","tips":["Read 4-5 pages after each prayer.","Use the evening to catch up if needed.","Pair reading with reflection notes."]},{"level":"Advanced","daily_target":"1.5-2 Juz","time_needed":"90-120 minutes","structure":"Morning + afternoon + night","goal":"Complete the Quran more than once.","split":"3 focused sessions","tips":["Commit to a longer morning session.","Use Taraweeh recitation as part of the goal.","Review a translation alongside recitation."]}],"references":[{"source":"Qur\'an","citation":"Al-Baqarah 2:185","link":"https://quran.com/2/185"}]},"personal_plans":{"section_title":"Personal Plans (Long-Form)","intro":"Choose a plan that matches your lifestyle and sustain it for 30 days.","daily_flow_title":"Daily flow","weekly_focus_title":"Weekly focus","plans":[{"title":"Quiet Renewal Plan","who_for":"Students and solo worshippers","overview":"A slower, reflective pace focused on Quran, journaling, and community check-ins.","focus":"Spiritual depth and daily consistency.","daily_flow":["Fajr + 10 minutes reflection","Midday: 6 pages Quran","Asr: 5-minute dhikr","After Isha: Taraweeh + short dua"],"weekly_focus":["Week 1: Intention and habit building","Week 2: Deepening Quran connection","Week 3: Night worship focus","Week 4: Gratitude and giving"],"accountability":"Weekly check-in with a friend or mentor."},{"title":"Family Connection Plan","who_for":"Parents and households","overview":"Shared worship with kids, simple lessons, and family goals.","focus":"Family unity and shared learning.","daily_flow":["Suhoor: one short Quran reflection","Maghrib: gratitude circle","After Taraweeh: 15-minute story or Quran"],"weekly_focus":["Week 1: Set family goals","Week 2: Add a family charity project","Week 3: Quran memorization night","Week 4: Eid preparation + reflection"],"accountability":"Family chart tracking prayers and reading."},{"title":"Working Professional Plan","who_for":"Busy schedules","overview":"Short, consistent blocks that fit around work and commuting.","focus":"Micro-habits and consistency.","daily_flow":["Morning commute: Quran audio","Lunch break: 2 pages reading","Evening: 10-minute dhikr + dua","Weekend: longer reflection session"],"weekly_focus":["Week 1: Align calendar","Week 2: Increase charity","Week 3: Add night prayer twice","Week 4: Finish Quran goal"],"accountability":"Set reminders and a weekly target review."},{"title":"Community Service Plan","who_for":"Volunteers and organizers","overview":"Balance worship with consistent service and community care.","focus":"Service and leadership.","daily_flow":["Post-Dhuhr: 20 minutes planning","Evening: serve at iftar or food bank","Night: Taraweeh and dua"],"weekly_focus":["Week 1: Identify a need","Week 2: Build a small volunteer team","Week 3: Host a community iftar","Week 4: Wrap-up and gratitude"],"accountability":"Weekly debrief with the team."},{"title":"Beginner Step-Up Plan","who_for":"New to consistent Ramadan routines","overview":"A gentle ramp-up plan that builds confidence with short, repeatable habits.","focus":"Consistency over intensity.","daily_flow":["Fajr: 5 minutes of Quran + simple dua","Dhuhr: 2 pages of Quran","Maghrib: gratitude note + family check-in","Isha: short Taraweeh or 2 rakaat at home"],"weekly_focus":["Week 1: Set a realistic daily target","Week 2: Add a short reflection journal","Week 3: Increase Quran time by 5 minutes","Week 4: Maintain routine and prepare for Eid"],"accountability":"Track progress daily and celebrate small wins."},{"title":"Night Worship Plan","who_for":"Those focusing on the last 10 nights","overview":"Structured routine to maximize Qiyam, dua, and Quran in the evenings.","focus":"Deep night worship and focused dua.","daily_flow":["After Maghrib: light meal + rest","After Isha: Taraweeh with focus","Late night: 20 minutes Quran + dua","Before Suhoor: 2-4 rakaat Qiyam"],"weekly_focus":["Week 1: Prepare sleep schedule","Week 2: Add a dua list for family","Week 3: Increase Qiyam duration","Week 4: Focus on Laylat al-Qadr"],"accountability":"Set a nightly alarm and keep a short dua checklist."}]},"charity_guide":{"section_title":"Charity Guide (Zakat al-Fitr Made Simple)","intro":"Charity is central in Ramadan. Zakat al-Fitr is obligatory before Eid prayer, while ongoing sadaqah builds compassion.","sadaqah_title":"Sadaqah ideas","giving_checklist_title":"Giving checklist","overview":["Zakat al-Fitr purifies the fasting person from minor shortcomings and ensures everyone can celebrate Eid with dignity.","Sadaqah is voluntary charity given throughout the month. Even small, consistent giving can have a large impact."],"zakat_al_fitr":{"title":"Zakat al-Fitr basics","points":["A required charity per person in the household, given before Eid prayer.","Paid before Eid prayer, preferably during Ramadan.","Every eligible Muslim who can afford it pays for themselves and dependents.","Equivalent to a staple food amount (varies by region).","Give through a local masjid or trusted charity organization."]},"sadaqah_ideas":["Sponsor iftar meals","Support local food banks","Contribute to masjid programs","Help neighbors and community initiatives","Share educational resources","Volunteer time and skills"],"giving_checklist":["Set a realistic daily or weekly amount.","Choose 1-2 trusted organizations.","Include a family charity goal if possible.","Give before Eid for Zakat al-Fitr."],"impact_notes":["Small, consistent charity builds long-term benefit.","Prioritize local needs alongside global relief."],"references":[{"source":"Qur\'an","citation":"Al-Baqarah 2:177","link":"https://quran.com/2/177"}]},"health_food_tips":{"section_title":"Health & Food Tips","intro":"Keep energy stable and hydration steady. Aim for balance, not perfection.","primary_sections":[{"title":"Suhoor ideas","items":["Oatmeal with nuts and dates","Eggs with whole-grain toast","Greek yogurt + berries","Chia pudding with milk","Water + herbal tea"]},{"title":"Iftar ideas","items":["Dates + water + light soup","Grilled protein + salad","Lentil soup + brown rice","Baked salmon + vegetables","Fresh fruit plate"]},{"title":"Wellness focus","items":["Avoid salty foods to reduce thirst","Prioritize complex carbs for longer energy","Short walks after Iftar","Limit heavy fried meals","Ease into caffeine to avoid dehydration"]}],"secondary_sections":[{"title":"Hydration plan","items":["Drink 8-10 glasses between iftar and suhoor","2 glasses at iftar","4 glasses between iftar and sleep","2-4 glasses at suhoor"]},{"title":"Sleep & movement","items":["Take a 20-30 minute power nap if needed","Sleep soon after Taraweeh","Dim screens 30 minutes before bed","Keep a consistent bedtime if possible","Light exercise 1-2 hours after iftar","Walking for 30 minutes","Light stretching","Avoid intense workouts during fasting hours"]}],"micro_tips":["Add fruit and vegetables to every meal.","Keep a water bottle nearby at night.","Reduce sugar spikes by breaking fast slowly."]},"duas_prayers":{"section_title":"Essential Quran Duas","intro":"Every dua below is from the Quran. Use these throughout Ramadan.","tag_label":"Quran","daily_duas":[{"occasion":"Good in this life and the next","arabic":"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً","transliteration":"Rabbana atina fid-dunya hasanah","translation":"Our Lord, give us good in this world","reference":"Qur\'an 2:201","link":"https://quran.com/2/201","tag":"Quran"},{"occasion":"Steadfast hearts","arabic":"رَبَّنَا لَا تُزِغْ قُلُوبَنَا","transliteration":"Rabbana la tuzigh qulubana","translation":"Our Lord, do not let our hearts deviate","reference":"Qur\'an 3:8","link":"https://quran.com/3/8","tag":"Quran"},{"occasion":"Family and righteousness","arabic":"رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا","transliteration":"Rabbana hab lana min azwajina","translation":"Our Lord, grant us from among our spouses","reference":"Qur\'an 25:74","link":"https://quran.com/25/74","tag":"Quran"}],"view_more_label":"View more Quran duas","modal_title":"Quran Dua Library","modal_sections":[{"title":"Worship & Prayer","items":[{"name":"Ease in prayer","arabic":"رَبِّ اشْرَحْ لِي صَدْرِي","transliteration":"Rabbi ishrah li sadri","translation":"My Lord, expand for me my chest","reference":"Qur\'an 20:25","resource":"https://quran.com/20/25"},{"name":"Accept deeds","arabic":"رَبَّنَا تَقَبَّلْ مِنَّا","transliteration":"Rabbana taqabbal minna","translation":"Our Lord, accept from us","reference":"Qur\'an 2:127","resource":"https://quran.com/2/127"},{"name":"Increase knowledge","arabic":"رَبِّ زِدْنِي عِلْمًا","transliteration":"Rabbi zidni \'ilma","translation":"My Lord, increase me in knowledge","reference":"Qur\'an 20:114","resource":"https://quran.com/20/114"},{"name":"Keep steady","arabic":"رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا","transliteration":"Rabbana afrigh \'alayna sabran","translation":"Our Lord, pour upon us patience","reference":"Qur\'an 2:250","resource":"https://quran.com/2/250"},{"name":"Guidance","arabic":"اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ","transliteration":"Ihdinas-siratal-mustaqim","translation":"Guide us to the straight path","reference":"Qur\'an 1:6","resource":"https://quran.com/1/6"},{"name":"Devotion","arabic":"رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ","transliteration":"Rabbana waj\'alna muslimayn","translation":"Our Lord, make us Muslims in submission to You","reference":"Qur\'an 2:128","resource":"https://quran.com/2/128"}]},{"title":"Forgiveness & Mercy","items":[{"name":"Do not burden us","arabic":"رَبَّنَا لَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ","transliteration":"Rabbana la tuhammilna ma la taqata lana bih","translation":"Our Lord, do not burden us beyond what we can bear","reference":"Qur\'an 2:286","resource":"https://quran.com/2/286"},{"name":"Mercy","arabic":"رَبِّ اغْفِرْ وَارْحَمْ","transliteration":"Rabbi ighfir warham","translation":"My Lord, forgive and have mercy","reference":"Qur\'an 23:118","resource":"https://quran.com/23/118"},{"name":"Repentance","arabic":"رَبَّنَا ظَلَمْنَا أَنْفُسَنَا","transliteration":"Rabbana zalamna anfusana","translation":"Our Lord, we have wronged ourselves","reference":"Qur\'an 7:23","resource":"https://quran.com/7/23"},{"name":"Steadfast hearts","arabic":"رَبَّنَا لَا تُزِغْ قُلُوبَنَا","transliteration":"Rabbana la tuzigh qulubana","translation":"Our Lord, do not let our hearts deviate","reference":"Qur\'an 3:8","resource":"https://quran.com/3/8"},{"name":"Light for us","arabic":"رَبَّنَا أَتْمِمْ لَنَا نُورَنَا","transliteration":"Rabbana atmim lana nurana","translation":"Our Lord, perfect for us our light","reference":"Qur\'an 66:8","resource":"https://quran.com/66/8"},{"name":"Forgive our sins","arabic":"رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا","transliteration":"Rabbana ighfir lana dhunubana","translation":"Our Lord, forgive us our sins","reference":"Qur\'an 3:147","resource":"https://quran.com/3/147"}]},{"title":"Family & Community","items":[{"name":"Righteous family","arabic":"رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا","transliteration":"Rabbana hab lana min azwajina","translation":"Our Lord, grant us from among our spouses","reference":"Qur\'an 25:74","resource":"https://quran.com/25/74"},{"name":"Parents and believers","arabic":"رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ","transliteration":"Rabbi ighfir li wa li walidayya","translation":"My Lord, forgive me and my parents","reference":"Qur\'an 14:41","resource":"https://quran.com/14/41"},{"name":"For all believers","arabic":"رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا","transliteration":"Rabbana ighfir lana wa li ikhwanina","translation":"Our Lord, forgive us and our brothers","reference":"Qur\'an 59:10","resource":"https://quran.com/59/10"},{"name":"Prayer in family","arabic":"رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ","transliteration":"Rabbi ij\'alni muqima as-salah","translation":"My Lord, make me an establisher of prayer","reference":"Qur\'an 14:40","resource":"https://quran.com/14/40"},{"name":"Peaceful home","arabic":"رَبِّ أَنزِلْنِي مُنزَلًا مُّبَارَكًا","transliteration":"Rabbi anzilni munzalan mubaraka","translation":"My Lord, let me land at a blessed landing place","reference":"Qur\'an 23:29","resource":"https://quran.com/23/29"},{"name":"Righteous hearts","arabic":"رَبَّنَا لَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا","transliteration":"Rabbana la taj\'al fi qulubina ghillan","translation":"Our Lord, do not place in our hearts any rancor","reference":"Qur\'an 59:10","resource":"https://quran.com/59/10"}]},{"title":"Provision & Charity","items":[{"name":"Good provision","arabic":"رَبِّ إِنِّي لِمَا أَنْزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ","transliteration":"Rabbi inni lima anzalta ilayya min khayrin faqir","translation":"My Lord, I am in need of whatever good You send down to me","reference":"Qur\'an 28:24","resource":"https://quran.com/28/24"},{"name":"Blessed wealth","arabic":"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً","transliteration":"Rabbana atina fid-dunya hasanah","translation":"Our Lord, give us good in this world","reference":"Qur\'an 2:201","resource":"https://quran.com/2/201"},{"name":"Accepted deeds","arabic":"رَبَّنَا تَقَبَّلْ مِنَّا","transliteration":"Rabbana taqabbal minna","translation":"Our Lord, accept from us","reference":"Qur\'an 2:127","resource":"https://quran.com/2/127"},{"name":"Protection for the needy","arabic":"رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ","transliteration":"Rabbana isrif \'anna \'adhaba jahannam","translation":"Our Lord, turn away from us the punishment of Hell","reference":"Qur\'an 25:65","resource":"https://quran.com/25/65"},{"name":"Guidance and mercy","arabic":"رَبَّنَا هَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً","transliteration":"Rabbana hab lana min ladunka rahmah","translation":"Our Lord, grant us mercy from Yourself","reference":"Qur\'an 18:10","resource":"https://quran.com/18/10"},{"name":"Steadfast faith","arabic":"رَبَّنَا عَلَيْكَ تَوَكَّلْنَا","transliteration":"Rabbana \'alayka tawakkalna","translation":"Our Lord, upon You we rely","reference":"Qur\'an 10:85","resource":"https://quran.com/10/85"}]}]},"shorts":{"section_title":"Ramadan Short Clips & Reminders","subtitle":"Quick, inspiring clips grouped by theme. Tap any card to watch.","highlights_title":"Quick highlights","highlights":[{"title":"Ramadan is coming","description":"A quick reminder to prepare your heart and schedule.","duration":"Under 1 min","tag":"Preparation","link":"https://www.youtube.com/shorts/HRHR66dGphk","thumbnail":"https://i.ytimg.com/vi/HRHR66dGphk/hqdefault.jpg"},{"title":"Which one are you this Ramadan?","description":"A short reflection on personal goals.","duration":"Under 1 min","tag":"Reflection","link":"https://www.youtube.com/shorts/ubK3uJzcS6k","thumbnail":"https://i.ytimg.com/vi/ubK3uJzcS6k/hqdefault.jpg"},{"title":"Ramadan Mubarak dua","description":"Short dua to share blessings in the month.","duration":"Under 1 min","tag":"Dua","link":"https://www.youtube.com/shorts/V3VN1lkfrjM","thumbnail":"https://i.ytimg.com/vi/V3VN1lkfrjM/hqdefault.jpg"},{"title":"Shortest fasting times","description":"A quick look at shorter fasting windows by region.","duration":"Under 1 min","tag":"Fasting","link":"https://www.youtube.com/shorts/xX74aNqVf28","thumbnail":"https://i.ytimg.com/vi/xX74aNqVf28/hqdefault.jpg"}],"groups":[{"title":"Quran & Taraweeh","items":[{"title":"Ramadan reminder","description":"Keep the Quran close and hearts soft.","duration":"Under 1 min","tag":"Quran","link":"https://www.youtube.com/shorts/nOG_AO74gFE","thumbnail":"https://i.ytimg.com/vi/nOG_AO74gFE/hqdefault.jpg"},{"title":"Quran in Ramadan","description":"Quick motivation to recite more.","duration":"Under 1 min","tag":"Quran","link":"https://www.youtube.com/watch?v=_P32u0x2v_w","thumbnail":"https://i.ytimg.com/vi/_P32u0x2v_w/hqdefault.jpg"},{"title":"Fast Taraweeh","description":"A short reminder about nightly prayers.","duration":"Under 1 min","tag":"Taraweeh","link":"https://www.youtube.com/shorts/sTyXJo_O9zI","thumbnail":"https://i.ytimg.com/vi/sTyXJo_O9zI/hqdefault.jpg"}]},{"title":"Duas & Laylat al-Qadr","items":[{"title":"Ramadan dua","description":"A brief dua to recite in the month.","duration":"Under 1 min","tag":"Dua","link":"https://www.youtube.com/shorts/yBHKEwH89Co","thumbnail":"https://i.ytimg.com/vi/yBHKEwH89Co/hqdefault.jpg"},{"title":"Authentic dua at iftar","description":"Iftar dua reminder.","duration":"Under 1 min","tag":"Iftar","link":"https://www.youtube.com/shorts/O1z666oaa0U","thumbnail":"https://i.ytimg.com/vi/O1z666oaa0U/hqdefault.jpg"},{"title":"Laylat al-Qadr dua","description":"What to say on the Night of Power.","duration":"Under 1 min","tag":"Laylat al-Qadr","link":"https://www.youtube.com/shorts/lmnZZVZKuIY","thumbnail":"https://i.ytimg.com/vi/lmnZZVZKuIY/hqdefault.jpg"}]},{"title":"Suhoor & Charity","items":[{"title":"Eating suhoor in Ramadan","description":"A lighthearted look at suhoor routines.","duration":"Under 1 min","tag":"Suhoor","link":"https://www.youtube.com/shorts/2kyjR_uMnRw","thumbnail":"https://i.ytimg.com/vi/2kyjR_uMnRw/hqdefault.jpg"},{"title":"DIY Sadaqah box","description":"A creative charity idea for families.","duration":"Under 1 min","tag":"Charity","link":"https://www.youtube.com/shorts/Ycfzl4NjkmI","thumbnail":"https://i.ytimg.com/vi/Ycfzl4NjkmI/hqdefault.jpg"}]}]},"platform_resources":{"section_title":"Apps & Learning Resources","subtitle":"Choose the platform that suits your learning style.","cards":[{"title":"Mobile","items":[{"label":"Muslim Pro (Prayer times, Quran, Qibla)","link":"https://www.muslimpro.com/"},{"label":"Quran.com App","link":"https://quran.com/apps"},{"label":"Bayyinah TV","link":"https://bayyinahtv.com/"}]},{"title":"Web","items":[{"label":"Quran.com","link":"https://quran.com/"},{"label":"Bayyinah TV","link":"https://bayyinahtv.com/"},{"label":"SeekersGuidance","link":"https://seekersguidance.org/"}]},{"title":"General","items":[{"label":"Local masjid courses","link":"https://www.google.com/maps/search/masjid+near+me"},{"label":"Ramadan reflection playlists","link":"https://www.youtube.com/results?search_query=ramadan+reflection+playlist"},{"label":"Community study circles","link":"https://www.google.com/search?q=islamic+study+circle+near+me"}]}]},"tools_calculators":{"section_title":"Tools & Calculators","subtitle":"Direct access to Islamic Connect tools.","tools":[{"title":"Zakat Calculator","description":"Estimate your zakat with a guided calculator.","link":"/zakat","icon":"fa-calculator"},{"title":"Prayer Timetable","description":"Find local prayer times and schedules.","link":"/prayer","icon":"fa-mosque"},{"title":"Date Converter","description":"Convert Gregorian and Hijri dates quickly.","link":"/date","icon":"fa-calendar-alt"}]}}');

/***/ }),

/***/ "./resources/js/components/Ramadan2026Component.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/Ramadan2026Component.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Ramadan2026Component_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ramadan2026Component.vue?vue&type=script&lang=js */ "./resources/js/components/Ramadan2026Component.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_Ramadan2026Component_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/Ramadan2026Component.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/Ramadan2026Component.vue?vue&type=script&lang=js":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/Ramadan2026Component.vue?vue&type=script&lang=js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Ramadan2026Component_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Ramadan2026Component_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Ramadan2026Component.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Ramadan2026Component.vue?vue&type=script&lang=js");
 

/***/ })

}]);