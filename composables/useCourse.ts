import courseData from './courseData';

export const useCourse = () => {
	const route = useRoute();

	const chapter = computed(() => {
		return courseData.chapters.find(
			item => item.slug === route.params.chapterSlug
		);
	});

	const lesson = computed(() => {
		return chapter.value?.lessons.find(
			item => item.slug === route.params.lessonSlug
		);
	});

	const linkPath = courseData.chapters.map(chapterItem => {
		return {
			...chapterItem,
			lessons: chapterItem.lessons.map(lessonItem => {
				return {
					...lessonItem,
					path: `/course/chapter/${chapterItem.slug}/lesson/${lessonItem.slug}`,
				};
			}),
		};
	});

	console.log(courseData);

	return {
		courseData,
		chapter,
		lesson,
		linkPath,
	};
};
