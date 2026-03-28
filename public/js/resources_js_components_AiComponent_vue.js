"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_AiComponent_vue"],{

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
const AI_ASSISTANT_SW_PATH = '/ai-assistant-sw.js';
const AI_ASSISTANT_RESPONSE_CACHE_KEY = 'islamic-connect-ai-response-cache-v1';
const AI_ASSISTANT_RESPONSE_CACHE_LIMIT = 40;
const AI_ASSISTANT_RESPONSE_CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const AI_CRITICAL_VERSE_HASH_CACHE_KEY = 'islamic-connect-ai-critical-verse-hash-cache-v1';
const AI_CRITICAL_VERSE_HASH_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const AI_VERSE_VERIFICATION_CACHE_KEY = 'islamic-connect-ai-verse-verification-cache-v1';
const AI_VERSE_VERIFICATION_CACHE_TTL_MS = 1000 * 60 * 60 * 24;
const AI_QURAN_ONLY_MODE = true;
const AI_CRITICAL_VERSE_CANONICAL_TEXTS = Object.freeze({
  '1:1': 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  '1:2': 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
  '2:255': 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ',
  '112:1': 'قُلْ هُوَ اللَّهُ أَحَدٌ',
  '112:2': 'اللَّهُ الصَّمَدُ',
  '112:3': 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
  '112:4': 'وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ'
});
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
const CHAT_DRAFT_MAX_LENGTH = 1500;
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
      voiceAlertMessage: '',
      voiceAlertTimeout: null,
      pendingClearAll: false,
      pendingDeleteSessionId: '',
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
      latestBatchVerification: null,
      serviceWorkerRegistration: null,
      criticalVerseHashMap: {},
      showDisclaimerModal: false,
      showReportModal: false,
      reportSubmitting: false,
      reportError: '',
      reportTargetEntryKey: '',
      reportTargetIndex: -1,
      reportForm: {
        reason: '',
        details: ''
      },
      reportReasons: [{
        value: 'incorrect',
        label: 'Incorrect or misleading'
      }, {
        value: 'harmful',
        label: 'Potentially harmful'
      }, {
        value: 'off_topic',
        label: 'Not relevant to question'
      }, {
        value: 'offensive',
        label: 'Offensive or inappropriate'
      }, {
        value: 'other',
        label: 'Other issue'
      }],
      sidebarCollapsed: false,
      quickPrompts: [{
        label: 'Hifz Routine',
        prompt: 'Build me a simple hifz routine for busy weekdays, with review and new memorisation in a balanced Islamic rhythm.'
      }, {
        label: 'Sabr & Dua',
        prompt: 'Share one Quran verse, one dua, and one practical step for patience during a difficult week.'
      }, {
        label: 'Adab & Akhlaq',
        prompt: 'What does Islam teach about controlling anger and speaking with ihsan in tense moments?'
      }]
    };
  },
  computed: {
    isNewChatAvailable() {
      return this.chatDraft.trim().length > 0 || this.hasAssistantResponse;
    },
    draftCharacterCount() {
      return String(this.chatDraft || '').length;
    },
    draftCharacterLimit() {
      return CHAT_DRAFT_MAX_LENGTH;
    },
    draftCharactersRemaining() {
      return Math.max(0, CHAT_DRAFT_MAX_LENGTH - this.draftCharacterCount);
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
    },
    activeReportEntry() {
      if (!this.reportTargetEntryKey) {
        return null;
      }
      return this.chatHistory.find((entry, index) => this.getEntryKey(entry, index) === this.reportTargetEntryKey) || null;
    },
    reportPreviewText() {
      var _this$activeReportEnt;
      const source = ((_this$activeReportEnt = this.activeReportEntry) === null || _this$activeReportEnt === void 0 ? void 0 : _this$activeReportEnt.text) || '';
      const preview = this.toPlainText(source).replace(/[ \t]{2,}/g, ' ').trim();
      return preview || 'No answer selected.';
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
      this.$nextTick(() => this.scrollChatWindow());
    },
    openDisclaimerModal() {
      this.showDisclaimerModal = true;
      if (typeof document !== 'undefined') {
        document.body.classList.add('ai-disclaimer-open');
      }
    },
    closeDisclaimerModal() {
      this.showDisclaimerModal = false;
      if (typeof document !== 'undefined') {
        document.body.classList.remove('ai-disclaimer-open');
      }
    },
    createEntryKey(role = 'assistant', seed = null) {
      const base = seed || `${Date.now()}`;
      const random = Math.random().toString(36).slice(2, 8);
      return `${role}-${base}-${random}`;
    },
    getEntryKey(entry, index = -1) {
      if (!entry || typeof entry !== 'object') {
        return `entry-${Date.now()}-${Math.max(index, 0)}`;
      }
      const existingKey = typeof entry.entryKey === 'string' ? entry.entryKey.trim() : '';
      if (existingKey) {
        return existingKey;
      }
      const role = entry.role === 'assistant' ? 'assistant' : 'user';
      const seed = entry.time || `${Date.now()}-${Math.max(index, 0)}`;
      return `${role}-${seed}`;
    },
    openReportModal(entry, index) {
      if (!entry || entry.role !== 'assistant') {
        return;
      }
      this.reportTargetEntryKey = this.getEntryKey(entry, index);
      this.reportTargetIndex = Number.isInteger(index) ? index : -1;
      this.reportForm.reason = '';
      this.reportForm.details = '';
      this.reportError = '';
      this.showReportModal = true;
    },
    closeReportModal() {
      this.showReportModal = false;
      this.reportSubmitting = false;
      this.reportError = '';
      this.reportTargetEntryKey = '';
      this.reportTargetIndex = -1;
      this.reportForm.reason = '';
      this.reportForm.details = '';
    },
    getReportRelatedQuestionText() {
      let startIndex = this.reportTargetIndex;
      if (!Number.isInteger(startIndex) || startIndex < 0) {
        startIndex = this.chatHistory.findIndex((entry, index) => this.getEntryKey(entry, index) === this.reportTargetEntryKey);
      }
      if (startIndex <= 0) {
        return '';
      }
      for (let cursor = startIndex - 1; cursor >= 0; cursor -= 1) {
        const candidate = this.chatHistory[cursor];
        if ((candidate === null || candidate === void 0 ? void 0 : candidate.role) !== 'user') {
          continue;
        }
        const text = String(candidate.text || '').trim();
        if (text) {
          return text.slice(0, CHAT_DRAFT_MAX_LENGTH);
        }
      }
      return '';
    },
    buildReportPayload(entry) {
      const relatedQuestion = this.getReportRelatedQuestionText();
      const references = Array.isArray(entry === null || entry === void 0 ? void 0 : entry.references) ? entry.references.map(item => this.normalizeStoredReference(item)).filter(Boolean).slice(0, 2) : [];
      const verification = entry !== null && entry !== void 0 && entry.verification && typeof entry.verification === 'object' ? {
        verified: Boolean(entry.verification.verified),
        confidence: String(entry.verification.confidence || 'low'),
        totalSources: Number(entry.verification.totalSources || references.length || 0),
        message: String(entry.verification.message || '').trim().slice(0, 1000)
      } : null;
      return {
        session_id: this.sessionId || '',
        entry_key: this.getEntryKey(entry, this.reportTargetIndex),
        reason: String(this.reportForm.reason || '').trim(),
        details: String(this.reportForm.details || '').trim().slice(0, 1500),
        reported_text: this.toPlainText((entry === null || entry === void 0 ? void 0 : entry.text) || '').trim().slice(0, 12000),
        question_text: relatedQuestion,
        references,
        verification,
        message_time: (entry === null || entry === void 0 ? void 0 : entry.time) || null,
        page_url: typeof window !== 'undefined' && window.location ? window.location.href : null
      };
    },
    async submitMessageReport() {
      if (this.reportSubmitting) {
        return;
      }
      const entry = this.activeReportEntry;
      if (!entry) {
        this.reportError = 'No answer selected for reporting.';
        return;
      }
      if (!String(this.reportForm.reason || '').trim()) {
        this.reportError = 'Please choose a reason.';
        return;
      }
      const payload = this.buildReportPayload(entry);
      if (!payload.reported_text) {
        this.reportError = 'The selected answer is empty.';
        return;
      }
      this.reportSubmitting = true;
      this.reportError = '';
      try {
        const response = await fetch('/api/ai/report', {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': this.getCsrfToken()
          },
          body: JSON.stringify(payload)
        });
        const parsed = await this.parseFetchResponseBody(response);
        if (!response.ok) {
          var _parsed$payload, _parsed$payload2;
          throw new Error(this.firstNonEmptyString([(_parsed$payload = parsed.payload) === null || _parsed$payload === void 0 ? void 0 : _parsed$payload.message, (_parsed$payload2 = parsed.payload) === null || _parsed$payload2 === void 0 ? void 0 : _parsed$payload2.error, 'Unable to submit your report right now. Please try again.']));
        }
        this.closeReportModal();
        this.showCopyNotice('Report submitted. Thank you for helping improve Noor.');
      } catch (error) {
        this.reportError = (error === null || error === void 0 ? void 0 : error.message) || 'Unable to submit your report right now. Please try again.';
      } finally {
        this.reportSubmitting = false;
      }
    },
    handleComposerKeydown(event) {
      if (!event) {
        return;
      }
      if (event.isComposing || event.keyCode === 229) {
        return;
      }
      if (event.key !== 'Enter') {
        return;
      }
      event.preventDefault();
      this.sendChatMessage();
    },
    handleDraftInput() {
      this.autoResizeComposer();
      if (this.chatError) {
        this.chatError = null;
      }
    },
    autoResizeComposer() {
      const textarea = this.$refs.aiChatInput;
      if (!textarea || !textarea.style) {
        return;
      }
      textarea.style.height = 'auto';
      const minHeight = 42;
      const maxHeight = 108;
      const targetHeight = Math.max(minHeight, Math.min(textarea.scrollHeight, maxHeight));
      textarea.style.height = `${targetHeight}px`;
      textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
    },
    applyQuickPrompt(prompt, sendImmediately = true) {
      if (this.chatLoading || typeof prompt !== 'string') {
        return;
      }
      const cleaned = prompt.trim().slice(0, CHAT_DRAFT_MAX_LENGTH);
      if (!cleaned) {
        return;
      }
      this.chatDraft = cleaned;
      this.chatError = null;
      this.$nextTick(() => {
        this.autoResizeComposer();
        const textarea = this.$refs.aiChatInput;
        if (textarea && typeof textarea.focus === 'function') {
          textarea.focus();
        }
        if (sendImmediately) {
          this.sendChatMessage();
        }
      });
    },
    createChatEntry(role, text, references = [], summaryBullets = null, verification = null) {
      const now = new Date();
      const entryKey = this.createEntryKey(role, `${now.getTime()}`);
      const providedSummary = Array.isArray(summaryBullets) ? summaryBullets.map(item => String(item || '').trim()).filter(Boolean).slice(0, 4) : null;
      const resolvedSummary = providedSummary !== null ? providedSummary : role === 'assistant' ? [] : this.extractSummaryBulletPoints(text);
      const allowCollapse = role !== 'assistant' && resolvedSummary.length && this.isLongMessage(text);
      return {
        entryKey,
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
      var _verification$critica;
      if (Number((verification === null || verification === void 0 || (_verification$critica = verification.criticalHashes) === null || _verification$critica === void 0 ? void 0 : _verification$critica.failed) || 0) > 0) {
        return 'chat-verification--low';
      }
      const confidence = (verification === null || verification === void 0 ? void 0 : verification.confidence) || 'low';
      if (confidence === 'high') return 'chat-verification--high';
      if (confidence === 'medium') return 'chat-verification--medium';
      return 'chat-verification--low';
    },
    formatVerificationLabel(verification) {
      var _verification$critica2, _verification$critica3, _verification$critica4, _verification$critica5;
      if (!verification) {
        return '';
      }
      const confidence = String(verification.confidence || 'low').toUpperCase();
      const sourceCount = Number(verification.totalSources || 0);
      const checkedHashes = Number((verification === null || verification === void 0 || (_verification$critica2 = verification.criticalHashes) === null || _verification$critica2 === void 0 ? void 0 : _verification$critica2.checked) || 0);
      const passedHashes = Number((verification === null || verification === void 0 || (_verification$critica3 = verification.criticalHashes) === null || _verification$critica3 === void 0 ? void 0 : _verification$critica3.passed) || 0);
      const unresolvedHashes = Number((verification === null || verification === void 0 || (_verification$critica4 = verification.criticalHashes) === null || _verification$critica4 === void 0 ? void 0 : _verification$critica4.unresolved) || 0);
      const failedHashes = Number((verification === null || verification === void 0 || (_verification$critica5 = verification.criticalHashes) === null || _verification$critica5 === void 0 ? void 0 : _verification$critica5.failed) || 0);
      if (sourceCount > 0) {
        if (checkedHashes > 0 || unresolvedHashes > 0 || failedHashes > 0) {
          return `${confidence} confidence - ${sourceCount} source${sourceCount === 1 ? '' : 's'} - hash ${passedHashes}/${checkedHashes || passedHashes}${failedHashes > 0 ? ` (${failedHashes} failed)` : ''}${unresolvedHashes > 0 ? ` (${unresolvedHashes} pending)` : ''}`;
        }
        return `${confidence} confidence - ${sourceCount} source${sourceCount === 1 ? '' : 's'}`;
      }
      if (checkedHashes > 0 || unresolvedHashes > 0 || failedHashes > 0) {
        return `${confidence} confidence - hash ${passedHashes}/${checkedHashes || passedHashes}${failedHashes > 0 ? ` (${failedHashes} failed)` : ''}${unresolvedHashes > 0 ? ` (${unresolvedHashes} pending)` : ''}`;
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
    detectTextDirection(value = '') {
      const text = String(value || '').trim();
      if (!text) {
        return 'ltr';
      }
      const arabicCharacters = (text.match(/[\u0600-\u06FF]/g) || []).length;
      const latinCharacters = (text.match(/[A-Za-z]/g) || []).length;
      if (arabicCharacters && !latinCharacters) {
        return 'rtl';
      }
      if (latinCharacters && !arabicCharacters) {
        return 'ltr';
      }
      if (arabicCharacters > latinCharacters * 1.2) {
        return 'rtl';
      }
      return 'ltr';
    },
    wrapTextWithDirection(value = '', tag = 'p') {
      const text = String(value || '').trim();
      if (!text) {
        return '';
      }
      const dir = this.detectTextDirection(text);
      return `<${tag} class="ai-gpt-dir-${dir}" dir="${dir}">${this.escapeHtml(text)}</${tag}>`;
    },
    normalizeChatTextForDisplay(value = '') {
      if (!value) {
        return '';
      }
      const cleaned = String(value).replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, ' ').replace(/…+/g, ' ').replace(/\.{3,}/g, '.').replace(/[ \t]{2,}/g, ' ').replace(/\n{3,}/g, '\n\n').replace(/\*\*/g, '').trim();
      return this.cleanupTrailingFragment(cleaned);
    },
    splitParagraphIntoReadableChunks(value = '') {
      const paragraph = String(value || '').replace(/[ \t]{2,}/g, ' ').trim();
      if (!paragraph) {
        return [];
      }
      if (paragraph.length <= 240) {
        return [paragraph];
      }
      const sentences = (paragraph.match(/[^.!?]+(?:[.!?]+|$)/g) || []).map(item => item.trim()).filter(Boolean);
      if (sentences.length < 2) {
        return [paragraph];
      }
      const chunkSize = sentences.length <= 5 ? 1 : 2;
      const chunks = [];
      for (let idx = 0; idx < sentences.length; idx += chunkSize) {
        const chunk = sentences.slice(idx, idx + chunkSize).join(' ').trim();
        if (chunk) {
          chunks.push(chunk);
        }
      }
      return chunks.length ? chunks : [paragraph];
    },
    renderTextBlocksToHtml(value = '') {
      if (!value) {
        return '';
      }
      const blocks = String(value).split(/\n{2,}/).map(item => item.trim()).filter(Boolean);
      const htmlBlocks = [];
      blocks.forEach(block => {
        const lines = block.split('\n').map(line => line.trim()).filter(Boolean);
        if (!lines.length) {
          return;
        }
        const isUnorderedList = lines.every(line => /^[-*•]\s+/.test(line));
        const isOrderedList = lines.every(line => /^\d+[.)]\s+/.test(line));
        if (isUnorderedList || isOrderedList) {
          const tag = isOrderedList ? 'ol' : 'ul';
          const items = lines.map(line => line.replace(/^([-*•]|\d+[.)])\s+/, '').trim()).filter(Boolean).map(item => this.wrapTextWithDirection(item, 'li')).join('');
          if (items) {
            htmlBlocks.push(`<${tag}>${items}</${tag}>`);
            return;
          }
        }
        const paragraphText = lines.join(' ').replace(/[ \t]{2,}/g, ' ').replace(/[,:;]\s*$/, '').trim();
        if (!paragraphText) {
          return;
        }
        const chunks = this.splitParagraphIntoReadableChunks(paragraphText);
        chunks.forEach(chunk => {
          const wrapped = this.wrapTextWithDirection(chunk, 'p');
          if (wrapped) {
            htmlBlocks.push(wrapped);
          }
        });
      });
      return htmlBlocks.join('');
    },
    hasHadithCue(value = '') {
      const normalized = String(value || '').toLowerCase().replace(/[’`]/g, "'").replace(/\s+/g, ' ').trim();
      if (!normalized) {
        return false;
      }
      return /\b(narrated|reported|it was narrated|one day allah's messenger|allah's messenger|messenger of allah|the prophet|sahih|bukhari|muslim|tirmidhi|nasai|abu dawud|ibn majah|companion|abu hurairah|ibn 'abbas|i heard|i used to|while i was walking|came out \(before the people\)|knelt down before the prophet)\b/.test(normalized);
    },
    isLikelyHadithParagraph(value = '') {
      return this.hasHadithCue(value);
    },
    isLikelyQuranParagraph(value = '') {
      const text = String(value || '');
      if (!text.trim()) {
        return false;
      }
      const arabicChunks = text.match(/[\u0600-\u06FF]+/g) || [];
      const arabicCharacterCount = arabicChunks.reduce((total, chunk) => total + chunk.length, 0);
      if (arabicCharacterCount >= 18) {
        return true;
      }
      const normalized = text.toLowerCase().replace(/\s+/g, ' ').trim();
      return /\b(o you who believe|indeed allah|allah says|surah|ayah|quran)\b/.test(normalized);
    },
    splitAssistantParagraphByContentMarkers(value = '') {
      const text = String(value || '').replace(/[ \t]{2,}/g, ' ').trim();
      if (!text) {
        return [];
      }
      const splitReady = text.replace(/(\S)\s+(?=(Narrated|It was narrated|Reported|One day Allah[’'`]s Messenger|Allah[’'`]s Messenger|Messenger of Allah|The Prophet|I heard|I used to|Abu Hurairah|`Umar|Umar))/gi, '$1\n\n').replace(/\n{3,}/g, '\n\n').trim();
      return splitReady.split(/\n{2,}/).map(item => item.trim()).filter(Boolean);
    },
    extractAssistantParagraphs(value = '') {
      if (!value) {
        return [];
      }
      const prepared = String(value).replace(/(\[[^\]]+\])\s+(?=(Narrated|It was narrated|Reported|Allah'?s Messenger|Messenger of Allah|The Prophet))/gi, '$1\n\n').replace(/([.!?])\s+(?=(Narrated|It was narrated|Reported|Allah'?s Messenger|Messenger of Allah|The Prophet|I heard|I used to|Abu Hurairah|`Umar|Umar))/gi, '$1\n\n').replace(/\n{3,}/g, '\n\n').trim();
      let paragraphs = prepared.split(/\n{2,}/).map(item => item.trim()).filter(Boolean);
      if (paragraphs.length === 1 && paragraphs[0].length > 320) {
        paragraphs = this.splitParagraphIntoReadableChunks(paragraphs[0]);
      }
      return paragraphs.flatMap(paragraph => this.splitAssistantParagraphByContentMarkers(paragraph)).map(item => item.replace(/[ \t]{2,}/g, ' ').trim()).filter(Boolean);
    },
    buildAssistantSectionHtml(title, paragraphs = []) {
      const items = Array.isArray(paragraphs) ? paragraphs : [];
      if (!items.length) {
        return '';
      }
      const body = items.map(paragraph => this.renderTextBlocksToHtml(paragraph)).filter(Boolean).join('');
      if (!body) {
        return '';
      }
      const heading = title ? `<h4 class="ai-gpt-answer-title">${this.escapeHtml(title)}</h4>` : '';
      return `<section class="ai-gpt-answer-section">${heading}<div class="ai-gpt-answer-copy">${body}</div></section>`;
    },
    formatAssistantSections(value = '', references = []) {
      const paragraphs = this.extractAssistantParagraphs(value);
      if (!paragraphs.length) {
        return '';
      }
      const quranOnly = paragraphs.filter(paragraph => this.isLikelyQuranParagraph(paragraph) && !this.hasHadithCue(paragraph));
      const nonHadithFallback = paragraphs.filter(paragraph => !this.isLikelyHadithParagraph(paragraph));
      const selectedParagraphs = quranOnly.length ? quranOnly : nonHadithFallback.length ? nonHadithFallback.slice(0, 2) : paragraphs.slice(0, 1);
      return this.buildAssistantSectionHtml('', selectedParagraphs);
    },
    formatChatText(text, role = 'assistant', references = []) {
      const normalized = this.normalizeChatTextForDisplay(text);
      if (!normalized) {
        return '';
      }
      if (role === 'assistant') {
        const structured = this.formatAssistantSections(normalized, references);
        if (structured) {
          return structured;
        }
      }
      return this.renderTextBlocksToHtml(normalized);
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
      return this.cleanupTrailingFragment(text);
    },
    firstNonEmptyString(values = []) {
      if (!Array.isArray(values)) {
        return '';
      }
      for (const value of values) {
        if (typeof value !== 'string') {
          continue;
        }
        const trimmed = value.trim();
        if (trimmed) {
          return trimmed;
        }
      }
      return '';
    },
    cleanupTrailingFragment(value = '') {
      let text = String(value || '').replace(/[ \t]{2,}/g, ' ').trim();
      if (!text) {
        return '';
      }
      const paragraphs = text.split(/\n{2,}/).map(item => item.trim()).filter(Boolean);
      if (paragraphs.length > 1) {
        const lastParagraph = paragraphs[paragraphs.length - 1];
        if (lastParagraph.length <= 64 && !/[.!?]$/.test(lastParagraph)) {
          paragraphs.pop();
          text = paragraphs.join('\n\n').trim();
        }
      }
      const trailingWordMatch = text.match(/\b([a-z]{3,8})\.\s*$/i);
      if (trailingWordMatch) {
        const abbreviationWhitelist = new Set(['dr', 'mr', 'mrs', 'ms', 'sr', 'jr', 'st', 'vs', 'etc', 'e.g', 'i.e', 'no']);
        const trailingWord = trailingWordMatch[1].toLowerCase();
        if (!abbreviationWhitelist.has(trailingWord)) {
          const withoutTail = text.slice(0, -trailingWordMatch[0].length).trimEnd();
          const boundary = Math.max(withoutTail.lastIndexOf('.'), withoutTail.lastIndexOf('!'), withoutTail.lastIndexOf('?'), withoutTail.lastIndexOf('\n'));
          text = boundary >= 0 ? withoutTail.slice(0, boundary + 1).trim() : withoutTail.trim();
        }
      }
      return text.replace(/[,:;]\s*$/, '').trim();
    },
    stripProviderTagNoise(value = '') {
      return String(value || '').replace(/\(([^)]+)\)/g, (fullMatch, inner) => /\b(api|api\.quran\.com|alquran\.cloud|quran\.gading\.dev|quranenc|quran enc|source)\b/i.test(inner) ? '' : fullMatch).replace(/\s*[-|–—]\s*(api\.quran\.com|alquran\.cloud|quran\.gading\.dev|quranenc|quran enc)\b/gi, '').replace(/\s{2,}/g, ' ').trim();
    },
    removeApiNamesFromText(value = '') {
      const replacementRules = [{
        pattern: /\bapi\.quran\.com\b/gi,
        replacement: 'trusted Quran source'
      }, {
        pattern: /\balquran\.cloud\b/gi,
        replacement: 'trusted Quran source'
      }, {
        pattern: /\bquran\.gading\.dev\b/gi,
        replacement: 'trusted Quran source'
      }, {
        pattern: /\bquranenc\b/gi,
        replacement: 'trusted Quran source'
      }, {
        pattern: /\bquran enc\b/gi,
        replacement: 'trusted Quran source'
      }, {
        pattern: /\bthe\s+api\b/gi,
        replacement: 'the source'
      }, {
        pattern: /\bapi\b/gi,
        replacement: 'source'
      }];
      let sanitized = this.stripProviderTagNoise(String(value || ''));
      replacementRules.forEach(({
        pattern,
        replacement
      }) => {
        sanitized = sanitized.replace(pattern, replacement);
      });
      return sanitized.replace(/\s{2,}/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
    },
    improveAssistantMessageReadability(message = '') {
      let text = String(message || '').replace(/\r\n?/g, '\n').replace(/\bAlso:\s*/gi, '').replace(/…+/g, ' ').replace(/\.{3,}/g, '.').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').replace(/[ \t]{2,}/g, ' ').trim();
      text = this.removeApiNamesFromText(text).replace(/[ \t]{2,}/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
      text = text.replace(/;\s+/g, ';\n').replace(/\s+(?=\d+[.)]\s)/g, '\n').replace(/(\[[^\]]+\])\s+(?=(Narrated|It was narrated|Reported|I used to|I heard))/gi, '$1\n\n').replace(/([.!?])\s+(?=(Narrated|It was narrated|Reported|I used to|I heard|The Prophet))/gi, '$1\n\n').replace(/\n{3,}/g, '\n\n').trim();
      if (text && !/\n/.test(text) && text.length > 180) {
        const sentences = (text.match(/[^.!?]+[.!?]+/g) || []).map(item => item.trim()).filter(Boolean);
        if (sentences.length >= 2) {
          const grouped = [];
          const chunkSize = sentences.length <= 5 ? 1 : 2;
          for (let idx = 0; idx < sentences.length; idx += chunkSize) {
            grouped.push(sentences.slice(idx, idx + chunkSize).join(' ').trim());
          }
          text = grouped.join('\n\n');
        }
      }
      return text;
    },
    safeJsonParse(value) {
      if (typeof value !== 'string' || !value.trim()) {
        return null;
      }
      try {
        const parsed = JSON.parse(value);
        return parsed && typeof parsed === 'object' ? parsed : null;
      } catch (error) {
        return null;
      }
    },
    clonePlainData(value) {
      if (value == null) {
        return value;
      }
      try {
        return JSON.parse(JSON.stringify(value));
      } catch (error) {
        return value;
      }
    },
    normalizeResponseUrl(url) {
      if (typeof url !== 'string') {
        return null;
      }
      const trimmed = url.trim();
      if (!trimmed) {
        return null;
      }
      if (trimmed.startsWith('//')) {
        return `https:${trimmed}`;
      }
      if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
        return null;
      }
      return trimmed;
    },
    extractReferenceHostname(url) {
      if (typeof url !== 'string' || !url.trim()) {
        return '';
      }
      try {
        return new URL(url).hostname.toLowerCase().replace(/^www\./, '');
      } catch (error) {
        return '';
      }
    },
    sanitizeReferenceLabel(label, url = null) {
      const rawLabel = String(label || '').replace(/\s+/g, ' ').trim();
      const stripped = this.stripProviderTagNoise(rawLabel);
      const host = this.extractReferenceHostname(url || rawLabel);
      const isKnownApiHost = ['api.quran.com', 'alquran.cloud', 'quran.gading.dev', 'quranenc.com'].includes(host) || host.startsWith('api.');
      const hasApiHint = /\bapi\b|\bquranenc\b|\.(cloud|dev)\b|\/v\d+\//i.test(stripped || '');
      if (stripped && !isKnownApiHost && !hasApiHint) {
        return stripped.slice(0, 180);
      }
      const combined = `${stripped} ${String(url || '')}`.trim();
      const verseKey = this.extractVerseKey(combined);
      if (verseKey) {
        return `Quran reference ${verseKey}`;
      }
      if (this.isHadithReference({}, stripped, url)) {
        return 'Hadith reference';
      }
      if (stripped) {
        return stripped.slice(0, 180);
      }
      return 'Trusted reference';
    },
    normalizeSourceBadge(value) {
      const normalized = String(value || '').trim().toLowerCase().replace(/[^a-z]/g, '');
      if (!normalized) {
        return '';
      }
      if (normalized === 'official') {
        return 'official';
      }
      if (normalized === 'verified') {
        return 'verified';
      }
      if (normalized === 'aggregated' || normalized === 'aggregate') {
        return 'aggregated';
      }
      return '';
    },
    inferSourceBadge(reference, hostname, label) {
      const explicit = this.normalizeSourceBadge((reference === null || reference === void 0 ? void 0 : reference.sourceBadge) || (reference === null || reference === void 0 ? void 0 : reference.source_badge) || (reference === null || reference === void 0 ? void 0 : reference.sourceType) || (reference === null || reference === void 0 ? void 0 : reference.source_type) || (reference === null || reference === void 0 ? void 0 : reference.origin) || '');
      if (explicit) {
        return explicit;
      }
      const host = String(hostname || '').toLowerCase();
      const lowerLabel = String(label || '').toLowerCase();
      const officialHosts = ['quran.com', 'sunnah.com', 'dorar.net', 'islamqa.info', 'binbaz.org.sa'];
      if (officialHosts.some(domain => host === domain || host.endsWith(`.${domain}`))) {
        return 'official';
      }
      const verifiedHosts = ['api.quran.com', 'alquran.cloud', 'quran.gading.dev', 'quranenc.com', 'myislam.org', 'seekersguidance.org'];
      if (verifiedHosts.some(domain => host === domain || host.endsWith(`.${domain}`))) {
        return 'verified';
      }
      if (/\b(official|verified|authentic)\b/.test(lowerLabel)) {
        return 'verified';
      }
      return 'aggregated';
    },
    formatSourceBadge(value) {
      const badge = this.normalizeSourceBadge(value) || 'aggregated';
      if (badge === 'official') {
        return 'Official';
      }
      if (badge === 'verified') {
        return 'Verified';
      }
      return 'Aggregated';
    },
    getSourceBadgeClass(value) {
      const badge = this.normalizeSourceBadge(value) || 'aggregated';
      if (badge === 'official') {
        return 'chat-reference-badge--official';
      }
      if (badge === 'verified') {
        return 'chat-reference-badge--verified';
      }
      return 'chat-reference-badge--aggregated';
    },
    normalizeHadithGradeValue(value) {
      const normalized = String(value || '').toLowerCase().replace(/[’`]/g, "'").replace(/[^a-z0-9'\s-]/g, ' ').replace(/\s+/g, ' ').trim();
      if (!normalized) {
        return '';
      }
      if (/\b(sahih|saheeh|authentic)\b/.test(normalized)) {
        return 'sahih';
      }
      if (/\b(hasan)\b/.test(normalized)) {
        return 'hasan';
      }
      if (/\b(daif|daeef|weak|munkar|fabricated|mawdu)\b/.test(normalized)) {
        return 'daif';
      }
      if (/\b(ungraded|unknown|not graded|none|n\/a|na)\b/.test(normalized)) {
        return 'ungraded';
      }
      return '';
    },
    inferHadithGrade(reference, label, url) {
      const gradeCandidates = [reference === null || reference === void 0 ? void 0 : reference.hadithGrade, reference === null || reference === void 0 ? void 0 : reference.hadith_grade, reference === null || reference === void 0 ? void 0 : reference.grade, reference === null || reference === void 0 ? void 0 : reference.grading, reference === null || reference === void 0 ? void 0 : reference.classification, reference === null || reference === void 0 ? void 0 : reference.status];
      for (const candidate of gradeCandidates) {
        const normalized = this.normalizeHadithGradeValue(candidate);
        if (normalized) {
          return normalized;
        }
      }
      const combined = `${String(label || '')} ${String(url || '')}`.toLowerCase();
      if (/\b(sahih|saheeh|authentic)\b/.test(combined)) {
        return 'sahih';
      }
      if (/\b(hasan)\b/.test(combined)) {
        return 'hasan';
      }
      if (/\b(daif|daeef|weak|munkar|fabricated|mawdu)\b/.test(combined)) {
        return 'daif';
      }
      return 'ungraded';
    },
    isHadithReference(reference, label, url) {
      if ((reference === null || reference === void 0 ? void 0 : reference.isHadith) === true || (reference === null || reference === void 0 ? void 0 : reference.is_hadith) === true) {
        return true;
      }
      if (this.normalizeHadithGradeValue((reference === null || reference === void 0 ? void 0 : reference.hadithGrade) || (reference === null || reference === void 0 ? void 0 : reference.hadith_grade) || (reference === null || reference === void 0 ? void 0 : reference.grade) || (reference === null || reference === void 0 ? void 0 : reference.grading))) {
        return true;
      }
      const host = this.extractReferenceHostname(url);
      const text = `${String(label || '')} ${host} ${String(url || '')}`.toLowerCase();
      return /\b(hadith|bukhari|muslim|tirmidhi|nasai|abu dawud|ibn majah|muwatta|riyad)\b/.test(text) || host === 'sunnah.com' || host.endsWith('.sunnah.com') || host === 'dorar.net' || host.endsWith('.dorar.net');
    },
    formatHadithGrade(value) {
      const grade = this.normalizeHadithGradeValue(value) || 'ungraded';
      if (grade === 'sahih') {
        return 'Sahih';
      }
      if (grade === 'hasan') {
        return 'Hasan';
      }
      if (grade === 'daif') {
        return "Da'if";
      }
      return 'Ungraded';
    },
    getHadithGradeBadgeClass(value) {
      const grade = this.normalizeHadithGradeValue(value) || 'ungraded';
      if (grade === 'sahih') {
        return 'chat-reference-badge--sahih';
      }
      if (grade === 'hasan') {
        return 'chat-reference-badge--hasan';
      }
      if (grade === 'daif') {
        return 'chat-reference-badge--daif';
      }
      return 'chat-reference-badge--ungraded';
    },
    buildReferenceMetadata(reference, label, url) {
      const hostname = this.extractReferenceHostname(url);
      const sourceBadge = this.inferSourceBadge(reference, hostname, label);
      const isHadith = this.isHadithReference(reference, label, url);
      const hadithGrade = isHadith ? this.inferHadithGrade(reference, label, url) : '';
      return {
        sourceBadge: sourceBadge || 'aggregated',
        isHadith,
        hadithGrade: isHadith ? hadithGrade || 'ungraded' : ''
      };
    },
    normalizeReferenceList(references) {
      if (!Array.isArray(references)) {
        return [];
      }
      const normalized = [];
      const seen = new Set();
      references.forEach(reference => {
        if (typeof reference === 'string') {
          const _label = this.sanitizeReferenceLabel(reference.trim(), null);
          if (!_label) {
            return;
          }
          const _key = _label.toLowerCase();
          if (seen.has(_key)) {
            return;
          }
          seen.add(_key);
          normalized.push(_objectSpread({
            label: _label.slice(0, 180),
            url: null
          }, this.buildReferenceMetadata({}, _label, null)));
          return;
        }
        if (!reference || typeof reference !== 'object') {
          return;
        }
        const label = String(reference.label || reference.reference || reference.title || reference.name || '').trim();
        const url = this.normalizeResponseUrl(reference.url || reference.link || reference.href || null);
        const cleanedLabel = this.sanitizeReferenceLabel(label, url);
        if (!cleanedLabel) {
          return;
        }
        const key = `${cleanedLabel.toLowerCase()}|${(url || '').toLowerCase()}`;
        if (seen.has(key)) {
          return;
        }
        seen.add(key);
        normalized.push(_objectSpread({
          label: cleanedLabel.slice(0, 180),
          url
        }, this.buildReferenceMetadata(reference, cleanedLabel, url)));
      });
      return normalized.slice(0, 2);
    },
    isLikelyQuranReference(reference = {}) {
      if (!reference || typeof reference !== 'object') {
        return false;
      }
      if (reference.isHadith) {
        return false;
      }
      const label = String(reference.label || '').toLowerCase();
      const url = String(reference.url || '').toLowerCase();
      const host = this.extractReferenceHostname(reference.url || '');
      if (this.extractVerseKey(`${label} ${url}`)) {
        return true;
      }
      if (/\b(surah|ayah|quran|qur'an|verse)\b/.test(label)) {
        return true;
      }
      const quranHosts = ['quran.com', 'api.quran.com', 'alquran.cloud', 'quran.gading.dev', 'quranenc.com'];
      return quranHosts.some(domain => host === domain || host.endsWith(`.${domain}`));
    },
    filterQuranOnlyReferences(references = []) {
      const normalized = this.normalizeReferenceList(references);
      if (!normalized.length) {
        return [];
      }
      const quranOnly = normalized.filter(reference => this.isLikelyQuranReference(reference));
      if (quranOnly.length) {
        return quranOnly.slice(0, 2);
      }
      return normalized.filter(reference => !reference.isHadith).slice(0, 1);
    },
    stripHadithLeakageFromMessage(message = '') {
      const paragraphs = this.extractAssistantParagraphs(message);
      if (!paragraphs.length) {
        return '';
      }
      const sanitized = [];
      paragraphs.forEach(paragraph => {
        const chunks = this.splitAssistantParagraphByContentMarkers(paragraph);
        chunks.forEach(chunk => {
          const cleanedChunk = String(chunk || '').replace(/[ \t]{2,}/g, ' ').trim();
          if (!cleanedChunk || this.hasHadithCue(cleanedChunk)) {
            return;
          }
          const withoutLeak = cleanedChunk.replace(/\s*(["“”'`])?\s*(while i was walking|one day allah['’`]?s messenger|allah['’`]?s messenger|messenger of allah|the prophet|narrated|reported|it was narrated)\b[\s\S]*$/i, '').replace(/[ \t]{2,}/g, ' ').trim();
          const normalized = this.cleanupTrailingFragment(withoutLeak).replace(/^["“”'`\s]+/, '').trim();
          if (normalized && !this.hasHadithCue(normalized)) {
            sanitized.push(normalized);
          }
        });
      });
      if (!sanitized.length) {
        return '';
      }
      const deduped = [];
      sanitized.forEach(item => {
        const key = item.toLowerCase();
        if (deduped.some(existing => existing.toLowerCase() === key)) {
          return;
        }
        deduped.push(item);
      });
      return deduped.join('\n\n').trim();
    },
    buildQuranOnlyFallbackMessage(references = []) {
      const firstQuranReference = this.filterQuranOnlyReferences(references)[0];
      if (firstQuranReference !== null && firstQuranReference !== void 0 && firstQuranReference.label) {
        return `Referenced Quran guidance: ${firstQuranReference.label}.`;
      }
      return '';
    },
    normalizeAssistantMessageForDisplay(message = '', references = []) {
      const improved = this.improveAssistantMessageReadability(message);
      if (!AI_QURAN_ONLY_MODE) {
        return improved;
      }
      const stripped = this.stripHadithLeakageFromMessage(improved);
      const fallback = this.buildQuranOnlyFallbackMessage(references);
      if (!stripped && this.hasHadithCue(improved)) {
        return fallback || 'I could not extract a Quran-only answer from the available references.';
      }
      return this.firstNonEmptyString([stripped, fallback, improved]).trim();
    },
    normalizeSummaryList(summary) {
      if (!Array.isArray(summary)) {
        return [];
      }
      return summary.map(item => String(item || '').trim()).filter(Boolean).slice(0, 4);
    },
    normalizeVerificationPayload(verification, fallbackSourceCount = 0) {
      if (!verification || typeof verification !== 'object') {
        return {
          verified: false,
          confidence: fallbackSourceCount > 1 ? 'medium' : 'low',
          totalSources: Number(fallbackSourceCount || 0),
          message: ''
        };
      }
      const confidence = String(verification.confidence || 'low').toLowerCase();
      const safeConfidence = ['high', 'medium', 'low'].includes(confidence) ? confidence : 'low';
      const criticalHashes = verification.criticalHashes && typeof verification.criticalHashes === 'object' ? {
        checked: Number(verification.criticalHashes.checked || 0),
        passed: Number(verification.criticalHashes.passed || 0),
        failed: Number(verification.criticalHashes.failed || 0),
        unresolved: Number(verification.criticalHashes.unresolved || 0)
      } : null;
      const displayedSourceCount = Number(fallbackSourceCount || 0);
      const incomingSourceCount = Number(verification.totalSources || 0);
      const totalSources = displayedSourceCount > 0 ? displayedSourceCount : incomingSourceCount;
      return {
        verified: Boolean(verification.verified),
        confidence: safeConfidence,
        totalSources: Number(totalSources || 0),
        message: String(verification.message || '').trim(),
        criticalHashes
      };
    },
    buildNetworkErrorMessage(status, payload, rawText) {
      var _payload$assistant;
      const statusHint = status ? `Request failed (${status}).` : '';
      const fallbackText = this.normalizeAssistantMessageFallback(rawText);
      const message = this.firstNonEmptyString([payload === null || payload === void 0 ? void 0 : payload.error, payload === null || payload === void 0 ? void 0 : payload.message, payload === null || payload === void 0 || (_payload$assistant = payload.assistant) === null || _payload$assistant === void 0 ? void 0 : _payload$assistant.error, statusHint, fallbackText]);
      return this.improveAssistantMessageReadability(message || 'Noor cannot respond right now.');
    },
    normalizeAssistantMessageFallback(rawText) {
      if (typeof rawText !== 'string') {
        return '';
      }
      const plain = this.toPlainText(rawText).replace(/\s+/g, ' ').trim();
      if (!plain) {
        return '';
      }
      return this.improveAssistantMessageReadability(plain).slice(0, 2800);
    },
    normalizeAssistantPayload(payload, rawText = '') {
      var _root$data, _root$result, _root$response, _root$data2, _root$data3, _root$data4, _root$data5, _root$data6, _root$data7;
      const root = payload && typeof payload === 'object' ? payload : {};
      const assistantCandidates = [root.assistant, (_root$data = root.data) === null || _root$data === void 0 ? void 0 : _root$data.assistant, (_root$result = root.result) === null || _root$result === void 0 ? void 0 : _root$result.assistant, (_root$response = root.response) === null || _root$response === void 0 ? void 0 : _root$response.assistant];
      const assistant = assistantCandidates.find(item => item && typeof item === 'object') || {};
      const message = this.firstNonEmptyString([assistant.message, assistant.answer, assistant.text, root.message, root.answer, (_root$data2 = root.data) === null || _root$data2 === void 0 ? void 0 : _root$data2.message, (_root$data3 = root.data) === null || _root$data3 === void 0 ? void 0 : _root$data3.answer, this.normalizeAssistantMessageFallback(rawText)]);
      const referenceCandidates = [assistant.references, assistant.sources, root.references, root.sources, (_root$data4 = root.data) === null || _root$data4 === void 0 ? void 0 : _root$data4.references];
      let references = [];
      for (const candidate of referenceCandidates) {
        const normalized = this.normalizeReferenceList(candidate);
        if (normalized.length) {
          references = normalized;
          break;
        }
      }
      if (AI_QURAN_ONLY_MODE) {
        references = this.filterQuranOnlyReferences(references);
      }
      const summaryCandidates = [assistant.summary, root.summary, (_root$data5 = root.data) === null || _root$data5 === void 0 ? void 0 : _root$data5.summary];
      let summary = [];
      for (const candidate of summaryCandidates) {
        const normalized = this.normalizeSummaryList(candidate);
        if (normalized.length) {
          summary = normalized;
          break;
        }
      }
      const verification = this.normalizeVerificationPayload(assistant.verification || root.verification || ((_root$data6 = root.data) === null || _root$data6 === void 0 ? void 0 : _root$data6.verification) || null, references.length);
      return {
        session_id: this.firstNonEmptyString([root.session_id, root.sessionId, (_root$data7 = root.data) === null || _root$data7 === void 0 ? void 0 : _root$data7.session_id]),
        assistant: {
          message: this.normalizeAssistantMessageForDisplay(message, references),
          references,
          summary,
          verification
        }
      };
    },
    buildResponseCacheKey(message, language = 'en') {
      const normalizedMessage = String(message || '').toLowerCase().replace(/\s+/g, ' ').trim();
      const normalizedLanguage = String(language || 'en').toLowerCase();
      const seed = `${normalizedLanguage}|${normalizedMessage}`;
      let hash = 2166136261;
      for (let index = 0; index < seed.length; index += 1) {
        hash ^= seed.charCodeAt(index);
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
      }
      return `k-${(hash >>> 0).toString(16)}`;
    },
    readAiResponseCache() {
      if (typeof window === 'undefined') {
        return {};
      }
      try {
        const parsed = JSON.parse(window.localStorage.getItem(AI_ASSISTANT_RESPONSE_CACHE_KEY) || '{}');
        return parsed && typeof parsed === 'object' ? parsed : {};
      } catch (error) {
        return {};
      }
    },
    writeAiResponseCache(cache) {
      if (typeof window === 'undefined') {
        return;
      }
      try {
        window.localStorage.setItem(AI_ASSISTANT_RESPONSE_CACHE_KEY, JSON.stringify(cache || {}));
      } catch (error) {
        if (!this.isQuotaExceededError(error)) {
          console.warn('Unable to save AI response cache', error);
        }
      }
    },
    cacheAssistantPayload(message, language, payload) {
      var _payload$assistant2;
      if (typeof window === 'undefined' || !(payload !== null && payload !== void 0 && (_payload$assistant2 = payload.assistant) !== null && _payload$assistant2 !== void 0 && _payload$assistant2.message)) {
        return;
      }
      const cacheKey = this.buildResponseCacheKey(message, language);
      const cache = this.readAiResponseCache();
      cache[cacheKey] = {
        savedAt: Date.now(),
        payload: this.clonePlainData(payload)
      };
      const now = Date.now();
      const trimmedEntries = Object.entries(cache).filter(([, entry]) => {
        const age = now - Number((entry === null || entry === void 0 ? void 0 : entry.savedAt) || 0);
        return age >= 0 && age <= AI_ASSISTANT_RESPONSE_CACHE_TTL_MS;
      }).sort((a, b) => {
        var _b$, _a$;
        return Number(((_b$ = b[1]) === null || _b$ === void 0 ? void 0 : _b$.savedAt) || 0) - Number(((_a$ = a[1]) === null || _a$ === void 0 ? void 0 : _a$.savedAt) || 0);
      }).slice(0, AI_ASSISTANT_RESPONSE_CACHE_LIMIT);
      const compacted = {};
      trimmedEntries.forEach(([key, value]) => {
        compacted[key] = value;
      });
      this.writeAiResponseCache(compacted);
    },
    getCachedAssistantPayload(message, language) {
      if (typeof window === 'undefined') {
        return null;
      }
      const cacheKey = this.buildResponseCacheKey(message, language);
      const cache = this.readAiResponseCache();
      const entry = cache[cacheKey];
      if (!(entry !== null && entry !== void 0 && entry.payload)) {
        return null;
      }
      const age = Date.now() - Number(entry.savedAt || 0);
      if (age < 0 || age > AI_ASSISTANT_RESPONSE_CACHE_TTL_MS) {
        delete cache[cacheKey];
        this.writeAiResponseCache(cache);
        return null;
      }
      return this.clonePlainData(entry.payload);
    },
    buildOfflineAssistantPayload(cachedPayload) {
      var _cachedPayload$assist;
      if (!(cachedPayload !== null && cachedPayload !== void 0 && (_cachedPayload$assist = cachedPayload.assistant) !== null && _cachedPayload$assist !== void 0 && _cachedPayload$assist.message)) {
        return null;
      }
      const normalized = this.normalizeAssistantPayload(cachedPayload);
      const note = 'Offline mode: showing your latest cached verified response.';
      const verification = this.normalizeVerificationPayload(normalized.assistant.verification, normalized.assistant.references.length);
      verification.message = this.firstNonEmptyString([verification.message, note]);
      if (verification.confidence === 'low' && normalized.assistant.references.length > 0) {
        verification.confidence = 'medium';
      }
      normalized.assistant.verification = verification;
      if (!normalized.assistant.message.toLowerCase().includes('offline mode')) {
        normalized.assistant.message = `${normalized.assistant.message}\n\n${note}`;
      }
      if (!normalized.session_id) {
        normalized.session_id = this.sessionId || this.resetSession();
      }
      return normalized;
    },
    async parseFetchResponseBody(response) {
      var _response$headers;
      const contentType = ((response === null || response === void 0 || (_response$headers = response.headers) === null || _response$headers === void 0 ? void 0 : _response$headers.get('content-type')) || '').toLowerCase();
      let rawText = '';
      try {
        rawText = await response.clone().text();
      } catch (error) {
        rawText = '';
      }
      const payload = this.safeJsonParse(rawText);
      return {
        contentType,
        rawText,
        payload: payload || {}
      };
    },
    extractVerseKey(value = '') {
      const stringValue = String(value || '');
      const match = stringValue.match(/(\d{1,3})\s*[:/]\s*(\d{1,3})/);
      if (!match) {
        return null;
      }
      const surah = Number(match[1]);
      const ayah = Number(match[2]);
      if (!surah || !ayah) {
        return null;
      }
      return `${surah}:${ayah}`;
    },
    extractQuranVerseKeys(references = []) {
      const keys = new Set();
      this.normalizeReferenceList(references).forEach(reference => {
        const labelKey = this.extractVerseKey(reference.label);
        if (labelKey) {
          keys.add(labelKey);
        }
        const url = String(reference.url || '');
        const urlColonMatch = url.match(/quran\.com\/(\d{1,3}:\d{1,3})/i) || url.match(/ayah\/(\d{1,3}:\d{1,3})/i);
        if (urlColonMatch !== null && urlColonMatch !== void 0 && urlColonMatch[1]) {
          const normalized = this.extractVerseKey(urlColonMatch[1]);
          if (normalized) {
            keys.add(normalized);
          }
        }
        const urlSlashMatch = url.match(/quran\.com\/(\d{1,3})\/(\d{1,3})/i);
        if (urlSlashMatch !== null && urlSlashMatch !== void 0 && urlSlashMatch[1] && urlSlashMatch !== null && urlSlashMatch !== void 0 && urlSlashMatch[2]) {
          keys.add(`${Number(urlSlashMatch[1])}:${Number(urlSlashMatch[2])}`);
        }
      });
      return Array.from(keys);
    },
    normalizeArabicForHash(value = '') {
      return String(value || '').normalize('NFKD').replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '').replace(/\u0640/g, '').replace(/[إأآٱ]/g, 'ا').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/[^\u0621-\u063A\u0641-\u064A0-9]/g, '').toLowerCase();
    },
    fallbackStringHash(value = '') {
      const input = String(value || '');
      let hash = 5381;
      for (let index = 0; index < input.length; index += 1) {
        hash = (hash << 5) + hash + input.charCodeAt(index);
      }
      return `fallback-${(hash >>> 0).toString(16)}`;
    },
    async hashStringSHA256(value = '') {
      var _window$crypto;
      const source = String(value || '');
      if (!source) {
        return '';
      }
      if (typeof window === 'undefined' || !((_window$crypto = window.crypto) !== null && _window$crypto !== void 0 && _window$crypto.subtle) || typeof TextEncoder === 'undefined') {
        return this.fallbackStringHash(source);
      }
      try {
        const bytes = new TextEncoder().encode(source);
        const digest = await window.crypto.subtle.digest('SHA-256', bytes);
        return Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, '0')).join('');
      } catch (error) {
        return this.fallbackStringHash(source);
      }
    },
    readCriticalVerseHashCache() {
      if (typeof window === 'undefined') {
        return null;
      }
      try {
        const parsed = JSON.parse(window.localStorage.getItem(AI_CRITICAL_VERSE_HASH_CACHE_KEY) || 'null');
        if (!parsed || typeof parsed !== 'object') {
          return null;
        }
        if (!parsed.hashes || typeof parsed.hashes !== 'object') {
          return null;
        }
        return parsed;
      } catch (error) {
        return null;
      }
    },
    writeCriticalVerseHashCache(hashes) {
      if (typeof window === 'undefined') {
        return;
      }
      try {
        window.localStorage.setItem(AI_CRITICAL_VERSE_HASH_CACHE_KEY, JSON.stringify({
          updatedAt: Date.now(),
          hashes
        }));
      } catch (error) {
        if (!this.isQuotaExceededError(error)) {
          console.warn('Unable to save critical hash cache', error);
        }
      }
    },
    async ensureCriticalVerseHashMap() {
      if (Object.keys(this.criticalVerseHashMap || {}).length > 0) {
        return this.criticalVerseHashMap;
      }
      const cached = this.readCriticalVerseHashCache();
      if (cached !== null && cached !== void 0 && cached.updatedAt && Date.now() - Number(cached.updatedAt) < AI_CRITICAL_VERSE_HASH_TTL_MS) {
        this.criticalVerseHashMap = cached.hashes || {};
        if (Object.keys(this.criticalVerseHashMap).length > 0) {
          return this.criticalVerseHashMap;
        }
      }
      const hashes = {};
      const entries = Object.entries(AI_CRITICAL_VERSE_CANONICAL_TEXTS);
      for (const [verseKey, verseText] of entries) {
        hashes[verseKey] = await this.hashStringSHA256(this.normalizeArabicForHash(verseText));
      }
      this.criticalVerseHashMap = hashes;
      this.writeCriticalVerseHashCache(hashes);
      return hashes;
    },
    readVerseVerificationCache() {
      if (typeof window === 'undefined') {
        return {};
      }
      try {
        const parsed = JSON.parse(window.localStorage.getItem(AI_VERSE_VERIFICATION_CACHE_KEY) || '{}');
        return parsed && typeof parsed === 'object' ? parsed : {};
      } catch (error) {
        return {};
      }
    },
    writeVerseVerificationCache(cache) {
      if (typeof window === 'undefined') {
        return;
      }
      try {
        window.localStorage.setItem(AI_VERSE_VERIFICATION_CACHE_KEY, JSON.stringify(cache || {}));
      } catch (error) {
        if (!this.isQuotaExceededError(error)) {
          console.warn('Unable to save verse verification cache', error);
        }
      }
    },
    getCachedVerseVerification(verseKey) {
      const cache = this.readVerseVerificationCache();
      const entry = cache[verseKey];
      if (!entry) {
        return null;
      }
      const age = Date.now() - Number(entry.checkedAt || 0);
      if (age < 0 || age > AI_VERSE_VERIFICATION_CACHE_TTL_MS) {
        delete cache[verseKey];
        this.writeVerseVerificationCache(cache);
        return null;
      }
      return entry;
    },
    setCachedVerseVerification(verseKey, value) {
      if (!verseKey || !value) {
        return;
      }
      const cache = this.readVerseVerificationCache();
      cache[verseKey] = _objectSpread(_objectSpread({}, value), {}, {
        checkedAt: Date.now()
      });
      this.writeVerseVerificationCache(cache);
    },
    resolveVerseTextFromPayload(payload, rawText = '') {
      var _payload$verse, _payload$verse2, _payload$verse3, _payload$verse4, _payload$data, _payload$data2, _payload$data3, _payload$data4, _payload$data5, _payload$result;
      const candidates = [payload === null || payload === void 0 || (_payload$verse = payload.verse) === null || _payload$verse === void 0 ? void 0 : _payload$verse.text_uthmani, payload === null || payload === void 0 || (_payload$verse2 = payload.verse) === null || _payload$verse2 === void 0 ? void 0 : _payload$verse2.text_uthmani_simple, payload === null || payload === void 0 || (_payload$verse3 = payload.verse) === null || _payload$verse3 === void 0 ? void 0 : _payload$verse3.text_imlaei, payload === null || payload === void 0 || (_payload$verse4 = payload.verse) === null || _payload$verse4 === void 0 ? void 0 : _payload$verse4.text, payload === null || payload === void 0 || (_payload$data = payload.data) === null || _payload$data === void 0 ? void 0 : _payload$data.text_uthmani, payload === null || payload === void 0 || (_payload$data2 = payload.data) === null || _payload$data2 === void 0 ? void 0 : _payload$data2.text, payload === null || payload === void 0 || (_payload$data3 = payload.data) === null || _payload$data3 === void 0 ? void 0 : _payload$data3.arab, payload === null || payload === void 0 || (_payload$data4 = payload.data) === null || _payload$data4 === void 0 || (_payload$data4 = _payload$data4.ayah) === null || _payload$data4 === void 0 ? void 0 : _payload$data4.text, payload === null || payload === void 0 || (_payload$data5 = payload.data) === null || _payload$data5 === void 0 || (_payload$data5 = _payload$data5.text) === null || _payload$data5 === void 0 ? void 0 : _payload$data5.arab, payload === null || payload === void 0 || (_payload$result = payload.result) === null || _payload$result === void 0 ? void 0 : _payload$result.text];
      const text = this.firstNonEmptyString(candidates);
      if (text) {
        return this.toPlainText(text).replace(/\s+/g, ' ').trim();
      }
      const plainFallback = this.normalizeAssistantMessageFallback(rawText);
      return plainFallback || '';
    },
    async fetchVerseTextWithFallback(verseKey) {
      const [surah, ayah] = String(verseKey || '').split(':');
      if (!surah || !ayah) {
        return null;
      }
      const endpoints = [`https://api.quran.com/api/v4/verses/by_key/${verseKey}?words=false&fields=text_uthmani`, `https://api.alquran.cloud/v1/ayah/${verseKey}`, `https://api.quran.gading.dev/ayah/${surah}/${ayah}`];
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              Accept: 'application/json, text/plain, */*'
            }
          });
          if (!response.ok) {
            continue;
          }
          const parsed = await this.parseFetchResponseBody(response);
          const verseText = this.resolveVerseTextFromPayload(parsed.payload, parsed.rawText);
          if (verseText) {
            return {
              verseText,
              source: endpoint
            };
          }
        } catch (error) {
          // Continue through fallback chain.
        }
      }
      return null;
    },
    async verifyCriticalVerseHash(verseKey) {
      if (!AI_CRITICAL_VERSE_CANONICAL_TEXTS[verseKey]) {
        return null;
      }
      const cached = this.getCachedVerseVerification(verseKey);
      if (cached && ['pass', 'fail', 'unresolved'].includes(cached.status)) {
        return cached;
      }
      const expectedHashes = await this.ensureCriticalVerseHashMap();
      const expectedHash = expectedHashes === null || expectedHashes === void 0 ? void 0 : expectedHashes[verseKey];
      if (!expectedHash) {
        return {
          verseKey,
          status: 'unresolved'
        };
      }
      const fetched = await this.fetchVerseTextWithFallback(verseKey);
      if (!(fetched !== null && fetched !== void 0 && fetched.verseText)) {
        const unresolved = {
          verseKey,
          status: 'unresolved'
        };
        this.setCachedVerseVerification(verseKey, unresolved);
        return unresolved;
      }
      const computedHash = await this.hashStringSHA256(this.normalizeArabicForHash(fetched.verseText));
      const status = computedHash === expectedHash ? 'pass' : 'fail';
      const result = {
        verseKey,
        status,
        source: fetched.source
      };
      this.setCachedVerseVerification(verseKey, result);
      return result;
    },
    async verifyEntryCriticalVerses(entry) {
      if (!entry) {
        return;
      }
      if (!Array.isArray(entry.references) || !entry.references.length) {
        entry.verification = this.normalizeVerificationPayload((entry === null || entry === void 0 ? void 0 : entry.verification) || null);
        return;
      }
      const criticalVerseKeys = this.extractQuranVerseKeys(entry.references).filter(key => Boolean(AI_CRITICAL_VERSE_CANONICAL_TEXTS[key]));
      const baseVerification = this.normalizeVerificationPayload(entry.verification, entry.references.length);
      if (!criticalVerseKeys.length) {
        entry.verification = baseVerification;
        return;
      }
      const checks = await Promise.all(criticalVerseKeys.map(verseKey => this.verifyCriticalVerseHash(verseKey)));
      const checked = checks.filter(item => item && (item.status === 'pass' || item.status === 'fail'));
      const passed = checked.filter(item => item.status === 'pass');
      const failed = checked.filter(item => item.status === 'fail');
      const unresolved = checks.filter(item => item && item.status === 'unresolved');
      const verification = _objectSpread(_objectSpread({}, baseVerification), {}, {
        criticalHashes: {
          checked: checked.length,
          passed: passed.length,
          failed: failed.length,
          unresolved: unresolved.length
        }
      });
      if (failed.length > 0) {
        verification.verified = false;
        verification.confidence = 'low';
        const failureKeys = failed.map(item => item.verseKey).join(', ');
        const warning = `Critical verse hash check failed for ${failureKeys}.`;
        verification.message = this.firstNonEmptyString([verification.message, warning]);
      } else if (checked.length > 0 && verification.confidence === 'low') {
        verification.confidence = 'medium';
      }
      entry.verification = verification;
      this.syncCurrentSessionHistory();
    },
    async registerAiServiceWorker() {
      if (typeof window === 'undefined' || typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
        return;
      }
      const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
      if (isLocalhost) {
        try {
          const registrations = await navigator.serviceWorker.getRegistrations();
          await Promise.all(registrations.filter(registration => {
            var _registration$active, _registration$waiting, _registration$install;
            const scriptUrl = ((_registration$active = registration.active) === null || _registration$active === void 0 ? void 0 : _registration$active.scriptURL) || ((_registration$waiting = registration.waiting) === null || _registration$waiting === void 0 ? void 0 : _registration$waiting.scriptURL) || ((_registration$install = registration.installing) === null || _registration$install === void 0 ? void 0 : _registration$install.scriptURL) || '';
            return scriptUrl.includes(AI_ASSISTANT_SW_PATH);
          }).map(registration => registration.unregister()));
        } catch (error) {
          console.warn('Unable to unregister local AI service worker', error);
        }
        if (typeof caches !== 'undefined' && typeof caches.keys === 'function') {
          try {
            const cacheKeys = await caches.keys();
            await Promise.all(cacheKeys.filter(key => key.startsWith('ic-ai-') || key.startsWith('islamic-connect-ai-')).map(key => caches.delete(key)));
          } catch (error) {
            console.warn('Unable to clear local AI caches', error);
          }
        }
        this.serviceWorkerRegistration = null;
        return;
      }
      if (!isLocalhost && window.location.protocol !== 'https:') {
        return;
      }
      try {
        this.serviceWorkerRegistration = await navigator.serviceWorker.register(AI_ASSISTANT_SW_PATH, {
          scope: '/'
        });
      } catch (error) {
        console.warn('AI assistant service worker registration failed', error);
      }
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
      const message = this.chatDraft.trim().slice(0, CHAT_DRAFT_MAX_LENGTH);
      if (!message) return;
      this.chatError = null;
      if (!this.isIslamicQuestion(message)) {
        this.showCopyNotice('Tip: Noor works best with Quran, Sunnah, and Islamic practice questions.');
      }
      this.chatDraft = '';
      this.$nextTick(() => this.autoResizeComposer());
      this.chatHistory.push(this.createChatEntry('user', message));
      this.scrollChatWindow();
      this.scrollComponentToBottom();
      this.chatLoading = true;
      try {
        var _payload$assistant3;
        const payload = await this.postChatMessage(message);
        if (!(payload !== null && payload !== void 0 && (_payload$assistant3 = payload.assistant) !== null && _payload$assistant3 !== void 0 && _payload$assistant3.message)) {
          throw new Error('Noor cannot respond right now.');
        }
        const normalizedPayload = this.normalizeAssistantPayload(payload);
        const assistantData = normalizedPayload.assistant;
        const assistantEntry = this.createChatEntry('assistant', assistantData.message.trim(), assistantData.references, assistantData.summary, assistantData.verification);
        this.chatHistory.push(assistantEntry);
        if (normalizedPayload.session_id) {
          this.sessionId = normalizedPayload.session_id;
        }
        this.syncCurrentSessionHistory();
        this.scrollChatWindow();
        this.scrollComponentToBottom();
        this.verifyEntryCriticalVerses(assistantEntry).catch(error => {
          console.warn('Critical verse hash verification skipped', error);
        });
      } catch (error) {
        console.error('Chat error:', error);
        this.chatError = (error === null || error === void 0 ? void 0 : error.message) || 'The assistant is temporarily unavailable.';
      } finally {
        this.chatLoading = false;
      }
    },
    async postChatMessage(message) {
      var _normalizedPayload$as;
      if (!message) {
        return null;
      }
      const language = this.getUserLanguage();
      const requestPayload = {
        question: message,
        session_id: this.sessionId || this.resetSession(),
        language
      };
      let response = null;
      try {
        response = await fetch('/api/ai/ask', {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, text/html, */*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': this.getCsrfToken()
          },
          body: JSON.stringify(requestPayload)
        });
      } catch (networkError) {
        const cachedPayload = this.getCachedAssistantPayload(message, language);
        if (cachedPayload) {
          return this.buildOfflineAssistantPayload(cachedPayload);
        }
        throw new Error('Noor is offline and no cached answer is available yet.');
      }
      const parsed = await this.parseFetchResponseBody(response);
      const normalizedPayload = this.normalizeAssistantPayload(parsed.payload, parsed.rawText);
      if (!response.ok) {
        const cachedPayload = this.getCachedAssistantPayload(message, language);
        if (cachedPayload) {
          return this.buildOfflineAssistantPayload(cachedPayload);
        }
        throw new Error(this.buildNetworkErrorMessage(response.status, parsed.payload, parsed.rawText));
      }
      if (!(normalizedPayload !== null && normalizedPayload !== void 0 && (_normalizedPayload$as = normalizedPayload.assistant) !== null && _normalizedPayload$as !== void 0 && _normalizedPayload$as.message)) {
        const cachedPayload = this.getCachedAssistantPayload(message, language);
        if (cachedPayload) {
          return this.buildOfflineAssistantPayload(cachedPayload);
        }
        throw new Error('Unexpected server response. Please refresh and try again.');
      }
      if (!normalizedPayload.session_id) {
        normalizedPayload.session_id = requestPayload.session_id;
      }
      this.cacheAssistantPayload(message, language, normalizedPayload);
      return normalizedPayload;
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
    clearDraft() {
      this.chatDraft = '';
      this.chatError = null;
      this.$nextTick(() => this.autoResizeComposer());
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
      const label = String(reference.label || reference.reference || reference.title || reference.name || '').trim();
      const normalizedUrl = this.normalizeResponseUrl(reference.url || reference.link || reference.href || null);
      const cleanedLabel = this.sanitizeReferenceLabel(label, normalizedUrl);
      if (!cleanedLabel) {
        return null;
      }
      const metadata = this.buildReferenceMetadata(reference, cleanedLabel, normalizedUrl);
      const sourceBadge = this.normalizeSourceBadge(reference.sourceBadge || reference.source_badge || metadata.sourceBadge) || metadata.sourceBadge || 'aggregated';
      const explicitGrade = this.normalizeHadithGradeValue(reference.hadithGrade || reference.hadith_grade || reference.grade || reference.grading || '');
      const isHadith = Boolean(reference.isHadith || reference.is_hadith || metadata.isHadith || explicitGrade);
      const hadithGrade = isHadith ? explicitGrade || metadata.hadithGrade || 'ungraded' : '';
      return {
        label: cleanedLabel.slice(0, 180),
        url: normalizedUrl,
        sourceBadge,
        isHadith,
        hadithGrade
      };
    },
    normalizeStoredVerification(verification, fallbackSourceCount = 0) {
      if (!verification || typeof verification !== 'object') {
        return null;
      }
      const normalized = this.normalizeVerificationPayload(verification, fallbackSourceCount);
      return {
        verified: Boolean(normalized.verified),
        confidence: String(normalized.confidence || 'low'),
        totalSources: Number(normalized.totalSources || 0),
        message: String(normalized.message || ''),
        criticalHashes: normalized.criticalHashes ? {
          checked: Number(normalized.criticalHashes.checked || 0),
          passed: Number(normalized.criticalHashes.passed || 0),
          failed: Number(normalized.criticalHashes.failed || 0),
          unresolved: Number(normalized.criticalHashes.unresolved || 0)
        } : null
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
      let references = options.keepReferences ? Array.isArray(entry.references) ? entry.references.map(item => this.normalizeStoredReference(item)).filter(Boolean).slice(0, 2) : [] : [];
      let text = rawText;
      if (role === 'assistant' && AI_QURAN_ONLY_MODE) {
        references = this.filterQuranOnlyReferences(references);
        text = this.normalizeAssistantMessageForDisplay(text, references);
      }
      const summaryBullets = options.keepSummary ? Array.isArray(entry.summaryBullets) ? entry.summaryBullets.map(item => String(item || '').trim()).filter(Boolean).slice(0, 3) : this.extractSummaryBulletPoints(text) : [];
      const verification = this.normalizeStoredVerification(entry.verification, references.length);
      const time = this.formatEntryTime(entry.time);
      return {
        entryKey: this.getEntryKey(entry),
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
      const rawText = typeof entry.text === 'string' ? entry.text.trim() : '';
      const entryKey = typeof entry.entryKey === 'string' && entry.entryKey.trim() ? entry.entryKey.trim() : this.createEntryKey(role, entry.time || `${Date.now()}`);
      let text = rawText;
      if (!text) {
        return null;
      }
      const time = this.formatEntryTime(entry.time);
      let references = Array.isArray(entry.references) ? entry.references.map(item => this.normalizeStoredReference(item)).filter(Boolean).slice(0, 2) : [];
      if (role === 'assistant' && AI_QURAN_ONLY_MODE) {
        references = this.filterQuranOnlyReferences(references);
        text = this.normalizeAssistantMessageForDisplay(text, references);
        if (!text) {
          return null;
        }
      }
      const summaryBullets = Array.isArray(entry.summaryBullets) ? entry.summaryBullets.map(item => String(item || '').trim()).filter(Boolean).slice(0, 4) : this.extractSummaryBulletPoints(text);
      const allowCollapse = role !== 'assistant' && summaryBullets.length > 0 && this.isLongMessage(text);
      return {
        entryKey,
        role,
        text,
        references,
        summaryBullets,
        allowCollapse,
        collapsed: allowCollapse && this.isCompactMode,
        userToggled: false,
        speechControlsVisible: false,
        speechStatus: 'stopped',
        verification: this.normalizeStoredVerification(entry.verification, references.length),
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
      this.closeReportModal();
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
      const changed = this.isCompactMode !== isCompact;
      if (changed) {
        this.isCompactMode = isCompact;
      }
      if (isCompact && !this.sidebarCollapsed) {
        this.sidebarCollapsed = true;
      }
    },
    adjustViewportLayout() {
      var _root$style, _document$documentEle;
      if (typeof window === 'undefined') {
        return;
      }
      const root = this.$refs.aiRoot;
      if (!root || typeof ((_root$style = root.style) === null || _root$style === void 0 ? void 0 : _root$style.setProperty) !== 'function') {
        return;
      }
      const rect = root.getBoundingClientRect();
      const viewportHeight = window.innerHeight || ((_document$documentEle = document.documentElement) === null || _document$documentEle === void 0 ? void 0 : _document$documentEle.clientHeight) || 0;
      const availableHeight = Math.max(320, viewportHeight - Math.max(0, rect.top) - 6);
      root.style.setProperty('--ai-gpt-available-height', `${availableHeight}px`);
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
    this.$nextTick(() => {
      this.autoResizeComposer();
      this.adjustViewportLayout();
    });
    this.initializeSpeechSynthesis();
    this.initializeQuestionBank();
    this.registerAiServiceWorker();
    this.ensureCriticalVerseHashMap().catch(error => {
      console.warn('Unable to precompute critical verse hashes', error);
    });
    this.attachAiTestHarness();
    this.resizeListener = () => {
      this.updateCompactMode();
      this.adjustViewportLayout();
    };
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
    if (typeof document !== 'undefined') {
      document.body.classList.remove('ai-disclaimer-open');
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AiComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_AiComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_AiComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/vue/AiComponent.vue */ "./resources/components/vue/AiComponent.vue");


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
  class: "ai-section ai-gpt",
  ref: "aiRoot",
  "aria-label": "Islamic chatbot"
};
const _hoisted_2 = {
  class: "ai-gpt-sidebar",
  "aria-label": "Saved chats"
};
const _hoisted_3 = {
  class: "ai-gpt-sidebar-top"
};
const _hoisted_4 = ["aria-label"];
const _hoisted_5 = ["disabled"];
const _hoisted_6 = {
  class: "ai-gpt-sidebar-head"
};
const _hoisted_7 = ["disabled"];
const _hoisted_8 = {
  key: 0,
  class: "ai-gpt-inline-alert",
  role: "alert"
};
const _hoisted_9 = {
  class: "ai-gpt-inline-actions"
};
const _hoisted_10 = {
  class: "ai-gpt-session-list",
  role: "listbox",
  "aria-label": "Saved chats"
};
const _hoisted_11 = ["onClick"];
const _hoisted_12 = {
  class: "ai-gpt-session-title"
};
const _hoisted_13 = {
  class: "ai-gpt-session-time"
};
const _hoisted_14 = ["onClick"];
const _hoisted_15 = {
  key: 0,
  class: "ai-gpt-session-empty mb-0"
};
const _hoisted_16 = {
  key: 1,
  class: "ai-gpt-inline-alert ai-gpt-inline-alert--warn",
  role: "alert"
};
const _hoisted_17 = {
  class: "ai-gpt-inline-actions"
};
const _hoisted_18 = {
  class: "ai-gpt-sidebar-foot"
};
const _hoisted_19 = ["disabled"];
const _hoisted_20 = {
  class: "ai-gpt-main"
};
const _hoisted_21 = {
  class: "ai-gpt-topbar"
};
const _hoisted_22 = {
  key: 0,
  class: "ai-copy-notice",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_23 = {
  key: 1,
  class: "ai-error-banner",
  role: "alert",
  "aria-live": "assertive",
  "aria-atomic": "true"
};
const _hoisted_24 = {
  class: "ai-error-message mb-0"
};
const _hoisted_25 = {
  ref: "chatShell",
  class: "ai-gpt-conversation"
};
const _hoisted_26 = {
  key: 0,
  class: "ai-gpt-empty",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_27 = {
  class: "ai-gpt-prompt-grid",
  role: "list",
  "aria-label": "Quick prompts"
};
const _hoisted_28 = ["disabled", "onClick"];
const _hoisted_29 = {
  class: "ai-gpt-prompt-label"
};
const _hoisted_30 = {
  class: "ai-gpt-prompt-text"
};
const _hoisted_31 = {
  key: 1,
  ref: "chatWindow",
  class: "ai-gpt-messages",
  role: "log",
  "aria-live": "polite"
};
const _hoisted_32 = {
  class: "ai-gpt-avatar",
  "aria-hidden": "true"
};
const _hoisted_33 = {
  class: "ai-gpt-message-block"
};
const _hoisted_34 = {
  class: "ai-gpt-message-meta"
};
const _hoisted_35 = {
  class: "ai-gpt-author"
};
const _hoisted_36 = {
  class: "ai-gpt-time"
};
const _hoisted_37 = ["innerHTML"];
const _hoisted_38 = {
  key: 0,
  class: "ai-gpt-message-actions"
};
const _hoisted_39 = ["disabled", "onClick"];
const _hoisted_40 = {
  key: 2,
  class: "chat-references-wrapper"
};
const _hoisted_41 = {
  class: "chat-references",
  role: "list"
};
const _hoisted_42 = {
  class: "chat-reference-main"
};
const _hoisted_43 = ["href"];
const _hoisted_44 = {
  class: "chat-reference-badges"
};
const _hoisted_45 = {
  key: 0,
  class: "ai-gpt-message-row assistant ai-gpt-message-row--typing",
  "aria-live": "polite"
};
const _hoisted_46 = {
  class: "ai-gpt-input-wrap"
};
const _hoisted_47 = ["disabled"];
const _hoisted_48 = ["disabled", "aria-label"];
const _hoisted_49 = ["disabled"];
const _hoisted_50 = {
  key: 0,
  class: "fas fa-paper-plane",
  "aria-hidden": "true"
};
const _hoisted_51 = {
  key: 1,
  class: "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
};
const _hoisted_52 = {
  class: "visually-hidden"
};
const _hoisted_53 = {
  class: "ai-disclaimer-modal-head"
};
const _hoisted_54 = {
  class: "ai-disclaimer-modal-foot"
};
const _hoisted_55 = {
  class: "ai-report-modal-head"
};
const _hoisted_56 = {
  class: "ai-report-field"
};
const _hoisted_57 = ["value"];
const _hoisted_58 = {
  class: "ai-report-field"
};
const _hoisted_59 = {
  class: "ai-report-preview-wrap"
};
const _hoisted_60 = {
  class: "ai-report-preview"
};
const _hoisted_61 = {
  key: 0,
  class: "ai-report-error mb-0",
  role: "alert"
};
const _hoisted_62 = {
  class: "ai-report-modal-foot"
};
const _hoisted_63 = ["disabled"];
const _hoisted_64 = ["disabled"];
const _hoisted_65 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-1",
  role: "status",
  "aria-hidden": "true"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['ai-gpt-shell', {
      'is-sidebar-collapsed': $data.sidebarCollapsed
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("aside", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-gpt-sidebar-toggle",
    "aria-label": $data.sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar',
    onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleSidebar && $options.toggleSidebar(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($data.sidebarCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left'),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_4)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-gpt-new-chat",
    disabled: $data.chatLoading,
    onClick: _cache[1] || (_cache[1] = (...args) => $options.startNewChat && $options.startNewChat(...args))
  }, [...(_cache[26] || (_cache[26] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-plus",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "New chat", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_5), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-0"
  }, "Recent chats", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-gpt-clear-all",
    disabled: !$data.chatSessions.length,
    onClick: _cache[2] || (_cache[2] = (...args) => $options.prepareClearAllSessions && $options.prepareClearAllSessions(...args))
  }, " Clear all ", 8 /* PROPS */, _hoisted_7)]), $data.pendingClearAll ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_8, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Delete all saved chats?", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[3] || (_cache[3] = (...args) => $options.cancelPendingClearAll && $options.cancelPendingClearAll(...args))
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-gpt-danger",
    onClick: _cache[4] || (_cache[4] = (...args) => $options.doClearAllSessions && $options.doClearAllSessions(...args))
  }, "Delete")])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.chatSessions, session => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: session.id,
      class: "ai-gpt-session-row"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['ai-gpt-session-item', {
        'is-active': session.id === $data.selectedSessionId
      }]),
      onClick: $event => $options.selectSessionFromList(session.id)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatSessionLabel(session)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatSessionTimestamp(session.updatedAt)), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_11), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "ai-gpt-session-delete",
      "aria-label": "Delete saved chat",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.prepareDeleteSession(session.id), ["stop"])
    }, [...(_cache[29] || (_cache[29] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-times",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_14)]);
  }), 128 /* KEYED_FRAGMENT */)), !$data.chatSessions.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_15, " No saved chats yet. ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), $data.pendingDeleteSessionId ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Delete “" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.pendingDeleteSessionLabel) + "”?", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[5] || (_cache[5] = (...args) => $options.cancelPendingDelete && $options.cancelPendingDelete(...args))
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-gpt-danger",
    onClick: _cache[6] || (_cache[6] = (...args) => $options.doDeleteSession && $options.doDeleteSession(...args))
  }, "Delete")])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-gpt-sidebar-btn",
    disabled: !$data.chatHistory.length,
    onClick: _cache[7] || (_cache[7] = (...args) => $options.clearHistory && $options.clearHistory(...args))
  }, [...(_cache[30] || (_cache[30] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-trash-alt",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Clear current", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_19)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_21, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ai-gpt-brand"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "ai-gpt-brand-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-star-and-crescent"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, "Noor AI Assistant"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Quran and Hadith grounded guidance with transparent references.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-gpt-trust-btn",
    onClick: _cache[8] || (_cache[8] = (...args) => $options.openDisclaimerModal && $options.openDisclaimerModal(...args))
  }, " Trust & disclaimer ")]), $data.copyNotice ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_22, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-check-circle me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.copyNotice), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.chatError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-exclamation-triangle ai-error-icon",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "ai-error-title mb-1"
  }, "Need some redirection?", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.chatError), 1 /* TEXT */), $data.sessionExpired ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "ai-error-clear mt-2",
    onClick: _cache[9] || (_cache[9] = (...args) => $options.reloadPage && $options.reloadPage(...args))
  }, " Reload page ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_25, [!$data.chatHistory.length && !$data.chatLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_26, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "How can Noor help today?", -1 /* CACHED */)), _cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Ask for Quran verses, hadith insights, and practical next steps for your day.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.quickPrompts, (prompt, promptIndex) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: `quick-prompt-${promptIndex}`,
      type: "button",
      class: "ai-gpt-prompt-card",
      disabled: $data.chatLoading,
      onClick: $event => $options.applyQuickPrompt(prompt.prompt)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prompt.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prompt.prompt), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_28);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.chatHistory.length || $data.chatLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_31, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.chatHistory, (entry, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: `chat-${idx}-${entry.role}`,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['ai-gpt-message-row', entry.role])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(entry.role === 'assistant' ? 'fas fa-star-and-crescent' : 'fas fa-user')
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.role === 'assistant' ? 'Noor' : 'You'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.displayTime) + " · " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.displayDate), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['ai-gpt-message-body', entry.role]),
      innerHTML: $options.formatChatText(entry.text, entry.role, entry.references)
    }, null, 10 /* CLASS, PROPS */, _hoisted_37), entry.role === 'assistant' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "ai-gpt-report-btn",
      disabled: $data.reportSubmitting && $data.reportTargetEntryKey === $options.getEntryKey(entry, idx),
      onClick: $event => $options.openReportModal(entry, idx)
    }, [...(_cache[37] || (_cache[37] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-flag",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Report", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_39)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), entry.role === 'assistant' && entry.verification ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 1,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['chat-verification', $options.getVerificationBadgeClass(entry.verification)]),
      "aria-live": "polite"
    }, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check-circle",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatVerificationLabel(entry.verification)), 1 /* TEXT */)], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), entry.references && entry.references.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_41, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(entry.references, (reference, refIndex) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: `ref-${idx}-${refIndex}-${reference.label}`
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_42, [reference.url ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
        key: 0,
        href: reference.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reference.label), 9 /* TEXT, PROPS */, _hoisted_43)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        key: 1
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reference.label), 1 /* TEXT */)], 64 /* STABLE_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['chat-reference-badge', $options.getSourceBadgeClass ? $options.getSourceBadgeClass(reference.sourceBadge) : 'chat-reference-badge--aggregated'])
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatSourceBadge ? $options.formatSourceBadge(reference.sourceBadge) : reference.sourceBadge || 'Aggregated'), 3 /* TEXT, CLASS */), reference.isHadith ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
        key: 0,
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['chat-reference-badge', $options.getHadithGradeBadgeClass ? $options.getHadithGradeBadgeClass(reference.hadithGrade) : 'chat-reference-badge--ungraded'])
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatHadithGrade ? $options.formatHadithGrade(reference.hadithGrade) : reference.hadithGrade || 'Ungraded'), 3 /* TEXT, CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]);
    }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */)), $data.chatLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", _hoisted_45, [...(_cache[39] || (_cache[39] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "ai-gpt-avatar",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-star-and-crescent"
  })], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ai-gpt-message-block"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ai-gpt-message-meta"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "ai-gpt-author"
  }, "Noor"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "ai-gpt-time"
  }, "now")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ai-gpt-message-body assistant ai-gpt-message-body--typing",
    role: "status"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "chat-typing-dot"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "chat-typing-dot"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "chat-typing-dot"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "chat-typing-text"
  }, "Noor is typing...")])], -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    ref: "aiForm",
    class: "ai-gpt-composer",
    onSubmit: _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.sendChatMessage && $options.sendChatMessage(...args), ["prevent"]))
  }, [_cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "visually-hidden",
    for: "aiChatInput"
  }, "Ask Noor", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    id: "aiChatInput",
    ref: "aiChatInput",
    "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => $data.chatDraft = $event),
    class: "ai-gpt-textarea ai-gpt-textarea--pill",
    rows: "1",
    maxlength: "1500",
    placeholder: "Ask Noor a question...",
    disabled: $data.chatLoading,
    onInput: _cache[11] || (_cache[11] = (...args) => $options.handleDraftInput && $options.handleDraftInput(...args)),
    onKeydown: _cache[12] || (_cache[12] = (...args) => $options.handleComposerKeydown && $options.handleComposerKeydown(...args))
  }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_47), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.chatDraft]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['ai-gpt-pill-btn ai-gpt-pill-btn--mic', {
      'is-active': $data.voiceListening
    }]),
    disabled: $data.chatLoading,
    "aria-label": $data.voiceListening ? 'Stop voice input' : 'Start voice input',
    onClick: _cache[13] || (_cache[13] = (...args) => $options.toggleVoiceSearch && $options.toggleVoiceSearch(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($data.voiceListening ? 'fas fa-stop' : 'fas fa-microphone'),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_48), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "ai-gpt-send ai-gpt-send--circle",
    disabled: $data.chatLoading || !$data.chatDraft.trim()
  }, [!$data.chatLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_50)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.chatLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_51)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_52, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.chatLoading ? 'Thinking...' : 'Send'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_49)])], 544 /* NEED_HYDRATION, NEED_PATCH */)])], 2 /* CLASS */), $data.showDisclaimerModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: "ai-disclaimer-modal-backdrop",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "aiDisclaimerModalTitle",
    onClick: _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.closeDisclaimerModal && $options.closeDisclaimerModal(...args), ["self"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ai-disclaimer-modal-card",
    onClick: _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    id: "aiDisclaimerModalTitle",
    class: "mb-0"
  }, "Trust & Disclaimer", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-disclaimer-close",
    onClick: _cache[15] || (_cache[15] = (...args) => $options.closeDisclaimerModal && $options.closeDisclaimerModal(...args)),
    "aria-label": "Close disclaimer"
  }, [...(_cache[41] || (_cache[41] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-times",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])]), _cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ai-disclaimer-modal-body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Noor provides educational Islamic guidance and does not replace qualified scholarly fatwa."), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Verify religious rulings with trusted scholars, your local imam, or recognized institutions before acting."), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-0"
  }, "For urgent spiritual or personal concerns, seek direct human support from knowledgeable people you trust.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-disclaimer-close-btn",
    onClick: _cache[16] || (_cache[16] = (...args) => $options.closeDisclaimerModal && $options.closeDisclaimerModal(...args))
  }, " Close ")])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.showReportModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 1,
    class: "ai-report-modal-backdrop",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "aiReportModalTitle",
    onClick: _cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.closeReportModal && $options.closeReportModal(...args), ["self"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ai-report-modal-card",
    onClick: _cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [_cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    id: "aiReportModalTitle",
    class: "mb-0"
  }, "Report answer", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-report-close",
    onClick: _cache[19] || (_cache[19] = (...args) => $options.closeReportModal && $options.closeReportModal(...args)),
    "aria-label": "Close report dialog"
  }, [...(_cache[44] || (_cache[44] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-times",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    class: "ai-report-modal-body",
    onSubmit: _cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.submitMessageReport && $options.submitMessageReport(...args), ["prevent"]))
  }, [_cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "ai-report-help mb-0"
  }, " Flag this answer for review. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [_cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "aiReportReason",
    class: "ai-report-label"
  }, "Reason", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "aiReportReason",
    "onUpdate:modelValue": _cache[20] || (_cache[20] = $event => $data.reportForm.reason = $event),
    class: "ai-report-select",
    required: ""
  }, [_cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select reason", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.reportReasons, reason => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: reason.value,
      value: reason.value
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reason.label), 9 /* TEXT, PROPS */, _hoisted_57);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.reportForm.reason]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [_cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "aiReportDetails",
    class: "ai-report-label"
  }, "Details (optional)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    id: "aiReportDetails",
    "onUpdate:modelValue": _cache[21] || (_cache[21] = $event => $data.reportForm.details = $event),
    class: "ai-report-textarea",
    maxlength: "1500",
    rows: "3",
    placeholder: "Share what is wrong so we can review faster."
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.reportForm.details]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [_cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "ai-report-label mb-1"
  }, "Reported answer", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_60, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.reportPreviewText), 1 /* TEXT */)]), $data.reportError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_61, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.reportError), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-report-cancel",
    disabled: $data.reportSubmitting,
    onClick: _cache[22] || (_cache[22] = (...args) => $options.closeReportModal && $options.closeReportModal(...args))
  }, " Cancel ", 8 /* PROPS */, _hoisted_63), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "ai-report-submit",
    disabled: $data.reportSubmitting || !$data.reportForm.reason
  }, [$data.reportSubmitting ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_65)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.reportSubmitting ? 'Submitting...' : 'Submit report'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_64)])], 32 /* NEED_HYDRATION */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/AiComponent.vue?vue&type=style&index=0&id=077e75cb&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/AiComponent.vue?vue&type=style&index=0&id=077e75cb&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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

/***/ "./resources/js/components/AiComponent.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/AiComponent.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AiComponent.vue?vue&type=script&lang=js */ "./resources/js/components/AiComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_AiComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/AiComponent.vue"]])
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
 

/***/ })

}]);