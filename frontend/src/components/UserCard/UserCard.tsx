import { ReactComponent as WinIcon } from "../../assets/icons/win.svg";
import { ReactComponent as LoseIcon } from "../../assets/icons/lose.svg";
import { ReactComponent as AchivementIcon } from "../../assets/icons/achivement.svg";
import { ReactComponent as StartChatIcon } from "../../assets/icons/StartChat.svg";
import { ReactComponent as BlockUserIcon } from "../../assets/icons/BlockUser.svg";

const MAX_ACHIVEMENTS = import.meta.env.VITE_APP_MAX_ACHIVEMENTS;

const UserCard: React.FC<{
	children: IGamePlayer;
}> = ({ children: user }) => {
	return (
		<section className="container min-w-[200px] max-w-[300px] m-0 bg-dark-60 rounded-lg ">
			<div className="m-0 flex flex-col items-center p-6 gap-y-1.5 text-white">
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
