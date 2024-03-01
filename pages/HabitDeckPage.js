import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	useWindowDimensions,
	TouchableOpacity,
} from "react-native";
import CardView from "../components/CardView";
import { COLORS } from "../helpers/constants";
import Carousel, { Pagination } from "react-native-snap-carousel";

const HabitDeckPage = ({ navigation, route }) => {
	const { habits, tree } = route.params;

	const windowWidth = useWindowDimensions().width;
	const wp = (percentage) => {
		const value = (percentage * windowWidth) / 100;
		return Math.round(value);
	};

	const slideWidth = wp(75);
	const itemHorizontalMargin = wp(2);

	const itemWidth = slideWidth + itemHorizontalMargin * 2;
	const [activeSlide, setActiveSlide] = useState(1);

	// const [habit, setHabit] = useState(null);
	const [index, setIndex] = useState(0);

	const _sliderRef = useRef(null);

	// const { grandparent, parent, child } = getBranch(tree, currentHabit);

	useEffect(() => {
		console.log("habits in");
		console.log(habits);
		console.log(tree);
		habits.forEach((c) => console.log(c));
	}, []);

	// useFocusEffect(
	// 	React.useCallback(() => {
	// 		// Navigate to the first item or the desired initial item
	// 		_sliderRef.current?.snapToItem(
	// 			0,
	// 			(animated = false),
	// 			(fireCallback = false)
	// 		);
	// 		return () => {};
	// 	}, [])
	// );
	const submitStarredHabits = () => {
		// navigation.navigate("InitialPage");
		navigation.navigate("ResultsPage", {
			habits: habits,
			tree: tree,
		});
	};

	const _renderItem = (habit) => {
		if (!habit)
			return <View style={{ width: 390, backgroundColor: "yellow" }}></View>;
		return <CardView habit={habit} tree={tree}></CardView>;
	};

	return (
		<View style={styles.container}>
			{habits && habits.length > 0 ? (
				<>
					<Carousel
						ref={_sliderRef}
						data={habits}
						renderItem={_renderItem}
						sliderWidth={windowWidth}
						itemWidth={itemWidth}
						hasParallaxImages={false}
						firstItem={1}
						inactiveSlideScale={0.94}
						inactiveSlideOpacity={0.7}
						// inactiveSlideShift={20}
						containerCustomStyle={styles.slider}
						contentContainerCustomStyle={styles.sliderContentContainer}
						loop={true}
						loopClonesPerSide={2}
						// autoplay={true}
						// autoplayDelay={500}
						// autoplayInterval={5000}
						onSnapToItem={(index) => setActiveSlide(index)}
					/>
					<Pagination
						dotsLength={habits.length}
						activeDotIndex={activeSlide}
						containerStyle={styles.paginationContainer}
						dotColor={"rgba(255, 255, 255, 0.92)"}
						dotStyle={styles.paginationDot}
						inactiveDotColor={COLORS.FEINT_TEXT}
						inactiveDotOpacity={0.4}
						inactiveDotScale={0.6}
						carouselRef={this._sliderRef}
						tappableDots={!!this._sliderRef}
					/>
				</>
			) : (
				<View
					style={{
						alignItems: "center",
						justifyContent: "center",
						bottom: 150,
					}}
				>
					<Text style={{ color: COLORS.TEXT, fontSize: 30 }}>
						No habits available
					</Text>
				</View>
			)}
			<TouchableOpacity onPress={submitStarredHabits}>
				<View style={styles.submit}>
					<Text style={styles.submitText}>Finish</Text>
				</View>
			</TouchableOpacity>
			{/* <FlatList
				data={habits}
				keyExtractor={(habit, index) => index.toString()}
				horizontal
				showsHorizontalScrollIndicator={false}
				decelerationRate={0}
				snapToInterval={windowWidth - 90}
				renderItem={this._renderItem}
			/> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.BACKGROUND,
		alignItems: "center",
		justifyContent: "center",
	},
	slider: {
		marginTop: 10,
		// overflow: "visible", // for custom animations
		marginBottom: 10,
		backgroundColor: COLORS.BACKGROUND,
	},
	sliderContentContainer: {
		paddingVertical: 10, // for custom animation
	},
	paginationContainer: {
		paddingTop: 15,
		paddingBottom: 20,
	},
	paginationDot: {
		width: 10,
		height: 10,
		borderRadius: 4,
		marginHorizontal: 8,
	},
	submit: {
		alignItems: "center",
		justifyContent: "center",
		height: 60,
		width: 200,
		borderRadius: 45,
		borderWidth: 1,
		borderColor: COLORS.FEINT_LINES,
		backgroundColor: COLORS.SURFACE3,
		marginBottom: 50,
	},
	submitText: {
		color: COLORS.TEXT,
	},
});

export default HabitDeckPage;
