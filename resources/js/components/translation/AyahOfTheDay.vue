<template>
  <div v-if="isVisible" class="ayah-container">
    <div class="ayah-header d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0 fw-bold">Ayah of the Day</h3>
      <button 
        class="btn btn-sm btn-outline-secondary" 
        @click="closeMessageBox"
        title="Close">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <div class="card shadow-sm border-0">
      <!-- Surah Info -->
      <div class="card-header bg-white border-0">
        <h4 class="text-left  fw-bold mb-0">
          {{ ayah.surahNumber }} : {{ ayah.ayahNumber }} - {{ ayah.surah }}
        </h4>
      </div>
      
      <!-- Ayah Content -->
      <div class="card-body">
        <!-- Arabic Text -->
        <div class="ayah-arabic text-center mb-4">
          <div 
            class="arabic-text text-right"
            :style="{ fontSize: `${fontSize}rem` }">
            {{ ayah.arabic }}
          </div>
        </div>
        
        <!-- Translation -->
        <div v-if="showTranslation && selectedTranslation" class="translation-container mb-4 p-3 bg-light rounded">
          <div 
            class="translation-text"
            :class="{ 'rtl': isRtlLanguage(selectedLanguage) }"
            :style="{ fontSize: `${fontSize * 0.85}rem` }">
            {{ ayah.translations[selectedLanguage] }}
          </div>
        </div>
        
        <!-- Tafsir -->
        <div v-if="showTafsir && ayah.tafsir" class="tafsir-container mt-4 p-3 bg-light rounded">
          <h6 class="text-muted mb-2 fw-bold">Tafsir</h6>
          <p class="tafsir-text mb-0" :style="{ fontSize: `${fontSize * 0.8}rem` }">
            {{ ayah.tafsir }}
          </p>
        </div>
      </div>
      
      <!-- Action Buttons - Now more visible -->
      <div class="card-footer bg-white border-0 pt-3">
        <div class="d-flex flex-wrap justify-content-center gap-3">
          <!-- Font Controls -->
          <div class="btn-group">
            <button 
              class="btn btn-sm btn-outline-dark d-flex align-items-center"
              @click="decreaseFontSize"
              :disabled="fontSize <= 0.8"
              title="Decrease Font Size">
              <i class="bi bi-dash-lg me-1"></i>
              <span class="d-none d-sm-inline">Smaller</span>
            </button>
            <button 
              class="btn btn-sm btn-outline-dark d-flex align-items-center"
              @click="increaseFontSize"
              :disabled="fontSize >= 2"
              title="Increase Font Size">
              <i class="bi bi-plus-lg me-1"></i>
              <span class="d-none d-sm-inline">Larger</span>
            </button>
          </div>
          
          <!-- Translation Dropdown -->
          <div class="dropdown">
            <button 
              class="btn btn-sm btn-outline-dark dropdown-toggle d-flex align-items-center"
              type="button" 
              id="translationDropdown" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
              title="Translation">
              <i class="bi bi-translate me-1"></i>
              <span class="d-none d-sm-inline">Translation</span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="translationDropdown">
              <li v-for="lang in availableTranslations" :key="lang">
                <a 
                  class="dropdown-item" 
                  href="#" 
                  @click.prevent="selectTranslation(lang)">
                  {{ capitalize(lang) }}
                </a>
              </li>
            </ul>
          </div>
          
          <!-- Tafsir Toggle -->
          <button 
            class="btn btn-sm btn-outline-dark d-flex align-items-center"
            @click="toggleTafsir"
            v-if="ayah.tafsir"
            title="Tafsir">
            <i class="bi bi-book me-1"></i>
            <span class="d-none d-sm-inline">Tafsir</span>
          </button>
          
          <!-- Copy -->
          <button 
            class="btn btn-sm btn-outline-dark d-flex align-items-center"
            @click="copyToClipboard"
            title="Copy">
            <i class="bi bi-clipboard me-1"></i>
            <span class="d-none d-sm-inline">Copy</span>
          </button>
          
          <!-- Share -->
          <button 
            class="btn btn-sm btn-outline-dark d-flex align-items-center"
            @click="shareAyah"
            title="Share">
            <i class="bi bi-share me-1"></i>
            <span class="d-none d-sm-inline">Share</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Toast Notification -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div 
        id="copyToast" 
        class="toast align-items-center text-white bg-success border-0" 
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            <i class="bi bi-check-circle-fill me-2"></i> Copied to clipboard
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ayah: null,
      isVisible: true,
      apiUrl: "https://api.alquran.cloud/v1/ayah",
      translationLangs: ["en.asad", "ur.junagarhi"],
      showTranslation: false,
      selectedLanguage: null,
      showTafsir: false,
      fontSize: 1.8
    };
  },
  computed: {
    availableTranslations() {
      return this.ayah?.translations ? Object.keys(this.ayah.translations) : [];
    },
    selectedTranslation() {
      return this.ayah?.translations && this.selectedLanguage 
        ? this.ayah.translations[this.selectedLanguage]
        : null;
    }
  },
  methods: {
    closeMessageBox() {
      this.isVisible = false;
    },
    openMessageBox() {
      this.isVisible = true;
    },
    async fetchAyahOfTheDay() {
      const currentDate = new Date().toLocaleDateString();
      const storedDate = localStorage.getItem('ayahDate');

      if (storedDate !== currentDate) {
        const randomAyah = Math.floor(Math.random() * 6236) + 1;
        try {
          const arabicUrl = `${this.apiUrl}/${randomAyah}`;
          const arabicResponse = await fetch(arabicUrl);
          if (!arabicResponse.ok) throw new Error(`HTTP error! Status: ${arabicResponse.status}`);
          
          const arabicData = await arabicResponse.json();
          const translations = {};
          
          for (const lang of this.translationLangs) {
            const translationUrl = `${this.apiUrl}/${randomAyah}/${lang}`;
            const translationResponse = await fetch(translationUrl);
            if (translationResponse.ok) {
              const translationData = await translationResponse.json();
              translations[lang.split('.')[1] || lang] = translationData.data.text || "Translation not available";
            }
          }

          const tafsir = "This is a placeholder tafsir for the Ayah. In a real implementation, fetch from a tafsir API or database.";

          if (arabicData?.data) {
            this.ayah = {
              arabic: arabicData.data.text || "N/A",
              translations: translations,
              tafsir: tafsir,
              surah: arabicData.data.surah?.englishName || "Unknown Surah",
              surahNumber: arabicData.data.surah?.number || "N/A",
              ayahNumber: arabicData.data.numberInSurah || "N/A"
            };
            localStorage.setItem('ayahDate', currentDate);
            localStorage.setItem('ayahData', JSON.stringify(this.ayah));
          }
        } catch (error) {
          console.error("Error fetching Ayah:", error);
        }
      } else {
        this.ayah = JSON.parse(localStorage.getItem('ayahData'));
      }
    },
    copyToClipboard() {
      const textToCopy = `${this.ayah.surahNumber}:${this.ayah.ayahNumber} - ${this.ayah.surah}\n${this.ayah.arabic}${
        this.showTranslation && this.selectedTranslation ? `\n${this.selectedTranslation}` : ''
      }${this.showTafsir && this.ayah.tafsir ? `\nTafsir: ${this.ayah.tafsir}` : ''}`;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        const toast = new bootstrap.Toast(document.getElementById('copyToast'));
        toast.show();
      });
    },
    shareAyah() {
      const textToShare = `${this.ayah.surahNumber}:${this.ayah.ayahNumber} - ${this.ayah.surah}\n${this.ayah.arabic}${
        this.showTranslation && this.selectedTranslation ? `\n${this.selectedTranslation}` : ''
      }${this.showTafsir && this.ayah.tafsir ? `\nTafsir: ${this.ayah.tafsir}` : ''}`;
      
      if (navigator.share) {
        navigator.share({
          title: `Surah ${this.ayah.surah} Ayah ${this.ayah.ayahNumber}`,
          text: textToShare,
          url: window.location.href
        });
      } else {
        this.copyToClipboard();
      }
    },
    selectTranslation(language) {
      this.selectedLanguage = language;
      this.showTranslation = !this.showTranslation;
    },
    toggleTafsir() {
      this.showTafsir = !this.showTafsir;
    },
    increaseFontSize() {
      if (this.fontSize < 2) this.fontSize = Math.min(2, this.fontSize + 0.2);
    },
    decreaseFontSize() {
      if (this.fontSize > 0.8) this.fontSize = Math.max(0.8, this.fontSize - 0.2);
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    isRtlLanguage(lang) {
      return ['ur', 'ar', 'urdu', 'arabic'].includes(lang.toLowerCase());
    }
  },
  created() {
    this.fetchAyahOfTheDay();
  }
}
</script>

