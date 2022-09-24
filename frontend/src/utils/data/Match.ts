import { MatchTypeEnum as GameType } from "../constants/enum";

import { users } from "../data/Users"

export const matches:IMatch[] = [
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
