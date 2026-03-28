"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_panels_UsersComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
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
        password_confirmation: ""
      })
    };
  },
  computed: {
    totalUsers() {
      return this.users.length;
    },
    activeUsers() {
      return this.users.length;
    },
    adminCount() {
      return this.users.filter(u => u.user_type === 'Super Admin' || u.user_type === 'Admin').length;
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
          const fields = [user.name, user.lastname, user.email, user.user_type];
          return fields.some(value => value && value.toLowerCase().includes(searchTerm));
        });
      }
      if (this.selectedRole) {
        filtered = filtered.filter(user => user.user_type === this.selectedRole);
      }
      if (this.selectedStatus) {
        filtered = filtered.filter(user => (user.status || "").toLowerCase() === this.selectedStatus.toLowerCase());
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
      const modalInstance = window.bootstrap.Modal.getInstance(modalEl) || window.bootstrap.Modal.getOrCreateInstance(modalEl);
      modalInstance === null || modalInstance === void 0 || modalInstance.hide();
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
      ["viewUserModal", "addUserModal", "editUserModal"].forEach(id => {
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
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("api/fetch-users").then(data => {
        this.users = data.data;
        this.applyFilters();
      }).finally(() => {
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
      }).then(result => {
        if (!result.isConfirmed) {
          return;
        }
        this.loading = true;
        axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("api/create-users", this.form).then(response => {
          var _response$data;
          const apiSuccess = response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.success;
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
        }).catch(error => {
          console.error("createUser error", error);
          Swal.fire("Error", "Unable to create user.", "error");
        }).finally(() => {
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
      }).then(result => {
        if (!result.isConfirmed) {
          return;
        }
        this.loading = true;
        axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`api/update-users/${this.form.id}`, this.form).then(() => {
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
        }).catch(error => {
          console.error("updateUser error", error);
          Swal.fire("Error", "Unable to save changes.", "error");
        }).finally(() => {
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
      }).then(result => {
        if (result.isConfirmed) {
          this.deleteUser(user.id);
        }
      });
    },
    deleteUser(id) {
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete("api/delete-users/" + id).then(() => {
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
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/UsersComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/UsersComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_admin_panels_UsersComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_admin_panels_UsersComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/vue/admin_panels/UsersComponent.vue */ "./resources/components/vue/admin_panels/UsersComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=template&id=386b6e5b":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=template&id=386b6e5b ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  id: "app",
  class: "admin-page"
};
const _hoisted_2 = {
  class: "modal fade",
  id: "viewUserModal",
  tabindex: "-1",
  "aria-labelledby": "viewUserLabel",
  "aria-hidden": "true"
};
const _hoisted_3 = {
  class: "modal-dialog modal-dialog-centered modal-lg"
};
const _hoisted_4 = {
  class: "modal-content modern-modal"
};
const _hoisted_5 = {
  class: "modal-header gradient-primary"
};
const _hoisted_6 = {
  class: "d-flex align-items-center"
};
const _hoisted_7 = {
  class: "modal-title mb-1"
};
const _hoisted_8 = {
  class: "modal-subtitle mb-0"
};
const _hoisted_9 = {
  class: "modal-body"
};
const _hoisted_10 = {
  class: "details-grid"
};
const _hoisted_11 = {
  class: "detail-section"
};
const _hoisted_12 = {
  class: "detail-item"
};
const _hoisted_13 = {
  class: "detail-value"
};
const _hoisted_14 = {
  class: "detail-item"
};
const _hoisted_15 = {
  class: "detail-value"
};
const _hoisted_16 = {
  class: "detail-item"
};
const _hoisted_17 = {
  class: "detail-value"
};
const _hoisted_18 = {
  class: "detail-item"
};
const _hoisted_19 = {
  class: "detail-value"
};
const _hoisted_20 = {
  class: "detail-section"
};
const _hoisted_21 = {
  class: "detail-item"
};
const _hoisted_22 = {
  class: "user-type-badge"
};
const _hoisted_23 = {
  class: "detail-item"
};
const _hoisted_24 = {
  key: 0,
  class: "detail-item"
};
const _hoisted_25 = {
  class: "detail-value"
};
const _hoisted_26 = {
  class: "modal-footer"
};
const _hoisted_27 = {
  class: "modal fade",
  id: "addUserModal",
  tabindex: "-1",
  "aria-labelledby": "addUserLabel",
  "aria-hidden": "true"
};
const _hoisted_28 = {
  class: "modal-dialog modal-dialog-centered modal-lg"
};
const _hoisted_29 = {
  class: "modal-content modern-modal"
};
const _hoisted_30 = {
  class: "modal-body"
};
const _hoisted_31 = {
  class: "row g-4"
};
const _hoisted_32 = {
  class: "col-md-6"
};
const _hoisted_33 = {
  class: "col-md-6"
};
const _hoisted_34 = {
  class: "col-12"
};
const _hoisted_35 = {
  class: "col-md-6"
};
const _hoisted_36 = {
  class: "input-group"
};
const _hoisted_37 = {
  class: "col-md-6"
};
const _hoisted_38 = {
  class: "password-input-wrapper"
};
const _hoisted_39 = ["type"];
const _hoisted_40 = {
  class: "col-md-6"
};
const _hoisted_41 = ["type"];
const _hoisted_42 = {
  class: "col-12"
};
const _hoisted_43 = {
  class: "col-md-6"
};
const _hoisted_44 = {
  class: "col-md-6"
};
const _hoisted_45 = {
  class: "modal fade",
  id: "editUserModal",
  tabindex: "-1",
  "aria-labelledby": "editUserLabel",
  "aria-hidden": "true"
};
const _hoisted_46 = {
  class: "modal-dialog modal-dialog-centered modal-lg"
};
const _hoisted_47 = {
  class: "modal-content modern-modal"
};
const _hoisted_48 = {
  class: "modal-body"
};
const _hoisted_49 = {
  class: "row g-4"
};
const _hoisted_50 = {
  class: "col-md-6"
};
const _hoisted_51 = {
  class: "col-md-6"
};
const _hoisted_52 = {
  class: "col-12"
};
const _hoisted_53 = {
  class: "col-md-6"
};
const _hoisted_54 = {
  class: "input-group"
};
const _hoisted_55 = {
  class: "col-md-6"
};
const _hoisted_56 = {
  class: "col-md-6"
};
const _hoisted_57 = {
  class: "col-md-6"
};
const _hoisted_58 = {
  class: "main-container"
};
const _hoisted_59 = {
  class: "page-header"
};
const _hoisted_60 = {
  class: "header-right"
};
const _hoisted_61 = {
  class: "d-flex gap-2"
};
const _hoisted_62 = {
  class: "stats-cards mb-4"
};
const _hoisted_63 = {
  class: "stat-card"
};
const _hoisted_64 = {
  class: "stat-info"
};
const _hoisted_65 = {
  class: "stat-card"
};
const _hoisted_66 = {
  class: "stat-info"
};
const _hoisted_67 = {
  class: "stat-card"
};
const _hoisted_68 = {
  class: "stat-info"
};
const _hoisted_69 = {
  class: "controls-section mb-4"
};
const _hoisted_70 = {
  class: "search-wrapper"
};
const _hoisted_71 = {
  class: "filters-wrapper"
};
const _hoisted_72 = {
  class: "table-card"
};
const _hoisted_73 = {
  class: "table-wrapper"
};
const _hoisted_74 = {
  class: "users-table"
};
const _hoisted_75 = {
  "data-label": "First Name"
};
const _hoisted_76 = {
  class: "user-cell"
};
const _hoisted_77 = {
  class: "user-avatar"
};
const _hoisted_78 = {
  class: "user-name"
};
const _hoisted_79 = {
  class: "user-id"
};
const _hoisted_80 = {
  class: "user-lastname",
  "data-label": "Last Name"
};
const _hoisted_81 = {
  "data-label": "Email"
};
const _hoisted_82 = {
  class: "email-cell"
};
const _hoisted_83 = {
  "data-label": "Role"
};
const _hoisted_84 = {
  "data-label": "Status"
};
const _hoisted_85 = {
  "data-label": "Last Login"
};
const _hoisted_86 = {
  class: "last-login"
};
const _hoisted_87 = {
  "data-label": "Actions",
  class: "td-actions"
};
const _hoisted_88 = {
  class: "action-buttons"
};
const _hoisted_89 = ["onClick"];
const _hoisted_90 = ["onClick"];
const _hoisted_91 = ["onClick"];
const _hoisted_92 = {
  key: 0
};
const _hoisted_93 = {
  class: "table-footer"
};
const _hoisted_94 = {
  class: "footer-info"
};
const _hoisted_95 = {
  class: "footer-actions"
};
const _hoisted_96 = {
  class: "rows-per-page"
};
const _hoisted_97 = ["value"];
const _hoisted_98 = {
  class: "pagination-controls"
};
const _hoisted_99 = ["disabled"];
const _hoisted_100 = ["disabled"];
const _hoisted_101 = {
  class: "pagination-label"
};
const _hoisted_102 = ["disabled"];
const _hoisted_103 = ["disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" View User Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-user-avatar"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-person-circle"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.name) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.lastname), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.email), 1 /* TEXT */)])]), _cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close btn-close-white",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "section-title"
  }, "Basic Information", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "User ID:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_13, "#" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.id || 'N/A'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "Full Name:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.name) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.lastname), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "Email:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.email), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "Phone:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.phone || 'Not provided'), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "section-title"
  }, "Account Details", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "User Type:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.user_type || 'Not assigned'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "Account Status:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['status-badge', $options.statusClass($data.form.status)])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.status ? $options.capitalizeStatus($data.form.status) : "Active"), 3 /* TEXT, CLASS */)]), _cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "detail-item"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "Last Login:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-value"
  }, "2 hours ago")], -1 /* CACHED */)), $data.form.role ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_24, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "detail-label"
  }, "System Role:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.capitalizeRole($data.form.role)), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [_cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-secondary",
    "data-bs-dismiss": "modal"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg me-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Close ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-warning",
    "data-bs-dismiss": "modal",
    "data-bs-toggle": "modal",
    "data-bs-target": "#editUserModal",
    onClick: _cache[0] || (_cache[0] = $event => $options.editModal($data.form))
  }, [...(_cache[46] || (_cache[46] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-pencil me-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Edit User ", -1 /* CACHED */)]))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Add User Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [_cache[66] || (_cache[66] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"modal-header gradient-success\"><div class=\"d-flex align-items-center\"><div class=\"modal-icon-wrapper\"><i class=\"bi bi-person-plus-fill\"></i></div><div><h5 class=\"modal-title mb-0\">Add New User</h5><p class=\"modal-subtitle mb-0\">Create a new user account</p></div></div><button type=\"button\" class=\"btn-close btn-close-white\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onReset: _cache[11] || (_cache[11] = (...args) => $options.resetForm && $options.resetForm(...args)),
    onSubmit: _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.createUser(), ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [_cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("First Name "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.form.name = $event),
    type: "text",
    class: "form-control",
    placeholder: "Enter first name",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.name]]), _cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "form-text"
  }, "User's legal first name", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [_cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Last Name "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.form.lastname = $event),
    type: "text",
    class: "form-control",
    placeholder: "Enter last name",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.lastname]]), _cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "form-text"
  }, "User's legal last name", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [_cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Email Address "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.form.email = $event),
    type: "email",
    class: "form-control",
    placeholder: "user@example.com",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.email]]), _cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "form-text"
  }, "Login and notification email", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [_cache[55] || (_cache[55] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Phone Number", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [_cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text"
  }, "+1", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.form.phone = $event),
    type: "tel",
    class: "form-control",
    placeholder: "(555) 123-4567"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.phone]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [_cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Password "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.form.password = $event),
    type: $data.showPassword ? 'text' : 'password',
    class: "form-control",
    placeholder: "Enter secure password",
    required: ""
  }, null, 8 /* PROPS */, _hoisted_39), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelDynamic, $data.form.password]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "password-toggle",
    onClick: _cache[6] || (_cache[6] = $event => $data.showPassword = !$data.showPassword)
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($data.showPassword ? 'bi bi-eye-slash' : 'bi bi-eye')
  }, null, 2 /* CLASS */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"form-text\">Minimum 8 characters with letters and numbers</div> ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [_cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Confirm Password "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $data.form.password_confirmation = $event),
    type: $data.showPassword ? 'text' : 'password',
    class: "form-control",
    placeholder: "Confirm password",
    required: ""
  }, null, 8 /* PROPS */, _hoisted_41), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelDynamic, $data.form.password_confirmation]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [_cache[59] || (_cache[59] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("User Role "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => $data.form.user_type = $event),
    required: ""
  }, [...(_cache[58] || (_cache[58] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<option value=\"\" disabled>Select User Type</option><option value=\"Super Admin\">Super Admin</option><option value=\"Admin\">Admin</option><option value=\"Manager\">Manager</option><option value=\"Editor\">Editor</option><option value=\"Viewer\">Viewer</option><option value=\"Volunteer\">Volunteer</option>", 7)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.user_type]]), _cache[60] || (_cache[60] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "form-text"
  }, "Defines user permissions and access levels", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [_cache[62] || (_cache[62] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Account Status "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => $data.form.status = $event),
    required: ""
  }, [...(_cache[61] || (_cache[61] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select Status", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "active"
  }, "Active", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "inactive"
  }, "Inactive", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "pending"
  }, "Pending", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.status]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [_cache[64] || (_cache[64] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("System Role "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => $data.form.role = $event),
    required: ""
  }, [...(_cache[63] || (_cache[63] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select Role", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "user"
  }, "User", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "admin"
  }, "Admin", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.role]])])]), _cache[65] || (_cache[65] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"modal-footer mt-4\"><button type=\"button\" class=\"btn btn-outline-secondary\" data-bs-dismiss=\"modal\"> Cancel </button><button type=\"reset\" class=\"btn btn-light\"><i class=\"bi bi-arrow-clockwise me-1\"></i>Reset </button><button type=\"submit\" class=\"btn btn-success\"><i class=\"bi bi-check-circle me-1\"></i>Create User </button></div>", 1))], 32 /* NEED_HYDRATION */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Edit User Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [_cache[80] || (_cache[80] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"modal-header gradient-warning\"><div class=\"d-flex align-items-center\"><div class=\"modal-icon-wrapper\"><i class=\"bi bi-pencil-square\"></i></div><div><h5 class=\"modal-title mb-0\">Edit User</h5><p class=\"modal-subtitle mb-0\">Update user information</p></div></div><button type=\"button\" class=\"btn-close btn-close-white\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.updateUser(), ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [_cache[67] || (_cache[67] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("First Name "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => $data.form.name = $event),
    type: "text",
    class: "form-control",
    placeholder: "Enter first name",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.name]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [_cache[68] || (_cache[68] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Last Name "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => $data.form.lastname = $event),
    type: "text",
    class: "form-control",
    placeholder: "Enter last name",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.lastname]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [_cache[69] || (_cache[69] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Email Address "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => $data.form.email = $event),
    type: "email",
    class: "form-control",
    placeholder: "user@example.com",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.email]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [_cache[71] || (_cache[71] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Phone Number", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [_cache[70] || (_cache[70] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text"
  }, "+1", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => $data.form.phone = $event),
    type: "tel",
    class: "form-control",
    placeholder: "(555) 123-4567"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.phone]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [_cache[73] || (_cache[73] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("User Role "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[17] || (_cache[17] = $event => $data.form.user_type = $event),
    required: ""
  }, [...(_cache[72] || (_cache[72] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<option value=\"\" disabled>Select User Type</option><option value=\"Super Admin\">Super Admin</option><option value=\"Admin\">Admin</option><option value=\"Manager\">Manager</option><option value=\"Editor\">Editor</option><option value=\"Viewer\">Viewer</option><option value=\"Volunteer\">Volunteer</option>", 7)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.user_type]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [_cache[75] || (_cache[75] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Account Status "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => $data.form.status = $event),
    required: ""
  }, [...(_cache[74] || (_cache[74] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select Status", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "active"
  }, "Active", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "inactive"
  }, "Inactive", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "pending"
  }, "Pending", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.status]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [_cache[77] || (_cache[77] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("System Role "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "required"
  }, "*")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select",
    "onUpdate:modelValue": _cache[19] || (_cache[19] = $event => $data.form.role = $event),
    required: ""
  }, [...(_cache[76] || (_cache[76] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Select Role", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "user"
  }, "User", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "admin"
  }, "Admin", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.role]])]), _cache[78] || (_cache[78] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-12"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "form-check"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "form-check-input",
    type: "checkbox",
    id: "sendNotification"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-check-label",
    for: "sendNotification"
  }, " Send email notification about these changes ")])], -1 /* CACHED */))]), _cache[79] || (_cache[79] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer mt-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-outline-secondary",
    "data-bs-dismiss": "modal"
  }, " Cancel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-warning"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-save me-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Save Changes ")])], -1 /* CACHED */))], 32 /* NEED_HYDRATION */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [_cache[83] || (_cache[83] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "header-left"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "header-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-people-fill"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "header-text"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", null, "User Management"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Manage and organize your users")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_60, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [_cache[82] || (_cache[82] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-primary btn-export"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-download me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Export ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "data-bs-toggle": "modal",
    "data-bs-target": "#addUserModal",
    class: "btn btn-success btn-add",
    onClick: _cache[21] || (_cache[21] = $event => $options.InitializeForm())
  }, [...(_cache[81] || (_cache[81] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-circle me-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Add New User ", -1 /* CACHED */)]))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Stats Cards "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [_cache[85] || (_cache[85] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon total-users"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-people"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_64, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.totalUsers), 1 /* TEXT */), _cache[84] || (_cache[84] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Total Users", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_65, [_cache[87] || (_cache[87] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon active-users"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-person-check"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.activeUsers), 1 /* TEXT */), _cache[86] || (_cache[86] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Active", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, [_cache[89] || (_cache[89] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon admins"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-shield-check"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.adminCount), 1 /* TEXT */), _cache[88] || (_cache[88] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Admins", -1 /* CACHED */))])]), _cache[90] || (_cache[90] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-icon new-users"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-person-plus"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "stat-info"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "5"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "New This Week")])], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search and Filters Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_69, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, [_cache[91] || (_cache[91] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search search-icon"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    class: "search-input",
    "onUpdate:modelValue": _cache[22] || (_cache[22] = $event => $data.searchValue = $event),
    "aria-label": "Search users",
    placeholder: "Search by name, email, or user type...",
    onInput: _cache[23] || (_cache[23] = (...args) => $options.onGlobalFilter && $options.onGlobalFilter(...args))
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchValue]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select filter-select",
    "onUpdate:modelValue": _cache[24] || (_cache[24] = $event => $data.selectedRole = $event),
    onChange: _cache[25] || (_cache[25] = (...args) => $options.filterByRole && $options.filterByRole(...args))
  }, [...(_cache[92] || (_cache[92] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<option value=\"\">All Roles</option><option value=\"Super Admin\">Super Admin</option><option value=\"Admin\">Admin</option><option value=\"Manager\">Manager</option><option value=\"Editor\">Editor</option><option value=\"Viewer\">Viewer</option><option value=\"Volunteer\">Volunteer</option>", 7)]))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedRole]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select filter-select",
    "onUpdate:modelValue": _cache[26] || (_cache[26] = $event => $data.selectedStatus = $event),
    onChange: _cache[27] || (_cache[27] = (...args) => $options.filterByStatus && $options.filterByStatus(...args))
  }, [...(_cache[93] || (_cache[93] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: ""
  }, "All Status", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "active"
  }, "Active", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "inactive"
  }, "Inactive", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "pending"
  }, "Pending", -1 /* CACHED */)]))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedStatus]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-secondary",
    onClick: _cache[28] || (_cache[28] = (...args) => $options.clearFilters && $options.clearFilters(...args))
  }, [...(_cache[94] || (_cache[94] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-filter-circle me-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Clear Filters ", -1 /* CACHED */)]))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Table Card "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_74, [_cache[100] || (_cache[100] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "First Name"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Last Name"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Email"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Role"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Status"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", null, "Last Login"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    class: "text-center"
  }, "Actions")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.paginatedUsers, user => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
      key: user.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_75, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_77, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.name ? user.name.charAt(0).toUpperCase() : "#"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_78, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.name || "Unknown"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_79, "#" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.id || "—"), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_80, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.lastname || "—"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_81, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_82, [_cache[95] || (_cache[95] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-envelope me-2"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.email || "—"), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_83, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($options.getRoleClass(user.user_type))
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.user_type || "Member"), 3 /* TEXT, CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_84, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['status-badge', $options.statusClass(user.status)])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : "Active"), 3 /* TEXT, CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_85, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_86, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.last_login || "2 hours ago"), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_87, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_88, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      "data-bs-toggle": "modal",
      "data-bs-target": "#viewUserModal",
      class: "action-btn view-btn",
      onClick: $event => $options.viewModal(user),
      title: "View Details"
    }, [...(_cache[96] || (_cache[96] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-eye"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_89), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      "data-bs-toggle": "modal",
      "data-bs-target": "#editUserModal",
      class: "action-btn edit-btn",
      onClick: $event => $options.editModal(user),
      title: "Edit User"
    }, [...(_cache[97] || (_cache[97] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-pencil"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_90), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "action-btn delete-btn",
      onClick: $event => $options.confirmDelete(user),
      title: "Delete User"
    }, [...(_cache[98] || (_cache[98] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-trash"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_91)])])]);
  }), 128 /* KEYED_FRAGMENT */)), !$options.paginatedUsers.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", _hoisted_92, [...(_cache[99] || (_cache[99] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", {
    colspan: "7"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "empty-state no-results"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-people"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "No users found"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Try adjusting your search or filters to find what you're looking for."), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-primary",
    "data-bs-toggle": "modal",
    "data-bs-target": "#addUserModal"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-circle me-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Add First User ")])])], -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_93, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_94, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.paginationLabel), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_95, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_96, [_cache[101] || (_cache[101] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "rowsPerPageSelect"
  }, "Rows per page", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "rowsPerPageSelect",
    "onUpdate:modelValue": _cache[29] || (_cache[29] = $event => $data.rowsPerPage = $event)
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.rowsPerPageOptions, option => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: option,
      value: option
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option), 9 /* TEXT, PROPS */, _hoisted_97);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.rowsPerPage, void 0, {
    number: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_98, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "pagination-btn",
    disabled: $data.currentPage === 1,
    onClick: _cache[30] || (_cache[30] = $event => $options.goToPage(1))
  }, "«", 8 /* PROPS */, _hoisted_99), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "pagination-btn",
    disabled: $data.currentPage === 1,
    onClick: _cache[31] || (_cache[31] = $event => $options.goToPage($data.currentPage - 1))
  }, "‹", 8 /* PROPS */, _hoisted_100), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_101, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.currentPage) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.totalPages), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "pagination-btn",
    disabled: $data.currentPage === $options.totalPages,
    onClick: _cache[32] || (_cache[32] = $event => $options.goToPage($data.currentPage + 1))
  }, "›", 8 /* PROPS */, _hoisted_102), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "pagination-btn",
    disabled: $data.currentPage === $options.totalPages,
    onClick: _cache[33] || (_cache[33] = $event => $options.goToPage($options.totalPages))
  }, "»", 8 /* PROPS */, _hoisted_103)]), _cache[102] || (_cache[102] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-sm btn-outline-secondary"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-download me-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Export Data ")], -1 /* CACHED */))])])])])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=style&index=0&id=386b6e5b&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=style&index=0&id=386b6e5b&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/admin_panels/UsersComponent.vue":
