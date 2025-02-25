<template>
  <div>
    <h1>Payment Successful!</h1>
    <p>Thank you for subscribing. You now have access to premium features.</p>
  </div>
</template>

<script>
export default {
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const subscriptionType = urlParams.get('subscription');

    if (subscriptionType) {
      // Store subscription status in localStorage
      localStorage.setItem('subscriptionStatus', 'active');
      localStorage.setItem('subscriptionType', subscriptionType);

      // Redirect to the main app after a few seconds
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } else {
      // Redirect to home if no subscription type is found
      window.location.href = '/';
    }
  },
};
</script>