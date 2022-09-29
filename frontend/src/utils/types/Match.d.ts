
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

interface IMatchState {
	isMatching: boolean;
	whenMatching?: string;
	match?: IStartedMatch;
	spectators?: IUser[];
}

interface IGameOver {
	player1Score: number,
	player2Score: number,
	isDisconnected: boolean,
}

interface IWatchMatchRes {
	status: ResponseStatusEnum,
	message: string,
	matchSettings: IStartedMatch,
	spectators: IUser[],
}

interface IJoinMatch {
    userId: number;
    scoreToWin: 3 | 7;
    invite?: boolean; // true in match by invite, undefined in match by queue
    inviterUserId?: number;
    invitedUserId?: number;
    matchId?: number; // (I send it in message), only send it when userId is invitedUserId
}