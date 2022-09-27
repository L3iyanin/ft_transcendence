import Match from "../../../Match/Match";
import { useTranslation } from "react-i18next";

const LiveMatches : React.FC < {matches : IMatch[]} > = ({ matches}) => {
	const { t } = useTranslation();

	return (
		<section className="h-[368px] grow pl-8 pr-1 pt-7 rounded-2xl flex flex-col justify-center items-start gap-8 bg-dark-60 text-white">
			<h2 className="text-3xl font-bold">{t("homePage.LiveMatches")}</h2>
			<section className="w-full max-h-[320px] pr-8 overflow-y-auto">
				{matches.map((match: IMatch, index: number) => (
					<Match key={index} match={match} isInProfile={false} />
				))}
			</section>
		</section>
	);
};

export default LiveMatches;
