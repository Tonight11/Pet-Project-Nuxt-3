<script setup>
	const course = await useCourse();
	definePageMeta({
		middleware: ['auth'],
	});

	const resetErr = async error => {
		await navigateTo('/course');
		error.value = null;
	};

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
				<li v-for="chapter in course.meta.value?.chapters" :key="chapter.slug">
					<span class="font-bold">{{ chapter.title }}</span>
					<template v-if="chapter.lessons">
						<li v-for="lesson in chapter.lessons" :key="lesson.slug">
							<NuxtLink
								class="ml-3 mb-2 block"
								:class="{
									'lesson__link-active':
										`/course/chapter/${chapter.slug}/lesson/${lesson.slug}` ===
										$route.fullPath,
								}"
								:to="`/course/chapter/${chapter.slug}/lesson/${lesson.slug}`"
								>{{ lesson.title }}</NuxtLink
							>
						</li>
					</template>
				</li>
				<!-- All the lessons for the course listed here -->
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
</style>
