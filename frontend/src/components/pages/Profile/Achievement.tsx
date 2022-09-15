import { useTranslation } from "react-i18next";

import { ReactComponent as Unlocked } from "../../../assets/icons/Unlocked.svg";
import { ReactComponent as Locked } from "../../../assets/icons/Locked.svg";

const Achievement = ({ achievement }: IAchievementProps) => {
	const { t } = useTranslation();
	const { name, achieved, description, imgUrl } = achievement;
	return (
		<article className="flex h-7 w-full justify-between items-center gap-4 text-white">
			<div className="container h-full px-3 flex justify-start items-center gap-2 text-sm">
				<img src={imgUrl} alt={name + ": achievement image"} className="h-full"/>
				<div>
					<h4>{t(description)}</h4>
					<p className="text-xxs">{t(name)}</p>
				</div>
			</div>
			<div className="container flex justify-end items-center gap-2 text-xs">
				<p>{achieved ? t("Unlocked") : t("locked")}</p>
				{achieved ? <Unlocked className="h-2.5 w-2.5" /> : <Locked className="h-2.5 w-2.5"/>}
			</div>
		</article>
	);
};

export default Achievement;
