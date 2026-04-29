<template>
  <div class="chaining-method-container" :class="{ 'is-completed': isCompleted }">
    <!-- Header & Progress -->
    <header class="chain-header">
      <div class="chain-meta">
        <h2 class="chain-title">Chaining Method</h2>
        <div class="chain-stats">
          <span class="badge-premium">
            <i class="bi bi-clock-history"></i> {{ estimatedTime }} min left
          </span>
          <button @click="resetChain" class="btn-reset" title="Reset progress" aria-label="Reset progress">
            <i class="bi bi-arrow-counterclockwise"></i>
          </button>
        </div>
      </div>

      <div class="chain-progress-container">
        <div class="chain-progress-bar" role="progressbar" :aria-valuenow="Math.round(progressPercentage)" aria-valuemin="0" aria-valuemax="100" :aria-label="`Chain progress ${Math.round(progressPercentage)}%`">
          <div class="chain-progress-fill" :style="{ width: progressPercentage + '%' }"></div>
        </div>
        <div class="chain-progress-labels">
          <span>Step {{ currentStepIndex + 1 }} of {{ totalSteps }}</span>
          <span>{{ Math.round(progressPercentage) }}%</span>
        </div>
      </div>
    </header>

    <!-- Visual Chain Map -->
    <div class="chain-map-scroll">
      <div class="chain-map">
        <div 
          v-for="(step, index) in steps" 
          :key="index"
          class="chain-node-wrapper"
        >
          <button
            class="chain-node"
            :class="{
              'is-active': currentStepIndex === index,
              'is-completed': index < currentStepIndex,
              'is-locked': index > currentStepIndex
            }"
            type="button"
            :disabled="index > currentStepIndex"
            :aria-current="currentStepIndex === index ? 'step' : undefined"
            :aria-label="`Go to step ${index + 1}`"
            @click="jumpToStep(index)"
          >
            <div class="node-content">
              <i v-if="index < currentStepIndex" class="bi bi-check-lg"></i>
              <span v-else>{{ getStepLabel(step) }}</span>
            </div>
            <div class="node-pulse" v-if="currentStepIndex === index"></div>
          </button>
          <div v-if="index < steps.length - 1" class="chain-connector" :class="{ 'is-active': index < currentStepIndex }"></div>
        </div>
      </div>
    </div>

    <!-- Active Step Content -->
    <main class="chain-main">
      <transition name="slide-fade" mode="out-in">
        <div :key="currentStepIndex" class="active-step-card">
          <div class="step-badge">Phase: {{ currentStep.type === 'single' ? 'Memorize' : 'Link' }}</div>
          <h3 class="verse-range">
            {{ currentStep.verses.length > 1 
               ? `Verses ${currentStep.verses[0]} – ${currentStep.verses[currentStep.verses.length-1]}` 
               : `Verse ${currentStep.verses[0]}` 
            }}
          </h3>
          
          <div class="verse-display-area" :style="{ filter: `blur(${blurAmount}px)` }">
            <div class="verse-placeholder">
              <i class="bi bi-book"></i>
              <p>Recite the assigned segment from memory or follow along.</p>
            </div>
          </div>

          <!-- Blur Progression -->
          <div class="blur-control">
            <div class="blur-header">
              <label for="chainBlurIntensity">Focus / Blur Intensity</label>
              <span>{{ blurIntensity }}%</span>
            </div>
            <input
              id="chainBlurIntensity"
              type="range" 
              v-model="blurIntensity" 
              min="0" 
              max="100" 
              class="premium-slider"
            >
          </div>
        </div>
      </transition>
    </main>

    <!-- Control Panel -->
    <footer class="chain-controls">
      <div class="audio-guidance">
        <div class="audio-main">
          <button @click="togglePlay" class="btn-audio-play" :class="{ 'is-playing': isPlaying }">
            <i :class="isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
          </button>
          <div class="audio-info">
            <span class="audio-label">Audio Guidance</span>
            <div class="audio-settings">
              <select v-model="playbackSpeed" class="select-premium">
                <option value="0.5">0.5x</option>
                <option value="0.75">0.75x</option>
                <option value="1">1.0x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
              </select>
              <button @click="repeatStep" class="btn-icon-subtle" title="Repeat Segment">
                <i class="bi bi-repeat"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="toggle-group">
          <label class="premium-switch">
            <input type="checkbox" v-model="autoAdvance">
            <span class="slider"></span>
          </label>
          <span class="toggle-label">Auto-Advance</span>
        </div>
      </div>

      <div class="chain-config">
        <div class="config-item">
          <label>Chain Strength</label>
          <div class="pill-selector">
            <button 
              v-for="size in [3, 5, 7, 10]" 
              :key="size"
              @click="setChainSize(size)"
              :class="{ 'is-active': chainSize === size }"
            >
              {{ size }}
            </button>
          </div>
        </div>
        
        <button @click="nextStep" class="btn-next-step" :disabled="isCompleted">
          {{ isCompleted ? 'Mastered!' : (currentStepIndex === totalSteps - 1 ? 'Finish Chain' : 'Next Step') }}
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </footer>

    <!-- Completion Overlay -->
    <transition name="fade">
      <div v-if="isCompleted" class="completion-overlay">
        <div class="confetti-container">
          <div v-for="n in 50" :key="n" class="confetti" :style="generateConfettiStyle(n)"></div>
        </div>
        <div class="completion-card">
          <div class="success-icon">
            <i class="bi bi-trophy-fill"></i>
          </div>
          <h2>Chain Mastered!</h2>
          <p>You have successfully connected {{ chainSize }} verses.</p>
          <button @click="resetChain" class="btn-premium-outline">Start New Chain</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

