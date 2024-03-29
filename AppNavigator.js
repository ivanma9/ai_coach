import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InitialPage from "./pages/InitialPage"; // Update with the correct path
import TreeDiffComponent from "./components/TreeDiffComponent";
import HabitDeckPage from "./pages/HabitDeckPage";
import StarredHabitsPage from "./pages/StarredHabitsPage";
import LoginScreen from "./pages/LoginPage";
import { ChatDrawer } from "./components/ChatDrawer";
import CurrentPlan from "./pages/CurrentPlan";
// import ResultsPage from "./pages/ResultsPage"; // Update with the correct path

const Stack = createNativeStackNavigator();

function AppNavigator({ navigation }) {
	return (
		<Stack.Navigator initialRouteName="Login">
			<Stack.Screen
				name="InitialPage"
				options={{ headerShown: false, cardOverlayEnabled: true }}
				component={InitialPage}
			/>
			<Stack.Screen
				name="Login"
				options={{ headerShown: false, cardOverlayEnabled: true }}
				component={LoginScreen}
			/>
			<Stack.Screen
				name="ChatUI"
				options={{
					headerShown: false,
					cardOverlayEnabled: true,
					gestureEnabled: false,
				}}
				component={ChatDrawer}
			/>
			<Stack.Screen
				name="Plan"
				options={{
					headerMode: "float",
					headerShadowVisible: "true",
					headerStyle: {
						backgroundColor: "black",
					},
					headerTintColor: "white",
				}}
				component={CurrentPlan}
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
					title: "Habits",
					headerMode: "float",
					headerShadowVisible: "true",
					headerStyle: {
						backgroundColor: "black",
					},
					headerTintColor: "white",
					headerBackVisible: true,
				}}
				component={HabitDeckPage}
			/>
			<Stack.Screen
				name="ResultsPage"
				options={{
					title: "Results",
					headerMode: "float",
					headerShadowVisible: "true",
					headerStyle: {
						backgroundColor: "black",
					},
					headerTintColor: "white",
					headerBackVisible: true,
				}}
				component={StarredHabitsPage}
			/>
		</Stack.Navigator>
	);
}

export default AppNavigator;
