import { ReactComponent as WinIcon } from "../../../../assets/icons/win.svg";
import { ReactComponent as LoseIcon } from "../../../../assets/icons/lose.svg";
import { ReactComponent as AchivementIcon } from "../../../../assets/icons/achivement.svg";

const MAX_ACHIVEMENTS = import.meta.env.VITE_APP_MAX_ACHIVEMENTS;

const PlayerCard: React.FC<{
	player: IUser;
	header: string;
}> = ({ player, header }) => {
	return (
		<div className="min-w-[200px]">
			<h2 className="text-2xl font-bold text-center">{header}</h2>
			<div className="mt-5 bg-dark-60 rounded-lg flex flex-col items-center p-6 gap-y-1.5">
				<img
					src={player.imgUrl}
					alt=""
					className="w-[51px] h-[51px] rounded-full"
				/>
				<h3 className="text-xl font-bold m-0">{player.fullName}</h3>
				<p className="text-beige m-0">{player.username}</p>
				<div className="flex gap-4">
					<div className="flex items-center gap-2">
						<WinIcon />
						<span className="text-xs">{player.wins} wins</span>
					</div>
					<div className="flex items-center gap-2">
						<LoseIcon />
						<span className="text-xs">{player.loses} loses</span>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<AchivementIcon />
					<span className="text-xs">
						{player.achievements}/{MAX_ACHIVEMENTS} achivments
					</span>
				</div>
			</div>
		</div>
	);
};

export default PlayerCard;