/*!******************************************************************!*\
  !*** ./resources/components/vue/admin_panels/UsersComponent.vue ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UsersComponent_vue_vue_type_template_id_386b6e5b__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsersComponent.vue?vue&type=template&id=386b6e5b */ "./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=template&id=386b6e5b");
/* harmony import */ var _UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UsersComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _UsersComponent_vue_vue_type_style_index_0_id_386b6e5b_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UsersComponent.vue?vue&type=style&index=0&id=386b6e5b&lang=css */ "./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=style&index=0&id=386b6e5b&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_UsersComponent_vue_vue_type_template_id_386b6e5b__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/admin_panels/UsersComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UsersComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=style&index=0&id=386b6e5b&lang=css":
/*!**************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=style&index=0&id=386b6e5b&lang=css ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsersComponent_vue_vue_type_style_index_0_id_386b6e5b_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UsersComponent.vue?vue&type=style&index=0&id=386b6e5b&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=style&index=0&id=386b6e5b&lang=css");


/***/ }),

/***/ "./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=template&id=386b6e5b":
/*!************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=template&id=386b6e5b ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsersComponent_vue_vue_type_template_id_386b6e5b__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsersComponent_vue_vue_type_template_id_386b6e5b__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UsersComponent.vue?vue&type=template&id=386b6e5b */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/UsersComponent.vue?vue&type=template&id=386b6e5b");


/***/ }),

/***/ "./resources/js/components/admin_panels/UsersComponent.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/components/admin_panels/UsersComponent.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsersComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/UsersComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/admin_panels/UsersComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/UsersComponent.vue?vue&type=script&lang=js":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/UsersComponent.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UsersComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UsersComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/UsersComponent.vue?vue&type=script&lang=js");
 

/***/ })

}]);