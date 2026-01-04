<template>
  <div class="container-fluid">
    <div class="row g-3">
      <div class="col-12 col-lg-4">
        <folder-list @folder-selected="onFolderSelected" />
      </div>
      <div class="col-12 col-lg-8">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h5 class="mb-1">{{ selectedFolder ? selectedFolder.name : 'Folder contents' }}</h5>
            <div class="text-muted small">{{ normalizedItems.length }} ayat</div>
          </div>
          <span v-if="selectedFolder" class="badge text-bg-light">{{ sourceLabel }}</span>
        </div>

        <div v-if="loading" class="text-muted">Loading ayat...</div>
        <div v-else-if="normalizedItems.length === 0" class="empty-state">
          <div class="empty-title">No ayat saved yet</div>
          <div class="empty-subtitle">Save ayat from the Quran page or drag them onto a folder.</div>
        </div>

        <div v-else class="list-group ayah-list">
          <div v-for="item in normalizedItems" :key="item.row_key" class="list-group-item ayah-list-item">
            <div class="d-flex justify-content-between align-items-center">
              <div class="ayah-list-meta">{{ item.surah_name }} • Ayah {{ item.ayah_number }}</div>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target="#bookmarkModal"
                @click="prepareBookmark(item)"
              >
                <i class="bi bi-bookmark-plus"></i>
              </button>
            </div>
            <div class="ayah-list-ar" v-html="item.ayah_verse_ar"></div>
            <div v-if="item.ayah_verse_en" class="ayah-list-en">{{ item.ayah_verse_en }}</div>
          </div>
        </div>
      </div>
    </div>

    <bookmark-modal :ayah="activeAyah" @saved="onSaved" />
  </div>
</template>

<script>
import axios from 'axios';
import AyahRow from './AyahRow.vue';
import FolderList from './FolderList.vue';
import BookmarkModal from './BookmarkModal.vue';

export default {
  name: 'BookmarkManager',
  components: {
    AyahRow,
    FolderList,
    BookmarkModal,
  },
  data() {
    return {
      selectedFolder: null,
      items: [],
      source: 'manual',
      loading: false,
      activeAyah: null,
    };
  },
  computed: {
    sourceLabel() {
      if (this.source === 'smart') return 'Smart';
      if (this.source === 'all') return 'All';
      return 'Manual';
    },
    normalizedItems() {
      if (!this.items.length) return [];
      return this.items.map((item) => {
        if (this.source === 'smart') {
          return {
            row_key: `smart-${item.id}`,
            bookmark_id: null,
            surah_number: item.surah_id,
            surah_name: item.surah?.name_en || `Surah ${item.surah_id}`,
            ayah_number: item.ayah_id,
            ayah_verse_ar: item.ayah_text,
            ayah_verse_en: '',
          };
        }

        return {
          row_key: `bookmark-${item.id}`,
          bookmark_id: item.id,
          surah_number: item.surah_number || item.ayah?.surah_id,
          surah_name: item.surah_name || item.ayah?.surah?.name_en || 'Surah',
          ayah_number: item.ayah_number || item.ayah_num,
          ayah_verse_ar: item.ayah_verse_ar || item.ayah?.ayah_text,
          ayah_verse_en: item.ayah_verse_en || '',
        };
      });
    },
  },
  methods: {
    async onFolderSelected(folder) {
      this.selectedFolder = folder;
      this.loading = true;
      try {
        const response = folder.isAll
          ? await axios.get('/api/ayah-bookmarks')
          : await axios.get('/api/ayah-bookmarks', { params: { folder_id: folder.id } });
        const payload = response.data?.data ?? response.data?.bookmarks ?? response.data ?? [];
        this.items = Array.isArray(payload) ? payload : [];
        this.source = folder.isAll ? 'all' : response.data?.source || 'manual';
      } catch (error) {
        this.items = [];
      } finally {
        this.loading = false;
      }
    },
    prepareBookmark(payload) {
      this.activeAyah = {
        surah_number: payload.surah_number,
        surah_name: payload.surah_name,
        ayah_number: payload.ayah_number,
        ayah_verse_ar: payload.ayah_verse_ar,
        ayah_verse_en: payload.ayah_verse_en,
      };
    },
    onSaved() {
      if (this.selectedFolder) {
        this.onFolderSelected(this.selectedFolder);
      }
    },
  },
};
</script>

<style scoped>
.container-fluid {
  padding: 1rem 0;
}

.ayah-list {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.08);
}

.ayah-list-item {
  border: none;
  padding: 18px 20px;
  background: #ffffff;
}

.ayah-list-item + .ayah-list-item {
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

.ayah-list-meta {
  font-weight: 600;
  color: #1f2937;
  letter-spacing: -0.01em;
}

.ayah-list-ar {
  margin-top: 10px;
  font-size: 1.6rem;
  direction: rtl;
  text-align: right;
  color: #0a2e2a;
}

.ayah-list-en {
  margin-top: 6px;
  color: #4b5563;
  line-height: 1.7;
}

.empty-state {
  border-radius: 16px;
  border: 1px dashed rgba(15, 23, 42, 0.12);
  padding: 24px;
  text-align: center;
  color: #6b7280;
  background: #f9fafb;
}

.empty-title {
  font-weight: 600;
  color: #111827;
  margin-bottom: 6px;
}

.empty-subtitle {
  font-size: 0.9rem;
}
</style>
