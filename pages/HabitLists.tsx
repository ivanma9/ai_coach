import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	TouchableHighlight,
} from "react-native";
import { COLORS } from "../helpers/constants";
import { useStore } from "../components/Store";

const Item = ({ title, id, habits, navigation }) => {
	return (
		<TouchableHighlight
			style={[styles.titleContainer]}
			onPress={() =>
				navigation.navigate("Plan", {
					habits: habits,
					altText: "No habits found",
					planTitle: title,
				})
			}
		>
			<Text style={[styles.title, { color: COLORS.TEXT }]}>{title}</Text>
		</TouchableHighlight>
	);
};

export const HabitLists = ({ navigation }) => {
	// saved the list of starred lists
	const retrievedPlans = useStore((state) => state.list);
	const sampleSavedPlans = [
		{ planTitle: "Plan 1" },
		{ planTitle: "Plan 2" },
		{ planTitle: "Plan 3" },
	];
	return (
		<ScrollView
			style={styles.savedPlans}
			contentContainerStyle={styles.content}
		>
			{retrievedPlans.map((item, index) => (
				<Item
					key={index}
					title={item.planTitle}
					habits={item.plan}
					id={index + 1}
					navigation={navigation}
				/>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	savedPlans: {
		backgroundColor: COLORS.BACKGROUND,
	},
	content: {
		alignItems: "center",
		justifyContent: "center",
	},
	titleContainer: {
		padding: 10,
		marginTop: 15,
		marginHorizontal: 20,
		borderWidth: 2,
		width: 300,

		borderRadius: 15,
		backgroundColor: COLORS.SURFACE,
		borderColor: COLORS.SURFACE,
		flexDirection: "row",
		alignItems: "center",
	},
	title: {
		flex: 1,
		fontSize: 18,
		fontWeight: "bold",
		color: COLORS.TEXT,
	},
});
