import { ReactComponent as WinIcon } from "../../assets/icons/win.svg";
import { ReactComponent as LoseIcon } from "../../assets/icons/lose.svg";
import { ReactComponent as AchivementIcon } from "../../assets/icons/achivement.svg";

const MAX_ACHIVEMENTS = import.meta.env.VITE_APP_MAX_ACHIVEMENTS;

const UserCard: React.FC<{
	children: IGamePlayer;
}> = ({ children: user}) => {
	return (
		<section className="container min-w-[200px] w-1/6 text-white">
			<div className="mt-0 bg-dark-60 rounded-lg flex flex-col items-center p-6 gap-y-1.5">
				<img
					src={user.imageUrl}
					alt=""
					className="w-[51px] h-[51px] rounded-full"
				/>
				<h3 className="text-xl font-bold m-0">{user.fullName}</h3>
				<p className="m-0 text-beige">{user.username}</p>
				<div className="flex gap-4">
					<div className="flex items-center gap-2">
						<WinIcon />
						<span className="text-xs">{user.wins} wins</span>
					</div>
					<div className="flex items-center gap-2">
						<LoseIcon />
						<span className="text-xs">{user.loses} loses</span>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<AchivementIcon />
					<span className="text-xs">
						{user.achievements}/{MAX_ACHIVEMENTS} achivments
					</span>
				</div>
			</div>
		</section>
	);
};

export default UserCard;
