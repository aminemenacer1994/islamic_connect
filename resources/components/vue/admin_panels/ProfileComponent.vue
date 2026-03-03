<template>
  <div id="app">
    <div class="profile-surface">
      <div class="profile-banner">
        <div class="banner-content">
          <div class="d-flex align-items-center gap-3">
            <img :src="avatarUrl" alt="Avatar" class="avatar-lg rounded-circle">
            <div class="flex-grow-1">
              <h5 class="m-0 d-flex align-items-center gap-2">
                <span class="profile-display-name" style="font-weight: 800;">{{ user.name }} {{ user.lastname }}</span>
                <span v-if="user?.user_type || user?.role" class="role-badge" aria-label="User role">{{ user.user_type || user.role }}</span>
              </h5>
              <div class="text-muted small">Member since {{ formattedJoin }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-4 profile-panel">

      <!-- Quick Stats -->
      <div class="row g-3 mb-3">
        <div class="col-md-3">
          <a class="stat-card fade-pop stat-link" aria-label="Collections count" href="/bookmarks">
            <div class="stat-icon bg-teal"><i class="bi bi-collection"></i></div>
            <div class="stat-body">
              <div class="stat-label">Group Bookmarks</div>
              <div class="stat-value">{{ (folders && folders.length) || 0 }}</div>
            </div>
          </a>
        </div>
        <div class="col-md-3">
          <a class="stat-card fade-pop stat-link" aria-label="Bookmarks count" href="/bookmarks">
            <div class="stat-icon bg-teal"><i class="bi bi-bookmark-star"></i></div>
            <div class="stat-body">
              <div class="stat-label">Bookmarks</div>
              <div class="stat-value">{{ (bookmarks && bookmarks.length) || 0 }}</div>
            </div>
          </a>
        </div>
        <div class="col-md-3">
          <div class="stat-card stat-card--soon" aria-label="Notes coming soon">
            <div class="stat-icon"><i class="bi bi-journal-text"></i></div>
            <div class="stat-body">
              <div class="stat-label">Notes</div>
              <div class="stat-value">{{ (notes && notes.length) || 0 }}</div>
              <div class="stat-note">Coming very soon</div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stat-card stat-card--soon" aria-label="Group notes coming soon">
            <div class="stat-icon"><i class="bi bi-people"></i></div>
            <div class="stat-body">
              <div class="stat-label">Group Notes</div>
              <div class="stat-value">—</div>
              <div class="stat-note">Coming very soon</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Personal Information section -->
      <div class="section-card">
        <div class="section-header">
          <h4 class="m-0"><b>Personal Information</b></h4>
          <button class="btn btn-sm btn-edit" data-bs-toggle="modal" data-bs-target="#editNew"
            @click="editModal(user)">
            <i class="bi bi-pencil-square me-1"></i> Edit
          </button>
        </div>
        <div class="section-body">
          <div class="row g-3">
            <div class="col-md-4">
              <div class="field">
                <div class="field-label"><b>First Name</b></div>
                <div class="field-value">{{ user.name || ' ' }}</div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="field">
                <div class="field-label">Last Name</div>
                <div class="field-value">{{ user.lastname || ' ' }}</div>
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
                <div class="field-value">{{ user.phone || ' ' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Address section (placeholders if missing) -->
      <!--
      <div class="section-card mt-3">
        <div class="section-header">
          <h6 class="m-0">Address</h6>
          <button class="btn btn-sm btn-amber" data-bs-toggle="modal" data-bs-target="#editNew"
            @click="editModal(user)">
            <i class="bi bi-pencil-square me-1"></i> Edit
          </button>
        </div>
        <div class="section-body">
          <div class="row g-3">
            <div class="col-md-4">
              <div class="field">
                <div class="field-label">Country</div>
                <div class="field-value">{{ user.country || ' ' }}</div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="field">
                <div class="field-label">City</div>
                <div class="field-value">{{ user.city || ' ' }}</div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="field">
                <div class="field-label">Postal Code</div>
                <div class="field-value">{{ user.postal_code || ' ' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      -->
    </div>

    <!-- Edit Profile Modal (Bootstrap 5) -->
    <div class="modal fade" id="editNew" tabindex="-1" aria-labelledby="editNewLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down">
        <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editNewLabel">Edit Profile</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form class="modal-form" @submit.prevent="updateUser" novalidate>
              <div class="modal-form-grid row g-3">
                <div class="col-md-6">
                  <label class="form-label">First name</label>
                  <div class="input-group">
                    <span class="input-group-text" aria-hidden="true"><i class="bi bi-person"></i></span>
                    <input v-model="form.name" type="text" class="form-control" placeholder="Enter first name"
                      aria-label="First name">
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Last name</label>
                  <div class="input-group">
                    <span class="input-group-text" aria-hidden="true"><i class="bi bi-person"></i></span>
                    <input v-model="form.lastname" type="text" class="form-control" placeholder="Enter last name"
                      aria-label="Last name">
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Email</label>
                  <div class="input-group">
                    <span class="input-group-text" aria-hidden="true"><i class="bi bi-envelope"></i></span>
                    <input v-model="form.email" type="email" class="form-control" placeholder="name@example.com"
                      aria-label="Email">
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Phone</label>
                  <div class="input-group">
                    <span class="input-group-text" aria-hidden="true"><i class="bi bi-telephone"></i></span>
                    <input v-model="form.phone" type="tel" class="form-control" placeholder="e.g. +1 555 555 5555"
                      aria-label="Phone">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="d-flex align-items-center justify-content-between">
                    <label class="form-label mb-0">Password</label>
                    <small class="text-muted">Leave blank to keep current</small>
                  </div>
                  <div class="input-group">
                    <span class="input-group-text" aria-hidden="true"><i class="bi bi-lock"></i></span>
                    <input v-model="form.password" type="password" class="form-control" placeholder="••••••••"
                      aria-label="Password">
                  </div>
                </div>
              </div>
              <div class="modal-actions d-flex justify-content-end gap-3 mt-4">
                <button type="button" class="btn btn-modal-light" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-modal-primary">Save changes</button>
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
import { fetchUserIdFromApi } from "../../utils/bookmarkAuth";
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
    avatarUrl() {
      try {
        const email = (this.user?.email || '').trim().toLowerCase();
        const hash = window.md5 ? window.md5(email) : '';
        // fallback to identicon param if md5 not available
        return `https://www.gravatar.com/avatar/${hash}?s=140&d=identicon`;
      } catch (_) {
        return `https://www.gravatar.com/avatar/?s=140&d=identicon`;
      }
    },
    formattedJoin() {
      try {
        const d = new Date(this.user?.created_at || this.user?.createdAt || '');
        if (!isNaN(d)) {
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          return `${y}-${m}-${day}`;
        }
        return '';
      } catch (_) { return '' }
    }
  },
  methods: {
    async resolveProfileUserId() {
      if (this.userId) {
        return this.userId;
      }
      const userId = await fetchUserIdFromApi();
      if (userId) {
        this.userId = userId;
      }
      return this.userId;
    },
    async fetchUserIdAndNotes() {
      try {
        const userId = await this.resolveProfileUserId();
        if (userId) {
          await this.fetchNotes(userId);
        } else {
          console.error('User ID not found');
        }
      } catch (error) {
        console.error('Error fetching user ID or notes:', error);
      }
    },
    async fetchUserIdAndBookmarks() {
      try {
        const userId = await this.resolveProfileUserId();
        if (userId) {
          await this.fetchBookmarks(userId);
        } else {
          console.error('User ID not found');
        }
      } catch (error) {
        console.error('Error fetching user ID or bookmarks:', error);
      }
    },
    async fetchUserIdAndFolders() {
      try {
        const userId = await this.resolveProfileUserId();
        if (userId) {
          await this.fetchFolders();
        } else {
          console.error('User ID not found');
        }
      } catch (error) {
        console.error('Error fetching user ID or folders:', error);
      }
    },
    async fetchFolders() {
      try {
        const response = await fetch(`/fetch-folders`);
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
              this.user = {
                ...this.user,
                name: this.form.name,
                lastname: this.form.lastname,
                email: this.form.email,
                phone: this.form.phone,
                user_type: this.form.user_type
              };
              this.form.password = "";
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
    hideEditModal() {
      try {
        const el = document.getElementById('editNew');
        if (!el) return;
        const inst = bootstrap.Modal.getInstance(el) || bootstrap.Modal.getOrCreateInstance(el);
        inst.hide();
      } catch (_) { }
    }
  },
};
</script>

<style scoped>
.profile-surface {
  position: relative;
  max-width: 980px;
  margin: 0 auto 2rem;
}

.profile-surface::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 35px;
  background: radial-gradient(circle, rgba(14, 116, 144, 0.15), transparent 55%);
  filter: blur(42px);
  pointer-events: none;
  opacity: 0.35;
}

.profile-banner {
  border-radius: 30px;
  padding: 1.75rem 2rem;
  background: #ffffff;
  color: #0f172a;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(14, 116, 144, 0.25);
  box-shadow: 0 20px 35px rgba(14, 116, 144, 0.12);
  isolation: isolate;
}

.banner-content {
  position: relative;
  z-index: 1;
}

.banner-meta {
  opacity: 0.98;
  transition: opacity 0.3s ease;
}

.banner-meta p {
  font-weight: 600;
  color: rgba(15, 23, 42, 0.75);
}

.banner-meta .btn {
  box-shadow: 0 10px 25px rgba(14, 116, 144, 0.25);
}

.banner-meta .btn-primary {
  background-color: #111827;
  border-color: #111827;
  color: #f8fafc;
}

.btn-edit {
  background: transparent;
  border: 1px solid rgba(14, 116, 144, 0.4);
  color: #0f172a;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 0.4rem 0.75rem;
  border-radius: 12px;
  transition: background 0.3s ease, color 0.3s ease;
}

.btn-edit:hover {
  background: rgba(14, 116, 144, 0.1);
  color: #0d9488;
}

.ripple {
  position: relative;
  overflow: hidden;
}

.ripple::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(14, 116, 144, 0.25) 15%, transparent 65%);
  opacity: 0;
  transition: opacity 0.4s;
}

.ripple:active::after {
  opacity: 1;
  transition-duration: 0.1s;
}

.banner-meta:hover {
  opacity: 1;
}

.profile-panel {
  position: relative;
  z-index: 10;
}

.card.frosted {
  background: linear-gradient(180deg, #ffffff, #fbfcfc);
  border: 1px solid rgba(14, 116, 144, 0.12);
  border-radius: 25px;
  box-shadow: 0 20px 45px rgba(14, 116, 144, 0.08);
  backdrop-filter: blur(12px);
}

.avatar-lg {
  width: 95px;
  height: 95px;
  object-fit: cover;
  border: 3px solid rgba(15, 23, 42, 0.12);
}

.role-badge {
  background: rgba(14, 116, 144, 0.15);
  color: #0f172a;
  border-radius: 999px;
  padding: 0.15rem 0.7rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.row.g-3 {
  margin-bottom: 0.5rem;
}

.stat-card {
  border-radius: 18px;
  padding: 1rem 1.2rem;
  background: #ffffff;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  border: 1px solid rgba(14, 116, 144, 0.15);
}

.stat-card--soon {
  background: linear-gradient(135deg, #ffffff 0%, #f5fbfe 100%);
  border-color: rgba(14, 116, 144, 0.25);
}

.stat-link {
  color: inherit;
  text-decoration: none;
  display: flex;
  width: 100%;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px rgba(14, 116, 144, 0.18);
}

.stat-icon {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(14, 116, 144, 0.2);
  color: #0f172a;
  font-size: 1.4rem;
}

.stat-body {
  flex: 1;
}

.stat-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(15, 23, 42, 0.65);
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
}

.stat-note {
  font-size: 0.8rem;
  margin-top: 0.35rem;
  color: #0d9488;
  letter-spacing: 0.02em;
}

.section-card {
  border-radius: 28px;
  padding: 1.5rem;
  background: #ffffff;
  border: 1px solid rgba(14, 116, 144, 0.15);
  box-shadow: 0 20px 40px rgba(14, 116, 144, 0.08);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.section-header h6 {
  font-weight: 600;
  color: #0f172a;
}

.section-body {
  background: transparent;
  border-radius: 22px;
  padding: 1.25rem;
  border: 1px solid rgba(15, 23, 42, 0.05);
}

.field {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 0.95rem 1rem;
  border: 1px solid rgba(15, 23, 42, 0.05);
  min-height: 90px;
}

.field-label {
  font-size: 0.85rem;
  letter-spacing: 0.03em;
  color: rgba(15, 23, 42, 0.7);
  font-weight: 700;
  font-size: 1rem;
}

.field-value {
  font-size: 1rem;
  color: rgba(15, 23, 42, 0.95);
  font-weight: 400;
}

.modal-content {
  border: 1px solid rgba(14, 116, 144, 0.2);
  border-radius: 18px;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.18);
  background: #ffffff;
}

.modal-header {
  border-bottom: none;
  padding-bottom: 0;
  /* background: linear-gradient(135deg, rgba(219, 234, 254, 0.8), rgba(255, 255, 255, 0.95)); */
  border-radius: 18px 18px 0 0;
  padding: 1.25rem 1.75rem;
  box-shadow: inset 0 -1px 0 rgba(15, 23, 42, 0.06);
}

.modal-title {
  font-weight: 700;
  color: #0f172a;
}

.modal-body {
  padding-top: 1rem;
}

.modal-body form {
  gap: 1rem;
}

.modal-body .input-group-text {
  background: #f3f6fc;
  border-color: rgba(15, 23, 42, 0.1);
  color: #0f172a;
}

.modal-body .form-control {
  background: #fff;
  border-color: rgba(15, 23, 42, 0.15);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.modal-body .form-control:focus {
  border-color: #111827;
  box-shadow: 0 0 0 0.15rem rgba(17, 24, 39, 0.25);
}

.modal-footer {
  border-top: none;
  padding-top: 1rem;
}

.btn-outline-secondary {
  border-color: rgba(15, 23, 42, 0.25);
}

.btn-outline-secondary:hover {
  background-color: rgba(15, 23, 42, 0.05);
}

.modal-form-grid .form-label {
  font-weight: 600;
  color: rgba(15, 23, 42, 0.75);
}

.modal-form-grid .input-group {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.06);
}

.modal-form-grid .form-control {
  border: none;
  box-shadow: none;
  border-radius: 0;
  background: transparent;
}

.modal-form-grid .input-group-text {
  background: rgba(243, 246, 252, 0.9);
  border: none;
  color: #0f172a;
}

.modal-form-grid .form-control:focus {
  border: none;
}

.modal-actions {
  width: 100%;
}

.btn-modal-light {
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.15);
  color: #0f172a;
  padding: 0.65rem 1.25rem;
  border-radius: 999px;
  font-weight: 600;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.btn-modal-light:hover {
  background: rgba(15, 23, 42, 0.05);
  border-color: rgba(15, 23, 42, 0.25);
}

.btn-modal-primary {
  background: #111827;
  border-color: #111827;
  color: #f8fafc;
  padding: 0.65rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  box-shadow: 0 10px 25px rgba(13, 148, 136, 0.35);
}

.btn-modal-primary:hover {
  background: #1f2937;
  border-color: #1f2937;
}

.fade-pop {
  animation: pop 0.6s ease;
}

.links {
  color: rgb(119, 119, 119);
  transition: opacity .9s, margin-left .5s, margin-right .5s;
}

@keyframes pop {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .profile-surface {
    margin-bottom: 1.25rem;
  }

  .profile-banner {
    padding: 1.4rem;
  }

  .stat-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .field {
    min-height: auto;
  }
}
</style>
