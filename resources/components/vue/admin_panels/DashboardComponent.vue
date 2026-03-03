<template>
  <div class="dash-wrap admin-page">
    <!-- Top metric cards -->
    <div class="row g-3 mb-3 top-cards">
      <div class="col-md-4" v-for="c in cards" :key="c.key">
        <a :href="c.href" class="card-link" :aria-label="c.label">
          <div class="metric-card fade-pop" :class="c.color">
            <div class="metric-icon"><i :class="c.icon"></i></div>
            <div class="metric-body">
              <div class="metric-label">{{ c.label }}</div>
              <div class="metric-value">{{ counts[c.key] ?? 0 }}</div>
            </div>
          </div>
        </a>
      </div>
    </div>

    <!-- Charts -->
    <div class="row g-3 charts-row">
      <div class="col-lg-6">
        <div class="panel-card">
          <div class="panel-head">Users (lifetime)</div>
          <canvas ref="usersChart" height="110"></canvas>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="panel-card">
          <div class="panel-head">Feedback (lifetime)</div>
          <canvas ref="feedbackChart" height="110"></canvas>
        </div>
      </div>
    </div>

    <!-- Pie Chart Row -->
    <div class="row g-3 mt-1 align-items-stretch">
      <div class="col-lg-6 d-flex">
        <div class="panel-card flex-grow-1">
          <div class="panel-head">Donations by Currency</div>
          <canvas ref="donationPie" height="220"></canvas>
        </div>
      </div>
      <div class="col-lg-6 d-flex">
        <div class="flex-grow-1">
          <div class="panel-card mb-3">
            <div class="panel-head d-flex justify-content-between align-items-center">
              <span>Recent Feedback</span>
              <a href="#" @click.prevent="openModal('feedback')" class="viewall">View all</a>
            </div>
            <ul class="list clean">
              <li v-for="f in recent.feedback" :key="f.id">
                <span class="pill">{{ (f.subject || 'Feedback') }}</span>
                <span class="muted">{{ f.firstname }} {{ f.lastname }}</span>
              </li>
            </ul>
          </div>
          <div class="panel-card">
            <div class="panel-head d-flex justify-content-between align-items-center">
              <span>Recent Subscribers</span>
              <a href="#" @click.prevent="openModal('mailing')" class="viewall">View all</a>
            </div>
            <ul class="list clean">
              <li v-for="m in recent.mailing" :key="m.id">
                <span>{{ m.name }}</span>
                <span class="muted">{{ m.email }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- View All Modal -->
    <div class="modal fade" id="viewAllModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ul class="list clean">
              <li v-for="item in modalItems" :key="item.id">
                <template v-if="modalType === 'feedback'">
                  <span class="pill">{{ item.subject || 'Feedback' }}</span>
                  <span class="muted">{{ item.firstname }} {{ item.lastname }} {{ item.email }}</span>
                </template>
                <template v-else>
                  <span>{{ item.name }}</span>
                  <span class="muted">{{ item.email }}</span>
                </template>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      counts: {},
      series: { users: [], donations: [], feedback: [] },
      recent: { donations: [], feedback: [], mailing: [] },
      modalType: 'feedback',
      modalTitle: '',
      modalItems: [],
      cards: [
        { key: 'users', label: 'Users', icon: 'bi bi-people-fill', href: '/users', color: 'c1' },
        { key: 'bookmarks', label: 'Bookmarks', icon: 'bi bi-bookmark-star', href: '/bookmarks', color: 'c2' },
        { key: 'notes', label: 'Notes', icon: 'bi bi-journal-text', href: '/notes', color: 'c3' },
        { key: 'donations', label: 'Donations', icon: 'bi bi-currency-exchange', href: '/payments', color: 'c4' },
        { key: 'feedback', label: 'Feedback', icon: 'bi bi-chat-left-text', href: '/feedback', color: 'c5' },
        { key: 'mailing', label: 'Mailing List', icon: 'bi bi-envelope-at', href: '/mailing_list', color: 'c6' },
      ]
    }
  },
  mounted() {
    this.fetchMetrics();
  },
  methods: {
    async fetchMetrics() {
      try {
        const res = await fetch('api/admin-metrics');
        const data = await res.json();
        this.counts = data.counts || {};
        this.series = data.series || {};
        this.recent = data.recent || {};
        this.renderCharts(data);
      } catch (e) { console.error('metrics failed', e); }
    },
    renderCharts(data) {
      const dLabels = (this.series.users || []).map(x => x.m);
      const uValues = (this.series.users || []).map(x => x.c);
      const fValues = (this.series.feedback || []).map(x => x.c);

      const accent = '#0f6e63';
      const common = {
        borderWidth: 2,
        borderColor: accent,
        backgroundColor: 'rgba(15, 110, 99, 0.12)',
        tension: .3,
        pointRadius: 0,
      };

      const ctx1 = this.$refs.usersChart.getContext('2d');
      new Chart(ctx1, { type: 'line', data: { labels: dLabels, datasets: [{ label: 'Users', data: uValues, ...common }] }, options: { scales: { y: { beginAtZero: true } } } });

      const ctx2 = this.$refs.feedbackChart.getContext('2d');
      new Chart(ctx2, { type: 'bar', data: { labels: dLabels, datasets: [{ label: 'Feedback', data: fValues, backgroundColor: 'rgba(15, 110, 99, 0.2)', borderColor: accent, borderWidth: 1 }] }, options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } } });

      // Pie: donations by currency
      const pie = this.$refs.donationPie.getContext('2d');
      const br = data.breakdown?.donationsByCurrency || [];
      const labels = br.map(x => x.currency || 'N/A');
      const values = br.map(x => x.c);
      const colors = ['#0f6e63', '#5bc8b9', '#f2b84b', '#2f80ed', '#ef6f6c', '#18a999'];
      new Chart(pie, { type: 'pie', data: { labels, datasets: [{ data: values, backgroundColor: colors }] }, options: { plugins: { legend: { position: 'right' } } } });
    },
    async openModal(type) {
      this.modalType = type;
      this.modalTitle = type === 'feedback' ? 'All Feedback' : 'All Subscribers';
      const url = type === 'feedback' ? 'api/fetch-feedbacks' : 'api/fetch-mail';
      const res = await fetch(url); this.modalItems = await res.json();
      const el = document.getElementById('viewAllModal');
      (bootstrap.Modal.getOrCreateInstance(el)).show();
    }
  }
}
</script>

