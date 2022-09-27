import { User } from "@prisma/client";
import GameLogic from "../gameLogic/gameLogic"
import { Server } from "socket.io";


export class BallDto {
	x: number;
	y: number;
	velocity: number;
	directionX: number;
	directionY: number;
}

export class JoinMatchDto {
	userId: number;
	scoreToWin: 3 | 7;
}

export class StartedMatchResponseDto {
	matchId: number;
	player1: User;
	player2: User;
	scoreToWin: number;
}

export class ResponseDto {
	check: "MATCHING" | "ALREADY_IN_MATCH" | "START_MATCH";
	data?: StartedMatchResponseDto;
}

export class LiveMatchDto {
	id: number;
	server: Server;
	gameInstance: GameLogic;
	player1Id: number;
	player2Id: number;
	scoreToWin: number;
	interval: NodeJS.Timer;
}
