import { useTranslation } from "react-i18next";
import { MatchTypeEnum } from "../../../../utils/constants/enum";

const ModeDescription : React.FC < {mode : MatchTypeEnum} > = ({mode}) => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col justify-center items-center gap-0">
			<h2 className="text-3xl font-bold text-white">
				{mode === MatchTypeEnum.Classic
					? t("homePage.MarinefordPong")
					: t("homePage.WanoPong")}
			</h2>
			<h3 className="text-xl font-medium text-beige">{`${mode} ${t(
				"homePage.GoalsToWin"
			)}`}</h3>
		</div>
	);
}

export default ModeDescription;