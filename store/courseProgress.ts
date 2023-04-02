import { defineStore } from 'pinia';
import { CourseProgress } from '~~/types/course';
const user = useSupabaseUser();

interface ChapterPercent {
	[key: string]: number | string;
}

export const useCourseProgressStore = defineStore('courseProgress', () => {
	const progress = ref<CourseProgress>({});
	const initialized = ref(false);

	async function initialize() {
		if (initialized.value && user.value) return;
		initialized.value = true;

		const { data: userProgress } = await useFetch<CourseProgress>(
			'/api/user/progress',
			{
				headers: useRequestHeaders(['cookie']) as Record<string, string>,
			}
		);

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

	const percentProgress = computed(() => {
		const chapters = ref<ChapterPercent>({});
		Object.keys(progress.value).map(chapter => {
			const lessons = Object.values(progress.value[chapter]);
			const lessonCompleted = lessons.filter(lesson => lesson);

			chapters.value = {
				...chapters.value,
				[chapter]: Number(
					(lessonCompleted.length / lessons.length) * 100
				).toFixed(0),
			};
		});

		const totalLessons = Object.values(progress.value).reduce(
			(total, chapter) => {
				return total + Object.values(chapter).length;
			},
			0
		);
		const totalLessonsCompleted = Object.values(progress.value).reduce(
			(total, chapter) => {
				return total + Object.values(chapter).filter(lesson => lesson).length;
			},
			0
		);

		const course = Number((totalLessonsCompleted / totalLessons) * 100).toFixed(
			0
		);

		return {
			chapters,
			course,
		};
	});

	return { progress, toggleProgress, initialize, percentProgress, initialized };
});
