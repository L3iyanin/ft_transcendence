import { useTranslation } from "react-i18next";

const TopSection: React.FC<{
	name: string;
	goalsToWin: number;
}> = ({ name, goalsToWin }) => {

	const { t } = useTranslation();

	return (
		<>
			<h1 className="text-center text-white text-3xl font-bold">
				{name}
			</h1>
			<h2 className="text-center text-beige text-xl mt-2">
				{goalsToWin} {t("gamePage.goalsToWin")}
			</h2>
		</>
	);
};

export default TopSection;