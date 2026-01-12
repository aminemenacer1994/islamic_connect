"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["/js/app"],{

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
  name: 'PricingComponent',
  // Original script code commented out
  /*
  data() {
    // ...
  },
  // ...
  */
  mounted() {
    console.log('PricingComponent: Subscription disabled');
  }
});

/***/ }),

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
    __expose();
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
      console.log('SubscriptionForm: Subscription disabled');
    });

    // Original script commented out
    /*
    import { ref, onMounted, computed } from 'vue';
    const csrfToken = ...
    */

    const __returned__ = {
      onMounted: vue__WEBPACK_IMPORTED_MODULE_0__.onMounted
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var chart_js_auto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chart.js/auto */ "./node_modules/chart.js/auto/auto.mjs");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      counts: {},
      series: {
        users: [],
        donations: [],
        feedback: []
      },
      recent: {
        donations: [],
        feedback: [],
        mailing: []
      },
      modalType: 'feedback',
      modalTitle: '',
      modalItems: [],
      cards: [{
        key: 'users',
        label: 'Users',
        icon: 'bi bi-people-fill',
        href: '/users',
        color: 'c1'
      }, {
        key: 'bookmarks',
        label: 'Bookmarks',
        icon: 'bi bi-bookmark-star',
        href: '/bookmarks',
        color: 'c2'
      }, {
        key: 'notes',
        label: 'Notes',
        icon: 'bi bi-journal-text',
        href: '/notes',
        color: 'c3'
      }, {
        key: 'donations',
        label: 'Donations',
        icon: 'bi bi-currency-exchange',
        href: '/payments',
        color: 'c4'
      }, {
        key: 'feedback',
        label: 'Feedback',
        icon: 'bi bi-chat-left-text',
        href: '/feedback',
        color: 'c5'
      }, {
        key: 'mailing',
        label: 'Mailing List',
        icon: 'bi bi-envelope-at',
        href: '/mailing_list',
        color: 'c6'
      }]
    };
  },
  mounted() {
    this.fetchMetrics();
  },
  methods: {
    async fetchMetrics() {
      try {
        const res = await fetch('api/admin-metrics');
        const data = await res.json();
        this.counts = data.counts || {};
        this.series = data.series || {};
        this.recent = data.recent || {};
        this.renderCharts(data);
      } catch (e) {
        console.error('metrics failed', e);
      }
    },
    renderCharts(data) {
      var _data$breakdown;
      const dLabels = (this.series.users || []).map(x => x.m);
      const uValues = (this.series.users || []).map(x => x.c);
      const fValues = (this.series.feedback || []).map(x => x.c);
      const accent = '#0f6e63';
      const common = {
        borderWidth: 2,
        borderColor: accent,
        backgroundColor: 'rgba(15, 110, 99, 0.12)',
        tension: .3,
        pointRadius: 0
      };
      const ctx1 = this.$refs.usersChart.getContext('2d');
      new chart_js_auto__WEBPACK_IMPORTED_MODULE_0__["default"](ctx1, {
        type: 'line',
        data: {
          labels: dLabels,
          datasets: [_objectSpread({
            label: 'Users',
            data: uValues
          }, common)]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      const ctx2 = this.$refs.feedbackChart.getContext('2d');
      new chart_js_auto__WEBPACK_IMPORTED_MODULE_0__["default"](ctx2, {
        type: 'bar',
        data: {
          labels: dLabels,
          datasets: [{
            label: 'Feedback',
            data: fValues,
            backgroundColor: 'rgba(15, 110, 99, 0.2)',
            borderColor: accent,
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      // Pie: donations by currency
      const pie = this.$refs.donationPie.getContext('2d');
      const br = ((_data$breakdown = data.breakdown) === null || _data$breakdown === void 0 ? void 0 : _data$breakdown.donationsByCurrency) || [];
      const labels = br.map(x => x.currency || 'N/A');
      const values = br.map(x => x.c);
      const colors = ['#0f6e63', '#5bc8b9', '#f2b84b', '#2f80ed', '#ef6f6c', '#18a999'];
      new chart_js_auto__WEBPACK_IMPORTED_MODULE_0__["default"](pie, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            data: values,
            backgroundColor: colors
          }]
        },
        options: {
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }
      });
    },
    async openModal(type) {
      this.modalType = type;
      this.modalTitle = type === 'feedback' ? 'All Feedback' : 'All Subscribers';
      const url = type === 'feedback' ? 'api/fetch-feedbacks' : 'api/fetch-mail';
      const res = await fetch(url);
      this.modalItems = await res.json();
      const el = document.getElementById('viewAllModal');
      bootstrap.Modal.getOrCreateInstance(el).show();
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DonationComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DonationComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var primevue_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primevue/api */ "./node_modules/primevue/api/api.esm.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mounted() {
    this.loadDonations();
  },
  data() {
    return {
      loading: false,
      searchValue: "",
      filters: {
        global: {
          value: null,
          matchMode: primevue_api__WEBPACK_IMPORTED_MODULE_1__.FilterMatchMode.CONTAINS
        }
      },
      columns: [{
        field: "firstname",
        header: "Firstname",
        sortable: true
      }, {
        field: "lastname",
        header: "Lastname",
        sortable: true
      }, {
        field: "amount",
        header: "Amount",
        sortable: true
      }, {
        field: "currency",
        header: "Currency",
        sortable: true
      }, {
        field: "payment_status",
        header: "Payment Status",
        sortable: true
      }],
      donations: null,
      sortDesc: false,
      form: new Form({
        id: "",
        firstname: "",
        lastname: "",
        amount: "",
        currency: "",
        country: "",
        email: "",
        payment_status: ""
      })
    };
  },
  methods: {
    onGlobalFilter(e) {
      this.filters.global.value = e.target.value;
    },
    loadDonations() {
      this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("api/fetch-donations").then(data => {
        this.donations = data.data;
      }).finally(() => {
        this.loading = false;
      });
    },
    //edit donation modal
    editModal(donation) {
      this.editmode = true;
      this.form.fill(donation);
    },
    viewModal(donation) {
      $("#view").modal("show");
      this.form.fill(donation);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/FeedbackComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/FeedbackComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var primevue_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primevue/api */ "./node_modules/primevue/api/api.esm.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mounted() {
    this.loadFeedbacks();
  },
  data() {
    return {
      loading: false,
      searchValue: '',
      filters: {
        global: {
          value: null,
          matchMode: primevue_api__WEBPACK_IMPORTED_MODULE_1__.FilterMatchMode.CONTAINS
        }
      },
      columns: [{
        field: "firstname",
        header: "Firstname",
        sortable: true
      }, {
        field: "lastname",
        header: "Lastname",
        sortable: true
      }, {
        field: "email",
        header: "Email",
        sortable: true
      }, {
        field: "subject",
        header: "Subject",
        sortable: true
      }],
      feedbacks: null,
      form: new Form({
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        subject: "",
        message: ""
      }),
      subjectOptions: [{
        value: "enquiry",
        label: "General enquiry"
      }, {
        value: "bug report",
        label: "Bug report"
      }, {
        value: "feature request",
        label: "Feature request"
      }, {
        value: "comment",
        label: "Comment"
      }, {
        value: "question",
        label: "Question"
      }]
    };
  },
  methods: {
    subjectLabel(value) {
      const option = this.subjectOptions.find(item => item.value === value);
      return option ? option.label : value;
    },
    onGlobalFilter(e) {
      this.filters.global.value = e.target.value;
    },
    loadFeedbacks() {
      this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("api/fetch-feedbacks").then(data => {
        this.feedbacks = data.data;
      }).finally(() => {
        this.loading = false;
      });
    },
    //edit feedback modal
    editModal(feedback) {
      this.editmode = true;
      this.form.fill(feedback);
    },
    viewModal(feedback) {
      $("#view").modal("show");
      this.form.fill(feedback);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/MailingListComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/MailingListComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var primevue_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primevue/api */ "./node_modules/primevue/api/api.esm.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mounted() {
    this.loadMailingList();
  },
  data() {
    return {
      mailinglists: null,
      searchValue: '',
      filters: {
        global: {
          value: null,
          matchMode: primevue_api__WEBPACK_IMPORTED_MODULE_1__.FilterMatchMode.CONTAINS
        }
      },
      columns: [{
        field: "name",
        header: "Firstname",
        sortable: true
      }, {
        field: "lastname",
        header: "Lastname",
        sortable: true
      }, {
        field: "phone",
        header: "Phone",
        sortable: true
      }, {
        field: "email",
        header: "Email address",
        sortable: true
      }],
      sortDesc: false,
      form: new Form({
        id: "",
        name: "",
        lastname: "",
        phone: "",
        email: "",
        created_at: ""
      })
    };
  },
  methods: {
    onGlobalFilter(e) {
      this.filters.global.value = e.target.value;
    },
    loadMailingList() {
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("api/fetch-mail").then(data => {
        this.mailinglists = data.data;
      });
    },
    viewModal(mailinglists) {
      this.form.reset();
      $("#view").modal("show");
      this.form.fill(mailinglists);
    },
    //edit user modal
    editModal(mailinglists) {
      this.editmode = true;
      this.form.reset();
      this.form.fill(mailinglists);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var primevue_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primevue/api */ "./node_modules/primevue/api/api.esm.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mounted() {
    // Load live Stripe data by default; local mirror still available
    this.loadStripe();
  },
  data() {
    return {
      loading: false,
      errorMsg: '',
      searchValue: "",
      filters: {
        global: {
          value: null,
          matchMode: primevue_api__WEBPACK_IMPORTED_MODULE_1__.FilterMatchMode.CONTAINS
        }
      },
      columns: [],
      payments: null,
      form: new Form({
        id: "",
        name: "",
        amount: "",
        description: "",
        payment_method: "",
        currency: "",
        status: "",
        date: ""
      })
    };
  },
  methods: {
    onGlobalFilter(e) {
      this.filters.global.value = e.target.value;
    },
    loadPayments() {
      this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("api/fetch-payments").then(data => {
        this.payments = data.data;
      }).finally(() => {
        this.loading = false;
      });
    },
    async loadStripe() {
      this.loading = true;
      this.errorMsg = '';
      try {
        const res = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('api/stripe/transactions');
        if (res.data && res.data.error) {
          this.errorMsg = res.data.error;
          this.payments = [];
          return;
        }
        const rows = res.data && res.data.data ? res.data.data : [];
        // Use rows as-is; backend already shapes like Stripe
        this.payments = rows;
      } catch (e) {
        var _e$response;
        this.errorMsg = (e === null || e === void 0 || (_e$response = e.response) === null || _e$response === void 0 || (_e$response = _e$response.data) === null || _e$response === void 0 ? void 0 : _e$response.error) || 'Failed to load from Stripe. Check server logs and STRIPE_SECRET.';
      } finally {
        this.loading = false;
      }
    },
    prettyStatus(s) {
      if (!s) return ' ';
      const map = {
        reversed: 'Reversed',
        refunded: 'Refunded',
        canceled: 'Cancelled',
        cancelled: 'Cancelled',
        succeeded: 'Succeeded',
        failed: 'Failed'
      };
      return map[String(s).toLowerCase()] || s;
    },
    formatAmount(amount, currency) {
      if (amount === null || amount === undefined || amount === '') return ' ';
      try {
        return new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: currency || 'GBP'
        }).format(parseFloat(amount));
      } catch (e) {
        return amount + ' ' + (currency || '');
      }
    },
    //edit donation modal
    editModal(payment) {
      this.editmode = true;
      this.form.fill(payment);
    },
    viewModal(payment) {
      $("#view").modal("show");
      this.form.fill(payment);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/bookmarkAuth */ "./resources/js/utils/bookmarkAuth.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    information: {
      type: Object,
      default: null
    },
    user: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.fetchUserIdAndNotes();
    this.fetchUserIdAndBookmarks();
    this.fetchUserIdAndFolders();
  },
  data() {
    return {
      users: {},
      userId: null,
      notes: [],
      bookmarks: [],
      folders: [],
      editmode: false,
      form: new Form({
        id: "",
        name: "",
        email: "",
        lastname: "",
        phone: "",
        user_type: "",
        password: ""
      })
    };
  },
  computed: {
    avatarUrl() {
      try {
        var _this$user;
        const email = (((_this$user = this.user) === null || _this$user === void 0 ? void 0 : _this$user.email) || '').trim().toLowerCase();
        const hash = window.md5 ? window.md5(email) : '';
        // fallback to identicon param if md5 not available
        return `https://www.gravatar.com/avatar/${hash}?s=140&d=identicon`;
      } catch (_) {
        return `https://www.gravatar.com/avatar/?s=140&d=identicon`;
      }
    },
    formattedJoin() {
      try {
        var _this$user2, _this$user3;
        const d = new Date(((_this$user2 = this.user) === null || _this$user2 === void 0 ? void 0 : _this$user2.created_at) || ((_this$user3 = this.user) === null || _this$user3 === void 0 ? void 0 : _this$user3.createdAt) || '');
        if (!isNaN(d)) {
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          return `${y}-${m}-${day}`;
        }
        return '';
      } catch (_) {
        return '';
      }
    }
  },
  methods: {
    async resolveProfileUserId() {
      if (this.userId) {
        return this.userId;
      }
      const userId = await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__.fetchUserIdFromApi)();
      if (userId) {
        this.userId = userId;
      }
      return this.userId;
    },
    async fetchUserIdAndNotes() {
      try {
        const userId = await this.resolveProfileUserId();
        if (userId) {
          await this.fetchNotes(userId);
        } else {
          console.error('User ID not found');
        }
      } catch (error) {
        console.error('Error fetching user ID or notes:', error);
      }
    },
    async fetchUserIdAndBookmarks() {
      try {
        const userId = await this.resolveProfileUserId();
        if (userId) {
          await this.fetchBookmarks(userId);
        } else {
          console.error('User ID not found');
        }
      } catch (error) {
        console.error('Error fetching user ID or bookmarks:', error);
      }
    },
    async fetchUserIdAndFolders() {
      try {
        const userId = await this.resolveProfileUserId();
        if (userId) {
          await this.fetchFolders();
        } else {
          console.error('User ID not found');
        }
      } catch (error) {
        console.error('Error fetching user ID or folders:', error);
      }
    },
    async fetchFolders() {
      try {
        const response = await fetch(`/fetch-folders`);
        if (!response.ok) {
          throw new Error('Failed to fetch folders');
        }
        this.folders = await response.json();
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    },
    async fetchNotes(userId) {
      try {
        const response = await fetch(`/api/fetch-notes/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        this.notes = await response.json();
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    },
    async fetchBookmarks(userId) {
      try {
        const response = await fetch(`/api/fetch-bookmarks/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bookmarks');
        }
        this.bookmarks = await response.json();
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    },
    loadUsers() {
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("api/fetch-users").then(data => {
        this.users = data.data;
      });
    },
    updateUser() {
      sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
        title: "Are you sure?",
        text: "You want to update user !",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "#d33",
        confirmButtonText: "Update user!"
      }, 1000).then(result => {
        if (result.isConfirmed) {
          axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`api/update-users/${this.form.id}`, this.form).then(() => {
            sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
              position: "top-end",
              icon: "success",
              title: "Profile updated",
              showConfirmButton: false,
              timer: 1200
            });
            this.user = _objectSpread(_objectSpread({}, this.user), {}, {
              name: this.form.name,
              lastname: this.form.lastname,
              email: this.form.email,
              phone: this.form.phone,
              user_type: this.form.user_type
            });
            this.form.password = "";
            this.hideEditModal();
          }).catch(() => {
            sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
              icon: 'error',
              title: 'Update failed',
              timer: 1500,
              showConfirmButton: false
            });
          });
        }
      });
    },
    //edit user modal
    editModal(user) {
      this.editmode = true;
      this.form.reset();
      this.form.fill(user);
    },
    viewModal(user) {
      this.form.reset();
      // optional: show a separate view modal if implemented
      this.form.fill(user);
    },
    hideEditModal() {
      try {
        const el = document.getElementById('editNew');
        if (!el) return;
        const inst = bootstrap.Modal.getInstance(el) || bootstrap.Modal.getOrCreateInstance(el);
        inst.hide();
      } catch (_) {}
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/UsersComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/UsersComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var primevue_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primevue/api */ "./node_modules/primevue/api/api.esm.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mounted() {
    this.loadUsers();
    this.InitializeForm();
  },
  data() {
    return {
      loading: false,
      users: [],
      filteredUsers: [],
      searchValue: "",
      filters: {
        global: {
          value: null,
          matchMode: primevue_api__WEBPACK_IMPORTED_MODULE_1__.FilterMatchMode.CONTAINS
        }
      },
      selectedRole: "",
      selectedStatus: "",
      showPassword: false,
      columns: [{
        field: "name",
        header: "First Name",
        sortable: true
      }, {
        field: "lastname",
        header: "Last Name",
        sortable: true
      }, {
        field: "email",
        header: "Email",
        sortable: true
      }, {
        field: "user_type",
        header: "Role",
        sortable: true
      }, {
        field: "status",
        header: "Status",
        sortable: true
      }, {
        field: "last_login",
        header: "Last Login",
        sortable: true
      }],
      form: new Form({
        id: "",
        name: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        user_type: ""
      })
    };
  },
  computed: {
    globalFields() {
      return (this.columns || []).map(c => c.field);
    },
    totalUsers() {
      return this.users.length;
    },
    activeUsers() {
      return this.users.length; // In real app, filter by status
    },
    adminCount() {
      return this.users.filter(u => u.user_type === 'Super Admin' || u.user_type === 'Admin').length;
    }
  },
  methods: {
    onGlobalFilter(e) {
      this.filters.global.value = e.target.value;
      this.applyFilters();
    },
    filterByRole() {
      this.applyFilters();
    },
    filterByStatus() {
      this.applyFilters();
    },
    applyFilters() {
      let filtered = [...this.users];
      if (this.selectedRole) {
        filtered = filtered.filter(user => user.user_type === this.selectedRole);
      }
      if (this.selectedStatus) {
        // In real app, filter by actual status
        filtered = filtered; // Placeholder
      }
      this.filteredUsers = filtered;
    },
    clearFilters() {
      this.selectedRole = "";
      this.selectedStatus = "";
      this.searchValue = "";
      this.filters.global.value = null;
      this.filteredUsers = [...this.users];
    },
    getRoleClass(role) {
      const classes = {
        'Super Admin': 'role-badge super-admin',
        'Admin': 'role-badge admin',
        'Manager': 'role-badge manager',
        'Editor': 'role-badge editor',
        'Viewer': 'role-badge viewer',
        'Volunteer': 'role-badge volunteer'
      };
      return classes[role] || 'role-badge';
    },
    InitializeForm() {
      this.form.id = "";
      this.form.name = "";
      this.form.lastname = "";
      this.form.email = "";
      this.form.phone = "";
      this.form.password = "";
      this.form.user_type = "";
      this.showPassword = false;
    },
    resetForm(event) {
      event.preventDefault();
      this.InitializeForm();
    },
    loadUsers() {
      this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("api/fetch-users").then(data => {
        this.users = data.data;
        this.filteredUsers = [...data.data];
      }).finally(() => {
        this.loading = false;
      });
    },
    createUser() {
      // ... existing createUser logic ...
    },
    updateUser() {
      // ... existing updateUser logic ...
    },
    confirmDelete(user) {
      Swal.fire({
        title: `Delete ${user.name} ${user.lastname}?`,
        text: "This action cannot be undone. The user will lose all access.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete user",
        cancelButtonText: "Cancel",
        reverseButtons: true
      }).then(result => {
        if (result.isConfirmed) {
          this.deleteUser(user.id);
        }
      });
    },
    deleteUser(id) {
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete("api/delete-users/" + id).then(() => {
        Swal.fire({
          icon: "success",
          title: "User Deleted",
          text: "The user has been successfully removed.",
          timer: 1500,
          showConfirmButton: false
        });
        this.loadUsers();
      }).catch(() => {
        Swal.fire("Error", "Failed to delete user.", "error");
      });
    },
    editModal(user) {
      this.editmode = true;
      this.form.reset();
      this.form.fill(user);
    },
    viewModal(user) {
      this.form.reset();
      this.form.fill(user);
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
  class: "subscription-container"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Subscription code commented out "), _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "container",
    style: {
      "padding": "100px",
      "text-align": "center"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Subscription system is currently disabled.")], -1 /* CACHED */))]);
}

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
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Subscription code commented out "), _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: {
      "text-align": "center",
      "padding": "2rem"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Subscription system is currently disabled.")], -1 /* CACHED */))]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=template&id=186a9dc4&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=template&id=186a9dc4&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "dash-wrap admin-page"
};
const _hoisted_2 = {
  class: "row g-3 mb-3 top-cards"
};
const _hoisted_3 = ["href", "aria-label"];
const _hoisted_4 = {
  class: "metric-icon"
};
const _hoisted_5 = {
  class: "metric-body"
};
const _hoisted_6 = {
  class: "metric-label"
};
const _hoisted_7 = {
  class: "metric-value"
};
const _hoisted_8 = {
  class: "row g-3 charts-row"
};
const _hoisted_9 = {
  class: "col-lg-6"
};
const _hoisted_10 = {
  class: "panel-card"
};
const _hoisted_11 = {
  ref: "usersChart",
  height: "110"
};
const _hoisted_12 = {
  class: "col-lg-6"
};
const _hoisted_13 = {
  class: "panel-card"
};
const _hoisted_14 = {
  ref: "feedbackChart",
  height: "110"
};
const _hoisted_15 = {
  class: "row g-3 mt-1 align-items-stretch"
};
const _hoisted_16 = {
  class: "col-lg-6 d-flex"
};
const _hoisted_17 = {
  class: "panel-card flex-grow-1"
};
const _hoisted_18 = {
  ref: "donationPie",
  height: "220"
};
const _hoisted_19 = {
  class: "col-lg-6 d-flex"
};
const _hoisted_20 = {
  class: "flex-grow-1"
};
const _hoisted_21 = {
  class: "panel-card mb-3"
};
const _hoisted_22 = {
  class: "panel-head d-flex justify-content-between align-items-center"
};
const _hoisted_23 = {
  class: "list clean"
};
const _hoisted_24 = {
  class: "pill"
};
const _hoisted_25 = {
  class: "muted"
};
const _hoisted_26 = {
  class: "panel-card"
};
const _hoisted_27 = {
  class: "panel-head d-flex justify-content-between align-items-center"
};
const _hoisted_28 = {
  class: "list clean"
};
const _hoisted_29 = {
  class: "muted"
};
const _hoisted_30 = {
  class: "modal fade",
  id: "viewAllModal",
  tabindex: "-1",
  "aria-hidden": "true"
};
const _hoisted_31 = {
  class: "modal-dialog modal-lg modal-dialog-centered modal-fullscreen-md-down"
};
const _hoisted_32 = {
  class: "modal-content"
};
const _hoisted_33 = {
  class: "modal-header"
};
const _hoisted_34 = {
  class: "modal-title"
};
const _hoisted_35 = {
  class: "modal-body"
};
const _hoisted_36 = {
  class: "list clean"
};
const _hoisted_37 = {
  class: "pill"
};
const _hoisted_38 = {
  class: "muted"
};
const _hoisted_39 = {
  class: "muted"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Top metric cards "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.cards, c => {
    var _$data$counts$c$key;
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-md-4",
      key: c.key
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: c.href,
      class: "card-link",
      "aria-label": c.label
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["metric-card fade-pop", c.color])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(c.icon)
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(c.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$data$counts$c$key = $data.counts[c.key]) !== null && _$data$counts$c$key !== void 0 ? _$data$counts$c$key : 0), 1 /* TEXT */)])], 2 /* CLASS */)], 8 /* PROPS */, _hoisted_3)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Charts "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "panel-head"
  }, "Users (lifetime)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("canvas", _hoisted_11, null, 512 /* NEED_PATCH */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "panel-head"
  }, "Feedback (lifetime)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("canvas", _hoisted_14, null, 512 /* NEED_PATCH */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Pie Chart Row "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "panel-head"
  }, "Donations by Currency", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("canvas", _hoisted_18, null, 512 /* NEED_PATCH */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Recent Feedback", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#",
    onClick: _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.openModal('feedback'), ["prevent"])),
    class: "viewall"
  }, "View all")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_23, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.recent.feedback, f => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: f.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.subject || 'Feedback'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.firstname) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.lastname), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Recent Subscribers", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#",
    onClick: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.openModal('mailing'), ["prevent"])),
    class: "viewall"
  }, "View all")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_28, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.recent.mailing, m => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: m.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(m.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(m.email), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" View All Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.modalTitle), 1 /* TEXT */), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_36, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.modalItems, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item.id
    }, [$data.modalType === 'feedback' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 0
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.subject || 'Feedback'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.firstname) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.lastname) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.email), 1 /* TEXT */)], 64 /* STABLE_FRAGMENT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 1
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.email), 1 /* TEXT */)], 64 /* STABLE_FRAGMENT */))]);
  }), 128 /* KEYED_FRAGMENT */))])])])])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DonationComponent.vue?vue&type=template&id=485a7e74":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DonationComponent.vue?vue&type=template&id=485a7e74 ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "admin-page"
};
const _hoisted_2 = {
  class: "modal fade",
  id: "editNewDonation",
  tabindex: "-1",
  "aria-labelledby": "editNew",
  "aria-hidden": "true"
};
const _hoisted_3 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_4 = {
  class: "modal-content"
};
const _hoisted_5 = {
  class: "modal-body"
};
const _hoisted_6 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_7 = {
  class: "mt-2 text-dark"
};
const _hoisted_8 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_9 = {
  class: "mt-2 text-dark"
};
const _hoisted_10 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_11 = {
  class: "mt-2 text-dark"
};
const _hoisted_12 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_13 = {
  class: "mt-2 text-dark"
};
const _hoisted_14 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_15 = {
  class: "mt-2 text-dark"
};
const _hoisted_16 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_17 = {
  class: "mt-2 text-dark"
};
const _hoisted_18 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_19 = {
  class: "mt-2 text-dark"
};
const _hoisted_20 = {
  class: "table-toolbar"
};
const _hoisted_21 = {
  class: "search-wrapper"
};
const _hoisted_22 = {
  class: "row-actions"
};
const _hoisted_23 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Column = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Column");
  const _component_DataTable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DataTable");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" view new Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title text-dark",
    id: "addNew"
  }, " View message "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Name:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.firstname), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Lastname:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.lastname), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Amount:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.amount), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Currency:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.currency), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Email:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.email), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Country:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.country), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Payment Status:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.payment_status), 1 /* TEXT */)]), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger",
    "data-bs-dismiss": "modal"
  }, " Close ")], -1 /* CACHED */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" donation datatable "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DataTable, {
    class: "pt-4 modern-datatable",
    value: $data.donations,
    loading: $data.loading,
    ref: "dt",
    filters: $data.filters,
    "onUpdate:filters": _cache[2] || (_cache[2] = $event => $data.filters = $event),
    globalFilterFields: ($data.columns || []).map(c => c.field),
    showGridlines: "",
    stripedRows: "",
    rowHover: "",
    responsiveLayout: "scroll",
    paginator: "",
    rows: 10,
    rowsPerPageOptions: [10, 20, 50, 100],
    paginatorTemplate: "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
    currentPageReportTemplate: "Showing {first}–{last} of {totalRecords} donations",
    removableSort: "",
    width: "100%",
    tableStyle: "max-width:100%"
  }, {
    header: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "title"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-gift me-2"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Donations")], -1 /* CACHED */)), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "spacer"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-search"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      class: "form-control form-control-sm border-0",
      type: "text",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchValue = $event),
      placeholder: "Search donations...",
      onInput: _cache[1] || (_cache[1] = (...args) => $options.onGlobalFilter && $options.onGlobalFilter(...args))
    }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchValue]])])])]),
    empty: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [...(_cache[16] || (_cache[16] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "empty"
    }, "No donations found.", -1 /* CACHED */)]))]),
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" In total there are " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.donations ? $data.donations.length : 0) + " donations. ", 1 /* TEXT */)]),
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.columns, col => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Column, {
        key: col.field,
        field: col.field,
        header: col.header,
        sortable: "",
        class: "text-left",
        style: {
          "align-items": "center"
        }
      }, null, 8 /* PROPS */, ["field", "header"]);
    }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      header: "Actions",
      exportable: false,
      style: {
        "min-width": "12rem"
      }
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
        data
      }) => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "data-bs-toggle": "modal",
        "data-bs-target": "#editNewDonation",
        type: "button",
        class: "btn btn-sm btn-primary",
        onClick: $event => $options.editModal(data)
      }, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-eye me-1"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" View ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_23)])]),
      _: 1 /* STABLE */
    })]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["value", "loading", "filters", "globalFilterFields"])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/FeedbackComponent.vue?vue&type=template&id=67079fb3":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/FeedbackComponent.vue?vue&type=template&id=67079fb3 ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "admin-page"
};
const _hoisted_2 = {
  class: "modal fade",
  id: "editNewFeedback",
  tabindex: "-1",
  "aria-labelledby": "editNew",
  "aria-hidden": "true"
};
const _hoisted_3 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_4 = {
  class: "modal-content"
};
const _hoisted_5 = {
  class: "modal-body"
};
const _hoisted_6 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_7 = {
  class: "mt-2 text-dark"
};
const _hoisted_8 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_9 = {
  class: "mt-2 text-dark"
};
const _hoisted_10 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_11 = {
  class: "mt-2 text-dark"
};
const _hoisted_12 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_13 = {
  class: "mt-2 text-dark"
};
const _hoisted_14 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_15 = {
  class: "mt-2 text-dark"
};
const _hoisted_16 = {
  class: "table-toolbar"
};
const _hoisted_17 = {
  class: "search-wrapper"
};
const _hoisted_18 = {
  class: "row-actions"
};
const _hoisted_19 = ["onClick"];
const _hoisted_20 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Column = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Column");
  const _component_DataTable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DataTable");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" view new Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title text-dark",
    id: "addNew"
  }, " View message "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Firstname:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.firstname), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Lastname:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.lastname), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "email:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.email), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "subject:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.subjectLabel($data.form.subject)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Message:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.message), 1 /* TEXT */)]), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger",
    "data-bs-dismiss": "modal"
  }, " Close ")], -1 /* CACHED */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DataTable, {
    class: "pt-4 modern-datatable",
    value: $data.feedbacks,
    loading: $data.loading,
    ref: "dt",
    filters: $data.filters,
    "onUpdate:filters": _cache[2] || (_cache[2] = $event => $data.filters = $event),
    globalFilterFields: ($data.columns || []).map(c => c.field),
    showGridlines: "",
    stripedRows: "",
    rowHover: "",
    responsiveLayout: "scroll",
    paginator: "",
    rows: 10,
    rowsPerPageOptions: [10, 20, 50, 100],
    paginatorTemplate: "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
    currentPageReportTemplate: "Showing {first}–{last} of {totalRecords} messages",
    removableSort: "",
    width: "100%",
    tableStyle: "min-width: 50rem"
  }, {
    header: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "title"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-chat-dots me-2"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Feedback")], -1 /* CACHED */)), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "spacer"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-search"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      class: "form-control form-control-sm border-0",
      type: "text",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchValue = $event),
      placeholder: "Search feedback...",
      onInput: _cache[1] || (_cache[1] = (...args) => $options.onGlobalFilter && $options.onGlobalFilter(...args))
    }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchValue]])])])]),
    empty: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "empty"
    }, "No feedback messages found.", -1 /* CACHED */)]))]),
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" In total there are " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.feedbacks ? $data.feedbacks.length : 0) + " Messages. ", 1 /* TEXT */)]),
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.columns, col => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Column, {
        key: col.field,
        field: col.field,
        header: col.header,
        sortable: "",
        class: "text-left",
        style: {
          "align-items": "center"
        }
      }, null, 8 /* PROPS */, ["field", "header"]);
    }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      exportable: true,
      style: {
        "min-width": "8rem"
      }
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(slotProps => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "data-bs-toggle": "modal",
        "data-bs-target": "#editNewFeedback",
        type: "button",
        class: "btn btn-sm btn-primary",
        onClick: $event => $options.editModal(slotProps.data)
      }, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "pi pi-eye me-1"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" View ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_19), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "data-bs-toggle": "modal",
        "data-bs-target": "#editNew",
        type: "button",
        class: "btn btn-sm btn-outline-secondary",
        onClick: $event => $options.editModal(slotProps.data)
      }, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "pi pi-send me-1"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Reply ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_20)])]),
      _: 1 /* STABLE */
    })]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["value", "loading", "filters", "globalFilterFields"])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/MailingListComponent.vue?vue&type=template&id=fdb3c6ee":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/MailingListComponent.vue?vue&type=template&id=fdb3c6ee ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "admin-page"
};
const _hoisted_2 = {
  class: "modal fade",
  id: "editNewMail",
  tabindex: "-1",
  "aria-labelledby": "editNew",
  "aria-hidden": "true"
};
const _hoisted_3 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_4 = {
  class: "modal-content"
};
const _hoisted_5 = {
  class: "modal-body"
};
const _hoisted_6 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_7 = {
  class: "mt-2 text-dark"
};
const _hoisted_8 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_9 = {
  class: "mt-2 text-dark"
};
const _hoisted_10 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_11 = {
  class: "mt-2 text-dark"
};
const _hoisted_12 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_13 = {
  class: "mt-2 text-dark"
};
const _hoisted_14 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_15 = {
  class: "mt-2 text-dark"
};
const _hoisted_16 = {
  class: "table-toolbar"
};
const _hoisted_17 = {
  class: "search-wrapper"
};
const _hoisted_18 = {
  class: "row-actions"
};
const _hoisted_19 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Column = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Column");
  const _component_DataTable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DataTable");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" view new Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title text-dark",
    id: "addNew"
  }, " View message "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "ID:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.id), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Firstname:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.name), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Lastname:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.lastname), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Phone:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.phone), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Date:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.created_at), 1 /* TEXT */)]), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger",
    "data-bs-dismiss": "modal"
  }, " Close ")], -1 /* CACHED */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DataTable, {
    ref: "dt",
    class: "pt-5",
    showGridlines: "",
    stripedRows: "",
    sortable: "",
    value: $data.mailinglists,
    filters: $data.filters,
    "onUpdate:filters": _cache[2] || (_cache[2] = $event => $data.filters = $event),
    globalFilterFields: ($data.columns || []).map(c => c.field),
    paginator: "",
    rows: 7,
    rowsPerPageOptions: [5, 10, 20, 50],
    removableSort: "",
    width: "100%",
    tableStyle: "max-width:100%"
  }, {
    header: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "title"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-envelope-at-fill me-2"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Mailing List")], -1 /* CACHED */)), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "spacer"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-search"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      class: "form-control form-control-sm border-0",
      type: "text",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchValue = $event),
      placeholder: "Search mailing list...",
      onInput: _cache[1] || (_cache[1] = (...args) => $options.onGlobalFilter && $options.onGlobalFilter(...args))
    }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchValue]])])])]),
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" In total there are " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.mailinglists ? $data.mailinglists.length : 0) + " subscribers. ", 1 /* TEXT */)]),
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.columns, col => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Column, {
        key: col.field,
        field: col.field,
        header: col.header,
        sortable: "",
        class: "text-left",
        style: {
          "align-items": "center"
        }
      }, null, 8 /* PROPS */, ["field", "header"]);
    }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      header: "Actions",
      exportable: false,
      style: {
        "min-width": "12rem"
      }
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
        data
      }) => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "data-bs-toggle": "modal",
        "data-bs-target": "#editNewMail",
        type: "button",
        class: "btn btn-sm btn-primary",
        onClick: $event => $options.editModal(data)
      }, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-eye me-1"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" View ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_19)])]),
      _: 1 /* STABLE */
    })]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["value", "filters", "globalFilterFields"])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=template&id=25dc03a8&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=template&id=25dc03a8&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "admin-page"
};
const _hoisted_2 = {
  class: "modal fade",
  id: "editNewPayment",
  tabindex: "-1",
  "aria-labelledby": "editNew",
  "aria-hidden": "true"
};
const _hoisted_3 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_4 = {
  class: "modal-content"
};
const _hoisted_5 = {
  class: "modal-body"
};
const _hoisted_6 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_7 = {
  class: "mt-2 text-dark"
};
const _hoisted_8 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_9 = {
  class: "mt-2 text-dark"
};
const _hoisted_10 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_11 = {
  class: "mt-2 text-dark"
};
const _hoisted_12 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_13 = {
  class: "mt-2 text-dark"
};
const _hoisted_14 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_15 = {
  class: "mt-2 text-dark"
};
const _hoisted_16 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_17 = {
  class: "mt-2 text-dark"
};
const _hoisted_18 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_19 = {
  class: "mt-2 text-dark"
};
const _hoisted_20 = {
  class: "table-toolbar"
};
const _hoisted_21 = {
  class: "search-wrapper"
};
const _hoisted_22 = {
  key: 0,
  class: "alert alert-warning mt-2",
  role: "alert"
};
const _hoisted_23 = {
  class: "text-muted ms-1"
};
const _hoisted_24 = ["data-status"];
const _hoisted_25 = ["href"];
const _hoisted_26 = {
  key: 1
};
const _hoisted_27 = {
  class: "row-actions"
};
const _hoisted_28 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Column = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Column");
  const _component_DataTable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DataTable");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" view new Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title text-dark",
    id: "addNew"
  }, " View message "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Name:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.name), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Amount:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.amount), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Description:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.description), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Payment method:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.payment_method), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Currency:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.currency), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Status:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.status), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Date:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.date), 1 /* TEXT */)]), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger",
    "data-bs-dismiss": "modal"
  }, " Close ")], -1 /* CACHED */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" payment datatable "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DataTable, {
    class: "pt-4 modern-datatable",
    value: $data.payments,
    loading: $data.loading,
    ref: "dt",
    filters: $data.filters,
    "onUpdate:filters": _cache[2] || (_cache[2] = $event => $data.filters = $event),
    globalFilterFields: ['amount', 'status', 'payment_method', 'description', 'customer', 'date'],
    showGridlines: "",
    stripedRows: "",
    rowHover: "",
    responsiveLayout: "scroll",
    paginator: "",
    rows: 10,
    rowsPerPageOptions: [10, 20, 50, 100],
    paginatorTemplate: "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
    currentPageReportTemplate: "Showing {first}–{last} of {totalRecords} payments",
    removableSort: "",
    width: "100%",
    tableStyle: "max-width:100%"
  }, {
    header: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "title"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-credit-card me-2"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Payments")], -1 /* CACHED */)), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "spacer"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button class=\"btn-add outline\" @click=\"loadStripe()\" :disabled=\"loading\">\n          <i class=\"bi bi-cloud-download me-2\"></i>Load from Stripe\n        </Button> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-search"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      class: "form-control form-control-sm border-0",
      type: "text",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchValue = $event),
      placeholder: "Search payments...",
      onInput: _cache[1] || (_cache[1] = (...args) => $options.onGlobalFilter && $options.onGlobalFilter(...args))
    }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchValue]])])]), $data.errorMsg ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.errorMsg), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    empty: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [...(_cache[16] || (_cache[16] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "empty"
    }, "No payments found.", -1 /* CACHED */)]))]),
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" In total there are " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.payments ? $data.payments.length : 0) + " Payments. ", 1 /* TEXT */)]),
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "amount",
      header: "Amount",
      sortable: ""
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
        data
      }) => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatAmount(data.amount, data.currency)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.currency), 1 /* TEXT */)]),
      _: 1 /* STABLE */
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "status",
      header: "Status",
      sortable: ""
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
        data
      }) => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "badge bg-light text-dark",
        "data-status": data.status
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.prettyStatus(data.status)), 9 /* TEXT, PROPS */, _hoisted_24)]),
      _: 1 /* STABLE */
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "payment_method",
      header: "Payment method",
      sortable: ""
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "description",
      header: "Description",
      sortable: ""
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "customer",
      header: "Customer",
      sortable: ""
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "date",
      header: "Date",
      sortable: ""
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "receipt_url",
      header: "Receipt",
      exportable: false
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
        data
      }) => [data.receipt_url ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
        key: 0,
        href: data.receipt_url,
        target: "_blank",
        rel: "noopener"
      }, "Receipt", 8 /* PROPS */, _hoisted_25)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_26))]),
      _: 1 /* STABLE */
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      header: "Actions",
      exportable: false,
      style: {
        "min-width": "12rem"
      }
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
        data
      }) => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "data-bs-toggle": "modal",
        "data-bs-target": "#editNewPayment",
        type: "button",
        class: "btn btn-sm btn-primary",
        onClick: $event => $options.editModal(data)
      }, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-eye me-1"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" View ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_28)])]),
      _: 1 /* STABLE */
    })]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["value", "loading", "filters"])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=template&id=499c6769&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=template&id=499c6769&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  id: "app"
};
const _hoisted_2 = {
  class: "profile-surface"
};
const _hoisted_3 = {
  class: "profile-banner"
};
const _hoisted_4 = {
  class: "banner-content"
};
const _hoisted_5 = {
  class: "d-flex align-items-center gap-3"
};
const _hoisted_6 = ["src"];
const _hoisted_7 = {
  class: "flex-grow-1"
};
const _hoisted_8 = {
  class: "m-0 d-flex align-items-center gap-2"
};
const _hoisted_9 = {
  style: {
    "font-weight": "800"
  }
};
const _hoisted_10 = {
  key: 0,
  class: "role-badge",
  "aria-label": "User role"
};
const _hoisted_11 = {
  class: "text-muted small"
};
const _hoisted_12 = {
  class: "container mt-4 profile-panel"
};
const _hoisted_13 = {
  class: "row g-3 mb-3"
};
const _hoisted_14 = {
  class: "col-md-3"
};
const _hoisted_15 = {
  class: "stat-card fade-pop stat-link",
  "aria-label": "Collections count",
  href: "/bookmarks"
};
const _hoisted_16 = {
  class: "stat-body"
};
const _hoisted_17 = {
  class: "stat-value"
};
const _hoisted_18 = {
  class: "col-md-3"
};
const _hoisted_19 = {
  class: "stat-card fade-pop stat-link",
  "aria-label": "Bookmarks count",
  href: "/bookmarks"
};
const _hoisted_20 = {
  class: "stat-body"
};
const _hoisted_21 = {
  class: "stat-value"
};
const _hoisted_22 = {
  class: "col-md-3"
};
const _hoisted_23 = {
  class: "stat-card stat-card--disabled",
  "aria-label": "Notes coming soon"
};
const _hoisted_24 = {
  class: "stat-body"
};
const _hoisted_25 = {
  class: "stat-value"
};
const _hoisted_26 = {
  class: "section-card"
};
const _hoisted_27 = {
  class: "section-header"
};
const _hoisted_28 = {
  class: "section-body"
};
const _hoisted_29 = {
  class: "row g-3"
};
const _hoisted_30 = {
  class: "col-md-4"
};
const _hoisted_31 = {
  class: "field"
};
const _hoisted_32 = {
  class: "field-value"
};
const _hoisted_33 = {
  class: "col-md-4"
};
const _hoisted_34 = {
  class: "field"
};
const _hoisted_35 = {
  class: "field-value"
};
const _hoisted_36 = {
  class: "col-md-4"
};
const _hoisted_37 = {
  class: "field"
};
const _hoisted_38 = {
  class: "field-value"
};
const _hoisted_39 = {
  class: "col-md-6"
};
const _hoisted_40 = {
  class: "field"
};
const _hoisted_41 = {
  class: "field-value"
};
const _hoisted_42 = {
  class: "col-md-6"
};
const _hoisted_43 = {
  class: "field"
};
const _hoisted_44 = {
  class: "field-value"
};
const _hoisted_45 = {
  class: "modal fade",
  id: "editNew",
  tabindex: "-1",
  "aria-labelledby": "editNewLabel",
  "aria-hidden": "true"
};
const _hoisted_46 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_47 = {
  class: "modal-content"
};
const _hoisted_48 = {
  class: "modal-body"
};
const _hoisted_49 = {
  class: "modal-form-grid row g-3"
};
const _hoisted_50 = {
  class: "col-md-6"
};
const _hoisted_51 = {
  class: "input-group"
};
const _hoisted_52 = {
  class: "col-md-6"
};
const _hoisted_53 = {
  class: "input-group"
};
const _hoisted_54 = {
  class: "col-md-6"
};
const _hoisted_55 = {
  class: "input-group"
};
const _hoisted_56 = {
  class: "col-md-6"
};
const _hoisted_57 = {
  class: "input-group"
};
const _hoisted_58 = {
  class: "col-md-6"
};
const _hoisted_59 = {
  class: "input-group"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _$props$user, _$props$user2;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $options.avatarUrl,
    alt: "Avatar",
    class: "avatar-lg rounded-circle"
  }, null, 8 /* PROPS */, _hoisted_6), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.user.name) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.user.lastname), 1 /* TEXT */), (_$props$user = $props.user) !== null && _$props$user !== void 0 && _$props$user.user_type || (_$props$user2 = $props.user) !== null && _$props$user2 !== void 0 && _$props$user2.role ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.user.user_type || $props.user.role), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, "Member since " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formattedJoin), 1 /* TEXT */)])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quick Stats "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", _hoisted_15, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon bg-teal"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-collection"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-label"
  }, "Group Bookmarks", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.folders && $data.folders.length || 0), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", _hoisted_19, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon bg-teal"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bookmark-star"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-label"
  }, "Bookmarks", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.bookmarks && $data.bookmarks.length || 0), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon stat-icon--muted"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journal-text"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-label"
  }, "Notes", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.notes && $data.notes.length || 0), 1 /* TEXT */), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-note"
  }, "Coming very soon", -1 /* CACHED */))])])]), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"col-md-3\" data-v-499c6769><div class=\"stat-card stat-card--disabled\" aria-label=\"Group notes coming soon\" data-v-499c6769><div class=\"stat-icon stat-icon--muted\" data-v-499c6769><i class=\"bi bi-people\" data-v-499c6769></i></div><div class=\"stat-body\" data-v-499c6769><div class=\"stat-label\" data-v-499c6769>Group Notes</div><div class=\"stat-value\" data-v-499c6769>—</div><div class=\"stat-note\" data-v-499c6769>Coming very soon</div></div></div></div>", 1))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Personal Information section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "m-0"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Personal Information")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-sm btn-edit",
    "data-bs-toggle": "modal",
    "data-bs-target": "#editNew",
    onClick: _cache[0] || (_cache[0] = $event => $options.editModal($props.user))
  }, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-pencil-square me-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Edit ", -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "field-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "First Name")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.user.name || ' '), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "field-label"
  }, "Last Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.user.lastname || ' '), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "field-label"
  }, "User Role", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.user.user_type || $props.user.role || 'User'), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "field-label"
  }, "Email Address", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.user.email), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "field-label"
  }, "Phone Number", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.user.phone || ' '), 1 /* TEXT */)])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Address section (placeholders if missing) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("\n      <div class=\"section-card mt-3\">\n        <div class=\"section-header\">\n          <h6 class=\"m-0\">Address</h6>\n          <button class=\"btn btn-sm btn-amber\" data-bs-toggle=\"modal\" data-bs-target=\"#editNew\"\n            @click=\"editModal(user)\">\n            <i class=\"bi bi-pencil-square me-1\"></i> Edit\n          </button>\n        </div>\n        <div class=\"section-body\">\n          <div class=\"row g-3\">\n            <div class=\"col-md-4\">\n              <div class=\"field\">\n                <div class=\"field-label\">Country</div>\n                <div class=\"field-value\">{{ user.country || ' ' }}</div>\n              </div>\n            </div>\n            <div class=\"col-md-4\">\n              <div class=\"field\">\n                <div class=\"field-label\">City</div>\n                <div class=\"field-value\">{{ user.city || ' ' }}</div>\n              </div>\n            </div>\n            <div class=\"col-md-4\">\n              <div class=\"field\">\n                <div class=\"field-label\">Postal Code</div>\n                <div class=\"field-value\">{{ user.postal_code || ' ' }}</div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Edit Profile Modal (Bootstrap 5) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title",
    id: "editNewLabel"
  }, "Edit Profile"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    class: "modal-form",
    onSubmit: _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.updateUser && $options.updateUser(...args), ["prevent"])),
    novalidate: ""
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "First name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-person"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.form.name = $event),
    type: "text",
    class: "form-control",
    placeholder: "Enter first name",
    "aria-label": "First name"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.name]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Last name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-person"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.form.lastname = $event),
    type: "text",
    class: "form-control",
    placeholder: "Enter last name",
    "aria-label": "Last name"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.lastname]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Email", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-envelope"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.form.email = $event),
    type: "email",
    class: "form-control",
    placeholder: "name@example.com",
    "aria-label": "Email"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.email]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Phone", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-telephone"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.form.phone = $event),
    type: "tel",
    class: "form-control",
    placeholder: "e.g. +1 555 555 5555",
    "aria-label": "Phone"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.phone]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center justify-content-between"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label mb-0"
  }, "Password"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted"
  }, "Leave blank to keep current")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-lock"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.form.password = $event),
    type: "password",
    class: "form-control",
    placeholder: "••••••••",
    "aria-label": "Password"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.password]])])])]), _cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-actions d-flex justify-content-end gap-3 mt-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-modal-light",
    "data-bs-dismiss": "modal"
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-modal-primary"
  }, "Save changes")], -1 /* CACHED */))], 32 /* NEED_HYDRATION */)])])])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/UsersComponent.vue?vue&type=template&id=e9381eac":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/UsersComponent.vue?vue&type=template&id=e9381eac ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  id: "app",
  class: "admin-page"
};
const _hoisted_2 = {
  class: "modal fade",
  id: "viewUserModal",
  tabindex: "-1",
  "aria-labelledby": "viewUserLabel",
  "aria-hidden": "true"
};
const _hoisted_3 = {
  class: "modal-dialog modal-dialog-centered modal-lg"
};
const _hoisted_4 = {
  class: "modal-content modern-modal"
};
const _hoisted_5 = {
  class: "modal-header gradient-primary"
};
const _hoisted_6 = {
  class: "d-flex align-items-center"
};
const _hoisted_7 = {
  class: "modal-title mb-1"
};
const _hoisted_8 = {
  class: "modal-subtitle mb-0"
};
const _hoisted_9 = {
  class: "modal-body"
};
const _hoisted_10 = {
  class: "details-grid"
};
const _hoisted_11 = {
  class: "detail-section"
};
const _hoisted_12 = {
  class: "detail-item"
};
const _hoisted_13 = {
  class: "detail-value"
};
const _hoisted_14 = {
  class: "detail-item"
};
const _hoisted_15 = {
  class: "detail-value"
};
const _hoisted_16 = {
  class: "detail-item"
};
const _hoisted_17 = {
  class: "detail-value"
};
const _hoisted_18 = {
  class: "detail-item"
};
const _hoisted_19 = {
  class: "detail-value"
};
const _hoisted_20 = {
  class: "detail-section"
};
const _hoisted_21 = {
  class: "detail-item"
};
const _hoisted_22 = {
  class: "user-type-badge"
};
const _hoisted_23 = {
  class: "modal-footer"
};
const _hoisted_24 = {
  class: "modal fade",
  id: "addUserModal",
  tabindex: "-1",
  "aria-labelledby": "addUserLabel",
  "aria-hidden": "true"
};
const _hoisted_25 = {
  class: "modal-dialog modal-dialog-centered modal-lg"
};
const _hoisted_26 = {
  class: "modal-content modern-modal"
};
const _hoisted_27 = {
  class: "modal-body"
};
const _hoisted_28 = {
  class: "row g-4"
};
const _hoisted_29 = {
  class: "col-md-6"
};
const _hoisted_30 = {
  class: "col-md-6"
};
const _hoisted_31 = {
  class: "col-12"
};
const _hoisted_32 = {
  class: "col-md-6"
};
const _hoisted_33 = {
  class: "input-group"
};
const _hoisted_34 = {
  class: "col-md-6"
};
const _hoisted_35 = {
  class: "password-input-wrapper"
};
const _hoisted_36 = ["type"];
const _hoisted_37 = {
  class: "col-12"
};
const _hoisted_38 = {
  class: "modal fade",
  id: "editUserModal",
  tabindex: "-1",
  "aria-labelledby": "editUserLabel",
  "aria-hidden": "true"
};
const _hoisted_39 = {
  class: "modal-dialog modal-dialog-centered modal-lg"
};
const _hoisted_40 = {
  class: "modal-content modern-modal"
};
const _hoisted_41 = {
  class: "modal-body"
};
const _hoisted_42 = {
  class: "row g-4"
};
const _hoisted_43 = {
  class: "col-md-6"
};
const _hoisted_44 = {
  class: "col-md-6"
};
const _hoisted_45 = {
  class: "col-12"
};
const _hoisted_46 = {
  class: "col-md-6"
};
const _hoisted_47 = {
  class: "input-group"
};
const _hoisted_48 = {
  class: "col-md-6"
};
const _hoisted_49 = {
  class: "main-container"
};
const _hoisted_50 = {
  class: "page-header"
};
const _hoisted_51 = {
  class: "header-right"
};
const _hoisted_52 = {
  class: "d-flex gap-2"
};
const _hoisted_53 = {
  class: "stats-cards mb-4"
};
const _hoisted_54 = {
  class: "stat-card"
};
const _hoisted_55 = {
  class: "stat-info"
};
const _hoisted_56 = {
  class: "stat-card"
};
const _hoisted_57 = {
  class: "stat-info"
};
const _hoisted_58 = {
  class: "stat-card"
};
const _hoisted_59 = {
  class: "stat-info"
};
const _hoisted_60 = {
  class: "controls-section mb-4"
};
const _hoisted_61 = {
  class: "search-wrapper"
};
const _hoisted_62 = {
  class: "filters-wrapper"
};
const _hoisted_63 = {
  class: "table-card"
};
const _hoisted_64 = {
  class: "user-cell"
};
const _hoisted_65 = {
  class: "user-avatar"
};
const _hoisted_66 = {
  class: "user-name"
};
const _hoisted_67 = {
  class: "user-id"
};
const _hoisted_68 = {
  class: "user-lastname"
};
const _hoisted_69 = {
  class: "email-cell"
};
const _hoisted_70 = {
  class: "action-buttons"
};
const _hoisted_71 = ["onClick"];
const _hoisted_72 = ["onClick"];
const _hoisted_73 = ["onClick"];
const _hoisted_74 = {
  class: "table-footer"
};
const _hoisted_75 = {
  class: "footer-info"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Column = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Column");
  const _component_DataTable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DataTable");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" View User Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-user-avatar"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-person-circle"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.name) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.lastname), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.email), 1 /* TEXT */)])]), _cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close btn-close-white",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "section-title"
  }, "Basic Information", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "User ID:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_13, "#" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.id || 'N/A'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "Full Name:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.name) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.lastname), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "Email:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.email), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "Phone:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.phone || 'Not provided'), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "section-title"
  }, "Account Details", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "User Type:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.user_type || 'Not assigned'), 1 /* TEXT */)]), _cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"detail-item\"><span class=\"detail-label\">Account Status:</span><span class=\"status-badge active\">Active</span></div><div class=\"detail-item\"><span class=\"detail-label\">Last Login:</span><span class=\"detail-value\">2 hours ago</span></div>", 2))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-secondary",
    "data-bs-dismiss": "modal"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg me-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Close ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-warning",
    "data-bs-dismiss": "modal",
    "data-bs-toggle": "modal",
    "data-bs-target": "#editUserModal",
    onClick: _cache[0] || (_cache[0] = $event => $options.editModal($data.form))
  }, [...(_cache[35] || (_cache[35] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-pencil me-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Edit User ", -1 /* CACHED */)]))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Add User Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [_cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"modal-header gradient-success\"><div class=\"d-flex align-items-center\"><div class=\"modal-icon-wrapper\"><i class=\"bi bi-person-plus-fill\"></i></div><div><h5 class=\"modal-title mb-0\">Add New User</h5><p class=\"modal-subtitle mb-0\">Create a new user account</p></div></div><button type=\"button\" class=\"btn-close btn-close-white\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onReset: _cache[8] || (_cache[8] = (...args) => $options.resetForm && $options.resetForm(...args)),
    onSubmit: _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.createUser(), ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("First Name "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.form.name = $event),
    type: "text",
    class: "form-control",
    placeholder: "Enter first name",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.name]]), _cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "form-text"
  }, "User's legal first name", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Last Name "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.form.lastname = $event),
    type: "text",
    class: "form-control",
    placeholder: "Enter last name",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.lastname]]), _cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "form-text"
  }, "User's legal last name", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Email Address "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.form.email = $event),
    type: "email",
    class: "form-control",
    placeholder: "user@example.com",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.email]]), _cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "form-text"
  }, "Login and notification email", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [_cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Phone Number", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text"
  }, "+1", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.form.phone = $event),
    type: "tel",
    class: "form-control",
    placeholder: "(555) 123-4567"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.phone]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [_cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Password "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.form.password = $event),
    type: $data.showPassword ? 'text' : 'password',
    class: "form-control",
    placeholder: "Enter secure password",
    required: ""
  }, null, 8 /* PROPS */, _hoisted_36), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelDynamic, $data.form.password]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "password-toggle",
    onClick: _cache[6] || (_cache[6] = $event => $data.showPassword = !$data.showPassword)
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($data.showPassword ? 'bi bi-eye-slash' : 'bi bi-eye')
  }, null, 2 /* CLASS */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"form-text\">Minimum 8 characters with letters and numbers</div> ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [_cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("User Role "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $data.form.user_type = $event),
    required: ""
  }, [...(_cache[46] || (_cache[46] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<option value=\"\" disabled>Select User Type</option><option value=\"Super Admin\">Super Admin</option><option value=\"Admin\">Admin</option><option value=\"Manager\">Manager</option><option value=\"Editor\">Editor</option><option value=\"Viewer\">Viewer</option><option value=\"Volunteer\">Volunteer</option>", 7)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.user_type]]), _cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "form-text"
  }, "Defines user permissions and access levels", -1 /* CACHED */))])]), _cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"modal-footer mt-4\"><button type=\"button\" class=\"btn btn-outline-secondary\" data-bs-dismiss=\"modal\"> Cancel </button><button type=\"reset\" class=\"btn btn-light\"><i class=\"bi bi-arrow-clockwise me-1\"></i>Reset </button><button type=\"submit\" class=\"btn btn-success\"><i class=\"bi bi-check-circle me-1\"></i>Create User </button></div>", 1))], 32 /* NEED_HYDRATION */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Edit User Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [_cache[60] || (_cache[60] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"modal-header gradient-warning\"><div class=\"d-flex align-items-center\"><div class=\"modal-icon-wrapper\"><i class=\"bi bi-pencil-square\"></i></div><div><h5 class=\"modal-title mb-0\">Edit User</h5><p class=\"modal-subtitle mb-0\">Update user information</p></div></div><button type=\"button\" class=\"btn-close btn-close-white\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.updateUser(), ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [_cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("First Name "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => $data.form.name = $event),
    type: "text",
    class: "form-control",
    placeholder: "Enter first name",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.name]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [_cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Last Name "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => $data.form.lastname = $event),
    type: "text",
    class: "form-control",
    placeholder: "Enter last name",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.lastname]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [_cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Email Address "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => $data.form.email = $event),
    type: "email",
    class: "form-control",
    placeholder: "user@example.com",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.email]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [_cache[55] || (_cache[55] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Phone Number", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [_cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text"
  }, "+1", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => $data.form.phone = $event),
    type: "tel",
    class: "form-control",
    placeholder: "(555) 123-4567"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.phone]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [_cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("User Role "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => $data.form.user_type = $event),
    required: ""
  }, [...(_cache[56] || (_cache[56] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<option value=\"\" disabled>Select User Type</option><option value=\"Super Admin\">Super Admin</option><option value=\"Admin\">Admin</option><option value=\"Manager\">Manager</option><option value=\"Editor\">Editor</option><option value=\"Viewer\">Viewer</option><option value=\"Volunteer\">Volunteer</option>", 7)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.user_type]])]), _cache[58] || (_cache[58] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-12"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "form-check"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "form-check-input",
    type: "checkbox",
    id: "sendNotification"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-check-label",
    for: "sendNotification"
  }, " Send email notification about these changes ")])], -1 /* CACHED */))]), _cache[59] || (_cache[59] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer mt-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary",
    "data-bs-dismiss": "modal"
  }, " Cancel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-warning"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-save me-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Save Changes ")])], -1 /* CACHED */))], 32 /* NEED_HYDRATION */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [_cache[63] || (_cache[63] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "header-left"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "header-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-people-fill"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "header-text"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", null, "User Management"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Manage and organize your users")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [_cache[62] || (_cache[62] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-primary btn-export"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-download me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Export ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "data-bs-toggle": "modal",
    "data-bs-target": "#addUserModal",
    class: "btn btn-success btn-add",
    onClick: _cache[16] || (_cache[16] = $event => $options.InitializeForm())
  }, [...(_cache[61] || (_cache[61] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-circle me-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Add New User ", -1 /* CACHED */)]))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Stats Cards "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [_cache[65] || (_cache[65] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon total-users"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-people"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.totalUsers), 1 /* TEXT */), _cache[64] || (_cache[64] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Total Users", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [_cache[67] || (_cache[67] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon active-users"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-person-check"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.activeUsers), 1 /* TEXT */), _cache[66] || (_cache[66] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Active", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [_cache[69] || (_cache[69] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon admins"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-shield-check"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.adminCount), 1 /* TEXT */), _cache[68] || (_cache[68] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Admins", -1 /* CACHED */))])]), _cache[70] || (_cache[70] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon new-users"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-person-plus"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-info"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "5"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "New This Week")])], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search and Filters Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_60, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [_cache[71] || (_cache[71] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search search-icon"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    class: "search-input",
    "onUpdate:modelValue": _cache[17] || (_cache[17] = $event => $data.searchValue = $event),
    placeholder: "Search by name, email, or user type...",
    onInput: _cache[18] || (_cache[18] = (...args) => $options.onGlobalFilter && $options.onGlobalFilter(...args))
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchValue]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select filter-select",
    "onUpdate:modelValue": _cache[19] || (_cache[19] = $event => $data.selectedRole = $event),
    onChange: _cache[20] || (_cache[20] = (...args) => $options.filterByRole && $options.filterByRole(...args))
  }, [...(_cache[72] || (_cache[72] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<option value=\"\">All Roles</option><option value=\"Super Admin\">Super Admin</option><option value=\"Admin\">Admin</option><option value=\"Manager\">Manager</option><option value=\"Editor\">Editor</option><option value=\"Viewer\">Viewer</option><option value=\"Volunteer\">Volunteer</option>", 7)]))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedRole]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select filter-select",
    "onUpdate:modelValue": _cache[21] || (_cache[21] = $event => $data.selectedStatus = $event),
    onChange: _cache[22] || (_cache[22] = (...args) => $options.filterByStatus && $options.filterByStatus(...args))
  }, [...(_cache[73] || (_cache[73] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: ""
  }, "All Status", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "active"
  }, "Active", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "inactive"
  }, "Inactive", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "pending"
  }, "Pending", -1 /* CACHED */)]))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedStatus]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-secondary",
    onClick: _cache[23] || (_cache[23] = (...args) => $options.clearFilters && $options.clearFilters(...args))
  }, [...(_cache[74] || (_cache[74] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-filter-circle me-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Clear Filters ", -1 /* CACHED */)]))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Table Card "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DataTable, {
    value: $data.filteredUsers,
    loading: $data.loading,
    ref: "dt",
    stripedRows: "",
    responsiveLayout: "scroll",
    filters: $data.filters,
    "onUpdate:filters": _cache[24] || (_cache[24] = $event => $data.filters = $event),
    globalFilterFields: $options.globalFields,
    paginator: "",
    rows: 10,
    rowsPerPageOptions: [10, 20, 50, 100],
    paginatorTemplate: "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
    currentPageReportTemplate: "Showing {first} to {last} of {totalRecords} users",
    sortField: "name",
    sortOrder: 1
  }, {
    empty: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [...(_cache[81] || (_cache[81] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "empty-state"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-people"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "No users found"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Try adjusting your search or filter to find what you're looking for."), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-primary",
      "data-bs-toggle": "modal",
      "data-bs-target": "#addUserModal"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-plus-circle me-1"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Add First User ")])], -1 /* CACHED */)]))]),
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_74, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_75, [_cache[82] || (_cache[82] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Showing ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.filteredUsers.length), 1 /* TEXT */), _cache[83] || (_cache[83] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" of ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.totalUsers), 1 /* TEXT */), _cache[84] || (_cache[84] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" users ", -1 /* CACHED */))]), _cache[85] || (_cache[85] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "footer-actions"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-sm btn-outline-secondary"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-download me-1"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Export Data ")])], -1 /* CACHED */))])]),
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "name",
      header: "First Name",
      sortable: ""
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
        data
      }) => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_64, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_65, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.name.charAt(0).toUpperCase()), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, "#" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.id), 1 /* TEXT */)])])]),
      _: 1 /* STABLE */
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "lastname",
      header: "Last Name",
      sortable: ""
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
        data
      }) => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.lastname), 1 /* TEXT */)]),
      _: 1 /* STABLE */
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "email",
      header: "Email",
      sortable: ""
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
        data
      }) => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_69, [_cache[75] || (_cache[75] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-envelope me-2"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.email), 1 /* TEXT */)])]),
      _: 1 /* STABLE */
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "user_type",
      header: "Role",
      sortable: ""
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
        data
      }) => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($options.getRoleClass(data.user_type))
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.user_type), 3 /* TEXT, CLASS */)]),
      _: 1 /* STABLE */
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "status",
      header: "Status",
      sortable: ""
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
        data
      }) => [...(_cache[76] || (_cache[76] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "status-badge active"
      }, "Active", -1 /* CACHED */)]))]),
      _: 1 /* STABLE */
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "last_login",
      header: "Last Login",
      sortable: ""
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
        data
      }) => [...(_cache[77] || (_cache[77] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "last-login"
      }, "2 hours ago", -1 /* CACHED */)]))]),
      _: 1 /* STABLE */
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      header: "Actions",
      exportable: false,
      style: {
        "width": "150px"
      }
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
        data
      }) => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "data-bs-toggle": "modal",
        "data-bs-target": "#viewUserModal",
        class: "action-btn view-btn",
        onClick: $event => $options.viewModal(data),
        title: "View Details"
      }, [...(_cache[78] || (_cache[78] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-eye"
      }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_71), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "data-bs-toggle": "modal",
        "data-bs-target": "#editUserModal",
        class: "action-btn edit-btn",
        onClick: $event => $options.editModal(data),
        title: "Edit User"
      }, [...(_cache[79] || (_cache[79] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-pencil"
      }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_72), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "action-btn delete-btn",
        onClick: $event => $options.confirmDelete(data),
        title: "Delete User"
      }, [...(_cache[80] || (_cache[80] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-trash"
      }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_73)])]),
      _: 1 /* STABLE */
    })]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["value", "loading", "filters", "globalFilterFields"])])])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PricingComponent.vue?vue&type=style&index=0&id=d4146a7c&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PricingComponent.vue?vue&type=style&index=0&id=d4146a7c&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionForm.vue?vue&type=style&index=0&id=55d8ed6c&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionForm.vue?vue&type=style&index=0&id=55d8ed6c&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=style&index=0&id=25dc03a8&scoped=true&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=style&index=0&id=25dc03a8&scoped=true&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=style&index=0&id=499c6769&scoped=true&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=style&index=0&id=499c6769&scoped=true&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/UsersComponent.vue?vue&type=style&index=0&id=e9381eac&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/UsersComponent.vue?vue&type=style&index=0&id=e9381eac&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/css/app.css":
