import { View, Text, ActivityIndicator } from "react-native";
import Dabug from "../assets/tree00.svg";
import Abug from "../assets/tree30.svg";
import Big from "../assets/bigTreeauto.svg";
import Small from "../assets/smallTreeAuto.svg";
import { MotiView } from "moti";

import { MESSAGE_TYPES, MESSAGE, COLORS } from "../helpers/constants";

const TextMessage = ({ message }) => (
	<Text
		style={{
			color: message.sender === "user" ? COLORS.USER_TEXT : COLORS.TEXT,
		}}
	>
		{message.text}
	</Text>
);

const LoadingRing = ({ size }) => (
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

// <LoadingRing />

const ImageMessage = ({ bug }) => {
	switch (bug.bug) {
		case "Dabug":
			return (
				<View
					style={{
						backgroundColor: COLORS.TEST,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{/* <LoadingRing size={40} /> */}
					<Dabug
						width={MESSAGE.IMAGE_WIDTH * 0.4 * 2}
						height={MESSAGE.IMAGE_HEIGHT * 0.6 * 2}
						style={{ backgroundColor: COLORS.SURFACE }}
					/>
				</View>
			);
		case "Abug":
			return <Abug width={MESSAGE.IMAGE_WIDTH} height={MESSAGE.IMAGE_HEIGHT} />;
		case "Bigbug":
			return (
				<Big
					width={MESSAGE.IMAGE_WIDTH * 1.5}
					height={MESSAGE.IMAGE_HEIGHT * 1.5}
				/>
			);
		case "SBug":
			return (
				<Small width={MESSAGE.IMAGE_WIDTH} height={MESSAGE.IMAGE_HEIGHT} />
			);

		default:
			return null;
	}
};

const renderMessageComponent = (message) => {
	switch (message.type) {
		case MESSAGE_TYPES.TEXT:
			return <TextMessage message={message} />;
		case MESSAGE_TYPES.IMAGE:
			return <ImageMessage bug={message} />;
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
			alignSelf: item.sender === "user" ? "flex-end" : "flex-start",
			backgroundColor:
				item.sender === "user" ? COLORS.USER_BUBBLE : COLORS.SURFACE,
		}}
	>
		{renderMessageComponent(item)}
	</View>
);
