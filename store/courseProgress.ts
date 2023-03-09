import { defineStore, acceptHMRUpdate } from 'pinia';

export const useCourseProgressStore = defineStore('courseProgress', () => {
	const progress = useLocalStorage('progress', {} as any);

	const toggleProgress = (chapter: string, lesson: string) => {
		const user = useSupabaseUser();
		if (!user.value) return;

		if (!chapter || !lesson) {
			const { params } = useRoute();

			chapter = params.chapterSlug as string;
			lesson = params.lessonSlug as string;
		}

		const currentProgress = progress.value[chapter]?.[lesson];

		progress.value[chapter] = {
			...progress.value[chapter],
			[lesson]: !currentProgress,
		};
	};

	return { progress, toggleProgress };
});

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useCourseProgressStore, import.meta.hot)
	);
}
