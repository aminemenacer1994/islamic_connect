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

        <div class="fw-bold display-6 text-center mb-3">{{ events[currentIndex].title }}</div>
        <!-- Bootstrap message -->
        <div v-if="copySuccess" class="alert alert-success mt-2 mb-2" role="alert">
          Text copied to clipboard!
        </div>
        <div class="row align-items-center mb-3">
          <div class="col-md-4 container">
            <span class="fw-semibold" style="white-space: nowrap;font-size: 1.3em;">Search for a word in the Seerah text:</span>
          </div>
          <div class="col-md-6 container">
            <input type="text" v-model="searchTerm" class="form-control"
              placeholder="Search for a word in the Seerah text...">
          </div>
        </div>
        <hr />

        <h5 class="text-left fw-medium" :style="`line-height: 1.7em; color: gray; font-size: ${fontSize}px;`"
          v-html="highlightedDescription">
        </h5>


        <div class="controls text-center">
          <button @click="prev" :disabled="currentIndex === 0">Previous</button>
          <button @click="next" :disabled="currentIndex === events.length - 1">Next</button>
          <button @click="increaseFontSize">Increase Font</button>
          <button @click="decreaseFontSize">Decrease Font</button>
          <button @click="copyToClipboard">Copy</button>
          <button @click="shareOnWhatsApp">Share on WhatsApp</button>
          <button @click="togglePlayStop" :class="{
            'btn-play': !isPlaying,
            'btn-stop': isPlaying
          }">
            {{ isPlaying ? 'Stop' : 'Play' }}
          </button>
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
    highlightedDescription() {
      const currentDescription = this.events[this.currentIndex]?.description || '';
      if (!this.searchTerm) return currentDescription;

      const escapedTerm = this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape regex
      const regex = new RegExp(`(${escapedTerm})`, 'gi');
      return currentDescription.replace(
        regex,
        '<mark style="background-color: #0db691; color: white; border-radius: 2px; padding: 0 2px;">$1</mark>'
      );
    }
  },
  methods: {
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
      this.currentIndex = index;
      this.scrollToBadge();
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
    copyToClipboard() {
      const description = this.stripHTML(this.events[this.currentIndex].description);
      navigator.clipboard.writeText(description).then(() => {
        this.copySuccess = true; // Show success message
        setTimeout(() => {
          this.copySuccess = false; // Hide success message after 2 seconds
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
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
