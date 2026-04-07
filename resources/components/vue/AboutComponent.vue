<template>
  <div class="salat-guide-container">
    

    <main class="container">
      <!-- Hero Section with Glass Morphism -->
      <section class="hero-section">
        <div class="hero-glass">
          <div class="hero-content">
            <div class="islamic-ornament">
              <i class="bi bi-moon-stars-fill"></i>
            </div>
            <h2 class="hero-title">{{ data.introduction.title }}</h2>
            <p class="hero-description">{{ data.introduction.content }}</p>
            <div class="pillar-chips">
              <span 
                v-for="(pillar, index) in data.introduction.pillars" 
                :key="index"
                class="pillar-chip"
              >
                {{ pillar }}
              </span>
            </div>
          </div>
          <div class="glass-reflection"></div>
        </div>
      </section>

      <!-- Prerequisites Section -->
      <section class="prerequisites-section">
        <div class="section-header">
          <h2 class="section-title">{{ data.prerequisites.title }}</h2>
          <p class="section-subtitle">{{ data.prerequisites.subtitle }}</p>
        </div>
        
        <div class="prerequisites-grid">
          <!-- Do's Card -->
          <div class="glass-card positive">
            <div class="card-glow"></div>
            <div class="card-header">
              <div class="status-indicator positive">
                <i class="bi bi-check-lg"></i>
              </div>
              <h3 class="card-title">Do's</h3>
            </div>
            <div class="card-content">
              <div 
                v-for="(item, index) in data.prerequisites.dos" 
                :key="index"
                class="checklist-item"
              >
                <div class="check-icon">
                  <i class="bi bi-check-circle-fill"></i>
                </div>
                <div class="check-content">
                  <strong>{{ item.title }}</strong>
                  <p>{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Don'ts Card -->
          <div class="glass-card negative">
            <div class="card-glow"></div>
            <div class="card-header">
              <div class="status-indicator negative">
                <i class="bi bi-x-lg"></i>
              </div>
              <h3 class="card-title">Don'ts</h3>
            </div>
            <div class="card-content">
              <div 
                v-for="(item, index) in data.prerequisites.donts" 
                :key="index"
                class="checklist-item"
              >
                <div class="check-icon">
                  <i class="bi bi-x-circle-fill"></i>
                </div>
                <div class="check-content">
                  <strong>{{ item.title }}</strong>
                  <p>{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Step-by-Step Guide -->
      <section class="steps-section">
        <div class="section-header text-center">
          <h2 class="section-title">{{ data.steps.title }}</h2>
          <p class="section-subtitle">{{ data.steps.subtitle }}</p>
        </div>

        <!-- Liquid Progress Bar -->
        <div class="liquid-progress">
          <div class="progress-track">
            <div 
              class="progress-fill"
              :style="{ width: `${(currentStep / (data.steps.steps.length - 1)) * 100}%` }"
            ></div>
          </div>
          <div class="step-dots">
            <div 
              v-for="(step, index) in data.steps.steps" 
              :key="index"
              class="step-dot"
              :class="{ 
                'active': currentStep === index, 
                'completed': currentStep > index 
              }"
              @click="setCurrentStep(index)"
            >
              <span class="dot-core"></span>
              <span class="step-number">{{ index + 1 }}</span>
            </div>
          </div>
        </div>

        <!-- Step Content -->
        <div class="step-glass-card">
          <div class="step-visual">
            <img 
              :src="data.steps.steps[currentStep].image" 
              :alt="data.steps.steps[currentStep].title"
              class="step-image"
            />
            <div class="step-overlay">
              <div class="step-badge">
                <span class="current">{{ currentStep + 1 }}</span>
                <span class="total">/ {{ data.steps.steps.length }}</span>
              </div>
            </div>
          </div>
          
          <div class="step-content">
            <div class="step-header">
              <h3 class="step-title">{{ data.steps.steps[currentStep].title }}</h3>
              <div class="step-meta">
                <span class="step-type">{{ data.steps.steps[currentStep].type }}</span>
                <span class="step-rakahs">{{ data.steps.steps[currentStep].rakahs }}</span>
              </div>
            </div>

            <div class="step-description">
              <h4 class="description-title">Description</h4>
              <p>{{ data.steps.steps[currentStep].description }}</p>
            </div>

            <div class="step-recitation">
              <h4 class="recitation-title">Recitation</h4>
              <div class="arabic-glass">
                <div class="arabic-text" dir="rtl">
                  {{ data.steps.steps[currentStep].arabic }}
                </div>
                <div class="translation">
                  <i class="bi bi-translate"></i>
                  {{ data.steps.steps[currentStep].translation }}
                </div>
              </div>
            </div>

            <div class="step-actions">
              <button 
                class="btn-glass prev"
                @click="previousStep"
                :disabled="currentStep === 0"
              >
                <i class="bi bi-arrow-left"></i>
                Previous
              </button>
              <button 
                class="btn-glass next"
                @click="nextStep"
                :disabled="currentStep === data.steps.steps.length - 1"
              >
                Next
                <i class="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Prayer Times -->
      <section class="prayer-times-section">
        <div class="section-header">
          <h2 class="section-title">{{ data.prayerTimes.title }}</h2>
          <p class="section-subtitle">{{ data.prayerTimes.subtitle }}</p>
        </div>

        <div class="prayer-cards">
          <div 
            v-for="(prayer, index) in data.prayerTimes.prayers" 
            :key="index"
            class="prayer-glass-card"
            :class="{ 'active': prayer.name === data.header.nextPrayer }"
          >
            <div class="prayer-icon">
              <i :class="prayer.icon"></i>
            </div>
            <div class="prayer-info">
              <h4 class="prayer-name">{{ prayer.name }}</h4>
              <div class="prayer-time-range">
                <span class="start">{{ prayer.start }}</span>
                <span class="separator">-</span>
                <span class="end">{{ prayer.end }}</span>
              </div>
              <div class="prayer-rakahs">
                {{ prayer.rakahs }} Rak'ahs
              </div>
            </div>
            <div class="prayer-glow"></div>
          </div>
        </div>
      </section>

      <!-- Resources -->
      <section class="resources-section">
        <div class="section-header">
          <h2 class="section-title">{{ data.resources.title }}</h2>
          <p class="section-subtitle">{{ data.resources.subtitle }}</p>
        </div>

        <div class="resources-grid">
          <div 
            v-for="(resource, index) in data.resources.items" 
            :key="index"
            class="resource-glass-card"
          >
            <div class="resource-icon">
              <i :class="resource.icon"></i>
            </div>
            <div class="resource-content">
              <h4>{{ resource.title }}</h4>
              <p>{{ resource.description }}</p>
              <button class="btn-resource">
                {{ resource.buttonText }}
                <i class="bi bi-arrow-right"></i>
              </button>
            </div>
            <div class="resource-glow"></div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="liquid-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="brand-icon">
              <i class="bi bi-bank"></i>
            </div>
            <div>
              <p class="copyright">{{ data.footer.copyright }}</p>
              <small class="footer-message">{{ data.footer.message }}</small>
            </div>
          </div>
          <div class="footer-quote">
            <p class="quote-text">"{{ data.footer.quote }}"</p>
            <small class="quote-source">{{ data.footer.source }}</small>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
// Import the JSON data
import appData from '../prayers.json';

export default {
  name: 'SalatGuide',
  data() {
    return {
      data: appData,
      currentStep: 0
    }
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.data.steps.steps.length - 1) {
        this.currentStep++;
      }
    },
    previousStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    setCurrentStep(step) {
      this.currentStep = step;
    }
  }
}
</script>

