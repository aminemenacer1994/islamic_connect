<template>
  <div 
    ref="verseOfTheDayElement" 
    class="verse-of-the-day" 
    
  >
    
    <div v-if="loading" class="loading">
      Loading verse of the day...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else-if="verseInfo" class="verse-content">
      <AyahInfo :information="verseInfo" />
      <div class="w-100">
        <MainAyah :information="verseInfo" />
        <div ref="verseText">
          <h4 class="text-left verse-translation" style="line-height: 1.6em">
            {{ expanded ? verseInfo.translation : truncatedText(verseInfo.translation) }}
            
          </h4>
        </div>
        <Translator :translator="verseInfo.translator" />
      </div>
    </div>
    
    <div v-else class="no-data">
      No verse data available.
    </div>

    <AlertModal 
      :showAlertText="showAlertText" 
      :showAlert="showAlert" 
      :showErrorAlert="showErrorAlert" 
      :showAlertTextNote="showAlertTextNote" 
      @close-alert-text="closeAlertText" 
    />
  </div>
</template>

<script>
import AyahInfo from '../translation/AyahInfo.vue';
import MainAyah from '../translation/MainAyah.vue';
import Translator from '../translation/Translator.vue';
import AlertModal from '../modals/AlertModal.vue';

export default {
  name: 'VerseOfTheDay',
  components: {
    AyahInfo,
    MainAyah,
    Translator,
    AlertModal
  },
  data() {
    return {
      verseInfo: null,
      isFullScreen: false,
      expanded: false,
      showMoreLink: true,
      loading: true,
      error: null,
      showAlertText: false,
      showAlert: false,
      showErrorAlert: false,
      showAlertTextNote: false,
      touchStartX: 0,
      touchEndX: 0,
    };
  },
  async created() {
    try {
      this.verseInfo = await this.fetchVerseOfTheDay();
      this.loading = false;
    } catch (err) {
      console.error("Error fetching verse:", err);
      this.error = "Failed to load verse of the day. Please try again later.";
      this.loading = false;
    }
  },
  methods: {
    async fetchVerseOfTheDay() {
      // Simulating an API call with a delay
      await new Promise(resolve => setTimeout(resolve, 10000));
      
      // This is where you'd typically make an API call
      // For now, we'll return mock data
      return {
        translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        translator: "Sahih International",
        surah: {
          name: "Al-Fatihah",
          number: 1,
          englishName: "The Opening",
          englishNameTranslation: "The Opening",
        },
        numberInSurah: 1,
        juz: 1,
        manzil: 1,
        page: 1,
        ruku: 1,
        hizbQuarter: 1,
        text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      };
    },
  }
};
</script>

<style scoped>
.verse-of-the-day {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
  touch-action: pan-y;
}
.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: white;
  padding: 20px;
  overflow-y: auto;
}
.verse-translation {
  font-size: 1.2rem;
  margin-top: 15px;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
.loading, .error, .no-data {
  text-align: center;
  padding: 20px;
  font-size: 1.1rem;
}
.error {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}
@media (max-width: 576px) {
  .verse-of-the-day {
    padding: 10px;
  }
  .verse-translation {
    font-size: 1rem;
  }
}
</style>