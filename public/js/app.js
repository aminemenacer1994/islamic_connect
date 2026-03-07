"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["/js/app"],{

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
      sidebarCollapsed: false,
      quickPrompts: [{
        label: 'Daily Worship',
        prompt: 'How can I stay consistent with salah when my schedule is busy?'
      }, {
        label: 'Quran Reflection',
        prompt: 'Share a Quran verse about patience and how to apply it today.'
      }, {
        label: 'Character',
        prompt: 'What does Islam teach about controlling anger in difficult moments?'
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

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/PricingComponent.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/PricingComponent.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'PricingComponent',
  // Original script code commented out
  /*
  data() {
    // ...
  },
  // ...
  */
  mounted() {
    console.log('PricingComponent: Subscription disabled');
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SubscriptionForm.vue?vue&type=script&setup=true&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SubscriptionForm.vue?vue&type=script&setup=true&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'SubscriptionForm',
  setup(__props, {
    expose: __expose
  }) {
    __expose();
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
      console.log('SubscriptionForm: Subscription disabled');
    });

    // Original script commented out
    /*
    import { ref, onMounted, computed } from 'vue';
    const csrfToken = ...
    */

    const __returned__ = {
      onMounted: vue__WEBPACK_IMPORTED_MODULE_0__.onMounted
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/DashboardComponent.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/DashboardComponent.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var chart_js_auto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chart.js/auto */ "./node_modules/chart.js/auto/auto.mjs");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      counts: {},
      series: {
        users: [],
        donations: [],
        feedback: []
      },
      recent: {
        donations: [],
        feedback: [],
        mailing: []
      },
      modalType: 'feedback',
      modalTitle: '',
      modalItems: [],
      refreshTimer: null,
      refreshIntervalMs: 30000,
      charts: {
        users: null,
        feedback: null,
        donations: null
      },
      cards: [{
        key: 'users',
        label: 'Users',
        icon: 'bi bi-people-fill',
        href: '/users',
        color: 'c1'
      }, {
        key: 'bookmarks',
        label: 'Bookmarks',
        icon: 'bi bi-bookmark-star',
        href: '/bookmarks',
        color: 'c2'
      }, {
        key: 'notes',
        label: 'Notes',
        icon: 'bi bi-journal-text',
        href: '/notes',
        color: 'c3'
      }, {
        key: 'pins',
        label: 'Pins',
        icon: 'bi bi-pin-angle-fill',
        href: '/pins',
        color: 'c4'
      }, {
        key: 'feedback',
        label: 'Feedback',
        icon: 'bi bi-chat-left-text',
        href: '/feedback',
        color: 'c5'
      }, {
        key: 'playlists',
        label: 'Playlists',
        icon: 'bi bi-music-note-list',
        href: '/playlist',
        color: 'c6'
      }]
    };
  },
  mounted() {
    this.fetchMetrics();
    this.startLiveRefresh();
  },
  beforeUnmount() {
    this.stopLiveRefresh();
    this.destroyCharts();
  },
  methods: {
    startLiveRefresh() {
      this.stopLiveRefresh();
      this.refreshTimer = setInterval(() => {
        this.fetchMetrics({
          silent: true
        });
      }, this.refreshIntervalMs);
    },
    stopLiveRefresh() {
      if (!this.refreshTimer) return;
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    },
    destroyCharts() {
      ['users', 'feedback', 'donations'].forEach(key => {
        if (this.charts[key]) {
          this.charts[key].destroy();
          this.charts[key] = null;
        }
      });
    },
    async fetchMetrics() {
      try {
        const res = await fetch(`/api/admin-metrics?_=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            Accept: 'application/json'
          }
        });
        if (!res.ok) {
          throw new Error(`Metrics request failed (${res.status})`);
        }
        const data = await res.json();
        this.counts = data.counts || {};
        this.series = data.series || {};
        this.recent = data.recent || {};
        this.renderCharts(data);
      } catch (e) {
        console.error('metrics failed', e);
      }
    },
    renderCharts(data) {
      var _data$breakdown;
      const dLabels = (this.series.users || []).map(x => x.m);
      const uValues = (this.series.users || []).map(x => x.c);
      const fValues = (this.series.feedback || []).map(x => x.c);
      const accent = '#0f6e63';
      const common = {
        borderWidth: 2,
        borderColor: accent,
        backgroundColor: 'rgba(15, 110, 99, 0.12)',
        tension: .3,
        pointRadius: 0
      };
      const ctx1 = this.$refs.usersChart.getContext('2d');
      if (this.charts.users) this.charts.users.destroy();
      this.charts.users = new chart_js_auto__WEBPACK_IMPORTED_MODULE_0__["default"](ctx1, {
        type: 'line',
        data: {
          labels: dLabels,
          datasets: [_objectSpread({
            label: 'Users',
            data: uValues
          }, common)]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      const ctx2 = this.$refs.feedbackChart.getContext('2d');
      if (this.charts.feedback) this.charts.feedback.destroy();
      this.charts.feedback = new chart_js_auto__WEBPACK_IMPORTED_MODULE_0__["default"](ctx2, {
        type: 'bar',
        data: {
          labels: dLabels,
          datasets: [{
            label: 'Feedback',
            data: fValues,
            backgroundColor: 'rgba(15, 110, 99, 0.2)',
            borderColor: accent,
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      // Pie: donations by currency
      const pie = this.$refs.donationPie.getContext('2d');
      const br = ((_data$breakdown = data.breakdown) === null || _data$breakdown === void 0 ? void 0 : _data$breakdown.donationsByCurrency) || [];
      const labels = br.map(x => x.currency || 'N/A');
      const values = br.map(x => x.c);
      const colors = ['#0f6e63', '#5bc8b9', '#f2b84b', '#2f80ed', '#ef6f6c', '#18a999'];
      if (this.charts.donations) this.charts.donations.destroy();
      this.charts.donations = new chart_js_auto__WEBPACK_IMPORTED_MODULE_0__["default"](pie, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            data: values,
            backgroundColor: colors
          }]
        },
        options: {
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }
      });
    },
    async openModal(type) {
      this.modalType = type;
      this.modalTitle = type === 'feedback' ? 'All Feedback' : 'All Subscribers';
      const url = type === 'feedback' ? '/api/fetch-feedbacks' : '/api/fetch-mail';
      const res = await fetch(`${url}?_=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          Accept: 'application/json'
        }
      });
      this.modalItems = await res.json();
      const el = document.getElementById('viewAllModal');
      bootstrap.Modal.getOrCreateInstance(el).show();
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/DonationComponent.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/DonationComponent.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var primevue_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primevue/api */ "./node_modules/primevue/api/api.esm.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mounted() {
    this.loadDonations();
  },
  data() {
    return {
      loading: false,
      searchValue: "",
      filters: {
        global: {
          value: null,
          matchMode: primevue_api__WEBPACK_IMPORTED_MODULE_1__.FilterMatchMode.CONTAINS
        }
      },
      columns: [{
        field: "firstname",
        header: "Firstname",
        sortable: true
      }, {
        field: "lastname",
        header: "Lastname",
        sortable: true
      }, {
        field: "amount",
        header: "Amount",
        sortable: true
      }, {
        field: "currency",
        header: "Currency",
        sortable: true
      }, {
        field: "payment_status",
        header: "Payment Status",
        sortable: true
      }],
      donations: null,
      sortDesc: false,
      form: new Form({
        id: "",
        firstname: "",
        lastname: "",
        amount: "",
        currency: "",
        country: "",
        email: "",
        payment_status: ""
      })
    };
  },
  methods: {
    onGlobalFilter(e) {
      this.filters.global.value = e.target.value;
    },
    loadDonations() {
      this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("api/fetch-donations").then(data => {
        this.donations = data.data;
      }).finally(() => {
        this.loading = false;
      });
    },
    //edit donation modal
    editModal(donation) {
      this.editmode = true;
      this.form.fill(donation);
    },
    viewModal(donation) {
      $("#view").modal("show");
      this.form.fill(donation);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/FeedbackComponent.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/FeedbackComponent.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var primevue_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primevue/api */ "./node_modules/primevue/api/api.esm.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mounted() {
    this.loadFeedbacks();
  },
  data() {
    return {
      loading: false,
      searchValue: '',
      filters: {
        global: {
          value: null,
          matchMode: primevue_api__WEBPACK_IMPORTED_MODULE_1__.FilterMatchMode.CONTAINS
        }
      },
      columns: [{
        field: "firstname",
        header: "Firstname",
        sortable: true
      }, {
        field: "lastname",
        header: "Lastname",
        sortable: true
      }, {
        field: "email",
        header: "Email",
        sortable: true
      }, {
        field: "subject",
        header: "Subject",
        sortable: true
      }],
      feedbacks: null,
      form: new Form({
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        subject: "",
        message: ""
      }),
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
      }]
    };
  },
  methods: {
    subjectLabel(value) {
      const option = this.subjectOptions.find(item => item.value === value);
      return option ? option.label : value;
    },
    onGlobalFilter(e) {
      this.filters.global.value = e.target.value;
    },
    loadFeedbacks() {
      this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("api/fetch-feedbacks").then(data => {
        this.feedbacks = data.data;
      }).finally(() => {
        this.loading = false;
      });
    },
    //edit feedback modal
    editModal(feedback) {
      this.editmode = true;
      this.form.fill(feedback);
    },
    viewModal(feedback) {
      $("#view").modal("show");
      this.form.fill(feedback);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/MailingListComponent.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/MailingListComponent.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var primevue_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primevue/api */ "./node_modules/primevue/api/api.esm.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mounted() {
    this.loadMailingList();
  },
  data() {
    return {
      mailinglists: null,
      searchValue: '',
      filters: {
        global: {
          value: null,
          matchMode: primevue_api__WEBPACK_IMPORTED_MODULE_1__.FilterMatchMode.CONTAINS
        }
      },
      columns: [{
        field: "name",
        header: "Firstname",
        sortable: true
      }, {
        field: "lastname",
        header: "Lastname",
        sortable: true
      }, {
        field: "phone",
        header: "Phone",
        sortable: true
      }, {
        field: "email",
        header: "Email address",
        sortable: true
      }],
      sortDesc: false,
      form: new Form({
        id: "",
        name: "",
        lastname: "",
        phone: "",
        email: "",
        created_at: ""
      })
    };
  },
  methods: {
    onGlobalFilter(e) {
      this.filters.global.value = e.target.value;
    },
    loadMailingList() {
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("api/fetch-mail").then(data => {
        this.mailinglists = data.data;
      });
    },
    viewModal(mailinglists) {
      this.form.reset();
      $("#view").modal("show");
      this.form.fill(mailinglists);
    },
    //edit user modal
    editModal(mailinglists) {
      this.editmode = true;
      this.form.reset();
      this.form.fill(mailinglists);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PaymentComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PaymentComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var primevue_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primevue/api */ "./node_modules/primevue/api/api.esm.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mounted() {
    // Load live Stripe data by default; local mirror still available
    this.loadStripe();
  },
  data() {
    return {
      loading: false,
      errorMsg: '',
      searchValue: "",
      filters: {
        global: {
          value: null,
          matchMode: primevue_api__WEBPACK_IMPORTED_MODULE_1__.FilterMatchMode.CONTAINS
        }
      },
      columns: [],
      payments: null,
      form: new Form({
        id: "",
        name: "",
        amount: "",
        description: "",
        payment_method: "",
        currency: "",
        status: "",
        date: ""
      })
    };
  },
  methods: {
    onGlobalFilter(e) {
      this.filters.global.value = e.target.value;
    },
    loadPayments() {
      this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("api/fetch-payments").then(data => {
        this.payments = data.data;
      }).finally(() => {
        this.loading = false;
      });
    },
    async loadStripe() {
      this.loading = true;
      this.errorMsg = '';
      try {
        const res = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('api/stripe/transactions');
        if (res.data && res.data.error) {
          this.errorMsg = res.data.error;
          this.payments = [];
          return;
        }
        const rows = res.data && res.data.data ? res.data.data : [];
        // Use rows as-is; backend already shapes like Stripe
        this.payments = rows;
      } catch (e) {
        var _e$response;
        this.errorMsg = (e === null || e === void 0 || (_e$response = e.response) === null || _e$response === void 0 || (_e$response = _e$response.data) === null || _e$response === void 0 ? void 0 : _e$response.error) || 'Failed to load from Stripe. Check server logs and STRIPE_SECRET.';
      } finally {
        this.loading = false;
      }
    },
    prettyStatus(s) {
      if (!s) return ' ';
      const map = {
        reversed: 'Reversed',
        refunded: 'Refunded',
        canceled: 'Cancelled',
        cancelled: 'Cancelled',
        succeeded: 'Succeeded',
        failed: 'Failed'
      };
      return map[String(s).toLowerCase()] || s;
    },
    formatAmount(amount, currency) {
      if (amount === null || amount === undefined || amount === '') return ' ';
      try {
        return new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: currency || 'GBP'
        }).format(parseFloat(amount));
      } catch (e) {
        return amount + ' ' + (currency || '');
      }
    },
    //edit donation modal
    editModal(payment) {
      this.editmode = true;
      this.form.fill(payment);
    },
    viewModal(payment) {
      $("#view").modal("show");
      this.form.fill(payment);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/ProfileComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/ProfileComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/bookmarkAuth */ "./resources/js/utils/bookmarkAuth.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    information: {
      type: Object,
      default: null
    },
    user: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.fetchUserIdAndNotes();
    this.fetchUserIdAndBookmarks();
    this.fetchUserIdAndFolders();
  },
  data() {
    return {
      users: {},
      userId: null,
      notes: [],
      bookmarks: [],
      folders: [],
      editmode: false,
      form: new Form({
        id: "",
        name: "",
        email: "",
        lastname: "",
        phone: "",
        user_type: "",
        password: ""
      })
    };
  },
  computed: {
    avatarUrl() {
      try {
        var _this$user;
        const email = (((_this$user = this.user) === null || _this$user === void 0 ? void 0 : _this$user.email) || '').trim().toLowerCase();
        const hash = window.md5 ? window.md5(email) : '';
        // fallback to identicon param if md5 not available
        return `https://www.gravatar.com/avatar/${hash}?s=140&d=identicon`;
      } catch (_) {
        return `https://www.gravatar.com/avatar/?s=140&d=identicon`;
      }
    },
    formattedJoin() {
      try {
        var _this$user2, _this$user3;
        const d = new Date(((_this$user2 = this.user) === null || _this$user2 === void 0 ? void 0 : _this$user2.created_at) || ((_this$user3 = this.user) === null || _this$user3 === void 0 ? void 0 : _this$user3.createdAt) || '');
        if (!isNaN(d)) {
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          return `${y}-${m}-${day}`;
        }
        return '';
      } catch (_) {
        return '';
      }
    }
  },
  methods: {
    async resolveProfileUserId() {
      if (this.userId) {
        return this.userId;
      }
      const userId = await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__.fetchUserIdFromApi)();
      if (userId) {
        this.userId = userId;
      }
      return this.userId;
    },
    async fetchUserIdAndNotes() {
      try {
        const userId = await this.resolveProfileUserId();
        if (userId) {
          await this.fetchNotes(userId);
        } else {
          console.error('User ID not found');
        }
      } catch (error) {
        console.error('Error fetching user ID or notes:', error);
      }
    },
    async fetchUserIdAndBookmarks() {
      try {
        const userId = await this.resolveProfileUserId();
        if (userId) {
          await this.fetchBookmarks(userId);
        } else {
          console.error('User ID not found');
        }
      } catch (error) {
        console.error('Error fetching user ID or bookmarks:', error);
      }
    },
    async fetchUserIdAndFolders() {
      try {
        const userId = await this.resolveProfileUserId();
        if (userId) {
          await this.fetchFolders();
        } else {
          console.error('User ID not found');
        }
      } catch (error) {
        console.error('Error fetching user ID or folders:', error);
      }
    },
    async fetchFolders() {
      try {
        const response = await fetch(`/fetch-folders`);
        if (!response.ok) {
          throw new Error('Failed to fetch folders');
        }
        this.folders = await response.json();
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    },
    async fetchNotes(userId) {
      try {
        const response = await fetch(`/api/fetch-notes/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        this.notes = await response.json();
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    },
    async fetchBookmarks(userId) {
      try {
        const response = await fetch(`/api/fetch-bookmarks/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bookmarks');
        }
        this.bookmarks = await response.json();
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    },
    loadUsers() {
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("api/fetch-users").then(data => {
        this.users = data.data;
      });
    },
    updateUser() {
      sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
        title: "Are you sure?",
        text: "You want to update user !",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "#d33",
        confirmButtonText: "Update user!"
      }, 1000).then(result => {
        if (result.isConfirmed) {
          axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`api/update-users/${this.form.id}`, this.form).then(() => {
            sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
              position: "top-end",
              icon: "success",
              title: "Profile updated",
              showConfirmButton: false,
              timer: 1200
            });
            this.user = _objectSpread(_objectSpread({}, this.user), {}, {
              name: this.form.name,
              lastname: this.form.lastname,
              email: this.form.email,
              phone: this.form.phone,
              user_type: this.form.user_type
            });
            this.form.password = "";
            this.hideEditModal();
          }).catch(() => {
            sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
              icon: 'error',
              title: 'Update failed',
              timer: 1500,
              showConfirmButton: false
            });
          });
        }
      });
    },
    //edit user modal
    editModal(user) {
      this.editmode = true;
      this.form.reset();
      this.form.fill(user);
    },
    viewModal(user) {
      this.form.reset();
      // optional: show a separate view modal if implemented
      this.form.fill(user);
    },
    hideEditModal() {
      try {
        const el = document.getElementById('editNew');
        if (!el) return;
        const inst = bootstrap.Modal.getInstance(el) || bootstrap.Modal.getOrCreateInstance(el);
        inst.hide();
      } catch (_) {}
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mounted() {
    this.loadUsers();
    this.InitializeForm();
    this.attachBackdropCleanup();
  },
  beforeUnmount() {
    this.detachBackdropCleanup();
    this.cleanupModalBackdrops();
  },
  data() {
    return {
      loading: false,
      users: [],
      filteredUsers: [],
      searchValue: "",
      selectedRole: "",
      selectedStatus: "",
      showPassword: false,
      rowsPerPage: 10,
      rowsPerPageOptions: [10, 20, 50, 100],
      currentPage: 1,
      modalListeners: {},
      form: new Form({
        id: "",
        name: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        user_type: "",
        status: "",
        role: "",
        password_confirmation: ""
      })
    };
  },
  computed: {
    totalUsers() {
      return this.users.length;
    },
    activeUsers() {
      return this.users.length;
    },
    adminCount() {
      return this.users.filter(u => u.user_type === 'Super Admin' || u.user_type === 'Admin').length;
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      return this.filteredUsers.slice(start, end);
    },
    totalPages() {
      const total = Math.ceil(this.filteredUsers.length / this.rowsPerPage);
      return total === 0 ? 1 : total;
    },
    paginationLabel() {
      if (!this.filteredUsers.length) {
        return "Showing 0 users";
      }
      const start = (this.currentPage - 1) * this.rowsPerPage + 1;
      const end = Math.min(this.filteredUsers.length, this.currentPage * this.rowsPerPage);
      return `Showing ${start} to ${end} of ${this.filteredUsers.length} users`;
    }
  },
  watch: {
    rowsPerPage() {
      this.goToPage(1);
    },
    filteredUsers() {
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    }
  },
  methods: {
    onGlobalFilter() {
      this.applyFilters();
    },
    filterByRole() {
      this.applyFilters();
    },
    filterByStatus() {
      this.applyFilters();
    },
    applyFilters() {
      let filtered = [...this.users];
      const searchTerm = this.searchValue.trim().toLowerCase();
      if (searchTerm) {
        filtered = filtered.filter(user => {
          const fields = [user.name, user.lastname, user.email, user.user_type];
          return fields.some(value => value && value.toLowerCase().includes(searchTerm));
        });
      }
      if (this.selectedRole) {
        filtered = filtered.filter(user => user.user_type === this.selectedRole);
      }
      if (this.selectedStatus) {
        filtered = filtered.filter(user => (user.status || "").toLowerCase() === this.selectedStatus.toLowerCase());
      }
      this.filteredUsers = filtered;
      this.currentPage = 1;
    },
    clearFilters() {
      this.selectedRole = "";
      this.selectedStatus = "";
      this.searchValue = "";
      this.rowsPerPage = this.rowsPerPageOptions[0];
      this.currentPage = 1;
      this.applyFilters();
    },
    statusClass(status) {
      const normalized = (status || "active").toLowerCase();
      if (normalized === "inactive") return "inactive";
      if (normalized === "pending") return "pending";
      return "active";
    },
    capitalizeStatus(value) {
      if (!value) {
        return "";
      }
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    capitalizeRole(value) {
      if (!value) {
        return "";
      }
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    getRoleClass(role) {
      const classes = {
        'Super Admin': 'role-badge super-admin',
        'Admin': 'role-badge admin',
        'Manager': 'role-badge manager',
        'Editor': 'role-badge editor',
        'Viewer': 'role-badge viewer',
        'Volunteer': 'role-badge volunteer'
      };
      return classes[role] || 'role-badge';
    },
    goToPage(page) {
      const normalizedPage = Math.max(1, Math.min(page, this.totalPages));
      this.currentPage = normalizedPage;
    },
    InitializeForm() {
      this.form.reset();
      this.showPassword = false;
    },
    resetForm(event) {
      if (event) {
        event.preventDefault();
      }
      this.InitializeForm();
    },
    closeModal(modalId) {
      if (typeof window === "undefined" || !window.bootstrap) {
        return;
      }
      const modalEl = document.getElementById(modalId);
      if (!modalEl) {
        return;
      }
      const modalInstance = window.bootstrap.Modal.getInstance(modalEl) || window.bootstrap.Modal.getOrCreateInstance(modalEl);
      modalInstance === null || modalInstance === void 0 || modalInstance.hide();
      this.cleanupModalBackdrops();
    },
    cleanupModalBackdrops() {
      if (typeof document === "undefined") return;
      document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
      document.body.classList.remove('modal-open');
      document.body.style.paddingRight = "";
    },
    attachBackdropCleanup() {
      if (typeof document === "undefined") return;
      ["viewUserModal", "addUserModal", "editUserModal"].forEach(id => {
        const modalEl = document.getElementById(id);
        if (!modalEl) {
          return;
        }
        const handler = () => this.cleanupModalBackdrops();
        modalEl.addEventListener("hidden.bs.modal", handler);
        this.modalListeners[id] = handler;
      });
    },
    detachBackdropCleanup() {
      if (typeof document === "undefined") return;
      Object.entries(this.modalListeners).forEach(([id, handler]) => {
        const modalEl = document.getElementById(id);
        if (!modalEl) {
          return;
        }
        modalEl.removeEventListener("hidden.bs.modal", handler);
      });
      this.modalListeners = {};
    },
    loadUsers() {
      this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("api/fetch-users").then(data => {
        this.users = data.data;
        this.applyFilters();
      }).finally(() => {
        this.loading = false;
      });
    },
    createUser() {
      Swal.fire({
        title: "Create user?",
        text: "This will send a request to create the new user account.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#198754",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Create user"
      }).then(result => {
        if (!result.isConfirmed) {
          return;
        }
        this.loading = true;
        axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("api/create-users", this.form).then(response => {
          var _response$data;
          const apiSuccess = response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.success;
          if (apiSuccess === false) {
            Swal.fire("Error", "Unable to create user.", "error");
            return;
          }
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User created successfully",
            showConfirmButton: false,
            timer: 1500
          });
          this.closeModal("addUserModal");
          this.InitializeForm();
          this.loadUsers();
        }).catch(error => {
          console.error("createUser error", error);
          Swal.fire("Error", "Unable to create user.", "error");
        }).finally(() => {
          this.loading = false;
        });
      });
    },
    updateUser() {
      if (!this.form.id) {
        Swal.fire("Error", "Missing user selection to update.", "warning");
        return;
      }
      Swal.fire({
        title: "Update user?",
        text: "Please confirm the updates before submitting.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0d6efd",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Save changes"
      }).then(result => {
        if (!result.isConfirmed) {
          return;
        }
        this.loading = true;
        axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`api/update-users/${this.form.id}`, this.form).then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User updated successfully",
            showConfirmButton: false,
            timer: 1500
          });
          this.closeModal("editUserModal");
          this.InitializeForm();
          this.loadUsers();
        }).catch(error => {
          console.error("updateUser error", error);
          Swal.fire("Error", "Unable to save changes.", "error");
        }).finally(() => {
          this.loading = false;
        });
      });
    },
    confirmDelete(user) {
      Swal.fire({
        title: `Delete ${user.name} ${user.lastname}?`,
        text: "This action cannot be undone. The user will lose all access.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete user",
        cancelButtonText: "Cancel",
        reverseButtons: true
      }).then(result => {
        if (result.isConfirmed) {
          this.deleteUser(user.id);
        }
      });
    },
    deleteUser(id) {
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete("api/delete-users/" + id).then(() => {
        Swal.fire({
          icon: "success",
          title: "User Deleted",
          text: "The user has been successfully removed.",
          timer: 1500,
          showConfirmButton: false
        });
        this.loadUsers();
      }).catch(() => {
        Swal.fire("Error", "Failed to delete user.", "error");
      });
    },
    editModal(user) {
      this.form.reset();
      this.form.fill(user);
    },
    viewModal(user) {
      this.form.reset();
      this.form.fill(user);
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

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PricingComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PricingComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_PricingComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_PricingComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/vue/PricingComponent.vue */ "./resources/components/vue/PricingComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionForm.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionForm.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_SubscriptionForm_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_SubscriptionForm_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/vue/SubscriptionForm.vue */ "./resources/components/vue/SubscriptionForm.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_admin_panels_DashboardComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_admin_panels_DashboardComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/vue/admin_panels/DashboardComponent.vue */ "./resources/components/vue/admin_panels/DashboardComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DonationComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DonationComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_admin_panels_DonationComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_admin_panels_DonationComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/vue/admin_panels/DonationComponent.vue */ "./resources/components/vue/admin_panels/DonationComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/FeedbackComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/FeedbackComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_admin_panels_FeedbackComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_admin_panels_FeedbackComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/vue/admin_panels/FeedbackComponent.vue */ "./resources/components/vue/admin_panels/FeedbackComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/MailingListComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/MailingListComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_admin_panels_MailingListComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_admin_panels_MailingListComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/vue/admin_panels/MailingListComponent.vue */ "./resources/components/vue/admin_panels/MailingListComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_admin_panels_PaymentComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_admin_panels_PaymentComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/vue/admin_panels/PaymentComponent.vue */ "./resources/components/vue/admin_panels/PaymentComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_admin_panels_ProfileComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_admin_panels_ProfileComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/vue/admin_panels/ProfileComponent.vue */ "./resources/components/vue/admin_panels/ProfileComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/UsersComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/UsersComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_admin_panels_UsersComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_admin_panels_UsersComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/vue/admin_panels/UsersComponent.vue */ "./resources/components/vue/admin_panels/UsersComponent.vue");


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
  key: 1,
  class: "chat-references-wrapper"
};
const _hoisted_39 = {
  class: "chat-references",
  role: "list"
};
const _hoisted_40 = {
  class: "chat-reference-main"
};
const _hoisted_41 = ["href"];
const _hoisted_42 = {
  class: "chat-reference-badges"
};
const _hoisted_43 = {
  key: 0,
  class: "ai-gpt-message-row assistant ai-gpt-message-row--typing",
  "aria-live": "polite"
};
const _hoisted_44 = {
  class: "ai-gpt-input-wrap"
};
const _hoisted_45 = ["disabled"];
const _hoisted_46 = ["disabled", "aria-label"];
const _hoisted_47 = ["disabled"];
const _hoisted_48 = {
  key: 0,
  class: "fas fa-paper-plane",
  "aria-hidden": "true"
};
const _hoisted_49 = {
  key: 1,
  class: "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
};
const _hoisted_50 = {
  class: "visually-hidden"
};
const _hoisted_51 = {
  class: "ai-disclaimer-modal-head"
};
const _hoisted_52 = {
  class: "ai-disclaimer-modal-foot"
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
  }, [...(_cache[19] || (_cache[19] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-plus",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "New chat", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_5), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-0"
  }, "Recent chats", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-gpt-clear-all",
    disabled: !$data.chatSessions.length,
    onClick: _cache[2] || (_cache[2] = (...args) => $options.prepareClearAllSessions && $options.prepareClearAllSessions(...args))
  }, " Clear all ", 8 /* PROPS */, _hoisted_7)]), $data.pendingClearAll ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_8, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Delete all saved chats?", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
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
    }, [...(_cache[22] || (_cache[22] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
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
  }, [...(_cache[23] || (_cache[23] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-trash-alt",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Clear current", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_19)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_21, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
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
  }, " Trust & disclaimer ")]), $data.copyNotice ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_22, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-check-circle me-1",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.copyNotice), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.chatError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-exclamation-triangle ai-error-icon",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "ai-error-title mb-1"
  }, "Need some redirection?", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.chatError), 1 /* TEXT */), $data.sessionExpired ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "ai-error-clear mt-2",
    onClick: _cache[9] || (_cache[9] = (...args) => $options.reloadPage && $options.reloadPage(...args))
  }, " Reload page ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_25, [!$data.chatHistory.length && !$data.chatLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_26, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "How can Noor help today?", -1 /* CACHED */)), _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Ask for Quran verses, hadith insights, and practical next steps for your day.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.quickPrompts, (prompt, promptIndex) => {
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
    }, null, 10 /* CLASS, PROPS */, _hoisted_37), entry.role === 'assistant' && entry.verification ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 0,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['chat-verification', $options.getVerificationBadgeClass(entry.verification)]),
      "aria-live": "polite"
    }, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check-circle",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatVerificationLabel(entry.verification)), 1 /* TEXT */)], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), entry.references && entry.references.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_39, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(entry.references, (reference, refIndex) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: `ref-${idx}-${refIndex}-${reference.label}`
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_40, [reference.url ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
        key: 0,
        href: reference.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reference.label), 9 /* TEXT, PROPS */, _hoisted_41)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        key: 1
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reference.label), 1 /* TEXT */)], 64 /* STABLE_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['chat-reference-badge', $options.getSourceBadgeClass ? $options.getSourceBadgeClass(reference.sourceBadge) : 'chat-reference-badge--aggregated'])
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatSourceBadge ? $options.formatSourceBadge(reference.sourceBadge) : reference.sourceBadge || 'Aggregated'), 3 /* TEXT, CLASS */), reference.isHadith ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
        key: 0,
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['chat-reference-badge', $options.getHadithGradeBadgeClass ? $options.getHadithGradeBadgeClass(reference.hadithGrade) : 'chat-reference-badge--ungraded'])
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatHadithGrade ? $options.formatHadithGrade(reference.hadithGrade) : reference.hadithGrade || 'Ungraded'), 3 /* TEXT, CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]);
    }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */)), $data.chatLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", _hoisted_43, [...(_cache[31] || (_cache[31] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
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
  }, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "visually-hidden",
    for: "aiChatInput"
  }, "Ask Noor", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
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
  }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_45), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.chatDraft]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
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
  }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_46), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "ai-gpt-send ai-gpt-send--circle",
    disabled: $data.chatLoading || !$data.chatDraft.trim()
  }, [!$data.chatLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_48)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.chatLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_49)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.chatLoading ? 'Thinking...' : 'Send'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_47)])], 544 /* NEED_HYDRATION, NEED_PATCH */)])], 2 /* CLASS */), $data.showDisclaimerModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: "ai-disclaimer-modal-backdrop",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "aiDisclaimerModalTitle",
    onClick: _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.closeDisclaimerModal && $options.closeDisclaimerModal(...args), ["self"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ai-disclaimer-modal-card",
    onClick: _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["stop"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    id: "aiDisclaimerModalTitle",
    class: "mb-0"
  }, "Trust & Disclaimer", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-disclaimer-close",
    onClick: _cache[15] || (_cache[15] = (...args) => $options.closeDisclaimerModal && $options.closeDisclaimerModal(...args)),
    "aria-label": "Close disclaimer"
  }, [...(_cache[33] || (_cache[33] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-times",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])]), _cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ai-disclaimer-modal-body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Noor provides educational Islamic guidance and does not replace qualified scholarly fatwa."), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Verify religious rulings with trusted scholars, your local imam, or recognized institutions before acting."), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-0"
  }, "For urgent spiritual or personal concerns, seek direct human support from knowledgeable people you trust.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "ai-disclaimer-close-btn",
    onClick: _cache[16] || (_cache[16] = (...args) => $options.closeDisclaimerModal && $options.closeDisclaimerModal(...args))
  }, " Close ")])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/PricingComponent.vue?vue&type=template&id=30d81c9e&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/PricingComponent.vue?vue&type=template&id=30d81c9e&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "subscription-container"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Subscription code commented out "), _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "container",
    style: {
      "padding": "100px",
      "text-align": "center"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Subscription system is currently disabled.")], -1 /* CACHED */))]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SubscriptionForm.vue?vue&type=template&id=b111d74a&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SubscriptionForm.vue?vue&type=template&id=b111d74a&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "subscription-wrapper"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Subscription code commented out "), _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    style: {
      "text-align": "center",
      "padding": "2rem"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Subscription system is currently disabled.")], -1 /* CACHED */))]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/DashboardComponent.vue?vue&type=template&id=9eec2362&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/DashboardComponent.vue?vue&type=template&id=9eec2362&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "dash-wrap admin-page"
};
const _hoisted_2 = {
  class: "row g-3 mb-3 top-cards"
};
const _hoisted_3 = ["href", "aria-label"];
const _hoisted_4 = {
  class: "metric-icon"
};
const _hoisted_5 = {
  class: "metric-body"
};
const _hoisted_6 = {
  class: "metric-label"
};
const _hoisted_7 = {
  class: "metric-value"
};
const _hoisted_8 = {
  class: "row g-3 charts-row"
};
const _hoisted_9 = {
  class: "col-lg-6"
};
const _hoisted_10 = {
  class: "panel-card"
};
const _hoisted_11 = {
  ref: "usersChart",
  height: "110"
};
const _hoisted_12 = {
  class: "col-lg-6"
};
const _hoisted_13 = {
  class: "panel-card"
};
const _hoisted_14 = {
  ref: "feedbackChart",
  height: "110"
};
const _hoisted_15 = {
  class: "row g-3 mt-1 align-items-stretch"
};
const _hoisted_16 = {
  class: "col-lg-6 d-flex"
};
const _hoisted_17 = {
  class: "panel-card flex-grow-1"
};
const _hoisted_18 = {
  ref: "donationPie",
  height: "220"
};
const _hoisted_19 = {
  class: "col-lg-6 d-flex"
};
const _hoisted_20 = {
  class: "flex-grow-1"
};
const _hoisted_21 = {
  class: "panel-card mb-3"
};
const _hoisted_22 = {
  class: "panel-head d-flex justify-content-between align-items-center"
};
const _hoisted_23 = {
  class: "list clean"
};
const _hoisted_24 = {
  class: "pill"
};
const _hoisted_25 = {
  class: "muted"
};
const _hoisted_26 = {
  class: "panel-card"
};
const _hoisted_27 = {
  class: "panel-head d-flex justify-content-between align-items-center"
};
const _hoisted_28 = {
  class: "list clean"
};
const _hoisted_29 = {
  class: "muted"
};
const _hoisted_30 = {
  class: "modal fade",
  id: "viewAllModal",
  tabindex: "-1",
  "aria-hidden": "true"
};
const _hoisted_31 = {
  class: "modal-dialog modal-lg modal-dialog-centered modal-fullscreen-md-down"
};
const _hoisted_32 = {
  class: "modal-content"
};
const _hoisted_33 = {
  class: "modal-header"
};
const _hoisted_34 = {
  class: "modal-title"
};
const _hoisted_35 = {
  class: "modal-body"
};
const _hoisted_36 = {
  class: "list clean"
};
const _hoisted_37 = {
  class: "pill"
};
const _hoisted_38 = {
  class: "muted"
};
const _hoisted_39 = {
  class: "muted"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Top metric cards "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.cards, c => {
    var _$data$counts$c$key;
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-md-4",
      key: c.key
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: c.href,
      class: "card-link",
      "aria-label": c.label
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["metric-card fade-pop", c.color])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(c.icon)
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(c.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$data$counts$c$key = $data.counts[c.key]) !== null && _$data$counts$c$key !== void 0 ? _$data$counts$c$key : 0), 1 /* TEXT */)])], 2 /* CLASS */)], 8 /* PROPS */, _hoisted_3)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Charts "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "panel-head"
  }, "Users (lifetime)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("canvas", _hoisted_11, null, 512 /* NEED_PATCH */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "panel-head"
  }, "Feedback (lifetime)", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("canvas", _hoisted_14, null, 512 /* NEED_PATCH */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Pie Chart Row "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "panel-head"
  }, "Donations by Currency", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("canvas", _hoisted_18, null, 512 /* NEED_PATCH */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Recent Feedback", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#",
    onClick: _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.openModal('feedback'), ["prevent"])),
    class: "viewall"
  }, "View all")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_23, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.recent.feedback, f => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: f.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.subject || 'Feedback'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.firstname) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.lastname), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Recent Subscribers", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#",
    onClick: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.openModal('mailing'), ["prevent"])),
    class: "viewall"
  }, "View all")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_28, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.recent.mailing, m => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: m.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(m.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(m.email), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" View All Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.modalTitle), 1 /* TEXT */), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_36, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.modalItems, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item.id
    }, [$data.modalType === 'feedback' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 0
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.subject || 'Feedback'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.firstname) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.lastname) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.email), 1 /* TEXT */)], 64 /* STABLE_FRAGMENT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 1
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.email), 1 /* TEXT */)], 64 /* STABLE_FRAGMENT */))]);
  }), 128 /* KEYED_FRAGMENT */))])])])])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/DonationComponent.vue?vue&type=template&id=768e9975":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/DonationComponent.vue?vue&type=template&id=768e9975 ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "admin-page"
};
const _hoisted_2 = {
  class: "modal fade",
  id: "editNewDonation",
  tabindex: "-1",
  "aria-labelledby": "editNew",
  "aria-hidden": "true"
};
const _hoisted_3 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_4 = {
  class: "modal-content"
};
const _hoisted_5 = {
  class: "modal-body"
};
const _hoisted_6 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_7 = {
  class: "mt-2 text-dark"
};
const _hoisted_8 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_9 = {
  class: "mt-2 text-dark"
};
const _hoisted_10 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_11 = {
  class: "mt-2 text-dark"
};
const _hoisted_12 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_13 = {
  class: "mt-2 text-dark"
};
const _hoisted_14 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_15 = {
  class: "mt-2 text-dark"
};
const _hoisted_16 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_17 = {
  class: "mt-2 text-dark"
};
const _hoisted_18 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_19 = {
  class: "mt-2 text-dark"
};
const _hoisted_20 = {
  class: "table-toolbar"
};
const _hoisted_21 = {
  class: "search-wrapper"
};
const _hoisted_22 = {
  class: "row-actions"
};
const _hoisted_23 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Column = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Column");
  const _component_DataTable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DataTable");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" view new Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title text-dark",
    id: "addNew"
  }, " View message "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Name:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.firstname), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Lastname:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.lastname), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Amount:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.amount), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Currency:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.currency), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Email:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.email), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Country:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.country), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Payment Status:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.payment_status), 1 /* TEXT */)]), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger",
    "data-bs-dismiss": "modal"
  }, " Close ")], -1 /* CACHED */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" donation datatable "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DataTable, {
    class: "pt-4 modern-datatable",
    value: $data.donations,
    loading: $data.loading,
    ref: "dt",
    filters: $data.filters,
    "onUpdate:filters": _cache[2] || (_cache[2] = $event => $data.filters = $event),
    globalFilterFields: ($data.columns || []).map(c => c.field),
    showGridlines: "",
    stripedRows: "",
    rowHover: "",
    responsiveLayout: "scroll",
    paginator: "",
    rows: 10,
    rowsPerPageOptions: [10, 20, 50, 100],
    paginatorTemplate: "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
    currentPageReportTemplate: "Showing {first}–{last} of {totalRecords} donations",
    removableSort: "",
    width: "100%",
    tableStyle: "max-width:100%"
  }, {
    header: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "title"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-gift me-2"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Donations")], -1 /* CACHED */)), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "spacer"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-search"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      class: "form-control form-control-sm border-0",
      type: "text",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchValue = $event),
      placeholder: "Search donations...",
      onInput: _cache[1] || (_cache[1] = (...args) => $options.onGlobalFilter && $options.onGlobalFilter(...args))
    }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchValue]])])])]),
    empty: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [...(_cache[16] || (_cache[16] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "empty"
    }, "No donations found.", -1 /* CACHED */)]))]),
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" In total there are " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.donations ? $data.donations.length : 0) + " donations. ", 1 /* TEXT */)]),
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.columns, col => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Column, {
        key: col.field,
        field: col.field,
        header: col.header,
        sortable: "",
        class: "text-left",
        style: {
          "align-items": "center"
        }
      }, null, 8 /* PROPS */, ["field", "header"]);
    }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      header: "Actions",
      exportable: false,
      style: {
        "min-width": "12rem"
      }
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
        data
      }) => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "data-bs-toggle": "modal",
        "data-bs-target": "#editNewDonation",
        type: "button",
        class: "btn btn-sm btn-primary",
        onClick: $event => $options.editModal(data)
      }, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-eye me-1"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" View ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_23)])]),
      _: 1 /* STABLE */
    })]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["value", "loading", "filters", "globalFilterFields"])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/FeedbackComponent.vue?vue&type=template&id=01c37862":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/FeedbackComponent.vue?vue&type=template&id=01c37862 ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "admin-page"
};
const _hoisted_2 = {
  class: "modal fade",
  id: "editNewFeedback",
  tabindex: "-1",
  "aria-labelledby": "editNew",
  "aria-hidden": "true"
};
const _hoisted_3 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_4 = {
  class: "modal-content"
};
const _hoisted_5 = {
  class: "modal-body"
};
const _hoisted_6 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_7 = {
  class: "mt-2 text-dark"
};
const _hoisted_8 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_9 = {
  class: "mt-2 text-dark"
};
const _hoisted_10 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_11 = {
  class: "mt-2 text-dark"
};
const _hoisted_12 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_13 = {
  class: "mt-2 text-dark"
};
const _hoisted_14 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_15 = {
  class: "mt-2 text-dark"
};
const _hoisted_16 = {
  class: "table-toolbar"
};
const _hoisted_17 = {
  class: "search-wrapper"
};
const _hoisted_18 = {
  class: "row-actions"
};
const _hoisted_19 = ["onClick"];
const _hoisted_20 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Column = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Column");
  const _component_DataTable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DataTable");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" view new Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title text-dark",
    id: "addNew"
  }, " View message "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Firstname:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.firstname), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Lastname:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.lastname), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "email:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.email), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "subject:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.subjectLabel($data.form.subject)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Message:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.message), 1 /* TEXT */)]), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger",
    "data-bs-dismiss": "modal"
  }, " Close ")], -1 /* CACHED */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DataTable, {
    class: "pt-4 modern-datatable",
    value: $data.feedbacks,
    loading: $data.loading,
    ref: "dt",
    filters: $data.filters,
    "onUpdate:filters": _cache[2] || (_cache[2] = $event => $data.filters = $event),
    globalFilterFields: ($data.columns || []).map(c => c.field),
    showGridlines: "",
    stripedRows: "",
    rowHover: "",
    responsiveLayout: "scroll",
    paginator: "",
    rows: 10,
    rowsPerPageOptions: [10, 20, 50, 100],
    paginatorTemplate: "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
    currentPageReportTemplate: "Showing {first}–{last} of {totalRecords} messages",
    removableSort: "",
    width: "100%",
    tableStyle: "min-width: 50rem"
  }, {
    header: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "title"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-chat-dots me-2"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Feedback")], -1 /* CACHED */)), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "spacer"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-search"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      class: "form-control form-control-sm border-0",
      type: "text",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchValue = $event),
      placeholder: "Search feedback...",
      onInput: _cache[1] || (_cache[1] = (...args) => $options.onGlobalFilter && $options.onGlobalFilter(...args))
    }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchValue]])])])]),
    empty: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "empty"
    }, "No feedback messages found.", -1 /* CACHED */)]))]),
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" In total there are " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.feedbacks ? $data.feedbacks.length : 0) + " Messages. ", 1 /* TEXT */)]),
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.columns, col => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Column, {
        key: col.field,
        field: col.field,
        header: col.header,
        sortable: "",
        class: "text-left",
        style: {
          "align-items": "center"
        }
      }, null, 8 /* PROPS */, ["field", "header"]);
    }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      exportable: true,
      style: {
        "min-width": "8rem"
      }
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(slotProps => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "data-bs-toggle": "modal",
        "data-bs-target": "#editNewFeedback",
        type: "button",
        class: "btn btn-sm btn-primary",
        onClick: $event => $options.editModal(slotProps.data)
      }, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "pi pi-eye me-1"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" View ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_19), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "data-bs-toggle": "modal",
        "data-bs-target": "#editNew",
        type: "button",
        class: "btn btn-sm btn-outline-secondary",
        onClick: $event => $options.editModal(slotProps.data)
      }, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "pi pi-send me-1"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Reply ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_20)])]),
      _: 1 /* STABLE */
    })]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["value", "loading", "filters", "globalFilterFields"])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/MailingListComponent.vue?vue&type=template&id=0b0ad17a":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/MailingListComponent.vue?vue&type=template&id=0b0ad17a ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "admin-page"
};
const _hoisted_2 = {
  class: "modal fade",
  id: "editNewMail",
  tabindex: "-1",
  "aria-labelledby": "editNew",
  "aria-hidden": "true"
};
const _hoisted_3 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_4 = {
  class: "modal-content"
};
const _hoisted_5 = {
  class: "modal-body"
};
const _hoisted_6 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_7 = {
  class: "mt-2 text-dark"
};
const _hoisted_8 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_9 = {
  class: "mt-2 text-dark"
};
const _hoisted_10 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_11 = {
  class: "mt-2 text-dark"
};
const _hoisted_12 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_13 = {
  class: "mt-2 text-dark"
};
const _hoisted_14 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_15 = {
  class: "mt-2 text-dark"
};
const _hoisted_16 = {
  class: "table-toolbar"
};
const _hoisted_17 = {
  class: "search-wrapper"
};
const _hoisted_18 = {
  class: "row-actions"
};
const _hoisted_19 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Column = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Column");
  const _component_DataTable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DataTable");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" view new Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title text-dark",
    id: "addNew"
  }, " View message "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "ID:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.id), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Firstname:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.name), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Lastname:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.lastname), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Phone:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.phone), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Date:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.created_at), 1 /* TEXT */)]), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger",
    "data-bs-dismiss": "modal"
  }, " Close ")], -1 /* CACHED */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DataTable, {
    ref: "dt",
    class: "pt-5",
    showGridlines: "",
    stripedRows: "",
    sortable: "",
    value: $data.mailinglists,
    filters: $data.filters,
    "onUpdate:filters": _cache[2] || (_cache[2] = $event => $data.filters = $event),
    globalFilterFields: ($data.columns || []).map(c => c.field),
    paginator: "",
    rows: 7,
    rowsPerPageOptions: [5, 10, 20, 50],
    removableSort: "",
    width: "100%",
    tableStyle: "max-width:100%"
  }, {
    header: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "title"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-envelope-at-fill me-2"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Mailing List")], -1 /* CACHED */)), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "spacer"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-search"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      class: "form-control form-control-sm border-0",
      type: "text",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchValue = $event),
      placeholder: "Search mailing list...",
      onInput: _cache[1] || (_cache[1] = (...args) => $options.onGlobalFilter && $options.onGlobalFilter(...args))
    }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchValue]])])])]),
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" In total there are " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.mailinglists ? $data.mailinglists.length : 0) + " subscribers. ", 1 /* TEXT */)]),
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.columns, col => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Column, {
        key: col.field,
        field: col.field,
        header: col.header,
        sortable: "",
        class: "text-left",
        style: {
          "align-items": "center"
        }
      }, null, 8 /* PROPS */, ["field", "header"]);
    }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      header: "Actions",
      exportable: false,
      style: {
        "min-width": "12rem"
      }
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
        data
      }) => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "data-bs-toggle": "modal",
        "data-bs-target": "#editNewMail",
        type: "button",
        class: "btn btn-sm btn-primary",
        onClick: $event => $options.editModal(data)
      }, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-eye me-1"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" View ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_19)])]),
      _: 1 /* STABLE */
    })]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["value", "filters", "globalFilterFields"])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PaymentComponent.vue?vue&type=template&id=7630d39d&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PaymentComponent.vue?vue&type=template&id=7630d39d&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "admin-page"
};
const _hoisted_2 = {
  class: "modal fade",
  id: "editNewPayment",
  tabindex: "-1",
  "aria-labelledby": "editNew",
  "aria-hidden": "true"
};
const _hoisted_3 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_4 = {
  class: "modal-content"
};
const _hoisted_5 = {
  class: "modal-body"
};
const _hoisted_6 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_7 = {
  class: "mt-2 text-dark"
};
const _hoisted_8 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_9 = {
  class: "mt-2 text-dark"
};
const _hoisted_10 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_11 = {
  class: "mt-2 text-dark"
};
const _hoisted_12 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_13 = {
  class: "mt-2 text-dark"
};
const _hoisted_14 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_15 = {
  class: "mt-2 text-dark"
};
const _hoisted_16 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_17 = {
  class: "mt-2 text-dark"
};
const _hoisted_18 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_19 = {
  class: "mt-2 text-dark"
};
const _hoisted_20 = {
  class: "table-toolbar"
};
const _hoisted_21 = {
  class: "search-wrapper"
};
const _hoisted_22 = {
  key: 0,
  class: "alert alert-warning mt-2",
  role: "alert"
};
const _hoisted_23 = {
  class: "text-muted ms-1"
};
const _hoisted_24 = ["data-status"];
const _hoisted_25 = ["href"];
const _hoisted_26 = {
  key: 1
};
const _hoisted_27 = {
  class: "row-actions"
};
const _hoisted_28 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Column = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Column");
  const _component_DataTable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DataTable");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" view new Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title text-dark",
    id: "addNew"
  }, " View message "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Name:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.name), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Amount:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.amount), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Description:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.description), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Payment method:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.payment_method), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Currency:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.currency), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Status:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.status), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Date:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.date), 1 /* TEXT */)]), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger",
    "data-bs-dismiss": "modal"
  }, " Close ")], -1 /* CACHED */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" payment datatable "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DataTable, {
    class: "pt-4 modern-datatable",
    value: $data.payments,
    loading: $data.loading,
    ref: "dt",
    filters: $data.filters,
    "onUpdate:filters": _cache[2] || (_cache[2] = $event => $data.filters = $event),
    globalFilterFields: ['amount', 'status', 'payment_method', 'description', 'customer', 'date'],
    showGridlines: "",
    stripedRows: "",
    rowHover: "",
    responsiveLayout: "scroll",
    paginator: "",
    rows: 10,
    rowsPerPageOptions: [10, 20, 50, 100],
    paginatorTemplate: "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
    currentPageReportTemplate: "Showing {first}–{last} of {totalRecords} payments",
    removableSort: "",
    width: "100%",
    tableStyle: "max-width:100%"
  }, {
    header: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "title"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-credit-card me-2"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Payments")], -1 /* CACHED */)), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "spacer"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Button class=\"btn-add outline\" @click=\"loadStripe()\" :disabled=\"loading\">\n          <i class=\"bi bi-cloud-download me-2\"></i>Load from Stripe\n        </Button> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-search"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      class: "form-control form-control-sm border-0",
      type: "text",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchValue = $event),
      placeholder: "Search payments...",
      onInput: _cache[1] || (_cache[1] = (...args) => $options.onGlobalFilter && $options.onGlobalFilter(...args))
    }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchValue]])])]), $data.errorMsg ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.errorMsg), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    empty: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [...(_cache[16] || (_cache[16] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "empty"
    }, "No payments found.", -1 /* CACHED */)]))]),
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" In total there are " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.payments ? $data.payments.length : 0) + " Payments. ", 1 /* TEXT */)]),
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "amount",
      header: "Amount",
      sortable: ""
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
        data
      }) => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatAmount(data.amount, data.currency)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(data.currency), 1 /* TEXT */)]),
      _: 1 /* STABLE */
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "status",
      header: "Status",
      sortable: ""
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
        data
      }) => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "badge bg-light text-dark",
        "data-status": data.status
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.prettyStatus(data.status)), 9 /* TEXT, PROPS */, _hoisted_24)]),
      _: 1 /* STABLE */
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "payment_method",
      header: "Payment method",
      sortable: ""
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "description",
      header: "Description",
      sortable: ""
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "customer",
      header: "Customer",
      sortable: ""
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "date",
      header: "Date",
      sortable: ""
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      field: "receipt_url",
      header: "Receipt",
      exportable: false
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
        data
      }) => [data.receipt_url ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
        key: 0,
        href: data.receipt_url,
        target: "_blank",
        rel: "noopener"
      }, "Receipt", 8 /* PROPS */, _hoisted_25)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_26))]),
      _: 1 /* STABLE */
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      header: "Actions",
      exportable: false,
      style: {
        "min-width": "12rem"
      }
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
        data
      }) => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "data-bs-toggle": "modal",
        "data-bs-target": "#editNewPayment",
        type: "button",
        class: "btn btn-sm btn-primary",
        onClick: $event => $options.editModal(data)
      }, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-eye me-1"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" View ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_28)])]),
      _: 1 /* STABLE */
    })]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["value", "loading", "filters"])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/ProfileComponent.vue?vue&type=template&id=5a89864c&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/ProfileComponent.vue?vue&type=template&id=5a89864c&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  id: "app"
};
const _hoisted_2 = {
  class: "profile-surface"
};
const _hoisted_3 = {
  class: "profile-banner"
};
const _hoisted_4 = {
  class: "banner-content"
};
const _hoisted_5 = {
  class: "d-flex align-items-center gap-3"
};
const _hoisted_6 = ["src"];
const _hoisted_7 = {
  class: "flex-grow-1"
};
const _hoisted_8 = {
  class: "m-0 d-flex align-items-center gap-2"
};
const _hoisted_9 = {
  class: "profile-display-name",
  style: {
    "font-weight": "800"
  }
};
const _hoisted_10 = {
  key: 0,
  class: "role-badge",
  "aria-label": "User role"
};
const _hoisted_11 = {
  class: "text-muted small"
};
const _hoisted_12 = {
  class: "container mt-4 profile-panel"
};
const _hoisted_13 = {
  class: "row g-3 mb-3"
};
const _hoisted_14 = {
  class: "col-md-3"
};
const _hoisted_15 = {
  class: "stat-card fade-pop stat-link",
  "aria-label": "Collections count",
  href: "/bookmarks"
};
const _hoisted_16 = {
  class: "stat-body"
};
const _hoisted_17 = {
  class: "stat-value"
};
const _hoisted_18 = {
  class: "col-md-3"
};
const _hoisted_19 = {
  class: "stat-card fade-pop stat-link",
  "aria-label": "Bookmarks count",
  href: "/bookmarks"
};
const _hoisted_20 = {
  class: "stat-body"
};
const _hoisted_21 = {
  class: "stat-value"
};
const _hoisted_22 = {
  class: "col-md-3"
};
const _hoisted_23 = {
  class: "stat-card stat-card--soon",
  "aria-label": "Notes coming soon"
};
const _hoisted_24 = {
  class: "stat-body"
};
const _hoisted_25 = {
  class: "stat-value"
};
const _hoisted_26 = {
  class: "section-card"
};
const _hoisted_27 = {
  class: "section-header"
};
const _hoisted_28 = {
  class: "section-body"
};
const _hoisted_29 = {
  class: "row g-3"
};
const _hoisted_30 = {
  class: "col-md-4"
};
const _hoisted_31 = {
  class: "field"
};
const _hoisted_32 = {
  class: "field-value"
};
const _hoisted_33 = {
  class: "col-md-4"
};
const _hoisted_34 = {
  class: "field"
};
const _hoisted_35 = {
  class: "field-value"
};
const _hoisted_36 = {
  class: "col-md-4"
};
const _hoisted_37 = {
  class: "field"
};
const _hoisted_38 = {
  class: "field-value"
};
const _hoisted_39 = {
  class: "col-md-6"
};
const _hoisted_40 = {
  class: "field"
};
const _hoisted_41 = {
  class: "field-value"
};
const _hoisted_42 = {
  class: "col-md-6"
};
const _hoisted_43 = {
  class: "field"
};
const _hoisted_44 = {
  class: "field-value"
};
const _hoisted_45 = {
  class: "modal fade",
  id: "editNew",
  tabindex: "-1",
  "aria-labelledby": "editNewLabel",
  "aria-hidden": "true"
};
const _hoisted_46 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_47 = {
  class: "modal-content"
};
const _hoisted_48 = {
  class: "modal-body"
};
const _hoisted_49 = {
  class: "modal-form-grid row g-3"
};
const _hoisted_50 = {
  class: "col-md-6"
};
const _hoisted_51 = {
  class: "input-group"
};
const _hoisted_52 = {
  class: "col-md-6"
};
const _hoisted_53 = {
  class: "input-group"
};
const _hoisted_54 = {
  class: "col-md-6"
};
const _hoisted_55 = {
  class: "input-group"
};
const _hoisted_56 = {
  class: "col-md-6"
};
const _hoisted_57 = {
  class: "input-group"
};
const _hoisted_58 = {
  class: "col-md-6"
};
const _hoisted_59 = {
  class: "input-group"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _$props$user, _$props$user2;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $options.avatarUrl,
    alt: "Avatar",
    class: "avatar-lg rounded-circle"
  }, null, 8 /* PROPS */, _hoisted_6), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.user.name) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.user.lastname), 1 /* TEXT */), (_$props$user = $props.user) !== null && _$props$user !== void 0 && _$props$user.user_type || (_$props$user2 = $props.user) !== null && _$props$user2 !== void 0 && _$props$user2.role ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.user.user_type || $props.user.role), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, "Member since " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formattedJoin), 1 /* TEXT */)])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quick Stats "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", _hoisted_15, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon bg-teal"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-collection"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-label"
  }, "Group Bookmarks", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.folders && $data.folders.length || 0), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", _hoisted_19, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon bg-teal"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bookmark-star"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-label"
  }, "Bookmarks", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.bookmarks && $data.bookmarks.length || 0), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journal-text"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-label"
  }, "Notes", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.notes && $data.notes.length || 0), 1 /* TEXT */), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-note"
  }, "Coming very soon", -1 /* CACHED */))])])]), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"col-md-3\" data-v-5a89864c><div class=\"stat-card stat-card--soon\" aria-label=\"Group notes coming soon\" data-v-5a89864c><div class=\"stat-icon\" data-v-5a89864c><i class=\"bi bi-people\" data-v-5a89864c></i></div><div class=\"stat-body\" data-v-5a89864c><div class=\"stat-label\" data-v-5a89864c>Group Notes</div><div class=\"stat-value\" data-v-5a89864c>—</div><div class=\"stat-note\" data-v-5a89864c>Coming very soon</div></div></div></div>", 1))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Personal Information section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "m-0"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Personal Information")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-sm btn-edit",
    "data-bs-toggle": "modal",
    "data-bs-target": "#editNew",
    onClick: _cache[0] || (_cache[0] = $event => $options.editModal($props.user))
  }, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-pencil-square me-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Edit ", -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "field-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "First Name")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.user.name || ' '), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "field-label"
  }, "Last Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.user.lastname || ' '), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "field-label"
  }, "User Role", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.user.user_type || $props.user.role || 'User'), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "field-label"
  }, "Email Address", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.user.email), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "field-label"
  }, "Phone Number", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.user.phone || ' '), 1 /* TEXT */)])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Address section (placeholders if missing) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("\n      <div class=\"section-card mt-3\">\n        <div class=\"section-header\">\n          <h6 class=\"m-0\">Address</h6>\n          <button class=\"btn btn-sm btn-amber\" data-bs-toggle=\"modal\" data-bs-target=\"#editNew\"\n            @click=\"editModal(user)\">\n            <i class=\"bi bi-pencil-square me-1\"></i> Edit\n          </button>\n        </div>\n        <div class=\"section-body\">\n          <div class=\"row g-3\">\n            <div class=\"col-md-4\">\n              <div class=\"field\">\n                <div class=\"field-label\">Country</div>\n                <div class=\"field-value\">{{ user.country || ' ' }}</div>\n              </div>\n            </div>\n            <div class=\"col-md-4\">\n              <div class=\"field\">\n                <div class=\"field-label\">City</div>\n                <div class=\"field-value\">{{ user.city || ' ' }}</div>\n              </div>\n            </div>\n            <div class=\"col-md-4\">\n              <div class=\"field\">\n                <div class=\"field-label\">Postal Code</div>\n                <div class=\"field-value\">{{ user.postal_code || ' ' }}</div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Edit Profile Modal (Bootstrap 5) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title",
    id: "editNewLabel"
  }, "Edit Profile"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    class: "modal-form",
    onSubmit: _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.updateUser && $options.updateUser(...args), ["prevent"])),
    novalidate: ""
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "First name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-person"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.form.name = $event),
    type: "text",
    class: "form-control",
    placeholder: "Enter first name",
    "aria-label": "First name"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.name]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Last name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-person"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.form.lastname = $event),
    type: "text",
    class: "form-control",
    placeholder: "Enter last name",
    "aria-label": "Last name"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.lastname]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Email", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-envelope"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.form.email = $event),
    type: "email",
    class: "form-control",
    placeholder: "name@example.com",
    "aria-label": "Email"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.email]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Phone", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-telephone"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.form.phone = $event),
    type: "tel",
    class: "form-control",
    placeholder: "e.g. +1 555 555 5555",
    "aria-label": "Phone"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.phone]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center justify-content-between"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label mb-0"
  }, "Password"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted"
  }, "Leave blank to keep current")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-lock"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.form.password = $event),
    type: "password",
    class: "form-control",
    placeholder: "••••••••",
    "aria-label": "Password"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.password]])])])]), _cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-actions d-flex justify-content-end gap-3 mt-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-modal-light",
    "data-bs-dismiss": "modal"
  }, "Cancel"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-modal-primary"
  }, "Save changes")], -1 /* CACHED */))], 32 /* NEED_HYDRATION */)])])])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=template&id=386b6e5b":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=template&id=386b6e5b ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  id: "app",
  class: "admin-page"
};
const _hoisted_2 = {
  class: "modal fade",
  id: "viewUserModal",
  tabindex: "-1",
  "aria-labelledby": "viewUserLabel",
  "aria-hidden": "true"
};
const _hoisted_3 = {
  class: "modal-dialog modal-dialog-centered modal-lg"
};
const _hoisted_4 = {
  class: "modal-content modern-modal"
};
const _hoisted_5 = {
  class: "modal-header gradient-primary"
};
const _hoisted_6 = {
  class: "d-flex align-items-center"
};
const _hoisted_7 = {
  class: "modal-title mb-1"
};
const _hoisted_8 = {
  class: "modal-subtitle mb-0"
};
const _hoisted_9 = {
  class: "modal-body"
};
const _hoisted_10 = {
  class: "details-grid"
};
const _hoisted_11 = {
  class: "detail-section"
};
const _hoisted_12 = {
  class: "detail-item"
};
const _hoisted_13 = {
  class: "detail-value"
};
const _hoisted_14 = {
  class: "detail-item"
};
const _hoisted_15 = {
  class: "detail-value"
};
const _hoisted_16 = {
  class: "detail-item"
};
const _hoisted_17 = {
  class: "detail-value"
};
const _hoisted_18 = {
  class: "detail-item"
};
const _hoisted_19 = {
  class: "detail-value"
};
const _hoisted_20 = {
  class: "detail-section"
};
const _hoisted_21 = {
  class: "detail-item"
};
const _hoisted_22 = {
  class: "user-type-badge"
};
const _hoisted_23 = {
  class: "detail-item"
};
const _hoisted_24 = {
  key: 0,
  class: "detail-item"
};
const _hoisted_25 = {
  class: "detail-value"
};
const _hoisted_26 = {
  class: "modal-footer"
};
const _hoisted_27 = {
  class: "modal fade",
  id: "addUserModal",
  tabindex: "-1",
  "aria-labelledby": "addUserLabel",
  "aria-hidden": "true"
};
const _hoisted_28 = {
  class: "modal-dialog modal-dialog-centered modal-lg"
};
const _hoisted_29 = {
  class: "modal-content modern-modal"
};
const _hoisted_30 = {
  class: "modal-body"
};
const _hoisted_31 = {
  class: "row g-4"
};
const _hoisted_32 = {
  class: "col-md-6"
};
const _hoisted_33 = {
  class: "col-md-6"
};
const _hoisted_34 = {
  class: "col-12"
};
const _hoisted_35 = {
  class: "col-md-6"
};
const _hoisted_36 = {
  class: "input-group"
};
const _hoisted_37 = {
  class: "col-md-6"
};
const _hoisted_38 = {
  class: "password-input-wrapper"
};
const _hoisted_39 = ["type"];
const _hoisted_40 = {
  class: "col-md-6"
};
const _hoisted_41 = ["type"];
const _hoisted_42 = {
  class: "col-12"
};
const _hoisted_43 = {
  class: "col-md-6"
};
const _hoisted_44 = {
  class: "col-md-6"
};
const _hoisted_45 = {
  class: "modal fade",
  id: "editUserModal",
  tabindex: "-1",
  "aria-labelledby": "editUserLabel",
  "aria-hidden": "true"
};
const _hoisted_46 = {
  class: "modal-dialog modal-dialog-centered modal-lg"
};
const _hoisted_47 = {
  class: "modal-content modern-modal"
};
const _hoisted_48 = {
  class: "modal-body"
};
const _hoisted_49 = {
  class: "row g-4"
};
const _hoisted_50 = {
  class: "col-md-6"
};
const _hoisted_51 = {
  class: "col-md-6"
};
const _hoisted_52 = {
  class: "col-12"
};
const _hoisted_53 = {
  class: "col-md-6"
};
const _hoisted_54 = {
  class: "input-group"
};
const _hoisted_55 = {
  class: "col-md-6"
};
const _hoisted_56 = {
  class: "col-md-6"
};
const _hoisted_57 = {
  class: "col-md-6"
};
const _hoisted_58 = {
  class: "main-container"
};
const _hoisted_59 = {
  class: "page-header"
};
const _hoisted_60 = {
  class: "header-right"
};
const _hoisted_61 = {
  class: "d-flex gap-2"
};
const _hoisted_62 = {
  class: "stats-cards mb-4"
};
const _hoisted_63 = {
  class: "stat-card"
};
const _hoisted_64 = {
  class: "stat-info"
};
const _hoisted_65 = {
  class: "stat-card"
};
const _hoisted_66 = {
  class: "stat-info"
};
const _hoisted_67 = {
  class: "stat-card"
};
const _hoisted_68 = {
  class: "stat-info"
};
const _hoisted_69 = {
  class: "controls-section mb-4"
};
const _hoisted_70 = {
  class: "search-wrapper"
};
const _hoisted_71 = {
  class: "filters-wrapper"
};
const _hoisted_72 = {
  class: "table-card"
};
const _hoisted_73 = {
  class: "table-wrapper"
};
const _hoisted_74 = {
  class: "users-table"
};
const _hoisted_75 = {
  "data-label": "First Name"
};
const _hoisted_76 = {
  class: "user-cell"
};
const _hoisted_77 = {
  class: "user-avatar"
};
const _hoisted_78 = {
  class: "user-name"
};
const _hoisted_79 = {
  class: "user-id"
};
const _hoisted_80 = {
  class: "user-lastname",
  "data-label": "Last Name"
};
const _hoisted_81 = {
  "data-label": "Email"
};
const _hoisted_82 = {
  class: "email-cell"
};
const _hoisted_83 = {
  "data-label": "Role"
};
const _hoisted_84 = {
  "data-label": "Status"
};
const _hoisted_85 = {
  "data-label": "Last Login"
};
const _hoisted_86 = {
  class: "last-login"
};
const _hoisted_87 = {
  "data-label": "Actions",
  class: "td-actions"
};
const _hoisted_88 = {
  class: "action-buttons"
};
const _hoisted_89 = ["onClick"];
const _hoisted_90 = ["onClick"];
const _hoisted_91 = ["onClick"];
const _hoisted_92 = {
  key: 0
};
const _hoisted_93 = {
  class: "table-footer"
};
const _hoisted_94 = {
  class: "footer-info"
};
const _hoisted_95 = {
  class: "footer-actions"
};
const _hoisted_96 = {
  class: "rows-per-page"
};
const _hoisted_97 = ["value"];
const _hoisted_98 = {
  class: "pagination-controls"
};
const _hoisted_99 = ["disabled"];
const _hoisted_100 = ["disabled"];
const _hoisted_101 = {
  class: "pagination-label"
};
const _hoisted_102 = ["disabled"];
const _hoisted_103 = ["disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" View User Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-user-avatar"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-person-circle"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.name) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.lastname), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.email), 1 /* TEXT */)])]), _cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close btn-close-white",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "section-title"
  }, "Basic Information", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "User ID:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_13, "#" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.id || 'N/A'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "Full Name:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.name) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.lastname), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "Email:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.email), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "Phone:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.phone || 'Not provided'), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "section-title"
  }, "Account Details", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "User Type:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.user_type || 'Not assigned'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "Account Status:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['status-badge', $options.statusClass($data.form.status)])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.status ? $options.capitalizeStatus($data.form.status) : "Active"), 3 /* TEXT, CLASS */)]), _cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "detail-item"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "Last Login:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-value"
  }, "2 hours ago")], -1 /* CACHED */)), $data.form.role ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_24, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "System Role:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.capitalizeRole($data.form.role)), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [_cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-secondary",
    "data-bs-dismiss": "modal"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg me-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Close ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-warning",
    "data-bs-dismiss": "modal",
    "data-bs-toggle": "modal",
    "data-bs-target": "#editUserModal",
    onClick: _cache[0] || (_cache[0] = $event => $options.editModal($data.form))
  }, [...(_cache[46] || (_cache[46] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-pencil me-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Edit User ", -1 /* CACHED */)]))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Add User Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [_cache[66] || (_cache[66] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"modal-header gradient-success\"><div class=\"d-flex align-items-center\"><div class=\"modal-icon-wrapper\"><i class=\"bi bi-person-plus-fill\"></i></div><div><h5 class=\"modal-title mb-0\">Add New User</h5><p class=\"modal-subtitle mb-0\">Create a new user account</p></div></div><button type=\"button\" class=\"btn-close btn-close-white\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onReset: _cache[11] || (_cache[11] = (...args) => $options.resetForm && $options.resetForm(...args)),
    onSubmit: _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.createUser(), ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [_cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("First Name "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.form.name = $event),
    type: "text",
    class: "form-control",
    placeholder: "Enter first name",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.name]]), _cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "form-text"
  }, "User's legal first name", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [_cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Last Name "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.form.lastname = $event),
    type: "text",
    class: "form-control",
    placeholder: "Enter last name",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.lastname]]), _cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "form-text"
  }, "User's legal last name", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [_cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Email Address "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.form.email = $event),
    type: "email",
    class: "form-control",
    placeholder: "user@example.com",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.email]]), _cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "form-text"
  }, "Login and notification email", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [_cache[55] || (_cache[55] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Phone Number", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [_cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text"
  }, "+1", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.form.phone = $event),
    type: "tel",
    class: "form-control",
    placeholder: "(555) 123-4567"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.phone]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [_cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Password "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.form.password = $event),
    type: $data.showPassword ? 'text' : 'password',
    class: "form-control",
    placeholder: "Enter secure password",
    required: ""
  }, null, 8 /* PROPS */, _hoisted_39), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelDynamic, $data.form.password]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "password-toggle",
    onClick: _cache[6] || (_cache[6] = $event => $data.showPassword = !$data.showPassword)
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($data.showPassword ? 'bi bi-eye-slash' : 'bi bi-eye')
  }, null, 2 /* CLASS */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"form-text\">Minimum 8 characters with letters and numbers</div> ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [_cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Confirm Password "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $data.form.password_confirmation = $event),
    type: $data.showPassword ? 'text' : 'password',
    class: "form-control",
    placeholder: "Confirm password",
    required: ""
  }, null, 8 /* PROPS */, _hoisted_41), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelDynamic, $data.form.password_confirmation]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [_cache[59] || (_cache[59] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("User Role "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => $data.form.user_type = $event),
    required: ""
  }, [...(_cache[58] || (_cache[58] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<option value=\"\" disabled>Select User Type</option><option value=\"Super Admin\">Super Admin</option><option value=\"Admin\">Admin</option><option value=\"Manager\">Manager</option><option value=\"Editor\">Editor</option><option value=\"Viewer\">Viewer</option><option value=\"Volunteer\">Volunteer</option>", 7)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.user_type]]), _cache[60] || (_cache[60] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "form-text"
  }, "Defines user permissions and access levels", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [_cache[62] || (_cache[62] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Account Status "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => $data.form.status = $event),
    required: ""
  }, [...(_cache[61] || (_cache[61] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select Status", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "active"
  }, "Active", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "inactive"
  }, "Inactive", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "pending"
  }, "Pending", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.status]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [_cache[64] || (_cache[64] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("System Role "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => $data.form.role = $event),
    required: ""
  }, [...(_cache[63] || (_cache[63] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select Role", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "user"
  }, "User", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "admin"
  }, "Admin", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.role]])])]), _cache[65] || (_cache[65] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"modal-footer mt-4\"><button type=\"button\" class=\"btn btn-outline-secondary\" data-bs-dismiss=\"modal\"> Cancel </button><button type=\"reset\" class=\"btn btn-light\"><i class=\"bi bi-arrow-clockwise me-1\"></i>Reset </button><button type=\"submit\" class=\"btn btn-success\"><i class=\"bi bi-check-circle me-1\"></i>Create User </button></div>", 1))], 32 /* NEED_HYDRATION */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Edit User Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [_cache[80] || (_cache[80] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"modal-header gradient-warning\"><div class=\"d-flex align-items-center\"><div class=\"modal-icon-wrapper\"><i class=\"bi bi-pencil-square\"></i></div><div><h5 class=\"modal-title mb-0\">Edit User</h5><p class=\"modal-subtitle mb-0\">Update user information</p></div></div><button type=\"button\" class=\"btn-close btn-close-white\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.updateUser(), ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [_cache[67] || (_cache[67] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("First Name "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => $data.form.name = $event),
    type: "text",
    class: "form-control",
    placeholder: "Enter first name",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.name]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [_cache[68] || (_cache[68] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Last Name "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => $data.form.lastname = $event),
    type: "text",
    class: "form-control",
    placeholder: "Enter last name",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.lastname]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [_cache[69] || (_cache[69] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Email Address "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => $data.form.email = $event),
    type: "email",
    class: "form-control",
    placeholder: "user@example.com",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.email]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [_cache[71] || (_cache[71] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Phone Number", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [_cache[70] || (_cache[70] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text"
  }, "+1", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => $data.form.phone = $event),
    type: "tel",
    class: "form-control",
    placeholder: "(555) 123-4567"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.phone]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [_cache[73] || (_cache[73] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("User Role "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[17] || (_cache[17] = $event => $data.form.user_type = $event),
    required: ""
  }, [...(_cache[72] || (_cache[72] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<option value=\"\" disabled>Select User Type</option><option value=\"Super Admin\">Super Admin</option><option value=\"Admin\">Admin</option><option value=\"Manager\">Manager</option><option value=\"Editor\">Editor</option><option value=\"Viewer\">Viewer</option><option value=\"Volunteer\">Volunteer</option>", 7)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.user_type]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [_cache[75] || (_cache[75] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Account Status "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => $data.form.status = $event),
    required: ""
  }, [...(_cache[74] || (_cache[74] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select Status", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "active"
  }, "Active", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "inactive"
  }, "Inactive", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "pending"
  }, "Pending", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.status]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [_cache[77] || (_cache[77] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("System Role "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[19] || (_cache[19] = $event => $data.form.role = $event),
    required: ""
  }, [...(_cache[76] || (_cache[76] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select Role", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "user"
  }, "User", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "admin"
  }, "Admin", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.role]])]), _cache[78] || (_cache[78] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-12"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "form-check"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "form-check-input",
    type: "checkbox",
    id: "sendNotification"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-check-label",
    for: "sendNotification"
  }, " Send email notification about these changes ")])], -1 /* CACHED */))]), _cache[79] || (_cache[79] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer mt-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary",
    "data-bs-dismiss": "modal"
  }, " Cancel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-warning"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-save me-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Save Changes ")])], -1 /* CACHED */))], 32 /* NEED_HYDRATION */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [_cache[83] || (_cache[83] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "header-left"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "header-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-people-fill"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "header-text"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", null, "User Management"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Manage and organize your users")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_60, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [_cache[82] || (_cache[82] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-primary btn-export"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-download me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Export ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "data-bs-toggle": "modal",
    "data-bs-target": "#addUserModal",
    class: "btn btn-success btn-add",
    onClick: _cache[21] || (_cache[21] = $event => $options.InitializeForm())
  }, [...(_cache[81] || (_cache[81] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-circle me-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Add New User ", -1 /* CACHED */)]))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Stats Cards "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [_cache[85] || (_cache[85] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon total-users"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-people"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_64, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.totalUsers), 1 /* TEXT */), _cache[84] || (_cache[84] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Total Users", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_65, [_cache[87] || (_cache[87] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon active-users"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-person-check"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.activeUsers), 1 /* TEXT */), _cache[86] || (_cache[86] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Active", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, [_cache[89] || (_cache[89] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon admins"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-shield-check"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.adminCount), 1 /* TEXT */), _cache[88] || (_cache[88] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Admins", -1 /* CACHED */))])]), _cache[90] || (_cache[90] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon new-users"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-person-plus"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-info"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "5"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "New This Week")])], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search and Filters Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_69, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, [_cache[91] || (_cache[91] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search search-icon"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    class: "search-input",
    "onUpdate:modelValue": _cache[22] || (_cache[22] = $event => $data.searchValue = $event),
    "aria-label": "Search users",
    placeholder: "Search by name, email, or user type...",
    onInput: _cache[23] || (_cache[23] = (...args) => $options.onGlobalFilter && $options.onGlobalFilter(...args))
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchValue]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select filter-select",
    "onUpdate:modelValue": _cache[24] || (_cache[24] = $event => $data.selectedRole = $event),
    onChange: _cache[25] || (_cache[25] = (...args) => $options.filterByRole && $options.filterByRole(...args))
  }, [...(_cache[92] || (_cache[92] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<option value=\"\">All Roles</option><option value=\"Super Admin\">Super Admin</option><option value=\"Admin\">Admin</option><option value=\"Manager\">Manager</option><option value=\"Editor\">Editor</option><option value=\"Viewer\">Viewer</option><option value=\"Volunteer\">Volunteer</option>", 7)]))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedRole]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select filter-select",
    "onUpdate:modelValue": _cache[26] || (_cache[26] = $event => $data.selectedStatus = $event),
    onChange: _cache[27] || (_cache[27] = (...args) => $options.filterByStatus && $options.filterByStatus(...args))
  }, [...(_cache[93] || (_cache[93] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: ""
  }, "All Status", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "active"
  }, "Active", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "inactive"
  }, "Inactive", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "pending"
  }, "Pending", -1 /* CACHED */)]))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedStatus]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-secondary",
    onClick: _cache[28] || (_cache[28] = (...args) => $options.clearFilters && $options.clearFilters(...args))
  }, [...(_cache[94] || (_cache[94] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-filter-circle me-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Clear Filters ", -1 /* CACHED */)]))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Table Card "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_74, [_cache[100] || (_cache[100] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "First Name"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Last Name"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Email"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Role"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Status"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Last Login"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    class: "text-center"
  }, "Actions")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.paginatedUsers, user => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
      key: user.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_75, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_77, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.name ? user.name.charAt(0).toUpperCase() : "#"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_78, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.name || "Unknown"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_79, "#" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.id || "—"), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_80, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.lastname || "—"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_81, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_82, [_cache[95] || (_cache[95] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-envelope me-2"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.email || "—"), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_83, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($options.getRoleClass(user.user_type))
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.user_type || "Member"), 3 /* TEXT, CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_84, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['status-badge', $options.statusClass(user.status)])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : "Active"), 3 /* TEXT, CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_85, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_86, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.last_login || "2 hours ago"), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_87, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_88, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      "data-bs-toggle": "modal",
      "data-bs-target": "#viewUserModal",
      class: "action-btn view-btn",
      onClick: $event => $options.viewModal(user),
      title: "View Details"
    }, [...(_cache[96] || (_cache[96] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-eye"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_89), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      "data-bs-toggle": "modal",
      "data-bs-target": "#editUserModal",
      class: "action-btn edit-btn",
      onClick: $event => $options.editModal(user),
      title: "Edit User"
    }, [...(_cache[97] || (_cache[97] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-pencil"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_90), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "action-btn delete-btn",
      onClick: $event => $options.confirmDelete(user),
      title: "Delete User"
    }, [...(_cache[98] || (_cache[98] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-trash"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_91)])])]);
  }), 128 /* KEYED_FRAGMENT */)), !$options.paginatedUsers.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", _hoisted_92, [...(_cache[99] || (_cache[99] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", {
    colspan: "7"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "empty-state no-results"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-people"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "No users found"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Try adjusting your search or filters to find what you're looking for."), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-primary",
    "data-bs-toggle": "modal",
    "data-bs-target": "#addUserModal"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-circle me-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Add First User ")])])], -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_93, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_94, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.paginationLabel), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_95, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_96, [_cache[101] || (_cache[101] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "rowsPerPageSelect"
  }, "Rows per page", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "rowsPerPageSelect",
    "onUpdate:modelValue": _cache[29] || (_cache[29] = $event => $data.rowsPerPage = $event)
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.rowsPerPageOptions, option => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: option,
      value: option
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option), 9 /* TEXT, PROPS */, _hoisted_97);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.rowsPerPage, void 0, {
    number: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_98, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "pagination-btn",
    disabled: $data.currentPage === 1,
    onClick: _cache[30] || (_cache[30] = $event => $options.goToPage(1))
  }, "«", 8 /* PROPS */, _hoisted_99), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "pagination-btn",
    disabled: $data.currentPage === 1,
    onClick: _cache[31] || (_cache[31] = $event => $options.goToPage($data.currentPage - 1))
  }, "‹", 8 /* PROPS */, _hoisted_100), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_101, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.currentPage) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.totalPages), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "pagination-btn",
    disabled: $data.currentPage === $options.totalPages,
    onClick: _cache[32] || (_cache[32] = $event => $options.goToPage($data.currentPage + 1))
  }, "›", 8 /* PROPS */, _hoisted_102), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "pagination-btn",
    disabled: $data.currentPage === $options.totalPages,
    onClick: _cache[33] || (_cache[33] = $event => $options.goToPage($options.totalPages))
  }, "»", 8 /* PROPS */, _hoisted_103)]), _cache[102] || (_cache[102] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-sm btn-outline-secondary"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-download me-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Export Data ")], -1 /* CACHED */))])])])])]);
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

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/PricingComponent.vue?vue&type=style&index=0&id=30d81c9e&scoped=true&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/PricingComponent.vue?vue&type=style&index=0&id=30d81c9e&scoped=true&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SubscriptionForm.vue?vue&type=style&index=0&id=b111d74a&scoped=true&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SubscriptionForm.vue?vue&type=style&index=0&id=b111d74a&scoped=true&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=9eec2362&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=9eec2362&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PaymentComponent.vue?vue&type=style&index=0&id=7630d39d&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PaymentComponent.vue?vue&type=style&index=0&id=7630d39d&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/ProfileComponent.vue?vue&type=style&index=0&id=5a89864c&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/ProfileComponent.vue?vue&type=style&index=0&id=5a89864c&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=style&index=0&id=386b6e5b&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=style&index=0&id=386b6e5b&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ "./resources/components/vue/PricingComponent.vue":
/*!*******************************************************!*\
  !*** ./resources/components/vue/PricingComponent.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PricingComponent_vue_vue_type_template_id_30d81c9e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PricingComponent.vue?vue&type=template&id=30d81c9e&scoped=true */ "./resources/components/vue/PricingComponent.vue?vue&type=template&id=30d81c9e&scoped=true");
