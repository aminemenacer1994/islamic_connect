<template>
    <!-- <div>
        <h2>Payment Methods</h2>
        <ul>
            <li v-for="method in paymentMethods" :key="method.id">
                {{ method.brand }} ending in {{ method.last4 }}
            </li>
        </ul>
        <button @click="fetchPaymentMethods">Refresh Payment Methods</button>
    </div> -->
</template>

<script>
export default {
    data() {
        return {
            paymentMethods: [],
        };
    },
    mounted() {
        this.fetchPaymentMethods(); // Initial fetch
        this.pollPaymentMethods(); // Optional polling
    },
    methods: {
        fetchPaymentMethods() {
            axios.get('/api/payment-methods')
                .then(response => {
                    this.paymentMethods = response.data;
                })
                .catch(error => {
                    console.error('Error fetching payment methods:', error);
                });
        },
        pollPaymentMethods() {
            // Poll every 30 seconds (adjust as needed)
            setInterval(() => {
                this.fetchPaymentMethods();
            }, 30000);
        },
    },
};
</script>