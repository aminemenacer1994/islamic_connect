<template>
  <div v-if="information" ref="targetElement" class="w-100 my-element" :class="{'full-screen': isFullScreen}">
    <button v-if="isFullScreen" @click="toggleFullScreen" class="close-button mb-3 text-left btn btn-secondary">Close</button>
    <div class="container">
      <h5 class="mr-2">
        <p>{{ information.ayah.surah.name_en }} {{ information.ayah.surah_id }}: {{ information.ayah.ayah_id }}</p>
      </h5>
    </div>

    <div @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" class="swipeable-div w-100">
      <div class="btn">
        <h5 class="text-right " name="ayah_text" style="line-height: 1.6em">{{ information.ayah.ayah_text }}</h5>
      </div>
      <div class="btn-group">
      <div class="col">
        <label>
          Increase size:
          <i class="bi bi-plus-circle-fill h3 custom-icon-increase" 
             aria-placeholder="Increase text size" 
             @click="increaseFontSize"></i>
        </label>
      </div>
      <div class="col">
        <label>
          Decrease size:
          <i class="bi bi-dash-circle-fill h3 custom-icon-decrease" 
             aria-placeholder="Decrease text size" 
             @click="decreaseFontSize"></i>
        </label>
      </div>
    </div>
      <h1 class="text-left " ref="heading3" style="line-height: 1.6em">
        {{ expanded ? information.translation : truncatedText(information.translation) }}
        <template v-if="showMoreLink">
          <a href="#" @click.prevent="toggleExpand">{{ expanded ? 'Show Less' : 'Show More' }}</a>
        </template>
      </h1>
      <img src="/images/art.png" class="pr-2" width="30px" alt="lamp" loading="lazy"/><h6 class="text-left mt-3"><strong>Translation: </strong>Ahmed Ali</h6>

      <!-- Alerts -->
      <div v-if="showAlertText" class="alert alert-success alert-dismissible fade show mt-2" role="alert">Text copied successfully!</div>
      <div v-if="showAlert" class="alert alert-success mt-2" role="alert">Bookmark created successfully!</div>
      <div v-if="showErrorAlert" class="alert alert-danger" role="alert">Login to your account to be able to bookmark verses.</div>
      <div v-if="showAlertTextNote" class="alert alert-danger" role="alert">Please log in to write a note.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AyahTranslation',
  props: {
    information: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.$emit('ayah-text', this.information.ayah.ayah_text); // Emit ayah text if needed
  },
  computed: {
    styleObject() {
      return {
        lineHeight: '1.6em',
        fontSize: this.fontSize + 'rem' // Dynamic font size
      };
    }
  },
  data() {
    return {
      isFullScreen: false,
      expanded: false,
      showMoreLink: true, // Set to false if no 'Show More' link needed
      showAlertText: false,
      showAlert: false,
      showErrorAlert: false,
      showAlertTextNote: false,
      touchStartX: 0,
      touchEndX: 0,
      fontSize: this.getFontSize(),
    };
  },
  methods: {
    increaseFontSize() {
      this.fontSize += 0.2; // Increase font size
      this.saveFontSize(); // Save updated font size to local storage
    },
    decreaseFontSize() {
      if (this.fontSize > 1) { // Prevent decreasing below a certain size
        this.fontSize -= 0.2; // Decrease font size
        this.saveFontSize(); // Save updated font size to local storage
      }
    },
    saveFontSize() {
      localStorage.setItem('ayahFontSize', this.fontSize); // Store font size in local storage
    },
    getFontSize() {
      const savedFontSize = localStorage.getItem('ayahFontSize');
      return savedFontSize ? parseFloat(savedFontSize) : 1.6; // Default font size
    },
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen;
    },
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    truncatedText(text) {
      const maxLength = 200; // Define your desired max length here
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      } else {
        return text;
      }
    },
    handleTouchStart(event) {
      this.touchStartX = event.changedTouches[0].screenX;
    },
    handleTouchMove(event) {
      this.touchEndX = event.changedTouches[0].screenX;
    },
    handleTouchEnd() {
      if (this.touchEndX < this.touchStartX) {
        this.goToNextAyah();
      } else if (this.touchEndX > this.touchStartX) {
        this.goToPreviousAyah();
      }
      this.touchStartX = 0;
      this.touchEndX = 0;
    },
    goToNextAyah() {
      // Logic to go to the next verse
      alert('Going to next verse!'); // Replace with actual logic to navigate to the next verse
    },
    goToPreviousAyah() {
      // Logic to go to the previous verse
      alert('Going to previous verse!'); // Replace with actual logic to navigate to the previous verse
    },
    // Additional methods can be added as needed
  }
};
</script>

<style scoped>
.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: white;
  padding: 20px;
}

.swipeable-div {
  touch-action: pan-y;
}


.btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.btn .bi {
  margin-left: 10px;
}

@media (max-width: 576px) {
  .mobile-only {
    display: block;
  }

  .hide-on-mobile {
    display: none;
  }
}
</style>
