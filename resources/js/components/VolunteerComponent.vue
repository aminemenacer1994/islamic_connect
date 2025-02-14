<template>
  <div class="container mt-5">
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <div v-if="articles.length > 0" class="row">
      <div
        v-for="article in articles"
        :key="article.guid"
        class="col-md-4 mb-4"
      >
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
            <p class="card-text">{{ article.contentSnippet }}</p>
            <a
              :href="article.link"
              target="_blank"
              class="btn btn-primary"
            >
              Read More
            </a>
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
      searchQuery: "",
      content: [],
      loading: false,
      error: null,
      debounceTimeout: null, // For debouncing search input
    };
  },
  methods: {
    async fetchContent() {
      this.loading = true;
      this.error = null;
      this.content = [];

      try {
        const apiKey = "https://api.islamicity.org/articles"; // Replace with your actual API key
        const response = await fetch(
          `https://api.islamicity.org/blogs?query=${encodeURIComponent(this.searchQuery)}`,
          {
            headers: {
              "X-API-Key": apiKey, // Add API key to headers
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch content. Please try again later.");
        }
        const data = await response.json();
        if (!data.data) {
          throw new Error("Invalid data format received from the API.");
        }
        this.content = data.data; // Update content with fetched data
      } catch (err) {
        this.error = err.message;
        console.error("Error fetching content:", err);
      } finally {
        this.loading = false;
      }
    },
    debouncedFetchContent() {
      // Debounce the fetchContent method to avoid excessive API calls
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }
      this.debounceTimeout = setTimeout(() => {
        this.fetchContent();
      }, 300); // 300ms delay
    },
  },
};
</script>
<style scoped>
.card {
  transition: transform 0.2s;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card:hover {
  transform: translateY(-5px);
}
.card-title {
  font-weight: bold;
  color: #2c3e50;
}
.card-text {
  color: #555;
}
.btn-primary {
  background-color: #007bff;
  border: none;
}
.btn-primary:hover {
  background-color: #0056b3;
}
.alert {
  max-width: 500px;
  margin: 0 auto;
}
</style>