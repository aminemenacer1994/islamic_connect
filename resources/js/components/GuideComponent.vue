<template>
  <div class="container">
    <h1 class="display-5 fw-bold text-center mb-4 mt-4">Islamic Guides</h1>
    <p class="text-center container mb-4 dua-description">
      Islamic guides offer clear insights into the core beliefs, practices, and morals of Islam, helping both Muslims
      and non-Muslims understand the faith more deeply.
    </p>

    <div class="row mb-4">
      <!-- Category Dropdown -->
      <div class="col-md-6">
        <div class="mb-3">
          <select v-model="selectedCategory" class="form-select">
            <option value="">Select a Category</option>
            <option v-for="(section, index) in guide.sections" :key="index" :value="index">
              {{ section.title }}
            </option>
          </select>
        </div>
      </div>

      <!-- Search Bar Input (only show after selection) -->
      <div class="col-md-6" v-if="selectedCategory !== ''">
        <div class="mb-3">
          <input type="text" v-model="searchText" class="form-control" placeholder="Search text..." />
        </div>
      </div>
    </div>

    <!-- Add your content here -->
    <div class="container text-left">
      <div class="row justify-content-center mb-4" v-if="selectedCategory !== '' && guide.sections[selectedCategory]">
        <div class="col-md-12">
          <h2 class="display-6 fw-bold text-center mb-3">
            {{ guide.sections[selectedCategory].title }}
          </h2>
          <div v-if="Array.isArray(guide.sections[selectedCategory].content)">
            <ul class="list-unstyled">
              <li v-for="(item, index) in guide.sections[selectedCategory].content" :key="index" class="mb-2">
                <span class="fw-medium fs-5 text-left text-dark">
                  <span v-html="highlightText(item)"></span>
                </span>
              </li>
            </ul>
          </div>
          <p v-else class="text-dark fs-5">
            <span v-html="highlightText(guide.sections[selectedCategory].content)"></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import guide from "../guides.json"; // Adjust the path if needed
export default {
  data() {
    return {
      selectedCategory: "",
      searchText: "", // To track search input
      guide: guide, // Assign imported JSON data to guide
    };
  },
  methods: {
    // Method to highlight text
    highlightText(text) {
      if (!this.searchText) return text;
      const regex = new RegExp(`(${this.searchText})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>'); // Highlight matches with <mark>
    },
  },
};
</script>

<style scoped>
/* Custom styles can go here */
::v-deep mark {
  background-color: rgb(13, 182, 145); /* Customize the highlight color */
  color: white; /* Customize text color for highlight */
}
</style>