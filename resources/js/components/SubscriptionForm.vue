<template>
    <div class="subscription-wrapper">
        <h1>Subscription</h1>
        
        <!-- Success Message -->
        <div v-if="success" class="alert alert-success" role="status" aria-live="polite">
            {{ success }}
        </div>
        
        <!-- Error Message -->
        <div v-if="error" class="alert alert-error" role="alert" aria-live="assertive">
            {{ error }}
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading">
            <p>Loading subscription details...</p>
        </div>

        <!-- Subscribed View -->
        <div v-else-if="isSubscribed" class="subscription-details">
            <div class="subscription-card">
                <h2>Active Subscription</h2>
                <p class="plan-name">{{ planDisplayName }}</p>
                <p class="ends-at">
                    <strong>{{ subscription?.ends_at ? 'Ends:' : 'Status:' }}</strong> 
                    {{ subscription?.ends_at ? formatDate(subscription.ends_at) : 'Active' }}
                </p>
                <button @click="handleCancelSubscription" class="btn btn-danger" :disabled="cancelling">
                    {{ cancelling ? 'Cancelling...' : 'Cancel Subscription' }}
                </button>
            </div>
        </div>

        <!-- Subscription Selection View -->
        <div v-else class="plans">
            <h2 id="planHeading">Choose Your Plan</h2>
            <form method="POST" action="/subscribe" class="subscription-form">
                <input type="hidden" name="_token" :value="csrfToken">
                <select name="price_lookup_key" required v-model="selectedPlan" class="form-control">
                    <option value="price_1SDrmPGsDD2PdzHqTgawcJZd">Premium Monthly (£1.99)</option>
                    <option value="price_1SDrmPGsDD2PdzHqDOScwoI2">Premium Yearly (£18)</option>
                    <option value="price_1SDrmPGsDD2PdzHqvk1SOoT3">Premium Lifetime (£25)</option>
                </select>
                <button type="submit" class="btn btn-primary" :disabled="submitting">
                    {{ submitting ? 'Processing...' : 'Subscribe' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const selectedPlan = ref('price_1SDrmPGsDD2PdzHqTgawcJZd');
const loading = ref(true);
const submitting = ref(false);
const cancelling = ref(false);
const error = ref('');
const success = ref('');
const isSubscribed = ref(false);
const subscription = ref(null);

const planDetails = {
    'price_1SDrmPGsDD2PdzHqTgawcJZd': 'Premium Monthly (£1.99)',
    'price_1SDrmPGsDD2PdzHqDOScwoI2': 'Premium Yearly (£18)',
    'price_1SDrmPGsDD2PdzHqvk1SOoT3': 'Premium Lifetime (£25)',
};

const planDisplayName = computed(() => {
    if (!subscription.value?.stripe_price) return 'Free';
    return planDetails[subscription.value.stripe_price] || 'Premium';
});

const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

const fetchSubscriptionStatus = async () => {
    try {
        const response = await fetch('/subscription-status', {
            headers: { 
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json'
            },
        });
        
        if (!response.ok) throw new Error('Failed to fetch subscription status');
        
        const data = await response.json();
        isSubscribed.value = data.is_subscribed;
        subscription.value = {
            stripe_price: data.plan !== 'free' ? data.plan : null,
            ends_at: data.ends_at
        };
        
        return data.is_subscribed;
    } catch (err) {
        console.error('Error fetching subscription:', err);
        error.value = 'Error loading subscription status. Please refresh the page.';
        return false;
    }
};

const waitForSubscription = async () => {
    success.value = 'Subscription successful! Activating your subscription...';
    let attempts = 0;
    const maxAttempts = 15; // 30 seconds total (15 attempts × 2 seconds)
    
    const checkStatus = async () => {
        attempts++;
        const subscribed = await fetchSubscriptionStatus();
        
        if (subscribed) {
            success.value = 'Subscription activated successfully!';
            loading.value = false;
            // Clear success message after 5 seconds
            setTimeout(() => {
                success.value = '';
            }, 5000);
            return true;
        }
        
        if (attempts >= maxAttempts) {
            error.value = 'Subscription is taking longer than expected to activate. Please refresh the page in a few moments or contact support if the issue persists.';
            success.value = '';
            loading.value = false;
            return false;
        }
        
        // Continue checking
        setTimeout(checkStatus, 2000);
        return false;
    };
    
    await checkStatus();
};

onMounted(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if returning from successful payment
    if (urlParams.has('success')) {
        await waitForSubscription();
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
    } else if (urlParams.has('cancelled')) {
        error.value = 'Subscription cancelled. You can try again when ready.';
        await fetchSubscriptionStatus();
        loading.value = false;
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
    } else {
        await fetchSubscriptionStatus();
        loading.value = false;
    }
});

const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? It will remain active until the end of your billing period.')) {
        return;
    }
    
    cancelling.value = true;
    error.value = '';
    
    try {
        const response = await fetch('/cancel', {
            method: 'POST',
            headers: { 
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            await fetchSubscriptionStatus();
            success.value = `Subscription cancelled. Access continues until ${new Date(data.ends_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.`;
            setTimeout(() => {
                success.value = '';
            }, 8000);
        } else {
            throw new Error(data.message || 'Failed to cancel subscription');
        }
    } catch (err) {
        console.error('Error cancelling subscription:', err);
        error.value = err.message || 'Error cancelling subscription. Please try again.';
    } finally {
        cancelling.value = false;
    }
};
</script>

<style scoped>
.subscription-wrapper {
    max-width: 600px;
    margin: 2rem auto;
    padding: 0 1rem;
}

h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #333;
}

.alert {
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
}

.alert-success {
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    color: #155724;
}

.alert-error {
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    color: #721c24;
}

.loading {
    text-align: center;
    padding: 2rem;
    color: #666;
}

.subscription-card {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
}

.subscription-card h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #35a38b;
}

.plan-name {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
}

.ends-at {
    margin-bottom: 1.5rem;
    color: #666;
}

.plans {
    background: #fff;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 2rem;
}

#planHeading {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #333;
}

.subscription-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-control {
    border: 1px solid #dee2e6;
    padding: 0.75rem;
    border-radius: 6px;
    width: 100%;
    font-size: 1rem;
}

.btn {
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-primary {
    background-color: #35a38b;
    color: white;
}

.btn-primary:hover:not(:disabled) {
    background-color: #2d8c77;
}

.btn-danger {
    background-color: #dc3545;
    color: white;
}

.btn-danger:hover:not(:disabled) {
    background-color: #c82333;
}
</style>