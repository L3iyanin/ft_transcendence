import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IMatchState = {
	isMatching: false,
	spectators: [],
	areYouPlaying: false,
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
				match: action.payload,
				areYouPlaying: true,
			}
		},
		setSeeingLiveMatch: (state, action: PayloadAction<IWatchMatchRes>) => {
			return  {
				...state,
				isMatching: false,
				whenMatching: undefined,
				match: action.payload.matchSettings,
				areYouPlaying: true,
				// spectators: action.payload.spectators
			}
		},
		setYouAreNotPlaying: (state) => {
			return  {
				...state,
				areYouPlaying: false,
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

export const { setMatching, setStartedMatch, setSeeingLiveMatch, setSpectatorsInLiveMatch, setYouAreNotPlaying } = matchSlice.actions;