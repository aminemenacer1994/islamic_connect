<template>
  <div id="app">
    <!-- Bookmarks Table (PrimeVue) -->
    <DataTable
      :value="bookmarks"
      :loading="loading"
      ref="dt"
      v-model:filters="filters"
      :globalFilterFields="(columns || []).map(c => c.field)"
      class="pt-4 modern-datatable teal-accent"
      showGridlines
      stripedRows
      rowHover
      responsiveLayout="scroll"
      paginator
      :rows="10"
      :rowsPerPageOptions="[10, 20, 50, 100]"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="Showing {first}–{last} of {totalRecords} bookmarks"
    >
      <template #header>
        <div class="table-toolbar">
          <div class="title"><i class="bi bi-bookmark-fill me-2"></i>Bookmarks</div>
          <span class="spacer"></span>
          <div class="search-wrapper">
            <i class="bi bi-search"></i>
            <input
              class="form-control form-control-sm border-0"
              type="text"
              v-model="searchValue"
              placeholder="Search bookmarks..."
              @input="onGlobalFilter"
            />
          </div>
        </div>
      </template>

      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" sortable>
        <template #body="{ data }">
          <span v-if="col.field==='created_at'">{{ extractDate(data.created_at) }}</span>
          <span v-else-if="col.field==='ayah_verse_en'">{{ truncatedText(data.ayah_verse_en) }}</span>
          <span v-else>{{ data[col.field] }}</span>
        </template>
      </Column>

      <Column header="Actions" :exportable="false" style="min-width: 14rem; text-align:center;">
        <template #body="{ data }">
          <div class="row-actions">
            <button type="button" class="btn btn-sm btn-primary" @click="viewModal(data)">
              <i class="bi bi-eye me-1"></i> View
            </button>
            <button class="btn btn-sm btn-danger" @click="deleteBookmark(data.id)">
              <i class="bi bi-trash me-1"></i> Delete
            </button>
          </div>
        </template>
      </Column>

      <template #empty>
        <div class="empty text-center py-4">No bookmarks yet. Save favorite ayahs from the Quran page to see them here.</div>
      </template>
      <template #footer>
        <span class="footer-count">Total: {{ bookmarks ? bookmarks.length : 0 }} bookmarks</span>
      </template>

    </DataTable>

    <!-- View Bookmark Modal -->
    <div
      class="modal fade"
      id="viewBookmark"
      ref="viewBookmarkModal"
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
import { FilterMatchMode } from 'primevue/api'

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
    // Bootstrap modal cleanup to avoid stuck backdrops
    const modalElement = this.$refs.viewBookmarkModal;
    if (modalElement && window.bootstrap?.Modal) {
      modalElement.addEventListener('hidden.bs.modal', this.onModalHidden);
    }
  },
  beforeUnmount() {
    const modalElement = this.$refs.viewBookmarkModal;
    if (modalElement) {
      modalElement.removeEventListener('hidden.bs.modal', this.onModalHidden);
      const instance = window.bootstrap?.Modal?.getInstance(modalElement);
      if (instance) instance.dispose();
    }
  },
  data() {
    return {
      loading: false,
      
      searchValue: '',
      filters: { global: { value: null, matchMode: FilterMatchMode.CONTAINS } },
      columns: [
        { field: 'surah_name', header: 'Surah' },
        { field: 'ayah_num', header: 'Ayah #' },
        { field: 'ayah_verse_en', header: 'English' },
        { field: 'created_at', header: 'Created' },
      ],
      bookmarks: [],
      userId: null,
      form: {
        id: "",
        ayah_num: "",
        ayah_text: "",
        surah_name: "",
        ayah_verse_ar: "",
        ayah_verse_en: "",
        ayah_notes: "",
        created_at: ""
      },
      maxLength: 70,
    };
  },
  methods: {
    onGlobalFilter(e){ this.filters.global.value = e.target.value; },
    redirectToBookmark(url) {
      window.location.href = url;
    },
    extractDate(dateTimeString) {
      if (!dateTimeString) return '';
      return dateTimeString.split('T')[0];
    },
    async fetchBookmarks(userId) {
      try {
        this.loading = true;
        const res = await axios.get(`/api/fetch-bookmarks/${userId}`);
        // support either array or { data: [...] }
        const payload = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
        this.bookmarks = payload;
        console.log('Loaded bookmarks:', this.bookmarks.length);
      } catch (error) {
        console.error('Failed to load bookmarks:', error);
      } finally {
        this.loading = false;
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
      const el = this.$refs.viewBookmarkModal || document.getElementById('viewBookmark');
      const instance = window.bootstrap?.Modal?.getOrCreateInstance
        ? window.bootstrap.Modal.getOrCreateInstance(el, { backdrop: true })
        : new bootstrap.Modal(el, { backdrop: true });
      instance.show();
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
      const el = this.$refs.viewBookmarkModal || document.getElementById('viewBookmark');
      const instance = window.bootstrap?.Modal?.getInstance(el) || (window.bootstrap ? null : bootstrap.Modal.getInstance(el));
      if (instance) instance.hide();
      // Fallback cleanup in case instance isn't available
      this.cleanupBackdrops();
    },
    onModalHidden() {
      this.cleanupBackdrops();
    },
    cleanupBackdrops() {
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(b => b.parentNode && b.parentNode.removeChild(b));
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
    },
  },
  computed: {},
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

/* DataTable polish to match other panels */
.modern-datatable{width:100%}
.table-toolbar{display:flex; align-items:center; gap:.75rem}
.table-toolbar .spacer{flex:1}
.table-toolbar .search-wrapper{display:flex; align-items:center; gap:.5rem; padding:.25rem .5rem; border:1px solid #e2e8f0; border-radius:8px; background:#fff}
.teal-accent .p-datatable-header{background:linear-gradient(0deg, #f6faf9, #fff); border:1px solid #e2e8f0; border-radius:12px}
.teal-accent .p-datatable-tbody > tr{transition:background .18s ease}
.teal-accent .p-datatable-tbody > tr:hover{background:#f1fcf9}
.row-actions{display:inline-flex; align-items:center; gap:.5rem}
.empty{color:#6b7280; padding:1rem}
.footer-count{color:#374151}
.truncate{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
</style>
