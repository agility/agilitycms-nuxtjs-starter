<template>
	<section class="my-6">

		<div class="text-4xl sm:text-5xl font-black tracking-wide text-center text-gray-900 mb-10">
			{{ post.title }}
		</div>

		<div class="text-center">
			<div class="font-medium text-primary-700">{{ category.title }}</div>
			<div class="font-bold text-lg sm:text-xl lg:text-2xl text-secondary-500 tracking-wide">{{author.name}}</div>
			<div class="">{{ dateStr }}</div>
			<div class="text-gray-700">{{ tagNames }}</div>
			<div class="my-2 flex items-center justify-center">
				<picture class="rounded">
					<source :srcset="`${post.image.url}?w=1024`" media="(min-width: 1400px)" />
					<source :srcset="`${post.image.url}?w=700`" media="(min-width: 1000px)" />
					<img class="rounded" :src="`${post.image.url}?w=400`" :alt="post.image.label" loading="lazy" />
				</picture>
			</div>
		</div>
		<div
			class="p-10 prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-full"
			style="max-width:100%"
			v-html="post.content"
		></div>
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
		post: function() {
			return this.dynamicPageItem.fields;
		},
		dateStr: function() {
			const dt = new Date(this.post.date)
			return dt.toLocaleDateString()
		},
		author: function() {
			return this.post.author.fields
		},
		category: function() {
			return this.post.category.fields
		},
		tagNames: function() {
			return this.post.tags.map(t => t.fields.title).join(",")
		}
	}
};
</script>
