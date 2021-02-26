<template>
	<div v-if="statusCode !== 200">
		<h1>Error {{ statusCode }}</h1>
		<div>{{ message }}</div>
	</div>
	<div v-else>
		<Header :globalHeader="globalHeader" />

		<component :is="componentToRender" :page="page" :dynamicPageItem="dynamicPageItem" />
	</div>
</template>

<script>
import AgilityComponents from "./agility.components";
import Header from "./components/header";
import HeaderData from "./components/header/data";

export default {
	components: {
		Header,
	},
	data() {
		return {
			page: {title: "", seo: {metaDescription: ""}},
			dynamicPageItem: null,
			message: null,
			statusCode: 0,
		};
	},
	computed: {
		componentToRender: function() {
			console.log("tempate to render: ", this.page.templateName)
			const component = AgilityComponents.pageTemplateComponents[this.page.templateName];
			return component;
		},
	},
	head() {
		return {
			title: this.page.title,
			meta: [
				{
					hid: "description",
					name: "description",
					content: this.page.seo.metaDescription,
				},
			],
		};
	},
	async asyncData(context) {
		// Universal keys
		const {app, store, route, params, query, env, isDev, isHMR, redirect, error, $config} = context;
		// Client-side
		if (process.client) {
			const {nuxtState} = context;
			return nuxtState.data[0];
		}

		// Server-side
		if (process.server) {

			const {$agility} = context;

			try {
				let slug = params.pathMatch;
				if (slug == "/") slug = "";

				if (slug.length > 1 && slug.lastIndexOf("/") == slug.length - 1) {
					slug = slug.substring(0, slug.length - 1);
				}

				let languageCode = $agility.languages[0];
				if ($agility.includeLanguageCodeInUrl) {
					//TODO: parse the language code from the url...
				}

				const sitemap = await $agility.client.getSitemap({
					channelName: $agility.channelName,
					languageCode,
				});

				const path = `${slug}` || Object.keys(sitemap)[0];
				let pageInSitemap = sitemap[path];

				if (!pageInSitemap) {
					const message = `Page not found on sitemap in ${languageCode}.`;
					error({statusCode: 404, message});
					return {statusCode: 404, message};
				}

				let page =
					(await $agility.client.getPage({
						pageID: pageInSitemap.pageID,
						languageCode: languageCode,
					})) || null;

				if (!page) {
					const message = `Page not found in ${languageCode}.`;
					error({statusCode: 404, message});
					return {statusCode: 404, message};
				}

				let dynamicPageItem = null;

				if (pageInSitemap.contentID > 0) {
					dynamicPageItem = await $agility.client.getContentItem({
						contentID: pageInSitemap.contentID,
						languageCode: languageCode,
					});
				}

				//get the global header
				const globalHeader = await HeaderData({$agility, languageCode, page, dynamicPageItem});

				return {
					page,
					dynamicPageItem,
					message: null,
					statusCode: 200,
					globalHeader,
				};
			} catch (err) {
				console.error(err);
				error({statusCode: 500, message: `Error occurred on server.`});
				return {statusCode: 500, message: `Error occurred on server.`};
			}
		}
	},
};
</script>
