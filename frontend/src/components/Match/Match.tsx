import {IGameMatch, IMatchProps} from '../../utils/types/Game'
import Player from "./Player"
import Score from "./Score"
import Live from "./SeeLive"


const Match = ({children, className ,scoreStyle} : IMatchProps) => {
	let player1 = children.player1;
	console.log(player1);
	let player2 = children.player2;
	return (
		<div className={"container h-8 flex justify-center items-center border rounded-lg " + className}>
			<Player username={player1.username} avatar={player1.imageUrl} className="flex-row" ></Player>
			<Score score1={player1.score} score2={player2.score} className={scoreStyle}/>
			<Player username={player2.username} avatar={player2.imageUrl} className="flex-row-reverse" ></Player>
			<Live/>
		</div>
	);
}

export default Match;