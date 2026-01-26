"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_panels_GroupNotesComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/GroupNotesComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/GroupNotesComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      isLoading: false,
      notes: [],
      searchTerm: "",
      selectedFilter: "all",
      selectedNote: null,
      filterOptions: [{
        value: "all",
        label: "All Notes"
      }, {
        value: "today",
        label: "Today"
      }, {
        value: "yesterday",
        label: "Yesterday"
      }, {
        value: "lastWeek",
        label: "Last Week"
      }, {
        value: "lastMonth",
        label: "Last Month"
      }],
      mobileNavLinks: [{
        text: "Bookmarks",
        href: "/bookmarks",
        style: "width:100%;font-size:18px;border-radius:10px;color:#B70D52;background:#ead1dc"
      }, {
        text: "Profile",
        href: "/profile",
        style: "width:100%;font-size:18px;border-radius:10px;color:#0263FF;background:#c2d8fb"
      }, {
        text: "Notes",
        href: "/notes",
        style: "width:100%;font-size:18px;border-radius:10px;color:#3D8F67;background:#d1f4d0"
      }]
    };
  },
  async mounted() {
    await this.fetchNotes();
    this.initializeTooltips();
  },
  computed: {
    filteredNotes() {
      const keyword = this.searchTerm.toLowerCase();
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);
      const lastMonth = new Date();
      lastMonth.setMonth(today.getMonth() - 1);
      return this.notes.filter(note => {
        const noteDate = new Date(note.created_at);
        const matchesSearch = !this.searchTerm || note.ayah_notes && note.ayah_notes.toLowerCase().includes(keyword);
        let matchesPeriod = true;
        switch (this.selectedFilter) {
          case "today":
            matchesPeriod = noteDate.toDateString() === today.toDateString();
            break;
          case "yesterday":
            matchesPeriod = noteDate.toDateString() === yesterday.toDateString();
            break;
          case "lastWeek":
            matchesPeriod = noteDate >= lastWeek;
            break;
          case "lastMonth":
            matchesPeriod = noteDate >= lastMonth;
            break;
        }
        return matchesSearch && matchesPeriod;
      });
    }
  },
  methods: {
    initializeTooltips() {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
      });
    },
    copyAyah(note) {
      if (!note || !note.ayah_notes) {
        console.error("Note or note.ayah_notes is undefined.");
        return;
      }
      const textToCopy = note.ayah_notes; // Get the text to copy
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.showToast('Note copied to clipboard!', 'success'); // Show success toast
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        this.showToast('Failed to copy text!', 'danger'); // Show error toast
      });
    },
    showToast(message, type = 'success') {
      // Create a new toast element
      const toastEl = document.createElement('div');
      toastEl.classList.add('toast', 'align-items-center', 'text-white', 'bg-' + type, 'border-0');
      toastEl.setAttribute('role', 'alert');
      toastEl.setAttribute('aria-live', 'assertive');
      toastEl.setAttribute('aria-atomic', 'true');

      // Toast body
      const toastBody = document.createElement('div');
      toastBody.classList.add('d-flex', 'align-items-center');
      toastBody.innerHTML = `
      <div class="toast-body fs-5"> <!-- Increase font size with fs-5 -->
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    `;
      toastEl.appendChild(toastBody);

      // Append the toast to the container
      const toastContainer = document.getElementById('toast-container');
      toastContainer.appendChild(toastEl);

      // Initialize and show the toast
      const toast = new bootstrap.Toast(toastEl, {
        autohide: true,
        delay: 3000 // Hide after 3 seconds
      });
      toast.show();

      // Remove the toast from the DOM after it hides
      toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
      });
    },
    shareOnWhatsApp(note) {
      const message = `Note:\n${note.ayah_notes}\n\nCreated on:\n ${this.formatDate(note.created_at)}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    },
    handleFilterClick(value) {
      this.selectedFilter = value;
    },
    formatDate(dateString) {
      if (!dateString) return "N/A";
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    async fetchNotes() {
      this.isLoading = true;
      try {
        const response = await fetch(`/api/fetch-notes`);
        if (!response.ok) throw new Error(`Failed to fetch notes: ${response.statusText}`);
        const data = await response.json();
        this.notes = data;
      } catch (error) {
        console.error("Error fetching notes:", error);
        this.showToast('Failed to fetch notes!', 'danger');
      } finally {
        this.isLoading = false;
      }
    },
    truncatedHtml(html, maxLength = 400) {
      if (!html) return "";
      const div = document.createElement("div");
      div.innerHTML = html;
      const plainText = div.textContent || div.innerText || "";
      return plainText.length > maxLength ? `${plainText.substring(0, maxLength)}...` : plainText;
    },
    highlightText(text) {
      if (!this.searchTerm || !text) return text;
      const escapedKeyword = this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedKeyword})`, 'gi');
      return text.replace(regex, '<span class="highlight">$1</span>');
    },
    viewModal(note) {
      this.selectedNote = note;
    },
    textToSpeech(note, index) {
      if (!window.speechSynthesis) {
        this.showToast('Your browser does not support text-to-speech.', 'warning');
        return;
      }
      const noteText = this.$refs.noteText[index].textContent;
      const utterance = new SpeechSynthesisUtterance(noteText);
      window.speechSynthesis.speak(utterance);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/GroupNotesComponent.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/GroupNotesComponent.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_admin_panels_GroupNotesComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_admin_panels_GroupNotesComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/vue/admin_panels/GroupNotesComponent.vue */ "./resources/components/vue/admin_panels/GroupNotesComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/GroupNotesComponent.vue?vue&type=template&id=266d7b05&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/GroupNotesComponent.vue?vue&type=template&id=266d7b05&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "admin-page"
};
const _hoisted_2 = {
  class: "container text-center"
};
const _hoisted_3 = {
  class: "row"
};
const _hoisted_4 = {
  class: "col-md-5 mb-4"
};
const _hoisted_5 = ["onClick"];
const _hoisted_6 = {
  class: "col-md-7"
};
const _hoisted_7 = {
  class: "group-count"
};
const _hoisted_8 = {
  class: "count-pill"
};
const _hoisted_9 = {
  class: "container container-notes pt-4"
};
const _hoisted_10 = {
  key: 0,
  class: "text-center"
};
const _hoisted_11 = {
  key: 1,
  class: "collage"
};
const _hoisted_12 = {
  class: "card"
};
const _hoisted_13 = {
  class: "card-body"
};
const _hoisted_14 = ["innerHTML"];
const _hoisted_15 = ["innerHTML"];
const _hoisted_16 = {
  key: 0
};
const _hoisted_17 = {
  class: "text-center row"
};
const _hoisted_18 = {
  class: "col"
};
const _hoisted_19 = ["onClick"];
const _hoisted_20 = {
  class: "col"
};
const _hoisted_21 = ["onClick"];
const _hoisted_22 = {
  class: "col"
};
const _hoisted_23 = ["onClick"];
const _hoisted_24 = {
  class: "modal fade",
  id: "viewNotes",
  tabindex: "-1",
  "aria-labelledby": "viewNotesLabel",
  "aria-hidden": "true"
};
const _hoisted_25 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_26 = {
  class: "modal-content"
};
const _hoisted_27 = {
  key: 0,
  class: "modal-body"
};
const _hoisted_28 = {
  class: "mb-3"
};
const _hoisted_29 = ["innerHTML"];
const _hoisted_30 = {
  class: "mb-3"
};
const _hoisted_31 = {
  key: 0
};
const _hoisted_32 = {
  key: 1
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "lead container text-center"
  }, " This page is a space to share your personal Islamic reflections and insights with others. Together, we can inspire, learn, and grow in our faith, helping each other on our spiritual journeys through shared thoughts and reflections. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile Navigation "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"container text-center mt-3 d-md-none\">\n      <div class=\"row pb-2\">\n        <div class=\"col\" v-for=\"(link, index) in mobileNavLinks\" :key=\"index\">\n          <span class=\"badge h3\" :style=\"link.style\">\n            <a :href=\"link.href\" style=\"text-decoration:none;\">{{ link.text }}</a>\n          </span>\n        </div>\n      </div>\n    </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Filter and Search Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Filter Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.filterOptions, option => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
      key: option.value,
      onClick: $event => $options.handleFilterClick(option.value),
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["filter-chip", {
        active: $data.selectedFilter === option.value
      }])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_5);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchTerm = $event),
    placeholder: "Search notes keyword...",
    class: "form-control mb-4 group-search"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchTerm]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "count-label"
  }, "Total notes", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.filteredNotes.length), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Notes Container "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [$data.isLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_10, [...(_cache[2] || (_cache[2] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Loading notes...", -1 /* CACHED */)]))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_11, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredNotes, (note, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "collage-item",
      key: note.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Surah Name:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      innerHTML: note.surah_name
    }, null, 8 /* PROPS */, _hoisted_14), _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Note:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      innerHTML: note.ayah_notes
    }, null, 8 /* PROPS */, _hoisted_15), _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Date created:")], -1 /* CACHED */)), note.created_at ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatDate(note.created_at)), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-eye me-3 h3",
      onClick: $event => $options.viewModal(note),
      "data-bs-toggle": "modal",
      "data-bs-target": "#viewNotes"
    }, null, 8 /* PROPS */, _hoisted_19)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-share me-3 h3",
      onClick: $event => $options.shareOnWhatsApp(note),
      "data-bs-toggle": "tooltip",
      "data-bs-placement": "top",
      title: "Share"
    }, null, 8 /* PROPS */, _hoisted_21)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clipboard copy-icon h3",
      onClick: $event => $options.copyAyah(note),
      "data-bs-toggle": "tooltip",
      "data-bs-placement": "top",
      title: "Copy Ayah"
    }, null, 8 /* PROPS */, _hoisted_23)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Toast container "), _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      id: "toast-container",
      class: "toast-container position-fixed bottom-0 end-0 p-3"
    }, null, -1 /* CACHED */))])])])]);
  }), 128 /* KEYED_FRAGMENT */))]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" View Note Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title text-dark"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "View Note")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), $data.selectedNote ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Notes:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "mt-2 text-dark",
    innerHTML: $data.selectedNote.ayah_notes
  }, null, 8 /* PROPS */, _hoisted_29)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Date Created:")], -1 /* CACHED */)), $data.selectedNote.created_at ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatDate($data.selectedNote.created_at)), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_32, "N/A"))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-secondary",
    "data-bs-dismiss": "modal"
  }, "Close")], -1 /* CACHED */))])])])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/GroupNotesComponent.vue?vue&type=style&index=0&id=266d7b05&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/GroupNotesComponent.vue?vue&type=style&index=0&id=266d7b05&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/admin_panels/GroupNotesComponent.vue":
