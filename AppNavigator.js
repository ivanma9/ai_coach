import React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InitialPage from "./pages/InitialPage"; // Update with the correct path
import ChatUI from "./pages/ChatUI"; // Update with the correct path
import TreeDiffComponent from "./components/TreeDiffComponent";
// import ResultsPage from "./pages/ResultsPage"; // Update with the correct path

const Stack = createNativeStackNavigator();

function AppNavigator({ navigation }) {
	return (
		<Stack.Navigator initialRouteName="InitialPage">
			<Stack.Screen
				name="InitialPage"
				options={{ headerShown: false, cardOverlayEnabled: true }}
				component={InitialPage}
			/>
			<Stack.Screen
				name="ChatUI"
				options={{
					headerMode: "float",
					headerShadowVisible: "true",
					headerStyle: {
						backgroundColor: "black",
					},
					headerTintColor: "white",
					headerBackVisible: false,
					headerRight: () => (
						<Button
							onPress={() => navigation.navigate("HabitDeckPage")}
							title="Next"
							color="#fff"
						/>
					),
				}}
				component={ChatUI}
			/>
			<Stack.Screen
				name="TreeDiff"
				options={{
					title: "New changes",
					headerMode: "float",
					headerShadowVisible: "true",
					headerStyle: {
						backgroundColor: "black",
					},
					headerTintColor: "white",
					headerBackVisible: false,
				}}
				component={TreeDiffComponent}
			/>
			<Stack.Screen
				name="HabitDeckPage"
				options={{
					title: "New changes",
					headerMode: "float",
					headerShadowVisible: "true",
					headerStyle: {
						backgroundColor: "black",
					},
					headerTintColor: "white",
					headerBackVisible: false,
				}}
				component={TreeDiffComponent}
			/>
			{/* <Stack.Screen name="ResultsPage" component={ResultsPage} /> */}
		</Stack.Navigator>
	);
}

export default AppNavigator;
