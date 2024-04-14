import { readFile, writeFile } from 'fs/promises';
import path from 'path';

import { generateDefaultActionMaps } from './default-action-maps';

export const DATA_FILE_PATH = path.resolve(
	import.meta.dirname,
	'./processed-files/action-map-data.json',
);

export const loadSavedActionData = async () => {
	const fileContent = await readFile(DATA_FILE_PATH, 'utf-8');
	return JSON.parse(fileContent) as Data.JSON.ActionMap[];
};

export const writeActionMapData = async (data: Data.JSON.ActionMap[]) => {
	await writeFile(DATA_FILE_PATH, JSON.stringify(data, null, '\t'));
};

// Write out a new data file without any additional data added.
export const writeDefaultActionMapData = () => {
	return writeActionMapData(generateDefaultActionMaps());
};
