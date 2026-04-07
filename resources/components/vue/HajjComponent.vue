<template>
  <div class="hajj-guide-premium">
    <!-- Premium Progress Bar -->
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: scrollProgress + '%' }"></div>
    </div>

    <!-- Elegant Sticky Header -->
    <header class="premium-header" :class="{ 'scrolled': isScrolled }">
      <div class="header-content">
        <div class="brand">
          <span class="brand-icon">🕋</span>
          <span class="brand-name">The Sacred Journey</span>
        </div>
        
        <nav class="premium-nav">
          <button 
            v-for="tab in content.navigation.tabs" 
            :key="tab.id"
            class="nav-tab" 
            :class="{ active: activeSection === tab.id }"
            @click="scrollToSection(tab.id)"
          >
            <i :class="tab.icon"></i>
            <span>{{ tab.label }}</span>
          </button>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero-premium" id="hero">
      <div class="hero-overlay"></div>
      <div class="hero-pattern"></div>
      <div class="hero-content">
        <div class="hero-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <h1 class="hero-title">
          Hajj <span class="hero-accent">&</span> <em>Umrah</em>
        </h1>
        <p class="hero-subtitle">
          A meticulously crafted, scholar-verified guide to the two most sacred journeys in Islam — 
          designed with reverence, precision, and love.
        </p>
        <div class="hero-actions">
          <button class="btn-primary" @click="scrollToSection('umrah')">
            Begin Umrah Guide
            <span class="btn-arrow">→</span>
          </button>
          <button class="btn-secondary" @click="scrollToSection('hajj')">
            Explore Hajj
          </button>
        </div>
        <div class="hero-meta">
          <span class="meta-item">📚 Scholarly Verified</span>
          <span class="meta-item">🌙 Updated 1446 AH</span>
          <span class="meta-item">🔒 Privacy First</span>
        </div>
      </div>
      <div class="hero-scroll-indicator">
        <div class="scroll-mouse"></div>
        <span>Discover</span>
      </div>
    </section>

    <!-- Search Bar -->
    <section class="search-premium">
      <div class="search-container">
        <div class="search-input-wrapper">
          <i class="search-icon fas fa-search"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            @focus="showSearchDropdown = true"
            @blur="hideSearchDropdown"
            placeholder="Search rituals, rulings, days, or questions..."
            class="search-input"
          >
          <button class="search-btn" @click="performSearch">Search</button>
        </div>
        
        <transition name="slide-fade">
          <div class="search-results" v-if="showSearchDropdown && filteredSearchResults.length">
            <div 
              v-for="(result, idx) in filteredSearchResults" 
              :key="idx"
              class="search-result-item"
              @click="navigateToResult(result)"
            >
              <span class="result-category">{{ result.category }}</span>
              <span class="result-title">{{ result.title }}</span>
            </div>
          </div>
        </transition>
      </div>
    </section>

    <!-- Basics Section -->
    <section class="section-premium" id="basics">
      <div class="section-header">
        <span class="section-eyebrow">Chapter I</span>
        <h2 class="section-title">Understanding the Sacred Pilgrimages</h2>
        <p class="section-description">
          Foundational knowledge for your spiritual journey — clarity before action.
        </p>
      </div>

      <div class="cards-grid">
        <div 
          v-for="(card, idx) in content.basics.cards" 
          :key="idx"
          class="premium-card"
        >
          <div class="card-icon">
            <i :class="card.icon"></i>
          </div>
          <h3 class="card-title">{{ card.title }}</h3>
          <p class="card-description">{{ card.description }}</p>
          <div class="card-note">
            <span class="note-label">{{ card.noteTitle }}:</span>
            <span class="note-text">{{ card.note }}</span>
          </div>
        </div>
      </div>

      <!-- Hajj Types -->
      <div class="hajj-types-container">
        <div class="hajj-types-card">
          <div class="types-header">
            <h3>{{ content.basics.hajjTypes.title }}</h3>
            <span class="types-badge">Recommended</span>
          </div>
          <p class="types-description">{{ content.basics.hajjTypes.description }}</p>
          <div class="types-progress">
            <div class="progress-bar-mini">
              <div class="progress-fill-mini" :style="{ width: content.basics.hajjTypes.progress }"></div>
            </div>
            <span class="progress-label">{{ content.basics.hajjTypes.progress }} of pilgrims choose this method</span>
          </div>
          <p class="types-note">{{ content.basics.hajjTypes.note }}</p>
        </div>
      </div>

      <!-- Kaaba Image -->
      <div class="image-showcase">
        <div class="image-wrapper">
          <img :src="content.basics.image.url" :alt="content.basics.image.alt" class="showcase-image">
          <div class="image-caption">{{ content.basics.image.caption }}</div>
        </div>
      </div>

      <!-- Talbiyah Audio -->
      <div class="audio-player">
        <div class="player-header">
          <i class="fas fa-headphones-alt"></i>
          <span>{{ content.basics.audio.title }}</span>
        </div>
        <p class="player-description">{{ content.basics.audio.description }}</p>
        <audio :src="content.basics.audio.src" controls class="audio-control"></audio>
      </div>
    </section>

    <!-- Umrah Steps Section -->
    <section class="section-premium alt-bg" id="umrah">
      <div class="section-header">
        <span class="section-eyebrow">Chapter II</span>
        <h2 class="section-title">Umrah — A Step-by-Step Journey</h2>
        <p class="section-description">
          Four sacred acts that transform the heart — performed with intention and grace.
        </p>
      </div>

      <div class="steps-timeline">
        <div 
          v-for="(step, idx) in content.umrah.steps" 
          :key="idx"
          class="timeline-item"
        >
          <div class="timeline-marker">
            <span class="marker-number">{{ String(idx + 1).padStart(2, '0') }}</span>
            <div class="marker-line" v-if="idx < content.umrah.steps.length - 1"></div>
          </div>
          <div class="timeline-content">
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
            <div class="step-tip">
              <i class="fas fa-lightbulb"></i>
              <span>{{ step.tip }}</span>
            </div>
            <a :href="step.video" target="_blank" class="step-video-link">
              <i class="fas fa-play-circle"></i>
              Watch Tutorial
            </a>
          </div>
        </div>
      </div>

      <!-- Umrah Conclusion -->
      <div class="conclusion-card">
        <h4>{{ content.umrah.conclusion.title }}</h4>
        <p>{{ content.umrah.conclusion.text }}</p>
      </div>
    </section>

    <!-- Hajj Days Section -->
    <section class="section-premium" id="hajj">
      <div class="section-header">
        <span class="section-eyebrow">Chapter III</span>
        <h2 class="section-title">Hajj — The Journey of a Lifetime</h2>
        <p class="section-description">
          Day by day through the blessed ten days — from Mina to Muzdalifah to Arafah.
        </p>
      </div>

      <div class="hajj-days-grid">
        <div 
          v-for="(day, idx) in content.hajj.days" 
          :key="idx"
          class="day-card"
        >
          <div class="day-header">
            <span class="day-date">{{ day.date }}</span>
            <h3 class="day-title">{{ day.title }}</h3>
          </div>
          <p class="day-description">{{ day.description }}</p>
          <div class="day-reminder" v-if="day.reminder">
            <i class="fas fa-bell"></i>
            <span>{{ day.reminder }}</span>
          </div>
          <div class="day-image" v-if="day.image">
            <img :src="day.image" :alt="day.title" class="day-img">
          </div>
        </div>
      </div>

      <!-- Farewell Tawaf -->
      <div class="farewell-card">
        <div class="farewell-icon">🕋</div>
        <h4>{{ content.hajj.farewell.title }}</h4>
        <p>{{ content.hajj.farewell.description }}</p>
        <cite>Sahih Muslim 1327</cite>
      </div>
    </section>

    <!-- Do's & Don'ts Section -->
    <section class="section-premium alt-bg" id="dosdonts">
      <div class="section-header">
        <span class="section-eyebrow">Chapter IV</span>
        <h2 class="section-title">Rules & Etiquette in Ihram</h2>
        <p class="section-description">
          What honors the sacred state — and what to avoid while in devotion.
        </p>
      </div>

      <div class="rules-grid">
        <!-- Do's -->
        <div class="rules-card positive">
          <div class="rules-header">
            <i class="fas fa-check-circle"></i>
            <span>{{ content.dosAndDonts.dos.title }}</span>
          </div>
          <ul class="rules-list">
            <li v-for="(item, idx) in content.dosAndDonts.dos.items" :key="idx">
              <i class="fas fa-check"></i>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- Don'ts -->
        <div class="rules-card negative">
          <div class="rules-header">
            <i class="fas fa-times-circle"></i>
            <span>{{ content.dosAndDonts.donts.title }}</span>
          </div>
          <ul class="rules-list">
            <li v-for="(item, idx) in content.dosAndDonts.donts.items" :key="idx">
              <i class="fas fa-times"></i>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Resources & FAQ Section -->
    <section class="section-premium" id="resources">
      <div class="section-header">
        <span class="section-eyebrow">Chapter V</span>
        <h2 class="section-title">Resources & Guidance</h2>
        <p class="section-description">
          Trusted tools, scholarly references, and answers to your questions.
        </p>
      </div>

      <div class="resources-grid">
        <!-- Apps -->
        <div class="resource-card">
          <h4>{{ content.resources.apps.title }}</h4>
          <div class="app-list">
            <div 
              v-for="(app, idx) in content.resources.apps.items" 
              :key="idx"
              class="app-item"
            >
              <div class="app-icon">📱</div>
              <div class="app-info">
                <span class="app-name">{{ app.name }}</span>
                <span class="app-desc">{{ app.description }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- PDFs -->
        <div class="resource-card">
          <h4>{{ content.resources.pdfs.title }}</h4>
          <div class="pdf-list">
            <a 
              v-for="(pdf, idx) in content.resources.pdfs.items" 
              :key="idx"
              :href="pdf.link"
              target="_blank"
              class="pdf-item"
            >
              <i class="fas fa-file-pdf"></i>
              <span>{{ pdf.name }}</span>
              <i class="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- FAQ Accordion -->
      <div class="faq-container">
        <h4>{{ content.faq.title }}</h4>
        <div 
          v-for="(faq, idx) in content.faq.items" 
          :key="idx"
          class="faq-item"
          :class="{ open: openFaqIndex === idx }"
        >
          <button class="faq-question" @click="toggleFaq(idx)">
            <span>{{ faq.question }}</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="faq-answer">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Closing Dua -->
    <section class="closing-dua">
      <div class="dua-content">
        <div class="dua-arabic">رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ</div>
        <p class="dua-english">"Our Lord, accept [this] from us. Indeed, You are the Hearing, the Knowing."</p>
        <span class="dua-reference">Surah Al-Baqarah 2:127</span>
        <p class="closing-message">{{ content.closingMessage }}</p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="premium-footer">
      <div class="footer-content">
        <div class="footer-brand">
          <span class="footer-icon">🕋</span>
          <span>The Sacred Journey</span>
        </div>
        
        <div class="footer-disclaimer">
          <p><strong>Disclaimer:</strong> {{ content.disclaimer.text }}</p>
        </div>
        
        <div class="footer-attribution">
          <p>{{ content.attribution }}</p>
        </div>
        
        <div class="footer-copy">
          <span>© 1446 AH / 2025 CE — Islamic Connect</span>
          <span>Made with reverence in Nottingham, England 🇬🇧</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import content from '../../data/hajj-umrah-content.json';

// --- State ---
const scrollProgress = ref(0);
const isScrolled = ref(false);
const activeSection = ref('basics');
const searchQuery = ref('');
const showSearchDropdown = ref(false);
const openFaqIndex = ref(null);

// --- Search Data Index ---
const searchIndex = computed(() => {
  const items = [];
  
  // Basics
  content.basics.cards.forEach(card => {
    items.push({
      category: 'Basics',
      title: card.title,
      section: 'basics'
    });
  });
  
  // Umrah Steps
  content.umrah.steps.forEach((step, idx) => {
    items.push({
      category: 'Umrah',
      title: `Step ${idx + 1}: ${step.title}`,
      section: 'umrah'
    });
  });
  
  // Hajj Days
  content.hajj.days.forEach(day => {
    items.push({
      category: 'Hajj',
      title: day.title,
      section: 'hajj'
    });
  });
  
  // Do's & Don'ts
  content.dosAndDonts.dos.items.forEach(item => {
    items.push({
      category: 'Rules',
      title: `Do: ${item.substring(0, 60)}...`,
      section: 'dosdonts'
    });
  });
  
  // FAQ
  content.faq.items.forEach(faq => {
    items.push({
      category: 'FAQ',
      title: faq.question,
      section: 'resources'
    });
  });
  
  return items;
});

const filteredSearchResults = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return [];
  
  return searchIndex.value.filter(item => 
    item.title.toLowerCase().includes(query) || 
    item.category.toLowerCase().includes(query)
  ).slice(0, 8);
});

