import React, { useContext, useEffect, useState } from "react";
import {
	View,
	Text,
	Pressable,
	StyleSheet,
	ScrollView,
	LayoutChangeEvent,
} from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
import HabitsContext from "../components/HabitsContext";
import { COLORS } from "../helpers/constants";
import { getHabitTreeNode } from "../helpers/getHabitTreeNode";
import AntIcon from "react-native-vector-icons/AntDesign";

const ExpandableContainer = ({ children, expanded }) => {
	const [height, setHeight] = useState(0);
	const animatedStyle = useAnimatedStyle(() => {
		const animatedHeight = expanded ? withTiming(height) : withTiming(0);
		return {
			height: animatedHeight,
		};
	});

	const onLayout = (event: LayoutChangeEvent) => {
		console.log(height);
		const layoutHeight = event.nativeEvent.layout.height;
		console.log(layoutHeight);
		if (layoutHeight > 0 && layoutHeight !== height) {
			setHeight(layoutHeight);
		}
	};
	return (
		<Animated.View
			style={[
				animatedStyle,
				{
					overflow: "hidden",
					alignItems: "center",
				},
			]}
		>
			<View onLayout={onLayout} style={styles.body}>
				{children}
			</View>
		</Animated.View>
	);
};

const Item = ({ title, description, starred }) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<Pressable onPress={() => setExpanded(!expanded)}>
			<View style={styles.titleContainer}>
				<View style={styles.star}>
					<AntIcon
						name={starred ? "star" : "staro"}
						size={20}
						color={COLORS.STAR}
						style={{ opacity: starred ? 1 : 0.7 }}
					/>
				</View>
				<Text style={styles.title}>{title}</Text>
			</View>
			{expanded && (
				<ExpandableContainer expanded={expanded}>
					<Text style={styles.description}>{description}</Text>
				</ExpandableContainer>
			)}
		</Pressable>
	);
};

const StarredHabitsPage = ({ navigation, route }) => {
	const { habits, tree } = route.params;
	const { toggleStarredStatus, starredHabits } = useContext(HabitsContext);
	const allHabitNodes = habits.map((habit) => [
		getHabitTreeNode(tree, habit),
		false,
	]);
	const starredHabitNodes = starredHabits.map((habit) => [
		getHabitTreeNode(tree, habit),
		true,
	]);

	useEffect(() => {
		// starredhabits compare to route.params habits
	});

	const sortHabits = () => {
		console.log(starredHabits);
		console.log(starredHabitNodes);
		const unStarredHabitNodes = allHabitNodes.filter(
			(habit) => !starredHabits.includes(habit[0].data)
		);

		console.log("UNSTAR");
		console.log(unStarredHabitNodes);
		unStarredHabitNodes.forEach((e) => console.log(e[0].data));
		return [...starredHabitNodes, ...unStarredHabitNodes];
	};
	const sortedHabitNodes = sortHabits();

	return (
		<ScrollView style={{ backgroundColor: COLORS.BACKGROUND }}>
			{sortedHabitNodes.map((item, index) => (
				<Item
					key={index}
					title={item[0].data}
					description={item[0].data.concat(
						" content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity"
					)}
					starred={item[1]}
				/>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	titleContainer: {
		padding: 10,
		marginTop: 5,
		marginHorizontal: 20,
		// borderRadius: 5,
		backgroundColor: COLORS.SURFACE2,
		flexDirection: "row",
		alignItems: "center",
	},
	star: {
		alignItems: "center",
		marginVertical: 5,
		marginHorizontal: 20,
		justifyContent: "center",
	},
	title: {
		flex: 1,
		fontSize: 18,
		fontWeight: "bold",
		color: COLORS.TEXT,
	},
	body: {
		backgroundColor: COLORS.SURFACE2,
		marginHorizontal: 20,
		// padding: 10,
		position: "absolute",
	},
	description: {
		fontSize: 16,
		color: COLORS.TEXT,
		margin: 10,
	},
});

export default StarredHabitsPage;