/*!*******************************!*\
  !*** ./resources/css/app.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/css/layout.css":
/*!**********************************!*\
  !*** ./resources/css/layout.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vform */ "./node_modules/vform/dist/vform.es.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var sweetalert2_dist_sweetalert2_min_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! sweetalert2/dist/sweetalert2.min.css */ "./node_modules/sweetalert2/dist/sweetalert2.min.css");
/* harmony import */ var primevue_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primevue/config */ "./node_modules/primevue/config/config.esm.js");
/* harmony import */ var primevue_resources_themes_saga_blue_theme_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primevue/resources/themes/saga-blue/theme.css */ "./node_modules/primevue/resources/themes/saga-blue/theme.css");
/* harmony import */ var primevue_resources_primevue_min_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primevue/resources/primevue.min.css */ "./node_modules/primevue/resources/primevue.min.css");
/* harmony import */ var primevue_datatable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primevue/datatable */ "./node_modules/primevue/datatable/datatable.esm.js");
/* harmony import */ var primevue_column__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primevue/column */ "./node_modules/primevue/column/column.esm.js");
/* harmony import */ var primevue_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primevue/button */ "./node_modules/primevue/button/button.esm.js");
/* harmony import */ var primevue_dropdown__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primevue/dropdown */ "./node_modules/primevue/dropdown/dropdown.esm.js");
/* harmony import */ var primevue_inputtext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primevue/inputtext */ "./node_modules/primevue/inputtext/inputtext.esm.js");
/* harmony import */ var primevue_card__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primevue/card */ "./node_modules/primevue/card/card.esm.js");
/* harmony import */ var primevue_tabview__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primevue/tabview */ "./node_modules/primevue/tabview/tabview.esm.js");
/* harmony import */ var primevue_tabpanel__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primevue/tabpanel */ "./node_modules/primevue/tabpanel/tabpanel.esm.js");
/* harmony import */ var primevue_accordion__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primevue/accordion */ "./node_modules/primevue/accordion/accordion.esm.js");
/* harmony import */ var primevue_accordiontab__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primevue/accordiontab */ "./node_modules/primevue/accordiontab/accordiontab.esm.js");
/* harmony import */ var primevue_listbox__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primevue/listbox */ "./node_modules/primevue/listbox/listbox.esm.js");
/* harmony import */ var primevue_fieldset__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! primevue/fieldset */ "./node_modules/primevue/fieldset/fieldset.esm.js");
/* harmony import */ var primevue_panel__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primevue/panel */ "./node_modules/primevue/panel/panel.esm.js");
/* harmony import */ var primevue_dialog__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primevue/dialog */ "./node_modules/primevue/dialog/dialog.esm.js");
/* harmony import */ var primevue_image__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! primevue/image */ "./node_modules/primevue/image/image.esm.js");
/* harmony import */ var primevue_editor__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! primevue/editor */ "./node_modules/primevue/editor/editor.esm.js");
/* harmony import */ var _components_admin_panels_UsersComponent_vue__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/admin_panels/UsersComponent.vue */ "./resources/js/components/admin_panels/UsersComponent.vue");
/* harmony import */ var _components_admin_panels_MailingListComponent_vue__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/admin_panels/MailingListComponent.vue */ "./resources/js/components/admin_panels/MailingListComponent.vue");
/* harmony import */ var _components_admin_panels_FeedbackComponent_vue__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/admin_panels/FeedbackComponent.vue */ "./resources/js/components/admin_panels/FeedbackComponent.vue");
/* harmony import */ var _components_admin_panels_PaymentComponent_vue__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/admin_panels/PaymentComponent.vue */ "./resources/js/components/admin_panels/PaymentComponent.vue");
/* harmony import */ var _components_admin_panels_DonationComponent_vue__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/admin_panels/DonationComponent.vue */ "./resources/js/components/admin_panels/DonationComponent.vue");
/* harmony import */ var _components_admin_panels_ProfileComponent_vue__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/admin_panels/ProfileComponent.vue */ "./resources/js/components/admin_panels/ProfileComponent.vue");
/* harmony import */ var _components_admin_panels_DashboardComponent_vue__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/admin_panels/DashboardComponent.vue */ "./resources/js/components/admin_panels/DashboardComponent.vue");
/* harmony import */ var _components_PricingComponent_vue__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./components/PricingComponent.vue */ "./resources/js/components/PricingComponent.vue");
/* harmony import */ var _components_SubscriptionForm_vue__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./components/SubscriptionForm.vue */ "./resources/js/components/SubscriptionForm.vue");
/* harmony import */ var vue_stripe_elements_plus__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! vue-stripe-elements-plus */ "./node_modules/vue-stripe-elements-plus/dist/index.js");
/* harmony import */ var vue_stripe_elements_plus__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(vue_stripe_elements_plus__WEBPACK_IMPORTED_MODULE_34__);
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");
console.log('[Vue] app.js start');
__webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");


