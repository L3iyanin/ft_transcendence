import Match from "../Match/Match";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getLastMatches } from "../../services/home/home";
import ErrorAlert from "../UI/Error";
import LoadingSpinner from "../UI/Loading/LoadingSpinner";
import { useSelector } from "react-redux";

const LastMatches : React.FC < {matches : IMatch[], isInProfile? : boolean, userId?: number} > = ({ isInProfile, userId }) => {
	const { t } = useTranslation();

	const [lastMatches, setLastMatches] = useState<IMatch[] | null> (null);

	const userData: IUserState = useSelector((state: any) => state.user);

	useEffect(() => {
		if (userData && userData.user) {
			getLastMatches(userData.user?.id)
				.then(res => {
					setLastMatches(res);
				})
				.catch(err => {
					console.error(err);
					ErrorAlert(err);
				});
		}
	}, [userData]);

	if (!lastMatches) {
		return (
			<section className={`${isInProfile ? "h-[368px]" : "h-[481px]"} relative grow pl-8 pr-1 pt-6 rounded-2xl flex flex-col items-start gap-8 bg-dark-60 text-white`}>
				<h2 className="text-3xl font-bold">{t("homePage.LastMatches")}</h2>
				<section className={`${isInProfile ? "max-h-[320px]" : "max-h-[410px]"} w-full pr-8 overflow-y-auto`}>
					<LoadingSpinner />
				</section>
			</section>
		);
	}

	return (
		<section className={`${isInProfile ? "h-[368px]" : "h-[481px]"} grow pl-8 pr-1 pt-6 rounded-2xl flex flex-col items-start gap-8 bg-dark-60 text-white`}>
			<h2 className="text-3xl font-bold">{t("homePage.LastMatches")}</h2>
			<section className={`${isInProfile ? "max-h-[320px]" : "max-h-[410px]"} w-full pr-8 overflow-y-auto`}>
				{lastMatches.map((match: IMatch, index: number) => (
					<Match userId={userId} key={index} match={match} isInProfile={isInProfile ?? false} />
				))}
			</section>
		</section>
	);
};

export default LastMatches;
