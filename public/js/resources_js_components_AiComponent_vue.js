"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_AiComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const MOBILE_BREAKPOINT = 768;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      chatDraft: '',
      chatHistory: [],
      chatLoading: false,
      chatError: null,
      sessionId: null,
      errorTimeout: null,
      sessionExpired: false,
      isCompactMode: false,
      resizeListener: null,
      copyNotice: '',
      copyNoticeTimeout: null,
      availableVoices: [],
      preferredVoice: null,
      speechVoicesChanged: null,
      activeSpeechEntryKey: null,
      activeUtterance: null,
      suggestionsExpanded: true,
      suggestionCategories: [{
        label: 'Daily worship',
        expanded: true,
        questions: ['🕋 How can I make the five daily prayers feel more meaningful?', '🤲 Share a dua from the Sunnah for asking Allah for guidance.', '🕯️ Describe the etiquette of making dua after Salah.', '📿 How can I increase consistency in dhikr and remembrance?', '🕊️ How can I invite barakah into my daily salah and routines?']
      }, {
        label: 'Study & exams',
        expanded: true,
        questions: ['📚 Which hadith guides me in seeking knowledge with sincerity?', '📖 Share a Quranic story that encourages hope and trust.', '📜 Explain a hadith about patience and perseverance.', '✨ How should I renew my intention before each salah or act of worship?', '🌟 Which Quranic reminders help me stay humble during success?']
      }, {
        label: 'Life events',
        expanded: true,
        questions: ['🕌 What does the Quran teach about Allah’s mercy in hard times?', '🌿 Which duas help me keep gratitude in everyday life?', '⚖️ How can I balance worldly duties with Islamic priorities?', '🛡️ Which Quranic reminders guard my heart from envy and gossip?', '🤝 Explain the importance of community in Islamic life.']
      }],
      voiceListening: false,
      voiceRecognition: null,
      voiceStatus: '',
      voiceStatusTransient: false,
      voiceStatusTimeout: null,
      voiceAutoSubmitTimer: null,
      voiceFinalTranscript: '',
      voiceInterimTranscript: '',
      voiceDraftPending: '',
      voiceDraftFrame: null
    };
  },
  computed: {
    isNewChatAvailable() {
      return this.chatDraft.trim().length > 0 || this.hasAssistantResponse;
    },
    hasAssistantResponse() {
      return this.chatHistory.some(entry => entry.role === 'assistant');
    }
  },
  methods: {
    createChatEntry(role, text, references = []) {
      const now = new Date();
      const summaryBullets = this.extractSummaryBulletPoints(text);
      const allowCollapse = summaryBullets.length && this.isLongMessage(text);
      return {
        role,
        text,
        references,
        summaryBullets,
        allowCollapse,
        collapsed: allowCollapse && this.isCompactMode,
        userToggled: false,
        speechControlsVisible: false,
        speechStatus: 'stopped',
        time: now.toISOString(),
        displayTime: now.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit'
        }),
        displayDate: now.toLocaleDateString([], {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        })
      };
    },
    getConversationForRequest() {
      return this.chatHistory.slice(-6).map(entry => ({
        role: entry.role,
        content: entry.text
      }));
    },
    escapeHtml(value) {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };
      return value.replace(/[&<>"']/g, char => map[char]);
    },
    formatChatText(text) {
      if (!text) return '';
      const cleaned = text.replace(/\r\n?/g, '\n').replace(/[^\x20-\x7E\n]/g, ' ').replace(/[ \t]{2,}/g, ' ').trim();
      const normalized = cleaned.replace(/\*\*/g, '');
      const paragraphs = normalized.split(/\n+/).map(line => line.trim()).filter(Boolean);
      if (!paragraphs.length) {
        return normalized ? `<p>${this.escapeHtml(normalized)}</p>` : '';
      }
      return paragraphs.map(paragraph => `<p>${this.escapeHtml(paragraph)}</p>`).join('');
    },
    toPlainText(value = '') {
      if (!value) return '';
      if (typeof document === 'undefined') {
        return value.replace(/<\/?[^>]+(>|$)/g, '');
      }
      const wrapper = document.createElement('div');
      wrapper.innerHTML = value;
      const text = wrapper.textContent || wrapper.innerText || '';
      wrapper.remove();
      return text;
    },
    sanitizeShareText(value) {
      return this.toPlainText(value).replace(/\s+/g, ' ').trim();
    },
    composeChatShareMessage(limit = 6) {
      const entries = this.chatHistory.slice(-limit);
      const lines = entries.map(entry => {
        const label = entry.role === 'assistant' ? 'Assistant' : 'You';
        const plain = this.sanitizeShareText(entry.text);
        return plain ? `${label}: ${plain}` : null;
      }).filter(Boolean);
      if (!lines.length) {
        return '';
      }
      return `Islamic Connect chat\n\n${lines.join('\n\n')}`;
    },
    isLongMessage(text) {
      if (!text) return false;
      const cleaned = text.trim();
      const paragraphCount = cleaned.split(/\n+/).filter(Boolean).length;
      return cleaned.length > 360 || paragraphCount >= 3;
    },
    extractSummaryBulletPoints(text, limit = 3) {
      if (!text) return [];
      const cleaned = text.replace(/\r\n?/g, ' ').replace(/\s{2,}/g, ' ').trim();
      if (!cleaned) return [];
      const sentenceMatches = cleaned.match(/[^.!?]+[.!?]+/g) || [];
      const normalized = sentenceMatches.length ? sentenceMatches : cleaned.split(/[,;]+/);
      const sanitized = normalized.map(piece => piece.replace(/^[\s*-]+/, '').trim()).filter(piece => piece.length > 12);
      if (!sanitized.length) {
        return (normalized || []).slice(0, limit).map(piece => piece.trim()).filter(Boolean);
      }
      return sanitized.slice(0, limit);
    },
    normalizeReferences(input) {
      if (!input) return [];
      const items = Array.isArray(input) ? input : [input];
      return items.map(item => {
        if (!item) {
          return null;
        }
        if (typeof item === 'string') {
          return {
            label: item,
            url: ''
          };
        }
        if (typeof item === 'object') {
          return {
            label: item.label || item.title || item.text || '',
            url: item.url || item.link || item.href || ''
          };
        }
        return null;
      }).filter(item => item && item.label.trim());
    },
    scrollChatWindow() {
      this.$nextTick(() => {
        const container = this.$refs.chatShell || this.$refs.chatWindow;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
    scrollComponentToBottom() {
      this.$nextTick(() => {
        const root = this.$refs.aiRoot;
        if (!root || typeof root.scrollIntoView !== 'function') {
          return;
        }
        const prefersReducedMotion = typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const behavior = prefersReducedMotion ? 'auto' : 'smooth';
        root.scrollIntoView({
          behavior,
          block: 'end'
        });
      });
    },
    toggleCategory(category) {
      category.expanded = !category.expanded;
    },
    toggleSuggestions() {
      this.suggestionsExpanded = !this.suggestionsExpanded;
    },
    initializeSpeechSynthesis() {
      if (typeof window === 'undefined' || !window.speechSynthesis) {
        return;
      }
      const refreshVoices = () => {
        const voices = window.speechSynthesis.getVoices() || [];
        this.availableVoices = voices;
        this.updatePreferredVoice();
      };
      refreshVoices();
      this.speechVoicesChanged = refreshVoices;
      window.speechSynthesis.addEventListener('voiceschanged', refreshVoices);
    },
    chooseNaturalVoice(voices) {
      if (!voices || !voices.length) {
        return null;
      }
      const preferredNames = ['Google UK English Female', 'Google UK English Male', 'Google US English', 'Microsoft Zira Desktop - English (United States)', 'Samantha', 'Alex'];
      for (const preferred of preferredNames) {
        const match = voices.find(voice => voice.name === preferred);
        if (match) {
          return match;
        }
      }
      const englishVoice = voices.find(voice => {
        var _voice$lang;
        return (_voice$lang = voice.lang) === null || _voice$lang === void 0 ? void 0 : _voice$lang.startsWith('en');
      });
      return englishVoice || voices[0];
    },
    updatePreferredVoice() {
      if (!this.availableVoices.length) {
        this.preferredVoice = null;
        return;
      }
      this.preferredVoice = this.chooseNaturalVoice(this.availableVoices);
    },
    getEntrySpeechKey(entry) {
      if (!entry) return null;
      return `${entry.role}-${entry.time}`;
    },
    findEntryBySpeechKey(key) {
      if (!key) {
        return null;
      }
      return this.chatHistory.find(entry => this.getEntrySpeechKey(entry) === key) || null;
    },
    toggleSpeechControls(entry) {
      if (!entry) {
        return;
      }
      const isVisible = !entry.speechControlsVisible;
      this.chatHistory.forEach(other => {
        if (other !== entry) {
          other.speechControlsVisible = false;
        }
      });
      entry.speechControlsVisible = isVisible;
    },
    playEntrySpeech(entry) {
      if (!(entry !== null && entry !== void 0 && entry.text) || typeof window === 'undefined' || !window.speechSynthesis) {
        return;
      }
      const entryKey = this.getEntrySpeechKey(entry);
      if (this.activeSpeechEntryKey === entryKey && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        entry.speechStatus = 'playing';
        return;
      }
      this.stopSpeech();
      const plainText = this.toPlainText(entry.text);
      if (!plainText) {
        return;
      }
      const utterance = new SpeechSynthesisUtterance(plainText);
      const voice = this.preferredVoice;
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang || utterance.lang;
      }
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.volume = 1;
      this.activeUtterance = utterance;
      this.activeSpeechEntryKey = entryKey;
      utterance.onstart = () => {
        entry.speechStatus = 'playing';
      };
      utterance.onend = () => {
        this.finishSpeech(entry);
      };
      utterance.onerror = () => {
        this.finishSpeech(entry);
      };
      utterance.onpause = () => {
        entry.speechStatus = 'paused';
      };
      utterance.onresume = () => {
        entry.speechStatus = 'playing';
      };
      entry.speechStatus = 'loading';
      window.speechSynthesis.speak(utterance);
    },
    pauseEntrySpeech(entry) {
      if (typeof window === 'undefined' || !window.speechSynthesis || !window.speechSynthesis.speaking || window.speechSynthesis.paused) {
        return;
      }
      if (this.activeSpeechEntryKey !== this.getEntrySpeechKey(entry)) {
        return;
      }
      window.speechSynthesis.pause();
      entry.speechStatus = 'paused';
    },
    stopEntrySpeech(entry) {
      if (!entry) {
        return;
      }
      if (this.activeSpeechEntryKey === this.getEntrySpeechKey(entry)) {
        this.stopSpeech();
        return;
      }
      entry.speechStatus = 'stopped';
    },
    finishSpeech(entry) {
      if (!entry) {
        return;
      }
      entry.speechStatus = 'stopped';
      const entryKey = this.getEntrySpeechKey(entry);
      if (this.activeSpeechEntryKey === entryKey) {
        this.activeSpeechEntryKey = null;
      }
      this.activeUtterance = null;
    },
    stopSpeech() {
      if (typeof window === 'undefined' || !window.speechSynthesis) {
        return;
      }
      window.speechSynthesis.cancel();
      if (this.activeSpeechEntryKey) {
        const entry = this.findEntryBySpeechKey(this.activeSpeechEntryKey);
        if (entry) {
          entry.speechStatus = 'stopped';
        }
      }
      this.activeSpeechEntryKey = null;
      this.activeUtterance = null;
    },
    async sendChatMessage() {
      if (this.chatLoading) return;
      const message = this.chatDraft.trim();
      if (!message) return;
      this.chatError = null;
      if (!this.isIslamicQuestion(message)) {
        this.chatError = 'Please ask something related to Islamic teachings or practice.';
        return;
      }
      this.chatDraft = '';
      this.chatHistory.push(this.createChatEntry('user', message));
      this.scrollChatWindow();
      this.scrollComponentToBottom();
      const payload = {
        message,
        history: this.getConversationForRequest()
      };
      try {
        var _document$querySelect;
        this.chatLoading = true;
        const session = this.sessionId || this.resetSession();
        const csrfToken = (_document$querySelect = document.querySelector('meta[name="csrf-token"]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getAttribute('content');
        if (!csrfToken) {
          throw new Error('Unable to send the question right now.');
        }
        const response = await fetch('/ai/chat', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrfToken
          },
          body: JSON.stringify(_objectSpread(_objectSpread({}, payload), {}, {
            sessionId: session
          }))
        });
        const responseData = await response.json().catch(() => ({}));
        if (response.status === 419) {
          this.handleSessionExpiry();
          return;
        }
        if (!response.ok) {
          throw new Error(responseData.error || 'Unable to get a response right now.');
        }
        const answer = (responseData.answer || '').trim();
        if (!answer) {
          throw new Error('The assistant did not return an answer. Please try again.');
        }
        const references = this.normalizeReferences(responseData.references);
        this.chatHistory.push(this.createChatEntry('assistant', answer, references));
        this.scrollChatWindow();
        this.scrollComponentToBottom();
      } catch (error) {
        console.error('Chat error:', error);
        this.chatError = (error === null || error === void 0 ? void 0 : error.message) || 'The assistant is temporarily unavailable.';
      } finally {
        this.chatLoading = false;
      }
    },
    shareConversationOnWhatsApp() {
      if (!this.chatHistory.length) {
        return;
      }
      const shareText = this.composeChatShareMessage(6);
      if (!shareText) {
        return;
      }
      if (typeof window === 'undefined') {
        return;
      }
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');
    },
    copyConversationToClipboard() {
      const shareText = this.composeChatShareMessage(6);
      if (!shareText) {
        return;
      }
      this.copyTextToClipboard(shareText).then(() => this.showCopyNotice('Conversation copied to clipboard.')).catch(err => {
        console.error('Copy conversation failed:', err);
      });
    },
    shareEntryOnWhatsApp(entry) {
      if (!(entry !== null && entry !== void 0 && entry.text)) {
        return;
      }
      const content = this.sanitizeShareText(entry.text);
      if (!content) {
        return;
      }
      if (typeof window === 'undefined') {
        return;
      }
      const header = entry.role === 'assistant' ? 'Islamic Connect answer' : 'Islamic Connect chat';
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${header}\n\n${content}`)}`;
      window.open(whatsappUrl, '_blank');
    },
    copyEntryToClipboard(entry) {
      if (!(entry !== null && entry !== void 0 && entry.text)) {
        return;
      }
      const content = this.sanitizeShareText(entry.text);
      if (!content) {
        return;
      }
      this.copyTextToClipboard(content).then(() => this.showCopyNotice('Answer copied to clipboard.')).catch(err => {
        console.error('Copy answer failed:', err);
      });
    },
    copyTextToClipboard(text) {
      var _navigator$clipboard;
      if (!text) {
        return Promise.resolve();
      }
      if (typeof navigator !== 'undefined' && (_navigator$clipboard = navigator.clipboard) !== null && _navigator$clipboard !== void 0 && _navigator$clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      }
      if (typeof document === 'undefined') {
        return Promise.resolve();
      }
      return new Promise((resolve, reject) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          const successful = document.execCommand('copy');
          if (successful) {
            resolve();
          } else {
            reject(new Error('Copy command was unsuccessful'));
          }
        } catch (err) {
          reject(err);
        } finally {
          document.body.removeChild(textarea);
        }
      });
    },
    showCopyNotice(message) {
      if (!message) return;
      this.copyNotice = message;
      if (this.copyNoticeTimeout) {
        clearTimeout(this.copyNoticeTimeout);
      }
      this.copyNoticeTimeout = setTimeout(() => {
        this.copyNotice = '';
        this.copyNoticeTimeout = null;
      }, 3000);
    },
    selectSuggestedQuestion(question) {
      if (this.chatLoading) return;
      this.chatDraft = question;
      this.$nextTick(() => {
        const textarea = this.$refs.aiChatInput;
        if (textarea) {
          textarea.focus();
        }
        this.sendChatMessage();
      });
    },
    clearDraft() {
      this.chatDraft = '';
      this.chatError = null;
    },
    resetVoiceTranscriptState() {
      this.voiceFinalTranscript = '';
      this.voiceInterimTranscript = '';
    },
    cancelVoiceDraftUpdate() {
      if (this.voiceDraftFrame) {
        if (typeof window !== 'undefined' && window.cancelAnimationFrame) {
          window.cancelAnimationFrame(this.voiceDraftFrame);
        }
        this.voiceDraftFrame = null;
      }
      this.voiceDraftPending = '';
    },
    updateVoiceDraft(displayTranscript) {
      if (!displayTranscript) {
        return;
      }
      if (displayTranscript === this.chatDraft) {
        return;
      }
      if (typeof window !== 'undefined' && window.requestAnimationFrame) {
        this.voiceDraftPending = displayTranscript;
        if (!this.voiceDraftFrame) {
          this.voiceDraftFrame = window.requestAnimationFrame(() => {
            this.chatDraft = this.voiceDraftPending;
            this.voiceDraftFrame = null;
            this.voiceDraftPending = '';
          });
        }
      } else {
        this.chatDraft = displayTranscript;
      }
    },
    toggleVoiceSearch() {
      if (this.voiceListening) {
        this.stopVoiceSearch();
        return;
      }
      this.startVoiceSearch();
    },
    startVoiceSearch() {
      if (this.voiceListening || this.chatLoading) {
        return;
      }
      if (typeof window === 'undefined') {
        return;
      }
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        this.setTransientVoiceStatus('Voice search requires a supported browser.');
        return;
      }
      this.resetVoiceTranscriptState();
      this.cancelVoiceDraftUpdate();
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'en-US';
        recognition.maxAlternatives = 1;
        recognition.onstart = () => {
          this.voiceListening = true;
          this.voiceStatusTransient = false;
          if (this.voiceStatusTimeout) {
            clearTimeout(this.voiceStatusTimeout);
            this.voiceStatusTimeout = null;
          }
          this.voiceStatus = 'Voice search activated — listening for your question.';
          this.clearVoiceAutoSubmitTimer();
        };
        recognition.onresult = event => {
          const results = event.results;
          let interimTranscript = '';
          let finalTranscriptChunk = '';
          for (let i = event.resultIndex; i < results.length; i += 1) {
            var _result$;
            const result = results[i];
            const text = result === null || result === void 0 || (_result$ = result[0]) === null || _result$ === void 0 || (_result$ = _result$.transcript) === null || _result$ === void 0 ? void 0 : _result$.trim();
            if (!text) {
              continue;
            }
            if (result.isFinal) {
              finalTranscriptChunk += `${text} `;
            } else {
              interimTranscript += `${text} `;
            }
          }
          const finalChunkTrimmed = finalTranscriptChunk.trim();
          if (finalChunkTrimmed) {
            this.voiceFinalTranscript = `${this.voiceFinalTranscript} ${finalChunkTrimmed}`.trim();
            this.voiceInterimTranscript = '';
          }
          const interimTrimmed = interimTranscript.trim();
          if (interimTrimmed) {
            this.voiceInterimTranscript = interimTrimmed;
          }
          const displayTranscript = [this.voiceFinalTranscript, this.voiceInterimTranscript].filter(Boolean).join(' ').trim();
          this.updateVoiceDraft(displayTranscript);
          if (finalChunkTrimmed) {
            this.scheduleVoiceSubmission(this.voiceFinalTranscript.trim());
          } else if (interimTrimmed) {
            this.voiceStatus = 'Listening — feel free to continue speaking.';
            this.voiceStatusTransient = false;
          }
        };
        recognition.onerror = event => {
          this.setTransientVoiceStatus(`Voice search error: ${event.error || 'unknown error'}`);
          this.cleanupVoiceSearch();
        };
        recognition.onend = () => {
          this.cleanupVoiceSearch();
        };
        this.voiceRecognition = recognition;
        recognition.start();
      } catch (error) {
        console.error('Voice search failed to start', error);
        this.setTransientVoiceStatus('Voice search failed to start.');
        this.cleanupVoiceSearch();
      }
    },
    stopVoiceSearch() {
      if (this.voiceRecognition) {
        try {
          this.voiceRecognition.onresult = null;
          this.voiceRecognition.onerror = null;
          this.voiceRecognition.onend = null;
          this.voiceRecognition.stop();
        } catch (error) {
          console.warn('Failed to stop voice recognition', error);
        }
      }
      this.clearVoiceAutoSubmitTimer();
      this.cleanupVoiceSearch();
    },
    scheduleVoiceSubmission(transcript) {
      if (!transcript) {
        return;
      }
      this.cancelVoiceDraftUpdate();
      this.chatDraft = transcript;
      this.voiceStatus = 'Captured your question — sending it shortly.';
      this.voiceStatusTransient = false;
      if (this.voiceAutoSubmitTimer) {
        clearTimeout(this.voiceAutoSubmitTimer);
      }
      this.voiceAutoSubmitTimer = setTimeout(() => {
        this.sendVoiceDraft();
      }, 1400);
    },
    sendVoiceDraft() {
      if (this.voiceAutoSubmitTimer) {
        clearTimeout(this.voiceAutoSubmitTimer);
        this.voiceAutoSubmitTimer = null;
      }
      if (!this.chatDraft.trim()) {
        return;
      }
      this.setTransientVoiceStatus('Sending your question…');
      this.stopVoiceSearch();
      this.sendChatMessage();
    },
    clearVoiceAutoSubmitTimer() {
      if (this.voiceAutoSubmitTimer) {
        clearTimeout(this.voiceAutoSubmitTimer);
        this.voiceAutoSubmitTimer = null;
      }
    },
    cleanupVoiceSearch() {
      if (this.voiceRecognition) {
        this.voiceRecognition.onresult = null;
        this.voiceRecognition.onerror = null;
        this.voiceRecognition.onend = null;
      }
      this.voiceRecognition = null;
      if (this.voiceListening) {
        this.voiceListening = false;
      }
      this.cancelVoiceDraftUpdate();
      this.resetVoiceTranscriptState();
      if (!this.voiceStatusTransient && !this.voiceAutoSubmitTimer) {
        this.voiceStatus = '';
      }
    },
    setTransientVoiceStatus(message, duration = 4000) {
      if (!message) {
        return;
      }
      this.voiceStatus = message;
      this.voiceStatusTransient = true;
      if (this.voiceStatusTimeout) {
        clearTimeout(this.voiceStatusTimeout);
      }
      this.voiceStatusTimeout = setTimeout(() => {
        this.voiceStatus = '';
        this.voiceStatusTransient = false;
        this.voiceStatusTimeout = null;
      }, duration);
    },
    clearConversationState() {
      this.chatHistory = [];
      this.chatDraft = '';
      this.resetSession();
    },
    handleSessionExpiry() {
      this.sessionExpired = true;
      this.chatError = 'Session expired — refresh the page to continue.';
    },
    reloadPage() {
      if (typeof window !== 'undefined' && window.location) {
        window.location.reload();
      }
    },
    isIslamicQuestion(message) {
      if (!message) return false;
      const normalized = message.toLowerCase();
      const keywords = ['islam', 'muslim', 'quran', 'hadith', 'sunnah', 'dua', 'salah', 'prayer', 'ramadan', 'hajj', 'umrah', 'fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'zakat', 'halal', 'haram', 'allah', 'prophet', 'fiqh', 'tafsir', 'imam', 'masjid', 'mosque', 'ayah', 'surah', 'tafseer', 'aqeedah', 'taqwa', 'sufism', 'istikhara', 'nikah', 'shahada'];
      return keywords.some(keyword => normalized.includes(keyword));
    },
    resetSession() {
      this.sessionId = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
      return this.sessionId;
    },
    startNewChat() {
      this.clearConversationState();
      this.chatError = null;
    },
    clearHistory() {
      this.clearConversationState();
      this.chatError = null;
    },
    toggleEntryCollapse(entry) {
      if (!entry.allowCollapse || !this.isCompactMode) {
        return;
      }
      entry.collapsed = !entry.collapsed;
      entry.userToggled = true;
    },
    updateCompactMode() {
      if (typeof window === 'undefined') {
        return;
      }
      const isCompact = window.innerWidth <= MOBILE_BREAKPOINT;
      if (this.isCompactMode === isCompact) {
        return;
      }
      this.isCompactMode = isCompact;
    }
  },
  watch: {
    chatError(value) {
      if (this.errorTimeout) {
        clearTimeout(this.errorTimeout);
        this.errorTimeout = null;
      }
      if (!value) {
        this.sessionExpired = false;
        return;
      }
      this.clearConversationState();
      this.errorTimeout = setTimeout(() => {
        this.chatError = null;
        this.errorTimeout = null;
      }, 5000);
    },
    isCompactMode(value) {
      this.chatHistory.forEach(entry => {
        if (!entry.allowCollapse) {
          return;
        }
        if (!value) {
          entry.collapsed = false;
          entry.userToggled = false;
          return;
        }
        if (entry.userToggled) {
          return;
        }
        entry.collapsed = entry.allowCollapse;
      });
    }
  },
  mounted() {
    this.resetSession();
    this.updateCompactMode();
    this.initializeSpeechSynthesis();
    this.resizeListener = () => this.updateCompactMode();
    window.addEventListener('resize', this.resizeListener);
  },
  beforeUnmount() {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
    if (this.copyNoticeTimeout) {
      clearTimeout(this.copyNoticeTimeout);
      this.copyNoticeTimeout = null;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis && this.speechVoicesChanged) {
      window.speechSynthesis.removeEventListener('voiceschanged', this.speechVoicesChanged);
      this.speechVoicesChanged = null;
    }
    this.stopVoiceSearch();
    if (this.voiceStatusTimeout) {
      clearTimeout(this.voiceStatusTimeout);
      this.voiceStatusTimeout = null;
    }
    this.stopSpeech();
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=template&id=300b761a&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=template&id=300b761a&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "ai-section",
  ref: "aiRoot",
  "aria-label": "Islamic chatbot"
};
const _hoisted_2 = {
  class: "ai-panel"
};
const _hoisted_3 = {
  class: "ai-suggestions text-start",
  "aria-label": "Suggested questions"
};
const _hoisted_4 = {
  class: "ai-suggestions-header"
};
const _hoisted_5 = ["aria-expanded"];
const _hoisted_6 = {
  class: "sr-only"
};
const _hoisted_7 = {
  class: "ai-suggestions-list"
};
const _hoisted_8 = {
  class: "ai-suggestion-grid"
};
const _hoisted_9 = {
  class: "pt-2 ai-suggestion-category-header"
};
const _hoisted_10 = {
  class: "ai-suggestion-category-label"
};
const _hoisted_11 = ["onClick", "aria-expanded"];
const _hoisted_12 = {
  class: "sr-only"
};
const _hoisted_13 = {
  class: "ai-suggestion-category-chips"
};
const _hoisted_14 = ["onClick", "disabled"];
const _hoisted_15 = {
  class: "ai-suggestion-text"
};
const _hoisted_16 = {
  class: "ai-controls",
  role: "toolbar",
  "aria-label": "Chat controls"
};
const _hoisted_17 = ["disabled"];
const _hoisted_18 = ["disabled"];
const _hoisted_19 = ["disabled"];
const _hoisted_20 = ["disabled"];
const _hoisted_21 = {
  key: 0,
  class: "ai-copy-notice",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_22 = {
  key: 1,
  class: "ai-error-banner",
  role: "alert",
  "aria-live": "assertive",
  "aria-atomic": "true"
};
const _hoisted_23 = {
  class: "ai-error-message"
};
const _hoisted_24 = {
  key: 2,
  ref: "chatShell",
  class: "ai-chat-shell"
};
const _hoisted_25 = {
  class: "ai-metadata"
};
const _hoisted_26 = {
  key: 0,
  class: "ai-loading-indicator",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_27 = {
  ref: "chatWindow",
  class: "ai-chat-window",
  role: "log",
  "aria-live": "polite"
};
const _hoisted_28 = {
  class: "chat-entry-header"
};
const _hoisted_29 = {
  class: "chat-role mr-2"
};
const _hoisted_30 = {
  class: "chat-timestamp"
};
const _hoisted_31 = {
  class: "chat-bubble-container"
};
const _hoisted_32 = ["innerHTML"];
const _hoisted_33 = {
  key: 0,
  class: "chat-entry-actions"
};
const _hoisted_34 = ["onClick"];
const _hoisted_35 = ["onClick"];
const _hoisted_36 = {
  class: "chat-voice-wrapper ms-2"
};
const _hoisted_37 = ["onClick", "aria-expanded"];
const _hoisted_38 = {
  key: 0,
  class: "chat-voice-controls",
  role: "group",
  "aria-label": "Speech controls",
  "aria-live": "polite"
};
const _hoisted_39 = ["onClick", "disabled"];
const _hoisted_40 = ["onClick", "disabled"];
const _hoisted_41 = ["onClick", "disabled"];
const _hoisted_42 = {
  class: "chat-voice-status",
  "aria-live": "polite"
};
const _hoisted_43 = {
  key: 1,
  class: "chat-summary"
};
const _hoisted_44 = {
  class: "chat-summary-title"
};
const _hoisted_45 = ["onClick"];
const _hoisted_46 = {
  key: 0
};
const _hoisted_47 = {
  key: 1
};
const _hoisted_48 = {
  key: 3,
  class: "chat-references-wrapper",
  "aria-label": "Sources that informed this answer"
};
const _hoisted_49 = {
  class: "chat-references",
  role: "list"
};
const _hoisted_50 = ["href"];
const _hoisted_51 = ["disabled"];
const _hoisted_52 = {
  class: "ai-form-meta pt-2 text-muted"
};
const _hoisted_53 = ["disabled"];
const _hoisted_54 = {
  key: 0,
  class: "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
};
const _hoisted_55 = ["disabled", "aria-pressed"];
const _hoisted_56 = ["disabled"];
const _hoisted_57 = {
  key: 0,
  class: "ai-voice-status",
  role: "status",
  "aria-live": "polite"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"ai-welcome\" aria-live=\"polite\" data-v-300b761a><div class=\"ai-welcome-icon\" aria-hidden=\"true\" data-v-300b761a><i class=\"fas fa-star-and-crescent\" aria-hidden=\"true\" data-v-300b761a></i></div><div class=\"ai-welcome-text pt-2\" data-v-300b761a><h2 class=\"fw-bold\" data-v-300b761a>Introducing Noor, Your AI Companion</h2><p class=\"ai-welcome-copy\" data-v-300b761a> Noor listens first, then gently responds with Quran rooted insight and prophetic kindness so every exchange feels like encouragement from a trusted companion. Ask for dua ideas, reminders, or reflections tuned to your day. </p></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "fw-bold"
  }, "Need inspiration ?", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-suggestions-toggle",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleSuggestions && $options.toggleSuggestions(...args)),
    "aria-expanded": $data.suggestionsExpanded.toString()
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.suggestionsExpanded ? 'Collapse suggestion categories' : 'Expand suggestion categories'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($data.suggestionsExpanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_5)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.suggestionCategories, category => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: category.label,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['ai-suggestion-category', {
        'ai-suggestion-category--collapsed': !category.expanded
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(category.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "ai-category-toggle",
      onClick: $event => $options.toggleCategory(category),
      "aria-expanded": category.expanded.toString()
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(category.expanded ? 'Collapse category' : 'Expand category'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(category.expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down '),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_11)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(category.questions, (question, idx) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
        key: `category-${category.label}-${idx}-${question}`,
        type: "button",
        class: "ai-suggestion text-start",
        onClick: $event => $options.selectSuggestedQuestion(question),
        disabled: $data.chatLoading
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(question), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_14);
    }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, category.expanded]])], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.suggestionsExpanded]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [$options.hasAssistantResponse ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "ai-control-btn ai-control-btn--primary",
    onClick: _cache[1] || (_cache[1] = (...args) => $options.startNewChat && $options.startNewChat(...args)),
    disabled: !$options.isNewChatAvailable
  }, [...(_cache[11] || (_cache[11] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-plus-circle",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" New chat ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_17)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-control-btn",
    disabled: !$data.chatHistory.length,
    onClick: _cache[2] || (_cache[2] = (...args) => $options.clearHistory && $options.clearHistory(...args))
  }, [...(_cache[12] || (_cache[12] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-trash-alt",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Clear history ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_18), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-control-btn ai-control-btn--whatsapp",
    disabled: !$data.chatHistory.length,
    onClick: _cache[3] || (_cache[3] = (...args) => $options.shareConversationOnWhatsApp && $options.shareConversationOnWhatsApp(...args))
  }, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fab fa-whatsapp",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Share Full Conversation via WhatsApp ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_19), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-control-btn ai-control-btn--copy",
    disabled: !$data.chatHistory.length,
    onClick: _cache[4] || (_cache[4] = (...args) => $options.copyConversationToClipboard && $options.copyConversationToClipboard(...args))
  }, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-copy",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Copy Full Conversation to Clipboard ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_20)]), $data.copyNotice ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-check-circle me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.copyNotice), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.chatError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_22, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-exclamation-triangle ai-error-icon",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "ai-error-title text-left"
  }, "Need some redirection?", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.chatError), 1 /* TEXT */), $data.sessionExpired ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "ai-error-clear",
    onClick: _cache[5] || (_cache[5] = (...args) => $options.reloadPage && $options.reloadPage(...args))
  }, " Reload page ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.chatHistory.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [$data.chatLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_26, [...(_cache[18] || (_cache[18] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "spinner-border spinner-border-sm",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-0 fw-semibold"
  }, "Assistant is consulting trusted sources...", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.chatHistory, (entry, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: `chat-${idx}-${entry.role}`,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['chat-entry', entry.role])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(entry.role === 'assistant' ? 'fas fa-robot chat-icon' : 'fas fa-user chat-icon'),
      "aria-hidden": "true",
      title: "Sender"
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.role === 'assistant' ? 'Assistant' : 'You'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.displayTime) + " · " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.displayDate), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['chat-bubble', entry.role, {
        'chat-bubble--collapsed': entry.role === 'assistant' && entry.collapsed
      }]),
      innerHTML: $options.formatChatText(entry.text)
    }, null, 10 /* CLASS, PROPS */, _hoisted_32), entry.role === 'assistant' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "chat-share-btn",
      onClick: $event => $options.shareEntryOnWhatsApp(entry),
      "aria-label": 'Share this answer via WhatsApp'
    }, [...(_cache[19] || (_cache[19] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fab fa-whatsapp",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "d-none d-md-inline ms-1"
    }, "Share answer", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_34), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "chat-copy-btn ms-2",
      onClick: $event => $options.copyEntryToClipboard(entry),
      "aria-label": 'Copy this answer'
    }, [...(_cache[20] || (_cache[20] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-copy",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "d-none d-md-inline ms-1"
    }, "Copy answer", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_35), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "chat-voice-trigger",
      onClick: $event => $options.toggleSpeechControls(entry),
      "aria-expanded": entry.speechControlsVisible ? 'true' : 'false'
    }, [...(_cache[21] || (_cache[21] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-volume-up",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "visually-hidden"
    }, "Read this answer aloud", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_37), entry.speechControlsVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "chat-voice-control-btn",
      onClick: $event => $options.playEntrySpeech(entry),
      disabled: entry.speechStatus === 'loading',
      "aria-label": "Play answer"
    }, [...(_cache[22] || (_cache[22] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-play",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_39), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "chat-voice-control-btn",
      onClick: $event => $options.pauseEntrySpeech(entry),
      disabled: entry.speechStatus !== 'playing',
      "aria-label": "Pause answer"
    }, [...(_cache[23] || (_cache[23] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-pause",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_40), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "chat-voice-control-btn",
      onClick: $event => $options.stopEntrySpeech(entry),
      disabled: entry.speechStatus === 'stopped',
      "aria-label": "Stop answer"
    }, [...(_cache[24] || (_cache[24] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-stop",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_41), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_42, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.speechStatus === 'loading' ? 'Preparing…' : entry.speechStatus), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), entry.collapsed && entry.summaryBullets.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_44, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.role === 'assistant' ? 'Quick summary' : 'Question snapshot'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(entry.summaryBullets, (bullet, bulletIndex) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: `summary-${idx}-${bulletIndex}`
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(bullet), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), entry.allowCollapse && $data.isCompactMode ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: 2,
      type: "button",
      class: "chat-collapse-toggle",
      onClick: $event => $options.toggleEntryCollapse(entry)
    }, [entry.collapsed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_46, " Show full " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.role === 'assistant' ? 'response' : 'question'), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_47, " Collapse to " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.role === 'assistant' ? 'summary' : 'preview'), 1 /* TEXT */))], 8 /* PROPS */, _hoisted_45)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), entry.references && entry.references.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_48, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "chat-references-heading"
    }, "References", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_49, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(entry.references, (reference, refIndex) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: `ref-${idx}-${refIndex}-${reference.label}`
      }, [reference.url ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
        key: 0,
        href: reference.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reference.label), 9 /* TEXT, PROPS */, _hoisted_50)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        key: 1
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reference.label), 1 /* TEXT */)], 64 /* STABLE_FRAGMENT */))]);
    }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */)], 512 /* NEED_PATCH */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    ref: "aiForm",
    class: "ai-form pt-3",
    onSubmit: _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.sendChatMessage && $options.sendChatMessage(...args), ["prevent"]))
  }, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "visually-hidden",
    for: "aiChatInput"
  }, "Ask the chatbot", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    id: "aiChatInput",
    ref: "aiChatInput",
    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $data.chatDraft = $event),
    class: "ai-textarea",
    rows: "2",
    placeholder: "Ask something that brings you closer to Allah...",
    disabled: $data.chatLoading
  }, null, 8 /* PROPS */, _hoisted_51), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.chatDraft]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "ai-submit",
    disabled: $data.chatLoading || !$data.chatDraft.trim()
  }, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-paper-plane",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), $data.chatLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_54)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.chatLoading ? 'Noor is Thinking...' : 'Ask Noor'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_53), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["ai-voice-btn", {
      'ai-voice-btn--active': $data.voiceListening
    }]),
    disabled: $data.chatLoading,
    onClick: _cache[7] || (_cache[7] = (...args) => $options.toggleVoiceSearch && $options.toggleVoiceSearch(...args)),
    "aria-pressed": $data.voiceListening.toString()
  }, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-microphone",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.voiceListening ? 'Listening…' : 'Voice search'), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_55), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-clear-input",
    disabled: $data.chatLoading || !$data.chatDraft.trim(),
    onClick: _cache[8] || (_cache[8] = (...args) => $options.clearDraft && $options.clearDraft(...args))
  }, [...(_cache[28] || (_cache[28] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-eraser",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Clear input", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_56)]), $data.voiceStatus ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_57, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-microphone me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.voiceStatus), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ai-trust-note",
    role: "note",
    "aria-live": "polite"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-shield-alt",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-0 text-muted"
  }, " Religious guidance needs clear boundaries this is educational content, so consult a qualified scholar for fatwas. ")], -1 /* CACHED */))], 544 /* NEED_HYDRATION, NEED_PATCH */)])], 512 /* NEED_PATCH */);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/components/AiComponent.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/AiComponent.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AiComponent_vue_vue_type_template_id_300b761a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AiComponent.vue?vue&type=template&id=300b761a&scoped=true */ "./resources/js/components/AiComponent.vue?vue&type=template&id=300b761a&scoped=true");
/* harmony import */ var _AiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AiComponent.vue?vue&type=script&lang=js */ "./resources/js/components/AiComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _AiComponent_vue_vue_type_style_index_0_id_300b761a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css */ "./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_AiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AiComponent_vue_vue_type_template_id_300b761a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-300b761a"],['__file',"resources/js/components/AiComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/AiComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./resources/js/components/AiComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AiComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_style_index_0_id_300b761a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=style&index=0&id=300b761a&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/AiComponent.vue?vue&type=template&id=300b761a&scoped=true":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/AiComponent.vue?vue&type=template&id=300b761a&scoped=true ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_template_id_300b761a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_template_id_300b761a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AiComponent.vue?vue&type=template&id=300b761a&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=template&id=300b761a&scoped=true");


/***/ })

}]);