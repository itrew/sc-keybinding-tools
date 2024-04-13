<script lang="ts">
	import AxesIcon from '$lib/assets/images/axes.svelte';
	import ButtonIcon from '$lib/assets/images/button.svelte';
	import UnknownIcon from '$lib/assets/images/unknown.svelte';

	import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../theme/colors';

	export let deviceInfo: InputInfo;
</script>

<span class="flex gap-x-1">
	{#if deviceInfo.button}
		<ButtonIcon color={COLOR_PRIMARY.hex()} />
	{:else if deviceInfo.button === null}
		<UnknownIcon color={COLOR_PRIMARY.alpha(0.4).hsl().string()} />
	{/if}
	{#if deviceInfo.axis}
		<AxesIcon color={COLOR_PRIMARY.hex()} />
	{:else if deviceInfo.axis === null}
		<UnknownIcon color={COLOR_PRIMARY.alpha(0.4).hsl().string()} />
	{/if}
</span>
