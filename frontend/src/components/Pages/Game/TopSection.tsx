import { useTranslation } from "react-i18next";
import { MatchTypeEnum } from "../../../utils/constants/enum";

const TopSection: React.FC<{
	// name: string;
	goalsToWin?: number;
}> = ({ goalsToWin }) => {

	const { t } = useTranslation();

	if (!goalsToWin) {
		return null;
	}

	return (
		<>
			<h1 className="text-center text-white text-3xl font-bold">
				{goalsToWin === MatchTypeEnum.Vip ? t("classicGame") : t("vipGame") }
			</h1>
			<h2 className="text-center text-beige text-xl mt-2">
				{goalsToWin} {t("gamePage.goalsToWin")}
			</h2>
		</>
	);
};

export default TopSection;