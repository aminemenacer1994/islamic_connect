<template>
  <div>

    <!-- view new Modal -->
    <div class="modal fade" id="editNewPayment" tabindex="-1" aria-labelledby="editNew" aria-hidden="true">
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
    <DataTable class="pt-4 modern-datatable" :value="payments" :loading="loading" ref="dt" v-model:filters="filters"
      :globalFilterFields="['amount', 'status', 'payment_method', 'description', 'customer', 'date']" showGridlines
      stripedRows rowHover responsiveLayout="scroll" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50, 100]"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="Showing {first}–{last} of {totalRecords} payments" removableSort width="100%"
      tableStyle="max-width:100%">
      <template #header>
        <div class="table-toolbar">
          <div class="title"><i class="bi bi-credit-card me-2"></i>Payments</div>
          <span class="spacer"></span>
          <!-- <Button class="btn-add outline" @click="loadStripe()" :disabled="loading">
          <i class="bi bi-cloud-download me-2"></i>Load from Stripe
        </Button> -->
          <div class="search-wrapper">
            <i class="bi bi-search"></i>
            <input class="form-control form-control-sm border-0" type="text" v-model="searchValue"
              placeholder="Search payments..." @input="onGlobalFilter" />
          </div>
        </div>
        <div v-if="errorMsg" class="alert alert-warning mt-2" role="alert">
          {{ errorMsg }}
        </div>
      </template>

      <Column field="amount" header="Amount" sortable>
        <template #body="{ data }">
          <span>{{ formatAmount(data.amount, data.currency) }}</span>
          <small class="text-muted ms-1">{{ data.currency }}</small>
        </template>
      </Column>
      <Column field="status" header="Status" sortable>
        <template #body="{ data }">
          <span class="badge bg-light text-dark" :data-status="data.status">{{ prettyStatus(data.status) }}</span>
        </template>
      </Column>
      <Column field="payment_method" header="Payment method" sortable></Column>
      <Column field="description" header="Description" sortable></Column>
      <Column field="customer" header="Customer" sortable></Column>
      <Column field="date" header="Date" sortable></Column>
      <!-- <Column field="refunded_date" header="Refunded date" sortable></Column> -->
      <!-- <Column field="decline_code" header="Decline" sortable></Column> -->
      <Column field="receipt_url" header="Receipt" :exportable="false">
        <template #body="{ data }">
          <a v-if="data.receipt_url" :href="data.receipt_url" target="_blank" rel="noopener">Receipt</a>
          <span v-else> </span>
        </template>
      </Column>

      <Column header="Actions" :exportable="false" style="min-width: 12rem">
        <template #body="{ data }">
          <div class="row-actions">
            <button data-bs-toggle="modal" data-bs-target="#editNewPayment" type="button" class="btn btn-sm btn-primary"
              @click="editModal(data)">
              <i class="bi bi-eye me-1"></i> View
            </button>
          </div>
        </template>
      </Column>

      <template #empty>
        <div class="empty">No payments found.</div>
      </template>
      <template class="text-center" #footer> In total there are {{ payments ? payments.length : 0 }} Payments.
      </template>

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
import { FilterMatchMode } from 'primevue/api'


export default {
  mounted() {
    // Load live Stripe data by default; local mirror still available
    this.loadStripe();
  },
  data() {
    return {
      loading: false,
      errorMsg: '',
      searchValue: "",
      filters: { global: { value: null, matchMode: FilterMatchMode.CONTAINS } },
      columns: [],
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
    onGlobalFilter(e) { this.filters.global.value = e.target.value; },

    loadPayments() {
      this.loading = true;
      axios.get("api/fetch-payments").then((data) => {
        this.payments = data.data;
      }).finally(() => { this.loading = false; });
    },
    async loadStripe() {
      this.loading = true;
      this.errorMsg = '';
      try {
        const res = await axios.get('api/stripe/transactions');
        if (res.data && res.data.error) {
          this.errorMsg = res.data.error;
          this.payments = [];
          return;
        }
        const rows = (res.data && res.data.data) ? res.data.data : [];
        // Use rows as-is; backend already shapes like Stripe
        this.payments = rows;
      } catch (e) {
        this.errorMsg = (e?.response?.data?.error) || 'Failed to load from Stripe. Check server logs and STRIPE_SECRET.';
      } finally {
        this.loading = false;
      }
    },
    prettyStatus(s) {
      if (!s) return ' ';
      const map = { reversed: 'Reversed', refunded: 'Refunded', canceled: 'Cancelled', cancelled: 'Cancelled', succeeded: 'Succeeded', failed: 'Failed' };
      return map[String(s).toLowerCase()] || s;
    },
    formatAmount(amount, currency) {
      if (amount === null || amount === undefined || amount === '') return ' ';
      try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency || 'GBP' }).format(parseFloat(amount)); } catch (e) { return amount + ' ' + (currency || ''); }
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

<style>
.modal-modern .modal-content {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 16px 40px rgba(15, 23, 42, .18)
}

.modal-modern .modal-header {
  background: #fff;
  color: #111;
  border-bottom: 1px solid #e5e7eb;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px
}

.modal-modern .btn-close {
  filter: none
}

.modern-datatable {
  width: 100%
}

.table-toolbar {
  display: flex;
  align-items: center;
  gap: .75rem
}

.table-toolbar .spacer {
  flex: 1
}

.table-toolbar .search-wrapper {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: .25rem .5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff
}

.empty {
  color: #6b7280;
  padding: 1rem
}

/* subtle teal accent */
.modern-datatable .p-datatable-tbody>tr {
  transition: background .18s ease
}

.modern-datatable .p-datatable-tbody>tr:hover {
  background: #f1fcf9
}

.row-actions {
  display: inline-flex;
  align-items: center;
  gap: .5rem
}

/* outlined brand button for consistency */
.btn-add,
.btn-add.p-button {
  background: var(--ref-green) !important;
  border-color: var(--ref-green) !important;
  color: #fff !important;
  border: none;
  padding: .55rem .95rem;
  border-radius: 10px;
  box-shadow: 0 6px 14px rgba(0, 191, 166, .18)
}

.btn-add.outline {
  background: #fff !important;
  color: var(--ref-green) !important;
  border: 2px solid var(--ref-green) !important;
  box-shadow: none
}

.btn-add.outline:hover {
  background: var(--ref-green) !important;
  color: #fff !important;
  box-shadow: 0 6px 14px rgba(0, 191, 166, .18)
}
</style>
