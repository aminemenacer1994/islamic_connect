<template>
<div id="app" class="admin-page">

  <!-- view new Modal -->
  <div class="modal fade" id="editNewUser" tabindex="-1" aria-labelledby="editNew" aria-hidden="true">
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
              <label class="mt-2 mr-2 col-sm-3">email:</label>
              <p class="mt-2 text-dark">
                {{ form.email }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Phone:</label>
              <p class="mt-2 text-dark">
                {{ form.phone }}
              </p>
            </div>

            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">User type:</label>
              <p class="mt-2 text-dark">
                {{ form.user_type }}
              </p>
            </div>
          <!--
            <div class="mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Status:</label>
              <p class="mt-2 text-dark">
                {{ form.status }}
              </p>
            </div>
          -->
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

  <!-- add user -->
  <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="addNew" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-dark fs-5" id="exampleModalLabel"><b>Add new user</b></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @reset="reset" @submit.prevent="createUser()">
            <div class="form-group mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Firstname:</label>
              <input v-model="form.name" type="text" name="name" placeholder="Enter name" class="form-control" />
            </div>

            <div class="form-group mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">lastname:</label>
              <input v-model="form.lastname" type="text" name="lastname" placeholder="Enter lastname" class="form-control" />
            </div>

            <div class="form-group" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Email:</label>
              <input v-model="form.email" name="email" id="email" placeholder="Enter email" class="form-control" />
            </div>

            <div class="form-group mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Phone number:</label>
              <input v-model="form.phone" type="text" name="phone" placeholder="Enter mobile number" class="form-control" />
            </div>

            <div class="form-group mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Password:</label>
              <input v-model="form.password" type="password" name="password" placeholder="Enter password" class="form-control" />
            </div>
            
            <div class="form-group mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">User Type:</label>

              <select class="form-control" name="user_type" v-model="form.user_type">
                <option value="" disabled>Select User Type</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Basic user">Basic user</option>
                <option value="Standard user">Standard user</option>
                <option value="Business user">Business user</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
              <button type="reset" class="btn btn-secondary">Reset</button>
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>

  <!-- edit user -->
  <div class="modal fade" id="editNew" tabindex="-1" aria-labelledby="editNew" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-dark" id="addNew">
            Edit user
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateUser()">
            <div class="form-group mr-3" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Firstname:</label>
              <input v-model="form.name" type="text" name="name" placeholder="Enter firstname" class="form-control" />
            </div>

            <div class="form-group mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">lastname:</label>
              <input v-model="form.lastname" type="text" name="lastname" placeholder="Enter lastname" class="form-control" />
            </div>

            <div class="form-group" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Email:</label>
              <input v-model="form.email" name="email" id="email" placeholder="Enter email" class="form-control" />
            </div>

            <div class="form-group mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">Phone number:</label>
              <input v-model="form.phone" type="text" name="phone" placeholder="Enter phone number" class="form-control" />
            </div>

          
            <div class="form-group mr-2" style="display: flex">
              <label class="mt-2 mr-2 col-sm-3">User Type:</label>

              <select class="form-control" name="user_type" v-model="form.user_type">
                <option value="" disabled>Select User Type</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Basic user">Basic user</option>
                <option value="Standard user">Standard user</option>
                <option value="Business user">Business user</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                Close
              </button>

              <button type="submit" class="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>



  <DataTable
    :value="users"
    :loading="loading"
    ref="dt"
    class="pt-4 modern-datatable teal-accent"
    showGridlines
    stripedRows
    rowHover
    responsiveLayout="scroll"
    v-model:filters="filters"
    :globalFilterFields="globalFields"
    paginator
    :rows="10"
    :rowsPerPageOptions="[10, 20, 50, 100]"
    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    currentPageReportTemplate="Showing {first}–{last} of {totalRecords} users"
  >
    <template #header>

      <div class="table-toolbar">
        <div class="title"><i class="bi bi-people-fill me-2"></i>Users</div>
        <span class="spacer"></span>
        <div class="search-wrapper">
          <i class="bi bi-search"></i>
          <input
            class="form-control form-control-sm border-0"
            type="text"
            v-model="searchValue"
            placeholder="Search users..."
            @input="onGlobalFilter"
          />
        </div>
      </div>

    </template>

    <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" sortable style="text-align:center">
    </Column>

    <Column header="Actions" :exportable="false" style="min-width: 16rem; text-align:center;">
      <template #body="{ data }">
        <div class="row-actions">
          <button data-bs-toggle="modal" data-bs-target="#editNewUser" type="button" class="btn btn-sm btn-primary" @click="editModal(data)">
            <i class="bi bi-eye me-1"></i> View
          </button>
          <button data-bs-toggle="modal" data-bs-target="#editNew" type="button" class="btn btn-sm btn-success" @click="editModal(data)">
            <i class="bi bi-pencil me-1"></i> Edit
          </button>
          <button class="btn btn-sm btn-danger" @click="deleteUser(data.id)">
            <i class="bi bi-trash me-1"></i> Delete
          </button>
        </div>
      </template>
    </Column>

    <template #empty>
      <div class="empty">No users found.</div>
    </template>
    <template #footer>
      <span class="footer-count">Total: {{ users ? users.length : 0 }} users</span>
    </template>

  </DataTable>

</div>
</template>

<script>
import axios from "axios";
import { FilterMatchMode } from 'primevue/api'
 
export default {
  mounted() {
    this.loadUsers();
    this.InitializeForm();
  },
  data() {
    return {
      loading: false,
      users: [],
      searchValue: "",
      filters: { global: { value: null, matchMode: FilterMatchMode.CONTAINS } },
      totalUsers: 0,

      columns: [
        // {
        //   field: "id",
        //   header: "ID",
        //   sortable: true,
        // },
        {
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
          field: "email",
          header: "Email",
          sortable: true,
        },
        {
          field: "user_type",
          header: "User Type",
          sortable: true,
        }
      ],
      sortDesc: false,
      form: new Form({
        id: "",
        name: "",
        lastname: "",
        email: "",
        phone: "",
        // status: "",
        password: "",
        user_type: "",
      }),
    }
  },
  computed: {
    globalFields(){
      return (this.columns || []).map(c => c.field);
    }
  },
  methods: {
    onGlobalFilter(e){
      this.filters.global.value = e.target.value;
    },

    InitializeForm() {
      this.form.id = "";
      this.form.name = "";
      this.form.lastname = "";
      this.form.email = "";
      this.form.phone = "";
      this.form.user_type = "";
    },
    Reset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.id = "";
      this.form.name = "";
      this.form.lastname = "";
      this.form.user_type = "";
      this.form.phone = "";
      this.form.email = "";
    },
    loadUsers() {
      this.loading = true;
      axios.get("api/fetch-users").then((data) => {
        this.users = data.data;
      }).finally(() => {
        this.loading = false;
      });
    },

    //create user
    createUser() {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to create a new user !",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "#d33",
        confirmButtonText: "Create user!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("api/create-users", this.form)
            .then((res) => {
              if (!res.data.success) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created successfully ",
                  showConfirmButton: false,
                  timer: 1500,
                });
                window.location.reload();
                this.loadUsers();
                $("#addNew").hide();
                self.close();
              } else if (res.data.success) {
                Swal.fire(
                  "Error!",
                  "Unable to create user.",
                  "error"
                );
                this.loadUsers();
                self.close();
              }
            })
            .catch(function (err) {});
        }
      });
    },
    updateUser() {
      Swal.fire({
          title: "Are you sure you want to update?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, update user!",
        },
        1000
      ).then((result) => {
        if (result.isConfirmed) {
          axios.post(`api/update-users/${this.form.id}`, this.form);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User updated successfully ",
            showConfirmButton: false,
            timer: 1500,
          });

          this.loadUsers();

          $("#editNew").modal("hide");

          self.close();
        }
      });
    },
    deleteUser(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete user!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete("api/delete-users/" + id);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User deleted successfully ",
            showConfirmButton: false,
            timer: 1500,
          });
          this.loadUsers();
          self.close();
        }
      });
    },
    // add new modal
    newModal(user) {
      this.form.reset();
      $("#addNew").modal("show");
    },
    //edit user modal
    editModal(user) {
      this.editmode = true;
      this.form.reset();
      this.form.fill(user);
    },
    viewModal(user) {
      this.form.reset();
      $("#view").modal("show");
      this.form.fill(user);
    },
  }

}
</script>
