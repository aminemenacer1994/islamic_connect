<template>
  <div>
    <h1>Subscription Canceled</h1>
    <p>Your payment was canceled. Please try again if you wish to complete the subscription.</p>
    <p>You will be redirected shortly...</p>
  </div>
</template>

<script defer>
export default {
  mounted() {
    // Auto-redirect back to the main page (or another route) after a short delay
    setTimeout(() => {
      this.$router.push('/pricing'); // Change '/' to the route where you want the user to be redirected
    }, 3000); // 3000ms = 3 seconds
  },
};
</script>

<style scoped>
div {
  text-align: center;
  margin-top: 20vh;
  font-family: Arial, sans-serif;
}
</style>
