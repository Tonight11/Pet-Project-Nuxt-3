import vsharp from 'vite-plugin-vsharp';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	nitro: {
		prerender: {
			routes: ['/landing'],
		},
	},
	runtimeConfig: {
		secretKey: '',
		public: {
			stripeKey: '',
		},
	},
	vite: {
		plugins: [vsharp()],
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'@vueuse/nuxt',
		'@nuxtjs/supabase',
		'@pinia/nuxt',
	],
});
