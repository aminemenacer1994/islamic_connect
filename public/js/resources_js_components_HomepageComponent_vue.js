"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_HomepageComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/AiComponent.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/AiComponent.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _scripts_islamicAiToolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scripts/islamicAiToolkit */ "./resources/components/scripts/islamicAiToolkit.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

const MOBILE_BREAKPOINT = 768;
const CHAT_HISTORY_STORAGE_KEY = 'islamic-connect-chat-sessions';
const AI_TEST_HARNESS_KEY = '__islamicAiHarness';
const SESSION_MEMORY_LIMIT = 30;
const SESSION_STORAGE_COMPACTION_STEPS = [{
  maxSessions: 24,
  maxEntries: 40,
  maxTextLength: 2200,
  keepReferences: true,
  keepSummary: true
}, {
  maxSessions: 16,
  maxEntries: 28,
  maxTextLength: 1400,
  keepReferences: false,
  keepSummary: true
}, {
  maxSessions: 10,
  maxEntries: 18,
  maxTextLength: 900,
  keepReferences: false,
  keepSummary: false
}, {
  maxSessions: 6,
  maxEntries: 10,
  maxTextLength: 560,
  keepReferences: false,
  keepSummary: false
}];
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
      documentClickHandler: null,
      copyNotice: '',
      copyNoticeTimeout: null,
      availableVoices: [],
      preferredVoice: null,
      speechVoicesChanged: null,
      activeSpeechEntryKey: null,
      activeUtterance: null,
      suggestionsExpanded: true,
      voiceAlertMessage: '',
      voiceAlertTimeout: null,
      pendingClearAll: false,
      pendingDeleteSessionId: '',
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
      voiceDraftFrame: null,
      chatSessions: [],
      selectedSessionId: '',
      sessionStartedAt: null,
      sessionDropdownOpen: false,
      questionGenerator: null,
      questionBankCount: 0,
      questionBankMeta: null,
      latestBatchVerification: null
    };
  },
  computed: {
    isNewChatAvailable() {
      return this.chatDraft.trim().length > 0 || this.hasAssistantResponse;
    },
    hasAssistantResponse() {
      return this.chatHistory.some(entry => entry.role === 'assistant');
    },
    selectedSessionInfo() {
      var _session$history;
      if (!this.chatSessions.length) {
        return '';
      }
      const session = this.chatSessions.find(entry => entry.id === this.selectedSessionId) || this.chatSessions[0];
      if (!session) {
        return '';
      }
      const updatedLabel = this.formatSessionTimestamp(session.updatedAt);
      const messageCount = ((_session$history = session.history) === null || _session$history === void 0 ? void 0 : _session$history.length) || 0;
      return `Last updated ${updatedLabel} · ${messageCount} msg${messageCount === 1 ? '' : 's'}`;
    },
    pendingDeleteSessionLabel() {
      if (!this.pendingDeleteSessionId) {
        return '';
      }
      const session = this.chatSessions.find(entry => entry.id === this.pendingDeleteSessionId);
      if (!session) {
        return '';
      }
      return this.formatSessionLabel(session);
    }
  },
  methods: {
    handleComposerKeydown(event) {
      if (!event) {
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault();
        this.sendChatMessage();
      }
    },
    createChatEntry(role, text, references = [], summaryBullets = null, verification = null) {
      const now = new Date();
      const providedSummary = Array.isArray(summaryBullets) ? summaryBullets.map(item => String(item || '').trim()).filter(Boolean).slice(0, 4) : null;
      const resolvedSummary = providedSummary !== null ? providedSummary : role === 'assistant' ? [] : this.extractSummaryBulletPoints(text);
      const allowCollapse = role !== 'assistant' && resolvedSummary.length && this.isLongMessage(text);
      return {
        role,
        text,
        references,
        summaryBullets: resolvedSummary,
        allowCollapse,
        collapsed: allowCollapse && this.isCompactMode,
        userToggled: false,
        speechControlsVisible: false,
        speechStatus: 'stopped',
        verification,
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
    getVerificationBadgeClass(verification) {
      const confidence = (verification === null || verification === void 0 ? void 0 : verification.confidence) || 'low';
      if (confidence === 'high') return 'chat-verification--high';
      if (confidence === 'medium') return 'chat-verification--medium';
      return 'chat-verification--low';
    },
    formatVerificationLabel(verification) {
      if (!verification) {
        return '';
      }
      const confidence = String(verification.confidence || 'low').toUpperCase();
      const sourceCount = Number(verification.totalSources || 0);
      if (sourceCount > 0) {
        return `${confidence} confidence - ${sourceCount} source${sourceCount === 1 ? '' : 's'}`;
      }
      return `${confidence} confidence`;
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
        this.showCopyNotice('Tip: Noor works best with Quran, Sunnah, and Islamic practice questions.');
      }
      this.chatDraft = '';
      this.chatHistory.push(this.createChatEntry('user', message));
      this.scrollChatWindow();
      this.scrollComponentToBottom();
      this.chatLoading = true;
      try {
        var _payload$assistant;
        const payload = await this.postChatMessage(message);
        if (!(payload !== null && payload !== void 0 && (_payload$assistant = payload.assistant) !== null && _payload$assistant !== void 0 && _payload$assistant.message)) {
          throw new Error((payload === null || payload === void 0 ? void 0 : payload.error) || 'Noor cannot respond right now.');
        }
        const assistantData = payload.assistant;
        const references = Array.isArray(assistantData.references) ? assistantData.references : [];
        this.chatHistory.push(this.createChatEntry('assistant', assistantData.message.trim(), references, [], null));
        if (payload.session_id) {
          this.sessionId = payload.session_id;
        }
        this.syncCurrentSessionHistory();
        this.scrollChatWindow();
        this.scrollComponentToBottom();
      } catch (error) {
        console.error('Chat error:', error);
        this.chatError = (error === null || error === void 0 ? void 0 : error.message) || 'The assistant is temporarily unavailable.';
      } finally {
        this.chatLoading = false;
      }
    },
    async postChatMessage(message) {
      if (!message) {
        return null;
      }
      const payload = {
        question: message,
        session_id: this.sessionId || this.resetSession(),
        language: this.getUserLanguage()
      };
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': this.getCsrfToken()
        },
        body: JSON.stringify(payload)
      });
      const contentType = (response.headers.get('content-type') || '').toLowerCase();
      const isJson = contentType.includes('application/json');
      const data = isJson ? await response.json().catch(() => ({})) : {};
      if (!response.ok) {
        const statusHint = response.status ? `Request failed (${response.status}).` : '';
        const error = (data === null || data === void 0 ? void 0 : data.error) || statusHint || 'Noor cannot respond right now.';
        throw new Error(error);
      }
      if (!isJson) {
        throw new Error('Unexpected server response. Please refresh and try again.');
      }
      return data;
    },
    getUserLanguage() {
      if (typeof navigator === 'undefined') {
        return 'en';
      }
      const locale = navigator.language || navigator.userLanguage || 'en';
      return locale.split('-')[0].toLowerCase();
    },
    getCsrfToken() {
      if (typeof document === 'undefined') {
        return '';
      }
      const meta = document.querySelector('meta[name="csrf-token"]');
      return (meta === null || meta === void 0 ? void 0 : meta.getAttribute('content')) || '';
    },
    initializeQuestionGenerator() {
      if (!this.questionGenerator) {
        this.questionGenerator = new _scripts_islamicAiToolkit__WEBPACK_IMPORTED_MODULE_0__.IslamicQuestionGenerator();
      }
      return this.questionGenerator;
    },
    parseQuestionBankMeta() {
      if (typeof window === 'undefined') {
        return null;
      }
      try {
        const raw = window.localStorage.getItem(_scripts_islamicAiToolkit__WEBPACK_IMPORTED_MODULE_0__.QUESTION_BANK_META_STORAGE_KEY);
        if (!raw) {
          return null;
        }
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') {
          return null;
        }
        return parsed;
      } catch (error) {
        return null;
      }
    },
    getQuestionBank() {
      if (typeof window === 'undefined') {
        return [];
      }
      const questions = (0,_scripts_islamicAiToolkit__WEBPACK_IMPORTED_MODULE_0__.loadQuestionBankFromStorage)(window.localStorage);
      this.questionBankCount = questions.length;
      this.questionBankMeta = this.parseQuestionBankMeta();
      return questions;
    },
    generateQuestionBank(count = _scripts_islamicAiToolkit__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_QUESTION_COUNT) {
      if (typeof window === 'undefined') {
        return [];
      }
      const generator = this.initializeQuestionGenerator();
      const questions = (0,_scripts_islamicAiToolkit__WEBPACK_IMPORTED_MODULE_0__.ensureQuestionBank)({
        generator,
        count,
        storage: window.localStorage
      });
      this.questionBankCount = questions.length;
      this.questionBankMeta = this.parseQuestionBankMeta();
      return questions;
    },
    initializeQuestionBank() {
      if (typeof window === 'undefined') {
        return;
      }
      this.initializeQuestionGenerator();
      this.getQuestionBank();
    },
    async runBatchVerification(batchSize = _scripts_islamicAiToolkit__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_BATCH_SIZE, maxBatches = null) {
      const normalizedBatchSize = Math.max(1, Number(batchSize) || _scripts_islamicAiToolkit__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_BATCH_SIZE);
      const existingQuestions = this.getQuestionBank();
      const questions = existingQuestions.length ? existingQuestions : this.generateQuestionBank(_scripts_islamicAiToolkit__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_QUESTION_COUNT);
      const batches = (0,_scripts_islamicAiToolkit__WEBPACK_IMPORTED_MODULE_0__.chunkQuestionBatches)(questions, normalizedBatchSize);
      const limit = Number.isFinite(Number(maxBatches)) && Number(maxBatches) > 0 ? Math.min(batches.length, Number(maxBatches)) : batches.length;
      const batchReports = [];
      for (let index = 0; index < limit; index += 1) {
        const batch = batches[index];
        const response = await fetch('/api/ai/batch-verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': this.getCsrfToken()
          },
          body: JSON.stringify({
            questions: batch
          })
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error((payload === null || payload === void 0 ? void 0 : payload.error) || `Batch verification failed at batch ${index + 1}.`);
        }
        batchReports.push({
          batch: index + 1,
          size: batch.length,
          summary: payload.summary || {}
        });
      }
      const report = {
        generatedAt: new Date().toISOString(),
        totalQuestions: questions.length,
        batchSize: normalizedBatchSize,
        batchesProcessed: batchReports.length,
        batches: batchReports
      };
      this.latestBatchVerification = report;
      return report;
    },
    attachAiTestHarness() {
      if (typeof window === 'undefined') {
        return;
      }
      window[AI_TEST_HARNESS_KEY] = {
        apis: _scripts_islamicAiToolkit__WEBPACK_IMPORTED_MODULE_0__.FREE_ISLAMIC_APIS,
        generateQuestionBank: (count = _scripts_islamicAiToolkit__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_QUESTION_COUNT) => this.generateQuestionBank(count),
        getQuestionBank: () => this.getQuestionBank(),
        runBatchVerification: (batchSize = _scripts_islamicAiToolkit__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_BATCH_SIZE, maxBatches = null) => this.runBatchVerification(batchSize, maxBatches),
        getLatestBatchReport: () => this.latestBatchVerification,
        storageKey: _scripts_islamicAiToolkit__WEBPACK_IMPORTED_MODULE_0__.QUESTION_BANK_STORAGE_KEY
      };
    },
    detachAiTestHarness() {
      if (typeof window === 'undefined') {
        return;
      }
      if (window[AI_TEST_HARNESS_KEY]) {
        delete window[AI_TEST_HARNESS_KEY];
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
    isQuotaExceededError(error) {
      if (!error || typeof error !== 'object') {
        return false;
      }
      const name = String(error.name || '');
      const code = Number(error.code || 0);
      return name === 'QuotaExceededError' || name === 'NS_ERROR_DOM_QUOTA_REACHED' || code === 22 || code === 1014;
    },
    formatEntryTime(timestamp) {
      const parsed = typeof timestamp === 'string' ? Date.parse(timestamp) : timestamp;
      const date = new Date(!Number.isNaN(parsed) && parsed ? parsed : Date.now());
      return {
        iso: date.toISOString(),
        displayTime: date.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit'
        }),
        displayDate: date.toLocaleDateString([], {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        })
      };
    },
    normalizeStoredReference(reference) {
      if (!reference || typeof reference !== 'object') {
        return null;
      }
      const label = String(reference.label || '').trim();
      if (!label) {
        return null;
      }
      const normalizedUrl = typeof reference.url === 'string' && reference.url.trim() ? reference.url.trim() : null;
      return {
        label: label.slice(0, 180),
        url: normalizedUrl
      };
    },
    serializeSessionEntryForStorage(entry, options = {}) {
      if (!entry || typeof entry !== 'object') {
        return null;
      }
      const role = entry.role === 'assistant' ? 'assistant' : 'user';
      const rawText = typeof entry.text === 'string' ? entry.text.trim() : '';
      if (!rawText) {
        return null;
      }
      const maxTextLength = Number(options.maxTextLength || 1200);
      const text = rawText.length > maxTextLength ? `${rawText.slice(0, maxTextLength)}...` : rawText;
      const references = options.keepReferences ? Array.isArray(entry.references) ? entry.references.map(item => this.normalizeStoredReference(item)).filter(Boolean).slice(0, 4) : [] : [];
      const summaryBullets = options.keepSummary ? Array.isArray(entry.summaryBullets) ? entry.summaryBullets.map(item => String(item || '').trim()).filter(Boolean).slice(0, 3) : this.extractSummaryBulletPoints(text) : [];
      const verification = entry.verification && typeof entry.verification === 'object' ? {
        verified: Boolean(entry.verification.verified),
        confidence: String(entry.verification.confidence || 'low'),
        totalSources: Number(entry.verification.totalSources || 0),
        message: String(entry.verification.message || '')
      } : null;
      const time = this.formatEntryTime(entry.time);
      return {
        role,
        text,
        time: time.iso,
        references,
        summaryBullets,
        verification
      };
    },
    buildStorageSessionPayload(options = {}) {
      const maxSessions = Number(options.maxSessions || 12);
      const maxEntries = Number(options.maxEntries || 20);
      const sessions = Array.isArray(this.chatSessions) ? this.chatSessions.slice(0, maxSessions) : [];
      return sessions.map(session => {
        const history = Array.isArray(session.history) ? session.history : [];
        const compactedHistory = history.slice(-maxEntries).map(entry => this.serializeSessionEntryForStorage(entry, options)).filter(Boolean);
        if (!session.id || !compactedHistory.length) {
          return null;
        }
        return {
          id: String(session.id),
          createdAt: session.createdAt || session.updatedAt || Date.now(),
          updatedAt: session.updatedAt || Date.now(),
          history: compactedHistory
        };
      }).filter(Boolean);
    },
    normalizeStoredChatEntry(entry) {
      if (!entry || typeof entry !== 'object') {
        return null;
      }
      const role = entry.role === 'assistant' ? 'assistant' : 'user';
      const text = typeof entry.text === 'string' ? entry.text.trim() : '';
      if (!text) {
        return null;
      }
      const time = this.formatEntryTime(entry.time);
      const references = Array.isArray(entry.references) ? entry.references.map(item => this.normalizeStoredReference(item)).filter(Boolean).slice(0, 5) : [];
      const summaryBullets = Array.isArray(entry.summaryBullets) ? entry.summaryBullets.map(item => String(item || '').trim()).filter(Boolean).slice(0, 4) : this.extractSummaryBulletPoints(text);
      const allowCollapse = role !== 'assistant' && summaryBullets.length > 0 && this.isLongMessage(text);
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
        verification: null,
        time: time.iso,
        displayTime: time.displayTime,
        displayDate: time.displayDate
      };
    },
    persistSessionsStorage() {
      if (typeof window === 'undefined') {
        return;
      }
      for (const strategy of SESSION_STORAGE_COMPACTION_STEPS) {
        try {
          const payload = this.buildStorageSessionPayload(strategy);
          window.localStorage.setItem(CHAT_HISTORY_STORAGE_KEY, JSON.stringify(payload));
          return;
        } catch (error) {
          if (!this.isQuotaExceededError(error)) {
            console.error('Unable to save chat sessions', error);
            return;
          }
        }
      }
      console.error('Unable to save chat sessions', new Error('Storage quota exceeded after compaction attempts.'));
    },
    loadStoredSessions() {
      if (typeof window === 'undefined') {
        return;
      }
      try {
        const stored = JSON.parse(window.localStorage.getItem(CHAT_HISTORY_STORAGE_KEY) || '[]');
        if (!Array.isArray(stored)) {
          this.chatSessions = [];
          return;
        }
        const sessions = stored.filter(session => session && session.id && Array.isArray(session.history) && session.history.length).map(session => ({
          id: session.id,
          history: session.history.map(entry => this.normalizeStoredChatEntry(entry)).filter(Boolean),
          createdAt: session.createdAt || session.updatedAt || Date.now(),
          updatedAt: session.updatedAt || Date.now()
        })).filter(session => session.history.length).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
        this.chatSessions = sessions;
        if (!this.selectedSessionId && sessions.length) {
          this.selectedSessionId = sessions[0].id;
        }
      } catch (error) {
        console.error('Unable to load saved chats', error);
        this.chatSessions = [];
      }
    },
    syncCurrentSessionHistory() {
      if (!this.sessionId || !this.chatHistory.length) {
        return;
      }
      const record = {
        id: this.sessionId,
        history: this.chatHistory.map(entry => _objectSpread({}, entry)),
        createdAt: this.sessionStartedAt || Date.now(),
        updatedAt: Date.now()
      };
      const existingIndex = this.chatSessions.findIndex(session => session.id === this.sessionId);
      if (existingIndex >= 0) {
        this.chatSessions.splice(existingIndex, 1);
      }
      this.chatSessions.unshift(record);
      if (this.chatSessions.length > SESSION_MEMORY_LIMIT) {
        this.chatSessions = this.chatSessions.slice(0, SESSION_MEMORY_LIMIT);
      }
      this.persistSessionsStorage();
    },
    loadSession(sessionId) {
      if (!sessionId) {
        return;
      }
      const session = this.chatSessions.find(entry => entry.id === sessionId);
      if (!session) {
        return;
      }
      this.chatHistory = session.history.map(entry => _objectSpread({}, entry));
      this.sessionId = session.id;
      this.sessionStartedAt = session.createdAt || Date.now();
      this.selectedSessionId = session.id;
      this.chatDraft = '';
      this.chatError = null;
      this.scrollChatWindow();
      this.scrollComponentToBottom();
      this.sessionDropdownOpen = false;
    },
    toggleSessionDropdown() {
      if (!this.chatSessions.length) {
        return;
      }
      this.pendingClearAll = false;
      this.pendingDeleteSessionId = '';
      this.sessionDropdownOpen = !this.sessionDropdownOpen;
    },
    handleDocumentClick(event) {
      if (!this.sessionDropdownOpen || !event) {
        return;
      }
      const root = this.$el;
      const container = root === null || root === void 0 ? void 0 : root.querySelector('.ai-session-inline');
      const trigger = root === null || root === void 0 ? void 0 : root.querySelector('.ai-session-inline__button');
      if (container !== null && container !== void 0 && container.contains(event.target) || trigger !== null && trigger !== void 0 && trigger.contains(event.target)) {
        return;
      }
      this.sessionDropdownOpen = false;
      this.pendingClearAll = false;
      this.pendingDeleteSessionId = '';
    },
    prepareClearAllSessions() {
      this.pendingClearAll = true;
      this.pendingDeleteSessionId = '';
    },
    cancelPendingClearAll() {
      this.pendingClearAll = false;
    },
    doClearAllSessions() {
      this.pendingClearAll = false;
      this.clearAllSessions();
    },
    prepareDeleteSession(sessionId) {
      this.pendingDeleteSessionId = sessionId;
      this.pendingClearAll = false;
    },
    cancelPendingDelete() {
      this.pendingDeleteSessionId = '';
    },
    doDeleteSession() {
      const sessionId = this.pendingDeleteSessionId;
      this.pendingDeleteSessionId = '';
      if (!sessionId) {
        return;
      }
      this.deleteSession(sessionId);
    },
    selectSessionFromList(sessionId) {
      if (!sessionId) {
        return;
      }
      this.loadSession(sessionId);
    },
    deleteSession(sessionId) {
      if (!sessionId) {
        return;
      }
      const index = this.chatSessions.findIndex(session => session.id === sessionId);
      if (index === -1) {
        return;
      }
      this.chatSessions.splice(index, 1);
      if (this.selectedSessionId === sessionId) {
        var _this$chatSessions$;
        this.selectedSessionId = ((_this$chatSessions$ = this.chatSessions[0]) === null || _this$chatSessions$ === void 0 ? void 0 : _this$chatSessions$.id) || '';
      }
      if (!this.chatSessions.length) {
        this.sessionDropdownOpen = false;
      }
      this.persistSessionsStorage();
    },
    clearAllSessions() {
      this.chatSessions = [];
      this.selectedSessionId = '';
      this.sessionDropdownOpen = false;
      this.chatHistory = [];
      this.chatDraft = '';
      this.chatError = null;
      this.persistSessionsStorage();
    },
    formatSessionLabel(session) {
      var _session$history2;
      if (!session) {
        return '';
      }
      const timestamp = session.createdAt || session.updatedAt;
      const formatted = this.formatSessionTimestamp(timestamp);
      const messageCount = ((_session$history2 = session.history) === null || _session$history2 === void 0 ? void 0 : _session$history2.length) || 0;
      const suffix = [`${messageCount} msg${messageCount === 1 ? '' : 's'}`];
      return `${formatted} · ${suffix.join(' · ')}`;
    },
    formatSessionTimestamp(timestamp) {
      const value = typeof timestamp === 'string' ? Date.parse(timestamp) : timestamp;
      const date = new Date(!Number.isNaN(value) ? value : Date.now());
      return `${date.toLocaleDateString([], {
        month: 'short',
        day: 'numeric'
      })} · ${date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit'
      })}`;
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
          this.voiceStatus = 'Voice search activated. Listening for your question.';
          this.clearVoiceAutoSubmitTimer();
          this.showVoiceAlert('Voice search activated. Listening for your question.');
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
            this.voiceStatus = 'Listening. Feel free to continue speaking.';
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
      this.showVoiceAlert('Voice search stopped.');
    },
    scheduleVoiceSubmission(transcript) {
      if (!transcript) {
        return;
      }
      this.cancelVoiceDraftUpdate();
      this.chatDraft = transcript;
      this.voiceStatus = 'Captured your question. Sending it shortly.';
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
    showVoiceAlert(message, duration = 3400) {
      if (!message) {
        return;
      }
      this.voiceAlertMessage = message;
      if (this.voiceAlertTimeout) {
        clearTimeout(this.voiceAlertTimeout);
      }
      this.voiceAlertTimeout = setTimeout(() => {
        this.voiceAlertMessage = '';
        this.voiceAlertTimeout = null;
      }, duration);
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
      this.syncCurrentSessionHistory();
      this.chatHistory = [];
      this.chatDraft = '';
      this.resetSession();
    },
    handleSessionExpiry() {
      this.sessionExpired = true;
      this.chatError = 'Session expired. Refresh the page to continue.';
    },
    reloadPage() {
      if (typeof window !== 'undefined' && window.location) {
        window.location.reload();
      }
    },
    isIslamicQuestion(message) {
      if (!message) return false;
      const normalized = message.toLowerCase().trim();
      if (normalized.length < 3) {
        return false;
      }
      const keywords = ['islam', 'muslim', 'quran', 'hadith', 'sunnah', 'dua', 'salah', 'prayer', 'ramadan', 'hajj', 'umrah', 'fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'zakat', 'halal', 'haram', 'allah', 'prophet', 'fiqh', 'tafsir', 'imam', 'masjid', 'mosque', 'ayah', 'surah', 'tafseer', 'aqeedah', 'taqwa', 'sufism', 'istikhara', 'nikah', 'shahada'];
      if (keywords.some(keyword => normalized.includes(keyword))) {
        return true;
      }
      const startsLikeQuestion = /^(what|how|why|when|where|who|can|should|is|are|do|does|did|i|my)\b/.test(normalized);
      const hasLetters = /[a-z]/.test(normalized);
      return hasLetters && (startsLikeQuestion || normalized.includes('?') || normalized.length >= 16);
    },
    resetSession() {
      const newId = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
      this.sessionId = newId;
      this.sessionStartedAt = Date.now();
      this.selectedSessionId = '';
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
    this.loadStoredSessions();
    this.resetSession();
    this.updateCompactMode();
    this.initializeSpeechSynthesis();
    this.initializeQuestionBank();
    this.attachAiTestHarness();
    this.resizeListener = () => this.updateCompactMode();
    window.addEventListener('resize', this.resizeListener);
    this.documentClickHandler = event => this.handleDocumentClick(event);
    document.addEventListener('click', this.documentClickHandler);
  },
  beforeUnmount() {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
    if (this.documentClickHandler) {
      document.removeEventListener('click', this.documentClickHandler);
      this.documentClickHandler = null;
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
    if (this.voiceAlertTimeout) {
      clearTimeout(this.voiceAlertTimeout);
      this.voiceAlertTimeout = null;
    }
    this.stopSpeech();
    this.detachAiTestHarness();
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_HomepageComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_HomepageComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/vue/HomepageComponent.vue */ "./resources/components/vue/HomepageComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/AiComponent.vue?vue&type=template&id=077e75cb&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/AiComponent.vue?vue&type=template&id=077e75cb&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
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
const _hoisted_21 = ["disabled", "aria-expanded"];
const _hoisted_22 = {
  class: "ai-session-inline"
};
const _hoisted_23 = {
  key: 0,
  class: "ai-session-inline__dropdown",
  role: "listbox",
  "aria-label": "Recent chats"
};
const _hoisted_24 = {
  key: 1,
  class: "ai-session-inline__alert ai-session-inline__alert--danger",
  role: "alert"
};
const _hoisted_25 = ["onClick", "onKeydown"];
const _hoisted_26 = ["onClick", "onKeydown"];
const _hoisted_27 = {
  key: 1,
  class: "ai-session-inline__alert ai-session-inline__alert--warning",
  role: "alert"
};
const _hoisted_28 = {
  class: "m-0"
};
const _hoisted_29 = {
  key: 0,
  class: "ai-copy-notice",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_30 = {
  key: 1,
  class: "ai-error-banner",
  role: "alert",
  "aria-live": "assertive",
  "aria-atomic": "true"
};
const _hoisted_31 = {
  class: "ai-error-message"
};
const _hoisted_32 = {
  key: 2,
  ref: "chatShell",
  class: "ai-chat-shell"
};
const _hoisted_33 = {
  class: "ai-metadata"
};
const _hoisted_34 = {
  key: 0,
  class: "ai-loading-indicator",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_35 = {
  ref: "chatWindow",
  class: "ai-chat-window",
  role: "log",
  "aria-live": "polite"
};
const _hoisted_36 = {
  class: "chat-entry-header"
};
const _hoisted_37 = {
  class: "chat-role mr-2"
};
const _hoisted_38 = {
  class: "chat-timestamp"
};
const _hoisted_39 = {
  class: "chat-bubble-container"
};
const _hoisted_40 = {
  key: 0,
  class: "chat-section-heading"
};
const _hoisted_41 = ["innerHTML"];
const _hoisted_42 = {
  key: 1,
  class: "chat-entry-actions"
};
const _hoisted_43 = ["onClick"];
const _hoisted_44 = ["onClick"];
const _hoisted_45 = {
  class: "chat-voice-wrapper ms-2"
};
const _hoisted_46 = ["onClick", "aria-expanded"];
const _hoisted_47 = {
  key: 0,
  class: "chat-voice-controls",
  role: "group",
  "aria-label": "Speech controls",
  "aria-live": "polite"
};
const _hoisted_48 = ["onClick", "disabled"];
const _hoisted_49 = ["onClick", "disabled"];
const _hoisted_50 = ["onClick", "disabled"];
const _hoisted_51 = {
  class: "chat-voice-status",
  "aria-live": "polite"
};
const _hoisted_52 = {
  key: 2,
  class: "chat-summary"
};
const _hoisted_53 = {
  class: "chat-summary-title"
};
const _hoisted_54 = ["onClick"];
const _hoisted_55 = {
  key: 0
};
const _hoisted_56 = {
  key: 1
};
const _hoisted_57 = {
  key: 5,
  class: "chat-references-wrapper",
  "aria-label": "Sources that informed this answer"
};
const _hoisted_58 = {
  class: "chat-references",
  role: "list"
};
const _hoisted_59 = ["href"];
const _hoisted_60 = {
  key: 0,
  class: "chat-entry assistant chat-entry--typing",
  "aria-live": "polite"
};
const _hoisted_61 = ["disabled"];
const _hoisted_62 = {
  class: "ai-form-meta pt-2 text-muted"
};
const _hoisted_63 = {
  class: "ai-secondary-group"
};
const _hoisted_64 = ["disabled"];
const _hoisted_65 = {
  key: 0,
  class: "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
};
const _hoisted_66 = ["disabled", "aria-pressed"];
const _hoisted_67 = ["disabled"];
const _hoisted_68 = {
  key: 0,
  class: "ai-voice-status",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_69 = {
  key: 1,
  class: "voice-alert",
  role: "status",
  "aria-live": "polite"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"ai-welcome\" aria-live=\"polite\" data-v-077e75cb><div class=\"ai-welcome-icon\" aria-hidden=\"true\" data-v-077e75cb><i class=\"fas fa-star-and-crescent\" aria-hidden=\"true\" data-v-077e75cb></i></div><div class=\"ai-welcome-text pt-2\" data-v-077e75cb><h2 class=\"fw-bold\" data-v-077e75cb>Introducing Noor, Your AI Companion</h2><p class=\"container ai-welcome-copy\" data-v-077e75cb> Noor listens first, then gently responds with Quran rooted insight and prophetic kindness so every exchange feels like encouragement from a trusted companion. Ask for dua ideas, reminders, or reflections tuned to your day. </p></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "fw-bold"
  }, "Need inspiration?", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
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
  }, [...(_cache[18] || (_cache[18] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-plus-circle",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" New chat ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_17)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-control-btn",
    disabled: !$data.chatHistory.length,
    onClick: _cache[2] || (_cache[2] = (...args) => $options.clearHistory && $options.clearHistory(...args))
  }, [...(_cache[19] || (_cache[19] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-trash-alt",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Clear history ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_18), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-control-btn ai-control-btn--whatsapp",
    disabled: !$data.chatHistory.length,
    onClick: _cache[3] || (_cache[3] = (...args) => $options.shareConversationOnWhatsApp && $options.shareConversationOnWhatsApp(...args))
  }, [...(_cache[20] || (_cache[20] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fab fa-whatsapp",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Share Full Convo ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_19), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-control-btn ai-control-btn--copy",
    disabled: !$data.chatHistory.length,
    onClick: _cache[4] || (_cache[4] = (...args) => $options.copyConversationToClipboard && $options.copyConversationToClipboard(...args))
  }, [...(_cache[21] || (_cache[21] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-copy",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Copy Full Convo ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_20), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-control-btn ai-session-inline__button",
    disabled: !$data.chatSessions.length,
    onClick: _cache[5] || (_cache[5] = (...args) => $options.toggleSessionDropdown && $options.toggleSessionDropdown(...args)),
    "aria-haspopup": "listbox",
    "aria-expanded": $data.sessionDropdownOpen ? 'true' : 'false'
  }, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-clipboard-list",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.chatSessions.length ? `Saved chats (${$data.chatSessions.length})` : 'No saved chats yet'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_21)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [$data.sessionDropdownOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, [$data.chatSessions.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "ai-session-inline__clear-all",
    onClick: _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.prepareClearAllSessions && $options.prepareClearAllSessions(...args), ["stop", "prevent"]))
  }, [...(_cache[23] || (_cache[23] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-trash-alt me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Remove all saved chats ", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.pendingClearAll ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_24, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "m-0"
  }, "Delete all saved chats?", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-session-inline__action-btn",
    onClick: _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.cancelPendingClearAll && $options.cancelPendingClearAll(...args), ["stop"]))
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-session-inline__action-btn ai-session-inline__action-btn--danger",
    onClick: _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.doClearAllSessions && $options.doClearAllSessions(...args), ["stop"]))
  }, "Delete")])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.chatSessions, session => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: session.id,
      class: "ai-session-inline__dropdown-item",
      role: "option",
      tabindex: "0",
      onClick: $event => $options.selectSessionFromList(session.id),
      onKeydown: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.selectSessionFromList(session.id), ["prevent"]), ["enter"])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatSessionLabel(session)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatSessionTimestamp(session.updatedAt)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "ai-session-inline__dropdown-remove",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.prepareDeleteSession(session.id), ["stop"]),
      onKeydown: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.prepareDeleteSession(session.id), ["stop", "prevent"]), ["enter"]),
      "aria-label": "Delete this saved chat"
    }, [...(_cache[25] || (_cache[25] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-times",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_26)], 40 /* PROPS, NEED_HYDRATION */, _hoisted_25);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.pendingDeleteSessionId ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_28, "Delete “" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.pendingDeleteSessionLabel) + "”?", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-session-inline__action-btn",
    onClick: _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.cancelPendingDelete && $options.cancelPendingDelete(...args), ["stop"]))
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-session-inline__action-btn ai-session-inline__action-btn--warning",
    onClick: _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.doDeleteSession && $options.doDeleteSession(...args), ["stop"]))
  }, "Delete")])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), $data.copyNotice ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_29, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-check-circle me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.copyNotice), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.chatError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_30, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-exclamation-triangle ai-error-icon",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "ai-error-title text-left"
  }, "Need some redirection?", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.chatError), 1 /* TEXT */), $data.sessionExpired ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "ai-error-clear",
    onClick: _cache[11] || (_cache[11] = (...args) => $options.reloadPage && $options.reloadPage(...args))
  }, " Reload page ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.chatHistory.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [$data.chatLoading && !$data.chatHistory.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_34, [...(_cache[29] || (_cache[29] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "spinner-border spinner-border-sm",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-0 fw-semibold"
  }, "Assistant is consulting trusted sources...", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.chatHistory, (entry, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: `chat-${idx}-${entry.role}`,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['chat-entry', entry.role])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(entry.role === 'assistant' ? 'fas fa-robot chat-icon' : 'fas fa-user chat-icon'),
      "aria-hidden": "true",
      title: "Sender"
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.role === 'assistant' ? 'Assistant' : 'You'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.displayTime) + " · " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.displayDate), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [entry.role === 'assistant' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_40, "Answer")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['chat-bubble', entry.role, {
        'chat-bubble--collapsed': entry.role === 'assistant' && entry.collapsed
      }]),
      innerHTML: $options.formatChatText(entry.text)
    }, null, 10 /* CLASS, PROPS */, _hoisted_41), entry.role === 'assistant' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "chat-share-btn",
      onClick: $event => $options.shareEntryOnWhatsApp(entry),
      "aria-label": 'Share this answer via WhatsApp'
    }, [...(_cache[30] || (_cache[30] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fab fa-whatsapp",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "d-none d-md-inline ms-1"
    }, "Share answer", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_43), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "chat-copy-btn ms-2",
      onClick: $event => $options.copyEntryToClipboard(entry),
      "aria-label": 'Copy this answer'
    }, [...(_cache[31] || (_cache[31] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-copy",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "d-none d-md-inline ms-1"
    }, "Copy answer", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_44), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "chat-voice-trigger",
      onClick: $event => $options.toggleSpeechControls(entry),
      "aria-expanded": entry.speechControlsVisible ? 'true' : 'false'
    }, [...(_cache[32] || (_cache[32] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-volume-up",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "visually-hidden"
    }, "Read this answer aloud", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_46), entry.speechControlsVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_47, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "chat-voice-control-btn",
      onClick: $event => $options.playEntrySpeech(entry),
      disabled: entry.speechStatus === 'loading',
      "aria-label": "Play answer"
    }, [...(_cache[33] || (_cache[33] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-play",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_48), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "chat-voice-control-btn",
      onClick: $event => $options.pauseEntrySpeech(entry),
      disabled: entry.speechStatus !== 'playing',
      "aria-label": "Pause answer"
    }, [...(_cache[34] || (_cache[34] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-pause",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_49), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "chat-voice-control-btn",
      onClick: $event => $options.stopEntrySpeech(entry),
      disabled: entry.speechStatus === 'stopped',
      "aria-label": "Stop answer"
    }, [...(_cache[35] || (_cache[35] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-stop",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_50), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_51, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.speechStatus === 'loading' ? 'Preparing…' : entry.speechStatus), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), entry.collapsed && entry.summaryBullets.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_53, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.role === 'assistant' ? 'Quick summary' : 'Question snapshot'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(entry.summaryBullets, (bullet, bulletIndex) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: `summary-${idx}-${bulletIndex}`
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(bullet), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), entry.allowCollapse && $data.isCompactMode ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: 3,
      type: "button",
      class: "chat-collapse-toggle",
      onClick: $event => $options.toggleEntryCollapse(entry)
    }, [entry.collapsed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_55, " Show full " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.role === 'assistant' ? 'response' : 'question'), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_56, " Collapse to " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.role === 'assistant' ? 'summary' : 'preview'), 1 /* TEXT */))], 8 /* PROPS */, _hoisted_54)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), entry.role === 'assistant' && entry.verification ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 4,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['chat-verification', $options.getVerificationBadgeClass(entry.verification)]),
      "aria-live": "polite"
    }, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check-circle",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatVerificationLabel(entry.verification)), 1 /* TEXT */)], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), entry.references && entry.references.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_57, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "chat-references-heading"
    }, "Reference (Proof)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_58, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(entry.references, (reference, refIndex) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: `ref-${idx}-${refIndex}-${reference.label}`
      }, [reference.url ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
        key: 0,
        href: reference.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reference.label), 9 /* TEXT, PROPS */, _hoisted_59)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        key: 1
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reference.label), 1 /* TEXT */)], 64 /* STABLE_FRAGMENT */))]);
    }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */)), $data.chatLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", _hoisted_60, [...(_cache[38] || (_cache[38] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chat-entry-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-robot chat-icon",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "chat-role mr-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Noor")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "chat-timestamp"
  }, "now")], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chat-bubble-container"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chat-bubble assistant chat-bubble--typing",
    role: "status"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "chat-typing-dot"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "chat-typing-dot"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "chat-typing-dot"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "chat-typing-text"
  }, "Noor is typing...")])], -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */)], 512 /* NEED_PATCH */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    ref: "aiForm",
    class: "ai-form pt-3",
    onSubmit: _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.sendChatMessage && $options.sendChatMessage(...args), ["prevent"]))
  }, [_cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "visually-hidden",
    for: "aiChatInput"
  }, "Ask the chatbot", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    id: "aiChatInput",
    ref: "aiChatInput",
    "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => $data.chatDraft = $event),
    class: "ai-textarea",
    rows: "2",
    placeholder: "Ask something that brings you closer to Allah...",
    disabled: $data.chatLoading,
    onKeydown: _cache[13] || (_cache[13] = (...args) => $options.handleComposerKeydown && $options.handleComposerKeydown(...args))
  }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_61), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.chatDraft]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "ai-input-hint mb-0"
  }, "Press Ctrl+Enter (or Cmd+Enter on Mac) to send quickly.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "ai-submit",
    disabled: $data.chatLoading || !$data.chatDraft.trim()
  }, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-paper-plane",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), $data.chatLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_65)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.chatLoading ? 'Noor is thinking...' : 'Ask Noor'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_64), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["ai-voice-btn text-center", {
      'ai-voice-btn--active': $data.voiceListening
    }]),
    disabled: $data.chatLoading,
    onClick: _cache[14] || (_cache[14] = (...args) => $options.toggleVoiceSearch && $options.toggleVoiceSearch(...args)),
    "aria-pressed": $data.voiceListening.toString()
  }, [_cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-microphone",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.voiceListening ? 'Listening…' : 'Voice search'), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_66), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-clear-input",
    disabled: $data.chatLoading || !$data.chatDraft.trim(),
    onClick: _cache[15] || (_cache[15] = (...args) => $options.clearDraft && $options.clearDraft(...args))
  }, [...(_cache[41] || (_cache[41] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-eraser",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Clear input", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_67)])]), $data.voiceStatus ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_68, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-microphone me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.voiceStatus), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.voiceAlertMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_69, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.voiceAlertMessage), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ai-trust-note",
    role: "note",
    "aria-live": "polite"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-shield-alt",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-0 text-muted"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Religious guidance needs clear boundaries. Noor is educational, so consult a qualified scholar for fatwas. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/trust",
    class: "text-decoration-underline text-primary ms-1"
  }, "Trust & disclaimer")])], -1 /* CACHED */))], 544 /* NEED_HYDRATION, NEED_PATCH */)])], 512 /* NEED_PATCH */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HomepageComponent.vue?vue&type=template&id=0dc90d45&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HomepageComponent.vue?vue&type=template&id=0dc90d45&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "ic-home"
};
const _hoisted_2 = {
  class: "jumbotron ic-hero"
};
const _hoisted_3 = {
  class: "container-fluid",
  style: {
    "position": "relative"
  }
};
const _hoisted_4 = {
  class: "container-fluid hero-wrapper text-center ic-hero__frame"
};
const _hoisted_5 = {
  key: 0,
  class: "container-fluid ic-hero__hifdh-zone",
  "aria-label": "Hifdh performance"
};
const _hoisted_6 = {
  class: "row g-3 align-items-stretch hifdh-hero-layout"
};
const _hoisted_7 = {
  class: "col-12 col-lg-4"
};
const _hoisted_8 = {
  href: "/surat?open=hifdh-plan",
  class: "hifdh-home-widget text-decoration-none d-flex align-items-center justify-content-between h-100",
  "aria-label": "Open Quran page and review today's Hifdh due items"
};
const _hoisted_9 = {
  class: "hifdh-home-widget__count",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_10 = {
  class: "col-12 col-lg-8"
};
const _hoisted_11 = {
  class: "hifdh-home-dashboard h-100"
};
const _hoisted_12 = {
  class: "hifdh-home-dashboard__card"
};
const _hoisted_13 = {
  class: "hifdh-home-bars",
  role: "list",
  "aria-label": "7 day hifdh progress"
};
const _hoisted_14 = {
  class: "hifdh-home-dashboard__card"
};
const _hoisted_15 = {
  key: 0,
  class: "hifdh-home-weak-list"
};
const _hoisted_16 = {
  class: "hifdh-home-weak-item__label"
};
const _hoisted_17 = {
  class: "hifdh-home-weak-item__count"
};
const _hoisted_18 = {
  key: 1,
  class: "small text-muted mb-0"
};
const _hoisted_19 = {
  class: "hifdh-home-dashboard__card"
};
const _hoisted_20 = {
  class: "hifdh-home-streak"
};
const _hoisted_21 = {
  class: "hifdh-home-streak"
};
const _hoisted_22 = {
  class: "hifdh-home-streak"
};
const _hoisted_23 = {
  class: "container-fluid premium-seo px-0 ic-seo",
  "aria-labelledby": "seo-heading"
};
const _hoisted_24 = {
  class: "container position-relative"
};
const _hoisted_25 = {
  class: "row gy-4 align-items-center"
};
const _hoisted_26 = {
  class: "col-lg-6 text-center text-lg-start"
};
const _hoisted_27 = {
  class: "row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3"
};
const _hoisted_28 = {
  class: "p-4 premium-stat h-100 text-center"
};
const _hoisted_29 = {
  class: "h3 fw-bold mb-1"
};
const _hoisted_30 = {
  class: "text-muted"
};
const _hoisted_31 = {
  class: "col-lg-6"
};
const _hoisted_32 = {
  class: "row row-cols-1 row-cols-md-2 g-3"
};
const _hoisted_33 = {
  class: "premium-card h-100 d-flex flex-column"
};
const _hoisted_34 = {
  class: "h6 fw-semibold mb-2"
};
const _hoisted_35 = {
  class: "small text-muted mb-3"
};
const _hoisted_36 = ["title", "href"];
const _hoisted_37 = {
  class: "py-5 contact-section position-relative",
  "aria-labelledby": "contact-heading"
};
const _hoisted_38 = {
  class: "container px-lg-4"
};
const _hoisted_39 = {
  class: "row justify-content-center mt-4"
};
const _hoisted_40 = {
  class: "col-xl-10"
};
const _hoisted_41 = {
  class: "contact-card shadow-lg rounded-4"
};
const _hoisted_42 = {
  class: "row g-3"
};
const _hoisted_43 = {
  class: "col-md-6"
};
const _hoisted_44 = {
  class: "col-md-6"
};
const _hoisted_45 = {
  class: "col-md-6"
};
const _hoisted_46 = {
  class: "col-md-6"
};
const _hoisted_47 = ["value"];
const _hoisted_48 = {
  class: "col-12"
};
const _hoisted_49 = {
  class: "col-12"
};
const _hoisted_50 = {
  class: "d-grid"
};
const _hoisted_51 = ["disabled"];
const _hoisted_52 = {
  class: "d-flex align-items-center justify-content-center gap-2"
};
const _hoisted_53 = {
  key: 0,
  class: "premium-dialog-overlay"
};
const _hoisted_54 = {
  class: "premium-dialog-card"
};
const _hoisted_55 = {
  class: "premium-dialog-title"
};
const _hoisted_56 = {
  class: "premium-dialog-message"
};
const _hoisted_57 = {
  class: "d-flex align-items-center justify-content-end gap-2 mt-3"
};
const _hoisted_58 = ["disabled"];
const _hoisted_59 = ["disabled"];
const _hoisted_60 = {
  class: "mb-0 fw-bold"
};
const _hoisted_61 = {
  class: "text-muted"
};
const _hoisted_62 = {
  class: "ic-footer text-white",
  role: "contentinfo"
};
const _hoisted_63 = {
  class: "container-fluid footer-inner d-flex flex-column flex-md-row align-items-center justify-content-between gap-2"
};
const _hoisted_64 = {
  class: "copyright text-center text-md-start"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Enhanced Hero Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Background Elements "), _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"ic-hero__orb ic-hero__orb--primary\" data-v-0dc90d45></div><div class=\"ic-hero__orb ic-hero__orb--secondary\" data-v-0dc90d45></div><div class=\"row align-items-center ic-hero__grid\" data-v-0dc90d45><div class=\"col-md-6\" data-v-0dc90d45><div class=\"text-left\" data-v-0dc90d45><!-- Badge --><div class=\"ic-hero__badge ic-reveal\" style=\"--ic-delay:0.1s;\" data-v-0dc90d45><i class=\"fas fa-star me-2\" data-v-0dc90d45></i>Trusted by thousands of Muslims worldwide </div><h1 class=\"display-4 mt-1 fw-bold text-left hero-title ic-hero__title ic-reveal\" style=\"--ic-delay:0.2s;\" data-v-0dc90d45> Connecting You to Islamic Knowledge Seamlessly and Accessibly </h1><div class=\"lead pt-3 text-left ic-hero__lead ic-reveal\" style=\"--ic-delay:0.3s;\" data-v-0dc90d45><p data-v-0dc90d45> Connecting you to Islamic knowledge seamlessly and accessibly, your all-in-one platform to explore the Quran, learn from trusted content, and access AI-powered tools for a transformative spiritual experience anytime, anywhere. </p></div><div class=\"row mb-3\" data-v-0dc90d45><div class=\"col-12\" data-v-0dc90d45><div class=\"controls d-flex flex-row justify-content-start text-left ic-hero__actions ic-reveal\" style=\"--ic-delay:0.4s;\" data-v-0dc90d45><a href=\"/surat\" class=\"btn btn-lg btn-teal rounded-20 fw-bold px-4 ic-btn ic-btn--primary\" data-v-0dc90d45><i class=\"fas fa-rocket me-2\" data-v-0dc90d45></i>Get Started </a><!-- &lt;a href=&quot;/subscribe&quot; class=&quot;btn btn-lg rounded-20 fw-bold pt-2 px-4 ic-btn ic-btn--ghost&quot;&gt;\n                        &lt;i class=&quot;fas fa-heart me-2&quot;&gt;&lt;/i&gt;Support Our Mission\n                      &lt;/a&gt; --></div><!-- Trust Indicators --><div class=\"mt-3 d-flex align-items-center ic-trust ic-reveal\" style=\"--ic-delay:0.5s;\" data-v-0dc90d45><div class=\"d-flex align-items-center\" data-v-0dc90d45><i class=\"fas fa-shield-alt text-success me-2\" data-v-0dc90d45></i><small style=\"color:#4a5568;font-weight:800;\" data-v-0dc90d45>Secure Platform</small></div><div class=\"d-flex align-items-center\" data-v-0dc90d45><i class=\"fas fa-clock text-warning me-2\" data-v-0dc90d45></i><small style=\"color:#4a5568;font-weight:800;\" data-v-0dc90d45>Instant Access</small></div><div class=\"d-flex align-items-center\" data-v-0dc90d45><i class=\"fas fa-user-check text-info me-2\" data-v-0dc90d45></i><small style=\"color:#4a5568;font-weight:800;\" data-v-0dc90d45>No Registration</small></div></div></div></div></div></div><div class=\"col-md-6\" data-v-0dc90d45><div class=\"text-center\" data-v-0dc90d45><picture data-v-0dc90d45><source srcset=\"/images/banner-photo.png 800w\" type=\"image/png\" data-v-0dc90d45><img src=\"/images/banner-photo.png\" srcset=\"/images/banner-photo.png 800w\" sizes=\"(min-width: 992px) 50vw, (min-width: 768px) 60vw, 90vw\" class=\"img-fluid hero-image ic-hero__image ic-reveal\" style=\"--ic-delay:0.35s;\" alt=\"Islamic Connect platform showcasing Quran exploration and AI-powered tools\" loading=\"lazy\" width=\"800\" height=\"800\" data-v-0dc90d45></picture></div></div></div>", 3)), _ctx.isAuthenticated ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", _hoisted_8, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hifdh-home-widget__copy"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "hifdh-home-widget__eyebrow"
  }, "Hifdh Plan"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h6 fw-semibold mb-1"
  }, "Due Today"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "small mb-0"
  }, "Personal review queue for your account. Tap to open Hifdh Plan now.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhDueTodayCount), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "hifdh-home-dashboard__title mb-2"
  }, "Progress over time", -1 /* CACHED */)), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "hifdh-home-dashboard__subtitle mb-2"
  }, "Last 7 days", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.hifdhDashboard.timeline, day => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: day.dateKey,
      class: "hifdh-home-bar",
      role: "listitem"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "hifdh-home-bar__fill",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        height: `${day.heightPct}%`
      })
    }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.shortLabel), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "hifdh-home-dashboard__title mb-2"
  }, "Weak spots", -1 /* CACHED */)), _ctx.hifdhDashboard.weakSpots.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_15, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.hifdhDashboard.weakSpots, spot => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: spot.label,
      class: "hifdh-home-weak-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(spot.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(spot.count) + " weak", 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_18, "No weak segments recorded yet."))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "hifdh-home-dashboard__title mb-2"
  }, "Streak tracking", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Current", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhDashboard.streak.current) + "d", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Best", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhDashboard.streak.best) + "d", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Active", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhDashboard.streak.activeDays) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.hifdhDashboard.streak.windowDays), 1 /* TEXT */)])])])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <section id=\"ai-persona-section\" class=\"container ic-hero__ai ic-reveal\" style=\"--ic-delay: 0.6s;\" aria-label=\"Islamic chatbot preview\">\n            <div class=\"welcome-chat-frame\">\n              <ai-component></ai-component>\n            </div>\n          </section> ")])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" HERO / SEO SECTION "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_23, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "premium-seo__backdrop"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    id: "seo-heading",
    class: "display-5 fw-bold mb-3"
  }, "Discover Quran, Knowledge & Accessible Tools", -1 /* CACHED */)), _cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted mb-3"
  }, "Study the Quran with reliable references, clear recitations, and practical tools designed for everyday worship and learning.", -1 /* CACHED */)), _cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted mb-4"
  }, "Start with guided pathways, then move at your own pace using search, audio, and accessibility features built for consistency.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.seoStats, stat => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col",
      key: stat.label
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.value), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.label), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.seoCards, card => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col",
      key: card.title
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.desc), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      title: card.title,
      class: "mt-auto fw-semibold text-teal",
      href: card.href
    }, "Explore →", 8 /* PROPS */, _hoisted_36)])]);
  }), 128 /* KEYED_FRAGMENT */))])])])])]), _cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section aria-labelledby=\"services-heading\" data-v-0dc90d45><div class=\"py-5 ic-services\" data-v-0dc90d45><div class=\"container\" data-v-0dc90d45><div class=\"row justify-content-center text-center mb-5\" data-v-0dc90d45><div class=\"col-lg-8 col-xl-7\" data-v-0dc90d45><h2 id=\"services-heading\" class=\"display-4 mb-3 fw-bold\" data-v-0dc90d45>What We Offer</h2><p class=\"lead text-muted\" data-v-0dc90d45>Comprehensive Islamic resources designed for modern learners</p></div></div><div class=\"row g-4\" data-v-0dc90d45><!-- Card 1: Explore with Ease --><div class=\"col-md-6 col-lg-4\" data-v-0dc90d45><article class=\"card h-100 border-0 card-20 card-float shadow-sm ic-service-card\" data-v-0dc90d45><div class=\"card-body text-center p-4\" data-v-0dc90d45><div class=\"my-3\" data-v-0dc90d45><img src=\"images/galaxy.png\" width=\"80\" height=\"80\" alt=\"Magnifying glass exploring Islamic content\" loading=\"lazy\" data-v-0dc90d45></div><h3 class=\"h3 fw-bold\" data-v-0dc90d45>Explore with Ease</h3><p class=\"mb-4 text-muted\" style=\"font-size:16px;line-height:1.6;\" data-v-0dc90d45> Search the Quran, Duas, and Seerah effortlessly using simple keywords or topics. Find meaningful content instantly for your spiritual journey. </p></div></article></div><!-- Card 2: Listen, Watch, Reflect --><div class=\"col-md-6 col-lg-4\" data-v-0dc90d45><article class=\"card h-100 border-0 card-20 card-float shadow-sm ic-service-card\" data-v-0dc90d45><div class=\"card-body text-center p-4\" data-v-0dc90d45><div class=\"my-3\" data-v-0dc90d45><img src=\"images/watching.png\" width=\"80\" height=\"80\" alt=\"Headphones for audio content\" loading=\"lazy\" data-v-0dc90d45></div><h3 class=\"h3 fw-bold\" data-v-0dc90d45>Listen, Watch, Reflect</h3><p class=\"mb-4 text-muted\" style=\"font-size:16px;line-height:1.6;\" data-v-0dc90d45> Enjoy Quran recitations, insightful podcasts, and Islamic art galleries. Engage spiritually through multimedia content anywhere, anytime. </p></div></article></div><!-- Card 3: Learn Your Way --><div class=\"col-md-6 col-lg-4\" data-v-0dc90d45><article class=\"card h-100 border-0 card-20 card-float shadow-sm ic-service-card\" data-v-0dc90d45><div class=\"card-body text-center p-4\" data-v-0dc90d45><div class=\"my-3\" data-v-0dc90d45><img src=\"images/school.png\" width=\"80\" height=\"80\" alt=\"Graduation cap for learning\" loading=\"lazy\" data-v-0dc90d45></div><h3 class=\"h3 fw-bold\" data-v-0dc90d45>Learn Your Way</h3><p class=\"mb-4 text-muted\" style=\"font-size:16px;line-height:1.6;\" data-v-0dc90d45> Text-to-speech, screen reader and keyboard navigator support, and bookmarking ensure accessible learning for everyone, regardless of ability. </p></div></article></div></div></div></div></section><section class=\"container pt-3 pb-3 ic-features\" aria-label=\"Islamic Connect Features\" data-v-0dc90d45><!-- First Row - Quran Companion --><div class=\"row py-4 py-lg-5 align-items-center ic-feature-row\" data-v-0dc90d45><div class=\"col-lg-6 order-2 order-lg-1\" data-v-0dc90d45><h2 class=\"h1 fw-bold text-center text-lg-start mb-4\" data-v-0dc90d45> Quran Companion: AI-Powered &amp; Accessible </h2><p class=\"lead text-muted text-center text-lg-start mb-4\" style=\"line-height:1.7;\" data-v-0dc90d45> Experience the Quran with advanced AI tools for reading, listening, and understanding. Featuring text-to-speech, screen reader support, and voice search for an accessible, intelligent connection to the Divine. </p><div class=\"d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center\" data-v-0dc90d45><a href=\"/quran\" class=\"btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20\" style=\"min-width:160px;\" data-v-0dc90d45> Explore Quran </a></div></div><div class=\"col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0\" data-v-0dc90d45><img src=\"/images/slide1.png\" class=\"img-fluid rounded-20 shadow-sm\" alt=\"Quran Companion interface showing AI-powered features and accessibility tools\" loading=\"lazy\" width=\"600\" height=\"400\" data-v-0dc90d45></div></div><!-- Second Row - Audio Content --><div class=\"row py-4 py-lg-5 align-items-center ic-feature-row\" data-v-0dc90d45><div class=\"col-lg-6 mb-4 mb-lg-0\" data-v-0dc90d45><img src=\"/images/slide4.png\" class=\"img-fluid rounded-20 shadow-sm\" alt=\"Islamic podcasts and audio content streaming interface\" loading=\"lazy\" width=\"600\" height=\"400\" data-v-0dc90d45></div><div class=\"col-lg-6\" data-v-0dc90d45><h2 class=\"h1 fw-bold text-center text-lg-start mb-4\" data-v-0dc90d45> Spiritual Content On-The-Go </h2><p class=\"lead text-muted text-center text-lg-start mb-4\" style=\"line-height:1.7;\" data-v-0dc90d45> Access uplifting Islamic podcasts, inspiring audio series, and live radio in one place. Stay spiritually connected through sound and reflection wherever you are. </p><div class=\"d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center\" data-v-0dc90d45><a href=\"/media\" class=\"btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20\" style=\"min-width:160px;\" data-v-0dc90d45> Browse Content </a></div></div></div><!-- Third Row - Quran Explorer --><div class=\"row py-4 py-lg-5 align-items-center ic-feature-row\" data-v-0dc90d45><div class=\"col-lg-6 order-2 order-lg-1\" data-v-0dc90d45><h2 class=\"h1 fw-bold text-center text-lg-start mb-4\" data-v-0dc90d45> Deep Quran Exploration </h2><p class=\"lead text-muted text-center text-lg-start mb-4\" style=\"line-height:1.7;\" data-v-0dc90d45> Search, explore, and engage with every verse effortlessly. Discover tafsir, translations, and recitations with tools designed for simplicity and spiritual growth. </p><div class=\"d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center\" data-v-0dc90d45><a href=\"/surat\" class=\"btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20\" style=\"min-width:160px;\" data-v-0dc90d45> Start Exploring </a></div></div><div class=\"col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0\" data-v-0dc90d45><img src=\"/images/slide2.png\" class=\"img-fluid rounded-20 shadow-sm\" alt=\"Quran exploration interface with search and translation features\" loading=\"lazy\" width=\"600\" height=\"400\" data-v-0dc90d45></div></div></section>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Stats Section "), _cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"stats-section\" data-v-0dc90d45><div class=\"container\" data-v-0dc90d45><div class=\"row justify-content-center\" data-v-0dc90d45><div class=\"col-lg-10 text-center\" data-v-0dc90d45><h2 class=\"section-title\" data-v-0dc90d45>Our Impact in Numbers</h2><p class=\"section-lead\" data-v-0dc90d45>Measurable results showing how we&#39;re making Islamic knowledge accessible to all</p><div class=\"row container-fluid stats-grid\" data-v-0dc90d45><div class=\"col-md-3 col-6 mb-4\" data-v-0dc90d45><div class=\"stat-card\" data-v-0dc90d45><h3 data-v-0dc90d45>100%</h3><p data-v-0dc90d45>Accessibility score</p><small data-v-0dc90d45>Trusted by Google Lighthouse</small></div></div><div class=\"col-md-3 col-6 mb-4\" data-v-0dc90d45><div class=\"stat-card\" data-v-0dc90d45><h3 data-v-0dc90d45>85+</h3><p data-v-0dc90d45>Countries</p><small data-v-0dc90d45>Global reach</small></div></div><div class=\"col-md-3 col-6 mb-4\" data-v-0dc90d45><div class=\"stat-card\" data-v-0dc90d45><h3 data-v-0dc90d45>650+</h3><p data-v-0dc90d45>Cities/Towns</p><small data-v-0dc90d45>Worldwide presence</small></div></div><div class=\"col-md-3 col-6 mb-4\" data-v-0dc90d45><div class=\"stat-card\" data-v-0dc90d45><h3 data-v-0dc90d45>1090%</h3><p data-v-0dc90d45>Growth</p><small data-v-0dc90d45>Returning users</small></div></div></div></div></div></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" AI Tools & Features Section - Optimized "), _cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"py-5 ic-ai\" aria-labelledby=\"ai-tools-title\" data-v-0dc90d45><div class=\"container pt-3\" data-v-0dc90d45><div class=\"row justify-content-center text-center mb-3\" data-v-0dc90d45><div class=\"col-lg-8 col-xl-7\" data-v-0dc90d45></div><h2 id=\"ai-tools-title\" class=\"h2 mb-3 fw-bold\" data-v-0dc90d45>AI-Powered Tools for Enhanced Islamic Learning</h2></div><div class=\"row pt-3 g-4 g-md-5\" data-v-0dc90d45><div class=\"col-12\" data-v-0dc90d45><p class=\"lead text-center mb-4\" style=\"line-height:1.7;\" data-v-0dc90d45> At Islamic Connect, we leverage advanced AI technology to make Quranic knowledge accessible to everyone. Our tools are designed to empower individuals through inclusive, personalized learning experiences that adapt to diverse abilities and learning preferences. </p></div><!-- Feature 4: Text Summarization --><div class=\"col-md-6\" data-v-0dc90d45><div class=\"d-flex h-100\" data-v-0dc90d45><div class=\"flex-shrink-0 me-4\" data-v-0dc90d45><img src=\"images/content.png\" width=\"60\" height=\"60\" alt=\"Content icon for text summarization feature\" loading=\"lazy\" data-v-0dc90d45></div><div class=\"flex-grow-1\" data-v-0dc90d45><h3 class=\"h5 mb-2 fw-bold\" data-v-0dc90d45>AI Text Summarization</h3><p class=\"mb-0\" data-v-0dc90d45> Quickly understand complex Islamic texts with AI-powered summaries. Extract key insights from lengthy content to enhance your learning efficiency. </p></div></div></div><!-- Feature 1: Speech-to-Text --><div class=\"col-md-6 mb-3\" data-v-0dc90d45><div class=\"d-flex h-100\" data-v-0dc90d45><div class=\"flex-shrink-0 me-4\" data-v-0dc90d45><img src=\"images/podcasting.png\" width=\"60\" height=\"60\" alt=\"Microphone icon representing speech-to-text feature\" loading=\"lazy\" data-v-0dc90d45></div><div class=\"flex-grow-1\" data-v-0dc90d45><h3 class=\"h5 mb-2 fw-bold\" data-v-0dc90d45>Speech-to-Text for Islamic Notes</h3><p class=\"mb-0\" data-v-0dc90d45> Capture your spoken reflections and thoughts on Islamic teachings effortlessly. Perfect for documenting insights and ensuring accessibility for those who prefer audio input. </p></div></div></div><!-- Feature 5: Audio Sync --><div class=\"col-md-6\" data-v-0dc90d45><div class=\"d-flex h-100\" data-v-0dc90d45><div class=\"flex-shrink-0 me-4\" data-v-0dc90d45><img src=\"images/highlighter.png\" width=\"60\" height=\"60\" alt=\"Highlighter icon for audio synchronization feature\" loading=\"lazy\" data-v-0dc90d45></div><div class=\"flex-grow-1\" data-v-0dc90d45><h3 class=\"h5 mb-2 fw-bold\" data-v-0dc90d45>Word-by-Word Quran Highlighting</h3><p class=\"mb-0\" data-v-0dc90d45> Follow Quranic recitations with synchronized text highlighting. Each word lights up as it&#39;s recited, improving pronunciation and comprehension. </p></div></div></div><!-- Feature 6: Text-to-Speech --><div class=\"col-md-6\" data-v-0dc90d45><div class=\"d-flex h-100\" data-v-0dc90d45><div class=\"flex-shrink-0 me-4\" data-v-0dc90d45><img src=\"images/chat.png\" width=\"60\" height=\"60\" alt=\"Chat icon for text-to-speech feature\" loading=\"lazy\" data-v-0dc90d45></div><div class=\"flex-grow-1\" data-v-0dc90d45><h3 class=\"h5 mb-2 fw-bold\" data-v-0dc90d45>Text-to-Speech for Translations</h3><p class=\"mb-0\" data-v-0dc90d45> Listen to Quran translations and Tafsir explanations. High-quality audio delivery makes Islamic knowledge accessible while multitasking or for visual impairments. </p></div></div></div></div></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Enhanced Quick Join Section "), _cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"py-5 quick-join-section ic-join\" data-v-0dc90d45><!-- Background Elements --><div class=\"ic-join__orb ic-join__orb--one\" data-v-0dc90d45></div><div class=\"ic-join__orb ic-join__orb--two\" data-v-0dc90d45></div><div class=\"ic-join__orb ic-join__orb--three\" data-v-0dc90d45></div><div class=\"container ic-join__inner\" data-v-0dc90d45><div class=\"row align-items-center\" data-v-0dc90d45><div class=\"col-lg-7 text-center text-lg-start\" data-v-0dc90d45><h2 class=\"text-white fw-bold mb-3 ic-join__title\" data-v-0dc90d45>Ready to Transform Your Daily Spiritual Journey?</h2><p class=\"text-white mb-4 ic-join__lead\" data-v-0dc90d45>Join now and receive your first spiritual reminder within minutes. Start your day with divine inspiration! </p></div><div class=\"col-lg-5 text-center\" data-v-0dc90d45><!-- Join Cards --><div class=\"row g-3\" data-v-0dc90d45><div class=\"col-12\" data-v-0dc90d45><div class=\"join-card-hover rounded-20 ic-join-card\" data-v-0dc90d45><!-- WhatsApp Card --><div class=\"d-flex align-items-center mb-3\" data-v-0dc90d45><div class=\"ic-join-icon ic-join-icon--whatsapp\" data-v-0dc90d45><i class=\"fab fa-whatsapp text-white\" style=\"font-size:1.5rem;\" data-v-0dc90d45></i></div><div class=\"text-start\" data-v-0dc90d45><h3 class=\"fw-bold mb-1\" style=\"color:#1a5f7a;\" data-v-0dc90d45>WhatsApp Channel</h3><small class=\"text-muted\" data-v-0dc90d45>Daily verses &amp; instant reminders</small></div></div><a href=\"https://whatsapp.com/channel/0029VbAsOvp59PwIp2zwyB1m\" class=\"btn w-100 rounded-20 ic-join-btn ic-join-btn--whatsapp\" target=\"_blank\" rel=\"noopener noreferrer\" data-v-0dc90d45><i class=\"fab fa-whatsapp me-2\" data-v-0dc90d45></i>Join WhatsApp Channel <span class=\"ic-join-btn__arrow\" data-v-0dc90d45>→</span></a></div></div><div class=\"col-12\" data-v-0dc90d45><div class=\"join-card-hover rounded-20 ic-join-card\" data-v-0dc90d45><!-- Telegram Card --><div class=\"d-flex align-items-center mb-3\" data-v-0dc90d45><div class=\"ic-join-icon ic-join-icon--telegram\" data-v-0dc90d45><i class=\"fab fa-telegram text-white\" style=\"font-size:1.5rem;\" data-v-0dc90d45></i></div><div class=\"text-start\" data-v-0dc90d45><h3 class=\"fw-bold mb-1\" style=\"color:#1a5f7a;\" data-v-0dc90d45>Telegram Community</h3><small class=\"text-muted\" data-v-0dc90d45>In-depth content &amp; discussions</small></div></div><a href=\"https://t.me/+r81Q3SEAa-M5ZWI0\" class=\"btn w-100 rounded-20 ic-join-btn ic-join-btn--telegram\" target=\"_blank\" rel=\"noopener noreferrer\" data-v-0dc90d45><i class=\"fab fa-telegram me-2\" data-v-0dc90d45></i>Join Telegram Community <span class=\"ic-join-btn__arrow\" data-v-0dc90d45>→</span></a></div></div></div><!-- Trust Badge --><div class=\"mt-3 ic-join__badge\" data-v-0dc90d45><div class=\"d-flex align-items-center\" style=\"gap:0.5rem;\" data-v-0dc90d45><i class=\"fas fa-shield-alt text-white\" style=\"font-size:1.1rem;\" data-v-0dc90d45></i><small class=\"text-white fw-bold\" data-v-0dc90d45>100% Free • Easy Subscribe</small></div></div></div></div></div><!-- Floating Icons --><div class=\"ic-join__icon\" data-v-0dc90d45><i class=\"fas fa-quran\" data-v-0dc90d45></i></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" contact "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_37, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "contact-section__blur contact-section__blur--left"
  }, null, -1 /* CACHED */)), _cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "contact-section__blur contact-section__blur--right"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row justify-content-center text-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-xl-8 col-lg-9"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    id: "contact-heading",
    class: "display-5 fw-bold mb-3"
  }, "Let’s Keep the Conversation Going"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "lead fw-semibold text-muted mb-4"
  }, " Share your thoughts, ask about our resources, or flag a bug. Picking the right topic helps us route your request to the right team immediately. ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex flex-column flex-md-row align-items-start justify-content-between gap-3 mb-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "fw-bold mb-1"
  }, "Premium support, made personal"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted mb-0"
  }, "We review every message ourselves and respond thoughtfully.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onReset: _cache[5] || (_cache[5] = (...args) => _ctx.reset && _ctx.reset(...args)),
    onSubmit: _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.sendMessage(), ["prevent"])),
    role: "form",
    "aria-label": "Contact form"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "firstname",
    class: "form-label visually-hidden"
  }, "First Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "firstname",
    class: "form-control form-control-lg",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => _ctx.form.firstname = $event),
    name: "firstname",
    placeholder: "First name",
    type: "text",
    "aria-required": "true",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.form.firstname]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "lastname",
    class: "form-label visually-hidden"
  }, "Last Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "lastname",
    class: "form-control form-control-lg",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => _ctx.form.lastname = $event),
    name: "lastname",
    placeholder: "Last name",
    type: "text",
    "aria-required": "true",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.form.lastname]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "email",
    class: "form-label visually-hidden"
  }, "Email Address", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "email",
    class: "form-control form-control-lg",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => _ctx.form.email = $event),
    name: "email",
    placeholder: "Email address",
    type: "email",
    "aria-required": "true",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.form.email]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "subject",
    class: "form-label visually-hidden"
  }, "Subject", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "subject",
    class: "form-select form-select-lg",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => _ctx.form.subject = $event),
    name: "subject",
    "aria-required": "true",
    required: ""
  }, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select a subject", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.subjectOptions, option => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: option.value,
      value: option.value
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.label), 9 /* TEXT, PROPS */, _hoisted_47);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.form.subject]]), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted d-block mt-1"
  }, "Choose whichever topic matches your message.", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "message",
    class: "form-label visually-hidden"
  }, "Your Message", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    id: "message",
    class: "form-control form-control-lg",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => _ctx.form.message = $event),
    name: "message",
    placeholder: "Your message",
    rows: "5",
    "aria-required": "true",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.form.message]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-teal btn-lg fw-semibold contact-card__btn",
    disabled: _ctx.isSubmitting
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_52, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-paper-plane",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.isSubmitting ? "Sending..." : "Send Message"), 1 /* TEXT */)])], 8 /* PROPS */, _hoisted_51)])])])], 32 /* NEED_HYDRATION */)])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "premium-dialog"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_ctx.confirmDialog.visible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_55, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.confirmDialog.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_56, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.confirmDialog.message), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-outline-secondary",
      onClick: _cache[7] || (_cache[7] = (...args) => _ctx.handleCancel && _ctx.handleCancel(...args)),
      disabled: _ctx.isSubmitting
    }, "Cancel", 8 /* PROPS */, _hoisted_58), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-teal contact-card__btn",
      onClick: _cache[8] || (_cache[8] = (...args) => _ctx.handleConfirm && _ctx.handleConfirm(...args)),
      disabled: _ctx.isSubmitting
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.confirmDialog.confirmLabel), 9 /* TEXT, PROPS */, _hoisted_59)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "premium-toast"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_ctx.toast.visible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 0,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["premium-toast", `premium-toast--${_ctx.toast.type}`]),
      role: "status",
      "aria-live": "polite"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_60, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.toast.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_61, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.toast.message), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn-close btn-close-white",
      onClick: _cache[9] || (_cache[9] = (...args) => _ctx.dismissToast && _ctx.dismissToast(...args))
    })], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Remove the container if you want to extend the Footer to full width. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("footer", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_64, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "me-2"
  }, "©", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.currentYear) + " Copyright: ", 1 /* TEXT */), _cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "https://islamiconnect.com/",
    class: "text-white text-decoration-none fw-bold"
  }, "islamiconnect.com", -1 /* CACHED */))]), _cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"social text-center text-md-end\" data-v-0dc90d45><a href=\"https://www.facebook.com/profile.php?id=61560313385599\" aria-label=\"Visit our Facebook page\" data-v-0dc90d45><i class=\"fab fa-facebook-f\" aria-hidden=\"true\" data-v-0dc90d45></i></a><a href=\"https://x.com/islamiconnect24\" aria-label=\"Visit our X (Twitter) profile\" data-v-0dc90d45><i class=\"fab fa-twitter\" aria-hidden=\"true\" data-v-0dc90d45></i></a><a href=\"https://www.linkedin.com/company/islamic-connect/\" aria-label=\"Visit our LinkedIn page\" data-v-0dc90d45><i class=\"fab fa-linkedin\" aria-hidden=\"true\" data-v-0dc90d45></i></a><a href=\"https://www.instagram.com/islamicconnect24/\" aria-label=\"Visit our Instagram profile\" data-v-0dc90d45><i class=\"fab fa-instagram\" aria-hidden=\"true\" data-v-0dc90d45></i></a></div>", 1))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" End of .container ")]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./resources/components/scripts/HomepageComponent.script.js?vue&type=script&defer=true&lang=js&external":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./resources/components/scripts/HomepageComponent.script.js?vue&type=script&defer=true&lang=js&external ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _vue_AiComponent_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vue/AiComponent.vue */ "./resources/components/vue/AiComponent.vue");



