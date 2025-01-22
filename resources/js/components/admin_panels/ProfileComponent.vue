<template>
<div id="app">
 <h2 class="pb-3 pt-4 text-center"><strong>Profile</strong></h2>

 <!-- edit new Modal -->
 <div class="modal fade" id="editNew" tabindex="-1" aria-labelledby="editNew" aria-hidden="true">
  <div class="modal-dialog modal-lg">
   <div class="modal-content">
    <div class="modal-header">
     <h5 class="modal-title text-dark" id="addNew">
      Edit User Profile
     </h5>
     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
     </button>
    </div>
    <div class="modal-body">
     <form @submit.prevent="updateUser()">

      <div class="mb-3">
       <label for="formGroupExampleInput" class="form-label"><strong>Firstname:</strong></label>
       <input v-model="form.name" type="text" name="name" placeholder="Enter name" class="form-control" />
      </div>
      <div class="mb-3">
       <label for="formGroupExampleInput2" class="form-label"><strong>Lastname:</strong></label>
       <input v-model="form.lastname" type="text" name="lastname" placeholder="Enter lastname" class="form-control" />
      </div>
      <div class="mb-3">
       <label for="formGroupExampleInput" class="form-label"><strong>Email address:</strong></label>
       <input v-model="form.email" name="email" id="email" placeholder="email" class="form-control" />
      </div>
      <div class="mb-3">
       <label for="formGroupExampleInput" class="form-label"><strong>Phone number:</strong></label>
       <input v-model="form.phone" type="text" name="phone" placeholder="Enter mobile number" class="form-control" />
      </div>
      <div class="mb-3">
       <label for="formGroupExampleInput" class="form-label"><strong>Password:</strong></label>
       <input v-model="form.password" id="password" type="text" name="password" placeholder="Enter password" class="form-control" />
      </div>
      <div class="modal-footer">
       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
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

 <div class="container text-center">

  <div class="row pb-2  text-center">

   <div class="col">
    <span class="badge h3" style="width:100%;font-size:18px;border-radius:10px; color:#3D8F67;background:#d1f4d0"><a href="/notes" style="text-decoration:none;color:#3D8F67;background:#d1f4d0">Notes</a></span>
   </div>
   <div class="col">
    <span class="badge h3" style="width:100%;font-size:18px;border-radius:10px; color:#B70D52;background:#ead1dc"><a href="/bookmarks" style="text-decoration:none;color:#B70D52;background:#ead1dc">Bookmarks</a></span>
   </div>
   <div class="col">
    <span class="badge h3" style="width:100%;font-size:18px;border-radius:10px; color:#0263FF;background:#c2d8fb"><a href="/home" style="text-decoration:none;color:#0263FF;background:#c2d8fb">Home</a></span>
   </div>

  </div>
 </div>

 <!-- profile section -->
 <div class="container">
  <div class="row ">
   <div class="col-lg-8">
    <div class="card mb-4">
     <div class="card-body" style="border:2px solid rgba(0, 191, 166); border-radius:8px">
      <div class="row">
       <div class="text-center">
        <h3 class="mb-3 text-left"><strong>Personal Information:</strong></h3>
       </div>
      </div>
      <hr>
      <div class="row">
       <div class="col-sm-3">
        <strong class="mb-0">Full Name:</strong>
       </div>
       <div class="col-sm-9">
        <p class="text-muted mb-0 text-black">{{ user.name }} {{ user.lastname }}</p>
       </div>
      </div>
      <hr>
      <div class="row">
       <div class="col-sm-3">
        <strong class="mb-0">Email:</strong>
       </div>
       <div class="col-sm-9">
        <p class="text-muted mb-0">{{ user.email }}</p>
       </div>
      </div>
      <hr>
      <div class="row">
       <div class="col-sm-3">
        <strong class="mb-0">Phone:</strong>
       </div>
       <div class="col-sm-9">
        <p class="text-muted mb-0">{{ user.phone }}</p>
       </div>
      </div>
      <hr>
      <button data-bs-toggle="modal" data-bs-target="#editNew" type="button" class="btn text-white text-right user-btn mr-2" style="background:rgba(0, 191, 166); color:white; font-weight:bold border-radius:8px" @click="editModal(user)">
       Edit Profile
      </button>
     </div>
    </div>
   </div>

   <div class="col-lg-4">
    <div class="card mb-4">
     <div class="card-body text-center" style="border:2px solid rgba(0, 191, 166); border-radius:8px">
      <div class="row">
       <div class="text-center">
        <h3 class="mb-3 text-left"><strong>Statistics:</strong></h3>
       </div>
      </div>
      <ul class="list-group list-group-flush">
       <li class="list-group-item d-flex justify-content-between align-items-center">
        <i class="bi bi-file-earmark-fill h4 links"></i>
        <b class="text-left"><a href="/notes" style="text-decoration:none; color:black">Notes</a></b>
        <span class="badge rounded-pill" style="background: rgba(0, 191, 166)">{{ notes.length }}</span>
       </li>
       <li class="list-group-item d-flex justify-content-between align-items-center">
       <i class="bi bi-bookmark-fill h4 links"></i>
        <b class="text-left"><a href="/bookmarks" style="text-decoration:none; color:black">Bookmarks</a></b>
        <span class="badge rounded-pill h4" style="background: rgba(0, 191, 166)">{{ bookmarks.length }}</span>
       </li>
       <!-- <li class="list-group-item d-flex justify-content-between align-items-center">
       <i class="bi bi-collection-fill h4 links"></i>
        <b class="text-left">Collections</b>
        <span class="badge rounded-pill" style="background: rgba(0, 191, 166)">{{ folders.length }}</span>
       </li> -->
      </ul>
     </div>
    </div>
   </div>
  </div>
 </div>

