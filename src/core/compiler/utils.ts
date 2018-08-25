import Bue from '../index';
import updaters from './updaters';

const getBMValue = (bm: Bue, path: string): any => {
	if (path in bm) {
		return bm[path];
	}
	let val: any;
	path.split('.').forEach(p => {
		val = val[p];
	});
	return val;
};

export default {
	text(node: Node, bm: Bue, initialContent: string) {},
	bind(node: Node, bm: Bue, exp: string, dir: string) {
		const updater = updaters[dir];
		updater && updater(node, getBMValue(bm, exp));
	},
	eventHandler(node: Node, bm: Bue, exp: string, dir: string): void {
		const eventType = exp;
		const fn = bm.$options.methods && bm.$options.methods[dir];
		if (eventType && fn) {
			node.addEventListener(eventType, fn.bind(bm), false);
		}
	},
};
