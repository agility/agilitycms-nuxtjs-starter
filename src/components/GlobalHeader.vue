<template>
	<!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
	<!-- This example requires Tailwind CSS v1.4.0+ -->

	<div class="relative bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6">
			<div class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
				<div class="lg:w-0 lg:flex-1">
					<NuxtLink to="/" class="flex">
						<template v-if="contentItem.logo">
							<img
								class="h-8 w-auto sm:h-10"
								:src="contentItem.logo.url"
								:alt="contentItem.logo.label"
								:title="contentItem.siteName"
							/>
						</template>
					</NuxtLink>
				</div>
				<div class="-mr-2 -my-2 md:hidden">
					<button
						@click="toggle"
						type="button"
						class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
					>
						<!-- Heroicon name: menu -->
						<svg
							class="h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
				</div>
				<nav class="hidden md:flex space-x-10">
					<template v-for="navitem in links">
						<NuxtLink
							:key="navitem.path"
							:to="navitem.path"
							class="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150"
						>
							{{ navitem.text }}
						</NuxtLink>
					</template>
				</nav>
				<div class="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
					<template v-if="contentItem.primaryCTA">
						<span class="inline-flex rounded-md shadow-sm">
							<a
								:href="contentItem.primaryCTA.href"
								:target="contentItem.primaryCTA.target"
								class="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
							>
								{{ contentItem.primaryCTA.text }}
							</a>
						</span>
					</template>
				</div>
			</div>
		</div>

		<!--
	Mobile menu, show/hide based on mobile menu state.

	Entering: "duration-200 ease-out"
	  From: "opacity-0 scale-95"
	  To: "opacity-100 scale-100"
	Leaving: "duration-100 ease-in"
	  From: "opacity-100 scale-100"
	  To: "opacity-0 scale-95"
  -->

		<transition
			enter-active-class="transition ease-out duration-100"
			enter-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<div class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-20" v-show="isOpen">
				<div class="rounded-lg shadow-lg">
					<div class="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
						<div class="pt-5 pb-6 px-5 space-y-6">
							<div class="flex items-center justify-between">
								<div>
									<template v-if="contentItem.logo">
										<img
											class="h-8 w-auto sm:h-10"
											:src="contentItem.logo.url"
											:alt="contentItem.logo.label"
											:title="contentItem.siteName"
										/>
									</template>
								</div>
								<div class="-mr-2">
									<button
										@click="toggle"
										type="button"
										class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
									>
										<!-- Heroicon name: x -->
										<svg
											class="h-6 w-6"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
										</svg>
									</button>
								</div>
							</div>
							<div>
								<nav class="grid gap-y-8">
									<template v-for="navitem in links">
										<NuxtLink
											:key="navitem.path"
											:to="navitem.path"
											class="-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
										>
											<svg
												class="flex-shrink-0 h-6 w-6 text-indigo-600"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
												/>
											</svg>
											<div class="text-base leading-6 font-medium text-gray-900">
												{{ navitem.text }}
											</div>
										</NuxtLink>
									</template>
								</nav>
							</div>
						</div>

						<div class="space-y-6 p-2">
							<span class="w-full flex rounded-md shadow-sm">
								<template v-if="contentItem.primaryCTA">
									<a
										:href="contentItem.primaryCTA.href"
										:target="contentItem.primaryCTA.target"
										class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
									>
										{{ contentItem.primaryCTA.text }}
									</a>
								</template>
							</span>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			isOpen: false,
			contentItem: null,
			links: [],
		};
	},
	watch: {
      $route() {
		//when the route changes, make sure the mobile menu is hidden
        this.isOpen = false;
      },
    },
	methods: {
		toggle() {
			this.isOpen = !this.isOpen;
		}
	},
	async fetch() {
		if (process.server) {
			let contentItem = null;
			let links = [];
			const languageCode = this.$agility.languages[0];

			try {
				//get the global header
				let contentItemList = await this.$agility.client.getContentList({
					referenceName: "globalheader",
					languageCode,
				});

				if (contentItemList && contentItemList.length) {
					contentItem = contentItemList[0];
				}
			} catch (error) {
				if (console) console.error("Could not load global header item.", error);
			}

			try {
				//get the nested sitemap
				let sitemap = await this.$agility.client.getSitemapNested({
					channelName: this.$agility.channelName,
					languageCode,
				});

				//grab the top level links that are visible on menu
				links = sitemap
					.filter((node) => node.visible.menu)
					.map((node) => {
						return {
							text: node.menuText || node.title,
							path: node.path,
						};
					});
			} catch (error) {
				if (console) console.error("Could not load nested sitemap.", error);
			}

			this.contentItem = contentItem.fields;
			this.links = links;
		}
	},

};
</script>
