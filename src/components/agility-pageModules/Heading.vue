<template>
  <div class="relative px-8">
    <div class="max-w-screen-xl mx-auto my-12 md:mt-18 lg:mt-20">
      <h1
        class="font-display text-secondary-500 text-4xl font-black tracking-wide"
      >
        {{ fields.title }}
      </h1>
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
  computed: {
    fields: function() {
      return this.item.fields;
    },
  },
};
</script>
