<template>
<div id="app" class="pt-3">

 <div class="container py-3">
  <div class="row container">
   <div class="mr-2 ">
    <h1 class="display-4 text-center" style="font-family:inter">Donations</h1>
    <p class="lead text-muted mb-0" style="font-family:inter">"As-salaamu Alaikum, As we want to keep IslamicHub ad-free, we would appreciate a small, sizable donation to continue the development and maintenance of the website. You will find a form on the right side where you can submit a donation amount of your choosing. Jazakum Allahu Khairan."</p><br>
    <p class="lead text-muted mb-0" style="font-family:inter">The call for donations in Islam is rooted in compassion and empathy for the less fortunate. It is a way for individuals to fulfill their duty towards their fellow human beings, fostering a sense of community and solidarity. </p>
   </div>
  </div>
  <div class="row">
   <div class="col-lg-6 mx-auto">
    <div class="card mt-5 box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;" style="border-radius:8px">
     <div class="card-header" style="border-radius:8px">

      <div class="tab-content">
       <div id="credit-card" class="tab-pane fade show active pt-3">
        <form role="form" onsubmit="event.preventDefault()" style="padding:10px">

         <div class="form-group mb-3"> <label for="cardNumber">
           <h6>Card number</h6>
          </label>
          <div class="input-group"> <input type="text" name="card_number" placeholder="Valid card number" class="form-control " required>
           <div class="input-group-append"> <span class="input-group-text text-muted"> <i class="fab fa-cc-visa mx-1"></i> <i class="fab fa-cc-mastercard mx-1"></i> <i class="fab fa-cc-amex mx-1"></i> </span> </div>
          </div>
         </div>
         <h6 for="amount">Amount:</h6>
         <input v-model="amount" class="form-control mb-3" type="number" min="1" step="0.01">

         <h6 class="mt-2" for="currency">Currency:</h6>
         <select class="form-control mb-3" v-model="selectedCurrency">
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="eur">GBP</option>
         </select>
         <div class="row mb-3">
          <div class="col-sm-8">
           <div class="form-group"> <label><span class="hidden-xs">
              <h6 class="mt-2">Expiration Date</h6>
             </span></label>
            <div class="input-group"> <input type="number" placeholder="MM" name="" class="form-control" required> <input type="number" placeholder="YY" name="" class="form-control" required> </div>
           </div>
          </div>
          <div class="col-sm-4">
           <div class="form-group mb-4"> <label data-toggle="tooltip" title="Three digit CV code on the back of your card">
             <h6>CVV <i class="fa fa-question-circle d-inline"></i></h6>
            </label> <input type="text" required class="form-control"> </div>
          </div>
         </div>
         <div class="row">
          <button type="button" class="subscribe btn btn-success btn-lg btn-block col-md-12" @click="initiatePayment">Pay Now</button>
         </div>
        </form>
       </div>
      </div>

     </div>
    </div>
   </div>
   <div class="col-lg-6 mt-5 d-none d-lg-block"><img src="/images/group.png" alt="" class="img-fluid" loading="lazy"></div>
  </div>
 </div>

</div>
</template>

<script defer>
export default {
 data() {
  return {
   amount: 1, // Default amount
   selectedCurrency: 'usd', // Default currency
   stripeToken: 'tok_visa',
  };
 },
 async mounted() {
  const stripe = await this.$stripe;
  const elements = stripe.elements();

  // Create an instance of the card Element.
  const cardElement = elements.create('card');

  // Mount the card element to the DOM.
  cardElement.mount('#card-element');
 },
 methods: {
  async initiatePayment() {
   try {
    const stripe = await this.$stripe; // Access Stripe instance from the Vue app
    const response = await axios.post('/payment/initiate', {
     amount: this.amount,
     currency: 'usd', // Adjust currency as needed
    });

    const {
     error
    } = await stripe.confirmCardPayment(response.data.client_secret, {
     payment_method: {
      card: elements.getElement('card-element'), // Use the card element created earlier
      billing_details: {
       // Include any additional billing details if needed
      },
     },
    });

    cardElement.mount('#card-element');

    if (error) {
     console.error(error);
    } else {
     console.log('Payment successful!');
    }
   } catch (error) {
    console.error(error);
   }
  },
 },
};
</script>

<style>
body {
 background: #f5f5f5
}

.rounded {
 border-radius: 1rem
}

.nav-pills .nav-link {
 color: #555
}

.nav-pills .nav-link.active {
 color: white
}

input[type="radio"] {
 margin-right: 5px
}

.bold {
 font-weight: bold
}
</style>
