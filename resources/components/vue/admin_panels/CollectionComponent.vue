<template>
<div id="app" class="admin-page">
 <!-- <h1 class="pt-4 pb-3 text-center"><strong>Collections</strong></h1> -->

 <!-- Container visible only on mobile screens -->
 <div class="container text-center mt-3 d-md-none">
  <div class="collection-nav">
   <a class="collection-tab" href="/bookmarks">Bookmarks</a>
   <a class="collection-tab" href="/notes">Notes</a>
  </div>
 </div>

  <!-- Create Folder Toggle -->
  <div class="row align-items-center mb-3">
   <div class="col-md-3">
    <button class="btn btn-primary create-collection-btn w-100" type="button" @click="showCreate = !showCreate">
     <i class="bi" :class="showCreate ? 'bi-dash-circle' : 'bi-plus-circle'"></i>
     {{ showCreate ? 'Cancel' : 'Create New Collection' }}
    </button>
   </div>
  </div>

  <!-- Inline Create Folder Card -->
  <div v-if="showCreate" class="create-panel-card mb-4 animate__animated animate__fadeIn">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h5 class="card-title mb-0"><strong>Create new folder</strong></h5>
        <button type="button" class="btn-close" @click="showCreate = false"></button>
      </div>

      <div class="row g-4">
        <div class="col-md-4">
          <label class="form-label">Folder Name</label>
          <input v-model="newFolder.name" type="text" class="form-control" placeholder="Reflection Gems" required />
        </div>

        <div class="col-md-4">
          <label class="form-label">Quick Icon</label>
          <div class="icon-picker-grid">
            <button 
              v-for="preset in iconPresets" 
              :key="preset.icon"
              type="button" 
              class="icon-choice"
              :class="{ active: newFolder.icon === preset.icon }"
              @click="newFolder.icon = preset.icon"
              :title="preset.icon"
            >
              <i :class="preset.icon"></i>
            </button>
          </div>
          <small class="text-muted mt-2 d-block">Select an icon to personalize this collection.</small>
        </div>

        <div class="col-md-4">
          <label class="form-label">Theme Color</label>
          <div class="color-picker-grid">
            <button 
              v-for="color in bootstrapColors" 
              :key="color"
              type="button" 
              class="color-choice"
              :class="['bg-' + color, { active: newFolder.color === color }]"
              @click="newFolder.color = color"
            ></button>
          </div>
        </div>
      </div>

      <div class="mt-4 text-end">
        <button 
          class="btn btn-premium-save px-4 py-2" 
          @click="createFolder" 
          :disabled="!newFolder.name || isCreating"
        >
          <span v-if="isCreating" class="spinner-border spinner-border-sm me-2"></span>
          {{ isCreating ? 'Creating...' : 'Create Folder' }}
        </button>
      </div>
    </div>
  </div>

<div class="pt-4 pb-3">
  <div class="container collection-scroll">
    <button
      v-for="folder in folders"
      :key="folder.id"
      type="button"
      class="collection-pill"
      :class="{ active: selectedFolderId === folder.id }"
      @click="selectFolder(folder.id)"
    >
      <span>{{ folder.name }}</span>
      <i class="bi bi-trash" @click.stop="confirmDeleteFolder(folder.id)"></i>
    </button>
  </div>
</div>


 <!-- Display Bookmarks -->
 <div v-if="selectedFolderId">
  <div class="row">
   <hr class="container">
   <h5 class="pb-3 mt-3 text-center admin-count">
    <span class="count-label">You have</span>
    <span class="count-pill">{{ bookmarks.length }}</span>
    <span class="count-label">bookmarks in this collection</span>
   </h5>

   <div class="col-md-4 mb-4" v-for="bookmark in bookmarks" :key="bookmark.id">
    <div class="collection-card">
     <div class="card-body">
      <div class="truncate">
       <h6 class="section-label">Surah Name</h6>
       <div class="section-value">{{ truncatedText(bookmark.surah_name) }}</div>
      </div>
      <div class="mt-2">
       <h6 class="section-label">Information</h6>
       <div class="section-value">{{ truncatedText(bookmark.ayah_verse_en) }}</div>
      </div>
      <div class="collection-actions">
       <button class="btn btn-sm btn-outline-primary" type="button" @click="viewModal(bookmark)">
        <i class="bi bi-eye me-1"></i>
        View
       </button>
       <button class="btn btn-sm btn-outline-danger" type="button" @click="deleteBookmark(bookmark.id)">
        <i class="bi bi-trash me-1"></i>
        Delete
       </button>
      </div>
     </div>
    </div>
   </div>
  </div>
 </div>

 <!-- Modal -->
 <div class="modal fade" id="viewBookmarkModal" tabindex="-1" aria-labelledby="viewBookmarkModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-modern modal-fullscreen-md-down">
   <div class="modal-content">
    <div class="modal-header">
     <h5 class="modal-title" id="viewBookmarkModalLabel">Bookmark Details</h5>
     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
     <div class="collection-card">
      <div class="card-body">
       <div class="truncate">
        <h6 class="section-label">Surah Name</h6>
        <div class="section-value">{{ selectedBookmark.surah_name }}</div>
       </div>
       <div class="mt-2">
        <h6 class="section-label">Ayah Number</h6>
        <div class="section-value">{{ selectedBookmark.ayah_num }}</div>
       </div>
       <div class="mt-2">
        <h6 class="section-label">Arabic Verse</h6>
        <div class="section-value">{{ selectedBookmark.ayah_verse_ar }}</div>
       </div>
       <div class="mt-2">
        <h6 class="section-label">English Translation</h6>
        <div class="section-value">{{ selectedBookmark.ayah_verse_en }}</div>
       </div>
      </div>
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
import axios from "axios";
import Swal from 'sweetalert2';

