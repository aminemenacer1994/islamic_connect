<template>
  <teleport to="body">
    <div class="modal fade" id="bookmarkModal" tabindex="-1" aria-labelledby="bookmarkModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content bookmark-modal">
          <div class="modal-header">
            <div class="header-title">
              <span class="header-icon"><i class="fas fa-bookmark"></i></span>
              <div>
                <h5 class="modal-title" id="bookmarkModalLabel">Save Ayah</h5>
                <p class="modal-subtitle">Keep your reflections organized and easy to return to.</p>
                <div class="header-meta">Folders: {{ folderCount }} | Selected: {{ selectedCount }}</div>
              </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-if="feedback" class="alert bookmark-alert" :class="feedbackClass" role="alert">
              <span class="alert-icon">
                <i :class="feedbackIcon"></i>
              </span>
              <span class="alert-text">{{ feedback }}</span>
            </div>

            <div class="row g-3">
              <div class="col-12 col-md-6">
                <div class="section-card h-100">
                  <div class="section-header">
                    <div class="section-title">
                      <span class="section-icon"><i class="fas fa-folder-open"></i></span>
                      <div>
                        <h6>Choose folders</h6>
                      </div>
                    </div>
                    <div class="section-actions">
                      <span class="section-hint">{{ selectedCount }} selected</span>
                      <button type="button" class="btn btn-link btn-clear" @click="clearSelection" v-if="selectedCount">
                        Clear
                      </button>
                      <button type="button" class="btn section-toggle" @click="toggleSection('folders')" :aria-expanded="sectionOpen.folders">
                        <i class="fas" :class="sectionOpen.folders ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                      </button>
                    </div>
                  </div>
                  <div v-show="sectionOpen.folders">
                    <input
                      v-if="folders.length"
                      v-model.trim="folderSearch"
                      type="search"
                      class="form-control form-control-sm folder-search"
                      placeholder="Search folders"
                    />
                    <div v-if="filteredFolders.length === 0" class="empty-state">No folders yet. Create one below.</div>
                    <div v-else class="folder-grid">
                      <label v-for="folder in filteredFolders" :key="folder.id" class="folder-pill" :class="folder.color ? `pill-${folder.color}` : 'pill-neutral'">
                        <input type="checkbox" :value="folder.id" v-model="selectedFolderIds" />
                        <span class="pill-icon">
                          <i v-if="folder.icon" :class="folder.icon"></i>
                          <i v-else class="fas fa-folder"></i>
                        </span>
                        <span class="pill-meta">
                          <span class="pill-title">{{ folder.name }}</span>
                          <span class="pill-count">{{ folder.ayah_count }} ayat</span>
                        </span>
                        <span class="pill-check">
                          <i class="fas fa-check"></i>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="section-card h-100">
                  <div class="section-header">
                    <div class="section-title">
                      <span class="section-icon"><i class="fas fa-plus-circle"></i></span>
                      <div>
                        <h6>Create new folder</h6>
                      </div>
                    </div>
                    <div class="section-actions">
                      <span class="section-hint">Add a custom collection</span>
                      <button type="button" class="btn section-toggle" @click="toggleSection('create')" :aria-expanded="sectionOpen.create">
                        <i class="fas" :class="sectionOpen.create ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                      </button>
                    </div>
                  </div>
                  <div v-show="sectionOpen.create" class="row g-2 align-items-end">
                    <div class="col-12">
                      <label class="form-label">Name</label>
                      <input v-model.trim="newFolder.name" type="text" class="form-control" placeholder="Reflection gems" />
                    </div>
                    <div class="col-12">
                      <label class="form-label">Icon</label>
                      <div class="icon-presets">
                        <button
                          v-for="preset in iconPresets"
                          :key="preset.icon"
                          type="button"
                          class="icon-preset-btn"
                          :class="{ active: newFolder.icon === preset.icon }"
                          @click="setIcon(preset.icon)"
                        >
                          <i :class="preset.icon"></i>
                        </button>
                      </div>
                    </div>
                    <div class="col-12">
                      <label class="form-label">Color</label>
                      <div class="color-swatches">
                        <button
                          v-for="color in bootstrapColors"
                          :key="`swatch-${color}`"
                          type="button"
                          class="color-swatch-btn"
                          :class="{ active: newFolder.color === color }"
                          :style="{ background: `var(--bs-${color})` }"
                          @click="setColor(color)"
                        ></button>
                      </div>
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
                <div class="section-title">
                  <span class="section-icon"><i class="fas fa-list-check"></i></span>
                  <div>
                    <h6>Folder contents</h6>
                  </div>
                </div>
                <div class="section-actions">
                  <span class="section-hint">Review or remove saved ayat</span>
                  <button
                    v-if="selectedFoldersForDelete.length"
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="requestDeleteSelectedFolders"
                  >
                    Delete selected ({{ selectedFoldersForDelete.length }})
                  </button>
                  <button type="button" class="btn section-toggle" @click="toggleSection('contents')" :aria-expanded="sectionOpen.contents">
                    <i class="fas" :class="sectionOpen.contents ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                  </button>
                </div>
              </div>
              <div v-show="sectionOpen.contents">
                <div v-if="pendingDelete" class="delete-confirm">
                  <div>
                    <div class="delete-title">{{ pendingDeleteTitle }}</div>
                    <div class="delete-note">Ayat in this folder will also be deleted.</div>
                  </div>
                  <div class="delete-actions">
                    <button type="button" class="btn btn-outline-secondary btn-sm" @click="cancelDelete">Cancel</button>
                    <button type="button" class="btn btn-danger btn-sm" @click="confirmDelete">Delete</button>
                  </div>
                </div>
                <div v-if="folders.length === 0" class="empty-state">No folders to show yet.</div>
                <div v-else class="folder-contents">
                  <div v-for="folder in folders" :key="`contents-${folder.id}`" class="folder-content">
                    <div class="folder-toggle">
                      <button class="folder-toggle-main" type="button" @click="toggleFolderContents(folder)">
                        <span class="folder-toggle-title">
                          <span class="folder-toggle-icon"><i class="fas fa-folder"></i></span>
                          {{ folder.name }}
                        </span>
                        <span v-if="folder.is_smart" class="folder-badge">Smart</span>
                      </button>
                    <div class="folder-toggle-actions">
                      <span class="folder-toggle-meta">{{ folder.ayah_count }} ayat</span>
                      <!-- <label class="folder-select">
                        <input
                          type="checkbox"
                          :value="folder.id"
                          v-model="selectedFoldersForDelete"
                          :disabled="folder.is_smart"
                        />
                        <span>Select</span>
                      </label> -->
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-danger"
                        :disabled="folder.is_smart"
                        @click="requestDeleteFolder(folder)"
                      >
                        <i class="fas fa-trash me-1"></i>
                        Delete
                      </button>
                        <button class="btn folder-toggle-button" type="button" @click="toggleFolderContents(folder)">
                          <i class="fas" :class="folderExpanded[folder.id] ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                        </button>
                      </div>
                    </div>
                    <div v-if="folderExpanded[folder.id]" class="folder-items">
                      <div v-if="folderContents[folder.id]?.loading" class="text-muted">Loading...</div>
                      <div v-else-if="!folderContents[folder.id]?.items?.length" class="text-muted">
                        No ayat saved in this folder.
                      </div>
                      <div v-else class="folder-item" v-for="item in folderContents[folder.id].items" :key="item.id">
                      <div class="folder-item-header">
                        <span>{{ item.surah_name || 'Surah' }} • Ayah {{ item.ayah_number || item.ayah_num }}</span>
                        <div class="folder-item-actions">
                          <div class="input-group input-group-sm move-group">
                            <select
                              class="form-select"
                              @change="moveAyahToFolder(item, folder, $event)"
                              :disabled="folder.is_smart"
                            >
                              <option value="" disabled>Move to...</option>
                              <option
                                v-for="target in moveTargetFolders(folder)"
                                :key="target.id"
                                :value="target.id"
                              >
                                {{ target.name }}
                              </option>
                            </select>
                          </div>
                          <button
                            class="btn btn-sm btn-outline-danger"
                            :disabled="folder.is_smart"
                            @click="removeAyahFromFolder(item, folder)"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                        <div class="folder-item-ar" v-html="item.ayah_verse_ar || item.ayah?.ayah_text"></div>
                        <div v-if="item.ayah_verse_en" class="folder-item-en">{{ item.ayah_verse_en }}</div>
                      </div>
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
        icon: 'fas fa-bookmark',
        color: 'primary',
      },
      isSaving: false,
      isCreatingFolder: false,
      feedback: '',
      feedbackVariant: 'success',
      feedbackTimer: null,
      bootstrapColors: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      folderExpanded: {},
      folderContents: {},
      sectionOpen: {
        folders: true,
        create: true,
        contents: true,
      },
      selectedFoldersForDelete: [],
      folderSearch: '',
      pendingDelete: null,
      iconPresets: [
        { icon: 'fas fa-bookmark' },
        { icon: 'fas fa-star' },
        { icon: 'fas fa-heart' },
        { icon: 'fas fa-book' },
        { icon: 'fas fa-book-open' },
        { icon: 'fas fa-leaf' },
        { icon: 'fas fa-mosque' },
        { icon: 'fas fa-kaaba' },
      ],
    };
  },
  computed: {
    feedbackClass() {
      return this.feedbackVariant === 'danger' ? 'alert-danger' : 'alert-success';
    },
    selectedCount() {
      return this.selectedFolderIds.length;
    },
    folderCount() {
      return this.folders.length;
    },
    filteredFolders() {
      const query = this.folderSearch.trim().toLowerCase();
      if (!query) return this.folders;
      return this.folders.filter((folder) => folder.name.toLowerCase().includes(query));
    },
    pendingDeleteTitle() {
      if (!this.pendingDelete) return '';
      if (this.pendingDelete.type === 'bulk') {
        return `Delete ${this.pendingDelete.count} folder(s)?`;
      }
      return `Delete the "${this.pendingDelete.name}" folder?`;
    },
    feedbackIcon() {
      return this.feedbackVariant === 'danger' ? 'fas fa-triangle-exclamation' : 'fas fa-circle-check';
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
    clearTimeout(this.feedbackTimer);
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
      clearTimeout(this.feedbackTimer);
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
      const name = this.newFolder.name.trim();
      const nameKey = name.toLowerCase();
      if (this.folders.some((folder) => (folder.name || '').trim().toLowerCase() === nameKey)) {
        this.setFeedback('Folder name already exists. Choose another.', 'danger');
        return;
      }

      this.isCreatingFolder = true;
      try {
        const response = await axios.post('/api/folders', {
          name,
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
          this.newFolder.icon = 'fas fa-bookmark';
          this.newFolder.color = 'primary';
          this.setFeedback('Folder created.', 'success');
        }
      } catch (error) {
        const apiMessage =
          error.response?.data?.message ||
          error.response?.data?.errors?.name?.[0];
        this.setFeedback(apiMessage || 'Failed to create folder.', 'danger');
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
        this.hideModal();
      } catch (error) {
        this.setFeedback('Failed to save the bookmark.', 'danger');
      } finally {
        this.isSaving = false;
      }
    },
    setFeedback(message, variant) {
      this.feedback = message;
      this.feedbackVariant = variant;
      clearTimeout(this.feedbackTimer);
      this.feedbackTimer = setTimeout(() => {
        this.feedback = '';
      }, 5000);
    },
    clearSelection() {
      this.selectedFolderIds = [];
    },
    toggleSection(section) {
      this.sectionOpen = {
        ...this.sectionOpen,
        [section]: !this.sectionOpen[section],
      };
    },
    requestDeleteFolder(folder) {
      if (!folder || folder.is_smart) {
        this.setFeedback('Smart folders cannot be deleted.', 'danger');
        return;
      }
      this.pendingDelete = {
        type: 'single',
        ids: [folder.id],
        name: folder.name,
      };
    },
    requestDeleteSelectedFolders() {
      const ids = this.selectedFoldersForDelete.filter((id) => {
        const folder = this.folders.find((item) => item.id === id);
        return folder && !folder.is_smart;
      });
      if (!ids.length) {
        this.setFeedback('Select folders to delete.', 'danger');
        return;
      }
      this.pendingDelete = {
        type: 'bulk',
        ids,
        count: ids.length,
      };
    },
    async confirmDelete() {
      const ids = this.pendingDelete?.ids || [];
      if (!ids.length) {
        this.pendingDelete = null;
        return;
      }
      try {
        await Promise.all(ids.map((id) => axios.delete(`/api/folders/${id}`)));
        this.folders = this.folders.filter((folder) => !ids.includes(folder.id));
        this.selectedFolderIds = this.selectedFolderIds.filter((id) => !ids.includes(id));
        this.selectedFoldersForDelete = [];
        ids.forEach((id) => {
          const { [id]: removedExpanded, ...expanded } = this.folderExpanded;
          this.folderExpanded = expanded;
          const { [id]: removedContents, ...contents } = this.folderContents;
          this.folderContents = contents;
        });
        this.pendingDelete = null;
        this.setFeedback(ids.length === 1 ? 'Folder deleted.' : 'Folders deleted.', 'success');
      } catch (error) {
        this.setFeedback('Unable to delete selected folders.', 'danger');
      }
    },
    cancelDelete() {
      this.pendingDelete = null;
    },
    hideModal() {
      this.$nextTick(() => {
        const modalEl = document.getElementById('bookmarkModal');
        if (!modalEl) return;
        const instance = Modal.getInstance(modalEl) || new Modal(modalEl);
        instance.hide();
      });
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
      if (folder?.is_smart) {
        this.setFeedback('Smart folders cannot be edited.', 'danger');
        return;
      }
      try {
        if (!confirm('Remove this ayah from the folder?')) {
          return;
        }
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
    moveTargetFolders(folder) {
      return this.folders.filter((target) => !target.is_smart && target.id !== folder.id);
    },
    setIcon(icon) {
      this.newFolder.icon = icon;
    },
    setColor(color) {
      this.newFolder.color = color;
    },
    async moveAyahToFolder(bookmark, fromFolder, event) {
      const targetId = Number(event?.target?.value);
      if (!bookmark?.id || !targetId) return;
      if (fromFolder?.is_smart) {
        this.setFeedback('Smart folders cannot be edited.', 'danger');
        return;
      }
      try {
        await axios.post(`/api/ayah-bookmarks/${bookmark.id}/folders`, {
          folder_ids: [targetId],
        });
        await axios.delete(`/api/ayah-bookmarks/${bookmark.id}/folders/${fromFolder.id}`);

        const fromItems = this.folderContents[fromFolder.id]?.items || [];
        this.folderContents = {
          ...this.folderContents,
          [fromFolder.id]: {
            loading: false,
            items: fromItems.filter((item) => item.id !== bookmark.id),
          },
        };
        const targetFolder = this.folders.find((folder) => folder.id === targetId);
        if (targetFolder) {
          targetFolder.ayah_count = (targetFolder.ayah_count || 0) + 1;
          if (fromFolder.ayah_count > 0) fromFolder.ayah_count -= 1;
          if (this.folderContents[targetId]?.items) {
            this.folderContents = {
              ...this.folderContents,
              [targetId]: {
                loading: false,
                items: [bookmark, ...this.folderContents[targetId].items],
              },
            };
          }
        }
        this.setFeedback('Ayah moved to another folder.', 'success');
        if (event?.target) {
          event.target.value = '';
        }
      } catch (error) {
        this.setFeedback('Unable to move this ayah.', 'danger');
      }
    },
  },
};
</script>

<style scoped>
.bookmark-modal {
  position: relative;
  border-radius: 22px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: linear-gradient(160deg, #ffffff 0%, #f6f9f9 100%);
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.2);
  overflow: hidden;
}

.bookmark-modal::before {
  content: '';
  position: absolute;
  top: -120px;
  right: -120px;
  width: 260px;
  height: 260px;
  background: radial-gradient(circle, rgba(15, 110, 99, 0.18), transparent 70%);
  pointer-events: none;
}

.bookmark-modal .modal-header {
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
  padding: 20px 24px;
  background: linear-gradient(90deg, rgba(15, 110, 99, 0.08), rgba(255, 255, 255, 0));
}

.header-title {
  display: inline-flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  width: 52px;
  height: 52px;
  border-radius: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 110, 99, 0.12);
  color: #0f6e63;
  font-size: 1.2rem;
  box-shadow: inset 0 0 0 1px rgba(15, 110, 99, 0.18);
}

.header-meta {
  font-size: 0.82rem;
  color: #6b7280;
  margin-top: 4px;
}

.bookmark-modal .modal-title {
  font-size: 1.45rem;
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

.bookmark-alert {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  border: none;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.1);
  font-weight: 600;
  margin-bottom: 16px;
}

.bookmark-alert.alert-success {
  background: rgba(22, 163, 74, 0.12);
  color: #166534;
}

.bookmark-alert.alert-danger {
  background: rgba(220, 38, 38, 0.12);
  color: #991b1b;
}

.alert-icon {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);
  font-size: 1.05rem;
}

