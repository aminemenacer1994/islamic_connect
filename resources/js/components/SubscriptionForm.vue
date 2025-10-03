<template>
    <div>
        <h2 id="planHeading">Choose Your Plan</h2>
        <div v-if="!isSubscribed" class="plans" role="radiogroup" aria-labelledby="planHeading">
            <button class="plan" role="radio" :aria-checked="selectedPlan === 'price_premium_monthly'" @click="selectPlan('price_premium_monthly')">
                <h3>Premium Monthly</h3>
                <p>£1.99 / month</p>
            </button>
            <button class="plan" role="radio" :aria-checked="selectedPlan === 'price_premium_yearly'" @click="selectPlan('price_premium_yearly')">
                <h3>Premium Yearly</h3>
                <p>£18 / year (Save 25%)</p>
            </button>
            <button class="plan" role="radio" :aria-checked="selectedPlan === 'price_premium_lifetime'" @click="selectPlan('price_premium_lifetime')">
                <h3>Premium Lifetime</h3>
                <p>£25 once</p>
            </button>
        </div>
        <div v-else>
            <p>You're on {{ plan }} plan! Ends: {{ endsAt }}</p>
            <button @click="cancelSubscription" class="btn btn-primary">Cancel Subscription</button>
        </div>
        <form v-if="selectedPlan && !hasPaymentMethod" @submit.prevent="handlePayment" method="post"
            action="/subscribe" aria-describedby="paymentHelp" novalidate>
            <input type="hidden" name="price_lookup_key" :value="selectedPlan">
            <div class="mb-3">
                <label for="cardholderName" class="form-label">Cardholder Name</label>
                <input v-model="cardholderName" id="cardholderName" type="text" class="form-control" required
                    placeholder="Enter your name" autocomplete="cc-name">
            </div>
            <stripe-card ref="card" :key="selectedPlan" class="form-control" stripe="stripe"
                @stripe-error="onCardError" aria-label="Card details"></stripe-card>
            <p id="paymentHelp" class="sr-only">Your payment is processed securely by Stripe.</p>
            <button type="submit" :disabled="loading" class="btn btn-primary" :aria-busy="loading.toString()">Subscribe</button>
        </form>
        <p v-if="error" class="error" role="alert" aria-live="assertive">{{ error }}</p>
        <p v-if="success" class="success" role="status" aria-live="polite">{{ success }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStripe } from 'vue-stripe-elements-plus';

const { stripe } = useStripe();
const selectedPlan = ref(null);
const cardholderName = ref('');
const loading = ref(false);
const error = ref('');
const success = ref('');
const isSubscribed = ref(false);
const plan = ref('Free');
const endsAt = ref('');
const hasPaymentMethod = ref(false);
const card = ref(null);

onMounted(async () => {
    try {
        const response = await fetch('/subscription-status', {
            headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') },
        });
        if (!response.ok) throw new Error('Failed to fetch status');
        const data = await response.json();
        isSubscribed.value = data.is_subscribed;
        plan.value = data.plan === 'free' ? 'Free' : data.plan;
        endsAt.value = data.ends_at ? new Date(data.ends_at).toLocaleDateString() : '';
        hasPaymentMethod.value = !!localStorage.getItem('payment_method');
    } catch (err) {
        error.value = 'Error loading subscription status';
    }
});

const selectPlan = (lookupKey) => {
    selectedPlan.value = lookupKey;
    error.value = '';
};

const onCardError = (e) => {
    error.value = e.message;
};

const handlePayment = async (e) => {
    e.preventDefault();
    loading.value = true;
    error.value = '';
    try {
        const { paymentMethod, error: pmError } = await stripe.value.createPaymentMethod({
            type: 'card',
            card: card.value.element,
            billing_details: { name: cardholderName.value },
        });
        if (pmError) {
            error.value = pmError.message;
            return;
        }
        const formData = new FormData();
        formData.append('price_lookup_key', selectedPlan.value);
        formData.append('payment_method', paymentMethod.id);
        formData.append('cardholder_name', cardholderName.value);
        const response = await fetch('/subscribe', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
        });
        const data = await response.json();
        if (response.ok) {
            success.value = 'Subscription successful!';
            isSubscribed.value = true;
            plan.value = selectedPlan.value;
            endsAt.value = data.ends_at ? new Date(data.ends_at).toLocaleDateString() : '';
            localStorage.setItem('payment_method', paymentMethod.id);
        } else {
            throw new Error(data.error || 'Subscription failed');
        }
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

const cancelSubscription = async () => {
    try {
        const response = await fetch('/cancel', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
        });
        if (response.ok) {
            isSubscribed.value = false;
            plan.value = 'Free';
            endsAt.value = '';
            success.value = 'Cancelled!';
        } else {
            throw new Error('Cancellation failed');
        }
    } catch (err) {
        error.value = err.message;
    }
};
</script>

<style scoped>
.plans {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
}

.plan {
    border: 1px solid #ccc;
    padding: 1rem;
    cursor: pointer;
    border-radius: 6px;
}

.plan:hover {
    background: #f5f5f5;
}

.form-control {
    border: 1px solid #dee2e6;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    width: 100%;
}

.btn-primary {
    background-color: #35a38b;
    border-color: #35a38b;
    color: white;
    padding: 0.75rem;
}

.btn-primary:hover {
    background-color: #2d8c77;
    border-color: #2d8c77;
}

.btn-primary:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.error {
    color: #dc3545;
    margin-top: 0.5rem;
}

.success {
    color: #28a745;
    margin-top: 0.5rem;
}
</style>