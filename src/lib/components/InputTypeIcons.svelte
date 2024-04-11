<script lang="ts">
	import axesIcon from '$lib/assets/images/axes.svg';
	import buttonIcon from '$lib/assets/images/button.svg';
	import unknownIcon from '$lib/assets/images/unknown.svg';
	import type { InputInfo } from '$lib/data/json-builder';

	export let deviceInfo: InputInfo;
</script>

<span class="flex self-center">
	{#if deviceInfo.button !== false}
		<img
			height="20"
			width="20"
			class="mr-1 self-center"
			alt="button"
			src={deviceInfo.button ? buttonIcon : unknownIcon}
		/>
	{/if}
	{#if deviceInfo.axis !== false}
		<img
			height="20"
			width="20"
			class="mr-1 self-center"
			alt="axis"
			src={deviceInfo.axis ? axesIcon : unknownIcon}
		/>
	{/if}
</span>
