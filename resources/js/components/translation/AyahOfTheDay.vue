<template>
  <div v-if="isVisible" class="ayah-container">
    <div class="ayah-header d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0 fw-bold text-dark">Ayah of the Day</h3>
      <button 
        class="btn btn-close-btn" 
        @click="closeMessageBox"
        aria-label="Close Ayah of the Day"
        title="Close">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <div class="card ayah-card shadow-sm">
      <!-- Surah Info -->
      <div class="card-header">
        <h5 class="fw-bold mb-0 text-center text-dark">
          {{ ayah.surahNumber }} : {{ ayah.ayahNumber }} - {{ ayah.surah }}
        </h5>
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
        <div 
          v-if="showTranslation && selectedTranslation" 
          class="translation-container mb-4 p-3 rounded"
          :class="{ 'show': showTranslation }">
          <div 
            class="translation-text"
            :class="{ 'rtl': isRtlLanguage(selectedLanguage) }"
            :style="{ fontSize: `${fontSize * 0.85}rem` }">
            {{ ayah.translations[selectedLanguage] }}
          </div>
        </div>
        
        <!-- Tafsir -->
        <div 
          v-if="showTafsir && ayah.tafsir" 
          class="tafsir-container mt-4 p-3 rounded"
          :class="{ 'show': showTafsir }">
          <h6 class="text-muted mb-2 fw-bold">Tafsir</h6>
          <p class="tafsir-text mb-0" :style="{ fontSize: `${fontSize * 0.8}rem` }">
            {{ ayah.tafsir }}
          </p>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="card-footer pt-3">
        <div class="d-flex flex-wrap justify-content-center gap-2">
          <!-- Font Controls -->
          <div class="btn-group" role="group" aria-label="Font size controls">
            <button 
              class="btn btn-primary btn-sm d-flex align-items-center"
              @click="decreaseFontSize"
              :disabled="fontSize <= 0.8"
              aria-label="Decrease font size"
              title="Decrease Font Size">
              <i class="bi bi-dash-lg me-1"></i>
              <span class="d-none d-sm-inline">Smaller</span>
            </button>
            <button 
              class="btn btn-primary btn-sm d-flex align-items-center"
              @click="increaseFontSize"
              :disabled="fontSize >= 2"
              aria-label="Increase font size"
              title="Increase Font Size">
              <i class="bi bi-plus-lg me-1"></i>
              <span class="d-none d-sm-inline">Larger</span>
            </button>
          </div>
          
          <!-- Translation Dropdown -->
          <div class="dropdown" v-if="availableTranslations.length">
            <button 
              class="btn btn-primary btn-sm dropdown-toggle d-flex align-items-center"
              type="button" 
              id="translationDropdown" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
              :disabled="!availableTranslations.length"
              aria-label="Toggle translation"
              title="Toggle Translation">
              <i class="bi bi-translate me-1"></i>
              <span class="d-none d-sm-inline">{{ showTranslation ? 'Hide' : 'Show' }} Translation</span>
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
            class="btn btn-primary btn-sm d-flex align-items-center"
            :class="{ 'active': showTafsir }"
            @click="toggleTafsir"
            v-if="ayah.tafsir"
            aria-label="Toggle tafsir"
            title="Toggle Tafsir">
            <i class="bi bi-book me-1"></i>
            <span class="d-none d-sm-inline">{{ showTafsir ? 'Hide' : 'Show' }} Tafsir</span>
          </button>
          
          <!-- Copy -->
          <button 
            class="btn btn-primary btn-sm d-flex align-items-center"
            @click="copyToClipboard"
            aria-label="Copy ayah"
            title="Copy">
            <i class="bi bi-clipboard me-1"></i>
            <span class="d-none d-sm-inline">Copy</span>
          </button>
          
          <!-- Share -->
          <button 
            class="btn btn-primary btn-sm d-flex align-items-center"
            @click="shareAyah"
            aria-label="Share ayah"
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
        class="toast align-items-center text-white bg-gradient border-0" 
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
          this.ayah = null;
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
      }).catch(err => {
        console.error('Failed to copy: ', err);
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
        }).catch(err => {
          console.error('Failed to share: ', err);
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
  margin: 2rem auto;
  padding: 1.5rem;
}

.ayah-header {
  padding: 0 1rem;
}

.ayah-card {
  border-radius: 16px;
  border: none;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  background: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 1rem 1.5rem;
}

.card-body {
  padding: 1.5rem;
}

.card-footer {
  background: transparent;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding: 1rem 1.5rem;
}

.arabic-text {
  font-family: "Amiri", "Noto Naskh Arabic", "Scheherazade New", "Lateef", sans-serif;
  direction: rtl;
  line-height: 2.5;
  color: #1a3c34;
  font-weight: 600;
}

.translation-container {
  background: #f1f3f5;
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.translation-container.show {
  opacity: 1;
  transform: translateY(0);
}

.translation-text {
  line-height: 1.8;
  color: #343a40;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.translation-text.rtl {
  direction: rtl;
  text-align: right;
  font-family: "Amiri", "Noto Naskh Arabic", "Lateef", sans-serif;
}

.tafsir-container {
  background: #e9ecef;
  border-radius: 8px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.tafsir-container.show {
  opacity: 1;
  transform: translateY(0);
}

.tafsir-text {
  line-height: 1.6;
  color: #495057;
}

.btn-primary {
  background-color: #1a3c34;
  border-color: #1a3c34;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.btn-primary:hover {
  background-color: #2a5c4e;
  border-color: #2a5c4e;
  transform: translateY(-1px);
}

.btn-primary:active, .btn-primary.active {
  background-color: #14332b;
  border-color: #14332b;
  transform: translateY(0);
}

.btn-primary:disabled {
  background-color: #6c757d;
  border-color: #6c757d;
  opacity: 0.65;
}

.btn-close-btn {
  background: none;
  border: none;
  color: #6c757d;
  font-size: 1.2rem;
  padding: 0.5rem;
  transition: color 0.2s ease;
}

.btn-close-btn:hover {
  color: #343a40;
}

.bg-gradient {
  background: linear-gradient(90deg, #1a3c34, #2a5c4e);
}

.arabic-text, .translation-text, .tafsir-text, .tafsir-container h6 {
  transition: font-size 0.2s ease;
}

@media (max-width: 768px) {
  .ayah-container {
    padding: 1rem;
  }

  .arabic-text {
    line-height: 2.2;
  }

  .btn-sm {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  .card-body, .card-footer {
    padding: 1rem;
  }
}

@media (max-width: 576px) {
  .arabic-text {
    line-height: 2;
  }

  .btn-sm {
    padding: 0.3rem 0.6rem;
    font-size: 0.85rem;
  }

  .ayah-header {
    padding: 0 0.5rem;
  }
}
</style>