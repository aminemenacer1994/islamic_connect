<template>
  <div class="srs-container">
    <div v-if="!sessionActive && !sessionSummary" class="dashboard">
      <header class="header">
        <h1>Spaced Repetition System</h1>
        <div class="stats">
          <span>Total Ayahs: {{ ayahs.length }}</span>
          <span>Due Today: {{ dueQueue.length }}</span>
        </div>
      </header>

      <div class="controls">
        <label class="filter-label">
          Revision Type:
          <select v-model="revisionType" class="select-input">
            <option value="All">All Due</option>
            <option value="Sabaq">Sabaq (New, 1-7 days)</option>
            <option value="Sabaq Para">Sabaq Para (Recent, 7-30 days)</option>
            <option value="Manzil">Manzil (Old, 30-120 days)</option>
            <option value="Weak Ayahs">Weak Ayahs (Mistakes > 2)</option>
          </select>
        </label>
        <button 
          @click="startSession" 
          :disabled="filteredQueue.length === 0"
          class="btn btn-primary"
        >
          Start Review Session ({{ filteredQueue.length }})
        </button>
      </div>

      <div class="add-ayah">
        <input v-model="newAyahText" placeholder="Enter Ayah text..." class="text-input" @keyup.enter="addNewAyah" />
        <button @click="addNewAyah" class="btn btn-secondary">Add Ayah</button>
      </div>

      <div class="queue-list">
        <h3>Queue Preview (Sorted by Priority)</h3>
        <div v-if="filteredQueue.length === 0" class="empty-state">No ayahs due for this filter.</div>
        <div v-for="item in filteredQueue" :key="item.ayahId" class="queue-card">
          <div class="queue-card-header">
            <strong>Ayah {{ item.ayahId }}</strong>
            <span class="priority-badge">Priority: {{ calculatePriority(item).toFixed(1) }}</span>
          </div>
          <div class="queue-card-meta">
            <span>Ease: {{ item.easeFactor.toFixed(2) }}</span>
            <span>Interval: {{ item.interval.toFixed(1) }} days</span>
            <span>Mistakes: {{ item.mistakeCount }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="sessionActive" class="review-session">
      <div class="session-header">
        <h2>Reviewing {{ currentReviewIndex + 1 }} / {{ currentQueue.length }}</h2>
        <button @click="endSessionEarly" class="btn btn-danger btn-sm">End Early</button>
      </div>

      <div class="review-card">
        <div class="hide-controls">
          <button @click="setHideLevel(0)" :class="{'active': hideLevel === 0}" class="btn btn-outline">Show All</button>
          <button @click="setHideLevel(1)" :class="{'active': hideLevel === 1}" class="btn btn-outline">Hide 30%</button>
          <button @click="setHideLevel(2)" :class="{'active': hideLevel === 2}" class="btn btn-outline">Hide 60%</button>
          <button @click="setHideLevel(3)" :class="{'active': hideLevel === 3}" class="btn btn-outline">Hide All</button>
        </div>

        <div class="ayah-display">
          <span 
            v-for="(word, index) in maskedWords" 
            :key="index"
            :class="{'hidden-word': word.hidden}"
            @click="revealWord(index)"
          >
            {{ word.hidden ? '____' : word.text }}
          </span>
        </div>
      </div>

      <div class="rating-controls">
        <button @click="rateAyah('Again')" class="btn btn-rating btn-again">
          Again <small>(Tomorrow)</small>
        </button>
        <button @click="rateAyah('Hard')" class="btn btn-rating btn-hard">
          Hard <small>({{ formatInterval(calculateNextInterval(currentAyah, 'Hard')) }})</small>
        </button>
        <button @click="rateAyah('Good')" class="btn btn-rating btn-good">
          Good <small>({{ formatInterval(calculateNextInterval(currentAyah, 'Good')) }})</small>
        </button>
        <button @click="rateAyah('Easy')" class="btn btn-rating btn-easy">
          Easy <small>({{ formatInterval(calculateNextInterval(currentAyah, 'Easy')) }})</small>
        </button>
      </div>
    </div>

    <div v-else-if="sessionSummary" class="session-summary">
      <h2>Session Complete!</h2>
      <div class="summary-stats">
        <div class="stat-box">
          <h3>{{ sessionSummary.total }}</h3>
          <p>Total Reviewed</p>
        </div>
        <div class="stat-box">
          <h3>{{ sessionSummary.correct }}</h3>
          <p>Correct</p>
        </div>
        <div class="stat-box">
          <h3>{{ sessionSummary.mistakes }}</h3>
          <p>Again/Hard</p>
        </div>
      </div>
      <button @click="closeSummary" class="btn btn-primary btn-large">Return to Dashboard</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const STORAGE_KEY = 'vue_srs_ayahs';

const ayahs = ref([]);
const newAyahText = ref('');
const revisionType = ref('All');

// Session state
const sessionActive = ref(false);
const currentQueue = ref([]);
const currentReviewIndex = ref(0);
const hideLevel = ref(0);
const sessionSummary = ref(null);
const revealedWords = ref(new Set());

onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      ayahs.value = JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse stored ayahs", e);
    }
  }
});

