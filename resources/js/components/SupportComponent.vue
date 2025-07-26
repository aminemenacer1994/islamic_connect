<template>
  <div>
    <section class="py-5">
      <div class="container pt-3 pb-3">
        <div class="row gx-4 align-items-center justify-content-between">
          <div class="col-md-10 order-2 order-md-1 pb-3">
            <div class="mt-3 mt-md-0">
              <h2 class="display-5 fw-bold pb-3">Unlock Islamic Knowledge for Every Muslim With Your Help</h2>

              <p class="lead lh-base mb-3">
                🌍 Around the world, millions of Muslims are still struggling to access the Quran and authentic Islamic
                knowledge — especially reverts, people with disabilities, and those in under-resourced communities.
              </p>

              <p class="lead lh-base mb-4">
                🚀 At <b>Islamic Connect</b>, we’re building a game-changing platform that makes learning Islam easy,
                inclusive, and accessible for all — powered by AI, voice tools, and disability-friendly features.
              </p>

              <p class="lead lh-base mb-4">
                👉 <b>Your donation is more than charity — it’s Sadaqah Jariyah.</b> Every dollar helps someone connect
                with the Quran, learn a dua, or discover Islam for the first time — and you share in every reward.
              </p>

              <h2 class="display-5 fw-bold pb-3 mt-4">📦 Where Your Donation Goes</h2>

              <ul class="lead lh-base ps-3 mb-4" style="list-style-type: none;">
                <li class="mb-2">📚 <b>Content Expansion</b> – Adding more Quranic content, Hadith, Seerah, Duas,
                  lectures, and educational materials.</li>
                <li class="mb-2">♿ <b>Accessibility Tools</b> – Improving features for the blind, deaf, and physically
                  disabled (screen readers, TTS, voice search, etc.).</li>
                <li class="mb-2">🤖 <b>AI Development</b> – Building voice search, personalized recitation tools, and
                  smart learning experiences.</li>
                <li class="mb-2">🔐 <b>Essential Costs</b> – Covering servers, security and third-party services.</li>
                <li class="mb-2">👨‍💻 <b>Team Support</b> – Supporting our small team of developers working around the
                  clock to serve the ummah.</li>
              </ul>

              <h3 class="display-5 fw-bold pb-3 mt-4">Why Give?</h3>

              <p class="lead lh-base mb-4">
                Because your donation could be the reason someone:
              </p>

              <ul class="lead lh-base ps-3 mb-4" style="list-style-type: none;">
                <li class="mb-2">📖 Hears the Quran for the first time</li>
                <li class="mb-2">🕋 Learns how to pray</li>
                <li class="mb-2">🤲 Finds peace through a dua</li>
                <li class="mb-2">🕌 Connects to Allah in a way they never could before</li>
              </ul>

              <p class="lead lh-base mb-4">
                🌟 <b>Make an impact that lasts.</b><br />
                Support Islamic Connect and donate today.
              </p>

              <div class="col-md-10">
                <button class="container form-control"
                  style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 48px"
                  onclick="window.location.href='https://donate.stripe.com/6oE5kY84oc3q7fy145';">
                  <div style="font-size:1.5em"><b>Donate Now</b></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