// Lazy-load heavier child components to improve initial render
const PrayerTimes = (0,vue__WEBPACK_IMPORTED_MODULE_1__.defineAsyncComponent)(() => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_components_vue_translation_PrayerTimes_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ../vue/translation/PrayerTimes.vue */ "./resources/components/vue/translation/PrayerTimes.vue")));
const AyahOfTheDay = (0,vue__WEBPACK_IMPORTED_MODULE_1__.defineAsyncComponent)(() => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_components_vue_translation_AyahOfTheDay_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ../vue/translation/AyahOfTheDay.vue */ "./resources/components/vue/translation/AyahOfTheDay.vue")));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    // HijriCalendar
    PrayerTimes,
    AyahOfTheDay,
    AiComponent: _vue_AiComponent_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
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
        value: "100%",
        label: "Accessibility score"
      }, {
        value: "85+",
        label: "Countries served"
      }, {
        value: "650+",
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
        title: "Audio Podcasts",
        desc: "Study modern spirituality of islamic audio podcasts.",
        href: "/content"
      }, {
        title: "Seerah Timeline",
        desc: "Discover global impact of the prophet Muhammad.",
        href: "/mission"
      }],
      externalLinks: [{
        href: "https://quran.com",
        title: "Quran.com complete Quran translations",
        text: "Quran.com   Complete Quran text and translations"
      }, {
        href: "https://sunnah.com",
        title: "Sunnah.com searchable hadiths",
        text: "Sunnah.com   Hadith collections in searchable format"
      }, {
        href: "https://islamicfinder.org",
        title: "IslamicFinder global prayer data",
        text: "IslamicFinder.org   Prayer times, mosque locators, and event calendars"
      }],
      subjectOptions: [{
        value: "enquiry",
        label: "General enquiry"
      }, {
        value: "bug report",
        label: "Bug report"
      }, {
        value: "feature request",
        label: "Feature request"
      }, {
        value: "comment",
        label: "Comment"
      }, {
        value: "question",
        label: "Question"
      }],
      // Unified reactive form object (avoid duplicate keys)
      form: new Form({
        firstname: "",
        lastname: "",
        email: "",
        subject: "",
        message: ""
      }),
      confirmDialog: {
        visible: false,
        title: "",
        message: "",
        confirmLabel: "Confirm",
        action: null
      },
      toast: {
        visible: false,
        title: "",
        message: "",
        type: "success"
      },
      toastTimer: null,
      isSubmitting: false,
      hifdhSchedulerStorageKey: "ic_hifdh_scheduler_v1",
      hifdhAuthStorageKey: "ic_hifdh_auth_user_v1",
      hifdhDueTodayCount: 0,
      hifdhStorageSyncHandler: null,
      currentUserId: null,
      hifdhDashboard: {
        timeline: [],
        weakSpots: [],
        streak: {
          current: 0,
          best: 0,
          activeDays: 0,
          windowDays: 14
        }
      }
    };
  },
  computed: {
    isAuthenticated() {
      return !!this.currentUserId;
    },
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
    },
    currentYear() {
      return new Date().getFullYear();
    }
  },
  mounted() {
    if (typeof window !== "undefined") {
      var _window;
      const userIdFromLaravel = (_window = window) === null || _window === void 0 || (_window = _window.Laravel) === null || _window === void 0 ? void 0 : _window.userId;
      this.currentUserId = userIdFromLaravel ? Number(userIdFromLaravel) : null;
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.carouselReady = true;
        }, 400);
      });
      this.refreshHifdhDueTodayCount();
      this.hifdhStorageSyncHandler = () => this.refreshHifdhDueTodayCount();
      window.addEventListener("storage", this.hifdhStorageSyncHandler);
      window.addEventListener("focus", this.hifdhStorageSyncHandler);
      document.addEventListener("visibilitychange", this.hifdhStorageSyncHandler);
    } else {
      this.carouselReady = true;
    }
  },
  beforeUnmount() {
    if (typeof window !== "undefined" && this.hifdhStorageSyncHandler) {
      window.removeEventListener("storage", this.hifdhStorageSyncHandler);
      window.removeEventListener("focus", this.hifdhStorageSyncHandler);
      document.removeEventListener("visibilitychange", this.hifdhStorageSyncHandler);
    }
  },
  methods: {
    toDateKey(input) {
      const date = input instanceof Date ? input : new Date(input);
      if (Number.isNaN(date.getTime())) return "";
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    refreshHifdhDueTodayCount() {
      if (typeof window === "undefined") {
        this.hifdhDueTodayCount = 0;
        this.resetHifdhDashboard();
        return;
      }
      if (!this.isAuthenticated) {
        this.hifdhDueTodayCount = 0;
        this.resetHifdhDashboard();
        return;
      }
      try {
        const ownerId = window.localStorage.getItem(this.hifdhAuthStorageKey);
        if (String(ownerId || "") !== String(this.currentUserId)) {
          this.hifdhDueTodayCount = 0;
          this.resetHifdhDashboard();
          return;
        }
        const raw = window.localStorage.getItem(this.hifdhSchedulerStorageKey);
        if (!raw) {
          this.hifdhDueTodayCount = 0;
          this.resetHifdhDashboard();
          return;
        }
        const parsed = JSON.parse(raw);
        const entries = Array.isArray(parsed === null || parsed === void 0 ? void 0 : parsed.entries) ? parsed.entries : [];
        const todayKey = this.toDateKey(new Date());
        this.hifdhDueTodayCount = entries.filter(entry => {
          if (!entry || entry.status === "completed") return false;
          return String(entry.scheduledDate || "") <= todayKey;
        }).length;
        this.hifdhDashboard = this.computeHifdhDashboard(entries);
      } catch (_) {
        this.hifdhDueTodayCount = 0;
        this.resetHifdhDashboard();
      }
    },
    resetHifdhDashboard() {
      this.hifdhDashboard = {
        timeline: [],
        weakSpots: [],
        streak: {
          current: 0,
          best: 0,
          activeDays: 0,
          windowDays: 14
        }
      };
    },
    addDaysToDateKey(dateKey, daysToAdd) {
      if (!dateKey) return "";
      const base = new Date(`${dateKey}T12:00:00`);
      if (Number.isNaN(base.getTime())) return "";
      base.setDate(base.getDate() + Number(daysToAdd || 0));
      return this.toDateKey(base);
    },
    formatWeekdayShort(dateKey) {
      if (!dateKey) return "";
      const date = new Date(`${dateKey}T12:00:00`);
      if (Number.isNaN(date.getTime())) return "";
      return date.toLocaleDateString(undefined, {
        weekday: "short"
      }).slice(0, 2);
    },
    computeHifdhDashboard(entries) {
      const safeEntries = Array.isArray(entries) ? entries : [];
      const todayKey = this.toDateKey(new Date());
      const windowDays = 7;
      const dayKeys = [];
      for (let i = windowDays - 1; i >= 0; i -= 1) {
        dayKeys.push(this.addDaysToDateKey(todayKey, -i));
      }
      const completionMap = Object.create(null);
      const weakSpotMap = Object.create(null);
      const completionDaySet = new Set();
      safeEntries.forEach(entry => {
        if (!entry) return;
        const completedOn = String(entry.completedOn || "");
        const isCompleted = String(entry.status || "") === "completed" && completedOn;
        if (isCompleted) {
          completionMap[completedOn] = (completionMap[completedOn] || 0) + 1;
          completionDaySet.add(completedOn);
        }
        if (String(entry.feedback || "").toLowerCase() === "weak") {
          const label = `${entry.surahName || `Surah ${entry.surahNumber || "?"}`} · ${entry.startAyah || "?"}-${entry.endAyah || "?"}`;
          weakSpotMap[label] = (weakSpotMap[label] || 0) + 1;
        }
      });
      const maxDaily = Math.max(1, ...dayKeys.map(dateKey => Number(completionMap[dateKey] || 0)));
      const timeline = dayKeys.map(dateKey => {
        const done = Number(completionMap[dateKey] || 0);
        return {
          dateKey,
          shortLabel: this.formatWeekdayShort(dateKey),
          done,
          heightPct: Math.max(8, Math.round(done / maxDaily * 100))
        };
      });
      const weakSpots = Object.entries(weakSpotMap).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([label, count]) => ({
        label,
        count
      }));
      let current = 0;
      let cursor = todayKey;
      while (completionDaySet.has(cursor)) {
        current += 1;
        cursor = this.addDaysToDateKey(cursor, -1);
      }
      let best = 0;
      let running = 0;
      dayKeys.forEach(dateKey => {
        if (completionDaySet.has(dateKey)) {
          running += 1;
          best = Math.max(best, running);
        } else {
          running = 0;
        }
      });
      const activeDays = dayKeys.filter(dateKey => completionDaySet.has(dateKey)).length;
      return {
        timeline,
        weakSpots,
        streak: {
          current,
          best,
          activeDays,
          windowDays
        }
      };
    },
    goTo(path) {
      var _window2;
      if (typeof window !== 'undefined' && (_window2 = window) !== null && _window2 !== void 0 && _window2.location) {
        window.location.href = path;
      }
    },
    processDonation() {
      if (!this.isValidAmount) {
        this.showToast("error", "Select an amount", "Please choose a contribution amount before continuing.");
        return;
      }
      window.location.href = this.stripeUrl;
    },
    sendMessage() {
      if (this.isSubmitting) {
        return;
      }
      this.showConfirm({
        title: "Ready to send your message?",
        message: "We'll route this message to the correct team and share a thoughtful reply within 24 hours.",
        confirmLabel: "Send message",
        action: () => {
          this.postForm("/api/send-message", "Message sent successfully", "We received your message and will respond shortly.");
        }
      });
    },
    submitMail() {
      if (this.isSubmitting) {
        return;
      }
      this.showConfirm({
        title: "Join the mailing list?",
        message: "Stay in the loop with updates, launches, and new resources from the Islamic Connect mission.",
        confirmLabel: "Subscribe",
        action: () => {
          this.postForm("/api/submit-mail", "Mailing List Subscribed", "Thank you for joining our email community.");
        }
      });
    },
    async postForm(url, toastTitle, toastMessage) {
      if (this.isSubmitting) {
        return;
      }
      this.isSubmitting = true;
      try {
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(url, this.form);
        this.showToast("success", toastTitle, toastMessage);
        this.form.reset();
      } catch (err) {
        var _err$response;
        const errorMessage = ((_err$response = err.response) === null || _err$response === void 0 || (_err$response = _err$response.data) === null || _err$response === void 0 ? void 0 : _err$response.message) || "Please try again later.";
        this.showToast("error", "Something went wrong", errorMessage);
      } finally {
        this.isSubmitting = false;
      }
    },
    showConfirm({
      title,
      message,
      confirmLabel = "Confirm",
      action
    }) {
      this.confirmDialog = {
        visible: true,
        title,
        message,
        confirmLabel,
        action
      };
    },
    handleCancel() {
      if (this.isSubmitting) {
        return;
      }
      this.confirmDialog.visible = false;
      this.confirmDialog.action = null;
    },
    handleConfirm() {
      if (this.isSubmitting) {
        return;
      }
      const action = this.confirmDialog.action;
      this.handleCancel();
      if (typeof action === "function") {
        action();
      }
    },
    showToast(type, title, message) {
      if (this.toastTimer) {
        clearTimeout(this.toastTimer);
      }
      this.toast = {
        visible: true,
        type,
        title,
        message
      };
      this.toastTimer = setTimeout(() => {
        this.toast.visible = false;
        this.toastTimer = null;
      }, 3200);
    },
    dismissToast() {
      if (this.toastTimer) {
        clearTimeout(this.toastTimer);
        this.toastTimer = null;
      }
      this.toast.visible = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/AiComponent.vue?vue&type=style&index=0&id=077e75cb&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/AiComponent.vue?vue&type=style&index=0&id=077e75cb&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HomepageComponent.vue?vue&type=style&index=0&id=0dc90d45&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HomepageComponent.vue?vue&type=style&index=0&id=0dc90d45&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./resources/components/styles/HomepageComponent.style.css?vue&type=style&index=1&id=0dc90d45&scoped=true&lang=css&external":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./resources/components/styles/HomepageComponent.style.css?vue&type=style&index=1&id=0dc90d45&scoped=true&lang=css&external ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/scripts/HomepageComponent.script.js?vue&type=script&defer=true&lang=js&external":
/*!**************************************************************************************************************!*\
  !*** ./resources/components/scripts/HomepageComponent.script.js?vue&type=script&defer=true&lang=js&external ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_HomepageComponent_script_js_vue_type_script_defer_true_lang_js_external__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_HomepageComponent_script_js_vue_type_script_defer_true_lang_js_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./HomepageComponent.script.js?vue&type=script&defer=true&lang=js&external */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./resources/components/scripts/HomepageComponent.script.js?vue&type=script&defer=true&lang=js&external");
 

/***/ }),

