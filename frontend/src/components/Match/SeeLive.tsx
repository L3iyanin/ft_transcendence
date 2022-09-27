import { useTranslation } from "react-i18next";
import { ReactComponent as Live } from "../../assets/icons/Live.svg"

const SeeLive = () => {
	const { t } = useTranslation();

	return (
		<div className="flex justify-end items-center gap-3">
			<p className="text-xs font-medium text-yellow">{t("homePage.SeeMatchLive")}</p>
			<Live />
		</div>
	);
}

export default SeeLive;