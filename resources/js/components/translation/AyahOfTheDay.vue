<template>
  <div v-if="isVisible && ayah" class="ayah-container">
    <!-- Minimal Header -->
    <div class="ayah-header">
      <div class="header-content">
        <div class="title-section">
          <div class="icon-wrapper">
            <i class="bi bi-moon-stars"></i>
          </div>
          <div>
            <h3 class="title">Ayah of the Day</h3>
            <p class="subtitle">{{ formatDate }}</p>
          </div>
        </div>
        <button 
          class="close-btn" 
          @click="closeMessageBox"
          aria-label="Close">
          <i class="bi bi-x"></i>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="ayah-content">
      <!-- Surah Info -->
      <div class="surah-info">
        <span class="surah-badge">Surah {{ ayah.surah }}</span>
        <span class="ayah-ref">{{ ayah.surahNumber }}:{{ ayah.ayahNumber }}</span>
      </div>

      <!-- Arabic Text -->
      <div class="arabic-section">
        <div 
          class="arabic-text"
          :style="{ fontSize: `${fontSize}rem` }">
          {{ ayah.arabic }}
        </div>
        <div class="decoration">
          <div class="decoration-line"></div>
          <i class="bi bi-flower1"></i>
          <div class="decoration-line"></div>
        </div>
      </div>

      <!-- Translation Toggle -->
      <div class="toggle-section">
        <button 
          class="toggle-btn"
          :class="{ 'active': showTranslation }"
          @click="toggleTranslation">
          <span>Translation</span>
          <div class="toggle-switch">
            <div class="toggle-knob"></div>
          </div>
        </button>
      </div>

      <!-- Translation -->
      <transition name="fade-slide">
        <div v-if="showTranslation" class="translation-section">
          <div class="language-selector">
            <button
              v-for="lang in availableTranslations"
              :key="lang"
              class="lang-btn"
              :class="{ 'active': selectedLanguage === lang }"
              @click="selectTranslation(lang)">
              {{ lang.toUpperCase() }}
            </button>
          </div>
          <div 
            class="translation-text"
            :class="{ 'rtl': isRtlLanguage(selectedLanguage) }">
            {{ ayah.translations[selectedLanguage] }}
          </div>
        </div>
      </transition>

      <!-- Tafsir Toggle -->
      <div class="toggle-section" v-if="ayah.tafsir">
        <button 
          class="toggle-btn"
          :class="{ 'active': showTafsir }"
          @click="toggleTafsir">
          <span>Tafsir</span>
          <div class="toggle-switch">
            <div class="toggle-knob"></div>
          </div>
        </button>
      </div>

      <!-- Tafsir -->
      <transition name="fade-slide">
        <div v-if="showTafsir && ayah.tafsir" class="tafsir-section">
          <div class="tafsir-text">
            {{ ayah.tafsir }}
          </div>
        </div>
      </transition>
    </div>

    <!-- Action Bar -->
    <div class="action-bar">
      <div class="action-group">
        <button 
          class="action-btn"
          @click="decreaseFontSize"
          :disabled="fontSize <= 1.2">
          <i class="bi bi-dash-lg"></i>
        </button>
        <span class="font-size-label">Font Size</span>
        <button 
          class="action-btn"
          @click="increaseFontSize"
          :disabled="fontSize >= 2.4">
          <i class="bi bi-plus-lg"></i>
        </button>
      </div>

      <div class="action-group">
        <button class="action-btn" @click="copyToClipboard">
          <i class="bi bi-clipboard"></i>
        </button>
        <button class="action-btn" @click="shareAyah">
          <i class="bi bi-share"></i>
        </button>
        <button class="action-btn" @click="bookmarkAyah">
          <i class="bi bi-bookmark"></i>
        </button>
      </div>
    </div>

    <!-- Toast -->
    <div class="toast" :class="{ 'show': showToast }">
      <i class="bi bi-check-circle"></i>
      <span>{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AyahOfTheDay',
  data() {
    return {
      ayah: null,
      isVisible: true,
      apiUrl: "https://api.alquran.cloud/v1/ayah",
      translationLangs: ["en.asad", "ur.junagarhi"],
      showTranslation: false,
      selectedLanguage: "en",
      showTafsir: false,
      fontSize: 1.8,
      showToast: false,
      toastMessage: ""
    };
  },
  computed: {
    availableTranslations() {
      return this.ayah?.translations ? Object.keys(this.ayah.translations) : [];
    },
    formatDate() {
      return new Date().toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  },
  methods: {
    closeMessageBox() {
      this.isVisible = false;
    },
    
    async fetchAyahOfTheDay() {
      // Use a consistent ayah for demo - in production, use random or sequential
      const demoAyah = 255; // Ayat ul Kursi
      
      try {
        const arabicUrl = `${this.apiUrl}/${demoAyah}`;
        const arabicResponse = await fetch(arabicUrl);
        
        if (!arabicResponse.ok) throw new Error('Network error');
        
        const arabicData = await arabicResponse.json();
        const translations = {};
        
        // Fetch translations
        for (const lang of this.translationLangs) {
          const translationUrl = `${this.apiUrl}/${demoAyah}/${lang}`;
          const translationResponse = await fetch(translationUrl);
          if (translationResponse.ok) {
            const translationData = await translationResponse.json();
            const langCode = lang.split('.')[1] || lang;
            translations[langCode] = translationData.data.text;
          }
        }

        // Enhanced tafsir
        const tafsir = "The Throne Verse (Ayat al-Kursi) is one of the most profound verses in the Quran, emphasizing God's absolute sovereignty, knowledge, and power over all creation. It serves as a reminder of divine protection and the limitless nature of God's authority, offering spiritual comfort and reinforcing faith in the Creator's omnipotence and mercy.";

        if (arabicData?.data) {
          this.ayah = {
            arabic: arabicData.data.text,
            translations: translations,
            tafsir: tafsir,
            surah: arabicData.data.surah.englishName,
            surahNumber: arabicData.data.surah.number,
            ayahNumber: arabicData.data.numberInSurah
          };
        }
      } catch (error) {
        console.error("Error fetching Ayah:", error);
        // Fallback data
        this.ayah = {
          arabic: "اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
          translations: {
            en: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
            ur: "اللہ وہ ہے جس کے سوا کوئی معبود نہیں، زندہ اور قائم رہنے والا ہے، نہ اُسے اُونگھ آتی ہے نہ نیند، زمین اور آسمانوں میں جو کچھ ہے اُسی کا ہے، کون ہے جو اُس کے حضور اُس کی اجازت کے بغیر سفارش کر سکے؟ جو کچھ لوگوں کے سامنے ہے اُسے بھی جانتا ہے اور جو کچھ اُن کے پیچھے ہے اُسے بھی، اور وہ اُس کی معلومات میں سے کسی چیز پر احاطہ نہیں کر سکتے مگر جتنا وہ چاہے، اُس کی کرسی زمین اور آسمانوں کو گھیرے ہوئے ہے، اور اُن کی حفاظت اُس پر گراں نہیں، اور وہ بلند مرتبہ اور عظمت والا ہے۔"
          },
          tafsir: "The Throne Verse (Ayat al-Kursi) is one of the most profound verses in the Quran, emphasizing God's absolute sovereignty, knowledge, and power over all creation. It serves as a reminder of divine protection and the limitless nature of God's authority, offering spiritual comfort and reinforcing faith in the Creator's omnipotence and mercy.",
          surah: "Al-Baqarah",
          surahNumber: 2,
          ayahNumber: 255
        };
      }
    },

    toggleTranslation() {
      this.showTranslation = !this.showTranslation;
      if (this.showTranslation && !this.selectedLanguage) {
        this.selectedLanguage = this.availableTranslations[0];
      }
    },

    toggleTafsir() {
      this.showTafsir = !this.showTafsir;
    },

    selectTranslation(lang) {
      this.selectedLanguage = lang;
    },

    increaseFontSize() {
      if (this.fontSize < 2.4) this.fontSize += 0.1;
    },

    decreaseFontSize() {
      if (this.fontSize > 1.2) this.fontSize -= 0.1;
    },

    async copyToClipboard() {
      const text = `${this.ayah.arabic}\n\n- Surah ${this.ayah.surah} ${this.ayah.surahNumber}:${this.ayah.ayahNumber}`;
      try {
        await navigator.clipboard.writeText(text);
        this.showToastMessage('Copied to clipboard');
      } catch (err) {
        this.showToastMessage('Failed to copy');
      }
    },

    async shareAyah() {
      const text = `${this.ayah.arabic}\n\n- Surah ${this.ayah.surah} ${this.ayah.surahNumber}:${this.ayah.ayahNumber}`;
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Ayah of the Day',
            text: text,
            url: window.location.href
          });
        } catch (err) {
          this.copyToClipboard();
        }
      } else {
        this.copyToClipboard();
      }
    },

    bookmarkAyah() {
      this.showToastMessage('Bookmarked');
    },

    showToastMessage(message) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },

    isRtlLanguage(lang) {
      return ['ur', 'ar'].includes(lang.toLowerCase());
    }
  },
  mounted() {
    this.fetchAyahOfTheDay();
  }
}
</script>

