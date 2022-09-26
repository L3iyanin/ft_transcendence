
interface IMatch {
    id: number,
    isMatching: boolean,
    live: boolean,
    player1: IUser,
    player2: IUser,
    player1Score: number,
    player2Score: number,
    date: Date,
    scoreToWin: number,
	backgroundUrl: string,
}



interface IStartedMatch {
	matchId: number;
	player1: IUser;
	player2: IUser;
	scoreToWin: number;
}