// --- Methods ---
const handleScroll = () => {
  const doc = document.documentElement;
  const total = doc.scrollHeight - doc.clientHeight;
  scrollProgress.value = (doc.scrollTop / total) * 100;
  isScrolled.value = doc.scrollTop > 100;
  
  // Update active section
  const sections = ['basics', 'umrah', 'hajj', 'dosdonts', 'resources'];
  for (const section of sections) {
    const el = document.getElementById(section);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        activeSection.value = section;
        break;
      }
    }
  }
};

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    activeSection.value = id;
  }
};

const performSearch = () => {
  if (filteredSearchResults.value.length > 0) {
    showSearchDropdown.value = true;
  }
};

const navigateToResult = (result) => {
  scrollToSection(result.section);
  searchQuery.value = '';
  showSearchDropdown.value = false;
};

const hideSearchDropdown = () => {
  setTimeout(() => {
    showSearchDropdown.value = false;
  }, 200);
};

const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index;
};

// --- Lifecycle ---
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════
   PREMIUM COLOR PALETTE & VARIABLES
   ═══════════════════════════════════════════════════════ */
.hajj-guide-premium {
  /* Deep, luxurious base */
  --bg-primary: #0f0d0a;
  --bg-secondary: #1a1712;
  --bg-tertiary: #25211a;
  --bg-card: #1e1a14;
  --bg-card-hover: #2a251d;
  
  /* Rich gold accents */
  --gold-primary: #c9a961;
  --gold-light: #e8d4a8;
  --gold-glow: rgba(201, 169, 97, 0.15);
  --gold-border: rgba(201, 169, 97, 0.3);
  
  /* Elegant greens */
  --green-primary: #1b4d3e;
  --green-light: #2d7a64;
  --green-glow: rgba(45, 122, 100, 0.1);
  
  /* Sophisticated neutrals */
  --text-primary: #f8f5f0;
  --text-secondary: #d4c9b8;
  --text-muted: #8a7f6e;
  --text-inverse: #0f0d0a;
  
  /* Premium borders & shadows */
  --border-subtle: rgba(212, 201, 184, 0.1);
  --border-accent: rgba(201, 169, 97, 0.4);
  --shadow-soft: 0 4px 24px rgba(0, 0, 0, 0.3);
  --shadow-elevated: 0 8px 40px rgba(0, 0, 0, 0.4);
  --shadow-glow: 0 0 40px rgba(201, 169, 97, 0.1);
  
  /* Typography */
  --font-serif: 'Cormorant Garamond', 'Georgia', serif;
  --font-sans: 'Inter', 'DM Sans', system-ui, sans-serif;
  --font-arabic: 'Noto Nastaliq Urdu', serif;
  
  /* Transitions */
  --transition-smooth: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-spring: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Spacing */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-full: 9999px;
  
  --container-max: 1200px;
  --section-padding: clamp(4rem, 8vw, 6rem);
  
  font-family: var(--font-sans);
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.7;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.hajj-guide-premium *,
.hajj-guide-premium *::before,
.hajj-guide-premium *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ═══════════════════════════════════════════════════════
   PROGRESS BAR
   ═══════════════════════════════════════════════════════ */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.05);
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--green-primary), var(--gold-primary));
  transition: width 0.15s ease-out;
  box-shadow: 0 0 20px var(--gold-glow);
}

