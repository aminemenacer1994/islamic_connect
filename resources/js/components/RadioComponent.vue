<template>
  <div class="container my-4">
    <h1 class="display-5 fw-bold text-center mb-4 mt-4">Islamic Radio Stations</h1>
    <p class="radio-description text-center">
      Explore a wide range of Islamic radio stations that offer continuous Quranic recitations designed to inspire and enhance your spiritual journey.
    </p>
    <div class="row g-4">
      <div v-for="station in paginatedStations" :key="station.id" class="col-md-4">
        <div class="card bg-success-subtle text-success-emphasis border border-success-subtle">
          <div class="card-body">
            <h5 class="card-title mb-3"><b>{{ station.name }}</b></h5>
            <audio :src="station.url" controls class="w-100 mb-2"></audio>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div v-if="totalPages > 1" class="d-flex justify-content-center align-items-center my-3">
      <button @click="previousPage" :disabled="currentPage === 1" class="btn btn-outline-success me-2">
        Previous
      </button>
      <span class="mx-2">Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-outline-success ms-2">
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radioStations: [],
      currentPage: 1,
      perPage: 15, // Number of stations per page
    };
  },
  mounted() {
    fetch('https://mp3quran.net/api/v3/radios?language=eng')
      .then(response => response.json())
      .then(data => {
        this.radioStations = data.radios;
      })
      .catch(error => console.error('Error fetching radio stations:', error));
  },
  computed: {
    totalPages() {
      return Math.ceil(this.radioStations.length / this.perPage);
    },
    paginatedStations() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.radioStations.slice(start, end);
    },
  },
  methods: {
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
    },
  },
};
</script>

<style scoped>
.radio-description {
  font-size: 1.2rem;
  color: #555;
  margin-top: 10px;
  margin-bottom: 20px;
  line-height: 1.6;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 1rem;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