const chainSize = ref(5);
const currentStepIndex = ref(0);
const blurIntensity = ref(0);
const isPlaying = ref(false);
const playbackSpeed = ref(1);
const autoAdvance = ref(false);
const isCompleted = ref(false);

// Chaining Logic: 1 -> 2 -> 1+2 -> 3 -> 1+2+3...
const steps = computed(() => {
  const s = [];
  for (let i = 1; i <= chainSize.value; i++) {
    // Add single verse step
    s.push({ type: 'single', verses: [i] });
    // Add cumulative step (except for the first verse)
    if (i > 1) {
      const cumulative = [];
      for (let j = 1; j <= i; j++) cumulative.push(j);
      s.push({ type: 'link', verses: cumulative });
    }
  }
  return s;
});

const currentStep = computed(() => steps.value[currentStepIndex.value] || steps.value[0]);
const totalSteps = computed(() => steps.value.length);
const progressPercentage = computed(() => (currentStepIndex.value / (totalSteps.value - 1)) * 100);
const blurAmount = computed(() => (blurIntensity.value / 100) * 20);

const estimatedTime = computed(() => {
  const stepsLeft = totalSteps.value - currentStepIndex.value;
  return Math.ceil(stepsLeft * 1.5); // Roughly 1.5 min per step
});

const getStepLabel = (step) => {
  if (step.type === 'single') return step.verses[0];
  return `1-${step.verses[step.verses.length - 1]}`;
};

const nextStep = () => {
  if (currentStepIndex.value < totalSteps.value - 1) {
    currentStepIndex.value++;
    // Automatically increase blur as we progress
    blurIntensity.value = Math.min(100, Math.round((currentStepIndex.value / totalSteps.value) * 100));
  } else {
    isCompleted.value = true;
  }
  saveToStorage();
};

const jumpToStep = (index) => {
  if (index <= currentStepIndex.value) {
    currentStepIndex.value = index;
    saveToStorage();
  }
};

const setChainSize = (size) => {
  chainSize.value = size;
  resetChain();
};

const resetChain = () => {
  currentStepIndex.value = 0;
  blurIntensity.value = 0;
  isCompleted.value = false;
  isPlaying.value = false;
  saveToStorage();
};

const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value && autoAdvance.value) {
    // Mock auto-advance after 5 seconds for demo
    setTimeout(() => {
      if (isPlaying.value) nextStep();
    }, 5000);
  }
};

const repeatStep = () => {
  isPlaying.value = false;
  setTimeout(() => isPlaying.value = true, 100);
};

const generateConfettiStyle = (n) => {
  const colors = ['#2ecc71', '#27ae60', '#f1c40f', '#e67e22', '#ffffff'];
  return {
    left: Math.random() * 100 + '%',
    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
    animationDelay: Math.random() * 3 + 's',
    transform: `rotate(${Math.random() * 360}deg)`
  };
};

const saveToStorage = () => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  localStorage.setItem('chaining_method_state', JSON.stringify({
    chainSize: chainSize.value,
    currentStepIndex: currentStepIndex.value,
    blurIntensity: blurIntensity.value,
    autoAdvance: autoAdvance.value
  }));
};

onMounted(() => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  const saved = localStorage.getItem('chaining_method_state');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      chainSize.value = Number(data?.chainSize || 5) || 5;
      currentStepIndex.value = Math.max(0, Number(data?.currentStepIndex || 0) || 0);
      blurIntensity.value = Math.max(0, Number(data?.blurIntensity || 0) || 0);
      autoAdvance.value = !!data?.autoAdvance;
    } catch (_) {
      resetChain();
    }
  }
});

watch([chainSize, currentStepIndex, blurIntensity, autoAdvance], saveToStorage);
</script>

<style scoped>
.chaining-method-container {
  --primary: #10b981;
  --primary-dark: #059669;
  --bg-dark: #0f172a;
  --card-bg: #1e293b;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255, 255, 255, 0.1);
  
  background: var(--bg-dark);
  color: var(--text-main);
  border-radius: 24px;
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  font-family: 'Inter', system-ui, sans-serif;
}

/* Header */
.chain-header {
  margin-bottom: 32px;
}

.chain-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chain-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.chain-stats {
  display: flex;
  gap: 12px;
  align-items: center;
}

