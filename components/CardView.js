import { COLORS } from "../helpers/constants";
import { StyleSheet, Text, View } from "react-native";
import Card from "./Card";

const CardView = ({ habitName }) => {
	return (
		<View style={styles.container}>
			<Text>Hi {habitName}</Text>
			<View style={styles.grandparent}>
				<Card></Card>
			</View>
			<View style={styles.parent}>
				<Card></Card>
			</View>
			<View style={styles.habitContainer}>
				<Card></Card>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.TEST,
		alignItems: "center",
		justifyContent: "center",
	},
});
export default CardView;
