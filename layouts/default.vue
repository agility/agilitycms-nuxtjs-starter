<template>
	<div>
		<preview-bar/>
		<global-header/>
	<Nuxt />
	</div>
</template>

<script>
import GlobalHeader from '../src/components/GlobalHeader.vue';
import PreviewBar from '../src/components/PreviewBar.vue';
export default {
	components: {
		GlobalHeader,
		PreviewBar
	}

}

</script>
