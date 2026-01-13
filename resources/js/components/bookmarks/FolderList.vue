<template>
  <div class="folder-list">
    <div class="folder-top">
      <div class="folder-meta">
        <div class="folder-icon-box">
          <i class="bi bi-folder2-open"></i>
        </div>
        <div>
          <div class="folder-title">Bookmark Folders</div>
          <div class="folder-count">{{ folders.length }} folders</div>
        </div>
      </div>
      <div class="folder-top-actions">
        <button class="create-trigger" type="button" @click="startCreate('folder')">
          <i class="bi bi-plus-lg"></i>
          <span>Create folder</span>
        </button>
      </div>
    </div>

    <div v-if="showCreate" class="create-panel mb-3 animate__animated animate__fadeIn">
      <div class="create-heading">
        <span>Create new folder</span>
        <button class="btn btn-sm btn-link" type="button" @click="toggleCreate">
          Close
        </button>
      </div>
      <div class="mb-3">
        <label class="form-label small text-muted">Folder Name</label>
        <input v-model.trim="newFolder.name" class="form-control" placeholder="Inspiration" />
      </div>

      <div class="mb-3">
        <label class="form-label small text-muted">Choose Icon</label>
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
      </div>

      <div class="mb-3">
        <label class="form-label small text-muted">Theme Color</label>
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

      <button class="btn btn-premium-save w-100" :disabled="isCreating || !newFolder.name" @click="createFolder">
        <span v-if="isCreating" class="spinner-border spinner-border-sm me-2"></span>
        {{ isCreating ? 'Creating...' : 'Create folder' }}
      </button>
    </div>

    <div v-if="status" class="alert" :class="statusClass" role="alert">
      {{ status }}
    </div>

    <div class="folder-scroll-area">
      <div class="folder-panel">
        <div class="folder-panel__controls">
          <div class="folder-search mb-3">
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-search"></i></span>
              <input
                v-model.trim="searchQuery"
                type="text"
                class="form-control"
                placeholder="Search folders..."
              />
            </div>
          </div>

          <div v-if="filteredFolders.length" class="selection-toolbar folder-selection-toolbar mb-3">
            <div class="selection-status">
              
              <div class="selection-status__count">
                <span>{{ selectedFolders.length || 0 }}</span>
                <small>folders held</small>
              </div>
            </div>
            <div class="toolbar-actions">
              <button
                type="button"
                class="selection-pill selection-pill--primary"
                @click="selectAllVisibleFolders"
                :disabled="filteredSelectableFolders.length === 0"
              >
                <i class="bi bi-check-all"></i>
                Select All
              </button>
              <button
                v-if="selectedFolders.length"
                type="button"
                class="selection-pill selection-pill--muted"
                @click="unselectAllFolders"
              >
                <i class="bi bi-x-circle"></i>
                Clear Selection
              </button>
            </div>
            <div class="toolbar-right">
              <button
                v-if="selectedFolders.length"
                type="button"
                class="btn delete-selected"
                @click="openBulkDeleteConfirm"
                :disabled="bulkDeleteBusy"
              >
                <span v-if="bulkDeleteBusy" class="spinner-border spinner-border-sm me-1"></span>
                <i v-else class="bi bi-trash me-1"></i>
                Delete Selected
              </button>
            </div>
          </div>
        </div>

        <div class="modal-section">
          <div v-if="editingFolder" class="rename-modal fade show">
            <div class="modal-header">
              <h6 class="modal-title">Rename folder</h6>
          </div>
          <div class="modal-body">
            <input v-model.trim="renameValue" class="form-control" placeholder="New folder name" />
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" @click="cancelRename">Cancel</button>
            <button class="btn btn-primary" @click="saveRename">Save</button>
          </div>
        </div>
        <div v-if="deleteConfirmOpen" class="delete-confirm-modal fade show">
          <div class="modal-header">
            <h6 class="modal-title">{{ deleteModalTitle }}</h6>
          </div>
          <div class="modal-body">
            <p>{{ deleteModalMessage }}</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" @click="closeDeleteConfirm">Cancel</button>
            <button
              type="button"
              class="btn btn-danger"
              :disabled="currentDeleteBusy"
              @click="deleteMode === 'bulk' ? confirmBulkDeleteFolders() : confirmDeleteFolder()"
            >
              <span v-if="currentDeleteBusy" class="spinner-border spinner-border-sm me-2"></span>
              Delete
            </button>
          </div>
        </div>
        </div>
      </div>

      <div class="folder-stack-wrap">
        <ul class="list-group folder-stack">
          <li
            class="list-group-item folder-item d-flex align-items-center justify-content-between"
            :class="{ active: selectedId === 'all' }"
            @click="selectAll"
          >
            <div class="folder-main">
              <span class="folder-icon"><i class="bi bi-collection"></i></span>
              <span class="folder-name">All bookmarks</span>
            </div>
          </li>

          <template v-if="showCustomFolders">
            <li
              v-for="folder in filteredFolders"
              :key="folder.id"
              class="list-group-item folder-item d-flex align-items-center justify-content-between gap-2"
              :class="{
                active: selectedId === folder.id,
                'folder-item-selected': isFolderSelected(folder.id),
              }"
              @click="selectFolder(folder)"
              @dragover.prevent
              @drop="handleDrop($event, folder)"
            >
              <div class="folder-main-wrapper d-flex align-items-center flex-grow-1">
                
                <div class="folder-main">
                  <input
                    @click.stop
                    type="checkbox"
                    class="form-check-input"
                    :id="`folder-select-${folder.id}`"
                    :checked="isFolderSelected(folder.id)"
                    :disabled="folder.is_smart"
                    :title="folder.is_smart ? 'Smart folders cannot be deleted' : ''"
                    @change="toggleFolderSelection(folder.id)"
                  />
                  <span class="folder-icon"><i :class="folder.icon || 'bi bi-folder2'"></i></span>
                  <span class="folder-name" v-html="highlightFolderName(folder.name)"></span>
                </div>
              </div>
              <div class="folder-actions" @click.stop>
                <span class="folder-count-pill">{{ folder.ayah_count }}</span>
                <button type="button" class="folder-action rename" @click="startRename(folder)">
                  <i class="bi bi-pencil"></i>
                </button>
                <button type="button" class="folder-action delete" @click="openDeleteConfirm(folder)">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'FolderList',
  data() {
    return {
      folders: [],
      selectedId: null,
      showCreate: false,
      showCustomFolders: true,
      searchQuery: '',
      newFolder: {
        name: '',
        icon: '',
        color: 'primary',
      },
      createType: 'folder',
      isCreating: false,
      editingFolder: null,
      renameValue: '',
      deleteConfirmOpen: false,
      deleteCandidate: null,
      deleteMode: 'single',
      deleteBusy: false,
      selectedFolders: [],
      bulkDeleteBusy: false,
      bulkDeleteCandidates: [],
      status: '',
      statusVariant: 'success',
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
      bootstrapColors: ['primary', 'success', 'warning', 'danger', 'info', 'secondary', 'dark'],
    };
  },
  computed: {
    statusClass() {
      return this.statusVariant === 'danger' ? 'alert-danger' : 'alert-success';
    },
    highlightTerms() {
      const query = (this.searchQuery || '').trim();
      if (!query) return [];
      const parts = query.split(/\s+/).filter(Boolean);
      return Array.from(new Set(parts)).sort((a, b) => b.length - a.length);
    },
    filteredFolders() {
      if (!this.searchQuery) return this.folders;
      const query = this.searchQuery.toLowerCase();
      return this.folders.filter((folder) => (folder.name || '').toLowerCase().includes(query));
    },
    filteredSelectableFolders() {
      return this.filteredFolders.filter((folder) => !folder.is_smart);
    },
    deleteModalTitle() {
      if (this.deleteMode === 'bulk' && this.bulkDeleteCandidates.length) {
        const count = this.bulkDeleteCandidates.length;
        return `Delete ${count} folder${count === 1 ? '' : 's'}?`;
      }
      return 'Delete folder?';
    },
    deleteModalMessage() {
      if (this.deleteMode === 'bulk' && this.bulkDeleteCandidates.length) {
        return 'Delete the selected folders and all saved ayat inside them?';
      }
      return 'Delete this folder and all saved ayat inside it?';
    },
    currentDeleteBusy() {
      return this.deleteMode === 'bulk' ? this.bulkDeleteBusy : this.deleteBusy;
    },
  },
  mounted() {
    this.fetchFolders();
  },
  beforeUnmount() {
  },
  methods: {
    highlightFolderName(name) {
      const clean = this.escapeHtml(String(name || ''));
      const terms = this.highlightTerms;
      if (!terms.length) return clean;
      return terms.reduce((acc, term) => {
        const regex = new RegExp(`(${this.escapeRegExp(term)})`, 'gi');
        return acc.replace(regex, '<mark class="search-hit">$1</mark>');
      }, clean);
    },
    escapeHtml(text) {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    },
    escapeRegExp(text) {
      return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },
    adjustFolderCount(folderId, delta) {
      const folder = this.folders.find((item) => item.id === folderId);
      if (!folder) return;
      const nextCount = Math.max(0, (folder.ayah_count || 0) + delta);
      folder.ayah_count = nextCount;
    },
    async fetchFolders() {
      try {
        const response = await axios.get('/api/folders');
        this.folders = response.data.data || [];
        if (!this.selectedId) {
          this.selectAll();
        }
      } catch (error) {
        this.setStatus('Failed to load folders.', 'danger');
      }
    },
    selectAll() {
      const allFolder = {
        id: 'all',
        name: 'All bookmarks',
        isAll: true,
      };
      this.selectedId = 'all';
      this.$emit('folder-selected', allFolder);
    },
    selectFolder(folder) {
      this.selectedId = folder.id;
      this.$emit('folder-selected', folder);
    },
    toggleCreate() {
      this.showCreate = !this.showCreate;
    },
    startCreate(type) {
      this.createType = type;
      this.showCreate = true;
    },
    async createFolder() {
      if (!this.newFolder.name) {
        this.setStatus('Folder name is required.', 'danger');
        return;
      }
      const name = this.newFolder.name.trim();
      const nameKey = name.toLowerCase();
      if (this.folders.some((folder) => (folder.name || '').trim().toLowerCase() === nameKey)) {
        this.setStatus('Folder name already exists. Choose another.', 'danger');
        return;
      }
      this.isCreating = true;
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
          this.newFolder.name = '';
          this.newFolder.icon = '';
          this.setStatus('Folder created.', 'success');
        }
      } catch (error) {
        const apiMessage =
          error.response?.data?.message ||
          error.response?.data?.errors?.name?.[0];
        this.setStatus(apiMessage || 'Could not create folder.', 'danger');
      } finally {
        this.isCreating = false;
      }
    },
    startRename(folder) {
      this.editingFolder = folder;
      this.renameValue = folder.name;
    },
    cancelRename() {
      this.editingFolder = null;
      this.renameValue = '';
    },
    openDeleteConfirm(folder) {
      if (!folder) return;
      if (folder.is_smart) {
        this.setStatus('Smart folders cannot be deleted.', 'danger');
        return;
      }
      this.deleteMode = 'single';
      this.deleteCandidate = folder;
      this.deleteConfirmOpen = true;
      document.body.classList.add('modal-open');
    },
    closeDeleteConfirm() {
      this.deleteConfirmOpen = false;
      this.deleteCandidate = null;
      this.bulkDeleteCandidates = [];
      this.deleteMode = 'single';
      document.body.classList.remove('modal-open');
    },
    selectAllCollection() {
      const allFolder = {
        id: 'all',
        name: 'All bookmarks',
        isAll: true,
      };
      this.selectedId = 'all';
      this.selectedFolders = [];
      this.$emit('folder-selected', allFolder);
    },

    async confirmDeleteFolder() {
      if (!this.deleteCandidate) return;
      this.deleteBusy = true;
      try {
        await axios.delete(`/api/folders/${this.deleteCandidate.id}`);
        this.folders = this.folders.filter(item => item.id !== this.deleteCandidate.id);
        if (this.selectedId === this.deleteCandidate.id) {
          this.selectAllCollection();
        }
        this.selectedFolders = this.selectedFolders.filter(
          (id) => id !== this.deleteCandidate?.id
        );
        this.setStatus('Folder deleted.', 'success');
        this.emitBookmarkChange();
      } catch (error) {
        this.setStatus('Delete failed.', 'danger');
      } finally {
        this.deleteBusy = false;
        this.closeDeleteConfirm();
      }
    },
    isFolderSelected(folderId) {
      return this.selectedFolders.includes(folderId);
    },
    toggleFolderSelection(folderId) {
      const folder = this.folders.find((item) => item.id === folderId);
      if (!folder || folder.is_smart) return;
      const index = this.selectedFolders.indexOf(folderId);
      if (index > -1) {
        this.selectedFolders.splice(index, 1);
      } else {
        this.selectedFolders.push(folderId);
      }
    },
    selectAllVisibleFolders() {
      const ids = this.filteredSelectableFolders.map((folder) => folder.id);
      this.selectedFolders = [...ids];
    },
    unselectAllFolders() {
      this.selectedFolders = [];
    },
    openBulkDeleteConfirm() {
      const ids = this.selectedFolders.filter((id) => {
        const folder = this.folders.find((item) => item.id === id);
        return folder && !folder.is_smart;
      });
      if (!ids.length) {
        this.setStatus('Select folders to delete.', 'danger');
        return;
      }
      this.bulkDeleteCandidates = [...ids];
      this.deleteMode = 'bulk';
      this.deleteConfirmOpen = true;
      document.body.classList.add('modal-open');
    },
    async confirmBulkDeleteFolders() {
      if (!this.bulkDeleteCandidates.length) return;
      this.bulkDeleteBusy = true;
      try {
        await Promise.all(
          this.bulkDeleteCandidates.map((id) =>
            axios.delete(`/api/folders/${id}`)
          )
        );
        const removedIds = new Set(this.bulkDeleteCandidates);
        this.folders = this.folders.filter((folder) => !removedIds.has(folder.id));
        this.selectedFolders = this.selectedFolders.filter(
          (id) => !removedIds.has(id)
        );
        if (removedIds.has(this.selectedId)) {
          this.selectAllCollection();
        }
        const count = this.bulkDeleteCandidates.length;
        this.setStatus(
          `${count} folder${count === 1 ? '' : 's'} deleted.`,
          'success'
        );
        this.emitBookmarkChange();
      } catch (error) {
        this.setStatus('Failed to delete selected folders.', 'danger');
      } finally {
        this.bulkDeleteBusy = false;
        this.closeDeleteConfirm();
      }
    },
    async saveRename() {
      if (!this.editingFolder || !this.renameValue) {
        return;
      }
      const name = this.renameValue.trim();
      const nameKey = name.toLowerCase();
      if (this.folders.some((folder) => folder.id !== this.editingFolder.id && (folder.name || '').trim().toLowerCase() === nameKey)) {
        this.setStatus('Folder name already exists. Choose another.', 'danger');
        return;
      }
      try {
        const response = await axios.put(`/api/folders/${this.editingFolder.id}`, {
          name,
        });
        const updated = response.data.folder;
        if (updated) {
          const idx = this.folders.findIndex(f => f.id === updated.id);
          if (idx !== -1) this.folders[idx].name = updated.name;
          this.setStatus('Folder renamed.', 'success');
        }
      } catch (error) {
        const apiMessage =
          error.response?.data?.message ||
          error.response?.data?.errors?.name?.[0];
        this.setStatus(apiMessage || 'Rename failed.', 'danger');
      } finally {
        this.cancelRename();
      }
    },
    async handleDrop(event, folder) {
      if (folder.is_smart) {
        this.setStatus('Smart folders cannot be edited.', 'danger');
        return;
      }

      const raw = event.dataTransfer.getData('text/plain');
      if (!raw) return;

      let payload;
      try {
        payload = JSON.parse(raw);
      } catch (error) {
        return;
      }

      try {
        if (payload.bookmark_id) {
          await axios.post(`/api/ayah-bookmarks/${payload.bookmark_id}/folders`, {
            folder_ids: [folder.id],
          });
        } else {
          await axios.post('/api/ayah-bookmarks', {
            surah_number: payload.surah_number,
            ayah_number: payload.ayah_number,
            surah_name: payload.surah_name,
            ayah_verse_ar: payload.ayah_verse_ar,
            ayah_verse_en: payload.ayah_verse_en,
            folder_ids: [folder.id],
          });
        }
        this.setStatus('Ayah added to folder.', 'success');
        this.fetchFolders();
        this.emitBookmarkChange();
      } catch (error) {
        this.setStatus('Unable to add ayah to folder.', 'danger');
      }
    },
    emitBookmarkChange() {
      const token = `folder-${Date.now()}`;
      try {
        localStorage.setItem('bookmarkRefresh', token);
      } catch (_) {
        // ignore
      }
      window.dispatchEvent(new CustomEvent('bookmarks-updated', {
        detail: { token, instance: 'folder-list' },
      }));
    },
    setStatus(message, variant) {
      this.status = message;
      this.statusVariant = variant;
      setTimeout(() => {
        this.status = '';
      }, 2500);
    },
  },
};
</script>

