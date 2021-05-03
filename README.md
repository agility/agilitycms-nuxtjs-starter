# Agility CMS & Nuxt.js Starter

This is sample Nuxt.js starter site that uses Agility CMS and aims to be a foundation for building websites using Nuxt.js and Agility CMS.

[Live Website Demo](https://agilitycms-nuxtjs-starter.vercel.app/)

[New to Agility CMS? Sign up for a FREE account](https://agilitycms.com/free)

## About This Starter

- Uses [`@agility/agilitycms-nuxt-module`](https://github.com/agility/agilitycms-nuxt-module) - Agility CMS integration for Nuxt.js that supports Content Sync for ultra-fast build times, full page routing and static rendering, and easy async data loading for additional components.
- Supports full [Page Management](https://help.agilitycms.com/hc/en-us/articles/360055805831).
- Supports Preview Mode.
- Provides a functional structure that loads a Page Templates dynamically, and also dynamically loads and renders appropriate Agility CMS Page Modules (as React components).

### Tailwind CSS

This starter uses [Tailwind CSS](https://tailwindcss.com/), a simple and lightweight utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.

It also comes equipped with [Autoprefixer](https://www.npmjs.com/package/autoprefixer), a plugin which use the data based on current browser popularity and property support to apply CSS prefixes for you.

## Getting Started

To start using the Agility CMS & Gatsby Starter, [sign up](https://agilitycms.com/free) for a FREE account and create a new Instance using the Blog Template.

1. Clone this repository
2. Run `npm install` or `yarn install`
3. Rename the `.env.example` file to `.env`
4. Retrieve your `GUID` & `API Keys (Preview/Fetch)` from Agility CMS by going to [Settings > API Keys](https://manager.agilitycms.com/settings/apikeys).

[How to Retrieve your GUID and API Keys from Agility](https://help.agilitycms.com/hc/en-us/articles/360031919212-Retrieving-your-API-Key-s-Guid-and-API-URL-)

## Running the Site Locally

When running your site in `development` mode, you will see the latest content in from the CMS.

#### yarn

1. `yarn install`
2. `yarn dev`

#### npm

1. `npm install`
2. `npm run dev`

### Production Mode

When running your site in `production` mode, you will see the published from the CMS.

- `build` => This will build your site with webpack and minify the JS and CSS for production.
- `generate` => This will build your site and generate every route as an HTML file (used for static hosting).
- `start` => This will spin up a production server for your site.

#### yarn

1. `yarn build`
2. `yarn generate`
3. `yarn start`

#### npm

1. `npm run build`
2. `npm run generate`
3. `npm run start`

## Deploying Your Site

Nuxt.js allows you to deploy your site as a `statically generated` site or as a `server-side rendered` site.

[Deploying your Nuxt.js Site](https://help.agilitycms.com/hc/en-us/articles/360060102952)

## Notes

### How to Register Page Modules

To create a new Page Module, create a new Vue component within the `src/components/agility-pageModules` directory. Make sure the Vue component for the Page Module matches the name of the Page Module in the CMS.

Example of `RichTextArea.vue` Page Module:

```
<template>
  <div class="relative px-8">
    <div class="max-w-2xl mx-auto my-12 md:mt-18 lg:mt-20">
      <div class="prose max-w-full mx-auto" v-html="item.fields.textblob" />
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
};
</script>
```

### How to Register Page Templates

To create a new Page Template, create a new Vue component within the `src/components/agility-pageTemplates` directory. Make sure the Vue component for the Page Template matches the name of the Page Template in the CMS.

Example of `MainTemplate.vue` Page Template:

```
<template>
  <ContentZone
    name="MainContentZone"
    :page="page"
    :pageInSitemap="pageInSitemap"
    :dynamicPageItem="dynamicPageItem"
    :moduleData="moduleData"
  />
</template>

<script>
import ContentZone from "../../AgilityContentZone";
export default {
  props: {
    page: Object,
    moduleData: Object,
    pageInSitemap: Object,
    dynamicPageItem: Object,
  },
  components: {
    ContentZone,
  },
};
</script>
```

## Resources

### Agility CMS

- [Official site](https://agilitycms.com)
- [Documentation](https://help.agilitycms.com/hc/en-us)

### Nuxt.js

- [Official site](https://nuxtjs.org/)
- [Documentation](https://nuxtjs.org/docs/2.x/get-started/installation)

### Tailwind CSS

- [Official site](http://tailwindcss.com/)
- [Documentation](http://tailwindcss.com/docs)

### Community

- [Official Slack](https://join.slack.com/t/agilitycommunity/shared_invite/enQtNzI2NDc3MzU4Njc2LWI2OTNjZTI3ZGY1NWRiNTYzNmEyNmI0MGZlZTRkYzI3NmRjNzkxYmI5YTZjNTg2ZTk4NGUzNjg5NzY3OWViZGI)
- [Blog](https://agilitycms.com/resources/posts)
- [GitHub](https://github.com/agility)
- [Forums](https://help.agilitycms.com/hc/en-us/community/topics)
- [Facebook](https://www.facebook.com/AgilityCMS/)
- [Twitter](https://twitter.com/AgilityCMS)

## Feedback and Questions

If you have feedback or questions about this starter, please use the [Github Issues](https://github.com/agility/agilitycms-gatsby-starter/issues) on this repo, join our [Community Slack Channel](https://join.slack.com/t/agilitycommunity/shared_invite/enQtNzI2NDc3MzU4Njc2LWI2OTNjZTI3ZGY1NWRiNTYzNmEyNmI0MGZlZTRkYzI3NmRjNzkxYmI5YTZjNTg2ZTk4NGUzNjg5NzY3OWViZGI) or create a post on the [Agility Developer Community](https://help.agilitycms.com/hc/en-us/community/topics).
