"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_QuranComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Intro/Title.vue?vue&type=script&defer=true&lang=js":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Intro/Title.vue?vue&type=script&defer=true&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Title'
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Intro/Welcome.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Intro/Welcome.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Welcome',
  props: {
    information: {
      type: Object,
      required: true
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TafseerActions.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TafseerActions.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _folder_manager_FolderSelectionModal_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./folder_manager/FolderSelectionModal.vue */ "./resources/components/vue/folder_manager/FolderSelectionModal.vue");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! html2canvas */ "./node_modules/html2canvas/dist/html2canvas.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(html2canvas__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.es.min.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'TafseerActions',
  props: {
    tafseer: {
      type: String,
      required: true
    },
    information: {
      type: Object,
      required: true
    },
    targetTafseerRef: {
      type: String,
      default: 'targetTafseerElement'
    }
  },
  data() {
    return {
      surat: [],
      ayat: [],
      tafseers: [],
      showAlert: false,
      // Controls the visibility of the success message
      showErrorAlert: false,
      isSubmitting: false,
      successMessage: "" // Holds the success message text
    };
  },
  computed: {
    combinedText() {
      return `Tafseer: ${this.tafseer}`;
    }
  },
  methods: {
    hideAlertAfterDelay() {
      setTimeout(() => {
        this.showAlert = false;
        this.showErrorAlert = false;
      }, 3000); // Hide alerts after 3 seconds
    },
    isFormDataIncomplete(formData1) {
      return !formData1.surah_name || !formData1.ayah_num || !formData1.ayah_verse_ar || !formData1.ayah_verse_en || !formData1.user_id;
    },
    // Debounced version of captureTafseer to limit repeated calls
    debouncedCaptureTafseer: (0,lodash__WEBPACK_IMPORTED_MODULE_0__.debounce)(function () {
      this.captureTafseer();
    }, 500) // Adjust debounce time as necessary
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TafseerSection.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TafseerSection.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _translation_AyahInfo_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./translation/AyahInfo.vue */ "./resources/components/vue/translation/AyahInfo.vue");
/* harmony import */ var _translation_MainAyah_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./translation/MainAyah.vue */ "./resources/components/vue/translation/MainAyah.vue");
/* harmony import */ var _modals_AlertModal_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modals/AlertModal.vue */ "./resources/components/vue/modals/AlertModal.vue");
/* harmony import */ var _translation_BottomAudioPlayer_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./translation/BottomAudioPlayer.vue */ "./resources/components/vue/translation/BottomAudioPlayer.vue");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! html2canvas */ "./node_modules/html2canvas/dist/html2canvas.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(html2canvas__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.es.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! papaparse */ "./node_modules/papaparse/papaparse.min.js");
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(papaparse__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var docx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! docx */ "./node_modules/docx/dist/index.mjs");
/* harmony import */ var _settings_SpeechSettings_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./settings/SpeechSettings.vue */ "./resources/components/vue/settings/SpeechSettings.vue");
/* harmony import */ var _utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../utils/subscriptionUtils.js */ "./utils/subscriptionUtils.js");











/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "TafseerSection",
  components: {
    AyahInfo: _translation_AyahInfo_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    MainAyah: _translation_MainAyah_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    AlertModal: _modals_AlertModal_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    SpeechSettings: _settings_SpeechSettings_vue__WEBPACK_IMPORTED_MODULE_9__["default"],
    BottomAudioPlayer: _translation_BottomAudioPlayer_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    expanded: {
      type: Boolean,
      default: false
    },
    information: Object,
    isFullScreen: Boolean,
    showAlertText: Boolean,
    showAlert: Boolean,
    showErrorAlert: Boolean,
    showAlertTextNote: Boolean,
    targetTafseerElement: {
      type: String,
      default: "targetTafseerElement"
    }
  },
  // props: ["information", "tafseer"], // Receive tafseer as a prop
  computed: {
    wordCount() {
      const text = this.expanded ? this.tafseer : this.tafseer;
      return text ? text.trim().split(/\s+/).length : 0; // Calculate the word count
    },
    combinedText() {
      // Get the ayah_text from information
      const ayahText = typeof this.information.ayah_text === "object" ? this.information.ayah_text.text : this.information.ayah_text;

      // Return the formatted string
      return `Tafseer: ${this.ayah_text}`;
    }
  },
  data() {
    return {
      showOptions: false,
      voices: [],
      selectedVoice: '',
      // User's selected voice
      isVisible: false,
      // Controls visibility of premium features
      renderedText: "",
      // Remove summary-related data properties
      // summary: "", // Generated summary
      // error: "", // Error message
      // loading: false, // Loading state
      API_TOKEN: "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",
      // Hugging Face API token
      BASE_URL: "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      selectedFormat: "Select a format",
      // renderedText: this.tafseer,
      fontSize: parseFloat(localStorage.getItem("ayahFontSize")) || 1,
      holdDuration: 1000,
      tapCount: 0,
      lastTap: 0,
      lastTapTime: 0,
      doubleTapThreshold: 300,
      isHolding: false,
      tapTimeout: null,
      holdTimeout: null,
      holdDuration: 1000,
      isPaused: false,
      isReading: false,
      resetDisabled: true,
      utterance: null,
      // successMessage: false,
      // words: this.tafseer.split(" "),
      // text: this.tafseer,
      selectedVoiceName: "",
      selectedVoice: null,
      successMessage: false,
      currentWordIndex: 0,
      ayahAudio: null,
      // Store the audio URL
      ayahId: 1,
      tafseer: "",
      // Store tafseer data here
      expanded: false,
      // Local state to track expand/collapse
      rate: 1,
      pitch: 1,
      surahUrl: "",
      voices: [],
      ayahId: 1,
      // Example ayah ID
      data: [],
      surat: [],
      ayat: [],
      tafseers: [],
      speechRate: 1,
      // Default rate
      speechPitch: 1,
      // Default pitch
      rates: [0.5, 1, 1.5, 2],
      // List of available speech rates
      pitches: [0.5, 1, 1.5, 2] // List of available pitch values
    };
  },
  computed: {
    wordCount() {
      const text = this.expanded ? this.tafseer : this.tafseer;
      return text ? text.trim().split(/\s+/).length : 0; // Calculate the word count
    }
    // renderedText() {
    //   // Replace this with the actual source of your text
    //   return document.querySelector('.ayah-translation').innerHTML;
    //  },
  },
  mounted() {
    window.speechSynthesis.addEventListener('voiceschanged', this.loadVoices);
    this.loadVoices(); // Attempt to load voices initially
    const {
      success,
      subscriptionType
    } = (0,_utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_10__.checkSubscriptionStatus)();
    if (success) {
      this.isVisible = true; // Show premium features
      if (subscriptionType) {
        this.showSuccessMessage = true; // Show success message
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      }
    }
    this.fetchTafseer(this.information.ayah.id);
    this.renderedText = this.tafseer;
    this.clearHighlight();
    this.stopReading();
    this.$emit("ayah-text", this.information.ayah.ayah_text);
    // Load saved settings from local storage on page load
    const savedVoiceName = localStorage.getItem("selectedVoice");
    const savedRate = localStorage.getItem("rate");
    const savedPitch = localStorage.getItem("pitch");
    const savedFontSize = localStorage.getItem("fontSize");
    if (savedVoiceName) this.selectedVoiceName = JSON.parse(savedVoiceName); // Use selectedVoiceName instead of selectedVoice
    if (savedRate) this.rate = parseFloat(savedRate);
    if (savedPitch) this.pitch = parseFloat(savedPitch);
    if (savedFontSize) {
      this.currentFontSize = parseInt(savedFontSize, 14);
    } else {
      this.currentFontSize = 14; // Default font size
    }
  },
  methods: {
    redirectToMonthlySubscription() {
      (0,_utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_10__.redirectToSubscription)('monthly');
    },
    redirectToYearlySubscription() {
      (0,_utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_10__.redirectToSubscription)('yearly');
    },
    toggleIcon(event) {
      const icon = event.target;
      icon.classList.toggle("bi-arrow-down-circle-fill");
      icon.classList.toggle("bi-arrow-up-circle-fill");
    },
    downloadAsExport() {
      // Prepare dynamic content for export
      const content = {
        Translation: this.renderedText.replace(/<\/?[^>]+(>|$)/g, ""),
        translationInfo: "Ahmed Ali",
        wordCount: this.wordCount,
        ayahInfo: {
          id: this.information.id,
          // Assuming 'information' contains 'id' data
          ayah: {
            id: this.information.ayah.id,
            // Assuming 'ayah' is an object inside 'information'
            surah_id: this.information.ayah.surah_id,
            ayah_text: this.information.ayah.ayah_text,
            ayah_id: this.information.ayah.ayah_id,
            surah: {
              id: this.information.ayah.surah.id,
              name_en: this.information.ayah.surah.name_en,
              name_ar: this.information.ayah.surah.name_ar,
              text: this.information.ayah.surah.text
            }
          }
        }
      };
      const surahNumber = this.information.ayah.surah_id;
      const ayahNumber = this.information.ayah.ayah_id;
      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];

      // Construct file name with Surah and Ayah numbers
      const fileName = `tafseer_surah_${surahNumber}_ayah_${ayahNumber}_${formattedDate}.json`;

      // Convert the content to a JSON Blob for downloading
      const blob = new Blob([JSON.stringify(content, null, 2)], {
        type: "application/json"
      });
      // Trigger the download
      this.triggerDownload(blob, fileName);
    },
    triggerDownload(blob, fileName) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
    downloadAsCsv() {
      const formatCsvValue = (value, options = {
        isLtr: false,
        isRtl: false
      }) => {
        if (value == null) return "";

        // Convert to string and escape quotes
        let formattedValue = String(value).replace(/"/g, '""') // Escape quotes
        .replace(/[\r\n]+/g, " ") // Replace newlines with spaces
        .trim();

        // Add directional markers based on content type
        if (options.isRtl) {
          // RLE (Right-to-Left Embedding) + RLM (Right-to-Left Mark) + content
          return `"\u202B\u200F${formattedValue}\u202C"`;
        }
        if (options.isLtr) {
          // LRE (Left-to-Right Embedding) + content
          return `"\u202A${formattedValue}\u202C"`;
        }
        return `"${formattedValue}"`;
      };
      try {
        var _this$information, _this$information2, _this$information3, _this$information4, _this$information5, _this$information6, _this$information7;
        // Prepare CSV rows with proper text direction
        const csvRows = [['"Title"', '"Content"'], ['"Surah name (Arabic)"', formatCsvValue((_this$information = this.information) === null || _this$information === void 0 || (_this$information = _this$information.ayah) === null || _this$information === void 0 || (_this$information = _this$information.surah) === null || _this$information === void 0 ? void 0 : _this$information.name_ar, {
          isRtl: true
        })], ['"Surah name (English)"', formatCsvValue((_this$information2 = this.information) === null || _this$information2 === void 0 || (_this$information2 = _this$information2.ayah) === null || _this$information2 === void 0 || (_this$information2 = _this$information2.surah) === null || _this$information2 === void 0 ? void 0 : _this$information2.name_en, {
          isLtr: true
        })], ['"Surah number"', formatCsvValue((_this$information3 = this.information) === null || _this$information3 === void 0 || (_this$information3 = _this$information3.ayah) === null || _this$information3 === void 0 ? void 0 : _this$information3.surah_id, {
          isLtr: true
        })], ['"Ayah number"', formatCsvValue((_this$information4 = this.information) === null || _this$information4 === void 0 || (_this$information4 = _this$information4.ayah) === null || _this$information4 === void 0 ? void 0 : _this$information4.ayah_id, {
          isLtr: true
        })], ['"Ayah"', formatCsvValue((_this$information5 = this.information) === null || _this$information5 === void 0 || (_this$information5 = _this$information5.ayah) === null || _this$information5 === void 0 ? void 0 : _this$information5.ayah_text, {
          isRtl: true
        })], ['"Tafseer"', formatCsvValue(this.tafseer, {
          isLtr: true
        })], ['"Tafseer"', formatCsvValue("Ibn Katheer", {
          isLtr: true
        })]];

        // Convert rows to CSV string with RTL marker for the whole document
        const csvContent = "\u202B" + csvRows.map(row => row.join(",")).join("\n");

        // Add BOM for UTF-8
        const bom = "\uFEFF";
        const fullContent = bom + csvContent;

        // Create blob with proper encoding
        const blob = new Blob([fullContent], {
          type: "text/csv;charset=utf-8"
        });

        // Generate filename with surah/ayah info
        const date = new Date().toISOString().split("T")[0];
        const surahNum = ((_this$information6 = this.information) === null || _this$information6 === void 0 || (_this$information6 = _this$information6.ayah) === null || _this$information6 === void 0 ? void 0 : _this$information6.surah_id) || "unknown-surah";
        const ayahNum = ((_this$information7 = this.information) === null || _this$information7 === void 0 || (_this$information7 = _this$information7.ayah) === null || _this$information7 === void 0 ? void 0 : _this$information7.ayah_id) || "unknown-ayah";
        const filename = `tafseer_csv_surah_${surahNum}_ayah_${ayahNum}_${date}.csv`;

        // Handle download for different browsers
        if (window.navigator.msSaveOrOpenBlob) {
          // For IE/Edge
          window.navigator.msSaveBlob(blob, filename);
        } else {
          // For modern browsers
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = filename;

          // Trigger download
          document.body.appendChild(link);
          link.click();

          // Cleanup
          setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }, 100);
        }
      } catch (error) {
        console.error("Failed to download CSV:", error);
        this.$emit("csv-error", error);
      }
    },
    async downloadAsWord() {
      var _this$information8, _this$information9, _this$information0, _this$information1;
      const doc = new docx__WEBPACK_IMPORTED_MODULE_8__.Document({
        sections: [{
          properties: {
            page: {
              margin: {
                top: 1440,
                // 1 inch
                right: 1440,
                bottom: 1440,
                left: 1440
              }
            }
          },
          children: [
          // Title Section
          new docx__WEBPACK_IMPORTED_MODULE_8__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_8__.TextRun({
              text: "Quran Tafseer Document",
              bold: true,
              size: 48,
              color: "1F4E79"
            })],
            alignment: "CENTER",
            spacing: {
              before: 400,
              after: 800,
              line: 360
            }
          }),
          // space
          new docx__WEBPACK_IMPORTED_MODULE_8__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_8__.TextRun({
              text: ``
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // surah Header
          new docx__WEBPACK_IMPORTED_MODULE_8__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_8__.TextRun({
              text: "Surah:",
              bold: true,
              size: 32,
              color: "2B5797",
              underline: false
            })],
            spacing: {
              before: 600,
              after: 300,
              line: 360
            }
          }),
          // Surah Info
          new docx__WEBPACK_IMPORTED_MODULE_8__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_8__.TextRun({
              text: `${(_this$information8 = this.information) === null || _this$information8 === void 0 || (_this$information8 = _this$information8.ayah) === null || _this$information8 === void 0 || (_this$information8 = _this$information8.surah) === null || _this$information8 === void 0 ? void 0 : _this$information8.name_en} (${(_this$information9 = this.information) === null || _this$information9 === void 0 || (_this$information9 = _this$information9.ayah) === null || _this$information9 === void 0 || (_this$information9 = _this$information9.surah) === null || _this$information9 === void 0 ? void 0 : _this$information9.name_ar})`,
              bold: false,
              size: 28,
              italics: false,
              color: "000000"
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // space
          new docx__WEBPACK_IMPORTED_MODULE_8__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_8__.TextRun({
              text: ``
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // Ayah Number
          new docx__WEBPACK_IMPORTED_MODULE_8__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_8__.TextRun({
              text: `Ayah Number:`,
              bold: true,
              size: 32,
              color: "2B5797",
              underline: false
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // Ayah Number
          new docx__WEBPACK_IMPORTED_MODULE_8__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_8__.TextRun({
              text: `${(_this$information0 = this.information) === null || _this$information0 === void 0 || (_this$information0 = _this$information0.ayah) === null || _this$information0 === void 0 ? void 0 : _this$information0.ayah_id}`,
              bold: false,
              size: 28,
              italics: false,
              color: "000000",
              underline: false
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // space
          new docx__WEBPACK_IMPORTED_MODULE_8__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_8__.TextRun({
              text: ``
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // Ayah Header
          new docx__WEBPACK_IMPORTED_MODULE_8__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_8__.TextRun({
              text: "Ayah:",
              bold: true,
              size: 32,
              color: "2B5797",
              underline: false
            })],
            spacing: {
              before: 600,
              after: 300,
              line: 360
            }
          }),
          // Ayah Text
          new docx__WEBPACK_IMPORTED_MODULE_8__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_8__.TextRun({
              text: (_this$information1 = this.information) === null || _this$information1 === void 0 || (_this$information1 = _this$information1.ayah) === null || _this$information1 === void 0 ? void 0 : _this$information1.ayah_text,
              size: 28,
              color: "333333",
              rightToLeft: true // Enable RTL for Arabic text
            })],
            spacing: {
              before: 300,
              after: 600,
              line: 360
            },
            indent: {
              left: 720,
              // 0.5 inch indent
              right: 720
            },
            alignment: "RIGHT" // Right align Arabic text
          }),
          // space
          new docx__WEBPACK_IMPORTED_MODULE_8__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_8__.TextRun({
              text: ``
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // Tafseer Header
          new docx__WEBPACK_IMPORTED_MODULE_8__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_8__.TextRun({
              text: "Tafseer:",
              bold: true,
              size: 32,
              color: "2B5797"
            })],
            spacing: {
              before: 600,
              after: 300,
              line: 360
            }
          }),
          // Tafseer Content
          new docx__WEBPACK_IMPORTED_MODULE_8__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_8__.TextRun({
              text: this.tafseer,
              size: 28,
              color: "000000"
            })],
            spacing: {
              before: 300,
              after: 600,
              line: 360 // 1.5 line spacing
            },
            indent: {
              left: 720,
              right: 720
            }
          }),
          // space
          new docx__WEBPACK_IMPORTED_MODULE_8__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_8__.TextRun({
              text: ``
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // Translator Header
          new docx__WEBPACK_IMPORTED_MODULE_8__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_8__.TextRun({
              text: "Tafseer:",
              bold: true,
              size: 32,
              color: "2B5797"
            })],
            spacing: {
              before: 600,
              after: 300,
              line: 360
            }
          }),
          // Translator Content
          new docx__WEBPACK_IMPORTED_MODULE_8__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_8__.TextRun({
              text: "Ibn Katheer",
              italics: false,
              size: 28,
              color: "000000"
            })],
            spacing: {
              before: 300,
              after: 600,
              line: 360
            }
          })]
        }]
      });
      try {
        var _this$information10, _this$information11;
        const blob = await docx__WEBPACK_IMPORTED_MODULE_8__.Packer.toBlob(doc);

        // Generate a clean, ISO date string
        const date = new Date().toISOString().split("T")[0]; // e.g., 2024-12-28

        // Dynamically include Surah and Ayah numbers with fallbacks
        const surahNum = ((_this$information10 = this.information) === null || _this$information10 === void 0 || (_this$information10 = _this$information10.ayah) === null || _this$information10 === void 0 || (_this$information10 = _this$information10.surah) === null || _this$information10 === void 0 ? void 0 : _this$information10.id) || "unknown_surah";
        const ayahNum = ((_this$information11 = this.information) === null || _this$information11 === void 0 || (_this$information11 = _this$information11.ayah) === null || _this$information11 === void 0 ? void 0 : _this$information11.ayah_id) || "unknown_ayah";

        // Create a clean filename
        const filename = `tafseer_doc_surah_${surahNum}_ayah_${ayahNum}_${date}.docx`;

        // Save the file
        (0,file_saver__WEBPACK_IMPORTED_MODULE_6__.saveAs)(blob, filename);
      } catch (error) {
        console.error("Failed to generate Word document:", error);
        this.$emit("word-error", error);
      }
    },
    toggleSpeechAyah() {
      this.$emit("toggle-audio", this.isReading);
    },
    saveSettings() {
      // Save settings to local storage
      localStorage.setItem("selectedVoice", JSON.stringify(this.selectedVoiceName));
      localStorage.setItem("rate", this.rate);
      localStorage.setItem("pitch", this.pitch);
      localStorage.setItem("selectedVoice", this.selectedVoice);
      // Show success message
      this.successMessage = true;
      // Close the modal after a short delay
      setTimeout(() => {
        this.successMessage = false;
        const offcanvasElement = document.getElementById("offcanvasRight"); // Change to the correct element ID
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (offcanvasInstance) {
          offcanvasInstance.hide(); // Close the offcanvas
        }
      }, 1000); // 1 second delay
    },
    closeModal() {
      const modalElement = document.getElementById("speechModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
        // Dispose of the modal to remove the grey background
        modalInstance.dispose();
      }
    },
    loadVoices() {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Filter out Google-enhanced voices
        this.voices = voices.filter(voice => !voice.name.includes("Google"));
        if (!this.selectedVoice && this.voices.length > 0) {
          this.selectedVoice = this.voices[0].name; // Set default voice if not set
        }
      }
    },
    increaseFontSize() {
      this.fontSize += 0.2; // Increase font size
      this.saveFontSize();
    },
    decreaseFontSize() {
      if (this.fontSize > 1) {
        this.fontSize -= 0.2; // Decrease font size
        this.saveFontSize();
      }
    },
    saveFontSize() {
      localStorage.setItem("ayahFontSize", this.fontSize); // Store font size in local storage
    },
    changeVoice(voiceName) {
      this.selectedVoiceName = voiceName;
      localStorage.setItem("selectedVoice", JSON.stringify(voiceName));
    },
    adjustRate(value) {
      this.rate = parseFloat(value);
    },
    adjustPitch(value) {
      this.pitch = parseFloat(value);
    },
    toggleSpeech() {
      // If audio is currently playing
      if (this.isReading) {
        if (this.isPaused) {
          window.speechSynthesis.resume(); // Resume reading if paused
          this.isPaused = false; // Set paused to false when resumed
        } else {
          window.speechSynthesis.pause(); // Pause reading
          this.isPaused = true; // Set paused to true
        }
      } else {
        this.readTextAloud(); // Start reading if not already reading
      }
      this.isReading = true; // Set reading state to true
    },
    stopReading() {
      window.speechSynthesis.cancel(); // Stop reading
      this.isReading = false;
      this.isPlaying = false; // Hide the stop icon
      this.isPaused = false; // Reset pause state
      this.clearHighlight();
    },
    rewindSpeech() {
      // Stop current speech and start again
      this.stopReading();
      this.readTextAloud(); // Restart the speech from the beginning
      console.log("Speech rewinded.");
    },
    readTextAloud() {
      const text = this.tafseer;
      if (!window.speechSynthesis) {
        console.error("Speech synthesis is not supported in this browser.");
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      this.utterance = new SpeechSynthesisUtterance(text);
      this.utterance.rate = this.speechRate; // Set speech rate
      this.utterance.pitch = this.speechPitch; // Set speech pitch

      const setVoice = () => {
        const voices = this.voices; // Use already loaded and filtered voices

        // Find the selected voice by name
        const matchingVoice = voices.find(voice => voice.name === this.selectedVoice);

        // Set the selected voice or fallback to the first available voice
        this.utterance.voice = matchingVoice || voices[0];

        // Start speaking after setting the voice
        this.isReading = true;
        window.speechSynthesis.speak(this.utterance);
      };

      // If voices are not yet loaded, wait for them
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = setVoice;
      } else {
        setVoice();
      }

      // Real-time word highlighting
      this.utterance.onboundary = event => {
        if (event.name === "word") {
          const currentWord = text.slice(event.charIndex).split(" ")[0];
          this.highlightText(event.charIndex, currentWord);
        }
      };

      // Handle end of speech
      this.utterance.onend = () => {
        this.isReading = false;
        this.clearHighlight();
      };
    },
    highlightText(charIndex, currentWord) {
      const text = this.tafseer;
      const before = text.slice(0, charIndex);
      const after = text.slice(charIndex + currentWord.length);
      this.renderedText = `
        <span>${before}</span>
        <span style="background-color: rgba(0, 191, 166, 0.6); padding: 2px; border-radius: 3px;">
          ${currentWord}
        </span>
        <span>${after}</span>`;
    },
    clearHighlight() {
      this.renderedText = `<span>${this.tafseer}</span>`;
    },
    updateRenderedText(newText) {
      this.renderedText = `<span>${newText}</span>`;
    },
    formatText(text) {
      return `<span>${text}</span>`;
    },
    //Pause reading
    pauseReading() {
      if (this.isReading && !this.isPaused) {
        window.speechSynthesis.pause(); // Pause the speech synthesis
        this.isPaused = true; // Set paused state
        console.log("Speech paused.");
      }
    },
    getWordIndex(charIndex, text) {
      // Calculate the word index based on the character index
      const beforeText = text.slice(0, charIndex);
      return beforeText.split(" ").length - 1;
    },
    async fetchTafseer(ayahId) {
      try {
        const tafseerResponse = await axios.get(`/tafseer/${ayahId}/fetch`);
        this.tafseer = tafseerResponse.data; // Assign the fetched data to the local state
      } catch (error) {
        console.error("Error fetching tafseer:", error);
      }
    },
    toggleFullScreen() {
      this.$emit("toggle-full-screen");
    },
    isVisible() {
      this.$emit("toggle-change");
    },
    handleTouchStart(event) {
      this.$emit("handle-touch-start", event);
    },
    handleTouchMove(event) {
      this.$emit("handle-touch-move", event);
    },
    handleTouchEnd(event) {
      this.$emit("handle-touch-end", event);
    },
    toggleExpand() {
      this.$emit("toggle-expand");
    },
    closeAlertText() {
      this.$emit("close-alert-text");
    }
    // Remove generateSummary method
    // async generateSummary() { ... }
  },
  watch: {
    "information.ayah.id": {
      immediate: true,
      handler(newAyahId) {
        console.log("Ayah changed:", newAyahId); // Debug
        this.fetchTafseer(newAyahId); // Fetch tafseer for new ayah
        this.stopReading(); // Stop any ongoing speech
      }
    },
    tafseer: {
      immediate: true,
      handler(newTafseer) {
        console.log("Tafseer updated:", newTafseer); // Debug
        this.updateRenderedText(newTafseer); // Update displayed tafseer
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TranslationActions.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TranslationActions.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _folder_manager_FolderSelectionModal_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./folder_manager/FolderSelectionModal.vue */ "./resources/components/vue/folder_manager/FolderSelectionModal.vue");
/* harmony import */ var _translation_features_screen_capture_ScreenTranslationCapture_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./translation/features/screen_capture/ScreenTranslationCapture.vue */ "./resources/components/vue/translation/features/screen_capture/ScreenTranslationCapture.vue");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! html2canvas */ "./node_modules/html2canvas/dist/html2canvas.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(html2canvas__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.es.min.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "TranslationActions",
  props: {
    translation: {
      type: String,
      required: true
    },
    information: {
      type: Object,
      required: true
    },
    targetTranslationRef: {
      type: String,
      default: 'targetTranslationElement'
    }
  },
  data() {
    return {
      targetTranslationRef: "targetTranslation",
      showAlert: false,
      // Controls the visibility of the success message
      showErrorAlert: false,
      isSubmitting: false,
      successMessage: "" // Holds the success message text
    };
  },
  computed: {
    combinedText() {
      return `Translation: ${this.information.translation}`;
    }
  },
  mounted() {
    const modalElement = document.getElementById('translationInfo');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement, {
        backdrop: 'static'
      });
    }
  },
  methods: {
    handleAction(action, modalId) {
      this.$emit(action, modalId);
    },
    isFormDataIncomplete(formData) {
      return !formData.surah_name || !formData.ayah_num || !formData.ayah_verse_ar || !formData.ayah_verse_en || !formData.user_id;
    },
    hideAlertAfterDelay() {
      setTimeout(() => {
        this.showAlert = false;
        this.showErrorAlert = false;
      }, 3000); // Hide alerts after 3 seconds
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TranslationSection.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TranslationSection.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _translation_AyahInfo_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./translation/AyahInfo.vue */ "./resources/components/vue/translation/AyahInfo.vue");
/* harmony import */ var _translation_MainAyah_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./translation/MainAyah.vue */ "./resources/components/vue/translation/MainAyah.vue");
/* harmony import */ var _translation_Translator_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./translation/Translator.vue */ "./resources/components/vue/translation/Translator.vue");
/* harmony import */ var _translation_BottomAudioPlayer_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./translation/BottomAudioPlayer.vue */ "./resources/components/vue/translation/BottomAudioPlayer.vue");
/* harmony import */ var _modals_AlertModal_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modals/AlertModal.vue */ "./resources/components/vue/modals/AlertModal.vue");
/* harmony import */ var _accesibility_ScreenReader_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./accesibility/ScreenReader.vue */ "./resources/components/vue/accesibility/ScreenReader.vue");
/* harmony import */ var _search_Magnifier_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./search/Magnifier.vue */ "./resources/components/vue/search/Magnifier.vue");
/* harmony import */ var _modals_OffcanvasSetting_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modals/OffcanvasSetting.vue */ "./resources/components/vue/modals/OffcanvasSetting.vue");
/* harmony import */ var _TransliterationSection_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TransliterationSection.vue */ "./resources/components/vue/TransliterationSection.vue");
/* harmony import */ var _settings_SpeechSettings_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./settings/SpeechSettings.vue */ "./resources/components/vue/settings/SpeechSettings.vue");
/* harmony import */ var _utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../utils/subscriptionUtils.js */ "./utils/subscriptionUtils.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! html2canvas */ "./node_modules/html2canvas/dist/html2canvas.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(html2canvas__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.es.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! papaparse */ "./node_modules/papaparse/papaparse.min.js");
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(papaparse__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var docx__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! docx */ "./node_modules/docx/dist/index.mjs");
















/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "TranslationSection",
  components: {
    SpeechSettings: _settings_SpeechSettings_vue__WEBPACK_IMPORTED_MODULE_9__["default"],
    OffcanvasSetting: _modals_OffcanvasSetting_vue__WEBPACK_IMPORTED_MODULE_7__["default"],
    TransliterationSection: _TransliterationSection_vue__WEBPACK_IMPORTED_MODULE_8__["default"],
    AyahInfo: _translation_AyahInfo_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    MainAyah: _translation_MainAyah_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    Translator: _translation_Translator_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    BottomAudioPlayer: _translation_BottomAudioPlayer_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    AlertModal: _modals_AlertModal_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    ScreenReader: _accesibility_ScreenReader_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
    Magnifier: _search_Magnifier_vue__WEBPACK_IMPORTED_MODULE_6__["default"]
  },
  props: {
    successMessage: {
      type: String,
      default: ''
    },
    isVisible: {
      type: Boolean,
      required: true
    },
    iconColor: {
      type: String,
      default: "rgba(0, 191, 166)"
    },
    // Optional: not actually used; keep for compatibility
    translation: {
      type: String,
      default: ""
    },
    information: {
      type: Object,
      required: true
    },
    targetTranslationRef: {
      type: String,
      default: "targetTranslationElement"
    },
    isFullScreen: {
      type: Boolean,
      default: false
    },
    expanded: {
      type: Boolean,
      default: false
    },
    showMoreLink: {
      type: Boolean,
      default: true
    },
    showAlertText: {
      type: Boolean,
      default: false
    },
    showAlert: {
      type: Boolean,
      default: false
    },
    showErrorAlert: {
      type: Boolean,
      default: false
    },
    showAlertTextNote: {
      type: Boolean,
      default: false
    },
    props: {
      isPlaying: Boolean
    }
  },
  emits: ['toggle-audio'],
  computed: {
    wordCount() {
      const text = this.expanded ? this.information.translation : this.information.translation;
      return text ? text.trim().split(/\s+/).length : 0; // Calculate the word count
    },
    combinedText() {
      // Get the ayah_text from information
      const ayahText = typeof this.information.ayah_text === "object" ? this.information.ayah_text.text : this.information.ayah_text;
      // Return the formatted string
      return `Translation: ${ayahText}`;
    },
    formattedResult() {
      if (!this.result) return "";
      // Format the result as a plain text string for display
      return this.result.map(entity => `${entity.label}: ${entity.text}`).join('\n');
    }
  },
  data() {
    return {
      showOptions: false,
      voices: [],
      selectedVoice: '',
      // User's selected voice
      isVisible: false,
      voices: [],
      // Your list of available voices
      successMessage: false,
      offcanvasInstance: null,
      // Offcanvas instance
      inputText: "",
      result: null,
      isOffcanvasOpen: false,
      offcanvasInstance: null,
      isLoading: false,
      selectedVoice: null,
      selectedVoiceName: '',
      summary: "",
      // Generated summary
      error: "",
      // Error message
      loading: false,
      // Loading state
      API_TOKEN: "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",
      // Hugging Face API token
      BASE_URL: "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      // Hugging Face API URL
      isAuthenticated: false,
      userId: null,
      successMessage: "",
      isSwipeEnabled: true,
      // Track swipe enabled state
      swipeDisabled: false,
      // Flag to disable swipe behavior
      touchStartX: 0,
      touchStartY: 0,
      expanded: false,
      renderedText: "",
      selectedFormat: "Select a format",
      fontSize: parseFloat(localStorage.getItem('ayahFontSize')) || 1,
      holdTimeout: null,
      holdDuration: 1000,
      tapCount: 0,
      lastTap: 0,
      lastTapTime: 0,
      doubleTapThreshold: 300,
      isHolding: false,
      tapTimeout: null,
      isPlaying: false,
      isPaused: false,
      isReading: false,
      isAudioPlaying: false,
      resetDisabled: true,
      utterance: null,
      successMessage: false,
      words: (this.information && this.information.translation ? this.information.translation : '').split(" "),
      text: this.information && this.information.translation || '',
      currentWordIndex: -1,
      ayahAudio: null,
      // Store the audio URL
      ayahId: 1,
      // Example ayah ID
      data: [],
      surat: [],
      ayat: [],
      tafseers: [],
      speechRate: 1,
      // Default rate
      speechPitch: 1,
      // Default pitch
      rates: [0.5, 1, 1.5, 2],
      // List of available speech rates
      pitches: [0.5, 1, 1.5, 2] // List of available pitch values
    };
  },
  mounted() {
    window.speechSynthesis.addEventListener('voiceschanged', this.loadVoices);
    this.loadVoices();
    const {
      success,
      subscriptionType
    } = (0,_utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_10__.checkSubscriptionStatus)();
    if (success) {
      this.isVisible = true; // Show premium features
      if (subscriptionType) {
        this.showSuccessMessage = true; // Show success message
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      }
    }
    this.renderedText = this.information && this.information.translation || '';
    this.clearHighlight();
    this.stopReading();
    this.$emit("ayah-text", this.information.ayah.ayah_text);
    this.voices = speechSynthesis.getVoices();
    if (this.voices.length > 0) {
      this.selectedVoiceName = this.voices[0].name;
    }

    // Load saved settings from local storage
    const savedVoiceName = localStorage.getItem("selectedVoice");
    const savedRate = localStorage.getItem("rate");
    const savedPitch = localStorage.getItem("pitch");
    const savedFontSize = localStorage.getItem("fontSize");
    if (savedVoiceName) this.selectedVoiceName = JSON.parse(savedVoiceName); // Use selectedVoiceName instead of selectedVoice
    if (savedRate) this.rate = parseFloat(savedRate);
    if (savedPitch) this.pitch = parseFloat(savedPitch);
    if (savedFontSize) {
      this.currentFontSize = parseInt(savedFontSize, 10);
    } else {
      this.currentFontSize = 14; // Default font size
    }
  },
  methods: {
    redirectToMonthlySubscription() {
      (0,_utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_10__.redirectToSubscription)('monthly');
    },
    redirectToYearlySubscription() {
      (0,_utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_10__.redirectToSubscription)('yearly');
    },
    toggleIcon(event) {
      const icon = event.target;
      icon.classList.toggle('bi-arrow-down-circle-fill');
      icon.classList.toggle('bi-arrow-up-circle-fill');
    },
    downloadAsExport() {
      // Prepare dynamic content for export
      const content = {
        Translation: this.renderedText.replace(/<\/?[^>]+(>|$)/g, ""),
        translationInfo: "Ahmed Ali",
        wordCount: this.wordCount,
        ayahInfo: {
          id: this.information.id,
          // Assuming 'information' contains 'id' data
          ayah: {
            id: this.information.ayah.id,
            // Assuming 'ayah' is an object inside 'information'
            surah_id: this.information.ayah.surah_id,
            ayah_text: this.information.ayah.ayah_text,
            ayah_id: this.information.ayah.ayah_id,
            surah: {
              id: this.information.ayah.surah.id,
              name_en: this.information.ayah.surah.name_en,
              name_ar: this.information.ayah.surah.name_ar,
              text: this.information.ayah.surah.text
            }
          }
        }
      };
      const surahNumber = this.information.ayah.surah_id;
      const ayahNumber = this.information.ayah.ayah_id;
      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];

      // Construct file name with Surah and Ayah numbers
      const fileName = `translation_surah_${surahNumber}_ayah_${ayahNumber}_${formattedDate}.json`;

      // Convert the content to a JSON Blob for downloading
      const blob = new Blob([JSON.stringify(content, null, 2)], {
        type: 'application/json'
      });
      // Trigger the download
      this.triggerDownload(blob, fileName);
    },
    triggerDownload(blob, fileName) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    toggleSpeech() {
      // If audio is currently playing
      if (this.isReading) {
        if (this.isPaused) {
          window.speechSynthesis.resume(); // Resume reading if paused
          this.isPaused = false; // Set paused to false when resumed
        } else {
          window.speechSynthesis.pause(); // Pause reading
          this.isPaused = true; // Set paused to true
        }
      } else {
        this.readTextAloud(); // Start reading if not already reading
      }
      this.isReading = true; // Set reading state to true
    },
    // Open the off-canvas modal
    toggleOffcanvas() {
      const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'));
      offcanvas.toggle();
    },
    // Save settings to localStorage
    saveSettings() {
      // Save settings to local storage
      localStorage.setItem('selectedVoice', JSON.stringify(this.selectedVoiceName));
      localStorage.setItem('rate', this.rate);
      localStorage.setItem('pitch', this.pitch);
      localStorage.setItem('voice', this.voice.name);
      // Show success message
      this.successMessage = true;
      // Close the modal after a short delay
      setTimeout(() => {
        this.successMessage = false;
        const offcanvasElement = document.getElementById('offcanvasRight'); // Change to the correct element ID
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (offcanvasInstance) {
          offcanvasInstance.hide(); // Close the offcanvas
        }
      }, 1000); // 1 second delay
    },
    clearSuccessMessage() {
      setTimeout(() => {
        this.successMessage = '';
      }, 3000); // Clear after 3 seconds
    },
    showSuccess(message) {
      this.successMessage = message;
      // Clear message after 5 seconds
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    },
    clearHighlight() {
      // Force an update by resetting the content
      this.renderedText = ''; // Clear first to ensure reactivity
      this.$nextTick(() => {
        this.renderedText = `<span>${this.information.translation}</span>`;
      });
    },
    downloadAsCsv() {
      const formatCsvValue = (value, options = {
        isLtr: false,
        isRtl: false
      }) => {
        if (value == null) return '';

        // Convert to string and escape quotes
        let formattedValue = String(value).replace(/"/g, '""') // Escape quotes
        .replace(/[\r\n]+/g, ' ') // Replace newlines with spaces
        .trim();

        // Add directional markers based on content type
        if (options.isRtl) {
          return `"\u202B\u200F${formattedValue}\u202C"`;
        }
        if (options.isLtr) {
          return `"\u202A${formattedValue}\u202C"`;
        }
        return `"${formattedValue}"`;
      };
      try {
        var _this$information, _this$information2, _this$information3, _this$information4, _this$information5, _this$information6, _this$information7, _this$information8;
        // Prepare CSV rows with proper text direction
        const csvRows = [['"Title"', '"Content"'], ['"Surah name (Arabic)"', formatCsvValue((_this$information = this.information) === null || _this$information === void 0 || (_this$information = _this$information.ayah) === null || _this$information === void 0 || (_this$information = _this$information.surah) === null || _this$information === void 0 ? void 0 : _this$information.name_ar, {
          isRtl: true
        })], ['"Surah name (English)"', formatCsvValue((_this$information2 = this.information) === null || _this$information2 === void 0 || (_this$information2 = _this$information2.ayah) === null || _this$information2 === void 0 || (_this$information2 = _this$information2.surah) === null || _this$information2 === void 0 ? void 0 : _this$information2.name_en, {
          isLtr: true
        })], ['"Surah number"', formatCsvValue((_this$information3 = this.information) === null || _this$information3 === void 0 || (_this$information3 = _this$information3.ayah) === null || _this$information3 === void 0 ? void 0 : _this$information3.surah_id, {
          isLtr: true
        })], ['"Ayah number"', formatCsvValue((_this$information4 = this.information) === null || _this$information4 === void 0 || (_this$information4 = _this$information4.ayah) === null || _this$information4 === void 0 ? void 0 : _this$information4.ayah_id, {
          isLtr: true
        })], ['"Ayah"', formatCsvValue((_this$information5 = this.information) === null || _this$information5 === void 0 || (_this$information5 = _this$information5.ayah) === null || _this$information5 === void 0 ? void 0 : _this$information5.ayah_text, {
          isRtl: true
        })], ['"Translation"', formatCsvValue((_this$information6 = this.information) === null || _this$information6 === void 0 ? void 0 : _this$information6.translation, {
          isLtr: true
        })], ['"Translator"', formatCsvValue('Ahmed Ali', {
          isLtr: true
        })]];

        // Convert rows to CSV string with RTL marker for the whole document
        const csvContent = '\u202B' + csvRows.map(row => row.join(',')).join('\n');

        // Add BOM for UTF-8
        const bom = '\uFEFF';
        const fullContent = bom + csvContent;

        // Create blob with proper encoding
        const blob = new Blob([fullContent], {
          type: 'text/csv;charset=utf-8'
        });

        // Generate filename with surah/ayah info
        const date = new Date().toISOString().split('T')[0];
        const surahNum = ((_this$information7 = this.information) === null || _this$information7 === void 0 || (_this$information7 = _this$information7.ayah) === null || _this$information7 === void 0 ? void 0 : _this$information7.surah_id) || 'unknown-surah';
        const ayahNum = ((_this$information8 = this.information) === null || _this$information8 === void 0 || (_this$information8 = _this$information8.ayah) === null || _this$information8 === void 0 ? void 0 : _this$information8.ayah_id) || 'unknown-ayah';
        const filename = `translation_csv_surah_${surahNum}_ayah_${ayahNum}_${date}.csv`;

        // Handle download for different browsers
        if (window.navigator.msSaveOrOpenBlob) {
          // For IE/Edge
          window.navigator.msSaveBlob(blob, filename);
        } else {
          // For modern browsers
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;

          // Trigger download
          document.body.appendChild(link);
          link.click();

          // Cleanup
          setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }, 100);
        }
      } catch (error) {
        console.error('Failed to download CSV:', error);
        this.$emit('csv-error', error);
      }
    },
    async downloadAsWord() {
      var _this$information9, _this$information0, _this$information1, _this$information10, _this$information11;
      const doc = new docx__WEBPACK_IMPORTED_MODULE_15__.Document({
        sections: [{
          properties: {
            page: {
              margin: {
                top: 1440,
                // 1 inch
                right: 1440,
                bottom: 1440,
                left: 1440
              }
            }
          },
          children: [
          // Title Section
          new docx__WEBPACK_IMPORTED_MODULE_15__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_15__.TextRun({
              text: "Quran Translation Document",
              bold: true,
              size: 48,
              color: "1F4E79"
            })],
            alignment: "CENTER",
            spacing: {
              before: 400,
              after: 800,
              line: 360
            }
          }),
          // space
          new docx__WEBPACK_IMPORTED_MODULE_15__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_15__.TextRun({
              text: ``
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // surah Header
          new docx__WEBPACK_IMPORTED_MODULE_15__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_15__.TextRun({
              text: "Surah:",
              bold: true,
              size: 32,
              color: "2B5797",
              underline: false
            })],
            spacing: {
              before: 600,
              after: 300,
              line: 360
            }
          }),
          // Surah Info
          new docx__WEBPACK_IMPORTED_MODULE_15__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_15__.TextRun({
              text: `${(_this$information9 = this.information) === null || _this$information9 === void 0 || (_this$information9 = _this$information9.ayah) === null || _this$information9 === void 0 || (_this$information9 = _this$information9.surah) === null || _this$information9 === void 0 ? void 0 : _this$information9.name_en} (${(_this$information0 = this.information) === null || _this$information0 === void 0 || (_this$information0 = _this$information0.ayah) === null || _this$information0 === void 0 || (_this$information0 = _this$information0.surah) === null || _this$information0 === void 0 ? void 0 : _this$information0.name_ar})`,
              bold: false,
              size: 28,
              italics: false,
              color: "000000"
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // space
          new docx__WEBPACK_IMPORTED_MODULE_15__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_15__.TextRun({
              text: ``
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // Ayah Number
          new docx__WEBPACK_IMPORTED_MODULE_15__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_15__.TextRun({
              text: `Ayah Number:`,
              bold: true,
              size: 32,
              color: "2B5797",
              underline: false
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // Ayah Number
          new docx__WEBPACK_IMPORTED_MODULE_15__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_15__.TextRun({
              text: `${(_this$information1 = this.information) === null || _this$information1 === void 0 || (_this$information1 = _this$information1.ayah) === null || _this$information1 === void 0 ? void 0 : _this$information1.ayah_id}`,
              bold: false,
              size: 28,
              italics: false,
              color: "000000",
              underline: false
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // space
          new docx__WEBPACK_IMPORTED_MODULE_15__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_15__.TextRun({
              text: ``
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // Ayah Header
          new docx__WEBPACK_IMPORTED_MODULE_15__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_15__.TextRun({
              text: "Ayah:",
              bold: true,
              size: 32,
              color: "2B5797",
              underline: false
            })],
            spacing: {
              before: 600,
              after: 300,
              line: 360
            }
          }),
          // Ayah Text
          new docx__WEBPACK_IMPORTED_MODULE_15__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_15__.TextRun({
              text: (_this$information10 = this.information) === null || _this$information10 === void 0 || (_this$information10 = _this$information10.ayah) === null || _this$information10 === void 0 ? void 0 : _this$information10.ayah_text,
              size: 28,
              color: "333333",
              rightToLeft: true // Enable RTL for Arabic text
            })],
            spacing: {
              before: 300,
              after: 600,
              line: 360
            },
            indent: {
              left: 720,
              // 0.5 inch indent
              right: 720
            },
            alignment: "RIGHT" // Right align Arabic text
          }),
          // space
          new docx__WEBPACK_IMPORTED_MODULE_15__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_15__.TextRun({
              text: ``
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // Tafseer Header
          new docx__WEBPACK_IMPORTED_MODULE_15__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_15__.TextRun({
              text: "Translation:",
              bold: true,
              size: 32,
              color: "2B5797"
            })],
            spacing: {
              before: 600,
              after: 300,
              line: 360
            }
          }),
          // Tafseer Content
          new docx__WEBPACK_IMPORTED_MODULE_15__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_15__.TextRun({
              text: (_this$information11 = this.information) === null || _this$information11 === void 0 ? void 0 : _this$information11.translation,
              size: 28,
              color: "000000"
            })],
            spacing: {
              before: 300,
              after: 600,
              line: 360 // 1.5 line spacing
            },
            indent: {
              left: 720,
              right: 720
            }
          }),
          // space
          new docx__WEBPACK_IMPORTED_MODULE_15__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_15__.TextRun({
              text: ``
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // Translator Header
          new docx__WEBPACK_IMPORTED_MODULE_15__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_15__.TextRun({
              text: "Translator:",
              bold: true,
              size: 32,
              color: "2B5797"
            })],
            spacing: {
              before: 600,
              after: 300,
              line: 360
            }
          }),
          // Translator Content
          new docx__WEBPACK_IMPORTED_MODULE_15__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_15__.TextRun({
              text: "Ahmed Ali",
              italics: false,
              size: 28,
              color: "000000"
            })],
            spacing: {
              before: 300,
              after: 600,
              line: 360
            }
          })]
        }]
      });
      try {
        var _this$information12, _this$information13;
        const blob = await docx__WEBPACK_IMPORTED_MODULE_15__.Packer.toBlob(doc);

        // Generate a clean, ISO date string
        const date = new Date().toISOString().split("T")[0]; // e.g., 2024-12-28

        // Dynamically include Surah and Ayah numbers with fallbacks
        const surahNum = ((_this$information12 = this.information) === null || _this$information12 === void 0 || (_this$information12 = _this$information12.ayah) === null || _this$information12 === void 0 || (_this$information12 = _this$information12.surah) === null || _this$information12 === void 0 ? void 0 : _this$information12.id) || "unknown_surah";
        const ayahNum = ((_this$information13 = this.information) === null || _this$information13 === void 0 || (_this$information13 = _this$information13.ayah) === null || _this$information13 === void 0 ? void 0 : _this$information13.ayah_id) || "unknown_ayah";

        // Create a clean filename
        const filename = `translation_doc_surah_${surahNum}_ayah_${ayahNum}_${date}.docx`;

        // Save the file
        (0,file_saver__WEBPACK_IMPORTED_MODULE_13__.saveAs)(blob, filename);
      } catch (error) {
        console.error("Failed to generate Word document:", error);
        this.$emit("word-error", error);
      }
    },
    // Additional methods if needed, such as toggling expanded state, etc.
    toggleSpeechAyah() {
      this.$emit('toggle-audio', this.isReading);
    },
    toggleAudio() {
      this.ksdkld;
      $emit('toggle-audio');
    },
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    closeModal() {
      const modalElement = document.getElementById("speechModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
        // Dispose of the modal to remove the grey background
        modalInstance.dispose();
      }
    },
    adjustRate(value) {
      this.rate = parseFloat(value);
    },
    adjustPitch(value) {
      this.pitch = parseFloat(value);
    },
    increaseFontSize() {
      this.fontSize += 0.2; // Increase font size
      this.saveFontSize();
    },
    decreaseFontSize() {
      if (this.fontSize > 1) {
        this.fontSize -= 0.2; // Decrease font size
        this.saveFontSize();
      }
    },
    saveFontSize() {
      localStorage.setItem('ayahFontSize', this.fontSize); // Store font size in local storage
    },
    loadVoices() {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Filter out Google-enhanced voices
        this.voices = voices.filter(voice => !voice.name.includes("Google"));
        if (!this.selectedVoice && this.voices.length > 0) {
          this.selectedVoice = this.voices[0].name; // Set default voice if not set
        }
      }
    },
    readTextAloud() {
      const text = this.information.translation;
      if (!window.speechSynthesis) {
        console.error("Speech synthesis is not supported in this browser.");
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      this.utterance = new SpeechSynthesisUtterance(text);
      this.utterance.rate = this.speechRate; // Set speech rate
      this.utterance.pitch = this.speechPitch; // Set speech pitch

      const setVoice = () => {
        const voices = this.voices; // Use already loaded and filtered voices

        // Find the selected voice by name
        const matchingVoice = voices.find(voice => voice.name === this.selectedVoice);

        // Set the selected voice or fallback to the first available voice
        this.utterance.voice = matchingVoice || voices[0];

        // Start speaking after setting the voice
        this.isReading = true;
        window.speechSynthesis.speak(this.utterance);
      };

      // If voices are not yet loaded, wait for them
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = setVoice;
      } else {
        setVoice();
      }

      // Real-time word highlighting
      this.utterance.onboundary = event => {
        if (event.name === "word") {
          const currentWord = text.slice(event.charIndex).split(" ")[0];
          this.highlightText(event.charIndex, currentWord);
        }
      };

      // Handle end of speech
      this.utterance.onend = () => {
        this.isReading = false;
        this.clearHighlight();
      };
    },
    highlightText(charIndex, currentWord) {
      const text = this.information.translation;
      const before = text.slice(0, charIndex);
      const after = text.slice(charIndex + currentWord.length);
      this.renderedText = `
        <span>${before}</span>
        <span style="background-color: rgba(0, 191, 166, 0.6); padding: 2px; border-radius: 3px;">
          ${currentWord}
        </span>
        <span>${after}</span>`;
    },
    clearHighlight() {
      this.renderedText = `<span>${this.information.translation}</span>`;
    },
    updateRenderedText(newText) {
      this.renderedText = `<span>${newText}</span>`;
    },
    formatText(text) {
      return `<span>${text}</span>`;
    },
    stopReading() {
      window.speechSynthesis.cancel(); // Stop reading
      this.isReading = false;
      this.isPlaying = false; // Hide the stop icon
      this.isPaused = false; // Reset pause state
      this.clearHighlight();
    },
    // Pause reading
    pauseReading() {
      if (this.isReading && !this.isPaused) {
        window.speechSynthesis.pause(); // Pause the speech synthesis
        this.isPaused = true; // Set paused state
        console.log("Speech paused.");
      }
    },
    getWordIndex(charIndex, text) {
      // Calculate the word index based on the character index
      const beforeText = text.slice(0, charIndex);
      return beforeText.split(" ").length - 1;
    },
    toggleFullScreen() {
      this.$emit("toggle-full-screen");
    },
    handleTouchStart(event) {
      this.$emit("handle-touch-start", event);
    },
    handleTouchMove(event) {
      this.$emit("handle-touch-move", event);
    },
    handleTouchEnd(event) {
      this.$emit("handle-touch-end", event);
    },
    toggleExpand() {
      this.$emit("toggle-expand");
    },
    closeAlertText() {
      this.$emit("close-alert-text");
    }
  },
  watch: {
    'information.translation': {
      immediate: true,
      handler(newTranslation) {
        console.log("New translation received: ", newTranslation); // Debug
        this.stopReading();
        this.updateRenderedText(newTranslation);
      }
    },
    successMessage(newValue) {
      if (newValue) {
        this.clearSuccessMessage();
      }
    },
    isVisible() {
      this.$emit('toggle-change');
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TransliterationActions.vue?vue&type=script&defer=true&lang=js":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TransliterationActions.vue?vue&type=script&defer=true&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _translation_features_notes_TransliterationNote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./translation/features/notes/TransliterationNote */ "./resources/components/vue/translation/features/notes/TransliterationNote.vue");
/* harmony import */ var _translation_features_whatsapp_WhatsAppShareTransliteration_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./translation/features/whatsapp/WhatsAppShareTransliteration.vue */ "./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue");
/* harmony import */ var _translation_features_twitter_TwitterShareTransliteration_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./translation/features/twitter/TwitterShareTransliteration.vue */ "./resources/components/vue/translation/features/twitter/TwitterShareTransliteration.vue");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! html2canvas */ "./node_modules/html2canvas/dist/html2canvas.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(html2canvas__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.es.min.js");






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'TransliterationActions',
  components: {
    TransliterationNote: _translation_features_notes_TransliterationNote__WEBPACK_IMPORTED_MODULE_1__["default"],
    WhatsAppShareTransliteration: _translation_features_whatsapp_WhatsAppShareTransliteration_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    TwitterShareTransliteration: _translation_features_twitter_TwitterShareTransliteration_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  props: {
    transliteration: {
      type: String,
      required: true
    },
    isVisible: {
      type: Boolean,
      required: true
    },
    targetTransliterationRef: {
      type: String,
      default: 'targetTransliterationElement'
    }
  },
  data() {
    return {
      isSubmitting: false,
      showAlert: false,
      showErrorAlert: false
    };
  },
  methods: {
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen;
    },
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    hideAlertAfterDelay() {
      setTimeout(() => {
        this.showAlert = false;
        this.showErrorAlert = false;
      }, 3000); // Hide alerts after 3 seconds
    },
    downloadTransliterationPdf() {
      this._captureContent('download.pdf', targetElement => {
        const canvas = html2canvas__WEBPACK_IMPORTED_MODULE_4___default()(targetElement);
        return canvas.then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jspdf__WEBPACK_IMPORTED_MODULE_5__["default"]();
          pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
          pdf.save('download.pdf');
        });
      });
    },
    showSettingsOffcanvas() {
      new bootstrap.Offcanvas(document.getElementById('offcanvasRight')).show();
    }
  },
  watch: {
    isVisible() {
      this.$emit('toggle-change');
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TransliterationSection.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TransliterationSection.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _translation_AyahInfo_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./translation/AyahInfo.vue */ "./resources/components/vue/translation/AyahInfo.vue");
/* harmony import */ var _translation_MainAyah_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./translation/MainAyah.vue */ "./resources/components/vue/translation/MainAyah.vue");
/* harmony import */ var _modals_AlertModal_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modals/AlertModal.vue */ "./resources/components/vue/modals/AlertModal.vue");
/* harmony import */ var _translation_BottomAudioPlayer_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./translation/BottomAudioPlayer.vue */ "./resources/components/vue/translation/BottomAudioPlayer.vue");
/* harmony import */ var _utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/subscriptionUtils.js */ "./utils/subscriptionUtils.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! html2canvas */ "./node_modules/html2canvas/dist/html2canvas.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(html2canvas__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.es.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! papaparse */ "./node_modules/papaparse/papaparse.min.js");
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(papaparse__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var docx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! docx */ "./node_modules/docx/dist/index.mjs");










/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'TransliterationSection',
  components: {
    AyahInfo: _translation_AyahInfo_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    MainAyah: _translation_MainAyah_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    AlertModal: _modals_AlertModal_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    BottomAudioPlayer: _translation_BottomAudioPlayer_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  props: {
    isVisible: Boolean,
    information: Object,
    isFullScreen: Boolean,
    showAlertText: Boolean,
    showAlert: Boolean,
    showErrorAlert: Boolean,
    showAlertTextNote: Boolean,
    targetTransliterationElement: {
      type: String,
      default: "targetTransliterationElement"
    }
  },
  data() {
    return {
      summary: "",
      // Generated summary
      error: "",
      // Error message
      loading: false,
      // Loading state
      API_TOKEN: "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",
      // Hugging Face API token
      BASE_URL: "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      // Hugging Face API URL
      selectedFormat: "Select a format",
      fontSize: parseFloat(localStorage.getItem('ayahFontSize')) || 1,
      expanded: false,
      isPaused: false,
      isReading: false,
      isVisible: false // Controls visibility of premium features
    };
  },
  computed: {
    wordCount() {
      const text = this.information.transliteration || "";
      return text.trim().split(/\s+/).length;
    }
  },
  mounted() {
    const {
      success,
      subscriptionType
    } = (0,_utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_4__.checkSubscriptionStatus)();
    if (success) {
      this.isVisible = true; // Show premium features
      if (subscriptionType) {
        this.showSuccessMessage = true; // Show success message
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      }
    }
  },
  methods: {
    redirectToMonthlySubscription() {
      (0,_utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_4__.redirectToSubscription)('monthly');
    },
    redirectToYearlySubscription() {
      (0,_utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_4__.redirectToSubscription)('yearly');
    },
    toggleIcon(event) {
      const icon = event.target;
      icon.classList.toggle('bi-arrow-down-circle-fill');
      icon.classList.toggle('bi-arrow-up-circle-fill');
    },
    downloadAsExport() {
      var _this$information, _this$information2, _this$information3, _this$information4, _this$information5, _this$information6, _this$information7, _this$information8, _this$information9;
      // Safely handle undefined `renderedText`
      const renderedText = this.renderedText ? this.renderedText.replace(/<\/?[^>]+(>|$)/g, "") : "";

      // Safely handle undefined `information` or nested properties
      const surahNumber = ((_this$information = this.information) === null || _this$information === void 0 || (_this$information = _this$information.ayah) === null || _this$information === void 0 ? void 0 : _this$information.surah_id) || "unknown";
      const ayahNumber = ((_this$information2 = this.information) === null || _this$information2 === void 0 || (_this$information2 = _this$information2.ayah) === null || _this$information2 === void 0 ? void 0 : _this$information2.ayah_id) || "unknown";

      // Prepare dynamic content for export
      const content = {
        Translation: renderedText,
        translationInfo: "Ahmed Ali",
        wordCount: this.wordCount || 0,
        ayahInfo: {
          id: ((_this$information3 = this.information) === null || _this$information3 === void 0 ? void 0 : _this$information3.id) || "unknown",
          ayah: {
            id: ((_this$information4 = this.information) === null || _this$information4 === void 0 || (_this$information4 = _this$information4.ayah) === null || _this$information4 === void 0 ? void 0 : _this$information4.id) || "unknown",
            surah_id: surahNumber,
            ayah_text: ((_this$information5 = this.information) === null || _this$information5 === void 0 || (_this$information5 = _this$information5.ayah) === null || _this$information5 === void 0 ? void 0 : _this$information5.ayah_text) || "",
            ayah_id: ayahNumber,
            surah: {
              id: ((_this$information6 = this.information) === null || _this$information6 === void 0 || (_this$information6 = _this$information6.ayah) === null || _this$information6 === void 0 || (_this$information6 = _this$information6.surah) === null || _this$information6 === void 0 ? void 0 : _this$information6.id) || "unknown",
              name_en: ((_this$information7 = this.information) === null || _this$information7 === void 0 || (_this$information7 = _this$information7.ayah) === null || _this$information7 === void 0 || (_this$information7 = _this$information7.surah) === null || _this$information7 === void 0 ? void 0 : _this$information7.name_en) || "",
              name_ar: ((_this$information8 = this.information) === null || _this$information8 === void 0 || (_this$information8 = _this$information8.ayah) === null || _this$information8 === void 0 || (_this$information8 = _this$information8.surah) === null || _this$information8 === void 0 ? void 0 : _this$information8.name_ar) || "",
              text: ((_this$information9 = this.information) === null || _this$information9 === void 0 || (_this$information9 = _this$information9.ayah) === null || _this$information9 === void 0 || (_this$information9 = _this$information9.surah) === null || _this$information9 === void 0 ? void 0 : _this$information9.text) || ""
            }
          }
        }
      };
      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];

      // Construct file name with Surah and Ayah numbers
      const fileName = `transliteration_surah_${surahNumber}_ayah_${ayahNumber}_${formattedDate}.json`;

      // Convert the content to a JSON Blob for downloading
      const blob = new Blob([JSON.stringify(content, null, 2)], {
        type: 'application/json'
      });
      // Trigger the download
      this.triggerDownload(blob, fileName);
    },
    triggerDownload(blob, fileName) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    increaseFontSize() {
      this.fontSize += 0.2; // Increase font size
      this.saveFontSize();
    },
    decreaseFontSize() {
      if (this.fontSize > 1) {
        this.fontSize -= 0.2; // Decrease font size
        this.saveFontSize();
      }
    },
    saveFontSize() {
      localStorage.setItem('ayahFontSize', this.fontSize);
    },
    downloadAsCsv() {
      const formatCsvValue = (value, options = {
        isLtr: false,
        isRtl: false
      }) => {
        if (value == null) return '';

        // Convert to string and escape quotes
        let formattedValue = String(value).replace(/"/g, '""') // Escape quotes
        .replace(/[\r\n]+/g, ' ') // Replace newlines with spaces
        .trim();

        // Add directional markers based on content type
        if (options.isRtl) {
          // RLE (Right-to-Left Embedding) + RLM (Right-to-Left Mark) + content
          return `"\u202B\u200F${formattedValue}\u202C"`;
        }
        if (options.isLtr) {
          // LRE (Left-to-Right Embedding) + content
          return `"\u202A${formattedValue}\u202C"`;
        }
        return `"${formattedValue}"`;
      };
      try {
        var _this$information0, _this$information1, _this$information10, _this$information11, _this$information12, _this$information13, _this$information14, _this$information15;
        // Prepare CSV rows with proper text direction
        const csvRows = [['"Title"', '"Content"'], ['"Surah name (Arabic)"', formatCsvValue((_this$information0 = this.information) === null || _this$information0 === void 0 || (_this$information0 = _this$information0.ayah) === null || _this$information0 === void 0 || (_this$information0 = _this$information0.surah) === null || _this$information0 === void 0 ? void 0 : _this$information0.name_ar, {
          isRtl: true
        })], ['"Surah name (English)"', formatCsvValue((_this$information1 = this.information) === null || _this$information1 === void 0 || (_this$information1 = _this$information1.ayah) === null || _this$information1 === void 0 || (_this$information1 = _this$information1.surah) === null || _this$information1 === void 0 ? void 0 : _this$information1.name_en, {
          isLtr: true
        })], ['"Surah number"', formatCsvValue((_this$information10 = this.information) === null || _this$information10 === void 0 || (_this$information10 = _this$information10.ayah) === null || _this$information10 === void 0 ? void 0 : _this$information10.surah_id, {
          isLtr: true
        })], ['"Ayah number"', formatCsvValue((_this$information11 = this.information) === null || _this$information11 === void 0 || (_this$information11 = _this$information11.ayah) === null || _this$information11 === void 0 ? void 0 : _this$information11.ayah_id, {
          isLtr: true
        })], ['"Ayah"', formatCsvValue((_this$information12 = this.information) === null || _this$information12 === void 0 || (_this$information12 = _this$information12.ayah) === null || _this$information12 === void 0 ? void 0 : _this$information12.ayah_text, {
          isRtl: true
        })], ['"Transliteration"', formatCsvValue((_this$information13 = this.information) === null || _this$information13 === void 0 ? void 0 : _this$information13.transliteration, {
          isLtr: true
        })], ['"Transliteration"', formatCsvValue('Saheeh International', {
          isLtr: true
        })]];
        // Convert rows to CSV string with RTL marker for the whole document
        const csvContent = '\u202B' + csvRows.map(row => row.join(',')).join('\n');

        // Add BOM for UTF-8
        const bom = '\uFEFF';
        const fullContent = bom + csvContent;

        // Create blob with proper encoding
        const blob = new Blob([fullContent], {
          type: 'text/csv;charset=utf-8'
        });

        // Generate filename with surah/ayah info
        const date = new Date().toISOString().split('T')[0];
        const surahNum = ((_this$information14 = this.information) === null || _this$information14 === void 0 || (_this$information14 = _this$information14.ayah) === null || _this$information14 === void 0 ? void 0 : _this$information14.surah_id) || 'unknown-surah';
        const ayahNum = ((_this$information15 = this.information) === null || _this$information15 === void 0 || (_this$information15 = _this$information15.ayah) === null || _this$information15 === void 0 ? void 0 : _this$information15.ayah_id) || 'unknown-ayah';
        const filename = `transliteration_csv_surah_${surahNum}_ayah_${ayahNum}_${date}.csv`;

        // Handle download for different browsers
        if (window.navigator.msSaveOrOpenBlob) {
          // For IE/Edge
          window.navigator.msSaveBlob(blob, filename);
        } else {
          // For modern browsers
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;

          // Trigger download
          document.body.appendChild(link);
          link.click();

          // Cleanup
          setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }, 100);
        }
      } catch (error) {
        console.error('Failed to download CSV:', error);
        this.$emit('csv-error', error);
      }
    },
    async downloadAsWord() {
      var _this$information16, _this$information17, _this$information18, _this$information19, _this$information20;
      const doc = new docx__WEBPACK_IMPORTED_MODULE_9__.Document({
        sections: [{
          properties: {
            page: {
              margin: {
                top: 1440,
                // 1 inch
                right: 1440,
                bottom: 1440,
                left: 1440
              }
            }
          },
          children: [
          // Title Section
          new docx__WEBPACK_IMPORTED_MODULE_9__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_9__.TextRun({
              text: "Quran Transliteration Document",
              bold: true,
              size: 48,
              color: "1F4E79"
            })],
            alignment: "CENTER",
            spacing: {
              before: 400,
              after: 800,
              line: 360
            }
          }),
          // space
          new docx__WEBPACK_IMPORTED_MODULE_9__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_9__.TextRun({
              text: ``
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // surah Header
          new docx__WEBPACK_IMPORTED_MODULE_9__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_9__.TextRun({
              text: "Surah:",
              bold: true,
              size: 32,
              color: "2B5797",
              underline: false
            })],
            spacing: {
              before: 600,
              after: 300,
              line: 360
            }
          }),
          // Surah Info
          new docx__WEBPACK_IMPORTED_MODULE_9__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_9__.TextRun({
              text: `${(_this$information16 = this.information) === null || _this$information16 === void 0 || (_this$information16 = _this$information16.ayah) === null || _this$information16 === void 0 || (_this$information16 = _this$information16.surah) === null || _this$information16 === void 0 ? void 0 : _this$information16.name_en} (${(_this$information17 = this.information) === null || _this$information17 === void 0 || (_this$information17 = _this$information17.ayah) === null || _this$information17 === void 0 || (_this$information17 = _this$information17.surah) === null || _this$information17 === void 0 ? void 0 : _this$information17.name_ar})`,
              bold: false,
              size: 28,
              italics: false,
              color: "000000"
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // space
          new docx__WEBPACK_IMPORTED_MODULE_9__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_9__.TextRun({
              text: ``
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // Ayah Number
          new docx__WEBPACK_IMPORTED_MODULE_9__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_9__.TextRun({
              text: `Ayah Number:`,
              bold: true,
              size: 32,
              color: "2B5797",
              underline: false
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // Ayah Number
          new docx__WEBPACK_IMPORTED_MODULE_9__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_9__.TextRun({
              text: `${(_this$information18 = this.information) === null || _this$information18 === void 0 || (_this$information18 = _this$information18.ayah) === null || _this$information18 === void 0 ? void 0 : _this$information18.ayah_id}`,
              bold: false,
              size: 28,
              italics: false,
              color: "000000",
              underline: false
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // space
          new docx__WEBPACK_IMPORTED_MODULE_9__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_9__.TextRun({
              text: ``
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // Ayah Header
          new docx__WEBPACK_IMPORTED_MODULE_9__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_9__.TextRun({
              text: "Ayah:",
              bold: true,
              size: 32,
              color: "2B5797",
              underline: false
            })],
            spacing: {
              before: 600,
              after: 300,
              line: 360
            }
          }),
          // Ayah Text
          new docx__WEBPACK_IMPORTED_MODULE_9__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_9__.TextRun({
              text: (_this$information19 = this.information) === null || _this$information19 === void 0 || (_this$information19 = _this$information19.ayah) === null || _this$information19 === void 0 ? void 0 : _this$information19.ayah_text,
              size: 28,
              color: "333333",
              rightToLeft: true // Enable RTL for Arabic text
            })],
            spacing: {
              before: 300,
              after: 600,
              line: 360
            },
            indent: {
              left: 720,
              // 0.5 inch indent
              right: 720
            },
            alignment: "RIGHT" // Right align Arabic text
          }),
          // space
          new docx__WEBPACK_IMPORTED_MODULE_9__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_9__.TextRun({
              text: ``
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // Tafseer Header
          new docx__WEBPACK_IMPORTED_MODULE_9__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_9__.TextRun({
              text: "Transliteration:",
              bold: true,
              size: 32,
              color: "2B5797"
            })],
            spacing: {
              before: 600,
              after: 300,
              line: 360
            }
          }),
          // Tafseer Content
          new docx__WEBPACK_IMPORTED_MODULE_9__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_9__.TextRun({
              text: (_this$information20 = this.information) === null || _this$information20 === void 0 ? void 0 : _this$information20.transliteration,
              size: 28,
              color: "000000"
            })],
            spacing: {
              before: 300,
              after: 600,
              line: 360 // 1.5 line spacing
            },
            indent: {
              left: 720,
              right: 720
            }
          }),
          // space
          new docx__WEBPACK_IMPORTED_MODULE_9__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_9__.TextRun({
              text: ``
            })],
            spacing: {
              before: 400,
              after: 400,
              line: 360
            }
          }),
          // Translator Header
          new docx__WEBPACK_IMPORTED_MODULE_9__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_9__.TextRun({
              text: "Transliteration:",
              bold: true,
              size: 32,
              color: "2B5797"
            })],
            spacing: {
              before: 600,
              after: 300,
              line: 360
            }
          }),
          // Translator Content
          new docx__WEBPACK_IMPORTED_MODULE_9__.Paragraph({
            children: [new docx__WEBPACK_IMPORTED_MODULE_9__.TextRun({
              text: "Saheeh International",
              italics: false,
              size: 28,
              color: "000000"
            })],
            spacing: {
              before: 300,
              after: 600,
              line: 360
            }
          })]
        }]
      });
      try {
        var _this$information21, _this$information22;
        const blob = await docx__WEBPACK_IMPORTED_MODULE_9__.Packer.toBlob(doc);

        // Generate a clean, ISO date string
        const date = new Date().toISOString().split("T")[0]; // e.g., 2024-12-28

        // Dynamically include Surah and Ayah numbers with fallbacks
        const surahNum = ((_this$information21 = this.information) === null || _this$information21 === void 0 || (_this$information21 = _this$information21.ayah) === null || _this$information21 === void 0 || (_this$information21 = _this$information21.surah) === null || _this$information21 === void 0 ? void 0 : _this$information21.id) || "unknown_surah";
        const ayahNum = ((_this$information22 = this.information) === null || _this$information22 === void 0 || (_this$information22 = _this$information22.ayah) === null || _this$information22 === void 0 ? void 0 : _this$information22.ayah_id) || "unknown_ayah";

        // Create a clean filename
        const filename = `transliteration_doc_surah_${surahNum}_ayah_${ayahNum}_${date}.docx`;

        // Save the file
        (0,file_saver__WEBPACK_IMPORTED_MODULE_7__.saveAs)(blob, filename);
      } catch (error) {
        console.error("Failed to generate Word document:", error);
        this.$emit("word-error", error);
      }
    },
    toggleFullScreen() {
      this.$emit('toggle-full-screen');
    },
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    closeAlertText() {
      this.$emit('close-alert-text');
    }
    // created(){
    //   this.checkSubscriptionStatus();
    //   this.handleSuccess();
    // },
  },
  watch: {
    isVisible() {
      this.$emit('toggle-change');
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/accesibility/ScreenReader.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/accesibility/ScreenReader.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      text: '',
      isReading: false,
      utterance: null
    };
  },
  methods: {
    startReading() {
      if (!this.text) return;
      this.utterance = new SpeechSynthesisUtterance(this.text);
      this.utterance.onend = () => {
        this.isReading = false;
      };
      this.isReading = true;
      window.speechSynthesis.speak(this.utterance);
    },
    stopReading() {
      window.speechSynthesis.cancel();
      this.isReading = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/folder_manager/FolderSelectionModal.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/folder_manager/FolderSelectionModal.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "FolderSelectionModal",
  props: {
    information: {
      type: Object,
      required: true,
      surah: {
        name_en: ""
      },
      ayah_text: "",
      ayah_id: null,
      translation: "",
      validator(value) {
        return value.surah && value.surah.name_en !== undefined && value.ayah_text !== undefined && value.ayah_id !== undefined && value.translation !== undefined;
      }
    }
  },
  data() {
    return {
      folders: [],
      selectedFolderId: null,
      showAlert: false,
      showErrorAlert: false
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
        alert("Failed to fetch folders. Please try again.");
      }
    },
    selectFolder(folderId) {
      this.selectedFolderId = folderId;
    },
    async confirmSelection() {
      if (!this.selectedFolderId) {
        alert("Please select a folder.");
        return;
      }
      console.log('Selected folder ID:', this.selectedFolderId);
      console.log('Information provided:', this.information);
      const {
        surah,
        ayah_text,
        ayah_id,
        translation
      } = this.information;
      if (!surah || !ayah_text || ayah_id === null || !translation) {
        this.showErrorAlert = true;
        this.hideAlertAfterDelay();
        return;
      }
      const formData = {
        surah_name: surah.name_en,
        ayah_num: ayah_id,
        ayah_verse_ar: ayah_text,
        ayah_verse_en: translation,
        folder_id: this.selectedFolderId
      };
      console.log('Form Data being sent:', formData);
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("/bookmarks", formData);
        console.log('Response from server:', response.data);
        if (response.status === 200 && response.data.success) {
          localStorage.setItem(`bookmarkSubmitted_${ayah_id}`, true);
          this.showAlert = true;
          this.showErrorAlert = false;
          this.hideAlertAfterDelay();
        } else {
          console.error('Unexpected response:', response);
          this.showAlert = false;
          this.showErrorAlert = true;
          this.hideAlertAfterDelay();
        }
      } catch (error) {
        var _error$response;
        console.error('Error details:', ((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.data) || error.message);
        this.showAlert = false;
        this.showErrorAlert = true;
        this.hideAlertAfterDelay();
      }
    },
    show() {
      const modalElement = document.getElementById("folderSelectionModal");
      const modal = new bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal(modalElement);
      modal.show();
    },
    resetForm() {
      this.selectedFolderId = null;
    },
    hideAlertAfterDelay() {
      setTimeout(() => {
        this.showAlert = false;
        this.showErrorAlert = false;
      }, 3000); // Hide alerts after 3 seconds
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/AlertModal.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/AlertModal.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'AlertModal',
  props: {
    showAlertText: Boolean,
    showAlert: Boolean,
    showErrorAlert: Boolean,
    showAlertTextNote: Boolean
  },
  methods: {
    closeAlertText() {
      this.$emit('close-alert-text'); // Emit event to close the alert
    },
    triggerBookmarkSuccess() {
      this.$emit('trigger-bookmark-success'); // Emit event to trigger bookmark success alert
    },
    triggerLoginError() {
      this.$emit('trigger-login-error'); // Emit event to trigger login error alert
    },
    triggerNoteLoginError() {
      this.$emit('trigger-note-login-error'); // Emit event to trigger note login error alert
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/OffcanvasSetting.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/OffcanvasSetting.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      rate: 1,
      // Default rate
      pitch: 1,
      // Default pitch
      voices: [],
      // Array to hold the voices
      selectedVoiceName: '',
      // Selected voice name
      successMessage: false // Flag to show success message
    };
  },
  mounted() {
    // Load voices initially
    this.loadVoices();

    // Listen for voices change event
    window.speechSynthesis.onvoiceschanged = this.loadVoices;

    // Load settings from local storage if available
    const savedVoiceName = localStorage.getItem('selectedVoice');
    const savedRate = localStorage.getItem('rate');
    const savedPitch = localStorage.getItem('pitch');
    if (savedVoiceName) this.selectedVoiceName = JSON.parse(savedVoiceName);
    if (savedRate) this.rate = parseFloat(savedRate);
    if (savedPitch) this.pitch = parseFloat(savedPitch);
  },
  methods: {
    loadVoices() {
      // Get the available voices
      this.voices = window.speechSynthesis.getVoices();

      // If voices are empty (for some browsers), retry loading voices
      if (this.voices.length === 0) {
        setTimeout(this.loadVoices, 1000); // Retry after 1 second
      } else {
        var _this$voices$;
        this.selectedVoiceName = this.selectedVoiceName || ((_this$voices$ = this.voices[0]) === null || _this$voices$ === void 0 ? void 0 : _this$voices$.name);
      }
    },
    changeVoice(voiceName) {
      // Update the selected voice
      this.selectedVoiceName = voiceName;
      localStorage.setItem('selectedVoice', JSON.stringify(voiceName));
    },
    saveSettings() {
      // Save settings to local storage
      localStorage.setItem('rate', this.rate);
      localStorage.setItem('pitch', this.pitch);
      localStorage.setItem('selectedVoice', JSON.stringify(this.selectedVoiceName));

      // Show success message
      this.successMessage = true;

      // Close the off-canvas after 2 seconds
      setTimeout(() => {
        this.successMessage = false;

        // Close the offcanvas using Bootstrap's API
        const offcanvasElement = document.getElementById('offcanvasSetting');
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (offcanvasInstance) {
          offcanvasInstance.hide();
        }
      }, 2000); // 2-second delay
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/SurahInfoModal.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/SurahInfoModal.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'SurahInfoModal',
  props: {
    information: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      expanded: false,
      showMoreLink: true,
      modalInstance: null
    };
  },
  mounted() {
    const modalElement = document.getElementById('translationInfo');
    if (modalElement) {
      this.modalInstance = new bootstrap__WEBPACK_IMPORTED_MODULE_0__.Modal(modalElement);
    }
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    truncatedText(text) {
      if (!text) return '';
      if (text.length > 400) {
        this.showMoreLink = true;
        return text.slice(0, 400) + '...';
      }
      this.showMoreLink = false;
      return text;
    },
    closeModal() {
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AdvancedSearch.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AdvancedSearch.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    translation: {
      type: String,
      required: true
    },
    information: {
      type: Object,
      required: true
    },
    targetTranslationRef: {
      type: String,
      default: 'targetTranslationElement'
    }
  },
  data() {
    return {
      errorMessage: '',
      selectedAyah: null,
      loading: false,
      searchTerm: '',
      suggestions: [],
      showSuggestions: false,
      activeIndex: -1,
      tafseer: '',
      filteredResults: [],
      expanded: false,
      showMoreLink: true,
      filters: {
        translation: true,
        tafseer: false,
        transliteration: false
      },
      isListening: false,
      recognition: null
    };
  },
  computed: {
    totalSurahs() {
      const ids = this.filteredResults.map(r => r && r.ayah ? r.ayah.surah_id : null).filter(Boolean);
      return new Set(ids).size;
    },
    totalAyahs() {
      return this.filteredResults.length;
    }
  },
  watch: {
    'information.ayah.id': {
      immediate: true,
      handler(newId) {
        if (newId) this.fetchTafseer(newId);
      }
    }
  },
  mounted() {
    if (this.information && this.information.ayah && this.information.ayah.id) {
      this.fetchTafseer(this.information.ayah.id);
    }
    // Close suggestions when clicking outside
    this._onDocClick = e => {
      const root = this.$refs.searchRoot;
      if (!root) return;
      if (!root.contains(e.target)) {
        this.showSuggestions = false;
        this.activeIndex = -1;
      }
    };
    document.addEventListener('click', this._onDocClick, {
      passive: true
    });
  },
  beforeUnmount() {
    if (this._onDocClick) {
      document.removeEventListener('click', this._onDocClick, {
        passive: true
      });
      this._onDocClick = null;
    }
  },
  methods: {
    async fetchTafseer(ayahId) {
      try {
        const {
          data
        } = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`/tafseer/${ayahId}/fetch`);
        this.tafseer = data;
      } catch (e) {
        console.error('Error fetching tafseer:', e);
      }
    },
    onInput() {
      if (this.searchTerm && this.searchTerm.length > 2) {
        this.fetchSuggestions();
        this.showSuggestions = true;
      } else {
        this.suggestions = [];
        this.showSuggestions = false;
        this.activeIndex = -1;
      }
    },
    onKeyDown(e) {
      if (!this.suggestions.length) return;
      const max = this.suggestions.length - 1;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.showSuggestions = true;
        this.activeIndex = this.activeIndex < max ? this.activeIndex + 1 : 0;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.showSuggestions = true;
        this.activeIndex = this.activeIndex > 0 ? this.activeIndex - 1 : max;
      } else if (e.key === 'Enter') {
        if (this.activeIndex >= 0) {
          e.preventDefault();
          this.selectSuggestion(this.suggestions[this.activeIndex]);
        }
      } else if (e.key === 'Escape') {
        this.showSuggestions = false;
        this.activeIndex = -1;
      }
    },
    fetchSuggestions() {
      this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/search-translations', {
        params: {
          query: this.searchTerm,
          filters: this.filters
        }
      }).then(({
        data
      }) => {
        this.suggestions = data.suggestions || [];
        this.activeIndex = this.suggestions.length ? 0 : -1;
      }).catch(err => {
        console.error('Error fetching suggestions:', err);
        this.suggestions = [];
      }).finally(() => {
        this.loading = false;
      });
    },
    selectSuggestion(s) {
      this.searchTerm = s;
      this.suggestions = [];
      this.showSuggestions = false;
      this.activeIndex = -1;
      this.fetchResults(s);
      this.showOffcanvas();
    },
    startVoiceRecognition() {
      this.isListening = true;
      this.errorMessage = '';
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) {
        alert('Speech Recognition not supported.');
        this.isListening = false;
        return;
      }
      this.recognition = new SR();
      this.recognition.lang = 'en-US';
      this.recognition.continuous = false;
      this.recognition.onresult = e => {
        const transcript = (e.results[0][0].transcript || '').trim();
        this.isListening = false;
        if (transcript) this.handleVoiceSearchTerm(transcript);
      };
      this.recognition.onend = () => {
        this.isListening = false;
      };
      this.recognition.onerror = e => {
        console.error('Speech recognition error:', e.error);
        this.isListening = false;
      };
      this.recognition.start();
    },
    stopVoiceRecognition() {
      if (this.recognition) {
        this.recognition.stop();
        this.isListening = false;
        if (this.searchTerm) {
          this.fetchResults(this.searchTerm);
          this.showOffcanvas();
        }
      }
    },
    handleVoiceSearchTerm(term) {
      const normalized = term && term.trim();
      if (!normalized) return;
      this.searchTerm = normalized;
      this.fetchResults(normalized);
      this.showOffcanvas();
    },
    fetchResults(query) {
      this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/search-translations', {
        params: {
          query,
          filters: this.filters
        }
      }).then(({
        data
      }) => {
        this.filteredResults = data.results || [];
      }).catch(err => {
        console.error('Error fetching results:', err);
        this.filteredResults = [];
      }).finally(() => {
        this.loading = false;
      });
    },
    searchWord() {
      if (!this.searchTerm) return;
      this.fetchResults(this.searchTerm);
      this.showOffcanvas();
    },
    showOffcanvas() {
      const el = document.getElementById('offcanvasResults');
      if (!el) return;
      const oc = new bootstrap.Offcanvas(el);
      oc.show();
    },
    highlightSearch(text) {
      if (!text || !this.searchTerm) return text;
      const t = this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return String(text).replace(new RegExp(`(${t})`, 'gi'), '<mark>$1</mark>');
    },
    shareOnWhatsApp(r) {
      const m = `Ayah: ${r.ayah.surah_id}:${r.ayah.ayah_id}\n\n${r.ayah.ayah_text}\n\nTranslation: ${r.translation}\n\nVisit our website : www.islamiconnect.com for more`;
      window.open(`https://wa.me/?text=${encodeURIComponent(m)}`, '_blank');
    },
    shareOnTwitter(r) {
      const m = `Ayah: ${r.ayah.surah_id}:${r.ayah.ayah_id}\n\n${r.ayah.ayah_text}\n\nTranslation: ${r.translation}\n\nVisit our website : www.islamiconnect.com for more`;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(m)}`, '_blank');
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AyahDropdown.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AyahDropdown.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash.debounce */ "./node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "AyahDropdown",
  props: {
    selectedSurahId: {
      type: Number,
      required: true
    },
    dropdownHidden: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectedAyahId: "",
      ayat: [],
      isLoading: false,
      cachedData: {}
    };
  },
  methods: {
    formatAyahOption(ayah) {
      return `${ayah.ayah_text} : ${ayah.ayah_id}`;
    },
    async handleAyahChange() {
      if (!this.selectedAyahId) return;
      if (this.cachedData[this.selectedAyahId]) {
        this.emitCachedData(this.selectedAyahId);
        return;
      }
      await this.fetchAndEmitAyahData();
    },
    emitCachedData(ayahId) {
      const {
        tafseer,
        information
      } = this.cachedData[ayahId];
      this.$emit("update-tafseer", tafseer);
      this.$emit("update-information", information);
    },
    async fetchAndEmitAyahData() {
      this.isLoading = true;
      try {
        const [tafseer, information] = await Promise.all([this.fetchTafseer(), this.fetchInformation()]);

        // Cache the new data
        this.cachedData[this.selectedAyahId] = {
          tafseer,
          information
        };

        // Emit the data
        this.$emit("update-tafseer", tafseer);
        this.$emit("update-information", information);
      } catch (error) {
        console.error("Error fetching Ayah data:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchTafseer() {
      const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`/tafseer/${this.selectedAyahId}/fetch`);
      return response.data;
    },
    async fetchInformation() {
      const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/get_informations", {
        params: {
          id: this.selectedAyahId
        }
      });
      return response.data;
    },
    fetchAyat: lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default()(async function () {
      if (!this.selectedSurahId) return;
      this.isLoading = true;
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/get_ayat", {
          params: {
            surah_id: this.selectedSurahId
          }
        });
        this.ayat = response.data;
        if (this.ayat.length > 0) {
          this.selectedAyahId = this.ayat[0].id;
          await this.handleAyahChange();
        }
      } catch (error) {
        console.error("Error fetching Ayat:", error);
      } finally {
        this.isLoading = false;
      }
    }, 300)
  },
  watch: {
    selectedSurahId: {
      immediate: true,
      handler(newSurahId) {
        this.ayat = [];
        this.fetchAyat();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/ErrorAlert.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/ErrorAlert.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    showError: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    dismissError() {
      this.$emit('dismiss-error');
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/Magnifier.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/Magnifier.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    text: {
      type: String,
      required: true
    },
    zoomLevel: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      isVisible: false,
      magnifierStyle: {
        position: 'absolute',
        width: '200px',
        // You can adjust this size
        height: '200px',
        // You can adjust this size
        border: '2px solid #000',
        borderRadius: '50%',
        pointerEvents: 'none',
        display: 'none',
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${this.zoomLevel * 100}%`
      }
    };
  },
  methods: {
    showMagnifier(event) {
      const {
        clientX,
        clientY
      } = event;
      this.magnifierStyle.left = `${clientX - 100}px`; // Adjust as necessary
      this.magnifierStyle.top = `${clientY - 100}px`; // Adjust as necessary
      this.isVisible = true;
    },
    hideMagnifier() {
      this.isVisible = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/SurahDropdown.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/SurahDropdown.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "SurahDropdown",
  props: {
    selectedSurah: {
      type: Number,
      default: null
    },
    filteredSurah: {
      type: Array,
      default: () => []
    },
    surat: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedSurahLocal: this.selectedSurah || null
    };
  },
  computed: {
    displayedSurahs() {
      return this.filteredSurah.length ? this.filteredSurah : this.surat;
    },
    dropdownOptions() {
      return (this.displayedSurahs || []).map(s => ({
        value: Number(s.id),
        label: `${s.id} · ${s.name_en}`,
        en: s.name_en,
        ar: s.name_ar
      }));
    }
  },
  methods: {
    onDropdownChange(e) {
      const newValue = Number(e.value || 0) || null;
      this.selectedSurahLocal = newValue;
      if (newValue !== null) {
        this.$emit("update:selectedSurah", newValue);
        this.$emit("fetchAyat", newValue);
      }
    },
    optionById(id) {
      return this.dropdownOptions.find(o => o.value === Number(id));
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/settings/SpeechSettings.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/settings/SpeechSettings.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    voices: {
      type: Array,
      required: true
    }
  },
  mounted() {
    var _this$voices$;
    // Load and apply speech settings
    this.selectedVoiceName = localStorage.getItem('selectedVoiceName') || ((_this$voices$ = this.voices[0]) === null || _this$voices$ === void 0 ? void 0 : _this$voices$.name) || '';
    this.rate = parseFloat(localStorage.getItem('rate')) || 1;
    this.pitch = parseFloat(localStorage.getItem('pitch')) || 1;
    this.fontSize = parseFloat(localStorage.getItem('ayahFontSize')) || 1;
    this.applyFontSize();
  },
  data() {
    return {
      selectedVoiceName: localStorage.getItem('selectedVoiceName') || '',
      rate: parseFloat(localStorage.getItem('rate')) || 1,
      pitch: parseFloat(localStorage.getItem('pitch')) || 1,
      fontSize: parseFloat(localStorage.getItem('ayahFontSize')) || 1,
      successMessage: false
    };
  },
  computed: {
    formattedFontSize() {
      return this.fontSize.toFixed(1);
    }
  },
  methods: {
    saveSettings() {
      localStorage.setItem('selectedVoiceName', this.selectedVoiceName);
      localStorage.setItem('rate', this.rate);
      localStorage.setItem('pitch', this.pitch);
      localStorage.setItem('ayahFontSize', this.fontSize);
      this.successMessage = true;
      setTimeout(() => this.successMessage = false, 3000);
    },
    increaseFontSize() {
      if (this.fontSize < 2) {
        this.fontSize += 0.1;
        this.applyFontSize();
      }
    },
    decreaseFontSize() {
      if (this.fontSize > 0.5) {
        this.fontSize -= 0.1;
        this.applyFontSize();
      }
    },
    applyFontSize() {
      document.documentElement.style.setProperty('--font-size', `${this.fontSize}em`);
    }
  },
  mounted() {
    // Apply font size on load
    this.applyFontSize();
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/tabs/NavTabs.vue?vue&type=script&defer=true&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/tabs/NavTabs.vue?vue&type=script&defer=true&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'NavTabs'
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/AyahInfo.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/AyahInfo.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'AyahInfo',
  props: {
    information: {
      type: Object,
      required: true
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/BottomAudioPlayer.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/BottomAudioPlayer.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "BottomAudioPlayer",
  props: {
    information: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      error: null
    };
  },
  computed: {
    currentAyah() {
      var _this$information;
      return ((_this$information = this.information) === null || _this$information === void 0 ? void 0 : _this$information.ayah) || null;
    },
    currentAudioSrc() {
      var _this$currentAyah;
      const raw = (_this$currentAyah = this.currentAyah) === null || _this$currentAyah === void 0 ? void 0 : _this$currentAyah.audio_links;
      if (!raw) {
        return null;
      }
      return this.resolveAudioUrl(raw);
    },
    statusMessage() {
      if (this.isLoading) {
        return "Preparing the ayah audio…";
      }
      if (this.error) {
        return this.error;
      }
      if (this.currentAyah) {
        var _this$currentAyah$sur, _this$currentAyah$aya, _this$currentAyah$aya2;
        const surahId = this.currentAyah.surah_id || ((_this$currentAyah$sur = this.currentAyah.surah) === null || _this$currentAyah$sur === void 0 ? void 0 : _this$currentAyah$sur.id);
        const ayahNumber = (_this$currentAyah$aya = this.currentAyah.ayah_id) !== null && _this$currentAyah$aya !== void 0 ? _this$currentAyah$aya : (_this$currentAyah$aya2 = this.currentAyah.ayah) === null || _this$currentAyah$aya2 === void 0 ? void 0 : _this$currentAyah$aya2.ayah_id;
        return `Surah ${surahId || "?"} · Ayah ${ayahNumber || "?"}`;
      }
      return "Select an ayah to hear its recitation.";
    },
    audioLabel() {
      var _ayah$surah;
      const ayah = this.currentAyah;
      if (!ayah) {
        return "Quran audio player";
      }
      const surahId = ayah.surah_id || ((_ayah$surah = ayah.surah) === null || _ayah$surah === void 0 ? void 0 : _ayah$surah.id);
      return `Audio for Surah ${surahId || "?"} Ayah ${ayah.ayah_id || "?"}`;
    }
  },
  methods: {
    resolveAudioUrl(url) {
      try {
        if (/^https?:\/\//i.test(url)) {
          return url;
        }
        return `${window.location.origin}${url}`;
      } catch (err) {
        console.warn("Unable to resolve audio URL", err);
        return url;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/HelpGuideModal.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/HelpGuideModal.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/MainAyah.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/MainAyah.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'AyahTranslation',
  props: {
    information: {
      type: Object,
      required: true
    },
    fontSize: {
      type: Number,
      required: true
    },
    styleObject: Object
  },
  mounted() {
    this.$emit('ayah-text', this.information.ayah.ayah_text);
  },
  computed: {
    styleObject() {
      return {
        lineHeight: '1.4em',
        fontSize: this.fontSize + 'rem' // Use the fontSize prop
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/Translator.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/Translator.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Translator',
  props: {
    translator: {
      type: String,
      required: true
    }
  },
  methods: {
    // You can add methods specific to this component here if needed
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TafseerNote.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TafseerNote.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var primevue_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primevue/editor */ "./node_modules/primevue/editor/editor.esm.js");
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../utils/subscriptionUtils.js */ "./utils/subscriptionUtils.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      inputMode: 'basic',
      option: 0,
      isListening: false,
      isPaused: false,
      recognition: null,
      form: {
        ayah_notes: "",
        surah_name: "",
        ayah_num: "",
        ayah_verse_ar: "",
        ayah_verse_en: "",
        ayah_info: ""
      },
      isAuthenticated: false,
      isVisible: false
    };
  },
  components: {
    Editor: primevue_editor__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  mounted() {
    const {
      success,
      subscriptionType
    } = (0,_utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_4__.checkSubscriptionStatus)();
    if (success) {
      this.isVisible = true; // Show premium features
      if (subscriptionType) {
        this.showSuccessMessage = true; // Show success message
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      }
    }
    this.initRecognition();
    this.isAuthenticated = !!localStorage.getItem('authToken');
    this.initModalReset();
  },
  methods: {
    redirectToMonthlySubscription() {
      (0,_utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_4__.redirectToSubscription)('monthly');
    },
    redirectToYearlySubscription() {
      (0,_utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_4__.redirectToSubscription)('yearly');
    },
    initRecognition() {
      if ('webkitSpeechRecognition' in window) {
        this.recognition = new webkitSpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
        this.recognition.onresult = event => {
          const transcript = Array.from(event.results).map(result => result[0].transcript).join('');
          this.form.ayah_notes = transcript;
        };
        this.recognition.onend = () => {
          this.isListening = false;
        };
        this.recognition.onerror = event => {
          console.error('Speech Recognition Error:', event.error);
          this.isListening = false;
        };
      } else {
        console.error('Speech Recognition not supported in this browser.');
      }
    },
    startRecognition() {
      if (!this.isListening) {
        this.form.ayah_notes = '';
        this.isListening = true;
        this.recognition.start();
      }
    },
    stopRecognition() {
      if (this.isListening) {
        this.recognition.stop();
        this.isListening = false;
      }
    },
    createNote() {
      const formData = {
        surah_name: this.form.surah_name,
        ayah_num: this.form.ayah_num,
        ayah_verse_ar: this.form.ayah_verse_ar,
        ayah_verse_en: this.form.ayah_verse_en,
        ayah_info: this.form.ayah_info,
        ayah_notes: this.form.ayah_notes,
        option: this.option
      };
      sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
        title: "Are you sure?",
        text: "You want to submit this note!",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "#d33",
        confirmButtonText: "Submit!"
      }).then(result => {
        if (result.isConfirmed) {
          axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("api/submit-note", formData).then(res => {
            sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
              icon: "success",
              title: "Success!",
              text: "Your note has been submitted.",
              timer: 1500,
              showConfirmButton: false
            }).then(() => {
              this.resetNoteForm();
              this.closeModal();
            });
          }).catch(err => {
            console.error(err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire("Error", "Login to your account to submit a note.", "error");
            this.resetNoteForm();
            this.closeModal();
          });
        }
      });
    },
    resetNoteForm() {
      this.form.ayah_notes = '';
      this.form.surah_name = '';
      this.inputMode = 'basic';
    },
    showModal() {
      const modalElement = this.$refs.modal;
      const modalInstance = bootstrap__WEBPACK_IMPORTED_MODULE_3__.Modal.getInstance(modalElement) || new bootstrap__WEBPACK_IMPORTED_MODULE_3__.Modal(modalElement);
      modalInstance.show();
    },
    initModalReset() {
      const modalElement = this.$refs.modal;
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.resetNoteForm();
      });
    },
    closeModal() {
      const modalElement = this.$refs.modal;
      const modalInstance = bootstrap__WEBPACK_IMPORTED_MODULE_3__.Modal.getInstance(modalElement) || new bootstrap__WEBPACK_IMPORTED_MODULE_3__.Modal(modalElement);
      modalInstance.hide();
      const modalBackdrops = document.querySelectorAll('.modal-backdrop');
      modalBackdrops.forEach(backdrop => {
        backdrop.parentNode.removeChild(backdrop);
      });
      document.body.classList.remove('modal-open');
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TranslationNote.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TranslationNote.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var primevue_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primevue/editor */ "./node_modules/primevue/editor/editor.esm.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var tinymce_tinymce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tinymce/tinymce */ "./node_modules/tinymce/tinymce.js");
/* harmony import */ var tinymce_tinymce__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(tinymce_tinymce__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var tinymce_themes_silver_theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tinymce/themes/silver/theme */ "./node_modules/tinymce/themes/silver/theme.js");
/* harmony import */ var tinymce_themes_silver_theme__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(tinymce_themes_silver_theme__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var tinymce_icons_default_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tinymce/icons/default/icons */ "./node_modules/tinymce/icons/default/icons.js");
/* harmony import */ var tinymce_icons_default_icons__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(tinymce_icons_default_icons__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var tinymce_plugins_lists__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tinymce/plugins/lists */ "./node_modules/tinymce/plugins/lists/index.js");
/* harmony import */ var tinymce_plugins_lists__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_lists__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../utils/subscriptionUtils.js */ "./utils/subscriptionUtils.js");
/* harmony import */ var _utils_milestones__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../utils/milestones */ "./resources/js/utils/milestones.js");











/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      isVisible: false,
      isAuthenticated: false,
      editorPlaceholder: "Write your personal reflections and notes here. Let your connection to the Quran grow.",
      inputMode: 'basic',
      option: 0,
      isListening: false,
      recognition: null,
      isPaused: false,
      milestoneMessage: '',
      form: {
        ayah_notes: "",
        surah_name: ""
      }
    };
  },
  components: {
    Editor: primevue_editor__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  mounted() {
    const {
      success,
      subscriptionType
    } = (0,_utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_9__.checkSubscriptionStatus)();
    if (success) {
      this.isVisible = true; // Show premium features
      if (subscriptionType) {
        this.showSuccessMessage = true; // Show success message
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      }
    }
    this.initRecognition();
    this.isAuthenticated = !!localStorage.getItem('authToken');
    this.initModalReset();
  },
  methods: {
    redirectToMonthlySubscription() {
      (0,_utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_9__.redirectToSubscription)('monthly');
    },
    redirectToYearlySubscription() {
      (0,_utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_9__.redirectToSubscription)('yearly');
    },
    initRecognition() {
      this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
      this.recognition.onresult = event => {
        const transcript = Array.from(event.results).map(result => result[0].transcript).join('');
        this.form.ayah_notes = transcript;
      };
      this.recognition.onend = () => {
        this.isListening = false;
      };
      this.recognition.onerror = event => {
        console.error('Speech Recognition Error:', event.error);
        this.isListening = false;
      };
    },
    startRecognition() {
      if (!this.isListening) {
        this.form.ayah_notes = '';
        this.isListening = true;
        this.recognition.start();
      }
    },
    stopRecognition() {
      if (this.isListening) {
        this.recognition.stop();
        this.isListening = false;
      }
    },
    createNote() {
      const formData = {
        surah_name: this.form.surah_name,
        ayah_notes: this.form.ayah_notes,
        option: this.option
      };
      sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
        title: "Are you sure?",
        text: "You want to submit this note!",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "#d33",
        confirmButtonText: "Submit!"
      }).then(result => {
        if (result.isConfirmed) {
          axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("api/submit-note", formData).then(res => {
            sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
              icon: "success",
              title: "Success!",
              text: "Your note has been submitted.",
              timer: 1500,
              showConfirmButton: false
            }).then(() => {
              // Milestone tracking: notes created
              const hit = (0,_utils_milestones__WEBPACK_IMPORTED_MODULE_10__.trackAndDetect)('notes_saved', [1, 5, 10, 25, 100], 'persistent');
              if (hit && hit.threshold) {
                if (hit.threshold === 1) {
                  this.milestoneMessage = "First note saved   reflections deepen understanding.";
                } else {
                  this.milestoneMessage = `Beautiful progress   ${hit.threshold} notes captured. Keep reflecting.`;
                }
                this.hideMilestoneAfterDelay();
              }
              this.resetNoteForm();
              this.closeModal();
            });
          }).catch(err => {
            console.error(err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire("Error", "Login to your account to submit a note.", "error");
            this.resetNoteForm();
            this.closeModal();
          });
        }
      });
    },
    hideMilestoneAfterDelay() {
      setTimeout(() => {
        this.milestoneMessage = '';
      }, 3500);
    },
    resetNoteForm() {
      this.form.ayah_notes = '';
      this.form.surah_name = '';
      this.inputMode = 'basic';
    },
    showModal() {
      const modalElement = this.$refs.modal;
      const modalInstance = bootstrap__WEBPACK_IMPORTED_MODULE_8__.Modal.getInstance(modalElement) || new bootstrap__WEBPACK_IMPORTED_MODULE_8__.Modal(modalElement);
      modalInstance.show();
    },
    initModalReset() {
      const modalElement = this.$refs.modal;
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.resetNoteForm();
      });
    },
    closeModal() {
      const modalElement = this.$refs.modal;
      const modalInstance = bootstrap__WEBPACK_IMPORTED_MODULE_8__.Modal.getInstance(modalElement) || new bootstrap__WEBPACK_IMPORTED_MODULE_8__.Modal(modalElement);
      modalInstance.hide();
      const modalBackdrops = document.querySelectorAll('.modal-backdrop');
      modalBackdrops.forEach(backdrop => {
        backdrop.parentNode.removeChild(backdrop);
      });
      document.body.classList.remove('modal-open');
    }
  },
  watch: {
    inputMode(newVal) {
      console.log("Input Mode Changed To:", newVal);
    },
    isListening(newVal) {
      console.log("Listening State Changed:", newVal);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TransliterationNote.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TransliterationNote.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var primevue_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primevue/editor */ "./node_modules/primevue/editor/editor.esm.js");
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../utils/subscriptionUtils.js */ "./utils/subscriptionUtils.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      inputMode: 'basic',
      option: 0,
      isListening: false,
      recognition: null,
      form: {
        ayah_notes: "",
        surah_name: ""
      },
      isAuthenticated: false
    };
  },
  components: {
    Editor: primevue_editor__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  mounted() {
    const {
      success,
      subscriptionType
    } = (0,_utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_4__.checkSubscriptionStatus)();
    if (success) {
      this.isVisible = true; // Show premium features
      if (subscriptionType) {
        this.showSuccessMessage = true; // Show success message
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      }
    }
    this.initRecognition();
    this.isAuthenticated = !!localStorage.getItem('authToken');
    this.initModalReset();
  },
  methods: {
    redirectToMonthlySubscription() {
      (0,_utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_4__.redirectToSubscription)('monthly');
    },
    redirectToYearlySubscription() {
      (0,_utils_subscriptionUtils_js__WEBPACK_IMPORTED_MODULE_4__.redirectToSubscription)('yearly');
    },
    initRecognition() {
      this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
      this.recognition.onresult = event => {
        const transcript = Array.from(event.results).map(result => result[0].transcript).join('');
        this.form.ayah_notes = transcript;
      };
      this.recognition.onend = () => {
        this.isListening = false;
      };
      this.recognition.onerror = event => {
        console.error('Speech Recognition Error:', event.error);
        this.isListening = false;
      };
    },
    startRecognition() {
      if (!this.isListening) {
        this.form.ayah_notes = '';
        this.isListening = true;
        this.recognition.start();
      }
    },
    stopRecognition() {
      if (this.isListening) {
        this.recognition.stop();
        this.isListening = false;
      }
    },
    createNote() {
      if (!this.isAuthenticated) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire("Error", "Login to your account to submit a note.", "error");
        return;
      }
      const formData = {
        surah_name: this.form.surah_name,
        ayah_notes: this.form.ayah_notes,
        option: this.option
      };
      sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
        title: "Are you sure?",
        text: "You want to submit this note!",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "#d33",
        confirmButtonText: "Submit!"
      }).then(result => {
        if (result.isConfirmed) {
          axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("api/submit-note", formData).then(res => {
            sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire({
              icon: "success",
              title: "Success!",
              text: "Your note has been submitted.",
              timer: 1500,
              showConfirmButton: false
            }).then(() => {
              this.resetNoteForm();
              this.closeModal();
            });
          }).catch(err => {
            console.error(err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire("Error", "Failed to submit the note.", "error");
          });
        }
      });
    },
    resetNoteForm() {
      this.form.ayah_notes = '';
      this.form.surah_name = '';
      this.inputMode = 'basic';
    },
    initModalReset() {
      const modalElement = this.$refs.modal;
      if (modalElement && modalElement.addEventListener) {
        modalElement.addEventListener('hidden.bs.modal', () => {
          this.resetNoteForm();
        });
      }
    },
    closeModal() {
      var _modalInstance$hide;
      const modalElement = this.$refs.modal;
      if (!modalElement) return;
      const modalInstance = typeof bootstrap__WEBPACK_IMPORTED_MODULE_3__.Modal !== 'undefined' && bootstrap__WEBPACK_IMPORTED_MODULE_3__.Modal ? bootstrap__WEBPACK_IMPORTED_MODULE_3__.Modal.getInstance(modalElement) || new bootstrap__WEBPACK_IMPORTED_MODULE_3__.Modal(modalElement) : null;
      modalInstance === null || modalInstance === void 0 || (_modalInstance$hide = modalInstance.hide) === null || _modalInstance$hide === void 0 || _modalInstance$hide.call(modalInstance);

      // Clean up any backdrops
      if (typeof document !== 'undefined') {
        var _document$body, _document$body$remove;
        const modalBackdrops = document.querySelectorAll('.modal-backdrop');
        modalBackdrops.forEach(backdrop => {
          var _backdrop$parentNode, _backdrop$parentNode$;
          (_backdrop$parentNode = backdrop.parentNode) === null || _backdrop$parentNode === void 0 || (_backdrop$parentNode$ = _backdrop$parentNode.removeChild) === null || _backdrop$parentNode$ === void 0 || _backdrop$parentNode$.call(_backdrop$parentNode, backdrop);
        });
        (_document$body = document.body) === null || _document$body === void 0 || (_document$body = _document$body.classList) === null || _document$body === void 0 || (_document$body$remove = _document$body.remove) === null || _document$body$remove === void 0 || _document$body$remove.call(_document$body, 'modal-open');
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/screen_capture/ScreenTranslationCapture.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/screen_capture/ScreenTranslationCapture.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html2canvas */ "./node_modules/html2canvas/dist/html2canvas.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(html2canvas__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    targetTranslationRef: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      previewImage: null
    };
  },
  methods: {
    captureTranslation() {
      // Access the target translation element using the ref passed as a prop
      const targetTranslationElement = this.$parent.$refs[this.targetTranslationRef];
      if (!targetTranslationElement) {
        console.error("Invalid element provided as targetTranslationRef");
        return;
      }

      // Store the original padding of the target element
      const originalPadding = targetTranslationElement.style.padding;

      // Set the desired padding
      targetTranslationElement.style.padding = "10px"; // Adjust this value as needed

      const unwantedElements = ['.icon-container, .settings, .summary, .href, .mobile-only, .bar, .pitch, .rate, .container.text-center, ' + '.custom-icon-play, .bi-rewind-circle-fill, .bi-plus, .bi-dash, ' + '.bi-play, .bi-pause, .bi-stop, .custom-icon-decrease, .word-count'];

      // Function to hide elements
      const hideElements = selectorArray => {
        selectorArray.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            el.style.display = 'none';
          });
        });
      };

      // Function to show elements
      const showElements = selectorArray => {
        selectorArray.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            el.style.display = '';
          });
        });
      };

      // Hide unwanted elements before capturing
      hideElements(unwantedElements);
      setTimeout(() => {
        html2canvas__WEBPACK_IMPORTED_MODULE_0___default()(targetTranslationElement, {
          allowTaint: true,
          useCORS: true
        }).then(canvas => {
          const dataUrl = canvas.toDataURL("image/png");

          // Automatically trigger download of the image
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "screenshot.png";
          link.click();

          // Restore visibility of unwanted elements
          showElements(unwantedElements);
        }).catch(error => {
          console.error("Failed to capture screenshot:", error);
          // Ensure to show elements if an error occurs
          showElements(unwantedElements);
        });
      }, 200);
    },
    downloadImage(format) {
      if (!this.previewImage) return;
      const link = document.createElement('a');
      link.download = `screenshot.${format}`;
      if (format === 'jpg') {
        const jpgDataUrl = this.previewImage.replace('image/png', 'image/jpeg');
        link.href = jpgDataUrl;
      } else {
        link.href = this.previewImage;
      }
      link.click();
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/twitter/TwitterShareTransliteration.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/twitter/TwitterShareTransliteration.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    targetElementRef: {
      type: String,
      required: true
    },
    transliterationText: {
      type: String,
      required: true
    }
  },
  methods: {
    shareTransliterationOnTwitter() {
      try {
        const headingText = this.transliterationText;
        if (!headingText) {
          throw new Error('Translated text is not defined');
        }
        const encodedHeading = encodeURIComponent(headingText.trim());
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedHeading}`;
        window.open(twitterUrl, "_blank") || console.error("Failed to open Twitter sharing dialog.");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'WhatsAppShareTransliteration',
  props: {
    transliterationToShare: {
      type: String,
      required: true
    }
  },
  methods: {
    shareTransliterationViaWhatsApp() {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(this.transliterationToShare)}`;
      window.open(url, '_blank');
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QuranComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QuranComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_QuranComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_QuranComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/vue/QuranComponent.vue */ "./resources/components/vue/QuranComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Intro/Title.vue?vue&type=template&id=e8c3362a":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Intro/Title.vue?vue&type=template&id=e8c3362a ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "display-5 fw-bold mb-3"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_1, [...(_cache[0] || (_cache[0] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Quran Companion", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <p class=\"lead container\">Your personal AI-powered Quranic study assistant. Explore advanced tools like voice search, real-time\n    audio highlighting, and daily reflections to deepen your connection with the Quran.\n  </p> ")], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Intro/Welcome.vue?vue&type=template&id=3d833635&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Intro/Welcome.vue?vue&type=template&id=3d833635&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  key: 0,
  "aria-labelledby": "welcome-heading",
  class: "welcome-section",
  role: "tabpanel",
  tabindex: "0"
};
const _hoisted_2 = {
  class: "container"
};
const _hoisted_3 = {
  class: "hero-inner d-none d-lg-flex"
};
const _hoisted_4 = {
  class: "hero-text"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Title = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Title");
  return !$props.information ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["companion-hero container", {
      'animate-in': !$props.information
    }]),
    "aria-labelledby": "companion-heading"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "fw-bold text-left"
  }, "Quran Explorer", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Title, {
    class: "hero-title"
  }), _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    id: "companion-heading",
    class: "hero-copy"
  }, " The Quran Companion page utilizes AI tools and accessibility features to enrich your learning experience. It offers text-to-speech, speech-to-text, synchronized highlighting, and more. ", -1 /* CACHED */))]), _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"hero-visual\" aria-hidden=\"true\" data-v-3d833635><div class=\"hero-ring ring-1\" aria-hidden=\"true\" data-v-3d833635></div><div class=\"hero-ring ring-2\" aria-hidden=\"true\" data-v-3d833635></div><div class=\"hero-ring ring-3\" aria-hidden=\"true\" data-v-3d833635></div><div class=\"hero-center-glow\" aria-hidden=\"true\" data-v-3d833635></div></div>", 1))])], 2 /* CLASS */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/QuranComponent.vue?vue&type=template&id=0c29fec8&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/QuranComponent.vue?vue&type=template&id=0c29fec8&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  id: "app"
};
const _hoisted_2 = {
  class: "py-4 position-relative",
  style: {
    "margin-top": "10px"
  }
};
const _hoisted_3 = {
  key: 0,
  class: "shadow-md pb3"
};
const _hoisted_4 = {
  key: 1,
  class: "next-step-card container"
};
const _hoisted_5 = ["title", "aria-label"];
const _hoisted_6 = {
  class: "d-flex align-items-start gap-3 text-start"
};
const _hoisted_7 = {
  class: "flex-grow-1"
};
const _hoisted_8 = {
  class: "mb-2 next-step-teaser"
};
const _hoisted_9 = {
  class: "mb-3 next-step-text"
};
const _hoisted_10 = {
  href: "/surat",
  class: "btn btn-sm fw-semibold text-white px-3 py-2 next-step-cta"
};
const _hoisted_11 = {
  class: "row"
};
const _hoisted_12 = {
  class: "col-md-4"
};
const _hoisted_13 = {
  class: "pt-4",
  "aria-label": "Surah and verse selection"
};
const _hoisted_14 = {
  class: "selector-control"
};
const _hoisted_15 = {
  key: 0,
  class: "quran-selected-surah-identity",
  role: "status",
  "aria-live": "polite",
  "aria-atomic": "true"
};
const _hoisted_16 = {
  class: "quran-selected-surah-identity-inner d-flex align-items-center flex-nowrap"
};
const _hoisted_17 = {
  key: 0,
  class: "quran-selected-surah-identity-ar text-end",
  dir: "rtl"
};
const _hoisted_18 = {
  class: "quran-selected-surah-identity-en d-flex flex-column text-start flex-grow-1"
};
const _hoisted_19 = {
  class: "quran-selected-surah-identity-en-main d-inline-flex align-items-center"
};
const _hoisted_20 = {
  key: 0,
  class: "quran-selected-surah-identity-number"
};
const _hoisted_21 = {
  class: "quran-selected-surah-identity-title"
};
const _hoisted_22 = {
  key: 0,
  class: "quran-selected-surah-identity-en-sub"
};
const _hoisted_23 = {
  key: 1,
  class: "mt-4"
};
const _hoisted_24 = {
  key: 3,
  class: "tab-content hide-on-mobile-tablet",
  id: "nav-tabContent"
};
const _hoisted_25 = {
  key: 0,
  class: "tab-pane fade show active",
  id: "nav-home",
  role: "tabpanel",
  "aria-labelledby": "nav-home-tab"
};
const _hoisted_26 = {
  class: "row pb-2"
};
const _hoisted_27 = {
  class: "custom-scrollbar pb-3 w-100 ayah-scroll"
};
const _hoisted_28 = ["aria-activedescendant"];
const _hoisted_29 = ["onClick", "id", "aria-selected", "tabindex", "onKeydown"];
const _hoisted_30 = {
  class: "text-right ayah-label"
};
const _hoisted_31 = {
  class: "text-right ayah-text"
};
const _hoisted_32 = {
  class: "col-md-8 card-hide text-left pr-4",
  style: {
    "scroll-margin-top": "24px"
  }
};
const _hoisted_33 = {
  key: 0,
  class: "companion-hero"
};
const _hoisted_34 = {
  key: 1,
  class: "mb-2"
};
const _hoisted_35 = {
  class: "gesture-nav-toggle mb-3"
};
const _hoisted_36 = {
  class: "form-check form-switch mb-0"
};
const _hoisted_37 = ["checked"];
const _hoisted_38 = {
  class: "form-check-label gesture-nav-toggle__label ms-2",
  for: "gesture-navigation-toggle"
};
const _hoisted_39 = {
  class: "card card-teal",
  style: {
    "background-color": "#ffffff",
    "border-radius": "18px",
    "border": "1px solid rgba(2,6,23,0.06)",
    "box-shadow": "0 14px 36px rgba(15, 23, 42, 0.08)",
    "overflow": "hidden",
    "transition": "box-shadow .2s ease"
  }
};
const _hoisted_40 = {
  key: 0
};
const _hoisted_41 = {
  class: "container-fluid"
};
const _hoisted_42 = {
  class: "row"
};
const _hoisted_43 = {
  class: "card-body content card-teal",
  style: {
    "border-radius": "20px",
    "padding": "16px 18px 18px 18px"
  }
};
const _hoisted_44 = {
  class: "tab-content text-center",
  style: {
    "border-radius": "20px",
    "background": "#ffffff"
  }
};
const _hoisted_45 = {
  key: 0,
  class: "tab-pane active content",
  id: "home",
  role: "tabpanel"
};
const _hoisted_46 = {
  class: "visually-hidden",
  "aria-live": "polite",
  "aria-atomic": "true"
};
const _hoisted_47 = {
  key: 0,
  class: "desktop-actions hide-on-mobile mb-3"
};
const _hoisted_48 = {
  key: 0,
  class: "text-center"
};
const _hoisted_49 = {
  class: "row pt-2 text-center"
};
const _hoisted_50 = {
  class: "col desktop-icon",
  style: {
    "cursor": "pointer"
  }
};
const _hoisted_51 = {
  class: "col desktop-icon",
  style: {
    "cursor": "pointer"
  }
};
const _hoisted_52 = ["aria-hidden"];
const _hoisted_53 = {
  key: 0,
  class: "swipe-tip alert py-2 mt-2 d-flex align-items-center justify-content-between mb-0 d-xxl-none",
  role: "alert"
};
const _hoisted_54 = {
  class: "text"
};
const _hoisted_55 = {
  key: 0,
  class: "collapse-content mobile-only"
};
const _hoisted_56 = {
  key: 0,
  class: "card text-bg-light card-body"
};
const _hoisted_57 = {
  key: 1,
  class: "tab-pane content",
  id: "profile",
  role: "tabpanel"
};
const _hoisted_58 = {
  key: 0,
  class: "desktop-actions hide-on-mobile mb-3"
};
const _hoisted_59 = {
  key: 0,
  class: "text-center"
};
const _hoisted_60 = {
  class: "row pt-2"
};
const _hoisted_61 = {
  class: "col desktop-icon",
  style: {
    "cursor": "pointer"
  }
};
const _hoisted_62 = {
  class: "col desktop-icon",
  style: {
    "cursor": "pointer"
  }
};
const _hoisted_63 = {
  class: "dropdown mobile-only"
};
const _hoisted_64 = {
  key: 0,
  class: "swipe-tip alert py-2 mb-2 d-flex align-items-center justify-content-between mb-0 d-xxl-none",
  role: "alert"
};
const _hoisted_65 = {
  key: 0,
  class: "collapse-content mobile-only"
};
const _hoisted_66 = {
  key: 0,
  class: "card text-bg-light card-body"
};
const _hoisted_67 = {
  key: 2,
  class: "tab-pane content",
  id: "messages",
  role: "tabpanel"
};
const _hoisted_68 = {
  class: "pb-3"
};
const _hoisted_69 = {
  key: 0,
  class: "desktop-actions hide-on-mobile mb-3"
};
const _hoisted_70 = {
  key: 0,
  class: "text-center"
};
const _hoisted_71 = {
  class: "row pt-2"
};
const _hoisted_72 = {
  class: "col desktop-icon",
  style: {
    "cursor": "pointer"
  }
};
const _hoisted_73 = {
  class: "col desktop-icon",
  style: {
    "cursor": "pointer"
  }
};
const _hoisted_74 = {
  class: "dropdown mobile-only"
};
const _hoisted_75 = {
  key: 0,
  class: "swipe-tip alert py-2 pb-2 mt-2 d-flex align-items-center justify-content-between mb-0 d-xxl-none",
  role: "alert"
};
const _hoisted_76 = {
  key: 0,
  class: "collapse-content mobile-only"
};
const _hoisted_77 = {
  key: 0,
  class: "card text-bg-light card-body"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AdvancedSearch = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("AdvancedSearch");
  const _component_SurahDropdown = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("SurahDropdown");
  const _component_AyahDropdown = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("AyahDropdown");
  const _component_ErrorAlert = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ErrorAlert");
  const _component_NavTabs = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("NavTabs");
  const _component_TranslationSection = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("TranslationSection");
  const _component_TranslationActions = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("TranslationActions");
  const _component_TafseerSection = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("TafseerSection");
  const _component_TafseerActions = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("TafseerActions");
  const _component_SurahInfoModal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("SurahInfoModal");
  const _component_TransliterationSection = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("TransliterationSection");
  const _component_TransliterationActions = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("TransliterationActions");
  const _component_CorrectionModal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CorrectionModal");
  const _component_TranslationNote = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("TranslationNote");
  const _component_TafseerNote = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("TafseerNote");
  const _component_TransliterationNote = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("TransliterationNote");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [!_ctx.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <h4 class=\"fw-bold text-center pt-2 mb-2 container\" v-if=\"information != null\">Search for a word in the\n                    Quran...</h4> "), _ctx.information != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_AdvancedSearch, {
    key: 0,
    onInputChange: _ctx.handleInputChange
  }, null, 8 /* PROPS */, ["onInputChange"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.information ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    title: _ctx.nextStepMinimized ? 'Restore' : 'Minimize',
    "aria-label": _ctx.nextStepMinimized ? 'Restore next step' : 'Minimize next step',
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toggleNextStepMinimized && _ctx.toggleNextStepMinimized(...args)),
    class: "next-step-toggle"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", _ctx.nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_5), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "flex-shrink-0 mt-1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "next-step-icon-circle"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-headphones",
    "aria-hidden": "true"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-2 fw-semibold text-uppercase next-step-eyebrow"
  }, " NEXT STEP ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [...(_cache[33] || (_cache[33] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/surat",
    class: "fw-semibold text-decoration-none next-step-link"
  }, " Listen to Qur’anic recitations ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-up-right-from-square ms-1 next-step-link-icon"
  }, null, -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, _ctx.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, [...(_cache[34] || (_cache[34] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" As-salaamu alaikum if this is your first deep dive into Islam, let the verses you just read continue to surround you. Slip over to our curated ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/surat",
    class: "fw-semibold text-decoration-none next-step-link"
  }, " recitation list ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" and hear the Qur’an with translations that keep every word close. ", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !_ctx.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", _hoisted_10, [...(_cache[35] || (_cache[35] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Listen Now ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-up-right-from-square ms-2"
  }, null, -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !_ctx.nextStepMinimized]])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <custom-surah-selection v-if=\"information != null\" :customSurat=\"customSuratList\" v-model=\"selectedSurah\"></custom-surah-selection> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" accordion headers "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"row\">\n                    <div class=\"col-12 col-md-6\">\n                        <SurahDropdown v-if=\"!selectedSurahId\" class=\"pt-1\" :selectedSurah=\"selectedSurahId\"\n                            :filteredSurah=\"filteredSurah\" :surat=\"surat\" @update:selectedSurah=\"updateSelectedSurah\"\n                            @fetchAyat=\"getAyat\" />\n                    </div>\n                    <div class=\"col-12 col-md-6\">\n                        <HelpGuideModal />\n                    </div>\n                </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_13, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "selector-heading"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SurahDropdown, {
    "aria-labelledby": "surah-select-label",
    class: "col-md-12",
    selectedSurah: _ctx.selectedSurahId,
    filteredSurah: _ctx.filteredSurah,
    surat: _ctx.surat,
    "onUpdate:selectedSurah": _ctx.updateSelectedSurah,
    onFetchAyat: _ctx.getAyat
  }, null, 8 /* PROPS */, ["selectedSurah", "filteredSurah", "surat", "onUpdate:selectedSurah", "onFetchAyat"])]), _ctx.selectedSurahMeta ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_ctx.selectedSurahMeta.arabicName ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.selectedSurahMeta.arabicName), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_19, [_ctx.selectedSurahMeta.number ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.selectedSurahMeta.number) + ". ", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.selectedSurahMeta.englishName), 1 /* TEXT */)]), _ctx.selectedSurahMeta.translationName ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.selectedSurahMeta.translationName), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.information != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, [...(_cache[38] || (_cache[38] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "selector-heading"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    id: "ayah-select-label",
    class: "fw-bold text-left mb-1"
  }, "Select a Verse"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "field-helper"
  }, " Tap or click a verse below to focus the translation panel. ")], -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.ayah == null && !_ctx.dropdownHidden ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_AyahDropdown, {
    key: 2,
    "aria-labelledby": "ayah-select-label",
    selectedSurahId: _ctx.selectedSurahId,
    dropdownHidden: _ctx.dropdownHidden,
    onUpdateInformation: _ctx.updateInformation,
    onUpdateTafseer: _ctx.updateTafseer,
    class: "ayah-dropdown-hidden-on-desktop d-block d-md-none"
  }, null, 8 /* PROPS */, ["selectedSurahId", "dropdownHidden", "onUpdateInformation", "onUpdateTafseer"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" List of Ayat for Surah (desktop) "), _ctx.ayah == null && !_ctx.dropdownHidden ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_24, [_ctx.ayah == null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Error alert "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ErrorAlert, {
    showError: _ctx.showError,
    onDismissError: _ctx.dismissError
  }, null, 8 /* PROPS */, ["showError", "onDismissError"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", {
    class: "col-md-12 pb-3 list-group root ayah-list",
    id: "toggle",
    ref: "ayahList",
    role: "listbox",
    tabindex: "0",
    "aria-activedescendant": _ctx.selectedIndexAyah >= 0 ? `ayah-option-${_ctx.selectedIndexAyah}` : null,
    "aria-label": "Ayah list",
    "aria-controls": "ayah-content"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.ayat, (ayah, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: ayah.id || index,
      onClick: $event => _ctx.selectAyah(index),
      role: "option",
      id: `ayah-option-${index}`,
      "aria-selected": _ctx.selectedIndexAyah === index,
      tabindex: _ctx.selectedIndexAyah === index ? 0 : -1,
      onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.selectAyah(index), ["prevent"]), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => _ctx.selectAyah(index), ["prevent"]), ["space"])],
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["ayah-item", {
        selected: _ctx.selectedIndexAyah === index || _ctx.verseNumber && parseInt(_ctx.verseNumber) === ayah.ayah_id
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_30, " Verse: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ayah.ayah_id), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ayah.ayah_text), 1 /* TEXT */)], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_29);
  }), 128 /* KEYED_FRAGMENT */))], 8 /* PROPS */, _hoisted_28)])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [_ctx.information == null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_33, [...(_cache[40] || (_cache[40] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"hero-inner d-flex\" data-v-0c29fec8><div class=\"hero-text\" data-v-0c29fec8><div class=\"hero-eyebrow fw-semibold text-uppercase\" data-v-0c29fec8>Quran Companion</div><h2 class=\"hero-title fw-bolder\" data-v-0c29fec8>Quran Explorer</h2><p class=\"hero-copy mb-0\" data-v-0c29fec8> The Quran Companion page utilizes AI tools and accessibility features to enrich your learning experience. It offers text-to-speech, speech-to-text, synchronized highlighting, and more. </p></div><div class=\"hero-visual d-none d-md-flex\" data-v-0c29fec8><div class=\"hero-ring ring-1\" data-v-0c29fec8></div><div class=\"hero-ring ring-2\" data-v-0c29fec8></div><div class=\"hero-ring ring-3\" data-v-0c29fec8></div></div></div>", 1)]))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <h4 class=\"fw-bold text-center\" >Verse Breakdown...</h4> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" breakdown content here ")])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "gesture-nav-toggle__copy text-start"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "gesture-nav-toggle__title mb-1"
  }, "Gesture Navigation"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    id: "gesture-navigation-hint",
    class: "gesture-nav-toggle__hint mb-0"
  }, " Swipe left or right to move between verses. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "gesture-navigation-toggle",
    class: "form-check-input gesture-nav-toggle__input",
    type: "checkbox",
    checked: _ctx.gestureNavigationEnabled,
    "aria-describedby": "gesture-navigation-hint",
    onChange: _cache[1] || (_cache[1] = (...args) => _ctx.handleGestureNavigationToggle && _ctx.handleGestureNavigationToggle(...args))
  }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_37), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.gestureNavigationEnabled ? 'On' : 'Off'), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [_ctx.information != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_NavTabs)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <Welcome :information=\"information\" /> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Translation Section "), _ctx.information != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Screen reader live region for announcing selection changes "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.screenReaderMessage), 1 /* TEXT */), !_ctx.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_47, [_ctx.isOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-file-earmark-text text-right mr-2 h4",
    "data-bs-placement": "top",
    title: "Write a note",
    onClick: _cache[2] || (_cache[2] = $event => _ctx.openModal('translationNote'))
  }), _cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "icon-text pt-2"
  }, "Write a Note", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    onClick: _cache[3] || (_cache[3] = (...args) => _ctx.submitForm && _ctx.submitForm(...args)),
    class: "bi bi-bookmark text-right mr-2 h4",
    title: "Bookmark verse"
  }), _cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "icon-text pt-2"
  }, "Bookmark", -1 /* CACHED */))]), _cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col desktop-icon",
    style: {
      "cursor": "pointer"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    title: "Give feedback",
    "data-bs-toggle": "modal",
    "data-bs-target": "#exampleModal",
    class: "bi bi-chat-left-text desktop-icon text-right mr-2 h4",
    "data-bs-placement": "top"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "icon-text pt-2"
  }, "Feedback")], -1 /* CACHED */))]), _cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", {
    style: {
      "border": "1px solid #e5e7eb",
      "margin": "10px 0 0 0"
    }
  }, null, -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" mobile navigation  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dropdown mobile-only pb-2",
    "aria-hidden": !_ctx.isMobile
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile/Tablet tip: swipe between verses "), _ctx.showSwipeTip ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_53, [_cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center overflow-hidden"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-truncate"
  }, "Swipe left or right to change verses")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close ms-2 flex-shrink-0",
    "aria-label": "Close",
    onClick: _cache[4] || (_cache[4] = (...args) => _ctx.dismissSwipeTip && _ctx.dismissSwipeTip(...args))
  })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" brief swipe success notice "), _ctx.showSwipeNotice ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 1,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["swipe-notice", _ctx.swipeNoticeDir === 'next' ? 'right' : 'left']),
    role: "status",
    "aria-live": "polite"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(_ctx.swipeNoticeDir === 'next' ? 'bi bi-arrow-right-short' : 'bi bi-arrow-left-short')
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_54, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.swipeNoticeText), 1 /* TEXT */)], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 8 /* PROPS */, _hoisted_52), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" dropdown mobile content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: _ctx.lastSwipeDir === 'next' ? 'swipe-next' : 'swipe-prev'
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "pt-2 swipe-surface",
      ref: "targetTranslationElement",
      key: _ctx.selectedAyah,
      onTouchstart: _cache[5] || (_cache[5] = $event => _ctx.handleTouchStart($event)),
      onTouchmove: _cache[6] || (_cache[6] = (...args) => _ctx.handleTouchMove && _ctx.handleTouchMove(...args)),
      onTouchend: _cache[7] || (_cache[7] = $event => _ctx.handleTouchEnd($event)),
      onTouchcancel: _cache[8] || (_cache[8] = $event => _ctx.handleTouchEnd($event)),
      onPointerdown: _cache[9] || (_cache[9] = (...args) => _ctx.handlePointerDown && _ctx.handlePointerDown(...args)),
      onPointermove: _cache[10] || (_cache[10] = (...args) => _ctx.handlePointerMove && _ctx.handlePointerMove(...args)),
      onPointerup: _cache[11] || (_cache[11] = (...args) => _ctx.handlePointerUp && _ctx.handlePointerUp(...args)),
      onWheelPassive: _cache[12] || (_cache[12] = (...args) => _ctx.handleWheelTranslation && _ctx.handleWheelTranslation(...args))
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_TranslationSection, {
      ref: "translationSection",
      currentAyah: _ctx.currentAyah,
      isVisible: !_ctx.isVisible,
      information: _ctx.information,
      isFullScreen: _ctx.isFullScreen,
      expanded: _ctx.expanded,
      showMoreLink: _ctx.showMoreLink,
      showAlertText: _ctx.showAlertText,
      showAlert: _ctx.showAlert,
      showErrorAlert: _ctx.showErrorAlert,
      showAlertTextNote: _ctx.showAlertTextNote,
      isPlaying: _ctx.isPlaying,
      onHighlightText: _ctx.highlightText,
      onClearHighlight: _ctx.clearHighlight,
      onToggleChange: _ctx.saveToggleState,
      onToggleFullScreen: _ctx.toggleFullScreen,
      onToggleExpand: _ctx.toggleExpand,
      onCloseAlertText: _ctx.closeAlertText,
      onToggleAudio: _ctx.toggleAudioPlayback,
      onUpdateSuccessMessage: _ctx.updateSuccessMessage
    }, null, 8 /* PROPS */, ["currentAyah", "isVisible", "information", "isFullScreen", "expanded", "showMoreLink", "showAlertText", "showAlert", "showErrorAlert", "showAlertTextNote", "isPlaying", "onHighlightText", "onClearHighlight", "onToggleChange", "onToggleFullScreen", "onToggleExpand", "onCloseAlertText", "onToggleAudio", "onUpdateSuccessMessage"])], 32 /* NEED_HYDRATION */))]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["name"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-if=\"!isVisible\" class=\"container-fluid text-center mobile-only\">\n                                                <div class=\"row\">\n                                                    <div class=\"col\">\n                                                        <i :class=\"isOpen\n                                                            ? 'bi bi-x-circle'\n                                                            : 'bi bi-plus-circle-fill'\n                                                            \" class=\"text-center mobile-only h3 pt-3\"\n                                                            @click=\"toggleContent\"></i>\n                                                    </div>\n                                                </div>\n                                            </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" toolbar mobile "), _ctx.isOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_55, [!_ctx.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_56, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_TranslationActions, {
    targetTranslationRef: 'targetTranslationElement',
    translation: _ctx.translation,
    information: _ctx.information,
    onOpenModal: _ctx.openModal,
    onSubmitForm: _ctx.submitForm,
    onToggleAudio: _ctx.toggleAudioPlayback
  }, null, 8 /* PROPS */, ["translation", "information", "onOpenModal", "onSubmitForm", "onToggleAudio"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Tafseer Section "), _ctx.information != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_57, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [!_ctx.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_58, [_ctx.isOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_59, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_60, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-file-earmark-text text-right mr-2 h4",
    "aria-expanded": "false",
    "data-bs-placement": "top",
    title: "Write a note",
    onClick: _cache[13] || (_cache[13] = $event => _ctx.openModal('tafseerNote'))
  }), _cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col desktop-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "icon-text pt-2 mb-2"
  }, "Write a Note")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    onClick: _cache[14] || (_cache[14] = (...args) => _ctx.submitFormTafseer && _ctx.submitFormTafseer(...args)),
    class: "bi bi-bookmark text-right mr-2 h4",
    "aria-expanded": "false",
    "data-bs-placement": "top",
    title: "Bookmark verse"
  }), _cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col desktop-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "icon-text pt-2 mb-2"
  }, "Bookmark")], -1 /* CACHED */))]), _cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col desktop-icon",
    style: {
      "cursor": "pointer"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    title: "Give feedback",
    "data-bs-toggle": "modal",
    "data-bs-target": "#exampleModal",
    class: "bi bi-chat-left-text text-right mr-2 h4",
    "aria-expanded": "false",
    "data-bs-placement": "top"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col desktop-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "icon-text pt-2 mb-2"
  }, "Feedback")])], -1 /* CACHED */))]), _cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", {
    style: {
      "border": "1px solid #e5e7eb",
      "margin": "10px 0 0 0"
    }
  }, null, -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" mobile navigation  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile/Tablet tip: swipe between verses "), _ctx.showSwipeTip ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_64, [_cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center overflow-hidden"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-truncate"
  }, "Swipe left or right to change verses")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close ms-2 flex-shrink-0",
    "aria-label": "Close",
    onClick: _cache[15] || (_cache[15] = (...args) => _ctx.dismissSwipeTip && _ctx.dismissSwipeTip(...args))
  })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main content  "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: _ctx.lastSwipeDir === 'next' ? 'swipe-next' : 'swipe-prev'
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "pt-2 swipe-surface",
      ref: "targetTafseerElement",
      key: _ctx.selectedAyah,
      onTouchstart: _cache[16] || (_cache[16] = $event => _ctx.handleTouchStart($event)),
      onTouchmove: _cache[17] || (_cache[17] = (...args) => _ctx.handleTouchMove && _ctx.handleTouchMove(...args)),
      onTouchend: _cache[18] || (_cache[18] = $event => _ctx.handleTouchEnd($event)),
      onPointerdown: _cache[19] || (_cache[19] = (...args) => _ctx.handlePointerDown && _ctx.handlePointerDown(...args)),
      onPointermove: _cache[20] || (_cache[20] = (...args) => _ctx.handlePointerMove && _ctx.handlePointerMove(...args)),
      onPointerup: _cache[21] || (_cache[21] = (...args) => _ctx.handlePointerUp && _ctx.handlePointerUp(...args)),
      onWheelPassive: _cache[22] || (_cache[22] = (...args) => _ctx.handleWheelTafseer && _ctx.handleWheelTafseer(...args))
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_TafseerSection, {
      ref: "tafseerSection",
      currentAyah: _ctx.currentAyah,
      isVisible: !_ctx.isVisible,
      information: _ctx.information,
      isFullScreen: _ctx.isFullScreen,
      expanded: _ctx.expanded,
      showMoreLink: _ctx.showMoreLink,
      showAlertText: _ctx.showAlertText,
      showAlert: _ctx.showAlert,
      showErrorAlert: _ctx.showErrorAlert,
      showAlertTextNote: _ctx.showAlertTextNote,
      isPlaying: _ctx.isPlaying,
      onHighlightText: _ctx.highlightText,
      onClearHighlight: _ctx.clearHighlight,
      onToggleChange: _ctx.saveToggleState,
      onToggleFullScreen: _ctx.toggleFullScreen,
      onToggleExpand: _ctx.toggleExpand,
      onCloseAlertText: _ctx.closeAlertText,
      onToggleAudio: _ctx.toggleAudioPlayback,
      onUpdateSuccessMessage: _ctx.updateSuccessMessage
    }, null, 8 /* PROPS */, ["currentAyah", "isVisible", "information", "isFullScreen", "expanded", "showMoreLink", "showAlertText", "showAlert", "showErrorAlert", "showAlertTextNote", "isPlaying", "onHighlightText", "onClearHighlight", "onToggleChange", "onToggleFullScreen", "onToggleExpand", "onCloseAlertText", "onToggleAudio", "onUpdateSuccessMessage"])], 32 /* NEED_HYDRATION */))]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["name"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-if=\"!isVisible\" class=\"container-fluid text-center mobile-only\">\n                                            <div class=\"row\">\n                                                <div class=\"col\">\n                                                    <i :class=\"isOpen\n                                                        ? 'bi bi-x-circle'\n                                                        : 'bi bi-plus-circle-fill'\n                                                        \" class=\"text-center mobile-only h3 pt-3\"\n                                                        @click=\"toggleContent\"></i>\n                                                </div>\n                                            </div>\n                                        </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" toolbar mobile "), _ctx.isOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_65, [!_ctx.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_66, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_TafseerActions, {
    targetTafseerRef: 'targetTafseerElement',
    tafseer: _ctx.tafseer,
    information: _ctx.information,
    onOpenModal: _ctx.openModal,
    onSubmitForm: _ctx.submitFormTafseer,
    onToggleAudio: _ctx.toggleAudioPlayback
  }, null, 8 /* PROPS */, ["tafseer", "information", "onOpenModal", "onSubmitForm", "onToggleAudio"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SurahInfoModal, {
    information: _ctx.information
  }, null, 8 /* PROPS */, ["information"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Transliteration Section "), _ctx.information != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_67, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Ayah Controls "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" desktop top features "), !_ctx.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_69, [_ctx.isOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_70, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-file-earmark-text text-right mr-2 h4",
    "aria-expanded": "false",
    "data-bs-placement": "top",
    title: "Write a note",
    onClick: _cache[23] || (_cache[23] = $event => _ctx.openModal('transliterationNote'))
  }), _cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col desktop-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "icon-text pt-2 mb-2"
  }, "Write a Note")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    onClick: _cache[24] || (_cache[24] = (...args) => _ctx.submitFormTransliteration && _ctx.submitFormTransliteration(...args)),
    class: "bi bi-bookmark text-right mr-2 h4",
    "aria-expanded": "false",
    title: "Bookmark verse"
  }), _cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col desktop-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "icon-text pt-2 mb-2"
  }, "Bookmark")], -1 /* CACHED */))]), _cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col desktop-icon",
    style: {
      "cursor": "pointer"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    title: "Give feedback",
    "data-bs-toggle": "modal",
    "data-bs-target": "#exampleModal",
    class: "bi bi-chat-left-text text-right mr-2 h4",
    "aria-expanded": "false",
    "data-bs-placement": "top"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col desktop-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "icon-text pt-2 mb-2"
  }, "Feedback")])], -1 /* CACHED */))]), _cache[55] || (_cache[55] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", {
    style: {
      "border": "1px solid #e5e7eb",
      "margin": "10px 0 0 0"
    }
  }, null, -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" mobile navigation "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_74, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile/Tablet tip: swipe between verses "), _ctx.showSwipeTip ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_75, [_cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center overflow-hidden"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "text-truncate"
  }, "Swipe left or right to change verses")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close ms-2 flex-shrink-0",
    "aria-label": "Close",
    onClick: _cache[25] || (_cache[25] = (...args) => _ctx.dismissSwipeTip && _ctx.dismissSwipeTip(...args))
  })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: _ctx.lastSwipeDir === 'next' ? 'swipe-next' : 'swipe-prev'
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      ref: "targetTransliterationElement",
      class: "swipe-surface",
      key: _ctx.selectedAyah,
      onTouchstart: _cache[26] || (_cache[26] = $event => _ctx.handleTouchStart($event)),
      onTouchmove: _cache[27] || (_cache[27] = (...args) => _ctx.handleTouchMove && _ctx.handleTouchMove(...args)),
      onTouchend: _cache[28] || (_cache[28] = $event => _ctx.handleTouchEnd($event)),
      onPointerdown: _cache[29] || (_cache[29] = (...args) => _ctx.handlePointerDown && _ctx.handlePointerDown(...args)),
      onPointermove: _cache[30] || (_cache[30] = (...args) => _ctx.handlePointerMove && _ctx.handlePointerMove(...args)),
      onPointerup: _cache[31] || (_cache[31] = (...args) => _ctx.handlePointerUp && _ctx.handlePointerUp(...args)),
      onWheelPassive: _cache[32] || (_cache[32] = (...args) => _ctx.handleWheelTransliteration && _ctx.handleWheelTransliteration(...args))
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_TransliterationSection, {
      ref: "transliterationSection",
      currentAyah: _ctx.currentAyah,
      isVisible: !_ctx.isVisible,
      information: _ctx.information,
      isFullScreen: _ctx.isFullScreen,
      expanded: _ctx.expanded,
      showMoreLink: _ctx.showMoreLink,
      showAlertText: _ctx.showAlertText,
      showAlert: _ctx.showAlert,
      showErrorAlert: _ctx.showErrorAlert,
      showAlertTextNote: _ctx.showAlertTextNote,
      isPlaying: _ctx.isPlaying,
      onHighlightText: _ctx.highlightText,
      onClearHighlight: _ctx.clearHighlight,
      onToggleChange: _ctx.saveToggleState,
      onToggleFullScreen: _ctx.toggleFullScreen,
      onToggleExpand: _ctx.toggleExpand,
      onCloseAlertText: _ctx.closeAlertText,
      onToggleAudio: _ctx.toggleAudioPlayback
    }, null, 8 /* PROPS */, ["currentAyah", "isVisible", "information", "isFullScreen", "expanded", "showMoreLink", "showAlertText", "showAlert", "showErrorAlert", "showAlertTextNote", "isPlaying", "onHighlightText", "onClearHighlight", "onToggleChange", "onToggleFullScreen", "onToggleExpand", "onCloseAlertText", "onToggleAudio"])], 32 /* NEED_HYDRATION */))]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["name"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div v-if=\"!isVisible\" class=\"container-fluid text-center mobile-only\">\n                                                <div class=\"row\">\n                                                    <div class=\"col\">\n                                                        <i :class=\"isOpen\n                                                            ? 'bi bi-x-circle'\n                                                            : 'bi bi-plus-circle-fill'\n                                                            \" class=\"text-center mobile-only h3 pt-3\"\n                                                            @click=\"toggleContent\"></i>\n                                                    </div>\n                                                </div>\n                                            </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" toolbar mobile "), _ctx.isOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_76, [!_ctx.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_77, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_TransliterationActions, {
    targetTransliterationRef: 'targetTransliterationElement',
    transliteration: _ctx.information ? _ctx.information.transliteration : '',
    isVisible: !_ctx.isVisible,
    onOpenModal: _ctx.openModal,
    onSubmitForm: _ctx.submitFormTransliteration,
    onToggleAudio: _ctx.toggleAudioPlayback
  }, null, 8 /* PROPS */, ["transliteration", "isVisible", "onOpenModal", "onSubmitForm", "onToggleAudio"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" end toolbar mobile "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SurahInfoModal, {
    information: _ctx.information
  }, null, 8 /* PROPS */, ["information"])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CorrectionModal), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modals "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_TranslationNote, {
    ref: "translationNote",
    information: _ctx.modalInformation
  }, null, 8 /* PROPS */, ["information"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_TafseerNote, {
    ref: "tafseerNote",
    information: _ctx.modalInformation
  }, null, 8 /* PROPS */, ["information"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_TransliterationNote, {
    ref: "transliterationNote",
    information: _ctx.modalInformation
  }, null, 8 /* PROPS */, ["information"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TafseerActions.vue?vue&type=template&id=7c79239f":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TafseerActions.vue?vue&type=template&id=7c79239f ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "row"
};
const _hoisted_2 = {
  class: "d-flex flex-wrap justify-content-between align-items-center text-center"
};
const _hoisted_3 = {
  class: "icon-container d-flex flex-column align-items-center"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Note Icon "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-file-earmark-text h3",
    "aria-expanded": "false",
    "data-bs-placement": "top",
    title: "Write a note",
    onClick: _cache[0] || (_cache[0] = $event => _ctx.$emit('openModal', 'tafseerNote'))
  }), _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "small mt-1"
  }, "Write a note", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Surah Info "), _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "icon-container d-flex flex-column align-items-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-info-circle h4 mr-2 pl-2",
    "data-bs-toggle": "modal",
    "data-bs-target": "#translationInfo",
    "aria-expanded": "false",
    "data-bs-placement": "top",
    title: "Surah info"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "small mt-1"
  }, "Surah info")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Bug Report Icon "), _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "icon-container d-flex flex-column align-items-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    title: "Report a bug",
    "data-bs-toggle": "modal",
    "data-bs-target": "#exampleModal",
    class: "bi bi-chat-left-text h4",
    "aria-expanded": "false",
    "data-bs-placement": "top"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "small mt-1"
  }, "Report a bug")], -1 /* CACHED */))])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TafseerSection.vue?vue&type=template&id=3f4b2587&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TafseerSection.vue?vue&type=template&id=3f4b2587&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  ref: "targetTafseerElement"
};
const _hoisted_2 = {
  class: "swipeable-div w-100"
};
const _hoisted_3 = {
  class: "row"
};
const _hoisted_4 = {
  class: "col-md-12"
};
const _hoisted_5 = {
  class: "row text-left mt-2"
};
const _hoisted_6 = {
  class: "col-md-11 col-10"
};
const _hoisted_7 = {
  key: 0,
  class: "fw-bold pt-2 hide-on-mobile-tablet"
};
const _hoisted_8 = ["innerHTML"];
const _hoisted_9 = {
  key: 1,
  class: "row collapse pt-3 pb-2",
  id: "collapseExample"
};
const _hoisted_10 = {
  class: "d-flex flex-wrap gap-2 pb-2"
};
const _hoisted_11 = {
  key: 0,
  class: "container voice-settings p-3 rounded shadow-sm",
  style: {
    "background-color": "#f8f9fa"
  }
};
const _hoisted_12 = {
  class: "d-flex flex-column flex-md-row gap-3 align-items-start align-items-md-center"
};
const _hoisted_13 = {
  class: "d-flex flex-column flex-grow-1"
};
const _hoisted_14 = ["value"];
const _hoisted_15 = {
  class: "d-flex flex-column flex-grow-1"
};
const _hoisted_16 = ["value"];
const _hoisted_17 = {
  class: "d-flex flex-column flex-grow-1"
};
const _hoisted_18 = ["value"];
const _hoisted_19 = {
  key: 0,
  class: "col-md-1 col-2 d-flex align-items-center justify-content-center flex-column vertical-actions"
};
const _hoisted_20 = {
  class: "mt-4"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AyahInfo = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("AyahInfo");
  const _component_MainAyah = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("MainAyah");
  const _component_BottomAudioPlayer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("BottomAudioPlayer");
  const _component_AlertModal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("AlertModal");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["w-100 my-element", {
      'full-screen': $props.isFullScreen
    }])
  }, [$props.isFullScreen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleFullScreen && $options.toggleFullScreen(...args)),
    class: "close-button mb-3 text-left btn btn-secondary"
  }, " Close ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_AyahInfo, {
    information: $props.information
  }, null, 8 /* PROPS */, ["information"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_MainAyah, {
    information: $props.information
  }, null, 8 /* PROPS */, ["information"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_ctx.ayah == null && !_ctx.dropdownHidden ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("h3", _hoisted_7, "Tafseer:")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "ayah-translation",
    innerHTML: $data.renderedText,
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)([{
      "color": "dimgrey"
    }, {
      fontSize: $data.fontSize + 'em',
      lineHeight: '1.6em'
    }])
  }, null, 12 /* STYLE, PROPS */, _hoisted_8), _cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "tafseer-credit"
  }, "Tafseer by Tafsir Ibn Kathir", -1 /* CACHED */)), !$options.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-dark btn-sm px-3 py-2",
    onClick: _cache[1] || (_cache[1] = (...args) => $options.downloadAsCsv && $options.downloadAsCsv(...args))
  }, [...(_cache[19] || (_cache[19] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-filetype-csv pr-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("CSV Export ", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-dark btn-sm px-3 py-2",
    onClick: _cache[2] || (_cache[2] = (...args) => $options.downloadAsWord && $options.downloadAsWord(...args))
  }, [...(_cache[20] || (_cache[20] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-filetype-docx pr-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("DOCX Export ", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-dark btn-sm px-3 py-2",
    onClick: _cache[3] || (_cache[3] = (...args) => $options.downloadAsExport && $options.downloadAsExport(...args))
  }, [...(_cache[21] || (_cache[21] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-filetype-json pr-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("JSON Export ", -1 /* CACHED */)]))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.showOptions ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Rate "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      for: "speech-rate",
      class: "form-label fw-bold mb-1"
    }, "Rate", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      id: "speech-rate",
      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.speechRate = $event),
      class: "form-select",
      "aria-label": "Select speech rate",
      title: "Adjust speech speed"
    }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.rates, rate => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
        key: rate,
        value: rate
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(rate) + "x", 9 /* TEXT, PROPS */, _hoisted_14);
    }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.speechRate]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Pitch "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      for: "speech-pitch",
      class: "form-label fw-bold mb-1"
    }, "Pitch", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      id: "speech-pitch",
      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.speechPitch = $event),
      class: "form-select",
      "aria-label": "Select speech pitch",
      title: "Adjust speech tone"
    }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.pitches, pitch => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
        key: pitch,
        value: pitch
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(pitch) + "x", 9 /* TEXT, PROPS */, _hoisted_16);
    }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.speechPitch]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Voice "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      for: "speech-voice",
      class: "form-label fw-bold mb-1"
    }, "Voice", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      id: "speech-voice",
      "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $data.selectedVoice = $event),
      class: "form-select",
      "aria-label": "Select voice",
      title: "Choose voice for speech"
    }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.voices.filter(v => !v.name.includes('Google')), voice => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
        key: voice.name,
        value: voice.name
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(voice.name), 9 /* TEXT, PROPS */, _hoisted_18);
    }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedVoice]])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Icons Column (Stacked Vertically) "), !$options.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Play/Pause Button "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    onClick: _cache[7] || (_cache[7] = (...args) => $options.toggleSpeech && $options.toggleSpeech(...args)),
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['bi', $data.isReading ? $data.isPaused ? 'bi-play-fill' : 'bi-pause-fill' : 'bi-play-fill', 'action-circle']),
    role: "button",
    tabindex: 0,
    "aria-label": "Play or pause translation audio",
    onKeydown: [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.toggleSpeech && $options.toggleSpeech(...args), ["prevent"]), ["enter"])), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.toggleSpeech && $options.toggleSpeech(...args), ["prevent"]), ["space"]))],
    title: "Play/Pause Translation Audio"
  }, null, 34 /* CLASS, NEED_HYDRATION */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Stop Button, visible only after Play button is clicked "), $data.isReading && !$data.isPaused ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", {
    key: 0,
    onClick: _cache[10] || (_cache[10] = (...args) => $options.stopReading && $options.stopReading(...args)),
    class: "bi bi-stop-fill action-circle",
    role: "button",
    tabindex: 0,
    "aria-label": "Stop reading audio",
    onKeydown: [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.stopReading && $options.stopReading(...args), ["prevent"]), ["enter"])), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.stopReading && $options.stopReading(...args), ["prevent"]), ["space"]))],
    title: "Stop Translation Audio"
  }, null, 32 /* NEED_HYDRATION */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Increase Font Size "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus action-circle icon-plus",
    role: "button",
    tabindex: 0,
    "aria-label": "Increase text size",
    onClick: _cache[13] || (_cache[13] = (...args) => $options.increaseFontSize && $options.increaseFontSize(...args)),
    onKeydown: [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.increaseFontSize && $options.increaseFontSize(...args), ["prevent"]), ["enter"])), _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.increaseFontSize && $options.increaseFontSize(...args), ["prevent"]), ["space"]))],
    "data-bs-toggle": "tooltip",
    "data-bs-placement": "top",
    title: "Increase text size"
  }, null, 32 /* NEED_HYDRATION */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Decrease Font Size "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-dash action-circle icon-minus",
    role: "button",
    tabindex: 0,
    "aria-label": "Decrease text size",
    onClick: _cache[16] || (_cache[16] = (...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args)),
    onKeydown: [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args), ["prevent"]), ["enter"])), _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args), ["prevent"]), ["space"]))],
    "data-bs-toggle": "tooltip",
    "data-bs-placement": "top",
    title: "Decrease text size"
  }, null, 32 /* NEED_HYDRATION */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Voice settings "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <i class=\"bi bi-gear-fill h3 custom-icon-increase\" style=\"cursor: pointer\"\n              @click=\"showOptions = !showOptions\" title=\"Toggle Voice Settings\">\n            </i> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Collapse Toggle "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <p class=\"d-inline-flex gap-1\">\n              <i style=\"cursor: pointer\" class=\"bi bi-file-earmark-arrow-down-fill h3 custom-icon-decrease\"\n                data-bs-toggle=\"collapse\" href=\"#collapseExample\" role=\"button\" aria-expanded=\"false\"\n                aria-controls=\"collapseExample\" @click=\"toggleIcon\" data-bs-placement=\"top\" title=\"Toggle collapse\">\n              </i>\n            </p> ")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_BottomAudioPlayer, {
    information: $props.information
  }, null, 8 /* PROPS */, ["information"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Alert Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_AlertModal, {
    showAlertText: $props.showAlertText,
    showAlert: $props.showAlert,
    showErrorAlert: $props.showErrorAlert,
    showAlertTextNote: $props.showAlertTextNote,
    onCloseAlertText: $options.closeAlertText
  }, null, 8 /* PROPS */, ["showAlertText", "showAlert", "showErrorAlert", "showAlertTextNote", "onCloseAlertText"])], 512 /* NEED_PATCH */)], 2 /* CLASS */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TranslationActions.vue?vue&type=template&id=4ae55fe6":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TranslationActions.vue?vue&type=template&id=4ae55fe6 ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "row"
};
const _hoisted_2 = {
  key: 0,
  class: "alert alert-success alert-dismissible fade show",
  role: "alert"
};
const _hoisted_3 = {
  class: "d-flex flex-wrap justify-content-between align-items-center text-center"
};
const _hoisted_4 = {
  class: "icon-container d-flex flex-column align-items-center"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Success Message Alert "), $data.showAlert ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_2, [_cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Success!", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.successMessage) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "alert",
    "aria-label": "Close",
    onClick: _cache[0] || (_cache[0] = $event => $data.showAlert = false)
  })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Note Icon "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-file-earmark-text h3",
    "aria-expanded": "false",
    "data-bs-placement": "top",
    title: "Write a note",
    onClick: _cache[1] || (_cache[1] = $event => $options.handleAction('open-modal', 'translationNote'))
  }), _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "mt-1"
  }, "Write a note", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Surah Info Icon "), _cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "icon-container d-flex flex-column align-items-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-info-circle h4 mr-2 pl-2",
    "data-bs-toggle": "modal",
    "data-bs-target": "#translationInfo",
    "aria-expanded": "false",
    "data-bs-placement": "top",
    title: "Surah info",
    style: {
      "cursor": "pointer"
    }
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "mt-1"
  }, "Surah info")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Bug Report Icon "), _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "icon-container d-flex flex-column align-items-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    title: "Report a bug",
    "data-bs-toggle": "modal",
    "data-bs-target": "#exampleModal",
    class: "bi bi-chat-left-text h4",
    "aria-expanded": "false",
    "data-bs-placement": "top"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "mt-1"
  }, "Report a bug")], -1 /* CACHED */))])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TranslationSection.vue?vue&type=template&id=0db761ce&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TranslationSection.vue?vue&type=template&id=0db761ce&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  ref: "targetTranslationElement"
};
const _hoisted_2 = {
  class: "row"
};
const _hoisted_3 = {
  class: "row text-left mt-2"
};
const _hoisted_4 = {
  class: "col-md-11 col-10"
};
const _hoisted_5 = {
  key: 0,
  class: "fw-bold pt-2 hide-on-mobile-tablet"
};
const _hoisted_6 = ["innerHTML"];
const _hoisted_7 = {
  key: 1,
  class: "row collapse pt-3",
  id: "collapseExample"
};
const _hoisted_8 = {
  class: "d-flex flex-wrap gap-2 pb-2"
};
const _hoisted_9 = {
  key: 0,
  class: "container voice-settings p-3 rounded shadow-sm",
  style: {
    "background-color": "#f8f9fa"
  }
};
const _hoisted_10 = {
  class: "d-flex flex-column flex-md-row gap-3 align-items-start align-items-md-center"
};
const _hoisted_11 = {
  class: "d-flex flex-column flex-grow-1"
};
const _hoisted_12 = ["value"];
const _hoisted_13 = {
  class: "d-flex flex-column flex-grow-1"
};
const _hoisted_14 = ["value"];
const _hoisted_15 = {
  class: "d-flex flex-column flex-grow-1"
};
const _hoisted_16 = ["value"];
const _hoisted_17 = {
  key: 0,
  class: "col-md-1 col-2 d-flex align-items-center justify-content-center flex-column vertical-actions"
};
const _hoisted_18 = {
  class: "mt-4"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AyahInfo = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("AyahInfo");
  const _component_MainAyah = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("MainAyah");
  const _component_BottomAudioPlayer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("BottomAudioPlayer");
  const _component_AlertModal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("AlertModal");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["w-100 my-element", {
      'full-screen': $props.isFullScreen
    }])
  }, [$props.isFullScreen && $data.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleFullScreen && $options.toggleFullScreen(...args)),
    class: "close-button mb-3 text-left btn btn-secondary"
  }, "Close")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_AyahInfo, {
    information: $props.information
  }, null, 8 /* PROPS */, ["information"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-1 pt-2 d-flex align-items-center justify-content-center"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-12",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      fontSize: $data.fontSize + 'em',
      lineHeight: '1.8em'
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_MainAyah, {
    information: $props.information
  }, null, 8 /* PROPS */, ["information"])], 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_ctx.ayah == null && !_ctx.dropdownHidden ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("h4", _hoisted_5, "Translation:")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "ayah-translation",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)([{
      "color": "dimgrey"
    }, {
      fontSize: $data.fontSize + 'em',
      lineHeight: '1.8em'
    }]),
    innerHTML: $data.renderedText
  }, null, 12 /* STYLE, PROPS */, _hoisted_6), _cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "translation-credit"
  }, "Translated by Abdullah Yusuf Ali", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"d-flex align-items-center mt-3\">\n            <img src=\"/images/art.png\" class=\"pr-2\" width=\"30px\" alt=\"lamp\" loading=\"lazy\" />\n            <h4 class=\"fw-bold pt-2 hide-on-mobile-tablet\" v-if=\"ayah == null && !dropdownHidden\">Translation:</h4>\n            <h4 class=\" mb-0 ms-2\" style=\"color:dimgrey;\" :style=\"{ fontSize: fontSize + 'em', lineHeight: '1.8em' }\">\n              Ahmed\n              Ali</h4>\n          </div> "), $data.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-dark btn-sm px-3 py-2",
    onClick: _cache[1] || (_cache[1] = (...args) => $options.downloadAsCsv && $options.downloadAsCsv(...args))
  }, [...(_cache[20] || (_cache[20] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-filetype-csv pr-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("CSV Export ", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-dark btn-sm px-3 py-2",
    onClick: _cache[2] || (_cache[2] = (...args) => $options.downloadAsWord && $options.downloadAsWord(...args))
  }, [...(_cache[21] || (_cache[21] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-filetype-docx pr-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("DOCX Export ", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-dark btn-sm px-3 py-2",
    onClick: _cache[3] || (_cache[3] = (...args) => $options.downloadAsExport && $options.downloadAsExport(...args))
  }, [...(_cache[22] || (_cache[22] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-filetype-json pr-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("JSON Export ", -1 /* CACHED */)]))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Toggle Button "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.showOptions ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Rate "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      for: "speech-rate",
      class: "form-label fw-bold mb-1"
    }, "Rate", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      id: "speech-rate",
      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.speechRate = $event),
      class: "form-select",
      "aria-label": "Select speech rate",
      title: "Adjust speech speed"
    }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.rates, rate => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
        key: rate,
        value: rate
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(rate) + "x", 9 /* TEXT, PROPS */, _hoisted_12);
    }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.speechRate]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Pitch "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      for: "speech-pitch",
      class: "form-label fw-bold mb-1"
    }, "Pitch", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      id: "speech-pitch",
      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.speechPitch = $event),
      class: "form-select",
      "aria-label": "Select speech pitch",
      title: "Adjust speech tone"
    }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.pitches, pitch => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
        key: pitch,
        value: pitch
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(pitch) + "x", 9 /* TEXT, PROPS */, _hoisted_14);
    }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.speechPitch]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Voice "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      for: "speech-voice",
      class: "form-label fw-bold mb-1"
    }, "Voice", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      id: "speech-voice",
      "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $data.selectedVoice = $event),
      class: "form-select",
      "aria-label": "Select voice",
      title: "Choose voice for speech"
    }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.voices.filter(v => !v.name.includes('Google')), voice => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
        key: voice.name,
        value: voice.name
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(voice.name), 9 /* TEXT, PROPS */, _hoisted_16);
    }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedVoice]])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Icons Column "), !$data.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Play/Pause Button "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    onClick: _cache[7] || (_cache[7] = (...args) => $options.toggleSpeech && $options.toggleSpeech(...args)),
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['bi', $data.isReading ? $data.isPaused ? 'bi-play-fill' : 'bi-pause-fill' : 'bi-play-fill', 'action-circle']),
    role: "button",
    tabindex: 0,
    "aria-label": "Play or pause translation audio",
    onKeydown: [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.toggleSpeech && $options.toggleSpeech(...args), ["prevent"]), ["enter"])), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.toggleSpeech && $options.toggleSpeech(...args), ["prevent"]), ["space"]))],
    title: "Play/Pause Translation Audio"
  }, null, 34 /* CLASS, NEED_HYDRATION */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Stop Button, visible only after Play button is clicked "), $data.isReading && !$data.isPaused ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", {
    key: 0,
    onClick: _cache[10] || (_cache[10] = (...args) => $options.stopReading && $options.stopReading(...args)),
    class: "bi bi-stop-fill action-circle",
    role: "button",
    tabindex: 0,
    "aria-label": "Stop reading audio",
    onKeydown: [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.stopReading && $options.stopReading(...args), ["prevent"]), ["enter"])), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.stopReading && $options.stopReading(...args), ["prevent"]), ["space"]))],
    title: "Stop Translation Audio"
  }, null, 32 /* NEED_HYDRATION */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Font Size Adjustments "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus action-circle icon-plus",
    role: "button",
    tabindex: 0,
    "aria-label": "Increase text size",
    onClick: _cache[13] || (_cache[13] = (...args) => $options.increaseFontSize && $options.increaseFontSize(...args)),
    onKeydown: [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.increaseFontSize && $options.increaseFontSize(...args), ["prevent"]), ["enter"])), _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.increaseFontSize && $options.increaseFontSize(...args), ["prevent"]), ["space"]))],
    title: "Increase Text Size"
  }, null, 32 /* NEED_HYDRATION */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-dash action-circle icon-minus",
    role: "button",
    tabindex: 0,
    "aria-label": "Decrease text size",
    onClick: _cache[16] || (_cache[16] = (...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args)),
    onKeydown: [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args), ["prevent"]), ["enter"])), _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args), ["prevent"]), ["space"]))],
    title: "Decrease Text Size"
  }, null, 32 /* NEED_HYDRATION */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Voice settings "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <i class=\"bi bi-gear-fill h3 custom-icon-increase\" style=\"cursor: pointer\" @click=\"showOptions = !showOptions\"\n            title=\"Toggle Voice Settings\">\n          </i> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Toggle Collapse for More Options "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <p class=\"d-inline-flex gap-1\">\n            <i style=\"cursor: pointer;\" class=\"bi bi-file-earmark-arrow-down-fill h3 custom-icon-decrease\"\n              data-bs-toggle=\"collapse\" href=\"#collapseExample\" role=\"button\" aria-expanded=\"false\"\n              aria-controls=\"collapseExample\" @click=\"toggleIcon\" title=\"More Options\"></i>\n          </p> ")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_BottomAudioPlayer, {
    information: $props.information
  }, null, 8 /* PROPS */, ["information"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_AlertModal, {
    showAlertText: $props.showAlertText,
    showAlert: $props.showAlert,
    showErrorAlert: $props.showErrorAlert,
    showAlertTextNote: $props.showAlertTextNote,
    onCloseAlertText: $options.closeAlertText
  }, null, 8 /* PROPS */, ["showAlertText", "showAlert", "showErrorAlert", "showAlertTextNote", "onCloseAlertText"])], 512 /* NEED_PATCH */)], 2 /* CLASS */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TransliterationActions.vue?vue&type=template&id=91049004":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TransliterationActions.vue?vue&type=template&id=91049004 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "row"
};
const _hoisted_2 = {
  class: "d-flex flex-wrap justify-content-between align-items-center"
};
const _hoisted_3 = {
  class: "icon-container text-center"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Note Icon "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-file-earmark-text h3",
    "aria-expanded": "false",
    "data-bs-placement": "top",
    title: "Write a note",
    onClick: _cache[0] || (_cache[0] = $event => _ctx.$emit('open-modal', 'transliterationNote'))
  }), _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Write a Note", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Surah Info Icon "), _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "icon-container text-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    style: {
      "cursor": "pointer"
    },
    class: "bi bi-info-circle h4 mr-2 pl-2",
    "data-bs-toggle": "modal",
    "data-bs-target": "#translationInfo",
    "aria-expanded": "false",
    "data-bs-placement": "top",
    title: "Surah info"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Surah Info")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Bug Report Icon "), _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "icon-container text-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    title: "Report a bug",
    "data-bs-toggle": "modal",
    "data-bs-target": "#exampleModal",
    class: "bi bi-chat-left-text h4",
    "aria-expanded": "false",
    "data-bs-placement": "top"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Report a Bug")], -1 /* CACHED */))])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TransliterationSection.vue?vue&type=template&id=7a4fb9e6&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TransliterationSection.vue?vue&type=template&id=7a4fb9e6&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  ref: "targetTransliterationElement"
};
const _hoisted_2 = {
  class: "row"
};
const _hoisted_3 = {
  class: "col-md-12"
};
const _hoisted_4 = {
  class: "row text-left mt-2"
};
const _hoisted_5 = {
  class: "col-md-11 col-10"
};
const _hoisted_6 = {
  key: 0,
  class: "fw-bold pt-2 hide-on-mobile-tablet"
};
const _hoisted_7 = {
  key: 1,
  class: "row collapse pt-3",
  id: "collapseExample"
};
const _hoisted_8 = {
  class: "d-flex flex-wrap gap-2 pb-2"
};
const _hoisted_9 = {
  key: 0,
  class: "col-md-1 col-2 d-flex align-items-center justify-content-center flex-column vertical-actions"
};
const _hoisted_10 = {
  class: "mt-4"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AyahInfo = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("AyahInfo");
  const _component_MainAyah = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("MainAyah");
  const _component_BottomAudioPlayer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("BottomAudioPlayer");
  const _component_AlertModal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("AlertModal");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["w-100 my-element", {
      'full-screen': $props.isFullScreen
    }])
  }, [$props.isFullScreen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleFullScreen && $options.toggleFullScreen(...args)),
    class: "close-button mb-3 text-left btn btn-secondary"
  }, "Close")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_AyahInfo, {
    information: $props.information
  }, null, 8 /* PROPS */, ["information"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    onTouchstart: _cache[10] || (_cache[10] = (...args) => _ctx.handleStart && _ctx.handleStart(...args)),
    onTouchend: _cache[11] || (_cache[11] = (...args) => _ctx.handleEnd && _ctx.handleEnd(...args)),
    onMousedown: _cache[12] || (_cache[12] = (...args) => _ctx.handleStart && _ctx.handleStart(...args)),
    onMouseup: _cache[13] || (_cache[13] = (...args) => _ctx.handleEnd && _ctx.handleEnd(...args)),
    onMouseleave: _cache[14] || (_cache[14] = (...args) => _ctx.cancelHold && _ctx.cancelHold(...args)),
    class: "swipeable-div w-100"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-2 pt-2 d-flex align-items-center justify-content-center"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_MainAyah, {
    information: $props.information
  }, null, 8 /* PROPS */, ["information"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_ctx.ayah == null && !_ctx.dropdownHidden ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("h4", _hoisted_6, "Transliteration:")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "ayah-translation",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)([{
      "color": "dimgrey"
    }, {
      fontSize: $data.fontSize + 'em',
      lineHeight: '1.6em'
    }])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.expanded ? $props.information.transliteration : $props.information.transliteration), 5 /* TEXT, STYLE */), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "transliteration-credit"
  }, "Transliteration by King Fahd Complex", -1 /* CACHED */)), !$data.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-dark btn-sm px-3 py-2",
    onClick: _cache[1] || (_cache[1] = (...args) => $options.downloadAsCsv && $options.downloadAsCsv(...args))
  }, [...(_cache[16] || (_cache[16] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-filetype-csv pr-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("CSV Export ", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-dark btn-sm px-3 py-2",
    onClick: _cache[2] || (_cache[2] = (...args) => $options.downloadAsWord && $options.downloadAsWord(...args))
  }, [...(_cache[17] || (_cache[17] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-filetype-docx pr-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("DOCX Export ", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-dark btn-sm px-3 py-2",
    onClick: _cache[3] || (_cache[3] = (...args) => $options.downloadAsExport && $options.downloadAsExport(...args))
  }, [...(_cache[18] || (_cache[18] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-filetype-json pr-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("JSON Export ", -1 /* CACHED */)]))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"d-flex align-items-center mt-3\">\n              <img src=\"/images/art.png\" class=\"pr-2\" width=\"30px\" alt=\"lamp\" loading=\"lazy\" />\n              <h4 class=\"fw-bold pt-2 hide-on-mobile-tablet\" v-if=\"ayah == null && !dropdownHidden\" >Transliteration:</h4>\n\n              <h5 class=\" mb-0 ms-2\" style=\"color:dimgrey;\" :style=\"{ fontSize: fontSize + 'em', lineHeight: '1.8em' }\">Saheeh International</h5>\n            </div> ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Icons Column (Stacked Vertically) "), !$data.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus action-circle icon-plus",
    role: "button",
    tabindex: 0,
    "aria-label": "Increase text size",
    onClick: _cache[4] || (_cache[4] = (...args) => $options.increaseFontSize && $options.increaseFontSize(...args)),
    onKeydown: [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.increaseFontSize && $options.increaseFontSize(...args), ["prevent"]), ["enter"])), _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.increaseFontSize && $options.increaseFontSize(...args), ["prevent"]), ["space"]))],
    "data-bs-toggle": "tooltip",
    "data-bs-placement": "top",
    title: "Increase text size"
  }, null, 32 /* NEED_HYDRATION */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-dash action-circle icon-minus",
    role: "button",
    tabindex: 0,
    "aria-label": "Decrease text size",
    onClick: _cache[7] || (_cache[7] = (...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args)),
    onKeydown: [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args), ["prevent"]), ["enter"])), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args), ["prevent"]), ["space"]))],
    "data-bs-toggle": "tooltip",
    "data-bs-placement": "top",
    title: "Decrease text size"
  }, null, 32 /* NEED_HYDRATION */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <p class=\"d-inline-flex gap-1\">\n              <i style=\"cursor: pointer;\" class=\"bi bi-file-earmark-arrow-down-fill h3 custom-icon-decrease\"\n                data-bs-toggle=\"collapse\" href=\"#collapseExample\" role=\"button\" aria-expanded=\"false\"\n                aria-controls=\"collapseExample\" @click=\"toggleIcon\" data-bs-placement=\"top\" title=\"Toggle collapse\">\n              </i>\n            </p> ")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 32 /* NEED_HYDRATION */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_BottomAudioPlayer, {
    information: $props.information
  }, null, 8 /* PROPS */, ["information"])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_AlertModal, {
    showAlertText: $props.showAlertText,
    showAlert: $props.showAlert,
    showErrorAlert: $props.showErrorAlert,
    showAlertTextNote: $props.showAlertTextNote,
    onCloseAlertText: $options.closeAlertText
  }, null, 8 /* PROPS */, ["showAlertText", "showAlert", "showErrorAlert", "showAlertTextNote", "onCloseAlertText"])], 512 /* NEED_PATCH */)], 2 /* CLASS */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/accesibility/ScreenReader.vue?vue&type=template&id=dbcc6f5e":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/accesibility/ScreenReader.vue?vue&type=template&id=dbcc6f5e ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = ["disabled"];
const _hoisted_2 = ["disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.text = $event),
    placeholder: "Enter text to read",
    class: "text-area"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.text]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[1] || (_cache[1] = (...args) => $options.startReading && $options.startReading(...args)),
    disabled: $data.isReading,
    class: "read-btn"
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.isReading ? "Reading..." : "Read Aloud"), 9 /* TEXT, PROPS */, _hoisted_1), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[2] || (_cache[2] = (...args) => $options.stopReading && $options.stopReading(...args)),
    disabled: !$data.isReading,
    class: "stop-btn"
  }, " Stop Reading ", 8 /* PROPS */, _hoisted_2)]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/folder_manager/FolderSelectionModal.vue?vue&type=template&id=aee34890&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/folder_manager/FolderSelectionModal.vue?vue&type=template&id=aee34890&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "modal fade",
  id: "folderSelectionModal",
  tabindex: "-1",
  "aria-labelledby": "folderSelectionModalLabel",
  "aria-hidden": "true"
};
const _hoisted_2 = {
  class: "modal-dialog"
};
const _hoisted_3 = {
  class: "modal-content"
};
const _hoisted_4 = {
  class: "modal-body"
};
const _hoisted_5 = {
  class: "list-group"
};
const _hoisted_6 = ["onClick"];
const _hoisted_7 = {
  class: "modal-footer"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Folder Selection Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title",
    id: "folderSelectionModalLabel"
  }, " Select Folder "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" List of folders "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_5, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.folders, folder => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: folder.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["list-group-item button-33", {
        active: $data.selectedFolderId === folder.id
      }]),
      style: {
        "padding": "5px",
        "cursor": "pointer"
      },
      onClick: $event => $options.selectFolder(folder.id)
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(folder.name), 11 /* TEXT, CLASS, PROPS */, _hoisted_6);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-secondary",
    "data-bs-dismiss": "modal"
  }, " Cancel ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-primary",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.confirmSelection && $options.confirmSelection(...args))
  }, " Confirm ")])])])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/AlertModal.vue?vue&type=template&id=68112f60":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/AlertModal.vue?vue&type=template&id=68112f60 ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  key: 0,
  class: "alert alert-success mt-2",
  role: "alert"
};
const _hoisted_2 = {
  key: 1,
  class: "alert alert-danger",
  role: "alert"
};
const _hoisted_3 = {
  key: 2,
  class: "alert alert-danger",
  role: "alert"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Success alert for bookmark creation "), $props.showAlert ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, " Bookmark created successfully! ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Error alert for bookmarking without login "), $props.showErrorAlert ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_2, " Login to your account to be able to bookmark verses. ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Error alert for noting without login "), $props.showAlertTextNote ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_3, " Please log in to write a note. ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _ctx.showAlert1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 3,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['alert', _ctx.alertType === 'success' ? 'alert-success' : 'alert-danger'])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.alertMessage), 3 /* TEXT, CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/OffcanvasSetting.vue?vue&type=template&id=63c77d28&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/OffcanvasSetting.vue?vue&type=template&id=63c77d28&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "offcanvas offcanvas-end",
  tabindex: "-1",
  id: "offcanvasSetting",
  "aria-labelledby": "offcanvasSettingLabel"
};
const _hoisted_2 = {
  class: "offcanvas-body"
};
const _hoisted_3 = {
  class: "mb-3"
};
const _hoisted_4 = {
  class: "mb-3"
};
const _hoisted_5 = {
  class: "mb-3"
};
const _hoisted_6 = ["value"];
const _hoisted_7 = {
  key: 0,
  class: "alert alert-success mt-3",
  role: "alert"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "offcanvas-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "offcanvas-title",
    id: "offcanvasSettingLabel"
  }, " Voice Settings "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "offcanvas",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Rate Control "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "rate",
    class: "form-label"
  }, "Rate", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.rate = $event),
    type: "range",
    class: "form-range",
    id: "rate",
    min: "0.1",
    max: "2",
    step: "0.1"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.rate]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.rate), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Pitch Control "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "pitch",
    class: "form-label"
  }, "Pitch", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.pitch = $event),
    type: "range",
    class: "form-range",
    id: "pitch",
    min: "0",
    max: "2",
    step: "0.1"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.pitch]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.pitch), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Voice Selection "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "voiceSelect",
    class: "form-label"
  }, "Select Voice", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.selectedVoiceName = $event),
    class: "form-select",
    id: "voiceSelect",
    onChange: _cache[3] || (_cache[3] = $event => $options.changeVoice($data.selectedVoiceName))
  }, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    disabled: "",
    value: ""
  }, "Select a Voice", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.voices, voice => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: voice.name,
      value: voice.name
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(voice.name), 9 /* TEXT, PROPS */, _hoisted_6);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedVoiceName]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Save Settings Button "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[4] || (_cache[4] = (...args) => $options.saveSettings && $options.saveSettings(...args)),
    class: "btn btn-primary"
  }, " Save Settings "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Success Message "), $data.successMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, " Settings saved successfully! ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/SurahInfoModal.vue?vue&type=template&id=c99d7ef2&scoped=true":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/SurahInfoModal.vue?vue&type=template&id=c99d7ef2&scoped=true ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "modal fade",
  id: "translationInfo",
  tabindex: "-1",
  "aria-labelledby": "surahInfoModalLabel",
  "aria-hidden": "true"
};
const _hoisted_2 = {
  class: "modal-dialog modal-dialog-centered modal-lg"
};
const _hoisted_3 = {
  class: "modal-content"
};
const _hoisted_4 = {
  class: "modal-header"
};
const _hoisted_5 = {
  class: "modal-body"
};
const _hoisted_6 = {
  class: "container text-left"
};
const _hoisted_7 = {
  key: 0,
  class: "mb-3 container"
};
const _hoisted_8 = {
  class: "mt-2 text-dark text-left"
};
const _hoisted_9 = {
  key: 1,
  class: "mb-3 container"
};
const _hoisted_10 = {
  class: "text-left",
  style: {
    "font-size": "8px"
  }
};
const _hoisted_11 = {
  class: "modal-footer"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "modal-title fs-5",
    id: "surahInfoModalLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Surah Information")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.closeModal && $options.closeModal(...args)),
    "aria-label": "Close"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", _hoisted_6, [$props.information.ayah && $props.information.ayah.surah ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    for: "formGroupExampleInput",
    class: "form-label"
  }, "Surah Name (English):", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.information.ayah.surah.name_en), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $props.information.ayah && $props.information.ayah.surah ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    for: "formGroupExampleInput",
    class: "form-label text-left"
  }, "Surah Information:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.information.ayah.surah.text), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-secondary",
    onClick: _cache[1] || (_cache[1] = (...args) => $options.closeModal && $options.closeModal(...args))
  }, "Close")])])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AdvancedSearch.vue?vue&type=template&id=5d4c6087&scoped=true":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AdvancedSearch.vue?vue&type=template&id=5d4c6087&scoped=true ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container pb-3 px-3",
  ref: "searchRoot"
};
const _hoisted_2 = {
  class: "input-group w-100 search-input-group position-relative elegant-search"
};
const _hoisted_3 = {
  key: 0,
  class: "suggestions menu position-absolute",
  style: {
    "top": "100%",
    "left": "0",
    "right": "0",
    "width": "100%",
    "z-index": "1000",
    "max-height": "60vh",
    "overflow-y": "auto"
  }
};
const _hoisted_4 = ["onClick", "onMouseenter"];
const _hoisted_5 = {
  key: 0,
  class: "error-message mt-2"
};
const _hoisted_6 = {
  key: 0,
  class: "listening-container listening-status-card"
};
const _hoisted_7 = {
  class: "offcanvas offcanvas-end custom-offcanvas",
  tabindex: "-1",
  id: "offcanvasResults"
};
const _hoisted_8 = {
  ref: "targetTafseerElement",
  class: "offcanvas-body search-results-body"
};
const _hoisted_9 = {
  key: 0,
  class: "results-stack"
};
const _hoisted_10 = {
  class: "results-summary"
};
const _hoisted_11 = {
  class: "summary-card"
};
const _hoisted_12 = {
  class: "summary-value"
};
const _hoisted_13 = {
  class: "summary-card"
};
const _hoisted_14 = {
  class: "summary-value"
};
const _hoisted_15 = {
  key: 0,
  class: "summary-note"
};
const _hoisted_16 = ["id"];
const _hoisted_17 = {
  class: "result-card-header"
};
const _hoisted_18 = {
  class: "result-ref"
};
const _hoisted_19 = {
  class: "result-id"
};
const _hoisted_20 = {
  class: "result-arabic",
  dir: "rtl"
};
const _hoisted_21 = {
  class: "result-translation"
};
const _hoisted_22 = ["innerHTML"];
const _hoisted_23 = {
  class: "result-actions"
};
const _hoisted_24 = ["onClick"];
const _hoisted_25 = ["onClick"];
const _hoisted_26 = {
  key: 1,
  class: "results-empty"
};
const _hoisted_27 = {
  key: 2,
  class: "results-loading",
  role: "status",
  "aria-live": "polite"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search Input Group "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Unified input group to align input and mic button on all screens "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "search",
    onInput: _cache[0] || (_cache[0] = (...args) => $options.onInput && $options.onInput(...args)),
    onKeydown: _cache[1] || (_cache[1] = (...args) => $options.onKeyDown && $options.onKeyDown(...args)),
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.searchTerm = $event),
    placeholder: "Search for a word in the quran...",
    class: "form-control search-pill",
    style: {
      "padding": "12px 16px",
      "height": "50px"
    }
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchTerm]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn mic-btn d-flex align-items-center justify-content-center",
    "aria-label": "Voice search",
    title: "Voice search",
    onClick: _cache[3] || (_cache[3] = $event => $data.isListening ? $options.stopVoiceRecognition() : $options.startVoiceRecognition()),
    style: {
      "height": "50px",
      "min-width": "56px"
    }
  }, [...(_cache[4] || (_cache[4] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-mic-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Suggestions Dropdown (full width under the input group) "), $data.showSuggestions && $data.suggestions.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("ul", _hoisted_3, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.suggestions, (suggestion, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["suggestion-item", {
        active: index === $data.activeIndex
      }]),
      key: index,
      onClick: $event => $options.selectSuggestion(suggestion),
      onMouseenter: $event => $data.activeIndex = index
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(suggestion), 43 /* TEXT, CLASS, PROPS, NEED_HYDRATION */, _hoisted_4);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), $data.errorMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.errorMessage), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" show a message when recording starts "), $data.isListening ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_6, [...(_cache[5] || (_cache[5] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"listening-icon-wrapper\" data-v-5d4c6087><div class=\"listening-icon-ring\" data-v-5d4c6087></div><i class=\"bi bi-mic-fill listening-icon\" data-v-5d4c6087></i></div><div class=\"listening-copy\" data-v-5d4c6087><p class=\"listening-title\" data-v-5d4c6087>Listening</p><small class=\"listening-subtitle\" data-v-5d4c6087>Speak now and we’ll fetch the verses.</small></div>", 2)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Offcanvas for Search Results "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"offcanvas-header search-results-header\" data-v-5d4c6087><div class=\"search-results-title\" data-v-5d4c6087><span class=\"search-results-eyebrow\" data-v-5d4c6087>Quran Search</span><h5 class=\"offcanvas-title\" data-v-5d4c6087>Search Results</h5><p class=\"search-results-subtitle\" data-v-5d4c6087>Matched ayat with translations ready to share.</p></div><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"offcanvas\" aria-label=\"Close search results\" data-v-5d4c6087></button></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [$data.filteredResults.length && !$data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "summary-label"
  }, "Surahs", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.totalSurahs), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "summary-label"
  }, "Ayat", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.totalAyahs), 1 /* TEXT */)]), $data.searchTerm ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_15, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Results for \"", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.searchTerm), 1 /* TEXT */), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("\" ", -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.filteredResults, (result, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: result.id,
      class: "result-card",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        '--result-index': index
      })
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      id: 'result-' + result.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "result-label"
    }, "Ayah", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(result.ayah.surah_id) + " : " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(result.ayah.ayah_id), 1 /* TEXT */)]), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "result-chip"
    }, "Match", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(result.ayah.ayah_text), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "translation-label"
    }, "Translation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "translation-text",
      innerHTML: $options.highlightSearch($data.expanded ? result.translation : result.translation)
    }, null, 8 /* PROPS */, _hoisted_22)])], 8 /* PROPS */, _hoisted_16), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $event => $options.shareOnWhatsApp(result),
      type: "button",
      class: "btn result-btn result-btn--whatsapp"
    }, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-whatsapp",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Share on WhatsApp ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_24), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $event => $options.shareOnTwitter(result),
      type: "button",
      class: "btn result-btn result-btn--x"
    }, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-twitter-x",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Share on X ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_25)])], 4 /* STYLE */);
  }), 128 /* KEYED_FRAGMENT */))])) : !$data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_26, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "results-empty-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, "No search results found."), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Try a different word or a longer phrase.")], -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_27, [...(_cache[16] || (_cache[16] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "results-loading-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "loading-spinner",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Gathering matches...")], -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */)])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AyahDropdown.vue?vue&type=template&id=71893426&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AyahDropdown.vue?vue&type=template&id=71893426&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container-fluid"
};
const _hoisted_2 = ["disabled"];
const _hoisted_3 = ["value"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("select", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control right-side-form card container select-shadow", {
      'desktop-hidden': true,
      'mobile-visible': true
    }]),
    key: `${$props.selectedSurahId}-${_ctx.currentAyahId || _ctx.currentAyahNum || 'na'}`,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.selectedAyahId = $event),
    onChange: _cache[1] || (_cache[1] = (...args) => $options.handleAyahChange && $options.handleAyahChange(...args)),
    disabled: $data.isLoading
  }, [_cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: ""
  }, "Select Ayah", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ayat, ayah => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: ayah.id,
      value: ayah.id
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatAyahOption(ayah)), 9 /* TEXT, PROPS */, _hoisted_3);
  }), 128 /* KEYED_FRAGMENT */))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_2)), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedAyahId]])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/ErrorAlert.vue?vue&type=template&id=2b7ca9d1&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/ErrorAlert.vue?vue&type=template&id=2b7ca9d1&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  key: 0,
  class: "alert alert-danger alert-dismissible fade show",
  role: "alert"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return $props.showError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Please enter a valid ayah number. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.dismissError && $options.dismissError(...args)),
    "aria-label": "Close"
  })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/Magnifier.vue?vue&type=template&id=7453b1f1&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/Magnifier.vue?vue&type=template&id=7453b1f1&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return $data.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    class: "magnifier",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($data.magnifierStyle)
  }, null, 4 /* STYLE */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/SurahDropdown.vue?vue&type=template&id=294bd1ca&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/SurahDropdown.vue?vue&type=template&id=294bd1ca&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "surah-picker"
};
const _hoisted_2 = {
  class: "picker"
};
const _hoisted_3 = {
  key: 0,
  class: "item"
};
const _hoisted_4 = {
  class: "num"
};
const _hoisted_5 = {
  class: "en"
};
const _hoisted_6 = {
  class: "ar"
};
const _hoisted_7 = {
  key: 1
};
const _hoisted_8 = {
  class: "item"
};
const _hoisted_9 = {
  class: "num"
};
const _hoisted_10 = {
  class: "en"
};
const _hoisted_11 = {
  class: "ar"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Dropdown = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Dropdown");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "title"
  }, "Begin Your Recitation & Select a Surah:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "subtitle"
  }, "Search or browse all 114 Surahs")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dropdown, {
    "aria-label": "Select a Surah",
    options: $options.dropdownOptions,
    optionLabel: "label",
    optionValue: "value",
    appendTo: "self",
    filter: true,
    filterBy: "label,ar",
    showClear: "",
    scrollHeight: "352px",
    virtualScrollerOptions: {
      itemSize: 44
    },
    value: $data.selectedSurahLocal,
    placeholder: "Type to search...",
    class: "p-inputtext-md w-100 glossy",
    onChange: $options.onDropdownChange
  }, {
    value: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(slotProps => {
      var _$options$optionById, _$options$optionById2;
      return [slotProps.value ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(slotProps.value), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$options$optionById = $options.optionById(slotProps.value)) === null || _$options$optionById === void 0 ? void 0 : _$options$optionById.en), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$options$optionById2 = $options.optionById(slotProps.value)) === null || _$options$optionById2 === void 0 ? void 0 : _$options$optionById2.ar), 1 /* TEXT */)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_7, "Type to search..."))];
    }),
    option: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(({
      option
    }) => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.value), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.en), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.ar), 1 /* TEXT */)])]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["options", "value", "onChange"])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/settings/SpeechSettings.vue?vue&type=template&id=3ff1d3e7&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/settings/SpeechSettings.vue?vue&type=template&id=3ff1d3e7&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "offcanvas offcanvas-end custom-offcanvas",
  id: "offcanvasRight",
  tabindex: "-1",
  "aria-labelledby": "offcanvasRightLabel"
};
const _hoisted_2 = {
  class: "offcanvas-body"
};
const _hoisted_3 = {
  class: "tab-content mt-3",
  id: "myTabContent"
};
const _hoisted_4 = {
  class: "tab-pane fade show active",
  id: "SpeechSettings",
  role: "tabpanel",
  "aria-labelledby": "tab1-tab"
};
const _hoisted_5 = {
  class: "row container mb-3"
};
const _hoisted_6 = ["value"];
const _hoisted_7 = {
  class: "row pt-3"
};
const _hoisted_8 = {
  class: "col"
};
const _hoisted_9 = {
  class: "col"
};
const _hoisted_10 = {
  class: "row pt-3"
};
const _hoisted_11 = {
  class: "col"
};
const _hoisted_12 = {
  class: "col"
};
const _hoisted_13 = {
  key: 0,
  class: "alert alert-success",
  role: "alert"
};
const _hoisted_14 = {
  class: "d-flex w-100 justify-content-end mt-3"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "offcanvas-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Speech Settings")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "offcanvas",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Voice Selection "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "form-label pb-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Voices:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "voiceSelect",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.selectedVoiceName = $event),
    class: "form-control"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.voices, voice => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: voice.name,
      value: voice.name
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(voice.name) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(voice.lang) + ") ", 9 /* TEXT, PROPS */, _hoisted_6);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedVoiceName]])]), _cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Rate and Pitch Controls "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "form-label pb-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Rate & Pitch:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Rate: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "rate",
    type: "range",
    min: "0.5",
    max: "2",
    step: "0.1",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.rate = $event)
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.rate]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.rate.toFixed(1)), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Pitch: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "pitch",
    type: "range",
    min: "0.5",
    max: "2",
    step: "0.1",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.pitch = $event)
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.pitch]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.pitch.toFixed(1)), 1 /* TEXT */)])])]), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", {
    class: "container"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Font Size Controls "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "form-label pb-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Font size:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Increase size: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-circle-fill h3 pb-1 custom-icon-increase",
    role: "button",
    tabindex: "0",
    "aria-label": "Increase text size",
    onClick: _cache[3] || (_cache[3] = (...args) => $options.increaseFontSize && $options.increaseFontSize(...args)),
    onKeydown: [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.increaseFontSize && $options.increaseFontSize(...args), ["prevent"]), ["enter"])), _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.increaseFontSize && $options.increaseFontSize(...args), ["prevent"]), ["space"]))]
  }, null, 32 /* NEED_HYDRATION */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formattedFontSize), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", null, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Decrease size: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-dash-circle-fill h3 pb-1 custom-icon-decrease",
    role: "button",
    tabindex: "0",
    "aria-label": "Decrease text size",
    onClick: _cache[6] || (_cache[6] = (...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args)),
    onKeydown: [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args), ["prevent"]), ["enter"])), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args), ["prevent"]), ["space"]))]
  }, null, 32 /* NEED_HYDRATION */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formattedFontSize), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Success Message "), $data.successMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_13, " Settings saved successfully! ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Save and Close Buttons "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-secondary me-2",
    "data-bs-dismiss": "offcanvas",
    "aria-label": "Close"
  }, "Close", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-success",
    onClick: _cache[9] || (_cache[9] = (...args) => $options.saveSettings && $options.saveSettings(...args))
  }, "Save changes")])])])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/tabs/NavTabs.vue?vue&type=template&id=0f748fca&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/tabs/NavTabs.vue?vue&type=template&id=0f748fca&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "overflow-auto"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [...(_cache[0] || (_cache[0] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", {
    class: "nav nav-tabs text-left justify-content-start pt-3 flex-nowrap",
    style: {
      "white-space": "nowrap"
    },
    role: "tablist",
    "aria-label": "Content sections"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
    class: "nav-item",
    role: "presentation"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    class: "nav-link active",
    id: "tab-translation",
    "data-bs-toggle": "tab",
    href: "#home",
    role: "tab",
    "aria-controls": "home",
    "aria-selected": "true",
    tabindex: "0"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Translation")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
    class: "nav-item",
    role: "presentation"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    class: "nav-link",
    id: "tab-tafseer",
    "data-bs-toggle": "tab",
    href: "#profile",
    role: "tab",
    "aria-controls": "profile",
    "aria-selected": "false",
    tabindex: "-1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Tafseer")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
    class: "nav-item",
    role: "presentation"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    class: "nav-link",
    id: "tab-transliteration",
    "data-bs-toggle": "tab",
    href: "#messages",
    role: "tab",
    "aria-controls": "messages",
    "aria-selected": "false",
    tabindex: "-1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Transliteration")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <li class=\"nav-item\">\n     <a class=\"nav-link\" data-bs-toggle=\"tab\" href=\"#data\" role=\"tab\">\n      <b>Overview</b>\n     </a>\n    </li> ")], -1 /* CACHED */)]))]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/AyahInfo.vue?vue&type=template&id=67bf7c25&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/AyahInfo.vue?vue&type=template&id=67bf7c25&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container"
};
const _hoisted_2 = {
  class: "mr-2 container"
};
const _hoisted_3 = {
  class: "container-fluid"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_3, [_cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "/images/art.png",
    class: "pr-2",
    width: "30px",
    alt: "lamp",
    loading: "lazy"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.information.ayah.surah.name_en) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.information.ayah.surah_id) + " : " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.information.ayah.ayah_id) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.information.ayah.surah.name_ar), 1 /* TEXT */)])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/BottomAudioPlayer.vue?vue&type=template&id=bb3b8938&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/BottomAudioPlayer.vue?vue&type=template&id=bb3b8938&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"bottom-audio-player\" v-if=\"information\">\n    <div class=\"player-header\">\n      <div class=\"player-label\">{{ statusMessage }}</div>\n    </div>\n\n      <audio\n        v-if=\"currentAudioSrc\"\n        ref=\"audioPlayer\"\n        :src=\"currentAudioSrc\"\n        class=\"w-100 custom-audio\"\n        preload=\"auto\"\n        controls\n        :aria-label=\"audioLabel\"\n      ></audio>\n\n    <div v-else class=\"player-placeholder\">\n      <span>{{ statusMessage }}</span>\n    </div>\n  </div> ");
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/HelpGuideModal.vue?vue&type=template&id=509e892a":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/HelpGuideModal.vue?vue&type=template&id=509e892a ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Button trigger modal "), _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-primary",
    "data-bs-toggle": "modal",
    "data-bs-target": "#staticBackdrop"
  }, " Help Guide ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal "), _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"modal fade\" id=\"staticBackdrop\" data-bs-backdrop=\"static\" data-bs-keyboard=\"false\" tabindex=\"-1\" aria-labelledby=\"staticBackdropLabel\" aria-hidden=\"true\"><div class=\"modal-dialog modal-dialog-centered modal-xl\"><div class=\"modal-content\"><div class=\"modal-header\"><h1 class=\"modal-title fw-bold display-3 fs-5\" id=\"staticBackdropLabel\">Help Guide</h1><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button></div><div class=\"modal-body\"><div class=\"row text-left\"><div class=\"col display-7 fw-bold\"><img src=\"/images/art.png\" class=\"pr-1\" width=\"40px\" alt=\"lamp\" loading=\"lazy\"> Surah Dropdown </div></div><div class=\"row text-left pt-2\"><div class=\"col-md-8 leading\"> Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for &#39;lorem ipsum&#39; will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). </div><div class=\"col-md-4\"><img src=\"/images/surah_dropdown.png\" class=\"pr-2 pt-1\" width=\"70%\" alt=\"dropdown\" loading=\"lazy\"></div></div></div><div class=\"modal-body\"><div class=\"row text-left\"><div class=\"col display-7 fw-bold\"><img src=\"/images/art.png\" class=\"pr-1\" width=\"40px\" alt=\"lamp\" loading=\"lazy\"> Surah Dropdown </div></div><div class=\"row text-left pt-2\"><div class=\"col-md-8 leading\"> Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for &#39;lorem ipsum&#39; will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). </div><div class=\"col-md-4\"><img src=\"/images/surah_dropdown.png\" class=\"pr-2 pt-1\" width=\"70%\" alt=\"dropdown\" loading=\"lazy\"></div></div></div><div class=\"modal-body\"><div class=\"row text-left\"><div class=\"col display-7 fw-bold\"><img src=\"/images/art.png\" class=\"pr-1\" width=\"40px\" alt=\"lamp\" loading=\"lazy\"> Surah Dropdown </div></div><div class=\"row text-left pt-2\"><div class=\"col-md-8 leading\"> Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for &#39;lorem ipsum&#39; will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). </div><div class=\"col-md-4\"><img src=\"/images/surah_dropdown.png\" class=\"pr-2 pt-1\" width=\"70%\" alt=\"dropdown\" loading=\"lazy\"></div></div></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button></div></div></div></div>", 1))]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/MainAyah.vue?vue&type=template&id=2f0e3aa0&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/MainAyah.vue?vue&type=template&id=2f0e3aa0&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    class: "btn",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.styleObject)
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "text-right ayah-translation",
    name: "ayah_text",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.styleObject)
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.information.ayah.ayah_text), 1 /* TEXT */)], 4 /* STYLE */)], 4 /* STYLE */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/Translator.vue?vue&type=template&id=e784b7dc&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/Translator.vue?vue&type=template&id=e784b7dc&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "text-left mt-3"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("h6", _hoisted_1, [_cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "/images/art.png",
    class: "pr-2",
    width: "30px",
    alt: "lamp",
    loading: "lazy"
  }, null, -1 /* CACHED */)), _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Translation:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.translator), 1 /* TEXT */)]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TafseerNote.vue?vue&type=template&id=02a1587c&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TafseerNote.vue?vue&type=template&id=02a1587c&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "modal fade",
  id: "translationNote",
  tabindex: "-1",
  "aria-labelledby": "exampleModalLabel1",
  "aria-hidden": "true",
  ref: "modal"
};
const _hoisted_2 = {
  class: "modal-dialog modal-dialog-centered modal-lg"
};
const _hoisted_3 = {
  class: "modal-content"
};
const _hoisted_4 = {
  class: "modal-body"
};
const _hoisted_5 = {
  class: "container text-center"
};
const _hoisted_6 = {
  class: "row"
};
const _hoisted_7 = {
  class: "col"
};
const _hoisted_8 = {
  key: 0,
  class: "col"
};
const _hoisted_9 = {
  key: 1,
  class: "col"
};
const _hoisted_10 = {
  class: "mt-3"
};
const _hoisted_11 = {
  key: 0
};
const _hoisted_12 = {
  class: "container text-center"
};
const _hoisted_13 = {
  class: "row"
};
const _hoisted_14 = {
  class: "col"
};
const _hoisted_15 = ["disabled"];
const _hoisted_16 = {
  class: "col"
};
const _hoisted_17 = ["disabled"];
const _hoisted_18 = {
  class: "mt-3"
};
const _hoisted_19 = {
  key: 0,
  class: "text-success"
};
const _hoisted_20 = ["readonly"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Editor = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Editor");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title",
    id: "exampleModalLabel1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Notes & Reflections")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.createNote && $options.createNote(...args), ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "form-check-input",
    type: "radio",
    name: "inputMode",
    id: "basicMode",
    value: "basic",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.inputMode = $event)
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.inputMode]]), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-check-label",
    for: "basicMode"
  }, "Basic", -1 /* CACHED */))]), !$data.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "form-check-input",
    type: "radio",
    name: "inputMode",
    id: "audioMode",
    value: "audio",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.inputMode = $event)
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.inputMode]]), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-check-label",
    for: "audioMode"
  }, "Audio Note Recording", -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !$data.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "form-check-input",
    type: "radio",
    name: "inputMode",
    id: "editorMode",
    value: "editor",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.inputMode = $event)
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.inputMode]]), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-check-label",
    for: "editorMode"
  }, "Editor Keyboard", -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Audio Recording Mode "), $data.inputMode === 'audio' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-success me-2",
    onClick: _cache[3] || (_cache[3] = (...args) => $options.startRecognition && $options.startRecognition(...args)),
    disabled: $data.isListening
  }, [...(_cache[12] || (_cache[12] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-play-circle"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Start Recording ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_15)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger",
    onClick: _cache[4] || (_cache[4] = (...args) => $options.stopRecognition && $options.stopRecognition(...args)),
    disabled: !$data.isListening && !$data.isPaused
  }, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-stop-circle"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Stop Recording ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_17)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [$data.isListening ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("h3", _hoisted_19, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Listening...", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.form.ayah_notes = $event),
    class: "form-control pb-2",
    rows: "5",
    placeholder: "Your speech will appear here...",
    readonly: $data.isListening
  }, null, 8 /* PROPS */, _hoisted_20), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.ayah_notes]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Rich Text Editor Mode "), $data.inputMode === 'editor' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Editor, {
    key: 1,
    modelValue: $data.form.ayah_notes,
    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $data.form.ayah_notes = $event),
    editorStyle: "height: 400px",
    name: "ayah_notes",
    placeholder: "Save your notes and personal reflections privately. Oftentimes your reflections can deeply resonate with your connection to the Quran, and your relationship with Allah."
  }, null, 8 /* PROPS */, ["modelValue"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Basic Mode "), $data.inputMode === 'basic' ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("textarea", {
    key: 2,
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $data.form.ayah_notes = $event),
    class: "form-control pb-2",
    rows: "5",
    placeholder: "Save your notes and personal reflections privately. Oftentimes your reflections can deeply resonate with your connection to the Quran, and your relationship with Allah."
  }, null, 512 /* NEED_PATCH */)), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.ayah_notes]]) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"pt-3 pb-2\" style=\"display: flex; align-items: center;\">\n              <b style=\"margin-right: 10px;\">Make your note either:</b>\n              <div style=\"display: flex; align-items: center;\">\n                <div class=\"form-check form-check-inline\" style=\"margin-right: 15px;\">\n                  <input class=\"form-check-input\" type=\"radio\" name=\"option\" v-model=\"option\" id=\"public\" value=\"0\">\n                  <label class=\"form-check-label\" for=\"public\" style=\"margin-left: 5px;\">Public</label>\n                </div>\n                <div class=\"form-check form-check-inline\">\n                  <input class=\"form-check-input\" type=\"radio\" name=\"option\" v-model=\"option\" id=\"private\" value=\"1\">\n                  <label class=\"form-check-label\" for=\"private\" style=\"margin-left: 5px;\">Private</label>\n                </div>\n              </div>\n            </div> "), _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-secondary",
    "data-bs-dismiss": "modal"
  }, "Close"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-success"
  }, "Submit")], -1 /* CACHED */))], 32 /* NEED_HYDRATION */)])])])], 512 /* NEED_PATCH */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TranslationNote.vue?vue&type=template&id=c2d6784a&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TranslationNote.vue?vue&type=template&id=c2d6784a&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "modal fade",
  id: "translationNote",
  tabindex: "-1",
  "aria-labelledby": "exampleModalLabel1",
  "aria-hidden": "true",
  ref: "modal"
};
const _hoisted_2 = {
  key: 0,
  class: "alert alert-success",
  role: "alert",
  style: {
    "position": "fixed",
    "top": "10px",
    "right": "10px",
    "z-index": "1100"
  }
};
const _hoisted_3 = {
  class: "modal-dialog modal-dialog-centered modal-lg"
};
const _hoisted_4 = {
  class: "modal-content"
};
const _hoisted_5 = {
  class: "modal-body"
};
const _hoisted_6 = {
  class: "container text-center"
};
const _hoisted_7 = {
  class: "row"
};
const _hoisted_8 = {
  class: "col"
};
const _hoisted_9 = {
  key: 0,
  class: "col"
};
const _hoisted_10 = {
  key: 1,
  class: "col"
};
const _hoisted_11 = {
  key: 0
};
const _hoisted_12 = {
  key: 1
};
const _hoisted_13 = {
  class: "container text-center mt-3"
};
const _hoisted_14 = {
  class: "row"
};
const _hoisted_15 = {
  class: "col"
};
const _hoisted_16 = ["disabled"];
const _hoisted_17 = {
  class: "col"
};
const _hoisted_18 = ["disabled"];
const _hoisted_19 = {
  class: "mt-3"
};
const _hoisted_20 = {
  key: 0,
  class: "text-success"
};
const _hoisted_21 = ["readonly"];
const _hoisted_22 = {
  key: 2,
  class: "pt-3"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Editor = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Editor");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Milestone Alert for Notes "), $data.milestoneMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.milestoneMessage), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title",
    id: "exampleModalLabel1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Notes & Reflections")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.createNote && $options.createNote(...args), ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "form-check-input",
    type: "radio",
    name: "inputMode",
    id: "basicMode",
    value: "basic",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.inputMode = $event)
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.inputMode]]), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-check-label",
    for: "basicMode"
  }, "Basic", -1 /* CACHED */))]), !$data.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "form-check-input",
    type: "radio",
    name: "inputMode",
    id: "audioMode",
    value: "audio",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.inputMode = $event)
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.inputMode]]), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-check-label",
    for: "audioMode"
  }, "Audio Note Recording", -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !$data.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "form-check-input",
    type: "radio",
    name: "inputMode",
    id: "editorMode",
    value: "editor",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.inputMode = $event)
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.inputMode]]), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-check-label",
    for: "editorMode"
  }, "Editor Keyboard", -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Basic Mode "), $data.inputMode === 'basic' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.form.ayah_notes = $event),
    class: "form-control pb-2 mt-3",
    rows: "5",
    placeholder: "Save your notes and personal reflections privately. Oftentimes your reflections can deeply resonate with your connection to the Quran, and your relationship with Allah."
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.ayah_notes]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Audio Recording Mode "), $data.inputMode === 'audio' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-success me-2",
    onClick: _cache[4] || (_cache[4] = (...args) => $options.startRecognition && $options.startRecognition(...args)),
    disabled: $data.isListening
  }, [...(_cache[12] || (_cache[12] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-play-circle"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Start Recording ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_16)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger",
    onClick: _cache[5] || (_cache[5] = (...args) => $options.stopRecognition && $options.stopRecognition(...args)),
    disabled: !$data.isListening && !$data.isPaused
  }, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-stop-circle"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Stop Recording ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_18)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [$data.isListening ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("h3", _hoisted_20, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Listening...", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $data.form.ayah_notes = $event),
    class: "form-control pb-2 mt-3",
    rows: "5",
    placeholder: "Your speech will appear here...",
    readonly: $data.isListening
  }, null, 8 /* PROPS */, _hoisted_21), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.ayah_notes]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Rich Text Editor Mode "), $data.inputMode === 'editor' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Editor, {
    modelValue: $data.form.ayah_notes,
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $data.form.ayah_notes = $event),
    name: "ayah_notes",
    placeholder: $data.editorPlaceholder,
    editorStyle: "height: 300px"
  }, null, 8 /* PROPS */, ["modelValue", "placeholder"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"pt-3 pb-2\" style=\"display: flex; align-items: center;\">\n              <b style=\"margin-right: 10px;\">Make your note either:</b>\n              <div style=\"display: flex; align-items: center;\">\n                <div class=\"form-check form-check-inline\" style=\"margin-right: 15px;\">\n                  <input class=\"form-check-input\" type=\"radio\" name=\"option\" v-model=\"option\" id=\"public\" value=\"0\">\n                  <label class=\"form-check-label\" for=\"public\" style=\"margin-left: 5px;\">Public</label>\n                </div>\n                <div class=\"form-check form-check-inline\">\n                  <input class=\"form-check-input\" type=\"radio\" name=\"option\" v-model=\"option\" id=\"private\" value=\"1\">\n                  <label class=\"form-check-label\" for=\"private\" style=\"margin-left: 5px;\">Private</label>\n                </div>\n              </div>\n            </div> "), _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-secondary",
    "data-bs-dismiss": "modal"
  }, "Close"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-success"
  }, "Submit")], -1 /* CACHED */))], 32 /* NEED_HYDRATION */)])])])], 512 /* NEED_PATCH */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TransliterationNote.vue?vue&type=template&id=439391c3&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TransliterationNote.vue?vue&type=template&id=439391c3&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "modal fade",
  id: "translationNote",
  tabindex: "-1",
  "aria-labelledby": "exampleModalLabel1",
  "aria-hidden": "true",
  ref: "modal"
};
const _hoisted_2 = {
  class: "modal-dialog modal-dialog-centered modal-lg"
};
const _hoisted_3 = {
  class: "modal-content"
};
const _hoisted_4 = {
  class: "modal-body"
};
const _hoisted_5 = {
  class: "container text-center"
};
const _hoisted_6 = {
  class: "row"
};
const _hoisted_7 = {
  class: "col"
};
const _hoisted_8 = {
  key: 0,
  class: "col"
};
const _hoisted_9 = {
  key: 1,
  class: "col"
};
const _hoisted_10 = {
  class: "mt-3"
};
const _hoisted_11 = {
  key: 0
};
const _hoisted_12 = {
  class: "container text-center"
};
const _hoisted_13 = {
  class: "row"
};
const _hoisted_14 = {
  class: "col"
};
const _hoisted_15 = ["disabled"];
const _hoisted_16 = {
  class: "col"
};
const _hoisted_17 = ["disabled"];
const _hoisted_18 = {
  class: "mt-3"
};
const _hoisted_19 = {
  key: 0,
  class: "text-success"
};
const _hoisted_20 = ["readonly"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Editor = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Editor");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title",
    id: "exampleModalLabel1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Notes & Reflections")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.createNote && $options.createNote(...args), ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "form-check-input",
    type: "radio",
    name: "inputMode",
    id: "basicMode",
    value: "basic",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.inputMode = $event)
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.inputMode]]), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-check-label",
    for: "basicMode"
  }, "Basic", -1 /* CACHED */))]), !_ctx.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "form-check-input",
    type: "radio",
    name: "inputMode",
    id: "audioMode",
    value: "audio",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.inputMode = $event)
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.inputMode]]), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-check-label",
    for: "audioMode"
  }, "Audio Note Recording", -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !_ctx.isVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "form-check-input",
    type: "radio",
    name: "inputMode",
    id: "editorMode",
    value: "editor",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.inputMode = $event)
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.inputMode]]), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-check-label",
    for: "editorMode"
  }, "Editor Keyboard", -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Audio Recording Mode "), $data.inputMode === 'audio' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-success me-2",
    onClick: _cache[3] || (_cache[3] = (...args) => $options.startRecognition && $options.startRecognition(...args)),
    disabled: $data.isListening
  }, [...(_cache[12] || (_cache[12] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-play-circle"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Start Recording ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_15)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger",
    onClick: _cache[4] || (_cache[4] = (...args) => $options.stopRecognition && $options.stopRecognition(...args)),
    disabled: !$data.isListening && !_ctx.isPaused
  }, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-stop-circle"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Stop Recording ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_17)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Status "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [$data.isListening ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("h3", _hoisted_19, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", {
    class: "pt-3"
  }, "Listening...", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.form.ayah_notes = $event),
    class: "form-control pb-2",
    rows: "5",
    placeholder: "Your speech will appear here...",
    readonly: $data.isListening
  }, null, 8 /* PROPS */, _hoisted_20), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.ayah_notes]])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Rich Text Editor Mode "), $data.inputMode === 'editor' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Editor, {
    key: 1,
    modelValue: $data.form.ayah_notes,
    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $data.form.ayah_notes = $event),
    editorStyle: "height: 400px",
    name: "ayah_notes",
    placeholder: "Save your notes and personal reflections privately. Oftentimes your reflections can deeply resonate with your connection to the Quran, and your relationship with Allah."
  }, null, 8 /* PROPS */, ["modelValue"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Basic Mode "), $data.inputMode === 'basic' ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("textarea", {
    key: 2,
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $data.form.ayah_notes = $event),
    class: "form-control pb-2",
    rows: "5",
    placeholder: "Save your notes and personal reflections privately. Oftentimes your reflections can deeply resonate with your connection to the Quran, and your relationship with Allah."
  }, null, 512 /* NEED_PATCH */)), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.ayah_notes]]) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"pt-3 pb-2\" style=\"display: flex; align-items: center;\">\n              <b style=\"margin-right: 10px;\" class=\"pr-2\">Make your note either:</b>\n              <div style=\"display: flex; align-items: center;\">\n                <div class=\"form-check form-check-inline\" style=\"margin-right: 15px;\">\n                  <input class=\"form-check-input\" type=\"radio\" name=\"option\" v-model=\"option\" id=\"public\" value=\"0\">\n                  <label class=\"form-check-label\" for=\"public\" style=\"margin-left: 5px;\">Public</label>\n                </div>\n                <div class=\"form-check form-check-inline\">\n                  <input class=\"form-check-input\" type=\"radio\" name=\"option\" v-model=\"option\" id=\"private\" value=\"1\">\n                  <label class=\"form-check-label\" for=\"private\" style=\"margin-left: 5px;\">Private</label>\n                </div>\n              </div>\n            </div> "), _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-footer"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-secondary",
    "data-bs-dismiss": "modal"
  }, "Close"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    class: "btn btn-success"
  }, "Submit")], -1 /* CACHED */))], 32 /* NEED_HYDRATION */)])])])], 512 /* NEED_PATCH */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/screen_capture/ScreenTranslationCapture.vue?vue&type=template&id=79bc92a3":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/screen_capture/ScreenTranslationCapture.vue?vue&type=template&id=79bc92a3 ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "modal fade",
  id: "previewModal",
  tabindex: "-1",
  "aria-labelledby": "previewModalLabel",
  "aria-hidden": "true"
};
const _hoisted_2 = {
  class: "modal-dialog modal-xl modal-dialog-centered"
};
const _hoisted_3 = {
  class: "modal-content"
};
const _hoisted_4 = {
  class: "modal-body text-center",
  style: {
    "box-shadow": "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
    "padding": "15px"
  }
};
const _hoisted_5 = ["src"];
const _hoisted_6 = {
  key: 1
};
const _hoisted_7 = {
  class: "modal-footer"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Screenshot icon "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-camera text-right mr-2 h3",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.captureTranslation && $options.captureTranslation(...args)),
    "aria-expanded": "false",
    "data-bs-placement": "top",
    title: "Screenshot verse",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      iconColor: _ctx.iconColor,
      cursor: 'pointer'
    })
  }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "modal-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "modal-title",
    id: "previewModalLabel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", null, "Screenshot Preview")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [$data.previewImage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("img", {
    key: 0,
    src: $data.previewImage,
    alt: "Screenshot",
    class: "img-fluid",
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_5)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_6, "Loading..."))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-secondary",
    "data-bs-dismiss": "modal"
  }, "Cancel", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-success",
    onClick: _cache[1] || (_cache[1] = $event => $options.downloadImage('png'))
  }, "Download PNG"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-success",
    onClick: _cache[2] || (_cache[2] = $event => $options.downloadImage('jpg'))
  }, "Download JPG")])])])])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/twitter/TwitterShareTransliteration.vue?vue&type=template&id=1d420697":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/twitter/TwitterShareTransliteration.vue?vue&type=template&id=1d420697 ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", {
    onClick: _cache[0] || (_cache[0] = (...args) => $options.shareTransliterationOnTwitter && $options.shareTransliterationOnTwitter(...args)),
    class: "mr-2 bi bi-twitter-x text-right h4",
    "aria-expanded": "false",
    "data-bs-placement": "top",
    title: "Share via X"
  });
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue?vue&type=template&id=3663e5cf&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue?vue&type=template&id=3663e5cf&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", {
    class: "bi bi-whatsapp text-right mr-2 h4",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.shareTransliterationViaWhatsApp && $options.shareTransliterationViaWhatsApp(...args)),
    "aria-expanded": "false",
    "data-bs-placement": "top",
    title: "Share on Whatsapp"
  });
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./resources/components/scripts/QuranComponent.script.js?vue&type=script&lang=js&external":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./resources/components/scripts/QuranComponent.script.js?vue&type=script&lang=js&external ***!
  \******************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _vue_Intro_Title_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vue/Intro/Title.vue */ "./resources/components/vue/Intro/Title.vue");
/* harmony import */ var _vue_search_AdvancedSearch_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vue/search/AdvancedSearch.vue */ "./resources/components/vue/search/AdvancedSearch.vue");
/* harmony import */ var _vue_search_SurahDropdown_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../vue/search/SurahDropdown.vue */ "./resources/components/vue/search/SurahDropdown.vue");
/* harmony import */ var _vue_search_AyahDropdown_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../vue/search/AyahDropdown.vue */ "./resources/components/vue/search/AyahDropdown.vue");
/* harmony import */ var _vue_search_ErrorAlert_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../vue/search/ErrorAlert.vue */ "./resources/components/vue/search/ErrorAlert.vue");
/* harmony import */ var _vue_tabs_NavTabs_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../vue/tabs/NavTabs.vue */ "./resources/components/vue/tabs/NavTabs.vue");
/* harmony import */ var _vue_TranslationSection_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../vue/TranslationSection.vue */ "./resources/components/vue/TranslationSection.vue");
/* harmony import */ var _vue_TafseerSection_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../vue/TafseerSection.vue */ "./resources/components/vue/TafseerSection.vue");
/* harmony import */ var _vue_TransliterationSection_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../vue/TransliterationSection.vue */ "./resources/components/vue/TransliterationSection.vue");
/* harmony import */ var _vue_TranslationActions_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../vue/TranslationActions.vue */ "./resources/components/vue/TranslationActions.vue");
/* harmony import */ var _vue_TafseerActions_vue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../vue/TafseerActions.vue */ "./resources/components/vue/TafseerActions.vue");
/* harmony import */ var _vue_TransliterationActions_vue__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../vue/TransliterationActions.vue */ "./resources/components/vue/TransliterationActions.vue");
/* harmony import */ var _vue_translation_features_notes_TranslationNote_vue__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../vue/translation/features/notes/TranslationNote.vue */ "./resources/components/vue/translation/features/notes/TranslationNote.vue");
/* harmony import */ var _vue_translation_features_notes_TafseerNote_vue__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../vue/translation/features/notes/TafseerNote.vue */ "./resources/components/vue/translation/features/notes/TafseerNote.vue");
/* harmony import */ var _vue_translation_features_notes_TransliterationNote_vue__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../vue/translation/features/notes/TransliterationNote.vue */ "./resources/components/vue/translation/features/notes/TransliterationNote.vue");
/* harmony import */ var _vue_modals_SurahInfoModal_vue__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../vue/modals/SurahInfoModal.vue */ "./resources/components/vue/modals/SurahInfoModal.vue");
/* harmony import */ var _vue_Intro_Welcome_vue__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../vue/Intro/Welcome.vue */ "./resources/components/vue/Intro/Welcome.vue");
/* harmony import */ var _vue_translation_HelpGuideModal_vue__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../vue/translation/HelpGuideModal.vue */ "./resources/components/vue/translation/HelpGuideModal.vue");



















const STORAGE_KEYS = {
  toggle: "toggleState",
  swipeTip: "quran.swipeTipDismissed",
  gestureNavigation: "quran.gestureNavigationEnabled"
};
const PREFETCH_OFFSETS = [-2, -1, 1, 2];
function toNumber(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "QuranComponent",
  components: {
    Title: _vue_Intro_Title_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    AdvancedSearch: _vue_search_AdvancedSearch_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    SurahDropdown: _vue_search_SurahDropdown_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    AyahDropdown: _vue_search_AyahDropdown_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    ErrorAlert: _vue_search_ErrorAlert_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
    NavTabs: _vue_tabs_NavTabs_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
    TranslationSection: _vue_TranslationSection_vue__WEBPACK_IMPORTED_MODULE_7__["default"],
    TafseerSection: _vue_TafseerSection_vue__WEBPACK_IMPORTED_MODULE_8__["default"],
    TransliterationSection: _vue_TransliterationSection_vue__WEBPACK_IMPORTED_MODULE_9__["default"],
    TranslationActions: _vue_TranslationActions_vue__WEBPACK_IMPORTED_MODULE_10__["default"],
    TafseerActions: _vue_TafseerActions_vue__WEBPACK_IMPORTED_MODULE_11__["default"],
    TransliterationActions: _vue_TransliterationActions_vue__WEBPACK_IMPORTED_MODULE_12__["default"],
    TranslationNote: _vue_translation_features_notes_TranslationNote_vue__WEBPACK_IMPORTED_MODULE_13__["default"],
    TafseerNote: _vue_translation_features_notes_TafseerNote_vue__WEBPACK_IMPORTED_MODULE_14__["default"],
    TransliterationNote: _vue_translation_features_notes_TransliterationNote_vue__WEBPACK_IMPORTED_MODULE_15__["default"],
    SurahInfoModal: _vue_modals_SurahInfoModal_vue__WEBPACK_IMPORTED_MODULE_16__["default"],
    Welcome: _vue_Intro_Welcome_vue__WEBPACK_IMPORTED_MODULE_17__["default"],
    HelpGuideModal: _vue_translation_HelpGuideModal_vue__WEBPACK_IMPORTED_MODULE_18__["default"]
  },
  data() {
    return {
      // UI state
      isVisible: false,
      isOpen: false,
      isFullScreen: false,
      activeTab: "home",
      isMobile: false,
      isPlaying: false,
      expanded: false,
      showSwipeTip: false,
      showSwipeNotice: false,
      swipeNoticeText: "",
      swipeNoticeDir: "next",
      lastSwipeDir: "next",
      nextStepMinimized: false,
      screenReaderMessage: "",
      modalInformation: null,
      dropdownHidden: true,
      // Surah / Ayah data
      surat: [],
      filteredSurah: [],
      selectedSurahId: null,
      ayat: [],
      selectedIndexAyah: -1,
      selectedAyahId: null,
      selectedAyah: null,
      verseNumber: "",
      information: null,
      tafseer: null,
      translation: "",
      currentAyah: null,
      // Additional UI helpers consumed by child components
      showMoreLink: false,
      showAlertText: false,
      showAlert: false,
      showErrorAlert: false,
      showAlertTextNote: false,
      showAlert1: false,
      showError: false,
      // Network + cache state
      isLoading: false,
      ayahCache: Object.create(null),
      infoCache: Object.create(null),
      tafseerCache: Object.create(null),
      ayatInflight: null,
      fetchAyatTimer: null,
      // Alert + feedback
      alertMessage: "",
      alertType: "success",
      // Session data
      userId: null,
      // Gesture tracking
      gestureNavigationEnabled: true,
      deviceSupportsGestures: true,
      allowGestures: true,
      activeSwipeSource: null,
      gestureHandled: false,
      touchStartX: 0,
      touchStartY: 0,
      touchEndX: 0,
      touchEndY: 0,
      touchStartTime: 0,
      pointerActive: false,
      pointerStartX: 0,
      pointerStartY: 0,
      pointerStartTime: 0,
      lastGestureTs: 0,
      wheelAccumX: 0,
      wheelLastTime: 0,
      swipeMinDistance: 20,
      swipeMaxDuration: 800,
      wheelThreshold: 35,
      wheelVertLeak: 30,
      wheelResetMs: 160,
      gestureCooldownMs: 300
      // Next-step minimized state
    };
  },
  computed: {
    combinedText() {
      var _this$information, _this$information$tra, _this$information2;
      const translation = typeof ((_this$information = this.information) === null || _this$information === void 0 ? void 0 : _this$information.translation) === "object" ? (_this$information$tra = this.information.translation) === null || _this$information$tra === void 0 ? void 0 : _this$information$tra.text : (_this$information2 = this.information) === null || _this$information2 === void 0 ? void 0 : _this$information2.translation;
      return translation ? `Translation: ${translation}` : "";
    },
    selectedSurahMeta() {
      const surahId = Number(this.selectedSurahId);
      if (!surahId || !Array.isArray(this.surat) || !this.surat.length) {
        return null;
      }
      const found = this.surat.find(item => Number(item === null || item === void 0 ? void 0 : item.id) === surahId) || null;
      if (!found) return null;
      return {
        number: Number(found.id) || surahId,
        englishName: found.name_en || found.englishName || found.surah_name_en || "Surah",
        translationName: found.englishNameTranslation || found.name_translation || found.surah_name_translation || "",
        arabicName: found.name_ar || found.name || found.surah_name_ar || ""
      };
    }
  },
  created() {
    this.bootstrapComponent();
  },
  mounted() {
    this.updateIsMobile();
    this.updateInputModalityGestureGate();
    this._onResize = () => {
      this.updateIsMobile();
      this.updateInputModalityGestureGate();
    };
    window.addEventListener("resize", this._onResize, {
      passive: true
    });
    this._onWheel = event => this.handleWindowWheel(event);
    window.addEventListener("wheel", this._onWheel, {
      passive: true
    });
  },
  beforeUnmount() {
    if (this._onResize) {
      window.removeEventListener("resize", this._onResize, {
        passive: true
      });
      this._onResize = null;
    }
    if (this._onWheel) {
      window.removeEventListener("wheel", this._onWheel, {
        passive: true
      });
      this._onWheel = null;
    }
    if (this.fetchAyatTimer) {
      clearTimeout(this.fetchAyatTimer);
      this.fetchAyatTimer = null;
    }
    if (this._swipeNoticeTimer) {
      clearTimeout(this._swipeNoticeTimer);
      this._swipeNoticeTimer = null;
    }
  },
  methods: {
    async bootstrapComponent() {
      this.restoreToggleState();
      this.restoreGestureNavigationState();
      this.userId = this.safeGetLocalStorage("userId");
      await this.fetchSurahList();
    },
    safeGetLocalStorage(key) {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        return null;
      }
    },
    restoreToggleState() {
      const raw = this.safeGetLocalStorage(STORAGE_KEYS.toggle);
      if (raw !== null) {
        try {
          this.isVisible = JSON.parse(raw);
        } catch (error) {
          this.isVisible = raw === "true";
        }
      }
    },
    restoreGestureNavigationState() {
      const raw = this.safeGetLocalStorage(STORAGE_KEYS.gestureNavigation);
      if (raw === null) return;
      if (raw === "true" || raw === "1") {
        this.gestureNavigationEnabled = true;
        return;
      }
      if (raw === "false" || raw === "0") {
        this.gestureNavigationEnabled = false;
        return;
      }
      try {
        this.gestureNavigationEnabled = !!JSON.parse(raw);
      } catch (error) {
        this.gestureNavigationEnabled = raw !== "false";
      }
    },
    saveGestureNavigationState() {
      try {
        window.localStorage.setItem(STORAGE_KEYS.gestureNavigation, JSON.stringify(this.gestureNavigationEnabled));
      } catch (error) {
        // ignore storage issues gracefully
      }
    },
    setupSwipeTip() {
      const dismissed = this.safeGetLocalStorage(STORAGE_KEYS.swipeTip);
      this.showSwipeTip = dismissed !== "1" && this.allowGestures;
    },
    async fetchSurahList() {
      try {
        const {
          data
        } = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/get_surat");
        this.surat = Array.isArray(data) ? data : [];
        this.filteredSurah = this.surat;
      } catch (error) {
        console.error("Error fetching surahs:", error);
      }
    },
    saveToggleState() {
      try {
        window.localStorage.setItem(STORAGE_KEYS.toggle, JSON.stringify(this.isVisible));
      } catch (error) {
        // ignore storage issues gracefully
      }
    },
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
    },
    updateIsMobile() {
      this.isMobile = (window.innerWidth || 0) <= 767;
    },
    handleGestureNavigationToggle(event) {
      var _event$target;
      this.gestureNavigationEnabled = !!(event !== null && event !== void 0 && (_event$target = event.target) !== null && _event$target !== void 0 && _event$target.checked);
      this.saveGestureNavigationState();
      this.updateInputModalityGestureGate();
    },
    updateInputModalityGestureGate() {
      let hasTouch = false;
      try {
        hasTouch = "ontouchstart" in window || (navigator.maxTouchPoints || 0) > 0;
      } catch (error) {
        hasTouch = false;
      }
      this.deviceSupportsGestures = hasTouch || this.isMobile;
      this.allowGestures = this.gestureNavigationEnabled;
      if (!this.allowGestures) {
        this.activeSwipeSource = null;
        this.pointerActive = false;
        this.gestureHandled = false;
        this.wheelAccumX = 0;
        this.showSwipeNotice = false;
      }
      this.setupSwipeTip();
    },
    updateSelectedSurah(id) {
      const numeric = toNumber(id);
      if (!numeric || numeric === this.selectedSurahId) {
        return;
      }
      this.selectedSurahId = numeric;
      this.selectedIndexAyah = -1;
      this.selectedAyahId = null;
      this.selectedAyah = null;
      this.currentAyah = null;
      this.dropdownHidden = false;
      this.information = null;
      this.tafseer = null;
      this.scheduleFetchAyat(numeric);
    },
    scheduleFetchAyat(id = this.selectedSurahId) {
      if (!id) return;
      if (this.fetchAyatTimer) {
        clearTimeout(this.fetchAyatTimer);
      }
      this.fetchAyatTimer = setTimeout(() => this.fetchAyat(id), 150);
    },
    async fetchAyat(id = this.selectedSurahId) {
      if (!id) return;
      if (this.ayahCache[id]) {
        this.ayat = this.ayahCache[id];
        this.dropdownHidden = !this.ayat.length;
        if (this.ayat.length) {
          this.selectAyah(Math.max(0, this.selectedIndexAyah));
        }
        return;
      }
      if (this.ayatInflight) return;
      try {
        this.isLoading = true;
        this.ayatInflight = axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/get_ayat", {
          params: {
            surah_id: id
          }
        });
        const {
          data
        } = await this.ayatInflight;
        const ayat = Array.isArray(data) ? data : [];
        this.ayahCache[id] = ayat;
        this.ayat = ayat;
        this.dropdownHidden = !ayat.length;
        if (ayat.length) {
          this.selectAyah(0);
        } else {
          this.information = null;
          this.tafseer = null;
        }
      } catch (error) {
        console.error("Error fetching ayat:", error);
      } finally {
        this.isLoading = false;
        this.ayatInflight = null;
      }
    },
    selectAyah(index) {
      var _ayah$id;
      if (!Array.isArray(this.ayat) || !this.ayat.length) return;
      const clamped = Math.max(0, Math.min(index, this.ayat.length - 1));
      if (this.selectedIndexAyah === clamped && this.information) {
        this.scrollToSelectedAyah();
        return;
      }
      this.selectedIndexAyah = clamped;
      const ayah = this.ayat[clamped];
      this.selectedAyah = ayah;
      this.currentAyah = ayah;
      this.selectedAyahId = (_ayah$id = ayah === null || ayah === void 0 ? void 0 : ayah.id) !== null && _ayah$id !== void 0 ? _ayah$id : null;
      if (!ayah) return;
      this.updateCardSection(ayah);
      this.screenReaderMessage = `Selected verse ${ayah.ayah_id}`;
      this.scrollToSelectedAyah();
      this.ensureAyahPayload(ayah, clamped);
    },
    async ensureAyahPayload(ayah, index) {
      if (!(ayah !== null && ayah !== void 0 && ayah.id)) return;
      const cachedInfo = this.infoCache[ayah.id];
      const cachedTafseer = this.tafseerCache[ayah.id];
      if (cachedInfo && cachedTafseer) {
        this.applyAyahPayload(cachedInfo, cachedTafseer);
        this.prefetchAdjacentAyahData(index);
        return;
      }
      try {
        this.isLoading = true;
        const [info, tafseer] = await Promise.all([this.fetchInformation(ayah.id), this.fetchTafseer(ayah.id)]);
        this.infoCache[ayah.id] = info;
        this.tafseerCache[ayah.id] = tafseer;
        this.applyAyahPayload(info, tafseer);
        this.prefetchAdjacentAyahData(index);
      } catch (error) {
        console.error("Error fetching ayah payload:", error);
      } finally {
        this.isLoading = false;
      }
    },
    applyAyahPayload(info, tafseer) {
      if (info) {
        var _info$translation;
        this.information = info;
        this.modalInformation = info;
        this.translation = typeof info.translation === "object" ? (_info$translation = info.translation) === null || _info$translation === void 0 ? void 0 : _info$translation.text : info.translation;
      }
      if (tafseer) {
        this.tafseer = tafseer;
      }
    },
    prefetchAdjacentAyahData(index) {
      PREFETCH_OFFSETS.forEach(offset => {
        const targetIndex = index + offset;
        if (targetIndex < 0 || targetIndex >= this.ayat.length) return;
        const target = this.ayat[targetIndex];
        if (!(target !== null && target !== void 0 && target.id)) return;
        if (!this.infoCache[target.id]) {
          this.fetchInformation(target.id).then(info => {
            this.infoCache[target.id] = info;
          }).catch(() => {});
        }
        if (!this.tafseerCache[target.id]) {
          this.fetchTafseer(target.id).then(tafseer => {
            this.tafseerCache[target.id] = tafseer;
          }).catch(() => {});
        }
      });
    },
    async fetchInformation(id) {
      const {
        data
      } = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("/get_informations", {
        params: {
          id
        }
      });
      return data;
    },
    async fetchTafseer(id) {
      const {
        data
      } = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`/tafseer/${id}/fetch`);
      return data;
    },
    scrollToSelectedAyah() {
      this.$nextTick(() => {
        const list = this.$refs.ayahList;
        if (!list) return;
        const selected = list.querySelector(".selected");
        if (selected) {
          selected.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
          });
        }
      });
    },
    updateCardSection(ayah) {
      this.currentAyah = ayah;
    },
    dismissError() {
      this.showError = false;
    },
    goToFirstAyah() {
      this.selectAyah(0);
    },
    goToPreviousAyah() {
      if (!this.ayat.length) return;
      const nextIndex = (this.selectedIndexAyah - 1 + this.ayat.length) % this.ayat.length;
      this.selectAyah(nextIndex);
    },
    goToNextAyah() {
      if (!this.ayat.length) return;
      const nextIndex = (this.selectedIndexAyah + 1) % this.ayat.length;
      this.selectAyah(nextIndex);
    },
    goToLastAyah() {
      if (!this.ayat.length) return;
      this.selectAyah(this.ayat.length - 1);
    },
    handleInputChange(payload) {
      if (payload && Array.isArray(payload.results)) {
        this.filteredResults = payload.results;
      }
    },
    toggleContent() {
      this.isOpen = !this.isOpen;
    },
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen;
    },
    toggleAudioPlayback() {
      const sections = [this.$refs.translationSection, this.$refs.tafseerSection, this.$refs.transliterationSection].filter(Boolean);
      sections.forEach(section => {
        if (typeof (section === null || section === void 0 ? void 0 : section.toggleSpeech) === "function") {
          try {
            section.toggleSpeech();
          } catch (error) {
            console.warn("toggleSpeech failed", error);
          }
        }
      });
    },
    updateInformation(info) {
      var _info$translation2, _info$ayah;
      if (!info) return;
      this.information = info;
      this.modalInformation = info;
      this.translation = typeof info.translation === "object" ? (_info$translation2 = info.translation) === null || _info$translation2 === void 0 ? void 0 : _info$translation2.text : info.translation;
      if ((_info$ayah = info.ayah) !== null && _info$ayah !== void 0 && _info$ayah.id) {
        this.infoCache[info.ayah.id] = info;
      }
    },
    updateTafseer(tafseer) {
      this.tafseer = tafseer;
      if (this.selectedAyahId) {
        this.tafseerCache[this.selectedAyahId] = tafseer;
      }
    },
    releaseSwipeSource(source) {
      if (this.activeSwipeSource === source) {
        this.activeSwipeSource = null;
      }
      const finalize = () => {
        this.touchEndX = 0;
        this.touchEndY = 0;
      };
      if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
        window.requestAnimationFrame(finalize);
      } else {
        setTimeout(finalize, 0);
      }
    },
    shouldProcessGesture() {
      const now = Date.now();
      if (now - this.lastGestureTs < this.gestureCooldownMs) {
        return false;
      }
      this.lastGestureTs = now;
      return true;
    },
    handleTouchStart(event) {
      var _touch$clientX, _touch$clientY;
      if (!this.allowGestures) return;
      if (this.activeSwipeSource && this.activeSwipeSource !== "touch") return;
      this.activeSwipeSource = "touch";
      this.gestureHandled = false;
      const touch = event.changedTouches ? event.changedTouches[0] : event;
      this.touchStartX = (_touch$clientX = touch.clientX) !== null && _touch$clientX !== void 0 ? _touch$clientX : 0;
      this.touchStartY = (_touch$clientY = touch.clientY) !== null && _touch$clientY !== void 0 ? _touch$clientY : 0;
      this.touchStartTime = Date.now();
    },
    handleTouchMove(event) {
      var _touch$clientX2, _touch$clientY2;
      if (!this.allowGestures || this.activeSwipeSource !== "touch") return;
      const touch = event.changedTouches ? event.changedTouches[0] : event;
      this.touchEndX = (_touch$clientX2 = touch.clientX) !== null && _touch$clientX2 !== void 0 ? _touch$clientX2 : 0;
      this.touchEndY = (_touch$clientY2 = touch.clientY) !== null && _touch$clientY2 !== void 0 ? _touch$clientY2 : 0;
    },
    handleTouchEnd(event) {
      var _event$stopPropagatio;
      if (!this.allowGestures || this.activeSwipeSource && this.activeSwipeSource !== "touch") return;
      const deltaX = (this.touchEndX || this.touchStartX) - this.touchStartX;
      const deltaY = (this.touchEndY || this.touchStartY) - this.touchStartY;
      const duration = Date.now() - this.touchStartTime;
      if (this.gestureHandled) {
        this.releaseSwipeSource("touch");
        return;
      }
      if (Math.abs(deltaX) < this.swipeMinDistance || Math.abs(deltaY) > this.wheelVertLeak || duration > this.swipeMaxDuration) {
        this.releaseSwipeSource("touch");
        return;
      }
      if (!this.shouldProcessGesture()) {
        this.releaseSwipeSource("touch");
        return;
      }
      this.gestureHandled = true;
      if (event !== null && event !== void 0 && event.cancelable) {
        event.preventDefault();
      }
      event === null || event === void 0 || (_event$stopPropagatio = event.stopPropagation) === null || _event$stopPropagatio === void 0 || _event$stopPropagatio.call(event);
      // Swipe right (deltaX > 0) should advance to next; swipe left to previous
      if (deltaX > 0) {
        this.goToNextAyah();
        this.triggerSwipeFeedback("next");
      } else {
        this.goToPreviousAyah();
        this.triggerSwipeFeedback("prev");
      }
      this.releaseSwipeSource("touch");
    },
    handlePointerDown(event) {
      if (!this.allowGestures || event.pointerType === "mouse" || event.pointerType === "touch") return;
      if (this.activeSwipeSource && this.activeSwipeSource !== "pointer") return;
      this.activeSwipeSource = "pointer";
      this.pointerActive = true;
      this.gestureHandled = false;
      this.pointerStartX = event.clientX;
      this.pointerStartY = event.clientY;
      this.pointerStartTime = Date.now();
    },
    handlePointerMove(event) {
      if (!this.allowGestures || !this.pointerActive || this.activeSwipeSource !== "pointer" || event.pointerType === "touch") {
        return;
      }
      this.touchEndX = event.clientX;
      this.touchEndY = event.clientY;
    },
    handlePointerUp(event) {
      if (!this.allowGestures || !this.pointerActive || this.activeSwipeSource !== "pointer" || event.pointerType === "touch") {
        return;
      }
      this.pointerActive = false;
      const deltaX = (this.touchEndX || this.pointerStartX) - this.pointerStartX;
      const duration = Date.now() - this.pointerStartTime;
      if (this.gestureHandled) {
        this.releaseSwipeSource("pointer");
        return;
      }
      if (Math.abs(deltaX) < this.swipeMinDistance || duration > this.swipeMaxDuration) {
        this.releaseSwipeSource("pointer");
        return;
      }
      if (!this.shouldProcessGesture()) {
        this.releaseSwipeSource("pointer");
        return;
      }
      this.gestureHandled = true;
      // Swipe right (deltaX > 0) should advance to next; swipe left to previous
      if (deltaX > 0) {
        this.goToNextAyah();
        this.triggerSwipeFeedback("next");
      } else {
        this.goToPreviousAyah();
        this.triggerSwipeFeedback("prev");
      }
      this.releaseSwipeSource("pointer");
    },
    handleWindowWheel(event) {
      if (!this.allowGestures) return;
      const now = Date.now();
      if (now - this.wheelLastTime > this.wheelResetMs) {
        this.wheelAccumX = 0;
      }
      this.wheelAccumX += event.deltaX;
      this.wheelLastTime = now;
      if (Math.abs(this.wheelAccumX) < this.wheelThreshold) return;
      if (!this.shouldProcessGesture()) {
        this.wheelAccumX = 0;
        return;
      }
      if (this.wheelAccumX > 0) {
        this.goToNextAyah();
        this.triggerSwipeFeedback("next");
      } else {
        this.goToPreviousAyah();
        this.triggerSwipeFeedback("prev");
      }
      this.wheelAccumX = 0;
    },
    handleWheelTranslation(event) {
      this.handleWindowWheel(event);
    },
    handleWheelTafseer(event) {
      this.handleWindowWheel(event);
    },
    handleWheelTransliteration(event) {
      this.handleWindowWheel(event);
    },
    triggerSwipeFeedback(direction) {
      this.lastSwipeDir = direction;
      this.swipeNoticeDir = direction;
      this.swipeNoticeText = direction === "next" ? "Next verse" : "Previous verse";
      this.showSwipeNotice = true;
      if (this._swipeNoticeTimer) {
        clearTimeout(this._swipeNoticeTimer);
      }
      this._swipeNoticeTimer = setTimeout(() => {
        this.showSwipeNotice = false;
        this._swipeNoticeTimer = null;
      }, 500);
    },
    dismissSwipeTip() {
      this.showSwipeTip = false;
      try {
        window.localStorage.setItem(STORAGE_KEYS.swipeTip, "1");
      } catch (error) {
        // ignore
      }
    },
    clearHighlight() {
      // placeholder for child callback
    },
    highlightText(charIndex, currentWord) {
      var _this$$refs$translati;
      if ((_this$$refs$translati = this.$refs.translationSection) !== null && _this$$refs$translati !== void 0 && _this$$refs$translati.highlightText) {
        this.$refs.translationSection.highlightText(charIndex, currentWord);
      }
    },
    closeModal() {
      this.modalInformation = null;
    },
    openModal(refName) {
      const ref = this.$refs[refName];
      if (ref && typeof ref.showModal === "function") {
        ref.showModal();
      }
    },
    closeAlertText() {
      this.showAlertText = false;
    },
    updateSuccessMessage(message) {
      this.alertMessage = message;
      this.showAlertText = !!message;
    },
    async sendBookmark(payload, successMessage) {
      try {
        await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("/bookmarks", payload);
        this.alertMessage = successMessage;
        this.alertType = "success";
        this.showAlert = true;
        this.scheduleAlertDismiss();
      } catch (error) {
        console.error("Error submitting bookmark:", error);
        this.showErrorAlert = true;
        this.scheduleAlertDismiss("error");
      }
    },
    submitBookmarkPayload(content, successMessage) {
      var _this$information3, _ayah$surah, _this$information4;
      const ayah = (_this$information3 = this.information) === null || _this$information3 === void 0 ? void 0 : _this$information3.ayah;
      if (!ayah || !content) {
        this.showErrorAlert = true;
        this.scheduleAlertDismiss("error");
        return;
      }
      const payload = {
        surah_name: (_ayah$surah = ayah.surah) === null || _ayah$surah === void 0 ? void 0 : _ayah$surah.name_en,
        ayah_num: (_this$information4 = this.information) === null || _this$information4 === void 0 ? void 0 : _this$information4.ayah_id,
        ayah_verse_ar: ayah.ayah_text,
        ayah_verse_en: content,
        user_id: this.userId
      };
      this.sendBookmark(payload, successMessage);
    },
    submitForm() {
      this.submitBookmarkPayload(this.translation, "Ayah bookmarked successfully!");
    },
    submitFormTafseer() {
      this.submitBookmarkPayload(this.tafseer, "Tafseer bookmarked successfully!");
    },
    submitFormTransliteration() {
      var _this$information5;
      const transliteration = (_this$information5 = this.information) === null || _this$information5 === void 0 ? void 0 : _this$information5.transliteration;
      this.submitBookmarkPayload(transliteration, "Transliteration bookmarked successfully!");
    },
    scheduleAlertDismiss(type = "success") {
      setTimeout(() => {
        if (type === "success") {
          this.showAlert = false;
        } else {
          this.showErrorAlert = false;
        }
      }, 3000);
    },
    getAyat() {
      this.scheduleFetchAyat();
    },
    selectSurahFromResults(surah) {
      if (!surah) return;
      this.updateSelectedSurah(surah.id || surah);
    }
  },
  watch: {
    ayat(newAyat) {
      if (Array.isArray(newAyat) && newAyat.length) {
        this.selectAyah(0);
      }
    },
    verseNumber(newVal, oldVal) {
      if (newVal !== oldVal) {
        const numeric = toNumber(newVal);
        if (numeric && numeric >= 1 && numeric <= this.ayat.length) {
          this.selectAyah(numeric - 1);
        }
      }
    },
    selectedSurahId(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.scheduleFetchAyat(newVal);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Intro/Welcome.vue?vue&type=style&index=0&id=3d833635&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Intro/Welcome.vue?vue&type=style&index=0&id=3d833635&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TafseerSection.vue?vue&type=style&index=0&id=3f4b2587&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TafseerSection.vue?vue&type=style&index=0&id=3f4b2587&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TranslationSection.vue?vue&type=style&index=0&id=0db761ce&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TranslationSection.vue?vue&type=style&index=0&id=0db761ce&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TransliterationSection.vue?vue&type=style&index=0&id=7a4fb9e6&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TransliterationSection.vue?vue&type=style&index=0&id=7a4fb9e6&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/accesibility/ScreenReader.vue?vue&type=style&index=0&id=dbcc6f5e&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/accesibility/ScreenReader.vue?vue&type=style&index=0&id=dbcc6f5e&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/folder_manager/FolderSelectionModal.vue?vue&type=style&index=0&id=aee34890&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/folder_manager/FolderSelectionModal.vue?vue&type=style&index=0&id=aee34890&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/AlertModal.vue?vue&type=style&index=0&id=68112f60&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/AlertModal.vue?vue&type=style&index=0&id=68112f60&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/OffcanvasSetting.vue?vue&type=style&index=0&id=63c77d28&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/OffcanvasSetting.vue?vue&type=style&index=0&id=63c77d28&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/SurahInfoModal.vue?vue&type=style&index=0&id=c99d7ef2&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/SurahInfoModal.vue?vue&type=style&index=0&id=c99d7ef2&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AdvancedSearch.vue?vue&type=style&index=0&id=5d4c6087&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AdvancedSearch.vue?vue&type=style&index=0&id=5d4c6087&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AdvancedSearch.vue?vue&type=style&index=1&id=5d4c6087&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AdvancedSearch.vue?vue&type=style&index=1&id=5d4c6087&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AyahDropdown.vue?vue&type=style&index=0&id=71893426&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AyahDropdown.vue?vue&type=style&index=0&id=71893426&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/ErrorAlert.vue?vue&type=style&index=0&id=2b7ca9d1&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/ErrorAlert.vue?vue&type=style&index=0&id=2b7ca9d1&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/Magnifier.vue?vue&type=style&index=0&id=7453b1f1&scoped=true&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/Magnifier.vue?vue&type=style&index=0&id=7453b1f1&scoped=true&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/SurahDropdown.vue?vue&type=style&index=0&id=294bd1ca&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/SurahDropdown.vue?vue&type=style&index=0&id=294bd1ca&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/settings/SpeechSettings.vue?vue&type=style&index=0&id=3ff1d3e7&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/settings/SpeechSettings.vue?vue&type=style&index=0&id=3ff1d3e7&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/tabs/NavTabs.vue?vue&type=style&index=0&id=0f748fca&scoped=true&lang=css":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/tabs/NavTabs.vue?vue&type=style&index=0&id=0f748fca&scoped=true&lang=css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/AyahInfo.vue?vue&type=style&index=0&id=67bf7c25&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/AyahInfo.vue?vue&type=style&index=0&id=67bf7c25&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/BottomAudioPlayer.vue?vue&type=style&index=0&id=bb3b8938&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/BottomAudioPlayer.vue?vue&type=style&index=0&id=bb3b8938&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/MainAyah.vue?vue&type=style&index=0&id=2f0e3aa0&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/MainAyah.vue?vue&type=style&index=0&id=2f0e3aa0&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/Translator.vue?vue&type=style&index=0&id=e784b7dc&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/Translator.vue?vue&type=style&index=0&id=e784b7dc&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TafseerNote.vue?vue&type=style&index=0&id=02a1587c&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TafseerNote.vue?vue&type=style&index=0&id=02a1587c&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TranslationNote.vue?vue&type=style&index=0&id=c2d6784a&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TranslationNote.vue?vue&type=style&index=0&id=c2d6784a&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TransliterationNote.vue?vue&type=style&index=0&id=439391c3&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TransliterationNote.vue?vue&type=style&index=0&id=439391c3&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue?vue&type=style&index=0&id=3663e5cf&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue?vue&type=style&index=0&id=3663e5cf&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./resources/components/styles/QuranComponent.style.css?vue&type=style&index=1&id=0c29fec8&scoped=true&lang=css&external":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./resources/components/styles/QuranComponent.style.css?vue&type=style&index=1&id=0c29fec8&scoped=true&lang=css&external ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./resources/components/styles/css/styles.css?vue&type=style&index=0&id=0c29fec8&scoped=true&lang=css&external":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./resources/components/styles/css/styles.css?vue&type=style&index=0&id=0c29fec8&scoped=true&lang=css&external ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/scripts/QuranComponent.script.js?vue&type=script&lang=js&external":
/*!************************************************************************************************!*\
  !*** ./resources/components/scripts/QuranComponent.script.js?vue&type=script&lang=js&external ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_QuranComponent_script_js_vue_type_script_lang_js_external__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_QuranComponent_script_js_vue_type_script_lang_js_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./QuranComponent.script.js?vue&type=script&lang=js&external */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./resources/components/scripts/QuranComponent.script.js?vue&type=script&lang=js&external");
 

/***/ }),

/***/ "./resources/components/styles/QuranComponent.style.css?vue&type=style&index=1&id=0c29fec8&scoped=true&lang=css&external":
/*!*******************************************************************************************************************************!*\
  !*** ./resources/components/styles/QuranComponent.style.css?vue&type=style&index=1&id=0c29fec8&scoped=true&lang=css&external ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_QuranComponent_style_css_vue_type_style_index_1_id_0c29fec8_scoped_true_lang_css_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./QuranComponent.style.css?vue&type=style&index=1&id=0c29fec8&scoped=true&lang=css&external */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./resources/components/styles/QuranComponent.style.css?vue&type=style&index=1&id=0c29fec8&scoped=true&lang=css&external");


/***/ }),

/***/ "./resources/components/styles/css/styles.css?vue&type=style&index=0&id=0c29fec8&scoped=true&lang=css&external":
/*!*********************************************************************************************************************!*\
  !*** ./resources/components/styles/css/styles.css?vue&type=style&index=0&id=0c29fec8&scoped=true&lang=css&external ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_styles_css_vue_type_style_index_0_id_0c29fec8_scoped_true_lang_css_external__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./styles.css?vue&type=style&index=0&id=0c29fec8&scoped=true&lang=css&external */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./resources/components/styles/css/styles.css?vue&type=style&index=0&id=0c29fec8&scoped=true&lang=css&external");


/***/ }),

/***/ "./resources/components/vue/Intro/Title.vue":
/*!**************************************************!*\
  !*** ./resources/components/vue/Intro/Title.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Title_vue_vue_type_template_id_e8c3362a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Title.vue?vue&type=template&id=e8c3362a */ "./resources/components/vue/Intro/Title.vue?vue&type=template&id=e8c3362a");
/* harmony import */ var _Title_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Title.vue?vue&type=script&defer=true&lang=js */ "./resources/components/vue/Intro/Title.vue?vue&type=script&defer=true&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Title_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Title_vue_vue_type_template_id_e8c3362a__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/Intro/Title.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/Intro/Title.vue?vue&type=script&defer=true&lang=js":
/*!*************************************************************************************!*\
  !*** ./resources/components/vue/Intro/Title.vue?vue&type=script&defer=true&lang=js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Title_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Title_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Title.vue?vue&type=script&defer=true&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Intro/Title.vue?vue&type=script&defer=true&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/Intro/Title.vue?vue&type=template&id=e8c3362a":
/*!********************************************************************************!*\
  !*** ./resources/components/vue/Intro/Title.vue?vue&type=template&id=e8c3362a ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Title_vue_vue_type_template_id_e8c3362a__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Title_vue_vue_type_template_id_e8c3362a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Title.vue?vue&type=template&id=e8c3362a */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Intro/Title.vue?vue&type=template&id=e8c3362a");


/***/ }),

/***/ "./resources/components/vue/Intro/Welcome.vue":
/*!****************************************************!*\
  !*** ./resources/components/vue/Intro/Welcome.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Welcome_vue_vue_type_template_id_3d833635_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Welcome.vue?vue&type=template&id=3d833635&scoped=true */ "./resources/components/vue/Intro/Welcome.vue?vue&type=template&id=3d833635&scoped=true");
/* harmony import */ var _Welcome_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Welcome.vue?vue&type=script&lang=js */ "./resources/components/vue/Intro/Welcome.vue?vue&type=script&lang=js");
/* harmony import */ var _Welcome_vue_vue_type_style_index_0_id_3d833635_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Welcome.vue?vue&type=style&index=0&id=3d833635&scoped=true&lang=css */ "./resources/components/vue/Intro/Welcome.vue?vue&type=style&index=0&id=3d833635&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_Welcome_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Welcome_vue_vue_type_template_id_3d833635_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-3d833635"],['__file',"resources/components/vue/Intro/Welcome.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/Intro/Welcome.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/components/vue/Intro/Welcome.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Welcome_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Welcome_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Welcome.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Intro/Welcome.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/Intro/Welcome.vue?vue&type=style&index=0&id=3d833635&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/components/vue/Intro/Welcome.vue?vue&type=style&index=0&id=3d833635&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Welcome_vue_vue_type_style_index_0_id_3d833635_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Welcome.vue?vue&type=style&index=0&id=3d833635&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Intro/Welcome.vue?vue&type=style&index=0&id=3d833635&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/Intro/Welcome.vue?vue&type=template&id=3d833635&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/components/vue/Intro/Welcome.vue?vue&type=template&id=3d833635&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Welcome_vue_vue_type_template_id_3d833635_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Welcome_vue_vue_type_template_id_3d833635_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Welcome.vue?vue&type=template&id=3d833635&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Intro/Welcome.vue?vue&type=template&id=3d833635&scoped=true");


/***/ }),

/***/ "./resources/components/vue/QuranComponent.vue":
/*!*****************************************************!*\
  !*** ./resources/components/vue/QuranComponent.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _QuranComponent_vue_vue_type_template_id_0c29fec8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QuranComponent.vue?vue&type=template&id=0c29fec8&scoped=true */ "./resources/components/vue/QuranComponent.vue?vue&type=template&id=0c29fec8&scoped=true");
/* harmony import */ var _scripts_QuranComponent_script_js_vue_type_script_lang_js_external__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/QuranComponent.script.js?vue&type=script&lang=js&external */ "./resources/components/scripts/QuranComponent.script.js?vue&type=script&lang=js&external");
/* harmony import */ var _styles_css_styles_css_vue_type_style_index_0_id_0c29fec8_scoped_true_lang_css_external__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/css/styles.css?vue&type=style&index=0&id=0c29fec8&scoped=true&lang=css&external */ "./resources/components/styles/css/styles.css?vue&type=style&index=0&id=0c29fec8&scoped=true&lang=css&external");
/* harmony import */ var _styles_QuranComponent_style_css_vue_type_style_index_1_id_0c29fec8_scoped_true_lang_css_external__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/QuranComponent.style.css?vue&type=style&index=1&id=0c29fec8&scoped=true&lang=css&external */ "./resources/components/styles/QuranComponent.style.css?vue&type=style&index=1&id=0c29fec8&scoped=true&lang=css&external");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;



const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_scripts_QuranComponent_script_js_vue_type_script_lang_js_external__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_QuranComponent_vue_vue_type_template_id_0c29fec8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-0c29fec8"],['__file',"resources/components/vue/QuranComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/QuranComponent.vue?vue&type=template&id=0c29fec8&scoped=true":
/*!***********************************************************************************************!*\
  !*** ./resources/components/vue/QuranComponent.vue?vue&type=template&id=0c29fec8&scoped=true ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuranComponent_vue_vue_type_template_id_0c29fec8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuranComponent_vue_vue_type_template_id_0c29fec8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./QuranComponent.vue?vue&type=template&id=0c29fec8&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/QuranComponent.vue?vue&type=template&id=0c29fec8&scoped=true");


/***/ }),

/***/ "./resources/components/vue/TafseerActions.vue":
/*!*****************************************************!*\
  !*** ./resources/components/vue/TafseerActions.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TafseerActions_vue_vue_type_template_id_7c79239f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TafseerActions.vue?vue&type=template&id=7c79239f */ "./resources/components/vue/TafseerActions.vue?vue&type=template&id=7c79239f");
/* harmony import */ var _TafseerActions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TafseerActions.vue?vue&type=script&lang=js */ "./resources/components/vue/TafseerActions.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_TafseerActions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_TafseerActions_vue_vue_type_template_id_7c79239f__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/TafseerActions.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/TafseerActions.vue?vue&type=script&lang=js":
/*!*****************************************************************************!*\
  !*** ./resources/components/vue/TafseerActions.vue?vue&type=script&lang=js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TafseerActions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TafseerActions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TafseerActions.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TafseerActions.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/TafseerActions.vue?vue&type=template&id=7c79239f":
/*!***********************************************************************************!*\
  !*** ./resources/components/vue/TafseerActions.vue?vue&type=template&id=7c79239f ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TafseerActions_vue_vue_type_template_id_7c79239f__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TafseerActions_vue_vue_type_template_id_7c79239f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TafseerActions.vue?vue&type=template&id=7c79239f */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TafseerActions.vue?vue&type=template&id=7c79239f");


/***/ }),

/***/ "./resources/components/vue/TafseerSection.vue":
/*!*****************************************************!*\
  !*** ./resources/components/vue/TafseerSection.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TafseerSection_vue_vue_type_template_id_3f4b2587_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TafseerSection.vue?vue&type=template&id=3f4b2587&scoped=true */ "./resources/components/vue/TafseerSection.vue?vue&type=template&id=3f4b2587&scoped=true");
/* harmony import */ var _TafseerSection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TafseerSection.vue?vue&type=script&lang=js */ "./resources/components/vue/TafseerSection.vue?vue&type=script&lang=js");
/* harmony import */ var _TafseerSection_vue_vue_type_style_index_0_id_3f4b2587_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TafseerSection.vue?vue&type=style&index=0&id=3f4b2587&scoped=true&lang=css */ "./resources/components/vue/TafseerSection.vue?vue&type=style&index=0&id=3f4b2587&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_TafseerSection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_TafseerSection_vue_vue_type_template_id_3f4b2587_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-3f4b2587"],['__file',"resources/components/vue/TafseerSection.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/TafseerSection.vue?vue&type=script&lang=js":
/*!*****************************************************************************!*\
  !*** ./resources/components/vue/TafseerSection.vue?vue&type=script&lang=js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TafseerSection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TafseerSection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TafseerSection.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TafseerSection.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/TafseerSection.vue?vue&type=style&index=0&id=3f4b2587&scoped=true&lang=css":
/*!*************************************************************************************************************!*\
  !*** ./resources/components/vue/TafseerSection.vue?vue&type=style&index=0&id=3f4b2587&scoped=true&lang=css ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TafseerSection_vue_vue_type_style_index_0_id_3f4b2587_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TafseerSection.vue?vue&type=style&index=0&id=3f4b2587&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TafseerSection.vue?vue&type=style&index=0&id=3f4b2587&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/TafseerSection.vue?vue&type=template&id=3f4b2587&scoped=true":
/*!***********************************************************************************************!*\
  !*** ./resources/components/vue/TafseerSection.vue?vue&type=template&id=3f4b2587&scoped=true ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TafseerSection_vue_vue_type_template_id_3f4b2587_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TafseerSection_vue_vue_type_template_id_3f4b2587_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TafseerSection.vue?vue&type=template&id=3f4b2587&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TafseerSection.vue?vue&type=template&id=3f4b2587&scoped=true");


/***/ }),

/***/ "./resources/components/vue/TranslationActions.vue":
/*!*********************************************************!*\
  !*** ./resources/components/vue/TranslationActions.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TranslationActions_vue_vue_type_template_id_4ae55fe6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TranslationActions.vue?vue&type=template&id=4ae55fe6 */ "./resources/components/vue/TranslationActions.vue?vue&type=template&id=4ae55fe6");
/* harmony import */ var _TranslationActions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TranslationActions.vue?vue&type=script&lang=js */ "./resources/components/vue/TranslationActions.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_TranslationActions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_TranslationActions_vue_vue_type_template_id_4ae55fe6__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/TranslationActions.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/TranslationActions.vue?vue&type=script&lang=js":
/*!*********************************************************************************!*\
  !*** ./resources/components/vue/TranslationActions.vue?vue&type=script&lang=js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TranslationActions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TranslationActions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TranslationActions.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TranslationActions.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/TranslationActions.vue?vue&type=template&id=4ae55fe6":
/*!***************************************************************************************!*\
  !*** ./resources/components/vue/TranslationActions.vue?vue&type=template&id=4ae55fe6 ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TranslationActions_vue_vue_type_template_id_4ae55fe6__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TranslationActions_vue_vue_type_template_id_4ae55fe6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TranslationActions.vue?vue&type=template&id=4ae55fe6 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TranslationActions.vue?vue&type=template&id=4ae55fe6");


/***/ }),

/***/ "./resources/components/vue/TranslationSection.vue":
/*!*********************************************************!*\
  !*** ./resources/components/vue/TranslationSection.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TranslationSection_vue_vue_type_template_id_0db761ce_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TranslationSection.vue?vue&type=template&id=0db761ce&scoped=true */ "./resources/components/vue/TranslationSection.vue?vue&type=template&id=0db761ce&scoped=true");
/* harmony import */ var _TranslationSection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TranslationSection.vue?vue&type=script&lang=js */ "./resources/components/vue/TranslationSection.vue?vue&type=script&lang=js");
/* harmony import */ var _TranslationSection_vue_vue_type_style_index_0_id_0db761ce_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TranslationSection.vue?vue&type=style&index=0&id=0db761ce&scoped=true&lang=css */ "./resources/components/vue/TranslationSection.vue?vue&type=style&index=0&id=0db761ce&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_TranslationSection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_TranslationSection_vue_vue_type_template_id_0db761ce_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-0db761ce"],['__file',"resources/components/vue/TranslationSection.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/TranslationSection.vue?vue&type=script&lang=js":
/*!*********************************************************************************!*\
  !*** ./resources/components/vue/TranslationSection.vue?vue&type=script&lang=js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TranslationSection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TranslationSection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TranslationSection.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TranslationSection.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/TranslationSection.vue?vue&type=style&index=0&id=0db761ce&scoped=true&lang=css":
/*!*****************************************************************************************************************!*\
  !*** ./resources/components/vue/TranslationSection.vue?vue&type=style&index=0&id=0db761ce&scoped=true&lang=css ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TranslationSection_vue_vue_type_style_index_0_id_0db761ce_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TranslationSection.vue?vue&type=style&index=0&id=0db761ce&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TranslationSection.vue?vue&type=style&index=0&id=0db761ce&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/TranslationSection.vue?vue&type=template&id=0db761ce&scoped=true":
/*!***************************************************************************************************!*\
  !*** ./resources/components/vue/TranslationSection.vue?vue&type=template&id=0db761ce&scoped=true ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TranslationSection_vue_vue_type_template_id_0db761ce_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TranslationSection_vue_vue_type_template_id_0db761ce_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TranslationSection.vue?vue&type=template&id=0db761ce&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TranslationSection.vue?vue&type=template&id=0db761ce&scoped=true");


/***/ }),

/***/ "./resources/components/vue/TransliterationActions.vue":
/*!*************************************************************!*\
  !*** ./resources/components/vue/TransliterationActions.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TransliterationActions_vue_vue_type_template_id_91049004__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TransliterationActions.vue?vue&type=template&id=91049004 */ "./resources/components/vue/TransliterationActions.vue?vue&type=template&id=91049004");
/* harmony import */ var _TransliterationActions_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TransliterationActions.vue?vue&type=script&defer=true&lang=js */ "./resources/components/vue/TransliterationActions.vue?vue&type=script&defer=true&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_TransliterationActions_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_TransliterationActions_vue_vue_type_template_id_91049004__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/TransliterationActions.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/TransliterationActions.vue?vue&type=script&defer=true&lang=js":
/*!************************************************************************************************!*\
  !*** ./resources/components/vue/TransliterationActions.vue?vue&type=script&defer=true&lang=js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TransliterationActions_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TransliterationActions_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TransliterationActions.vue?vue&type=script&defer=true&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TransliterationActions.vue?vue&type=script&defer=true&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/TransliterationActions.vue?vue&type=template&id=91049004":
/*!*******************************************************************************************!*\
  !*** ./resources/components/vue/TransliterationActions.vue?vue&type=template&id=91049004 ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TransliterationActions_vue_vue_type_template_id_91049004__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TransliterationActions_vue_vue_type_template_id_91049004__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TransliterationActions.vue?vue&type=template&id=91049004 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TransliterationActions.vue?vue&type=template&id=91049004");


/***/ }),

/***/ "./resources/components/vue/TransliterationSection.vue":
/*!*************************************************************!*\
  !*** ./resources/components/vue/TransliterationSection.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TransliterationSection_vue_vue_type_template_id_7a4fb9e6_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TransliterationSection.vue?vue&type=template&id=7a4fb9e6&scoped=true */ "./resources/components/vue/TransliterationSection.vue?vue&type=template&id=7a4fb9e6&scoped=true");
/* harmony import */ var _TransliterationSection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TransliterationSection.vue?vue&type=script&lang=js */ "./resources/components/vue/TransliterationSection.vue?vue&type=script&lang=js");
/* harmony import */ var _TransliterationSection_vue_vue_type_style_index_0_id_7a4fb9e6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TransliterationSection.vue?vue&type=style&index=0&id=7a4fb9e6&scoped=true&lang=css */ "./resources/components/vue/TransliterationSection.vue?vue&type=style&index=0&id=7a4fb9e6&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_TransliterationSection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_TransliterationSection_vue_vue_type_template_id_7a4fb9e6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-7a4fb9e6"],['__file',"resources/components/vue/TransliterationSection.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/TransliterationSection.vue?vue&type=script&lang=js":
/*!*************************************************************************************!*\
  !*** ./resources/components/vue/TransliterationSection.vue?vue&type=script&lang=js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TransliterationSection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TransliterationSection_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TransliterationSection.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TransliterationSection.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/TransliterationSection.vue?vue&type=style&index=0&id=7a4fb9e6&scoped=true&lang=css":
/*!*********************************************************************************************************************!*\
  !*** ./resources/components/vue/TransliterationSection.vue?vue&type=style&index=0&id=7a4fb9e6&scoped=true&lang=css ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TransliterationSection_vue_vue_type_style_index_0_id_7a4fb9e6_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TransliterationSection.vue?vue&type=style&index=0&id=7a4fb9e6&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TransliterationSection.vue?vue&type=style&index=0&id=7a4fb9e6&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/TransliterationSection.vue?vue&type=template&id=7a4fb9e6&scoped=true":
/*!*******************************************************************************************************!*\
  !*** ./resources/components/vue/TransliterationSection.vue?vue&type=template&id=7a4fb9e6&scoped=true ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TransliterationSection_vue_vue_type_template_id_7a4fb9e6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TransliterationSection_vue_vue_type_template_id_7a4fb9e6_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TransliterationSection.vue?vue&type=template&id=7a4fb9e6&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/TransliterationSection.vue?vue&type=template&id=7a4fb9e6&scoped=true");


/***/ }),

/***/ "./resources/components/vue/accesibility/ScreenReader.vue":
/*!****************************************************************!*\
  !*** ./resources/components/vue/accesibility/ScreenReader.vue ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ScreenReader_vue_vue_type_template_id_dbcc6f5e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ScreenReader.vue?vue&type=template&id=dbcc6f5e */ "./resources/components/vue/accesibility/ScreenReader.vue?vue&type=template&id=dbcc6f5e");
/* harmony import */ var _ScreenReader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ScreenReader.vue?vue&type=script&lang=js */ "./resources/components/vue/accesibility/ScreenReader.vue?vue&type=script&lang=js");
/* harmony import */ var _ScreenReader_vue_vue_type_style_index_0_id_dbcc6f5e_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ScreenReader.vue?vue&type=style&index=0&id=dbcc6f5e&lang=css */ "./resources/components/vue/accesibility/ScreenReader.vue?vue&type=style&index=0&id=dbcc6f5e&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ScreenReader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ScreenReader_vue_vue_type_template_id_dbcc6f5e__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/accesibility/ScreenReader.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/accesibility/ScreenReader.vue?vue&type=script&lang=js":
/*!****************************************************************************************!*\
  !*** ./resources/components/vue/accesibility/ScreenReader.vue?vue&type=script&lang=js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ScreenReader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ScreenReader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ScreenReader.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/accesibility/ScreenReader.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/accesibility/ScreenReader.vue?vue&type=style&index=0&id=dbcc6f5e&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/components/vue/accesibility/ScreenReader.vue?vue&type=style&index=0&id=dbcc6f5e&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ScreenReader_vue_vue_type_style_index_0_id_dbcc6f5e_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ScreenReader.vue?vue&type=style&index=0&id=dbcc6f5e&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/accesibility/ScreenReader.vue?vue&type=style&index=0&id=dbcc6f5e&lang=css");


/***/ }),

/***/ "./resources/components/vue/accesibility/ScreenReader.vue?vue&type=template&id=dbcc6f5e":
/*!**********************************************************************************************!*\
  !*** ./resources/components/vue/accesibility/ScreenReader.vue?vue&type=template&id=dbcc6f5e ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ScreenReader_vue_vue_type_template_id_dbcc6f5e__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ScreenReader_vue_vue_type_template_id_dbcc6f5e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ScreenReader.vue?vue&type=template&id=dbcc6f5e */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/accesibility/ScreenReader.vue?vue&type=template&id=dbcc6f5e");


/***/ }),

/***/ "./resources/components/vue/folder_manager/FolderSelectionModal.vue":
/*!**************************************************************************!*\
  !*** ./resources/components/vue/folder_manager/FolderSelectionModal.vue ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FolderSelectionModal_vue_vue_type_template_id_aee34890_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FolderSelectionModal.vue?vue&type=template&id=aee34890&scoped=true */ "./resources/components/vue/folder_manager/FolderSelectionModal.vue?vue&type=template&id=aee34890&scoped=true");
/* harmony import */ var _FolderSelectionModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FolderSelectionModal.vue?vue&type=script&lang=js */ "./resources/components/vue/folder_manager/FolderSelectionModal.vue?vue&type=script&lang=js");
/* harmony import */ var _FolderSelectionModal_vue_vue_type_style_index_0_id_aee34890_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FolderSelectionModal.vue?vue&type=style&index=0&id=aee34890&scoped=true&lang=css */ "./resources/components/vue/folder_manager/FolderSelectionModal.vue?vue&type=style&index=0&id=aee34890&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_FolderSelectionModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_FolderSelectionModal_vue_vue_type_template_id_aee34890_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-aee34890"],['__file',"resources/components/vue/folder_manager/FolderSelectionModal.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/folder_manager/FolderSelectionModal.vue?vue&type=script&lang=js":
/*!**************************************************************************************************!*\
  !*** ./resources/components/vue/folder_manager/FolderSelectionModal.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FolderSelectionModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FolderSelectionModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FolderSelectionModal.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/folder_manager/FolderSelectionModal.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/folder_manager/FolderSelectionModal.vue?vue&type=style&index=0&id=aee34890&scoped=true&lang=css":
/*!**********************************************************************************************************************************!*\
  !*** ./resources/components/vue/folder_manager/FolderSelectionModal.vue?vue&type=style&index=0&id=aee34890&scoped=true&lang=css ***!
  \**********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FolderSelectionModal_vue_vue_type_style_index_0_id_aee34890_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FolderSelectionModal.vue?vue&type=style&index=0&id=aee34890&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/folder_manager/FolderSelectionModal.vue?vue&type=style&index=0&id=aee34890&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/folder_manager/FolderSelectionModal.vue?vue&type=template&id=aee34890&scoped=true":
/*!********************************************************************************************************************!*\
  !*** ./resources/components/vue/folder_manager/FolderSelectionModal.vue?vue&type=template&id=aee34890&scoped=true ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FolderSelectionModal_vue_vue_type_template_id_aee34890_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_FolderSelectionModal_vue_vue_type_template_id_aee34890_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./FolderSelectionModal.vue?vue&type=template&id=aee34890&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/folder_manager/FolderSelectionModal.vue?vue&type=template&id=aee34890&scoped=true");


/***/ }),

/***/ "./resources/components/vue/modals/AlertModal.vue":
/*!********************************************************!*\
  !*** ./resources/components/vue/modals/AlertModal.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AlertModal_vue_vue_type_template_id_68112f60__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AlertModal.vue?vue&type=template&id=68112f60 */ "./resources/components/vue/modals/AlertModal.vue?vue&type=template&id=68112f60");
/* harmony import */ var _AlertModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AlertModal.vue?vue&type=script&lang=js */ "./resources/components/vue/modals/AlertModal.vue?vue&type=script&lang=js");
/* harmony import */ var _AlertModal_vue_vue_type_style_index_0_id_68112f60_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AlertModal.vue?vue&type=style&index=0&id=68112f60&lang=css */ "./resources/components/vue/modals/AlertModal.vue?vue&type=style&index=0&id=68112f60&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_AlertModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AlertModal_vue_vue_type_template_id_68112f60__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/modals/AlertModal.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/modals/AlertModal.vue?vue&type=script&lang=js":
/*!********************************************************************************!*\
  !*** ./resources/components/vue/modals/AlertModal.vue?vue&type=script&lang=js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AlertModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AlertModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AlertModal.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/AlertModal.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/modals/AlertModal.vue?vue&type=style&index=0&id=68112f60&lang=css":
/*!****************************************************************************************************!*\
  !*** ./resources/components/vue/modals/AlertModal.vue?vue&type=style&index=0&id=68112f60&lang=css ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AlertModal_vue_vue_type_style_index_0_id_68112f60_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AlertModal.vue?vue&type=style&index=0&id=68112f60&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/AlertModal.vue?vue&type=style&index=0&id=68112f60&lang=css");


/***/ }),

/***/ "./resources/components/vue/modals/AlertModal.vue?vue&type=template&id=68112f60":
/*!**************************************************************************************!*\
  !*** ./resources/components/vue/modals/AlertModal.vue?vue&type=template&id=68112f60 ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AlertModal_vue_vue_type_template_id_68112f60__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AlertModal_vue_vue_type_template_id_68112f60__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AlertModal.vue?vue&type=template&id=68112f60 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/AlertModal.vue?vue&type=template&id=68112f60");


/***/ }),

/***/ "./resources/components/vue/modals/OffcanvasSetting.vue":
/*!**************************************************************!*\
  !*** ./resources/components/vue/modals/OffcanvasSetting.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _OffcanvasSetting_vue_vue_type_template_id_63c77d28_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OffcanvasSetting.vue?vue&type=template&id=63c77d28&scoped=true */ "./resources/components/vue/modals/OffcanvasSetting.vue?vue&type=template&id=63c77d28&scoped=true");
/* harmony import */ var _OffcanvasSetting_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OffcanvasSetting.vue?vue&type=script&lang=js */ "./resources/components/vue/modals/OffcanvasSetting.vue?vue&type=script&lang=js");
/* harmony import */ var _OffcanvasSetting_vue_vue_type_style_index_0_id_63c77d28_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OffcanvasSetting.vue?vue&type=style&index=0&id=63c77d28&scoped=true&lang=css */ "./resources/components/vue/modals/OffcanvasSetting.vue?vue&type=style&index=0&id=63c77d28&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_OffcanvasSetting_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_OffcanvasSetting_vue_vue_type_template_id_63c77d28_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-63c77d28"],['__file',"resources/components/vue/modals/OffcanvasSetting.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/modals/OffcanvasSetting.vue?vue&type=script&lang=js":
/*!**************************************************************************************!*\
  !*** ./resources/components/vue/modals/OffcanvasSetting.vue?vue&type=script&lang=js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_OffcanvasSetting_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_OffcanvasSetting_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./OffcanvasSetting.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/OffcanvasSetting.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/modals/OffcanvasSetting.vue?vue&type=style&index=0&id=63c77d28&scoped=true&lang=css":
/*!**********************************************************************************************************************!*\
  !*** ./resources/components/vue/modals/OffcanvasSetting.vue?vue&type=style&index=0&id=63c77d28&scoped=true&lang=css ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_OffcanvasSetting_vue_vue_type_style_index_0_id_63c77d28_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./OffcanvasSetting.vue?vue&type=style&index=0&id=63c77d28&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/OffcanvasSetting.vue?vue&type=style&index=0&id=63c77d28&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/modals/OffcanvasSetting.vue?vue&type=template&id=63c77d28&scoped=true":
/*!********************************************************************************************************!*\
  !*** ./resources/components/vue/modals/OffcanvasSetting.vue?vue&type=template&id=63c77d28&scoped=true ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_OffcanvasSetting_vue_vue_type_template_id_63c77d28_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_OffcanvasSetting_vue_vue_type_template_id_63c77d28_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./OffcanvasSetting.vue?vue&type=template&id=63c77d28&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/OffcanvasSetting.vue?vue&type=template&id=63c77d28&scoped=true");


/***/ }),

/***/ "./resources/components/vue/modals/SurahInfoModal.vue":
/*!************************************************************!*\
  !*** ./resources/components/vue/modals/SurahInfoModal.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SurahInfoModal_vue_vue_type_template_id_c99d7ef2_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SurahInfoModal.vue?vue&type=template&id=c99d7ef2&scoped=true */ "./resources/components/vue/modals/SurahInfoModal.vue?vue&type=template&id=c99d7ef2&scoped=true");
/* harmony import */ var _SurahInfoModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SurahInfoModal.vue?vue&type=script&lang=js */ "./resources/components/vue/modals/SurahInfoModal.vue?vue&type=script&lang=js");
/* harmony import */ var _SurahInfoModal_vue_vue_type_style_index_0_id_c99d7ef2_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SurahInfoModal.vue?vue&type=style&index=0&id=c99d7ef2&scoped=true&lang=css */ "./resources/components/vue/modals/SurahInfoModal.vue?vue&type=style&index=0&id=c99d7ef2&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_SurahInfoModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_SurahInfoModal_vue_vue_type_template_id_c99d7ef2_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-c99d7ef2"],['__file',"resources/components/vue/modals/SurahInfoModal.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/modals/SurahInfoModal.vue?vue&type=script&lang=js":
/*!************************************************************************************!*\
  !*** ./resources/components/vue/modals/SurahInfoModal.vue?vue&type=script&lang=js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SurahInfoModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SurahInfoModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SurahInfoModal.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/SurahInfoModal.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/modals/SurahInfoModal.vue?vue&type=style&index=0&id=c99d7ef2&scoped=true&lang=css":
/*!********************************************************************************************************************!*\
  !*** ./resources/components/vue/modals/SurahInfoModal.vue?vue&type=style&index=0&id=c99d7ef2&scoped=true&lang=css ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SurahInfoModal_vue_vue_type_style_index_0_id_c99d7ef2_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SurahInfoModal.vue?vue&type=style&index=0&id=c99d7ef2&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/SurahInfoModal.vue?vue&type=style&index=0&id=c99d7ef2&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/modals/SurahInfoModal.vue?vue&type=template&id=c99d7ef2&scoped=true":
/*!******************************************************************************************************!*\
  !*** ./resources/components/vue/modals/SurahInfoModal.vue?vue&type=template&id=c99d7ef2&scoped=true ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SurahInfoModal_vue_vue_type_template_id_c99d7ef2_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SurahInfoModal_vue_vue_type_template_id_c99d7ef2_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SurahInfoModal.vue?vue&type=template&id=c99d7ef2&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/modals/SurahInfoModal.vue?vue&type=template&id=c99d7ef2&scoped=true");


/***/ }),

/***/ "./resources/components/vue/search/AdvancedSearch.vue":
/*!************************************************************!*\
  !*** ./resources/components/vue/search/AdvancedSearch.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AdvancedSearch_vue_vue_type_template_id_5d4c6087_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AdvancedSearch.vue?vue&type=template&id=5d4c6087&scoped=true */ "./resources/components/vue/search/AdvancedSearch.vue?vue&type=template&id=5d4c6087&scoped=true");
/* harmony import */ var _AdvancedSearch_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AdvancedSearch.vue?vue&type=script&lang=js */ "./resources/components/vue/search/AdvancedSearch.vue?vue&type=script&lang=js");
/* harmony import */ var _AdvancedSearch_vue_vue_type_style_index_0_id_5d4c6087_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AdvancedSearch.vue?vue&type=style&index=0&id=5d4c6087&scoped=true&lang=css */ "./resources/components/vue/search/AdvancedSearch.vue?vue&type=style&index=0&id=5d4c6087&scoped=true&lang=css");
/* harmony import */ var _AdvancedSearch_vue_vue_type_style_index_1_id_5d4c6087_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AdvancedSearch.vue?vue&type=style&index=1&id=5d4c6087&scoped=true&lang=css */ "./resources/components/vue/search/AdvancedSearch.vue?vue&type=style&index=1&id=5d4c6087&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;



const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_AdvancedSearch_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AdvancedSearch_vue_vue_type_template_id_5d4c6087_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-5d4c6087"],['__file',"resources/components/vue/search/AdvancedSearch.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/search/AdvancedSearch.vue?vue&type=script&lang=js":
/*!************************************************************************************!*\
  !*** ./resources/components/vue/search/AdvancedSearch.vue?vue&type=script&lang=js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AdvancedSearch_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AdvancedSearch_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AdvancedSearch.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AdvancedSearch.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/search/AdvancedSearch.vue?vue&type=style&index=0&id=5d4c6087&scoped=true&lang=css":
/*!********************************************************************************************************************!*\
  !*** ./resources/components/vue/search/AdvancedSearch.vue?vue&type=style&index=0&id=5d4c6087&scoped=true&lang=css ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AdvancedSearch_vue_vue_type_style_index_0_id_5d4c6087_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AdvancedSearch.vue?vue&type=style&index=0&id=5d4c6087&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AdvancedSearch.vue?vue&type=style&index=0&id=5d4c6087&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/search/AdvancedSearch.vue?vue&type=style&index=1&id=5d4c6087&scoped=true&lang=css":
/*!********************************************************************************************************************!*\
  !*** ./resources/components/vue/search/AdvancedSearch.vue?vue&type=style&index=1&id=5d4c6087&scoped=true&lang=css ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AdvancedSearch_vue_vue_type_style_index_1_id_5d4c6087_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AdvancedSearch.vue?vue&type=style&index=1&id=5d4c6087&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AdvancedSearch.vue?vue&type=style&index=1&id=5d4c6087&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/search/AdvancedSearch.vue?vue&type=template&id=5d4c6087&scoped=true":
/*!******************************************************************************************************!*\
  !*** ./resources/components/vue/search/AdvancedSearch.vue?vue&type=template&id=5d4c6087&scoped=true ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AdvancedSearch_vue_vue_type_template_id_5d4c6087_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AdvancedSearch_vue_vue_type_template_id_5d4c6087_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AdvancedSearch.vue?vue&type=template&id=5d4c6087&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AdvancedSearch.vue?vue&type=template&id=5d4c6087&scoped=true");


/***/ }),

/***/ "./resources/components/vue/search/AyahDropdown.vue":
/*!**********************************************************!*\
  !*** ./resources/components/vue/search/AyahDropdown.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AyahDropdown_vue_vue_type_template_id_71893426_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AyahDropdown.vue?vue&type=template&id=71893426&scoped=true */ "./resources/components/vue/search/AyahDropdown.vue?vue&type=template&id=71893426&scoped=true");
/* harmony import */ var _AyahDropdown_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AyahDropdown.vue?vue&type=script&lang=js */ "./resources/components/vue/search/AyahDropdown.vue?vue&type=script&lang=js");
/* harmony import */ var _AyahDropdown_vue_vue_type_style_index_0_id_71893426_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AyahDropdown.vue?vue&type=style&index=0&id=71893426&scoped=true&lang=css */ "./resources/components/vue/search/AyahDropdown.vue?vue&type=style&index=0&id=71893426&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_AyahDropdown_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AyahDropdown_vue_vue_type_template_id_71893426_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-71893426"],['__file',"resources/components/vue/search/AyahDropdown.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/search/AyahDropdown.vue?vue&type=script&lang=js":
/*!**********************************************************************************!*\
  !*** ./resources/components/vue/search/AyahDropdown.vue?vue&type=script&lang=js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahDropdown_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahDropdown_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AyahDropdown.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AyahDropdown.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/search/AyahDropdown.vue?vue&type=style&index=0&id=71893426&scoped=true&lang=css":
/*!******************************************************************************************************************!*\
  !*** ./resources/components/vue/search/AyahDropdown.vue?vue&type=style&index=0&id=71893426&scoped=true&lang=css ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahDropdown_vue_vue_type_style_index_0_id_71893426_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AyahDropdown.vue?vue&type=style&index=0&id=71893426&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AyahDropdown.vue?vue&type=style&index=0&id=71893426&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/search/AyahDropdown.vue?vue&type=template&id=71893426&scoped=true":
/*!****************************************************************************************************!*\
  !*** ./resources/components/vue/search/AyahDropdown.vue?vue&type=template&id=71893426&scoped=true ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahDropdown_vue_vue_type_template_id_71893426_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahDropdown_vue_vue_type_template_id_71893426_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AyahDropdown.vue?vue&type=template&id=71893426&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/AyahDropdown.vue?vue&type=template&id=71893426&scoped=true");


/***/ }),

/***/ "./resources/components/vue/search/ErrorAlert.vue":
/*!********************************************************!*\
  !*** ./resources/components/vue/search/ErrorAlert.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ErrorAlert_vue_vue_type_template_id_2b7ca9d1_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ErrorAlert.vue?vue&type=template&id=2b7ca9d1&scoped=true */ "./resources/components/vue/search/ErrorAlert.vue?vue&type=template&id=2b7ca9d1&scoped=true");
/* harmony import */ var _ErrorAlert_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ErrorAlert.vue?vue&type=script&lang=js */ "./resources/components/vue/search/ErrorAlert.vue?vue&type=script&lang=js");
/* harmony import */ var _ErrorAlert_vue_vue_type_style_index_0_id_2b7ca9d1_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ErrorAlert.vue?vue&type=style&index=0&id=2b7ca9d1&scoped=true&lang=css */ "./resources/components/vue/search/ErrorAlert.vue?vue&type=style&index=0&id=2b7ca9d1&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ErrorAlert_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ErrorAlert_vue_vue_type_template_id_2b7ca9d1_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-2b7ca9d1"],['__file',"resources/components/vue/search/ErrorAlert.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/search/ErrorAlert.vue?vue&type=script&lang=js":
/*!********************************************************************************!*\
  !*** ./resources/components/vue/search/ErrorAlert.vue?vue&type=script&lang=js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ErrorAlert_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ErrorAlert_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ErrorAlert.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/ErrorAlert.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/search/ErrorAlert.vue?vue&type=style&index=0&id=2b7ca9d1&scoped=true&lang=css":
/*!****************************************************************************************************************!*\
  !*** ./resources/components/vue/search/ErrorAlert.vue?vue&type=style&index=0&id=2b7ca9d1&scoped=true&lang=css ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ErrorAlert_vue_vue_type_style_index_0_id_2b7ca9d1_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ErrorAlert.vue?vue&type=style&index=0&id=2b7ca9d1&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/ErrorAlert.vue?vue&type=style&index=0&id=2b7ca9d1&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/search/ErrorAlert.vue?vue&type=template&id=2b7ca9d1&scoped=true":
/*!**************************************************************************************************!*\
  !*** ./resources/components/vue/search/ErrorAlert.vue?vue&type=template&id=2b7ca9d1&scoped=true ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ErrorAlert_vue_vue_type_template_id_2b7ca9d1_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ErrorAlert_vue_vue_type_template_id_2b7ca9d1_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ErrorAlert.vue?vue&type=template&id=2b7ca9d1&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/ErrorAlert.vue?vue&type=template&id=2b7ca9d1&scoped=true");


/***/ }),

/***/ "./resources/components/vue/search/Magnifier.vue":
/*!*******************************************************!*\
  !*** ./resources/components/vue/search/Magnifier.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Magnifier_vue_vue_type_template_id_7453b1f1_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Magnifier.vue?vue&type=template&id=7453b1f1&scoped=true */ "./resources/components/vue/search/Magnifier.vue?vue&type=template&id=7453b1f1&scoped=true");
/* harmony import */ var _Magnifier_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Magnifier.vue?vue&type=script&lang=js */ "./resources/components/vue/search/Magnifier.vue?vue&type=script&lang=js");
/* harmony import */ var _Magnifier_vue_vue_type_style_index_0_id_7453b1f1_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Magnifier.vue?vue&type=style&index=0&id=7453b1f1&scoped=true&lang=css */ "./resources/components/vue/search/Magnifier.vue?vue&type=style&index=0&id=7453b1f1&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_Magnifier_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Magnifier_vue_vue_type_template_id_7453b1f1_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-7453b1f1"],['__file',"resources/components/vue/search/Magnifier.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/search/Magnifier.vue?vue&type=script&lang=js":
/*!*******************************************************************************!*\
  !*** ./resources/components/vue/search/Magnifier.vue?vue&type=script&lang=js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Magnifier_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Magnifier_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Magnifier.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/Magnifier.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/search/Magnifier.vue?vue&type=style&index=0&id=7453b1f1&scoped=true&lang=css":
/*!***************************************************************************************************************!*\
  !*** ./resources/components/vue/search/Magnifier.vue?vue&type=style&index=0&id=7453b1f1&scoped=true&lang=css ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Magnifier_vue_vue_type_style_index_0_id_7453b1f1_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Magnifier.vue?vue&type=style&index=0&id=7453b1f1&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/Magnifier.vue?vue&type=style&index=0&id=7453b1f1&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/search/Magnifier.vue?vue&type=template&id=7453b1f1&scoped=true":
/*!*************************************************************************************************!*\
  !*** ./resources/components/vue/search/Magnifier.vue?vue&type=template&id=7453b1f1&scoped=true ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Magnifier_vue_vue_type_template_id_7453b1f1_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Magnifier_vue_vue_type_template_id_7453b1f1_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Magnifier.vue?vue&type=template&id=7453b1f1&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/Magnifier.vue?vue&type=template&id=7453b1f1&scoped=true");


/***/ }),

/***/ "./resources/components/vue/search/SurahDropdown.vue":
/*!***********************************************************!*\
  !*** ./resources/components/vue/search/SurahDropdown.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SurahDropdown_vue_vue_type_template_id_294bd1ca_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SurahDropdown.vue?vue&type=template&id=294bd1ca&scoped=true */ "./resources/components/vue/search/SurahDropdown.vue?vue&type=template&id=294bd1ca&scoped=true");
/* harmony import */ var _SurahDropdown_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SurahDropdown.vue?vue&type=script&lang=js */ "./resources/components/vue/search/SurahDropdown.vue?vue&type=script&lang=js");
/* harmony import */ var _SurahDropdown_vue_vue_type_style_index_0_id_294bd1ca_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SurahDropdown.vue?vue&type=style&index=0&id=294bd1ca&scoped=true&lang=css */ "./resources/components/vue/search/SurahDropdown.vue?vue&type=style&index=0&id=294bd1ca&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_SurahDropdown_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_SurahDropdown_vue_vue_type_template_id_294bd1ca_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-294bd1ca"],['__file',"resources/components/vue/search/SurahDropdown.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/search/SurahDropdown.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/components/vue/search/SurahDropdown.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SurahDropdown_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SurahDropdown_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SurahDropdown.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/SurahDropdown.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/search/SurahDropdown.vue?vue&type=style&index=0&id=294bd1ca&scoped=true&lang=css":
/*!*******************************************************************************************************************!*\
  !*** ./resources/components/vue/search/SurahDropdown.vue?vue&type=style&index=0&id=294bd1ca&scoped=true&lang=css ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SurahDropdown_vue_vue_type_style_index_0_id_294bd1ca_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SurahDropdown.vue?vue&type=style&index=0&id=294bd1ca&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/SurahDropdown.vue?vue&type=style&index=0&id=294bd1ca&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/search/SurahDropdown.vue?vue&type=template&id=294bd1ca&scoped=true":
/*!*****************************************************************************************************!*\
  !*** ./resources/components/vue/search/SurahDropdown.vue?vue&type=template&id=294bd1ca&scoped=true ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SurahDropdown_vue_vue_type_template_id_294bd1ca_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SurahDropdown_vue_vue_type_template_id_294bd1ca_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SurahDropdown.vue?vue&type=template&id=294bd1ca&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/search/SurahDropdown.vue?vue&type=template&id=294bd1ca&scoped=true");


/***/ }),

/***/ "./resources/components/vue/settings/SpeechSettings.vue":
/*!**************************************************************!*\
  !*** ./resources/components/vue/settings/SpeechSettings.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SpeechSettings_vue_vue_type_template_id_3ff1d3e7_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpeechSettings.vue?vue&type=template&id=3ff1d3e7&scoped=true */ "./resources/components/vue/settings/SpeechSettings.vue?vue&type=template&id=3ff1d3e7&scoped=true");
/* harmony import */ var _SpeechSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SpeechSettings.vue?vue&type=script&lang=js */ "./resources/components/vue/settings/SpeechSettings.vue?vue&type=script&lang=js");
/* harmony import */ var _SpeechSettings_vue_vue_type_style_index_0_id_3ff1d3e7_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SpeechSettings.vue?vue&type=style&index=0&id=3ff1d3e7&scoped=true&lang=css */ "./resources/components/vue/settings/SpeechSettings.vue?vue&type=style&index=0&id=3ff1d3e7&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_SpeechSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_SpeechSettings_vue_vue_type_template_id_3ff1d3e7_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-3ff1d3e7"],['__file',"resources/components/vue/settings/SpeechSettings.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/settings/SpeechSettings.vue?vue&type=script&lang=js":
/*!**************************************************************************************!*\
  !*** ./resources/components/vue/settings/SpeechSettings.vue?vue&type=script&lang=js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SpeechSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SpeechSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SpeechSettings.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/settings/SpeechSettings.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/settings/SpeechSettings.vue?vue&type=style&index=0&id=3ff1d3e7&scoped=true&lang=css":
/*!**********************************************************************************************************************!*\
  !*** ./resources/components/vue/settings/SpeechSettings.vue?vue&type=style&index=0&id=3ff1d3e7&scoped=true&lang=css ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SpeechSettings_vue_vue_type_style_index_0_id_3ff1d3e7_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SpeechSettings.vue?vue&type=style&index=0&id=3ff1d3e7&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/settings/SpeechSettings.vue?vue&type=style&index=0&id=3ff1d3e7&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/settings/SpeechSettings.vue?vue&type=template&id=3ff1d3e7&scoped=true":
/*!********************************************************************************************************!*\
  !*** ./resources/components/vue/settings/SpeechSettings.vue?vue&type=template&id=3ff1d3e7&scoped=true ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SpeechSettings_vue_vue_type_template_id_3ff1d3e7_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SpeechSettings_vue_vue_type_template_id_3ff1d3e7_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SpeechSettings.vue?vue&type=template&id=3ff1d3e7&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/settings/SpeechSettings.vue?vue&type=template&id=3ff1d3e7&scoped=true");


/***/ }),

/***/ "./resources/components/vue/tabs/NavTabs.vue":
/*!***************************************************!*\
  !*** ./resources/components/vue/tabs/NavTabs.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _NavTabs_vue_vue_type_template_id_0f748fca_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NavTabs.vue?vue&type=template&id=0f748fca&scoped=true */ "./resources/components/vue/tabs/NavTabs.vue?vue&type=template&id=0f748fca&scoped=true");
/* harmony import */ var _NavTabs_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NavTabs.vue?vue&type=script&defer=true&lang=js */ "./resources/components/vue/tabs/NavTabs.vue?vue&type=script&defer=true&lang=js");
/* harmony import */ var _NavTabs_vue_vue_type_style_index_0_id_0f748fca_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NavTabs.vue?vue&type=style&index=0&id=0f748fca&scoped=true&lang=css */ "./resources/components/vue/tabs/NavTabs.vue?vue&type=style&index=0&id=0f748fca&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_NavTabs_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_NavTabs_vue_vue_type_template_id_0f748fca_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-0f748fca"],['__file',"resources/components/vue/tabs/NavTabs.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/tabs/NavTabs.vue?vue&type=script&defer=true&lang=js":
/*!**************************************************************************************!*\
  !*** ./resources/components/vue/tabs/NavTabs.vue?vue&type=script&defer=true&lang=js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NavTabs_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NavTabs_vue_vue_type_script_defer_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./NavTabs.vue?vue&type=script&defer=true&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/tabs/NavTabs.vue?vue&type=script&defer=true&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/tabs/NavTabs.vue?vue&type=style&index=0&id=0f748fca&scoped=true&lang=css":
/*!***********************************************************************************************************!*\
  !*** ./resources/components/vue/tabs/NavTabs.vue?vue&type=style&index=0&id=0f748fca&scoped=true&lang=css ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NavTabs_vue_vue_type_style_index_0_id_0f748fca_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./NavTabs.vue?vue&type=style&index=0&id=0f748fca&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/tabs/NavTabs.vue?vue&type=style&index=0&id=0f748fca&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/tabs/NavTabs.vue?vue&type=template&id=0f748fca&scoped=true":
/*!*********************************************************************************************!*\
  !*** ./resources/components/vue/tabs/NavTabs.vue?vue&type=template&id=0f748fca&scoped=true ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NavTabs_vue_vue_type_template_id_0f748fca_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_NavTabs_vue_vue_type_template_id_0f748fca_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./NavTabs.vue?vue&type=template&id=0f748fca&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/tabs/NavTabs.vue?vue&type=template&id=0f748fca&scoped=true");


/***/ }),

/***/ "./resources/components/vue/translation/AyahInfo.vue":
/*!***********************************************************!*\
  !*** ./resources/components/vue/translation/AyahInfo.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AyahInfo_vue_vue_type_template_id_67bf7c25_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AyahInfo.vue?vue&type=template&id=67bf7c25&scoped=true */ "./resources/components/vue/translation/AyahInfo.vue?vue&type=template&id=67bf7c25&scoped=true");
/* harmony import */ var _AyahInfo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AyahInfo.vue?vue&type=script&lang=js */ "./resources/components/vue/translation/AyahInfo.vue?vue&type=script&lang=js");
/* harmony import */ var _AyahInfo_vue_vue_type_style_index_0_id_67bf7c25_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AyahInfo.vue?vue&type=style&index=0&id=67bf7c25&scoped=true&lang=css */ "./resources/components/vue/translation/AyahInfo.vue?vue&type=style&index=0&id=67bf7c25&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_AyahInfo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AyahInfo_vue_vue_type_template_id_67bf7c25_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-67bf7c25"],['__file',"resources/components/vue/translation/AyahInfo.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/translation/AyahInfo.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/components/vue/translation/AyahInfo.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahInfo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahInfo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AyahInfo.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/AyahInfo.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/translation/AyahInfo.vue?vue&type=style&index=0&id=67bf7c25&scoped=true&lang=css":
/*!*******************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/AyahInfo.vue?vue&type=style&index=0&id=67bf7c25&scoped=true&lang=css ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahInfo_vue_vue_type_style_index_0_id_67bf7c25_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AyahInfo.vue?vue&type=style&index=0&id=67bf7c25&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/AyahInfo.vue?vue&type=style&index=0&id=67bf7c25&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/translation/AyahInfo.vue?vue&type=template&id=67bf7c25&scoped=true":
/*!*****************************************************************************************************!*\
  !*** ./resources/components/vue/translation/AyahInfo.vue?vue&type=template&id=67bf7c25&scoped=true ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahInfo_vue_vue_type_template_id_67bf7c25_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AyahInfo_vue_vue_type_template_id_67bf7c25_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AyahInfo.vue?vue&type=template&id=67bf7c25&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/AyahInfo.vue?vue&type=template&id=67bf7c25&scoped=true");


/***/ }),

/***/ "./resources/components/vue/translation/BottomAudioPlayer.vue":
/*!********************************************************************!*\
  !*** ./resources/components/vue/translation/BottomAudioPlayer.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BottomAudioPlayer_vue_vue_type_template_id_bb3b8938_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BottomAudioPlayer.vue?vue&type=template&id=bb3b8938&scoped=true */ "./resources/components/vue/translation/BottomAudioPlayer.vue?vue&type=template&id=bb3b8938&scoped=true");
/* harmony import */ var _BottomAudioPlayer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BottomAudioPlayer.vue?vue&type=script&lang=js */ "./resources/components/vue/translation/BottomAudioPlayer.vue?vue&type=script&lang=js");
/* harmony import */ var _BottomAudioPlayer_vue_vue_type_style_index_0_id_bb3b8938_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BottomAudioPlayer.vue?vue&type=style&index=0&id=bb3b8938&scoped=true&lang=css */ "./resources/components/vue/translation/BottomAudioPlayer.vue?vue&type=style&index=0&id=bb3b8938&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_BottomAudioPlayer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_BottomAudioPlayer_vue_vue_type_template_id_bb3b8938_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-bb3b8938"],['__file',"resources/components/vue/translation/BottomAudioPlayer.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/translation/BottomAudioPlayer.vue?vue&type=script&lang=js":
/*!********************************************************************************************!*\
  !*** ./resources/components/vue/translation/BottomAudioPlayer.vue?vue&type=script&lang=js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BottomAudioPlayer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BottomAudioPlayer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BottomAudioPlayer.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/BottomAudioPlayer.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/translation/BottomAudioPlayer.vue?vue&type=style&index=0&id=bb3b8938&scoped=true&lang=css":
/*!****************************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/BottomAudioPlayer.vue?vue&type=style&index=0&id=bb3b8938&scoped=true&lang=css ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BottomAudioPlayer_vue_vue_type_style_index_0_id_bb3b8938_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BottomAudioPlayer.vue?vue&type=style&index=0&id=bb3b8938&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/BottomAudioPlayer.vue?vue&type=style&index=0&id=bb3b8938&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/translation/BottomAudioPlayer.vue?vue&type=template&id=bb3b8938&scoped=true":
/*!**************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/BottomAudioPlayer.vue?vue&type=template&id=bb3b8938&scoped=true ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BottomAudioPlayer_vue_vue_type_template_id_bb3b8938_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BottomAudioPlayer_vue_vue_type_template_id_bb3b8938_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BottomAudioPlayer.vue?vue&type=template&id=bb3b8938&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/BottomAudioPlayer.vue?vue&type=template&id=bb3b8938&scoped=true");


/***/ }),

/***/ "./resources/components/vue/translation/HelpGuideModal.vue":
/*!*****************************************************************!*\
  !*** ./resources/components/vue/translation/HelpGuideModal.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HelpGuideModal_vue_vue_type_template_id_509e892a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HelpGuideModal.vue?vue&type=template&id=509e892a */ "./resources/components/vue/translation/HelpGuideModal.vue?vue&type=template&id=509e892a");
/* harmony import */ var _HelpGuideModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HelpGuideModal.vue?vue&type=script&lang=js */ "./resources/components/vue/translation/HelpGuideModal.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_HelpGuideModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_HelpGuideModal_vue_vue_type_template_id_509e892a__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/translation/HelpGuideModal.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/translation/HelpGuideModal.vue?vue&type=script&lang=js":
/*!*****************************************************************************************!*\
  !*** ./resources/components/vue/translation/HelpGuideModal.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HelpGuideModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HelpGuideModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HelpGuideModal.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/HelpGuideModal.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/translation/HelpGuideModal.vue?vue&type=template&id=509e892a":
/*!***********************************************************************************************!*\
  !*** ./resources/components/vue/translation/HelpGuideModal.vue?vue&type=template&id=509e892a ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HelpGuideModal_vue_vue_type_template_id_509e892a__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HelpGuideModal_vue_vue_type_template_id_509e892a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HelpGuideModal.vue?vue&type=template&id=509e892a */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/HelpGuideModal.vue?vue&type=template&id=509e892a");


/***/ }),

/***/ "./resources/components/vue/translation/MainAyah.vue":
/*!***********************************************************!*\
  !*** ./resources/components/vue/translation/MainAyah.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MainAyah_vue_vue_type_template_id_2f0e3aa0_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MainAyah.vue?vue&type=template&id=2f0e3aa0&scoped=true */ "./resources/components/vue/translation/MainAyah.vue?vue&type=template&id=2f0e3aa0&scoped=true");
/* harmony import */ var _MainAyah_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainAyah.vue?vue&type=script&lang=js */ "./resources/components/vue/translation/MainAyah.vue?vue&type=script&lang=js");
/* harmony import */ var _MainAyah_vue_vue_type_style_index_0_id_2f0e3aa0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MainAyah.vue?vue&type=style&index=0&id=2f0e3aa0&scoped=true&lang=css */ "./resources/components/vue/translation/MainAyah.vue?vue&type=style&index=0&id=2f0e3aa0&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_MainAyah_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_MainAyah_vue_vue_type_template_id_2f0e3aa0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-2f0e3aa0"],['__file',"resources/components/vue/translation/MainAyah.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/translation/MainAyah.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/components/vue/translation/MainAyah.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MainAyah_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MainAyah_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MainAyah.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/MainAyah.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/translation/MainAyah.vue?vue&type=style&index=0&id=2f0e3aa0&scoped=true&lang=css":
/*!*******************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/MainAyah.vue?vue&type=style&index=0&id=2f0e3aa0&scoped=true&lang=css ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MainAyah_vue_vue_type_style_index_0_id_2f0e3aa0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MainAyah.vue?vue&type=style&index=0&id=2f0e3aa0&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/MainAyah.vue?vue&type=style&index=0&id=2f0e3aa0&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/translation/MainAyah.vue?vue&type=template&id=2f0e3aa0&scoped=true":
/*!*****************************************************************************************************!*\
  !*** ./resources/components/vue/translation/MainAyah.vue?vue&type=template&id=2f0e3aa0&scoped=true ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MainAyah_vue_vue_type_template_id_2f0e3aa0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MainAyah_vue_vue_type_template_id_2f0e3aa0_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MainAyah.vue?vue&type=template&id=2f0e3aa0&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/MainAyah.vue?vue&type=template&id=2f0e3aa0&scoped=true");


/***/ }),

/***/ "./resources/components/vue/translation/Translator.vue":
/*!*************************************************************!*\
  !*** ./resources/components/vue/translation/Translator.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Translator_vue_vue_type_template_id_e784b7dc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Translator.vue?vue&type=template&id=e784b7dc&scoped=true */ "./resources/components/vue/translation/Translator.vue?vue&type=template&id=e784b7dc&scoped=true");
/* harmony import */ var _Translator_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Translator.vue?vue&type=script&lang=js */ "./resources/components/vue/translation/Translator.vue?vue&type=script&lang=js");
/* harmony import */ var _Translator_vue_vue_type_style_index_0_id_e784b7dc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Translator.vue?vue&type=style&index=0&id=e784b7dc&scoped=true&lang=css */ "./resources/components/vue/translation/Translator.vue?vue&type=style&index=0&id=e784b7dc&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_Translator_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Translator_vue_vue_type_template_id_e784b7dc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-e784b7dc"],['__file',"resources/components/vue/translation/Translator.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/translation/Translator.vue?vue&type=script&lang=js":
/*!*************************************************************************************!*\
  !*** ./resources/components/vue/translation/Translator.vue?vue&type=script&lang=js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Translator_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Translator_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Translator.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/Translator.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/translation/Translator.vue?vue&type=style&index=0&id=e784b7dc&scoped=true&lang=css":
/*!*********************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/Translator.vue?vue&type=style&index=0&id=e784b7dc&scoped=true&lang=css ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Translator_vue_vue_type_style_index_0_id_e784b7dc_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Translator.vue?vue&type=style&index=0&id=e784b7dc&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/Translator.vue?vue&type=style&index=0&id=e784b7dc&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/translation/Translator.vue?vue&type=template&id=e784b7dc&scoped=true":
/*!*******************************************************************************************************!*\
  !*** ./resources/components/vue/translation/Translator.vue?vue&type=template&id=e784b7dc&scoped=true ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Translator_vue_vue_type_template_id_e784b7dc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Translator_vue_vue_type_template_id_e784b7dc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Translator.vue?vue&type=template&id=e784b7dc&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/Translator.vue?vue&type=template&id=e784b7dc&scoped=true");


/***/ }),

/***/ "./resources/components/vue/translation/features/notes/TafseerNote.vue":
/*!*****************************************************************************!*\
  !*** ./resources/components/vue/translation/features/notes/TafseerNote.vue ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TafseerNote_vue_vue_type_template_id_02a1587c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TafseerNote.vue?vue&type=template&id=02a1587c&scoped=true */ "./resources/components/vue/translation/features/notes/TafseerNote.vue?vue&type=template&id=02a1587c&scoped=true");
/* harmony import */ var _TafseerNote_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TafseerNote.vue?vue&type=script&lang=js */ "./resources/components/vue/translation/features/notes/TafseerNote.vue?vue&type=script&lang=js");
/* harmony import */ var _TafseerNote_vue_vue_type_style_index_0_id_02a1587c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TafseerNote.vue?vue&type=style&index=0&id=02a1587c&scoped=true&lang=css */ "./resources/components/vue/translation/features/notes/TafseerNote.vue?vue&type=style&index=0&id=02a1587c&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_TafseerNote_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_TafseerNote_vue_vue_type_template_id_02a1587c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-02a1587c"],['__file',"resources/components/vue/translation/features/notes/TafseerNote.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/translation/features/notes/TafseerNote.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/notes/TafseerNote.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TafseerNote_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TafseerNote_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TafseerNote.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TafseerNote.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/translation/features/notes/TafseerNote.vue?vue&type=style&index=0&id=02a1587c&scoped=true&lang=css":
/*!*************************************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/notes/TafseerNote.vue?vue&type=style&index=0&id=02a1587c&scoped=true&lang=css ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TafseerNote_vue_vue_type_style_index_0_id_02a1587c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TafseerNote.vue?vue&type=style&index=0&id=02a1587c&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TafseerNote.vue?vue&type=style&index=0&id=02a1587c&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/translation/features/notes/TafseerNote.vue?vue&type=template&id=02a1587c&scoped=true":
/*!***********************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/notes/TafseerNote.vue?vue&type=template&id=02a1587c&scoped=true ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TafseerNote_vue_vue_type_template_id_02a1587c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TafseerNote_vue_vue_type_template_id_02a1587c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TafseerNote.vue?vue&type=template&id=02a1587c&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TafseerNote.vue?vue&type=template&id=02a1587c&scoped=true");


/***/ }),

/***/ "./resources/components/vue/translation/features/notes/TranslationNote.vue":
/*!*********************************************************************************!*\
  !*** ./resources/components/vue/translation/features/notes/TranslationNote.vue ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TranslationNote_vue_vue_type_template_id_c2d6784a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TranslationNote.vue?vue&type=template&id=c2d6784a&scoped=true */ "./resources/components/vue/translation/features/notes/TranslationNote.vue?vue&type=template&id=c2d6784a&scoped=true");
/* harmony import */ var _TranslationNote_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TranslationNote.vue?vue&type=script&lang=js */ "./resources/components/vue/translation/features/notes/TranslationNote.vue?vue&type=script&lang=js");
/* harmony import */ var _TranslationNote_vue_vue_type_style_index_0_id_c2d6784a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TranslationNote.vue?vue&type=style&index=0&id=c2d6784a&scoped=true&lang=css */ "./resources/components/vue/translation/features/notes/TranslationNote.vue?vue&type=style&index=0&id=c2d6784a&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_TranslationNote_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_TranslationNote_vue_vue_type_template_id_c2d6784a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-c2d6784a"],['__file',"resources/components/vue/translation/features/notes/TranslationNote.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/translation/features/notes/TranslationNote.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/notes/TranslationNote.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TranslationNote_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TranslationNote_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TranslationNote.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TranslationNote.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/translation/features/notes/TranslationNote.vue?vue&type=style&index=0&id=c2d6784a&scoped=true&lang=css":
/*!*****************************************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/notes/TranslationNote.vue?vue&type=style&index=0&id=c2d6784a&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TranslationNote_vue_vue_type_style_index_0_id_c2d6784a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TranslationNote.vue?vue&type=style&index=0&id=c2d6784a&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TranslationNote.vue?vue&type=style&index=0&id=c2d6784a&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/translation/features/notes/TranslationNote.vue?vue&type=template&id=c2d6784a&scoped=true":
/*!***************************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/notes/TranslationNote.vue?vue&type=template&id=c2d6784a&scoped=true ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TranslationNote_vue_vue_type_template_id_c2d6784a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TranslationNote_vue_vue_type_template_id_c2d6784a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TranslationNote.vue?vue&type=template&id=c2d6784a&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TranslationNote.vue?vue&type=template&id=c2d6784a&scoped=true");


/***/ }),

/***/ "./resources/components/vue/translation/features/notes/TransliterationNote.vue":
/*!*************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/notes/TransliterationNote.vue ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TransliterationNote_vue_vue_type_template_id_439391c3_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TransliterationNote.vue?vue&type=template&id=439391c3&scoped=true */ "./resources/components/vue/translation/features/notes/TransliterationNote.vue?vue&type=template&id=439391c3&scoped=true");
/* harmony import */ var _TransliterationNote_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TransliterationNote.vue?vue&type=script&lang=js */ "./resources/components/vue/translation/features/notes/TransliterationNote.vue?vue&type=script&lang=js");
/* harmony import */ var _TransliterationNote_vue_vue_type_style_index_0_id_439391c3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TransliterationNote.vue?vue&type=style&index=0&id=439391c3&scoped=true&lang=css */ "./resources/components/vue/translation/features/notes/TransliterationNote.vue?vue&type=style&index=0&id=439391c3&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_TransliterationNote_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_TransliterationNote_vue_vue_type_template_id_439391c3_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-439391c3"],['__file',"resources/components/vue/translation/features/notes/TransliterationNote.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/translation/features/notes/TransliterationNote.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/notes/TransliterationNote.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TransliterationNote_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TransliterationNote_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TransliterationNote.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TransliterationNote.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/translation/features/notes/TransliterationNote.vue?vue&type=style&index=0&id=439391c3&scoped=true&lang=css":
/*!*********************************************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/notes/TransliterationNote.vue?vue&type=style&index=0&id=439391c3&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TransliterationNote_vue_vue_type_style_index_0_id_439391c3_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TransliterationNote.vue?vue&type=style&index=0&id=439391c3&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TransliterationNote.vue?vue&type=style&index=0&id=439391c3&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/translation/features/notes/TransliterationNote.vue?vue&type=template&id=439391c3&scoped=true":
/*!*******************************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/notes/TransliterationNote.vue?vue&type=template&id=439391c3&scoped=true ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TransliterationNote_vue_vue_type_template_id_439391c3_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TransliterationNote_vue_vue_type_template_id_439391c3_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TransliterationNote.vue?vue&type=template&id=439391c3&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/notes/TransliterationNote.vue?vue&type=template&id=439391c3&scoped=true");


/***/ }),

/***/ "./resources/components/vue/translation/features/screen_capture/ScreenTranslationCapture.vue":
/*!***************************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/screen_capture/ScreenTranslationCapture.vue ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ScreenTranslationCapture_vue_vue_type_template_id_79bc92a3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ScreenTranslationCapture.vue?vue&type=template&id=79bc92a3 */ "./resources/components/vue/translation/features/screen_capture/ScreenTranslationCapture.vue?vue&type=template&id=79bc92a3");
/* harmony import */ var _ScreenTranslationCapture_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ScreenTranslationCapture.vue?vue&type=script&lang=js */ "./resources/components/vue/translation/features/screen_capture/ScreenTranslationCapture.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_ScreenTranslationCapture_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ScreenTranslationCapture_vue_vue_type_template_id_79bc92a3__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/translation/features/screen_capture/ScreenTranslationCapture.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/translation/features/screen_capture/ScreenTranslationCapture.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/screen_capture/ScreenTranslationCapture.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ScreenTranslationCapture_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ScreenTranslationCapture_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ScreenTranslationCapture.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/screen_capture/ScreenTranslationCapture.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/translation/features/screen_capture/ScreenTranslationCapture.vue?vue&type=template&id=79bc92a3":
/*!*********************************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/screen_capture/ScreenTranslationCapture.vue?vue&type=template&id=79bc92a3 ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ScreenTranslationCapture_vue_vue_type_template_id_79bc92a3__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ScreenTranslationCapture_vue_vue_type_template_id_79bc92a3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ScreenTranslationCapture.vue?vue&type=template&id=79bc92a3 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/screen_capture/ScreenTranslationCapture.vue?vue&type=template&id=79bc92a3");


/***/ }),

/***/ "./resources/components/vue/translation/features/twitter/TwitterShareTransliteration.vue":
/*!***********************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/twitter/TwitterShareTransliteration.vue ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TwitterShareTransliteration_vue_vue_type_template_id_1d420697__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TwitterShareTransliteration.vue?vue&type=template&id=1d420697 */ "./resources/components/vue/translation/features/twitter/TwitterShareTransliteration.vue?vue&type=template&id=1d420697");
/* harmony import */ var _TwitterShareTransliteration_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TwitterShareTransliteration.vue?vue&type=script&lang=js */ "./resources/components/vue/translation/features/twitter/TwitterShareTransliteration.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_TwitterShareTransliteration_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_TwitterShareTransliteration_vue_vue_type_template_id_1d420697__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/components/vue/translation/features/twitter/TwitterShareTransliteration.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/translation/features/twitter/TwitterShareTransliteration.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/twitter/TwitterShareTransliteration.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TwitterShareTransliteration_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TwitterShareTransliteration_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TwitterShareTransliteration.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/twitter/TwitterShareTransliteration.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/translation/features/twitter/TwitterShareTransliteration.vue?vue&type=template&id=1d420697":
/*!*****************************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/twitter/TwitterShareTransliteration.vue?vue&type=template&id=1d420697 ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TwitterShareTransliteration_vue_vue_type_template_id_1d420697__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TwitterShareTransliteration_vue_vue_type_template_id_1d420697__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TwitterShareTransliteration.vue?vue&type=template&id=1d420697 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/twitter/TwitterShareTransliteration.vue?vue&type=template&id=1d420697");


/***/ }),

/***/ "./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue":
/*!*************************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WhatsAppShareTransliteration_vue_vue_type_template_id_3663e5cf_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WhatsAppShareTransliteration.vue?vue&type=template&id=3663e5cf&scoped=true */ "./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue?vue&type=template&id=3663e5cf&scoped=true");
/* harmony import */ var _WhatsAppShareTransliteration_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WhatsAppShareTransliteration.vue?vue&type=script&lang=js */ "./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue?vue&type=script&lang=js");
/* harmony import */ var _WhatsAppShareTransliteration_vue_vue_type_style_index_0_id_3663e5cf_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WhatsAppShareTransliteration.vue?vue&type=style&index=0&id=3663e5cf&scoped=true&lang=css */ "./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue?vue&type=style&index=0&id=3663e5cf&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_WhatsAppShareTransliteration_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_WhatsAppShareTransliteration_vue_vue_type_template_id_3663e5cf_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-3663e5cf"],['__file',"resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_WhatsAppShareTransliteration_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_WhatsAppShareTransliteration_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./WhatsAppShareTransliteration.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue?vue&type=style&index=0&id=3663e5cf&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue?vue&type=style&index=0&id=3663e5cf&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_WhatsAppShareTransliteration_vue_vue_type_style_index_0_id_3663e5cf_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./WhatsAppShareTransliteration.vue?vue&type=style&index=0&id=3663e5cf&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue?vue&type=style&index=0&id=3663e5cf&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue?vue&type=template&id=3663e5cf&scoped=true":
/*!*******************************************************************************************************************************************!*\
  !*** ./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue?vue&type=template&id=3663e5cf&scoped=true ***!
  \*******************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_WhatsAppShareTransliteration_vue_vue_type_template_id_3663e5cf_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_WhatsAppShareTransliteration_vue_vue_type_template_id_3663e5cf_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./WhatsAppShareTransliteration.vue?vue&type=template&id=3663e5cf&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/translation/features/whatsapp/WhatsAppShareTransliteration.vue?vue&type=template&id=3663e5cf&scoped=true");


/***/ }),

/***/ "./resources/js/components/QuranComponent.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/QuranComponent.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _QuranComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QuranComponent.vue?vue&type=script&lang=js */ "./resources/js/components/QuranComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_QuranComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/QuranComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/QuranComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/QuranComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuranComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_QuranComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./QuranComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/QuranComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/utils/milestones.js":
/*!******************************************!*\
  !*** ./resources/js/utils/milestones.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAchieved: () => (/* binding */ getAchieved),
/* harmony export */   getCount: () => (/* binding */ getCount),
/* harmony export */   hasReached: () => (/* binding */ hasReached),
/* harmony export */   increment: () => (/* binding */ increment),
/* harmony export */   setAchieved: () => (/* binding */ setAchieved),
/* harmony export */   setCount: () => (/* binding */ setCount),
/* harmony export */   trackAndDetect: () => (/* binding */ trackAndDetect)
/* harmony export */ });
// Lightweight client-side milestone tracker
// Stores counts and achieved thresholds in localStorage or sessionStorage

function getStorage(scope) {
  return scope === 'session' ? window.sessionStorage : window.localStorage;
}
function readJSON(storage, key, fallback) {
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) {
    return fallback;
  }
}
function getCount(eventKey, scope = 'persistent') {
  const storage = getStorage(scope);
  const key = `${scope}_count_${eventKey}`;
  const raw = storage.getItem(key);
  return raw ? parseInt(raw, 10) || 0 : 0;
}
function setCount(eventKey, value, scope = 'persistent') {
  const storage = getStorage(scope);
  const key = `${scope}_count_${eventKey}`;
  storage.setItem(key, String(value));
  return value;
}
function increment(eventKey, by = 1, scope = 'persistent') {
  const current = getCount(eventKey, scope);
  return setCount(eventKey, current + by, scope);
}
function getAchieved(eventKey, scope = 'persistent') {
  const storage = getStorage(scope);
  const key = `${scope}_achieved_${eventKey}`;
  return readJSON(storage, key, []);
}
function setAchieved(eventKey, achieved, scope = 'persistent') {
  const storage = getStorage(scope);
  const key = `${scope}_achieved_${eventKey}`;
  storage.setItem(key, JSON.stringify(achieved));
}

// Increments count and returns the highest newly reached threshold, or null
function trackAndDetect(eventKey, thresholds = [], scope = 'persistent') {
  const count = increment(eventKey, 1, scope);
  const achieved = new Set(getAchieved(eventKey, scope));
  // Determine newly hit thresholds (<= count and not yet achieved)
  const newly = thresholds.filter(t => typeof t === 'number').filter(t => t <= count && !achieved.has(t)).sort((a, b) => a - b);
  if (newly.length === 0) return null;
  // Mark all newly reached as achieved; return the highest one for messaging
  const highest = newly[newly.length - 1];
  newly.forEach(t => achieved.add(t));
  setAchieved(eventKey, Array.from(achieved), scope);
  return {
    threshold: highest,
    count
  };
}
function hasReached(eventKey, threshold, scope = 'persistent') {
  const achieved = new Set(getAchieved(eventKey, scope));
  return achieved.has(threshold);
}

/***/ }),

/***/ "./utils/subscriptionUtils.js":
/*!************************************!*\
  !*** ./utils/subscriptionUtils.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkSubscriptionStatus: () => (/* binding */ checkSubscriptionStatus),
/* harmony export */   redirectToSubscription: () => (/* binding */ redirectToSubscription)
/* harmony export */ });
// Encode subscription data to prevent tampering
function encodeData(data) {
  try {
    return btoa(JSON.stringify(data));
  } catch (error) {
    console.error('Error encoding subscription data:', error);
    return null;
  }
}

// Decode subscription data
function decodeData(encodedData) {
  try {
    return JSON.parse(atob(encodedData));
  } catch (error) {
    console.error('Error decoding subscription data:', error);
    return null;
  }
}

// Check subscription status
function checkSubscriptionStatus() {
  const urlParams = new URLSearchParams(window.location.search);
  const subscriptionType = urlParams.get('subscription'); // Fixed typo
  const timestamp = urlParams.get('timestamp');
  console.log('Query Params:', {
    subscriptionType,
    timestamp
  }); // Debug

  if (subscriptionType && timestamp) {
    // Store subscription status in localStorage with expiration time
    const expirationTime = subscriptionType === 'monthly' ? 30 * 24 * 60 * 60 * 1000 : 365 * 24 * 60 * 60 * 1000; // 30 days or 365 days
    const subscriptionData = {
      type: subscriptionType,
      expiresAt: Date.now() + expirationTime
    };
    console.log('Storing Subscription Data:', subscriptionData); // Debug

    // Encode subscription data to prevent tampering
    localStorage.setItem('subscriptionData', encodeData(subscriptionData));

    // Clear query parameters from URL
    window.history.replaceState({}, document.title, window.location.pathname);

    // Return success status
    return {
      success: true,
      subscriptionType
    };
  } else {
    // Check localStorage for existing subscription
    const encodedData = localStorage.getItem('subscriptionData');
    if (encodedData) {
      const subscriptionData = decodeData(encodedData);
      console.log('Retrieved Subscription Data:', subscriptionData); // Debug

      // Check if subscription has expired
      if (subscriptionData && subscriptionData.expiresAt > Date.now()) {
        return {
          success: true,
          subscriptionType: subscriptionData.type
        };
      } else {
        localStorage.removeItem('subscriptionData'); // Clear expired subscription
      }
    }
  }
  return {
    success: false
  };
}

// Redirect to subscription page
function redirectToSubscription(type) {
  const successUrl = `${window.location.origin}?subscription=${type}&timestamp=${Date.now()}`;
  const paymentLink = type === 'monthly' ? 'https://buy.stripe.com/dR6fZC0BWd7ubvO8wz' : 'https://buy.stripe.com/00g7t63O8d7uczS6os';
  window.location.href = `${paymentLink}?success_url=${encodeURIComponent(successUrl)}`;
}

/***/ })

}]);