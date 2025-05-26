<template>
  <div class="tasbeeh-container">
    <h1 class="title">Digital Tasbeeh Counter</h1>
    <h3 class="subtitle">Tap, swipe right, or say "SubhanAllah" to count</h3>

    <!-- Counter and Dhikr Display -->
    <div class="counter-container">
      <div class="dhikr-display">
        <span class="dhikr-text">{{ currentDhikr }}</span>
        <span class="dhikr-text-arabic">{{ currentDhikrAr }}</span>
      </div>
      <div class="counter" aria-live="polite">{{ animatedCounter }}</div>
    </div>

    <!-- Bead String -->
    <div class="bead-string">
      <span v-for="n in goal" :key="n" class="bead"
            :class="{ filled: n <= counter % goal }"></span>
    </div>

    <!-- Milestone Message -->
    <transition name="fade">
      <div v-if="showMilestone" class="milestone">
        {{ milestoneMessage }}
      </div>
    </transition>

    <!-- Voice Feedback -->
    <transition name="fade">
      <div v-if="voiceStatus" class="voice-status" :class="{ error: voiceStatus.includes('Error') }">
        {{ voiceStatus }}
      </div>
    </transition>

    <!-- Tap and Swipe Area -->
    <div class="tap-area-wrapper">
      <button class="tap-area" :class="{ 'swipe-right': swipeDirection === 'right', 'swipe-left': swipeDirection === 'left' }"
              @click="handleClick" @touchstart.passive="handleTouchStart"
              @touchmove.passive="handleTouchMove" @touchend="handleTouchEnd"
              role="button" aria-label="Tap or swipe to increment/decrement counter" tabindex="0"
              @keydown.enter="handleClick">
        Tap or swipe right to count
        <span v-if="swipeDirection === 'right'" class="arrow-right">➡️</span>
        <span v-if="swipeDirection === 'left'" class="arrow-left">⬅️</span>
      </button>
    </div>

    <!-- Control Buttons -->
    <div class="controls">
      <button class="voice-btn" :class="{ active: isListening }" :disabled="!recognitionAvailable"
              @click="toggleVoiceControls" role="button" aria-label="Toggle voice" tabindex="0"
              @keydown.enter="toggleVoiceControls">
        <i class="fas fa-microphone" :class="{ 'fa-microphone-slash disabled': !isListening }"></i>
        {{ isListening ? "Stop Listening" : "Start Voice Commands" }}
      </button>
      <button @click="undoClick" role="button" aria-label="Undo last count"
              tabindex="0" @keydown.enter="undoClick">
        <i class="fas fa-undo"></i> Undo
      </button>
      <button @click="resetAll" role="button" aria-label="Reset counter"
              tabindex="0" @keydown.enter="resetAll">
        <i class="fas fa-redo"></i> Reset
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TasbeehCounter",
  data() {
    return {
      animatedCounter: 0,
      counter: 0,
      goal: 33,
      dhikrList: ["SubhanAllah", "Alhamdulillah", "Allahu Akbar"],
      dhikrListAr: ["سبحان الله", "الحمد لله", "الله أكبر"],
      showMilestone: false,
      milestoneMessage: "",
      audio: null,
      isListening: false,
      recognition: null,
      recognitionAvailable: false,
      voiceStatus: "",
      touchStartX: null,
      touchEndX: null,
      swipeDirection: null
    };
  },
  computed: {
    currentDhikr() {
      const round = Math.floor(this.counter / this.goal) % this.dhikrList.length;
      console.log('Computed currentDhikr:', this.dhikrList[round]);
      return this.dhikrList[round];
    },
    currentDhikrAr() {
      const round = Math.floor(this.counter / this.goal) % this.dhikrListAr.length;
      console.log('Computed currentDhikrAr:', this.dhikrListAr[round]);
      return this.dhikrListAr[round];
    }
  },
  async mounted() {
    console.log('Component mounted at', new Date().toISOString());
    
    // Load saved counter
    try {
      const saved = localStorage.getItem("tasbeehCounter");
      if (saved) {
        this.counter = parseInt(saved, 10) || 0;
        this.animatedCounter = this.counter;
        console.log('Loaded counter from localStorage:', this.counter);
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }

    // Initialize audio with offline fallback
    try {
      const audioUrl = "https://www.fesliyanstudios.com/play-mp3/387";
      const cachedAudio = localStorage.getItem("tasbeehAudio");
      if (cachedAudio) {
        this.audio = new Audio(cachedAudio);
        console.log('Loaded audio from cache');
      } else {
        this.audio = new Audio(audioUrl);
        this.audio.load();
        const response = await fetch(audioUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          localStorage.setItem("tasbeehAudio", reader.result);
          console.log('Audio cached in localStorage');
        };
        reader.readAsDataURL(blob);
      }
      console.log('Audio initialized successfully');
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }

    // Initialize SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        this.setupRecognition();
        this.recognitionAvailable = true;
        console.log('SpeechRecognition initialized');
      } catch (error) {
        console.error('Failed to initialize SpeechRecognition:', error);
        this.recognitionAvailable = false;
        this.voiceStatus = 'Error: Voice commands not supported.';
        setTimeout(() => { this.voiceStatus = ""; }, 2000);
      }
    } else {
      console.warn('SpeechRecognition API not supported in this browser.');
      this.recognitionAvailable = false;
      this.voiceStatus = 'Error: Voice commands not supported.';
      setTimeout(() => { this.voiceStatus = ""; }, 2000);
    }
  },
  watch: {
    counter(newVal) {
      console.log('Counter updated:', newVal);
      try {
        localStorage.setItem("tasbeehCounter", newVal);
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
      }
    }
  },
  methods: {
    setupRecognition() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.lang = 'ar-SA';
      this.recognition.maxAlternatives = 10;

      this.recognition.onresult = (event) => {
        const results = event.results[event.results.length - 1];
        const transcript = results[0].transcript.trim();
        const confidence = results[0].confidence;
        if (confidence >= 0.6) {
          this.voiceStatus = `Heard: "${transcript}" (${(confidence * 100).toFixed(0)}%)`;
          this.handleVoiceCommand(transcript);
          console.log('Voice command received:', transcript, 'Confidence:', confidence);
        } else {
          this.voiceStatus = `Heard: "${transcript}" (Low confidence: ${(confidence * 100).toFixed(0)}%)`;
          console.log('Low confidence voice command:', transcript, 'Confidence:', confidence);
        }
        setTimeout(() => { this.voiceStatus = ""; }, 2000);
      };
      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        this.isListening = false;
        let errorMessage = `Error: ${event.error}`;
        if (event.error === 'no-speech') {
          errorMessage = 'Error: No speech detected. Speak louder or move closer.';
        } else if (event.error === 'not-allowed') {
          errorMessage = 'Error: Microphone access denied. Please allow access.';
        } else if (event.error === 'network') {
          errorMessage = 'Error: Network issue. Check your connection.';
        }
        this.voiceStatus = errorMessage;
        setTimeout(() => { this.voiceStatus = ""; }, 2000);
      };
      this.recognition.onend = () => {
        console.log('Speech recognition ended');
        if (this.isListening) {
          setTimeout(() => {
            try {
              this.recognition.start();
              console.log('Speech recognition restarted');
            } catch (error) {
              console.error('Failed to restart recognition:', error);
              this.isListening = false;
              this.voiceStatus = 'Error: Voice recognition stopped.';
              setTimeout(() => { this.voiceStatus = ""; }, 2000);
            }
          }, 100);
        }
      };
    },
    animateCounter(target) {
      console.log('Animating counter to:', target);
      const step = () => {
        if (this.animatedCounter === target) return;
        const direction = target > this.animatedCounter ? 1 : -1;
        this.animatedCounter += direction;
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },
    handleClick(event) {
      console.log('Handle click triggered', event.type);
      this.playSound();
      this.counter++;
      this.animatedCounter = this.counter;
      this.checkMilestone();
    },
    undoClick() {
      console.log('Undo click triggered');
      if (this.counter > 0) {
        this.playSound();
        this.counter--;
        this.animatedCounter = this.counter;
      }
    },
    resetAll() {
      console.log('Reset all triggered');
      this.playSound();
      this.counter = 0;
      this.animatedCounter = 0;
    },
    playSound() {
      try {
        if (this.audio) {
          this.audio.currentTime = 0;
          this.audio.play();
          console.log('Sound played');
        }
      } catch (error) {
        console.error('Failed to play sound:', error);
      }
    },
    checkMilestone() {
      const milestones = [33, 66, 99];
      if (milestones.includes(this.counter)) {
        this.milestoneMessage = `You reached ${this.counter}! Keep going!`;
        this.showMilestone = true;
        console.log('Milestone reached:', this.counter);
        setTimeout(() => {
          this.showMilestone = false;
          console.log('Milestone message hidden');
        }, 3000);
      }
    },
    toggleVoiceControls() {
      console.log('Toggle voice controls triggered');
      if (!this.recognitionAvailable) {
        this.voiceStatus = 'Error: Voice controls not supported.';
        setTimeout(() => { this.voiceStatus = ""; }, 2000);
        return;
      }
      if (this.isListening) {
        try {
          this.recognition.stop();
          this.isListening = false;
          this.voiceStatus = 'Voice recognition stopped.';
          setTimeout(() => { this.voiceStatus = ""; }, 2000);
          console.log('Voice recognition stopped');
        } catch (error) {
          console.error('Failed to stop recognition:', error);
          this.voiceStatus = 'Error: Failed to stop voice controls.';
          setTimeout(() => { this.voiceStatus = ""; }, 2000);
        }
      } else {
        try {
          this.recognition.start();
          this.isListening = true;
          this.voiceStatus = 'Listening...';
          console.log('Voice recognition started');
        } catch (error) {
          console.error('Failed to start recognition:', error);
          this.voiceStatus = 'Error: Failed to start voice controls.';
          setTimeout(() => { this.voiceStatus = ""; }, 2000);
          this.isListening = false;
        }
      }
    },
    handleVoiceCommand(transcript) {
      console.log('Processing voice command:', transcript);
      const subhanAllahVariationsAr = [
        'سبحان الله', 'سبحانالله', 'سبحان', 'سوبحان الله', 'سبحان اللہ',
        'سبحاناللہ', 'سوبحان', 'سبحانا', 'سبحانا الله', 'سبحان اللاه',
        'سبحان اللة', 'سبحانا اللہ', 'سوبحانالله', 'سبحان اللله',
        'سبحانا اللة', 'سبحاناله', 'سوبحان اللہ', 'سبحان الل'
      ];

      const levenshteinDistance = (a, b) => {
        const matrix = Array(b.length + 1).fill().map(() => Array(a.length + 1).fill(0));
        for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
        for (let j = 0; j <= b.length; j++) matrix[j][0] = j;
        for (let j = 1; j <= b.length; j++) {
          for (let i = 1; i <= a.length; i++) {
            const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(
              matrix[j][i - 1] + 1,
              matrix[j - 1][i] + 1,
              matrix[j - 1][i - 1] + indicator
            );
          }
        }
        return matrix[b.length][a.length];
      };

      const isSubhanAllah = subhanAllahVariationsAr.some(variation => 
        transcript.includes(variation) || levenshteinDistance(transcript, variation) <= 3
      );

      if (isSubhanAllah) {
        this.handleClick({ type: 'voice' });
        console.log('Voice command: SubhanAllah detected');
      } else if (transcript.includes('رجوع') || transcript.includes('تراجع') || transcript.includes('الغاء')) {
        this.undoClick();
        console.log('Voice command: Undo detected');
      } else if (transcript.includes('إعادة') || transcript.includes('تصفير') || transcript.includes('بدء من جديد')) {
        this.resetAll();
        console.log('Voice command: Reset detected');
      } else {
        console.log('No matching voice command');
      }
    },
    handleTouchStart(event) {
      this.touchStartX = event.touches[0].clientX;
      this.swipeDirection = null;
      console.log('Touch start:', this.touchStartX);
    },
    handleTouchMove(event) {
      this.touchEndX = event.touches[0].clientX;
      console.log('Touch move:', this.touchEndX);
    },
    handleTouchEnd() {
      if (this.touchStartX !== null && this.touchEndX !== null) {
        const deltaX = this.touchEndX - this.touchStartX;
        const minSwipeDistance = 50;
        if (deltaX > minSwipeDistance) {
          this.swipeDirection = 'right';
          this.handleClick({ type: 'swipe-right' });
          console.log('Swipe right detected');
        } else if (deltaX < -minSwipeDistance) {
          this.swipeDirection = 'left';
          this.undoClick();
          console.log('Swipe left detected');
        }
        setTimeout(() => { this.swipeDirection = null; }, 300);
      }
      this.touchStartX = null;
      this.touchEndX = null;
    }
  }
};
</script>

