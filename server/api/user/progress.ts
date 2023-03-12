import { PrismaClient } from '@prisma/client';
import { serverSupabaseUser } from '#supabase/server';
import { CourseProgress, ChapterProgress } from '~~/types/course';
import { ChapterNeeded, LessonNeeded } from '../meta.get';

const prisma = new PrismaClient();

export default defineEventHandler(async event => {
	const user = await serverSupabaseUser(event);
	if (!user) {
		throw createError({
			statusCode: 401,
			message: 'Unauthorized',
		});
	}
	const email = user.email as string;

	const userProgress = await prisma.progressLesson.findMany({
		where: {
			userEmail: email,
			lesson: {
				Chapter: {
					Course: {
						id: 1,
					},
				},
			},
		},
		select: {
			completed: true,
			lesson: {
				select: {
					slug: true,
					Chapter: {
						select: {
							slug: true,
						},
					},
				},
			},
		},
	});

	const courseNeeded = await $fetch('/api/meta');

	if (!courseNeeded) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Course not found',
		});
	}

	const initialProgress = courseNeeded.chapters.reduce(
		(courseProgress: CourseProgress, chapter: ChapterNeeded) => {
			courseProgress[chapter.slug] = chapter.lessons.reduce(
				(lessonProgress: ChapterProgress, lesson: LessonNeeded) => {
					lessonProgress[lesson.slug] =
						userProgress.find(progress => {
							return (
								progress.lesson.slug == lesson.slug &&
								progress.lesson.Chapter.slug == chapter.slug
							);
						})?.completed || false;
					return lessonProgress;
				},
				{}
			);
			return courseProgress;
		},
		{}
	);
	return initialProgress;
});
