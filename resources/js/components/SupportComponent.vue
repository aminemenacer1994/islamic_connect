<template>
<div>
  <div class="container pt-3">
    <div class="row gx-4 align-items-center justify-content-between">
      <div class="col-md-6 order-2 order-md-1 pb-3">
        <div class="mt-3 mt-md-0">
          <h2 class="display-5 fw-bold pb-3">Support Us</h2>
          <p class="lead">
            At Islamic Connect, we are committed to breaking down barriers and making Islamic knowledge freely accessible to Muslims everywhere. Your donation helps us expand our platform, improve our resources, and ensure that every Muslim can engage with the Quran and Islamic teachings, no matter their circumstances.          </p>
          <p class="lead">
            Your Impact: Provide free, accessible tools for Muslims worldwide, Expand our platform to reach more individuals and Develop innovative features that enhance the learning experience.          
          </p>
          <p class="lead">
            Together, we can create a future where Islamic knowledge is available to everyone. Every contribution brings us closer to this goal.          
          </p>


          <!-- Donate Button -->
          <button class="container form-control" style="background:#00BFA6; color:white" onclick="window.location.href='https://donate.stripe.com/6oE5kY84oc3q7fy145';">
            Donate Now
          </button>

        </div>
      </div>
      <div class="col-md-6 order-2">
        <img src="/images/money1.png" width="100%" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  loadStripe
} from "@stripe/stripe-js";
import axios from "axios"; // Assuming axios is imported to handle the API call

export default {
  data() {
    return {
      stripe: null,
      amount: 0, // Start with 0 so user has to input their own amount
    };
  },
  mounted() {
    // Initialize Stripe with your publishable key
    loadStripe("pk_live_51QIJkjIol4Q5wn4Og4nYBjG25zNBFSnvTIfivJvDdHt6u0CD364TMcQHvGmrh6TOBNPDi9xwRDz7Zoirdl6NSDoB00JEFToo7F").then(
      (stripe) => {
        this.stripe = stripe;
      }
    );
  },
  methods: {
    async donate() {
      if (this.amount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
      }

      try {
        // Send the dynamically selected donation amount to the backend
        const response = await axios.post('/create-checkout-session', {
          amount: this.amount,
        });

        const {
          id
        } = response.data;

        // Redirect to Stripe Checkout page
        const {
          error
        } = await this.stripe.redirectToCheckout({
          sessionId: id,
        });

        if (error) {
          console.error('Error redirecting to checkout:', error.message);
        }
      } catch (error) {
        console.error('Error creating checkout session:', error.message);
      }
    },
  },
};
</script>

<style>
/* Stripe-like theme for the input */
.stripe-input {
  background-color: #f7f7f8;
  border: 1px solid #ccd0d5;
  border-radius: 4px;
  padding: 12px;
  font-size: 16px;
  font-weight: 400;
  color: #333;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s ease-in-out;
}

.stripe-input:focus {
  border-color: #00bfa6;
  outline: none;
}

.stripe-input::placeholder {
  color: #ccc;
}

/* Additional button styles */
.donate {
  background-color: #00BFA6;
  border-radius: 8px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: "Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: bold;
  font-weight: 400;
  outline: none;
  padding: 10px 25px;
  text-align: center;
  transform: translateY(0);
  transition: transform 150ms, box-shadow 150ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
</style>
