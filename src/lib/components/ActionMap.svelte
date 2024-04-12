<script lang="ts">
	import DeviceAction from './DeviceAction.svelte';

	export let actionMap: ActionMap;

	let label: string = actionMap.attributes.labelLocal || actionMap.name;
	let actionCount: number = actionMap.actions.length;

	let bindable: boolean | null =
		actionMap.info.mouseKeyboardVisible ||
		actionMap.info.gamepadVisible ||
		actionMap.info.joystickVisible;
	let backgroundColor = bindable
		? 'bg-green-500'
		: bindable === false
			? 'bg-red-300'
			: 'bg-slate-100';
</script>

<div class="w-full overflow-hidden rounded-lg border">
	<div class="flex w-full justify-between p-2 align-bottom {backgroundColor}">
		<div class="font-semibold">{label}</div>
		<div>({actionCount})</div>
	</div>
	<div class="grid grid-cols-5 p-2">
		<div class="col-span-2 col-start-1 mb-2 border-b border-b-black">Action</div>
		<div class="col-start-3 mb-2 border-b border-b-black">Mouse</div>
		<div class="col-start-4 mb-2 border-b border-b-black">Keyboard</div>
		<div class="col-start-5 mb-2 border-b border-b-black">Joystick</div>
		{#each actionMap.actions as action}
			<div
				class="col-span-2 col-start-1 m-0.5 px-2 py-0.5 {action.attributes.labelLocal
					? ''
					: 'font-mono'}"
				title={action.name}
			>
				{action.attributes.labelLocal || action.name}
			</div>
			<DeviceAction device="mouse" {action} />
			<DeviceAction device="keyboard" {action} />
			<DeviceAction device="joystick" {action} />
		{/each}
	</div>
</div>
