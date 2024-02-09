import React, { useState } from "react";
import Svg, { Circle, G, Rect, Text as SvgText } from "react-native-svg";
import { TREE_NODE } from "../helpers/constants";

const TreeNodeComponent = ({ node, x, y, newNodes }) => {
	const [textWidth, setTextWidth] = useState(0);
	const nodeData = node ? node.data : "Undefined";

	// This function is called when the text is laid out
	// We use it to set the width of the text
	const handleTextLayout = (e) => {
		setTextWidth(e.nativeEvent.layout.width);
	};

	const isNewNode = (node_data) => {
		const newNode = newNodes.find((data) => data === node_data);
		if (newNode) {
			console.log("found going GREEN");
			return TREE_NODE.COLOR_NEW_NODE;
		}
		console.log("not found going BLUE");
		return TREE_NODE.COLOR;
	};

	// Calculate the width of the rectangle based on the text width
	// Add some padding to ensure the text fits within the rectangle
	const padding = 20; // 10 padding on each side
	const rectangleWidth = textWidth + padding;
	const rectangleHeight = TREE_NODE.HEIGHT; // Fixed height for all nodes
	const cornerRadius = TREE_NODE.WIDTH; // Corner radius for the rounded rectangle

	return (
		<G>
			{/* Rounded rectangle behind the text */}
			{/* <Rect
				x={x - rectangleWidth / 2}
				y={y - rectangleHeight / 2}
				rx={cornerRadius}
				ry={cornerRadius}
				width={rectangleWidth}
				height={rectangleHeight}
				fill={TREE_NODE.COLOR}
			/> */}
			<Circle
				cx={x}
				cy={y}
				r={50}
				stroke="white"
				strokeWidth="1"
				fill={isNewNode(nodeData)}
			/>
			{/* Text element for the node */}
			<SvgText
				x={x}
				y={y}
				fontSize="15"
				textAnchor="middle"
				fill={TREE_NODE.TEXT_COLOR}
				alignmentBaseline="middle"
				onLayout={handleTextLayout}
			>
				{nodeData}
			</SvgText>
		</G>
	);
};

export default TreeNodeComponent;
