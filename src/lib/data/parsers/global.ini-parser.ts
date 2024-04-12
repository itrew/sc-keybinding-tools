import { readFile } from 'fs/promises';
import path from 'path';

import { parse } from 'ini';

// Read the global.ini file into a string.
let fileContents = await readFile(
	path.resolve(import.meta.dirname, '../game-files/global.ini'),
	'utf-8',
);

// Remove some of the added ,P suffixes that shouldn't be included in the object keys
fileContents = fileContents.replaceAll(',P=', '=');

// Parse the language file into an object.
const lang = parse(fileContents) as { [key: string]: string };

// Lookup a localized UI label or description.
export const langLookupUI = (key: string | undefined): string | undefined => {
	return key ? lang[key.slice(1)] || key : undefined;
};
