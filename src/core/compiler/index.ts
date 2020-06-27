import Bue from '../index';
import utils, { DirectiveNames } from './utils';

const isElementNode = (node: Element): Boolean => node.nodeType === 1;
const isTextNode = (node: Element): Boolean => node.nodeType === 3;

const node2Fragment = (node: Element): DocumentFragment => {
	const fragment = document.createDocumentFragment();
	while (node.firstChild) {
		fragment.appendChild(node.firstChild);
	}
	return fragment;
};

export default class Compiler {
	private $el: Element;
	private $fragment: DocumentFragment;
	private $bm: Bue;

	constructor(el: string | Element, bm: Bue) {
		let $el: Element;
		if (typeof el === 'string') {
			$el = document.querySelector(el);
		} else {
			$el = el;
		}
		this.$el = bm.$el = $el;
		this.$bm = bm;
		if (this.$el) {
			this.$fragment = node2Fragment(this.$el);
			this.compileElement(this.$fragment);
			this.$el.appendChild(this.$fragment);
		}
	}

	private compileElement(el: DocumentFragment | Element): void {
		el.childNodes.forEach((node: Element) => {
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

	private compileNode(node: Element) {
		Array.from(node.attributes).forEach(attr => {
			if (/^b-(\w+)/.test(attr.name)) {
				if (DirectiveNames.includes(RegExp.$1)) {
					utils[RegExp.$1](node, this.$bm, attr.value);
					node.removeAttribute(attr.name);
				}
			} else if (/^@(\w+)/.test(attr.name)) {
				// 事件处理
				utils.eventHandler(node, this.$bm, RegExp.$1, attr.value);
				node.removeAttribute(attr.name);
			}
		});
	}

	private compileText(node: Element, exp: string) {
		// TODO
		utils.text(node, this.$bm, exp);
	}
}
