import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IMatchState = {
	isMatching: false,
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
		}
	},
});

export default matchSlice.reducer;

export const { setMatching, setStartedMatch } = matchSlice.actions;