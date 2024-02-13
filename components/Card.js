import React, { useEffect, useRef } from "react";
import { Animated, View, TouchableOpacity, Text, Keyboard } from "react-native";
import { COLORS } from "../helpers/constants";

const Card = ({ title, content }) => {
	useEffect(() => {
		return () => {};
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.content}>
				<Text>{content}</Text>
			</View>
			<TouchableOpacity activeOpacity={1}>
				{/* <Icon></Icon> */}
			</TouchableOpacity>
		</View>
	);
};

// // You can define your styles here
const styles = {
	// In your FadeOutExample styles
	container: {
		flex: 1,
		alignItems: "center",
		background: COLORS.SURFACE,
		flexDirection: "column",
	},
	title: {
		color: COLORS.TEXT,
		fontSize: 30,
		top: 30,
		padding: 20,
	},
	content: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
	},
	contextText: {
		color: COLORS.TEXT,
		fontSize: 20,
	},
};

export default Card;
