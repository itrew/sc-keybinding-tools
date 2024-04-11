import { writeFile } from 'fs/promises';
import path from 'path';

import { langLookupUI } from './lang';
import { defaultProfile, type ActionMapXML, type ActionXML } from './profile';
import { getLiveGameData, type LiveActionMapXML, type LiveActionXML } from './live-game-data';
import data from './processed-files/actionData.json';

export type InputInfo = {
	bindable: boolean | null;
	button: boolean | null;
	axis: boolean | null;
};

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
	mouse: InputInfo;
	keyboard: InputInfo;
	gamepad: InputInfo;
	joystick: InputInfo;
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

	const blankInputInfo: InputInfo = {
		bindable: null,
		button: null,
		axis: null,
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
		mouse: actionData ? actionData.mouse : blankInputInfo,
		keyboard: actionData ? actionData.keyboard : blankInputInfo,
		gamepad: actionData ? actionData.gamepad : blankInputInfo,
		joystick: actionData ? actionData.joystick : blankInputInfo,
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
	axisCheck?: boolean,
) => {
	const liveGameData = getLiveGameData();

	let liveActionMapXml: LiveActionMapXML;

	if (Array.isArray(liveGameData.ActionMaps.ActionProfiles.actionmap)) {
		liveActionMapXml = liveGameData.ActionMaps.ActionProfiles.actionmap.find(
			(actionMap) => actionMap.$_name === actionMapName,
		)!;
	} else {
		liveActionMapXml = liveGameData.ActionMaps.ActionProfiles.actionmap;
	}

	if (!liveActionMapXml && !axisCheck) {
		return;
	}

	let actions: LiveActionXML[] = [];

	if (liveActionMapXml) {
		if (Array.isArray(liveActionMapXml.action)) {
			actions = liveActionMapXml.action;
		} else {
			actions = [liveActionMapXml.action];
		}
	}

	const actionMapRecord = actionData.find((am) => am.name === actionMapName);

	if (actionMapRecord) {
		actions.forEach((action) => {
			const actionRecord = actionMapRecord.actions.find((a) => a.name === action.$_name);

			if (actionRecord && inputDevice === 'mouse') {
				actionRecord.mouse.bindable = true;
				const rebind = Array.isArray(action.rebind) ? action.rebind[0] : action.rebind;
				if (rebind.$_input.includes('mouse')) {
					actionRecord.mouse.button = true;
				} else if (rebind.$_input.includes('maxis')) {
					if (!axisCheck) {
						actionRecord.mouse.axis = true;
						actionRecord.mouse.button = false;
					} else {
						actionRecord.mouse.axis = true;
					}
				}
			}

			if (actionRecord && inputDevice === 'keyboard') {
				actionRecord.keyboard.bindable = true;
				actionRecord.keyboard.button = true;
			}

			if (actionRecord && inputDevice === 'joystick') {
				actionRecord.joystick.bindable = true;
				const rebind = Array.isArray(action.rebind) ? action.rebind[0] : action.rebind;
				if (rebind.$_input.includes('button')) {
					actionRecord.joystick.button = true;
				} else if (rebind.$_input.includes('js1_x') || rebind.$_input.includes('js1_y') || rebind.$_input.includes('js1_rotz')) {
					if (!axisCheck) {
						actionRecord.joystick.axis = true;
						actionRecord.joystick.button = false;
					} else {
						actionRecord.joystick.axis = true;
					}
				}
			}
		});

		actionMapRecord.actions.forEach((a) => {
			if (inputDevice === 'mouse' && a.mouse.bindable === null) {
				a.mouse.bindable = false;
			}
			if (inputDevice === 'mouse' && a.mouse.bindable && axisCheck && a.mouse.axis === null) {
				a.mouse.axis = false;
			}
			if (inputDevice === 'keyboard' && a.keyboard.bindable === null) {
				a.keyboard.bindable = false;
			}
			if (inputDevice === 'joystick' && a.joystick.bindable === null) {
				a.joystick.bindable = false;
			}
			if (inputDevice === 'joystick' && a.joystick.bindable && axisCheck && a.joystick.axis === null) {
				a.joystick.axis = false;
			}
		});
	}
};
