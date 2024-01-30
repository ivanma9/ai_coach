import React, { useEffect, useRef } from "react";
import {
	Animated,
	Keyboard,
	View,
	TouchableOpacity,
	Easing,
} from "react-native";

const FadeOutComponent = ({
	component: Component,
	containerWidth,
	onFadeComplete,
}) => {
	const fadeAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		Keyboard.dismiss();
		const timer = setTimeout(() => {
			fadeOut();
		}, 8000);
	}, []);

	const fadeOut = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
		}).start(() => {
			if (onFadeComplete) {
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
						backgroundColor: "rgba(0,0,0,0.7)",
					}}
				>
					<Component />
				</Animated.View>
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
		zIndex: 2,
	},
};

export default FadeOutComponent;
