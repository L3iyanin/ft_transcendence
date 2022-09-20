import Player from "./Player";
import Score from "./Score";
import { ReactComponent as FirstCrown } from "../../../../assets/icons/FirstCrown.svg"


const Match : React.FC <{match : IMatch}> = ({ match }) => {
	const [winner, winnerScore] = match.player1Score > match.player2Score ? [match.player1, match.player1Score] : [match.player2, match.player2Score];
	const [loser, loserScore] = match.player1Score <= match.player2Score ? [match.player1, match.player1Score] : [match.player2, match.player2Score];
	// const border = user.id === winner.id ? "border-green" : "border-red";
	const border = "border-beige";
	return (
		<article
			className={
				`container mb-4 mt-1 pr-3 pl-5 py-1 flex justify-center items-center border rounded-lg ${border}`
			}
		>
			<div className="container flex justify-center items-center gap-2 grow-2">
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
				<FirstCrown className="h-16 w-28 "/>
			</div>
		</article>
	);
};

export default Match;
