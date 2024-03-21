import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableHighlight,
	Image,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";
import {
	GoogleSignin,
	GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../helpers/constants";
import { MotiView } from "moti";
import {
	FormData,
	FormErrors,
	LoginFormData,
	LoginFormErrors,
} from "../helpers/interfaces";

// GoogleSignin.configure({
// 	// scopes: ['https://www.googleapis.com/auth/drive.readonly'], // if you want access to specific Google API scopes
// 	webClientId: "YOUR_WEB_CLIENT_ID_FROM_GOOGLE_CONSOLE", // client ID of type WEB from Google Console
// });

const Login = ({ navigation }) => {
	const [formData, setFormData] = useState<LoginFormData>({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<LoginFormErrors>({});
	const validateForm = (): boolean => {
		let isValid = true;
		let newErrors: LoginFormErrors = {};
		if (!formData.email) {
			newErrors.email = "Email is required";
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
			isValid = false;
		}
		if (!formData.password) {
			newErrors.password = "Password is required";
			isValid = false;
		}
		setErrors(newErrors);
		return isValid;
	};
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
	const handleChange = (name: keyof LoginFormData, value: string) => {
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const handleMessageSubmit = async () => {
		if (validateForm()) {
			try {
				// TODO: CHECK with USER DB
				const chatMsg = await AsyncStorage.setItem(
					"firstMessage",
					"Let's get started"
				);
				navigation.navigate("ChatUI");
			} catch (error) {
				console.error("Error:", error);
			}
		}
	};
	return (
		<MotiView
			transition={{ type: "timing", duration: 300 }}
			from={{ translateX: -390 }}
			animate={{ translateX: 0 }}
		>
			<KeyboardAvoidingView keyboardVerticalOffset={100} style={styles.login}>
				<Image
					source={require("../assets/LogoWhiteCorner.png")} // Update the path to where your logo is located
					style={styles.logo}
				/>
				<TextInput
					placeholder="Email"
					placeholderTextColor="gray"
					style={styles.input}
					onChangeText={(text) => handleChange("email", text)}
				/>
				{errors.email && <Text style={styles.error}>{errors.email}</Text>}
				<TextInput
					placeholder="Password"
					placeholderTextColor="gray"
					secureTextEntry
					style={styles.input}
					onChangeText={(text) => handleChange("password", text)}
				/>
				{errors.password && <Text style={styles.error}>{errors.password}</Text>}

				<TouchableOpacity onPress={handleMessageSubmit}>
					<View style={styles.loginButton}>
						<Text style={{ color: COLORS.TEXT, fontWeight: "bold" }}>
							Login
						</Text>
					</View>
				</TouchableOpacity>
				{/* Implement your login logic */}
				{/* <GoogleSigninButton
				style={styles.googleButton}
				size={GoogleSigninButton.Size.Wide}
				color={GoogleSigninButton.Color.Dark}
				onPress={signIn}
			/> */}
			</KeyboardAvoidingView>
		</MotiView>
	);
};

const Signup = ({ navigation }) => {
	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<FormErrors>({});

	//TODO:
	const registerManualUser = async (email, password) => {
		try {
			// await auth().createUserWithEmailAndPassword(email, password);
			console.log("User account created & signed in!");
		} catch (error) {
			console.error(error);
		}
	};
	const validateForm = (): boolean => {
		let isValid = true;
		let newErrors: FormErrors = {};

		// Basic validation
		if (!formData.firstName) {
			newErrors.firstName = "First Name is required";
			isValid = false;
		}

		if (!formData.lastName) {
			newErrors.lastName = "Last Name is required";
			isValid = false;
		}

		if (!formData.email) {
			newErrors.email = "Email is required";
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
			isValid = false;
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleChange = (name: keyof FormData, value: string) => {
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
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
		if (validateForm()) {
			try {
				// TODO: CHECK with USER DB
				await AsyncStorage.setItem("firstMessage", "Let's get started");
				navigation.navigate("ChatUI");
			} catch (error) {
				console.error("Error:", error);
			}
		}
	};
	return (
		<MotiView
			transition={{ type: "timing", duration: 300 }}
			from={{ translateX: 390 }}
			animate={{ translateX: 0 }}
		>
			<KeyboardAvoidingView keyboardVerticalOffset={100} style={styles.login}>
				<Image
					source={require("../assets/LogoWhiteCorner.png")} // Update the path to where your logo is located
					style={styles.logoSmall}
				/>
				<TextInput
					placeholder="First Name"
					placeholderTextColor="gray"
					style={styles.input}
					onChangeText={(text) => handleChange("firstName", text)}
				/>
				{errors.firstName && (
					<Text style={styles.error}>{errors.firstName}</Text>
				)}
				<TextInput
					placeholder="Last Name"
					placeholderTextColor="gray"
					style={styles.input}
					onChangeText={(text) => handleChange("lastName", text)}
				/>
				{errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
				<TextInput
					placeholder="Email"
					placeholderTextColor="gray"
					style={styles.input}
					onChangeText={(text) => handleChange("email", text)}
				/>
				{errors.email && <Text style={styles.error}>{errors.email}</Text>}
				<TextInput
					placeholder="Password"
					placeholderTextColor="gray"
					secureTextEntry
					style={styles.input}
					onChangeText={(text) => handleChange("password", text)}
				/>
				{errors.password && <Text style={styles.error}>{errors.password}</Text>}

				<TouchableOpacity onPress={handleMessageSubmit}>
					<View style={styles.signUpButton}>
						<Text style={{ color: COLORS.BLACK, fontWeight: "bold" }}>
							Sign up
						</Text>
					</View>
				</TouchableOpacity>
				{/* Implement your login logic */}
				{/* <GoogleSigninButton
				style={styles.googleButton}
				size={GoogleSigninButton.Size.Wide}
				color={GoogleSigninButton.Color.Dark}
				onPress={signIn}
			/> */}
			</KeyboardAvoidingView>
		</MotiView>
	);
};

export default function LoginScreen({ navigation }) {
	const [activeSide, setActiveSide] = useState("left");

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={{ alignItems: "center" }}>
				<View style={styles.switch}>
					<MotiView
						style={[
							styles.slider,
							activeSide === "right" ? styles.sliderRight : {},
						]}
						transition={{ type: "timing", duration: 300 }}
						animate={{ translateX: activeSide === "right" ? 125 : 0 }} // Adjust the value based on your switch size
					/>
					<TouchableOpacity
						style={styles.button}
						onPress={() => setActiveSide("left")}
					>
						<Text
							style={[
								styles.buttonText,
								{
									color: activeSide === "right" ? COLORS.BLACK : COLORS.TEXT,
									fontWeight: activeSide === "right" ? "bold" : "normal",
								},
							]}
						>
							Login
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, styles.buttonRight]}
						onPress={() => setActiveSide("right")}
					>
						<Text
							style={[
								styles.buttonText,
								{
									color: activeSide === "left" ? COLORS.BLACK : COLORS.TEXT,
									fontWeight: activeSide === "left" ? "bold" : "normal",
								},
							]}
						>
							Sign up
						</Text>
					</TouchableOpacity>
				</View>
				{activeSide === "left" ? (
					<Login navigation={navigation}></Login>
				) : (
					<Signup navigation={navigation}></Signup>
				)}
			</ScrollView>
			{/* Test */}
			<TouchableHighlight
				onPress={() => {
					navigation.navigate("ChatUI");
				}}
			>
				<View style={styles.loginButton}></View>
			</TouchableHighlight>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 0,
		backgroundColor: COLORS.BACKGROUND,
	},
	switch: {
		marginTop: 150,
		flexDirection: "row",
		width: 250,
		height: 50,
		backgroundColor: COLORS.FEINT_LINES, //white?
		borderRadius: 45,
		overflow: "hidden",
	},
	logo: {
		width: 120,
		height: 120,
		marginBottom: 20,
	},
	logoSmall: {
		width: 50,
		height: 50,
		marginBottom: 30,
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
		color: COLORS.TEXT,
	},
	login: {
		flex: 1,
		width: "100%",
		// justifyContent: "center",
		alignItems: "center",
		paddingVertical: 60,
	},
	input: {
		width: 300,
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
	signUpButton: {
		backgroundColor: COLORS.FEINT_LINES,
		padding: 20,
		width: 150,
		marginTop: 30,

		alignItems: "center",
		justifyContent: "center",
		borderRadius: 45,
	},
	slider: {
		position: "absolute",
		width: "50%", // Half of the container width
		height: "100%",
		backgroundColor: COLORS.SURFACE3, // Slider color
		borderRadius: 45,
	},
	sliderRight: {
		backgroundColor: COLORS.SURFACE_30, // Different color for right side
	},
	button: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonRight: {
		backgroundColor: "transparent", // Adjust if you want a distinct color without slider overlap
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
	error: {
		color: "red",
	},
});
