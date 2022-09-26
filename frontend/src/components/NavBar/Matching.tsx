import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { paddingZero } from "../../utils/helper/helpers";

const Matching: React.FC = () => {
	
	const { t } = useTranslation();
	
	const [matchingTimer, setMatchingTimer] = useState<{ seconds: number; minutes: number;}>();

	const LocalUserData: IUserState = useSelector((state: any) => state.user);

	let secondsDiff = 0;
	let minutesDiff = 0;

	useEffect(() => {
		if (LocalUserData.isMatching) {
	
			secondsDiff = moment().diff(LocalUserData.whenMatching, "seconds");
			minutesDiff = Math.trunc(secondsDiff / 60);
			secondsDiff = secondsDiff % 60;
	
			setMatchingTimer({ seconds: secondsDiff, minutes: minutesDiff });
	
			const matchingTimer = setInterval(() => {
				secondsDiff++;
				if (secondsDiff === 60) {
					secondsDiff = 0;
					minutesDiff++;
				}
				setMatchingTimer({ seconds: secondsDiff, minutes: minutesDiff });
			}, 1000);

			return () => {
				clearInterval(matchingTimer);
			}
		}
	}, [LocalUserData]);

	if (LocalUserData.isMatching === false || !matchingTimer)
		return <></>;

	return (
		<div className="flex bg-dark-60 h-full items-center rounded-lg gap-3 px-4 ml-20">
			<div className="w-3 h-3 rounded-full bg-green animate-pulse" />
			<img src="/imgs/icons/muchi-muchi.png" alt="muchi muchi" />
			<span className="font-bold text-white">{t("matching")}</span>
			<span className="font-bold text-white">
				{paddingZero(matchingTimer?.minutes)}:
				{paddingZero(matchingTimer?.seconds)}
			</span>
			{/* <span className="font-bold text-white">{minutesDiff}:{secondsDiff}</span> */}
		</div>
	);
};


export default Matching;