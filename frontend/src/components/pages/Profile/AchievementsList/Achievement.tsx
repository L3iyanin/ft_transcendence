import { useTranslation } from "react-i18next";

import { ReactComponent as Unlocked } from "../../../../assets/icons/Unlocked.svg";
import { ReactComponent as Locked } from "../../../../assets/icons/Locked.svg";

const Achievement: React.FC<{ achievement: IAchievement }> = ({
	achievement,
}) => {
	const { name, achieved, description, imgUrl } = achievement;

	const { t } = useTranslation();
	const opacity = "opacity-" + String(achieved ? 100 : 20);
	console.log(opacity);
	return (
		<article
			className={
				"container w-full my-5 px-2 flex justify-between items-center gap-4 text-white " 
				+ opacity
			}
		>
			<div className="container h-full w-4/6 m-0 px-0 flex justify-start items-center gap-2 text-sm">
				<div className="relative h-[55px] w-[55px] rounded-lg bg-red">
					<img
						src={imgUrl}
						alt={name + ": achievement image"}
						className={"h-full w-full " + (achieved ? "" : "opacity-60")}
					/>
					{!achieved && (
						<div className="absolute left-0 top-0 w-full h-full flex justify-center items-center opacity">
							<Locked className="w-[20px] h-[30px]" />
						</div>
					)}
				</div>
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
