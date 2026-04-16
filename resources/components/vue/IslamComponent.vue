<template>
  <div class="discover-islam">
    <!-- Hero Section with Search -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container hero-container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <div class="hero-badge">
              <i class="fas fa-check-circle me-2"></i> {{ contentData.hero.badge }}
            </div>
            <h1 class="hero-title">
              <span class="title-icon">🕌</span> {{ contentData.hero.title }}
            </h1>
            <p class="hero-subtitle">{{ contentData.hero.subtitle }}</p>

            <!-- Search Bar -->
            <div class="search-wrapper">
              <div class="search-input-group">
                <i class="fas fa-search search-icon"></i>
                <input
                  type="text"
                  class="search-input"
                  placeholder="Search Islam, pillars, prophets, prayers..."
                  v-model="searchQuery"
                  @input="filterContent"
                  @keyup.enter="filterContent"
                />
                <button class="search-btn" @click="filterContent">
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>

              <!-- Search Results Dropdown -->
              <div v-if="searchResults.length > 0 && searchQuery" class="search-results">
                <div
                  v-for="result in searchResults.slice(0, 6)"
                  :key="result.id"
                  class="search-result-item"
                  @click="scrollToSection(result.sectionId)"
                >
                  <i :class="result.icon + ' result-icon'"></i>
                  <div class="result-content">
                    <div class="result-title">{{ result.title }}</div>
                    <div class="result-excerpt">{{ result.excerpt }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hero Wave -->
      <div class="hero-wave-bottom">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="#F0F8F4" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,53.3C1120,53,1280,75,1360,85.3L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>

    <div class="container main-container">
      <!-- Disclaimer Alert -->
      <div class="alert alert-custom-warning mb-5">
        <i class="fas fa-exclamation-triangle me-2"></i>
        <strong>Disclaimer:</strong> {{ contentData.disclaimer.text }}
      </div>

      <!-- Section 1: What is Islam? -->
      <section class="content-section" id="basics">
        <div class="section-header">
          <div class="section-icon">
            <i :class="contentData.basics.icon"></i>
          </div>
          <h2>{{ contentData.basics.title }}</h2>
          <p class="section-subtitle">{{ contentData.basics.description }}</p>
        </div>

        <div class="row g-4">
          <!-- Six Pillars of Faith -->
          <div class="col-md-6">
            <div class="info-card">
              <div class="card-icon-header">
                <i class="fas fa-star-of-david"></i>
                <h3>{{ contentData.basics.coreBeliefs.title }}</h3>
              </div>
              <ul class="icon-list">
                <li v-for="item in contentData.basics.coreBeliefs.items" :key="item">
                  <i class="fas fa-check-circle"></i> {{ item }}
                </li>
              </ul>
              <div class="reference-box mt-3">
                <i class="fas fa-hadith"></i>
                <span>Reference: Sahih Muslim 8 - Hadith of Jibril</span>
              </div>
            </div>
          </div>

          <!-- Five Pillars of Islam -->
          <div class="col-md-6">
            <div class="info-card">
              <div class="card-icon-header">
                <i class="fas fa-praying-hands"></i>
                <h3>{{ contentData.basics.corePractices.title }}</h3>
              </div>
              <ul class="icon-list">
                <li v-for="item in contentData.basics.corePractices.items" :key="item">
                  <i class="fas fa-check-circle"></i> {{ item }}
                </li>
              </ul>
              <div class="reference-box mt-3">
                <i class="fas fa-hadith"></i>
                <span>Reference: Sahih Bukhari 8 - Pillars of Islam</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Image -->
        <div class="image-card mt-4">
          <img
            :src="basicsImage"
            :alt="contentData.basics.title"
            class="img-fluid"
          />
          <div class="image-caption">Image: Sacred Islamic architecture | Source: Pexels</div>
        </div>

        <!-- Video -->
        <div class="video-card mt-4">
          <iframe
            width="100%"
            height="420"
            :src="basicsVideoUrl"
            title="Introduction to Islam"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <div class="video-caption">Video: Introduction to Islam | Source: Scholarly verified content</div>
        </div>
      </section>

      <!-- Section 2: Shahada -->
      <section class="content-section" id="shahada">
        <div class="section-header">
          <div class="section-icon">
            <i class="fas fa-certificate"></i>
          </div>
          <h2>{{ contentData.shahada.title }}</h2>
        </div>

        <div class="shahada-card">
          <div class="shahada-arabic">{{ contentData.shahada.arabic }}</div>
          <div class="shahada-transliteration">{{ contentData.shahada.transliteration }}</div>
          <div class="shahada-translation">{{ contentData.shahada.translation }}</div>
          <p class="mt-3">{{ contentData.shahada.explanation }}</p>
          <div class="reference-box">
            <i class="fas fa-hadith"></i>
            <span>{{ contentData.shahada.reference }}</span>
          </div>
        </div>

        <div class="image-card mt-4">
          <img :src="shahadaImage" alt="Prayer" class="img-fluid" />
          <div class="image-caption">Image: A moment of devotion | Source: Pexels</div>
        </div>
      </section>

      <!-- Section 3: Allah -->
      <section class="content-section" id="allah">
        <div class="section-header">
          <div class="section-icon">
            <i class="fas fa-allah"></i>
          </div>
          <h2>{{ contentData.allah.title }}</h2>
        </div>

        <div class="row g-4">
          <div class="col-md-7">
            <div class="info-card">
              <p>{{ contentData.allah.description }}</p>
              <h4 class="mt-3">Beautiful Names of Allah</h4>
              <div class="names-grid">
                <span v-for="name in contentData.allah.attributes" :key="name" class="name-badge">
                  {{ name }}
                </span>
              </div>
              <div class="quran-box mt-3">
                <i class="fas fa-quran"></i>
                <span>{{ contentData.allah.quranReference }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-5">
            <div class="image-card">
              <img :src="allahImage" alt="Allah" class="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      <!-- Section 4: Prophet Muhammad -->
      <section class="content-section" id="prophet">
        <div class="section-header">
          <div class="section-icon">
            <i class="fas fa-muhammad"></i>
          </div>
          <h2>{{ contentData.prophet.title }}</h2>
        </div>

        <div class="row g-4">
          <div class="col-md-6">
            <div class="info-card">
              <p>{{ contentData.prophet.description }}</p>
              <h4>Key Teachings</h4>
              <ul class="icon-list">
                <li v-for="teaching in contentData.prophet.keyTeachings" :key="teaching">
                  <i class="fas fa-star"></i> {{ teaching }}
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-6">
            <div class="image-card">
              <img :src="prophetImage" alt="Medina Mosque" class="img-fluid" />
            </div>
          </div>
        </div>

        <div class="reference-box mt-3">
          <i class="fas fa-quran"></i>
          <span>{{ contentData.prophet.quranReference }}</span>
        </div>
        <div class="reference-box mt-2">
          <i class="fas fa-hadith"></i>
          <span>{{ contentData.prophet.hadithReference }}</span>
        </div>
      </section>

      <!-- Section 5: Quran -->
      <section class="content-section" id="quran">
        <div class="section-header">
          <div class="section-icon">
            <i class="fas fa-quran"></i>
          </div>
          <h2>{{ contentData.quran.title }}</h2>
        </div>

        <div class="row g-4">
          <div class="col-md-6">
            <div class="info-card">
              <p>{{ contentData.quran.description }}</p>
              <h4>Facts about the Quran</h4>
              <ul class="icon-list">
                <li v-for="fact in contentData.quran.facts" :key="fact">
                  <i class="fas fa-book-open"></i> {{ fact }}
                </li>
              </ul>
              <div class="quran-box mt-3">
                <i class="fas fa-quran"></i>
                <span>{{ contentData.quran.reference }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="image-card">
              <img :src="quranImage" alt="Quran" class="img-fluid" />
            </div>
            <div class="video-card mt-3">
              <iframe
                width="100%"
                height="200"
                :src="quranVideoUrl"
                title="Quran Recitation"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 6: Salah -->
      <section class="content-section" id="salah">
        <div class="section-header">
          <div class="section-icon">
            <i class="fas fa-pray"></i>
          </div>
          <h2>{{ contentData.salah.title }}</h2>
        </div>

        <div class="row g-4">
          <div class="col-md-6">
            <div class="info-card">
              <p>{{ contentData.salah.description }}</p>
              <div class="table-responsive">
                <table class="table table-custom">
                  <thead>
                    <tr>
                      <th>Prayer</th>
                      <th>Time</th>
                      <th>Rak'ahs</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="prayer in contentData.salah.prayers" :key="prayer.name">
                      <td><strong>{{ prayer.name }}</strong></td>
                      <td>{{ prayer.time }}</td>
                      <td>{{ prayer.rakahs }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="quran-box mt-3">
                <i class="fas fa-quran"></i>
                <span>{{ contentData.salah.reference }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="image-card">
              <img :src="salahImage" alt="Praying Muslim" class="img-fluid" />
            </div>
            <div class="video-card mt-3">
              <iframe
                width="100%"
                height="200"
                :src="salahVideoUrl"
                title="How to Pray"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 7: Zakat -->
      <section class="content-section" id="zakat">
        <div class="section-header">
          <div class="section-icon">
            <i class="fas fa-hand-holding-heart"></i>
          </div>
          <h2>{{ contentData.zakat.title }}</h2>
        </div>

        <div class="row g-4">
          <div class="col-md-6">
            <div class="info-card">
              <p>{{ contentData.zakat.description }}</p>
              <h4>Eligible Recipients</h4>
              <ul class="icon-list">
                <li v-for="recipient in contentData.zakat.eligibleRecipients" :key="recipient">
                  <i class="fas fa-users"></i> {{ recipient }}
                </li>
              </ul>
              <div class="quran-box mt-3">
                <i class="fas fa-quran"></i>
                <span>{{ contentData.zakat.reference }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="image-card">
              <img :src="zakatImage" alt="Charity" class="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      <!-- Section 8: Sawm -->
      <section class="content-section" id="sawm">
        <div class="section-header">
          <div class="section-icon">
            <i class="fas fa-moon"></i>
          </div>
          <h2>{{ contentData.sawm.title }}</h2>
        </div>

        <div class="row g-4">
          <div class="col-md-6">
            <div class="info-card">
              <p>{{ contentData.sawm.description }}</p>
              <h4>Benefits of Fasting</h4>
              <ul class="icon-list">
                <li v-for="benefit in contentData.sawm.benefits" :key="benefit">
                  <i class="fas fa-check-circle"></i> {{ benefit }}
                </li>
              </ul>
              <div class="quran-box mt-3">
                <i class="fas fa-quran"></i>
                <span>{{ contentData.sawm.reference }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="image-card">
              <img :src="sawmImage" alt="Iftar" class="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      <!-- Section 9: Hajj -->
      <section class="content-section" id="hajj">
        <div class="section-header">
          <div class="section-icon">
            <i class="fas fa-mosque"></i>
          </div>
          <h2>{{ contentData.hajj.title }}</h2>
        </div>

        <div class="row g-4">
          <div class="col-md-6">
            <div class="info-card">
              <p>{{ contentData.hajj.description }}</p>
              <h4>Key Rituals</h4>
              <ul class="icon-list">
                <li v-for="ritual in contentData.hajj.keyRituals" :key="ritual">
                  <i class="fas fa-shoe-prints"></i> {{ ritual }}
                </li>
              </ul>
              <div class="quran-box mt-3">
                <i class="fas fa-quran"></i>
                <span>{{ contentData.hajj.reference }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="image-card">
              <img :src="hajjImage" alt="Kaaba" class="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      <!-- Section 10: Afterlife -->
      <section class="content-section" id="afterlife">
        <div class="section-header">
          <div class="section-icon">
            <i class="fas fa-heaven"></i>
          </div>
          <h2>{{ contentData.afterlife.title }}</h2>
        </div>

        <div class="row g-4">
          <div class="col-md-6">
            <div class="info-card">
              <p>{{ contentData.afterlife.description }}</p>
              <h4>Stages of the Afterlife</h4>
              <ul class="icon-list">
                <li v-for="concept in contentData.afterlife.concepts" :key="concept">
                  <i class="fas fa-hourglass-half"></i> {{ concept }}
                </li>
              </ul>
              <div class="quran-box mt-3">
                <i class="fas fa-quran"></i>
                <span>{{ contentData.afterlife.reference }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="image-card">
              <img :src="afterlifeImage" alt="Sunset" class="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      <!-- Section 11: Do's & Don'ts -->
      <section class="content-section" id="dosdonts">
        <div class="section-header">
          <div class="section-icon">
            <i class="fas fa-clipboard-list"></i>
          </div>
          <h2>Do's & Don'ts in Islam</h2>
        </div>

        <div class="row g-4">
          <div class="col-md-6">
            <div class="dos-card">
              <div class="card-header-dos">
                <i class="fas fa-check-circle me-2"></i> Recommended (Mustahabb)
              </div>
              <div class="card-body-dos">
                <ul class="list-icon">
                  <li v-for="item in contentData.dosAndDonts.dos" :key="item">
                    <i class="fas fa-check-circle text-success-custom me-2"></i> {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="donts-card">
              <div class="card-header-donts">
                <i class="fas fa-times-circle me-2"></i> Prohibited (Haram)
              </div>
              <div class="card-body-donts">
                <ul class="list-icon">
                  <li v-for="item in contentData.dosAndDonts.donts" :key="item">
                    <i class="fas fa-times-circle text-danger me-2"></i> {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 12: FAQ -->
      <section class="content-section" id="faq">
        <div class="section-header">
          <div class="section-icon">
            <i class="fas fa-question-circle"></i>
          </div>
          <h2>Frequently Asked Questions</h2>
        </div>

        <div class="faq-grid">
          <div v-for="(faq, index) in contentData.faqs" :key="index" class="faq-item">
            <button class="faq-question" @click="toggleFaq(index)">
              <i :class="openFaq === index ? 'fas fa-minus-circle' : 'fas fa-plus-circle'"></i>
              {{ faq.question }}
            </button>
            <div class="faq-answer" :class="{ 'faq-answer-open': openFaq === index }">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </section>

      <!-- Section 13: Apps & Resources -->
      <section class="content-section" id="resources">
        <div class="section-header">
          <div class="section-icon">
            <i class="fas fa-mobile-alt"></i>
          </div>
          <h2>Apps & Learning Resources</h2>
        </div>

        <div class="row g-4">
          <div class="col-md-6">
            <div class="resources-card">
              <h4><i class="fas fa-mobile-alt me-2"></i> Recommended Apps</h4>
              <ul class="resource-list">
                <li v-for="app in contentData.appsAndResources.apps" :key="app.name">
                  <strong>{{ app.name }}</strong> – {{ app.description }}
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-6">
            <div class="resources-card">
              <h4><i class="fas fa-globe me-2"></i> Trusted Websites</h4>
              <ul class="resource-list">
                <li v-for="site in contentData.appsAndResources.websites" :key="site.name">
                  <a :href="site.url" target="_blank" class="resource-link">
                    <i class="fas fa-external-link-alt me-2"></i> {{ site.name }}
                  </a>
                </li>
              </ul>
              <h4 class="mt-3"><i class="fab fa-youtube me-2"></i> YouTube Channels</h4>
              <ul class="resource-list">
                <li v-for="channel in contentData.appsAndResources.youtubeChannels" :key="channel.name">
                  <a :href="channel.url" target="_blank" class="resource-link">
                    <i class="fab fa-youtube me-2"></i> {{ channel.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Closing Message -->
      <div class="closing-message">
        <i class="fas fa-praying-hands me-3 fa-2x"></i>
        <p class="mb-0 fs-5">{{ contentData.closingMessage }}</p>
      </div>

      <!-- Attribution -->
      <div class="attribution-box mt-4">
        <i class="fas fa-quote-left me-2"></i>
        <small>{{ contentData.attribution }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import contentData from './discover-islam-content.json';

export default {
  name: 'DiscoverIslam',
  data() {
    return {
      contentData: contentData,
      searchQuery: '',
      searchResults: [],
      openFaq: null,
      // Pexels Images
      basicsImage: '',
      shahadaImage: '',
      allahImage: '',
      prophetImage: '',
      quranImage: '',
      salahImage: '',
      zakatImage: '',
      sawmImage: '',
      hajjImage: '',
      afterlifeImage: '',
      // Video URLs
      basicsVideoUrl: 'https://www.youtube.com/embed/EP2gvL7w2iA',
      quranVideoUrl: 'https://www.youtube.com/embed/UHlVb6XjF_g',
      salahVideoUrl: 'https://www.youtube.com/embed/-K6HlXzJegk'
    };
  },
  mounted() {
    this.fetchPexelsImages();
  },
  methods: {
    async fetchPexelsImages() {
      const queries = [
        { key: 'basicsImage', query: 'islamic prayer mosque' },
        { key: 'shahadaImage', query: 'muslim praying qibla' },
        { key: 'allahImage', query: 'sky clouds light nature' },
        { key: 'prophetImage', query: 'medina mosque green dome' },
        { key: 'quranImage', query: 'quran book reading' },
        { key: 'salahImage', query: 'muslim praying mosque' },
        { key: 'zakatImage', query: 'charity helping hand' },
        { key: 'sawmImage', query: 'dates water iftar' },
        { key: 'hajjImage', query: 'kaaba mecca pilgrims' },
        { key: 'afterlifeImage', query: 'sunset sky clouds' }
      ];

      for (const q of queries) {
        try {
          const response = await fetch(`/api/pexels/search?query=${encodeURIComponent(q.query)}&per_page=1`, {
            headers: { 'Accept': 'application/json' }
          });
          const data = await response.json();
          if (data && data.url) this[q.key] = data.url;
        } catch (error) {
          console.error(`Failed to fetch ${q.key}:`, error);
          this[q.key] = 'https://images.pexels.com/photos/2715373/pexels-photo-2715373.jpeg';
        }
      }
    },

    toggleFaq(index) {
      this.openFaq = this.openFaq === index ? null : index;
    },

    filterContent() {
      if (!this.searchQuery.trim()) {
        this.searchResults = [];
        return;
      }

      const query = this.searchQuery.toLowerCase();
      const results = [];
      let id = 0;

      const sections = [
        { name: 'basics', title: 'What is Islam?', content: this.contentData.basics.description, icon: 'fas fa-star-of-life' },
        { name: 'shahada', title: 'Shahada', content: this.contentData.shahada.explanation, icon: 'fas fa-certificate' },
        { name: 'allah', title: 'Who is Allah?', content: this.contentData.allah.description, icon: 'fas fa-allah' },
        { name: 'prophet', title: 'Prophet Muhammad', content: this.contentData.prophet.description, icon: 'fas fa-muhammad' },
        { name: 'quran', title: 'The Holy Quran', content: this.contentData.quran.description, icon: 'fas fa-quran' },
        { name: 'salah', title: 'Salah', content: this.contentData.salah.description, icon: 'fas fa-pray' },
        { name: 'zakat', title: 'Zakat', content: this.contentData.zakat.description, icon: 'fas fa-hand-holding-heart' },
        { name: 'sawm', title: 'Sawm', content: this.contentData.sawm.description, icon: 'fas fa-moon' },
        { name: 'hajj', title: 'Hajj', content: this.contentData.hajj.description, icon: 'fas fa-mosque' }
      ];

      sections.forEach(section => {
        if (section.title.toLowerCase().includes(query) || section.content.toLowerCase().includes(query)) {
          results.push({
            id: id++,
            title: section.title,
            excerpt: section.content.substring(0, 80) + '...',
            sectionId: section.name,
            icon: section.icon
          });
        }
      });

      this.contentData.faqs.forEach((faq, idx) => {
        if (faq.question.toLowerCase().includes(query)) {
          results.push({
            id: id++,
            title: faq.question,
            excerpt: faq.answer.substring(0, 80) + '...',
            sectionId: 'faq',
            icon: 'fas fa-question'
          });
        }
      });

      this.searchResults = results;
    },

    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.searchQuery = '';
        this.searchResults = [];
      }
    }
  }
};
</script>

<style scoped>
/* ====================== LIGHT ISLAMIC GREEN THEME ====================== */
.discover-islam {
  background: #F0F8F4;
  min-height: 100vh;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.main-container {
  background: #ffffff;
  padding: 4rem 1.5rem;
  border-radius: 0 0 24px 24px;
  box-shadow: 0 10px 40px rgba(0, 168, 107, 0.08);
}

/* Hero */
.hero-section {
  background: linear-gradient(135deg, #00A86B 0%, #4CAF7A 100%);
  color: white;
  padding: 5.5rem 0 3.5rem;
  position: relative;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.15);
  z-index: 1;
}

.hero-container > * {
  position: relative;
  z-index: 2;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.25);
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 0.95rem;
  backdrop-filter: blur(8px);
  margin-bottom: 1rem;
}

.hero-title {
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1rem;
  color: #ffffff;
}

.title-icon {
  font-size: 3.5rem;
  margin-right: 12px;
  vertical-align: middle;
}

.hero-subtitle {
  font-size: 1.35rem;
  opacity: 0.95;
  max-width: 620px;
  margin: 0 auto 2.5rem;
}

/* Search Bar */
.search-wrapper {
  position: relative;
  max-width: 620px;
  margin: 0 auto;
}

.search-input-group {
  display: flex;
  background: white;
  border-radius: 9999px;
  box-shadow: 0 12px 35px rgba(0, 168, 107, 0.18);
  overflow: hidden;
  transition: all 0.3s ease;
}

.search-input-group:focus-within {
  box-shadow: 0 15px 45px rgba(0, 168, 107, 0.28);
  transform: translateY(-2px);
}

.search-icon {
  color: #00A86B;
  padding: 0 1.25rem;
  font-size: 1.35rem;
  display: flex;
  align-items: center;
}

.search-input {
  flex: 1;
  border: none;
  padding: 1.15rem 0.75rem;
  font-size: 1.1rem;
  outline: none;
  color: #1F3A2F;
}

.search-btn {
  background: #00A86B;
  color: white;
  border: none;
  width: 58px;
  font-size: 1.25rem;
  transition: background 0.3s ease;
}

.search-btn:hover {
  background: #006D4A;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
  margin-top: 12px;
  max-height: 380px;
  overflow-y: auto;
  z-index: 100;
}

.search-result-item {
  padding: 1rem 1.25rem;
  display: flex;
  gap: 14px;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid #f0f0f0;
}

.search-result-item:hover {
  background: #F0F8F4;
}

.result-icon {
  color: #00A86B;
  font-size: 1.4rem;
  margin-top: 4px;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-icon {
  width: 78px;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  background: linear-gradient(135deg, #00A86B, #4CAF7A);
  color: white;
  border-radius: 50%;
  margin: 0 auto 1.25rem;
  box-shadow: 0 8px 25px rgba(0, 168, 107, 0.25);
}

.section-header h2 {
  color: #1F3A2F;
  font-weight: 700;
  font-size: 2.35rem;
}

.section-subtitle {
  color: #4A665A;
  max-width: 700px;
  margin: 0 auto;
}

/* Cards */
.info-card,
.shahada-card,
.dos-card,
.donts-card,
.resources-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 168, 107, 0.09);
  border: 1px solid #E8F5EF;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-card:hover,
.shahada-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 45px rgba(0, 168, 107, 0.15);
}

.card-icon-header i {
  color: #00A86B;
  font-size: 2rem;
  margin-right: 12px;
}

.card-icon-header h3 {
  display: inline-block;
  margin: 0;
  color: #1F3A2F;
}

/* Badges & Boxes */
.name-badge,
.reference-box,
.quran-box {
  background: #E8F5EF;
  color: #006D4A;
  padding: 10px 16px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  margin: 4px;
}

.names-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* Table */
.table-custom {
  border-radius: 12px;
  overflow: hidden;
}

.table-custom th {
  background: #E8F5EF;
  color: #006D4A;
  font-weight: 600;
}

/* Do's & Don'ts */
.card-header-dos {
  background: #00A86B;
  color: white;
  border-radius: 16px 16px 0 0;
  padding: 1rem 1.5rem;
  font-weight: 600;
}

.card-header-donts {
  background: #E63946;
  color: white;
  border-radius: 16px 16px 0 0;
  padding: 1rem 1.5rem;
  font-weight: 600;
}

.card-body-dos,
.card-body-donts {
  padding: 1.5rem;
}

/* Alert */
.alert-custom-warning {
  background: #FFF4E5;
  border-color: #FFE0B3;
  color: #B35C00;
}

/* Image & Video */
.image-card img {
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  width: 100%;
}

.image-caption,
.video-caption {
  text-align: center;
  font-size: 0.9rem;
  color: #6B7E75;
  margin-top: 12px;
}

.video-card {
  background: white;
  border-radius: 18px;
  padding: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
}

/* FAQ */
.faq-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 168, 107, 0.08);
}

.faq-question {
  width: 100%;
  text-align: left;
  padding: 1.25rem 1.5rem;
  background: none;
  border: none;
  font-weight: 600;
  color: #1F3A2F;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.05rem;
}

.faq-answer {
  padding: 0 1.5rem 0;
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  color: #4A665A;
}

.faq-answer-open {
  padding-bottom: 1.5rem;
  max-height: 300px;
}

/* Closing & Attribution */
.closing-message {
  background: linear-gradient(135deg, #E8F5EF, #F0F8F4);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  color: #1F3A2F;
  margin-top: 3rem;
}

.attribution-box {
  text-align: center;
  color: #6B7E75;
  font-size: 0.9rem;
}

/* General */
h1, h2, h3, h4 {
  color: #1F3A2F;
}

ul.icon-list,
.list-icon {
  padding-left: 0;
  list-style: none;
}

ul.icon-list li,
.list-icon li {
  padding: 8px 0;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.text-success-custom {
  color: #00A86B;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.6rem;
  }
  .section-header h2 {
    font-size: 2rem;
  }
  .main-container {
    padding: 2.5rem 1rem;
  }
}
</style>
