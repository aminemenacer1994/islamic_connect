<template>
  <div class="container py-3 admin-page">
    <div class="d-flex align-items-center mb-3">
      <h3 class="me-3 mb-0">Analytics (Realtime)</h3>
      <span class="badge bg-secondary" v-if="status">{{ status }}</span>
    </div>

    <div class="row g-3">
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="me-3" style="font-size:28px;">👥</div>
              <div>
                <div class="text-muted">Active Users (Realtime)</div>
                <div class="h3 mb-0">{{ data?.activeUsers ?? ' ' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h5 class="mb-0">Top Pages (Live)</h5>
              <div class="d-flex align-items-center gap-2">
                <input v-model="propertyId" @keyup.enter="savePropertyId" placeholder="GA4 property id"
                  class="form-control form-control-sm me-2" style="width: 200px" />
                <button class="btn btn-sm btn-outline-secondary me-2" @click="savePropertyId">Save</button>
                <button class="btn btn-sm btn-outline-primary" @click="fetchData" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"
                    aria-hidden="true"></span>
                  Refresh
                </button>
              </div>
            </div>
            <div v-if="error" class="alert alert-warning">{{ error }}</div>
            <div v-if="credStatusMsg" :class="['alert', credStatusClass]">
              {{ credStatusMsg }}
              <template v-if="credStatus && credStatus.storage_fallback">
                <span class="ms-2 text-muted">path: {{ credStatus.storage_fallback.path }}</span>
                <span class="ms-2" :class="credStatus.storage_fallback.exists ? 'text-success' : 'text-danger'">exists:
                  {{ credStatus.storage_fallback.exists }}</span>
                <span class="ms-2"
                  :class="credStatus.storage_fallback.readable ? 'text-success' : 'text-danger'">readable: {{
                    credStatus.storage_fallback.readable }}</span>
                <span class="ms-2"
                  :class="credStatus.storage_fallback.writable_dir ? 'text-success' : 'text-danger'">writable_dir: {{
                    credStatus.storage_fallback.writable_dir }}</span>
              </template>
            </div>
            <div class="d-flex align-items-center gap-2 mb-2">
              <input ref="fileInput" type="file" accept="application/json,.json"
                class="form-control form-control-sm me-2" style="max-width:320px" />
              <button class="btn btn-sm btn-outline-success me-2" @click="uploadCreds">Upload key JSON</button>
              <button class="btn btn-sm btn-link" @click="checkStatus">Check status</button>
            </div>
            <div class="mb-2">
              <textarea v-model="jsonText" placeholder="Or paste service account JSON here"
                class="form-control form-control-sm" rows="3"></textarea>
              <div class="mt-2">
                <button class="btn btn-sm btn-outline-success" @click="saveJsonText">Save pasted JSON</button>
              </div>
            </div>
            <div v-if="!propertyId" class="alert alert-info py-2">
              Enter your numeric GA4 property id and click Save.
            </div>
            <div class="table-responsive">
              <table class="table table-sm align-middle">
                <thead>
                  <tr>
                    <th style="width:60%">Path</th>
                    <th class="text-end">Active Users</th>
                    <th class="text-end">Views</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(r, i) in (data?.topPages || [])" :key="i">
                    <td><code>{{ r.path || '/' }}</code></td>
                    <td class="text-end">{{ r.activeUsers }}</td>
                    <td class="text-end">{{ r.views }}</td>
                  </tr>
                  <tr v-if="!loading && (!data || (data.topPages || []).length === 0)">
                    <td colspan="3" class="text-muted">No realtime rows.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-muted small mt-3">
      Tip: set <code>GA4_PROPERTY_ID</code> and <code>GOOGLE_APPLICATION_CREDENTIALS</code> in .env, then
      <code>composer require google/apiclient:^2.15 google/analytics-data</code>.
    </div>
  </div>

</template>

<script>
export default {
  name: 'AnalyticsComponent',
  data() {
    return {
      data: null,
      status: 'idle',
      error: '',
      loading: false,
      timer: null,
      propertyId: localStorage.getItem('ga4_property_id') || '440006456',
      credStatus: null,
      credStatusMsg: '',
      credStatusClass: 'alert-warning',
      jsonText: ''
    }
  },
  mounted() {
    // Ensure default property id is persisted once
    if (!localStorage.getItem('ga4_property_id') && this.propertyId) {
      try { localStorage.setItem('ga4_property_id', this.propertyId); } catch (_) { }
    }
    this.fetchData();
    this.checkStatus();
    // Auto-refresh every 30 seconds
    this.timer = setInterval(this.fetchData, 30000);
  },
  beforeUnmount() {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.error = '';
      this.status = 'loading';
      try {
        const q = this.propertyId ? ('?property_id=' + encodeURIComponent(this.propertyId)) : '';
        const res = await fetch('/api/analytics/realtime' + q, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json?.message || json?.error || `HTTP ${res.status}`);
        }
        this.data = json;
        this.status = 'live';
      } catch (e) {
        this.error = e?.message || String(e);
        this.status = 'error';
      } finally {
        this.loading = false;
      }
    },
    savePropertyId() {
      localStorage.setItem('ga4_property_id', this.propertyId || '');
      this.fetchData();
    },
    async uploadCreds() {
      const f = this.$refs.fileInput?.files?.[0];
      if (!f) { this.error = 'Pick a service account JSON file first.'; return; }
      try {
        const fd = new FormData();
        fd.append('keyfile', f);
        // Add CSRF token for Laravel web middleware
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        fd.append('_token', token);
        const res = await fetch('/api/analytics/credentials', {
          method: 'POST',
          body: fd,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': token,
          }
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || json?.error || `HTTP ${res.status}`);
        this.error = '';
        this.credStatusMsg = 'Credentials uploaded.';
        this.checkStatus();
        this.fetchData();
      } catch (e) { this.error = e?.message || String(e); }
    },
    async saveJsonText() {
      if (!this.jsonText.trim()) { this.error = 'Paste the JSON first.'; return; }
      try {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        const res = await fetch('/api/analytics/credentials/raw', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': token,
          },
          body: JSON.stringify({ json: this.jsonText })
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || json?.error || `HTTP ${res.status}`);
        this.error = '';
        this.credStatusMsg = 'Credentials saved.';
        this.credStatusClass = 'alert-success';
        this.checkStatus();
        this.fetchData();
      } catch (e) { this.error = e?.message || String(e); }
    },
    async checkStatus() {
      try {
        const res = await fetch('/api/analytics/status', { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
        const json = await res.json();
        this.credStatus = json;
        if (json?.storage_fallback?.readable) { this.credStatusMsg = 'Credentials found in storage/app/ga_credentials.json'; this.credStatusClass = 'alert-success'; }
        else if (json?.env_path?.readable) { this.credStatusMsg = 'Credentials found via GOOGLE_APPLICATION_CREDENTIALS'; this.credStatusClass = 'alert-success'; }
        else if (json?.env_base64 === 'present') { this.credStatusMsg = 'Credentials present via GA_CREDENTIALS_JSON_BASE64'; this.credStatusClass = 'alert-success'; }
        else { this.credStatusMsg = 'No credentials detected'; this.credStatusClass = 'alert-warning'; }
      } catch (_) { }
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 16px;
  border: 1px solid var(--admin-border);
  box-shadow: 0 16px 28px rgba(38, 41, 46, 0.08);
}

code {
  color: var(--admin-accent-strong);
}

.alert {
  padding: 6px 10px;
  margin-bottom: 8px;
  border-radius: 12px;
}
</style>
