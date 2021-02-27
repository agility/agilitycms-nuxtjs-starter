<template>
	<main class="max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-6 lg:p-8">
		<ContentZone
			name="MainContentZone"
			:page="page"
			:pageInSitemap="pageInSitemap"
			:dynamicPageItem="dynamicPageItem"
			:sharedContent="sharedContent"
			:sitemapFlat="sitemapFlat"
			:sitemapNested="sitemapNested"
		/>
	</main>
</template>

<script>
import ContentZone from "../AgilityContentZone";
export default {
	props: {
		page: Object,
		pageInSitemap: Object,
		dynamicPageItem: Object,
		sharedContent: Object,
		sitemapFlat: Object,
		sitemapNested: Array,
	},
	components: {
		ContentZone,
	}
};
</script>
