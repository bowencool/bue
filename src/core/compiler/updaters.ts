export default {
	text(node: Node, value: string = ''): void {
		node.textContent = value;
	},
};