/* ═══════════════════════════════════════════════════════
   PREMIUM HEADER
   ═══════════════════════════════════════════════════════ */
.premium-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  padding: 1rem 2rem;
  transition: var(--transition-smooth);
  background: transparent;
}

.premium-header.scrolled {
  background: rgba(15, 13, 10, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-subtle);
  padding: 0.75rem 2rem;
  box-shadow: var(--shadow-soft);
}

.header-content {
  max-width: var(--container-max);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.brand-icon {
  font-size: 1.5rem;
}

.brand-name {
  background: linear-gradient(135deg, var(--gold-light), var(--gold-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.premium-nav {
  display: flex;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.25rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-subtle);
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: transparent;
  border: none;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition-smooth);
  white-space: nowrap;
}

.nav-tab:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.05);
}

.nav-tab.active {
  background: linear-gradient(135deg, var(--green-primary), var(--green-light));
  color: var(--text-primary);
  box-shadow: 0 4px 20px rgba(45, 122, 100, 0.3);
}

.nav-tab i {
  font-size: 0.9rem;
}

/* ═══════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════ */
.hero-premium {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: clamp(4rem, 8vw, 6rem) 2rem;
  position: relative;
  overflow: hidden;
  background: radial-gradient(ellipse at top, var(--bg-secondary) 0%, var(--bg-primary) 70%);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 30% 20%, var(--gold-glow) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, var(--green-glow) 0%, transparent 50%);
  pointer-events: none;
}

