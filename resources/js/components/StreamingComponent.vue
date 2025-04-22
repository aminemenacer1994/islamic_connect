<template>
  <div class="container py-4">
    <!-- Metadata for SEO and Social Sharing -->

    <Head>
      <title>Live Islamic TV Channels - Watch Makkah and Madinah Live</title>
      <meta name="description"
        content="Watch live Islamic TV channels from Makkah and Madinah. Stream Quran recitation, prayers from Masjid al-Haram and Masjid an-Nabawi, and Islamic programs in multiple languages.">

      <!-- Open Graph / Facebook -->
      <meta property="og:type" content="website">
      <meta property="og:url" content="https://yourdomain.com/live-channels">
      <meta property="og:title" content="Live Islamic TV Channels - Makkah & Madinah Live Stream">
      <meta property="og:description"
        content="Watch live broadcasts from the holy cities of Makkah and Madinah. Experience Quran recitation and prayers from the Two Holy Mosques.">
      <meta property="og:image" content="https://yourdomain.com/images/islamic-tv-social.jpg">

      <!-- Twitter -->
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:url" content="https://yourdomain.com/live-channels">
      <meta name="twitter:title" content="Live Islamic TV Channels - Makkah & Madinah Live Stream">
      <meta name="twitter:description"
        content="Watch live broadcasts from the holy cities of Makkah and Madinah. Experience Quran recitation and prayers from the Two Holy Mosques.">
      <meta name="twitter:image" content="https://yourdomain.com/images/islamic-tv-social.jpg">

      <!-- Canonical URL -->
      <link rel="canonical" href="https://yourdomain.com/live-channels">

      <!-- Structured Data (JSON-LD) -->
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Live Islamic TV Channels",
        "description": "Watch live Islamic TV channels from Makkah and Madinah",
        "url": "https://yourdomain.com/live-channels",
        "publisher": {
          "@type": "Organization",
          "name": "Your Organization Name",
          "logo": {
            "@type": "ImageObject",
            "url": "https://yourdomain.com/logo.png"
          }
        }
      }
      </script>
    </Head>
    <h3 class="text-center fw-bold display-4 mb-4">Live Islamic TV Channels</h3>
    <p class="text-center container mb-4 lead d-none d-md-block">
      Watch live broadcasts from the holy cities of Makkah and Madinah. Experience continuous Quran recitation, live
      prayers, and spiritual reflections from the heart of Islam.
    </p>



    <div class="row row-cols-1 row-cols-md-2 g-4">
      <!-- Rest of your channel cards code remains the same -->
      <div class="col" v-for="(channel, index) in filteredChannels" :key="index">
        <div class="card h-100 shadow-lg border-0 rounded-4 overflow-hidden" @click="playChannel(channel)"
          style="cursor: pointer; background-color: #fff;">
          <img :src="channel.thumbnail" :alt="`${channel.name} thumbnail`" class="w-100"
            style="object-fit: cover; height: 200px;">
          <div class="card-body p-4 text-center">
            <h5 class="card-title fw-bold display-6 text-dark">{{ channel.name }}</h5>
            <p class="card-text large text-muted">{{ channel.description }}</p>
            <button class="form-control" @click.stop="playChannel(channel)"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white"
              type="submit">
              <b class="pt-3 pb-3">Display Channel</b>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedChannel" class="mt-5 px-3" ref="playerSection" :class="{ 'mini-screen': isMiniScreen }">
      <!-- Now Playing Section -->
      <div class="text-center mb-4">
        <h6 class="fw-bold display-6 text-dark">🔴 Now Playing: <span class="text-dark">{{ selectedChannel.name
            }}</span></h6>
      </div>

      <!-- Filter Controls Row -->
      <div class="row mb-4 g-3">
        <div class="col-md-4">
          <label for="qualitySelect" class="form-label fw-semibold">Stream Quality:</label>
          <select id="qualitySelect" v-model="manualQuality" class="form-select shadow-sm rounded-pill">
            <option value="auto">Auto</option>
            <option value="hd">HD</option>
            <option value="sd">SD</option>
          </select>
        </div>
        <div class="col-md-4">
          <label for="ratioSelect" class="form-label fw-semibold">Video Ratio:</label>
          <select id="ratioSelect" v-model="videoRatio" class="form-select shadow-sm rounded-pill">
            <option value="16x9">16:9 (Widescreen)</option>
            <option value="21x9">21:9 (Ultrawide)</option>
            <option value="4x3">4:3 (Standard)</option>
            <option value="1x1">1:1 (Square)</option>
          </select>
        </div>
        <div class="col-md-4">
          <label for="languageSelect" class="form-label fw-semibold">Language:</label>
          <select id="languageSelect" v-model="selectedLanguage" class="form-select shadow-sm rounded-pill">
            <option value="all">All Languages</option>
            <option value="arabic">Arabic</option>
            <option value="english">English</option>
            <option value="urdu">Urdu</option>
            <option value="french">French</option>
          </select>
        </div>
      </div>

      <!-- Video Player Section -->
      <div class="shadow-lg overflow-hidden" style="max-width: 100%; margin: 0; padding: 0;">
        <div :class="`ratio ratio-${videoRatio}`" style="position: relative; margin: 0; padding: 0;">
          <video id="video" controls autoplay ref="video"
            style="border-radius: 15px; margin: 0; padding: 0; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"></video>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Hls from 'hls.js'

