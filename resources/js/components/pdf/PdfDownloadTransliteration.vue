<!-- PdfDownload.vue -->
<template>
  <div>
    <!-- <i 
      class="bi bi-file-earmark-pdf text-right mr-2 h3" 
      @click="downloadPdfTransliteration" 
      aria-expanded="false" 
      data-bs-placement="top" 
      title="Download PDF" 
      
    ></i>     -->
  </div>
</template>

<script defer>
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default {
  name: 'PdfDownload',
  props: {
    targetTransliterationRef: {
      type: String,
      required: true
    }
  },
  methods: {
    downloadPdfTransliteration() {
      const targetTransliterationElement = this.$parent.$refs[this.targetTransliterationRef];

      if (!targetTransliterationElement) {
        console.error("Invalid element provided as first argument");
        return;
      }

      // Select all the elements you want to hide
      const unwantedElements = document.querySelectorAll(
        '.icon-container, .href, .mobile-only, .bar, .pitch, .rate, .container.text-center, .custom-icon-play, , .bi-rewind-circle-fill, .bi-play-circle-fill .bi-stop-circle-fill, .custom-icon-decrease'
      );

      // Hide the unwanted elements
      unwantedElements.forEach(el => el.style.display = 'none');

      html2canvas(targetTransliterationElement)
        .then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
          });

          // Add the image to the PDF
          pdf.addImage(imgData, 'PNG', 10, 10, 190, 0); // Adjust the dimensions as needed
          pdf.save('download.pdf');
          unwantedElements.forEach(el => el.style.display = '');
        })
        .catch(error => {
          console.error('Failed to capture HTML content:', error);
        });
    }, 
    
    
  }
};
</script>
