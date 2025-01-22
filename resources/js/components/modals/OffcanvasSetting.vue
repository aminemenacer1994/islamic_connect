<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasSetting"
    aria-labelledby="offcanvasSettingLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasSettingLabel">
        Voice Settings
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <!-- Rate Control -->
      <div class="mb-3">
        <label for="rate" class="form-label">Rate</label>
        <input
          v-model="rate"
          type="range"
          class="form-range"
          id="rate"
          min="0.1"
          max="2"
          step="0.1"
        />
        <span>{{ rate }}</span>
      </div>

      <!-- Pitch Control -->
      <div class="mb-3">
        <label for="pitch" class="form-label">Pitch</label>
        <input
          v-model="pitch"
          type="range"
          class="form-range"
          id="pitch"
          min="0"
          max="2"
          step="0.1"
        />
        <span>{{ pitch }}</span>
      </div>

      <!-- Voice Selection -->
      <div class="mb-3">
        <label for="voiceSelect" class="form-label">Select Voice</label>
        <select
          v-model="selectedVoiceName"
          class="form-select"
          id="voiceSelect"
          @change="changeVoice(selectedVoiceName)"
        >
          <option disabled value="">Select a Voice</option>
          <option v-for="voice in voices" :key="voice.name" :value="voice.name">
            {{ voice.name }}
          </option>
        </select>
      </div>

      <!-- Save Settings Button -->
      <button @click="saveSettings" class="btn btn-primary">
        Save Settings
      </button>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="alert alert-success mt-3"
        role="alert"
      >
        Settings saved successfully!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rate: 1, // Default rate
      pitch: 1, // Default pitch
      voices: [], // Array to hold the voices
      selectedVoiceName: '', // Selected voice name
      successMessage: false, // Flag to show success message
    };
  },
  mounted() {
    // Load voices initially
    this.loadVoices();

    // Listen for voices change event
    window.speechSynthesis.onvoiceschanged = this.loadVoices;

    // Load settings from local storage if available
    const savedVoiceName = localStorage.getItem('selectedVoice');
    const savedRate = localStorage.getItem('rate');
    const savedPitch = localStorage.getItem('pitch');

    if (savedVoiceName) this.selectedVoiceName = JSON.parse(savedVoiceName);
    if (savedRate) this.rate = parseFloat(savedRate);
    if (savedPitch) this.pitch = parseFloat(savedPitch);
  },
  methods: {
    loadVoices() {
      // Get the available voices
      this.voices = window.speechSynthesis.getVoices();
      
      // If voices are empty (for some browsers), retry loading voices
      if (this.voices.length === 0) {
        setTimeout(this.loadVoices, 1000); // Retry after 1 second
      } else {
        this.selectedVoiceName = this.selectedVoiceName || this.voices[0]?.name;
      }
    },
    changeVoice(voiceName) {
      // Update the selected voice
      this.selectedVoiceName = voiceName;
      localStorage.setItem('selectedVoice', JSON.stringify(voiceName));
    },
    saveSettings() {
      // Save settings to local storage
      localStorage.setItem('rate', this.rate);
      localStorage.setItem('pitch', this.pitch);
      localStorage.setItem('selectedVoice', JSON.stringify(this.selectedVoiceName));

      // Show success message
      this.successMessage = true;

      // Close the off-canvas after 2 seconds
      setTimeout(() => {
        this.successMessage = false;

        // Close the offcanvas using Bootstrap's API
        const offcanvasElement = document.getElementById('offcanvasSetting');
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (offcanvasInstance) {
          offcanvasInstance.hide();
        }
      }, 2000); // 2-second delay
    },
  },
};
</script>

<style scoped>
/* Add custom styling here */
</style>
