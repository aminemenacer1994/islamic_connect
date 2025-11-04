<template>
  <div v-if="information" ref="targetElement" class="w-100 my-element" :class="{'full-screen': isFullScreen}">
    <button v-if="isFullScreen" @click="toggleFullScreen" class="close-button mb-3 text-left btn btn-secondary">Close</button>
    <div class="container">
      <h5 class="mr-2">
        <p>{{ information.ayah.surah.name_en }} {{ information.ayah.surah_id }}: {{ information.ayah.ayah_id }}</p>
      </h5>
    </div>

    <div
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerCancel"
      class="swipeable-div w-100"
    >
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
      <h1 class="text-left ayah-translation" ref="heading1" style="line-height: 1.6em">
        {{ expanded ? tafseer : truncatedText(tafseer) }}
        <template v-if="showMoreLink && tafseer.length > 200">
          <a href="#" @click.prevent="toggleExpand">{{ expanded ? 'Show Less' : 'Show More' }}</a>
        </template>
      </h1>
      <!-- <h6 class="text-left mt-3"><strong>Translation: </strong>Ahmed Ali</h6> -->

      <!-- Alerts -->
      <div v-if="showAlertText" class="alert alert-success alert-dismissible fade show mt-2" role="alert">Text copied successfully!</div>
      <div v-if="showAlert" class="alert alert-success mt-2" role="alert">Bookmark created successfully!</div>
      <div v-if="showErrorAlert" class="alert alert-danger" role="alert">Login to your account to be able to bookmark verses.</div>
      <div v-if="showAlertTextNote" class="alert alert-danger" role="alert">Please log in to write a note.</div>
    </div>
  </div>
</template>

<script defer>
export default {
  name: 'AyahTafseer',
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
      // Pointer/swipe state
      startX: 0,
      startY: 0,
      lastX: 0,
      pointerActive: false,
      isSwiping: false,
      suppressClick: false,
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
    // High‑performance swipe using Pointer Events
    onPointerDown(e) {
      // Only handle primary touch/pen/mouse; ignore multi-touch
      if (!e.isPrimary) return;
      // Ignore interactive elements so taps don't clash
      const interactive = e.target.closest(
        'button, a, input, textarea, select, [role="button"], .custom-icon-increase, .custom-icon-decrease'
      );
      if (interactive) return;

      this.pointerActive = true;
      this.isSwiping = false;
      this.suppressClick = false;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.lastX = e.clientX;
      // Capture to continue receiving moves even if pointer leaves element
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
    },
    onPointerMove(e) {
      if (!this.pointerActive) return;
      // Throttle work; we only need to check direction/threshold
      this.lastX = e.clientX;
      const dx = this.lastX - this.startX;
      const dy = e.clientY - this.startY;

      // Angle guard (~30°): prefer horizontal motion
      const horizontalEnough = Math.abs(dx) > Math.abs(dy) * 1.732; // tan(60°)
      const passedThreshold = Math.abs(dx) > 40; // pixels

      if (!this.isSwiping && horizontalEnough && passedThreshold) {
        this.isSwiping = true;
        this.suppressClick = true; // prevent accidental clicks after swipe
        // Prevent scroll jank while swiping horizontally
        e.preventDefault();
      }
    },
    onPointerUp(e) {
      if (!this.pointerActive) return;
      const dx = this.lastX - this.startX;
      const absDx = Math.abs(dx);
      const dy = e.clientY - this.startY;
      const horizontalEnough = absDx > Math.abs(dy) * 1.732;
      const passedThreshold = absDx > 40;

      if (this.isSwiping && horizontalEnough && passedThreshold) {
        if (dx < 0) {
          this.goToNextAyah();
        } else {
          this.goToPreviousAyah();
        }
      }

      this.pointerActive = false;
      this.isSwiping = false;
      try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) {}

      // Suppress the next click if a swipe occurred
      if (this.suppressClick) {
        const el = this.$refs.targetElement;
        const handler = (evt) => {
          evt.stopPropagation();
          evt.preventDefault();
        };
        // One-tick listener to swallow the immediate click
        el.addEventListener('click', handler, { capture: true, once: true });
      }
      this.suppressClick = false;
    },
    onPointerCancel() {
      this.pointerActive = false;
      this.isSwiping = false;
      this.suppressClick = false;
    },
    goToNextAyah() {
      // Emit so parent can handle fast navigation without UI blocking
      this.$emit('next-ayah');
    },
    goToPreviousAyah() {
      // Emit so parent can handle fast navigation without UI blocking
      this.$emit('prev-ayah');
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
  /* Allow vertical scrolling; enable fast, conflict-free horizontal swipes */
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
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
