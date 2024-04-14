// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace Data {
		// Types used in data processing.
		namespace XML {
			// Types representing results of xml file parsing.
			namespace Live {
				// Types that represent the structure of the actionmaps.xml file in the USER folder.
				type ParsedFile = {
					ActionMaps: {
						ActionProfiles: {
							actionmap: ActionMap[];
						};
					};
				};
				type ActionMap = {
					$_name: string;
					action: Action[];
				};
				type Action = {
					$_name: string;
					rebind: Rebind[];
				};
				type Rebind = {
					$_input: string;
				};
			}
			namespace Default {
				// Types that represent the structure of the extracted defaultProfile.xml from the Data.p4k.
				type ParsedFile = {
					profile: {
						actionmap: ActionMap[];
					};
				};
				type ActionMap = {
					$_name: string;
					$_version: string;
					$_UILabel: string;
					$_UICategory: string;
					action: Action[];
				};
				type Action = {
					$_name: string;
					$_UILabel?: string;
					$_UIDescription?: string;
					$_optionGroup?: string;
					$_keyboard?: string;
					$_joystick?: string;
					$_mouse?: string;
					$_gamepad?: string;
				};
			}
		}
		namespace JSON {
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
		}
	}
	namespace App {
		type ActionMap = Data.JSON.ActionMap;
		type Action = Data.JSON.Action;
		type InputInfo = Data.JSON.InputInfo;
	}
}

export {};
