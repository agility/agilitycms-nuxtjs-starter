<template>
  <div class="flex flex-col min-h-screen">
    <preview-bar />
    <site-header />
    <main class="flex-grow">
      <Nuxt />
    </main>
    <site-footer />
  </div>
</template>

<script>
import SiteHeader from "../src/components/common/SiteHeader.vue";
import SiteFooter from "../src/components/common/SiteFooter.vue";
import PreviewBar from "../src/components/common/PreviewBar.vue";
export default {
  components: {
    SiteHeader,
    SiteFooter,
    PreviewBar,
  },
};
</script>
