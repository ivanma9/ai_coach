import React from "react";
import Svg, { G, Line } from "react-native-svg";
import { COLORS, TREE_NODE } from "../helpers/constants";
import TreeNodeComponent from "./TreeNodeComponent";

const TreeGraphComponent = ({
	rootNode,
	containerWidth,
	containerHeight,
	newNodes,
}) => {
	const calculateTreeLayout = (rootNode, containerWidth, containerHeight) => {
		const levelHeight = 400;
		const nodeRadius = 50;
		const positions = new Map();

		// Start BFS from the root node
		let queue = [
			{ node: rootNode, x: containerWidth / 2, y: nodeRadius, level: 0 },
		];

		while (queue.length > 0) {
			let { node, x, y, level } = queue.shift();

			// Store the position for the current node
			positions.set(node, { x, y });

			// Calculate horizontal spacing based on the level
			let horizontalSpacing =
				containerWidth / Math.pow(TREE_NODE.SPREAD, level + 1);

			// Queue children for the next level
			node.children.forEach((child, index) => {
				let childX =
					x -
					(horizontalSpacing * (node.children.length - 1)) / 2 +
					horizontalSpacing * index;
				let childY = y + levelHeight;
				queue.push({ node: child, x: childX, y: childY, level: level + 1 });
			});
		}

		return positions;
	};

	const positions = calculateTreeLayout(
		rootNode,
		containerWidth,
		containerHeight
	);
	return (
		<Svg style={{ width: containerWidth, height: containerHeight }}>
			{[...positions].map(([node, { x, y }]) => (
				<G key={node.data}>
					<TreeNodeComponent
						newNodes={newNodes}
						node={node}
						x={x}
						y={y}
						radius={20}
					/>
					{node.children.map((child) => (
						<Line
							key={child.data}
							x1={x}
							y1={y + 50}
							x2={positions.get(child).x}
							y2={positions.get(child).y - 50}
							stroke={COLORS.LINE_STROKE}
						/>
					))}
				</G>
			))}
		</Svg>
	);
};

export default TreeGraphComponent;
