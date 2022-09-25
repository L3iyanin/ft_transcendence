import { useTranslation } from "react-i18next";
import Match from "./Match";

const LastMatches : React.FC < {matches : IGameMatch[]} > = ({ matches}) => {

	const { t } = useTranslation();

	return (
		<section className="w-full px-2 h-[368px] rounded-2xl flex flex-col justify-center items-start gap-4 bg-dark-60 text-white">
			<h2 className="pt-6 px-8 text-xl font-bold">{t("lastMatches")}</h2>
			<section className="w-full max-h-[320px] px-8 overflow-y-auto">
				{matches.map((match: IGameMatch, index: number) => (
					<Match key={index} match={match} />
				))}
			</section>
		</section>
	);
};

export default LastMatches;
