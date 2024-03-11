import React, { useContext, useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	Pressable,
	StyleSheet,
	ScrollView,
	LayoutChangeEvent,
	TouchableOpacity,
} from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
import HabitsContext from "../components/HabitsContext";
import { COLORS } from "../helpers/constants";
import { getHabitTreeNode } from "../helpers/getHabitTreeNode";
import { useStore } from "../components/Store";
import { RatingList } from "../components/RatingList";
import Snackbar from "../components/Snackbar";
import { sleep } from "../helpers/util";

const StarredHabitsPage = ({ navigation, route }) => {
	const { habits, tree } = route.params;
	const { toggleStarredStatus, starredHabits } = useContext(HabitsContext);
	const addToList = useStore((state) => state.addToList);
	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const actionPerformedRef = useRef(false);

	const allHabitNodes = habits.map((habit) => [
		getHabitTreeNode(tree, habit),
		0,
	]);

	const sortHabits = () => {
		return allHabitNodes
			.map((habitNode) => {
				console.log(habitNode);
				console.log(habitNode[0].data);
				return starredHabits[habitNode[0].data]
					? [habitNode[0], starredHabits[habitNode[0].data]]
					: habitNode;
			})
			.sort((node1, node2) => node2[1] - node1[1]);
	};
	const sortedHabitNodes =
		habits && habits.length > 0 ? sortHabits() : allHabitNodes;

	const handleSubmit = async () => {
		if (actionPerformedRef.current) {
			return;
		}
		addToList({ planTitle: "Ayo chill", plan: sortedHabitNodes }, (error) => {
			if (error) {
				// Set the Snackbar message to the error message and make it visible
				setSnackbarMessage(`Failed to add plan item: ${error.message}`);
				setSnackbarVisible(true);
				// Optionally, hide the Snackbar after a few seconds
				setTimeout(() => setSnackbarVisible(false), 3000);
			} else {
				console.log("snack");
				// Set a success message and show the Snackbar
				setSnackbarMessage("Plan item added successfully");
			}
		});
		actionPerformedRef.current = true;
		setSnackbarVisible(true);
		await sleep(3000);
		setSnackbarVisible(false);
		await sleep(2000);
		navigation.navigate("ChatUI");
	};

	return (
		<View style={{ flex: 1 }}>
			<View>{/* Profile info */}</View>
			<RatingList list={sortedHabitNodes} altText={"No habits found"} />
			<TouchableOpacity onPress={handleSubmit} style={styles.to}>
				<View style={styles.finishButton}>
					<Text style={styles.submitText}>Finish</Text>
				</View>
			</TouchableOpacity>
			{snackbarVisible && (
				<Snackbar message={snackbarMessage} visible={snackbarVisible} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	to: {
		position: "absolute", // Position the button container absolutely to float above the ScrollView
		bottom: 20, // Distance from the bottom of the screen
		left: 0,
		right: 0,
		alignItems: "center", // Center the button horizontally
	},
	finishButton: {
		alignItems: "center", // Center the button horizontally
		justifyContent: "center",
		height: 60,
		width: 200,
		borderRadius: 45,
		borderWidth: 1,
		backgroundColor: COLORS.SURFACE3,
		marginBottom: 50,
		zIndex: 2,
	},
	submitText: {
		color: COLORS.TEXT,
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default StarredHabitsPage;
