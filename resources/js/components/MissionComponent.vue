<template>
  <div class="container p-4">
    <h1 class="fw-bold display-5 text-center mb-2">Seerah Timeline</h1>
    <p class="text-center container mb-4 lead d-none d-md-block">
      The Seerah Timeline offers an insightful journey through the life of Prophet Muhammad (PBUH). This timeline is
      designed to provide users with an accessible, interactive way to explore key moments in Islamic history, helping
      them better understand the significance of each event.
    </p>

    <div class="timeline-wrapper">
      <div class="timeline">
        <div v-for="(event, index) in events" :key="index" class="timeline-point" ref="eventRefs">
          <span class="badge fs-6 timeline-badge" :class="{ active: index === currentIndex }" @click="selectEvent(index)">
            {{ event.year }}
          </span>
        </div>
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <div v-if="events.length" :key="currentIndex" class="event-box event-details animate__animated">
        <div v-if="copySuccess" class="alert alert-success" role="alert">
          Text copied to clipboard!
        </div>

        <div class="fw-bold display-6 text-center mb-3">{{ events[currentIndex].title }}</div>

        <!-- Combined Controls and Info Row -->
        <div class="d-flex justify-content-center align-items-center gap-2 gap-sm-4 mb-3 mb-md-4 flex-wrap">
          <!-- Time Estimates -->
          <div class="d-flex gap-2 gap-sm-4 text-center">
            <span class="small">
              <i class="bi bi-book me-1"></i>
              <strong>Read:</strong> {{ readTime }}m
            </span>
            <span class="small">
              <i class="bi bi-headphones me-1"></i>
              <strong>Listen:</strong> {{ listenTime }}m
            </span>
            <span class="small">
              <i class="bi bi-file-earmark-word me-1"></i>
              <strong>Words:</strong> {{ wordCount }}
            </span>
          </div>
        </div>

        <!-- AI Summary and Play Button Row -->
        <div class="d-flex justify-content-center align-items-center gap-3 gap-md-4 mb-3 mb-md-4">
          <!-- AI Summary Button -->
          <button class="btn btn-sm btn-outline-dark" @click="summarizeEvent" :disabled="summaryLoading">
            <i class="bi" :class="summaryLoading ? 'bi-hourglass-split' : 'bi-robot'"></i>
            <span class="ms-1 ms-sm-2">{{ summaryLoading ? 'Generating...' : 'AI Summary' }}</span>
          </button>
          
          <!-- Play Button -->
          <div class="text-center">
            <i class="bi" :class="isAudioPlaying[currentIndex] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'"
              style="cursor: pointer; font-size: 1.75rem;" data-bs-toggle="tooltip" data-bs-placement="top"
              :title="isAudioPlaying[currentIndex] ? 'Pause' : 'Play'" @click="toggleAudioPlayer(currentIndex)"></i>
          </div>
        </div>

        <!-- Styled Text desc -->
        <h5 class="fw-medium rounded" :style="{
          lineHeight: '1.7em',
          fontSize: fontSize + 'px',
          backgroundColor: fontSettings.backgroundColor,
          color: fontSettings.color,
          fontStyle: fontSettings.fontStyle,
          textShadow: fontSettings.textShadow,
          textDecoration: fontSettings.textDecoration,
          fontFamily: fontSettings.fontFamily,
          padding: '0.75rem',
          fontSize: Math.max(14, fontSize) + 'px'
        }" v-html="highlightedDescription"></h5>

        <!-- AI Summary Section (Inline) -->
        <transition name="fade-slide">
          <div v-if="summaryText" class="ai-summary-inline mt-3 mt-md-4 p-2 p-md-3 rounded" ref="summarySection" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 1px solid #dee2e6;">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <h6 class="mb-0 text-primary small">
                <i class="bi bi-robot me-1 me-sm-2"></i>
                AI Summary
              </h6>
              <button 
                class="btn btn-sm btn-outline-secondary"
                @click="toggleSummary"
                :title="showSummary ? 'Hide Summary' : 'Show Summary'"
              >
                <i class="bi" :class="showSummary ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
              </button>
            </div>
            
            <transition name="fade-slide">
              <div v-if="showSummary">
                <div class="summary-text small" v-html="summaryText"></div>
                <div class="summary-footer mt-2 pt-2 border-top">
                  <small class="text-muted">
                    <i class="bi bi-info-circle me-1"></i>
                    AI-generated summary of key points from this event.
                  </small>
                </div>
              </div>
            </transition>
          </div>
        </transition>
        <div v-if="summaryError" class="alert alert-danger mt-2">
          {{ summaryError }}
        </div>

        <!-- Offcanvas Settings Panel -->
        <div class="offcanvas offcanvas-end custom-offcanvas" tabindex="-1" id="settingsOffcanvas"
          aria-labelledby="settingsOffcanvasLabel" :style="offcanvasStyle">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title fs-3" id="settingsOffcanvasLabel">Font Settings</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
              aria-label="Close"></button>
          </div>
          <div class="d-flex flex-column">
            <form @submit.prevent="saveSettings" class="text-white">
              <div class="d-flex flex-column gap-3">
                <div v-if="showSuccess" class="alert alert-success">
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
                  <div class="btn btn-outline-light px-2 py-0" @click.stop="decreaseFontSize">−</div>
                  <div class="fw-bold fs-5">{{ fontSize }}px</div>
                  <div class="btn btn-outline-light px-2 py-1" @click.stop="increaseFontSize">+</div>
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
                    <option value="1px 1px 2px gray">Small Shadow</option>
                    <option value="2px 2px 4px black">Medium Shadow</option>
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
              </div>
              <button class="btn btn-success mt-3" @click="submitFontSize">
                Submit Changes
              </button>
            </form>
          </div>
        </div>

        <!-- <div class="fab btn btn-light rounded-circle shadow"
          style="position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; z-index: 1000; cursor: pointer;"
          data-bs-toggle="offcanvas" data-bs-target="#settingsOffcanvas" aria-controls="settingsOffcanvas">
          <i class="bi bi-gear-fill fs-4"></i>
        </div> -->

        <div class="controls text-center mt-3 mt-md-4">
          <button @click="prev" :disabled="currentIndex === 0" class="btn btn-primary me-2 btn-sm">Previous</button>
          <button @click="next" :disabled="currentIndex === events.length - 1" class="btn btn-primary btn-sm">Next</button>
        </div>
      </div>
    </transition>

    <!-- Global Custom Audio Player -->
    <div v-if="showAudioPlayer" class="audio-player-container">
      <div class="custom-audio-player">
        <div class="controls">
          <i class="bi bi-skip-backward-fill control-icon" @click="rewindAudio(currentlyPlayingIndex)" title="Rewind 10s"
            data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Rewind 10 seconds"></i>
          <i class="bi control-icon" :class="isAudioPlaying[currentlyPlayingIndex] ? 'bi-pause-fill' : 'bi-play-fill'"
            @click="toggleAudioPlayer(currentlyPlayingIndex)" :title="isAudioPlaying[currentlyPlayingIndex] ? 'Pause' : 'Play'"
            data-bs-toggle="tooltip" data-bs-placement="top" :aria-label="isAudioPlaying[currentlyPlayingIndex] ? 'Pause' : 'Play'"></i>
          <i class="bi bi-skip-forward-fill control-icon" @click="fastForwardAudio(currentlyPlayingIndex)"
            title="Fast Forward 10s" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Fast forward 10 seconds"></i>
          <i class="bi bi-stop-fill control-icon" @click="stopAudio(currentlyPlayingIndex)" title="Stop"
            data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Stop"></i>
          <i class="bi control-icon"
            :class="`bi-volume-${volume > 0.5 ? 'up' : volume > 0 ? 'down' : 'mute'}-fill`" @click="toggleVolume"
            title="Volume" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Adjust volume"></i>
          <div v-if="showVolumeBar" class="volume-bar-container">
            <input type="range" v-model="volume" min="0" max="1" step="0.1" @input="updateVolume"
              class="volume-slider" aria-label="Volume control" />
          </div>
          <span class="time">{{ formatTime(currentTime) }} / {{ formatTime(totalTime) }}</span>
          <i class="bi bi-x control-icon close-icon" @click="closeAudioPlayer" title="Close" data-bs-toggle="tooltip"
            data-bs-placement="top" aria-label="Close audio player"></i>
        </div>
        <div class="progress-bar" @click="seekAudio($event, currentlyPlayingIndex)" aria-label="Seek audio">
          <div class="progress" :style="{ width: progress[currentlyPlayingIndex] + '%' }"></div>
        </div>
      </div>
    </div>
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
        backgroundColor: '#ffffff',
        color: '#000000',
        fontStyle: 'normal',
        textShadow: 'none',
        textDecoration: '',
        fontFamily: 'Arial, sans-serif',
      },
      events: [],
      originalEvents: [],
      showSuccess: false,
      currentIndex: 0,
      selectedVoice: null,
      ttsState: 'stopped', // 'playing' | 'paused' | 'stopped'
      utterance: null,
      pausedWordIndex: 0,
      currentTtsText: '',
      synth: window.speechSynthesis,
      copySuccess: false,
      searchTerm: '',
      showAudioPlayer: false,
      isAudioPlaying: {},
      currentlyPlayingIndex: null,
      progress: {},
      currentTime: 0,
      totalTime: 0,
      volume: 1,
      showVolumeBar: false,
      fontSize: 18,
      tempFontSize: 18,
      scrollDirection: 'up',
      searchQuery: '',
      summaryText: '',
      summaryLoading: false,
      summaryError: '',
      showSummary: true,
    };
  },
  computed: {
    offcanvasStyle() {
      return {
        backgroundColor: '#10584f',
        width: window.innerWidth < 576 ? '100%' : '400px',
      };
    },
    wordCount() {
      const div = document.createElement('div');
      div.innerHTML = this.highlightedDescription || '';
      const text = div.textContent || div.innerText || '';
      return text.trim().split(/\s+/).length;
    },
    highlightedDescription() {
      const currentDescription = this.events[this.currentIndex]?.description || '';
      if (!this.searchTerm) return currentDescription;
      const escapedTerm = this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedTerm})`, 'gi');
      return currentDescription.replace(
        regex,
        '<mark style="background-color: #0db691; color: white; border-radius: 4px; padding: 0 4px;">$1</mark>'
      );
    },
    readTime() {
      const wordCount = this.countWords(this.highlightedDescription);
      const wordsPerMinute = 200;
      return Math.ceil(wordCount / wordsPerMinute);
    },
    listenTime() {
      const wordCount = this.countWords(this.highlightedDescription);
      const wordsPerMinute = 150;
      return Math.ceil(wordCount / wordsPerMinute);
    },
  },
  mounted() {
    const saved = localStorage.getItem('userFontSettings');
    if (saved) {
      this.fontSettings = JSON.parse(saved);
    }
    window.addEventListener('resize', this.updateOffcanvasWidth);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.synth.onvoiceschanged = this.loadVoices;
    this.loadVoices();
    this.events = events;
    this.originalEvents = events;
    this.initializeAudioStates();
    this.initializeTooltips();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateOffcanvasWidth);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.synth.onvoiceschanged = null;
    if (this.utterance) {
      this.synth.cancel();
    }
  },
  methods: {
    initializeAudioStates() {
      this.events.forEach((_, index) => {
        this.isAudioPlaying[index] = false;
        this.progress[index] = 0;
      });
    },
    initializeTooltips() {
      this.$nextTick(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
      });
    },
    loadVoices() {
      const voices = this.synth.getVoices();
      if (voices.length) {
        this.selectedVoice = voices.find(voice =>
          voice.lang === 'en-US' &&
          (voice.name.includes('Google') || voice.name.includes('Natural') || voice.name.includes('Jenny') || voice.name.includes('Samantha'))
        ) || voices.find(voice => voice.lang === 'en-US') || voices[0];
      }
    },
    toggleAudioPlayer(index) {
      if (!this.selectedVoice) {
        this.loadVoices();
        return;
      }
      this.currentlyPlayingIndex = index;
      this.showAudioPlayer = true;
      if (this.isAudioPlaying[index]) {
        this.synth.cancel();
        const wordCount = this.countWords(this.currentTtsText);
        const wordsPerSecond = 150 / 60;
        const currentProgress = this.progress[index] / 100;
        this.currentTime = currentProgress * (wordCount / wordsPerSecond);
        this.pausedWordIndex = Math.round(currentProgress * wordCount);
        this.isAudioPlaying[index] = false;
        this.ttsState = 'paused';
      } else {
        this.playAudio(index, this.pausedWordIndex);
      }
    },
    playAudio(index, startWordIndex = 0) {
      if (this.utterance && this.synth.speaking) {
        this.synth.cancel();
      }
      const description = this.stripHtml(this.events[index]?.description || '');
      const title = this.events[index]?.title || '';
      const ttsText = `${title}. Read time ${this.readTime} minutes. Listen time ${this.listenTime} minutes. Word count ${this.wordCount}. ${description}`;
      this.currentTtsText = ttsText;
      const words = ttsText.split(/\s+/).filter(Boolean);
      const newText = startWordIndex > 0 ? words.slice(startWordIndex).join(' ') : ttsText;
      this.utterance = new SpeechSynthesisUtterance(newText);
      this.utterance.voice = this.selectedVoice;
      this.utterance.volume = this.volume;
      this.utterance.onend = () => {
        this.isAudioPlaying[index] = false;
        this.ttsState = 'stopped';
        this.progress[index] = 0;
        this.currentTime = 0;
        this.pausedWordIndex = 0;
        this.showAudioPlayer = false;
      };
      this.utterance.onboundary = (event) => this.updateProgress(event, index, startWordIndex);
      this.synth.speak(this.utterance);
      this.isAudioPlaying[index] = true;
      this.ttsState = 'playing';
      this.updateTotalTime();
      if (startWordIndex > 0) {
        const wordCount = this.countWords(ttsText);
        this.progress[index] = (startWordIndex / wordCount) * 100;
        this.currentTime = (startWordIndex / wordCount) * this.totalTime;
      }
    },
    stopAudio(index) {
      if (this.synth.speaking || this.synth.paused) {
        this.synth.cancel();
        this.isAudioPlaying[index] = false;
        this.ttsState = 'stopped';
        this.progress[index] = 0;
        this.currentTime = 0;
        this.pausedWordIndex = 0;
        this.showAudioPlayer = false;
      }
    },
    rewindAudio(index) {
      if (!this.utterance || !this.isAudioPlaying[index]) return;
      this.synth.cancel();
      const wordCount = this.countWords(this.currentTtsText);
      const wordsPerSecond = 150 / 60;
      const currentProgress = this.progress[index] / 100;
      const currentSecond = currentProgress * (wordCount / wordsPerSecond);
      const newSecond = Math.max(0, currentSecond - 10);
      const newWordIndex = Math.round(newSecond * wordsPerSecond);
      const words = this.currentTtsText.split(/\s+/).filter(Boolean);
      const newText = words.slice(newWordIndex).join(' ');
      this.utterance = new SpeechSynthesisUtterance(newText);
      this.utterance.voice = this.selectedVoice;
      this.utterance.volume = this.volume;
      this.utterance.onend = () => {
        this.isAudioPlaying[index] = false;
        this.ttsState = 'stopped';
        this.progress[index] = 0;
        this.currentTime = 0;
        this.pausedWordIndex = 0;
        this.showAudioPlayer = false;
      };
      this.utterance.onboundary = (event) => this.updateProgress(event, index, newWordIndex);
      this.synth.speak(this.utterance);
      this.isAudioPlaying[index] = true;
      this.ttsState = 'playing';
      this.progress[index] = (newWordIndex / wordCount) * 100;
      this.currentTime = newSecond;
      this.pausedWordIndex = newWordIndex;
    },
    fastForwardAudio(index) {
      if (!this.utterance || !this.isAudioPlaying[index]) return;
      this.synth.cancel();
      const wordCount = this.countWords(this.currentTtsText);
      const wordsPerSecond = 150 / 60;
      const currentProgress = this.progress[index] / 100;
      const currentSecond = currentProgress * (wordCount / wordsPerSecond);
      const newSecond = Math.min(this.totalTime, currentSecond + 10);
      const newWordIndex = Math.round(newSecond * wordsPerSecond);
      const words = this.currentTtsText.split(/\s+/).filter(Boolean);
      const newText = words.slice(newWordIndex).join(' ');
      this.utterance = new SpeechSynthesisUtterance(newText);
      this.utterance.voice = this.selectedVoice;
      this.utterance.volume = this.volume;
      this.utterance.onend = () => {
        this.isAudioPlaying[index] = false;
        this.ttsState = 'stopped';
        this.progress[index] = 0;
        this.currentTime = 0;
        this.pausedWordIndex = 0;
        this.showAudioPlayer = false;
      };
      this.utterance.onboundary = (event) => this.updateProgress(event, index, newWordIndex);
      this.synth.speak(this.utterance);
      this.isAudioPlaying[index] = true;
      this.ttsState = 'playing';
      this.progress[index] = (newWordIndex / wordCount) * 100;
      this.currentTime = newSecond;
      this.pausedWordIndex = newWordIndex;
    },
    seekAudio(event, index) {
      if (!this.utterance || !this.isAudioPlaying[index]) return;
      this.synth.cancel();
      const progressBar = event.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const barWidth = rect.width;
      const clickRatio = clickX / barWidth;
      const wordCount = this.countWords(this.currentTtsText);
      const wordsPerSecond = 150 / 60;
      const newSecond = clickRatio * this.totalTime;
      const newWordIndex = Math.round(newSecond * wordsPerSecond);
      const words = this.currentTtsText.split(/\s+/).filter(Boolean);
      const newText = words.slice(newWordIndex).join(' ');
      this.utterance = new SpeechSynthesisUtterance(newText);
      this.utterance.voice = this.selectedVoice;
      this.utterance.volume = this.volume;
      this.utterance.onend = () => {
        this.isAudioPlaying[index] = false;
        this.ttsState = 'stopped';
        this.progress[index] = 0;
        this.currentTime = 0;
        this.pausedWordIndex = 0;
        this.showAudioPlayer = false;
      };
      this.utterance.onboundary = (event) => this.updateProgress(event, index, newWordIndex);
      this.synth.speak(this.utterance);
      this.isAudioPlaying[index] = true;
      this.ttsState = 'playing';
      this.progress[index] = (newWordIndex / wordCount) * 100;
      this.currentTime = newSecond;
      this.pausedWordIndex = newWordIndex;
    },
    updateProgress(event, index, startWordIndex = 0) {
      if (event.name === 'word' && this.utterance) {
        const text = this.currentTtsText;
        const words = text.split(/\s+/).filter(Boolean);
        const currentWordIndex = startWordIndex + Math.round((event.charIndex / this.utterance.text.length) * (words.length - startWordIndex));
        this.progress[index] = (currentWordIndex / words.length) * 100;
        this.currentTime = (currentWordIndex / words.length) * this.totalTime;
      }
    },
    toggleVolume() {
      this.showVolumeBar = !this.showVolumeBar;
    },
    updateVolume() {
      if (this.utterance) {
        this.utterance.volume = this.volume;
      }
    },
    updateTotalTime() {
      const wordCount = this.countWords(this.highlightedDescription);
      const wordsPerSecond = 150 / 60;
      this.totalTime = Math.ceil(wordCount / wordsPerSecond);
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    },
    closeAudioPlayer() {
      this.stopAudio(this.currentlyPlayingIndex);
      this.showAudioPlayer = false;
      this.currentlyPlayingIndex = null;
    },
    selectEvent(index) {
      if (this.synth.speaking || this.synth.paused) {
        this.stopAudio(this.currentlyPlayingIndex);
      }
      this.currentIndex = index;
      this.scrollToEvent(index);
      this.updateTotalTime();
    },
    scrollToEvent(index) {
      const refs = this.$refs.eventRefs;
      if (refs && refs[index]) {
        refs[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.stopAudio(this.currentlyPlayingIndex);
        this.currentIndex--;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.updateTotalTime();
      }
    },
    next() {
      if (this.currentIndex < this.events.length - 1) {
        this.stopAudio(this.currentlyPlayingIndex);
        this.currentIndex++;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.updateTotalTime();
      }
    },
    saveSettings() {
      localStorage.setItem('userFontSettings', JSON.stringify(this.fontSettings));
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
        const offcanvas = bootstrap.Offcanvas.getInstance(
          document.getElementById('settingsOffcanvas')
        );
        if (offcanvas) {
          offcanvas.hide();
        }
      }, 3000);
    },
    updateOffcanvasWidth() {
      this.$forceUpdate();
    },
    handleVisibilityChange() {
      if (document.hidden && this.synth.speaking) {
        this.stopAudio(this.currentlyPlayingIndex);
      }
    },
    countWords(text) {
      if (!text) return 0;
      return text.split(/\s+/).filter(Boolean).length;
    },
    stripHtml(html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent || div.innerText || '';
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
    filterEvents() {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) {
        this.events = this.originalEvents;
        this.currentIndex = 0;
        this.updateTotalTime();
        return;
      }
      const filtered = this.originalEvents.filter(e =>
        e.title.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query) ||
        e.year.toLowerCase().includes(query)
      );
      this.events = filtered;
      this.currentIndex = 0;
      this.updateTotalTime();
    },
    copyToClipboard() {
      const rawHtml = this.events[this.currentIndex]?.description || '';
      const plainText = this.stripHtml(rawHtml);
      navigator.clipboard.writeText(plainText).then(() => {
        this.copySuccess = true;
        setTimeout(() => {
          this.copySuccess = false;
        }, 2000);
      });
    },
    shareOnWhatsApp() {
      const message = encodeURIComponent(this.stripHtml(this.events[this.currentIndex].description));
      const url = `https://wa.me/?text=${message}`;
      window.open(url, '_blank');
    },
    async summarizeEvent() {
      this.summaryLoading = true;
      this.summaryText = '';
      this.summaryError = '';
      try {
        await new Promise(resolve => setTimeout(resolve, 700));
        const description = this.stripHtml(this.events[this.currentIndex]?.description || '');
        if (!description) {
          this.summaryText = '<em>No summary available for this event.</em>';
          this.summaryLoading = false;
          return;
        }
        // Split into sentences
        const sentences = description.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 20);
        // Keywords and important terms
        const keywords = [
          'Prophet', 'Muhammad', 'Mecca', 'Medina', 'revelation', 'migration', 'battle', 'companions', 'Islam', 'Qur\'an', 'message', 'peace', 'community', 'faith', 'Allah', 'year', 'event', 'significant', 'important', 'victory', 'treaty', 'journey', 'miracle', 'birth', 'death', 'leadership', 'mission', 'struggle', 'persecution', 'hijrah', 'expedition', 'conquest', 'farewell', 'sermon',
          'Hijrah', 'Badr', 'Uhud', 'Hudaybiyyah', 'Isra', 'Mi\'raj', 'Ansar', 'Muhajirun', 'Sahabah', 'Quraish', 'Kaaba', 'Yathrib'
        ];
        // Score sentences by keyword matches and position
        const scored = sentences.map((sentence, idx) => {
          let score = 0;
          keywords.forEach(kw => {
            if (sentence.toLowerCase().includes(kw.toLowerCase())) score += 2;
          });
          if (idx === 0) score += 1.5;
          if (idx === sentences.length - 1) score += 1;
          return { sentence, score };
        });
        scored.sort((a, b) => b.score - a.score || sentences.indexOf(a.sentence) - sentences.indexOf(b.sentence));
        // Remove duplicates
        const seen = new Set();
        const unique = scored.filter(({ sentence }) => {
          const s = sentence.trim();
          if (seen.has(s)) return false;
          seen.add(s);
          return true;
        });
        // Take top 4, always include the first sentence for context
        const summarySentences = [unique[0]?.sentence]
          .concat(unique.slice(1, 4).map(s => s.sentence))
          .filter(Boolean);
        // Highlight important names/dates
        const highlight = s =>
          s.replace(/(Prophet Muhammad|Mecca|Medina|Qur'an|Allah|Hijrah|Badr|Uhud|Hudaybiyyah|Isra|Mi'raj|Ansar|Muhajirun|Sahabah|Quraish|Kaaba|Yathrib|\b\d{3,4}\b)/g, '<b>$1</b>');
        let summary = '';
        summarySentences.forEach(sentence => {
          summary += `<p style=\"margin-bottom:1em;\">${highlight(sentence.trim())}</p>`;
        });
        if (summarySentences.length === 0) {
          summary = '<em>No summary available for this event.</em>';
        }
        this.summaryText = summary;
        // Auto-scroll to summary section
        this.$nextTick(() => {
          if (this.$refs.summarySection) {
            this.$refs.summarySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      } catch (err) {
        this.summaryError = err.message || 'Error generating summary.';
      } finally {
        this.summaryLoading = false;
      }
    },
    toggleSummary() {
      this.showSummary = !this.showSummary;
    },
  },
  watch: {
    fontSettings: {
      handler(newVal) {
        localStorage.setItem('fontSettings', JSON.stringify(newVal));
      },
      deep: true,
    },
    currentIndex() {
      this.summaryText = '';
      this.summaryError = '';
      this.showSummary = true;
    },
  },
};
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

