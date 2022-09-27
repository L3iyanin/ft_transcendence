import Match from "../../../Match/Match";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../UI/Loading/LoadingSpinner";
import { getLiveMatches } from "../../../../services/home/home";
import ErrorAlert from "../../../UI/Error";

const LiveMatches : React.FC < {userId: number} > = ({ userId }) => {
	const { t } = useTranslation();

	const [liveMatches, setLiveMatches] = useState<IMatch[] | null> (null);

	useEffect(() => {
		getLiveMatches()
			.then(res => {
				// console.log(res);
				setLiveMatches(res);
			})
			.catch(err => {
				console.error(err);
				ErrorAlert(err);
			});
	}, []);

	if (!liveMatches) {
		return (
			<section className="relative h-[368px] grow pl-8 pr-1 pt-7 rounded-2xl flex flex-col items-start gap-8 bg-dark-60 text-white">
				<h2 className="text-3xl font-bold">{t("homePage.LiveMatches")}</h2>
				<section className="w-full max-h-[320px] pr-8 overflow-y-auto">
					<LoadingSpinner />
				</section>
			</section>
		);
	}

	return (
		<section className="h-[368px] grow pl-8 pr-1 pt-7 rounded-2xl flex flex-col items-start gap-8 bg-dark-60 text-white">
			<h2 className="text-3xl font-bold">{t("homePage.LiveMatches")}</h2>
			<section className="w-full max-h-[320px] pr-8 overflow-y-auto">
				{liveMatches.map((match: IMatch, index: number) => (
					<Match key={index} match={match} isInProfile={false} userId={userId} />
				))}
			</section>
		</section>
	);
};

export default LiveMatches;
