
export interface IGamePlayer {
	fullName: string;
	username: string;
	score: number;
	imageUrl: string;
	wins: number;
	loses: number;
	achivements: number;
}

export interface IGameSettings {
	name: string;
	goalsToWin: number;
	backgroundUrl: string;
	player1: IGamePlayer;
	player2: IGamePlayer;
	watchers: IGameWatcher[];
}

export interface IGameWatcher {
	fullName: string;
	username: string;
	imageUrl: string;
	charUrl: string;
	profileUrl: string;
}