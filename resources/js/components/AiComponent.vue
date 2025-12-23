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
            and
            I’ll respond with balanced, source-rooted clarity.
          </p>
        </div>
      </div>

      <div class="ai-controls" role="toolbar" aria-label="Chat controls">
        <button type="button" class="ai-control-btn ai-control-btn--primary" @click="startNewChat">
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
      </div>

      <div class="ai-suggestions" aria-label="Suggested questions">
        <h6 class="fw-bold">Need inspiration ?</h6>
        <div class="ai-suggestions-list">
          <div v-for="row in suggestionRows" :key="`row-${row.index}`" class="ai-suggestion-row"
            :style="{ '--row': row.index }">
            <div class="ai-suggestion-track">
              <button v-for="(question, idx) in row.loopItems" :key="`row-${row.index}-${idx}-${question}`"
                type="button" class="ai-suggestion" @click="selectSuggestedQuestion(question)" :disabled="chatLoading">
                <span class="ai-suggestion-text">{{ question }}</span>
              </button>
            </div>
          </div>
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
            <div :class="['chat-bubble', entry.role]" v-html="formatChatText(entry.text)"></div>
          </article>
        </div>
      </div>

      <form ref="aiForm" class="ai-form pt-3" @submit.prevent="sendChatMessage">
        <label class="visually-hidden" for="aiChatInput">Ask the chatbot</label>
        <textarea id="aiChatInput" ref="aiChatInput" v-model="chatDraft" class="ai-textarea" rows="2"
          placeholder="Ask about Quranic verses, dua etiquette, prophetic stories, daily worship, or Islamic values."
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
        <p v-if="chatError" class="ai-error">{{ chatError }}</p>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      chatDraft: '',
      chatHistory: [],
      chatLoading: false,
      chatError: null,
      sessionId: null,
      suggestedQuestions: [
        '🕌 What steps can I take to prepare for Jumuah prayer?',
        '📖 Explain one verse that highlights mercy in the Quran.',
        '🤲 How can I keep my dua consistent during exams?',
        '🌙 What practical tips help me benefit from Ramadan nights?',
        '📿 Recommend a short dhikr routine for busy days.',
        '🕋 Why is visiting the Prophet’s Mosque special?',
        '📜 Share a dua for starting a new project.',
        '📚 Where can I find authentic stories of the companions?',
        '🌗 How can I adapt worship during travel or busy weeks?',
        '📝 What are respectful ways to ask scholars about complex issues?',
        '🕊️ How do I practice patience during tough family moments?',
        '🧭 What principles help select reliable Islamic content online?',
        '🕌 How can I memorize a new surah efficiently?',
        '🪔 Tell me about a dua for seeking knowledge.',
        '🌟 What are uplifting reminders for kids before bedtime?',
      ],
    };
  },
  computed: {
    suggestionRows() {
      const rows = [];
      const perRow = Math.ceil(this.suggestedQuestions.length / 3);
      rows.push(
        ...[0, 1, 2].map((rowIndex) => {
          const start = rowIndex * perRow;
          const rowItems = this.suggestedQuestions.slice(start, start + perRow);
          if (!rowItems.length) return null;
          return {
            index: rowIndex,
            items: rowItems,
            loopItems: [...rowItems, ...rowItems],
          };
        }).filter(Boolean),
      );
      return rows;
    },
  },
  methods: {
    createChatEntry(role, text) {
      const now = new Date();
      return {
        role,
        text,
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
    scrollChatWindow() {
      this.$nextTick(() => {
        const container = this.$refs.chatShell || this.$refs.chatWindow;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
    async sendChatMessage() {
      if (this.chatLoading) return;
      const message = this.chatDraft.trim();
      if (!message) return;
      this.chatError = null;
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
        if (!response.ok) {
          throw new Error(responseData.error || 'Unable to get a response right now.');
        }
        const answer = (responseData.answer || '').trim();
        if (!answer) {
          throw new Error('The assistant did not return an answer. Please try again.');
        }
        this.chatHistory.push(this.createChatEntry('assistant', answer));
        this.scrollChatWindow();
      } catch (error) {
        console.error('Chat error:', error);
        this.chatError = error?.message || 'The assistant is temporarily unavailable.';
      } finally {
        this.chatLoading = false;
      }
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
    },
    resetSession() {
      this.sessionId = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
      return this.sessionId;
    },
    startNewChat() {
      this.chatHistory = [];
      this.chatDraft = '';
      this.chatError = null;
      this.resetSession();
    },
    clearHistory() {
      this.chatHistory = [];
      this.chatError = null;
      this.resetSession();
    },
  },
  mounted() {
    this.resetSession();
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
  font-size: 0.65rem;
  color: #3e7c7a;
  margin-bottom: 0.35rem;
}

.ai-title {
  font-size: clamp(1.85rem, 3vw, 2.6rem);
  margin: 0;
  color: #0f2632;
}

.ai-description {
  margin: 0.35rem 0 0;
  color: #4f6166;
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
  color: #0d4b4b;
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
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

.ai-control-btn.active {
  background: rgba(13, 182, 145, 0.12);
}

.ai-control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}


.ai-suggestions {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  min-height: 120px;
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
  color: #0f4d56;
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
  color: #0b4b4a;
  line-height: 1.5;
}

.ai-suggestions-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f5658;
  margin-bottom: 0.35rem;
}

.ai-suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  border-radius: 26px;
  padding: 0.75rem;
  background: #f9fdfd;
  border: 1px solid rgba(13, 182, 145, 0.15);
}

.ai-suggestion-row {
  overflow: hidden;
  border-radius: 999px;
  border: 1px solid rgba(13, 182, 145, 0.1);
  padding: 0.35rem 0.5rem;
  background: rgba(255, 255, 255, 0.9);
}

.ai-suggestion-track {
  display: flex;
  gap: 0.35rem;
  flex-wrap: nowrap;
  animation: trackScroll 30s linear infinite;
  animation-delay: calc(var(--row, 0) * -4s);
  will-change: transform;
  padding-bottom: 0.1rem;
  white-space: nowrap;
}

.ai-suggestion {
  border: 1px solid rgba(13, 182, 145, 0.35);
  border-radius: 999px;
  padding: 0.45rem 1rem;
  background: #fff;
  font-size: 0.92rem;
  color: #0b4a4f;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.3;
  flex: 0 0 auto;
  white-space: nowrap;
}

.ai-suggestion-text {
  width: 100%;
  white-space: nowrap;
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

@keyframes trackScroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
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
  min-height: 520px;
  max-height: 580px;
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
  font-size: 0.85rem;
  color: #425b5d;
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
  max-width: 78%;
  padding: 0.95rem 1rem;
  border-radius: 18px;
  position: relative;
  border: 1px solid rgba(13, 182, 145, 0.16);
  background: #fefefe;
  box-shadow: 0 6px 14px rgba(15, 111, 112, 0.08);
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
  font-size: 1rem;
  color: #13212b;
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
  font-size: 1rem;
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
  color: #4c5b5f;
  line-height: 1.3;
}

.ai-submit {
  align-self: flex-end;
  border: none;
  border-radius: 999px;
  padding: 0.9rem 2.5rem;
  font-size: 1rem;
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
  color: #0d4b4b;
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

.ai-error {
  color: #bb1e2d;
  font-size: 0.9rem;
  margin: 0;
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
