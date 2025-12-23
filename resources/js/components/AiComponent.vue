<template>
  <section ref="aiRoot" aria-label="Islamic chatbot">
    <div>
      <div class="ai-welcome" aria-live="polite">
        <div class="ai-welcome-icon" aria-hidden="true">
          <i class="fas fa-infinity" aria-hidden="true"></i>
        </div>
        <div class="ai-welcome-text">
          <h2 class="fw-bold">How can I assist your journey today?</h2>
          <p class="container ai-welcome-copy">
            Tap a suggested question or type anything about Quranic inspiration, prophetic guidance, or daily worship
            and I’ll respond with balanced, source rooted clarity.
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

      <div class="ai-metadata">
        <div v-if="chatLoading" class="ai-loading-indicator" role="status" aria-live="polite">
          <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <p class="mb-0 fw-semibold">Assistant is consulting trusted sources...</p>
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
          <i class="fab fa-whatsapp" aria-hidden="true"></i> Share Full Conversation via WhatsApp
        </button>
        <button
          type="button"
          class="ai-control-btn ai-control-btn--copy"
          :disabled="!chatHistory.length"
          @click="copyConversationToClipboard"
        >
          <i class="fas fa-copy" aria-hidden="true"></i> Copy Full Conversation to Clipboard
        </button>
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
        </div>
      </div>

      <form ref="aiForm" class="ai-form pt-3" @submit.prevent="sendChatMessage">
        <label class="visually-hidden" for="aiChatInput">Ask the chatbot</label>
        <textarea id="aiChatInput" ref="aiChatInput" v-model="chatDraft" class="ai-textarea" rows="2"
        placeholder="Ask something that brings you closer to Allah..."
          :disabled="chatLoading"></textarea>
      
        <div class="ai-form-meta pt-2 text-muted">
          <button type="submit" class="ai-submit" :disabled="chatLoading || !chatDraft.trim()">
            <span v-if="chatLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span>{{ chatLoading ? 'Thinking...' : 'Ask your Assistant' }}</span>
          </button>
          <button
            type="button"
            class="ai-clear-input"
            :disabled="chatLoading || !chatDraft.trim()"
            @click="clearDraft"
          >
            Clear input
          </button>
        </div>
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
      suggestionsExpanded: true,
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
    };
  },
  computed: {
    isNewChatAvailable() {
      return this.chatDraft.trim().length > 0 || this.hasAssistantResponse;
    },
    hasAssistantResponse() {
      return this.chatHistory.some((entry) => entry.role === 'assistant');
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
    toggleCategory(category) {
      category.expanded = !category.expanded;
    },
    toggleSuggestions() {
      this.suggestionsExpanded = !this.suggestionsExpanded;
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
        const root = this.$refs.aiRoot;
        if (root) {
          root.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        const textarea = this.$refs.aiChatInput;
        if (textarea) {
          textarea.focus();
        }
        const form = this.$refs.aiForm;
        if (form) {
          form.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
        this.sendChatMessage();
      });
    },
    clearDraft() {
      this.chatDraft = '';
      this.chatError = null;
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
    this.resetSession();
    this.updateCompactMode();
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
  },
};
</script>

<style scoped>
.ai-section {
  min-height: 640px;
  padding: 2.75rem 1.25rem 2rem;
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 0.9rem;
}

.ai-panel::before {
  content: '';
  position: absolute;
  inset: 18px;
  border-radius: inherit;
  border: 1px solid rgba(255, 255, 255, 0.4);
  pointer-events: none;
}

.ai-panel-orb {
  position: absolute;
  top: -50px;
  right: -40px;
  width: 180px;
  height: 180px;
  /* background: radial-gradient(circle, rgba(13, 182, 145, 0.35), transparent 60%); */
  filter: blur(6px);
  pointer-events: none;
  z-index: 0;
}

.ai-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  z-index: 1;
}

.ai-label {
  letter-spacing: 0.25em;
  text-transform: uppercase;
  font-size: 0.72rem;
  color: #0a2a2d;
  margin-bottom: 0.35rem;
}

.ai-title {
  font-size: clamp(1.85rem, 3vw, 2.6rem);
  margin: 0;
  color: #07121a;
}

.ai-description {
  margin: 0.35rem 0 0;
  color: #0b1a20;
  line-height: 1.6;
}

.ai-controls {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 0.75rem;
}

