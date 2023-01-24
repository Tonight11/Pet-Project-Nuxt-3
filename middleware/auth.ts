// valiidate if user is authorized
export default defineNuxtRouteMiddleware((to, from) => {
	const user = useSupabaseUser();
	if ((to.path === '/course' || to.params.chapterSlug) && !user.value) {
		return navigateTo('/login');
	}
});
