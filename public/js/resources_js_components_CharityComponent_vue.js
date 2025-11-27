"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_CharityComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/CharityComponent.vue?vue&type=script&defer=true&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/CharityComponent.vue?vue&type=script&defer=true&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      amount: 1,
      // Default amount
      selectedCurrency: 'usd',
      // Default currency
      stripeToken: 'tok_visa'
    };
  },
  async mounted() {
    const stripe = await this.$stripe;
    const elements = stripe.elements();

    // Create an instance of the card Element.
    const cardElement = elements.create('card');

    // Mount the card element to the DOM.
    cardElement.mount('#card-element');
  },
  methods: {
    async initiatePayment() {
      try {
        const stripe = await this.$stripe; // Access Stripe instance from the Vue app
        const response = await axios.post('/payment/initiate', {
          amount: this.amount,
          currency: 'usd' // Adjust currency as needed
        });
        const {
          error
        } = await stripe.confirmCardPayment(response.data.client_secret, {
          payment_method: {
            card: elements.getElement('card-element'),
            // Use the card element created earlier
            billing_details: {
              // Include any additional billing details if needed
            }
          }
        });
        cardElement.mount('#card-element');
        if (error) {
          console.error(error);
        } else {
          console.log('Payment successful!');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/CharityComponent.vue?vue&type=template&id=5c37b230":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/CharityComponent.vue?vue&type=template&id=5c37b230 ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  id: "app",
  class: "pt-3"
};
const _hoisted_2 = {
  class: "container py-3"
};
const _hoisted_3 = {
  class: "row"
};
const _hoisted_4 = {
  class: "col-lg-6 mx-auto"
};
const _hoisted_5 = {
  class: "card mt-5 box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;",
  style: {
    "border-radius": "8px"
  }
};
const _hoisted_6 = {
  class: "card-header",
  style: {
    "border-radius": "8px"
  }
};
const _hoisted_7 = {
  class: "tab-content"
};
const _hoisted_8 = {
  id: "credit-card",
  class: "tab-pane fade show active pt-3"
};
const _hoisted_9 = {
  role: "form",
  onsubmit: "event.preventDefault()",
  style: {
    "padding": "10px"
  }
};
const _hoisted_10 = {
  class: "row"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"row container\"><div class=\"mr-2\"><h1 class=\"display-4 text-center\" style=\"font-family:inter;\">Donations</h1><p class=\"lead text-muted mb-0\" style=\"font-family:inter;\">&quot;As-salaamu Alaikum, As we want to keep IslamicHub ad-free, we would appreciate a small, sizable donation to continue the development and maintenance of the website. You will find a form on the right side where you can submit a donation amount of your choosing. Jazakum Allahu Khairan.&quot;</p><br><p class=\"lead text-muted mb-0\" style=\"font-family:inter;\">The call for donations in Islam is rooted in compassion and empathy for the less fortunate. It is a way for individuals to fulfill their duty towards their fellow human beings, fostering a sense of community and solidarity. </p></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", _hoisted_9, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"form-group mb-3\"><label for=\"cardNumber\"><h6>Card number</h6></label><div class=\"input-group\"><input type=\"text\" name=\"card_number\" placeholder=\"Valid card number\" class=\"form-control\" required><div class=\"input-group-append\"><span class=\"input-group-text text-muted\"><i class=\"fab fa-cc-visa mx-1\"></i> <i class=\"fab fa-cc-mastercard mx-1\"></i> <i class=\"fab fa-cc-amex mx-1\"></i></span></div></div></div><h6 for=\"amount\">Amount:</h6>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.amount = $event),
    class: "form-control mb-3",
    type: "number",
    min: "1",
    step: "0.01"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.amount]]), _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "mt-2",
    for: "currency"
  }, "Currency:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-control mb-3",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.selectedCurrency = $event)
  }, [...(_cache[3] || (_cache[3] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "usd"
  }, "USD", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "eur"
  }, "EUR", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "eur"
  }, "GBP", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedCurrency]]), _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"row mb-3\"><div class=\"col-sm-8\"><div class=\"form-group\"><label><span class=\"hidden-xs\"><h6 class=\"mt-2\">Expiration Date</h6></span></label><div class=\"input-group\"><input type=\"number\" placeholder=\"MM\" name=\"\" class=\"form-control\" required> <input type=\"number\" placeholder=\"YY\" name=\"\" class=\"form-control\" required></div></div></div><div class=\"col-sm-4\"><div class=\"form-group mb-4\"><label data-toggle=\"tooltip\" title=\"Three digit CV code on the back of your card\"><h6>CVV <i class=\"fa fa-question-circle d-inline\"></i></h6></label> <input type=\"text\" required class=\"form-control\"></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "subscribe btn btn-success btn-lg btn-block col-md-12",
    onClick: _cache[2] || (_cache[2] = (...args) => $options.initiatePayment && $options.initiatePayment(...args))
  }, "Pay Now")])])])])])])]), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-6 mt-5 d-none d-lg-block"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "/images/group.png",
    alt: "charity image",
    class: "img-fluid",
    loading: "lazy"
  })], -1 /* CACHED */))])])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/CharityComponent.vue?vue&type=style&index=0&id=5c37b230&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/CharityComponent.vue?vue&type=style&index=0&id=5c37b230&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/components/CharityComponent.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/CharityComponent.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CharityComponent_vue_vue_type_template_id_5c37b230__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CharityComponent.vue?vue&type=template&id=5c37b230 */ "./resources/js/components/CharityComponent.vue?vue&type=template&id=5c37b230");
/* harmony import */ var _CharityComponent_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CharityComponent.vue?vue&type=script&defer=true&lang=js */ "./resources/js/components/CharityComponent.vue?vue&type=script&defer=true&lang=js");
/* harmony import */ var _CharityComponent_vue_vue_type_style_index_0_id_5c37b230_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CharityComponent.vue?vue&type=style&index=0&id=5c37b230&lang=css */ "./resources/js/components/CharityComponent.vue?vue&type=style&index=0&id=5c37b230&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_CharityComponent_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_CharityComponent_vue_vue_type_template_id_5c37b230__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/CharityComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/CharityComponent.vue?vue&type=script&defer=true&lang=js":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/CharityComponent.vue?vue&type=script&defer=true&lang=js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CharityComponent_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CharityComponent_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CharityComponent.vue?vue&type=script&defer=true&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/CharityComponent.vue?vue&type=script&defer=true&lang=js");
 

/***/ }),

/***/ "./resources/js/components/CharityComponent.vue?vue&type=style&index=0&id=5c37b230&lang=css":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/CharityComponent.vue?vue&type=style&index=0&id=5c37b230&lang=css ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CharityComponent_vue_vue_type_style_index_0_id_5c37b230_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CharityComponent.vue?vue&type=style&index=0&id=5c37b230&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/CharityComponent.vue?vue&type=style&index=0&id=5c37b230&lang=css");


/***/ }),

/***/ "./resources/js/components/CharityComponent.vue?vue&type=template&id=5c37b230":
/*!************************************************************************************!*\
  !*** ./resources/js/components/CharityComponent.vue?vue&type=template&id=5c37b230 ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CharityComponent_vue_vue_type_template_id_5c37b230__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CharityComponent_vue_vue_type_template_id_5c37b230__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CharityComponent.vue?vue&type=template&id=5c37b230 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/CharityComponent.vue?vue&type=template&id=5c37b230");


/***/ })

}]);