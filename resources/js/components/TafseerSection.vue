<template>
  <div class="w-100 my-element" :class="{ 'full-screen': isFullScreen }">
    <button v-if="isFullScreen" @click="toggleFullScreen" class="close-button mb-3 text-left btn btn-secondary">
      Close
    </button>

    <div ref="targetTafseerElement">
      <AyahInfo :information="information" />
      <div class="swipeable-div w-100">
        <div class="row">
          <div class="col-md-2 pt-2 d-flex align-items-center justify-content-center">
            <!-- <i 
              @click="toggleSpeechAyah" 
              class="bi-play-circle-fill h4 custom-icon-play-main"
              style="cursor: pointer;" 
              aria-label="Play or pause translation audio"
            ></i> -->
          </div>
          <div class="col-md-10">
            <MainAyah :information="information" />
          </div>
        </div>

        <div class="row text-left mt-2">
          <div class="col-10">
            <div>
              <h4 class="ayah-translation" v-html="renderedText"
                :style="{ fontSize: fontSize + 'em', lineHeight: '1.6em' }"></h4>
              <hr />
              <div  class="text-left word-count mt-2">
                <img src="/images/art.png" class="pr-2" width="30px" alt="lamp" loading="lazy" />
                <strong>Tafseer: </strong>Ibn Katheer
              </div>
              <div class="row collapse pt-3" id="collapseExample">
                <div class="d-flex flex-wrap gap-2">
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
              <!-- <div class="text-left count word-count pt-4">
                <h6 class="text-left mt-3">
                  <img
                    src="/images/art.png"
                    class="pr-2"
                    width="30px"
                    alt="lamp"
                    loading="lazy"
                  />
                  <strong>Total Word count: </strong>{{ wordCount }}
                </h6>
              </div> -->

            </div>
          </div>

          <!-- Icons Column (Stacked Vertically) -->
          <div class="col-2 d-flex align-items-center justify-content-center flex-column">
            <!-- Play/Pause Button -->
            <i @click="toggleSpeech" :class="[
              'bi',
              isReading
                ? isPaused
                  ? 'bi-play-circle-fill'
                  : 'bi-pause-circle-fill'
                : 'bi-play-circle-fill',
              'h3',
              'custom-icon-play',
            ]" style="cursor: pointer" aria-label="Play or pause translation audio"></i>

            <!-- Stop Button -->
            <i @click="stopReading" :class="['bi', 'bi-stop-circle-fill', 'h3', 'custom-icon-play']"
              style="cursor: pointer" aria-label="Stop reading audio"></i>
            <i style="cursor: pointer" class="bi bi-plus-circle-fill h3 custom-icon-increase"
              aria-placeholder="Increase text size" @click="increaseFontSize"></i>
            <i style="cursor: pointer" class="bi bi-dash-circle-fill h3 custom-icon-decrease"
              aria-placeholder="Decrease text size" @click="decreaseFontSize"></i>

            <p class="d-inline-flex gap-1">
              <i style="cursor: pointer" class="bi bi-file-earmark-arrow-down-fill h3 custom-icon-decrease"
                data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
                aria-controls="collapseExample" @click="toggleIcon">
              </i>
            </p>
          </div>
        </div>
      </div>
      <!-- Alert Modal -->
      <AlertModal :showAlertText="showAlertText" :showAlert="showAlert" :showErrorAlert="showErrorAlert"
        :showAlertTextNote="showAlertTextNote" @close-alert-text="closeAlertText" />
    </div>
  </div>
</template>

<script>
import AyahInfo from "./translation/AyahInfo.vue";
import MainAyah from "./translation/MainAyah.vue";
import AlertModal from "./modals/AlertModal.vue";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { Document, Packer, Paragraph, TextRun } from "docx";
import SpeechSettings from "./settings/SpeechSettings.vue";

