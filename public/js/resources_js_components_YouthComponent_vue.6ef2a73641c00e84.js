"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_YouthComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/YouthComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/YouthComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'YouthZoneGuide',
  data() {
    return {
      isScrolled: false,
      searchOpen: false,
      searchQuery: '',
      activeTab: 'articles',
      activeGlossary: null,
      activeFaq: null,
      currentHadithIndex: 0,
      heroStats: [{
        val: '5',
        label: 'Verified Sources'
      }, {
        val: '50+',
        label: 'Curated Articles'
      }, {
        val: '100%',
        label: 'Scholar Backed'
      }],
      contentTabs: [{
        id: 'articles',
        label: 'Articles',
        icon: '📄'
      }, {
        id: 'videos',
        label: 'Short Clips',
        icon: '🎬'
      }, {
        id: 'audio',
        label: 'Audio',
        icon: '🎙'
      }],
      hadiths: [{
        text: '"Whoever follows a path in pursuit of knowledge, Allah makes easy for him a path to Paradise."',
        cite: 'Sahih Muslim'
      }, {
        text: '"The best of you are those who learn the Quran and teach it."',
        cite: 'Sahih al-Bukhari'
      }, {
        text: '"Make things easy and do not make them difficult."',
        cite: 'Bukhari & Muslim'
      }, {
        text: '"Speak good or remain silent."',
        cite: 'Sahih al-Bukhari'
      }],
      prayerTimes: [{
        name: 'Fajr',
        time: '04:12',
        current: false
      }, {
        name: 'Dhuhr',
        time: '13:05',
        current: true
      }, {
        name: 'Asr',
        time: '16:47',
        current: false
      }, {
        name: 'Maghrib',
        time: '20:18',
        current: false
      }, {
        name: 'Isha',
        time: '21:52',
        current: false
      }],
      recommendedApps: ['Quran.com', 'Athan Pro', 'Dhikr & Dua', 'Yaqeen Institute', 'SeekersGuidance', 'AlMaghrib Gateway'],
      dosItems: ['Maintain daily Salah even when busy', 'Seek knowledge from credible scholars', 'Honour parents and elders', 'Engage in halal entertainment', 'Make dhikr a daily habit'],
      dontsItems: ['Avoid unnecessary free-mixing', 'Never delay Salah intentionally', 'Refrain from backbiting (Gheebah)', 'Avoid music with foul content', 'Dont neglect family ties (Silat al-Rahim)'],
      glossaryTerms: [{
        term: 'Tawheed',
        arabic: 'توحيد',
        definition: 'The Oneness and Uniqueness of Allah in His Lordship, Names, and Worship.',
        extended: 'Tawheed is the central concept of Islam. It encompasses Rububiyyah (Lordship), Uluhiyyah (Worship), and al-Asma wa al-Sifat (Names and Attributes). Upholding Tawheed is the first and most important obligation on every Muslim.',
        source: 'IslamQA'
      }, {
        term: 'Sunnah',
        arabic: 'سنة',
        definition: 'The teachings, actions, and approvals of Prophet Muhammad ﷺ.',
        extended: 'The Sunnah is the second primary source of Islamic law after the Quran. It includes the Prophet\'s words (Hadith), his actions, and what he permitted or disapproved of in others.',
        source: 'IslamWeb'
      }, {
        term: 'Fiqh',
        arabic: 'فقه',
        definition: 'Islamic jurisprudence; the science of understanding divine law.',
        extended: 'Fiqh is derived from the Quran and Sunnah through the methodology of Usul al-Fiqh. The four major schools (Madhabs) — Hanafi, Maliki, Shafi\'i, and Hanbali — represent scholarly traditions within Sunni Islam.',
        source: 'SeekersGuidance'
      }, {
        term: 'Ihsan',
        arabic: 'إحسان',
        definition: 'Worshipping Allah as if you see Him; the station of spiritual excellence.',
        extended: 'Ihsan is the highest of the three levels of the religion (Islam, Iman, Ihsan). It is defined in a famous hadith of Jibril as "worshipping Allah as though you see Him, and if you cannot see Him, know that He sees you."',
        source: 'Yaqeen Institute'
      }, {
        term: 'Bid\'ah',
        arabic: 'بدعة',
        definition: 'Innovation in religious matters that has no basis in the Quran or Sunnah.',
        extended: 'Scholars distinguish between religious bid\'ah (prohibited) and worldly innovations (permissible). Religious bid\'ah refers to inventing acts of worship that the Prophet ﷺ did not legislate.',
        source: 'IslamQA'
      }, {
        term: 'Zuhd',
        arabic: 'زهد',
        definition: 'Asceticism or detachment from worldly desires for the sake of the hereafter.',
        extended: 'Zuhd does not mean abandoning the world entirely, but rather not allowing it to dominate the heart. Ibn al-Qayyim described the zahid as one who possesses the world without the world possessing him.',
        source: 'AlMaghrib'
      }, {
        term: 'Tawakkul',
        arabic: 'توكل',
        definition: 'Complete reliance and trust in Allah after taking necessary means.',
        extended: 'Tawakkul is often misunderstood. True tawakkul requires taking the appropriate worldly means first (tying the camel) and then placing one\'s trust in Allah for the outcome.',
        source: 'SeekersGuidance'
      }, {
        term: 'Istighfar',
        arabic: 'استغفار',
        definition: 'Seeking forgiveness from Allah through repentance and supplication.',
        extended: 'The Prophet ﷺ was reported to seek forgiveness more than seventy times a day. Istighfar is not only for major sins — it is a continuous act of turning the heart back to Allah and recognising one\'s need for His mercy.',
        source: 'IslamWeb'
      }],
      curatedArticles: [{
        id: 1,
        title: 'Balancing Deen & Dunya in the West',
        excerpt: 'Practical, scholar-backed strategies to maintain your faith while navigating modern Western society — from university to the workplace.',
        category: 'Lifestyle',
        readTime: '4 min',
        reference: 'IslamWeb 22345',
        image: 'https://images.pexels.com/photos/7249318/pexels-photo-7249318.jpeg?auto=compress&cs=tinysrgb&w=600'
      }, {
        id: 2,
        title: 'A Complete Guide to Wudu',
        excerpt: 'A concise, illustrated guide to purification for prayer, covering obligations, sunnahs, and the most common mistakes made by youth.',
        category: 'Fiqh',
        readTime: '3 min',
        reference: 'IslamQA 12834',
        image: 'https://images.pexels.com/photos/5996832/pexels-photo-5996832.jpeg?auto=compress&cs=tinysrgb&w=600'
      }, {
        id: 3,
        title: 'Navigating Gender Interactions',
        excerpt: 'Scholarly guidance on maintaining Islamic modesty while functioning confidently in co-ed professional and academic environments.',
        category: 'Ethics',
        readTime: '5 min',
        reference: 'SeekersGuidance',
        image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600'
      }, {
        id: 4,
        title: 'Understanding Your Identity as a Western Muslim',
        excerpt: 'How to embrace both your Muslim identity and Western upbringing without compromise — a reflection from Yaqeen Institute researchers.',
        category: 'Identity',
        readTime: '6 min',
        reference: 'Yaqeen Institute',
        image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600'
      }, {
        id: 5,
        title: 'The Fiqh of Social Media',
        excerpt: 'What does Islam say about content creation, following celebrities, and managing screen time? A modern fiqh breakdown.',
        category: 'Digital Life',
        readTime: '5 min',
        reference: 'AlMaghrib Institute',
        image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600'
      }, {
        id: 6,
        title: 'Making Du\'a That is Accepted',
        excerpt: 'Conditions, manners, and best times for supplication — a comprehensive guide sourced from Quran, Sunnah, and scholarly commentary.',
        category: 'Ibadah',
        readTime: '4 min',
        reference: 'IslamWeb 30120',
        image: 'https://images.pexels.com/photos/1022922/pexels-photo-1022922.jpeg?auto=compress&cs=tinysrgb&w=600'
      }],
      videoClips: [{
        id: 1,
        title: 'The Purpose of Life',
        speaker: 'Sh. Omar Suleiman',
        embedUrl: 'https://www.youtube.com/embed/7d16CpWp-ok',
        source: 'Yaqeen Institute',
        likes: '1.2k'
      }, {
        id: 2,
        title: 'How to Focus in Salah',
        speaker: 'Sh. Yahya Ibrahim',
        embedUrl: 'https://www.youtube.com/embed/3bEJ6mZz7jE',
        source: 'AlMaghrib Institute',
        likes: '980'
      }],
      audioClips: [{
        id: 1,
        title: 'Reflections on Surah Al-Asr',
        scholar: 'Mufti Menk',
        duration: '12:34',
        ref: 'IslamWeb Audio',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
      }, {
        id: 2,
        title: 'The Virtues of Dhikr',
        scholar: 'Sh. Ahmad Deedat',
        duration: '08:22',
        ref: 'SeekersGuidance',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
      }, {
        id: 3,
        title: 'Youth & Identity in the Modern World',
        scholar: 'Sh. Omar Suleiman',
        duration: '15:08',
        ref: 'Yaqeen Institute',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
      }],
      faqs: [{
        question: 'Is it permissible to celebrate birthdays?',
        answer: 'Scholars differ on this. The majority view holds that celebrating birthdays with religious intention constitutes bid\'ah (innovation). A cultural gathering without religious elements is a matter of scholarly debate. For youth seeking caution, focusing on Islamic occasions is recommended.',
        source: 'IslamQA 1027'
      }, {
        question: 'Can I listen to music?',
        answer: 'The majority of classical scholars hold that musical instruments are impermissible except the duff in specific circumstances. As an alternative, nasheeds without instruments or beneficial podcasts and Quran recitation are widely recommended for Western Muslim youth.',
        source: 'IslamWeb 827'
      }, {
        question: 'How do I deal with peer pressure around dating?',
        answer: 'Islam prohibits unmarried romantic relationships due to the risk of falling into zina. Scholars advise maintaining firm, respectful boundaries and, when ready for marriage, pursuing it through family involvement and proper channels such as supervised settings.',
        source: 'SeekersGuidance'
      }, {
        question: 'Is it okay to have non-Muslim friends?',
        answer: 'Yes. Islam permits friendships with non-Muslims based on justice and common humanity. The prohibition is regarding close allegiances that could compromise your deen or lead to haram. Being a good neighbour and colleague is an act of da\'wah.',
        source: 'IslamWeb'
      }, {
        question: 'How do I stay motivated after Ramadan?',
        answer: 'Scholars advise treating Ramadan as a launchpad, not a finish line. Maintain at least one consistent act of worship — such as six fasts of Shawwal, night prayers on Friday, or consistent Quran recitation — to anchor your spiritual momentum.',
        source: 'AlMaghrib Institute'
      }, {
        question: 'What does Islam say about mental health?',
        answer: 'Islam recognises both spiritual and psychological dimensions of wellbeing. Seeking professional help is not a sign of weak faith — it is a form of taking means (tawakkul). Many scholars actively encourage therapy alongside spiritual practices.',
        source: 'Yaqeen Institute'
      }]
    };
  },
  computed: {
    currentHadith() {
      return this.hadiths[this.currentHadithIndex];
    },
    filteredGlossary() {
      if (!this.searchQuery) return this.glossaryTerms;
      const q = this.searchQuery.toLowerCase();
      return this.glossaryTerms.filter(t => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q));
    },
    filteredArticles() {
      if (!this.searchQuery) return this.curatedArticles;
      const q = this.searchQuery.toLowerCase();
      return this.curatedArticles.filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
    },
    filteredVideos() {
      if (!this.searchQuery) return this.videoClips;
      const q = this.searchQuery.toLowerCase();
      return this.videoClips.filter(v => v.title.toLowerCase().includes(q) || v.speaker.toLowerCase().includes(q));
    },
    filteredAudio() {
      if (!this.searchQuery) return this.audioClips;
      const q = this.searchQuery.toLowerCase();
      return this.audioClips.filter(a => a.title.toLowerCase().includes(q) || a.scholar.toLowerCase().includes(q));
    },
    filteredFaqs() {
      if (!this.searchQuery) return this.faqs;
      const q = this.searchQuery.toLowerCase();
      return this.faqs.filter(f => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
    },
    totalSearchResults() {
      return this.filteredGlossary.length + this.filteredArticles.length + this.filteredVideos.length + this.filteredAudio.length + this.filteredFaqs.length;
    }
  },
  methods: {
    scrollTo(id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 60;
    },
    nextHadith() {
      this.currentHadithIndex = (this.currentHadithIndex + 1) % this.hadiths.length;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/YouthComponent.vue?vue&type=template&id=2fc18995&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/YouthComponent.vue?vue&type=template&id=2fc18995&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "nav-inner"
};
const _hoisted_2 = {
  class: "nav-links"
};
const _hoisted_3 = {
  class: "nav-search"
};
const _hoisted_4 = {
  key: 0,
  width: "18",
  height: "18",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
const _hoisted_5 = {
  key: 1,
  width: "18",
  height: "18",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
const _hoisted_6 = {
  key: 0,
  class: "nav-search-bar"
};
const _hoisted_7 = {
  key: 0,
  class: "search-count"
};
const _hoisted_8 = {
  class: "hero",
  id: "hero"
};
const _hoisted_9 = {
  class: "hero-content"
};
const _hoisted_10 = {
  class: "hero-actions"
};
const _hoisted_11 = {
  class: "hero-stats"
};
const _hoisted_12 = {
  class: "stat-val"
};
const _hoisted_13 = {
  class: "stat-label"
};
const _hoisted_14 = {
  class: "section glossary-section",
  id: "glossary"
};
const _hoisted_15 = {
  class: "container"
};
const _hoisted_16 = {
  class: "glossary-grid"
};
const _hoisted_17 = ["onClick"];
const _hoisted_18 = {
  class: "gc-arabic"
};
const _hoisted_19 = {
  class: "gc-term"
};
const _hoisted_20 = {
  class: "gc-def"
};
const _hoisted_21 = {
  class: "gc-footer"
};
const _hoisted_22 = {
  class: "gc-source"
};
const _hoisted_23 = {
  key: 0,
  class: "gc-expand"
};
const _hoisted_24 = {
  class: "section content-hub",
  id: "hub"
};
const _hoisted_25 = {
  class: "container"
};
const _hoisted_26 = {
  class: "tab-switcher"
};
const _hoisted_27 = ["onClick"];
const _hoisted_28 = {
  class: "tab-icon"
};
const _hoisted_29 = {
  key: "articles",
  class: "articles-grid"
};
const _hoisted_30 = {
  class: "ac-image"
};
const _hoisted_31 = ["src", "alt"];
const _hoisted_32 = {
  class: "ac-overlay"
};
const _hoisted_33 = {
  class: "ac-category"
};
const _hoisted_34 = {
  class: "ac-body"
};
const _hoisted_35 = {
  class: "ac-meta"
};
const _hoisted_36 = {
  class: "ac-time"
};
const _hoisted_37 = {
  class: "ac-ref"
};
const _hoisted_38 = {
  class: "ac-title"
};
const _hoisted_39 = {
  class: "ac-excerpt"
};
const _hoisted_40 = {
  key: "videos",
  class: "videos-grid"
};
const _hoisted_41 = {
  class: "vc-embed"
};
const _hoisted_42 = ["src", "title"];
const _hoisted_43 = {
  class: "vc-body"
};
const _hoisted_44 = {
  class: "vc-title"
};
const _hoisted_45 = {
  class: "vc-meta"
};
const _hoisted_46 = {
  class: "vc-speaker"
};
const _hoisted_47 = {
  class: "vc-source"
};
const _hoisted_48 = {
  class: "vc-footer"
};
const _hoisted_49 = {
  class: "vc-likes"
};
const _hoisted_50 = {
  key: "audio",
  class: "audio-list"
};
const _hoisted_51 = {
  class: "ai-num"
};
const _hoisted_52 = {
  class: "ai-info"
};
const _hoisted_53 = {
  class: "ai-title"
};
const _hoisted_54 = {
  class: "ai-meta"
};
const _hoisted_55 = {
  controls: "",
  class: "ai-player"
};
const _hoisted_56 = ["src"];
const _hoisted_57 = {
  class: "section tools-section",
  id: "tools"
};
const _hoisted_58 = {
  class: "container"
};
const _hoisted_59 = {
  class: "tools-grid"
};
const _hoisted_60 = {
  class: "panel dos-panel"
};
const _hoisted_61 = {
  class: "dd-grid"
};
const _hoisted_62 = {
  class: "dd-col dos"
};
const _hoisted_63 = {
  class: "dd-col donts"
};
const _hoisted_64 = {
  class: "panel tools-panel"
};
const _hoisted_65 = {
  class: "tool-block reminder-block"
};
const _hoisted_66 = {
  class: "tool-block prayer-block"
};
const _hoisted_67 = {
  class: "prayer-times"
};
const _hoisted_68 = {
  class: "pt-name"
};
const _hoisted_69 = {
  class: "pt-time"
};
const _hoisted_70 = {
  key: 0,
  class: "pt-dot"
};
const _hoisted_71 = {
  class: "tool-block apps-block"
};
const _hoisted_72 = {
  class: "app-tags"
};
const _hoisted_73 = {
  class: "section faq-section",
  id: "faq"
};
const _hoisted_74 = {
  class: "container"
};
const _hoisted_75 = {
  class: "faq-list"
};
const _hoisted_76 = ["onClick"];
const _hoisted_77 = {
  class: "faq-q"
};
const _hoisted_78 = {
  class: "faq-num"
};
const _hoisted_79 = {
  class: "faq-text"
};
const _hoisted_80 = {
  class: "faq-toggle"
};
const _hoisted_81 = {
  key: 0,
  class: "faq-a"
};
const _hoisted_82 = {
  class: "site-footer"
};
const _hoisted_83 = {
  class: "container footer-inner"
};
const _hoisted_84 = {
  class: "footer-note"
};
const _hoisted_85 = {
  class: "footer-copy"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["youth-zone", {
      'search-active': $data.searchQuery.length > 0
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ░░ AMBIENT BACKGROUND GEOMETRY ░░ "), _cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"ambient-bg\" aria-hidden=\"true\" data-v-2fc18995><svg class=\"geo-pattern\" viewBox=\"0 0 800 800\" preserveAspectRatio=\"xMidYMid slice\" data-v-2fc18995><defs data-v-2fc18995><pattern id=\"stars\" x=\"0\" y=\"0\" width=\"60\" height=\"60\" patternUnits=\"userSpaceOnUse\" data-v-2fc18995><polygon points=\"30,2 36.5,20 56,20 41,31 47,49 30,38 13,49 19,31 4,20 23.5,20\" fill=\"none\" stroke=\"rgba(182,139,64,0.08)\" stroke-width=\"1\" data-v-2fc18995></polygon></pattern><radialGradient id=\"meshGrad\" cx=\"30%\" cy=\"20%\" data-v-2fc18995><stop offset=\"0%\" stop-color=\"#1a4a2e\" stop-opacity=\"0.95\" data-v-2fc18995></stop><stop offset=\"60%\" stop-color=\"#0d2318\" stop-opacity=\"1\" data-v-2fc18995></stop><stop offset=\"100%\" stop-color=\"#060f0b\" stop-opacity=\"1\" data-v-2fc18995></stop></radialGradient></defs><rect width=\"100%\" height=\"100%\" fill=\"url(#meshGrad)\" data-v-2fc18995></rect><rect width=\"100%\" height=\"100%\" fill=\"url(#stars)\" data-v-2fc18995></rect></svg></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ░░ DISCLAIMER STRIP ░░ "), _cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "disclaimer-strip"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "inner"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "disc-icon"
  }, "⟡"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "All content is sourced from five verified Islamic scholarly authorities — IslamQA · IslamWeb · SeekersGuidance · Yaqeen Institute · AlMaghrib Institute. For educational purposes only.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ░░ NAVIGATION ░░ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["site-nav", {
      scrolled: $data.isScrolled
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "brand"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "brand-arabic"
  }, "منطقة الشباب"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "brand-en"
  }, "Youth Zone")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#glossary",
    onClick: _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.scrollTo('glossary'), ["prevent"]))
  }, "Glossary")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#hub",
    onClick: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.scrollTo('hub'), ["prevent"]))
  }, "Learn")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#tools",
    onClick: _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.scrollTo('tools'), ["prevent"]))
  }, "Tools")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#faq",
    onClick: _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.scrollTo('faq'), ["prevent"]))
  }, "FAQ")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "search-toggle",
    onClick: _cache[4] || (_cache[4] = $event => $data.searchOpen = !$data.searchOpen),
    "aria-label": "Toggle search"
  }, [!$data.searchOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("svg", _hoisted_4, [...(_cache[11] || (_cache[11] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "m21 21-4.35-4.35"
  }, null, -1 /* CACHED */)]))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("svg", _hoisted_5, [...(_cache[12] || (_cache[12] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M18 6 6 18M6 6l12 12"
  }, null, -1 /* CACHED */)]))]))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "search-drop"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.searchOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      ref: "searchInput",
      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.searchQuery = $event),
      type: "text",
      placeholder: "Search topics, terms, or questions…",
      onKeydown: _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)($event => {
        $data.searchOpen = false;
        $data.searchQuery = '';
      }, ["escape"]))
    }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchQuery]]), $data.searchQuery ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.totalSearchResults) + " results", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  })], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ░░ HERO ░░ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<p class=\"hero-kicker\" data-v-2fc18995>بسم الله الرحمن الرحيم</p><h1 class=\"hero-title\" data-v-2fc18995><span class=\"line\" data-v-2fc18995>Curated Knowledge</span><span class=\"line accent\" data-v-2fc18995>for the Western</span><span class=\"line\" data-v-2fc18995>Muslim Soul</span></h1><p class=\"hero-sub\" data-v-2fc18995>Bite-sized · Scholarly verified · Made for you</p>", 3)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn-primary",
    onClick: _cache[7] || (_cache[7] = $event => $options.scrollTo('hub'))
  }, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Start Learning", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    width: "16",
    height: "16",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    viewBox: "0 0 24 24"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "m9 18 6-6-6-6"
  })], -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn-ghost",
    onClick: _cache[8] || (_cache[8] = $event => $options.scrollTo('glossary'))
  }, "Explore Glossary")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.heroStats, s => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "stat",
      key: s.label
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.val), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.label), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])]), _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"hero-visual\" aria-hidden=\"true\" data-v-2fc18995><div class=\"medallion\" data-v-2fc18995><svg viewBox=\"0 0 300 300\" data-v-2fc18995><defs data-v-2fc18995><radialGradient id=\"medGrad\" cx=\"50%\" cy=\"50%\" data-v-2fc18995><stop offset=\"0%\" stop-color=\"#b68b40\" data-v-2fc18995></stop><stop offset=\"100%\" stop-color=\"#7a5c20\" data-v-2fc18995></stop></radialGradient></defs><circle cx=\"150\" cy=\"150\" r=\"148\" fill=\"none\" stroke=\"url(#medGrad)\" stroke-width=\"1\" opacity=\"0.4\" data-v-2fc18995></circle><circle cx=\"150\" cy=\"150\" r=\"120\" fill=\"none\" stroke=\"url(#medGrad)\" stroke-width=\"0.5\" opacity=\"0.3\" data-v-2fc18995></circle><!-- 8-point star --><path d=\"M150,40 L162,108 L220,60 L172,118 L240,130 L172,142 L220,200 L162,152 L150,220 L138,152 L80,200 L128,142 L60,130 L128,118 L80,60 L138,108 Z\" fill=\"none\" stroke=\"url(#medGrad)\" stroke-width=\"1\" opacity=\"0.5\" data-v-2fc18995></path><text x=\"150\" y=\"158\" text-anchor=\"middle\" font-family=\"&#39;Amiri&#39;, serif\" font-size=\"36\" fill=\"#b68b40\" opacity=\"0.8\" data-v-2fc18995>الله</text></svg></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "scroll-hint",
    onClick: _cache[9] || (_cache[9] = $event => $options.scrollTo('glossary'))
  }, [...(_cache[16] || (_cache[16] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Scroll", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "scroll-line"
  }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ░░ GLOSSARY ░░ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_14, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-label"
  }, "01 / Essential Terms", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-head"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "section-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Integrated "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "Glossary")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-desc"
  }, "Foundational vocabulary of Islam, sourced from verified scholars and explained for a modern context.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredGlossary, (term, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["glossary-card", {
        expanded: $data.activeGlossary === term.term
      }]),
      key: term.term,
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        '--delay': i * 80 + 'ms'
      }),
      onClick: $event => $data.activeGlossary = $data.activeGlossary === term.term ? null : term.term
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(term.arabic), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(term.term), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(term.definition), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(term.source), 1 /* TEXT */), _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "gc-verified"
    }, "✓ Verified", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "expand"
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.activeGlossary === term.term ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(term.extended), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
      _: 2 /* DYNAMIC */
    }, 1024 /* DYNAMIC_SLOTS */)], 14 /* CLASS, STYLE, PROPS */, _hoisted_17);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ░░ CONTENT HUB ░░ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_24, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-label"
  }, "02 / Curated Content", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-head"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "section-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Learn at Your "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "Own Pace")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-desc"
  }, "Articles, short video clips, and audio reflections crafted for the modern Western Muslim.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Tab Switcher "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.contentTabs, tab => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: tab.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["tab-btn", {
        active: $data.activeTab === tab.id
      }]),
      onClick: $event => $data.activeTab = tab.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tab.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tab.label), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_27);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Articles "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "tab-fade",
    mode: "out-in"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.activeTab === 'articles' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_29, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredArticles, (a, i) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["article-card", {
          featured: i === 0
        }]),
        key: a.id,
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
          '--delay': i * 100 + 'ms'
        })
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
        src: a.image,
        alt: a.title,
        loading: "lazy"
      }, null, 8 /* PROPS */, _hoisted_31), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_33, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(a.category), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(a.readTime), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(a.reference), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(a.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(a.excerpt), 1 /* TEXT */), _cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "ac-read"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Read Article "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
        width: "14",
        height: "14",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2",
        viewBox: "0 0 24 24"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
        d: "m9 18 6-6-6-6"
      })])], -1 /* CACHED */))])], 6 /* CLASS, STYLE */);
    }), 128 /* KEYED_FRAGMENT */))])) : $data.activeTab === 'videos' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_40, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredVideos, v => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        class: "video-card",
        key: v.id
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
        src: v.embedUrl,
        title: v.title,
        frameborder: "0",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowfullscreen: ""
      }, null, 8 /* PROPS */, _hoisted_42)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_44, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(v.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_46, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(v.speaker), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(v.source), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "tag-verified"
      }, "✓ Scholar Verified", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_49, "♡ " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(v.likes), 1 /* TEXT */)])])]);
    }), 128 /* KEYED_FRAGMENT */))])) : $data.activeTab === 'audio' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_50, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredAudio, (a, i) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        class: "audio-item",
        key: a.id,
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
          '--delay': i * 80 + 'ms'
        })
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(String(i + 1).padStart(2, '0')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_53, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(a.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(a.scholar), 1 /* TEXT */), _cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "ai-dot"
      }, "·", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(a.duration), 1 /* TEXT */), _cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "ai-dot"
      }, "·", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(a.ref), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("audio", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("source", {
        src: a.src,
        type: "audio/mpeg"
      }, null, 8 /* PROPS */, _hoisted_56)])]), _cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "ai-icon"
      }, "🎙", -1 /* CACHED */))], 4 /* STYLE */);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  })])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ░░ DOS & DON'TS + TOOLS ░░ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_57, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-label"
  }, "03 / Guidance & Tools", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-head"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "section-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Daily "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "Compass")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-desc"
  }, "Practical guidance and tools to anchor your day in deen.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Dos & Donts "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_60, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "panel-title"
  }, "Do's & Don'ts for Youth", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dd-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "dd-icon"
  }, "✅"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Do's")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.dosItems, d => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: d
    }, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "dd-check"
    }, "→", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(d), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])]), _cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dd-divider"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dd-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "dd-icon"
  }, "⛔"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Don'ts")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.dontsItems, d => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: d
    }, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "dd-x"
    }, "✕", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(d), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), _cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "panel-ref"
  }, "Based on IslamQA & SeekersGuidance guidelines", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Tools "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_64, [_cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "panel-title"
  }, "Interactive Tools", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Daily Reminder "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_65, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "tool-block-head"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "💡"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Daily Reminder ")], -1 /* CACHED */)), _cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("blockquote", {
    class: "hadith-quote"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" \"Whoever follows a path in pursuit of knowledge, Allah makes easy for him a path to Paradise.\" "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("cite", null, "— Sahih Muslim")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn-outline-sm",
    onClick: _cache[10] || (_cache[10] = (...args) => $options.nextHadith && $options.nextHadith(...args))
  }, "Next Hadith →")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Prayer Times Placeholder "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "tool-block-head"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "🕌"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Prayer Times & Qibla ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.prayerTimes, p => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["pt-item", {
        current: p.current
      }]),
      key: p.name
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_68, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(p.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_69, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(p.time), 1 /* TEXT */), p.current ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_70, "●")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))]), _cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "prayer-note"
  }, "Times shown are approximate. Use IslamicFinder or Athan Pro for precise local times.", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Recommended Apps "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "tool-block-head"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "📱"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Recommended Apps ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.recommendedApps, app => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
      class: "app-tag",
      key: app
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(app), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ░░ FAQ ░░ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_73, [_cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-label"
  }, "04 / Questions", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_74, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-head"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "section-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Frequently "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "Asked")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-desc"
  }, "Honest, scholarly-backed answers to real questions from Western Muslim youth.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_75, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredFaqs, (faq, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["faq-item", {
        open: $data.activeFaq === i
      }]),
      key: i,
      onClick: $event => $data.activeFaq = $data.activeFaq === i ? null : i
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_77, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_78, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(String(i + 1).padStart(2, '0')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_79, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.question), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_80, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.activeFaq === i ? '−' : '+'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "faq-open"
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.activeFaq === i ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_81, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.answer), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("cite", null, "— " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.source), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
      _: 2 /* DYNAMIC */
    }, 1024 /* DYNAMIC_SLOTS */)], 10 /* CLASS, PROPS */, _hoisted_76);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ░░ FOOTER ░░ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("footer", _hoisted_82, [_cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "footer-geo",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 400 120",
    preserveAspectRatio: "none"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M0,60 Q100,0 200,60 Q300,120 400,60 L400,120 L0,120 Z",
    fill: "rgba(182,139,64,0.06)"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_83, [_cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"footer-brand\" data-v-2fc18995><span class=\"footer-arabic\" data-v-2fc18995>منطقة الشباب</span><p data-v-2fc18995>Curated Islamic knowledge for Western Muslim Youth.</p><p class=\"footer-dua\" data-v-2fc18995>🌿 May Allah increase us in beneficial knowledge. Ameen.</p></div><div class=\"footer-refs\" data-v-2fc18995><h5 data-v-2fc18995>Scholarly Sources</h5><ol data-v-2fc18995><li data-v-2fc18995>IslamQA.info — Scholarly Fatawa</li><li data-v-2fc18995>IslamWeb.net — Authenticated Articles</li><li data-v-2fc18995>SeekersGuidance.org — Courses &amp; Answers</li><li data-v-2fc18995>YaqeenInstitute.org — Research &amp; Papers</li><li data-v-2fc18995>AlMaghrib Institute — Seminar Notes</li></ol></div>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_84, [_cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "All multimedia for educational purposes only.", -1 /* CACHED */)), _cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Images courtesy of Pexels. Videos courtesy of YouTube.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_85, "© " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(new Date().getFullYear()) + " Islamic Connect · Youth Zone", 1 /* TEXT */)])])])], 2 /* CLASS */);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/YouthComponent.vue?vue&type=style&index=0&id=2fc18995&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/YouthComponent.vue?vue&type=style&index=0&id=2fc18995&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/components/YouthComponent.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/YouthComponent.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _YouthComponent_vue_vue_type_template_id_2fc18995_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YouthComponent.vue?vue&type=template&id=2fc18995&scoped=true */ "./resources/js/components/YouthComponent.vue?vue&type=template&id=2fc18995&scoped=true");
/* harmony import */ var _YouthComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YouthComponent.vue?vue&type=script&lang=js */ "./resources/js/components/YouthComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _YouthComponent_vue_vue_type_style_index_0_id_2fc18995_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./YouthComponent.vue?vue&type=style&index=0&id=2fc18995&scoped=true&lang=css */ "./resources/js/components/YouthComponent.vue?vue&type=style&index=0&id=2fc18995&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_YouthComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_YouthComponent_vue_vue_type_template_id_2fc18995_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-2fc18995"],['__file',"resources/js/components/YouthComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/YouthComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/YouthComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_YouthComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_YouthComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./YouthComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/YouthComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/YouthComponent.vue?vue&type=style&index=0&id=2fc18995&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/YouthComponent.vue?vue&type=style&index=0&id=2fc18995&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_YouthComponent_vue_vue_type_style_index_0_id_2fc18995_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./YouthComponent.vue?vue&type=style&index=0&id=2fc18995&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/YouthComponent.vue?vue&type=style&index=0&id=2fc18995&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/YouthComponent.vue?vue&type=template&id=2fc18995&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/YouthComponent.vue?vue&type=template&id=2fc18995&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_YouthComponent_vue_vue_type_template_id_2fc18995_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_YouthComponent_vue_vue_type_template_id_2fc18995_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./YouthComponent.vue?vue&type=template&id=2fc18995&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/YouthComponent.vue?vue&type=template&id=2fc18995&scoped=true");


/***/ })

}]);