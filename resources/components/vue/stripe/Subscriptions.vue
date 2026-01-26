<template>
  <div>
    <h2>Choose Your Subscription Plan</h2>
    <div class="subscription-buttons">
      <button @click="initiateCheckout('basic')">Basic Plan</button>
      <button @click="initiateCheckout('premium')">Premium Plan</button>
      <button @click="initiateCheckout('deluxe')">Deluxe Plan</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";

export default {
  data() {
    return {
      plans: {
        basic: 10, // Example price
        premium: 20,
        deluxe: 30,
      },
    };
  },
  methods: {
    async initiateCheckout(plan) {
      try {
        // Make a POST request to the backend to create a checkout session
        const response = await axios.post('/create-checkout-session', { plan });

        // Get the session ID from the backend response
        const sessionId = response.data.sessionId;

        // Load Stripe with your publishable key
        const stripe = await loadStripe('pk_live_51QIJkjIol4Q5wn4Og4nYBjG25zNBFSnvTIfivJvDdHt6u0CD364TMcQHvGmrh6TOBNPDi9xwRDz7Zoirdl6NSDoB00JEFToo7F');
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          console.error('Error redirecting to checkout:', error);
        }
      } catch (error) {
        console.error('Error creating checkout session:', error);
      }
    }
  },
};
</script>

<style scoped>
.subscription-buttons button {
  margin: 10px;
  padding: 10px;
  cursor: pointer;
}
</style>
