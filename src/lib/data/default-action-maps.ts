import { langLookupUI } from './parsers/global.ini-parser';
import { defaultProfile } from './parsers/defaultProfile.xml-parser';

// Convert an XML parsed action to a useable object.
const actionXmlToAction = (actionXml: DefaultActionXML): Action => {
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
		mouse: { button: null, axis: null },
		keyboard: { button: null, axis: null },
		gamepad: { button: null, axis: null },
		joystick: { button: null, axis: null },
	};
};

// Convert an XML parsed action map to a useable object.
const actionMapXmlToActionMap = (actionMapXml: DefaultActionMapXML): ActionMap => {
	return {
		name: actionMapXml.$_name,
		attributes: {
			version: +actionMapXml.$_version,
			labelRaw: actionMapXml.$_UILabel,
			labelLocal: langLookupUI(actionMapXml.$_UILabel),
			categoryRaw: actionMapXml.$_UICategory,
			categoryLocal: langLookupUI(actionMapXml.$_UICategory),
		},
		info: {
			mouseKeyboardVisible: null,
			gamepadVisible: null,
			joystickVisible: null,
		},
		actions: actionMapXml.action.map(actionXmlToAction),
	};
};

export const generateDefaultActionMaps = () => {
	return defaultProfile.profile.actionmap.map(actionMapXmlToActionMap);
};
