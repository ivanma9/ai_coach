import React from "react";
import Svg, { G, Line } from "react-native-svg";
import TreeNodeComponent from "./TreeNodeComponent";

const TreeGraphComponent = ({ rootNode }) => {
	const renderTree = (node, x, y, level, horizontalSpacing) => {
		const children = node.children;
		const radius = 20; // Same radius as in TreeNodeComponent

		return (
				<G key={node.id}>
					{/* Render the current node */}
					<TreeNodeComponent node={node} x={x} y={y} radius={radius}/>

					{/* Recursively render children nodes */}
					{children.length > 0? 
						children.map((child, index) => {
							const childX = x + (index - children.length / 2) * horizontalSpacing;
							const childY = y + 100; // Vertical spacing

							return (
								<G key={child.id}>
									{/* Line connecting to the child node */}
									<Line x1={x} y1={y + radius} x2={childX} y2={childY} stroke="black" />

									{/* Recursive call for the child node */}
									{renderTree(child, childX, childY, level + 1, horizontalSpacing)}
								</G>
							);
						})
						: console.log("no children")}
					
				</G>
		);
	};

	return (
		<Svg>
			<G>
				{renderTree(rootNode, 200, 50, 0, 100)}
			</G>
		</Svg>
	);
};

export default TreeGraphComponent;
