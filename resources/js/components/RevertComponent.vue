<template>
  <div class="revert-shell position-relative">

    <!-- Background Layers -->
    <div class="page-sheen"></div>
    <div class="background-pattern"></div>

    <!-- Mobile Nav Toggle -->
    <button
      class="mobile-nav-toggle d-lg-none btn btn-light shadow-sm rounded-circle p-3 position-fixed top-3 start-3 z-3"
      @click="toggleMobileNav">
      <i class="bi" :class="mobileNavOpen ? 'bi-x-lg' : 'bi-list'"></i>
    </button>

    <!-- Success Alert -->
    <teleport to="body">
      <div v-if="showSuccessAlert" class="success-alert-container">
        <div class="alert alert-success-custom fade show shadow-lg" role="alert">
          <i class="bi bi-check-circle-fill me-2"></i>
          <strong>Congratulations!</strong> {{ successMessage }}
        </div>
      </div>
    </teleport>

    <!-- MAIN CONTENT -->
    <main class="container-fluid revert-content px-3 px-md-4 py-4 py-md-5">

      <div class="row g-4">

        <!-- SIDEBAR -->
        <aside class="col-12 col-md-4 col-lg-3" :class="{ 'mobile-open': mobileNavOpen }">
          <div class="navigation-card p-3  shadow-sm rounded-4">

            <!-- Progress Section -->
            <div class="progress-indicator mb-4">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="fw-bold small">Course Progress</span>
                <span class="text-muted small">{{ completedChapters }}/{{ totalChapters }}</span>
              </div>

              <div class="progress-bar-container">
                <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
              </div>

              <p class="text-muted small mt-2 mb-0">
                {{ Math.round(progressPercentage) }}% Complete
              </p>
            </div>

            <!-- Navigation List -->
            <div class="roadmap-pillset">
              <div v-for="step in roadmapData" :key="step.id"
                class="roadmap-pill d-flex align-items-center justify-content-between" :class="{
                  active: selectedPill === step.id,
                  completed: step.id < maxStepReached,
                  locked: step.id > maxStepReached
                }" @click="selectPill(step.id)" :data-locked="step.id > maxStepReached">
                <div class="dot-wrapper d-flex align-items-center gap-2">
                  <span class="dot-icon-step">
                    <i v-if="step.id < maxStepReached" class="bi bi-check-lg"></i>
                    <i v-else-if="step.id === maxStepReached" class="bi bi-star-fill"></i>
                    <span v-else>{{ step.id }}</span>
                  </span>
                  <div>
                    <p class="mb-0 fw-semibold">{{ step.title }}</p>
                    <small class="text-muted">{{ step.description }}</small>
                  </div>
                </div>
                <i v-if="step.id === selectedPill" class="bi bi-arrow-up-right fs-5 text-teal"></i>
                <i v-else class="bi bi-chevron-down fs-5 text-muted"></i>
              </div>
            </div>

          </div>
        </aside>

        <!-- MAIN CONTENT AREA -->
        <section class="col-12 col-md-8 col-lg-9">
          <!-- Lesson Header -->
          <div class="lesson-header animated-fade-in mb-4">
            <div class="lesson-hero position-relative overflow-hidden shadow-sm">
              <div class="lesson-hero-gradient"></div>
              <div class="lesson-hero-content">
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-journey me-2 text-white fs-4"></i>
                  <span class="text-uppercase text-white fw-semibold small">
                    Chapter {{ currentLesson?.chapterId }}
                  </span>
                </div>
                <h1 class="fw-bold text-white text-start text-md-left mb-2">
                  {{ currentLesson?.title }}
                </h1>
                <p class="text-white-50 mb-0">
                  {{ currentLesson?.summary }}
                </p>
              </div>
              <div class="lesson-meta d-flex gap-3">
                <span class="badge badge-pill bg-light text-dark fw-semibold">
                  Objectives: {{ currentLesson?.learningObjectives?.length ?? 0 }}
                </span>
                <span class="badge badge-pill bg-white text-teal fw-semibold">
                  {{ currentLesson?.sections?.length ?? 0 }} Topics
                </span>
              </div>
            </div>
          </div>

          <!-- Guidance Row -->
          <div v-if="guidanceCards.length"
            class="content-card section-card guidance-card animated-fade-slide mb-4 rounded-4">
            <div class="card-header d-flex align-items-center py-3">
              <i class="bi bi-compass-fill fs-4 me-3 text-teal"></i>
              <div>
                <p class="mb-0 text-muted small">Follow this flow</p>
                <h2 class="fw-bold mb-0 fs-5">Learning Guidance</h2>
              </div>
            </div>
            <div class="card-body px-3 px-md-4">
              <div class="guidance-grid">
                <article v-for="card in guidanceCards" :key="card.title" class="guidance-card-item">
                  <div class="guidance-card-top">
                    <span class="guidance-step">{{ card.step }}</span>
                    <h3 class="mb-1 fw-semibold">{{ card.title }}</h3>
                    <p class="mb-2 text-muted small">{{ card.description }}</p>
                  </div>
                  <div class="d-flex align-items-center gap-2 text-dark small fw-medium">
                    <i class="bi bi-arrow-right-circle-fill text-teal fs-5"></i>
                    <span>{{ card.action }}</span>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <!-- Learning objectives -->
          <div v-if="learningObjectiveColumns.length"
            class="content-card section-card animated-fade-slide mb-4 rounded-4">
            <div class="card-header d-flex align-items-center py-3">
              <i class="bi bi-stars fs-4 me-3 text-teal"></i>
              <h2 class="fw-bold mb-0 fs-5">Learning Objectives</h2>
            </div>

            <div class="card-body card-teal px-3 px-md-4">
              <div class="learning-objectives-grid">
                <div v-for="(column, columnIndex) in learningObjectiveColumns" :key="columnIndex"
                  class="objective-column">
                  <ul class="list-group insight-list fs-6 lh-base column-list m-0">
                    <li v-for="objective in column" :key="objective"
                      class="list-group-item border-0 px-0 py-3 d-flex align-items-start gap-3">
                      <i class="fas fa-check-circle fs-5 mt-1 text-teal"></i>
                      <span>{{ objective }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- ALL SECTIONS -->
          <div>
            <div class="content-card section-card animated-fade-slide mb-4 rounded-4" style="animation-delay: 0.05s">

              <div class="card-body">
                <div v-for="(section, index) in currentLesson?.sections" :key="section.title"
                  class="section-block mb-5">
                  <div class="d-flex align-items-start gap-3 mb-3">
                    <div class="section-number fs-5">{{ index + 1 }}</div>
                    <h5 class="fw-semibold mb-0 fs-5">{{ section.title }}</h5>
                  </div>
                  <div class="section-content text-dark fs-6 lh-lg" v-html="section.content"></div>
                  <div v-if="section.deepDive" class="background mt-4 w-100 py-3 px-4 rounded-4 border">
                    <div class="deep-dive-header d-flex align-items-center mb-2">
                      <i class="bi bi-lightbulb-fill me-2 fs-4 text-teal"></i>
                      <h6 class="fw-bold mb-0 text-dark fs-6">{{ section.deepDive.title }}</h6>
                    </div>
                    <div class="deep-dive-content text-dark fs-6" v-html="section.deepDive.content"></div>
                  </div>
                  <div class="pt-3 mt-3"></div>

                </div>

              </div>
            </div>

            <!-- Key Insights -->
            <div v-if="currentLesson?.keyInsights?.length"
              class="content-card section-card animated-fade-slide mb-4 rounded-4">
              <div class="card-header d-flex align-items-center py-3">
                <i class="fas fa-chart-line fs-4 me-3 text-teal"></i>
                <h2 class="fw-bold mb-0 fs-5">Key Insights</h2>
              </div>

              <div class="card-body p-3">
                <ul class="list-group insight-list fs-6 lh-base">
                  <li v-for="insight in currentLesson.keyInsights" :key="insight"
                    class="list-group-item border-0 px-0 py-3 d-flex align-items-center gap-3">
                    <i class="fas fa-check-circle fs-5 text-teal"></i>
                    <span>{{ insight }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Duas -->
            <div v-if="currentDuas.length" class="content-card section-card animated-fade-slide mb-4 rounded-4">
              <div class="card-header d-flex align-items-center py-3 justify-content-between">
                <div class="d-flex align-items-center gap-3">
                  <i class="bi bi-bookmark-star-fill fs-4 text-teal"></i>
                  <div>
                    <p class="mb-0 text-muted small">Guided remembrance</p>
                    <h2 class="fw-bold mb-0 fs-5">Duas to Carry</h2>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="row g-3">
                  <div v-for="dua in currentDuas" :key="dua.arabic" class="col-12 col-md-4">
                    <article class="dua-card h-100 rounded-4 p-4 shadow-lg">
                      <div class="dua-glow"></div>
                      <p dir="rtl"
                        class="fw-semibold lh-base mb-2 fs-5 text-teal border-bottom border-teal pb-2 text-end">
                        {{ dua.arabic }}
                      </p>
                      <p class="mb-0 text-dark">{{ dua.english }}</p>
                    </article>
                  </div>
                </div>
              </div>
            </div>


            <!-- Accordion -->
            <div v-if="accordionPanels.length"
              class="content-card section-card animated-fade-slide mb-4 rounded-4 accordion-card">
              <div class="card-header d-flex align-items-center py-3">
                <i class="bi bi-info-square-fill fs-4 me-3 text-teal"></i>
                <h2 class="fw-bold mb-0 fs-5">Common Asked Questions</h2>
              </div>

              <div class="card-body p-3 ">
                <div class="accordion-stack">
                  <div v-for="(panel, index) in accordionPanels" :key="panel.id" class="accordion-item-card">
                    <button type="button"
                      class="faq-question accordion-trigger d-flex justify-content-between align-items-center w-100"
                      :class="{ expanded: isAccordionOpen(index) }" @click="toggleAccordion(index)">
                      <span>{{ panel.title }}</span>
                      <i class="bi"
                        :class="isAccordionOpen(index) ? 'bi-dash-lg text-teal' : 'bi-plus-lg text-muted'"></i>
                    </button>
                    <div v-show="isAccordionOpen(index)" class="accordion-answer mt-2">
                      <div v-html="panel.body"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- resources -->
            <div v-if="accordionPanels.length"
              class="content-card section-card animated-fade-slide mb-4 rounded-4 accordion-card">
              <div class="card-header d-flex align-items-center py-3">
                <i class="bi bi-info-circle-fill fs-4 me-3 text-teal"></i>
                <h1 class="fw-bold mb-0 fs-5">Resources</h1>
              </div>

              <div class="card-body p-3 ">
                <div v-if="premiumResources.length" class="row row-cols-1 row-cols-md-2 g-3 mb-4">
                  <div class="col" v-for="card in premiumResources" :key="card.title">
                    <article class="premium-card h-100 d-flex flex-column">
                      <div>
                        <h3 class="h6 fw-semibold mb-2">{{ card.title }}</h3>
                        <p class="small text-muted mb-3">{{ card.desc }}</p>
                      </div>
                      <button type="button"
                        class="mt-auto resource-link d-flex align-items-center justify-content-center gap-2"
                        @click="openResource(card)">
                        <span>Explore the resource</span>
                        <i class="bi bi-arrow-up-right"></i>
                      </button>
                    </article>
                  </div>
                </div>
              </div>
            </div>


            <!-- Mission Spotlight -->
            <div v-if="currentMission" id="mission-card"
              class="content-card section-card animated-fade-slide mb-4 rounded-4 mission-card">
              <div class="card-header d-flex align-items-center py-3">
                <i class="bi bi-flag-fill fs-4 me-3 text-teal"></i>
                <h1 class="fw-bold mb-0 fs-5">Mission Pulse</h1>
              </div>
              <div class="card-body p-3">
                <p class="mb-2 text-muted small">Current mission tied to chapter {{ currentMission.chapterId }}</p>
                <h5 class="fw-semibold">{{ currentMission.title }}</h5>
                <p class="text-dark fs-6">{{ currentMission.summary }}</p>
                <div class="d-flex flex-wrap gap-2 align-items-center mt-3">
                  <span class="badge bg-success text-white rounded-pill">{{ currentMission.focus }}</span>
                  <button class="btn btn-outline-success btn-sm fw-semibold" @click="focusMission">
                    View Mission ↓
                  </button>
                </div>
              </div>
            </div>

            <!-- FAQ -->
            <div v-if="accordionPanels.length"
              class="content-card section-card animated-fade-slide mb-4 rounded-4 accordion-card">
              <div class="card-header d-flex align-items-center py-3">
                <i class="bi bi-question-circle-fill fs-4 me-3 text-teal"></i>
                <h1 class="fw-bold mb-0 fs-5">Frequently Asked Questions</h1>
              </div>

              <div class="card-body p-3 ">
                <div class="accordion-stack">
                  <div v-for="(panel, index) in accordionPanels" :key="panel.id" class="accordion-item-card">
                    <button type="button"
                      class="faq-question accordion-trigger d-flex justify-content-between align-items-center w-100"
                      :class="{ expanded: isAccordionOpen(index) }" @click="toggleAccordion(index)">
                      <span>{{ panel.title }}</span>
                      <i class="bi"
                        :class="isAccordionOpen(index) ? 'bi-dash-lg text-teal' : 'bi-plus-lg text-muted'"></i>
                    </button>
                    <div v-show="isAccordionOpen(index)" class="accordion-answer mt-2">
                      <div v-html="panel.body"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Next Steps -->
            <div class="content-card next-steps-card animated-slide-up rounded-4 mb-4" style="animation-delay: 0.4s">
              <div class="card-header d-flex align-items-center py-3">
                <i class="bi bi-clipboard-check-fill fs-4 me-3 text-teal"></i>
                <h1 class="fw-bold mb-0 fs-5">Next Steps & Homework</h1>
              </div>

              <div class="card-body p-3">
                <div class="row g-3">
                  <!-- <div class="col-12 col-md-6">
                  <div class="steps-list">
                    <div v-for="(step, index) in currentLesson?.nextSteps" :key="step"
                      class="step-item d-flex align-items-start mb-3">
                      <span class="step-badge me-3 fs-6">{{ index + 1 }}</span>
                      <span class="step-text fs-6 lh-base flex-grow-1">{{ step }}</span>
                      <i class="bi bi-check-circle text-muted ms-2 fs-6"></i>
                    </div>
                  </div>
                </div> -->
                  <div class="col-12 col-md-12">
                    <div class="homework-grid">
                      <div v-for="(task, index) in currentHomework" :key="task" class="homework-task p-3 mb-2">
                        <div class="d-flex align-items-center gap-2 mb-1">
                          <p class="mb-0 text-dark">{{ task }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quiz Card -->
          <div v-if="currentQuestion" class="content-card section-card animated-fade-slide mb-4 rounded-4 quiz-wrapper">
            <div class="card-header border-0 pb-2">
              <div class="d-flex align-items-center justify-content-between">
                <div class="card-header d-flex align-items-center py-3">
                  <i class="bi bi-dice-4-fill fs-4 me-3 text-teal"></i>
                  <h1 class="fw-bold mb-0 fs-5">Chapter Quiz</h1>
                </div>

                <span class="badge bg-gradient text-secondary rounded-pill px-3">Question {{ currentQuestionIndex + 1 }} /
                  {{ quizQuestions.length }}</span>
              </div>
            </div>
            <div class="card-body pt-3">
              <div class="quiz-card rounded-4 p-4 h-100 position-relative">              
                <p class="mb-1 text-muted small">Quiz • Answer one question right to unlock the next chapter</p>
                <div class="progress mb-3" style="height: 8px;">
                  <div class="progress-bar bg-gradient" role="progressbar"
                    :style="{ width: ((currentQuestionIndex + (quizStatus === 'correct' ? 1 : 0)) / quizQuestions.length) * 100 + '%' }">
                  </div>
                </div>
                <h3 class="fw-semibold text-dark mb-4">{{ currentQuestion.question }}</h3>
                <div class="d-grid gap-2">
                  <button v-for="option in currentQuestion.options" :key="option" type="button"
                    class="btn quiz-option text-start d-flex align-items-center justify-content-between" :class="{
                      'btn-success text-white': quizStatus === 'correct' && option === currentQuestion.answer,
                      'btn-danger text-white': quizStatus === 'incorrect' && option === selectedOption,
                      'btn-outline-secondary': !(quizStatus === 'correct' && option === currentQuestion.answer) && !(quizStatus === 'incorrect' && option === selectedOption)
                    }" :disabled="chapterQuizPassed" @click="answerQuiz(option)">
                    <span>{{ option }}</span>
                    <i v-if="quizStatus === 'correct' && option === currentQuestion.answer" class="bi bi-check-circle-fill"></i>
                    <i v-else-if="quizStatus === 'incorrect' && option === selectedOption" class="bi bi-x-circle-fill"></i>
                  </button>
                </div>
                <div class="quiz-tip mt-3 d-flex align-items-center gap-2">
                  <i class="bi bi-info-circle-fill text-teal"></i>
                  <p class="mb-0 small fw-medium" :class="quizStatus === 'incorrect' ? 'text-danger' : 'text-muted'">
                    {{ quizFeedback || 'Need a refresher? Scroll up to replay the lesson or revisit the lesson sections.' }}
                  </p>
                </div>
                <div v-if="chapterQuizPassed" class="quiz-success-note mt-3">
                  <i class="bi bi-badge-check-fill text-teal me-2 fs-5"></i>
                  <div>
                    <p class="mb-0 fw-semibold text-teal">You're ready for the next chapter.</p>
                    <small class="text-muted">Scroll down to tap “Next Chapter” when the button lights up.</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

          <!-- Divider -->
          <div class="border-top pt-4 mt-4"></div>

          <!-- NAVIGATION BUTTONS -->
          <div class="actions-card animated-fade-in">
            <div
              class="p-4 p-md-3 d-flex flex-column flex-md-row flex-wrap align-items-center justify-content-between gap-3">

              <button class="btn btn-outline-secondary fw-semibold px-4 py-3 fs-6 d-flex align-items-center gap-2"
                :class="{ 'opacity-50 cursor-not-allowed': selectedPill <= 1 }" :disabled="selectedPill <= 1"
                @click="selectPill(selectedPill - 1)">
                <i class="bi bi-arrow-left" aria-hidden="true"></i>
                Previous Chapter
              </button>

              <div class="d-flex flex-column flex-md-row align-items-center gap-2">
                <span class="text-muted small me-md-auto">Chapter {{ selectedPill }} of {{ roadmapData.length }}</span>
                <div v-if="chapterQuizPassed" class="text-teal small fw-semibold">Quiz cleared • Next Chapter unlocked.</div>
                <button class="btn next-btn fw-bold px-4 py-3 fs-6 text-white d-flex align-items-center gap-2"
                  :class="{
                    'next-ready': chapterQuizPassed && !(selectedPill >= roadmapData.length || isWaitingForNext),
                    'disabled': selectedPill >= roadmapData.length || isWaitingForNext || !chapterQuizPassed
                  }"
                  :disabled="selectedPill >= roadmapData.length || isWaitingForNext || !chapterQuizPassed"
                  @click="completeAndNext">
                  <span>{{ isWaitingForNext ? 'Processing...' : 'Next Chapter' }}</span>
                  <i class="bi bi-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <div v-if="showResourceModal">
      <div class="modal-backdrop fade show"></div>
      <div class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content rounded-4 shadow">
            <div class="modal-header">
              <h5 class="modal-title">{{ activeResource?.title }}</h5>
              <button type="button" class="btn-close" aria-label="Close" @click="closeResourceModal"></button>
            </div>
            <div class="modal-body">
              <p class="text-muted small mb-3">External Resource</p>
              <p>{{ activeResource?.desc }}</p>
              <p class="text-muted small">{{ activeResource?.link }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeResourceModal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { defineComponent } from 'vue'
import roadmapData from './data/roadmap.json'
import lessonsData from './data/lessons.json'
import quizzesData from './data/quizzes.json'
import accordionContent from './data/accordionContent.json'
import faqContent from './data/faqs.json'
import premiumResources from './data/premiumResources.json'
import duasData from './data/duas.json'
import homeworkData from './data/homework.json'
import missionsData from './data/missions.json'

const normalizeJson = (value) => {
  if (value && Array.isArray(value)) return value
  if (value && value.default && Array.isArray(value.default)) return value.default
  return []
}

// FULL-SCREEN EPIC CONFETTI
const fullScreenConfetti = () => {
  // Left shower
  window.confetti({
    particleCount: 100,
    spread: 80,
    origin: { x: 0, y: 0.6 },
    drift: 1.5,
    startVelocity: 50,
    gravity: 0.7,
    scalar: 1.2,
    colors: ['#10b981', '#34d399', '#6ee7b7', '#86efac', '#d1fae5'],
    shapes: ['square', 'circle'],
    zIndex: 10000,
    disableForReducedMotion: true
  })

  // Right shower
  window.confetti({
    particleCount: 100,
    spread: 80,
    origin: { x: 1, y: 0.6 },
    drift: -1.5,
    startVelocity: 50,
    gravity: 0.7,
    scalar: 1.2,
    colors: ['#10b981', '#34d399', '#6ee7b7', '#86efac', '#d1fae5'],
    shapes: ['square', 'circle'],
    zIndex: 10000,
    disableForReducedMotion: true
  })

  // Big center explosion
  window.confetti({
    particleCount: 150,
    spread: 120,
    origin: { x: 0.5, y: 0.5 },
    startVelocity: 60,
    scalar: 1.4,
    colors: ['#10b981', '#34d399', '#6ee7b7', '#86efac', '#d1fae5', '#ffffff'],
    shapes: ['square', 'circle'],
    zIndex: 10000,
    disableForReducedMotion: true
  })
}

export default defineComponent({
  name: 'App',

  data() {
    return {
      roadmapData: normalizeJson(roadmapData),
      lessons: normalizeJson(lessonsData),
      accordionPanels: normalizeJson(accordionContent),
      faqPanels: normalizeJson(faqContent),
      premiumResources: normalizeJson(premiumResources),
      quizzes: normalizeJson(quizzesData),
      missions: normalizeJson(missionsData),
      duas: normalizeJson(duasData),
      homework: normalizeJson(homeworkData),
      chapterQuizPassed: false,
      quizQuestions: [],
      currentQuestionIndex: 0,
      quizStatus: null,
      quizFeedback: '',
      selectedOption: null,
      mobileNavOpen: false,
      maxStepReached: 1,
      selectedPill: 1,
      showSuccessAlert: false,
      successMessage: '',
      isWaitingForNext: false,
      faqState: {},
      accordionState: 0,
      faqStackState: null,
      showResourceModal: false,
      activeResource: null,
    }
  },

  computed: {
    currentLesson() {
      return this.lessons.find(l => l.chapterId === this.selectedPill) || this.lessons[0]
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
    learningObjectiveColumns() {
      const objectives = this.currentLesson?.learningObjectives || []
      const chunkSize = 3
      const columns = []
      for (let i = 0; i < objectives.length; i += chunkSize) {
        columns.push(objectives.slice(i, i + chunkSize))
      }
      return columns
    },
    lessonHeroStats() {
      return [
        { label: 'Chapters unlocked', value: `${Math.min(this.maxStepReached, this.roadmapData.length) - 1}` },
        { label: 'Resources', value: `${this.premiumResources.length}` },
        { label: 'Quizzes available', value: `${this.quizzes.length}` }
      ]
    }
    ,
    currentMission() {
      return this.missions.find(m => m.chapterId === this.selectedPill) || this.missions[0]
    },
    currentDuas() {
      return this.duas.find(d => d.chapterId === this.selectedPill)?.duas || []
    },
    currentQuizData() {
      return this.quizzes.find(q => q.chapterId === this.selectedPill)?.questions || []
    },
    currentQuestion() {
      return this.quizQuestions[this.currentQuestionIndex]
    },
    currentHomework() {
      return this.homework.find(h => h.chapterId === this.selectedPill)?.homework || []
    }
    ,
    guidanceCards() {
      const lesson = this.currentLesson
      if (!lesson) return []
      const cards = [
        {
          step: '01',
          title: 'Absorb the Story',
          description: `Read through ${lesson.sections?.length || 0} featured sections and soak in the core ideas`,
          action: 'Bookmark key paragraphs and jot down a quick insight'
        },
        {
          step: '02',
          title: 'Internalize Duas & Insights',
          description: lesson.keyInsights?.length ? `Let the ${lesson.keyInsights.length} insights guide your practice` : 'Use the duas to keep the message close to your heart',
          action: lesson.keyInsights?.length ? 'Recite aloud and note how each insight applies today' : 'Practice the duas before sleep'
        },
        {
          step: '03',
          title: 'Take the Quiz',
          description: 'Answer one vibrant question to unlock the next chapter and prove mastery',
          action: 'Choose the right option then scroll to “Next Chapter”'
        }
      ]
      if (!this.currentDuas.length) {
        cards[1].description = 'Use the glossary, resources, and mission to keep the lesson alive'
        cards[1].action = 'Pin a phrase that resonated most'
      }
      return cards
    }
  },

  watch: {
    selectedPill() {
      this.chapterQuizPassed = false
      this.resetQuizSet()
    }
  },

  mounted() {
    const saved = localStorage.getItem('maxStepReached')
    if (saved) {
      const value = parseInt(saved, 10)
      this.maxStepReached = value
      this.selectedPill = value
    }
    this.loadConfetti()
    this.resetQuizSet()
  },

  methods: {
    loadConfetti() {
      if (window.confetti) return
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js'
      script.onload = () => console.log('Confetti loaded & ready!')
      document.head.appendChild(script)
    },

    toggleMobileNav() {
      this.mobileNavOpen = !this.mobileNavOpen
    },

    selectPill(id) {
      if (id <= this.maxStepReached) {
        this.selectedPill = id
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      this.mobileNavOpen = false
    },

    toggleFaq(index) {
      const chapterKey = this.currentLesson?.chapterId
      if (!chapterKey) return
      const current = this.faqState[chapterKey]
      const next = current === index ? null : index
      this.faqState = { ...this.faqState, [chapterKey]: next }
    },

    isFaqOpen(index) {
      const chapterKey = this.currentLesson?.chapterId
      return this.faqState[chapterKey] === index
    },

    toggleAccordion(index) {
      this.accordionState = this.accordionState === index ? null : index
    },

    isAccordionOpen(index) {
      if (this.accordionState === null) return false
      if (typeof this.accordionState === 'number') {
        return this.accordionState === index
      }
      return index === 0
    },

    toggleFaqStack(index) {
      this.faqStackState = this.faqStackState === index ? null : index
    },

    isFaqStackOpen(index) {
      if (this.faqStackState === null) return false
      return this.faqStackState === index || (this.faqStackState === undefined && index === 0)
    },

    completeAndNext() {
      const nextId = this.selectedPill + 1

      if (nextId > this.maxStepReached) {
        this.maxStepReached = nextId
        localStorage.setItem('maxStepReached', nextId.toString())

        const chapter = this.roadmapData.find(c => c.id === this.selectedPill)
        this.successMessage = `"${chapter?.title || 'Chapter'}" chapter has been completed successfully!`

        this.showSuccessAlert = true
        this.isWaitingForNext = true

        // FULL-SCREEN CONFETTI PARTY!
        this.$nextTick(() => {
          if (window.confetti) {
            fullScreenConfetti()       // This is where the magic happens
            setTimeout(fullScreenConfetti, 400) // second wave for extra wow
          }
        })

        // Auto hide toast
        setTimeout(() => {
          this.showSuccessAlert = false
          setTimeout(() => { this.isWaitingForNext = false }, 3000)
        }, 6000)
      }

      if (nextId <= this.roadmapData.length) {
        this.selectedPill = nextId
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.chapterQuizPassed = false
      }
    },
    focusMission() {
      const selector = '#mission-card'
      const el = document.querySelector(selector)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.classList.add('pulse-ring')
        setTimeout(() => el.classList.remove('pulse-ring'), 1600)
      }
    },
    openResource(resource) {
      this.activeResource = resource
      this.showResourceModal = true
    },
    closeResourceModal() {
      this.showResourceModal = false
      this.activeResource = null
    }
    ,
    resetQuizSet() {
      const base = this.currentQuizData
      this.quizQuestions = this.shuffleArray(base)
      this.currentQuestionIndex = 0
      this.quizStatus = null
      this.quizFeedback = ''
    },
    shuffleArray(arr) {
      return arr.slice().sort(() => Math.random() - 0.5)
    },
    answerQuiz(option) {
      const question = this.currentQuestion
      if (!question) return
      const correct = option === question.answer
      this.quizStatus = correct ? 'correct' : 'incorrect'
      this.selectedOption = option
      this.quizFeedback = correct ? 'Correct! Scroll down to unlock the Next Chapter button.' : 'Not quite, try another option.'
      if (correct) {
        this.chapterQuizPassed = true
      }
    }
  }
})
</script>

<style scoped>
/* ==================== BOOTSTRAP ICONS ==================== */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css');

.background {

  gap: 6px;
  padding: 6px 10px;
  font-size: 0.9rem;
  color: #114b5f;
  background: #eaf3f1;
  border: 1px solid rgba(11, 128, 111, 0.25);
}

/* ==================== PROFESSIONAL TOP-RIGHT SUCCESS ALERT ==================== */
.success-alert-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  pointer-events: none;
}

.alert-success-custom {
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border: 1px solid #34d399;
  color: #065f46;
  border-radius: 16px;
  padding: 1.2rem 1.8rem;
  font-size: 1.1rem;
  min-width: 360px;
  box-shadow: 0 15px 40px rgba(16, 197, 129, 0.25);
  backdrop-filter: blur(12px);
  border-left: 6px solid #10b981;
  animation: slideInTopRight 0.6s cubic-bezier(0.25, 0.86, 0.25, 1) forwards;
  pointer-events: auto;
}



@keyframes slideInTopRight {
  from {
    opacity: 0;
    transform: translateX(120px) translateY(-40px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateX(0) translateY(0) scale(1);
  }
}

/* ==================== ALL YOUR ORIGINAL STYLES (100% UNCHANGED) ==================== */
.section-card {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08),
    0 4px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.section-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12),
    0 8px 16px rgba(0, 0, 0, 0.08);
}

.card-header {
  background: linear-gradient(to bottom, #f8f9fa 0%, transparent 100%);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-color: transparent;
}

.section-number {
  width: 46px;
  height: 46px;
  background: var(--bs-primary, #0d6efd);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.card-body {
  padding-top: 1rem;
}

.section-content {
  font-size: 1.05rem;
  line-height: 1.75;
  color: #333;
}

.deep-dive {
  background: linear-gradient(135deg, #fff8e1 0%, #fff3e0 100%);
  border-left: 5px solid #ffb302;
  border-radius: 16px;
  padding: 1.5rem 1.75rem;
  margin-top: 2rem;
  box-shadow: 0 4px 15px rgba(255, 179, 2, 0.1);
}

.deep-dive-header {
  color: #d97706;
}

.deep-dive-content {
  font-size: 1rem;
  line-height: 1.7;
  color: #444;
}

.section-content {
  line-height: 1.8;
  font-size: 1.15rem;
}

.section-content p:first-child {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1a365d;
  margin: 0 0 2rem 0;
  line-height: 1.2;
}

.section-content p:nth-child(2),
.section-content p:nth-child(3),
.section-content p:nth-child(4) {
  font-size: 1.6rem;
  font-weight: 700;
  color: #2b6cb0;
  margin-top: 2.5rem;
}

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
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

.animated-fade-slide {
  opacity: 0;
  animation: fadeSlideUp 0.45s ease-out forwards;
}

.animated-fade-in {
  animation: fadeInUp 0.45s ease-out;
}

.animated-slide-up {
  animation: fadeInUp 0.45s ease-out;
  animation-fill-mode: both;
}

.navigation-card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.85));
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.18);
  border: 1px solid rgba(15, 76, 117, 0.15);
  position: sticky;
  top: 2rem;
  height: fit-content;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  backdrop-filter: blur(16px);
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

.roadmap-pillset {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

.roadmap-pill {
  border-radius: 18px;
  padding: 0.85rem 1rem;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(16, 185, 129, 0.15);
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);
  cursor: pointer;
  transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
}

.roadmap-pill:hover {
  transform: translateY(-2px);
  border-color: rgba(16, 185, 129, 0.35);
  background: rgba(255, 255, 255, 0.9);
}

.roadmap-pill.completed {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(251, 252, 255, 0.8));
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.roadmap-pill.active {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(16, 185, 129, 0.1));
  border: 1px solid rgba(59, 130, 246, 0.4);
  box-shadow: 0 12px 28px rgba(59, 130, 246, 0.2);
}

