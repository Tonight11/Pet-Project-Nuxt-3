<template>
	<div>
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
