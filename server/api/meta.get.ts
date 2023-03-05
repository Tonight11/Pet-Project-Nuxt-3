import { Course, Chapter } from '~~/types/course';
import { mainMeta, neededChapter, neededLessons } from '~~/types/course';
import course from '../courseData';

course as Course;

export default defineEventHandler((): mainMeta => {
	const chapters: neededChapter[] = course.chapters.reduce(
		(prev: neededChapter[], next: Chapter) => {
			const lessons: neededLessons[] = next.lessons.map(item => {
				return {
					title: item.title,
					slug: item.slug,
					number: item.number,
					path: `/course/chapter/${next.slug}/lesson/${item.slug}`,
				};
			});
			const chapter: neededChapter = {
				title: next.title,
				slug: next.slug,
				number: next.number,
				lessons,
			};

			return [...prev, chapter];
		},
		[]
	);

	return {
		title: course.title,
		chapters,
	};
});
