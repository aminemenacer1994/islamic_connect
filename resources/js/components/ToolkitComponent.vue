<template>
  <div class="container py-4">
    <h3 class="text-center fw-bold display-4 mb-4">Islamic Utility Toolkit</h3>
    <p class="text-center container mb-4 lead d-none d-md-block">
      The Islamic Utility Toolkit is a comprehensive digital suite designed to support Muslims in their daily religious,
      educational, and spiritual needs. It typically includes a collection of tools and features that facilitate easier
      access to Islamic practices and information.
    </p>

    <!-- Grid Wrapper -->
    <div class="pb-2">
      <div class="row g-4">
        <div class="col-md-6 col-lg-4">
          <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden"
            style="cursor: pointer; background-color: #fff;">
            <img src="/images/pt1.png" alt="Prayer Times" class="w-100" style="object-fit: contain;" />
            <div class="p-3">
              <h5 class="mb-2 fw-bold display-6 text-dark">Madinah TV</h5>
              <p class="card-text text-muted text-wrap"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Eman Channel provides Islamic
                educational content.</p>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4">
          <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden"
            style="cursor: pointer; background-color: #fff;">
            <img src="/images/madina_tv1.png" alt="Madinah TV" class="w-100" style="object-fit: contain;" />
            <div class="p-3">
              <h5 class="mb-2 fw-bold display-6 text-dark">Madinah TV</h5>
              <p class="card-text text-muted text-wrap"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Eman Channel provides Islamic
                educational content.</p>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4">
          <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden"
            style="cursor: pointer; background-color: #fff;">
            <img src="/images/eman_img.png" alt="Eman Channel" class="w-100" style="object-fit: contain;" />
            <div class="p-3">
              <h5 class="mb-2 fw-bold display-6 text-dark">Eman Channel</h5>
              <p class="card-text text-muted text-wrap"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Eman Channel provides Islamic
                educational content.</p>
            </div>
          </div>
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
      showPrayerInfo: false,
      showMadinahInfo: false,
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

  methods: {
    togglePrayerInfo() {
      this.showPrayerInfo = !this.showPrayerInfo;
    }
  },
  beforeUnmount() {
    if (this.hlsInstance) {
      this.hlsInstance.destroy()
    }
  },
}
</script>
<style>
.custom-card {
  height: 100%;
  /* Adjust height as needed */
}

.custom-card img {
  height: 180px;
  /* Fixed image height */
  object-fit: cover;
}
</style>
