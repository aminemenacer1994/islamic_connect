<template>
  <div>
    <!-- Button to Trigger Folder Selection Modal -->
    <button
      style="background-color: rgba(0, 191, 166, 0.452); cursor:pointer; color:black; font-style:bolder"
      class="btn button-success pb-2"
      data-bs-toggle="modal"
      data-bs-target="#folderModal"
    >
      Collections
    </button>

    <!-- Folder Selection Modal -->
    <div
      class="modal fade"
      id="folderModal"
      tabindex="-1"
      aria-labelledby="folderModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="folderModalLabel">Select a Folder</h5>
            <button
              style="background-color: rgba(0, 191, 166, 0.452); cursor:pointer"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div v-if="folders && folders.length > 0">
              <p>Select a folder to save your bookmark:</p>
              <ul>
                <li v-for="folder in folders" :key="folder.id">
                  <button
                    class="btn btn-info"
                    style="text-decoration:none"
                    @click="selectFolder(folder.id)"
                    data-bs-dismiss="modal"
                  >
                    {{ folder.name }}
                  </button>
                </li>
              </ul>
            </div>
            <div v-else>
              <p>No folders available. Please create a folder first.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bookmark Icon -->
    <i 
      @click="submitForm2"
      class="bi bi-bookmark text-right mr-2 h4"
      aria-expanded="false"
      data-bs-placement="top"
      title="Bookmark verse"
      style="color: rgba(0, 191, 166);cursor:pointer"
    ></i>
    
    <!-- Success and Error Alerts -->
    <div v-if="showAlert" class="alert alert-success" role="alert">
      Bookmark saved successfully!
    </div>
    <div v-if="showErrorAlert" class="alert alert-danger" role="alert">
      An error occurred while saving the bookmark.
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BookmarkTranslation',
  props: {
    information: {
      type: Object,
      required: true,
      default: () => ({
        surah: { name_en: '' },
        ayah_text: '',
        ayah_id: null,
        translation: ''
      }),
      validator(value) {
        return (
          value.surah &&
          value.surah.name_en !== undefined &&
          value.ayah_text !== undefined &&
          value.ayah_id !== undefined &&
          value.translation !== undefined
        );
      }
    }
  },
  data() {
    return {
      showAlert: false,
      showErrorAlert: false,
      folders: [],  // Ensure you fetch and populate this array from your backend or state
      bookmarks: [],
      selectedFolderId: null,
    };
  },
  created() {
    const { ayah_id } = this.information;
    const submitted = localStorage.getItem(`bookmarkSubmitted_${ayah_id}`);
    if (submitted) {
      this.showAlert = true;
      this.hideAlertAfterDelay();
    }
  },
  methods: {
    selectFolder(folderId) {
      this.selectedFolderId = folderId;
      this.submitForm2();  // Automatically submit the form after selecting the folder
    },
    async submitForm2() {
      const { surah, ayah_text, ayah_id, translation } = this.information;

      if (!surah || !ayah_text || ayah_id === null || !translation) {
        console.error('Information prop is incomplete or missing.');
        this.showErrorAlert = true;
        this.hideAlertAfterDelay();
        return;
      }

      // Check if the user has selected a folder
      if (!this.selectedFolderId) {
        console.error('No folder selected.');
        this.showErrorAlert = true;
        this.hideAlertAfterDelay();
        return;
      }

      const formData = {
        surah_name: surah.name_en,
        ayah_num: ayah_id,
        ayah_verse_ar: ayah_text,
        ayah_verse_en: translation,
        folder_id: this.selectedFolderId,  // Include the selected folder ID
      };

      try {
        const response = await axios.post('/bookmarks', formData);
        console.log(response.data.message);
        localStorage.setItem(`bookmarkSubmitted_${ayah_id}`, true);
        this.showAlert = true;
        this.showErrorAlert = false;
        this.hideAlertAfterDelay();
      } catch (error) {
        console.error(error);
        this.showAlert = false;
        this.showErrorAlert = true;
        this.hideAlertAfterDelay();
      }
    },
    hideAlertAfterDelay() {
      setTimeout(() => {
        this.showAlert = false;
        this.showErrorAlert = false;
      }, 3000);  // Hide alerts after 3 seconds
    }
  }
};
</script>

<style scoped>
.alert {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
}
</style>
