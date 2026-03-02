<template>
  <div id="lesson-overview-section" class="lesson-header animated-fade-in mb-4">
    <div class="lesson-hero position-relative overflow-hidden shadow-sm">
      <div class="lesson-hero-gradient"></div>
      <div class="lesson-hero-content">
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-journey me-2 text-white fs-4"></i>
          <span class="text-uppercase text-white fw-bold small">
            Chapter {{ chapterId }}
          </span>
        </div>
        <h1 class="fw-bold text-white text-start text-md-left mb-2">
          {{ title || 'Revert Journey' }}
        </h1>
        <p class="text-white-50 mb-0">
          {{ summary || 'Build your path chapter by chapter with guided lessons and practical support.' }}
        </p>
        <div class="lesson-hero-meta mt-3">
          <span class="hero-meta-chip">
            <i class="bi bi-graph-up-arrow"></i>
            {{ Math.round(progressPercentage) }}% complete
          </span>
          <span class="hero-meta-chip">
            <i class="bi bi-check2-circle"></i>
            {{ completedChapters }}/{{ totalChapters }} chapters done
          </span>
          <span class="hero-meta-chip">
            <i class="bi bi-stars"></i>
            Current unlock: Chapter {{ maxStepReached }}
          </span>
        </div>
        <div class="lesson-hero-actions mt-3">
          <button
            type="button"
            class="hero-resume-btn"
            @click="$emit('continue-path')"
          >
            <i class="bi bi-compass-fill"></i>
            Continue where you left off
          </button>
        </div>
      </div>
      <button
        type="button"
        class="lesson-help-button"
        aria-label="Open Reverts Corner guide"
        @click="$emit('open-help')"
      >
        <i class="bi bi-question-circle-fill fs-4"></i>
        <span class="visually-hidden">Open guide</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LessonHeader',
  props: {
    chapterId: {
      type: [Number, String],
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    summary: {
      type: String,
      default: ''
    },
    progressPercentage: {
      type: Number,
      default: 0
    },
    completedChapters: {
      type: Number,
      default: 0
    },
    totalChapters: {
      type: Number,
      default: 0
    },
    maxStepReached: {
      type: Number,
      default: 1
    }
  },
  emits: ['continue-path', 'open-help']
}
</script>
