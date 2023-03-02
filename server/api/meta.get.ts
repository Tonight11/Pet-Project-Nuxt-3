import { Course, Chapter } from '~~/types/course';
import course from '../courseData';

interface baseNeeded {
	title: string;
	slug: string;
	number: number;
}

interface neededChapter extends baseNeeded {
	lessons: neededLessons[];
}

interface neededLessons extends baseNeeded {
	path: string;
}

interface mainMeta {
	title: string;
	chapters: neededChapter[];
}

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
