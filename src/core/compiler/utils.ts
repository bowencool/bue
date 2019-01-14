import Bue from '../index';
import Watcher from '../observer/Watcher';
import updaters from './updaters';
import { findValue } from '../../utils';

export default {
	text(node: Node, bm: Bue, exp: string) {
		const updater = updaters.text;
		updater(node, findValue(bm, exp));
		this.bind(node, bm, exp, 'text');
	},
	bind(node: Node, bm: Bue, exp: string, dir: string) {
		const updater: Function = updaters[dir];
		new Watcher(bm, exp, function(value: string, oldValue?: string) {
			updater && updater(node, value, oldValue);
		});
	},
	eventHandler(node: Node, bm: Bue, exp: string, dir: string): void {
		const eventType = exp;
		const fn = bm.$options.methods && bm.$options.methods[dir];
		if (eventType && fn) {
			node.addEventListener(eventType, fn.bind(bm), false);
		}
	},
};
