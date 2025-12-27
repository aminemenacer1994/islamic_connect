"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_SubscriptionComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'SubscriptionComponent',
  data() {
    var _document$querySelect, _window$appConfig, _window$appConfig2, _window$appConfig3;
    return {
      csrfToken: ((_document$querySelect = document.querySelector('meta[name="csrf-token"]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getAttribute('content')) || '',
      selectedPlan: ((_window$appConfig = window.appConfig) === null || _window$appConfig === void 0 || (_window$appConfig = _window$appConfig.stripePrices) === null || _window$appConfig === void 0 ? void 0 : _window$appConfig.monthly) || 'price_1SKJCyGsDD2PdzHqUEaWiQkG',
      billingCycle: 'monthly',
      loading: true,
      submitting: false,
      cancelling: false,
      error: '',
      success: '',
      isAuthenticated: true,
      isSubscribed: false,
      subscription: null,
      showSuccessImage: false,
      isCancelled: false,
      debugInfo: true,
      faqs: [{
        question: 'Can I cancel my subscription anytime?',
        answer: 'Yes, you can cancel your subscription at any time through this page. Once cancelled, your access to premium features will end immediately, and you will revert to the free tier. No further charges will be applied.',
        open: false
      }, {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit and debit cards, including Visa, MasterCard, and American Express, processed securely through Stripe. Additional payment methods may be available depending on your region.',
        open: false
      }, {
        question: 'Is there a free trial available?',
        answer: 'While we don’t offer a free trial, our Basic plan is free forever and includes core features. You can upgrade to a premium plan at any time to access advanced features and support our mission.',
        open: false
      }, {
        question: 'What happens if I cancel my subscription?',
        answer: 'Upon cancellation, your access to premium features will end immediately. You’ll retain access to the Basic plan’s features. If you choose to resubscribe later, you can select a new plan without any penalties.',
        open: false
      }, {
        question: 'Can I switch between plans?',
        answer: 'Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the change takes effect immediately. If you downgrade, the new plan will apply at the start of your next billing cycle.',
        open: false
      }],
      plans: [{
        value: '',
        name: 'Basic',
        price: '£0',
        period: '',
        icon: 'fas fa-moon',
        badge: 'Free Forever',
        featured: false,
        description: 'Full access to all core Islamic resources   no payment required.',
        features: ['Quran with audio recitation and translation', 'Quran history', 'Names of Allah', 'Image gallery', 'Dua collection', 'Prayer times', 'Islamic guides']
      }, {
        value: ((_window$appConfig2 = window.appConfig) === null || _window$appConfig2 === void 0 || (_window$appConfig2 = _window$appConfig2.stripePrices) === null || _window$appConfig2 === void 0 ? void 0 : _window$appConfig2.monthly) || 'price_1SKJCyGsDD2PdzHqUEaWiQkG',
        name: 'Monthly',
        price: '£1.99',
        period: ' per month',
        icon: 'fas fa-star',
        badge: 'Most Popular',
        featured: true,
        description: 'Unlock powerful tools that help you learn, reflect, and stay inspired every day.',
        features: ['All of the basic features', 'Quran with Smart Search & Accessibility', 'Audio podcasts', 'Reciters station', 'Islamic directory video channels', 'Short form video gallery', 'Seerah timeline', 'Interactive zakat calculator', 'Qibla finder', 'Islamic services']
      }, {
        value: ((_window$appConfig3 = window.appConfig) === null || _window$appConfig3 === void 0 || (_window$appConfig3 = _window$appConfig3.stripePrices) === null || _window$appConfig3 === void 0 ? void 0 : _window$appConfig3.yearly) || 'price_1SKJCyGsDD2PdzHq4qsR1TRh',
        name: 'Yearly',
        price: '£17.99',
        period: 'per year',
        icon: 'fas fa-infinity',
        badge: 'Best Deal',
        savings: 'Save £5.89',
        featured: false,
        description: 'Best value for those dedicated to lifelong learning, enjoy all Monthly benefits at a discounted rate.',
        features: ['All of the basic features', 'Quran with Smart Search & Accessibility', 'Audio podcasts', 'Reciters station', 'Islamic directory video channels', 'Short form video gallery', 'Seerah timeline', 'Islamic guides', 'Interactive zakat calculator', 'Qibla finder', 'Islamic services']
      }],
      planDetails: (_window$appConfig4 => {
        const ids = ((_window$appConfig4 = window.appConfig) === null || _window$appConfig4 === void 0 ? void 0 : _window$appConfig4.stripePrices) || {};
        return {
          [ids.monthly || 'price_1SKJCyGsDD2PdzHqUEaWiQkG']: 'Premium Monthly',
          [ids.yearly || 'price_1SKJCyGsDD2PdzHq4qsR1TRh']: 'Premium Yearly'
        };
      })()
    };
  },
  computed: {
    filteredPlans() {
      const base = this.plans.find(p => p.value === '');
      const premium = this.plans.find(p => this.billingCycle === 'monthly' ? p.name === 'Monthly' : p.name === 'Yearly');
      return [base, premium].filter(Boolean);
    },
    yearlySavings() {
      const yearly = this.plans.find(p => p.name === 'Yearly');
      return (yearly === null || yearly === void 0 ? void 0 : yearly.savings) || '';
    },
    planDisplayName() {
      var _this$subscription;
      return (_this$subscription = this.subscription) !== null && _this$subscription !== void 0 && _this$subscription.stripe_price && this.planDetails[this.subscription.stripe_price] ? this.planDetails[this.subscription.stripe_price] : 'Free';
    },
    canCancel() {
      var _this$subscription2;
      const currentDate = new Date();
      const endsAtDate = (_this$subscription2 = this.subscription) !== null && _this$subscription2 !== void 0 && _this$subscription2.ends_at ? new Date(this.subscription.ends_at) : null;
      return endsAtDate ? endsAtDate > currentDate && !this.isCancelled : !this.isCancelled;
    },
    showPlans() {
      return !this.isSubscribed;
    },
    subscriptionStatus() {
      var _this$subscription3;
      if (!this.isSubscribed) return 'Free';
      const endsAtDate = (_this$subscription3 = this.subscription) !== null && _this$subscription3 !== void 0 && _this$subscription3.ends_at ? new Date(this.subscription.ends_at) : null;
      const currentDate = new Date();
      return endsAtDate && endsAtDate <= currentDate ? 'Cancelled' : 'Active & Unlimited';
    },
    isCancelled() {
      var _this$subscription4;
      return this.isCancelled || ((_this$subscription4 = this.subscription) === null || _this$subscription4 === void 0 ? void 0 : _this$subscription4.ends_at) && new Date(this.subscription.ends_at) > new Date() && this.success.includes('Subscription canceled');
    }
  },
  mounted() {
    this.checkSubscriptionStatus();
    this.checkUrlParams();

    // Initialize billing cycle to monthly (no persistence)
    this.setBillingCycle('monthly');
    if (window.flashError) {
      this.error = window.flashError;
      delete window.flashError;
    }
    if (window.flashSuccess) {
      this.success = window.flashSuccess;
      delete window.flashSuccess;
    }
  },
  methods: {
    setBillingCycle(cycle) {
      if (cycle === this.billingCycle) return;
      this.billingCycle = cycle;
      const target = this.plans.find(p => cycle === 'monthly' ? p.name === 'Monthly' : p.name === 'Yearly');
      if (this.selectedPlan !== '' && target && this.selectedPlan !== target.value) {
        this.selectedPlan = target.value;
      }
    },
    formatDate(dateString) {
      return dateString ? new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }) : 'Never';
    },
    toggleFaq(index) {
      this.faqs[index].open = !this.faqs[index].open;
    },
    async checkAuthentication() {
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/user', {
          headers: {
            'X-CSRF-TOKEN': this.csrfToken,
            'Accept': 'application/json'
          }
        });
        this.isAuthenticated = !!response.data;
      } catch (error) {
        console.error('Authentication error:', error);
        // Avoid setting error on initial load
      }
    },
    async fetchSubscriptionStatus() {
      try {
        const response = await fetch('/subscription-status', {
          headers: {
            'X-CSRF-TOKEN': this.csrfToken,
            'Accept': 'application/json'
          }
        });
        if (response.status === 401) {
          this.isSubscribed = false;
          this.subscription = null;
          this.isCancelled = false;
          this.loading = false;
          return false;
        }
        if (!response.ok) throw new Error('Failed to load subscription details');
        const data = await response.json();
        if (data.is_subscribed !== undefined && data.plan !== undefined) {
          this.isSubscribed = data.is_subscribed;
          this.subscription = data.is_subscribed ? {
            stripe_price: data.plan,
            ends_at: data.ends_at
          } : null;
          this.isCancelled = data.is_subscribed && data.ends_at && new Date(data.ends_at) > new Date();
        } else {
          this.isSubscribed = false;
          this.subscription = null;
          this.isCancelled = false;
        }
        this.loading = false;
        return data.is_subscribed;
      } catch (err) {
        console.error('Error loading subscription:', err);
        this.isSubscribed = false;
        this.subscription = null;
        this.isCancelled = false;
        this.loading = false;
        return false;
      }
    },
    async checkSubscriptionStatus() {
      this.loading = true;
      await this.fetchSubscriptionStatus();
    },
    async checkUrlParams() {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('success')) {
        this.isAuthenticated = true;
        const subscribed = await this.fetchSubscriptionStatus();
        if (subscribed) {
          this.showSuccessImage = true;
          this.success = 'Your premium subscription is now active! Explore your exclusive features now.';
          setTimeout(() => this.success = '', 5000);
        }
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (urlParams.has('cancelled')) {
        await this.fetchSubscriptionStatus();
        this.success = 'Your subscription has been cancelled. You can resubscribe anytime to regain premium access.';
        setTimeout(() => this.success = '', 5000);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        await this.fetchSubscriptionStatus();
      }
    },
    async waitForSubscription() {
      let attempts = 0;
      const maxAttempts = 15;
      while (attempts < maxAttempts) {
        attempts++;
        const subscribed = await this.fetchSubscriptionStatus();
        if (subscribed) {
          this.showSuccessImage = true;
          this.success = 'Premium subscription activated successfully! Start exploring your benefits.';
          setTimeout(() => this.success = '', 5000);
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      this.error = 'Subscription activation is taking longer than expected. Please refresh the page or contact our support team.';
      this.success = '';
    },
    clearNotification() {
      this.error = '';
      this.success = '';
    },
    getPlanBenefits() {
      const plan = this.plans.find(p => {
        var _this$subscription5;
        return p.value === ((_this$subscription5 = this.subscription) === null || _this$subscription5 === void 0 ? void 0 : _this$subscription5.stripe_price);
      });
      return plan ? plan.features : ['Basic access to core features'];
    },
    async handleCancelSubscription() {
      const modal = new bootstrap.Modal(document.getElementById('cancelConfirmationModal'));
      modal.show();
      document.getElementById('confirmCancel').onclick = async () => {
        modal.hide();
        this.cancelling = true;
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
            this.isCancelled = true;
            await this.fetchSubscriptionStatus();
            this.success = 'Your subscription has been successfully cancelled. Access to premium features has ended.';
            setTimeout(() => this.success = '', 5000);
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          } else if (data.message && data.message.includes('canceled subscription')) {
            this.isCancelled = true;
            await this.fetchSubscriptionStatus();
            this.success = 'Your subscription is already cancelled. No further action is needed.';
            setTimeout(() => this.success = '', 5000);
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          } else {
            throw new Error(data.message || 'Failed to cancel your subscription.');
          }
        } catch (err) {
          this.error = err.message || 'An error occurred while cancelling your subscription. Please try again or contact support.';
        } finally {
          this.cancelling = false;
        }
      };
      document.getElementById('cancelDismiss').onclick = () => modal.hide();
    },
    showAlert(type, message) {
      const alertContainer = document.getElementById('alertContainer');
      if (!alertContainer) return;
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
      alertDiv.setAttribute('role', 'alert');
      alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      alertContainer.appendChild(alertDiv);
      setTimeout(() => {
        const alertInstance = bootstrap.Alert.getOrCreateInstance(alertDiv);
        alertInstance.close();
      }, 8000);
    },
    async waitForCancellationUpdate() {
      let attempts = 0;
      const maxAttempts = 10;
      while (attempts < maxAttempts) {
        var _this$subscription6;
        await this.fetchSubscriptionStatus();
        const endsAtDate = (_this$subscription6 = this.subscription) !== null && _this$subscription6 !== void 0 && _this$subscription6.ends_at ? new Date(this.subscription.ends_at) : null;
        const currentDate = new Date();
        if (!endsAtDate || endsAtDate <= currentDate) {
          return;
        }
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    },
    async handleSubmit() {
      this.submitting = true;
      this.error = '';
      this.success = '';
      try {
        var _document$querySelect2;
        const csrfToken = (_document$querySelect2 = document.querySelector('meta[name="csrf-token"]')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.getAttribute('content');
        if (!csrfToken) {
          throw new Error('Session expired. Please refresh the page to continue.');
        }
        const response = await fetch('/subscribe', {
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          body: JSON.stringify({
            price_lookup_key: this.selectedPlan
          })
        });

        // Handle unauthorized or login redirects explicitly
        if (response.redirected || response.status === 401) {
          this.error = 'Please log in to proceed to checkout.';
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          return;
        }

        // Safely parse JSON only when appropriate
        const contentType = response.headers.get('content-type') || '';
        const isJson = contentType.includes('application/json');
        const data = isJson ? await response.json() : null;
        if (response.ok && data !== null && data !== void 0 && data.redirect) {
          window.location.href = data.redirect;
          return;
        }
        if (data !== null && data !== void 0 && data.errors) {
          this.error = Object.values(data.errors).flat().join(' ');
        } else if (data !== null && data !== void 0 && data.message) {
          this.error = data.message;
        } else {
          this.error = 'An error occurred during payment processing. Please try again.';
        }

        // Ensure the user sees the error at the top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } catch (error) {
        this.error = error.message || 'A network error occurred. Please check your connection and try again.';
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } finally {
        this.submitting = false;
      }
    }
  },
  watch: {
    error(newVal) {
      if (newVal) setTimeout(() => this.error = '', 5000);
    },
    subscription: {
      handler(newVal) {
        console.log('watch - Subscription updated:', JSON.stringify(newVal, null, 2));
      },
      deep: true
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionComponent.vue?vue&type=template&id=0ca26305&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionComponent.vue?vue&type=template&id=0ca26305&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  class: "notification notification-success"
};
const _hoisted_5 = {
  key: 1,
  class: "notification notification-error"
};
const _hoisted_6 = {
  key: 2,
  class: "loading-state"
};
const _hoisted_7 = {
  key: 3,
  class: "success-image-container"
};
const _hoisted_8 = {
  key: 4,
  class: "active-subscription"
};
const _hoisted_9 = {
  class: "subscription-card"
};
const _hoisted_10 = {
  class: "card-header"
};
const _hoisted_11 = {
  class: "status-item"
};
const _hoisted_12 = {
  class: "card-body"
};
const _hoisted_13 = {
  class: "benefits-list"
};
const _hoisted_14 = ["disabled", "title"];
const _hoisted_15 = {
  key: 5,
  class: "plans-view"
};
const _hoisted_16 = {
  key: 0,
  class: "notification notification-info"
};
const _hoisted_17 = {
  class: "plans-header"
};
const _hoisted_18 = {
  class: "billing-toggle",
  role: "tablist",
  "aria-label": "Billing cycle"
};
const _hoisted_19 = ["aria-selected"];
const _hoisted_20 = ["aria-selected"];
const _hoisted_21 = {
  class: "plans-grid"
};
const _hoisted_22 = ["onClick"];
const _hoisted_23 = {
  key: 0,
  class: "plan-badge"
};
const _hoisted_24 = {
  class: "plan-header"
};
const _hoisted_25 = {
  class: "plan-icon"
};
const _hoisted_26 = {
  class: "plan-price"
};
const _hoisted_27 = {
  class: "amount"
};
const _hoisted_28 = {
  class: "period"
};
const _hoisted_29 = {
  key: 0,
  class: "savings"
};
const _hoisted_30 = {
  class: "plan-description"
};
const _hoisted_31 = {
  class: "plan-features"
};
const _hoisted_32 = {
  class: "plan-selector"
};
const _hoisted_33 = {
  key: 0,
  href: "/",
  class: "radio-label btn-get-started"
};
const _hoisted_34 = ["id", "value"];
const _hoisted_35 = ["for", "title"];
const _hoisted_36 = {
  class: "payment-section"
};
const _hoisted_37 = ["value"];
const _hoisted_38 = ["value"];
const _hoisted_39 = ["disabled"];
const _hoisted_40 = {
  class: "faq-section"
};
const _hoisted_41 = {
  class: "container"
};
const _hoisted_42 = {
  class: "faq-list"
};
const _hoisted_43 = ["onClick"];
const _hoisted_44 = {
  key: 0,
  class: "faq-answer"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _$data$subscription;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Header Section "), _cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", {
    class: "subscription-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "container"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "header-content"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", null, "Manage Your Islamic Connect Subscription"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Join a growing global community of Muslims who are deepening their connection to the Qur’an and Islam through knowledge, reflection, and technology. Your subscription helps us build innovative tools for spiritual growth and keep our resources accessible for everyone.")])])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("main", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Notifications "), $data.success ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_4, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-check-circle"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.success), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[0] || (_cache[0] = (...args) => $options.clearNotification && $options.clearNotification(...args)),
    class: "close-btn"
  }, [...(_cache[9] || (_cache[9] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-times"
  }, null, -1 /* CACHED */)]))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-exclamation-triangle"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.error), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[1] || (_cache[1] = (...args) => $options.clearNotification && $options.clearNotification(...args)),
    class: "close-btn"
  }, [...(_cache[11] || (_cache[11] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-times"
  }, null, -1 /* CACHED */)]))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Alert Container "), _cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "alertContainer",
    class: "alert-container"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Loading State "), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_6, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Fetching your subscription details, please wait...", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Success Image "), $data.showSuccessImage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "/images/mark1.png",
    width: "100",
    alt: "Subscription Success",
    class: "success-image"
  }, null, -1 /* CACHED */)), _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "success-message"
  }, " Thank you for your support! Your subscription helps sustain Islamic Connect as a free, accessible resource for Muslims worldwide. May Allahﷻ accept your contribution and bless your efforts. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[2] || (_cache[2] = $event => $data.showSuccessImage = false),
    class: "btn btn-primary"
  }, "Start Exploring")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Active Subscription "), $data.isSubscribed && !$data.showSuccessImage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-badge"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-crown"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Active Premium Subscription ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "status-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-check-circle"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.planDisplayName), 1 /* TEXT */), _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "subtitle"
  }, "You're enjoying all premium features with your active subscription.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "label"
  }, "Subscription Status", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "value",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      color: $options.canCancel ? '#2c7c6a' : '#6b7280'
    })
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.subscriptionStatus), 5 /* TEXT, STYLE */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Your Premium Benefits", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.getPlanBenefits(), benefit => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "benefit-item",
      key: benefit
    }, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(benefit), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[3] || (_cache[3] = (...args) => $options.handleCancelSubscription && $options.handleCancelSubscription(...args)),
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn btn-cancel", {
      'disabled': !$options.canCancel || $options.isCancelled,
      'cancelled': $options.isCancelled
    }]),
    disabled: $data.cancelling || !$options.canCancel || $options.isCancelled,
    title: $options.isCancelled ? 'Your subscription is already cancelled' : 'Cancel your subscription (access ends immediately)'
  }, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-times-circle"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.cancelling ? 'Cancelling...' : $options.isCancelled ? 'Subscription Cancelled' : 'Cancel Subscription'), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_14)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Subscription Plans "), $options.showPlans && !$data.showSuccessImage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_15, [(_$data$subscription = $data.subscription) !== null && _$data$subscription !== void 0 && _$data$subscription.ends_at ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_16, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-info-circle"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Your subscription will end on " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatDate($data.subscription.ends_at)) + ". Subscribe to a new plan to continue enjoying premium features and uninterrupted access.", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[4] || (_cache[4] = $event => $data.subscription = null),
    class: "close-btn"
  }, [...(_cache[23] || (_cache[23] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-times"
  }, null, -1 /* CACHED */)]))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, "Choose Your Subscription Plan", -1 /* CACHED */)), _cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Select the plan that best suits your needs to unlock premium features and support our mission.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    role: "tab",
    "aria-selected": $data.billingCycle === 'monthly',
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["toggle-option", {
      active: $data.billingCycle === 'monthly'
    }]),
    onClick: _cache[5] || (_cache[5] = $event => $options.setBillingCycle('monthly'))
  }, " Monthly ", 10 /* CLASS, PROPS */, _hoisted_19), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    role: "tab",
    "aria-selected": $data.billingCycle === 'yearly',
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["toggle-option", {
      active: $data.billingCycle === 'yearly'
    }]),
    onClick: _cache[6] || (_cache[6] = $event => $options.setBillingCycle('yearly'))
  }, " Yearly ", 10 /* CLASS, PROPS */, _hoisted_20), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["toggle-indicator", $data.billingCycle])
  }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-if=\"billingCycle === 'yearly' && yearlySavings\" class=\"toggle-savings\" aria-live=\"polite\">\n              <i class=\"fas fa-tag\"></i> {{ yearlySavings }}\n            </div> ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    method: "POST",
    action: "/subscribe",
    onSubmit: _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.handleSubmit && $options.handleSubmit(...args), ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredPlans, plan => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: plan.value || plan.name,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["plan-card", {
        'featured': plan.featured,
        'selected': plan.value === $data.selectedPlan
      }]),
      onClick: $event => plan.value !== '' ? $data.selectedPlan = plan.value : null
    }, [plan.featured ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.badge), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(plan.icon)
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.price), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.period), 1 /* TEXT */)]), plan.savings ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.savings), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.description), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(plan.features, feature => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: feature,
        class: "feature-item"
      }, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-check"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(feature), 1 /* TEXT */)]);
    }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [plan.value === '' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", _hoisted_33, " Get Started ")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 1
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "radio",
      id: plan.value,
      value: plan.value,
      "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $data.selectedPlan = $event),
      class: "radio-input"
    }, null, 8 /* PROPS */, _hoisted_34), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.selectedPlan]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      for: plan.value,
      class: "radio-label",
      title: 'Select the ' + plan.name + ' plan'
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.value === $data.selectedPlan ? 'Selected' : 'Select Plan'), 9 /* TEXT, PROPS */, _hoisted_35)], 64 /* STABLE_FRAGMENT */))])], 10 /* CLASS, PROPS */, _hoisted_22);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "hidden",
    name: "_token",
    value: $data.csrfToken
  }, null, 8 /* PROPS */, _hoisted_37), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "hidden",
    name: "price_lookup_key",
    value: $data.selectedPlan
  }, null, 8 /* PROPS */, _hoisted_38), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-primary",
    disabled: $data.submitting
  }, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-credit-card"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.submitting ? 'Processing Payment...' : 'Proceed to Secure Payment'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_39), _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "security-note"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-lock"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Secure payment processing powered by Stripe ")], -1 /* CACHED */))])], 32 /* NEED_HYDRATION */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" FAQ Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "faq-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Frequently Asked Questions"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Find answers to common questions about our subscription plans and features.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.faqs, (faq, index) => {
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
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_43), faq.open ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.answer), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Confirmation Modal "), _cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"modal fade\" id=\"cancelConfirmationModal\" tabindex=\"-1\" aria-labelledby=\"cancelConfirmationLabel\" aria-hidden=\"true\" data-v-0ca26305><div class=\"modal-dialog\" data-v-0ca26305><div class=\"modal-content\" data-v-0ca26305><div class=\"modal-header\" data-v-0ca26305><h5 class=\"modal-title\" id=\"cancelConfirmationLabel\" data-v-0ca26305>Confirm Subscription Cancellation</h5><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\" data-v-0ca26305></button></div><div class=\"modal-body\" data-v-0ca26305> Are you sure you want to cancel your subscription? Your premium access will end immediately, and you will lose access to exclusive features. </div><div class=\"modal-footer\" data-v-0ca26305><button type=\"button\" class=\"btn btn-secondary\" id=\"cancelDismiss\" data-v-0ca26305>No, Keep My Subscription</button><button type=\"button\" class=\"btn btn-primary\" id=\"confirmCancel\" data-v-0ca26305>Yes, Cancel Subscription</button></div></div></div></div>", 1))]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionComponent.vue?vue&type=style&index=0&id=0ca26305&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionComponent.vue?vue&type=style&index=0&id=0ca26305&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/components/SubscriptionComponent.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/SubscriptionComponent.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SubscriptionComponent_vue_vue_type_template_id_0ca26305_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SubscriptionComponent.vue?vue&type=template&id=0ca26305&scoped=true */ "./resources/js/components/SubscriptionComponent.vue?vue&type=template&id=0ca26305&scoped=true");
/* harmony import */ var _SubscriptionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SubscriptionComponent.vue?vue&type=script&lang=js */ "./resources/js/components/SubscriptionComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _SubscriptionComponent_vue_vue_type_style_index_0_id_0ca26305_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SubscriptionComponent.vue?vue&type=style&index=0&id=0ca26305&scoped=true&lang=css */ "./resources/js/components/SubscriptionComponent.vue?vue&type=style&index=0&id=0ca26305&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_SubscriptionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_SubscriptionComponent_vue_vue_type_template_id_0ca26305_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-0ca26305"],['__file',"resources/js/components/SubscriptionComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/SubscriptionComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/SubscriptionComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SubscriptionComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/SubscriptionComponent.vue?vue&type=style&index=0&id=0ca26305&scoped=true&lang=css":
/*!*******************************************************************************************************************!*\
  !*** ./resources/js/components/SubscriptionComponent.vue?vue&type=style&index=0&id=0ca26305&scoped=true&lang=css ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionComponent_vue_vue_type_style_index_0_id_0ca26305_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SubscriptionComponent.vue?vue&type=style&index=0&id=0ca26305&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionComponent.vue?vue&type=style&index=0&id=0ca26305&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/SubscriptionComponent.vue?vue&type=template&id=0ca26305&scoped=true":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/SubscriptionComponent.vue?vue&type=template&id=0ca26305&scoped=true ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionComponent_vue_vue_type_template_id_0ca26305_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionComponent_vue_vue_type_template_id_0ca26305_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SubscriptionComponent.vue?vue&type=template&id=0ca26305&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionComponent.vue?vue&type=template&id=0ca26305&scoped=true");


/***/ })

}]);