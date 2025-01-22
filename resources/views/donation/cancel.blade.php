<template>
  <div>
    <h1>Donation Canceled</h1>
    <p>Your donation process was canceled.</p>
    <p>If you changed your mind, you can <a href="{{ route('donation.create') }}">try again</a>.</p>
  </div>
</template>

<script defer>
export default {
  mounted() {
    // Auto-redirect back to the main page (or another route) after a short delay
    setTimeout(() => {
      this.$router.push('/support'); // Change '/' to the route where you want the user to be redirected
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

