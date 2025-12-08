export default {
  target: "static",
  components: true,
  generate: { fallback: "404.html" },
  modules: [
    "@nuxtjs/tailwindcss",
    "@agility/agilitycms-nuxt-module"
  ],
  agilitycms: {
    channelName: "website",
    languages: ["en-us"],
    includeLanguageCodeInUrl: false,
    pageComponentPath: "src/AgilityPage.vue",
  },

  head: {
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
  },
  css: [],
  googleFonts: {
    families: {
      Inter: true,
    },
  },
  tailwindcss: {
    jit: true,
    cssPath: "./src/css/global.css",
  },
};
