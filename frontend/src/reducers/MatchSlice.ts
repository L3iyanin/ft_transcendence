import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IMatchState = {
	isMatching: false,
	spectators: [],
};

export const matchSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		setMatching: (state) => {
			return  {
				...state,
				isMatching: true,
				whenMatching: new Date().toISOString()
			}
		},
		setStartedMatch: (state, action: PayloadAction<IStartedMatch>) => {
			return  {
				...state,
				isMatching: false,
				whenMatching: undefined,
				match: action.payload
			}
		},
		setSeeingLiveMatch: (state, action: PayloadAction<IWatchMatchRes>) => {
			return  {
				...state,
				isMatching: false,
				whenMatching: undefined,
				match: action.payload.matchSettings,
				// spectators: action.payload.spectators
			}
		},
		setSpectatorsInLiveMatch: (state, action: PayloadAction<IUser[]>) => {
			return  {
				...state,
				spectators: action.payload
			}
		}
	},
});

export default matchSlice.reducer;

export const { setMatching, setStartedMatch, setSeeingLiveMatch, setSpectatorsInLiveMatch } = matchSlice.actions;