import React, { Children, useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { View as MotiView, AnimatePresence } from "moti";

const Expandable = ({
	children,
	expandedHeight = "100%",
	width,
	active = false,
}) => {
	const [expanded, setExpanded] = useState(active);

	const toggleExpansion = () => {
		setExpanded((prev) => !prev);
	};

	const childrenArray = Children.toArray(children);
	const headerComponent = childrenArray[0];
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
						from={{ height: "0%", opacity: 0 }}
						animate={{ height: expandedHeight, opacity: 1 }}
						exit={{ height: "0%", opacity: 0 }}
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
