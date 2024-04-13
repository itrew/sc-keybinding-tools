import Color from 'color';

const COLOR_PRIMARY_H = 205;
const COLOR_PRIMARY_S = 60;
const COLOR_PRIMARY_L = 50;

export const COLOR_PRIMARY = Color({ h: COLOR_PRIMARY_H, s: COLOR_PRIMARY_S, l: COLOR_PRIMARY_L });
export const COLOR_SECONDARY = Color({ h: 14, s: 90, l: 70 });

export const COLOR_SURFACE_0 = Color({ h: COLOR_PRIMARY_H, s: 20, l: 10 });
export const COLOR_SURFACE_1 = Color({ h: COLOR_PRIMARY_H, s: 25, l: 12 });
export const COLOR_SURFACE_2 = Color({ h: COLOR_PRIMARY_H, s: 25, l: 15 });
export const COLOR_SURFACE_3 = Color({ h: COLOR_PRIMARY_H, s: 15, l: 20 });
export const COLOR_SURFACE_4 = Color({ h: COLOR_PRIMARY_H, s: 15, l: 25 });

export const COLOR_BASE = Color({ h: COLOR_PRIMARY_H, s: 25, l: 80 });
export const COLOR_BASE_EMPHASIZED = Color({ h: COLOR_PRIMARY_H, s: 80, l: 95 });
export const COLOR_BASE_SUBTLE = Color({ h: COLOR_PRIMARY_H, s: 25, l: 65 });

export const COLOR_ERROR = Color({ h: 0, s: 71, l: 62 });
export const COLOR_WARNING = Color({ h: 45, s: 100, l: 60 });
export const COLOR_SUCCESS = Color({ h: 167, s: 100, l: 34 });

export const colors = {
	primary: COLOR_PRIMARY.hex(),
	surface: {
		0: COLOR_SURFACE_0.hex(),
		1: COLOR_SURFACE_1.hex(),
		2: COLOR_SURFACE_2.hex(),
		3: COLOR_SURFACE_3.hex(),
		4: COLOR_SURFACE_4.hex(),
	},
	base: {
		DEFAULT: COLOR_BASE.hex(),
		emphasized: COLOR_BASE_EMPHASIZED.hex(),
		subtle: COLOR_BASE_SUBTLE.hex(),
	},
	error: COLOR_ERROR.hex(),
	warning: COLOR_WARNING.hex(),
	success: COLOR_SUCCESS.hex(),
};
