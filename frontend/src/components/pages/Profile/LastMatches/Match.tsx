import Player from "./Player";
import Score from "./Score";
import { ReactComponent as FirstCrown } from "../../../../assets/icons/FirstCrown.svg"

const Match : React.FC <{match : IGameMatch}> = ({ match }) => {
	const winner = match.player1.score > match.player2.score ? match.player1 : match.player2;
	const loser = match.player1.score <= match.player2.score ? match.player1 : match.player2;
	// const border = user.id === winner.id ? "border-green" : "border-red";
	const border = "border-beige";
	return (
		<article className={`container mb-4 mt-1 pr-3 pl-5 py-1 flex justify-center items-center border rounded-2xl ${border}`}>
			<div className="container flex justify-center items-center gap-2 grow-2">
				<Player
					username={loser.username}
					avatar={loser.imageUrl}
					className="flex-row"
				/>
				<Score
					score1={loser.score}
					score2={winner.score}
				/>
				<Player
					username={winner.username}
					avatar={winner.imageUrl}
					className="flex-row-reverse"
				/>
				<FirstCrown className="h-16 w-28 "/>
			</div>
		</article>
	);
};

export default Match;
