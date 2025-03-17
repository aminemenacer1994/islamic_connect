<template>
  <div class="container">
    <!-- Floating Action Button -->
    <button class="fab" @click="toggleChat">
      💬
    </button>

    <!-- Chatbox that opens when FAB is clicked -->
    <div v-if="showChat" class="chatbox">
      <div class="chat-header">
        <span>Islamic Q&A</span>
        <button class="close-btn" @click="toggleChat">X</button>
      </div>

      <input 
        v-model="question" 
        placeholder="Ask an Islamic question..." 
        class="input-box" 
        :disabled="loading"
      />

      <button @click="getAnswer" :disabled="loading || !question.trim()" class="button">
        {{ loading ? "Fetching..." : "Get Answer" }}
      </button>

      <button @click="clearAnswer" v-if="answer || error" class="clear-button">
        Clear Answer
      </button>

      <div v-if="loading" class="loading">Fetching response...</div>

      <p v-if="answer" class="answer">
        <strong>Answer:</strong> {{ answer }}
      </p>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: "",
      answer: "",
      loading: false,
      error: "",
      showChat: false, // Flag to toggle chat visibility
      apiToken: process.env.HF_API_KEY || "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", // API token
    };
  },
  methods: {
    // Toggles the visibility of the chatbox
    toggleChat() {
      this.showChat = !this.showChat;
    },
    async getAnswer() {
      if (!this.question.trim()) {
        this.error = "Please enter a question.";
        return;
      }

      this.loading = true;
      this.answer = "";
      this.error = "";

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
              inputs: this.question,
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
          if (answerText.toLowerCase().startsWith(this.question.toLowerCase())) {
            answerText = answerText.slice(this.question.length).trim();
          }

          this.answer = answerText;
        } else {
          this.answer = "No detailed answer found. Try rephrasing your question.";
        }
      } catch (err) {
        this.error = err.message || "Failed to fetch the answer. Try again.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    clearAnswer() {
      this.answer = "";
      this.error = "";
      this.question = "";
    }
  },
};
</script>

<style scoped>
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
  background-color: #007bff;
  color: white;
  font-size: 30px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

.chatbox {
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 999;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2em;
  margin-bottom: 15px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #333;
}

.input-box {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;
}

.button:disabled {
  background-color: #d6d6d6;
  cursor: not-allowed;
}

.clear-button {
  padding: 10px 20px;
  border: none;
  background-color: #ff4d4d;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.loading {
  margin-top: 10px;
  font-size: 1.1em;
  color: #555;
}

.answer {
  margin-top: 20px;
  font-size: 1.2em;
}

.error {
  margin-top: 20px;
  color: red;
  font-size: 1.1em;
}
</style>
