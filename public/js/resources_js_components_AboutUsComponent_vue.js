"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_AboutUsComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AboutUsComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AboutUsComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "AboutUsComponent",
  props: {
    sections: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    groupedSections() {
      const groups = {};
      this.sections.forEach(section => {
        const key = section.section_group || `group-${section.id}`;
        if (!groups[key]) {
          var _section$order;
          groups[key] = {
            key,
            layout: section.layout || "default",
            order: (_section$order = section.order) !== null && _section$order !== void 0 ? _section$order : 0,
            items: []
          };
        }
        groups[key].items.push(section);
        if (section.order !== undefined && section.order < groups[key].order) {
          groups[key].order = section.order;
        }
      });
      return Object.values(groups).sort((a, b) => a.order - b.order);
    }
  },
  methods: {
    columnClasses(section) {
      const base = section.column_class || "col-lg-12";
      const modifier = section.layout === "hero" ? "" : "mb-4";
      return modifier ? [base, modifier] : base;
    },
    headingClass(section) {
      const tags = {
        h1: "display-5 fw-bold mb-3",
        h2: "h3 fw-semibold text-dark",
        h3: "h5 fw-semibold text-dark"
      };
      let classes = tags[section.heading_tag] || "h5 fw-semibold text-dark";
      if (section.layout === "two-column" && section.column_name !== "full") {
        classes += " mt-4 mt-lg-0";
      }
      return classes;
    },
    rowSpacing(group) {
      if (group.layout === "hero") {
        return "";
      }
      if (group.order === 2) {
        return "mt-5";
      }
      return "mt-4";
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AboutUsComponent.vue?vue&type=template&id=1d24b8c6":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AboutUsComponent.vue?vue&type=template&id=1d24b8c6 ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container py-5",
  "aria-labelledby": "home-hero-heading"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [...(_cache[0] || (_cache[0] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"row\"><div class=\"col-lg-8\"><p class=\"text-uppercase text-muted small mb-2\">Accessible Islamic hub</p><h1 id=\"home-hero-heading\" class=\"display-5 fw-bold mb-3\">Islamic Connect: Quran, Knowledge &amp; Community Tools</h1><p class=\"lead text-muted mb-4\"> Islamic Connect is built to be a living, searchable companion for everyday Muslims. This hero section defines the promise: reliable Quran study rooms, compassionate guidance, and accessible utilities that fit into every schedule. We wrote this paragraph server side so search engines receive a readable story right away, and the words also extend a warm greeting to those who arrive directly. When someone lands on this homepage, they should feel the same clarity we aim for inside the Quran portal, knowledge library, and multimedia center, so the text that follows outlines the pillars of that clarity. </p><p class=\"text-muted mb-3\"> Because so many visitors arrive on phones or under slow networks, we intentionally keep the markup lightweight while layering in narrative depth. Every sentence here reinforces our brand values knowledge, community, service and calls out specific tools like dua collections, scholar reflections, and logistics planners. That helps search engines map keywords such as &quot;accessible Quran tools&quot; and &quot;faith building media&quot; back to tangible experiences on the site. The result is a hero that feels practical, not promotional, and a page that still meets crawl budgets. </p></div></div><div class=\"row mt-5\"><div class=\"col-lg-8\"><h2 id=\"guided-quran-heading\" class=\"h3 fw-semibold text-dark\">Guided Quran Learning with Context</h2><p class=\"text-muted\"> Our guided Quran learning tracks walk readers from the first page of Fatiha through each Surah with contextual summaries, transliterations, and short audio samples. Teachers, parents, and self directed students can toggle translations, highlight lessons, and queue readings that respect both devotional rhythm and modern schedules. We pair these learning trails with short essays that explain why certain verses were revealed and how they motivate values like mercy, justice, and gratitude so visitors do not just memorize text but live it. Each section ends with reflection prompts and badges for daily consistency, so learners can monitor progress without leaving the site. </p><p class=\"text-muted mb-4\"> In the same space we host scholar led roundups and curated playlists that preserve scholarly integrity while staying adaptive. Soundbites introduce classical commentaries, while longer articles document contemporary applications such as ethical finance, civic responsibility, and mental health, so the Quran is not a historical artifact but a living guide. All of these resources include concise citations and gentle invitations for further study so readers know which narrations or scholars shaped each explanation. </p></div><div class=\"col-lg-4\"><h3 class=\"h5 fw-semibold text-dark mt-4 mt-lg-0\">Community Support &amp; Accessibility</h3><p class=\"text-muted\"> Community support is woven into every layout decision. We maintain 24/7 moderated chat rooms, volunteer mentoring, and translation contributors so Muslims across regions can share questions, recordings, and dua requests. Accessibility features include keyboard first navigation, clear focus indicators, and descriptive alt text on every audio and video card. High contrast controls and automatic text scaling ensure readers with sight differences still experience comfortable study sessions, while lightweight caching and offline friendly assets help those with intermittent connections. </p></div></div><div class=\"row mt-4\"><div class=\"col-lg-6\"><h3 class=\"h5 fw-semibold text-dark\">Modern Tools Rooted in Tradition</h3><p class=\"text-muted\"> Modern tools do not mean abandoning tradition; instead we wrap historical wisdom in familiar interfaces. Our dua builder lets people compile personal collections from canonical supplications, annotate them with dates, and print them as reminders for travel or Ramadan. The travel planner blends fiqh guidance with prayer times, qibla data, and community updates so pilgrims are not left juggling multiple apps. Logistics features are paired with step by step summaries so families can coordinate deliveries, donations, or study groups without excessive meetings. </p><p class=\"text-muted\"> That same mindset extends to our media studio, where volunteers script short explainers, fact check hadith references, and caption videos in several languages. Every release includes a short transcript, keywords, and suggested discussion prompts so imams, educators, and youth leaders can turn a five minute clip into a classroom conversation or family tafsir circle. </p></div><div class=\"col-lg-6\"><h2 class=\"h3 fw-semibold text-dark mt-4 mt-lg-0\">Volunteer Led Service &amp; Responsible Giving</h2><p class=\"text-muted\"> Volunteer led service keeps the platform honest. Local volunteers confirm events, support content creation, and answer direct queries so the digital experience feels human. Every donation is tracked, and receipts describe where the resources go education, infrastructure, or new research so patrons trust that their contributions match the values outlined on this homepage. </p><p class=\"text-muted mb-0\"> We also publish quarterly mission impact stories to share how new prayer areas, education stipends, or accessible audio loops reached underserved communities. These narratives describe measurable results, such as study groups launched, scholars hosted, or tools translated, so stakeholders can celebrate wins and suggest improvements. </p></div></div><div class=\"row mt-4\"><div class=\"col-lg-12\"><p class=\"text-muted mb-0\"> By layering this degree of narrative detail before the interactive components, we hope to deliver 800+ words that search engines can crawl and humans can savor. Every heading, sentence, and paragraph here guides visitors toward the same promises Quran clarity, scholarly insight, and community tools that adapt to their lives. </p></div></div>", 4)]))]);
}

/***/ }),

/***/ "./resources/js/components/AboutUsComponent.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/AboutUsComponent.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AboutUsComponent_vue_vue_type_template_id_1d24b8c6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AboutUsComponent.vue?vue&type=template&id=1d24b8c6 */ "./resources/js/components/AboutUsComponent.vue?vue&type=template&id=1d24b8c6");
/* harmony import */ var _AboutUsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AboutUsComponent.vue?vue&type=script&lang=js */ "./resources/js/components/AboutUsComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_AboutUsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AboutUsComponent_vue_vue_type_template_id_1d24b8c6__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/AboutUsComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/AboutUsComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/components/AboutUsComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AboutUsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AboutUsComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AboutUsComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AboutUsComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/AboutUsComponent.vue?vue&type=template&id=1d24b8c6":
/*!************************************************************************************!*\
  !*** ./resources/js/components/AboutUsComponent.vue?vue&type=template&id=1d24b8c6 ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AboutUsComponent_vue_vue_type_template_id_1d24b8c6__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AboutUsComponent_vue_vue_type_template_id_1d24b8c6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AboutUsComponent.vue?vue&type=template&id=1d24b8c6 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AboutUsComponent.vue?vue&type=template&id=1d24b8c6");


/***/ })

}]);