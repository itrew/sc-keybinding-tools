<script lang="ts">
	import AxesIcon from '$lib/components/icons/AxesIcon.svelte';
	import ButtonIcon from '$lib/components/icons/ButtonIcon.svelte';
	import UnknownIcon from '$lib/components/icons/UnknownIcon.svelte';
	import { isDeviceBindable } from '$lib/util';
	import { COLOR_PRIMARY } from '../../theme/colors';

	export let button: boolean | null;
	export let axis: boolean | null;
	export let defaultBinding: string = '';
	let classNames: string = '';
	export { classNames as class };

	let bindable = isDeviceBindable({ button, axis });
	let backgroundColor = bindable ? 'bg-surface-2' : '';
</script>

<div class="{classNames} {backgroundColor} ">
	<span class="flex gap-x-1">
		{#if button}
			<ButtonIcon color={COLOR_PRIMARY.hex()} />
		{:else if button === null}
			<UnknownIcon color={COLOR_PRIMARY.alpha(0.4).hsl().string()} inputType="button" />
		{/if}
		{#if axis}
			<AxesIcon color={COLOR_PRIMARY.hex()} />
		{:else if axis === null}
			<UnknownIcon color={COLOR_PRIMARY.alpha(0.4).hsl().string()} inputType="axis" />
		{/if}
	</span>
	<div class="font-mono text-base-subtle {!bindable ? 'text-opacity-50' : ''}">
		{defaultBinding || ''}
	</div>
</div>
