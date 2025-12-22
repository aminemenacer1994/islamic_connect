"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_HomepageComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      chatDraft: '',
      chatHistory: [],
      chatLoading: false,
      chatError: null,
      sessionId: null,
      suggestedQuestions: ['🕌 What steps can I take to prepare for Jumuah prayer?', '📖 Explain one verse that highlights mercy in the Quran.', '🤲 How can I keep my dua consistent during exams?', '🌙 What practical tips help me benefit from Ramadan nights?', '📿 Recommend a short dhikr routine for busy days.', '🕋 Why is visiting the Prophet’s Mosque special?', '📜 Share a dua for starting a new project.', '📚 Where can I find authentic stories of the companions?', '🌗 How can I adapt worship during travel or busy weeks?', '📝 What are respectful ways to ask scholars about complex issues?', '🕊️ How do I practice patience during tough family moments?', '🧭 What principles help select reliable Islamic content online?', '🕌 How can I memorize a new surah efficiently?', '🪔 Tell me about a dua for seeking knowledge.', '🌟 What are uplifting reminders for kids before bedtime?']
    };
  },
  computed: {
    suggestionRows() {
      const rows = [];
      const perRow = Math.ceil(this.suggestedQuestions.length / 3);
      rows.push(...[0, 1, 2].map(rowIndex => {
        const start = rowIndex * perRow;
        const rowItems = this.suggestedQuestions.slice(start, start + perRow);
        if (!rowItems.length) return null;
        return {
          index: rowIndex,
          items: rowItems,
          loopItems: [...rowItems, ...rowItems]
        };
      }).filter(Boolean));
      return rows;
    }
  },
  methods: {
    createChatEntry(role, text) {
      const now = new Date();
      return {
        role,
        text,
        time: now.toISOString(),
        displayTime: now.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit'
        }),
        displayDate: now.toLocaleDateString([], {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        })
      };
    },
    getConversationForRequest() {
      return this.chatHistory.slice(-6).map(entry => ({
        role: entry.role,
        content: entry.text
      }));
    },
    scrollChatWindow() {
      this.$nextTick(() => {
        const container = this.$refs.chatShell || this.$refs.chatWindow;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
    async sendChatMessage() {
      if (this.chatLoading) return;
      const message = this.chatDraft.trim();
      if (!message) return;
      this.chatError = null;
      this.chatDraft = '';
      this.chatHistory.push(this.createChatEntry('user', message));
      this.scrollChatWindow();
      const payload = {
        message,
        history: this.getConversationForRequest()
      };
      try {
        var _document$querySelect;
        this.chatLoading = true;
        const session = this.sessionId || this.resetSession();
        const csrfToken = (_document$querySelect = document.querySelector('meta[name="csrf-token"]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getAttribute('content');
        if (!csrfToken) {
          throw new Error('Unable to send the question right now.');
        }
        const response = await fetch('/ai/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrfToken
          },
          body: JSON.stringify(_objectSpread(_objectSpread({}, payload), {}, {
            sessionId: session
          }))
        });
        const responseData = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(responseData.error || 'Unable to get a response right now.');
        }
        const answer = (responseData.answer || '').trim();
        if (!answer) {
          throw new Error('The assistant did not return an answer. Please try again.');
        }
        this.chatHistory.push(this.createChatEntry('assistant', answer));
        this.scrollChatWindow();
      } catch (error) {
        console.error('Chat error:', error);
        this.chatError = (error === null || error === void 0 ? void 0 : error.message) || 'The assistant is temporarily unavailable.';
      } finally {
        this.chatLoading = false;
      }
    },
    selectSuggestedQuestion(question) {
      if (this.chatLoading) return;
      this.chatDraft = question;
      this.$nextTick(() => {
        const root = this.$refs.aiRoot;
        if (root) {
          root.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
        const textarea = this.$refs.aiChatInput;
        if (textarea) {
          textarea.focus();
        }
        const form = this.$refs.aiForm;
        if (form) {
          form.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
          });
        }
        this.sendChatMessage();
      });
    },
    resetSession() {
      this.sessionId = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
      return this.sessionId;
    },
    startNewChat() {
      this.chatHistory = [];
      this.chatDraft = '';
      this.chatError = null;
      this.resetSession();
    },
    clearHistory() {
      this.chatHistory = [];
      this.chatError = null;
      this.resetSession();
    }
  },
  mounted() {
    this.resetSession();
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=script&defer=true&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=script&defer=true&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _AiComponent_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AiComponent.vue */ "./resources/js/components/AiComponent.vue");



