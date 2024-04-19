<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	import type { DeviceInfo } from '$lib/classes/Action';

	export let deviceBindable: boolean | null;
	export let deviceInfo: DeviceInfo;
	export let defaultBinding: string = '';

	let { button, axis } = deviceInfo;

	let backgroundColor = deviceBindable ? 'bg-surface-2' : '';
	let opacity = deviceBindable ? 1 : 0.45;
</script>

<div
	class="flex items-center gap-x-1 rounded-sm border border-solid border-base border-opacity-5 px-2 py-1 {backgroundColor} text-primary"
>
	{#if button}
		<Icon icon="button" {opacity} />
	{:else if button === null}
		<Icon icon="unknown-button" {opacity} />
	{/if}
	{#if axis}
		<Icon icon="axis" {opacity} />
	{:else if axis === null}
		<Icon icon="unknown-axis" {opacity} />
	{/if}
	{#if defaultBinding}
		<div class="grow text-right font-mono text-base-subtle {deviceBindable ? '' : 'opacity-45'}">
			{defaultBinding}
		</div>
	{/if}
</div>
