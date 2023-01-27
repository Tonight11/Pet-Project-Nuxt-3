<script setup lang="ts">
	const { title } = useCourse();
	const user = useSupabaseUser();
	const supabase = useSupabaseAuthClient();
	const { query } = useRoute();

	const redirectTo: string = `${window.location.origin}${query.redirectTo}`;
	const signIn = async (provider: 'github') => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: provider,
			options: { redirectTo },
		});

		if (error) {
			console.log(error);
		}
	};

	watchEffect(() => {
		if (user.value) {
			navigateTo(redirectTo, {
				replace: true,
			});
		}
	});

	definePageMeta({
		layout: false,
	});
</script>

<template>
	<div>
		<NuxtLink to="/">Homepage</NuxtLink>
		<div class="signup">
			<div class="signup-connect">
				<h1>Sign in to {{ title }}</h1>
				<div class="signup-connect__btns">
					<button class="btn btn-social btn-facebook" @click="signIn('github')">
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
