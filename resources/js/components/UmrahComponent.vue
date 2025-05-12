<template>
  <div class="container py-5">
    <div class="text-center mb-3">
      <h1 class="display-4 fw-bold mb-3">Hajj & Umrah Guides</h1>
      <p class="lead mx-auto mb-3 description">
        These guides provide essential knowledge on the rituals, historical background, spiritual significance, logistical steps, and etiquette involved in performing both pilgrimages.
      </p>
      <ul class="nav nav-pills justify-content-center gap-3 fw-semibold" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link custom-tab px-4 py-2 rounded-pill " :class="{ active: currentTab === 'hajj' }"
            @click="currentTab = 'hajj'" :aria-selected="currentTab === 'hajj'" aria-controls="hajj-tab">
            🕋 Hajj
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link custom-tab px-4 py-2 rounded-pill" :class="{ active: currentTab === 'umrah' }"
            @click="currentTab = 'umrah'" :aria-selected="currentTab === 'umrah'" aria-controls="umrah-tab">
            🤲 Umrah
          </button>
        </li>
      </ul>


    </div>

    <div class="row align-items-center">
      <div class="col-md-6 ">
        <img :src="currentContent.image" :alt="currentContent.alt"
          style="border: 3px solid lightgray; border-radius: 20px;" class="img-fluid shadow-sm w-100" loading="lazy" />
      </div>

      <div class="col-md-6 mt-2">
        <div class="">
          <p class="lead text-justify ">{{ currentContent.text1 }}</p>
          <p class="lead text-justify">{{ currentContent.text2 }}</p>
          <p class="lead text-justify">{{ currentContent.text3 }}</p>
          <div class="btn-group btn-group-lg w-100" role="group" aria-label="Large button group">
            <button type="button" @click="speak(currentContent.text1 + ' ' + currentContent.text2)"
              class="btn btn-outline-success">Listen Aloud</button>
            <button type="button" @click="copyText" class="btn btn-outline-success">Copy to Clipboard</button>
            <button type="button"
              :href="`https://wa.me/?text=${encodeURIComponent(currentContent.text1 + '\n\n' + currentContent.text2)}`"
              target="_blank" class="btn btn-outline-success">Share via WhatsApp</button>
          </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: "hajj",
      copySuccess: false,
      guides: {
        hajj: {
          text1: "Hajj is the annual pilgrimage to Makkah that every Muslim must perform at least once in their lifetime if they are able. It takes place during Dhul Hijjah, the 12th month of the Islamic calendar, and involves a series of sacred rituals performed over several days. These include wearing Ihram, performing Tawaf around the Kaaba, standing at Arafat, stoning the pillars at Mina, and sacrificing an animal in remembrance of Prophet Ibrahim's devotion.",
          text2: "Pilgrims also trim or shave their hair, drink Zamzam water, and follow a specific route that symbolizes humility, unity, and devotion to Allah. The journey fosters spiritual renewal, repentance, and brotherhood among Muslims from around the world. It's essential to prepare spiritually, financially, and physically before undertaking this profound act of worship.",
          text3: "Modern logistics and guides make Hajj more accessible, but it is vital to approach it with sincerity, knowledge of the rites, and an understanding of its deeper spiritual significance. The Hajj experience is life-changing, instilling patience, humility, and immense gratitude in those who complete it.",
          image: "/images/umrah.jpg",
          alt: "Pilgrims performing Hajj rituals in Makkah"
        },
        umrah: {
          text1: "Umrah is a non-mandatory pilgrimage to Makkah that can be performed at any time of the year. Although it is shorter than Hajj, it holds immense spiritual value and involves specific rites including entering the state of Ihram, performing Tawaf around the Kaaba, praying at Maqam Ibrahim, and walking between the hills of Safa and Marwah (Sa’i).",
          text2: "Pilgrims also shave or trim their hair at the end of Umrah to mark the completion of the ritual. It is an act of devotion and purification, offering a deeply personal and spiritual experience. Many Muslims perform Umrah multiple times in their lives, especially during the holy month of Ramadan for added blessings.",
          text3: "Umrah encourages reflection, self-discipline, and a break from worldly distractions. It's a chance to renew one's faith, seek forgiveness, and strengthen the bond with Allah. With fewer logistical challenges than Hajj, it serves as a beautiful introduction to the sacred journey.",
          image: "/images/umra.jpg",
          alt: "Muslims performing Umrah rituals at the Grand Mosque"
        }
      }
    };
  },
  computed: {
    currentContent() {
      return this.guides[this.currentTab];
    }
  },
  methods: {
    speak(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    },
    copyText() {
      const textToCopy = this.currentContent.text1 + "\n\n" + this.currentContent.text2 + "\n\n" + this.currentContent.text3;
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.copySuccess = true;
        setTimeout(() => {
          this.copySuccess = false;
        }, 2000);
      });
    }

  }
};
</script>

<style scoped>
.custom-tab {
  background-color: rgb(200, 245, 234);
  color: rgb(0, 105, 92);
  font-size: 1.3rem;
  /* Increased font size */
  padding: 0.8rem 2rem;
  /* Bigger padding for chunkier pills */
  border-radius: 50px;
  /* Fully rounded */
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.custom-tab:hover {
  background-color: rgb(183, 240, 226);
  color: rgb(0, 85, 74);
}

.custom-tab.active {
  background-color: rgb(13, 182, 145);
  color: #fff;
  border-color: rgb(0, 122, 102);
  box-shadow: 0 0 10px rgba(13, 182, 145, 0.3);
}



.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


.text-justify {
  text-align: justify;
}

img {
  max-height: 570px;
  object-fit: cover;
}

/* Custom tab styles */
.custom-tab {
  background-color: #f8f9fa;
  color: #000;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.custom-tab.active {
  background-color: rgb(13, 182, 145);
  color: #fff;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(13, 182, 145, 0.4);
}

/* Custom button */
.custom-btn-green {
  background-color: rgb(13, 182, 145);
  border: none;
  color: white;
}

.custom-btn-green:hover {
  background-color: rgb(11, 160, 128);
}
</style>
