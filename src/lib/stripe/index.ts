import Stripe from 'stripe';

// Get the Stripe API key from environment variables
const stripeApiKey = process.env.STRIPE_SECRET_KEY;

// Initialize Stripe with the secret key from environment variables
export const stripe = stripeApiKey 
  ? new Stripe(stripeApiKey, {
      apiVersion: '2025-02-24.acacia', // Use the same API version as before
    })
  : null as unknown as Stripe; // Type assertion for compatibility

// Define the available price IDs for our subscription plans
export const PRICE_IDS = {
  FREE: 'price_free', // This is just a placeholder as free plans don't have a Stripe price
  PRO: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_placeholder',
  ENTERPRISE: process.env.STRIPE_ENTERPRISE_PRICE_ID || 'price_enterprise_placeholder',
};

// Define the subscription plans
export const PLANS = {
  FREE: {
    name: 'Free',
    description: 'For personal projects and testing',
    priceId: PRICE_IDS.FREE,
    price: 0,
    features: [
      '100 records per day',
      'Basic data types',
      'JSON export',
      'Community support',
    ],
    limits: {
      recordsPerDay: 100,
      dataTypes: ['basic'],
      exportFormats: ['json'],
    },
  },
  PRO: {
    name: 'Pro',
    description: 'For professionals and small teams',
    priceId: PRICE_IDS.PRO,
    price: 19,
    features: [
      '10,000 records per day',
      'All data types',
      'JSON, CSV, SQL exports',
      'API access',
      'Basic AI generation',
      'Email support',
    ],
    limits: {
      recordsPerDay: 10000,
      dataTypes: ['all'],
      exportFormats: ['json', 'csv', 'sql'],
      apiAccess: true,
      aiGeneration: 'basic',
    },
  },
  ENTERPRISE: {
    name: 'Enterprise',
    description: 'For large teams and organizations',
    priceId: PRICE_IDS.ENTERPRISE,
    price: 49,
    features: [
      'Unlimited records',
      'All data types',
      'All export formats',
      'Advanced API access',
      'Advanced AI generation',
      'Custom templates',
      'Priority support',
    ],
    limits: {
      recordsPerDay: Infinity,
      dataTypes: ['all'],
      exportFormats: ['all'],
      apiAccess: true,
      aiGeneration: 'advanced',
      customTemplates: true,
    },
  },
};

// Helper function to create a checkout session
export async function createCheckoutSession({
  priceId,
  customerId,
  successUrl,
  cancelUrl,
}: {
  priceId: string;
  customerId?: string;
  successUrl: string;
  cancelUrl: string;
}) {
  // Check if Stripe is properly initialized
  if (!stripeApiKey) {
    console.error('Stripe API key is not configured');
    throw new Error('Stripe API key is not configured');
  }

  try {
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return { sessionId: session.id };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

// Helper function to create a customer portal session
export async function createCustomerPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}) {
  // Check if Stripe is properly initialized
  if (!stripeApiKey) {
    console.error('Stripe API key is not configured');
    throw new Error('Stripe API key is not configured');
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return { url: session.url };
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    throw error;
  }
}

// Helper function to handle webhook events
export async function handleWebhookEvent(event: Stripe.Event) {
  // Check if Stripe is properly initialized
  if (!stripeApiKey) {
    console.error('Stripe API key is not configured');
    return { received: true }; // Return success to avoid retries
  }

  const { type, data } = event;

  switch (type) {
    case 'checkout.session.completed': {
      const session = data.object as Stripe.Checkout.Session;
      // Handle successful checkout
      console.log('Checkout completed:', session);
      // Here you would update your database to reflect the new subscription
      break;
    }
    case 'customer.subscription.created': {
      const subscription = data.object as Stripe.Subscription;
      // Handle new subscription
      console.log('Subscription created:', subscription);
      break;
    }
    case 'customer.subscription.updated': {
      const subscription = data.object as Stripe.Subscription;
      // Handle subscription update
      console.log('Subscription updated:', subscription);
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = data.object as Stripe.Subscription;
      // Handle subscription cancellation
      console.log('Subscription deleted:', subscription);
      break;
    }
    default:
      console.log(`Unhandled event type: ${type}`);
  }

  return { received: true };
} 