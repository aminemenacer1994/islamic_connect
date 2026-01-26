"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_surah_selection_CustomSurahSelection_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/surah_selection/CustomSurahSelection.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/surah_selection/CustomSurahSelection.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    customSurahs: Array,
    modelValue: Number
  },
  data() {
    return {
      customSurat: [{
        id: 1,
        name: 'Al-Fatiha'
      }, {
        id: 2,
        name: 'Al-Baqarah'
      }, {
        id: 3,
        name: 'Al-Imran'
      }, {
        id: 4,
        name: 'Al-Nisa'
      }, {
        id: 5,
        name: 'Al-Maidah'
      }, {
        id: 18,
        name: 'Al-Kahf'
      }, {
        id: 67,
        name: 'Al-Mulk'
      }, {
        id: 108,
        name: 'Al-Kawthar'
      }, {
        id: 36,
        name: 'Ya Seen'
      }, {
        id: 19,
        name: 'Maryam'
      }, {
        id: 109,
        name: 'Al-Kafiroon'
      }, {
        id: 112,
        name: 'Al-Ikhlas'
      }, {
        id: 113,
        name: 'Al-Falaq'
      }, {
        id: 114,
        name: 'Al-Nas'
      }],
      touchStartX: 0,
      touchEndX: 0,
      touchStartTime: 0
    };
  },
  computed: {
    surah() {
      return this.modelValue;
    }
  },
  methods: {
    selectSurah(surahId) {
      this.$emit('update:modelValue', surahId);
      localStorage.setItem('selectedSurah', surahId); // Save to local storage
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/surah_selection/CustomSurahSelection.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/surah_selection/CustomSurahSelection.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_surah_selection_CustomSurahSelection_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_surah_selection_CustomSurahSelection_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/vue/surah_selection/CustomSurahSelection.vue */ "./resources/components/vue/surah_selection/CustomSurahSelection.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/surah_selection/CustomSurahSelection.vue?vue&type=template&id=7f111deb&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/surah_selection/CustomSurahSelection.vue?vue&type=template&id=7f111deb&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = ["onClick"];
const _hoisted_2 = {
  class: "flex justify-content-center mr-1"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    class: "scrollmenu",
    onTouchstart: _cache[0] || (_cache[0] = (...args) => _ctx.handleTouchStart && _ctx.handleTouchStart(...args)),
    onTouchend: _cache[1] || (_cache[1] = (...args) => _ctx.handleTouchEnd && _ctx.handleTouchEnd(...args))
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.customSurat, data => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
      href: "#",
      key: data.id,
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.selectSurah(data.id), ["prevent"])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["badge button-23", {
        active: $options.surah === data.id
      }])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.name), 3 /* TEXT, CLASS */)])], 8 /* PROPS */, _hoisted_1);
  }), 128 /* KEYED_FRAGMENT */))], 32 /* NEED_HYDRATION */);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/surah_selection/CustomSurahSelection.vue?vue&type=style&index=0&id=7f111deb&scoped=true&lang=css":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/surah_selection/CustomSurahSelection.vue?vue&type=style&index=0&id=7f111deb&scoped=true&lang=css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/surah_selection/CustomSurahSelection.vue":
/*!***************************************************************************!*\
  !*** ./resources/components/vue/surah_selection/CustomSurahSelection.vue ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CustomSurahSelection_vue_vue_type_template_id_7f111deb_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomSurahSelection.vue?vue&type=template&id=7f111deb&scoped=true */ "./resources/components/vue/surah_selection/CustomSurahSelection.vue?vue&type=template&id=7f111deb&scoped=true");
/* harmony import */ var _CustomSurahSelection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomSurahSelection.vue?vue&type=script&lang=js */ "./resources/components/vue/surah_selection/CustomSurahSelection.vue?vue&type=script&lang=js");
/* harmony import */ var _CustomSurahSelection_vue_vue_type_style_index_0_id_7f111deb_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CustomSurahSelection.vue?vue&type=style&index=0&id=7f111deb&scoped=true&lang=css */ "./resources/components/vue/surah_selection/CustomSurahSelection.vue?vue&type=style&index=0&id=7f111deb&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_CustomSurahSelection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_CustomSurahSelection_vue_vue_type_template_id_7f111deb_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-7f111deb"],['__file',"resources/components/vue/surah_selection/CustomSurahSelection.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/surah_selection/CustomSurahSelection.vue?vue&type=script&lang=js":
/*!***************************************************************************************************!*\
  !*** ./resources/components/vue/surah_selection/CustomSurahSelection.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CustomSurahSelection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CustomSurahSelection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CustomSurahSelection.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/surah_selection/CustomSurahSelection.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/surah_selection/CustomSurahSelection.vue?vue&type=style&index=0&id=7f111deb&scoped=true&lang=css":
/*!***********************************************************************************************************************************!*\
  !*** ./resources/components/vue/surah_selection/CustomSurahSelection.vue?vue&type=style&index=0&id=7f111deb&scoped=true&lang=css ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CustomSurahSelection_vue_vue_type_style_index_0_id_7f111deb_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CustomSurahSelection.vue?vue&type=style&index=0&id=7f111deb&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/surah_selection/CustomSurahSelection.vue?vue&type=style&index=0&id=7f111deb&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/surah_selection/CustomSurahSelection.vue?vue&type=template&id=7f111deb&scoped=true":
/*!*********************************************************************************************************************!*\
  !*** ./resources/components/vue/surah_selection/CustomSurahSelection.vue?vue&type=template&id=7f111deb&scoped=true ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CustomSurahSelection_vue_vue_type_template_id_7f111deb_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CustomSurahSelection_vue_vue_type_template_id_7f111deb_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CustomSurahSelection.vue?vue&type=template&id=7f111deb&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/surah_selection/CustomSurahSelection.vue?vue&type=template&id=7f111deb&scoped=true");


/***/ }),

/***/ "./resources/js/components/surah_selection/CustomSurahSelection.vue":
/*!**************************************************************************!*\
  !*** ./resources/js/components/surah_selection/CustomSurahSelection.vue ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CustomSurahSelection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomSurahSelection.vue?vue&type=script&lang=js */ "./resources/js/components/surah_selection/CustomSurahSelection.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_CustomSurahSelection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/surah_selection/CustomSurahSelection.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/surah_selection/CustomSurahSelection.vue?vue&type=script&lang=js":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/surah_selection/CustomSurahSelection.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CustomSurahSelection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CustomSurahSelection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CustomSurahSelection.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/surah_selection/CustomSurahSelection.vue?vue&type=script&lang=js");
 

/***/ })

}]);