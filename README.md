# Agility CMS & Nuxt.js Starter

This is sample Nuxt.js starter site that uses Agility CMS and aims to be a foundation for building websites using Nuxt.js and Agility CMS.

[Live Website Demo](https://agilitycms-nuxtjs-starter.vercel.app/)

[New to Agility CMS? Sign up for a FREE account](https://agilitycms.com/free)

## About This Starter

- Uses [`@agility/agilitycms-nuxt-module`](https://github.com/agility/agilitycms-nuxt-module) - Agility CMS integration for Nuxt.js that supports Content Sync for ultra-fast build times, full page routing and static rendering, and easy async data loading for additional components.
- Supports full [Page Management](https://help.agilitycms.com/hc/en-us/articles/360055805831).
- Supports Preview Mode.
- Provides a functional structure that loads a Page Templates dynamically, and also dynamically loads and renders appropriate Agility CMS Page Modules (as Vue components).

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

### Recommended Platforms

- **Vercel** - Optimized for Nuxt.js with best-in-class SSR and static generation. [Deploy to Vercel](https://vercel.com)
- **Netlify** - Great support for static generation with native redirect handling. [Deploy to Netlify](https://netlify.com)
- **Azure Static Web Apps** - Enterprise option with serverless functions for dynamic features. See [Azure Static Web Apps Setup](#azure-static-web-apps-optional) below.

[Deploying your Nuxt.js Site](https://help.agilitycms.com/hc/en-us/articles/360060102952)

## Azure Static Web Apps (Optional)

This starter includes optional support for deploying to **Azure Static Web Apps** with dynamic URL redirects handled by serverless Azure Functions.

### Setup for Azure Static Web Apps

If you plan to deploy to Azure Static Web Apps:

1. Install the SWA CLI and dependencies (optional, only if using Azure Static Web Apps):

   ```bash
   npm install -D @azure/static-web-apps-cli concurrently dotenv
   ```

2. The pre-build script will automatically generate redirects from Agility CMS:

   - `api/redirects.json` - Generated list of all redirects from your CMS
   - `api/redirect/index.js` - Azure Function that handles redirect matching
   - `staticwebapp.config.json` - Azure SWA routing configuration (already included in the starter)

3. **Important:** Add your Agility CMS credentials to `.env`:
   ```
   AGILITY_GUID=your-guid
   AGILITY_API_FETCH_KEY=your-api-key
   ```

### Local Development with Azure Static Web Apps Emulation

To test your site locally with Azure Static Web Apps emulation:

```bash
# Terminal 1: Start Nuxt dev server
npm run dev

# Terminal 2: Start SWA CLI (in a new terminal)
npm run dev:swa
```

Then visit `http://localhost:4280` to see your site with Azure Static Web Apps routing rules applied.

**Note:** The pre-build script runs automatically before `npm run build` or `npm run generate` and fetches all redirects from Agility CMS. This handles the 20KB size limit of `staticwebapp.config.json` by storing redirects in a separate JSON file and using an Azure Function to serve them dynamically at runtime.

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