.roadmap-pill.locked {
  opacity: 0.5;
  cursor: not-allowed;
}

.dot-wrapper .dot-icon-step {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.2));
  border: 1px solid rgba(16, 185, 129, 0.35);
  font-weight: 700;
  color: #0f172a;
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
  color: linear-gradient(135deg, #0b806f, #60a5fa);
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
  background: linear-gradient(135deg, #0b806f, #60a5fa);
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

.content-card {
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 14px 35px rgba(15, 23, 42, 0.12);
  border: 1px solid rgba(15, 23, 42, 0.08);
  margin-bottom: 1.5rem;
  overflow: hidden;
  transition: box-shadow 0.35s ease, transform 0.35s ease;
  position: relative;
}

.content-card::before,
.content-card::after {
  content: none;
}

.content-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.15);
}

.content-card .card-header {
  position: relative;
  overflow: hidden;
}



.content-card:hover .card-header::after {
  opacity: 1;
}

.content-card .card-body {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 16px;
  padding: 1.75rem;
  border: 1px solid rgba(16, 185, 129, 0.12);
}

.dua-card {
  position: relative;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(16, 185, 129, 0.15);
  box-shadow: 0 20px 30px rgba(15, 23, 42, 0.12);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.dua-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 32px 45px rgba(15, 23, 42, 0.25);
}

