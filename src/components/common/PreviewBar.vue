<template>
  <div class="bg-agility relative px-8 text-gray-200">
    <div class="flex justify-between items-center max-w-screen-xl mx-auto">
      <div class="flex items-center">
        <span class="p-2 rounded-lg mr-4">
          <a
            href="https://www.agilitycms.com"
            target="_blank"
            rel="noreferrer"
            title="Agility CMS"
          >
            <img
              src="https://static.agilitycms.com/brand/agility-triangle-yellow.svg"
              alt="Agility CMS"
              class="w-5 h-5 block md:hidden"
            />
            <img
              src="~/assets/agility-preview-logo.svg"
              alt="Agility CMS"
              class="h-5 w-20 hidden md:block"
            />
          </a>
        </span>
        <div class="mr-4">
          <a
            href="https://help.agilitycms.com/hc/en-us"
            target="_blank"
            rel="noreferrer"
            title="Help Center"
            class="text-2xl"
          >
            <div class="flex items-center">
              <fa class="mr-2" :icon="['fas', 'info-circle']" />
              <p class="hidden md:block text-sm">Help Center</p>
            </div>
          </a>
        </div>
        <div>
          <a
            href="https://github.com/agilitycms/agilitycms-nuxtjs-starter"
            target="_blank"
            rel="noreferrer"
            title="View on GitHub"
            class="text-2xl"
          >
            <div class="flex items-center">
              <fa class="mr-2" :icon="['fab', 'github']" />
              <p class="hidden md:block text-sm">View on GitHub</p>
            </div>
          </a>
        </div>
      </div>
      <div class="py-4">
        <template v-if="isPreview">
          <p class="text-xs md:text-base">
            Previewing <span class="font-bold">Latest</span> Changes
          </p>
        </template>
        <template v-else>
          <p class="text-xs md:text-base">
            Viewing <span class="font-bold">Published</span> Content
          </p>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      isPreview: null,
    };
  },
  methods: {},
  async fetch() {
    if (process.server) {
      // check if we are in preview
      let isPreview = this.$agility.isPreview;
      this.isPreview = isPreview;
    }
  },
};
</script>