// Lazy-load heavier child components to improve initial render
const PrayerTimes = (0,vue__WEBPACK_IMPORTED_MODULE_1__.defineAsyncComponent)(() => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_translation_PrayerTimes_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./translation/PrayerTimes.vue */ "./resources/js/components/translation/PrayerTimes.vue")));
const AyahOfTheDay = (0,vue__WEBPACK_IMPORTED_MODULE_1__.defineAsyncComponent)(() => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_translation_AyahOfTheDay_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./translation/AyahOfTheDay.vue */ "./resources/js/components/translation/AyahOfTheDay.vue")));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    // HijriCalendar
    PrayerTimes,
    AyahOfTheDay,
    AiComponent: _AiComponent_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data() {
    return {
      amount: 10,
      carouselReady: false,
      partners: [{
        name: "Ana Atlou",
        icon: "/images/aatlout.webp"
      }, {
        name: "Noor Taibah",
        icon: "/images/algerian.png"
      }, {
        name: "Algerian Quran",
        icon: "/images/aatlout.webp"
      }, {
        name: "Islamic Connect",
        icon: "/images/algerian.png"
      }],
      chunkSize: 4,
      mailing: {},
      feedback: {},
      seoStats: [{
        value: "85%",
        label: "Accessibility score"
      }, {
        value: "75+",
        label: "Countries served"
      }, {
        value: "575+",
        label: "Cities reached"
      }],
      seoCards: [{
        title: "Quran Explorer",
        desc: "Open Quran translations, tafsir, and audio helpers.",
        href: "/quran"
      }, {
        title: "Dua Collections",
        desc: "Search authentic supplications for gratitude and travel.",
        href: "/dua"
      }, {
        title: "Hadith Library",
        desc: "Browse trusted narrations with context.",
        href: "/ahadith"
      }, {
        title: "Guides & Articles",
        desc: "Study modern spirituality and fiqh topics.",
        href: "/guide"
      }, {
        title: "Mission Stories",
        desc: "Discover global impact from teams and volunteers.",
        href: "/mission"
      }, {
        title: "Support & Donations",
        desc: "Fuel the platform and community programs.",
        href: "/support"
      }],
      externalLinks: [{
        href: "https://quran.com",
        title: "Quran.com complete Quran translations",
        text: "Quran.com — Complete Quran text and translations"
      }, {
        href: "https://sunnah.com",
        title: "Sunnah.com searchable hadiths",
        text: "Sunnah.com — Hadith collections in searchable format"
      }, {
        href: "https://islamicfinder.org",
        title: "IslamicFinder global prayer data",
        text: "IslamicFinder.org — Prayer times, mosque locators, and event calendars"
      }],
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
      }],
      // Unified reactive form object (avoid duplicate keys)
      form: new Form({
        firstname: "",
        lastname: "",
        email: "",
        subject: "",
        message: ""
      }),
      confirmDialog: {
        visible: false,
        title: "",
        message: "",
        confirmLabel: "Confirm",
        action: null
      },
      toast: {
        visible: false,
        title: "",
        message: "",
        type: "success"
      },
      toastTimer: null
    };
  },
  computed: {
    chunkedPartners() {
      const chunks = [];
      for (let i = 0; i < this.partners.length; i += this.chunkSize) {
        chunks.push(this.partners.slice(i, i + this.chunkSize));
      }
      return chunks;
    },
    finalAmount() {
      return this.amount;
    },
    isValidAmount() {
      return this.finalAmount > 0;
    },
    impactMessage() {
      if (this.amount >= 100) return 'Major platform enhancement';
      if (this.amount >= 50) return 'Content development for many users';
      if (this.amount >= 25) return 'Supports multiple users monthly';
      return 'Helps maintain basic access';
    },
    stripeUrl() {
      const amountInCents = this.finalAmount * 100;
      return `https://donate.stripe.com/6oE5kY84oc3q7fy145?amount=${amountInCents}`;
    }
  },
  mounted() {
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.carouselReady = true;
        }, 400);
      });
    } else {
      this.carouselReady = true;
    }
  },
  methods: {
    goTo(path) {
      var _window;
      if (typeof window !== 'undefined' && (_window = window) !== null && _window !== void 0 && _window.location) {
        window.location.href = path;
      }
    },
    processDonation() {
      if (!this.isValidAmount) {
        alert('Please select a contribution amount.');
        return;
      }
      window.location.href = this.stripeUrl;
    },
    sendMessage() {
      this.showConfirm({
        title: "Ready to send your message?",
        message: "We'll route this message to the correct team and share a thoughtful reply within 24 hours.",
        confirmLabel: "Send message",
        action: () => {
          this.postForm("/api/send-message", "Message sent successfully", "We received your message and will respond shortly.");
        }
      });
    },
    submitMail() {
      this.showConfirm({
        title: "Join the mailing list?",
        message: "Stay in the loop with updates, launches, and new resources from the Islamic Connect mission.",
        confirmLabel: "Subscribe",
        action: () => {
          this.postForm("/api/submit-mail", "Mailing List Subscribed", "Thank you for joining our email community.");
        }
      });
    },
    postForm(url, toastTitle, toastMessage) {
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(url, this.form).then(() => {
        this.showToast("success", toastTitle, toastMessage);
        this.form.reset();
      }).catch(err => {
        var _err$response;
        const errorMessage = ((_err$response = err.response) === null || _err$response === void 0 || (_err$response = _err$response.data) === null || _err$response === void 0 ? void 0 : _err$response.message) || "Please try again later.";
        this.showToast("error", "Something went wrong", errorMessage);
      });
    },
    showConfirm({
      title,
      message,
      confirmLabel = "Confirm",
      action
    }) {
      this.confirmDialog = {
        visible: true,
        title,
        message,
        confirmLabel,
        action
      };
    },
    handleCancel() {
      this.confirmDialog.visible = false;
      this.confirmDialog.action = null;
    },
    handleConfirm() {
      const action = this.confirmDialog.action;
      this.handleCancel();
      if (typeof action === "function") {
        action();
      }
    },
    showToast(type, title, message) {
      if (this.toastTimer) {
        clearTimeout(this.toastTimer);
      }
      this.toast = {
        visible: true,
        type,
        title,
        message
      };
      this.toastTimer = setTimeout(() => {
        this.toast.visible = false;
        this.toastTimer = null;
      }, 3200);
    },
    dismissToast() {
      if (this.toastTimer) {
        clearTimeout(this.toastTimer);
        this.toastTimer = null;
      }
      this.toast.visible = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=template&id=300b761a&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=template&id=300b761a&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  ref: "aiRoot",
  "aria-label": "Islamic chatbot"
};
const _hoisted_2 = {
  class: "ai-controls",
  role: "toolbar",
  "aria-label": "Chat controls"
};
const _hoisted_3 = ["disabled"];
const _hoisted_4 = {
  class: "ai-suggestions",
  "aria-label": "Suggested questions"
};
const _hoisted_5 = {
  class: "ai-suggestions-list"
};
const _hoisted_6 = {
  class: "ai-suggestion-track"
};
const _hoisted_7 = ["onClick", "disabled"];
const _hoisted_8 = {
  class: "ai-suggestion-text"
};
const _hoisted_9 = {
  key: 0,
  ref: "chatShell",
  class: "ai-chat-shell"
};
const _hoisted_10 = {
  ref: "chatWindow",
  class: "ai-chat-window",
  role: "log",
  "aria-live": "polite"
};
const _hoisted_11 = {
  class: "chat-entry-header"
};
const _hoisted_12 = {
  class: "chat-role mr-2"
};
const _hoisted_13 = {
  class: "chat-timestamp"
};
const _hoisted_14 = ["disabled"];
const _hoisted_15 = {
  class: "ai-form-meta pt-2 text-muted"
};
const _hoisted_16 = ["disabled"];
const _hoisted_17 = {
  key: 0,
  class: "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
};
const _hoisted_18 = {
  key: 0,
  class: "ai-error"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"ai-welcome\" aria-live=\"polite\" data-v-300b761a><div class=\"ai-welcome-icon\" aria-hidden=\"true\" data-v-300b761a><i class=\"fas fa-infinity\" aria-hidden=\"true\" data-v-300b761a></i></div><div class=\"ai-welcome-text\" data-v-300b761a><h2 class=\"fw-bold\" data-v-300b761a>How can I assist your journey today?</h2><p class=\"container ai-welcome-copy\" data-v-300b761a> Tap a suggested question or type anything about Quranic inspiration, prophetic guidance, or daily worship and I’ll respond with balanced, source-rooted clarity. </p></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-control-btn ai-control-btn--primary",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.startNewChat && $options.startNewChat(...args))
  }, [...(_cache[4] || (_cache[4] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-plus-circle",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" New chat ", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-control-btn",
    disabled: !$data.chatHistory.length,
    onClick: _cache[1] || (_cache[1] = (...args) => $options.clearHistory && $options.clearHistory(...args))
  }, [...(_cache[5] || (_cache[5] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-trash-alt",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Clear history ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_3)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "fw-bold"
  }, "Need inspiration ?", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.suggestionRows, row => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: `row-${row.index}`,
      class: "ai-suggestion-row",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        '--row': row.index
      })
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(row.loopItems, (question, idx) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
        key: `row-${row.index}-${idx}-${question}`,
        type: "button",
        class: "ai-suggestion",
        onClick: $event => $options.selectSuggestedQuestion(question),
        disabled: $data.chatLoading
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(question), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_7);
    }), 128 /* KEYED_FRAGMENT */))])], 4 /* STYLE */);
  }), 128 /* KEYED_FRAGMENT */))])]), $data.chatHistory.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.chatHistory, (entry, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: `chat-${idx}-${entry.role}`,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['chat-entry', entry.role])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.role === 'assistant' ? 'Assistant' : 'You'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.displayTime) + " · " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.displayDate), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['chat-bubble', entry.role])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.text), 3 /* TEXT, CLASS */)], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */)], 512 /* NEED_PATCH */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    ref: "aiForm",
    class: "ai-form pt-3",
    onSubmit: _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.sendChatMessage && $options.sendChatMessage(...args), ["prevent"]))
  }, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "visually-hidden",
    for: "aiChatInput"
  }, "Ask the chatbot", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    id: "aiChatInput",
    ref: "aiChatInput",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.chatDraft = $event),
    class: "ai-textarea",
    rows: "2",
    placeholder: "Ask about Quranic verses, dua etiquette, prophetic stories, daily worship, or Islamic values.",
    disabled: $data.chatLoading
  }, null, 8 /* PROPS */, _hoisted_14), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.chatDraft]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "ai-submit",
    disabled: $data.chatLoading || !$data.chatDraft.trim()
  }, [$data.chatLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_17)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.chatLoading ? 'Thinking...' : 'Ask your Assistant'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_16)]), $data.chatError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.chatError), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 544 /* NEED_HYDRATION, NEED_PATCH */)])], 512 /* NEED_PATCH */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=template&id=2ba25654&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=template&id=2ba25654&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container-fluid px-0 py-5 welcome-chat-shell",
  "aria-label": "Islamic chatbot preview"
};
const _hoisted_2 = {
  class: "welcome-chat-frame mb-2"
};
const _hoisted_3 = {
  class: "container-fluid premium-seo px-0",
  "aria-labelledby": "seo-heading"
};
const _hoisted_4 = {
  class: "container position-relative"
};
const _hoisted_5 = {
  class: "row gy-4 align-items-center"
};
const _hoisted_6 = {
  class: "col-lg-6 text-center text-lg-start"
};
const _hoisted_7 = {
  class: "row row-cols-3 g-3"
};
const _hoisted_8 = {
  class: "p-4 premium-stat h-100 text-center"
};
const _hoisted_9 = {
  class: "h3 fw-bold mb-1"
};
const _hoisted_10 = {
  class: "text-muted"
};
const _hoisted_11 = {
  class: "col-lg-6"
};
const _hoisted_12 = {
  class: "row row-cols-1 row-cols-md-2 g-3"
};
const _hoisted_13 = {
  class: "premium-card h-100 d-flex flex-column"
};
const _hoisted_14 = {
  class: "h6 fw-semibold mb-2"
};
const _hoisted_15 = {
  class: "small text-muted mb-3"
};
const _hoisted_16 = ["title", "href"];
const _hoisted_17 = {
  class: "row mt-5 gx-lg-5 gy-4"
};
const _hoisted_18 = {
  class: "col-md-6"
};
const _hoisted_19 = {
  class: "list-unstyled mb-0"
};
const _hoisted_20 = ["title", "href"];
const _hoisted_21 = {
  class: "py-5 bg-white",
  "aria-labelledby": "premium-heading",
  role: "region"
};
const _hoisted_22 = {
  class: "container"
};
const _hoisted_23 = {
  class: "row justify-content-center"
};
const _hoisted_24 = {
  class: "col-lg-10"
};
const _hoisted_25 = {
  class: "row g-4"
};
const _hoisted_26 = {
  class: "col-md-6"
};
const _hoisted_27 = {
  class: "h-100 d-flex flex-column justify-content-between",
  style: {
    "background": "white",
    "border-radius": "12px",
    "border": "1px solid #e9ecef",
    "box-shadow": "0 10px 30px rgba(0,0,0,0.08)"
  }
};
const _hoisted_28 = {
  class: "p-4 text-start"
};
const _hoisted_29 = {
  class: "py-5 contact-section position-relative",
  "aria-labelledby": "contact-heading"
};
const _hoisted_30 = {
  class: "container px-lg-4"
};
const _hoisted_31 = {
  class: "row justify-content-center mt-4"
};
const _hoisted_32 = {
  class: "col-xl-10"
};
const _hoisted_33 = {
  class: "contact-card shadow-lg rounded-4"
};
const _hoisted_34 = {
  class: "row g-3"
};
const _hoisted_35 = {
  class: "col-md-6"
};
const _hoisted_36 = {
  class: "col-md-6"
};
const _hoisted_37 = {
  class: "col-md-6"
};
const _hoisted_38 = {
  class: "col-md-6"
};
const _hoisted_39 = ["value"];
const _hoisted_40 = {
  class: "col-12"
};
const _hoisted_41 = {
  key: 0,
  class: "premium-dialog-overlay"
};
const _hoisted_42 = {
  class: "premium-dialog-card"
};
const _hoisted_43 = {
  class: "premium-dialog-title"
};
const _hoisted_44 = {
  class: "premium-dialog-message"
};
const _hoisted_45 = {
  class: "d-flex align-items-center justify-content-end gap-2 mt-3"
};
const _hoisted_46 = {
  class: "mb-0 fw-bold"
};
const _hoisted_47 = {
  class: "text-muted"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ai_component = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ai-component");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" header "), _cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"jumbotron\" style=\"box-shadow:rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;\" data-v-2ba25654><!-- Content --><div class=\"container-fluid\" style=\"position:relative;\" data-v-2ba25654><!-- Enhanced Hero Section --><div class=\"container-fluid text-center\" style=\"position:relative;overflow:hidden;\" data-v-2ba25654><!-- Background Elements --><div style=\"position:absolute;right:-10%;width:400px;height:400px;border-radius:50%;animation:float-hero 8s ease-in-out infinite;z-index:1;\" data-v-2ba25654></div><div style=\"position:absolute;bottom:-30%;left:-5%;width:300px;height:300px;background:linear-gradient(135deg, rgba(26, 95, 122, 0.08) 0%, rgba(0, 191, 166, 0.08) 100%);border-radius:50%;animation:float-hero 6s ease-in-out infinite 2s;z-index:1;\" data-v-2ba25654></div><div class=\"row align-items-center\" style=\"position:relative;z-index:2;\" data-v-2ba25654><div class=\"col-md-6\" data-v-2ba25654><div class=\"text-left\" data-v-2ba25654><!-- Badge --><div style=\"background:linear-gradient(135deg, rgb(0, 121, 107), #1a5f7a);color:white;padding:0.5rem 1.5rem;border-radius:50px;display:inline-block;margin-bottom:1.5rem;box-shadow:0 5px 15px rgba(0, 191, 166, 0.3);font-weight:600;font-size:0.9rem;letter-spacing:0.5px;\" data-v-2ba25654><i class=\"fas fa-star me-2\" data-v-2ba25654></i>Trusted by 1000&#39;s of Muslims Worldwide </div><h1 class=\"display-4 mt-1 fw-bold text-left hero-title\" style=\"background:linear-gradient(135deg, #1a5f7a, #2c3e50);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.2;margin-bottom:1.5rem;text-shadow:0 2px 10px rgba(0, 0, 0, 0.1);font-size:3.5rem;\" data-v-2ba25654> Connecting You to Islamic Knowledge Seamlessly and Accessibly </h1><h2 class=\"lead pt-3 text-left\" style=\"line-height:1.8em;font-size:1.3rem;color:#4a5568;font-weight:500;margin-bottom:1.25rem;padding-right:1rem;\" data-v-2ba25654><p data-v-2ba25654> Connecting you to Islamic knowledge seamlessly and accessibly, your all-in-one platform to explore the Quran, learn from trusted content, and access AI-powered tools for a transformative spiritual experience anytime, anywhere. </p></h2><div class=\"row mb-3\" data-v-2ba25654><div class=\"col-12\" data-v-2ba25654><div class=\"controls d-flex flex-row justify-content-start text-left\" style=\"gap:1rem;\" data-v-2ba25654><a href=\"/surat\" class=\"btn btn-lg btn-teal rounded-20 fw-bold px-4\" data-v-2ba25654><i class=\"fas fa-rocket me-2\" data-v-2ba25654></i>Get Started Free </a><a href=\"/subscribe\" class=\"btn btn-lg rounded-20 fw-bold pt-2 px-4\" style=\"background:rgba(255,255,255,0.9);color:#1a5f7a;border:2px solid #1a5f7a;\" data-v-2ba25654><i class=\"fas fa-heart me-2\" data-v-2ba25654></i>Support Our Mission </a></div><!-- Trust Indicators --><div class=\"mt-3 d-flex align-items-center\" style=\"gap:1.5rem;\" data-v-2ba25654><div class=\"d-flex align-items-center\" data-v-2ba25654><i class=\"fas fa-shield-alt text-success me-2\" data-v-2ba25654></i><small style=\"color:#4a5568;font-weight:600;\" data-v-2ba25654>Secure Platform</small></div><div class=\"d-flex align-items-center\" data-v-2ba25654><i class=\"fas fa-clock text-warning me-2\" data-v-2ba25654></i><small style=\"color:#4a5568;font-weight:600;\" data-v-2ba25654>Instant Access</small></div><div class=\"d-flex align-items-center\" data-v-2ba25654><i class=\"fas fa-user-check text-info me-2\" data-v-2ba25654></i><small style=\"color:#4a5568;font-weight:600;\" data-v-2ba25654>No Registration</small></div></div></div></div></div></div><div class=\"col-md-6\" data-v-2ba25654><div class=\"text-center\" data-v-2ba25654><picture data-v-2ba25654><source srcset=\"/images/banner-photo.avif 800w\" type=\"image/avif\" data-v-2ba25654><img src=\"/images/banner-photo.avif\" srcset=\"/images/banner-photo.avif 800w\" sizes=\"(min-width: 992px) 50vw, (min-width: 768px) 60vw, 90vw\" class=\"img-fluid hero-image\" alt=\"Islamic Connect platform showcasing Quran exploration and AI-powered tools\" loading=\"lazy\" width=\"800\" height=\"800\" data-v-2ba25654></picture></div></div></div></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <section aria-labelledby=\"prayer-times-heading\">\n      <div class=\"container-fluid\">\n        <div class=\"row justify-content-center\">\n          <div class=\"col-12\">\n            -- SEO Optimized Heading --\n            <h2 id=\"prayer-times-heading\" class=\"text-center mb-4\" style=\"color: black; font-weight: 800;\">\n              Today's Prayer Times\n            </h2>\n\n            -- Performance & Accessibility Enhanced Component --\n            <PrayerTimes class=\"mb-3 prayer-times-enhanced\" :lazy-load=\"true\" :reduce-motion=\"true\" aria-live=\"polite\"\n              aria-atomic=\"true\" />\n\n          </div>\n        </div>\n      </div>\n    </section> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ai_component)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" HERO / SEO SECTION "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_3, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "premium-seo__backdrop"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<h2 id=\"seo-heading\" class=\"display-5 fw-bold mb-3\" data-v-2ba25654>Discover Quran, Knowledge &amp; Accessible Tools</h2><p class=\"text-muted mb-3\" data-v-2ba25654>A premium hero-inspired narrative that balances on-brand gradients with clean typography. These headings and stats reiterate the title keywords before Vue hydrates the rest of the experience.</p><p class=\"text-muted mb-4\" data-v-2ba25654>Explore curated pathways with subtle motion, modern gradients, and polished visuals—each insight is crafted to feel alive, centered, and spiritually uplifting.</p><div class=\"d-flex flex-wrap gap-3 mb-4 justify-content-center justify-content-lg-start\" data-v-2ba25654><span class=\"badge badge-pill highlight-badge\" data-v-2ba25654>Quran insights</span><span class=\"badge badge-pill highlight-badge\" data-v-2ba25654>Dua playlists</span><span class=\"badge badge-pill highlight-badge\" data-v-2ba25654>Mission stories</span></div>", 4)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.seoStats, stat => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col",
      key: stat.label
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.value), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.label), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.seoCards, card => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col",
      key: card.title
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.desc), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      title: card.title,
      class: "mt-auto fw-semibold text-teal",
      href: card.href
    }, "Explore →", 8 /* PROPS */, _hoisted_16)])]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "h5 fw-semibold"
  }, "External references we trust", -1 /* CACHED */)), _cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted mb-2"
  }, "High-quality partners and verified resources add credibility to the journeys promoted in this hero section.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_19, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.externalLinks, link => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: link.href,
      class: "mb-2"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      title: link.title,
      class: "text-dark fw-semibold",
      href: link.href,
      target: "_blank",
      rel: "noopener noreferrer"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(link.text), 9 /* TEXT, PROPS */, _hoisted_20)]);
  }), 128 /* KEYED_FRAGMENT */))])]), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-6"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "h5 fw-semibold"
  }, "Why we keep knowledge modern"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted bm-0"
  }, "Blending server-rendered structure with Vue-powered interactivity ensures the same narrative loads instantly.")], -1 /* CACHED */))])])]), _cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section aria-labelledby=\"services-heading\" data-v-2ba25654><div class=\"py-5\" style=\"background:#f8f9fa;\" data-v-2ba25654><div class=\"container\" data-v-2ba25654><div class=\"row justify-content-center text-center mb-5\" data-v-2ba25654><div class=\"col-lg-8 col-xl-7\" data-v-2ba25654><h2 id=\"services-heading\" class=\"display-4 mb-3 fw-bold\" data-v-2ba25654>What We Offer</h2><p class=\"lead text-muted\" data-v-2ba25654>Comprehensive Islamic resources designed for modern learners</p></div></div><div class=\"row g-4\" data-v-2ba25654><!-- Card 1: Explore with Ease --><div class=\"col-md-6 col-lg-4\" data-v-2ba25654><article class=\"card h-100 border-0 card-20 card-float shadow-sm\" data-v-2ba25654><div class=\"card-body text-center p-4\" data-v-2ba25654><div class=\"my-3\" data-v-2ba25654><img src=\"images/galaxy.png\" width=\"80\" height=\"80\" alt=\"Magnifying glass exploring Islamic content\" loading=\"lazy\" data-v-2ba25654></div><h3 class=\"h3 fw-bold\" data-v-2ba25654>Explore with Ease</h3><p class=\"mb-4 text-muted\" style=\"font-size:16px;line-height:1.6;\" data-v-2ba25654> Search the Quran, Duas, and Seerah effortlessly using simple keywords or topics. Find meaningful content instantly for your spiritual journey. </p></div></article></div><!-- Card 2: Listen, Watch, Reflect --><div class=\"col-md-6 col-lg-4\" data-v-2ba25654><article class=\"card h-100 border-0 card-20 card-float shadow-sm\" data-v-2ba25654><div class=\"card-body text-center p-4\" data-v-2ba25654><div class=\"my-3\" data-v-2ba25654><img src=\"images/watching.png\" width=\"80\" height=\"80\" alt=\"Headphones for audio content\" loading=\"lazy\" data-v-2ba25654></div><h3 class=\"h3 fw-bold\" data-v-2ba25654>Listen, Watch, Reflect</h3><p class=\"mb-4 text-muted\" style=\"font-size:16px;line-height:1.6;\" data-v-2ba25654> Enjoy Quran recitations, insightful podcasts, and Islamic art galleries. Engage spiritually through multimedia content anywhere, anytime. </p></div></article></div><!-- Card 3: Learn Your Way --><div class=\"col-md-6 col-lg-4\" data-v-2ba25654><article class=\"card h-100 border-0 card-20 card-float shadow-sm\" data-v-2ba25654><div class=\"card-body text-center p-4\" data-v-2ba25654><div class=\"my-3\" data-v-2ba25654><img src=\"images/school.png\" width=\"80\" height=\"80\" alt=\"Graduation cap for learning\" loading=\"lazy\" data-v-2ba25654></div><h3 class=\"h3 fw-bold\" data-v-2ba25654>Learn Your Way</h3><p class=\"mb-4 text-muted\" style=\"font-size:16px;line-height:1.6;\" data-v-2ba25654> Text-to-speech, screen reader and keybord navigator support, and bookmarking ensure accessible learning for everyone, regardless of ability. </p></div></article></div></div></div></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <section class=\"container journeys-section text-center mx-auto my-5\">\n        <div class=\"row justify-content-center\">\n            <div class=\"col-lg-8\">\n                <h2 class=\"h4 fw-bold mb-1 text-center\">Explore our most visited journeys</h2>\n                <p class=\"text-muted mb-4\">Hand-curated pathways to Quran, dua, and mission experiences, all adorned with premium spacing, subtle motion, and refined corners.</p>\n            </div>\n        </div>\n        <div class=\"row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mt-2 justify-content-center\">\n            <div class=\"col\" v-for=\"journey in seoCards\" :key=\"`journey-${journey.title}`\">\n                <article class=\"premium-card h-100 d-flex flex-column\">\n                    <div>\n                        <h3 class=\"h6 fw-semibold mb-2\">{{ journey.title }}</h3>\n                        <p class=\"small text-muted mb-3\">{{ journey.desc }}</p>\n                    </div>\n                    <a class=\"mt-auto fw-semibold text-teal\" :title=\"journey.title\" :href=\"journey.href\">Explore →</a>\n                </article>\n            </div>\n        </div>\n    </section> "), _cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"container pt-3\" aria-label=\"Islamic Connect Features\" data-v-2ba25654><!-- First Row - Quran Companion --><div class=\"row py-4 py-lg-5 align-items-center\" data-v-2ba25654><div class=\"col-lg-6 order-2 order-lg-1\" data-v-2ba25654><h2 class=\"h1 fw-bold text-center text-lg-start mb-4\" data-v-2ba25654> Quran Companion: AI-Powered &amp; Accessible </h2><p class=\"lead text-muted text-center text-lg-start mb-4\" style=\"line-height:1.7;\" data-v-2ba25654> Experience the Quran with advanced AI tools for reading, listening, and understanding. Featuring text-to-speech, screen reader support, and voice search for an accessible, intelligent connection to the Divine. </p><div class=\"d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center\" data-v-2ba25654><a href=\"/quran\" class=\"btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20\" style=\"min-width:160px;\" data-v-2ba25654> Explore Quran </a></div></div><div class=\"col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0\" data-v-2ba25654><img src=\"/images/slide1.png\" class=\"img-fluid rounded-20 shadow-sm\" alt=\"Quran Companion interface showing AI-powered features and accessibility tools\" loading=\"lazy\" width=\"600\" height=\"400\" data-v-2ba25654></div></div><!-- Second Row - Audio Content --><div class=\"row py-4 py-lg-5 align-items-center\" data-v-2ba25654><div class=\"col-lg-6 mb-4 mb-lg-0\" data-v-2ba25654><img src=\"/images/slide4.png\" class=\"img-fluid rounded-20 shadow-sm\" alt=\"Islamic podcasts and audio content streaming interface\" loading=\"lazy\" width=\"600\" height=\"400\" data-v-2ba25654></div><div class=\"col-lg-6\" data-v-2ba25654><h2 class=\"h1 fw-bold text-center text-lg-start mb-4\" data-v-2ba25654> Spiritual Content On-The-Go </h2><p class=\"lead text-muted text-center text-lg-start mb-4\" style=\"line-height:1.7;\" data-v-2ba25654> Access uplifting Islamic podcasts, inspiring audio series, and live radio in one place. Stay spiritually connected through sound and reflection wherever you are. </p><div class=\"d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center\" data-v-2ba25654><a href=\"/media\" class=\"btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20\" style=\"min-width:160px;\" data-v-2ba25654> Browse Content </a></div></div></div><!-- Third Row - Quran Explorer --><div class=\"row py-4 py-lg-5 align-items-center\" data-v-2ba25654><div class=\"col-lg-6 order-2 order-lg-1\" data-v-2ba25654><h2 class=\"h1 fw-bold text-center text-lg-start mb-4\" data-v-2ba25654> Deep Quran Exploration </h2><p class=\"lead text-muted text-center text-lg-start mb-4\" style=\"line-height:1.7;\" data-v-2ba25654> Search, explore, and engage with every verse effortlessly. Discover tafsir, translations, and recitations with tools designed for simplicity and spiritual growth. </p><div class=\"d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center\" data-v-2ba25654><a href=\"/surat\" class=\"btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20\" style=\"min-width:160px;\" data-v-2ba25654> Start Exploring </a></div></div><div class=\"col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0\" data-v-2ba25654><img src=\"/images/slide2.png\" class=\"img-fluid rounded-20 shadow-sm\" alt=\"Quran exploration interface with search and translation features\" loading=\"lazy\" width=\"600\" height=\"400\" data-v-2ba25654></div></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Stats Section "), _cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"stats-section\" data-v-2ba25654><div class=\"container\" data-v-2ba25654><div class=\"row justify-content-center\" data-v-2ba25654><div class=\"col-lg-10 text-center\" data-v-2ba25654><h2 class=\"section-title\" data-v-2ba25654>Our Impact in Numbers</h2><p class=\"section-lead\" data-v-2ba25654>Measurable results showing how we&#39;re making Islamic knowledge accessible to all</p><div class=\"row container-fluid stats-grid\" data-v-2ba25654><div class=\"col-md-3 col-6 mb-4\" data-v-2ba25654><div class=\"stat-card\" data-v-2ba25654><h3 data-v-2ba25654>85%</h3><p data-v-2ba25654>Accessibility</p><small data-v-2ba25654>Score </small></div></div><div class=\"col-md-3 col-6 mb-4\" data-v-2ba25654><div class=\"stat-card\" data-v-2ba25654><h3 data-v-2ba25654>75+</h3><p data-v-2ba25654>Countries</p><small data-v-2ba25654>Global reach</small></div></div><div class=\"col-md-3 col-6 mb-4\" data-v-2ba25654><div class=\"stat-card\" data-v-2ba25654><h3 data-v-2ba25654>575+</h3><p data-v-2ba25654>Cities/Towns</p><small data-v-2ba25654>Worldwide presence</small></div></div><div class=\"col-md-3 col-6 mb-4\" data-v-2ba25654><div class=\"stat-card\" data-v-2ba25654><h3 data-v-2ba25654>1,090%</h3><p data-v-2ba25654>Growth</p><small data-v-2ba25654>Returning users</small></div></div></div></div></div></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" AI Tools & Features Section - Optimized "), _cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"py-5\" aria-labelledby=\"ai-tools-title\" data-v-2ba25654><div class=\"container pt-3\" data-v-2ba25654><div class=\"row justify-content-center text-center mb-3\" data-v-2ba25654><div class=\"col-lg-8 col-xl-7\" data-v-2ba25654></div><h2 id=\"ai-tools-title\" class=\"h2 mb-3 fw-bold\" data-v-2ba25654>AI-Powered Tools for Enhanced Islamic Learning</h2></div><div class=\"row pt-3 g-4 g-md-5\" data-v-2ba25654><div class=\"col-12\" data-v-2ba25654><p class=\"lead text-center mb-4\" style=\"line-height:1.7;\" data-v-2ba25654> At Islamic Connect, we leverage advanced AI technology to make Quranic knowledge accessible to everyone. Our tools are designed to empower individuals through inclusive, personalized learning experiences that adapt to diverse abilities and learning preferences. </p></div><!-- Feature 4: Text Summarization --><div class=\"col-md-6\" data-v-2ba25654><div class=\"d-flex h-100\" data-v-2ba25654><div class=\"flex-shrink-0 me-4\" data-v-2ba25654><img src=\"images/content.png\" width=\"60\" height=\"60\" alt=\"Content icon for text summarization feature\" loading=\"lazy\" data-v-2ba25654></div><div class=\"flex-grow-1\" data-v-2ba25654><h3 class=\"h5 mb-2 fw-bold\" data-v-2ba25654>AI Text Summarization</h3><p class=\"mb-0\" data-v-2ba25654> Quickly understand complex Islamic texts with AI-powered summaries. Extract key insights from lengthy content to enhance your learning efficiency. </p></div></div></div><!-- Feature 2: Voice Search --><!-- &lt;div class=&quot;col-md-6&quot;&gt;\n            &lt;div class=&quot;d-flex h-100&quot;&gt;\n              &lt;div class=&quot;flex-shrink-0 me-4&quot;&gt;\n                &lt;img src=&quot;images/voice-recognition.png&quot; width=&quot;60&quot; height=&quot;60&quot;\n                  alt=&quot;Voice recognition icon for voice search feature&quot; loading=&quot;lazy&quot;&gt;\n              &lt;/div&gt;\n              &lt;div class=&quot;flex-grow-1&quot;&gt;\n                &lt;h3 class=&quot;h5 mb-2 fw-bold&quot;&gt;Voice-Activated Quran Search&lt;/h3&gt;\n                &lt;p class=&quot;mb-0&quot;&gt;\n                  Use voice commands to search Quranic verses and teachings.\n                  A hands-free, accessible way to explore Islamic content quickly and intuitively.\n                &lt;/p&gt;\n              &lt;/div&gt;\n            &lt;/div&gt;\n          &lt;/div&gt; --><!-- Feature 3: Note Editor --><!-- &lt;div class=&quot;col-md-6&quot;&gt;\n            &lt;div class=&quot;d-flex h-100&quot;&gt;\n              &lt;div class=&quot;flex-shrink-0 me-4&quot;&gt;\n                &lt;img src=&quot;images/elearning.png&quot; width=&quot;60&quot; height=&quot;60&quot; alt=&quot;E-learning icon for note editor feature&quot;\n                  loading=&quot;lazy&quot;&gt;\n              &lt;/div&gt;\n              &lt;div class=&quot;flex-grow-1&quot;&gt;\n                &lt;h3 class=&quot;h5 mb-2 fw-bold&quot;&gt;Advanced Islamic Note Editor&lt;/h3&gt;\n                &lt;p class=&quot;mb-0&quot;&gt;\n                  A customizable note-taking tool designed specifically for Islamic studies.\n                  Organize your reflections, bookmarks, and study notes with ease.\n                &lt;/p&gt;\n              &lt;/div&gt;\n            &lt;/div&gt;\n          &lt;/div&gt; --><!-- Feature 1: Speech-to-Text --><div class=\"col-md-6 mb-3\" data-v-2ba25654><div class=\"d-flex h-100\" data-v-2ba25654><div class=\"flex-shrink-0 me-4\" data-v-2ba25654><img src=\"images/podcasting.png\" width=\"60\" height=\"60\" alt=\"Microphone icon representing speech-to-text feature\" loading=\"lazy\" data-v-2ba25654></div><div class=\"flex-grow-1\" data-v-2ba25654><h3 class=\"h5 mb-2 fw-bold\" data-v-2ba25654>Speech-to-Text for Islamic Notes</h3><p class=\"mb-0\" data-v-2ba25654> Capture your spoken reflections and thoughts on Islamic teachings effortlessly. Perfect for documenting insights and ensuring accessibility for those who prefer audio input. </p></div></div></div><!-- Feature 5: Audio Sync --><div class=\"col-md-6\" data-v-2ba25654><div class=\"d-flex h-100\" data-v-2ba25654><div class=\"flex-shrink-0 me-4\" data-v-2ba25654><img src=\"images/highlighter.png\" width=\"60\" height=\"60\" alt=\"Highlighter icon for audio synchronization feature\" loading=\"lazy\" data-v-2ba25654></div><div class=\"flex-grow-1\" data-v-2ba25654><h3 class=\"h5 mb-2 fw-bold\" data-v-2ba25654>Word-by-Word Quran Highlighting</h3><p class=\"mb-0\" data-v-2ba25654> Follow Quranic recitations with synchronized text highlighting. Each word lights up as it&#39;s recited, improving pronunciation and comprehension. </p></div></div></div><!-- Feature 6: Text-to-Speech --><div class=\"col-md-6\" data-v-2ba25654><div class=\"d-flex h-100\" data-v-2ba25654><div class=\"flex-shrink-0 me-4\" data-v-2ba25654><img src=\"images/chat.png\" width=\"60\" height=\"60\" alt=\"Chat icon for text-to-speech feature\" loading=\"lazy\" data-v-2ba25654></div><div class=\"flex-grow-1\" data-v-2ba25654><h3 class=\"h5 mb-2 fw-bold\" data-v-2ba25654>Text-to-Speech for Translations</h3><p class=\"mb-0\" data-v-2ba25654> Listen to Quran translations and Tafsir explanations. High-quality audio delivery makes Islamic knowledge accessible while multitasking or for visual impairments. </p></div></div></div></div></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Premium CTA Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row justify-content-center text-center mb-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-8"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    id: "premium-heading",
    class: "fw-bold",
    style: {
      "font-size": "2.25rem",
      "color": "#1a5f7a"
    }
  }, "Support The Work, Access More"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "lead text-muted",
    style: {
      "line-height": "1.7"
    }
  }, " Your support sustains this khidmah and keeps Islamic knowledge accessible for everyone. ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Faith-centered quote "), _cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"row justify-content-center mb-4 quote-wrapper bg-white\" data-v-2ba25654><div class=\"col-lg-9\" data-v-2ba25654><div class=\"quote-card\" data-v-2ba25654><!-- Subtle glowing accent --><div class=\"quote-glow\" data-v-2ba25654></div><div class=\"quote-content\" data-v-2ba25654><!-- First Quote --><p class=\"faith-quote\" data-v-2ba25654><span class=\"quote-mark\" aria-hidden=\"true\" data-v-2ba25654>“</span> Whoever treads a path seeking knowledge, Allah will make easy for him a path to Paradise. <span class=\"quote-mark\" aria-hidden=\"true\" data-v-2ba25654>”</span></p><div class=\"quote-ref\" data-v-2ba25654>Hadith — Sahih Muslim</div><!-- Decorative divider --><div class=\"quote-divider\" data-v-2ba25654></div></div></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"col-md-6\" data-v-2ba25654><div class=\"card h-100 border-0\" style=\"box-shadow:0 10px 30px rgba(0,0,0,0.08);\" data-v-2ba25654><div class=\"card-body p-4 text-start\" data-v-2ba25654><h3 class=\"h4 fw-bold mb-3\" style=\"color:#2c3e50;\" data-v-2ba25654>What your support enables</h3><ul class=\"mb-0\" style=\"list-style:none;padding-left:0;color:#4a5568;line-height:1.7;\" data-v-2ba25654><li class=\"mb-2\" data-v-2ba25654><i class=\"fas fa-check text-success me-2\" data-v-2ba25654></i>Keep Quran tools fast, accessible, and ad‑free</li><li class=\"mb-2\" data-v-2ba25654><i class=\"fas fa-check text-success me-2\" data-v-2ba25654></i>Offer trustworthy resources curated with amanah</li><li class=\"mb-2\" data-v-2ba25654><i class=\"fas fa-check text-success me-2\" data-v-2ba25654></i>Deliver new features shaped by your feedback</li><li class=\"mb-2\" data-v-2ba25654><i class=\"fas fa-check text-success me-2\" data-v-2ba25654></i>Make the platform available to those who can’t pay</li></ul></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h4 fw-bold mb-3",
    style: {
      "color": "#2c3e50"
    }
  }, "Simple and transparent", -1 /* CACHED */)), _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-3",
    style: {
      "color": "#4a5568"
    }
  }, "Secure Stripe payments. Cancel anytime. No tracking, no ads. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[0] || (_cache[0] = $event => $options.goTo('/support')),
    style: {
      "background": "rgba(255, 255, 255, 0.9)",
      "color": "#1a5f7a",
      "border": "2px solid #1a5f7a",
      "padding": "1rem 2rem",
      "border-radius": "12px",
      "font-weight": "700",
      "font-size": "1.1rem",
      "box-shadow": "0 5px 20px rgba(26, 95, 122, 0.2)",
      "transition": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "backdrop-filter": "blur(10px)"
    },
    onmouseover: "this.style.transform='translateY(-2px)'; this.style.background='#1a5f7a'; this.style.color='white'; this.style.boxShadow='0 8px 25px rgba(26, 95, 122, 0.4)';",
    onmouseout: "this.style.transform='translateY(0)'; this.style.background='rgba(255, 255, 255, 0.9)'; this.style.color='#1a5f7a'; this.style.boxShadow='0 5px 20px rgba(26, 95, 122, 0.2)';"
  }, [...(_cache[16] || (_cache[16] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-heart me-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Provide a small Donation ", -1 /* CACHED */)]))])]), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "px-4 pb-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center",
    style: {
      "gap": ".5rem",
      "color": "#6c757d"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-lock"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, "SSL encrypted • PCI compliant")])], -1 /* CACHED */))])])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quick Join Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Enhanced Quick Join Section "), _cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", {
    class: "py-5 quick-join-section",
    style: {
      "background": "linear-gradient(135deg, rgb(0, 121, 107) 0%, #1a5f7a 100%)",
      "position": "relative",
      "overflow": "hidden"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Background Elements "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: {
      "position": "absolute",
      "top": "-50%",
      "right": "-10%",
      "width": "300px",
      "height": "300px",
      "background": "rgba(255, 255, 255, 0.1)",
      "border-radius": "50%",
      "animation": "float 8s ease-in-out infinite"
    }
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: {
      "position": "absolute",
      "bottom": "-30%",
      "left": "-5%",
      "width": "200px",
      "height": "200px",
      "background": "rgba(255, 255, 255, 0.1)",
      "border-radius": "50%",
      "animation": "float 6s ease-in-out infinite 2s"
    }
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: {
      "position": "absolute",
      "top": "20%",
      "left": "10%",
      "width": "100px",
      "height": "100px",
      "background": "rgba(255, 255, 255, 0.05)",
      "border-radius": "50%",
      "animation": "float 10s ease-in-out infinite 1s"
    }
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "container",
    style: {
      "position": "relative",
      "z-index": "2"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row align-items-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-7 text-center text-lg-start"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "text-white fw-bold mb-3",
    style: {
      "font-size": "2.5rem",
      "text-shadow": "0 2px 10px rgba(0, 0, 0, 0.4)",
      "color": "#ffffff"
    }
  }, "Ready to Transform Your Daily Spiritual Journey?"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-white mb-4",
    style: {
      "font-size": "1.2rem",
      "opacity": "0.98",
      "text-shadow": "0 2px 4px rgba(0, 0, 0, 0.45)"
    }
  }, "Join now and receive your first spiritual reminder within minutes. Start your day with divine inspiration! ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-5 text-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Join Cards "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row g-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-12"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: {
      "background": "rgba(255, 255, 255, 0.95)",
      "padding": "1.5rem",
      "border-radius": "20px",
      "box-shadow": "0 15px 35px rgba(0, 0, 0, 0.2)",
      "border": "2px solid rgba(255, 255, 255, 0.3)",
      "backdrop-filter": "blur(10px)",
      "transition": "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      "position": "relative",
      "overflow": "hidden"
    },
    class: "join-card-hover rounded-20"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" WhatsApp Card "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center mb-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: {
      "width": "50px",
      "height": "50px",
      "background": "linear-gradient(135deg, #25D366, #128C7E)",
      "border-radius": "50%",
      "display": "flex",
      "align-items": "center",
      "justify-content": "center",
      "margin-right": "1rem",
      "box-shadow": "0 5px 15px rgba(37, 211, 102, 0.4)"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fab fa-whatsapp text-white",
    style: {
      "font-size": "1.5rem"
    }
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "text-start"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "fw-bold mb-1",
    style: {
      "color": "#1a5f7a"
    }
  }, "WhatsApp Channel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted"
  }, "Daily verses & instant reminders")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "https://whatsapp.com/channel/0029VbAsOvp59PwIp2zwyB1m",
    class: "btn w-100 rounded-20",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      "background": "linear-gradient(135deg, #25D366, #128C7E)",
      "color": "white",
      "font-weight": "700",
      "padding": "1rem 2rem",
      "border-radius": "12px",
      "border": "none",
      "font-size": "1.1rem",
      "transition": "all 0.3s ease",
      "box-shadow": "0 5px 15px rgba(37, 211, 102, 0.4)",
      "position": "relative",
      "overflow": "hidden"
    },
    onmouseover: "this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(37, 211, 102, 0.6)';",
    onmouseout: "this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(37, 211, 102, 0.4)';"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fab fa-whatsapp me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Join WhatsApp Channel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    style: {
      "position": "absolute",
      "top": "50%",
      "right": "1rem",
      "transform": "translateY(-50%)",
      "font-size": "0.9rem",
      "opacity": "0.9"
    }
  }, "→")])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-12"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: {
      "background": "rgba(255, 255, 255, 0.95)",
      "padding": "1.5rem",
      "border-radius": "20px",
      "box-shadow": "0 15px 35px rgba(0, 0, 0, 0.2)",
      "border": "2px solid rgba(255, 255, 255, 0.3)",
      "backdrop-filter": "blur(10px)",
      "transition": "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      "position": "relative",
      "overflow": "hidden"
    },
    class: "join-card-hover rounded-20"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Telegram Card "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center mb-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: {
      "width": "50px",
      "height": "50px",
      "background": "linear-gradient(135deg, #0088cc, #006699)",
      "border-radius": "50%",
      "display": "flex",
      "align-items": "center",
      "justify-content": "center",
      "margin-right": "1rem",
      "box-shadow": "0 5px 15px rgba(0, 136, 204, 0.4)"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fab fa-telegram text-white",
    style: {
      "font-size": "1.5rem"
    }
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "text-start"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "fw-bold mb-1",
    style: {
      "color": "#1a5f7a"
    }
  }, "Telegram Community"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted"
  }, "In-depth content & discussions")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "https://t.me/+r81Q3SEAa-M5ZWI0",
    class: "btn w-100 rounded-20",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      "background": "linear-gradient(135deg, #0088cc, #006699)",
      "color": "white",
      "font-weight": "700",
      "padding": "1rem 2rem",
      "border-radius": "12px",
      "border": "none",
      "font-size": "1.1rem",
      "transition": "all 0.3s ease",
      "box-shadow": "0 5px 15px rgba(0, 136, 204, 0.4)",
      "position": "relative",
      "overflow": "hidden"
    },
    onmouseover: "this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(0, 136, 204, 0.6)';",
    onmouseout: "this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(0, 136, 204, 0.4)';"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fab fa-telegram me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Join Telegram Community "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    style: {
      "position": "absolute",
      "top": "50%",
      "right": "1rem",
      "transform": "translateY(-50%)",
      "font-size": "0.9rem",
      "opacity": "0.9"
    }
  }, "→")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"mt-2\">\n                    <small class=\"text-muted\" style=\"font-weight: 500;\">\n                      <i class=\"fas fa-users me-1\"></i>3,200+ active members\n                    </small>\n                  </div> ")])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Trust Badge "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "mt-3",
    style: {
      "background": "rgba(255, 255, 255, 0.2)",
      "padding": "0.75rem 1.5rem",
      "border-radius": "50px",
      "backdrop-filter": "blur(10px)",
      "display": "inline-block"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center",
    style: {
      "gap": "0.5rem"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-shield-alt text-white",
    style: {
      "font-size": "1.1rem"
    }
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-white fw-bold"
  }, "100% Free • Easy Subscribe")])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Floating Icons "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: {
      "position": "absolute",
      "bottom": "20px",
      "right": "20px",
      "opacity": "0.1",
      "font-size": "3rem",
      "animation": "float 4s ease-in-out infinite"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-quran"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" contact "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_29, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "contact-section__blur contact-section__blur--left"
  }, null, -1 /* CACHED */)), _cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "contact-section__blur contact-section__blur--right"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"row justify-content-center text-center\" data-v-2ba25654><div class=\"col-xl-8 col-lg-9\" data-v-2ba25654><p class=\"text-teal fw-semibold small mb-2\" data-v-2ba25654>Request a response within 24 hours</p><h2 id=\"contact-heading\" class=\"display-5 fw-bold mb-3\" data-v-2ba25654>Let’s Keep the Conversation Going</h2><p class=\"lead fw-semibold text-muted mb-4\" data-v-2ba25654> Share your thoughts, ask about our resources, or flag a bug. Picking the right topic helps us route your request to the right team immediately. </p></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex flex-column flex-md-row align-items-start justify-content-between gap-3 mb-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "fw-bold mb-1"
  }, "Premium support, made personal"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted mb-0"
  }, "We review every message ourselves and respond thoughtfully.")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "badge contact-card__badge"
  }, "Priority response")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onReset: _cache[6] || (_cache[6] = (...args) => _ctx.reset && _ctx.reset(...args)),
    onSubmit: _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.sendMessage(), ["prevent"])),
    role: "form",
    "aria-label": "Contact form"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "firstname",
    class: "form-label visually-hidden"
  }, "First Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "firstname",
    class: "form-control form-control-lg",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.form.firstname = $event),
    name: "firstname",
    placeholder: "First name",
    type: "text",
    "aria-required": "true",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.firstname]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "lastname",
    class: "form-label visually-hidden"
  }, "Last Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "lastname",
    class: "form-control form-control-lg",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.form.lastname = $event),
    name: "lastname",
    placeholder: "Last name",
    type: "text",
    "aria-required": "true",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.lastname]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "email",
    class: "form-label visually-hidden"
  }, "Email Address", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "email",
    class: "form-control form-control-lg",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.form.email = $event),
    name: "email",
    placeholder: "Email address",
    type: "email",
    "aria-required": "true",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.email]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "subject",
    class: "form-label visually-hidden"
  }, "Subject", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "subject",
    class: "form-select form-select-lg",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.form.subject = $event),
    name: "subject",
    "aria-required": "true",
    required: ""
  }, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select a subject", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.subjectOptions, option => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: option.value,
      value: option.value
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.label), 9 /* TEXT, PROPS */, _hoisted_39);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.subject]]), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted d-block mt-1"
  }, "Choose whichever topic matches your message.", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "message",
    class: "form-label visually-hidden"
  }, "Your Message", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    id: "message",
    class: "form-control form-control-lg",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.form.message = $event),
    name: "message",
    placeholder: "Your message",
    rows: "5",
    "aria-required": "true",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.message]])]), _cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"col-12\" data-v-2ba25654><div class=\"d-grid\" data-v-2ba25654><button type=\"submit\" class=\"btn btn-teal btn-lg fw-semibold contact-card__btn\" data-v-2ba25654><span class=\"d-flex align-items-center justify-content-center gap-2\" data-v-2ba25654><i class=\"fas fa-paper-plane\" aria-hidden=\"true\" data-v-2ba25654></i> Send Message </span></button></div></div>", 1))])], 32 /* NEED_HYDRATION */)])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "premium-dialog"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.confirmDialog.visible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_43, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.confirmDialog.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_44, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.confirmDialog.message), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-outline-secondary",
      onClick: _cache[8] || (_cache[8] = (...args) => $options.handleCancel && $options.handleCancel(...args))
    }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-teal contact-card__btn",
      onClick: _cache[9] || (_cache[9] = (...args) => $options.handleConfirm && $options.handleConfirm(...args))
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.confirmDialog.confirmLabel), 1 /* TEXT */)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "premium-toast"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.toast.visible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 0,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["premium-toast", `premium-toast--${$data.toast.type}`])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_46, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.toast.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.toast.message), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn-close btn-close-white",
      onClick: _cache[10] || (_cache[10] = (...args) => $options.dismissToast && $options.dismissToast(...args))
    })], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Remove the container if you want to extend the Footer to full width. "), _cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("footer", {
    class: "ic-footer text-white",
    role: "contentinfo"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "container-fluid footer-inner d-flex flex-column flex-md-row align-items-center justify-content-between gap-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "copyright text-center text-md-start"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "me-2"
  }, "©"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "2025 Copyright: "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "https://islamiconnect.com/",
    class: "text-white text-decoration-none fw-bold"
  }, "islamiconnect.com")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "social text-center text-md-end"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "https://www.facebook.com/profile.php?id=61560313385599",
    "aria-label": "Visit our Facebook page"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fab fa-facebook-f",
    "aria-hidden": "true"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "https://x.com/islamiconnect24",
    "aria-label": "Visit our X (Twitter) profile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fab fa-twitter",
    "aria-hidden": "true"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "https://www.linkedin.com/company/islamic-connect/",
    "aria-label": "Visit our LinkedIn page"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fab fa-linkedin",
    "aria-hidden": "true"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "https://www.instagram.com/islamicconnect24/",
    "aria-label": "Visit our Instagram profile"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fab fa-instagram",
    "aria-hidden": "true"
  })])])])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" End of .container ")]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=style&index=0&id=2ba25654&scoped=true&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=style&index=0&id=2ba25654&scoped=true&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=style&index=1&id=2ba25654&scoped=true&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=style&index=1&id=2ba25654&scoped=true&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/components/AiComponent.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/AiComponent.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AiComponent_vue_vue_type_template_id_300b761a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AiComponent.vue?vue&type=template&id=300b761a&scoped=true */ "./resources/js/components/AiComponent.vue?vue&type=template&id=300b761a&scoped=true");
