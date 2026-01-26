"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_HadithComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HadithComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HadithComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      collections: [],
      selectedCollection: '',
      books: [],
      selectedBook: '',
      chapters: [],
      selectedChapter: '',
      hadiths: [],
      loading: false,
      error: null,
      searchQuery: '',
      isSearchMode: false,
      hadithRange: {
        from: null,
        to: null
      },
      currentPage: 1,
      itemsPerPage: 5,
      totalHadiths: 0
    };
  },
  computed: {
    showHadithRange() {
      return this.selectedCollection && this.books.length === 0;
    },
    filteredHadiths() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.hadiths.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.hadiths.length / this.itemsPerPage);
    },
    displayedPages() {
      const pages = [];
      const maxPages = 5;
      if (this.totalPages <= maxPages) {
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        let start = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
        let end = Math.min(this.totalPages, start + maxPages - 1);
        if (end - start + 1 < maxPages) {
          start = Math.max(1, end - maxPages + 1);
        }
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
      }
      return pages;
    }
  },
  created() {
    this.fetchCollections();
  },
  methods: {
    async fetchCollections() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('https://api.sunnah.com/v1/collections', {
          headers: {
            'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch collections');
        }
        const data = await response.json();
        this.collections = data.data.map(collection => ({
          name: collection.name,
          hasBooks: collection.hasBooks,
          books: collection.totalNumberofBooks,
          total: collection.totalNumberofHadith
        }));
      } catch (err) {
        this.error = err.message || 'An error occurred while fetching collections';
      } finally {
        this.loading = false;
      }
    },
    async fetchBooks() {
      this.resetHadithData();
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(`https://api.sunnah.com/v1/collections/${this.selectedCollection}/books`, {
          headers: {
            'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        this.books = data.data.map(book => ({
          id: book.bookNumber,
          name: book.bookName,
          hasChapters: book.numberOfChapters > 0,
          hadiths: book.numberOfHadith
        }));

        // If no books, show hadith range input
        if (this.books.length === 0) {
          this.hadithRange.from = 1;
          this.hadithRange.to = 10;
        }
      } catch (err) {
        this.error = err.message || 'An error occurred while fetching books';
      } finally {
        this.loading = false;
      }
    },
    async fetchChapters() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(`https://api.sunnah.com/v1/collections/${this.selectedCollection}/books/${this.selectedBook}/chapters`, {
          headers: {
            'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch chapters');
        }
        const data = await response.json();
        this.chapters = data.data.map(chapter => ({
          id: chapter.chapterNumber,
          title: chapter.chapterTitle
        }));
      } catch (err) {
        this.error = err.message || 'An error occurred while fetching chapters';
      } finally {
        this.loading = false;
      }
    },
    async fetchHadiths() {
      this.isSearchMode = false;
      this.loading = true;
      this.error = null;
      this.currentPage = 1;
      try {
        let url;
        if (this.selectedBook) {
          if (this.selectedChapter) {
            url = `https://api.sunnah.com/v1/collections/${this.selectedCollection}/books/${this.selectedBook}/chapters/${this.selectedChapter}/hadiths`;
          } else {
            url = `https://api.sunnah.com/v1/collections/${this.selectedCollection}/books/${this.selectedBook}/hadiths`;
          }
        } else {
          url = `https://api.sunnah.com/v1/collections/${this.selectedCollection}/hadiths/${this.hadithRange.from}-${this.hadithRange.to}`;
        }
        const response = await fetch(url, {
          headers: {
            'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch hadiths');
        }
        const data = await response.json();
        this.hadiths = data.data.map(hadith => ({
          hadithNumber: hadith.hadithNumber,
          arabic: hadith.arabic,
          english: hadith.english,
          grades: hadith.grades
        }));
        this.totalHadiths = this.hadiths.length;
      } catch (err) {
        this.error = err.message || 'An error occurred while fetching hadiths';
      } finally {
        this.loading = false;
      }
    },
    async searchHadiths() {
      if (!this.searchQuery || !this.selectedCollection) return;
      this.isSearchMode = true;
      this.loading = true;
      this.error = null;
      this.currentPage = 1;
      try {
        const response = await fetch(`https://api.sunnah.com/v1/collections/${this.selectedCollection}/search?query=${encodeURIComponent(this.searchQuery)}`, {
          headers: {
            'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to search hadiths');
        }
        const data = await response.json();
        this.hadiths = data.data.map(hadith => ({
          hadithNumber: hadith.hadithNumber,
          arabic: hadith.arabic,
          english: hadith.english,
          grades: hadith.grades
        }));
        this.totalHadiths = this.hadiths.length;
      } catch (err) {
        this.error = err.message || 'An error occurred while searching hadiths';
      } finally {
        this.loading = false;
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    resetHadithData() {
      this.books = [];
      this.selectedBook = '';
      this.chapters = [];
      this.selectedChapter = '';
      this.hadiths = [];
      this.hadithRange.from = null;
      this.hadithRange.to = null;
      this.searchQuery = '';
      this.isSearchMode = false;
      this.currentPage = 1;
    }
  },
  watch: {
    selectedBook(newVal) {
      if (newVal) {
        this.fetchChapters();
      } else {
        this.chapters = [];
        this.selectedChapter = '';
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HadithComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HadithComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_HadithComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_HadithComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/vue/HadithComponent.vue */ "./resources/components/vue/HadithComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HadithComponent.vue?vue&type=template&id=a0d305fe&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HadithComponent.vue?vue&type=template&id=a0d305fe&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container my-5"
};
const _hoisted_2 = {
  class: "row justify-content-center"
};
const _hoisted_3 = {
  class: "col-md-8"
};
const _hoisted_4 = {
  class: "card shadow"
};
const _hoisted_5 = {
  class: "card-body"
};
const _hoisted_6 = {
  class: "mb-4"
};
const _hoisted_7 = ["value"];
const _hoisted_8 = {
  key: 0,
  class: "mb-4"
};
const _hoisted_9 = ["value"];
const _hoisted_10 = {
  key: 1,
  class: "mb-4"
};
const _hoisted_11 = ["value"];
const _hoisted_12 = {
  key: 2,
  class: "mb-4"
};
const _hoisted_13 = {
  class: "row g-2"
};
const _hoisted_14 = {
  class: "col-md-6"
};
const _hoisted_15 = {
  class: "col-md-6"
};
const _hoisted_16 = ["disabled"];
const _hoisted_17 = {
  class: "mb-4"
};
const _hoisted_18 = {
  class: "input-group"
};
const _hoisted_19 = ["disabled"];
const _hoisted_20 = {
  key: 3,
  class: "text-center my-4"
};
const _hoisted_21 = {
  key: 4,
  class: "alert alert-danger"
};
const _hoisted_22 = {
  key: 5
};
const _hoisted_23 = {
  class: "mb-3"
};
const _hoisted_24 = {
  class: "list-group"
};
const _hoisted_25 = {
  class: "d-flex justify-content-between align-items-start"
};
const _hoisted_26 = {
  class: "mb-1"
};
const _hoisted_27 = {
  class: "text-muted"
};
const _hoisted_28 = {
  class: "mb-1 text-end arabic-text",
  dir: "rtl"
};
const _hoisted_29 = {
  class: "mb-1"
};
const _hoisted_30 = {
  key: 0,
  class: "text-muted"
};
const _hoisted_31 = {
  key: 0,
  "aria-label": "Hadith pagination"
};
const _hoisted_32 = {
  class: "pagination justify-content-center mt-4"
};
const _hoisted_33 = ["onClick"];
const _hoisted_34 = {
  key: 6,
  class: "text-center text-muted py-4"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header bg-primary text-white"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "text-center mb-0"
  }, "Hadith Explorer")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Collection Selection "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "collection",
    class: "form-label"
  }, "Select Hadith Collection:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "collection",
    class: "form-select",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.selectedCollection = $event),
    onChange: _cache[1] || (_cache[1] = (...args) => $options.fetchBooks && $options.fetchBooks(...args))
  }, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Choose a collection", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.collections, collection => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: collection.name,
      value: collection.name
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(collection.name) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(collection.hasBooks ? collection.books + ' books' : collection.total + ' hadiths') + ") ", 9 /* TEXT, PROPS */, _hoisted_7);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedCollection]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Book Selection (if available) "), $data.books.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_8, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "book",
    class: "form-label"
  }, "Select Book:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "book",
    class: "form-select",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.selectedBook = $event),
    onChange: _cache[3] || (_cache[3] = (...args) => $options.fetchHadiths && $options.fetchHadiths(...args))
  }, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Choose a book", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.books, book => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: book.id,
      value: book.id
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(book.name) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(book.hasChapters ? book.hadiths + ' hadiths' : '') + ") ", 9 /* TEXT, PROPS */, _hoisted_9);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedBook]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chapter Selection (if available) "), $data.chapters.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_10, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "chapter",
    class: "form-label"
  }, "Select Chapter:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "chapter",
    class: "form-select",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.selectedChapter = $event),
    onChange: _cache[5] || (_cache[5] = (...args) => $options.fetchHadiths && $options.fetchHadiths(...args))
  }, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "",
    disabled: ""
  }, "Choose a chapter", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.chapters, chapter => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: chapter.id,
      value: chapter.id
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(chapter.title), 9 /* TEXT, PROPS */, _hoisted_11);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedChapter]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Hadith Range "), $options.showHadithRange ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-label"
  }, "Hadith Range:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: "form-control",
    placeholder: "From",
    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $data.hadithRange.from = $event),
    min: "1"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.hadithRange.from]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: "form-control",
    placeholder: "To",
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $data.hadithRange.to = $event),
    min: "1"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.hadithRange.to]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-primary mt-2 w-100",
    onClick: _cache[8] || (_cache[8] = (...args) => $options.fetchHadiths && $options.fetchHadiths(...args)),
    disabled: !$data.hadithRange.from || !$data.hadithRange.to || $data.hadithRange.from > $data.hadithRange.to
  }, " Fetch Hadiths ", 8 /* PROPS */, _hoisted_16)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "search",
    class: "form-label"
  }, "Search Hadiths:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    id: "search",
    class: "form-control",
    placeholder: "Search in hadith text...",
    "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => $data.searchQuery = $event)
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchQuery]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-secondary",
    type: "button",
    onClick: _cache[10] || (_cache[10] = (...args) => $options.searchHadiths && $options.searchHadiths(...args)),
    disabled: !$data.searchQuery || !$data.selectedCollection
  }, " Search ", 8 /* PROPS */, _hoisted_19)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Loading Indicator "), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_20, [...(_cache[21] || (_cache[21] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-primary",
    role: "status"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Loading...")], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mt-2"
  }, "Loading data...", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Error Message "), $data.error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.error), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Hadith List "), $data.hadiths.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_23, "Hadith Results (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.hadiths.length) + ")", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredHadiths, hadith => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "list-group-item list-group-item-action mb-3 shadow-sm",
      key: hadith.hadithNumber
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_26, "Hadith #" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(hadith.hadithNumber), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedCollection), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(hadith.arabic), 1 /* TEXT */), _cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(hadith.english), 1 /* TEXT */), hadith.grades && hadith.grades.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_30, " Grade: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(hadith.grades[0].grade), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Pagination "), $options.totalPages > 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("nav", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["page-item", {
      disabled: $data.currentPage === 1
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "page-link",
    onClick: _cache[11] || (_cache[11] = $event => $options.changePage($data.currentPage - 1))
  }, "Previous")], 2 /* CLASS */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.displayedPages, page => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["page-item", {
        active: page === $data.currentPage
      }]),
      key: page
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "page-link",
      onClick: $event => $options.changePage(page)
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(page), 9 /* TEXT, PROPS */, _hoisted_33)], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["page-item", {
      disabled: $data.currentPage === $options.totalPages
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "page-link",
    onClick: _cache[12] || (_cache[12] = $event => $options.changePage($data.currentPage + 1))
  }, "Next")], 2 /* CLASS */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Empty State "), !$data.loading && $data.hadiths.length === 0 && $data.selectedCollection ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_34, [...(_cache[23] || (_cache[23] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "No hadiths found. Select a collection and other filters to view hadiths.", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HadithComponent.vue?vue&type=style&index=0&id=a0d305fe&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HadithComponent.vue?vue&type=style&index=0&id=a0d305fe&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/HadithComponent.vue":
