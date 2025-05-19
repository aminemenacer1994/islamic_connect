<template>
  <div class="chat-container">
    <!-- Chatbot Header -->
    <div class="chat-header">
      <h5>Islamic AI Assistant</h5>
      <button @click="clearChat" class="clear-btn">Clear</button>
    </div>

    <!-- Chatbox Area -->
    <div class="chat-box" ref="chatBox">
      <div v-for="(message, index) in chatMessages" :key="index" class="message">
        <div :class="message.sender === 'user' ? 'user-message' : 'ai-message'">
          <p>{{ message.text }}</p>
        </div>
      </div>

      <!-- Loading Indicator -->
      <div v-if="loading" class="loading">
        <div class="loader"></div>
        <span class="loading-text">Typing...</span>
      </div>
    </div>

    <!-- Input Area -->
    <div class="input-container">
      <input
        v-model="userInput"
        @keydown.enter="sendMessage"
        type="text"
        class="input-field"
        placeholder="Ask a question..."
        :disabled="loading"
      />
      <button @click="sendMessage" class="send-btn" :disabled="loading">Send</button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      userInput: "",
      chatMessages: [],
      loading: false,
      error: null,
      modelAPI: "https://api-inference.huggingface.co/models/llmQnA/bert-large-uncased-whole-word-masking-finetuned-squad", 
      apiToken: "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", 
    };
  },
  methods: {
    async sendMessage() {
      if (!this.userInput.trim()) return;

      this.addMessage("user", this.userInput);
      const userQuestion = this.userInput;
      this.userInput = "";
      this.loading = true;

      try {
        const response = await fetch(this.modelAPI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiToken}`,
          },
          body: JSON.stringify({
            inputs: userQuestion,
            parameters: {
              max_new_tokens: 200,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        const output =
          Array.isArray(data) && data[0]?.generated_text
            ? data[0].generated_text
            : data?.generated_text || "Sorry, I couldn't generate a response.";

        this.addMessage("bot", output.trim());
      } catch (err) {
        console.error("Fetch Error:", err);
        this.addMessage("bot", "An error occurred while fetching the answer. Please try again later.");
      } finally {
        this.loading = false;
        this.scrollToBottom();
      }
    },

    addMessage(sender, text) {
      this.chatMessages.push({ sender, text });
    },

    clearChat() {
      this.chatMessages = [];
      this.error = null;
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const chatBox = this.$refs.chatBox;
        if (chatBox) {
          chatBox.scrollTop = chatBox.scrollHeight;
        }
      });
    },

    getErrorMessage(error) {
      if (error.response) {
        switch (error.response.status) {
          case 429:
            return "Rate limit exceeded. Please wait a minute and try again.";
          case 503:
            return "Model is currently loading. Please try again in a moment.";
          default:
            return "Sorry, there was an error processing your request.";
        }
      } else if (error.request) {
        return "Network error. Please check your connection.";
      } else {
        return "An unexpected error occurred.";
      }
    },
  },
};
</script>

<style scoped>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f4f8;
  color: #333;
  line-height: 1.6;
}

/* Chat Container */
.chat-container {
  max-width: 1200px;
  margin: 50px auto;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 80vh;
  overflow: hidden;
}

/* Header */
.chat-header {
  background-color: #00796b;
  color: #fff;
  padding: 20px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  position: relative;
}

.clear-btn {
  position: absolute;
  right: 20px;
  top: 15px;
  background-color: #ff5722;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

.clear-btn:hover {
  background-color: #e64a19;
}

/* Chatbox Area */
.chat-box {
  flex-grow: 1;
  padding: 20px;
  background-color: #fafafa;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: all 0.3s ease;
}

.message {
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
}

.user-message {
  align-self: flex-end;
  background-color: #00796b;
  color: white;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  transition: transform 0.2s ease-in-out;
}

.ai-message {
  align-self: flex-start;
  background-color: #eceff1;
  color: #00796b;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  transition: transform 0.2s ease-in-out;
}

.message:hover {
  transform: translateY(-5px);
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-size: 16px;
  color: #00796b;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #00796b;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  margin-left: 10px;
}

/* Input and Button */
.input-container {
  display: flex;
  padding: 20px;
  background-color: #fff;
  border-top: 1px solid #ddd;
  gap: 10px;
}

.input-field {
  flex-grow: 1;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 25px;
  background-color: #f5f5f5;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #00796b;
  outline: none;
}

.input-field:disabled {
  background-color: #f0f0f0;
}

.send-btn {
  background-color: #00796b;
  color: white;
  padding: 12px 18px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  width: 80px;
  transition: background-color 0.3s ease;
}

.send-btn:disabled {
  background-color: #bbb;
}

.send-btn:hover {
  background-color: #004d40;
}

/* Responsive Design */
@media (max-width: 600px) {
  .chat-container {
    width: 98%;
    height: 80vh;
  }

  .clear-btn {
    top: 10px;
    right: 10px;
  }

  .input-container {
    padding: 15px;
  }

  .input-field {
    font-size: 14px;
  }

  .send-btn {
    font-size: 14px;
  }
}
</style>
