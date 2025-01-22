<template>
  <div id="app">
    <h2 class="pt-4 pb-3 text-center"><strong>Bookmarks</strong></h2>

    <!-- Container visible only on mobile screens -->
    <div class="container text-center mt-3 d-md-none">
      <div class="row pb-2 text-center">
        <div class="col">
          <span class="badge h3" style="width:100%;font-size:18px;border-radius:10px; color:#3D8F67;background:#d1f4d0">
            <a href="/notes" style="text-decoration:none;color:#3D8F67;background:#d1f4d0">Notes</a>
          </span>
        </div>

        <div class="col">
          <span class="badge h3" style="width:100%;font-size:18px;border-radius:10px; color:#0263FF;background:#c2d8fb">
            <a href="/profile" style="text-decoration:none;color:#0263FF;background:#c2d8fb">Profile</a>
          </span>
        </div>

        <div class="col">
          <span class="badge h3" style="width:100%;font-size:18px;border-radius:10px; color:#0263FF;background:#ead1dc">
            <a href="/home" style="text-decoration:none;color:#B70D52;background:#ead1dc">Home</a>
          </span>
        </div>

      </div>
    </div>

    <!-- Bookmarks Container -->
    <div class="container">
      <h3 class="pb-3 text-center">
        <strong>You have:</strong> <b style="color:rgb(0, 191, 166)">{{ bookmarks.length }}</b> <strong>bookmarks</strong>
      </h3>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="bookmark in bookmarks" :key="bookmark.id">
          <!-- Bookmark Card -->
          <div class="card" style="border-radius:8px;padding:10px; border: 2px solid rgba(0, 191, 166);">
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
      <div class="modal-dialog modal-lg">
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
};
</script>

<style scoped>
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
</style>
