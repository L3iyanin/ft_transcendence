import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USER_KEY } from "../utils/constants/settings";

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
			localStorage.setItem(USER_KEY, JSON.stringify(state.user));
		},
		logout: (state) => {
			state.user = null;
			state.isLoggedIn = false;
			localStorage.removeItem(USER_KEY);
		},
		getUser: (state) => {
			const user = localStorage.getItem(USER_KEY);
			if (user) {
				state.user = JSON.parse(user);
				state.isLoggedIn = true;
				state.isLoading = false;
				return ;
				// if (state.user) {
				// 	const remainingTime = calculateRemainingTime(state.user.expiresIn);
				// 	if (remainingTime <= 3600) {
				// 		state.user = null;
				// 		state.isLoggedIn = false;
				// 		localStorage.removeItem(USER_KEY);
				// 		state.isLoading = false;
				// 		return ;
				// 	}
				// 	state.isLoggedIn = true;
				// }
			}
			state.isLoading = false;
		},
		setUserImg: (state, action: PayloadAction<string>) => {
			state.user = {
				id: state.user!.id,
				username: state.user!.username,
				fullName: state.user!.fullName,
				imgUrl: action.payload,
			};
			
			localStorage.setItem(USER_KEY, JSON.stringify(state.user));
		},
		setFirstTime: (state) => {
			state.user!.firstTime = false;
			localStorage.setItem(USER_KEY, JSON.stringify(state.user));
		}
	},
});

export default userSlice.reducer;

export const { login, logout, getUser, setUserImg, setFirstTime } = userSlice.actions;