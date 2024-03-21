class TreeNode {
	data: string;
	data_short: string;
	children: TreeNode[];

	constructor(data: string, data_short: string, children: TreeNode[] = []) {
		this.data = data;
		this.data_short = data_short;
		this.children = children;
	}
}
export default TreeNode;
