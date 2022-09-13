import { ReactComponentElement } from "react";
import { IPlayerProps } from "../../utils/types/Game";

const Player = ({ username, avatar, className }: IPlayerProps) => {
	return (
		<div
			className={
				"container h-8 px-3 flex justify-start items-center gap-2 text-sm text-white " +
				className
			}
		>
			<img
				src={avatar}
				alt={username + ": avatar"}
				className="block h-2/3 rounded-full"
			/>
			<p>{username}</p>
		</div>
	);
};

export default Player;
