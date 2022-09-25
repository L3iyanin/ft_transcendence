import { useTranslation } from "react-i18next";

import { ReactComponent as Unlocked } from "../../../../assets/icons/Unlocked.svg";
import { ReactComponent as Locked } from "../../../../assets/icons/Locked.svg";

const Achievement: React.FC<{ achievement: IAchievement }> = ({
	achievement,
}) => {
	const { name, achieved, description, imgUrl } = achievement;

	const { t } = useTranslation();
	return (
		<article
			className={`w-full my-5 px-2 flex justify-between items-center gap-4 text-white ${achieved ? "opacity-100" : "opacity-20"}`}
		>
			<div className="m-0 px-0 flex justify-start items-center gap-2 text-sm">
				<div className="relative h-[55px] w-[55px] grow-0 shrink-0 rounded-lg bg-red">
					<img
						src={imgUrl}
						alt={name + ": achievement image"}
						className={`h-[55px] w-[55px] ${achieved ? "" : "opacity-60"}`}
					/>
					{!achieved && (
						<div className="absolute left-0 top-0 h-[55px] w-[55px] flex justify-center items-center">
							<Locked className="w-[20px] h-[30px]" />
						</div>
					)}
				</div>
				<div className="flex flex-col justify-between gap-2">
					<h4 className="text-lg">{t(description)}</h4>
					<p className="text-beige">{t(name)}</p>
				</div>
			</div>
			<div className="h-full m-0 flex justify-end items-center gap-2 capitalize">
				<p>{achieved ? t("unlocked") : t("locked")}</p>
				{achieved ? (
					<Unlocked className="" />
				) : (
					<Locked className="" />
				)}
			</div>
		</article>
	);
};

export default Achievement;
