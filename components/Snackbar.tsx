import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MotiView } from "moti"; // Import MotiView for animations
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { COLORS, FONT_SIZE } from "../helpers/constants";

const Snackbar = ({ message, visible }) => {
	return (
		<MotiView
			from={{ opacity: 0 }} // Start from opacity 0
			animate={{ opacity: visible ? 1 : 0 }} // Animate to opacity 1 if visible, otherwise back to 0
			transition={{ type: "timing", duration: 500 }} // Define the animation transition
			style={styles.container}
		>
			<MaterialIcon
				name={"check"}
				size={FONT_SIZE.NOTIFICATION + 5}
				color={COLORS.USER_TEXT}
				margin={5}
				padding={0}
			/>
			<Text style={styles.text}>{message}</Text>
		</MotiView>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 15,
		left: 0,
		right: 0,
		backgroundColor: COLORS.USER_BUBBLE,
		padding: 16,
		marginHorizontal: 10,
		zIndex: 1000,
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 10,
	},
	text: {
		color: COLORS.USER_TEXT,
		textAlign: "center",
		marginLeft: 10,
		fontSize: FONT_SIZE.NOTIFICATION,
	},
});

export default Snackbar;
