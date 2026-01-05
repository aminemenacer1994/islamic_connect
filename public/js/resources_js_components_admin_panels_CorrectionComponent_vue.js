"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_panels_CorrectionComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/CorrectionComponent.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/CorrectionComponent.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var primevue_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primevue/api */ "./node_modules/primevue/api/api.esm.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mounted() {
    this.loadCorrections();
  },
  data() {
    return {
      corrections: null,
      searchValue: '',
      filters: {
        global: {
          value: null,
          matchMode: primevue_api__WEBPACK_IMPORTED_MODULE_1__.FilterMatchMode.CONTAINS
        }
      },
      columns: [{
        field: "rating",
        header: "Rating",
        sortable: true
      }, {
        field: "added_notes",
        header: "Additional notes",
        sortable: true
      }],
      sortDesc: false,
      form: new Form({
        id: "",
        rating: "",
        added_notes: ""
      })
    };
  },
  methods: {
    onGlobalFilter(e) {
      this.filters.global.value = e.target.value;
    },
    loadCorrections() {
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/fetch-corrections").then(data => {
        this.corrections = data.data;
      });
    },
    deleteCorrection(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete correction!"
      }).then(result => {
        if (result.isConfirmed) {
          axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete("/delete-correction/" + id);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Correction deleted successfully ",
            showConfirmButton: false,
            timer: 1500
          });
          this.loadCorrections();
          self.close();
        }
      });
    },
    viewModal(corrections) {
      this.form.reset();
      $("#view").modal("show");
      this.form.fill(corrections);
    },
    //edit user modal
    editModal(corrections) {
      this.editmode = true;
      this.form.reset();
      this.form.fill(corrections);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/CorrectionComponent.vue?vue&type=template&id=42c237ba":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/CorrectionComponent.vue?vue&type=template&id=42c237ba ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  class: "modal fade",
  id: "editNewCorrection",
  tabindex: "-1",
  "aria-labelledby": "editNew",
  "aria-hidden": "true"
};
const _hoisted_3 = {
  class: "modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down"
};
const _hoisted_4 = {
  class: "modal-content"
};
const _hoisted_5 = {
  class: "modal-body"
};
const _hoisted_6 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_7 = {
  class: "mt-2 text-dark"
};
const _hoisted_8 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_9 = {
  class: "mt-2 text-dark"
};
const _hoisted_10 = {
  class: "mr-2",
  style: {
    "display": "flex"
  }
};
const _hoisted_11 = {
  class: "mt-2 text-dark"
};
const _hoisted_12 = {
  class: "table-toolbar"
};
const _hoisted_13 = {
  class: "search-wrapper"
};
const _hoisted_14 = {
  class: "row-actions"
};
const _hoisted_15 = ["onClick"];
const _hoisted_16 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Column = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Column");
  const _component_DataTable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DataTable");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" view new Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title text-dark",
    id: "addNew"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "View feedback")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "ID:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.id), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Rating:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.rating), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "mt-2 mr-2 col-sm-3"
  }, "Additional notes:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.form.added_notes), 1 /* TEXT */)]), _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger",
    "data-bs-dismiss": "modal"
  }, " Close ")], -1 /* CACHED */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DataTable, {
    ref: "dt",
    class: "pt-4 modern-datatable",
    showGridlines: "",
    stripedRows: "",
    sortable: "",
    value: $data.corrections,
    filters: $data.filters,
    "onUpdate:filters": _cache[2] || (_cache[2] = $event => $data.filters = $event),
    globalFilterFields: ($data.columns || []).map(c => c.field),
    paginator: "",
    rows: 7,
    rowsPerPageOptions: [5, 10, 20, 50],
    removableSort: "",
    width: "100%",
    tableStyle: "max-width:100%"
  }, {
    header: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "title"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-tools me-2"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Corrections")], -1 /* CACHED */)), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "spacer"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-search"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      class: "form-control form-control-sm border-0",
      type: "text",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchValue = $event),
      placeholder: "Search corrections...",
      onInput: _cache[1] || (_cache[1] = (...args) => $options.onGlobalFilter && $options.onGlobalFilter(...args))
    }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchValue]])])])]),
    footer: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" In total there are " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.corrections ? $data.corrections.length : 0) + " corrections. ", 1 /* TEXT */)]),
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.columns, col => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Column, {
        key: col.field,
        field: col.field,
        header: col.header,
        sortable: "",
        class: "text-left",
        style: {
          "align-items": "center"
        },
        width: ""
      }, null, 8 /* PROPS */, ["field", "header"]);
    }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
      exportable: true,
      style: {
        "min-width": "8rem"
      }
    }, {
      body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(slotProps => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        "data-bs-toggle": "modal",
        "data-bs-target": "#editNewCorrection",
        type: "button",
        class: "btn btn-sm btn-primary",
        onClick: $event => $options.editModal(slotProps.data)
      }, [...(_cache[11] || (_cache[11] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-eye me-1"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" View ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_15), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        type: "button",
        class: "btn btn-sm btn-outline-danger",
        onClick: $event => $options.deleteCorrection(slotProps.data.id)
      }, [...(_cache[12] || (_cache[12] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-trash me-1"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Delete ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_16)])]),
      _: 1 /* STABLE */
    })]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["value", "filters", "globalFilterFields"])]);
}

/***/ }),

/***/ "./resources/js/components/admin_panels/CorrectionComponent.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/components/admin_panels/CorrectionComponent.vue ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CorrectionComponent_vue_vue_type_template_id_42c237ba__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CorrectionComponent.vue?vue&type=template&id=42c237ba */ "./resources/js/components/admin_panels/CorrectionComponent.vue?vue&type=template&id=42c237ba");
/* harmony import */ var _CorrectionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CorrectionComponent.vue?vue&type=script&lang=js */ "./resources/js/components/admin_panels/CorrectionComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_CorrectionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_CorrectionComponent_vue_vue_type_template_id_42c237ba__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/admin_panels/CorrectionComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/admin_panels/CorrectionComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/CorrectionComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CorrectionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CorrectionComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CorrectionComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/CorrectionComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/admin_panels/CorrectionComponent.vue?vue&type=template&id=42c237ba":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/admin_panels/CorrectionComponent.vue?vue&type=template&id=42c237ba ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CorrectionComponent_vue_vue_type_template_id_42c237ba__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CorrectionComponent_vue_vue_type_template_id_42c237ba__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CorrectionComponent.vue?vue&type=template&id=42c237ba */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/admin_panels/CorrectionComponent.vue?vue&type=template&id=42c237ba");


/***/ })

}]);