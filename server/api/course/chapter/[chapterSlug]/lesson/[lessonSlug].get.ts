import { PrismaClient } from '@prisma/client';
import { serverSupabaseUser } from '#supabase/server';

const prisma = new PrismaClient();

export default defineEventHandler(async event => {
	const user = await serverSupabaseUser(event);
	if (event.context.params.chapterSlug !== '1-chapter-1') {
		if (!user) {
			throw createError({
				statusCode: 401,
				message: 'Unauthorized',
			});
		}
	}

	const { chapterSlug, lessonSlug } = event.context.params;

	const lesson = await prisma.lesson.findFirst({
		where: {
			slug: lessonSlug,
			Chapter: {
				slug: chapterSlug,
			},
		},
	});

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
