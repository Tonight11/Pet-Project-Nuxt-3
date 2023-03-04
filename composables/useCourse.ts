import { Lesson, Chapter, Course, LessonWithPath } from '~~/types/course';
import useFetchWithCache from './useFetchWithCache';

export const useCourse = async () => {
	const url = `/api/meta`;
	const course = await useFetchWithCache<Course>(url);
	const route = useRoute();

	const title = computed<string>(() => {
		return course.value.title;
	});

	const chapter = computed<Chapter | undefined>(() => {
		return course.value.chapters.find(
			item => item.slug === route.params.chapterSlug
		);
	});

	const lesson = computed<Lesson | undefined>(() => {
		return chapter.value?.lessons.find(
			item => item.slug === route.params.lessonSlug
		);
	});

	const data: Chapter[] = course.value.chapters.map((chapterItem: Chapter) => {
		const lessons: LessonWithPath[] = chapterItem.lessons.map(
			(lessonItem: Lesson) => {
				return {
					...lessonItem,
					path: `/course/chapter/${chapterItem.slug}/lesson/${lessonItem.slug}`,
				};
			}
		);
		return {
			...chapterItem,
			lessons,
		};
	});

	return {
		chapter,
		lesson,
		data,
		title,
	};
};
