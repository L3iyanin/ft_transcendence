import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Socket } from "socket.io-client";
import { setOnlineUsers, setSocket } from "../../reducers/ChatSlice";
import { setMatching, setStartedMatch } from "../../reducers/MatchSlice";
import { ErrorAlertWithMessage } from "../UI/Error";

const InitSocketLayout: React.FC<{
	children: any;
}> = ({ children }) => {
	const dispatch = useDispatch();

	const { t } = useTranslation();

	const userData: IUserState = useSelector((state: any) => state.user);

	const clientSocket: Socket = useSelector(
		(state: any) => state.chat.clientSocket
	);

	const navigate = useNavigate();

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
			});		});

		clientSocket.on("connect_error", (err) => {
			console.error(`connect_error due to ${err.message}`);
		});

		clientSocket.on("joinGameResponse", (data: IStartedMatch) => {
			dispatch(setStartedMatch(data));
			navigate(`/game`);
		});

		clientSocket.on("readyToPlayResponse", () => {
			toast.info(t("playersReadyToPlay"), {
				position: toast.POSITION.TOP_CENTER,
			});
		});

		clientSocket.on("alreadyInMatch", () => {
			console.log("=== alreadyInMatch ===");
			ErrorAlertWithMessage(t("gamePage.alreadyInMatch"));
		})

		clientSocket.on("matching", () => {
			console.log("=== matching ===");
			dispatch(setMatching());
			toast.info(t("gamePage.dontCloseWindow"), {
				position: toast.POSITION.TOP_CENTER,
			});
		})

		clientSocket.on("connectUserResponse", (users: IOnlineUser[]) => {
			dispatch(setOnlineUsers(users));
		});
	}, [clientSocket, userData.user]);

	return <>{children}</>;
};

export default InitSocketLayout;
