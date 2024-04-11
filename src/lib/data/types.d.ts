// Types that represent the structure of the actionmaps.xml file in the USER folder.
type LiveActionMapsXML = {
	ActionMaps: {
		ActionProfiles: {
			actionmap: LiveActionMapXML[];
		};
	};
};

type LiveActionMapXML = {
	$_name: string;
	action: LiveActionXML[];
};

type LiveActionXML = {
	$_name: string;
	rebind: LiveRebindXML[];
};

type LiveRebindXML = {
	$_input: string;
};

// Types that represent the structure of the extracted defaultProfile.xml from the Data.p4k.
type DefaultProfileXML = {
	profile: {
		actionmap: ActionMapXML[];
	};
};

type DefaultActionMapXML = {
	$_name: string;
	$_version: string;
	$_UILabel: string;
	$_UICategory: string;
	action: ActionXML[];
};

type DefaultActionXML = {
	$_name: string;
	$_UILabel?: string;
	$_UIDescription?: string;
	$_optionGroup?: string;
	$_keyboard?: string;
	$_joystick?: string;
	$_mouse?: string;
	$_gamepad?: string;
};

// Types that represent the processed data.
type ActionMap = {
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
	actions: Action[];
};

type Action = {
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

type InputInfo = {
	button: boolean | null;
	axis: boolean | null;
};

type InputDevice = 'mouse' | 'keyboard' | 'gamepad' | 'joystick';
type InputType = 'button' | 'axis';
