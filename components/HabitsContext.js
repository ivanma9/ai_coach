// HabitsContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HabitsContext = createContext();

export const HabitsProvider = ({ children }) => {
	const [starredHabits, setStarredHabits] = useState([]);

	useEffect(() => {
		// Load starred habits from AsyncStorage when the app loads
		const loadStarredHabits = async () => {
			const habits = await AsyncStorage.getItem("starredHabits");
			if (habits) {
				setStarredHabits(JSON.parse(habits));
			}
		};
		loadStarredHabits();
	}, []);

	const toggleStarredStatus = async (habitId) => {
		let updatedStarredHabits = [];
		if (starredHabits.includes(habitId)) {
			updatedStarredHabits = starredHabits.filter((id) => id !== habitId);
		} else {
			updatedStarredHabits = [...starredHabits, habitId];
		}
		setStarredHabits(updatedStarredHabits);
		await AsyncStorage.setItem(
			"starredHabits",
			JSON.stringify(updatedStarredHabits)
		);
	};

	return (
		<HabitsContext.Provider value={{ starredHabits, toggleStarredStatus }}>
			{children}
		</HabitsContext.Provider>
	);
};

export default HabitsContext;
