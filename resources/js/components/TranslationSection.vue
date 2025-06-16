<template>
  <div class="w-100 my-element" :class="{ 'full-screen': isFullScreen }">
    <button v-if="isFullScreen && isVisible" @click="toggleFullScreen"
      class="close-button mb-3 text-left btn btn-secondary ">Close</button>
    <div ref="targetTranslationElement">
      <AyahInfo :information="information" />
      <div class="row">
        <div class="col-md-1 pt-2 d-flex align-items-center justify-content-center">
        </div>
        <div class="col-md-12" :style="{ fontSize: fontSize + 'em', lineHeight: '1.8em' }">
          <MainAyah :information="information" />
        </div>

      </div>

      <div class="row text-left mt-2">
        <div class="col-md-11 col-10">
          <h4 class="fw-bold pt-2 hide-on-mobile-tablet" v-if="ayah == null && !dropdownHidden">Translation:</h4>
          <h3 class="ayah-translation" style="color:dimgrey;" v-html="renderedText"
            :style="{ fontSize: fontSize + 'em', lineHeight: '1.8em' }"></h3>

          <div class="d-flex align-items-center mt-3">
            <img src="/images/art.png" class="pr-2" width="30px" alt="lamp" loading="lazy" />
            <h4 class="fw-bold pt-2 hide-on-mobile-tablet" v-if="ayah == null && !dropdownHidden">Translation:</h4>

            <h4 class=" mb-0 ms-2" style="color:dimgrey;" :style="{ fontSize: fontSize + 'em', lineHeight: '1.8em' }">
              Ahmed
              Ali</h4>
          </div>

          <div v-if="isVisible" class="row collapse pt-3" id="collapseExample">
            <div class="d-flex flex-wrap gap-2 pb-2">
              <button type="button" class="btn btn-dark btn-sm px-3 py-2" @click="downloadAsCsv">
                <i class="bi bi-filetype-csv pr-2"></i>CSV Export
              </button>
              <button type="button" class="btn btn-dark btn-sm px-3 py-2" @click="downloadAsWord">
                <i class="bi bi-filetype-docx pr-2"></i>DOCX Export
              </button>
              <button type="button" class="btn btn-dark btn-sm px-3 py-2" @click="downloadAsExport">
                <i class="bi bi-filetype-json pr-2"></i>JSON Export
              </button>
            </div>
          </div>

          <!-- Toggle Button -->
          <div>
            <!-- Rate, Pitch, and Voice Dropdowns -->
            <div v-if="showOptions" class="container d-flex flex-column flex-sm-row gap-2 mt-3">
              <b>Rate:</b>
              <select v-model="speechRate" class="form-select form-select-sm" aria-label="Select Speech Rate">
                <option v-for="rate in rates" :key="rate" :value="rate">{{ rate }}</option>
              </select>

              <b>Pitch:</b>
              <select v-model="speechPitch" class="form-select form-select-sm" aria-label="Select Speech Pitch">
                <option v-for="pitch in pitches" :key="pitch" :value="pitch">{{ pitch }}</option>
              </select>

              <b>Voice:</b>
              <select v-model="selectedVoice" class="form-select form-select-sm" aria-label="Select Voice">
                <option v-for="voice in voices.filter(v => !v.name.includes('Google'))" :key="voice.name"
                  :value="voice.name">
                  {{ voice.name }}
                </option>
              </select>
            </div>
          </div>

        </div>

        <!-- Icons Column -->
        <div v-if="!isVisible" class="col-md-1 col-2 d-flex align-items-center justify-content-center flex-column">
          <!-- Play/Pause Button -->
          <i @click="toggleSpeech" :class="[
            'bi',
            isReading ? (isPaused ? 'bi-play-circle-fill' : 'bi-pause-circle-fill') : 'bi-play-circle-fill',
            'h3',
            'custom-icon-play'
          ]" style="cursor: pointer;" aria-label="Play or pause translation audio"
            title="Play/Pause Translation Audio"></i>

          <!-- Stop Button, visible only after Play button is clicked -->
          <i v-if="isReading && !isPaused" @click="stopReading"
            :class="['bi', 'bi-stop-circle-fill', 'h3', 'custom-icon-play']" style="cursor: pointer;"
            aria-label="Stop reading audio" title="Stop Translation Audio"></i>

          <!-- Font Size Adjustments -->
          <i style="cursor: pointer;" class="bi bi-plus-circle-fill h3 custom-icon-increase"
            aria-placeholder="Increase text size" @click="increaseFontSize" title="Increase Text Size"></i>
          <i style="cursor: pointer;" class="bi bi-dash-circle-fill h3 custom-icon-decrease"
            aria-placeholder="Decrease text size" @click="decreaseFontSize" title="Decrease Text Size"></i>

          <!-- Voice settings -->
          <i class="bi bi-gear-fill h3 custom-icon-increase" style="cursor: pointer" @click="showOptions = !showOptions"
            title="Toggle Voice Settings">
          </i>

          <!-- Toggle Collapse for More Options -->
          <p class="d-inline-flex gap-1">
            <i style="cursor: pointer;" class="bi bi-file-earmark-arrow-down-fill h3 custom-icon-decrease"
              data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
              aria-controls="collapseExample" @click="toggleIcon" title="More Options"></i>
          </p>
          
        </div>

      </div>



      <AlertModal :showAlertText="showAlertText" :showAlert="showAlert" :showErrorAlert="showErrorAlert"
        :showAlertTextNote="showAlertTextNote" @close-alert-text="closeAlertText" />
    </div>

  </div>