window.bootstrap = bootstrap__WEBPACK_IMPORTED_MODULE_1__;


































// Removed session milestone tracking

const app = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)({
  components: {
    SubscriptionForm: _components_SubscriptionForm_vue__WEBPACK_IMPORTED_MODULE_33__["default"]
  },
  setup() {
    const isAuthenticated = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(!!document.querySelector('meta[name="user"]'));
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
      isAuthenticated.value = !!document.querySelector('meta[name="user"]');
    });
    return {
      isAuthenticated
    };
  },
  data() {
    return {
      darkModeState: {
        isDarkMode: false,
        setDarkMode: this.setDarkMode // Method to update dark mode state
      }
    };
  },
  created() {
    // Load dark mode preference from localStorage on app creation
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      this.darkModeState.isDarkMode = savedMode === 'true';
    }
  },
  methods: {
    setDarkMode(isDarkMode) {
      this.darkModeState.isDarkMode = isDarkMode;
      // Save the preference to localStorage
      localStorage.setItem('darkMode', isDarkMode);
    }
    // Removed startSessionMilestones method
  },
  provide() {
    // Provide the dark mode state to all child components
    return {
      darkModeState: this.darkModeState
    };
  }
});
window.Form = vform__WEBPACK_IMPORTED_MODULE_3__.Form;
window.Swal = (sweetalert2__WEBPACK_IMPORTED_MODULE_4___default());
window.$ = window.jQuery = (jquery__WEBPACK_IMPORTED_MODULE_2___default());
app.use(primevue_config__WEBPACK_IMPORTED_MODULE_6__["default"]);
// Protect against plugins that don't expose install with Vue 3 build
try {
  if (vue_stripe_elements_plus__WEBPACK_IMPORTED_MODULE_34__.StripePlugin && (typeof vue_stripe_elements_plus__WEBPACK_IMPORTED_MODULE_34__.StripePlugin === 'function' || typeof vue_stripe_elements_plus__WEBPACK_IMPORTED_MODULE_34__.StripePlugin.install === 'function')) {
    app.use(vue_stripe_elements_plus__WEBPACK_IMPORTED_MODULE_34__.StripePlugin, {
      key: process.env.MIX_STRIPE_PUBLISHABLE_KEY
    });
  } else {
    console.log('[Stripe] Plugin not compatible with current Vue build; skipping');
  }
} catch (e) {
  console.debug('[Stripe] Skipped plugin registration:', (e === null || e === void 0 ? void 0 : e.message) || e);
}
app.component("Column", primevue_column__WEBPACK_IMPORTED_MODULE_10__["default"]);
app.component("DataTable", primevue_datatable__WEBPACK_IMPORTED_MODULE_9__["default"]);
app.component("Button", primevue_button__WEBPACK_IMPORTED_MODULE_11__["default"]);
app.component("Dropdown", primevue_dropdown__WEBPACK_IMPORTED_MODULE_12__["default"]);
app.component("InputText", primevue_inputtext__WEBPACK_IMPORTED_MODULE_13__["default"]);
app.component("AccordionTab", primevue_accordiontab__WEBPACK_IMPORTED_MODULE_18__["default"]);
app.component("Accordion", primevue_accordion__WEBPACK_IMPORTED_MODULE_17__["default"]);
app.component("Card", primevue_card__WEBPACK_IMPORTED_MODULE_14__["default"]);
app.component("TabView", primevue_tabview__WEBPACK_IMPORTED_MODULE_15__["default"]);
app.component("TabPanel", primevue_tabpanel__WEBPACK_IMPORTED_MODULE_16__["default"]);
app.component("ListBox", primevue_listbox__WEBPACK_IMPORTED_MODULE_19__["default"]);
app.component("Fieldset", primevue_fieldset__WEBPACK_IMPORTED_MODULE_20__["default"]);
app.component("Panel", primevue_panel__WEBPACK_IMPORTED_MODULE_21__["default"]);
app.component("Dialog", primevue_dialog__WEBPACK_IMPORTED_MODULE_22__["default"]);
app.component("Image", primevue_image__WEBPACK_IMPORTED_MODULE_23__["default"]);
app.component("Editor", primevue_editor__WEBPACK_IMPORTED_MODULE_24__["default"]);
const asyncComponentLoaders = {
  "subscription-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_SubscriptionComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/SubscriptionComponent.vue */ "./resources/js/components/SubscriptionComponent.vue")),
  "dark-mode-toggle": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_DarkModeToggle_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/DarkModeToggle.vue */ "./resources/js/components/DarkModeToggle.vue")),
  "users-component": () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/UsersComponent.vue */ "./resources/js/components/admin_panels/UsersComponent.vue")),
  "mailing-list-component": () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/MailingListComponent.vue */ "./resources/js/components/admin_panels/MailingListComponent.vue")),
  "feedback-component": () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/FeedbackComponent.vue */ "./resources/js/components/admin_panels/FeedbackComponent.vue")),
  "payment-component": () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/PaymentComponent.vue */ "./resources/js/components/admin_panels/PaymentComponent.vue")),
  "donation-component": () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/DonationComponent.vue */ "./resources/js/components/admin_panels/DonationComponent.vue")),
  "profile-component": () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/ProfileComponent.vue */ "./resources/js/components/admin_panels/ProfileComponent.vue")),
  "dashboard-component": () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/DashboardComponent.vue */ "./resources/js/components/admin_panels/DashboardComponent.vue")),
  "homepage-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_HomepageComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/HomepageComponent.vue */ "./resources/js/components/HomepageComponent.vue")),
  "pricing-component": () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./components/PricingComponent.vue */ "./resources/js/components/PricingComponent.vue")),
  "contact-component": () => __webpack_require__.e(/*! import() */ "resources_js_components_ContactComponent_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./components/ContactComponent.vue */ "./resources/js/components/ContactComponent.vue")),
  "charity-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_CharityComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/CharityComponent.vue */ "./resources/js/components/CharityComponent.vue")),
  "volunteer-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_VolunteerComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/VolunteerComponent.vue */ "./resources/js/components/VolunteerComponent.vue")),
  "ahadith-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_AhadithComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/AhadithComponent.vue */ "./resources/js/components/AhadithComponent.vue")),
  "correction-component": () => __webpack_require__.e(/*! import() */ "resources_js_components_admin_panels_CorrectionComponent_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/CorrectionComponent.vue */ "./resources/js/components/admin_panels/CorrectionComponent.vue")),
  "quran-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_QuranComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/QuranComponent.vue */ "./resources/js/components/QuranComponent.vue")),
  "about-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_AboutComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/AboutComponent.vue */ "./resources/js/components/AboutComponent.vue")),
  "about-us-component": () => __webpack_require__.e(/*! import() */ "resources_js_components_AboutUsComponent_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./components/AboutUsComponent.vue */ "./resources/js/components/AboutUsComponent.vue")),
  "bookmark-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_admin_panels_BookmarkComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/BookmarkComponent.vue */ "./resources/js/components/admin_panels/BookmarkComponent.vue")),
  "updates-component": () => __webpack_require__.e(/*! import() */ "resources_js_components_UpdatesComponent_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./components/UpdatesComponent.vue */ "./resources/js/components/UpdatesComponent.vue")),
  "join_us-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_JoinUsComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/JoinUsComponent.vue */ "./resources/js/components/JoinUsComponent.vue")),
  "notes-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_admin_panels_NotesComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/NotesComponent.vue */ "./resources/js/components/admin_panels/NotesComponent.vue")),
  "group-notes-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_admin_panels_GroupNotesComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/GroupNotesComponent.vue */ "./resources/js/components/admin_panels/GroupNotesComponent.vue")),
  "mission-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_MissionComponent_vue-_e1d30")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/MissionComponent.vue */ "./resources/js/components/MissionComponent.vue")),
  "ai-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_AiComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/AiComponent.vue */ "./resources/js/components/AiComponent.vue")),
  "access-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_AccessComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/AccessComponent.vue */ "./resources/js/components/AccessComponent.vue")),
  "content-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_ContentComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ContentComponent.vue */ "./resources/js/components/ContentComponent.vue")),
  "surat-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_SuratComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/SuratComponent.vue */ "./resources/js/components/SuratComponent.vue")),
  "search-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_surah_selection_CustomSurahSelection_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/surah_selection/CustomSurahSelection.vue */ "./resources/js/components/surah_selection/CustomSurahSelection.vue")),
  "surah-list-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_search_SurahList_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/search/SurahList.vue */ "./resources/js/components/search/SurahList.vue")),
  "donations-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_intro_Donation_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/intro/Donation.vue */ "./resources/js/components/intro/Donation.vue")),
  "collection-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_admin_panels_CollectionComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/CollectionComponent.vue */ "./resources/js/components/admin_panels/CollectionComponent.vue")),
  "TinymceEditor": () => Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_tinymce_TinymceEditor_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/tinymce/TinymceEditor.vue */ "./resources/js/components/tinymce/TinymceEditor.vue")),
  "faq-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_FaqComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/FaqComponent.vue */ "./resources/js/components/FaqComponent.vue")),
  "support-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_SupportComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/SupportComponent.vue */ "./resources/js/components/SupportComponent.vue")),
  "dua-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_DuaComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/DuaComponent.vue */ "./resources/js/components/DuaComponent.vue")),
  "radio-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_RadioComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/RadioComponent.vue */ "./resources/js/components/RadioComponent.vue")),
  "guide-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_GuideComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/GuideComponent.vue */ "./resources/js/components/GuideComponent.vue")),
  "streaming-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_StreamingComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/StreamingComponent.vue */ "./resources/js/components/StreamingComponent.vue")),
  "toolkit-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_ToolkitComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ToolkitComponent.vue */ "./resources/js/components/ToolkitComponent.vue")),
  "video-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_VideoComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/VideoComponent.vue */ "./resources/js/components/VideoComponent.vue")),
  "zakat-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_ZakatComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ZakatComponent.vue */ "./resources/js/components/ZakatComponent.vue")),
  "qibla-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_QiblaComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/QiblaComponent.vue */ "./resources/js/components/QiblaComponent.vue")),
  "mosque-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_MosqueComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/MosqueComponent.vue */ "./resources/js/components/MosqueComponent.vue")),
  "calendar-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_CalendarComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/CalendarComponent.vue */ "./resources/js/components/CalendarComponent.vue")),
  "date-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_DateComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/DateComponent.vue */ "./resources/js/components/DateComponent.vue")),
  "hadith-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_HadithComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/HadithComponent.vue */ "./resources/js/components/HadithComponent.vue")),
  "shop-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_ShopComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ShopComponent.vue */ "./resources/js/components/ShopComponent.vue")),
  "tasbeeh-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_TasbeehComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/TasbeehComponent.vue */ "./resources/js/components/TasbeehComponent.vue")),
  "athkar-component": () => __webpack_require__.e(/*! import() */ "resources_js_components_AthkarComponenet_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./components/AthkarComponenet.vue */ "./resources/js/components/AthkarComponenet.vue")),
  "finance-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_FinanceComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/FinanceComponent.vue */ "./resources/js/components/FinanceComponent.vue")),
  "umrah-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_UmrahComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/UmrahComponent.vue */ "./resources/js/components/UmrahComponent.vue")),
  "name-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_NameComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/NameComponent.vue */ "./resources/js/components/NameComponent.vue")),
  "prayer-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_PrayerComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/PrayerComponent.vue */ "./resources/js/components/PrayerComponent.vue")),
  "travel-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_TravelComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/TravelComponent.vue */ "./resources/js/components/TravelComponent.vue")),
  "media-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_MediaComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/MediaComponent.vue */ "./resources/js/components/MediaComponent.vue")),
  "knowledge-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_KnowledgeComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/KnowledgeComponent.vue */ "./resources/js/components/KnowledgeComponent.vue")),
  "services-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_ServicesComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ServicesComponent.vue */ "./resources/js/components/ServicesComponent.vue")),
  "store-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_StoreComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/StoreComponent.vue */ "./resources/js/components/StoreComponent.vue")),
  "food-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_FoodComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/FoodComponent.vue */ "./resources/js/components/FoodComponent.vue")),
  "school-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_SchoolComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/SchoolComponent.vue */ "./resources/js/components/SchoolComponent.vue")),
  "welfare-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_WelfareComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/WelfareComponent.vue */ "./resources/js/components/WelfareComponent.vue")),
  "books-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_BooksComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/BooksComponent.vue */ "./resources/js/components/BooksComponent.vue")),
  "convert-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_ConvertComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ConvertComponent.vue */ "./resources/js/components/ConvertComponent.vue")),
  "holy-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_HolyComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/HolyComponent.vue */ "./resources/js/components/HolyComponent.vue")),
  "history-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_HistoryComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/HistoryComponent.vue */ "./resources/js/components/HistoryComponent.vue")),
  "payment-methods-component": () => __webpack_require__.e(/*! import() */ "resources_js_components_PaymentMethodsComponent_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./components/PaymentMethodsComponent.vue */ "./resources/js/components/PaymentMethodsComponent.vue")),
  "read-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_ReadComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ReadComponent.vue */ "./resources/js/components/ReadComponent.vue")),
  "revert-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_RevertComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/RevertComponent.vue */ "./resources/js/components/RevertComponent.vue")),
  "muslim-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_MuslimComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/MuslimComponent.vue */ "./resources/js/components/MuslimComponent.vue")),
  "bookmark-manager": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_bookmarks_BookmarkManager_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/bookmarks/BookmarkManager.vue */ "./resources/js/components/bookmarks/BookmarkManager.vue")),
  "shared-folder-view": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_bookmarks_SharedFolderView_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/bookmarks/SharedFolderView.vue */ "./resources/js/components/bookmarks/SharedFolderView.vue"))
};
const registerAsyncComponent = (name, loader) => {
  app.component(name, (0,vue__WEBPACK_IMPORTED_MODULE_0__.defineAsyncComponent)({
    loader: () => loader().then(module => (module === null || module === void 0 ? void 0 : module.default) || module),
    suspensible: false,
    delay: 150,
    timeout: 30000
  }));
};
Object.entries(asyncComponentLoaders).forEach(([name, loader]) => registerAsyncComponent(name, loader));
const mountApp = () => {
  const target = document.getElementById('app');
  if (!target) {
    console.warn('[Vue] mount target #app not found yet; retrying after DOMContentLoaded');
    document.addEventListener('DOMContentLoaded', () => {
      const t2 = document.getElementById('app');
      if (t2) {
        app.mount('#app');
        console.log('[Vue] mounted on #app (after DOMContentLoaded)');
      } else {
        console.error('[Vue] mount failed: #app missing on DOMContentLoaded');
      }
    }, {
      once: true
    });
    return;
  }
  app.mount('#app');
  console.log('[Vue] mounted on #app');
};
try {
  mountApp();
} catch (e) {
  console.error('[Vue] mount failed:', e);
  try {
    const root = document.getElementById('app');
    if (root) root.innerHTML = '<div style="padding:16px;color:#b00020;">App failed to initialize. Check console for details.</div>';
  } catch (_) {}
}

