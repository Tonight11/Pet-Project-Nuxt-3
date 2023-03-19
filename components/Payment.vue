<template>
	<UIModal @close="$emit('close')">
		<div class="bg-slate-200 p-8 rounded-xl w-full max-w-2xl">
			<form>
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
				>
					<div>Pay $97</div>
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
</script>

<style>
	.stripe-card {
		background: white;
		padding: 20px;
	}
</style>
