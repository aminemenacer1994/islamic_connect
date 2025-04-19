<template>
  <div class="container mt-3 p-3">
    <div class="fw-bold display-5 text-center mb-2">Seerah Timeline</div>

    <div class="timeline-wrapper">
      <div class="timeline">
        <div v-for="(event, index) in events" :key="index" class="timeline-point">
          <span class="badge fs-6 timeline-badge" :class="{ active: index === currentIndex }"
            @click="selectEvent(index)">
            {{ event.year }}
          </span>
        </div>
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <div v-if="events.length" :key="currentIndex" class="event-box event-details animate__animated">

        <!-- <div class="fw-bold display-6 text-center mb-3">{{ events[currentIndex].title }}</div> -->

        <!-- Bootstrap message -->
        <div v-if="copySuccess" class="alert alert-success" role="alert">
          Text copied to clipboard!
        </div>

        <!-- <div class="row align-items-center mb-3">
          <div class="col-md-4 container">
            <span class="fw-semibold" style="white-space: nowrap;font-size: 1.3em;">Search for a word in the Seerah
              text:</span>
          </div>
          <div class="col-md-6 container">
            <input type="text" v-model="searchTerm" class="form-control"
              placeholder="Search for a word in the Seerah text...">
          </div>
        </div> -->

        <!-- <div class="time-estimates">

          <div class="scroll-container text-center" style="
              color: black;
              border-radius: 15px;
              border: 2px solid rgba(0, 0, 0, 0.1);
              box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
              overflow-x: auto;
              display: flex;
              flex-direction: row;
              gap: 5px;
              white-space: nowrap;
              margin-bottom: 15px;
            ">

            <div class="container">
              <div class="row text-center">
                <div class="col">
                  <div @click="shareOnWhatsApp" class="d-flex align-items-center p-2 rounded action-button"
                    style="cursor: pointer;">
                    <i class="bi bi-plus-circle fs-4 me-2"></i> Increase Font
                  </div>
                </div>
                <div class="col">
                  <div @click="shareOnWhatsApp" class="d-flex align-items-center p-2 rounded action-button"
                    style="cursor: pointer;">
                    <i class="bi bi-whatsapp fs-4 me-2 text-success"></i> Share
                  </div>
                </div>
                <div class="col">
                  <div @click="copyToClipboard" class="d-flex align-items-center p-2 rounded action-button"
                    style="cursor: pointer;">
                    <i class="bi bi-clipboard fs-4 me-2"></i> Copy Text
                  </div>
                </div>
                <div class="col">
                  <div @click="shareOnWhatsApp" class="d-flex align-items-center p-2 rounded action-button"
                    style="cursor: pointer;">
                    <i class="bi bi-dash-circle fs-4 me-2"></i> Decrease Font
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div> -->
        <div class="fw-bold display-6 pb-3 text-center">{{ events[currentIndex].title }}</div>

        <div class="container" style="overflow-x: auto; white-space: nowrap; -webkit-overflow-scrolling: touch;">
          <p style="display: inline-block; min-width: max-content;">
            <i class="bi bi-book pr-3 pt-3" style="font-size: 20px; cursor: pointer;"></i>
            <strong>Read Time:</strong> {{ readTime }} minutes

            <i class="bi bi-whatsapp pr-2 pl-3 feature" style="cursor: pointer; font-size: 22px;"
              @click="shareOnWhatsApp"></i>
            <strong @click="shareOnWhatsApp" style="cursor: pointer;" class="feature">Share</strong>

            <i class="bi bi-clipboard pl-3 pr-2 feature" style="cursor: pointer; font-size: 22px;"
              @click="copyToClipboard()"></i>
            <strong @click="copyToClipboard()" style="cursor: pointer;" class="feature">Copy Text</strong>
          </p>
        </div>



        <!-- <div style="overflow-x: auto; white-space: nowrap;">
          <p style="display: inline-block; min-width: max-content;">

            <i class="bi bi-whatsapp pr-2" style="cursor: pointer; font-size: 22px;" @click="shareOnWhatsApp"></i>
            <strong style="cursor: pointer;">Share</strong>

            <i class="bi bi-clipboard pl-3 pr-2" style="cursor: pointer; font-size: 22px;" @click=copyToClipboard()></i>
            <strong style="cursor: pointer;">Copy Text</strong>

            <i class="bi bi-play pl-3 pr-2" style="cursor: pointer; font-size: 22px;" @click="handleTTS"></i>
            <strong style="cursor: pointer;">Play</strong>
          </p>
        </div> -->

        <!-- Styled Text desc -->
        <h5 class="fw-medium p-3 rounded" :style="{
          lineHeight: '1.7em',
          fontSize: fontSize + 'px',
          backgroundColor: fontSettings.backgroundColor,
          color: fontSettings.color,
          fontStyle: fontSettings.fontStyle,
          textShadow: fontSettings.textShadow,
          textDecoration: fontSettings.textDecoration,
          fontFamily: fontSettings.fontFamily,
        }" v-html="highlightedDescription">
        </h5>

        <!-- Offcanvas Settings Panel -->
        <div class="offcanvas offcanvas-end custom-offcanvas" tabindex="-1" id="settingsOffcanvas"
          aria-labelledby="settingsOffcanvasLabel" :style="offcanvasStyle">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title fs-3" id="settingsOffcanvasLabel">Font Settings</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
              aria-label="Close"></button>
          </div>
          <div class="offcanvas-body d-flex flex-column gap-3">

            <form @submit.prevent="saveSettings" class="text-white">
              <div class="d-flex flex-column gap-3">

                <div v-if="showSuccess" class="alert alert-success mt-3" role="alert">
                  Changes saved successfully!
                </div>

                <div>
                  <label class="form-label fw-bold fs-4">Background Color</label>
                  <input type="color" v-model="fontSettings.backgroundColor" class="form-control form-control-color" />
                </div>

                <div>
                  <label class="form-label fw-bold fs-4">Text Color</label>
                  <input type="color" v-model="fontSettings.color" class="form-control form-control-color" />
                </div>

                <label class="form-label fw-bold fs-4">Font Size:</label>
                <div class="d-flex align-items-center gap-3">
                  <button class="btn btn-outline-light px-2 py-1" @click.stop.prevent="decreaseFontSize">−</button>

                  <span class="fw-bold fs-5">{{ tempFontSize }}px</span>

                  <button class="btn btn-outline-light px-2 py-1" @click.stop.prevent="increaseFontSize">+</button>
                </div>


                <div>
                  <label class="form-label fw-bold fs-4">Font Style</label>
                  <select v-model="fontSettings.fontStyle" class="form-select">
                    <option value="normal">Normal</option>
                    <option value="italic">Italic</option>
                  </select>
                </div>

                <div>
                  <label class="form-label fw-bold fs-4">Text Shadow</label>
                  <select v-model="fontSettings.textShadow" class="form-select">
                    <option value="none">None</option>
                    <option value="1px 1px 2px gray">Soft Shadow</option>
                    <option value="2px 2px 4px black">Dark Shadow</option>
                    <option value="1px 1px 2px red">Red Shadow</option>
                    <option value="1px 1px 2px blue">Blue Shadow</option>
                  </select>
                </div>

                <div>
                  <label class="form-label fw-bold fs-4">Underline</label>
                  <select v-model="fontSettings.textDecoration" class="form-select">
                    <option value="none">None</option>
                    <option value="underline">Underline</option>
                  </select>
                </div>

                <div>
                  <label class="form-label fw-bold fs-4">Font Family</label>
                  <select v-model="fontSettings.fontFamily" class="form-select">
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="'Times New Roman', serif">Times New Roman</option>
                    <option value="'Courier New', monospace">Courier New</option>
                    <option value="Tahoma, sans-serif">Tahoma</option>
                    <option value="'Segoe UI', sans-serif">Segoe UI</option>
                    <option value="'Open Sans', sans-serif">Open Sans</option>
                    <option value="'Roboto', sans-serif">Roboto</option>
                    <option value="'Lato', sans-serif">Lato</option>
                    <option value="'Merriweather', serif">Merriweather</option>
                    <option value="'Noto Sans', sans-serif">Noto Sans</option>
                    <option value="'Poppins', sans-serif">Poppins</option>
                  </select>
                </div>



              </div><button class="btn btn-success text-right mt-3" @click="submitFontSize">
                Submit Changes
              </button>
            </form>

          </div>
        </div>

        <div class="fab btn btn-light rounded-circle shadow container"
          style="position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; z-index: 1000; cursor: pointer;"
          data-bs-toggle="offcanvas" data-bs-target="#settingsOffcanvas" aria-controls="settingsOffcanvas">
          <i class="bi bi-gear-fill fs-4"></i>
        </div>

        <div class="controls text-center mt-4">
          <button @click="prev" :disabled="currentIndex === 0" class="btn btn-primary me-2">Previous</button>
          <button @click="next" :disabled="currentIndex === events.length - 1" class="btn btn-primary">Next</button>
        </div>

      </div>
    </transition>

  </div>
