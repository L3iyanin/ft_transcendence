import Score from "./Score";
import Player from "./Player";
import SeeLive from "./SeeLive";
import { ReactComponent as FirstCrown } from "../../assets/icons/FirstCrown.svg"
import { useSelector } from "react-redux";

const Match : React.FC <{match : IMatch, isInProfile : boolean, userId?: number}> = ({ match, isInProfile, userId }) => {
	const [winner, winnerScore] = match.player1Score > match.player2Score ? [match.player1, match.player1Score] : [match.player2, match.player2Score];
	const [loser, loserScore] = match.player1Score <= match.player2Score ? [match.player1, match.player1Score] : [match.player2, match.player2Score];


	// const border = isInProfile && !match.live ? (user.id === winner.id ? "border-green" : "border-red") : "border-beige";
	return (
		<article
			className={`mb-6 mt-2 pr-11 pl-12 py-3 flex justify-between items-center gap-4 border rounded-2xl 
				${(isInProfile && !match.live && userId) ? (userId === winner.id ? "border-green" : "border-red") : "border-beige"}`}
		>
			<div className="flex flex-wrap xl:flex-nowrap justify-between items-center xl:gap-16 grow">
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
			{match.live ? <SeeLive matchId={match.id!} userId={userId!} /> : <FirstCrown />}
		</article>
	);
};

export default Match;
