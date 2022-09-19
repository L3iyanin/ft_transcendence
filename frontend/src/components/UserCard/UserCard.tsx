
import { ReactComponent as AchivementIcon } from "../../assets/icons/achivement.svg";
import { ReactComponent as StartChatIcon } from "../../assets/icons/StartChat.svg";
import { ReactComponent as BlockUserIcon } from "../../assets/icons/BlockUser.svg";
import Stat from "../Stat/Stat";

const MAX_ACHIVEMENTS = import.meta.env.VITE_APP_MAX_ACHIVEMENTS;

const UserCard: React.FC<{
	children: IGamePlayer;
}> = ({ children: user }) => {
	return (
		// <section className="container m-2 min-w-[200px] w-[347px] h-[395px] rounded-lg flex flex-col justify-between bg-dark-60">
		<section className="container m-2 w-[350px] h-[395px] rounded-lg flex flex-col justify-between gap-3 bg-dark-60">
			<div className="container m-0 pt-10 flex flex-col items-center justify-center gap-3 text-white">
				<img
					src={user.imageUrl}
					alt={user.username + ": avatar"}
					className="w-32 rounded-full"
				/>
				<h3 className="text-xl font-bold m-0">{user.fullName}</h3>
				<p className="m-0 text-beige">{user.username}</p>
				<div className="flex gap-4">
					<Stat stat="wins" qty={user.wins} />
					<Stat stat="losses" qty={user.losses} />
				</div>
				<div className="flex items-center gap-2">
					<AchivementIcon />
					<span className="text-xs">
						{user.achievements}/{MAX_ACHIVEMENTS} achivments
					</span>
				</div>
			</div>
			<footer className="container h-10 flex justify-center items-center gap-0">
				<div className="container h-full rounded-bl-lg flex justify-center items-center gap-1 bg-yellow text-xs text-black">
					<StartChatIcon className="h-4" />
					<p>Start Chat</p>
				</div>
				<div className="container h-full rounded-br-lg flex justify-center items-center gap-1 bg-red text-xs text-white">
					<BlockUserIcon className="h-4" />
					<p>Block User</p>
				</div>
			</footer>
		</section>
	);
};

export default UserCard;
