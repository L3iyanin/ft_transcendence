import { useTranslation } from "react-i18next";
import { MatchTypeEnum } from "../utils/constants/enum";

const useGetGame = (goalsToWin: number) => {
	const { t } = useTranslation();

	const gameConfig = {
		name: t("classicGame"),
		background: "/imgs/backgrounds/marineford-bg.png",
	};

	if (goalsToWin === MatchTypeEnum.Vip) {
		gameConfig.name = t("vipGame");
		gameConfig.background = "/imgs/backgrounds/wano-bg.png";
	}

	return gameConfig;
};

export default useGetGame;
