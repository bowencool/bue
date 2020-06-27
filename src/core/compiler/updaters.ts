export default {
	text(node: Element, value: string = 'none'): void {
		node.textContent = value;
	},
	model(node: HTMLInputElement, value: string = ''): void {
		node.value = value;
	},
};
