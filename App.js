import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import AppNavigator from "./AppNavigator";

export default function App() {
	// Build the tree
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
