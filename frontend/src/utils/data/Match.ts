import { GameType } from "../constants/enum";
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
		type: GameType.MarinFord
	},
	{
		player1: players[2],
		player2: players[3],
		player1Score: 4,
		player2Score: 2,
		isMatching: false,
		isLive: true,
		date: new Date("2022-12-12T23:50:21.817Z"),
		type: GameType.Wano
	},
	{
		player1: players[1],
		player2: players[2],
		player1Score: 2,
		player2Score: 1,
		isMatching: false,
		isLive: true,
		date: new Date("2022-05-12T23:50:21.817Z"),
		type: GameType.MarinFord
	},
	{
		player1: players[0],
		player2: players[3],
		player1Score: 4,
		player2Score: 2,
		isMatching: false,
		isLive: true,
		date: new Date("2022-12-12T23:50:21.817Z"),
		type: GameType.Wano
	},
	{
		player1: players[1],
		player2: players[3],
		player1Score: 7,
		player2Score: 2,
		isMatching: false,
		isLive: true,
		date: new Date("2022-12-12T23:50:21.817Z"),
		type: GameType.Wano
	},
]

console.log(matches);