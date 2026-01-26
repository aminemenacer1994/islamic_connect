<template>
<div>
 <!-- Folder Selection Modal -->
 <div class="modal fade" id="folderSelectionModal" tabindex="-1" aria-labelledby="folderSelectionModalLabel" aria-hidden="true">
  <div class="modal-dialog">
   <div class="modal-content">
    <div class="modal-header">
     <h5 class="modal-title" id="folderSelectionModalLabel">
      Select Folder
     </h5>
     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
     <!-- List of folders -->
     <ul class="list-group">
      <li v-for="folder in folders" :key="folder.id" class="list-group-item button-33" style="padding: 5px; cursor: pointer" :class="{active: selectedFolderId === folder.id,}" @click="selectFolder(folder.id)">
       {{ folder.name }}
      </li>
     </ul>
    </div>
    <div class="modal-footer">
     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
      Cancel
     </button>
     <button type="button" class="btn btn-primary" @click="confirmSelection">
      Confirm
     </button>
    </div>
   </div>
  </div>
 </div>
</div>
</template>

<script>
import axios from "axios";
import {
 Modal
} from "bootstrap";

export default {
 name: "FolderSelectionModal",
 props: {
  information: {
   type: Object,
   required: true,
   surah: {
    name_en: ""
   },
   ayah_text: "",
   ayah_id: null,
   translation: "",
   validator(value) {
    return (
     value.surah &&
     value.surah.name_en !== undefined &&
     value.ayah_text !== undefined &&
     value.ayah_id !== undefined &&
     value.translation !== undefined
    );
   },
  },
 },
 data() {
  return {
   folders: [],
   selectedFolderId: null,
   showAlert: false,
   showErrorAlert: false,
  };
 },
 mounted() {
  this.fetchFolders();
 },
 methods: {
  async fetchFolders() {
   try {
    const response = await axios.get("/folders");
    this.folders = response.data.folders;
   } catch (error) {
    console.error("Error fetching folders:", error);
    alert("Failed to fetch folders. Please try again.");
   }
  },
  selectFolder(folderId) {
   this.selectedFolderId = folderId;
  },
  async confirmSelection() {
   if (!this.selectedFolderId) {
    alert("Please select a folder.");
    return;
   }

   console.log('Selected folder ID:', this.selectedFolderId);
   console.log('Information provided:', this.information);

   const {
    surah,
    ayah_text,
    ayah_id,
    translation
   } = this.information;

   if (!surah || !ayah_text || ayah_id === null || !translation) {
    this.showErrorAlert = true;
    this.hideAlertAfterDelay();
    return;
   }

   const formData = {
    surah_name: surah.name_en,
    ayah_num: ayah_id,
    ayah_verse_ar: ayah_text,
    ayah_verse_en: translation,
    folder_id: this.selectedFolderId,
   };

   console.log('Form Data being sent:', formData);

   try {
    const response = await axios.post("/bookmarks", formData);
    console.log('Response from server:', response.data);

    if (response.status === 200 && response.data.success) {
        localStorage.setItem(`bookmarkSubmitted_${ayah_id}`, true);
        this.showAlert = true;
        this.showErrorAlert = false;
        this.hideAlertAfterDelay();
    } else {
        console.error('Unexpected response:', response);
        this.showAlert = false;
        this.showErrorAlert = true;
        this.hideAlertAfterDelay();
    }
   } catch (error) {
    console.error('Error details:', error.response?.data || error.message);
    this.showAlert = false;
    this.showErrorAlert = true;
    this.hideAlertAfterDelay();
   }
},
  show() {
   const modalElement = document.getElementById(
    "folderSelectionModal"
   );
   const modal = new Modal(modalElement);
   modal.show();
  },
  resetForm() {
   this.selectedFolderId = null;
  },
  hideAlertAfterDelay() {
   setTimeout(() => {
    this.showAlert = false;
    this.showErrorAlert = false;
   }, 3000); // Hide alerts after 3 seconds
  },
 },
};
</script>

<style scoped>
/* Custom styles can go here */
</style>
