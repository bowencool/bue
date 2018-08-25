export default {
	text(node: Node, dir: string, value: string = ''): void {
		node.textContent = node.textContent.replace(`{{${dir}}}`, value);
	},
};
