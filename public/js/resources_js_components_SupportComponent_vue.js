"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_SupportComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SupportComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SupportComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      amount: 10
    };
  },
  computed: {
    finalAmount() {
      return this.amount;
    },
    isValidAmount() {
      const n = Number(this.finalAmount);
      return Number.isFinite(n) && Number.isInteger(n) && n >= 1 && n <= 100000;
    },
    impactMessage() {
      if (this.amount >= 100) return 'Major platform enhancement';
      if (this.amount >= 50) return 'Content development for many users';
      if (this.amount >= 25) return 'Supports multiple users monthly';
      return 'Helps maintain basic access';
    },
    stripeUrl() {
      const amountInCents = Math.round(this.finalAmount * 100);
      // Webpack Mix: read MIX_ variables via process.env
      const base = typeof process !== 'undefined' && process.env && process.env.MIX_STRIPE_DONATE_URL ? process.env.MIX_STRIPE_DONATE_URL : 'https://donate.stripe.com/6oE5kY84oc3q7fy145';
      return `${base}?amount=${amountInCents}`;
    }
  },
  methods: {
    onAmountInput(e) {
      // Coerce to integer pounds and clamp to range
      let v = parseInt(e.target.value || '');
      if (isNaN(v)) v = 0;
      if (v < 0) v = 0;
      if (v > 100000) v = 100000;
      this.amount = v;
    },
    async processDonation() {
      if (!this.isValidAmount) {
        alert('Please select a contribution amount.');
        return;
      }
      try {
        var _getAttribute, _ref;
        // Prepare CSRF
        const tokenEl = document.querySelector('meta[name="csrf-token"]');
        const csrf = tokenEl ? tokenEl.getAttribute('content') : '';

        // Create a Checkout session on the server
        const res = await fetch('/support/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrf,
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            amount: this.finalAmount
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error((data === null || data === void 0 ? void 0 : data.error) || 'Failed to create payment session');

        // Redirect to Stripe Checkout using Stripe.js
        const key = (_getAttribute = (_ref = document.querySelector('meta[name="stripe-key"]') || {}).getAttribute) === null || _getAttribute === void 0 ? void 0 : _getAttribute.call(_ref, 'content');
        if (!key) throw new Error('Stripe publishable key missing');
        const stripe = window.Stripe ? window.Stripe(key) : null;
        if (!stripe) throw new Error('Stripe.js not loaded');
        const result = await stripe.redirectToCheckout({
          sessionId: data.id
        });
        if (result.error) {
          throw new Error(result.error.message || 'Redirect failed');
        }
      } catch (err) {
        console.error('Donation error:', err);
        // Fallback to Payment Link if configured
        try {
          window.location.href = this.stripeUrl;
        } catch (_e) {
          alert('Unable to start payment: ' + ((err === null || err === void 0 ? void 0 : err.message) || 'unknown error'));
        }
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SupportComponent.vue?vue&type=template&id=57940159&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SupportComponent.vue?vue&type=template&id=57940159&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "donation-page"
};
const _hoisted_2 = {
  class: "combined-section"
};
const _hoisted_3 = {
  class: "container-fluid"
};
const _hoisted_4 = {
  class: "row align-items-stretch"
};
const _hoisted_5 = {
  class: "col-lg-5 mb-4"
};
const _hoisted_6 = {
  class: "donation-form"
};
const _hoisted_7 = {
  class: "mb-3"
};
const _hoisted_8 = {
  class: "input-group"
};
const _hoisted_9 = ["aria-invalid"];
const _hoisted_10 = {
  key: 0,
  class: "invalid-feedback"
};
const _hoisted_11 = {
  class: "mt-2 d-flex gap-2 flex-wrap"
};
const _hoisted_12 = {
  key: 0,
  class: "summary-section mb-4"
};
const _hoisted_13 = {
  class: "summary-item"
};
const _hoisted_14 = ["disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Hero Section "), _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"hero-section\" data-v-57940159><div class=\"container\" data-v-57940159><div class=\"row justify-content-center\" data-v-57940159><div class=\"col-lg-10 text-center text-white\" data-v-57940159><h1 class=\"mb-4 text-white\" data-v-57940159>Support Islamic Education Technology</h1><p class=\"lead mb-5\" data-v-57940159>Your contribution helps make authentic Islamic knowledge accessible to a global audience</p><!-- Impact Metrics --><div class=\"row\" data-v-57940159><div class=\"col-md-3 col-sm-3 mb-4\" data-v-57940159><div class=\"metric-item\" data-v-57940159><h3 data-v-57940159>85%</h3><p data-v-57940159>Accessibility Score</p></div></div><div class=\"col-md-3 mb-4 col-sm-3\" data-v-57940159><div class=\"metric-item\" data-v-57940159><h3 data-v-57940159>75+</h3><p data-v-57940159>Countries</p></div></div><div class=\"col-md-3 mb-4 col-sm-3\" data-v-57940159><div class=\"metric-item\" data-v-57940159><h3 data-v-57940159>575+</h3><p data-v-57940159>Cities</p></div></div><div class=\"col-md-3 mb-4 col-sm-3\" data-v-57940159><div class=\"metric-item\" data-v-57940159><h3 data-v-57940159>1,090%</h3><p data-v-57940159>User Growth</p></div></div></div></div></div></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Combined Value Proposition and Donation Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Value Proposition Column "), _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"col-lg-1 mb-4\" data-v-57940159></div><div class=\"col-lg-5 mb-4\" data-v-57940159><div class=\"value-proposition-wrapper\" data-v-57940159><div class=\"form-header text-center mb-4\" data-v-57940159><h2 class=\"mb-3\" data-v-57940159>Strategic Impact Areas</h2></div><div class=\"row\" data-v-57940159><div class=\"col-md-6 mb-4\" data-v-57940159><div class=\"value-card\" data-v-57940159><div class=\"value-icon\" data-v-57940159>📚</div><h4 data-v-57940159>Educational Content</h4><p data-v-57940159>Developing comprehensive Quranic explanations, Hadith collections, and scholarly resources</p></div></div><div class=\"col-md-6 mb-4\" data-v-57940159><div class=\"value-card\" data-v-57940159><div class=\"value-icon\" data-v-57940159>♿</div><h4 data-v-57940159>Accessibility Features</h4><p data-v-57940159>Implementing screen reader support and voice interfaces for inclusive access</p></div></div><div class=\"col-md-6 mb-4\" data-v-57940159><div class=\"value-card\" data-v-57940159><div class=\"value-icon\" data-v-57940159>⚙️</div><h4 data-v-57940159>Platform Infrastructure</h4><p data-v-57940159>Maintaining robust servers and scalable architecture for global user base</p></div></div><div class=\"col-md-6 mb-4\" data-v-57940159><div class=\"value-card\" data-v-57940159><div class=\"value-icon\" data-v-57940159>🌍</div><h4 data-v-57940159>Global Outreach</h4><p data-v-57940159>Expanding to underserved Muslim communities worldwide</p></div></div></div></div></div>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Donation Section Column "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "form-header text-center mb-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "mb-3"
  }, "Make a Difference"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted"
  }, "Your support enables us to continue our mission")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Amount Selector "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "donation-amount",
    class: "form-label"
  }, "Choose an amount (GBP)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text"
  }, "£", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "donation-amount",
    type: "number",
    min: "1",
    step: "1",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", {
      'is-invalid': !$options.isValidAmount
    }]),
    "aria-invalid": !$options.isValidAmount,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.amount = $event),
    onInput: _cache[1] || (_cache[1] = (...args) => $options.onAmountInput && $options.onAmountInput(...args))
  }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_9), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.amount, void 0, {
    number: true
  }]])]), !$options.isValidAmount ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_10, " Please enter a whole-number amount between £1 and £100,000. ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "form-text"
  }, "Minimum £1. Whole numbers only.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary btn-sm",
    onClick: _cache[2] || (_cache[2] = $event => $data.amount = 5)
  }, "£5"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary btn-sm",
    onClick: _cache[3] || (_cache[3] = $event => $data.amount = 10)
  }, "£10"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary btn-sm",
    onClick: _cache[4] || (_cache[4] = $event => $data.amount = 25)
  }, "£25"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary btn-sm",
    onClick: _cache[5] || (_cache[5] = $event => $data.amount = 50)
  }, "£50")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Trust Indicators "), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"trust-indicators mb-4\" data-v-57940159><div class=\"trust-item\" data-v-57940159><i class=\"fas fa-lock\" data-v-57940159></i><span data-v-57940159>Secure Payment</span></div><div class=\"trust-item\" data-v-57940159><i class=\"fas fa-shield-alt\" data-v-57940159></i><span data-v-57940159>SSL Encrypted</span></div><div class=\"trust-item\" data-v-57940159><i class=\"fas fa-certificate\" data-v-57940159></i><span data-v-57940159>Stripe Verified</span></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Summary "), $options.isValidAmount ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "summary-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Ready to Contribute")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"summary-item\">\n                  <span>Amount:</span>\n                  <strong>£{{ finalAmount }}</strong>\n                </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Your Impact:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.impactMessage), 1 /* TEXT */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Submit Button "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-primary w-100",
    onClick: _cache[6] || (_cache[6] = (...args) => $options.processDonation && $options.processDonation(...args)),
    disabled: !$options.isValidAmount
  }, [...(_cache[12] || (_cache[12] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-lock me-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Proceed to Secure Payment ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_14), _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "security-guarantee text-center mt-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "small text-muted"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-shield-alt me-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Your contribution is securely processed by Stripe. We never store your payment details. ")])], -1 /* CACHED */))])]), _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-1 mb-4"
  }, null, -1 /* CACHED */))])])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SupportComponent.vue?vue&type=style&index=0&id=57940159&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SupportComponent.vue?vue&type=style&index=0&id=57940159&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.donation-page[data-v-57940159] {\n  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;\n  line-height: 1.6;\n}\n\n/* Hero Section */\n.hero-section[data-v-57940159] {\n  background: linear-gradient(135deg, #1a5f7a 0%, #2c3e50 100%);\n  padding: 100px 0 80px 0;\n  color: white;\n  position: relative;\n  overflow: hidden;\n}\n.hero-section[data-v-57940159]::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\");\n  opacity: 0.3;\n}\n.hero-section h1[data-v-57940159] {\n  font-size: 2.75rem;\n  font-weight: 700;\n  margin-bottom: 1.5rem;\n  position: relative;\n}\n.hero-section .lead[data-v-57940159] {\n  font-size: 1.25rem;\n  opacity: 0.9;\n  margin-bottom: 3rem;\n  position: relative;\n}\n.metric-item[data-v-57940159] {\n  text-align: center;\n  padding: 0 1rem;\n  position: relative;\n}\n.metric-item h3[data-v-57940159] {\n  font-size: 2.25rem;\n  font-weight: 700;\n  margin-bottom: 0.5rem;\n  color: #fff;\n}\n.metric-item p[data-v-57940159] {\n  font-size: 1rem;\n  font-weight: 500;\n  margin-bottom: 0.25rem;\n  opacity: 0.9;\n}\n\n/* Combined Section */\n.combined-section[data-v-57940159] {\n  padding: 80px 0;\n  background: #f8f9fa;\n}\n\n/* Value Cards */\n.value-card[data-v-57940159] {\n  background: #fafbfc;\n  padding: 2rem 1.5rem;\n  border-radius: 12px;\n  border: 1px solid #e9ecef;\n  height: 100%;\n  transition: all 0.3s ease;\n  position: relative;\n  overflow: hidden;\n}\n.value-card[data-v-57940159]::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 4px;\n  height: 100%;\n  background: #1a5f7a;\n  transform: scaleY(0);\n  transition: transform 0.3s ease;\n}\n.value-card[data-v-57940159]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\n}\n.value-card[data-v-57940159]:hover::before {\n  transform: scaleY(1);\n}\n.value-icon[data-v-57940159] {\n  font-size: 1.75rem;\n  margin-bottom: 1rem;\n  opacity: 0.8;\n}\n.value-card h4[data-v-57940159] {\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: #1a5f7a;\n  margin-bottom: 1rem;\n}\n.value-card p[data-v-57940159] {\n  color: #6c757d;\n  line-height: 1.6;\n  margin: 0;\n  font-size: 0.95rem;\n}\n\n/* Donation Section */\n.donation-form[data-v-57940159] {\n  background: #fff;\n  padding: 3rem;\n  border-radius: 16px;\n  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);\n  border: 1px solid #e9ecef;\n  position: relative;\n  height: 100%;\n}\n.donation-form[data-v-57940159]::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background: linear-gradient(90deg, #1a5f7a, #2c3e50);\n  border-radius: 16px 16px 0 0;\n}\n.form-header h3[data-v-57940159] {\n  font-size: 1.75rem;\n  padding-top: 5px;\n  font-weight: 800;\n  color: #2c3e50;\n}\n.form-header h2[data-v-57940159] {\n  font-size: 1.75rem;\n  font-weight: 800;\n  color: #2c3e50;\n}\n.form-header p[data-v-57940159] {\n  font-size: 1.1rem;\n  color: #6c757d;\n}\n\n/* Trust Indicators */\n.trust-indicators[data-v-57940159] {\n  display: flex;\n  justify-content: space-around;\n  padding: 1rem;\n  background: #f8f9fa;\n  border-radius: 8px;\n  border: 1px solid #e9ecef;\n}\n.trust-item[data-v-57940159] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.85rem;\n  color: #495057;\n  font-weight: 500;\n}\n.trust-item i[data-v-57940159] {\n  color: #1a5f7a;\n}\n\n/* Enhanced Summary */\n.summary-section[data-v-57940159] {\n  background: #f8f9fa;\n  padding: 1.5rem;\n  border-radius: 12px;\n  border-left: 4px solid #1a5f7a;\n}\n.summary-header[data-v-57940159] {\n  margin-bottom: 1rem;\n  padding-bottom: 0.5rem;\n  border-bottom: 1px solid #dee2e6;\n}\n.summary-header h6[data-v-57940159] {\n  margin: 0;\n  color: #2c3e50;\n  font-weight: 600;\n}\n.summary-item[data-v-57940159] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem 0;\n}\n.summary-item[data-v-57940159]:not(:last-child) {\n  border-bottom: 1px solid #dee2e6;\n}\n\n/* Enhanced Primary Button */\n.btn-primary[data-v-57940159] {\n  background: #1a5f7a;\n  border: none;\n  color: white;\n  padding: 1.25rem 2rem;\n  font-weight: 600;\n  border-radius: 12px;\n  transition: all 0.3s ease;\n  font-size: 1.1rem;\n  position: relative;\n  overflow: hidden;\n}\n.btn-primary[data-v-57940159]:hover:not(:disabled) {\n  background: #144a5f;\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(26, 95, 122, 0.4);\n}\n.btn-primary[data-v-57940159]:disabled {\n  background: #6c757d;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.security-guarantee[data-v-57940159] {\n  padding: 1rem;\n  background: #f8f9fa;\n  border-radius: 8px;\n  border: 1px solid #e9ecef;\n}\n\n/* Testimonial Section */\n.testimonial-section[data-v-57940159] {\n  padding: 40px 0;\n}\n.testimonial-card[data-v-57940159] {\n  background: white;\n  padding: 3rem;\n  border-radius: 16px;\n  border-left: 4px solid #1a5f7a;\n  position: relative;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);\n}\n.testimonial-card[data-v-57940159]::before {\n  content: '\"';\n  position: absolute;\n  top: 20px;\n  left: 20px;\n  font-size: 5rem;\n  color: #e9ecef;\n  font-family: Georgia, serif;\n  line-height: 1;\n}\n.testimonial-card blockquote[data-v-57940159] {\n  margin: 0;\n  position: relative;\n  z-index: 1;\n}\n.testimonial-card blockquote p[data-v-57940159] {\n  font-size: 1.3rem;\n  font-style: italic;\n  color: #495057;\n  line-height: 1.6;\n  margin-bottom: 1.5rem;\n}\n.testimonial-card blockquote footer[data-v-57940159] {\n  font-weight: 600;\n  color: #1a5f7a;\n  font-size: 1rem;\n}\n\n/* Responsive */\n@media (max-width: 992px) {\n.combined-section[data-v-57940159] {\n    padding: 60px 0;\n}\n.value-proposition-wrapper[data-v-57940159],\n  .donation-form[data-v-57940159] {\n    padding: 2rem;\n}\n.value-proposition-wrapper h2[data-v-57940159] {\n    font-size: 1.75rem;\n}\n}\n@media (max-width: 768px) {\n.hero-section[data-v-57940159] {\n    padding: 60px 0 40px 0;\n}\n.hero-section h1[data-v-57940159] {\n    font-size: 2.25rem;\n}\n.combined-section[data-v-57940159],\n  .testimonial-section[data-v-57940159] {\n    padding: 40px 0;\n}\n.trust-indicators[data-v-57940159] {\n    flex-direction: column;\n    gap: 0.75rem;\n    align-items: flex-start;\n}\n.value-card[data-v-57940159] {\n    padding: 1.5rem;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SupportComponent.vue?vue&type=style&index=0&id=57940159&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SupportComponent.vue?vue&type=style&index=0&id=57940159&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SupportComponent_vue_vue_type_style_index_0_id_57940159_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SupportComponent.vue?vue&type=style&index=0&id=57940159&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SupportComponent.vue?vue&type=style&index=0&id=57940159&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SupportComponent_vue_vue_type_style_index_0_id_57940159_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SupportComponent_vue_vue_type_style_index_0_id_57940159_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/SupportComponent.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/SupportComponent.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SupportComponent_vue_vue_type_template_id_57940159_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SupportComponent.vue?vue&type=template&id=57940159&scoped=true */ "./resources/js/components/SupportComponent.vue?vue&type=template&id=57940159&scoped=true");
/* harmony import */ var _SupportComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SupportComponent.vue?vue&type=script&lang=js */ "./resources/js/components/SupportComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _SupportComponent_vue_vue_type_style_index_0_id_57940159_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SupportComponent.vue?vue&type=style&index=0&id=57940159&scoped=true&lang=css */ "./resources/js/components/SupportComponent.vue?vue&type=style&index=0&id=57940159&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_SupportComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_SupportComponent_vue_vue_type_template_id_57940159_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-57940159"],['__file',"resources/js/components/SupportComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/SupportComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/components/SupportComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SupportComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SupportComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SupportComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SupportComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/SupportComponent.vue?vue&type=style&index=0&id=57940159&scoped=true&lang=css":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/components/SupportComponent.vue?vue&type=style&index=0&id=57940159&scoped=true&lang=css ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SupportComponent_vue_vue_type_style_index_0_id_57940159_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SupportComponent.vue?vue&type=style&index=0&id=57940159&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SupportComponent.vue?vue&type=style&index=0&id=57940159&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/SupportComponent.vue?vue&type=template&id=57940159&scoped=true":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/SupportComponent.vue?vue&type=template&id=57940159&scoped=true ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SupportComponent_vue_vue_type_template_id_57940159_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SupportComponent_vue_vue_type_template_id_57940159_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SupportComponent.vue?vue&type=template&id=57940159&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SupportComponent.vue?vue&type=template&id=57940159&scoped=true");


/***/ })

}]);