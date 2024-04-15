import { writeFile } from 'fs/promises';
import path from 'path';

import { generateDefaultActionMaps, type DefaultActionMaps } from './parsers/defaultProfile.xml';
import { generateLiveBindings, type LiveBindings } from './parsers/liveBindings';

const DEVICES = ['mouse', 'keyboard', 'gamepad', 'joystick'] as const;
const INPUTS = ['button', 'axis'] as const;

type Devices = (typeof DEVICES)[number];
type Inputs = (typeof INPUTS)[number];
type DeviceInput = {
	button: boolean | null;
	axis: boolean | null;
};
type ExpandedActionMap = Omit<DefaultActionMaps[0], 'actions'> & {
	info: {
		mouseKeyboardVisible: boolean | null;
		gamepadVisible: boolean | null;
		joystickVisible: boolean | null;
	};
	actions: ExpandedAction[];
};
type ExpandedAction = DefaultActionMaps[0]['actions'][0] & {
	mouse: DeviceInput;
	keyboard: DeviceInput;
	gamepad: DeviceInput;
	joystick: DeviceInput;
};

const expandDefaultProfile = (d: DefaultActionMaps) => {
	return d.map<ExpandedActionMap>((am) => {
		return {
			name: am.name,
			attributes: am.attributes,
			info: {
				mouseKeyboardVisible: null,
				gamepadVisible: null,
				joystickVisible: null,
			},
			actions: am.actions.map<ExpandedAction>((a) => {
				return {
					...a,
					mouse: {
						button: null,
						axis: null,
					},
					keyboard: {
						button: null,
						axis: null,
					},
					gamepad: {
						button: null,
						axis: null,
					},
					joystick: {
						button: null,
						axis: null,
					},
				};
			}),
		};
	});
};

const updateWithBindingData = (
	d: ReturnType<typeof expandDefaultProfile>,
	device: Devices,
	input: Inputs,
	bindingData: LiveBindings['mouse']['button'],
) => {
	// If there is no binding data for this device and input, skip.
	if (bindingData === null) {
		return;
	}
	d.forEach((actionMap) => {
		// See if there is a matching action map object in the binding data.
		const bindings = bindingData.find((b) => b.name === actionMap.name);

		// Set the action map's visibility base on presence or absence of matching xml.
		const visible = bindings ? true : false;
		if (device === 'mouse' || device === 'keyboard') {
			actionMap.info.mouseKeyboardVisible = visible;
		} else if (device === 'gamepad') {
			actionMap.info.gamepadVisible = visible;
		} else if (device === 'joystick') {
			actionMap.info.joystickVisible = visible;
		}

		// If there is no matching action map in the bindings data for the device, set it to false.
		if (!bindings) {
			actionMap.actions.forEach((action) => (action[device][input] = false));
		} else {
			actionMap.actions.forEach((action) => {
				// See if there is a matching action object in the binding data.
				const actionBinding = bindings.actions.find((a) => a === action.name);
				const deviceBindable = actionBinding ? true : false;
				action[device][input] = deviceBindable;
			});
		}
	});
};

export const buildDataJsonFromGameFiles = async () => {
	const [defaultActionMaps, liveBindings] = await Promise.all([
		generateDefaultActionMaps(),
		generateLiveBindings(),
	]);

	const data = expandDefaultProfile(defaultActionMaps);
	DEVICES.forEach((d) => {
		INPUTS.forEach((i) => {
			updateWithBindingData(data, d, i, liveBindings[d][i]);
		});
	});

	await writeFile(
		path.resolve(import.meta.dirname, './processed-files/action-map-data.json'),
		JSON.stringify(data, null, '\t') + '\n',
	);
};
