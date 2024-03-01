import React from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableHighlight,
	Image,
} from "react-native";
import {
	GoogleSignin,
	GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../helpers/constants";

// GoogleSignin.configure({
// 	// scopes: ['https://www.googleapis.com/auth/drive.readonly'], // if you want access to specific Google API scopes
// 	webClientId: "YOUR_WEB_CLIENT_ID_FROM_GOOGLE_CONSOLE", // client ID of type WEB from Google Console
// });

export default function LoginScreen({ navigation }) {
	// const signIn = async () => {
	// 	try {
	// 		await GoogleSignin.hasPlayServices();
	// 		const userInfo = await GoogleSignin.signIn();
	// 		// Handle the user info as needed, e.g., save to state, navigate, etc.
	// 		console.log(userInfo);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	const handleMessageSubmit = async () => {
		try {
			const chatMsg = await AsyncStorage.setItem(
				"firstMessage",
				"Let's get started"
			);
			navigation.navigate("ChatUI");
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<View style={styles.container}>
			{/* <Text style={styles.title}>Sign in</Text> */}
			{/* <Image source={Logo} width={100} height={100}></Image> */}
			<Image
				source={require("../assets/LogoWhiteCorner.png")} // Update the path to where your logo is located
				style={styles.logo}
			/>
			<TextInput
				placeholder="Email"
				placeholderTextColor="gray"
				style={styles.input}
			/>
			<TextInput
				placeholder="Password"
				placeholderTextColor="gray"
				secureTextEntry
				style={styles.input}
			/>
			<TouchableHighlight onPress={handleMessageSubmit}>
				<View style={styles.loginButton}>
					<Text style={{ color: COLORS.TEXT }}>Login</Text>
				</View>
			</TouchableHighlight>
			{/* Implement your login logic */}
			{/* <GoogleSigninButton
				style={styles.googleButton}
				size={GoogleSigninButton.Size.Wide}
				color={GoogleSigninButton.Color.Dark}
				onPress={signIn}
			/> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: COLORS.BACKGROUND,
	},
	logo: {
		width: 120, // Adjust the width as necessary
		height: 120, // Adjust the height as necessary
		marginBottom: 20, // Adds some space below the logo
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
		color: COLORS.TEXT,
	},
	input: {
		width: "100%",
		marginVertical: 10,
		padding: 15,
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 5,
		color: COLORS.FEINT_TEXT,
	},
	googleButton: {
		width: 192,
		height: 48,
		marginTop: 30,
	},
	loginButton: {
		backgroundColor: COLORS.PRIMARY,
		padding: 20,
		width: 150,
		marginTop: 30,

		alignItems: "center",
		justifyContent: "center",
		borderRadius: 45,
	},
});
