<script setup>
	const course = useCourse();

	const progress = useLocalStorage('progress', []);

	const isLessonCompleted = computed(() => {
		if (!progress.value[course.chapter.value.number - 1]) {
			return false;
		}

		if (
			!progress.value[course.chapter.value.number - 1][
				course.lesson.value.number - 1
			]
		) {
			return false;
		}

		return progress.value[course.chapter.value.number - 1][
			course.lesson.value.number - 1
		];
	});

	const toggleComplete = () => {
		if (!progress.value[course.chapter.value.number - 1]) {
			progress.value[course.chapter.value.number - 1] = [];
		}

		progress.value[course.chapter.value.number - 1][
			course.lesson.value.number - 1
		] = !isLessonCompleted.value;
	};

	useHead({
		title: `${course.chapter.value.slug} - ${course.lesson.value.slug}`,
	});
</script>

<template>
	<p class="mb-2 uppercase font-bold text-state-400">
		lesson {{ course.chapter.value.number }} - {{ course.lesson.value.number }}
	</p>
	<h2 class="m-0 mb-1">{{ course.courseData.title }}</h2>
	<div class="flex flex-col">
		<NuxtLink
			:to="course.lesson.value.sourceUrl"
			v-if="course.lesson.value.sourceUrl"
			>Video</NuxtLink
		>
		<NuxtLink
			:to="course.lesson.value.downloadUrl"
			v-if="course.lesson.value.downloadUrl"
			>Donwload Video</NuxtLink
		>
	</div>

	<VideoPlayer
		v-if="course.lesson.value.videoId"
		:video-id="course.lesson.value.videoId"
	/>
	<p class="m-0 mb-2">{{ course.lesson.value.text }}</p>
	<ListCompleteButton
		:model-value="isLessonCompleted"
		@update:model-value="toggleComplete"
	/>
</template>

<style lang="scss" scoped></style>