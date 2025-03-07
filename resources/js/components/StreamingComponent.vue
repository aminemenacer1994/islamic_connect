<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Live Streaming</h1>
    <div class="row">
      <div class="col-md-6 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Medina Live Stream</h5>
            <video ref="medinaVideo" controls class="w-100" v-show="medinaStreamUrl"></video>
            <p v-if="!medinaStreamUrl">Loading Medina stream...</p>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Makkah Live Stream</h5>
            <video ref="makkahVideo" controls class="w-100" v-show="makkahStreamUrl"></video>
            <p v-if="!makkahStreamUrl">Loading Makkah stream...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Hls from 'hls.js';

export default {
  data() {
    return {
      medinaStreamUrl: null,
      makkahStreamUrl: null,
    };
  },
  async created() {
    try {
      // Replace with your real API endpoint
      const response = await fetch('https://api.real-live-streams.com/streams');
      const data = await response.json();
      this.medinaStreamUrl = data.medina;
      this.makkahStreamUrl = data.makkah;

      this.$nextTick(() => {
        if (this.medinaStreamUrl) {
          this.loadVideo(this.$refs.medinaVideo, this.medinaStreamUrl);
        }
        if (this.makkahStreamUrl) {
          this.loadVideo(this.$refs.makkahVideo, this.makkahStreamUrl);
        }
      });
    } catch (error) {
      console.error('Error fetching live streams:', error);
    }
  },
  methods: {
    loadVideo(videoElement, streamUrl) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(streamUrl);
        hls.attachMedia(videoElement);

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error('HLS Error:', data);
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.error('Network error. Trying to recover...');
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.error('Media error. Trying to recover...');
                hls.recoverMediaError();
                break;
              default:
                console.error('Unrecoverable error. Stopping playback.');
                hls.destroy();
                break;
            }
          }
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log('Manifest parsed, playing video...');
          videoElement.play();
        });
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (e.g., Safari)
        videoElement.src = streamUrl;
        videoElement.addEventListener('loadedmetadata', () => {
          console.log('Video metadata loaded, playing video...');
          videoElement.play();
        });
      } else {
        console.error('HLS is not supported in this browser.');
      }
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}
video {
  border-radius: 8px;
}
</style>