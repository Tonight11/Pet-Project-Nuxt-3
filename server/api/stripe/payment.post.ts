import { PrismaClient } from '@prisma/client';
import Stripe from './stripe';

const prisma = new PrismaClient();

export default defineEventHandler(async event => {
	const { email } = await readBody(event);
	let response;

	try {
		response = await Stripe.paymentIntents.create({
			amount: 97 * 100,
			currency: 'usd',
			metadata: {
				email,
			},
		});
	} catch (e) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Error! Try later or text to support',
		});
	}

	try {
		await prisma.coursePayment.create({
			data: {
				email: email,
				paymentId: response.id,
				courseId: 1,
			},
		});
	} catch (e) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Error! Try later or text to support',
		});
	}

	return response.client_secret;
});
