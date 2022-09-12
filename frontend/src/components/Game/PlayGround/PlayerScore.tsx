import { IGamePlayer } from "../../../utils/types/Game";

const PlayerScore: React.FC<{
	player: IGamePlayer;
	isReverse?: boolean;
}> = ({ player, isReverse }) => {
	return (
		<div
			className={`flex text-xl items-center gap-x-4 ${
				isReverse ? "flex-row-reverse" : "text-right"
			}`}
		>
			<div className="w-[200px]">
				<div>{player.fullName}</div>
				<div className="text-beige">{player.username}</div>
			</div>
			<img
				className="w-[49px] h-[49px] rounded-full"
				src={player.imageUrl}
				alt=""
			/>
			<span className="text-5xl font-bold">{player.score}</span>
		</div>
	);
};

export default PlayerScore;
