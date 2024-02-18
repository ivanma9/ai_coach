import React, { useContext, useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
} from "react-native";
import HabitsContext from "../components/HabitsContext";

const Item = ({ title, description }) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<TouchableOpacity onPress={() => setExpanded(!expanded)}>
			<Text style={styles.title}>{title}</Text>
			{expanded && <Text style={styles.description}>{description}</Text>}
		</TouchableOpacity>
	);
};

const StarredHabitsPage = ({ navigation, route }) => {
	const { habits } = route.params;
	const { toggleStarredStatus, starredHabits } = useContext(HabitsContext);
	useEffect(() => {
		// starredhabits compare to route.params habits
	});

	const sortHabits = (habits) => {
		habits = habits.filter((habit) => {});
	};

	return (
		<ScrollView>
			{habits.map((item, index) => (
				<Item key={index} title={item.title} description={item.description} />
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
	description: {
		fontSize: 16,
	},
});

export default StarredHabitsPage;
