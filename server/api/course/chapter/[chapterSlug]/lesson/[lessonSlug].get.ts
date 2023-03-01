import course from '~~/server/courseData';
import { Chapter, Lesson, Course, LessonWithPath } from '~~/types/course';

course as Course;
export default defineEventHandler((event): LessonWithPath => {
	const { chapterSlug, lessonSlug } = event.context.params;

	const chapter: Chapter | undefined = course.chapters.find(
		item => item.slug === chapterSlug
	);
	if (!chapter) {
		throw createError({
			statusCode: 404,
			message: 'Chapter not found',
		});
	}

	const lesson: Lesson | undefined = chapter?.lessons.find(
		item => item.slug === lessonSlug
	);

	if (!lesson) {
		throw createError({
			statusCode: 404,
			message: 'Lesson not found',
		});
	}
	return {
		...lesson,
		path: `/course/chapter/${chapterSlug}/lesson/${lessonSlug}`,
	};
});
