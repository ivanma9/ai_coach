import React, { useState } from "react";
import {
	View,
	Image,
	Text,
	TextInput,
	Button,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import icecube from "../assets/Ice_Cube.png";
import TreeNode from "../components/TreeNode";
import { COLORS } from "../helpers/constants";

const InitialPage = ({ navigation }) => {
	const [firstMessage, setFirstMessage] = useState("");

	const handleMessageSubmit = async () => {
		try {
			treeGraph = await AsyncStorage.setItem("firstMessage", firstMessage);
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
			<TouchableOpacity style={styles.button} onPress={handleMessageSubmit}>
				<Text style={{ color: COLORS.TEXT }}>START</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.BACKGROUND,
		alignItems: "center",
		justifyContent: "center",
	},
	ti: {
		alignSelf: "stretch",
		color: COLORS.TEXT,
		fontSize: 25,
		padding: 0,
		borderBottomColor: COLORS.PRIMARY,
		borderBottomWidth: 2,
		marginHorizontal: 65,
		marginBottom: 20,
		marginTop: 60,
	},
	text: {
		color: COLORS.FEINT_TEXT,
		marginBottom: 80,
	},
	image: {
		width: "30%", // Adjust the width to fit one-third of the container
		height: "30%",
		aspectRatio: 1, // Maintain the aspect ratio to prevent distortion
	},
	button: {
		backgroundColor: COLORS.PRIMARY,
		padding: 20,
		width: 150,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 45,
	},
});

export default InitialPage;
