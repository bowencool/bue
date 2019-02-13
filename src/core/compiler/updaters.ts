export default {
	text(node: Node, value: string = 'none'): void {
		node.textContent = value;
	},
	model(node: Node, value: string = ''): void {
		node.value = value;
	},
};