<style scoped>
:root {
  --primary-color: #198754;
  --secondary-color: #ffc107;
  --background-color: #f8f9fa;
  --text-color: #333;
}

.tasbeeh-container {
  min-height: 100vh;
  background: var(--background-color);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 100vw;
  overflow-x: hidden;
}

.title {
  font-size: clamp(1.5rem, 5vw, 1.8rem);
  color: var(--primary-color);
  margin-bottom: 8px;
}

.subtitle {
  font-size: clamp(0.9rem, 3vw, 1rem);
  color: var(--text-color);
  opacity: 0.7;
  margin-bottom: 16px;
}

.counter-container {
  margin-bottom: 16px;
  text-align: center;
}

.dhikr-display {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 12px;
}

.dhikr-text {
  font-size: clamp(1.4rem, 4vw, 1.6rem);
  font-weight: bold;
  color: var(--primary-color);
}

.dhikr-text-arabic {
  font-size: clamp(1rem, 3vw, 1.1rem);
  color: var(--text-color);
  opacity: 0.8;
  font-family: 'Amiri', serif;
}

.counter {
  font-size: clamp(2.5rem, 6vw, 2.8rem);
  font-weight: bold;
  color: var(--primary-color);
}

.bead-string {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  margin-bottom: 16px;
}

