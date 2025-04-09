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
      <div v-if="events.length" :key="currentIndex" class="event-box animate__animated">

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


        <div class="fw-bold display-6 text-center mb-3">{{ events[currentIndex].title }}</div>

        <div style="overflow-x: auto; white-space: nowrap;">
          <p style="display: inline-block; min-width: max-content; ">
            <i class="bi bi-book pr-2" style="font-size: 22px; color: gray;"></i>
            <strong>Read Time:</strong> {{ readTime }} minutes

            <i class="bi bi-headphones pr-2 pl-2" style="font-size: 22px; color: gray;"></i>
            <strong>Listen Time:</strong> {{ listenTime }} minutes

            <i class="bi bi-calculator pr-2 pl-2" style="font-size: 22px; color: gray;"></i>
            <strong>Word Count:</strong> {{ wordCount }}
          </p>
        </div>

        <div style="overflow-x: auto; white-space: nowrap;">
          <p style="display: inline-block; min-width: max-content;">
            <i class="bi bi-plus-circle pr-2" @click="increaseFontSize"
              style="font-size: 22px; cursor: pointer; color: gray;"></i>
            <strong style="cursor: pointer;">Increase Font</strong>

            <i class="bi bi-dash-circle pl-2 pr-2" @click="decreaseFontSize"
              style="font-size: 22px; cursor: pointer; color: gray;"></i>
            <strong style="cursor: pointer;">Increase Font</strong>
          </p>
        </div>

        <h5 class="text-left fw-medium" :style="`line-height: 1.7em; color: gray; font-size: ${fontSize}px;`"
          v-html="highlightedDescription">
        </h5>

        <div class="controls text-center">
          <button @click="prev" :disabled="currentIndex === 0">Previous</button>
          <button @click="next" :disabled="currentIndex === events.length - 1">Next</button>
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
      copySuccess: false,
      searchTerm: '',
      isPlaying: false,
      textToRead: '',
      speechInstance: null,
      currentIndex: 0,
      events: [],
      originalEvents: [],
      fontSize: 16,
      scrollDirection: 'up',
      speech: null,
      searchQuery: '',
      currentEvent: null,
    };
  },
  mounted() {
    this.events = events;
    this.originalEvents = events;
    this.textToRead = this.events[this.currentIndex]?.description || '';
  },
  beforeUnmount() {
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
    next() {
      if (this.currentIndex < this.events.length - 1) {
        this.currentIndex++;
        this.scrollToBadge();
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.scrollToBadge();
      }
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
      this.fontSize += 2; // Increase font size by 2px
    },
    decreaseFontSize() {
      if (this.fontSize > 10) {
        this.fontSize -= 2; // Decrease font size by 2px, minimum size of 10px
      }
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
    textToSpeech() {
      if ('speechSynthesis' in window) {
        const text = this.events[this.currentIndex].description;
        if (this.speech) {
          speechSynthesis.cancel(); // Stop any previous speech
        }
        this.speech = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(this.speech);
      } else {
        alert('Text-to-Speech not supported in your browser.');
      }
    }
  }
}
</script>
<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

.action-button {
  transition: all 0.3s ease;
  cursor: pointer;
  color: #333;
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
