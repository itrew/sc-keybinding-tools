<script lang="ts">
	import InputTypeIcons from '$lib/components/InputTypeIcons.svelte';

	export let device: InputDevice;
	export let action: Action;

	let columnClass: string = '';
	$: {
		switch (device) {
			case 'mouse':
				columnClass = 'col-start-3';
				break;
			case "keyboard":
				columnClass = 'col-start-4';
				break;
			case "joystick":
				columnClass = 'col-start-5';
				break;
		}
	}

	let inputInfo = action[device];
	let bindable: boolean | null = inputInfo.button || inputInfo.axis ? true : inputInfo.button === false && inputInfo.axis === false ? false : null;
	let backgroundColor = bindable ? 'bg-green-500' : bindable === false ? 'bg-red-300' :'bg-slate-100';
</script>

<div class="m-0.5 px-2 py-0.5 flex justify-between {columnClass} {backgroundColor}">
	<InputTypeIcons deviceInfo={inputInfo} />
	<span>
		{ action.defaultBindings[device] || '' }
	</span>
</div>
