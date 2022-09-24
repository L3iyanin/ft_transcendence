import Player from "./Player";
import { useTranslation } from "react-i18next";

const Leaderboard: React.FC<{ players: IUser[] }> = ({ players }) => {
	const { t } = useTranslation();

	players.sort((player1: IUser, player2: IUser) => {
		const wins1 = player1.wins ?? 0;
		const wins2 = player2.wins ?? 0;
		return wins1 < wins2 ? 1 : -1;
	});

	return (
		<section className="container min-w-[300px] h-[481px] m-2 py-3 pl-1 pr-2 rounded-lg flex flex-col justify-start gap-3 bg-dark-60">
			<h2 className="m-2 px-4 text-2xl font-bold text-white ">
				{t("Leaderboard")}
			</h2>
			<div className="container max-h-[410px] px-6 rounded-lg overflow-y-auto">
				{players.map((player, index, array) => {
					if (index < array.length - 1) {
						return (
							<>
								<article
									className="container flex justify-between items-center gap-2"
									key={index}
								>
									<p className="text-yellow text-base font-medium">
										#{index}
									</p>
									<Player user={player} />
								</article>
								<hr className="my-2 rounded-md border-dark-blue border-t-4" />
							</>
						);
					} else {
						return <Player key={index} user={player} />;
					}
				})}
			</div>
		</section>
	);
};

export default Leaderboard;
