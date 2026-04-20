<template>
  <div class="admin-page">
    <div class="pt-4">
      <div class="search-toolbar-panel mb-3">
        <div class="toolbar-row">
          <div class="admin-search-wrapper">
            <div class="input-group admin-search">
              <span class="input-group-text"><i class="bi bi-search"></i></span>
              <input v-model="query" class="form-control" placeholder="Search reports..." />
            </div>
          </div>
          <div class="filters d-flex align-items-center gap-2">
            <select v-model="reasonFilter" class="form-select">
              <option value="all">All reasons</option>
              <option v-for="reason in reasonOptions" :key="`reason-${reason}`" :value="reason">
                {{ humanReason(reason) }}
              </option>
            </select>
            <select v-model="statusFilter" class="form-select">
              <option value="all">All statuses</option>
              <option value="open">Open</option>
              <option value="reviewed">Reviewed</option>
              <option value="resolved">Resolved</option>
            </select>
            <select v-model="sortBy" class="form-select">
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>
      </div>

      <h3 class="pb-3 text-center admin-count">
        <span class="count-label">AI Reports</span>
        <span class="count-pill">{{ filteredReports.length }}</span>
      </h3>

      <div class="notes-grid-wrapper">
        <div v-if="loading" class="py-5 text-center text-muted">
          <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
          Loading reports...
        </div>

        <div v-else-if="error && !filteredReports.length" class="alert alert-warning mb-0">
          {{ error }}
        </div>

        <div v-else-if="!filteredReports.length" class="py-5 text-center text-muted">
          No reports found.
        </div>

        <div v-else class="row">
          <div v-if="error" class="col-12 mb-3">
            <div class="alert alert-warning mb-0">{{ error }}</div>
          </div>

          <div v-for="report in filteredReports" :key="report.id" class="col-md-4 mb-4">
            <div class="note-card">
              <div class="note-chip">
                <i class="bi bi-flag-fill me-1"></i>
                Report #{{ report.id }}
              </div>

              <div class="note-title">{{ humanReason(report.reason) }}</div>

              <div class="note-reference">
                <span class="status-pill" :class="statusClass(report.status)">
                  {{ humanStatus(report.status) }}
                </span>
                <span>• {{ formatDate(report.created_at) }}</span>
              </div>

              <div class="note-body">
                <p class="mb-2">
                  <strong>Question:</strong> {{ report.question_text ? clip(report.question_text, 140) : "N/A" }}
                </p>
                <p class="mb-0">
                  <strong>Answer:</strong> {{ clip(report.reported_text, 180) }}
                </p>
              </div>

              <div class="note-meta">
                <span class="date">
                  <i class="bi bi-person me-1"></i>
                  {{ displayReporter(report) }}
                </span>
                <span class="date">
                  <i class="bi bi-link-45deg me-1"></i>
                  {{ referencesCount(report) }} refs
                </span>
              </div>

              <div class="note-actions">
                <button
                  type="button"
                  class="btn btn-icon btn-ghost"
                  data-bs-toggle="modal"
                  data-bs-target="#viewAiReport"
                  @click="viewReport(report)"
                  title="View report"
                  aria-label="View report"
                >
                  <i class="bi bi-eye"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <teleport to="body">
      <div
        id="viewAiReport"
        class="modal fade"
        tabindex="-1"
        aria-labelledby="viewAiReportLabel"
        aria-hidden="true"
        data-bs-backdrop="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down">
          <div class="modal-content">
            <div class="modal-header">
              <h5 id="viewAiReportLabel" class="modal-title text-dark"><b>View report #{{ selectedReport?.id || "" }}</b></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
              <div v-if="selectedReport" class="container">
                <div class="report-kv-grid mb-3">
                  <div class="report-kv">
                    <span class="report-kv-label">Reason</span>
                    <span class="report-kv-value">{{ humanReason(selectedReport.reason) }}</span>
                  </div>
                  <div class="report-kv">
                    <span class="report-kv-label">Status</span>
                    <span class="status-pill" :class="statusClass(selectedReport.status)">
                      {{ humanStatus(selectedReport.status) }}
                    </span>
                  </div>
                  <div class="report-kv">
                    <span class="report-kv-label">Created</span>
                    <span class="report-kv-value">{{ formatDateTime(selectedReport.created_at) }}</span>
                  </div>
                  <div class="report-kv">
                    <span class="report-kv-label">Reporter</span>
                    <span class="report-kv-value">{{ displayReporter(selectedReport) }}</span>
                  </div>
                  <div class="report-kv">
                    <span class="report-kv-label">Session ID</span>
                    <span class="report-kv-value text-break">{{ selectedReport.session_id || "N/A" }}</span>
                  </div>
                  <div class="report-kv">
                    <span class="report-kv-label">Entry Key</span>
                    <span class="report-kv-value text-break">{{ selectedReport.entry_key || "N/A" }}</span>
                  </div>
                </div>

                <div class="report-block mb-3">
                  <h6>Question</h6>
                  <p class="mb-0">{{ selectedReport.question_text || "N/A" }}</p>
                </div>

                <div class="report-block mb-3">
                  <h6>Reported answer</h6>
                  <p class="mb-0 report-prewrap">{{ selectedReport.reported_text || "N/A" }}</p>
                </div>

                <div class="report-block mb-3" v-if="selectedReport.details">
                  <h6>Reporter details</h6>
                  <p class="mb-0 report-prewrap">{{ selectedReport.details }}</p>
                </div>

                <div class="report-block mb-3" v-if="selectedReport.page_url">
                  <h6>Page URL</h6>
                  <a :href="selectedReport.page_url" target="_blank" rel="noopener noreferrer">{{ selectedReport.page_url }}</a>
                </div>

                <div class="report-block" v-if="normalizedReferences(selectedReport).length">
                  <h6>References</h6>
                  <ul class="mb-0 ps-4">
                    <li v-for="(reference, idx) in normalizedReferences(selectedReport)" :key="`ref-${idx}`">
                      <a v-if="reference.url" :href="reference.url" target="_blank" rel="noopener noreferrer">
                        {{ reference.label }}
                      </a>
                      <span v-else>{{ reference.label }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="modal-footer flex-wrap gap-2">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AiReportsComponent",
  data() {
    return {
      reports: [],
      loading: false,
      error: "",
      query: "",
      reasonFilter: "all",
      statusFilter: "all",
      sortBy: "newest",
      selectedReport: null,
    };
  },
  computed: {
    reasonOptions() {
      return Array.from(
        new Set(
          this.reports
            .map((report) => String(report.reason || "").trim())
            .filter(Boolean)
        )
      ).sort((a, b) => a.localeCompare(b));
    },
    filteredReports() {
      const query = String(this.query || "").trim().toLowerCase();
      let rows = [...this.reports];

      if (this.reasonFilter !== "all") {
        rows = rows.filter((report) => String(report.reason || "").trim() === this.reasonFilter);
      }

      if (this.statusFilter !== "all") {
        rows = rows.filter(
          (report) => String(report.status || "open").trim().toLowerCase() === this.statusFilter
        );
      }

      if (query) {
        rows = rows.filter((report) => {
          const reporter = this.displayReporter(report);
          const haystack = [
            report.id,
            report.reason,
            report.status,
            report.question_text,
            report.reported_text,
            report.details,
            report.entry_key,
            report.session_id,
            report.page_url,
            reporter,
          ]
            .map((value) => String(value || "").toLowerCase())
            .join(" ");

          return haystack.includes(query);
        });
      }

      rows.sort((a, b) => {
        const da = new Date(a.created_at || a.createdAt || 0).getTime();
        const db = new Date(b.created_at || b.createdAt || 0).getTime();
        return this.sortBy === "newest" ? db - da : da - db;
      });

      return rows;
    },
  },
  mounted() {
    this.fetchReports();
  },
  methods: {
    async fetchReports() {
      this.loading = true;
      this.error = "";
      try {
        const { data } = await axios.get("/api/fetch-ai-reports");
        this.reports = Array.isArray(data) ? data : [];
      } catch (error) {
        this.error = "Unable to load reports right now.";
        this.reports = [];
      } finally {
        this.loading = false;
      }
    },
    viewReport(report) {
      this.selectedReport = report || null;
    },
    clip(value, maxLength = 160) {
      const text = String(value || "").trim();
      if (!text) return "";
      if (text.length <= maxLength) return text;
      return `${text.slice(0, maxLength).trim()}...`;
    },
    humanReason(reason) {
      const key = String(reason || "").trim().toLowerCase();
      const map = {
        incorrect: "Incorrect information",
        misleading: "Incorrect or misleading",
        harmful: "Harmful guidance",
        offensive: "Offensive content",
        incomplete: "Missing context",
      };
      return map[key] || this.toTitleCase(reason || "Unspecified");
    },
    humanStatus(status) {
      const key = String(status || "open").trim().toLowerCase();
      if (key === "resolved") return "Resolved";
      if (key === "reviewed") return "Reviewed";
      return "Open";
    },
    statusClass(status) {
      const key = String(status || "open").trim().toLowerCase();
      if (key === "resolved") return "status-resolved";
      if (key === "reviewed") return "status-reviewed";
      return "status-open";
    },
    displayReporter(report) {
      if (report?.user) {
        const first = String(report.user.name || "").trim();
        const last = String(report.user.lastname || "").trim();
        const fullName = [first, last].filter(Boolean).join(" ").trim();
        if (fullName) return fullName;
        const email = String(report.user.email || "").trim();
        if (email) return email;
      }
      return String(report?.reporter_ip || "Guest").trim();
    },
    normalizedReferences(report) {
      const references = Array.isArray(report?.references) ? report.references : [];
      return references
        .map((entry) => {
          if (typeof entry === "string") {
            return { label: entry, url: "" };
          }
          if (entry && typeof entry === "object") {
            const label = String(entry.label || entry.title || entry.reference || entry.url || "").trim();
            const url = String(entry.url || "").trim();
            return { label: label || url, url };
          }
          return null;
        })
        .filter((entry) => entry && entry.label);
    },
    referencesCount(report) {
      return this.normalizedReferences(report).length;
    },
    toTitleCase(value) {
      return String(value || "")
        .replace(/[_-]+/g, " ")
        .trim()
        .replace(/\s+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    },
    formatDate(value) {
      if (!value) return "Unknown date";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return "Unknown date";
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    formatDateTime(value) {
      if (!value) return "Unknown date";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return "Unknown date";
      return date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
.admin-search {
  background: #ffffff;
  border: 1px solid rgba(15, 110, 99, 0.18);
  border-radius: 16px;
  padding: 0.35rem 0.75rem;
  box-shadow: 0 8px 24px rgba(38, 41, 46, 0.06);
}

.admin-search .input-group-text {
  background: transparent;
  border: none;
  color: #0f766e;
  font-size: 1.1rem;
}

.admin-search .form-control {
  border: none;
  background: transparent;
  box-shadow: none;
  font-size: 1rem;
  font-weight: 500;
  color: #0f172a;
  padding-left: 0;
  letter-spacing: 0.01em;
}

.admin-search .form-control::placeholder {
  color: #657483;
  opacity: 1;
  font-weight: 400;
}

.admin-search .form-control:focus {
  outline: none;
  box-shadow: none;
}

.search-toolbar-panel {
  border-radius: 30px;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(232, 245, 240, 0.95));
  border: 1px solid rgba(15, 110, 99, 0.18);
  box-shadow: 0 20px 50px rgba(4, 120, 87, 0.15);
  margin-bottom: 1.5rem;
}

.filters {
  margin-left: auto;
}

.admin-search-wrapper {
  flex: 1 1 320px;
  min-width: 450px;
}

.admin-count {
  font-size: 1.7rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  color: #0f2f23;
}

.count-pill {
  background: rgba(15, 118, 110, 0.12);
  padding: 0.2rem 0.85rem;
  border-radius: 999px;
  font-weight: 700;
  border: 1px solid rgba(15, 118, 110, 0.3);
}

.count-label {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: #526066;
}

.toolbar-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.toolbar-row .filters {
  margin-left: auto;
}

.note-card {
  position: relative;
  background: var(--admin-card);
  border: 1px solid var(--admin-border);
  border-radius: 18px;
  padding: 18px;
  box-shadow: 0 16px 32px rgba(38, 41, 46, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: default;
  overflow: hidden;
}

.note-card:before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 18px;
  padding: 1px;
  background: linear-gradient(120deg, rgba(15, 110, 99, 0.35), rgba(15, 110, 99, 0) 45%, rgba(12, 92, 83, 0.18));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.notes-grid-wrapper {
  background: #fff;
  border-radius: 32px;
  padding: 2rem;
  border: 1px solid rgba(15, 110, 99, 0.15);
  box-shadow: 0 30px 60px rgba(38, 41, 46, 0.08);
  margin-bottom: 2rem;
}

.note-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(38, 41, 46, 0.12);
}

.note-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: var(--admin-ink);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.note-reference {
  font-size: 0.85rem;
  color: var(--admin-muted);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.note-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(15, 110, 99, 0.12);
  color: var(--admin-accent-strong);
  border: 1px solid rgba(15, 110, 99, 0.3);
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 4px 10px;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.note-body {
  color: var(--admin-ink);
  min-height: 112px;
  margin-bottom: 8px;
  overflow: hidden;
}

.note-body p {
  color: var(--admin-ink);
}

.note-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  color: var(--admin-muted);
  font-size: 0.85rem;
}

.note-actions {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 12px;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-icon {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.btn-icon:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(38, 41, 46, 0.12);
}

.btn-ghost {
  background: #fff;
  border: 1px solid rgba(38, 41, 46, 0.12);
  color: var(--admin-ink);
}

.btn-ghost:hover {
  background: #f7fbfa;
  border-color: rgba(15, 110, 99, 0.3);
  color: var(--admin-accent-strong);
}

.status-pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 3px 8px;
  border: 1px solid transparent;
}

.status-open {
  background: rgba(245, 158, 11, 0.14);
  color: #8a4b00;
  border-color: rgba(217, 119, 6, 0.35);
}

.status-reviewed {
  background: rgba(59, 130, 246, 0.13);
  color: #1d4ed8;
  border-color: rgba(59, 130, 246, 0.3);
}

.status-resolved {
  background: rgba(15, 110, 99, 0.14);
  color: #0f766e;
  border-color: rgba(15, 110, 99, 0.35);
}

.report-kv-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.report-kv {
  background: #f8fbfa;
  border: 1px solid rgba(38, 41, 46, 0.08);
  border-radius: 12px;
  padding: 0.7rem 0.85rem;
}

.report-kv-label {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #667085;
  margin-bottom: 0.25rem;
}

.report-kv-value {
  color: #0f172a;
  font-weight: 600;
}

.report-block {
  border: 1px solid rgba(38, 41, 46, 0.08);
  border-radius: 12px;
  padding: 0.85rem 0.95rem;
  background: #fff;
}

.report-block h6 {
  margin: 0 0 0.55rem;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #667085;
  font-weight: 700;
}

.report-prewrap {
  white-space: pre-wrap;
  word-break: break-word;
}

@media (max-width: 992px) {
  .admin-search-wrapper {
    min-width: 100%;
  }
}

@media (max-width: 768px) {
  .notes-grid-wrapper {
    padding: 1rem;
    border-radius: 20px;
  }

  .report-kv-grid {
    grid-template-columns: 1fr;
  }
}
</style>
