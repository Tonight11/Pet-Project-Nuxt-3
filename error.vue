<script setup>
	const error = useError();

	const clearErr = () => {
		clearError({
			redirect: '/',
		});
	};

	useHead({
		title: '404',
	});
</script>

<template>
	<div id="background"></div>
	<div class="top">
		<h1 v-if="error.statusCode">{{ error.statusCode }}</h1>
		<h3 v-if="error.message">{{ error.message }}</h3>
	</div>
	<div class="container">
		<div class="ghost-copy">
			<div class="one"></div>
			<div class="two"></div>
			<div class="three"></div>
			<div class="four"></div>
		</div>
		<div class="ghost">
			<div class="face">
				<div class="eye"></div>
				<div class="eye-right"></div>
				<div class="mouth"></div>
			</div>
		</div>
		<div class="shadow"></div>
	</div>
	<div class="bottom">
		<button @click="clearErr" class="btn">Go Back Homepage</button>
	</div>
</template>

<style lang="scss" scoped>
	$white: #ededed;
	$gray: #bfc0c0;
	$dark: #585959;
	$light: #d3deea;

	@import url('https://fonts.googleapis.com/css?family=Abril+Fatface|Lato');

	$big: 'Abril Fatface', serif;
	$body: 'Lato', sans-serif;

	body {
		background: $light;
	}

	.top {
		margin-top: 30px;
	}

	.container {
		margin: 0 auto;
		position: relative;
		width: 250px;
		height: 250px;
		margin-top: -40px;
	}

	.ghost {
		width: 50%;
		height: 53%;
		left: 25%;
		top: 10%;
		position: absolute;
		border-radius: 50% 50% 0 0;
		background: $white;
		border: 1px solid $gray;
		border-bottom: none;
		animation: float 2s ease-out infinite;
	}

	.ghost-copy {
		width: 50%;
		height: 53%;
		left: 25%;
		top: 10%;
		position: absolute;
		border-radius: 50% 50% 0 0;
		background: $white;
		border: 1px solid $gray;
		border-bottom: none;
		animation: float 2s ease-out infinite;
		z-index: 0;
	}

	.face {
		position: absolute;
		width: 100%;
		height: 60%;
		top: 20%;
	}
	.eye,
	.eye-right {
		position: absolute;
		background: $dark;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		top: 40%;
	}

	.eye {
		left: 25%;
	}
	.eye-right {
		right: 25%;
	}

	.mouth {
		position: absolute;
		top: 50%;
		left: 45%;
		width: 10px;
		height: 10px;
		border: 3px solid;
		border-radius: 50%;
		border-color: transparent $dark $dark transparent;
		transform: rotate(45deg);
	}

	.one,
	.two,
	.three,
	.four {
		position: absolute;
		background: $white;
		top: 85%;
		width: 25%;
		height: 23%;
		border: 1px solid $gray;
		z-index: 0;
	}

	.one {
		border-radius: 0 0 100% 30%;
		left: -1px;
	}

	.two {
		left: 23%;
		border-radius: 0 0 50% 50%;
	}

	.three {
		left: 50%;
		border-radius: 0 0 50% 50%;
	}

	.four {
		left: 74.5%;
		border-radius: 0 0 30% 100%;
	}

	.shadow {
		position: absolute;
		width: 30%;
		height: 7%;
		background: $gray;
		left: 35%;
		top: 80%;
		border-radius: 50%;
		animation: scale 2s infinite;
	}

	@keyframes scale {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}

	@keyframes float {
		50% {
			transform: translateY(15px);
		}
	}

	/*text styling*/
	h1 {
		font-family: $big;
		color: $white;
		text-align: center;
		font-size: 9em;
		margin: 0;
		text-shadow: -1px 0 $gray, 0 1px $gray, 1px 0 $gray, 0 -1px $gray;
	}
	h3 {
		font-family: $body;
		font-size: 2em;
		text-transform: uppercase;
		text-align: center;
		color: $gray;
		margin-top: -20px;
		font-weight: 900;
	}

	.bottom {
		display: flex;
		justify-content: center;
	}

	
</style>
