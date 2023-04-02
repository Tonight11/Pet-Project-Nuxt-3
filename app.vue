<template>
	<div>
		<NuxtLoadingIndicator
			color="repeating-linear-gradient(to right,rgb(144, 170, 255) 0%,rgb(72, 115, 255) 100%)"
		/>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<style lang="scss">
	li {
		list-style: none;
	}
	.btn {
		background: #ededed;
		padding: 15px 20px;
		margin: 5px;
		color: #585959;
		text-transform: uppercase;
		font-size: 14px;
		letter-spacing: 1px;
		border: 0;
		&:hover {
			background: #bfc0c0;
			transition: all 0.4s ease-out;
		}
	}
</style>
