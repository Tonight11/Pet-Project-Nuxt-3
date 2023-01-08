<script lang="ts" setup>
	const props = defineProps(['videoId']);
</script>

<template>
	<iframe
		width="560"
		height="315"
		:src="`https://player.vimeo.com/video/${props.videoId}`"
		title="Video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
		class="video-player"
	></iframe>
</template>

<style scoped>
.video-player {
	width: 100%;
}
</style>