<style scoped>
/* CSS Variables for Design System */
:root {
  --primary-green: #00bfa6;
  --primary-dark: #008e7a;
  --primary-light: #33ccb8;
  --primary-lighter: #e6f7f5;
  --glass-bg: rgba(255, 255, 255, 0.25);
  --glass-border: rgba(255, 255, 255, 0.18);
  --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  --text-dark: #1a202c;
  --text-light: #718096;
  --bg-gradient: linear-gradient(135deg, #228B22 0%, #1a6b1a 100%);
}

/* Base Styles */
.salat-guide-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  color: var(--text-dark);
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  backdrop-filter: blur(20px);
}

/* Liquid Glass Header */
.liquid-header {
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
  padding: 2rem 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-text {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-icon {
  width: 50px;
  height: 50px;
  background: var(--primary-green);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.app-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, var(--text-dark), var(--primary-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.app-subtitle {
  color: var(--text-light);
  margin: 0;
}

.prayer-bubble {
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 1rem 1.5rem;
  box-shadow: var(--glass-shadow);
}

.bubble-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.prayer-label {
  display: block;
  font-size: 0.75rem;
  color: var(--text-light);
  margin-bottom: 0.25rem;
}

.prayer-name {
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-dark);
}

.prayer-time {
  display: block;
  font-size: 0.875rem;
  color: var(--text-light);
}

.bubble-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-green), transparent);
  border-radius: 20px;
  opacity: 0.1;
  animation: glow 3s ease-in-out infinite alternate;
}

