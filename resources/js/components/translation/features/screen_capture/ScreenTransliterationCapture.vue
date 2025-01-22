<template>
<div>
 <!-- Screenshot icon -->
 <i class="bi bi-camera text-right mr-2 h3" @click="captureTransliteration" aria-expanded="false" data-bs-placement="top" title="Screenshot verse" :style="{ iconColor: iconColor, cursor: 'pointer' }"></i>

 <!-- Modal -->
 <div class="modal fade" id="previewModal" tabindex="-1" aria-labelledby="previewModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered">
   <div class="modal-content">
    <div class="modal-header">
     <h4 class="modal-title" id="previewModalLabel"><b>Screenshot Preview</b></h4>
     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body text-center" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px; padding:15px">
     <img v-if="previewImage" :src="previewImage" alt="Screenshot" class="img-fluid" />
     <div v-else>Loading...</div>
    </div>
    <div class="modal-footer">
     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
     <button type="button" class="btn btn-success" @click="downloadImage('png')">Download PNG</button>
     <button type="button" class="btn btn-success" @click="downloadImage('jpg')">Download JPG</button>
    </div>
   </div>
  </div>
 </div>
</div>
</template>

<script>
import html2canvas from 'html2canvas';

export default {
 props: {
  targetTransliterationRef: {
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
  captureTransliteration() {
    const targetTransliterationElement = this.$parent.$refs[this.targetTransliterationRef];

    if (!targetTransliterationElement) {
      console.error("Invalid element provided as targetTransliterationRef");
      return;
    }

    // Store the original padding of the target element
    const originalPadding = targetTransliterationElement.style.padding;

    // Set the desired padding
    targetTransliterationElement.style.padding = "10px"; // Adjust this value as needed

    // Define the CSS selectors for the unwanted elements
    const unwantedSelectors = [
      '.icon-container', 
      '.settings',
      '.summary',
      '.href', 
      '.mobile-only', 
      '.bar', 
      '.pitch', 
      '.rate', 
      '.container.text-center', 
      '.custom-icon-play', 
      '.bi-rewind-circle-fill', 
      '.bi-plus-circle-fill', 
      '.bi-dash-circle-fill', 
      '.bi-play-circle-fill', 
      '.bi-pause-circle-fill', 
      '.bi-stop-circle-fill', 
      '.custom-icon-decrease', 
      '.word-count'
    ];

    // Hide the unwanted elements
    unwantedSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`No elements found for selector: ${selector}`);
      }
      elements.forEach(element => {
        if (element) {
          element.style.display = 'none';
        }
      });
    });

    setTimeout(() => {
      html2canvas(targetTransliterationElement, {
        allowTaint: true, // Capture cross-origin content if necessary
        useCORS: true, // Allow cross-origin images
      }).then((canvas) => {
        const dataUrl = canvas.toDataURL("image/png");

        // Automatically trigger download of the image
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "screenshot.png";
        link.click();

        // Restore the visibility of unwanted elements
        unwantedSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(element => {
            if (element) {
              element.style.display = '';
            }
          });
        });
      }).catch((error) => {
        console.error("Failed to capture screenshot:", error);
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
};
</script>
