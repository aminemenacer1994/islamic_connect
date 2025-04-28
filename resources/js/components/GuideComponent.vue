<template>
  <div class="container">
    <h1 class="display-5 fw-bold text-center mb-2 mt-4">Islamic Guides</h1>
    <p class="text-center container mb-3 guide-description lead">
      Islamic guides offer clear insights into the core beliefs, practices, and morals of Islam, helping both Muslims
      and non-Muslims understand the faith more deeply.
    </p>

    <div class="row mb-4">
      <!-- Category Dropdown -->
      <h2 class="fw-bold text-left pt-2 pb-2 container">Select an Islamic Guide:</h2>
      <div class="mb-3 d-flex align-items-center gap-2 col-md-6">
        <select v-model="selectedCategory" class="form-select">
          <option value="">Select a Guide</option>
          <option v-for="(section, index) in guide.sections" :key="index" :value="index">
            {{ section.title }}
          </option>
        </select>
      </div>
      <!-- <h2 class="fw-bold text-left pt-2 pb-2 container" v-if="selectedCategory !== ''">Search for a Keyword:</h2>
      <div class="col-md-6" v-if="selectedCategory !== ''">
        <div class="mb-3 d-flex align-items-center gap-2">
          <input type="text" v-model="searchText" class="form-control" placeholder="Search text..." />
        </div>
      </div> -->
    </div>

    <!-- Add your content here -->
    <div class="container text-left" :class="{ 'rtl-text': isArabic }">
      <div class="row justify-content-center mb-4" v-if="selectedCategory !== '' && guide.sections[selectedCategory]">
        <div class="col-md-12">
          <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap">
            <!-- Title -->
            <h2 class="display-6 fw-bold flex-grow-1 pb-2 mb-0">
              <span v-html="isArabic ? highlightText(guide.sections[selectedCategory].title_ar || guide.sections[selectedCategory].title) :
                highlightText(guide.sections[selectedCategory].title)"></span>
            </h2>

            <!-- Translate Button -->
            <!-- <div v-if="selectedCategory !== '' && guide.sections[selectedCategory]" class="ms-auto pt-2">
              <button class="btn btn-success" @click="translateContent" :disabled="isLoading">
                {{ isArabic ? 'Translate to English' : 'Translate to Arabic' }}
              </button>
            </div> -->
          </div>

          <!-- Loading Spinner -->
          <!-- <div v-if="isLoading" class="text-center my-3">
            <div class="spinner-border text-dark" role="status">
              <span class="visually-hidden">Translating...</span>
            </div>
            <p class="text-dark mt-2">Translating...</p>
          </div> -->

          <!-- Bootstrap Alert for Content Copy Feedback -->
          <div id="copyAlert" class="alert" role="alert" style="display: none;">
            <span id="alertMessage">Content copied to clipboard!</span>
          </div>

          <!-- Content -->
          <div v-if="!isLoading">
            <!-- Content with Real-Time Highlighting -->
            <div v-if="Array.isArray(guide.sections[selectedCategory].content)" :style="{ fontSize: fontSize + 'px' }">
              <ul class="list-unstyled selected-content">
                <li v-for="(item, index) in guide.sections[selectedCategory].content" :key="index" class="mb-2">
                  <span class="fw-medium fs-5 text-left text-dark">
                    <span v-html="getHighlightedText(item)"></span>
                  </span>
                </li>
              </ul>
            </div>


            <p v-else class="text-dark fs-5 selected-content" :style="{ fontSize: fontSize + 'px' }">
              <span
                v-html="isArabic ? highlightText(guide.sections[selectedCategory].content_ar || guide.sections[selectedCategory].content) : highlightText(guide.sections[selectedCategory].content)"></span>
            </p>
          </div>
        </div>
      </div>
    </div>


    <hr v-if="selectedCategory !== ''" />

    <!-- Action Icons: Share & Copy -->
    <div class="container text-center d-flex pb-3 justify-content-around align-items-center"
      v-if="selectedCategory !== ''">
      <!-- <div class="text-center">
        <i class="bi bi-share icon-tooltip h3 icon-hover" data-bs-toggle="tooltip" style="cursor: pointer"
          data-bs-placement="top" title="Share" aria-label="Share content" role="button" @click="shareOnWhatsApp"></i>
        <div class="h5">Share</div>
      </div> -->

      <div class="text-center">
        <!-- Pause Button -->
        <i class="bi bi-pause icon-tooltip h1 icon-hover" data-bs-toggle="tooltip" data-bs-placement="top" title="Pause"
          role="button" @click="pauseText"
          :class="{ 'text-muted': !isPlaying || isPaused, 'highlight-button': isPlaying }"
          :style="{ pointerEvents: (!isPlaying || isPaused) ? 'none' : 'auto' }"></i>
        <div class="h4" style="cursor:pointer" @click="pauseText">Pause</div>
      </div>

      <div class="text-center">
        <!-- Play Button -->
        <i class="bi bi-play icon-tooltip h1 icon-hover" data-bs-toggle="tooltip" data-bs-placement="top" title="Play"
          aria-label="Play text" role="button" @click="playText"
          :class="{ 'text-muted': isPlaying, 'highlight-button': !isPlaying }"
          :style="{ pointerEvents: isPlaying ? 'none' : 'auto' }"></i>
        <div class="h4" style="cursor:pointer" @click="playText">Play</div>
      </div>

      <div class="text-center">
        <!-- Stop Button -->
        <i class="bi bi-stop icon-tooltip h1 icon-hover" data-bs-toggle="tooltip" data-bs-placement="top" title="Stop"
          role="button" @click="stopText" :class="{ 'text-muted': !isPlaying, 'highlight-button': isPlaying }"
          :style="{ pointerEvents: !isPlaying ? 'none' : 'auto' }"></i>
        <div class="h4" style="cursor:pointer" @click="stopText">Stop</div>
      </div>


      <!-- <div class="text-center">
        <i @click="copyContent" style="cursor: pointer" class="bi bi-clipboard icon-tooltip h3 icon-hover"
          data-bs-toggle="tooltip" data-bs-placement="top" title="Copy Content" aria-label="Copy content"
          role="button"></i>
        <div class="h5">Copy</div>
      </div> -->
    </div>

  </div>
