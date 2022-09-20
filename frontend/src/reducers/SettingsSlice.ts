import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguagesEnum } from "../utils/constants/enum";
import { LNG_KEY } from "../utils/constants/settings";


const initialState: ISettingsState = {
	lng: LanguagesEnum.EN,
};

export const settingsSlice = createSlice({
	name: "settings",
	initialState: initialState,
	reducers: {
		changeLng: (state, action: PayloadAction<string>) => {
			state.lng = action.payload;
			localStorage.setItem(LNG_KEY, JSON.stringify(state.lng));
		},
		getLng: (state) => {
			const lng = localStorage.getItem(LNG_KEY);
			if (lng) {
				state.lng = JSON.parse(lng);
			}
		}
	},
});

export default settingsSlice.reducer;

export const { changeLng, getLng } = settingsSlice.actions;