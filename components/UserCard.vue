<script setup lang="ts">
	const user = useSupabaseUser();
	const client = useSupabaseAuthClient();

	const avatar = computed<string>(() => {
		return user.value?.user_metadata.avatar_url;
	});

	const name = computed<string>(() => {
		return user.value?.user_metadata.full_name;
	});

	const logOut = async () => {
		const { error } = await client.auth.signOut();

		if (error) {
			console.log(error);
		} else {
			return navigateTo('/login');
		}
	};
</script>

<template>
	<div class="user-card" v-if="user">
		<div class="user-card__img">
			<img :src="avatar" alt="avatar" />
		</div>
		<div class="user-card__info">
			<h4 class="user-card__name">{{ name }}</h4>
			<button class="user-card__log-out" @click="logOut">log out</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.user-card {
		background-color: white;
		border-radius: 11px;
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 20px 10px 10px;
		&__img {
			width: 75px;
			height: 75px;

			& img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				border-radius: 50%;
			}
		}

		&__name {
			color: #bfc0c0;
		}

		&__log-out {
			color: #5043f8;
		}
	}
</style>
