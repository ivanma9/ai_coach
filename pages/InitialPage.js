import React, { useState } from "react";
import { View, Image, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import icecube from "../assets/Ice_Cube.png";

const InitialPage = ({ navigation }) => {
	const [firstMessage, setFirstMessage] = useState("");

	// const handleMessageSubmit = () => {
	// 	navigation.navigate("ChatUI");
	// };
	const handleMessageSubmit = async () => {
		try {
			await AsyncStorage.setItem("firstMessage", firstMessage);
			console.log("to chat ui");
			navigation.navigate("ChatUI");
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<View style={styles.container}>
			<Image source={icecube} style={styles.image} resizeMethod="resize" />
			<TextInput
				style={styles.ti}
				placeholder="Who do you want to be?"
				placeholderTextColor="gray"
				value={firstMessage}
				onChangeText={setFirstMessage}
			/>
			<Text style={styles.text}>Literally say anything you want</Text>
			<Button
				title="START"
				onPress={handleMessageSubmit}
				color="white"
				fontSize="1"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
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
	image: {
		width: "30%", // Adjust the width to fit one-third of the container
		height: "30%",
		aspectRatio: 1, // Maintain the aspect ratio to prevent distortion
	},
});

export default InitialPage;
