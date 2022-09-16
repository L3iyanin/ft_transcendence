import Achievement from "./Achievement";
import { useTranslation } from "react-i18next";

const AchievementsList = ({achievements} : IAchievementsListProps) => {
	const { t } = useTranslation();
	return (
		<section className="container h-[480px] min-w-[300px] w-5/12 py-3 px-8 rounded-lg flex flex-col justify-center gap-2 bg-dark-60">
		<h2 className="m-2 px-2 text-2xl font-bold text-white ">
			{t("Achievements")}
		</h2>
		{
			achievements.map((achievement : IAchievement) => 
				<Achievement achievement={achievement} />)
		}
		</section>
	);
}

export default AchievementsList;