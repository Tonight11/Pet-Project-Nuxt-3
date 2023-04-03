<script setup>
	import { useCourseProgressStore } from '~~/store/courseProgress';
	import { storeToRefs } from 'pinia';

	const user = useSupabaseUser();
	const course = await useCourse();
	const { initialize } = useCourseProgressStore();
	const { percentProgress } = storeToRefs(useCourseProgressStore());
	initialize();

	const resetErr = async error => {
		await navigateTo('/course');
		error.value = null;
	};

	definePageMeta({
		middleware: ['auth'],
	});
	useHead({
		title: `Pet Nuxt 3`,
	});
</script>

<template>
	<div>
		<UserCard />
		<div class="flex flex-row justify-center flex-grow">
			<div
				class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] max-w-[30ch] flex flex-col"
			>
				<h3 class="mb-2">Chapters</h3>
				<div class="percent" v-if="percentProgress && user">
					<div
						class="percent__item"
						:style="{
							transform: `scaleX(${(percentProgress.course / 100).toString()})`,
						}"
					></div>
					<span
						>{{
							isNaN(percentProgress.course) ? 0 : percentProgress.course
						}}%</span
					>
				</div>
				<li v-for="chapter in course.meta.value?.chapters" :key="chapter.slug">
					<span class="font-bold">{{ chapter.title }} </span>
					<span class="ml-5 text-lime-600" v-if="percentProgress && user"
						>{{
							isNaN(percentProgress.chapters.value[chapter.slug])
								? 0
								: percentProgress.chapters.value[chapter.slug]
						}}%</span
					>
					<template v-if="chapter.lessons">
						<li v-for="lesson in chapter.lessons" :key="lesson.slug">
							<NuxtLink
								class="ml-3 mb-2 block"
								:class="{
									'lesson__link-active': lesson.path === $route.fullPath,
								}"
								:to="lesson.path"
								>{{ lesson.title }}</NuxtLink
							>
						</li>
					</template>
				</li>
			</div>

			<div class="prose p-12 bg-white rounded-md w-[65ch]">
				<div class="select" v-if="!$route.params.lessonSlug">Select Lesson</div>
				<NuxtErrorBoundary>
					<NuxtPage />
					<template #error="{ error }">
						<h3>Oh no, something went wrong with the lesson!</h3>
						<code>{{ error }}</code>
						<button
							class="block text-white rounded bg-gray-400 font-bold py-2 px-4 cursor-pointer"
							@click="resetErr(error)"
						>
							reset error
						</button>
					</template>
				</NuxtErrorBoundary>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.lesson__link-active {
		color: rgb(72, 115, 255);
	}

	.percent {
		margin: 10px 0;
		border: 1px solid black;
		width: 100%;
		text-align: center;
		position: relative;
		height: 25px;
		&__item {
			background-color: rgb(0, 158, 21);
			width: 100%;
			height: 100%;
			transform-origin: left;
			transition: all 0.3s linear;
		}

		& span {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>
