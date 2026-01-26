<template>
  <div>
    <i
      class="bi bi-clipboard-check text-right mr-2 h4"
      @click="copyTafseerText"
      aria-expanded="false"
      data-bs-placement="top"
      title="Copy verse"
      style="color: rgba(0, 191, 166); cursor: pointer"
    ></i>
 
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
  name: "copyTafseerText",
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
    copyTafseerText() {
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

<style scoped>
.alert {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
}
</style>