/* harmony import */ var _PricingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PricingComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/PricingComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _PricingComponent_vue_vue_type_style_index_0_id_30d81c9e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PricingComponent.vue?vue&type=style&index=0&id=30d81c9e&scoped=true&lang=css */ "./resources/components/vue/PricingComponent.vue?vue&type=style&index=0&id=30d81c9e&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_PricingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PricingComponent_vue_vue_type_template_id_30d81c9e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-30d81c9e"],['__file',"resources/components/vue/PricingComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/PricingComponent.vue?vue&type=script&lang=js":
/*!*******************************************************************************!*\
  !*** ./resources/components/vue/PricingComponent.vue?vue&type=script&lang=js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PricingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PricingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PricingComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/PricingComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/PricingComponent.vue?vue&type=style&index=0&id=30d81c9e&scoped=true&lang=css":
/*!***************************************************************************************************************!*\
  !*** ./resources/components/vue/PricingComponent.vue?vue&type=style&index=0&id=30d81c9e&scoped=true&lang=css ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PricingComponent_vue_vue_type_style_index_0_id_30d81c9e_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PricingComponent.vue?vue&type=style&index=0&id=30d81c9e&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/PricingComponent.vue?vue&type=style&index=0&id=30d81c9e&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/PricingComponent.vue?vue&type=template&id=30d81c9e&scoped=true":
/*!*************************************************************************************************!*\
  !*** ./resources/components/vue/PricingComponent.vue?vue&type=template&id=30d81c9e&scoped=true ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PricingComponent_vue_vue_type_template_id_30d81c9e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PricingComponent_vue_vue_type_template_id_30d81c9e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PricingComponent.vue?vue&type=template&id=30d81c9e&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/PricingComponent.vue?vue&type=template&id=30d81c9e&scoped=true");


/***/ }),

