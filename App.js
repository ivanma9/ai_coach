import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import AppNavigator from "./AppNavigator";
import FadeOutComponent from "./components/FadeOutComponent";
import TreeGraph from "./components/TreeGraph";
import TreeGraphComponent from "./components/TreeGraphComponent";
import TreeNode from "./components/TreeNode";
import json_data from "./data/data1.json";
import InitialPage from "./pages/InitialPage";

export default function App() {
	// Build the tree

	const windowWidth = useWindowDimensions().width;
	const windowHeight = useWindowDimensions().height;

	// useEffect(() => {
	// 	fetch("/api/tree")
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setAccuracy(data.accuracy);
	// 		});
	// }, []);

	return (
		<NavigationContainer>
			<AppNavigator />
		</NavigationContainer>
		// 	{/* <StatusBar style="auto" /> */}
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
