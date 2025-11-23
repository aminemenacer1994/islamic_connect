"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_HomepageComponent_vue"],{

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
/* harmony import */ var _translation_PrayerTimes_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./translation/PrayerTimes.vue */ "./resources/js/components/translation/PrayerTimes.vue");
/* harmony import */ var _translation_AyahOfTheDay_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./translation/AyahOfTheDay.vue */ "./resources/js/components/translation/AyahOfTheDay.vue");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    PrayerTimes: _translation_PrayerTimes_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    AyahOfTheDay: _translation_AyahOfTheDay_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
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
        desc: "Read and listen to the Quran with accurate translations, tafsir explanations, and synchronized audio tools.",
        href: "/quran"
      }, {
        title: "Dua Collections",
        desc: "Access authentic supplications for daily life, travel, and special occasions, all verified for accuracy.",
        href: "/dua"
      }, {
        title: "Audio Podcasts",
        desc: "Explore Islamic podcasts and narrations with context and commentary, perfect for learning on the go.",
        href: "/content"
      }, {
        title: "Guides & Knowledge",
        desc: "Discover practical guides on spirituality, fiqh, and modern Islamic living for personal growth.",
        href: "/guide"
      }, {
        title: "Seerah Timeline",
        desc: "Follow the life of the Prophet ﷺ and the global impact of Islamic history through an interactive timeline.",
        href: "/mission"
      }, {
        title: "Support & Donations",
        desc: "Contribute to the platform and help sustain community programs, educational content, and accessibility tools.",
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
      // Unified reactive form object (avoid duplicate keys)
      form: new Form({
        firstname: "",
        lastname: "",
        email: "",
        subject: "",
        mobile: "",
        message: ""
      })
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
      Swal.fire({
        title: "Are you sure?",
        text: "You want to send the message !",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "#d33",
        confirmButtonText: "Send message!"
      }).then(result => {
        if (result.isConfirmed) {
          axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/send-message", this.form).then(res => {
            if (!res.data.success) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Message sent successfully ",
                showConfirmButton: false,
                timer: 1500
              });
              this.form.reset();
              $("#addNew").hide();
            } else if (res.data.success) {
              Swal.fire("Error!", "Unable to send message.", "error");
              this.form.reset();
              self.close();
            }
          }).catch(function (err) {});
        }
      });
    },
    submitMail() {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to join the mailing list !",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "#d33",
        confirmButtonText: "Submit"
      }).then(result => {
        if (result.isConfirmed) {
          axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/submit-mail", this.form).then(res => {
            if (!res.data.success) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Mailing List Subscription Successful",
                showConfirmButton: false,
                timer: 1500
              });
              this.form.reset();
              $("#addNew").hide();
            } else if (res.data.success) {
              Swal.fire("Error!", "Unable to send message.", "error");
              this.form.reset();
              self.close();
            }
          }).catch(function (err) {});
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/AyahOfTheDay.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/AyahOfTheDay.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'PrayerTimes',
  data() {
    return {
      city: "",
      cityName: null,
      prayerTimes: null,
      nextPrayer: null,
      loading: false,
      error: null,
      // Only for real errors (API down, network, etc.)
      lat: null,
      lon: null,
      gregorianDate: "",
      hijriDate: "",
      updateInterval: null
    };
  },
  computed: {
    filteredPrayerTimes() {
      if (!this.prayerTimes) return {};
      const unwantedKeys = ["Sunset", "Imsak", "Firstthird", "Lastthird", "Midnight"];
      return Object.fromEntries(Object.entries(this.prayerTimes).filter(([key]) => !unwantedKeys.includes(key)));
    }
  },
  mounted() {
    this.setCurrentDate();
    this.getCurrentLocation();

    // Update "Next Prayer" every minute
    this.updateInterval = setInterval(() => {
      if (this.prayerTimes) {
        this.calculateNextPrayer();
      }
    }, 60000);
  },
  beforeUnmount() {
    if (this.updateInterval) clearInterval(this.updateInterval);
  },
  methods: {
    setCurrentDate() {
      const now = new Date();
      this.gregorianDate = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Hijri date (modern browsers support Intl)
      try {
        const hijri = new Intl.DateTimeFormat('en-u-ca-islamic', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }).format(now);
        this.hijriDate = hijri;
      } catch (e) {
        this.hijriDate = "";
      }
    },
    getCurrentLocation() {
      if (!navigator.geolocation) {
        this.fetchPrayerTimesByCity('London');
        return;
      }
      this.loading = true;
      const geoTimeout = setTimeout(() => {
        this.loading = false;
        this.fetchPrayerTimesByCity('London');
      }, 10000);
      navigator.geolocation.getCurrentPosition(position => {
        clearTimeout(geoTimeout);
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.fetchPrayerTimesByLocation();
      }, () => {
        clearTimeout(geoTimeout);
        this.loading = false;
        this.fetchPrayerTimesByCity('London'); // Silent fallback
      }, {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000
      });
    },
    async fetchPrayerTimesByLocation() {
      if (!this.lat || !this.lon) return;
      try {
        const today = new Date().toDateString();
        const cacheKey = `prayer-${this.lat.toFixed(4)}-${this.lon.toFixed(4)}-${today}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const data = JSON.parse(cached);
          this.prayerTimes = data.timings;
          this.cityName = data.city || "Your Location";
          this.calculateNextPrayer();
          this.loading = false;
          return;
        }
        const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${this.lat}&longitude=${this.lon}&method=2`);
        if (!response.ok) throw new Error("Network error");
        const json = await response.json();
        if (json.code !== 200) throw new Error("Invalid API response");
        this.prayerTimes = json.data.timings;
        this.cityName = json.data.meta.timezone;
        localStorage.setItem(cacheKey, JSON.stringify({
          timings: json.data.timings,
          city: json.data.meta.timezone
        }));
        this.calculateNextPrayer();
      } catch (err) {
        this.error = "Failed to load prayer times. Please try again later.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async fetchPrayerTimesByCity(city = 'London') {
      try {
        const today = new Date().toDateString();
        const cacheKey = `prayer-${city}-${today}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const data = JSON.parse(cached);
          this.prayerTimes = data.timings;
          this.cityName = city;
          this.calculateNextPrayer();
          return;
        }
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=GB&method=2`);
        if (!response.ok) throw new Error("Network error");
        const json = await response.json();
        if (json.code !== 200) throw new Error("API error");
        this.prayerTimes = json.data.timings;
        this.cityName = city;
        localStorage.setItem(cacheKey, JSON.stringify({
          timings: json.data.timings
        }));
        this.calculateNextPrayer();
      } catch (err) {
        this.error = "Failed to load prayer times for " + city;
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    calculateNextPrayer() {
      if (!this.prayerTimes) return;
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      let closest = Infinity;
      let next = null;
      for (const [name, time] of Object.entries(this.filteredPrayerTimes)) {
        const [h, m] = time.split(':').map(Number);
        const minutes = h * 60 + m;
        if (minutes > currentMinutes && minutes < closest) {
          closest = minutes;
          next = name;
        }
      }
      this.nextPrayer = next || 'Fajr'; // rollover to Fajr if all passed
    },
    getPrayerDisplayName(prayer) {
      const map = {
        Fajr: 'Fajr',
        Sunrise: 'Sunrise',
        Dhuhr: 'Dhuhr',
        Asr: 'Asr',
        Maghrib: 'Maghrib',
        Isha: 'Isha'
      };
      return map[prayer] || prayer;
    },
    formatTime(time) {
      const [h, m] = time.split(':').map(Number);
      const period = h >= 12 ? 'PM' : 'AM';
      const hour12 = h % 12 || 12;
      return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
    }
  }
});

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
  class: "container-fluid premium-seo px-0",
  "aria-labelledby": "seo-heading"
};
const _hoisted_2 = {
  class: "container position-relative"
};
const _hoisted_3 = {
  class: "row gy-4 align-items-center"
};
const _hoisted_4 = {
  class: "col-lg-6 text-center text-lg-start"
};
const _hoisted_5 = {
  class: "row row-cols-3 g-3"
};
const _hoisted_6 = {
  class: "p-4 premium-stat h-100 text-center"
};
const _hoisted_7 = {
  class: "h3 fw-bold mb-1"
};
const _hoisted_8 = {
  class: "text-muted"
};
const _hoisted_9 = {
  class: "col-lg-6"
};
const _hoisted_10 = {
  class: "row row-cols-1 row-cols-md-2 g-3"
};
const _hoisted_11 = {
  class: "premium-card h-100 d-flex flex-column"
};
const _hoisted_12 = {
  class: "h6 fw-semibold mb-2"
};
const _hoisted_13 = {
  class: "small text-muted mb-3"
};
const _hoisted_14 = ["title", "href"];
const _hoisted_15 = {
  class: "row mt-5 gx-lg-5 gy-4"
};
const _hoisted_16 = {
  class: "col-md-6"
};
const _hoisted_17 = {
  class: "list-unstyled mb-0"
};
const _hoisted_18 = ["title", "href"];
const _hoisted_19 = {
  class: "container journeys-section py-5"
};
const _hoisted_20 = {
  class: "row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4"
};
const _hoisted_21 = {
  class: "journey-card h-100 d-flex flex-column p-4"
};
const _hoisted_22 = {
  class: "mb-3"
};
const _hoisted_23 = {
  class: "h5 fw-bold text-dark mb-2"
};
const _hoisted_24 = {
  class: "text-secondary small mb-0"
};
const _hoisted_25 = ["href", "title"];
const _hoisted_26 = {
  class: "py-5 bg-white",
  "aria-labelledby": "premium-heading",
  role: "region"
};
const _hoisted_27 = {
  class: "container"
};
const _hoisted_28 = {
  class: "row justify-content-center"
};
const _hoisted_29 = {
  class: "col-lg-10"
};
const _hoisted_30 = {
  class: "row g-4"
};
const _hoisted_31 = {
  class: "col-md-6"
};
const _hoisted_32 = {
  class: "h-100 d-flex flex-column justify-content-between support-panel"
};
const _hoisted_33 = {
  class: "p-4 text-start"
};
const _hoisted_34 = {
  class: "py-5 contact-section contact-section-card",
  "aria-labelledby": "contact-heading"
};
const _hoisted_35 = {
  class: "container-fluid"
};
const _hoisted_36 = {
  class: "row justify-content-center"
};
const _hoisted_37 = {
  class: "col-md-10 col-lg-6 mt-4"
};
const _hoisted_38 = {
  class: "row g-3"
};
const _hoisted_39 = {
  class: "col-md-6"
};
const _hoisted_40 = {
  class: "mb-3"
};
const _hoisted_41 = {
  class: "col-md-6"
};
const _hoisted_42 = {
  class: "mb-3"
};
const _hoisted_43 = {
  class: "col-md-6"
};
const _hoisted_44 = {
  class: "mb-3"
};
const _hoisted_45 = {
  class: "col-md-6"
};
const _hoisted_46 = {
  class: "mb-3"
};
const _hoisted_47 = {
  class: "col-md-6"
};
const _hoisted_48 = {
  class: "mb-3"
};
const _hoisted_49 = {
  class: "col-12"
};
const _hoisted_50 = {
  class: "mb-3"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" header "), _cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"jumbotron\" data-v-2ba25654><!-- Content --><div class=\"container-fluid hero-layout\" data-v-2ba25654><!-- Enhanced Hero Section --><div class=\"container-fluid text-center hero-stage\" data-v-2ba25654><!-- Background Elements --><div class=\"hero-floating hero-floating--primary\" data-v-2ba25654></div><div class=\"hero-floating hero-floating--secondary\" data-v-2ba25654></div><div class=\"row align-items-center hero-row\" data-v-2ba25654><div class=\"col-md-6\" data-v-2ba25654><div class=\"text-left\" data-v-2ba25654><!-- Badge --><div class=\"hero-badge\" data-v-2ba25654><i class=\"fas fa-star me-2\" data-v-2ba25654></i>Trusted by 1000&#39;s of Muslims Worldwide </div><h1 class=\"display-4 mt-1 fw-bold text-left hero-title\" data-v-2ba25654> Your Launchpad for Quran, Dua, and Community Guidance </h1><h2 class=\"lead pt-3 text-left hero-subtitle\" data-v-2ba25654><p data-v-2ba25654> Instantly reach recitations, tafsir, and dua libraries vetted by scholars, pair them with AI-assisted study notes, and keep your learning synced across devices without overwhelming menus. </p></h2><div class=\"row mb-3\" data-v-2ba25654><div class=\"col-12\" data-v-2ba25654><div class=\"controls d-flex flex-row justify-content-start text-left hero-controls\" data-v-2ba25654><a href=\"/surat\" class=\"btn btn-lg btn-teal rounded-20 fw-bold px-4\" title=\"Get started with the Quran Portal\" data-v-2ba25654><i class=\"fas fa-rocket me-2\" data-v-2ba25654></i>Get Started Free </a><a href=\"/subscribe\" class=\"btn rounded-20 fw-bold px-4 hero-cta-outline\" title=\"Support the Islamic Connect mission\" data-v-2ba25654><i class=\"fas fa-heart me-2\" data-v-2ba25654></i>Support Our Mission </a></div><!-- Trust Indicators --><div class=\"mt-3 d-flex align-items-center hero-trust-indicators\" data-v-2ba25654><div class=\"d-flex align-items-center\" data-v-2ba25654><i class=\"fas fa-shield-alt text-success me-2\" data-v-2ba25654></i><small class=\"trust-label\" data-v-2ba25654>Scholar-verified Quran &amp; Tafsir</small></div><div class=\"d-flex align-items-center\" data-v-2ba25654><i class=\"fas fa-microphone-lines text-warning me-2\" data-v-2ba25654></i><small class=\"trust-label\" data-v-2ba25654>Real-time audio &amp; dua playlists</small></div><div class=\"d-flex align-items-center\" data-v-2ba25654><i class=\"fas fa-users text-info me-2\" data-v-2ba25654></i><small class=\"trust-label\" data-v-2ba25654>Community guidance &amp; support</small></div></div></div></div></div></div><div class=\"col-md-6\" data-v-2ba25654><div class=\"text-center\" data-v-2ba25654><picture data-v-2ba25654><source type=\"image/avif\" srcset=\"/images/banner-photo-400.avif 400w, /images/banner-photo-800.avif 800w, /images/banner-photo-1200.avif 1200w\" sizes=\"(max-width: 767px) 90vw, (max-width: 991px) 60vw, 50vw\" data-v-2ba25654><source type=\"image/webp\" srcset=\"/images/banner-photo-400.webp 400w, /images/banner-photo-800.webp 800w, /images/banner-photo-1200.webp 1200w\" sizes=\"(max-width: 767px) 90vw, (max-width: 991px) 60vw, 50vw\" data-v-2ba25654><img src=\"/images/banner-photo-1200.avif\" alt=\"Islamic Connect platform showcasing Quran exploration and AI-powered tools\" class=\"img-fluid hero-image\" width=\"800\" height=\"800\" loading=\"lazy\" data-v-2ba25654></picture></div></div></div></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <section aria-labelledby=\"prayer-times-heading\">\n      <div class=\"container-fluid\">\n        <div class=\"row justify-content-center\">\n          <div class=\"col-12\">\n            -- SEO Optimized Heading --\n            <h2 id=\"prayer-times-heading\" class=\"text-center mb-4 prayer-title\">\n              Today's Prayer Times\n            </h2>\n\n            -- Performance & Accessibility Enhanced Component --\n            <PrayerTimes class=\"mb-3 prayer-times-enhanced\" :lazy-load=\"true\" :reduce-motion=\"true\" aria-live=\"polite\"\n              aria-atomic=\"true\" />\n\n          </div>\n        </div>\n      </div>\n    </section> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" HERO / SEO SECTION "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_1, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "premium-seo__backdrop"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<h2 id=\"text-left\" class=\"display-5 fw-bold mb-3 text-start\" data-v-2ba25654>Discover Quran, Knowledge &amp; Accessible Tools </h2><p class=\"text-muted text-left mb-3\" data-v-2ba25654>Dive into a fully accessible platform offering the Quran with translation, tafsir, and audio, alongside curated Islamic content, podcasts, and guides for spiritual growth.</p><p class=\"text-muted text-left mb-4\" data-v-2ba25654>Explore interactive pathways, modern tools, and resources designed for every user, including features for the visually impaired and those seeking deeper understanding of Islam. </p><div class=\"d-flex flex-wrap gap-3 mb-4 justify-content-center justify-content-lg-start\" data-v-2ba25654><span class=\"badge badge-pill highlight-badge\" data-v-2ba25654>Quran Insights</span><span class=\"badge badge-pill highlight-badge\" data-v-2ba25654>Authentic Duas</span><span class=\"badge badge-pill highlight-badge\" data-v-2ba25654>Podcasts &amp; Audio</span><span class=\"badge badge-pill highlight-badge\" data-v-2ba25654>Mission Timeline</span></div>", 4)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.seoStats, stat => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col",
      key: stat.label
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.value), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.label), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.seoCards, card => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col",
      key: card.title
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.desc), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      title: card.title,
      class: "mt-auto fw-semibold text-teal",
      href: card.href
    }, "Explore →", 8 /* PROPS */, _hoisted_14)])]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "h5 fw-semibold"
  }, "External references we trust", -1 /* CACHED */)), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted mb-2"
  }, "High-quality partners and verified resources add credibility to the journeys promoted in this hero section.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_17, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.externalLinks, link => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: link.href,
      class: "mb-2"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      title: link.title,
      class: "text-dark fw-semibold",
      href: link.href,
      target: "_blank",
      rel: "noopener noreferrer"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(link.text), 9 /* TEXT, PROPS */, _hoisted_18)]);
  }), 128 /* KEYED_FRAGMENT */))])]), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-6"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "h5 fw-semibold"
  }, "Why we keep knowledge modern"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted bm-0"
  }, "Blending server-rendered structure with Vue-powered interactivity ensures the same narrative loads instantly.")], -1 /* CACHED */))])])]), _cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"my-5 py-5 rounded-4\" aria-label=\"Islamic Connect mission insights\" style=\"background:linear-gradient(180deg, #e9f7f7 0%, #dff3f3 100%);\" data-v-2ba25654><div class=\"row container-fluid\" data-v-2ba25654><div class=\"col-lg-9 mx-auto text-center\" data-v-2ba25654><h2 class=\"display-6 fw-bold mb-4\" style=\"color:#0f4c4c;\" data-v-2ba25654> Islamic Connect brings clarity, accessibility, and authentic knowledge into one platform </h2><p class=\"mb-5 fs-5\" style=\"max-width:850px;margin:0 auto;color:#376d6d;\" data-v-2ba25654> Islamic Connect is designed for Muslims seeking a clearer, more accessible experience with the Quran and verified Islamic resources. Every feature—Quran recitation, translations, dua, tafsir, radio, podcasts, and accessibility tools is crafted to support daily learning with ease and trust. </p><ul class=\"list-unstyled row row-cols-1 row-cols-md-2 g-4 text-start mt-3\" data-v-2ba25654><li class=\"col-md-3\" data-v-2ba25654><div class=\"p-4 h-100 rounded-4 shadow-sm transition\" style=\"background:#ffffff;border:1px solid #c6e6e6;\" data-v-2ba25654><strong class=\"d-block mb-2 fs-6\" style=\"color:#0f4c4c;\" data-v-2ba25654>Personalized Quran Experience</strong><p class=\"m-0\" style=\"color:#376d6d;font-size:0.92rem;\" data-v-2ba25654> Read and listen with synchronized audio, TTS recitation, translations, tafsir, and transliteration tailored to your study flow. </p></div></li><li class=\"col-md-3\" data-v-2ba25654><div class=\"p-4 h-100 rounded-4 shadow-sm transition\" style=\"background:#ffffff;border:1px solid #c6e6e6;\" data-v-2ba25654><strong class=\"d-block mb-2 fs-6\" style=\"color:#0f4c4c;\" data-v-2ba25654>Accessibility-Centered Tools</strong><p class=\"m-0\" style=\"color:#376d6d;font-size:0.92rem;\" data-v-2ba25654> Gesture navigation, screen reader compatibility, large-text modes, STT voice search, and audio-first design for visually impaired and mobility-limited users. </p></div></li><li class=\"col-md-3\" data-v-2ba25654><div class=\"p-4 h-100 rounded-4 shadow-sm transition\" style=\"background:#ffffff;border:1px solid #c6e6e6;\" data-v-2ba25654><strong class=\"d-block mb-2 fs-6\" style=\"color:#0f4c4c;\" data-v-2ba25654>Authentic Dua &amp; Knowledge</strong><p class=\"m-0\" style=\"color:#376d6d;font-size:0.92rem;\" data-v-2ba25654> Verified dua collections, hadith references, and scholar-supported material with transparent sourcing for complete reliability. </p></div></li><li class=\"col-md-3\" data-v-2ba25654><div class=\"p-4 h-100 rounded-4 shadow-sm transition\" style=\"background:#ffffff;border:1px solid #c6e6e6;\" data-v-2ba25654><strong class=\"d-block mb-2 fs-6\" style=\"color:#0f4c4c;\" data-v-2ba25654>Community Learning Ecosystem</strong><p class=\"m-0\" style=\"color:#376d6d;font-size:0.92rem;\" data-v-2ba25654> Reciters station, podcasts, Islamic blogs, guides, and practical utilities designed to support ongoing spiritual growth. </p></div></li></ul><p class=\"mt-5 fs-6\" style=\"max-width:850px;margin:0 auto;color:#376d6d;\" data-v-2ba25654> Built with clean structure and semantic clarity, Islamic Connect ensures users and search engines easily navigate every feature. Our accessibility-first approach allows everyone to benefit from trusted Islamic resources without barriers. </p><p class=\"mt-3 fs-6\" style=\"max-width:850px;margin:0 auto;color:#376d6d;\" data-v-2ba25654> As a growing hub of Quran recitation, learning, and community tools, Islamic Connect offers a modern, dependable space for Muslims seeking clarity, authenticity, and simplicity grounded in a user friendly teal identity. </p></div></div></section><section aria-labelledby=\"services-heading\" data-v-2ba25654><div class=\"py-5 services-section\" data-v-2ba25654><div class=\"container\" data-v-2ba25654><div class=\"row justify-content-center text-center mb-5\" data-v-2ba25654><div class=\"col-lg-8 col-xl-7\" data-v-2ba25654><h2 id=\"services-heading\" class=\"display-4 mb-3 fw-bold\" data-v-2ba25654>What We Offer</h2><p class=\"lead text-muted\" data-v-2ba25654>Comprehensive Islamic resources designed for modern learners</p></div></div><div class=\"row g-4\" data-v-2ba25654><!-- Card 1: Explore with Ease --><div class=\"col-md-6 col-lg-4\" data-v-2ba25654><article class=\"card h-100 border-0 card-20 card-float shadow-sm\" data-v-2ba25654><div class=\"card-body text-center p-4\" data-v-2ba25654><div class=\"my-3\" data-v-2ba25654><img src=\"images/galaxy.png\" width=\"80\" height=\"80\" alt=\"Magnifying glass exploring Islamic content\" loading=\"lazy\" data-v-2ba25654></div><h3 class=\"h3 fw-bold\" data-v-2ba25654>Explore with Ease</h3><p class=\"mb-4 text-muted service-description\" data-v-2ba25654> Search the Quran, Duas, and Seerah effortlessly using simple keywords or topics. Find meaningful content instantly for your spiritual journey. </p></div></article></div><!-- Card 2: Listen, Watch, Reflect --><div class=\"col-md-6 col-lg-4\" data-v-2ba25654><article class=\"card h-100 border-0 card-20 card-float shadow-sm\" data-v-2ba25654><div class=\"card-body text-center p-4\" data-v-2ba25654><div class=\"my-3\" data-v-2ba25654><img src=\"images/watching.png\" width=\"80\" height=\"80\" alt=\"Headphones for audio content\" loading=\"lazy\" data-v-2ba25654></div><h3 class=\"h3 fw-bold\" data-v-2ba25654>Listen, Watch, Reflect</h3><p class=\"mb-4 text-muted service-description\" data-v-2ba25654> Enjoy Quran recitations, insightful podcasts, and Islamic art galleries. Engage spiritually through multimedia content anywhere, anytime. </p></div></article></div><!-- Card 3: Learn Your Way --><div class=\"col-md-6 col-lg-4\" data-v-2ba25654><article class=\"card h-100 border-0 card-20 card-float shadow-sm\" data-v-2ba25654><div class=\"card-body text-center p-4\" data-v-2ba25654><div class=\"my-3\" data-v-2ba25654><img src=\"images/school.png\" width=\"80\" height=\"80\" alt=\"Graduation cap for learning\" loading=\"lazy\" data-v-2ba25654></div><h3 class=\"h3 fw-bold\" data-v-2ba25654>Learn Your Way</h3><p class=\"mb-4 text-muted service-description\" data-v-2ba25654> Text-to-speech, screen reader and keybord navigator support, and bookmarking ensure accessible learning for everyone, regardless of ability. </p></div></article></div></div></div></div></section>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Header "), _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row justify-content-center text-center mb-5"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-10"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "display-5 fw-bold text-dark mb-3"
  }, "Explore Our Most Visited Journeys"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "lead text-muted"
  }, " Hand-curated pathways to Quran, dua, and mission experiences. Each journey features premium spacing, soft corners, and subtle motion to create an immersive experience. ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Cards Grid "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.seoCards, journey => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col",
      key: `journey-${journey.title}`
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(journey.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(journey.desc), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: journey.href,
      title: journey.title,
      class: "mt-auto btn btn-outline-teal btn-sm fw-semibold"
    }, " Explore → ", 8 /* PROPS */, _hoisted_25), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Decorative Accent "), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "card-accent"
    }, null, -1 /* CACHED */))])]);
  }), 128 /* KEYED_FRAGMENT */))])]), _cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"container pt-3\" aria-label=\"Islamic Connect Features\" data-v-2ba25654><!-- First Row - Quran Companion --><div class=\"row py-4 py-lg-5 align-items-center\" data-v-2ba25654><div class=\"col-lg-6 order-2 order-lg-1\" data-v-2ba25654><h2 class=\"h1 fw-bold text-center text-lg-start mb-4\" data-v-2ba25654> Quran Companion: AI-Powered &amp; Accessible </h2><p class=\"lead text-muted text-center text-lg-start mb-4 feature-lead\" data-v-2ba25654> Experience the Quran with advanced AI tools for reading, listening, and understanding. Featuring text-to-speech, screen reader support, and voice search for an accessible, intelligent connection to the Divine. </p><div class=\"d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center\" data-v-2ba25654><a href=\"/quran\" class=\"btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20 feature-cta\" title=\"Explore the Quran Companion\" data-v-2ba25654> Explore Quran </a></div></div><div class=\"col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0\" data-v-2ba25654><picture data-v-2ba25654><source type=\"image/webp\" srcset=\"/images/slide1-md.webp 600w, /images/slide1.webp 1200w\" sizes=\"(max-width: 767px) 90vw, (max-width: 991px) 60vw, 50vw\" data-v-2ba25654><img src=\"/images/slide1.png\" class=\"img-fluid rounded-20 shadow-sm\" alt=\"Quran Companion interface showing AI-powered features and accessibility tools\" loading=\"lazy\" width=\"600\" height=\"400\" data-v-2ba25654></picture></div></div><!-- Second Row - Audio Content --><div class=\"row py-4 py-lg-5 align-items-center\" data-v-2ba25654><div class=\"col-lg-6 mb-4 mb-lg-0\" data-v-2ba25654><picture data-v-2ba25654><source type=\"image/webp\" srcset=\"/images/slide4-md.webp 600w, /images/slide4.webp 1200w\" sizes=\"(max-width: 767px) 90vw, (max-width: 991px) 60vw, 50vw\" data-v-2ba25654><img src=\"/images/slide4.png\" class=\"img-fluid rounded-20 shadow-sm\" alt=\"Islamic podcasts and audio content streaming interface\" loading=\"lazy\" width=\"600\" height=\"400\" data-v-2ba25654></picture></div><div class=\"col-lg-6\" data-v-2ba25654><h2 class=\"h1 fw-bold text-center text-lg-start mb-4\" data-v-2ba25654> Spiritual Content On-The-Go </h2><p class=\"lead text-muted text-center text-lg-start mb-4 feature-lead\" data-v-2ba25654> Access uplifting Islamic podcasts, inspiring audio series, and live radio in one place. Stay spiritually connected through sound and reflection wherever you are. </p><div class=\"d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center\" data-v-2ba25654><a href=\"/media\" class=\"btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20 feature-cta\" title=\"Browse Islamic audio, podcasts, and video\" data-v-2ba25654> Browse Content </a></div></div></div><!-- Third Row - Quran Explorer --><div class=\"row py-4 py-lg-5 align-items-center\" data-v-2ba25654><div class=\"col-lg-6 order-2 order-lg-1\" data-v-2ba25654><h2 class=\"h1 fw-bold text-center text-lg-start mb-4\" data-v-2ba25654> Deep Quran Exploration </h2><p class=\"lead text-muted text-center text-lg-start mb-4 feature-lead\" data-v-2ba25654> Search, explore, and engage with every verse effortlessly. Discover tafsir, translations, and recitations with tools designed for simplicity and spiritual growth. </p><div class=\"d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center\" data-v-2ba25654><a href=\"/surat\" class=\"btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20 feature-cta\" title=\"Start exploring Quranic passages\" data-v-2ba25654> Start Exploring </a></div></div><div class=\"col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0\" data-v-2ba25654><picture data-v-2ba25654><source type=\"image/webp\" srcset=\"/images/slide2-md.webp 600w, /images/slide2.webp 1200w\" sizes=\"(max-width: 767px) 90vw, (max-width: 991px) 60vw, 50vw\" data-v-2ba25654><img src=\"/images/slide2.png\" class=\"img-fluid rounded-20 shadow-sm\" alt=\"Quran exploration interface with search and translation features\" loading=\"lazy\" width=\"600\" height=\"400\" data-v-2ba25654></picture></div></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Stats Section "), _cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"stats-section\" data-v-2ba25654><div class=\"container\" data-v-2ba25654><div class=\"row justify-content-center\" data-v-2ba25654><div class=\"col-lg-10 text-center\" data-v-2ba25654><h2 class=\"section-title\" data-v-2ba25654>Our Impact in Numbers</h2><p class=\"section-lead\" data-v-2ba25654>Measurable results showing how we&#39;re making Islamic knowledge accessible to all</p><div class=\"row container-fluid stats-grid\" data-v-2ba25654><div class=\"col-md-3 col-6 mb-4\" data-v-2ba25654><div class=\"stat-card\" data-v-2ba25654><h3 data-v-2ba25654>85%</h3><p data-v-2ba25654>Accessibility</p><small data-v-2ba25654>Score </small></div></div><div class=\"col-md-3 col-6 mb-4\" data-v-2ba25654><div class=\"stat-card\" data-v-2ba25654><h3 data-v-2ba25654>75+</h3><p data-v-2ba25654>Countries</p><small data-v-2ba25654>Global reach</small></div></div><div class=\"col-md-3 col-6 mb-4\" data-v-2ba25654><div class=\"stat-card\" data-v-2ba25654><h3 data-v-2ba25654>575+</h3><p data-v-2ba25654>Cities/Towns</p><small data-v-2ba25654>Worldwide presence</small></div></div><div class=\"col-md-3 col-6 mb-4\" data-v-2ba25654><div class=\"stat-card\" data-v-2ba25654><h3 data-v-2ba25654>1,090%</h3><p data-v-2ba25654>Growth</p><small data-v-2ba25654>Returning users</small></div></div></div></div></div></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" AI Tools & Features Section - Optimized "), _cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"py-5\" aria-labelledby=\"ai-tools-title\" data-v-2ba25654><div class=\"container pt-3\" data-v-2ba25654><div class=\"row justify-content-center text-center mb-3\" data-v-2ba25654><div class=\"col-lg-8 col-xl-7\" data-v-2ba25654></div><h2 id=\"ai-tools-title\" class=\"h2 mb-3 fw-bold\" data-v-2ba25654>AI-Powered Tools for Enhanced Islamic Learning</h2></div><div class=\"row pt-3 g-4 g-md-5\" data-v-2ba25654><div class=\"col-12\" data-v-2ba25654><p class=\"lead text-center mb-4 tool-lead\" data-v-2ba25654> At Islamic Connect, we leverage advanced AI technology to make Quranic knowledge accessible to everyone. Our tools are designed to empower individuals through inclusive, personalized learning experiences that adapt to diverse abilities and learning preferences. </p></div><!-- Feature 4: Text Summarization --><div class=\"col-md-6\" data-v-2ba25654><div class=\"d-flex h-100\" data-v-2ba25654><div class=\"flex-shrink-0 me-4\" data-v-2ba25654><img src=\"images/content.png\" width=\"60\" height=\"60\" alt=\"Content icon for text summarization feature\" loading=\"lazy\" data-v-2ba25654></div><div class=\"flex-grow-1\" data-v-2ba25654><h3 class=\"h5 mb-2 fw-bold\" data-v-2ba25654>AI Text Summarization</h3><p class=\"mb-0\" data-v-2ba25654> Quickly understand complex Islamic texts with AI-powered summaries. Extract key insights from lengthy content to enhance your learning efficiency. </p></div></div></div><!-- Feature 1: Speech-to-Text --><div class=\"col-md-6 mb-3\" data-v-2ba25654><div class=\"d-flex h-100\" data-v-2ba25654><div class=\"flex-shrink-0 me-4\" data-v-2ba25654><img src=\"images/podcasting.png\" width=\"60\" height=\"60\" alt=\"Microphone icon representing speech-to-text feature\" loading=\"lazy\" data-v-2ba25654></div><div class=\"flex-grow-1\" data-v-2ba25654><h3 class=\"h5 mb-2 fw-bold\" data-v-2ba25654>Speech-to-Text for Islamic Notes</h3><p class=\"mb-0\" data-v-2ba25654> Capture your spoken reflections and thoughts on Islamic teachings effortlessly. Perfect for documenting insights and ensuring accessibility for those who prefer audio input. </p></div></div></div><!-- Feature 5: Audio Sync --><div class=\"col-md-6\" data-v-2ba25654><div class=\"d-flex h-100\" data-v-2ba25654><div class=\"flex-shrink-0 me-4\" data-v-2ba25654><img src=\"images/highlighter.png\" width=\"60\" height=\"60\" alt=\"Highlighter icon for audio synchronization feature\" loading=\"lazy\" data-v-2ba25654></div><div class=\"flex-grow-1\" data-v-2ba25654><h3 class=\"h5 mb-2 fw-bold\" data-v-2ba25654>Word-by-Word Quran Highlighting</h3><p class=\"mb-0\" data-v-2ba25654> Follow Quranic recitations with synchronized text highlighting. Each word lights up as it&#39;s recited, improving pronunciation and comprehension. </p></div></div></div><!-- Feature 6: Text-to-Speech --><div class=\"col-md-6\" data-v-2ba25654><div class=\"d-flex h-100\" data-v-2ba25654><div class=\"flex-shrink-0 me-4\" data-v-2ba25654><img src=\"images/chat.png\" width=\"60\" height=\"60\" alt=\"Chat icon for text-to-speech feature\" loading=\"lazy\" data-v-2ba25654></div><div class=\"flex-grow-1\" data-v-2ba25654><h3 class=\"h5 mb-2 fw-bold\" data-v-2ba25654>Text-to-Speech for Translations</h3><p class=\"mb-0\" data-v-2ba25654> Listen to Quran translations and Tafsir explanations. High-quality audio delivery makes Islamic knowledge accessible while multitasking or for visual impairments. </p></div></div></div></div></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Premium CTA Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row justify-content-center text-center mb-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-8"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    id: "premium-heading",
    class: "fw-bold premium-heading"
  }, " Support The Work, Access More"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "lead text-muted premium-lead"
  }, " Your support sustains this khidmah and keeps Islamic knowledge accessible for everyone. ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Faith-centered quote "), _cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"row justify-content-center mb-4 quote-wrapper bg-white\" data-v-2ba25654><div class=\"col-lg-9\" data-v-2ba25654><div class=\"quote-card\" data-v-2ba25654><!-- Subtle glowing accent --><div class=\"quote-glow\" data-v-2ba25654></div><div class=\"quote-content\" data-v-2ba25654><!-- First Quote --><p class=\"faith-quote\" data-v-2ba25654><span class=\"quote-mark\" aria-hidden=\"true\" data-v-2ba25654>“</span> Whoever treads a path seeking knowledge, Allah will make easy for him a path to Paradise. <span class=\"quote-mark\" aria-hidden=\"true\" data-v-2ba25654>”</span></p><div class=\"quote-ref\" data-v-2ba25654>Hadith — Sahih Muslim</div><!-- Decorative divider --><div class=\"quote-divider\" data-v-2ba25654></div></div></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"col-md-6\" data-v-2ba25654><div class=\"card h-100 border-0 support-card\" data-v-2ba25654><div class=\"card-body p-4 text-start\" data-v-2ba25654><h3 class=\"h4 fw-bold mb-3 support-card-title\" data-v-2ba25654>What your support enables</h3><ul class=\"support-card-list\" data-v-2ba25654><li class=\"mb-2\" data-v-2ba25654><i class=\"fas fa-check text-success me-2\" data-v-2ba25654></i>Keep Quran tools fast, accessible, and ad‑free</li><li class=\"mb-2\" data-v-2ba25654><i class=\"fas fa-check text-success me-2\" data-v-2ba25654></i>Offer trustworthy resources curated with amanah</li><li class=\"mb-2\" data-v-2ba25654><i class=\"fas fa-check text-success me-2\" data-v-2ba25654></i>Deliver new features shaped by your feedback</li><li class=\"mb-2\" data-v-2ba25654><i class=\"fas fa-check text-success me-2\" data-v-2ba25654></i>Make the platform available to those who can’t pay</li></ul></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h4 fw-bold mb-3 support-panel-title"
  }, "Simple and transparent", -1 /* CACHED */)), _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-3 support-panel-text"
  }, "Secure Stripe payments. Cancel anytime. No tracking, no ads. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[0] || (_cache[0] = $event => $options.goTo('/support')),
    class: "support-cta"
  }, [...(_cache[16] || (_cache[16] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-heart me-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Provide a small Donation ", -1 /* CACHED */)]))])]), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "px-4 pb-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center support-cta-note"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-lock"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, "SSL encrypted • PCI compliant")])], -1 /* CACHED */))])])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quick Join Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Enhanced Quick Join Section "), _cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"py-5 quick-join-section\" data-v-2ba25654><div class=\"quick-join-blob quick-join-blob--one\" data-v-2ba25654></div><div class=\"quick-join-blob quick-join-blob--two\" data-v-2ba25654></div><div class=\"quick-join-blob quick-join-blob--three\" data-v-2ba25654></div><div class=\"container quick-join-container\" data-v-2ba25654><div class=\"row align-items-center\" data-v-2ba25654><div class=\"col-lg-7 text-center text-lg-start\" data-v-2ba25654><h2 class=\"text-white fw-bold mb-3 quick-join-heading\" data-v-2ba25654>Ready to Transform Your Daily Spiritual Journey?</h2><p class=\"text-white mb-4 quick-join-subtitle\" data-v-2ba25654> Join now and receive your first spiritual reminder within minutes. Start your day with divine inspiration! </p></div><div class=\"col-lg-5 text-center\" data-v-2ba25654><div class=\"row g-3\" data-v-2ba25654><div class=\"col-12\" data-v-2ba25654><article class=\"join-card join-card-hover rounded-20\" data-v-2ba25654><div class=\"d-flex align-items-center mb-3\" data-v-2ba25654><div class=\"join-card-icon join-card-icon--whatsapp\" data-v-2ba25654><i class=\"fab fa-whatsapp join-card-icon-symbol\" data-v-2ba25654></i></div><div class=\"text-start\" data-v-2ba25654><h3 class=\"join-card-title\" data-v-2ba25654>WhatsApp Channel</h3><small class=\"text-muted\" data-v-2ba25654>Daily verses &amp; instant reminders</small></div></div><a href=\"https://whatsapp.com/channel/0029VbAsOvp59PwIp2zwyB1m\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"btn w-100 rounded-20 join-card-cta join-card-cta--whatsapp\" title=\"Join Islamic Connect WhatsApp channel\" data-v-2ba25654><i class=\"fab fa-whatsapp me-2\" data-v-2ba25654></i>Join WhatsApp Channel <span class=\"join-card-cta-arrow\" data-v-2ba25654>→</span></a></article></div><div class=\"col-12\" data-v-2ba25654><article class=\"join-card join-card-hover rounded-20\" data-v-2ba25654><div class=\"d-flex align-items-center mb-3\" data-v-2ba25654><div class=\"join-card-icon join-card-icon--telegram\" data-v-2ba25654><i class=\"fab fa-telegram join-card-icon-symbol\" data-v-2ba25654></i></div><div class=\"text-start\" data-v-2ba25654><h3 class=\"join-card-title\" data-v-2ba25654>Telegram Community</h3><small class=\"text-muted\" data-v-2ba25654>In-depth content &amp; discussions</small></div></div><a href=\"https://t.me/+r81Q3SEAa-M5ZWI0\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"btn w-100 rounded-20 join-card-cta join-card-cta--telegram\" title=\"Join Islamic Connect Telegram community\" data-v-2ba25654><i class=\"fab fa-telegram me-2\" data-v-2ba25654></i>Join Telegram Community <span class=\"join-card-cta-arrow\" data-v-2ba25654>→</span></a></article></div></div><div class=\"mt-3 hero-trust-badge quick-join-trust\" data-v-2ba25654><div class=\"d-flex align-items-center hero-trust-badge-content\" data-v-2ba25654><i class=\"fas fa-shield-alt text-white\" data-v-2ba25654></i><small class=\"text-white fw-bold\" data-v-2ba25654>100% Free • Easy Subscribe</small></div></div></div></div></div><div class=\"hero-floating-icon quick-join-floating-icon\" data-v-2ba25654><i class=\"fas fa-quran\" data-v-2ba25654></i></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" contact "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row justify-content-center text-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-8 col-xxl-7"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    id: "contact-heading",
    class: "display-5 fw-bold mb-3"
  }, "Get In Touch"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "lead fw-semibold text-muted"
  }, " Have questions or need assistance? We're here to help! Reach out to Islamic Connect for support, feedback, or inquiries about our content and services. ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onReset: _cache[7] || (_cache[7] = (...args) => _ctx.reset && _ctx.reset(...args)),
    onSubmit: _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.sendMessage(), ["prevent"])),
    role: "form",
    "aria-label": "Contact form"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" First Name "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "firstname",
    class: "form-label visually-hidden"
  }, "First Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "firstname",
    class: "form-control form-control-lg bg-light",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.form.firstname = $event),
    name: "firstname",
    placeholder: "First name",
    type: "text",
    "aria-required": "true",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.firstname]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Last Name "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "lastname",
    class: "form-label visually-hidden"
  }, "Last Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "lastname",
    class: "form-control form-control-lg bg-light",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.form.lastname = $event),
    name: "lastname",
    placeholder: "Last name",
    type: "text",
    "aria-required": "true",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.lastname]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Email "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "email",
    class: "form-label visually-hidden"
  }, "Email Address", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "email",
    class: "form-control form-control-lg bg-light",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.form.email = $event),
    name: "email",
    placeholder: "Email address",
    type: "email",
    "aria-required": "true",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.email]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Subject "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "subject",
    class: "form-label visually-hidden"
  }, "Subject", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "subject",
    class: "form-control form-control-lg bg-light",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.form.subject = $event),
    name: "subject",
    placeholder: "Subject",
    type: "text",
    "aria-required": "true",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.subject]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Phone Number "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "mobile",
    class: "form-label visually-hidden"
  }, "Phone Number", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "mobile",
    class: "form-control form-control-lg bg-light",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.form.mobile = $event),
    name: "mobile",
    placeholder: "Phone number (optional)",
    type: "tel",
    pattern: "[0-9]{10,15}",
    title: "Please enter a valid phone number"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.mobile]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Message "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "message",
    class: "form-label visually-hidden"
  }, "Your Message", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    id: "message",
    class: "form-control form-control-lg bg-light",
    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $data.form.message = $event),
    name: "message",
    placeholder: "Your message",
    rows: "5",
    "aria-required": "true",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.message]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Submit Button "), _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"col-12\" data-v-2ba25654><div class=\"d-grid\" data-v-2ba25654><button type=\"submit\" class=\"btn btn-teal rounded-20 btn-lg fw-bold py-3\" data-v-2ba25654><span class=\"d-flex align-items-center justify-content-center\" data-v-2ba25654><i class=\"fas fa-paper-plane me-2\" aria-hidden=\"true\" data-v-2ba25654></i> Send Message </span></button></div></div>", 1))])], 32 /* NEED_HYDRATION */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Remove the container if you want to extend the Footer to full width. "), _cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("footer", {
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
    class: "text-white text-decoration-none fw-bold",
    title: "Visit Islamic Connect homepage"
  }, "islamiconnect.com")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "social text-center text-md-end"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "https://www.facebook.com/profile.php?id=61560313385599",
    "aria-label": "Visit our Facebook page",
    title: "Follow Islamic Connect on Facebook"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fab fa-facebook-f",
    "aria-hidden": "true"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "https://x.com/islamiconnect24",
    "aria-label": "Visit our X (Twitter) profile",
    title: "Follow Islamic Connect on X (Twitter)"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fab fa-twitter",
    "aria-hidden": "true"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "https://www.linkedin.com/company/islamic-connect/",
    "aria-label": "Visit our LinkedIn page",
    title: "Follow Islamic Connect on LinkedIn"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fab fa-linkedin",
    "aria-hidden": "true"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "https://www.instagram.com/islamicconnect24/",
    "aria-label": "Visit our Instagram profile",
    title: "Follow Islamic Connect on Instagram"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fab fa-instagram",
    "aria-hidden": "true"
  })])])])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" End of .container ")], 64 /* STABLE_FRAGMENT */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/AyahOfTheDay.vue?vue&type=template&id=0523142a&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/AyahOfTheDay.vue?vue&type=template&id=0523142a&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=template&id=5ae7cc26&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=template&id=5ae7cc26&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container-fluid mt-3",
  "aria-labelledby": "prayer-times-heading"
};
const _hoisted_2 = {
  class: "text-center container"
};
const _hoisted_3 = {
  class: "row mb-3",
  style: {
    "align-items": "center",
    "text-align": "center"
  }
};
const _hoisted_4 = {
  key: 0,
  class: "text-center mb-4",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_5 = {
  key: 1,
  class: "alert alert-danger text-center",
  role: "alert",
  "aria-live": "assertive"
};
const _hoisted_6 = {
  key: 0,
  class: "row justify-content-center g-3",
  role: "list",
  "aria-label": "Prayer times"
};
const _hoisted_7 = ["aria-current"];
const _hoisted_8 = {
  key: 0,
  class: "badge mt-2 small",
  style: {
    "background": "#0b806f !important",
    "color": "#ffffff !important"
  },
  "aria-label": "Next prayer"
};
const _hoisted_9 = {
  key: 1,
  class: "text-center text-muted mt-4"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Loading State "), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_4, [...(_cache[0] || (_cache[0] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mt-2 text-muted"
  }, "Loading prayer times...", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Only show real errors (critical) errors — not location fallback "), $data.error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [_cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-exclamation-triangle me-2",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.error), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Prayer Times Grid "), $data.prayerTimes && !$data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_6, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredPrayerTimes, (time, prayer) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-6 col-sm-4 col-md-3 col-lg-2",
      key: prayer,
      role: "listitem"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["p-3 text-center rounded shadow-sm h-100 prayer-card", {
        'text-white': prayer === $data.nextPrayer,
        'bg-light': prayer !== $data.nextPrayer
      }]),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(prayer === $data.nextPrayer ? 'background: #1a5f7a !important;' : ''),
      "aria-current": prayer === $data.nextPrayer ? 'true' : 'false'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["h6 fw-bold mb-2", prayer === $data.nextPrayer ? 'text-white' : 'text-dark'])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getPrayerDisplayName(prayer)), 3 /* TEXT, CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "mb-0 fs-5 fw-bold",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(prayer === $data.nextPrayer ? 'color: white !important;' : 'color: #1a5f7a !important;')
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTime(time)), 5 /* TEXT, STYLE */), prayer === $data.nextPrayer ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_8, " Next ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 14 /* CLASS, STYLE, PROPS */, _hoisted_7)]);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Fallback when no data at all "), !$data.prayerTimes && !$data.loading && !$data.error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [...(_cache[2] || (_cache[2] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Unable to load prayer times. Please check your connection.", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=style&index=0&id=2ba25654&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=style&index=0&id=2ba25654&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.seo-benefits li strong[data-v-2ba25654] {\n  display: block;\n  color: #0b5d4b;\n  margin-bottom: 0.25rem;\n}\n.seo-benefits li[data-v-2ba25654] {\n  padding: 0.75rem 1rem;\n  border-radius: 14px;\n  border: 1px solid rgba(13, 128, 111, 0.2);\n  background: #fff;\n  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);\n}\n.quote-wrapper[data-v-2ba25654] {\n  margin: 0;\n  padding: 0;\n  font-family: 'Poppins', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;\n}\n.quote-card[data-v-2ba25654] {\n  background: linear-gradient(145deg, #ffffff, #f3f9f8);\n  border-radius: 16px;\n  border: 1px solid rgba(0, 0, 0, 0.05);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);\n  padding: 32px 24px;\n  color: #1a1a1a;\n  text-align: center;\n  position: relative;\n  overflow: hidden;\n  max-width: 100%;\n  transition: all 0.3s ease;\n}\n.quote-glow[data-v-2ba25654] {\n  position: absolute;\n  top: -70px;\n  right: -70px;\n  width: 150px;\n  height: 150px;\n  background: radial-gradient(circle, rgba(0, 150, 136, 0.15), transparent 70%);\n  z-index: 0;\n}\n.quote-content[data-v-2ba25654] {\n  position: relative;\n  z-index: 1;\n}\n.faith-quote[data-v-2ba25654] {\n  font-size: clamp(1.1rem, 4vw, 1.4rem);\n  line-height: 1.75;\n  margin-bottom: 0.8rem;\n  color: #00332e;\n  font-weight: 600;\n  padding: 0 8px;\n}\n.faith-dua[data-v-2ba25654] {\n  font-size: clamp(1rem, 3.5vw, 1.25rem);\n  line-height: 1.7;\n  margin: 0;\n  color: #00332e;\n  font-weight: 600;\n  padding: 0 8px;\n  opacity: 0;\n  animation: fadeInGlow 3s ease-in-out forwards;\n}\n.quote-mark[data-v-2ba25654] {\n  font-size: 2.2rem;\n  color: #009688;\n  vertical-align: middle;\n  font-weight: 700;\n}\n.faith-dua .quote-mark[data-v-2ba25654] {\n  font-size: 1.8rem;\n}\n.quote-ref[data-v-2ba25654] {\n  text-align: right;\n  font-style: italic;\n  color: #607d8b;\n  font-size: 0.92rem;\n  font-family: 'Nunito Sans', 'Segoe UI', sans-serif;\n  margin-bottom: 1.2rem;\n}\n.dua-ref[data-v-2ba25654] {\n  display: block;\n  margin-top: 6px;\n  font-size: 0.9rem;\n  color: #607d8b;\n  font-family: 'Nunito Sans', 'Segoe UI', sans-serif;\n}\n.quote-divider[data-v-2ba25654] {\n  width: 70px;\n  height: 3px;\n  background: linear-gradient(90deg, #009688, #4db6ac);\n  margin: 0.8rem auto 1.4rem auto;\n  border-radius: 2px;\n}\n@media (max-width: 576px) {\n.faith-quote[data-v-2ba25654],\n  .faith-dua[data-v-2ba25654] {\n    padding: 0 4px;\n}\n.quote-card[data-v-2ba25654] {\n    padding: 24px 16px;\n}\n}\n\n/* Ensure hero title has solid color on small screens for contrast */\n@media (max-width: 576px) {\n.hero-title[data-v-2ba25654] {\n    -webkit-text-fill-color: initial !important;\n    background: none !important;\n    color: #1a5f7a !important;\n}\n}\n.card[data-v-2ba25654]:hover {\n  transform: translateY(-8px) !important;\n  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15) !important;\n}\n\n/* Button focus states for accessibility */\n.btn[data-v-2ba25654]:focus {\n  outline: 3px solid #1a5f7a;\n  outline-offset: 2px;\n}\n\n/* Card focus states */\n.card[data-v-2ba25654]:focus-within {\n  outline: 2px solid rgb(0, 121, 107);\n  outline-offset: 2px;\n}\n.service-1 .card[data-v-2ba25654] {\n  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n}\n.service-1 .card[data-v-2ba25654]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15) !important;\n}\n.service-1 .btn[data-v-2ba25654] {\n  transition: all 0.3s ease;\n}\n.service-1 .btn[data-v-2ba25654]:hover {\n  background: #1a5f7a !important;\n  transform: translateY(-2px);\n}\n\n/* Focus styles for accessibility */\n.service-1 .btn[data-v-2ba25654]:focus {\n  outline: 3px solid #1a5f7a;\n  outline-offset: 2px;\n}\n.service-1 .card[data-v-2ba25654]:focus-within {\n  outline: 2px solid rgb(0, 121, 107);\n  outline-offset: 2px;\n}\n.contact-section[data-v-2ba25654] {\n  /* Performance: Reduce paint operations */\n  transform: translateZ(0);\n  backface-visibility: hidden;\n}\n\n/* Improved focus styles for accessibility */\n.form-control[data-v-2ba25654]:focus {\n  border-color: rgb(0, 121, 107);\n  box-shadow: 0 0 0 0.2rem rgba(0, 191, 166, 0.25);\n  outline: none;\n}\n\n/* Better button states */\n.btn-primary[data-v-2ba25654]:hover {\n  background: #0a6d60 !important;\n  transform: translateY(-1px);\n  transition: all 0.3s ease;\n}\n.btn-primary[data-v-2ba25654]:active {\n  transform: translateY(0);\n}\n@keyframes float-2ba25654 {\n0%,\n  100% {\n    transform: translateY(0) rotate(0deg);\n}\n50% {\n    transform: translateY(-20px) rotate(5deg);\n}\n}\n@keyframes pulse-2ba25654 {\n0%,\n  100% {\n    opacity: 1;\n}\n50% {\n    opacity: 0.5;\n}\n}\n.join-card-hover[data-v-2ba25654]:hover {\n  transform: translateY(-5px) scale(1.02);\n  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;\n}\n\n/* Reduced motion support */\n@media (prefers-reduced-motion: reduce) {\n.card[data-v-2ba25654] {\n    transition: none !important;\n}\n.btn[data-v-2ba25654] {\n    transition: none !important;\n}\n}\n\n/* High contrast mode support */\n@media (prefers-contrast: high) {\n.card[data-v-2ba25654] {\n    border: 2px solid #000 !important;\n}\n.btn[data-v-2ba25654] {\n    border: 2px solid #000 !important;\n}\n}\n\n/* Mobile Responsiveness */\n@media (max-width: 768px) {\n.contact-section[data-v-2ba25654] {\n    padding: 2rem 0 !important;\n}\n.form-control-lg[data-v-2ba25654] {\n    font-size: 1rem !important;\n    padding: 0.75rem 1rem !important;\n}\n.btn-lg[data-v-2ba25654] {\n    padding: 0.875rem 1.5rem !important;\n    font-size: 1rem !important;\n}\n.card-body[data-v-2ba25654] {\n    padding: 1.5rem !important;\n}\n.display-4[data-v-2ba25654] {\n    font-size: 2.5rem !important;\n}\n.btn[data-v-2ba25654] {\n    padding: 1rem !important;\n    font-size: 1rem;\n}\n.service-1 .card-body[data-v-2ba25654] {\n    padding: 1.5rem !important;\n}\n.service-1 h1[data-v-2ba25654] {\n    font-size: 2.5rem !important;\n}\n.service-1 .btn[data-v-2ba25654] {\n    padding: 1rem !important;\n    font-size: 1rem;\n}\n.quick-join-section[data-v-2ba25654] {\n    padding: 3rem 0 !important;\n}\n.quick-join-section h2[data-v-2ba25654] {\n    font-size: 2rem !important;\n    text-align: center !important;\n}\n.join-card-hover[data-v-2ba25654] {\n    margin-bottom: 1rem;\n}\n}\n.partner-icon[data-v-2ba25654] {\n  width: 120px;\n  height: 120px;\n  -o-object-fit: contain;\n     object-fit: contain;\n  transition: filter 0.3s ease, transform 0.3s ease;\n}\n.partner-icon[data-v-2ba25654]:hover {\n  transform: scale(1.1);\n}\n@media (max-width: 576px) {\n.partner-icon[data-v-2ba25654] {\n    width: 64px;\n    height: 64px;\n}\nh5[data-v-2ba25654] {\n    font-size: 1.25rem;\n}\np.fs-6[data-v-2ba25654] {\n    font-size: 1.3rem;\n}\n}\n.controls[data-v-2ba25654] {\n  margin-top: 20px;\n}\n.controls button[data-v-2ba25654] {\n  margin: 5px;\n  padding: 10px 20px;\n  border: none;\n  background-color: rgb(13, 182, 145);\n  color: white;\n  border-radius: 5px;\n  cursor: pointer;\n  font-weight: bold;\n  transition: background 0.3s ease;\n}\n.controls button[data-v-2ba25654]:disabled {\n  background-color: #bdc3c7;\n  cursor: not-allowed;\n}\n.controls button[data-v-2ba25654]:hover:not(:disabled) {\n  background-color: rgb(0, 121, 107);\n}\n\n/* .service-1 {\n  font-family: \"Montserrat\", sans-serif;\n  color: #8d97ad;\n  font-weight: 300;\n} */\n.service-1 h1[data-v-2ba25654],\n.service-1 h2[data-v-2ba25654],\n.service-1 h3[data-v-2ba25654],\n.service-1 h4[data-v-2ba25654],\n.service-1 h5[data-v-2ba25654],\n.service-1 h6[data-v-2ba25654] {\n  color: #3e4555;\n}\n.service-1 .font-weight-medium[data-v-2ba25654] {\n  font-weight: 500;\n}\n.service-1 .bg-light[data-v-2ba25654] {\n  background-color: #f4f8fa !important;\n}\n.service-1 .subtitle[data-v-2ba25654] {\n  color: #8d97ad;\n  line-height: 24px;\n}\n.service-1 .card.card-shadow[data-v-2ba25654] {\n  box-shadow: 0px 0px 30px rgba(115, 128, 157, 0.1);\n}\n.service-1 .wrap-service1-box .card-body[data-v-2ba25654] {\n  padding: 40px;\n}\n.service-1 .btn-success-gradiant[data-v-2ba25654] {\n  background: #2cdd9b;\n  background: linear-gradient(to right, #2cdd9b 0%, #1dc8cc 100%);\n  border: 0px;\n}\n.service-1 .btn-success-gradiant[data-v-2ba25654]:hover {\n  background: #1dc8cc;\n  background: linear-gradient(to right, #1dc8cc 0%, #2cdd9b 100%);\n}\n.service-1 .btn-md[data-v-2ba25654] {\n  padding: 15px 45px;\n  font-size: 16px;\n}\n.jumbotron-overlay[data-v-2ba25654] {\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.6);\n  z-index: 1;\n}\n.jumbotron-content[data-v-2ba25654] {\n  position: relative;\n  z-index: 2;\n}\n\n/* CSS */\n.button-37[data-v-2ba25654] {\n  background-color: rgb(53, 163, 139);\n  border: 1px solid darkgreen;\n  border-radius: 4px;\n  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0;\n  box-sizing: border-box;\n  color: #fff;\n  cursor: pointer;\n  font-family: \"Akzidenz Grotesk BQ Medium\", -apple-system, BlinkMacSystemFont,\n    sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n  outline: none;\n  outline: 0;\n  padding: 10px 25px;\n  text-align: center;\n  transform: translateY(0);\n  transition: transform 150ms, box-shadow 150ms;\n  -moz-user-select: none;\n       user-select: none;\n  -webkit-user-select: none;\n  touch-action: manipulation;\n}\n.button-37[data-v-2ba25654]:hover {\n  box-shadow: rgba(0, 0, 0, 0.15) 0 3px 9px 0;\n  transform: translateY(-2px);\n}\n@media (min-width: 768px) {\n.img-mobile-bigger[data-v-2ba25654] {\n    width: 160%;\n}\n.button-37[data-v-2ba25654] {\n    padding: 10px 30px;\n}\n.controls {\n.controls[data-v-2ba25654] {\n      margin-top: 20px;\n}\n.controls button[data-v-2ba25654] {\n      margin: 5px;\n      padding: 10px 20px;\n      border: none;\n      background-color: darkgreen;\n      color: white;\n      border-radius: 5px;\n      cursor: pointer;\n      font-weight: bold;\n      transition: background 0.3s ease;\n}\n.controls button[data-v-2ba25654]:disabled {\n      background-color: #bdc3c7;\n      cursor: not-allowed;\n}\n.controls button[data-v-2ba25654]:hover:not(:disabled) {\n      background-color: darkgreen;\n}\n}\n}\n\n/* Shared footer styles for consistent spacing across pages */\n.ic-footer[data-v-2ba25654] {\n  background: linear-gradient(135deg, rgb(0, 121, 107), #1a5f7a);\n}\n.ic-footer .footer-inner[data-v-2ba25654] {\n  padding: 1rem 1rem;\n  padding-bottom: calc(1rem + env(safe-area-inset-bottom));\n}\n@media (min-width: 768px) {\n.ic-footer .footer-inner[data-v-2ba25654] {\n    padding: 1rem 2rem;\n}\n}\n.ic-footer .copyright[data-v-2ba25654] {\n  font-weight: 700;\n}\n.ic-footer .social a[data-v-2ba25654] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  margin-left: .5rem;\n  border: 1px solid rgba(255, 255, 255, .5);\n  border-radius: 8px;\n  color: #fff;\n  transition: background .2s ease, border-color .2s ease, transform .2s ease;\n}\n.ic-footer .social a[data-v-2ba25654]:hover {\n  background: rgba(255, 255, 255, .1);\n  border-color: #fff;\n  transform: translateY(-1px);\n}\n@media (max-width: 575.98px) {\n.ic-footer .social a[data-v-2ba25654] {\n    width: 36px;\n    height: 36px;\n    margin: .25rem;\n}\n.ic-footer .copyright[data-v-2ba25654] {\n    text-align: center;\n}\n.ic-footer .footer-inner[data-v-2ba25654] {\n    gap: .75rem;\n}\n}\n.hero-carousel-placeholder[data-v-2ba25654] {\n  border-radius: 32px;\n  min-height: 360px;\n  background: linear-gradient(160deg, #0b806f, #0b5d4b);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  overflow: hidden;\n}\n.hero-carousel-placeholder__content[data-v-2ba25654] {\n  color: rgba(255, 255, 255, 0.85);\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n}\n.hero-carousel-placeholder__ring[data-v-2ba25654] {\n  width: 90px;\n  height: 90px;\n  border-radius: 50%;\n  border: 3px dashed rgba(255, 255, 255, 0.6);\n  animation: placeholder-spin-2ba25654 4s linear infinite;\n}\n.hero-carousel-placeholder__text[data-v-2ba25654] {\n  font-weight: 500;\n  font-size: 1rem;\n  max-width: 220px;\n}\n@keyframes placeholder-spin-2ba25654 {\nfrom {\n    transform: rotate(0deg);\n}\nto {\n    transform: rotate(360deg);\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=style&index=1&id=2ba25654&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=style&index=1&id=2ba25654&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.hero-jumbotron[data-v-2ba25654] {\n  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;\n}\n.hero-layout[data-v-2ba25654] {\n  position: relative;\n}\n.hero-stage[data-v-2ba25654] {\n  position: relative;\n  overflow: hidden;\n}\n.hero-floating[data-v-2ba25654] {\n  position: absolute;\n  z-index: 0;\n  border-radius: 50%;\n}\n.hero-floating--primary[data-v-2ba25654] {\n  right: -10%;\n  width: 400px;\n  height: 400px;\n  animation: float 8s ease-in-out infinite;\n}\n.hero-floating--secondary[data-v-2ba25654] {\n  bottom: -30%;\n  left: -5%;\n  width: 300px;\n  height: 300px;\n  background: linear-gradient(135deg, rgba(26, 95, 122, 0.08), rgba(0, 191, 166, 0.08));\n  animation: float 6s ease-in-out infinite 2s;\n}\n.hero-row[data-v-2ba25654] {\n  position: relative;\n  z-index: 2;\n}\n.hero-badge[data-v-2ba25654] {\n  background: linear-gradient(135deg, rgb(0, 121, 107), #1a5f7a);\n  color: white;\n  padding: 0.5rem 1.5rem;\n  border-radius: 50px;\n  display: inline-block;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 5px 15px rgba(0, 191, 166, 0.3);\n  font-weight: 600;\n  font-size: 0.9rem;\n  letter-spacing: 0.5px;\n}\n.hero-title[data-v-2ba25654] {\n  background: linear-gradient(135deg, #1a5f7a, #2c3e50);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  line-height: 1.2;\n  margin-bottom: 1.5rem;\n  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  font-size: 3.5rem;\n}\n.hero-subtitle[data-v-2ba25654] {\n  line-height: 1.8em;\n  font-size: 1.3rem;\n  color: #4a5568;\n  font-weight: 500;\n  margin-bottom: 1.25rem;\n  padding-right: 1rem;\n}\n.hero-controls[data-v-2ba25654] {\n  gap: 1rem;\n}\n.hero-cta-outline[data-v-2ba25654] {\n  background: rgba(255, 255, 255, 0.9);\n  color: #1a5f7a;\n  border: 2px solid #1a5f7a;\n  transition: all 0.2s ease;\n}\n.hero-cta-outline[data-v-2ba25654]:hover,\n.hero-cta-outline[data-v-2ba25654]:focus-visible {\n  background: #1a5f7a;\n  color: #fff;\n}\n.hero-trust-indicators[data-v-2ba25654] {\n  gap: 1.5rem;\n}\n.trust-label[data-v-2ba25654] {\n  color: #4a5568;\n  font-weight: 600;\n}\n.prayer-title[data-v-2ba25654] {\n  color: black;\n  font-weight: 800;\n}\n.services-section[data-v-2ba25654] {\n  background: #f8f9fa;\n}\n.service-description[data-v-2ba25654] {\n  font-size: 16px;\n  line-height: 1.6;\n}\n.feature-lead[data-v-2ba25654],\n.tool-lead[data-v-2ba25654] {\n  line-height: 1.7;\n}\n.feature-cta[data-v-2ba25654] {\n  min-width: 160px;\n}\n.premium-heading[data-v-2ba25654] {\n  font-size: 2.25rem;\n  color: #1a5f7a;\n}\n.premium-lead[data-v-2ba25654] {\n  line-height: 1.7;\n}\n.support-card[data-v-2ba25654] {\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);\n}\n.support-card-title[data-v-2ba25654] {\n  color: #2c3e50;\n}\n.support-card-list[data-v-2ba25654] {\n  list-style: none;\n  padding-left: 0;\n  color: #4a5568;\n  line-height: 1.7;\n}\n.support-panel[data-v-2ba25654] {\n  background: #fff;\n  border-radius: 12px;\n  border: 1px solid #e9ecef;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);\n}\n.support-panel-title[data-v-2ba25654] {\n  color: #2c3e50;\n}\n.support-panel-text[data-v-2ba25654] {\n  color: #4a5568;\n}\n.support-cta[data-v-2ba25654] {\n  background: rgba(255, 255, 255, 0.9);\n  color: #1a5f7a;\n  border: 2px solid #1a5f7a;\n  padding: 1rem 2rem;\n  border-radius: 12px;\n  font-weight: 700;\n  font-size: 1.1rem;\n  box-shadow: 0 5px 20px rgba(26, 95, 122, 0.2);\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  backdrop-filter: blur(10px);\n}\n.support-cta[data-v-2ba25654]:hover,\n.support-cta[data-v-2ba25654]:focus-visible {\n  transform: translateY(-2px);\n  background: #1a5f7a;\n  color: #fff;\n  box-shadow: 0 8px 25px rgba(26, 95, 122, 0.4);\n}\n.support-cta-note[data-v-2ba25654] {\n  gap: 0.5rem;\n  color: #6c757d;\n}\n.quick-join-section[data-v-2ba25654] {\n  background: linear-gradient(135deg, rgb(0, 121, 107), #1a5f7a);\n  position: relative;\n  overflow: hidden;\n}\n.quick-join-blob[data-v-2ba25654] {\n  position: absolute;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.1);\n  animation: float 8s ease-in-out infinite;\n  z-index: 0;\n}\n.quick-join-blob--one[data-v-2ba25654] {\n  top: -50%;\n  right: -10%;\n  width: 300px;\n  height: 300px;\n}\n.quick-join-blob--two[data-v-2ba25654] {\n  bottom: -30%;\n  left: -5%;\n  width: 200px;\n  height: 200px;\n  animation-delay: 2s;\n}\n.quick-join-blob--three[data-v-2ba25654] {\n  top: 20%;\n  left: 10%;\n  width: 100px;\n  height: 100px;\n  background: rgba(255, 255, 255, 0.05);\n  animation-delay: 1s;\n}\n.quick-join-container[data-v-2ba25654] {\n  position: relative;\n  z-index: 2;\n}\n.quick-join-heading[data-v-2ba25654] {\n  font-size: 2.5rem;\n  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);\n}\n.quick-join-subtitle[data-v-2ba25654] {\n  font-size: 1.2rem;\n  opacity: 0.98;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.45);\n}\n.join-card[data-v-2ba25654] {\n  background: rgba(255, 255, 255, 0.95);\n  padding: 1.5rem;\n  border-radius: 20px;\n  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  backdrop-filter: blur(10px);\n  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  position: relative;\n  overflow: hidden;\n}\n.join-card-icon[data-v-2ba25654] {\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  margin-right: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.12);\n}\n.join-card-icon--whatsapp[data-v-2ba25654] {\n  background: linear-gradient(135deg, #25d366, #128c7e);\n  box-shadow: 0 5px 15px rgba(37, 211, 102, 0.4);\n}\n.join-card-icon--telegram[data-v-2ba25654] {\n  background: linear-gradient(135deg, #0088cc, #006699);\n  box-shadow: 0 5px 15px rgba(0, 136, 204, 0.4);\n}\n.join-card-icon-symbol[data-v-2ba25654] {\n  color: #fff;\n  font-size: 1.5rem;\n}\n.join-card-title[data-v-2ba25654] {\n  color: #1a5f7a;\n  margin: 0;\n}\n.join-card-cta[data-v-2ba25654] {\n  font-weight: 700;\n  padding: 1rem 2rem;\n  border-radius: 12px;\n  font-size: 1.1rem;\n  border: none;\n  transition: all 0.3s ease;\n  position: relative;\n  overflow: hidden;\n}\n.join-card-cta--whatsapp[data-v-2ba25654] {\n  background: linear-gradient(135deg, #25d366, #128c7e);\n  color: #fff;\n  box-shadow: 0 5px 15px rgba(37, 211, 102, 0.4);\n}\n.join-card-cta--telegram[data-v-2ba25654] {\n  background: linear-gradient(135deg, #0088cc, #006699);\n  color: #fff;\n  box-shadow: 0 5px 15px rgba(0, 136, 204, 0.4);\n}\n.join-card-cta[data-v-2ba25654]:hover,\n.join-card-cta[data-v-2ba25654]:focus-visible {\n  transform: translateY(-2px);\n}\n.join-card-cta-arrow[data-v-2ba25654] {\n  position: absolute;\n  top: 50%;\n  right: 1rem;\n  transform: translateY(-50%);\n  font-size: 0.9rem;\n  opacity: 0.9;\n}\n.hero-floating-icon[data-v-2ba25654] {\n  position: absolute;\n  bottom: 20px;\n  right: 20px;\n  opacity: 0.1;\n  font-size: 3rem;\n  animation: float 4s ease-in-out infinite;\n}\n.quick-join-floating-icon[data-v-2ba25654] {\n  left: auto;\n}\n.contact-section-card[data-v-2ba25654] {\n  background: #fff;\n  box-shadow: 0 7px 29px rgba(100, 100, 111, 0.2);\n}\n.journeys-section[data-v-2ba25654] {\n  background: #fefefe;\n}\n.journey-card[data-v-2ba25654] {\n  background: linear-gradient(145deg, #ffffff, #f0f9f9);\n  border-radius: 1.25rem;\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.07);\n  transition: all 0.35s ease-in-out;\n  position: relative;\n  overflow: hidden;\n}\n.journey-card[data-v-2ba25654]:hover {\n  transform: translateY(-8px) scale(1.03);\n  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);\n}\n.btn-outline-teal[data-v-2ba25654] {\n  color: #0d6a6f;\n  border-color: #0d6a6f;\n  transition: all 0.3s;\n}\n.btn-outline-teal[data-v-2ba25654]:hover {\n  background-color: #14b8a6;\n  border-color: #14b8a6;\n  color: #fff;\n}\n.card-accent[data-v-2ba25654] {\n  content: '';\n  position: absolute;\n  bottom: -20px;\n  right: -40px;\n  width: 100px;\n  height: 100px;\n  background: rgba(20, 184, 166, 0.1);\n  border-radius: 50%;\n  transition: all 0.4s;\n}\n.journey-card:hover .card-accent[data-v-2ba25654] {\n  bottom: -10px;\n  right: -20px;\n  width: 120px;\n  height: 120px;\n}\n\n/* Combined Section */\n.combined-section[data-v-2ba25654] {\n  padding: 80px 0;\n  background: #f8f9fa;\n}\n\n/* Performance optimizations */\n.img-fluid[data-v-2ba25654] {\n  max-width: 100%;\n  height: auto;\n}\n.rounded-3[data-v-2ba25654] {\n  border-radius: 0.75rem !important;\n}\n.shadow-sm[data-v-2ba25654] {\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;\n}\n\n/* Improved button styling */\n.btn-primary[data-v-2ba25654] {\n  transition: all 0.2s ease-in-out;\n}\n.btn-primary[data-v-2ba25654]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 191, 166, 0.3);\n}\n\n/* Value Cards */\n.value-card[data-v-2ba25654] {\n  background: #fafbfc;\n  padding: 2rem 1.5rem;\n  border-radius: 12px;\n  border: 1px solid #e9ecef;\n  height: 100%;\n  transition: all 0.3s ease;\n  position: relative;\n  overflow: hidden;\n}\n.value-card[data-v-2ba25654]::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 4px;\n  height: 100%;\n  background: #1a5f7a;\n  transform: scaleY(0);\n  transition: transform 0.3s ease;\n}\n.value-card[data-v-2ba25654]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\n}\n.value-card[data-v-2ba25654]:hover::before {\n  transform: scaleY(1);\n}\n.value-icon[data-v-2ba25654] {\n  font-size: 1.75rem;\n  margin-bottom: 1rem;\n  opacity: 0.8;\n}\n.value-card h4[data-v-2ba25654] {\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: #1a5f7a;\n  margin-bottom: 1rem;\n}\n.value-card p[data-v-2ba25654] {\n  color: #6c757d;\n  line-height: 1.6;\n  margin: 0;\n  font-size: 0.95rem;\n}\n\n/* Donation Section */\n.donation-form[data-v-2ba25654] {\n  background: #fff;\n  padding: 3rem;\n  border-radius: 16px;\n  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);\n  border: 1px solid #e9ecef;\n  position: relative;\n  height: 100%;\n}\n.donation-form[data-v-2ba25654]::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background: linear-gradient(90deg, #1a5f7a, #2c3e50);\n  border-radius: 16px 16px 0 0;\n}\n.form-header h3[data-v-2ba25654] {\n  font-size: 1.75rem;\n  padding-top: 5px;\n  font-weight: 800;\n  color: #2c3e50;\n}\n.form-header h2[data-v-2ba25654] {\n  font-size: 1.75rem;\n  font-weight: 800;\n  color: #2c3e50;\n}\n.form-header p[data-v-2ba25654] {\n  font-size: 1.1rem;\n  color: #6c757d;\n}\n\n/* Trust Indicators */\n.trust-indicators[data-v-2ba25654] {\n  display: flex;\n  justify-content: space-around;\n  padding: 1rem;\n  background: #f8f9fa;\n  border-radius: 8px;\n  border: 1px solid #e9ecef;\n}\n.trust-item[data-v-2ba25654] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.85rem;\n  color: #495057;\n  font-weight: 500;\n}\n.trust-item i[data-v-2ba25654] {\n  color: #1a5f7a;\n}\n\n/* Enhanced Summary */\n.summary-section[data-v-2ba25654] {\n  background: #f8f9fa;\n  padding: 1.5rem;\n  border-radius: 12px;\n  border-left: 4px solid #1a5f7a;\n}\n.summary-header[data-v-2ba25654] {\n  margin-bottom: 1rem;\n  padding-bottom: 0.5rem;\n  border-bottom: 1px solid #dee2e6;\n}\n.summary-header h6[data-v-2ba25654] {\n  margin: 0;\n  color: #2c3e50;\n  font-weight: 600;\n}\n.summary-item[data-v-2ba25654] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem 0;\n}\n.summary-item[data-v-2ba25654]:not(:last-child) {\n  border-bottom: 1px solid #dee2e6;\n}\n\n/* Enhanced Primary Button */\n.btn-primary[data-v-2ba25654] {\n  background: #1a5f7a;\n  border: none;\n  color: white;\n  padding: 1.25rem 2rem;\n  font-weight: 600;\n  border-radius: 12px;\n  transition: all 0.3s ease;\n  font-size: 1.1rem;\n  position: relative;\n  overflow: hidden;\n}\n.btn-primary[data-v-2ba25654]:hover:not(:disabled) {\n  background: #144a5f;\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(26, 95, 122, 0.4);\n}\n.btn-primary[data-v-2ba25654]:disabled {\n  background: #6c757d;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.security-guarantee[data-v-2ba25654] {\n  padding: 1rem;\n  background: #f8f9fa;\n  border-radius: 8px;\n  border: 1px solid #e9ecef;\n}\n.card[data-v-2ba25654]:hover {\n  transform: translateY(-5px);\n}\n.stats-section[data-v-2ba25654] {\n  padding: 5rem 0;\n  background: linear-gradient(135deg, #1a5f7a 0%, #2c3e50 100%);\n  color: white;\n}\n.section-title[data-v-2ba25654] {\n  font-size: 2.7rem;\n  font-weight: 700;\n  margin-bottom: 1rem;\n  color: white;\n}\n.section-lead[data-v-2ba25654] {\n  font-size: 1.2rem;\n  margin-bottom: 3rem;\n  opacity: 0.9;\n  color: rgba(255, 255, 255, 0.9);\n}\n.stats-grid[data-v-2ba25654] {\n  margin-top: 2rem;\n}\n.stat-card[data-v-2ba25654] {\n  text-align: center;\n  padding: 1.5rem;\n}\n.stat-card h3[data-v-2ba25654] {\n  font-size: 2.75rem;\n  font-weight: 700;\n  margin-bottom: 0.5rem;\n  color: white;\n}\n.stat-card p[data-v-2ba25654] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  margin-bottom: 0.25rem;\n  color: rgba(255, 255, 255, 0.9);\n}\n.stat-card small[data-v-2ba25654] {\n  font-size: 0.9rem;\n  color: rgba(255, 255, 255, 0.7);\n}\n.value-section[data-v-2ba25654] {\n  padding: 5rem 0;\n  background: #f8f9fa;\n}\n.value-section h2[data-v-2ba25654] {\n  font-size: 2.25rem;\n  font-weight: 700;\n  color: #2c3e50;\n}\n.value-card[data-v-2ba25654] {\n  background: white;\n  padding: 2.5rem;\n  border-radius: 12px;\n  border: 1px solid #e9ecef;\n  height: 100%;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n.value-card[data-v-2ba25654]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\n}\n.value-card h4[data-v-2ba25654] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: #1a5f7a;\n  margin-bottom: 1rem;\n}\n.value-card p[data-v-2ba25654] {\n  color: #6c757d;\n  line-height: 1.6;\n  margin: 0;\n}\n\n/* Responsive Design */\n@media (max-width: 768px) {\n.stats-section[data-v-2ba25654],\n  .value-section[data-v-2ba25654] {\n    padding: 3rem 0;\n}\n.section-title[data-v-2ba25654] {\n    font-size: 2rem;\n}\n.stat-card h3[data-v-2ba25654] {\n    font-size: 2.25rem;\n}\n.value-card[data-v-2ba25654] {\n    padding: 2rem;\n}\n}\n.partner-icon[data-v-2ba25654] {\n  width: 150px;\n  height: 150px;\n  -o-object-fit: contain;\n     object-fit: contain;\n  transition: filter 0.3s ease, transform 0.3s ease;\n}\n.partner-icon[data-v-2ba25654]:hover {\n  transform: scale(1.1);\n}\nh4[data-v-2ba25654] {\n  font-size: 1.8rem;\n  font-weight: 800;\n}\n@media (max-width: 991.98px) {\n.h1[data-v-2ba25654] {\n    font-size: 2rem !important;\n}\n.lead[data-v-2ba25654] {\n    font-size: 1.1rem;\n}\n.py-4[data-v-2ba25654] {\n    padding-top: 2rem !important;\n    padding-bottom: 2rem !important;\n}\n}\n\n/* Reduced motion support */\n@media (prefers-reduced-motion: reduce) {\n.btn-primary[data-v-2ba25654] {\n    transition: none;\n}\n.btn-primary[data-v-2ba25654]:hover {\n    transform: none;\n}\n}\n\n/* High contrast mode support */\n@media (prefers-contrast: high) {\n.text-muted[data-v-2ba25654] {\n    color: #000 !important;\n}\n.shadow-sm[data-v-2ba25654] {\n    box-shadow: 0 0 0 2px #000 !important;\n}\n}\n@media (max-width: 768px) {\n.partner-icon[data-v-2ba25654] {\n    width: 130px;\n    height: 130px;\n}\nh4[data-v-2ba25654] {\n    font-size: 1.45rem;\n}\n}\n\n/* Utilities for consistent 20px rounded aesthetic and subtle animations */\n.rounded-20[data-v-2ba25654] {\n  border-radius: 20px !important;\n}\n.card-20[data-v-2ba25654] {\n  border-radius: 20px;\n  overflow: hidden;\n}\n.card-float[data-v-2ba25654] {\n  transition: transform .25s ease, box-shadow .25s ease;\n}\n.card-float[data-v-2ba25654]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 10px 24px rgba(0, 0, 0, .12) !important;\n}\n.btn-teal[data-v-2ba25654] {\n  background-color: #0db691;\n  color: #fff;\n  border: none;\n  transition: background-color .2s ease, transform .2s ease, box-shadow .2s ease;\n}\n.btn-teal[data-v-2ba25654]:hover {\n  background-color: #0aa07f;\n  color: #fff;\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(0, 0, 0, .15);\n}\n.btn-teal[data-v-2ba25654]:focus-visible {\n  outline: none;\n  animation: focusPulse-2ba25654 .6s ease;\n}\n@keyframes focusPulse-2ba25654 {\n0% {\n    box-shadow: 0 0 0 0 rgba(13, 182, 145, .45);\n}\n100% {\n    box-shadow: 0 0 0 8px rgba(13, 182, 145, 0);\n}\n}\n@media (prefers-reduced-motion: reduce) {\n.card-float[data-v-2ba25654],\n  .btn-teal[data-v-2ba25654] {\n    transition: none !important;\n    animation: none !important;\n}\n}\n.premium-seo[data-v-2ba25654] {\n  background: rgba(255, 255, 255, 0.8);\n  border-radius: 32px;\n  padding: 3rem 0 4.5rem;\n  box-shadow: 0 30px 70px rgba(13, 128, 111, 0.1);\n  overflow: hidden;\n  position: relative;\n}\n.premium-card[data-v-2ba25654] {\n  background: #fff;\n  border-radius: 20px;\n  padding: 1.5rem;\n  border: 1px solid #e3e8ed;\n  box-shadow: 0 25px 40px rgba(15, 76, 117, 0.08);\n  transition: transform .35s ease, box-shadow .35s ease;\n}\n.premium-card[data-v-2ba25654]:hover {\n  transform: translateY(-6px);\n  box-shadow: 0 35px 45px rgba(9, 70, 102, 0.15);\n}\n.premium-card h3[data-v-2ba25654] {\n  font-size: 1rem;\n}\n.premium-stat[data-v-2ba25654] {\n  border-radius: 18px;\n  background: linear-gradient(145deg, rgba(13, 128, 111, 0.08), rgba(12, 112, 95, 0.07));\n  border: 1px solid rgba(13, 128, 111, 0.15);\n  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4);\n  animation: pulse-2ba25654 6s ease-in-out infinite;\n}\n.text-teal[data-v-2ba25654] {\n  color: #0db691;\n}\n.highlight-badge[data-v-2ba25654] {\n  border-radius: 999px;\n  padding: 0.35rem 1rem;\n  font-size: 0.75rem;\n  letter-spacing: 0.08em;\n  background: rgba(13, 128, 111, 0.12);\n  color: #0b806f;\n  border: 1px solid rgba(13, 128, 111, 0.2);\n}\n@keyframes pulse-2ba25654 {\n0% {\n    transform: translateY(0);\n}\n50% {\n    transform: translateY(-4px);\n}\n100% {\n    transform: translateY(0);\n}\n}\n.premium-seo__backdrop[data-v-2ba25654] {\n  position: absolute;\n  width: 420px;\n  height: 420px;\n  border-radius: 50%;\n  right: -90px;\n  top: -120px;\n  background: radial-gradient(circle, rgba(13, 128, 111, 0.25), transparent 60%);\n  filter: blur(12px);\n  z-index: 0;\n  animation: float-glow-2ba25654 12s ease-in-out infinite;\n}\n.premium-seo .container[data-v-2ba25654] {\n  position: relative;\n  z-index: 1;\n}\n@keyframes float-glow-2ba25654 {\n0% {\n    transform: translateY(0);\n}\n50% {\n    transform: translateY(-8px);\n}\n100% {\n    transform: translateY(0);\n}\n}\n.journeys-section[data-v-2ba25654] {\n  max-width: 1100px;\n}\n.journeys-section .premium-card[data-v-2ba25654] {\n  min-height: 180px;\n  justify-content: space-between;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/AyahOfTheDay.vue?vue&type=style&index=0&id=0523142a&scoped=true&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/AyahOfTheDay.vue?vue&type=style&index=0&id=0523142a&scoped=true&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.ayah-container[data-v-0523142a] {\n  margin: 2rem auto;\n  padding: 0;\n  background: white;\n  border-radius: 20px;\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;\n  overflow: hidden;\n}\n\n/* Header */\n.ayah-header[data-v-0523142a] {\n  padding: 1.5rem 2rem 1rem;\n  border-bottom: 1px solid #f0f0f0;\n}\n.header-content[data-v-0523142a] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n.title-section[data-v-0523142a] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n}\n.icon-wrapper[data-v-0523142a] {\n  width: 40px;\n  height: 40px;\n  background: linear-gradient(135deg, #228B22 0%, #1a6b1a 100%);\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 1.1rem;\n}\n.title[data-v-0523142a] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #1a1a1a;\n  margin: 0 0 0.25rem 0;\n  line-height: 1.2;\n}\n.subtitle[data-v-0523142a] {\n  font-size: 0.875rem;\n  color: #666;\n  margin: 0;\n  font-weight: 400;\n}\n.close-btn[data-v-0523142a] {\n  background: none;\n  border: none;\n  font-size: 1.25rem;\n  /* Improve contrast for close icon */\n  color: #666;\n  cursor: pointer;\n  padding: 0.5rem;\n  border-radius: 8px;\n  transition: all 0.2s ease;\n}\n.close-btn[data-v-0523142a]:hover {\n  background: #f5f5f5;\n  color: #666;\n}\n\n/* Main Content */\n.ayah-content[data-v-0523142a] {\n  padding: 0 2rem;\n}\n.surah-info[data-v-0523142a] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin: 1.5rem 0 2rem;\n}\n.surah-badge[data-v-0523142a] {\n  background: #f8f9fa;\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #555;\n}\n.ayah-ref[data-v-0523142a] {\n  font-size: 0.875rem;\n  /* Increase contrast for reference text */\n  color: #666;\n  font-weight: 500;\n}\n\n/* Arabic Section */\n.arabic-section[data-v-0523142a] {\n  text-align: center;\n  margin: 2rem 0;\n}\n.arabic-text[data-v-0523142a] {\n  font-family: \"Amiri\", \"Scheherazade New\", \"Lateef\", serif;\n  direction: rtl;\n  line-height: 2.2;\n  color: #1a1a1a;\n  font-weight: 600;\n  margin: 0 0 1.5rem 0;\n  text-align: justify;\n}\n.decoration[data-v-0523142a] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  color: #ddd;\n}\n.decoration-line[data-v-0523142a] {\n  flex: 1;\n  height: 1px;\n  background: #f0f0f0;\n}\n\n/* Toggle Sections */\n.toggle-section[data-v-0523142a] {\n  margin: 1.5rem 0;\n}\n.toggle-btn[data-v-0523142a] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  background: none;\n  border: none;\n  padding: 1rem 0;\n  cursor: pointer;\n  color: #555;\n  font-weight: 500;\n  transition: color 0.2s ease;\n}\n.toggle-btn[data-v-0523142a]:hover {\n  color: #333;\n}\n.toggle-btn.active[data-v-0523142a] {\n  color: #228B22;\n}\n.toggle-switch[data-v-0523142a] {\n  width: 44px;\n  height: 24px;\n  background: #e0e0e0;\n  border-radius: 12px;\n  position: relative;\n  transition: background 0.2s ease;\n}\n.toggle-btn.active .toggle-switch[data-v-0523142a] {\n  background: #228B22;\n}\n.toggle-knob[data-v-0523142a] {\n  width: 20px;\n  height: 20px;\n  background: white;\n  border-radius: 50%;\n  position: absolute;\n  top: 2px;\n  left: 2px;\n  transition: transform 0.2s ease;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n}\n.toggle-btn.active .toggle-knob[data-v-0523142a] {\n  transform: translateX(20px);\n}\n\n/* Translation & Tafsir */\n.translation-section[data-v-0523142a],\n.tafsir-section[data-v-0523142a] {\n  margin: 1rem 0 2rem;\n}\n.language-selector[data-v-0523142a] {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n}\n.lang-btn[data-v-0523142a] {\n  padding: 0.375rem 0.75rem;\n  border: 1px solid #e0e0e0;\n  background: white;\n  border-radius: 8px;\n  font-size: 0.75rem;\n  font-weight: 500;\n  color: #666;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.lang-btn.active[data-v-0523142a] {\n  background: #228B22;\n  border-color: #228B22;\n  color: white;\n}\n.translation-text[data-v-0523142a] {\n  line-height: 1.7;\n  color: #444;\n  font-size: 1rem;\n  text-align: left;\n}\n.translation-text.rtl[data-v-0523142a] {\n  direction: rtl;\n  text-align: right;\n  font-family: \"Amiri\", \"Scheherazade New\", serif;\n}\n.tafsir-text[data-v-0523142a] {\n  line-height: 1.6;\n  color: #555;\n  font-size: 0.95rem;\n  background: #fafafa;\n  padding: 1.5rem;\n  border-radius: 12px;\n  border-left: 4px solid #228B22;\n}\n\n/* Action Bar */\n.action-bar[data-v-0523142a] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem 2rem;\n  background: #fafafa;\n  border-top: 1px solid #f0f0f0;\n}\n.action-group[data-v-0523142a] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.action-btn[data-v-0523142a] {\n  background: white;\n  border: 1px solid #e0e0e0;\n  border-radius: 10px;\n  padding: 0.75rem;\n  color: #666;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.action-btn[data-v-0523142a]:hover:not(:disabled) {\n  border-color: #228B22;\n  color: #228B22;\n  transform: translateY(-1px);\n}\n.action-btn[data-v-0523142a]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.font-size-label[data-v-0523142a] {\n  font-size: 0.875rem;\n  color: #666;\n  font-weight: 500;\n  min-width: 70px;\n  text-align: center;\n}\n\n/* Toast */\n.toast[data-v-0523142a] {\n  position: fixed;\n  bottom: 2rem;\n  left: 50%;\n  transform: translateX(-50%) translateY(100px);\n  background: #1a1a1a;\n  color: white;\n  padding: 1rem 1.5rem;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  opacity: 0;\n  transition: all 0.3s ease;\n  z-index: 1000;\n}\n.toast.show[data-v-0523142a] {\n  transform: translateX(-50%) translateY(0);\n  opacity: 1;\n}\n\n/* Animations */\n.fade-slide-enter-active[data-v-0523142a],\n.fade-slide-leave-active[data-v-0523142a] {\n  transition: all 0.3s ease;\n}\n.fade-slide-enter-from[data-v-0523142a] {\n  opacity: 0;\n  transform: translateY(-10px);\n}\n.fade-slide-leave-to[data-v-0523142a] {\n  opacity: 0;\n  transform: translateY(-10px);\n}\n\n/* Responsive */\n@media (max-width: 640px) {\n.ayah-container[data-v-0523142a] {\n    margin: 1rem;\n    border-radius: 16px;\n}\n.ayah-header[data-v-0523142a],\n  .ayah-content[data-v-0523142a] {\n    padding: 1rem 1.5rem;\n}\n.action-bar[data-v-0523142a] {\n    padding: 1rem 1.5rem;\n    flex-direction: column;\n    gap: 1rem;\n    align-items: stretch;\n}\n.action-group[data-v-0523142a] {\n    justify-content: center;\n}\n.arabic-text[data-v-0523142a] {\n    line-height: 2;\n    font-size: 1.6rem;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.prayer-card[data-v-5ae7cc26] {\n  transition: all 0.3s ease;\n  border: 2px solid transparent;\n}\n.prayer-card[data-v-5ae7cc26]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;\n}\n.spinner[data-v-5ae7cc26] {\n  border: 4px solid #f3f3f3;\n  border-top: 4px solid #1a5f7a;\n  border-radius: 50%;\n  width: 42px;\n  height: 42px;\n  animation: spin-5ae7cc26 1s linear infinite;\n  margin: 0 auto;\n}\n@keyframes spin-5ae7cc26 {\nto { transform: rotate(360deg);\n}\n}\n@media (prefers-reduced-motion: reduce) {\n.prayer-card[data-v-5ae7cc26] { transition: none;\n}\n.spinner[data-v-5ae7cc26] { animation: none;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=style&index=0&id=2ba25654&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=style&index=0&id=2ba25654&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomepageComponent_vue_vue_type_style_index_0_id_2ba25654_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HomepageComponent.vue?vue&type=style&index=0&id=2ba25654&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=style&index=0&id=2ba25654&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomepageComponent_vue_vue_type_style_index_0_id_2ba25654_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomepageComponent_vue_vue_type_style_index_0_id_2ba25654_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=style&index=1&id=2ba25654&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=style&index=1&id=2ba25654&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomepageComponent_vue_vue_type_style_index_1_id_2ba25654_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HomepageComponent.vue?vue&type=style&index=1&id=2ba25654&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=style&index=1&id=2ba25654&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomepageComponent_vue_vue_type_style_index_1_id_2ba25654_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomepageComponent_vue_vue_type_style_index_1_id_2ba25654_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/AyahOfTheDay.vue?vue&type=style&index=0&id=0523142a&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/AyahOfTheDay.vue?vue&type=style&index=0&id=0523142a&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahOfTheDay_vue_vue_type_style_index_0_id_0523142a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AyahOfTheDay.vue?vue&type=style&index=0&id=0523142a&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/AyahOfTheDay.vue?vue&type=style&index=0&id=0523142a&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahOfTheDay_vue_vue_type_style_index_0_id_0523142a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahOfTheDay_vue_vue_type_style_index_0_id_0523142a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerTimes_vue_vue_type_style_index_0_id_5ae7cc26_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerTimes_vue_vue_type_style_index_0_id_5ae7cc26_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerTimes_vue_vue_type_style_index_0_id_5ae7cc26_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

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
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomepageComponent_vue_vue_type_style_index_0_id_2ba25654_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HomepageComponent.vue?vue&type=style&index=0&id=2ba25654&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=style&index=0&id=2ba25654&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/HomepageComponent.vue?vue&type=style&index=1&id=2ba25654&scoped=true&lang=css":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/components/HomepageComponent.vue?vue&type=style&index=1&id=2ba25654&scoped=true&lang=css ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomepageComponent_vue_vue_type_style_index_1_id_2ba25654_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HomepageComponent.vue?vue&type=style&index=1&id=2ba25654&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=style&index=1&id=2ba25654&scoped=true&lang=css");


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


/***/ }),

