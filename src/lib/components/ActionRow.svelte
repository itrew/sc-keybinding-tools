<script lang="ts">
	import DeviceAction from '$lib/components/ActionDevice.svelte';

	export let action: Action;
	export let bindable: boolean;

	let nameHtml = action.name.replaceAll('_', '_<wbr>');

	let { mouse, keyboard, joystick, defaultBindings } = action;
</script>

<div
	class="m-0.5 flex items-center px-2 py-0.5 font-mono text-base-subtle {!bindable
		? 'text-opacity-20'
		: ''}"
	title={action.name}
>
	{@html nameHtml}
</div>
<div class="m-0.5 flex items-center px-2 py-0.5 text-base {!bindable ? 'text-opacity-20' : ''}">
	{action.attributes.labelLocal || ''}
</div>
<DeviceAction button={mouse.button} axis={mouse.axis} defaultBinding={defaultBindings.mouse} />
<DeviceAction
	button={keyboard.button}
	axis={keyboard.axis}
	defaultBinding={defaultBindings.keyboard}
/>
<DeviceAction
	button={joystick.button}
	axis={joystick.axis}
	defaultBinding={defaultBindings.joystick}
/>
