
interface IGamePlayer {
	id: string;
	fullName: string;
	username: string;
	score?: number;
	imageUrl: string;
	wins: number;
	losses: number;
	achievements: number;
	
}

interface IGameSettings {
	name: string;
	goalsToWin: number;
	backgroundUrl: string;
	player1: IGamePlayer;
	player2: IGamePlayer;
	watchers: IGameWatcher[];
}

interface IGameWatcher {
	id: string;
	fullName: string;
	username: string;
	imageUrl: string;
	charUrl: string;
	profileUrl: string;
}


interface IGameMatch {
	player1: IUser;
	player2: IUser;
	player1Score: number;
	player2Score: number;
	isMatching: boolean;
	isLive: boolean;
	date: Date;
	type: GameType;
}

interface IOptionProps {
	url: string;
	children: string;
}

interface IAchievement {
    name : string;
    achieved : boolean;
    description : string;
    imgUrl : string;
}

interface IGameState {
	player1y: number,
	player2y: number,
	ballX: number,
	ballY: number,
	player1Score: number,
	player2Score: number,
}