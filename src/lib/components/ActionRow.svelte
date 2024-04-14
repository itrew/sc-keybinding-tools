<script lang="ts">
	import DeviceAction from '$lib/components/ActionDevice.svelte';

	export let action: Action;
	export let bindable: boolean;

	let { mouse, keyboard, joystick, gamepad, defaultBindings } = action;
</script>

<div
	class="px-2 self-center font-mono text-base-subtle overflow-hidden {!bindable
		? 'text-opacity-50'
		: ''}"
	title={action.name}
>
	{action.name}
</div>
<div
	class="px-2 self-center text-base {!bindable ? 'text-opacity-50' : ''}"
>
	{action.attributes.labelLocal || ''}
</div>
<DeviceAction
	button={mouse.button}
	axis={mouse.axis}
	defaultBinding={defaultBindings.mouse}
/>
<DeviceAction
	button={keyboard.button}
	axis={keyboard.axis}
	defaultBinding={defaultBindings.keyboard}
/>
<DeviceAction
	button={gamepad.button}
	axis={gamepad.axis}
	defaultBinding={defaultBindings.gamepad}
/>
<DeviceAction
	button={joystick.button}
	axis={joystick.axis}
	defaultBinding={defaultBindings.joystick}
/>
