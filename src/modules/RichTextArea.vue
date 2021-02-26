<template>
	<section class="my-6 prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-full" v-html="item.fields.textblob">
	</section>
</template>

<script>
export default {
  props: {
    contentID: Number,
    item: Object,
    page: Object,
    pageInSitemap: Object,
    dynamicPageItem: Object
  }
};
</script>