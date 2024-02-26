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
import { Colors } from "react-native/Libraries/NewAppScreen";
import Expandable from "../components/Expandable";

const Item = ({ title, description, rating, id }) => {
	let titleColor = COLORS.SURFACE;
	let outlinedStarColor = COLORS.STAR;
	if (id === 0) {
		titleColor = COLORS.FIRST;
		// outlinedStarColor = COLORS.SURFACE;
	}
	if (id === 1) {
		titleColor = COLORS.SECOND;
		// outlinedStarColor = COLORS.SURFACE;
	}
	if (id === 2) {
		titleColor = COLORS.THIRD;
		// outlinedStarColor = COLORS.SURFACE;
	}

	return (
		<Expandable width={"100%"} expandedHeight={"60%"}>
			<View
				style={[
					styles.titleContainer,
					{
						backgroundColor: COLORS.SURFACE,
						borderWidth: 1,
						borderColor: titleColor,
					},
				]}
			>
				<View style={styles.rating}>
					{/* Filled Stars */}
					{[...Array(rating)].map((_, index) => (
						<AntIcon
							key={index}
							name={rating !== 0 ? "star" : "staro"}
							size={20}
							color={COLORS.STAR}
							style={{ opacity: rating !== 0 ? 1 : 0.7 }}
						/>
					))}
					{/* Blank stars */}
					{[...Array(5 - rating)].map((_, index) => (
						<AntIcon
							key={index}
							name={"staro"}
							size={20}
							color={outlinedStarColor}
							style={{ opacity: 0.7 }}
						/>
					))}
				</View>
				<Text style={[styles.title, { color: COLORS.TEXT }]}>{title}</Text>
			</View>
			{/* Content */}
			<View style={styles.body}>
				<Text style={styles.description}>{description}</Text>
			</View>
		</Expandable>
	);
};

const StarredHabitsPage = ({ navigation, route }) => {
	const { habits, tree } = route.params;
	const { toggleStarredStatus, starredHabits } = useContext(HabitsContext);
	const allHabitNodes = habits.map((habit) => [
		getHabitTreeNode(tree, habit),
		0,
	]);

	const sortHabits = () => {
		return allHabitNodes
			.map((habitNode) => {
				console.log(habitNode);
				console.log(habitNode[0].data);
				return starredHabits[habitNode[0].data]
					? [habitNode[0], starredHabits[habitNode[0].data]]
					: habitNode;
			})
			.sort((node1, node2) => node2[1] - node1[1]);
	};
	const sortedHabitNodes =
		habits && habits.length > 0 ? sortHabits() : allHabitNodes;

	return (
		<ScrollView style={{ backgroundColor: COLORS.BACKGROUND }}>
			{sortedHabitNodes.length > 0 ? (
				sortedHabitNodes.map((item, index) => (
					<Item
						key={index}
						id={index}
						title={item[0].data}
						description={item[0].data.concat(
							" content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity content TouchableOpacity"
						)}
						rating={item[1]}
					/>
				))
			) : (
				<View
					style={{ alignItems: "center", justifyContent: "center", top: 200 }}
				>
					<Text style={{ color: COLORS.TEXT, fontSize: 30 }}>
						No habits available
					</Text>
				</View>
			)}
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
	rating: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 5,
		marginLeft: 6,
		marginRight: 15,
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
		padding: 10,
		height: 300,
	},
	description: {
		fontSize: 16,
		color: COLORS.TEXT,
		margin: 10,
	},
});

export default StarredHabitsPage;
