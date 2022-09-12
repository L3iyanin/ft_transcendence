import { useNavigate } from "react-router-dom";
import { IGamePlayer, IGameWatcher } from "../../../utils/types/Game";
import PlayerCard from "./PlayerCard";
import WatchersList from "./WatchersList";

const WatchersAndPlayers: React.FC<{
	player1: IGamePlayer;
	player2: IGamePlayer;
	watchers: IGameWatcher[];
}> = ({ player1, player2, watchers }) => {


	return (
		<div className="mt-20 text-white flex justify-between gap-16">
			<PlayerCard player={player1} header="Player 1:" />
			<WatchersList watchers={watchers} />
			<PlayerCard player={player2} header="Player 2:" />
		</div>
	);
};

export default WatchersAndPlayers;
