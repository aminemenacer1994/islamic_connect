<template>
  <div class="container py-3 py-md-4 islamic-app">
    <!-- Header Section -->
    <div class="text-center mb-4 mb-md-5">
      <h1 class="display-5 fw-bold ">Islamic Learning Platform</h1>
      <p class="lead text-muted">Learn key Islamic topics through simple, structured lessons covering faith, worship, Seerah, Quran, and character. Reinforce your understanding with interactive quizzes designed for all ages. Ideal for both beginners and regular learners to grow their Islamic knowledge step by step.</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status"></div>
      <p class="mt-3 fs-5">Loading Islamic content...</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="alert alert-danger mb-4 d-flex align-items-center">
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      <div class="flex-grow-1">{{ error }}</div>
      <button @click="fetchContent" class="btn btn-sm btn-outline-danger">Retry</button>
    </div>

    <!-- Main Content -->
    <div v-if="!loading && !error">
      <!-- Progress Tracking -->
      <div class="card shadow-sm mb-4 border-0">
        <div class="card-body p-3 p-md-4">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="card-title mb-0 fw-semibold">Your Progress</h5>
            <span class="badge bg-primary bg-opacity-10 text-primary">{{ progressPercentage }}%</span>
          </div>
          <div class="progress mb-3" style="height: 12px;">
            <div 
              class="progress-bar bg-primary progress-bar-striped progress-bar-animated" 
              role="progressbar" 
              :style="{ width: progressPercentage + '%' }" 
              :aria-valuenow="progressPercentage" 
            ></div>
          </div>
          <div class="d-flex justify-content-between small">
            <span class="text-muted">
              <i class="bi bi-book me-1"></i>
              {{ completedLessons.length }}/{{ totalLessons }} lessons
            </span>
            <span class="text-muted">
              <i class="bi bi-star me-1"></i>
              {{ overallQuizScore }}% avg score
            </span>
          </div>
        </div>
      </div>

      <!-- Category Navigation -->
      <div class="category-nav mb-4 pb-2">
        <div class="d-flex overflow-x-auto pe-3" style="scrollbar-width: thin;">
          <button 
            v-for="category in categories" 
            @click="selectCategory(category)"
            class="btn btn-category flex-shrink-0 rounded-pill px-3 px-md-4 me-2"
            :class="{ active: activeCategory?.id === category.id }"
          >
            <span class="icon me-1 me-md-2">{{ category.icon }}</span>
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- Category Content -->
      <div v-if="activeCategory" class="mb-5">
        <!-- Lessons Section -->
        <div class="card shadow-sm mb-4 border-0">
          <div class="card-header bg-primary bg-opacity-10 border-0 d-flex justify-content-between align-items-center p-3">
            <h5 class="mb-0 fw-semibold text-primary">
              <i class="bi bi-journal-text me-2"></i>
              {{ activeCategory.name }} Lessons
            </h5>
            <span class="badge bg-primary text-white rounded-pill">
              {{ completedLessonsInCategory.length }}/{{ activeCategory.lessons.length }}
            </span>
          </div>
          <div class="card-body p-0">
            <div class="list-group list-group-flush">
              <button 
                v-for="(lesson, index) in activeCategory.lessons" 
                :key="'lesson-'+lesson.id"
                @click="selectLesson(index)"
                class="list-group-item list-group-item-action border-0 p-3 d-flex justify-content-between align-items-center"
                :class="{
                  'active-lesson': currentLessonIndex === index,
                  'completed-lesson': completedLessons.includes(lesson.id)
                }"
              >
                <div class="d-flex align-items-center">
                  <span class="lesson-number d-flex align-items-center justify-content-center rounded-circle me-3">
                    {{ index + 1 }}
                  </span>
                  <span class="lesson-title">{{ lesson.title }}</span>
                </div>
                <span v-if="completedLessons.includes(lesson.id)" class="badge bg-success rounded-circle p-2">
                  <i class="bi bi-check"></i>
                </span>
                <span v-else class="badge bg-light text-muted rounded-circle p-2">
                  <i class="bi bi-lock"></i>
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Lesson Content -->
        <div v-if="currentLessonIndex !== null" class="card shadow-lg mb-4 border-0">
          <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center p-3">
            <div>
              <h5 class="mb-1 fw-semibold">Lesson {{ currentLessonIndex + 1 }}</h5>
              <p class="mb-0 small opacity-75">{{ activeCategory.lessons[currentLessonIndex].title }}</p>
            </div>
            <button 
              @click="markLessonComplete(activeCategory.lessons[currentLessonIndex].id)" 
              class="btn btn-sm btn-light rounded-pill px-3"
              v-if="!completedLessons.includes(activeCategory.lessons[currentLessonIndex].id)"
            >
              <i class="bi bi-check-circle me-1"></i> Complete
            </button>
            <span v-else class="badge bg-success rounded-pill px-3 py-2">
              <i class="bi bi-check-circle-fill me-1"></i> Completed
            </span>
          </div>
          <div class="card-body p-3 p-md-4">
            <div class="lesson-content fs-6" v-html="activeCategory.lessons[currentLessonIndex].content"></div>
            <div v-if="activeCategory.lessons[currentLessonIndex].arabicText" class="mt-4 p-3 bg-light rounded">
              <h6 class="d-flex align-items-center text-muted mb-3">
                <i class="bi bi-translate me-2"></i>Arabic Text
              </h6>
              <p class="arabic-text mb-0">{{ activeCategory.lessons[currentLessonIndex].arabicText }}</p>
            </div>
          </div>
          <div class="card-footer bg-light border-0 d-flex justify-content-between p-3">
            <button 
              @click="prevLesson" 
              class="btn btn-outline-primary rounded-pill px-3"
              :disabled="currentLessonIndex === 0"
            >
              <i class="bi bi-chevron-left me-1"></i> Previous
            </button>
            <button 
              @click="nextLesson" 
              class="btn btn-primary rounded-pill px-4"
              :disabled="currentLessonIndex === activeCategory.lessons.length - 1"
            >
              Next <i class="bi bi-chevron-right ms-1"></i>
            </button>
          </div>
        </div>

        <!-- Quiz Access Card -->
        <div class="card mb-4 border-0" :class="completedLessonsInCategory.length === activeCategory.lessons.length ? 'shadow-sm' : 'shadow-sm bg-light'">
          <div class="card-header border-0 d-flex justify-content-between align-items-center p-3"
               :class="completedLessonsInCategory.length === activeCategory.lessons.length ? 'bg-info bg-opacity-10' : 'bg-light'">
            <h5 class="mb-0 fw-semibold" :class="completedLessonsInCategory.length === activeCategory.lessons.length ? 'text-info' : 'text-muted'">
              <i class="bi bi-patch-question me-2"></i>
              {{ activeCategory.name }} Quiz
            </h5>
            <span v-if="quizScores[activeCategory.quizzes[0].id] !== undefined" 
                  class="badge bg-info text-white rounded-pill">
              {{ quizScores[activeCategory.quizzes[0].id] }}%
            </span>
          </div>
          
          <div class="card-body text-center p-4" v-if="completedLessonsInCategory.length === activeCategory.lessons.length">
            <div class="mb-3">
              <i class="bi bi-trophy-fill display-4 text-warning"></i>
            </div>
            <h5 class="mb-2">Ready for the Quiz!</h5>
            <p class="text-muted mb-4">
              Test your knowledge after completing all lessons.
            </p>
            <button 
              @click="selectQuiz(0)"
              class="btn btn-info rounded-pill px-4 py-2 shadow-sm"
            >
              <i class="bi bi-play-fill me-1"></i> Start Quiz
            </button>
          </div>
          
          <div class="card-body text-center p-4" v-else>
            <div class="mb-3">
              <i class="bi bi-lock-fill display-4 text-muted opacity-50"></i>
            </div>
            <h5 class="mb-2 text-muted">Quiz Locked</h5>
            <p class="text-muted mb-0">
              Complete all {{ activeCategory.lessons.length }} lessons to unlock
              <span class="d-block mt-1">
                <span class="badge bg-primary bg-opacity-10 text-primary">
                  {{ completedLessonsInCategory.length }}/{{ activeCategory.lessons.length }} completed
                </span>
              </span>
            </p>
          </div>
        </div>

        <!-- Quiz Content -->
        <div v-if="currentQuizIndex !== null" class="card shadow-lg border-0">
          <div class="card-header bg-info text-white d-flex align-items-center p-3">
            <i class="bi bi-patch-question-fill me-2"></i>
            <h5 class="mb-0 fw-semibold">{{ activeCategory.quizzes[currentQuizIndex].title }}</h5>
          </div>
          
          <div class="card-body p-3 p-md-4">
            <!-- Quiz Questions -->
            <div v-if="!quizSubmitted">
              <div v-for="(question, qIndex) in activeCategory.quizzes[currentQuizIndex].questions" 
                   :key="'question-'+qIndex" 
                   class="mb-4 p-3 bg-light rounded">
                <h6 class="mb-3 d-flex align-items-center">
                  <span class="question-number d-flex align-items-center justify-content-center rounded-circle me-2">
                    {{ qIndex + 1 }}
                  </span>
                  {{ question.question }}
                </h6>
                <div class="form-check mb-3" v-for="(option, oIndex) in question.options" :key="'option-'+oIndex">
                  <input 
                    class="form-check-input" 
                    type="radio" 
                    :name="'question-'+qIndex" 
                    :id="'q'+qIndex+'-o'+oIndex"
                    :value="oIndex"
                    v-model="userAnswers[qIndex]"
                  >
                  <label class="form-check-label" :for="'q'+qIndex+'-o'+oIndex">
                    {{ option }}
                  </label>
                </div>
              </div>
              
              <button @click="submitQuiz" 
                      class="btn btn-info w-100 rounded-pill py-2 shadow-sm"
                      :disabled="userAnswers.includes(null) && userAnswers.length !== activeCategory.quizzes[currentQuizIndex].questions.length">
                <i class="bi bi-send-fill me-2"></i> Submit Quiz
              </button>
            </div>

            <!-- Quiz Results -->
            <div v-else>
              <div class="alert rounded-4 mb-4 border-0 shadow-sm" 
                   :class="quizScore >= 70 ? 'alert-success' : 'alert-warning'">
                <div class="d-flex align-items-center">
                  <i class="bi fs-1 me-3" :class="quizScore >= 70 ? 'bi-emoji-smile-fill' : 'bi-emoji-frown-fill'"></i>
                  <div>
                    <h4 class="alert-heading mb-1">
                      {{ quizScore }}% Score
                      <span v-if="quizScore >= 70">- Masha'Allah!</span>
                      <span v-else>- Keep Learning!</span>
                    </h4>
                    <p class="mb-0 small">
                      {{ quizScore >= 70 ? 'Excellent understanding!' : 'Review the lessons to improve.' }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="quiz-results">
                <div v-for="(question, qIndex) in activeCategory.quizzes[currentQuizIndex].questions" 
                     :key="'result-'+qIndex" 
                     class="mb-3 p-3 rounded-3 border"
                     :class="userAnswers[qIndex] === question.correctAnswer ? 'border-success bg-success bg-opacity-5' : 'border-danger bg-danger bg-opacity-5'">
                  <h6 class="d-flex align-items-center mb-3">
                    <span class="question-number d-flex align-items-center justify-content-center rounded-circle me-2">
                      {{ qIndex + 1 }}
                    </span>
                    {{ question.question }}
                    <span v-if="userAnswers[qIndex] === question.correctAnswer" 
                          class="badge bg-success ms-auto">
                      <i class="bi bi-check-lg me-1"></i>Correct
                    </span>
                    <span v-else class="badge bg-danger ms-auto">
                      <i class="bi bi-x-lg me-1"></i>Incorrect
                    </span>
                  </h6>
                  <div class="ps-4">
                    <p class="mb-2">
                      <span class="text-muted">Your answer:</span> 
                      <span :class="userAnswers[qIndex] === question.correctAnswer ? 'text-success fw-bold' : 'text-danger'">
                        {{ question.options[userAnswers[qIndex]] }}
                      </span>
                    </p>
                    <p v-if="userAnswers[qIndex] !== question.correctAnswer" class="mb-2">
                      <span class="text-muted">Correct answer:</span> 
                      <span class="text-success fw-bold">{{ question.options[question.correctAnswer] }}</span>
                    </p>
                    <p v-if="question.explanation" class="small text-muted mb-0">
                      <i class="bi bi-info-circle me-1"></i> {{ question.explanation }}
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="d-flex gap-3 mt-4">
                <button @click="resetQuiz" class="btn btn-outline-info flex-grow-1 rounded-pill py-2">
                  <i class="bi bi-arrow-repeat me-1"></i> Retake
                </button>
                <button @click="currentQuizIndex = null" class="btn btn-info flex-grow-1 rounded-pill py-2 shadow-sm">
                  <i class="bi bi-check-circle me-1"></i> Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!activeCategory" class="card shadow-sm border-0">
        <div class="card-body text-center p-5">
          <i class="bi bi-journal-text display-4 text-muted opacity-25 mb-4"></i>
          <h4 class="text-muted mb-3">Select a Category</h4>
          <p class="text-muted mb-0">Choose from the Islamic knowledge categories above to begin learning</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IslamicLearning',
  data() {
    return {
      categories: [],
      activeCategory: null,
      currentLessonIndex: null,
      currentQuizIndex: null,
      completedLessons: [],
      quizScores: {},
      userAnswers: [],
      quizSubmitted: false,
      loading: true,
      error: null
    }
  },
  computed: {
    completedLessonsInCategory() {
      if (!this.activeCategory) return [];
      return this.activeCategory.lessons.filter(lesson =>
        this.completedLessons.includes(lesson.id)
      )
    },
    totalLessons() {
      return this.categories.reduce((total, category) => total + category.lessons.length, 0);
    },
    progressPercentage() {
      if (this.totalLessons === 0) return 0;
      return Math.round((this.completedLessons.length / this.totalLessons) * 100);
    },
    overallQuizScore() {
      const scores = Object.values(this.quizScores);
      if (scores.length === 0) return 0;
      return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    },
    quizScore() {
      if (!this.quizSubmitted || this.currentQuizIndex === null || !this.activeCategory) return 0;

      const quiz = this.activeCategory.quizzes[this.currentQuizIndex];
      let correct = 0;

      for (let i = 0; i < quiz.questions.length; i++) {
        if (this.userAnswers[i] === quiz.questions[i].correctAnswer) {
          correct++;
        }
      }

      return Math.round((correct / quiz.questions.length) * 100);
    }
  },
  async created() {
    await this.fetchContent();
    this.loadUserProgress();
  },
  methods: {
    async fetchContent() {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch('/islamic-content.json');
        if (!response.ok) throw new Error('Failed to load content');

        const data = await response.json();
        this.categories = data.categories;

        // Set first category as default if none selected
        if (this.categories.length > 0 && !this.activeCategory) {
          this.activeCategory = this.categories[0];
        }

      } catch (err) {
        console.error('Error loading Islamic content:', err);
        this.error = 'Failed to load content. Please try again later.';
      } finally {
        this.loading = false;
      }
    },

    loadUserProgress() {
      const savedCompleted = localStorage.getItem('islamicCompletedLessons');
      if (savedCompleted) this.completedLessons = JSON.parse(savedCompleted);

      const savedScores = localStorage.getItem('islamicQuizScores');
      if (savedScores) this.quizScores = JSON.parse(savedScores);
    },

    selectCategory(category) {
      this.activeCategory = category;
      this.currentLessonIndex = null;
      this.currentQuizIndex = null;
      this.quizSubmitted = false;
    },

    selectLesson(index) {
      this.currentLessonIndex = index;
      this.currentQuizIndex = null;
      this.quizSubmitted = false;
    },

    selectQuiz(index) {
      this.currentQuizIndex = index;
      this.currentLessonIndex = null;
      this.quizSubmitted = false;
      this.userAnswers = Array(this.activeCategory.quizzes[index].questions.length).fill(null);
    },

    prevLesson() {
      if (this.currentLessonIndex > 0) {
        this.currentLessonIndex--;
      }
    },

    nextLesson() {
      if (this.currentLessonIndex < this.activeCategory.lessons.length - 1) {
        this.currentLessonIndex++;
      }
    },

    markLessonComplete(lessonId) {
      if (!this.completedLessons.includes(lessonId)) {
        this.completedLessons.push(lessonId);
        localStorage.setItem('islamicCompletedLessons', JSON.stringify(this.completedLessons));
      }
    },

    submitQuiz() {
      this.quizSubmitted = true;
      const quizId = this.activeCategory.quizzes[this.currentQuizIndex].id;
      this.quizScores[quizId] = this.quizScore;
      localStorage.setItem('islamicQuizScores', JSON.stringify(this.quizScores));
    },

    resetQuiz() {
      this.quizSubmitted = false;
      this.userAnswers = Array(this.activeCategory.quizzes[this.currentQuizIndex].questions.length).fill(null);
    }
  }
}
</script>

