<script setup lang="ts">
	const course = await useCourse();
	const { query } = useRoute();
	const { auth } = useSupabaseAuthClient();
	const user = useSupabaseUser();
	const location = useRuntimeConfig().public.siteUrl;
	onMounted(() => {
		watchEffect(async () => {
			if (user.value) {
				navigateTo(query.redirectTo as string, {
					replace: true,
				});
			}
		});
	});
	const login = async (provider: 'github') => {
		const redirectTo: string = `${location}${query.redirectTo}`;

		const { error } = await auth.signInWithOAuth({
			provider,
			options: { redirectTo },
		});
		if (error) {
			console.error(error);
		}
	};

	definePageMeta({
		layout: false,
	});
</script>

<template>
	<div>
		<NuxtLink to="/">Homepage</NuxtLink>
		<div class="signup">
			<div class="signup-connect">
				<h1>Sign in to {{ course.meta.value?.title }}</h1>
				<div class="signup-connect__btns">
					<button class="btn btn-social btn-facebook" @click="login('github')">
						Sign in with GitHub
					</button>
					<button class="btn btn-social btn-google">
						sign in with Google(not working)
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.signup {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
		overflow: hidden;
		display: flex;
	}

	.signup-connect {
		color: #bfc0c0;

		&__btns {
			display: flex;
			flex-direction: column;
		}
		h1 {
			font-size: 30px;
			margin-top: 10px;
			margin-bottom: 40px;
			text-shadow: 0 2px 3px #0000001a;
		}
	}
</style>