/*!******************************************************!*\
  !*** ./resources/components/vue/HadithComponent.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HadithComponent_vue_vue_type_template_id_a0d305fe_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HadithComponent.vue?vue&type=template&id=a0d305fe&scoped=true */ "./resources/components/vue/HadithComponent.vue?vue&type=template&id=a0d305fe&scoped=true");
/* harmony import */ var _HadithComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HadithComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/HadithComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _HadithComponent_vue_vue_type_style_index_0_id_a0d305fe_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HadithComponent.vue?vue&type=style&index=0&id=a0d305fe&scoped=true&lang=css */ "./resources/components/vue/HadithComponent.vue?vue&type=style&index=0&id=a0d305fe&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_HadithComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_HadithComponent_vue_vue_type_template_id_a0d305fe_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-a0d305fe"],['__file',"resources/components/vue/HadithComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/HadithComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/components/vue/HadithComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HadithComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HadithComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HadithComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HadithComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/HadithComponent.vue?vue&type=style&index=0&id=a0d305fe&scoped=true&lang=css":
/*!**************************************************************************************************************!*\
  !*** ./resources/components/vue/HadithComponent.vue?vue&type=style&index=0&id=a0d305fe&scoped=true&lang=css ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HadithComponent_vue_vue_type_style_index_0_id_a0d305fe_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HadithComponent.vue?vue&type=style&index=0&id=a0d305fe&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HadithComponent.vue?vue&type=style&index=0&id=a0d305fe&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/HadithComponent.vue?vue&type=template&id=a0d305fe&scoped=true":
/*!************************************************************************************************!*\
  !*** ./resources/components/vue/HadithComponent.vue?vue&type=template&id=a0d305fe&scoped=true ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HadithComponent_vue_vue_type_template_id_a0d305fe_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HadithComponent_vue_vue_type_template_id_a0d305fe_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HadithComponent.vue?vue&type=template&id=a0d305fe&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HadithComponent.vue?vue&type=template&id=a0d305fe&scoped=true");


/***/ }),

/***/ "./resources/js/components/HadithComponent.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/HadithComponent.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HadithComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HadithComponent.vue?vue&type=script&lang=js */ "./resources/js/components/HadithComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_HadithComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/HadithComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/HadithComponent.vue?vue&type=script&lang=js":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/HadithComponent.vue?vue&type=script&lang=js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HadithComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HadithComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HadithComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HadithComponent.vue?vue&type=script&lang=js");
 

/***/ })

}]);