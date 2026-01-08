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
                <p class="modal-subtitle">Pick a folder or create a new one.</p>
                <div class="header-meta">
                  <span class="meta-item">
                    <span class="meta-label">Folders</span>
                    <span class="meta-value">{{ folderCount }}</span>
                  </span>
                  <span class="meta-divider"></span>
                  <span class="meta-item">
                    <span class="meta-label">Selected</span>
                    <span class="meta-value">{{ selectedCount }}</span>
                  </span>
                </div>
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
                        <p class="section-desc">Select where this ayah will be saved.</p>
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
                      <label
                        v-for="folder in filteredFolders"
                        :key="folder.id"
                        :class="[
                          'folder-pill',
                          folder.color ? `pill-${folder.color}` : 'pill-neutral',
                          { 'is-selected': selectedFolderIds.includes(folder.id), 'is-disabled': folder.is_smart },
                        ]"
                      >
                        <input
                          type="checkbox"
                          :value="folder.id"
                          v-model="selectedFolderIds"
                          :disabled="folder.is_smart"
                        />
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
                        <p class="section-desc">Start a fresh collection for your reflections.</p>
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

            <div v-if="showFolderContents" class="section-card mt-3">
              <div class="section-header">
                <div class="section-title">
                  <span class="section-icon"><i class="fas fa-list-check"></i></span>
                  <div>
                    <h6>Folder contents</h6>
                    <p class="section-desc">Preview what is inside each folder.</p>
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
                  <div
                    v-for="folder in folders"
                    :key="`contents-${folder.id}`"
                    :class="['folder-content', { open: folderExpanded[folder.id] }]"
                  >
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
            <a href="/bookmarks" class="btn btn-manage">Open bookmarks</a>
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
    showFolderContents: {
      type: Boolean,
      default: false,
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
      feedbackDurationMs: 4000,
      closeTimer: null,
      authRedirectTimer: null,
      bootstrapColors: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      folderExpanded: {},
      folderContents: {},
      sectionOpen: {
        folders: true,
        create: false,
        contents: false,
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
    clearTimeout(this.closeTimer);
    clearTimeout(this.authRedirectTimer);
    this.cleanupModalState();
  },
  methods: {
    async onShow() {
      this.cleanupModalState();
      this.feedback = '';
      this.selectedFolderIds = [];
      this.currentBookmark = null;
      const isAuthed = await this.ensureAuthenticated();
      if (!isAuthed) return;
      Promise.all([this.fetchFolders(), this.fetchCurrentBookmark()]);
    },
    onHidden() {
      this.cleanupModalState();
      clearTimeout(this.feedbackTimer);
      clearTimeout(this.closeTimer);
      clearTimeout(this.authRedirectTimer);
    },
    async ensureAuthenticated() {
      try {
        const response = await axios.get('/api/userId');
        if (response.data?.userId) {
          return true;
        }
      } catch (_) {
        // fall through to redirect
      }
      this.setFeedback('Please log in to save bookmarks. Redirecting…', 'danger');
      clearTimeout(this.authRedirectTimer);
      this.authRedirectTimer = setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
      return false;
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
        this.normalizeSelectedFolders();
      } catch (error) {
        this.setFeedback('Unable to load folders right now.', 'danger');
      }
    },
    async fetchCurrentBookmark() {
      const surahNumber = Number(this.ayah?.surah_number || this.ayah?.surah_id);
      const ayahNumber = Number(this.ayah?.ayah_number || this.ayah?.ayah_num);
      if (!this.ayah || !surahNumber || !ayahNumber) {
        return;
      }
      try {
        const response = await axios.get('/api/ayah-bookmarks', {
          params: {
            surah_number: surahNumber,
            ayah_number: ayahNumber,
          },
        });
        const bookmark = Array.isArray(response.data?.data) ? response.data.data[0] : null;
        this.currentBookmark = bookmark || null;
        if (bookmark?.folders) {
          this.selectedFolderIds = bookmark.folders.map((folder) => folder.id);
        }
        this.normalizeSelectedFolders();
      } catch (error) {
        this.currentBookmark = null;
      }
    },
    normalizeSelectedFolders() {
      if (!this.folders.length) {
        return;
      }
      const allowedIds = new Set(
        this.folders.filter((folder) => !folder.is_smart).map((folder) => folder.id),
      );
      this.selectedFolderIds = this.selectedFolderIds.filter((id) => allowedIds.has(id));
    },
    isSmartFolder(folderId) {
      const folder = this.folders.find((item) => item.id === folderId);
      return !!folder?.is_smart;
    },
    async createFolder() {
      const isAuthed = await this.ensureAuthenticated();
      if (!isAuthed) return;
      if (!this.newFolder.name) {
        this.setFeedback('Folder name is required.', 'danger');
        return;
      }
      const name = this.newFolder.name.trim();
      
      // Refresh folders list to get latest state from backend
      await this.fetchFolders();
      
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
          // Refresh folders list to ensure we have the latest data
          await this.fetchFolders();
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
      const isAuthed = await this.ensureAuthenticated();
      if (!isAuthed) return;
      const surahNumber = Number(this.ayah?.surah_number || this.ayah?.surah_id);
      const ayahNumber = Number(this.ayah?.ayah_number || this.ayah?.ayah_num);
      if (!this.ayah || !surahNumber || !ayahNumber) {
        this.setFeedback('Select an ayah first.', 'danger');
        return;
      }

      this.isSaving = true;
      try {
        this.normalizeSelectedFolders();
        const selectedIds = Array.from(new Set(this.selectedFolderIds));
        const existingIds = this.currentBookmark?.folders?.map((folder) => folder.id) || [];
        const removeIds = existingIds.filter((id) => !selectedIds.includes(id));
        const removableIds = removeIds.filter((id) => !this.isSmartFolder(id));
        const addIds = selectedIds.filter((id) => !existingIds.includes(id));

        const payload = {
          surah_number: surahNumber,
          ayah_number: ayahNumber,
          surah_name: this.ayah.surah_name || this.ayah.surah?.name_en || 'Surah',
          ayah_verse_ar: this.ayah.ayah_verse_ar || this.ayah.ayah?.ayah_text || '',
          ayah_verse_en: this.ayah.ayah_verse_en || '',
          folder_ids: selectedIds,
        };
        const response = await axios.post('/api/ayah-bookmarks', payload);
        const bookmark = response.data?.bookmark || null;
        if (bookmark) {
          this.currentBookmark = bookmark;
        }

        let detachFailed = false;
        if (removableIds.length && this.currentBookmark?.id) {
          try {
            await Promise.all(
              removableIds.map((id) =>
                axios.delete(`/api/ayah-bookmarks/${this.currentBookmark.id}/folders/${id}`),
              ),
            );
            // Decrement count for removed folders
            removableIds.forEach((id) => {
              const folder = this.folders.find((f) => f.id === id);
              if (folder && folder.ayah_count > 0) {
                folder.ayah_count -= 1;
              }
            });
          } catch (error) {
            detachFailed = true;
          }
        }

        // Increment count for newly added folders
        addIds.forEach((id) => {
          const folder = this.folders.find((f) => f.id === id);
          if (folder) {
            folder.ayah_count = (folder.ayah_count || 0) + 1;
          }
        });

        await this.fetchCurrentBookmark();
        this.setFeedback(
          detachFailed
            ? 'Bookmark saved, but some folders could not be removed.'
            : 'Ayah saved to your bookmarks.',
          detachFailed ? 'danger' : 'success',
          { autoClose: !detachFailed },
        );
        this.$emit('saved', { ...payload, bookmark: this.currentBookmark });
      } catch (error) {
        this.setFeedback('Failed to save the bookmark.', 'danger');
      } finally {
        this.isSaving = false;
      }
    },
    setFeedback(message, variant, options = {}) {
      this.feedback = message;
      this.feedbackVariant = variant;
      clearTimeout(this.feedbackTimer);
      this.feedbackTimer = setTimeout(() => {
        this.feedback = '';
      }, this.feedbackDurationMs);
      if (options.autoClose) {
        clearTimeout(this.closeTimer);
        this.closeTimer = setTimeout(() => {
          this.hideModal();
        }, this.feedbackDurationMs);
      }
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
      
      const deletingMessage = ids.length === 1 ? 'Deleting folder...' : 'Deleting folders...';
      this.setFeedback(deletingMessage, 'success');
      
      try {
        // Delete each folder from backend permanently
        const deletePromises = ids.map(async (id) => {
          try {
            await axios.delete(`/api/folders/${id}`);
            return { id, success: true };
          } catch (error) {
            console.error(`Failed to delete folder ${id}:`, error);
            return { id, success: false, error };
          }
        });
        
        const results = await Promise.all(deletePromises);
        const successfulDeletes = results.filter(r => r.success).map(r => r.id);
        const failedDeletes = results.filter(r => !r.success);
        
        if (successfulDeletes.length > 0) {
          // Remove successfully deleted folders from local state
          this.folders = this.folders.filter((folder) => !successfulDeletes.includes(folder.id));
          this.selectedFolderIds = this.selectedFolderIds.filter((id) => !successfulDeletes.includes(id));
          this.selectedFoldersForDelete = [];
          
          // Clean up folder state for deleted folders
          successfulDeletes.forEach((id) => {
            const { [id]: removedExpanded, ...expanded } = this.folderExpanded;
            this.folderExpanded = expanded;
            const { [id]: removedContents, ...contents } = this.folderContents;
            this.folderContents = contents;
          });
        }
        
        this.pendingDelete = null;
        
        // Refresh folders list from backend to ensure everything is in sync
        await this.fetchFolders();
        
        // Show appropriate feedback
        if (failedDeletes.length === 0) {
          const successMessage = successfulDeletes.length === 1 
            ? 'Folder deleted permanently from backend.' 
            : `${successfulDeletes.length} folders deleted permanently from backend.`;
          this.setFeedback(successMessage, 'success');
        } else if (successfulDeletes.length === 0) {
          this.setFeedback('Failed to delete folders from backend.', 'danger');
        } else {
          this.setFeedback(
            `${successfulDeletes.length} deleted, ${failedDeletes.length} failed.`, 
            'danger'
          );
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Unable to delete folders from backend.';
        this.setFeedback(errorMessage, 'danger');
        this.pendingDelete = null;
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
  --bookmark-accent: #0f6e63;
  --bookmark-accent-strong: #0b5c53;
  --bookmark-accent-soft: rgba(15, 110, 99, 0.2);
  --bookmark-gold: #c89b3a;
  --bookmark-ink: #0f172a;
  --bookmark-muted: #64748b;
  --bookmark-border: rgba(15, 23, 42, 0.1);
  --bookmark-card: #ffffff;
  --bookmark-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
  position: relative;
  border-radius: 24px;
  border: 1px solid var(--bookmark-border);
  background:
    radial-gradient(120% 120% at 0% 0%, rgba(200, 155, 58, 0.12) 0%, transparent 45%),
    radial-gradient(120% 120% at 100% 0%, rgba(15, 110, 99, 0.16) 0%, transparent 45%),
    linear-gradient(160deg, #ffffff 0%, #f7fbfa 55%, #f6f0e7 100%);
  box-shadow: var(--bookmark-shadow);
  overflow: hidden;
  isolation: isolate;
  font-family: "Manrope", "Plus Jakarta Sans", "Poppins", sans-serif;
  color: var(--bookmark-ink);
  animation: modal-rise 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.bookmark-modal::before {
  content: '';
  position: absolute;
  top: -140px;
  right: -140px;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(15, 110, 99, 0.22), transparent 70%);
  pointer-events: none;
  opacity: 0.9;
}

.bookmark-modal::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    45deg,
    rgba(15, 110, 99, 0.04),
    rgba(15, 110, 99, 0.04) 1px,
    transparent 1px,
    transparent 14px
  );
  pointer-events: none;
  opacity: 0.4;
}

.bookmark-modal .modal-header {
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  padding: 22px 26px;
  background: linear-gradient(90deg, rgba(15, 110, 99, 0.18), rgba(255, 255, 255, 0.7));
  position: relative;
  z-index: 1;
}

.header-title {
  display: inline-flex;
  align-items: center;
  gap: 18px;
}

.header-icon {
  width: 56px;
  height: 56px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(15, 110, 99, 0.24), rgba(200, 155, 58, 0.18));
  color: var(--bookmark-accent);
  font-size: 1.3rem;
  box-shadow: inset 0 0 0 1px rgba(15, 110, 99, 0.2), 0 12px 20px rgba(15, 23, 42, 0.12);
}

.header-meta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(15, 110, 99, 0.12);
  border: 1px solid rgba(15, 110, 99, 0.25);
}

