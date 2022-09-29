import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { ReactComponent as Live } from "../../assets/icons/Live.svg"

const SeeLive:React.FC<{
	matchId: number,
	userId: number,
}> = ({ matchId, userId }) => {

	const { t } = useTranslation();

	const clientSocket: Socket = useSelector((state: any) => state.chat.clientSocket);

	const seeLiveMatchHandler = () => {
		clientSocket.emit("watchLiveMatch", {
			matchId: matchId,
			userId: userId
		});
	}

	return (
		<div onClick={seeLiveMatchHandler} className="flex justify-end items-center gap-3 cursor-pointer">
			<p className="text-xs font-medium hidden md:block text-yellow">{t("homePage.SeeMatchLive")}</p>
			<Live className="animate-ping" />
		</div>
	);
}

export default SeeLive;