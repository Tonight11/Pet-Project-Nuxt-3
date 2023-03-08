<script setup>
	const course = await useCourse();
	const route = useRoute();

	const chapter = computed(() => {
		return course.meta.value.chapters.find(
			item => item.slug === route.params.chapterSlug
		);
	});

	const lesson = await useLesson(
		route.params.chapterSlug,
		route.params.lessonSlug
	);
	definePageMeta({
		middleware: [
			// valiidate if page is exist
			async function ({ params }, from) {
				const course = await useCourse();

				const chapter = computed(() => {
					return course.meta.value.chapters.find(
						item => item.slug === params.chapterSlug
					);
				});
				if (!chapter.value) {
					return abortNavigation(
						createError({
							statusCode: 404,
							message: 'Chapter not found',
						})
					);
				}

				const lesson = computed(() => {
					return chapter.value?.lessons.find(
						item => item.slug === params.lessonSlug
					);
				});

				if (!lesson.value) {
					return abortNavigation(
						createError({
							statusCode: 404,
							message: 'Lesson not found',
						})
					);
				}
			},
			'auth',
		],
	});

	// marking lesson as completed

	const progress = useLocalStorage('progress', []);

	const isLessonCompleted = computed(() => {
		if (!progress.value[chapter.value.number - 1]) {
			return false;
		}

		if (!progress.value[chapter.value.number - 1][lesson.value?.number - 1]) {
			return false;
		}

		return progress.value[chapter.value.number - 1][lesson.value?.number - 1];
	});

	const toggleComplete = () => {
		if (lesson.value?.slug === '1-introduction-to-typescript-with-vue-js-3') {
			throw createError('Could not update this lesson');
		}
		if (!progress.value[chapter.value.number - 1]) {
			progress.value[chapter.value.number - 1] = [];
		}
		progress.value[chapter.value.number - 1][lesson.value?.number - 1] =
			!isLessonCompleted.value;
	};

	// meta for seo

	useHead({
		title: `${chapter.value?.slug} - ${lesson.value?.slug}`,
	});
</script>

<template>
	<div>
		<p class="mb-2 uppercase font-bold text-state-400">
			lesson {{ chapter.number }} -
			{{ lesson.number }}
		</p>
		<h2 class="m-0 mb-1">{{ course.meta.value?.title }}</h2>
		<div class="flex flex-col">
			<NuxtLink :to="lesson.sourceUrl" v-if="lesson.sourceUrl">Video</NuxtLink>
			<NuxtLink :to="lesson.downloadUrl" v-if="lesson.downloadUrl"
				>Donwload Video</NuxtLink
			>
		</div>
		<VideoPlayer v-if="lesson.videoId" :video-id="lesson.videoId" />
		<p class="m-0 mb-2">{{ lesson.text }}</p>
		<ListCompleteButton
			:model-value="isLessonCompleted"
			@update:model-value="toggleComplete"
		/>
	</div>
</template>

<style lang="scss" scoped></style>