const saveData = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ayahs.value));
};

const createNewAyah = (text) => {
  return {
    ayahId: Date.now().toString(),
    text: text,
    easeFactor: 2.5,
    interval: 0,
    nextReviewDate: new Date().toISOString(),
    lastReviewDate: null,
    reviewCount: 0,
    correctCount: 0,
    mistakeCount: 0,
    reviewHistory: []
  };
};

const addNewAyah = () => {
  if (!newAyahText.value.trim()) return;
  ayahs.value.push(createNewAyah(newAyahText.value.trim()));
  saveData();
  newAyahText.value = '';
};

const getDaysSince = (dateStr) => {
  if (!dateStr) return 0;
  const diffTime = Math.abs(new Date() - new Date(dateStr));
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const getDaysOverdue = (nextReviewDate) => {
  if (!nextReviewDate) return 0;
  const now = new Date();
  const next = new Date(nextReviewDate);
  if (now < next) return 0;
  const diffTime = Math.abs(now - next);
  return diffTime / (1000 * 60 * 60 * 24);
};

const calculatePriority = (ayah) => {
  const daysOverdue = getDaysOverdue(ayah.nextReviewDate);
  return ((ayah.mistakeCount || 0) * 10) + (daysOverdue * 2);
};

const isDue = (ayah) => {
  if (!ayah.nextReviewDate) return true;
  return new Date() >= new Date(ayah.nextReviewDate);
};

const dueQueue = computed(() => {
  return ayahs.value
    .filter(isDue)
    .sort((a, b) => calculatePriority(b) - calculatePriority(a));
});

const filteredQueue = computed(() => {
  let queue = dueQueue.value;
  
  switch (revisionType.value) {
    case 'Sabaq':
      queue = queue.filter(a => {
        const days = getDaysSince(a.lastReviewDate || new Date().toISOString());
        return days >= 1 && days <= 7;
      });
      break;
    case 'Sabaq Para':
      queue = queue.filter(a => {
        const days = getDaysSince(a.lastReviewDate || new Date().toISOString());
        return days > 7 && days <= 30;
      });
      break;
    case 'Manzil':
      queue = queue.filter(a => {
        const days = getDaysSince(a.lastReviewDate || new Date().toISOString());
        return days > 30 && days <= 120;
      });
      break;
    case 'Weak Ayahs':
      queue = queue.filter(a => (a.mistakeCount || 0) > 2);
      break;
  }
  return queue;
});

const currentAyah = computed(() => {
  return currentQueue.value[currentReviewIndex.value];
});

const maskedWords = computed(() => {
  if (!currentAyah.value || !currentAyah.value.text) return [];
  const words = currentAyah.value.text.split(' ');
  
  return words.map((word, index) => {
    let hidden = false;
    if (!revealedWords.value.has(index)) {
      if (hideLevel.value === 1) hidden = index % 3 === 0;
      if (hideLevel.value === 2) hidden = index % 2 === 0;
      if (hideLevel.value === 3) hidden = true;
    }
    return { text: word, hidden };
  });
});

const startSession = () => {
  currentQueue.value = [...filteredQueue.value];
  currentReviewIndex.value = 0;
  hideLevel.value = 0;
  revealedWords.value = new Set();
  sessionSummary.value = { total: 0, correct: 0, mistakes: 0 };
  sessionActive.value = true;
};

const endSessionEarly = () => {
  sessionActive.value = false;
  currentQueue.value = [];
  saveData();
};

const closeSummary = () => {
  sessionSummary.value = null;
};

const setHideLevel = (level) => {
  hideLevel.value = level;
  revealedWords.value = new Set();
};

const revealWord = (index) => {
  const newSet = new Set(revealedWords.value);
  newSet.add(index);
  revealedWords.value = newSet;
};

const clampEase = (ease) => Math.min(Math.max(ease, 1.3), 2.5);

const calculateNextInterval = (ayah, rating) => {
  if (!ayah) return 1;
  let easeFactor = ayah.easeFactor || 2.5;
  let interval = ayah.interval || 0;
  let newInterval = interval === 0 ? 1 : interval;

  switch (rating) {
    case 'Again': return 1;
    case 'Hard': return newInterval * 1.2;
    case 'Good': return newInterval * easeFactor;
    case 'Easy': return newInterval * easeFactor * 1.3;
    default: return newInterval;
  }
};

const formatInterval = (days) => {
  if (days < 1) return '< 1d';
  if (days < 30) return `${Math.round(days)}d`;
  if (days < 365) return `${Math.round(days / 30)}mo`;
  return `${(days / 365).toFixed(1)}y`;
};

const rateAyah = (rating) => {
  if (!currentAyah.value) return;
  
  const ayah = currentAyah.value;
  const now = new Date().toISOString();
  
  // Protect against undefined variables from old data schemas
  let easeFactor = ayah.easeFactor || 2.5;
  let interval = ayah.interval || 0;
  if (interval === 0) interval = 1;

  let newInterval = interval;
  let newEase = easeFactor;

  switch (rating) {
    case 'Again':
      newEase -= 0.2;
      newInterval = 1;
      ayah.mistakeCount = (ayah.mistakeCount || 0) + 1;
      sessionSummary.value.mistakes++;
      break;
    case 'Hard':
      newEase -= 0.15;
      newInterval = interval * 1.2;
      ayah.mistakeCount = (ayah.mistakeCount || 0) + 1;
      sessionSummary.value.mistakes++;
      break;
    case 'Good':
      newInterval = interval * easeFactor;
      ayah.correctCount = (ayah.correctCount || 0) + 1;
      sessionSummary.value.correct++;
      break;
    case 'Easy':
      newEase += 0.15;
      newInterval = interval * easeFactor * 1.3;
      ayah.correctCount = (ayah.correctCount || 0) + 1;
      sessionSummary.value.correct++;
      break;
  }

  // Update properties cleanly
  ayah.easeFactor = clampEase(newEase);
  ayah.interval = newInterval;
  ayah.lastReviewDate = now;
  
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + Math.round(newInterval));
  ayah.nextReviewDate = nextDate.toISOString();
  
  ayah.reviewCount = (ayah.reviewCount || 0) + 1;
  
  // Safe push to array
  if (!ayah.reviewHistory) ayah.reviewHistory = [];
  ayah.reviewHistory.push({ date: now, rating, interval: newInterval, easeFactor: ayah.easeFactor });

  sessionSummary.value.total++;

  // Move to next or gracefully end session
  if (currentReviewIndex.value < currentQueue.value.length - 1) {
    currentReviewIndex.value++;
    hideLevel.value = 0;
    revealedWords.value = new Set(); // Using reassignment for bulletproof reactivity
  } else {
    sessionActive.value = false;
  }
  
  saveData();
};
</script>

