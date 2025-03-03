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
            {{ isArabic ? guide.sections[selectedCategory].title_ar || guide.sections[selectedCategory].title :
              guide.sections[selectedCategory].title }}
          </h2>
          
          <!-- Translate Button -->
          <div class="text-right mb-3" v-if="selectedCategory !== '' && guide.sections[selectedCategory]">
            <button class="btn btn-success" @click="toggleLanguage">
              {{ isArabic ? 'Translate to English' : 'Translate to Arabic' }}
            </button>
          </div>

          <!-- Bootstrap Alert for Content Copy Feedback -->
          <div id="copyAlert" class="alert" role="alert" style="display: none;">
            <span id="alertMessage">Content copied to clipboard!</span>
          </div>

          <div v-if="Array.isArray(guide.sections[selectedCategory].content)" :style="{ fontSize: fontSize + 'px' }">
            <ul class="list-unstyled selected-content">
              <li v-for="(item, index) in guide.sections[selectedCategory].content" :key="index" class="mb-2">
                <span class="fw-medium fs-5 text-left text-dark">
                  <span
                    v-html="isArabic ? highlightText(guide.sections[selectedCategory].content_ar?.[index] || item) : highlightText(item)"></span>
                </span>
              </li>
            </ul>
          </div>

          <p v-else class="text-dark fs-5 selected-content" :style="{ fontSize: fontSize + 'px' }">
            <span
              v-html="isArabic ? highlightText(guide.sections[selectedCategory].content_ar || guide.sections[selectedCategory].content) : highlightText(guide.sections[selectedCategory].content)"></span>
          </p>
        </div>
      </div>
    </div>




    <!-- Action Icons: Share & Copy -->
    <div class="container text-center d-flex pb-3 justify-content-around" v-if="selectedCategory !== ''">
      <!-- Font Size Control -->
      <i class="bi bi-dash-circle mx-2 icon-hover" style="cursor: pointer; font-size: 1.5rem;"
        @click="changeFontSize('decrease')" data-bs-toggle="tooltip" data-bs-placement="top" title="Decrease Font Size"
        aria-label="Decrease Font Size" role="button"></i>

      <i class="bi bi-plus-circle mx-2 icon-hover" style="cursor: pointer; font-size: 1.5rem;"
        @click="changeFontSize('increase')" data-bs-toggle="tooltip" data-bs-placement="top" title="Increase Font Size"
        aria-label="Increase Font Size" role="button"></i>

      <!-- Share Icon with Tooltip -->
      <i class="bi bi-share icon-tooltip h4 icon-hover" data-bs-toggle="tooltip" style="cursor: pointer"
        data-bs-placement="top" title="Share" aria-label="Share content" role="button" @click="shareOnWhatsApp"></i>

      <!-- Copy Icon with Tooltip -->
      <i @click="copyContent" style="cursor: pointer" class="bi bi-clipboard icon-tooltip h4 icon-hover"
        data-bs-toggle="tooltip" data-bs-placement="top" title="Copy Content" aria-label="Copy content"
        role="button"></i>
    </div>

  </div>
</template>

<script>
import guide from "../guides.json"; // Adjust the path if needed
import { ref, onMounted } from 'vue';

export default {
  data() {
    return {
      selectedCategory: "",
      searchText: "", // To track search input
      guide: guide, // Assign imported JSON data to guide
      fontSize: 18, // Starting font size as a regular data property
      isArabic: false,  // Track language state
      translatedContent: [],  // Store translated content
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
    toggleLanguage() {
      if (this.isArabic) {
        this.isArabic = false;  // Switch back to English
      } else {
        if (this.guide.sections[this.selectedCategory]?.content_ar) {
          // Switch to Arabic if translation exists
          this.isArabic = true;
        } else {
          // Fetch translation if not available
          this.fetchTranslation();
        }
      }
    },
    fetchTranslation() {
      const selectedContent = this.guide.sections[this.selectedCategory].content;
      const contentArray = Array.isArray(selectedContent) ? selectedContent : [selectedContent];

      const translateChunk = (text) => {
        return fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ar`)
          .then(response => response.json())
          .then(data => data.responseData.translatedText)
          .catch(error => console.log("Translation Error:", error));
      };

      // Split content into chunks if it exceeds 500 characters
      const translateContent = async () => {
        let translatedArray = [];

        for (let item of contentArray) {
          if (item.length > 500) {
            const chunks = item.match(/(.|[\r\n]){1,500}/g);  // Split into 500-char chunks
            for (let chunk of chunks) {
              const translatedChunk = await translateChunk(chunk);
              translatedArray.push(translatedChunk);
            }
          } else {
            const translatedItem = await translateChunk(item);
            translatedArray.push(translatedItem);
          }
        }

        // Combine translated results
        this.guide.sections[this.selectedCategory].content_ar = translatedArray.join(' ');
        this.isArabic = true;
      };

      translateContent();
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
