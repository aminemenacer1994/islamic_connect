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
          <div class="navigation-card p-3 p-md-4 shadow-sm rounded-3">

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
            <ul class="nav nav-pills flex-column gap-2" role="tablist">
              <li v-for="step in roadmapData" :key="step.id" class="nav-item">
                <button type="button" class="nav-link text-start d-flex align-items-center w-100 py-3 fs-6" :class="{
                  active: selectedPill === step.id,
                  completed: step.id < maxStepReached,
                  locked: step.id > maxStepReached
                }" @click="selectPill(step.id)" :disabled="step.id > maxStepReached">
                  <span class="step-indicator me-3 fs-5">
                    <i v-if="step.id < maxStepReached" class="bi bi-check-lg"></i>
                    <span v-else-if="step.id === maxStepReached" class="current-step">{{ step.id }}</span>
                    <i v-else class="bi bi-lock"></i>
                  </span>

                  <span class="step-title flex-grow-1 fs-6 lh-sm">
                    {{ step.title }}
                  </span>

                  <i v-if="step.id === selectedPill" class="bi bi-chevron-right ms-2 active-arrow"></i>
                </button>
              </li>
            </ul>

          </div>
        </aside>

        <!-- MAIN CONTENT AREA -->
        <section class="col-12 col-md-8 col-lg-9">

          <!-- Lesson Header -->
          <div class="lesson-header animated-fade-in mb-4">
            <div class="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between">
              <div>

                <!-- Mobile friendly: smaller text, better spacing -->
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-journey me-2 text-primary fs-5"></i>
                  <span class="text-uppercase text-muted fw-bold small">
                    Chapter {{ currentLesson?.chapterId }}
                  </span>
                </div>

                <h1 class="fw-bold text-dark mb-2 lh-sm" :class="{
                  'fs-3': true,
                  'fs-md-2': true
                }">
                  {{ currentLesson?.title }}
                </h1>

              </div>
            </div>
          </div>

          <!-- ALL SECTIONS -->
          <div>

            <!-- Lesson Sections -->
            <div v-for="(section, index) in currentLesson?.sections" :key="section.title"
              class="content-card section-card animated-fade-slide mb-4 rounded-3"
              :style="{ animationDelay: `${index * 0.15}s` }">
              <div class="card-header d-flex align-items-center py-3">
                <div class="section-number fs-5">{{ index + 1 }}</div>
                <h4 class="fw-bold text-dark mb-0 ms-3 fs-5 lh-sm">{{ section.title }}</h4>
              </div>

              <div class="card-body p-3 p-md-4">
                <div class="section-content text-dark fs-6 lh-base" v-html="section.content"></div>

                <div v-if="section.deepDive" class="deep-dive mt-4">
                  <div class="deep-dive-header d-flex align-items-center mb-3">
                    <i class="bi bi-lightbulb-fill me-2 fs-4 text-warning"></i>
                    <h5 class="fw-bold mb-0 text-dark fs-5 lh-sm">{{ section.deepDive.title }}</h5>
                  </div>
                  <div class="deep-dive-content text-dark fs-6 lh-base" v-html="section.deepDive.content"></div>
                </div>
              </div>
            </div>

            <!-- Key Insights -->
            <div v-if="currentLesson?.keyInsights?.length"
              class="content-card section-card animated-fade-slide mb-4 rounded-3">
              <div class="card-header d-flex align-items-center py-3">
                <i class="fas fa-chart-line fs-4 me-3" style="color: #0b806f;"></i>
                <h3 class="fw-bold mb-0 fs-5">Key Insights</h3>
              </div>

              <div class="card-body p-3 p-md-4">
                <ul class="list-group insight-list fs-6 lh-base">
                  <li v-for="insight in currentLesson.keyInsights" :key="insight"
                    class="list-group-item border-0 px-0 py-3 d-flex align-items-center gap-3">
                    <i class="fas fa-check-circle fs-5" style="color: #0b806f;"></i>
                    <span>{{ insight }}</span>
                  </li>
                </ul>
              </div>
            </div>

            
            <!-- Guided Accordion -->
            <div v-if="accordionPanels.length"
              class="content-card section-card animated-fade-slide mb-4 rounded-3 accordion-card">
              <div class="card-header d-flex align-items-center py-3">
                <i class="bi bi-collection-play fs-4 me-3 text-primary"></i>
                <h3 class="fw-bold mb-0 fs-5">Guided Accordion</h3>
              </div>

              <div class="card-body p-3 p-md-4">
                <div class="accordion-stack">
                  <div v-for="(panel, index) in accordionPanels" :key="panel.id" class="accordion-item-card">
                    <button type="button"
                      class="faq-question accordion-trigger d-flex justify-content-between align-items-center w-100"
                      :class="{ expanded: isAccordionOpen(index) }"
                      @click="toggleAccordion(index)">
                      <span>{{ panel.title }}</span>
                      <i class="bi" :class="isAccordionOpen(index) ? 'bi-dash-lg text-success' : 'bi-plus-lg text-muted'"></i>
                    </button>
                    <div v-show="isAccordionOpen(index)" class="accordion-answer mt-2">
                      <div v-html="panel.body"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Next Steps -->
            <div class="content-card next-steps-card animated-slide-up rounded-3 mb-4" style="animation-delay: 0.4s">
              <div class="card-header d-flex align-items-center py-3">
                <i class="bi bi-arrow-right-circle me-3 text-primary fs-4"></i>
                <h3 class="fw-bold text-dark mb-0 fs-5">Next Steps</h3>
              </div>

              <div class="card-body p-3 p-md-4">
                <div class="steps-list">
                  <div v-for="(step, index) in currentLesson?.nextSteps" :key="step"
                    class="step-item d-flex align-items-start mb-3">
                    <span class="step-badge me-3 fs-6">{{ index + 1 }}</span>
                    <span class="step-text fs-6 lh-base flex-grow-1">{{ step }}</span>
                    <i class="bi bi-check-circle text-muted ms-2 fs-6"></i>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Divider -->
          <div class="border-top pt-4 mt-4"></div>

          <!-- NAVIGATION BUTTONS -->
          <div class="actions-card animated-fade-in">
            <div class="p-3 p-md-4">

              <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">

                <!-- Previous -->
                <button class="btn btn-outline-primary fw-500 px-4 py-3 fs-6"
                  :class="{ 'opacity-50 cursor-not-allowed': selectedPill <= 1 }" :disabled="selectedPill <= 1"
                  @click="selectPill(selectedPill - 1)">
                  <i class="bi bi-arrow-left me-2"></i>
                  Previous Chapter
                </button>

                <!-- Next -->
                <button class="btn fw-600 px-5 py-3 fs-6 text-white" :class="{
                  'bg-gradient-primary shadow-sm': !(selectedPill >= roadmapData.length || isWaitingForNext),
                  'btn-secondary opacity-75': selectedPill >= roadmapData.length || isWaitingForNext
                }" :disabled="selectedPill >= roadmapData.length || isWaitingForNext" @click="completeAndNext">
                  {{ isWaitingForNext ? 'Processing...' : 'Next Chapter' }}
                  <i class="bi bi-arrow-right ms-2"></i>
                </button>

              </div>

            </div>
          </div>

        </section>
      </div>
    </main>
  </div>
