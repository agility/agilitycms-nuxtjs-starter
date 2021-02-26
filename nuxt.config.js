//require('dotenv').config()

export default {
	target: 'static',
	build: {
		transpile: ['@agility/agilitycms-nuxt-module']
	  },
	buildModules: [
		"@agility/agilitycms-nuxt-module",
		"@nuxtjs/tailwindcss",
    	"@nuxtjs/google-fonts"
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
			{ rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
			{ rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
		]
	},
	css: [],
}