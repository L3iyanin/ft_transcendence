import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";

const initialState: IChatSocket = {
	clientSocket: null,
	onlineUsers: [],
	notifications: 0,
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
		},
		addNotification: (state) => {
			const newState = {
				...state,
				notifications: state.notifications + 1
			};

			return newState;
		},
		resetNotifications: (state) => {
			const newState = {
				...state,
				notifications: 0
			};

			return newState;
		}
	},
});

export default chatSlice.reducer;

export const { setSocket, getSocket, setOnlineUsers, addNotification, resetNotifications } = chatSlice.actions;
