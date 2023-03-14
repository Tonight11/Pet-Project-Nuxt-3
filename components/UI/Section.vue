<script setup lang="ts">
	interface Title {
		title?: string;
	}
	defineProps<Title>();
</script>

<script lang="ts">
	export default {
		inheritAttrs: false,
	};
</script>

<template>
	<div class="section bg-white p-24 flex flex-col items-center">
		<div class="w-full max-w-4xl">
			<h2 v-if="title" class="text-4xl font-bold pb-8 text-center">
				{{ title }}
			</h2>
			<div v-bind="$attrs">
				<slot />
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.section:nth-of-type(even) {
		@apply bg-blue-500 text-white;
	}
</style>
