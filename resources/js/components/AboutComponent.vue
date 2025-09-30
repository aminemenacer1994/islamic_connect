<template>
  <div class="tasbeeh-counter" :class="themeClasses">
    <!-- Header -->
    <header class="app-header">
      <h1 class="app-title">AI Tasbeeh Counter</h1>
      <ThemeToggle v-model="theme" />
    </header>

    <!-- Main Counter -->
    <main class="counter-main">
      <!-- Counter Display -->
      <div class="counter-display">
        <div class="current-count" aria-live="polite" aria-atomic="true">
          {{ formattedCount }}
        </div>
        <div class="counter-label">{{ currentDhikr?.name || 'Select Dhikr' }}</div>
        <div class="progress-container">
          <progress 
            class="counter-progress" 
            :value="progress" 
            max="100"
            aria-label="Progress towards target"
          ></progress>
          <span class="progress-text">{{ progress }}%</span>
        </div>
      </div>

      <!-- Controls -->
      <div class="counter-controls">
        <button 
          class="control-btn increment-btn"
          @click="increment"
          @keydown.space.prevent="increment"
          @keydown.enter.prevent="increment"
          aria-label="Increment count"
        >
          <span class="btn-icon">➕</span>
          <span class="btn-text">Count</span>
        </button>

        <button 
          class="control-btn reset-btn"
          @click="resetCounter"
          aria-label="Reset counter"
        >
          <span class="btn-icon">🔄</span>
          <span class="btn-text">Reset</span>
        </button>

        <button 
          class="control-btn voice-btn"
          @click="toggleVoiceRecognition"
          :class="{ 'listening': isListening }"
          :disabled="!isSpeechSupported"
          aria-label="Voice recognition"
        >
          <span class="btn-icon">{{ isListening ? '🎤' : '🎙️' }}</span>
          <span class="btn-text">{{ isListening ? 'Listening...' : 'Voice' }}</span>
        </button>
      </div>

      <!-- Gesture Instructions -->
      <div class="gesture-info" v-if="isListening">
        <p>Voice commands: "count", "reset", "next", "previous"</p>
      </div>

      <!-- Shake Instructions -->
      <div class="gesture-info" v-if="isShakeSupported">
        <p>🤲 Shake device to reset counter</p>
      </div>
    </main>

    <!-- Dhikr Selection -->
    <section class="dhikr-selection">
      <h2 class="section-title">Select Dhikr</h2>
      <div class="dhikr-grid">
        <button
          v-for="dhikr in availableDhikr"
          :key="dhikr.id"
          class="dhikr-card"
          :class="{ 'active': currentDhikr?.id === dhikr.id }"
          @click="selectDhikr(dhikr)"
          aria-pressed="currentDhikr?.id === dhikr.id"
        >
          <div class="dhikr-name">{{ dhikr.name }}</div>
          <div class="dhikr-target">Target: {{ dhikr.target }}</div>
        </button>
      </div>
    </section>

    <!-- Statistics -->
    <section class="statistics">
      <h2 class="section-title">Statistics</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ todayCount }}</div>
          <div class="stat-label">Today</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ weeklyCount }}</div>
          <div class="stat-label">This Week</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ totalCount }}</div>
          <div class="stat-label">Total</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ streakCount }}</div>
          <div class="stat-label">Day Streak</div>
        </div>
      </div>
    </section>

    <!-- Settings -->
    <SettingsPanel 
      v-model:theme="theme"
      v-model:vibration="vibration"
      v-model:sound="sound"
      v-model:autoReset="autoReset"
      @reset-stats="resetStatistics"
    />

    <!-- Notifications -->
    <TransitionGroup name="notification">
      <div 
        v-for="notification in notifications"
        :key="notification.id"
        class="notification"
        :class="notification.type"
        role="alert"
      >
        {{ notification.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// Custom composables to replace external dependencies
function useLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key)
  const value = ref(stored ? JSON.parse(stored) : defaultValue)
  
  const updateStorage = (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }
  
  watch(value, (newValue) => {
    updateStorage(newValue)
  })
  
  return value
}

function useVibrate() {
  const vibrate = (pattern) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern)
    }
  }
  
  return { vibrate }
}

function useSpeechRecognition() {
  const isListening = ref(false)
  const result = ref('')
  const error = ref('')
  const isSupported = ref(false)
  
  let recognition = null

  // Check if speech recognition is supported
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    isSupported.value = true
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    
    recognition.continuous = true
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('')
      result.value = transcript
    }

    recognition.onerror = (event) => {
      error.value = event.error
      isListening.value = false
    }

    recognition.onend = () => {
      isListening.value = false
    }
  }

  const start = () => {
    if (recognition && !isListening.value) {
      try {
        recognition.start()
        isListening.value = true
      } catch (err) {
        console.error('Speech recognition error:', err)
      }
    }
  }

  const stop = () => {
    if (recognition && isListening.value) {
      recognition.stop()
      isListening.value = false
    }
  }

  return {
    isListening,
    result,
    error,
    isSupported,
    start,
    stop
  }
}