/***/ "./resources/components/vue/SubscriptionForm.vue":
/*!*******************************************************!*\
  !*** ./resources/components/vue/SubscriptionForm.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SubscriptionForm_vue_vue_type_template_id_b111d74a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SubscriptionForm.vue?vue&type=template&id=b111d74a&scoped=true */ "./resources/components/vue/SubscriptionForm.vue?vue&type=template&id=b111d74a&scoped=true");
/* harmony import */ var _SubscriptionForm_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SubscriptionForm.vue?vue&type=script&setup=true&lang=js */ "./resources/components/vue/SubscriptionForm.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _SubscriptionForm_vue_vue_type_style_index_0_id_b111d74a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SubscriptionForm.vue?vue&type=style&index=0&id=b111d74a&scoped=true&lang=css */ "./resources/components/vue/SubscriptionForm.vue?vue&type=style&index=0&id=b111d74a&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_SubscriptionForm_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_SubscriptionForm_vue_vue_type_template_id_b111d74a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-b111d74a"],['__file',"resources/components/vue/SubscriptionForm.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/SubscriptionForm.vue?vue&type=script&setup=true&lang=js":
/*!******************************************************************************************!*\
  !*** ./resources/components/vue/SubscriptionForm.vue?vue&type=script&setup=true&lang=js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionForm_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionForm_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SubscriptionForm.vue?vue&type=script&setup=true&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SubscriptionForm.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/SubscriptionForm.vue?vue&type=style&index=0&id=b111d74a&scoped=true&lang=css":
/*!***************************************************************************************************************!*\
  !*** ./resources/components/vue/SubscriptionForm.vue?vue&type=style&index=0&id=b111d74a&scoped=true&lang=css ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionForm_vue_vue_type_style_index_0_id_b111d74a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SubscriptionForm.vue?vue&type=style&index=0&id=b111d74a&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SubscriptionForm.vue?vue&type=style&index=0&id=b111d74a&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/SubscriptionForm.vue?vue&type=template&id=b111d74a&scoped=true":
/*!*************************************************************************************************!*\
  !*** ./resources/components/vue/SubscriptionForm.vue?vue&type=template&id=b111d74a&scoped=true ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionForm_vue_vue_type_template_id_b111d74a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionForm_vue_vue_type_template_id_b111d74a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SubscriptionForm.vue?vue&type=template&id=b111d74a&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SubscriptionForm.vue?vue&type=template&id=b111d74a&scoped=true");


/***/ }),

