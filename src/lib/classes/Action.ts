export const DEVICES = ['mouse', 'keyboard', 'gamepad', 'joystick'] as const;
export const INPUTS = ['button', 'axis'] as const;

export class Action implements ActionProperties {
	public name: string;
	public attributes: ActionAttributes;
	public defaultBindings: DefaultBindings;
	public mouse: DeviceInfo;
	public keyboard: DeviceInfo;
	public gamepad: DeviceInfo;
	public joystick: DeviceInfo;

	public constructor(action: ActionProperties) {
		this.name = action.name;
		this.attributes = {
			...action.attributes,
		};
		this.defaultBindings = {
			...action.defaultBindings,
		};
		this.mouse = {
			...action.mouse,
		};
		this.keyboard = {
			...action.keyboard,
		};
		this.gamepad = {
			...action.gamepad,
		};
		this.joystick = {
			...action.joystick,
		};
	}

	/**
	 * Check whether or not a device is considered bindable or not.
	 *
	 * @param device The device to check.
	 * @returns
	 */
	private isDeviceBindable(device: Devices): boolean | null {
		const { button, axis } = this[device];
		return button || axis ? true : button === false && axis === false ? false : null;
	}

	/**
	 * Can this action be bound to a mouse input.
	 */
	public get mouseBindable() {
		return this.isDeviceBindable('mouse');
	}

	/**
	 * Can this action be bound to a keyboard input.
	 */
	public get keyboardBindable() {
		return this.isDeviceBindable('keyboard');
	}

	/**
	 * Can this action be bound to a gamepad input.
	 */
	public get gamepadBindable() {
		return this.isDeviceBindable('gamepad');
	}

	/**
	 * Can this action be bound to a joystick input.
	 */
	public get joystickBindable() {
		return this.isDeviceBindable('joystick');
	}

	/**
	 * Can this action be bound to any input.
	 */
	public get actionBindable() {
		return this.mouseBindable ||
			this.keyboardBindable ||
			this.gamepadBindable ||
			this.joystickBindable
			? true
			: false;
	}
}

export type ActionProperties = {
	/**
	 * The system name of the action.
	 */
	name: string;
	/**
	 * Attributes of the action.
	 */
	attributes: ActionAttributes;
	/**
	 * Information about the default bindings for the 4 device types.
	 */
	defaultBindings: DefaultBindings;
	/**
	 * The input information for the mouse.
	 */
	mouse: DeviceInfo;
	/**
	 * The input information for the keyboard.
	 */
	keyboard: DeviceInfo;
	/**
	 * The input information for the gamepad.
	 */
	gamepad: DeviceInfo;
	/**
	 * The input information for the joystick(s).
	 */
	joystick: DeviceInfo;
};

/**
 * Labels and descriptions for an action.
 */
export type ActionAttributes = {
	/**
	 * The raw label from the defaultProfile.xml.
	 */
	labelRaw?: string;
	/**
	 * The localized version of the label looked up from global.ini.
	 */
	labelLocal?: string;
	/**
	 * The raw description from the defaultProfile.xml.
	 */
	descriptionRaw?: string;
	/**
	 * The localized version of the description looked up from global.ini.
	 */
	descriptionLocal?: string;
	/**
	 * The raw option group from the defaultProfile.xml.
	 */
	optionGroup?: string;
};

/**
 * An action's default input bindings.
 */
export type DefaultBindings = {
	/**
	 * The default binding for the mouse.
	 */
	mouse?: string;
	/**
	 * The default binding for the keyboard.
	 */
	keyboard?: string;
	/**
	 * The default binding for a gamepad.
	 */
	gamepad?: string;
	/**
	 * The default binding for a joystick.
	 */
	joystick?: string;
};

/**
 * A device's modes of input.
 */
export type DeviceInfo = {
	/**
	 * Whether or not the device's buttons are bindable for the action.
	 */
	button: boolean | null;
	/**
	 * Whether or not the device's axes are bindable for the action.
	 */
	axis: boolean | null;
};

/**
 * The different devices that can be key-bound.
 */
export type Devices = (typeof DEVICES)[number];

/**
 * The different input modes for a device.
 */
export type Inputs = (typeof INPUTS)[number];
