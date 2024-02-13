import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import SwipeableViews from "react-swipeable-views";
import { isThisTypeNode } from "typescript";
import CardView from "../components/CardView";
import { COLORS } from "../helpers/constants";

const HabitDeckPage = ({ navigation, route }) => {
	const { habits, treeGraph } = route.params;

	const [habit, setHabit] = useState(null);
	const [index, setIndex] = useState(0);

	const { grandparent, parent, child } = getBranch(tree, currentHabit);

	useEffect(() => {
		console.log("habits in");
		habits.forEach((c) => console.log(c));
	}, []);

	const handleMessageSubmit = async () => {
		try {
			treeGraph = await AsyncStorage.setItem("firstMessage", firstMessage);
			console.log("to chat ui");
			navigation.navigate("ChatUI");
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<View style={styles.container}>
			<SwipeableViews index={index} onChangeIndex={setIndex(index)}>
				<CardView habitName={index}></CardView>
			</SwipeableViews>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.BACKGROUND,
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

export default HabitDeckPage;
