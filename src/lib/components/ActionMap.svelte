<script lang="ts">
	import DeviceAction from './DeviceAction.svelte';

	export let actionMap: ActionMap;

	let label: string = actionMap.attributes.labelLocal || actionMap.name;
	let actionCount: number = actionMap.actions.length;

	let bindable: boolean | null =
		actionMap.info.mouseKeyboardVisible ||
		actionMap.info.gamepadVisible ||
		actionMap.info.joystickVisible;
</script>

<div
	class="mb-4 overflow-hidden rounded-lg border border-solid border-base border-opacity-10 bg-surface-1"
>
	<div class="flex justify-between bg-surface-2 p-2 align-bottom">
		<div class="text-lg font-semibold text-base-emphasized">{label}</div>
		<div class="text-base-subtle">({actionCount})</div>
	</div>
	<div class="grid grid-cols-5">
		<div class="bg-surface-3 p-2 text-xs text-base-subtle">Action</div>
		<div class="bg-surface-3 p-2 text-xs text-base-subtle">Label</div>
		<div class="bg-surface-3 p-2 text-xs text-base-subtle">Mouse</div>
		<div class="bg-surface-3 p-2 text-xs text-base-subtle">Keyboard</div>
		<div class="bg-surface-3 p-2 text-xs text-base-subtle">Joystick</div>
		{#each actionMap.actions as action}
			<div
				class="m-0.5 flex items-center px-2 py-0.5 font-mono text-base-subtle"
				title={action.name}
			>
				{@html action.name.replaceAll('_', '_<wbr>')}
			</div>
			<div class="m-0.5 flex items-center px-2 py-0.5">
				{action.attributes.labelLocal || ''}
			</div>
			<DeviceAction device="mouse" {action} />
			<DeviceAction device="keyboard" {action} />
			<DeviceAction device="joystick" {action} />
		{/each}
	</div>
</div>
