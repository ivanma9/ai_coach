import { COLORS } from "../helpers/constants";
import {
	StyleSheet,
	Pressable,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import Card from "./Card";
import { getBranch } from "../helpers/getBranch";
import { useEffect, useState } from "react";
import { MotiView } from "moti";
import Expandable from "./Expandable";

enum CardType {
	Grandparent = "grandparent",
	Parent = "parent",
}

const CardView = ({ habit, tree }) => {
	console.log("----------------------HABIT");
	console.log(habit);
	const habitId = habit.index;
	const windowWidth = useWindowDimensions().width;
	const ancestors = getBranch(tree, habit.item);
	const grandparent = ancestors[ancestors.length - 3];
	const parent = ancestors[ancestors.length - 2];
	const child = ancestors[ancestors.length - 1];

	const [grandparentStyle, setGrandparentStyle] = useState({
		width: "80%",
		height: 60,
	});

	const [parentStyle, setParentStyle] = useState({ width: "90%", height: 60 });

	// useEffect(async () => {
	// 	const habitsIn = await AsyncStorage.getItem("starredHabits");
	// 	let updatedHabits = [];
	// 	if (habitsIn) {
	// 		updatedHabits = JSON.parse(habitsIn);
	// 	}
	// 	updatedHabits = await AsyncStorage.setItem(
	// 		"habits",
	// 		JSON.stringify(updatedHabits)
	// 	);
	// }, []);

	return (
		<View
			style={{
				width: windowWidth * 0.85,
				backgroundColor: COLORS.BACKGROUND,
				alignItems: "center",
				padding: 20,
				height: "85%",
			}}
		>
			{grandparent && (
				<Expandable width={"80%"}>
					<View style={[styles.grandparent, styles.headerComponent]}>
						<Text style={[styles.cardTitle, { fontSize: 30 * 0.8 }]}>
							{grandparent.data}
						</Text>
					</View>
					<View style={styles.grandparent}>
						<Card
							title={grandparent.data}
							size={0.9}
							content={grandparent.data}
							isHabit={false}
						></Card>
					</View>
				</Expandable>
			)}
			<Expandable width={"90%"}>
				<View style={[styles.parent, styles.headerComponent]}>
					<Text style={[styles.cardTitle, { fontSize: 30 * 0.9 }]}>
						{parent.data}
					</Text>
				</View>
				<View style={styles.parent}>
					<Card
						title={parent.data}
						size={0.9}
						content={parent.data}
						isHabit={false}
					></Card>
				</View>
			</Expandable>

			<View style={[styles.habitContainer, { width: "100%", height: "100%" }]}>
				<Text style={[styles.cardTitle, { fontSize: 30 }]}>{child.data}</Text>
				<Card
					title={child.data}
					size={1.0}
					content={child.data}
					isHabit={true}
				></Card>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	grandparent: {
		backgroundColor: COLORS.SURFACE1,
	},
	parent: {
		backgroundColor: COLORS.SURFACE2,
	},
	habitContainer: {
		backgroundColor: COLORS.SURFACE3,
		alignItems: "center",
		borderRadius: 25,
	},
	headerComponent: {
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		height: 60,
		alignItems: "center",
	},
	cardTitle: {
		color: COLORS.TEXT,
		top: 10,
		padding: 5,
	},
});
export default CardView;