<style scoped>
.srs-container {
  max-width: 800px;
  margin: 0 auto;
  font-family: system-ui, -apple-system, sans-serif;
  color: #333;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.stats {
  display: flex;
  gap: 16px;
  font-weight: 600;
  color: #666;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.filter-label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 500;
}

.select-input, .text-input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.add-ayah {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
}

.add-ayah .text-input {
  flex: 1;
}

.queue-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state {
  padding: 32px;
  text-align: center;
  background: #f8f9fa;
  border-radius: 8px;
  color: #666;
}

.queue-card {
  border: 1px solid #eee;
  padding: 16px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.queue-card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.priority-badge {
  background: #ffebee;
  color: #c62828;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.queue-card-meta {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #666;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 14px;
}

.btn-primary {
  background: #007bff;
  color: white;
}
.btn-primary:hover:not(:disabled) { background: #0056b3; }
.btn-primary:disabled { background: #ccc; cursor: not-allowed; }

.btn-secondary {
  background: #6c757d;
  color: white;
}
.btn-secondary:hover { background: #5a6268; }

.btn-danger {
  background: #dc3545;
  color: white;
}
.btn-danger:hover { background: #c82333; }

.btn-outline {
  background: white;
  border: 1px solid #ced4da;
  color: #495057;
}
.btn-outline.active {
  background: #e9ecef;
  border-color: #adb5bd;
}

/* Session Styles */
.review-session {
  max-width: 600px;
  margin: 0 auto;
}

.session-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.review-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 24px;
  text-align: center;
}

.hide-controls {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 32px;
}

.ayah-display {
  font-size: 28px;
  line-height: 1.6;
  direction: rtl;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.hidden-word {
  color: #adb5bd;
  cursor: pointer;
  background: #f8f9fa;
  border-radius: 4px;
  padding: 0 4px;
}

.hidden-word:hover {
  background: #e9ecef;
}

.rating-controls {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.btn-rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.btn-rating small {
  margin-top: 4px;
  opacity: 0.8;
  font-size: 12px;
}

.btn-again { background: #ffebee; color: #c62828; }
.btn-hard { background: #fff3e0; color: #e65100; }
.btn-good { background: #e8f5e9; color: #2e7d32; }
.btn-easy { background: #e3f2fd; color: #1565c0; }

.btn-again:hover { background: #ffcdd2; }
.btn-hard:hover { background: #ffe0b2; }
.btn-good:hover { background: #c8e6c9; }
.btn-easy:hover { background: #bbdefb; }

/* Summary Styles */
.session-summary {
  text-align: center;
  padding: 48px 20px;
}

.summary-stats {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin: 32px 0;
}

.stat-box {
  background: #f8f9fa;
  padding: 24px;
  border-radius: 12px;
  min-width: 120px;
}

.stat-box h3 {
  font-size: 36px;
  margin: 0 0 8px 0;
  color: #007bff;
}

.stat-box p {
  margin: 0;
  color: #6c757d;
  font-weight: 500;
}

.btn-large {
  padding: 16px 32px;
  font-size: 18px;
}
</style>
