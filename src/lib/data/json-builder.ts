import { writeFile } from 'fs/promises';
import path from 'path';

import { langLookupUI } from './lang';
import { defaultProfile, type ActionMapXML, type ActionXML } from './profile';
import { liveGameData, type LiveActionMapXML, type LiveActionXML } from './live-game-data';
import data from './processed-files/actionData.json';

type InputType = string;

export type ActionData = {
	name: string;
	attributes: {
		labelRaw?: string;
		labelLocal?: string;
		descriptionRaw?: string;
		descriptionLocal?: string;
		optionGroup?: string;
	};
	defaultBindings: {
		mouse?: string;
		keyboard?: string;
		gamepad?: string;
		joystick?: string;
	};
	info: {
		inputType: InputType | null;
		mouseBindable: boolean | null;
		keyboardBindable: boolean | null;
		gamepadBindable: boolean | null;
		joystickBindable: boolean | null;
	};
};

export type ActionMapData = {
	name: string;
	attributes: {
		version: number;
		labelRaw?: string;
		labelLocal?: string;
		categoryRaw?: string;
		categoryLocal?: string;
	};
	info: {
		mouseKeyboardVisible: boolean | null;
		gamepadVisible: boolean | null;
		joystickVisible: boolean | null;
	};
	actions: ActionData[];
};

const typedData: ActionMapData[] = data;

// Load an action map from the saved data.
const getActionMap = (actionMapName: string): ActionMapData | undefined => {
	return typedData.find((actionMap) => actionMap.name === actionMapName);
};

// Load an action from the saved data.
const getAction = (actionMapName: string, actionName: string): ActionData | undefined => {
	const actionMap = getActionMap(actionMapName);
	if (actionMap) {
		return actionMap.actions.find((action) => action.name === actionName);
	}
};

// Convert an XML parsed action to a useable object.
const actionXmlToData = (actionMapName: string, actionXml: ActionXML): ActionData => {
	const actionData = getAction(actionMapName, actionXml.$_name);

	const actionInfo = actionData
		? {
				inputType: actionData.info.inputType,
				mouseBindable: actionData.info.mouseBindable,
				keyboardBindable: actionData.info.keyboardBindable,
				gamepadBindable: actionData.info.gamepadBindable,
				joystickBindable: actionData.info.joystickBindable,
			}
		: {
				inputType: null,
				mouseBindable: null,
				keyboardBindable: null,
				gamepadBindable: null,
				joystickBindable: null,
			};

	return {
		name: actionXml.$_name,
		attributes: {
			labelRaw: actionXml.$_UILabel,
			labelLocal: langLookupUI(actionXml.$_UILabel),
			descriptionRaw: actionXml.$_UIDescription,
			descriptionLocal: langLookupUI(actionXml.$_UIDescription),
			optionGroup: actionXml.$_optionGroup,
		},
		defaultBindings: {
			mouse: actionXml.$_mouse,
			keyboard: actionXml.$_keyboard,
			gamepad: actionXml.$_gamepad,
			joystick: actionXml.$_joystick,
		},
		info: actionInfo,
	};
};

// Convert an XML parsed action map to a useable object.
const actionMapXmlToData = (actionMapXml: ActionMapXML): ActionMapData => {
	const actionMapData = getActionMap(actionMapXml.$_name);

	const actionMapInfo = actionMapData
		? {
				mouseKeyboardVisible: actionMapData.info.mouseKeyboardVisible,
				gamepadVisible: actionMapData.info.gamepadVisible,
				joystickVisible: actionMapData.info.joystickVisible,
			}
		: {
				mouseKeyboardVisible: null,
				gamepadVisible: null,
				joystickVisible: null,
			};

	let actions: ActionData[] = [];

	if (Array.isArray(actionMapXml.action)) {
		actions = actionMapXml.action.map((a) => actionXmlToData(actionMapXml.$_name, a));
	} else if (typeof actionMapXml.action === 'object') {
		actions = [actionXmlToData(actionMapXml.$_name, actionMapXml.action)];
	}

	return {
		name: actionMapXml.$_name,
		attributes: {
			version: +actionMapXml.$_version,
			labelRaw: actionMapXml.$_UILabel,
			labelLocal: langLookupUI(actionMapXml.$_UILabel),
			categoryRaw: actionMapXml.$_UICategory,
			categoryLocal: langLookupUI(actionMapXml.$_UICategory),
		},
		info: actionMapInfo,
		actions,
	};
};

export const actionData = defaultProfile.profile.actionmap.map(actionMapXmlToData);

export const writeActionDataFile = () => {
	writeFile(
		path.resolve(import.meta.dirname, './processed-files/actionData.json'),
		JSON.stringify(actionData, null, '\t'),
	);
};

export const updateDataFromLiveData = (
	inputDevice: 'mouse' | 'keyboard' | 'gamepad' | 'joystick',
	actionMapName: string,
) => {
	let liveActionMapXml: LiveActionMapXML;

	if (Array.isArray(liveGameData.ActionMaps.ActionProfiles.actionmap)) {
		liveActionMapXml = liveGameData.ActionMaps.ActionProfiles.actionmap.find(
			(actionMap) => actionMap.$_name === actionMapName,
		)!;
	} else {
		liveActionMapXml = liveGameData.ActionMaps.ActionProfiles.actionmap;
	}

	let actions: LiveActionXML[];

	if (Array.isArray(liveActionMapXml.action)) {
		actions = liveActionMapXml.action;
	} else {
		actions = [liveActionMapXml.action];
	}

	const actionMapRecord = actionData.find((am) => am.name === actionMapName);

	if (actionMapRecord) {
		actions.forEach((action) => {
			const actionRecord = actionMapRecord.actions.find((a) => a.name === action.$_name);

			if (actionRecord && inputDevice === 'mouse') {
				actionRecord.info.mouseBindable = true;
			}

			if (actionRecord && inputDevice === 'keyboard') {
				actionRecord.info.keyboardBindable = true;
			}
		});
	}
};