function useShakeDetection(onShake) {
  const isSupported = ref('DeviceOrientationEvent' in window)
  let lastShakeTime = 0
  
  const handleDeviceMotion = (event) => {
    const acceleration = event.accelerationIncludingGravity
    if (!acceleration) return
    
    const totalAcceleration = Math.sqrt(
      acceleration.x * acceleration.x +
      acceleration.y * acceleration.y +
      acceleration.z * acceleration.z
    )
    
    const currentTime = Date.now()
    
    // Detect shake (high acceleration)
    if (totalAcceleration > 15 && currentTime - lastShakeTime > 1000) {
      lastShakeTime = currentTime
      onShake()
    }
  }
  
  onMounted(() => {
    if (isSupported.value) {
      window.addEventListener('devicemotion', handleDeviceMotion)
    }
  })
  
  onUnmounted(() => {
    if (isSupported.value) {
      window.removeEventListener('devicemotion', handleDeviceMotion)
    }
  })
  
  return { isSupported }
}

// Reactive state
const count = useLocalStorage('tasbeeh-count', 0)
const currentDhikr = useLocalStorage('tasbeeh-current-dhikr', null)
const theme = useLocalStorage('tasbeeh-theme', 'light')
const vibration = useLocalStorage('tasbeeh-vibration', true)
const sound = useLocalStorage('tasbeeh-sound', true)
const autoReset = useLocalStorage('tasbeeh-auto-reset', false)

// Statistics
const todayCount = useLocalStorage('tasbeeh-today', 0)
const weeklyCount = useLocalStorage('tasbeeh-weekly', 0)
const totalCount = useLocalStorage('tasbeeh-total', 0)
const streakCount = useLocalStorage('tasbeeh-streak', 0)
const lastActivityDate = useLocalStorage('tasbeeh-last-activity', new Date().toDateString())

// Notifications
const notifications = ref([])

// Available dhikr types
const availableDhikr = [
  { id: 'subhanallah', name: 'Subhanallah', target: 33 },
  { id: 'alhamdulillah', name: 'Alhamdulillah', target: 33 },
  { id: 'allahuakbar', name: 'Allahu Akbar', target: 34 },
  { id: 'astaghfirullah', name: 'Astaghfirullah', target: 100 },
  { id: 'laillahaillallah', name: 'La ilaha illallah', target: 100 },
  { id: 'salawat', name: 'Salawat', target: 100 }
]

// AI Features
const speechRecognition = useSpeechRecognition()
const isListening = ref(false)
const isSpeechSupported = speechRecognition.isSupported

// Shake detection
const handleShake = () => {
  resetCounter()
  showNotification('Shake detected - Counter reset!', 'info')
}

const { isSupported: isShakeSupported } = useShakeDetection(handleShake)

// Computed properties
const formattedCount = computed(() => count.value.toString().padStart(3, '0'))
const progress = computed(() => {
  if (!currentDhikr.value) return 0
  return Math.min(Math.round((count.value / currentDhikr.value.target) * 100), 100)
})

const themeClasses = computed(() => ({
  'theme-light': theme.value === 'light',
  'theme-dark': theme.value === 'dark',
  'theme-sepia': theme.value === 'sepia'
}))

// Vibration
const { vibrate } = useVibrate()

// Methods
const increment = () => {
  count.value++
  updateStatistics()
  
  // Haptic feedback
  if (vibration.value) {
    vibrate([50])
  }
  
  // Sound feedback
  if (sound.value) {
    playClickSound()
  }
  
  // Check if target reached
  if (currentDhikr.value && count.value >= currentDhikr.value.target) {
    showNotification('Target reached! Masha Allah!', 'success')
    if (autoReset.value) {
      setTimeout(resetCounter, 1000)
    }
  }
}

const resetCounter = () => {
  count.value = 0
  showNotification('Counter reset', 'info')
}

const selectDhikr = (dhikr) => {
  currentDhikr.value = dhikr
  resetCounter()
  showNotification(`Selected: ${dhikr.name}`, 'info')
}

const toggleVoiceRecognition = () => {
  if (!isSpeechSupported) {
    showNotification('Speech recognition not supported in your browser', 'error')
    return
  }
  
  if (isListening.value) {
    speechRecognition.stop()
    isListening.value = false
  } else {
    speechRecognition.start()
    isListening.value = true
  }
}

const playClickSound = () => {
  // Simple beep sound using Web Audio API
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = 800
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  } catch (error) {
    console.log('Audio not supported:', error)
  }
}

const showNotification = (message, type = 'info') => {
  const id = Date.now()
  notifications.value.push({ id, message, type })
  setTimeout(() => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }, 3000)
}

