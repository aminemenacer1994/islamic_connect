<template>
  <audio
    v-if="information != null"
    :src="information.ayah.audio_links"
    class="w-100 custom-audio"
    autoplay
    loop
    controls
  ></audio>
</template>

<script>
export default {
  name: "BottomAudioPlayer",
  props: ["information"],
};
</script>

<style scoped>
/* Add custom styles here */
</style>