<style scoped>
.ayah-container {
  margin: 2rem auto;
  padding: 0;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  overflow: hidden;
}

/* Header */
.ayah-header {
  padding: 1.5rem 2rem 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title-section {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.1rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.25rem 0;
  line-height: 1.2;
}

.subtitle {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
  font-weight: 400;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #999;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f5f5f5;
  color: #666;
}

/* Main Content */
.ayah-content {
  padding: 0 2rem;
}

.surah-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0 2rem;
}

.surah-badge {
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #555;
}

.ayah-ref {
  font-size: 0.875rem;
  color: #888;
  font-weight: 500;
}

/* Arabic Section */
.arabic-section {
  text-align: center;
  margin: 2rem 0;
}

.arabic-text {
  font-family: "Amiri", "Scheherazade New", "Lateef", serif;
  direction: rtl;
  line-height: 2.2;
  color: #1a1a1a;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  text-align: justify;
}

.decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #ddd;
}

.decoration-line {
  flex: 1;
  height: 1px;
  background: #f0f0f0;
}

/* Toggle Sections */
.toggle-section {
  margin: 1.5rem 0;
}

.toggle-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: none;
  border: none;
  padding: 1rem 0;
  cursor: pointer;
  color: #555;
  font-weight: 500;
  transition: color 0.2s ease;
}

