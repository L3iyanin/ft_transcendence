

const Player : React.FC <{username : string, avatar : string, isLeft : boolean }> = ({ username, avatar, isLeft }) => {
	return (
		<div
			className={`w-40 flex justify-start items-center gap-5 grow ${!isLeft && "flex-row-reverse"}`
			}
		>
			<img
				src={avatar}
				alt={username + ": avatar"}
				className="block h-[49px] w-[49px] rounded-full"
			/>
			<p className="text-xl font-medium text-white">{username}</p>
		</div>
	);
};

export default Player;
