import { IGamePlayer, IGameWatcher } from "../../../utils/types/Game";

const WatchersAndPlayers: React.FC<{
	player1: IGamePlayer;
	player2: IGamePlayer;
	watchers: IGameWatcher[];
}> = ({ player1, player2, watchers }) => {
	return (
		<div className="mt-20 text-white flex">
			<div>
				<h2 className="text-2xl font-bold">Players 1:</h2>
				<div className="bg-dark-60 rounded-lg flex flex-col items-center p-6 gap-y-1.5">
					<img src={player1.imageUrl} alt="" className="w-[51px] h-[51px] rounded-full" />
					<h3 className="text-xl font-bold">{player1.fullName}</h3>
					<p className="text-beige">{player1.username}</p>
					<div>
						<div>
							<span>{player1.wins} wins</span>
						</div>
						<div>
							<span>{player1.loses} loses</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WatchersAndPlayers;
