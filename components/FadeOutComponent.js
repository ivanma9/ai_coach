import React, { useEffect, useRef, useState } from "react";
import { Animated, View, Button } from "react-native";

const FadeOutComponent = ({ component: Component, containerWidth }) => {
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const [componentSelected, setComponentSelected] = useState(false);
	const fadeIn = () => {
		Animated.timing(fadeAnim, {
			toValue: 1, //visible
			duration: 500,
			useNativeDriver: true,
		}).start();
	};

	useEffect(() => {
		fadeIn();
	}, []);

	useEffect(() => {
		fadeOut();
	}, [componentSelected]);

	const fadeOut = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 1000,
			useNativeDriver: true,
		}).start();
	};

	return (
		<View style={styles.container}>
			<Animated.View
				style={{
					opacity: fadeAnim,
					flex: 1,
					backgroundColor: "lightyellow",
				}}
			>
				<Component />
			</Animated.View>
			<View style={styles.buttonContainer}>
				<Button title="Fade Out" onPress={fadeOut} />
			</View>
		</View>
	);
};

// You can define your styles here
const styles = {
	// In your FadeOutExample styles
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "lightblue", // Temporary debugging color
		// ... other styles
	},
	buttonContainer: {
		alignItems: "center",
		justifyContent: "center",
		bottom: 30,
		borderRadius: 80,
		width: 150,
		height: 50,

		backgroundColor: "lightgreen", // Temporary debugging color
		// ... other styles
	},
};

export default FadeOutComponent;