.alert-text {
  font-size: 0.95rem;
}

.bookmark-modal .modal-footer {
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  padding: 16px 24px 20px;
}

.section-card {
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  padding: 16px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfcfc 100%);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
}

.section-title {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.section-icon {
  width: 46px;
  height: 46px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(15, 110, 99, 0.18), rgba(15, 110, 99, 0.05));
  color: #0f6e63;
  font-size: 1.2rem;
  box-shadow: inset 0 0 0 1px rgba(15, 110, 99, 0.18);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.section-actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.btn-clear {
  font-size: 0.78rem;
  font-weight: 600;
  color: #0f6e63;
  text-decoration: none;
  padding: 0;
}

.btn-clear:hover {
  color: #0b5c53;
}

.section-toggle {
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: #ffffff;
  color: #4b5563;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.section-toggle:hover {
  border-color: rgba(15, 110, 99, 0.4);
  color: #0f6e63;
}

.section-header h6 {
  text-transform: uppercase;
  font-size: 0.78rem;
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

.folder-search {
  border-radius: 10px;
  border-color: rgba(15, 23, 42, 0.12);
  margin-bottom: 12px;
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
  background: linear-gradient(135deg, #0f6e63, #0b5c53);
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

.icon-presets {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.icon-preset-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: #ffffff;
  color: #0f6e63;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon-preset-btn.active {
  border-color: rgba(15, 110, 99, 0.5);
  box-shadow: 0 8px 16px rgba(15, 53, 48, 0.12);
}

.color-swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.color-swatch-btn {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  border: 2px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.12);
}

.color-swatch-btn.active {
  box-shadow: 0 0 0 2px rgba(15, 110, 99, 0.35);
}

.btn-cancel {
  border-radius: 10px;
  border: 1px solid rgba(15, 23, 42, 0.16);
  color: #4b5563;
}

.btn-save {
  border-radius: 10px;
  background: linear-gradient(135deg, #0f6e63, #0b5c53);
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
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  background: linear-gradient(180deg, #f9fafb 0%, #ffffff 100%);
  padding: 14px 16px;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
}

.folder-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 4px 0 8px;
}

.folder-toggle-main {
  border: none;
  background: transparent;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  color: #111827;
  padding: 0;
  flex: 1;
  min-width: 0;
}

.folder-toggle-title {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.folder-toggle-icon {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  background: rgba(15, 110, 99, 0.12);
  color: #0f6e63;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.folder-toggle-meta {
  display: inline-flex;
  align-items: center;
  font-size: 0.85rem;
  color: #6b7280;
  margin-left: auto;
  margin-right: 8px;
  white-space: nowrap;
}

.folder-toggle-actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.delete-confirm {
  border-radius: 14px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  background: rgba(239, 68, 68, 0.08);
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.delete-title {
  font-weight: 700;
  color: #991b1b;
}

.delete-note {
  font-size: 0.8rem;
  color: #7f1d1d;
}

.delete-actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.folder-select {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #6b7280;
  white-space: nowrap;
}

.folder-select input {
  width: 16px;
  height: 16px;
  margin: 0;
}

.folder-toggle-button {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: #ffffff;
  color: #4b5563;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.folder-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #0f6e63;
  background: rgba(15, 110, 99, 0.12);
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
  border: 1px solid rgba(15, 23, 42, 0.06);
  padding: 14px 16px;
  background: #ffffff;
  box-shadow: 0 12px 22px rgba(15, 23, 42, 0.06);
  position: relative;
}

@media (max-width: 768px) {
  .bookmark-modal .modal-header,
  .bookmark-modal .modal-body,
  .bookmark-modal .modal-footer {
    padding-left: 16px;
    padding-right: 16px;
  }

  .header-icon {
    width: 44px;
    height: 44px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .section-actions {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .folder-grid {
    grid-template-columns: 1fr;
  }

  .folder-toggle {
    flex-direction: column;
    align-items: flex-start;
  }

  .folder-toggle-actions {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .delete-confirm {
    flex-direction: column;
    align-items: flex-start;
  }

  .delete-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .folder-item-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .folder-item-actions {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .move-group {
    width: 100%;
  }
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
  gap: 12px;
}

.folder-item-actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
}

.folder-item-actions .btn {
  min-width: 70px;
}

.move-group {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: auto;
}

.move-group .form-select {
  width: 140px;
}

.move-group {
  min-width: 190px;
}

.move-group .form-select {
  min-width: 120px;
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
