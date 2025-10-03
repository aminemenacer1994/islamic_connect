<template>
  <div class="offcanvas offcanvas-end custom-offcanvas" id="offcanvasRight" tabindex="-1" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <h2><b>Speech Settings</b></h2>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="tab-content mt-3" id="myTabContent">
        <div class="tab-pane fade show active" id="SpeechSettings" role="tabpanel" aria-labelledby="tab1-tab">
          <!-- Voice Selection -->
          <div class="row container mb-3">
            <h5 class="form-label pb-2"><b>Voices:</b></h5>
            <select 
              id="voiceSelect" 
              v-model="selectedVoiceName" 
              class="form-control"
            >
              <option v-for="voice in voices" :key="voice.name" :value="voice.name">
                {{ voice.name }} ({{ voice.lang }})
              </option>
            </select>
          </div>
          <hr />

          <!-- Rate and Pitch Controls -->
          <div class="row pt-3">
            <h5 class="form-label pb-2"><b>Rate & Pitch:</b></h5>
            <div class="col">
              <label>
                Rate: <input 
                  class="rate" 
                  type="range" 
                  min="0.5" 
                  max="2" 
                  step="0.1" 
                  v-model="rate"
                />
                {{ rate.toFixed(1) }}
              </label>
            </div>
            <div class="col">
              <label>
                Pitch: <input 
                  class="pitch" 
                  type="range" 
                  min="0.5" 
                  max="2" 
                  step="0.1" 
                  v-model="pitch"
                />
                {{ pitch.toFixed(1) }}
              </label>
            </div>
          </div>
          <hr class="container" />

          <!-- Font Size Controls -->
          <div class="row pt-3">
            <h5 class="form-label pb-2"><b>Font size:</b></h5>
            <div class="col">
              <label>
                Increase size: <i class="bi bi-plus-circle-fill h3 pb-1 custom-icon-increase" @click="increaseFontSize"></i>
                {{ formattedFontSize }}
              </label>
            </div>
            <div class="col">
              <label>
                Decrease size: <i class="bi bi-dash-circle-fill h3 pb-1 custom-icon-decrease" @click="decreaseFontSize"></i>
                {{ formattedFontSize }}
              </label>
            </div>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="alert alert-success" role="alert">
            Settings saved successfully!
          </div>

          <!-- Save and Close Buttons -->
          <div class="d-flex w-100 justify-content-end mt-3">
            <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="offcanvas" aria-label="Close">Close</button>
            <button type="button" class="btn btn-success" @click="saveSettings">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    voices: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    // Load and apply speech settings
    this.selectedVoiceName = localStorage.getItem('selectedVoiceName') || this.voices[0]?.name || '';
    this.rate = parseFloat(localStorage.getItem('rate')) || 1;
    this.pitch = parseFloat(localStorage.getItem('pitch')) || 1;
    this.fontSize = parseFloat(localStorage.getItem('ayahFontSize')) || 1;

    this.applyFontSize();
  },
  data() {
    return {
      selectedVoiceName: localStorage.getItem('selectedVoiceName') || '',
      rate: parseFloat(localStorage.getItem('rate')) || 1,
      pitch: parseFloat(localStorage.getItem('pitch')) || 1,
      fontSize: parseFloat(localStorage.getItem('ayahFontSize')) || 1,
      successMessage: false,
    };
  },
  computed: {
    formattedFontSize() {
      return this.fontSize.toFixed(1);
    },
  },
  methods: {
    saveSettings() {
      localStorage.setItem('selectedVoiceName', this.selectedVoiceName);
      localStorage.setItem('rate', this.rate);
      localStorage.setItem('pitch', this.pitch);
      localStorage.setItem('ayahFontSize', this.fontSize);
      this.successMessage = true;
      setTimeout(() => (this.successMessage = false), 3000);
    },
    increaseFontSize() {
      if (this.fontSize < 2) {
        this.fontSize += 0.1;
        this.applyFontSize();
      }
    },
    decreaseFontSize() {
      if (this.fontSize > 0.5) {
        this.fontSize -= 0.1;
        this.applyFontSize();
      }
    },
    applyFontSize() {
      document.documentElement.style.setProperty('--font-size', `${this.fontSize}em`);
    },
  },
  mounted() {
    // Apply font size on load
    this.applyFontSize();
  },
};
</script>

<style scoped>
.custom-offcanvas {
  max-width: 400px;
}
.custom-icon-increase,
.custom-icon-decrease {
  cursor: pointer;
}
</style>
