<template>
  <section v-if="isVisible" class="card shadow-sm border-0 mb-3 gamification-card" aria-label="Memorisation progress">
    <div class="card-body">
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
        <h3 class="h6 mb-0">Memorisation Progress</h3>
        <span v-if="summary" class="badge bg-success-subtle text-success-emphasis">Level {{ summary.level }}</span>
      </div>

      <div v-if="loading" class="text-muted small">Loading progress...</div>
      <div v-else-if="error" class="text-muted small">{{ error }}</div>
      <div v-else-if="summary">
        <div class="d-flex flex-wrap gap-3 small mb-2">
          <span><strong>{{ summary.points_total }}</strong> pts</span>
          <span><strong>{{ summary.current_streak }}</strong> day streak</span>
          <span><strong>{{ summary.best_streak }}</strong> best</span>
        </div>

        <div class="progress" role="progressbar" aria-label="Level progress"
          :aria-valuenow="summary.level_progress_percent" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-success" :style="{ width: `${summary.level_progress_percent}%` }">
            {{ summary.level_progress_percent }}%
          </div>
        </div>
        <div class="text-muted small mt-1">
          {{ summary.points_to_next_level }} points to level {{ summary.level + 1 }}
        </div>

        <div v-if="summary.badges && summary.badges.length" class="d-flex flex-wrap gap-2 mt-2">
          <span
            v-for="badge in summary.badges.slice(0, 3)"
            :key="badge.badge_key"
            class="badge rounded-pill text-bg-light border"
            :title="badge.title">
            {{ badge.title }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GamificationCard',
  data() {
    return {
      summary: null,
      loading: false,
      error: '',
      isVisible: true,
    };
  },
  methods: {
    async refreshSummary() {
      this.loading = true;
      this.error = '';

      try {
        const response = await axios.get('/api/gamification/summary');
        this.summary = response?.data?.summary || null;
      } catch (error) {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          this.isVisible = false;
          return;
        }
        this.error = 'Unable to load progress right now.';
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.refreshSummary();
  },
};
</script>

<style scoped>
.gamification-card .progress {
  height: 0.75rem;
}
</style>