/***/ "./resources/components/vue/admin_panels/DashboardComponent.vue":
/*!**********************************************************************!*\
  !*** ./resources/components/vue/admin_panels/DashboardComponent.vue ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DashboardComponent_vue_vue_type_template_id_9eec2362_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DashboardComponent.vue?vue&type=template&id=9eec2362&scoped=true */ "./resources/components/vue/admin_panels/DashboardComponent.vue?vue&type=template&id=9eec2362&scoped=true");
/* harmony import */ var _DashboardComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DashboardComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/admin_panels/DashboardComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _DashboardComponent_vue_vue_type_style_index_0_id_9eec2362_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DashboardComponent.vue?vue&type=style&index=0&id=9eec2362&scoped=true&lang=css */ "./resources/components/vue/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=9eec2362&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_DashboardComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_DashboardComponent_vue_vue_type_template_id_9eec2362_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-9eec2362"],['__file',"resources/components/vue/admin_panels/DashboardComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/admin_panels/DashboardComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/DashboardComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DashboardComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/DashboardComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=9eec2362&scoped=true&lang=css":
/*!******************************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=9eec2362&scoped=true&lang=css ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_style_index_0_id_9eec2362_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DashboardComponent.vue?vue&type=style&index=0&id=9eec2362&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/DashboardComponent.vue?vue&type=style&index=0&id=9eec2362&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/admin_panels/DashboardComponent.vue?vue&type=template&id=9eec2362&scoped=true":
/*!****************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/DashboardComponent.vue?vue&type=template&id=9eec2362&scoped=true ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_template_id_9eec2362_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_template_id_9eec2362_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DashboardComponent.vue?vue&type=template&id=9eec2362&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/DashboardComponent.vue?vue&type=template&id=9eec2362&scoped=true");


/***/ }),