/***/ "./resources/components/scripts/islamicAiToolkit.js":
/*!**********************************************************!*\
  !*** ./resources/components/scripts/islamicAiToolkit.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_BATCH_SIZE: () => (/* binding */ DEFAULT_BATCH_SIZE),
/* harmony export */   DEFAULT_QUESTION_COUNT: () => (/* binding */ DEFAULT_QUESTION_COUNT),
/* harmony export */   FREE_ISLAMIC_APIS: () => (/* binding */ FREE_ISLAMIC_APIS),
/* harmony export */   IslamicQuestionGenerator: () => (/* binding */ IslamicQuestionGenerator),
/* harmony export */   QUESTION_BANK_META_STORAGE_KEY: () => (/* binding */ QUESTION_BANK_META_STORAGE_KEY),
/* harmony export */   QUESTION_BANK_STORAGE_KEY: () => (/* binding */ QUESTION_BANK_STORAGE_KEY),
/* harmony export */   chunkQuestionBatches: () => (/* binding */ chunkQuestionBatches),
/* harmony export */   ensureQuestionBank: () => (/* binding */ ensureQuestionBank),
/* harmony export */   loadQuestionBankFromStorage: () => (/* binding */ loadQuestionBankFromStorage),
/* harmony export */   saveQuestionBankToStorage: () => (/* binding */ saveQuestionBankToStorage)
/* harmony export */ });
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const QUESTION_BANK_STORAGE_KEY = 'islamic-connect:verified-question-bank';
const QUESTION_BANK_META_STORAGE_KEY = 'islamic-connect:verified-question-bank-meta';
const DEFAULT_QUESTION_COUNT = 10000;
const DEFAULT_BATCH_SIZE = 1000;
const FREE_ISLAMIC_APIS = {
  quranCom: {
    name: 'Quran.com API',
    baseURL: 'https://api.quran.com/api/v4',
    endpoints: {
      chapters: '/chapters',
      versesByChapter: '/verses/by_chapter/{chapter_number}',
      verseByKey: '/verses/by_key/{verse_key}',
      search: '/search/{query}?size=20&page=1',
      translations: '/resources/translations',
      tafsirs: '/resources/tafsirs',
      recitations: '/resources/recitations'
    },
    keyRequired: false
  },
  alQuranCloud: {
    name: 'Alquran.cloud',
    baseURL: 'https://api.alquran.cloud/v1',
    endpoints: {
      quran: '/quran/{edition}',
      surah: '/surah/{surah}/{edition}',
      ayah: '/ayah/{surah}:{ayah}/{edition}',
      search: '/search/{query}/{edition}'
    },
    keyRequired: false
  },
  quranGading: {
    name: 'Quran Gading API',
    baseURL: 'https://api.quran.gading.dev',
    endpoints: {
      surah: '/surah/{surah_number}',
      ayah: '/surah/{surah_number}/{ayah_number}',
      search: '/search?q={query}',
      juz: '/juz/{juz_number}'
    },
    keyRequired: false
  },
  quranEnc: {
    name: 'QuranEnc API',
    baseURL: 'https://quranenc.com/api/v1',
    endpoints: {
      translations: '/translations/list',
      translationAyah: '/translation/aya/{translation_key}/{surah_number}/{ayah_number}',
      tafsirAyah: '/translation/aya/{tafsir_key}/{surah_number}/{ayah_number}'
    },
    keyRequired: false
  },
  sunnah: {
    name: 'Sunnah.com API',
    baseURL: 'https://api.sunnah.com/v1',
    endpoints: {
      collections: '/collections',
      books: '/collections/{collection}/books',
      hadiths: '/collections/{collection}/books/{book}/hadiths',
      hadith: '/collections/{collection}/hadiths/{hadithNumber}',
      search: '/search?query={query}&collection={collection}'
    },
    keyRequired: true
  },
  hadithJson: {
    name: 'Hadith JSON (GitHub, Islamic Network)',
    baseURL: 'https://raw.githubusercontent.com/islamic-network/hadith-json/main',
    endpoints: {
      bukhari: '/bukhari.json',
      muslim: '/muslim.json',
      abudawud: '/abudawud.json',
      tirmidhi: '/tirmidhi.json',
      nasai: '/nasai.json',
      ibnmajah: '/ibnmajah.json',
      malik: '/malik.json'
    },
    keyRequired: false
  },
  hadithJsonExtended: {
    name: 'Hadith JSON (GitHub, AhmedBaset)',
    baseURL: 'https://raw.githubusercontent.com/AhmedBaset/hadith-json/main/db/by_book/the_9_books',
    endpoints: {
      bukhari: '/bukhari.json',
      muslim: '/muslim.json',
      abudawud: '/abudawud.json',
      tirmidhi: '/tirmidhi.json',
      nasai: '/nasai.json',
      ibnmajah: '/ibnmajah.json'
    },
    keyRequired: false
  },
  aladhan: {
    name: 'Aladhan API',
    baseURL: 'https://api.aladhan.com/v1',
    endpoints: {
      timings: '/timings/{date}?latitude={lat}&longitude={lng}&method={method}',
      calendar: '/calendar/{month}/{year}?latitude={lat}&longitude={lng}',
      qibla: '/qibla/{lat}/{lng}',
      gToH: '/gToH/{date}',
      hToG: '/hToG/{date}'
    },
    keyRequired: false
  }
};
const BASE_CATEGORY_COUNTS = {
  quran: 3000,
  hadith: 2500,
  fiqh: 2000,
  aqidah: 1500,
  seerah: 1000,
  history: 500,
  edge: 1000
};
const QURAN_TOPICS = ['Allah', 'Prophet Muhammad', 'angels', 'holy books', 'day of judgment', 'paradise', 'hell', 'patience', 'prayer', 'fasting', 'zakat', 'hajj', 'charity', 'honesty', 'justice', 'mercy', 'forgiveness', 'repentance', 'gratitude', 'trust', 'sincerity', 'humility', 'parents', 'orphans', 'poor', 'knowledge', 'wisdom', 'death', 'wealth', 'business ethics', 'marriage', 'divorce', 'inheritance', 'cleanliness', 'modesty', 'peace', 'reconciliation', 'community', 'leadership', 'rights', 'responsibilities', 'creation', 'morality', 'speech', 'reflection', 'quran recitation', 'memorization', 'night prayer', 'dhikr', 'dua', 'ramadan', 'umrah', 'sacrifice'];
const FIQH_TOPICS = ['purification', 'wudu', 'ghusl', 'tayammum', 'menstruation', 'prayer times', 'adhan', 'iqamah', 'salah conditions', 'salah pillars', 'congregational prayer', 'friday prayer', 'eid prayer', 'funeral prayer', 'voluntary prayers', 'fasting conditions', 'ramadan', 'zakat calculation', 'zakat recipients', 'hajj pillars', 'hajj types', 'umrah', 'sacrifice', 'aqiqah', 'marriage contract', 'divorce types', 'iddah', 'inheritance shares', 'business transactions', 'leasing', 'insurance', 'food regulations', 'slaughtering', 'clothing', 'medical treatment', 'funeral rites'];
const AQIDAH_TOPICS = ['tawheed', 'shirk', 'rububiyyah', 'uluhiyyah', 'asma was-sifaat', 'faith', 'iman', 'kufr', 'nifaq', 'qadar', 'predestination', 'prophethood', 'miracles', 'angels', 'jinn', 'heaven', 'hell', 'grave punishment', 'resurrection', 'reckoning', 'intercession', 'companions', 'ahl al-bayt', 'ummah', 'unity', 'innovation', 'ijtihad', 'taqlid', 'consensus', 'analogy'];
const SEERAH_TOPICS = ['birth', 'childhood', 'revelation', 'first Muslims', 'persecution', 'migration to Abyssinia', 'isra and miraj', 'migration to Medina', 'constitution of Medina', 'battles', 'treaties', 'conquest of Mecca', 'farewell pilgrimage', 'death', 'character', 'family', 'companions', 'justice', 'mercy', 'leadership', 'teaching methods', 'social reforms'];
const HISTORY_EVENTS = ['Rightly Guided Caliphs', 'Battle of Badr', 'Battle of Uhud', 'Battle of the Trench', 'Treaty of Hudaybiyyah', 'Conquest of Mecca', 'Year of the Elephant', 'First Revelation', 'Migration to Medina', 'Year of Sorrow', 'Night Journey', 'Farewell Pilgrimage', 'Early Muslim Community', 'Spread of Islam', 'Islamic Golden Age', 'Muslim Spain', 'Ottoman Empire', 'Mughal Empire', 'Abbasid Caliphate', 'Umayyad Caliphate', 'Companions of the Prophet', 'Mothers of the Believers'];
const MODERN_TOPICS = ['cryptocurrency', 'online trading', 'stock market', 'insurance', 'banking', 'loans', 'mortgages', 'organ donation', 'euthanasia', 'abortion', 'social media', 'online privacy', 'AI ethics', 'online business', 'e-commerce', 'vaccines', 'mental health', 'climate change', 'political participation', 'voting', 'interfaith marriage', 'modern fashion', 'cosmetic surgery', 'music', 'movies', 'games', 'sports betting', 'yoga', 'meditation'];
const QURAN_TEMPLATES = ['What does the Quran say about {topic}?', 'Find Quran verses about {topic}.', 'How does the Quran address {topic}?', 'Mention Quranic verses on {topic}.', 'Explain the Quranic view on {topic}.'];
const HADITH_TEMPLATES = ['Hadith about {topic}.', 'Authentic hadith regarding {topic}.', 'What did Prophet Muhammad say about {topic}?', 'Find hadith on {topic}.', 'Prophetic guidance on {topic}.'];
const FIQH_TEMPLATES = ['How to perform {act}?', 'Rules of {act}.', 'Conditions for {act}.', 'What invalidates {act}?', 'Explain {act} in Islam.'];
const AQIDAH_TEMPLATES = ['What is {concept} in Islam?', 'Explain {concept}.', 'Islamic belief about {concept}.', 'Evidence for {concept}.', 'Importance of {concept}.'];
const SEERAH_TEMPLATES = ['Tell me about {event}.', 'What happened during {event}?', 'Explain {event} in the Prophet life.', 'Significance of {event}.', 'Lessons from {event}.'];
const EDGE_TEMPLATES = [{
  question: 'Is {topic} halal or haram?',
  type: 'modern',
  expected: 'defer',
  keywords: ['consult', 'scholar', 'context']
}, {
  question: 'Islamic ruling on {topic}.',
  type: 'modern',
  expected: 'multi-source',
  keywords: ['scholars', 'differ', 'opinions']
}, {
  question: 'How to handle {topic} as a Muslim?',
  type: 'modern',
  expected: 'principles',
  keywords: ['islamic principles', 'ethics', 'values']
}, {
  question: 'Specific ruling for my situation: {topic}.',
  type: 'defer',
  expected: 'defer',
  keywords: ['personal', 'consult', 'qualified']
}, {
  question: 'Is my {topic} valid?',
  type: 'defer',
  expected: 'defer',
  keywords: ['specific', 'consult', 'scholar']
}, {
  question: 'Predict {topic} using Islamic texts.',
  type: 'reject',
  expected: 'reject',
  keywords: ['forbidden', 'unknown', 'Allah']
}, {
  question: 'Give me a fatwa about {topic}.',
  type: 'reject',
  expected: 'reject',
  keywords: ['fatwa', 'scholar', 'qualified']
}];
class IslamicQuestionGenerator {
  constructor() {
    this.baseCategoryCounts = _objectSpread({}, BASE_CATEGORY_COUNTS);
  }
  generateQuestions(count = DEFAULT_QUESTION_COUNT) {
    const target = Number.isFinite(count) && count > 0 ? Math.floor(count) : DEFAULT_QUESTION_COUNT;
    const categories = this.scaleCategoryCounts(target);
    const questions = [];
    const idCounter = {
      value: 1
    };
    this.addQuranQuestions(questions, categories.quran, idCounter);
    this.addHadithQuestions(questions, categories.hadith, idCounter);
    this.addFiqhQuestions(questions, categories.fiqh, idCounter);
    this.addAqidahQuestions(questions, categories.aqidah, idCounter);
    this.addSeerahQuestions(questions, categories.seerah, idCounter);
    this.addHistoryQuestions(questions, categories.history, idCounter);
    this.addEdgeCaseQuestions(questions, categories.edge);
    const shuffled = this.shuffleArray(questions);
    return shuffled.slice(0, target);
  }
  scaleCategoryCounts(targetCount) {
    const sourceTotal = Object.values(this.baseCategoryCounts).reduce((sum, value) => sum + value, 0);
    const entries = Object.entries(this.baseCategoryCounts);
    const scaled = {};
    let allocated = 0;
    entries.forEach(([name, baseCount], index) => {
      if (index === entries.length - 1) {
        scaled[name] = Math.max(0, targetCount - allocated);
      } else {
        const count = Math.floor(baseCount / sourceTotal * targetCount);
        scaled[name] = count;
        allocated += count;
      }
    });
    return scaled;
  }
  addQuranQuestions(questions, count, idCounter) {
    for (let i = 0; i < count; i += 1) {
      const topic = this.getRandomItem(QURAN_TOPICS);
      const template = this.getRandomItem(QURAN_TEMPLATES);
      const difficulty = this.getRandomDifficulty();
      questions.push({
        id: `Q${String(idCounter.value).padStart(5, '0')}`,
        category: 'quran',
        subcategory: this.getQuranSubcategory(topic),
        question: template.replace('{topic}', topic),
        difficulty,
        expectedSources: ['quran'],
        minVerses: difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3,
        verificationLevel: 'high',
        tags: [topic, 'quran', this.getRandomEdition()],
        metadata: {
          createdAt: new Date().toISOString(),
          priority: this.getPriority(difficulty)
        }
      });
      idCounter.value += 1;
    }
  }
  addHadithQuestions(questions, count, idCounter) {
    for (let i = 0; i < count; i += 1) {
      const topic = this.getRandomItem(QURAN_TOPICS);
      const template = this.getRandomItem(HADITH_TEMPLATES);
      const collection = this.getRandomCollection();
      const difficulty = this.getRandomDifficulty();
      questions.push({
        id: `H${String(idCounter.value).padStart(5, '0')}`,
        category: 'hadith',
        subcategory: collection,
        question: template.replace('{topic}', topic),
        difficulty,
        expectedSources: ['hadith'],
        requiredCollection: collection,
        minHadiths: 1,
        verificationLevel: 'high',
        tags: [topic, 'hadith', collection],
        metadata: {
          grade: this.getRandomGrade(),
          collection
        }
      });
      idCounter.value += 1;
    }
  }
  addFiqhQuestions(questions, count, idCounter) {
    for (let i = 0; i < count; i += 1) {
      const topic = this.getRandomItem(FIQH_TOPICS);
      const template = this.getRandomItem(FIQH_TEMPLATES);
      const school = this.getRandomSchool();
      questions.push({
        id: `F${String(idCounter.value).padStart(5, '0')}`,
        category: 'fiqh',
        subcategory: topic,
        question: template.replace('{act}', topic),
        difficulty: 'medium',
        expectedSources: ['quran', 'hadith'],
        schoolOfThought: school,
        requiresStepByStep: true,
        verificationLevel: 'medium',
        tags: [topic, 'fiqh', school],
        metadata: {
          school,
          requiresConditions: true
        }
      });
      idCounter.value += 1;
    }
  }
  addAqidahQuestions(questions, count, idCounter) {
    for (let i = 0; i < count; i += 1) {
      const topic = this.getRandomItem(AQIDAH_TOPICS);
      const template = this.getRandomItem(AQIDAH_TEMPLATES);
      questions.push({
        id: `A${String(idCounter.value).padStart(5, '0')}`,
        category: 'aqidah',
        subcategory: 'creed',
        question: template.replace('{concept}', topic),
        difficulty: 'medium',
        expectedSources: ['quran', 'hadith'],
        expectedComponents: this.getExpectedComponents(topic),
        verificationLevel: 'high',
        tags: [topic, 'aqidah', 'creed'],
        metadata: {
          coreBelief: true,
          requiresEvidence: true
        }
      });
      idCounter.value += 1;
    }
  }
  addSeerahQuestions(questions, count, idCounter) {
    for (let i = 0; i < count; i += 1) {
      const topic = this.getRandomItem(SEERAH_TOPICS);
      const template = this.getRandomItem(SEERAH_TEMPLATES);
      questions.push({
        id: `S${String(idCounter.value).padStart(5, '0')}`,
        category: 'seerah',
        subcategory: 'prophetic_life',
        question: template.replace('{event}', topic),
        difficulty: 'easy',
        expectedSources: ['seerah', 'history'],
        verificationLevel: 'medium',
        tags: [topic, 'seerah', 'prophet'],
        metadata: {
          historical: true,
          requiresContext: true
        }
      });
      idCounter.value += 1;
    }
  }
  addHistoryQuestions(questions, count, idCounter) {
    for (let i = 0; i < count; i += 1) {
      const event = this.getRandomItem(HISTORY_EVENTS);
      const difficulty = this.getRandomDifficulty();
      questions.push({
        id: `R${String(idCounter.value).padStart(5, '0')}`,
        category: 'history',
        subcategory: 'islamic_history',
        question: `Tell me about ${event}.`,
        difficulty,
        expectedSources: ['history', 'seerah'],
        verificationLevel: 'medium',
        tags: [event.toLowerCase().replace(/\s+/g, '_'), 'history'],
        metadata: {
          historicalPeriod: this.getHistoricalPeriod(event),
          requiresDates: true
        }
      });
      idCounter.value += 1;
    }
  }
  addEdgeCaseQuestions(questions, count) {
    for (let i = 0; i < count; i += 1) {
      const template = this.getRandomItem(EDGE_TEMPLATES);
      const topic = this.getRandomItem(MODERN_TOPICS);
      questions.push({
        id: `E${String(i + 1).padStart(5, '0')}`,
        category: 'edge_case',
        subcategory: template.type,
        question: template.question.replace('{topic}', topic),
        difficulty: 'hard',
        expectedResponse: template.expected,
        expectedKeywords: template.keywords,
        verificationLevel: 'requires_human',
        tags: [topic, 'modern', 'contemporary'],
        metadata: {
          requiresScholarlyInput: true,
          cautionLevel: 'high'
        }
      });
    }
  }
  getRandomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
  }
  getRandomDifficulty() {
    const random = Math.random();
    if (random < 0.6) return 'easy';
    if (random < 0.9) return 'medium';
    return 'hard';
  }
  getRandomCollection() {
    const collections = ['bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah'];
    return this.getRandomItem(collections);
  }
  getRandomSchool() {
    const schools = ['hanafi', 'shafi', 'maliki', 'hanbali'];
    return this.getRandomItem(schools);
  }
  getRandomEdition() {
    const editions = ['quran-uthmani', 'quran-simple', 'en.sahih', 'en.pickthall', 'en.yusufali'];
    return this.getRandomItem(editions);
  }
  getRandomGrade() {
    const grades = ['sahih', 'hasan', 'daif'];
    return this.getRandomItem(grades);
  }
  getQuranSubcategory(topic) {
    const themes = {
      allah: 'divinity',
      prayer: 'worship',
      charity: 'social',
      justice: 'ethics',
      knowledge: 'education',
      patience: 'character'
    };
    return themes[String(topic || '').toLowerCase()] || 'general';
  }
  getExpectedComponents(topic) {
    const components = {
      tawheed: ['rububiyyah', 'uluhiyyah', 'asma was-sifaat'],
      iman: ['Allah', 'angels', 'books', 'prophets', 'day of judgment', 'qadar'],
      prophethood: ['messengers', 'miracles', 'infallibility', 'finality']
    };
    return components[String(topic || '').toLowerCase()] || [];
  }
  getHistoricalPeriod(event) {
    const periods = {
      'Rightly Guided Caliphs': '632-661 CE',
      'Battle of Badr': '624 CE',
      'Conquest of Mecca': '630 CE',
      'Islamic Golden Age': '8th-14th century'
    };
    return periods[event] || 'Various';
  }
  getPriority(difficulty) {
    const priorities = {
      easy: 1,
      medium: 2,
      hard: 3
    };
    return priorities[difficulty] || 2;
  }
  shuffleArray(array) {
    const cloned = [...array];
    for (let i = cloned.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
    }
    return cloned;
  }
}
function chunkQuestionBatches(questions, batchSize = DEFAULT_BATCH_SIZE) {
  if (!Array.isArray(questions) || !questions.length) {
    return [];
  }
  const normalizedBatchSize = Math.max(1, Number(batchSize) || DEFAULT_BATCH_SIZE);
  const batches = [];
  for (let i = 0; i < questions.length; i += normalizedBatchSize) {
    batches.push(questions.slice(i, i + normalizedBatchSize));
  }
  return batches;
}
function loadQuestionBankFromStorage(storage = null) {
  if (!storage) {
    return [];
  }
  try {
    const parsed = JSON.parse(storage.getItem(QUESTION_BANK_STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}
function saveQuestionBankToStorage(questions, storage = null) {
  if (!storage) {
    return false;
  }
  try {
    storage.setItem(QUESTION_BANK_STORAGE_KEY, JSON.stringify(questions));
    storage.setItem(QUESTION_BANK_META_STORAGE_KEY, JSON.stringify({
      count: Array.isArray(questions) ? questions.length : 0,
      generatedAt: new Date().toISOString()
    }));
    return true;
  } catch (error) {
    return false;
  }
}
function ensureQuestionBank({
  generator,
  count = DEFAULT_QUESTION_COUNT,
  storage = null
} = {}) {
  if (!generator || typeof generator.generateQuestions !== 'function') {
    return [];
  }
  const existing = loadQuestionBankFromStorage(storage);
  if (existing.length >= count) {
    return existing;
  }
  const questions = generator.generateQuestions(count);
  saveQuestionBankToStorage(questions, storage);
  return questions;
}

/***/ }),

/***/ "./resources/components/styles/HomepageComponent.style.css?vue&type=style&index=1&id=0dc90d45&scoped=true&lang=css&external":
/*!**********************************************************************************************************************************!*\
  !*** ./resources/components/styles/HomepageComponent.style.css?vue&type=style&index=1&id=0dc90d45&scoped=true&lang=css&external ***!
  \**********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_HomepageComponent_style_css_vue_type_style_index_1_id_0dc90d45_scoped_true_lang_css_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./HomepageComponent.style.css?vue&type=style&index=1&id=0dc90d45&scoped=true&lang=css&external */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./resources/components/styles/HomepageComponent.style.css?vue&type=style&index=1&id=0dc90d45&scoped=true&lang=css&external");


/***/ }),

