<template>
  <div class="relative px-8 mb-8" v-if="selectedFeaturedPost">
    <div class="flex flex-col sm:flex-row max-w-screen-xl mx-auto pt-8 group">
      <div class="sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg relative">
        <a :href="`/blog/${fields.slug}`" class="cursor-pointer">
          <div class="h-64 sm:h-96 relative">
            <img
              :src="fields.image.url"
              class="object-cover object-center rounded-t-lg sm:rounded-l-lg sm:rounded-t-none h-full"
              layout="fullWidth"
              style="height: 100%; width: 100%;"
            />
          </div>
        </a>
      </div>
      <div
        class="sm:w-1/2 lg:w-1/3 bg-gray-100 p-8 border-2 border-t-0 rounded-b-lg sm:rounded-bl-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0 relative"
      >
        <a :href="`/blog/${fields.slug}`" class="cursor-pointer">
          <div
            class="font-display uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content"
          >
            {{ fields.category.fields.title }}
          </div>
          <div class="border-b-2 border-primary-500 w-8"></div>
          <div
            class="mt-4 uppercase text-gray-600 italic font-semibold text-xs"
          >
            {{ date }}
          </div>
          <h2
            class="font-display text-secondary-500 mt-1 font-black text-2xl group-hover:text-primary-500 transition duration-300"
          >
            {{ fields.title }}
          </h2>
          <div
            class="text-sm mt-3 leading-loose text-gray-600 font-medium"
            :inner-html.prop="fields.content | truncate(160)"
          />
        </a>
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
  filters: {
    truncate(string, value) {
      return string.substring(0, value) + "…";
    },
  },
  computed: {
    fields: function() {
      return this.item.fields.featuredPost.fields;
    },
    date: function() {
      return new Date(this.fields.date).toLocaleDateString();
    },
    selectedFeaturedPost: function() {
      if (this.fields) {
        return true;
      }
    },
  },
};
</script>
