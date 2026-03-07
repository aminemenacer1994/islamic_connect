<template>
  <section class="ai-section ai-gpt" ref="aiRoot" aria-label="Islamic chatbot">
    <div :class="['ai-gpt-shell', { 'is-sidebar-collapsed': sidebarCollapsed }]">
      <aside class="ai-gpt-sidebar" aria-label="Saved chats">
        <div class="ai-gpt-sidebar-top">
          <button
            type="button"
            class="ai-gpt-sidebar-toggle"
            :aria-label="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
            @click="toggleSidebar">
            <i :class="sidebarCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left'" aria-hidden="true"></i>
          </button>
        </div>
        <button type="button" class="ai-gpt-new-chat" :disabled="chatLoading" @click="startNewChat">
          <i class="fas fa-plus" aria-hidden="true"></i>
          <span>New chat</span>
        </button>

        <div class="ai-gpt-sidebar-head">
          <p class="mb-0">Recent chats</p>
          <button
            type="button"
            class="ai-gpt-clear-all"
            :disabled="!chatSessions.length"
            @click="prepareClearAllSessions">
            Clear all
          </button>
        </div>

        <div v-if="pendingClearAll" class="ai-gpt-inline-alert" role="alert">
          <span>Delete all saved chats?</span>
          <div class="ai-gpt-inline-actions">
            <button type="button" @click="cancelPendingClearAll">Cancel</button>
            <button type="button" class="ai-gpt-danger" @click="doClearAllSessions">Delete</button>
          </div>
        </div>

        <div class="ai-gpt-session-list" role="listbox" aria-label="Saved chats">
          <div
            v-for="session in chatSessions"
            :key="session.id"
            class="ai-gpt-session-row">
            <button
              type="button"
              :class="['ai-gpt-session-item', { 'is-active': session.id === selectedSessionId }]"
              @click="selectSessionFromList(session.id)">
              <span class="ai-gpt-session-title">{{ formatSessionLabel(session) }}</span>
              <span class="ai-gpt-session-time">{{ formatSessionTimestamp(session.updatedAt) }}</span>
            </button>
            <button
              type="button"
              class="ai-gpt-session-delete"
              aria-label="Delete saved chat"
              @click.stop="prepareDeleteSession(session.id)">
              <i class="fas fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <p v-if="!chatSessions.length" class="ai-gpt-session-empty mb-0">
            No saved chats yet.
          </p>
        </div>

        <div v-if="pendingDeleteSessionId" class="ai-gpt-inline-alert ai-gpt-inline-alert--warn" role="alert">
          <span>Delete “{{ pendingDeleteSessionLabel }}”?</span>
          <div class="ai-gpt-inline-actions">
            <button type="button" @click="cancelPendingDelete">Cancel</button>
            <button type="button" class="ai-gpt-danger" @click="doDeleteSession">Delete</button>
          </div>
        </div>

        <div class="ai-gpt-sidebar-foot">
          <button
            type="button"
            class="ai-gpt-sidebar-btn"
            :disabled="!chatHistory.length"
            @click="clearHistory">
            <i class="fas fa-trash-alt" aria-hidden="true"></i>
            <span>Clear current</span>
          </button>
        </div>
      </aside>

      <div class="ai-gpt-main">
        <header class="ai-gpt-topbar">
          <div class="ai-gpt-brand">
            <span class="ai-gpt-brand-icon" aria-hidden="true">
              <i class="fas fa-star-and-crescent"></i>
            </span>
            <div>
              <h2>Noor AI Assistant</h2>
              <p>Quran and Hadith grounded guidance with transparent references.</p>
            </div>
          </div>
          <button type="button" class="ai-gpt-trust-btn" @click="openDisclaimerModal">
            Trust &amp; disclaimer
          </button>
        </header>

        <div v-if="copyNotice" class="ai-copy-notice" role="status" aria-live="polite">
          <i class="fas fa-check-circle me-1" aria-hidden="true"></i>
          {{ copyNotice }}
        </div>

        <div v-if="chatError" class="ai-error-banner" role="alert" aria-live="assertive" aria-atomic="true">
          <i class="fas fa-exclamation-triangle ai-error-icon" aria-hidden="true"></i>
          <div>
            <p class="ai-error-title mb-1">Need some redirection?</p>
            <p class="ai-error-message mb-0">{{ chatError }}</p>
            <button v-if="sessionExpired" type="button" class="ai-error-clear mt-2" @click="reloadPage">
              Reload page
            </button>
          </div>
        </div>

        <section ref="chatShell" class="ai-gpt-conversation">
          <div v-if="!chatHistory.length && !chatLoading" class="ai-gpt-empty" role="status" aria-live="polite">
            <h3>How can Noor help today?</h3>
            <p>Ask for Quran verses, hadith insights, and practical next steps for your day.</p>
            <div class="ai-gpt-prompt-grid" role="list" aria-label="Quick prompts">
              <button
                v-for="(prompt, promptIndex) in quickPrompts"
                :key="`quick-prompt-${promptIndex}`"
                type="button"
                class="ai-gpt-prompt-card"
                :disabled="chatLoading"
                @click="applyQuickPrompt(prompt.prompt)">
                <span class="ai-gpt-prompt-label">{{ prompt.label }}</span>
                <span class="ai-gpt-prompt-text">{{ prompt.prompt }}</span>
              </button>
            </div>
          </div>

          <div
            v-if="chatHistory.length || chatLoading"
            ref="chatWindow"
            class="ai-gpt-messages"
            role="log"
            aria-live="polite">
            <article
              v-for="(entry, idx) in chatHistory"
              :key="`chat-${idx}-${entry.role}`"
              :class="['ai-gpt-message-row', entry.role]">
              <span class="ai-gpt-avatar" aria-hidden="true">
                <i :class="entry.role === 'assistant' ? 'fas fa-star-and-crescent' : 'fas fa-user'"></i>
              </span>

              <div class="ai-gpt-message-block">
                <div class="ai-gpt-message-meta">
                  <span class="ai-gpt-author">{{ entry.role === 'assistant' ? 'Noor' : 'You' }}</span>
                  <span class="ai-gpt-time">{{ entry.displayTime }} · {{ entry.displayDate }}</span>
                </div>
                <div
                  :class="['ai-gpt-message-body', entry.role]"
                  v-html="formatChatText(entry.text, entry.role, entry.references)"></div>

                <div
                  v-if="entry.role === 'assistant' && entry.verification"
                  :class="['chat-verification', getVerificationBadgeClass(entry.verification)]"
                  aria-live="polite">
                  <i class="fas fa-check-circle" aria-hidden="true"></i>
                  <span>{{ formatVerificationLabel(entry.verification) }}</span>
                </div>

                <div v-if="entry.references && entry.references.length" class="chat-references-wrapper">
                  <ul class="chat-references" role="list">
                    <li v-for="(reference, refIndex) in entry.references" :key="`ref-${idx}-${refIndex}-${reference.label}`">
                      <span class="chat-reference-main">
                        <template v-if="reference.url">
                          <a :href="reference.url" target="_blank" rel="noopener noreferrer">{{ reference.label }}</a>
                        </template>
                        <template v-else>
                          {{ reference.label }}
                        </template>
                      </span>
                      <span class="chat-reference-badges">
                        <span :class="[
                          'chat-reference-badge',
                          getSourceBadgeClass ? getSourceBadgeClass(reference.sourceBadge) : 'chat-reference-badge--aggregated',
                        ]">
                          {{ formatSourceBadge ? formatSourceBadge(reference.sourceBadge) : (reference.sourceBadge || 'Aggregated') }}
                        </span>
                        <span
                          v-if="reference.isHadith"
                          :class="[
                            'chat-reference-badge',
                            getHadithGradeBadgeClass ? getHadithGradeBadgeClass(reference.hadithGrade) : 'chat-reference-badge--ungraded',
                          ]">
                          {{ formatHadithGrade ? formatHadithGrade(reference.hadithGrade) : (reference.hadithGrade || 'Ungraded') }}
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </article>

            <article v-if="chatLoading" class="ai-gpt-message-row assistant ai-gpt-message-row--typing" aria-live="polite">
              <span class="ai-gpt-avatar" aria-hidden="true">
                <i class="fas fa-star-and-crescent"></i>
              </span>
              <div class="ai-gpt-message-block">
                <div class="ai-gpt-message-meta">
                  <span class="ai-gpt-author">Noor</span>
                  <span class="ai-gpt-time">now</span>
                </div>
                <div class="ai-gpt-message-body assistant ai-gpt-message-body--typing" role="status">
                  <span class="chat-typing-dot"></span>
                  <span class="chat-typing-dot"></span>
                  <span class="chat-typing-dot"></span>
                  <span class="chat-typing-text">Noor is typing...</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <form ref="aiForm" class="ai-gpt-composer" @submit.prevent="sendChatMessage">
          <label class="visually-hidden" for="aiChatInput">Ask Noor</label>
          <div class="ai-gpt-input-wrap">
            <textarea
              id="aiChatInput"
              ref="aiChatInput"
              v-model="chatDraft"
              class="ai-gpt-textarea ai-gpt-textarea--pill"
              rows="1"
              maxlength="1500"
              placeholder="Ask Noor a question..."
              :disabled="chatLoading"
              @input="handleDraftInput"
              @keydown="handleComposerKeydown"></textarea>
            <button
              type="button"
              :class="['ai-gpt-pill-btn ai-gpt-pill-btn--mic', { 'is-active': voiceListening }]"
              :disabled="chatLoading"
              :aria-label="voiceListening ? 'Stop voice input' : 'Start voice input'"
              @click="toggleVoiceSearch">
              <i :class="voiceListening ? 'fas fa-stop' : 'fas fa-microphone'" aria-hidden="true"></i>
            </button>
            <button type="submit" class="ai-gpt-send ai-gpt-send--circle" :disabled="chatLoading || !chatDraft.trim()">
              <i v-if="!chatLoading" class="fas fa-paper-plane" aria-hidden="true"></i>
              <span v-if="chatLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span class="visually-hidden">{{ chatLoading ? 'Thinking...' : 'Send' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div
      v-if="showDisclaimerModal"
      class="ai-disclaimer-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="aiDisclaimerModalTitle"
      @click.self="closeDisclaimerModal">
      <div class="ai-disclaimer-modal-card" @click.stop>
        <div class="ai-disclaimer-modal-head">
          <h3 id="aiDisclaimerModalTitle" class="mb-0">Trust &amp; Disclaimer</h3>
          <button type="button" class="ai-disclaimer-close" @click="closeDisclaimerModal" aria-label="Close disclaimer">
            <i class="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <div class="ai-disclaimer-modal-body">
          <p>Noor provides educational Islamic guidance and does not replace qualified scholarly fatwa.</p>
          <p>Verify religious rulings with trusted scholars, your local imam, or recognized institutions before acting.</p>
          <p class="mb-0">For urgent spiritual or personal concerns, seek direct human support from knowledgeable people you trust.</p>
        </div>
        <div class="ai-disclaimer-modal-foot">
          <button type="button" class="ai-disclaimer-close-btn" @click="closeDisclaimerModal">
            Close
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  DEFAULT_BATCH_SIZE,
  DEFAULT_QUESTION_COUNT,
  FREE_ISLAMIC_APIS,
  IslamicQuestionGenerator,
  QUESTION_BANK_META_STORAGE_KEY,
  QUESTION_BANK_STORAGE_KEY,
  chunkQuestionBatches,
  ensureQuestionBank,
  loadQuestionBankFromStorage,
} from '../scripts/islamicAiToolkit';

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
const AI_CRITICAL_VERSE_CANONICAL_TEXTS = Object.freeze({
  '1:1': 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  '1:2': 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
  '2:255': 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ',
  '112:1': 'قُلْ هُوَ اللَّهُ أَحَدٌ',
  '112:2': 'اللَّهُ الصَّمَدُ',
  '112:3': 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
  '112:4': 'وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
});
const SESSION_MEMORY_LIMIT = 30;
const SESSION_STORAGE_COMPACTION_STEPS = [
  { maxSessions: 24, maxEntries: 40, maxTextLength: 2200, keepReferences: true, keepSummary: true },
  { maxSessions: 16, maxEntries: 28, maxTextLength: 1400, keepReferences: false, keepSummary: true },
  { maxSessions: 10, maxEntries: 18, maxTextLength: 900, keepReferences: false, keepSummary: false },
  { maxSessions: 6, maxEntries: 10, maxTextLength: 560, keepReferences: false, keepSummary: false },
];
const CHAT_DRAFT_MAX_LENGTH = 1500;

