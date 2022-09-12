import {IGameMatch} from '../../utils/types/Game'
import Player from "./Player"
import Score from "./Score"


const Match = ({children} : {children : IGameMatch}) => {
	let player1 = children.player1;
	console.log(player1);
	let player2 = children.player2;
	return (
		<div className="container h-8 w-auto flex justify-center items-center border rounded-lg border-beige">
			<Player username={player1.username} avatar={player1.imageUrl} side="left" ></Player>
			<Score score1={player1.score} score2={player2.score} className="bg-yellow"/>
			<Player username={player2.username} avatar={player2.imageUrl} side="right" ></Player>
		</div>
	);
}

export default Match;