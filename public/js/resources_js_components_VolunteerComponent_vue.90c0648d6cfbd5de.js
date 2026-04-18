"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_VolunteerComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/VolunteerComponent.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/VolunteerComponent.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      micActive: false,
      micClicked: false,
      voices: [],
      selectedVoice: null,
      micActive: false,
      isSpeaking: false,
      isPaused: false,
      currentUtterance: null,
      isDesktop: window.innerWidth >= 768,
      question: "",
      loading: false,
      chatHistory: [],
      // Store the entire conversation history
      showChat: false,
      // Flag to toggle chat visibility
      isExpanded: false,
      // Flag to toggle expanded state
      apiToken: process.env.HF_API_KEY || "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",
      // API token
      editingIndex: null,
      // Track the index of the message being edited
      defaultMessage: {
        type: "bot",
        text: "Assalamu Alaikum! How can I assist you with Islamic knowledge today?"
      },
      commonQuestions: ["What are the Five Pillars of Islam?", "What is the significance of Ramadan?", "Who is Prophet Muhammad (PBUH)?", "What is the Quran?", "What is the importance of Salah (prayer)?", "What is Zakat and who is it for?", "What is Hajj and why is it important?", "What is the meaning of Tawheed?", "What are the major sins in Islam?", "What is the Day of Judgment in Islam?"]
    };
  },
  mounted() {
    if ('speechSynthesis' in window) {
      speechSynthesis.onvoiceschanged = () => {
        this.voices = speechSynthesis.getVoices();
        this.setDefaultVoice(); // Set once when voices load
      };

      // If voices already loaded
      const voicesNow = speechSynthesis.getVoices();
      if (voicesNow.length) {
        this.voices = voicesNow;
        this.setDefaultVoice();
      }
    }
  },
  methods: {
    setDefaultVoice() {
      // Pick your preferred voice by name or language
      const preferredVoice = this.voices.find(v => v.name.includes('Google US English') || v.lang === 'en-US');
      this.selectedVoice = preferredVoice || this.voices[0];
    },
    getVoices() {
      this.voices = speechSynthesis.getVoices();
      console.log("Available voices:", this.voices);
    },
    cleanAnswer(text) {
      // Removes only trailing question marks, not from the middle of the sentence
      return text.replace(/\?+$/, '').trim();
    },
    startSpeechRecognition() {
      this.micActive = !this.micActive;
      this.micClicked = true;
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Speech recognition is not supported in this browser.");
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.continuous = false; // true makes it infinite, but more error-prone on mobile
      recognition.interimResults = false;
      recognition.lang = "en-UK";
      recognition.onstart = () => {
        console.log("Voice recognition started.");
      };
      recognition.onresult = event => {
        const transcript = event.results[0][0].transcript.trim();
        this.question = transcript;
      };
      recognition.onerror = event => {
        console.error("Speech recognition error:", event.error);
      };
      recognition.onend = () => {
        console.log("Voice recognition ended.");
      };
      recognition.start();

      // Optional: Stop after 15 seconds even if silent
      setTimeout(() => {
        recognition.stop();
      }, 15000); // 15s
    },
    handleResize() {
      this.isDesktop = window.innerWidth >= 768;
    },
    // Save chat history to localStorage
    saveChat() {
      const chatName = prompt('Enter a name for this conversation:');
      if (chatName) {
        const savedChats = JSON.parse(localStorage.getItem('savedChats') || {});
        savedChats[chatName] = this.chatHistory;
        localStorage.setItem('savedChats', JSON.stringify(savedChats));
        alert('Chat saved successfully!');
      } else {
        alert('Please provide a name for the conversation.');
      }
    },
    // Retrieve a list of saved conversations
    getSavedChats() {
      const savedChats = JSON.parse(localStorage.getItem('savedChats') || {});
      return Object.keys(savedChats);
    },
    // Download chat history as a text file
    downloadChat() {
      const chatText = this.chatHistory.map(message => `${message.timestamp} - ${message.type === 'user' ? 'Question: ' : 'Answer: '}: ${message.text}`).join('\n');

      // Generate a filename with the current date and time
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 10); // YYYY-MM-DD
      const formattedTime = now.toTimeString().slice(0, 8).replace(/:/g, '-'); // HH-MM-SS
      const fileName = `chat_history_${formattedDate}_${formattedTime}.txt`;
      const blob = new Blob([chatText], {
        type: 'text/plain'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName; // Use the generated filename
      a.click();
      URL.revokeObjectURL(url);
    },
    // Load chat history from localStorage
    loadChat(chatName) {
      const savedChats = JSON.parse(localStorage.getItem('savedChats') || {});
      if (savedChats[chatName]) {
        this.chatHistory = savedChats[chatName];
        alert(`Chat "${chatName}" loaded successfully!`);
      } else {
        alert('No saved chat found with that name.');
      }
    },
    // Copy question and answer to clipboard
    copyQuestionAndAnswer(index) {
      if (index > 0 && this.chatHistory[index - 1].type === 'user') {
        const question = this.chatHistory[index - 1].text;
        const answer = this.chatHistory[index].text;
        const textToCopy = `Question: ${question}\nAnswer: ${answer}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
          alert('Copied to clipboard!');
        }).catch(err => {
          console.error('Failed to copy:', err);
          alert('Failed to copy. Please try again.');
        });
      } else {
        alert('No question found to copy.');
      }
    },
    // Share question and answer on WhatsApp
    shareOnWhatsApp(index) {
      const questionIndex = index - 1;
      if (questionIndex >= 0 && this.chatHistory[questionIndex].type === 'user') {
        const question = this.chatHistory[questionIndex].text;
        const answer = this.chatHistory[index].text;

        // Format the message
        const message = `Question: ${question}\nAnswer: ${answer}`;

        // Encode the message for the WhatsApp URL
        const encodedMessage = encodeURIComponent(message);

        // Generate the WhatsApp share link
        const whatsappURL = `https://api.whatsapp.com/send?text=${encodedMessage}`;

        // Open the link in a new tab
        window.open(whatsappURL, "_blank");
      } else {
        console.warn("Invalid message index for sharing.");
      }
    },
    togglePlayStop(message) {
      if (this.isSpeaking) {
        this.stopSpeaking(); // Stop the speaking if it's already playing
      } else {
        this.speakText(message.text); // Start speaking with the provided message
      }
    },
    // This method starts or resumes speaking
    speakText(text) {
      if (!('speechSynthesis' in window) || !this.selectedVoice) {
        console.warn('Speech synthesis not ready or voice not set.');
        return;
      }

      // Cancel existing speech
      if (speechSynthesis.speaking || speechSynthesis.pending) {
        speechSynthesis.cancel();
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = this.selectedVoice;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.onstart = () => {
        this.isSpeaking = true;
        this.isPaused = false;
      };
      utterance.onend = () => {
        this.isSpeaking = false;
        this.isPaused = false;
      };
      utterance.onerror = e => {
        console.error('Speech Synthesis Error:', e.error);
      };
      speechSynthesis.speak(utterance);
    },
    // This method stops speaking
    stopSpeaking() {
      if (this.isSpeaking) {
        speechSynthesis.cancel(); // Cancel ongoing speech
        this.isSpeaking = false; // Update the UI state
        this.isPaused = false; // Reset pause state
      }
    },
    // Toggles the visibility of the chatbox
    toggleChat() {
      this.showChat = !this.showChat;
      this.isExpanded = false; // Reset expanded state when toggling chat

      // Add a default message when opening the chat for the first time
      if (this.showChat && this.chatHistory.length === 0) {
        this.addMessage("bot", "Assalamu Alaikum! How can I assist you with Islamic knowledge today?");
      }
    },
    // Toggles the expanded state of the chatbox
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    // Auto-send a common question
    autoSendQuestion(question) {
      this.question = question;
      this.getAnswer();
    },
    // Adds a message to the chat history
    addMessage(type, text) {
      const timestamp = new Date().toLocaleString(); // Get current date and time
      this.chatHistory.push({
        type,
        text,
        timestamp
      }); // Add timestamp to the message
    },
    // Scroll to the latest message and always keep it at the bottom
    scrollToBottom() {
      const messagesContainer = this.$refs.messagesContainer;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },
    // Edit a question
    editQuestion(index) {
      this.question = this.chatHistory[index].text; // Load the question into the input field
      this.editingIndex = index; // Track which message is being edited
    },
    async getAnswer() {
      if (!this.question.trim()) {
        return;
      }
      if (this.editingIndex !== null) {
        var _this$chatHistory;
        if (((_this$chatHistory = this.chatHistory[this.editingIndex + 1]) === null || _this$chatHistory === void 0 ? void 0 : _this$chatHistory.type) === "bot") {
          this.chatHistory.splice(this.editingIndex + 1, 1);
        }
        this.chatHistory[this.editingIndex].text = this.question;
        this.editingIndex = null;
      } else {
        this.addMessage("user", this.question);
      }
      this.loading = true;
      const userQuestion = this.question;
      this.question = "";
      try {
        const response = await fetch("https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiToken}`
          },
          body: JSON.stringify({
            inputs: userQuestion,
            parameters: {
              max_new_tokens: 300
            }
          })
        });
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        if (data.generated_text) {
          let answerText = data.generated_text.trim();
          answerText = answerText.replace(/[^\w\s.,!?()'"-]/g, "").replace(/\n\s*\n/g, "\n").replace(/(\w)([.!?])(\w)/g, "$1$2 $3").trim();
          if (answerText.endsWith("?")) {
            answerText = answerText.slice(0, -1).trim();
          }
          answerText = answerText.replace(/(.{100,120})\s/g, "$1\n");
          this.addMessage("bot", answerText);
        } else {
          this.addMessage("bot", "Sorry, I couldn't find an answer. Try rephrasing your question.");
        }
      } catch (err) {
        this.addMessage("bot", "An error occurred while fetching the answer. Please try again later.");
        console.error("Fetch Error:", err);
      } finally {
        this.loading = false;
        this.scrollToBottom();
      }
    },
    // Utility function to clean answer text
    cleanAnswer(answerText) {
      return answerText.replace(/[^\w\s.,!?()'"-]/g, "") // Remove unwanted characters
      .replace(/\n\s*\n/g, "\n") // Remove excessive line breaks
      .replace(/(\w)([.!?])(\w)/g, "$1$2 $3") // Ensure spacing after punctuation
      .trim();
    },
    // Utility function to chunk long responses for better readability
    chunkifyResponse(text) {
      return text.match(/(.{1,400})(\s|$)/g); // smart chunking for text with line breaks
    },
    // Utility function to detect offensive words
    detectOffensiveWords(text) {
      const flagged = ["kill", "sex", "drugs", "terror", "hate"]; // Customize this list as needed
      return flagged.some(word => text.toLowerCase().includes(word));
    },
    // Optional helper to detect the language of the question (use a library or API)
    detectLanguage(text) {
      // Example logic, replace with a proper language detection tool
      if (text.includes("سلام")) return "ar"; // example check for Arabic
      if (text.includes("hello")) return "en"; // example check for English
      return "unknown";
    },
    // Optional helper to translate text into English
    async translateToEnglish(text, fromLang) {
      if (fromLang === "en") return text;
      const translationAPI = "https://api.libretranslate.com/translate"; // Example API
      const response = await fetch(translationAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          q: text,
          source: fromLang,
          target: "en"
        })
      });
      if (response.ok) {
        const data = await response.json();
        return data.translatedText;
      }
      return text; // fallback
    },
    // Clears the entire chat history
    clearChat() {
      this.chatHistory = [];
    }
  },
  watch: {
    // Automatically scroll to bottom when a new message is added
    chatHistory() {
      this.$nextTick(this.scrollToBottom);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/VolunteerComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/VolunteerComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_VolunteerComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_VolunteerComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/vue/VolunteerComponent.vue */ "./resources/components/vue/VolunteerComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/VolunteerComponent.vue?vue&type=template&id=7e73a826&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/VolunteerComponent.vue?vue&type=template&id=7e73a826&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container"
};
const _hoisted_2 = {
  class: "chat-header"
};
const _hoisted_3 = {
  class: "header-buttons"
};
const _hoisted_4 = {
  class: "chat-content",
  style: {
    "display": "flex",
    "flex-direction": "column",
    "flex": "1",
    "overflow": "hidden"
  }
};
const _hoisted_5 = {
  class: "messages",
  ref: "messagesContainer",
  style: {
    "flex": "1",
    "overflow-y": "auto",
    "margin-bottom": "10px"
  }
};
const _hoisted_6 = {
  key: 0,
  class: "user-message"
};
const _hoisted_7 = {
  class: "d-flex align-items-center gap-2"
};
const _hoisted_8 = {
  class: "d-flex align-items-center gap-2 mt-2"
};
const _hoisted_9 = {
  class: "timestamp",
  style: {
    "color": "black"
  }
};
const _hoisted_10 = ["onClick"];
const _hoisted_11 = {
  key: 1,
  class: "bot-message"
};
const _hoisted_12 = {
  class: "timestamp"
};
const _hoisted_13 = {
  key: 0,
  class: "d-flex flex-wrap gap-3 my-2"
};
const _hoisted_14 = ["onClick"];
const _hoisted_15 = ["onClick"];
const _hoisted_16 = ["onClick"];
const _hoisted_17 = {
  class: "common-questions-container"
};
const _hoisted_18 = {
  class: "common-questions"
};
const _hoisted_19 = {
  class: "question-row"
};
const _hoisted_20 = ["onClick"];
const _hoisted_21 = {
  class: "input-container",
  style: {
    "display": "flex",
    "gap": "10px",
    "align-items": "center",
    "flex-wrap": "nowrap"
  }
};
const _hoisted_22 = ["disabled"];
const _hoisted_23 = ["disabled"];
const _hoisted_24 = {
  class: "d-flex gap-2 flex-wrap"
};
const _hoisted_25 = ["disabled"];
const _hoisted_26 = {
  key: 0,
  class: "loading"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Floating Action Button (FAB) with icon "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "fab",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleChat && $options.toggleChat(...args))
  }, [...(_cache[10] || (_cache[10] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chat-left-text-fill"
  }, null, -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$data.showChat || $data.isDesktop]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chatbox that opens when FAB is clicked "), $data.showChat ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["chatbox", {
      expanded: $data.isExpanded
    }]),
    style: {
      "bottom": "0px",
      "padding": "30%",
      "box-shadow": "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
      "padding-top": "40px"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "title"
  }, "Islamic Connect AI Assistant", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    onClick: _cache[1] || (_cache[1] = (...args) => $options.toggleExpand && $options.toggleExpand(...args)),
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["expand-btn pr-2", $data.isExpanded ? 'bi bi-arrows-angle-contract' : 'bi bi-arrows-angle-expand'])
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    onClick: _cache[2] || (_cache[2] = (...args) => $options.downloadChat && $options.downloadChat(...args)),
    class: "download-btn bi bi-download pr-2",
    title: "Download Chat"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    onClick: _cache[3] || (_cache[3] = (...args) => $options.toggleChat && $options.toggleChat(...args)),
    class: "close-btn bi bi-x-circle-fill"
  })])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Content Area "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chat History: Display questions and answers "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.chatHistory, (message, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: index,
      class: "message"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" User Question "), message.type === 'user' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", {
      class: "text-left"
    }, "You:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(message.text), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(message.timestamp), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $event => $options.editQuestion(index),
      class: "btn btn-secondary btn-sm"
    }, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-pencil"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Edit Question ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_10)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Bot Answer "), message.type === 'bot' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.cleanAnswer(message.text)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(message.timestamp), 1 /* TEXT */), !_ctx.controlsRendered ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Share Button "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      onClick: $event => $options.shareOnWhatsApp(index),
      style: {
        "cursor": "pointer"
      },
      class: "d-flex align-items-center p-2 rounded-3 shadow-sm text-dark bg-light cursor-pointer"
    }, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-whatsapp me-2"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Share ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_14), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Copy Button "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      onClick: $event => $options.copyQuestionAndAnswer(index),
      style: {
        "cursor": "pointer"
      },
      class: "d-flex align-items-center p-2 rounded-3 shadow-sm text-dark bg-light cursor-pointer"
    }, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clipboard me-2"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Copy ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_15), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Play/Stop Button (combined) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      onClick: $event => $options.togglePlayStop(message),
      style: {
        "cursor": "pointer"
      },
      class: "d-flex align-items-center p-2 rounded-3 shadow-sm bg-white text-dark cursor-pointer"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Conditionally change the icon based on speaking state "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($data.isSpeaking ? 'bi bi-stop me-2' : 'bi bi-play me-2')
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.isSpeaking ? 'Stop' : 'Listen'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_16)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Set controlsRendered flag to true after rendering the buttons "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-if=\"!controlsRendered\">\n                <script>\n                  this.controlsRendered = true;  // After rendering buttons, set to true\n                </script>\n              </div> ")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Common Islamic Questions (Fixed at the Top) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.commonQuestions, (question, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: index,
      class: "question-wrapper"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $event => $options.autoSendQuestion(question),
      class: "question-btn"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(question), 9 /* TEXT, PROPS */, _hoisted_20)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Input and Button for asking new questions "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.question = $event),
    type: "text",
    placeholder: "What do you want to know about Islam?",
    class: "form-control",
    disabled: $data.loading
  }, null, 8 /* PROPS */, _hoisted_22), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.question]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    type: "button",
    onClick: _cache[5] || (_cache[5] = $event => $data.question = ''),
    disabled: $data.loading || !$data.question,
    title: "Clear"
  }, [...(_cache[16] || (_cache[16] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_23), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mic Button with Enhanced UI/UX "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    onClick: _cache[6] || (_cache[6] = (...args) => $options.startSpeechRecognition && $options.startSpeechRecognition(...args)),
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["mic-button d-inline-flex justify-content-center align-items-center rounded-circle", {
      'mic-active': $data.micActive,
      'mic-pulse': $data.micClicked
    }]),
    "aria-label": "Activate voice recognition",
    role: "button",
    tabindex: "0",
    onAnimationend: _cache[7] || (_cache[7] = $event => $data.micClicked = false)
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi bi-mic mic-icon", {
      'mic-glow': $data.micActive
    }])
  }, null, 2 /* CLASS */)], 34 /* CLASS, NEED_HYDRATION */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[8] || (_cache[8] = (...args) => $options.getAnswer && $options.getAnswer(...args)),
    disabled: $data.loading || !$data.question.trim(),
    class: "btn btn-success flex-grow-1",
    style: {
      "min-width": "120px"
    }
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.loading ? "Fetching..." : "Send"), 9 /* TEXT, PROPS */, _hoisted_25), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Clear Button "), $data.chatHistory.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    onClick: _cache[9] || (_cache[9] = (...args) => $options.clearChat && $options.clearChat(...args)),
    class: "btn btn-danger flex-grow-1",
    style: {
      "min-width": "120px"
    }
  }, " Clear Conversation ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div style=\"color:black;\" class=\"text-center display-8\">Islamic connect AI can make mistakes. Check important\n        info.</div> "), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_26, "Fetching response...")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/VolunteerComponent.vue?vue&type=style&index=0&id=7e73a826&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/VolunteerComponent.vue?vue&type=style&index=0&id=7e73a826&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/VolunteerComponent.vue":
