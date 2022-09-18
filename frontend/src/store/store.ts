import { configureStore } from "@reduxjs/toolkit";
import userSlicereducer from "../reducers/UserSlice";
import settingsSlicereducer from "../reducers/SettingsSlice";

const store = configureStore({
	reducer: {
		user: userSlicereducer,
		settings: settingsSlicereducer,
	}
});

export default store;