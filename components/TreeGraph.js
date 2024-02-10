import TreeNode from "./TreeNode";

class TreeGraph {
	constructor(jsonData) {
		this.tree = this.buildTree(jsonData);
	}

	buildTree(jsonData) {
		const buildNode = (nodeData) => {
			const { data, children } = nodeData;
			const childNodes = children ? children.map(buildNode) : [];
			return new TreeNode(data, childNodes);
		};
		if (jsonData) {
			const rootData = jsonData;
			return buildNode(rootData);
		} else {
			console.error("Invalid JSON structure for tree data");
			return null;
		}
	}
}

export default TreeGraph;