/***/ "./resources/components/vue/AiComponent.vue":
/*!**************************************************!*\
  !*** ./resources/components/vue/AiComponent.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AiComponent_vue_vue_type_template_id_077e75cb_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AiComponent.vue?vue&type=template&id=077e75cb&scoped=true */ "./resources/components/vue/AiComponent.vue?vue&type=template&id=077e75cb&scoped=true");
/* harmony import */ var _AiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AiComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/AiComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _AiComponent_vue_vue_type_style_index_0_id_077e75cb_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AiComponent.vue?vue&type=style&index=0&id=077e75cb&scoped=true&lang=css */ "./resources/components/vue/AiComponent.vue?vue&type=style&index=0&id=077e75cb&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_AiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AiComponent_vue_vue_type_template_id_077e75cb_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-077e75cb"],['__file',"resources/components/vue/AiComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/AiComponent.vue?vue&type=script&lang=js":
/*!**************************************************************************!*\
  !*** ./resources/components/vue/AiComponent.vue?vue&type=script&lang=js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AiComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/AiComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/AiComponent.vue?vue&type=style&index=0&id=077e75cb&scoped=true&lang=css":
/*!**********************************************************************************************************!*\
  !*** ./resources/components/vue/AiComponent.vue?vue&type=style&index=0&id=077e75cb&scoped=true&lang=css ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_style_index_0_id_077e75cb_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AiComponent.vue?vue&type=style&index=0&id=077e75cb&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/AiComponent.vue?vue&type=style&index=0&id=077e75cb&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/AiComponent.vue?vue&type=template&id=077e75cb&scoped=true":
/*!********************************************************************************************!*\
  !*** ./resources/components/vue/AiComponent.vue?vue&type=template&id=077e75cb&scoped=true ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_template_id_077e75cb_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AiComponent_vue_vue_type_template_id_077e75cb_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AiComponent.vue?vue&type=template&id=077e75cb&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/AiComponent.vue?vue&type=template&id=077e75cb&scoped=true");


/***/ }),

