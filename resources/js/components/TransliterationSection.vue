<template>
<div class="w-100 my-element" :class="{'full-screen': isFullScreen}">
  <button v-if="isFullScreen" @click="toggleFullScreen" class="close-button mb-3 text-left btn btn-secondary">Close</button>
  <div ref="targetTransliterationElement">
    <AyahInfo :information="information" />
    <div @touchstart="handleStart" @touchend="handleEnd" @mousedown="handleStart" @mouseup="handleEnd" @mouseleave="cancelHold" class="swipeable-div w-100">
      <div class="row">
        <div class="col-md-2 pt-2 d-flex align-items-center justify-content-center"></div>
        <div class="col-md-10">
          <MainAyah :information="information" />
        </div>
      </div>
      <div class="row text-left mt-2">
        <div class="col-10">
          <div>
            <h4 class="ayah-translation" 
                :style="{ fontSize: fontSize + 'em', lineHeight: '1.6em' }">
              {{ expanded ? information.transliteration : information.transliteration }}
            </h4>
            <hr>
            <div  class="row collapse pt-3" id="collapseExample">
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
                <img src="/images/art.png" class="pr-2" width="30px" alt="lamp" loading="lazy" />
                <strong>Total Word count: </strong>{{ wordCount }}
              </h6>
            </div> -->
            <div  class="text-left word-count mt-3">
              <img src="/images/art.png" class="pr-2" width="30px" alt="lamp" loading="lazy" />
              <strong>Transliteration: </strong>Saheeh International
            </div>
          </div>
        </div>
        <!-- Icons Column (Stacked Vertically) -->
        <div  class="col-2 d-flex align-items-center justify-content-center flex-column">
          <i style="cursor: pointer;" class="bi bi-plus-circle-fill h3 custom-icon-increase" aria-placeholder="Increase text size" @click="increaseFontSize"></i>
          <i style="cursor: pointer;" class="bi bi-dash-circle-fill h3 custom-icon-decrease" aria-placeholder="Decrease text size" @click="decreaseFontSize"></i>

          <p  class="d-inline-flex gap-1">
            <i style="cursor: pointer;" 
              class="bi bi-file-earmark-arrow-down-fill h3 custom-icon-decrease" 
              data-bs-toggle="collapse" 
              href="#collapseExample" 
              role="button" 
              aria-expanded="false" 
              aria-controls="collapseExample" 
              @click="toggleIcon">
            </i>
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="text-left mt-3 word-count">
      <h6 class="text-left"><img src="/images/art.png" class="pr-2" width="30px" alt="lamp" loading="lazy" /><strong>Reciter's name: </strong>Mishary Rashid Alafasy</h6>
    </div> -->
    <AlertModal :showAlertText="showAlertText" :showAlert="showAlert" :showErrorAlert="showErrorAlert" :showAlertTextNote="showAlertTextNote" @close-alert-text="closeAlertText" />
  </div>    

</div>
</template>

<script>
import AyahInfo from './translation/AyahInfo.vue';
import MainAyah from './translation/MainAyah.vue';
import AlertModal from './modals/AlertModal.vue';
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
  name: 'TransliterationSection',
  components: {
    AyahInfo,
    MainAyah,
    AlertModal
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
    },
  },
  data() {
    return {
      summary: "", // Generated summary
      error: "", // Error message
      loading: false, // Loading state
      API_TOKEN: "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", // Hugging Face API token
      BASE_URL: "https://api-inference.huggingface.co/models/facebook/bart-large-cnn", // Hugging Face API URL
      selectedFormat: "Select a format",
      fontSize: parseFloat(localStorage.getItem('ayahFontSize')) || 1,
      expanded: false,
      isPaused: false,
      isReading: false,
    }
  },
  computed: {
    
    wordCount() {
      const text = this.information.transliteration || "";
      return text.trim().split(/\s+/).length;
    }
  },
  
  methods: {
    toggleIcon(event) {
      const icon = event.target;
      icon.classList.toggle('bi-arrow-down-circle-fill');
      icon.classList.toggle('bi-arrow-up-circle-fill');
    },
    downloadAsExport() {
      // Safely handle undefined `renderedText`
      const renderedText = this.renderedText ? this.renderedText.replace(/<\/?[^>]+(>|$)/g, "") : "";

      // Safely handle undefined `information` or nested properties
      const surahNumber = this.information?.ayah?.surah_id || "unknown";
      const ayahNumber = this.information?.ayah?.ayah_id || "unknown";

      // Prepare dynamic content for export
      const content = {
        Translation: renderedText,
        translationInfo: "Ahmed Ali",
        wordCount: this.wordCount || 0,
        ayahInfo: {
          id: this.information?.id || "unknown", 
          ayah: {
            id: this.information?.ayah?.id || "unknown",
            surah_id: surahNumber,
            ayah_text: this.information?.ayah?.ayah_text || "",
            ayah_id: ayahNumber,
            surah: {
              id: this.information?.ayah?.surah?.id || "unknown",
              name_en: this.information?.ayah?.surah?.name_en || "",
              name_ar: this.information?.ayah?.surah?.name_ar || "",
              text: this.information?.ayah?.surah?.text || ""
            }
          }
        }
      };

      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];

      // Construct file name with Surah and Ayah numbers
      const fileName = `transliteration_surah_${surahNumber}_ayah_${ayahNumber}_${formattedDate}.json`;

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
      const formatCsvValue = (value, options = { isLtr: false, isRtl: false }) => {
        if (value == null) return '';

        // Convert to string and escape quotes
        let formattedValue = String(value)
            .replace(/"/g, '""')         // Escape quotes
            .replace(/[\r\n]+/g, ' ')    // Replace newlines with spaces
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
              '"Transliteration"', 
              formatCsvValue(this.information?.transliteration, { isLtr: true })
          ],
          [
              '"Transliteration"', 
              formatCsvValue('Saheeh International', { isLtr: true })
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
                            text: "Quran Transliteration Document",
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
                            italics:false,
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
                              italics:false,
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
                              text: "Transliteration:",
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
                              text: this.information?.transliteration,
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
                              text: "Transliteration:",
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
                              text: "Saheeh International",
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
      const filename = `transliteration_doc_surah_${surahNum}_ayah_${ayahNum}_${date}.docx`;

      // Save the file
      saveAs(blob, filename);
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
    },
    // created(){
    //   this.checkSubscriptionStatus();
    //   this.handleSuccess();
    // },
  },
  watch: {
    isVisible() {
      this.$emit('toggle-change');
    },
  },
}
</script>

<style scoped>

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

.word-count {
  margin-top: 10px;
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

/* Mobile Media Queries */
.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .mobile-only {
    display: flex;
  }
}

@media (max-width: 576px) {
  .mobile-only {
    display: flex;
  }

  .hide-on-mobile {
    display: none;
  }
}
</style>