/***/ "./resources/components/vue/admin_panels/DonationComponent.vue":
/*!*********************************************************************!*\
  !*** ./resources/components/vue/admin_panels/DonationComponent.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DonationComponent_vue_vue_type_template_id_768e9975__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DonationComponent.vue?vue&type=template&id=768e9975 */ "./resources/components/vue/admin_panels/DonationComponent.vue?vue&type=template&id=768e9975");
/* harmony import */ var _DonationComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DonationComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/admin_panels/DonationComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_DonationComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_DonationComponent_vue_vue_type_template_id_768e9975__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/admin_panels/DonationComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/admin_panels/DonationComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/DonationComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DonationComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DonationComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DonationComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/DonationComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/admin_panels/DonationComponent.vue?vue&type=template&id=768e9975":
/*!***************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/DonationComponent.vue?vue&type=template&id=768e9975 ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DonationComponent_vue_vue_type_template_id_768e9975__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DonationComponent_vue_vue_type_template_id_768e9975__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DonationComponent.vue?vue&type=template&id=768e9975 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/DonationComponent.vue?vue&type=template&id=768e9975");


/***/ }),

/***/ "./resources/components/vue/admin_panels/FeedbackComponent.vue":
/*!*********************************************************************!*\
  !*** ./resources/components/vue/admin_panels/FeedbackComponent.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FeedbackComponent_vue_vue_type_template_id_01c37862__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FeedbackComponent.vue?vue&type=template&id=01c37862 */ "./resources/components/vue/admin_panels/FeedbackComponent.vue?vue&type=template&id=01c37862");
