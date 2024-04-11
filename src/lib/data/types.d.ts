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

type DefaultActionMapXML = {
	$_name: string;
	$_version: string;
	$_UILabel: string;
	$_UICategory: string;
	action: ActionXML[];
};

type DefaultProfileXML = {
	profile: {
		actionmap: ActionMapXML[];
	};
};
