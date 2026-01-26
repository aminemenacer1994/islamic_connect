<template>
  <div id="app" class="subscription-container">
      <!-- Subscription code commented out -->
      <div class="container" style="padding: 100px; text-align: center;">
          <p>Subscription system is currently disabled.</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'SubscriptionComponent',
  data() {
      return {
          // Minimal data to prevent errors if referenced
      };
  },
  mounted() {
      console.log('SubscriptionComponent: Subscription disabled');
  }
};
</script>

<style scoped>
/*
.subscription-container {
 ...
}
*/
</style>
