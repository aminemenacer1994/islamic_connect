<template>
  <teleport to="body">
    <div class="modal fade" id="bookmarkModal" tabindex="-1" aria-labelledby="bookmarkModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content bookmark-modal">
          <div class="modal-header">
            <div>
              <h5 class="modal-title" id="bookmarkModalLabel">Save Ayah</h5>
              <p class="modal-subtitle">Keep your reflections organized and easy to return to.</p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-if="feedback" class="alert" :class="feedbackClass" role="alert">
              {{ feedback }}
            </div>

            <div class="row g-3">
              <div class="col-12 col-md-6">
                <div class="section-card h-100">
                  <div class="section-header">
                    <h6>Choose folders</h6>
                    <span class="section-hint">Pick one or more</span>
                  </div>
                  <div v-if="folders.length === 0" class="empty-state">No folders yet. Create one below.</div>
                  <div v-else class="folder-grid">
                    <label v-for="folder in folders" :key="folder.id" class="folder-pill" :class="folder.color ? `pill-${folder.color}` : 'pill-neutral'">
                      <input type="checkbox" :value="folder.id" v-model="selectedFolderIds" />
                      <span class="pill-icon">
                        <i v-if="folder.icon" :class="folder.icon"></i>
                        <i v-else class="bi bi-folder2"></i>
                      </span>
                      <span class="pill-meta">
                        <span class="pill-title">{{ folder.name }}</span>
                        <span class="pill-count">{{ folder.ayah_count }} ayat</span>
                      </span>
                      <span class="pill-check">
                        <i class="bi bi-check-lg"></i>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="section-card h-100">
                  <div class="section-header">
                    <h6>Create new folder</h6>
                    <span class="section-hint">Add a custom collection</span>
                  </div>
                  <div class="row g-2 align-items-end">
                    <div class="col-12">
                      <label class="form-label">Name</label>
                      <input v-model.trim="newFolder.name" type="text" class="form-control" placeholder="Reflection gems" />
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label">Icon</label>
                      <input v-model.trim="newFolder.icon" type="text" class="form-control" placeholder="bi-bookmark-heart" />
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label">Color</label>
                      <select v-model="newFolder.color" class="form-select">
                        <option v-for="color in bootstrapColors" :key="color" :value="color">{{ color }}</option>
                      </select>
                    </div>
                    <div class="col-12">
                      <button class="btn btn-create" :disabled="isCreatingFolder" @click="createFolder">
                        <span v-if="isCreatingFolder" class="spinner-border spinner-border-sm me-2"></span>
                        Create folder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="section-card mt-3">
              <div class="section-header">
                <h6>Folder contents</h6>
                <span class="section-hint">Review or remove saved ayat</span>
              </div>
              <div v-if="folders.length === 0" class="empty-state">No folders to show yet.</div>
              <div v-else class="folder-contents">
                <div v-for="folder in folders" :key="`contents-${folder.id}`" class="folder-content">
                  <button class="folder-toggle" type="button" @click="toggleFolderContents(folder)">
                    <span class="folder-toggle-title">{{ folder.name }}</span>
                    <span class="folder-toggle-meta">{{ folder.ayah_count }} ayat</span>
                    <i class="bi" :class="folderExpanded[folder.id] ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                  </button>
                  <div v-if="folderExpanded[folder.id]" class="folder-items">
                    <div v-if="folderContents[folder.id]?.loading" class="text-muted">Loading...</div>
                    <div v-else-if="!folderContents[folder.id]?.items?.length" class="text-muted">
                      No ayat saved in this folder.
                    </div>
                    <div v-else class="folder-item" v-for="item in folderContents[folder.id].items" :key="item.id">
                      <div class="folder-item-header">
                        <span>{{ item.surah_name || 'Surah' }} • Ayah {{ item.ayah_number || item.ayah_num }}</span>
                        <button class="btn btn-sm btn-outline-danger" @click="removeAyahFromFolder(item, folder)">
                          Remove
                        </button>
                      </div>
                      <div class="folder-item-ar" v-html="item.ayah_verse_ar || item.ayah?.ayah_text"></div>
                      <div v-if="item.ayah_verse_en" class="folder-item-en">{{ item.ayah_verse_en }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-cancel" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-save" :disabled="isSaving" @click="saveBookmark">
              <span v-if="isSaving" class="spinner-border spinner-border-sm me-2"></span>
              Save bookmark
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import axios from 'axios';
import { Modal } from 'bootstrap';

export default {
  name: 'BookmarkModal',
  props: {
    ayah: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      folders: [],
      selectedFolderIds: [],
      currentBookmark: null,
      newFolder: {
        name: '',
        icon: '',
        color: 'primary',
      },
      isSaving: false,
      isCreatingFolder: false,
      feedback: '',
      feedbackVariant: 'success',
      bootstrapColors: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      folderExpanded: {},
      folderContents: {},
    };
  },
  computed: {
    feedbackClass() {
      return this.feedbackVariant === 'danger' ? 'alert-danger' : 'alert-success';
    },
  },
  mounted() {
    const modalEl = document.getElementById('bookmarkModal');
    if (modalEl) {
      this.cleanupModalState();
      modalEl.addEventListener('show.bs.modal', this.onShow);
      modalEl.addEventListener('hidden.bs.modal', this.onHidden);
    }
  },
  beforeUnmount() {
    const modalEl = document.getElementById('bookmarkModal');
    if (modalEl) {
      modalEl.removeEventListener('show.bs.modal', this.onShow);
      modalEl.removeEventListener('hidden.bs.modal', this.onHidden);
      const instance = Modal.getInstance(modalEl);
      if (instance) instance.dispose();
    }
    this.cleanupModalState();
  },
  methods: {
    onShow() {
      this.cleanupModalState();
      this.feedback = '';
      this.selectedFolderIds = [];
      this.fetchFolders().then(() => this.fetchCurrentBookmark());
    },
    onHidden() {
      this.cleanupModalState();
    },
    cleanupModalState() {
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach((backdrop) => backdrop.parentNode?.removeChild?.(backdrop));
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
    },
    async fetchFolders() {
      try {
        const response = await axios.get('/api/folders');
        this.folders = response.data.data || [];
      } catch (error) {
        this.setFeedback('Unable to load folders right now.', 'danger');
      }
    },
    async fetchCurrentBookmark() {
      if (!this.ayah || !this.ayah.surah_number || !this.ayah.ayah_number) {
        return;
      }
      try {
        const response = await axios.get('/api/ayah-bookmarks', {
          params: {
            surah_number: this.ayah.surah_number,
            ayah_number: this.ayah.ayah_number,
          },
        });
        const bookmark = Array.isArray(response.data?.data) ? response.data.data[0] : null;
        this.currentBookmark = bookmark || null;
        if (bookmark?.folders) {
          this.selectedFolderIds = bookmark.folders.map((folder) => folder.id);
        }
      } catch (error) {
        this.currentBookmark = null;
      }
    },
    async createFolder() {
      if (!this.newFolder.name) {
        this.setFeedback('Folder name is required.', 'danger');
        return;
      }

      this.isCreatingFolder = true;
      try {
        const response = await axios.post('/api/folders', {
          name: this.newFolder.name,
          icon: this.newFolder.icon || null,
          color: this.newFolder.color || null,
        });
        const folder = response.data.folder;
        if (folder) {
          this.folders.unshift({
            ...folder,
            ayah_count: 0,
          });
          this.selectedFolderIds.push(folder.id);
          this.folderExpanded[folder.id] = true;
          this.folderContents[folder.id] = { loading: false, items: [] };
          this.newFolder.name = '';
          this.newFolder.icon = '';
          this.setFeedback('Folder created.', 'success');
        }
      } catch (error) {
        this.setFeedback('Failed to create folder.', 'danger');
      } finally {
        this.isCreatingFolder = false;
      }
    },
    async saveBookmark() {
      if (!this.ayah) {
        this.setFeedback('Select an ayah first.', 'danger');
        return;
      }

      this.isSaving = true;
      try {
        const payload = {
          surah_number: this.ayah.surah_number,
          ayah_number: this.ayah.ayah_number,
          surah_name: this.ayah.surah_name,
          ayah_verse_ar: this.ayah.ayah_verse_ar,
          ayah_verse_en: this.ayah.ayah_verse_en,
          folder_ids: this.selectedFolderIds,
        };
        await axios.post('/api/ayah-bookmarks', payload);
        this.setFeedback('Ayah saved to your bookmarks.', 'success');
        this.$emit('saved', payload);
        this.fetchCurrentBookmark();
        const modalEl = document.getElementById('bookmarkModal');
        if (modalEl) {
          const instance = Modal.getInstance(modalEl) || new Modal(modalEl);
          instance.hide();
        }
      } catch (error) {
        this.setFeedback('Failed to save the bookmark.', 'danger');
      } finally {
        this.isSaving = false;
      }
    },
    setFeedback(message, variant) {
      this.feedback = message;
      this.feedbackVariant = variant;
    },
    async toggleFolderContents(folder) {
      const isOpen = this.folderExpanded[folder.id];
      this.folderExpanded = {
        ...this.folderExpanded,
        [folder.id]: !isOpen,
      };
      if (isOpen) {
        return;
      }
      if (this.folderContents[folder.id]?.items) {
        return;
      }
      this.folderContents = {
        ...this.folderContents,
        [folder.id]: { loading: true, items: [] },
      };
      try {
        const response = await axios.get('/api/ayah-bookmarks', {
          params: { folder_id: folder.id },
        });
        const items = Array.isArray(response.data?.data) ? response.data.data : [];
        this.folderContents = {
          ...this.folderContents,
          [folder.id]: { loading: false, items },
        };
      } catch (error) {
        this.folderContents = {
          ...this.folderContents,
          [folder.id]: { loading: false, items: [] },
        };
      }
    },
    async removeAyahFromFolder(bookmark, folder) {
      if (!bookmark?.id) return;
      try {
        await axios.delete(`/api/ayah-bookmarks/${bookmark.id}/folders/${folder.id}`);
        const items = this.folderContents[folder.id]?.items || [];
        this.folderContents = {
          ...this.folderContents,
          [folder.id]: {
            loading: false,
            items: items.filter((item) => item.id !== bookmark.id),
          },
        };
        if (folder.ayah_count > 0) {
          folder.ayah_count -= 1;
        }
        if (this.currentBookmark?.id === bookmark.id) {
          this.selectedFolderIds = this.selectedFolderIds.filter((id) => id !== folder.id);
        }
      } catch (error) {
        this.setFeedback('Unable to remove this ayah.', 'danger');
      }
    },
  },
};
</script>

