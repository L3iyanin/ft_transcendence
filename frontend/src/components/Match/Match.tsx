import Score from "./Score";
import Player from "./Player";
import SeeLive from "./SeeLive";
import { ReactComponent as FirstCrown } from "../../assets/icons/FirstCrown.svg"

const Match : React.FC <{match : IMatch, isInProfile : boolean}> = ({ match, isInProfile }) => {
	const [winner, winnerScore] = match.player1Score > match.player2Score ? [match.player1, match.player1Score] : [match.player2, match.player2Score];
	const [loser, loserScore] = match.player1Score <= match.player2Score ? [match.player1, match.player1Score] : [match.player2, match.player2Score];
	
	const user = match.player1;//!!!!!!!!!!
	const border = isInProfile && !match.live ? (user.id === winner.id ? "border-green" : "border-red") : "border-beige";
	return (
		<article
			className={`h-20 mb-3 mt-2 pr-11 pl-12 py-3 flex justify-between items-center gap-4 border rounded-lg 
				${isInProfile && !match.live ? (user.id === winner.id ? "border-green" : "border-red") : "border-beige"}`}
		>
			<div className="flex justify-between items-center gap-16 grow">
				<Player
					username={loser.username}
					avatar={loser.imgUrl}
					isLeft={true}
				/>
				<Score isbg={!isInProfile}
					score1={loserScore}
					score2={winnerScore}
				/>
				<Player
					username={winner.username}
					avatar={winner.imgUrl}
					isLeft={false}
				/>
			</div>
			{match.live ? <SeeLive /> : <FirstCrown />}
		</article>
	);
};

export default Match;
