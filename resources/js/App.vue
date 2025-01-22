<template>
  <div id="app">
    <!-- Play/Pause Button -->
    <button @click="toggleAudio" class="play-button">
      {{ isPlaying ? "Pause" : "Play" }} Audio
    </button>
  </div>
</template>

<script defer>
export default {
  name: "App",
  data() {
    return {
      information: {
        translation: '',
        transliteration: '', // Example translated text
      },
      audioElement: null,
      isPlaying: false,
      tafseer: '',
      surat: [],
      ayat: [],
      tafseers: [],
    };
  },
  mounted() {
    console.log("App component mounted."); // Debugging log
    if (this.information && this.information.ayah && this.information.ayah.audio_links) {
      console.log("Audio URL:", this.information.ayah.audio_links); // Debugging log

      // Create the audio element and configure it
      this.audioElement = document.createElement("audio");
      this.audioElement.src = this.information.ayah.audio_links;
      this.audioElement.className = "custom-audio";
      this.audioElement.loop = true;
      this.audioElement.controls = true;
      document.body.appendChild(this.audioElement);

      console.log("Audio player appended to body."); // Debugging log
    } else {
      console.warn("Information or audio link is missing!");
    }
  },
  methods: {
    toggleAudio() {
      console.log("Toggle Audio clicked."); // Debugging log
      if (this.audioElement) {
        if (this.isPlaying) {
          this.audioElement.pause();
        } else {
          this.audioElement.play().catch((error) => {
            console.warn("Autoplay prevented by browser; user interaction required.");
          });
        }
        this.isPlaying = !this.isPlaying;
      }
    },
  },
};
</script>

<style>
/* Style for play button */
.play-button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
}

/* Ensures the audio player is fixed at the bottom and full-width */
.custom-audio {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000; /* Stays above other content */
}
</style>