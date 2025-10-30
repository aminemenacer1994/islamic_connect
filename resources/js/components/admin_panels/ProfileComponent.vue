<template>
  <div id="app" class="profile-wrap">
    <!-- Top dark-green toolbar with search and quick actions -->
    <div class="profile-topbar">
      <div class="container d-flex align-items-center justify-content-between gap-2">
        <div class="searchbar">
          <i class="bi bi-search"></i>
          <input type="search" class="form-control" placeholder="Search" aria-label="Search" />
        </div>
        <div class="top-actions d-none d-md-flex align-items-center gap-2">
          <button class="btn btn-ghost-light btn-sm">Today</button>
          <button class="btn btn-ghost-light btn-sm" aria-label="Notifications"><i class="bi bi-bell"></i></button>
          <button class="btn btn-ghost-light btn-sm" aria-label="Settings"><i class="bi bi-gear"></i></button>
        </div>
      </div>
    </div>

    <div class="container my-3">
      <h5 class="mb-3">My Profile</h5>

      <!-- Overview card -->
      <div class="card frosted p-3 mb-3">
        <div class="d-flex align-items-center gap-3">
          <img :src="avatarUrl" alt="Avatar" class="avatar-lg rounded-circle">
          <div class="flex-grow-1">
            <h5 class="m-0 d-flex align-items-center gap-2">
              <span>{{ user.name }} {{ user.lastname }}</span>
              <span v-if="user?.user_type || user?.role" class="role-badge" aria-label="User role">{{ user.user_type || user.role }}</span>
            </h5>
            <div class="text-muted small">Member since {{ formattedJoin }}</div>
          </div>
        </div>
      </div>

      <!-- Personal Information section -->
      <div class="section-card">
        <div class="section-header">
          <h6 class="m-0">Personal Information</h6>
          <button class="btn btn-sm btn-amber" data-bs-toggle="modal" data-bs-target="#editNew" @click="editModal(user)">
            <i class="bi bi-pencil-square me-1"></i> Edit
          </button>
        </div>
        <div class="section-body">
          <div class="row g-3">
            <div class="col-md-4">
              <div class="field">
                <div class="field-label">First Name</div>
                <div class="field-value">{{ user.name || '—' }}</div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="field">
                <div class="field-label">Last Name</div>
                <div class="field-value">{{ user.lastname || '—' }}</div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="field">
                <div class="field-label">User Role</div>
                <div class="field-value">{{ user.user_type || user.role || 'User' }}</div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="field">
                <div class="field-label">Email Address</div>
                <div class="field-value">{{ user.email }}</div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="field">
                <div class="field-label">Phone Number</div>
                <div class="field-value">{{ user.phone || '—' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Address section (placeholders if missing) -->
      <div class="section-card mt-3">
        <div class="section-header">
          <h6 class="m-0">Address</h6>
          <button class="btn btn-sm btn-amber" data-bs-toggle="modal" data-bs-target="#editNew" @click="editModal(user)">
            <i class="bi bi-pencil-square me-1"></i> Edit
          </button>
        </div>
        <div class="section-body">
          <div class="row g-3">
            <div class="col-md-4">
              <div class="field">
                <div class="field-label">Country</div>
                <div class="field-value">{{ user.country || '—' }}</div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="field">
                <div class="field-label">City</div>
                <div class="field-value">{{ user.city || '—' }}</div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="field">
                <div class="field-label">Postal Code</div>
                <div class="field-value">{{ user.postal_code || '—' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal (Bootstrap 5) -->
    <div class="modal fade" id="editNew" tabindex="-1" aria-labelledby="editNewLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg modal-modern">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editNewLabel">Edit Profile</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateUser" novalidate>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">First name</label>
                  <div class="input-group">
                    <span class="input-group-text" aria-hidden="true"><i class="bi bi-person"></i></span>
                    <input v-model="form.name" type="text" class="form-control" placeholder="Enter first name" aria-label="First name">
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Last name</label>
                  <div class="input-group">
                    <span class="input-group-text" aria-hidden="true"><i class="bi bi-person"></i></span>
                    <input v-model="form.lastname" type="text" class="form-control" placeholder="Enter last name" aria-label="Last name">
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Email</label>
                  <div class="input-group">
                    <span class="input-group-text" aria-hidden="true"><i class="bi bi-envelope"></i></span>
                    <input v-model="form.email" type="email" class="form-control" placeholder="name@example.com" aria-label="Email">
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Phone</label>
                  <div class="input-group">
                    <span class="input-group-text" aria-hidden="true"><i class="bi bi-telephone"></i></span>
                    <input v-model="form.phone" type="tel" class="form-control" placeholder="e.g. +1 555 555 5555" aria-label="Phone">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="d-flex align-items-center justify-content-between">
                    <label class="form-label mb-0">Password</label>
                    <small class="text-muted">Leave blank to keep current</small>
                  </div>
                  <div class="input-group">
                    <span class="input-group-text" aria-hidden="true"><i class="bi bi-lock"></i></span>
                    <input v-model="form.password" type="password" class="form-control" placeholder="••••••••" aria-label="Password">
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  props: {
    information: { type: Object, default: null },
    user: { type: Object, required: true }
  },
 mounted() {
  this.fetchUserIdAndNotes();
  this.fetchUserIdAndBookmarks();
  this.fetchUserIdAndFolders();
 },
 data() {
  return {
   users: {},
   userId: null,
   notes: [],
   bookmarks: [],
   folders: [],
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
  computed: {
    avatarUrl(){
      try {
        const email=(this.user?.email||'').trim().toLowerCase();
        const hash = window.md5 ? window.md5(email) : '';
        // fallback to identicon param if md5 not available
        return `https://www.gravatar.com/avatar/${hash}?s=140&d=identicon`;
      } catch(_) {
        return `https://www.gravatar.com/avatar/?s=140&d=identicon`;
      }
    },
    formattedJoin(){
      try{
        const d = new Date(this.user?.created_at || this.user?.createdAt || '');
        if (!isNaN(d)) {
          const y=d.getFullYear();
          const m=String(d.getMonth()+1).padStart(2,'0');
          const day=String(d.getDate()).padStart(2,'0');
          return `${y}-${m}-${day}`;
        }
        return '';
      }catch(_){return ''}
    }
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
  async fetchUserIdAndFolders() {
    try {
      const response = await fetch('/api/userId');
      if (!response.ok) {
        throw new Error('Failed to fetch user ID');
      }
      const data = await response.json();
      this.userId = data.userId;

      if (this.userId) {
        await this.fetchFolders(this.userId);
      } else {
        console.error('User ID not found');
      }
    } catch (error) {
      console.error('Error fetching user ID or folders:', error);
    }
  },
  async fetchFolders(userId) {
    try {
      const response = await fetch(`/api/fetch-folders/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch folders');
      }
      this.folders = await response.json();
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  },
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
     axios.post(`api/update-users/${this.form.id}`, this.form)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile updated",
          showConfirmButton: false,
          timer: 1200,
        });
        this.hideEditModal();
      })
      .catch(() => {
        Swal.fire({ icon: 'error', title: 'Update failed', timer: 1500, showConfirmButton: false });
      });
    }
   });
  },
  
  //edit user modal
  editModal(user) {
   this.editmode = true;
   this.form.reset();
   this.form.fill(user);
  },
  viewModal(user) {
   this.form.reset();
   // optional: show a separate view modal if implemented
   this.form.fill(user);
  },
  hideEditModal(){
    try {
      const el=document.getElementById('editNew');
      if(!el) return;
      const inst=bootstrap.Modal.getInstance(el) || bootstrap.Modal.getOrCreateInstance(el);
      inst.hide();
    } catch(_) {}
  }
 },
};
</script>

<style scoped>
/* Colors inspired by reference */
.profile-wrap{background:linear-gradient(180deg,#f3f4f6, #eef1f4)}
.profile-topbar{background:var(--ref-green); color:#fff; padding:12px 0; border-bottom-left-radius:14px; border-bottom-right-radius:14px}
.profile-topbar .btn{border-radius:10px}
.searchbar{position:relative; max-width:560px; flex:1}
.searchbar i{position:absolute; left:12px; top:50%; transform:translateY(-50%); color:#d9efe7}
.searchbar .form-control{padding-left:38px; background:rgba(255,255,255,.08); color:#fff; border:1px solid rgba(255,255,255,.2); border-radius:12px}
.searchbar .form-control:focus{box-shadow:0 0 0 2px rgba(255,255,255,.30); border-color:#fff}
.searchbar .form-control::placeholder{color:#cfe7df}
.frosted{background:#fbfcfd; border:1px solid #e5e7eb; border-radius:16px; box-shadow:0 8px 24px rgba(15,23,42,.06)}
.avatar-lg{width:64px;height:64px}
.section-card{background:#fafbfc; border:1px solid #e5e7eb; border-radius:16px; box-shadow:0 8px 24px rgba(15,23,42,.06)}
.section-header{display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-bottom:1px solid #eef2f5}
.section-body{padding:16px}
.field{background:#f8fafc; border:1px solid #e5e7eb; border-radius:12px; padding:12px}
.field-label{font-size:.8rem; color:#475569; margin-bottom:2px}
.field-value{font-weight:700; color:#0f172a}
/* Role badge */
.role-badge{background:#e6fcf7; color:var(--ref-green); border:1px solid #b3efe3; padding:4px 8px; border-radius:999px; font-size:.75rem; font-weight:700}
/* Amber button to match reference */
.btn-amber{background:var(--ref-amber); border-color:var(--ref-amber); color:#212529}
.btn-amber:hover{filter:brightness(.95)}
/* Ghost light button for topbar actions */
.btn-ghost-light{background:transparent; color:#fff; border:1px solid rgba(255,255,255,.35)}
.btn-ghost-light:hover{background:rgba(255,255,255,.12); color:#fff}
/* Modern modal styling */
.modal-modern .modal-content{border:1px solid #e5e7eb; border-radius:16px; box-shadow:0 16px 40px rgba(15,23,42,.18)}
.modal-modern .modal-header{background:#fff; color:#111; border-bottom:1px solid #e5e7eb; border-top-left-radius:16px; border-top-right-radius:16px}
.modal-modern .btn-close{filter:none}
.modal-modern .input-group-text{background:#f1f5f9; border-color:#e2e8f0}
.modal-modern .form-control:focus{box-shadow:0 0 0 .2rem rgba(11,128,111,.15); border-color: var(--ref-green)}
/* Mobile refinements */
@media (max-width: 576px){
  .profile-topbar{padding:10px 0}
  .avatar-lg{width:56px;height:56px}
}
</style>

<style>
.links {
 /*for text new colour (not worked)*/
 
 color: rgb(119, 119, 119);
 transition: opacity .9s, margin-left .5s, margin-right .5s;
}
</style>
