<template>
  <div class="container">
    <!-- Floating Action Button (FAB) with icon -->
    <button class="fab" @click="toggleChat">
      <i class="bi bi-chat-left-text-fill"></i>
    </button>

    <!-- Chatbox that opens when FAB is clicked -->
    <div v-if="showChat" class="chatbox" :class="{ expanded: isExpanded }"
      style="box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px; border: 2px solid #0db691; border-radius: 8px;">
      <div class="chat-header">
        <span class="title">Islamic Connect AI Assistant</span>
        <div class="header-buttons">
          <i @click="toggleExpand" class="expand-btn mr-2"
            :class="isExpanded ? 'bi bi-arrows-angle-contract' : 'bi bi-arrows-angle-expand'"></i>
          <i @click="toggleChat" class="close-btn bi bi-x-circle"></i>
        </div>
      </div>

      <!-- Common Islamic Questions (Fixed at the Top) -->
      <div class="common-questions-container">
        <div class="common-questions">
          <div class="question-row">
            <button v-for="(question, index) in commonQuestions.slice(0, 5)" :key="index"
              @click="autoSendQuestion(question)" class="question-btn">
              {{ question }}
            </button>

            <button v-for="(question, index) in commonQuestions.slice(5)" :key="index + 5"
              @click="autoSendQuestion(question)" class="question-btn">
              {{ question }}
            </button>
          </div>
        </div>
      </div>

      <!-- Chat History: Display questions and answers -->
      <div class="messages" ref="messagesContainer">
        <div v-for="(message, index) in chatHistory" :key="index" class="message">
          <div v-if="message.type === 'user'" class="user-message">
            <strong class="text-left">You:</strong> {{ message.text }}
            <button @click="editQuestion(index)" class="edit-button text-left">
              <i class="bi bi-pencil"></i> Edit Question
            </button>
          </div>
          <div v-if="message.type === 'bot'" class="bot-message">
            {{ message.text }}
          </div>
        </div>
      </div>

      <!-- Input and Button for asking new questions (placed side by side using flex) -->
      <div class="input-container">
        <input v-model="question" placeholder="What do you want to know about islam ?" class="input-box"
          :disabled="loading" />
        <button @click="getAnswer" :disabled="loading || !question.trim()" class="button" style="background: #0db691;">
          {{ loading ? "Fetching..." : "Send" }}
        </button>
      </div>

      <!-- Clear Button -->
      <button @click="clearChat" v-if="chatHistory.length" class="clear-button">
        Clear Conversation
      </button>

      <div v-if="loading" class="loading">Fetching response...</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      question: "",
      loading: false,
      chatHistory: [], // Store the entire conversation history
      showChat: false, // Flag to toggle chat visibility
      isExpanded: false, // Flag to toggle expanded state
      apiToken: process.env.HF_API_KEY || "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", // API token
      editingIndex: null, // Track the index of the message being edited
      defaultMessage: { type: "bot", text: "Assalamu Alaikum! How can I assist you with Islamic knowledge today?" },
      commonQuestions: [
        "What are the Five Pillars of Islam?",
        "What is the significance of Ramadan?",
        "Who is Prophet Muhammad (PBUH)?",
        "What is the Quran?",
        "What is the importance of Salah (prayer)?",
        "What is Zakat and who is it for?",
        "What is Hajj and why is it important?",
        "What is the meaning of Tawheed?",
        "What are the major sins in Islam?",
        "What is the Day of Judgment in Islam?",
      ],
    };
  },
  methods: {
    // Toggles the visibility of the chatbox
    toggleChat() {
      this.showChat = !this.showChat;
      this.isExpanded = false; // Reset expanded state when toggling chat

      // Add a default message when opening the chat for the first time
      if (this.showChat && this.chatHistory.length === 0) {
        this.addMessage("bot", "Assalamu Alaikum! How can I assist you with Islamic knowledge today?");
      }
    },
    // Toggles the expanded state of the chatbox
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },

    // Auto-send a common question
    autoSendQuestion(question) {
      this.question = question;
      this.getAnswer();
    },

    // Adds a message to the chat history
    addMessage(type, text) {
      this.chatHistory.push({ type, text });
    },

    // Scroll to the latest message and always keep it at the bottom
    scrollToBottom() {
      const messagesContainer = this.$refs.messagesContainer;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },

    // Edit a question
    editQuestion(index) {
      this.question = this.chatHistory[index].text; // Load the question into the input field
      this.editingIndex = index; // Track which message is being edited
    },

    async getAnswer() {
      if (!this.question.trim()) {
        return; // Don't fetch if the question is empty
      }

      // If editing, remove the old bot response and update the question
      if (this.editingIndex !== null) {
        // Remove the bot's response that follows the edited question
        if (this.chatHistory[this.editingIndex + 1]?.type === 'bot') {
          this.chatHistory.splice(this.editingIndex + 1, 1); // Remove the bot's response
        }
        // Update the user's question
        this.chatHistory[this.editingIndex].text = this.question;
        this.editingIndex = null; // Reset editing state
      } else {
        // Add user question to chat history
        this.addMessage('user', this.question);
      }

      this.loading = true;
      const userQuestion = this.question;
      this.question = ""; // Clear input field

      try {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.apiToken}`,
            },
            body: JSON.stringify({
              inputs: userQuestion,
              parameters: { max_new_tokens: 600 },
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
          let answerText = data[0].generated_text.trim();

          // Remove the question from the answer if included
          if (answerText.toLowerCase().startsWith(userQuestion.toLowerCase())) {
            answerText = answerText.slice(userQuestion.length).trim();
          }

          // Add bot's response to chat history
          this.addMessage('bot', answerText);
        } else {
          // If no answer is found
          this.addMessage('bot', "Sorry, I couldn't find an answer. Try rephrasing your question.");
        }
      } catch (err) {
        this.addMessage('bot', "Failed to fetch the answer. Please try again.");
        console.error(err);
      } finally {
        this.loading = false;
        this.scrollToBottom(); // Scroll to the latest answer
      }
    },

    // Clears the entire chat history
    clearChat() {
      this.chatHistory = [];
    },
  },

  watch: {
    // Automatically scroll to bottom when a new message is added
    chatHistory() {
      this.$nextTick(this.scrollToBottom);
    }
  },
};
</script>
<style scoped>
/* Hide scrollbar for Chrome, Safari, and Opera */
.messages::-webkit-scrollbar,
.common-questions::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge, and Firefox */
.messages,
.common-questions {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.container {
  position: relative;
  padding: 20px;
}

.fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
  color: white;
  font-size: 30px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

.fab:hover {
  background-color: #0a8a72;
}

.fab i {
  font-size: 24px;
}

.chatbox {
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 90%;
  max-width: 500px;
  height: 70%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 999;
  overflow-y: auto;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.chatbox.expanded {
  max-width: 75%;
  width: 75%;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3em;
  font-weight: bold;
  margin-bottom: 15px;
}

.header-buttons {
  display: flex;
  gap: 10px;
}

.expand-btn,
.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
}

.expand-btn:hover,
.close-btn:hover {
  color: #0db691;
}

.common-questions-container {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.common-questions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-x: auto;
}

.question-row {
  display: flex;
  gap: 10px;
  padding-bottom: 10px;
}

.question-btn {
  flex: 0 0 auto;
  padding: 8px 12px;
  border: none;
  background-color: #0db691;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.9em;
  white-space: nowrap;
}

.question-btn:hover {
  background-color: #0a8a72;
}

.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
}

.message {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}

.user-message,
.bot-message {
  padding: 10px 15px;
  border-radius: 5px;
  max-width: 80%;
  word-wrap: break-word;
}

.user-message {
  background-color: #f1f1f1;
  align-self: flex-end;
  text-align: left;
}

.bot-message {
  background-color: #0a8a72;
  color: white;
  align-self: flex-start;
}

.input-container {
  position: sticky;
  bottom: 0;
  background-color: #fff;
  padding-top: 10px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
}

.input-box {
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 98%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.button {
  padding: 8px 12px;
  border: none;
  background-color: #0a8a72;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.button:disabled {
  background-color: #d6d6d6;
  cursor: not-allowed;
}

.clear-button {
  padding: 8px 10px;
  border: none;
  background-color: #ff4d4d;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  margin-top: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.loading {
  margin-top: 10px;
  font-size: 1.1em;
  color: #555;
}

.edit-button {
  text-align: right;
  padding: 4px 8px;
  background-color: #0db691;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8em;
}

.edit-button:hover {
  background-color: #0a8a72;
}

@media (max-width: 600px) {
  .chatbox {
    width: 100vw !important;
    /* Full viewport width */
    height: 100vh !important;
    /* Full viewport height */
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0 !important;
    /* Remove border-radius */
    z-index: 9999 !important;
    /* Ensure it appears above everything */
  }

  .chat-header {
    border-radius: 0 !important;
    /* Remove rounded corners */
  }

  .messages {
    max-height: calc(100vh - 160px);
    /* Adjust height dynamically */
    overflow-y: auto;
  }


  .expand-btn {
    display: none !important;
  }


  .fab {
    width: 50px;
    height: 50px;
    /* font-size: 20px; */
  }

  .input-container {
    flex-direction: column;
    gap: 5px;
  }

  .user-message,
  .bot-message {
    max-width: 100%;
  }
}
</style>