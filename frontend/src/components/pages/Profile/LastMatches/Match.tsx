import Player from "./Player";
import Score from "./Score";
import { ReactComponent as FirstCrown } from "../../../../assets/icons/FirstCrown.svg"

const Match : React.FC <{match : IGameMatch}> = ({ match }) => {
	const winner = match.player1Score > match.player2Score ? match.player1 : match.player2;
	const loser = match.player1Score <= match.player2Score ? match.player1 : match.player2;
	const winnerScore = match.player1Score > match.player2Score ? match.player1Score : match.player2Score;
	const loserScore = match.player1Score <= match.player2Score ? match.player1Score : match.player2Score;

	// const border = user.id === winner.id ? "border-green" : "border-red";
	const border = "border-beige";
	return (
		<article className={`container mb-4 mt-1 py-1 flex items-center border rounded-2xl ${border}`}>
			<div className="w-full px-20 flex items-center justify-center">
				<Player
					username={loser.username}
					avatar={loser.imgUrl}
					className="flex-row"
				/>
				<Score
					score1={loserScore}
					score2={winnerScore}
				/>
				<Player
					username={winner.username}
					avatar={winner.imgUrl}
					className="flex-row-reverse"
				/>
				<FirstCrown className="h-16 w-28 ml-2"/>
			</div>
		</article>
	);
};

export default Match;
