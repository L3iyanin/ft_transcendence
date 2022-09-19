import { IPlayerProps } from "../../utils/types/Game";

const Player : React.FC <{username : string, avatar : string, className : string }> = ({ username, avatar, className }) => {
	return (
		<div
			className={
				"container px-3 flex justify-start items-center gap-4 text-sm text-white " +
				className
			}
		>
			<img
				src={avatar}
				alt={username + ": avatar"}
				className="block h-[49px] w-[49px] rounded-full"
			/>
			<p>{username}</p>
		</div>
	);
};

export default Player;
