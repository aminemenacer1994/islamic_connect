<template>
  <div class="container">
    <h1 class="display-5 fw-bold text-center mb-4 mt-4">Dua Collection</h1>
    <p class="text-center container mb-4">
      The Dua Collection offers a selection of authentic Islamic supplications (duas) organized by categories like forgiveness, protection, and healing. Each dua includes the Arabic text, transliteration, translation, and reference, making it accessible for all. This collection serves as a valuable resource for Muslims seeking guidance and comfort through prayer, providing duas for various life situations.
    </p>

    <div class="container">
      <div class="row mb-4">
        
        <!-- Category Dropdown -->
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

        <!-- Search Input -->
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
</style>
