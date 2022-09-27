import Player from "./Player";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../UI/Loading/LoadingSpinner";
import { getLeaderboard } from "../../../../services/home/home";
import ErrorAlert from "../../../UI/Error";

const Leaderboard: React.FC = () => {
	const { t } = useTranslation();

	const [players, setPlayers] = useState<IUser[] | null>();

	useEffect(() => {
		getLeaderboard()
			.then(res => {
				setPlayers(res);
			})
			.catch(err => {
				console.error(err);
				ErrorAlert(err);
			});
	}, []);

	if (!players) {
		return (
			<section className="relative basis-[443px] min-w-[443px] h-[481px] pl-9 pr-1 pt-6 rounded-2xl flex flex-col justify-start gap-6 bg-dark-60">
				<h2 className="text-3xl font-bold text-white ">
					{t("homePage.Leaderboard")}
				</h2>
				<div className="w-full max-h-[410px] pr-8 overflow-y-auto">
					<LoadingSpinner />
				</div>
			</section>
		);
	}

	players.sort((player1: IUser, player2: IUser) => {
		if (player1.wins! > player2.wins!) return -1;
		else if (player1.wins! < player2.wins!) return 1;
		else return player1.losses! < player2.losses! ? -1 : 1;
	});

	return (
		<section className="basis-[443px] min-w-[443px] h-[481px] pl-9 pr-1 pt-6 rounded-2xl flex flex-col justify-start gap-6 bg-dark-60">
			<h2 className="text-3xl font-bold text-white ">
				{t("homePage.Leaderboard")}
			</h2>
			<div className="w-full max-h-[410px] pr-8 overflow-y-auto">
				{players.map((player, index, array) => {
					return (
						<div key={index}>
							<article className="my-1 flex justify-between items-center gap-3">
								<p
									className={`text-2xl font-medium ${
										index < 3 ? "text-yellow" : "text-white"
									}`}
								>
									#{index + 1}
								</p>
								<Player key={player.id} user={player} />
							</article>
							{index < array.length - 1 && (
								<hr className="mt-4 mb-3 rounded-sm border-dark-blue border-t-4" />
							)}
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default Leaderboard;
