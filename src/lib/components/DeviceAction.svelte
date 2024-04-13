<script lang="ts">
	import AxesIcon from '$lib/components/icons/axes.svelte';
	import ButtonIcon from '$lib/components/icons/button.svelte';
	import UnknownIcon from '$lib/components/icons/unknown.svelte';
	import { COLOR_PRIMARY } from '../../theme/colors';

	export let button: boolean | null;
	export let axis: boolean | null;
	export let defaultBinding: string = '';

	let bindable = button || axis ? true : button === false && axis === false ? false : null;
	let backgroundColor = bindable ? 'bg-surface-2' : '';
</script>

<div
	class="m-0.5 px-2 py-1 flex justify-between items-center border border-solid border-base border-opacity-5 rounded-sm {backgroundColor}"
>
	<span class="flex gap-x-1">
		{#if button}
			<ButtonIcon color={COLOR_PRIMARY.hex()} />
		{:else if button === null}
			<UnknownIcon color={COLOR_PRIMARY.alpha(0.4).hsl().string()} />
		{/if}
		{#if axis}
			<AxesIcon color={COLOR_PRIMARY.hex()} />
		{:else if axis === null}
			<UnknownIcon color={COLOR_PRIMARY.alpha(0.4).hsl().string()} />
		{/if}
	</span>
	<div class="font-mono text-base-subtle {!bindable ? 'text-opacity-20' : ''}">
		{defaultBinding || ''}
	</div>
</div>
