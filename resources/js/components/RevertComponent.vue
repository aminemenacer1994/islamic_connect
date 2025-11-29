<template>
  <div class="revert-shell">
    <div class="page-sheen"></div>
    <div class="background-pattern"></div>

    <!-- Mobile Navigation Toggle -->
    <div class="mobile-nav-toggle d-lg-none" @click="toggleMobileNav">
      <i class="bi" :class="mobileNavOpen ? 'bi-x-lg' : 'bi-list'"></i>
    </div>

    <main class="container-fluid revert-content px-3 px-md-4 py-4 py-md-5">
      <div class="row g-4">
        <!-- Navigation Sidebar -->
        <aside class="col-sm-3 col-lg-3 col-xl-3" :class="{ 'mobile-open': mobileNavOpen }">
          <div class="navigation-card">
            
            <div class="progress-indicator mb-4">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="fw-bold small">Course Progress</span>
                <span class="text-muted small">{{ completedChapters }}/{{ totalChapters }}</span>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
              </div>
              <p class="text-muted small mt-2 mb-0">{{ Math.round(progressPercentage) }}% Complete</p>
            </div>
            
            <ul class="nav nav-pills flex-column gap-2" role="tablist">
              <li v-for="step in roadmapData" :key="step.id" class="nav-item">
                <button
                  type="button"
                  class="nav-link text-start d-flex align-items-center w-100"
                  :class="{ 
                    active: selectedPill === step.id, 
                    completed: step.id < maxStepReached,
                    locked: step.id > maxStepReached
                  }"
                  @click="selectPill(step.id)"
                  :disabled="step.id > maxStepReached"
                >
                  <span class="step-indicator me-3">
                    <i v-if="step.id < maxStepReached" class="bi bi-check-lg"></i>
                    <span v-else-if="step.id === maxStepReached" class="current-step">{{ step.id }}</span>
                    <i v-else class="bi bi-lock"></i>
                  </span>
                  <span class="step-title flex-grow-1 text-start">{{ step.title }}</span>
                  <i v-if="step.id === selectedPill" class="bi bi-chevron-right ms-2 active-arrow"></i>
                </button>
              </li>
            </ul>
          </div>
        </aside>
        
        <!-- Main Content Area -->
        <section class="col-sm-9 col-lg-9 col-xl-9">
          <div>
            <!-- Header Section -->
            <div class="lesson-header animated-fade-in">
              <div class="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-4">
                <div class="mb-3 mb-md-0">
                  <div class="d-flex align-items-center mb-2">
                    <i class="bi bi-journey me-2 text-primary"></i>
                    <span class="text-uppercase text-muted fw-bold tracking-wide small">Chapter {{ currentLesson?.chapterId }}</span>
                  </div>
                  <h1 class="fw-bold text-left display-6 text-dark mb-2">{{ currentLesson?.title }}</h1>
                </div>
              </div>
            </div>

            <!-- Learning Content -->
            <div>
              <!-- Lesson Sections -->
              <div v-for="(section, index) in currentLesson?.sections" :key="section.title" 
                   class="content-card section-card animated-slide-up" :style="{ animationDelay: `${index * 0.1}s` }">
                <div class="card-header d-flex align-items-center">
                  <div class="section-number">{{ index + 1 }}</div>
                  <h3 class="h4 fw-bold text-dark mb-0 ms-3">
                    {{ section.title }}
                  </h3>
                </div>
                <div class="card-body">
                  <div class="section-content fs-6 lh-lg text-dark" v-html="section.content"></div>
                  
                  <!-- Deep Dive Section -->
                  <div v-if="section.deepDive" class="deep-dive mt-4 p-4 rounded-3">
                    <div class="deep-dive-header d-flex align-items-center mb-3">
                      <i class="bi bi-lightbulb me-2 fs-5 text-warning"></i>
                      <h5 class="fw-bold mb-0 text-dark">{{ section.deepDive.title }}</h5>
                    </div>
                    <div class="deep-dive-content fs-6 lh-lg text-dark" v-html="section.deepDive.content"></div>
                  </div>
                </div>
              </div>

              <!-- Quiz Section -->
              <!-- <div class="content-card quiz-card animated-slide-up" style="animation-delay: 0.3s">
                <div class="card-header d-flex align-items-center">
                  <i class="bi bi-patch-question me-3 text-primary fs-4"></i>
                  <h3 class="h4 fw-bold text-dark mb-0">Knowledge Check</h3>
                </div>
                <div class="card-body">
                  <div class="quiz-intro mb-4">
                    <p class="text-muted fs-6 mb-0">
                      <i class="bi bi-info-circle me-2"></i>
                      Test your understanding with this quick quiz
                    </p>
                  </div>
                  
                  <div class="quiz-content">
                    <div v-if="!quizCompleted" class="quiz-questions">
                      <div class="question mb-4" v-for="(question, qIndex) in currentQuiz?.questions" :key="qIndex">
                        <h5 class="fw-bold text-dark mb-3">{{ question.question }}</h5>
                        <div class="options">
                          <div v-for="(option, oIndex) in question.options" :key="oIndex" 
                               class="option-card" 
                               :class="{ 
                                 'selected': selectedAnswers[qIndex] === oIndex,
                                 'correct': quizSubmitted && option.correct,
                                 'incorrect': quizSubmitted && selectedAnswers[qIndex] === oIndex && !option.correct
                               }"
                               @click="selectAnswer(qIndex, oIndex)">
                            <div class="option-content">
                              <span class="option-letter">{{ String.fromCharCode(65 + oIndex) }}</span>
                              <span class="option-text">{{ option.text }}</span>
                              <i v-if="quizSubmitted && option.correct" class="bi bi-check-lg text-success ms-2"></i>
                              <i v-if="quizSubmitted && selectedAnswers[qIndex] === oIndex && !option.correct" 
                                 class="bi bi-x-lg text-danger ms-2"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div class="quiz-actions mt-4">
                        <button class="btn btn-primary" @click="submitQuiz" :disabled="!allQuestionsAnswered">
                          <i class="bi bi-send me-2"></i>
                          Submit Answers
                        </button>
                      </div>
                    </div>
                    
                    -- Quiz Results --
                    <div v-else class="quiz-results text-center py-4">
                      <div class="result-icon mb-3">
                        <i class="bi bi-trophy" :class="quizScore >= 70 ? 'text-warning' : 'text-secondary'"></i>
                      </div>
                      <h4 class="fw-bold text-dark mb-2">Quiz Complete!</h4>
                      <p class="text-muted mb-3">You scored {{ quizScore }}%</p>
                      <div class="result-message mb-4">
                        <p class="fs-6" :class="quizScore >= 70 ? 'text-success' : 'text-warning'">
                          <i class="bi me-2" :class="quizScore >= 70 ? 'bi-emoji-smile' : 'bi-emoji-neutral'"></i>
                          {{ quizScore >= 70 ? 'Great job! You have a solid understanding.' : 'Review the material and try again.' }}
                        </p>
                      </div>
                      <button class="btn btn-outline-primary" @click="resetQuiz">
                        <i class="bi bi-arrow-repeat me-2"></i>
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              </div> -->

              <!-- Next Steps -->
              <div class="content-card next-steps-card animated-slide-up" style="animation-delay: 0.4s">
                <div class="card-header d-flex align-items-center">
                  <i class="bi bi-arrow-right-circle me-3 text-primary fs-4"></i>
                  <h3 class="h4 fw-bold text-dark mb-0">Next Steps</h3>
                </div>
                <div class="card-body">
                  <div class="steps-list">
                    <div v-for="(step, index) in currentLesson?.nextSteps" :key="step" 
                         class="step-item d-flex align-items-start mb-3">
                      <span class="step-badge me-3">{{ index + 1 }}</span>
                      <span class="step-text fs-6 text-dark flex-grow-1">{{ step }}</span>
                      <i class="bi bi-check-circle text-muted ms-2"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation Actions -->
            <div class="content-card actions-card animated-fade-in mt-4">
              <div class="card-body">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                  <button 
                    class="btn btn-lg btn-outline-primary order-2 order-md-1" 
                    :disabled="selectedPill <= 1"
                    @click="selectPill(selectedPill - 1)"
                  >
                    <i class="bi bi-arrow-left me-2"></i>
                    Previous Chapter
                  </button>
                  
                  
                  
                  <button 
                    class="btn btn-sm btn-primary order-3" 
                    :disabled="selectedPill >= roadmapData.length"
                    @click="selectPill(selectedPill + 1)"
                  >
                    Next Chapter
                    <i class="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Celebration Toast -->
    <teleport to="body">
      <div v-if="showCelebration" class="celebration-toast">
        <div class="toast-content">
          <div class="toast-icon">
            <i class="bi bi-trophy-fill"></i>
          </div>
          <div class="toast-text">
            <p class="toast-title">Milestone Reached!</p>
            <p class="toast-message">{{ showCelebration }}</p>
          </div>
          <button class="toast-close" @click="showCelebration = null">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="progress-timer"></div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import roadmapData from './data/roadmap.json'
