<template>
  <section class="ai-assistant">
    <div class="ai-shell">
      <header class="ai-header">
        <div>
          <p class="ai-eyebrow">AI Assistant</p>
          <h1>Noor</h1>
          <p class="ai-subtitle">
            Source-backed Islamic answers using QuranEnc, HadithEnc, and IslamHouse.
          </p>
        </div>
        <button
          type="button"
          class="ai-reset"
          :disabled="loading || !messages.length"
          @click="resetConversation">
          New chat
        </button>
      </header>

      <div class="ai-card">
        <div v-if="error" class="ai-error" role="alert">
          {{ error }}
        </div>

        <div v-if="!messages.length" class="ai-empty">
          <p class="ai-empty-title">Ask a focused Islamic question.</p>
          <p class="ai-empty-copy">
            Noor will prioritize Quran first, then Hadith, then IslamHouse scholarly content.
          </p>
          <div class="ai-prompt-grid">
            <button
              v-for="prompt in prompts"
              :key="prompt"
              type="button"
              class="ai-prompt"
              :disabled="loading"
              @click="usePrompt(prompt)">
              {{ prompt }}
            </button>
          </div>
        </div>

        <div v-else ref="messagesList" class="ai-messages" aria-live="polite">
          <article
            v-for="(message, index) in messages"
            :key="`${message.role}-${index}`"
            :class="['ai-message', `ai-message--${message.role}`]">
            <div class="ai-message-meta">
              <span>{{ message.role === 'assistant' ? 'Noor' : 'You' }}</span>
              <span v-if="message.role === 'assistant' && message.sourced === false" class="ai-badge ai-badge--fallback">
                Not directly sourced
              </span>
              <span v-else-if="message.role === 'assistant'" class="ai-badge">
                Source-backed
              </span>
            </div>

            <div class="ai-message-body" v-html="formatMessage(message.text)"></div>

            <section
              v-if="message.role === 'assistant' && message.references && message.references.length"
              class="ai-sources">
              <h2>Sources</h2>
              <ul>
                <li v-for="(reference, refIndex) in message.references" :key="`${index}-${refIndex}`">
                  <a
                    v-if="reference.url"
                    :href="reference.url"
                    target="_blank"
                    rel="noopener noreferrer">
                    {{ reference.label }}
                  </a>
                  <span v-else>{{ reference.label }}</span>
                  <small v-if="reference.hadithGrade"> · {{ reference.hadithGrade }}</small>
                </li>
              </ul>
            </section>
          </article>

          <article v-if="loading" class="ai-message ai-message--assistant">
            <div class="ai-message-meta">
              <span>Noor</span>
            </div>
            <div class="ai-message-body ai-message-body--loading">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </article>
        </div>

        <form class="ai-composer" @submit.prevent="send">
          <label class="sr-only" for="ai-question">Ask Noor</label>
          <textarea
            id="ai-question"
            ref="input"
            v-model="draft"
            rows="3"
            maxlength="1500"
            :disabled="loading"
            placeholder="Ask about a verse, hadith topic, ruling, or practical Islamic question."
            @keydown.enter.exact.prevent="send"></textarea>
          <div class="ai-composer-footer">
            <p>English only for this assistant.</p>
            <button type="submit" :disabled="loading || !draft.trim()">
              {{ loading ? 'Thinking...' : 'Send' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      draft: '',
      loading: false,
      error: '',
      sessionId: '',
      messages: [],
      prompts: [
        'What does the Quran say about patience in hardship?',
        'Share one hadith and one Quran verse about sincerity.',
        'What is the Islamic guidance on controlling anger?',
      ],
    };
  },
  methods: {
    async send() {
      const question = String(this.draft || '').trim();
      if (!question || this.loading) {
        return;
      }

      this.error = '';
      this.messages.push({
        role: 'user',
        text: question,
      });
      this.draft = '';
      this.scrollToBottom();

      this.loading = true;

      try {
        const response = await fetch('/api/ai/ask', {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': this.csrfToken(),
          },
          body: JSON.stringify({
            question,
            session_id: this.sessionId || null,
            language: 'en',
          }),
        });

        const payload = await this.parseResponse(response);

        if (!response.ok) {
          throw new Error(payload?.error || payload?.message || 'Unable to fetch an answer right now.');
        }

        this.sessionId = payload?.session_id || this.sessionId;
        this.messages.push({
          role: 'assistant',
          text: payload?.assistant?.message || 'No answer returned.',
          references: Array.isArray(payload?.assistant?.references) ? payload.assistant.references : [],
          sourced: Boolean(payload?.assistant?.sourced),
        });
      } catch (error) {
        this.error = error?.message || 'Unable to fetch an answer right now.';
      } finally {
        this.loading = false;
        this.scrollToBottom();
      }
    },
    resetConversation() {
      if (this.loading) {
        return;
      }
      this.messages = [];
      this.sessionId = '';
      this.error = '';
      this.draft = '';
      this.$nextTick(() => {
        if (this.$refs.input) {
          this.$refs.input.focus();
        }
      });
    },
    usePrompt(prompt) {
      this.draft = prompt;
      this.$nextTick(() => this.send());
    },
    csrfToken() {
      return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    },
    async parseResponse(response) {
      const text = await response.text();
      if (!text) {
        return {};
      }

      try {
        return JSON.parse(text);
      } catch (_) {
        return { message: text };
      }
    },
    formatMessage(text) {
      const escaped = this.escapeHtml(String(text || '').trim());
      if (!escaped) {
        return '';
      }

      return escaped
        .split(/\n{2,}/)
        .map((paragraph) => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
        .join('');
    },
    escapeHtml(value) {
      return value.replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      }[char]));
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const node = this.$refs.messagesList;
        if (node && typeof node.scrollTo === 'function') {
          node.scrollTo({ top: node.scrollHeight, behavior: 'smooth' });
        }
      });
    },
  },
};
</script>

