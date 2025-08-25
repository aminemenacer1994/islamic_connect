<template>
    <div class="subscription-prompt-overlay" @click="$emit('close')">
        <div class="subscription-prompt" @click.stop>
            <div class="prompt-content">
                <div class="header">
                    <h3>Unlock Premium Features</h3>
                    <p>Subscribe to access all content and features</p>
                </div>

                <div v-if="!selectedPlan" class="plan-selection">
                    <h4>Choose Your Plan</h4>
                    <div class="plan-cards">
                        <div 
                            class="plan-card"
                            :class="{ 'selected': selectedPlan === 'monthly' }"
                            @click="selectedPlan = 'monthly'"
                        >
                            <h4>Monthly</h4>
                            <div class="price">$9.99</div>
                            <div class="period">per month</div>
                        </div>

                        <div 
                            class="plan-card featured"
                            :class="{ 'selected': selectedPlan === 'yearly' }"
                            @click="selectedPlan = 'yearly'"
                        >
                            <div class="save-badge">Save 17%</div>
                            <h4>Yearly</h4>
                            <div class="price">$99.99</div>
                            <div class="period">per year</div>
                        </div>
                    </div>

                    <button 
                        class="btn-primary subscribe-btn"
                        @click="handleSubscribe"
                        :disabled="!selectedPlan"
                    >
                        Subscribe Now
                    </button>
                </div>

                <button 
                    class="close-btn"
                    @click="$emit('close')"
                >
                    ✕
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { checkSubscriptionStatus, redirectToSubscription } from '../../utils/subscriptionUtils.js';

export default {
    name: 'SubscriptionPrompt',
    emits: ['close'],
    data() {
        return {
            selectedPlan: null,
            isProcessing: false
        };
    },
    methods: {
        handleSubscribe() {
            if (!this.selectedPlan) return;
            
            this.isProcessing = true;
            
            // Redirect to subscription
            redirectToSubscription(this.selectedPlan);
        }
    }
};
</script>

<style scoped>
.subscription-prompt-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.subscription-prompt {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    position: relative;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.header h3 {
    color: #1f2937;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
}

.header p {
    color: #6b7280;
    margin: 0;
}

.plan-selection h4 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #1f2937;
}

.plan-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
}

.plan-card {
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
}

.plan-card:hover {
    border-color: #00bfa6;
    transform: translateY(-2px);
}

.plan-card.selected {
    border-color: #00bfa6;
    background: #f0fdfa;
}

.plan-card.featured {
    border-color: #00bfa6;
    background: #f0fdfa;
}

.save-badge {
    position: absolute;
    top: -10px;
    right: -10px;
    background: #00bfa6;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: bold;
}

.plan-card h4 {
    margin: 0 0 0.5rem 0;
    color: #1f2937;
}

.price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #00bfa6;
    margin-bottom: 0.25rem;
}

.period {
    color: #6b7280;
    font-size: 0.875rem;
}

.subscribe-btn {
    width: 100%;
    background: #00bfa6;
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
}

.subscribe-btn:hover:not(:disabled) {
    background: #00a896;
}

.subscribe-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6b7280;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background 0.2s;
}

.close-btn:hover {
    background: #f3f4f6;
}
</style>
