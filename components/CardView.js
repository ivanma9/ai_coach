import { COLORS } from "../helpers/constants";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Card from "./Card";
import { getBranch } from "../helpers/getBranch";

const Grandparent = ({ grandparent, habitId }) => {
	if (grandparent === undefined) {
		return null;
	}
	return (
		<View style={styles.grandparent}>
			<Card
				title={grandparent.data}
				id={grandparent.data.concat(habitId)}
				size={0.8}
				content={grandparent.data}
			></Card>
		</View>
	);
};
const CardView = ({ habit, tree }) => {
	console.log("----------------------HABIT");
	console.log(habit);
	const habitId = habit.index;
	const windowWidth = useWindowDimensions().width;
	const ancestors = getBranch(tree, habit.item);
	const grandparent = ancestors[ancestors.length - 3];
	const parent = ancestors[ancestors.length - 2];
	const child = ancestors[ancestors.length - 1];

	return (
		<View
			style={{
				width: windowWidth * 0.85,
				backgroundColor: COLORS.BACKGROUND,
				alignItems: "center",
				padding: 20,
				height: "75%",
			}}
		>
			<Grandparent grandparent={grandparent} habitId={habitId}></Grandparent>
			<View style={styles.parent}>
				<Card
					title={parent.data}
					id={parent.data.concat(habitId)}
					size={0.9}
					content={parent.data}
				></Card>
			</View>
			<View style={styles.habitContainer}>
				<Card
					title={child.data}
					id={child.data.concat(habitId)}
					size={1.0}
					content={child.data}
				></Card>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	grandparent: {
		backgroundColor: COLORS.SURFACE1,
		height: 60,
		width: "80%",
		borderColor: "black",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
	},
	parent: {
		backgroundColor: COLORS.SURFACE2,
		height: 60,
		width: "90%",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
	},
	habitContainer: {
		backgroundColor: COLORS.SURFACE3,
		width: "100%",
		borderRadius: 25,
	},
	text: {
		// flex: 1,
		color: "white",
		marginBottom: 80,
	},
});
export default CardView;
