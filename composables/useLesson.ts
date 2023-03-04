import { LessonWithPath } from '~~/types/course';
import useFetchWithCache from './useFetchWithCache';

export default async (chapterSlug: string, lessonSlug: string) => {
	const url = `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`;

	return useFetchWithCache<LessonWithPath>(url);
};