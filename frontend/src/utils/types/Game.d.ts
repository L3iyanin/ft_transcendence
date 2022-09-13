
interface IGamePlayer {
	id: string;
	fullName: string;
	username: string;
	score: number;
	imageUrl: string;
	wins: number;
	loses: number;
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
	player1: IGamePlayer;
	player2: IGamePlayer;
	player1Score: number;
	player2Score: number;
	isMatching: boolean;
	isLive: boolean;
	date: Date;
	type: GameType;
}
