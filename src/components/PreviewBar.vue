<template>
	<div v-if="isPreviewMode" class="bg-indigo-600">
		<div class="max-w-screen-xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between flex-wrap">
				<div class="w-0 flex-1 flex items-center">
					<span class="flex p-2 rounded-lg bg-indigo-800">
						<img src="https://static.agilitycms.com/brand/agility-triangle-yellow.svg" alt="" class="w-5 h-5" />
					</span>
					<p class="ml-3 font-medium text-white truncate">
						<span class="md:hidden">
							Agility CMS - Preview Mode
						</span>
						<span class="hidden md:inline">
							Agility CMS - You are view this site in Preview Mode
						</span>
					</p>
				</div>

				<div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
					<button
						@click="toggle"
						type="button"
						class="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 sm:-mr-2 transition ease-in-out duration-150"
						aria-label="Dismiss"
					>
						<!-- Heroicon name: x -->
						<svg
							class="h-6 w-6 text-white"
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
		</div>
	</div>
</template>
<script>
export default {
	data: function() {
		return {
			isPreviewMode: false
		};
	},
	 methods: {
	 	toggle() {
			this.isPreviewMode = false
	 	},
	 },
	async fetch() {

		if (process.server) {
			console.log("on servers")
			this.isPreviewMode = this.$root.context.isDev
		}
	},
	mounted() {
		console.log("IsPreview", this.isPreviewMode)
	}
};
</script>
