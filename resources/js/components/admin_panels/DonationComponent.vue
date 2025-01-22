<template>
<div>
   <h2 class="pt-3 text-center" ><strong>Donation Management</strong></h2>

  <!-- view new Modal -->
  <div class="modal fade" id="editNewDonation" tabindex="-1" aria-labelledby="editNew" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-dark" id="addNew">
            View message
          </h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
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
  <DataTable class="pt-5" v-model:filters="filters" showGridlines stripedRows sortable filterDisplay="row" :value="donations" paginator :rows="7" :rowsPerPageOptions="[5, 10, 20, 50]" removableSort width="100%" tableStyle="max-width:100%">
    <template #header>
      <div class="flex justify-content-start" style="display: flex;">

        <p style="display: flex" class=" ml-auto mr-3 mt-2 text-black">
          Search:
        </p>
        <span>
          <InputText v-model="filters['global'].value" style="float: left" placeholder="Keyword Search" />
        </span>
      </div>
    </template>

    <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" sortable class="text-left" style="align-items:center" width>
    </Column>

    <Column :exportable="true" style="min-width: 8rem">
      <template #body="slotProps">
        <div class="wrapper text-center" style="display:flex">
          <Button data-bs-toggle="modal" data-bs-target="#editNewDonation" type="button" class="btn user-btn text-white text-center mr-2 " style="background-color: #1e88e5; display:flex" @click="editModal(slotProps.data)">
            <i class="pi pi-eye mr-2"></i>
            View
          </Button>
        </div>
      </template>
    </Column>

    <template class="text-center" #footer> In total there are {{ donations ? donations.length : 0 }} donations. </template>

  </DataTable>
</div>
</template>

<script>
import axios from "axios";
import {
  FilterMatchMode
} from "primevue/api";

export default {
  mounted() {
    this.loadDonations();
    ProductService.getProductsMini().then((data) => (this.donations = data));
  },
  data() {
    return {
      filters: {
        global: {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
      },
      searchValue: "",
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

    loadDonations() {
      axios.get("api/fetch-donations").then((data) => {
        this.donations = data.data;
      });
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

</style>