export default {
 data() {
  return {
   folders: [],
   bookmarks: [],
   selectedFolderId: null,
   showCreate: false,
   isCreating: false,
   newFolder: {
     name: "",
     icon: "bi bi-folder2",
     color: "primary",
   },
   iconPresets: [
     { icon: 'bi bi-folder2' }, { icon: 'bi bi-heart' }, { icon: 'bi bi-star' },
     { icon: 'bi bi-bookmark' }, { icon: 'bi bi-book' }, { icon: 'bi bi-journal-text' },
     { icon: 'bi bi-lightbulb' }, { icon: 'bi bi-tags' }, { icon: 'bi bi-mosque' },
     { icon: 'bi bi-moon-stars' }, { icon: 'bi bi-sun' }, { icon: 'bi bi-cloud-sun' },
     { icon: 'bi bi-lightning-charge' }, { icon: 'bi bi-flower1' }, { icon: 'bi bi-leaf' },
     { icon: 'bi bi-tree' }, { icon: 'bi bi-water' }, { icon: 'bi bi-gem' },
     { icon: 'bi bi-gift' }, { icon: 'bi bi-emoji-smile' }, { icon: 'bi bi-mortarboard' },
     { icon: 'bi bi-layers' }, { icon: 'bi bi-columns-gap' }, { icon: 'bi bi-compass' },
     { icon: 'bi bi-flag' }, { icon: 'bi bi-shield-check' }, { icon: 'bi bi-cup-hot' },
     { icon: 'bi bi-pencil-square' }, { icon: 'bi bi-chat-dots' }, { icon: 'bi bi-person-check' }
   ],
   selectedBookmark: {},
   bootstrapColors: ['primary', 'success', 'warning', 'danger', 'info', 'secondary', 'dark'],
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
   }
  },

  async createFolder() {
   if (!this.newFolder.name.trim()) return;
   
   this.isCreating = true;
   try {
    const response = await axios.post("/folders", {
     name: this.newFolder.name,
     icon: this.newFolder.icon,
     color: this.newFolder.color,
    });
    this.folders.push(response.data.folder);
    
    // Reset and close
    this.newFolder.name = "";
    this.newFolder.icon = "bi bi-folder2";
    this.newFolder.color = "primary";
    this.showCreate = false;
    
    Swal.fire({
      icon: 'success',
      title: 'Collection Created',
      text: 'Your new collection is ready!',
      timer: 2000,
      showConfirmButton: false,
      background: '#ffffff',
      color: '#0f172a',
      iconColor: '#c89b3a', // Gold success icon
      customClass: {
        popup: 'premium-swal-popup',
        title: 'premium-swal-title'
      }
    });
   } catch (error) {
    console.error("Error creating folder:", error);
    Swal.fire({
      icon: 'error',
      title: 'Failed to create collection',
      text: error.response?.data?.message || 'Please try again.'
    });
   } finally {
    this.isCreating = false;
   }
  },
  async selectFolder(folderId) {
   this.selectedFolderId = folderId;
   this.fetchBookmarksByFolder(folderId);
  },

  async fetchBookmarksByFolder(folderId) {
   try {
    const response = await axios.get(`/folders/${folderId}/bookmarks`);
    console.log('Fetched bookmarks response:', response); // Log for debugging
    this.bookmarks = response.data.bookmarks;
   } catch (error) {
    console.error('Error fetching bookmarks by folder:', error);
   }
  },

  async confirmDeleteFolder(folderId) {
   const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#c89b3a",
    cancelButtonColor: "#64748b",
    confirmButtonText: "Yes, delete it!",
    iconColor: '#c89b3a'
   });

   if (result.isConfirmed) {
    this.deleteFolder(folderId);
   }
  },

  async deleteFolder(folderId) {
   try {
    await axios.delete(`/folders/${folderId}`);
    this.folders = this.folders.filter((folder) => folder.id !== folderId);
    if (this.selectedFolderId === folderId) {
     this.selectedFolderId = null;
     this.bookmarks = [];
    }
    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'The folder has been deleted.',
      timer: 1500,
      showConfirmButton: false,
      iconColor: '#c89b3a'
    });
   } catch (error) {
    console.error("Error deleting folder:", error);
    Swal.fire("Error!", "There was an issue deleting the folder.", "error");
   }
  },

  openCreateFolderModal() {
   this.showCreate = !this.showCreate;
  },

  truncatedText(text) {
   const maxLength = 70;
   return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  },

  viewModal(bookmark) {
   this.selectedBookmark = bookmark; // Set the selected bookmark for the modal
   const viewBookmarksModal = new bootstrap.Modal(
    document.getElementById("viewBookmarkModal")
   );
   viewBookmarksModal.show();
  },

  async deleteBookmark(id) {
   try {
    await axios.delete(`/api/delete-bookmarks/${id}`);
    this.fetchBookmarksByFolder(this.selectedFolderId); // Refresh bookmarks
   } catch (error) {
    console.error("Error deleting bookmark:", error);
   }
  },
 },
};
</script>

