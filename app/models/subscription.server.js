import { db } from "~/utils/db.server";
import { 
  createCheckoutSession, 
  getSubscription as getStripeSubscription,
  cancelSubscription as cancelStripeSubscription
} from "~/utils/stripe.server";

/**
 * Create a checkout session for subscription
 * @param {Object} options - Options for creating the checkout session
 * @returns {Promise<Object>} - The created checkout session
 */
export async function createSubscriptionCheckout({
  userId,
  plan,
  successUrl,
  cancelUrl,
}) {
  return createCheckoutSession({
    userId,
    plan,
    successUrl,
    cancelUrl,
  });
}

/**
 * Get a user's subscription
 * @param {string} userId - User ID
 * @returns {Promise<Object|null>} - The subscription or null
 */
export async function getUserSubscription(userId) {
  return db.subscription.findFirst({
    where: {
      userId,
      status: "active",
    },
  });
}

/**
 * Cancel a user's subscription
 * @param {string} userId - User ID
 * @returns {Promise<Object|null>} - The canceled subscription or null
 */
export async function cancelUserSubscription(userId) {
  const subscription = await getUserSubscription(userId);
  
  if (!subscription || !subscription.stripeId) {
    return null;
  }
  
  // Cancel the subscription in Stripe
  await cancelStripeSubscription(subscription.stripeId);
  
  // Update the subscription in the database
  return db.subscription.update({
    where: { id: subscription.id },
    data: {
      status: "canceled",
    },
  });
}

/**
 * Check if a user has an active subscription
 * @param {string} userId - User ID
 * @returns {Promise<boolean>} - Whether the user has an active subscription
 */
export async function hasActiveSubscription(userId) {
  const subscription = await getUserSubscription(userId);
  return !!subscription;
}

/**
 * Get subscription plans
 * @returns {Array<Object>} - List of subscription plans
 */
export function getSubscriptionPlans() {
  return [
    {
      id: "basic",
      name: "Basic",
      price: 5,
      features: [
        "Create up to 3 galleries",
        "Upload up to 50 photos per gallery",
        "Basic templates",
        "Standard image quality",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: 10,
      features: [
        "Unlimited galleries",
        "Unlimited photos per gallery",
        "All premium templates",
        "High-resolution image quality",
        "Custom domain support",
        "Priority support",
      ],
    },
  ];
}

/**
 * Get a subscription plan by ID
 * @param {string} planId - Plan ID
 * @returns {Object|null} - The plan or null
 */
export function getSubscriptionPlanById(planId) {
  const plans = getSubscriptionPlans();
  return plans.find(plan => plan.id === planId) || null;
}

