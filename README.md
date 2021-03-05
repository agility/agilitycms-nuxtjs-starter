# Agility CMS + Nuxt -> Blog
This is a sample blog with Nuxt and Agility CMS.  You can use this as a starting point to build a fully-featured Nuxt website with Agility CMS.

## Builds:

-  https://agility-nuxt-blog.netlify.app/
  - [![Netlify Status](https://api.netlify.com/api/v1/badges/15e7f60a-2e09-4087-a85a-c2413c14a092/deploy-status)](https://app.netlify.com/sites/agility-nuxt-blog/deploys)

## Getting Started
Nuxt and Agility CMS? Oh ya, let's go!

### Agility CMS Account
The first thing you need is a free Agility CMS account. [You can get that here 👋](https://manager.agilitycms.com/org/subscriptions/instance-setup?template=blog-with-nextjs&plan=agility-free).
Since this Nuxt starter is so ✨new✨, we don't have an Official Starter package for it, so for now, we're linking to our NextJS starter, which happens to have the right content model for this 🧐.

### Clone the Repo

Now that you've got the **content**, *you need the `code`!*

Go ahead and clone the repo from github: 👇
```shell
git clone https://github.com/agility/agility-nuxt-blog.git
```

### Install Dependencies

`npm install` or `yarn install`

Normally, this will create 9,999,999,999 files in your `node_modules` folder.  Luckily, we're only gonna create 9,999,999 for this small demo.

 YAY! 👏👏👏


### Environment Variables
You care about the environment don't you? 🌲🌳🌴🎋

Either way, you're gonna need to grab a few variables from your Agility CMS account.  Head over to the [API Keys page](https://manager.agilitycms.com/settings/apikeys) in Agility CMS (https://manager.agilitycms.com/settings/apikeys) and grab your GUID, and API Keys for Preview and Fetch.

- Rename `.env.example` file to `.env`
- Edit `.env` and add your guid and api key

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

This will also load the latest (staging mode) content from Agility CMS.  When you change content in the CMS, simply restart the dev server those changes updated in the site.

### KNOWN ISSUE IN DEVELOPMENT
The site is optimized for Static mode, and uses the Link tag as much as possible, however, when running in local dev mode, some of the Link tags (as are used on the blog post listing and the top header) don't work until you refresh the page.

We're waiting patiently for a version of Nuxt that avoids this problem...

### `$agilitycms` Service
Your Agility CMS content is loaded using the `$agilitycms.client`.  This utilizes the `@agility/agilitycms-nuxt-module` package, and is only available on the server.

## Build

Run `npm run generate` or `yarn generate` to generate the static version of the site. The pages and data will be stored in the `dist/` directory.

## Further help

### Nuxt
To get more help with Nuxt, check out the docs [Nuxtjs.org](https://nuxtjs.org/).

### Agility CMS
To get help with Agility CMS, reach out to us on our website https://agilitycms.com
