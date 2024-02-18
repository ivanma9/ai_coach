import TreeNode from "../components/TreeNode";

export const getBranch = (tree: TreeNode, leaf: String) => {
	console.log("tree", tree);
	console.log("leaf", leaf);
	let ancestors = [];
	function findAncestors(root, target) {
		if (!root) return false; // Base case: root is null
		if (root.data === target) {
			ancestors.push(root);
			return true; // Target node found
		}
		// For each child, check if the target is in its subtree
		for (const child of root.children) {
			ancestors.push(root); // Add current node to ancestors
			if (findAncestors(child, target)) return true;
			ancestors.pop(); // Remove current node, as target not in this subtree
		}

		return false; // Target not found in this tree
	}
	return findAncestors(tree, leaf) ? ancestors : [];
};
