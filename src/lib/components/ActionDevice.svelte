<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { isDeviceBindable } from '$lib/util';

	export let button: boolean | null;
	export let axis: boolean | null;
	export let defaultBinding: string = '';

	let bindable = isDeviceBindable({ button, axis });
	let backgroundColor = bindable ? 'bg-surface-2' : '';
</script>

<div class="px-2 py-1 flex items-center justify-between rounded-sm border border-solid border-base border-opacity-5 {backgroundColor} ">
	{#if button !== false || axis !== false}
		<span class="flex gap-x-1 text-primary {!bindable ? 'opacity-60' : ''}">
			{#if button}
				<Icon icon="button" />
			{:else if button === null}
				<Icon icon="unknown-button" />
			{/if}
			{#if axis}
				<Icon icon="axis" />
			{:else if axis === null}
				<Icon icon="unknown-axis" />
			{/if}
		</span>
	{/if}
	{#if defaultBinding}
		<div class="font-mono text-base-subtle {!bindable ? 'text-opacity-50' : ''}">
			{defaultBinding}
		</div>
	{/if}
</div>