// Global error diagnostics to surface silent failures
window.addEventListener('error', e => {
  console.error('[GlobalError]', (e === null || e === void 0 ? void 0 : e.message) || e);
});
window.addEventListener('unhandledrejection', e => {
  console.error('[UnhandledRejection]', (e === null || e === void 0 ? void 0 : e.reason) || e);
});

/***/ }),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var admin_lte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! admin-lte */ "./node_modules/admin-lte/dist/js/adminlte.min.js");
/* harmony import */ var admin_lte__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(admin_lte__WEBPACK_IMPORTED_MODULE_3__);


// Ensure jQuery is available globally before AdminLTE

window.$ = window.jQuery = (jquery__WEBPACK_IMPORTED_MODULE_1___default());

// Import Bootstrap and AdminLTE JavaScript


window.axios = axios__WEBPACK_IMPORTED_MODULE_0__["default"];
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Accept'] = 'application/json';
window.axios.defaults.headers.common['Content-Type'] = 'application/json';
const csrfMeta = document.head.querySelector('meta[name="csrf-token"]');
if (csrfMeta !== null && csrfMeta !== void 0 && csrfMeta.content) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfMeta.content;
}

/**
* Configure axios for Laravel Sanctum
*/
axios__WEBPACK_IMPORTED_MODULE_0__["default"].defaults.withCredentials = true;
axios__WEBPACK_IMPORTED_MODULE_0__["default"].defaults.baseURL = window.location.origin;
const BOOKMARK_SESSION_KEY = 'ic_bookmark_session_id';
function ensureBookmarkSessionId() {
  if (typeof window === 'undefined') return null;
  let sessionId = window.localStorage.getItem(BOOKMARK_SESSION_KEY);
  if (!sessionId) {
    sessionId = `bm_${Math.random().toString(36).slice(2, 12)}_${Date.now()}`;
    window.localStorage.setItem(BOOKMARK_SESSION_KEY, sessionId);
  }
  return sessionId;
}
const bookmarkSessionId = ensureBookmarkSessionId();
if (bookmarkSessionId) {
  window.axios.defaults.headers.common['X-Bookmark-Session'] = bookmarkSessionId;
}

