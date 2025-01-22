<template>
<div>
    <!-- <i class="bi bi-file-earmark-pdf text-right mr-2 h3" @click="downloadPdfTafseer" aria-expanded="false" data-bs-placement="top" title="Download PDF"></i> -->
</div>
</template>

<script defer>
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default {
    name: 'PdfDownload',
    props: {
        targetTafseerRef: {
            type: String,
            required: true
        }
    },
    methods: {
        downloadPdfTafseer() {
            // Correctly reference the target element
            const targetTafseerElement = this.$parent.$refs[this.targetTafseerRef];

            if (!targetTafseerElement) {
                console.error("Invalid element provided as first argument");
                return;
            }

            // Select all the elements you want to hide
            const unwantedElements = document.querySelectorAll(
                '.icon-container, .href, .mobile-only, .bar, .pitch, .rate, .container.text-center, .custom-icon-play, , .bi-rewind-circle-fill, .bi-play-circle-fill .bi-stop-circle-fill, .custom-icon-decrease'
            );

            // Store the original display styles of the elements
            const originalDisplayStyles = [];

            unwantedElements.forEach(el => {
                // Store each element's current display value before hiding it
                originalDisplayStyles.push({
                    element: el,
                    display: el.style.display
                });
                el.style.display = 'none'; // Hide the element
            });

            // Generate the PDF
            html2canvas(targetTafseerElement)
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

                    // Restore the original display styles after the PDF is generated
                    originalDisplayStyles.forEach(item => {
                        item.element.style.display = item.display; // Restore the saved display value
                    });
                })
                .catch(error => {
                    console.error('Failed to capture HTML content:', error);

                    // In case of an error, make sure to restore the display styles
                    originalDisplayStyles.forEach(item => {
                        item.element.style.display = item.display; // Restore the saved display value
                    });
                });
        }
      }

    };
</script>