.meta-label {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--bookmark-accent-strong);
  font-weight: 700;
}

.meta-value {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--bookmark-ink);
}

.meta-divider {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: rgba(15, 110, 99, 0.3);
}

.bookmark-modal .modal-title {
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 6px;
}

.bookmark-modal .modal-subtitle {
  margin: 0;
  color: var(--bookmark-muted);
  font-size: 0.95rem;
}

.bookmark-modal .modal-body {
  padding: 22px 26px 10px;
  position: relative;
  z-index: 1;
}

.bookmark-alert {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.12);
  font-weight: 600;
  margin-bottom: 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
}

.bookmark-alert.alert-success {
  color: #0b5c53;
  background: rgba(15, 110, 99, 0.12);
}

.bookmark-alert.alert-danger {
  color: #991b1b;
  background: rgba(220, 38, 38, 0.12);
}

.alert-icon {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 110, 99, 0.12);
  font-size: 1.05rem;
}

.alert-text {
  font-size: 0.95rem;
}

.bookmark-modal .modal-footer {
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  padding: 18px 26px 22px;
  background: linear-gradient(0deg, rgba(15, 110, 99, 0.08), rgba(255, 255, 255, 0));
  position: relative;
  z-index: 1;
}

.btn-manage {
  border-radius: 999px;
  border: 1px solid rgba(15, 110, 99, 0.35);
  background: rgba(15, 110, 99, 0.12);
  color: var(--bookmark-accent-strong);
  font-weight: 700;
  padding: 8px 16px;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.btn-manage:hover {
  transform: translateY(-1px);
  border-color: rgba(15, 110, 99, 0.5);
  box-shadow: 0 10px 18px rgba(15, 23, 42, 0.12);
  color: var(--bookmark-accent-strong);
}

.section-card {
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  padding: 18px;
  background: linear-gradient(180deg, #ffffff 0%, #f7fbfa 100%);
  box-shadow: 0 18px 30px rgba(15, 23, 42, 0.08);
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.section-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(15, 110, 99, 0.12), rgba(200, 155, 58, 0.06), transparent 60%);
  opacity: 0.6;
  pointer-events: none;
}

.section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 22px 36px rgba(15, 23, 42, 0.12);
}

