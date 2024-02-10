import React, { useState } from "react";
import { View, Image, Text, TextInput, Button, StyleSheet } from "react-native";
import TreeNode from "../components/TreeNode";

const HabitDeck = ({ navigation, route }) => {
	const { habits } = route.params;

	const [firstMessage, setFirstMessage] = useState("");

	const handleMessageSubmit = async () => {
		try {
			treeGraph = await AsyncStorage.setItem("firstMessage", firstMessage);
			console.log("to chat ui");
			navigation.navigate("ChatUI");
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
	},
	ti: {
		alignSelf: "stretch",
		color: "white",
		fontSize: 25,
		padding: 0,
		borderBottomColor: "white",
		borderBottomWidth: 2,
		marginHorizontal: 65,
		marginBottom: 20,
		marginTop: 60,
	},
	text: {
		color: "white",
		marginBottom: 80,
	},
});

export default HabitDeck;
