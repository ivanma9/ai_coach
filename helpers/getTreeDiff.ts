import TreeNode from "../components/TreeNode";

const addChildrenToStack = (node1, node2) => {
	let stack: TreeNode[][] = [[]];

	const children1: TreeNode[] = node1?.children || [];
	const children2: TreeNode[] = node2?.children || [];
	const matchedChildren1 = new Set<TreeNode>();
	for (let child of children2) {
		const matchingChild = children1.find((c) => c.data === child.data);
		if (matchingChild) {
			stack.push([matchingChild, child]);
			matchedChildren1.add(matchingChild);
		} else {
			// found in children2 not included in children1
			stack.push([null, child]);
		}
	}
	return stack;
};

export const getTreeDiff = (tree1: TreeNode, tree2: TreeNode): TreeNode[] => {
	let diffNodes: TreeNode[] = []; // These are the parents of the diffs
	let stack: TreeNode[][] = [[tree1, tree2]];

	while (stack.length > 0) {
		const [node1, node2] = stack.pop();
		console.log("WHILE");
		if (node1 == null && node2 == null) {
			console.log("NULLIFIED");
			continue;
		}
		// If one node is null (but not both) or their data differs, consider it a difference
		if (!node1 !== !node2 || node1?.data !== node2?.data) {
			console.log("nodes are different");
			if (node2 && node2.children && node2.children.length > 0) {
				diffNodes.push(node2);
				stack.push(...addChildrenToStack(node1, node2));
			}
		} else {
			// Go through the children
			// If both nodes exist and their data matches, compare their children
			if (node1.children.length !== node2.children.length) {
				// Different number of children means they're different
				console.log("Different number of children immedately there is diff");
				diffNodes.push(node2);
			} else {
				console.log(
					"Same number of children, but now we have to compare on next level"
				);
				// Same number of children, push them to stack for further comparison
				// need to match up the children so they are compared to the right child
				// in 1 and 2
				stack.push(...addChildrenToStack(node1, node2));
			}
		}
	}
	return diffNodes;
};
