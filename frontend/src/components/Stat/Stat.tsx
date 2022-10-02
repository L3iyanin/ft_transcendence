
import { useTranslation } from "react-i18next";

import { ReactComponent as WinIcon } from "../../assets/icons/win.svg";
import { ReactComponent as LoseIcon } from "../../assets/icons/lose.svg";
import { ReactComponent as FriendsIcon } from "../../assets/icons/friends.svg";


const Stat: React.FC < {stat : string, qty : number, isUserOnline?: boolean, isUserInGame?: boolean} > = (props) => {

	const { t } = useTranslation();

	const isOnline = props.stat === t("online") || props.stat === t("offline") || props.stat === t("inGame");

	let statIcon = <WinIcon />;

	if (props.stat === t("losses"))
		statIcon = <LoseIcon />;
	else if (isOnline) {

		if (props.isUserInGame) {
			statIcon = <span className="w-3 h-3 rounded-full bg-yellow"></span>;
		}
		else if (props.isUserOnline) {
			statIcon = <span className="w-3 h-3 rounded-full bg-green"></span>;
		}
		else {
			statIcon = <span className="w-3 h-3 rounded-full bg-red"></span>;
		}
	}
	else if (props.stat === t("friends"))
		statIcon = <FriendsIcon />;

	return (
		<div className="flex items-center gap-2">
			{ statIcon }
			<span className="">{ !isOnline ? props.qty + " " : ""} { props.stat }</span>

		</div>
	);
}

export default Stat;
