"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_components_vue_translation_AyahOfTheDay_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/AyahOfTheDay.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/AyahOfTheDay.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'AyahOfTheDay',
  data() {
    return {
      ayah: null,
      isVisible: true,
      apiUrl: "https://api.alquran.cloud/v1/ayah",
      translationLangs: ["en.asad", "ur.junagarhi"],
      showTranslation: false,
      selectedLanguage: "en",
      showTafsir: false,
      fontSize: 1.8,
      showToast: false,
      toastMessage: ""
    };
  },
  computed: {
    availableTranslations() {
      var _this$ayah;
      return (_this$ayah = this.ayah) !== null && _this$ayah !== void 0 && _this$ayah.translations ? Object.keys(this.ayah.translations) : [];
    },
    formatDate() {
      return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  },
  methods: {
    closeMessageBox() {
      this.isVisible = false;
    },
    async fetchAyahOfTheDay() {
      // Use a consistent ayah for demo - in production, use random or sequential
      const demoAyah = 255; // Ayat ul Kursi

      try {
        const arabicUrl = `${this.apiUrl}/${demoAyah}`;
        const arabicResponse = await fetch(arabicUrl);
        if (!arabicResponse.ok) throw new Error('Network error');
        const arabicData = await arabicResponse.json();
        const translations = {};

        // Fetch translations
        for (const lang of this.translationLangs) {
          const translationUrl = `${this.apiUrl}/${demoAyah}/${lang}`;
          const translationResponse = await fetch(translationUrl);
          if (translationResponse.ok) {
            const translationData = await translationResponse.json();
            const langCode = lang.split('.')[1] || lang;
            translations[langCode] = translationData.data.text;
          }
        }

        // Enhanced tafsir
        const tafsir = "The Throne Verse (Ayat al-Kursi) is one of the most profound verses in the Quran, emphasizing God's absolute sovereignty, knowledge, and power over all creation. It serves as a reminder of divine protection and the limitless nature of God's authority, offering spiritual comfort and reinforcing faith in the Creator's omnipotence and mercy.";
        if (arabicData !== null && arabicData !== void 0 && arabicData.data) {
          this.ayah = {
            arabic: arabicData.data.text,
            translations: translations,
            tafsir: tafsir,
            surah: arabicData.data.surah.englishName,
            surahNumber: arabicData.data.surah.number,
            ayahNumber: arabicData.data.numberInSurah
          };
        }
      } catch (error) {
        console.error("Error fetching Ayah:", error);
        // Fallback data
        this.ayah = {
          arabic: "اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
          translations: {
            en: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
            ur: "اللہ وہ ہے جس کے سوا کوئی معبود نہیں، زندہ اور قائم رہنے والا ہے، نہ اُسے اُونگھ آتی ہے نہ نیند، زمین اور آسمانوں میں جو کچھ ہے اُسی کا ہے، کون ہے جو اُس کے حضور اُس کی اجازت کے بغیر سفارش کر سکے؟ جو کچھ لوگوں کے سامنے ہے اُسے بھی جانتا ہے اور جو کچھ اُن کے پیچھے ہے اُسے بھی، اور وہ اُس کی معلومات میں سے کسی چیز پر احاطہ نہیں کر سکتے مگر جتنا وہ چاہے، اُس کی کرسی زمین اور آسمانوں کو گھیرے ہوئے ہے، اور اُن کی حفاظت اُس پر گراں نہیں، اور وہ بلند مرتبہ اور عظمت والا ہے۔"
          },
          tafsir: "The Throne Verse (Ayat al-Kursi) is one of the most profound verses in the Quran, emphasizing God's absolute sovereignty, knowledge, and power over all creation. It serves as a reminder of divine protection and the limitless nature of God's authority, offering spiritual comfort and reinforcing faith in the Creator's omnipotence and mercy.",
          surah: "Al-Baqarah",
          surahNumber: 2,
          ayahNumber: 255
        };
      }
    },
    toggleTranslation() {
      this.showTranslation = !this.showTranslation;
      if (this.showTranslation && !this.selectedLanguage) {
        this.selectedLanguage = this.availableTranslations[0];
      }
    },
    toggleTafsir() {
      this.showTafsir = !this.showTafsir;
    },
    selectTranslation(lang) {
      this.selectedLanguage = lang;
    },
    increaseFontSize() {
      if (this.fontSize < 2.4) this.fontSize += 0.1;
    },
    decreaseFontSize() {
      if (this.fontSize > 1.2) this.fontSize -= 0.1;
    },
    async copyToClipboard() {
      const text = `${this.ayah.arabic}\n\n- Surah ${this.ayah.surah} ${this.ayah.surahNumber}:${this.ayah.ayahNumber}`;
      try {
        await navigator.clipboard.writeText(text);
        this.showToastMessage('Copied to clipboard');
      } catch (err) {
        this.showToastMessage('Failed to copy');
      }
    },
    async shareAyah() {
      const text = `${this.ayah.arabic}\n\n- Surah ${this.ayah.surah} ${this.ayah.surahNumber}:${this.ayah.ayahNumber}`;
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Ayah of the Day',
            text: text,
            url: window.location.href
          });
        } catch (err) {
          this.copyToClipboard();
        }
      } else {
        this.copyToClipboard();
      }
    },
    bookmarkAyah() {
      this.showToastMessage('Bookmarked');
    },
    showToastMessage(message) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },
    isRtlLanguage(lang) {
      return ['ur', 'ar'].includes(lang.toLowerCase());
    }
  },
  mounted() {
    this.fetchAyahOfTheDay();
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/AyahOfTheDay.vue?vue&type=template&id=6d1edc19&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/AyahOfTheDay.vue?vue&type=template&id=6d1edc19&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  key: 0,
  class: "ayah-container"
};
const _hoisted_2 = {
  class: "ayah-header"
};
const _hoisted_3 = {
  class: "header-content"
};
const _hoisted_4 = {
  class: "title-section"
};
const _hoisted_5 = {
  class: "subtitle"
};
const _hoisted_6 = {
  class: "ayah-content"
};
const _hoisted_7 = {
  class: "surah-info"
};
const _hoisted_8 = {
  class: "surah-badge"
};
const _hoisted_9 = {
  class: "ayah-ref"
};
const _hoisted_10 = {
  class: "arabic-section"
};
const _hoisted_11 = {
  class: "toggle-section"
};
const _hoisted_12 = {
  key: 0,
  class: "translation-section"
};
const _hoisted_13 = {
  class: "language-selector"
};
const _hoisted_14 = ["onClick"];
const _hoisted_15 = {
  key: 0,
  class: "toggle-section"
};
const _hoisted_16 = {
  key: 0,
  class: "tafsir-section"
};
const _hoisted_17 = {
  class: "tafsir-text"
};
const _hoisted_18 = {
  class: "action-bar"
};
const _hoisted_19 = {
  class: "action-group"
};
const _hoisted_20 = ["disabled"];
const _hoisted_21 = ["disabled"];
const _hoisted_22 = {
  class: "action-group"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return $data.isVisible && $data.ayah ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Minimal Header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "icon-wrapper"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-moon-stars"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "title"
  }, "Ayah of the Day", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatDate), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "close-btn",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.closeMessageBox && $options.closeMessageBox(...args)),
    "aria-label": "Close"
  }, [...(_cache[10] || (_cache[10] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x"
  }, null, -1 /* CACHED */)]))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Surah Info "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_8, "Surah " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ayah.surah), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ayah.surahNumber) + ":" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ayah.ayahNumber), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Arabic Text "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "arabic-text",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      fontSize: `${$data.fontSize}rem`
    })
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ayah.arabic), 5 /* TEXT, STYLE */), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "decoration"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "decoration-line"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-flower1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "decoration-line"
  })], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Translation Toggle "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["toggle-btn", {
      'active': $data.showTranslation
    }]),
    onClick: _cache[1] || (_cache[1] = (...args) => $options.toggleTranslation && $options.toggleTranslation(...args))
  }, [...(_cache[12] || (_cache[12] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Translation", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "toggle-switch"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "toggle-knob"
  })], -1 /* CACHED */)]))], 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Translation "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade-slide"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.showTranslation ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.availableTranslations, lang => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
        key: lang,
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["lang-btn", {
          'active': $data.selectedLanguage === lang
        }]),
        onClick: $event => $options.selectTranslation(lang)
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lang.toUpperCase()), 11 /* TEXT, CLASS, PROPS */, _hoisted_14);
    }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["translation-text", {
        'rtl': $options.isRtlLanguage($data.selectedLanguage)
      }])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ayah.translations[$data.selectedLanguage]), 3 /* TEXT, CLASS */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Tafsir Toggle "), $data.ayah.tafsir ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["toggle-btn", {
      'active': $data.showTafsir
    }]),
    onClick: _cache[2] || (_cache[2] = (...args) => $options.toggleTafsir && $options.toggleTafsir(...args))
  }, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Tafsir", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "toggle-switch"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "toggle-knob"
  })], -1 /* CACHED */)]))], 2 /* CLASS */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Tafsir "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade-slide"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.showTafsir && $data.ayah.tafsir ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ayah.tafsir), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Action Bar "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "action-btn",
    onClick: _cache[3] || (_cache[3] = (...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args)),
    disabled: $data.fontSize <= 1.2
  }, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-dash-lg"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_20), _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "font-size-label"
  }, "Font Size", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "action-btn",
    onClick: _cache[4] || (_cache[4] = (...args) => $options.increaseFontSize && $options.increaseFontSize(...args)),
    disabled: $data.fontSize >= 2.4
  }, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-lg"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_21)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "action-btn",
    onClick: _cache[5] || (_cache[5] = (...args) => $options.copyToClipboard && $options.copyToClipboard(...args))
  }, [...(_cache[17] || (_cache[17] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-clipboard"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "action-btn",
    onClick: _cache[6] || (_cache[6] = (...args) => $options.shareAyah && $options.shareAyah(...args))
  }, [...(_cache[18] || (_cache[18] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-share"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "action-btn",
    onClick: _cache[7] || (_cache[7] = (...args) => $options.bookmarkAyah && $options.bookmarkAyah(...args))
  }, [...(_cache[19] || (_cache[19] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bookmark"
  }, null, -1 /* CACHED */)]))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Toast "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["toast", {
      'show': $data.showToast
    }])
  }, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-check-circle"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.toastMessage), 1 /* TEXT */)], 2 /* CLASS */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/AyahOfTheDay.vue?vue&type=style&index=0&id=6d1edc19&scoped=true&lang=css":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/AyahOfTheDay.vue?vue&type=style&index=0&id=6d1edc19&scoped=true&lang=css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/translation/AyahOfTheDay.vue":
