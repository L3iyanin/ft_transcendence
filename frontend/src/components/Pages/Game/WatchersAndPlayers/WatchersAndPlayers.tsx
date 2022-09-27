import PlayerCard from "./PlayerCard";
import WatchersList from "./WatchersList";
import { useTranslation } from "react-i18next";

const WatchersAndPlayers: React.FC<{
	matchSettings?: IStartedMatch;
	watchers: IUser[];
}> = ({ matchSettings, watchers }) => {

	const { t } = useTranslation();

	if (!matchSettings)
		return null;

	return (
		<div className="mt-20 text-white flex justify-between gap-16">
			<PlayerCard player={matchSettings.player1} header={`${t("playerOne")}:`} />
			<WatchersList watchers={watchers} />
			<PlayerCard player={matchSettings.player2} header={`${t("playerTwo")}:`} />
		</div>
	);
};

export default WatchersAndPlayers;
