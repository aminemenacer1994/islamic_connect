<template>
    <div class="subscription-wrapper">
        <!-- Subscription code commented out -->
        <div style="text-align: center; padding: 2rem;">
            <p>Subscription system is currently disabled.</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    console.log('SubscriptionForm: Subscription disabled');
});

// Original script commented out
/*
import { ref, onMounted, computed } from 'vue';
const csrfToken = ...
*/
</script>

<style scoped>
/*
.subscription-wrapper {
    ...
}
*/
</style>
