<template>
  <div id="app" class="admin-page">
  
    <!-- View User Modal -->
    <div class="modal fade" id="viewUserModal" tabindex="-1" aria-labelledby="viewUserLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content modern-modal">
          <div class="modal-header gradient-primary">
            <div class="d-flex align-items-center">
              <div class="modal-user-avatar">
                <i class="bi bi-person-circle"></i>
              </div>
              <div>
                <h5 class="modal-title mb-1">{{ form.name }} {{ form.lastname }}</h5>
                <p class="modal-subtitle mb-0">{{ form.email }}</p>
              </div>
            </div>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="details-grid">
              <div class="detail-section">
                <h6 class="section-title">Basic Information</h6>
                <div class="detail-item">
                  <span class="detail-label">User ID:</span>
                  <span class="detail-value">#{{ form.id || 'N/A' }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Full Name:</span>
                  <span class="detail-value">{{ form.name }} {{ form.lastname }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Email:</span>
                  <span class="detail-value">{{ form.email }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Phone:</span>
                  <span class="detail-value">{{ form.phone || 'Not provided' }}</span>
                </div>
              </div>
              
              <div class="detail-section">
                <h6 class="section-title">Account Details</h6>
                <div class="detail-item">
                  <span class="detail-label">User Type:</span>
                  <span class="user-type-badge">{{ form.user_type || 'Not assigned' }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Account Status:</span>
                  <span :class="['status-badge', statusClass(form.status)]">
                    {{ form.status ? capitalizeStatus(form.status) : "Active" }}
                  </span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Last Login:</span>
                  <span class="detail-value">2 hours ago</span>
                </div>
                <div class="detail-item" v-if="form.role">
                  <span class="detail-label">System Role:</span>
                  <span class="detail-value">{{ capitalizeRole(form.role) }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              <i class="bi bi-x-lg me-1"></i>Close
            </button>
            <button type="button" class="btn btn-warning" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#editUserModal" @click="editModal(form)">
              <i class="bi bi-pencil me-1"></i>Edit User
            </button>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Add User Modal -->
    <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content modern-modal">
          <div class="modal-header gradient-success">
            <div class="d-flex align-items-center">
              <div class="modal-icon-wrapper">
                <i class="bi bi-person-plus-fill"></i>
              </div>
              <div>
                <h5 class="modal-title mb-0">Add New User</h5>
                <p class="modal-subtitle mb-0">Create a new user account</p>
              </div>
            </div>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @reset="resetForm" @submit.prevent="createUser()">
              <div class="row g-4">
                <div class="col-md-6">
                  <label class="form-label">First Name <span class="required">*</span></label>
                  <input v-model="form.name" type="text" class="form-control" placeholder="Enter first name" required />
                  <div class="form-text">User's legal first name</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Last Name <span class="required">*</span></label>
                  <input v-model="form.lastname" type="text" class="form-control" placeholder="Enter last name" required />
                  <div class="form-text">User's legal last name</div>
                </div>
                <div class="col-12">
                  <label class="form-label">Email Address <span class="required">*</span></label>
                  <input v-model="form.email" type="email" class="form-control" placeholder="user@example.com" required />
                  <div class="form-text">Login and notification email</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Phone Number</label>
                  <div class="input-group">
                    <span class="input-group-text">+1</span>
                    <input v-model="form.phone" type="tel" class="form-control" placeholder="(555) 123-4567" />
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Password <span class="required">*</span></label>
                  <div class="password-input-wrapper">
                    <input v-model="form.password" :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Enter secure password" required />
                    <button type="button" class="password-toggle" @click="showPassword = !showPassword">
                      <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                    </button>
                  </div>
                  <!-- <div class="form-text">Minimum 8 characters with letters and numbers</div> -->
                </div>
                <div class="col-md-6">
                  <label class="form-label">Confirm Password <span class="required">*</span></label>
                  <input v-model="form.password_confirmation" :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Confirm password" required />
                </div>
                <div class="col-12">
                  <label class="form-label">User Role <span class="required">*</span></label>
                  <select class="form-select" v-model="form.user_type" required>
                    <option value="" disabled>Select User Type</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                    <option value="Volunteer">Volunteer</option>
                  </select>
                  <div class="form-text">Defines user permissions and access levels</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Account Status <span class="required">*</span></label>
                  <select class="form-select" v-model="form.status" required>
                    <option value="" disabled>Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">System Role <span class="required">*</span></label>
                  <select class="form-select" v-model="form.role" required>
                    <option value="" disabled>Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div class="modal-footer mt-4">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="reset" class="btn btn-light">
                  <i class="bi bi-arrow-clockwise me-1"></i>Reset
                </button>
                <button type="submit" class="btn btn-success">
                  <i class="bi bi-check-circle me-1"></i>Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Edit User Modal -->
    <div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content modern-modal">
          <div class="modal-header gradient-warning">
            <div class="d-flex align-items-center">
              <div class="modal-icon-wrapper">
                <i class="bi bi-pencil-square"></i>
              </div>
              <div>
                <h5 class="modal-title mb-0">Edit User</h5>
                <p class="modal-subtitle mb-0">Update user information</p>
              </div>
            </div>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateUser()">
              <div class="row g-4">
                <div class="col-md-6">
                  <label class="form-label">First Name <span class="required">*</span></label>
                  <input v-model="form.name" type="text" class="form-control" placeholder="Enter first name" required />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Last Name <span class="required">*</span></label>
                  <input v-model="form.lastname" type="text" class="form-control" placeholder="Enter last name" required />
                </div>
                <div class="col-12">
                  <label class="form-label">Email Address <span class="required">*</span></label>
                  <input v-model="form.email" type="email" class="form-control" placeholder="user@example.com" required />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Phone Number</label>
                  <div class="input-group">
                    <span class="input-group-text">+1</span>
                    <input v-model="form.phone" type="tel" class="form-control" placeholder="(555) 123-4567" />
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">User Role <span class="required">*</span></label>
                  <select class="form-select" v-model="form.user_type" required>
                    <option value="" disabled>Select User Type</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                    <option value="Volunteer">Volunteer</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Account Status <span class="required">*</span></label>
                  <select class="form-select" v-model="form.status" required>
                    <option value="" disabled>Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">System Role <span class="required">*</span></label>
                  <select class="form-select" v-model="form.role" required>
                    <option value="" disabled>Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div class="col-12">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="sendNotification">
                    <label class="form-check-label" for="sendNotification">
                      Send email notification about these changes
                    </label>
                  </div>
                </div>
              </div>
              <div class="modal-footer mt-4">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" class="btn btn-warning">
                  <i class="bi bi-save me-1"></i>Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Main Content -->
    <div class="main-container">
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="bi bi-people-fill"></i>
          </div>
          <div class="header-text">
            <h1>User Management</h1>
            <p>Manage and organize your users</p>
          </div>
        </div>
        <div class="header-right">
          <div class="d-flex gap-2">
            <button class="btn btn-outline-primary btn-export">
              <i class="bi bi-download me-2"></i>Export
            </button>
            <button 
              data-bs-toggle="modal" 
              data-bs-target="#addUserModal" 
              class="btn btn-success btn-add"
              @click="InitializeForm()">
              <i class="bi bi-plus-circle me-2"></i>Add New User
            </button>
          </div>
        </div>
      </div>
  
      <!-- Stats Cards -->
      <div class="stats-cards mb-4">
        <div class="stat-card">
          <div class="stat-icon total-users">
            <i class="bi bi-people"></i>
          </div>
          <div class="stat-info">
            <h3>{{ totalUsers }}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon active-users">
            <i class="bi bi-person-check"></i>
          </div>
          <div class="stat-info">
            <h3>{{ activeUsers }}</h3>
            <p>Active</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon admins">
            <i class="bi bi-shield-check"></i>
          </div>
          <div class="stat-info">
            <h3>{{ adminCount }}</h3>
            <p>Admins</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon new-users">
            <i class="bi bi-person-plus"></i>
          </div>
          <div class="stat-info">
            <h3>5</h3>
            <p>New This Week</p>
          </div>
        </div>
      </div>
  
      <!-- Search and Filters Section -->
      <div class="controls-section mb-4">
        <div class="search-wrapper">
          <i class="bi bi-search search-icon"></i>
          <input
            type="text"
            class="search-input"
            v-model="searchValue"
            aria-label="Search users"
            placeholder="Search by name, email, or user type..."
            @input="onGlobalFilter"
          />
        </div>
        
        <div class="filters-wrapper">
          <select class="form-select filter-select" v-model="selectedRole" @change="filterByRole">
            <option value="">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
            <option value="Volunteer">Volunteer</option>
          </select>
          
          <select class="form-select filter-select" v-model="selectedStatus" @change="filterByStatus">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
          
          <button class="btn btn-outline-secondary" @click="clearFilters">
            <i class="bi bi-filter-circle me-1"></i>Clear Filters
          </button>
        </div>
      </div>
  
      <!-- Table Card -->
      <div class="table-card">
        <div class="table-wrapper">
          <table class="users-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in paginatedUsers" :key="user.id">
                <td data-label="First Name">
                  <div class="user-cell">
                    <div class="user-avatar">
                      {{ user.name ? user.name.charAt(0).toUpperCase() : "#" }}
                    </div>
                    <div>
                      <div class="user-name">{{ user.name || "Unknown" }}</div>
                      <div class="user-id">#{{ user.id || "—" }}</div>
                    </div>
                  </div>
                </td>
                <td class="user-lastname" data-label="Last Name">{{ user.lastname || "—" }}</td>
                <td data-label="Email">
                  <div class="email-cell">
                    <i class="bi bi-envelope me-2"></i>
                    {{ user.email || "—" }}
                  </div>
                </td>
                <td data-label="Role">
                  <span :class="getRoleClass(user.user_type)">{{ user.user_type || "Member" }}</span>
                </td>
                <td data-label="Status">
                  <span :class="['status-badge', statusClass(user.status)]">
                    {{ user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : "Active" }}
                  </span>
                </td>
                <td data-label="Last Login">
                  <div class="last-login">{{ user.last_login || "2 hours ago" }}</div>
                </td>
                <td data-label="Actions" class="td-actions">
                  <div class="action-buttons">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#viewUserModal"
                      class="action-btn view-btn"
                      @click="viewModal(user)"
                      title="View Details">
                      <i class="bi bi-eye"></i>
                    </button>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#editUserModal"
                      class="action-btn edit-btn"
                      @click="editModal(user)"
                      title="Edit User">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      class="action-btn delete-btn"
                      @click="confirmDelete(user)"
                      title="Delete User">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="!paginatedUsers.length">
                <td colspan="7">
                  <div class="empty-state no-results">
                    <i class="bi bi-people"></i>
                    <h4>No users found</h4>
                    <p>Try adjusting your search or filters to find what you're looking for.</p>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">
                      <i class="bi bi-plus-circle me-1"></i>Add First User
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div class="footer-info">{{ paginationLabel }}</div>
          <div class="footer-actions">
            <div class="rows-per-page">
              <label for="rowsPerPageSelect">Rows per page</label>
              <select id="rowsPerPageSelect" v-model.number="rowsPerPage">
                <option v-for="option in rowsPerPageOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
            <div class="pagination-controls">
              <button class="pagination-btn" :disabled="currentPage === 1" @click="goToPage(1)">«</button>
              <button class="pagination-btn" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">‹</button>
              <span class="pagination-label">{{ currentPage }} / {{ totalPages }}</span>
              <button class="pagination-btn" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">›</button>
              <button class="pagination-btn" :disabled="currentPage === totalPages" @click="goToPage(totalPages)">»</button>
            </div>
            <button class="btn btn-sm btn-outline-secondary">
              <i class="bi bi-download me-1"></i>Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    this.loadUsers();
    this.InitializeForm();
    this.attachBackdropCleanup();
  },
  beforeUnmount() {
    this.detachBackdropCleanup();
    this.cleanupModalBackdrops();
  },
  data() {
    return {
      loading: false,
      users: [],
      filteredUsers: [],
      searchValue: "",
      selectedRole: "",
      selectedStatus: "",
      showPassword: false,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50, 100],
    currentPage: 1,
    modalListeners: {},
    form: new Form({
      id: "",
      name: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      user_type: "",
      status: "",
      role: "",
      password_confirmation: "",
    }),
  }
  },
  computed: {
    totalUsers() {
      return this.users.length;
    },
    activeUsers() {
      return this.users.length;
    },
    adminCount() {
      return this.users.filter(u =>
        u.user_type === 'Super Admin' || u.user_type === 'Admin'
      ).length;
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      return this.filteredUsers.slice(start, end);
    },
    totalPages() {
      const total = Math.ceil(this.filteredUsers.length / this.rowsPerPage);
      return total === 0 ? 1 : total;
    },
    paginationLabel() {
      if (!this.filteredUsers.length) {
        return "Showing 0 users";
      }
      const start = (this.currentPage - 1) * this.rowsPerPage + 1;
      const end = Math.min(this.filteredUsers.length, this.currentPage * this.rowsPerPage);
      return `Showing ${start} to ${end} of ${this.filteredUsers.length} users`;
    }
  },
  watch: {
    rowsPerPage() {
      this.goToPage(1);
    },
    filteredUsers() {
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    }
  },
  methods: {
    onGlobalFilter() {
      this.applyFilters();
    },
    filterByRole() {
      this.applyFilters();
    },
    filterByStatus() {
      this.applyFilters();
    },
    applyFilters() {
      let filtered = [...this.users];

      const searchTerm = this.searchValue.trim().toLowerCase();
      if (searchTerm) {
        filtered = filtered.filter(user => {
          const fields = [
            user.name,
            user.lastname,
            user.email,
            user.user_type
          ];
          return fields.some(value =>
            value && value.toLowerCase().includes(searchTerm)
          );
        });
      }

      if (this.selectedRole) {
        filtered = filtered.filter(user =>
          user.user_type === this.selectedRole
        );
      }

      if (this.selectedStatus) {
        filtered = filtered.filter(user =>
          (user.status || "").toLowerCase() === this.selectedStatus.toLowerCase()
        );
      }

      this.filteredUsers = filtered;
      this.currentPage = 1;
    },
    clearFilters() {
      this.selectedRole = "";
      this.selectedStatus = "";
      this.searchValue = "";
      this.rowsPerPage = this.rowsPerPageOptions[0];
      this.currentPage = 1;
      this.applyFilters();
    },
    statusClass(status) {
      const normalized = (status || "active").toLowerCase();
      if (normalized === "inactive") return "inactive";
      if (normalized === "pending") return "pending";
      return "active";
    },
    capitalizeStatus(value) {
      if (!value) {
        return "";
      }
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    capitalizeRole(value) {
      if (!value) {
        return "";
      }
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    getRoleClass(role) {
      const classes = {
        'Super Admin': 'role-badge super-admin',
        'Admin': 'role-badge admin',
        'Manager': 'role-badge manager',
        'Editor': 'role-badge editor',
        'Viewer': 'role-badge viewer',
        'Volunteer': 'role-badge volunteer'
      };
      return classes[role] || 'role-badge';
    },
    goToPage(page) {
      const normalizedPage = Math.max(1, Math.min(page, this.totalPages));
      this.currentPage = normalizedPage;
    },
    InitializeForm() {
      this.form.reset();
      this.showPassword = false;
    },
    resetForm(event) {
      if (event) {
        event.preventDefault();
      }
      this.InitializeForm();
    },
    closeModal(modalId) {
      if (typeof window === "undefined" || !window.bootstrap) {
        return;
      }
      const modalEl = document.getElementById(modalId);
      if (!modalEl) {
        return;
      }
      const modalInstance =
        window.bootstrap.Modal.getInstance(modalEl) ||
        window.bootstrap.Modal.getOrCreateInstance(modalEl);
      modalInstance?.hide();
      this.cleanupModalBackdrops();
    },
    cleanupModalBackdrops() {
      if (typeof document === "undefined") return;
      document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
      document.body.classList.remove('modal-open');
      document.body.style.paddingRight = "";
    },
    attachBackdropCleanup() {
      if (typeof document === "undefined") return;
      ["viewUserModal", "addUserModal", "editUserModal"].forEach((id) => {
        const modalEl = document.getElementById(id);
        if (!modalEl) {
          return;
        }
        const handler = () => this.cleanupModalBackdrops();
        modalEl.addEventListener("hidden.bs.modal", handler);
        this.modalListeners[id] = handler;
      });
    },
    detachBackdropCleanup() {
      if (typeof document === "undefined") return;
      Object.entries(this.modalListeners).forEach(([id, handler]) => {
        const modalEl = document.getElementById(id);
        if (!modalEl) {
          return;
        }
        modalEl.removeEventListener("hidden.bs.modal", handler);
      });
      this.modalListeners = {};
    },
    loadUsers() {
      this.loading = true;
      axios
        .get("api/fetch-users")
        .then((data) => {
          this.users = data.data;
          this.applyFilters();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    createUser() {
      Swal.fire({
        title: "Create user?",
        text: "This will send a request to create the new user account.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#198754",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Create user"
      }).then((result) => {
        if (!result.isConfirmed) {
          return;
        }
        this.loading = true;
        axios
          .post("api/create-users", this.form)
          .then((response) => {
            const apiSuccess = response?.data?.success;
            if (apiSuccess === false) {
              Swal.fire("Error", "Unable to create user.", "error");
              return;
            }
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User created successfully",
              showConfirmButton: false,
              timer: 1500
            });
            this.closeModal("addUserModal");
            this.InitializeForm();
            this.loadUsers();
          })
          .catch((error) => {
            console.error("createUser error", error);
            Swal.fire("Error", "Unable to create user.", "error");
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    updateUser() {
      if (!this.form.id) {
        Swal.fire("Error", "Missing user selection to update.", "warning");
        return;
      }
      Swal.fire({
        title: "Update user?",
        text: "Please confirm the updates before submitting.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0d6efd",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Save changes"
      }).then((result) => {
        if (!result.isConfirmed) {
          return;
        }
        this.loading = true;
        axios
          .post(`api/update-users/${this.form.id}`, this.form)
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User updated successfully",
              showConfirmButton: false,
              timer: 1500
            });
            this.closeModal("editUserModal");
            this.InitializeForm();
            this.loadUsers();
          })
          .catch((error) => {
            console.error("updateUser error", error);
            Swal.fire("Error", "Unable to save changes.", "error");
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    confirmDelete(user) {
      Swal.fire({
        title: `Delete ${user.name} ${user.lastname}?`,
        text: "This action cannot be undone. The user will lose all access.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete user",
        cancelButtonText: "Cancel",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteUser(user.id);
        }
      });
    },
    deleteUser(id) {
      axios.delete("api/delete-users/" + id).then(() => {
        Swal.fire({
          icon: "success",
          title: "User Deleted",
          text: "The user has been successfully removed.",
          timer: 1500,
          showConfirmButton: false
        });
        this.loadUsers();
      }).catch(() => {
        Swal.fire("Error", "Failed to delete user.", "error");
      });
    },
    editModal(user) {
      this.form.reset();
      this.form.fill(user);
    },
    viewModal(user) {
      this.form.reset();
      this.form.fill(user);
    }
  }
}
</script>

<style>
/* Enhanced Global Styles */
.admin-page {
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}

/* Main Container */
.main-container {
  max-width: 1400px;
  margin: 0 auto;
}

/* Enhanced Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header-icon {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
  transition: transform 0.3s ease;
}

.header-icon:hover {
  transform: scale(1.05);
}

.header-text h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 800;
  color: #1a1a1a;
  letter-spacing: -0.5px;
}

.header-text p {
  margin: 8px 0 0;
  font-size: 16px;
  color: #6c757d;
  font-weight: 400;
}

.btn-add {
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(25, 135, 84, 0.3);
  border: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(25, 135, 84, 0.4);
}

.btn-export {
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

/* Stats Cards */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
}

.stat-icon.total-users {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-icon.active-users {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.stat-icon.admins {
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
}

.stat-icon.new-users {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  color: #333;
}

.stat-info h3 {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
}

.stat-info p {
  margin: 4px 0 0;
  color: #6c757d;
  font-size: 14px;
  font-weight: 500;
}

/* Controls Section */
.controls-section {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
  justify-content: space-between;
}

.search-wrapper {
  position: relative;
  min-width: 300px;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 18px;
  z-index: 2;
}

.search-input {
  width: 100%;
  padding: 14px 18px 14px 50px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1), 0 2px 8px rgba(102, 126, 234, 0.2);
}

.filters-wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.filter-select {
  min-width: 160px;
  border-radius: 10px;
  border: 2px solid #e5e7eb;
  padding: 10px 14px;
  font-size: 14px;
}

/* Enhanced Table Card */
.table-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  margin-top: 1rem;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.users-table thead th {
  padding: 1rem 1.25rem;
  text-align: left;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
  background: rgba(243, 244, 246, 0.8);
}

.users-table tbody td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
  font-size: 15px;
  color: #1f2937;
}

.users-table tbody tr:last-child td {
  border-bottom: none;
}

.users-table tbody tr {
  transition: background 0.2s ease;
}

.users-table tbody tr:hover {
  background: rgba(99, 102, 241, 0.07);
}

.empty-state.no-results {
  gap: 0.5rem;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.pagination-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  font-size: 18px;
  line-height: 0;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #4338ca;
  color: white;
  border-color: transparent;
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-label {
  min-width: 56px;
  text-align: center;
  font-weight: 600;
  color: #374151;
}

.rows-per-page {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
  color: #4b5563;
}

.rows-per-page select {
  border-radius: 8px;
  border: 1px solid #d1d5db;
  padding: 0.4rem 0.8rem;
  font-size: 14px;
  min-width: 90px;
  background: white;
  transition: border 0.2s ease, box-shadow 0.2s ease;
}

.rows-per-page select:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
}

.pagination-controls,
.rows-per-page {
  margin-right: 1rem;
}

.footer-actions {
  flex-wrap: wrap;
  gap: 0.75rem;
}

/* User Cell */
.user-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
}

.user-name {
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 2px;
}

.user-id {
  font-size: 12px;
  color: #9ca3af;
}

.email-cell {
  display: flex;
  align-items: center;
  color: #4b5563;
}

.email-cell i {
  color: #9ca3af;
}

/* Role Badges */
.role-badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
}

.role-badge.super-admin {
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
  color: white;
}

.role-badge.admin {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.role-badge.manager {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
}

.role-badge.editor {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  color: #333;
}

.role-badge.viewer {
  background: linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%);
  color: #333;
}

.role-badge.volunteer {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #333;
}

/* Status Badge */
.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.active {
  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.status-badge.inactive {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.status-badge.pending {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
  border: 1px solid rgba(245, 158, 11, 0.2);
}

/* Last Login */
.last-login {
  color: #6b7280;
  font-size: 13px;
}

/* Enhanced Action Buttons */
.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-start;
}

.action-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 2px solid;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
}

.view-btn {
  border-color: #e0e7ff;
  color: #4f46e5;
  background: #e0e7ff;
}

.view-btn:hover {
  background: #4f46e5;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.edit-btn {
  border-color: #fef3c7;
  color: #d97706;
  background: #fef3c7;
}

.edit-btn:hover {
  background: #d97706;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);
}

.delete-btn {
  border-color: #fee2e2;
  color: #dc2626;
  background: #fee2e2;
}

.delete-btn:hover {
  background: #dc2626;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

/* Enhanced Empty State */
.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  color: #6c757d;
}

.empty-state i {
  font-size: 80px;
  margin-bottom: 1.5rem;
  opacity: 0.5;
  color: #667eea;
}

.empty-state h4 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #374151;
}

.empty-state p {
  margin: 0 0 2rem;
  font-size: 16px;
  max-width: 400px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

/* Enhanced Table Footer */
.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #f8fafc;
  border-top: 1px solid #e5e7eb;
}

.footer-info {
  color: #6b7280;
  font-size: 14px;
}

.footer-info strong {
  color: #374151;
}

/* Enhanced Modal Styles */
.modal-user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #667eea;
  margin-right: 16px;
}

.modal-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 16px;
}

.modal-subtitle {
  font-size: 14px;
  opacity: 0.9;
  font-weight: 400;
}

.detail-section {
  margin-bottom: 2rem;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7280;
  margin-bottom: 1rem;
}

.details-grid {
  display: grid;
  gap: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.detail-label {
  font-weight: 600;
  color: #4b5563;
  min-width: 140px;
  font-size: 14px;
}

.detail-value {
  color: #1f2937;
  font-weight: 500;
}

/* Password Input Wrapper */
.password-input-wrapper {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
}

.password-toggle:hover {
  color: #667eea;
}

/* Responsive Design */
@media (max-width: 992px) {
  .stats-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .controls-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-wrapper {
    min-width: 100%;
  }
  
  .filters-wrapper {
    width: 100%;
    justify-content: stretch;
  }
  
  .filter-select {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .admin-page {
    padding: 1rem;
  }
  
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-left {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-icon {
    width: 64px;
    height: 64px;
    font-size: 28px;
  }
  
  .header-text h1 {
    font-size: 28px;
  }
  
  .stats-cards {
    grid-template-columns: 1fr;
  }
  
  .table-footer {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .action-buttons {
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 991.98px) {
  .header-right .d-flex {
    width: 100%;
    flex-wrap: wrap;
  }

  .header-right .btn {
    flex: 1 1 180px;
    min-height: 44px;
  }
}

@media (max-width: 767.98px) {
  .controls-section {
    gap: 0.85rem;
  }

  .filters-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    gap: 0.65rem;
  }

  .filter-select,
  .filters-wrapper .btn {
    width: 100%;
    min-height: 44px;
  }

  .users-table thead {
    display: none;
  }

  .users-table,
  .users-table tbody,
  .users-table tr,
  .users-table td {
    display: block;
    width: 100%;
  }

  .users-table tbody tr {
    border: 1px solid #e5e7eb;
    border-radius: 14px;
    box-shadow: 0 8px 18px rgba(38, 41, 46, 0.06);
    padding: 0.3rem 0.75rem;
    margin-bottom: 0.85rem;
    background: #fff;
  }

  .users-table tbody td {
    display: grid;
    grid-template-columns: minmax(95px, 35%) 1fr;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0.25rem;
    border-bottom: 1px solid #eef2f7;
  }

  .users-table tbody td::before {
    content: attr(data-label);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.7rem;
    font-weight: 700;
    color: #6b7280;
  }

  .users-table tbody td:last-child {
    border-bottom: none;
  }

  .td-actions {
    grid-template-columns: 1fr !important;
  }

  .td-actions::before {
    margin-bottom: 0.2rem;
  }

  .td-actions .action-buttons {
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .action-btn {
    width: 44px;
    height: 44px;
    border-radius: 12px;
  }

  .email-cell {
    word-break: break-word;
  }

  .table-footer {
    align-items: stretch;
    text-align: left;
    padding: 1rem;
  }

  .footer-actions {
    width: 100%;
    display: grid;
    gap: 0.75rem;
  }

  .rows-per-page,
  .pagination-controls {
    margin-right: 0;
    justify-content: space-between;
  }

  .footer-actions > .btn {
    width: 100%;
    min-height: 42px;
  }

  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }

  .detail-label {
    min-width: 0;
    font-size: 0.78rem;
  }
}

/* Loading State Animation */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.loading-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
