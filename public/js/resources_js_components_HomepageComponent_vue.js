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
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");


// Lazy-load heavier child components to improve initial render
const PrayerTimes = (0,vue__WEBPACK_IMPORTED_MODULE_1__.defineAsyncComponent)(() => __webpack_require__.e(/*! import() */ "resources_js_components_translation_PrayerTimes_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./translation/PrayerTimes.vue */ "./resources/js/components/translation/PrayerTimes.vue")));
const AyahOfTheDay = (0,vue__WEBPACK_IMPORTED_MODULE_1__.defineAsyncComponent)(() => __webpack_require__.e(/*! import() */ "resources_js_components_translation_AyahOfTheDay_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./translation/AyahOfTheDay.vue */ "./resources/js/components/translation/AyahOfTheDay.vue")));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    // HijriCalendar
    PrayerTimes,
    AyahOfTheDay
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
  class: "container journeys-section text-center mx-auto my-5"
};
const _hoisted_20 = {
  class: "row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mt-2 justify-content-center"
};
const _hoisted_21 = {
  class: "premium-card h-100 d-flex flex-column"
};
const _hoisted_22 = {
  class: "h6 fw-semibold mb-2"
};
const _hoisted_23 = {
  class: "small text-muted mb-3"
};
const _hoisted_24 = ["title", "href"];
const _hoisted_25 = {
  class: "py-5 bg-white",
  "aria-labelledby": "premium-heading",
  role: "region"
};
const _hoisted_26 = {
  class: "container"
};
const _hoisted_27 = {
  class: "row justify-content-center"
};
const _hoisted_28 = {
  class: "col-lg-10"
};
const _hoisted_29 = {
  class: "row g-4"
};
const _hoisted_30 = {
  class: "col-md-6"
};
const _hoisted_31 = {
  class: "h-100 d-flex flex-column justify-content-between",
  style: {
    "background": "white",
    "border-radius": "12px",
    "border": "1px solid #e9ecef",
    "box-shadow": "0 10px 30px rgba(0,0,0,0.08)"
  }
};
const _hoisted_32 = {
  class: "p-4 text-start"
};
const _hoisted_33 = {
  class: "py-5 contact-section",
  "aria-labelledby": "contact-heading",
  style: {
    "background": "#fff",
    "box-shadow": "0 7px 29px rgba(100, 100, 111, 0.2)"
  }
};
const _hoisted_34 = {
  class: "container-fluid"
};
const _hoisted_35 = {
  class: "row justify-content-center"
};
const _hoisted_36 = {
  class: "col-md-10 col-lg-6 mt-4"
};
const _hoisted_37 = {
  class: "row g-3"
};
const _hoisted_38 = {
  class: "col-md-6"
};
const _hoisted_39 = {
  class: "mb-3"
};
const _hoisted_40 = {
  class: "col-md-6"
};
const _hoisted_41 = {
  class: "mb-3"
};
const _hoisted_42 = {
  class: "col-md-6"
};
const _hoisted_43 = {
  class: "mb-3"
};
const _hoisted_44 = {
  class: "col-md-6"
};
const _hoisted_45 = {
  class: "mb-3"
};
const _hoisted_46 = {
  class: "col-md-6"
};
const _hoisted_47 = {
  class: "mb-3"
};
const _hoisted_48 = {
  class: "col-12"
};
const _hoisted_49 = {
  class: "mb-3"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" header "), _cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"jumbotron\" style=\"box-shadow:rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;\" data-v-2ba25654><!-- Content --><div class=\"container-fluid\" style=\"position:relative;\" data-v-2ba25654><!-- Enhanced Hero Section --><div class=\"container-fluid text-center\" style=\"position:relative;overflow:hidden;\" data-v-2ba25654><!-- Background Elements --><div style=\"position:absolute;right:-10%;width:400px;height:400px;border-radius:50%;animation:float-hero 8s ease-in-out infinite;z-index:1;\" data-v-2ba25654></div><div style=\"position:absolute;bottom:-30%;left:-5%;width:300px;height:300px;background:linear-gradient(135deg, rgba(26, 95, 122, 0.08) 0%, rgba(0, 191, 166, 0.08) 100%);border-radius:50%;animation:float-hero 6s ease-in-out infinite 2s;z-index:1;\" data-v-2ba25654></div><div class=\"row align-items-center\" style=\"position:relative;z-index:2;\" data-v-2ba25654><div class=\"col-md-6\" data-v-2ba25654><div class=\"text-left\" data-v-2ba25654><!-- Badge --><div style=\"background:linear-gradient(135deg, rgb(0, 121, 107), #1a5f7a);color:white;padding:0.5rem 1.5rem;border-radius:50px;display:inline-block;margin-bottom:1.5rem;box-shadow:0 5px 15px rgba(0, 191, 166, 0.3);font-weight:600;font-size:0.9rem;letter-spacing:0.5px;\" data-v-2ba25654><i class=\"fas fa-star me-2\" data-v-2ba25654></i>Trusted by 1000&#39;s of Muslims Worldwide </div><h1 class=\"display-4 mt-1 fw-bold text-left hero-title\" style=\"background:linear-gradient(135deg, #1a5f7a, #2c3e50);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.2;margin-bottom:1.5rem;text-shadow:0 2px 10px rgba(0, 0, 0, 0.1);font-size:3.5rem;\" data-v-2ba25654> Connecting You to Islamic Knowledge Seamlessly and Accessibly </h1><h2 class=\"lead pt-3 text-left\" style=\"line-height:1.8em;font-size:1.3rem;color:#4a5568;font-weight:500;margin-bottom:1.25rem;padding-right:1rem;\" data-v-2ba25654><p data-v-2ba25654> Connecting you to Islamic knowledge seamlessly and accessibly, your all-in-one platform to explore the Quran, learn from trusted content, and access AI-powered tools for a transformative spiritual experience anytime, anywhere. </p></h2><div class=\"row mb-3\" data-v-2ba25654><div class=\"col-12\" data-v-2ba25654><div class=\"controls d-flex flex-row justify-content-start text-left\" style=\"gap:1rem;\" data-v-2ba25654><a href=\"/surat\" class=\"btn btn-lg btn-teal rounded-20 fw-bold px-4\" data-v-2ba25654><i class=\"fas fa-rocket me-2\" data-v-2ba25654></i>Get Started Free </a><a href=\"/subscribe\" class=\"btn rounded-20 fw-bold px-4\" style=\"background:rgba(255,255,255,0.9);color:#1a5f7a;border:2px solid #1a5f7a;\" data-v-2ba25654><i class=\"fas fa-heart me-2\" data-v-2ba25654></i>Support Our Mission </a></div><!-- Trust Indicators --><div class=\"mt-3 d-flex align-items-center\" style=\"gap:1.5rem;\" data-v-2ba25654><div class=\"d-flex align-items-center\" data-v-2ba25654><i class=\"fas fa-shield-alt text-success me-2\" data-v-2ba25654></i><small style=\"color:#4a5568;font-weight:600;\" data-v-2ba25654>Secure Platform</small></div><div class=\"d-flex align-items-center\" data-v-2ba25654><i class=\"fas fa-clock text-warning me-2\" data-v-2ba25654></i><small style=\"color:#4a5568;font-weight:600;\" data-v-2ba25654>Instant Access</small></div><div class=\"d-flex align-items-center\" data-v-2ba25654><i class=\"fas fa-user-check text-info me-2\" data-v-2ba25654></i><small style=\"color:#4a5568;font-weight:600;\" data-v-2ba25654>No Registration</small></div></div></div></div></div></div><div class=\"col-md-6\" data-v-2ba25654><div class=\"text-center\" data-v-2ba25654><picture data-v-2ba25654><source srcset=\"/images/banner-photo.avif 800w\" type=\"image/avif\" data-v-2ba25654><img src=\"/images/banner-photo.avif\" srcset=\"/images/banner-photo.avif 800w\" sizes=\"(min-width: 992px) 50vw, (min-width: 768px) 60vw, 90vw\" class=\"img-fluid hero-image\" alt=\"Islamic Connect platform showcasing Quran exploration and AI-powered tools\" loading=\"lazy\" width=\"800\" height=\"800\" data-v-2ba25654></picture></div></div></div></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <section aria-labelledby=\"prayer-times-heading\">\n      <div class=\"container-fluid\">\n        <div class=\"row justify-content-center\">\n          <div class=\"col-12\">\n            -- SEO Optimized Heading --\n            <h2 id=\"prayer-times-heading\" class=\"text-center mb-4\" style=\"color: black; font-weight: 800;\">\n              Today's Prayer Times\n            </h2>\n\n            -- Performance & Accessibility Enhanced Component --\n            <PrayerTimes class=\"mb-3 prayer-times-enhanced\" :lazy-load=\"true\" :reduce-motion=\"true\" aria-live=\"polite\"\n              aria-atomic=\"true\" />\n\n          </div>\n        </div>\n      </div>\n    </section> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" HERO / SEO SECTION "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_1, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "premium-seo__backdrop"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<h2 id=\"seo-heading\" class=\"display-5 fw-bold mb-3\" data-v-2ba25654>Discover Quran, Knowledge &amp; Accessible Tools</h2><p class=\"text-muted mb-3\" data-v-2ba25654>A premium hero-inspired narrative that balances on-brand gradients with clean typography. These headings and stats reiterate the title keywords before Vue hydrates the rest of the experience.</p><p class=\"text-muted mb-4\" data-v-2ba25654>Explore curated pathways with subtle motion, modern gradients, and polished visuals—each insight is crafted to feel alive, centered, and spiritually uplifting.</p><div class=\"d-flex flex-wrap gap-3 mb-4 justify-content-center justify-content-lg-start\" data-v-2ba25654><span class=\"badge badge-pill highlight-badge\" data-v-2ba25654>Quran insights</span><span class=\"badge badge-pill highlight-badge\" data-v-2ba25654>Dua playlists</span><span class=\"badge badge-pill highlight-badge\" data-v-2ba25654>Mission stories</span></div>", 4)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.seoStats, stat => {
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
  }, "Blending server-rendered structure with Vue-powered interactivity ensures the same narrative loads instantly.")], -1 /* CACHED */))])])]), _cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section aria-labelledby=\"services-heading\" data-v-2ba25654><div class=\"py-5\" style=\"background:#f8f9fa;\" data-v-2ba25654><div class=\"container\" data-v-2ba25654><div class=\"row justify-content-center text-center mb-5\" data-v-2ba25654><div class=\"col-lg-8 col-xl-7\" data-v-2ba25654><h2 id=\"services-heading\" class=\"display-4 mb-3 fw-bold\" data-v-2ba25654>What We Offer</h2><p class=\"lead text-muted\" data-v-2ba25654>Comprehensive Islamic resources designed for modern learners</p></div></div><div class=\"row g-4\" data-v-2ba25654><!-- Card 1: Explore with Ease --><div class=\"col-md-6 col-lg-4\" data-v-2ba25654><article class=\"card h-100 border-0 card-20 card-float shadow-sm\" data-v-2ba25654><div class=\"card-body text-center p-4\" data-v-2ba25654><div class=\"my-3\" data-v-2ba25654><img src=\"images/galaxy.png\" width=\"80\" height=\"80\" alt=\"Magnifying glass exploring Islamic content\" loading=\"lazy\" data-v-2ba25654></div><h3 class=\"h3 fw-bold\" data-v-2ba25654>Explore with Ease</h3><p class=\"mb-4 text-muted\" style=\"font-size:16px;line-height:1.6;\" data-v-2ba25654> Search the Quran, Duas, and Seerah effortlessly using simple keywords or topics. Find meaningful content instantly for your spiritual journey. </p></div></article></div><!-- Card 2: Listen, Watch, Reflect --><div class=\"col-md-6 col-lg-4\" data-v-2ba25654><article class=\"card h-100 border-0 card-20 card-float shadow-sm\" data-v-2ba25654><div class=\"card-body text-center p-4\" data-v-2ba25654><div class=\"my-3\" data-v-2ba25654><img src=\"images/watching.png\" width=\"80\" height=\"80\" alt=\"Headphones for audio content\" loading=\"lazy\" data-v-2ba25654></div><h3 class=\"h3 fw-bold\" data-v-2ba25654>Listen, Watch, Reflect</h3><p class=\"mb-4 text-muted\" style=\"font-size:16px;line-height:1.6;\" data-v-2ba25654> Enjoy Quran recitations, insightful podcasts, and Islamic art galleries. Engage spiritually through multimedia content anywhere, anytime. </p></div></article></div><!-- Card 3: Learn Your Way --><div class=\"col-md-6 col-lg-4\" data-v-2ba25654><article class=\"card h-100 border-0 card-20 card-float shadow-sm\" data-v-2ba25654><div class=\"card-body text-center p-4\" data-v-2ba25654><div class=\"my-3\" data-v-2ba25654><img src=\"images/school.png\" width=\"80\" height=\"80\" alt=\"Graduation cap for learning\" loading=\"lazy\" data-v-2ba25654></div><h3 class=\"h3 fw-bold\" data-v-2ba25654>Learn Your Way</h3><p class=\"mb-4 text-muted\" style=\"font-size:16px;line-height:1.6;\" data-v-2ba25654> Text-to-speech, screen reader and keybord navigator support, and bookmarking ensure accessible learning for everyone, regardless of ability. </p></div></article></div></div></div></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_19, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row justify-content-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-8"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "h4 fw-bold mb-1 text-center"
  }, "Explore our most visited journeys"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted mb-4"
  }, "Hand-curated pathways to Quran, dua, and mission experiences, all adorned with premium spacing, subtle motion, and refined corners.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.seoCards, journey => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col",
      key: `journey-${journey.title}`
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(journey.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(journey.desc), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "mt-auto fw-semibold text-teal",
      title: journey.title,
      href: journey.href
    }, "Explore →", 8 /* PROPS */, _hoisted_24)])]);
  }), 128 /* KEYED_FRAGMENT */))])]), _cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"container pt-3\" aria-label=\"Islamic Connect Features\" data-v-2ba25654><!-- First Row - Quran Companion --><div class=\"row py-4 py-lg-5 align-items-center\" data-v-2ba25654><div class=\"col-lg-6 order-2 order-lg-1\" data-v-2ba25654><h2 class=\"h1 fw-bold text-center text-lg-start mb-4\" data-v-2ba25654> Quran Companion: AI-Powered &amp; Accessible </h2><p class=\"lead text-muted text-center text-lg-start mb-4\" style=\"line-height:1.7;\" data-v-2ba25654> Experience the Quran with advanced AI tools for reading, listening, and understanding. Featuring text-to-speech, screen reader support, and voice search for an accessible, intelligent connection to the Divine. </p><div class=\"d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center\" data-v-2ba25654><a href=\"/quran\" class=\"btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20\" style=\"min-width:160px;\" data-v-2ba25654> Explore Quran </a></div></div><div class=\"col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0\" data-v-2ba25654><img src=\"/images/slide1.png\" class=\"img-fluid rounded-20 shadow-sm\" alt=\"Quran Companion interface showing AI-powered features and accessibility tools\" loading=\"lazy\" width=\"600\" height=\"400\" data-v-2ba25654></div></div><!-- Second Row - Audio Content --><div class=\"row py-4 py-lg-5 align-items-center\" data-v-2ba25654><div class=\"col-lg-6 mb-4 mb-lg-0\" data-v-2ba25654><img src=\"/images/slide4.png\" class=\"img-fluid rounded-20 shadow-sm\" alt=\"Islamic podcasts and audio content streaming interface\" loading=\"lazy\" width=\"600\" height=\"400\" data-v-2ba25654></div><div class=\"col-lg-6\" data-v-2ba25654><h2 class=\"h1 fw-bold text-center text-lg-start mb-4\" data-v-2ba25654> Spiritual Content On-The-Go </h2><p class=\"lead text-muted text-center text-lg-start mb-4\" style=\"line-height:1.7;\" data-v-2ba25654> Access uplifting Islamic podcasts, inspiring audio series, and live radio in one place. Stay spiritually connected through sound and reflection wherever you are. </p><div class=\"d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center\" data-v-2ba25654><a href=\"/media\" class=\"btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20\" style=\"min-width:160px;\" data-v-2ba25654> Browse Content </a></div></div></div><!-- Third Row - Quran Explorer --><div class=\"row py-4 py-lg-5 align-items-center\" data-v-2ba25654><div class=\"col-lg-6 order-2 order-lg-1\" data-v-2ba25654><h2 class=\"h1 fw-bold text-center text-lg-start mb-4\" data-v-2ba25654> Deep Quran Exploration </h2><p class=\"lead text-muted text-center text-lg-start mb-4\" style=\"line-height:1.7;\" data-v-2ba25654> Search, explore, and engage with every verse effortlessly. Discover tafsir, translations, and recitations with tools designed for simplicity and spiritual growth. </p><div class=\"d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center\" data-v-2ba25654><a href=\"/surat\" class=\"btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20\" style=\"min-width:160px;\" data-v-2ba25654> Start Exploring </a></div></div><div class=\"col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0\" data-v-2ba25654><img src=\"/images/slide2.png\" class=\"img-fluid rounded-20 shadow-sm\" alt=\"Quran exploration interface with search and translation features\" loading=\"lazy\" width=\"600\" height=\"400\" data-v-2ba25654></div></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Stats Section "), _cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"stats-section\" data-v-2ba25654><div class=\"container\" data-v-2ba25654><div class=\"row justify-content-center\" data-v-2ba25654><div class=\"col-lg-10 text-center\" data-v-2ba25654><h2 class=\"section-title\" data-v-2ba25654>Our Impact in Numbers</h2><p class=\"section-lead\" data-v-2ba25654>Measurable results showing how we&#39;re making Islamic knowledge accessible to all</p><div class=\"row container-fluid stats-grid\" data-v-2ba25654><div class=\"col-md-3 col-6 mb-4\" data-v-2ba25654><div class=\"stat-card\" data-v-2ba25654><h3 data-v-2ba25654>85%</h3><p data-v-2ba25654>Accessibility</p><small data-v-2ba25654>Score </small></div></div><div class=\"col-md-3 col-6 mb-4\" data-v-2ba25654><div class=\"stat-card\" data-v-2ba25654><h3 data-v-2ba25654>75+</h3><p data-v-2ba25654>Countries</p><small data-v-2ba25654>Global reach</small></div></div><div class=\"col-md-3 col-6 mb-4\" data-v-2ba25654><div class=\"stat-card\" data-v-2ba25654><h3 data-v-2ba25654>575+</h3><p data-v-2ba25654>Cities/Towns</p><small data-v-2ba25654>Worldwide presence</small></div></div><div class=\"col-md-3 col-6 mb-4\" data-v-2ba25654><div class=\"stat-card\" data-v-2ba25654><h3 data-v-2ba25654>1,090%</h3><p data-v-2ba25654>Growth</p><small data-v-2ba25654>Returning users</small></div></div></div></div></div></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" AI Tools & Features Section - Optimized "), _cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"py-5\" aria-labelledby=\"ai-tools-title\" data-v-2ba25654><div class=\"container pt-3\" data-v-2ba25654><div class=\"row justify-content-center text-center mb-3\" data-v-2ba25654><div class=\"col-lg-8 col-xl-7\" data-v-2ba25654></div><h2 id=\"ai-tools-title\" class=\"h2 mb-3 fw-bold\" data-v-2ba25654>AI-Powered Tools for Enhanced Islamic Learning</h2></div><div class=\"row pt-3 g-4 g-md-5\" data-v-2ba25654><div class=\"col-12\" data-v-2ba25654><p class=\"lead text-center mb-4\" style=\"line-height:1.7;\" data-v-2ba25654> At Islamic Connect, we leverage advanced AI technology to make Quranic knowledge accessible to everyone. Our tools are designed to empower individuals through inclusive, personalized learning experiences that adapt to diverse abilities and learning preferences. </p></div><!-- Feature 4: Text Summarization --><div class=\"col-md-6\" data-v-2ba25654><div class=\"d-flex h-100\" data-v-2ba25654><div class=\"flex-shrink-0 me-4\" data-v-2ba25654><img src=\"images/content.png\" width=\"60\" height=\"60\" alt=\"Content icon for text summarization feature\" loading=\"lazy\" data-v-2ba25654></div><div class=\"flex-grow-1\" data-v-2ba25654><h3 class=\"h5 mb-2 fw-bold\" data-v-2ba25654>AI Text Summarization</h3><p class=\"mb-0\" data-v-2ba25654> Quickly understand complex Islamic texts with AI-powered summaries. Extract key insights from lengthy content to enhance your learning efficiency. </p></div></div></div><!-- Feature 2: Voice Search --><!-- &lt;div class=&quot;col-md-6&quot;&gt;\n            &lt;div class=&quot;d-flex h-100&quot;&gt;\n              &lt;div class=&quot;flex-shrink-0 me-4&quot;&gt;\n                &lt;img src=&quot;images/voice-recognition.png&quot; width=&quot;60&quot; height=&quot;60&quot;\n                  alt=&quot;Voice recognition icon for voice search feature&quot; loading=&quot;lazy&quot;&gt;\n              &lt;/div&gt;\n              &lt;div class=&quot;flex-grow-1&quot;&gt;\n                &lt;h3 class=&quot;h5 mb-2 fw-bold&quot;&gt;Voice-Activated Quran Search&lt;/h3&gt;\n                &lt;p class=&quot;mb-0&quot;&gt;\n                  Use voice commands to search Quranic verses and teachings.\n                  A hands-free, accessible way to explore Islamic content quickly and intuitively.\n                &lt;/p&gt;\n              &lt;/div&gt;\n            &lt;/div&gt;\n          &lt;/div&gt; --><!-- Feature 3: Note Editor --><!-- &lt;div class=&quot;col-md-6&quot;&gt;\n            &lt;div class=&quot;d-flex h-100&quot;&gt;\n              &lt;div class=&quot;flex-shrink-0 me-4&quot;&gt;\n                &lt;img src=&quot;images/elearning.png&quot; width=&quot;60&quot; height=&quot;60&quot; alt=&quot;E-learning icon for note editor feature&quot;\n                  loading=&quot;lazy&quot;&gt;\n              &lt;/div&gt;\n              &lt;div class=&quot;flex-grow-1&quot;&gt;\n                &lt;h3 class=&quot;h5 mb-2 fw-bold&quot;&gt;Advanced Islamic Note Editor&lt;/h3&gt;\n                &lt;p class=&quot;mb-0&quot;&gt;\n                  A customizable note-taking tool designed specifically for Islamic studies.\n                  Organize your reflections, bookmarks, and study notes with ease.\n                &lt;/p&gt;\n              &lt;/div&gt;\n            &lt;/div&gt;\n          &lt;/div&gt; --><!-- Feature 1: Speech-to-Text --><div class=\"col-md-6 mb-3\" data-v-2ba25654><div class=\"d-flex h-100\" data-v-2ba25654><div class=\"flex-shrink-0 me-4\" data-v-2ba25654><img src=\"images/podcasting.png\" width=\"60\" height=\"60\" alt=\"Microphone icon representing speech-to-text feature\" loading=\"lazy\" data-v-2ba25654></div><div class=\"flex-grow-1\" data-v-2ba25654><h3 class=\"h5 mb-2 fw-bold\" data-v-2ba25654>Speech-to-Text for Islamic Notes</h3><p class=\"mb-0\" data-v-2ba25654> Capture your spoken reflections and thoughts on Islamic teachings effortlessly. Perfect for documenting insights and ensuring accessibility for those who prefer audio input. </p></div></div></div><!-- Feature 5: Audio Sync --><div class=\"col-md-6\" data-v-2ba25654><div class=\"d-flex h-100\" data-v-2ba25654><div class=\"flex-shrink-0 me-4\" data-v-2ba25654><img src=\"images/highlighter.png\" width=\"60\" height=\"60\" alt=\"Highlighter icon for audio synchronization feature\" loading=\"lazy\" data-v-2ba25654></div><div class=\"flex-grow-1\" data-v-2ba25654><h3 class=\"h5 mb-2 fw-bold\" data-v-2ba25654>Word-by-Word Quran Highlighting</h3><p class=\"mb-0\" data-v-2ba25654> Follow Quranic recitations with synchronized text highlighting. Each word lights up as it&#39;s recited, improving pronunciation and comprehension. </p></div></div></div><!-- Feature 6: Text-to-Speech --><div class=\"col-md-6\" data-v-2ba25654><div class=\"d-flex h-100\" data-v-2ba25654><div class=\"flex-shrink-0 me-4\" data-v-2ba25654><img src=\"images/chat.png\" width=\"60\" height=\"60\" alt=\"Chat icon for text-to-speech feature\" loading=\"lazy\" data-v-2ba25654></div><div class=\"flex-grow-1\" data-v-2ba25654><h3 class=\"h5 mb-2 fw-bold\" data-v-2ba25654>Text-to-Speech for Translations</h3><p class=\"mb-0\" data-v-2ba25654> Listen to Quran translations and Tafsir explanations. High-quality audio delivery makes Islamic knowledge accessible while multitasking or for visual impairments. </p></div></div></div></div></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Premium CTA Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
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
  }, " Your support sustains this khidmah and keeps Islamic knowledge accessible for everyone. ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Faith-centered quote "), _cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"row justify-content-center mb-4 quote-wrapper bg-white\" data-v-2ba25654><div class=\"col-lg-9\" data-v-2ba25654><div class=\"quote-card\" data-v-2ba25654><!-- Subtle glowing accent --><div class=\"quote-glow\" data-v-2ba25654></div><div class=\"quote-content\" data-v-2ba25654><!-- First Quote --><p class=\"faith-quote\" data-v-2ba25654><span class=\"quote-mark\" aria-hidden=\"true\" data-v-2ba25654>“</span> Whoever treads a path seeking knowledge, Allah will make easy for him a path to Paradise. <span class=\"quote-mark\" aria-hidden=\"true\" data-v-2ba25654>”</span></p><div class=\"quote-ref\" data-v-2ba25654>Hadith — Sahih Muslim</div><!-- Decorative divider --><div class=\"quote-divider\" data-v-2ba25654></div></div></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"col-md-6\" data-v-2ba25654><div class=\"card h-100 border-0\" style=\"box-shadow:0 10px 30px rgba(0,0,0,0.08);\" data-v-2ba25654><div class=\"card-body p-4 text-start\" data-v-2ba25654><h3 class=\"h4 fw-bold mb-3\" style=\"color:#2c3e50;\" data-v-2ba25654>What your support enables</h3><ul class=\"mb-0\" style=\"list-style:none;padding-left:0;color:#4a5568;line-height:1.7;\" data-v-2ba25654><li class=\"mb-2\" data-v-2ba25654><i class=\"fas fa-check text-success me-2\" data-v-2ba25654></i>Keep Quran tools fast, accessible, and ad‑free</li><li class=\"mb-2\" data-v-2ba25654><i class=\"fas fa-check text-success me-2\" data-v-2ba25654></i>Offer trustworthy resources curated with amanah</li><li class=\"mb-2\" data-v-2ba25654><i class=\"fas fa-check text-success me-2\" data-v-2ba25654></i>Deliver new features shaped by your feedback</li><li class=\"mb-2\" data-v-2ba25654><i class=\"fas fa-check text-success me-2\" data-v-2ba25654></i>Make the platform available to those who can’t pay</li></ul></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h4 fw-bold mb-3",
    style: {
      "color": "#2c3e50"
    }
  }, "Simple and transparent", -1 /* CACHED */)), _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
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
  }, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-heart me-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Provide a small Donation ", -1 /* CACHED */)]))])]), _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "px-4 pb-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center",
    style: {
      "gap": ".5rem",
      "color": "#6c757d"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-lock"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, "SSL encrypted • PCI compliant")])], -1 /* CACHED */))])])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quick Join Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Enhanced Quick Join Section "), _cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", {
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
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" contact "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row justify-content-center text-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-8 col-xxl-7"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    id: "contact-heading",
    class: "display-5 fw-bold mb-3"
  }, "Get In Touch"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "lead fw-semibold text-muted"
  }, " Have questions or need assistance? We're here to help! Reach out to Islamic Connect for support, feedback, or inquiries about our content and services. ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onReset: _cache[7] || (_cache[7] = (...args) => _ctx.reset && _ctx.reset(...args)),
    onSubmit: _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.sendMessage(), ["prevent"])),
    role: "form",
    "aria-label": "Contact form"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" First Name "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
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
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.firstname]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Last Name "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
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
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.lastname]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Email "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
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
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.email]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Subject "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
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
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.subject]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Phone Number "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
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
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.mobile]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Message "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
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
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.message]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Submit Button "), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"col-12\" data-v-2ba25654><div class=\"d-grid\" data-v-2ba25654><button type=\"submit\" class=\"btn btn-teal rounded-20 btn-lg fw-bold py-3\" data-v-2ba25654><span class=\"d-flex align-items-center justify-content-center\" data-v-2ba25654><i class=\"fas fa-paper-plane me-2\" aria-hidden=\"true\" data-v-2ba25654></i> Send Message </span></button></div></div>", 1))])], 32 /* NEED_HYDRATION */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Remove the container if you want to extend the Footer to full width. "), _cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("footer", {
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.quote-wrapper[data-v-2ba25654] {\n  margin: 0;\n  padding: 0;\n  font-family: 'Poppins', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;\n}\n.quote-card[data-v-2ba25654] {\n  background: linear-gradient(145deg, #ffffff, #f3f9f8);\n  border-radius: 16px;\n  border: 1px solid rgba(0, 0, 0, 0.05);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);\n  padding: 32px 24px;\n  color: #1a1a1a;\n  text-align: center;\n  position: relative;\n  overflow: hidden;\n  max-width: 100%;\n  transition: all 0.3s ease;\n}\n.quote-glow[data-v-2ba25654] {\n  position: absolute;\n  top: -70px;\n  right: -70px;\n  width: 150px;\n  height: 150px;\n  background: radial-gradient(circle, rgba(0, 150, 136, 0.15), transparent 70%);\n  z-index: 0;\n}\n.quote-content[data-v-2ba25654] {\n  position: relative;\n  z-index: 1;\n}\n.faith-quote[data-v-2ba25654] {\n  font-size: clamp(1.1rem, 4vw, 1.4rem);\n  line-height: 1.75;\n  margin-bottom: 0.8rem;\n  color: #00332e;\n  font-weight: 600;\n  padding: 0 8px;\n}\n.faith-dua[data-v-2ba25654] {\n  font-size: clamp(1rem, 3.5vw, 1.25rem);\n  line-height: 1.7;\n  margin: 0;\n  color: #00332e;\n  font-weight: 600;\n  padding: 0 8px;\n  opacity: 0;\n  animation: fadeInGlow 3s ease-in-out forwards;\n}\n.quote-mark[data-v-2ba25654] {\n  font-size: 2.2rem;\n  color: #009688;\n  vertical-align: middle;\n  font-weight: 700;\n}\n.faith-dua .quote-mark[data-v-2ba25654] {\n  font-size: 1.8rem;\n}\n.quote-ref[data-v-2ba25654] {\n  text-align: right;\n  font-style: italic;\n  color: #607d8b;\n  font-size: 0.92rem;\n  font-family: 'Nunito Sans', 'Segoe UI', sans-serif;\n  margin-bottom: 1.2rem;\n}\n.dua-ref[data-v-2ba25654] {\n  display: block;\n  margin-top: 6px;\n  font-size: 0.9rem;\n  color: #607d8b;\n  font-family: 'Nunito Sans', 'Segoe UI', sans-serif;\n}\n.quote-divider[data-v-2ba25654] {\n  width: 70px;\n  height: 3px;\n  background: linear-gradient(90deg, #009688, #4db6ac);\n  margin: 0.8rem auto 1.4rem auto;\n  border-radius: 2px;\n}\n@media (max-width: 576px) {\n.faith-quote[data-v-2ba25654],\n  .faith-dua[data-v-2ba25654] {\n    padding: 0 4px;\n}\n.quote-card[data-v-2ba25654] {\n    padding: 24px 16px;\n}\n}\n\n/* Ensure hero title has solid color on small screens for contrast */\n@media (max-width: 576px) {\n.hero-title[data-v-2ba25654] {\n    -webkit-text-fill-color: initial !important;\n    background: none !important;\n    color: #1a5f7a !important;\n}\n}\n.card[data-v-2ba25654]:hover {\n  transform: translateY(-8px) !important;\n  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15) !important;\n}\n\n/* Button focus states for accessibility */\n.btn[data-v-2ba25654]:focus {\n  outline: 3px solid #1a5f7a;\n  outline-offset: 2px;\n}\n\n/* Card focus states */\n.card[data-v-2ba25654]:focus-within {\n  outline: 2px solid rgb(0, 121, 107);\n  outline-offset: 2px;\n}\n.service-1 .card[data-v-2ba25654] {\n  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n}\n.service-1 .card[data-v-2ba25654]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15) !important;\n}\n.service-1 .btn[data-v-2ba25654] {\n  transition: all 0.3s ease;\n}\n.service-1 .btn[data-v-2ba25654]:hover {\n  background: #1a5f7a !important;\n  transform: translateY(-2px);\n}\n\n/* Focus styles for accessibility */\n.service-1 .btn[data-v-2ba25654]:focus {\n  outline: 3px solid #1a5f7a;\n  outline-offset: 2px;\n}\n.service-1 .card[data-v-2ba25654]:focus-within {\n  outline: 2px solid rgb(0, 121, 107);\n  outline-offset: 2px;\n}\n.contact-section[data-v-2ba25654] {\n  /* Performance: Reduce paint operations */\n  transform: translateZ(0);\n  backface-visibility: hidden;\n}\n\n/* Improved focus styles for accessibility */\n.form-control[data-v-2ba25654]:focus {\n  border-color: rgb(0, 121, 107);\n  box-shadow: 0 0 0 0.2rem rgba(0, 191, 166, 0.25);\n  outline: none;\n}\n\n/* Better button states */\n.btn-primary[data-v-2ba25654]:hover {\n  background: #0a6d60 !important;\n  transform: translateY(-1px);\n  transition: all 0.3s ease;\n}\n.btn-primary[data-v-2ba25654]:active {\n  transform: translateY(0);\n}\n@keyframes float-2ba25654 {\n0%,\n  100% {\n    transform: translateY(0) rotate(0deg);\n}\n50% {\n    transform: translateY(-20px) rotate(5deg);\n}\n}\n@keyframes pulse-2ba25654 {\n0%,\n  100% {\n    opacity: 1;\n}\n50% {\n    opacity: 0.5;\n}\n}\n.join-card-hover[data-v-2ba25654]:hover {\n  transform: translateY(-5px) scale(1.02);\n  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;\n}\n\n/* Reduced motion support */\n@media (prefers-reduced-motion: reduce) {\n.card[data-v-2ba25654] {\n    transition: none !important;\n}\n.btn[data-v-2ba25654] {\n    transition: none !important;\n}\n}\n\n/* High contrast mode support */\n@media (prefers-contrast: high) {\n.card[data-v-2ba25654] {\n    border: 2px solid #000 !important;\n}\n.btn[data-v-2ba25654] {\n    border: 2px solid #000 !important;\n}\n}\n\n/* Mobile Responsiveness */\n@media (max-width: 768px) {\n.contact-section[data-v-2ba25654] {\n    padding: 2rem 0 !important;\n}\n.form-control-lg[data-v-2ba25654] {\n    font-size: 1rem !important;\n    padding: 0.75rem 1rem !important;\n}\n.btn-lg[data-v-2ba25654] {\n    padding: 0.875rem 1.5rem !important;\n    font-size: 1rem !important;\n}\n.card-body[data-v-2ba25654] {\n    padding: 1.5rem !important;\n}\n.display-4[data-v-2ba25654] {\n    font-size: 2.5rem !important;\n}\n.btn[data-v-2ba25654] {\n    padding: 1rem !important;\n    font-size: 1rem;\n}\n.service-1 .card-body[data-v-2ba25654] {\n    padding: 1.5rem !important;\n}\n.service-1 h1[data-v-2ba25654] {\n    font-size: 2.5rem !important;\n}\n.service-1 .btn[data-v-2ba25654] {\n    padding: 1rem !important;\n    font-size: 1rem;\n}\n.quick-join-section[data-v-2ba25654] {\n    padding: 3rem 0 !important;\n}\n.quick-join-section h2[data-v-2ba25654] {\n    font-size: 2rem !important;\n    text-align: center !important;\n}\n.join-card-hover[data-v-2ba25654] {\n    margin-bottom: 1rem;\n}\n}\n.partner-icon[data-v-2ba25654] {\n  width: 120px;\n  height: 120px;\n  -o-object-fit: contain;\n     object-fit: contain;\n  transition: filter 0.3s ease, transform 0.3s ease;\n}\n.partner-icon[data-v-2ba25654]:hover {\n  transform: scale(1.1);\n}\n@media (max-width: 576px) {\n.partner-icon[data-v-2ba25654] {\n    width: 64px;\n    height: 64px;\n}\nh5[data-v-2ba25654] {\n    font-size: 1.25rem;\n}\np.fs-6[data-v-2ba25654] {\n    font-size: 1.3rem;\n}\n}\n.controls[data-v-2ba25654] {\n  margin-top: 20px;\n}\n.controls button[data-v-2ba25654] {\n  margin: 5px;\n  padding: 10px 20px;\n  border: none;\n  background-color: rgb(13, 182, 145);\n  color: white;\n  border-radius: 5px;\n  cursor: pointer;\n  font-weight: bold;\n  transition: background 0.3s ease;\n}\n.controls button[data-v-2ba25654]:disabled {\n  background-color: #bdc3c7;\n  cursor: not-allowed;\n}\n.controls button[data-v-2ba25654]:hover:not(:disabled) {\n  background-color: rgb(0, 121, 107);\n}\n\n/* .service-1 {\n  font-family: \"Montserrat\", sans-serif;\n  color: #8d97ad;\n  font-weight: 300;\n} */\n.service-1 h1[data-v-2ba25654],\n.service-1 h2[data-v-2ba25654],\n.service-1 h3[data-v-2ba25654],\n.service-1 h4[data-v-2ba25654],\n.service-1 h5[data-v-2ba25654],\n.service-1 h6[data-v-2ba25654] {\n  color: #3e4555;\n}\n.service-1 .font-weight-medium[data-v-2ba25654] {\n  font-weight: 500;\n}\n.service-1 .bg-light[data-v-2ba25654] {\n  background-color: #f4f8fa !important;\n}\n.service-1 .subtitle[data-v-2ba25654] {\n  color: #8d97ad;\n  line-height: 24px;\n}\n.service-1 .card.card-shadow[data-v-2ba25654] {\n  box-shadow: 0px 0px 30px rgba(115, 128, 157, 0.1);\n}\n.service-1 .wrap-service1-box .card-body[data-v-2ba25654] {\n  padding: 40px;\n}\n.service-1 .btn-success-gradiant[data-v-2ba25654] {\n  background: #2cdd9b;\n  background: linear-gradient(to right, #2cdd9b 0%, #1dc8cc 100%);\n  border: 0px;\n}\n.service-1 .btn-success-gradiant[data-v-2ba25654]:hover {\n  background: #1dc8cc;\n  background: linear-gradient(to right, #1dc8cc 0%, #2cdd9b 100%);\n}\n.service-1 .btn-md[data-v-2ba25654] {\n  padding: 15px 45px;\n  font-size: 16px;\n}\n.jumbotron-overlay[data-v-2ba25654] {\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.6);\n  z-index: 1;\n}\n.jumbotron-content[data-v-2ba25654] {\n  position: relative;\n  z-index: 2;\n}\n\n/* CSS */\n.button-37[data-v-2ba25654] {\n  background-color: rgb(53, 163, 139);\n  border: 1px solid darkgreen;\n  border-radius: 4px;\n  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0;\n  box-sizing: border-box;\n  color: #fff;\n  cursor: pointer;\n  font-family: \"Akzidenz Grotesk BQ Medium\", -apple-system, BlinkMacSystemFont,\n    sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n  outline: none;\n  outline: 0;\n  padding: 10px 25px;\n  text-align: center;\n  transform: translateY(0);\n  transition: transform 150ms, box-shadow 150ms;\n  -moz-user-select: none;\n       user-select: none;\n  -webkit-user-select: none;\n  touch-action: manipulation;\n}\n.button-37[data-v-2ba25654]:hover {\n  box-shadow: rgba(0, 0, 0, 0.15) 0 3px 9px 0;\n  transform: translateY(-2px);\n}\n@media (min-width: 768px) {\n.img-mobile-bigger[data-v-2ba25654] {\n    width: 160%;\n}\n.button-37[data-v-2ba25654] {\n    padding: 10px 30px;\n}\n.controls {\n.controls[data-v-2ba25654] {\n      margin-top: 20px;\n}\n.controls button[data-v-2ba25654] {\n      margin: 5px;\n      padding: 10px 20px;\n      border: none;\n      background-color: darkgreen;\n      color: white;\n      border-radius: 5px;\n      cursor: pointer;\n      font-weight: bold;\n      transition: background 0.3s ease;\n}\n.controls button[data-v-2ba25654]:disabled {\n      background-color: #bdc3c7;\n      cursor: not-allowed;\n}\n.controls button[data-v-2ba25654]:hover:not(:disabled) {\n      background-color: darkgreen;\n}\n}\n}\n\n/* Shared footer styles for consistent spacing across pages */\n.ic-footer[data-v-2ba25654] {\n    background: linear-gradient(135deg, rgb(0, 121, 107), #1a5f7a);\n}\n.ic-footer .footer-inner[data-v-2ba25654] {\n    padding: 1rem 1rem;\n    padding-bottom: calc(1rem + env(safe-area-inset-bottom));\n}\n@media (min-width: 768px) {\n.ic-footer .footer-inner[data-v-2ba25654] { padding: 1rem 2rem;\n}\n}\n.ic-footer .copyright[data-v-2ba25654] { font-weight: 700;\n}\n.ic-footer .social a[data-v-2ba25654] {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 40px;\n    height: 40px;\n    margin-left: .5rem;\n    border: 1px solid rgba(255,255,255,.5);\n    border-radius: 8px;\n    color: #fff;\n    transition: background .2s ease, border-color .2s ease, transform .2s ease;\n}\n.ic-footer .social a[data-v-2ba25654]:hover { background: rgba(255,255,255,.1); border-color: #fff; transform: translateY(-1px);\n}\n@media (max-width: 575.98px) {\n.ic-footer .social a[data-v-2ba25654] { width: 36px; height: 36px; margin: .25rem;\n}\n.ic-footer .copyright[data-v-2ba25654] { text-align: center;\n}\n.ic-footer .footer-inner[data-v-2ba25654] { gap: .75rem;\n}\n}\n.hero-carousel-placeholder[data-v-2ba25654] {\n    border-radius: 32px;\n    min-height: 360px;\n    background: linear-gradient(160deg, #0b806f, #0b5d4b);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    position: relative;\n    overflow: hidden;\n}\n.hero-carousel-placeholder__content[data-v-2ba25654] {\n    color: rgba(255, 255, 255, 0.85);\n    text-align: center;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 1rem;\n}\n.hero-carousel-placeholder__ring[data-v-2ba25654] {\n    width: 90px;\n    height: 90px;\n    border-radius: 50%;\n    border: 3px dashed rgba(255, 255, 255, 0.6);\n    animation: placeholder-spin-2ba25654 4s linear infinite;\n}\n.hero-carousel-placeholder__text[data-v-2ba25654] {\n    font-weight: 500;\n    font-size: 1rem;\n    max-width: 220px;\n}\n@keyframes placeholder-spin-2ba25654 {\nfrom { transform: rotate(0deg);\n}\nto { transform: rotate(360deg);\n}\n}\n", ""]);
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
___CSS_LOADER_EXPORT___.push([module.id, "\n/* Combined Section */\n.combined-section[data-v-2ba25654] {\n  padding: 80px 0;\n  background: #f8f9fa;\n}\n/* Performance optimizations */\n.img-fluid[data-v-2ba25654] {\n  max-width: 100%;\n  height: auto;\n}\n.rounded-3[data-v-2ba25654] {\n  border-radius: 0.75rem !important;\n}\n.shadow-sm[data-v-2ba25654] {\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;\n}\n/* Improved button styling */\n.btn-primary[data-v-2ba25654] {\n  transition: all 0.2s ease-in-out;\n}\n.btn-primary[data-v-2ba25654]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 191, 166, 0.3);\n}\n/* Value Cards */\n.value-card[data-v-2ba25654] {\n  background: #fafbfc;\n  padding: 2rem 1.5rem;\n  border-radius: 12px;\n  border: 1px solid #e9ecef;\n  height: 100%;\n  transition: all 0.3s ease;\n  position: relative;\n  overflow: hidden;\n}\n.value-card[data-v-2ba25654]::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 4px;\n  height: 100%;\n  background: #1a5f7a;\n  transform: scaleY(0);\n  transition: transform 0.3s ease;\n}\n.value-card[data-v-2ba25654]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\n}\n.value-card[data-v-2ba25654]:hover::before {\n  transform: scaleY(1);\n}\n.value-icon[data-v-2ba25654] {\n  font-size: 1.75rem;\n  margin-bottom: 1rem;\n  opacity: 0.8;\n}\n.value-card h4[data-v-2ba25654] {\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: #1a5f7a;\n  margin-bottom: 1rem;\n}\n.value-card p[data-v-2ba25654] {\n  color: #6c757d;\n  line-height: 1.6;\n  margin: 0;\n  font-size: 0.95rem;\n}\n/* Donation Section */\n.donation-form[data-v-2ba25654] {\n  background: #fff;\n  padding: 3rem;\n  border-radius: 16px;\n  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);\n  border: 1px solid #e9ecef;\n  position: relative;\n  height: 100%;\n}\n.donation-form[data-v-2ba25654]::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background: linear-gradient(90deg, #1a5f7a, #2c3e50);\n  border-radius: 16px 16px 0 0;\n}\n.form-header h3[data-v-2ba25654] {\n  font-size: 1.75rem;\n  padding-top: 5px;\n  font-weight: 800;\n  color: #2c3e50;\n}\n.form-header h2[data-v-2ba25654] {\n  font-size: 1.75rem;\n  font-weight: 800;\n  color: #2c3e50;\n}\n.form-header p[data-v-2ba25654] {\n  font-size: 1.1rem;\n  color: #6c757d;\n}\n/* Trust Indicators */\n.trust-indicators[data-v-2ba25654] {\n  display: flex;\n  justify-content: space-around;\n  padding: 1rem;\n  background: #f8f9fa;\n  border-radius: 8px;\n  border: 1px solid #e9ecef;\n}\n.trust-item[data-v-2ba25654] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.85rem;\n  color: #495057;\n  font-weight: 500;\n}\n.trust-item i[data-v-2ba25654] {\n  color: #1a5f7a;\n}\n/* Enhanced Summary */\n.summary-section[data-v-2ba25654] {\n  background: #f8f9fa;\n  padding: 1.5rem;\n  border-radius: 12px;\n  border-left: 4px solid #1a5f7a;\n}\n.summary-header[data-v-2ba25654] {\n  margin-bottom: 1rem;\n  padding-bottom: 0.5rem;\n  border-bottom: 1px solid #dee2e6;\n}\n.summary-header h6[data-v-2ba25654] {\n  margin: 0;\n  color: #2c3e50;\n  font-weight: 600;\n}\n.summary-item[data-v-2ba25654] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem 0;\n}\n.summary-item[data-v-2ba25654]:not(:last-child) {\n  border-bottom: 1px solid #dee2e6;\n}\n/* Enhanced Primary Button */\n.btn-primary[data-v-2ba25654] {\n  background: #1a5f7a;\n  border: none;\n  color: white;\n  padding: 1.25rem 2rem;\n  font-weight: 600;\n  border-radius: 12px;\n  transition: all 0.3s ease;\n  font-size: 1.1rem;\n  position: relative;\n  overflow: hidden;\n}\n.btn-primary[data-v-2ba25654]:hover:not(:disabled) {\n  background: #144a5f;\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(26, 95, 122, 0.4);\n}\n.btn-primary[data-v-2ba25654]:disabled {\n  background: #6c757d;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.security-guarantee[data-v-2ba25654] {\n  padding: 1rem;\n  background: #f8f9fa;\n  border-radius: 8px;\n  border: 1px solid #e9ecef;\n}\n.card[data-v-2ba25654]:hover {\n  transform: translateY(-5px);\n}\n.stats-section[data-v-2ba25654] {\n  padding: 5rem 0;\n  background: linear-gradient(135deg, #1a5f7a 0%, #2c3e50 100%);\n  color: white;\n}\n.section-title[data-v-2ba25654] {\n  font-size: 2.7rem;\n  font-weight: 700;\n  margin-bottom: 1rem;\n  color: white;\n}\n.section-lead[data-v-2ba25654] {\n  font-size: 1.2rem;\n  margin-bottom: 3rem;\n  opacity: 0.9;\n  color: rgba(255, 255, 255, 0.9);\n}\n.stats-grid[data-v-2ba25654] {\n  margin-top: 2rem;\n}\n.stat-card[data-v-2ba25654] {\n  text-align: center;\n  padding: 1.5rem;\n}\n.stat-card h3[data-v-2ba25654] {\n  font-size: 2.75rem;\n  font-weight: 700;\n  margin-bottom: 0.5rem;\n  color: white;\n}\n.stat-card p[data-v-2ba25654] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  margin-bottom: 0.25rem;\n  color: rgba(255, 255, 255, 0.9);\n}\n.stat-card small[data-v-2ba25654] {\n  font-size: 0.9rem;\n  color: rgba(255, 255, 255, 0.7);\n}\n.value-section[data-v-2ba25654] {\n  padding: 5rem 0;\n  background: #f8f9fa;\n}\n.value-section h2[data-v-2ba25654] {\n  font-size: 2.25rem;\n  font-weight: 700;\n  color: #2c3e50;\n}\n.value-card[data-v-2ba25654] {\n  background: white;\n  padding: 2.5rem;\n  border-radius: 12px;\n  border: 1px solid #e9ecef;\n  height: 100%;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n.value-card[data-v-2ba25654]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\n}\n.value-card h4[data-v-2ba25654] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: #1a5f7a;\n  margin-bottom: 1rem;\n}\n.value-card p[data-v-2ba25654] {\n  color: #6c757d;\n  line-height: 1.6;\n  margin: 0;\n}\n/* Responsive Design */\n@media (max-width: 768px) {\n.stats-section[data-v-2ba25654],\n  .value-section[data-v-2ba25654] {\n    padding: 3rem 0;\n}\n.section-title[data-v-2ba25654] {\n    font-size: 2rem;\n}\n.stat-card h3[data-v-2ba25654] {\n    font-size: 2.25rem;\n}\n.value-card[data-v-2ba25654] {\n    padding: 2rem;\n}\n}\n.partner-icon[data-v-2ba25654] {\n  width: 150px;\n  height: 150px;\n  -o-object-fit: contain;\n     object-fit: contain;\n  transition: filter 0.3s ease, transform 0.3s ease;\n}\n.partner-icon[data-v-2ba25654]:hover {\n  transform: scale(1.1);\n}\nh4[data-v-2ba25654] {\n  font-size: 1.8rem;\n  font-weight: 800;\n}\n@media (max-width: 991.98px) {\n.h1[data-v-2ba25654] {\n    font-size: 2rem !important;\n}\n.lead[data-v-2ba25654] {\n    font-size: 1.1rem;\n}\n.py-4[data-v-2ba25654] {\n    padding-top: 2rem !important;\n    padding-bottom: 2rem !important;\n}\n}\n/* Reduced motion support */\n@media (prefers-reduced-motion: reduce) {\n.btn-primary[data-v-2ba25654] {\n    transition: none;\n}\n.btn-primary[data-v-2ba25654]:hover {\n    transform: none;\n}\n}\n/* High contrast mode support */\n@media (prefers-contrast: high) {\n.text-muted[data-v-2ba25654] {\n    color: #000 !important;\n}\n.shadow-sm[data-v-2ba25654] {\n    box-shadow: 0 0 0 2px #000 !important;\n}\n}\n@media (max-width: 768px) {\n.partner-icon[data-v-2ba25654] {\n    width: 130px;\n    height: 130px;\n}\nh4[data-v-2ba25654] {\n    font-size: 1.45rem;\n}\n}\n/* Utilities for consistent 20px rounded aesthetic and subtle animations */\n.rounded-20[data-v-2ba25654] { border-radius: 20px !important;\n}\n.card-20[data-v-2ba25654] { border-radius: 20px; overflow: hidden;\n}\n.card-float[data-v-2ba25654] { transition: transform .25s ease, box-shadow .25s ease;\n}\n.card-float[data-v-2ba25654]:hover { transform: translateY(-4px); box-shadow: 0 10px 24px rgba(0,0,0,.12) !important;\n}\n.btn-teal[data-v-2ba25654] { background-color: #0db691; color: #fff; border: none; transition: background-color .2s ease, transform .2s ease, box-shadow .2s ease;\n}\n.btn-teal[data-v-2ba25654]:hover { background-color: #0aa07f; color: #fff; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,.15);\n}\n.btn-teal[data-v-2ba25654]:focus-visible { outline: none; animation: focusPulse-2ba25654 .6s ease;\n}\n@keyframes focusPulse-2ba25654 {\n0% { box-shadow: 0 0 0 0 rgba(13,182,145,.45);\n}\n100% { box-shadow: 0 0 0 8px rgba(13,182,145,0);\n}\n}\n@media (prefers-reduced-motion: reduce) {\n.card-float[data-v-2ba25654], .btn-teal[data-v-2ba25654] { transition: none !important; animation: none !important;\n}\n}\n.premium-seo[data-v-2ba25654] {\n  background: rgba(255, 255, 255, 0.8);\n  border-radius: 32px;\n  padding: 3rem 0 4.5rem;\n  box-shadow: 0 30px 70px rgba(13, 128, 111, 0.1);\n  overflow: hidden;\n  position: relative;\n}\n.premium-card[data-v-2ba25654] {\n  background: #fff;\n  border-radius: 20px;\n  padding: 1.5rem;\n  border: 1px solid #e3e8ed;\n  box-shadow: 0 25px 40px rgba(15, 76, 117, 0.08);\n  transition: transform .35s ease, box-shadow .35s ease;\n}\n.premium-card[data-v-2ba25654]:hover {\n  transform: translateY(-6px);\n  box-shadow: 0 35px 45px rgba(9, 70, 102, 0.15);\n}\n.premium-card h3[data-v-2ba25654] {\n  font-size: 1rem;\n}\n.premium-stat[data-v-2ba25654] {\n  border-radius: 18px;\n  background: linear-gradient(145deg, rgba(13, 128, 111, 0.08), rgba(12, 112, 95, 0.07));\n  border: 1px solid rgba(13, 128, 111, 0.15);\n  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4);\n  animation: pulse-2ba25654 6s ease-in-out infinite;\n}\n.text-teal[data-v-2ba25654] {\n  color: #0db691;\n}\n.highlight-badge[data-v-2ba25654] {\n  border-radius: 999px;\n  padding: 0.35rem 1rem;\n  font-size: 0.75rem;\n  letter-spacing: 0.08em;\n  background: rgba(13, 128, 111, 0.12);\n  color: #0b806f;\n  border: 1px solid rgba(13, 128, 111, 0.2);\n}\n@keyframes pulse-2ba25654 {\n0% {\n    transform: translateY(0);\n}\n50% {\n    transform: translateY(-4px);\n}\n100% {\n    transform: translateY(0);\n}\n}\n.premium-seo__backdrop[data-v-2ba25654] {\n  position: absolute;\n  width: 420px;\n  height: 420px;\n  border-radius: 50%;\n  right: -90px;\n  top: -120px;\n  background: radial-gradient(circle, rgba(13, 128, 111, 0.25), transparent 60%);\n  filter: blur(12px);\n  z-index: 0;\n  animation: float-glow-2ba25654 12s ease-in-out infinite;\n}\n.premium-seo .container[data-v-2ba25654] {\n  position: relative;\n  z-index: 1;\n}\n@keyframes float-glow-2ba25654 {\n0% {\n    transform: translateY(0);\n}\n50% {\n    transform: translateY(-8px);\n}\n100% {\n    transform: translateY(0);\n}\n}\n.journeys-section[data-v-2ba25654] {\n  max-width: 1100px;\n}\n.journeys-section .premium-card[data-v-2ba25654] {\n  min-height: 180px;\n  justify-content: space-between;\n}\n", ""]);
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


/***/ })

}]);