import React, { Children, useEffect, useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { View as MotiView, AnimatePresence } from "moti";

const Expandable = ({
	children,
	expandedHeight,
	width,
	curve = 0,
	active = false,
}) => {
	// const [height, setHeight] = useState(0);
	const [expanded, setExpanded] = useState(active);

	const toggleExpansion = () => {
		// setHeight(expandedHeight);
		setExpanded((prev) => !prev);
	};

	const childrenArray = Children.toArray(children);
	const headerComponent = React.cloneElement(childrenArray[0], {
		style: [
			// Original styles of the header component
			childrenArray[0].props.style,
			// Conditional styles based on `expanded`
			!expanded
				? { borderBottomLeftRadius: curve, borderBottomRightRadius: curve }
				: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
		],
	});
	const contentComponents = childrenArray.slice(1);

	return (
		<Pressable
			onPress={toggleExpansion}
			onLongPress={toggleExpansion}
			style={[{ width: width }, styles.container]}
		>
			{headerComponent}
			<AnimatePresence>
				{expanded && (
					<MotiView
						from={{ height: 0, opacity: 0.6 }}
						animate={{ height: expandedHeight, opacity: 1 }}
						exit={{ height: 0, opacity: 0.6 }}
						transition={{ type: "timing", duration: 500 }}
					>
						{contentComponents}
					</MotiView>
				)}
			</AnimatePresence>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 4,
		overflow: "hidden",
	},
});

export default Expandable;
