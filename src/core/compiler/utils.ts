import Bue from '../index';
import Watcher from '../observer/Watcher';
import updaters from './updaters';
import { getValue, setValue } from '../../utils/index';

export const DirectiveNames = ['bind'];

interface Utils {
	[key: string]: Function;
}
const utils: Utils = {
	text(node: Element, bm: Bue, exp: string) {
		this.bind(node, bm, exp, updaters.text);
	},

	model(node: HTMLInputElement, bm: Bue, exp: string) {
		// console.log('model', exp);
		this.bind(node, bm, exp, updaters.model);
		// const val = getValue(bm, exp);
		const handler = function(e: InputEvent) {
			const newValue = (e.target as HTMLInputElement).value;
			setValue(bm, exp, newValue);
		};
		node.addEventListener('input', handler);
		node.addEventListener('change', handler);
	},

	bind(node: Element, bm: Bue, exp: string, updater?: Function) {
		console.group('compiler get initialValue:', exp);
		const initialValue = getValue(bm, exp);
		updater && updater(node, initialValue);
		console.groupEnd();

		new Watcher(bm, exp, function(value: any, oldValue?: any) {
			updater && updater(node, value, oldValue);
		});
	},

	eventHandler(node: Element, bm: Bue, eventName: string, dir: string): void {
		const fn = bm.$options.methods && bm.$options.methods[dir];
		if (eventName && fn) {
			node.addEventListener(eventName, fn.bind(bm), false);
		}
	},
};

export default utils;
