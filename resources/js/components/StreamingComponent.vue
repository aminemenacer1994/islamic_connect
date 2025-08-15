<template>
  <div class="container py-4">
    <h1 class="text-center fw-bold display-4 mb-4">Live Islamic TV Channels</h1>
    <p class="text-center container mb-4 lead d-none d-md-block">
      The Seerah Timeline provides an insightful journey through the life of Prophet Muhammad (PBUH). It offers users an
      accessible and interactive way to explore key moments in Islamic history, helping them better understand the
      significance of each event.
    </p>


    <!-- Grid Wrapper -->
    <div class="pb-2 ">
      <!-- Bootstrap Grid Row -->
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">
        <div class="col" v-for="(channel, index) in filteredChannels" :key="index">
          <div class="card h-100 shadow-md rounded-4 overflow-hidden" @click="playChannel(channel)"
            style="cursor: pointer; border: 1px solid gray; background-color: #fff;">
            <img :src="channel.thumbnail" :alt="`${channel.name} thumbnail`" class="w-100"
              style="object-fit: contain; height: 250px;">
            <div class="card-body p-4 text-center">
              <h5 class=" fw-bold display-6 text-dark text-truncate"
                style="max-width: 100%;text-align: center;">
                {{ channel.name }}
              </h5>
              <p class="card-text text-muted text-wrap"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
                {{ channel.description }}
              </p>
              <button class="form-control" @click.stop="playChannel(channel)"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                type="submit">
                <b class="text-center w-100">Display Channel</b>
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>





    <div v-if="selectedChannel" class="mt-5 mb-5 px-3" ref="playerSection" :class="{ 'mini-screen': isMiniScreen }">
      <!-- Now Playing Section -->
      <div class="text-center mb-4">
        <h6 class="fw-bold display-6 text-dark">🔴 Now Playing: <span class="text-dark">{{ selectedChannel.name
        }}</span></h6>
      </div>

      <button class="btn btn-outline-secondary mb-3 rounded-pill shadow-md" @click="showFilters = !showFilters">
        {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
      </button>

      <!-- Filter Controls Row -->
      <div class="row mb-4 g-3" v-if="showFilters">
        <div class="col-md-6">
          <label for="qualitySelect" class="form-label fw-semibold">Stream Quality:</label>
          <select id="qualitySelect" v-model="manualQuality" class="form-select shadow-sm rounded-pill">
            <option value="auto">Auto</option>
            <option value="hd">HD</option>
            <option value="sd">SD</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="ratioSelect" class="form-label fw-semibold">Video Ratio:</label>
          <select id="ratioSelect" v-model="videoRatio" class="form-select shadow-sm rounded-pill">
            <option value="16x9">16:9 (Widescreen)</option>
            <option value="21x9">21:9 (Ultrawide)</option>
            <option value="4x3">4:3 (Standard)</option>
            <option value="1x1">1:1 (Square)</option>
          </select>
        </div>
        <!-- <div class="col-md-4">
          <label for="languageSelect" class="form-label fw-semibold">Language:</label>
          <select id="languageSelect" v-model="selectedLanguage" class="form-select shadow-sm rounded-pill">
            <option value="all">All Languages</option>
            <option value="arabic">Arabic</option>
            <option value="english">English</option>
            <option value="urdu">Urdu</option>
            <option value="french">French</option>
          </select>
        </div> -->
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
      showFilters: true,
      manualQuality: 'auto',
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
          streamUrlHD: 'https://live.gomakkah.com/makkah/makkah.m3u8',
          streamUrlSD: 'https://live.gomakkah.com/makkah/makkah.m3u8',
          thumbnail: '/images/makkah_icon.png',
          description: 'Makkah TV broadcasts 24/7 live from Masjid al-Haram. Watch the Kaaba, live prayers, Taraweeh during Ramadan, and Hajj events from the heart of Islam.',
          languages: ['arabic']
        },
        {
          name: 'Madinah TV',
          streamUrlHD: 'https://live.gomakkah.com/madinah/madinah.m3u8',
          streamUrlSD: 'https://live.gomakkah.com/madinah/madinah.m3u8',
          thumbnail: '/images/madina_tv1.png',
          description: 'Madinah TV streams live from Masjid an-Nabawi. Tune in to see the resting place of the Prophet Muhammad ﷺ, prayers, and peaceful views of the mosque.',
          languages: ['arabic', 'english']
        },
        {
          name: 'Eman Channel',
          streamUrlHD: 'https://ap02.iqplay.tv:8082/iqb8002/3m9n/playlist.m3u8',
          streamUrlSD: 'https://ap02.iqplay.tv:8082/iqb8002/3m9n/playlist.m3u8',
          thumbnail: '/images/eman_img.png',
          description: 'Eman Channel provides Islamic educational content, live events, and discussions relevant to the Muslim community in the UK.',
          languages: ['english']
        },
        {
          name: 'Ahlulbayt TV',
          streamUrlHD: 'https://cdn5.iqsat.net/iqb02/35fae546b99b61a038d52353487e8190.sdp/playlist.m3u8',
          streamUrlSD: 'https://cdn5.iqsat.net/iqb02/35fae546b99b61a038d52353487e8190.sdp/playlist.m3u8',
          thumbnail: '/images/ahlubayt_tv.png',
          description: 'Ahlulbayt TV is the first Shia Islamic channel. It delivers content based on the teachings of the Prophet Muhammad (PBUH).',
          languages: ['english']
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
div[style*="overflow-x: overflow"]::-webkit-scrollbar {
  display: none;
}

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
    font-size: 2rem !important;
    float: center;
  }

  .card-body {
    padding: 1rem !important;
  }

  .form-select {
    font-size: 0.9rem;
  }
}
</style>
