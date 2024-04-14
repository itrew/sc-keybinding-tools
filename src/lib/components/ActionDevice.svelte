<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { isDeviceBindable } from '$lib/util';

	export let button: boolean | null;
	export let axis: boolean | null;
	export let defaultBinding: string = '';

	let bindable = isDeviceBindable({ button, axis });
	let backgroundColor = bindable ? 'bg-surface-2' : '';
	let opacity = bindable ? 1 : 0.45;
</script>

<div class="px-2 py-1 flex gap-x-1 items-center rounded-sm border border-solid border-base border-opacity-5 {backgroundColor} text-primary">
	{#if button}
		<Icon icon="button" {opacity}/>
	{:else if button === null}
		<Icon icon="unknown-button" {opacity}/>
	{/if}
	{#if axis}
		<Icon icon="axis" {opacity}/>
	{:else if axis === null}
		<Icon icon="unknown-axis" {opacity}/>
	{/if}
	{#if defaultBinding}
		<div class="grow text-right font-mono text-base-subtle { bindable ? '' : 'opacity-45'}">
			{defaultBinding}
		</div>
	{/if}
</div>