.dua-card .dua-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(16, 185, 129, 0.25), transparent 45%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.dua-card:hover .dua-glow {
  opacity: 1;
}

.dot-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #0b806f;
  flex-shrink: 0;
  margin-top: 0.35rem;
}

.insight-list .list-group-item {
  background: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.glossary-list .list-group-item,
.video-list .list-group-item,
.resource-list .list-group-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  margin-bottom: 0.8rem;
  border: 1px solid rgba(16, 185, 129, 0.15);
}

.glossary-list .list-group-item:last-child,
.video-list .list-group-item:last-child,
.resource-list .list-group-item:last-child {
  margin-bottom: 0;
}

.scenario-alert {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(16, 185, 129, 0.1));
  border-color: rgba(59, 130, 246, 0.2);
  color: #0f172a;
  font-weight: 600;
}

.scenario-alert .bi {
  font-size: 1.25rem;
}

.premium-card {
  background: #fff;
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid #e3e8ed;
  box-shadow: 0 25px 40px rgba(15, 76, 117, 0.08);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.premium-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 35px 45px rgba(9, 70, 102, 0.15);
}

.premium-card h3 {
  font-size: 1rem;
}

.text-teal {
  color: #0b806f !important;
}

.border-teal {
  border-color: rgba(11, 128, 111, 0.4) !important;
}

