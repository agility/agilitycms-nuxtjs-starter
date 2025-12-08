<template>
	<footer class="relative px-8 py-6 md:py-4 mt-8 bg-gray-100">
		<div class="max-w-screen-xl mx-auto md:flex md:items-center">
			<div class="text-center mb-4 md:mb-0 md:text-left flex-shrink-0 relative">
				<a href="https://www.agilitycms.com" target="_blank" rel="noreferrer" title="Agility CMS">
					<img src="~/assets/agility-logo.svg" alt="Agility CMS" width="90" height="24" class="mx-auto" />
				</a>
			</div>
			<div class="flex-grow mb-4 md:mb-0">
				<p class="text-center md:text-left text-gray-600 text-xs md:ml-8 md:max-w-3xl">
					Powered by Agility CMS. This website and materials found on it are for demo purposes. You can use this to
					preview the content you created on your Agility CMS account.
					<a
						href="https://github.com/agilitycms/agilitycms-gatsby-starter"
						title="View on GitHub"
						target="_blank"
						rel="noreferrer"
						class="text-gray-600 mr-2 border-b border-gray-600"
					>
						GitHub
					</a>
					<a
						href="https://help.agilitycms.com/hc/en-us"
						title="Help Center"
						target="_blank"
						rel="noreferrer"
						class="text-gray-600 mr-1 border-b border-gray-600"
					>
						Help Center
					</a>
					<a
						href="https://agilitycms.com/contact-us/chat-sales"
						title="Contact Us"
						target="_blank"
						rel="noreferrer"
						class="text-gray-600 border-b border-gray-600"
					>
						Contact Us
					</a>
				</p>
			</div>
			<div class="flex-1-grow"></div>
		</div>
	</footer>
</template>

<script>
export default {
	data: function () {
		return {
			socials: [],
		}
	},
}
</script>