.badge-premium {
  background: rgba(16, 185, 129, 0.1);
  color: var(--primary);
  padding: 6px 12px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.btn-reset {
  background: none;
  border: 1px solid transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}
.btn-reset:focus-visible,
.chain-node:focus-visible,
.btn-audio-play:focus-visible,
.btn-icon-subtle:focus-visible,
.pill-selector button:focus-visible,
.btn-next-step:focus-visible,
.btn-premium-outline:focus-visible,
.select-premium:focus-visible,
.premium-slider:focus-visible,
.premium-switch input:focus-visible + .slider {
  /* Accessibility: consistent, high-visibility focus ring for keyboard navigation. */
  outline: 2px solid #34d399;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(52, 211, 153, 0.25);
}

.btn-reset:hover {
  color: #ef4444;
  transform: rotate(-45deg);
}

/* Progress Bar */
.chain-progress-container {
  margin-top: 12px;
}

.chain-progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
}

.chain-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary) 0%, #34d399 100%);
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.chain-progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* Visual Chain Map */
.chain-map-scroll {
  overflow-x: auto;
  padding: 20px 0 40px;
  margin: 0 -24px;
  -webkit-overflow-scrolling: touch;
}

.chain-map-scroll::-webkit-scrollbar {
  display: none;
}

.chain-map {
  display: flex;
  align-items: center;
  padding: 0 40px;
  min-width: max-content;
}

.chain-node-wrapper {
  display: flex;
  align-items: center;
}

.chain-node {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: var(--card-bg);
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.chain-node.is-completed {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.chain-node.is-active {
  background: white;
  color: var(--bg-dark);
  border-color: white;
  transform: scale(1.15);
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.2);
}

.chain-node.is-locked {
  opacity: 0.4;
  cursor: not-allowed;
}

.node-pulse {
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 2px solid white;
  border-radius: 18px;
  animation: pulse-ring 2s infinite;
}

.chain-connector {
  width: 30px;
  height: 3px;
  background: var(--border);
  transition: background 0.4s ease;
}

.chain-connector.is-active {
  background: var(--primary);
}

/* Active Step Card */
.active-step-card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  border: 1px solid var(--border);
  position: relative;
}

.step-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.verse-range {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 24px;
}

.verse-display-area {
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  transition: filter 0.5s ease;
}

.verse-placeholder {
  color: var(--text-muted);
}

.verse-placeholder i {
  font-size: 2rem;
  margin-bottom: 12px;
  display: block;
}

/* Blur Slider */
.blur-control {
  margin-top: 32px;
  text-align: left;
}

.blur-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-bottom: 12px;
  color: var(--text-muted);
}

.premium-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  outline: none;
}

.premium-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  transition: transform 0.2s ease;
}

.premium-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

/* Footer Controls */
.chain-controls {
  margin-top: 32px;
}

.audio-guidance {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 24px;
}

.audio-main {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn-audio-play {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--primary);
  border: none;
  color: white;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-audio-play.is-playing {
  background: #ef4444;
  animation: audio-pulse 1.5s infinite;
}

.audio-settings {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.audio-label {
  font-size: 0.85rem;
  font-weight: 600;
}

.select-premium {
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border);
  color: white;
  border-radius: 4px;
  font-size: 0.75rem;
  padding: 2px 4px;
}

.btn-icon-subtle {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
}

.premium-switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.premium-switch input { opacity: 0; width: 0; height: 0; }

.premium-switch .slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: var(--border);
  transition: .4s;
  border-radius: 34px;
}

.premium-switch .slider:before {
  position: absolute;
  content: "";
  height: 14px; width: 14px;
  left: 3px; bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

.premium-switch input:checked + .slider { background-color: var(--primary); }
.premium-switch input:checked + .slider:before { transform: translateX(20px); }

.toggle-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.toggle-label {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.chain-title,
.verse-range,
.audio-label,
.toggle-label,
.chain-progress-labels,
.blur-header,
.verse-placeholder {
  line-height: 1.45;
}

/* Config & Next */
.chain-config {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pill-selector {
  display: flex;
  background: rgba(255,255,255,0.05);
  padding: 4px;
  border-radius: 10px;
  gap: 4px;
  margin-top: 8px;
}

.pill-selector button {
  background: none;
  border: none;
  color: var(--text-muted);
  padding: 4px 12px;
  border-radius: 7px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pill-selector button.is-active {
  background: white;
  color: var(--bg-dark);
  font-weight: 700;
}

.btn-next-step {
  background: white;
  color: var(--bg-dark);
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-next-step:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255,255,255,0.1);
}

.btn-next-step:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Animations */
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

@keyframes pulse-ring {
  0% { transform: scale(0.95); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.2; }
  100% { transform: scale(1.2); opacity: 0; }
}

@keyframes audio-pulse {
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}

/* Completion Overlay */
.completion-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.completion-card {
  text-align: center;
  animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.success-icon {
  width: 80px;
  height: 80px;
  background: var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto 24px;
  color: white;
  box-shadow: 0 0 40px rgba(16, 185, 129, 0.4);
}

.btn-premium-outline {
  background: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 24px;
}

@keyframes scale-in {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Confetti */
.confetti-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.confetti {
  position: absolute;
  width: 8px;
  height: 8px;
  top: -10px;
  border-radius: 2px;
  animation: fall 3s linear infinite;
}

@keyframes fall {
  to { transform: translateY(600px) rotate(720deg); opacity: 0; }
}
</style>
