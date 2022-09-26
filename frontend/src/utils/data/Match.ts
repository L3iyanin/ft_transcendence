import { MatchTypeEnum as GameType } from "../constants/enum";
import {players } from "../data/Players"

export const matches:IGameMatch[] = [
	{
		player1: players[0],
		player2: players[1],
		player1Score: 2,
		player2Score: 1,
		isMatching: false,
		isLive: true,
		date: new Date("2022-05-12T23:50:21.817Z"),
		type: GameType.Classic
	},
	{
		player1: players[2],
		player2: players[3],
		player1Score: 4,
		player2Score: 2,
		isMatching: false,
		isLive: true,
		date: new Date("2022-12-12T23:50:21.817Z"),
		type: GameType.Vip
	},
	{
		player1: players[1],
		player2: players[2],
		player1Score: 2,
		player2Score: 1,
		isMatching: false,
		isLive: true,
		date: new Date("2022-05-12T23:50:21.817Z"),
		type: GameType.Classic
	},
	{
		player1: players[0],
		player2: players[3],
		player1Score: 4,
		player2Score: 2,
		isMatching: false,
		isLive: true,
		date: new Date("2022-12-12T23:50:21.817Z"),
		type: GameType.Vip
	},
	{
		player1: players[1],
		player2: players[3],
		player1Score: 7,
		player2Score: 2,
		isMatching: false,
		isLive: true,
		date: new Date("2022-12-12T23:50:21.817Z"),
		type: GameType.Vip
	},
]


export const fakematch: IStartedMatch = {
	matchId: 12,
	player1: {
		id: 1,
		fullName: "Imran Baali",
		username: "kirwa-ko",
		imgUrl: "https://myanimelist.tech/api/avatar?name=kirwako&animeName=Inazuma_Eleven",
		wins: 15,
		losses: 4,
		numberOfAchievements: 4,
	},
	player2: {
		id: 2,
		fullName: "Abdali Ait Hmid",
		username: "twelve",
		imgUrl: "https://myanimelist.tech/api/avatar?name=twelve&animeName=Inazuma_Eleven",
		wins: 15,
		losses: 4,
		numberOfAchievements: 4,
	},
	scoreToWin: 3,
}