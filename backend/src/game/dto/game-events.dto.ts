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
	invite?: boolean; // true in match by invite, undefined in match by queue
	inviterUserId?: number;
	invitedUserId?: number;
	matchId?: number; // matchId for invited user
}

export class StartedMatchResponseDto {
	matchId: number;
	player1: User;
	player2: User;
	scoreToWin: number;
}

export class ResponseDto {
	check: "MATCHING" | "ALREADY_IN_MATCH" | "START_MATCH" | "MATCH_NOT_FOUND";
	data?: StartedMatchResponseDto;
}

export class SpectatorDto {
	userId: number;
}

export class LiveMatchDto {
	id: number;
	server: Server;
	gameInstance: GameLogic;
	player1Id: number;
	player2Id: number;
	scoreToWin: number;
	interval: NodeJS.Timer;
	spectators: SpectatorDto[];
}
