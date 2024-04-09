<script lang="ts">
	import ActionMap from '$lib/components/ActionMap.svelte';

	export let data;
</script>

<div class="m-auto mt-4 max-w-7xl">
	{#each data.actionData as am}
		<div class="mb-4">
			<ActionMap actionMap={am} />
		</div>
	{/each}
</div>
