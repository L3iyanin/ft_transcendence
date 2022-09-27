
import { useTranslation } from "react-i18next";

import { ReactComponent as WinIcon } from "../../assets/icons/win.svg";
import { ReactComponent as LoseIcon } from "../../assets/icons/lose.svg";
import { ReactComponent as FriendsIcon } from "../../assets/icons/friends.svg";


const Stat: React.FC < {stat : string, qty : number} > = (props) => {

	const { t } = useTranslation();


	const isOnline = props.stat === t("online");

	let statIcon = <WinIcon />;

	if (props.stat === t("loses"))
		statIcon = <LoseIcon />;
	else if (isOnline)
		statIcon = <span className="w-3 h-3 rounded-full bg-green"></span>;
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
