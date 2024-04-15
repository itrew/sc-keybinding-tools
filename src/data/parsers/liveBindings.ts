import { readFile } from 'fs/promises';
import path from 'path';

import { XMLParser } from 'fast-xml-parser';

// Types that represent the structure of the actionmaps.xml file in the USER folder.
type ParsedFile = {
	ActionMaps: {
		ActionProfiles: {
			actionmap: ActionMap[];
		};
	};
};
type ActionMap = {
	$_name: string;
	action: Action[];
};
type Action = {
	$_name: string;
	rebind: Rebind[];
};
type Rebind = {
	$_input: string;
};

// Paths that should always be converted to an array.
const parseAsArrayPaths = [
	'ActionMaps.ActionProfiles.actionmap',
	'ActionMaps.ActionProfiles.actionmap.action',
	'ActionMaps.ActionProfiles.actionmap.action.rebind',
];

// Configure the parser.
const parser = new XMLParser({
	ignoreAttributes: false,
	attributeNamePrefix: '$_',
	isArray: (name, jpath) => {
		return parseAsArrayPaths.indexOf(jpath) > -1;
	},
});

const xmlToDeviceInput = (xml: ParsedFile | null) => {
	if (!xml) return null;
	return xml.ActionMaps.ActionProfiles.actionmap.map((am) => {
		return {
			name: am.$_name,
			actions: am.action.map((a) => a.$_name),
		};
	});
};

const readDeviceFile = async (filepath: string): Promise<ParsedFile | null> => {
	try {
		return parser.parse(await readFile(path.resolve(import.meta.dirname, filepath)));
	} catch {
		return null;
	}
};

export const generateLiveBindings = async () => {
	const [
		mouseButton,
		mouseAxis,
		keyboardButton,
		keyboardAxis,
		gamepadButton,
		gamepadAxis,
		joystickButton,
		joystickAxis,
	] = await Promise.all([
		readDeviceFile('../game-files/mouse-button.actionmaps.xml'),
		readDeviceFile('../game-files/mouse-axis.actionmaps.xml'),
		readDeviceFile('../game-files/keyboard-button.actionmaps.xml'),
		readDeviceFile('../game-files/keyboard-axis.actionmaps.xml'),
		readDeviceFile('../game-files/gamepad-button.actionmaps.xml'),
		readDeviceFile('../game-files/gamepad-axis.actionmaps.xml'),
		readDeviceFile('../game-files/joystick-button.actionmaps.xml'),
		readDeviceFile('../game-files/joystick-axis.actionmaps.xml'),
	]);
	return {
		mouse: {
			button: xmlToDeviceInput(mouseButton),
			axis: xmlToDeviceInput(mouseAxis),
		},
		keyboard: {
			button: xmlToDeviceInput(keyboardButton),
			axis: xmlToDeviceInput(keyboardAxis),
		},
		gamepad: {
			button: xmlToDeviceInput(gamepadButton),
			axis: xmlToDeviceInput(gamepadAxis),
		},
		joystick: {
			button: xmlToDeviceInput(joystickButton),
			axis: xmlToDeviceInput(joystickAxis),
		},
	};
};

export type LiveBindings = Awaited<ReturnType<typeof generateLiveBindings>>;
