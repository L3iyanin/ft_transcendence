import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";

const initialState: IChatSocket = {
	clientSocket: null,
	onlineUsers: [],
};

export const chatSlice = createSlice({
	name: "chat",
	initialState: initialState,
	reducers: {
		setSocket: (state, action: PayloadAction<string>) => {
			const newClientSocket: Socket = io(import.meta.env.VITE_APP_SOCKET_BASE_URL, {
				auth: {
					access_token: action.payload,
				},
			});
			
			const newState = {
				...state,
				clientSocket: newClientSocket
			};

			return newState;
		},
		getSocket: (state) => {
			return state;
		},
		setOnlineUsers: (state, action: PayloadAction<IOnlineUser[]>) => {
			const newState = {
				...state,
				onlineUsers: action.payload
			};

			return newState;
		}
	},
});

export default chatSlice.reducer;

export const { setSocket, getSocket, setOnlineUsers } = chatSlice.actions;
