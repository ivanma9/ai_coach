import React from "react";
import {
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from "@react-navigation/drawer";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { COLORS } from "../helpers/constants";

export const CustomDrawerContent = (props) => {
	const { state, navigation } = props;
	const newState = { ...state };
	newState.routes = newState.routes.filter((item) => item.name !== "Logout"); // Remove 'Logout'

	const handleLogout = () => {
		// Remove session token
		console.log("Logged out");
		navigation.navigate("Login");
	};

	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={{
				flex: 1,
				flexDirection: "column",
				justifyContent: "space-between",
			}}
		>
			<SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
				<DrawerItemList {...props} state={newState} />
			</SafeAreaView>
			<View style={styles.bottomDrawerSection}>
				<DrawerItem
					label="Logout"
					labelStyle={{ color: COLORS.ERROR }}
					onPress={handleLogout} // Update with your logout logic
				/>
			</View>
		</DrawerContentScrollView>
	);
};

const styles = StyleSheet.create({
	bottomDrawerSection: {
		marginBottom: 15,
		borderTopColor: "#f4f4f4",
		borderTopWidth: 1,
		paddingTop: 15,
	},
});
