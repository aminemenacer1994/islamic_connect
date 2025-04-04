<template>
  <div class="container">
    <!-- Floating Action Button (FAB) with icon -->
    <button class="fab" @click="toggleChat" v-show="!showChat || isDesktop">
      <i class="bi bi-chat-left-text-fill"></i>
    </button>

    <!-- Chatbox that opens when FAB is clicked -->
    <div v-if="showChat" class="chatbox" :class="{ expanded: isExpanded }"
      style="box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;">
      <div class="chat-header">
        <span class="title">Islamic Connect AI Assistant</span>
        <div class="header-buttons">
          <i @click="toggleExpand" class="expand-btn pr-2"
            :class="isExpanded ? 'bi bi-arrows-angle-contract' : 'bi bi-arrows-angle-expand'"></i>
          <i @click="downloadChat" class="download-btn bi bi-download pr-2" title="Download Chat"></i>
          <i @click="toggleChat" class="close-btn bi bi-x-circle-fill"></i>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="chat-content" style="display: flex; flex-direction: column; flex: 1; overflow: hidden;">
        <!-- Common Islamic Questions (Fixed at the Top) -->
        <div class="common-questions-container">
          <div class="common-questions">
            <div class="question-row">
              <div v-for="(question, index) in commonQuestions" :key="index" class="question-wrapper">
                <button @click="autoSendQuestion(question)" class="question-btn">
                  {{ question }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat History: Display questions and answers -->
        <div class="messages" ref="messagesContainer" style="flex: 1; overflow-y: auto; margin-bottom: 10px;">
          <div v-for="(message, index) in chatHistory" :key="index" class="message">

            <!-- User Question -->
            <div v-if="message.type === 'user'" class="user-message">
              <div class="d-flex align-items-center gap-2">
                <strong class="text-left">You:</strong>
                <span>{{ message.text }}</span>
              </div>
              <div class="d-flex align-items-center gap-2 mt-2">
                <span class="timestamp" style="color: black;">{{ message.timestamp }}</span>
                <button @click="editQuestion(index)" class="btn btn-secondary btn-sm">
                  <i class="bi bi-pencil"></i> Edit Question
                </button>
              </div>
            </div>

            <!-- Bot Answer -->
            <div v-if="message.type === 'bot'" class="bot-message">
              <p>{{ message.text }}</p>
              <span class="timestamp">{{ message.timestamp }}</span>
              <div class="d-flex justify-content-between align-items-center container">
                <button @click="shareOnWhatsApp(index)" class="btn btn-light btn-md">
                  <i class="bi bi-whatsapp"></i> Share
                </button>
                <button @click="copyQuestionAndAnswer(index)" class="btn btn-light btn-md">
                  <i class="bi bi-clipboard"></i> Copy
                </button>
                <button @click="speakText(message.text)" class="btn btn-light btn-md">
                  <i class="bi bi-volume-up"></i> Listen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input and Button for asking new questions -->

      <div class="input-container" style="display: flex; gap: 10px; align-items: center; padding: 10px;">
        <input v-model="question" placeholder="What do you want to know about Islam?" class="input-box"
          :disabled="loading" style="flex: 1; padding: 8px;" />
        <!-- <button @click="startSpeechRecognition" class="mic-btn" :disabled="loading">
          <i class="bi bi-mic"></i>
        </button> -->
      </div>
      <div class="d-flex gap-2 flex-wrap" style="padding: 0 10px 10px;">
        <button @click="getAnswer" :disabled="loading || !question.trim()" class="btn btn-success flex-grow-1"
          style="min-width: 120px;">
          {{ loading ? "Fetching..." : "Send" }}
        </button>

        <!-- Clear Button -->
        <button @click="clearChat" v-if="chatHistory.length" class="btn btn-danger flex-grow-1"
          style="min-width: 120px;">
          Clear Conversation
        </button>
      </div>
      <p style="color:black;" class="text-center">Islamic connect AI can make mistakes. Check important info.</p>

      <div v-if="loading" class="loading">Fetching response...</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDesktop: window.innerWidth >= 768,
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
    handleResize() {
      this.isDesktop = window.innerWidth >= 768;
    },
    // Save chat history to localStorage
    saveChat() {
      const chatName = prompt('Enter a name for this conversation:');
      if (chatName) {
        const savedChats = JSON.parse(localStorage.getItem('savedChats') || {})
        savedChats[chatName] = this.chatHistory;
        localStorage.setItem('savedChats', JSON.stringify(savedChats));
        alert('Chat saved successfully!');
      } else {
        alert('Please provide a name for the conversation.');
      }
    },
    // Retrieve a list of saved conversations
    getSavedChats() {
      const savedChats = JSON.parse(localStorage.getItem('savedChats') || {})
      return Object.keys(savedChats);
    },
    // Download chat history as a text file
    downloadChat() {
      const chatText = this.chatHistory
        .map((message) => `${message.timestamp} - ${message.type === 'user' ? 'Question: ' : 'Answer: '}: ${message.text}`)
        .join('\n');

      // Generate a filename with the current date and time
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 10); // YYYY-MM-DD
      const formattedTime = now.toTimeString().slice(0, 8).replace(/:/g, '-'); // HH-MM-SS
      const fileName = `chat_history_${formattedDate}_${formattedTime}.txt`;

      const blob = new Blob([chatText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName; // Use the generated filename
      a.click();
      URL.revokeObjectURL(url);
    },
    // Load chat history from localStorage
    loadChat(chatName) {
      const savedChats = JSON.parse(localStorage.getItem('savedChats') || {})
      if (savedChats[chatName]) {
        this.chatHistory = savedChats[chatName];
        alert(`Chat "${chatName}" loaded successfully!`);
      } else {
        alert('No saved chat found with that name.');
      }
    },
    // Copy question and answer to clipboard
    copyQuestionAndAnswer(index) {
      if (index > 0 && this.chatHistory[index - 1].type === 'user') {
        const question = this.chatHistory[index - 1].text;
        const answer = this.chatHistory[index].text;
        const textToCopy = `Question: ${question}\nAnswer: ${answer}`;

        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            alert('Copied to clipboard!');
          })
          .catch((err) => {
            console.error('Failed to copy:', err);
            alert('Failed to copy. Please try again.');
          });
      } else {
        alert('No question found to copy.');
      }
    },
    // Share question and answer on WhatsApp
    shareOnWhatsApp(index) {
      const questionIndex = index - 1;

      if (questionIndex >= 0 && this.chatHistory[questionIndex].type === 'user') {
        const question = this.chatHistory[questionIndex].text;
        const answer = this.chatHistory[index].text;

        // Format the message
        const message = `Question: ${question}\nAnswer: ${answer}`;

        // Encode the message for the WhatsApp URL
        const encodedMessage = encodeURIComponent(message);

        // Generate the WhatsApp share link
        const whatsappURL = `https://api.whatsapp.com/send?text=${encodedMessage}`;

        // Open the link in a new tab
        window.open(whatsappURL, "_blank");
      } else {
        console.warn("Invalid message index for sharing.");
      }
    },
    // Initialize Speech Recognition
    startSpeechRecognition() {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = 'en-US'; // Set language
        recognition.interimResults = false; // Only final results
        recognition.maxAlternatives = 1; // Only one result

        // Start recognition
        recognition.start();

        // Handle result event
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          this.question = transcript; // Set the recognized text to the input field
        };

        // Handle error event
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          alert('Speech recognition failed. Please try again.');
        };

        // Handle end event
        recognition.onend = () => {
          console.log('Speech recognition ended.');
        };
      } else {
        alert('Speech recognition is not supported in this browser.');
      }
    },
    // Text-to-Speech for bot answers
    speakText(text) {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; // Set language (optional)
        utterance.rate = 1; // Speed of speech (optional)
        utterance.pitch = 1; // Pitch of speech (optional)
        window.speechSynthesis.speak(utterance); // Speak the text
      } else {
        console.warn('Text-to-Speech is not supported in this browser.');
      }
    },

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
      const timestamp = new Date().toLocaleString(); // Get current date and time
      this.chatHistory.push({ type, text, timestamp }); // Add timestamp to the message
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
        if (this.chatHistory[this.editingIndex + 1]?.type === "bot") {
          this.chatHistory.splice(this.editingIndex + 1, 1);
        }
        this.chatHistory[this.editingIndex].text = this.question;
        this.editingIndex = null;
      } else {
        this.addMessage("user", this.question);
      }

      this.loading = true;
      const userQuestion = this.question;
      this.question = "";

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
              parameters: {
                max_new_tokens: 1800, // Enough for ~1000+ words
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
          let answerText = data[0].generated_text.trim();

          // Remove the original question from the beginning of the answer
          if (answerText.toLowerCase().startsWith(userQuestion.toLowerCase())) {
            answerText = answerText.slice(userQuestion.length).trim();
          }

          // Clean up response
          answerText = answerText
            .replace(/[^\w\s.,!?()'"-]/g, "")       // Remove unwanted characters
            .replace(/\n\s*\n/g, "\n")              // Remove excessive line breaks
            .replace(/(\w)([.!?])(\w)/g, "$1$2 $3") // Ensure spacing after punctuation
            .trim();

          // Remove trailing question mark if it ends with one
          if (answerText.endsWith("?")) {
            answerText = answerText.slice(0, -1).trim();
          }

          // Add line breaks for better readability
          answerText = answerText.replace(/(.{100,120})\s/g, "$1\n");

          this.addMessage("bot", answerText);
        } else {
          this.addMessage("bot", "Sorry, I couldn't find an answer. Try rephrasing your question.");
        }
      } catch (err) {
        this.addMessage("bot", "An error occurred while fetching the answer. Please try again later.");
        console.error("Fetch Error:", err);
      } finally {
        this.loading = false;
        this.scrollToBottom();
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
.header-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.save-btn,
.download-btn,
.load-btn {
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 1em;
}

.save-btn:hover,
.download-btn:hover,
.load-btn:hover {
  color: #0db691;
}

.copy-btn {
  background-color: #0db691;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.8em;
  margin-top: 5px;
}

.copy-btn:hover {
  background-color: #0a8a72;
}

.whatsapp-btn {
  background-color: #25d366;
  /* WhatsApp green */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.8em;
  margin-top: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.whatsapp-btn:hover {
  background-color: #128c7e;
  /* Darker WhatsApp green */
}

.mic-btn {
  background-color: #0db691;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mic-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.mic-btn:hover:not(:disabled) {
  background-color: #0a8a72;
}

.tts-btn {
  background-color: #0db691;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.8em;
  margin-top: 5px;
}

.tts-btn:hover {
  background-color: #0a8a72;
}

.tts-btn {
  background-color: #0db691;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.8em;
  margin-top: 5px;
}

.tts-btn:hover {
  background-color: #0a8a72;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.timestamp {
  font-size: 0.8em;
  color: #ffffff;
}

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
  padding: 8px;
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
  height: 70vh;
  /* Default height */
  background-color: #fff;
  border-radius: 12px;
  /* Add border-radius */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  /* Add padding */
  z-index: 999;
  overflow: hidden;
  /* Prevent overflow */
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

@media (min-width: 768px) {
  .hidden-on-mobile-when-chat-open {
    display: inline-block !important;
  }
}

@media (max-width: 600px) {
  .chatbox {
    width: calc(100% - 20px) !important;
    /* Full width with padding */
    max-width: calc(100% - 20px) !important;
    /* Full width with padding */
    height: calc(100vh - 20px) !important;
    /* Full height with padding */
    bottom: 10px !important;
    /* Add padding at the bottom */
    right: 10px !important;
    /* Add padding on the right */
    left: 10px !important;
    /* Add padding on the left */
    border-radius: 12px !important;
    /* Keep border-radius */
    padding: 15px !important;
    /* Reduce padding for more space */
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