.audio-player-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1001;
  background-color: rgba(33, 33, 33, 0.98);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 12px 12px 0 0;
  transition: transform 0.3s ease-in-out;
}

.custom-audio-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 16px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.controls {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  justify-content: center;
}

.control-icon {
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.2s, transform 0.2s ease-in-out;
  padding: 8px;
}

.control-icon:hover,
.control-icon:active,
.control-icon:focus {
  color: #0db691;
  transform: scale(1.1);
  outline: none;
}

.close-icon {
  margin-left: auto;
  margin-right: 8px;
}

.volume-bar-container {
  display: inline-flex;
  align-items: center;
  margin-left: 12px;
  width: 100px;
}

.volume-slider {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  background: #666;
  outline: none;
  opacity: 0.8;
  transition: opacity 0.2s;
  border-radius: 12px;
}

.volume-slider:hover {
  opacity: 1;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #0db691;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.volume-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #0db691;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.time {
  color: #e0e0e0;
  font-size: 0.9rem;
  margin-left: 12px;
  font-weight: 500;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #555;
  border-radius: 12px;
  margin-top: 12px;
  overflow: hidden;
  cursor: pointer;
}

.progress {
  height: 100%;
  background: #0db691;
  transition: width 0.3s ease;
}

.event-box {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 0 auto;
}

