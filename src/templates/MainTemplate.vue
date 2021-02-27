<template>
	<main class="max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-6 lg:p-8">
		<ContentZone
			name="MainContentZone"
			:page="page"
			:pageInSitemap="pageInSitemap"
			:dynamicPageItem="dynamicPageItem"
			:moduleData="moduleData"
		/>
	</main>
</template>

<script>
import ContentZone from "../AgilityContentZone";
export default {
	props: {
		page: Object,
		moduleData: Object,
		pageInSitemap: Object,
		dynamicPageItem: Object

	},
	components: {
		ContentZone,
	}
};
</script>
