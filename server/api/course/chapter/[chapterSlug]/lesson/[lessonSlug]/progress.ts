import { PrismaClient } from '@prisma/client';
import { serverSupabaseUser } from '#supabase/server';

const prisma = new PrismaClient();

export default defineEventHandler(async event => {
	assertMethod(event, ['POST', 'PATCH', 'PUT']);

	const user = await serverSupabaseUser(event);
	if (!user) {
		throw createError({
			statusCode: 401,
			message: 'Unauthorized',
		});
	}

	const { lessonSlug, chapterSlug } = event.context.params;

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

	const { completed } = await readBody(event);
	const email = user.email as string;

	return prisma.progressLesson.upsert({
		where: {
			lessonId_userEmail: {
				userEmail: email,
				lessonId: lesson.id,
			},
		},
		update: {
			completed,
		},
		create: {
			completed,
			userEmail: email,
			lesson: {
				connect: {
					id: lesson.id,
				},
			},
		},
	});
});
