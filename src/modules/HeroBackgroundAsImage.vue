<template>
	<section class="my-6 relative bg-white overflow-hidden">
		<div class="max-w-screen-xl mx-auto">
			<div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
				<svg
					class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
					fill="currentColor"
					viewBox="0 0 100 100"
					preserveAspectRatio="none"
				>
					<polygon points="50,0 100,0 50,100 0,100" />
				</svg>

				<div class="relative pt-6 px-4 sm:px-6 lg:px-8"></div>

				<div class="mt-10 mx-auto max-w-screen-xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
					<div class="sm:text-center lg:text-left">
						<h2
							class="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl"
						>
							{{ fields.title }}
							<br class="xl:hidden" />
							<span class="text-indigo-600">{{ fields.subTitle }}</span>
						</h2>
						<p
							class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
						>
							{{ fields.announcement }}
						</p>
						<div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
							<div class="rounded-md shadow">
								<a
									:href="fields.primaryCTA.href"
									:target="fields.primaryCTA.target"
									class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
								>
									{{ fields.primaryCTA.text }}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
			<picture class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full">
				<source :srcset="fields.backgroundImage.url + '?q=60&w=1200'" media="(min-width: 1400px)" />
				<source :srcset="fields.backgroundImage.url + '?q=60&w=800'" media="(min-width: 1000px)" />
				<img
					class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
					:src="fields.backgroundImage.url + '?q=60&w=500'"
					:alt="fields.backgroundImage.label"
					loading="lazy"
				/>
			</picture>
		</div>
	</section>
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
	computed: {
		fields: function() {
			return this.item.fields;
		},
	}
};
</script>