.toggle-btn:hover {
  color: #333;
}

.toggle-btn.active {
  color: #667eea;
}

.toggle-switch {
  width: 44px;
  height: 24px;
  background: #e0e0e0;
  border-radius: 12px;
  position: relative;
  transition: background 0.2s ease;
}

.toggle-btn.active .toggle-switch {
  background: #667eea;
}

.toggle-knob {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.toggle-btn.active .toggle-knob {
  transform: translateX(20px);
}

/* Translation & Tafsir */
.translation-section,
.tafsir-section {
  margin: 1rem 0 2rem;
}

.language-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.lang-btn {
  padding: 0.375rem 0.75rem;
  border: 1px solid #e0e0e0;
  background: white;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lang-btn.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.translation-text {
  line-height: 1.7;
  color: #444;
  font-size: 1rem;
  text-align: left;
}

.translation-text.rtl {
  direction: rtl;
  text-align: right;
  font-family: "Amiri", "Scheherazade New", serif;
}

.tafsir-text {
  line-height: 1.6;
  color: #555;
  font-size: 0.95rem;
  background: #fafafa;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #667eea;
}

/* Action Bar */
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: #fafafa;
  border-top: 1px solid #f0f0f0;
}

.action-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.action-btn {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 0.75rem;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover:not(:disabled) {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-1px);
}

.action-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.font-size-label {
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
  min-width: 70px;
  text-align: center;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: #1a1a1a;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1000;
}

.toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

/* Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 640px) {
  .ayah-container {
    margin: 1rem;
    border-radius: 16px;
  }
  
  .ayah-header,
  .ayah-content {
    padding: 1rem 1.5rem;
  }
  
  .action-bar {
    padding: 1rem 1.5rem;
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .action-group {
    justify-content: center;
  }
  
  .arabic-text {
    line-height: 2;
    font-size: 1.6rem;
  }
}
</style>