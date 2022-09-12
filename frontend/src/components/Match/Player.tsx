import { ReactComponentElement } from "react";

const Player = ({username, avatar, side} : {username : string; avatar : string; side : string}) => {
	const direction = side === "left" ? "flex-row" : "flex-row-reverse";
	return (
		<div className={"container h-8 px-3 flex justify-start items-center gap-2 " + direction}>
			<img src={avatar} alt={username + ": avatar"} className="block h-6 rounded-full rever"/>
			<p className="text-sm text-white">{username}</p>

		</div>
	);
}

export default Player;