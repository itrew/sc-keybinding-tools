export const isDeviceBindable = ({ button, axis }: App.InputInfo): boolean | null => {
	return button || axis ? true : button === false && axis === false ? false : null;
};

export const isActionBindable = (a: App.Action): boolean => {
	return isDeviceBindable(a.mouse) || isDeviceBindable(a.keyboard) || isDeviceBindable(a.joystick)
		? true
		: false;
};

export const isActionMapBindable = (am: App.ActionMap): boolean => {
	return am.actions.map((a) => isActionBindable(a)).some((x) => x);
};
