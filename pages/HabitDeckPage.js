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

	this._sliderRef = useRef();

	// const { grandparent, parent, child } = getBranch(tree, currentHabit);

	useEffect(() => {
		console.log("habits in");
		console.log(habits);
		console.log(tree);
		habits.forEach((c) => console.log(c));
	}, []);

	const submitStarredHabits = () => {
		navigation.navigate("ChatUI", {
			habits: habits,
		});
	};

	const _renderItem = (habit) => {
		if (!habit)
			return <View style={{ width: 390, backgroundColor: "yellow" }}></View>;
		return <CardView habit={habit} tree={tree}></CardView>;
	};

	return (
		<View style={styles.container}>
			<Carousel
				ref={(c) => (_sliderRef = c)}
				data={habits}
				renderItem={_renderItem}
				sliderWidth={windowWidth}
				itemWidth={itemWidth}
				hasParallaxImages={true}
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
			<TouchableOpacity onPress={() => submitStarredHabits}>
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
	text: {
		color: "white",
		marginBottom: 80,
	},
	slider: {
		marginTop: 15,
		overflow: "visiblem", // for custom animations
	},
	sliderContentContainer: {
		paddingVertical: 10, // for custom animation
	},
	paginationContainer: {
		paddingTop: 8,
		paddingBottom: 20,
		marginVertical: 20,
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
