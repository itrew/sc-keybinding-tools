<script lang="ts">
	import { createCollapsible, melt } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';
	import ActionRow from './ActionRow.svelte';
	import { isActionBindable } from '$lib/util';

	export let actionMap: ActionMap;

	let label: string = actionMap.attributes.labelLocal || actionMap.name;
	let actionCount: number = actionMap.actions.length;

	let bindableActions: Action[] = actionMap.actions.filter((a) => isActionBindable(a));
	let nonBindableActions: Action[] = actionMap.actions.filter((a) => !isActionBindable(a));

	let bindable: boolean = bindableActions.length > 0;

	const {
		elements: { root, content, trigger },
		states: { open },
	} = createCollapsible();
</script>

<div
	class="mb-4 overflow-hidden rounded-lg border border-solid bg-surface-1 {bindable
		? 'border-base border-opacity-10'
		: 'border-error border-opacity-50 opacity-70'}"
>
	<div class="grid p-2 {bindable ? 'grid-cols-2' : 'grid-cols-3'} items-center bg-surface-2">
		<div class="text-lg font-semibold text-base-emphasized" title={actionMap.name}>{label}</div>
		{#if !bindable}
			<div class="justify-self-center text-lg font-semibold uppercase text-error">
				not mappable in game
			</div>
		{/if}
		<div class="justify-self-end text-base-subtle">({actionCount} actions)</div>
	</div>
	<div use:melt={$root} class="grid grid-cols-6 pb-0.5">
		<div class="mb-0.5 bg-surface-3 p-2 text-xs text-base-subtle">Action</div>
		<div class="mb-0.5 bg-surface-3 p-2 text-xs text-base-subtle">In-Game Label</div>
		<div class="mb-0.5 bg-surface-3 p-2 text-xs text-base-subtle">Mouse</div>
		<div class="mb-0.5 bg-surface-3 p-2 text-xs text-base-subtle">Keyboard</div>
		<div class="mb-0.5 bg-surface-3 p-2 text-xs text-base-subtle">Gamepad</div>
		<div class="mb-0.5 bg-surface-3 p-2 text-xs text-base-subtle">Joystick</div>
		{#if bindable}
			{#each bindableActions as action}
				<ActionRow {action} bindable={true} />
			{/each}
			{#if nonBindableActions.length > 0}
				<div use:melt={$trigger} class="col-span-6 p-2 text-xs text-error opacity-70">
					Actions not mappable in game ({nonBindableActions.length})
				</div>
				{#if $open}
					<div use:melt={$content} transition:slide class="col-span-6 grid grid-cols-subgrid">
						{#each nonBindableActions as action}
							<ActionRow {action} bindable={false} />
						{/each}
					</div>
				{/if}
			{/if}
		{:else}
			{#each nonBindableActions as action}
				<ActionRow {action} bindable={false} />
			{/each}
		{/if}
	</div>
</div>
