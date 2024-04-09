import { readFileSync } from 'fs';

import { XMLParser } from 'fast-xml-parser';

export type LiveRebindXML = {
	$_input: string;
};

export type LiveActionXML = {
	$_name: string;
	rebind: LiveRebindXML[] | LiveRebindXML;
};

export type LiveActionMapXML = {
	$_name: string;
	action: LiveActionXML[] | LiveActionXML;
};

export type LiveActionMapsXML = {
	ActionMaps: {
		ActionProfiles: {
			actionmap: LiveActionMapXML[] | LiveActionMapXML;
		};
	};
};

// Configure the parser.
const parser = new XMLParser({
	ignoreAttributes: false,
	attributeNamePrefix: '$_',
});

export const getLiveGameData = () => {
	// Read the xml contents of the default profile into a buffer.
	const fileContents = readFileSync(
		'Y:/Roberts Space Industries/StarCitizen/LIVE/USER/Client/0/Profiles/default/actionmaps.xml',
	);
	const liveGameData: LiveActionMapsXML = parser.parse(fileContents);
	return liveGameData;
};
