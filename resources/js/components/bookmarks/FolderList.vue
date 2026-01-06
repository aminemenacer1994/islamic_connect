<template>
  <div class="folder-list">
    <div class="folder-top" ref="createMenuWrap">
      <div class="folder-meta">
        <div class="folder-icon-box">
          <i class="bi bi-folder2-open"></i>
        </div>
        <div>
          <div class="folder-title">Folder Studio</div>
          <div class="folder-count">{{ folders.length }} folders</div>
        </div>
      </div>
      <div class="folder-top-actions">
        <button class="create-trigger" type="button" @click="toggleCreateMenu">
          <i class="bi bi-plus-lg"></i>
          <span>Create</span>
          <i class="bi bi-chevron-down"></i>
        </button>
      </div>
      <div v-if="createMenuOpen" class="create-menu">
        <button class="create-item" type="button" @click="startCreate('folder')">
          <span class="create-icon"><i class="bi bi-folder2"></i></span>
          <span>
            <strong>Folder</strong>
            <small>Organize your saved ayat</small>
          </span>
        </button>
        <button class="create-item" type="button" disabled>
          <span class="create-icon"><i class="bi bi-stars"></i></span>
          <span>
            <strong>Smart folder</strong>
            <small>Rule-based collection (coming soon)</small>
          </span>
        </button>
      </div>
    </div>

    <div v-if="showCreate" class="create-panel mb-3">
      <div class="create-heading">
        <span>Create new folder</span>
        <button class="btn btn-sm btn-link" type="button" @click="toggleCreate">
          Close
        </button>
      </div>
      <div class="mb-2">
        <input v-model.trim="newFolder.name" class="form-control" placeholder="New folder name" />
      </div>
      <div class="d-flex gap-2">
        <input v-model.trim="newFolder.icon" class="form-control" placeholder="Icon class" />
        <select v-model="newFolder.color" class="form-select">
          <option v-for="color in bootstrapColors" :key="color" :value="color">{{ color }}</option>
        </select>
      </div>
      <button class="btn btn-primary mt-2" :disabled="isCreating" @click="createFolder">
        <span v-if="isCreating" class="spinner-border spinner-border-sm me-2"></span>
        Create folder
      </button>
    </div>

    <div v-if="status" class="alert" :class="statusClass" role="alert">
      {{ status }}
    </div>

    <div class="folder-search mb-3">
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-search"></i></span>
        <input v-model.trim="searchQuery" type="text" class="form-control" placeholder="Search folders..." />
      </div>
    </div>

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
      <li class="list-group-item folder-section">
        <button type="button" class="folder-section-toggle" @click="showCustomFolders = !showCustomFolders">
          <span class="section-title">Custom folders</span>
          <span class="section-count">{{ filteredFolders.length }}</span>
          <i class="bi" :class="showCustomFolders ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
        </button>
      </li>
      <template v-if="showCustomFolders">
        <li
          v-for="folder in filteredFolders"
          :key="folder.id"
          class="list-group-item folder-item d-flex align-items-center justify-content-between"
          :class="{ active: selectedId === folder.id }"
          @click="selectFolder(folder)"
          @dragover.prevent
          @drop="handleDrop($event, folder)"
        >
          <div class="folder-main">
            <span class="folder-icon"><i :class="folder.icon || 'bi bi-folder2'"></i></span>
            <span class="folder-name" v-html="highlightFolderName(folder.name)"></span>
          </div>
          <div class="folder-actions" @click.stop>
            <span class="folder-count-pill">{{ folder.ayah_count }}</span>
            <button class="btn btn-sm btn-outline-secondary folder-action" @click="startRename(folder)">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger folder-action" @click="openDeleteConfirm(folder)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </li>
      </template>
    </ul>

    <div v-if="editingFolder" class="modal-backdrop fade show"></div>
    <div v-if="editingFolder" class="rename-modal card">
      <div class="card-body">
        <h6 class="mb-2">Rename folder</h6>
        <input v-model.trim="renameValue" class="form-control" />
        <div class="d-flex justify-content-end gap-2 mt-2">
          <button class="btn btn-outline-secondary" @click="cancelRename">Cancel</button>
          <button class="btn btn-primary" @click="saveRename">Save</button>
        </div>
      </div>
    </div>

    <div v-if="deleteConfirmOpen" class="modal-backdrop fade show"></div>
    <div
      v-if="deleteConfirmOpen"
      class="modal fade show delete-confirm-modal"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      style="display: block;"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">Delete folder?</h6>
            <button type="button" class="btn-close" aria-label="Close" @click="closeDeleteConfirm"></button>
          </div>
          <div class="modal-body">
            <p class="mb-0">Delete this folder and all saved ayat inside it?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" @click="closeDeleteConfirm">Cancel</button>
            <button type="button" class="btn btn-danger" :disabled="deleteBusy" @click="confirmDeleteFolder">
              <span v-if="deleteBusy" class="spinner-border spinner-border-sm me-2"></span>
              Delete
            </button>
          </div>
        </div>
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
      createMenuOpen: false,
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
      deleteBusy: false,
      status: '',
      statusVariant: 'success',
      bootstrapColors: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
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
  },
  mounted() {
    this.fetchFolders();
    document.addEventListener('click', this.onOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.onOutsideClick);
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
    toggleCreateMenu() {
      this.createMenuOpen = !this.createMenuOpen;
    },
    startCreate(type) {
      this.createType = type;
      this.createMenuOpen = false;
      if (!this.showCreate) {
        this.showCreate = true;
      }
    },
    onOutsideClick(event) {
      const wrap = this.$refs.createMenuWrap;
      if (!wrap || !this.createMenuOpen) return;
      if (!wrap.contains(event.target)) {
        this.createMenuOpen = false;
      }
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
      this.deleteCandidate = folder;
      this.deleteConfirmOpen = true;
      document.body.classList.add('modal-open');
    },
    closeDeleteConfirm() {
      this.deleteConfirmOpen = false;
      this.deleteCandidate = null;
      document.body.classList.remove('modal-open');
    },
    async confirmDeleteFolder() {
      if (!this.deleteCandidate) return;
      this.deleteBusy = true;
      try {
        await axios.delete(`/api/folders/${this.deleteCandidate.id}`);
        this.folders = this.folders.filter(item => item.id !== this.deleteCandidate.id);
        if (this.selectedId === this.deleteCandidate.id) {
          this.selectedId = null;
        }
        this.setStatus('Folder deleted.', 'success');
      } catch (error) {
        this.setStatus('Delete failed.', 'danger');
      } finally {
        this.deleteBusy = false;
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
      } catch (error) {
        this.setStatus('Unable to add ayah to folder.', 'danger');
      }
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
  --folder-accent: #0f6e63;
  --folder-accent-strong: #0b5c53;
  --folder-gold: #c89b3a;
  --folder-ink: #0f172a;
  --folder-muted: #64748b;
  position: relative;
}

.folder-top {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgba(15, 110, 99, 0.95), rgba(10, 50, 46, 0.96));
  color: #f8fafb;
  box-shadow: 0 18px 36px rgba(9, 20, 19, 0.25);
  margin-bottom: 14px;
  overflow: visible;
}

