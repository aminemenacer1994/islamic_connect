"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_tinymce_TinymceEditor_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tinymce/TinymceEditor.vue?vue&type=script&defer=true&lang=js":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tinymce/TinymceEditor.vue?vue&type=script&defer=true&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tinymce_tinymce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tinymce/tinymce */ "./node_modules/tinymce/tinymce.js");
/* harmony import */ var tinymce_tinymce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tinymce_tinymce__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    modelValue: String
  },
  data() {
    return {
      editor: null
    };
  },
  watch: {
    modelValue(val) {
      if (this.editor && this.editor.getContent() !== val) {
        this.editor.setContent(val);
      }
    }
  },
  mounted() {
    tinymce_tinymce__WEBPACK_IMPORTED_MODULE_0___default().init({
      target: this.$refs.editor,
      plugins: 'paste link',
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
      setup: editor => {
        this.editor = editor;
        editor.on('init', () => {
          editor.setContent(this.modelValue || '');
        });
        editor.on('Change KeyUp', () => {
          const content = editor.getContent();
          if (content !== this.modelValue) {
            this.$emit('update:modelValue', content);
          }
        });
      }
    });
  },
  beforeUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tinymce/TinymceEditor.vue?vue&type=template&id=782e0bfe":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tinymce/TinymceEditor.vue?vue&type=template&id=782e0bfe ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <textarea ref=\"editor\">{{ modelValue }}</textarea> ")]);
}

/***/ }),

/***/ "./resources/js/components/tinymce/TinymceEditor.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/tinymce/TinymceEditor.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TinymceEditor_vue_vue_type_template_id_782e0bfe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TinymceEditor.vue?vue&type=template&id=782e0bfe */ "./resources/js/components/tinymce/TinymceEditor.vue?vue&type=template&id=782e0bfe");
/* harmony import */ var _TinymceEditor_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TinymceEditor.vue?vue&type=script&defer=true&lang=js */ "./resources/js/components/tinymce/TinymceEditor.vue?vue&type=script&defer=true&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_TinymceEditor_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_TinymceEditor_vue_vue_type_template_id_782e0bfe__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/tinymce/TinymceEditor.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/tinymce/TinymceEditor.vue?vue&type=script&defer=true&lang=js":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/tinymce/TinymceEditor.vue?vue&type=script&defer=true&lang=js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TinymceEditor_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TinymceEditor_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TinymceEditor.vue?vue&type=script&defer=true&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tinymce/TinymceEditor.vue?vue&type=script&defer=true&lang=js");
 

/***/ }),

/***/ "./resources/js/components/tinymce/TinymceEditor.vue?vue&type=template&id=782e0bfe":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/tinymce/TinymceEditor.vue?vue&type=template&id=782e0bfe ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TinymceEditor_vue_vue_type_template_id_782e0bfe__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TinymceEditor_vue_vue_type_template_id_782e0bfe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TinymceEditor.vue?vue&type=template&id=782e0bfe */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/tinymce/TinymceEditor.vue?vue&type=template&id=782e0bfe");


/***/ })

}]);