</template>


<script>
import { defineComponent } from 'vue'
import roadmapData from './data/roadmap.json'
import lessonsData from './data/lessons.json'
import quizzesData from './data/quizzes.json'
import accordionContent from './data/accordionContent.json'

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
      mobileNavOpen: false,
      maxStepReached: 1,
      selectedPill: 1,
      showSuccessAlert: false,
      successMessage: '',
      isWaitingForNext: false,
      faqState: {},
      accordionState: 0,
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
  },

  mounted() {
    const saved = localStorage.getItem('maxStepReached')
    if (saved) {
      const value = parseInt(saved, 10)
      this.maxStepReached = value
      this.selectedPill = value
    }
    this.loadConfetti()
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
      }
    },
  }
})
</script>

<style scoped>
/* ==================== BOOTSTRAP ICONS ==================== */
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css');



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
  padding: 1.75rem;
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
  animation: fadeSlideUp 0.7s ease-out forwards;
}

.animated-fade-in {
  animation: fadeInUp 0.6s ease-out;
}

.animated-slide-up {
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
}

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
  border-radius: 20px;
  box-shadow: 0 18px 30px rgba(0, 0, 0, 0.06);
  border: transparent;
  margin-bottom: 1.5rem;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
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

.accordion-card .accordion-stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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

  .lesson-actions .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
