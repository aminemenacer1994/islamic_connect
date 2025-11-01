<template>
<div>

  <!-- view new Modal -->
  <div class="modal fade" id="editNewMail" tabindex="-1" aria-labelledby="editNew" aria-hidden="true">
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
              <label class="mt-2 mr-2 col-sm-3">ID:</label>
              <p class="mt-2 text-dark">
                {{ form.id }}
              </p>
            </div>
            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Firstname:</label>
              <p class="mt-2 text-dark">
                {{ form.name }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Lastname:</label>
              <p class="mt-2 text-dark">
                {{ form.lastname }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Phone:</label>
              <p class="mt-2 text-dark">
                {{ form.phone }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Date:</label>
              <p class="mt-2 text-dark">
                {{ form.created_at }}
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

  <DataTable class="pt-5" showGridlines stripedRows sortable :value="mailinglists" paginator :rows="7" :rowsPerPageOptions="[5, 10, 20, 50]" removableSort width="100%" tableStyle="max-width:100%">
    <template #header>
      <div class="table-toolbar">
        <div class="title"><i class="bi bi-envelope-at-fill me-2"></i>Mailing List</div>
        <span class="spacer"></span>
        
        
      </div>
    </template>

    <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" sortable class="text-left" style="align-items:center">
    </Column>

    <Column header="Actions" :exportable="false" style="min-width: 12rem">
      <template #body="{ data }">
        <div class="row-actions">
          <button data-bs-toggle="modal" data-bs-target="#editNewMail" type="button" class="btn btn-sm btn-primary" @click="editModal(data)">
            <i class="bi bi-eye me-1"></i> View
          </button>
        </div>
      </template>
    </Column>

    <template class="text-center" #footer> In total there are {{ mailinglists ? mailinglists.length : 0 }} subscribers. </template>

  </DataTable>
</div>
</template>

<script>
import axios from "axios";
 
export default {
  mounted() {
    this.loadMailingList();
  },
  data() {
    return {
      mailinglists: null,
      columns: [{
          field: "name",
          header: "Firstname",
          sortable: true,
        },
        {
          field: "lastname",
          header: "Lastname",
          sortable: true,
        },
        {
          field: "phone",
          header: "Phone",
          sortable: true,
        },
        {
          field: "email",
          header: "Email address",
          sortable: true,
        },

      ],
      sortDesc: false,
      form: new Form({
        id: "",
        name: "",
        lastname: "",
        phone: "",
        email: "",
        created_at: "",
      }),
    }
  },
  methods: {
    loadMailingList() {
      axios.get("api/fetch-mail").then((data) => {
        this.mailinglists = data.data;
      });
    },
    viewModal(mailinglists) {
      this.form.reset();
      $("#view").modal("show");
      this.form.fill(mailinglists);
    },
    //edit user modal
    editModal(mailinglists) {
      this.editmode = true;
      this.form.reset();
      this.form.fill(mailinglists);
    },

  },
}
</script>

<style>
.modal-modern .modal-content{border:1px solid #e5e7eb; border-radius:16px; box-shadow:0 16px 40px rgba(15,23,42,.18)}
.modal-modern .modal-header{background:#fff; color:#111; border-bottom:1px solid #e5e7eb; border-top-left-radius:16px; border-top-right-radius:16px}
.modal-modern .btn-close{filter:none}
</style>

<style>
.table-toolbar{display:flex; align-items:center; gap:.75rem}
.table-toolbar .spacer{flex:1}
.table-toolbar .search-wrapper{display:flex; align-items:center; gap:.5rem; padding:.25rem .5rem; border:1px solid #e2e8f0; border-radius:8px; background:#fff}
.btn-add,.btn-add.p-button{background:var(--ref-green)!important; border-color:var(--ref-green)!important; color:#fff!important; border:none; padding:.55rem .95rem; border-radius:10px; box-shadow:0 6px 14px rgba(0,191,166,.18)}
.btn-add.outline{background:#fff!important; color:var(--ref-green)!important; border:2px solid var(--ref-green)!important; box-shadow:none}
.btn-add.outline:hover{background:var(--ref-green)!important; color:#fff!important; box-shadow:0 6px 14px rgba(0,191,166,.18)}
.row-actions{display:inline-flex; align-items:center; gap:.5rem}
</style>
