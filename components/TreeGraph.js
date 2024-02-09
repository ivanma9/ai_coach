import TreeNode from "./TreeNode";

class TreeGraph {
	constructor(jsonData) {
		this.tree = this.buildTree(jsonData);
		this.name = "Tree Graph Name";
	}

	buildTree(jsonData) {
		// Inner function to recursively build nodes
		const buildNode = (nodeData) => {
			const { data, children } = nodeData;
			const childNodes = children ? children.map(buildNode) : []; // Handle children if they exist
			return new TreeNode(data, childNodes);
		};

		// Assuming jsonData has the structure with a 'parameters' object containing 'tree'
		// and 'example' as the key for the actual tree data.
		// You should adjust the structure according to your actual JSON format.
		if (jsonData) {
			const rootData = jsonData;
			return buildNode(rootData); // Build the tree starting from the root node
		} else {
			console.error("Invalid JSON structure for tree data");
			return null; // Return null or throw an error if the structure is not as expected
		}
	}
}

export default TreeGraph;
