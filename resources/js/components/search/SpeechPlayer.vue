<template>
  <div>
    <i @click="toggleSpeech" style="cursor: pointer;" aria-placeholder="Play translation audio" :class="isPlaying ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'" class="bi ml-2 mr-2 h3 mic"></i>
    <audio ref="audio"></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlaying: false,
      utterance: new SpeechSynthesisUtterance()
    };
  },
  methods: {
    toggleSpeech() {
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        this.$refs.audio.src = URL.createObjectURL(new Blob([this.utterance.text], { type: 'text/plain' }));
        speechSynthesis.speak(this.utterance);
      } else {
        speechSynthesis.cancel();
      }
    }
  }
};
</script>
