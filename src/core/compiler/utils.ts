import Bue from '../index';
import updaters from './updaters';
import { findValue } from '../../utils';

const getBMTextContent = (bm: Bue, initialContent: string): string => {
	return initialContent.replace(/{{\s*([^\.{][\w\.]+?[^\.}])\s*}}/g, (match, key) => {
		try {
			const v = findValue(bm, key);
			return v === undefined ? match : v;
		} catch (e) {}
		return match;
	});
};

export default {
	text(node: Node, bm: Bue, initialContent: string) {
		const updater = updaters.text;
		updater(node, getBMTextContent(bm, initialContent));
	},
	// bind(node: Node, bm: Bue, exp: string, dir: string) {
	// 	const updater = updaters[dir];
	// 	updater && updater(node, getBMTextContent(bm, exp));
	// 	// todo new Watcher({})
	// },
	eventHandler(node: Node, bm: Bue, exp: string, dir: string): void {
		const eventType = exp;
		const fn = bm.$options.methods && bm.$options.methods[dir];
		if (eventType && fn) {
			node.addEventListener(eventType, fn.bind(bm), false);
		}
	},
};
