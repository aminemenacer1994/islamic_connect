<template>
<div class="admin-page">

  <!-- view new Modal -->
  <div class="modal fade" id="editNewFeedback" tabindex="-1" aria-labelledby="editNew" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-dark" id="addNew">
            View message
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Firstname:</label>
              <p class="mt-2 text-dark">
                {{ form.firstname }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Lastname:</label>
              <p class="mt-2 text-dark">
                {{ form.lastname }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">email:</label>
              <p class="mt-2 text-dark">
                {{ form.email }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">subject:</label>
              <p class="mt-2 text-dark">
                {{ subjectLabel(form.subject) }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Message:</label>
              <p class="mt-2 text-dark">
                {{ form.message }}
              </p>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <DataTable
    class="pt-4 modern-datatable"
    :value="feedbacks"
    :loading="loading"
    ref="dt"
    v-model:filters="filters"
    :globalFilterFields="(columns || []).map(c => c.field)"
    showGridlines
    stripedRows
    rowHover
    responsiveLayout="scroll"
    paginator
    :rows="10"
    :rowsPerPageOptions="[10, 20, 50, 100]"
    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    currentPageReportTemplate="Showing {first}–{last} of {totalRecords} messages"
    removableSort
    width="100%"
    tableStyle="min-width: 50rem"
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

    <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" sortable class="text-left" style="align-items:center">
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

          <button
            data-bs-toggle="modal"
            data-bs-target="#editNew"
            type="button"
            class="btn btn-sm btn-outline-secondary"
            @click="editModal(slotProps.data)"
          >
            <i class="pi pi-send me-1"></i>
            Reply
          </button>
        </div>
      </template>
    </Column>

    <template #empty>
      <div class="empty">No feedback messages found.</div>
    </template>
    <template class="text-center" #footer> In total there are {{ feedbacks ? feedbacks.length : 0 }} Messages. </template>

  </DataTable>

</div>
</template>

<script>
import axios from "axios";
import { FilterMatchMode } from 'primevue/api'

export default {
  mounted() {
    this.loadFeedbacks();
  },
  data() {
    return {
      loading: false,
      searchValue: '',
      filters: { global: { value: null, matchMode: FilterMatchMode.CONTAINS } },
      columns: [
        {
          field: "firstname",
          header: "Firstname",
          sortable: true,
        },
        {
          field: "lastname",
          header: "Lastname",
          sortable: true,
        },
        {
          field: "email",
          header: "Email",
          sortable: true,
        },
        {
          field: "subject",
          header: "Subject",
          sortable: true,
        },

      ],
      feedbacks: null,

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
        { value: "feature request", label: "Feature request" },
        { value: "comment", label: "Comment" },
        { value: "question", label: "Question" },
      ],
    }
  },
  methods: {
    subjectLabel(value) {
      const option = this.subjectOptions.find((item) => item.value === value);
      return option ? option.label : value;
    },
    onGlobalFilter(e){ this.filters.global.value = e.target.value; },

    loadFeedbacks() {
      this.loading = true;
      axios.get("api/fetch-feedbacks").then((data) => {
        this.feedbacks = data.data;
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
