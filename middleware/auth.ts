// valiidate if user is authorized
export default defineNuxtRouteMiddleware((to, from) => {
	const user = useSupabaseUser();
	if (to.path === '/course' && !user.value) {
		navigateTo('/login');
	} else if (to.path === '/login' && user.value) {
		navigateTo(`/course`);
	}
});
