<template>
  <section class="ai-section" ref="aiRoot" aria-label="Islamic chatbot">
    <div class="ai-panel">
      <div class="ai-welcome" aria-live="polite">
        <div class="ai-welcome-icon " aria-hidden="true">
          <i class="fas fa-star-and-crescent " aria-hidden="true"></i>
        </div>
        <div class="ai-welcome-text pt-2">
          <h2 class="fw-bold ">Introducing Noor, Your AI Companion</h2>
          <p class="container ai-welcome-copy">
            Noor listens first, then gently responds with Quran rooted insight and prophetic kindness so every exchange
            feels like encouragement from a trusted companion. Ask for dua ideas, reminders, or reflections tuned to
            your day.
          </p>
        </div>
      </div>

      <div class="ai-controls" role="toolbar" aria-label="Chat controls">
        <button v-if="hasAssistantResponse" type="button" class="ai-control-btn ai-control-btn--primary"
          @click="startNewChat" :disabled="!isNewChatAvailable">
          <i class="fas fa-plus-circle" aria-hidden="true"></i> New chat
        </button>
        <button type="button" class="ai-control-btn" :disabled="!chatHistory.length" @click="clearHistory">
          <i class="fas fa-trash-alt" aria-hidden="true"></i> Clear history
        </button>
        <button type="button" class="ai-control-btn ai-control-btn--whatsapp" :disabled="!chatHistory.length"
          @click="shareConversationOnWhatsApp">
          <i class="fab fa-whatsapp" aria-hidden="true"></i> Share Full Convo
        </button>
        <button type="button" class="ai-control-btn ai-control-btn--copy" :disabled="!chatHistory.length"
          @click="copyConversationToClipboard">
          <i class="fas fa-copy" aria-hidden="true"></i> Copy Full Convo
        </button>
        <button type="button" class="ai-control-btn ai-session-inline__button" :disabled="!chatSessions.length"
          @click="toggleSessionDropdown" aria-haspopup="listbox"
          :aria-expanded="sessionDropdownOpen ? 'true' : 'false'">
          <i class="fas fa-clipboard-list" aria-hidden="true"></i>
          <span>
            {{ chatSessions.length ? `Saved chats (${chatSessions.length})` : 'No saved chats yet' }}
          </span>
        </button>
      </div>
      <div class="ai-session-inline">
        <div v-if="sessionDropdownOpen" class="ai-session-inline__dropdown" role="listbox" aria-label="Recent chats">
          <button v-if="chatSessions.length" type="button" class="ai-session-inline__clear-all"
            @click.stop.prevent="prepareClearAllSessions">
            <i class="fas fa-trash-alt me-1" aria-hidden="true"></i>
            Remove all saved chats
          </button>
          <div v-if="pendingClearAll" class="ai-session-inline__alert ai-session-inline__alert--danger" role="alert">
            <span class="m-0">Delete all saved chats?</span>
            <div>
              <button type="button" class="ai-session-inline__action-btn"
                @click.stop="cancelPendingClearAll">Cancel</button>
              <button type="button" class="ai-session-inline__action-btn ai-session-inline__action-btn--danger"
                @click.stop="doClearAllSessions">Delete</button>
            </div>
          </div>
          <div v-for="session in chatSessions" :key="session.id"
            class="ai-session-inline__dropdown-item" role="option" tabindex="0"
            @click="selectSessionFromList(session.id)"
            @keydown.enter.prevent="selectSessionFromList(session.id)">
            <span>{{ formatSessionLabel(session) }}</span>
            <small>{{ formatSessionTimestamp(session.updatedAt) }}</small>
            <button type="button" class="ai-session-inline__dropdown-remove"
              @click.stop="prepareDeleteSession(session.id)"
              @keydown.enter.stop.prevent="prepareDeleteSession(session.id)"
              aria-label="Delete this saved chat">
              <i class="fas fa-times" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div v-if="pendingDeleteSessionId" class="ai-session-inline__alert ai-session-inline__alert--warning"
          role="alert">
          <span class="m-0">Delete “{{ pendingDeleteSessionLabel }}”?</span>
          <div>
            <button type="button" class="ai-session-inline__action-btn"
              @click.stop="cancelPendingDelete">Cancel</button>
            <button type="button" class="ai-session-inline__action-btn ai-session-inline__action-btn--warning"
              @click.stop="doDeleteSession">Delete</button>
          </div>
        </div>
      </div>
      <div v-if="copyNotice" class="ai-copy-notice" role="status" aria-live="polite">
        <i class="fas fa-check-circle me-1" aria-hidden="true"></i>
        {{ copyNotice }}
      </div>

      <div v-if="chatError" class="ai-error-banner" role="alert" aria-live="assertive" aria-atomic="true">
        <i class="fas fa-exclamation-triangle ai-error-icon" aria-hidden="true"></i>
        <div>
          <p class="ai-error-title text-left">Need some redirection?</p>
          <p class="ai-error-message">{{ chatError }}</p>
          <button v-if="sessionExpired" type="button" class="ai-error-clear" @click="reloadPage">
            Reload page
          </button>
        </div>
      </div>

      <div v-if="chatHistory.length" ref="chatShell" class="ai-chat-shell">
        <div class="ai-metadata">
          <div v-if="chatLoading && !chatHistory.length" class="ai-loading-indicator" role="status" aria-live="polite">
            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <p class="mb-0 fw-semibold">Assistant is consulting trusted sources...</p>
          </div>
        </div>
        <div ref="chatWindow" class="ai-chat-window" role="log" aria-live="polite">
          <article v-for="(entry, idx) in chatHistory" :key="`chat-${idx}-${entry.role}`"
            :class="['chat-entry', entry.role]">
            <div class="chat-entry-header">
              <i :class="entry.role === 'assistant' ? 'fas fa-robot chat-icon' : 'fas fa-user chat-icon'"
                aria-hidden="true" title="Sender"></i>
              <span class="chat-role mr-2"><b>{{ entry.role === 'assistant' ? 'Assistant' : 'You' }}</b></span>
              <span class="chat-timestamp">{{ entry.displayTime }} · {{ entry.displayDate }}</span>
            </div>
            <div class="chat-bubble-container">
              <p v-if="entry.role === 'assistant'" class="chat-section-heading">Answer</p>
              <div :class="[
                'chat-bubble',
                entry.role,
                { 'chat-bubble--collapsed': entry.role === 'assistant' && entry.collapsed },
              ]" v-html="formatChatText(entry.text)"></div>
              <div v-if="entry.role === 'assistant'" class="chat-entry-actions">
                <button type="button" class="chat-share-btn" @click="shareEntryOnWhatsApp(entry)"
                  :aria-label="'Share this answer via WhatsApp'">
                  <i class="fab fa-whatsapp" aria-hidden="true"></i>
                  <span class="d-none d-md-inline ms-1">Share answer</span>
                </button>
                <button type="button" class="chat-copy-btn ms-2" @click="copyEntryToClipboard(entry)"
                  :aria-label="'Copy this answer'">
                  <i class="fas fa-copy" aria-hidden="true"></i>
                  <span class="d-none d-md-inline ms-1">Copy answer</span>
                </button>
                <div class="chat-voice-wrapper ms-2">
                  <button type="button" class="chat-voice-trigger" @click="toggleSpeechControls(entry)"
                    :aria-expanded="entry.speechControlsVisible ? 'true' : 'false'">
                    <i class="fas fa-volume-up" aria-hidden="true"></i>
                    <span class="visually-hidden">Read this answer aloud</span>
                  </button>
                  <div v-if="entry.speechControlsVisible" class="chat-voice-controls" role="group"
                    aria-label="Speech controls" aria-live="polite">
                    <button type="button" class="chat-voice-control-btn" @click="playEntrySpeech(entry)"
                      :disabled="entry.speechStatus === 'loading'" aria-label="Play answer">
                      <i class="fas fa-play" aria-hidden="true"></i>
                    </button>
                    <button type="button" class="chat-voice-control-btn" @click="pauseEntrySpeech(entry)"
                      :disabled="entry.speechStatus !== 'playing'" aria-label="Pause answer">
                      <i class="fas fa-pause" aria-hidden="true"></i>
                    </button>
                    <button type="button" class="chat-voice-control-btn" @click="stopEntrySpeech(entry)"
                      :disabled="entry.speechStatus === 'stopped'" aria-label="Stop answer">
                      <i class="fas fa-stop" aria-hidden="true"></i>
                    </button>
                    <span class="chat-voice-status" aria-live="polite">
                      {{ entry.speechStatus === 'loading' ? 'Preparing…' : entry.speechStatus }}
                    </span>
                  </div>
                </div>
              </div>
              <div v-if="entry.collapsed && entry.summaryBullets.length" class="chat-summary">
                <p class="chat-summary-title">
                  {{ entry.role === 'assistant' ? 'Quick summary' : 'Question snapshot' }}
                </p>
                <ul>
                  <li v-for="(bullet, bulletIndex) in entry.summaryBullets" :key="`summary-${idx}-${bulletIndex}`">
                    {{ bullet }}
                  </li>
                </ul>
              </div>
              <button v-if="entry.allowCollapse && isCompactMode" type="button" class="chat-collapse-toggle"
                @click="toggleEntryCollapse(entry)">
                <span v-if="entry.collapsed">
                  Show full {{ entry.role === 'assistant' ? 'response' : 'question' }}
                </span>
                <span v-else>
                  Collapse to {{ entry.role === 'assistant' ? 'summary' : 'preview' }}
                </span>
              </button>
              <div
                v-if="entry.role === 'assistant' && entry.verification"
                :class="['chat-verification', getVerificationBadgeClass(entry.verification)]"
                aria-live="polite">
                <i class="fas fa-check-circle" aria-hidden="true"></i>
                <span>{{ formatVerificationLabel(entry.verification) }}</span>
              </div>
              <div v-if="entry.references && entry.references.length" class="chat-references-wrapper"
                aria-label="Sources that informed this answer">
                <span class="chat-references-heading">Reference (Proof)</span>
                <ul class="chat-references" role="list">
                  <li v-for="(reference, refIndex) in entry.references"
                    :key="`ref-${idx}-${refIndex}-${reference.label}`">
                    <span class="chat-reference-main">
                      <template v-if="reference.url">
                        <a :href="reference.url" target="_blank" rel="noopener noreferrer">{{ reference.label }}</a>
                      </template>
                      <template v-else>
                        {{ reference.label }}
                      </template>
                    </span>
                    <span class="chat-reference-badges">
                      <span :class="['chat-reference-badge', getSourceBadgeClass(reference.sourceBadge)]">
                        {{ formatSourceBadge(reference.sourceBadge) }}
                      </span>
                      <span
                        v-if="reference.isHadith"
                        :class="['chat-reference-badge', 'chat-reference-badge--hadith', getHadithGradeBadgeClass(reference.hadithGrade)]">
                        {{ formatHadithGrade(reference.hadithGrade) }}
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </article>
          <article v-if="chatLoading" class="chat-entry assistant chat-entry--typing" aria-live="polite">
            <div class="chat-entry-header">
              <i class="fas fa-robot chat-icon" aria-hidden="true"></i>
              <span class="chat-role mr-2"><b>Noor</b></span>
              <span class="chat-timestamp">now</span>
            </div>
            <div class="chat-bubble-container">
              <div class="chat-bubble assistant chat-bubble--typing" role="status">
                <span class="chat-typing-dot"></span>
                <span class="chat-typing-dot"></span>
                <span class="chat-typing-dot"></span>
                <span class="chat-typing-text">Noor is typing...</span>
              </div>
            </div>
          </article>
        </div>
      </div>

      <form ref="aiForm" class="ai-form pt-3" @submit.prevent="sendChatMessage">
        <label class="visually-hidden" for="aiChatInput">Ask the chatbot</label>
        <textarea id="aiChatInput" ref="aiChatInput" v-model="chatDraft" class="ai-textarea" rows="2"
          placeholder="Ask something that brings you closer to Allah..." :disabled="chatLoading"
          @keydown="handleComposerKeydown"></textarea>

        <div class="ai-form-meta pt-2 text-muted">
          <div class="ai-secondary-group">
            <button type="submit" class="ai-submit" :disabled="chatLoading || !chatDraft.trim()">
              <i class="fas fa-paper-plane" aria-hidden="true"></i>
              <span v-if="chatLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span>{{ chatLoading ? 'Noor is thinking...' : 'Ask Noor' }}</span>
            </button>
            <button type="button" class="ai-voice-btn text-center" :class="{ 'ai-voice-btn--active': voiceListening }"
              :disabled="chatLoading" @click="toggleVoiceSearch" :aria-pressed="voiceListening.toString()">
              <i class="fas fa-microphone" aria-hidden="true"></i>
              <span>{{ voiceListening ? 'Listening…' : 'Voice search' }}</span>
            </button>
            <button type="button" class="ai-clear-input" :disabled="chatLoading || !chatDraft.trim()"
              @click="clearDraft">
              <i class="fas fa-eraser" aria-hidden="true"></i>
              <span>Clear input</span>
            </button>
          </div>

        </div>
        <p v-if="voiceStatus" class="ai-voice-status" role="status" aria-live="polite">
          <i class="fas fa-microphone me-1" aria-hidden="true"></i>
          {{ voiceStatus }}
        </p>
        <p v-if="voiceAlertMessage" class="voice-alert" role="status" aria-live="polite">
          {{ voiceAlertMessage }}
        </p>
        <div class="ai-trust-note" role="note" aria-live="polite">
          <i class="fas fa-shield-alt" aria-hidden="true"></i>
          <p class="mb-0 text-muted">
            Religious guidance needs clear boundaries. Noor is educational, so consult a qualified scholar for fatwas.
            <button
              type="button"
              class="ai-disclaimer-link text-decoration-underline text-primary ms-1"
              @click="openDisclaimerModal">
              Trust &amp; disclaimer
            </button>
          </p>
        </div>
      </form>
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
const AI_OFFICIAL_SOURCE_HOSTS = Object.freeze([
  'quran.com',
  'sunnah.com',
  'hadeethenc.com',
  'quranenc.com',
  'api.alquran.cloud',
  'islamqa.info',
  'islamweb.net',
]);
const AI_AGGREGATED_SOURCE_HOSTS = Object.freeze([
  'raw.githubusercontent.com',
  'githubusercontent.com',
  'cdn.jsdelivr.net',
  'api.islamhouse.com',
  'api2.islamhouse.com',
  'api3.islamhouse.com',
]);
const SESSION_MEMORY_LIMIT = 30;
const SESSION_STORAGE_COMPACTION_STEPS = [
  { maxSessions: 24, maxEntries: 40, maxTextLength: 2200, keepReferences: true, keepSummary: true },
  { maxSessions: 16, maxEntries: 28, maxTextLength: 1400, keepReferences: false, keepSummary: true },
  { maxSessions: 10, maxEntries: 18, maxTextLength: 900, keepReferences: false, keepSummary: false },
  { maxSessions: 6, maxEntries: 10, maxTextLength: 560, keepReferences: false, keepSummary: false },
];

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
    };
  },
  computed: {
    isNewChatAvailable() {
      return this.chatDraft.trim().length > 0 || this.hasAssistantResponse;
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
    formatSourceBadge(sourceBadge) {
      const badge = String(sourceBadge || '').toLowerCase();
      if (badge === 'official') {
        return 'Official';
      }
      if (badge === 'aggregated') {
        return 'Aggregated';
      }
      return 'Verified';
    },
    getSourceBadgeClass(sourceBadge) {
      const badge = String(sourceBadge || '').toLowerCase();
      if (badge === 'official') {
        return 'chat-reference-badge--official';
      }
      if (badge === 'aggregated') {
        return 'chat-reference-badge--aggregated';
      }
      return 'chat-reference-badge--verified';
    },
    formatHadithGrade(grade) {
      const normalized = String(grade || '').toLowerCase();
      if (normalized === 'sahih') {
        return 'Sahih';
      }
      if (normalized === 'hasan') {
        return 'Hasan';
      }
      if (normalized === 'daif') {
        return "Da'if";
      }
      return 'Grade pending';
    },
    getHadithGradeBadgeClass(grade) {
      const normalized = String(grade || '').toLowerCase();
      if (normalized === 'sahih') {
        return 'chat-reference-badge--sahih';
      }
      if (normalized === 'hasan') {
        return 'chat-reference-badge--hasan';
      }
      if (normalized === 'daif') {
        return 'chat-reference-badge--daif';
      }
      return 'chat-reference-badge--ungraded';
    },
    extractReferenceHostname(url) {
      if (typeof url !== 'string' || !url.trim() || typeof URL === 'undefined') {
        return '';
      }
      try {
        return new URL(url).hostname.toLowerCase();
      } catch (error) {
        return '';
      }
    },
    hostMatchesAny(hostname, candidates = []) {
      if (!hostname || !Array.isArray(candidates) || !candidates.length) {
        return false;
      }
      return candidates.some((candidate) => hostname === candidate || hostname.endsWith(`.${candidate}`));
    },
    normalizeSourceBadge(sourceBadge) {
      const normalized = String(sourceBadge || '').trim().toLowerCase();
      if (!normalized) {
        return '';
      }
      if (['official', 'verified', 'aggregated'].includes(normalized)) {
        return normalized;
      }
      if (['authentic', 'canonical', 'primary', 'trusted'].includes(normalized)) {
        return 'official';
      }
      if (['compiled', 'composite', 'mirror', 'community', 'api'].includes(normalized)) {
        return 'aggregated';
      }
      return '';
    },
    inferSourceBadge(reference, label = '', url = '') {
      const explicit = this.normalizeSourceBadge(
        reference?.sourceBadge
          || reference?.source_badge
          || reference?.badge
          || reference?.sourceType
          || reference?.source_type
          || '',
      );
      if (explicit) {
        return explicit;
      }
      const hostname = this.extractReferenceHostname(url);
      if (this.hostMatchesAny(hostname, AI_OFFICIAL_SOURCE_HOSTS)) {
        return 'official';
      }
      if (this.hostMatchesAny(hostname, AI_AGGREGATED_SOURCE_HOSTS)) {
        return 'aggregated';
      }
      const combined = `${label} ${hostname}`.toLowerCase();
      if (/\b(local faq|community|compiled|summary|mirror|aggregated)\b/.test(combined)) {
        return 'aggregated';
      }
      if (/\b(quran|qur'an|hadith|hadeeth|sunnah|surah|ayah)\b/.test(combined)) {
        return 'verified';
      }
      return 'verified';
    },
    isHadithReference(reference, label = '', url = '') {
      const typeHint = String(
        reference?.type
        || reference?.contentType
        || reference?.content_type
        || reference?.category
        || '',
      ).toLowerCase();
      if (typeHint.includes('hadith') || typeHint.includes('hadeeth')) {
        return true;
      }
      const combined = `${label} ${url}`.toLowerCase();
      return /(\bhadith\b|\bhadeeth\b|\bsunnah\b|\bbukhari\b|\bmuslim\b|\btirmidhi\b|\babu[\s-]?dawud\b|\bnasai\b|\bibn[\s-]?majah\b|\bnarrated\b|حديث)/i.test(combined);
    },
    normalizeHadithGradeValue(value) {
      const normalized = String(value || '').trim().toLowerCase();
      if (!normalized) {
        return '';
      }
      if (/(^|\b)(sahih|saheeh|authentic|sound)(\b|$)|صحيح/i.test(normalized)) {
        return 'sahih';
      }
      if (/(^|\b)(hasan|hassan|fair)(\b|$)|حسن/i.test(normalized)) {
        return 'hasan';
      }
      if (/(^|\b)(da['’`]?if|daeef|weak|not\s+authentic)(\b|$)|ضعيف/i.test(normalized)) {
        return 'daif';
      }
      return '';
    },
    inferHadithGrade(reference, label = '', url = '', isHadith = false) {
      const directCandidates = [
        reference?.hadithGrade,
        reference?.hadith_grade,
        reference?.grade,
        reference?.grading,
        reference?.hukm,
        reference?.status,
      ];
      for (const candidate of directCandidates) {
        const normalized = this.normalizeHadithGradeValue(candidate);
        if (normalized) {
          return normalized;
        }
      }

      const inferred = this.normalizeHadithGradeValue(`${label} ${url}`);
      if (inferred) {
        return inferred;
      }

      if (!isHadith) {
        return null;
      }

      const combined = `${label} ${url}`.toLowerCase();
      if (/\bsahih\s*(al[-\s]?)?bukhari\b/.test(combined)
        || /\bsahih\s*muslim\b/.test(combined)
        || /sunnah\.com\/(bukhari|muslim)/.test(combined)) {
        return 'sahih';
      }

      return 'ungraded';
    },
    buildReferenceMetadata(reference, label = '', url = '') {
      const safeUrl = typeof url === 'string' ? url : '';
      const isHadith = this.isHadithReference(reference, label, safeUrl);
      return {
        sourceBadge: this.inferSourceBadge(reference, label, safeUrl),
        isHadith,
        hadithGrade: this.inferHadithGrade(reference, label, safeUrl, isHadith),
      };
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
    formatChatText(text) {
      if (!text) return '';
      const cleaned = text
        .replace(/\r\n?/g, '\n')
        .replace(/[^\x20-\x7E\n]/g, ' ')
        .replace(/[ \t]{2,}/g, ' ')
        .trim();
      const normalized = cleaned.replace(/\*\*/g, '');
      const paragraphs = normalized.split(/\n+/).map((line) => line.trim()).filter(Boolean);
      if (!paragraphs.length) {
        return normalized ? `<p>${this.escapeHtml(normalized)}</p>` : '';
      }
      return paragraphs.map((paragraph) => `<p>${this.escapeHtml(paragraph)}</p>`).join('');
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
    normalizeReferenceList(references) {
      if (!Array.isArray(references)) {
        return [];
      }
      const normalized = [];
      const seen = new Set();
      references.forEach((reference) => {
        if (typeof reference === 'string') {
          const label = reference.trim();
          if (!label) {
            return;
          }
          const key = label.toLowerCase();
          if (seen.has(key)) {
            return;
          }
          seen.add(key);
          const metadata = this.buildReferenceMetadata(null, label, null);
          normalized.push({
            label: label.slice(0, 180),
            url: null,
            sourceBadge: metadata.sourceBadge,
            isHadith: metadata.isHadith,
            hadithGrade: metadata.hadithGrade,
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
        if (!label) {
          return;
        }
        const url = this.normalizeResponseUrl(reference.url || reference.link || reference.href || null);
        const key = `${label.toLowerCase()}|${(url || '').toLowerCase()}`;
        if (seen.has(key)) {
          return;
        }
        seen.add(key);
        const metadata = this.buildReferenceMetadata(reference, label, url);
        normalized.push({
          label: label.slice(0, 180),
          url,
          sourceBadge: metadata.sourceBadge,
          isHadith: metadata.isHadith,
          hadithGrade: metadata.hadithGrade,
        });
      });
      return normalized.slice(0, 8);
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
      return {
        verified: Boolean(verification.verified),
        confidence: safeConfidence,
        totalSources: Number(verification.totalSources || fallbackSourceCount || 0),
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
      return message || 'Noor cannot respond right now.';
    },
    normalizeAssistantMessageFallback(rawText) {
      if (typeof rawText !== 'string') {
        return '';
      }
      const plain = this.toPlainText(rawText).replace(/\s+/g, ' ').trim();
      if (!plain) {
        return '';
      }
      return plain.slice(0, 2800);
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
          message,
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
      const label = String(reference.label || '').trim();
      if (!label) {
        return null;
      }
      const normalizedUrl = typeof reference.url === 'string' && reference.url.trim() ? reference.url.trim() : null;
      const metadata = this.buildReferenceMetadata(reference, label, normalizedUrl);
      return {
        label: label.slice(0, 180),
        url: normalizedUrl,
        sourceBadge: metadata.sourceBadge,
        isHadith: metadata.isHadith,
        hadithGrade: metadata.hadithGrade,
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

      const maxTextLength = Number(options.maxTextLength || 1200);
      const text = rawText.length > maxTextLength ? `${rawText.slice(0, maxTextLength)}...` : rawText;
      const references = options.keepReferences
        ? (Array.isArray(entry.references) ? entry.references.map((item) => this.normalizeStoredReference(item)).filter(Boolean).slice(0, 4) : [])
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
        ? entry.references.map((item) => this.normalizeStoredReference(item)).filter(Boolean).slice(0, 5)
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
      if (this.isCompactMode === isCompact) {
        return;
      }
      this.isCompactMode = isCompact;
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
    this.initializeSpeechSynthesis();
    this.initializeQuestionBank();
    this.registerAiServiceWorker();
    this.ensureCriticalVerseHashMap().catch((error) => {
      console.warn('Unable to precompute critical verse hashes', error);
    });
    this.attachAiTestHarness();
    this.resizeListener = () => this.updateCompactMode();
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
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
}

.chat-reference-main {
  display: inline-flex;
  align-items: baseline;
  gap: 0.25rem;
}

.chat-reference-badges {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem;
}

.chat-reference-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.12rem 0.45rem;
  line-height: 1.3;
}

.chat-reference-badge--official {
  background: rgba(15, 110, 99, 0.14);
  color: #0b4b44;
  border-color: rgba(15, 110, 99, 0.35);
}

.chat-reference-badge--verified {
  background: rgba(14, 116, 144, 0.14);
  color: #0c4a6e;
  border-color: rgba(14, 116, 144, 0.35);
}

.chat-reference-badge--aggregated {
  background: rgba(113, 63, 18, 0.12);
  color: #78350f;
  border-color: rgba(113, 63, 18, 0.35);
}

.chat-reference-badge--hadith {
  text-transform: none;
  letter-spacing: 0.01em;
}

.chat-reference-badge--sahih {
  background: rgba(22, 163, 74, 0.14);
  color: #166534;
  border-color: rgba(22, 163, 74, 0.35);
}

.chat-reference-badge--hasan {
  background: rgba(234, 179, 8, 0.16);
  color: #854d0e;
  border-color: rgba(217, 119, 6, 0.34);
}

.chat-reference-badge--daif {
  background: rgba(220, 38, 38, 0.14);
  color: #991b1b;
  border-color: rgba(220, 38, 38, 0.35);
}

.chat-reference-badge--ungraded {
  background: rgba(100, 116, 139, 0.14);
  color: #334155;
  border-color: rgba(100, 116, 139, 0.34);
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
</style>
