import Match from "./Match";
import { useTranslation } from "react-i18next";

const LiveMatches : React.FC < {matches : IMatch[]} > = ({ matches}) => {
	const { t } = useTranslation();

	return (
		<section className="container m-2 px-2 min-w-[530px] h-[332px] rounded-lg flex flex-col justify-center items-start gap-4 bg-dark-60 text-white">
			<h2 className="px-4 text-xl font-bold">{t("homePage.LiveMatches")}</h2>
			<section className="container max-h-[250px] px-4 overflow-y-auto">
				{matches.map((match: IMatch, index: number) => (
					<Match key={index} match={match} />
				))}
			</section>
		</section>
	);
};

export default LiveMatches;
