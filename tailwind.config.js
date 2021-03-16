// tailwind.config.js
module.exports = {
	purge: [
	  'src/**/*.vue',
	  'layouts/**/*.vue',
	  'pages/**/*.vue'
	],
	theme: {

	},
	plugins: [
		require('@tailwindcss/typography'),
	]
  }