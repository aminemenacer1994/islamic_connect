"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_MediaComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MediaComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MediaComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    isAuthenticated: {
      type: Boolean,
      required: true
    },
    isSubscribed: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    goTo(path) {
      window.location.href = path;
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MediaComponent.vue?vue&type=template&id=63cb17b8&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MediaComponent.vue?vue&type=template&id=63cb17b8&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container py-4"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [...(_cache[0] || (_cache[0] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "text-center fw-bold display-5 mb-4"
  }, "Media Center", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-center mb-4 lead"
  }, "The Media Center at Islamic Connect is a central hub for inspiring and educational Islamic content. It brings together voices, stories, and teachings from across the Muslim world, helping you stay connected, informed, and uplifted.", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row g-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-6 col-lg-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card custom-card rounded-4 overflow-hidden"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <span class=\"badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2\">New</span> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "/images/ap.avif",
    alt: "Qibla finder",
    class: "w-90 mt-1",
    style: {
      "object-fit": "contain",
      "padding": "20px"
    }
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "p-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "mb-2 fw-bold text-dark text-center"
  }, "Audio Podcasts"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "card-text text-muted text-wrap text-center",
    style: {
      "overflow": "hidden",
      "text-overflow": "ellipsis",
      "max-height": "4.5em"
    }
  }, " Islamic podcasts offer insightful discussions and teachings from speakers on various aspects of Islamic faith, history, and daily life. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "form-control",
    onclick: "window.location.href='/content'",
    type: "submit"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-center w-100"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Stream Podcasts")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button v-if=\"isAuthenticated && isSubscribed\" class=\"form-control\" @click=\"goTo('/content')\" type=\"button\" style=\"background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px; padding: 0.375rem 0.75rem;\">\n                            <span class=\"text-center w-100\"><b>Stream Podcasts</b></span>\n                        </button> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-else class=\"restricted-access text-center p-2\" style=\"border-radius: 5px; animation: borderPulse 2s infinite ease-in-out;\">\n                            <p class=\"mb-1 text-muted small\">You must be subscribed to access</p>\n                            <a href=\"/subscribe\" class=\"text-decoration-none\" style=\"color: #228B22; font-weight: bold;\">Subscribe Now</a>\n                        </div> ")])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-6 col-lg-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card custom-card rounded-4 overflow-hidden"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <span class=\"badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2\">New</span> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "/images/mtv2.png",
    alt: "Watch Live",
    class: "w-100",
    style: {
      "object-fit": "contain"
    }
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "p-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "mb-2 fw-bold text-dark text-center"
  }, "Channel Guide"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "card-text text-muted text-wrap text-center",
    style: {
      "overflow": "hidden",
      "text-overflow": "ellipsis",
      "max-height": "4.5em"
    }
  }, " Find Islamic channels and access their posts, channel, website, playlists, and videos directly on YouTube. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "form-control",
    onclick: "window.location.href='/streaming'",
    type: "submit"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-center w-100"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "View Channels")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button v-if=\"isAuthenticated && isSubscribed\" class=\"form-control\" @click=\"goTo('/streaming')\" type=\"button\" style=\"background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px; padding: 0.375rem 0.75rem;\">\n                            <span class=\"text-center w-100\"><b>View Channels</b></span>\n                        </button> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-else class=\"restricted-access text-center p-2\" style=\" border-radius: 5px; animation: borderPulse 2s infinite ease-in-out;\">\n                            <p class=\"mb-1 text-muted small\">You must be subscribed to access</p>\n                            <a href=\"/subscribe\" class=\"text-decoration-none\" style=\"color: #228B22; font-weight: bold;\">Subscribe Now</a>\n                        </div> ")])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-6 col-lg-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card custom-card rounded-4 overflow-hidden"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <span class=\"badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2\">New</span> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "/images/radio5.jpg",
    alt: "Radio stations",
    class: "w-100",
    style: {
      "object-fit": "contain"
    }
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "p-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "mb-2 fw-bold text-dark text-center"
  }, "Reciters Stations"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "card-text text-muted text-wrap text-center",
    style: {
      "overflow": "hidden",
      "text-overflow": "ellipsis",
      "max-height": "4.5em"
    }
  }, " Tune in to live Islamic radio from around the world, featuring Qur'an recitations, lectures, nasheeds, and spiritual reminders—streamed 24/7 in multiple languages. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "form-control",
    onclick: "window.location.href='/radio'",
    style: {
      "background": "#0b5d4b",
      "box-shadow": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      "color": "white",
      "height": "38px",
      "padding": "0.375rem 0.75rem"
    },
    type: "submit"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-center w-100"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Explore Reciters")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button v-if=\"isAuthenticated && isSubscribed\" class=\"form-control\" @click=\"goTo('/radio')\" type=\"button\" style=\"background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px; padding: 0.375rem 0.75rem;\">\n                            <span class=\"text-center w-100\"><b>Explore Reciters</b></span>\n                        </button> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-else class=\"restricted-access text-center p-2\" style=\" border-radius: 5px; animation: borderPulse 2s infinite ease-in-out;\">\n                            <p class=\"mb-1 text-muted small\">You must be subscribed to access</p>\n                            <a href=\"/subscribe\" class=\"text-decoration-none\" style=\"color: #228B22; font-weight: bold;\">Subscribe Now</a>\n                        </div> ")])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-6 col-lg-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card custom-card overflow-hidden rounded-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "/images/img_g.png",
    alt: "Image Gallery",
    class: "w-100",
    style: {
      "object-fit": "contain"
    }
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "p-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "mb-2 fw-bold text-dark text-center"
  }, "Image Gallery"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "card-text text-muted text-wrap text-center",
    style: {
      "overflow": "hidden",
      "text-overflow": "ellipsis",
      "max-height": "4.5em"
    }
  }, " Explore a beautiful collection of high-quality Islamic images capturing the essence of faith, culture, and tradition. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "form-control",
    onclick: "window.location.href='/gallery'",
    style: {
      "background": "#0b5d4b",
      "box-shadow": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      "color": "white",
      "height": "38px",
      "padding": "0.375rem 0.75rem"
    },
    type: "submit"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-center w-100"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "View Gallery")])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-6 col-lg-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card custom-card overflow-hidden rounded-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "/images/vide_g.png",
    alt: "Video Gallery",
    class: "w-100",
    style: {
      "object-fit": "contain"
    }
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "p-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "mb-2 fw-bold text-dark text-center"
  }, "Video Gallery"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "card-text text-muted text-wrap text-center",
    style: {
      "overflow": "hidden",
      "text-overflow": "ellipsis",
      "max-height": "4.5em"
    }
  }, " Explore a curated collection of short Islamic videos featuring reminders, duas, stories of the Prophets and Quranic reflections. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "form-control",
    onclick: "window.location.href='/video'",
    style: {
      "background": "#0b5d4b",
      "box-shadow": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      "color": "white",
      "height": "38px",
      "padding": "0.375rem 0.75rem"
    },
    type: "submit"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-center w-100"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Watch Videos")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button v-if=\"isAuthenticated && isSubscribed\" class=\"form-control\" @click=\"goTo('/video')\" type=\"button\" style=\"background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px; padding: 0.375rem 0.75rem;\">\n                            <span class=\"text-center w-100\"><b>Watch Videos</b></span>\n                        </button> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-else class=\"restricted-access text-center p-2\" style=\" border-radius: 5px; animation: borderPulse 2s infinite ease-in-out;\">\n                            <p class=\"mb-1 text-muted small\">You must be subscribed to access</p>\n                            <a href=\"/subscribe\" class=\"text-decoration-none\" style=\"color: rgb(0, 107, 95); font-weight: bold;\">Subscribe Now</a>\n                        </div> ")])])])], -1 /* CACHED */)]))]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MediaComponent.vue?vue&type=style&index=0&id=63cb17b8&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MediaComponent.vue?vue&type=style&index=0&id=63cb17b8&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n/* Design tokens */\n[data-v-63cb17b8]:root {\n    --brand-1: #1a5f7a;\n    --brand-2: #0b5d4b;\n    --accent: #00bfa6;\n    --text-1: #2c3e50;\n    --text-2: #6c757d;\n    --surface: #ffffff;\n    --surface-muted: #f8f9fa;\n    --border: #e9ecef;\n    --shadow-sm: 0 4px 14px rgba(0, 0, 0, 0.06);\n    --shadow-md: 0 10px 24px rgba(0, 0, 0, 0.10);\n}\n/* Typography & spacing */\n.container > h1.display-5[data-v-63cb17b8] { letter-spacing: -0.01em; margin-bottom: 0.75rem; color: var(--text-1);\n}\n.lead[data-v-63cb17b8] { color: var(--text-2); line-height: 1.75; margin-left: auto; margin-right: auto;\n}\n.custom-card .display-6[data-v-63cb17b8] { font-size: 1.4rem; font-weight: 800; color: var(--text-1);\n}\n.card.custom-card .card-text[data-v-63cb17b8] { font-size: 0.95rem; line-height: 1.6; color: var(--text-2);\n}\n@media (max-width: 768px) {\n.container > h1.display-5[data-v-63cb17b8] { font-size: 2rem !important;\n}\n.custom-card .display-6[data-v-63cb17b8] { font-size: 1.1rem;\n}\n.custom-card img[data-v-63cb17b8] { height: 160px;\n}\n.lead[data-v-63cb17b8] { font-size: 1rem;\n}\n}\n@media (min-width: 992px) {\n.custom-card img[data-v-63cb17b8] { height: 190px;\n}\n}\n.card.custom-card .card-text[data-v-63cb17b8] {\n    max-height: 4.5em;\n    text-overflow: ellipsis;\n}\n.card.custom-card button.form-control[data-v-63cb17b8] {\n    background: #0b5d4b;\n    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;\n    color: #fff;\n    height: 38px;\n    padding: 0.375rem 0.75rem;\n    border: none;\n}\n.card.custom-card button.form-control[data-v-63cb17b8]:focus-visible { outline: 3px solid rgba(0,191,166,0.45); outline-offset: 2px;\n}\n.custom-card[data-v-63cb17b8] { border: none; border-radius: 16px; background: #fff; height: 100%; box-shadow: 0 6px 20px rgba(0,0,0,0.08); transition: transform 0.25s ease, box-shadow 0.25s ease; position: relative; overflow: hidden;\n}\n.custom-card[data-v-63cb17b8]:hover { transform: translateY(-6px); box-shadow: 0 18px 45px rgba(0,0,0,0.16);\n}\n.custom-card[data-v-63cb17b8]::before { content: \"\"; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--brand-2), var(--brand-1)); transform: scaleX(0.4); transform-origin: left; transition: transform 0.3s ease;\n}\n.custom-card[data-v-63cb17b8]:hover::before { transform: scaleX(1);\n}\n.custom-card img[data-v-63cb17b8] { height: 180px; -o-object-fit: contain; object-fit: contain; transition: transform 0.25s ease; border: none;\n}\n.custom-card:hover img[data-v-63cb17b8] { transform: scale(1.05);\n}\n@keyframes borderPulse-63cb17b8 {\n0% {\n        border-color: #228B22;\n        box-shadow: 0 0 5px rgba(0, 107, 95, 0.4);\n}\n50% {\n        border-color: #00564c;\n        box-shadow: 0 0 12px rgba(0, 86, 76, 0.7);\n}\n100% {\n        border-color: #228B22;\n        box-shadow: 0 0 5px rgba(0, 107, 95, 0.4);\n}\n}\n.card.custom-card[data-v-63cb17b8] { animation: none;\n}\n.restricted-access[data-v-63cb17b8] { background: #28b66324; transition: background-color 0.2s ease, transform 0.2s ease;\n}\n.restricted-access[data-v-63cb17b8]:hover { background: #28b66333; transform: translateY(-2px);\n}\n.restricted-access a[data-v-63cb17b8]:hover { color: var(--brand-2); text-decoration: underline;\n}\n@media (prefers-reduced-motion: reduce) {\n.custom-card[data-v-63cb17b8], .custom-card img[data-v-63cb17b8], .card.custom-card button.form-control[data-v-63cb17b8] { transition: none !important;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MediaComponent.vue?vue&type=style&index=0&id=63cb17b8&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MediaComponent.vue?vue&type=style&index=0&id=63cb17b8&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MediaComponent_vue_vue_type_style_index_0_id_63cb17b8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MediaComponent.vue?vue&type=style&index=0&id=63cb17b8&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MediaComponent.vue?vue&type=style&index=0&id=63cb17b8&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MediaComponent_vue_vue_type_style_index_0_id_63cb17b8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MediaComponent_vue_vue_type_style_index_0_id_63cb17b8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/MediaComponent.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/MediaComponent.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MediaComponent_vue_vue_type_template_id_63cb17b8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MediaComponent.vue?vue&type=template&id=63cb17b8&scoped=true */ "./resources/js/components/MediaComponent.vue?vue&type=template&id=63cb17b8&scoped=true");
/* harmony import */ var _MediaComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MediaComponent.vue?vue&type=script&lang=js */ "./resources/js/components/MediaComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _MediaComponent_vue_vue_type_style_index_0_id_63cb17b8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MediaComponent.vue?vue&type=style&index=0&id=63cb17b8&scoped=true&lang=css */ "./resources/js/components/MediaComponent.vue?vue&type=style&index=0&id=63cb17b8&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_MediaComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_MediaComponent_vue_vue_type_template_id_63cb17b8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-63cb17b8"],['__file',"resources/js/components/MediaComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/MediaComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/MediaComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MediaComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MediaComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MediaComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MediaComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/MediaComponent.vue?vue&type=style&index=0&id=63cb17b8&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/MediaComponent.vue?vue&type=style&index=0&id=63cb17b8&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MediaComponent_vue_vue_type_style_index_0_id_63cb17b8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MediaComponent.vue?vue&type=style&index=0&id=63cb17b8&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MediaComponent.vue?vue&type=style&index=0&id=63cb17b8&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/MediaComponent.vue?vue&type=template&id=63cb17b8&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/MediaComponent.vue?vue&type=template&id=63cb17b8&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MediaComponent_vue_vue_type_template_id_63cb17b8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MediaComponent_vue_vue_type_template_id_63cb17b8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MediaComponent.vue?vue&type=template&id=63cb17b8&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MediaComponent.vue?vue&type=template&id=63cb17b8&scoped=true");


/***/ })

}]);