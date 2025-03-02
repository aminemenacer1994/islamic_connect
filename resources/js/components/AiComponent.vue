<template>
  <div>
    <h1>Islamic Live Streams (Makkah & Madinah)</h1>

  </div>
</template>

<script>
// Import Hls.js for HLS stream handling
import Hls from 'hls.js';

export default {
  data() {
    return {
      channels: [],  // To hold live stream channels data
      loading: true,  // Flag to show loading state
      error: null,    // Error message if something goes wrong
    };
  },
  created() {
    this.fetchChannels();  // Fetch channels when the component is created
  },
  mounted() {
    this.setupStreams();  // Setup HLS streams after the component is mounted
  },
  methods: {
    async fetchChannels() {
      try {
        const response = await fetch('https://mp3quran.net/api/v3/live-tv');
        const data = await response.json();

        console.log('API Response:', data);

        if (data && data.livetv) {
          this.channels = data.livetv;  // Update channels array with live stream data
        } else {
          this.error = 'No channel data available.';
        }
      } catch (error) {
        console.error('Error fetching live streams:', error);
        this.error = 'Failed to fetch data. Please try again later.';
      } finally {
        this.loading = false;  // Hide loading indicator
      }
    },
    setupStreams() {
      // Check if HLS.js is supported
      if (Hls.isSupported()) {
        this.channels.forEach(channel => {
          const videoElement = document.getElementById('video_' + channel.id);
          console.log('videoElement:', videoElement);  // Check if video element is found
          
          if (videoElement) {
            const hls = new Hls();
            hls.loadSource(channel.url);

            hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
              console.log(`Stream loaded for ${channel.name}`);
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
              console.error(`HLS Error on ${channel.name}:`, data);
              this.error = `Error loading stream for ${channel.name}.`;
            });

            // Attach the media (video element)
            hls.attachMedia(videoElement);

            // Event listeners for state change (debugging)
            hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
              console.log(`Level switched to ${data.level} for ${channel.name}`);
            });

            hls.on(Hls.Events.FRAG_LOADED, (event, data) => {
              console.log(`Fragment loaded for ${channel.name}:`, data);
            });
          } else {
            console.error('No video element found for', channel.name);
            this.error = `Video element not found for ${channel.name}`;
          }
        });
      } else {
        console.error("HLS.js is not supported by your browser.");
        this.error = "HLS.js is not supported by your browser. Please try in a different browser.";
      }
    },
  },
};
</script>

<style scoped>
.channel {
  margin: 20px 0;
}

.channel h3 {
  font-size: 1.5em;
}

.channel a {
  color: #2b6cb0;
  text-decoration: none;
}

.channel a:hover {
  text-decoration: underline;
}

.error {
  color: red;
  font-weight: bold;
}

.video-container {
  margin-top: 20px;
}
</style>