<style scoped>
.bookmark-modal {
  border-radius: 22px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: linear-gradient(180deg, #ffffff 0%, #f8fafb 100%);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
  overflow: hidden;
}

.bookmark-modal .modal-header {
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  padding: 20px 24px;
}

.bookmark-modal .modal-title {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.bookmark-modal .modal-subtitle {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.bookmark-modal .modal-body {
  padding: 20px 24px 8px;
}

.bookmark-modal .modal-footer {
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  padding: 16px 24px 20px;
}

.section-card {
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.section-header h6 {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  font-weight: 700;
  margin: 0;
  color: #111827;
}

.section-hint {
  font-size: 0.8rem;
  color: #6b7280;
}

.folder-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.folder-pill {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: #f8fafb;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.folder-pill input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.folder-pill:hover {
  transform: translateY(-1px);
  border-color: rgba(15, 110, 99, 0.3);
  box-shadow: 0 12px 20px rgba(15, 23, 42, 0.12);
}

.folder-pill input:checked ~ .pill-check {
  opacity: 1;
  transform: scale(1);
}

.folder-pill input:checked + .pill-icon {
  color: #0f6e63;
}

.pill-icon {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: rgba(15, 110, 99, 0.08);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #0f6e63;
}

.pill-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pill-title {
  font-weight: 600;
  color: #111827;
}

.pill-count {
  font-size: 0.75rem;
  color: #6b7280;
}

.pill-check {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  border: 1px solid rgba(15, 110, 99, 0.3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #0f6e63;
  background: #e6f4f1;
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.pill-neutral {
  background: #f8fafb;
}

.pill-primary {
  background: rgba(13, 110, 253, 0.08);
}

.pill-secondary {
  background: rgba(108, 117, 125, 0.08);
}

.pill-success {
  background: rgba(25, 135, 84, 0.08);
}

.pill-danger {
  background: rgba(220, 53, 69, 0.08);
}

.pill-warning {
  background: rgba(255, 193, 7, 0.12);
}

.pill-info {
  background: rgba(13, 202, 240, 0.12);
}

.pill-light {
  background: #f8fafb;
}

.pill-dark {
  background: rgba(33, 37, 41, 0.08);
}

.empty-state {
  padding: 12px;
  border-radius: 12px;
  border: 1px dashed rgba(15, 23, 42, 0.12);
  color: #6b7280;
  text-align: center;
}

.btn-create {
  background: #0f6e63;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 600;
}

.btn-create:hover {
  background: #0b5c53;
  color: #fff;
}

.btn-cancel {
  border-radius: 10px;
  border: 1px solid rgba(15, 23, 42, 0.16);
  color: #4b5563;
}

.btn-save {
  border-radius: 10px;
  background: #0f6e63;
  border: none;
  color: #fff;
  font-weight: 600;
  padding: 10px 18px;
}

.btn-save:hover {
  background: #0b5c53;
  color: #fff;
}

.folder-contents {
  display: grid;
  gap: 12px;
}

.folder-content {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 16px;
  background: linear-gradient(180deg, #f9fafb 0%, #ffffff 100%);
  padding: 14px 16px;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
}

.folder-toggle {
  width: 100%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  color: #111827;
  padding: 4px 0 8px;
}

.folder-toggle-meta {
  font-size: 0.85rem;
  color: #6b7280;
  margin-left: auto;
  margin-right: 12px;
}

.folder-items {
  margin-top: 10px;
  display: grid;
  gap: 12px;
  max-height: 300px;
  overflow: auto;
  padding-right: 6px;
}

.folder-item {
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  padding: 14px 16px;
  background: #ffffff;
  box-shadow: 0 12px 22px rgba(15, 23, 42, 0.06);
  position: relative;
}

.folder-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #374151;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
  padding-bottom: 8px;
}

.folder-item-ar {
  font-size: 1.35rem;
  direction: rtl;
  text-align: right;
  color: #0a2e2a;
  line-height: 2;
}

.folder-item-en {
  margin-top: 8px;
  font-size: 0.9rem;
  color: #4b5563;
  line-height: 1.7;
}

.folder-item .btn-outline-danger {
  border-radius: 999px;
  border-color: rgba(239, 68, 68, 0.5);
  color: #b91c1c;
  font-weight: 600;
  padding: 4px 12px;
}

.folder-item .btn-outline-danger:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.8);
}

</style>
