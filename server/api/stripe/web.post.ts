import { PrismaClient } from '@prisma/client';
import Stripe from './stripe';

const prisma = new PrismaClient();
const secretKey = useRuntimeConfig().stripeWebhookSecret;

interface PaymentIntent {
	id: string;
}

export default defineEventHandler(async event => {
	const signature = getHeader(event, 'stripe-signature');
	const body = await readRawBody(event);

	let stripeEvent;
	try {
		stripeEvent = await Stripe.webhooks.constructEvent(
			body,
			signature,
			secretKey
		);
	} catch (error) {
		console.error(error);
		throw createError({
			statusCode: 400,
			statusMessage: 'Invalid signature',
		});
	}

	console.log(stripeEvent.type);

	if (stripeEvent.type === 'payment_intent.succeeded') {
		await handlePaymentIntentSucceeded(stripeEvent.data.object);
	} else if (stripeEvent.type === 'payment_intent.payment_failed') {
		await handlePaymentIntentFailed(stripeEvent.data.object);
	}

	return 200;
});

const handlePaymentIntentSucceeded = async (paymentIntent: PaymentIntent) => {
	try {
		await prisma.coursePayment.update({
			where: {
				paymentId: paymentIntent.id,
			},
			data: {
				verifed: true,
			},
		});
	} catch (e) {
		// console.log('succ: ', e);
		throw createError({
			statusCode: 500,
			statusMessage: 'Error verifying purchase',
		});
	}
};

const handlePaymentIntentFailed = async (paymentIntent: PaymentIntent) => {
	try {
		await prisma.coursePayment.delete({
			where: {
				paymentId: paymentIntent.id,
			},
		});
	} catch (e) {
		// console.log('fail: ', e);
		throw createError({
			statusCode: 500,
			statusMessage: 'Error removing purchase',
		});
	}
};