<style scoped>
.ai-assistant {
  --ai-bg: linear-gradient(180deg, #f7f1e4 0%, #efe5d2 100%);
  --ai-card: rgba(255, 252, 246, 0.92);
  --ai-ink: #1d2420;
  --ai-muted: #5f695d;
  --ai-line: rgba(44, 59, 47, 0.12);
  --ai-accent: #1f5c45;
  --ai-accent-soft: rgba(31, 92, 69, 0.1);
  --ai-user: #173528;
  min-height: calc(100vh - 120px);
  padding: 2rem 1rem 3rem;
  background: var(--ai-bg);
}

.ai-shell {
  max-width: 920px;
  margin: 0 auto;
}

.ai-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.ai-eyebrow {
  margin: 0 0 0.35rem;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ai-muted);
}

.ai-header h1 {
  margin: 0;
  font-family: "Amiri", Georgia, serif;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1;
  color: var(--ai-ink);
}

.ai-subtitle {
  max-width: 38rem;
  margin: 0.5rem 0 0;
  color: var(--ai-muted);
}

.ai-reset {
  border: 1px solid var(--ai-line);
  background: rgba(255, 255, 255, 0.7);
  color: var(--ai-ink);
  border-radius: 999px;
  padding: 0.8rem 1rem;
  font-weight: 600;
}

.ai-card {
  background: var(--ai-card);
  border: 1px solid var(--ai-line);
  border-radius: 28px;
  padding: 1rem;
  backdrop-filter: blur(12px);
  box-shadow: 0 24px 60px rgba(31, 41, 35, 0.08);
}

.ai-error {
  margin-bottom: 1rem;
  border-radius: 18px;
  padding: 0.9rem 1rem;
  background: #fff3ef;
  color: #8b2d1a;
}

.ai-empty {
  padding: 1.25rem 0.25rem 1rem;
}

.ai-empty-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--ai-ink);
}

.ai-empty-copy {
  margin: 0.45rem 0 1rem;
  color: var(--ai-muted);
}

.ai-prompt-grid {
  display: grid;
  gap: 0.75rem;
}

.ai-prompt {
  text-align: left;
  border: 1px solid var(--ai-line);
  background: white;
  border-radius: 18px;
  padding: 0.95rem 1rem;
  color: var(--ai-ink);
}

.ai-messages {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 0.2rem;
  margin-bottom: 1rem;
}

.ai-message {
  border-radius: 22px;
  padding: 1rem;
  border: 1px solid var(--ai-line);
}

.ai-message--assistant {
  background: white;
}

.ai-message--user {
  margin-left: auto;
  max-width: min(90%, 38rem);
  background: var(--ai-user);
  color: #f7f3ea;
  border-color: transparent;
}

.ai-message-meta {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.7rem;
  font-size: 0.86rem;
  font-weight: 700;
}

.ai-message-body :deep(p) {
  margin: 0 0 0.8rem;
  line-height: 1.7;
}

.ai-message-body :deep(p:last-child) {
  margin-bottom: 0;
}

.ai-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.18rem 0.55rem;
  border-radius: 999px;
  background: var(--ai-accent-soft);
  color: var(--ai-accent);
  font-size: 0.72rem;
}

.ai-badge--fallback {
  background: rgba(180, 112, 23, 0.14);
  color: #9a5b10;
}

.ai-sources {
  margin-top: 1rem;
  padding-top: 0.9rem;
  border-top: 1px solid var(--ai-line);
}

.ai-sources h2 {
  margin: 0 0 0.6rem;
  font-size: 0.95rem;
  color: var(--ai-ink);
}

.ai-sources ul {
  margin: 0;
  padding-left: 1.1rem;
}

.ai-sources li {
  margin-bottom: 0.45rem;
  color: var(--ai-muted);
}

.ai-sources a {
  color: var(--ai-accent);
  text-decoration: none;
}

.ai-message-body--loading {
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;
}

.ai-message-body--loading span {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: var(--ai-accent);
  animation: ai-bounce 0.9s infinite ease-in-out;
}

.ai-message-body--loading span:nth-child(2) {
  animation-delay: 0.12s;
}

.ai-message-body--loading span:nth-child(3) {
  animation-delay: 0.24s;
}

.ai-composer {
  border-top: 1px solid var(--ai-line);
  padding-top: 1rem;
}

.ai-composer textarea {
  width: 100%;
  resize: vertical;
  min-height: 110px;
  border-radius: 20px;
  border: 1px solid var(--ai-line);
  padding: 1rem;
  background: rgba(255, 255, 255, 0.84);
  color: var(--ai-ink);
}

.ai-composer-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.9rem;
}

.ai-composer-footer p {
  margin: 0;
  color: var(--ai-muted);
  font-size: 0.86rem;
}

.ai-composer button {
  border: none;
  border-radius: 999px;
  padding: 0.85rem 1.2rem;
  font-weight: 700;
  background: var(--ai-accent);
  color: #fffef8;
}

.ai-reset:disabled,
.ai-prompt:disabled,
.ai-composer button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

@keyframes ai-bounce {
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  40% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .ai-assistant {
    padding: 1.25rem 0.75rem 2rem;
  }

  .ai-header,
  .ai-composer-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .ai-message--user {
    max-width: 100%;
  }
}
</style>