.time-estimates {
  font-size: 0.9rem;
  color: #333;
}

.time-estimates span {
  display: flex;
  align-items: center;
}

/* Extra Small Screens (<400px) */
@media (max-width: 399px) {
  .controls {
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }
  .control-icon {
    font-size: 1.5rem;
    padding: 6px;
  }
  .close-icon {
    margin-left: 0;
    margin-right: 4px;
  }
  .volume-bar-container {
    margin-left: 0;
    margin-top: 8px;
    width: 80px;
  }
  .volume-slider {
    width: 100%;
  }
  .time {
    margin-left: 0;
    margin-top: 8px;
    font-size: 0.8rem;
  }
  .audio-player-container {
    padding: 8px;
  }
  .custom-audio-player {
    padding: 8px;
  }
  .progress-bar {
    height: 6px;
    margin-top: 8px;
  }
  .event-box {
    padding: 12px;
  }
  .time-estimates {
    flex-direction: column;
    gap: 8px;
    font-size: 0.85rem;
  }
}

/* Small Screens (400px–575px) */
@media (min-width: 400px) and (max-width: 575px) {
  .controls {
    gap: 12px;
    flex-wrap: wrap;
  }
  .control-icon {
    font-size: 1.3rem;
    padding: 6px;
  }
  .close-icon {
    margin-left: auto;
    margin-right: 6px;
  }
  .volume-bar-container {
    margin-left: 8px;
    width: 80px;
  }
  .volume-slider {
    width: 100%;
  }
  .time {
    margin-left: 8px;
    font-size: 0.8rem;
  }
  .audio-player-container {
    padding: 10px;
  }
  .custom-audio-player {
    padding: 10px;
  }
  .progress-bar {
    height: 6px;
    margin-top: 10px;
  }
  .event-box {
    padding: 16px;
  }
  .time-estimates {
    font-size: 0.85rem;
  }
}