</template>

<script>
import guide from "../guides.json"; // Adjust the path if needed
import { ref, onMounted } from 'vue';

export default {
  data() {
    return {
      utterance: null,
      isArabic: false,
      isLoading: false,
      isPlaying: false,
      isPaused: false,
      ttsUtterance: null, // Store the SpeechSynthesisUtterance instance
      selectedCategory: "",
      searchText: "", // To track search input
      guide: guide, // Assign imported JSON data to guide
      fontSize: 18, // Starting font size as a regular data property
      isArabic: false,  // Track language state
      translatedContent: [],  // Store translated content
      currentIndex: -1,     // Track the current word index for highlighting
      highlightedText: [],  // Store the highlighted text array
      voices: [],
    };
  },
  mounted() {
    if (typeof window.speechSynthesis !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = window.speechSynthesis.getVoices();
      };
    }
  },
  methods: {
    translateContent() {
      this.isLoading = true;
      setTimeout(() => {
        this.toggleLanguage();
        this.isLoading = false;
      }, 1500); // Simulate translation delay
    },

    toggleLanguage() {
      if (this.isArabic) {
        this.isArabic = false; // Switch back to English
      } else if (this.guide.sections[this.selectedCategory]?.content_ar) {
        this.isArabic = true; // Switch to Arabic if translation exists
      } else {
        this.fetchTranslation(); // Fetch translation if not available
      }
    },

    playText() {
      if (this.isPaused) {
        window.speechSynthesis.resume();
        this.isPaused = false;
        this.isPlaying = true;
        this.updateAudioControlState();  // Update the control state
        return;
      }

      const selectedSection = this.guide.sections[this.selectedCategory];
      if (!selectedSection) return;

      let contentArray = this.isArabic
        ? selectedSection.content_ar
        : selectedSection.content;

      if (!Array.isArray(contentArray)) {
        contentArray = typeof contentArray === 'string' ? [contentArray] : [];
      }

      if (contentArray.length === 0) return;

      this.fullText = contentArray.join('. ');  // Store the full text for future use
      this.highlightedText = this.fullText.split(' ');
      this.currentIndex = -1;

      window.speechSynthesis.cancel();

      this.utterance = new SpeechSynthesisUtterance(this.fullText);
      this.utterance.lang = this.isArabic ? 'ar-SA' : 'en-US';

      const preferredVoice = this.voices.find(voice =>
        this.isArabic ? voice.lang.includes('ar') : voice.lang.includes('en-US')
      ) || this.voices[0];

      if (preferredVoice) this.utterance.voice = preferredVoice;

      this.utterance.pitch = 1.1;
      this.utterance.rate = 1;

      this.utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const textUpToBoundary = this.fullText.slice(0, event.charIndex);
          const wordsUpToBoundary = textUpToBoundary.trim().split(/\s+/).length - 1;
          this.currentIndex = wordsUpToBoundary;
          this.$forceUpdate();
        }
      };

      this.utterance.onend = () => {
        this.isPlaying = false;
        this.isPaused = false;
        this.currentIndex = -1;
        this.updateAudioControlState();  // Reset the control state after speech ends
      };

      window.speechSynthesis.speak(this.utterance);

      this.isPlaying = true;
      this.isPaused = false;
      this.updateAudioControlState();  // Update the control state
    },

    // Update audio control state to highlight play and disable controls
    updateAudioControlState() {
      if (this.isPlaying) {
        document.body.classList.add('playing');
      } else {
        document.body.classList.remove('playing');
      }
    },

    // Pause Button Handler
    pauseText() {
      if (this.isPlaying && !this.isPaused) {
        window.speechSynthesis.pause();
        this.isPaused = true;
        this.isPlaying = false;
        this.updateAudioControlState();  // Update the control state
      }
    },

    // Handle Stop Button
    stopText() {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      this.isPlaying = false;
      this.isPaused = false;
      this.currentUtterance = null; // if you have it
    },

    getHighlightedText(item) {
      if (this.currentIndex === -1) return item;
      return item.split(' ')
        .map((word, index) =>
          index === this.currentIndex
            ? `<span class="highlight-word">${word}</span>`
            : word
        )
        .join(' ');
    },

    highlightText(text) {
      if (!this.searchText) return text;
      const regex = new RegExp(`(${this.searchText})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    },

    changeFontSize(action) {
      if (action === 'increase' && this.fontSize < 30) {
        this.fontSize += 2;
      } else if (action === 'decrease' && this.fontSize > 10) {
        this.fontSize -= 2;
      }
    },

    fetchTranslation() {
      const selectedContent = this.guide.sections[this.selectedCategory].content;
      const contentArray = Array.isArray(selectedContent) ? selectedContent : [selectedContent];

      const translateChunk = (text) => {
        return fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ar`)
          .then(response => response.json())
          .then(data => data.responseData.translatedText)
          .catch(error => console.log("Translation Error:", error));
      };

      let translatedArray = [];
      contentArray.forEach((item) => {
        if (item.length > 500) {
          const chunks = item.match(/(.|[\r\n]){1,500}/g);
          chunks.forEach((chunk) => {
            translateChunk(chunk).then((translatedChunk) => {
              translatedArray.push(translatedChunk);
              this.guide.sections[this.selectedCategory].content_ar = translatedArray.join(' ');
              this.isArabic = true;
            });
          });
        } else {
          translateChunk(item).then((translatedItem) => {
            translatedArray.push(translatedItem);
            this.guide.sections[this.selectedCategory].content_ar = translatedArray.join(' ');
            this.isArabic = true;
          });
        }
      });
    },

    shareOnWhatsApp() {
      const selectedSection = this.guide.sections[this.selectedCategory];
      if (!selectedSection) return;

      const title = selectedSection.title;
      const content = Array.isArray(selectedSection.content)
        ? selectedSection.content.join('\n\n')
        : selectedSection.content;

      const text = `Title: ${title}\n\nContent: ${content}`;
      const encodedText = encodeURIComponent(text);
      const url = `https://wa.me/?text=${encodedText}`;

      window.open(url, '_blank');
    },

    copyContent() {
      const contentToCopy = document.querySelector('.selected-content');
      if (contentToCopy) {
        const textToCopy = contentToCopy.innerText || contentToCopy.textContent;
        navigator.clipboard.writeText(textToCopy)
          .then(() => this.showCopyAlert('Content copied to clipboard!'))
          .catch(() => this.showCopyAlert('Failed to copy content', true));
      } else {
        this.showCopyAlert('No content to copy', true);
      }
    },

    showCopyAlert(message, isError = false) {
      const alertElement = document.getElementById('copyAlert');
      const alertMessage = document.getElementById('alertMessage');

      alertMessage.textContent = message;
      alertElement.className = isError ? 'alert alert-danger' : 'alert alert-success';
      alertElement.style.display = 'block';

      setTimeout(() => {
        alertElement.style.display = 'none';
      }, 2000);
    }
  },
  watch: {
    selectedCategory(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.stopText(); // Stop the audio/text when guide changes
      }
    }
  }
}
</script>

<style scoped>
/* Highlight active button */
.highlight-button {
  color: rgb(13, 182, 145);
  color: rgb(0, 0, 0);
  cursor: pointer;
}

/* Gray out inactive buttons */
.text-muted {
  color: #a9a9a9 !important;
  pointer-events: none;
  /* Prevent interaction */
}

.highlight-word {
  background-color: rgb(13, 182, 145);
  /* Customize the highlight color */
  color: white;
  /* Light yellow for the current word */
  transition: background-color 0.2s ease-in-out;
}

.rtl-text {
  direction: rtl !important;
  /* Force RTL direction */
  text-align: right !important;
  /* Force text alignment to the right */
  word-spacing: 0.3em !important;
  /* Increase spacing between words */
}

/* Custom styles can go here */
::v-deep mark {
  background-color: rgb(13, 182, 145);
  /* Customize the highlight color */
  color: white;
  /* Customize text color for highlight */
}

/* Custom styles for the icons (optional) */
.icon-hover:hover {
  color: rgb(13, 182, 145);
  /* Change icon color on hover */
}
</style>
