```vue
<template>
  <div class="container py-6">
    <h1 class="display-4 fw-bold text-center mb-4">Islamic Audio Lectures</h1>
    <p class="text-center lead mb-5">
      Explore a collection of Islamic lectures by renowned scholars, delivering insights on faith, history, and spirituality.
    </p>

    <!-- Error Message -->
    <div v-if="errorMessage" class="alert alert-danger text-center">
      {{ errorMessage }}
      <button @click="retryFetch" class="btn btn-primary ms-2">Retry</button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Lecture Selection -->
    <div v-else class="container">
      <h2 class="fw-bold text-left mb-4">Available Lectures</h2>
      <div class="row">
        <div v-for="lecture in lectures" :key="lecture.id" class="col-md-3 col-sm-6 mb-4 text-center">
          <div class="card h-100 shadow-sm" @click="selectLecture(lecture)" style="cursor: pointer;">
            <img :src="lecture.coverImage" class="card-img-top" :alt="lecture.title" @error="handleImageError">
            <div class="card-body">
              <h5 class="card-title fw-bold">{{ lecture.title }}</h5>
              <p class="text-muted">{{ lecture.narrator }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lecture Details -->
    <div v-if="selectedLecture" ref="lectureDetailSection" class="mt-5">
      <hr class="my-4">
      <h2 class="display-5 fw-bold">{{ selectedLecture.title }}</h2>
      <div class="row">
        <div class="col-md-3">
          <img :src="selectedLecture.coverImage" class="img-fluid rounded" :alt="selectedLecture.title" alt="Surah Cover" @error="handleImageError">
        </div>
        <div class="col-md-9">
          <p class="text-muted lead">{{ selectedLecture.description }}</p>
          <p><strong>Narrator:</strong> {{ selectedLecture.narrator || 'Unknown' }}</p>
          <p><strong>Duration:</strong> {{ formatDuration(selectedLecture.totalDuration) }}</p>
          <p><strong>Segments:</strong> {{ selectedLecture.segmentCount }}</p>
        </div>
      </div>

      <!-- Playback Speed -->
      <div class="col-md-4 mb-3">
        <label for="playbackSpeed" class="form-label fw-bold">Playback Speed</label>
        <select id="playbackSpeed" class="form-select" v-model="playbackSpeed" @change="updateSpeed">
          <option value="0.5">0.5x</option>
          <option value="1.0" selected>1.0x</option>
          <option value="1.5">1.5x</option>
          <option value="2.0">2.0x</option>
        </select>
      </div>

      <!-- Filters -->
      <div class="row mb-4">
        <div class="col-md-6">
          <label for="genreFilter" class="form-label fw-bold">Genre</label>
          <select id="genreFilter" class="form-select" v-model="genreFilter" @change="filterLectures">
            <option value="">All Genres</option>
            <option value="Tafsir">Tafsir</option>
            <option value="Seerah">Seerah</option>
            <option value="Spirituality">Spirituality</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="durationFilter" class="form-label fw-bold">Duration</label>
          <select id="durationFilter" class="form-select" v-model="durationFilter" @change="filterLectures">
            <option value="">All Durations</option>
            <option value="short">Short (<1 hr)</option>
            <option value="medium">Medium (1–5 hrs)</option>
            <option value="long">Long (>5 hrs)</option>
          </select>
        </div>
      </div>

      <!-- Segments -->
      <div v-if="paginatedSegments.length" class="mt-4">
        <h3 class="fw-bold">Lecture Segments</h3>
        <div class="row row-cols-1 row-cols-md-2 g-4">
          <div v-for="(segment, index) in paginatedSegments" :key="segment.id" class="col">
            <div :class="['card', { 'border-primary': playingIndex === index }]" class="shadow-sm">
              <div class="card-body">
                <h4 class="card-title fw-bold">{{ segment.title }}</h4>
                <p class="text-muted">Duration: {{ formatDuration(segment.duration) }}</p>
                <p class="mb-2">Progress: {{ progress(segment.progress || 0).toFixed(1) }}%</p>
                <div class="d-flex justify-content-between">
                  <i class="bi bi-skip-backward-circle fs-4" @click="rewind(index)" title="Rewind 15s" data-bs-toggle="tooltip"></i>
                  <i class="bi bi-share fs-4" @click="share(segment)" title="Share" data-bs-toggle="tooltip"></i>
                  <i :class="['bi', isBookmarked(segment) ? 'bi-bookmark-fill' : 'bi-bookmark', 'fs-4']" @click="toggleBookmark(segment)" title="Bookmark" data-bs-toggle="tooltip"></i>
                  <i class="bi-arrow-right-circle" @click="fastForward(index)" title="Fast Forward 15s" data-bs-toggle="tooltip"></i>
                </div>
              </div>
              <audio v-if="segment.audioUrl" ref="audioPlayers" :src="segment.audioUrl" controls class="w-100" @play="handlePlay(index)" @pause="handlePause(index)" @ended="handleEnded(index)" @timeupdate="handleTimeUpdate(index, $event.target)" @error="handleAudioError(index)">
                Your browser does not support audio.
              </audio>
              <div v-else class="text-center text-danger p-3">
                Audio unavailable for this segment.
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <nav class="mt-2">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="navigatePage(currentPage - 1)">Previous</a>
            </li>
            <li v-for="page in pages" :key="page" class="page-item" :class="{ active: currentPage === page }">
              <a class="page-link" href="#" @click.prevent="navigatePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" @click.prevent="navigatePage(currentPage + 1)">Next</a>
            </li>
          </ul>
        </nav>
      </div>
      <div v-else-if="!loading" class="text-center text-muted mt-4">
        No segments found.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lectures: [],
      selectedLecture: null,
      paginatedSegments: [],
      playingIndex: null,
      playbackSpeed: 1.0,
      progress: {},
      loading: false,
      errorMessage: null,
      genreFilter: '',
      durationFilter: '',
      currentPage: 1,
      segmentsPerPage: 8,
      bookmarks: JSON.parse(localStorage.getItem('lectureBookmarks')) || [],
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.filteredSegments.length / this.segmentsPerPage);
    },
    pages() {
      return Array.from({ length: Math.min(this.totalPages, 8) }, (_, i) => i + 1);
    },
    filteredSegments() {
      if (!this.selectedLecture) return [];
      let segments = [...this.selectedLecture.segments];
      if (this.genreFilter) {
        segments = segments.filter(() => this.selectedLecture.genre === this.genreFilter);
      }
      if (this.durationFilter) {
        segments = this.applyFilter(segments);
      }
      return segments;
    },
  },

  methods: {
    async fetchLectures() {
      this.loading = true;
      this.errorMessage = null;
      try {
        const lectures = [];
        // Fetch Tafsir for Surahs 1–5
        for (let surah = 1; surah <= 5; surah++) {
          const response = await fetch(`https://api.alquran.cloud/v1/surah/${surah}/en.tafsir_mulk`);
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status} for Surah ${surah}`);
          }
          const data = await response.json();
          const surahData = data.data;
          // Map ayahs to lecture segments
          const segments = surahData.ayahs.map((ayah, i) => ({
            id: `surah-${surah}-ayah-${ayah.number}`,
            title: `Segment ${i + 1}: Ayah ${ayah.number}`,
            duration: 600, // Placeholder duration (replace with actual audio duration)
            audioUrl: null, // Replace with your hosted MP3 URL
            progress: 0,
          }));
          lectures.push({
            id: `surah-${surah}`,
            title: `Tafsir of Surah ${surahData.englishName}`,
            narrator: 'Ibn Muhammad',
            description: `Explanation of Surah ${surahData.englishName} based on Tafsir.`,
            coverImage: `https://via.placeholder.com/180x180?text=${surahData.englishName}`,
            genre: 'Tafsir',
            totalDuration: segments.length * 600, // Estimated
            segmentCount: segments.length,
            segments,
          });
        }
        this.lectures = lectures;
        await this.validateAudioUrls();
      } catch (error) {
        console.error('Error fetching lectures:', error);
        this.errorMessage = 'Failed to load lectures. Please check your connection.';
      } finally {
        this.loading = false;
      }
    },

    async validateAudioUrls() {
      for (const lecture of this.lectures) {
        for (const segment of lecture.segments) {
          if (!segment.audioUrl) continue;
          try {
            const response = await fetch(segment.audioUrl, { method: 'HEAD' });
            if (!response.ok) {
              segment.audioUrl = null;
            }
          } catch (error) {
            segment.audioUrl = null;
          }
        }
      }
    },

    selectLecture(lecture) {
      this.selectedLecture = lecture;
      this.currentPage = 1;
      this.fetchSegments();
      this.$nextTick(() => {
        const section = this.$refs.lectureDetailSection;
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      });
    },

    fetchSegments() {
      if (!this.selectedLecture) {
        this.paginatedSegments = [];
        return;
      }
      const start = (this.currentPage - 1) * this.segmentsPerPage;
      const end = start + this.segmentsPerPage;
      this.paginatedSegments = this.filteredSegments.slice(start, end);
    },

    applyFilter(segments) {
      switch (this.durationFilter) {
        case 'short':
          return segments.filter(s => s.duration <= 3600);
        case 'medium':
          return segments.filter(s => s.duration > 3600 && s.duration <= 18000);
        case 'long':
          return segments.filter(s => s.duration > 18000);
        default:
          return segments;
      }
    },

    filterLectures() {
      this.currentPage = 1;
      this.fetchSegments();
    },

    updateSpeed() {
      const players = Array.isArray(this.$refs.audioPlayers) ? this.$refs.audioPlayers : [this.$refs.audioPlayers];
      players.forEach(player => {
        if (player) player.playbackRate = parseFloat(this.playbackSpeed);
      });
    },

    handlePlay(index) {
      const players = Array.isArray(this.$refs.audioPlayers) ? this.$refs.audioPlayers : [this.$refs.audioPlayers];
      players.forEach((player, i) => {
        if (i !== index && player && !player.paused) {
          player.pause();
          player.currentTime = 0;
        }
      });
      this.playingIndex = index;
    },

    handlePause(index) {
      if (this.playingIndex === index) this.playingIndex = null;
    },

    handleEnded(index) {
      if (this.playingIndex === index) this.playingIndex = null;
    },

    rewind(index) {
      const player = Array.isArray(this.$refs.audioPlayers) ? this.$refs.audioPlayers[index] : this.$refs.audioPlayers;
      if (player) player.currentTime = Math.max(0, player.currentTime - 15);
    },

    fastForward(index) {
      const player = Array.isArray(this.$refs.audioPlayers) ? this.$refs.audioPlayers[index] : this.$refs.audioPlayers;
      if (player) player.currentTime = Math.min(player.duration || Infinity, player.currentTime + 15);
    },

    handleTimeUpdate(index, player) {
      if (player && player.duration) {
        const progress = (player.currentTime / player.duration) * 100;
        this.$set(this.progress, this.paginatedSegments[index].id, progress);
      }
    },

    share(segment) {
      if (!segment.audioUrl) {
        alert('Audio unavailable for sharing.');
        return;
      }
      const text = `Listen to ${segment.title} from ${this.selectedLecture.title}: ${segment.audioUrl}`;
      const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    },

    toggleBookmark(segment) {
      const bookmark = {
        lectureId: this.selectedLecture.id,
        segmentId: segment.id,
        title: segment.title,
        timestamp: this.$refs.audioPlayers && Array.isArray(this.$refs.audioPlayers)
          ? this.$refs.audioPlayers[this.playingIndex]?.currentTime || 0
          : this.$refs.audioPlayers?.currentTime || 0,
      };
      const index = this.bookmarks.findIndex(b => b.segmentId === segment.id);
      if (index > -1) {
        this.bookmarks.splice(index, 1);
      } else {
        this.bookmarks.push(bookmark);
      }
      localStorage.setItem('lectureBookmarks', JSON.stringify(this.bookmarks));
    },

    isBookmarked(segment) {
      return this.bookmarks.some(b => b.segmentId === segment.id);
    },

    navigatePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchSegments();
      }
    },

    formatDuration(seconds) {
      if (!seconds) return 'Unknown';
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);
      return `${hours > 0 ? `${hours}h ` : ''}${minutes}m ${secs}s`;
    },

    handleImageError(event) {
      event.target.src = 'https://via.placeholder.com/180x180?text=Cover+Not+Available';
    },

    handleAudioError(index) {
      this.errorMessage = `Audio for ${this.paginatedSegments[index]?.title || 'segment'} is unavailable.`;
    },

    retryFetch() {
      this.fetchLectures();
    },
  },

  mounted() {
    const tooltipTriggers = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggers.forEach(el => new bootstrap.Tooltip(el));
    this.fetchLectures();
  },

  watch: {
    genreFilter: 'filterLectures',
    durationFilter: 'filterLectures',
  },
};
</script>

<style scoped>
.card:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}
.border-primary {
  border-color: #0d6efd !important;
  background-color: rgba(13, 110, 253, 0.05);
}
.bi {
  cursor: pointer;
  transition: color 0.3s;
}
.bi:hover {
  color: #0d6efd;
}
audio {
  border-radius: 0 0 8px 8px;
}
.pagination .page-link {
  color: #0d6efd;
}
.pagination .page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
}
</style>