<template>
  <div class="container my-4">
    <h2 class="text-center mb-4">Islamic Animated Videos</h2>

    <!-- Search Bar -->
    <div class="input-group mb-3">
      <input v-model="query" @keyup.enter="searchVideos" type="text" class="form-control" placeholder="Search Islamic videos...">
      <button class="btn btn-primary" @click="searchVideos">Search</button>
    </div>

    <!-- Suggested Keywords -->
    <div class="mb-3">
      <span v-for="(keyword, index) in suggestedKeywords" :key="index" class="badge bg-secondary me-2 pointer"
            @click="applySuggested(keyword)">
        {{ keyword }}
      </span>
    </div>

    <!-- Video Grid -->
    <div class="row">
      <div v-for="video in videos" :key="video.id" class="col-md-3 mb-4">
        <div class="card">
          <video :src="video.url" class="card-img-top" controls muted loop playsinline style="max-height: 200px;"></video>
          <div class="card-body text-center">
            <button class="btn btn-sm btn-outline-primary me-2" @click="expandVideo(video.url)">Expand</button>
            <a :href="`https://wa.me/?text=${encodeURIComponent(video.url)}`" target="_blank" class="btn btn-sm btn-outline-success">
              Share
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: page === 1 }">
          <button class="page-link" @click="prevPage">Previous</button>
        </li>
        <li class="page-item disabled"><span class="page-link">Page {{ page }}</span></li>
        <li class="page-item">
          <button class="page-link" @click="nextPage">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videos: [],
      query: 'islamic animation',
      page: 1,
      perPage: 9,
      suggestedKeywords: ['quran', 'prophet', 'islamic prayer', 'hijab', 'mosque', 'ramadan'],
    };
  },
  mounted() {
    this.searchVideos();
  },
  methods: {
    async searchVideos() {
      const apiKey = 'dhOLH00j9E1bBV53cMmEpaHPnrRR3WGzl3vRGXnPNbquONCjpZeKEr3f';
      const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(this.query)}&per_page=${this.perPage}&page=${this.page}`;

      try {
        const response = await fetch(url, {
          headers: { Authorization: apiKey }
        });

        const data = await response.json();
        // Filter only short videos around 15 seconds
        this.videos = data.videos.filter(v => v.duration <= 20).map(video => ({
          id: video.id,
          url: video.video_files.find(file => file.quality === 'sd' && file.width <= 640)?.link || video.video_files[0].link,
        }));
      } catch (error) {
        console.error('Error fetching videos:', error);
        this.videos = [];
      }
    },
    applySuggested(keyword) {
      this.query = keyword;
      this.page = 1;
      this.searchVideos();
    },
    expandVideo(url) {
      const win = window.open();
      win.document.write(`
        <video src="${url}" controls autoplay style="width:100%; height:100vh;"></video>
      `);
    },
    nextPage() {
      this.page++;
      this.searchVideos();
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.searchVideos();
      }
    },
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
video {
  border-radius: 0.25rem;
}
.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
</style>
