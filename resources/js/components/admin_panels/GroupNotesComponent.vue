<template>
  <div>
    <h2 class="pt-4 pb-3 text-center"><strong>Notes & Reflections Board</strong></h2>
    <p class="lead container text-center">
      This page is a space to share your personal Islamic reflections and insights with others. Together, we can
      inspire, learn, and grow in our faith, helping each other on our spiritual journeys through shared thoughts and
      reflections.
    </p>

    <!-- Mobile Navigation
    <div class="container text-center mt-3 d-md-none">
      <div class="row pb-2">
        <div class="col" v-for="(link, index) in mobileNavLinks" :key="index">
          <span class="badge h3" :style="link.style">
            <a :href="link.href" style="text-decoration:none;">{{ link.text }}</a>
          </span>
        </div>
      </div>
    </div> -->

    <!-- Filter and Search Section -->
    <div class="container text-center">
      <div class="row">
        <!-- Filter Section -->
        <div class="col-md-5 mb-4">
          <h5>
            <span v-for="option in filterOptions" :key="option.value" @click="handleFilterClick(option.value)"
              class="badge me-2 mb-2 p-2"
              :class="selectedFilter === option.value ? 'bg-primary-whatsapp text-white' : 'bg-secondary-whatsapp text-white'"
              style="cursor: pointer; user-select: none;">
              {{ option.label }}
            </span>

          </h5>
        </div>

        <!-- Search Section -->
        <div class="col-md-7">
          <input type="text" v-model="searchTerm" placeholder="Search notes keyword..." class="form-control mb-4"
            style="border: 1px solid #075E54" />
        </div>
        <!-- <div class="fw-bold display-6 ">Total amount of notes: <b style="color: #075E54;"> {{ filteredNotes.length
            }}</b>
        </div> -->
      </div>

    </div>

    <!-- Notes Container -->
    <div class="container container-notes pt-4">
      <div v-if="isLoading" class="text-center">
        <p>Loading notes...</p>
      </div>
      <div v-else class="collage">
        <div class="collage-item" v-for="(note, index) in filteredNotes" :key="note.id">
          <div class="card">
            <div class="card-body">
              <h5><strong>Note:</strong></h5>
              <p v-html="highlightText(truncatedHtml(note.ayah_notes))"></p>
              <h5><strong>Date created:</strong></h5>
              <p v-if="note.created_at">{{ formatDate(note.created_at) }}</p>

              <div class="text-center row">
                <div class="col">
                  <i class="bi bi-eye me-3 h3" @click="viewModal(note)" data-bs-toggle="modal"
                    data-bs-target="#viewNotes"></i>
                </div>
                <div class="col">
                  <i class="bi bi-share me-3 h3" @click="shareOnWhatsApp(note)" data-bs-toggle="tooltip"
                    data-bs-placement="top" title="Share"></i>
                </div>
                <div class="col">
                  <i class="bi bi-clipboard copy-icon h3" @click="copyAyah(note)" data-bs-toggle="tooltip"
                    data-bs-placement="top" title="Copy Ayah"></i>
                </div>
                <!-- Toast container -->
                <div id="toast-container" class="toast-container position-fixed bottom-0 end-0 p-3"></div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- View Note Modal -->
    <div class="modal fade" id="viewNotes" tabindex="-1" aria-labelledby="viewNotesLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark"><b>View Note</b></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="selectedNote">
            <div class="mb-3">
              <label class="form-label"><strong>Notes:</strong></label>
              <div class="mt-2 text-dark" v-html="selectedNote.ayah_notes"></div>
            </div>
            <div class="mb-3">
              <label class="form-label"><strong>Date Created:</strong></label>
              <p v-if="selectedNote.created_at">{{ formatDate(selectedNote.created_at) }}</p>
              <p v-else>N/A</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
      isLoading: false,
      notes: [],
      searchTerm: "",
      selectedFilter: "all",
      selectedNote: null,
      filterOptions: [
        { value: "all", label: "All Notes" },
        { value: "today", label: "Today" },
        { value: "yesterday", label: "Yesterday" },
        { value: "lastWeek", label: "Last Week" },
        { value: "lastMonth", label: "Last Month" },
      ],
      mobileNavLinks: [
        { text: "Bookmarks", href: "/bookmarks", style: "width:100%;font-size:18px;border-radius:10px;color:#B70D52;background:#ead1dc" },
        { text: "Profile", href: "/profile", style: "width:100%;font-size:18px;border-radius:10px;color:#0263FF;background:#c2d8fb" },
        { text: "Notes", href: "/notes", style: "width:100%;font-size:18px;border-radius:10px;color:#3D8F67;background:#d1f4d0" },
      ],
    };
  },
  async mounted() {
    await this.fetchNotes();
    this.initializeTooltips();
  },
  computed: {
    filteredNotes() {
      const keyword = this.searchTerm.toLowerCase();
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);
      const lastMonth = new Date();
      lastMonth.setMonth(today.getMonth() - 1);

      return this.notes.filter(note => {
        const noteDate = new Date(note.created_at);
        const matchesSearch = !this.searchTerm ||
          (note.ayah_notes && note.ayah_notes.toLowerCase().includes(keyword));

        let matchesPeriod = true;
        switch (this.selectedFilter) {
          case "today":
            matchesPeriod = noteDate.toDateString() === today.toDateString();
            break;
          case "yesterday":
            matchesPeriod = noteDate.toDateString() === yesterday.toDateString();
            break;
          case "lastWeek":
            matchesPeriod = noteDate >= lastWeek;
            break;
          case "lastMonth":
            matchesPeriod = noteDate >= lastMonth;
            break;
        }

        return matchesSearch && matchesPeriod;
      });
    },
  },
  methods: {
    initializeTooltips() {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new bootstrap.Tooltip(tooltipTriggerEl);
      });
    },
    copyAyah(note) {
      if (!note || !note.ayah_notes) {
        console.error("Note or note.ayah_notes is undefined.");
        return;
      }

      const textToCopy = note.ayah_notes; // Get the text to copy
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.showToast('Note copied to clipboard!', 'success'); // Show success toast
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        this.showToast('Failed to copy text!', 'danger'); // Show error toast
      });
    },
    showToast(message, type = 'success') {
      // Create a new toast element
      const toastEl = document.createElement('div');
      toastEl.classList.add('toast', 'align-items-center', 'text-white', 'bg-' + type, 'border-0');
      toastEl.setAttribute('role', 'alert');
      toastEl.setAttribute('aria-live', 'assertive');
      toastEl.setAttribute('aria-atomic', 'true');

      // Toast body
      const toastBody = document.createElement('div');
      toastBody.classList.add('d-flex', 'align-items-center');
      toastBody.innerHTML = `
      <div class="toast-body fs-5"> <!-- Increase font size with fs-5 -->
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    `;
      toastEl.appendChild(toastBody);

      // Append the toast to the container
      const toastContainer = document.getElementById('toast-container');
      toastContainer.appendChild(toastEl);

      // Initialize and show the toast
      const toast = new bootstrap.Toast(toastEl, {
        autohide: true,
        delay: 3000, // Hide after 3 seconds
      });
      toast.show();

      // Remove the toast from the DOM after it hides
      toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
      });
    },

    shareOnWhatsApp(note) {
      const message = `Note:\n${note.ayah_notes}\n\nCreated on:\n ${this.formatDate(note.created_at)}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    },
    handleFilterClick(value) {
      this.selectedFilter = value;
    },
    formatDate(dateString) {
      if (!dateString) return "N/A";
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    async fetchNotes() {
      this.isLoading = true;
      try {
        const response = await fetch(`/api/fetch-notes`);
        if (!response.ok) throw new Error(`Failed to fetch notes: ${response.statusText}`);
        const data = await response.json();
        this.notes = data;
      } catch (error) {
        console.error("Error fetching notes:", error);
        this.showToast('Failed to fetch notes!', 'danger');
      } finally {
        this.isLoading = false;
      }
    },
    truncatedHtml(html, maxLength = 400) {
      if (!html) return "";
      const div = document.createElement("div");
      div.innerHTML = html;
      const plainText = div.textContent || div.innerText || "";
      return plainText.length > maxLength
        ? `${plainText.substring(0, maxLength)}...`
        : plainText;
    },
    highlightText(text) {
      if (!this.searchTerm || !text) return text;
      const escapedKeyword = this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedKeyword})`, 'gi');
      return text.replace(regex, '<span class="highlight">$1</span>');
    },
    viewModal(note) {
      this.selectedNote = note;
    },
    textToSpeech(note, index) {
      if (!window.speechSynthesis) {
        this.showToast('Your browser does not support text-to-speech.', 'warning');
        return;
      }

      const noteText = this.$refs.noteText[index].textContent;
      const utterance = new SpeechSynthesisUtterance(noteText);
      window.speechSynthesis.speak(utterance);
    },
  },
};
</script>
<style scoped>
.toast {
  min-width: 300px; /* Increase the width of the toast */
  font-size: 1.25rem; /* Increase the font size */
}

