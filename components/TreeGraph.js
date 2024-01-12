import TreeNode from "./TreeNode";

class TreeGraph {
	constructor(jsonData) {
		this.tree = this.buildTree(jsonData);
		this.name = "Heyyy";
	}

	buildTree(jsonData) {
		// Inner function to recursively build nodes
		const buildNode = (nodeData) => {
			const { id, isHabit, children } = nodeData;
			console.log(id)
			const childNodes = children ? children.map(buildNode) : []; // Handle children if they exist
			return new TreeNode(id, isHabit, childNodes);
		};

		// Assuming jsonData has the structure with a 'parameters' object containing 'tree'
		// and 'example' as the key for the actual tree data.
		// You should adjust the structure according to your actual JSON format.
		if (
			jsonData &&
			jsonData.parameters &&
			jsonData.parameters.properties.tree &&
			jsonData.parameters.properties.tree.example
		) {
			const rootData = jsonData.parameters.properties.tree.example;
			return buildNode(rootData); // Build the tree starting from the root node
		} else {
			console.error("Invalid JSON structure for tree data");
			return null; // Return null or throw an error if the structure is not as expected
		}
	}
}

export default TreeGraph;
