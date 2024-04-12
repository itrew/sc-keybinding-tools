import actionData from '$lib/data/processed-files/action-map-data.json';

const data: ActionMap[] = actionData;

// Disable keyboard axis binding for display.
data.forEach((am) => {
	am.actions.forEach((a) => {
		a.keyboard.axis = false;
	});
});

export const load = async () => {
	return {
		actionData,
	};
};
