<template>
  <section class="shared-folder">
    <div class="container py-4">
      <div class="text-center mb-4">
        <div class="folder-badge" :class="badgeClass">
          <i v-if="folder.icon" :class="folder.icon"></i>
          <span>{{ folder.name }}</span>
        </div>
        <p class="text-muted mt-2">Shared Qur'an reflections</p>
      </div>

      <div v-if="loading" class="text-center text-muted">Loading shared folder...</div>
      <div v-else-if="error" class="alert alert-danger text-center">{{ error }}</div>

      <div v-else>
        <div v-for="item in normalizedItems" :key="item.key" class="card shared-ayah mb-3">
          <div class="card-body">
            <div class="d-flex justify-content-between text-muted mb-2">
              <span>{{ item.surah_label }}</span>
              <span>Ayah {{ item.ayah_number }}</span>
            </div>
            <div class="ayah-arabic" v-html="item.ayah_verse_ar"></div>
            <div v-if="item.ayah_verse_en" class="ayah-translation">{{ item.ayah_verse_en }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SharedFolderView',
  props: {
    token: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      folder: {
        name: '',
        icon: '',
        color: '',
      },
      items: [],
      source: 'manual',
      loading: true,
      error: '',
    };
  },
  computed: {
    badgeClass() {
      return this.folder.color ? `text-bg-${this.folder.color}` : 'text-bg-light';
    },
    normalizedItems() {
      return this.items.map((item) => {
        if (this.source === 'smart') {
          return {
            key: `smart-${item.id}`,
            surah_label: item.surah?.name_en || `Surah ${item.surah_id}`,
            ayah_number: item.ayah_id,
            ayah_verse_ar: item.ayah_text,
            ayah_verse_en: '',
          };
        }

        return {
          key: `bookmark-${item.id}`,
          surah_label: item.surah_name || item.ayah?.surah?.name_en || 'Surah',
          ayah_number: item.ayah_number || item.ayah_num,
          ayah_verse_ar: item.ayah_verse_ar || item.ayah?.ayah_text,
          ayah_verse_en: item.ayah_verse_en || '',
        };
      });
    },
  },
  mounted() {
    this.fetchSharedFolder();
  },
  methods: {
    async fetchSharedFolder() {
      this.loading = true;
      try {
        const response = await axios.get(`/api/shared/folders/${this.token}`);
        this.folder = response.data.folder || {};
        this.items = response.data.items || [];
        this.source = response.data.source || 'manual';
      } catch (error) {
        this.error = 'Unable to load this shared folder.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.shared-folder {
  background: linear-gradient(180deg, #f7f4ef 0%, #ffffff 55%, #f4f8f7 100%);
  min-height: 100vh;
}
.folder-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  font-weight: 600;
}
.shared-ayah {
  border: 0;
  box-shadow: 0 10px 30px rgba(19, 31, 26, 0.08);
}
.ayah-arabic {
  font-size: 1.8rem;
  text-align: right;
  direction: rtl;
  margin-bottom: 0.75rem;
}
.ayah-translation {
  color: #374151;
  line-height: 1.7;
}
</style>
