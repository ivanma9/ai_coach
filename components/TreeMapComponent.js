import React, { useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import PanPinchView from "react-native-pan-pinch-view";
import { TREE_MAP } from "../helpers/constants";
import TreeGraphComponent from "./TreeGraphComponent";

const TreeMapComponent = ({
	rootNode,
	containerWidth,
	containerHeight,
	newNodes,
}) => {
	const padding = 100;
	console.log(containerHeight - padding);
	const panRef = useRef(null);

	useEffect(() => {
		panRef.current?.translateTo(
			containerWidth / 2 - TREE_MAP.CONTENT_WIDTH / 2,
			padding
		);
	}, []);

	return (
		<View style={styles.pinchView}>
			<PanPinchView
				ref={panRef}
				maxScale={4}
				minScale={0.2}
				initialScale={1}
				containerDimensions={{
					width: TREE_MAP.CONTAINER_WIDTH,
					height: TREE_MAP.CONTAINER_HEIGHT,
				}}
				contentDimensions={{
					width: TREE_MAP.CONTENT_WIDTH,
					height: TREE_MAP.CONTENT_HEIGHT,
				}}
			>
				{/* <Image
					onLayout={console.log("IMAGE MOUNT")}
					source={require("../assets/Ice_Cube.png")}
				/> */}
				<TreeGraphComponent
					rootNode={rootNode}
					containerWidth={TREE_MAP.CONTENT_WIDTH}
					containerHeight={TREE_MAP.CONTENT_HEIGHT}
					newNodes={newNodes}
				/>
			</PanPinchView>
		</View>
	);
};

const styles = StyleSheet.create({
	pinchView: {
		padding: 10,
		flex: 1,
	},
});

export default TreeMapComponent;
