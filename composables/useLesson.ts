import { StorageSerializers } from '@vueuse/core';

export default async (chapterSlug: string, lessonSlug: string) => {
	const url = `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`;
	const lessons = useSessionStorage(url, null, {
		serializer: StorageSerializers.object,
	});

	if (!lessons.value) {
		const { data, error } = await useFetch(url);

		if (error.value) {
			throw createError({
				...error.value,
				statusMessage: `can not fetch the "${lessonSlug}" lesson`,
			});
		}

		lessons.value = data.value;
	} else {
		console.log('Loading from cache...');
	}

	return lessons;
};
