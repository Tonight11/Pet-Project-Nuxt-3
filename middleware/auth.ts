// valiidate if user is authorized
export default defineNuxtRouteMiddleware((to, from) => {
	const user = useSupabaseUser();

	if (to.path.includes('/course') && !user.value) {
		return navigateTo('/login');
	}
});
