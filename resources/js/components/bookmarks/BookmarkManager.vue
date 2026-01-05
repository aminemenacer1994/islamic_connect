<template>
  <div class="container-fluid bookmark-manager">
    <div class="row g-4">
      <div class="col-12 col-lg-4">
        <folder-list @folder-selected="onFolderSelected" />
      </div>
      <div class="col-12 col-lg-8">
        <div class="bookmark-panel">
          <div class="panel-header">
            <div>
              <div class="panel-eyebrow">Collection</div>
              <h5 class="panel-title">{{ selectedFolder ? selectedFolder.name : 'Folder contents' }}</h5>
              <div class="panel-subtitle">{{ normalizedItems.length }} ayat</div>
            </div>
            <div class="panel-actions">
              <span v-if="selectedFolder" class="source-pill">{{ sourceLabel }}</span>
            </div>
          </div>

          <div class="panel-body">
            <div v-if="loading" class="loading-state">Loading ayat...</div>
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
                    class="btn btn-sm btn-outline-secondary bookmark-quick"
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
.bookmark-manager {
  --bm-accent: #0f6e63;
  --bm-accent-strong: #0b5c53;
  --bm-gold: #c89b3a;
  --bm-ink: #0f172a;
  --bm-muted: #64748b;
  --bm-border: rgba(15, 23, 42, 0.1);
  padding: 1rem 0;
  position: relative;
}

.bookmark-manager::before {
  content: '';
  position: absolute;
  top: -80px;
  right: -120px;
  width: 260px;
  height: 260px;
  background: radial-gradient(circle, rgba(15, 110, 99, 0.18), transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.bookmark-manager::after {
  content: '';
  position: absolute;
  bottom: -120px;
  left: -140px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(200, 155, 58, 0.14), transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.bookmark-manager > .row {
  position: relative;
  z-index: 1;
}

.bookmark-panel {
  border-radius: 24px;
  border: 1px solid var(--bm-border);
  background:
    radial-gradient(120% 120% at 0% 0%, rgba(200, 155, 58, 0.12) 0%, transparent 50%),
    radial-gradient(120% 120% at 100% 0%, rgba(15, 110, 99, 0.16) 0%, transparent 50%),
    linear-gradient(160deg, #ffffff 0%, #f7fbfa 60%, #f6f0e7 100%);
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.16);
  overflow: hidden;
  position: relative;
  animation: panel-rise 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  background: linear-gradient(90deg, rgba(15, 110, 99, 0.18), rgba(255, 255, 255, 0.85));
}

.panel-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.65rem;
  color: var(--bm-accent-strong);
  font-weight: 700;
}

.panel-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--bm-ink);
  margin: 2px 0 4px;
}

.panel-subtitle {
  font-size: 0.85rem;
  color: var(--bm-muted);
}

.panel-actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.source-pill {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid rgba(15, 110, 99, 0.3);
  background: rgba(15, 110, 99, 0.12);
  color: var(--bm-accent-strong);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.panel-body {
  padding: 20px 24px 24px;
}

.loading-state {
  padding: 24px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px dashed rgba(15, 23, 42, 0.12);
  color: var(--bm-muted);
  text-align: center;
}

.ayah-list {
  display: grid;
  gap: 14px;
}

.ayah-list-item {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 18px;
  padding: 18px 20px;
  background: #ffffff;
  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.1);
  position: relative;
  overflow: hidden;
  border-left: 4px solid rgba(15, 110, 99, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.ayah-list-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(15, 110, 99, 0.08), rgba(200, 155, 58, 0.08), transparent 60%);
  opacity: 0.6;
  pointer-events: none;
}

.ayah-list-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 22px 36px rgba(15, 23, 42, 0.14);
  border-color: rgba(15, 110, 99, 0.35);
}

.ayah-list-meta {
  font-weight: 700;
  color: #1f2937;
  letter-spacing: -0.01em;
}

.bookmark-quick {
  border-radius: 999px;
  border-color: rgba(15, 110, 99, 0.25);
  color: var(--bm-accent-strong);
  background: rgba(15, 110, 99, 0.08);
}

.bookmark-quick:hover {
  background: rgba(15, 110, 99, 0.18);
  border-color: rgba(15, 110, 99, 0.45);
  color: var(--bm-accent-strong);
}

.ayah-list-ar {
  margin-top: 12px;
  font-size: 1.7rem;
  font-family: "Amiri", "Noto Naskh Arabic", serif;
  direction: rtl;
  text-align: right;
  color: #0a2e2a;
  line-height: 2.1;
  position: relative;
  z-index: 1;
}

.ayah-list-en {
  margin-top: 8px;
  color: #475569;
  line-height: 1.75;
  position: relative;
  z-index: 1;
}

.empty-state {
  border-radius: 18px;
  border: 1px dashed rgba(15, 23, 42, 0.14);
  padding: 26px;
  text-align: center;
  color: var(--bm-muted);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 16px 26px rgba(15, 23, 42, 0.08);
}

.empty-title {
  font-weight: 700;
  color: var(--bm-ink);
  margin-bottom: 6px;
}

.empty-subtitle {
  font-size: 0.92rem;
}

@media (max-width: 991.98px) {
  .panel-header,
  .panel-body {
    padding-left: 18px;
    padding-right: 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bookmark-panel,
  .ayah-list-item {
    animation: none;
    transition: none;
  }
}

@keyframes panel-rise {
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