.hero-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: 
    repeating-linear-gradient(45deg, var(--gold-primary) 0, var(--gold-primary) 1px, transparent 0, transparent 50%),
    repeating-linear-gradient(-45deg, var(--gold-primary) 0, var(--gold-primary) 1px, transparent 0, transparent 50%);
  background-size: 40px 40px;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  animation: fadeInUp 0.8s ease-out;
}

.hero-bismillah {
  font-family: var(--font-arabic);
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--gold-primary);
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
  opacity: 0.9;
}

.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
}

.hero-title .hero-accent {
  color: var(--gold-primary);
  font-style: normal;
}

.hero-title em {
  font-style: italic;
  color: var(--gold-light);
  font-weight: 400;
}

.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 3rem;
  font-weight: 300;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.btn-primary,
.btn-secondary {
  padding: 1rem 2rem;
  border-radius: var(--radius-full);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-smooth);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, var(--gold-primary), var(--gold-light));
  color: var(--text-inverse);
  box-shadow: 0 4px 24px rgba(201, 169, 97, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(201, 169, 97, 0.5);
}

.btn-primary .btn-arrow {
  transition: transform 0.3s ease;
}

.btn-primary:hover .btn-arrow {
  transform: translateX(4px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--gold-border);
  transform: translateY(-2px);
}