<style>
.collection-nav {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.collection-tab {
  flex: 1;
  text-decoration: none;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(15, 110, 99, 0.12);
  color: var(--admin-accent-strong);
  font-weight: 700;
  border: 1px solid rgba(15, 110, 99, 0.25);
}

.collection-tab:hover {
  color: var(--admin-accent-strong);
  background: rgba(15, 110, 99, 0.16);
}

.create-collection-btn {
  background: linear-gradient(135deg, var(--admin-accent), var(--admin-accent-strong)) !important;
  border: none !important;
  box-shadow: 0 12px 24px rgba(15, 110, 99, 0.2);
}

.create-collection-btn:hover {
  filter: brightness(0.95);
}

.collection-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 6px;
}

.collection-scroll::-webkit-scrollbar {
  height: 6px;
}

.collection-scroll::-webkit-scrollbar-thumb {
  background: rgba(15, 110, 99, 0.25);
  border-radius: 999px;
}

.collection-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border-radius: 999px;
  padding: 8px 14px;
  border: 1px solid var(--admin-border);
  background: #fff;
  color: var(--admin-ink);
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.collection-pill i {
  color: var(--admin-muted);
}

.collection-pill:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 18px rgba(38, 41, 46, 0.12);
  border-color: rgba(15, 110, 99, 0.3);
}

.collection-pill.active {
  background: rgba(15, 110, 99, 0.12);
  border-color: rgba(15, 110, 99, 0.4);
  color: var(--admin-accent-strong);
}

.collection-card {
  border: 1px solid var(--admin-border);
  border-radius: 16px;
  padding: 12px;
  background: #fff;
  box-shadow: 0 16px 32px rgba(38, 41, 46, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.collection-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 36px rgba(38, 41, 46, 0.12);
}

.collection-actions {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}

.section-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--admin-muted);
  margin: 0;
}

.section-value {
  color: var(--admin-ink);
  font-weight: 600;
}

.truncate {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2; /* Compatibility */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* New Create Panel Styles */
.create-panel-card {
  background: #ffffff;
  border: 1px solid var(--admin-border);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(38, 41, 46, 0.1);
  overflow: hidden;
  border-top: 4px solid var(--admin-accent);
}

.icon-picker-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  max-height: 180px;
  overflow-y: auto;
  padding: 4px;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
}

.icon-choice {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #64748b;
  transition: all 0.2s ease;
  padding: 0;
}

.icon-choice:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.icon-choice.active {
  background: var(--admin-accent-strong);
  color: #ffffff;
  border-color: var(--admin-accent-strong);
  box-shadow: 0 4px 12px rgba(15, 110, 99, 0.2);
}

.color-picker-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.color-choice {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 4px solid transparent;
  transition: all 0.2s ease;
  padding: 0;
}

.color-choice:hover {
  transform: scale(1.1);
}

.color-choice.active {
  border-color: #ffffff;
  box-shadow: 0 0 0 2px #e2e8f0;
  transform: scale(1.1);
}

.btn-premium-save {
  background: linear-gradient(135deg, #c89b3a, #b0872d) !important;
  border: none !important;
  color: white !important;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(200, 155, 58, 0.2);
  transition: all 0.2s ease;
}

.btn-premium-save:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(200, 155, 58, 0.3);
  filter: brightness(1.1);
}

.btn-premium-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.animate__animated {
  animation-duration: 0.4s;
}
</style>
