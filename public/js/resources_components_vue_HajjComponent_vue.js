"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_components_vue_HajjComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");


// PDF Links - Replace with your actual PDF URLs

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'HajjComponent',
  setup(__props, {
    expose: __expose
  }) {
    __expose();
    const pdfs = {
      completeGuide: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      basicsGuide: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      umrahGuide: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      hajjGuide: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      ihramRules: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      duasCollection: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      packingChecklist: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    };
    const scrollToSection = id => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    };

    // Animation on scroll
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, {
        threshold: 0.1
      });
      document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
    });
    const __returned__ = {
      pdfs,
      scrollToSection,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref,
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

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "pg"
};
const _hoisted_2 = {
  class: "main-container"
};
const _hoisted_3 = {
  class: "hero"
};
const _hoisted_4 = {
  class: "hero-content"
};
const _hoisted_5 = {
  class: "hero-actions"
};
const _hoisted_6 = ["href"];
const _hoisted_7 = {
  class: "sec fade-in-section",
  id: "basics"
};
const _hoisted_8 = {
  class: "section-download"
};
const _hoisted_9 = ["href"];
const _hoisted_10 = {
  class: "sec alt fade-in-section",
  id: "umrah"
};
const _hoisted_11 = {
  class: "section-download"
};
const _hoisted_12 = ["href"];
const _hoisted_13 = {
  class: "sec fade-in-section",
  id: "hajj"
};
const _hoisted_14 = {
  class: "section-download"
};
const _hoisted_15 = ["href"];
const _hoisted_16 = {
  class: "sec alt fade-in-section",
  id: "ihram"
};
const _hoisted_17 = {
  class: "section-download"
};
const _hoisted_18 = ["href"];
const _hoisted_19 = {
  class: "sec fade-in-section",
  id: "duas"
};
const _hoisted_20 = {
  class: "section-download"
};
const _hoisted_21 = ["href"];
const _hoisted_22 = {
  class: "sec alt fade-in-section",
  id: "tips"
};
const _hoisted_23 = {
  class: "section-download"
};
const _hoisted_24 = ["href"];
const _hoisted_25 = {
  class: "closing"
};
const _hoisted_26 = {
  class: "final-downloads"
};
const _hoisted_27 = ["href"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" SIMPLIFIED HERO SECTION "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "bismillah"
  }, "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", -1 /* CACHED */)), _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "hero-title"
  }, "Your Complete Guide to Hajj & Umrah", -1 /* CACHED */)), _cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "hero-subtitle"
  }, "Step-by-step guidance for the sacred pilgrimage, verified by Islamic scholars and updated for 1447 AH.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn-primary",
    onClick: _cache[0] || (_cache[0] = $event => $setup.scrollToSection('basics'))
  }, "Begin Your Journey"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: $setup.pdfs.completeGuide,
    download: "",
    class: "btn-secondary"
  }, [...(_cache[1] || (_cache[1] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    width: "18",
    height: "18",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
  })], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Download Full Guide ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_6)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chapter I: Basics - TEXT LEFT, IMAGE RIGHT "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"content-grid\" data-v-44a8361a><div class=\"text-content\" data-v-44a8361a><span class=\"eyebrow\" data-v-44a8361a>Chapter I</span><h2 class=\"sec-title\" data-v-44a8361a>Understanding Hajj &amp; Umrah</h2><p class=\"lead-text\" data-v-44a8361a>The pilgrimage to Makkah is one of the most profound acts of worship in Islam, representing the unity of Muslims worldwide and the submission to Allah&#39;s command.</p><div class=\"content-block\" data-v-44a8361a><h3 data-v-44a8361a>What is Hajj?</h3><p data-v-44a8361a>Hajj is the fifth pillar of Islam and an obligatory act of worship for every Muslim who is physically and financially able to perform it at least once in their lifetime. It takes place during the Islamic month of Dhul Hijjah and commemorates the trials of Prophet Ibrahim (AS), his wife Hajar, and their son Ismail (AS).</p><p data-v-44a8361a>The pilgrimage involves a series of rituals performed over 5-6 days, including wearing the Ihram (sacred state), standing at Arafat, stoning the pillars representing Satan, and circumambulating the Kaaba.</p></div><div class=\"content-block\" data-v-44a8361a><h3 data-v-44a8361a>What is Umrah?</h3><p data-v-44a8361a>Umrah, often called the &quot;minor pilgrimage,&quot; can be performed at any time of the year and is highly recommended (Sunnah Mu&#39;akkadah). While shorter and less complex than Hajj, it carries immense spiritual reward and serves as a means of seeking forgiveness and drawing closer to Allah.</p><p data-v-44a8361a>Umrah consists of four main acts: entering Ihram, performing Tawaf (circumambulation of the Kaaba), Sa&#39;i (walking between Safa and Marwa), and cutting or shaving the hair.</p></div><div class=\"key-differences\" data-v-44a8361a><h4 data-v-44a8361a>Key Differences</h4><ul data-v-44a8361a><li data-v-44a8361a><strong data-v-44a8361a>Timing:</strong> Hajj is specific to Dhul Hijjah (8th-13th), while Umrah can be performed year-round</li><li data-v-44a8361a><strong data-v-44a8361a>Duration:</strong> Hajj takes 5-6 days; Umrah can be completed in a few hours</li><li data-v-44a8361a><strong data-v-44a8361a>Obligation:</strong> Hajj is obligatory once in a lifetime; Umrah is voluntary but highly rewarded</li><li data-v-44a8361a><strong data-v-44a8361a>Rituals:</strong> Hajj includes additional rites like standing at Arafat and stoning at Mina</li></ul></div></div><div class=\"image-content\" data-v-44a8361a><img src=\"https://images.pexels.com/photos/2347321/pexels-photo-2347321.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=800\" alt=\"The Holy Kaaba in Masjid al-Haram\" loading=\"lazy\" data-v-44a8361a><div class=\"image-caption\" data-v-44a8361a>The Holy Kaaba - The focal point of Islamic worship</div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: $setup.pdfs.basicsGuide,
    download: "",
    class: "download-btn"
  }, [...(_cache[5] || (_cache[5] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
  })], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Download Chapter 1: Basics (PDF)", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_9)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chapter II: Umrah Steps - TEXT LEFT, IMAGE RIGHT "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"content-grid\" data-v-44a8361a><div class=\"text-content\" data-v-44a8361a><span class=\"eyebrow\" data-v-44a8361a>Chapter II</span><h2 class=\"sec-title\" data-v-44a8361a>Performing Umrah: A Complete Guide</h2><p class=\"lead-text\" data-v-44a8361a>Umrah is a beautiful act of worship that purifies the soul and brings one closer to Allah. Follow these steps carefully to ensure your Umrah is performed correctly.</p><div class=\"step-card\" data-v-44a8361a><div class=\"step-number\" data-v-44a8361a>01</div><div class=\"step-content\" data-v-44a8361a><h3 data-v-44a8361a>Ihram - The Sacred State</h3><p data-v-44a8361a>Before crossing the Miqat (boundary), purify yourself with ghusl (ritual bath), trim your nails, and remove scented products. Men wear two white unstitched cloths; women wear modest clothing covering the body except face and hands.</p><p class=\"important-note\" data-v-44a8361a><strong data-v-44a8361a>Important:</strong> Make your Niyyah (intention) for Umrah and recite the Talbiyah: &quot;Labbayk Allahumma Umrah&quot; (Here I am, O Allah, for Umrah).</p></div></div><div class=\"step-card\" data-v-44a8361a><div class=\"step-number\" data-v-44a8361a>02</div><div class=\"step-content\" data-v-44a8361a><h3 data-v-44a8361a>Tawaf - Circumambulation</h3><p data-v-44a8361a>Upon entering Masjid al-Haram, proceed to the Kaaba and perform Tawaf - seven counter-clockwise circuits starting and ending at the Black Stone (Hajar al-Aswad). If possible, kiss or touch the Black Stone; otherwise, point to it and say &quot;Bismillah, Allahu Akbar.&quot;</p><p data-v-44a8361a>During the first three circuits, men should perform Ramal (brisk walking with short steps). Recite Quran, make dhikr, or supplicate as you circle the House of Allah.</p></div></div><div class=\"step-card\" data-v-44a8361a><div class=\"step-number\" data-v-44a8361a>03</div><div class=\"step-content\" data-v-44a8361a><h3 data-v-44a8361a>Sa&#39;i - Walking Between Safa and Marwa</h3><p data-v-44a8361a>After Tawaf, pray two rak&#39;at behind Maqam Ibrahim if possible. Then proceed to Safa and walk seven times between Safa and Marwa, commemorating Hajar&#39;s search for water for her son Ismail.</p><p data-v-44a8361a>Men should walk briskly between the green markers. Recite: &quot;Indeed, Safa and Marwa are among the symbols of Allah&quot; (Quran 2:158) when starting at each hill.</p></div></div><div class=\"step-card\" data-v-44a8361a><div class=\"step-number\" data-v-44a8361a>04</div><div class=\"step-content\" data-v-44a8361a><h3 data-v-44a8361a>Tahallul - Exiting Ihram</h3><p data-v-44a8361a>Complete your Umrah by cutting or shaving your hair. Men are recommended to shave their heads completely (Halq), though trimming at least an inch is permissible (Taqsir). Women should trim about a fingertip&#39;s length.</p><p data-v-44a8361a>Once completed, you exit the state of Ihram and all restrictions are lifted. Your Umrah is now complete - may Allah accept it!</p></div></div></div><div class=\"image-content\" data-v-44a8361a><img src=\"https://images.pexels.com/photos/1579426/pexels-photo-1579426.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=800\" alt=\"Pilgrims performing Tawaf around the Kaaba\" loading=\"lazy\" data-v-44a8361a><div class=\"image-caption\" data-v-44a8361a>Pilgrims performing Tawaf around the Kaaba</div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: $setup.pdfs.umrahGuide,
    download: "",
    class: "download-btn"
  }, [...(_cache[7] || (_cache[7] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
  })], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Download Umrah Step-by-Step Guide (PDF)", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_12)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chapter III: Hajj Days - TEXT LEFT, IMAGE RIGHT "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"content-grid\" data-v-44a8361a><div class=\"text-content\" data-v-44a8361a><span class=\"eyebrow\" data-v-44a8361a>Chapter III</span><h2 class=\"sec-title\" data-v-44a8361a>The Days of Hajj</h2><p class=\"lead-text\" data-v-44a8361a>Hajj is performed over specific days in Dhul Hijjah. Each day carries unique rituals and spiritual significance.</p><div class=\"day-card-detailed\" data-v-44a8361a><div class=\"day-header\" data-v-44a8361a><span class=\"day-number\" data-v-44a8361a>Day 1</span><span class=\"day-date\" data-v-44a8361a>8th Dhul Hijjah - Day of Tarwiyah</span></div><div class=\"day-body\" data-v-44a8361a><p data-v-44a8361a><strong data-v-44a8361a>Morning:</strong> Enter Ihram from your location (Makkah if performing Tamattu). Make intention for Hajj and recite Talbiyah.</p><p data-v-44a8361a><strong data-v-44a8361a>Afternoon:</strong> Travel to Mina (8km from Makkah). Spend the day and night in prayer, Quran recitation, and preparation for Arafat.</p><p data-v-44a8361a><strong data-v-44a8361a>Prayers:</strong> Pray Dhuhr, Asr, Maghrib, Isha, and Fajr in Mina. Shorten the four-rak&#39;at prayers to two rak&#39;at each (Qasr) but do not combine them.</p></div></div><div class=\"day-card-detailed\" data-v-44a8361a><div class=\"day-header\" data-v-44a8361a><span class=\"day-number\" data-v-44a8361a>Day 2</span><span class=\"day-date\" data-v-44a8361a>9th Dhul Hijjah - Day of Arafah</span></div><div class=\"day-body\" data-v-44a8361a><p data-v-44a8361a><strong data-v-44a8361a>After Fajr:</strong> Remain in Mina until sunrise, then proceed to Arafat.</p><p data-v-44a8361a><strong data-v-44a8361a>At Arafat:</strong> This is the most important day of Hajj. From after Dhuhr until sunset, stand in sincere supplication and remembrance of Allah. The Prophet (ﷺ) said: &quot;Hajj is Arafah.&quot;</p><p data-v-44a8361a><strong data-v-44a8361a>Dua:</strong> Raise your hands and make heartfelt dua. The best supplication is on the Day of Arafah. Recite: &quot;La ilaha illallah wahdahu la sharika lah...&quot;</p><p data-v-44a8361a><strong data-v-44a8361a>After Sunset:</strong> Depart calmly to Muzdalifah. Do not pray Maghrib yet.</p></div></div><div class=\"day-card-detailed\" data-v-44a8361a><div class=\"day-header\" data-v-44a8361a><span class=\"day-number\" data-v-44a8361a>Night</span><span class=\"day-date\" data-v-44a8361a>9th-10th Dhul Hijjah - Night at Muzdalifah</span></div><div class=\"day-body\" data-v-44a8361a><p data-v-44a8361a><strong data-v-44a8361a>At Muzdalifah:</strong> Pray Maghrib and Isha combined (Maghrib 3 rak&#39;at, Isha 2 rak&#39;at with one salam). Rest under the open sky.</p><p data-v-44a8361a><strong data-v-44a8361a>Collect Pebbles:</strong> Gather 49-70 small pebbles (about the size of a chickpea) for stoning the Jamarat. It&#39;s recommended to collect them at Muzdalifah.</p><p data-v-44a8361a><strong data-v-44a8361a>Fajr:</strong> Pray Fajr early and remain in supplication until it&#39;s very light (Isfar), then depart for Mina before sunrise.</p></div></div><div class=\"day-card-detailed\" data-v-44a8361a><div class=\"day-header\" data-v-44a8361a><span class=\"day-number\" data-v-44a8361a>Day 3</span><span class=\"day-date\" data-v-44a8361a>10th Dhul Hijjah - Eid al-Adha</span></div><div class=\"day-body\" data-v-44a8361a><p data-v-44a8361a><strong data-v-44a8361a>At Mina:</strong> Stone Jamarat al-Aqabah (the largest pillar) with seven pebbles, saying &quot;Allahu Akbar&quot; with each throw.</p><p data-v-44a8361a><strong data-v-44a8361a>Sacrifice:</strong> Perform or arrange the sacrifice (Qurbani/Hadi). This is obligatory for those performing Hajj Tamattu or Qiran.</p><p data-v-44a8361a><strong data-v-44a8361a>Shave/Trim:</strong> Shave or trim your hair (this is the first Tahallul - partial release from Ihram).</p><p data-v-44a8361a><strong data-v-44a8361a>Tawaf al-Ifadah:</strong> Go to Makkah and perform Tawaf al-Ifadah (also called Tawaf al-Ziyarah) - seven circuits around the Kaaba. This is a pillar of Hajj.</p><p data-v-44a8361a><strong data-v-44a8361a>Sa&#39;i:</strong> If you haven&#39;t done Sa&#39;i for Hajj yet, perform it now (seven walks between Safa and Marwa).</p><p data-v-44a8361a><strong data-v-44a8361a>Return to Mina:</strong> Go back to Mina to spend the night.</p></div></div><div class=\"day-card-detailed\" data-v-44a8361a><div class=\"day-header\" data-v-44a8361a><span class=\"day-number\" data-v-44a8361a>Days 4-5</span><span class=\"day-date\" data-v-44a8361a>11th-13th Dhul Hijjah - Days of Tashreeq</span></div><div class=\"day-body\" data-v-44a8361a><p data-v-44a8361a><strong data-v-44a8361a>Stoning:</strong> Each day after Dhuhr, stone all three Jamarat (small, medium, large) with seven pebbles each, starting with the smallest.</p><p data-v-44a8361a><strong data-v-44a8361a>Supplication:</strong> After stoning the small and medium pillars, face the Qibla and make dua. Do not make dua after the largest pillar.</p><p data-v-44a8361a><strong data-v-44a8361a>Departure:</strong> You may leave Mina on the 12th before sunset (Nafar Awwal) or stay until the 13th (Nafar Thani - more virtuous).</p></div></div><div class=\"day-card-detailed\" data-v-44a8361a><div class=\"day-header\" data-v-44a8361a><span class=\"day-number\" data-v-44a8361a>Final</span><span class=\"day-date\" data-v-44a8361a>Tawaf al-Wada - Farewell Tawaf</span></div><div class=\"day-body\" data-v-44a8361a><p data-v-44a8361a>Before leaving Makkah, perform Tawaf al-Wada (Farewell Tawaf) - seven circuits around the Kaaba. This is obligatory for those living outside the Miqat boundaries.</p><p data-v-44a8361a>After this, depart with the hope of returning and the promise of a Hajj Mabroor (accepted pilgrimage).</p></div></div></div><div class=\"image-content\" data-v-44a8361a><img src=\"https://images.pexels.com/photos/2347338/pexels-photo-2347338.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=800\" alt=\"Pilgrims at Mount Arafat\" loading=\"lazy\" data-v-44a8361a><div class=\"image-caption\" data-v-44a8361a>The plains of Arafat on the Day of Arafah</div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: $setup.pdfs.hajjGuide,
    download: "",
    class: "download-btn"
  }, [...(_cache[9] || (_cache[9] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
  })], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Download Complete Hajj Guide (PDF)", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_15)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chapter IV: Ihram Rules - TEXT LEFT, IMAGE RIGHT "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"content-grid\" data-v-44a8361a><div class=\"text-content\" data-v-44a8361a><span class=\"eyebrow\" data-v-44a8361a>Chapter IV</span><h2 class=\"sec-title\" data-v-44a8361a>Ihram: Rules &amp; Etiquette</h2><p class=\"lead-text\" data-v-44a8361a>When you enter the state of Ihram, certain acts become prohibited to maintain the sanctity of this sacred state.</p><div class=\"rules-section\" data-v-44a8361a><h3 data-v-44a8361a>Prohibited Acts in Ihram</h3><div class=\"rule-category\" data-v-44a8361a><h4 data-v-44a8361a>For Both Men and Women:</h4><ul data-v-44a8361a><li data-v-44a8361a>Cutting hair or nails (any part of the body)</li><li data-v-44a8361a>Using perfume or scented products (soap, shampoo, deodorant with fragrance)</li><li data-v-44a8361a>Hunting land animals or assisting in hunting</li><li data-v-44a8361a>Cutting or uprooting plants within the Haram boundaries</li><li data-v-44a8361a>Sexual relations, marriage contracts, or proposing marriage</li><li data-v-44a8361a>Wearing gloves (covering hands)</li><li data-v-44a8361a>Arguing, fighting, or using foul language</li></ul></div><div class=\"rule-category\" data-v-44a8361a><h4 data-v-44a8361a>Specifically for Men:</h4><ul data-v-44a8361a><li data-v-44a8361a>Wearing stitched clothing (shirts, pants, underwear, turbans)</li><li data-v-44a8361a>Covering the head with anything that touches it (caps, scarves, hoods)</li><li data-v-44a8361a>Wearing shoes that cover the ankles</li></ul></div><div class=\"rule-category\" data-v-44a8361a><h4 data-v-44a8361a>Specifically for Women:</h4><ul data-v-44a8361a><li data-v-44a8361a>Covering the face with niqab or burqa (may use umbrella or lower gaze)</li><li data-v-44a8361a>Wearing gloves</li></ul></div></div><div class=\"permitted-section\" data-v-44a8361a><h3 data-v-44a8361a>Permitted Acts in Ihram</h3><ul class=\"permitted-list\" data-v-44a8361a><li data-v-44a8361a>Showering or bathing with unscented soap</li><li data-v-44a8361a>Changing your Ihram garments</li><li data-v-44a8361a>Wearing a belt, money pouch, or watch</li><li data-v-44a8361a>Using an umbrella or seeking shade</li><li data-v-44a8361a>Wearing glasses or sunglasses</li><li data-v-44a8361a>Applying unscented medical ointments</li><li data-v-44a8361a>Killing harmful creatures (scorpions, snakes, rats, crows)</li><li data-v-44a8361a>Eating, drinking, and sleeping normally</li></ul></div><div class=\"fidya-section\" data-v-44a8361a><h3 data-v-44a8361a>Fidyah (Expiation) for Violations</h3><p data-v-44a8361a>If you unintentionally violate any prohibition, you must offer Fidyah:</p><ul data-v-44a8361a><li data-v-44a8361a><strong data-v-44a8361a>Minor violations:</strong> Feeding six poor people, or fasting three days, or sacrificing a sheep</li><li data-v-44a8361a><strong data-v-44a8361a>Shaving hair due to illness:</strong> Fasting three days, feeding six poor people, or sacrificing a sheep</li><li data-v-44a8361a><strong data-v-44a8361a>Sexual relations before first Tahallul:</strong> This invalidates Hajj and requires a major sacrifice (camel or cow), completing the Hajj, and repeating it the following year</li></ul></div></div><div class=\"image-content\" data-v-44a8361a><img src=\"https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=800\" alt=\"White Ihram clothing for Hajj\" loading=\"lazy\" data-v-44a8361a><div class=\"image-caption\" data-v-44a8361a>The simple white Ihram garments symbolizing equality before Allah</div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: $setup.pdfs.ihramRules,
    download: "",
    class: "download-btn"
  }, [...(_cache[11] || (_cache[11] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
  })], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Download Ihram Rules Reference (PDF)", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_18)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chapter V: Duas & Supplications - TEXT LEFT, IMAGE RIGHT "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"content-grid\" data-v-44a8361a><div class=\"text-content\" data-v-44a8361a><span class=\"eyebrow\" data-v-44a8361a>Chapter V</span><h2 class=\"sec-title\" data-v-44a8361a>Essential Duas for Hajj &amp; Umrah</h2><p class=\"lead-text\" data-v-44a8361a>Supplication is the essence of worship. Here are the most important duas to recite during your pilgrimage.</p><div class=\"dua-card\" data-v-44a8361a><div class=\"dua-header\" data-v-44a8361a><span class=\"dua-label\" data-v-44a8361a>Talbiyah</span><span class=\"dua-when\" data-v-44a8361a>Recited continuously in Ihram</span></div><div class=\"dua-arabic\" data-v-44a8361a>لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ</div><div class=\"dua-transliteration\" data-v-44a8361a>Labbayk Allahumma labbayk. Labbayka la sharika laka labbayk. Innal-hamda wan-ni&#39;mata laka wal-mulk, la sharika lak.</div><div class=\"dua-translation\" data-v-44a8361a>&quot;Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise and blessings are Yours, and all sovereignty, You have no partner.&quot;</div></div><div class=\"dua-card\" data-v-44a8361a><div class=\"dua-header\" data-v-44a8361a><span class=\"dua-label\" data-v-44a8361a>Starting Tawaf</span><span class=\"dua-when\" data-v-44a8361a>At the Black Stone</span></div><div class=\"dua-arabic\" data-v-44a8361a>بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ</div><div class=\"dua-transliteration\" data-v-44a8361a>Bismillah, Allahu Akbar</div><div class=\"dua-translation\" data-v-44a8361a>&quot;In the name of Allah, and Allah is the Greatest&quot;</div></div><div class=\"dua-card\" data-v-44a8361a><div class=\"dua-header\" data-v-44a8361a><span class=\"dua-label\" data-v-44a8361a>Between Rukn Yamani and Black Stone</span><span class=\"dua-when\" data-v-44a8361a>During Tawaf</span></div><div class=\"dua-arabic\" data-v-44a8361a>رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ</div><div class=\"dua-transliteration\" data-v-44a8361a>Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina &#39;adhaban-nar</div><div class=\"dua-translation\" data-v-44a8361a>&quot;Our Lord, give us in this world good and in the Hereafter good, and protect us from the punishment of the Fire&quot; (Quran 2:201)</div></div><div class=\"dua-card\" data-v-44a8361a><div class=\"dua-header\" data-v-44a8361a><span class=\"dua-label\" data-v-44a8361a>At Safa and Marwa</span><span class=\"dua-when\" data-v-44a8361a>Starting Sa&#39;i</span></div><div class=\"dua-arabic\" data-v-44a8361a>إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ ۖ فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَن يَطَّوَّفَ بِهِمَا</div><div class=\"dua-transliteration\" data-v-44a8361a>Innas-Safa wal-Marwata min sha&#39;a&#39;irillah. Faman hajjal-Bayta awi&#39;tamara fala junaha &#39;alayhi an yattawwafa bihima</div><div class=\"dua-translation\" data-v-44a8361a>&quot;Indeed, Safa and Marwa are among the symbols of Allah. So whoever makes Hajj to the House or performs Umrah - there is no blame upon him for walking between them&quot; (Quran 2:158)</div></div><div class=\"dua-card\" data-v-44a8361a><div class=\"dua-header\" data-v-44a8361a><span class=\"dua-label\" data-v-44a8361a>Day of Arafah</span><span class=\"dua-when\" data-v-44a8361a>Best supplication</span></div><div class=\"dua-arabic\" data-v-44a8361a>لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ</div><div class=\"dua-transliteration\" data-v-44a8361a>La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu, wa huwa &#39;ala kulli shay&#39;in qadir</div><div class=\"dua-translation\" data-v-44a8361a>&quot;There is no god but Allah alone, He has no partner, to Him belongs the dominion and to Him belongs all praise, and He is over all things omnipotent&quot;</div></div><div class=\"dua-card\" data-v-44a8361a><div class=\"dua-header\" data-v-44a8361a><span class=\"dua-label\" data-v-44a8361a>At Stoning Jamarat</span><span class=\"dua-when\" data-v-44a8361a>With each pebble</span></div><div class=\"dua-arabic\" data-v-44a8361a>اللَّهُ أَكْبَرُ</div><div class=\"dua-transliteration\" data-v-44a8361a>Allahu Akbar</div><div class=\"dua-translation\" data-v-44a8361a>&quot;Allah is the Greatest&quot;</div></div></div><div class=\"image-content\" data-v-44a8361a><img src=\"https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=800\" alt=\"Quran and prayer beads\" loading=\"lazy\" data-v-44a8361a><div class=\"image-caption\" data-v-44a8361a>The Quran - Your guide and companion during Hajj</div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: $setup.pdfs.duasCollection,
    download: "",
    class: "download-btn"
  }, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
  })], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Download Complete Duas Booklet (PDF)", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_21)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chapter VI: Practical Tips - TEXT LEFT, IMAGE RIGHT "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"content-grid\" data-v-44a8361a><div class=\"text-content\" data-v-44a8361a><span class=\"eyebrow\" data-v-44a8361a>Chapter VI</span><h2 class=\"sec-title\" data-v-44a8361a>Practical Tips for a Smooth Pilgrimage</h2><p class=\"lead-text\" data-v-44a8361a>Prepare yourself physically, mentally, and spiritually for the journey ahead.</p><div class=\"tip-category\" data-v-44a8361a><h3 data-v-44a8361a>Before You Travel</h3><ul data-v-44a8361a><li data-v-44a8361a><strong data-v-44a8361a>Health Check:</strong> Visit your doctor for a check-up and required vaccinations (Meningitis ACWY is mandatory)</li><li data-v-44a8361a><strong data-v-44a8361a>Physical Fitness:</strong> Start walking 5-10km daily to build stamina for the long walks</li><li data-v-44a8361a><strong data-v-44a8361a>Learn the Rites:</strong> Study the rituals thoroughly before departure</li><li data-v-44a8361a><strong data-v-44a8361a>Travel Insurance:</strong> Ensure you have comprehensive coverage</li><li data-v-44a8361a><strong data-v-44a8361a>Documents:</strong> Keep copies of passport, visa, tickets, and hotel bookings</li><li data-v-44a8361a><strong data-v-44a8361a>Money:</strong> Carry Saudi Riyals in small denominations</li></ul></div><div class=\"tip-category\" data-v-44a8361a><h3 data-v-44a8361a>Packing Essentials</h3><ul data-v-44a8361a><li data-v-44a8361a><strong data-v-44a8361a>Ihram:</strong> Two white unstitched cloths (men), modest clothing (women)</li><li data-v-44a8361a><strong data-v-44a8361a>Footwear:</strong> Comfortable sandals that expose the ankle bone</li><li data-v-44a8361a><strong data-v-44a8361a>Hygiene:</strong> Unscented soap, shampoo, toothpaste, and miswak</li><li data-v-44a8361a><strong data-v-44a8361a>Medications:</strong> Personal prescriptions, pain relievers, band-aids, blister pads</li><li data-v-44a8361a><strong data-v-44a8361a>Comfort:</strong> Umbrella (highly recommended for shade), water bottle, small backpack</li><li data-v-44a8361a><strong data-v-44a8361a>Electronics:</strong> Phone charger, power bank, universal adapter</li><li data-v-44a8361a><strong data-v-44a8361a>Important:</strong> Small Quran, dua book, prayer rug (optional)</li></ul></div><div class=\"tip-category\" data-v-44a8361a><h3 data-v-44a8361a>During Hajj/Umrah</h3><ul data-v-44a8361a><li data-v-44a8361a><strong data-v-44a8361a>Hydration:</strong> Drink Zamzam water and stay hydrated, especially in heat</li><li data-v-44a8361a><strong data-v-44a8361a>Pace Yourself:</strong> Don&#39;t rush; the rituals can be performed calmly</li><li data-v-44a8361a><strong data-v-44a8361a>Group Safety:</strong> Stay with your group and have a meeting point</li><li data-v-44a8361a><strong data-v-44a8361a>Patience:</strong> Expect crowds and delays; maintain good character</li><li data-v-44a8361a><strong data-v-44a8361a>Focus:</strong> Remember your intention - this is worship, not tourism</li><li data-v-44a8361a><strong data-v-44a8361a>Rest:</strong> Sleep when possible; the schedule is demanding</li><li data-v-44a8361a><strong data-v-44a8361a>Food:</strong> Eat light, nutritious meals; avoid heavy foods</li></ul></div><div class=\"tip-category\" data-v-44a8361a><h3 data-v-44a8361a>Important Reminders</h3><ul data-v-44a8361a><li data-v-44a8361a><strong data-v-44a8361a>Women&#39;s Health:</strong> If menstruation begins, continue all rites except Tawaf and Sa&#39;i</li><li data-v-44a8361a><strong data-v-44a8361a>Lost Items:</strong> Report immediately to authorities; keep valuables secure</li><li data-v-44a8361a><strong data-v-44a8361a>Emergency:</strong> Save emergency numbers: 997 (Hajj hotline), 999 (police), 997 (ambulance)</li><li data-v-44a8361a><strong data-v-44a8361a>Respect:</strong> Be mindful of other pilgrims; help the elderly and weak</li><li data-v-44a8361a><strong data-v-44a8361a>Photography:</strong> Avoid taking photos of others without permission, especially during prayer</li></ul></div></div><div class=\"image-content\" data-v-44a8361a><img src=\"https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=800\" alt=\"Travel preparation and packing\" loading=\"lazy\" data-v-44a8361a><div class=\"image-caption\" data-v-44a8361a>Proper preparation ensures a focused and peaceful pilgrimage</div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: $setup.pdfs.packingChecklist,
    download: "",
    class: "download-btn"
  }, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
  })], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Download Packing Checklist (PDF)", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_24)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Closing "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "closing-arabic"
  }, "رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ", -1 /* CACHED */)), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "closing-en"
  }, "\"Our Lord, accept [this] from us. Indeed, You are the Hearing, the Knowing.\"", -1 /* CACHED */)), _cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "closing-ref"
  }, "Surah Al-Baqarah 2:127", -1 /* CACHED */)), _cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "closing-msg"
  }, "May Allah accept your pilgrimage, forgive your sins, and grant you a Hajj Mabroor (accepted pilgrimage). Ameen.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: $setup.pdfs.completeGuide,
    download: "",
    class: "download-all"
  }, [...(_cache[17] || (_cache[17] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    width: "20",
    height: "20",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
  })], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Download Complete Hajj & Umrah Guide (Full PDF)", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_27)])])])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/HajjComponent.vue":
/*!****************************************************!*\
  !*** ./resources/components/vue/HajjComponent.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HajjComponent_vue_vue_type_template_id_44a8361a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true */ "./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true");
/* harmony import */ var _HajjComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HajjComponent.vue?vue&type=script&setup=true&lang=js */ "./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _HajjComponent_vue_vue_type_style_index_0_id_44a8361a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css */ "./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_HajjComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_HajjComponent_vue_vue_type_template_id_44a8361a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-44a8361a"],['__file',"resources/components/vue/HajjComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js":
/*!***************************************************************************************!*\
  !*** ./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HajjComponent.vue?vue&type=script&setup=true&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_style_index_0_id_44a8361a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_template_id_44a8361a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_template_id_44a8361a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true");


/***/ })

}]);