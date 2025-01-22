<template>
  <div>
    <!-- Screenshot icon -->
    <i 
      class="bi bi-camera text-right mr-2 h3" 
      @click="captureTranslation" 
      aria-expanded="false" 
      data-bs-placement="top" 
      title="Screenshot verse" 
      :style="{ iconColor: iconColor, cursor: 'pointer' }"
    ></i>

    <!-- Modal -->
    <div class="modal fade" id="previewModal" tabindex="-1" aria-labelledby="previewModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="previewModalLabel"><b>Screenshot Preview</b></h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px; padding:15px">
            <img v-if="previewImage" :src="previewImage" alt="Screenshot" class="img-fluid" loading="lazy"/>
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

      const unwantedElements = [
        '.icon-container, .settings, .summary, .href, .mobile-only, .bar, .pitch, .rate, .container.text-center, ' +
        '.custom-icon-play, .bi-rewind-circle-fill, .bi-plus-circle-fill, .bi-dash-circle-fill, ' +
        '.bi-play-circle-fill, .bi-pause-circle-fill, .bi-stop-circle-fill, .custom-icon-decrease, .word-count'
      ];

      // Function to hide elements
      const hideElements = (selectorArray) => {
        selectorArray.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            el.style.display = 'none';
          });
        });
      };

      // Function to show elements
      const showElements = (selectorArray) => {
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
        html2canvas(targetTranslationElement, {
          allowTaint: true,
          useCORS: true,
        }).then((canvas) => {
          const dataUrl = canvas.toDataURL("image/png");

          // Automatically trigger download of the image
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "screenshot.png";
          link.click();

          // Restore visibility of unwanted elements
          showElements(unwantedElements);
        }).catch((error) => {
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
};
</script>