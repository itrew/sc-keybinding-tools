<script lang="ts">
	import actionMapData from '$data/action-map-data.json';
	import ActionMap from '$lib/components/ActionMap.svelte';
	import { ActionMap as ActionMapClass } from '$lib/classes/ActionMap';

	let actionMaps = actionMapData
		.map((x) => new ActionMapClass(x))
		.sort((a, b) => +b.actionMapBindable - +a.actionMapBindable);
</script>

<div class="mx-auto min-w-fit max-w-fit p-4">
	{#each actionMaps as actionMap}
		<ActionMap {actionMap} />
	{/each}
</div>
