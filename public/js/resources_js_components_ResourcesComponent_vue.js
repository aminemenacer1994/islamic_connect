"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_ResourcesComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ResourcesComponent.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ResourcesComponent.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ResourcesComponent",
  data() {
    return {
      cards: [{
        title: "Mobile Apps",
        description: "Portable tools for daily worship routines, Quran reading, and remembrance.",
        audience: "Best for everyday mobile learning",
        icon: "fas fa-mobile-alt",
        items: [{
          title: "Quran by Quran.com",
          kind: "Quran app",
          icon: "fas fa-book-open",
          iconBg: "linear-gradient(135deg, #0ea5a4, #0f766e)",
          description: "Open-source Quran app with strong translation quality, tafsir integration, and recitation controls.",
          features: ["Word by word lookup", "Multiple tafsir layers", "Bookmark and note support"],
          helpNote: "Helpful for consistent daily tilawah with reliable references in one place.",
          metadata: {
            type: "Mobile app",
            access: "iOS, Android, Web",
            language: "Arabic, English, and many translations",
            level: "Beginner to advanced",
            cost: "Free",
            reviewed: "February 2026"
          },
          link: "https://quran.com/apps"
        }, {
          title: "Muslim Pro",
          kind: "Daily companion",
          icon: "fas fa-compass",
          iconBg: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          description: "All in one app for salah timing, qibla, duas, and Quran access.",
          features: ["Location based prayer times", "Qibla and mosque finder", "Hijri calendar support"],
          helpNote: "Useful when you need prayer and adhkar tools available quickly throughout the day.",
          metadata: {
            type: "Mobile app",
            access: "iOS and Android",
            language: "Multi-language",
            level: "Beginner friendly",
            cost: "Free tier and premium options",
            reviewed: "February 2026"
          },
          link: "https://www.muslimpro.com"
        }, {
          title: "Athan by IslamicFinder",
          kind: "Prayer time app",
          icon: "fas fa-bell",
          iconBg: "linear-gradient(135deg, #0f766e, #115e59)",
          description: "Prayer schedule app focused on athan alerts, qibla direction, and nearby mosque discovery.",
          features: ["Athan reminders", "Qibla pointer", "Nearby masjid search"],
          helpNote: "Strong option for users who prioritize accurate prayer notifications and travel support.",
          metadata: {
            type: "Mobile app",
            access: "iOS and Android",
            language: "Multi-language",
            level: "Beginner friendly",
            cost: "Free",
            reviewed: "February 2026"
          },
          link: "https://www.islamicfinder.org/athan/"
        }, {
          title: "Hisnul Muslim",
          kind: "Dua reference app",
          icon: "fas fa-hands-helping",
          iconBg: "linear-gradient(135deg, #d97706, #b45309)",
          description: "Digital reference of authentic duas from Quran and sahih narrations with simple offline access.",
          features: ["Quick category browsing", "Works offline", "Source references included"],
          helpNote: "Good for memorizing adhkar and following morning and evening dua routines.",
          metadata: {
            type: "Mobile app",
            access: "Android (widely available variants)",
            language: "Arabic and English",
            level: "Beginner to intermediate",
            cost: "Free",
            reviewed: "February 2026"
          },
          link: "https://play.google.com/store/apps/details?id=com.admads.android.HisnulMuslim"
        }, {
          title: "Hadith Collection (Greentech)",
          kind: "Hadith app",
          icon: "fas fa-book-reader",
          iconBg: "linear-gradient(135deg, #334155, #1e293b)",
          description: "Searchable hadith app with major collections and grading visibility.",
          features: ["Bukhari and Muslim included", "Grade display", "Arabic and English browsing"],
          helpNote: "Best for students who want quick hadith lookup with chain grading context.",
          metadata: {
            type: "Mobile app",
            access: "Android",
            language: "Arabic and English",
            level: "Intermediate and student use",
            cost: "Free",
            reviewed: "February 2026"
          },
          link: "https://play.google.com/store/apps/details?id=com.greentech.hadith"
        }]
      }, {
        title: "Websites",
        description: "Trusted web platforms for studying Quran, hadith, fiqh, and guided learning pathways.",
        audience: "Best for deeper study on desktop and tablet",
        icon: "fas fa-globe",
        items: [{
          title: "Quran.com",
          kind: "Quran website",
          icon: "fas fa-quran",
          iconBg: "linear-gradient(135deg, #0ea5a4, #14b8a6)",
          description: "Highly trusted Quran portal with recitation, tafsir, and translation comparison.",
          features: ["Reliable translation set", "Tafsir views", "Recitation controls"],
          helpNote: "Strong central reference when checking ayah meaning across different translations.",
          metadata: {
            type: "Website",
            access: "Web browser",
            language: "Arabic and global translations",
            level: "Beginner to advanced",
            cost: "Free",
            reviewed: "February 2026"
          },
          link: "https://quran.com"
        }, {
          title: "Sunnah.com",
          kind: "Hadith website",
          icon: "fas fa-scroll",
          iconBg: "linear-gradient(135deg, #1d4ed8, #1e40af)",
          description: "Hadith portal for major collections with clear chapter organization and grading.",
          features: ["Major books indexed", "Narration numbering", "Search by topic and collection"],
          helpNote: "Use this for quick text lookup before moving to deeper commentary sources.",
          metadata: {
            type: "Website",
            access: "Web browser",
            language: "Arabic and English",
            level: "Intermediate and student use",
            cost: "Free",
            reviewed: "February 2026"
          },
          link: "https://sunnah.com"
        }, {
          title: "SeekersGuidance",
          kind: "Learning platform",
          icon: "fas fa-graduation-cap",
          iconBg: "linear-gradient(135deg, #0f766e, #0d9488)",
          description: "Structured Islamic courses and scholar-reviewed answers across key subjects.",
          features: ["Free curriculum paths", "Qualified instructors", "Fiqh and aqidah tracks"],
          helpNote: "Great for learners who need structured lessons instead of isolated articles.",
          metadata: {
            type: "Website",
            access: "Web browser",
            language: "Primarily English",
            level: "Beginner to intermediate",
            cost: "Mostly free",
            reviewed: "February 2026"
          },
          link: "https://seekersguidance.org"
        }, {
          title: "IslamQA.info",
          kind: "Fatwa archive",
          icon: "fas fa-question-circle",
          iconBg: "linear-gradient(135deg, #475569, #334155)",
          description: "Large fatwa and topic archive with evidence references and clear legal framing.",
          features: ["Topic based filtering", "Reference-driven answers", "Multi-language support"],
          helpNote: "Useful for focused question answering when you need cited source references.",
          metadata: {
            type: "Website",
            access: "Web browser",
            language: "Arabic, English, and more",
            level: "Intermediate",
            cost: "Free",
            reviewed: "February 2026"
          },
          link: "https://islamqa.info"
        }, {
          title: "IslamicFinder",
          kind: "Prayer and utility site",
          icon: "fas fa-mosque",
          iconBg: "linear-gradient(135deg, #16a34a, #15803d)",
          description: "Long-running Islamic utility site with prayer tools and location-based services.",
          features: ["Prayer time engine", "Qibla finder", "Islamic calendar tools"],
          helpNote: "Good fallback for prayer and qibla access while traveling or switching devices.",
          metadata: {
            type: "Website",
            access: "Web browser",
            language: "Multi-language",
            level: "Beginner friendly",
            cost: "Free",
            reviewed: "February 2026"
          },
          link: "https://www.islamicfinder.org"
        }]
      }, {
        title: "Books",
        description: "Foundational hadith books and practical references used in teaching and personal study.",
        audience: "Best for text-focused learners and study circles",
        icon: "fas fa-book",
        items: [{
          title: "Sahih al-Bukhari",
          kind: "Hadith collection",
          icon: "fas fa-book-open",
          iconBg: "linear-gradient(135deg, #b45309, #92400e)",
          description: "Primary sahih hadith collection with wide scholarly acceptance and usage.",
          features: ["Compiled by Imam al-Bukhari", "Extensive chapter structure", "Foundational source"],
          helpNote: "Use with commentary and teacher guidance for best context and legal understanding.",
          metadata: {
            type: "Book",
            access: "Web editions and print copies",
            language: "Arabic and translated editions",
            level: "Intermediate to advanced",
            cost: "Free online editions available",
            reviewed: "February 2026"
          },
          link: "https://sunnah.com/bukhari"
        }, {
          title: "Sahih Muslim",
          kind: "Hadith collection",
          icon: "fas fa-book-reader",
          iconBg: "linear-gradient(135deg, #c2410c, #9a3412)",
          description: "Canonical sahih collection often studied alongside Sahih al-Bukhari.",
          features: ["Compiled by Imam Muslim", "Strong narration quality", "Used in core hadith study"],
          helpNote: "Helpful for comparative hadith study and understanding narration pathways.",
          metadata: {
            type: "Book",
            access: "Web editions and print copies",
            language: "Arabic and translated editions",
            level: "Intermediate to advanced",
            cost: "Free online editions available",
            reviewed: "February 2026"
          },
          link: "https://sunnah.com/muslim"
        }, {
          title: "Riyad as-Salihin",
          kind: "Practical hadith guide",
          icon: "fas fa-heart",
          iconBg: "linear-gradient(135deg, #0ea5a4, #0f766e)",
          description: "Daily-practice hadith collection covering adab, worship, and character building.",
          features: ["Compiled by Imam al-Nawawi", "Theme-based chapters", "Suitable for daily reading"],
          helpNote: "Ideal for family circles, khutbah prep, and day-to-day spiritual reminders.",
          metadata: {
            type: "Book",
            access: "Web editions and print copies",
            language: "Arabic and English",
            level: "Beginner to intermediate",
            cost: "Free online editions available",
            reviewed: "February 2026"
          },
          link: "https://sunnah.com/riyadussalihin"
        }, {
          title: "Al-Muwatta",
          kind: "Hadith and fiqh text",
          icon: "fas fa-balance-scale",
          iconBg: "linear-gradient(135deg, #334155, #1f2937)",
          description: "Early hadith and fiqh work reflecting Madinan legal practice and narration.",
          features: ["Compiled by Imam Malik", "Early juristic framework", "Referenced in legal studies"],
          helpNote: "Useful for learners connecting hadith narration with fiqh foundations.",
          metadata: {
            type: "Book",
            access: "Web editions and print copies",
            language: "Arabic and translated editions",
            level: "Intermediate to advanced",
            cost: "Free online editions available",
            reviewed: "February 2026"
          },
          link: "https://sunnah.com/malik"
        }, {
          title: "40 Hadith Nawawi",
          kind: "Concise hadith primer",
          icon: "fas fa-list-ol",
          iconBg: "linear-gradient(135deg, #2563eb, #1e3a8a)",
          description: "Compact set of core narrations widely used for creed, ethics, and memorization.",
          features: ["Forty key narrations", "Strong educational value", "Common in beginner curricula"],
          helpNote: "Great entry point for structured memorization and teacher-led explanation.",
          metadata: {
            type: "Book",
            access: "Web editions and print copies",
            language: "Arabic and many translations",
            level: "Beginner to intermediate",
            cost: "Free online editions available",
            reviewed: "February 2026"
          },
          link: "https://sunnah.com/nawawi40"
        }]
      }, {
        title: "Scriptures and Tafsir",
        description: "Primary Quran text and core tafsir references for verse-by-verse understanding.",
        audience: "Best for tafsir-backed Quran study",
        icon: "fas fa-scroll",
        items: [{
          title: "The Quran (Al-Quran al-Kareem)",
          kind: "Primary scripture",
          icon: "fas fa-quran",
          iconBg: "linear-gradient(135deg, #0f766e, #0d9488)",
          description: "The final revelation and central source for belief, worship, and guidance.",
          features: ["Canonical Arabic text", "Recitation support", "Parallel translation options"],
          helpNote: "Start every learning path from direct Quran reading before secondary commentary.",
          metadata: {
            type: "Scripture",
            access: "Web editions, apps, and print mushaf",
            language: "Arabic text with global translations",
            level: "All levels",
            cost: "Free online access",
            reviewed: "February 2026"
          },
          link: "https://quran.com"
        }, {
          title: "Tafsir Ibn Kathir",
          kind: "Classical tafsir",
          icon: "fas fa-feather-alt",
          iconBg: "linear-gradient(135deg, #14532d, #166534)",
          description: "Well-known Sunni tafsir linking verses to hadith and narrations from early scholars.",
          features: ["Narration-based method", "Broad scholarly usage", "Strong source linkage"],
          helpNote: "Helpful when you need context on sabab al-nuzul and early scholarly explanations.",
          metadata: {
            type: "Tafsir",
            access: "Web editions and print copies",
            language: "Arabic and translated selections",
            level: "Intermediate",
            cost: "Free online selections available",
            reviewed: "February 2026"
          },
          link: "https://quran.com/tafseer/ibn-kathir"
        }, {
          title: "Tafsir As-Sa'di",
          kind: "Concise tafsir",
          icon: "fas fa-lightbulb",
          iconBg: "linear-gradient(135deg, #0891b2, #0e7490)",
          description: "Readable tafsir focused on practical guidance, spiritual reflection, and clarity.",
          features: ["Short explanatory style", "Easy reading flow", "Practical message focus"],
          helpNote: "Good daily tafsir companion for personal reflection without heavy technical language.",
          metadata: {
            type: "Tafsir",
            access: "Web editions and print copies",
            language: "Arabic and English",
            level: "Beginner to intermediate",
            cost: "Free online selections available",
            reviewed: "February 2026"
          },
          link: "https://quran.com/tafseer/as-sadi"
        }, {
          title: "Tafsir Al-Jalalayn",
          kind: "Classical concise tafsir",
          icon: "fas fa-pen-nib",
          iconBg: "linear-gradient(135deg, #4338ca, #3730a3)",
          description: "Compact classical tafsir emphasizing linguistic explanation and concise verse meaning.",
          features: ["Classical author lineage", "Concise style", "Useful language notes"],
          helpNote: "Useful for learners comparing short classical explanations across tafsir works.",
          metadata: {
            type: "Tafsir",
            access: "Web editions and print copies",
            language: "Arabic and translated selections",
            level: "Intermediate to advanced",
            cost: "Free online selections available",
            reviewed: "February 2026"
          },
          link: "https://islamicstudies.info/tafseer/Al-Jalalayn"
        }, {
          title: "Mushaf Madinah (King Fahd Complex)",
          kind: "Standard mushaf edition",
          icon: "fas fa-certificate",
          iconBg: "linear-gradient(135deg, #334155, #0f172a)",
          description: "Widely distributed Uthmani script mushaf with standardized typography and layout.",
          features: ["Uthmani script style", "Reliable publishing body", "Print and digital resources"],
          helpNote: "Useful for consistent memorization and tajwid practice with stable page layout.",
          metadata: {
            type: "Mushaf edition",
            access: "Digital and print",
            language: "Arabic text",
            level: "All levels",
            cost: "Free digital access",
            reviewed: "February 2026"
          },
          link: "https://qurancomplex.gov.sa"
        }]
      }],
      modalItem: null,
      modalCategory: ""
    };
  },
  computed: {
    totalResources() {
      return this.cards.reduce((sum, card) => sum + card.items.length, 0);
    }
  },
  methods: {
    openModal(item, category = "") {
      this.modalItem = item;
      this.modalCategory = category;
    },
    closeModal() {
      this.modalItem = null;
      this.modalCategory = "";
    },
    metadataEntries(item) {
      const metadata = (item === null || item === void 0 ? void 0 : item.metadata) || {};
      return [{
        label: "Type",
        value: metadata.type,
        icon: "fas fa-tag"
      }, {
        label: "Access",
        value: metadata.access,
        icon: "fas fa-laptop"
      }, {
        label: "Language",
        value: metadata.language,
        icon: "fas fa-language"
      }, {
        label: "Level",
        value: metadata.level,
        icon: "fas fa-graduation-cap"
      }, {
        label: "Cost",
        value: metadata.cost,
        icon: "fas fa-wallet"
      }, {
        label: "Reviewed",
        value: metadata.reviewed,
        icon: "fas fa-clock"
      }].filter(entry => Boolean(entry.value));
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ResourcesComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ResourcesComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_ResourcesComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_ResourcesComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/vue/ResourcesComponent.vue */ "./resources/components/vue/ResourcesComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ResourcesComponent.vue?vue&type=template&id=ecf0859c&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ResourcesComponent.vue?vue&type=template&id=ecf0859c&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  id: "app",
  class: "resources-view"
};
const _hoisted_2 = {
  class: "container-fluid px-4 px-lg-5 py-5"
};
const _hoisted_3 = {
  class: "resources-inner mx-auto"
};
const _hoisted_4 = {
  class: "row justify-content-center text-center mb-4"
};
const _hoisted_5 = {
  class: "col-xl-10"
};
const _hoisted_6 = {
  class: "resources-summary"
};
const _hoisted_7 = {
  class: "summary-chip"
};
const _hoisted_8 = {
  class: "summary-chip"
};
const _hoisted_9 = {
  class: "resources-page"
};
const _hoisted_10 = {
  class: "row g-4"
};
const _hoisted_11 = {
  class: "resource-card"
};
const _hoisted_12 = {
  class: "resource-card__header"
};
const _hoisted_13 = {
  class: "resource-card__icon"
};
const _hoisted_14 = {
  class: "resource-card__title"
};
const _hoisted_15 = {
  class: "resource-card__description mb-2"
};
const _hoisted_16 = {
  class: "resource-card__meta"
};
const _hoisted_17 = {
  class: "resource-items"
};
const _hoisted_18 = {
  class: "resource-item__head"
};
const _hoisted_19 = {
  class: "resource-item__title-wrap"
};
const _hoisted_20 = {
  class: "resource-item__type"
};
const _hoisted_21 = {
  class: "resource-item__title"
};
const _hoisted_22 = {
  class: "resource-item__description"
};
const _hoisted_23 = {
  class: "resource-item__meta-list"
};
const _hoisted_24 = {
  class: "resource-item__features"
};
const _hoisted_25 = {
  class: "resource-item__help-note"
};
const _hoisted_26 = {
  class: "resource-item__actions"
};
const _hoisted_27 = ["href"];
const _hoisted_28 = ["onClick"];
const _hoisted_29 = ["aria-label"];
const _hoisted_30 = {
  class: "modal-card__header"
};
const _hoisted_31 = {
  class: "modal-card__identity"
};
const _hoisted_32 = {
  class: "modal-card__tag"
};
const _hoisted_33 = {
  class: "modal-card__title"
};
const _hoisted_34 = {
  class: "modal-card__section"
};
const _hoisted_35 = {
  class: "modal-card__description"
};
const _hoisted_36 = {
  class: "modal-card__note"
};
const _hoisted_37 = {
  class: "modal-card__section"
};
const _hoisted_38 = {
  class: "modal-meta-grid"
};
const _hoisted_39 = {
  class: "modal-meta-card__label"
};
const _hoisted_40 = {
  class: "modal-meta-card__value"
};
const _hoisted_41 = {
  class: "modal-card__section"
};
const _hoisted_42 = {
  class: "modal-feature-grid"
};
const _hoisted_43 = {
  class: "modal-card__footer"
};
const _hoisted_44 = ["href"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "display-5 fw-bold heading"
  }, "Islamic Apps and Learning Resources", -1 /* CACHED */)), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "lead subhead"
  }, " Curated resources for Quran study, hadith learning, and daily worship. Every entry includes quick metadata so users can compare format, language, learning level, and access at a glance. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_7, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-layer-group",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.cards.length) + " categories ", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_8, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-check-circle",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.totalResources) + " curated resources ", 1 /* TEXT */)]), _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "summary-chip"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-calendar-check",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Last content review: February 2026 ")], -1 /* CACHED */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.cards, card => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-lg-6",
      key: card.title
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(card.icon),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.items.length) + " entries", 1 /* TEXT */), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "divider"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.audience), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(card.items, (item, index) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
        class: "resource-item",
        key: `${card.title}-${index}`
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "resource-item__icon",
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
          background: item.iconBg
        })
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(item.icon),
        "aria-hidden": "true"
      }, null, 2 /* CLASS */)], 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.kind), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */)]), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "resource-item__status"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-check-circle",
        "aria-hidden": "true"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Curated ")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.metadataEntries(item), entry => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
          key: `${item.title}-${entry.label}`,
          class: "meta-chip"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
          class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(entry.icon),
          "aria-hidden": "true"
        }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.label) + ":", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.value), 1 /* TEXT */)]);
      }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(item.features, feature => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
          key: `${item.title}-${feature}`,
          class: "feature-chip"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(feature), 1 /* TEXT */);
      }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.helpNote), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
        class: "btn btn-sm btn-resource btn-resource--ghost",
        href: item.link,
        target: "_blank",
        rel: "noopener"
      }, [...(_cache[11] || (_cache[11] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-external-link-alt",
        "aria-hidden": "true"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Visit ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_27), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        type: "button",
        class: "btn btn-sm btn-resource btn-resource--solid",
        onClick: $event => $options.openModal(item, card.title)
      }, [...(_cache[12] || (_cache[12] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-info-circle",
        "aria-hidden": "true"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Details ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_28)])]);
    }), 128 /* KEYED_FRAGMENT */))])])]);
  }), 128 /* KEYED_FRAGMENT */))])])])]), $data.modalItem ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: "modal-overlay",
    tabindex: "-1",
    onClick: _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.closeModal && $options.closeModal(...args), ["self"])),
    onKeydown: _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((...args) => $options.closeModal && $options.closeModal(...args), ["esc"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-card",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": `Details for ${$data.modalItem.title}`
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-card__icon",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      background: $data.modalItem.iconBg
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($data.modalItem.icon),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.modalCategory || "Resource"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_33, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.modalItem.title), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "aria-label": "Close",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.closeModal && $options.closeModal(...args))
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.modalItem.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.modalItem.helpNote), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_37, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, "Resource metadata", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.metadataEntries($data.modalItem), entry => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      class: "modal-meta-card",
      key: entry.label
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.value), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_41, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, "Key highlights", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.modalItem.features, feature => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
      class: "modal-feature-chip",
      key: `${$data.modalItem.title}-${feature}`
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(feature), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-sm btn-resource btn-resource--ghost",
    onClick: _cache[1] || (_cache[1] = (...args) => $options.closeModal && $options.closeModal(...args))
  }, " Close "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    class: "btn btn-sm btn-resource btn-resource--solid",
    href: $data.modalItem.link,
    target: "_blank",
    rel: "noopener"
  }, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-external-link-alt",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Open resource ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_44)])], 8 /* PROPS */, _hoisted_29)], 32 /* NEED_HYDRATION */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ResourcesComponent.vue?vue&type=style&index=0&id=ecf0859c&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ResourcesComponent.vue?vue&type=style&index=0&id=ecf0859c&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/ResourcesComponent.vue":
