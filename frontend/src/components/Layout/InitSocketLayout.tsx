import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { setOnlineUsers, setSocket } from "../../reducers/ChatSlice";

const InitSocketLayout: React.FC<{
	children: any;
}> = ({ children }) => {
	const dispatch = useDispatch();

	const userData: IUserState = useSelector((state: any) => state.user);

	const clientSocket: Socket = useSelector(
		(state: any) => state.chat.clientSocket
	);

	useEffect(() => {
		dispatch(setSocket());
	}, []);

	useEffect(() => {
		if (!clientSocket || !userData) return;

		clientSocket.on("connect", () => {
			clientSocket.emit("connectUser", {
				username: userData.user?.username,
				fullName: userData.user?.fullName,
				id: userData.user?.id,
			});
		});

		clientSocket.on("connect_error", (err) => {
			console.error(`connect_error due to ${err.message}`);
		});

		clientSocket.on("joinGameResponse", (data: IStartedMatch) => {
			console.log("=== joinGameResponse ===");
			console.log(data);
			console.log("========================");
		});

		clientSocket.on("alreadyInMatch", () => {
			console.log("=== alreadyInMatch ===");
		})

		clientSocket.on("matching", () => {
			console.log("=== matching ===");
		})

		clientSocket.on("connectUserResponse", (users: IOnlineUser[]) => {
			dispatch(setOnlineUsers(users));
		});
	}, [clientSocket, userData.user]);

	return <>{children}</>;
};

export default InitSocketLayout;