.hero-meta {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-muted);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  animation: fadeIn 1s 0.5s ease forwards;
}

.scroll-mouse {
  width: 24px;
  height: 40px;
  border: 2px solid var(--text-muted);
  border-radius: 12px;
  position: relative;
  animation: scrollBounce 2s infinite;
}

.scroll-mouse::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 8px;
  background: var(--gold-primary);
  border-radius: 2px;
  animation: scrollWheel 2s infinite;
}

/* ═══════════════════════════════════════════════════════
   SEARCH SECTION
   ═══════════════════════════════════════════════════════ */
.search-premium {
  padding: 2rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-subtle);
  position: sticky;
  top: 70px;
  z-index: 100;
}

.search-container {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 0.5rem;
  transition: var(--transition-smooth);
}

.search-input-wrapper:focus-within {
  border-color: var(--gold-border);
  box-shadow: 0 0 0 3px var(--gold-glow);
}

.search-icon {
  padding: 0.75rem 1rem;
  color: var(--text-muted);
  font-size: 1rem;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 0.75rem 0;
  font-size: 1rem;
  color: var(--text-primary);
  font-family: var(--font-sans);
  outline: none;
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-btn {
  padding: 0.75rem 1.5rem;
  background: var(--green-primary);
  color: var(--text-primary);
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.search-btn:hover {
  background: var(--green-light);
}

.search-results {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-elevated);
  overflow: hidden;
  z-index: 50;
  max-height: 400px;
  overflow-y: auto;
}

.search-result-item {
  padding: 1rem 1.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: background 0.2s ease;
}

.search-result-item:hover {
  background: var(--bg-card-hover);
}

.result-category {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--gold-primary);
}

