import Player from "./Player";
import Score from "./Score";
import SeeLive from "./SeeLive";
import { ReactComponent as FirstCrown } from "../../../../assets/icons/FirstCrown.svg"


const Match : React.FC <{match : IMatch}> = ({ match }) => {
	return (
		<article
			className={
				`container mb-4 mt-1 pr-3 pl-5 py-1 flex justify-center items-center border rounded-lg border-beige`
			}
		>
			<div className="container flex justify-center items-center gap-2 grow-2">
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
				<SeeLive />
			</div>
		</article>
	);
};

export default Match;
