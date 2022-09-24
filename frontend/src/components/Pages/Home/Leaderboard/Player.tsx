import { useTranslation } from "react-i18next";
import Stat from "../../../Stat/Stat";


const Friend :React.FC < {user : IUser} > = ({ user }) => {
	const { t } = useTranslation();

	return (
		<article className="flex justify-between items-center grow text-white">
			<div className=" flex justify-start items-center gap-3 grow">
				<img
					src={user.imgUrl}
					alt={user.username + ": avatar"}
					className="block rounded-full w-[49px] h-[49px]"
				/>
				<div className="flex flex-col justify-center gap-1">
					<h4 className="text-xl font-medium">{user.fullName}</h4>
					<h5 className="text-base font-medium text-beige">{user.username}</h5>
				</div>
			</div>
			<div className="flex flex-col justify-between items-start gap-4">
				<Stat stat="wins" qty={user.wins!} />
				<Stat stat="losses" qty={user.loses!} />
			</div>
		</article>
	);
};

export default Friend;