.result-title {
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.4;
}

/* ═══════════════════════════════════════════════════════
   SECTIONS
   ═══════════════════════════════════════════════════════ */
.section-premium {
  padding: var(--section-padding) 2rem;
  max-width: var(--container-max);
  margin: 0 auto;
}

.section-premium.alt-bg {
  background: var(--bg-secondary);
}

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
}

.section-eyebrow {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--gold-primary);
  margin-bottom: 1rem;
  padding: 0.4rem 1rem;
  background: rgba(201, 169, 97, 0.1);
  border-radius: var(--radius-full);
}

.section-title {
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: 1rem;
}

.section-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  font-weight: 300;
}

/* ═══════════════════════════════════════════════════════
   CARDS GRID
   ═══════════════════════════════════════════════════════ */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.premium-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 2rem;
  transition: var(--transition-smooth);
  position: relative;
  overflow: hidden;
}

.premium-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--green-primary), var(--gold-primary));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.premium-card:hover {
  transform: translateY(-4px);
  border-color: var(--gold-border);
  box-shadow: var(--shadow-elevated);
}

.premium-card:hover::before {
  opacity: 1;
}

.card-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--green-primary), var(--green-light));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: var(--text-primary);
}

.card-title {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.3;
}

.card-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.card-note {
  padding: 1rem;
  background: rgba(201, 169, 97, 0.08);
  border-left: 3px solid var(--gold-primary);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-size: 0.85rem;
}

.note-label {
  font-weight: 600;
  color: var(--gold-light);
  display: block;
  margin-bottom: 0.25rem;
}

.note-text {
  color: var(--text-secondary);
}

/* ═══════════════════════════════════════════════════════
   HAJJ TYPES
   ═══════════════════════════════════════════════════════ */
.hajj-types-container {
  margin: 4rem 0;
}

.hajj-types-card {
  background: linear-gradient(135deg, var(--bg-card), var(--bg-tertiary));
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
}

.hajj-types-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, var(--gold-glow) 0%, transparent 70%);
  pointer-events: none;
}

.types-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  position: relative;
}

