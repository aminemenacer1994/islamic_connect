<template>
  <div>
    

    <!-- Success alert for bookmark creation -->
    <div v-if="showAlert" class="alert alert-success mt-2" role="alert">
      Bookmark created successfully!
    </div>

    <!-- Error alert for bookmarking without login -->
    <div v-if="showErrorAlert" class="alert alert-danger" role="alert">
      Login to your account to be able to bookmark verses.
    </div>

    <!-- Error alert for noting without login -->
    <div v-if="showAlertTextNote" class="alert alert-danger" role="alert">
      Please log in to write a note.
    </div>

    <div v-if="showAlert1" :class="['alert', alertType === 'success' ? 'alert-success' : 'alert-danger']">
    {{ alertMessage }}
  </div>

  </div>
</template>

<script>
export default {
  name: 'AlertModal',
  props: {
    showAlertText: Boolean,
    showAlert: Boolean,
    showErrorAlert: Boolean,
    showAlertTextNote: Boolean
  },
  methods: {
    closeAlertText() {
      this.$emit('close-alert-text'); // Emit event to close the alert
    },
    triggerBookmarkSuccess() {
      this.$emit('trigger-bookmark-success'); // Emit event to trigger bookmark success alert
    },
    triggerLoginError() {
      this.$emit('trigger-login-error'); // Emit event to trigger login error alert
    },
    triggerNoteLoginError() {
      this.$emit('trigger-note-login-error'); // Emit event to trigger note login error alert
    }
  }
};
</script>

<style>
/* Add your custom styles for alerts here */
</style>
