import { View, Text, StyleSheet } from "react-native";
import { AnimatePresence, MotiView, useAnimationState } from "moti";
import { SvgXml } from "react-native-svg";

import { MESSAGE_TYPES, MESSAGE, COLORS } from "../helpers/constants";
import { useState } from "react";

const TextMessage = ({ message }) => (
	<Text
		style={{
			color: message.sender === "user" ? COLORS.USER_TEXT : COLORS.TEXT,
		}}
	>
		{message.text}
	</Text>
);
const LoadingRing = ({ width, height }) => {
	return (
		<View style={styles.container}>
			<MotiView
				from={{ rotate: "0deg" }}
				animate={{ rotate: "360deg" }}
				transition={{
					type: "timing",
					duration: 1400,
					loop: true,
					repeatReverse: false,
				}}
				style={[
					{
						width: width,
						height: height,
						borderRadius: width / 2,
						borderWidth: width / 8,
					},
					styles.ring,
				]}
			/>
		</View>
	);
};

const LoadingDialateRing = ({ size }) => (
	<MotiView
		from={{
			width: size,
			height: size,
			borderRadius: size / 2,
		}}
		animate={{
			width: size + 20,
			height: size + 20,
			borderRadius: (size + 20) / 2,
		}}
		transition={{
			type: "timing",
			duration: 1000,
			loop: true,
			repeat: Infinity,
		}}
		style={{
			width: size,
			height: size,
			borderRadius: size / 2,
			borderWidth: size / 10,
			borderColor: "#FFF",
			shadowColor: "#FFF",
			shadowOffset: { width: 0, height: 0 },
			shadowOpacity: 1,
			shadowRadius: 10,
			position: "absolute",
			zIndex: 2,
		}}
	/>
);

const useFadeIn = () => {
	return useAnimationState({
		from: {
			opacity: 0,
		},
		to: {
			opacity: 1,
		},
	});
};

const useFadeOut = () => {
	return useAnimationState({
		from: {
			opacity: 1,
		},
		to: {
			opacity: 0,
		},
	});
};

// const FadeInComponent = () => {
// 	const fadeInState = useFadeIn();

// 	return <MotiView state={fadeInState} />;
// };

const ImageMessage = ({ svgurl }) => {
	const [loading, setLoading] = useState(true);
	const fadeInState = useFadeIn();

	sampleLoadtime = setTimeout(() => {
		setLoading(false);
	}, 1000);
	return (
		<AnimatePresence
			exitBeforeEnter
			style={{
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<MotiView
				key="newtree"
				state={fadeInState}
				transition={{
					type: "timing",
					duration: 2000,
				}}
				exit={{
					opacity: 0,
				}}
			>
				<SvgXml
					xml={svgurl}
					width={MESSAGE.IMAGE_WIDTH * 0.4 * 2}
					height={MESSAGE.IMAGE_HEIGHT * 0.6 * 2}
				/>
			</MotiView>
		</AnimatePresence>
	);
};

const renderMessageComponent = (message) => {
	switch (message.type) {
		case MESSAGE_TYPES.TEXT:
			return <TextMessage message={message} />;
		case MESSAGE_TYPES.IMAGE:
			return <ImageMessage svgurl={message.svgurl} />;
		case MESSAGE_TYPES.LOAD:
			console.log("Loading ....");
			return <LoadingRing width={35} height={35} />;
		default:
			return null; // Fallback for unknown message types
	}
};

export const renderMessage = ({ item }) => (
	<View
		style={{
			flex: 1,
			padding: 10,
			borderRadius: 30,
			borderWidth: 2,
			borderColor: COLORS.FEINT_LINES,
			marginBottom: 10,
			alignSelf:
				item.sender === MESSAGE.SENDER.USER ? "flex-end" : "flex-start",
			backgroundColor:
				item.sender === MESSAGE.SENDER.USER
					? COLORS.USER_BUBBLE
					: COLORS.SURFACE,
		}}
	>
		{renderMessageComponent(item)}
	</View>
);

const styles = StyleSheet.create({
	container: {
		// position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		// zIndex: 2,
	},
	ring: {
		borderColor: "#ffffff",
		borderRightColor: "transparent",
		justifyContent: "center",
		alignItems: "center",
	},
});