.ai-control-btn {
  border: 1px solid rgba(13, 182, 145, 0.35);
  background: #fff;
  color: #041b20;
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.9rem;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.ai-control-btn i {
  font-size: 0.9rem;
}

.ai-control-btn:hover:not(:disabled) {
  border-color: #0db691;
}

.ai-control-btn--primary {
  background: linear-gradient(135deg, #0db691, #0c5b9a);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 10px 20px rgba(13, 182, 145, 0.3);
}

.ai-control-btn--primary:hover:not(:disabled) {
  border-color: transparent;
  opacity: 0.95;
}

.ai-control-btn--whatsapp {
  background: linear-gradient(135deg, #25d366, #128c7e);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 10px 20px rgba(37, 211, 102, 0.35);
}

.ai-control-btn--whatsapp:hover:not(:disabled) {
  opacity: 0.95;
}

.ai-control-btn--copy {
  background: linear-gradient(135deg, #f3f4f6, #d1d5db);
  border-color: transparent;
  color: #0f172a;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.15);
}

.ai-copy-notice {
  margin-top: 0.65rem;
  padding: 0.5rem 0.75rem;
  border-radius: 14px;
  background: #e0f4ef;
  border: 1px solid rgba(13, 182, 145, 0.4);
  color: #0c5b4f;
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
  background: rgba(37, 211, 102, 0.15);
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
  background: rgba(37, 211, 102, 0.25);
  transform: translateY(-1px);
}

.chat-share-btn i {
  font-size: 0.9rem;
}

.chat-copy-btn {
  border: none;
  background: rgba(14, 165, 233, 0.15);
  color: #042a40;
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
  background: rgba(14, 165, 233, 0.25);
  transform: translateY(-1px);
}

.chat-copy-btn i {
  font-size: 0.9rem;
}

.ai-control-btn.active {
  background: rgba(13, 182, 145, 0.12);
}

.ai-control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ai-trust-note {
  background: #e9f8f3;
  border: 1px solid rgba(14, 138, 120, 0.4);
  border-radius: 14px;
  padding: 0.85rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  color: #041b21;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.ai-trust-note i {
  font-size: 1.1rem;
}

.ai-trust-note p {
  color: #041b21;
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
  background: rgba(15, 111, 112, 0.08);
  border-radius: 12px;
  padding: 0.65rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #0b4a4f;
  text-align: center;
  width: 100%;
}


.ai-welcome {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  padding: 1rem 1rem 0.75rem;
  border-radius: 22px;
  border: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(229, 241, 250, 0.85));
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 0.95rem;
  color: #062029;
  box-shadow: 0 20px 40px rgba(15, 111, 112, 0.12);
  gap: 0.25rem;
}

.ai-welcome-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(13, 182, 145, 0.2);
  color: #0db691;
  margin-bottom: 0.25rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
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
  color: #041b1f;
  line-height: 1.5;
}

.ai-suggestions {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 32px;
  border: 1px solid rgba(13, 182, 145, 0.25);
  background: linear-gradient(180deg, rgba(246, 251, 251, 0.95), rgba(255, 255, 255, 0.9));
  padding: 1.25rem;
  box-shadow: 0 20px 40px rgba(13, 182, 145, 0.12);
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
  color: #041b21;
}

.ai-suggestions-toggle {
  border-radius: 999px;
  border: 1px solid rgba(15, 182, 145, 0.5);
  background: #fff;
  color: #062224;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(13, 182, 145, 0.3);
  transition: border-color 0.2s ease, background 0.15s ease, transform 0.2s ease;
}

.ai-suggestions-toggle:hover {
  border-color: rgba(15, 182, 145, 1);
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
  border: 1px solid rgba(13, 182, 145, 0.2);
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(13, 182, 145, 0.08);
  transition: padding 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, max-height 0.3s ease;
}

.ai-suggestion-category-label {
  font-size: 0.95rem;
  font-weight: 700;
  color: #041b21;
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
  box-shadow: inset 0 -1px 0 rgba(13, 182, 145, 0.2);
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
  border: 1px solid rgba(15, 182, 145, 0.4);
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
  border-color: rgba(15, 182, 145, 0.9);
  background: rgba(13, 182, 145, 0.08);
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
  border: 1px solid rgba(13, 182, 145, 0.35);
  border-radius: 999px;
  padding: 0.45rem 1rem;
  background: #fff;
  font-size: 0.95rem;
  color: #041b21;
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
  font-size: 0.95rem;
  width: 100%;
  white-space: normal;
}

.ai-suggestion:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.ai-suggestion:not(:disabled):hover {
  background: rgba(13, 182, 145, 0.12);
  border-color: rgba(13, 182, 145, 0.75);
  box-shadow: 0 6px 12px rgba(13, 182, 145, 0.2);
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
  background: rgba(13, 182, 145, 0.13);
  color: #0f5658;
  border: 1px solid rgba(13, 182, 145, 0.25);
}

.hf-badge {
  font-weight: 600;
  border: 1px solid rgba(13, 182, 145, 0.6);
  color: #0d4f5a;
  padding: 0.4rem 1.5rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.6);
  z-index: 1;
}

.ai-chat-shell {
  min-height: 640px;
  max-height: 760px;
  overflow-y: auto;
  border-radius: 28px;
  border: 1px solid rgba(13, 182, 145, 0.25);
  background: rgba(245, 250, 248, 0.95);
  padding: 1rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
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
  color: #031b21;
}

.chat-entry-header .chat-icon {
  font-size: 1rem;
  color: #0db691;
  background: rgba(13, 182, 145, 0.15);
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
  max-width: 100%;
  width: 100%;
  padding: 0.95rem;
  border-radius: 18px;
  position: relative;
  border: 1px solid rgba(13, 182, 145, 0.16);
  background: #fefefe;
  box-shadow: 0 6px 14px rgba(15, 111, 112, 0.08);
  text-align: left;
  transition: max-width 0.2s ease;
}

.chat-entry.user .chat-bubble {
  text-align: left;
}

@media (min-width: 768px) {
  .chat-entry.user .chat-bubble {
    white-space: nowrap;
    overflow-wrap: normal;
    word-break: keep-all;
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
  background: linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(14, 118, 120, 0.25));
}

.chat-bubble.assistant {
  align-self: flex-start;
  background: rgba(13, 182, 145, 0.12);
  border-color: rgba(13, 182, 145, 0.28);
}

.chat-bubble.user {
  align-self: flex-end;
  background: linear-gradient(135deg, rgba(13, 182, 145, 0.85), rgba(12, 91, 154, 0.9));
  border-color: transparent;
  color: #fff;
  box-shadow: 0 12px 24px rgba(12, 91, 154, 0.35);
}

.chat-bubble-container {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.chat-summary {
  background: #fff;
  border: 1px solid rgba(13, 182, 145, 0.26);
  border-radius: 16px;
  padding: 0.65rem 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.95rem;
  color: #041b21;
  text-align: left;
}

.chat-summary-title {
  margin: 0;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 600;
  color: #062a2b;
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
  color: #041b20;
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
  background: rgba(15, 182, 145, 0.12);
  border: 1px solid rgba(15, 182, 145, 0.3);
  border-radius: 16px;
  padding: 0.5rem 0.75rem;
  max-width: 80%;
}

.chat-references-heading {
  font-size: 0.75rem;
  font-weight: 600;
  color: #041d22;
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
  color: #041a20;
}

.chat-references li {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.chat-references a {
  color: #043039;
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
  color: #041b20;
  line-height: 1.5;
}

.ai-form {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  z-index: 1;
}

.ai-textarea {
  width: 100%;
  border-radius: 20px;
  border: 1px solid rgba(13, 182, 145, 0.3);
  padding: 1rem 1.25rem;
  resize: none;
  font-size: 0.95rem;
  min-height: 120px;
  background: #fafdfd;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

.ai-textarea:focus {
  outline: none;
  border-color: #0db691;
  box-shadow: 0 0 0 4px rgba(13, 182, 145, 0.12);
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
  border-radius: 999px;
  padding: 0.9rem 2.5rem;
  font-size: 0.95rem;
  color: #fff;
  background: linear-gradient(135deg, #0db691, #0a9080);
  box-shadow: 0 16px 28px rgba(13, 182, 145, 0.28);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

.ai-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

.ai-submit:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 32px rgba(13, 182, 145, 0.35);
}

.ai-clear-input {
  border-radius: 999px;
  border: 1px solid rgba(13, 182, 145, 0.4);
  background: transparent;
  color: #041b20;
  padding: 0.8rem 1.8rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.ai-clear-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ai-clear-input:not(:disabled):hover {
  border-color: #0db691;
  background: rgba(13, 182, 145, 0.1);
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
  border: 1px solid rgba(13, 182, 145, 0.5);
  background: transparent;
  color: #0d4b4b;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.ai-error-clear:hover {
  background: rgba(13, 182, 145, 0.12);
  border-color: rgba(13, 182, 145, 0.9);
}

@media (max-width: 900px) {
  .ai-panel {
    padding: 1.5rem;
  }

  .ai-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .chat-bubble {
    max-width: 100%;
  }
}
</style>
