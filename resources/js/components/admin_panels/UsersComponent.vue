<template>
<div id="app">
   <h2 class="pt-3 text-center"><strong>Users Management</strong></h2>

  <!-- view new Modal -->
  <div class="modal fade" id="editNewUser" tabindex="-1" aria-labelledby="editNew" aria-hidden="true">
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
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-dark fs-5" id="exampleModalLabel"><b>Add new user</b></h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
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
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-dark" id="addNew">
            Edit user
          </h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
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



  <DataTable v-model:filters="filters"  :value="users" ref="dt" class="text-center pt-5" width="100%" paginator :rows="7" :rowsPerPageOptions="[5, 10, 20, 50]"  >
    <template #header>

      <div class="flex justify-content-start" style="display:flex">
      
        <Button type="button" class="flex flex-column md:flex-row md:justify-content-between  mr-3" style="background:teal;border-radius:8%" data-bs-toggle="modal" data-bs-target="#createModal">
          Add New User
        </button>
 
        <p style="display: flex" class=" ml-auto mr-3 mt-2 text-black">
          Search:
        </p>
        <span>
          <InputText class="flex justify-content-end ml-2" v-model="filters['global'].value" placeholder="Keyword Search" />
        </span>

      </div>

    </template>

    <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" sortable style="text-align:center" >
    </Column>

    <Column :exportable="true" >
      <template #body="slotProps">
        <div style="display:flex">

          <div class="text-center">
            <Button data-bs-toggle="modal" data-bs-target="#editNewUser" type="button" class="btn user-btn text-white text-center mr-2 action btn1" style="background-color: #1e88e5; display:flex;display:inline-block" @click="editModal(slotProps.data)">
              <i class="bi bi-eye mr-2"></i>
              View
            </Button>
            <button data-bs-toggle="modal" data-bs-target="#editNew" type="button" class="btn text-white user-btn mr-2" style="background-color: #43a047;display:inline" @click="editModal(slotProps.data)">
              <i class="bi bi-pencil"></i>
              Edit
            </button>
            <button class="btn text-white user-btn" style="background-color: #b71c1c" @click="deleteUser(slotProps.data.id)">
              <i class="bi bi-trash"></i>
              Delete
            </button>

          </div>
        </div>
      </template>
    </Column>

    <template #footer> In total there are {{ users ? users.length : 0 }} Users. </template>

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
    this.loadUsers();
    this.InitializeForm();

 ProductService.getProductsMini().then((data) => (this.users = data));
  },
  data() {
    return {
      filters: {
        global: {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
      },
      users: [],
      searchValue: "",
      totalUsers: 0,

      columns: [
        {
          field: "id",
          header: "ID",
          sortable: true,
        },
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
          field: "role",
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
        role:"",
        user_type: "",
      }),
    }
  },
  methods: {

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
      axios.get("api/fetch-users").then((data) => {
        this.users = data.data;
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

<style>

</style>
