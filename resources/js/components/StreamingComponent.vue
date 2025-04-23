<template>
  <div class="container py-4">
    <h3 class="text-center fw-bold display-4 mb-4">Live Islamic TV Channels</h3>
    <p class="text-center container mb-4 lead d-none d-md-block">
      Watch live broadcasts from the holy cities of Makkah and Madinah. Experience continuous Quran recitation, live
      prayers, and spiritual reflections from the heart of Islam.
    </p>

    <!-- Scrollable Row Wrapper with visible scrollbar -->
    <div style="overflow-x: auto;" class="pb-2">
      <!-- Scrollable Horizontal Row -->
      <div class="row row-cols-1 row-cols-md-2 g-4 flex-nowrap" style="display: flex;">
        <div class="col" v-for="(channel, index) in filteredChannels" :key="index" style="min-width: 320px;">
          <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden" @click="playChannel(channel)"
            style="cursor: pointer; background-color: #fff;">
            <img :src="channel.thumbnail" :alt="`${channel.name} thumbnail`" class="w-100"
              style="object-fit: contain; height: 250px;">
            <div class="card-body p-4 text-center">
              <h5 class="card-title fw-bold display-6 text-dark text-truncate" style="max-width: 100%;">
                {{ channel.name }}
              </h5>
              <p class="card-text text-muted text-wrap"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
                {{ channel.description }}
              </p>
              <button class="form-control" @click.stop="playChannel(channel)"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white"
                type="submit">
                <b class="pt-3 pb-3">Display Channel</b>
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
        {
          name: 'Islam Channel (English)',
          streamUrlHD: 'https://live.islamchannel.tv/live11/islamtv_english/bitrate1.isml/live.m3u8',
          streamUrlSD: 'https://live.islamchannel.tv/live11/islamtv_english/bitrate1.isml/live.m3u8',
          thumbnail: '/images/islam_channel_en.png',
          description: 'UK-based channel offering news, documentaries, and educational Islamic content.',
          languages: ['english']
        },
        {
          name: 'Islam Channel Urdu',
          streamUrlHD: 'https://live-islamtv-urdu.simplestreamcdn.com/live7/islamtv_urdu/bitrate1.isml/live.m3u8',
          streamUrlSD: 'https://live-islamtv-urdu.simplestreamcdn.com/live7/islamtv_urdu/bitrate1.isml/live.m3u8',
          thumbnail: '/images/islam_channel_urdu.png',
          description: 'Urdu-language Islamic programming for Muslims in the UK and abroad.',
          languages: ['urdu']
        },
        {
          name: 'British Muslim TV',
          streamUrlHD: 'https://api.visionip.tv/live/ASHTTP/visiontvuk-international-britishmuslimtv-hsslive-25f-16x9-MB/playlist.m3u8',
          streamUrlSD: 'https://api.visionip.tv/live/ASHTTP/visiontvuk-international-britishmuslimtv-hsslive-25f-16x9-MB/playlist.m3u8',
          thumbnail: '/images/british_muslim_tv.png',
          description: 'Cultural, lifestyle, and religious content for British Muslims.',
          languages: ['english']
        },
        {
          name: 'Eman Channel',
          streamUrlHD: 'https://ap02.iqplay.tv:8082/iqb8002/3m9n/playlist.m3u8',
          streamUrlSD: 'https://ap02.iqplay.tv:8082/iqb8002/3m9n/playlist.m3u8',
          thumbnail: '/images/eman_channel.png',
          description: 'Educational and spiritual programming for UK Muslims.',
          languages: ['english']
        },
        {
          name: 'Fadak TV',
          streamUrlHD: 'https://ythls.armelin.one/channel/UC2ZoBzeCXrZcMz4f82eMe-g.m3u8',
          streamUrlSD: 'https://ythls.armelin.one/channel/UC2ZoBzeCXrZcMz4f82eMe-g.m3u8',
          thumbnail: '/images/fadak_tv.png',
          description: 'Shia Islamic teachings and discussions from Fadak TV.',
          languages: ['english']
        },
        {
          name: 'Noor TV',
          streamUrlHD: 'http://45.76.186.114:8080/hls/noortv.m3u8',
          streamUrlSD: 'http://45.76.186.114:8080/hls/noortv.m3u8',
          thumbnail: '/images/noor_tv.png',
          description: 'UK-based religious education and cultural programs by Pir Alauddin Siddiqui.',
          languages: ['urdu', 'english']
        },
        {
          name: 'Al Quran Al Kareem TV',
          streamUrlHD: 'https://edge.taghtia.com/sa/7.m3u8',
          streamUrlSD: 'https://edge.taghtia.com/sa/7.m3u8',
          thumbnail: '/images/al_quran_al_kareem_tv.png',
          description: 'Live broadcast from Masjid al-Haram in Mecca, featuring Quran recitations.',
          languages: ['arabic']
        },
        {
          name: 'Iqra TV',
          streamUrlHD: 'https://ap02.iqplay.tv:8082/iqb8002/iqratv/playlist.m3u8',
          streamUrlSD: 'https://ap02.iqplay.tv:8082/iqb8002/iqratv/playlist.m3u8',
          thumbnail: '/images/iqra_tv.png',
          description: 'UK-based Islamic channel offering educational and religious content.',
          languages: ['english', 'urdu']
        },
        {
          name: 'Hidayat TV',
          streamUrlHD: 'https://ap02.iqplay.tv:8082/iqb8002/hidayattv/playlist.m3u8',
          streamUrlSD: 'https://ap02.iqplay.tv:8082/iqb8002/hidayattv/playlist.m3u8',
          thumbnail: '/images/hidayat_tv.png',
          description: 'Shia Islamic channel broadcasting religious and educational programs.',
          languages: ['urdu', 'english']
        },
        {
          name: 'Huda TV',
          streamUrlHD: 'https://ap02.iqplay.tv:8082/iqb8002/hudatv/playlist.m3u8',
          streamUrlSD: 'https://ap02.iqplay.tv:8082/iqb8002/hudatv/playlist.m3u8',
          thumbnail: '/images/huda_tv.png',
          description: 'English-language Islamic channel offering educational programs.',
          languages: ['english']
        }
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
