<template>
  <div class="container">
    <h1 class="display-5 fw-bold text-center mb-4 mt-4">Dua Collection</h1>
    <p class="text-center container mb-4">
      The Dua Collection offers a selection of authentic Islamic supplications (duas) organized by categories like
      forgiveness, protection, and healing. Each dua includes the Arabic text, transliteration, translation, and
      reference, making it accessible for all. This collection serves as a valuable resource for Muslims seeking
      guidance and comfort through prayer, providing duas for various life situations.
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

    <div v-if="showCopyMessage" class="alert alert-success alert-dismissible fade show" role="alert">
      Content copied to clipboard!
      <button type="button" class="btn-close" @click="showCopyMessage = false" aria-label="Close"></button>
    </div>

    <div class="container text-center">
      <div v-for="category in filteredCategories" :key="category.id" class="row mb-4">
        <div v-for="dua in getPaginatedDuas(category.duas)" :key="dua.id" class="col-md-6 ">
          <div class="card text-dark rounded-3 p-3">
            <h5 ><strong>{{ dua.title }}</strong></h5><br />
            <h3 class="text-right">{{ dua.arabic }}<br /></h3>
            <h5 class="text-left mb-3">{{ dua.translation }}<br /></h5>
            <h6 class="text-left">- {{ dua.reference }}</h6>
            <hr />
            <div class="container text-center d-flex justify-content-between">
              <i class="bi bi-skip-backward-circle icon-tooltip h4" 
                data-bs-toggle="tooltip" data-bs-placement="top" title="Rewind"></i>
              <!-- WhatsApp Share Button -->
              <a :href="generateWhatsAppLink(dua)" target="_blank">
                <i class="bi bi-share icon-tooltip h4" data-bs-toggle="tooltip" data-bs-placement="top" title="Share"></i>
              </a>
              <!-- Copy Button -->
              <i class="bi bi-clipboard icon-tooltip h4" 
                @click="copyContent(dua)"
                data-bs-toggle="tooltip" data-bs-placement="top" 
                title="Copy Content"></i>
              
            </div>
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
      duasPerPage: 20, // Number of duas per page
      showCopyMessage: false
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
    copyContent(dua) {
      const text = `Dua title: ${dua.title}\n\n${dua.arabic}\n\n${dua.translation}\n\n- ${dua.reference}`;
      navigator.clipboard.writeText(text).then(() => {
        this.showCopyMessage = true;  // Show success message
        setTimeout(() => {
          this.showCopyMessage = false; // Hide message after 3 seconds
        }, 3000);
      }).catch(err => {
        console.error("Failed to copy content: ", err);
      });
    },
    generateWhatsAppLink(dua) {
      const text = `Dua title: ${dua.title}\n\n${dua.arabic}\n\nTranslation: ${dua.translation}\n\nReference: ${dua.reference}`;
      const encodedText = encodeURIComponent(text);
      return `https://wa.me/?text=${encodedText}`;
    },
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
  padding: 10px;
  border-radius: 20%;
  border: 2px solid gray;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  color: white;
  background-color: rgba(240, 238, 238, 0.15);
}

.dua-card {
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