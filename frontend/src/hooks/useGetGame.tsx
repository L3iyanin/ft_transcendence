import { useTranslation } from "react-i18next";
import { MatchTypeEnum } from "../utils/constants/enum";

const useGetGame = (goalsToWin: number) => {
	const { t } = useTranslation();

	const gameConfig = {
		name: t('classicGame'),
	};

	if (goalsToWin === MatchTypeEnum.Vip)
		gameConfig.name = t('vipGame');
	
		return gameConfig;
};

export default useGetGame;