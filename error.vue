<script setup>
	const error = useError();

	const clearErr = () => {
		clearError({
			redirect: '/',
		});
	};
</script>

<template>
	<NuxtLayout>
		<h1 v-if="error.statusCode">{{ error.statusCode }}</h1>
		<span v-if="error.message">{{ error.message }}</span>

		<button
			@click="clearErr"
			class="block rounded font-bold py-2 px-4 cursor-pointer bg-[#1785e5]"
		>
			Go Back Homepage
		</button>
	</NuxtLayout>
</template>

<style lang="scss" scoped></style>
