import courseData from './courseData';
import { Lesson, Chapter, Course, LessonWithPath } from '~~/types/course';

courseData as Course;
export const useCourse = () => {
	const route = useRoute();

	const title = computed<string>(() => {
		return courseData.title;
	});

	const chapter = computed<Chapter | undefined>(() => {
		return courseData.chapters.find(
			item => item.slug === route.params.chapterSlug
		);
	});

	const lesson = computed<Lesson | undefined>(() => {
		return chapter.value?.lessons.find(
			item => item.slug === route.params.lessonSlug
		);
	});

	const data: Chapter[] = courseData.chapters.map((chapterItem: Chapter) => {
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
