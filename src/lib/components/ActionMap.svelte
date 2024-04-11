<script lang="ts">
	import InputTypeIcons from '$lib/components/InputTypeIcons.svelte';
	import type { ActionMapData } from '$lib/data/json-builder';

	export let actionMap: ActionMapData;

	const bgColorer = (prop: boolean | null) => {
		return prop ? 'bg-green-500' : prop === null ? 'bg-slate-100' : 'bg-red-300';
	};
</script>

<div class="w-full overflow-hidden rounded-lg border">
	<div class="w-full {bgColorer(actionMap.info.mouseKeyboardVisible)} p-2 font-semibold">
		{actionMap.attributes.labelLocal || actionMap.name} - {actionMap.attributes.categoryLocal ||
			actionMap.attributes.categoryRaw}  ({actionMap.actions.length})
	</div>
	<div class="grid grid-cols-6 p-2 grid-rows-{actionMap.actions.length + 1}">
		<div class="col-start-3 border-b border-b-black">Mouse</div>
		<div class="col-start-4 border-b border-b-black">Keyboard</div>
		<div class="col-start-5 border-b border-b-black">Gamepad</div>
		<div class="col-start-6 border-b border-b-black">Joystick</div>
		{#each actionMap.actions as action, index}
			<div
				class="col-span-2 col-start-1 row-start-{index +
					2} m-0.5 flex select-none justify-between px-2 py-0.5"
				title={action.name}
			>
				{action.attributes.labelLocal || action.name}
			</div>
			<div
				class="col-start-3 {bgColorer(
					action.mouse.bindable,
				)} m-0.5 flex justify-between px-2 py-0.5"
			>
				{#if action.mouse.bindable !== false}
					<InputTypeIcons deviceInfo={action.mouse}/>
				{/if}
				{action.defaultBindings.mouse || ''}
			</div>
			<div
				class="col-start-4 {bgColorer(
					action.keyboard.bindable,
				)} m-0.5 flex justify-between px-2 py-0.5"
			>
				{#if action.keyboard.bindable !== false}
					<InputTypeIcons deviceInfo={action.keyboard}/>
				{/if}
				{action.defaultBindings.keyboard || ''}
			</div>
			<div
				class="col-start-5 {bgColorer(
					action.gamepad.bindable,
				)} m-0.5 flex justify-between px-2 py-0.5"
			>
				{#if action.gamepad.bindable !== false}
					<InputTypeIcons deviceInfo={action.gamepad}/>
				{/if}
				{action.defaultBindings.gamepad || ''}
			</div>
			<div
				class="col-start-6 {bgColorer(
					action.joystick.bindable,
				)} m-0.5 flex justify-between px-2 py-0.5"
			>
				{#if action.joystick.bindable !== false}
					<InputTypeIcons deviceInfo={action.joystick}/>
				{/if}
				{action.defaultBindings.joystick || ''}
			</div>
		{/each}
	</div>
</div>
