<script lang="ts">
	import ActionRow from './ActionRow.svelte';
	import { isActionBindable } from '$lib/util';

	export let actionMap: ActionMap;

	let label: string = actionMap.attributes.labelLocal || actionMap.name;
	let actionCount: number = actionMap.actions.length;
	let actions = actionMap.actions.sort((a, b) => +isActionBindable(b) - +isActionBindable(a));
</script>

<div
	class="mb-4 bg-surface-1 overflow-hidden border border-base border-solid border-opacity-10 rounded-lg"
>
	<div class="p-2 bg-surface-2 flex justify-between items-center">
		<div class="text-lg font-semibold text-base-emphasized" title={actionMap.name}>{label}</div>
		<div class="text-base-subtle">({actionCount} actions)</div>
	</div>
	<div class="grid grid-cols-5">
		<div class="bg-surface-3 p-2 text-xs text-base-subtle">Action</div>
		<div class="bg-surface-3 p-2 text-xs text-base-subtle">In-Game Label</div>
		<div class="bg-surface-3 p-2 text-xs text-base-subtle">Mouse</div>
		<div class="bg-surface-3 p-2 text-xs text-base-subtle">Keyboard</div>
		<div class="bg-surface-3 p-2 text-xs text-base-subtle">Joystick</div>
		{#each actions as action}
			<ActionRow {action} bindable={isActionBindable(action)} />
		{/each}
	</div>
</div>
