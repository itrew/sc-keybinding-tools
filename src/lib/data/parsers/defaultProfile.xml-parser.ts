import { readFileSync } from 'fs';
import path from 'path';

import { XMLParser } from 'fast-xml-parser';

const parseAsArrayPaths = ['profile.actionmap', 'profile.actionmap.action'];

// Configure the parser.
const parser = new XMLParser({
	ignoreAttributes: false,
	attributeNamePrefix: '$_',
	isArray: (name, jpath) => {
		return parseAsArrayPaths.indexOf(jpath) > -1;
	},
});

// Read the xml contents of the default profile into a buffer.
const fileContents = readFileSync(
	path.resolve(import.meta.dirname, '../extracted-files/defaultProfile.xml'),
);

// Parse the xml profile file into an object.
export const defaultProfile: DefaultProfileXML = parser.parse(fileContents);