/* harmony import */ var _AiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AiComponent.vue?vue&type=script&lang=js */ "./resources/js/components/AiComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _AiComponent_vue_vue_type_style_index_0_id_300b761a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css */ "./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_AiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AiComponent_vue_vue_type_template_id_300b761a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-300b761a"],['__file',"resources/js/components/AiComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/AiComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./resources/js/components/AiComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AiComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_style_index_0_id_300b761a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/AiComponent.vue?vue&type=template&id=300b761a&scoped=true":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/AiComponent.vue?vue&type=template&id=300b761a&scoped=true ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_template_id_300b761a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_template_id_300b761a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AiComponent.vue?vue&type=template&id=300b761a&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=template&id=300b761a&scoped=true");


/***/ }),

/***/ "./resources/js/components/HomepageComponent.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/HomepageComponent.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HomepageComponent_vue_vue_type_template_id_2ba25654_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HomepageComponent.vue?vue&type=template&id=2ba25654&scoped=true */ "./resources/js/components/HomepageComponent.vue?vue&type=template&id=2ba25654&scoped=true");
/* harmony import */ var _HomepageComponent_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HomepageComponent.vue?vue&type=script&defer=true&lang=js */ "./resources/js/components/HomepageComponent.vue?vue&type=script&defer=true&lang=js");
/* harmony import */ var _HomepageComponent_vue_vue_type_style_index_0_id_2ba25654_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HomepageComponent.vue?vue&type=style&index=0&id=2ba25654&scoped=true&lang=css */ "./resources/js/components/HomepageComponent.vue?vue&type=style&index=0&id=2ba25654&scoped=true&lang=css");
/* harmony import */ var _HomepageComponent_vue_vue_type_style_index_1_id_2ba25654_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HomepageComponent.vue?vue&type=style&index=1&id=2ba25654&scoped=true&lang=css */ "./resources/js/components/HomepageComponent.vue?vue&type=style&index=1&id=2ba25654&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;



