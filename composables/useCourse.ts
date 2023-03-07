import { CourseNeeded } from '~~/server/api/meta.get';
import useFetchWithCache from './useFetchWithCache';

export const useCourse = async () => {
	const url = `/api/meta`;
	const meta = await useFetchWithCache<CourseNeeded>(url);
	const route = useRoute();

	const chapter = computed(() => {
		return meta.value.chapters.find(
			item => item.slug === route.params.chapterSlug
		);
	});

	return {
		meta,
		chapter,
	};
};
