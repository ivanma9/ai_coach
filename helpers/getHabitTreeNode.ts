import TreeNode from "../components/TreeNode";

export const getHabitTreeNode = (root: TreeNode, target: String) => {
	if (!root) return null; // Base case: root is null
	if (root.data === target) {
		return root; // Target node found
	}
	// For each child, check if the target is in its subtree
	for (const child of root.children) {
		const node = getHabitTreeNode(child, target);
		if (node !== null) {
			return node;
		}
	}

	return null; // Target not found in this tree
};