/* Medium Screens (576px–767px) */
@media (min-width: 576px) and (max-width: 767px) {
  .controls {
    gap: 14px;
    flex-wrap: wrap;
  }
  .control-icon {
    font-size: 1.3rem;
    padding: 8px;
  }
  .close-icon {
    margin-left: auto;
    margin-right: 6px;
  }
  .volume-bar-container {
    margin-left: 10px;
    width: 90px;
  }
  .volume-slider {
    width: 100%;
  }
  .time {
    margin-left: 10px;
    font-size: 0.85rem;
  }
  .audio-player-container {
    padding: 10px 14px;
  }
  .custom-audio-player {
    padding: 10px 14px;
  }
  .progress-bar {
    margin-top: 10px;
  }
  .event-box {
    padding: 18px;
  }
}

/* Large Screens (≥768px) */
@media (min-width: 768px) {
  .controls {
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 16px;
  }
  .control-icon {
    font-size: 1.3rem;
    padding: 8px;
  }
  .close-icon {
    margin-left: auto;
    margin-right: 8px;
  }
  .volume-bar-container {
    margin-left: 12px;
    width: 100px;
  }
  .volume-slider {
    width: 100%;
  }
  .time {
    margin-left: 12px;
    font-size: 0.9rem;
  }
  .progress-bar {
    margin-top: 12px;
  }
}

