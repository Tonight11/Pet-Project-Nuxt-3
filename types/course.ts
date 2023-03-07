import { Lesson } from '@prisma/client';

export interface LessonWithPath extends Lesson {
	path: string;
}
