<script lang="ts">
	import InputTypeIcons from '$lib/components/InputTypeIcons.svelte';

	export let device: InputDevice;
	export let action: Action;

	let inputInfo = action[device];
	let bindable: boolean | null =
		inputInfo.button || inputInfo.axis
			? true
			: inputInfo.button === false && inputInfo.axis === false
				? false
				: null;
	let backgroundColor = bindable ? 'bg-surface-2' : '';
</script>

<div
	class="m-0.5 px-2 py-1 flex items-center justify-between {backgroundColor} rounded-sm border border-solid border-base border-opacity-5"
>
	<InputTypeIcons deviceInfo={inputInfo} />
	<div class="font-mono {!bindable ? 'text-base-subtle line-through' : ''}">
		{action.defaultBindings[device] || ''}
	</div>
</div>
