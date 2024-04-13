<script>
	import '../app.pcss';
</script>

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" class="hidden">
	<g id="plus-square-icon">
		<path d="M9 12H12M15 12H12M12 12V9M12 12V15" />
		<path
			d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z"
		/>
	</g>
	<g id="minus-square-icon">
		<path d="M9 12H12H15" />
		<path
			d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z"
		/>
	</g>
	<g id="button-icon">
		<path
			d="M6 5H18C20.2091 5 22 6.79086 22 9V15C22 17.2091 20.2091 19 18 19H6C3.79086 19 2 17.2091 2 15V9C2 6.79086 3.79086 5 6 5Z"
		/>
		<path d="M14.5 10.75L12 13.25L9.5 10.75" />
	</g>
	<g id="unknown-button-icon">
		<path d="M7 4H4V7" />
		<path d="M17 4H20V7" />
		<path d="M7 20H4V17" />
		<path d="M17 20H20V17" />
		<text x="8.75" y="15.2" stroke-width="0.5" class="text-[10px]"> B </text>
	</g>
	<g id="axis-icon">
		<path d="M17 20V4M17 4L20 7M17 4L14 7" />
		<path d="M7 4V20M7 20L10 17M7 20L4 17" />
	</g>
	<g id="unknown-axis-icon">
		<path d="M7 4H4V7" />
		<path d="M17 4H20V7" />
		<path d="M7 20H4V17" />
		<path d="M17 20H20V17" />
		<text x="8.75" y="15.2" stroke-width="0.5" class="text-[10px]"> A </text>
	</g>
</svg>
<slot />
