import { ReactComponent as AchivementIcon } from "../../../../assets/icons/achivement.svg";
import { ReactComponent as StartChatIcon } from "../../../../assets/icons/StartChat.svg";
import { ReactComponent as BlockUserIcon } from "../../../../assets/icons/BlockUser.svg";
import Stat from "../../../Stat/Stat";
import { useEffect, useState } from "react";
import { getMyProfile } from "../../../../services/profile/profile";
import LoadingSpinner from "../../../UI/Loading/LoadingSpinner";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { isResNotOk } from "../../../../utils/helper/httpHelper";
import ErrorAlert from "../../../UI/Error";

const MAX_ACHIVEMENTS = import.meta.env.VITE_APP_MAX_ACHIVEMENTS;

const UserCard: React.FC <{user?: IGamePlayer}> = () => {

	const { t } = useTranslation();

	const [user, setUser] = useState<IUser | null> (null);

	useEffect(() => {
		getMyProfile()
			.then((res) => {
				console.log(res);
				if (isResNotOk(res)) {
					ErrorAlert(res);
					return ;
				}
				const userData = res;
				setUser(_ => ({
					id: userData.id,
					username: userData.username,
					fullName: userData.fullName,
					imgUrl: userData.imgUrl,
					numberOfAchievements: userData.numberOfAchievements,
					numberOfFriends: userData.numberOfFriends,
					wins: userData.wins,
					loses: userData.loses,
				}))
			}
		)
	}, []);

	if (!user) {
		return (
			<section className="relative container m-2 min-w-[250px] w-[350px] h-[395px] rounded-lg flex flex-col justify-between gap-3 bg-dark-60">
				<LoadingSpinner />
			</section>
		);
	}

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
					<Stat stat={t("online")} qty={user.wins!} />
					<Stat stat={t("friends")} qty={user.loses!} />
				</div>
				<div className="flex gap-4">
					<Stat stat={t("wins")} qty={user.wins!} />
					<Stat stat={t("loses")} qty={user.loses!} />
				</div>
				<div className="flex items-center gap-2">
					<AchivementIcon />
					<span className="text-xs">
						{user.numberOfAchievements}/{MAX_ACHIVEMENTS} achievments
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
