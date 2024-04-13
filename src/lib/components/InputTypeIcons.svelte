<script lang="ts">
	import AxesIcon from '$lib/assets/images/axes.svelte';
	import ButtonIcon from '$lib/assets/images/button.svelte';
	import UnknownIcon from '$lib/assets/images/unknown.svelte';

	import { colors } from '../../theme/colors';

	let color = colors.primary;

	export let deviceInfo: InputInfo;
</script>

<span class="my-1 mr-1 flex">
	{#if deviceInfo.button}
		<ButtonIcon {color} />
	{:else if deviceInfo === null}
		<UnknownIcon {color} />
	{/if}
	{#if deviceInfo.axis}
		<AxesIcon {color} />
	{:else if deviceInfo === null}
		<UnknownIcon {color} />
	{/if}
</span>