/***/ "./resources/js/components/translation/AyahOfTheDay.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/translation/AyahOfTheDay.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AyahOfTheDay_vue_vue_type_template_id_0523142a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AyahOfTheDay.vue?vue&type=template&id=0523142a&scoped=true */ "./resources/js/components/translation/AyahOfTheDay.vue?vue&type=template&id=0523142a&scoped=true");
/* harmony import */ var _AyahOfTheDay_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AyahOfTheDay.vue?vue&type=script&lang=js */ "./resources/js/components/translation/AyahOfTheDay.vue?vue&type=script&lang=js");
/* harmony import */ var _AyahOfTheDay_vue_vue_type_style_index_0_id_0523142a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AyahOfTheDay.vue?vue&type=style&index=0&id=0523142a&scoped=true&lang=css */ "./resources/js/components/translation/AyahOfTheDay.vue?vue&type=style&index=0&id=0523142a&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_AyahOfTheDay_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AyahOfTheDay_vue_vue_type_template_id_0523142a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-0523142a"],['__file',"resources/js/components/translation/AyahOfTheDay.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/translation/AyahOfTheDay.vue?vue&type=script&lang=js":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/translation/AyahOfTheDay.vue?vue&type=script&lang=js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahOfTheDay_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahOfTheDay_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AyahOfTheDay.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/AyahOfTheDay.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/translation/AyahOfTheDay.vue?vue&type=style&index=0&id=0523142a&scoped=true&lang=css":
/*!**********************************************************************************************************************!*\
  !*** ./resources/js/components/translation/AyahOfTheDay.vue?vue&type=style&index=0&id=0523142a&scoped=true&lang=css ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahOfTheDay_vue_vue_type_style_index_0_id_0523142a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AyahOfTheDay.vue?vue&type=style&index=0&id=0523142a&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/AyahOfTheDay.vue?vue&type=style&index=0&id=0523142a&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/translation/AyahOfTheDay.vue?vue&type=template&id=0523142a&scoped=true":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/translation/AyahOfTheDay.vue?vue&type=template&id=0523142a&scoped=true ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahOfTheDay_vue_vue_type_template_id_0523142a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahOfTheDay_vue_vue_type_template_id_0523142a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AyahOfTheDay.vue?vue&type=template&id=0523142a&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/AyahOfTheDay.vue?vue&type=template&id=0523142a&scoped=true");


/***/ }),

