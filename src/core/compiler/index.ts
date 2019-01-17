import Bue from '../index';
import utils from './utils';

const isElementNode = (node: any): boolean => node.nodeType == 1;
const isTextNode = (node: any): boolean => node.nodeType == 3;

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
	private $bm: Bue;

	constructor(el: string | Node, bm: Bue) {
		this.$el = bm.$el = isElementNode(el) ? el : document.querySelector(el);
		this.$bm = bm;
		if (this.$el) {
			this.$fragment = node2Fragment(this.$el);
			this.compileElement(this.$fragment);
			this.$el.appendChild(this.$fragment);
		}
	}

	private compileElement(el: DocumentFragment | Node): void {
		el.childNodes.forEach(node => {
			if (isElementNode(node)) {
				this.compileNode(node);
			} else if (isTextNode(node) && /{{\s*(.*?)\s*}}/.test(node.textContent)) {
				this.compileText(node, RegExp.$1);
			}
			if (node.childNodes && node.childNodes.length) {
				this.compileElement(node);
			}
		});
	}

	private compileNode(node: Node) {
		Array.from(node.attributes).forEach(attr => {
			if (/^b-(\w+)/.test(attr.name)) {
				// TODO 指令处理
				utils[RegExp.$1](node, this.$bm, attr.value);
				node.removeAttribute(attr.name);
			} else if (/^@(\w+)/.test(attr.name)) {
				// 事件处理
				utils.eventHandler(node, this.$bm, RegExp.$1, attr.value);
				node.removeAttribute(attr.name);
			}
		});
	}

	private compileText(node: Node, exp: string) {
		// TODO
		utils.text(node, this.$bm, exp);
	}
}
