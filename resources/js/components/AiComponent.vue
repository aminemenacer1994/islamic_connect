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
              feels like encouragement from a trusted companion. Ask for dua ideas, reminders, or reflections tuned to your day.
            </p>
          </div>
        </div>
  
        <div class="ai-suggestions text-start" aria-label="Suggested questions">
          <div class="ai-suggestions-header">
            <h6 class="fw-bold">Need inspiration ?</h6>
            <button
              type="button"
              class="ai-suggestions-toggle"
              @click="toggleSuggestions"
              :aria-expanded="suggestionsExpanded.toString()"
            >
              <span class="sr-only">
                {{ suggestionsExpanded ? 'Collapse suggestion categories' : 'Expand suggestion categories' }}
              </span>
              <i :class="suggestionsExpanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" aria-hidden="true"></i>
            </button>
          </div>
          <div v-show="suggestionsExpanded" class="ai-suggestions-list">
            <div class="ai-suggestion-grid">
              <div
                v-for="category in suggestionCategories"
                :key="category.label"
              :class="['ai-suggestion-category', { 'ai-suggestion-category--collapsed': !category.expanded }]"
              >
                <div class="pt-2 ai-suggestion-category-header">
                  <p class="ai-suggestion-category-label">{{ category.label }}</p>
                  <button
                    type="button"
                    class="ai-category-toggle"
                    @click="toggleCategory(category)"
                    :aria-expanded="category.expanded.toString()"
                  >
                    <span class="sr-only">
                      {{ category.expanded ? 'Collapse category' : 'Expand category' }}
                    </span>
                    <i :class="category.expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down '" aria-hidden="true"></i>
                  </button>
                </div>
                <div class="ai-suggestion-category-chips" v-show="category.expanded">
                  <button
                    v-for="(question, idx) in category.questions"
                    :key="`category-${category.label}-${idx}-${question}`"
                    type="button"
                    class="ai-suggestion text-start"
                    @click="selectSuggestedQuestion(question)"
                    :disabled="chatLoading"
                  >
                    <span class="ai-suggestion-text">{{ question }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="ai-controls" role="toolbar" aria-label="Chat controls">
          <button
            v-if="hasAssistantResponse"
            type="button"
            class="ai-control-btn ai-control-btn--primary"
            @click="startNewChat"
            :disabled="!isNewChatAvailable"
          >
            <i class="fas fa-plus-circle" aria-hidden="true"></i> New chat
          </button>
          <button
            type="button"
            class="ai-control-btn"
            :disabled="!chatHistory.length"
            @click="clearHistory"
          >
            <i class="fas fa-trash-alt" aria-hidden="true"></i> Clear history
          </button>
          <button
            type="button"
            class="ai-control-btn ai-control-btn--whatsapp"
            :disabled="!chatHistory.length"
            @click="shareConversationOnWhatsApp"
          >
            <i class="fab fa-whatsapp" aria-hidden="true"></i> Share Full Convo
          </button>
          <button
            type="button"
            class="ai-control-btn ai-control-btn--copy"
            :disabled="!chatHistory.length"
            @click="copyConversationToClipboard"
          >
            <i class="fas fa-copy" aria-hidden="true"></i> Copy Full Convo
          </button>
          <button
            type="button"
            class="ai-control-btn ai-session-inline__button"
            :disabled="!chatSessions.length"
            @click="toggleSessionDropdown"
            aria-haspopup="listbox"
            :aria-expanded="sessionDropdownOpen ? 'true' : 'false'"
          >
            <i class="fas fa-clipboard-list" aria-hidden="true"></i>
            <span>
              {{ chatSessions.length ? `Saved chats (${chatSessions.length})` : 'No saved chats yet' }}
            </span>
          </button>
        </div>
        <div class="ai-session-inline">
          <div
            v-if="sessionDropdownOpen"
            class="ai-session-inline__dropdown"
            role="listbox"
            aria-label="Recent chats"
          >
            <button
              v-if="chatSessions.length"
              type="button"
              class="ai-session-inline__clear-all"
              @click.stop.prevent="prepareClearAllSessions"
            >
              <i class="fas fa-trash-alt me-1" aria-hidden="true"></i>
              Remove all saved chats
            </button>
            <div
              v-if="pendingClearAll"
              class="ai-session-inline__alert ai-session-inline__alert--danger"
              role="alert"
            >
              <span class="m-0">Delete all saved chats?</span>
              <div>
                <button type="button" class="ai-session-inline__action-btn" @click.stop="cancelPendingClearAll">Cancel</button>
                <button type="button" class="ai-session-inline__action-btn ai-session-inline__action-btn--danger" @click.stop="doClearAllSessions">Delete</button>
              </div>
            </div>
            <button
              v-for="session in chatSessions"
              :key="session.id"
              type="button"
              class="ai-session-inline__dropdown-item"
              @click="selectSessionFromList(session.id)"
            >
              <span>{{ formatSessionLabel(session) }}</span>
              <small>{{ formatSessionTimestamp(session.updatedAt) }}</small>
              <button
                type="button"
                class="ai-session-inline__dropdown-remove"
                @click.stop="prepareDeleteSession(session.id)"
                aria-label="Delete this saved chat"
              >
                <i class="fas fa-times" aria-hidden="true"></i>
              </button>
            </button>
          </div>
          <div
            v-if="pendingDeleteSessionId"
            class="ai-session-inline__alert ai-session-inline__alert--warning"
            role="alert"
          >
            <span class="m-0">Delete “{{ pendingDeleteSessionLabel }}”?</span>
            <div>
              <button type="button" class="ai-session-inline__action-btn" @click.stop="cancelPendingDelete">Cancel</button>
              <button type="button" class="ai-session-inline__action-btn ai-session-inline__action-btn--warning" @click.stop="doDeleteSession">Delete</button>
            </div>
          </div>
        </div>
        <div
          v-if="copyNotice"
          class="ai-copy-notice"
          role="status"
          aria-live="polite"
        >
          <i class="fas fa-check-circle me-1" aria-hidden="true"></i>
          {{ copyNotice }}
        </div>
  
        <div
          v-if="chatError"
          class="ai-error-banner"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          >
          <i class="fas fa-exclamation-triangle ai-error-icon" aria-hidden="true"></i>
          <div>
            <p class="ai-error-title text-left">Need some redirection?</p>
            <p class="ai-error-message">{{ chatError }}</p>
            <button
              v-if="sessionExpired"
              type="button"
              class="ai-error-clear"
              @click="reloadPage"
            >
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
                <i
                  :class="entry.role === 'assistant' ? 'fas fa-robot chat-icon' : 'fas fa-user chat-icon'"
                  aria-hidden="true"
                  title="Sender"
                ></i>
                <span class="chat-role mr-2"><b>{{ entry.role === 'assistant' ? 'Assistant' : 'You' }}</b></span>
                <span class="chat-timestamp">{{ entry.displayTime }} · {{ entry.displayDate }}</span>
              </div>
              <div class="chat-bubble-container">
                <div
                  :class="[
                    'chat-bubble',
                    entry.role,
                    { 'chat-bubble--collapsed': entry.role === 'assistant' && entry.collapsed },
                  ]"
                  v-html="formatChatText(entry.text)"
                ></div>
                <div v-if="entry.role === 'assistant'" class="chat-entry-actions">
                  <button
                    type="button"
                    class="chat-share-btn"
                    @click="shareEntryOnWhatsApp(entry)"
                    :aria-label="'Share this answer via WhatsApp'"
                  >
                    <i class="fab fa-whatsapp" aria-hidden="true"></i>
                    <span class="d-none d-md-inline ms-1">Share answer</span>
                  </button>
                  <button
                    type="button"
                    class="chat-copy-btn ms-2"
                    @click="copyEntryToClipboard(entry)"
                    :aria-label="'Copy this answer'"
                  >
                    <i class="fas fa-copy" aria-hidden="true"></i>
                    <span class="d-none d-md-inline ms-1">Copy answer</span>
                  </button>
                  <div class="chat-voice-wrapper ms-2">
                    <button
                      type="button"
                      class="chat-voice-trigger"
                      @click="toggleSpeechControls(entry)"
                      :aria-expanded="entry.speechControlsVisible ? 'true' : 'false'"
                    >
                      <i class="fas fa-volume-up" aria-hidden="true"></i>
                      <span class="visually-hidden">Read this answer aloud</span>
                    </button>
                    <div
                      v-if="entry.speechControlsVisible"
                      class="chat-voice-controls"
                      role="group"
                      aria-label="Speech controls"
                      aria-live="polite"
                    >
                      <button
                        type="button"
                        class="chat-voice-control-btn"
                        @click="playEntrySpeech(entry)"
                        :disabled="entry.speechStatus === 'loading'"
                        aria-label="Play answer"
                      >
                        <i class="fas fa-play" aria-hidden="true"></i>
                      </button>
                      <button
                        type="button"
                        class="chat-voice-control-btn"
                        @click="pauseEntrySpeech(entry)"
                        :disabled="entry.speechStatus !== 'playing'"
                        aria-label="Pause answer"
                      >
                        <i class="fas fa-pause" aria-hidden="true"></i>
                      </button>
                      <button
                        type="button"
                        class="chat-voice-control-btn"
                        @click="stopEntrySpeech(entry)"
                        :disabled="entry.speechStatus === 'stopped'"
                        aria-label="Stop answer"
                      >
                        <i class="fas fa-stop" aria-hidden="true"></i>
                      </button>
                      <span class="chat-voice-status" aria-live="polite">
                        {{ entry.speechStatus === 'loading' ? 'Preparing…' : entry.speechStatus }}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  v-if="entry.collapsed && entry.summaryBullets.length"
                  class="chat-summary"
                >
                  <p class="chat-summary-title">
                    {{ entry.role === 'assistant' ? 'Quick summary' : 'Question snapshot' }}
                  </p>
                  <ul>
                    <li v-for="(bullet, bulletIndex) in entry.summaryBullets" :key="`summary-${idx}-${bulletIndex}`">
                      {{ bullet }}
                    </li>
                  </ul>
                </div>
                <button
                  v-if="entry.allowCollapse && isCompactMode"
                  type="button"
                  class="chat-collapse-toggle"
                  @click="toggleEntryCollapse(entry)"
                >
                  <span v-if="entry.collapsed">
                    Show full {{ entry.role === 'assistant' ? 'response' : 'question' }}
                  </span>
                  <span v-else>
                    Collapse to {{ entry.role === 'assistant' ? 'summary' : 'preview' }}
                  </span>
                </button>
                <div
                  v-if="entry.references && entry.references.length"
                  class="chat-references-wrapper"
                  aria-label="Sources that informed this answer"
                >
                  <span class="chat-references-heading">References</span>
                  <ul class="chat-references" role="list">
                    <li
                      v-for="(reference, refIndex) in entry.references"
                      :key="`ref-${idx}-${refIndex}-${reference.label}`"
                    >
                      <template v-if="reference.url">
                        <a
                          :href="reference.url"
                          target="_blank"
                          rel="noopener noreferrer"
                          >{{ reference.label }}</a
                        >
                      </template>
                      <template v-else>
                        {{ reference.label }}
                      </template>
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
          placeholder="Ask something that brings you closer to Allah..."
            :disabled="chatLoading"></textarea>
  
          <div class="ai-form-meta pt-2 text-muted">
            <div class="ai-secondary-group">
              <button type="submit" class="ai-submit" :disabled="chatLoading || !chatDraft.trim()">
                <i class="fas fa-paper-plane" aria-hidden="true"></i>
                <span v-if="chatLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>{{ chatLoading ? 'Noor is Thinking...' : 'Ask Noor' }}</span>
              </button>
              <button
                type="button"
                class="ai-voice-btn text-center"
                :class="{ 'ai-voice-btn--active': voiceListening }"
                :disabled="chatLoading"
                @click="toggleVoiceSearch"
                :aria-pressed="voiceListening.toString()"
              >
                <i class="fas fa-microphone" aria-hidden="true"></i>
                <span>{{ voiceListening ? 'Listening…' : 'Voice search' }}</span>
              </button>
              <button
                type="button"
                class="ai-clear-input"
                :disabled="chatLoading || !chatDraft.trim()"
                @click="clearDraft"
              >
                <i class="fas fa-eraser" aria-hidden="true"></i>
                <span>Clear input</span>
              </button>
            </div>
            
          </div>
          <p v-if="voiceStatus" class="ai-voice-status" role="status" aria-live="polite">
            <i class="fas fa-microphone me-1" aria-hidden="true"></i>
            {{ voiceStatus }}
          </p>
          <div class="ai-trust-note" role="note" aria-live="polite">
            <i class="fas fa-shield-alt" aria-hidden="true"></i>
            <p class="mb-0 text-muted">
              Religious guidance needs clear boundaries this is educational content, so consult a qualified scholar for
              fatwas.
            </p>
          </div>
        </form>
      </div>
    </section>
  </template>
  
 <script>
