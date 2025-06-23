<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold mb-3">Hajj & Umrah Guides</h1>
      <p class="lead mx-auto description" style="max-width: 800px;">
        These guides provide essential knowledge on the rituals, historical background, spiritual significance,
        logistical steps, and etiquette involved in performing both pilgrimages.
      </p>
      <ul class="nav nav-pills justify-content-center gap-3 fw-semibold mb-4" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link custom-tab px-4 py-2"
            :class="{ active: currentTab === 'hajj' }"
            @click="switchTab('hajj')"
            id="hajj-tab"
            data-bs-toggle="tab"
            data-bs-target="#hajj"
            type="button"
            role="tab"
            aria-controls="hajj"
            :aria-selected="currentTab === 'hajj'"
          >
            <i class="bi bi-moon-stars me-2"></i>Hajj Guides
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link custom-tab px-4 py-2"
            :class="{ active: currentTab === 'umrah' }"
            @click="switchTab('umrah')"
            id="umrah-tab"
            data-bs-toggle="tab"
            data-bs-target="#umrah"
            type="button"
            role="tab"
            aria-controls="umrah"
            :aria-selected="currentTab === 'umrah'"
          >
            <i class="bi bi-person-walking me-2"></i>Umrah Guides
          </button>
        </li>
      </ul>
    </div>
    <div class="row g-5 align-items-center justify-content-center">
      <div class="col-lg-6 mb-4 mb-lg-0">
        <div class="card shadow-lg border-0 rounded-4 overflow-hidden h-100">
          <img :src="currentContent.image" :alt="currentContent.alt" class="img-fluid w-100 object-fit-cover" style="max-height: 400px;" loading="lazy" />
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card shadow-lg border-0 rounded-4 p-4 h-100">
          <h2 class="h2 fw-bold text-center mb-3">{{ currentContent.title }}</h2>
          <div class="d-flex flex-wrap justify-content-center gap-3 mb-3">
            <span class="badge bg-light text-dark fs-6 px-3 py-2 shadow-sm"><i class="bi bi-book me-2"></i><strong>Read Time:</strong> {{ readTime }} min</span>
            <span class="badge bg-light text-dark fs-6 px-3 py-2 shadow-sm"><i class="bi bi-headphones me-2"></i><strong>Listen:</strong> {{ listeningTime }} min</span>
            <span class="badge bg-light text-dark fs-6 px-3 py-2 shadow-sm"><i class="bi bi-file-earmark-word me-2"></i><strong>Words:</strong> {{ wordCount }}</span>
          </div>
          <p class="lead text-justify mb-3">{{ currentContent.text1 }}</p>
          <p class="lead text-justify mb-3">{{ currentContent.text2 }}</p>
          <p class="lead text-justify mb-3">{{ currentContent.text3 }}</p>
          <div v-if="copySuccess" class="alert alert-success mt-3" role="alert">
            <i class="bi bi-clipboard-check me-2"></i>Text copied to clipboard successfully!
          </div>
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mt-4">
            <button class="btn btn-success d-flex align-items-center justify-content-center flex-grow-1" @click="copyText">
              <i class="bi bi-clipboard me-2"></i><b>Copy to Clipboard</b>
            </button>
            <a class="btn btn-success d-flex align-items-center justify-content-center flex-grow-1"
              :href="`https://wa.me/?text=${encodeURIComponent(currentContent.title + '\n\n\n' + currentContent.text1 + '\n\n' + currentContent.text2 + '\n\n' + currentContent.text3)}`"
              target="_blank" rel="noopener">
              <i class="bi bi-whatsapp me-2"></i><b>Share on WhatsApp</b>
            </a>
          </div>
        </div>
      </div>
      <div class="fab-container">
        <button class="fab-single shadow-lg" @click="toggleSpeech" :title="isSpeaking ? (isPaused ? 'Resume' : 'Pause') : 'Play'">
          <i :class="isSpeaking && !isPaused ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
        </button>
      </div>
      <transition name="fade">
        <div v-if="copySuccess"
          class="alert alert-success alert-dismissible fs-5 p-4 text-center shadow-sm border-0 position-absolute top-0 start-50 translate-middle-x"
          role="alert" style="background-color: rgb(223, 250, 241); color: rgb(0, 105, 92); z-index: 10; width: 90%;">
          ✅ <strong>Success:</strong> Guide copied to clipboard!
          <button type="button" class="btn-close position-absolute top-50 end-0 translate-middle-y me-3"
            @click="copySuccess = false" aria-label="Close"></button>
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
      currentTab: 'hajj', // Default to 'hajj'
      copySuccess: false,
      guides: {
        hajj: {
          title: "Hajj Guide",
          text1: "Hajj is the annual pilgrimage to Makkah that every Muslim must perform at least once in their lifetime if they are able. It takes place during Dhul Hijjah, the 12th month of the Islamic calendar, and involves a series of sacred rituals performed over several days. These include wearing Ihram, performing Tawaf around the Kaaba, standing at Arafat, stoning the pillars at Mina, and sacrificing an animal in remembrance of Prophet Ibrahim's devotion.",
          text2: "Pilgrims also trim or shave their hair, drink Zamzam water, and follow a specific route that symbolizes humility, unity, and devotion to Allah. The journey fosters spiritual renewal, repentance, and brotherhood among Muslims from around the world. It's essential to prepare spiritually, financially, and physically before undertaking this profound act of worship.",
          text3: "Modern logistics and guides make Hajj more accessible, but it is vital to approach it with sincerity, knowledge of the rites, and an understanding of its deeper spiritual significance. The Hajj experience is life-changing, instilling patience, humility, and immense gratitude in those who complete it.",
          image: "/images/umrah.jpg",
          alt: "Pilgrims performing Hajj rituals in Makkah"
        },
        umrah: {
          title: "Umrah Guide",
          text1: "Umrah is a non-mandatory pilgrimage to Makkah that can be performed at any time of the year. Although it is shorter than Hajj, it holds immense spiritual value and involves specific rites including entering the state of Ihram, performing Tawaf around the Kaaba, praying at Maqam Ibrahim, and walking between the hills of Safa and Marwah (Sa'i).",
          text2: "Pilgrims also shave or trim their hair at the end of Umrah to mark the completion of the ritual. It is an act of devotion and purification, offering a deeply personal and spiritual experience. Many Muslims perform Umrah multiple times in their lives, especially during the holy month of Ramadan for added blessings.",
          text3: "Umrah encourages reflection, self-discipline, and a break from worldly distractions. It's a chance to renew one's faith, seek forgiveness, and strengthen the bond with Allah. With fewer logistical challenges than Hajj, it serves as a beautiful introduction to the sacred journey.",
          image: "/images/umra.jpg",
          alt: "Muslims performing Umrah rituals at the Grand Mosque"
        }
      },
      readTime: 0,
      listeningTime: 0,
      wordCount: 0
    };
  },
  computed: {
    currentContent() {
      return this.guides[this.currentTab];
    }
  },
  mounted() {
    this.calculateReadTimeAndWordCount(); // Initial calculation on mount
    window.addEventListener('beforeunload', this.stopSpeech);
    window.addEventListener('visibilitychange', this.handleTabChange);
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.stopSpeech);
    window.removeEventListener('visibilitychange', this.handleTabChange);
    this.stopSpeech(); // Ensure speech is stopped when component is unmounted
  },
  methods: {
    switchTab(tab) {
      if (this.currentTab === tab) {
        return; // Do nothing if the tab is already active
      }
      this.currentTab = tab;
      this.stopSpeech();
      this.$nextTick(() => {
        this.calculateReadTimeAndWordCount();
      });
    },

    toggleSpeech() {
      const { title, text1, text2, text3 } = this.currentContent;
      const text = `${title || ''} ${text1 || ''} ${text2 || ''} ${text3 || ''}`.trim();

      if (!text) {
        alert("No content available to read.");
        return;
      }

      if (this.isSpeaking && !this.isPaused) {
        window.speechSynthesis.pause();
        this.isPaused = true;
      } else if (this.isSpeaking && this.isPaused) {
        window.speechSynthesis.resume();
        this.isPaused = false;
      } else {
        this.stopSpeech();
        this.utterance = new SpeechSynthesisUtterance(text);
        this.utterance.lang = 'en-US';
        this.utterance.onend = () => {
          this.isSpeaking = false;
          this.isPaused = false;
          this.utterance = null;
        };
        window.speechSynthesis.speak(this.utterance);
        this.isSpeaking = true;
        this.isPaused = false;
      }
    },

    stopSpeech() {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      this.isSpeaking = false;
      this.isPaused = false;
    },

    handleTabChange() {
      if (document.hidden) {
        this.stopSpeech();
      }
    },

    copyText() {
      const textToCopy = [
        this.currentContent.text1,
        this.currentContent.text2,
        this.currentContent.text3
      ].join("\n\n");

      navigator.clipboard.writeText(textToCopy).then(() => {
        this.copySuccess = true;
        setTimeout(() => {
          this.copySuccess = false;
        }, 3000);
      });
    },

    calculateReadTimeAndWordCount() {
      const text = [
        this.currentContent.text1,
        this.currentContent.text2,
        this.currentContent.text3
      ].join(" ");
      
      this.wordCount = text.trim().split(/\s+/).filter(Boolean).length;
      this.readTime = Math.ceil(this.wordCount / 200); // Avg reading speed: 200 WPM
      this.listeningTime = Math.ceil(this.wordCount / 150); // Avg listening speed: 150 WPM
    }
  }
};
</script>

<style scoped>
.fab-single {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--bs-success);
  color: white;
  font-size: 2rem;
  border: none;
  outline: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1050;
  transition: background-color 0.3s ease;
}
.fab-single:hover {
  background-color: #198754;
}
.fab-single i {
  color: white;
}
.fab-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1050;
}
.custom-tab {
  background-color: #e9f7f3;
  color: #198754;
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}
.custom-tab:hover {
  background-color: #d1f2e7;
  color: #146c43;
}
.custom-tab.active {
  background-color: #198754;
  color: #fff;
  font-weight: bold;
  border-color: #146c43;
  box-shadow: 0 4px 12px rgba(25, 135, 84, 0.3);
}
.text-justify {
  text-align: justify;
}
img.object-fit-cover {
  object-fit: cover;
}
</style>

<style>
::selection {
  background-color: #198754;
  color: white;
}
</style> 