<template>
<div id="app">
 <h1 class="pt-4 pb-3 text-center"><strong>Collections</strong></h1>

 <!-- Container visible only on mobile screens -->
 <div class="container text-center mt-3 d-md-none">
  <div class="row pb-2 text-center">
   <div class="col">
    <span class="badge h3" style="width:100%;font-size:18px;border-radius:10px; color:#B70D52;background:#ead1dc">
     <a href="/bookmarks" style="text-decoration:none;color:#B70D52;background:#ead1dc">Bookmarks</a>
    </span>
   </div>
   <div class="col">
    <span class="badge h3" style="width:100%;font-size:18px;border-radius:10px; color:#3D8F67;background:#d1f4d0">
     <a href="/notes" style="text-decoration:none;color:#3D8F67;background:#d1f4d0">Notes</a>
    </span>
   </div>
  </div>
 </div>

 <!-- Create Folder Modal -->
 <div class="modal fade" id="createFolderModal" tabindex="-1" aria-labelledby="createFolderModalLabel" aria-hidden="true">
  <div class="modal-dialog">
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
 <h3 class="pb-3 mt-3 text-center">
  <strong>You have:</strong> <b style="color:rgb(0, 191, 166)">{{ folders.length }}</b> <strong>Collections</strong>
 </h3>
 <div class="row">
  <div class="col-md-2">
   <div class="button-63 " @click="openCreateFolderModal">
    <b>Create New Collection</b>
   </div>
  </div>
  <div class="col-md-2"></div>
  <div class="col-md-2"></div>
  <div class="col-md-2"></div>
  <div class="col-md-2"></div>
  <div class="col-md-2"></div>
 </div>

<div class="pt-5 pb-3">
  <h2>Collections:</h2>
  <div class="container scrollmenu">
    <a href="#" v-for="folder in folders" :key="folder.id" @click.prevent="selectFolder(folder.id)">
      <div class="flex justify-content-center mr-1">
        <button 
          :class="['btn', 'btn-success', { 'highlight': highlightedIndex === index }]" 
          @click="highlight(index)"
          style="linear-gradient(144deg, #AF40FF, #5B42F3 50%, #00DDEB);"
         >
          {{ folder.name }}        
          <i class="bi bi-trash" @click.prevent="confirmDeleteFolder(folder.id)"></i>

        </button>
      </div>
    </a>
  </div>
</div>


 <!-- Display Bookmarks -->
 <div v-if="selectedFolderId">
  <div class="row">
   <hr class="container">
   <h5 class="pb-3 mt-3 text-center">
    <strong>You have:</strong> <b style="color:rgb(0, 191, 166)">{{ bookmarks.length }}</b> <strong>bookmarks in this Collection</strong>
   </h5>

   <div class="col-md-4 mb-4" v-for="bookmark in bookmarks" :key="bookmark.id">
    <div class="card" style="border-radius:8px;padding:10px; border: 2px solid rgba(0, 191, 166);">
     <div class="card-body">
      <div class="truncate">
       <h5><strong>Surah Name:</strong></h5>
       {{ truncatedText(bookmark.surah_name) }}
      </div>
      <div class="mt-2">
       <h5><strong>Information:</strong></h5>
       {{ truncatedText(bookmark.ayah_verse_en) }}
      </div>
      <hr />
      <i class="bi bi-eye-fill h4" style="color:rgb(0, 191, 166); cursor:pointer" @click="viewModal(bookmark)"></i>
      <i class="bi bi-trash-fill h4 ml-3" style="color:rgb(0, 191, 166); cursor:pointer" @click="deleteBookmark(bookmark.id)"></i>
     </div>
    </div>
   </div>
  </div>
 </div>

 <!-- Modal -->
 <div class="modal fade" id="viewBookmarkModal" tabindex="-1" aria-labelledby="viewBookmarkModalLabel" aria-hidden="true">
  <div class="modal-dialog">
   <div class="modal-content">
    <div class="modal-header">
     <h5 class="modal-title" id="viewBookmarkModalLabel">Bookmark Details</h5>
     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
     <div class="card" style="border-radius:8px;padding:10px; border: 2px solid rgba(0, 191, 166);">
      <div class="card-body">
       <div class="truncate">
        <h5><strong>Surah Name:</strong></h5>
        {{ selectedBookmark.surah_name }}
       </div>
       <div class="mt-2">
        <h5><strong>Ayah Number:</strong></h5>
        {{ selectedBookmark.ayah_num }}
       </div>
       <div class="mt-2">
        <h5><strong>Arabic Verse:</strong></h5>
        {{ selectedBookmark.ayah_verse_ar }}
       </div>
       <div class="mt-2">
        <h5><strong>English Translation:</strong></h5>
        {{ selectedBookmark.ayah_verse_en }}
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
   isHighlighted: false,
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
  highlight(index) {
   this.highlightedIndex = index; // Set the highlighted button's index
  },
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
  selectFolder(folderId) {
      this.selectedFolderId = folderId; // Set the selected folder ID
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

.btn {
  transition: background-color 0.3s, color 0.3s;
}

.highlight {
  background-color: rgb(0, 191, 166);;
  color: rgb(255, 255, 255);
}

.scrollmenu {
 white-space: nowrap;
 overflow-y: auto;
}

.scrollmenu a {
 display: inline-block;
 text-align: center;
 text-decoration: none;
}

.btn-success.active {
  background-color: #007bff; /* Change to the desired color */
  border-color: #007bff; /* Change to the desired color */
  color: white;
}


@media (min-width: 768px) {
 .button-78 {
  padding: 19px 32px;
 }
}

.button-63 {
 align-items: center;
 background-image: linear-gradient(144deg, #AF40FF, #5B42F3 50%, #00DDEB);
 border: 0;
 border-radius: 8px;
 box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
 box-sizing: border-box;
 color: #FFFFFF;
 display: flex;
 font-family: Phantomsans, sans-serif;
 justify-content: center;
 line-height: 1em;
 padding: 9px 17px;
 text-decoration: none;
 cursor: pointer;
}

.button-63:active,
.button-63:hover {
 outline: 0;
}

@media (min-width: 768px) {
 .button-63 {
  color: #FFF;
  font-size: 18px;
  min-width: 196px;
 }
}

/* .button-33 {
 background-color: #c2fbd7;
 border-radius: 100px;
 box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset, rgba(44, 187, 99, .15) 0 1px 2px, rgba(44, 187, 99, .15) 0 2px 4px, rgba(44, 187, 99, .15) 0 4px 8px, rgba(44, 187, 99, .15) 0 8px 16px, rgba(44, 187, 99, .15) 0 16px 32px;
 color: green;
 cursor: pointer;
 display: inline-block;
 font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif;
 padding: 7px 20px;
 text-align: center;
 text-decoration: none;
 transition: all 250ms;
 border: 0;
 font-size: 16px;
 user-select: none;
 -webkit-user-select: none;
 touch-action: manipulation;
}

.button-33:hover {
 box-shadow: rgba(44, 187, 99, .35) 0 -25px 18px -14px inset, rgba(44, 187, 99, .25) 0 1px 2px, rgba(44, 187, 99, .25) 0 2px 4px, rgba(44, 187, 99, .25) 0 4px 8px, rgba(44, 187, 99, .25) 0 8px 16px, rgba(44, 187, 99, .25) 0 16px 32px;
 transform: scale(1.05) rotate(-1deg);
} */
</style>
