import { StorageSerializers } from '@vueuse/core';

export default async <T>(url: string) => {
	const cached = useSessionStorage<T>(url, null, {
		serializer: StorageSerializers.object,
	});

	if (!cached.value) {
		const { data, error } = await useFetch<T>(url);

		if (error.value) {
			throw createError({
				...error.value,
				statusMessage: `can not fetch the data from ${url}`,
			});
		}

		cached.value = data.value as T;
	} else {
		console.log('Loading from cache...');
	}

	return cached;
};
