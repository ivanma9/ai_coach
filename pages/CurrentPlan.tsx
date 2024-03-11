import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../helpers/constants";
import { RatingList } from "../components/RatingList";

const CurrentPlan = ({ navigation, route }) => {
	const { habits, altText, planTitle } = route.params;

	useEffect(() => {
		navigation.setOptions({ title: planTitle });
	}, []);

	const handleSubmit = () => {
		navigation.navigate("Saved Plans");
	};

	return (
		<View style={{ flex: 1 }}>
			<RatingList list={habits} altText={altText} />
			<TouchableOpacity onPress={handleSubmit} style={styles.to}>
				<View style={styles.finishButton}>
					<Text style={styles.submitText}>Finish</Text>
				</View>
			</TouchableOpacity>
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

export default CurrentPlan;
