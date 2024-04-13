<script lang="ts">
	export let color: string = 'currentColor';
	export let size: number = 24;
</script>

<svg
	width="{size}px"
	height="{size}px"
	stroke-width="1.5"
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	{color}
>
	<path
		d="M17 20V4M17 4L20 7M17 4L14 7"
		stroke={color}
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
	></path>
	<path
		d="M7 4V20M7 20L10 17M7 20L4 17"
		stroke={color}
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
	></path>
</svg>
