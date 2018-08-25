import Bue from '../index';

export default {
	// text(node: Node, bm: Bue, exp: string): void {},
	// bind(node: Node, bm: Bue, exp: string, dir: string) {},
	eventHandler(node: Node, bm: Bue, exp: string, dir: string): void {
		const eventType = exp;
		const fn = bm.$options.methods && bm.$options.methods[dir];
		if (eventType && fn) {
			node.addEventListener(eventType, fn.bind(bm), false);
		}
	},
};
