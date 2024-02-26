import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import AppNavigator from "./AppNavigator";
import { HabitsProvider } from "./components/HabitsContext";

export default function App() {
	// Build the tree

	return (
		<HabitsProvider>
			<NavigationContainer>
				<AppNavigator />
			</NavigationContainer>
			{/* <StatusBar style="auto" /> */}
		</HabitsProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
