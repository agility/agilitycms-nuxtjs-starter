//require('dotenv').config()

export default {
	target: 'static',
	components:true,
	 build: {
	 	transpile: ['~/modules/agilitycms']
	 },
	modules: [
		"~/modules/agilitycms"
	],
	agilitycms: {
		channelName: "website",
		languages: ["en-us"],
		includeLanguageCodeInUrl: false,
		pageComponentPath: "src/AgilityPage.vue"
	},


	head: {
		titleTemplate: '%s - Agility CMS + Nuxt',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		],
		link: [
			{ rel:"stylesheet", href:"https://cdn.jsdelivr.net/npm/@tailwindcss/ui@latest/dist/tailwind-ui.min.css" },
			{ rel:"stylesheet", href:"https://rsms.me/inter/inter.css"}
		]
	},
	css: [],
}