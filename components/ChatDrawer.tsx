import { createDrawerNavigator } from "@react-navigation/drawer";
import ChatUI from "../pages/ChatUI";
import { AboutUs } from "../pages/AboutUs";
import { COLORS } from "../helpers/constants";
import { HabitLists } from "../pages/HabitLists";
import LoginScreen from "../pages/LoginPage";
import { CustomDrawerContent } from "./CustomDrawerContent";

const Drawer = createDrawerNavigator();

export const ChatDrawer = () => {
	return (
		<>
			<Drawer.Navigator
				initialRouteName="Coach"
				screenOptions={{
					drawerStyle: {
						backgroundColor: COLORS.BACKGROUND,
						width: 200,
					},
					drawerType: "front",
					drawerActiveTintColor: COLORS.TEXT,
					drawerInactiveTintColor: COLORS.TEXT,
				}}
				drawerContent={(props) => <CustomDrawerContent {...props} />}
			>
				<Drawer.Screen
					name="Chat"
					options={{
						title: "Coach",
						headerStyle: {
							backgroundColor: "black",
						},
						headerTintColor: "white",
					}}
					component={ChatUI}
				/>
				<Drawer.Screen
					name="About Us"
					options={{
						title: "About Us",
						headerStyle: {
							backgroundColor: "black",
						},
						headerTintColor: "white",
						headerShadowVisible: false,
					}}
					component={AboutUs}
				/>
				<Drawer.Screen
					name="Saved Plans"
					options={{
						title: "Saved Plans",
						headerStyle: {
							backgroundColor: "black",
						},
						headerTintColor: "white",
						headerShadowVisible: false,
					}}
					component={HabitLists}
				/>
				<Drawer.Screen
					name="Logout"
					options={{
						title: "Log out",
						headerStyle: {
							backgroundColor: "black",
						},
						headerShadowVisible: false,
					}}
					component={LoginScreen}
				/>
			</Drawer.Navigator>
		</>
	);
};
