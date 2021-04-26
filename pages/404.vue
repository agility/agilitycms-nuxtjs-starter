<template>
  <section class="max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-6">
    <div class="my-6 max-w-full">This page does not exist.</div>
  </section>
</template>

<script>
export default {
  props: ["error"],
  layout: "error", // you can set a custom layout for the error page
};
</script>