<style scoped>


.folder-list {
  border-radius: 22px;
  background: linear-gradient(180deg, #fdfdfd 0%, #f2faf5 100%);
  border: 1px solid rgba(15, 110, 99, 0.15);
  padding: 1.4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 14px 38px rgba(15, 23, 42, 0.08);
}

.folder-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 14px;
  background: #e3fbf2;
  color: #0f2926;
  border: 1px solid rgba(15, 110, 99, 0.35);
}

.folder-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.folder-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #0f6e63;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.folder-title {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.folder-count {
  font-size: 0.8rem;
  color: #19534a;
}

.folder-top-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.create-trigger {
  border: none;
  background: #0f6e63;
  color: #ffffff;
  padding: 6px 16px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.15);
}

.create-trigger:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 18px rgba(15, 23, 42, 0.2);
}

.create-panel {
  background: #f7fafc;
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 16px;
  padding: 1rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.create-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  margin-bottom: 12px;
}

.create-heading .btn-link {
  padding: 0;
  font-size: 0.9rem;
  color: #0f6e63;
}

.icon-picker-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;
  max-height: 160px;
  overflow-y: auto;
  padding: 0.5rem;
  background: #fff;
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 12px;
}

.icon-choice {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(148, 163, 184, 0.5);
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #6b7280;
}

