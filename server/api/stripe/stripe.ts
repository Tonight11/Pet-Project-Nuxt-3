import stripe from 'stripe';
const config = useRuntimeConfig();
const Stripe = stripe(config.secretKey);

export default Stripe;
