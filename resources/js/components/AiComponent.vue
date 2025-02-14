<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Hadith Collection</h1>
    <div class="text-center mb-4">
      <select v-model="selectedCollection" class="form-select w-25 mx-auto" @change="fetchHadiths">
        <option value="bukhari">Sahih Bukhari</option>
        <option value="muslim">Sahih Muslim</option>
        <option value="tirmidhi">Jami' at-Tirmidhi</option>
        <option value="abudawud">Sunan Abi Dawud</option>
        <option value="nasai">Sunan an-Nasa'i</option>
        <option value="ibnmajah">Sunan Ibn Majah</option>
        <option value="malik">Muwatta Malik</option>
      </select>
      <select v-model="selectedLanguage" class="form-select w-25 mx-auto mt-3" @change="fetchHadiths">
        <option value="en">English</option>
        <option value="ar">Arabic</option>
        <option value="ur">Urdu</option>
      </select>
    </div>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger text-center">
      {{ error }}
    </div>
    <div v-else>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="hadith in hadiths" :key="hadith.hadithNumber">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">{{ hadith.collection }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Book {{ hadith.bookNumber }}, Hadith {{ hadith.hadithNumber }}
              </h6>
              <p v-if="hadith.arabic" class="card-text" dir="rtl">{{ hadith.arabic }}</p>
              <p v-if="hadith[selectedLanguage]" class="card-text">{{ hadith[selectedLanguage] }}</p>
              <p v-if="hadith.reference" class="card-text"><small class="text-muted">{{ hadith.reference }}</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hadiths: [],
      loading: false,
      error: null,
      selectedCollection: 'bukhari', // Default collection
      selectedLanguage: 'en', // Default language
      apiKey: '$2y$10$O2e0IlTPAMpfpY7zy0zLvBvipsM7evZegPO7rywNayxsglQHE1u', // Your API Key
    };
  },
  async created() {
    await this.fetchHadiths();
  },
  methods: {
    async fetchHadiths() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(
          `http://localhost:8000/api/hadiths?collection=${this.selectedCollection}&language=${this.selectedLanguage}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch Hadith data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        this.hadiths = data.hadiths || [];
      } catch (error) {
        this.error = "An error occurred while fetching Hadith data.";
        console.error("API Error:", error);
      } finally {
        this.loading = false;
      }
    }


  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-title {
  font-weight: bold;
  color: #2c3e50;
}

.card-text[dir="rtl"] {
  font-size: 1.2em;
  font-family: 'Amiri', serif;
  /* Use a font that supports Arabic */
}

.alert {
  max-width: 500px;
  margin: 0 auto;
}
</style>
