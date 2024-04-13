<script lang="ts">
	import ActionMap from '$lib/components/ActionMap.svelte';

	export let data;
</script>

<div class="mx-32 mt-4">
	{#each data.actionData as am}
		<ActionMap actionMap={am} />
	{/each}
</div>
