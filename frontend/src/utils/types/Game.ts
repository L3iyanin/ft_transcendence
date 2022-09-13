import {GameType} from '../constants/enum'
export interface IGamePlayer {
	id: string;
	fullName: string;
	username: string;
	score: number;
	imageUrl: string;
	wins: number;
	loses: number;
	achievements: number;
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
	id: string;
	fullName: string;
	username: string;
	imageUrl: string;
	charUrl: string;
	profileUrl: string;
}

export interface IGameMatch {
	player1: IGamePlayer;
	player2: IGamePlayer;
	player1Score: number;
	player2Score: number;
	isMatching: boolean;
	isLive: boolean;
	date: Date;
	type: GameType;
}

export interface IMatchProps {
	children: IGameMatch;
	className: string;
	scoreStyle: string;
}

export interface IScoreProps {
	score1: number;
	score2: number;
	className: string;
}

export interface IPlayerProps {
	username: string;
	avatar: string;
	className: string;
}