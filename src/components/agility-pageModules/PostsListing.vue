<template>
  <div>
    <div
      class="mt-44 px-6 flex flex-col items-center justify-center"
      v-if="!hasPosts"
    >
      <h1 class="text-3xl text-center font-bold text-secondary-500">
        No posts available.
      </h1>
      <div class="my-10">
        <a
          href="/"
          class="px-4 py-3 my-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:border-primary-700 focus:shadow-outline-primary transition duration-300"
        >
          Return Home
        </a>
      </div>
    </div>
    <div class="relative px-8 mb-12" v-else>
      <div class="max-w-screen-xl mx-auto">
        <div class="sm:grid sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <template v-for="post in posts">
            <a :href="`/blog/${post.fields.slug}`" :key="post.title">
              <div class="flex-col group mb-8 md:mb-0">
                <div class="relative h-64">
                  <img
                    :src="post.fields.image.url"
                    :alt="post.fields.title"
                    class="object-cover object-center rounded-t-lg"
                    style="width: 100%; height: 100%;"
                  />
                </div>
                <div class="bg-gray-100 p-8 border-2 border-t-0 rounded-b-lg">
                  <div
                    class="uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose"
                  >
                    {{ post.category }}
                  </div>
                  <div class="border-b-2 border-primary-500 w-8"></div>
                  <div
                    class="mt-4 uppercase text-gray-600 italic font-semibold text-xs"
                  >
                    {{ post.formattedDate }}
                  </div>
                  <h2
                    class="text-secondary-500 mt-1 font-black text-2xl group-hover:text-primary-500 transition duration-300"
                  >
                    {{ post.fields.title }}
                  </h2>
                </div>
              </div>
            </a>
          </template>
        </div>
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
    moduleData: Object,
  },
  computed: {
    posts: function() {
      // our module data was loaded in src/data/PostsLists.js
      return this.moduleData["PostsListing"];
    },
    hasPosts: function() {
      return this.posts.length >= 1;
    },
  },
};
</script>
