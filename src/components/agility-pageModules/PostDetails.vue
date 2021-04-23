<template>
  <div class="relative px-8">
    <div class="max-w-screen-xl mx-auto">
      <div class="h-64 md:h-96 relative">
        <img
          :src="post.image.url"
          class="object-cover object-center rounded-lg"
          style="width: 100%; height: 380px"
        />
      </div>
      <div class="max-w-2xl mx-auto mt-4">
        <div
          class="uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose"
        >
          {{ category }}
        </div>
        <div class="border-b-2 border-primary-500 w-8"></div>
        <div class="mt-4 uppercase text-gray-600 italic font-semibold text-xs">
          {{ date }}
        </div>
        <h1 class="font-display text-4xl font-bold my-6 text-secondary-500">
          {{ post.title }}
        </h1>
        <div class="prose max-w-full mb-20" :inner-html.prop="post.content" />
      </div>
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
    post: function() {
      return this.dynamicPageItem.fields;
    },
    date: function() {
      return new Date(this.post.date).toLocaleDateString();
    },
    category: function() {
      return this.post.category?.fields.title || "Uncategorized";
    },
  },
};
</script>