.toast-body {
  padding: 1rem; /* Add more padding inside the toast */
}
.container-notes {
  padding-top: 2rem;
}

.collage {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.collage-item {
  display: flex;
  flex-direction: column;
}

.card {
  background-color: #ffffff;
  margin-bottom: 1.5em;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 2px solid rgba(0, 191, 166);
  box-shadow: 0 4px 8px rgba(0, 191, 166, 0.1);
  transition: transform 0.3s ease;
}

/* Card hover effect */
.card:hover {
  transform: translateY(-5px);
}

i {
  color: #000;
  transition: color 0.3s ease;
}

i:hover {
  color: #00bfa6;
}

/* Media Queries for Responsive Layout */
@media (max-width: 1200px) {
  .collage {
    grid-template-columns: repeat(2, 1fr);
    /* 2 columns on medium screens */
  }
}

@media (max-width: 768px) {
  .collage {
    grid-template-columns: 1fr;
    /* 1 column on smaller screens */
  }
}

.highlight {
  background-color: yellow;
}

.bg-primary-whatsapp {
  background-color: #00bfa6;
}

.bg-secondary-whatsapp {
  background-color: #075E54;
}

.text-green {
  color: #00bfa6;
}

.text-white {
  color: #FFFFFF;
}

.badge.active {
  background-color: rgba(0, 191, 166, 0.2);
  color: rgb(5, 32, 29);
  border: 1px solid rgba(0, 191, 166);
}

.close {
  float: right;
  cursor: pointer;
  font-size: 24px;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-body h5 {
  font-size: 1.2rem;
  font-weight: bold;
}

.card-body p {
  font-size: 1rem;
  color: #555;
}

.card-body hr {
  border-color: #ddd;
}
</style>
