import Player from "./Player";
import Score from "./Score";
import SeeLive from "./SeeLive";

const Match: React.FC<{ match: IMatch }> = ({ match }) => {
	return (
		<article
			className={`h-20 mb-3 mt-2 pr-6 pl-7 py-3 flex justify-between items-center gap-14 border rounded-lg border-beige`}
		>
			<div className="flex justify-between items-center gap-16 grow">
				<Player
					username={match.player1.username}
					avatar={match.player1.imgUrl}
					className="flex-row"
				/>
				<Score
					score1={match.player1Score}
					score2={match.player2Score}
				/>
				<Player
					username={match.player2.username}
					avatar={match.player2.imgUrl}
					className="flex-row-reverse"
				/>
			</div>
			<SeeLive />
		</article>
	);
};

export default Match;
125/759