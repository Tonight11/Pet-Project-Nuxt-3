<script setup lang="ts">
	interface Type {
		color: string;
	}
	withDefaults(defineProps<Type>(), {
		color: 'bg-blue-600',
	});
</script>

<template>
	<span
		class="-left-12 text-xl w-8 h-8 text-white rounded-full inline-flex absolute items-center justify-center mr-4"
		:class="`${color}`"
	>
		<slot>&#10003;</slot>
	</span>
</template>

<style lang="scss" scoped></style>