/*!***************************************************************!*\
  !*** ./resources/components/vue/translation/AyahOfTheDay.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AyahOfTheDay_vue_vue_type_template_id_6d1edc19_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AyahOfTheDay.vue?vue&type=template&id=6d1edc19&scoped=true */ "./resources/components/vue/translation/AyahOfTheDay.vue?vue&type=template&id=6d1edc19&scoped=true");
/* harmony import */ var _AyahOfTheDay_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AyahOfTheDay.vue?vue&type=script&lang=js */ "./resources/components/vue/translation/AyahOfTheDay.vue?vue&type=script&lang=js");
/* harmony import */ var _AyahOfTheDay_vue_vue_type_style_index_0_id_6d1edc19_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AyahOfTheDay.vue?vue&type=style&index=0&id=6d1edc19&scoped=true&lang=css */ "./resources/components/vue/translation/AyahOfTheDay.vue?vue&type=style&index=0&id=6d1edc19&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_AyahOfTheDay_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AyahOfTheDay_vue_vue_type_template_id_6d1edc19_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-6d1edc19"],['__file',"resources/components/vue/translation/AyahOfTheDay.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/translation/AyahOfTheDay.vue?vue&type=script&lang=js":
/*!***************************************************************************************!*\
  !*** ./resources/components/vue/translation/AyahOfTheDay.vue?vue&type=script&lang=js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahOfTheDay_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahOfTheDay_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AyahOfTheDay.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/AyahOfTheDay.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/translation/AyahOfTheDay.vue?vue&type=style&index=0&id=6d1edc19&scoped=true&lang=css":
/*!***********************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/AyahOfTheDay.vue?vue&type=style&index=0&id=6d1edc19&scoped=true&lang=css ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahOfTheDay_vue_vue_type_style_index_0_id_6d1edc19_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AyahOfTheDay.vue?vue&type=style&index=0&id=6d1edc19&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/AyahOfTheDay.vue?vue&type=style&index=0&id=6d1edc19&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/translation/AyahOfTheDay.vue?vue&type=template&id=6d1edc19&scoped=true":
/*!*********************************************************************************************************!*\
  !*** ./resources/components/vue/translation/AyahOfTheDay.vue?vue&type=template&id=6d1edc19&scoped=true ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahOfTheDay_vue_vue_type_template_id_6d1edc19_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahOfTheDay_vue_vue_type_template_id_6d1edc19_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AyahOfTheDay.vue?vue&type=template&id=6d1edc19&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/AyahOfTheDay.vue?vue&type=template&id=6d1edc19&scoped=true");


/***/ })

}]);