.bead {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #e0e0e0;
  border: 2px solid var(--primary-color);
}

.bead.filled {
  background: var(--primary-color);
}

.tap-area-wrapper {
  width: 80%;
  max-width: 300px;
  margin-bottom: 16px;
}

.tap-area {
  font-size: clamp(1rem, 3vw, 1.1rem);
  padding: 12px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  transition: background 0.2s, transform 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.tap-area:hover {
  background: #28a745;
}

.tap-area:active {
  background: #146c43;
}

.tap-area.swipe-right {
  transform: translateX(8px);
}

.tap-area.swipe-left {
  transform: translateX(-8px);
}

.arrow-right, .arrow-left {
  font-size: 1.2rem;
  opacity: 0.8;
}

.controls {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  width: 80%;
  max-width: 300px;
}

.controls button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px;
  background: #e0e0e0;
  border: none;
  border-radius: 8px;
  font-size: clamp(0.8rem, 2.5vw, 0.9rem);
  color: var(--text-color);
  cursor: pointer;
  flex: 1;
  min-width: 80px;
  transition: background 0.2s;
}

.controls button:hover {
  background: #d0d0d0;
}

.controls button:active {
  background: #c0c0c0;
}

.controls button:disabled {
  background: #f0f0f0;
  color: #999;
  cursor: not-allowed;
}

.voice-btn.active {
  background: #ff4d4d;
  color: white;
}

.milestone {
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  color: var(--secondary-color);
  margin-bottom: 16px;
}

.voice-status {
  font-size: clamp(0.8rem, 2.5vw, 0.9rem);
  color: var(--text-color);
  opacity: 0.7;
  margin-bottom: 8px;
}

.voice-status.error {
  color: #dc3545;
  opacity: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>