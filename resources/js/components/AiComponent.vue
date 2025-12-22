<template>
  <section  aria-label="Islamic chatbot">
    <div class="ai-panel">
      <span class="ai-panel-orb" aria-hidden="true"></span>
      <header class="ai-header">
        <div>
          <p class="ai-label">AI guidance</p>
          <h2 class="ai-title">Ask trusted Islamic questions</h2>
          <p class="ai-description">
            This open-source chatbot stays within Islamic teachings, referencing the Quran, Sunnah, and respected scholarship.
          </p>
          <div class="ai-meta-chips">
            <span>Quran &amp; Sunnah</span>
            <span>Guided by scholars</span>
            <span>No speculation</span>
          </div>
        </div>
      </header>

      <div ref="chatWindow" class="ai-chat-window" role="log" aria-live="polite">
        
        <article
          v-for="(entry, idx) in chatHistory"
          :key="`chat-${idx}-${entry.role}`"
          class="chat-bubble"
          :class="entry.role"
        >
          <div class="chat-bubble-meta">
            <strong>{{ entry.role === 'assistant' ? 'Scholar Bot' : 'You' }}</strong>
            <small v-if="entry.displayTime">{{ entry.displayTime }}</small>
          </div>
          <p>{{ entry.text }}</p>
        </article>
      </div>

      <form class="ai-form" @submit.prevent="sendChatMessage">
        <label class="visually-hidden" for="aiChatInput">Ask the chatbot</label>
        <textarea
          id="aiChatInput"
          v-model="chatDraft"
          class="ai-textarea"
          rows="2"
          placeholder="Ask about Quranic verses, dua etiquette, prophetic stories, daily worship, or Islamic values."
          :disabled="chatLoading"
        ></textarea>
        <div class="ai-form-meta">
          <small>
            The assistant declines off-topic, inappropriate, or speculative prompts and keeps answers rooted in Islamic sources.
          </small>
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
    };
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
  },
};
</script>

<style scoped>
.ai-section {
  min-height: 520px;
  padding: 2.75rem 1.25rem 2rem;
  background: radial-gradient(circle at 18% 30%, rgba(13, 182, 145, 0.12), transparent 55%),
    radial-gradient(circle at 82% 5%, rgba(9, 112, 138, 0.09), transparent 50%),
    #f3f8fb;
  display: flex;
  justify-content: center;
  width: 100%;
}

.ai-panel {
  width: min(1050px, 100%);
  background: #ffffff;
  border-radius: 36px;
  padding: 2rem;
  box-shadow: 0 20px 50px rgba(6, 40, 61, 0.18);
  border: 1px solid rgba(11, 98, 102, 0.11);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: relative;
  overflow: hidden;
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
  max-height: 330px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-radius: 22px;
  background: #f7fbfd;
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
