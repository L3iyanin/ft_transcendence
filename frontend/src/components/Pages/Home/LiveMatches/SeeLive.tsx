import { useTranslation } from "react-i18next";
import { ReactComponent as Live } from "../../../../assets/icons/Live.svg"

const SeeLive = () => {
	const { t } = useTranslation();

	return (
		<div className="container flex justify-end items-center gap-1">
			<p className="text-xxs text-yellow">{t("homePage.SeeMatchLive")}</p>
			<Live className="h-4"/>
		</div>
	);
}

export default SeeLive;