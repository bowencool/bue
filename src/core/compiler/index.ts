import Bue from '../index';

const isElementNode = (node: any): boolean => node.nodeType == 1;
const isTextNode = (node: any): boolean => node.nodeType == 3;

const isDirective = (name: string): boolean => name.startsWith('b-');
const isEventDirective = (name: string): boolean => name.startsWith('@');

const node2Fragment = (node: Node): DocumentFragment => {
	const fragment = document.createDocumentFragment();
	while (node.firstChild) {
		fragment.appendChild(node.firstChild);
	}
	return fragment;
};

export default class Compiler {
	private $el: Node;
	private $fragment: DocumentFragment;
	// private bm: Bue;

	constructor(el: string | Node, bm: Bue) {
		this.$el = bm.$el = isElementNode(el) ? el : document.querySelector(el);
		if (this.$el) {
			this.$fragment = node2Fragment(this.$el);
			this.compileElement(this.$fragment);
		}
	}

	private compileElement(el: DocumentFragment | Node): void {
		el.childNodes.forEach(node => {
			if (isElementNode(node)) {
				this.compileNode(node);
			} else if (isTextNode(node) && /{{(.*)}}/.test(node.textContent)) {
				this.compileText(node, RegExp.$1);
			}
			if (node.childNodes && node.childNodes.length) {
				this.compileElement(node);
			}
		});
	}

	private compileNode(node: Node) {
		console.log('compileNode: ', node);
		Array.from(node.attributes).forEach(attr => {
			console.log(attr.name, attr.value);
		});
	}

	private compileText(node: Node, key: string) {
		console.log('compileText: ', node, key);
	}
}
