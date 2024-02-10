import { useEffect, useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import FadeOutComponent from "./FadeOutComponent";
import TreeGraphComponent from "./TreeGraphComponent";
import TreeMapComponent from "./TreeMapComponent";

const TreeDiffComponent = ({ route, navigation }) => {
	const { treeGraphs, newNodes } = route.params;
	const [currentTreeIndex, setCurrentTreeIndex] = useState(0);

	const windowWidth = useWindowDimensions().width;
	const windowHeight = useWindowDimensions().height;
	console.log(windowWidth);
	console.log(windowHeight);

	const onFadeComplete = () => {
		console.log("CurrentTreeIndex: ", currentTreeIndex);
		if (currentTreeIndex < treeGraphs.length - 1) {
			setCurrentTreeIndex(currentTreeIndex + 1);
		} else {
			console.log("RESET ...");
			setCurrentTreeIndex(0);
			navigation.navigate("ChatUI");
		}
	};

	useEffect(() => {
		console.log("-------------TREE DIFF COMPONENT MOUNTED --------------");
	}, []);

	return (
		<View style={styles.container}>
			<FadeOutComponent
				key={currentTreeIndex}
				index={currentTreeIndex}
				component={() => (
					<TreeMapComponent
						rootNode={treeGraphs[currentTreeIndex]}
						containerWidth={windowWidth}
						containerHeight={windowHeight}
						newNodes={newNodes}
					/>
				)}
				onFadeComplete={onFadeComplete}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "black",
	},
	// Define other styles as needed
});

export default TreeDiffComponent;