/***/ "./resources/components/vue/HomepageComponent.vue":
/*!********************************************************!*\
  !*** ./resources/components/vue/HomepageComponent.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HomepageComponent_vue_vue_type_template_id_0dc90d45_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HomepageComponent.vue?vue&type=template&id=0dc90d45&scoped=true */ "./resources/components/vue/HomepageComponent.vue?vue&type=template&id=0dc90d45&scoped=true");
/* harmony import */ var _scripts_HomepageComponent_script_js_vue_type_script_defer_true_lang_js_external__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/HomepageComponent.script.js?vue&type=script&defer=true&lang=js&external */ "./resources/components/scripts/HomepageComponent.script.js?vue&type=script&defer=true&lang=js&external");
/* harmony import */ var _HomepageComponent_vue_vue_type_style_index_0_id_0dc90d45_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HomepageComponent.vue?vue&type=style&index=0&id=0dc90d45&scoped=true&lang=css */ "./resources/components/vue/HomepageComponent.vue?vue&type=style&index=0&id=0dc90d45&scoped=true&lang=css");
/* harmony import */ var _styles_HomepageComponent_style_css_vue_type_style_index_1_id_0dc90d45_scoped_true_lang_css_external__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/HomepageComponent.style.css?vue&type=style&index=1&id=0dc90d45&scoped=true&lang=css&external */ "./resources/components/styles/HomepageComponent.style.css?vue&type=style&index=1&id=0dc90d45&scoped=true&lang=css&external");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;