.types-header h3 {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.types-badge {
  padding: 0.4rem 1rem;
  background: var(--green-primary);
  color: var(--text-primary);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 500;
}

.types-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.types-progress {
  margin-bottom: 1.5rem;
}

.progress-bar-mini {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill-mini {
  height: 100%;
  background: linear-gradient(90deg, var(--green-primary), var(--gold-primary));
  border-radius: var(--radius-full);
  transition: width 1s ease-out;
}

.progress-label {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.types-note {
  font-size: 0.9rem;
  color: var(--gold-light);
  font-style: italic;
}

/* ═══════════════════════════════════════════════════════
   IMAGE SHOWCASE
   ═══════════════════════════════════════════════════════ */
.image-showcase {
  margin: 4rem 0;
}

.image-wrapper {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-subtle);
}

.showcase-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.image-wrapper:hover .showcase-image {
  transform: scale(1.02);
}

.image-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem 1.5rem;
  background: linear-gradient(to top, rgba(15, 13, 10, 0.9), transparent);
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* ═══════════════════════════════════════════════════════
   AUDIO PLAYER
   ═══════════════════════════════════════════════════════ */
.audio-player {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 2rem;
  margin-top: 2rem;
}

.player-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: var(--gold-primary);
  font-weight: 500;
}

.player-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.audio-control {
  width: 100%;
  border-radius: var(--radius-full);
  background: var(--bg-tertiary);
}

/* ═══════════════════════════════════════════════════════
   TIMELINE STEPS
   ═══════════════════════════════════════════════════════ */
.steps-timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  padding: 2rem 0;
  position: relative;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.marker-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--gold-primary), var(--gold-light));
  color: var(--text-inverse);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 1.1rem;
  z-index: 2;
}

.marker-line {
  position: absolute;
  top: 48px;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  background: var(--border-subtle);
}

.timeline-content {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  transition: var(--transition-smooth);
}

.timeline-content:hover {
  border-color: var(--gold-border);
  box-shadow: var(--shadow-soft);
}

