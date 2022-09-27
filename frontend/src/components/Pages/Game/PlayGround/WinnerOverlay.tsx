import { useTranslation } from "react-i18next";
import { ReactComponent as WinnerIcon } from "../../../../assets/icons/winner.svg";
import { PLAYER_ONE } from "../../../../utils/constants/Game";

const WinnerOverlay:React.FC<{
	player1: IUser;
	player2: IUser;
	winner: number;
}> = ({ player1, player2, winner,}) => {

	const { t } = useTranslation();

	return (
		<div className="w-1/2 h-full flex gap-2 flex-col items-center justify-center bg-dark-60 rounded-2xl capitalize"
			style={{
				marginLeft: winner === PLAYER_ONE ? "0" : "50%",
			}}
		>
			<WinnerIcon />
			<span className="text-3xl text-red">{t("gamePage.theWinner")}</span>
			<span className="text-2xl text-white">{winner === PLAYER_ONE ? player1.fullName : player2.fullName}</span>
			<span className="text-xl text-beige">{winner === PLAYER_ONE ? player1.username : player2.username}</span>
		</div>
	);
}

export default WinnerOverlay;