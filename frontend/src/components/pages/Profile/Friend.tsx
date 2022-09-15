import { players } from "../../../utils/data/Players";
import Stat from "../../Stat/Stat";

const Friend = ({ user }: IFriendProps) => {
	return (
		<article className="container w-full h-1/5 flex justify-between items-center text-white">
			<div className="container w-5/12 h-full flex justify-start items-center gap-2">
				<img
					src={user.imageUrl}
					alt={user.username + ": avatar"}
					className="block rounded-full max-w-[49px] max-h-[49px] h-full w-full"
				/>
				<div className="container h-full flex flex-col justify-between gap-1">
					<h4 className="text-sm">{user.fullName}</h4>
					<h5 className="text-xs">{user.username}</h5>
				</div>
			</div>
			<div className="container w-4/12 h-full flex justify-between items-center gap-2">
				<Stat stat="wins" qty={user.wins} />
				<Stat stat="losses" qty={user.losses} />
			</div>
		</article>
	);
};

export default Friend;
