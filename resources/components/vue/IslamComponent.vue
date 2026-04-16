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
      <div class="hero-wave-bottom">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="#FEF9EF" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,53.3C1120,53,1280,75,1360,85.3L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>

    <div class="container main-container">
      <!-- Disclaimer Alert -->
      <div class="alert alert-custom-warning mb-4">
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

        <!-- Pexels Image -->
        <div class="image-card mt-4">
          <img
            :src="basicsImage"
            :alt="contentData.basics.title"
            class="img-fluid rounded-4"
          />
          <div class="image-caption">Image: Sacred Islamic architecture | Source: Pexels</div>
        </div>

        <!-- Video Embed -->
        <div class="video-card mt-4">
          <iframe
            width="100%"
            height="400"
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
          <div class="section-icon bg-success-custom">
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
          <img :src="shahadaImage" alt="Prayer" class="img-fluid rounded-4" />
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
              <img :src="allahImage" alt="Allah" class="img-fluid rounded-4" />
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
              <img :src="prophetImage" alt="Medina Mosque" class="img-fluid rounded-4" />
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
              <img :src="quranImage" alt="Quran" class="img-fluid rounded-4" />
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
              <img :src="salahImage" alt="Praying Muslim" class="img-fluid rounded-4" />
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
              <img :src="zakatImage" alt="Charity" class="img-fluid rounded-4" />
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
              <img :src="sawmImage" alt="Iftar" class="img-fluid rounded-4" />
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
              <img :src="hajjImage" alt="Kaaba" class="img-fluid rounded-4" />
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
              <img :src="afterlifeImage" alt="Sunset" class="img-fluid rounded-4" />
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
import contentData from '../../data/discover-islam-content.json';

// Pexels API Key
const PEXELS_API_KEY = 'dhOLH00j9E1bBV53cMmEpaHPnrRR3WGzl3vRGXnPNbquONCjpZeKEr3f';

