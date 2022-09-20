import { ReactComponent as AchivementIcon } from "../../../../assets/icons/achivement.svg";

import Stat from "../../../Stat/Stat";

const MAX_ACHIVEMENTS = import.meta.env.VITE_APP_MAX_ACHIVEMENTS;

const UserCard: React.FC <{user: IUser}> = ({ user: user }) => {
	return (
		<section className="container m-2 min-w-[250px] w-[350px] h-[395px] rounded-lg flex flex-col justify-between gap-3 bg-dark-60">
			<div className="container m-0 pt-10 flex flex-col items-center justify-center gap-3 text-white">
				<img
					src={user.imgUrl}
					alt={user.username + ": avatar"}
					className="w-32 rounded-full"
				/>
				<h3 className="text-xl font-bold m-0">{user.fullName}</h3>
				<p className="m-0 text-beige">{user.username}</p>
				<div className="flex gap-4">
					<Stat stat="wins" qty={user.wins} />
					<Stat stat="losses" qty={user.loses} />
				</div>
				<div className="flex items-center gap-2">
					<AchivementIcon />
					<span className="text-xs">
						{user.achievements}/{MAX_ACHIVEMENTS} achievments
					</span>
				</div>
			</div>
		</section>
	);
};

export default UserCard;