/* harmony import */ var _FeedbackComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FeedbackComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/admin_panels/FeedbackComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_FeedbackComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_FeedbackComponent_vue_vue_type_template_id_01c37862__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/admin_panels/FeedbackComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/admin_panels/FeedbackComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/FeedbackComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FeedbackComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FeedbackComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FeedbackComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/FeedbackComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/admin_panels/FeedbackComponent.vue?vue&type=template&id=01c37862":
/*!***************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/FeedbackComponent.vue?vue&type=template&id=01c37862 ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FeedbackComponent_vue_vue_type_template_id_01c37862__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FeedbackComponent_vue_vue_type_template_id_01c37862__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FeedbackComponent.vue?vue&type=template&id=01c37862 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/FeedbackComponent.vue?vue&type=template&id=01c37862");


/***/ }),

/***/ "./resources/components/vue/admin_panels/MailingListComponent.vue":
/*!************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/MailingListComponent.vue ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MailingListComponent_vue_vue_type_template_id_0b0ad17a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MailingListComponent.vue?vue&type=template&id=0b0ad17a */ "./resources/components/vue/admin_panels/MailingListComponent.vue?vue&type=template&id=0b0ad17a");
/* harmony import */ var _MailingListComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MailingListComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/admin_panels/MailingListComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_MailingListComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_MailingListComponent_vue_vue_type_template_id_0b0ad17a__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/admin_panels/MailingListComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/admin_panels/MailingListComponent.vue?vue&type=script&lang=js":
/*!************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/MailingListComponent.vue?vue&type=script&lang=js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MailingListComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MailingListComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MailingListComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/MailingListComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/admin_panels/MailingListComponent.vue?vue&type=template&id=0b0ad17a":
/*!******************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/MailingListComponent.vue?vue&type=template&id=0b0ad17a ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MailingListComponent_vue_vue_type_template_id_0b0ad17a__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MailingListComponent_vue_vue_type_template_id_0b0ad17a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MailingListComponent.vue?vue&type=template&id=0b0ad17a */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/MailingListComponent.vue?vue&type=template&id=0b0ad17a");


/***/ }),

/***/ "./resources/components/vue/admin_panels/PaymentComponent.vue":
/*!********************************************************************!*\
  !*** ./resources/components/vue/admin_panels/PaymentComponent.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PaymentComponent_vue_vue_type_template_id_7630d39d_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PaymentComponent.vue?vue&type=template&id=7630d39d&scoped=true */ "./resources/components/vue/admin_panels/PaymentComponent.vue?vue&type=template&id=7630d39d&scoped=true");
/* harmony import */ var _PaymentComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PaymentComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/admin_panels/PaymentComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _PaymentComponent_vue_vue_type_style_index_0_id_7630d39d_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PaymentComponent.vue?vue&type=style&index=0&id=7630d39d&scoped=true&lang=css */ "./resources/components/vue/admin_panels/PaymentComponent.vue?vue&type=style&index=0&id=7630d39d&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_PaymentComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PaymentComponent_vue_vue_type_template_id_7630d39d_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-7630d39d"],['__file',"resources/components/vue/admin_panels/PaymentComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/admin_panels/PaymentComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/PaymentComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PaymentComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PaymentComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PaymentComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PaymentComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/admin_panels/PaymentComponent.vue?vue&type=style&index=0&id=7630d39d&scoped=true&lang=css":
/*!****************************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/PaymentComponent.vue?vue&type=style&index=0&id=7630d39d&scoped=true&lang=css ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PaymentComponent_vue_vue_type_style_index_0_id_7630d39d_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PaymentComponent.vue?vue&type=style&index=0&id=7630d39d&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PaymentComponent.vue?vue&type=style&index=0&id=7630d39d&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/admin_panels/PaymentComponent.vue?vue&type=template&id=7630d39d&scoped=true":
/*!**************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/PaymentComponent.vue?vue&type=template&id=7630d39d&scoped=true ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PaymentComponent_vue_vue_type_template_id_7630d39d_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PaymentComponent_vue_vue_type_template_id_7630d39d_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PaymentComponent.vue?vue&type=template&id=7630d39d&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/PaymentComponent.vue?vue&type=template&id=7630d39d&scoped=true");


/***/ }),

/***/ "./resources/components/vue/admin_panels/ProfileComponent.vue":
/*!********************************************************************!*\
  !*** ./resources/components/vue/admin_panels/ProfileComponent.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProfileComponent_vue_vue_type_template_id_5a89864c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProfileComponent.vue?vue&type=template&id=5a89864c&scoped=true */ "./resources/components/vue/admin_panels/ProfileComponent.vue?vue&type=template&id=5a89864c&scoped=true");
