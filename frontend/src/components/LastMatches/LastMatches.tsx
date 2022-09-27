import Match from "../Match/Match";
import { useTranslation } from "react-i18next";

const LastMatches : React.FC < {matches : IMatch[], isInProfile : boolean} > = ({ matches, isInProfile }) => {
	const { t } = useTranslation();

	return (
		<section className={`${isInProfile ? "h-[368px]" : "h-[481px]"} grow pl-8 pr-1 pt-6 rounded-2xl flex flex-col justify-center items-start gap-8 bg-dark-60 text-white`}>
			<h2 className="text-3xl font-bold">{t("homePage.LastMatches")}</h2>
			<section className={`${isInProfile ? "max-h-[320px]" : "max-h-[410px]"} w-full pr-8 overflow-y-auto`}>
				{matches.map((match: IMatch, index: number) => (
					<Match key={index} match={match} isInProfile={isInProfile} />
				))}
			</section>
		</section>
	);
};

export default LastMatches;