export default {
  name: 'DiscoverIslam',
  data() {
    return {
      contentData: contentData,
      searchQuery: '',
      searchResults: [],
      openFaq: null,
      // Images from Pexels
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
          const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(q.query)}&per_page=1`, {
            headers: { 'Authorization': PEXELS_API_KEY }
          });
          const data = await response.json();
          if (data.photos && data.photos.length > 0) {
            this[q.key] = data.photos[0].src.large;
          }
        } catch (error) {
          console.error(`Failed to fetch ${q.key}:`, error);
          // Fallback images
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

      // Search through sections
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

      // Search through FAQs
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
/* ===== Custom Color Variables (Green to Beige) ===== */
:root {
  --green-deep: #1B4D1F;
  --green-primary: #2C6E2F;
  --green-soft: #4A8B4D;
  --green-light: #E8F3E8;
  --beige-deep: #C9B896;
  --beige-primary: #DFD0B2;
  --beige-soft: #F5EFE2;
  --beige-light: #FEF9EF;
  --cream: #FFFDF7;
  --shadow-sm: 0 10px 30px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 20px 40px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 30px 50px rgba(0, 0, 0, 0.12);
}

.discover-islam {
  background: var(--cream);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #2C3E2F;
}

/* ===== Hero Section ===== */
.hero-section {
  background: linear-gradient(135deg, var(--green-deep) 0%, var(--beige-deep) 100%);
  position: relative;
  padding: 4rem 0 3rem;
  color: white;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" opacity="0.05"%3E%3Cpath fill="white" d="M10,10 L20,10 L20,20 L10,20 Z M30,30 L40,30 L40,40 L30,40 Z M50,50 L60,50 L60,60 L50,60 Z M70,70 L80,70 L80,80 L70,80 Z"/%3E%3C/svg%3E');
  background-repeat: repeat;
}

.hero-container {
  position: relative;
  z-index: 2;
}

.hero-badge {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.title-icon {
  font-size: 2.5rem;
  margin-right: 0.5rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

/* Search */
.search-wrapper {
  max-width: 550px;
  margin: 0 auto;
  position: relative;
}

.search-input-group {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 60px;
  padding: 0.25rem;
  box-shadow: var(--shadow-lg);
}

.search-icon {
  color: #999;
  margin-left: 1.25rem;
}

.search-input {
  flex: 1;
  border: none;
  padding: 0.9rem 0.5rem;
  font-size: 1rem;
  outline: none;
  background: transparent;
}

.search-btn {
  background: var(--green-primary);
  border: none;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}

.search-btn:hover {
  background: var(--green-deep);
  transform: scale(1.02);
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 20px;
  box-shadow: var(--shadow-lg);
  margin-top: 0.75rem;
  z-index: 100;
  overflow: hidden;
}

.search-result-item {
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid #f0f0f0;
}

.search-result-item:hover {
  background: var(--green-light);
}

.result-icon {
  color: var(--green-primary);
  font-size: 1.2rem;
  width: 24px;
}

.result-title {
  font-weight: 600;
  color: var(--green-deep);
}

.result-excerpt {
  font-size: 0.8rem;
  color: #666;
}

/* Hero Wave */
.hero-wave-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: 0;
}

.hero-wave-bottom svg {
  width: 100%;
  height: 60px;
}

/* ===== Main Container ===== */
.main-container {
  padding: 3rem 0;
}

/* ===== Section Styles ===== */
.content-section {
  margin-bottom: 4rem;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, var(--green-primary), var(--green-soft));
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  box-shadow: 0 10px 25px rgba(44, 110, 47, 0.3);
}

.section-icon i {
  font-size: 2rem;
  color: white;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--green-deep);
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: #7A8B7B;
  font-size: 1rem;
}

/* ===== Cards ===== */
.info-card {
  background: white;
  border-radius: 24px;
  padding: 1.8rem;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  height: 100%;
}

.info-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.card-icon-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.card-icon-header i {
  font-size: 1.8rem;
  color: var(--green-primary);
}

.card-icon-header h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--green-deep);
  margin: 0;
}

.icon-list {
  list-style: none;
  padding: 0;
}

.icon-list li {
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon-list i {
  color: var(--green-primary);
  font-size: 1rem;
  width: 20px;
}

/* Image Card */
.image-card {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.image-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.image-caption, .video-caption {
  font-size: 0.7rem;
  color: #999;
  padding: 0.5rem;
  text-align: center;
  background: #f9f9f9;
}

/* Video Card */
.video-card {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.video-card iframe {
  width: 100%;
  height: 250px;
}

/* Shahada Card */
.shahada-card {
  background: linear-gradient(135deg, var(--green-light), var(--beige-soft));
  padding: 2rem;
  border-radius: 24px;
  text-align: center;
}

.shahada-arabic {
  font-size: 2rem;
  font-family: 'Amiri', 'Traditional Arabic', serif;
  margin-bottom: 1rem;
}

.shahada-transliteration {
  font-size: 1.1rem;
  color: var(--green-deep);
  margin-bottom: 0.5rem;
}

.shahada-translation {
  font-style: italic;
  color: #555;
}

/* Names Grid */
.names-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.name-badge {
  background: var(--green-light);
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  color: var(--green-primary);
}

/* Reference Box */
.reference-box, .quran-box {
  background: var(--beige-soft);
  padding: 0.75rem 1rem;
  border-radius: 16px;
  font-size: 0.85rem;
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.reference-box i, .quran-box i {
  color: var(--green-primary);
  font-size: 1rem;
  margin-top: 0.2rem;
}

/* Custom Table */
.table-custom {
  background: white;
  border-radius: 16px;
  overflow: hidden;
}

.table-custom th {
  background: var(--green-primary);
  color: white;
  border: none;
}

.table-custom td {
  border-color: #eee;
}

/* Do's & Don'ts */
.dos-card, .donts-card {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  height: 100%;
}

.card-header-dos {
  background: var(--green-primary);
  color: white;
  padding: 1rem 1.5rem;
  font-weight: 600;
}

.card-header-donts {
  background: #C0392B;
  color: white;
  padding: 1rem 1.5rem;
  font-weight: 600;
}

.card-body-dos, .card-body-donts {
  background: white;
  padding: 1.5rem;
}

.list-icon {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-icon li {
  margin-bottom: 0.85rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.9rem;
}

/* FAQ */
.faq-grid {
  background: white;
  border-radius: 24px;
  padding: 0.5rem;
  box-shadow: var(--shadow-sm);
}

.faq-item {
  border-bottom: 1px solid #eee;
}

.faq-question {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1rem;
  font-weight: 600;
  color: var(--green-deep);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s;
}

.faq-question:hover {
  background: var(--green-light);
  border-radius: 16px;
}

.faq-question i {
  color: var(--green-primary);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: 0 1rem;
  color: #555;
  font-size: 0.9rem;
  line-height: 1.6;
}

.faq-answer-open {
  max-height: 300px;
  padding: 0 1rem 1rem 1rem;
}

/* Resources */
.resources-card {
  background: white;
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  height: 100%;
}

.resources-card h4 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--green-deep);
  margin-bottom: 1rem;
}

.resource-list {
  list-style: none;
  padding: 0;
}

.resource-list li {
  margin-bottom: 0.75rem;
}

.resource-link {
  color: var(--green-primary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.resource-link:hover {
  text-decoration: underline;
}

/* Closing Message */
.closing-message {
  background: linear-gradient(135deg, var(--green-light), var(--beige-soft));
  padding: 2rem;
  border-radius: 28px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.closing-message i {
  color: var(--green-primary);
}

/* Attribution */
.attribution-box {
  background: var(--beige-soft);
  padding: 1rem;
  border-radius: 16px;
  text-align: center;
  font-size: 0.7rem;
  color: #666;
}

/* Alert Custom */
.alert-custom-warning {
  background: var(--beige-soft);
  border-left: 4px solid #C0392B;
  border-radius: 16px;
  color: #5a3e1b;
}

/* Bootstrap Overrides */
.text-success-custom {
  color: var(--green-primary) !important;
}

.bg-success-custom {
  background: var(--green-primary) !important;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .section-header h2 {
    font-size: 1.6rem;
  }
  
  .shahada-arabic {
    font-size: 1.2rem;
  }
  
  .video-card iframe {
    height: 200px;
  }
  
  .image-card img {
    height: 200px;
  }
}
</style>