.folder-top::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 20%, rgba(200, 155, 58, 0.25), transparent 55%);
  opacity: 0.8;
  pointer-events: none;
  border-radius: inherit;
}

.folder-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 1;
}

.folder-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16);
}

.folder-title {
  font-size: 1rem;
  font-weight: 700;
}

.folder-count {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.7);
}

.folder-top-actions {
  position: relative;
  z-index: 1;
}

.create-trigger {
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.12);
  color: #f5f5f5;
  padding: 8px 14px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.create-trigger:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.create-menu {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: min(320px, calc(100vw - 32px));
  padding: 14px;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 22px 40px rgba(15, 23, 42, 0.18);
  display: grid;
  gap: 10px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  z-index: 20;
}

.create-item {
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: #ffffff;
  color: var(--folder-ink);
  text-align: left;
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.create-item:hover {
  border-color: rgba(15, 110, 99, 0.25);
  box-shadow: 0 10px 18px rgba(15, 23, 42, 0.12);
  transform: translateY(-1px);
}

.create-item strong {
  display: block;
  font-size: 0.95rem;
}

.create-item small {
  display: block;
  font-size: 0.8rem;
  color: var(--folder-muted);
}

.create-item:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

.create-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(15, 110, 99, 0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--folder-accent);
}

.create-panel {
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 16px 28px rgba(15, 23, 42, 0.1);
}

.create-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--folder-ink);
}

.create-heading .btn-link {
  padding: 0;
  font-size: 0.85rem;
  text-decoration: none;
  color: var(--folder-accent-strong);
}

