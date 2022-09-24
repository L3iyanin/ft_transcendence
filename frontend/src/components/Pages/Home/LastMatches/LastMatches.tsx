import Match from "./Match";
import { useTranslation } from "react-i18next";

const LastMatches : React.FC < {matches : IMatch[]} > = ({ matches}) => {
	const { t } = useTranslation();

	return (
		<section className="h-[481px] grow pl-8 pr-1 pt-6 rounded-2xl flex flex-col justify-center items-start gap-8 bg-dark-60 text-white">
			<h2 className="text-3xl font-bold">{t("homePage.LastMatches")}</h2>
			<section className="max-h-[410px] pr-8 overflow-y-auto">
				{matches.map((match: IMatch, index: number) => (
					<Match key={index} match={match} />
				))}
			</section>
		</section>
	);
};

export default LastMatches;
