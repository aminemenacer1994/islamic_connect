"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_AccessComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AccessComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AccessComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      userInput: "",
      chatMessages: [],
      loading: false,
      error: null,
      modelAPI: "https://api-inference.huggingface.co/models/llmQnA/bert-large-uncased-whole-word-masking-finetuned-squad",
      apiToken: "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"
    };
  },
  methods: {
    async sendMessage() {
      if (!this.userInput.trim()) return;
      this.addMessage("user", this.userInput);
      const userQuestion = this.userInput;
      this.userInput = "";
      this.loading = true;
      try {
        var _data$;
        const response = await fetch(this.modelAPI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiToken}`
          },
          body: JSON.stringify({
            inputs: userQuestion,
            parameters: {
              max_new_tokens: 200
            }
          })
        });
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        const output = Array.isArray(data) && (_data$ = data[0]) !== null && _data$ !== void 0 && _data$.generated_text ? data[0].generated_text : (data === null || data === void 0 ? void 0 : data.generated_text) || "Sorry, I couldn't generate a response.";
        this.addMessage("bot", output.trim());
      } catch (err) {
        console.error("Fetch Error:", err);
        this.addMessage("bot", "An error occurred while fetching the answer. Please try again later.");
      } finally {
        this.loading = false;
        this.scrollToBottom();
      }
    },
    addMessage(sender, text) {
      this.chatMessages.push({
        sender,
        text
      });
    },
    clearChat() {
      this.chatMessages = [];
      this.error = null;
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatBox = this.$refs.chatBox;
        if (chatBox) {
          chatBox.scrollTop = chatBox.scrollHeight;
        }
      });
    },
    getErrorMessage(error) {
      if (error.response) {
        switch (error.response.status) {
          case 429:
            return "Rate limit exceeded. Please wait a minute and try again.";
          case 503:
            return "Model is currently loading. Please try again in a moment.";
          default:
            return "Sorry, there was an error processing your request.";
        }
      } else if (error.request) {
        return "Network error. Please check your connection.";
      } else {
        return "An unexpected error occurred.";
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AccessComponent.vue?vue&type=template&id=3b32bfde&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AccessComponent.vue?vue&type=template&id=3b32bfde&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "chat-container"
};
const _hoisted_2 = {
  class: "chat-header"
};
const _hoisted_3 = {
  class: "chat-box",
  ref: "chatBox"
};
const _hoisted_4 = {
  key: 0,
  class: "loading"
};
const _hoisted_5 = {
  class: "input-container"
};
const _hoisted_6 = ["disabled"];
const _hoisted_7 = ["disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chatbot Header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, "Islamic AI Assistant", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[0] || (_cache[0] = (...args) => $options.clearChat && $options.clearChat(...args)),
    class: "clear-btn"
  }, "Clear")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.chatMessages, (message, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: index,
      class: "message"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(message.sender === 'user' ? 'user-message' : 'ai-message')
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(message.text), 1 /* TEXT */)], 2 /* CLASS */)]);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Loading Indicator "), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_4, [...(_cache[5] || (_cache[5] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "loader"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "loading-text"
  }, "Typing...", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Input Area "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.userInput = $event),
    onKeydown: _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((...args) => $options.sendMessage && $options.sendMessage(...args), ["enter"])),
    type: "text",
    class: "input-field",
    placeholder: "Ask a question...",
    disabled: $data.loading
  }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_6), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.userInput]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[3] || (_cache[3] = (...args) => $options.sendMessage && $options.sendMessage(...args)),
    class: "send-btn",
    disabled: $data.loading
  }, "Send", 8 /* PROPS */, _hoisted_7)])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AccessComponent.vue?vue&type=style&index=0&id=3b32bfde&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AccessComponent.vue?vue&type=style&index=0&id=3b32bfde&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n/* Global styles */\n[data-v-3b32bfde] {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\nbody[data-v-3b32bfde] {\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n  background-color: #f0f4f8;\n  color: #333;\n  line-height: 1.6;\n}\n/* Chat Container */\n.chat-container[data-v-3b32bfde] {\n  max-width: 1200px;\n  margin: 50px auto;\n  background-color: #fff;\n  border-radius: 15px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n  display: flex;\n  flex-direction: column;\n  height: 80vh;\n  overflow: hidden;\n}\n/* Header */\n.chat-header[data-v-3b32bfde] {\n  background-color: #00796b;\n  color: #fff;\n  padding: 20px;\n  text-align: center;\n  font-size: 18px;\n  font-weight: bold;\n  position: relative;\n}\n.clear-btn[data-v-3b32bfde] {\n  position: absolute;\n  right: 20px;\n  top: 15px;\n  background-color: #ff5722;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 5px;\n  font-size: 14px;\n  cursor: pointer;\n}\n.clear-btn[data-v-3b32bfde]:hover {\n  background-color: #e64a19;\n}\n/* Chatbox Area */\n.chat-box[data-v-3b32bfde] {\n  flex-grow: 1;\n  padding: 20px;\n  background-color: #fafafa;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n  transition: all 0.3s ease;\n}\n.message[data-v-3b32bfde] {\n  word-wrap: break-word;\n  display: flex;\n  flex-direction: column;\n}\n.user-message[data-v-3b32bfde] {\n  align-self: flex-end;\n  background-color: #00796b;\n  color: white;\n  padding: 12px;\n  border-radius: 12px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  max-width: 80%;\n  transition: transform 0.2s ease-in-out;\n}\n.ai-message[data-v-3b32bfde] {\n  align-self: flex-start;\n  background-color: #eceff1;\n  color: #00796b;\n  padding: 12px;\n  border-radius: 12px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  max-width: 80%;\n  transition: transform 0.2s ease-in-out;\n}\n.message[data-v-3b32bfde]:hover {\n  transform: translateY(-5px);\n}\n.loading[data-v-3b32bfde] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-top: 20px;\n  font-size: 16px;\n  color: #00796b;\n}\n.loader[data-v-3b32bfde] {\n  border: 4px solid #f3f3f3;\n  border-top: 4px solid #00796b;\n  border-radius: 50%;\n  width: 24px;\n  height: 24px;\n  animation: spin-3b32bfde 1s linear infinite;\n}\n@keyframes spin-3b32bfde {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n.loading-text[data-v-3b32bfde] {\n  margin-left: 10px;\n}\n/* Input and Button */\n.input-container[data-v-3b32bfde] {\n  display: flex;\n  padding: 20px;\n  background-color: #fff;\n  border-top: 1px solid #ddd;\n  gap: 10px;\n}\n.input-field[data-v-3b32bfde] {\n  flex-grow: 1;\n  padding: 12px;\n  font-size: 16px;\n  border: 2px solid #ddd;\n  border-radius: 25px;\n  background-color: #f5f5f5;\n  transition: border-color 0.3s ease;\n}\n.input-field[data-v-3b32bfde]:focus {\n  border-color: #00796b;\n  outline: none;\n}\n.input-field[data-v-3b32bfde]:disabled {\n  background-color: #f0f0f0;\n}\n.send-btn[data-v-3b32bfde] {\n  background-color: #00796b;\n  color: white;\n  padding: 12px 18px;\n  font-size: 16px;\n  border: none;\n  border-radius: 25px;\n  cursor: pointer;\n  width: 80px;\n  transition: background-color 0.3s ease;\n}\n.send-btn[data-v-3b32bfde]:disabled {\n  background-color: #bbb;\n}\n.send-btn[data-v-3b32bfde]:hover {\n  background-color: #004d40;\n}\n/* Responsive Design */\n@media (max-width: 600px) {\n.chat-container[data-v-3b32bfde] {\n    width: 98%;\n    height: 80vh;\n}\n.clear-btn[data-v-3b32bfde] {\n    top: 10px;\n    right: 10px;\n}\n.input-container[data-v-3b32bfde] {\n    padding: 15px;\n}\n.input-field[data-v-3b32bfde] {\n    font-size: 14px;\n}\n.send-btn[data-v-3b32bfde] {\n    font-size: 14px;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AccessComponent.vue?vue&type=style&index=0&id=3b32bfde&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AccessComponent.vue?vue&type=style&index=0&id=3b32bfde&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AccessComponent_vue_vue_type_style_index_0_id_3b32bfde_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AccessComponent.vue?vue&type=style&index=0&id=3b32bfde&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AccessComponent.vue?vue&type=style&index=0&id=3b32bfde&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AccessComponent_vue_vue_type_style_index_0_id_3b32bfde_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AccessComponent_vue_vue_type_style_index_0_id_3b32bfde_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/AccessComponent.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/AccessComponent.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AccessComponent_vue_vue_type_template_id_3b32bfde_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AccessComponent.vue?vue&type=template&id=3b32bfde&scoped=true */ "./resources/js/components/AccessComponent.vue?vue&type=template&id=3b32bfde&scoped=true");
/* harmony import */ var _AccessComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AccessComponent.vue?vue&type=script&lang=js */ "./resources/js/components/AccessComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _AccessComponent_vue_vue_type_style_index_0_id_3b32bfde_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AccessComponent.vue?vue&type=style&index=0&id=3b32bfde&scoped=true&lang=css */ "./resources/js/components/AccessComponent.vue?vue&type=style&index=0&id=3b32bfde&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_AccessComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AccessComponent_vue_vue_type_template_id_3b32bfde_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-3b32bfde"],['__file',"resources/js/components/AccessComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/AccessComponent.vue?vue&type=script&lang=js":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/AccessComponent.vue?vue&type=script&lang=js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AccessComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AccessComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AccessComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AccessComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/AccessComponent.vue?vue&type=style&index=0&id=3b32bfde&scoped=true&lang=css":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/AccessComponent.vue?vue&type=style&index=0&id=3b32bfde&scoped=true&lang=css ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AccessComponent_vue_vue_type_style_index_0_id_3b32bfde_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AccessComponent.vue?vue&type=style&index=0&id=3b32bfde&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AccessComponent.vue?vue&type=style&index=0&id=3b32bfde&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/AccessComponent.vue?vue&type=template&id=3b32bfde&scoped=true":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/AccessComponent.vue?vue&type=template&id=3b32bfde&scoped=true ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AccessComponent_vue_vue_type_template_id_3b32bfde_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AccessComponent_vue_vue_type_template_id_3b32bfde_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AccessComponent.vue?vue&type=template&id=3b32bfde&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AccessComponent.vue?vue&type=template&id=3b32bfde&scoped=true");


/***/ })

}]);