@keyframes glow {
  from { opacity: 0.1; }
  to { opacity: 0.2; }
}

/* Hero Section */
.hero-section {
  margin: 3rem 0;
}

.hero-glass {
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: var(--glass-shadow);
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.islamic-ornament {
  font-size: 3rem;
  color: var(--primary-green);
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--text-dark), var(--primary-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.125rem;
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.pillar-chips {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.pillar-chip {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary-dark);
}

.glass-reflection {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: rotate(45deg);
  animation: reflection 6s ease-in-out infinite;
}

@keyframes reflection {
  0%, 100% { transform: rotate(45deg) translateX(-100%); }
  50% { transform: rotate(45deg) translateX(100%); }
}

/* Section Headers */
.section-header {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--text-dark), var(--primary-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-subtitle {
  color: var(--text-light);
  font-size: 1.125rem;
}

/* Glass Cards */
.glass-card {
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: var(--glass-shadow);
  overflow: hidden;
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-green), transparent);
  opacity: 0.05;
  border-radius: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.status-indicator {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
}

.status-indicator.positive {
  background: var(--primary-green);
}

.status-indicator.negative {
  background: #f56565;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.checklist-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--glass-border);
}

.checklist-item:last-child {
  border-bottom: none;
}

.check-icon {
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.check-icon i {
  font-size: 1.25rem;
}

.glass-card.positive .check-icon i {
  color: var(--primary-green);
}

.glass-card.negative .check-icon i {
  color: #f56565;
}

.check-content strong {
  display: block;
  margin-bottom: 0.25rem;
  color: var(--text-dark);
}

.check-content p {
  margin: 0;
  color: var(--text-light);
  font-size: 0.875rem;
}

/* Prerequisites Grid */
.prerequisites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* Liquid Progress */
.liquid-progress {
  position: relative;
  margin: 3rem 0;
}

.progress-track {
  height: 6px;
  background: var(--glass-bg);
  border-radius: 3px;
  position: absolute;
  top: 12px;
  left: 0;
  right: 0;
  z-index: 1;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-green), var(--primary-light));
  border-radius: 3px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.step-dots {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
}

.step-dot {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--glass-bg);
  border: 2px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.step-dot.active {
  background: var(--primary-green);
  border-color: var(--primary-green);
  transform: scale(1.2);
}

.step-dot.completed {
  background: var(--primary-green);
  border-color: var(--primary-green);
}

.step-dot.completed::after {
  content: '✓';
  color: white;
  font-weight: bold;
  font-size: 0.75rem;
}

.dot-core {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--primary-green);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.step-dot.active .dot-core {
  opacity: 1;
}

.step-number {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-light);
}

.step-dot.active .step-number,
.step-dot.completed .step-number {
  color: white;
}

/* Step Glass Card */
.step-glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--glass-shadow);
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 500px;
}

.step-visual {
  position: relative;
  background: var(--bg-gradient);
}

.step-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.step-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.step-badge {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 15px;
  padding: 0.5rem 1rem;
  color: white;
  font-weight: 600;
}

.current {
  font-size: 1.125rem;
}

.total {
  opacity: 0.7;
}

