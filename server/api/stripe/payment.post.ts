import Stripe from './stripe';
export default defineEventHandler(async event => {
	const { email } = await readBody(event);

	const response = await Stripe.paymentIntents.create({
		amount: 97 * 100,
		currency: 'usd',
		metadata: {
			email,
		},
	});
	return response.client_secret;
});
