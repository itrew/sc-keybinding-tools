<script lang="ts">
	import ActionMap from '$lib/components/ActionMap.svelte';

	export let data;
</script>

<div class="m-auto mx-32 mt-4">
	{#each data.actionData as am}
		<div class="mb-4">
			<ActionMap actionMap={am} />
		</div>
	{/each}
</div>