</div>
</template>

<script>
import axios from "axios";
export default {
  props: {
  information: { // Assuming information is passed as a prop
   type: Object,
   default: null
  }
 },
 mounted() {
  this.fetchUserIdAndNotes();
  this.fetchUserIdAndBookmarks();
  this.fetchUserIdAndFolders();
 },
 props: ["user"],
 data() {
  return {
   users: {},
   userId: null,
   notes: [],
   bookmarks: [],
  //  folders: [],
   editmode: false,
   form: new Form({
    id: "",
    name: "",
    email: "",
    lastname: "",
    phone: "",
    user_type: "",
    password: ""
   }),
  };
 },
 methods: {
  async fetchUserIdAndNotes() {
    try {
      const response = await fetch('/api/userId');
      if (!response.ok) {
        throw new Error('Failed to fetch user ID');
      }
      const data = await response.json();
      this.userId = data.userId;
      
      if (this.userId) {
        await this.fetchNotes(this.userId);
      } else {
        console.error('User ID not found');
      }
    } catch (error) {
      console.error('Error fetching user ID or notes:', error);
    }
  },
  async fetchUserIdAndBookmarks() {
    try {
      const response = await fetch('/api/userId');
      if (!response.ok) {
        throw new Error('Failed to fetch user ID');
      }
      const data = await response.json();
      this.userId = data.userId;
      
      if (this.userId) {
        await this.fetchBookmarks(this.userId);
      } else {
        console.error('User ID not found');
      }
    } catch (error) {
      console.error('Error fetching user ID or bookmarks:', error);
    }
  },
  // async fetchUserIdAndFolders() {
  //   try {
  //     const response = await fetch('/api/userId');
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch user ID');
  //     }
  //     const data = await response.json();
  //     this.userId = data.userId;
      
  //     if (this.userId) {
  //       await this.fetchFolders(this.userId);
  //     } else {
  //       console.error('User ID not found');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user ID or folders:', error);
  //   }
  // },
  // async fetchFolders(userId) {
  //   try {
  //     const response = await fetch(`/api/fetch-folders/${userId}`);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch folders');
  //     }
  //     this.folders = await response.json(); // Correctly updating folders
  //   } catch (error) {
  //     console.error('Error fetching folders:', error);
  //   }
  // },
  async fetchNotes(userId) {
    try {
      const response = await fetch(`/api/fetch-notes/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      this.notes = await response.json();
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  },
  async fetchBookmarks(userId) {
    try {
      const response = await fetch(`/api/fetch-bookmarks/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bookmarks');
      }
      this.bookmarks = await response.json();
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  },
  
  loadUsers() {
   axios.get("api/fetch-users").then((data) => {
    this.users = data.data;
   });
  },
  updateUser() {
   Swal.fire({
     title: "Are you sure?",
     text: "You want to update user !",
     showCancelButton: true,
     confirmButtonColor: "green",
     cancelButtonColor: "#d33",
     confirmButtonText: "Update user!",
    },
    1000
   ).then((result) => {
    if (result.isConfirmed) {
     axios.post(`api/update-users/${this.form.id}`, this.form);
     Swal.fire({
      position: "top-end",
      icon: "success",
      title: "User created successfully ",
      showConfirmButton: false,
      timer: 1500,
     });
     window.location.reload();
     this.loadUsers();
     $("#editNew").modal("hide");
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
 },
};
</script>

<style>
.links {
 /*for text new colour (not worked)*/
 
 color: rgb(119, 119, 119);
 transition: opacity .9s, margin-left .5s, margin-right .5s;
}
</style>
