import { configureStore } from "@reduxjs/toolkit";
import userSlicereducer from "../reducers/UserSlice";
import settingsSlicereducer from "../reducers/SettingsSlice";
import chatSlicereducer from "../reducers/ChatSlice";

const store = configureStore({
	reducer: {
		user: userSlicereducer,
		settings: settingsSlicereducer,
		chat: chatSlicereducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				ignoredActions: ["chat/setSocket"],
				// Ignore these field paths in all actions
				// ignoredActionPaths: ["chat.clientSocket"],
				// Ignore these paths in the state
				ignoredPaths: ["chat.clientSocket"],
			},
		}),
});

export default store;