.icon-choice.active {
  background: #0f6e63;
  color: #ffffff;
  border-color: rgba(15, 110, 99, 0.8);
}

.color-picker-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.color-choice {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 3px solid transparent;
  transition: all 0.2s ease;
}

.color-choice.active {
  border-color: #0f6e63;
  transform: scale(1.1);
}

.btn-premium-save {
  background: linear-gradient(135deg, #0f6e63, #24a48c);
  border: none;
  color: white;
  font-weight: 700;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 6px 14px rgba(15, 110, 99, 0.25);
  transition: all 0.2s ease;
}

.btn-premium-save:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 18px rgba(15, 110, 99, 0.35);
}

.btn-premium-save:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.folder-scroll-area {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: #f8fafc;
  border-radius: 20px;
  border: 1px solid rgba(15, 110, 99, 0.1);
  padding: 1rem;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
}

.folder-panel {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.folder-panel__controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.folder-search .input-group {
  border-radius: 18px;
  background: #effdf9;
  border: 1px solid rgba(15, 110, 99, 0.25);
  box-shadow: inset 0 2px 6px rgba(15, 23, 42, 0.08);
}

.folder-search .input-group-text {
  background: transparent;
  border: none;
  color: #0f6e63;
}

.folder-stack-wrap {
  flex: 1;
  max-height: calc(100vh - 360px);
  overflow-y: auto;
  padding: 0.75rem;
  background: #f2f7f3;
  border-radius: 18px;
  border: 1px solid rgba(15, 110, 99, 0.08);
  box-shadow: inset 0 2px 10px rgba(15, 110, 99, 0.06);
}

.folder-stack-wrap::-webkit-scrollbar {
  width: 7px;
}

.folder-stack-wrap::-webkit-scrollbar-track {
  background: transparent;
}

.folder-stack-wrap::-webkit-scrollbar-thumb {
  background: rgba(15, 110, 99, 0.45);
  border-radius: 999px;
}

.folder-stack {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.alert {
  border-radius: 999px;
  padding: 0.45rem 1rem;
  border: 1px solid transparent;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  font-weight: 600;
}

.alert-success {
  background: rgba(15, 110, 99, 0.12);
  color: #0f4a3a;
  border-color: rgba(15, 110, 99, 0.26);
}

.alert-danger {
  background: rgba(248, 113, 113, 0.15);
  color: #7f1d1d;
  border-color: rgba(239, 68, 68, 0.3);
}

.selection-toolbar.folder-selection-toolbar {
  border-radius: 20px;
  padding: 0.7rem 0.9rem;
  background: #e6f7ef;
  border: 1px solid rgba(15, 110, 99, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.selection-status {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.selection-status__title {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #0f6e63;
}

.selection-status__count {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
}

.selection-status__count span {
  font-size: 1.6rem;
  font-weight: 700;
  color: #057a6d;
}

.selection-status__count small {
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #0f6e63;
}

.toolbar-actions {
  display: flex;
  gap: 0.5rem;
}

.selection-pill {
  border-radius: 999px;
  /* padding: 0.4rem 1rem; */
  font-size: 0.85rem;
  font-weight: 600;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.15);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.selection-pill--primary {
  background: #0f6e63;
  color: #fff;
}

.selection-pill--muted {
  background: #fff;
  color: #0f6e63;
}

.selection-pill:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.18);
}

.selection-pill:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.toolbar-right .btn {
  padding: 0.35rem 1rem;
  border-radius: 14px;
  font-weight: 600;
}

.delete-selected {
  background: #dc2626;
  color: #fff;
  border: none;
  box-shadow: 0 8px 20px rgba(220, 38, 38, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.delete-selected:hover:not(:disabled) {
  transform: translateY(-1px);
}

.delete-selected:disabled {
  opacity: 0.6;
}

.folder-item {
  border: none;
  border-radius: 16px;
  padding: 0.75rem 0.9rem;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}

.folder-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.15);
}

.folder-item.active {
  background: #edf9f4;
  border: 1px solid rgba(15, 110, 99, 0.4);
}

.folder-main-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.folder-main {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  color: #0f172a;
}

.folder-icon {
  width: 38px;
  height: 38px;
  border-radius: 14px;
  background: #dff4ee;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #0f6e63;
  font-size: 1.05rem;
}

.folder-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.folder-action {
  border-radius: 12px;
  padding: 0.3rem 0.7rem;
  font-size: 0.75rem;
  border: 1px solid transparent;
  background: rgba(15, 23, 42, 0.05);
  color: #0f172a;
}

.folder-action.delete {
  background: rgba(239, 68, 68, 0.1);
  color: #b91c1c;
}

.folder-select {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.4rem;
}

.folder-select input {
  width: 18px;
  height: 18px;
  accent-color: #0f6e63;
}

.folder-count-pill {
  min-width: 32px;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(15, 110, 99, 0.15);
  color: #0f6e63;
  font-weight: 600;
  font-size: 0.78rem;
}

.modal-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.modal-section .rename-modal,
.modal-section .delete-confirm-modal {
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
  padding: 0.75rem;
}

.modal-section .modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.folder-panel__controls,
.folder-stack-wrap {
  width: 100%;
}

@media (max-width: 992px) {
  .folder-top {
    flex-wrap: wrap;
  }

  .toolbar-actions {
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .folder-list {
    padding: 1rem;
  }

  .folder-panel__controls {
    gap: 0.4rem;
  }

  .folder-search .input-group {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .folder-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
  }

  .folder-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
