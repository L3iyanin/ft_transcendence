import { IGamePlayer, IGameWatcher } from "../../../utils/types/Game";

const WatchersAndPlayers: React.FC<{
	player1: IGamePlayer;
	player2: IGamePlayer;
	watchers: IGameWatcher[];
}> = ({ player1, player2, watchers }) => {
	return (
		<div className="mt-20 text-white">
			<h2 className="text-2xl font-bold">Players 1:</h2>
			<div>
			</div>
		</div>
	);
};

export default WatchersAndPlayers;
