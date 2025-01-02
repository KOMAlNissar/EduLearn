import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async ({ amount, currency = 'usd' }) => {
  return stripe.paymentIntents.create({
    amount,
    currency,
  });
};