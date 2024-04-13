<script lang="ts">
	export let icon: string;
	export let color: string = 'currentColor';
	export let size: number = 24;
	export let strokeWidth: number = 1.25;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	version="1.1"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke={color}
	stroke-width={strokeWidth}
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<use href="#{icon}-icon" />
</svg>
