import Stripe from "stripe";
import { db } from "./db.server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Create a Stripe checkout session for subscription
 * @param {Object} options - Options for creating the checkout session
 * @returns {Promise<Object>} - The created checkout session
 */
export async function createCheckoutSession({
  userId,
  plan,
  successUrl,
  cancelUrl,
}) {
  // Get the price ID based on the plan
  const priceId = getPriceIdForPlan(plan);
  
  // Create the checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    client_reference_id: userId,
    metadata: {
      userId,
      plan,
    },
  });
  
  return session;
}

/**
 * Handle Stripe webhook events
 * @param {Object} event - The Stripe webhook event
 * @returns {Promise<void>}
 */
export async function handleWebhookEvent(event) {
  switch (event.type) {
    case "checkout.session.completed":
      return handleCheckoutSessionCompleted(event.data.object);
    
    case "customer.subscription.updated":
      return handleSubscriptionUpdated(event.data.object);
    
    case "customer.subscription.deleted":
      return handleSubscriptionDeleted(event.data.object);
    
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
}

/**
 * Handle checkout.session.completed event
 * @param {Object} session - The checkout session
 * @returns {Promise<void>}
 */
async function handleCheckoutSessionCompleted(session) {
  const { userId, plan } = session.metadata;
  
  // Create or update the subscription in the database
  await db.subscription.upsert({
    where: {
      userId_stripeId: {
        userId,
        stripeId: session.subscription,
      },
    },
    update: {
      status: "active",
      plan,
    },
    create: {
      userId,
      stripeId: session.subscription,
      status: "active",
      plan,
    },
  });
  
  // Update the user's subscription tier
  await db.user.update({
    where: { id: userId },
    data: { subscriptionTier: plan },
  });
}

/**
 * Handle customer.subscription.updated event
 * @param {Object} subscription - The subscription object
 * @returns {Promise<void>}
 */
async function handleSubscriptionUpdated(subscription) {
  // Find the subscription in the database
  const dbSubscription = await db.subscription.findFirst({
    where: { stripeId: subscription.id },
  });
  
  if (!dbSubscription) {
    console.log(`Subscription not found: ${subscription.id}`);
    return;
  }
  
  // Update the subscription status
  await db.subscription.update({
    where: { id: dbSubscription.id },
    data: {
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  });
  
  // If the subscription is no longer active, update the user's tier
  if (subscription.status !== "active") {
    await db.user.update({
      where: { id: dbSubscription.userId },
      data: { subscriptionTier: "basic" },
    });
  }
}

/**
 * Handle customer.subscription.deleted event
 * @param {Object} subscription - The subscription object
 * @returns {Promise<void>}
 */
async function handleSubscriptionDeleted(subscription) {
  // Find the subscription in the database
  const dbSubscription = await db.subscription.findFirst({
    where: { stripeId: subscription.id },
  });
  
  if (!dbSubscription) {
    console.log(`Subscription not found: ${subscription.id}`);
    return;
  }
  
  // Update the subscription status
  await db.subscription.update({
    where: { id: dbSubscription.id },
    data: {
      status: "canceled",
    },
  });
  
  // Update the user's subscription tier
  await db.user.update({
    where: { id: dbSubscription.userId },
    data: { subscriptionTier: "basic" },
  });
}

/**
 * Get the Stripe price ID for a plan
 * @param {string} plan - The plan name
 * @returns {string} - The Stripe price ID
 */
function getPriceIdForPlan(plan) {
  switch (plan) {
    case "basic":
      return process.env.STRIPE_BASIC_PRICE_ID;
    case "premium":
      return process.env.STRIPE_PREMIUM_PRICE_ID;
    default:
      throw new Error(`Invalid plan: ${plan}`);
  }
}

/**
 * Get a customer's subscription
 * @param {string} userId - The user ID
 * @returns {Promise<Object|null>} - The subscription or null
 */
export async function getSubscription(userId) {
  return db.subscription.findFirst({
    where: { userId, status: "active" },
  });
}

/**
 * Cancel a subscription
 * @param {string} subscriptionId - The subscription ID
 * @returns {Promise<Object>} - The canceled subscription
 */
export async function cancelSubscription(subscriptionId) {
  // Cancel the subscription in Stripe
  const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId);
  
  // Update the subscription in the database
  await db.subscription.update({
    where: { stripeId: subscriptionId },
    data: {
      status: "canceled",
    },
  });
  
  return canceledSubscription;
}

