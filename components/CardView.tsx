import { COLORS } from "../helpers/constants";
import { StyleSheet, Pressable, View, useWindowDimensions } from "react-native";
import Card from "./Card";
import { getBranch } from "../helpers/getBranch";
import { useEffect, useState } from "react";

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

	const adjustedHeight = 200;
	const onCardSelect = (cardType: CardType) => {
		if (cardType === CardType.Grandparent) {
			setGrandparentStyle({ width: "100%", height: adjustedHeight });
		}
		if (cardType === CardType.Parent) {
			setParentStyle({ width: "100%", height: adjustedHeight });
		}
	};

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
				<Pressable
					style={styles.grandparent}
					onPress={() => onCardSelect(CardType.Grandparent)}
				>
					<Card
						title={grandparent.data}
						size={0.9}
						content={grandparent.data}
					></Card>
				</Pressable>
			)}

			{/* <Grandparent grandparent={grandparent}></Grandparent> */}
			{/* { height: 60, width: "90%" } */}
			<Pressable
				style={styles.parent}
				onPress={() => onCardSelect(CardType.Parent)}
			>
				<Card title={parent.data} size={0.9} content={parent.data}></Card>
			</Pressable>
			<View style={[styles.habitContainer, { width: "100%", height: "100%" }]}>
				<Card title={child.data} size={1.0} content={child.data}></Card>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	grandparent: {
		backgroundColor: COLORS.SURFACE1,
		borderColor: "black",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
	},
	parent: {
		backgroundColor: COLORS.SURFACE2,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
	},
	habitContainer: {
		backgroundColor: COLORS.SURFACE3,
		borderRadius: 25,
	},
	text: {
		// flex: 1,
		color: "white",
		marginBottom: 80,
	},
});
export default CardView;
