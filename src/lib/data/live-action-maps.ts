import { loadSavedActionData, writeActionMapData } from './action-map-data';
import { getLiveGameData } from './parsers/actionmaps.xml-parser';

export const updateActionMapDataFromLiveActionMaps = async (
	device: InputDevice,
	type: InputType,
) => {
	// Load existing data from files.
	const [actionMapData, liveGameData] = await Promise.all([
		loadSavedActionData(),
		getLiveGameData(),
	]);

	// Process action maps
	const processActionMap = (actionMap: ActionMap): ActionMap => {
		// See if there is a matching action map object in the live game file.
		const liveActionMapXml = liveGameData.ActionMaps.ActionProfiles.actionmap.find(
			(a) => a.$_name === actionMap.name,
		);

		// Set the action map's visibility base on presence or absence of matching xml.
		const actionMapVisible = liveActionMapXml ? true : false;
		if (device === 'mouse' || device === 'keyboard') {
			actionMap.info.mouseKeyboardVisible = actionMapVisible;
		} else if (device === 'gamepad') {
			actionMap.info.gamepadVisible = actionMapVisible;
		} else if (device === 'joystick') {
			actionMap.info.joystickVisible = actionMapVisible;
		}

		if (!liveActionMapXml) {
			// There is no matching action map in the live game data for the device, move on to the next one.
			actionMap.actions.forEach((a) => (a[device][type] = false));
			return actionMap;
		}

		// Process actions
		const processAction = (action: Action): Action => {
			// See if there is a matching action object in the live game file.
			const liveActionXml = liveActionMapXml.action.find((a) => a.$_name === action.name);

			// Set the device input's binding.
			const deviceBindable = liveActionXml ? true : false;
			action[device][type] = deviceBindable;
			return action;
		};
		actionMap.actions = actionMap.actions.map(processAction);

		return actionMap;
	};

	const updatedActionMapData = actionMapData.map(processActionMap);

	await writeActionMapData(updatedActionMapData);
};
