<template>
  <div class="islamic-blogs-container container py-5">
    <h1 class="text-center mb-5 text-primary">Islamic Knowledge Hub</h1>
    
    <div class="row mb-4">
      <div class="col-md-6 mb-3 mb-md-0">
        <div class="input-group">
          <span class="input-group-text bg-light"><i class="fas fa-search"></i></span>
          <input 
            type="text" 
            class="form-control" 
            placeholder="Search content..." 
            v-model="searchQuery"
          >
        </div>
      </div>
      <div class="col-md-6">
        <select class="form-select" v-model="selectedContentType">
          <option value="all">All Content</option>
          <option value="quran">Quran</option>
          <option value="hadith">Hadith</option>
          <option value="article">Articles</option>
        </select>
      </div>
    </div>
    
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading Islamic content...</p>
    </div>
    
    <div v-else>
      <div class="row">
        <div class="col-lg-4 col-md-6 mb-4" v-for="item in filteredContent" :key="item.id">
          <div class="card h-100 shadow-sm border-0">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge" :class="contentTypeClass(item.type)">{{ item.type }}</span>
                <small class="text-muted">{{ formatDate(item.date) }}</small>
              </div>
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text text-muted">{{ item.excerpt }}</p>
            </div>
            <div class="card-footer bg-transparent border-0">
              <a v-if="item.link" :href="item.link" target="_blank" class="btn btn-sm btn-primary w-100">
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="d-flex justify-content-center mt-5" v-if="filteredContent.length === 0">
        <div class="alert alert-info w-100 text-center">
          No content found matching your criteria.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IslamicBlogs',
  data() {
    return {
      content: [],
      searchQuery: "",
      selectedContentType: "all",
      loading: true,
      error: null
    };
  },
  computed: {
    filteredContent() {
      let filtered = this.content;
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(item => 
          item.title.toLowerCase().includes(query) || 
          item.excerpt.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query)
        );
      }
      
      if (this.selectedContentType !== "all") {
        filtered = filtered.filter(item => item.type === this.selectedContentType);
      }
      
      return filtered;
    }
  },
  methods: {
    contentTypeClass(type) {
      return {
        'bg-primary bg-opacity-10 text-primary': type === 'quran',
        'bg-success bg-opacity-10 text-success': type === 'hadith',
        'bg-warning bg-opacity-10 text-warning': type === 'article'
      };
    },
    formatDate(dateString) {
      if (!dateString) return 'Date not available';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    async fetchIslamicContent() {
      try {
        // Fetch Quran verses from AlQuran Cloud API
        const quranResponse = await fetch('https://api.alquran.cloud/v1/surah/1/en.asad');
        const quranData = await quranResponse.json();
        
        // Fetch Hadiths from Hadith API
        const hadithResponse = await fetch('https://hadithapi.com/api/hadiths?apiKey=$2y$10$BQN9B9QZ9B9QZ9B9QZ9B9QZ9B9QZ9B9QZ9B9QZ9B9QZ9B9QZ9B9QZ');
        const hadithData = await hadithResponse.json();
        
        // Transform API data into consistent format
        this.content = [
          // Quran content
          ...quranData.data.ayahs.slice(0, 5).map((ayah, index) => ({
            id: `quran-${index}`,
            title: `Quran: Surah Al-Fatiha (Verse ${ayah.numberInSurah})`,
            excerpt: ayah.text,
            type: 'quran',
            date: new Date().toISOString(),
            link: `https://quran.com/1/${ayah.numberInSurah}`
          })),
          
          // Hadith content
          ...hadithData.hadiths.slice(0, 5).map((hadith, index) => ({
            id: `hadith-${index}`,
            title: `Hadith: ${hadith.referenceBook}`,
            excerpt: hadith.hadithEnglish,
            type: 'hadith',
            date: hadith.date,
            link: hadith.sourceLink
          })),
          
          // Sample articles (would normally come from another API)
          {
            id: 'article-1',
            title: 'The Five Pillars of Islam',
            excerpt: 'Understanding the foundation of Muslim life and the core practices that shape our faith.',
            type: 'article',
            date: '2023-05-15',
            link: 'https://example.com/five-pillars'
          },
          {
            id: 'article-2',
            title: 'The Life of Prophet Muhammad (PBUH)',
            excerpt: 'A brief overview of the Seerah and the lessons we can learn from the Prophet\'s life.',
            type: 'article',
            date: '2023-06-02',
            link: 'https://example.com/prophet-life'
          }
        ];
        
      } catch (error) {
        console.error('Error fetching Islamic content:', error);
        this.error = 'Failed to load content. Please try again later.';
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchIslamicContent();
  }
};
</script>

<style scoped>
.islamic-blogs-container {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 10px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.badge {
  font-size: 0.75rem;
  padding: 0.35em 0.65em;
}

.alert {
  max-width: 600px;
  margin: 0 auto;
}
</style>