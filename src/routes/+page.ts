import actionData from '$data/processed-files/action-map-data.json';

export const prerender = true;

export const load = async () => {
	return {
		actionData,
	};
};
