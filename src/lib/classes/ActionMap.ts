import { Action } from './Action';
import type { ActionProperties } from './Action';

export class ActionMap implements ActionMapProperties {
	public name: string;
	public attributes: ActionMapAttributes;
	public actions: Action[];

	constructor(actionmap: ActionMapProperties) {
		this.name = actionmap.name;
		this.attributes = {
			...actionmap.attributes,
		};
		this.actions = actionmap.actions.map((a) => new Action(a));
	}

	/**
	 * Whether or not the actionmap has any bindable actions.
	 */
	public get actionMapBindable() {
		return this.actions.some((a) => a.actionBindable);
	}
}

/**
 * Properties that are saved for an actionmap.
 */
export type ActionMapProperties = {
	/**
	 * The system name of the actionmap.
	 */
	name: string;
	/**
	 * Attributes of the actionmap.
	 */
	attributes: ActionMapAttributes;
	/**
	 * The actions that are a part of the actionmap.
	 */
	actions: ActionProperties[];
};

/**
 * Labels and descriptions for an actionmap.
 */
export type ActionMapAttributes = {
	version: number;
	/**
	 * The raw label from the defaultProfile.xml.
	 */
	labelRaw?: string;
	/**
	 * The localized version of the label looked up from global.ini.
	 */
	labelLocal?: string;
	/**
	 * The raw category from the defaultProfile.xml.
	 */
	categoryRaw?: string;
	/**
	 * The localized version of the category looked up from global.ini.
	 */
	categoryLocal?: string;
};