import glossaryData from './data/glossary.json'
import lessonsData from './data/lessons.json'
import missionsData from './data/missions.json'
import quizzesData from './data/quizzes.json'

const normalizeJson = (value) => {
  if (value && Array.isArray(value)) return value
  if (value && value.default && Array.isArray(value.default)) return value.default
  return []
}

export default defineComponent({
  name: 'App',

  data() {
    return {
      roadmapData: normalizeJson(roadmapData),
      glossary: normalizeJson(glossaryData),
      lessons: normalizeJson(lessonsData),
      missions: normalizeJson(missionsData),
      quizzes: normalizeJson(quizzesData),

      showCelebration: null,
      mobileNavOpen: false,

      maxStepReached: 1,
      activeStepId: 1,
      selectedPill: 1,

      // Quiz state
      selectedAnswers: {},
      quizSubmitted: false,
      quizCompleted: false,
      quizScore: 0,

      // Revert steps state
      activeRevertStep: 0,
      revertSteps: [
        {
          title: "Review Key Concepts",
          description: "Go through the main learning points and ensure you understand the core principles.",
          completed: false
        },
        {
          title: "Practice Implementation",
          description: "Apply what you've learned in a practical exercise or real-world scenario.",
          completed: false
        },
        {
          title: "Test Your Knowledge",
          description: "Complete the quiz to validate your understanding of the material.",
          completed: false
        },
        {
          title: "Document Learnings",
          description: "Take notes on key insights and how you can apply them moving forward.",
          completed: false
        }
      ]
    }
  },

  computed: {
    lessonEntries() {
      return this.lessons
    },
    currentLesson() {
      return this.lessonEntries.find((entry) => entry.chapterId === this.selectedPill) || this.lessonEntries[0]
    },
    currentQuiz() {
      return this.quizzes.find((quiz) => quiz.chapterId === this.selectedPill) || this.quizzes[0]
    },
    activeStep() {
      return this.roadmapData.find((s) => s.id === this.activeStepId) || this.roadmapData[0]
    },
    isCurrentStepCompleted() {
      return this.activeStep.id < this.maxStepReached
    },
    progressPercentage() {
      return ((this.maxStepReached - 1) / this.roadmapData.length) * 100
    },
    completedChapters() {
      return this.maxStepReached - 1
    },
    totalChapters() {
      return this.roadmapData.length
    },
    allQuestionsAnswered() {
      return this.currentQuiz?.questions?.every((_, index) => this.selectedAnswers[index] !== undefined)
    }
  },

  mounted() {
    const saved = localStorage.getItem('maxStepReached')
    if (saved) {
      const value = parseInt(saved)
      this.maxStepReached = value
      this.activeStepId = value
      this.selectedPill = value
    }
  },

  methods: {
    selectPill(stepId) {
      this.selectedPill = stepId
      this.handleSelectStep(stepId)
      this.mobileNavOpen = false
      this.resetQuiz()
    },
    handleSelectStep(stepId) {
      if (stepId <= this.maxStepReached) {
        this.activeStepId = stepId
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      if (stepId > this.maxStepReached) {
        this.maxStepReached = stepId
      }
    },
    handleStepComplete() {
      const nextStep = this.activeStepId + 1
      if (nextStep > this.maxStepReached) {
        this.maxStepReached = nextStep
        localStorage.setItem('maxStepReached', nextStep.toString())
      }

      const title = this.roadmapData.find((s) => s.id === this.activeStepId)?.title || 'Chapter Completed'
      this.showCelebration = title

      setTimeout(() => {
        this.showCelebration = null
      }, 4000)
    },
    toggleMobileNav() {
      this.mobileNavOpen = !this.mobileNavOpen
    },
    selectAnswer(questionIndex, optionIndex) {
      if (!this.quizSubmitted) {
        this.$set(this.selectedAnswers, questionIndex, optionIndex)
      }
    },
    submitQuiz() {
      this.quizSubmitted = true
      const totalQuestions = this.currentQuiz.questions.length
      const correctAnswers = this.currentQuiz.questions.reduce((count, question, index) => {
        const selectedOptionIndex = this.selectedAnswers[index]
        if (selectedOptionIndex !== undefined && question.options[selectedOptionIndex].correct) {
          return count + 1
        }
        return count
      }, 0)
      
      this.quizScore = Math.round((correctAnswers / totalQuestions) * 100)
      this.quizCompleted = true
    },
    resetQuiz() {
      this.selectedAnswers = {}
      this.quizSubmitted = false
      this.quizCompleted = false
      this.quizScore = 0
    },
    markStepComplete(stepIndex) {
      this.revertSteps[stepIndex].completed = true
      if (stepIndex < this.revertSteps.length - 1) {
        this.activeRevertStep = stepIndex + 1
      }
    }
  }
})
</script>

<style scoped>
/* Import Bootstrap Icons */
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css');

/* Base Styles */
.revert-shell {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.page-sheen {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 10% 20%, rgba(74, 144, 226, 0.08) 0%, transparent 40%),
              radial-gradient(circle at 90% 80%, rgba(116, 184, 255, 0.05) 0%, transparent 40%);
  z-index: 0;
}

.background-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.02) 1px, transparent 0);
  background-size: 24px 24px;
  z-index: 0;
}

