<template>
  <div
    class="content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography section-quiz"
    :style="sectionStyle"
  >
    <div class="card-header d-flex align-items-center gap-3 flex-wrap py-3">
      <div class="d-flex align-items-start gap-3 flex-grow-1 min-width-0">
        <span class="card-header-icon">
          <i class="bi bi-journal-check"></i>
        </span>
        <div>
          <h3 class="fw-bold mb-1">Chapter Quiz</h3>
          <p class="text-muted small mb-0">Attempt the curated quiz to move to the next chapter.</p>
        </div>
      </div>
      <div class="section-control-stack ms-auto">
        <div class="section-font-controls" role="group" aria-label="Chapter quiz font size">
          <button
            type="button"
            class="section-font-btn"
            :disabled="isSectionFontMin"
            aria-label="Decrease chapter quiz font size"
            @click="$emit('decrease-font')"
          >
            A-
          </button>
          <button
            type="button"
            class="section-font-btn"
            :disabled="isSectionFontMax"
            aria-label="Increase chapter quiz font size"
            @click="$emit('increase-font')"
          >
            A+
          </button>
          <button
            type="button"
            class="section-toggle-btn card-toggle-btn"
            :aria-expanded="visible"
            :aria-label="visible ? 'Collapse chapter quiz' : 'Expand chapter quiz'"
            @click="$emit('toggle-visibility')"
          >
            <i class="bi" :class="visible ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-show="visible">
      <div v-if="currentQuestion">
        <div class="quiz-body px-4 py-3">
          <div class="quiz-progress-wrapper mb-3">
            <div class="quiz-progress-track">
              <div
                class="quiz-progress-fill"
                :style="{ width: ((currentQuestionIndex + (quizStatus === 'correct' ? 1 : 0)) / quizQuestions.length) * 100 + '%' }"
              ></div>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <p class="text-muted small mb-0">Progress toward mastery</p>
              <p class="mb-0 small fw-semibold text-teal">{{ quizProgressLabel }}</p>
            </div>
          </div>
          <div class="quiz-motivation-panel mb-3 shadow-sm rounded-4">
            <div class="d-flex align-items-start gap-3 flex-grow-1 min-width-0">
              <div class="quiz-motivation-icon d-flex align-items-center justify-content-center">
                <i class="bi bi-lightning-charge-fill fs-5"></i>
              </div>
              <div class="flex-grow-1">
                <p class="mb-0 fw-semibold">{{ motivationalMessage }}</p>
                <p class="text-muted small mb-0">{{ motivationalHint }}</p>
              </div>
            </div>
            <span class="quiz-stage-pill mt-2">{{ quizStageLabel }}</span>
          </div>
          <div class="quiz-focus-panel mb-3">
            <div class="quiz-focus-detail">
              <p class="text-muted small mb-1 text-uppercase">Section focus</p>
              <p class="fw-semibold mb-0">{{ currentQuizSectionTitle }}</p>
            </div>
            <div class="quiz-momentum">
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="text-muted small text-uppercase">Momentum</span>
                <span class="quiz-momentum-value">{{ quizMomentumPercent }}%</span>
              </div>
              <div class="quiz-momentum-bar">
                <span :style="{ width: `${quizMomentumPercent}%` }"></span>
              </div>
            </div>
          </div>
          <h3 class="fw-semibold text-dark mb-2 quiz-question">{{ currentQuestion.question }}</h3>
          <div class="quiz-options-grid">
            <button
              v-for="option in currentQuestion.options"
              :key="option"
              type="button"
              class="btn quiz-option text-start d-flex align-items-center justify-content-between"
              :class="{
                'quiz-option--correct': quizStatus === 'correct' && option === currentQuestion.answer,
                'quiz-option--incorrect': quizStatus === 'incorrect' && option === selectedOption,
                'quiz-option--neutral': !(quizStatus === 'correct' && option === currentQuestion.answer) && !(quizStatus === 'incorrect' && option === selectedOption),
                'quiz-option--selected': selectedOption === option && quizStatus !== 'correct'
              }"
              :disabled="chapterQuizPassed || quizStatus === 'correct'"
              :aria-pressed="selectedOption === option"
              @click="$emit('answer', option)"
            >
              <div>
                <span>{{ option }}</span>
              </div>
              <div class="icon-stack">
                <i v-if="quizStatus === 'correct' && option === currentQuestion.answer" class="bi bi-check-circle-fill text-dark"></i>
                <i v-else-if="quizStatus === 'incorrect' && option === selectedOption" class="bi bi-x-circle-fill text-dark"></i>
              </div>
            </button>
          </div>
          <div
            v-if="quizStatus && quizFeedback"
            class="quiz-feedback-panel mt-3"
            :class="{
              'quiz-feedback-panel--correct': quizStatus === 'correct',
              'quiz-feedback-panel--incorrect': quizStatus === 'incorrect'
            }"
            role="status"
            aria-live="polite"
          >
            <div class="d-flex align-items-start gap-2">
              <span class="quiz-feedback-icon">
                <i v-if="quizStatus === 'correct'" class="bi bi-stars"></i>
                <i v-else class="bi bi-arrow-repeat"></i>
              </span>
              <div>
                <p class="mb-0 fw-semibold">{{ quizFeedback }}</p>
                <small v-if="quizStatus === 'correct' && !chapterQuizPassed" class="text-muted">
                  Next question loading...
                </small>
                <small v-else-if="quizStatus === 'incorrect'" class="text-muted">
                  Try another choice or review the explanation below.
                </small>
              </div>
            </div>
          </div>
          <div v-if="quizStatus === 'incorrect' && quizHintExplanation" class="quiz-explanation-card mt-3">
            <div class="quiz-explanation-header">
              <div class="d-flex align-items-center gap-2">
                <i class="bi bi-lightbulb-fill fs-5 text-teal"></i>
                <div>
                  <p class="mb-0 fw-semibold mb-3 fs-6">Explanation</p>
                </div>
              </div>
            </div>
            <span class="right-answer-pill text-muted">
              <span class="text-dark fw-bold mt-2">Answer is: {{ currentQuestion.answer }}</span>
            </span>
            <div class="pt-2 text-muted">
              <p class="mb-0">{{ quizHintExplanation }}</p>
            </div>
            <div class="quiz-explanation-footer mt-3">
              <button
                v-if="quizHintSectionId"
                type="button"
                class="btn btn-sm btn-explanation-link"
                @click="$emit('jump', quizHintSectionId)"
              >
                Jump to the related lesson section
              </button>
            </div>
          </div>
        </div>
        <div v-if="chapterQuizPassed" class="quiz-success-note mt-3">
          <i class="bi bi-badge-check-fill text-teal me-2 fs-5"></i>
          <div class="d-flex flex-column flex-md-row gap-2 align-items-start">
            <div>
              <p class="mb-0 fw-semibold text-teal">Great! {{ quizRequiredCorrect }} correct answers recorded.</p>
              <small class="text-muted">The Next Chapter button above is now active.</small>
            </div>
            <button
              type="button"
              class="btn btn-outline-teal btn-sm shadow-none"
              @click="$emit('retry')"
            >
              Retake quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizSection',
  props: {
    sectionStyle: {
      type: Object,
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default: true
    },
    isSectionFontMin: {
      type: Boolean,
      default: false
    },
    isSectionFontMax: {
      type: Boolean,
      default: false
    },
    currentQuestion: {
      type: Object,
      default: null
    },
    chapterQuizPassed: {
      type: Boolean,
      default: false
    },
    quizQuestions: {
      type: Array,
      default: () => []
    },
    currentQuestionIndex: {
      type: Number,
      default: 0
    },
    quizStatus: {
      type: String,
      default: null
    },
    selectedOption: {
      type: String,
      default: null
    },
    quizFeedback: {
      type: String,
      default: ''
    },
    quizProgressLabel: {
      type: String,
      default: ''
    },
    quizStageLabel: {
      type: String,
      default: ''
    },
    motivationalMessage: {
      type: String,
      default: ''
    },
    motivationalHint: {
      type: String,
      default: ''
    },
    currentQuizSectionTitle: {
      type: String,
      default: ''
    },
    quizMomentumPercent: {
      type: Number,
      default: 0
    },
    quizHintExplanation: {
      type: String,
      default: ''
    },
    quizHintSectionId: {
      type: String,
      default: ''
    },
    quizRequiredCorrect: {
      type: Number,
      default: 2
    }
  },
  emits: ['decrease-font', 'increase-font', 'toggle-visibility', 'answer', 'retry', 'jump']
}
</script>
