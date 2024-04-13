<script lang="ts">
	import DeviceAction from '$lib/components/ActionDevice.svelte';

	export let action: Action;
	export let bindable: boolean;

	let nameHtml = action.name.replaceAll('_', '_<wbr>');

	let { mouse, keyboard, joystick, gamepad, defaultBindings } = action;
</script>

<div
	class="m-0.5 ml-0 flex items-center px-2 py-0.5 font-mono text-base-subtle {!bindable
		? 'text-opacity-50'
		: ''}"
	title={action.name}
>
	{@html nameHtml}
</div>
<div
	class="m-0.5 ml-0 flex items-center px-2 py-0.5 text-base {!bindable ? 'text-opacity-50' : ''}"
>
	{action.attributes.labelLocal || ''}
</div>
<DeviceAction
	class="m-0.5 flex items-center justify-between rounded-sm border border-solid border-base border-opacity-5 px-2 py-1"
	button={mouse.button}
	axis={mouse.axis}
	defaultBinding={defaultBindings.mouse}
/>
<DeviceAction
	class="m-0.5 flex items-center justify-between rounded-sm border border-solid border-base border-opacity-5 px-2 py-1"
	button={keyboard.button}
	axis={keyboard.axis}
	defaultBinding={defaultBindings.keyboard}
/>
<DeviceAction
	class="m-0.5 flex items-center justify-between rounded-sm border border-solid border-base border-opacity-5 px-2 py-1"
	button={gamepad.button}
	axis={gamepad.axis}
	defaultBinding={defaultBindings.gamepad}
/>
<DeviceAction
	class="m-0.5 mr-1 flex items-center justify-between rounded-sm border border-solid border-base border-opacity-5 px-2 py-1"
	button={joystick.button}
	axis={joystick.axis}
	defaultBinding={defaultBindings.joystick}
/>
