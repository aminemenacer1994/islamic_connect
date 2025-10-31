<template>
  <div id="app">
    <!-- Bookmarks Container -->
    <div class="container">
      <div v-if="bookmarks.length === 0" class="text-center py-5">
        <div class="card p-4 mx-auto" style="max-width:520px">
          <div class="mb-2">🔖</div>
          <h5 class="mb-2">No bookmarks yet</h5>
          <p class="text-muted mb-0">Save favorite ayahs from the Quran page to see them here.</p>
        </div>
      </div>
      <div v-else class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <div class="input-group" style="max-width:380px">
          <span class="input-group-text"><i class="bi bi-search"></i></span>
          <input v-model="query" class="form-control" placeholder="Search bookmarks..." />
        </div>
        <select v-model="sortBy" class="form-select" style="max-width:200px">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>
      <div v-if="bookmarks.length" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
        <div class="col" v-for="bookmark in filteredBookmarks" :key="bookmark.id">
          <!-- Bookmark Card -->
          <div class="card p-3">
            <div class="card-body">
              <!-- Bookmark details -->
              <!-- Truncated text example -->
              <div class="truncate">
                <h5> <strong>Surah Name:</strong></h5>
                {{ truncatedText(bookmark.surah_name) }}
              </div>
              <!-- End of truncated text -->
              <div class="mt-2">
                <h5><strong>Information:</strong></h5>
                {{ truncatedText(bookmark.ayah_verse_en) }}
              </div>
              <hr />
              <!-- Icons for actions -->
              <i
                class="bi bi-eye-fill h4"
                style="color:rgb(0, 191, 166); cursor:pointer"
                data-bs-toggle="modal"
                data-bs-target="#viewBookmark"
                @click="viewModal(bookmark)"
              ></i>
              <i
                class="bi bi-trash-fill h4 ml-3"
                style="color:rgb(0, 191, 166); cursor:pointer"
                @click="deleteBookmark(bookmark.id)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- View Bookmark Modal -->
    <div
      class="modal fade"
      id="viewBookmark"
      tabindex="-1"
      aria-labelledby="viewBookmarkLabel"
      aria-hidden="true"
     >
      <div class="modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="viewBookmarkLabel"><strong>View Bookmark</strong></h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="mb-3">
                <label class="form-label"><strong>Surah Name:</strong></label>
                <p class="mt-2 text-dark">
                  {{ form.surah_name }}
                </p>
              </div>
              <div class="mb-3">
                <label class="form-label"><strong>Arabic Verse:</strong></label>
                <p class="mt-2 text-dark">
                  {{ form.ayah_verse_ar }}
                </p>
              </div>
              <div class="mb-3">
                <label class="form-label"><strong>English Info:</strong></label>
                <p class="mt-2 text-dark">
                  {{ form.ayah_verse_en }}
                </p>
              </div>
              <div class="mb-3">
                <label class="form-label"><strong>Date Created:</strong></label>
                <p class="mt-2 text-dark">
                  {{ extractDate(form.created_at) }}
                </p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'BookmarksApp',
  mounted() {
    fetch("/api/userId")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user ID");
        }
        return response.json();
      })
      .then((data) => {
        const userId = data.userId;
        console.log("UserId:", userId);

        if (userId) {
          this.userId = userId;
          this.fetchBookmarks(this.userId);
        } else {
          console.error("User ID not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
      });
  },
  data() {
    return {
      bookmarks: [],
      query: '',
      sortBy: 'newest',
      form: {
        id: "",
        ayah_num: "",
        ayah_text: "",
        created_at: "",
        surah_name: "",
        ayah_num: "",
        ayah_verse_ar: "",
        ayah_verse_en: "",
        ayah_notes: "",
        created_at: ""
      },
      maxLength: 70,
    };
  },
  methods: {
    redirectToBookmark(url) {
      window.location.href = url;
    },
    extractDate(dateTimeString) {
      if (!dateTimeString) return '';
      return dateTimeString.split('T')[0];
    },
    async fetchBookmarks(userId) {
      try {
        const response = await fetch(`/api/fetch-bookmarks/${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        this.bookmarks = await response.json();
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    },
    truncatedText(text) {
      if (!text) return '';
      return text.length > this.maxLength
        ? text.substring(0, this.maxLength) + '...'
        : text;
    },
    
    viewModal(bookmark) {
      this.form = bookmark;
      const modalElement = new bootstrap.Modal(document.getElementById('viewBookmark'));
      modalElement.show();
    },
    deleteBookmark(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete bookmark!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`/api/delete-bookmarks/${id}`);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Bookmark deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          this.fetchBookmarks(this.userId);
        }
      });
    },
    closeModal() {
      const modalElement = document.getElementById('viewBookmark');
      const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
      if (bootstrapModal) {
        bootstrapModal.hide();
      }

      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    },
  },
  computed: {
    filteredBookmarks(){
      const q=(this.query||'').toLowerCase();
      const list=this.bookmarks.filter(b=>{
        const s=(b.surah_name||'').toLowerCase();
        const e=(b.ayah_verse_en||'').toLowerCase();
        return !q || s.includes(q) || e.includes(q);
      });
      return list.sort((a,b)=>{
        const da=new Date(a.created_at||0).getTime();
        const db=new Date(b.created_at||0).getTime();
        return this.sortBy==='newest'? db-da : da-db;
      });
    }
  },
};
</script>

<style scoped>
.modal-modern .modal-content{border:1px solid #e5e7eb; border-radius:16px; box-shadow:0 16px 40px rgba(15,23,42,.18)}
.modal-modern .modal-header{background:#fff; color:#111; border-bottom:1px solid #e5e7eb; border-top-left-radius:16px; border-top-right-radius:16px}
.modal-modern .btn-close{filter:none}
.modal-title {
  color: #343a40;
}

.text-dark {
  color: #343a40 !important;
}

.modal-footer .btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.modal-footer .btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

.modal-content {
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.modal-header {
  border-bottom: 1px solid #dee2e6;
}

.modal-footer {
  border-top: 1px solid #dee2e6;
}

.btn-close {
  outline: none;
  box-shadow: none;
}

/* Card polish for bookmark grid */
.card{border:1px solid #e6e8eb !important;border-radius:12px !important;box-shadow:0 1px 2px rgba(0,0,0,.06);transition:transform .12s ease, box-shadow .12s ease}
.card:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.10)}
.truncate{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.page-header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:12px 0 18px}
.page-title{font-weight:700}
.count-chip{background:#f7f7f8;border:1px solid #e6e8eb;padding:6px 10px;border-radius:999px;font-weight:600;color:#0b5d4b}
</style>
