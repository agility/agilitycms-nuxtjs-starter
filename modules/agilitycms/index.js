const path = require('path')
const getSyncClient = require("./agility.sync").default

export default function (moduleOptions) {

	const { nuxt, options } = this
	const env = options._env
	const isPreview = options.dev
	const guid = env.AGILITY_GUID
	const apiKey = isPreview ? env.AGILITY_API_PREVIEW_KEY : env.AGILITY_API_FETCH_KEY

	const agilityOptions = {
		...moduleOptions,
		...this.options.agilitycms
	}

	const languages = agilityOptions.languages
	const channelName = agilityOptions.channelName
	const includeLanguageCodeInUrl = agilityOptions.includeLanguageCodeInUrl
	const pageComponentPath = agilityOptions.pageComponentPath

	//get the agility sync client
	const agilityConfig = { isPreview, guid, apiKey, languages, channelName }


	//Generate site hook...
	nuxt.hook('generate:extendRoutes', async (routes) => {

		//trigger a sync before we generate stuff
		const syncClient = getSyncClient(agilityConfig)
		await syncClient.runSync()

		for (let langIndex = 0; langIndex < languages.length; langIndex++) {

			const languageCode = languages[langIndex]
			const sitemapFlat = await syncClient.store.getSitemap({ languageCode, channelName })

			let pathIndex = 0

			Object.keys(sitemapFlat).forEach(path => {

				let route = path.substring(1)

				if (pathIndex === 0) route = ""

				if (includeLanguageCodeInUrl) {
					if (pathIndex === 0) {
						route = `${languageCode}`
					} else {
						route = `${languageCode}/${route}`
					}
				}

				++pathIndex

				routes.push({ route })
			})
		}

	})


	nuxt.hook('listen', async (server, { host, port }) => {
		//trigger a when we startup in SSR
		if (isPreview) {
			const syncClient = getSyncClient(agilityConfig)
			await syncClient.runSync()
		}

	})

	options.router.extendRoutes = (routes, resolve)=>{
		//push the routes from the Agility sitemap into the fold
		routes.push({
			name: 'agilitycms',
			path: '*',
			component: pageComponentPath
		})
	}

	this.addPlugin({
		src: path.resolve(__dirname, 'agility-plugin-server.js'),
		options: agilityConfig,
		fileName: 'agilitycms.server.js',
		mode: 'server'
	})

	this.addPlugin({
		src: path.resolve(__dirname, 'agility-plugin-client.js'),
		options: agilityConfig,
		fileName: 'agilitycms.client.js',
		mode: 'client'
	})
}

//module.exports.meta = require('../package.json')