/**
* Add request interceptor to log requests for debugging
*/
axios__WEBPACK_IMPORTED_MODULE_0__["default"].interceptors.request.use(config => {
  console.log(`Making ${config.method.toUpperCase()} request to: ${config.url}`);
  return config;
}, error => Promise.reject(error));

/**
* Add response interceptor to handle 401 errors globally
*/
axios__WEBPACK_IMPORTED_MODULE_0__["default"].interceptors.response.use(response => {
  console.log(`Response from ${response.config.url}:`, response.status);
  return response;
}, error => {
  var _error$config, _error$response, _error$response2, _error$response3, _error$response4;
  console.error(`Error response from ${(_error$config = error.config) === null || _error$config === void 0 ? void 0 : _error$config.url}:`, (_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status, (_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.data);
  if (((_error$response3 = error.response) === null || _error$response3 === void 0 ? void 0 : _error$response3.status) === 401 && !window.location.pathname.includes('/login')) {
    console.log('Authentication required');
  }
  if (((_error$response4 = error.response) === null || _error$response4 === void 0 ? void 0 : _error$response4.status) === 405) {
    var _error$config2, _error$config3;
    console.error('Method not allowed:', (_error$config2 = error.config) === null || _error$config2 === void 0 ? void 0 : _error$config2.method, (_error$config3 = error.config) === null || _error$config3 === void 0 ? void 0 : _error$config3.url);
  }
  return Promise.reject(error);
});

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
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PricingComponent_vue_vue_type_style_index_0_id_d4146a7c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PricingComponent.vue?vue&type=style&index=0&id=d4146a7c&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PricingComponent.vue?vue&type=style&index=0&id=d4146a7c&scoped=true&lang=css");


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
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionForm_vue_vue_type_style_index_0_id_55d8ed6c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SubscriptionForm.vue?vue&type=style&index=0&id=55d8ed6c&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionForm.vue?vue&type=style&index=0&id=55d8ed6c&scoped=true&lang=css");


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


/***/ }),