@media (max-width: 767px) {
  #settingsOffcanvas {
    width: 100% !important;
  }
}

@media (min-width: 768px) {
  #settingsOffcanvas {
    width: 400px !important;
  }
}

.custom-offcanvas {
  background-color: #10584f;
  color: white;
  min-width: 300px;
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

.action-button:hover {
  color: #0db691;
}

mark {
  background-color: #0db691;
  color: white;
  padding: 0 4px;
  border-radius: 4px;
}

.timeline::-webkit-scrollbar {
  display: none;
}

.timeline-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.timeline-wrapper::-webkit-scrollbar {
  display: none;
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
  cursor: not-allowed;
}

.controls button:hover:not(:disabled) {
  background-color: #0db691;
}

.fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #20c997;
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
  cursor: pointer;
}

.fab:hover {
  background-color: #17a085;
  transform: scale(1.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.summary-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 1px solid #dee2e6;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.ai-summary-inline {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #dee2e6;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.ai-summary-inline .summary-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 0.75rem;
}

.ai-summary-inline .summary-footer {
  padding-top: 0.5rem;
  border-top: 1px solid #e9ecef;
  font-size: 0.8rem;
  color: #6c757d;
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .timeline-badge {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
  
  .display-6 {
    font-size: 1.5rem;
  }
  
  .display-5 {
    font-size: 1.75rem;
  }
  
  .event-box {
    padding: 15px;
  }
  
  .ai-summary-inline {
    padding: 0.75rem;
    margin-top: 1rem;
  }
  
  .ai-summary-inline .summary-text {
    font-size: 0.9rem;
  }
  
  .controls button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .timeline-badge {
    padding: 0.5rem 0.8rem;
    font-size: 0.85rem;
  }
  
  .display-6 {
    font-size: 1.25rem;
  }
  
  .display-5 {
    font-size: 1.5rem;
  }
  
  .event-box {
    padding: 12px;
  }
  
  .ai-summary-inline {
    padding: 0.5rem;
  }
  
  .ai-summary-inline .summary-text {
    font-size: 0.85rem;
  }
  
  .controls button {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }
  
  .time-estimates span {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .timeline-badge {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }
  
  .display-6 {
    font-size: 1.1rem;
  }
  
  .display-5 {
    font-size: 1.3rem;
  }
  
  .event-box {
    padding: 10px;
  }
  
  .ai-summary-inline {
    padding: 0.4rem;
  }
  
  .ai-summary-inline .summary-text {
    font-size: 0.8rem;
  }
  
  .controls button {
    padding: 0.35rem 0.7rem;
    font-size: 0.8rem;
  }
}
</style>
