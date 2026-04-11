<template>
  <Teleport to="body">
    <div class="modal fade section-report-root" :id="modalId" tabindex="-1" :aria-labelledby="`${modalId}-label`" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered section-report-dialog">
        <div class="modal-content section-report-modal">
          <div class="modal-header">
            <div>
              <p class="section-report-kicker mb-1">Report a mistake</p>
              <h5 class="modal-title" :id="`${modalId}-label`">Report this section</h5>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <form @submit.prevent="submitReport">
            <div class="modal-body">
              <div v-if="sectionLabel" class="section-report-context mb-3">
                <span>Section</span>
                <strong>{{ sectionLabel }}</strong>
              </div>

              <div v-if="statusMessage" class="alert mb-3" :class="statusClass" role="status">
                {{ statusMessage }}
              </div>

              <div class="section-report-contact-grid mb-3">
                <div>
                  <label class="form-label" :for="`${modalId}-firstname`">First name <span>(optional)</span></label>
                  <input
                    :id="`${modalId}-firstname`"
                    v-model.trim="form.firstname"
                    type="text"
                    class="form-control"
                    maxlength="60"
                    placeholder="Your first name"
                    autocomplete="given-name"
                    :disabled="submitting">
                </div>

                <div>
                  <label class="form-label" :for="`${modalId}-email`">Email address</label>
                  <input
                    :id="`${modalId}-email`"
                    v-model.trim="form.email"
                    type="email"
                    class="form-control"
                    maxlength="255"
                    placeholder="you@example.com"
                    autocomplete="email"
                    :disabled="submitting"
                    required>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label" :for="`${modalId}-type`">Report a</label>
                <select
                  :id="`${modalId}-type`"
                  v-model="form.reportType"
                  class="form-select"
                  :disabled="submitting"
                  required>
                  <option v-for="option in reportOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label class="form-label" :for="`${modalId}-title`">Title</label>
                <input
                  :id="`${modalId}-title`"
                  v-model.trim="form.title"
                  type="text"
                  class="form-control"
                  maxlength="120"
                  placeholder="Short summary"
                  :disabled="submitting"
                  required>
              </div>

              <div>
                <label class="form-label" :for="`${modalId}-description`">Description</label>
                <textarea
                  :id="`${modalId}-description`"
                  v-model.trim="form.description"
                  class="form-control"
                  rows="5"
                  maxlength="1200"
                  placeholder="What should we review?"
                  :disabled="submitting"
                  required></textarea>
                <small class="section-report-counter d-block mt-2">{{ form.description.length }}/1200 characters</small>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" :disabled="submitting">
                Close
              </button>
              <button type="submit" class="btn btn-warning section-report-submit" :disabled="submitting || !canSubmit">
                <span v-if="submitting" class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                {{ submitting ? 'Sending...' : 'Submit report' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import axios from 'axios';

const REPORT_OPTIONS = [
  { value: 'bug report', label: 'Bug' },
  { value: 'content error', label: 'Content error' },
  { value: 'feature request', label: 'Feature request' },
];

const emptyForm = () => ({
  firstname: '',
  email: '',
  reportType: 'content error',
  title: '',
  description: '',
});

export default {
  name: 'SectionReportModal',
  props: {
    pageName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      modalId: `section-report-modal-${Math.random().toString(36).slice(2, 10)}`,
      reportOptions: REPORT_OPTIONS,
      context: {},
      form: emptyForm(),
      submitting: false,
      statusMessage: '',
      statusType: '',
    };
  },
  computed: {
    sectionLabel() {
      return this.context.sectionTitle || this.context.sectionId || '';
    },
    canSubmit() {
      return Boolean(
        this.form.reportType &&
        this.form.email.trim() &&
        this.form.title.trim() &&
        this.form.description.trim()
      );
    },
    statusClass() {
      return this.statusType === 'success' ? 'alert-success' : 'alert-danger';
    },
  },
  mounted() {
    this.$nextTick(() => {
      const modalElement = this.getModalElement();
      if (modalElement) {
        modalElement.addEventListener('hidden.bs.modal', this.handleHidden);
      }
    });
  },
  beforeUnmount() {
    const modalElement = this.getModalElement();
    if (modalElement) {
      modalElement.removeEventListener('hidden.bs.modal', this.handleHidden);
    }
  },
  methods: {
    open(context = {}) {
      this.context = {
        ...context,
        pageName: context.pageName || this.pageName,
      };
      this.statusMessage = '';
      this.statusType = '';

      const modalElement = this.getModalElement();
      const ModalCtor = typeof window !== 'undefined' ? window.bootstrap?.Modal : null;
      if (modalElement && ModalCtor) {
        ModalCtor.getOrCreateInstance(modalElement, { backdrop: true }).show();
      }
    },
    getModalElement() {
      if (typeof document === 'undefined') {
        return null;
      }
      return document.getElementById(this.modalId);
    },
    close() {
      const modalElement = this.getModalElement();
      const ModalCtor = typeof window !== 'undefined' ? window.bootstrap?.Modal : null;
      if (modalElement && ModalCtor) {
        ModalCtor.getInstance(modalElement)?.hide();
      }
    },
    handleHidden() {
      this.form = emptyForm();
      this.statusMessage = '';
      this.statusType = '';
      this.submitting = false;
    },
    buildMessage() {
      const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
      const lines = [
        `Report title: ${this.form.title.trim()}`,
        `Page: ${this.context.pageName || this.pageName || 'Unknown page'}`,
        `Section: ${this.context.sectionTitle || this.context.sectionId || 'Unknown section'}`,
        this.context.sectionId ? `Section ID: ${this.context.sectionId}` : '',
        pageUrl ? `URL: ${pageUrl}` : '',
        '',
        'Description:',
        this.form.description.trim(),
      ];

      return lines.filter((line) => line !== '').join('\n');
    },
    async submitReport() {
      if (!this.canSubmit || this.submitting) {
        return;
      }

      this.submitting = true;
      this.statusMessage = '';
      this.statusType = '';

      try {
        await axios.post('/api/send-message', {
          firstname: this.form.firstname.trim(),
          lastname: '',
          email: this.form.email.trim(),
          mobile: '',
          subject: this.form.reportType,
          message: this.buildMessage(),
        });
        this.statusType = 'success';
        this.statusMessage = 'Report submitted. Thank you.';
        window.setTimeout(() => {
          this.close();
        }, 900);
      } catch (error) {
        this.statusType = 'error';
        this.statusMessage = error?.response?.data?.message || 'Unable to submit this report right now.';
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>

<style scoped>
.section-report-modal {
  border: 0;
  border-radius: 8px;
}

.section-report-dialog {
  max-width: min(560px, calc(100vw - 1.5rem));
}

.section-report-modal .modal-header {
  align-items: flex-start;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
}

.section-report-modal .modal-body {
  padding: 1.2rem 1.25rem;
}

.section-report-modal .modal-footer {
  gap: 0.75rem;
  padding: 1rem 1.25rem;
}

.section-report-modal .btn-close {
  box-shadow: none;
  margin-top: 0.15rem;
}

.section-report-modal .form-label {
  font-weight: 700;
}

.section-report-modal .form-label span {
  font-weight: 500;
  opacity: 0.72;
}

.section-report-modal .form-control,
.section-report-modal .form-select {
  border-radius: 8px;
}

.section-report-contact-grid {
  display: grid;
  gap: 0.85rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.section-report-kicker {
  color: #17665f;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-report-context {
  border: 1px solid rgba(23, 102, 95, 0.16);
  border-radius: 8px;
  background: rgba(23, 102, 95, 0.06);
  color: inherit;
  display: grid;
  gap: 0.15rem;
  padding: 0.75rem 0.85rem;
}

.section-report-context span {
  color: currentColor;
  font-size: 0.75rem;
  opacity: 0.72;
  text-transform: uppercase;
}

.section-report-counter {
  color: currentColor;
  opacity: 0.72;
}

.section-report-submit {
  color: #1f2937;
  font-weight: 700;
}

@media (max-width: 575.98px) {
  .section-report-contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