/***/ "./resources/js/components/admin_panels/DashboardComponent.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/components/admin_panels/DashboardComponent.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DashboardComponent_vue_vue_type_template_id_186a9dc4_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DashboardComponent.vue?vue&type=template&id=186a9dc4&scoped=true */ "./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=template&id=186a9dc4&scoped=true");
/* harmony import */ var _DashboardComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DashboardComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _DashboardComponent_vue_vue_type_style_index_0_id_186a9dc4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css */ "./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_DashboardComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_DashboardComponent_vue_vue_type_template_id_186a9dc4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-186a9dc4"],['__file',"resources/js/components/admin_panels/DashboardComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DashboardComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css":
/*!*****************************************************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_style_index_0_id_186a9dc4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=186a9dc4&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=template&id=186a9dc4&scoped=true":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=template&id=186a9dc4&scoped=true ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_template_id_186a9dc4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_template_id_186a9dc4_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DashboardComponent.vue?vue&type=template&id=186a9dc4&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=template&id=186a9dc4&scoped=true");


/***/ }),

/***/ "./resources/js/components/admin_panels/DonationComponent.vue":
/*!********************************************************************!*\
  !*** ./resources/js/components/admin_panels/DonationComponent.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DonationComponent_vue_vue_type_template_id_485a7e74__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DonationComponent.vue?vue&type=template&id=485a7e74 */ "./resources/js/components/admin_panels/DonationComponent.vue?vue&type=template&id=485a7e74");
