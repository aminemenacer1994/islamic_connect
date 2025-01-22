<template>
<div>
   <h2 class="pt-3 text-center"><strong>Payment Management</strong></h2>

  <!-- view new Modal -->
  <div class="modal fade" id="editNewPayment" tabindex="-1" aria-labelledby="editNew" aria-hidden="true">
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
                {{ form.name }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Amount:</label>
              <p class="mt-2 text-dark">
                {{ form.amount }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Description:</label>
              <p class="mt-2 text-dark">
                {{ form.description }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Payment method:</label>
              <p class="mt-2 text-dark">
                {{ form.payment_method }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Currency:</label>
              <p class="mt-2 text-dark">
                {{ form.currency }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Status:</label>
              <p class="mt-2 text-dark">
                {{ form.status }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Date:</label>
              <p class="mt-2 text-dark">
                {{ form.date }}
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

  <!-- payment datatable -->
  <DataTable class="pt-5" v-model:filters="filters" showGridlines stripedRows sortable filterDisplay="row" :value="payments" paginator :rows="7" :rowsPerPageOptions="[5, 10, 20, 50]" removableSort width="100%" tableStyle="max-width:100%">
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
          <Button data-bs-toggle="modal" data-bs-target="#editNewPayment" type="button" class="btn user-btn text-white text-center mr-2 " style="background-color: #1e88e5; display:flex" @click="editModal(slotProps.data)">
            <i class="pi pi-eye mr-2"></i>
            View
          </Button>
        </div>
      </template>
    </Column>

    <template class="text-center" #footer> In total there are {{ payments ? payments.length : 0 }} Payments. </template>

  </DataTable>
</div>
</template>

<style scoped>
.action {
  display: flex;
  margin: 0 auto;
  width: auto;
  display: flex;
}

.wrapper {
  float: left;
  width: 100%;
  text-align: center;
}
</style>

<script>
import axios from "axios";
import {
  FilterMatchMode
} from "primevue/api";

export default {
  mounted() {
    this.loadPayments();
    ProductService.getProductsMini().then((data) => (this.payments = data.data));
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
      columns: [
        {
          field: "id",
          header: "ID",
          sortable: true,
        },
        {
          field: "name",
          header: "Name",
          sortable: true,
        },
        {
          field: "amount",
          header: "Amount",
          sortable: true,
        },
        {
          field: "payment_method",
          header: "Payment Method",
          sortable: true,
        },
        {
          field: "currency",
          header: "Currency",
          sortable: true,
        },
        {
          field: "status",
          header: "Status",
          sortable: true,
        },

      ],
      payments: null,

      form: new Form({
        id: "",
        name: "",
        amount: "",
        description: "",
        payment_method: "",
        currency: "",
        status: "",
        date: ""
      }),
    }
  },
  methods: {

    loadPayments() {
      axios.get("api/fetch-payments").then((data) => {
        this.payments = data.data;
      });
    },

    //edit donation modal
    editModal(payment) {
      this.editmode = true;
      this.form.fill(payment);
    },
    viewModal(payment) {
      $("#view").modal("show");
      this.form.fill(payment);
    },
  }
}
</script>