/***/ "./resources/js/components/translation/PrayerTimes.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/translation/PrayerTimes.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PrayerTimes_vue_vue_type_template_id_5ae7cc26_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PrayerTimes.vue?vue&type=template&id=5ae7cc26&scoped=true */ "./resources/js/components/translation/PrayerTimes.vue?vue&type=template&id=5ae7cc26&scoped=true");
/* harmony import */ var _PrayerTimes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PrayerTimes.vue?vue&type=script&lang=js */ "./resources/js/components/translation/PrayerTimes.vue?vue&type=script&lang=js");
/* harmony import */ var _PrayerTimes_vue_vue_type_style_index_0_id_5ae7cc26_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css */ "./resources/js/components/translation/PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_PrayerTimes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PrayerTimes_vue_vue_type_template_id_5ae7cc26_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-5ae7cc26"],['__file',"resources/js/components/translation/PrayerTimes.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/translation/PrayerTimes.vue?vue&type=script&lang=js":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/translation/PrayerTimes.vue?vue&type=script&lang=js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerTimes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerTimes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PrayerTimes.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/translation/PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/components/translation/PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerTimes_vue_vue_type_style_index_0_id_5ae7cc26_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=style&index=0&id=5ae7cc26&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/translation/PrayerTimes.vue?vue&type=template&id=5ae7cc26&scoped=true":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/translation/PrayerTimes.vue?vue&type=template&id=5ae7cc26&scoped=true ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerTimes_vue_vue_type_template_id_5ae7cc26_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PrayerTimes_vue_vue_type_template_id_5ae7cc26_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PrayerTimes.vue?vue&type=template&id=5ae7cc26&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/PrayerTimes.vue?vue&type=template&id=5ae7cc26&scoped=true");


/***/ })

}]);