.section-title {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 1;
}

.section-desc {
  margin: 4px 0 0;
  font-size: 0.85rem;
  color: var(--bookmark-muted);
}

.section-icon {
  width: 48px;
  height: 48px;
  border-radius: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(15, 110, 99, 0.24), rgba(200, 155, 58, 0.12));
  color: var(--bookmark-accent);
  font-size: 1.2rem;
  box-shadow: inset 0 0 0 1px rgba(15, 110, 99, 0.18);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  position: relative;
  z-index: 1;
}

.section-actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.btn-clear {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--bookmark-accent);
  text-decoration: none;
  padding: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.btn-clear:hover {
  color: var(--bookmark-accent-strong);
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
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.section-toggle:hover {
  border-color: rgba(15, 110, 99, 0.4);
  color: var(--bookmark-accent);
  transform: translateY(-1px);
}

.section-header h6 {
  text-transform: uppercase;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  font-weight: 700;
  margin: 0;
  color: #111827;
}

.section-hint {
  font-size: 0.78rem;
  color: var(--bookmark-muted);
}

.folder-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.folder-search {
  border-radius: 14px;
  border-color: rgba(15, 23, 42, 0.12);
  margin-bottom: 12px;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.9);
}

.folder-pill {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 12px 14px 12px 12px;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: var(--pill-bg, #f9fafb);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  border-left: 4px solid var(--pill-accent, rgba(148, 163, 184, 0.5));
}

.folder-pill input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.folder-pill:hover {
  transform: translateY(-1px);
  border-color: rgba(15, 110, 99, 0.35);
  box-shadow: 0 14px 24px rgba(15, 23, 42, 0.14);
}

.folder-pill.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

.folder-pill.is-disabled:hover {
  transform: none;
  border-color: rgba(15, 23, 42, 0.12);
  box-shadow: none;
}

.folder-pill:focus-within {
  border-color: rgba(15, 110, 99, 0.45);
  box-shadow: 0 0 0 3px rgba(15, 110, 99, 0.15);
}

.folder-pill.is-selected {
  border-color: rgba(15, 110, 99, 0.55);
  box-shadow: 0 18px 30px rgba(15, 110, 99, 0.2);
  transform: translateY(-1px);
}

.folder-pill.is-selected .pill-icon {
  background: rgba(15, 110, 99, 0.2);
}

.folder-pill.is-selected .pill-title {
  color: var(--bookmark-accent-strong);
}

.folder-pill input:checked ~ .pill-check {
  opacity: 1;
  transform: scale(1);
}

.folder-pill input:checked + .pill-icon {
  color: var(--bookmark-accent);
}

.pill-icon {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  background: rgba(15, 110, 99, 0.1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--bookmark-accent);
}

.pill-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pill-title {
  font-weight: 700;
  color: #111827;
}

.pill-count {
  font-size: 0.75rem;
  color: var(--bookmark-muted);
}

.pill-check {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: 1px solid rgba(15, 110, 99, 0.3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--bookmark-accent);
  background: rgba(15, 110, 99, 0.12);
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.pill-neutral {
  --pill-accent: rgba(148, 163, 184, 0.6);
  --pill-bg: #f8fafb;
}

.pill-primary {
  --pill-accent: var(--bs-primary);
  --pill-bg: rgba(13, 110, 253, 0.08);
}

.pill-secondary {
  --pill-accent: var(--bs-secondary);
  --pill-bg: rgba(108, 117, 125, 0.08);
}

.pill-success {
  --pill-accent: var(--bs-success);
  --pill-bg: rgba(25, 135, 84, 0.08);
}

.pill-danger {
  --pill-accent: var(--bs-danger);
  --pill-bg: rgba(220, 53, 69, 0.08);
}

.pill-warning {
  --pill-accent: var(--bs-warning);
  --pill-bg: rgba(255, 193, 7, 0.12);
}

.pill-info {
  --pill-accent: var(--bs-info);
  --pill-bg: rgba(13, 202, 240, 0.12);
}

.pill-light {
  --pill-accent: rgba(148, 163, 184, 0.5);
  --pill-bg: #f8fafb;
}

.pill-dark {
  --pill-accent: var(--bs-dark);
  --pill-bg: rgba(33, 37, 41, 0.08);
}

.empty-state {
  padding: 14px;
  border-radius: 14px;
  border: 1px dashed rgba(15, 23, 42, 0.16);
  color: var(--bookmark-muted);
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
}

.btn-create {
  background: linear-gradient(135deg, #0f6e63, #0b5c53 65%, #1d9a84 100%);
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 16px 26px rgba(15, 110, 99, 0.24);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-create:hover {
  transform: translateY(-1px);
  box-shadow: 0 20px 30px rgba(15, 110, 99, 0.3);
}

.btn-create:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.icon-presets {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.icon-preset-btn {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: #ffffff;
  color: var(--bookmark-accent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.icon-preset-btn:hover {
  border-color: rgba(15, 110, 99, 0.4);
  transform: translateY(-1px);
  box-shadow: 0 10px 16px rgba(15, 23, 42, 0.12);
}

.icon-preset-btn.active {
  border-color: rgba(15, 110, 99, 0.5);
  box-shadow: 0 10px 18px rgba(15, 53, 48, 0.14);
}

.color-swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.color-swatch-btn {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  border: 2px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.color-swatch-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 0 2px rgba(15, 110, 99, 0.2);
}

.color-swatch-btn.active {
  box-shadow: 0 0 0 2px rgba(15, 110, 99, 0.35);
}

.btn-cancel {
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.16);
  color: #4b5563;
  background: #ffffff;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.btn-cancel:hover {
  border-color: rgba(15, 110, 99, 0.35);
  color: var(--bookmark-accent);
  transform: translateY(-1px);
}

.btn-save {
  border-radius: 12px;
  background: linear-gradient(135deg, #0f6e63, #0b5c53 65%, #1d9a84 100%);
  border: none;
  color: #fff;
  font-weight: 600;
  padding: 10px 20px;
  box-shadow: 0 18px 30px rgba(15, 110, 99, 0.26);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-save:hover {
  transform: translateY(-1px);
  box-shadow: 0 22px 34px rgba(15, 110, 99, 0.3);
}

.btn-save:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.folder-contents {
  display: grid;
  gap: 12px;
}

.folder-content {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 18px;
  background: linear-gradient(180deg, #fdfdfb 0%, #ffffff 100%);
  padding: 16px 18px;
  box-shadow: 0 16px 26px rgba(15, 23, 42, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  animation: list-pop 0.3s ease both;
}

.folder-content:hover {
  transform: translateY(-1px);
  box-shadow: 0 20px 30px rgba(15, 23, 42, 0.12);
  border-color: rgba(15, 110, 99, 0.2);
}

.folder-content.open {
  border-color: rgba(15, 110, 99, 0.3);
}

.folder-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 4px 0 10px;
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
  letter-spacing: -0.01em;
}

.folder-toggle-title {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.folder-toggle-icon {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: rgba(15, 110, 99, 0.12);
  color: var(--bookmark-accent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.folder-toggle-meta {
  display: inline-flex;
  align-items: center;
  font-size: 0.85rem;
  color: var(--bookmark-muted);
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
  border-radius: 16px;
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
  transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.folder-toggle-button:hover {
  border-color: rgba(15, 110, 99, 0.4);
  color: var(--bookmark-accent);
  transform: translateY(-1px);
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
  color: var(--bookmark-accent);
  background: rgba(15, 110, 99, 0.12);
}

.folder-items {
  margin-top: 10px;
  display: grid;
  gap: 12px;
  max-height: 320px;
  overflow: auto;
  padding-right: 6px;
}

.folder-items::-webkit-scrollbar {
  width: 6px;
}

.folder-items::-webkit-scrollbar-thumb {
  background: rgba(15, 110, 99, 0.25);
  border-radius: 999px;
}

.folder-item {
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  padding: 16px 18px;
  background: linear-gradient(135deg, #ffffff 0%, #f6fbfa 100%);
  box-shadow: 0 12px 22px rgba(15, 23, 42, 0.06);
  position: relative;
  border-left: 4px solid rgba(15, 110, 99, 0.2);
}

.folder-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #374151;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
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
  font-size: 1.4rem;
  font-family: "Amiri", "Noto Naskh Arabic", serif;
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

.bookmark-modal .form-control,
.bookmark-modal .form-select {
  border-radius: 12px;
  border-color: rgba(15, 23, 42, 0.12);
  box-shadow: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background: rgba(255, 255, 255, 0.96);
}

.bookmark-modal .form-control:focus,
.bookmark-modal .form-select:focus {
  border-color: rgba(15, 110, 99, 0.45);
  box-shadow: 0 0 0 3px rgba(15, 110, 99, 0.12);
}

.bookmark-modal button:focus-visible,
.bookmark-modal .btn:focus-visible {
  outline: 2px solid rgba(15, 110, 99, 0.4);
  outline-offset: 2px;
}

.modal-body .row .col-md-6:nth-child(1) .section-card {
  animation: card-rise 0.35s ease both;
  animation-delay: 0.05s;
}

.modal-body .row .col-md-6:nth-child(2) .section-card {
  animation: card-rise 0.35s ease both;
  animation-delay: 0.12s;
}

.modal-body > .section-card {
  animation: card-rise 0.35s ease both;
  animation-delay: 0.18s;
}

@media (max-width: 768px) {
  .bookmark-modal .modal-header,
  .bookmark-modal .modal-body,
  .bookmark-modal .modal-footer {
    padding-left: 16px;
    padding-right: 16px;
  }

  .header-icon {
    width: 46px;
    height: 46px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
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

@media (prefers-reduced-motion: reduce) {
  .bookmark-modal,
  .section-card,
  .folder-content {
    animation: none;
  }

  .section-card,
  .folder-content,
  .btn-create,
  .btn-save,
  .section-toggle,
  .folder-toggle-button,
  .icon-preset-btn,
  .color-swatch-btn {
    transition: none;
  }
}

@keyframes modal-rise {
  0% {
    opacity: 0;
    transform: translateY(16px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes card-rise {
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes list-pop {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>