.folder-search .input-group-text {
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.12);
  color: var(--folder-muted);
}

.folder-search .form-control {
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);
}

.folder-search .form-control:focus {
  box-shadow: 0 0 0 0.2rem rgba(15, 110, 99, 0.16);
  border-color: rgba(15, 110, 99, 0.35);
}

.folder-section {
  border: none;
  background: transparent;
  padding: 0;
  margin: 2px 0 0;
}

.folder-section-toggle {
  width: 100%;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.9);
  color: var(--folder-ink);
  border-radius: 999px;
  padding: 6px 12px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-weight: 700;
  font-size: 0.82rem;
  box-shadow: 0 10px 16px rgba(15, 23, 42, 0.08);
}

.folder-section-toggle .section-title {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--folder-muted);
}

.folder-section-toggle .section-count {
  margin-left: auto;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(15, 110, 99, 0.12);
  color: var(--folder-accent-strong);
  font-weight: 700;
}

.folder-stack {
  display: grid;
  gap: 10px;
}

.folder-item {
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 16px;
  padding: 12px 14px;
  background: #ffffff;
  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
  box-shadow: 0 12px 22px rgba(15, 23, 42, 0.08);
}

.folder-item:hover {
  box-shadow: 0 18px 28px rgba(15, 23, 42, 0.12);
  transform: translateY(-2px);
}

.folder-item.active {
  border-color: rgba(15, 110, 99, 0.4);
  box-shadow: 0 18px 30px rgba(15, 110, 99, 0.18);
  background: rgba(15, 110, 99, 0.08);
  color: var(--folder-ink);
}

.folder-main {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--folder-ink);
  font-weight: 600;
}

.folder-icon {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  background: rgba(15, 110, 99, 0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--folder-accent);
  font-size: 1.05rem;
}

.folder-name {
  font-weight: 600;
}

.search-hit {
  background: rgba(15, 110, 99, 1);
  color: #ffffff;
  border-radius: 6px;
  padding: 0 3px;
}

.folder-actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.folder-count-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  padding: 2px 10px;
  border-radius: 999px;
  background: rgba(15, 110, 99, 0.12);
  color: var(--folder-accent-strong);
  font-weight: 700;
  font-size: 0.8rem;
}

.folder-action {
  border-radius: 10px;
}

.rename-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 320px;
  transform: translate(-50%, -50%);
  z-index: 1050;
  border-radius: 16px;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.2);
}

.delete-confirm-modal .modal-content {
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  box-shadow: 0 22px 40px rgba(15, 23, 42, 0.18);
}

@media (max-width: 1199.98px) {
  .folder-top {
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .folder-top-actions {
    width: 100%;
  }

  .create-trigger {
    width: 100%;
    justify-content: space-between;
  }

  .create-menu {
    left: 0;
    right: 0;
  }
}

@media (max-width: 768px) {
  .folder-top {
    padding: 12px;
    border-radius: 16px;
    box-shadow: 0 14px 28px rgba(9, 20, 19, 0.22);
  }

  .folder-icon-box {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    font-size: 1.1rem;
  }

  .create-trigger {
    padding: 6px 12px;
    font-size: 0.9rem;
  }

  .create-menu {
    right: 0;
    left: auto;
  }

  .folder-item {
    padding: 10px 12px;
    border-radius: 14px;
    box-shadow: 0 10px 18px rgba(15, 23, 42, 0.1);
  }

  .folder-actions {
    flex-wrap: wrap;
    justify-content: flex-end;
  }
}

@media (max-width: 576px) {
  .folder-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .folder-count-pill {
    margin-right: auto;
  }
}

@media (max-width: 420px) {
  .folder-top {
    padding: 10px;
  }

  .folder-meta {
    gap: 10px;
  }

  .folder-icon-box {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    font-size: 1rem;
  }

  .folder-title {
    font-size: 0.95rem;
  }

  .folder-count {
    font-size: 0.75rem;
  }

  .create-menu {
    width: calc(100vw - 24px);
    right: 0;
    left: auto;
  }

  .folder-item {
    padding: 9px 10px;
  }
}

@media (max-width: 360px) {
  .folder-top {
    padding: 8px;
  }

  .create-trigger {
    padding: 5px 10px;
    font-size: 0.85rem;
  }

  .folder-item {
    padding: 8px 9px;
  }
}
</style>