export default {
  name: "TafseerSection",
  components: {
    AyahInfo,
    MainAyah,
    AlertModal,
    SpeechSettings,
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    information: Object,
    isFullScreen: Boolean,
    showAlertText: Boolean,
    showAlert: Boolean,
    showErrorAlert: Boolean,
    showAlertTextNote: Boolean,
    targetTafseerElement: {
      type: String,
      default: "targetTafseerElement",
    },
  },
  // props: ["information", "tafseer"], // Receive tafseer as a prop
  computed: {
    wordCount() {
      const text = this.expanded ? this.tafseer : this.tafseer;
      return text ? text.trim().split(/\s+/).length : 0; // Calculate the word count
    },

    combinedText() {
      // Get the ayah_text from information
      const ayahText =
        typeof this.information.ayah_text === "object"
          ? this.information.ayah_text.text
          : this.information.ayah_text;

      // Return the formatted string
      return `Tafseer: ${this.ayah_text}`;
    },
  },
  data() {
    return {
      renderedText: "",
      summary: "", // Generated summary
      error: "", // Error message
      loading: false, // Loading state
      API_TOKEN: "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", // Hugging Face API token
      BASE_URL: "https://api-inference.huggingface.co/models/google/t5-large",
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
      ayahAudio: null, // Store the audio URL
      ayahId: 1,
      tafseer: "", // Store tafseer data here
      expanded: false, // Local state to track expand/collapse
      rate: 1,
      pitch: 1,
      surahUrl: "",
      voices: [],
      ayahId: 1, // Example ayah ID
      data: [],
      surat: [],
      ayat: [],
      tafseers: [],
    };
  },

  computed: {
    wordCount() {
      const text = this.expanded ? this.tafseer : this.tafseer;
      return text ? text.trim().split(/\s+/).length : 0; // Calculate the word count
    },
    // renderedText() {
    //   // Replace this with the actual source of your text
    //   return document.querySelector('.ayah-translation').innerHTML;
    //  },
    
  },
  mounted() {
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
      this.currentFontSize = parseInt(savedFontSize, 10);
    } else {
      this.currentFontSize = 14; // Default font size
    }

    // Load voices initially
    this.loadVoices();
    // Ensure voices are fully loaded before attempting to play
    window.speechSynthesis.onvoiceschanged = () => {
      this.loadVoices();
      this.voicesLoaded = true; // Set a flag to confirm voices are loaded
    };
  },
  methods: {

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
          id: this.information.id, // Assuming 'information' contains 'id' data
          ayah: {
            id: this.information.ayah.id, // Assuming 'ayah' is an object inside 'information'
            surah_id: this.information.ayah.surah_id,
            ayah_text: this.information.ayah.ayah_text,
            ayah_id: this.information.ayah.ayah_id,
            surah: {
              id: this.information.ayah.surah.id,
              name_en: this.information.ayah.surah.name_en,
              name_ar: this.information.ayah.surah.name_ar,
              text: this.information.ayah.surah.text,
            },
          },
        },
      };

      const surahNumber = this.information.ayah.surah_id;
      const ayahNumber = this.information.ayah.ayah_id;
      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];

      // Construct file name with Surah and Ayah numbers
      const fileName = `tafseer_surah_${surahNumber}_ayah_${ayahNumber}_${formattedDate}.json`;

      // Convert the content to a JSON Blob for downloading
      const blob = new Blob([JSON.stringify(content, null, 2)], {
        type: "application/json",
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
      const formatCsvValue = (
        value,
        options = { isLtr: false, isRtl: false }
      ) => {
        if (value == null) return "";

        // Convert to string and escape quotes
        let formattedValue = String(value)
          .replace(/"/g, '""') // Escape quotes
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
        // Prepare CSV rows with proper text direction
        const csvRows = [
          ['"Title"', '"Content"'],
          [
            '"Surah name (Arabic)"',
            formatCsvValue(this.information?.ayah?.surah?.name_ar, {
              isRtl: true,
            }),
          ],
          [
            '"Surah name (English)"',
            formatCsvValue(this.information?.ayah?.surah?.name_en, {
              isLtr: true,
            }),
          ],
          [
            '"Surah number"',
            formatCsvValue(this.information?.ayah?.surah_id, { isLtr: true }),
          ],
          [
            '"Ayah number"',
            formatCsvValue(this.information?.ayah?.ayah_id, { isLtr: true }),
          ],
          [
            '"Ayah"',
            formatCsvValue(this.information?.ayah?.ayah_text, { isRtl: true }),
          ],
          ['"Tafseer"', formatCsvValue(this.tafseer, { isLtr: true })],
          ['"Tafseer"', formatCsvValue("Ibn Katheer", { isLtr: true })],
        ];

        // Convert rows to CSV string with RTL marker for the whole document
        const csvContent =
          "\u202B" + csvRows.map((row) => row.join(",")).join("\n");

        // Add BOM for UTF-8
        const bom = "\uFEFF";
        const fullContent = bom + csvContent;

        // Create blob with proper encoding
        const blob = new Blob([fullContent], {
          type: "text/csv;charset=utf-8",
        });

        // Generate filename with surah/ayah info
        const date = new Date().toISOString().split("T")[0];
        const surahNum = this.information?.ayah?.surah_id || "unknown-surah";
        const ayahNum = this.information?.ayah?.ayah_id || "unknown-ayah";
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
      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 1440, // 1 inch
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
                    text: "Quran Tafseer Document",
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
                    rightToLeft: true, // Enable RTL for Arabic text
                  }),
                ],
                spacing: {
                  before: 300,
                  after: 600,
                  line: 360,
                },
                indent: {
                  left: 720, // 0.5 inch indent
                  right: 720,
                },
                alignment: "RIGHT", // Right align Arabic text
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
                    text: "Tafseer:",
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
                    text: this.tafseer,
                    size: 28,
                    color: "000000",
                  }),
                ],
                spacing: {
                  before: 300,
                  after: 600,
                  line: 360, // 1.5 line spacing
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
                    text: "Tafseer:",
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
                    text: "Ibn Katheer",
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
        const filename = `tafseer_doc_surah_${surahNum}_ayah_${ayahNum}_${date}.docx`;

        // Save the file
        saveAs(blob, filename);
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
      localStorage.setItem(
        "selectedVoice",
        JSON.stringify(this.selectedVoiceName)
      );
      localStorage.setItem("rate", this.rate);
      localStorage.setItem("pitch", this.pitch);
      // Show success message
      this.successMessage = true;
      // Close the modal after a short delay
      setTimeout(() => {
        this.successMessage = false;
        const offcanvasElement = document.getElementById("offcanvasRight"); // Change to the correct element ID
        const offcanvasInstance =
          bootstrap.Offcanvas.getInstance(offcanvasElement);
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
      this.voices = window.speechSynthesis.getVoices();
      // Set the selected voice if it exists in the voices array
      const voice = this.voices.find((v) => v.name === this.selectedVoiceName);
      if (voice) {
        this.selectedVoiceName = voice.name; // Set selectedVoiceName to a valid voice
      } else if (this.voices.length > 0) {
        this.selectedVoiceName = this.voices[0].name; // Fallback to the first available voice
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
    selectBestVoice() {
      const preferredVoices = [
        "Google UK English Female",
        "Microsoft Zira Desktop - English (United States)",
        "Samantha",
        "Google US English",
        "Microsoft David Desktop - English (United States)",
      ];

      for (const preferredVoice of preferredVoices) {
        const voice = this.voices.find((v) => v.name === preferredVoice);
        if (voice) {
          this.selectedVoice = voice;
          return;
        }
      }
      if (this.voices.length > 0) {
        this.selectedVoiceName = this.voices[0].name;
      }
      // If no preferred voice is found, choose the first available voice
      this.selectedVoice = this.voices[0];
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
      if (this.isReading) {
        if (this.isPaused) {
          window.speechSynthesis.resume(); // Resume if paused
        } else {
          window.speechSynthesis.pause(); // Pause if currently reading
        }
        this.isPaused = !this.isPaused; // Toggle pause state
      } else {
        this.readTextAloud(); // Start reading if not reading
      }
    },
    stopReading() {
      speechSynthesis.cancel();
      this.isReading = false;
      this.clearHighlight();
    },
    rewindSpeech() {
      // Stop current speech and start again
      this.stopReading();
      this.readTextAloud(); // Restart the speech from the beginning
      console.log("Speech rewinded.");
    },
    readTextAloud() {
      const text = this.tafseer; // Ensure `this.tafseer` contains the correct text
      if (!window.speechSynthesis) {
        console.error("Speech synthesis is not supported in this browser.");
        return;
      }

      // Cancel any ongoing speech synthesis
      window.speechSynthesis.cancel();

      // Create a new utterance
      this.utterance = new SpeechSynthesisUtterance(text);
      this.utterance.rate = 0.9;
      this.utterance.pitch = 1;

      // Ensure voices are loaded before setting a voice
      const setVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        const maleVoice = voices.find(voice => voice.name.includes("Male") || voice.lang.includes("en-US"));
        if (maleVoice) {
          this.utterance.voice = maleVoice;
        }
      };

      // Wait for voices to be loaded
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = setVoice;
      } else {
        setVoice();
      }

      // Handle word boundaries for highlighting
      this.utterance.onboundary = (event) => {
        console.log("Boundary event:", event);
        if (event.name === "word") {
          const currentWord = text.slice(event.charIndex, event.charIndex + event.charLength);
          console.log("Current word:", currentWord, "Char index:", event.charIndex);
          this.highlightText(event.charIndex, currentWord);
        }
      };

      // Handle end of speech
      this.utterance.onend = () => {
        this.isReading = false;
        this.clearHighlight();
      };

      // Start speaking
      this.isReading = true;
      window.speechSynthesis.speak(this.utterance);
    },

    highlightText(charIndex, currentWord) {
      const text = this.tafseer; // Use `this.tafseer` instead of `this.information.translation`
      const before = text.slice(0, charIndex);
      const after = text.slice(charIndex + currentWord.length);
      this.renderedText = `
    <span>${before}</span>
    <span style="background-color: rgba(0, 191, 166, 0.6); padding: 4px; border-radius: 5px;">
      ${currentWord}
    </span>
    <span>${after}</span>`;
    },

    clearHighlight() {
      this.renderedText = `<span>${this.tafseer}</span>`; // Use `this.tafseer` instead of `this.information.translation`
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
    },
  },
  watch: {
    "information.ayah.id": {
      immediate: true,
      handler(newAyahId) {
        console.log("Ayah changed:", newAyahId); // Debug
        this.fetchTafseer(newAyahId); // Fetch tafseer for new ayah
        this.stopReading(); // Stop any ongoing speech
      },
    },
    tafseer: {
      immediate: true,
      handler(newTafseer) {
        console.log("Tafseer updated:", newTafseer); // Debug
        this.updateRenderedText(newTafseer); // Update displayed tafseer
      },
    },
    
  },

};
</script>

<style scoped>
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

@media (max-width: 768px) {

  /* Adjust this width as needed for your breakpoint */
  .mobile-only {
    display: flex;
    /* Show only on mobile */
  }
}

@media (max-width: 576px) {
  .mobile-only {
    display: block;
    display: flex;
  }

  .hide-on-mobile {
    display: none;
  }
}
</style>
