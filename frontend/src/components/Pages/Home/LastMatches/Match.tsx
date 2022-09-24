import Player from "./Player";
import Score from "./Score";
import { ReactComponent as FirstCrown } from "../../../../assets/icons/FirstCrown.svg";

const Match: React.FC<{ match: IMatch }> = ({ match }) => {
	const [winner, winnerscore] = match.player1Score > match.player2Score ? [match.player1, match.player1Score] : [match.player2, match.player2Score];
	const [loser, loserScore] = match.player1Score <= match.player2Score ? [match.player1, match.player1Score] : [match.player2, match.player2Score];
	
	return (
		<article
			className={`h-20 mb-3 mt-2 pr-11 pl-12 py-3 flex justify-between items-center gap-4 border rounded-lg border-beige`}
		>
			<div className="flex justify-between items-center gap-16 grow">
				<Player
					username={loser.username}
					avatar={loser.imgUrl}
					className="flex-row"
				/>
				<Score
					score1={loserScore}
					score2={winnerscore}
				/>
				<Player
					username={winner.username}
					avatar={winner.imgUrl}
					className="flex-row-reverse"
				/>
			</div>
			<FirstCrown />
		</article>
	);
};

export default Match;
125/759