import { useTranslation } from "react-i18next";
import { ReactComponent as AchivementIcon } from "../../../../assets/icons/achivement.svg";

import Status from "./Status";
import Stat from "../../../Stat/Stat";

const MAX_ACHIVEMENTS = import.meta.env.VITE_APP_MAX_ACHIVEMENTS;

const UserCard: React.FC<{ user: IUser }> = ({ user: user }) => {
	const { t } = useTranslation();

	return (
		<section className="basis-[347px] min-w-[347px] h-[332px] rounded-2xl pt-8 pb-5 flex flex-col justify-center items-center gap-3 bg-dark-60 text-white">
			<img
				src={user.imgUrl}
				alt={user.username + ": avatar"}
				className="w-[101px] h-[101px] rounded-full"
			/>
			<h3 className="text-2xl font-bold">{user.fullName}</h3>
			<p className="text-xl font-medium text-beige">{user.username}</p>
			<Status isOnline={true} nbFriends={user.friends?.length ?? 0} />
			<div className="flex gap-5">
				<Stat stat={t("wins")} qty={user.wins!} />
				<Stat stat={t("losses")} qty={user.loses!} />
			</div>
			<div className="flex items-center gap-2">
				<AchivementIcon />
				<span className="text-base font-medium">
					{user.achievements?.length ?? 0}/{MAX_ACHIVEMENTS} achievments
				</span>
			</div>
		</section>
	);
};

export default UserCard;
