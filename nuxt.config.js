//require('dotenv').config()

export default {
  target: "static",
  components: true,
  generate: { fallback: "404.html" },
  modules: [
    "@nuxtjs/tailwindcss",
    "@agility/agilitycms-nuxt-module",
    [
      "nuxt-fontawesome",
      {
        component: "fa",
        imports: [
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["faInfoCircle"],
          },
          {
            set: "@fortawesome/free-brands-svg-icons",
            icons: [
              "faTwitter",
              "faInstagram",
              "faSlack",
              "faYoutube",
              "faGithub",
            ],
          },
        ],
      },
    ],
  ],
  agilitycms: {
    channelName: "website",
    languages: ["en-us"],
    includeLanguageCodeInUrl: false,
    pageComponentPath: "src/AgilityPage.vue",
  },

  head: {
    titleTemplate: "%s | My Travel Blog",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    link: [
      // { rel:"stylesheet", href:"https://cdn.jsdelivr.net/npm/@tailwindcss/ui@latest/dist/tailwind-ui.min.css" },
      // { rel:"stylesheet", href:"https://rsms.me/inter/inter.css"}
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
    cssPath: "~/src/css/index.css",
  },
};
