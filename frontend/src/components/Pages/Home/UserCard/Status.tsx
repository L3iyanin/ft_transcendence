import { useTranslation } from "react-i18next";
import { ReactComponent as FriendsIcon } from "../../../../assets/icons/Friends.svg";

const Status : React.FC < {isOnline : boolean, nbFriends : number} > = ({isOnline, nbFriends}) => {
	const { t } = useTranslation();

	return (
		<div className="flex justify-between items-center gap-7 text-base font-medium">
			<div className="flex justify-between items-center gap-2">
				<div className={`block w-3 h-3 rounded-full ${isOnline ? "bg-green" : "bg-red"}`}></div>
				<p className="text-base font-medium">{isOnline ? t("homePage.online") : t("homePage.offline")}</p>
			</div>
			<div className="flex justify-between items-center gap-2">
				<FriendsIcon />
				<p>{`${nbFriends} ${t("homePage.friends")}`}</p>
			</div>
		</div>
	);
}

export default Status;