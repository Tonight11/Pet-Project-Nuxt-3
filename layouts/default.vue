<script setup></script>

<template>
	<div
		class="p-12 w-full h-full min-h-screen flex flex-col items-center bg-gray-100"
	>
		<TheHeader />
		<div class="w-full mb-12 flex justify-between">
			<h1>
				<span class="font-medium">
					<span class="font-bold">Nuxt 3 course</span>
				</span>
			</h1>
		</div>
		<slot />
	</div>
</template>