.step-title {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.step-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.step-tip {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(201, 169, 97, 0.08);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.step-tip i {
  color: var(--gold-primary);
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.step-video-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--gold-light);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: var(--transition-smooth);
}

.step-video-link:hover {
  color: var(--gold-primary);
}

.conclusion-card {
  background: linear-gradient(135deg, var(--green-primary), var(--green-light));
  border-radius: var(--radius-lg);
  padding: 2rem;
  margin-top: 3rem;
  text-align: center;
}

.conclusion-card h4 {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.conclusion-card p {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  font-size: 1rem;
}

/* ═══════════════════════════════════════════════════════
   HAJJ DAYS GRID
   ═══════════════════════════════════════════════════════ */
.hajj-days-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.day-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 2rem;
  transition: var(--transition-smooth);
}

.day-card:hover {
  border-color: var(--gold-border);
  transform: translateX(4px);
  box-shadow: var(--shadow-soft);
}

.day-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.day-date {
  padding: 0.4rem 1rem;
  background: rgba(201, 169, 97, 0.15);
  color: var(--gold-light);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.day-title {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.day-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.day-reminder {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(45, 122, 100, 0.1);
  border-left: 3px solid var(--green-primary);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.day-reminder i {
  color: var(--green-light);
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.day-image {
  margin-top: 1rem;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.day-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.day-image:hover .day-img {
  transform: scale(1.05);
}

.farewell-card {
  background: linear-gradient(135deg, var(--bg-tertiary), var(--bg-card));
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
}

.farewell-icon {
  font-size: 3rem;
  color: var(--gold-primary);
}

.farewell-card h4 {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
}

.farewell-card p {
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 600px;
}

.farewell-card cite {
  font-size: 0.85rem;
  color: var(--gold-light);
  font-style: normal;
}

/* ═══════════════════════════════════════════════════════
   RULES GRID
   ═══════════════════════════════════════════════════════ */
.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.rules-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.rules-header {
  padding: 1.25rem 1.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.rules-card.positive .rules-header {
  background: var(--green-primary);
  color: var(--text-primary);
}

.rules-card.negative .rules-header {
  background: #8b2e2e;
  color: var(--text-primary);
}

.rules-header i {
  font-size: 1.1rem;
}

.rules-list {
  list-style: none;
  padding: 1.5rem;
}

.rules-list li {
  display: flex;
  gap: 0.75rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--border-subtle);
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.rules-list li:last-child {
  border-bottom: none;
}

.rules-list li i {
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.rules-card.positive .rules-list li i {
  color: var(--green-light);
}

.rules-card.negative .rules-list li i {
  color: #c96565;
}

/* ═══════════════════════════════════════════════════════
   RESOURCES GRID
   ═══════════════════════════════════════════════════════ */
.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.resource-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 2rem;
}

.resource-card h4 {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.app-list,
.pdf-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.app-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-md);
  transition: var(--transition-smooth);
}

.app-item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.app-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.app-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.app-name {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.app-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.pdf-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--text-secondary);
  transition: var(--transition-smooth);
  font-size: 0.9rem;
}

.pdf-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-primary);
}

.pdf-item i:first-child {
  color: #c96565;
}

.pdf-item i:last-child {
  margin-left: auto;
  font-size: 0.8rem;
  opacity: 0.6;
}

/* ═══════════════════════════════════════════════════════
   FAQ ACCORDION
   ═══════════════════════════════════════════════════════ */
.faq-container {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 2rem;
}

.faq-container h4 {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.faq-item {
  border-bottom: 1px solid var(--border-subtle);
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.25rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  transition: color 0.2s ease;
}

.faq-question:hover {
  color: var(--gold-light);
}

.faq-question i {
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.faq-item.open .faq-question i {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.4s ease;
}

.faq-item.open .faq-answer {
  max-height: 500px;
  padding-bottom: 1.25rem;
}

.faq-answer p {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* ═══════════════════════════════════════════════════════
   CLOSING DUA
   ═══════════════════════════════════════════════════════ */
.closing-dua {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  text-align: center;
}

.dua-content {
  max-width: 700px;
  margin: 0 auto;
}

.dua-arabic {
  font-family: var(--font-arabic);
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  color: var(--gold-primary);
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.dua-english {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-style: italic;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.dua-reference {
  display: block;
  font-size: 0.85rem;
  color: var(--gold-light);
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
}

.closing-message {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* ═══════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════ */
.premium-footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-subtle);
  padding: 4rem 2rem 2rem;
}

.footer-content {
  max-width: var(--container-max);
  margin: 0 auto;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2rem;
}

.footer-brand .footer-icon {
  font-size: 1.5rem;
}

.footer-disclaimer,
.footer-attribution {
  margin-bottom: 1.5rem;
}

.footer-disclaimer p,
.footer-attribution p {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.7;
}

.footer-disclaimer strong {
  color: var(--text-secondary);
}

.footer-copy {
  padding-top: 2rem;
  border-top: 1px solid var(--border-subtle);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* ═══════════════════════════════════════════════════════
   ANIMATIONS
   ═══════════════════════════════════════════════════════ */
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

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

@keyframes scrollWheel {
  0% { opacity: 1; transform: translateX(-50%) translateY(0); }
  100% { opacity: 0; transform: translateX(-50%) translateY(12px); }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* ═══════════════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════════════ */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .premium-nav {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-tab {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .hero-meta {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .timeline-item {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding-left: 1rem;
  }
  
  .timeline-marker {
    flex-direction: row;
    gap: 1rem;
  }
  
  .marker-line {
    top: 24px;
    left: 23px;
    right: auto;
    bottom: auto;
    height: calc(100% + 2rem);
    width: 2px;
  }
  
  .rules-grid,
  .resources-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-copy {
    flex-direction: column;
    text-align: center;
  }
}

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 100px;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-primary);
}

::-webkit-scrollbar-thumb {
  background: var(--border-subtle);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--gold-border);
}
</style>