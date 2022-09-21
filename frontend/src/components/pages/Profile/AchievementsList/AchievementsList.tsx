import Achievement from "./Achievement";
import { useTranslation } from "react-i18next";

const AchievementsList : React.FC < {achievements : IAchievement[]} > = ({ achievements }) => {
	const { t } = useTranslation();
	return (
		<section className="grow h-[480px] min-w-[300px] py-3 pl-1 pr-2 rounded-2xl flex flex-col justify-center gap-2 bg-dark-60">
			<h2 className="m-2 pl-6 pr-3 text-2xl font-bold text-white ">
				{t("Achievements")}
			</h2>
			<div className="max-h-[410px] pl-6 pr-3 rounded-lg overflow-y-auto">
				{achievements.map((achievement: IAchievement, index) => (
					<Achievement key={index} achievement={achievement} />
				))}
			</div>
		</section>
	);
};

export default AchievementsList;
