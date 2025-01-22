<template>
  <div>
    <!-- Screenshot icon -->
    <i class="bi bi-camera text-right mr-2 h3" @click="captureTafseer" aria-expanded="false" data-bs-placement="top" title="Screenshot verse" :style="{ iconColor: iconColor, cursor: 'pointer' }"></i>

    <!-- Success Message (Bootstrap Alert) -->
    <!-- <div v-if="showSuccessMessage" class="alert alert-success alert-dismissible fade show" role="alert">
      Screenshot captured successfully!
      <button type="button" class="btn-close" @click="closeSuccessMessage" aria-label="Close"></button>
    </div> -->

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
    targetTafseerRef: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      previewImage: null,
      showSuccessMessage: false // To control the success message visibility
    };
  },
  methods: {
    captureTafseer() {
      // Access the target translation element using the ref passed as a prop
      const targetTafseerElement = this.$parent.$refs[this.targetTafseerRef];

      if (!targetTafseerElement) {
        console.error("Invalid element provided as targetTafseerRef");
        return;
      }

      // Store the original padding of the target element
      const originalPadding = targetTafseerElement.style.padding;

      // Set the desired padding
      targetTafseerElement.style.padding = "10px"; // Adjust this value as needed

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
        html2canvas(targetTafseerElement, {
          allowTaint: true,
          useCORS: true,
        }).then((canvas) => {
          const dataUrl = canvas.toDataURL("image/png");

          // Automatically trigger download of the image
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "screenshot.png";
          link.click();

          // Show success message after download
          this.showSuccessMessage = true;

          // Hide success message after 5 seconds
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 5000);

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
    },
    closeSuccessMessage() {
      this.showSuccessMessage = false;
    }
  }
};
</script>

<style scoped>
/* You can adjust the CSS for the success message here */
.alert {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1050; /* Ensure the alert is above other content */
}
</style>
