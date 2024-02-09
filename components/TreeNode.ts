class TreeNode {
	data: string;
	children: TreeNode[];

	constructor(data: string, children: TreeNode[] = []) {
		this.data = data;
		this.children = children;
	}
}
export default TreeNode;
