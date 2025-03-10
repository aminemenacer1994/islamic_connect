<template>
  <div>
    <h1>Islamic TV Channels</h1>
    <div v-if="loading">Loading channels...</div>
    <div v-else>
      <div v-for="channel in channels" :key="channel.id" class="channel">
        <h2>{{ channel.name }}</h2>
        <div v-if="channel.url">
          <video
            ref="videoPlayer"
            controls
            width="600"
            height="400"
            class="video-player"
          ></video>
        </div>
        <p v-else>Stream not available for {{ channel.name }}.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Hls from "hls.js";

export default {
  data() {
    return {
      channels: [], // Stores the list of Islamic channels
      loading: true, // Loading state
    };
  },
  async created() {
    try {
      // Fetch the list of all channels
      const response = await fetch("https://iptv-org.github.io/api/channels.json");
      const allChannels = await response.json();

      // Filter Islamic channels with valid URLs
      this.channels = allChannels
        .filter((channel) => {
          return (
            (channel.category === "Religious" || // Filter by category
              channel.name.toLowerCase().includes("islamic") || // Filter by name
              channel.name.toLowerCase().includes("quran") ||
              channel.name.toLowerCase().includes("sunnah")) &&
            channel.url && // Ensure the channel has a valid URL
            channel.url.startsWith("http") // Ensure the URL is valid
          );
        })
        .slice(0, 10); // Limit to 10 channels for demonstration

      this.loading = false;
    } catch (error) {
      console.error("Error fetching channels:", error);
      this.loading = false;
    }
  },
  mounted() {
    // Attach HLS.js to video elements for .m3u8 streams
    this.$nextTick(() => {
      this.channels.forEach((channel, index) => {
        if (channel.url) {
          const video = this.$refs.videoPlayer[index];
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(channel.url);
            hls.attachMedia(video);
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            // Fallback for native HLS support (e.g., Safari)
            video.src = channel.url;
          }
        }
      });
    });
  },
};
</script>

<style scoped>
.channel {
  margin-bottom: 20px;
}
.video-player {
  max-width: 100%;
  border: 1px solid #ccc;
}
</style>