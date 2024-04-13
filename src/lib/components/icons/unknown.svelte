<script lang="ts">
	export let color: string = '#000000';
</script>

<svg
	width="24px"
	height="24px"
	stroke-width="1.5"
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	{color}
>
	<path
		d="M7 4H4V7"
		stroke={color}
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
	></path>
	<path
		d="M17 4H20V7"
		stroke={color}
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
	></path>
	<path
		d="M7 20H4V17"
		stroke={color}
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
	></path>
	<path
		d="M17 20H20V17"
		stroke={color}
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
	></path>
</svg>
