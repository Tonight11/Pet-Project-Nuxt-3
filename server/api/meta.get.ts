import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const lessonSelect = Prisma.validator<Prisma.LessonArgs>()({
	select: {
		title: true,
		slug: true,
		number: true,
	},
});

export type LessonNeeded = Prisma.LessonGetPayload<typeof lessonSelect> & {
	path: string;
};

const chapterSelect = Prisma.validator<Prisma.ChapterArgs>()({
	select: {
		title: true,
		slug: true,
		number: true,
		lessons: lessonSelect,
	},
});

// export type ChapterNeeded = Prisma.ChapterGetPayload<typeof chapterSelect>;
export type ChapterNeeded = Omit<
	Prisma.ChapterGetPayload<typeof chapterSelect>,
	'lessons'
> & {
	lessons: LessonNeeded[];
};
const courseSelect = Prisma.validator<Prisma.CourseArgs>()({
	select: {
		title: true,
		chapters: chapterSelect,
	},
});

// export type CourseNeeded = Prisma.CourseGetPayload<typeof courseSelect>;
export type CourseNeeded = Omit<
	Prisma.CourseGetPayload<typeof courseSelect>,
	'chapters'
> & {
	chapters: ChapterNeeded[];
};

export default defineEventHandler(async () => {
	const courseNeeded = await prisma.course.findFirst(courseSelect);

	if (!courseNeeded) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Course not found',
		});
	}

	const chapters = courseNeeded.chapters.map(chapter => {
		const lesson = chapter.lessons.map(lesson => {
			return {
				...lesson,
				path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
			};
		});
		return {
			...chapter,
			lesson,
		};
	});
	console.log(chapters);
	return {
		...courseNeeded,
		chapters,
	};
});
