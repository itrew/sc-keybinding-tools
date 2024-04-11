import { readFileSync } from 'fs';
import path from 'path';

import { XMLParser } from 'fast-xml-parser';

export type ActionXML = {
	$_name: string;
	$_UILabel?: string;
	$_UIDescription?: string;
	$_optionGroup?: string;
	$_keyboard?: string;
	$_joystick?: string;
	$_mouse?: string;
	$_gamepad?: string;
};

export type ActionMapXML = {
	$_name: string;
	$_version: string;
	$_UILabel: string;
	$_UICategory: string;
	action: ActionXML[] | ActionXML;
};

export type ProfileXML = {
	profile: {
		actionmap: ActionMapXML[];
	};
};

// Configure the parser.
const parser = new XMLParser({
	ignoreAttributes: false,
	attributeNamePrefix: '$_',
});

// Read the xml contents of the default profile into a buffer.
const fileContents = readFileSync(
	path.resolve(import.meta.dirname, '../extracted-files/defaultProfile.xml'),
);

// Parse the xml profile file into an object.
export const defaultProfile: ProfileXML = parser.parse(fileContents);