/* harmony import */ var _DonationComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DonationComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/DonationComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_DonationComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_DonationComponent_vue_vue_type_template_id_485a7e74__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/admin_panels/DonationComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/DonationComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/DonationComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DonationComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DonationComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DonationComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DonationComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/admin_panels/DonationComponent.vue?vue&type=template&id=485a7e74":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/DonationComponent.vue?vue&type=template&id=485a7e74 ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DonationComponent_vue_vue_type_template_id_485a7e74__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DonationComponent_vue_vue_type_template_id_485a7e74__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DonationComponent.vue?vue&type=template&id=485a7e74 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DonationComponent.vue?vue&type=template&id=485a7e74");


/***/ }),

/***/ "./resources/js/components/admin_panels/FeedbackComponent.vue":
/*!********************************************************************!*\
  !*** ./resources/js/components/admin_panels/FeedbackComponent.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FeedbackComponent_vue_vue_type_template_id_67079fb3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FeedbackComponent.vue?vue&type=template&id=67079fb3 */ "./resources/js/components/admin_panels/FeedbackComponent.vue?vue&type=template&id=67079fb3");
/* harmony import */ var _FeedbackComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FeedbackComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/FeedbackComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_FeedbackComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_FeedbackComponent_vue_vue_type_template_id_67079fb3__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/admin_panels/FeedbackComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/FeedbackComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/FeedbackComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FeedbackComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FeedbackComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FeedbackComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/FeedbackComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/admin_panels/FeedbackComponent.vue?vue&type=template&id=67079fb3":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/FeedbackComponent.vue?vue&type=template&id=67079fb3 ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FeedbackComponent_vue_vue_type_template_id_67079fb3__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FeedbackComponent_vue_vue_type_template_id_67079fb3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FeedbackComponent.vue?vue&type=template&id=67079fb3 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/FeedbackComponent.vue?vue&type=template&id=67079fb3");


