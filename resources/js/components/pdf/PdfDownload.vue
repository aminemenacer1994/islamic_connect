// PdfDownload.vue
<template>
  <div>
    <!-- <i 
      class="bi bi-file-earmark-pdf text-right mr-2 h3" 
      @click="downloadPdf" 
      aria-expanded="false" 
      data-bs-placement="top" 
      title="Download PDF" 
      :style="{ color: iconColor, cursor: 'pointer' }">
    </i> -->
  </div>
</template>

<script defer>
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default {
  name: 'PdfDownload',
  props: {
    targetTranslationRef: {
      type: String,
      required: true
    }
  },
  methods: {
    downloadPdf() {
      const targetTranslationElement = this.$parent.$refs[this.targetTranslationRef];

      if (!targetTranslationElement) {
        console.error("Invalid element provided as first argument");
        return;
      }

      // Select elements to hide before generating the PDF
      const unwantedElements = document.querySelectorAll(
        '.icon-container, .href, .mobile-only, .bar, .pitch, .rate, .container.text-center, ' +
        '.custom-icon-play, .bi-rewind-circle-fill, .bi-plus-circle-fill, .bi-dash-circle-fill, ' +
        '.bi-play-circle-fill, .bi-pause-circle-fill, .bi-stop-circle-fill, .custom-icon-decrease'
      );

      // Add the hidden class to hide elements
      unwantedElements.forEach(el => {
        el.classList.add('hidden-for-pdf');
      });

      html2canvas(targetTranslationElement, {
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.scrollHeight // Full page height
      })
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        // Adjust image dimensions to fit A4, considering PDF margins
        const pdfWidth = 190; // Adjust for margins on A4
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, imgHeight);
        pdf.save('download.pdf');

        // Remove the hidden class after saving the PDF
        unwantedElements.forEach(el => {
          el.classList.remove('hidden-for-pdf');
        });
      })
      .catch(error => {
        console.error('Failed to capture HTML content:', error);
      });
    }
  }
};
</script>

<style>
.hidden-for-pdf {
  display: none !important;
}
</style>