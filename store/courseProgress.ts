import { defineStore, acceptHMRUpdate } from 'pinia';

export const useCourseProgressStore = defineStore('courseProgress', () => {
	const progress = useLocalStorage<any>('progress', {});
	const initialized = ref(false);

	async function initialize() {
		if (initialized.value) return;
		initialized.value = true;

		const { data: userProgress } = await useFetch('/api/user/progress', {
			headers: useRequestHeaders(['cookie']),
		});

		if (userProgress.value) {
			progress.value = userProgress.value;
		}
	}

	const toggleProgress = async (chapter: string, lesson: string) => {
		const user = useSupabaseUser();
		if (!user.value) return;

		if (!chapter || !lesson) {
			const {
				params: { chapterSlug, lessonSlug },
			} = useRoute();
			chapter = chapterSlug as string;
			lesson = lessonSlug as string;
		}

		const currentProgress = progress.value[chapter]?.[lesson];

		progress.value[chapter] = {
			...progress.value[chapter],
			[lesson]: !currentProgress,
		};
		try {
			await $fetch(`/api/course/chapter/${chapter}/lesson/${lesson}/progress`, {
				method: 'POST',
				body: {
					completed: !currentProgress,
				},
			});
		} catch (error) {
			console.error(error);
			progress.value[chapter] = {
				...progress.value[chapter],
				[lesson]: currentProgress,
			};
		}
	};

	return { progress, toggleProgress, initialized, initialize };
});

if (import.meta.hot) {
	import.meta.hot.accept(
		acceptHMRUpdate(useCourseProgressStore, import.meta.hot)
	);
}
