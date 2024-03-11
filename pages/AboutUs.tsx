import { View, Text } from "react-native";
import { COLORS } from "../helpers/constants";

export const AboutUs = () => {
	return (
		<View
			style={{
				backgroundColor: COLORS.BACKGROUND,
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Text style={{ color: COLORS.TEXT }}>About Us</Text>
		</View>
	);
};