<style scoped>
/* Improved mobile-first styling */
.islamic-app {
  max-width: 1200px;
  margin: 0 auto;
}

/* Category Navigation */
.btn-category {
  border: 1px solid #e0e0e0;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-category.active {
  background-color: var(--bs-primary);
  color: white;
  border-color: var(--bs-primary);
  box-shadow: 0 2px 8px rgba(var(--bs-primary-rgb), 0.2);
}

/* Lesson Items */
.list-group-item {
  transition: all 0.2s ease;
  border-left: 0;
  border-right: 0;
}

.list-group-item:first-child {
  border-top: 0;
}

.active-lesson {
  background-color: rgba(var(--bs-primary-rgb), 0.05);
  border-left: 3px solid var(--bs-primary) !important;
}

.completed-lesson {
  background-color: rgba(var(--bs-success-rgb), 0.05);
}

.lesson-number {
  width: 28px;
  height: 28px;
  font-size: 0.8rem;
  background-color: rgba(var(--bs-primary-rgb), 0.1);
  color: var(--bs-primary);
}

.completed-lesson .lesson-number {
  background-color: rgba(var(--bs-success-rgb), 0.2);
  color: var(--bs-success);
}

/* Quiz Questions */
.question-number {
  width: 24px;
  height: 24px;
  font-size: 0.7rem;
  background-color: rgba(var(--bs-info-rgb), 0.2);
  color: var(--bs-info);
}

/* Arabic Text */
.arabic-text {
  font-size: 1.5rem;
  text-align: right;
  direction: rtl;
  font-family: 'Traditional Arabic', 'Arial', sans-serif;
  line-height: 1.8;
}

/* Cards */
.card {
  border-radius: 12px;
  overflow: hidden;
}

.card-header {
  border-radius: 12px 12px 0 0 !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .display-5 {
    font-size: 2rem;
  }
  
  .card-body {
    padding: 1rem;
  }
  
  .arabic-text {
    font-size: 1.2rem;
  }
}

/* Smooth transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>