.resource-link {
  padding: 0.65rem 1.25rem;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 0.95rem;
  font-weight: 600;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(16, 185, 129, 0.15));
  color: #0b806f;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border 0.25s ease;
  cursor: pointer;
}

.resource-link i {
  font-size: 1rem;
}

.resource-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 25px rgba(14, 165, 233, 0.25);
  border-color: rgba(14, 165, 233, 0.5);
}

.homework-task {
  background: rgba(239, 246, 255, 0.8);
  border-radius: 18px;
  border: 1px solid rgba(11, 128, 111, 0.2);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  transition: transform 0.3s ease, border 0.3s ease;
}

.homework-task:hover {
  transform: translateY(-3px);
  border-color: rgba(11, 128, 111, 0.4);
}

.steps-list .step-item {
  background: rgba(255, 255, 255, 0.65);
  border-radius: 18px;
  padding: 1rem;
}

.step-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(11, 128, 111, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #0b806f;
}



.quiz-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(14, 165, 233, 0.2), transparent 40%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.quiz-card:hover::after {
  opacity: 1;
}

.quiz-wrapper {
  overflow: hidden;
}

.progress-bar.bg-gradient {
  background: linear-gradient(135deg, #a855f7, #ec4899);
}

.quiz-option {
  border-radius: 18px;
  font-weight: 600;
  border-width: 2px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.quiz-option:hover {
  transform: translateY(-2px);
}

.quiz-tip .bi {
  font-size: 1rem;
}

.quiz-success-note {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 16px;
  background: rgba(16, 185, 129, 0.12);
}

.quiz-success-note .text-teal {
  color: #0b806f;
}

.quiz-option {
  border-radius: 12px;
  font-weight: 600;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.quiz-option:hover {
  transform: translateY(-1px);
}

.next-btn {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  background: linear-gradient(135deg, #0b806f, #16a34a);
  box-shadow: 0 12px 30px rgba(11, 128, 111, 0.35);
}

.next-btn.disabled {
  background: #94a3b8;
  box-shadow: none;
}

.next-btn.next-ready:not(.disabled) {
  border: none;
  transform: translateY(-1px);
}

.guidance-card-item {
  background: rgba(11, 128, 111, 0.05);
  border-radius: 20px;
  padding: 1.1rem 1.25rem;
  border: 1px solid rgba(14, 165, 233, 0.15);
  transition: transform 0.3s ease, border 0.3s ease;
}

.guidance-card-item:hover {
  transform: translateY(-3px);
  border-color: rgba(14, 165, 233, 0.35);
}

.guidance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.guidance-step {
  display: inline-flex;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  background: rgba(11, 128, 111, 0.15);
  color: #0b806f;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.paragraph-grid {
  column-count: 2;
  column-gap: 1.5rem;
}

.learning-objectives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.learning-objectives-grid::after {
  content: '';
  position: absolute;
  inset: -1rem;
  border-radius: 25px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(16, 185, 129, 0.08));
  filter: blur(25px);
  z-index: -1;
}

.objective-column {
  padding: 1rem;
}

.deep-dive {
  background: rgba(236, 253, 245, 0.6);
  border-radius: 16px;
}

@media (max-width: 768px) {
  .paragraph-grid {
    column-count: 1;
  }
}

.paragraph-grid p {
  margin: 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.7);
}

.section-block {
  position: relative;
  overflow: hidden;
  background: rgba(247, 250, 255, 0.7);
  border-radius: 20px;
  padding: 1.6rem;
  border: 1px solid rgba(14, 165, 233, 0.15);
}


.deep-dive {
  background: rgba(236, 253, 245, 0.6);
  border-radius: 16px;
}

.accordion-card .accordion-stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.learning-objectives-card .objective-column {
  transition: transform 0.4s ease;
}

.learning-objectives-card .objective-column:hover {
  transform: translateY(-4px);
}

.accordion-item-card {
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.mission-card {
  position: relative;
  overflow: hidden;
}

.mission-card::after {
  content: '';
  position: absolute;
  inset: 18px;
  border-radius: 20px;
  border: 1px dashed rgba(16, 185, 129, 0.35);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mission-card:hover::after {
  opacity: 1;
}

.pulse-ring {
  animation: missionPulse 1.6s ease forwards;
}

@keyframes missionPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
  }

  70% {
    box-shadow: 0 0 0 18px rgba(16, 185, 129, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

.content-card.section-card {
  opacity: 0;
  animation: cardLift 0.9s ease forwards;
}

@keyframes softPulse {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
  }

  100% {
    transform: translateY(0);
  }
}

.content-card.section-card:nth-of-type(odd) {
  animation-delay: 0.05s;
}

.content-card.section-card:nth-of-type(even) {
  animation-delay: 0.15s;
}

@keyframes cardLift {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  50% {
    transform: translateY(-8px) scale(1.01);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.accordion-item-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  padding: 0.65rem;
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.accordion-item-card:hover {
  border-color: rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
}

.accordion-trigger {
  background: transparent;
  border: none;
  font-weight: 600;
  padding: 0;
}

.accordion-trigger.expanded {
  color: #0b806f;
}

.accordion-answer {
  padding: 0.75rem 0.5rem 0;
  color: #1f2937;
  line-height: 1.6;
}

.actions-card {
  border-radius: 20px;
  margin-top: 1.5rem;
  background: linear-gradient(145deg, rgba(16, 185, 129, 0.08), rgba(59, 130, 246, 0.08));
  box-shadow: inset 0 0 0 1px rgba(16, 185, 129, 0.2);
}

.next-btn {
  background: linear-gradient(135deg, #0b806f, #22c55e);
  border-radius: 12px;
  border: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.25);
}

.next-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(16, 185, 129, 0.35);
}

.next-btn.disabled,
.next-btn:disabled {
  background: #94a3b8;
  box-shadow: none;
}

@media (max-width: 991px) {
  .section-card {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .learning-objectives-grid::after {
    inset: -0.5rem;
  }

  .premium-card {
    padding: 1.25rem;
  }

  .lesson-hero {
    padding: 1.5rem;
  }

  .lesson-meta {
    position: static;
    margin-top: 1rem;
  }

  .paragraph-grid {
    column-count: 1;
  }
}

@media (max-width: 767px) {
  .navigation-card {
    position: static;
    max-height: none;
    width: 100%;
    border-radius: 20px;
  }

  .mobile-nav-toggle {
    left: auto;
    right: 1rem;
  }

  .card-body {
    padding: 1rem;
  }
}

.faq-stack .faq-item+.faq-item {
  margin-top: 0.75rem;
}

.faq-question {
  background: rgba(15, 23, 42, 0.02);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 14px;
  padding: 0.9rem 1.25rem;
  font-weight: 600;
  color: #0f172a;
  transition: border-color 0.3s ease;
  cursor: pointer;
}

.faq-question:hover {
  border-color: rgba(59, 130, 246, 0.4);
}

.faq-answer {
  background: rgba(59, 130, 246, 0.08);
  border-radius: 12px;
  padding: 0.85rem 1rem;
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: inset 0 2px 4px rgba(15, 23, 42, 0.05);
}

.lesson-hero {
  background: linear-gradient(135deg, #111827, #0f172a 65%);
  border-radius: 32px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
  min-height: 180px;
  box-shadow: 0 30px 45px rgba(15, 23, 42, 0.35);
  animation: softPulse 12s ease-in-out infinite;
}

.lesson-hero-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.45), transparent 55%);
  opacity: 0.4;
  filter: blur(10px);
}

.lesson-hero::after {
  content: '';
  position: absolute;
  inset: -40%;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.25), transparent 65%);
  opacity: 0.6;
  filter: blur(60px);
  z-index: 0;
  animation: slowPulse 6s linear infinite;
}

.section-block::before {
  content: '';
  position: absolute;
  inset: 16px;
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.1);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.section-block:hover::before {
  opacity: 1;
}

.section-number {
  transition: none;
}

.learning-objectives-grid .column-list li {
  opacity: 0.85;
  transition: opacity 0.3s ease;
}

.learning-objectives-grid .column-list li:hover {
  opacity: 1;
}

.learning-objectives-grid {
  position: relative;
}

.learning-objectives-grid::after {
  content: '';
  position: absolute;
  inset: -1rem;
  border-radius: 25px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(16, 185, 129, 0.08));
  filter: blur(25px);
  z-index: -1;
}

@keyframes slowPulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.08);
  }

  100% {
    transform: scale(1);
  }
}

