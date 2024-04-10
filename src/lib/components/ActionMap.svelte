<script lang="ts">
	import axesIcon from '$lib/assets/images/axes.svg';
	import buttonIcon from '$lib/assets/images/button.svg';
	import type { ActionMapData } from '$lib/data/json-builder';

	export let actionMap: ActionMapData;

	const bgColorer = (prop: boolean | null) => {
		return prop ? 'bg-green-500' : prop === null ? 'bg-slate-100' : 'bg-red-300';
	};
</script>

<div class="w-full overflow-hidden rounded-lg border">
	<div class="w-full {bgColorer(actionMap.info.mouseKeyboardVisible)} p-2 font-semibold">
		{actionMap.attributes.labelLocal || actionMap.name} - {actionMap.attributes.categoryLocal ||
			actionMap.attributes.categoryRaw}
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
				{#if action.info.inputType}
					<img
						height="20"
						width="20"
						class="ml-3 self-center"
						alt="input type"
						src={action.info.inputType === 'axis' ? axesIcon : buttonIcon}
					/>
				{/if}
			</div>
			<div class="col-start-3 {bgColorer(action.info.mouseBindable)} m-0.5 px-2 py-0.5">
				{action.defaultBindings.mouse || ''}
			</div>
			<div class="col-start-4 {bgColorer(action.info.keyboardBindable)} m-0.5 px-2 py-0.5">
				{action.defaultBindings.keyboard || ''}
			</div>
			<div class="col-start-5 {bgColorer(action.info.gamepadBindable)} m-0.5 px-2 py-0.5">
				{action.defaultBindings.gamepad || ''}
			</div>
			<div class="col-start-6 {bgColorer(action.info.joystickBindable)} m-0.5 px-2 py-0.5">
				{action.defaultBindings.joystick || ''}
			</div>
		{/each}
	</div>
</div>
