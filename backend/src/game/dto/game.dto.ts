import { User } from "@prisma/client";

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
