<!-- <template>
  <div class="container">
    <h1 class="display-5 fw-bold text-center mb-4 mt-4">Dua Collection</h1>
    <p class="text-center container mb-4">
      The Dua Collection offers a selection of authentic Islamic supplications (duas) organized by categories like forgiveness, protection, and healing. Each dua includes the Arabic text, transliteration, translation, and reference, making it accessible for all. This collection serves as a valuable resource for Muslims seeking guidance and comfort through prayer, providing duas for various life situations.
    </p>

    <div class="container">
      <div class="row mb-4">
        
        -- Category Dropdown --
        <div class="col-md-6">
          <div class="mb-3">
            <select v-model="selectedCategory" class="form-select">
              <option value="">Select a Category</option>
              <option v-for="category in duaCollection" :key="category.id" :value="category.id">
                {{ category.name }} ({{ category.duas.length }} Duas)
              </option>
            </select>
          </div>
        </div>

        -- Search Input --
        <div class="col-md-6">
          <div class="mb-3">
            <input v-model="searchQuery" type="text" placeholder="Search for a Dua..." class="form-control" />
          </div>
        </div>

      </div>
    </div>


    <div class="container text-center">
      <div v-for="category in filteredCategories" :key="category.id" class="row mb-4">
        <div v-for="dua in getPaginatedDuas(category.duas)" :key="dua.id" class="col-md-6">
          <div class="card text-light rounded-3 p-3">
            <h5 class="text-center text-success-emphasis pb-2"><strong>{{ dua.title }}</strong></h5>
            <h5 class="text-right text-success-emphasis pt-3">{{ dua.arabic }}</h5>
            <h5 class="text-left text-success-emphasis">{{ dua.translation }}</h5>
            <h6 class="text-left text-success-emphasis"><b>- {{ dua.reference }}</b></h6>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      duaCollection: [],
      searchQuery: "",
      selectedCategory: "", // Track selected category
      currentPage: {},
      duasPerPage: 10, // Number of duas per page
    };
  },
  computed: {
    // Filter categories based on the search query and selected category
    filteredCategories() {
      const filteredByCategory = this.selectedCategory
        ? this.duaCollection.filter(category => category.id === parseInt(this.selectedCategory))
        : this.duaCollection;

      return filteredByCategory.filter(category => {
        const searchQueryLower = this.searchQuery.toLowerCase();
        return category.duas.some(dua =>
          dua.title.toLowerCase().includes(searchQueryLower) ||
          dua.arabic.toLowerCase().includes(searchQueryLower) ||
          dua.transliteration.toLowerCase().includes(searchQueryLower) ||
          dua.translation.toLowerCase().includes(searchQueryLower)
        );
      });
    }
  },
  methods: {
    // Pagination logic
    getPaginatedDuas(duas) {
      const start = (this.currentPage[duas[0].id] - 1) * this.duasPerPage;
      const end = start + this.duasPerPage;
      return duas.slice(start, end);
    },
    changePage(direction, categoryId) {
      const totalPages = this.totalPages(this.duaCollection.find(c => c.id === categoryId).duas);
      if (direction === 'next' && this.currentPage[categoryId] < totalPages) {
        this.currentPage[categoryId]++;
      } else if (direction === 'prev' && this.currentPage[categoryId] > 1) {
        this.currentPage[categoryId]--;
      }
    },
    totalPages(duas) {
      return Math.ceil(duas.length / this.duasPerPage);
    },
    resetPagination() {
      // Reset pagination when category changes
      this.duaCollection.forEach(category => {
        // Directly set currentPage for each category
        this.currentPage[category.id] = 1;
      });
    }
  },
  created() {
    fetch("/duaCollection.json")
      .then(response => response.json())
      .then(data => {
        this.duaCollection = data.categories;
        // Initialize currentPage for each category
        this.duaCollection.forEach(category => {
          this.currentPage[category.id] = 1; // No need for this.$set()
        });
      })
      .catch(error => console.error("Error loading dua collection:", error));
  }
};
</script>

<style scoped>
.container {
  margin: auto;
}

.card {
  padding: 1rem;
  border-radius: 20%;
  border: 2px solid gray;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  color: black;
}

.dua-card{
  text-align: center;
  color: black;
}

.pagination button {
  margin: 5px;
}

.pagination button:disabled {
  cursor: not-allowed;
}
</style> -->
<template>
  <div class="container my-4">
    <h1 class="display-5 fw-bold text-center mb-4 mt-4">Islamic Radio Stations</h1>
    <p class="radio-description text-center">
      Explore a wide range of Islamic radio stations that offer continuous Quranic recitations, lectures, and Islamic programs designed to inspire and enhance your spiritual journey. Whether you're looking for soothing recitations to start your day, insightful Islamic discussions, or motivational content, these radio stations provide a variety of programs to suit your needs. Tune in and connect with the rich teachings of Islam anytime, anywhere.
    </p>
    <div class="row g-4">
      <div v-for="station in radioStations" :key="station.id" class="col-md-6">
        <div class="card bg-success-subtle text-success-emphasis border border-success-subtle">
          <div class="card-body">
            <h5 class="card-title"><b>{{ station.name }}</b></h5>
            <audio :src="station.url" controls class="w-100 mb-2" style="bottom: 0px;"></audio>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div v-if="totalPages > 1" class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      radioStations: [],
      radioStations: [],
      currentPage: 1,
      perPage: 8, // Number of stations per page
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
<style>
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
