<template>
	<div v-if="statusCode !== 200">
		<h1>Error {{ statusCode }}</h1>
		<div>{{ message }}</div>
	</div>
	<div v-else>
		<component :is="componentToRender" :page="page" :dynamicPageItem="dynamicPageItem" />
	</div>
</template>

<script>
import AgilityComponents from "./agility.components";

export default {
	data() {
		return {
			pageInSitemap: {title:""},
			page: {title: "", seo: {metaDescription: ""}},
			dynamicPageItem: null,
			message: null,
			statusCode: 0,
		};
	},
	computed: {
		componentToRender: function() {
			const component = AgilityComponents.pageTemplateComponents[this.page.templateName];
			return component;
		},
	},
	mounted: function() {},
	head() {
		return {
			title: this.pageInSitemap.title,
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

		const {app, store, route, params, query, env, isDev, isHMR, redirect, error, $config, $agility} = context;

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

			const sitemap = await $agility.client.getSitemapFlat({
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

			return {
				pageInSitemap,
				page,
				dynamicPageItem,
				message: null,
				statusCode: 200,
			};
		} catch (err) {
			console.error(err);
			error({statusCode: 500, message: `Error occurred on server.`});
			return {statusCode: 500, message: `Error occurred on server.`};
		}
	},
};
</script>