<style scoped>
.ayah-container {
  margin: 0 auto;
  padding: 1.5rem;
}

.ayah-header {
  padding: 0 0.5rem;
}

.card {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.08);
}

.arabic-text {
  font-family: "Amiri", "Scheherazade New", "Lateef", sans-serif;
  direction: rtl;
  line-height: 2.8;
  color: #333;
  font-weight: 600;
}

.translation-text {
  line-height: 1.8;
  color: #555;
}

.translation-text.rtl {
  direction: rtl;
  text-align: right;
  font-family: "Amiri", "Lateef", sans-serif;
}

.card-footer {
  border-top: 1px solid rgba(0,0,0,0.05);
}

.btn-outline-dark {
  border-width: 2px;
  font-weight: 500;
}

.btn-outline-dark:hover {
  background-color: rgba(13, 110, 253, 0.1);
}

@media (max-width: 768px) {
  .arabic-text {
    font-size: 1.8rem !important;
    line-height: 2.5;
  }
  
  .ayah-container {
    padding: 1rem;
  }
}

@media (max-width: 576px) {
  .arabic-text {
    font-size: 1.6rem !important;
    line-height: 2.2;
  }
  
  .btn-sm {
    padding: 0.3rem 0.6rem;
    font-size: 0.85rem;
  }
}
</style>