</template>
<script>
import { events } from './prophet_events.json';

export default {
  name: 'SeerahTimeline',
  data() {
    return {
      isOffcanvasOpen: true,
      fontSettings: {
        backgroundColor: "#ffffff",
        color: "#000000",
        fontStyle: "normal",
        textShadow: "none",
        textDecoration: "none",
        fontFamily: "Arial, sans-serif",
      },
      events: [],
      showSuccess: false,
      currentIndex: 0,
      selectedVoice: null,
      ttsState: 'stopped', // 'playing' | 'paused' | 'stopped'
      utterance: null,
      synth: window.speechSynthesis,
      copySuccess: false,
      searchTerm: '',
      isPlaying: false,
      textToRead: '',
      speechInstance: null,
      currentIndex: 0,
      events: [],
      originalEvents: [],
      fontSize: 18,         // Final applied value
      tempFontSize: 18,
      scrollDirection: 'up',
      speech: null,
      searchQuery: '',
      currentEvent: null,
    };
  },
  computed: {
    offcanvasStyle() {
      return {
        backgroundColor: "#10584f",
        width: window.innerWidth < 576 ? "100%" : "40%",
      };
    }
  },
  mounted() {
    const saved = localStorage.getItem("userFontSettings");
    if (saved) {
      this.fontSettings = JSON.parse(saved);
    }
    const savedSettings = localStorage.getItem("fontSettings");
    if (savedSettings) {
      this.fontSettings = JSON.parse(savedSettings);
    }
    window.addEventListener("resize", this.updateOffcanvasWidth);

    if (typeof speechSynthesis !== 'undefined') {
      speechSynthesis.onvoiceschanged = this.loadVoices;
      this.loadVoices();
    }

    // Listen for tab visibility change
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.events = events;
    this.originalEvents = events;
    this.textToRead = this.events[this.currentIndex]?.description || '';
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateOffcanvasWidth);
    speechSynthesis.onvoiceschanged = null;
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener("keydown", this.handleKey);
  },
  computed: {
    wordCount() {
      const div = document.createElement('div');
      div.innerHTML = this.highlightedDescription || '';
      const text = div.textContent || div.innerText || '';
      return text.trim().split(/\s+/).length;
    },
    highlightedDescription() {
      const currentDescription = this.events[this.currentIndex]?.description || '';
      if (!this.searchTerm) return currentDescription;

      const escapedTerm = this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape regex
      const regex = new RegExp(`(${escapedTerm})`, 'gi');
      return currentDescription.replace(
        regex,
        '<mark style="background-color: #0db691; color: white; border-radius: 2px; padding: 0 2px;">$1</mark>'
      );
    },
    // Calculate Read Time (words per minute: 200)
    readTime() {
      const wordCount = this.countWords(this.highlightedDescription);
      const wordsPerMinute = 200;
      return Math.ceil(wordCount / wordsPerMinute);
    },
    // Calculate Listen Time (words per minute: 150)
    listenTime() {
      const wordCount = this.countWords(this.highlightedDescription);
      const wordsPerMinute = 150;
      return Math.ceil(wordCount / wordsPerMinute);
    }
  },
  methods: {
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top
      }
    },
    next() {
      if (this.currentIndex < this.events.length - 1) {
        this.currentIndex++;
        window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top
      }
    },
    saveSettings() {
      localStorage.setItem("userFontSettings", JSON.stringify(this.fontSettings));
      this.showSuccess = true;

      // Hide alert & close offcanvas after 3s
      setTimeout(() => {
        this.showSuccess = false;

        // Bootstrap Offcanvas API
        const offcanvas = bootstrap.Offcanvas.getInstance(
          document.getElementById("settingsOffcanvas")
        );
        if (offcanvas) {
          offcanvas.hide();
        }
      }, 3000);
    },
    updateOffcanvasWidth() {
      this.$forceUpdate(); // trigger recompute
    },
    handleVisibilityChange() {
      // If the tab is hidden and audio is still playing, stop it
      if (document.hidden && speechSynthesis.speaking) {
        speechSynthesis.cancel(); // Stop speech immediately
        this.ttsState = 'stopped'; // Update the TTS state
      }
    },

    loadVoices() {
      const voices = speechSynthesis.getVoices();
      if (voices.length) {
        this.selectedVoice = voices.find(voice =>
          voice.lang === 'en-US' &&
          (voice.name.includes('Google') || voice.name.includes('Natural') || voice.name.includes('Jenny') || voice.name.includes('Samantha'))
        ) || voices.find(voice => voice.lang === 'en-US');
      }
    },

    // Handle TTS play, pause, and resume
    handleTTS() {
      // If no voice selected yet, try to load the voices again
      if (!this.selectedVoice) {
        this.loadVoices();
        return;
      }

      const description = this.stripHtml(this.highlightedDescription);
      const title = this.events[this.currentIndex]?.title || '';
      const ttsText = `${title}. Read time ${this.readTime} minutes. Listen time ${this.listenTime} minutes. Word count ${this.wordCount}. ${description}`;

      if (this.ttsState === 'stopped') {
        this.utterance = new SpeechSynthesisUtterance(ttsText);
        this.utterance.voice = this.selectedVoice;
        this.utterance.rate = 1;
        this.utterance.pitch = 1;
        this.utterance.onend = () => this.ttsState = 'stopped'; // Reset state after speaking ends
        speechSynthesis.speak(this.utterance);
        this.ttsState = 'playing'; // Set state to playing
      } else if (this.ttsState === 'playing') {
        speechSynthesis.stop(); // Pause the TTS
        this.ttsState = 'stop'; // Update state to paused
      } else if (this.ttsState === 'stop') {
        speechSynthesis.resume(); // Resume the TTS
        this.ttsState = 'playing'; // Update state to playing
      }
    },

    // Stop TTS immediately
    stopTTS() {
      if (speechSynthesis.speaking || speechSynthesis.stop) {
        speechSynthesis.cancel(); // Stop speaking or pause immediately
        this.ttsState = 'stopped'; // Reset the state to stopped
      }
    },

    selectEvent(index) {
      this.currentIndex = index;
      this.stopTTS(); // Stop TTS before moving to a new event
      this.handleTTS(); // Start TTS for the new event
    },

    countWords(text) {
      if (!text) return 0;
      return text.split(/\s+/).filter(Boolean).length;
    },

    filterEvents() {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) {
        this.events = this.originalEvents;
        this.currentIndex = 0;
        return;
      }

      const filtered = this.originalEvents.filter(e =>
        e.title.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query) ||
        e.year.toLowerCase().includes(query)
      );

      this.events = filtered;
      this.currentIndex = 0;
    },
    selectEvent(index) {
      this.currentIndex = index;  // Update the selected index
      this.currentEvent = this.events[index];  // Update the selected event details

      // Optionally scroll the selected event into view for better user experience
      this.scrollToEvent(index);
    },
    // Method to scroll to the selected event
    scrollToEvent(index) {
      const element = this.$refs.timeline[index];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });  // Smooth scroll to the selected event
      }
    },
    scrollToBadge() {
      this.$nextTick(() => {
        const badges = this.$el.querySelectorAll('.timeline-badge');
        if (badges[this.currentIndex]) {
          badges[this.currentIndex].scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
      });
    },
    handleKey(e) {
      if (e.key === 'ArrowRight') this.next();
      else if (e.key === 'ArrowLeft') this.prev();
    },
    toggleScroll() {
      if (this.scrollDirection === 'up') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.scrollDirection = 'down';
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        this.scrollDirection = 'up';
      }
    },
    increaseFontSize() {
      this.tempFontSize += 1;
    },
    decreaseFontSize() {
      if (this.tempFontSize > 1) this.tempFontSize -= 1;
    },
    submitFontSize() {
      this.fontSize = this.tempFontSize;
      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
      }, 2000);
    },
    togglePlayStop() {
      if (this.isPlaying) {
        this.stopTTS();
      } else {
        this.startTTS();
      }
      this.isPlaying = !this.isPlaying;
    },
    startTTS() {
      if ('speechSynthesis' in window) {
        // Ensure there is no previous speech in progress
        if (this.speechInstance) {
          window.speechSynthesis.cancel();  // Stop any ongoing speech before starting new
        }

        this.speechInstance = new SpeechSynthesisUtterance(this.textToRead);
        window.speechSynthesis.speak(this.speechInstance);

        // Event listener for when speech ends
        this.speechInstance.onend = () => {
          this.isPlaying = false;  // Reset state when speech ends
        };
      } else {
        console.error('TTS not supported in this browser.');
      }
    },
    stopTTS() {
      window.speechSynthesis.cancel();  // Stop the speech synthesis
      this.isPlaying = false;  // Reset state
    },
    stripHtml(html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent || div.innerText || '';
    },
    next() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.stopTTS();
      this.currentIndex++;
    },
    prev() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.stopTTS();
      this.currentIndex--;
    },
    stripHtmlTags(html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent || div.innerText || '';
    },
    copyToClipboard() {
      const rawHtml = this.events[this.currentIndex]?.description || '';
      const plainText = this.stripHtmlTags(rawHtml);

      navigator.clipboard.writeText(plainText).then(() => {
        this.copySuccess = true;
        setTimeout(() => {
          this.copySuccess = false;
        }, 2000);
      });
    },
    stripHTML(text) {
      const doc = new DOMParser().parseFromString(text, "text/html");
      return doc.body.textContent || "";
    },
    shareOnWhatsApp() {
      const message = encodeURIComponent(this.stripHTML(this.events[this.currentIndex].description));
      const url = `https://wa.me/?text=${message}`;
      window.open(url, '_blank');
    },
  },
  watch: {
    fontSettings: {
      handler(newVal) {
        localStorage.setItem("fontSettings", JSON.stringify(newVal));
      },
      deep: true
    }
  }
}
</script>
<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

