import Achievement from "./Achievement";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAchivements } from "../../../../services/profile/profile";
import { isResNotOk } from "../../../../utils/helper/httpHelper";
import ErrorAlert from "../../../UI/Error";
import LoadingSpinner from "../../../UI/Loading/LoadingSpinner";

const AchievementsList : React.FC < { userId?: string } > = ({ userId }) => {
	const LocalUserData = useSelector((state: any) => state.user.user);

	const [achievements, setAchievements] = useState<IAchievement[] | null>(null);

	const { t } = useTranslation();

	useEffect(() => {
		const profileId = userId || LocalUserData.id;

		getAchivements(profileId)
			.then((res) => {
				if (isResNotOk(res)) {
					ErrorAlert(res);
					return;
				}
				setAchievements(res);
			})
			.catch((err) => {
				ErrorAlert(err);
			});
	}, [userId]);

	if (achievements === null) {
		return (
			<section className="relative grow h-[480px] min-w-[300px] py-3 pl-1 pr-2 rounded-2xl flex flex-col justify-center gap-2 bg-dark-60">
				<LoadingSpinner />
			</section>
		);
	}

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
