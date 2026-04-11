<template>
<div class="admin-page feedback-admin-page">

  <!-- view new Modal -->
  <div class="modal fade" id="editNewFeedback" tabindex="-1" aria-labelledby="editNewFeedbackLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down">
      <div class="modal-content feedback-detail-modal">
        <div class="modal-header">
          <div>
            <p class="feedback-modal-eyebrow mb-1">{{ subjectLabel(form.subject) || 'Feedback message' }}</p>
            <h5 class="modal-title" id="editNewFeedbackLabel">
              View message
            </h5>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="feedback-detail-grid">
            <div class="feedback-detail-item">
              <span>First name</span>
              <strong>{{ displayValue(form.firstname, 'Anonymous') }}</strong>
            </div>

            <div class="feedback-detail-item">
              <span>Last name</span>
              <strong>{{ displayValue(form.lastname) }}</strong>
            </div>

            <div class="feedback-detail-item">
              <span>Email</span>
              <strong>{{ displayValue(form.email) }}</strong>
            </div>

            <div class="feedback-detail-item">
              <span>Subject</span>
              <strong>{{ subjectLabel(form.subject) }}</strong>
            </div>
          </div>

          <div class="feedback-message-block">
            <span>Message</span>
            <pre>{{ displayValue(form.message, 'No message provided.') }}</pre>
          </div>

          <div class="modal-footer px-0 pb-0">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="loadError" class="alert alert-danger mb-3" role="alert" aria-live="polite">
    {{ loadError }}
  </div>

  <DataTable
    class="pt-4 modern-datatable"
    :value="feedbacks"
    :loading="loading"
    ref="dt"
    v-model:filters="filters"
    :globalFilterFields="globalFilterFields"
    showGridlines
    stripedRows
    rowHover
    responsiveLayout="scroll"
    paginator
    :rows="10"
    :rowsPerPageOptions="[10, 20, 50, 100]"
    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} messages"
    removableSort
    width="100%"
    tableStyle="min-width: 64rem"
  >
    <template #header>
      <div class="table-toolbar">
        <div class="title"><i class="bi bi-chat-dots me-2"></i>Feedback</div>
        <span class="spacer"></span>
        <div class="search-wrapper">
          <i class="bi bi-search"></i>
          <input
            class="form-control form-control-sm border-0"
            type="text"
            v-model="searchValue"
            placeholder="Search feedback..."
            @input="onGlobalFilter"
          />
        </div>
      </div>
    </template>

    <Column field="firstname" header="First name" sortable class="text-left">
      <template #body="slotProps">
        {{ displayValue(slotProps.data.firstname, 'Anonymous') }}
      </template>
    </Column>

    <Column field="lastname" header="Last name" sortable class="text-left">
      <template #body="slotProps">
        {{ displayValue(slotProps.data.lastname) }}
      </template>
    </Column>

    <Column field="email" header="Email" sortable class="text-left">
      <template #body="slotProps">
        {{ displayValue(slotProps.data.email) }}
      </template>
    </Column>

    <Column field="subject" header="Subject" sortable class="text-left">
      <template #body="slotProps">
        <span class="feedback-subject-pill">{{ subjectLabel(slotProps.data.subject) }}</span>
      </template>
    </Column>

    <Column field="message" header="Message" sortable class="text-left feedback-message-column">
      <template #body="slotProps">
        <span class="feedback-message-preview">{{ messagePreview(slotProps.data.message) }}</span>
      </template>
    </Column>

    <Column :exportable="true" style="min-width: 8rem">
      <template #body="slotProps">
        <div class="row-actions">
          <button
            data-bs-toggle="modal"
            data-bs-target="#editNewFeedback"
            type="button"
            class="btn btn-sm btn-primary"
            @click="editModal(slotProps.data)"
          >
            <i class="pi pi-eye me-1"></i>
            View
          </button>
        </div>
      </template>
    </Column>

    <template #empty>
      <div class="empty">No feedback messages found.</div>
    </template>
    <template class="text-center" #footer> In total there are {{ feedbacks ? feedbacks.length : 0 }} messages. </template>

  </DataTable>

</div>
</template>

<script>
import axios from "axios";
import { FilterMatchMode } from 'primevue/api'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
  components: {
    DataTable,
    Column,
  },
  mounted() {
    this.loadFeedbacks();
  },
  data() {
    return {
      loading: false,
      loadError: '',
      searchValue: '',
      filters: { global: { value: null, matchMode: FilterMatchMode.CONTAINS } },
      globalFilterFields: ["firstname", "lastname", "email", "subject", "message"],
      feedbacks: [],

      form: new Form({
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
      }),
      subjectOptions: [
        { value: "enquiry", label: "General enquiry" },
        { value: "bug report", label: "Bug report" },
        { value: "content error", label: "Content error" },
        { value: "feature request", label: "Feature request" },
        { value: "comment", label: "Comment" },
        { value: "question", label: "Question" },
      ],
    }
  },
  methods: {
    displayValue(value, fallback = 'Not provided') {
      if (value === null || value === undefined) {
        return fallback;
      }

      const text = String(value).trim();
      return text || fallback;
    },
    subjectLabel(value) {
      const option = this.subjectOptions.find((item) => item.value === value);
      return option ? option.label : this.displayValue(value);
    },
    messagePreview(value) {
      const text = this.displayValue(value, 'No message provided.');
      const normalised = text.replace(/\s+/g, ' ').trim();
      return normalised.length > 160 ? `${normalised.slice(0, 157)}...` : normalised;
    },
    onGlobalFilter(e){ this.filters.global.value = e.target.value; },

    loadFeedbacks() {
      this.loading = true;
      this.loadError = '';
      axios.get("/api/fetch-feedbacks").then((data) => {
        this.feedbacks = Array.isArray(data.data) ? data.data : [];
      }).catch(() => {
        this.feedbacks = [];
        this.loadError = 'Unable to load feedback messages right now.';
      }).finally(()=>{ this.loading = false; });
    },
    //edit feedback modal
    editModal(feedback) {
      this.editmode = true;
      this.form.fill(feedback);
    },
    viewModal(feedback) {
      $("#view").modal("show");
      this.form.fill(feedback);
    },
  },
}
</script>

<style scoped>
.feedback-detail-modal .modal-header {
  align-items: flex-start;
  gap: 1rem;
}

.feedback-modal-eyebrow {
  color: var(--bs-primary);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.feedback-detail-grid {
  display: grid;
  gap: 0.85rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: 1rem;
}

.feedback-detail-item,
.feedback-message-block {
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 8px;
  display: grid;
  gap: 0.25rem;
  padding: 0.8rem 0.9rem;
}

.feedback-detail-item span,
.feedback-message-block span {
  color: currentColor;
  font-size: 0.74rem;
  font-weight: 700;
  opacity: 0.68;
  text-transform: uppercase;
}

.feedback-detail-item strong {
  overflow-wrap: anywhere;
}

.feedback-message-block pre {
  color: inherit;
  font-family: inherit;
  font-size: 0.95rem;
  line-height: 1.55;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.feedback-subject-pill {
  border: 1px solid rgba(15, 23, 42, 0.14);
  border-radius: 999px;
  display: inline-flex;
  font-size: 0.85rem;
  font-weight: 700;
  line-height: 1;
  padding: 0.35rem 0.55rem;
}

.feedback-message-preview {
  display: inline-block;
  max-width: 34rem;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  white-space: nowrap;
}

@media (max-width: 767.98px) {
  .feedback-detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
