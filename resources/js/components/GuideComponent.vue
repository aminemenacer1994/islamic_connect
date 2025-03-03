<template>
  <div class="container">
    <h1 class="display-5 fw-bold text-center mb-4 mt-4">Islamic Guides</h1>
    <p class="text-center container mb-4 guide-description">
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

          <!-- Bootstrap Alert for Content Copy Feedback -->
          <div id="copyAlert" class="alert" role="alert" style="display: none;">
            <span id="alertMessage">Content copied to clipboard!</span>
          </div>

          <div v-if="Array.isArray(guide.sections[selectedCategory].content)" :style="{ fontSize: fontSize + 'px' }">
            <ul class="list-unstyled selected-content">
              <li v-for="(item, index) in guide.sections[selectedCategory].content" :key="index" class="mb-2">
                <span class="fw-medium fs-5 text-left text-dark">
                  <span v-html="highlightText(item)"></span>
                </span>
              </li>
            </ul>
          </div>
          <p v-else class="text-dark fs-5 selected-content" :style="{ fontSize: fontSize + 'px' }">
            <span v-html="highlightText(guide.sections[selectedCategory].content)"></span>
          </p>
        </div>
      </div>
    </div>

    <!-- Action Icons: Share & Copy -->
    <div class="container text-center d-flex justify-content-around" v-if="selectedCategory !== ''">
      <!-- Font Size Control -->
      <i style="cursor: pointer; font-size: 1.5rem;" class="bi bi-dash-circle mx-2 icon-hover"
        @click="changeFontSize('decrease')" data-bs-toggle="tooltip" data-bs-placement="top" title="Decrease Font Size"
        aria-label="Decrease Font Size" role="button"></i>

      <i style="cursor: pointer; font-size: 1.5rem;" class="bi bi-plus-circle mx-2 icon-hover"
        @click="changeFontSize('increase')" data-bs-toggle="tooltip" data-bs-placement="top" title="Increase Font Size"
        aria-label="Increase Font Size" role="button"></i>

      <!-- Share Icon with Tooltip -->
      <i class="bi bi-share icon-tooltip h4 icon-hover" data-bs-toggle="tooltip" style="cursor:pointer"
        data-bs-placement="top" title="Share" aria-label="Share content" role="button" @click="shareOnWhatsApp">
      </i>

      <!-- Copy Icon with Tooltip -->
      <i @click="copyContent" style="cursor:pointer" class="bi bi-clipboard icon-tooltip h4 icon-hover"
        data-bs-toggle="tooltip" data-bs-placement="top" title="Copy Content" aria-label="Copy content" role="button">
      </i>
    </div>

  </div>
</template>

<script>
import guide from "../guides.json"; // Adjust the path if needed
import { onMounted, ref } from 'vue';

export default {
  data() {
    return {
      selectedCategory: "",
      searchText: "", // To track search input
      guide: guide, // Assign imported JSON data to guide
      fontSize: 18, // Starting font size
    };
  },
  methods: {
    // Method to highlight text
    highlightText(text) {
      if (!this.searchText) return text;
      const regex = new RegExp(`(${this.searchText})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>'); // Highlight matches with <mark>
    },
    changeFontSize(action) {
      if (action === 'increase' && this.fontSize < 30) {
        this.fontSize += 2;  // Increase font size
      } else if (action === 'decrease' && this.fontSize > 10) {
        this.fontSize -= 2;  // Decrease font size
      }
    },
    // Share Content (basic example)
    shareOnWhatsApp() {
      const selectedSection = this.guide.sections[this.selectedCategory];

      const title = selectedSection.title;
      const content = Array.isArray(selectedSection.content)
        ? selectedSection.content.join('\n\n')
        : selectedSection.content;

      // Construct the message
      const text = `Title: ${title}\n\nContent: ${content}`;

      // Encode the message for URL
      const encodedText = encodeURIComponent(text);

      // WhatsApp URL to open with the pre-filled message
      const url = `https://wa.me/?text=${encodedText}`;

      // Open WhatsApp Web in a new tab
      window.open(url, '_blank');
    },
    copyContent() {
      const contentToCopy = document.querySelector('.selected-content');
      if (contentToCopy) {
        const textToCopy = contentToCopy.innerText || contentToCopy.textContent;
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            console.log('Content copied to clipboard!');
            this.showCopyAlert('Content copied to clipboard!');
          })
          .catch((err) => {
            console.error('Failed to copy content: ', err);
            this.showCopyAlert('Failed to copy content', true);
          });
      } else {
        console.log('No content found to copy.');
        this.showCopyAlert('No content to copy', true);
      }
    },
    showCopyAlert(message, isError = false) {
      const alertElement = document.getElementById('copyAlert');
      const alertMessage = document.getElementById('alertMessage');

      alertMessage.textContent = message;

      // Change the alert background color in case of an error
      if (isError) {
        alertElement.classList.add('alert-danger');
        alertElement.classList.remove('alert-success');
      } else {
        alertElement.classList.add('alert-success');
        alertElement.classList.remove('alert-danger');
      }

      // Show the alert
      alertElement.style.display = 'block';

      // Hide the alert after 3 seconds
      setTimeout(() => {
        alertElement.style.display = 'none';
      }, 3000);
    }
  },
  onMounted() {
    // Initialize Bootstrap tooltips after the component is mounted
    const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipElements.forEach((element) => {
      new bootstrap.Tooltip(element);
    });
  }
};
</script>

<style scoped>
/* Custom styles can go here */
::v-deep mark {
  background-color: rgb(13, 182, 145);
  /* Customize the highlight color */
  color: white;
  /* Customize text color for highlight */
}

/* Custom styles for the icons (optional) */
.icon-hover:hover {
  color: rgb(13, 182, 145);
  /* Change icon color on hover */
}
</style>
