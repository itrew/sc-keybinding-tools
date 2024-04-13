import Color from 'color';

const COLOR_PRIMARY_H = 205;
const COLOR_PRIMARY_S = 60;
const COLOR_PRIMARY_L = 50;

export const colors = {
	primary: Color({ h: COLOR_PRIMARY_H, s: COLOR_PRIMARY_S, l: COLOR_PRIMARY_L }).hex(),
	surface: {
		0: Color({ h: COLOR_PRIMARY_H, s: 20, l: 10 }).hex(),
		1: Color({ h: COLOR_PRIMARY_H, s: 25, l: 12 }).hex(),
		2: Color({ h: COLOR_PRIMARY_H, s: 25, l: 15 }).hex(),
		3: Color({ h: COLOR_PRIMARY_H, s: 15, l: 20 }).hex(),
		4: Color({ h: COLOR_PRIMARY_H, s: 15, l: 25 }).hex(),
	},
	base: {
		DEFAULT: Color({ h: COLOR_PRIMARY_H, s: 25, l: 80 }).hex(),
		emphasized: Color({ h: COLOR_PRIMARY_H, s: 80, l: 95 }).hex(),
		subtle: Color({ h: COLOR_PRIMARY_H, s: 25, l: 65 }).hex(),
	},
	error: Color({ h: 0, s: 71, l: 62 }).hex(),
	warning: Color({ h: 45, s: 100, l: 60 }).hex(),
	success: Color({ h: 167, s: 100, l: 34 }).hex(),
};