/*!*********************************************************!*\
  !*** ./resources/components/vue/VolunteerComponent.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _VolunteerComponent_vue_vue_type_template_id_7e73a826_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VolunteerComponent.vue?vue&type=template&id=7e73a826&scoped=true */ "./resources/components/vue/VolunteerComponent.vue?vue&type=template&id=7e73a826&scoped=true");
/* harmony import */ var _VolunteerComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VolunteerComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/VolunteerComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _VolunteerComponent_vue_vue_type_style_index_0_id_7e73a826_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VolunteerComponent.vue?vue&type=style&index=0&id=7e73a826&scoped=true&lang=css */ "./resources/components/vue/VolunteerComponent.vue?vue&type=style&index=0&id=7e73a826&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_VolunteerComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_VolunteerComponent_vue_vue_type_template_id_7e73a826_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-7e73a826"],['__file',"resources/components/vue/VolunteerComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/VolunteerComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************!*\
  !*** ./resources/components/vue/VolunteerComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_VolunteerComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_VolunteerComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./VolunteerComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/VolunteerComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/VolunteerComponent.vue?vue&type=style&index=0&id=7e73a826&scoped=true&lang=css":
/*!*****************************************************************************************************************!*\
  !*** ./resources/components/vue/VolunteerComponent.vue?vue&type=style&index=0&id=7e73a826&scoped=true&lang=css ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_VolunteerComponent_vue_vue_type_style_index_0_id_7e73a826_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./VolunteerComponent.vue?vue&type=style&index=0&id=7e73a826&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/VolunteerComponent.vue?vue&type=style&index=0&id=7e73a826&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/VolunteerComponent.vue?vue&type=template&id=7e73a826&scoped=true":
/*!***************************************************************************************************!*\
  !*** ./resources/components/vue/VolunteerComponent.vue?vue&type=template&id=7e73a826&scoped=true ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_VolunteerComponent_vue_vue_type_template_id_7e73a826_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_VolunteerComponent_vue_vue_type_template_id_7e73a826_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./VolunteerComponent.vue?vue&type=template&id=7e73a826&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/VolunteerComponent.vue?vue&type=template&id=7e73a826&scoped=true");


/***/ }),

/***/ "./resources/js/components/VolunteerComponent.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/VolunteerComponent.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _VolunteerComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VolunteerComponent.vue?vue&type=script&lang=js */ "./resources/js/components/VolunteerComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_VolunteerComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/VolunteerComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/VolunteerComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************!*\
  !*** ./resources/js/components/VolunteerComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_VolunteerComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_VolunteerComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./VolunteerComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/VolunteerComponent.vue?vue&type=script&lang=js");
 

/***/ })

}]);