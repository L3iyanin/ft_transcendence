import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Stat from "../../../Stat/Stat";

const Friend :React.FC < {user : IUser} > = ({ user }) => {

	const { t } = useTranslation();

	const navigate = useNavigate();

	const showUserProfileHandler = () => {
		navigate(`/profile/${user.id}`);
	}

	console.log(user);

	return (
		<article className="cursor-pointer w-full flex justify-between items-center text-white" onClick={showUserProfileHandler}>
			<div className="my-2 flex justify-start items-center gap-4">
				<img
					src={user.imgUrl}
					alt={user.username + ": avatar"}
					className="block rounded-full max-w-[49px] max-h-[49px] h-full w-full"
				/>
				<div className="h-full flex flex-col justify-center gap-1 capitalize">
					<h4 className="text-xl">{user.fullName}</h4>
					<h5 className="text-beige">{user.username}</h5>
				</div>
			</div>
			<div className=" flex justify-between items-center gap-7">
				<Stat stat={t("wins")} qty={user.wins!} />
				<Stat stat={t("loses")} qty={user.loses!} />
			</div>
		</article>
	);
};

export default Friend;
