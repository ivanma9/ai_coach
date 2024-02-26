// HabitsContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HabitsContext = createContext();

export const HabitsProvider = ({ children }) => {
	const [starredHabits, setStarredHabits] = useState([]);

	useEffect(() => {
		// Load starred habits from AsyncStorage when the app loads
		const loadStarredHabits = async () => {
			const habitsStarred = await AsyncStorage.getItem("starredHabits");
			if (habitsStarred) {
				setStarredHabits(JSON.parse(habitsStarred));
			}
		};
		loadStarredHabits();
	}, []);

	const toggleStarredStatus = async (habitId, rating) => {
		let updatedStarredHabits = { ...starredHabits };

		if (rating === 0) delete updatedStarredHabits[habitId];
		else updatedStarredHabits[habitId] = rating;

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
