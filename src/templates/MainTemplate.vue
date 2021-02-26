<template>
  <div class="one-column-template">
    <ContentZone
      name="MainContentZone"
      :page="page"
      :pageInSitemap="pageInSitemap"
      :dynamicPageItem="dynamicPageItem"
      :sharedContent="sharedContent"
      :sitemapFlat="sitemapFlat"
      :sitemapNested="sitemapNested"
    />
  </div>
</template>

<script>
import ContentZone from '../AgilityContentZone'
export default {
  props: {
    page: Object,
    pageInSitemap: Object,
    dynamicPageItem: Object,
    sharedContent: Object,
    sitemapFlat: Object,
    sitemapNested: Array
  },
  components: {
    ContentZone
  },
  mounted: function() {
	  console.log("page template")
  }
}
</script>