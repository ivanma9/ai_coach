import React, { useContext, useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text, Keyboard } from "react-native";
import { COLORS } from "../helpers/constants";
import AntIcon from "react-native-vector-icons/AntDesign";
import HabitsContext from "./HabitsContext";

const Card = ({ title, content, size }) => {
	const { toggleStarredStatus, starredHabits } = useContext(HabitsContext);
	const [starred, setStarred] = useState(false);

	useEffect(() => {
		setStarred(starredHabits.includes(title));
		return () => {};
	}, []);

	const selectStar = () => {
		toggleStarredStatus(title);
		setStarred(!starred);
	};

	return (
		<View style={styles.container}>
			<Text style={[styles.title, { fontSize: 30 * size }]}>{title}</Text>
			<View style={styles.content}>
				<Text style={[styles.contextText, { fontSize: 20 * size }]}>
					{content} content
				</Text>
			</View>
			<View style={styles.buttons}>
				<TouchableOpacity style={styles.starButton} onPressIn={selectStar}>
					<AntIcon
						name={starred ? "star" : "staro"}
						size={30}
						color={COLORS.STAR}
						style={{ opacity: starred ? 1 : 0.7 }}
					/>
				</TouchableOpacity>
			</View>
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
	title: {
		color: COLORS.TEXT,
		top: 10,
		padding: 5,
	},
	content: {
		width: "80%",
		height: "60%",
		marginTop: 40,
		marginBottom: 40,
		padding: 20,
		backgroundColor: COLORS.SURFACE,
		borderRadius: 10,
	},
	contextText: {
		color: COLORS.TEXT,
	},
	buttons: {
		flex: 1,
		justifyContent: "flex-end",
		alignSelf: "stretch",
		width: "100%",
		// backgroundColor: COLORS.TEST,
	},
	starButton: {
		position: "absolute",
		left: 10,
		bottom: 30,
		width: 55,
		height: 55,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.SURFACE_30,
		borderRadius: 50,
	},
};

export default Card;