export default {
  name: 'LiveChannels',
  data() {
    return {
      userCountry: '',
      manualQuality: 'auto',
      videoRatio: '21x9',
      selectedLanguage: 'all',
      isLoading: false,
      streamError: false,
      selectedChannel: null,
      hlsInstance: null,
      channels: [
        {
          name: 'Makkah TV',
          streamUrlHD: 'https://win.holol.com/live/quran/playlist.m3u8',
          streamUrlSD: 'https://win.holol.com/live/quran/playlist.m3u8',
          thumbnail: '/images/makkah_icon.png',
          description: 'Makkah TV broadcasts 24/7 live from Masjid al-Haram. Watch the Kaaba, live prayers, Taraweeh during Ramadan, and Hajj events from the heart of Islam.',
          languages: ['arabic']
        },
        {
          name: 'Madinah TV',
          streamUrlHD: 'https://win.holol.com/live/sunnah/playlist.m3u8',
          streamUrlSD: 'https://win.holol.com/live/sunnah/playlist.m3u8',
          thumbnail: '/images/madina_tv1.png',
          description: 'Madinah TV streams live from Masjid an-Nabawi. Tune in to see the resting place of the Prophet Muhammad ﷺ, prayers, and peaceful views of the mosque.',
          languages: ['arabic', 'english']
        },
      ],
      geoQualityMap: ['US', 'CA', 'DE', 'SA', 'AE', 'UK', 'FR'],
      isMiniScreen: false,
      isDragging: false,
      initialX: 0,
      initialY: 0,
      currentX: 0,
      currentY: 0,
    }
  },
  computed: {
    filteredChannels() {
      if (this.selectedLanguage === 'all') {
        return this.channels;
      }
      return this.channels.filter(channel =>
        channel.languages && channel.languages.includes(this.selectedLanguage)
      );
    }
  },
  // Rest of your script remains the same
  mounted() {
    fetch('https://ipapi.co/json')
      .then((res) => res.json())
      .then((data) => {
        this.userCountry = data.country_code
      })
      .catch(() => {
        this.userCountry = ''
      })
  },
  methods: {
    playChannel(channel) {
      this.selectedChannel = channel
      this.isLoading = true
      this.streamError = false

      this.$nextTick(() => {
        const video = this.$refs.video
        if (!video) return

        video.pause()
        video.removeAttribute('src')

        if (this.hlsInstance) {
          this.hlsInstance.destroy()
        }

        let source = channel.streamUrlHD // default HD

        if (this.manualQuality === 'sd') {
          source = channel.streamUrlSD
        } else if (this.manualQuality === 'auto') {
          const useHD = this.geoQualityMap.includes(this.userCountry)
          source = useHD ? channel.streamUrlHD : channel.streamUrlSD
        }

        if (Hls.isSupported()) {
          this.hlsInstance = new Hls()
          this.hlsInstance.loadSource(source)
          this.hlsInstance.attachMedia(video)

          this.hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play()
            this.isLoading = false
          })

          this.hlsInstance.on(Hls.Events.ERROR, () => {
            this.streamError = true
            this.isLoading = false
          })
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = source
          video.play().then(() => {
            this.isLoading = false
          }).catch(() => {
            this.streamError = true
            this.isLoading = false
          })
        }

        setTimeout(() => {
          this.scrollToPlayer()
        }, 300)
      })
    },
    scrollToPlayer() {
      const el = this.$refs.playerSection
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    toggleScreenMode() {
      this.isMiniScreen = !this.isMiniScreen
    },
    startDrag(event) {
      this.isDragging = true
      this.initialX = event.clientX - this.currentX
      this.initialY = event.clientY - this.currentY
    },
    endDrag() {
      this.isDragging = false
    },
    dragVideo(event) {
      if (this.isDragging) {
        event.preventDefault()
        this.currentX = event.clientX - this.initialX
        this.currentY = event.clientY - this.initialY

        const video = this.$refs.video
        video.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`
      }
    },
  },
  beforeUnmount() {
    if (this.hlsInstance) {
      this.hlsInstance.destroy()
    }
  },
}
</script>

<style scoped>
body {
  background-color: #f8f9fa;
}


.card:hover {
  transform: translateY(-4px);
  transition: 0.3s ease;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.mini-screen {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 200px;
  height: 150px;
  z-index: 9999;
}

.mini-video-overlay {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.mini-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 576px) {
  h1 {
    font-size: 1.4rem;
  }

  .card-title {
    font-size: 1.1rem !important;
  }

  .card-body {
    padding: 1rem !important;
  }

  .form-select {
    font-size: 0.9rem;
  }
}
</style>
