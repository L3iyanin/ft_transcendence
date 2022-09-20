import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const calculateRemainingTime = (expirationTime: string) => {
	const currentTime = new Date().getTime();
	const adjExpirationTime = new Date(expirationTime).getTime();

	const remainingDuration = adjExpirationTime - currentTime;

	return remainingDuration;
};

const initialState: IUserState = {
	user: null,
	isLoggedIn: false,
	isLoading: true,
};

export const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		login: (state, action: PayloadAction<UserInterface>) => {
			state.user = action.payload;
			state.isLoggedIn = true;
			localStorage.setItem("user", JSON.stringify(state.user));
		},
		logout: (state) => {
			state.user = null;
			state.isLoggedIn = false;
			localStorage.removeItem("user");
		},
		getUser: (state) => {
			const user = localStorage.getItem("user");
			if (user) {
				state.user = JSON.parse(user);
				state.isLoggedIn = true;
				return ;
				// if (state.user) {
				// 	const remainingTime = calculateRemainingTime(state.user.expiresIn);
				// 	if (remainingTime <= 3600) {
				// 		state.user = null;
				// 		state.isLoggedIn = false;
				// 		localStorage.removeItem("user");
				// 		state.isLoading = false;
				// 		return ;
				// 	}
				// 	state.isLoggedIn = true;
				// }
			}
			state.isLoading = false;
		},
	},
});

export default userSlice.reducer;

export const { login, logout, getUser } = userSlice.actions;