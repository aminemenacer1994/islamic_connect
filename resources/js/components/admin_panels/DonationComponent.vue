<template>
<div>

  <!-- view new Modal -->
  <div class="modal fade" id="editNewDonation" tabindex="-1" aria-labelledby="editNew" aria-hidden="true">
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
              <label class="mt-2 mr-2 col-sm-3">Name:</label>
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
              <label class="mt-2 mr-2 col-sm-3">Amount:</label>
              <p class="mt-2 text-dark">
                {{ form.amount }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Currency:</label>
              <p class="mt-2 text-dark">
                {{ form.currency }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Email:</label>
              <p class="mt-2 text-dark">
                {{ form.email }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Country:</label>
              <p class="mt-2 text-dark">
                {{ form.country }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Payment Status:</label>
              <p class="mt-2 text-dark">
                {{ form.payment_status }}
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

  <!-- donation datatable -->
  <DataTable
    class="pt-4 modern-datatable"
    :value="donations"
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
    currentPageReportTemplate="Showing {first}–{last} of {totalRecords} donations"
    removableSort
    width="100%"
    tableStyle="max-width:100%"
  >
    <template #header>
      <div class="table-toolbar">
        <div class="title"><i class="bi bi-gift me-2"></i>Donations</div>
        <span class="spacer"></span>
        <div class="search-wrapper">
          <i class="bi bi-search"></i>
          <input
            class="form-control form-control-sm border-0"
            type="text"
            v-model="searchValue"
            placeholder="Search donations..."
            @input="onGlobalFilter"
          />
        </div>
      </div>
    </template>

    <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" sortable class="text-left" style="align-items:center">
    </Column>

    <Column header="Actions" :exportable="false" style="min-width: 12rem">
      <template #body="{ data }">
        <div class="row-actions">
          <button data-bs-toggle="modal" data-bs-target="#editNewDonation" type="button" class="btn btn-sm btn-primary" @click="editModal(data)">
            <i class="bi bi-eye me-1"></i> View
          </button>
        </div>
      </template>
    </Column>

    <template #empty>
      <div class="empty">No donations found.</div>
    </template>
    <template class="text-center" #footer>
      In total there are {{ donations ? donations.length : 0 }} donations.
    </template>

  </DataTable>
</div>
</template>

<script>
import axios from "axios";
import { FilterMatchMode } from 'primevue/api'
 

export default {
  mounted() {
    this.loadDonations();
  },
  data() {
    return {
      loading: false,
      searchValue: "",
      filters: { global: { value: null, matchMode: FilterMatchMode.CONTAINS } },
      columns: [{
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
          field: "amount",
          header: "Amount",
          sortable: true,
        },
        {
          field: "currency",
          header: "Currency",
          sortable: true,
        },
        {
          field: "payment_status",
          header: "Payment Status",
          sortable: true,
        }
      ],

      donations: null,
      sortDesc: false,

      form: new Form({
        id: "",
        firstname: "",
        lastname: "",
        amount: "",
        currency: "",
        country: "",
        email: "",
        payment_status: ""
      }),
    };
  },
  methods: {
    onGlobalFilter(e){ this.filters.global.value = e.target.value; },

    loadDonations() {
      this.loading = true;
      axios.get("api/fetch-donations").then((data) => {
        this.donations = data.data;
      }).finally(()=>{ this.loading = false; });
    },
    //edit donation modal
    editModal(donation) {
      this.editmode = true;
      this.form.fill(donation);
    },
    viewModal(donation) {
      $("#view").modal("show");
      this.form.fill(donation);
    },
  },
}
</script>

<style>
.modal-modern .modal-content{border:1px solid #e5e7eb; border-radius:16px; box-shadow:0 16px 40px rgba(15,23,42,.18)}
.modal-modern .modal-header{background:#fff; color:#111; border-bottom:1px solid #e5e7eb; border-top-left-radius:16px; border-top-right-radius:16px}
.modal-modern .btn-close{filter:none}
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
.row-actions{display:inline-flex; align-items:center; gap:.5rem}
</style>
