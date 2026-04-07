"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["/js/app"],{

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

/***/ "./resources/css/vue-runtime.css":
/*!***************************************!*\
  !*** ./resources/css/vue-runtime.css ***!
  \***************************************/
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
/* harmony import */ var vform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vform */ "./node_modules/vform/dist/vform.es.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var primevue_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primevue/config */ "./node_modules/primevue/config/config.esm.js");
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");
__webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");





// Removed session milestone tracking

const DARK_MODE_STORAGE_KEY = 'darkMode';
const IS_DEV = "development" !== 'production';
const prefersDarkColorScheme = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};
const resolveInitialDarkMode = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    const storedMode = window.localStorage.getItem(DARK_MODE_STORAGE_KEY);
    if (storedMode === null) {
      return prefersDarkColorScheme();
    }
    return storedMode === 'true';
  } catch (_) {
    return prefersDarkColorScheme();
  }
};
const applyGlobalThemePreference = isDarkMode => {
  if (typeof document === 'undefined') {
    return;
  }
  if (!document.body) {
    return;
  }
  const body = document.body;
  if (!body.classList.contains('home-route-page') && !body.classList.contains('surat-route-page') && !body.classList.contains('radio-route-page') && !body.classList.contains('islamic-blog-route-page')) {
    return;
  }
  const theme = isDarkMode ? 'dark' : 'light';
  const root = document.documentElement;
  const RADIO_BG = '#232529';
  if (root) {
    root.classList.toggle('dark-mode', !!isDarkMode);
    root.setAttribute('data-bs-theme', theme);
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
  }
  if (body) {
    body.classList.toggle('dark-mode', !!isDarkMode);
    if (body.classList.contains('surat-route-page')) {
      body.classList.toggle('surat-page-shell-dark', !!isDarkMode);
    }
    body.setAttribute('data-bs-theme', theme);
    body.setAttribute('data-theme', theme);
    body.style.colorScheme = theme;
  }
  if (body && body.classList.contains('radio-route-page')) {
    if (root) root.style.backgroundColor = isDarkMode ? RADIO_BG : '';
    body.style.backgroundColor = isDarkMode ? RADIO_BG : '';
  }
};
const app = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)({
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
        isDarkMode: resolveInitialDarkMode(),
        setDarkMode: this.setDarkMode // Method to update dark mode state
      }
    };
  },
  created() {
    if (typeof window !== 'undefined' && window.IC_THEME && typeof window.IC_THEME.getTheme === 'function') {
      this.darkModeState.isDarkMode = window.IC_THEME.getTheme() === 'dark';
      return;
    }
    applyGlobalThemePreference(this.darkModeState.isDarkMode);
  },
  mounted() {
    if (typeof window !== 'undefined' && window.IC_THEME && typeof window.IC_THEME.getTheme === 'function') {
      this.darkModeState.isDarkMode = window.IC_THEME.getTheme() === 'dark';
      window.addEventListener('ic-theme-change', this.syncDarkModeStateFromEvent);
      return;
    }
    applyGlobalThemePreference(this.darkModeState.isDarkMode);
    if (typeof window !== 'undefined') {
      window.addEventListener('ic-theme-change', this.syncDarkModeStateFromEvent);
    }
  },
  methods: {
    syncDarkModeStateFromEvent(event) {
      var _event$detail;
      const nextValue = !!(event !== null && event !== void 0 && (_event$detail = event.detail) !== null && _event$detail !== void 0 && _event$detail.isDark);
      this.darkModeState.isDarkMode = nextValue;
      applyGlobalThemePreference(nextValue);
    },
    setDarkMode(isDarkMode) {
      const nextValue = !!isDarkMode;
      const theme = nextValue ? 'dark' : 'light';
      this.darkModeState.isDarkMode = nextValue;
      // Prefer the global theme helper from the layout when available (keeps
      // Home/Radio/Surat theme behavior consistent and dispatches the same event).
      try {
        if (window.IC_THEME && typeof window.IC_THEME.setTheme === 'function') {
          window.IC_THEME.setTheme(theme);
          return;
        }
      } catch (_) {}
      applyGlobalThemePreference(nextValue);
      try {
        window.localStorage.setItem(DARK_MODE_STORAGE_KEY, String(nextValue));
      } catch (_) {}
      try {
        window.localStorage.setItem('suratThemeMode', theme);
      } catch (_) {}
      try {
        window.localStorage.setItem('radioThemeMode', theme);
      } catch (_) {}
      try {
        window.dispatchEvent(new CustomEvent('ic-theme-change', {
          detail: {
            theme,
            isDark: nextValue
          }
        }));
      } catch (_) {}
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
window.Form = vform__WEBPACK_IMPORTED_MODULE_1__.Form;
window.Swal = (sweetalert2__WEBPACK_IMPORTED_MODULE_2___default());
app.use(primevue_config__WEBPACK_IMPORTED_MODULE_3__["default"]);
const installOptionalRoutePlugins = async () => {
  var _document$querySelect;
  const stripeKey = ((_document$querySelect = document.querySelector('meta[name="stripe-key"]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getAttribute('content')) || process.env.MIX_STRIPE_PUBLISHABLE_KEY || "";
  if (!stripeKey) {
    return;
  }
  try {
    const stripeModule = await __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.t.bind(__webpack_require__, /*! vue-stripe-elements-plus */ "./node_modules/vue-stripe-elements-plus/dist/index.js", 23));
    const StripePlugin = (stripeModule === null || stripeModule === void 0 ? void 0 : stripeModule.StripePlugin) || (stripeModule === null || stripeModule === void 0 ? void 0 : stripeModule.default) || stripeModule;
    if (StripePlugin && (typeof StripePlugin === 'function' || typeof StripePlugin.install === 'function')) {
      app.use(StripePlugin, {
        key: stripeKey
      });
    } else if (IS_DEV) {
      console.log('[Stripe] Plugin not compatible with current Vue build; skipping');
    }
  } catch (e) {
    if (IS_DEV) {
      console.debug('[Stripe] Skipped plugin registration:', (e === null || e === void 0 ? void 0 : e.message) || e);
    }
  }
};
const asyncComponentLoaders = {
  "Column": () => __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! primevue/column */ "./node_modules/primevue/column/column.esm.js")),
  "DataTable": () => __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! primevue/datatable */ "./node_modules/primevue/datatable/datatable.esm.js")),
  "Button": () => __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! primevue/button */ "./node_modules/primevue/button/button.esm.js")),
  "Dropdown": () => __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! primevue/dropdown */ "./node_modules/primevue/dropdown/dropdown.esm.js")),
  "InputText": () => __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! primevue/inputtext */ "./node_modules/primevue/inputtext/inputtext.esm.js")),
  "AccordionTab": () => __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! primevue/accordiontab */ "./node_modules/primevue/accordiontab/accordiontab.esm.js")),
  "Accordion": () => __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! primevue/accordion */ "./node_modules/primevue/accordion/accordion.esm.js")),
  "Card": () => __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! primevue/card */ "./node_modules/primevue/card/card.esm.js")),
  "TabView": () => __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! primevue/tabview */ "./node_modules/primevue/tabview/tabview.esm.js")),
  "TabPanel": () => __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! primevue/tabpanel */ "./node_modules/primevue/tabpanel/tabpanel.esm.js")),
  "ListBox": () => __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! primevue/listbox */ "./node_modules/primevue/listbox/listbox.esm.js")),
  "Fieldset": () => __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! primevue/fieldset */ "./node_modules/primevue/fieldset/fieldset.esm.js")),
  "Panel": () => __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! primevue/panel */ "./node_modules/primevue/panel/panel.esm.js")),
  "Dialog": () => __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! primevue/dialog */ "./node_modules/primevue/dialog/dialog.esm.js")),
  "Image": () => __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! primevue/image */ "./node_modules/primevue/image/image.esm.js")),
  "Editor": () => __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! primevue/editor */ "./node_modules/primevue/editor/editor.esm.js")),
  "subscription-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_SubscriptionComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/SubscriptionComponent.vue */ "./resources/js/components/SubscriptionComponent.vue")),
  "dark-mode-toggle": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_DarkModeToggle_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/DarkModeToggle.vue */ "./resources/js/components/DarkModeToggle.vue")),
  "users-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_admin_panels_UsersComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/UsersComponent.vue */ "./resources/js/components/admin_panels/UsersComponent.vue")),
  "mailing-list-component": () => Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_admin_panels_MailingListComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/MailingListComponent.vue */ "./resources/js/components/admin_panels/MailingListComponent.vue")),
  "feedback-component": () => Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_admin_panels_FeedbackComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/FeedbackComponent.vue */ "./resources/js/components/admin_panels/FeedbackComponent.vue")),
  "payment-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_admin_panels_PaymentComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/PaymentComponent.vue */ "./resources/js/components/admin_panels/PaymentComponent.vue")),
  "donation-component": () => Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_admin_panels_DonationComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/DonationComponent.vue */ "./resources/js/components/admin_panels/DonationComponent.vue")),
  "profile-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_admin_panels_ProfileComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/ProfileComponent.vue */ "./resources/js/components/admin_panels/ProfileComponent.vue")),
  "dashboard-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_admin_panels_DashboardComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/DashboardComponent.vue */ "./resources/js/components/admin_panels/DashboardComponent.vue")),
  "ai-reports-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_admin_panels_AiReportsComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/AiReportsComponent.vue */ "./resources/js/components/admin_panels/AiReportsComponent.vue")),
  "homepage-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_HomepageComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/HomepageComponent.vue */ "./resources/js/components/HomepageComponent.vue")),
  "pricing-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_PricingComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/PricingComponent.vue */ "./resources/js/components/PricingComponent.vue")),
  "contact-component": () => Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_ContactComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ContactComponent.vue */ "./resources/js/components/ContactComponent.vue")),
  "charity-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_CharityComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/CharityComponent.vue */ "./resources/js/components/CharityComponent.vue")),
  "volunteer-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_VolunteerComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/VolunteerComponent.vue */ "./resources/js/components/VolunteerComponent.vue")),
  "digital-library-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_DigitalLibraryComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/DigitalLibraryComponent.vue */ "./resources/js/components/DigitalLibraryComponent.vue")),
  "ahadith-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_AhadithComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/AhadithComponent.vue */ "./resources/js/components/AhadithComponent.vue")),
  "correction-component": () => Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_admin_panels_CorrectionComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/CorrectionComponent.vue */ "./resources/js/components/admin_panels/CorrectionComponent.vue")),
  "quran-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_QuranComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/QuranComponent.vue */ "./resources/js/components/QuranComponent.vue")),
  "about-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_AboutComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/AboutComponent.vue */ "./resources/js/components/AboutComponent.vue")),
  "about-us-component": () => Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_AboutUsComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/AboutUsComponent.vue */ "./resources/js/components/AboutUsComponent.vue")),
  "bookmark-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_admin_panels_BookmarkComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/BookmarkComponent.vue */ "./resources/js/components/admin_panels/BookmarkComponent.vue")),
  "playlist-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_admin_panels_PlaylistComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/PlaylistComponent.vue */ "./resources/js/components/admin_panels/PlaylistComponent.vue")),
  "pins-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_admin_panels_PinsComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/PinsComponent.vue */ "./resources/js/components/admin_panels/PinsComponent.vue")),
  "updates-component": () => Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_UpdatesComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/UpdatesComponent.vue */ "./resources/js/components/UpdatesComponent.vue")),
  "join_us-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_JoinUsComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/JoinUsComponent.vue */ "./resources/js/components/JoinUsComponent.vue")),
  "notes-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_admin_panels_NotesComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/NotesComponent.vue */ "./resources/js/components/admin_panels/NotesComponent.vue")),
  "group-notes-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_admin_panels_GroupNotesComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/GroupNotesComponent.vue */ "./resources/js/components/admin_panels/GroupNotesComponent.vue")),
  "mission-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_MissionComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/MissionComponent.vue */ "./resources/js/components/MissionComponent.vue")),
  "access-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_AccessComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/AccessComponent.vue */ "./resources/js/components/AccessComponent.vue")),
  "content-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_ContentComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ContentComponent.vue */ "./resources/js/components/ContentComponent.vue")),
  "surat-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_SuratComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/SuratComponent.vue */ "./resources/js/components/SuratComponent.vue")),
  "search-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_surah_selection_CustomSurahSelection_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/surah_selection/CustomSurahSelection.vue */ "./resources/js/components/surah_selection/CustomSurahSelection.vue")),
  "surah-list-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_search_SurahList_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/search/SurahList.vue */ "./resources/js/components/search/SurahList.vue")),
  "donations-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_intro_Donation_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/intro/Donation.vue */ "./resources/js/components/intro/Donation.vue")),
  "collection-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_admin_panels_CollectionComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/CollectionComponent.vue */ "./resources/js/components/admin_panels/CollectionComponent.vue")),
  "TinymceEditor": () => Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_tinymce_TinymceEditor_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/tinymce/TinymceEditor.vue */ "./resources/js/components/tinymce/TinymceEditor.vue")),
  "faq-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_FaqComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/FaqComponent.vue */ "./resources/js/components/FaqComponent.vue")),
  "support-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_SupportComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/SupportComponent.vue */ "./resources/js/components/SupportComponent.vue")),
  "dua-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_DuaComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/DuaComponent.vue */ "./resources/js/components/DuaComponent.vue")),
  "radio-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_RadioComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/RadioComponent.vue */ "./resources/js/components/RadioComponent.vue")),
  "guide-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_GuideComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/GuideComponent.vue */ "./resources/js/components/GuideComponent.vue")),
  "streaming-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_StreamingComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/StreamingComponent.vue */ "./resources/js/components/StreamingComponent.vue")),
  "toolkit-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_ToolkitComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ToolkitComponent.vue */ "./resources/js/components/ToolkitComponent.vue")),
  "video-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_VideoComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/VideoComponent.vue */ "./resources/js/components/VideoComponent.vue")),
  "zakat-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_ZakatComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ZakatComponent.vue */ "./resources/js/components/ZakatComponent.vue")),
  "qibla-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_QiblaComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/QiblaComponent.vue */ "./resources/js/components/QiblaComponent.vue")),
  "mosque-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_MosqueComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/MosqueComponent.vue */ "./resources/js/components/MosqueComponent.vue")),
  "calendar-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_CalendarComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/CalendarComponent.vue */ "./resources/js/components/CalendarComponent.vue")),
  "date-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_DateComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/DateComponent.vue */ "./resources/js/components/DateComponent.vue")),
  "hadith-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_HadithComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/HadithComponent.vue */ "./resources/js/components/HadithComponent.vue")),
  "shop-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_ShopComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ShopComponent.vue */ "./resources/js/components/ShopComponent.vue")),
  "tasbeeh-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_TasbeehComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/TasbeehComponent.vue */ "./resources/js/components/TasbeehComponent.vue")),
  "athkar-component": () => Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_AthkarComponenet_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/AthkarComponenet.vue */ "./resources/js/components/AthkarComponenet.vue")),
  "finance-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_FinanceComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/FinanceComponent.vue */ "./resources/js/components/FinanceComponent.vue")),
  "umrah-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_UmrahComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/UmrahComponent.vue */ "./resources/js/components/UmrahComponent.vue")),
  "name-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_NameComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/NameComponent.vue */ "./resources/js/components/NameComponent.vue")),
  "prayer-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_PrayerComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/PrayerComponent.vue */ "./resources/js/components/PrayerComponent.vue")),
  "travel-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_TravelComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/TravelComponent.vue */ "./resources/js/components/TravelComponent.vue")),
  "media-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_MediaComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/MediaComponent.vue */ "./resources/js/components/MediaComponent.vue")),
  "knowledge-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_KnowledgeComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/KnowledgeComponent.vue */ "./resources/js/components/KnowledgeComponent.vue")),
  "services-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_ServicesComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ServicesComponent.vue */ "./resources/js/components/ServicesComponent.vue")),
  "store-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_StoreComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/StoreComponent.vue */ "./resources/js/components/StoreComponent.vue")),
  "food-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_FoodComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/FoodComponent.vue */ "./resources/js/components/FoodComponent.vue")),
  "school-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_SchoolComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/SchoolComponent.vue */ "./resources/js/components/SchoolComponent.vue")),
  "welfare-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_WelfareComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/WelfareComponent.vue */ "./resources/js/components/WelfareComponent.vue")),
  "books-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_BooksComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/BooksComponent.vue */ "./resources/js/components/BooksComponent.vue")),
  "convert-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_ConvertComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ConvertComponent.vue */ "./resources/js/components/ConvertComponent.vue")),
  "holy-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_HolyComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/HolyComponent.vue */ "./resources/js/components/HolyComponent.vue")),
  "history-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_HistoryComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/HistoryComponent.vue */ "./resources/js/components/HistoryComponent.vue")),
  "payment-methods-component": () => Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_PaymentMethodsComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/PaymentMethodsComponent.vue */ "./resources/js/components/PaymentMethodsComponent.vue")),
  "read-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_ReadComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ReadComponent.vue */ "./resources/js/components/ReadComponent.vue")),
  "islamic-blog-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_IslamicBlogComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/IslamicBlogComponent.vue */ "./resources/js/components/IslamicBlogComponent.vue")),
  "revert-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_RevertComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/RevertComponent.vue */ "./resources/js/components/RevertComponent.vue")),
  "muslim-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_MuslimComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/MuslimComponent.vue */ "./resources/js/components/MuslimComponent.vue")),
  "bookmark-manager": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_bookmarks_BookmarkManager_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/bookmarks/BookmarkManager.vue */ "./resources/js/components/bookmarks/BookmarkManager.vue")),
  "shared-folder-view": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_bookmarks_SharedFolderView_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/bookmarks/SharedFolderView.vue */ "./resources/js/components/bookmarks/SharedFolderView.vue")),
  "resources-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_ResourcesComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ResourcesComponent.vue */ "./resources/js/components/ResourcesComponent.vue")),
  "ramadan-2026-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_Ramadan2026Component_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/Ramadan2026Component.vue */ "./resources/js/components/Ramadan2026Component.vue")),
  "hajj-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_components_vue_HajjComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ../components/vue/HajjComponent.vue */ "./resources/components/vue/HajjComponent.vue")),
  "ai-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_AiComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/AiComponent.vue */ "./resources/js/components/AiComponent.vue"))
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
const mountApp = async () => {
  await installOptionalRoutePlugins();
  const target = document.getElementById('app');
  if (!target) {
    if (IS_DEV) {
      console.warn('[Vue] mount target #app not found yet; retrying after DOMContentLoaded');
    }
    document.addEventListener('DOMContentLoaded', () => {
      const t2 = document.getElementById('app');
      if (t2) {
        app.mount('#app');
      } else {
        console.error('[Vue] mount failed: #app missing on DOMContentLoaded');
      }
    }, {
      once: true
    });
    return;
  }
  app.mount('#app');
};
(async () => {
  try {
    await mountApp();
  } catch (e) {
    console.error('[Vue] mount failed:', e);
    try {
      const root = document.getElementById('app');
      if (root) root.innerHTML = '<div style="padding:16px;color:#b00020;">App failed to initialize. Check console for details.</div>';
    } catch (_) {}
  }
})();
if (IS_DEV) {
  window.addEventListener('error', e => {
    console.error('[GlobalError]', (e === null || e === void 0 ? void 0 : e.message) || e);
  });
  window.addEventListener('unhandledrejection', e => {
    console.error('[UnhandledRejection]', (e === null || e === void 0 ? void 0 : e.reason) || e);
  });
}

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


// Ensure jQuery is available globally before AdminLTE

window.$ = window.jQuery = (jquery__WEBPACK_IMPORTED_MODULE_1___default());

// Import Bootstrap once and expose it globally for tooltips/modals.

window.bootstrap = bootstrap__WEBPACK_IMPORTED_MODULE_2__;
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
const loadAdminLteIfNeeded = async () => {
  if (typeof document === 'undefined') return;
  const requiresAdminLte = !!document.querySelector('.admin-page, .main-sidebar, .content-wrapper, body.admin-page');
  if (!requiresAdminLte) return;
  try {
    await __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.t.bind(__webpack_require__, /*! admin-lte */ "./node_modules/admin-lte/dist/js/adminlte.min.js", 23));
  } catch (_) {
    // Keep public pages resilient if the admin-only enhancement fails to load.
  }
};
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAdminLteIfNeeded, {
      once: true
    });
  } else {
    loadAdminLteIfNeeded();
  }
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["css/app","css/layout","css/vue-runtime","/js/vendor"], () => (__webpack_exec__("./resources/js/app.js"), __webpack_exec__("./resources/css/app.css"), __webpack_exec__("./resources/css/vue-runtime.css"), __webpack_exec__("./resources/css/layout.css")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);