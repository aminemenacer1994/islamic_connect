<template>
  <div>
    <!-- Floating Action Button (FAB) -->
    <button class="fab" @click="toggleChat">
      <i class="bi bi-chat-left-dots"></i>
    </button>

    <!-- Chatbox -->
    <div v-if="showChat" class="chatbox">
      <div class="chat-header">
        <span class="title">Islamic Q&A</span>
        <i class="bi bi-x-circle close-btn" @click="toggleChat"></i>
      </div>

      <!-- Chat Messages -->
      <div class="messages" ref="messagesContainer">
        <div v-for="(message, index) in chatHistory" :key="index" class="message">
          <div v-if="message.type === 'user'" class="user-message">
            <strong>You:</strong> {{ message.text }}
          </div>
          <div v-if="message.type === 'bot'" class="bot-message">
            <strong>Answer:</strong> {{ message.text }}
          </div>
        </div>
      </div>

      <!-- Input & Send Button -->
      <div class="input-container">
        <input v-model="question" placeholder="Ask an Islamic question..." class="input-box" :disabled="loading"/>
        <button @click="getAnswer" :disabled="loading || !question.trim()" class="button"> 
          {{ loading ? "Fetching..." : "Send" }} 
        </button>
      </div>

      <!-- Chat Actions -->
      <div class="chat-actions">
        <button @click="saveChat" v-if="chatHistory.length" class="action-button">Save Chat</button>
        <button @click="retrieveChat" class="action-button">Retrieve Chat</button>
        <button @click="clearChat" v-if="chatHistory.length" class="clear-button">Clear Conversation</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      question: "",
      loading: false,
      chatHistory: [],
      showChat: false,
    };
  },
  created() {
    this.retrieveChat(); // Load chat history when the page loads
  },
  methods: {
    toggleChat() {
      this.showChat = !this.showChat;
    },
    addMessage(type, text) {
      this.chatHistory.push({ type, text });
      this.saveChat(); // Auto-save after every message
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const messagesContainer = this.$refs.messagesContainer;
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      });
    },
    async getAnswer() {
      if (!this.question.trim()) return;
      this.addMessage("user", this.question);
      this.loading = true;
      const userQuestion = this.question;
      this.question = "";

      try {
        const response = await fetch("https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.apiToken}` },
          body: JSON.stringify({ inputs: userQuestion, parameters: { max_new_tokens: 600 } }),
        });

        if (!response.ok) throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        let answerText = data[0]?.generated_text?.trim() || "Sorry, I couldn't find an answer.";

        if (answerText.toLowerCase().startsWith(userQuestion.toLowerCase())) {
          answerText = answerText.slice(userQuestion.length).trim();
        }

        this.addMessage("bot", answerText);
      } catch (err) {
        this.addMessage("bot", "Failed to fetch the answer. Please try again.");
        console.error(err);
      } finally {
        this.loading = false;
        this.scrollToBottom();
      }
    },
    saveChat() {
      localStorage.setItem("chatHistory", JSON.stringify(this.chatHistory));
    },
    retrieveChat() {
      const savedChat = localStorage.getItem("chatHistory");
      if (savedChat) {
        this.chatHistory = JSON.parse(savedChat);
      }
    },
    clearChat() {
      this.chatHistory = [];
      localStorage.removeItem("chatHistory");
    },
  },
};
</script>


<style scoped>
/* Floating Action Button (FAB) */
.fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 50%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  font-size: 24px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.fab:hover {
  background-color: #218838;
}

/* Chatbox Styles */
.chatbox {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 300px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 400px;
}

.chat-header {
  background-color: #28a745;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  cursor: pointer;
}

/* Messages Container */
.messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  max-height: 300px;
}

/* User and Bot Messages */
.user-message {
  background: #d4edda;
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 5px;
}

.bot-message {
  background: #f8d7da;
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 5px;
}

/* Input and Send Button */
.input-container {
  display: flex;
  padding: 10px;
  background: #fff;
}

.input-box {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button {
  background-color: #28a745;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  margin-left: 5px;
  border-radius: 5px;
}

.button:disabled {
  background-color: #ccc;
}

/* Chat Actions */
.chat-actions {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background: #fff;
}

.action-button {
  background: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.clear-button {
  background: #dc3545;
  color: white;
  padding: 5px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>
