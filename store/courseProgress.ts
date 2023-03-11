import { defineStore, acceptHMRUpdate } from 'pinia';

export const useCourseProgressStore = defineStore('courseProgress', () => {
	const progress = useLocalStorage('progress', {} as any);

	const toggleProgress = async (chapter: string, lesson: string) => {
		const user = useSupabaseUser();
		const {
			params: { chapterSlug, lessonSlug },
		} = useRoute();
		if (!user.value) return;

		if (!chapter || !lesson) {
			chapter = chapterSlug as string;
			lesson = lessonSlug as string;
		}

		const currentProgress = progress.value[chapter]?.[lesson];

		try {
			progress.value[chapter] = {
				...progress.value[chapter],
				[lesson]: !currentProgress,
			};
			await $fetch(
				`/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}/progress`,
				{
					method: 'POST',
					body: {
						completed: !currentProgress,
					},
				}
			);
		} catch (error) {
			console.error(error);
			progress.value[chapter] = {
				...progress.value[chapter],
				[lesson]: currentProgress,
			};
		}
	};

	return { progress, toggleProgress };
});

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useCourseProgressStore, import.meta.hot)
	);
}
