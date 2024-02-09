import React, { useEffect, useRef } from "react";
import { Animated, View, TouchableOpacity, Text, Keyboard } from "react-native";
import { TREE_DELAY } from "../helpers/constants";

const FadeOutComponent = ({
	component: Component,
	containerWidth,
	onFadeComplete,
	index,
}) => {
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const isMounted = useRef(true);
	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 100,
			useNativeDriver: true,
		}).start();
		console.log("----------------------FADE MOUNTED---------", index);
		Keyboard.dismiss();
		const timer = setTimeout(fadeOut, TREE_DELAY);
		return () => {
			isMounted.current = false; // Indicate component has been unmounted
			clearTimeout(timer);
			fadeAnim.stopAnimation(); // Stop the animation immediately
		};
	}, []);

	const fadeOut = () => {
		console.log("fading out ....");
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
		}).start(() => {
			if (onFadeComplete && isMounted.current) {
				console.log("fade complete");
				onFadeComplete();
			}
		});
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={fadeOut} activeOpacity={1}>
				<Animated.View
					style={{
						opacity: fadeAnim,
						flex: 1,
						backgroundColor: "rgba(0,0,0,0.8)",
					}}
				>
					<Component />
				</Animated.View>
				<Text
					style={{
						color: "white",
						position: "absolute",
						bottom: 50,
						right: 80,
						fontSize: 30,
					}}
				>
					Tree {index}
				</Text>
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
		// zIndex: 2,
	},
};

export default FadeOutComponent;
