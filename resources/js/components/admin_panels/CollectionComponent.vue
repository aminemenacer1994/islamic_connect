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

 <!-- Create Folder Modal -->
  <div class="modal fade" id="createFolderModal" tabindex="-1" aria-labelledby="createFolderModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-modern modal-fullscreen-md-down">
   <div class="modal-content">
    <div class="modal-header">
     <h5 class="modal-title" id="createFolderModalLabel">Create New Collection</h5>
     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
     <form @submit.prevent="createFolder">
      <div class="mb-3">
       <label for="folderName" class="form-label">Collection Name</label>
       <input type="text" id="folderName" v-model="newFolderName" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-success">Create Folder</button>

     </form>
    </div>
   </div>
  </div>
 </div>

 <!-- Folder Selection -->
 <div class="row align-items-center mb-3">
  <div class="col-md-3">
   <button class="btn btn-primary create-collection-btn w-100" type="button" @click="openCreateFolderModal">
    <i class="bi bi-plus-circle me-2"></i>
    Create New Collection
   </button>
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

export default {
 data() {
  return {
   folders: [],
   bookmarks: [],
   selectedFolderId: null,
   newFolderName: "",
   selectedBookmark: {}, // Holds the selected bookmark details for the modal
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
   try {
    const response = await axios.post("/folders", {
     name: this.newFolderName,
    });
    this.folders.push(response.data.folder);
    this.newFolderName = "";
    const modal = bootstrap.Modal.getInstance(
     document.getElementById("createFolderModal")
    );
    if (modal) {
     modal.hide();
    }
   } catch (error) {
    console.error("Error creating folder:", error);
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
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
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
    Swal.fire("Deleted!", "The folder has been deleted.", "success");
   } catch (error) {
    console.error("Error deleting folder:", error);
    Swal.fire("Error!", "There was an issue deleting the folder.", "error");
   }
  },

  openCreateFolderModal() {
   const modal = new bootstrap.Modal(
    document.getElementById("createFolderModal")
   );
   modal.show();
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
  box-shadow: 0 10px 18px rgba(15, 23, 42, 0.12);
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
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.collection-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 36px rgba(15, 23, 42, 0.12);
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
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
