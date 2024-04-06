import { readFile, writeFile } from 'fs/promises';
import path from 'path';

import { parse as INIParser } from 'ini';
import { XMLParser } from 'fast-xml-parser';

const DATA_PATH = path.resolve(import.meta.dirname, '../data/');

// Language lookup
// Read the global.ini file into a string.
let languageFileContents = await readFile(DATA_PATH + '/game-files/global.ini', 'utf-8');

// Remove some of the added ,P suffixes that shouldn't be included in the object keys
languageFileContents = languageFileContents.replaceAll(',P=', '=');

// Parse the language file into an object.
const languageData = INIParser(languageFileContents);

// Lookup a localized UI label or description.
const languageLookup = (key) => {
	return key ? languageData[key.slice(1)] || key : undefined;
};

// Default Profile
// Paths that should always be converted to an array.
const defaultProfileArrayTags = ['profile.actionmap', 'profile.actionmap.action'];

// Configure the parser.
const defaultProfileParser = new XMLParser({
	ignoreAttributes: false,
	attributeNamePrefix: '$_',
	isArray: (name, jpath) => {
		return defaultProfileArrayTags.indexOf(jpath) > -1;
	},
});

// Convert an XML parsed action to a useable object.
const actionXmlToActionPojo = (actionXml) => {
	return {
		name: actionXml.$_name,
		attributes: {
			labelRaw: actionXml.$_UILabel,
			labelLocal: languageLookup(actionXml.$_UILabel),
			descriptionRaw: actionXml.$_UIDescription,
			descriptionLocal: languageLookup(actionXml.$_UIDescription),
			optionGroup: actionXml.$_optionGroup,
		},
		defaultBindings: {
			mouse: actionXml.$_mouse,
			keyboard: actionXml.$_keyboard,
			gamepad: actionXml.$_gamepad,
			joystick: actionXml.$_joystick,
		},
		mouse: {
			button: null,
			axis: null,
		},
		keyboard: {
			button: null,
			axis: null,
		},
		gamepad: {
			button: null,
			axis: null,
		},
		joystick: {
			button: null,
			axis: null,
		},
	};
};

// Convert an XML parsed action map to a useable object.
const actionMapXmlToActionMapPojo = (actionMapXml) => {
	return {
		name: actionMapXml.$_name,
		attributes: {
			version: +actionMapXml.$_version,
			labelRaw: actionMapXml.$_UILabel,
			labelLocal: languageLookup(actionMapXml.$_UILabel),
			categoryRaw: actionMapXml.$_UICategory,
			categoryLocal: languageLookup(actionMapXml.$_UICategory),
		},
		actions: actionMapXml.action.map(actionXmlToActionPojo),
	};
};

// Read the xml contents of the default profile into a buffer.
const defaultProfileFileContents = await readFile(DATA_PATH + '/game-files/defaultProfile.xml');
// Parse the xml profile file into an object.
const defaultProfileXML = defaultProfileParser.parse(defaultProfileFileContents);
const defaultProfile = defaultProfileXML.profile.actionmap.map(actionMapXmlToActionMapPojo);

// Live binding results
// Paths that should always be converted to an array.
const bindingResultsArrayPaths = [
	'ActionMaps.ActionProfiles.actionmap',
	'ActionMaps.ActionProfiles.actionmap.action',
	'ActionMaps.ActionProfiles.actionmap.action.rebind',
];

// Configure the parser.
const bindingResultsParser = new XMLParser({
	ignoreAttributes: false,
	attributeNamePrefix: '$_',
	isArray: (name, jpath) => {
		return bindingResultsArrayPaths.indexOf(jpath) > -1;
	},
});

const xmlToDeviceInput = (xml) => {
	if (!xml.ActionMaps.ActionProfiles.actionmap) return [];
	return xml.ActionMaps.ActionProfiles.actionmap.map((am) => {
		return {
			name: am.$_name,
			actions: am.action.map((a) => a.$_name),
		};
	});
};

const readDeviceFile = async (filepath) => {
	try {
		return bindingResultsParser.parse(await readFile(path.resolve(import.meta.dirname, filepath)));
	} catch {
		return null;
	}
};

const [
	mouseButtonBindingResults,
	mouseAxisBindingResults,
	keyboardButtonBindingResults,
	keyboardAxisBindingResults,
	gamepadButtonBindingResults,
	gamepadAxisBindingResults,
	joystickButtonBindingResults,
	joystickAxisBindingResults,
] = await Promise.all([
	readDeviceFile(DATA_PATH + '/binding-files/mouse-button.actionmaps.xml').then((d) =>
		xmlToDeviceInput(d),
	),
	readDeviceFile(DATA_PATH + '/binding-files/mouse-axis.actionmaps.xml').then((d) =>
		xmlToDeviceInput(d),
	),
	readDeviceFile(DATA_PATH + '/binding-files/keyboard-button.actionmaps.xml').then((d) =>
		xmlToDeviceInput(d),
	),
	readDeviceFile(DATA_PATH + '/binding-files/keyboard-axis.actionmaps.xml').then((d) =>
		xmlToDeviceInput(d),
	),
	readDeviceFile(DATA_PATH + '/binding-files/gamepad-button.actionmaps.xml').then((d) =>
		xmlToDeviceInput(d),
	),
	readDeviceFile(DATA_PATH + '/binding-files/gamepad-axis.actionmaps.xml').then((d) =>
		xmlToDeviceInput(d),
	),
	readDeviceFile(DATA_PATH + '/binding-files/joystick-button.actionmaps.xml').then((d) =>
		xmlToDeviceInput(d),
	),
	readDeviceFile(DATA_PATH + '/binding-files/joystick-axis.actionmaps.xml').then((d) =>
		xmlToDeviceInput(d),
	),
]);

const bindingResults = {
	mouse: {
		button: mouseButtonBindingResults,
		axis: mouseAxisBindingResults,
	},
	keyboard: {
		button: keyboardButtonBindingResults,
		axis: keyboardAxisBindingResults,
	},
	gamepad: {
		button: gamepadButtonBindingResults,
		axis: gamepadAxisBindingResults,
	},
	joystick: {
		button: joystickButtonBindingResults,
		axis: joystickAxisBindingResults,
	},
};

const updateWithBindingData = (device, input, bindingData) => {
	defaultProfile.forEach((actionMap) => {
		// See if there is a matching action map object in the binding data.
		const bindings = bindingData.find((b) => b.name === actionMap.name);

		// If there is no matching action map in the bindings data for the device, set it to false.
		if (!bindings) {
			actionMap.actions.forEach((action) => (action[device][input] = false));
		} else {
			actionMap.actions.forEach((action) => {
				// See if there is a matching action object in the binding data.
				const actionBinding = bindings.actions.find((a) => a === action.name);
				const deviceBindable = actionBinding ? true : false;
				action[device][input] = deviceBindable;
			});
		}
	});
};

['mouse', 'keyboard', 'gamepad', 'joystick'].forEach((d) => {
	['button', 'axis'].forEach((i) => {
		updateWithBindingData(d, i, bindingResults[d][i]);
	});
});

writeFile(DATA_PATH + '/action-map-data.json', JSON.stringify(defaultProfile, null, '\t') + '\n');
