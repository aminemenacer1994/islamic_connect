<template>
  <div class="container-fluid py-4">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold mb-4 animate__animated animate__fadeIn">
        Hajj & Umrah Guides
      </h1>
      <p class="mx-auto description text-muted" style="max-width: 900px; font-size: 1.2rem;">
        <i class="bi bi-info-circle me-2"></i>These guides provide essential knowledge on the rituals, historical
        background, spiritual significance, logistical steps, and etiquette involved in performing both pilgrimages.
      </p>
      <ul class="nav nav-pills justify-content-center gap-3 fw-semibold mb-5" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link custom-tab px-4 py-2" :class="{ active: currentTab === 'hajj' }"
            @click="switchTab('hajj')" id="hajj-tab" data-bs-toggle="tab" data-bs-target="#hajj" type="button"
            role="tab" aria-controls="hajj" :aria-selected="currentTab === 'hajj'">
            <i class="bi bi-moon-stars me-2"></i>Hajj Guides
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link custom-tab px-4 py-2" :class="{ active: currentTab === 'umrah' }"
            @click="switchTab('umrah')" id="umrah-tab" data-bs-toggle="tab" data-bs-target="#umrah" type="button"
            role="tab" aria-controls="umrah" :aria-selected="currentTab === 'umrah'">
            <i class="bi bi-person-walking me-2"></i>Umrah Guides
          </button>
        </li>
      </ul>
    </div>
    <div class="row g-4 align-items-stretch justify-content-center">
      <div class="col-12 col-lg-8">
        <div class="p-4 p-md-5 animate__animated animate__fadeInRight">
          <h1 class="h2 fw-bold text-center mb-4"><i class="bi bi-book me-2"></i>{{ currentContent.title }}</h1>
          <div class="d-flex flex-wrap justify-content-center gap-2 mb-4">
            <span class="badge bg-light text-dark px-3 py-2"><i class="bi bi-book me-2"></i><strong>Read Time:</strong>
              {{ readTime }} min</span>
            <span class="badge bg-light text-dark px-3 py-2"><i
                class="bi bi-headphones me-2"></i><strong>Listen:</strong> {{ listeningTime }} min</span>
            <span class="badge bg-light text-dark px-3 py-2"><i
                class="bi bi-file-earmark-word me-2"></i><strong>Words:</strong> {{ wordCount }}</span>
          </div>
          <div class="content-text">
            <p class="text-justify mb-4" style="font-size: 1.2rem;"><i class="bi bi-circle-fill me-2 text-custom"></i>{{
              currentContent.text1 }}</p>
            <p class="text-justify mb-4" style="font-size: 1.2rem;"><i class="bi bi-circle-fill me-2 text-custom"></i>{{
              currentContent.text2 }}</p>
            <p class="text-justify mb-4" style="font-size: 1.2rem;"><i class="bi bi-circle-fill me-2 text-custom"></i>{{
              currentContent.text3 }}</p>
          </div>
          <div class="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-4">
            <button class="custom-tab px-3 py-2" @click="copyText" :disabled="isCopying">
              <i class="bi bi-clipboard me-2"></i>{{ isCopying ? 'Copying...' : 'Copy to Clipboard' }}
            </button>
            <a class="custom-tab px-3 py-2 text-center"
              :href="`https://wa.me/?text=${encodeURIComponent(currentContent.title + '\n\n' + currentContent.text1 + '\n\n' + currentContent.text2 + '\n\n' + currentContent.text3)}`"
              target="_blank" rel="noopener">
              <i class="bi bi-whatsapp me-2"></i>Share on WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div class="fab-container">
        <button class="fab-single" @click="toggleSpeech" :title="isSpeaking ? (isPaused ? 'Resume' : 'Pause') : 'Play'"
          :disabled="!isSpeechAvailable">
          <i :class="isSpeaking && !isPaused ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
        </button>
        <button class="fab-single mt-2" @click="toggleSettings" title="Settings">
          <i class="bi bi-gear-fill"></i>
        </button>
      </div>
      <transition name="fade">
        <div v-if="copySuccess"
          class="alert alert-success alert-dismissible fs-5 p-4 text-center border-0 position-fixed top-0 start-50 translate-middle-x"
          role="alert"
          style="background-color: rgba(223, 250, 241, 0.9); color: #00bfa6; z-index: 1100; max-width: 500px;">
          <i class="bi bi-check-circle-fill me-2"></i><strong>Success:</strong> Guide copied to clipboard!
          <button type="button" class="btn-close" @click="copySuccess = false" aria-label="Close"></button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HajjUmrahGuides',
  data() {
    return {
      utterance: null,
      isSpeaking: false,
      isPaused: false,
      isCopying: false,
      isSpeechAvailable: !!window.speechSynthesis,
      settingsOpen: false,
      currentTab: 'hajj',
      copySuccess: false,
      guides: {
        hajj: {
          title: "Hajj Guide",
          text1: "Hajj is the annual pilgrimage to MakkMBAah that every Muslim must perform at least once in their lifetime if they are able. It takes place during Dhul Hijjah, the 12th month of the Islamic calendar, and involves a series of sacred rituals performed over several days. These include wearing Ihram, performing Tawaf around the Kaaba, standing at Arafat, stoning the pillars at Mina, and sacrificing an animal in remembrance of Prophet Ibrahim's devotion.",
          text2: "Pilgrims also trim or shave their hair, drink Zamzam water, and follow a specific route that symbolizes humility, unity, and devotion to Allah. The journey fosters spiritual renewal, repentance, and brotherhood among Muslims from around the world. It's essential to prepare spiritually, financially, and physically before undertaking this profound act of worship.",
          text3: "Modern logistics and guides make Hajj more accessible, but it is vital to approach it with sincerity, knowledge of the rites, and an understanding of its deeper spiritual significance. The Hajj experience is life-changing, instilling patience, humility, and immense gratitude in those who complete it."
        },
        umrah: {
          title: "Umrah Guide",
          text1: "Umrah is a non-mandatory pilgrimage to Makkah that can be performed at any time of the year. Although it is shorter than Hajj, it holds immense spiritual value and involves specific rites including entering the state of Ihram, performing Tawaf around the Kaaba, praying at Maqam Ibrahim, and walking between the hills of Safa and Marwah (Sa'i).",
          text2: "Pilgrims also shave or trim their hair at the end of Umrah to mark the completion of the ritual. It is an act of devotion and purification, offering a deeply personal and spiritual experience. Many Muslims perform Umrah multiple times in their lives, especially during the holy month of Ramadan for added blessings.",
          text3: "Umrah encourages reflection, self-discipline, and a break from worldly distractions. It's a chance to renew one's faith, seek forgiveness, and strengthen the bond with Allah. With fewer logistical challenges than Hajj, it serves as a beautiful introduction to the sacred journey."
        }
      },
      readTime: 0,
      listeningTime: 0,
      wordCount: 0
    };
  },
  computed: {
    currentContent() {
      return this.guides[this.currentTab] || {};
    }
  },
  mounted() {
    this.calculateReadTimeAndWordCount();
    window.addEventListener('beforeunload', this.stopSpeech);
    window.addEventListener('visibilitychange', this.handleTabChange);
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.stopSpeech);
    window.removeEventListener('visibilitychange', this.handleTabChange);
    this.stopSpeech();
  },
  methods: {
    switchTab(tab) {
      if (this.currentTab === tab) return;
      this.currentTab = tab;
      this.stopSpeech();
      this.settingsOpen = false;
      this.$nextTick(() => {
        this.calculateReadTimeAndWordCount();
      });
    },
    async toggleSpeech() {
      if (!this.isSpeechAvailable) {
        alert("Text-to-speech is not supported in this browser.");
        return;
      }

      const { title, text1, text2, text3 } = this.currentContent;
      const text = `${title || ''} ${text1 || ''} ${text2 || ''} ${text3 || ''}`.trim();

      if (!text) {
        alert("No content available to read.");
        return;
      }

      if (this.isSpeaking && !this.isPaused) {
        try {
          window.speechSynthesis.pause();
          this.isPaused = true;
        } catch (error) {
          console.error('Speech pause error:', error);
          this.stopSpeech();
        }
      } else if (this.isSpeaking && this.isPaused) {
        try {
          window.speechSynthesis.resume();
          this.isPaused = false;
        } catch (error) {
          console.error('Speech resume error:', error);
          this.stopSpeech();
        }
      } else {
        this.stopSpeech();
        try {
          this.utterance = new SpeechSynthesisUtterance(text);
          this.utterance.lang = 'en-US';
          this.utterance.rate = 1.0;
          this.utterance.pitch = 1.0;
          this.utterance.volume = 1.0;
          this.utterance.onend = () => {
            this.isSpeaking = false;
            this.isPaused = false;
            this.utterance = null;
          };
          this.utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            this.stopSpeech();
            alert('An error occurred during speech synthesis.');
          };
          window.speechSynthesis.speak(this.utterance);
          this.isSpeaking = true;
          this.isPaused = false;
        } catch (error) {
          console.error('Speech synthesis failed:', error);
          alert('Failed to start speech synthesis.');
          this.stopSpeech();
        }
      }
    },
    stopSpeech() {
      if (window.speechSynthesis) {
        try {
          window.speechSynthesis.cancel();
        } catch (error) {
          console.error('Speech cancel error:', error);
        }
      }
      this.isSpeaking = false;
      this.isPaused = false;
      this.utterance = null;
    },
    handleTabChange() {
      if (document.hidden && this.isSpeaking) {
        this.stopSpeech();
      }
    },
    async copyText() {
      this.isCopying = true;
      const textToCopy = [
        this.currentContent.text1,
        this.currentContent.text2,
        this.currentContent.text3
      ].filter(Boolean).join("\n\n");

      try {
        await navigator.clipboard.writeText(textToCopy);
        this.copySuccess = true;
        setTimeout(() => {
          this.copySuccess = false;
        }, 3000);
      } catch (err) {
        console.error('Failed to copy text:', err);
        alert('Failed to copy text to clipboard.');
      } finally {
        this.isCopying = false;
      }
    },
    calculateReadTimeAndWordCount() {
      const text = [
        this.currentContent.text1,
        this.currentContent.text2,
        this.currentContent.text3
      ].filter(Boolean).join(" ");

      this.wordCount = text.trim().split(/\s+/).filter(Boolean).length;
      this.readTime = Math.ceil(this.wordCount / 200);
      this.listeningTime = Math.ceil(this.wordCount / 150);
    },
    toggleSettings() {
      this.settingsOpen = !this.settingsOpen;
      console.log('Settings toggled:', this.settingsOpen);
    }
  }
};
</script>

<style scoped>
.fab-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1200;
}

.fab-single {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #00bfa6;
  color: white;
  font-size: 0.9rem;
  border: none;
  outline: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.fab-single:hover {
  background-color: #009688;
  transform: scale(1.1);
}

.fab-single:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.fab-single i {
  color: white;
}

.custom-tab {
  background-color: #e6f3f2;
  color: #00bfa6;
  font-size: 1.3rem;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.custom-tab:hover {
  background-color: #d1ecea;
  color: #009688;
}

.custom-tab.active {
  background-color: #00bfa6;
  color: white;
  border-color: #009688;
  box-shadow: 0 3px 8px rgba(0, 191, 166, 0.2);
}

.custom-tab:disabled {
  background-color: #6c757d;
  color: white;
  cursor: not-allowed;
}

.text-justify {
  text-align: justify;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.content-text {
  max-height: 400px;
  overflow-y: hidden;
}

.text-custom {
  color: #00bfa6;
}

.alert-success {
  background-color: rgba(223, 250, 241, 0.9) !important;
  color: #00bfa6 !important;
}
</style>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');

::selection {
  background-color: #00bfa6;
  color: white;
}

a {
  color: #00bfa6;
  text-decoration: none;
}

a:hover {
  color: #009688;
}
</style>