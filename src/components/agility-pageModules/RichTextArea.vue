<template>
  <div class="relative px-8">
    <div class="max-w-2xl mx-auto my-12 md:mt-18 lg:mt-20">
      <div class="prose max-w-full mx-auto" v-html="item.fields.textblob" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contentID: Number,
    item: Object,
    page: Object,
    pageInSitemap: Object,
    dynamicPageItem: Object,
  },
};
</script>
