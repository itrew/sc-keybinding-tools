import { readFileSync } from 'fs';

import { XMLParser } from 'fast-xml-parser';

const parseAsArrayPaths = [
	"ActionMaps.ActionProfiles.actionmap",
	"ActionMaps.ActionProfiles.actionmap.action",
	"ActionMaps.ActionProfiles.actionmap.action.rebind",
];

// Configure the parser.
const parser = new XMLParser({
	ignoreAttributes: false,
	attributeNamePrefix: '$_',
	isArray: (name, jpath) => {
		return parseAsArrayPaths.indexOf(jpath) > -1;
	},
});

export const getLiveGameData = () => {
	// Read the xml contents of the default profile into a buffer.
	const fileContents = readFileSync(
		'Y:/Roberts Space Industries/StarCitizen/LIVE/USER/Client/0/Profiles/default/actionmaps.xml',
	);
	const liveGameData: LiveActionMapsXML = parser.parse(fileContents);
	return liveGameData;
};