const MOBILE_BREAKPOINT = 768;
const CHAT_HISTORY_STORAGE_KEY = 'islamic-connect-chat-sessions';

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
      suggestionCategories: [
        {
          label: 'Daily worship',
          expanded: true,
          questions: [
            '🕋 How can I make the five daily prayers feel more meaningful?',
            '🤲 Share a dua from the Sunnah for asking Allah for guidance.',
            '🕯️ Describe the etiquette of making dua after Salah.',
            '📿 How can I increase consistency in dhikr and remembrance?',
            '🕊️ How can I invite barakah into my daily salah and routines?',
          ],
        },
        {
          label: 'Study & exams',
          expanded: true,
          questions: [
            '📚 Which hadith guides me in seeking knowledge with sincerity?',
            '📖 Share a Quranic story that encourages hope and trust.',
            '📜 Explain a hadith about patience and perseverance.',
            '✨ How should I renew my intention before each salah or act of worship?',
            '🌟 Which Quranic reminders help me stay humble during success?',
          ],
        },
        {
          label: 'Life events',
          expanded: true,
          questions: [
            '🕌 What does the Quran teach about Allah’s mercy in hard times?',
            '🌿 Which duas help me keep gratitude in everyday life?',
            '⚖️ How can I balance worldly duties with Islamic priorities?',
            '🛡️ Which Quranic reminders guard my heart from envy and gossip?',
            '🤝 Explain the importance of community in Islamic life.',
          ],
        },
      ],
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
        displayTime: now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        displayDate: now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }),
      };
    },
    getConversationForRequest() {
      return this.chatHistory.slice(-6).map((entry) => ({
        role: entry.role,
        content: entry.text,
      }));
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
    normalizeReferences(input) {
      if (!input) return [];
      const items = Array.isArray(input) ? input : [input];
      return items
        .map((item) => {
          if (!item) {
            return null;
          }
          if (typeof item === 'string') {
            return { label: item, url: '' };
          }
          if (typeof item === 'object') {
            return {
              label: item.label || item.title || item.text || '',
              url: item.url || item.link || item.href || '',
            };
          }
          return null;
        })
        .filter((item) => item && item.label.trim());
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
        this.chatError = 'Please ask something related to Islamic teachings or practice.';
        return;
      }
      this.chatDraft = '';
      this.chatHistory.push(this.createChatEntry('user', message));
      this.scrollChatWindow();
      this.scrollComponentToBottom();
      const payload = {
        message,
        history: this.getConversationForRequest(),
      };
      try {
        this.chatLoading = true;
        const session = this.sessionId || this.resetSession();
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (!csrfToken) {
          throw new Error('Unable to send the question right now.');
        }
        const response = await fetch('/ai/chat', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
          },
          body: JSON.stringify({ ...payload, sessionId: session }),
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
        this.syncCurrentSessionHistory();
      } catch (error) {
        console.error('Chat error:', error);
        this.chatError = error?.message || 'The assistant is temporarily unavailable.';
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
        const sessions = stored
          .filter((session) => session && session.id && Array.isArray(session.history) && session.history.length)
          .map((session) => ({
            id: session.id,
            history: session.history.map((entry) => ({ ...entry })),
            createdAt: session.createdAt || session.updatedAt || Date.now(),
            updatedAt: session.updatedAt || Date.now(),
          }))
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
      const lastEntry = session.history?.[session.history.length - 1];
      const lastRole = lastEntry?.role === 'assistant' ? 'Noor' : lastEntry?.role === 'user' ? 'You' : '';
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
          this.voiceStatus = 'Voice search activated — listening for your question.';
          this.clearVoiceAutoSubmitTimer();
          this.showVoiceAlert('Voice search activated — listening for your question.');
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
            this.voiceStatus = 'Listening — feel free to continue speaking.';
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
      return keywords.some((keyword) => normalized.includes(keyword));
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
      this.clearConversationState();
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

.ai-section > * {
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
    background: rgba(255, 255, 255, 0.92);
    border-radius: 24px;
    border: 1px solid var(--ai-border);
    padding: clamp(0.8rem, 2.2vw, 1.5rem);
    box-shadow: var(--ai-shadow);
  }

  .ai-welcome {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(246, 250, 247, 0.95));
    border: 1px solid var(--ai-border);
    padding: 1rem;
    box-shadow: 0 16px 30px rgba(15, 53, 48, 0.12);
    text-align: left;
    gap: 0.4rem;
  }

  .ai-suggestions {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(245, 252, 249, 0.95));
    border: 1px solid var(--ai-border);
    border-radius: 20px;
    padding: 1rem;
    margin-top: 0.75rem;
    box-shadow: 0 14px 26px rgba(15, 53, 48, 0.12);
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
  
  .ai-suggestions {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    border-radius: 20px;
    border: 1px solid var(--ai-border);
    background: linear-gradient(180deg, rgba(255, 253, 248, 0.95), rgba(244, 251, 247, 0.95));
    padding: 1rem;
    box-shadow: 0 20px 38px rgba(15, 53, 48, 0.12);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    animation: ai-rise 0.6s ease both 0.08s;
  }
  
  .ai-suggestions:hover {
    transform: translateY(-3px);
    box-shadow: 0 28px 50px rgba(15, 53, 48, 0.18);
  }
  
  .ai-suggestions-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.55rem;
    flex-wrap: wrap;
  }
  
  .ai-suggestions-header h6 {
    margin: 0;
    font-size: 0.95rem;
    color: var(--ai-ink);
  }
  
  .ai-suggestions-toggle {
    border-radius: 999px;
    border: 1px solid rgba(15, 110, 99, 0.4);
    background: #fff;
    color: var(--ai-ink);
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 6px 12px rgba(15, 53, 48, 0.16);
    transition: border-color 0.2s ease, background 0.15s ease, transform 0.2s ease;
  }
  
  .ai-suggestions-toggle:hover {
    border-color: rgba(15, 110, 99, 0.75);
    transform: translateY(-1px);
  }
  
  .ai-suggestion-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
    align-items: start;
  }
  
  .ai-suggestions-list {
    margin-top: 0.8rem;
  }
  
  .ai-suggestion-category {
    border-radius: 22px;
    padding: 1rem 1.25rem 0.9rem;
    background: #fff;
    border: 1px solid rgba(15, 110, 99, 0.16);
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    overflow: hidden;
    box-shadow: 0 12px 28px rgba(15, 53, 48, 0.08);
    transition: padding 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, max-height 0.3s ease;
  }
  
  .ai-suggestion-category-label {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--ai-ink);
    margin: 0;
  }
  
  .ai-suggestion-category-chips {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    max-height: 1200px;
    overflow: hidden;
    transition: opacity 0.2s ease, transform 0.25s ease;
  }
  
  .ai-suggestion-category--collapsed {
    padding-bottom: 0.5rem;
    padding-top: 0;
    box-shadow: inset 0 -1px 0 rgba(15, 110, 99, 0.2);
    gap: 0;
    width: 100%;
    max-height: 76px;
  }
  
  .ai-suggestion-category--collapsed .ai-suggestion-category-chips {
    opacity: 0;
    pointer-events: none;
  }
  
  .ai-suggestion-category-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding-top: 0.15rem;
  }
  
  .ai-category-toggle {
    border-radius: 50%;
    border: 1px solid rgba(15, 110, 99, 0.4);
    background: #fff;
    color: #0c4f47;
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border-color 0.2s ease, background 0.15s ease, transform 0.2s ease;
    padding: 0;
  }
  
  .ai-category-toggle:hover {
    border-color: rgba(15, 110, 99, 0.85);
    background: rgba(15, 110, 99, 0.08);
    transform: translateY(-1px);
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  .ai-suggestion {
    border: 1px solid rgba(15, 110, 99, 0.28);
    border-radius: 999px;
    padding: 0.45rem 1rem;
    background: #fff;
    font-size: 0.8rem;
    color: var(--ai-ink);
    cursor: pointer;
    transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
    line-height: 1.3;
    flex: 0 0 auto;
    white-space: normal;
  }
  
  .ai-suggestion-text {
    font-size: 0.8rem;
    width: 100%;
    white-space: normal;
  }
  
  .ai-suggestion:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
  
  .ai-suggestion:not(:disabled):hover {
    background: rgba(15, 110, 99, 0.12);
    border-color: rgba(15, 110, 99, 0.6);
    box-shadow: 0 6px 12px rgba(15, 110, 99, 0.18);
  }

  @media (min-width: 992px) {
    .ai-suggestion,
    .ai-suggestion-text {
      font-size: 0.95rem;
    }
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
    z-index: 1;
    border-radius: 20px;
    border: 1px solid var(--ai-border);
    padding: 1rem;
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 18px 34px rgba(15, 53, 48, 0.12);
    animation: ai-rise 0.6s ease both 0.22s;
  }

  .ai-textarea {
    width: 100%;
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
    .ai-suggestions,
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

    .ai-suggestions {
      padding: 0.9rem;
    }

    .ai-suggestions-header h6 {
      font-size: 0.82rem;
    }

    .ai-suggestions-toggle {
      width: 32px;
      height: 32px;
      border-radius: 10px;
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

    .ai-suggestions-list {
      max-height: 260px;
      overflow-y: auto;
    }

    .ai-suggestions-header {
      gap: 0.35rem;
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
