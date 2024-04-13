import type { Config } from 'tailwindcss';
import { colors } from './src/theme/colors';

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors,
		},
	},
	plugins: [],
} satisfies Config;

export default config;
