<template>
  <ContentZone
    name="MainContentZone"
    :page="page"
    :pageInSitemap="pageInSitemap"
    :dynamicPageItem="dynamicPageItem"
    :moduleData="moduleData"
  />
</template>

<script>
import ContentZone from "../../AgilityContentZone";
export default {
  props: {
    page: Object,
    moduleData: Object,
    pageInSitemap: Object,
    dynamicPageItem: Object,
  },
  components: {
    ContentZone,
  },
};
</script>
