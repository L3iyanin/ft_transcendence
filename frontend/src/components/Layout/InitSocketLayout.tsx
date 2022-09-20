import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { setOnlineUsers, setSocket } from "../../reducers/ChatSlice";

const InitSocketLayout: React.FC<{
	children: any;
}> = ({children}) => {

	const dispatch = useDispatch();

	const userData: IUserState = useSelector((state: any) => state.user);

	const clientSocket: Socket = useSelector((state: any) => state.chat.clientSocket);

	useEffect(() => {
		dispatch(setSocket());
	}, []);

	useEffect(() => {
		if (!clientSocket) return;
		
		if (userData) {
			clientSocket.on("connect", () => {
				clientSocket.emit("addOnlineUser", { user: userData.user, socketId: clientSocket.id});
			});
		}

		clientSocket.on("onlineUsers", (users: IOnlineUser[]) => {
			dispatch(setOnlineUsers(users));
		})

	}, [clientSocket, userData.user]);

	return <>{children}</>;
};

export default InitSocketLayout;