.lesson-hero-content {
  position: relative;
  z-index: 1;
}

.lesson-meta {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  z-index: 1;
  display: flex;
  gap: 0.5rem;
}

.badge {
  padding: 0.35rem 0.95rem;
  font-size: 0.85rem;
}

.lesson-hero-stats {
  position: relative;
  z-index: 1;
}

.stat-pill {
  border-radius: 16px;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  min-width: 160px;
}

.stat-pill strong {
  font-size: 1rem;
  color: #0f172a;
}

.card-header {
  padding: 1.5rem 2rem;
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

.display-6 {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
}

.h4 {
  font-size: 1.7rem;
  font-weight: 700;
}

/* .fs-6 {
  font-size: 1.5rem;
} */

.lh-lg {
  line-height: 1.7;
}

.text-dark {
  color: #1f2937 !important;
}

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

.tracking-wide {
  letter-spacing: 0.05em;
}

.flex-grow-1 {
  flex-grow: 1;
}

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

.paragraph-grid p {
  margin-bottom: 1rem;
}

.common-question-card,
.insights-card,
.faq-card,
.glossary-card,
.dos-card,
.video-card,
.scenario-card,
.resource-card,
.quiz-block {
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: popIn 0.6s ease;
}

.common-question-card .faq-block,
.faq-card .faq-block {
  margin-bottom: 1rem;
}

.insight-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
}

.insight-pill {
  padding: 0.8rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
}

.glossary-line {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

.glossary-line:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.dos-list {
  padding-left: 1rem;
}

.video-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.scenario-text {
  margin: 0;
  line-height: 1.6;
  color: #d6e4ff;
}

.resource-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  padding-bottom: 0.4rem;
}

.resource-line:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.resource-type {
  text-transform: uppercase;
  font-size: 0.7rem;
  color: #34d399;
}

.quiz-question {
  font-weight: 600;
}

.quiz-options li {
  padding: 0.7rem;
  border-radius: 12px;
  margin-bottom: 0.4rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ==================== RESPONSIVE FIXES ==================== */
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

  .navigation-card.mobile-open,
  .mobile-nav-open .navigation-card {
    left: 0;
  }

  .content-card.section-card {
    background: linear-gradient(180deg, rgba(16, 185, 129, 0.04), rgba(255, 255, 255, 0.9));
    box-shadow: 0 18px 35px rgba(15, 76, 117, 0.1);
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
  .display-6 {
    font-size: 1.75rem;
  }

  .h4 {
    font-size: 1.25rem;
  }

  .card-body {
    padding: 1rem;
  }

  .section-number {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }

  .lesson-actions .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
