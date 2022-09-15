import { useTranslation } from "react-i18next";

import { ReactComponent as Unlocked } from "../../../assets/icons/Unlocked.svg";
import { ReactComponent as Locked } from "../../../assets/icons/Locked.svg";

const Achievement = ({ achievement }: IAchievementProps) => {
	const { name, achieved, description, imgUrl } = achievement;

	const { t } = useTranslation();
	const opacity = "opacity-" + String(achieved ? 100 : 50);
	return (
		<article
			className={
				"flex h-1/6 w-full m-2 px-2 justify-between items-center gap-4 text-white " +
				opacity
			}
		>
			<div className="container h-full w-4/6 m-0 px-0 flex justify-start items-center gap-2 text-sm">
				<img
					src={imgUrl}
					alt={name + ": achievement image"}
					className="h-full"
				/>
				<div className="container flex flex-col justify-between gap-2">
					<h4>{t(description)}</h4>
					<p className="text-xs">{t(name)}</p>
				</div>
			</div>
			<div className="container h-full w-1/4 m-0 flex justify-end items-center gap-1 text-xs">
				<p>{achieved ? t("Unlocked") : t("locked")}</p>
				{achieved ? (
					<Unlocked className="h-2.5 w-2.5" />
				) : (
					<Locked className="h-2.5 w-2.5" />
				)}
			</div>
		</article>
	);
};

export default Achievement;
