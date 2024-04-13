<script lang="ts">
	import ActionRow from './ActionRow.svelte';
	import { isActionBindable } from '$lib/util';

	export let actionMap: ActionMap;

	let label: string = actionMap.attributes.labelLocal || actionMap.name;
	let actionCount: number = actionMap.actions.length;
</script>

<div
	class="mb-4 overflow-hidden rounded-lg border border-solid border-base border-opacity-10 bg-surface-1"
>
	<div class="flex justify-between bg-surface-2 p-2 align-bottom">
		<div class="text-lg font-semibold text-base-emphasized" title={actionMap.name}>{label}</div>
		<div class="text-base-subtle">({actionCount})</div>
	</div>
	<div class="grid grid-cols-5">
		<div class="bg-surface-3 p-2 text-xs text-base-subtle">Action</div>
		<div class="bg-surface-3 p-2 text-xs text-base-subtle">Label</div>
		<div class="bg-surface-3 p-2 text-xs text-base-subtle">Mouse</div>
		<div class="bg-surface-3 p-2 text-xs text-base-subtle">Keyboard</div>
		<div class="bg-surface-3 p-2 text-xs text-base-subtle">Joystick</div>
		{#each actionMap.actions as action}
			<ActionRow {action} bindable={isActionBindable(action)} />
		{/each}
	</div>
</div>
