<script setup>
	import { useCourseProgressStore } from '~~/store/courseProgress';
	const { initialize } = useCourseProgressStore();
	initialize();
	useHead({
		title: 'Home Page',
		meta: [
			{
				name: 'description',
				content: 'This is a home page. Nothing interesting',
			},
		],
	});
</script>

<template>
	<div class="main">
		<h2>main page</h2>
	</div>
</template>

<style lang="scss" scoped></style>
