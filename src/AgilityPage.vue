<template>
  <div
    v-if="statusCode !== 200"
    class="max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-6 lg:p-8"
  >
    <div class="my-6 max-w-full">
      <div v-if="message">{{ message }}</div>
      <div v-else>The page could not be found, or an error occurred.</div>
    </div>
  </div>
  <div v-else>
    <component
      :is="componentToRender"
      :page="page"
      :pageInSitemap="pageInSitemap"
      :dynamicPageItem="dynamicPageItem"
      :moduleData="moduleData"
    />
  </div>
</template>

<script>
import AgilityComponents from "./agility.components";

export default {
  data() {
    return {
      pageInSitemap: { title: "" },
      page: { title: "", seo: { metaDescription: "", keywords: "" } },
      dynamicPageItem: null,
      moduleData: {},
      message: null,
      statusCode: 0,
    };
  },
  computed: {
    componentToRender: function() {
      const component =
        AgilityComponents.pageTemplateComponents[this.page.templateName];
      return component;
    },
  },
  mounted: function() {},
  head() {
    return {
      title: this.pageInSitemap.title,
      meta: [
        {
          hid: "generator",
          name: "generator",
          content: "Agility CMS",
        },
        {
          hid: "agility_timestamp",
          name: "agility_timestamp",
          content: new Date().toLocaleString(),
        },
        {
          hid: "viewport",
          name: "viewport",
          content: "initial-scale=1.0, width=device-width",
        },
        {
          hid: "description",
          name: "description",
          content: this.page.seo.metaDescription,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.page.seo.metaKeywords,
        },
      ],
    };
  },

  async asyncData(context) {
    if (process.server) {
      const {
        app,
        store,
        route,
        params,
        query,
        env,
        isDev,
        isHMR,
        redirect,
        error,
        $config,
        $agility,
      } = context;

      try {
        let slug = params.pathMatch;
        if (slug == "/") slug = "";

        if (slug.length > 1 && slug.lastIndexOf("/") == slug.length - 1) {
          slug = slug.substring(0, slug.length - 1);
        }

        let languageCode = $agility.languages[0];
        if ($agility.includeLanguageCodeInUrl) {
          //TODO: parse the language code from the url...
        }

        const sitemap = await $agility.client.getSitemapFlat({
          channelName: $agility.channelName,
          languageCode,
        });

        const path = `${slug}` || Object.keys(sitemap)[0];
        let pageInSitemap = sitemap[path];

        if (!pageInSitemap) {
          const message = `Page not found on sitemap in ${languageCode}.`;
          error({ statusCode: 404, message });
          return { statusCode: 404, message };
        }

        let page =
          (await $agility.client.getPage({
            pageID: pageInSitemap.pageID,
            languageCode: languageCode,
          })) || null;

        if (!page) {
          const message = `Page not found in ${languageCode}.`;
          error({ statusCode: 404, message });
          return { statusCode: 404, message };
        }

        let dynamicPageItem = null;

        if (pageInSitemap.contentID > 0) {
          dynamicPageItem = await $agility.client.getContentItem({
            contentID: pageInSitemap.contentID,
            languageCode: languageCode,
          });
        }

        let moduleData = {};
        //load extra data

        for (let zoneName in page.zones) {
          let zone = page.zones[zoneName];
          for (let moduleIndex = 0; moduleIndex < zone.length; moduleIndex++) {
            let module = zone[moduleIndex];
            const moduleName = module.module;

            //try to find a data accessor for this module name...
            const fetcher = AgilityComponents.dataFetch[moduleName];
            if (fetcher) {
              moduleData[moduleName] = await fetcher({ $agility });
            }
          }
        }

        return {
          pageInSitemap,
          page,
          dynamicPageItem,
          moduleData,
          message: null,
          statusCode: 200,
        };
      } catch (err) {
        console.error(err);
        error({ statusCode: 500, message: `Error occurred on server.` });
        return { statusCode: 500, message: `Error occurred on server.` };
      }
    }
  },
};
</script>
