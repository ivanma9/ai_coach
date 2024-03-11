import { create } from "zustand";

interface PlanItem {
	planTitle: string;
	plan: any; // Consider specifying a more detailed type instead of 'any' if possible.
}

interface StoreState {
	list: PlanItem[];
}

interface StoreActions {
	addToList: (item: PlanItem, callback?: (error?: Error) => void) => void;
}

type Store = StoreState & StoreActions;

export const useStore = create<Store>((set) => ({
	list: [],
	addToList: (item, callback) => {
		try {
			// Simulate adding the item to the list
			set((state) => ({ list: [...state.list, item] }));

			if (callback) callback();
		} catch (error) {
			if (callback) callback(error as Error);
		}
	},
}));
