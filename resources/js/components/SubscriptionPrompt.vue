<template>
    <div class="subscription-prompt">
        <div class="prompt-dialog">
            <div class="prompt-content">
                <h3>Premium Feature</h3>
                
                <div v-if="!isLoggedIn" class="login-required">
                    <p>Please log in or create an account to access premium features.</p>
                    <div class="auth-buttons">
                        <button 
                            class="btn-primary"
                            @click="redirectToLogin"
                        >
                            Log In
                        </button>
                        <button 
                            class="btn-secondary"
                            @click="redirectToRegister"
                        >
                            Create Account
                        </button>
                    </div>
                </div>

                <div v-else class="plan-selection">
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

export default {

    data() {
        return {
            selectedPlan: null,
            isLoggedIn: !!localStorage.getItem('userId')
        };
    },

    methods: {
        redirectToLogin() {
            sessionStorage.setItem('returnUrl', window.location.href);
            window.location.href = '/login';
        },

        redirectToRegister() {
            sessionStorage.setItem('returnUrl', window.location.href);
            window.location.href = '/register';
        },
    }
};
</script> 