
const PlayerScore: React.FC<{
	player: IUser;
	score: number;
	isReverse?: boolean;
}> = ({ player, isReverse, score }) => {
	return (
		<div
			className={`flex items-center gap-x-4 ${
				isReverse ? "flex-row-reverse" : "text-right"
			}`}
		>
			<div className="w-[200px] hidden md:block text-xs md:text-base lg:text-xl">
				<div>{player.fullName}</div>
				<div className="text-beige">{player.username}</div>
			</div>
			<img
				className="w-[49px] h-[49px] rounded-full"
				src={player.imgUrl}
				alt=""
			/>
			<span className="text-5xl font-bold">{score}</span>
		</div>
	);
};

export default PlayerScore;