const updateStatistics = () => {
  const today = new Date().toDateString()
  const lastDate = new Date(lastActivityDate.value)
  const currentDate = new Date()
  
  // Reset daily count if new day
  if (today !== lastActivityDate.value) {
    todayCount.value = 0
    
    // Update streak
    const dayDiff = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24))
    if (dayDiff === 1) {
      streakCount.value++
    } else if (dayDiff > 1) {
      streakCount.value = 1 // Reset streak if missed days
    }
    
    lastActivityDate.value = today
  }
  
  todayCount.value++
  weeklyCount.value++
  totalCount.value++
}

const resetStatistics = () => {
  todayCount.value = 0
  weeklyCount.value = 0
  totalCount.value = 0
  streakCount.value = 0
  showNotification('Statistics reset', 'info')
}

// Voice command processing
watch(speechRecognition.result, (newResult) => {
  if (!newResult) return
  
  const command = newResult.toLowerCase()
  
  if (command.includes('count') || command.includes('add') || command.includes('increment')) {
    increment()
  } else if (command.includes('reset') || command.includes('clear')) {
    resetCounter()
  } else if (command.includes('next')) {
    const currentIndex = availableDhikr.findIndex(d => d.id === currentDhikr.value?.id)
    const nextIndex = (currentIndex + 1) % availableDhikr.length
    selectDhikr(availableDhikr[nextIndex])
  } else if (command.includes('previous') || command.includes('prev') || command.includes('back')) {
    const currentIndex = availableDhikr.findIndex(d => d.id === currentDhikr.value?.id)
    const prevIndex = (currentIndex - 1 + availableDhikr.length) % availableDhikr.length
    selectDhikr(availableDhikr[prevIndex])
  }
})

// Keyboard shortcuts
const handleKeyPress = (event) => {
  if (event.code === 'Space' || event.code === 'Enter') {
    event.preventDefault()
    increment()
  } else if (event.code === 'Escape') {
    resetCounter()
  } else if (event.code === 'ArrowRight') {
    const currentIndex = availableDhikr.findIndex(d => d.id === currentDhikr.value?.id)
    const nextIndex = (currentIndex + 1) % availableDhikr.length
    selectDhikr(availableDhikr[nextIndex])
  } else if (event.code === 'ArrowLeft') {
    const currentIndex = availableDhikr.findIndex(d => d.id === currentDhikr.value?.id)
    const prevIndex = (currentIndex - 1 + availableDhikr.length) % availableDhikr.length
    selectDhikr(availableDhikr[prevIndex])
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', handleKeyPress)
  // Initialize with first dhikr
  if (!currentDhikr.value) {
    selectDhikr(availableDhikr[0])
  }
  
  // Update streak on app start
  updateStatistics()
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyPress)
  if (isListening.value) {
    speechRecognition.stop()
  }
})
</script>

<style scoped>
/* Add the same CSS styles as previous implementation */
.tasbeeh-counter {
  min-height: 100vh;
  padding: 1rem;
  transition: all 0.3s ease;
}

/* Theme Styles */
.theme-light {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
}

.theme-dark {
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  color: #fff;
}

.theme-sepia {
  background: linear-gradient(135deg, #e6dcb5 0%, #d2b48c 100%);
  color: #5c4b37;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.counter-main {
  text-align: center;
  margin-bottom: 3rem;
}

.counter-display {
  margin-bottom: 2rem;
}

.current-count {
  font-size: 6rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.counter-label {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.progress-container {
  position: relative;
  max-width: 300px;
  margin: 0 auto;
}

.counter-progress {
  width: 100%;
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  font-weight: bold;
}

.counter-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.control-btn {
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 120px;
  justify-content: center;
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.control-btn:focus {
  outline: 3px solid currentColor;
  outline-offset: 2px;
}

.control-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.increment-btn {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
}

.reset-btn {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
}

.voice-btn {
  background: linear-gradient(135deg, #48cae4, #0096c7);
  color: white;
}

.voice-btn.listening {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.dhikr-selection,
.statistics {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  text-align: center;
}

.dhikr-grid,
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.dhikr-card,
.stat-card {
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.dhikr-card {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
}

.dhikr-card:hover,
.dhikr-card.active {
  border-color: currentColor;
  transform: translateY(-2px);
}

.dhikr-card.active {
  background: rgba(255,255,255,0.2);
}

.stat-card {
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.gesture-info {
  background: rgba(255,255,255,0.1);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  backdrop-filter: blur(10px);
}

.notification {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  z-index: 1000;
  max-width: 300px;
}

.notification.success {
  background: #4CAF50;
}

.notification.info {
  background: #2196F3;
}

.notification.error {
  background: #f44336;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .counter-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .control-btn {
    width: 200px;
  }
  
  .current-count {
    font-size: 4rem;
  }
  
  .dhikr-grid,
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
}

/* High contrast support */
@media (prefers-contrast: high) {
  .control-btn {
    border: 2px solid currentColor;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>