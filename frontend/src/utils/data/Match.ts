import { MatchTypeEnum as GameType } from "../constants/enum";

import { users } from "../data/Users"

export const lastMatches:IMatch[] = [
	{
		id: 0,
		isMatching: false,
		live: false,
		player1: users[0],
		player2: users[1],
		player1Score: 2,
		player2Score: 1,
		date: new Date("2022-05-12T23:50:21.817Z"),
		scoreToWin: 3,
		backgroundUrl: "",
	},
	{
		id: 1,
		isMatching: false,
		live: false,
		player1: users[2],
		player2: users[3],
		player1Score: 4,
		player2Score: 2,
		date: new Date("2022-12-12T23:50:21.817Z"),
		scoreToWin: 3,
		backgroundUrl: ""
	},
	{
		id: 2,
		isMatching: false,
		live: false,
		player1: users[1],
		player2: users[2],
		player1Score: 2,
		player2Score: 1,
		date: new Date("2022-05-12T23:50:21.817Z"),
		scoreToWin: 3,
		backgroundUrl: ""
	},
	{
		id: 3,
		isMatching: false,
		live: false,
		player1: users[0],
		player2: users[3],
		player1Score: 4,
		player2Score: 2,
		date: new Date("2022-12-12T23:50:21.817Z"),
		scoreToWin: 3,
		backgroundUrl: ""
	},
	{
		id: 4,
		isMatching: false,
		live: false,
		player1: users[1],
		player2: users[3],
		player1Score: 7,
		player2Score: 2,
		date: new Date("2022-12-12T23:50:21.817Z"),
		scoreToWin: 3,
		backgroundUrl: ""

	},
]

export const liveMatches:IMatch[] = [
	{
		id: 0,
		isMatching: false,
		live: true,
		player1: users[0],
		player2: users[1],
		player1Score: 2,
		player2Score: 1,
		date: new Date("2022-05-12T23:50:21.817Z"),
		scoreToWin: 3,
		backgroundUrl: "",
	},
	{
		id: 1,
		isMatching: false,
		live: true,
		player1: users[2],
		player2: users[3],
		player1Score: 4,
		player2Score: 2,
		date: new Date("2022-12-12T23:50:21.817Z"),
		scoreToWin: 3,
		backgroundUrl: ""
	},
	{
		id: 2,
		isMatching: false,
		live: true,
		player1: users[1],
		player2: users[2],
		player1Score: 2,
		player2Score: 1,
		date: new Date("2022-05-12T23:50:21.817Z"),
		scoreToWin: 3,
		backgroundUrl: ""
	},
	{
		id: 3,
		isMatching: false,
		live: true,
		player1: users[0],
		player2: users[3],
		player1Score: 4,
		player2Score: 2,
		date: new Date("2022-12-12T23:50:21.817Z"),
		scoreToWin: 3,
		backgroundUrl: ""
	},
	{
		id: 4,
		isMatching: false,
		live: true,
		player1: users[1],
		player2: users[3],
		player1Score: 7,
		player2Score: 2,
		date: new Date("2022-12-12T23:50:21.817Z"),
		scoreToWin: 3,
		backgroundUrl: ""

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