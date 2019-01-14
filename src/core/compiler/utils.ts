import Bue from '../index';
import Watcher from '../observer/Watcher';
import updaters from './updaters';
import { getValue, setValue } from '../../utils/index';

enum KEYS {
	text,
	model,
}

export default {
	text(node: Node, bm: Bue, exp: string) {
		this.bind(node, bm, exp, 'text');
	},
	model(node: Node, bm: Bue, exp: string) {
		// console.log('model', exp);
		this.bind(node, bm, exp, 'model');
		const val = getValue(bm, exp);
		const handler = function(e) {
			const newValue = e.target.value;
			if (val === newValue) {
				return;
			}
			setValue(bm, exp, newValue);
		};
		node.addEventListener('input', handler);
		node.addEventListener('change', handler);
	},
	bind(node: Node, bm: Bue, exp: string, dir: KEYS) {
		const updater: Function = updaters[dir];
		updater(node, getValue(bm, exp));

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
