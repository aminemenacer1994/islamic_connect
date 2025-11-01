<template>
<div>

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
              <label class="mt-2 mr-2 col-sm-3">Phone:</label>
              <p class="mt-2 text-dark">
                {{ form.mobile }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">subject:</label>
              <p class="mt-2 text-dark">
                {{ form.subject }}
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
        
        
      </div>
    </template>

    <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" sortable class="text-left" style="align-items:center">
    </Column>

    <Column :exportable="true" style="min-width: 8rem">
      <template #body="slotProps">
        <div class="wrapper text-center" style="display:flex">
          <Button data-bs-toggle="modal" data-bs-target="#editNewFeedback" type="button" class="btn user-btn text-white text-center mr-2 action btn1" style="background-color: #1e88e5; display:flex" @click="editModal(slotProps.data)">
            <i class="pi pi-eye mr-2"></i>
            View
          </Button>

          <button data-bs-toggle="modal" data-bs-target="#editNew" type="button" class="btn user-btn text-white text-center mr-2" style="background-color: #d91ab4" @click="editModal(slotProps.data)">
            <i class="pi pi-send"></i>
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

 

export default {
  mounted() {
    this.loadFeedbacks();
  },
  data() {
    return {
      loading: false,
      
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
    }
  },
  methods: {

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

<style>
.modal-modern .modal-content{border:1px solid #e5e7eb; border-radius:16px; box-shadow:0 16px 40px rgba(15,23,42,.18)}
.modal-modern .modal-header{background:#fff; color:#111; border-bottom:1px solid #e5e7eb; border-top-left-radius:16px; border-top-right-radius:16px}
.modal-modern .btn-close{filter:none}
.modal-modern .input-group-text{background:#f1f5f9; border-color:#e2e8f0}
.modal-modern .form-control:focus{box-shadow:0 0 0 .2rem rgba(11,128,111,.15); border-color: var(--bs-primary)}
.modern-datatable{width:100%}
.table-toolbar{display:flex; align-items:center; gap:.75rem}
.table-toolbar .spacer{flex:1}
.table-toolbar .search-wrapper{display:flex; align-items:center; gap:.5rem; padding:.25rem .5rem; border:1px solid #e2e8f0; border-radius:8px; background:#fff}
.empty{color:#6b7280; padding:1rem}
/* subtle teal accent */
.modern-datatable .p-datatable-tbody > tr{transition:background .18s ease}
.modern-datatable .p-datatable-tbody > tr:hover{background:#f1fcf9}
/* outlined brand button for consistency */
.btn-add,.btn-add.p-button{background:var(--ref-green)!important; border-color:var(--ref-green)!important; color:#fff!important; border:none; padding:.55rem .95rem; border-radius:10px; box-shadow:0 6px 14px rgba(0,191,166,.18)}
.btn-add.outline{background:#fff!important; color:var(--ref-green)!important; border:2px solid var(--ref-green)!important; box-shadow:none}
.btn-add.outline:hover{background:var(--ref-green)!important; color:#fff!important; box-shadow:0 6px 14px rgba(0,191,166,.18)}
</style>
