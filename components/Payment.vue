<template>
	<UIModal @close="$emit('close')">
		<div class="bg-slate-200 p-8 rounded-xl w-full max-w-2xl">
			<div
				v-if="success"
				class="flex flex-col justify-center items-center space-y-6"
			>
				<h2 class="text-xl font-bold">Thanks for buying the course!</h2>
				<button
					@click=""
					class="mt-4 w-full text-md text-black h-12 px-16 rounded focus:outline-none focus:shadow-outline flex items-center justify-center transition bg-blue-300 hover:bg-blue-200"
				>
					Login with Github to access
				</button>
			</div>
			<form v-else @submit.prevent="handleSubmit">
				<h2 class="font-bold text-xl text-center">
					Buying {{ course.meta.value.title }}
				</h2>
				<div class="mt-8 text-base width bg-white py-6 px-8 rounded shadow-md">
					<div class="w-full flex justify-between items-center">
						<label class="font-bold"> Email </label>
						<input
							class="input ml-6 focus:outline-none text-left w-full"
							type="email"
							autocomplete="email"
							v-model="email"
							placeholder="your@email.com"
							required
						/>
					</div>
				</div>
				<div class="stripe-card"></div>

				<button
					class="font-sans mt-4 w-full text-lg text-black h-12 px-16 rounded focus:outline-none focus:shadow-outline font-bold flex items-center justify-center transition bg-yellow-300 hover:bg-yellow-200 cursor-pointer"
					:class="{
						'bg-gray-300 cursor-not-allowed': payProcess || email === '',
						'bg-yellow-300 hover:bg-yellow-200 cursor-pointer':
							!payProcess || email,

						'bg-red-600': error,
					}"
					:disabled="payProcess || email === ''"
				>
					<UILoading v-if="payProcess" class="h-5 w-5" />
					<div v-else>Pay $97</div>
				</button>
			</form>
		</div>
	</UIModal>
</template>

<script setup lang="ts">
	import { loadStripe } from '@stripe/stripe-js';
	const course = await useCourse();
	const email = ref('');
	const config = useRuntimeConfig();
	const stripe = ref();
	const stripeCard = ref();
	const payProcess = ref(false);
	const success = ref(false);
	const error = ref(false);

	const elements = computed(() => stripe.value?.elements());
	const formStyle = {
		base: {
			fontSize: '16px',
			color: '#3d4852',
			'::placeholder': {
				color: '#8795a1',
			},
		},
	};
	onMounted(async () => {
		stripe.value = await loadStripe(config.public.stripeKey);

		if (!stripeCard.value && elements.value) {
			stripeCard.value = elements.value.create('card', {
				style: formStyle,
			});
			stripeCard.value.mount('.stripe-card');
		}
	});

	const handleSubmit = async () => {
		if (!email.value) {
			return;
		}
		let secret;
		payProcess.value = true;

		try {
			const response = await $fetch('/api/stripe/pay1ment', {
				method: 'POST',
				body: { email: email.value },
			});
			secret = response;
		} catch (err) {
			error.value = true;
			console.log(err);
		}

		try {
			const response = await stripe.value.confirmCardPayment(secret, {
				payment_method: {
					card: stripeCard.value,
				},
				receipt_email: email.value,
			});

			console.log(response);

			if (response.paymentIntent.status === 'succeeded') {
				success.value = true;
			}
		} catch (err) {
			error.value = true;
			console.log(err);
		} finally {
			payProcess.value = false;
		}
	};
</script>

<style>
	.stripe-card {
		background: white;
		padding: 20px;
	}
</style>
