<template>
  <section  aria-label="Islamic chatbot">
    <div >
      <header >
        <div>
          <h2 class="fw-bold">Ask trusted Islamic questions</h2>
          <p class="ai-description">
            This open-source chatbot stays within Islamic teachings, referencing the Quran, Sunnah, and respected scholarship.
          </p>
          
        </div>
      </header>

      <div v-if="chatHistory.length === 0" class="ai-welcome">
        <p class="ai-welcome-title">Salaam! I'm Scholar Bot.</p>
        <p class="ai-welcome-copy">
          Ask about Quranic reflections, dua habits, or everyday worship—I'll respond gently with sources that comfort
          and guide your journey.
        </p>
      </div>

      <div class="ai-suggestions" aria-label="Suggested questions">
        <h6 class="ai-suggestions-label fw-bold">Need inspiration?</h6>
        <div class="ai-suggestions-list">
          <div
            v-for="row in suggestionRows"
            :key="`row-${row.index}`"
            class="ai-suggestion-row"
            :style="{ '--row': row.index }"
          >
            <div class="ai-suggestion-track">
              <button
                v-for="(question, idx) in row.loopItems"
                :key="`row-${row.index}-${idx}-${question}`"
                type="button"
                class="ai-suggestion"
                @click="selectSuggestedQuestion(question)"
                :disabled="chatLoading"
              >
                <span class="ai-suggestion-text">{{ question }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div ref="chatWindow" class="ai-chat-window" role="log" aria-live="polite">
        
        <article
          v-for="(entry, idx) in chatHistory"
          :key="`chat-${idx}-${entry.role}`"
          :class="entry.role"
        >
          <div >
            <strong>{{ entry.role === 'assistant' ? 'Scholar Bot' : 'You' }}</strong>
            <small v-if="entry.displayTime">{{ entry.displayTime }}</small>
          </div>
          <p>{{ entry.text }}</p>
        </article>
      </div>

      <form  @submit.prevent="sendChatMessage">
        <label class="visually-hidden" for="aiChatInput">Ask the chatbot</label>
        <textarea
          id="aiChatInput"
          ref="aiChatInput"
          v-model="chatDraft"
          class="ai-textarea"
          rows="2"
          placeholder="Ask about Quranic verses, dua etiquette, prophetic stories, daily worship, or Islamic values."
          :disabled="chatLoading"
        ></textarea>
        <div class="ai-form-meta pt-2 text-muted">
          <medium>
            The assistant declines off-topic, inappropriate, or speculative prompts and keeps answers rooted in Islamic sources.
          </medium>
          <button
            type="submit"
            class="ai-submit"
            :disabled="chatLoading || !chatDraft.trim()"
          >
            <span v-if="chatLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span>{{ chatLoading ? 'Thinking...' : 'Ask the bot' }}</span>
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
      };
    },
    getConversationForRequest() {
      return this.chatHistory.slice(-6).map((entry) => ({
        role: entry.role,
        content: entry.text,
      }));
    },
    scrollChatWindow() {
      this.$nextTick(() => {
        const container = this.$refs.chatWindow;
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
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (!csrfToken) {
          throw new Error('Unable to send the question right now.');
        }
        const response = await fetch('/ai/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
          },
          body: JSON.stringify(payload),
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
        const textarea = this.$refs.aiChatInput;
        if (textarea) {
          textarea.focus();
        }
      });
    },
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

.ai-suggestions {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.ai-welcome {
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, rgba(13, 182, 145, 0.08), rgba(255, 255, 255, 0.95));
  border-radius: 20px;
  border: 1px solid rgba(13, 182, 145, 0.2);
  box-shadow: 0 12px 25px rgba(15, 111, 112, 0.12);
  color: #0f4d56;
  text-align: center;
}

.ai-welcome-title {
  font-weight: 600;
  margin-bottom: 0.35rem;
  color: #0f5f5f;
}

.ai-welcome-copy {
  margin: 0;
  line-height: 1.6;
  font-size: 0.95rem;
  color: #0b4a4e;
}

.ai-welcome {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 18px;
  border: 1px solid rgba(13, 182, 145, 0.2);
  box-shadow: 0 10px 30px rgba(13, 182, 145, 0.08);
  font-size: 0.95rem;
  color: #0f4d56;
  line-height: 1.6;
  text-align: center;
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
  gap: 0.5rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(218, 240, 235, 0.9));
  border-radius: 28px;
  padding: 1rem;
  box-shadow:
    0 10px 20px rgba(15, 111, 112, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.6);
}

.ai-suggestion-row {
  overflow: hidden;
  border-radius: 999px;
  border: 1px solid rgba(13, 182, 145, 0.15);
  padding: 0.45rem 0.65rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}
.ai-suggestion-row {
  overflow: hidden;
  border-radius: 999px;
  border: 1px solid rgba(13, 182, 145, 0.08);
  padding: 0.25rem 0.45rem;
}

.ai-suggestion-track {
  display: flex;
  gap: 0.35rem;
  flex-wrap: nowrap;
  animation: trackScroll 30s linear infinite;
  animation-delay: calc(var(--row, 0) * -4s);
  will-change: transform;
  padding-bottom: 0.1rem;
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

.ai-chat-window {
  max-height: 360px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-radius: 22px;
  /* background: #f7fbfd; */
  border: 1px solid rgba(13, 182, 145, 0.08);
  padding: 1.25rem;
  position: relative;
  z-index: 1;
}

.ai-chat-window::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px solid rgba(13, 182, 145, 0.03);
  pointer-events: none;
}

.ai-chat-window::-webkit-scrollbar {
  width: 6px;
}

.ai-chat-window::-webkit-scrollbar-thumb {
  background: rgba(13, 182, 145, 0.5);
  border-radius: 4px;
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
  background: rgba(13, 182, 145, 0.2);
  border-color: rgba(13, 182, 145, 0.42);
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
  flex-direction: column;
  gap: 0.45rem;
  align-items: stretch;
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
