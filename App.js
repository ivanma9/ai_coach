import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TreeGraph from "./components/TreeGraph";
import TreeGraphComponent from "./components/TreeGraphComponent";
import TreeNode from "./components/TreeNode";
import json_data from "./data/data1.json";

export default function App() {
	// Build the tree
	// const tree_root = build_tree(json_data);
// console.log(JSON.stringify(json_data, null, 2));
console.log(JSON.stringify(json_data));
	let parsedData;
	try {
		parsedData = JSON.parse(JSON.stringify(json_data));
    console.log(parsedData.parameters);
	} catch (e) {
		console.error("Error parsing JSON:", e);
	}

  const childNode = new TreeNode("77", true, [])

  const rootNode = new TreeNode("99", true, [childNode]);

	// useEffect(() => {
	// 	fetch("/api/tree")
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setAccuracy(data.accuracy);
	// 		});
	// }, []);
	const treeGraph = new TreeGraph(parsedData);
  console.log(treeGraph)
	// console.log(treeGraph.name)
	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app!</Text>
      <TreeGraphComponent rootNode={treeGraph.tree}/>
			<StatusBar style="auto" />
		</View>
	);

	// return <TreeGraphComponent tree={treeGraph.tree} />;

	// return (
	// 	<View style={styles.container}>
	// 		<Text>Open up App.js to start orking on your app!</Text>

	// 		<StatusBar style="auto" />
	// 	</View>
	// );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
