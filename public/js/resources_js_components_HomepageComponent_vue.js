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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const MOBILE_BREAKPOINT = 768;
const CHAT_HISTORY_STORAGE_KEY = 'islamic-connect-chat-sessions';
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
      sessionDropdownOpen: false
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
    createChatEntry(role, text, references = [], summaryBullets = null) {
      const now = new Date();
      const resolvedSummary = Array.isArray(summaryBullets) && summaryBullets.length && summaryBullets || this.extractSummaryBulletPoints(text);
      const allowCollapse = resolvedSummary.length && this.isLongMessage(text);
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
        this.chatError = 'Please ask something related to Islamic teachings or practice.';
        return;
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
        const summary = Array.isArray(assistantData.summary) ? assistantData.summary : [];
        this.chatHistory.push(this.createChatEntry('assistant', assistantData.message.trim(), references, summary));
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
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': this.getCsrfToken()
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const error = (data === null || data === void 0 ? void 0 : data.error) || 'Noor cannot respond right now.';
        throw new Error(error);
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
    persistSessionsStorage() {
      if (typeof window === 'undefined') {
        return;
      }
      try {
        window.localStorage.setItem(CHAT_HISTORY_STORAGE_KEY, JSON.stringify(this.chatSessions));
      } catch (error) {
        console.error('Unable to save chat sessions', error);
      }
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
          history: session.history.map(entry => _objectSpread({}, entry)),
          createdAt: session.createdAt || session.updatedAt || Date.now(),
          updatedAt: session.updatedAt || Date.now()
        })).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
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
      this.sessionDropdownOpen = !this.sessionDropdownOpen;
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
      var _session$history2, _session$history3;
      if (!session) {
        return '';
      }
      const timestamp = session.createdAt || session.updatedAt;
      const formatted = this.formatSessionTimestamp(timestamp);
      const messageCount = ((_session$history2 = session.history) === null || _session$history2 === void 0 ? void 0 : _session$history2.length) || 0;
      const lastEntry = (_session$history3 = session.history) === null || _session$history3 === void 0 ? void 0 : _session$history3[session.history.length - 1];
      const lastRole = (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.role) === 'assistant' ? 'Noor' : (lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.role) === 'user' ? 'You' : '';
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
          this.voiceStatus = 'Voice search activated   listening for your question.';
          this.clearVoiceAutoSubmitTimer();
          this.showVoiceAlert('Voice search activated   listening for your question.');
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
            this.voiceStatus = 'Listening   feel free to continue speaking.';
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
      this.voiceStatus = 'Captured your question   sending it shortly.';
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
      this.chatError = 'Session expired   refresh the page to continue.';
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
    if (this.voiceAlertTimeout) {
      clearTimeout(this.voiceAlertTimeout);
      this.voiceAlertTimeout = null;
    }
    this.stopSpeech();
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
const _hoisted_40 = ["innerHTML"];
const _hoisted_41 = {
  key: 0,
  class: "chat-entry-actions"
};
const _hoisted_42 = ["onClick"];
const _hoisted_43 = ["onClick"];
const _hoisted_44 = {
  class: "chat-voice-wrapper ms-2"
};
const _hoisted_45 = ["onClick", "aria-expanded"];
const _hoisted_46 = {
  key: 0,
  class: "chat-voice-controls",
  role: "group",
  "aria-label": "Speech controls",
  "aria-live": "polite"
};
const _hoisted_47 = ["onClick", "disabled"];
const _hoisted_48 = ["onClick", "disabled"];
const _hoisted_49 = ["onClick", "disabled"];
const _hoisted_50 = {
  class: "chat-voice-status",
  "aria-live": "polite"
};
const _hoisted_51 = {
  key: 1,
  class: "chat-summary"
};
const _hoisted_52 = {
  class: "chat-summary-title"
};
const _hoisted_53 = ["onClick"];
const _hoisted_54 = {
  key: 0
};
const _hoisted_55 = {
  key: 1
};
const _hoisted_56 = {
  key: 3,
  class: "chat-references-wrapper",
  "aria-label": "Sources that informed this answer"
};
const _hoisted_57 = {
  class: "chat-references",
  role: "list"
};
const _hoisted_58 = ["href"];
const _hoisted_59 = {
  key: 0,
  class: "chat-entry assistant chat-entry--typing",
  "aria-live": "polite"
};
const _hoisted_60 = ["disabled"];
const _hoisted_61 = {
  class: "ai-form-meta pt-2 text-muted"
};
const _hoisted_62 = {
  class: "ai-secondary-group"
};
const _hoisted_63 = ["disabled"];
const _hoisted_64 = {
  key: 0,
  class: "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
};
const _hoisted_65 = ["disabled", "aria-pressed"];
const _hoisted_66 = ["disabled"];
const _hoisted_67 = {
  key: 0,
  class: "ai-voice-status",
  role: "status",
  "aria-live": "polite"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"ai-welcome\" aria-live=\"polite\" data-v-077e75cb><div class=\"ai-welcome-icon\" aria-hidden=\"true\" data-v-077e75cb><i class=\"fas fa-star-and-crescent\" aria-hidden=\"true\" data-v-077e75cb></i></div><div class=\"ai-welcome-text pt-2\" data-v-077e75cb><h2 class=\"fw-bold\" data-v-077e75cb>Introducing Noor, Your AI Companion</h2><p class=\"container ai-welcome-copy\" data-v-077e75cb> Noor listens first, then gently responds with Quran rooted insight and prophetic kindness so every exchange feels like encouragement from a trusted companion. Ask for dua ideas, reminders, or reflections tuned to your day. </p></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
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
  }, [...(_cache[17] || (_cache[17] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-plus-circle",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" New chat ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_17)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-control-btn",
    disabled: !$data.chatHistory.length,
    onClick: _cache[2] || (_cache[2] = (...args) => $options.clearHistory && $options.clearHistory(...args))
  }, [...(_cache[18] || (_cache[18] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-trash-alt",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Clear history ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_18), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-control-btn ai-control-btn--whatsapp",
    disabled: !$data.chatHistory.length,
    onClick: _cache[3] || (_cache[3] = (...args) => $options.shareConversationOnWhatsApp && $options.shareConversationOnWhatsApp(...args))
  }, [...(_cache[19] || (_cache[19] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fab fa-whatsapp",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Share Full Convo ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_19), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-control-btn ai-control-btn--copy",
    disabled: !$data.chatHistory.length,
    onClick: _cache[4] || (_cache[4] = (...args) => $options.copyConversationToClipboard && $options.copyConversationToClipboard(...args))
  }, [...(_cache[20] || (_cache[20] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-copy",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Copy Full Convo ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_20), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-control-btn ai-session-inline__button",
    disabled: !$data.chatSessions.length,
    onClick: _cache[5] || (_cache[5] = (...args) => $options.toggleSessionDropdown && $options.toggleSessionDropdown(...args)),
    "aria-haspopup": "listbox",
    "aria-expanded": $data.sessionDropdownOpen ? 'true' : 'false'
  }, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-clipboard-list",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.chatSessions.length ? `Saved chats (${$data.chatSessions.length})` : 'No saved chats yet'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_21)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [$data.sessionDropdownOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, [$data.chatSessions.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "ai-session-inline__clear-all",
    onClick: _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.prepareClearAllSessions && $options.prepareClearAllSessions(...args), ["stop", "prevent"]))
  }, [...(_cache[22] || (_cache[22] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-trash-alt me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Remove all saved chats ", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.pendingClearAll ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_24, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
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
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatSessionLabel(session)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatSessionTimestamp(session.updatedAt)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      role: "button",
      class: "ai-session-inline__dropdown-remove",
      tabindex: "0",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.prepareDeleteSession(session.id), ["stop"]),
      onKeydown: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.prepareDeleteSession(session.id), ["stop", "prevent"]), ["enter"]),
      "aria-label": "Delete this saved chat"
    }, [...(_cache[24] || (_cache[24] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
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
  }, "Delete")])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), $data.copyNotice ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_29, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-check-circle me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.copyNotice), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.chatError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_30, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-exclamation-triangle ai-error-icon",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "ai-error-title text-left"
  }, "Need some redirection?", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.chatError), 1 /* TEXT */), $data.sessionExpired ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "ai-error-clear",
    onClick: _cache[11] || (_cache[11] = (...args) => $options.reloadPage && $options.reloadPage(...args))
  }, " Reload page ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.chatHistory.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [$data.chatLoading && !$data.chatHistory.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_34, [...(_cache[28] || (_cache[28] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
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
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.role === 'assistant' ? 'Assistant' : 'You'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.displayTime) + " · " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.displayDate), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['chat-bubble', entry.role, {
        'chat-bubble--collapsed': entry.role === 'assistant' && entry.collapsed
      }]),
      innerHTML: $options.formatChatText(entry.text)
    }, null, 10 /* CLASS, PROPS */, _hoisted_40), entry.role === 'assistant' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "chat-share-btn",
      onClick: $event => $options.shareEntryOnWhatsApp(entry),
      "aria-label": 'Share this answer via WhatsApp'
    }, [...(_cache[29] || (_cache[29] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fab fa-whatsapp",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "d-none d-md-inline ms-1"
    }, "Share answer", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_42), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "chat-copy-btn ms-2",
      onClick: $event => $options.copyEntryToClipboard(entry),
      "aria-label": 'Copy this answer'
    }, [...(_cache[30] || (_cache[30] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-copy",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "d-none d-md-inline ms-1"
    }, "Copy answer", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_43), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "chat-voice-trigger",
      onClick: $event => $options.toggleSpeechControls(entry),
      "aria-expanded": entry.speechControlsVisible ? 'true' : 'false'
    }, [...(_cache[31] || (_cache[31] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-volume-up",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "visually-hidden"
    }, "Read this answer aloud", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_45), entry.speechControlsVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "chat-voice-control-btn",
      onClick: $event => $options.playEntrySpeech(entry),
      disabled: entry.speechStatus === 'loading',
      "aria-label": "Play answer"
    }, [...(_cache[32] || (_cache[32] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-play",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_47), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "chat-voice-control-btn",
      onClick: $event => $options.pauseEntrySpeech(entry),
      disabled: entry.speechStatus !== 'playing',
      "aria-label": "Pause answer"
    }, [...(_cache[33] || (_cache[33] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-pause",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_48), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "chat-voice-control-btn",
      onClick: $event => $options.stopEntrySpeech(entry),
      disabled: entry.speechStatus === 'stopped',
      "aria-label": "Stop answer"
    }, [...(_cache[34] || (_cache[34] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-stop",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_49), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.speechStatus === 'loading' ? 'Preparing…' : entry.speechStatus), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), entry.collapsed && entry.summaryBullets.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_52, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.role === 'assistant' ? 'Quick summary' : 'Question snapshot'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(entry.summaryBullets, (bullet, bulletIndex) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: `summary-${idx}-${bulletIndex}`
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(bullet), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), entry.allowCollapse && $data.isCompactMode ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: 2,
      type: "button",
      class: "chat-collapse-toggle",
      onClick: $event => $options.toggleEntryCollapse(entry)
    }, [entry.collapsed ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_54, " Show full " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.role === 'assistant' ? 'response' : 'question'), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_55, " Collapse to " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.role === 'assistant' ? 'summary' : 'preview'), 1 /* TEXT */))], 8 /* PROPS */, _hoisted_53)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), entry.references && entry.references.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_56, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "chat-references-heading"
    }, "References", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_57, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(entry.references, (reference, refIndex) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: `ref-${idx}-${refIndex}-${reference.label}`
      }, [reference.url ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
        key: 0,
        href: reference.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reference.label), 9 /* TEXT, PROPS */, _hoisted_58)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        key: 1
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reference.label), 1 /* TEXT */)], 64 /* STABLE_FRAGMENT */))]);
    }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */)), $data.chatLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", _hoisted_59, [...(_cache[36] || (_cache[36] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
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
    onSubmit: _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.sendChatMessage && $options.sendChatMessage(...args), ["prevent"]))
  }, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "visually-hidden",
    for: "aiChatInput"
  }, "Ask the chatbot", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    id: "aiChatInput",
    ref: "aiChatInput",
    "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => $data.chatDraft = $event),
    class: "ai-textarea",
    rows: "2",
    placeholder: "Ask something that brings you closer to Allah...",
    disabled: $data.chatLoading
  }, null, 8 /* PROPS */, _hoisted_60), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.chatDraft]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "ai-submit",
    disabled: $data.chatLoading || !$data.chatDraft.trim()
  }, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-paper-plane",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), $data.chatLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_64)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.chatLoading ? 'Noor is Thinking...' : 'Ask Noor'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_63), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["ai-voice-btn text-center", {
      'ai-voice-btn--active': $data.voiceListening
    }]),
    disabled: $data.chatLoading,
    onClick: _cache[13] || (_cache[13] = (...args) => $options.toggleVoiceSearch && $options.toggleVoiceSearch(...args)),
    "aria-pressed": $data.voiceListening.toString()
  }, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-microphone",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.voiceListening ? 'Listening…' : 'Voice search'), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_65), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-clear-input",
    disabled: $data.chatLoading || !$data.chatDraft.trim(),
    onClick: _cache[14] || (_cache[14] = (...args) => $options.clearDraft && $options.clearDraft(...args))
  }, [...(_cache[39] || (_cache[39] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-eraser",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Clear input", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_66)])]), $data.voiceStatus ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_67, [_cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-microphone me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.voiceStatus), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
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
  class: "container-fluid premium-seo px-0 ic-seo",
  "aria-labelledby": "seo-heading"
};
const _hoisted_3 = {
  class: "container position-relative"
};
const _hoisted_4 = {
  class: "row gy-4 align-items-center"
};
const _hoisted_5 = {
  class: "col-lg-6 text-center text-lg-start"
};
const _hoisted_6 = {
  class: "row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3"
};
const _hoisted_7 = {
  class: "p-4 premium-stat h-100 text-center"
};
const _hoisted_8 = {
  class: "h3 fw-bold mb-1"
};
const _hoisted_9 = {
  class: "text-muted"
};
const _hoisted_10 = {
  class: "col-lg-6"
};
const _hoisted_11 = {
  class: "row row-cols-1 row-cols-md-2 g-3"
};
const _hoisted_12 = {
  class: "premium-card h-100 d-flex flex-column"
};
const _hoisted_13 = {
  class: "h6 fw-semibold mb-2"
};
const _hoisted_14 = {
  class: "small text-muted mb-3"
};
const _hoisted_15 = ["title", "href"];
const _hoisted_16 = {
  class: "py-5 contact-section position-relative",
  "aria-labelledby": "contact-heading"
};
const _hoisted_17 = {
  class: "container px-lg-4"
};
const _hoisted_18 = {
  class: "row justify-content-center mt-4"
};
const _hoisted_19 = {
  class: "col-xl-10"
};
const _hoisted_20 = {
  class: "contact-card shadow-lg rounded-4"
};
const _hoisted_21 = {
  class: "row g-3"
};
const _hoisted_22 = {
  class: "col-md-6"
};
const _hoisted_23 = {
  class: "col-md-6"
};
const _hoisted_24 = {
  class: "col-md-6"
};
const _hoisted_25 = {
  class: "col-md-6"
};
const _hoisted_26 = ["value"];
const _hoisted_27 = {
  class: "col-12"
};
const _hoisted_28 = {
  key: 0,
  class: "premium-dialog-overlay"
};
const _hoisted_29 = {
  class: "premium-dialog-card"
};
const _hoisted_30 = {
  class: "premium-dialog-title"
};
const _hoisted_31 = {
  class: "premium-dialog-message"
};
const _hoisted_32 = {
  class: "d-flex align-items-center justify-content-end gap-2 mt-3"
};
const _hoisted_33 = {
  class: "mb-0 fw-bold"
};
const _hoisted_34 = {
  class: "text-muted"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" header "), _cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"jumbotron ic-hero\" data-v-0dc90d45><!-- Content --><div class=\"container-fluid\" style=\"position:relative;\" data-v-0dc90d45><!-- Enhanced Hero Section --><div class=\"container-fluid hero-wrapper text-center ic-hero__frame\" data-v-0dc90d45><!-- Background Elements --><div class=\"ic-hero__orb ic-hero__orb--primary\" data-v-0dc90d45></div><div class=\"ic-hero__orb ic-hero__orb--secondary\" data-v-0dc90d45></div><div class=\"row align-items-center ic-hero__grid\" data-v-0dc90d45><div class=\"col-md-6\" data-v-0dc90d45><div class=\"text-left\" data-v-0dc90d45><!-- Badge --><div class=\"ic-hero__badge ic-reveal\" style=\"--ic-delay:0.1s;\" data-v-0dc90d45><i class=\"fas fa-star me-2\" data-v-0dc90d45></i>Trusted by 1000&#39;s of Muslims Worldwide </div><h1 class=\"display-4 mt-1 fw-bold text-left hero-title ic-hero__title ic-reveal\" style=\"--ic-delay:0.2s;\" data-v-0dc90d45> Connecting You to Islamic Knowledge Seamlessly and Accessibly </h1><div class=\"lead pt-3 text-left ic-hero__lead ic-reveal\" style=\"--ic-delay:0.3s;\" data-v-0dc90d45><p data-v-0dc90d45> Connecting you to Islamic knowledge seamlessly and accessibly, your all-in-one platform to explore the Quran, learn from trusted content, and access AI-powered tools for a transformative spiritual experience anytime, anywhere. </p></div><div class=\"row mb-3\" data-v-0dc90d45><div class=\"col-12\" data-v-0dc90d45><div class=\"controls d-flex flex-row justify-content-start text-left ic-hero__actions ic-reveal\" style=\"--ic-delay:0.4s;\" data-v-0dc90d45><a href=\"/surat\" class=\"btn btn-lg btn-teal rounded-20 fw-bold px-4 ic-btn ic-btn--primary\" data-v-0dc90d45><i class=\"fas fa-rocket me-2\" data-v-0dc90d45></i>Get Started </a><!-- &lt;a href=&quot;/subscribe&quot; class=&quot;btn btn-lg rounded-20 fw-bold pt-2 px-4 ic-btn ic-btn--ghost&quot;&gt;\n                        &lt;i class=&quot;fas fa-heart me-2&quot;&gt;&lt;/i&gt;Support Our Mission\n                      &lt;/a&gt; --></div><!-- Trust Indicators --><div class=\"mt-3 d-flex align-items-center ic-trust ic-reveal\" style=\"--ic-delay:0.5s;\" data-v-0dc90d45><div class=\"d-flex align-items-center\" data-v-0dc90d45><i class=\"fas fa-shield-alt text-success me-2\" data-v-0dc90d45></i><small style=\"color:#4a5568;font-weight:800;\" data-v-0dc90d45>Secure Platform</small></div><div class=\"d-flex align-items-center\" data-v-0dc90d45><i class=\"fas fa-clock text-warning me-2\" data-v-0dc90d45></i><small style=\"color:#4a5568;font-weight:800;\" data-v-0dc90d45>Instant Access</small></div><div class=\"d-flex align-items-center\" data-v-0dc90d45><i class=\"fas fa-user-check text-info me-2\" data-v-0dc90d45></i><small style=\"color:#4a5568;font-weight:800;\" data-v-0dc90d45>No Registration</small></div></div></div></div></div></div><div class=\"col-md-6\" data-v-0dc90d45><div class=\"text-center\" data-v-0dc90d45><picture data-v-0dc90d45><source srcset=\"/images/banner-photo.png 800w\" type=\"image/png\" data-v-0dc90d45><img src=\"/images/banner-photo.png\" srcset=\"/images/banner-photo.png 800w\" sizes=\"(min-width: 992px) 50vw, (min-width: 768px) 60vw, 90vw\" class=\"img-fluid hero-image ic-hero__image ic-reveal\" style=\"--ic-delay:0.35s;\" alt=\"Islamic Connect platform showcasing Quran exploration and AI-powered tools\" loading=\"lazy\" width=\"800\" height=\"800\" data-v-0dc90d45></picture></div></div></div><!-- &lt;section id=&quot;ai-persona-section&quot; class=&quot;container-fluid ic-hero__ai ic-reveal&quot; style=&quot;--ic-delay: 0.6s;&quot; aria-label=&quot;Islamic chatbot preview&quot;&gt;\n            &lt;div class=&quot;welcome-chat-frame&quot;&gt;\n              &lt;ai-component&gt;&lt;/ai-component&gt;\n            &lt;/div&gt;\n          &lt;/section&gt; --></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <section aria-labelledby=\"prayer-times-heading\">\n      <div class=\"container-fluid\">\n        <div class=\"row justify-content-center\">\n          <div class=\"col-12\">\n            -- SEO Optimized Heading --\n            <h2 id=\"prayer-times-heading\" class=\"text-center mb-4\" style=\"color: black; font-weight: 800;\">\n              Today's Prayer Times\n            </h2>\n\n            -- Performance & Accessibility Enhanced Component --\n            <PrayerTimes class=\"mb-3 prayer-times-enhanced\" :lazy-load=\"true\" :reduce-motion=\"true\" aria-live=\"polite\"\n              aria-atomic=\"true\" />\n\n          </div>\n        </div>\n      </div>\n    </section> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" HERO / SEO SECTION "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_2, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "premium-seo__backdrop"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    id: "seo-heading",
    class: "display-5 fw-bold mb-3"
  }, "Discover Quran, Knowledge & Accessible Tools", -1 /* CACHED */)), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted mb-3"
  }, "A premium hero-inspired narrative that balances on-brand gradients with clean typography. These headings and stats reiterate the title keywords before Vue hydrates the rest of the experience.", -1 /* CACHED */)), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted mb-4"
  }, "Explore curated pathways with subtle motion, modern gradients, and polished visuals each insight is crafted to feel alive, centered, and spiritually uplifting.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.seoStats, stat => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col",
      key: stat.label
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.value), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stat.label), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.seoCards, card => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col",
      key: card.title
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.desc), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      title: card.title,
      class: "mt-auto fw-semibold text-teal",
      href: card.href
    }, "Explore →", 8 /* PROPS */, _hoisted_15)])]);
  }), 128 /* KEYED_FRAGMENT */))])])])])]), _cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section aria-labelledby=\"services-heading\" data-v-0dc90d45><div class=\"py-5 ic-services\" data-v-0dc90d45><div class=\"container\" data-v-0dc90d45><div class=\"row justify-content-center text-center mb-5\" data-v-0dc90d45><div class=\"col-lg-8 col-xl-7\" data-v-0dc90d45><h2 id=\"services-heading\" class=\"display-4 mb-3 fw-bold\" data-v-0dc90d45>What We Offer</h2><p class=\"lead text-muted\" data-v-0dc90d45>Comprehensive Islamic resources designed for modern learners</p></div></div><div class=\"row g-4\" data-v-0dc90d45><!-- Card 1: Explore with Ease --><div class=\"col-md-6 col-lg-4\" data-v-0dc90d45><article class=\"card h-100 border-0 card-20 card-float shadow-sm ic-service-card\" data-v-0dc90d45><div class=\"card-body text-center p-4\" data-v-0dc90d45><div class=\"my-3\" data-v-0dc90d45><img src=\"images/galaxy.png\" width=\"80\" height=\"80\" alt=\"Magnifying glass exploring Islamic content\" loading=\"lazy\" data-v-0dc90d45></div><h3 class=\"h3 fw-bold\" data-v-0dc90d45>Explore with Ease</h3><p class=\"mb-4 text-muted\" style=\"font-size:16px;line-height:1.6;\" data-v-0dc90d45> Search the Quran, Duas, and Seerah effortlessly using simple keywords or topics. Find meaningful content instantly for your spiritual journey. </p></div></article></div><!-- Card 2: Listen, Watch, Reflect --><div class=\"col-md-6 col-lg-4\" data-v-0dc90d45><article class=\"card h-100 border-0 card-20 card-float shadow-sm ic-service-card\" data-v-0dc90d45><div class=\"card-body text-center p-4\" data-v-0dc90d45><div class=\"my-3\" data-v-0dc90d45><img src=\"images/watching.png\" width=\"80\" height=\"80\" alt=\"Headphones for audio content\" loading=\"lazy\" data-v-0dc90d45></div><h3 class=\"h3 fw-bold\" data-v-0dc90d45>Listen, Watch, Reflect</h3><p class=\"mb-4 text-muted\" style=\"font-size:16px;line-height:1.6;\" data-v-0dc90d45> Enjoy Quran recitations, insightful podcasts, and Islamic art galleries. Engage spiritually through multimedia content anywhere, anytime. </p></div></article></div><!-- Card 3: Learn Your Way --><div class=\"col-md-6 col-lg-4\" data-v-0dc90d45><article class=\"card h-100 border-0 card-20 card-float shadow-sm ic-service-card\" data-v-0dc90d45><div class=\"card-body text-center p-4\" data-v-0dc90d45><div class=\"my-3\" data-v-0dc90d45><img src=\"images/school.png\" width=\"80\" height=\"80\" alt=\"Graduation cap for learning\" loading=\"lazy\" data-v-0dc90d45></div><h3 class=\"h3 fw-bold\" data-v-0dc90d45>Learn Your Way</h3><p class=\"mb-4 text-muted\" style=\"font-size:16px;line-height:1.6;\" data-v-0dc90d45> Text-to-speech, screen reader and keybord navigator support, and bookmarking ensure accessible learning for everyone, regardless of ability. </p></div></article></div></div></div></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <section class=\"container journeys-section text-center mx-auto my-5\">\n        <div class=\"row justify-content-center\">\n            <div class=\"col-lg-8\">\n                <h2 class=\"h4 fw-bold mb-1 text-center\">Explore our most visited journeys</h2>\n                <p class=\"text-muted mb-4\">Hand-curated pathways to Quran, dua, and mission experiences, all adorned with premium spacing, subtle motion, and refined corners.</p>\n            </div>\n        </div>\n        <div class=\"row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mt-2 justify-content-center\">\n            <div class=\"col\" v-for=\"journey in seoCards\" :key=\"`journey-${journey.title}`\">\n                <article class=\"premium-card h-100 d-flex flex-column\">\n                    <div>\n                        <h3 class=\"h6 fw-semibold mb-2\">{{ journey.title }}</h3>\n                        <p class=\"small text-muted mb-3\">{{ journey.desc }}</p>\n                    </div>\n                    <a class=\"mt-auto fw-semibold text-teal\" :title=\"journey.title\" :href=\"journey.href\">Explore →</a>\n                </article>\n            </div>\n        </div>\n    </section> "), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"container pt-3 pb-3 ic-features\" aria-label=\"Islamic Connect Features\" data-v-0dc90d45><!-- First Row - Quran Companion --><div class=\"row py-4 py-lg-5 align-items-center ic-feature-row\" data-v-0dc90d45><div class=\"col-lg-6 order-2 order-lg-1\" data-v-0dc90d45><h2 class=\"h1 fw-bold text-center text-lg-start mb-4\" data-v-0dc90d45> Quran Companion: AI-Powered &amp; Accessible </h2><p class=\"lead text-muted text-center text-lg-start mb-4\" style=\"line-height:1.7;\" data-v-0dc90d45> Experience the Quran with advanced AI tools for reading, listening, and understanding. Featuring text-to-speech, screen reader support, and voice search for an accessible, intelligent connection to the Divine. </p><div class=\"d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center\" data-v-0dc90d45><a href=\"/quran\" class=\"btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20\" style=\"min-width:160px;\" data-v-0dc90d45> Explore Quran </a></div></div><div class=\"col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0\" data-v-0dc90d45><img src=\"/images/slide1.png\" class=\"img-fluid rounded-20 shadow-sm\" alt=\"Quran Companion interface showing AI-powered features and accessibility tools\" loading=\"lazy\" width=\"600\" height=\"400\" data-v-0dc90d45></div></div><!-- Second Row - Audio Content --><div class=\"row py-4 py-lg-5 align-items-center ic-feature-row\" data-v-0dc90d45><div class=\"col-lg-6 mb-4 mb-lg-0\" data-v-0dc90d45><img src=\"/images/slide4.png\" class=\"img-fluid rounded-20 shadow-sm\" alt=\"Islamic podcasts and audio content streaming interface\" loading=\"lazy\" width=\"600\" height=\"400\" data-v-0dc90d45></div><div class=\"col-lg-6\" data-v-0dc90d45><h2 class=\"h1 fw-bold text-center text-lg-start mb-4\" data-v-0dc90d45> Spiritual Content On-The-Go </h2><p class=\"lead text-muted text-center text-lg-start mb-4\" style=\"line-height:1.7;\" data-v-0dc90d45> Access uplifting Islamic podcasts, inspiring audio series, and live radio in one place. Stay spiritually connected through sound and reflection wherever you are. </p><div class=\"d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center\" data-v-0dc90d45><a href=\"/media\" class=\"btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20\" style=\"min-width:160px;\" data-v-0dc90d45> Browse Content </a></div></div></div><!-- Third Row - Quran Explorer --><div class=\"row py-4 py-lg-5 align-items-center ic-feature-row\" data-v-0dc90d45><div class=\"col-lg-6 order-2 order-lg-1\" data-v-0dc90d45><h2 class=\"h1 fw-bold text-center text-lg-start mb-4\" data-v-0dc90d45> Deep Quran Exploration </h2><p class=\"lead text-muted text-center text-lg-start mb-4\" style=\"line-height:1.7;\" data-v-0dc90d45> Search, explore, and engage with every verse effortlessly. Discover tafsir, translations, and recitations with tools designed for simplicity and spiritual growth. </p><div class=\"d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center\" data-v-0dc90d45><a href=\"/surat\" class=\"btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20\" style=\"min-width:160px;\" data-v-0dc90d45> Start Exploring </a></div></div><div class=\"col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0\" data-v-0dc90d45><img src=\"/images/slide2.png\" class=\"img-fluid rounded-20 shadow-sm\" alt=\"Quran exploration interface with search and translation features\" loading=\"lazy\" width=\"600\" height=\"400\" data-v-0dc90d45></div></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Stats Section "), _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"stats-section\" data-v-0dc90d45><div class=\"container\" data-v-0dc90d45><div class=\"row justify-content-center\" data-v-0dc90d45><div class=\"col-lg-10 text-center\" data-v-0dc90d45><h2 class=\"section-title\" data-v-0dc90d45>Our Impact in Numbers</h2><p class=\"section-lead\" data-v-0dc90d45>Measurable results showing how we&#39;re making Islamic knowledge accessible to all</p><div class=\"row container-fluid stats-grid\" data-v-0dc90d45><div class=\"col-md-3 col-6 mb-4\" data-v-0dc90d45><div class=\"stat-card\" data-v-0dc90d45><h3 data-v-0dc90d45>100%</h3><p data-v-0dc90d45>Accessibility score</p><small data-v-0dc90d45>Trusted by Google Lighthouse</small></div></div><div class=\"col-md-3 col-6 mb-4\" data-v-0dc90d45><div class=\"stat-card\" data-v-0dc90d45><h3 data-v-0dc90d45>85+</h3><p data-v-0dc90d45>Countries</p><small data-v-0dc90d45>Global reach</small></div></div><div class=\"col-md-3 col-6 mb-4\" data-v-0dc90d45><div class=\"stat-card\" data-v-0dc90d45><h3 data-v-0dc90d45>650+</h3><p data-v-0dc90d45>Cities/Towns</p><small data-v-0dc90d45>Worldwide presence</small></div></div><div class=\"col-md-3 col-6 mb-4\" data-v-0dc90d45><div class=\"stat-card\" data-v-0dc90d45><h3 data-v-0dc90d45>1090%</h3><p data-v-0dc90d45>Growth</p><small data-v-0dc90d45>Returning users</small></div></div></div></div></div></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" AI Tools & Features Section - Optimized "), _cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"py-5 ic-ai\" aria-labelledby=\"ai-tools-title\" data-v-0dc90d45><div class=\"container pt-3\" data-v-0dc90d45><div class=\"row justify-content-center text-center mb-3\" data-v-0dc90d45><div class=\"col-lg-8 col-xl-7\" data-v-0dc90d45></div><h2 id=\"ai-tools-title\" class=\"h2 mb-3 fw-bold\" data-v-0dc90d45>AI-Powered Tools for Enhanced Islamic Learning</h2></div><div class=\"row pt-3 g-4 g-md-5\" data-v-0dc90d45><div class=\"col-12\" data-v-0dc90d45><p class=\"lead text-center mb-4\" style=\"line-height:1.7;\" data-v-0dc90d45> At Islamic Connect, we leverage advanced AI technology to make Quranic knowledge accessible to everyone. Our tools are designed to empower individuals through inclusive, personalized learning experiences that adapt to diverse abilities and learning preferences. </p></div><!-- Feature 4: Text Summarization --><div class=\"col-md-6\" data-v-0dc90d45><div class=\"d-flex h-100\" data-v-0dc90d45><div class=\"flex-shrink-0 me-4\" data-v-0dc90d45><img src=\"images/content.png\" width=\"60\" height=\"60\" alt=\"Content icon for text summarization feature\" loading=\"lazy\" data-v-0dc90d45></div><div class=\"flex-grow-1\" data-v-0dc90d45><h3 class=\"h5 mb-2 fw-bold\" data-v-0dc90d45>AI Text Summarization</h3><p class=\"mb-0\" data-v-0dc90d45> Quickly understand complex Islamic texts with AI-powered summaries. Extract key insights from lengthy content to enhance your learning efficiency. </p></div></div></div><!-- Feature 2: Voice Search --><!-- &lt;div class=&quot;col-md-6&quot;&gt;\n            &lt;div class=&quot;d-flex h-100&quot;&gt;\n              &lt;div class=&quot;flex-shrink-0 me-4&quot;&gt;\n                &lt;img src=&quot;images/voice-recognition.png&quot; width=&quot;60&quot; height=&quot;60&quot;\n                  alt=&quot;Voice recognition icon for voice search feature&quot; loading=&quot;lazy&quot;&gt;\n              &lt;/div&gt;\n              &lt;div class=&quot;flex-grow-1&quot;&gt;\n                &lt;h3 class=&quot;h5 mb-2 fw-bold&quot;&gt;Voice-Activated Quran Search&lt;/h3&gt;\n                &lt;p class=&quot;mb-0&quot;&gt;\n                  Use voice commands to search Quranic verses and teachings.\n                  A hands-free, accessible way to explore Islamic content quickly and intuitively.\n                &lt;/p&gt;\n              &lt;/div&gt;\n            &lt;/div&gt;\n          &lt;/div&gt; --><!-- Feature 3: Note Editor --><!-- &lt;div class=&quot;col-md-6&quot;&gt;\n            &lt;div class=&quot;d-flex h-100&quot;&gt;\n              &lt;div class=&quot;flex-shrink-0 me-4&quot;&gt;\n                &lt;img src=&quot;images/elearning.png&quot; width=&quot;60&quot; height=&quot;60&quot; alt=&quot;E-learning icon for note editor feature&quot;\n                  loading=&quot;lazy&quot;&gt;\n              &lt;/div&gt;\n              &lt;div class=&quot;flex-grow-1&quot;&gt;\n                &lt;h3 class=&quot;h5 mb-2 fw-bold&quot;&gt;Advanced Islamic Note Editor&lt;/h3&gt;\n                &lt;p class=&quot;mb-0&quot;&gt;\n                  A customizable note-taking tool designed specifically for Islamic studies.\n                  Organize your reflections, bookmarks, and study notes with ease.\n                &lt;/p&gt;\n              &lt;/div&gt;\n            &lt;/div&gt;\n          &lt;/div&gt; --><!-- Feature 1: Speech-to-Text --><div class=\"col-md-6 mb-3\" data-v-0dc90d45><div class=\"d-flex h-100\" data-v-0dc90d45><div class=\"flex-shrink-0 me-4\" data-v-0dc90d45><img src=\"images/podcasting.png\" width=\"60\" height=\"60\" alt=\"Microphone icon representing speech-to-text feature\" loading=\"lazy\" data-v-0dc90d45></div><div class=\"flex-grow-1\" data-v-0dc90d45><h3 class=\"h5 mb-2 fw-bold\" data-v-0dc90d45>Speech-to-Text for Islamic Notes</h3><p class=\"mb-0\" data-v-0dc90d45> Capture your spoken reflections and thoughts on Islamic teachings effortlessly. Perfect for documenting insights and ensuring accessibility for those who prefer audio input. </p></div></div></div><!-- Feature 5: Audio Sync --><div class=\"col-md-6\" data-v-0dc90d45><div class=\"d-flex h-100\" data-v-0dc90d45><div class=\"flex-shrink-0 me-4\" data-v-0dc90d45><img src=\"images/highlighter.png\" width=\"60\" height=\"60\" alt=\"Highlighter icon for audio synchronization feature\" loading=\"lazy\" data-v-0dc90d45></div><div class=\"flex-grow-1\" data-v-0dc90d45><h3 class=\"h5 mb-2 fw-bold\" data-v-0dc90d45>Word-by-Word Quran Highlighting</h3><p class=\"mb-0\" data-v-0dc90d45> Follow Quranic recitations with synchronized text highlighting. Each word lights up as it&#39;s recited, improving pronunciation and comprehension. </p></div></div></div><!-- Feature 6: Text-to-Speech --><div class=\"col-md-6\" data-v-0dc90d45><div class=\"d-flex h-100\" data-v-0dc90d45><div class=\"flex-shrink-0 me-4\" data-v-0dc90d45><img src=\"images/chat.png\" width=\"60\" height=\"60\" alt=\"Chat icon for text-to-speech feature\" loading=\"lazy\" data-v-0dc90d45></div><div class=\"flex-grow-1\" data-v-0dc90d45><h3 class=\"h5 mb-2 fw-bold\" data-v-0dc90d45>Text-to-Speech for Translations</h3><p class=\"mb-0\" data-v-0dc90d45> Listen to Quran translations and Tafsir explanations. High-quality audio delivery makes Islamic knowledge accessible while multitasking or for visual impairments. </p></div></div></div></div></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Premium CTA Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Premium CTA Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <section class=\"py-5 ic-support\" aria-labelledby=\"premium-heading\" role=\"region\">\n      <div class=\"container\">\n        <div class=\"row justify-content-center text-center mb-4\">\n          <div class=\"col-lg-8\">\n            <h2 id=\"premium-heading\" class=\"fw-bold ic-support__title\">Support The Work, Access\n              More</h2>\n            <p class=\"lead text-muted\" style=\"line-height:1.7\">\n              Your support sustains this khidmah and keeps Islamic knowledge accessible for everyone.\n            </p>\n          </div>\n        </div>\n\n\n        <div class=\"row justify-content-center mb-4 quote-wrapper bg-white\">\n          <div class=\"col-lg-9\">\n            <div class=\"quote-card\">\n\n              <div class=\"quote-glow\"></div>\n\n              <div class=\"quote-content\">\n                <p class=\"faith-quote\">\n                  <span class=\"quote-mark\" aria-hidden=\"true\">“</span>\n                  Whoever treads a path seeking knowledge, Allah will make easy for him a path to Paradise.\n                  <span class=\"quote-mark\" aria-hidden=\"true\">”</span>\n                </p>\n\n                <div class=\"quote-ref\">Hadith Sahih Muslim</div>\n\n                <div class=\"quote-divider\"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row justify-content-center\">\n          <div class=\"col-lg-10\">\n            <div class=\"row g-4\">\n              <div class=\"col-md-6\">\n                <div class=\"card h-100 border-0\" style=\"box-shadow:0 10px 30px rgba(0,0,0,0.08);\">\n                  <div class=\"card-body p-4 text-start\">\n                    <h3 class=\"h4 fw-bold mb-3\" style=\"color:#2c3e50;\">What your support enables</h3>\n                    <ul class=\"mb-0\" style=\"list-style:none; padding-left:0; color:#4a5568; line-height:1.7;\">\n                      <li class=\"mb-2\"><i class=\"fas fa-check text-success me-2\"></i>Keep Quran tools fast, accessible,\n                        and ad‑free</li>\n                      <li class=\"mb-2\"><i class=\"fas fa-check text-success me-2\"></i>Offer trustworthy resources curated\n                        with amanah</li>\n                      <li class=\"mb-2\"><i class=\"fas fa-check text-success me-2\"></i>Deliver new features shaped by your\n                        feedback</li>\n                      <li class=\"mb-2\"><i class=\"fas fa-check text-success me-2\"></i>Make the platform available to\n                        those who can’t pay</li>\n                    </ul>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"col-md-6\">\n                <div class=\"h-100 d-flex flex-column justify-content-between\"\n                  style=\"background:white; border-radius:12px; border:1px solid #e9ecef; box-shadow:0 10px 30px rgba(0,0,0,0.08);\">\n                  <div class=\"p-4 text-start\">\n                    <h3 class=\"h4 fw-bold mb-3\" style=\"color:#2c3e50;\">Simple and transparent</h3>\n                    <p class=\"mb-3\" style=\"color:#4a5568;\">Secure Stripe payments. Cancel anytime. No tracking, no ads.\n                    </p>\n                    <button @click=\"goTo('/support')\" style=\"\n                        background: rgba(255, 255, 255, 0.9);\n                        color: #1a5f7a;\n                        border: 2px solid #1a5f7a;\n                        padding: 1rem 2rem;\n                        border-radius: 12px;\n                        font-weight: 700;\n                        font-size: 1.1rem;\n                        box-shadow: 0 5px 20px rgba(26, 95, 122, 0.2);\n                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n                        backdrop-filter: blur(10px);\n                      \"\n                      onmouseover=\"this.style.transform='translateY(-2px)'; this.style.background='#1a5f7a'; this.style.color='white'; this.style.boxShadow='0 8px 25px rgba(26, 95, 122, 0.4)';\"\n                      onmouseout=\"this.style.transform='translateY(0)'; this.style.background='rgba(255, 255, 255, 0.9)'; this.style.color='#1a5f7a'; this.style.boxShadow='0 5px 20px rgba(26, 95, 122, 0.2)';\">\n                      <i class=\"fas fa-heart me-2\"></i>Provide a small Donation\n                    </button>\n                  </div>\n                  <div class=\"px-4 pb-4\">\n                    <div class=\"d-flex align-items-center\" style=\"gap:.5rem; color:#6c757d;\">\n                      <i class=\"fas fa-lock\"></i>\n                      <small>SSL encrypted • PCI compliant</small>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </section> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quick Join Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Enhanced Quick Join Section "), _cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"py-5 quick-join-section ic-join\" data-v-0dc90d45><!-- Background Elements --><div class=\"ic-join__orb ic-join__orb--one\" data-v-0dc90d45></div><div class=\"ic-join__orb ic-join__orb--two\" data-v-0dc90d45></div><div class=\"ic-join__orb ic-join__orb--three\" data-v-0dc90d45></div><div class=\"container ic-join__inner\" data-v-0dc90d45><div class=\"row align-items-center\" data-v-0dc90d45><div class=\"col-lg-7 text-center text-lg-start\" data-v-0dc90d45><h2 class=\"text-white fw-bold mb-3 ic-join__title\" data-v-0dc90d45>Ready to Transform Your Daily Spiritual Journey?</h2><p class=\"text-white mb-4 ic-join__lead\" data-v-0dc90d45>Join now and receive your first spiritual reminder within minutes. Start your day with divine inspiration! </p></div><div class=\"col-lg-5 text-center\" data-v-0dc90d45><!-- Join Cards --><div class=\"row g-3\" data-v-0dc90d45><div class=\"col-12\" data-v-0dc90d45><div class=\"join-card-hover rounded-20 ic-join-card\" data-v-0dc90d45><!-- WhatsApp Card --><div class=\"d-flex align-items-center mb-3\" data-v-0dc90d45><div class=\"ic-join-icon ic-join-icon--whatsapp\" data-v-0dc90d45><i class=\"fab fa-whatsapp text-white\" style=\"font-size:1.5rem;\" data-v-0dc90d45></i></div><div class=\"text-start\" data-v-0dc90d45><h3 class=\"fw-bold mb-1\" style=\"color:#1a5f7a;\" data-v-0dc90d45>WhatsApp Channel</h3><small class=\"text-muted\" data-v-0dc90d45>Daily verses &amp; instant reminders</small></div></div><a href=\"https://whatsapp.com/channel/0029VbAsOvp59PwIp2zwyB1m\" class=\"btn w-100 rounded-20 ic-join-btn ic-join-btn--whatsapp\" target=\"_blank\" rel=\"noopener noreferrer\" data-v-0dc90d45><i class=\"fab fa-whatsapp me-2\" data-v-0dc90d45></i>Join WhatsApp Channel <span class=\"ic-join-btn__arrow\" data-v-0dc90d45>→</span></a></div></div><div class=\"col-12\" data-v-0dc90d45><div class=\"join-card-hover rounded-20 ic-join-card\" data-v-0dc90d45><!-- Telegram Card --><div class=\"d-flex align-items-center mb-3\" data-v-0dc90d45><div class=\"ic-join-icon ic-join-icon--telegram\" data-v-0dc90d45><i class=\"fab fa-telegram text-white\" style=\"font-size:1.5rem;\" data-v-0dc90d45></i></div><div class=\"text-start\" data-v-0dc90d45><h3 class=\"fw-bold mb-1\" style=\"color:#1a5f7a;\" data-v-0dc90d45>Telegram Community</h3><small class=\"text-muted\" data-v-0dc90d45>In-depth content &amp; discussions</small></div></div><a href=\"https://t.me/+r81Q3SEAa-M5ZWI0\" class=\"btn w-100 rounded-20 ic-join-btn ic-join-btn--telegram\" target=\"_blank\" rel=\"noopener noreferrer\" data-v-0dc90d45><i class=\"fab fa-telegram me-2\" data-v-0dc90d45></i>Join Telegram Community <span class=\"ic-join-btn__arrow\" data-v-0dc90d45>→</span></a><!-- &lt;div class=&quot;mt-2&quot;&gt;\n                    &lt;small class=&quot;text-muted&quot; style=&quot;font-weight: 500;&quot;&gt;\n                      &lt;i class=&quot;fas fa-users me-1&quot;&gt;&lt;/i&gt;3,200+ active members\n                    &lt;/small&gt;\n                  &lt;/div&gt; --></div></div></div><!-- Trust Badge --><div class=\"mt-3 ic-join__badge\" data-v-0dc90d45><div class=\"d-flex align-items-center\" style=\"gap:0.5rem;\" data-v-0dc90d45><i class=\"fas fa-shield-alt text-white\" style=\"font-size:1.1rem;\" data-v-0dc90d45></i><small class=\"text-white fw-bold\" data-v-0dc90d45>100% Free • Easy Subscribe</small></div></div></div></div></div><!-- Floating Icons --><div class=\"ic-join__icon\" data-v-0dc90d45><i class=\"fas fa-quran\" data-v-0dc90d45></i></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" contact "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_16, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "contact-section__blur contact-section__blur--left"
  }, null, -1 /* CACHED */)), _cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "contact-section__blur contact-section__blur--right"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row justify-content-center text-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-xl-8 col-lg-9"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    id: "contact-heading",
    class: "display-5 fw-bold mb-3"
  }, "Let’s Keep the Conversation Going"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "lead fw-semibold text-muted mb-4"
  }, " Share your thoughts, ask about our resources, or flag a bug. Picking the right topic helps us route your request to the right team immediately. ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
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
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
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
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.form.firstname]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
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
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.form.lastname]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
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
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.form.email]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "subject",
    class: "form-label visually-hidden"
  }, "Subject", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "subject",
    class: "form-select form-select-lg",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => _ctx.form.subject = $event),
    name: "subject",
    "aria-required": "true",
    required: ""
  }, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select a subject", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.subjectOptions, option => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: option.value,
      value: option.value
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.label), 9 /* TEXT, PROPS */, _hoisted_26);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, _ctx.form.subject]]), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted d-block mt-1"
  }, "Choose whichever topic matches your message.", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
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
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, _ctx.form.message]])]), _cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"col-12\" data-v-0dc90d45><div class=\"d-grid\" data-v-0dc90d45><button type=\"submit\" class=\"btn btn-teal btn-lg fw-semibold contact-card__btn\" data-v-0dc90d45><span class=\"d-flex align-items-center justify-content-center gap-2\" data-v-0dc90d45><i class=\"fas fa-paper-plane\" aria-hidden=\"true\" data-v-0dc90d45></i> Send Message </span></button></div></div>", 1))])], 32 /* NEED_HYDRATION */)])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "premium-dialog"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_ctx.confirmDialog.visible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.confirmDialog.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.confirmDialog.message), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-outline-secondary",
      onClick: _cache[7] || (_cache[7] = (...args) => _ctx.handleCancel && _ctx.handleCancel(...args))
    }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-teal contact-card__btn",
      onClick: _cache[8] || (_cache[8] = (...args) => _ctx.handleConfirm && _ctx.handleConfirm(...args))
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.confirmDialog.confirmLabel), 1 /* TEXT */)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "premium-toast"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [_ctx.toast.visible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 0,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["premium-toast", `premium-toast--${_ctx.toast.type}`]),
      role: "status",
      "aria-live": "polite"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_33, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.toast.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.toast.message), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn-close btn-close-white",
      onClick: _cache[9] || (_cache[9] = (...args) => _ctx.dismissToast && _ctx.dismissToast(...args))
    })], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Remove the container if you want to extend the Footer to full width. "), _cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("footer", {
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
      toastTimer: null
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
      this.showConfirm({
        title: "Join the mailing list?",
        message: "Stay in the loop with updates, launches, and new resources from the Islamic Connect mission.",
        confirmLabel: "Subscribe",
        action: () => {
          this.postForm("/api/submit-mail", "Mailing List Subscribed", "Thank you for joining our email community.");
        }
      });
    },
    postForm(url, toastTitle, toastMessage) {
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(url, this.form).then(() => {
        this.showToast("success", toastTitle, toastMessage);
        this.form.reset();
      }).catch(err => {
        var _err$response;
        const errorMessage = ((_err$response = err.response) === null || _err$response === void 0 || (_err$response = _err$response.data) === null || _err$response === void 0 ? void 0 : _err$response.message) || "Please try again later.";
        this.showToast("error", "Something went wrong", errorMessage);
      });
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
      this.confirmDialog.visible = false;
      this.confirmDialog.action = null;
    },
    handleConfirm() {
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