@media (max-width: 767px) {
  #settingsOffcanvas {
    width: 100% !important;
  }
}

/* Offcanvas 40% Width on Larger Screens (tablet and above) */
@media (min-width: 768px) {
  #settingsOffcanvas {
    width: 40% !important;
  }
}

.custom-offcanvas {
  background-color: #10584f;
  color: white;
  min-width: 30%;
}

.fab {
  transition: background-color 0.3s ease, transform 0.2s;
}

.fab:hover {
  transform: scale(1.1);
}

.action-button {
  transition: all 0.3s ease;
  cursor: pointer;
  color: #333;
}

.feature:hover {
  color: #0db691;
}

.action-button:hover {
  color: #0db691;
  /* Bootstrap primary */
  transform: translateY(-2px);
}

.time-estimates {
  font-size: 14px;
  margin-bottom: 20px;
}

.time-estimates p {
  margin: 5px 0;
}

mark {
  background-color: #0db691;
  color: white;
  padding: 0 2px;
  border-radius: 2px;
}

.btn-play {
  background-color: #0db691;
  /* Green color for play */
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-play:hover {
  background-color: #17a085;
  /* Slightly darker green */
}

.btn-stop {
  background-color: #e74c3c;
  /* Red color for stop */
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-stop:hover {
  background-color: #c0392b;
  /* Slightly darker red */
}

.timeline::-webkit-scrollbar {
  display: none;
}

.timeline-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  /* Firefox */
}

.timeline-wrapper::-webkit-scrollbar {
  display: none;
  /* Chrome/Safari */
}

.timeline {
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  min-width: max-content;
}

.timeline-point {
  flex-shrink: 0;
}

.timeline-badge {
  border-radius: 1rem;
  padding: 0.8rem 1.3rem;
  background-color: #f8f9fa;
  color: #212529;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  border: 1px solid #ced4da;
  font-weight: 300;
  white-space: nowrap;
  user-select: none;
}

.timeline-badge:hover {
  background-color: #20c997;
  color: white;
  cursor: pointer;
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.timeline-badge.active {
  background-color: rgb(13, 182, 145);
  color: white;
  border: 2px solid lightgrey;
  box-shadow: 0 8px 14px rgba(0, 0, 0, 0.2);
}

.event-box {
  padding: 15px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.controls {
  margin-top: 20px;
}

.controls button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  background-color: rgb(13, 182, 145);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

.controls button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.controls button:hover:not(:disabled) {
  background-color: #0db691;
}

/* FAB Button Styles */
.fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #20c997;
  color: white;
  font-size: 24px;
  border: none;
  padding: 20px;
  border-radius: 50%;
  /* Rounded circle */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
}

.fab:hover {
  background-color: #17a085;
  transform: scale(1.1);
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>