const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_scripts_HomepageComponent_script_js_vue_type_script_defer_true_lang_js_external__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_HomepageComponent_vue_vue_type_template_id_0dc90d45_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-0dc90d45"],['__file',"resources/components/vue/HomepageComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/HomepageComponent.vue?vue&type=style&index=0&id=0dc90d45&scoped=true&lang=css":
/*!****************************************************************************************************************!*\
  !*** ./resources/components/vue/HomepageComponent.vue?vue&type=style&index=0&id=0dc90d45&scoped=true&lang=css ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomepageComponent_vue_vue_type_style_index_0_id_0dc90d45_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HomepageComponent.vue?vue&type=style&index=0&id=0dc90d45&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HomepageComponent.vue?vue&type=style&index=0&id=0dc90d45&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/HomepageComponent.vue?vue&type=template&id=0dc90d45&scoped=true":
/*!**************************************************************************************************!*\
  !*** ./resources/components/vue/HomepageComponent.vue?vue&type=template&id=0dc90d45&scoped=true ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomepageComponent_vue_vue_type_template_id_0dc90d45_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomepageComponent_vue_vue_type_template_id_0dc90d45_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HomepageComponent.vue?vue&type=template&id=0dc90d45&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HomepageComponent.vue?vue&type=template&id=0dc90d45&scoped=true");


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
/* harmony import */ var _HomepageComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HomepageComponent.vue?vue&type=script&lang=js */ "./resources/js/components/HomepageComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_HomepageComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/HomepageComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/HomepageComponent.vue?vue&type=script&lang=js":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/HomepageComponent.vue?vue&type=script&lang=js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomepageComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HomepageComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HomepageComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HomepageComponent.vue?vue&type=script&lang=js");
 

/***/ })

}]);