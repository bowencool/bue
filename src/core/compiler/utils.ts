import Bue from '../index';
import Watcher from '../observer/Watcher';
import updaters from './updaters';
import { getValue, setValue } from '../../utils/index';

export default {
	text(node: Node, bm: Bue, exp: string) {
		this.bind(node, bm, exp, updaters.text);
	},

	model(node: Node, bm: Bue, exp: string) {
		// console.log('model', exp);
		this.bind(node, bm, exp, updaters.model);
		// const val = getValue(bm, exp);
		const handler = function(e: Event) {
			const newValue = e.target.value;
			setValue(bm, exp, newValue);
		};
		node.addEventListener('input', handler);
		node.addEventListener('change', handler);
	},

	bind(node: Node, bm: Bue, exp: string, updater?: Function) {
		updater && updater(node, getValue(bm, exp));

		new Watcher(bm, exp, function(value: any, oldValue?: any) {
			updater && updater(node, value, oldValue);
		});
	},

	eventHandler(node: Node, bm: Bue, eventName: string, dir: string): void {
		const fn = bm.$options.methods && bm.$options.methods[dir];
		if (eventName && fn) {
			node.addEventListener(eventName, fn.bind(bm), false);
		}
	},
};