.revert-content {
  position: relative;
  z-index: 1;
}

/* Mobile Navigation Toggle */
.mobile-nav-toggle {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  width: 50px;
  height: 50px;
  background: #ffffff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  font-size: 1.25rem;
  color: #374151;
}

/* Enhanced Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.animated-fade-in {
  animation: fadeInUp 0.6s ease-out;
}

.animated-slide-up {
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
}

/* Navigation Styles */
.navigation-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  position: sticky;
  top: 2rem;
  height: fit-content;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
}

.user-profile {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, #eaf3f1, rgba(11, 128, 111, 0.20));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
}

.progress-indicator {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.progress-bar-container {
  height: 8px;
  background: #f1f5f9;
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #eaf3f1, rgba(11, 128, 111, 0.20));
  border-radius: 10px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link {
  border-radius: 12px;
  padding: 1rem 1.25rem;
  border: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  color: #6b7280;
  font-weight: 500;
  background: transparent;
  display: flex;
  align-items: center;
}

.nav-link:not(.locked):hover {
  background: #f8fafc;
  color: #374151;
  transform: translateX(5px);
}

.nav-link.active {
  background: rgba(59, 130, 246, 0.1);
  color: #0b806f;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  transform: translateX(5px);
}

.nav-link.completed {
  color: #10b981;
}

.nav-link.locked {
  color: #d1d5db;
  cursor: not-allowed;
}

.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.nav-link.active .step-indicator {
  background: #0b806f;
  color: white;
}

.nav-link.completed .step-indicator {
  background: #10b981;
  color: white;
}

.nav-link.locked .step-indicator {
  background: #f3f4f6;
  color: #9ca3af;
  border: 1px solid #e5e7eb;
}

.active-arrow {
  color: #0b806f;
  font-size: 0.875rem;
}

/* Content Cards */
.content-card {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

.card-header {
  background: #f8fafc;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.section-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #0b806f, #60a5fa);
  color: white;
  border-radius: 10px;
  font-size: 1.125rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

/* Enhanced Typography */
.display-6 {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
}

.h4 {
  font-size: 1.5rem;
  font-weight: 700;
}

.fs-6 {
  font-size: 1.125rem;
}

.lh-lg {
  line-height: 1.7;
}

.text-dark {
  color: #1f2937 !important;
}

/* Status Elements */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  padding: 0.75rem 1.25rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse 2s infinite;
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  color: #6b7280;
  transition: all 0.3s ease;
  font-size: 1.125rem;
}

.btn-icon:hover {
  background: #0b806f;
  color: white;
  border-color: #0b806f;
  transform: translateY(-1px);
}

/* Deep Dive Section */
.deep-dive {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(245, 158, 11, 0.08) 100%);
  border-left: 4px solid #f59e0b;
}

/* Quiz Styles */
.option-card {
  background: #f8fafc;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option-card:hover {
  border-color: #0b806f;
  background: rgba(59, 130, 246, 0.05);
}

.option-card.selected {
  border-color: #0b806f;
  background: rgba(59, 130, 246, 0.1);
}

.option-card.correct {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.option-card.incorrect {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.option-content {
  display: flex;
  align-items: center;
}

.option-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #e5e7eb;
  color: #374151;
  border-radius: 8px;
  font-weight: 600;
  margin-right: 1rem;
  flex-shrink: 0;
}

.option-card.selected .option-letter {
  background: #0b806f;
  color: white;
}

.option-card.correct .option-letter {
  background: #10b981;
  color: white;
}

.option-card.incorrect .option-letter {
  background: #ef4444;
  color: white;
}

/* Revert Steps */
.revert-step {
  background: #f8fafc;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
}

.revert-step.active-step {
  border-color: #0b806f;
  background: rgba(59, 130, 246, 0.05);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #0b806f;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  flex-shrink: 0;
}

/* Next Steps */
.step-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  background: #0b806f;
  color: white;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 700;
  margin-top: 2px;
  flex-shrink: 0;
}

/* Buttons */
.btn {
  border-radius: 12px;
  padding: 0.875rem 1.75rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  border: 1px solid transparent;
  font-size: 1rem;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.btn-primary {
  background: #0b806f;
  border-color: #0b806f;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

.btn-primary:hover {
  background: #2563eb;
  border-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.35);
}

.btn-success {
  background: #10b981;
  border-color: #10b981;
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
}

.btn-success:hover {
  background: #059669;
  border-color: #059669;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
}

/* Celebration Toast */
.celebration-toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1100;
  animation: slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: #1f2937;
  color: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid #374151;
  max-width: 400px;
}

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  border-radius: 12px;
  color: white;
  font-size: 1.5rem;
}

.toast-title {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9ca3af;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.toast-message {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0;
  color: white;
}

.toast-close {
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.2s ease;
  font-size: 1.25rem;
}

.toast-close:hover {
  color: white;
}

.progress-timer {
  height: 4px;
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
  border-radius: 0 0 4px 4px;
  animation: progress 4s linear;
}

@keyframes progress {
  from { width: 100%; }
  to { width: 0%; }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Mobile Responsiveness */
@media (max-width: 991.98px) {
  .revert-content {
    padding: 1rem !important;
  }
  
  .navigation-card {
    position: fixed;
    top: 0;
    left: -100%;
    width: 320px;
    height: 100vh;
    z-index: 999;
    border-radius: 0;
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
  }
  
  .navigation-card.mobile-open {
    left: 0;
  }
  
  .mobile-nav-open .navigation-card {
    left: 0;
  }
  
  .display-6 {
    font-size: 2rem;
  }
  
  .card-body {
    padding: 0.5rem;
  }
  
  .card-header {
    padding: 1.25rem 1.5rem;
  }
  
  .btn-lg {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}

@media (max-width: 767.98px) {
  .content-wrapper {
    margin: 0;
  }
  
  .display-6 {
    font-size: 1.75rem;
  }
  
  .h4 {
    font-size: 1.25rem;
  }
  
  .card-body {
    padding: 1.25rem;
  }
  
  .section-number {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
  
  .celebration-toast {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
  }
  
  .toast-content {
    max-width: 100%;
  }
  
  .lesson-actions .btn {
    width: 100%;
    justify-content: center;
  }
  
  .revert-step {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .step-number {
    margin-bottom: 0.75rem;
  }
}

/* Utility Classes */
.tracking-wide {
  letter-spacing: 0.05em;
}

.flex-grow-1 {
  flex-grow: 1;
}

/* Content Section Enhancements */
.section-content :deep(p) {
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  line-height: 1.7;
  color: #374151;
}

.section-content :deep(strong) {
  color: #1f2937;
  font-weight: 700;
}

.section-content :deep(ul) {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.section-content :deep(li) {
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
  line-height: 1.6;
}

.section-content :deep(code) {
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  color: #dc2626;
}

/* Quick Actions */
.quick-actions {
  border-top: 1px solid #e5e7eb;
}

.quick-actions .btn {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
}
</style>