/***/ }),

/***/ "./resources/js/components/admin_panels/MailingListComponent.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/components/admin_panels/MailingListComponent.vue ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MailingListComponent_vue_vue_type_template_id_fdb3c6ee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MailingListComponent.vue?vue&type=template&id=fdb3c6ee */ "./resources/js/components/admin_panels/MailingListComponent.vue?vue&type=template&id=fdb3c6ee");
/* harmony import */ var _MailingListComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MailingListComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/MailingListComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_MailingListComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_MailingListComponent_vue_vue_type_template_id_fdb3c6ee__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/admin_panels/MailingListComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/MailingListComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/MailingListComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MailingListComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MailingListComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MailingListComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/MailingListComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/admin_panels/MailingListComponent.vue?vue&type=template&id=fdb3c6ee":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/MailingListComponent.vue?vue&type=template&id=fdb3c6ee ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MailingListComponent_vue_vue_type_template_id_fdb3c6ee__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MailingListComponent_vue_vue_type_template_id_fdb3c6ee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MailingListComponent.vue?vue&type=template&id=fdb3c6ee */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/MailingListComponent.vue?vue&type=template&id=fdb3c6ee");


/***/ }),

/***/ "./resources/js/components/admin_panels/PaymentComponent.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/components/admin_panels/PaymentComponent.vue ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PaymentComponent_vue_vue_type_template_id_25dc03a8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PaymentComponent.vue?vue&type=template&id=25dc03a8&scoped=true */ "./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=template&id=25dc03a8&scoped=true");
/* harmony import */ var _PaymentComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PaymentComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _PaymentComponent_vue_vue_type_style_index_0_id_25dc03a8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PaymentComponent.vue?vue&type=style&index=0&id=25dc03a8&scoped=true&lang=css */ "./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=style&index=0&id=25dc03a8&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_PaymentComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PaymentComponent_vue_vue_type_template_id_25dc03a8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-25dc03a8"],['__file',"resources/js/components/admin_panels/PaymentComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=script&lang=js":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PaymentComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PaymentComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PaymentComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=style&index=0&id=25dc03a8&scoped=true&lang=css":
/*!***************************************************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=style&index=0&id=25dc03a8&scoped=true&lang=css ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PaymentComponent_vue_vue_type_style_index_0_id_25dc03a8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PaymentComponent.vue?vue&type=style&index=0&id=25dc03a8&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=style&index=0&id=25dc03a8&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=template&id=25dc03a8&scoped=true":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=template&id=25dc03a8&scoped=true ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PaymentComponent_vue_vue_type_template_id_25dc03a8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PaymentComponent_vue_vue_type_template_id_25dc03a8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PaymentComponent.vue?vue&type=template&id=25dc03a8&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=template&id=25dc03a8&scoped=true");


/***/ }),

/***/ "./resources/js/components/admin_panels/ProfileComponent.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/components/admin_panels/ProfileComponent.vue ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProfileComponent_vue_vue_type_template_id_499c6769_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProfileComponent.vue?vue&type=template&id=499c6769&scoped=true */ "./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=template&id=499c6769&scoped=true");
/* harmony import */ var _ProfileComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProfileComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _ProfileComponent_vue_vue_type_style_index_0_id_499c6769_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProfileComponent.vue?vue&type=style&index=0&id=499c6769&scoped=true&lang=css */ "./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=style&index=0&id=499c6769&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ProfileComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ProfileComponent_vue_vue_type_template_id_499c6769_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-499c6769"],['__file',"resources/js/components/admin_panels/ProfileComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=script&lang=js":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ProfileComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=style&index=0&id=499c6769&scoped=true&lang=css":
/*!***************************************************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=style&index=0&id=499c6769&scoped=true&lang=css ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileComponent_vue_vue_type_style_index_0_id_499c6769_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ProfileComponent.vue?vue&type=style&index=0&id=499c6769&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=style&index=0&id=499c6769&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=template&id=499c6769&scoped=true":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=template&id=499c6769&scoped=true ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileComponent_vue_vue_type_template_id_499c6769_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileComponent_vue_vue_type_template_id_499c6769_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ProfileComponent.vue?vue&type=template&id=499c6769&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=template&id=499c6769&scoped=true");


/***/ }),

/***/ "./resources/js/components/admin_panels/UsersComponent.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/components/admin_panels/UsersComponent.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UsersComponent_vue_vue_type_template_id_e9381eac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsersComponent.vue?vue&type=template&id=e9381eac */ "./resources/js/components/admin_panels/UsersComponent.vue?vue&type=template&id=e9381eac");
/* harmony import */ var _UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UsersComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/UsersComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _UsersComponent_vue_vue_type_style_index_0_id_e9381eac_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UsersComponent.vue?vue&type=style&index=0&id=e9381eac&lang=css */ "./resources/js/components/admin_panels/UsersComponent.vue?vue&type=style&index=0&id=e9381eac&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_UsersComponent_vue_vue_type_template_id_e9381eac__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/admin_panels/UsersComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/UsersComponent.vue?vue&type=script&lang=js":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/UsersComponent.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UsersComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/UsersComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/admin_panels/UsersComponent.vue?vue&type=style&index=0&id=e9381eac&lang=css":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/UsersComponent.vue?vue&type=style&index=0&id=e9381eac&lang=css ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsersComponent_vue_vue_type_style_index_0_id_e9381eac_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UsersComponent.vue?vue&type=style&index=0&id=e9381eac&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/UsersComponent.vue?vue&type=style&index=0&id=e9381eac&lang=css");


/***/ }),

/***/ "./resources/js/components/admin_panels/UsersComponent.vue?vue&type=template&id=e9381eac":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/UsersComponent.vue?vue&type=template&id=e9381eac ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsersComponent_vue_vue_type_template_id_e9381eac__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsersComponent_vue_vue_type_template_id_e9381eac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UsersComponent.vue?vue&type=template&id=e9381eac */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/UsersComponent.vue?vue&type=template&id=e9381eac");


/***/ }),

/***/ "./resources/js/utils/bookmarkAuth.js":
/*!********************************************!*\
  !*** ./resources/js/utils/bookmarkAuth.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchUserIdFromApi: () => (/* binding */ fetchUserIdFromApi),
/* harmony export */   resolveClientUserId: () => (/* binding */ resolveClientUserId)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");

const USER_META_SELECTOR = 'meta[name="user"]';
function parseId(value) {
  if (value === undefined || value === null) return null;
  const normalized = String(value).trim();
  if (!normalized) return null;
  const asNumber = Number(normalized);
  return Number.isFinite(asNumber) && asNumber > 0 ? asNumber : normalized;
}
function resolveClientUserId() {
  var _window, _document$body, _document$body2;
  if (typeof window === 'undefined') {
    return null;
  }
  if ((_window = window) !== null && _window !== void 0 && (_window = _window.Laravel) !== null && _window !== void 0 && _window.userId) {
    return parseId(window.Laravel.userId);
  }
  const meta = document.querySelector(USER_META_SELECTOR);
  const metaValue = parseId(meta === null || meta === void 0 ? void 0 : meta.getAttribute('content'));
  if (metaValue) {
    return metaValue;
  }
  const datasetValue = parseId(((_document$body = document.body) === null || _document$body === void 0 || (_document$body = _document$body.dataset) === null || _document$body === void 0 ? void 0 : _document$body.userId) || ((_document$body2 = document.body) === null || _document$body2 === void 0 || (_document$body2 = _document$body2.dataset) === null || _document$body2 === void 0 ? void 0 : _document$body2.user));
  if (datasetValue) {
    return datasetValue;
  }
  return null;
}
async function fetchUserIdFromApi() {
  const localId = resolveClientUserId();
  if (localId) {
    return localId;
  }
  try {
    var _response$data;
    const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/userId');
    const apiValue = parseId((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.userId);
    if (apiValue) {
      return apiValue;
    }
  } catch (error) {
    // swallow; helper should not break callers
  }
  return null;
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["css/app","css/layout","/js/vendor"], () => (__webpack_exec__("./resources/js/app.js"), __webpack_exec__("./resources/css/app.css"), __webpack_exec__("./resources/css/layout.css")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);