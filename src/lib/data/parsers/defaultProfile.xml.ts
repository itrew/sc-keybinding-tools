import { readFile } from 'fs/promises';
import path from 'path';

import { XMLParser } from 'fast-xml-parser';

import { languageLookup } from './global.ini';

// Types that represent the structure of the extracted defaultProfile.xml from the Data.p4k.
type ParsedFile = {
	profile: {
		actionmap: ActionMap[];
	};
};
type ActionMap = {
	$_name: string;
	$_version: string;
	$_UILabel: string;
	$_UICategory: string;
	action: Action[];
};
type Action = {
	$_name: string;
	$_UILabel?: string;
	$_UIDescription?: string;
	$_optionGroup?: string;
	$_keyboard?: string;
	$_joystick?: string;
	$_mouse?: string;
	$_gamepad?: string;
};

// Paths that should always be converted to an array.
const parseAsArrayPaths = ['profile.actionmap', 'profile.actionmap.action'];

// Configure the parser.
const parser = new XMLParser({
	ignoreAttributes: false,
	attributeNamePrefix: '$_',
	isArray: (name, jpath) => {
		return parseAsArrayPaths.indexOf(jpath) > -1;
	},
});

// Convert an XML parsed action to a useable object.
const actionXmlToAction = (actionXml: Action) => {
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
	};
};

// Convert an XML parsed action map to a useable object.
const actionMapXmlToActionMap = (actionMapXml: ActionMap) => {
	return {
		name: actionMapXml.$_name,
		attributes: {
			version: +actionMapXml.$_version,
			labelRaw: actionMapXml.$_UILabel,
			labelLocal: languageLookup(actionMapXml.$_UILabel),
			categoryRaw: actionMapXml.$_UICategory,
			categoryLocal: languageLookup(actionMapXml.$_UICategory),
		},
		actions: actionMapXml.action.map(actionXmlToAction),
	};
};

// Export a function to create a new copy of the default profile as a JSON.
export const generateDefaultActionMaps = async () => {
	// Read the xml contents of the default profile into a buffer.
	const fileContents = await readFile(
		path.resolve(import.meta.dirname, '../game-files/defaultProfile.xml'),
	);
	// Parse the xml profile file into an object.
	const defaultProfileXML: ParsedFile = parser.parse(fileContents);
	return defaultProfileXML.profile.actionmap.map(actionMapXmlToActionMap);
};

export type DefaultActionMaps = Awaited<ReturnType<typeof generateDefaultActionMaps>>;
