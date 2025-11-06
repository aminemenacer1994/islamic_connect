"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_PricingComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PricingComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PricingComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'SubscriptionComponent',
  data() {
    var _document$querySelect, _window$appConfig, _window$appConfig2;
    return {
      csrfToken: ((_document$querySelect = document.querySelector('meta[name="csrf-token"]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getAttribute('content')) || '',
      selectedPlan: 'price_1SDrmPGsDD2PdzHqDOScwoI2',
      loading: true,
      submitting: false,
      cancelling: false,
      error: '',
      success: '',
      isSubscribed: false,
      subscription: null,
      faqs: [{
        question: 'Can I cancel my subscription anytime?',
        answer: 'Yes, you can cancel your subscription at any time. If you cancel, you\'ll continue to have access to premium features until the end of your current billing period.',
        open: false
      }, {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit and debit cards through our secure payment processor, Stripe.',
        open: false
      }, {
        question: 'Is there a free trial available?',
        answer: 'We don\'t currently offer a free trial, but we have a free tier with basic features. You can upgrade to premium anytime to unlock all features.',
        open: false
      }],
      plans: [{
        value: ((_window$appConfig = window.appConfig) === null || _window$appConfig === void 0 || (_window$appConfig = _window$appConfig.stripePrices) === null || _window$appConfig === void 0 ? void 0 : _window$appConfig.monthly) || 'price_1SKJCyGsDD2PdzHqUEaWiQkG',
        name: 'Monthly',
        price: '£1.99',
        period: 'per month',
        icon: 'fas fa-calendar-alt',
        badge: 'Flexible',
        featured: false,
        features: ['All premium features', 'Cancel anytime', 'Monthly billing', '24/7 support']
      }, {
        value: ((_window$appConfig2 = window.appConfig) === null || _window$appConfig2 === void 0 || (_window$appConfig2 = _window$appConfig2.stripePrices) === null || _window$appConfig2 === void 0 ? void 0 : _window$appConfig2.yearly) || 'price_1SKJCyGsDD2PdzHq4qsR1TRh',
        name: 'Yearly',
        price: '£17.99',
        period: 'per year',
        savings: 'Save £5.88 per year',
        icon: 'fas fa-star',
        badge: 'Most Popular',
        featured: true,
        features: ['All premium features', 'Best value', 'Annual billing', 'Priority support']
      }],
      planDetails: (_window$appConfig3 => {
        const ids = ((_window$appConfig3 = window.appConfig) === null || _window$appConfig3 === void 0 ? void 0 : _window$appConfig3.stripePrices) || {};
        return {
          [ids.monthly || 'price_1SKJCyGsDD2PdzHqUEaWiQkG']: 'Premium Monthly',
          [ids.yearly || 'price_1SKJCyGsDD2PdzHq4qsR1TRh']: 'Premium Yearly'
        };
      })()
    };
  },
  computed: {
    planDisplayName() {
      var _this$subscription;
      if (!((_this$subscription = this.subscription) !== null && _this$subscription !== void 0 && _this$subscription.stripe_price)) return 'Free';
      return this.planDetails[this.subscription.stripe_price] || 'Premium';
    }
  },
  mounted() {
    this.checkUrlParams();
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return 'Never';
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    },
    toggleFaq(index) {
      this.faqs[index].open = !this.faqs[index].open;
    },
    async fetchSubscriptionStatus() {
      try {
        const response = await fetch('/subscription-status', {
          headers: {
            'X-CSRF-TOKEN': this.csrfToken,
            'Accept': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Failed to fetch subscription status');
        const data = await response.json();
        this.isSubscribed = data.is_subscribed;
        this.subscription = {
          stripe_price: data.plan !== 'free' ? data.plan : null,
          ends_at: data.ends_at
        };
        return data.is_subscribed;
      } catch (err) {
        console.error('Error fetching subscription:', err);
        this.error = 'Error loading subscription status. Please refresh the page.';
        return false;
      }
    },
    async waitForSubscription() {
      this.success = 'Subscription successful! Activating your subscription...';
      let attempts = 0;
      const maxAttempts = 15;
      const checkStatus = async () => {
        attempts++;
        const subscribed = await this.fetchSubscriptionStatus();
        if (subscribed) {
          this.success = 'Subscription activated successfully! Welcome to Premium.';
          this.loading = false;
          setTimeout(() => {
            this.success = '';
          }, 5000);
          return true;
        }
        if (attempts >= maxAttempts) {
          this.error = 'Subscription is taking longer than expected. Please refresh the page or contact support.';
          this.success = '';
          this.loading = false;
          return false;
        }
        setTimeout(checkStatus, 2000);
        return false;
      };
      await checkStatus();
    },
    async checkUrlParams() {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('success')) {
        await this.waitForSubscription();
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (urlParams.has('cancelled')) {
        this.error = 'Subscription cancelled. You can try again when ready.';
        await this.fetchSubscriptionStatus();
        this.loading = false;
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        await this.fetchSubscriptionStatus();
        this.loading = false;
      }
    },
    async handleCancelSubscription() {
      if (!confirm('Are you sure you want to cancel your subscription? You will retain access until the end of your billing period.')) {
        return;
      }
      this.cancelling = true;
      this.error = '';
      try {
        const response = await fetch('/cancel', {
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': this.csrfToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (response.ok && data.success) {
          await this.fetchSubscriptionStatus();
          this.success = `Subscription cancelled. You'll have access until ${this.formatDate(data.ends_at)}.`;
          setTimeout(() => {
            this.success = '';
          }, 8000);
        } else {
          throw new Error(data.message || 'Failed to cancel subscription');
        }
      } catch (err) {
        console.error('Error cancelling subscription:', err);
        this.error = err.message || 'Error cancelling subscription. Please try again.';
      } finally {
        this.cancelling = false;
      }
    },
    handleSubmit(e) {
      this.submitting = true;
      e.target.submit();
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PricingComponent.vue?vue&type=template&id=d4146a7c&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PricingComponent.vue?vue&type=template&id=d4146a7c&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  id: "app",
  class: "subscription-container"
};
const _hoisted_2 = {
  class: "subscription-main"
};
const _hoisted_3 = {
  class: "container"
};
const _hoisted_4 = {
  key: 0,
  class: "notification success"
};
const _hoisted_5 = {
  key: 1,
  class: "notification error"
};
const _hoisted_6 = {
  key: 2,
  class: "loading-state"
};
const _hoisted_7 = {
  class: "active-subscription"
};
const _hoisted_8 = {
  class: "subscription-card"
};
const _hoisted_9 = {
  class: "card-header"
};
const _hoisted_10 = {
  class: "status-info"
};
const _hoisted_11 = {
  class: "status-item"
};
const _hoisted_12 = {
  class: "label"
};
const _hoisted_13 = {
  class: "value"
};
const _hoisted_14 = {
  class: "card-body"
};
const _hoisted_15 = ["disabled"];
const _hoisted_16 = {
  class: "plans-view"
};
const _hoisted_17 = {
  class: "plans-grid"
};
const _hoisted_18 = ["onClick"];
const _hoisted_19 = {
  key: 0,
  class: "plan-badge"
};
const _hoisted_20 = {
  class: "plan-header"
};
const _hoisted_21 = {
  class: "plan-icon"
};
const _hoisted_22 = {
  class: "plan-price"
};
const _hoisted_23 = {
  class: "amount"
};
const _hoisted_24 = {
  class: "period"
};
const _hoisted_25 = {
  key: 0,
  class: "savings"
};
const _hoisted_26 = {
  class: "plan-features"
};
const _hoisted_27 = {
  class: "plan-selector"
};
const _hoisted_28 = ["id", "value"];
const _hoisted_29 = ["for"];
const _hoisted_30 = {
  class: "payment-section"
};
const _hoisted_31 = ["value"];
const _hoisted_32 = ["value"];
const _hoisted_33 = ["disabled"];
const _hoisted_34 = {
  class: "faq-section"
};
const _hoisted_35 = {
  class: "container"
};
const _hoisted_36 = {
  class: "faq-list"
};
const _hoisted_37 = ["onClick"];
const _hoisted_38 = {
  key: 0,
  class: "faq-answer"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _$data$subscription, _$data$subscription2;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Header Section "), _cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", {
    class: "subscription-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "container"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "header-content"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", null, "Subscription Management"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Manage your Islamic Connect subscription. Unlock premium features and support our mission.")])])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("main", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Notifications "), $data.success ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_4, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-check-circle"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.success), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[0] || (_cache[0] = $event => $data.success = ''),
    class: "close-btn"
  }, [...(_cache[5] || (_cache[5] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-times"
  }, null, -1 /* CACHED */)]))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-exclamation-triangle"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.error), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[1] || (_cache[1] = $event => $data.error = ''),
    class: "close-btn"
  }, [...(_cache[7] || (_cache[7] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-times"
  }, null, -1 /* CACHED */)]))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Loading State "), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_6, [...(_cache[9] || (_cache[9] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Loading subscription details...", -1 /* CACHED */)]))])) : $data.isSubscribed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 3
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Active Subscription View "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-badge"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-crown"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Active Subscription ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "status-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-check-circle"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.planDisplayName), 1 /* TEXT */), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "subtitle"
  }, "You're currently subscribed", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$data$subscription = $data.subscription) !== null && _$data$subscription !== void 0 && _$data$subscription.ends_at ? 'Access until' : 'Status'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$data$subscription2 = $data.subscription) !== null && _$data$subscription2 !== void 0 && _$data$subscription2.ends_at ? $options.formatDate($data.subscription.ends_at) : 'Active & Unlimited'), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<h3 data-v-d4146a7c>Premium Benefits</h3><div class=\"benefits-list\" data-v-d4146a7c><div class=\"benefit-item\" data-v-d4146a7c><i class=\"fas fa-check\" data-v-d4146a7c></i><span data-v-d4146a7c>Ad-free experience</span></div><div class=\"benefit-item\" data-v-d4146a7c><i class=\"fas fa-check\" data-v-d4146a7c></i><span data-v-d4146a7c>Offline access to content</span></div><div class=\"benefit-item\" data-v-d4146a7c><i class=\"fas fa-check\" data-v-d4146a7c></i><span data-v-d4146a7c>Advanced prayer time settings</span></div><div class=\"benefit-item\" data-v-d4146a7c><i class=\"fas fa-check\" data-v-d4146a7c></i><span data-v-d4146a7c>Priority support</span></div><div class=\"benefit-item\" data-v-d4146a7c><i class=\"fas fa-check\" data-v-d4146a7c></i><span data-v-d4146a7c>Early access to new features</span></div></div>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[2] || (_cache[2] = (...args) => $options.handleCancelSubscription && $options.handleCancelSubscription(...args)),
    class: "btn btn-cancel",
    disabled: $data.cancelling
  }, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-times-circle"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.cancelling ? 'Cancelling...' : 'Cancel Subscription'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_15)])])])], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 4
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Subscription Plans View "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "plans-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, "Choose Your Plan"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Select the plan that works best for you")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    method: "POST",
    action: "/subscribe",
    onSubmit: _cache[4] || (_cache[4] = (...args) => $options.handleSubmit && $options.handleSubmit(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Plans Grid "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.plans, plan => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: plan.value,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["plan-card", {
        'featured': plan.featured,
        'selected': plan.value === $data.selectedPlan
      }]),
      onClick: $event => $data.selectedPlan = plan.value
    }, [plan.featured ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.badge), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(plan.icon)
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.price), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.period), 1 /* TEXT */)]), plan.savings ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.savings), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(plan.features, feature => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: feature,
        class: "feature-item"
      }, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-check"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(feature), 1 /* TEXT */)]);
    }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "radio",
      id: plan.value,
      value: plan.value,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.selectedPlan = $event),
      class: "radio-input"
    }, null, 8 /* PROPS */, _hoisted_28), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.selectedPlan]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      for: plan.value,
      class: "radio-label"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.value === $data.selectedPlan ? 'Selected' : 'Select Plan'), 9 /* TEXT, PROPS */, _hoisted_29)])], 10 /* CLASS, PROPS */, _hoisted_18);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Payment Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "hidden",
    name: "_token",
    value: $data.csrfToken
  }, null, 8 /* PROPS */, _hoisted_31), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "hidden",
    name: "price_lookup_key",
    value: $data.selectedPlan
  }, null, 8 /* PROPS */, _hoisted_32), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-primary",
    disabled: $data.submitting
  }, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-credit-card"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.submitting ? 'Processing...' : 'Continue to Payment'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_33), _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "security-note"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-lock"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Secure payment powered by Stripe ")], -1 /* CACHED */))])], 32 /* NEED_HYDRATION */)])], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" FAQ Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "faq-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Frequently Asked Questions")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.faqs, (faq, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: index,
      class: "faq-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "faq-question",
      onClick: $event => $options.toggleFaq(index)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.question), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas fa-chevron-down", {
        'open': faq.open
      }])
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_37), faq.open ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.answer), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))])])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PricingComponent.vue?vue&type=style&index=0&id=d4146a7c&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PricingComponent.vue?vue&type=style&index=0&id=d4146a7c&scoped=true&lang=css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\n/* Base Styles */\n.subscription-container[data-v-d4146a7c] {\n  min-height: 100vh;\n  background-color: #f8fafc;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n}\n.container[data-v-d4146a7c] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 20px;\n}\n/* Header */\n.subscription-header[data-v-d4146a7c] {\n  background: white;\n  padding: 60px 0 40px;\n  text-align: center;\n  border-bottom: 1px solid #e2e8f0;\n}\n.header-content h1[data-v-d4146a7c] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  color: #1e293b;\n  margin-bottom: 16px;\n}\n.header-content p[data-v-d4146a7c] {\n  font-size: 1.125rem;\n  color: #64748b;\n  max-width: 600px;\n  margin: 0 auto;\n  line-height: 1.6;\n}\n/* Notifications */\n.notification[data-v-d4146a7c] {\n  display: flex;\n  align-items: center;\n  padding: 16px 20px;\n  border-radius: 8px;\n  margin-bottom: 24px;\n  gap: 12px;\n}\n.notification.success[data-v-d4146a7c] {\n  background: #f0fdf4;\n  border: 1px solid #bbf7d0;\n  color: #166534;\n}\n.notification.error[data-v-d4146a7c] {\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  color: #991b1b;\n}\n.notification i[data-v-d4146a7c] {\n  flex-shrink: 0;\n}\n.close-btn[data-v-d4146a7c] {\n  background: none;\n  border: none;\n  color: inherit;\n  cursor: pointer;\n  margin-left: auto;\n  padding: 4px;\n}\n/* Loading State */\n.loading-state[data-v-d4146a7c] {\n  text-align: center;\n  padding: 80px 0;\n}\n.spinner[data-v-d4146a7c] {\n  width: 48px;\n  height: 48px;\n  border: 4px solid #e2e8f0;\n  border-top: 4px solid #35a38b;\n  border-radius: 50%;\n  animation: spin-d4146a7c 1s linear infinite;\n  margin: 0 auto 20px;\n}\n.loading-state p[data-v-d4146a7c] {\n  color: #64748b;\n  font-size: 1rem;\n}\n@keyframes spin-d4146a7c {\n0% { transform: rotate(0deg);\n}\n100% { transform: rotate(360deg);\n}\n}\n/* Subscription Card */\n.subscription-card[data-v-d4146a7c] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n  max-width: 500px;\n  margin: 0 auto;\n  position: relative;\n  overflow: hidden;\n}\n.card-badge[data-v-d4146a7c] {\n  background: #35a38b;\n  color: white;\n  padding: 12px 20px;\n  text-align: center;\n  font-weight: 600;\n  font-size: 0.875rem;\n}\n.card-badge i[data-v-d4146a7c] {\n  margin-right: 8px;\n}\n.card-header[data-v-d4146a7c] {\n  padding: 40px 32px 24px;\n  text-align: center;\n}\n.status-icon[data-v-d4146a7c] {\n  width: 80px;\n  height: 80px;\n  background: #e0f7f5;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 20px;\n  color: #35a38b;\n  font-size: 2rem;\n}\n.card-header h2[data-v-d4146a7c] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #1e293b;\n  margin-bottom: 8px;\n}\n.subtitle[data-v-d4146a7c] {\n  color: #64748b;\n  margin-bottom: 24px;\n}\n.status-info[data-v-d4146a7c] {\n  background: #f8fafc;\n  border-radius: 8px;\n  padding: 20px;\n}\n.status-item[data-v-d4146a7c] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n}\n.label[data-v-d4146a7c] {\n  font-size: 0.875rem;\n  color: #64748b;\n}\n.value[data-v-d4146a7c] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #35a38b;\n}\n.card-body[data-v-d4146a7c] {\n  padding: 0 32px 32px;\n}\n.card-body h3[data-v-d4146a7c] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #1e293b;\n  margin-bottom: 20px;\n  text-align: center;\n}\n.benefits-list[data-v-d4146a7c] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 32px;\n}\n.benefit-item[data-v-d4146a7c] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 0;\n}\n.benefit-item i[data-v-d4146a7c] {\n  color: #35a38b;\n  flex-shrink: 0;\n}\n.benefit-item span[data-v-d4146a7c] {\n  color: #475569;\n}\n/* Buttons */\n.btn[data-v-d4146a7c] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  width: 100%;\n  padding: 16px 24px;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 1rem;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn[data-v-d4146a7c]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-primary[data-v-d4146a7c] {\n  background: #35a38b;\n  color: white;\n}\n.btn-primary[data-v-d4146a7c]:hover:not(:disabled) {\n  background: #2d8c77;\n}\n.btn-cancel[data-v-d4146a7c] {\n  background: white;\n  color: #dc2626;\n  border: 1px solid #dc2626;\n}\n.btn-cancel[data-v-d4146a7c]:hover:not(:disabled) {\n  background: #fef2f2;\n}\n/* Plans View */\n.plans-view[data-v-d4146a7c] {\n  padding: 40px 0;\n}\n.plans-header[data-v-d4146a7c] {\n  text-align: center;\n  margin-bottom: 48px;\n}\n.plans-header h2[data-v-d4146a7c] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #1e293b;\n  margin-bottom: 12px;\n}\n.plans-header p[data-v-d4146a7c] {\n  color: #64748b;\n  font-size: 1.125rem;\n}\n/* Plans Grid */\n.plans-grid[data-v-d4146a7c] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 24px;\n  margin-bottom: 48px;\n}\n.plan-card[data-v-d4146a7c] {\n  background: white;\n  border: 2px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 32px;\n  position: relative;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.plan-card[data-v-d4146a7c]:hover {\n  border-color: #35a38b;\n}\n.plan-card.selected[data-v-d4146a7c] {\n  border-color: #35a38b;\n  background: #f0fdfa;\n}\n.plan-card.featured[data-v-d4146a7c] {\n  border-color: #35a38b;\n}\n.plan-badge[data-v-d4146a7c] {\n  position: absolute;\n  top: -12px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: #35a38b;\n  color: white;\n  padding: 6px 16px;\n  border-radius: 20px;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.plan-header[data-v-d4146a7c] {\n  text-align: center;\n  margin-bottom: 24px;\n}\n.plan-icon[data-v-d4146a7c] {\n  width: 64px;\n  height: 64px;\n  background: #e0f7f5;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 16px;\n  color: #35a38b;\n  font-size: 1.5rem;\n}\n.plan-header h3[data-v-d4146a7c] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #1e293b;\n  margin-bottom: 12px;\n}\n.plan-price[data-v-d4146a7c] {\n  margin-bottom: 8px;\n}\n.amount[data-v-d4146a7c] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  color: #1e293b;\n}\n.period[data-v-d4146a7c] {\n  color: #64748b;\n  font-size: 1rem;\n}\n.savings[data-v-d4146a7c] {\n  color: #059669;\n  font-weight: 600;\n  font-size: 0.875rem;\n  margin: 0;\n}\n.plan-features[data-v-d4146a7c] {\n  margin-bottom: 24px;\n}\n.feature-item[data-v-d4146a7c] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 8px 0;\n}\n.feature-item i[data-v-d4146a7c] {\n  color: #35a38b;\n  flex-shrink: 0;\n  font-size: 0.875rem;\n}\n.feature-item span[data-v-d4146a7c] {\n  color: #475569;\n  font-size: 0.875rem;\n}\n.plan-selector[data-v-d4146a7c] {\n  margin-top: auto;\n}\n.radio-input[data-v-d4146a7c] {\n  display: none;\n}\n.radio-label[data-v-d4146a7c] {\n  display: block;\n  text-align: center;\n  padding: 12px 16px;\n  background: #35a38b;\n  color: white;\n  border-radius: 6px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.radio-label[data-v-d4146a7c]:hover {\n  background: #2d8c77;\n}\n.plan-card.selected .radio-label[data-v-d4146a7c] {\n  background: #2d8c77;\n}\n/* Payment Section */\n.payment-section[data-v-d4146a7c] {\n  text-align: center;\n  max-width: 400px;\n  margin: 0 auto;\n}\n.security-note[data-v-d4146a7c] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  color: #64748b;\n  font-size: 0.875rem;\n  margin-top: 16px;\n}\n/* FAQ Section */\n.faq-section[data-v-d4146a7c] {\n  background: white;\n  padding: 80px 0;\n  border-top: 1px solid #e2e8f0;\n}\n.faq-header[data-v-d4146a7c] {\n  text-align: center;\n  margin-bottom: 48px;\n}\n.faq-header h3[data-v-d4146a7c] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #1e293b;\n}\n.faq-list[data-v-d4146a7c] {\n  max-width: 800px;\n  margin: 0 auto;\n}\n.faq-item[data-v-d4146a7c] {\n  border-bottom: 1px solid #e2e8f0;\n}\n.faq-question[data-v-d4146a7c] {\n  display: flex;\n  align-items: center;\n  justify-content: between;\n  padding: 24px 0;\n  cursor: pointer;\n  gap: 16px;\n}\n.faq-question h4[data-v-d4146a7c] {\n  flex: 1;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1e293b;\n  margin: 0;\n}\n.faq-question i[data-v-d4146a7c] {\n  color: #64748b;\n  transition: transform 0.2s;\n}\n.faq-question i.open[data-v-d4146a7c] {\n  transform: rotate(180deg);\n}\n.faq-answer[data-v-d4146a7c] {\n  padding-bottom: 24px;\n}\n.faq-answer p[data-v-d4146a7c] {\n  color: #64748b;\n  line-height: 1.6;\n  margin: 0;\n}\n/* Responsive Design */\n@media (max-width: 768px) {\n.container[data-v-d4146a7c] {\n    padding: 0 16px;\n}\n.subscription-header[data-v-d4146a7c] {\n    padding: 40px 0 32px;\n}\n.header-content h1[data-v-d4146a7c] {\n    font-size: 2rem;\n}\n.plans-grid[data-v-d4146a7c] {\n    grid-template-columns: 1fr;\n    gap: 20px;\n}\n.plan-card[data-v-d4146a7c] {\n    padding: 24px;\n}\n.card-header[data-v-d4146a7c] {\n    padding: 32px 24px 20px;\n}\n.card-body[data-v-d4146a7c] {\n    padding: 0 24px 24px;\n}\n.faq-section[data-v-d4146a7c] {\n    padding: 60px 0;\n}\n.faq-question h4[data-v-d4146a7c] {\n    font-size: 1rem;\n}\n}\n@media (max-width: 480px) {\n.header-content h1[data-v-d4146a7c] {\n    font-size: 1.75rem;\n}\n.plans-header h2[data-v-d4146a7c] {\n    font-size: 1.75rem;\n}\n.amount[data-v-d4146a7c] {\n    font-size: 2rem;\n}\n.notification[data-v-d4146a7c] {\n    padding: 12px 16px;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PricingComponent.vue?vue&type=style&index=0&id=d4146a7c&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PricingComponent.vue?vue&type=style&index=0&id=d4146a7c&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PricingComponent_vue_vue_type_style_index_0_id_d4146a7c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PricingComponent.vue?vue&type=style&index=0&id=d4146a7c&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PricingComponent.vue?vue&type=style&index=0&id=d4146a7c&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PricingComponent_vue_vue_type_style_index_0_id_d4146a7c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PricingComponent_vue_vue_type_style_index_0_id_d4146a7c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/PricingComponent.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/PricingComponent.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PricingComponent_vue_vue_type_template_id_d4146a7c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PricingComponent.vue?vue&type=template&id=d4146a7c&scoped=true */ "./resources/js/components/PricingComponent.vue?vue&type=template&id=d4146a7c&scoped=true");
/* harmony import */ var _PricingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PricingComponent.vue?vue&type=script&lang=js */ "./resources/js/components/PricingComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _PricingComponent_vue_vue_type_style_index_0_id_d4146a7c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PricingComponent.vue?vue&type=style&index=0&id=d4146a7c&scoped=true&lang=css */ "./resources/js/components/PricingComponent.vue?vue&type=style&index=0&id=d4146a7c&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_PricingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PricingComponent_vue_vue_type_template_id_d4146a7c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-d4146a7c"],['__file',"resources/js/components/PricingComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/PricingComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/components/PricingComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PricingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PricingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PricingComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PricingComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/PricingComponent.vue?vue&type=style&index=0&id=d4146a7c&scoped=true&lang=css":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/components/PricingComponent.vue?vue&type=style&index=0&id=d4146a7c&scoped=true&lang=css ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PricingComponent_vue_vue_type_style_index_0_id_d4146a7c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PricingComponent.vue?vue&type=style&index=0&id=d4146a7c&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PricingComponent.vue?vue&type=style&index=0&id=d4146a7c&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/PricingComponent.vue?vue&type=template&id=d4146a7c&scoped=true":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/PricingComponent.vue?vue&type=template&id=d4146a7c&scoped=true ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PricingComponent_vue_vue_type_template_id_d4146a7c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PricingComponent_vue_vue_type_template_id_d4146a7c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PricingComponent.vue?vue&type=template&id=d4146a7c&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PricingComponent.vue?vue&type=template&id=d4146a7c&scoped=true");


/***/ })

}]);