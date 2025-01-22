export const subscriptionService = {
  PAYMENT_LINKS: {
    monthly: 'https://buy.stripe.com/dR6fZC0BWd7ubvO8wz',
    yearly: 'https://buy.stripe.com/00g7t63O8d7uczS6os'
  },

  getSubscriptionStatus() {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return { isPremium: false };

      const subData = sessionStorage.getItem(`subData_${userId}`);
      if (!subData) return { isPremium: false };

      const data = JSON.parse(subData);
      const now = new Date();
      const expiryDate = new Date(data.expiryDate);

      if (expiryDate < now) {
        sessionStorage.removeItem(`subData_${userId}`);
        return { isPremium: false };
      }

      return {
        isPremium: true,
        expiryDate: data.expiryDate,
        plan: data.plan
      };
    } catch (error) {
      console.error('Error checking subscription:', error);
      return { isPremium: false };
    }
  },

  redirectToPayment(plan) {
    // Save the return URL before redirecting
    const returnUrl = `${window.location.origin}/quran?status=success&plan=${plan}`;
    sessionStorage.setItem('subscriptionReturnUrl', returnUrl);
    
    window.location.href = this.PAYMENT_LINKS[plan];
  },

  async verifyPayment(sessionId) {
    // In a real application, you should verify the payment with Stripe
    // For now, we'll just return true
    return true;
  },

  activateSubscription(plan, durationInDays) {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('User not logged in');

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + durationInDays);

    const subscriptionData = {
      status: 'active',
      plan: plan,
      expiryDate: expiryDate.toISOString(),
      userId: userId
    };

    sessionStorage.setItem(`subData_${userId}`, JSON.stringify(subscriptionData));
    return true;
  },

  handlePaymentReturn() {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    const sessionId = params.get('session_id');
    const plan = params.get('plan');

    if (status === 'success' && sessionId) {
      return { success: true, sessionId, plan };
    }
    return { success: false };
  }
};
