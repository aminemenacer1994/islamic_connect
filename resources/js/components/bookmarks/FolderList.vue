<template>
  <div class="folder-list">
    <div class="folder-top" ref="createMenuWrap">
      <div class="folder-meta">
        <div class="folder-icon-box">
          <i class="bi bi-folder2-open"></i>
        </div>
        <div>
          <div class="folder-title">New Folder</div>
          <div class="folder-count">{{ folders.length }} folders</div>
        </div>
      </div>
      <button class="create-trigger" type="button" @click="toggleCreateMenu">
        <i class="bi bi-plus-lg"></i>
        <span>Create</span>
        <i class="bi bi-chevron-down"></i>
      </button>
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

    <ul class="list-group">
      <li
        class="list-group-item d-flex align-items-center justify-content-between"
        :class="{ active: selectedId === 'all' }"
        @click="selectAll"
      >
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-collection"></i>
          <span>All bookmarks</span>
        </div>
      </li>
      <li
        v-for="folder in filteredFolders"
        :key="folder.id"
        class="list-group-item d-flex align-items-center justify-content-between"
        :class="{ active: selectedId === folder.id }"
        @click="selectFolder(folder)"
        @dragover.prevent
        @drop="handleDrop($event, folder)"
      >
        <div class="d-flex align-items-center gap-2">
          <i v-if="folder.icon" :class="folder.icon"></i>
          <span>{{ folder.name }}</span>
          <span class="badge rounded-pill bg-light text-dark">{{ folder.ayah_count }}</span>
        </div>
        <div class="d-flex align-items-center gap-2" @click.stop>
          <button class="btn btn-sm btn-outline-secondary" @click="startRename(folder)">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger" @click="deleteFolder(folder)">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </li>
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
      status: '',
      statusVariant: 'success',
      bootstrapColors: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
    };
  },
  computed: {
    statusClass() {
      return this.statusVariant === 'danger' ? 'alert-danger' : 'alert-success';
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
    async deleteFolder(folder) {
      if (!confirm('Delete this folder and all saved ayat inside it?')) return;
      try {
        await axios.delete(`/api/folders/${folder.id}`);
        this.folders = this.folders.filter(item => item.id !== folder.id);
        if (this.selectedId === folder.id) {
          this.selectedId = null;
        }
        this.setStatus('Folder deleted.', 'success');
      } catch (error) {
        this.setStatus('Delete failed.', 'danger');
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
  position: relative;
}

.folder-top {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px;
  border-radius: 16px;
  background: linear-gradient(135deg, #141414, #1f1f1f);
  color: #f5f5f5;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.25);
  margin-bottom: 14px;
}

.folder-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.folder-icon-box {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}

.folder-title {
  font-size: 1rem;
  font-weight: 600;
}

.folder-count {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.create-trigger {
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: #f5f5f5;
  padding: 8px 14px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.create-trigger:hover {
  background: rgba(255, 255, 255, 0.16);
  transform: translateY(-1px);
}

.create-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 320px;
  padding: 12px;
  border-radius: 18px;
  background: #1f1f1f;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
  display: grid;
  gap: 8px;
  z-index: 20;
}

.create-item {
  border: none;
  background: transparent;
  color: #f3f3f3;
  text-align: left;
  display: flex;
  gap: 12px;
  padding: 10px;
  border-radius: 12px;
  transition: background-color 0.2s ease;
}

.create-item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.create-item strong {
  display: block;
  font-size: 0.95rem;
}

.create-item small {
  display: block;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

.create-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.create-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.create-panel {
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  padding: 14px;
  background: #ffffff;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
}

.create-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  margin-bottom: 10px;
}

.create-heading .btn-link {
  padding: 0;
  font-size: 0.85rem;
  text-decoration: none;
}

.list-group-item {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 12px;
  margin-bottom: 8px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.list-group-item:hover {
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.1);
  transform: translateY(-1px);
}

.list-group-item.active {
  border-color: rgba(15, 110, 99, 0.3);
  box-shadow: 0 10px 20px rgba(15, 110, 99, 0.15);
}

.folder-search .input-group-text {
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.08);
}

.folder-search .form-control {
  border: 1px solid rgba(15, 23, 42, 0.08);
}

.folder-search .form-control:focus {
  box-shadow: 0 0 0 0.15rem rgba(15, 110, 99, 0.15);
  border-color: rgba(15, 110, 99, 0.3);
}

.rename-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 320px;
  transform: translate(-50%, -50%);
  z-index: 1050;
}
</style>
