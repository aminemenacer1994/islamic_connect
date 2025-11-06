"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_SubscriptionForm_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionForm.vue?vue&type=script&setup=true&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionForm.vue?vue&type=script&setup=true&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'SubscriptionForm',
  setup(__props, {
    expose: __expose
  }) {
    var _window$appConfig;
    __expose();
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const PRICE_IDS = ((_window$appConfig = window.appConfig) === null || _window$appConfig === void 0 ? void 0 : _window$appConfig.stripePrices) || {
      monthly: 'price_1SKJCyGsDD2PdzHqUEaWiQkG',
      yearly: 'price_1SKJCyGsDD2PdzHq4qsR1TRh'
    };
    const selectedPlan = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(PRICE_IDS.monthly);
    const loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(true);
    const submitting = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const cancelling = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const error = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const success = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const isSubscribed = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const subscription = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    const planDetails = {
      [PRICE_IDS.monthly]: 'Premium Monthly (£1.99)',
      [PRICE_IDS.yearly]: 'Premium Yearly (£17.99)'
    };
    const planDisplayName = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      var _subscription$value;
      if (!((_subscription$value = subscription.value) !== null && _subscription$value !== void 0 && _subscription$value.stripe_price)) return 'Free';
      return planDetails[subscription.value.stripe_price] || 'Premium';
    });
    const formatDate = dateString => {
      if (!dateString) return 'Never';
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    };
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await fetch('/subscription-status', {
          headers: {
            'X-CSRF-TOKEN': csrfToken,
            'Accept': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Failed to fetch subscription status');
        const data = await response.json();
        isSubscribed.value = data.is_subscribed;
        subscription.value = {
          stripe_price: data.plan !== 'free' ? data.plan : null,
          ends_at: data.ends_at
        };
        return data.is_subscribed;
      } catch (err) {
        console.error('Error fetching subscription:', err);
        error.value = 'Error loading subscription status. Please refresh the page.';
        return false;
      }
    };
    const waitForSubscription = async () => {
      success.value = 'Subscription successful! Activating your subscription...';
      let attempts = 0;
      const maxAttempts = 15; // 30 seconds total (15 attempts × 2 seconds)

      const checkStatus = async () => {
        attempts++;
        const subscribed = await fetchSubscriptionStatus();
        if (subscribed) {
          success.value = 'Subscription activated successfully!';
          loading.value = false;
          // Clear success message after 5 seconds
          setTimeout(() => {
            success.value = '';
          }, 5000);
          return true;
        }
        if (attempts >= maxAttempts) {
          error.value = 'Subscription is taking longer than expected to activate. Please refresh the page in a few moments or contact support if the issue persists.';
          success.value = '';
          loading.value = false;
          return false;
        }

        // Continue checking
        setTimeout(checkStatus, 2000);
        return false;
      };
      await checkStatus();
    };
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(async () => {
      const urlParams = new URLSearchParams(window.location.search);

      // Check if returning from successful payment
      if (urlParams.has('success')) {
        await waitForSubscription();
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (urlParams.has('cancelled')) {
        error.value = 'Subscription cancelled. You can try again when ready.';
        await fetchSubscriptionStatus();
        loading.value = false;
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        await fetchSubscriptionStatus();
        loading.value = false;
      }
    });
    const handleCancelSubscription = async () => {
      if (!confirm('Are you sure you want to cancel your subscription? It will remain active until the end of your billing period.')) {
        return;
      }
      cancelling.value = true;
      error.value = '';
      try {
        const response = await fetch('/cancel', {
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (response.ok && data.success) {
          // Immediately reflect as not subscribed and show plans
          await fetchSubscriptionStatus();
          isSubscribed.value = false;
          success.value = 'Subscription cancelled.';
          // Optionally redirect to pricing/subscription to show plans cleanly
          setTimeout(() => {
            window.location.replace('/subscribe?cancelled=1');
          }, 500);
        } else {
          throw new Error(data.message || 'Failed to cancel subscription');
        }
      } catch (err) {
        console.error('Error cancelling subscription:', err);
        error.value = err.message || 'Error cancelling subscription. Please try again.';
      } finally {
        cancelling.value = false;
      }
    };
    const __returned__ = {
      csrfToken,
      PRICE_IDS,
      selectedPlan,
      loading,
      submitting,
      cancelling,
      error,
      success,
      isSubscribed,
      subscription,
      planDetails,
      planDisplayName,
      formatDate,
      fetchSubscriptionStatus,
      waitForSubscription,
      handleCancelSubscription,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref,
      onMounted: vue__WEBPACK_IMPORTED_MODULE_0__.onMounted,
      computed: vue__WEBPACK_IMPORTED_MODULE_0__.computed
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionForm.vue?vue&type=template&id=55d8ed6c&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionForm.vue?vue&type=template&id=55d8ed6c&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "subscription-wrapper"
};
const _hoisted_2 = {
  key: 0,
  class: "alert alert-success",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_3 = {
  key: 1,
  class: "alert alert-error",
  role: "alert",
  "aria-live": "assertive"
};
const _hoisted_4 = {
  key: 2,
  class: "loading"
};
const _hoisted_5 = {
  class: "subscription-details"
};
const _hoisted_6 = {
  class: "subscription-card"
};
const _hoisted_7 = {
  class: "plan-name"
};
const _hoisted_8 = {
  class: "ends-at"
};
const _hoisted_9 = ["disabled"];
const _hoisted_10 = {
  class: "plans"
};
const _hoisted_11 = {
  method: "POST",
  action: "/subscribe",
  class: "subscription-form"
};
const _hoisted_12 = ["value"];
const _hoisted_13 = ["value"];
const _hoisted_14 = ["value"];
const _hoisted_15 = ["disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _$setup$subscription, _$setup$subscription2;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", null, "Subscription", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Success Message "), $setup.success ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.success), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Error Message "), $setup.error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.error), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Loading State "), $setup.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_4, [...(_cache[1] || (_cache[1] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Loading subscription details...", -1 /* CACHED */)]))])) : $setup.isSubscribed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 3
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Subscribed View "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, "Active Subscription", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.planDisplayName), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$setup$subscription = $setup.subscription) !== null && _$setup$subscription !== void 0 && _$setup$subscription.ends_at ? 'Ends:' : 'Status:'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$setup$subscription2 = $setup.subscription) !== null && _$setup$subscription2 !== void 0 && _$setup$subscription2.ends_at ? $setup.formatDate($setup.subscription.ends_at) : 'Active'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: $setup.handleCancelSubscription,
    class: "btn btn-danger",
    disabled: $setup.cancelling
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.cancelling ? 'Cancelling...' : 'Cancel Subscription'), 9 /* TEXT, PROPS */, _hoisted_9)])])], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 4
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Subscription Selection View "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    id: "planHeading"
  }, "Choose Your Plan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "hidden",
    name: "_token",
    value: $setup.csrfToken
  }, null, 8 /* PROPS */, _hoisted_12), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    name: "price_lookup_key",
    required: "",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $setup.selectedPlan = $event),
    class: "form-control"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: $setup.PRICE_IDS.monthly
  }, "Premium Monthly (£1.99)", 8 /* PROPS */, _hoisted_13), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: $setup.PRICE_IDS.yearly
  }, "Premium Yearly (£17.99)", 8 /* PROPS */, _hoisted_14)], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $setup.selectedPlan]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-primary",
    disabled: $setup.submitting
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.submitting ? 'Processing...' : 'Subscribe'), 9 /* TEXT, PROPS */, _hoisted_15)])])], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionForm.vue?vue&type=style&index=0&id=55d8ed6c&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionForm.vue?vue&type=style&index=0&id=55d8ed6c&scoped=true&lang=css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.subscription-wrapper[data-v-55d8ed6c] {\n    max-width: 600px;\n    margin: 2rem auto;\n    padding: 0 1rem;\n}\nh1[data-v-55d8ed6c] {\n    font-size: 2rem;\n    margin-bottom: 1.5rem;\n    color: #333;\n}\n.alert[data-v-55d8ed6c] {\n    padding: 1rem;\n    border-radius: 8px;\n    margin-bottom: 1.5rem;\n}\n.alert-success[data-v-55d8ed6c] {\n    background-color: #d4edda;\n    border: 1px solid #c3e6cb;\n    color: #155724;\n}\n.alert-error[data-v-55d8ed6c] {\n    background-color: #f8d7da;\n    border: 1px solid #f5c6cb;\n    color: #721c24;\n}\n.loading[data-v-55d8ed6c] {\n    text-align: center;\n    padding: 2rem;\n    color: #666;\n}\n.subscription-card[data-v-55d8ed6c] {\n    background: #f8f9fa;\n    border: 1px solid #dee2e6;\n    border-radius: 8px;\n    padding: 2rem;\n    text-align: center;\n}\n.subscription-card h2[data-v-55d8ed6c] {\n    font-size: 1.5rem;\n    margin-bottom: 1rem;\n    color: #35a38b;\n}\n.plan-name[data-v-55d8ed6c] {\n    font-size: 1.25rem;\n    font-weight: 600;\n    margin-bottom: 0.5rem;\n    color: #333;\n}\n.ends-at[data-v-55d8ed6c] {\n    margin-bottom: 1.5rem;\n    color: #666;\n}\n.plans[data-v-55d8ed6c] {\n    background: #fff;\n    border: 1px solid #dee2e6;\n    border-radius: 8px;\n    padding: 2rem;\n}\n#planHeading[data-v-55d8ed6c] {\n    font-size: 1.5rem;\n    margin-bottom: 1.5rem;\n    color: #333;\n}\n.subscription-form[data-v-55d8ed6c] {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n}\n.form-control[data-v-55d8ed6c] {\n    border: 1px solid #dee2e6;\n    padding: 0.75rem;\n    border-radius: 6px;\n    width: 100%;\n    font-size: 1rem;\n}\n.btn[data-v-55d8ed6c] {\n    padding: 0.75rem 1.5rem;\n    border-radius: 6px;\n    border: none;\n    font-size: 1rem;\n    cursor: pointer;\n    transition: all 0.3s ease;\n}\n.btn[data-v-55d8ed6c]:disabled {\n    opacity: 0.6;\n    cursor: not-allowed;\n}\n.btn-primary[data-v-55d8ed6c] {\n    background-color: #35a38b;\n    color: white;\n}\n.btn-primary[data-v-55d8ed6c]:hover:not(:disabled) {\n    background-color: #2d8c77;\n}\n.btn-danger[data-v-55d8ed6c] {\n    background-color: #dc3545;\n    color: white;\n}\n.btn-danger[data-v-55d8ed6c]:hover:not(:disabled) {\n    background-color: #c82333;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionForm.vue?vue&type=style&index=0&id=55d8ed6c&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionForm.vue?vue&type=style&index=0&id=55d8ed6c&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionForm_vue_vue_type_style_index_0_id_55d8ed6c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SubscriptionForm.vue?vue&type=style&index=0&id=55d8ed6c&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionForm.vue?vue&type=style&index=0&id=55d8ed6c&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionForm_vue_vue_type_style_index_0_id_55d8ed6c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionForm_vue_vue_type_style_index_0_id_55d8ed6c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/SubscriptionForm.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/SubscriptionForm.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SubscriptionForm_vue_vue_type_template_id_55d8ed6c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SubscriptionForm.vue?vue&type=template&id=55d8ed6c&scoped=true */ "./resources/js/components/SubscriptionForm.vue?vue&type=template&id=55d8ed6c&scoped=true");
/* harmony import */ var _SubscriptionForm_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SubscriptionForm.vue?vue&type=script&setup=true&lang=js */ "./resources/js/components/SubscriptionForm.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _SubscriptionForm_vue_vue_type_style_index_0_id_55d8ed6c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SubscriptionForm.vue?vue&type=style&index=0&id=55d8ed6c&scoped=true&lang=css */ "./resources/js/components/SubscriptionForm.vue?vue&type=style&index=0&id=55d8ed6c&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_SubscriptionForm_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_SubscriptionForm_vue_vue_type_template_id_55d8ed6c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-55d8ed6c"],['__file',"resources/js/components/SubscriptionForm.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/SubscriptionForm.vue?vue&type=script&setup=true&lang=js":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/SubscriptionForm.vue?vue&type=script&setup=true&lang=js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionForm_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionForm_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SubscriptionForm.vue?vue&type=script&setup=true&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionForm.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/js/components/SubscriptionForm.vue?vue&type=style&index=0&id=55d8ed6c&scoped=true&lang=css":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/components/SubscriptionForm.vue?vue&type=style&index=0&id=55d8ed6c&scoped=true&lang=css ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionForm_vue_vue_type_style_index_0_id_55d8ed6c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SubscriptionForm.vue?vue&type=style&index=0&id=55d8ed6c&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionForm.vue?vue&type=style&index=0&id=55d8ed6c&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/SubscriptionForm.vue?vue&type=template&id=55d8ed6c&scoped=true":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/SubscriptionForm.vue?vue&type=template&id=55d8ed6c&scoped=true ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionForm_vue_vue_type_template_id_55d8ed6c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionForm_vue_vue_type_template_id_55d8ed6c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SubscriptionForm.vue?vue&type=template&id=55d8ed6c&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionForm.vue?vue&type=template&id=55d8ed6c&scoped=true");


/***/ })

}]);