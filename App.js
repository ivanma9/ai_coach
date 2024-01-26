import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import FadeOutComponent from "./components/FadeOutComponent";
import TreeGraph from "./components/TreeGraph";
import TreeGraphComponent from "./components/TreeGraphComponent";
import TreeNode from "./components/TreeNode";
import json_data from "./data/data1.json";

export default function App() {
	// Build the tree

	const windowWidth = useWindowDimensions().width;
	const windowHeight = useWindowDimensions().height;
	console.log(windowWidth);
	console.log(windowHeight);

	let parsedData;
	try {
		parsedData = JSON.parse(JSON.stringify(json_data));
		console.log(parsedData.parameters);
	} catch (e) {
		console.error("Error parsing JSON:", e);
	}

	const childNode = new TreeNode("77", true, []);

	const rootNode = new TreeNode("99", true, [childNode]);

	// useEffect(() => {
	// 	fetch("/api/tree")
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setAccuracy(data.accuracy);
	// 		});
	// }, []);
	const treeGraph = new TreeGraph(parsedData);
	console.log(treeGraph);
	// console.log(treeGraph.name)
	return (
		<View style={styles.container}>
			<FadeOutComponent
				component={() => (
					<TreeGraphComponent
						rootNode={treeGraph.tree}
						containerWidth={windowWidth}
						containerHeight={windowHeight}
					/>
				)}
				containerWidth={windowWidth}
			/>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
