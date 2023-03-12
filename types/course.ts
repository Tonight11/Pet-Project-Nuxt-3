import { Lesson } from '@prisma/client';

export interface LessonWithPath extends Lesson {
	path: string;
}

export interface ChapterProgress {
	[key: string]: boolean;
}

export interface CourseProgress {
	[ket: string]: ChapterProgress;
}
