import PlayerCard from "./PlayerCard";
import WatchersList from "./WatchersList";
import { useTranslation } from "react-i18next";

const WatchersAndPlayers: React.FC<{
	player1: IUser;
	player2: IUser;
	watchers: IUser[];
}> = ({ player1, player2, watchers }) => {

	const { t } = useTranslation();

	return (
		<div className="mt-20 text-white flex justify-between gap-16">
			<PlayerCard player={player1} header={`${t("playerOne")}:`} />
			<WatchersList watchers={watchers} />
			<PlayerCard player={player2} header={`${t("playerTwo")}:`} />
		</div>
	);
};

export default WatchersAndPlayers;
