<script lang="ts">
	import ActionMap from '$lib/components/ActionMap.svelte';
	import { isActionMapBindable } from '$lib/util/index.js';

	export let data;

	let actionMaps = [...data.actionData].sort(
		(a, b) => +isActionMapBindable(b) - +isActionMapBindable(a),
	);
</script>

<div class="mx-auto p-4 max-w-fit min-w-fit">
	{#each actionMaps as actionMap}
		<ActionMap {actionMap} />
	{/each}
</div>
