<script lang="ts">
	import DeviceAction from '$lib/components/ActionDevice.svelte';

	import type { Action } from '$lib/classes/Action';

	export let action: Action;

	let { actionBindable, defaultBindings } = action;
</script>

<div
	class="self-center overflow-hidden px-2 font-mono text-base-subtle {!actionBindable
		? 'text-opacity-50'
		: ''}"
	title={action.name}
>
	{action.name}
</div>
<div class="self-center px-2 text-base {!actionBindable ? 'text-opacity-50' : ''}">
	{action.attributes.labelLocal || ''}
</div>
<DeviceAction
	deviceInfo={action.mouse}
	deviceBindable={action.mouseBindable}
	defaultBinding={defaultBindings.mouse}
/>
<DeviceAction
	deviceInfo={action.keyboard}
	deviceBindable={action.keyboardBindable}
	defaultBinding={defaultBindings.keyboard}
/>
<DeviceAction
	deviceInfo={action.gamepad}
	deviceBindable={action.gamepadBindable}
	defaultBinding={defaultBindings.gamepad}
/>
<DeviceAction
	deviceInfo={action.joystick}
	deviceBindable={action.joystickBindable}
	defaultBinding={defaultBindings.joystick}
/>