export default {
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
      quickPrompts: [
        {
          label: 'Daily Worship',
          prompt: 'How can I stay consistent with salah when my schedule is busy?',
        },
        {
          label: 'Quran Reflection',
          prompt: 'Share a Quran verse about patience and how to apply it today.',
        },
        {
          label: 'Character',
          prompt: 'What does Islam teach about controlling anger in difficult moments?',
        },
      ],
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
      return this.chatHistory.some((entry) => entry.role === 'assistant');
    },
    selectedSessionInfo() {
      if (!this.chatSessions.length) {
        return '';
      }
      const session = this.chatSessions.find((entry) => entry.id === this.selectedSessionId) || this.chatSessions[0];
      if (!session) {
        return '';
      }
      const updatedLabel = this.formatSessionTimestamp(session.updatedAt);
      const messageCount = session.history?.length || 0;
      return `Last updated ${updatedLabel} · ${messageCount} msg${messageCount === 1 ? '' : 's'}`;
    },
    pendingDeleteSessionLabel() {
      if (!this.pendingDeleteSessionId) {
        return '';
      }
      const session = this.chatSessions.find((entry) => entry.id === this.pendingDeleteSessionId);
      if (!session) {
        return '';
      }
      return this.formatSessionLabel(session);
    },
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
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault();
        this.sendChatMessage();
      }
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
      const providedSummary = Array.isArray(summaryBullets)
        ? summaryBullets.map((item) => String(item || '').trim()).filter(Boolean).slice(0, 4)
        : null;
      const resolvedSummary = providedSummary !== null
        ? providedSummary
        : (role === 'assistant' ? [] : this.extractSummaryBulletPoints(text));
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
        displayTime: now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        displayDate: now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }),
      };
    },
    getVerificationBadgeClass(verification) {
      if (Number(verification?.criticalHashes?.failed || 0) > 0) {
        return 'chat-verification--low';
      }
      const confidence = verification?.confidence || 'low';
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
      const checkedHashes = Number(verification?.criticalHashes?.checked || 0);
      const passedHashes = Number(verification?.criticalHashes?.passed || 0);
      const unresolvedHashes = Number(verification?.criticalHashes?.unresolved || 0);
      const failedHashes = Number(verification?.criticalHashes?.failed || 0);
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
        "'": '&#39;',
      };
      return value.replace(/[&<>"']/g, (char) => map[char]);
    },
    normalizeChatTextForDisplay(value = '') {
      if (!value) {
        return '';
      }
      const cleaned = String(value)
        .replace(/\r\n?/g, '\n')
        .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, ' ')
        .replace(/…+/g, ' ')
        .replace(/\.{3,}/g, '.')
        .replace(/[ \t]{2,}/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .replace(/\*\*/g, '')
        .trim();
      return this.cleanupTrailingFragment(cleaned);
    },
    splitParagraphIntoReadableChunks(value = '') {
      const paragraph = String(value || '')
        .replace(/[ \t]{2,}/g, ' ')
        .trim();
      if (!paragraph) {
        return [];
      }
      if (paragraph.length <= 240) {
        return [paragraph];
      }
      const sentences = (paragraph.match(/[^.!?]+(?:[.!?]+|$)/g) || [])
        .map((item) => item.trim())
        .filter(Boolean);
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
      const blocks = String(value).split(/\n{2,}/).map((item) => item.trim()).filter(Boolean);
      const htmlBlocks = [];

      blocks.forEach((block) => {
        const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
        if (!lines.length) {
          return;
        }
        const isUnorderedList = lines.every((line) => /^[-*•]\s+/.test(line));
        const isOrderedList = lines.every((line) => /^\d+[.)]\s+/.test(line));

        if (isUnorderedList || isOrderedList) {
          const tag = isOrderedList ? 'ol' : 'ul';
          const items = lines
            .map((line) => line.replace(/^([-*•]|\d+[.)])\s+/, '').trim())
            .filter(Boolean)
            .map((item) => `<li>${this.escapeHtml(item)}</li>`)
            .join('');
          if (items) {
            htmlBlocks.push(`<${tag}>${items}</${tag}>`);
            return;
          }
        }

        const paragraphText = lines
          .join(' ')
          .replace(/[ \t]{2,}/g, ' ')
          .replace(/[,:;]\s*$/, '')
          .trim();
        if (!paragraphText) {
          return;
        }
        const chunks = this.splitParagraphIntoReadableChunks(paragraphText);
        chunks.forEach((chunk) => {
          htmlBlocks.push(`<p>${this.escapeHtml(chunk)}</p>`);
        });
      });

      return htmlBlocks.join('');
    },
    hasHadithCue(value = '') {
      const normalized = String(value || '')
        .toLowerCase()
        .replace(/[’`]/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
      if (!normalized) {
        return false;
      }
      return /\b(narrated|reported|it was narrated|one day allah's messenger|allah's messenger|messenger of allah|the prophet|sahih|bukhari|muslim|tirmidhi|nasai|abu dawud|ibn majah|companion|abu hurairah|ibn 'abbas|i heard|i used to)\b/.test(normalized);
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
      const normalized = text
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();
      return /\b(o you who believe|indeed allah|allah says|surah|ayah|quran)\b/.test(normalized);
    },
    splitAssistantParagraphByContentMarkers(value = '') {
      const text = String(value || '')
        .replace(/[ \t]{2,}/g, ' ')
        .trim();
      if (!text) {
        return [];
      }
      const splitReady = text
        .replace(
          /(\S)\s+(?=(Narrated|It was narrated|Reported|One day Allah[’'`]s Messenger|Allah[’'`]s Messenger|Messenger of Allah|The Prophet|I heard|I used to|Abu Hurairah|`Umar|Umar))/gi,
          '$1\n\n',
        )
        .replace(/\n{3,}/g, '\n\n')
        .trim();
      return splitReady
        .split(/\n{2,}/)
        .map((item) => item.trim())
        .filter(Boolean);
    },
    extractAssistantParagraphs(value = '') {
      if (!value) {
        return [];
      }
      const prepared = String(value)
        .replace(/(\[[^\]]+\])\s+(?=(Narrated|It was narrated|Reported|Allah'?s Messenger|Messenger of Allah|The Prophet))/gi, '$1\n\n')
        .replace(/([.!?])\s+(?=(Narrated|It was narrated|Reported|Allah'?s Messenger|Messenger of Allah|The Prophet|I heard|I used to|Abu Hurairah|`Umar|Umar))/gi, '$1\n\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      let paragraphs = prepared.split(/\n{2,}/).map((item) => item.trim()).filter(Boolean);
      if (paragraphs.length === 1 && paragraphs[0].length > 320) {
        paragraphs = this.splitParagraphIntoReadableChunks(paragraphs[0]);
      }
      return paragraphs
        .flatMap((paragraph) => this.splitAssistantParagraphByContentMarkers(paragraph))
        .map((item) => item.replace(/[ \t]{2,}/g, ' ').trim())
        .filter(Boolean);
    },
    buildAssistantSectionHtml(title, paragraphs = []) {
      const items = Array.isArray(paragraphs) ? paragraphs : [];
      if (!items.length) {
        return '';
      }
      const body = items
        .map((paragraph) => this.renderTextBlocksToHtml(paragraph))
        .filter(Boolean)
        .join('');
      if (!body) {
        return '';
      }
      return `<section class="ai-gpt-answer-section"><h4 class="ai-gpt-answer-title">${this.escapeHtml(title)}</h4><div class="ai-gpt-answer-copy">${body}</div></section>`;
    },
    formatAssistantSections(value = '', references = []) {
      const paragraphs = this.extractAssistantParagraphs(value);
      if (!paragraphs.length) {
        return '';
      }
      const quranOnly = paragraphs.filter((paragraph) => (
        this.isLikelyQuranParagraph(paragraph) && !this.hasHadithCue(paragraph)
      ));
      const quranFallback = paragraphs.filter((paragraph) => this.isLikelyQuranParagraph(paragraph));
      const nonHadithFallback = paragraphs.filter((paragraph) => !this.isLikelyHadithParagraph(paragraph));
      const selectedParagraphs = quranOnly.length
        ? quranOnly
        : (quranFallback.length ? quranFallback : (nonHadithFallback.length ? nonHadithFallback.slice(0, 1) : paragraphs.slice(0, 1)));
      return this.buildAssistantSectionHtml('Quran verse', selectedParagraphs);
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
      let text = String(value || '')
        .replace(/[ \t]{2,}/g, ' ')
        .trim();
      if (!text) {
        return '';
      }

      const paragraphs = text.split(/\n{2,}/).map((item) => item.trim()).filter(Boolean);
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
          const boundary = Math.max(
            withoutTail.lastIndexOf('.'),
            withoutTail.lastIndexOf('!'),
            withoutTail.lastIndexOf('?'),
            withoutTail.lastIndexOf('\n'),
          );
          text = boundary >= 0
            ? withoutTail.slice(0, boundary + 1).trim()
            : withoutTail.trim();
        }
      }

      return text
        .replace(/[,:;]\s*$/, '')
        .trim();
    },
    stripProviderTagNoise(value = '') {
      return String(value || '')
        .replace(/\(([^)]+)\)/g, (fullMatch, inner) => (
          /\b(api|api\.quran\.com|alquran\.cloud|quran\.gading\.dev|quranenc|quran enc|source)\b/i.test(inner)
            ? ''
            : fullMatch
        ))
        .replace(/\s*[-|–—]\s*(api\.quran\.com|alquran\.cloud|quran\.gading\.dev|quranenc|quran enc)\b/gi, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
    },
    removeApiNamesFromText(value = '') {
      const replacementRules = [
        { pattern: /\bapi\.quran\.com\b/gi, replacement: 'trusted Quran source' },
        { pattern: /\balquran\.cloud\b/gi, replacement: 'trusted Quran source' },
        { pattern: /\bquran\.gading\.dev\b/gi, replacement: 'trusted Quran source' },
        { pattern: /\bquranenc\b/gi, replacement: 'trusted Quran source' },
        { pattern: /\bquran enc\b/gi, replacement: 'trusted Quran source' },
        { pattern: /\bthe\s+api\b/gi, replacement: 'the source' },
        { pattern: /\bapi\b/gi, replacement: 'source' },
      ];
      let sanitized = this.stripProviderTagNoise(String(value || ''));
      replacementRules.forEach(({ pattern, replacement }) => {
        sanitized = sanitized.replace(pattern, replacement);
      });
      return sanitized
        .replace(/\s{2,}/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    },
    improveAssistantMessageReadability(message = '') {
      let text = String(message || '')
        .replace(/\r\n?/g, '\n')
        .replace(/\bAlso:\s*/gi, '')
        .replace(/…+/g, ' ')
        .replace(/\.{3,}/g, '.')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .replace(/[ \t]{2,}/g, ' ')
        .trim();

      text = this.removeApiNamesFromText(text)
        .replace(/[ \t]{2,}/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      text = text
        .replace(/;\s+/g, ';\n')
        .replace(/\s+(?=\d+[.)]\s)/g, '\n')
        .replace(/(\[[^\]]+\])\s+(?=(Narrated|It was narrated|Reported|I used to|I heard))/gi, '$1\n\n')
        .replace(/([.!?])\s+(?=(Narrated|It was narrated|Reported|I used to|I heard|The Prophet))/gi, '$1\n\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      if (text && !/\n/.test(text) && text.length > 180) {
        const sentences = (text.match(/[^.!?]+[.!?]+/g) || [])
          .map((item) => item.trim())
          .filter(Boolean);
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
      const isKnownApiHost = [
        'api.quran.com',
        'alquran.cloud',
        'quran.gading.dev',
        'quranenc.com',
      ].includes(host) || host.startsWith('api.');
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
      const explicit = this.normalizeSourceBadge(
        reference?.sourceBadge
        || reference?.source_badge
        || reference?.sourceType
        || reference?.source_type
        || reference?.origin
        || '',
      );
      if (explicit) {
        return explicit;
      }

      const host = String(hostname || '').toLowerCase();
      const lowerLabel = String(label || '').toLowerCase();
      const officialHosts = [
        'quran.com',
        'sunnah.com',
        'dorar.net',
        'islamqa.info',
        'binbaz.org.sa',
      ];
      if (officialHosts.some((domain) => host === domain || host.endsWith(`.${domain}`))) {
        return 'official';
      }

      const verifiedHosts = [
        'api.quran.com',
        'alquran.cloud',
        'quran.gading.dev',
        'quranenc.com',
        'myislam.org',
        'seekersguidance.org',
      ];
      if (verifiedHosts.some((domain) => host === domain || host.endsWith(`.${domain}`))) {
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
      const normalized = String(value || '')
        .toLowerCase()
        .replace(/[’`]/g, "'")
        .replace(/[^a-z0-9'\s-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
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
      const gradeCandidates = [
        reference?.hadithGrade,
        reference?.hadith_grade,
        reference?.grade,
        reference?.grading,
        reference?.classification,
        reference?.status,
      ];
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
      if (reference?.isHadith === true || reference?.is_hadith === true) {
        return true;
      }
      if (this.normalizeHadithGradeValue(reference?.hadithGrade || reference?.hadith_grade || reference?.grade || reference?.grading)) {
        return true;
      }
      const host = this.extractReferenceHostname(url);
      const text = `${String(label || '')} ${host} ${String(url || '')}`.toLowerCase();
      return /\b(hadith|bukhari|muslim|tirmidhi|nasai|abu dawud|ibn majah|muwatta|riyad)\b/.test(text)
        || host === 'sunnah.com'
        || host.endsWith('.sunnah.com')
        || host === 'dorar.net'
        || host.endsWith('.dorar.net');
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
        hadithGrade: isHadith ? (hadithGrade || 'ungraded') : '',
      };
    },
    normalizeReferenceList(references) {
      if (!Array.isArray(references)) {
        return [];
      }
      const normalized = [];
      const seen = new Set();
      references.forEach((reference) => {
        if (typeof reference === 'string') {
          const label = this.sanitizeReferenceLabel(reference.trim(), null);
          if (!label) {
            return;
          }
          const key = label.toLowerCase();
          if (seen.has(key)) {
            return;
          }
          seen.add(key);
          normalized.push({
            label: label.slice(0, 180),
            url: null,
            ...this.buildReferenceMetadata({}, label, null),
          });
          return;
        }
        if (!reference || typeof reference !== 'object') {
          return;
        }
        const label = String(
          reference.label
          || reference.reference
          || reference.title
          || reference.name
          || '',
        ).trim();
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
        normalized.push({
          label: cleanedLabel.slice(0, 180),
          url,
          ...this.buildReferenceMetadata(reference, cleanedLabel, url),
        });
      });
      return normalized.slice(0, 2);
    },
    normalizeSummaryList(summary) {
      if (!Array.isArray(summary)) {
        return [];
      }
      return summary
        .map((item) => String(item || '').trim())
        .filter(Boolean)
        .slice(0, 4);
    },
    normalizeVerificationPayload(verification, fallbackSourceCount = 0) {
      if (!verification || typeof verification !== 'object') {
        return {
          verified: false,
          confidence: fallbackSourceCount > 1 ? 'medium' : 'low',
          totalSources: Number(fallbackSourceCount || 0),
          message: '',
        };
      }
      const confidence = String(verification.confidence || 'low').toLowerCase();
      const safeConfidence = ['high', 'medium', 'low'].includes(confidence) ? confidence : 'low';
      const criticalHashes = verification.criticalHashes && typeof verification.criticalHashes === 'object'
        ? {
          checked: Number(verification.criticalHashes.checked || 0),
          passed: Number(verification.criticalHashes.passed || 0),
          failed: Number(verification.criticalHashes.failed || 0),
          unresolved: Number(verification.criticalHashes.unresolved || 0),
        }
        : null;
      const displayedSourceCount = Number(fallbackSourceCount || 0);
      const incomingSourceCount = Number(verification.totalSources || 0);
      const totalSources = displayedSourceCount > 0 ? displayedSourceCount : incomingSourceCount;
      return {
        verified: Boolean(verification.verified),
        confidence: safeConfidence,
        totalSources: Number(totalSources || 0),
        message: String(verification.message || '').trim(),
        criticalHashes,
      };
    },
    buildNetworkErrorMessage(status, payload, rawText) {
      const statusHint = status ? `Request failed (${status}).` : '';
      const fallbackText = this.normalizeAssistantMessageFallback(rawText);
      const message = this.firstNonEmptyString([
        payload?.error,
        payload?.message,
        payload?.assistant?.error,
        statusHint,
        fallbackText,
      ]);
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
      const root = payload && typeof payload === 'object' ? payload : {};
      const assistantCandidates = [
        root.assistant,
        root.data?.assistant,
        root.result?.assistant,
        root.response?.assistant,
      ];
      const assistant = assistantCandidates.find((item) => item && typeof item === 'object') || {};
      const message = this.firstNonEmptyString([
        assistant.message,
        assistant.answer,
        assistant.text,
        root.message,
        root.answer,
        root.data?.message,
        root.data?.answer,
        this.normalizeAssistantMessageFallback(rawText),
      ]);
      const referenceCandidates = [
        assistant.references,
        assistant.sources,
        root.references,
        root.sources,
        root.data?.references,
      ];
      let references = [];
      for (const candidate of referenceCandidates) {
        const normalized = this.normalizeReferenceList(candidate);
        if (normalized.length) {
          references = normalized;
          break;
        }
      }
      const summaryCandidates = [
        assistant.summary,
        root.summary,
        root.data?.summary,
      ];
      let summary = [];
      for (const candidate of summaryCandidates) {
        const normalized = this.normalizeSummaryList(candidate);
        if (normalized.length) {
          summary = normalized;
          break;
        }
      }
      const verification = this.normalizeVerificationPayload(
        assistant.verification || root.verification || root.data?.verification || null,
        references.length,
      );
      return {
        session_id: this.firstNonEmptyString([root.session_id, root.sessionId, root.data?.session_id]),
        assistant: {
          message: this.improveAssistantMessageReadability(message),
          references,
          summary,
          verification,
        },
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
      if (typeof window === 'undefined' || !payload?.assistant?.message) {
        return;
      }
      const cacheKey = this.buildResponseCacheKey(message, language);
      const cache = this.readAiResponseCache();
      cache[cacheKey] = {
        savedAt: Date.now(),
        payload: this.clonePlainData(payload),
      };
      const now = Date.now();
      const trimmedEntries = Object.entries(cache)
        .filter(([, entry]) => {
          const age = now - Number(entry?.savedAt || 0);
          return age >= 0 && age <= AI_ASSISTANT_RESPONSE_CACHE_TTL_MS;
        })
        .sort((a, b) => Number(b[1]?.savedAt || 0) - Number(a[1]?.savedAt || 0))
        .slice(0, AI_ASSISTANT_RESPONSE_CACHE_LIMIT);
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
      if (!entry?.payload) {
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
      if (!cachedPayload?.assistant?.message) {
        return null;
      }
      const normalized = this.normalizeAssistantPayload(cachedPayload);
      const note = 'Offline mode: showing your latest cached verified response.';
      const verification = this.normalizeVerificationPayload(
        normalized.assistant.verification,
        normalized.assistant.references.length,
      );
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
      const contentType = (response?.headers?.get('content-type') || '').toLowerCase();
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
        payload: payload || {},
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
      this.normalizeReferenceList(references).forEach((reference) => {
        const labelKey = this.extractVerseKey(reference.label);
        if (labelKey) {
          keys.add(labelKey);
        }
        const url = String(reference.url || '');
        const urlColonMatch = url.match(/quran\.com\/(\d{1,3}:\d{1,3})/i) || url.match(/ayah\/(\d{1,3}:\d{1,3})/i);
        if (urlColonMatch?.[1]) {
          const normalized = this.extractVerseKey(urlColonMatch[1]);
          if (normalized) {
            keys.add(normalized);
          }
        }
        const urlSlashMatch = url.match(/quran\.com\/(\d{1,3})\/(\d{1,3})/i);
        if (urlSlashMatch?.[1] && urlSlashMatch?.[2]) {
          keys.add(`${Number(urlSlashMatch[1])}:${Number(urlSlashMatch[2])}`);
        }
      });
      return Array.from(keys);
    },
    normalizeArabicForHash(value = '') {
      return String(value || '')
        .normalize('NFKD')
        .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
        .replace(/\u0640/g, '')
        .replace(/[إأآٱ]/g, 'ا')
        .replace(/ؤ/g, 'و')
        .replace(/ئ/g, 'ي')
        .replace(/ى/g, 'ي')
        .replace(/ة/g, 'ه')
        .replace(/[^\u0621-\u063A\u0641-\u064A0-9]/g, '')
        .toLowerCase();
    },
    fallbackStringHash(value = '') {
      const input = String(value || '');
      let hash = 5381;
      for (let index = 0; index < input.length; index += 1) {
        hash = ((hash << 5) + hash) + input.charCodeAt(index);
      }
      return `fallback-${(hash >>> 0).toString(16)}`;
    },
    async hashStringSHA256(value = '') {
      const source = String(value || '');
      if (!source) {
        return '';
      }
      if (typeof window === 'undefined' || !window.crypto?.subtle || typeof TextEncoder === 'undefined') {
        return this.fallbackStringHash(source);
      }
      try {
        const bytes = new TextEncoder().encode(source);
        const digest = await window.crypto.subtle.digest('SHA-256', bytes);
        return Array.from(new Uint8Array(digest))
          .map((byte) => byte.toString(16).padStart(2, '0'))
          .join('');
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
        window.localStorage.setItem(
          AI_CRITICAL_VERSE_HASH_CACHE_KEY,
          JSON.stringify({
            updatedAt: Date.now(),
            hashes,
          }),
        );
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
      if (cached?.updatedAt && (Date.now() - Number(cached.updatedAt) < AI_CRITICAL_VERSE_HASH_TTL_MS)) {
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
      cache[verseKey] = {
        ...value,
        checkedAt: Date.now(),
      };
      this.writeVerseVerificationCache(cache);
    },
    resolveVerseTextFromPayload(payload, rawText = '') {
      const candidates = [
        payload?.verse?.text_uthmani,
        payload?.verse?.text_uthmani_simple,
        payload?.verse?.text_imlaei,
        payload?.verse?.text,
        payload?.data?.text_uthmani,
        payload?.data?.text,
        payload?.data?.arab,
        payload?.data?.ayah?.text,
        payload?.data?.text?.arab,
        payload?.result?.text,
      ];
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
      const endpoints = [
        `https://api.quran.com/api/v4/verses/by_key/${verseKey}?words=false&fields=text_uthmani`,
        `https://api.alquran.cloud/v1/ayah/${verseKey}`,
        `https://api.quran.gading.dev/ayah/${surah}/${ayah}`,
      ];
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'GET',
            headers: { Accept: 'application/json, text/plain, */*' },
          });
          if (!response.ok) {
            continue;
          }
          const parsed = await this.parseFetchResponseBody(response);
          const verseText = this.resolveVerseTextFromPayload(parsed.payload, parsed.rawText);
          if (verseText) {
            return {
              verseText,
              source: endpoint,
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
      const expectedHash = expectedHashes?.[verseKey];
      if (!expectedHash) {
        return {
          verseKey,
          status: 'unresolved',
        };
      }
      const fetched = await this.fetchVerseTextWithFallback(verseKey);
      if (!fetched?.verseText) {
        const unresolved = {
          verseKey,
          status: 'unresolved',
        };
        this.setCachedVerseVerification(verseKey, unresolved);
        return unresolved;
      }
      const computedHash = await this.hashStringSHA256(this.normalizeArabicForHash(fetched.verseText));
      const status = computedHash === expectedHash ? 'pass' : 'fail';
      const result = {
        verseKey,
        status,
        source: fetched.source,
      };
      this.setCachedVerseVerification(verseKey, result);
      return result;
    },
    async verifyEntryCriticalVerses(entry) {
      if (!entry) {
        return;
      }
      if (!Array.isArray(entry.references) || !entry.references.length) {
        entry.verification = this.normalizeVerificationPayload(entry?.verification || null);
        return;
      }
      const criticalVerseKeys = this.extractQuranVerseKeys(entry.references)
        .filter((key) => Boolean(AI_CRITICAL_VERSE_CANONICAL_TEXTS[key]));
      const baseVerification = this.normalizeVerificationPayload(entry.verification, entry.references.length);
      if (!criticalVerseKeys.length) {
        entry.verification = baseVerification;
        return;
      }
      const checks = await Promise.all(
        criticalVerseKeys.map((verseKey) => this.verifyCriticalVerseHash(verseKey)),
      );
      const checked = checks.filter((item) => item && (item.status === 'pass' || item.status === 'fail'));
      const passed = checked.filter((item) => item.status === 'pass');
      const failed = checked.filter((item) => item.status === 'fail');
      const unresolved = checks.filter((item) => item && item.status === 'unresolved');
      const verification = {
        ...baseVerification,
        criticalHashes: {
          checked: checked.length,
          passed: passed.length,
          failed: failed.length,
          unresolved: unresolved.length,
        },
      };
      if (failed.length > 0) {
        verification.verified = false;
        verification.confidence = 'low';
        const failureKeys = failed.map((item) => item.verseKey).join(', ');
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
          await Promise.all(
            registrations
              .filter((registration) => {
                const scriptUrl = registration.active?.scriptURL
                  || registration.waiting?.scriptURL
                  || registration.installing?.scriptURL
                  || '';
                return scriptUrl.includes(AI_ASSISTANT_SW_PATH);
              })
              .map((registration) => registration.unregister()),
          );
        } catch (error) {
          console.warn('Unable to unregister local AI service worker', error);
        }
        if (typeof caches !== 'undefined' && typeof caches.keys === 'function') {
          try {
            const cacheKeys = await caches.keys();
            await Promise.all(
              cacheKeys
                .filter((key) => key.startsWith('ic-ai-') || key.startsWith('islamic-connect-ai-'))
                .map((key) => caches.delete(key)),
            );
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
        this.serviceWorkerRegistration = await navigator.serviceWorker.register(AI_ASSISTANT_SW_PATH, { scope: '/' });
      } catch (error) {
        console.warn('AI assistant service worker registration failed', error);
      }
    },
    sanitizeShareText(value) {
      return this.toPlainText(value).replace(/\s+/g, ' ').trim();
    },
    composeChatShareMessage(limit = 6) {
      const entries = this.chatHistory.slice(-limit);
      const lines = entries
        .map((entry) => {
          const label = entry.role === 'assistant' ? 'Assistant' : 'You';
          const plain = this.sanitizeShareText(entry.text);
          return plain ? `${label}: ${plain}` : null;
        })
        .filter(Boolean);
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
      const cleaned = text
        .replace(/\r\n?/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim();
      if (!cleaned) return [];
      const sentenceMatches = cleaned.match(/[^.!?]+[.!?]+/g) || [];
      const normalized = sentenceMatches.length ? sentenceMatches : cleaned.split(/[,;]+/);
      const sanitized = normalized
        .map((piece) => piece.replace(/^[\s*-]+/, '').trim())
        .filter((piece) => piece.length > 12);
      if (!sanitized.length) {
        return (normalized || []).slice(0, limit).map((piece) => piece.trim()).filter(Boolean);
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
        const prefersReducedMotion =
          typeof window !== 'undefined' &&
          typeof window.matchMedia === 'function' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const behavior = prefersReducedMotion ? 'auto' : 'smooth';
        root.scrollIntoView({ behavior, block: 'end' });
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
      const preferredNames = [
        'Google UK English Female',
        'Google UK English Male',
        'Google US English',
        'Microsoft Zira Desktop - English (United States)',
        'Samantha',
        'Alex',
      ];
      for (const preferred of preferredNames) {
        const match = voices.find((voice) => voice.name === preferred);
        if (match) {
          return match;
        }
      }
      const englishVoice = voices.find((voice) => voice.lang?.startsWith('en'));
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
      return this.chatHistory.find((entry) => this.getEntrySpeechKey(entry) === key) || null;
    },
    toggleSpeechControls(entry) {
      if (!entry) {
        return;
      }
      const isVisible = !entry.speechControlsVisible;
      this.chatHistory.forEach((other) => {
        if (other !== entry) {
          other.speechControlsVisible = false;
        }
      });
      entry.speechControlsVisible = isVisible;
    },
    playEntrySpeech(entry) {
      if (!entry?.text || typeof window === 'undefined' || !window.speechSynthesis) {
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
      if (
        typeof window === 'undefined' ||
        !window.speechSynthesis ||
        !window.speechSynthesis.speaking ||
        window.speechSynthesis.paused
      ) {
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
        const payload = await this.postChatMessage(message);
        if (!payload?.assistant?.message) {
          throw new Error('Noor cannot respond right now.');
        }
        const normalizedPayload = this.normalizeAssistantPayload(payload);
        const assistantData = normalizedPayload.assistant;
        const assistantEntry = this.createChatEntry(
          'assistant',
          assistantData.message.trim(),
          assistantData.references,
          assistantData.summary,
          assistantData.verification,
        );
        this.chatHistory.push(assistantEntry);
        if (normalizedPayload.session_id) {
          this.sessionId = normalizedPayload.session_id;
        }
        this.syncCurrentSessionHistory();
        this.scrollChatWindow();
        this.scrollComponentToBottom();
        this.verifyEntryCriticalVerses(assistantEntry).catch((error) => {
          console.warn('Critical verse hash verification skipped', error);
        });
      } catch (error) {
        console.error('Chat error:', error);
        this.chatError = error?.message || 'The assistant is temporarily unavailable.';
      } finally {
        this.chatLoading = false;
      }
    },
    async postChatMessage(message) {
      if (!message) {
        return null;
      }
      const language = this.getUserLanguage();
      const requestPayload = {
        question: message,
        session_id: this.sessionId || this.resetSession(),
        language,
      };
      let response = null;
      try {
        response = await fetch('/api/ai/ask', {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, text/html, */*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': this.getCsrfToken(),
          },
          body: JSON.stringify(requestPayload),
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
      if (!normalizedPayload?.assistant?.message) {
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
      return meta?.getAttribute('content') || '';
    },
    initializeQuestionGenerator() {
      if (!this.questionGenerator) {
        this.questionGenerator = new IslamicQuestionGenerator();
      }
      return this.questionGenerator;
    },
    parseQuestionBankMeta() {
      if (typeof window === 'undefined') {
        return null;
      }
      try {
        const raw = window.localStorage.getItem(QUESTION_BANK_META_STORAGE_KEY);
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
      const questions = loadQuestionBankFromStorage(window.localStorage);
      this.questionBankCount = questions.length;
      this.questionBankMeta = this.parseQuestionBankMeta();
      return questions;
    },
    generateQuestionBank(count = DEFAULT_QUESTION_COUNT) {
      if (typeof window === 'undefined') {
        return [];
      }
      const generator = this.initializeQuestionGenerator();
      const questions = ensureQuestionBank({
        generator,
        count,
        storage: window.localStorage,
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
    async runBatchVerification(batchSize = DEFAULT_BATCH_SIZE, maxBatches = null) {
      const normalizedBatchSize = Math.max(1, Number(batchSize) || DEFAULT_BATCH_SIZE);
      const existingQuestions = this.getQuestionBank();
      const questions = existingQuestions.length
        ? existingQuestions
        : this.generateQuestionBank(DEFAULT_QUESTION_COUNT);
      const batches = chunkQuestionBatches(questions, normalizedBatchSize);
      const limit = Number.isFinite(Number(maxBatches)) && Number(maxBatches) > 0
        ? Math.min(batches.length, Number(maxBatches))
        : batches.length;
      const batchReports = [];

      for (let index = 0; index < limit; index += 1) {
        const batch = batches[index];
        const response = await fetch('/api/ai/batch-verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': this.getCsrfToken(),
          },
          body: JSON.stringify({ questions: batch }),
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(payload?.error || `Batch verification failed at batch ${index + 1}.`);
        }
        batchReports.push({
          batch: index + 1,
          size: batch.length,
          summary: payload.summary || {},
        });
      }

      const report = {
        generatedAt: new Date().toISOString(),
        totalQuestions: questions.length,
        batchSize: normalizedBatchSize,
        batchesProcessed: batchReports.length,
        batches: batchReports,
      };
      this.latestBatchVerification = report;
      return report;
    },
    attachAiTestHarness() {
      if (typeof window === 'undefined') {
        return;
      }
      window[AI_TEST_HARNESS_KEY] = {
        apis: FREE_ISLAMIC_APIS,
        generateQuestionBank: (count = DEFAULT_QUESTION_COUNT) => this.generateQuestionBank(count),
        getQuestionBank: () => this.getQuestionBank(),
        runBatchVerification: (batchSize = DEFAULT_BATCH_SIZE, maxBatches = null) =>
          this.runBatchVerification(batchSize, maxBatches),
        getLatestBatchReport: () => this.latestBatchVerification,
        storageKey: QUESTION_BANK_STORAGE_KEY,
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
      this.copyTextToClipboard(shareText)
        .then(() => this.showCopyNotice('Conversation copied to clipboard.'))
        .catch((err) => {
          console.error('Copy conversation failed:', err);
        });
    },
    shareEntryOnWhatsApp(entry) {
      if (!entry?.text) {
        return;
      }
      const content = this.sanitizeShareText(entry.text);
      if (!content) {
        return;
      }
      if (typeof window === 'undefined') {
        return;
      }
      const header =
        entry.role === 'assistant' ? 'Islamic Connect answer' : 'Islamic Connect chat';
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${header}\n\n${content}`)}`;
      window.open(whatsappUrl, '_blank');
    },
    copyEntryToClipboard(entry) {
      if (!entry?.text) {
        return;
      }
      const content = this.sanitizeShareText(entry.text);
      if (!content) {
        return;
      }
      this.copyTextToClipboard(content)
        .then(() => this.showCopyNotice('Answer copied to clipboard.'))
        .catch((err) => {
          console.error('Copy answer failed:', err);
        });
    },
    copyTextToClipboard(text) {
      if (!text) {
        return Promise.resolve();
      }
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
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
        displayTime: date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        displayDate: date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }),
      };
    },
    normalizeStoredReference(reference) {
      if (!reference || typeof reference !== 'object') {
        return null;
      }
      const label = String(
        reference.label
        || reference.reference
        || reference.title
        || reference.name
        || '',
      ).trim();
      const normalizedUrl = this.normalizeResponseUrl(reference.url || reference.link || reference.href || null);
      const cleanedLabel = this.sanitizeReferenceLabel(label, normalizedUrl);
      if (!cleanedLabel) {
        return null;
      }
      const metadata = this.buildReferenceMetadata(reference, cleanedLabel, normalizedUrl);
      const sourceBadge = this.normalizeSourceBadge(reference.sourceBadge || reference.source_badge || metadata.sourceBadge)
        || metadata.sourceBadge
        || 'aggregated';
      const explicitGrade = this.normalizeHadithGradeValue(
        reference.hadithGrade
        || reference.hadith_grade
        || reference.grade
        || reference.grading
        || '',
      );
      const isHadith = Boolean(reference.isHadith || reference.is_hadith || metadata.isHadith || explicitGrade);
      const hadithGrade = isHadith ? (explicitGrade || metadata.hadithGrade || 'ungraded') : '';
      return {
        label: cleanedLabel.slice(0, 180),
        url: normalizedUrl,
        sourceBadge,
        isHadith,
        hadithGrade,
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
        criticalHashes: normalized.criticalHashes
          ? {
            checked: Number(normalized.criticalHashes.checked || 0),
            passed: Number(normalized.criticalHashes.passed || 0),
            failed: Number(normalized.criticalHashes.failed || 0),
            unresolved: Number(normalized.criticalHashes.unresolved || 0),
          }
          : null,
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

      const text = rawText;
      const references = options.keepReferences
        ? (Array.isArray(entry.references) ? entry.references.map((item) => this.normalizeStoredReference(item)).filter(Boolean).slice(0, 2) : [])
        : [];
      const summaryBullets = options.keepSummary
        ? (Array.isArray(entry.summaryBullets)
          ? entry.summaryBullets.map((item) => String(item || '').trim()).filter(Boolean).slice(0, 3)
          : this.extractSummaryBulletPoints(text))
        : [];
      const verification = this.normalizeStoredVerification(entry.verification, references.length);
      const time = this.formatEntryTime(entry.time);

      return {
        role,
        text,
        time: time.iso,
        references,
        summaryBullets,
        verification,
      };
    },
    buildStorageSessionPayload(options = {}) {
      const maxSessions = Number(options.maxSessions || 12);
      const maxEntries = Number(options.maxEntries || 20);
      const sessions = Array.isArray(this.chatSessions) ? this.chatSessions.slice(0, maxSessions) : [];

      return sessions
        .map((session) => {
          const history = Array.isArray(session.history) ? session.history : [];
          const compactedHistory = history
            .slice(-maxEntries)
            .map((entry) => this.serializeSessionEntryForStorage(entry, options))
            .filter(Boolean);

          if (!session.id || !compactedHistory.length) {
            return null;
          }

          return {
            id: String(session.id),
            createdAt: session.createdAt || session.updatedAt || Date.now(),
            updatedAt: session.updatedAt || Date.now(),
            history: compactedHistory,
          };
        })
        .filter(Boolean);
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
      const references = Array.isArray(entry.references)
        ? entry.references.map((item) => this.normalizeStoredReference(item)).filter(Boolean).slice(0, 2)
        : [];
      const summaryBullets = Array.isArray(entry.summaryBullets)
        ? entry.summaryBullets.map((item) => String(item || '').trim()).filter(Boolean).slice(0, 4)
        : this.extractSummaryBulletPoints(text);
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
        displayDate: time.displayDate,
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
        const sessions = stored
          .filter((session) => session && session.id && Array.isArray(session.history) && session.history.length)
          .map((session) => ({
            id: session.id,
            history: session.history.map((entry) => this.normalizeStoredChatEntry(entry)).filter(Boolean),
            createdAt: session.createdAt || session.updatedAt || Date.now(),
            updatedAt: session.updatedAt || Date.now(),
          }))
          .filter((session) => session.history.length)
          .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
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
        history: this.chatHistory.map((entry) => ({ ...entry })),
        createdAt: this.sessionStartedAt || Date.now(),
        updatedAt: Date.now(),
      };
      const existingIndex = this.chatSessions.findIndex((session) => session.id === this.sessionId);
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
      const session = this.chatSessions.find((entry) => entry.id === sessionId);
      if (!session) {
        return;
      }
      this.chatHistory = session.history.map((entry) => ({ ...entry }));
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
      const container = root?.querySelector('.ai-session-inline');
      const trigger = root?.querySelector('.ai-session-inline__button');
      if (container?.contains(event.target) || trigger?.contains(event.target)) {
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
      const index = this.chatSessions.findIndex((session) => session.id === sessionId);
      if (index === -1) {
        return;
      }
      this.chatSessions.splice(index, 1);
      if (this.selectedSessionId === sessionId) {
        this.selectedSessionId = this.chatSessions[0]?.id || '';
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
      if (!session) {
        return '';
      }
      const timestamp = session.createdAt || session.updatedAt;
      const formatted = this.formatSessionTimestamp(timestamp);
      const messageCount = session.history?.length || 0;
      const suffix = [`${messageCount} msg${messageCount === 1 ? '' : 's'}`];
      return `${formatted} · ${suffix.join(' · ')}`;
    },
    formatSessionTimestamp(timestamp) {
      const value = typeof timestamp === 'string' ? Date.parse(timestamp) : timestamp;
      const date = new Date(!Number.isNaN(value) ? value : Date.now());
      return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })} · ${date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
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
        recognition.lang = (typeof navigator !== 'undefined' && navigator.language) ? navigator.language : 'en-US';
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
        recognition.onresult = (event) => {
          const results = event.results;
          let interimTranscript = '';
          let finalTranscriptChunk = '';
          for (let i = event.resultIndex; i < results.length; i += 1) {
            const result = results[i];
            const text = result?.[0]?.transcript?.trim();
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
          const displayTranscript = [this.voiceFinalTranscript, this.voiceInterimTranscript]
            .filter(Boolean)
            .join(' ')
            .trim();
          this.updateVoiceDraft(displayTranscript);
          if (finalChunkTrimmed) {
            this.scheduleVoiceSubmission(this.voiceFinalTranscript.trim());
          } else if (interimTrimmed) {
            this.voiceStatus = 'Listening. Feel free to continue speaking.';
            this.voiceStatusTransient = false;
          }
        };
        recognition.onerror = (event) => {
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
      const keywords = [
        'islam',
        'muslim',
        'quran',
        'hadith',
        'sunnah',
        'dua',
        'salah',
        'prayer',
        'ramadan',
        'hajj',
        'umrah',
        'fajr',
        'dhuhr',
        'asr',
        'maghrib',
        'isha',
        'zakat',
        'halal',
        'haram',
        'allah',
        'prophet',
        'fiqh',
        'tafsir',
        'imam',
        'masjid',
        'mosque',
        'ayah',
        'surah',
        'tafseer',
        'aqeedah',
        'taqwa',
        'sufism',
        'istikhara',
        'nikah',
        'shahada',
      ];
      if (keywords.some((keyword) => normalized.includes(keyword))) {
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
      if (typeof window === 'undefined') {
        return;
      }
      const root = this.$refs.aiRoot;
      if (!root || typeof root.style?.setProperty !== 'function') {
        return;
      }
      const rect = root.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement?.clientHeight || 0;
      const availableHeight = Math.max(320, viewportHeight - Math.max(0, rect.top) - 6);
      root.style.setProperty('--ai-gpt-available-height', `${availableHeight}px`);
    },
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
      this.chatHistory.forEach((entry) => {
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
    },
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
    this.ensureCriticalVerseHashMap().catch((error) => {
      console.warn('Unable to precompute critical verse hashes', error);
    });
    this.attachAiTestHarness();
    this.resizeListener = () => {
      this.updateCompactMode();
      this.adjustViewportLayout();
    };
    window.addEventListener('resize', this.resizeListener);
    this.documentClickHandler = (event) => this.handleDocumentClick(event);
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
  },
};
</script>

<style scoped>
.ai-section {
  --ai-ink: #1d2b2f;
  --ai-muted: #4f6261;
  --ai-teal: #0f6e63;
  --ai-teal-dark: #0a4b45;
  --ai-amber: #d2a24b;
  --ai-surface: #fffdf8;
  --ai-card: #ffffff;
  --ai-border: rgba(15, 110, 99, 0.18);
  --ai-shadow: 0 22px 46px rgba(15, 53, 48, 0.12);
  position: relative;
  border-radius: 28px;
  background:
    radial-gradient(320px 220px at 8% 8%, rgba(210, 162, 75, 0.16), transparent 65%),
    radial-gradient(320px 240px at 92% 0%, rgba(15, 110, 99, 0.16), transparent 68%),
    linear-gradient(180deg, #fffdf7 0%, #f6fbf7 55%, #eef6f4 100%);
  padding: clamp(0.75rem, 1.6vw, 1.25rem);
  overflow: hidden;
}

.ai-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 15% 20%, rgba(255, 255, 255, 0.6), transparent 55%),
    repeating-linear-gradient(125deg, rgba(15, 110, 99, 0.06) 0 12px, transparent 12px 26px);
  opacity: 0.6;
  pointer-events: none;
}

.ai-section>* {
  position: relative;
  z-index: 1;
}

.ai-title {
  font-size: clamp(1.85rem, 3vw, 2.6rem);
  margin: 0;
  color: var(--ai-ink);
}

.ai-description {
  margin: 0.35rem 0 0;
  color: var(--ai-muted);
  line-height: 1.6;
}


.ai-panel {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  /* background: rgba(255, 255, 255, 0.92); */
  border-radius: 12px;
  /* border: 1px solid var(--ai-border); */
  /* padding: clamp(0.8rem, 2.2vw, 1.5rem); */
  /* box-shadow: var(--ai-shadow); */
}

.ai-welcome {
  /* background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(246, 250, 247, 0.95)); */
  /* border: 1px solid var(--ai-border); */
  /* padding: 1rem; */
  box-shadow: 0 16px 30px rgba(15, 53, 48, 0.12);
  text-align: left;
  gap: 0.4rem;
}

.ai-chat-shell {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  border: 1px solid var(--ai-border);
  box-shadow: 0 14px 26px rgba(15, 53, 48, 0.1);
  padding: 1rem;
}

.chat-bubble {
  border-radius: 16px;
  border: 1px solid rgba(15, 110, 99, 0.16);
  box-shadow: none;
}

.ai-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  width: 100%;
}

.ai-session-inline {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.ai-session-inline__button {
  padding: 0.4rem 0.9rem;
  border-radius: 12px;
  font-size: 0.82rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.ai-session-inline__button i {
  font-size: 0.85rem;
}

.ai-session-inline__meta {
  font-size: 0.75rem;
  color: var(--ai-muted);
}

.ai-session-inline__dropdown {
  margin-top: 0.35rem;
  border-radius: 12px;
  border: 1px solid var(--ai-border);
  background: #fff;
  box-shadow: 0 20px 35px rgba(15, 53, 48, 0.12);
  padding: 0.4rem;
  max-height: 240px;
  overflow-y: auto;
}

.ai-session-inline__dropdown-item {
  width: 100%;
  border: none;
  background: transparent;
  text-align: left;
  padding: 0.5rem 0.6rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  font-size: 0.9rem;
  color: var(--ai-ink);
  cursor: pointer;
  transition: background 0.15s ease;
}

.ai-session-inline__dropdown-item small {
  font-size: 0.75rem;
  color: var(--ai-muted);
}

.ai-session-inline__dropdown-item:hover {
  background: rgba(15, 110, 99, 0.08);
}

.ai-session-inline__dropdown-item {
  position: relative;
  padding-right: 2.4rem;
}

.ai-session-inline__dropdown-remove {
  position: absolute;
  top: 0.35rem;
  right: 0.5rem;
  border: none;
  background: transparent;
  color: #b91c1c;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.ai-session-inline__dropdown-remove:hover,
.ai-session-inline__dropdown-remove:focus-visible {
  color: #8c1616;
}

.ai-session-inline__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}

.ai-session-inline__clear-all {
  border-radius: 10px;
  border: 1px solid rgba(220, 38, 38, 0.35);
  background: rgba(220, 38, 38, 0.08);
  color: #b91c1c;
  font-size: 0.78rem;
  padding: 0.4rem 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
  justify-content: center;
}

.ai-session-inline__alert {
  border-radius: 12px;
  border: 1px solid transparent;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: 0.85rem;
}

.ai-session-inline__alert--danger {
  background: rgba(220, 38, 38, 0.1);
  border-color: rgba(220, 38, 38, 0.4);
}

.ai-session-inline__alert--warning {
  background: rgba(234, 179, 8, 0.12);
  border-color: rgba(234, 179, 8, 0.4);
}

.ai-session-inline__action-btn {
  border: none;
  background: transparent;
  font-size: 0.8rem;
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  color: var(--ai-teal);
  cursor: pointer;
}

.ai-session-inline__action-btn--danger {
  color: #b91c1c;
}

.ai-control-btn {
  border: 1px solid var(--ai-border);
  background: rgba(255, 255, 255, 0.95);
  color: var(--ai-ink);
  padding: 0.5rem 0.95rem;
  border-radius: 16px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.9rem;
  min-width: 0;
  white-space: normal;
  text-align: center;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease;
}

.ai-control-btn i {
  font-size: 0.9rem;
}

.ai-control-btn:hover:not(:disabled) {
  border-color: rgba(15, 110, 99, 0.5);
  background: rgba(15, 110, 99, 0.08);
  transform: translateY(-1px);
}

.ai-control-btn--primary {
  background: linear-gradient(135deg, var(--ai-teal), var(--ai-teal-dark));
  border-color: transparent;
  color: #fff;
  box-shadow: 0 12px 26px rgba(15, 110, 99, 0.28);
}

.ai-control-btn--whatsapp {
  background: #25d366;
  border-color: transparent;
  color: #fff;
  box-shadow: none;
}

.ai-control-btn--copy {
  background: rgba(210, 162, 75, 0.2);
  border-color: transparent;
  color: #2f2a1f;
  box-shadow: none;
}

.ai-copy-notice {
  margin-top: 0.65rem;
  padding: 0.5rem 0.75rem;
  border-radius: 14px;
  background: rgba(15, 110, 99, 0.12);
  border: 1px solid rgba(15, 110, 99, 0.35);
  color: #0b4b44;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.chat-entry-actions {
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
}

.chat-share-btn {
  border: none;
  background: rgba(37, 211, 102, 0.18);
  color: #041b20;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.chat-share-btn:hover {
  background: rgba(37, 211, 102, 0.3);
  transform: translateY(-1px);
}

.chat-share-btn i {
  font-size: 0.9rem;
}

.chat-copy-btn {
  border: none;
  background: rgba(210, 162, 75, 0.2);
  color: #2f2a1f;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.chat-copy-btn:hover {
  background: rgba(210, 162, 75, 0.3);
  transform: translateY(-1px);
}

.chat-copy-btn i {
  font-size: 0.9rem;
}

.chat-voice-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.chat-voice-trigger {
  border: none;
  background: rgba(15, 110, 99, 0.16);
  color: #0b4b44;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.chat-voice-controls {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(15, 110, 99, 0.12);
  border-radius: 12px;
  padding: 0.25rem 0.4rem;
}

.chat-voice-control-btn {
  border: none;
  background: transparent;
  color: #0b4b44;
  cursor: pointer;
  padding: 0.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.chat-voice-control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chat-voice-status {
  font-size: 0.75rem;
  color: #0b4b44;
}

.ai-control-btn.active {
  background: rgba(13, 182, 145, 0.12);
}

.ai-control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ai-trust-note {
  background: rgba(15, 110, 99, 0.1);
  border: 1px solid rgba(15, 110, 99, 0.3);
  border-radius: 14px;
  padding: 0.85rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  color: var(--ai-ink);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.ai-trust-note i {
  font-size: 1.1rem;
}

.ai-trust-note p {
  color: var(--ai-ink);
  margin: 0;
}

.ai-disclaimer-link {
  border: none;
  background: transparent;
  padding: 0;
  font: inherit;
  cursor: pointer;
}

:global(body.ai-disclaimer-open) {
  overflow: hidden;
}

.ai-disclaimer-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: rgba(10, 26, 24, 0.58);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.ai-disclaimer-modal-card {
  width: min(640px, 100%);
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(15, 110, 99, 0.24);
  box-shadow: 0 28px 40px rgba(15, 53, 48, 0.22);
  overflow: hidden;
}

.ai-disclaimer-modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.9rem 1rem;
  border-bottom: 1px solid rgba(15, 110, 99, 0.16);
}

.ai-disclaimer-modal-head h3 {
  color: #0f4f49;
  font-size: 1.05rem;
  font-weight: 700;
}

.ai-disclaimer-close {
  border: none;
  background: rgba(15, 110, 99, 0.12);
  color: #0b4b44;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.ai-disclaimer-modal-body {
  padding: 0.9rem 1rem;
  color: #24413f;
  font-size: 0.95rem;
  line-height: 1.55;
}

.ai-disclaimer-modal-foot {
  padding: 0 1rem 1rem;
  display: flex;
  justify-content: flex-end;
}

.ai-disclaimer-close-btn {
  border: 1px solid rgba(15, 110, 99, 0.32);
  background: rgba(15, 110, 99, 0.1);
  color: #0b4b44;
  border-radius: 10px;
  padding: 0.45rem 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.ai-metadata {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  align-items: center;
}

.ai-loading-indicator {
  background: rgba(15, 110, 99, 0.12);
  border-radius: 12px;
  padding: 0.65rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #0b4b44;
  text-align: center;
  width: 100%;
}


.ai-welcome {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  padding: 1.1rem 1.2rem 0.95rem;
  border-radius: 24px;
  border: 1px solid var(--ai-border);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(246, 252, 249, 0.96));
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 0.95rem;
  color: var(--ai-ink);
  box-shadow: 0 22px 40px rgba(15, 53, 48, 0.14);
  gap: 0.25rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ai-rise 0.6s ease both;
}

.ai-welcome:hover {
  transform: translateY(-2px);
  box-shadow: 0 30px 50px rgba(15, 53, 48, 0.18);
}

.ai-welcome-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(15, 110, 99, 0.2), rgba(210, 162, 75, 0.22));
  color: var(--ai-teal);
  margin-bottom: 0.25rem;
  box-shadow: 0 12px 24px rgba(15, 53, 48, 0.2);
}

.pb-2 {
  padding-bottom: 0.5rem;
}

.ai-welcome-icon svg {
  width: 75%;
  height: 75%;
}

.ai-welcome-icon i {
  font-size: 1.8rem;
  line-height: 1;
  display: block;
}

.ai-welcome-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.ai-welcome-title {
  margin: 0;
  font-weight: 600;
}

.ai-welcome-copy {
  margin: 0.15rem 0 0;
  color: var(--ai-muted);
  line-height: 1.5;
}

.ai-meta-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.7rem;
}

.ai-meta-chips span {
  padding: 0.25rem 0.85rem;
  border-radius: 999px;
  font-size: 0.75rem;
  background: rgba(15, 110, 99, 0.12);
  color: #0b4b44;
  border: 1px solid rgba(15, 110, 99, 0.25);
}

.hf-badge {
  font-weight: 600;
  border: 1px solid rgba(15, 110, 99, 0.5);
  color: #0b4b44;
  padding: 0.4rem 1.5rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.6);
  z-index: 1;
}

.ai-chat-shell {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  min-height: clamp(320px, 55vh, 640px);
  max-height: min(72vh, 760px);
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 18px;
  border: 1px solid var(--ai-border);
  background: rgba(255, 255, 255, 0.92);
  padding: clamp(0.7rem, 1.2vw, 1rem);
  box-shadow: 0 20px 38px rgba(15, 53, 48, 0.12);
  animation: ai-rise 0.6s ease both 0.16s;
}

@media (hover: hover) {
  .ai-chat-shell:hover {
    transform: translateY(-2px);
    box-shadow: 0 30px 50px rgba(15, 53, 48, 0.2);
  }
}

.ai-chat-window {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Align user bubbles to the right while keeping assistant text on the left */
.chat-entry {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
  transition: transform 0.35s ease;
}

.chat-entry:hover {
  transform: translateY(-1px);
}

.chat-entry.user {
  align-items: flex-end;
}

.chat-entry.assistant {
  align-items: flex-start;
}

.chat-entry-header {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.9rem;
  color: var(--ai-ink);
}

.chat-entry-header .chat-icon {
  font-size: 1rem;
  color: var(--ai-teal);
  background: rgba(15, 110, 99, 0.16);
  padding: 0.15rem;
  border-radius: 50%;
}

/* .chat-entry {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.85rem;
    border-radius: 24px;
    animation: bubbleRise 0.45s ease;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(172, 202, 197, 0.4);
  } */


.ai-chat-window::-webkit-scrollbar {
  width: 6px;
}

.ai-chat-window::-webkit-scrollbar-thumb {
  background: rgba(13, 182, 145, 0.5);
  border-radius: 4px;
}

.ai-chat-shell {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.ai-chat-shell::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.chat-loading-overlay {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  backdrop-filter: blur(4px);
  pointer-events: all;
}

.chat-loading-content {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: rgba(15, 111, 112, 0.07);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
}

.chat-loading-content .spinner-border {
  width: 3rem;
  height: 3rem;
  border-width: 0.25rem;
}

.chat-loading-text {
  font-size: 0.95rem;
  font-weight: 600;
  color: #0d4b4b;
}

.chat-empty {
  padding: 1.5rem;
  text-align: center;
  color: #5f7376;
  font-size: 0.95rem;
}

.chat-bubble {
  max-width: min(90%, 680px);
  width: fit-content;
  padding: 0.95rem;
  border-radius: 18px;
  position: relative;
  border: 1px solid rgba(15, 110, 99, 0.16);
  background: #ffffff;
  box-shadow: 0 10px 20px rgba(15, 53, 48, 0.08);
  text-align: left;
  word-break: break-word;
  overflow-wrap: anywhere;
  transition: transform 0.35s ease, box-shadow 0.35s ease, max-width 0.2s ease;
}

.chat-entry--typing .chat-entry-header {
  opacity: 0.75;
}

.chat-bubble--typing {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.65rem 0.9rem;
  min-height: 2.4rem;
  width: fit-content;
  max-width: 240px;
}

.chat-typing-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ai-teal);
  animation: typingPulse 1.1s ease-in-out infinite;
}

.chat-typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.chat-typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

.chat-typing-text {
  font-size: 0.85rem;
  color: #0b4b44;
  margin-left: 0.2rem;
  letter-spacing: 0.01em;
}

.chat-bubble:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(15, 53, 48, 0.16);
}

.chat-entry.user .chat-bubble {
  text-align: left;
}

@media (min-width: 768px) {
  .chat-entry.user .chat-bubble {
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
  }
}

.chat-bubble--collapsed {
  max-height: 10rem;
  overflow: hidden;
  text-align: left;
}

.chat-bubble--collapsed::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3.5rem;
  border-radius: 0 0 18px 18px;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(15, 110, 99, 0.22));
}

.chat-bubble.assistant {
  align-self: flex-start;
  background: rgba(15, 110, 99, 0.1);
  border-color: rgba(15, 110, 99, 0.24);
  width: 100%;
  max-width: 100%;
}

.chat-bubble.user {
  align-self: flex-end;
  background: linear-gradient(135deg, #0f6e63, #0a4b45);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 12px 24px rgba(10, 51, 46, 0.35);
}

.chat-bubble-container {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.chat-summary {
  background: #fff;
  border: 1px solid rgba(15, 110, 99, 0.24);
  border-radius: 16px;
  padding: 0.65rem 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.95rem;
  color: var(--ai-ink);
  text-align: left;
}

.chat-summary-title {
  margin: 0;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 600;
  color: #0b4b44;
}

.chat-summary ul {
  margin: 0;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.chat-summary li {
  list-style-type: disc;
  line-height: 1.4;
  font-size: 0.95rem;
}

.chat-collapse-toggle {
  align-self: flex-start;
  border: none;
  background: none;
  color: var(--ai-teal);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
}

.chat-collapse-toggle:focus-visible {
  outline: 2px solid #0db691;
  outline-offset: 2px;
}

.chat-verification {
  margin-top: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  border-radius: 999px;
  padding: 0.25rem 0.65rem;
  border: 1px solid transparent;
}

.chat-verification--high {
  background: rgba(34, 197, 94, 0.14);
  color: #14532d;
  border-color: rgba(34, 197, 94, 0.4);
}

.chat-verification--medium {
  background: rgba(234, 179, 8, 0.14);
  color: #854d0e;
  border-color: rgba(234, 179, 8, 0.35);
}

.chat-verification--low {
  background: rgba(220, 38, 38, 0.12);
  color: #991b1b;
  border-color: rgba(220, 38, 38, 0.35);
}

.chat-section-heading {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0b4b44;
  margin: 0 0 0.35rem 0.25rem;
}

.chat-references-wrapper {
  background: rgba(15, 110, 99, 0.12);
  border: 1px solid rgba(15, 110, 99, 0.28);
  border-radius: 16px;
  padding: 0.5rem 0.75rem;
  max-width: 80%;
}

.chat-references-heading {
  font-size: 0.75rem;
  font-weight: 600;
  color: #0b4b44;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: block;
  margin-bottom: 0.25rem;
}

.chat-references {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: #1f2f33;
}

.chat-references li {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.chat-references a {
  color: #0f6e63;
  font-weight: 600;
}

.chat-references a:hover {
  text-decoration: underline;
}

.chat-bubble-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 0.75rem;
  color: #4a5656;
  margin-bottom: 0.35rem;
}

.chat-bubble-meta strong {
  font-size: 0.85rem;
}

.chat-bubble p {
  margin: 0;
  font-size: 0.95rem;
  color: inherit;
  line-height: 1.5;
}

.ai-form {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  width: 100%;
  z-index: 1;
  border-radius: 20px;
  border: 1px solid var(--ai-border);
  padding: 1rem;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 18px 34px rgba(15, 53, 48, 0.12);
  animation: ai-rise 0.6s ease both 0.22s;
}

.ai-textarea {
  display: block;
  width: 100%;
  max-width: none;
  box-sizing: border-box;
  border-radius: 14px;
  border: 1px solid rgba(15, 110, 99, 0.2);
  padding: 0.95rem 1.15rem;
  resize: none;
  font-size: 0.92rem;
  min-height: 100px;
  background: #ffffff;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

.ai-textarea:focus {
  outline: none;
  border-color: rgba(15, 110, 99, 0.6);
  box-shadow: 0 0 0 3px rgba(15, 110, 99, 0.2);
  transform: translateY(-1px);
}

.ai-form-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-end;
  align-items: center;
}

.ai-input-hint {
  margin-right: auto;
  font-size: 0.82rem;
  color: var(--ai-muted);
}

.ai-form-meta small {
  color: #081b22;
  line-height: 1.4;
  font-size: 0.9rem;
}

.ai-submit {
  align-self: flex-end;
  border: none;
  border-radius: 18px;
  padding: 0.85rem 2.3rem;
  font-size: 0.95rem;
  color: #fff;
  background: linear-gradient(135deg, var(--ai-teal), var(--ai-teal-dark));
  box-shadow: 0 14px 30px rgba(15, 110, 99, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
}

.ai-submit i {
  font-size: 1rem;
}

.ai-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

.ai-submit:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 32px rgba(15, 110, 99, 0.35);
}

.ai-secondary-btn,
.ai-voice-btn,
.ai-clear-input {
  border-radius: 16px;
  border: 1px solid rgba(15, 110, 99, 0.25);
  background: #fff;
  color: var(--ai-ink);
  padding: 0.7rem 1.2rem;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  width: 100%;
  transition: border-color 0.25s ease, background 0.25s ease, transform 0.15s ease;
}

.ai-secondary-btn i,
.ai-voice-btn i,
.ai-clear-input i {
  font-size: 0.95rem;
}

.ai-secondary-btn:hover:not(:disabled),
.ai-voice-btn:hover:not(:disabled),
.ai-clear-input:hover:not(:disabled) {
  border-color: rgba(15, 110, 99, 0.5);
  background: rgba(15, 110, 99, 0.08);
  transform: translateY(-1px);
}

.ai-secondary-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

@media (min-width: 992px) {
  .ai-secondary-group {
    flex-direction: row;
  }

  .ai-secondary-group button {
    flex: 1;
    min-width: 0;
  }

  .ai-form-meta {
    flex-direction: row;
    gap: 0.75rem;
    align-items: center;
  }

  .ai-secondary-group {
    flex: 2;
  }

  .ai-submit {
    flex: 1;
    min-width: 0;
  }
}

@media (min-width: 992px) {
  .ai-form-meta {
    flex-direction: row;
    gap: 0.75rem;
    align-items: center;
    justify-content: space-between;
  }

  .ai-secondary-btn,
  .ai-voice-btn,
  .ai-clear-input {
    width: calc(50% - 0.5rem);
  }

  .ai-clear-input {
    margin-left: auto;
  }

  .ai-submit {
    padding: 0.95rem 2.5rem;
    border-radius: 20px;
    font-size: 1rem;
    width: auto;
    min-width: 220px;
  }
}

.ai-voice-btn i {
  font-size: 0.95rem;
}

.ai-voice-btn--active {
  background: rgba(15, 110, 99, 0.14);
  border-color: rgba(15, 110, 99, 0.7);
}

.ai-voice-btn:not(:disabled):hover {
  border-color: #0db691;
  transform: translateY(-1px);
}

.ai-voice-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.voice-alert {
  font-size: 0.85rem;
  margin-bottom: 0;
  background: rgba(13, 182, 145, 0.12);
  border: 1px solid rgba(13, 182, 145, 0.25);
  border-radius: 14px;
  padding: 0.35rem 0.75rem;
}

.ai-voice-status {
  margin: 0;
  padding-left: 0.3rem;
  font-size: 0.9rem;
  color: #0b4b44;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 500;
}

.ai-error-banner {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 1rem 1.25rem;
  border-radius: 18px;
  margin-top: 1rem;
  margin-bottom: 1.25rem;
  border: 1px solid rgba(187, 30, 45, 0.25);
  background: linear-gradient(135deg, rgba(255, 235, 238, 0.9), rgba(255, 255, 255, 0.8));
  box-shadow: 0 10px 24px rgba(187, 30, 45, 0.08);
}

.ai-error-icon {
  font-size: 1.3rem;
  color: #c42a25;
  margin-top: 0.2rem;
}

.ai-error-title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #0c1c20;
}

.ai-error-message {
  margin: 0.1rem 0 0;
  color: #231212;
  font-size: 0.95rem;
  line-height: 1.4;
}

.ai-error-clear {
  margin-top: 0.5rem;
  padding: 0.35rem 0.95rem;
  font-size: 0.8rem;
  border-radius: 999px;
  border: 1px solid rgba(15, 110, 99, 0.45);
  background: transparent;
  color: #0b4b44;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.ai-error-clear:hover {
  background: rgba(15, 110, 99, 0.12);
  border-color: rgba(15, 110, 99, 0.75);
}

@keyframes ai-rise {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typingPulse {

  0%,
  80%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }

  40% {
    transform: translateY(-3px);
    opacity: 1;
  }
}

@keyframes ambientGlow {
  0% {
    opacity: 0.22;
    transform: scale(1);
  }

  50% {
    opacity: 0.45;
    transform: scale(1.02);
  }

  100% {
    opacity: 0.22;
    transform: scale(1);
  }
}

@keyframes drift {
  0% {
    transform: translateY(0) scale(1);
  }

  50% {
    transform: translateY(-6px) scale(1.01);
  }

  100% {
    transform: translateY(0) scale(1);
  }
}

@keyframes haloShift {
  0% {
    opacity: 0.5;
    transform: translate(-5px, -3px) scale(1);
  }

  50% {
    opacity: 0.65;
    transform: translate(5px, 4px) scale(1.02);
  }

  100% {
    opacity: 0.5;
    transform: translate(-5px, -3px) scale(1);
  }
}

@keyframes calmDrift {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-3px);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes gentleFloat {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
  }
}

@keyframes lightSweep {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@media (prefers-reduced-motion: reduce) {

  .ai-section::before,
  .ai-panel,
  .ai-panel::after,
  .ai-welcome,
  .ai-chat-shell,
  .ai-form,
  .chat-typing-dot {
    animation: none !important;
    transition: none !important;
  }
}

@media (max-width: 900px) {


  .ai-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .chat-bubble {
    max-width: 100%;
  }

  .ai-layout {
    grid-template-columns: 1fr;
    gap: 1.3rem;
  }

  .ai-sidebar {
    order: -1;
    background: #fff;
    padding: 0.9rem;
    border-radius: 16px;
    box-shadow: 0 10px 24px rgba(6, 8, 15, 0.08);
  }

  .ai-toolbar {
    flex-direction: column;
    gap: 0.6rem;
  }

  .ai-controls {
    justify-content: center;
  }

  .ai-control-btn {
    font-size: 0.78rem;
    padding: 0.45rem 0.8rem;
  }

  .ai-control-btn i {
    font-size: 0.95rem;
  }

  .ai-chat-shell {
    min-height: clamp(260px, 50vh, 420px);
    max-height: min(60vh, 520px);
    border-radius: 22px;
  }

  .ai-form {
    padding: 0.9rem;
    border-radius: 18px;
  }

  .ai-form-meta {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: stretch;
  }

  .ai-textarea {
    min-height: 110px;
  }

  .ai-submit {
    align-self: stretch;
    justify-content: center;
  }

  .ai-submit span {
    font-size: 0.78rem;
  }

  .ai-clear-input {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .ai-toolbar {
    padding: 0;
  }

  .ai-controls {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.4rem;
  }

  .ai-control-btn {
    flex: 1 1 calc(50% - 0.5rem);
    max-width: calc(50% - 0.5rem);
    text-align: center;
    font-size: 0.75rem;
    padding: 0.5rem;
  }

  .ai-form {
    padding: 0.8rem;
  }

  .ai-sidebar {
    padding: 0.75rem;
  }

  .ai-chat-shell {
    border-radius: 18px;
    padding: 0.65rem;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .ai-controls {
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .ai-control-btn {
    flex: 1 1 calc(33.333% - 0.35rem);
    max-width: calc(33.333% - 0.35rem);
  }
}

/* Simplified UI layer */
.ai-section {
  --ai-bg: #f2f6fb;
  --ai-surface: #ffffff;
  --ai-surface-soft: #f7fafd;
  --ai-border: #d5deea;
  --ai-border-strong: #bcc9d8;
  --ai-text: #0f172a;
  --ai-muted: #5f6f85;
  --ai-accent: #0d665c;
  --ai-accent-strong: #0a564e;
  --ai-accent-gold: #c7a154;
  --ai-radius-lg: 18px;
  --ai-radius-md: 12px;
  font-family: 'Nunito Sans', 'Helvetica Neue', sans-serif;
  background:
    radial-gradient(circle at 10% 0%, rgba(199, 161, 84, 0.12) 0%, rgba(199, 161, 84, 0) 45%),
    radial-gradient(circle at 100% 0%, rgba(13, 102, 92, 0.16) 0%, rgba(13, 102, 92, 0) 50%),
    var(--ai-bg);
  padding: 1.25rem 0;
}

.ai-section::before {
  display: none;
}

.ai-panel {
  max-width: 920px;
  margin: 0 auto;
  padding: 0;
  border: none;
  box-shadow: none;
  background: transparent;
  gap: 0.95rem;
}

.ai-header-card {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.9rem;
  padding: 0.9rem 1rem;
  border-radius: var(--ai-radius-lg);
  border: 1px solid rgba(199, 161, 84, 0.35);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(247, 251, 255, 0.95));
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.08);
}

.ai-header-main {
  min-width: 0;
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  flex: 1 1 420px;
}

.ai-header-avatar {
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: linear-gradient(135deg, var(--ai-accent), #0f7a6e);
  box-shadow: 0 10px 20px rgba(13, 102, 92, 0.28);
}

.ai-header-avatar i {
  font-size: 1rem;
}

.ai-header-actions {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  flex: 0 0 auto;
}

.ai-welcome {
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  text-align: left;
  align-items: flex-start;
  animation: none;
}

.ai-welcome:hover {
  transform: none;
  box-shadow: none;
}

.ai-welcome-icon {
  display: none !important;
}

.ai-welcome h2 {
  margin: 0;
  color: var(--ai-text);
  font-size: 1.25rem;
  line-height: 1.2;
  letter-spacing: 0.01em;
}

.ai-welcome-copy {
  margin: 0.25rem 0 0;
  font-size: 0.93rem;
  color: var(--ai-muted);
  line-height: 1.45;
}

.ai-header-status {
  margin-top: 0.35rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.74rem;
  color: #4b5d75;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.ai-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(180deg, #2ec27e, #1f9d67);
  box-shadow: 0 0 0 4px rgba(46, 194, 126, 0.15);
}

.ai-capability-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: -0.05rem;
}

.ai-capability-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border-radius: 999px;
  border: 1px solid rgba(13, 102, 92, 0.22);
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.06);
  color: #1e3a46;
  font-size: 0.76rem;
  font-weight: 600;
  padding: 0.34rem 0.7rem;
}

.ai-capability-pill i {
  color: var(--ai-accent);
  font-size: 0.75rem;
}

.ai-controls {
  margin: 0;
  justify-content: flex-start;
  gap: 0.5rem;
}

.ai-control-btn {
  padding: 0.5rem 0.85rem;
  border-radius: 11px;
  font-size: 0.84rem;
  font-weight: 600;
  border: 1px solid var(--ai-border);
  background: var(--ai-surface);
  box-shadow: 0 5px 14px rgba(15, 23, 42, 0.06);
  color: var(--ai-text);
}

.ai-control-btn:hover:not(:disabled) {
  transform: none;
  border-color: var(--ai-border-strong);
  background: var(--ai-surface-soft);
}

.ai-control-btn:focus-visible,
.chat-copy-btn:focus-visible,
.ai-submit:focus-visible,
.ai-clear-input:focus-visible,
.ai-disclaimer-link:focus-visible {
  outline: 2px solid rgba(15, 110, 99, 0.3);
  outline-offset: 2px;
}

.ai-control-btn--primary {
  background: linear-gradient(135deg, var(--ai-accent), #0f7a6e);
  border-color: rgba(13, 102, 92, 0.8);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(13, 102, 92, 0.28);
}

.ai-control-btn--primary:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--ai-accent-strong), #0d665c);
  border-color: var(--ai-accent-strong);
}

.ai-chat-shell {
  min-height: 380px;
  max-height: min(70vh, 760px);
  border-radius: var(--ai-radius-lg);
  border: 1px solid rgba(199, 161, 84, 0.28);
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.1);
  padding: 0.9rem;
  animation: none;
}

.ai-chat-surface-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.55rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(188, 201, 216, 0.4);
}

.ai-chat-surface-head p {
  color: #334155;
  font-size: 0.83rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.ai-chat-surface-head span {
  color: #64748b;
  font-size: 0.78rem;
  font-weight: 600;
}

.ai-metadata {
  margin-bottom: 0.55rem;
}

.ai-empty-state {
  width: 100%;
  text-align: left;
  background: var(--ai-surface-soft);
  border: 1px dashed var(--ai-border);
  border-radius: var(--ai-radius-md);
  padding: 1rem 0.85rem;
}

.ai-empty-state__title {
  margin: 0;
  font-size: 0.96rem;
  color: var(--ai-text);
  font-weight: 700;
}

.ai-empty-state__copy {
  margin: 0.25rem 0 0.6rem;
  font-size: 0.86rem;
  color: var(--ai-muted);
  line-height: 1.45;
}

.ai-empty-prompts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 0.45rem;
}

.ai-empty-prompt {
  text-align: left;
  border-radius: 10px;
  border: 1px solid rgba(13, 102, 92, 0.2);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(247, 251, 255, 0.94));
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.06);
  padding: 0.55rem 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.ai-empty-prompt:hover:not(:disabled) {
  border-color: rgba(13, 102, 92, 0.46);
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);
}

.ai-empty-prompt:disabled {
  opacity: 0.62;
  cursor: not-allowed;
}

.ai-empty-prompt__label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #0f6e63;
  text-transform: uppercase;
}

.ai-empty-prompt__text {
  font-size: 0.82rem;
  line-height: 1.35;
  color: #334155;
}

.ai-loading-indicator {
  background: linear-gradient(135deg, rgba(13, 102, 92, 0.08), rgba(199, 161, 84, 0.08));
  border: 1px solid rgba(13, 102, 92, 0.2);
  color: #334155;
}

.chat-entry {
  gap: 0.25rem;
}

.chat-entry:hover {
  transform: none;
}

.chat-entry-header {
  font-size: 0.78rem;
  color: var(--ai-muted);
}

.chat-entry-header .chat-icon {
  background: transparent;
  color: #94a3b8;
  padding: 0;
  font-size: 0.9rem;
}

.chat-bubble {
  border-radius: var(--ai-radius-md);
  border: 1px solid var(--ai-border);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
  padding: 0.8rem 0.9rem;
  max-width: min(92%, 740px);
}

.chat-bubble:hover {
  transform: none;
  box-shadow: none;
}

.chat-bubble.assistant {
  background: linear-gradient(180deg, #ffffff 0%, #f7fbff 100%);
  border-color: rgba(188, 201, 216, 0.75);
  width: auto;
  max-width: min(92%, 740px);
}

.chat-bubble.user {
  background: linear-gradient(135deg, #0e6d63, #0a5a52);
  border-color: rgba(10, 90, 82, 0.95);
  color: #ffffff;
  box-shadow: 0 12px 28px rgba(10, 90, 82, 0.25);
}

.chat-entry-actions {
  margin-top: 0.35rem;
  justify-content: flex-start;
}

.chat-copy-btn {
  border: 1px solid var(--ai-border);
  background: var(--ai-surface);
  color: #334155;
  border-radius: 9px;
  padding: 0.3rem 0.65rem;
  font-size: 0.8rem;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.05);
}

.chat-copy-btn:hover {
  transform: none;
  background: var(--ai-surface-soft);
}

.chat-verification {
  margin-top: 0.35rem;
  font-size: 0.72rem;
}

.chat-references-wrapper {
  max-width: 100%;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  border: 1px solid rgba(188, 201, 216, 0.75);
  border-radius: 10px;
  padding: 0.5rem 0.65rem;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.05);
}

.chat-references-heading {
  color: #475569;
}

.chat-references {
  font-size: 0.85rem;
  color: #334155;
}

.chat-references a {
  color: #0b5f56;
}

.chat-reference-badge {
  border-color: #d7e2ec;
  background: #f8fafc;
  color: #334155;
}

.chat-reference-badge--official {
  border-color: rgba(15, 110, 99, 0.28);
  background: rgba(15, 110, 99, 0.08);
  color: #0b4b44;
}

.chat-reference-badge--verified {
  border-color: rgba(14, 116, 144, 0.28);
  background: rgba(14, 116, 144, 0.08);
  color: #0e4f69;
}

.chat-reference-badge--aggregated {
  border-color: rgba(148, 163, 184, 0.45);
  background: rgba(148, 163, 184, 0.12);
  color: #475569;
}

.chat-reference-badge--sahih {
  border-color: rgba(22, 163, 74, 0.3);
  background: rgba(22, 163, 74, 0.1);
  color: #166534;
}

.chat-reference-badge--hasan {
  border-color: rgba(217, 119, 6, 0.3);
  background: rgba(217, 119, 6, 0.1);
  color: #9a580a;
}

.chat-reference-badge--daif {
  border-color: rgba(220, 38, 38, 0.28);
  background: rgba(220, 38, 38, 0.08);
  color: #991b1b;
}

.chat-reference-badge--ungraded {
  border-color: rgba(100, 116, 139, 0.35);
  background: rgba(100, 116, 139, 0.1);
  color: #334155;
}

.ai-form {
  border-radius: var(--ai-radius-lg);
  border: 1px solid rgba(199, 161, 84, 0.28);
  background: linear-gradient(180deg, #ffffff 0%, #fafdff 100%);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.09);
  animation: none;
  padding: 0.85rem;
}

.ai-textarea {
  min-height: 90px;
  border-radius: 10px;
  border: 1px solid var(--ai-border);
  padding: 0.8rem 0.9rem;
  color: var(--ai-text);
}

.ai-textarea::placeholder {
  color: #94a3b8;
}

.ai-textarea:focus {
  border-color: var(--ai-accent);
  box-shadow: 0 0 0 3px rgba(15, 110, 99, 0.14);
  transform: none;
}

.ai-form-meta {
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.ai-compose-meta {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
}

.ai-input-hint {
  font-size: 0.76rem;
  color: var(--ai-muted);
}

.ai-char-count {
  font-size: 0.73rem;
  color: #516179;
  border-radius: 999px;
  border: 1px solid var(--ai-border);
  background: #ffffff;
  padding: 0.1rem 0.45rem;
  font-weight: 700;
}

.ai-char-count--warn {
  color: #7a3f00;
  border-color: rgba(194, 104, 0, 0.36);
  background: rgba(255, 186, 73, 0.16);
}

.ai-secondary-group {
  width: auto;
  flex-direction: row;
  gap: 0.45rem;
}

.ai-submit {
  border-radius: 11px;
  padding: 0.58rem 1rem;
  font-size: 0.84rem;
  font-weight: 700;
  box-shadow: 0 10px 22px rgba(13, 102, 92, 0.24);
  background: linear-gradient(135deg, var(--ai-accent), #0f7a6e);
}

.ai-submit:not(:disabled):hover {
  background: linear-gradient(135deg, var(--ai-accent-strong), #0d665c);
  transform: none;
  box-shadow: 0 12px 24px rgba(13, 102, 92, 0.3);
}

.ai-clear-input {
  width: auto;
  border-radius: 10px;
  border: 1px solid var(--ai-border);
  background: var(--ai-surface);
  padding: 0.58rem 0.9rem;
  font-size: 0.82rem;
  color: #334155;
}

.ai-clear-input:hover:not(:disabled) {
  transform: none;
  background: var(--ai-surface-soft);
}

.ai-trust-note {
  margin: 0;
  padding: 0.62rem 0.75rem;
  border-radius: 11px;
  border: 1px solid rgba(13, 102, 92, 0.25);
  background: linear-gradient(135deg, rgba(13, 102, 92, 0.08), rgba(199, 161, 84, 0.08));
  justify-content: flex-start;
  font-size: 0.81rem;
}

.ai-trust-note i {
  color: #64748b;
  font-size: 0.9rem;
}

.ai-disclaimer-modal-backdrop {
  background: rgba(15, 23, 42, 0.42);
  backdrop-filter: blur(2px);
}

.ai-disclaimer-modal-card {
  border-radius: 14px;
  border: 1px solid rgba(199, 161, 84, 0.35);
  box-shadow: 0 22px 44px rgba(15, 23, 42, 0.2);
}

.ai-disclaimer-modal-head {
  border-bottom: 1px solid #e8edf3;
}

.ai-disclaimer-modal-body {
  color: #334155;
}

.ai-copy-notice {
  border-radius: 10px;
  border: 1px solid rgba(15, 110, 99, 0.24);
  background: rgba(15, 110, 99, 0.08);
  padding: 0.38rem 0.58rem;
  font-size: 0.82rem;
}

.ai-error-banner {
  border-radius: 10px;
  padding: 0.75rem 0.85rem;
  box-shadow: none;
}

@media (max-width: 768px) {
  .ai-section {
    padding: 0.9rem 0;
  }

  .ai-header-card {
    padding: 0.8rem;
    gap: 0.7rem;
  }

  .ai-header-main {
    gap: 0.55rem;
  }

  .ai-header-avatar {
    width: 34px;
    height: 34px;
    flex-basis: 34px;
    border-radius: 10px;
  }

  .ai-header-actions {
    width: 100%;
    justify-content: stretch;
  }

  .ai-header-actions .ai-control-btn {
    flex: 1 1 0;
  }

  .ai-capability-row {
    gap: 0.35rem;
  }

  .ai-capability-pill {
    font-size: 0.72rem;
    padding: 0.32rem 0.6rem;
  }

  .ai-controls {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .ai-control-btn {
    flex: 1 1 auto;
  }

  .ai-chat-shell {
    min-height: 320px;
  }

  .ai-form-meta {
    flex-direction: column;
    align-items: stretch;
    gap: 0.45rem;
  }

  .ai-compose-meta {
    justify-content: space-between;
  }

  .ai-secondary-group {
    width: 100%;
  }

  .ai-submit,
  .ai-clear-input {
    width: 100%;
    justify-content: center;
  }
}

/* Modern LLM override layer */
.ai-section.ai-modern {
  --llm-font-ui: "Manrope", "Sora", "Avenir Next", "Trebuchet MS", sans-serif;
  --llm-font-title: "Fraunces", "Iowan Old Style", "Times New Roman", serif;
  --llm-bg-0: #f7faff;
  --llm-bg-1: #eef6ff;
  --llm-bg-2: #eef9f3;
  --llm-surface: #ffffff;
  --llm-surface-soft: #f8fbff;
  --llm-surface-tint: #f1f8f7;
  --llm-border: #d3e1ec;
  --llm-border-strong: #b8cddd;
  --llm-text: #102132;
  --llm-muted: #53657a;
  --llm-primary: #0f766e;
  --llm-primary-strong: #0b5f58;
  --llm-primary-soft: #e8f6f3;
  --llm-warm: #d8af6b;
  --llm-danger: #a42231;
  --llm-shadow-soft: 0 14px 34px rgba(13, 33, 57, 0.1);
  --llm-shadow-strong: 0 26px 70px rgba(13, 33, 57, 0.16);
  font-family: var(--llm-font-ui);
  border-radius: 30px;
  border: 1px solid rgba(182, 199, 217, 0.5);
  background:
    radial-gradient(920px 480px at -8% -14%, rgba(15, 118, 110, 0.2), transparent 68%),
    radial-gradient(660px 420px at 108% -2%, rgba(216, 175, 107, 0.24), transparent 68%),
    linear-gradient(180deg, var(--llm-bg-0) 0%, var(--llm-bg-1) 45%, var(--llm-bg-2) 100%);
  box-shadow:
    0 24px 58px rgba(13, 33, 57, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.ai-section.ai-modern::before {
  opacity: 0.36;
  background:
    radial-gradient(circle at 18% 20%, rgba(255, 255, 255, 0.84), transparent 60%),
    linear-gradient(120deg, rgba(74, 104, 136, 0.06) 0%, transparent 50%),
    repeating-linear-gradient(
      135deg,
      rgba(15, 118, 110, 0.04) 0 15px,
      rgba(15, 118, 110, 0) 15px 34px
    );
}

.ai-section.ai-modern .ai-panel {
  max-width: 1060px;
  margin: 0 auto;
  gap: 1.1rem;
}

.ai-section.ai-modern .ai-header-card {
  position: relative;
  border-radius: 22px;
  border: 1px solid transparent;
  background:
    linear-gradient(165deg, rgba(255, 255, 255, 0.96) 0%, rgba(247, 252, 255, 0.9) 100%) padding-box,
    linear-gradient(135deg, #dce8f3 0%, #cbdfd6 100%) border-box;
  box-shadow: var(--llm-shadow-soft);
  padding: 1.08rem 1.22rem;
}

.ai-section.ai-modern .ai-header-avatar {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background: linear-gradient(145deg, var(--llm-primary) 0%, #149487 100%);
  box-shadow:
    0 10px 18px rgba(15, 118, 110, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.ai-section.ai-modern .ai-header-avatar i {
  font-size: 1.08rem;
  color: #f6fffd;
}

.ai-section.ai-modern .ai-welcome-text h2 {
  margin: 0;
  font-family: var(--llm-font-title);
  font-weight: 700;
  font-size: clamp(1.68rem, 2.1vw, 2.14rem);
  letter-spacing: -0.01em;
  color: #112331;
}

.ai-section.ai-modern .ai-welcome h2 {
  font-family: var(--llm-font-title);
}

.ai-section.ai-modern .ai-welcome-copy {
  margin-top: 0.35rem;
  color: var(--llm-muted);
  font-size: 1rem;
  line-height: 1.58;
  max-width: 56ch;
}

.ai-section.ai-modern .ai-header-status {
  margin-top: 0.35rem;
  color: #365769;
  display: inline-flex;
  align-items: center;
  gap: 0.48rem;
  font-size: 0.84rem;
  font-weight: 700;
  border-radius: 999px;
  padding: 0.24rem 0.58rem 0.24rem 0.32rem;
  background: rgba(232, 246, 243, 0.82);
  border: 1px solid rgba(15, 118, 110, 0.2);
}

.ai-section.ai-modern .ai-status-dot {
  width: 0.58rem;
  height: 0.58rem;
  border-radius: 999px;
  background: #23b387;
  box-shadow: 0 0 0 6px rgba(35, 179, 135, 0.16);
}

.ai-section.ai-modern .ai-header-actions {
  gap: 0.55rem;
}

.ai-section.ai-modern .ai-capability-row {
  margin-top: 0.34rem;
  gap: 0.45rem;
}

.ai-section.ai-modern .ai-capability-pill {
  border: 1px solid #d5e4ef;
  background: rgba(255, 255, 255, 0.78);
  color: #294458;
  box-shadow: 0 10px 22px rgba(20, 40, 67, 0.08);
  font-size: 0.76rem;
  font-weight: 700;
  backdrop-filter: blur(4px);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.ai-section.ai-modern .ai-capability-pill:hover {
  transform: translateY(-1px);
  border-color: #b9d0df;
  box-shadow: 0 12px 24px rgba(20, 40, 67, 0.1);
}

.ai-section.ai-modern .ai-control-btn {
  border: 1px solid #c8d8e6;
  border-radius: 12px;
  padding: 0.58rem 0.92rem;
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  background: linear-gradient(180deg, #ffffff 0%, #f7fbff 100%);
  color: #1a3045;
  box-shadow: 0 8px 18px rgba(20, 40, 67, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.ai-section.ai-modern .ai-control-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  background: linear-gradient(180deg, #ffffff 0%, #f2f8ff 100%);
  border-color: #aecade;
  box-shadow: 0 12px 24px rgba(20, 40, 67, 0.12);
}

.ai-section.ai-modern .ai-control-btn--primary {
  background: linear-gradient(140deg, var(--llm-primary) 0%, #1a8e83 100%);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 14px 28px rgba(15, 118, 110, 0.3);
}

.ai-section.ai-modern .ai-control-btn:disabled {
  opacity: 0.58;
  box-shadow: none;
  transform: none;
}

.ai-section.ai-modern .ai-chat-shell {
  border: 1px solid transparent;
  border-radius: 24px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 252, 255, 0.96) 100%) padding-box,
    linear-gradient(140deg, #d9e7f2 0%, #c7ddd4 100%) border-box;
  box-shadow: var(--llm-shadow-soft);
  min-height: clamp(220px, 36vh, 460px);
  max-height: clamp(340px, 58vh, 650px);
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr);
  gap: 0.56rem;
  padding: 0.88rem 0.95rem 0.94rem;
  overflow: hidden;
  transition: min-height 0.2s ease, max-height 0.2s ease;
}

.ai-section.ai-modern .ai-chat-shell--empty {
  min-height: auto;
  max-height: none;
  grid-template-rows: auto auto;
}

.ai-section.ai-modern .ai-chat-shell--empty .ai-metadata {
  margin-bottom: 0;
}

.ai-section.ai-modern .ai-chat-surface-head {
  margin-bottom: 0;
  padding: 0 0.15rem 0.45rem;
  border-bottom: 1px solid #deebf5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ai-section.ai-modern .ai-chat-surface-head p {
  margin: 0;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  font-weight: 800;
  text-transform: uppercase;
  color: #465d74;
}

.ai-section.ai-modern .ai-chat-surface-head span {
  font-size: 0.8rem;
  font-weight: 700;
  color: #577089;
  background: #eef5fb;
  border: 1px solid #d8e5f1;
  border-radius: 999px;
  padding: 0.16rem 0.52rem;
}

.ai-section.ai-modern .ai-metadata {
  margin-bottom: 0;
}

.ai-section.ai-modern .ai-empty-state {
  border: 1px dashed #cbdae8;
  background:
    radial-gradient(380px 200px at 12% 20%, rgba(15, 118, 110, 0.09), transparent 75%),
    linear-gradient(180deg, #f9fcff 0%, #f3f9ff 100%);
  border-radius: 16px;
  padding: 1rem 1.02rem;
  text-align: center;
}

.ai-section.ai-modern .ai-empty-state__title {
  margin: 0;
  font-size: 1.02rem;
  font-weight: 800;
  color: #1c3348;
}

.ai-section.ai-modern .ai-empty-state__copy {
  margin-top: 0.36rem;
  font-size: 0.9rem;
  color: #5a7085;
  line-height: 1.56;
}

.ai-section.ai-modern .ai-empty-prompts {
  margin-top: 0.78rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.52rem;
}

.ai-section.ai-modern .ai-empty-prompt {
  border: 1px solid #c9d9e8;
  border-radius: 13px;
  background: linear-gradient(180deg, #ffffff 0%, #f7fbff 100%);
  box-shadow: 0 8px 16px rgba(20, 40, 67, 0.08);
  padding: 0.7rem 0.74rem;
  text-align: left;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.ai-section.ai-modern .ai-empty-prompt:hover:not(:disabled) {
  transform: translateY(-2px);
  border-color: #9eb9ce;
  box-shadow: 0 14px 22px rgba(20, 40, 67, 0.14);
}

.ai-section.ai-modern .ai-empty-prompt__label {
  font-size: 0.7rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: #2f5f7a;
  font-weight: 800;
}

.ai-section.ai-modern .ai-empty-prompt__text {
  margin-top: 0.3rem;
  font-size: 0.86rem;
  color: #1f3c53;
  line-height: 1.45;
}

.ai-section.ai-modern .ai-chat-window {
  display: flex;
  flex-direction: column;
  gap: 0.78rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 0.14rem 0.08rem;
  scrollbar-width: thin;
  scrollbar-color: #b5cde1 transparent;
}

.ai-section.ai-modern .ai-chat-window::-webkit-scrollbar {
  width: 8px;
}

.ai-section.ai-modern .ai-chat-window::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #c6d9ea 0%, #a8c5da 100%);
  border-radius: 999px;
}

.ai-section.ai-modern .chat-entry {
  gap: 0.3rem;
  animation: ai-modern-rise 0.34s ease both;
}

@keyframes ai-modern-rise {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ai-section.ai-modern .chat-entry-header {
  font-size: 0.76rem;
  color: #5a7186;
  font-weight: 700;
  gap: 0.38rem;
}

.ai-section.ai-modern .chat-entry-header .chat-icon {
  color: #3e6c8a;
  background: #e9f3fc;
  border: 1px solid #d1e3f1;
  border-radius: 999px;
  width: 1.25rem;
  height: 1.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
}

.ai-section.ai-modern .chat-entry.user .chat-entry-header .chat-icon {
  color: #3d8f84;
  background: #e6f6f3;
  border-color: #bfe3dc;
}

.ai-section.ai-modern .chat-role b {
  font-weight: 800;
  color: #365068;
}

.ai-section.ai-modern .chat-timestamp {
  color: #6a8197;
  font-weight: 600;
}

.ai-section.ai-modern .chat-entry.user .chat-entry-header {
  justify-content: flex-end;
}

.ai-section.ai-modern .chat-bubble {
  position: relative;
  border-radius: 18px;
  border: 1px solid #d9e4ee;
  box-shadow: 0 12px 26px rgba(18, 37, 58, 0.1);
  padding: 0.88rem 1rem;
  max-width: min(93%, 860px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.ai-section.ai-modern .chat-bubble.assistant {
  background: linear-gradient(180deg, #ffffff 0%, #f4f9ff 100%);
  border-color: #d4e3ef;
}

.ai-section.ai-modern .chat-entry.assistant .chat-bubble::before {
  content: "";
  position: absolute;
  left: -7px;
  top: 16px;
  width: 14px;
  height: 14px;
  border-left: 1px solid #d4e3ef;
  border-bottom: 1px solid #d4e3ef;
  background: #fbfdff;
  transform: rotate(45deg);
}

.ai-section.ai-modern .chat-bubble.user {
  background: linear-gradient(145deg, var(--llm-primary) 0%, #128a7d 62%, #0d6b61 100%);
  border-color: transparent;
  color: #fff;
  width: min(96%, 920px);
  max-width: min(96%, 920px);
  box-shadow: 0 16px 30px rgba(15, 118, 110, 0.3);
}

.ai-section.ai-modern .chat-entry.user .chat-bubble::before {
  content: "";
  position: absolute;
  right: -7px;
  top: 16px;
  width: 14px;
  height: 14px;
  background: #0f766e;
  transform: rotate(45deg);
}

.ai-section.ai-modern .chat-bubble p {
  font-size: 0.95rem;
  line-height: 1.62;
  letter-spacing: 0.005em;
}

.ai-section.ai-modern .chat-entry.user .chat-bubble p {
  color: #ffffff;
}

.ai-section.ai-modern .chat-entry:hover .chat-bubble {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(18, 37, 58, 0.13);
}

.ai-section.ai-modern .chat-entry-actions {
  margin-top: 0.32rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.ai-section.ai-modern .chat-copy-btn {
  border: 1px solid #c9d9e8;
  border-radius: 10px;
  font-size: 0.78rem;
  background: linear-gradient(180deg, #ffffff 0%, #f6fbff 100%);
  color: #294b63;
  font-weight: 700;
  padding: 0.28rem 0.55rem;
  box-shadow: 0 8px 14px rgba(20, 40, 67, 0.08);
}

.ai-section.ai-modern .chat-copy-btn:hover {
  background: linear-gradient(180deg, #ffffff 0%, #ecf5ff 100%);
  border-color: #aac3d7;
}

.ai-section.ai-modern .chat-references-wrapper {
  margin-top: 0.52rem;
  border: 1px solid #d4e2ee;
  border-radius: 13px;
  background: linear-gradient(180deg, #ffffff 0%, #f6fbff 100%);
  box-shadow: 0 10px 20px rgba(20, 40, 67, 0.08);
  padding: 0.56rem 0.68rem;
}

.ai-section.ai-modern .chat-references-heading {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 800;
  color: #4a637b;
}

.ai-section.ai-modern .chat-references {
  margin-top: 0.35rem;
  font-size: 0.84rem;
  color: #213e54;
}

.ai-section.ai-modern .chat-reference-main a {
  color: #0f5f8b;
  font-weight: 700;
  text-decoration-color: rgba(15, 95, 139, 0.35);
  text-underline-offset: 2px;
}

.ai-section.ai-modern .chat-reference-badges {
  gap: 0.32rem;
}

.ai-section.ai-modern .chat-reference-badge {
  font-size: 0.64rem;
  border-radius: 999px;
  padding: 0.12rem 0.48rem;
  font-weight: 800;
  letter-spacing: 0.01em;
}

.ai-section.ai-modern .chat-reference-badge--official {
  background: rgba(15, 118, 110, 0.12);
  border-color: rgba(15, 118, 110, 0.33);
  color: #0c5b54;
}

.ai-section.ai-modern .chat-reference-badge--verified {
  background: rgba(12, 108, 156, 0.1);
  border-color: rgba(12, 108, 156, 0.25);
  color: #0b557c;
}

.ai-section.ai-modern .chat-reference-badge--aggregated {
  background: rgba(88, 112, 138, 0.1);
  border-color: rgba(88, 112, 138, 0.22);
  color: #40566d;
}

.ai-section.ai-modern .chat-reference-badge--sahih {
  background: rgba(21, 128, 61, 0.12);
  border-color: rgba(21, 128, 61, 0.26);
  color: #14532d;
}

.ai-section.ai-modern .chat-reference-badge--hasan {
  background: rgba(202, 138, 4, 0.14);
  border-color: rgba(202, 138, 4, 0.3);
  color: #7a4700;
}

.ai-section.ai-modern .chat-reference-badge--daif {
  background: rgba(194, 24, 38, 0.12);
  border-color: rgba(194, 24, 38, 0.24);
  color: #8a1823;
}

.ai-section.ai-modern .chat-reference-badge--ungraded {
  background: rgba(91, 111, 132, 0.12);
  border-color: rgba(91, 111, 132, 0.24);
  color: #40566d;
}

.ai-section.ai-modern .chat-verification {
  font-size: 0.72rem;
  font-weight: 700;
  border-radius: 999px;
  padding: 0.18rem 0.5rem;
  width: fit-content;
  border: 1px solid #d6e4ef;
  background: #f8fbff;
  color: #446179;
}

.ai-section.ai-modern .chat-verification.chat-verification--high {
  border-color: rgba(21, 128, 61, 0.28);
  background: rgba(21, 128, 61, 0.08);
  color: #14532d;
}

.ai-section.ai-modern .chat-verification.chat-verification--medium {
  border-color: rgba(180, 117, 14, 0.28);
  background: rgba(180, 117, 14, 0.08);
  color: #7a4700;
}

.ai-section.ai-modern .chat-verification.chat-verification--low {
  border-color: rgba(194, 24, 38, 0.24);
  background: rgba(194, 24, 38, 0.08);
  color: #8a1823;
}

.ai-section.ai-modern .ai-form {
  border: 1px solid transparent;
  border-radius: 22px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 252, 255, 0.95) 100%) padding-box,
    linear-gradient(145deg, #d7e5f1 0%, #c9ded6 100%) border-box;
  box-shadow: var(--llm-shadow-soft);
  padding: 1rem;
}

.ai-section.ai-modern .ai-textarea {
  border: 1px solid #cbdbe8;
  border-radius: 14px;
  min-height: 94px;
  max-height: 210px;
  font-size: 0.95rem;
  line-height: 1.56;
  color: #1a3245;
  background: linear-gradient(180deg, #ffffff 0%, #f7fbff 100%);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  resize: none;
}

.ai-section.ai-modern .ai-textarea:focus {
  border-color: #90b8d5;
  box-shadow: 0 0 0 4px rgba(87, 145, 189, 0.16);
  outline: none;
}

.ai-section.ai-modern .ai-form-meta {
  margin-top: 0.7rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.65rem;
}

.ai-section.ai-modern .ai-compose-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ai-section.ai-modern .ai-input-hint {
  font-size: 0.74rem;
  color: #5d7388;
  font-weight: 600;
}

.ai-section.ai-modern .ai-char-count {
  font-size: 0.73rem;
  border: 1px solid #d4e1ec;
  background: #f5f9fc;
  color: #496178;
  border-radius: 999px;
  padding: 0.12rem 0.48rem;
  font-weight: 800;
}

.ai-section.ai-modern .ai-char-count--warn {
  border-color: rgba(194, 24, 38, 0.25);
  background: rgba(194, 24, 38, 0.07);
  color: var(--llm-danger);
}

.ai-section.ai-modern .ai-secondary-group {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
  align-items: center;
  gap: 0.6rem;
}

.ai-section.ai-modern .ai-submit {
  border-radius: 12px;
  font-size: 0.84rem;
  padding: 0.62rem 1rem;
  background: linear-gradient(140deg, var(--llm-primary) 0%, #1b9186 100%);
  color: #fff;
  font-weight: 800;
  border: 1px solid transparent;
  box-shadow: 0 12px 24px rgba(15, 118, 110, 0.28);
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
  width: 100%;
  justify-content: center;
}

.ai-section.ai-modern .ai-submit:disabled,
.ai-section.ai-modern .ai-clear-input:disabled {
  opacity: 0.64;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.ai-section.ai-modern .ai-submit:not(:disabled):hover {
  transform: translateY(-1px);
  background: linear-gradient(140deg, var(--llm-primary-strong) 0%, #167d74 100%);
  box-shadow: 0 14px 28px rgba(15, 118, 110, 0.34);
  filter: saturate(1.04);
}

.ai-section.ai-modern .ai-clear-input {
  border: 1px solid #c7d7e6;
  border-radius: 12px;
  font-size: 0.82rem;
  font-weight: 700;
  padding: 0.62rem 0.95rem;
  background: linear-gradient(180deg, #ffffff 0%, #f4f9ff 100%);
  color: #345069;
  box-shadow: 0 8px 14px rgba(20, 40, 67, 0.08);
  width: 100%;
  justify-content: center;
}

.ai-section.ai-modern .ai-clear-input:hover:not(:disabled) {
  border-color: #aecae0;
  background: linear-gradient(180deg, #ffffff 0%, #ecf4fc 100%);
}

.ai-section.ai-modern .ai-trust-note {
  margin-top: 0.7rem;
  border: 1px solid #cfdeeb;
  background: linear-gradient(180deg, #f9fcff 0%, #f2f8ff 100%);
  border-radius: 13px;
  font-size: 0.8rem;
  color: #4c6478;
  padding: 0.56rem 0.7rem;
}

.ai-section.ai-modern .ai-trust-note i {
  color: #356788;
}

.ai-section.ai-modern .ai-disclaimer-link {
  color: #0f6e9f !important;
  font-weight: 700;
}

.ai-section.ai-modern .ai-copy-notice {
  border: 1px solid rgba(15, 118, 110, 0.28);
  background: linear-gradient(180deg, #f1fbf8 0%, #e7f8f3 100%);
  border-radius: 13px;
  font-size: 0.82rem;
  color: #1d5f58;
  box-shadow: 0 10px 18px rgba(15, 118, 110, 0.15);
}

.ai-section.ai-modern .ai-error-banner {
  border: 1px solid rgba(194, 24, 38, 0.25);
  background: linear-gradient(180deg, #fff8f9 0%, #fff0f2 100%);
  box-shadow: 0 14px 24px rgba(194, 24, 38, 0.1);
  border-radius: 13px;
}

.ai-section.ai-modern .ai-loading-indicator {
  border-radius: 12px;
  border: 1px solid #d4e1ec;
  background: linear-gradient(180deg, #f8fbff 0%, #f2f8ff 100%);
  padding: 0.62rem 0.7rem;
  color: #304e67;
}

.ai-section.ai-modern .chat-bubble--typing {
  border-style: dashed;
  border-color: #cadbeb;
}

.ai-section.ai-modern .chat-typing-dot {
  background: #49948d;
}

.ai-section.ai-modern .ai-disclaimer-modal-backdrop {
  background: rgba(10, 22, 36, 0.52);
  backdrop-filter: blur(4px);
}

.ai-section.ai-modern .ai-disclaimer-modal-card {
  border-radius: 18px;
  border: 1px solid #d6e4ef;
  background: linear-gradient(180deg, #ffffff 0%, #f6fbff 100%);
  box-shadow: var(--llm-shadow-strong);
}

.ai-section.ai-modern .ai-disclaimer-modal-head {
  border-bottom: 1px solid #dce8f2;
}

.ai-section.ai-modern .ai-disclaimer-modal-head h3 {
  color: #1c3448;
  font-weight: 800;
}

.ai-section.ai-modern .ai-disclaimer-close {
  border: 1px solid #d1dfeb;
  background: #ffffff;
  color: #436179;
  border-radius: 10px;
}

.ai-section.ai-modern .ai-disclaimer-close-btn {
  border-radius: 11px;
  background: linear-gradient(140deg, var(--llm-primary) 0%, #1a8d82 100%);
  border: 1px solid transparent;
  color: #fff;
  font-weight: 700;
}

.ai-section.ai-modern .text-muted {
  color: var(--llm-muted) !important;
}

@media (max-width: 768px) {
  .ai-section.ai-modern {
    border-radius: 22px;
    padding: 0.64rem;
  }

  .ai-section.ai-modern .ai-header-card {
    border-radius: 17px;
    padding: 0.8rem;
  }

  .ai-section.ai-modern .ai-header-main {
    align-items: flex-start;
    gap: 0.66rem;
  }

  .ai-section.ai-modern .ai-welcome-text h2 {
    font-size: 1.42rem;
  }

  .ai-section.ai-modern .ai-welcome-copy {
    font-size: 0.9rem;
  }

  .ai-section.ai-modern .ai-header-actions {
    width: 100%;
    margin-top: 0.35rem;
  }

  .ai-section.ai-modern .ai-header-actions .ai-control-btn {
    flex: 1 1 0;
  }

  .ai-section.ai-modern .ai-capability-row {
    gap: 0.38rem;
  }

  .ai-section.ai-modern .ai-capability-pill {
    font-size: 0.72rem;
    padding: 0.34rem 0.58rem;
  }

  .ai-section.ai-modern .ai-chat-shell {
    min-height: clamp(220px, 38vh, 360px);
    max-height: 56vh;
    border-radius: 17px;
    padding: 0.68rem;
  }

  .ai-section.ai-modern .ai-chat-shell--empty {
    min-height: auto;
    max-height: none;
  }

  .ai-section.ai-modern .chat-bubble {
    max-width: 96%;
    border-radius: 15px;
  }

  .ai-section.ai-modern .ai-empty-prompts {
    grid-template-columns: 1fr;
  }

  .ai-section.ai-modern .ai-secondary-group {
    width: 100%;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .ai-section.ai-modern .ai-submit,
  .ai-section.ai-modern .ai-clear-input {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 560px) {
  .ai-section.ai-modern .ai-secondary-group {
    grid-template-columns: 1fr;
  }

  .ai-section.ai-modern .ai-header-status {
    font-size: 0.77rem;
  }

  .ai-section.ai-modern .ai-chat-surface-head {
    flex-wrap: wrap;
    gap: 0.38rem;
  }

  .ai-section.ai-modern .ai-form {
    border-radius: 16px;
    padding: 0.75rem;
  }

  .ai-section.ai-modern .ai-textarea {
    min-height: 92px;
    font-size: 0.92rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ai-section.ai-modern *,
  .ai-section.ai-modern *::before,
  .ai-section.ai-modern *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}

/* ChatGPT-like layout in site-relevant theme */
.ai-section.ai-gpt {
  --ai-gpt-available-height: 100dvh;
  --gpt-bg: #e8efed;
  --gpt-surface: #ffffff;
  --gpt-surface-soft: #f4f8f7;
  --gpt-border: #b9cbc6;
  --gpt-border-strong: #9fb7b0;
  --gpt-text: #0f2836;
  --gpt-muted: #4a606b;
  --gpt-accent: #0f766e;
  --gpt-accent-strong: #0b5f58;
  --gpt-user: #0f766e;
  --gpt-user-strong: #0d6c64;
  --gpt-shadow: 0 18px 36px rgba(15, 33, 44, 0.12);
  font-family: "Manrope", "Avenir Next", "Segoe UI", sans-serif;
  width: 100vw;
  width: 100dvw;
  max-width: 100dvw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  margin-left: calc(50% - 50dvw);
  margin-right: calc(50% - 50dvw);
  padding: 0;
  min-height: var(--ai-gpt-available-height);
  height: auto;
  border-radius: 0;
  background:
    radial-gradient(840px 420px at -10% -12%, rgba(15, 118, 110, 0.19), transparent 70%),
    radial-gradient(660px 360px at 110% -10%, rgba(18, 74, 108, 0.16), transparent 70%),
    linear-gradient(180deg, #f2f7f6 0%, #e6efec 100%);
  box-shadow:
    var(--gpt-shadow),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  left: auto;
  transform: none;
  overflow: visible;
  overflow-x: clip;
}

.ai-section.ai-gpt::before {
  opacity: 0.26;
  background:
    radial-gradient(circle at 16% 18%, rgba(255, 255, 255, 0.8), transparent 62%),
    repeating-linear-gradient(
      132deg,
      rgba(15, 118, 110, 0.04) 0 16px,
      rgba(15, 118, 110, 0) 16px 34px
    );
}

.ai-section.ai-gpt .ai-gpt-shell {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(300px, 360px) minmax(0, 1fr);
  min-height: 100%;
  height: auto;
}

.ai-section.ai-gpt .ai-gpt-sidebar {
  background: linear-gradient(180deg, #dbe8e4 0%, #d3e1dd 100%);
  padding: 1.08rem 0.96rem;
  display: flex;
  flex-direction: column;
  gap: 0.84rem;
  box-shadow:
    inset -1px 0 0 rgba(95, 123, 116, 0.2),
    10px 0 22px rgba(15, 45, 52, 0.06);
}

.ai-section.ai-gpt .ai-gpt-sidebar-top {
  display: flex;
  justify-content: flex-end;
}

.ai-section.ai-gpt .ai-gpt-sidebar-toggle {
  border: none;
  border-radius: 9px;
  width: 28px;
  height: 28px;
  background: #ffffff;
  color: #274756;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  box-shadow: 0 4px 12px rgba(18, 52, 66, 0.12);
  transition: box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.ai-section.ai-gpt .ai-gpt-sidebar-toggle:hover {
  background: #ebf6f2;
  color: #123847;
  box-shadow: 0 8px 16px rgba(15, 93, 85, 0.22);
}

.ai-section.ai-gpt .ai-gpt-shell.is-sidebar-collapsed {
  grid-template-columns: 74px minmax(0, 1fr);
}

.ai-section.ai-gpt .ai-gpt-shell.is-sidebar-collapsed .ai-gpt-sidebar {
  padding: 0.8rem 0.45rem;
}

.ai-section.ai-gpt .ai-gpt-shell.is-sidebar-collapsed .ai-gpt-sidebar-top {
  justify-content: center;
}

.ai-section.ai-gpt .ai-gpt-shell.is-sidebar-collapsed .ai-gpt-sidebar-head,
.ai-section.ai-gpt .ai-gpt-shell.is-sidebar-collapsed .ai-gpt-session-list,
.ai-section.ai-gpt .ai-gpt-shell.is-sidebar-collapsed .ai-gpt-inline-alert,
.ai-section.ai-gpt .ai-gpt-shell.is-sidebar-collapsed .ai-gpt-sidebar-btn span,
.ai-section.ai-gpt .ai-gpt-shell.is-sidebar-collapsed .ai-gpt-new-chat span {
  display: none;
}

.ai-section.ai-gpt .ai-gpt-shell.is-sidebar-collapsed .ai-gpt-new-chat,
.ai-section.ai-gpt .ai-gpt-shell.is-sidebar-collapsed .ai-gpt-sidebar-btn {
  padding: 0.62rem 0.5rem;
  justify-content: center;
}

.ai-section.ai-gpt .ai-gpt-new-chat,
.ai-section.ai-gpt .ai-gpt-sidebar-btn {
  border: none;
  border-radius: 12px;
  padding: 0.6rem 0.78rem;
  font-size: 0.82rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.ai-section.ai-gpt .ai-gpt-new-chat {
  background: linear-gradient(140deg, var(--gpt-accent) 0%, #17887f 100%);
  color: #ffffff;
  box-shadow: 0 10px 20px rgba(15, 118, 110, 0.26);
}

.ai-section.ai-gpt .ai-gpt-new-chat:hover:not(:disabled) {
  transform: translateY(-1px);
  background: linear-gradient(140deg, var(--gpt-accent-strong) 0%, #12766f 100%);
}

.ai-section.ai-gpt .ai-gpt-sidebar-btn {
  background: #ffffff;
  color: #1f4453;
  box-shadow:
    0 7px 14px rgba(15, 42, 54, 0.08),
    inset 0 0 0 1px rgba(127, 157, 148, 0.22);
}

.ai-section.ai-gpt .ai-gpt-sidebar-btn:hover:not(:disabled) {
  background: #edf7f4;
  box-shadow:
    0 10px 18px rgba(15, 93, 85, 0.14),
    inset 0 0 0 1px rgba(126, 165, 154, 0.34);
}

.ai-section.ai-gpt .ai-gpt-sidebar-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-bottom: 0.36rem;
  box-shadow: inset 0 -1px 0 rgba(112, 140, 133, 0.35);
}

.ai-section.ai-gpt .ai-gpt-sidebar-head p {
  font-size: 0.8rem;
  letter-spacing: 0.075em;
  text-transform: uppercase;
  color: #224355;
  font-weight: 800;
}

.ai-section.ai-gpt .ai-gpt-clear-all {
  border: none;
  background: transparent;
  color: #345564;
  font-size: 0.76rem;
  font-weight: 700;
  padding: 0.12rem 0.2rem;
}

.ai-section.ai-gpt .ai-gpt-clear-all:hover:not(:disabled) {
  color: #143d4d;
}

.ai-section.ai-gpt .ai-gpt-clear-all:disabled {
  opacity: 0.48;
  cursor: not-allowed;
}

.ai-section.ai-gpt .ai-gpt-session-list {
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
  overflow-y: auto;
  min-height: 120px;
  max-height: 48vh;
  padding-right: 0.1rem;
  margin-top: 0.12rem;
}

.ai-section.ai-gpt .ai-gpt-session-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: stretch;
  gap: 0.3rem;
}

.ai-section.ai-gpt .ai-gpt-session-item {
  border: none;
  border-radius: 11px;
  background: #ffffff;
  text-align: left;
  padding: 0.62rem 0.66rem;
  display: flex;
  flex-direction: column;
  gap: 0.24rem;
  box-shadow:
    0 6px 14px rgba(15, 42, 54, 0.08),
    inset 0 0 0 1px rgba(132, 160, 151, 0.2);
  transition: box-shadow 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.ai-section.ai-gpt .ai-gpt-session-item:hover {
  background: #eef7f4;
  transform: translateY(-1px);
  box-shadow:
    0 10px 20px rgba(15, 93, 85, 0.14),
    inset 0 0 0 1px rgba(126, 165, 154, 0.34);
}

.ai-section.ai-gpt .ai-gpt-session-item.is-active {
  background: linear-gradient(180deg, #dff4ee 0%, #d5eee7 100%);
  box-shadow:
    0 12px 22px rgba(15, 118, 110, 0.18),
    inset 0 0 0 1px rgba(15, 118, 110, 0.26);
}

.ai-section.ai-gpt .ai-gpt-session-delete {
  border: none;
  border-radius: 11px;
  background: #ffffff;
  color: #3f5d6c;
  width: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  box-shadow:
    0 6px 12px rgba(15, 42, 54, 0.08),
    inset 0 0 0 1px rgba(132, 160, 151, 0.2);
  transition: box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.ai-section.ai-gpt .ai-gpt-session-delete:hover {
  background: #fff4f5;
  color: #8a212d;
  box-shadow:
    0 8px 16px rgba(194, 24, 38, 0.18),
    inset 0 0 0 1px rgba(194, 24, 38, 0.24);
}

.ai-section.ai-gpt .ai-gpt-session-title {
  color: #173746;
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1.35;
}

.ai-section.ai-gpt .ai-gpt-session-time {
  color: #4e6773;
  font-size: 0.7rem;
}

.ai-section.ai-gpt .ai-gpt-session-empty {
  color: #49626f;
  font-size: 0.82rem;
  border: none;
  border-radius: 11px;
  padding: 0.58rem;
  background: rgba(255, 255, 255, 0.8);
  box-shadow:
    0 6px 14px rgba(15, 42, 54, 0.06),
    inset 0 0 0 1px rgba(132, 160, 151, 0.26);
}

.ai-section.ai-gpt .ai-gpt-inline-alert {
  border: none;
  border-radius: 11px;
  background: #ffffff;
  padding: 0.5rem 0.58rem;
  color: #244655;
  font-size: 0.76rem;
  display: flex;
  flex-direction: column;
  gap: 0.44rem;
  box-shadow:
    0 6px 14px rgba(15, 42, 54, 0.08),
    inset 0 0 0 1px rgba(132, 160, 151, 0.2);
}

.ai-section.ai-gpt .ai-gpt-inline-alert--warn {
  background: #fff7f8;
  color: #7a2630;
  box-shadow:
    0 8px 16px rgba(194, 24, 38, 0.14),
    inset 0 0 0 1px rgba(194, 24, 38, 0.22);
}

.ai-section.ai-gpt .ai-gpt-inline-actions {
  display: flex;
  gap: 0.4rem;
}

.ai-section.ai-gpt .ai-gpt-inline-actions button {
  border: none;
  background: #ffffff;
  border-radius: 8px;
  padding: 0.24rem 0.44rem;
  font-size: 0.72rem;
  color: #1f4453;
  font-weight: 700;
  box-shadow:
    0 5px 10px rgba(15, 42, 54, 0.08),
    inset 0 0 0 1px rgba(132, 160, 151, 0.2);
}

.ai-section.ai-gpt .ai-gpt-inline-actions .ai-gpt-danger {
  color: #8a212d;
  background: #fff4f5;
  box-shadow:
    0 6px 12px rgba(194, 24, 38, 0.14),
    inset 0 0 0 1px rgba(194, 24, 38, 0.22);
}

.ai-section.ai-gpt .ai-gpt-sidebar-foot {
  margin-top: auto;
}

.ai-section.ai-gpt .ai-gpt-main {
  padding: 1.08rem 1.08rem 0.2rem;
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr) auto;
  gap: 0.82rem;
  height: auto;
  min-width: 0;
  background: rgba(249, 252, 251, 0.7);
}

.ai-section.ai-gpt .ai-gpt-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 0.86rem;
  border: none;
  border-radius: 14px;
  background: linear-gradient(180deg, #ffffff 0%, #f4f8f7 100%);
  box-shadow:
    0 10px 22px rgba(15, 42, 54, 0.1),
    inset 0 0 0 1px rgba(132, 160, 151, 0.2);
}

.ai-section.ai-gpt .ai-gpt-brand {
  display: flex;
  align-items: center;
  gap: 0.68rem;
  min-width: 0;
}

.ai-section.ai-gpt .ai-gpt-brand-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(145deg, var(--gpt-accent) 0%, #17887f 100%);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(15, 118, 110, 0.24);
}

.ai-section.ai-gpt .ai-gpt-brand h2 {
  margin: 0;
  color: #102c3b;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.ai-section.ai-gpt .ai-gpt-brand p {
  margin: 0.1rem 0 0;
  color: #4a616d;
  font-size: 0.86rem;
}

.ai-section.ai-gpt .ai-gpt-trust-btn {
  border: none;
  border-radius: 10px;
  background: #ffffff;
  color: #173f4f;
  font-size: 0.79rem;
  font-weight: 700;
  padding: 0.45rem 0.62rem;
  white-space: nowrap;
  box-shadow:
    0 6px 14px rgba(15, 42, 54, 0.1),
    inset 0 0 0 1px rgba(132, 160, 151, 0.22);
}

.ai-section.ai-gpt .ai-gpt-trust-btn:hover {
  background: #edf7f4;
  box-shadow:
    0 9px 18px rgba(15, 93, 85, 0.16),
    inset 0 0 0 1px rgba(126, 165, 154, 0.32);
}

.ai-section.ai-gpt .ai-copy-notice,
.ai-section.ai-gpt .ai-error-banner {
  margin: 0;
  border-radius: 12px;
}

.ai-section.ai-gpt .ai-gpt-conversation {
  border: none;
  border-radius: 16px;
  background: linear-gradient(180deg, #ffffff 0%, #f4f8f7 100%);
  overflow-y: auto;
  min-height: clamp(260px, 44vh, 680px);
  height: auto;
  max-height: max(320px, calc(var(--ai-gpt-available-height) - 210px));
  box-shadow:
    0 12px 26px rgba(15, 42, 54, 0.1),
    inset 0 0 0 1px rgba(132, 160, 151, 0.2);
}

.ai-section.ai-gpt .ai-gpt-empty {
  max-width: 760px;
  margin: 1.2rem auto;
  padding: 0.75rem;
  text-align: center;
}

.ai-section.ai-gpt .ai-gpt-empty h3 {
  margin: 0;
  color: #123243;
  font-size: 1.28rem;
  font-weight: 700;
}

.ai-section.ai-gpt .ai-gpt-empty p {
  margin: 0.4rem 0 0;
  color: #4f6673;
  font-size: 0.95rem;
}

.ai-section.ai-gpt .ai-gpt-prompt-grid {
  margin-top: 0.94rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.55rem;
}

.ai-section.ai-gpt .ai-gpt-prompt-card {
  border: none;
  border-radius: 12px;
  padding: 0.66rem;
  background: #ffffff;
  text-align: left;
  box-shadow:
    0 7px 14px rgba(15, 42, 54, 0.08),
    inset 0 0 0 1px rgba(132, 160, 151, 0.2);
  transition: box-shadow 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.ai-section.ai-gpt .ai-gpt-prompt-card:hover:not(:disabled) {
  background: #edf7f4;
  transform: translateY(-1px);
  box-shadow:
    0 11px 20px rgba(15, 93, 85, 0.14),
    inset 0 0 0 1px rgba(15, 118, 110, 0.26);
}

.ai-section.ai-gpt .ai-gpt-prompt-label {
  display: block;
  color: #1d4658;
  font-size: 0.67rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
}

.ai-section.ai-gpt .ai-gpt-prompt-text {
  display: block;
  margin-top: 0.28rem;
  color: #173a4b;
  font-size: 0.85rem;
  line-height: 1.42;
}

.ai-section.ai-gpt .ai-gpt-messages {
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
  padding: 1rem 1.02rem 1.12rem;
}

.ai-section.ai-gpt .ai-gpt-message-row {
  display: flex;
  align-items: flex-start;
  gap: 0.72rem;
}

.ai-section.ai-gpt .ai-gpt-message-row.user {
  justify-content: flex-end;
}

.ai-section.ai-gpt .ai-gpt-message-row.user .ai-gpt-avatar {
  order: 2;
}

.ai-section.ai-gpt .ai-gpt-message-row.user .ai-gpt-message-block {
  order: 1;
  align-items: flex-end;
  max-width: min(96%, 1140px);
}

.ai-section.ai-gpt .ai-gpt-avatar {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: #e6f1ee;
  border: none;
  color: #2b5968;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  flex: 0 0 auto;
  box-shadow:
    0 5px 12px rgba(15, 42, 54, 0.1),
    inset 0 0 0 1px rgba(132, 160, 151, 0.2);
}

.ai-section.ai-gpt .ai-gpt-message-row.user .ai-gpt-avatar {
  background: #ecf4ff;
  box-shadow:
    0 5px 12px rgba(34, 70, 104, 0.14),
    inset 0 0 0 1px rgba(149, 178, 205, 0.28);
  color: #2b5470;
}

.ai-section.ai-gpt .ai-gpt-message-block {
  max-width: min(94%, 1080px);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
}

.ai-section.ai-gpt .ai-gpt-message-meta {
  display: flex;
  align-items: center;
  gap: 0.46rem;
  color: #47626f;
  font-size: 0.74rem;
}

.ai-section.ai-gpt .ai-gpt-author {
  color: #173b4a;
  font-weight: 700;
}

.ai-section.ai-gpt .ai-gpt-time {
  color: #506a76;
  font-weight: 600;
}

.ai-section.ai-gpt .ai-gpt-message-body {
  border: none;
  border-radius: 14px;
  background: #ffffff;
  color: #102d3d;
  padding: 0.82rem;
  line-height: 1.62;
  font-size: 0.95rem;
  box-shadow:
    0 10px 22px rgba(15, 42, 54, 0.1),
    inset 0 0 0 1px rgba(132, 160, 151, 0.22);
}

.ai-section.ai-gpt .ai-gpt-message-body.user {
  background: linear-gradient(145deg, #2db28a 0%, #1f9f78 58%, #188a69 100%);
  box-shadow: 0 10px 20px rgba(22, 114, 88, 0.28);
  color: #ffffff;
}

.ai-section.ai-gpt .ai-gpt-message-body p {
  margin-bottom: 0.5rem;
}

.ai-section.ai-gpt .ai-gpt-message-body p:last-child {
  margin-bottom: 0;
}

.ai-section.ai-gpt .ai-gpt-message-body.user p {
  color: #ffffff;
}

.ai-section.ai-gpt .ai-gpt-message-body.user * {
  color: #ffffff !important;
}

.ai-section.ai-gpt .ai-gpt-answer-section + .ai-gpt-answer-section {
  margin-top: 0.64rem;
  padding-top: 0.64rem;
  box-shadow: inset 0 1px 0 rgba(132, 160, 151, 0.24);
}

.ai-section.ai-gpt .ai-gpt-answer-title {
  margin: 0 0 0.34rem;
  color: #1d495a;
  font-size: 0.71rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.ai-section.ai-gpt .ai-gpt-answer-copy p {
  margin-bottom: 0.46rem;
}

.ai-section.ai-gpt .ai-gpt-answer-copy p:last-child {
  margin-bottom: 0;
}

.ai-section.ai-gpt .ai-gpt-message-body ul,
.ai-section.ai-gpt .ai-gpt-message-body ol {
  margin: 0.15rem 0 0.5rem 1.05rem;
  padding: 0;
}

.ai-section.ai-gpt .ai-gpt-message-body li {
  margin-bottom: 0.24rem;
}

.ai-section.ai-gpt .ai-gpt-message-body li:last-child {
  margin-bottom: 0;
}

.ai-section.ai-gpt .chat-verification {
  border-radius: 999px;
  width: fit-content;
  font-size: 0.7rem;
  padding: 0.16rem 0.48rem;
  font-weight: 700;
}

.ai-section.ai-gpt .chat-references-wrapper {
  margin-top: 0.12rem;
  border: none;
  border-radius: 11px;
  background: #f7fbfa;
  padding: 0.52rem;
  box-shadow:
    0 7px 14px rgba(15, 42, 54, 0.08),
    inset 0 0 0 1px rgba(132, 160, 151, 0.2);
}

.ai-section.ai-gpt .chat-references {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.32rem;
}

.ai-section.ai-gpt .chat-references li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.79rem;
}

.ai-section.ai-gpt .chat-reference-main a {
  color: #0d4e73;
  text-decoration-color: rgba(13, 78, 115, 0.34);
  text-underline-offset: 2px;
}

.ai-section.ai-gpt .chat-reference-badges {
  display: inline-flex;
  align-items: center;
  gap: 0.26rem;
}

.ai-section.ai-gpt .chat-reference-badge {
  font-size: 0.64rem;
  border-radius: 999px;
  padding: 0.1rem 0.42rem;
  border: none;
  background: #edf4f2;
  color: #284a5a;
  font-weight: 700;
  box-shadow:
    0 2px 6px rgba(15, 42, 54, 0.08),
    inset 0 0 0 1px rgba(132, 160, 151, 0.2);
}

.ai-section.ai-gpt .chat-reference-badge--official {
  background: rgba(15, 118, 110, 0.12);
  box-shadow:
    0 2px 6px rgba(15, 118, 110, 0.1),
    inset 0 0 0 1px rgba(15, 118, 110, 0.26);
  color: #0f5f58;
}

.ai-section.ai-gpt .chat-reference-badge--verified {
  background: rgba(14, 92, 140, 0.11);
  box-shadow:
    0 2px 6px rgba(14, 92, 140, 0.1),
    inset 0 0 0 1px rgba(14, 92, 140, 0.25);
  color: #0c537d;
}

.ai-section.ai-gpt .chat-reference-badge--aggregated,
.ai-section.ai-gpt .chat-reference-badge--ungraded {
  background: rgba(88, 112, 138, 0.1);
  box-shadow:
    0 2px 6px rgba(88, 112, 138, 0.1),
    inset 0 0 0 1px rgba(88, 112, 138, 0.24);
  color: #425870;
}

.ai-section.ai-gpt .chat-reference-badge--sahih {
  background: rgba(21, 128, 61, 0.12);
  box-shadow:
    0 2px 6px rgba(21, 128, 61, 0.1),
    inset 0 0 0 1px rgba(21, 128, 61, 0.26);
  color: #14532d;
}

.ai-section.ai-gpt .chat-reference-badge--hasan {
  background: rgba(202, 138, 4, 0.14);
  box-shadow:
    0 2px 6px rgba(202, 138, 4, 0.1),
    inset 0 0 0 1px rgba(202, 138, 4, 0.28);
  color: #7a4700;
}

.ai-section.ai-gpt .chat-reference-badge--daif {
  background: rgba(194, 24, 38, 0.12);
  box-shadow:
    0 2px 6px rgba(194, 24, 38, 0.1),
    inset 0 0 0 1px rgba(194, 24, 38, 0.24);
  color: #8a1823;
}

.ai-section.ai-gpt .ai-gpt-message-body--typing {
  box-shadow:
    0 10px 22px rgba(15, 42, 54, 0.1),
    inset 0 0 0 1px rgba(132, 160, 151, 0.24);
}

.ai-section.ai-gpt .chat-typing-dot {
  width: 0.34rem;
  height: 0.34rem;
  border-radius: 999px;
  background: #3a7f78;
  display: inline-block;
  animation: ai-gpt-typing 1.2s infinite ease-in-out;
}

.ai-section.ai-gpt .chat-typing-dot:nth-child(2) {
  animation-delay: 0.15s;
}

.ai-section.ai-gpt .chat-typing-dot:nth-child(3) {
  animation-delay: 0.3s;
}

.ai-section.ai-gpt .chat-typing-text {
  margin-left: 0.35rem;
  color: #486674;
  font-size: 0.82rem;
}

@keyframes ai-gpt-typing {
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 0.45;
  }
  40% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

.ai-section.ai-gpt .ai-gpt-composer {
  border: none;
  border-radius: 0;
  background: transparent;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  box-shadow: none;
}

.ai-section.ai-gpt .ai-gpt-input-wrap {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 0.28rem;
  align-items: center;
  padding: 0.34rem 0.42rem;
  border-radius: 999px;
  background: #ffffff;
  box-shadow:
    0 10px 20px rgba(15, 42, 54, 0.14),
    inset 0 0 0 1px rgba(146, 170, 161, 0.22);
}

.ai-section.ai-gpt .ai-gpt-pill-btn {
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: transparent;
  color: #4c6775;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.ai-section.ai-gpt .ai-gpt-pill-btn:hover:not(:disabled) {
  background: #edf4f1;
  color: #173f4f;
  transform: translateY(-1px);
}

.ai-section.ai-gpt .ai-gpt-pill-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.ai-section.ai-gpt .ai-gpt-pill-btn--mic.is-active {
  background: rgba(34, 197, 94, 0.22);
  color: #d8ffe6;
}

.ai-section.ai-gpt .ai-gpt-textarea {
  border: none;
  border-radius: 0;
  min-height: 42px;
  max-height: 108px;
  padding: 0.46rem 0.34rem;
  resize: none;
  font-size: 0.88rem;
  line-height: 1.25;
  color: #173443;
  background: transparent;
  box-shadow: none;
  display: block;
}

.ai-section.ai-gpt .ai-gpt-textarea:focus {
  outline: none;
  box-shadow: none;
}

.ai-section.ai-gpt .ai-gpt-textarea::placeholder {
  color: #7b8f9c;
  opacity: 1;
}

.ai-section.ai-gpt .ai-gpt-send {
  border: none;
  border-radius: 999px;
  width: 46px;
  height: 46px;
  min-width: 46px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(140deg, var(--gpt-accent) 0%, #17887f 100%);
  box-shadow:
    0 8px 16px rgba(15, 118, 110, 0.28),
    inset 0 0 0 1px rgba(255, 255, 255, 0.18);
}

.ai-section.ai-gpt .ai-gpt-send:hover:not(:disabled) {
  background: linear-gradient(140deg, var(--gpt-accent-strong) 0%, #12766f 100%);
}

.ai-section.ai-gpt .ai-gpt-send:disabled,
.ai-section.ai-gpt .ai-gpt-new-chat:disabled,
.ai-section.ai-gpt .ai-gpt-sidebar-btn:disabled {
  opacity: 0.54;
  cursor: not-allowed;
  box-shadow: none;
}

.ai-section.ai-gpt .ai-disclaimer-modal-backdrop {
  background: rgba(8, 23, 36, 0.56);
  backdrop-filter: blur(4px);
}

.ai-section.ai-gpt .ai-disclaimer-modal-card {
  border: none;
  background: linear-gradient(180deg, #ffffff 0%, #f8fcfb 100%);
  border-radius: 16px;
  box-shadow:
    0 24px 56px rgba(8, 23, 36, 0.22),
    inset 0 0 0 1px rgba(132, 160, 151, 0.2);
}

.ai-section.ai-gpt .ai-disclaimer-modal-head {
  box-shadow: inset 0 -1px 0 rgba(132, 160, 151, 0.24);
}

.ai-section.ai-gpt .ai-disclaimer-modal-head h3 {
  color: #1f3947;
  font-weight: 700;
}

.ai-section.ai-gpt .ai-disclaimer-close,
.ai-section.ai-gpt .ai-disclaimer-close-btn {
  border-radius: 10px;
}

.ai-section.ai-gpt .ai-disclaimer-close-btn {
  border: none;
  color: #ffffff;
  background: linear-gradient(140deg, var(--gpt-accent) 0%, #17887f 100%);
}

@media (max-width: 980px) {
  .ai-section.ai-gpt .ai-gpt-shell {
    grid-template-columns: minmax(248px, 42vw) minmax(0, 1fr);
    min-height: 100%;
  }

  .ai-section.ai-gpt .ai-gpt-sidebar {
    padding: 0.82rem 0.7rem;
    gap: 0.56rem;
  }

  .ai-section.ai-gpt .ai-gpt-session-list {
    max-height: calc(var(--ai-gpt-available-height) - 240px);
  }

  .ai-section.ai-gpt .ai-gpt-main {
    padding: 0.78rem 0.78rem 0.16rem;
    min-height: 100%;
  }

  .ai-section.ai-gpt .ai-gpt-shell.is-sidebar-collapsed {
    grid-template-columns: 64px minmax(0, 1fr);
  }

  .ai-section.ai-gpt .ai-gpt-shell.is-sidebar-collapsed .ai-gpt-sidebar {
    padding: 0.72rem 0.36rem;
  }

  .ai-section.ai-gpt .ai-gpt-prompt-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .ai-section.ai-gpt .ai-gpt-brand-icon {
    display: none;
  }

  .ai-section.ai-gpt .ai-gpt-topbar {
    padding: 0.62rem 0.7rem;
    border-radius: 12px;
  }

  .ai-section.ai-gpt .ai-gpt-brand {
    align-items: flex-start;
    gap: 0.5rem;
  }

  .ai-section.ai-gpt .ai-gpt-brand h2 {
    font-size: 0.98rem;
    line-height: 1.22;
  }

  .ai-section.ai-gpt .ai-gpt-brand p {
    margin-top: 0.14rem;
    font-size: 0.79rem;
    line-height: 1.4;
  }

  .ai-section.ai-gpt .ai-gpt-trust-btn {
    min-height: 38px;
    font-size: 0.76rem;
    padding: 0.44rem 0.54rem;
  }

  .ai-section.ai-gpt .ai-gpt-messages {
    padding: 0.82rem 0.84rem calc(1rem + env(safe-area-inset-bottom));
  }
}

@media (max-width: 640px) {
  .ai-section.ai-gpt {
    width: 100vw;
    width: 100dvw;
    max-width: 100dvw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    margin-left: calc(50% - 50dvw);
    margin-right: calc(50% - 50dvw);
    border-radius: 0;
  }

  .ai-section.ai-gpt .ai-gpt-shell {
    grid-template-columns: minmax(244px, 84vw) minmax(0, 1fr);
  }

  .ai-section.ai-gpt .ai-gpt-shell.is-sidebar-collapsed {
    grid-template-columns: 52px minmax(0, 1fr);
  }

  .ai-section.ai-gpt .ai-gpt-shell.is-sidebar-collapsed .ai-gpt-sidebar {
    padding: 0.58rem 0.24rem;
  }

  .ai-section.ai-gpt .ai-gpt-sidebar-toggle {
    width: 32px;
    height: 32px;
    font-size: 0.82rem;
  }

  .ai-section.ai-gpt .ai-gpt-main {
    padding: 0.52rem 0.52rem calc(0.18rem + env(safe-area-inset-bottom));
    gap: 0.58rem;
  }

  .ai-section.ai-gpt .ai-gpt-conversation {
    min-height: 220px;
    max-height: max(240px, calc(var(--ai-gpt-available-height) - 180px));
  }

  .ai-section.ai-gpt .ai-gpt-topbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.44rem;
    padding: 0.54rem 0.58rem;
    border-radius: 12px;
  }

  .ai-section.ai-gpt .ai-gpt-brand {
    gap: 0.36rem;
  }

  .ai-section.ai-gpt .ai-gpt-brand-icon {
    display: none;
  }

  .ai-section.ai-gpt .ai-gpt-brand h2 {
    font-size: 1rem;
    line-height: 1.2;
  }

  .ai-section.ai-gpt .ai-gpt-brand p {
    margin-top: 0.18rem;
    font-size: 0.8rem;
  }

  .ai-section.ai-gpt .ai-gpt-trust-btn {
    width: 100%;
    text-align: center;
    min-height: 38px;
    font-size: 0.76rem;
    padding: 0.42rem 0.52rem;
  }

  .ai-section.ai-gpt .ai-gpt-empty {
    margin: 0.34rem auto;
    padding: 0.52rem;
  }

  .ai-section.ai-gpt .ai-gpt-empty h3 {
    font-size: 1.04rem;
  }

  .ai-section.ai-gpt .ai-gpt-empty p {
    margin-top: 0.28rem;
    font-size: 0.84rem;
  }

  .ai-section.ai-gpt .ai-gpt-prompt-card {
    padding: 0.56rem;
  }

  .ai-section.ai-gpt .ai-gpt-messages {
    gap: 0.68rem;
    padding: 0.62rem 0.66rem 0.78rem;
  }

  .ai-section.ai-gpt .ai-gpt-message-row {
    gap: 0.54rem;
  }

  .ai-section.ai-gpt .ai-gpt-avatar {
    width: 26px;
    height: 26px;
    border-radius: 8px;
    font-size: 0.72rem;
  }

  .ai-section.ai-gpt .ai-gpt-message-block {
    max-width: 100%;
  }

  .ai-section.ai-gpt .ai-gpt-message-body {
    border-radius: 12px;
    padding: 0.64rem;
    font-size: 0.9rem;
    line-height: 1.55;
  }

  .ai-section.ai-gpt .ai-gpt-answer-section + .ai-gpt-answer-section {
    margin-top: 0.52rem;
    padding-top: 0.52rem;
  }

  .ai-section.ai-gpt .ai-gpt-answer-title {
    margin-bottom: 0.26rem;
    font-size: 0.66rem;
  }

  .ai-section.ai-gpt .chat-references-wrapper {
    padding: 0.46rem;
  }

  .ai-section.ai-gpt .ai-gpt-composer {
    position: sticky;
    bottom: 0;
    z-index: 3;
    padding-top: 0.16rem;
    padding-bottom: calc(0.16rem + env(safe-area-inset-bottom));
    background: linear-gradient(180deg, rgba(249, 252, 251, 0) 0%, rgba(249, 252, 251, 0.92) 24%, rgba(249, 252, 251, 0.99) 100%);
  }

  .ai-section.ai-gpt .ai-gpt-input-wrap {
    grid-template-columns: minmax(0, 1fr) auto auto;
    gap: 0.18rem;
    padding: 0.24rem 0.32rem;
  }

  .ai-section.ai-gpt .ai-gpt-pill-btn {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }

  .ai-section.ai-gpt .ai-gpt-textarea {
    min-height: 38px;
    max-height: 96px;
    padding: 0.36rem 0.28rem;
    font-size: 0.82rem;
  }

  .ai-section.ai-gpt .ai-gpt-textarea::placeholder {
    font-size: 0.82rem;
  }

  .ai-section.ai-gpt .ai-gpt-send {
    width: 38px;
    height: 38px;
    min-width: 38px;
    padding: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ai-section.ai-gpt *,
  .ai-section.ai-gpt *::before,
  .ai-section.ai-gpt *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
</style>