</template>

<script>
import AyahInfo from "./translation/AyahInfo.vue";
import MainAyah from "./translation/MainAyah.vue";
import Translator from "./translation/Translator.vue";
import AlertModal from "./modals/AlertModal.vue";
import ScreenReader from "./accesibility/ScreenReader.vue";
import Magnifier from "./search/Magnifier.vue";
import OffcanvasSetting from "./modals/OffcanvasSetting.vue";
import TransliterationSection from "./TransliterationSection.vue";
import SpeechSettings from "./settings/SpeechSettings.vue";
import { checkSubscriptionStatus, redirectToSubscription } from '../../../utils/subscriptionUtils.js';


import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  saveAs
} from "file-saver";
import Papa from "papaparse";
import {
  Document,
  Packer,
  Paragraph,
  TextRun
} from "docx";


export default {
  name: "TranslationSection",
  components: {
    SpeechSettings,
    OffcanvasSetting,
    TransliterationSection,
    AyahInfo,
    MainAyah,
    Translator,
    AlertModal,
    ScreenReader,
    Magnifier
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
      isPlaying: Boolean,
    }
  },
  emits: ['toggle-audio'],
  computed: {

    wordCount() {
      const text = this.expanded ?
        this.information.translation : this.information.translation;
      return text ? text.trim().split(/\s+/).length : 0; // Calculate the word count
    },

    combinedText() {
      // Get the ayah_text from information
      const ayahText =
        typeof this.information.ayah_text === "object" ?
          this.information.ayah_text.text :
          this.information.ayah_text;
      // Return the formatted string
      return `Translation: ${this.ayah_text}`;
    },

    formattedResult() {
      if (!this.result) return "";
      // Format the result as a plain text string for display
      return this.result
        .map(entity => `${entity.label}: ${entity.text}`)
        .join('\n');
    }
  },
  data() {
    return {
      showOptions: false,
      voices: [],
      selectedVoice: '', // User's selected voice
      isVisible: false,
      voices: [], // Your list of available voices
      successMessage: false,
      offcanvasInstance: null, // Offcanvas instance
      inputText: "",
      result: null,
      isOffcanvasOpen: false,
      offcanvasInstance: null,
      isLoading: false,
      selectedVoice: null,
      selectedVoiceName: '',
      summary: "", // Generated summary
      error: "", // Error message
      loading: false, // Loading state
      API_TOKEN: "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", // Hugging Face API token
      BASE_URL: "https://api-inference.huggingface.co/models/facebook/bart-large-cnn", // Hugging Face API URL
      isAuthenticated: false,
      userId: null,
      successMessage: "",
      isSwipeEnabled: true, // Track swipe enabled state
      swipeDisabled: false, // Flag to disable swipe behavior
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
      words: this.information.translation.split(" "),
      text: this.information.translation,
      currentWordIndex: -1,
      ayahAudio: null, // Store the audio URL
      ayahId: 1, // Example ayah ID
      data: [],
      surat: [],
      ayat: [],
      tafseers: [],
      speechRate: 1, // Default rate
      speechPitch: 1, // Default pitch
      rates: [0.5, 1, 1.5, 2], // List of available speech rates
      pitches: [0.5, 1, 1.5, 2], // List of available pitch values
    };
  },

  mounted() {
    window.speechSynthesis.addEventListener('voiceschanged', this.loadVoices);
    this.loadVoices();
    const { success, subscriptionType } = checkSubscriptionStatus();
    if (success) {
      this.isVisible = true; // Show premium features
      if (subscriptionType) {
        this.showSuccessMessage = true; // Show success message
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      }
    }
    this.renderedText = this.information.translation;
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
      redirectToSubscription('monthly');
    },
    redirectToYearlySubscription() {
      redirectToSubscription('yearly');
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
          id: this.information.id,  // Assuming 'information' contains 'id' data
          ayah: {
            id: this.information.ayah.id, // Assuming 'ayah' is an object inside 'information'
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
      const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
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
          window.speechSynthesis.resume();  // Resume reading if paused
          this.isPaused = false;  // Set paused to false when resumed
        } else {
          window.speechSynthesis.pause();  // Pause reading
          this.isPaused = true;  // Set paused to true
        }
      } else {
        this.readTextAloud();  // Start reading if not already reading
      }
      this.isReading = true;  // Set reading state to true
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
      const formatCsvValue = (value, options = { isLtr: false, isRtl: false }) => {
        if (value == null) return '';

        // Convert to string and escape quotes
        let formattedValue = String(value)
          .replace(/"/g, '""')         // Escape quotes
          .replace(/[\r\n]+/g, ' ')    // Replace newlines with spaces
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
        // Prepare CSV rows with proper text direction
        const csvRows = [
          ['"Title"', '"Content"'],
          [
            '"Surah name (Arabic)"',
            formatCsvValue(this.information?.ayah?.surah?.name_ar, { isRtl: true })
          ],
          [
            '"Surah name (English)"',
            formatCsvValue(this.information?.ayah?.surah?.name_en, { isLtr: true })
          ],
          [
            '"Surah number"',
            formatCsvValue(this.information?.ayah?.surah_id, { isLtr: true })
          ],
          [
            '"Ayah number"',
            formatCsvValue(this.information?.ayah?.ayah_id, { isLtr: true })
          ],
          [
            '"Ayah"',
            formatCsvValue(this.information?.ayah?.ayah_text, { isRtl: true })
          ],
          [
            '"Translation"',
            formatCsvValue(this.information?.translation, { isLtr: true })
          ],
          [
            '"Translator"',
            formatCsvValue('Ahmed Ali', { isLtr: true })
          ]
        ];

        // Convert rows to CSV string with RTL marker for the whole document
        const csvContent = '\u202B' + csvRows
          .map(row => row.join(','))
          .join('\n');

        // Add BOM for UTF-8
        const bom = '\uFEFF';
        const fullContent = bom + csvContent;

        // Create blob with proper encoding
        const blob = new Blob([fullContent], {
          type: 'text/csv;charset=utf-8'
        });

        // Generate filename with surah/ayah info
        const date = new Date().toISOString().split('T')[0];
        const surahNum = this.information?.ayah?.surah_id || 'unknown-surah';
        const ayahNum = this.information?.ayah?.ayah_id || 'unknown-ayah';
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
      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 1440,    // 1 inch
                  right: 1440,
                  bottom: 1440,
                  left: 1440,
                },
              },
            },
            children: [
              // Title Section
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Quran Translation Document",
                    bold: true,
                    size: 48,
                    color: "1F4E79",
                  }),
                ],
                alignment: "CENTER",
                spacing: {
                  before: 400,
                  after: 800,
                  line: 360,
                },
              }),

              // space
              new Paragraph({
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
                spacing: {
                  before: 400,
                  after: 400,
                  line: 360,
                },
              }),

              // surah Header
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Surah:",
                    bold: true,
                    size: 32,
                    color: "2B5797",
                    underline: false,
                  }),
                ],
                spacing: {
                  before: 600,
                  after: 300,
                  line: 360,
                },
              }),

              // Surah Info
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${this.information?.ayah?.surah?.name_en} (${this.information?.ayah?.surah?.name_ar})`,
                    bold: false,
                    size: 28,
                    italics: false,
                    color: "000000",
                  }),
                ],
                spacing: {
                  before: 400,
                  after: 400,
                  line: 360,
                },
              }),

              // space
              new Paragraph({
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
                spacing: {
                  before: 400,
                  after: 400,
                  line: 360,
                },
              }),

              // Ayah Number
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Ayah Number:`,
                    bold: true,
                    size: 32,
                    color: "2B5797",
                    underline: false,
                  }),
                ],
                spacing: {
                  before: 400,
                  after: 400,
                  line: 360,
                },
              }),

              // Ayah Number
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${this.information?.ayah?.ayah_id}`,
                    bold: false,
                    size: 28,
                    italics: false,
                    color: "000000",
                    underline: false,
                  }),
                ],
                spacing: {
                  before: 400,
                  after: 400,
                  line: 360,
                },
              }),

              // space
              new Paragraph({
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
                spacing: {
                  before: 400,
                  after: 400,
                  line: 360,
                },
              }),

              // Ayah Header
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Ayah:",
                    bold: true,
                    size: 32,
                    color: "2B5797",
                    underline: false,
                  }),
                ],
                spacing: {
                  before: 600,
                  after: 300,
                  line: 360,
                },
              }),

              // Ayah Text
              new Paragraph({
                children: [
                  new TextRun({
                    text: this.information?.ayah?.ayah_text,
                    size: 28,
                    color: "333333",
                    rightToLeft: true,  // Enable RTL for Arabic text
                  }),
                ],
                spacing: {
                  before: 300,
                  after: 600,
                  line: 360,
                },
                indent: {
                  left: 720,  // 0.5 inch indent
                  right: 720,
                },
                alignment: "RIGHT",  // Right align Arabic text
              }),

              // space
              new Paragraph({
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
                spacing: {
                  before: 400,
                  after: 400,
                  line: 360,
                },
              }),
              // Tafseer Header
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Translation:",
                    bold: true,
                    size: 32,
                    color: "2B5797",
                  }),
                ],
                spacing: {
                  before: 600,
                  after: 300,
                  line: 360,
                },
              }),

              // Tafseer Content
              new Paragraph({
                children: [
                  new TextRun({
                    text: this.information?.translation,
                    size: 28,
                    color: "000000",
                  }),
                ],
                spacing: {
                  before: 300,
                  after: 600,
                  line: 360,  // 1.5 line spacing
                },
                indent: {
                  left: 720,
                  right: 720,
                },
              }),
              // space
              new Paragraph({
                children: [
                  new TextRun({
                    text: ``,
                  }),
                ],
                spacing: {
                  before: 400,
                  after: 400,
                  line: 360,
                },
              }),

              // Translator Header
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Translator:",
                    bold: true,
                    size: 32,
                    color: "2B5797",
                  }),
                ],
                spacing: {
                  before: 600,
                  after: 300,
                  line: 360,
                },
              }),

              // Translator Content
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Ahmed Ali",
                    italics: false,
                    size: 28,
                    color: "000000",
                  }),
                ],
                spacing: {
                  before: 300,
                  after: 600,
                  line: 360,
                },
              }),
            ],
          },
        ],
      });
      try {
        const blob = await Packer.toBlob(doc);

        // Generate a clean, ISO date string
        const date = new Date().toISOString().split("T")[0]; // e.g., 2024-12-28

        // Dynamically include Surah and Ayah numbers with fallbacks
        const surahNum = this.information?.ayah?.surah?.id || "unknown_surah";
        const ayahNum = this.information?.ayah?.ayah_id || "unknown_ayah";

        // Create a clean filename
        const filename = `translation_doc_surah_${surahNum}_ayah_${ayahNum}_${date}.docx`;

        // Save the file
        saveAs(blob, filename);
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
      this.ksdkld

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
      this.utterance.onboundary = (event) => {
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
    },

  }
};
</script>

<style scoped>
.toast {
  opacity: 1 !important;
  transition: opacity 0.5s ease-in-out;
}

.error {
  margin-top: 20px;
  color: red;
}

.document-export-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  color: #1f4e79;
  margin-bottom: 10px;
}

.description {
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
}

/* .btn {
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
} */

.btn-primary {
  background-color: #1f4e79;
  color: #fff;
}

.btn-primary:hover {
  transition: color 0.3s ease;
  background-color: #163a5d;
}

audio {
  display: block;
  border-radius: 30px;
  margin: 0 auto;
  width: 100%;
  border: 2px double rgba(0, 191, 166);
  background-color: white;
}

.word-count {
  margin-top: 10px;
}

.controls {
  margin-top: 10px;
}

.ayah-container {
  margin-bottom: 20px;
}

.ayah-translation span {
  display: inline-block;
}


.ayah-text {
  font-size: 18px;
  margin-bottom: 10px;
}

.ayah-audio {
  margin-bottom: 20px;
}

.custom-offcanvas {
  background-color: #10584f;
  color: white;
  width: 40%;
}

.custom-icon-play:hover {
  color: rgb(13, 182, 145);
  /* Default color */
  transition: color 0.3s ease;
  /* Smooth transition */
}

.custom-icon-increase:hover {
  color: rgb(13, 182, 145);
  /* Default color */
  transition: color 0.3s ease;
  /* Smooth transition */
}

.custom-icon-decrease:hover {
  color: rgb(13, 182, 145);
  /* Default color */
  transition: color 0.3s ease;
  /* Smooth transition */
}

.text-muted {
  color: lightgrey;
}

.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: white;
  padding: 20px;
}

.swipeable-div {
  touch-action: pan-y;
}

.ayah-translation {
  font-size: 1.2rem;
}

.btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.mobile-only {
  display: none;
  /* Hide by default */
}

@media (max-width: 768px) {

  /* Adjust this width as needed for your breakpoint */
  .mobile-only {
    display: flex;
    flex-direction: column !important;
    /* Show only on mobile */
  }

  .custom-offcanvas {
    background-color: #10584f;
    color: white;
    width: 100%;
  }
}

@media (max-width: 576px) {
  .mobile-only {
    display: block;
    display: flex;
  }

  .custom-offcanvas {
    background-color: #10584f;
    color: white;
    width: 100%;
  }

  .hide-on-mobile {
    display: none;
  }
}
</style>
