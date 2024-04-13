<script lang="ts">
	import ActionRow from './ActionRow.svelte';
	import { isActionBindable } from '$lib/util';

	export let actionMap: ActionMap;
	export let bindable: boolean;

	let label: string = actionMap.attributes.labelLocal || actionMap.name;
	let actionCount: number = actionMap.actions.length;
	let actions = [...actionMap.actions].sort((a, b) => +isActionBindable(b) - +isActionBindable(a));
</script>

<div
	class="mb-4 overflow-hidden rounded-lg border border-solid bg-surface-1 {bindable
		? 'border-base border-opacity-10'
		: 'border-error border-opacity-50 opacity-70'}"
>
	<div class="p-2 grid {bindable ? 'grid-cols-2' : 'grid-cols-3'} bg-surface-2 items-center">
		<div class="text-lg font-semibold text-base-emphasized" title={actionMap.name}>{label}</div>
		{#if !bindable}
			<div class="justify-self-center text-lg font-semibold text-error uppercase">not mappable in game</div>
		{/if}
		<div class="justify-self-end text-base-subtle">({actionCount} actions)</div>
	</div>
	<div class="grid grid-cols-6 pb-0.5">
		<div class="mb-0.5 bg-surface-3 p-2 text-xs text-base-subtle">Action</div>
		<div class="mb-0.5 bg-surface-3 p-2 text-xs text-base-subtle">In-Game Label</div>
		<div class="mb-0.5 bg-surface-3 p-2 text-xs text-base-subtle">Mouse</div>
		<div class="mb-0.5 bg-surface-3 p-2 text-xs text-base-subtle">Keyboard</div>
		<div class="mb-0.5 bg-surface-3 p-2 text-xs text-base-subtle">Gamepad</div>
		<div class="mb-0.5 bg-surface-3 p-2 text-xs text-base-subtle">Joystick</div>
		{#each actions as action}
			<ActionRow {action} bindable={isActionBindable(action)} />
		{/each}
	</div>
</div>