/* harmony import */ var _ProfileComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProfileComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/admin_panels/ProfileComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _ProfileComponent_vue_vue_type_style_index_0_id_5a89864c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProfileComponent.vue?vue&type=style&index=0&id=5a89864c&scoped=true&lang=css */ "./resources/components/vue/admin_panels/ProfileComponent.vue?vue&type=style&index=0&id=5a89864c&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ProfileComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ProfileComponent_vue_vue_type_template_id_5a89864c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-5a89864c"],['__file',"resources/components/vue/admin_panels/ProfileComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/admin_panels/ProfileComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/ProfileComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ProfileComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/ProfileComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/admin_panels/ProfileComponent.vue?vue&type=style&index=0&id=5a89864c&scoped=true&lang=css":
/*!****************************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/ProfileComponent.vue?vue&type=style&index=0&id=5a89864c&scoped=true&lang=css ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileComponent_vue_vue_type_style_index_0_id_5a89864c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ProfileComponent.vue?vue&type=style&index=0&id=5a89864c&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/ProfileComponent.vue?vue&type=style&index=0&id=5a89864c&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/admin_panels/ProfileComponent.vue?vue&type=template&id=5a89864c&scoped=true":
/*!**************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/ProfileComponent.vue?vue&type=template&id=5a89864c&scoped=true ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileComponent_vue_vue_type_template_id_5a89864c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileComponent_vue_vue_type_template_id_5a89864c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ProfileComponent.vue?vue&type=template&id=5a89864c&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/ProfileComponent.vue?vue&type=template&id=5a89864c&scoped=true");


/***/ }),

/***/ "./resources/components/vue/admin_panels/UsersComponent.vue":
/*!******************************************************************!*\
  !*** ./resources/components/vue/admin_panels/UsersComponent.vue ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UsersComponent_vue_vue_type_template_id_386b6e5b__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsersComponent.vue?vue&type=template&id=386b6e5b */ "./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=template&id=386b6e5b");
/* harmony import */ var _UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UsersComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _UsersComponent_vue_vue_type_style_index_0_id_386b6e5b_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UsersComponent.vue?vue&type=style&index=0&id=386b6e5b&lang=css */ "./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=style&index=0&id=386b6e5b&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_UsersComponent_vue_vue_type_template_id_386b6e5b__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/admin_panels/UsersComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UsersComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=style&index=0&id=386b6e5b&lang=css":
/*!**************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=style&index=0&id=386b6e5b&lang=css ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsersComponent_vue_vue_type_style_index_0_id_386b6e5b_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UsersComponent.vue?vue&type=style&index=0&id=386b6e5b&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=style&index=0&id=386b6e5b&lang=css");


/***/ }),

/***/ "./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=template&id=386b6e5b":
/*!************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=template&id=386b6e5b ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsersComponent_vue_vue_type_template_id_386b6e5b__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsersComponent_vue_vue_type_template_id_386b6e5b__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UsersComponent.vue?vue&type=template&id=386b6e5b */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=template&id=386b6e5b");


/***/ }),

/***/ "./resources/css/app.css":
/*!*******************************!*\
  !*** ./resources/css/app.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/css/layout.css":
/*!**********************************!*\
  !*** ./resources/css/layout.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vform */ "./node_modules/vform/dist/vform.es.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var sweetalert2_dist_sweetalert2_min_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! sweetalert2/dist/sweetalert2.min.css */ "./node_modules/sweetalert2/dist/sweetalert2.min.css");
/* harmony import */ var primevue_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primevue/config */ "./node_modules/primevue/config/config.esm.js");
/* harmony import */ var primevue_resources_themes_saga_blue_theme_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primevue/resources/themes/saga-blue/theme.css */ "./node_modules/primevue/resources/themes/saga-blue/theme.css");
/* harmony import */ var primevue_resources_primevue_min_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primevue/resources/primevue.min.css */ "./node_modules/primevue/resources/primevue.min.css");
/* harmony import */ var primevue_datatable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primevue/datatable */ "./node_modules/primevue/datatable/datatable.esm.js");
/* harmony import */ var primevue_column__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primevue/column */ "./node_modules/primevue/column/column.esm.js");
/* harmony import */ var primevue_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primevue/button */ "./node_modules/primevue/button/button.esm.js");
/* harmony import */ var primevue_dropdown__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primevue/dropdown */ "./node_modules/primevue/dropdown/dropdown.esm.js");
/* harmony import */ var primevue_inputtext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primevue/inputtext */ "./node_modules/primevue/inputtext/inputtext.esm.js");
/* harmony import */ var primevue_card__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primevue/card */ "./node_modules/primevue/card/card.esm.js");
/* harmony import */ var primevue_tabview__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primevue/tabview */ "./node_modules/primevue/tabview/tabview.esm.js");
/* harmony import */ var primevue_tabpanel__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primevue/tabpanel */ "./node_modules/primevue/tabpanel/tabpanel.esm.js");
/* harmony import */ var primevue_accordion__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primevue/accordion */ "./node_modules/primevue/accordion/accordion.esm.js");
/* harmony import */ var primevue_accordiontab__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primevue/accordiontab */ "./node_modules/primevue/accordiontab/accordiontab.esm.js");
/* harmony import */ var primevue_listbox__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primevue/listbox */ "./node_modules/primevue/listbox/listbox.esm.js");
/* harmony import */ var primevue_fieldset__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! primevue/fieldset */ "./node_modules/primevue/fieldset/fieldset.esm.js");
/* harmony import */ var primevue_panel__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primevue/panel */ "./node_modules/primevue/panel/panel.esm.js");
/* harmony import */ var primevue_dialog__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primevue/dialog */ "./node_modules/primevue/dialog/dialog.esm.js");
/* harmony import */ var primevue_image__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! primevue/image */ "./node_modules/primevue/image/image.esm.js");
/* harmony import */ var primevue_editor__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! primevue/editor */ "./node_modules/primevue/editor/editor.esm.js");
/* harmony import */ var _components_admin_panels_UsersComponent_vue__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/admin_panels/UsersComponent.vue */ "./resources/js/components/admin_panels/UsersComponent.vue");
/* harmony import */ var _components_admin_panels_MailingListComponent_vue__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/admin_panels/MailingListComponent.vue */ "./resources/js/components/admin_panels/MailingListComponent.vue");
/* harmony import */ var _components_admin_panels_FeedbackComponent_vue__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/admin_panels/FeedbackComponent.vue */ "./resources/js/components/admin_panels/FeedbackComponent.vue");
/* harmony import */ var _components_admin_panels_PaymentComponent_vue__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/admin_panels/PaymentComponent.vue */ "./resources/js/components/admin_panels/PaymentComponent.vue");
/* harmony import */ var _components_admin_panels_DonationComponent_vue__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/admin_panels/DonationComponent.vue */ "./resources/js/components/admin_panels/DonationComponent.vue");
/* harmony import */ var _components_admin_panels_ProfileComponent_vue__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/admin_panels/ProfileComponent.vue */ "./resources/js/components/admin_panels/ProfileComponent.vue");
/* harmony import */ var _components_admin_panels_DashboardComponent_vue__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/admin_panels/DashboardComponent.vue */ "./resources/js/components/admin_panels/DashboardComponent.vue");
/* harmony import */ var _components_PricingComponent_vue__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./components/PricingComponent.vue */ "./resources/js/components/PricingComponent.vue");
/* harmony import */ var _components_SubscriptionForm_vue__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./components/SubscriptionForm.vue */ "./resources/js/components/SubscriptionForm.vue");
/* harmony import */ var _components_AiComponent_vue__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./components/AiComponent.vue */ "./resources/js/components/AiComponent.vue");
/* harmony import */ var vue_stripe_elements_plus__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! vue-stripe-elements-plus */ "./node_modules/vue-stripe-elements-plus/dist/index.js");
/* harmony import */ var vue_stripe_elements_plus__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(vue_stripe_elements_plus__WEBPACK_IMPORTED_MODULE_35__);
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");
console.log('[Vue] app.js start');
__webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");


window.bootstrap = bootstrap__WEBPACK_IMPORTED_MODULE_1__;



































// Removed session milestone tracking

const app = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)({
  components: {
    SubscriptionForm: _components_SubscriptionForm_vue__WEBPACK_IMPORTED_MODULE_33__["default"]
  },
  setup() {
    const isAuthenticated = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(!!document.querySelector('meta[name="user"]'));
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
      isAuthenticated.value = !!document.querySelector('meta[name="user"]');
    });
    return {
      isAuthenticated
    };
  },
  data() {
    return {
      darkModeState: {
        isDarkMode: false,
        setDarkMode: this.setDarkMode // Method to update dark mode state
      }
    };
  },
  created() {
    // Load dark mode preference from localStorage on app creation
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      this.darkModeState.isDarkMode = savedMode === 'true';
    }
  },
  methods: {
    setDarkMode(isDarkMode) {
      this.darkModeState.isDarkMode = isDarkMode;
      // Save the preference to localStorage
      localStorage.setItem('darkMode', isDarkMode);
    }
    // Removed startSessionMilestones method
  },
  provide() {
    // Provide the dark mode state to all child components
    return {
      darkModeState: this.darkModeState
    };
  }
});
window.Form = vform__WEBPACK_IMPORTED_MODULE_3__.Form;
window.Swal = (sweetalert2__WEBPACK_IMPORTED_MODULE_4___default());
window.$ = window.jQuery = (jquery__WEBPACK_IMPORTED_MODULE_2___default());
app.use(primevue_config__WEBPACK_IMPORTED_MODULE_6__["default"]);
// Protect against plugins that don't expose install with Vue 3 build
try {
  if (vue_stripe_elements_plus__WEBPACK_IMPORTED_MODULE_35__.StripePlugin && (typeof vue_stripe_elements_plus__WEBPACK_IMPORTED_MODULE_35__.StripePlugin === 'function' || typeof vue_stripe_elements_plus__WEBPACK_IMPORTED_MODULE_35__.StripePlugin.install === 'function')) {
    app.use(vue_stripe_elements_plus__WEBPACK_IMPORTED_MODULE_35__.StripePlugin, {
      key: process.env.MIX_STRIPE_PUBLISHABLE_KEY
    });
  } else {
    console.log('[Stripe] Plugin not compatible with current Vue build; skipping');
  }
} catch (e) {
  console.debug('[Stripe] Skipped plugin registration:', (e === null || e === void 0 ? void 0 : e.message) || e);
}
app.component("Column", primevue_column__WEBPACK_IMPORTED_MODULE_10__["default"]);
app.component("DataTable", primevue_datatable__WEBPACK_IMPORTED_MODULE_9__["default"]);
app.component("Button", primevue_button__WEBPACK_IMPORTED_MODULE_11__["default"]);
app.component("Dropdown", primevue_dropdown__WEBPACK_IMPORTED_MODULE_12__["default"]);
app.component("InputText", primevue_inputtext__WEBPACK_IMPORTED_MODULE_13__["default"]);
app.component("AccordionTab", primevue_accordiontab__WEBPACK_IMPORTED_MODULE_18__["default"]);
app.component("Accordion", primevue_accordion__WEBPACK_IMPORTED_MODULE_17__["default"]);
app.component("Card", primevue_card__WEBPACK_IMPORTED_MODULE_14__["default"]);
app.component("TabView", primevue_tabview__WEBPACK_IMPORTED_MODULE_15__["default"]);
app.component("TabPanel", primevue_tabpanel__WEBPACK_IMPORTED_MODULE_16__["default"]);
app.component("ListBox", primevue_listbox__WEBPACK_IMPORTED_MODULE_19__["default"]);
app.component("Fieldset", primevue_fieldset__WEBPACK_IMPORTED_MODULE_20__["default"]);
app.component("Panel", primevue_panel__WEBPACK_IMPORTED_MODULE_21__["default"]);
app.component("Dialog", primevue_dialog__WEBPACK_IMPORTED_MODULE_22__["default"]);
app.component("Image", primevue_image__WEBPACK_IMPORTED_MODULE_23__["default"]);
app.component("Editor", primevue_editor__WEBPACK_IMPORTED_MODULE_24__["default"]);
const asyncComponentLoaders = {
  "subscription-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_SubscriptionComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/SubscriptionComponent.vue */ "./resources/js/components/SubscriptionComponent.vue")),
  "dark-mode-toggle": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_DarkModeToggle_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/DarkModeToggle.vue */ "./resources/js/components/DarkModeToggle.vue")),
  "users-component": () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/UsersComponent.vue */ "./resources/js/components/admin_panels/UsersComponent.vue")),
  "mailing-list-component": () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/MailingListComponent.vue */ "./resources/js/components/admin_panels/MailingListComponent.vue")),
  "feedback-component": () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/FeedbackComponent.vue */ "./resources/js/components/admin_panels/FeedbackComponent.vue")),
  "payment-component": () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/PaymentComponent.vue */ "./resources/js/components/admin_panels/PaymentComponent.vue")),
  "donation-component": () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/DonationComponent.vue */ "./resources/js/components/admin_panels/DonationComponent.vue")),
  "profile-component": () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/ProfileComponent.vue */ "./resources/js/components/admin_panels/ProfileComponent.vue")),
  "dashboard-component": () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/DashboardComponent.vue */ "./resources/js/components/admin_panels/DashboardComponent.vue")),
  "homepage-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_HomepageComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/HomepageComponent.vue */ "./resources/js/components/HomepageComponent.vue")),
  "pricing-component": () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./components/PricingComponent.vue */ "./resources/js/components/PricingComponent.vue")),
  "contact-component": () => __webpack_require__.e(/*! import() */ "resources_js_components_ContactComponent_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./components/ContactComponent.vue */ "./resources/js/components/ContactComponent.vue")),
  "charity-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_CharityComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/CharityComponent.vue */ "./resources/js/components/CharityComponent.vue")),
  "volunteer-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_VolunteerComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/VolunteerComponent.vue */ "./resources/js/components/VolunteerComponent.vue")),
  "digital-library-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_DigitalLibraryComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/DigitalLibraryComponent.vue */ "./resources/js/components/DigitalLibraryComponent.vue")),
  "ahadith-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_AhadithComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/AhadithComponent.vue */ "./resources/js/components/AhadithComponent.vue")),
  "correction-component": () => __webpack_require__.e(/*! import() */ "resources_js_components_admin_panels_CorrectionComponent_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/CorrectionComponent.vue */ "./resources/js/components/admin_panels/CorrectionComponent.vue")),
  "quran-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_QuranComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/QuranComponent.vue */ "./resources/js/components/QuranComponent.vue")),
  "about-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_AboutComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/AboutComponent.vue */ "./resources/js/components/AboutComponent.vue")),
  "about-us-component": () => __webpack_require__.e(/*! import() */ "resources_js_components_AboutUsComponent_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./components/AboutUsComponent.vue */ "./resources/js/components/AboutUsComponent.vue")),
  "bookmark-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_admin_panels_BookmarkComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/BookmarkComponent.vue */ "./resources/js/components/admin_panels/BookmarkComponent.vue")),
  "playlist-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_admin_panels_PlaylistComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/PlaylistComponent.vue */ "./resources/js/components/admin_panels/PlaylistComponent.vue")),
  "pins-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_admin_panels_PinsComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/PinsComponent.vue */ "./resources/js/components/admin_panels/PinsComponent.vue")),
  "updates-component": () => __webpack_require__.e(/*! import() */ "resources_js_components_UpdatesComponent_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./components/UpdatesComponent.vue */ "./resources/js/components/UpdatesComponent.vue")),
  "join_us-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_JoinUsComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/JoinUsComponent.vue */ "./resources/js/components/JoinUsComponent.vue")),
  "notes-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_admin_panels_NotesComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/NotesComponent.vue */ "./resources/js/components/admin_panels/NotesComponent.vue")),
  "group-notes-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_admin_panels_GroupNotesComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/GroupNotesComponent.vue */ "./resources/js/components/admin_panels/GroupNotesComponent.vue")),
  "mission-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_MissionComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/MissionComponent.vue */ "./resources/js/components/MissionComponent.vue")),
  "access-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_AccessComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/AccessComponent.vue */ "./resources/js/components/AccessComponent.vue")),
  "content-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_ContentComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ContentComponent.vue */ "./resources/js/components/ContentComponent.vue")),
  "surat-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_SuratComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/SuratComponent.vue */ "./resources/js/components/SuratComponent.vue")),
  "search-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_surah_selection_CustomSurahSelection_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/surah_selection/CustomSurahSelection.vue */ "./resources/js/components/surah_selection/CustomSurahSelection.vue")),
  "surah-list-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_search_SurahList_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/search/SurahList.vue */ "./resources/js/components/search/SurahList.vue")),
  "donations-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_intro_Donation_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/intro/Donation.vue */ "./resources/js/components/intro/Donation.vue")),
  "collection-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_admin_panels_CollectionComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/admin_panels/CollectionComponent.vue */ "./resources/js/components/admin_panels/CollectionComponent.vue")),
  "TinymceEditor": () => Promise.all(/*! import() */[__webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_tinymce_TinymceEditor_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/tinymce/TinymceEditor.vue */ "./resources/js/components/tinymce/TinymceEditor.vue")),
  "faq-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_FaqComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/FaqComponent.vue */ "./resources/js/components/FaqComponent.vue")),
  "support-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_SupportComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/SupportComponent.vue */ "./resources/js/components/SupportComponent.vue")),
  "dua-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_DuaComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/DuaComponent.vue */ "./resources/js/components/DuaComponent.vue")),
  "radio-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_RadioComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/RadioComponent.vue */ "./resources/js/components/RadioComponent.vue")),
  "guide-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_GuideComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/GuideComponent.vue */ "./resources/js/components/GuideComponent.vue")),
  "streaming-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_StreamingComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/StreamingComponent.vue */ "./resources/js/components/StreamingComponent.vue")),
  "toolkit-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_ToolkitComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ToolkitComponent.vue */ "./resources/js/components/ToolkitComponent.vue")),
  "video-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_VideoComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/VideoComponent.vue */ "./resources/js/components/VideoComponent.vue")),
  "zakat-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_ZakatComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ZakatComponent.vue */ "./resources/js/components/ZakatComponent.vue")),
  "qibla-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_QiblaComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/QiblaComponent.vue */ "./resources/js/components/QiblaComponent.vue")),
  "mosque-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_MosqueComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/MosqueComponent.vue */ "./resources/js/components/MosqueComponent.vue")),
  "calendar-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_CalendarComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/CalendarComponent.vue */ "./resources/js/components/CalendarComponent.vue")),
  "date-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_DateComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/DateComponent.vue */ "./resources/js/components/DateComponent.vue")),
  "hadith-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_HadithComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/HadithComponent.vue */ "./resources/js/components/HadithComponent.vue")),
  "shop-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_ShopComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ShopComponent.vue */ "./resources/js/components/ShopComponent.vue")),
  "tasbeeh-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_TasbeehComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/TasbeehComponent.vue */ "./resources/js/components/TasbeehComponent.vue")),
  "athkar-component": () => __webpack_require__.e(/*! import() */ "resources_js_components_AthkarComponenet_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./components/AthkarComponenet.vue */ "./resources/js/components/AthkarComponenet.vue")),
  "finance-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_FinanceComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/FinanceComponent.vue */ "./resources/js/components/FinanceComponent.vue")),
  "umrah-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_UmrahComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/UmrahComponent.vue */ "./resources/js/components/UmrahComponent.vue")),
  "name-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_NameComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/NameComponent.vue */ "./resources/js/components/NameComponent.vue")),
  "prayer-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_PrayerComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/PrayerComponent.vue */ "./resources/js/components/PrayerComponent.vue")),
  "travel-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_TravelComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/TravelComponent.vue */ "./resources/js/components/TravelComponent.vue")),
  "media-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_MediaComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/MediaComponent.vue */ "./resources/js/components/MediaComponent.vue")),
  "knowledge-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_KnowledgeComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/KnowledgeComponent.vue */ "./resources/js/components/KnowledgeComponent.vue")),
  "services-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_ServicesComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ServicesComponent.vue */ "./resources/js/components/ServicesComponent.vue")),
  "store-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_StoreComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/StoreComponent.vue */ "./resources/js/components/StoreComponent.vue")),
  "food-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_FoodComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/FoodComponent.vue */ "./resources/js/components/FoodComponent.vue")),
  "school-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_SchoolComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/SchoolComponent.vue */ "./resources/js/components/SchoolComponent.vue")),
  "welfare-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_WelfareComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/WelfareComponent.vue */ "./resources/js/components/WelfareComponent.vue")),
  "books-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_BooksComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/BooksComponent.vue */ "./resources/js/components/BooksComponent.vue")),
  "convert-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_ConvertComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ConvertComponent.vue */ "./resources/js/components/ConvertComponent.vue")),
  "holy-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_HolyComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/HolyComponent.vue */ "./resources/js/components/HolyComponent.vue")),
  "history-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_HistoryComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/HistoryComponent.vue */ "./resources/js/components/HistoryComponent.vue")),
  "payment-methods-component": () => __webpack_require__.e(/*! import() */ "resources_js_components_PaymentMethodsComponent_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./components/PaymentMethodsComponent.vue */ "./resources/js/components/PaymentMethodsComponent.vue")),
  "read-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_ReadComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ReadComponent.vue */ "./resources/js/components/ReadComponent.vue")),
  "revert-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_RevertComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/RevertComponent.vue */ "./resources/js/components/RevertComponent.vue")),
  "muslim-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_MuslimComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/MuslimComponent.vue */ "./resources/js/components/MuslimComponent.vue")),
  "bookmark-manager": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_bookmarks_BookmarkManager_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/bookmarks/BookmarkManager.vue */ "./resources/js/components/bookmarks/BookmarkManager.vue")),
  "shared-folder-view": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_bookmarks_SharedFolderView_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/bookmarks/SharedFolderView.vue */ "./resources/js/components/bookmarks/SharedFolderView.vue")),
  "resources-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("resources_js_components_ResourcesComponent_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ResourcesComponent.vue */ "./resources/js/components/ResourcesComponent.vue")),
  "ramadan-2026-component": () => Promise.all(/*! import() */[__webpack_require__.e("css/app"), __webpack_require__.e("/js/vendor"), __webpack_require__.e("resources_js_components_Ramadan2026Component_vue")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/Ramadan2026Component.vue */ "./resources/js/components/Ramadan2026Component.vue"))
};
const registerAsyncComponent = (name, loader) => {
  app.component(name, (0,vue__WEBPACK_IMPORTED_MODULE_0__.defineAsyncComponent)({
    loader: () => loader().then(module => (module === null || module === void 0 ? void 0 : module.default) || module),
    suspensible: false,
    delay: 150,
    timeout: 30000
  }));
};
Object.entries(asyncComponentLoaders).forEach(([name, loader]) => registerAsyncComponent(name, loader));