<style scoped>
.dash-wrap {
  padding: 8px;
}

.metric-card {
  display: flex;
  align-items: center;
  gap: .75rem;
  background: #fff;
  border: 1px solid var(--admin-border);
  border-radius: 18px;
  padding: 16px 18px;
  box-shadow: 0 16px 28px rgba(15, 23, 42, .08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 36px rgba(15, 23, 42, 0.12);
}

.metric-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #fff;
  background: var(--admin-accent);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4);
}

.metric-label {
  font-size: .75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--admin-muted);
}

.metric-value {
  font-weight: 800;
  font-size: 1.4rem;
  color: var(--admin-ink);
}

.c1 {
  background: linear-gradient(0deg, rgba(15, 110, 99, 0.12), #fff);
}

.c2 {
  background: linear-gradient(0deg, rgba(79, 70, 229, 0.08), #fff);
}

.c3 {
  background: linear-gradient(0deg, rgba(234, 179, 8, 0.12), #fff);
}

.c4 {
  background: linear-gradient(0deg, rgba(37, 99, 235, 0.1), #fff);
}

.c5 {
  background: linear-gradient(0deg, rgba(244, 63, 94, 0.12), #fff);
}

.c6 {
  background: linear-gradient(0deg, rgba(14, 116, 144, 0.12), #fff);
}

.card-link {
  text-decoration: none
}

.panel-card {
  background: #fff;
  border: 1px solid var(--admin-border);
  border-radius: 18px;
  box-shadow: 0 16px 28px rgba(15, 23, 42, .08);
  padding: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.panel-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 36px rgba(15, 23, 42, 0.12);
}

.panel-head {
  font-weight: 700;
  color: var(--admin-ink);
  margin-bottom: 8px
}

.list.clean {
  list-style: none;
  padding: 0;
  margin: 0
}

.list.clean li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px dashed rgba(15, 23, 42, 0.08);
}

.list.clean li:last-child {
  border-bottom: 0
}

.pill {
  background: rgba(15, 110, 99, 0.12);
  color: var(--admin-accent-strong);
  border: 1px solid rgba(15, 110, 99, 0.3);
  border-radius: 999px;
  padding: 2px 8px;
  font-size: .75rem;
  margin-right: 8px
}

.muted {
  color: var(--admin-muted);
  font-size: .85rem
}

.viewall {
  font-size: .85rem;
  color: var(--admin-accent-strong);
  text-decoration: none;
}

.viewall:hover {
  text-decoration: underline;
}

@media (max-width: 991.98px) {
  .metric-card {
    padding: 14px 15px;
    border-radius: 16px;
  }

  .panel-card {
    padding: 14px;
    border-radius: 16px;
  }

  .panel-head {
    font-size: 0.95rem;
  }
}

@media (max-width: 767.98px) {
  .dash-wrap {
    padding: 4px 0 12px;
  }

  .metric-value {
    font-size: 1.22rem;
  }

  .metric-label {
    font-size: 0.69rem;
  }

  .panel-head {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    align-items: center;
  }

  .list.clean li {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.35rem;
  }

  .pill {
    margin-right: 0;
  }
}

.fade-pop {
  animation: fadePop 240ms cubic-bezier(.2, .7, .2, 1) both
}

@keyframes fadePop {
  from {
    opacity: 0;
    transform: translateY(6px) scale(.98)
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1)
  }
}
</style>
