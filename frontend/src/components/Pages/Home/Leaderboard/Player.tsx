import Stat from "../../../Stat/Stat";


const Friend :React.FC < {user : IUser} > = ({ user }) => {
	return (
		<article className="container w-full flex justify-between items-center text-white">
			<div className="container w-5/12 m-2 flex justify-start items-center gap-4">
				<img
					src={user.imgUrl}
					alt={user.username + ": avatar"}
					className="block rounded-full max-w-[49px] max-h-[49px] h-full w-full"
				/>
				<div className="container h-full flex flex-col justify-center gap-1">
					<h4 className="text-sm">{user.fullName}</h4>
					<h5 className="text-xs">{user.username}</h5>
				</div>
			</div>
			<div className="container w-4/12 h-full flex flex-col justify-between items-center gap-2">
				<Stat stat="wins" qty={user.wins === undefined ? 0 : user.wins} />
				<Stat stat="losses" qty={user.loses === undefined ? 0 : user.loses} />
			</div>
		</article>
	);
};

export default Friend;