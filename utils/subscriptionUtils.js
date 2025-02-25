// Helper function to encode data
function encodeData(data) {
  return btoa(JSON.stringify(data));
}

// Helper function to decode data
function decodeData(encodedData) {
  try {
    return JSON.parse(atob(encodedData));
  } catch (error) {
    console.error('Error decoding subscription data:', error);
    return null;
  }
}

// Check subscription status
export function checkSubscriptionStatus() {
  const urlParams = new URLSearchParams(window.location.search);
  const subscriptionType = urlParams.get('subscription'); // Fixed typo
  const timestamp = urlParams.get('timestamp');

  console.log('Query Params:', { subscriptionType, timestamp }); // Debug

  if (subscriptionType && timestamp) {
    // Store subscription status in localStorage with expiration time
    const expirationTime = subscriptionType === 'monthly' ? 30 * 24 * 60 * 60 * 1000 : 365 * 24 * 60 * 60 * 1000; // 30 days or 365 days
    const subscriptionData = {
      type: subscriptionType,
      expiresAt: Date.now() + expirationTime,
    };

    console.log('Storing Subscription Data:', subscriptionData); // Debug

    // Encode subscription data to prevent tampering
    localStorage.setItem('subscriptionData', encodeData(subscriptionData));

    // Clear query parameters from URL
    window.history.replaceState({}, document.title, window.location.pathname);

    // Return success status
    return { success: true, subscriptionType };
  } else {
    // Check localStorage for existing subscription
    const encodedData = localStorage.getItem('subscriptionData');
    if (encodedData) {
      const subscriptionData = decodeData(encodedData);

      console.log('Retrieved Subscription Data:', subscriptionData); // Debug

      // Check if subscription has expired
      if (subscriptionData && subscriptionData.expiresAt > Date.now()) {
        return { success: true, subscriptionType: subscriptionData.type };
      } else {
        localStorage.removeItem('subscriptionData'); // Clear expired subscription
      }
    }
  }

  return { success: false };
}

// Redirect to subscription page
export function redirectToSubscription(type) {
  const successUrl = `${window.location.origin}?subscription=${type}&timestamp=${Date.now()}`;
  const paymentLink = type === 'monthly'
    ? 'https://buy.stripe.com/dR6fZC0BWd7ubvO8wz'
    : 'https://buy.stripe.com/00g7t63O8d7uczS6os';
  window.location.href = `${paymentLink}?success_url=${encodeURIComponent(successUrl)}`;
}