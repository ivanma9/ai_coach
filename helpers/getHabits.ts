import TreeNode from "../components/TreeNode";

export const getHabits = (tree: TreeNode) => {
	let habits: String[] = [];
	if (!tree.children || tree.children.length === 0) return [tree.data];
	tree.children?.forEach((child) => {
		habits.push(...getHabits(child));
	});
	return habits;
};
