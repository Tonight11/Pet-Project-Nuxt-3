// valiidate if user is authorized
export default defineNuxtRouteMiddleware((to, from) => {
	if (to.path === '/course' || to.params.chapterSlug) {
		return navigateTo('/login');
	}
});
