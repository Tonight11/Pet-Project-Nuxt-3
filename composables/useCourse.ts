import { neededChapter, mainMeta } from '~~/types/course';
import useFetchWithCache from './useFetchWithCache';

export const useCourse = async () => {
	const url = `/api/meta`;
	const meta = await useFetchWithCache<mainMeta>(url);
	const route = useRoute();

	const chapter = computed<neededChapter | undefined>(() => {
		return meta.value.chapters.find(
			item => item.slug === route.params.chapterSlug
		);
	});

	return {
		meta,
		chapter,
	};
};
