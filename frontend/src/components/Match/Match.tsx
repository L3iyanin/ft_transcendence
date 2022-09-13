import Player from "./Player";
import Score from "./Score";
import Live from "./SeeLive";

const Match = ({ children, className, scoreStyle }: IMatchProps) => {
	let player1 = children.player1;
	console.log(player1);
	let player2 = children.player2;
	return (
		<article
			className={
				"container flex justify-center min-w-[500px] max-h-8 border rounded-lg " +
				className
			}
		>
			<div className="container w-4/5 flex justify-center items-center gap-0 grow-2">
				<Player
					username={player1.username}
					avatar={player1.imageUrl}
					className="flex-row"
				/>
				<Score
					score1={player1.score}
					score2={player2.score}
					className={scoreStyle}
				/>
				<Player
					username={player2.username}
					avatar={player2.imageUrl}
					className="flex-row-reverse"
				/>
			</div>
			<div className="container flex justify-end items-center w-1/5">
				<Live />
			</div>
		</article>
	);
};

export default Match;
