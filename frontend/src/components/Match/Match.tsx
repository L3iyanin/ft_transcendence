import Player from "./Player";
import Score from "./Score";
import { ReactComponent as FirstCrown } from "../../assets/icons/FirstCrown.svg"

const Match : React.FC <{match : IGameMatch, className : string, scoreStyle : string}> = ({ match, className, scoreStyle }) => {
	const winner = match.player1.score > match.player2.score ? match.player1 : match.player2;
	const loser = match.player1.score <= match.player2.score ? match.player1 : match.player2;
	return (
		<article
			className={
				"container m-0 pr-3 pl-5 py-2 flex justify-center items-center border rounded-lg " +
				className
			}
		>
			<div className="container flex justify-center items-center gap-2 grow-2">
				<Player
					username={loser.username}
					avatar={loser.imageUrl}
					className="flex-row"
				/>
				<Score
					score1={loser.score}
					score2={winner.score}
					className={scoreStyle}
				/>
				<Player
					username={winner.username}
					avatar={winner.imageUrl}
					className="flex-row-reverse"
				/>
				<FirstCrown className="h-16 w-32 "/>
			</div>
		</article>
	);
};

export default Match;