/*!*********************************************************!*\
  !*** ./resources/components/vue/ResourcesComponent.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ResourcesComponent_vue_vue_type_template_id_ecf0859c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResourcesComponent.vue?vue&type=template&id=ecf0859c&scoped=true */ "./resources/components/vue/ResourcesComponent.vue?vue&type=template&id=ecf0859c&scoped=true");
/* harmony import */ var _ResourcesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResourcesComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/ResourcesComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _ResourcesComponent_vue_vue_type_style_index_0_id_ecf0859c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ResourcesComponent.vue?vue&type=style&index=0&id=ecf0859c&scoped=true&lang=css */ "./resources/components/vue/ResourcesComponent.vue?vue&type=style&index=0&id=ecf0859c&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ResourcesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ResourcesComponent_vue_vue_type_template_id_ecf0859c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-ecf0859c"],['__file',"resources/components/vue/ResourcesComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/ResourcesComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************!*\
  !*** ./resources/components/vue/ResourcesComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ResourcesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ResourcesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ResourcesComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ResourcesComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/ResourcesComponent.vue?vue&type=style&index=0&id=ecf0859c&scoped=true&lang=css":
/*!*****************************************************************************************************************!*\
  !*** ./resources/components/vue/ResourcesComponent.vue?vue&type=style&index=0&id=ecf0859c&scoped=true&lang=css ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ResourcesComponent_vue_vue_type_style_index_0_id_ecf0859c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ResourcesComponent.vue?vue&type=style&index=0&id=ecf0859c&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ResourcesComponent.vue?vue&type=style&index=0&id=ecf0859c&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/ResourcesComponent.vue?vue&type=template&id=ecf0859c&scoped=true":
/*!***************************************************************************************************!*\
  !*** ./resources/components/vue/ResourcesComponent.vue?vue&type=template&id=ecf0859c&scoped=true ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ResourcesComponent_vue_vue_type_template_id_ecf0859c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ResourcesComponent_vue_vue_type_template_id_ecf0859c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ResourcesComponent.vue?vue&type=template&id=ecf0859c&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ResourcesComponent.vue?vue&type=template&id=ecf0859c&scoped=true");


/***/ }),

/***/ "./resources/js/components/ResourcesComponent.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/ResourcesComponent.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ResourcesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResourcesComponent.vue?vue&type=script&lang=js */ "./resources/js/components/ResourcesComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_ResourcesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/ResourcesComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/ResourcesComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************!*\
  !*** ./resources/js/components/ResourcesComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ResourcesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ResourcesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ResourcesComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ResourcesComponent.vue?vue&type=script&lang=js");
 

/***/ })

}]);