/*!***********************************************************************!*\
  !*** ./resources/components/vue/admin_panels/GroupNotesComponent.vue ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _GroupNotesComponent_vue_vue_type_template_id_266d7b05_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GroupNotesComponent.vue?vue&type=template&id=266d7b05&scoped=true */ "./resources/components/vue/admin_panels/GroupNotesComponent.vue?vue&type=template&id=266d7b05&scoped=true");
/* harmony import */ var _GroupNotesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GroupNotesComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/admin_panels/GroupNotesComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _GroupNotesComponent_vue_vue_type_style_index_0_id_266d7b05_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GroupNotesComponent.vue?vue&type=style&index=0&id=266d7b05&scoped=true&lang=css */ "./resources/components/vue/admin_panels/GroupNotesComponent.vue?vue&type=style&index=0&id=266d7b05&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_GroupNotesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_GroupNotesComponent_vue_vue_type_template_id_266d7b05_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-266d7b05"],['__file',"resources/components/vue/admin_panels/GroupNotesComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/admin_panels/GroupNotesComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/GroupNotesComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GroupNotesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GroupNotesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./GroupNotesComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/GroupNotesComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/admin_panels/GroupNotesComponent.vue?vue&type=style&index=0&id=266d7b05&scoped=true&lang=css":
/*!*******************************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/GroupNotesComponent.vue?vue&type=style&index=0&id=266d7b05&scoped=true&lang=css ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GroupNotesComponent_vue_vue_type_style_index_0_id_266d7b05_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./GroupNotesComponent.vue?vue&type=style&index=0&id=266d7b05&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/GroupNotesComponent.vue?vue&type=style&index=0&id=266d7b05&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/admin_panels/GroupNotesComponent.vue?vue&type=template&id=266d7b05&scoped=true":
/*!*****************************************************************************************************************!*\
  !*** ./resources/components/vue/admin_panels/GroupNotesComponent.vue?vue&type=template&id=266d7b05&scoped=true ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GroupNotesComponent_vue_vue_type_template_id_266d7b05_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GroupNotesComponent_vue_vue_type_template_id_266d7b05_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./GroupNotesComponent.vue?vue&type=template&id=266d7b05&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/admin_panels/GroupNotesComponent.vue?vue&type=template&id=266d7b05&scoped=true");


/***/ }),

/***/ "./resources/js/components/admin_panels/GroupNotesComponent.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/components/admin_panels/GroupNotesComponent.vue ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _GroupNotesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GroupNotesComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/GroupNotesComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_GroupNotesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/admin_panels/GroupNotesComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/GroupNotesComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/GroupNotesComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GroupNotesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_GroupNotesComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./GroupNotesComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/GroupNotesComponent.vue?vue&type=script&lang=js");
 

/***/ })

}]);