export const isDeviceBindable = ({ button, axis }: InputInfo): boolean | null => {
	return button || axis ? true : button === false && axis === false ? false : null;
};

export const isActionBindable = (a: Action): boolean => {
	return isDeviceBindable(a.mouse) || isDeviceBindable(a.keyboard) || isDeviceBindable(a.joystick)
		? true
		: false;
};
