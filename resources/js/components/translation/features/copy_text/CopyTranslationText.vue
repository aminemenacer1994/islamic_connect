<template>
<div>
 <div>
 <i
      class="bi bi-clipboard-check text-right mr-2 h4"
      @click="copyTranslationText"
      aria-expanded="false"
      data-bs-placement="top"
      title="Copy verse"
      :style="{ color: iconColor, cursor: 'pointer' }"
    ></i>
 </div>
 <div v-if="showAlertText" class="alert alert-success" role="alert">
  Text copied successfully!
 </div>
 <div v-if="showErrorAlert" class="alert alert-danger" role="alert">
  Failed to copy text!
 </div>
</div>
</template>

<script>
export default {
 name: "CopyTranslationText",
 props: {
  textToCopy: {
   type: String,
   required: true
  }
 },
 data() {
  return {
   showAlertText: false,
   showErrorAlert: false
  };
 },
 methods: {
  copyTranslationText() {
      this.copyToClipboard(this.textToCopy)
        .then(() => {
          this.showAlertText = true;
          this.showErrorAlert = false;
          this.hideAlertAfterDelay();
        })
        .catch(() => {
          this.showAlertText = false;
          this.showErrorAlert = true;
          this.hideAlertAfterDelay();
        });
    },
    copyToClipboard(text) {
      return navigator.clipboard.writeText(text);
    },
    hideAlertAfterDelay() {
      setTimeout(() => {
        this.showAlertText = false;
        this.showErrorAlert = false;
      }, 2000);
    }
 }
};
</script>
