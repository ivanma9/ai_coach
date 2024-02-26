import React, { useContext, useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text, Keyboard } from "react-native";
import { COLORS } from "../helpers/constants";
import AntIcon from "react-native-vector-icons/AntDesign";
import HabitsContext from "./HabitsContext";

const Card = ({ title, content, size, isHabit = true }) => {
	const { toggleStarredStatus, starredHabits } = useContext(HabitsContext);
	const [selectedStars, setSelectedStars] = useState(0);

	useEffect(() => {
		const stars = starredHabits[title] || 0;
		setSelectedStars(stars);
	}, []);

	const handleStarPress = (index) => {
		const newRating = selectedStars === index + 1 ? 0 : index + 1;

		toggleStarredStatus(title, newRating);
		setSelectedStars(newRating);
	};

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={[styles.contextText, { fontSize: 20 * size }]}>
					{content} content
				</Text>
			</View>
			{isHabit && (
				<View style={styles.buttons}>
					{[...Array(5)].map((_, index) => (
						<TouchableOpacity
							key={index}
							style={styles.starButton}
							onPressIn={() => handleStarPress(index)}
						>
							<AntIcon
								name={selectedStars > index ? "star" : "staro"}
								size={30}
								color={COLORS.STAR}
								style={{ opacity: selectedStars > index ? 1 : 0.7 }}
							/>
						</TouchableOpacity>
					))}
				</View>
			)}
		</View>
	);
};

const styles = {
	container: {
		// flex: 1,
		width: "100%",
		height: "100%",
		borderRadius: 25,
		alignItems: "center",
		// backgroundColor: COLORS.SURFACE,
		// flexDirection: "column",
	},
	content: {
		width: "80%",
		height: "60%",
		marginTop: 40,
		marginBottom: 10,
		padding: 20,
		backgroundColor: COLORS.SURFACE,
		borderRadius: 10,
	},
	contextText: {
		color: COLORS.TEXT,
	},
	buttons: {
		justifyContent: "center",
		flexDirection: "row",
		height: 55,
		borderRadius: 50,

		backgroundColor: COLORS.SURFACE_30,
	},
	starButton: {
		// left: 10,
		// bottom: 70,
		marginHorizontal: 0,
		width: 55,
		height: 55,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.SURFACE_30,
		borderRadius: 50,
	},
};

export default Card;