const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_HomepageComponent_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_HomepageComponent_vue_vue_type_template_id_2ba25654_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-2ba25654"],['__file',"resources/js/components/HomepageComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/HomepageComponent.vue?vue&type=script&defer=true&lang=js":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/HomepageComponent.vue?vue&type=script&defer=true&lang=js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomepageComponent_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomepageComponent_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HomepageComponent.vue?vue&type=script&defer=true&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=script&defer=true&lang=js");
 

/***/ }),

/***/ "./resources/js/components/HomepageComponent.vue?vue&type=style&index=0&id=2ba25654&scoped=true&lang=css":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/components/HomepageComponent.vue?vue&type=style&index=0&id=2ba25654&scoped=true&lang=css ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomepageComponent_vue_vue_type_style_index_0_id_2ba25654_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HomepageComponent.vue?vue&type=style&index=0&id=2ba25654&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=style&index=0&id=2ba25654&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/HomepageComponent.vue?vue&type=style&index=1&id=2ba25654&scoped=true&lang=css":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/components/HomepageComponent.vue?vue&type=style&index=1&id=2ba25654&scoped=true&lang=css ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomepageComponent_vue_vue_type_style_index_1_id_2ba25654_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HomepageComponent.vue?vue&type=style&index=1&id=2ba25654&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=style&index=1&id=2ba25654&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/HomepageComponent.vue?vue&type=template&id=2ba25654&scoped=true":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/HomepageComponent.vue?vue&type=template&id=2ba25654&scoped=true ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomepageComponent_vue_vue_type_template_id_2ba25654_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomepageComponent_vue_vue_type_template_id_2ba25654_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HomepageComponent.vue?vue&type=template&id=2ba25654&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=template&id=2ba25654&scoped=true");


/***/ })

}]);