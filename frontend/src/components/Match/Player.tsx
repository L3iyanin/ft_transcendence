

const Player : React.FC <{username : string, avatar : string, isLeft : boolean }> = ({ username, avatar, isLeft }) => {
	return (
		<div
			className={`xl:w-40 flex justify-start items-center gap-5 grow ${!isLeft && "flex-row-reverse"}`
			}
		>
			<img
				src={avatar}
				alt={username + ": avatar"}
				className="xl:block xl:h-[49px] xl:w-[49px] h-[24px] w-[24px] rounded-full hidden"
			/>
			<p className="xl:text-xl text-xs font-medium text-white">{username}</p>
		</div>
	);
};

export default Player;
