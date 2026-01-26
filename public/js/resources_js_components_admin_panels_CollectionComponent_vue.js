"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_panels_CollectionComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/CollectionComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/CollectionComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      folders: [],
      bookmarks: [],
      selectedFolderId: null,
      showCreate: false,
      isCreating: false,
      newFolder: {
        name: "",
        icon: "bi bi-folder2",
        color: "primary"
      },
      iconPresets: [{
        icon: 'bi bi-folder2'
      }, {
        icon: 'bi bi-heart'
      }, {
        icon: 'bi bi-star'
      }, {
        icon: 'bi bi-bookmark'
      }, {
        icon: 'bi bi-book'
      }, {
        icon: 'bi bi-journal-text'
      }, {
        icon: 'bi bi-lightbulb'
      }, {
        icon: 'bi bi-tags'
      }, {
        icon: 'bi bi-mosque'
      }, {
        icon: 'bi bi-moon-stars'
      }, {
        icon: 'bi bi-sun'
      }, {
        icon: 'bi bi-cloud-sun'
      }, {
        icon: 'bi bi-lightning-charge'
      }, {
        icon: 'bi bi-flower1'
      }, {
        icon: 'bi bi-leaf'
      }, {
        icon: 'bi bi-tree'
      }, {
        icon: 'bi bi-water'
      }, {
        icon: 'bi bi-gem'
      }, {
        icon: 'bi bi-gift'
      }, {
        icon: 'bi bi-emoji-smile'
      }, {
        icon: 'bi bi-mortarboard'
      }, {
        icon: 'bi bi-layers'
      }, {
        icon: 'bi bi-columns-gap'
      }, {
        icon: 'bi bi-compass'
      }, {
        icon: 'bi bi-flag'
      }, {
        icon: 'bi bi-shield-check'
      }, {
        icon: 'bi bi-cup-hot'
      }, {
        icon: 'bi bi-pencil-square'
      }, {
        icon: 'bi bi-chat-dots'
      }, {
        icon: 'bi bi-person-check'
      }],
      selectedBookmark: {},
      bootstrapColors: ['primary', 'success', 'warning', 'danger', 'info', 'secondary', 'dark']
    };
  },
  mounted() {
    this.fetchFolders();
  },
  methods: {
    async fetchFolders() {
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/folders");
        this.folders = response.data.folders;
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    },
    async createFolder() {
      if (!this.newFolder.name.trim()) return;
      this.isCreating = true;
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("/folders", {
          name: this.newFolder.name,
          icon: this.newFolder.icon,
          color: this.newFolder.color
        });
        this.folders.push(response.data.folder);

        // Reset and close
        this.newFolder.name = "";
        this.newFolder.icon = "bi bi-folder2";
        this.newFolder.color = "primary";
        this.showCreate = false;
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: 'success',
          title: 'Collection Created',
          text: 'Your new collection is ready!',
          timer: 2000,
          showConfirmButton: false,
          background: '#ffffff',
          color: '#0f172a',
          iconColor: '#c89b3a',
          // Gold success icon
          customClass: {
            popup: 'premium-swal-popup',
            title: 'premium-swal-title'
          }
        });
      } catch (error) {
        var _error$response;
        console.error("Error creating folder:", error);
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: 'error',
          title: 'Failed to create collection',
          text: ((_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || 'Please try again.'
        });
      } finally {
        this.isCreating = false;
      }
    },
    async selectFolder(folderId) {
      this.selectedFolderId = folderId;
      this.fetchBookmarksByFolder(folderId);
    },
    async fetchBookmarksByFolder(folderId) {
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`/folders/${folderId}/bookmarks`);
        console.log('Fetched bookmarks response:', response); // Log for debugging
        this.bookmarks = response.data.bookmarks;
      } catch (error) {
        console.error('Error fetching bookmarks by folder:', error);
      }
    },
    async confirmDeleteFolder(folderId) {
      const result = await sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#c89b3a",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Yes, delete it!",
        iconColor: '#c89b3a'
      });
      if (result.isConfirmed) {
        this.deleteFolder(folderId);
      }
    },
    async deleteFolder(folderId) {
      try {
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/folders/${folderId}`);
        this.folders = this.folders.filter(folder => folder.id !== folderId);
        if (this.selectedFolderId === folderId) {
          this.selectedFolderId = null;
          this.bookmarks = [];
        }
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The folder has been deleted.',
          timer: 1500,
          showConfirmButton: false,
          iconColor: '#c89b3a'
        });
      } catch (error) {
        console.error("Error deleting folder:", error);
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire("Error!", "There was an issue deleting the folder.", "error");
      }
    },
    openCreateFolderModal() {
      this.showCreate = !this.showCreate;
    },
    truncatedText(text) {
      const maxLength = 70;
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    },
    viewModal(bookmark) {
      this.selectedBookmark = bookmark; // Set the selected bookmark for the modal
      const viewBookmarksModal = new bootstrap.Modal(document.getElementById("viewBookmarkModal"));
      viewBookmarksModal.show();
    },
    async deleteBookmark(id) {
      try {
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete(`/api/delete-bookmarks/${id}`);
        this.fetchBookmarksByFolder(this.selectedFolderId); // Refresh bookmarks
      } catch (error) {
        console.error("Error deleting bookmark:", error);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/CollectionComponent.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/CollectionComponent.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_admin_panels_CollectionComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_admin_panels_CollectionComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/vue/admin_panels/CollectionComponent.vue */ "./resources/components/vue/admin_panels/CollectionComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/CollectionComponent.vue?vue&type=template&id=6489d969":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/CollectionComponent.vue?vue&type=template&id=6489d969 ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  class: "row align-items-center mb-3"
};
const _hoisted_3 = {
  class: "col-md-3"
};
const _hoisted_4 = {
  key: 0,
  class: "create-panel-card mb-4 animate__animated animate__fadeIn"
};
const _hoisted_5 = {
  class: "card-body"
};
const _hoisted_6 = {
  class: "d-flex justify-content-between align-items-center mb-4"
};
const _hoisted_7 = {
  class: "row g-4"
};
const _hoisted_8 = {
  class: "col-md-4"
};
const _hoisted_9 = {
  class: "col-md-4"
};
const _hoisted_10 = {
  class: "icon-picker-grid"
};
const _hoisted_11 = ["onClick", "title"];
const _hoisted_12 = {
  class: "col-md-4"
};
const _hoisted_13 = {
  class: "color-picker-grid"
};
const _hoisted_14 = ["onClick"];
const _hoisted_15 = {
  class: "mt-4 text-end"
};
const _hoisted_16 = ["disabled"];
const _hoisted_17 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2"
};
const _hoisted_18 = {
  class: "pt-4 pb-3"
};
const _hoisted_19 = {
  class: "container collection-scroll"
};
const _hoisted_20 = ["onClick"];
const _hoisted_21 = ["onClick"];
const _hoisted_22 = {
  key: 1
};
const _hoisted_23 = {
  class: "row"
};
const _hoisted_24 = {
  class: "pb-3 mt-3 text-center admin-count"
};
const _hoisted_25 = {
  class: "count-pill"
};
const _hoisted_26 = {
  class: "collection-card"
};
const _hoisted_27 = {
  class: "card-body"
};
const _hoisted_28 = {
  class: "truncate"
};
const _hoisted_29 = {
  class: "section-value"
};
const _hoisted_30 = {
  class: "mt-2"
};
const _hoisted_31 = {
  class: "section-value"
};
const _hoisted_32 = {
  class: "collection-actions"
};
const _hoisted_33 = ["onClick"];
const _hoisted_34 = ["onClick"];
const _hoisted_35 = {
  class: "modal fade",
  id: "viewBookmarkModal",
  tabindex: "-1",
  "aria-labelledby": "viewBookmarkModalLabel",
  "aria-hidden": "true"
};
const _hoisted_36 = {
  class: "modal-dialog modal-modern modal-fullscreen-md-down"
};
const _hoisted_37 = {
  class: "modal-content"
};
const _hoisted_38 = {
  class: "modal-body"
};
const _hoisted_39 = {
  class: "collection-card"
};
const _hoisted_40 = {
  class: "card-body"
};
const _hoisted_41 = {
  class: "truncate"
};
const _hoisted_42 = {
  class: "section-value"
};
const _hoisted_43 = {
  class: "mt-2"
};
const _hoisted_44 = {
  class: "section-value"
};
const _hoisted_45 = {
  class: "mt-2"
};
const _hoisted_46 = {
  class: "section-value"
};
const _hoisted_47 = {
  class: "mt-2"
};
const _hoisted_48 = {
  class: "section-value"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <h1 class=\"pt-4 pb-3 text-center\"><strong>Collections</strong></h1> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Container visible only on mobile screens "), _cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "container text-center mt-3 d-md-none"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "collection-nav"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    class: "collection-tab",
    href: "/bookmarks"
  }, "Bookmarks"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    class: "collection-tab",
    href: "/notes"
  }, "Notes")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Create Folder Toggle "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-primary create-collection-btn w-100",
    type: "button",
    onClick: _cache[0] || (_cache[0] = $event => $data.showCreate = !$data.showCreate)
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $data.showCreate ? 'bi-dash-circle' : 'bi-plus-circle'])
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.showCreate ? 'Cancel' : 'Create New Collection'), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Inline Create Folder Card "), $data.showCreate ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "card-title mb-0"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Create new folder")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    onClick: _cache[1] || (_cache[1] = $event => $data.showCreate = false)
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Folder Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.newFolder.name = $event),
    type: "text",
    class: "form-control",
    placeholder: "Reflection Gems",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.newFolder.name]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Quick Icon", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.iconPresets, preset => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: preset.icon,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["icon-choice", {
        active: $data.newFolder.icon === preset.icon
      }]),
      onClick: $event => $data.newFolder.icon = preset.icon,
      title: preset.icon
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(preset.icon)
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_11);
  }), 128 /* KEYED_FRAGMENT */))]), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    class: "text-muted mt-2 d-block"
  }, "Select an icon to personalize this collection.", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Theme Color", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.bootstrapColors, color => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: color,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["color-choice", ['bg-' + color, {
        active: $data.newFolder.color === color
      }]]),
      onClick: $event => $data.newFolder.color = color
    }, null, 10 /* CLASS, PROPS */, _hoisted_14);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-premium-save px-4 py-2",
    onClick: _cache[3] || (_cache[3] = (...args) => $options.createFolder && $options.createFolder(...args)),
    disabled: !$data.newFolder.name || $data.isCreating
  }, [$data.isCreating ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_17)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.isCreating ? 'Creating...' : 'Create Folder'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_16)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.folders, folder => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: folder.id,
      type: "button",
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["collection-pill", {
        active: $data.selectedFolderId === folder.id
      }]),
      onClick: $event => $options.selectFolder(folder.id)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-trash",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.confirmDeleteFolder(folder.id), ["stop"])
    }, null, 8 /* PROPS */, _hoisted_21)], 10 /* CLASS, PROPS */, _hoisted_20);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Display Bookmarks "), $data.selectedFolderId ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", {
    class: "container"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_24, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "count-label"
  }, "You have", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.bookmarks.length), 1 /* TEXT */), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "count-label"
  }, "bookmarks in this collection", -1 /* CACHED */))]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.bookmarks, bookmark => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-md-4 mb-4",
      key: bookmark.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
      class: "section-label"
    }, "Surah Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.truncatedText(bookmark.surah_name)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
      class: "section-label"
    }, "Information", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.truncatedText(bookmark.ayah_verse_en)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-sm btn-outline-primary",
      type: "button",
      onClick: $event => $options.viewModal(bookmark)
    }, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-eye me-1"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" View ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_33), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-sm btn-outline-danger",
      type: "button",
      onClick: $event => $options.deleteBookmark(bookmark.id)
    }, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-trash me-1"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delete ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_34)])])])]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title",
    id: "viewBookmarkModalLabel"
  }, "Bookmark Details"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "section-label"
  }, "Surah Name", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedBookmark.surah_name), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "section-label"
  }, "Ayah Number", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedBookmark.ayah_num), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "section-label"
  }, "Arabic Verse", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedBookmark.ayah_verse_ar), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "section-label"
  }, "English Translation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedBookmark.ayah_verse_en), 1 /* TEXT */)])])])]), _cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-secondary",
    "data-bs-dismiss": "modal"
  }, "Close")], -1 /* CACHED */))])])])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/CollectionComponent.vue?vue&type=style&index=0&id=6489d969&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/CollectionComponent.vue?vue&type=style&index=0&id=6489d969&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/admin_panels/CollectionComponent.vue":
/*!***********************************************************************!*\
  !*** ./resources/components/vue/admin_panels/CollectionComponent.vue ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CollectionComponent_vue_vue_type_template_id_6489d969__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CollectionComponent.vue?vue&type=template&id=6489d969 */ "./resources/components/vue/admin_panels/CollectionComponent.vue?vue&type=template&id=6489d969");
/* harmony import */ var _CollectionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CollectionComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/admin_panels/CollectionComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _CollectionComponent_vue_vue_type_style_index_0_id_6489d969_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CollectionComponent.vue?vue&type=style&index=0&id=6489d969&lang=css */ "./resources/components/vue/admin_panels/CollectionComponent.vue?vue&type=style&index=0&id=6489d969&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_CollectionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_CollectionComponent_vue_vue_type_template_id_6489d969__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/admin_panels/CollectionComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/admin_panels/CollectionComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/CollectionComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CollectionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CollectionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CollectionComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/CollectionComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/admin_panels/CollectionComponent.vue?vue&type=style&index=0&id=6489d969&lang=css":
/*!*******************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/CollectionComponent.vue?vue&type=style&index=0&id=6489d969&lang=css ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CollectionComponent_vue_vue_type_style_index_0_id_6489d969_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CollectionComponent.vue?vue&type=style&index=0&id=6489d969&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/CollectionComponent.vue?vue&type=style&index=0&id=6489d969&lang=css");


/***/ }),

/***/ "./resources/components/vue/admin_panels/CollectionComponent.vue?vue&type=template&id=6489d969":
/*!*****************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/CollectionComponent.vue?vue&type=template&id=6489d969 ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CollectionComponent_vue_vue_type_template_id_6489d969__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CollectionComponent_vue_vue_type_template_id_6489d969__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CollectionComponent.vue?vue&type=template&id=6489d969 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/CollectionComponent.vue?vue&type=template&id=6489d969");


/***/ }),

/***/ "./resources/js/components/admin_panels/CollectionComponent.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/components/admin_panels/CollectionComponent.vue ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CollectionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CollectionComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/CollectionComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_CollectionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/admin_panels/CollectionComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/CollectionComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/CollectionComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CollectionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CollectionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CollectionComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/CollectionComponent.vue?vue&type=script&lang=js");
 

/***/ })

}]);