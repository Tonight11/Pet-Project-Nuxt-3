<script setup>
	const course = useCourse();

	useHead({
		title: `Pet Nuxt 3`,
	});
</script>

<template>

		<div class="prose mb-12">
			<h1>
				<span class="font-medium">
					<span class="font-bold">Pet-project Nuxt 3</span>
				</span>
			</h1>
		</div>

		<div class="flex flex-row justify-center flex-grow">
			<div
				class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] max-w-[30ch] flex flex-col"
			>
				<h3 class="mb-2">Chapters</h3>
				<li v-for="chapter in course.linkPath">
					<span class="font-bold">{{ chapter.title }}</span>
					<template v-if="chapter.lessons">
						<li v-for="lesson in chapter.lessons">
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
				<!-- All the lessons for the course listed here -->
			</div>

			<div class="prose p-12 bg-white rounded-md w-[65ch]">
				<div class="select" v-if="!course.lesson.value">Select Lesson</div>
				<NuxtPage />
			</div>
		</div>
</template>

<style lang="scss" scoped>
	.lesson__link-active {
		color: rgb(72, 115, 255);
	}
</style>
