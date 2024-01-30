import React from "react";
import Svg, { G, Circle, Text as SvgText } from "react-native-svg";

const TreeNodeComponent = ({ node, x, y }) => {
	const radius = "20"; // Radius of the node circle
	const nodeData = node ? node.data : "Undefined banana";

	return (
		// <Svg>
		<G>
			{/* Circle representing the node */}
			<Circle cx={x} cy={y} r={radius} fill="blue" />

			{/* Text inside the node, displaying the node's ID */}
			<SvgText
				x={x}
				y={y}
				fontSize="10"
				textAnchor="middle"
				fill="white"
				dy=".3em" // Center text vertically in the circle
			>
				{nodeData}
			</SvgText>
		</G>
		// </Svg>
	);
};

export default TreeNodeComponent;