// Keep AI assistant in the main bundle so layout and template updates are not blocked by stale async chunk caches.
app.component("ai-component", _components_AiComponent_vue__WEBPACK_IMPORTED_MODULE_34__["default"]);
const mountApp = () => {
  const target = document.getElementById('app');
  if (!target) {
    console.warn('[Vue] mount target #app not found yet; retrying after DOMContentLoaded');
    document.addEventListener('DOMContentLoaded', () => {
      const t2 = document.getElementById('app');
      if (t2) {
        app.mount('#app');
        console.log('[Vue] mounted on #app (after DOMContentLoaded)');
      } else {
        console.error('[Vue] mount failed: #app missing on DOMContentLoaded');
      }
    }, {
      once: true
    });
    return;
  }
  app.mount('#app');
  console.log('[Vue] mounted on #app');
};
try {
  mountApp();
} catch (e) {
  console.error('[Vue] mount failed:', e);
  try {
    const root = document.getElementById('app');
    if (root) root.innerHTML = '<div style="padding:16px;color:#b00020;">App failed to initialize. Check console for details.</div>';
  } catch (_) {}
}

// Global error diagnostics to surface silent failures
window.addEventListener('error', e => {
  console.error('[GlobalError]', (e === null || e === void 0 ? void 0 : e.message) || e);
});
window.addEventListener('unhandledrejection', e => {
  console.error('[UnhandledRejection]', (e === null || e === void 0 ? void 0 : e.reason) || e);
});

/***/ }),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var admin_lte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! admin-lte */ "./node_modules/admin-lte/dist/js/adminlte.min.js");
/* harmony import */ var admin_lte__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(admin_lte__WEBPACK_IMPORTED_MODULE_3__);


// Ensure jQuery is available globally before AdminLTE

window.$ = window.jQuery = (jquery__WEBPACK_IMPORTED_MODULE_1___default());

// Import Bootstrap and AdminLTE JavaScript


window.axios = axios__WEBPACK_IMPORTED_MODULE_0__["default"];
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Accept'] = 'application/json';
window.axios.defaults.headers.common['Content-Type'] = 'application/json';
const csrfMeta = document.head.querySelector('meta[name="csrf-token"]');
if (csrfMeta !== null && csrfMeta !== void 0 && csrfMeta.content) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfMeta.content;
}

/**
* Configure axios for Laravel Sanctum
*/
axios__WEBPACK_IMPORTED_MODULE_0__["default"].defaults.withCredentials = true;
axios__WEBPACK_IMPORTED_MODULE_0__["default"].defaults.baseURL = window.location.origin;
const BOOKMARK_SESSION_KEY = 'ic_bookmark_session_id';
function ensureBookmarkSessionId() {
  if (typeof window === 'undefined') return null;
  let sessionId = window.localStorage.getItem(BOOKMARK_SESSION_KEY);
  if (!sessionId) {
    sessionId = `bm_${Math.random().toString(36).slice(2, 12)}_${Date.now()}`;
    window.localStorage.setItem(BOOKMARK_SESSION_KEY, sessionId);
  }
  return sessionId;
}
const bookmarkSessionId = ensureBookmarkSessionId();
if (bookmarkSessionId) {
  window.axios.defaults.headers.common['X-Bookmark-Session'] = bookmarkSessionId;
}

/**
* Add request interceptor to log requests for debugging
*/
axios__WEBPACK_IMPORTED_MODULE_0__["default"].interceptors.request.use(config => {
  console.log(`Making ${config.method.toUpperCase()} request to: ${config.url}`);
  return config;
}, error => Promise.reject(error));

/**
* Add response interceptor to handle 401 errors globally
*/
axios__WEBPACK_IMPORTED_MODULE_0__["default"].interceptors.response.use(response => {
  console.log(`Response from ${response.config.url}:`, response.status);
  return response;
}, error => {
  var _error$config, _error$response, _error$response2, _error$response3, _error$response4;
  console.error(`Error response from ${(_error$config = error.config) === null || _error$config === void 0 ? void 0 : _error$config.url}:`, (_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status, (_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.data);
  if (((_error$response3 = error.response) === null || _error$response3 === void 0 ? void 0 : _error$response3.status) === 401 && !window.location.pathname.includes('/login')) {
    console.log('Authentication required');
  }
  if (((_error$response4 = error.response) === null || _error$response4 === void 0 ? void 0 : _error$response4.status) === 405) {
    var _error$config2, _error$config3;
    console.error('Method not allowed:', (_error$config2 = error.config) === null || _error$config2 === void 0 ? void 0 : _error$config2.method, (_error$config3 = error.config) === null || _error$config3 === void 0 ? void 0 : _error$config3.url);
  }
  return Promise.reject(error);
});

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
 

/***/ }),

/***/ "./resources/js/components/PricingComponent.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/PricingComponent.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PricingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PricingComponent.vue?vue&type=script&lang=js */ "./resources/js/components/PricingComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_PricingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/PricingComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/PricingComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/components/PricingComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PricingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PricingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PricingComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/PricingComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/SubscriptionForm.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/SubscriptionForm.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SubscriptionForm_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SubscriptionForm.vue?vue&type=script&lang=js */ "./resources/js/components/SubscriptionForm.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_SubscriptionForm_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/SubscriptionForm.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/SubscriptionForm.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/components/SubscriptionForm.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionForm_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SubscriptionForm_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SubscriptionForm.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/SubscriptionForm.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/admin_panels/DashboardComponent.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/components/admin_panels/DashboardComponent.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DashboardComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DashboardComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_DashboardComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/admin_panels/DashboardComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DashboardComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DashboardComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DashboardComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/admin_panels/DonationComponent.vue":
/*!********************************************************************!*\
  !*** ./resources/js/components/admin_panels/DonationComponent.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DonationComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DonationComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/DonationComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_DonationComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/admin_panels/DonationComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/DonationComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/DonationComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DonationComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DonationComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DonationComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/DonationComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/admin_panels/FeedbackComponent.vue":
/*!********************************************************************!*\
  !*** ./resources/js/components/admin_panels/FeedbackComponent.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FeedbackComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FeedbackComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/FeedbackComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_FeedbackComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/admin_panels/FeedbackComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/FeedbackComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/FeedbackComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FeedbackComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FeedbackComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FeedbackComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/FeedbackComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/admin_panels/MailingListComponent.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/components/admin_panels/MailingListComponent.vue ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MailingListComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MailingListComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/MailingListComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_MailingListComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/admin_panels/MailingListComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/MailingListComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/MailingListComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MailingListComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MailingListComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MailingListComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/MailingListComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/admin_panels/PaymentComponent.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/components/admin_panels/PaymentComponent.vue ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PaymentComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PaymentComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_PaymentComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/admin_panels/PaymentComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=script&lang=js":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PaymentComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PaymentComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PaymentComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/PaymentComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/admin_panels/ProfileComponent.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/components/admin_panels/ProfileComponent.vue ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProfileComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProfileComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_ProfileComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/admin_panels/ProfileComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=script&lang=js":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ProfileComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ProfileComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/ProfileComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/admin_panels/UsersComponent.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/components/admin_panels/UsersComponent.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsersComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/UsersComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/admin_panels/UsersComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/UsersComponent.vue?vue&type=script&lang=js":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/UsersComponent.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UsersComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/UsersComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/utils/bookmarkAuth.js":
/*!********************************************!*\
  !*** ./resources/js/utils/bookmarkAuth.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchUserIdFromApi: () => (/* binding */ fetchUserIdFromApi),
/* harmony export */   resolveClientUserId: () => (/* binding */ resolveClientUserId)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");

const USER_META_SELECTOR = 'meta[name="user"]';
function parseId(value) {
  if (value === undefined || value === null) return null;
  const normalized = String(value).trim();
  if (!normalized) return null;
  const asNumber = Number(normalized);
  return Number.isFinite(asNumber) && asNumber > 0 ? asNumber : normalized;
}
function resolveClientUserId() {
  var _window, _document$body, _document$body2;
  if (typeof window === 'undefined') {
    return null;
  }
  if ((_window = window) !== null && _window !== void 0 && (_window = _window.Laravel) !== null && _window !== void 0 && _window.userId) {
    return parseId(window.Laravel.userId);
  }
  const meta = document.querySelector(USER_META_SELECTOR);
  const metaValue = parseId(meta === null || meta === void 0 ? void 0 : meta.getAttribute('content'));
  if (metaValue) {
    return metaValue;
  }
  const datasetValue = parseId(((_document$body = document.body) === null || _document$body === void 0 || (_document$body = _document$body.dataset) === null || _document$body === void 0 ? void 0 : _document$body.userId) || ((_document$body2 = document.body) === null || _document$body2 === void 0 || (_document$body2 = _document$body2.dataset) === null || _document$body2 === void 0 ? void 0 : _document$body2.user));
  if (datasetValue) {
    return datasetValue;
  }
  return null;
}
async function fetchUserIdFromApi() {
  const localId = resolveClientUserId();
  if (localId) {
    return localId;
  }
  try {
    var _response$data;
    const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/userId');
    const apiValue = parseId((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.userId);
    if (apiValue) {
      return apiValue;
    }
  } catch (error) {
    // swallow; helper should not break callers
  }
  return null;
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["css/app","css/layout","/js/vendor"], () => (__webpack_exec__("./resources/js/app.js"), __webpack_exec__("./resources/css/app.css"), __webpack_exec__("./resources/css/layout.css")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);