.step-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.step-header {
  margin-bottom: 2rem;
}

.step-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--text-dark), var(--primary-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.step-meta {
  display: flex;
  gap: 1rem;
}

.step-type,
.step-rakahs {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 15px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--primary-dark);
}

.step-description,
.step-recitation {
  margin-bottom: 2rem;
}

.description-title,
.recitation-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-dark);
}

.arabic-glass {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 15px;
  padding: 1.5rem;
}

.arabic-text {
  font-family: 'Traditional Arabic', 'Times New Roman', serif;
  font-size: 1.5rem;
  line-height: 2;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text-dark);
}

.translation {
  text-align: center;
  color: var(--text-light);
  font-style: italic;
}

.step-actions {
  margin-top: auto;
  display: flex;
  gap: 1rem;
}

.btn-glass {
  flex: 1;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  color: var(--text-dark);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-glass:hover:not(:disabled) {
  background: var(--primary-green);
  color: white;
  transform: translateY(-2px);
}

.btn-glass:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.btn-glass.next {
  background: var(--primary-green);
  color: white;
}

.btn-glass.next:hover:not(:disabled) {
  background: var(--primary-dark);
}

/* Prayer Cards */
.prayer-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.prayer-glass-card {
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: var(--glass-shadow);
  transition: all 0.3s ease;
  overflow: hidden;
}

.prayer-glass-card.active {
  border-color: var(--primary-green);
  transform: translateY(-4px);
}

.prayer-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-green), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 20px;
}

.prayer-glass-card.active .prayer-glow {
  opacity: 0.1;
}

.prayer-icon {
  width: 50px;
  height: 50px;
  background: var(--glass-bg);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-green);
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.prayer-name {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.prayer-time-range {
  font-size: 0.875rem;
  color: var(--text-light);
  margin-bottom: 0.5rem;
}

.prayer-rakahs {
  background: var(--primary-green);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-block;
}

/* Resources Grid */
.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.resource-glass-card {
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: var(--glass-shadow);
  transition: all 0.3s ease;
  overflow: hidden;
  text-align: center;
}

.resource-glass-card:hover {
  transform: translateY(-4px);
}

.resource-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-green), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 20px;
}

.resource-glass-card:hover .resource-glow {
  opacity: 0.1;
}

.resource-icon {
  width: 70px;
  height: 70px;
  background: var(--glass-bg);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: var(--primary-green);
  font-size: 1.75rem;
}

.resource-content h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-dark);
}

.resource-content p {
  color: var(--text-light);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.btn-resource {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  color: var(--primary-dark);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-resource:hover {
  background: var(--primary-green);
  color: white;
}

/* Footer */
.liquid-footer {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border-top: 1px solid var(--glass-border);
  margin-top: 4rem;
  padding: 2rem 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.brand-icon {
  width: 40px;
  height: 40px;
  background: var(--primary-green);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
}

.copyright {
  margin: 0;
  font-weight: 600;
  color: var(--text-dark);
}

.footer-message {
  color: var(--text-light);
}

.footer-quote {
  text-align: right;
}

.quote-text {
  margin: 0 0 0.25rem 0;
  font-style: italic;
  color: var(--text-dark);
}

.quote-source {
  color: var(--text-light);
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .header-text {
    flex-direction: column;
  }

  .step-glass-card {
    grid-template-columns: 1fr;
  }

  .step-visual {
    height: 250px;
  }

  .prerequisites-grid {
    grid-template-columns: 1fr;
  }

  .prayer-cards {
    grid-template-columns: 1fr;
  }

  .resources-grid {
    grid-template-columns: 1fr;
  }

  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .footer-quote {
    text-align: center;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus styles */
.btn-glass:focus,
.step-dot:focus,
.btn-resource:focus {
  outline: 2px solid var(--primary-green);
  outline-offset: 2px;
}

/* High contrast support */
@media (prefers-contrast: high) {
  :root {
    --glass-bg: rgba(255, 255, 255, 0.9);
    --glass-border: rgba(0, 0, 0, 0.3);
    --text-dark: #000000;
    --text-light: #333333;
  }
}
</style>
