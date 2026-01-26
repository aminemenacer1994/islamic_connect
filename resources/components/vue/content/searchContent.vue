<template>
  <div>
    <h2>Advanced Search</h2>

    <!-- Search Input -->
    <input 
      v-model="searchQuery" 
      type="text" 
      placeholder="Search content..." 
      @input="onSearchInput" 
    />

    <!-- Filters Section -->
    <div class="filters">
      <select v-model="selectedCategory">
        <option value="">Select Category</option>
        <option value="Seerah">Seerah</option>
        <option value="Hadith">Hadith</option>
        <option value="Blog">Blog</option>
        <option value="Podcast">Podcast</option>
      </select>

      <input 
        v-model="startDate" 
        type="date" 
        placeholder="Start Date"
      />
      <input 
        v-model="endDate" 
        type="date" 
        placeholder="End Date"
      />
    </div>

    <button @click="searchContent">Search</button>

    <!-- Search Results -->
    <div v-if="searchResults.length > 0">
      <h3>Search Results</h3>
      <div v-for="(result, index) in searchResults" :key="index" @click="openModal(result)">
        <h4>{{ result.title }}</h4>
        <p>{{ result.description }}</p>
      </div>
    </div>

    <!-- Modal for Detailed View -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>{{ modalContent.title }}</h2>
        <p>{{ modalContent.description }}</p>
        <button @click="closeModal">Close</button>
        <!-- Export Options -->
        <button @click="exportToPDF">Export to PDF</button>
        <button @click="exportToMP3">Export to MP3</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      startDate: '',
      endDate: '',
      searchResults: [], // Array to store search results
      modalContent: null, // Content for the modal
      showModal: false, // Modal visibility flag
    };
  },
  methods: {
    // Handle input change
    onSearchInput() {
      // You can process input dynamically here
    },

    // Fetch content from Hugging Face API based on the search query
    async searchContent() {
      try {
        const apiToken = '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'; // Replace with your Hugging Face API token
        const apiUrl = 'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2';

        // Structure the input dynamically
        const input = {
          inputs: {
            source_sentences: [this.searchQuery], // Pass the search query as an array in 'sentences'
          },
        };

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input),
        });

        const data = await response.json();

        // Handle response and store the search results
        if (data && Array.isArray(data)) {
          this.searchResults = data.map(item => ({
            title: item.title || 'Result Title', 
            description: item.snippet || item.generated_text || 'No description available'
          }));
        } else if (data.error) {
          console.error('API Error:', data.error);
        }
      } catch (error) {
        console.error('Error fetching content from Hugging Face API:', error);
      }
    },

    // Open the modal and display the content
    openModal(result) {
      this.modalContent = result;
      this.showModal = true;
    },

    // Close the modal
    closeModal() {
      this.showModal = false;
      this.modalContent = null;
    },

    // Export content to PDF (placeholder function)
    exportToPDF() {
      console.log('Exporting to PDF...');
      // Implement PDF export logic here
    },

    // Export content to MP3 (placeholder function)
    exportToMP3() {
      console.log('Exporting to MP3...');
      // Implement MP3 export logic here
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 80%;
}

button {
  margin: 5px;
}
</style>
