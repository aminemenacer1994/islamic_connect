<template>
  <div>
    <!-- Button to open the customization modal -->
    <div class="btn-group">
      <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        Save as
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" style="cursor:pointer" @click="showModal = true">Customize & Download</a></li>
      </ul>
    </div>

    <!-- Modal for customization options and live editing -->
    <div v-if="showModal" class="modal">
      <div class="modal-content modal-lg">
        <h3>Customize and Edit Document</h3>

        <!-- Document type selection -->
        <div class="form-group">
          <label>Select Document Type:</label>
          <select v-model="documentType">
            <option value="csv">CSV</option>
            <option value="word">Word</option>
          </select>
        </div>

        <!-- Style options -->
        <div class="form-group">
          <label>Font Size:</label>
          <input type="number" v-model="settings.fontSize" min="1" max="48" />
        </div>
        <div class="form-group">
          <label>Font Color:</label>
          <input type="color" v-model="settings.fontColor" />
        </div>
        <div class="form-group">
          <label>Line Height:</label>
          <input type="number" v-model="settings.lineHeight" min="1" max="3" step="0.1" />
        </div>

        <!-- Live preview and editable content -->
        <div class="document-preview">
          <div
            contenteditable="true"
            class="editable-content"
            :style="{
              fontSize: settings.fontSize + 'px',
              color: settings.fontColor,
              lineHeight: settings.lineHeight,
            }"
            v-html="editableContent"
            @input="updateContent($event)"
          ></div>
        </div>

        <!-- Buttons to download as CSV or Word -->
        <button @click="downloadDocument">Download Document</button>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { Document, Packer, Paragraph, TextRun } from "docx";

export default {
  props: {
    information: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showModal: false,
      documentType: "csv",
      settings: {
        fontSize: 16,
        fontColor: "#000000",
        lineHeight: 1.5,
      },
      editableContent: "",
      data: [],
      surat: [],
      ayat: [],
      tafseers: [],
      translation: [],
      information: {
        translation:'',
        transliteration:''
      },
      tafseer:''
    };
  },
  mounted() {
    this.loadDocumentContent();
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    loadDocumentContent() {
      if (this.documentType === "csv") {
        this.editableContent = `<p> ${this.information.translation}</p><p>Translator: ${this.information.translator}</p>`;
      } else if (this.documentType === "word") {
        this.editableContent = `<h4>Quran Translation Document</h4><p>Translation: ${this.information.translation}</p><p>Translator: ${this.information.translator}</p>`;
      }
    },
    updateContent(event) {
      this.editableContent = event.target.innerHTML;
    },
    downloadDocument() {
      if (this.documentType === "csv") {
        this.downloadAsCSV();
      } else if (this.documentType === "word") {
        this.downloadAsWord();
      }
    },
    downloadAsCSV() {
      const content = this.parseHTMLToText(this.editableContent);
      const data = [
        {
          Translation: content.translation,
          Translator: content.translator,
        },
      ];
      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, `translation_${new Date().toISOString().split("T")[0]}.csv`);
    },
    async downloadAsWord() {
      const content = this.parseHTMLToText(this.editableContent);
      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Quran Translation Document",
                    bold: true,
                    size: this.settings.fontSize * 2,
                    color: "1F4E79",
                  }),
                ],
                alignment: "CENTER",
                spacing: { after: 400 * this.settings.lineHeight },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Translation:",
                    bold: true,
                    size: this.settings.fontSize,
                    color: "2B5797",
                  }),
                ],
                spacing: { after: 200 * this.settings.lineHeight },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: content.translation,
                    size: this.settings.fontSize,
                    color: this.settings.fontColor.replace("#", ""),
                  }),
                ],
                spacing: { after: 400 * this.settings.lineHeight },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Translator:",
                    bold: true,
                    size: this.settings.fontSize,
                    color: "2B5797",
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: content.translator,
                    size: this.settings.fontSize,
                    color: this.settings.fontColor.replace("#", ""),
                  }),
                ],
              }),
            ],
          },
        ],
      });
      const blob = await Packer.toBlob(doc);
      saveAs(blob, `translation.docx`);
    },
    parseHTMLToText(html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      return {
        translation: doc.querySelector("p:nth-child(2)")?.innerText || "",
        translator: doc.querySelector("p:nth-child(3)")?.innerText || "",
      };
    },
  },
  watch: {
    documentType() {
      this.loadDocumentContent();
    },
    translation(newVal) {
      this.information.translation = newVal;
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
}

.form-group {
  margin-bottom: 15px;
}

.document-preview {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f9f9f9;
}

.editable-content {
  white-space: pre-wrap;
  min-height: 100px;
}
</style>
