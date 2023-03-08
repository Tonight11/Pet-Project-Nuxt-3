import { CourseNeeded } from '~~/server/api/meta.get';
import useFetchWithCache from './useFetchWithCache';

export const useCourse = async () => {
	const url = `/api/meta`;
	const meta = await useFetchWithCache<CourseNeeded>(url);

	return {
		meta,
	};
};
